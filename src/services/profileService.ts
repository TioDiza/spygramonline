import type { ProfileData, SuggestedProfile, FetchResult, FeedPost, PostUser, Post } from '../../types';

const API_BASE_URL = 'https://api-instagram-ofc.vercel.app/api';
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRY_TIME = 40000; // 40 seconds for parallel retry

// ===================================
// UTILITY FUNCTIONS (Proxies and Fetch)
// ===================================

/**
 * Proxy de imagens para evitar CORS (apenas para URLs externas)
 */
const getProxyImageUrl = (imageUrl: string | undefined): string => {
    if (!imageUrl || imageUrl.trim() === '') {
        return '/perfil.jpg'; // Fallback local
    }
    // Não aplicar proxy a URLs locais
    if (imageUrl.startsWith('./') || imageUrl.startsWith('/') || imageUrl.startsWith('../')) {
        return imageUrl;
    }
    // Se já tem proxy, retornar como está
    if (imageUrl.includes('images.weserv.nl') || imageUrl.includes('proxt-insta.projetinho-solo.workers.dev')) {
        return imageUrl;
    }
    // Só aplicar proxy a URLs externas (http/https)
    if (!imageUrl.startsWith('http')) {
        return imageUrl;
    }
    return `https://proxt-insta.projetinho-solo.workers.dev/?url=${encodeURIComponent(imageUrl)}`;
};

/**
 * Proxy de imagens para avatares (versão leve - stories)
 * Usa weserv.nl com qualidade/tamanho reduzido para carregar mais rápido
 */
const getProxyImageUrlLight = (imageUrl: string | undefined): string => {
    if (!imageUrl || imageUrl.trim() === '') {
        return '/perfil.jpg'; // Fallback local
    }
    if (imageUrl.startsWith('./') || imageUrl.startsWith('/') || imageUrl.startsWith('../')) {
        return imageUrl;
    }
    if (imageUrl.includes('images.weserv.nl') || imageUrl.includes('proxt-insta.projetinho-solo.workers.dev')) {
        return imageUrl;
    }
    if (!imageUrl.startsWith('http')) {
        return imageUrl;
    }
    // Usar weserv.nl com tamanho pequeno (80px) e qualidade baixa (50) para avatares
    const urlWithoutProtocol = imageUrl.replace(/^https?:\/\//, '');
    return `https://images.weserv.nl/?url=${encodeURIComponent(urlWithoutProtocol)}&w=80&h=80&fit=cover&q=50`;
};

/**
 * Fetch com timeout
 */
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = REQUEST_TIMEOUT): Promise<any> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                ...options.headers
            }
        });

        clearTimeout(timeoutId);

        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            throw parseError;
        }

        return data;
    } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('A requisição demorou muito para responder.');
        }

        throw error;
    }
};

// Tipos para o resultado da tentativa paralela
type SuccessResult = { success: true; data: any; attempt: number; error?: undefined };
type FailureResult = { success: false; error: Error | any; attempt: number; data?: undefined };
type ParallelResult = SuccessResult | FailureResult;

/**
 * Fetch com MÚLTIPLAS tentativas PARALELAS e SEM timeout curto
 */
async function fetchWithParallelRetry(url: string, options: RequestInit = {}, maxTime = MAX_RETRY_TIME): Promise<any> {
    const startTime = Date.now();
    let round = 0;
    
    while (Date.now() - startTime < maxTime) {
        round++;
        const roundStart = Date.now();
        
        console.log(`⚡⚡ Round ${round}: Fazendo 2 requisições PARALELAS`);
        
        try {
            const fetchAttempt = async (attempt: number): Promise<ParallelResult> => {
                try {
                    const response = await fetch(url, {
                        ...options,
                        headers: {
                            'Accept': 'application/json',
                            ...options.headers
                        }
                    });
                    const data = await response.json();
                    if (data && data.error) {
                        const error = new Error(data.error);
                        if (typeof data.error === 'string' && (data.error.includes('não encontrado') || data.error.includes('not found') || data.error.includes('User not found'))) {
                            (error as any).isFatal = true;
                        }
                        return { success: false, error, attempt };
                    }
                    return { success: true, data, attempt };
                } catch (err) {
                    return { success: false, error: err, attempt };
                }
            };

            const promises = [
                fetchAttempt(1),
                fetchAttempt(2)
            ];
            
            const result = await Promise.race(promises);
            const roundDuration = Date.now() - roundStart;
            
            if (result.success) {
                // TS agora sabe que 'data' existe se 'success' for true
                const profileData = result.data.data || result.data;
                const hasValidData = (profileData && profileData.username) || 
                                    (profileData && profileData.perfil_buscado && profileData.perfil_buscado.username);
                if (hasValidData) {
                    console.log(`✅ SUCESSO VÁLIDO no round ${round} (tentativa #${result.attempt}) em ${roundDuration}ms`);
                    return result.data;
                } else {
                    console.warn(`⚠️ Round ${round} retornou dados inválidos em ${roundDuration}ms (tentativa #${result.attempt}) - CONTINUANDO...`);
                }
            } else {
                if (result.error && (result.error as any).isFatal) {
                    console.error(`🚫 Erro fatal detectado: ${result.error.message} - PARANDO tentativas`);
                    throw result.error;
                }
                console.warn(`❌ Round ${round} falhou em ${roundDuration}ms (tentativa #${result.attempt}):`, result.error?.message, '- CONTINUANDO...');
            }
            
        } catch (error) {
            const roundDuration = Date.now() - roundStart;
            console.warn(`❌ Round ${round} exception em ${roundDuration}ms:`, (error as Error).message);
            if ((error as any).isFatal) {
                 throw error;
            }
        }
        
        const elapsed = Date.now() - startTime;
        if (elapsed >= maxTime) {
            console.error(`⏱️ Tempo limite de ${maxTime}ms atingido após ${round} rounds`);
            throw new Error('Nenhuma API conseguiu retornar o perfil');
        }
        
        console.log(`🔄 Aguardando 2s antes da próxima tentativa... (tempo decorrido: ${elapsed}ms / ${maxTime}ms)`);
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    throw new Error('Tempo máximo excedido sem sucesso');
}

// ===================================
// EXPORTED FUNCTIONS
// ===================================

/**
 * Busca perfil por username (para modal de confirmação)
 * Mapeia a resposta da API para ProfileData.
 */
export async function fetchProfileData(username: string): Promise<FetchResult> {
    try {
        const cleanUsername = username.replace(/^@+/, '').trim();

        if (!cleanUsername) {
            throw new Error('Username inválido');
        }

        console.log('🔍 Buscando perfil rápido:', cleanUsername);

        const data = await fetchWithParallelRetry(
            `${API_BASE_URL}/first?tipo=perfil&username=${encodeURIComponent(cleanUsername)}`,
            {},
            MAX_RETRY_TIME
        );

        if (!data || data.error) {
            throw new Error(data?.error || 'Erro ao buscar perfil');
        }

        const profileData = data.data || data;
        
        if (profileData && profileData.username) {
            const profile: ProfileData = {
                username: profileData.username || cleanUsername,
                fullName: profileData.full_name || '',
                profilePicUrl: getProxyImageUrl(profileData.profile_pic_url),
                biography: profileData.biography || '',
                followers: profileData.follower_count || 0,
                following: profileData.following_count || 0,
                postsCount: profileData.media_count || 0,
                isVerified: profileData.is_verified || false,
                isPrivate: profileData.is_private || false,
            };

            // Retorna apenas o perfil para a tela de confirmação
            return { profile, suggestions: [], posts: [] };
        }

        throw new Error('Perfil não encontrado. Verifique o nome de usuário.');
    } catch (error) {
        console.error('❌ Erro ao buscar perfil:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Ocorreu um erro desconhecido ao buscar dados do backend.');
    }
}

/**
 * Busca dados completos (sugestões e posts) após a confirmação.
 * Mapeia a resposta da API para SuggestedProfile[] e FeedPost[].
 */
export async function fetchFullInvasionData(username: string): Promise<{ suggestions: SuggestedProfile[], posts: FeedPost[] }> {
    const cleanUsername = username.replace(/^@+/, '').trim();
    
    try {
        console.log('🔎 Buscando dados completos:', cleanUsername);

        // Usamos fetchWithTimeout aqui, pois a busca completa é mais pesada e não queremos 2x a carga.
        const data = await fetchWithTimeout(
            `${API_BASE_URL}/first?tipo=busca_completa&username=${encodeURIComponent(cleanUsername)}`,
            {},
            60000 // 60 segundos de timeout para busca completa
        );

        if (!data) {
            throw new Error('Falha ao receber dados completos da API.');
        }

        // 1. Mapear Sugestões (lista_perfis_publicos)
        let suggestions: SuggestedProfile[] = [];
        if (data.lista_perfis_publicos && Array.isArray(data.lista_perfis_publicos)) {
            suggestions = data.lista_perfis_publicos.map((p: any) => ({
                username: p.username || '',
                fullName: p.full_name || p.username,
                profile_pic_url: getProxyImageUrlLight(p.profile_pic_url),
            }));
        }

        // 2. Mapear Posts
        let posts: FeedPost[] = [];
        if (data.posts && Array.isArray(data.posts)) {
            posts = data.posts.map((item: any) => {
                const postUser: PostUser = {
                    username: item.de_usuario?.username || item.username || '',
                    full_name: item.de_usuario?.full_name || item.full_name || '',
                    profile_pic_url: getProxyImageUrlLight(item.de_usuario?.profile_pic_url || item.profile_pic_url),
                };

                const post: Post = {
                    id: item.post?.id || '',
                    image_url: getProxyImageUrl(item.post?.image_url),
                    video_url: item.post?.video_url ? getProxyImageUrl(item.post?.video_url) : undefined,
                    is_video: item.post?.is_video || false,
                    caption: item.post?.caption || '',
                    like_count: item.post?.like_count || 0,
                    comment_count: item.post?.comment_count || 0,
                };

                return { de_usuario: postUser, post };
            });
        }
        
        // 3. Filtrar posts do usuário alvo (garantido que só apareçam perfis em comum)
        const targetUsername = data.perfil_buscado?.username || cleanUsername;
        const filteredPosts = posts.filter(p => p.de_usuario.username.toLowerCase() !== targetUsername.toLowerCase());

        console.log(`✅ Dados completos carregados. Sugestões: ${suggestions.length}, Posts (filtrados): ${filteredPosts.length}`);
        
        return { suggestions, posts: filteredPosts };

    } catch (error) {
        console.error('❌ Erro ao buscar dados completos:', error);
        // Em caso de erro na busca completa, retorna arrays vazios para não quebrar a simulação
        return { suggestions: [], posts: [] };
    }
}