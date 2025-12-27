import type { ProfileData, SuggestedProfile, FetchResult, FeedPost, PostUser, Post } from '../../types';

const API_BASE_URL = 'https://api-instagram-ofc.vercel.app/api';
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRY_TIME = 40000; // 40 seconds for parallel retry

// ===================================
// UTILITY FUNCTIONS (Proxies and Fetch)
// ===================================

const getProxyImageUrl = (imageUrl: string | undefined): string => {
    if (!imageUrl || imageUrl.trim() === '') return '/perfil.jpg';
    if (imageUrl.startsWith('./') || imageUrl.startsWith('/') || imageUrl.startsWith('../')) return imageUrl;
    if (imageUrl.includes('images.weserv.nl') || imageUrl.includes('proxt-insta.projetinho-solo.workers.dev')) return imageUrl;
    if (!imageUrl.startsWith('http')) return imageUrl;
    return `https://proxt-insta.projetinho-solo.workers.dev/?url=${encodeURIComponent(imageUrl)}`;
};

const getProxyImageUrlLight = (imageUrl: string | undefined): string => {
    if (!imageUrl || imageUrl.trim() === '') return '/perfil.jpg';
    if (imageUrl.startsWith('./') || imageUrl.startsWith('/') || imageUrl.startsWith('../')) return imageUrl;
    if (imageUrl.includes('images.weserv.nl') || imageUrl.includes('proxt-insta.projetinho-solo.workers.dev')) return imageUrl;
    if (!imageUrl.startsWith('http')) return imageUrl;
    const urlWithoutProtocol = imageUrl.replace(/^https?:\/\//, '');
    return `https://images.weserv.nl/?url=${encodeURIComponent(urlWithoutProtocol)}&w=80&h=80&fit=cover&q=50`;
};

const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = REQUEST_TIMEOUT): Promise<any> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal, headers: { 'Accept': 'application/json', ...options.headers } });
        clearTimeout(timeoutId);
        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            throw parseError;
        }
        return data;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') throw new Error('A requisição demorou muito para responder.');
        throw error;
    }
};

type SuccessResult = { success: true; data: any; attempt: number; error?: undefined };
type FailureResult = { success: false; error: Error & { isFatal?: boolean }; attempt: number; data?: undefined };
type ParallelResult = SuccessResult | FailureResult;

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
                    const response = await fetch(url, { ...options, headers: { 'Accept': 'application/json', ...options.headers } });
                    const data = await response.json();
                    if (data && data.error) {
                        const error = new Error(data.error) as FailureResult['error'];
                        if (typeof data.error === 'string' && (data.error.includes('não encontrado') || data.error.includes('not found') || data.error.includes('User not found'))) {
                            error.isFatal = true;
                        }
                        return { success: false, error, attempt };
                    }
                    return { success: true, data, attempt };
                } catch (err) {
                    return { success: false, error: err as FailureResult['error'], attempt };
                }
            };
            const promises = [fetchAttempt(1), fetchAttempt(2)];
            const result = await Promise.race(promises);
            const roundDuration = Date.now() - roundStart;
            if (result.success) {
                const profileData = result.data.data || result.data;
                const hasValidData = (profileData && profileData.username) || (profileData && profileData.perfil_buscado && profileData.perfil_buscado.username);
                if (hasValidData) {
                    console.log(`✅ SUCESSO VÁLIDO no round ${round} (tentativa #${result.attempt}) em ${roundDuration}ms`);
                    return result.data;
                } else {
                    console.warn(`⚠️ Round ${round} retornou dados inválidos em ${roundDuration}ms (tentativa #${result.attempt}) - CONTINUANDO...`);
                }
            } else {
                if (result.error && result.error.isFatal) {
                    console.error(`🚫 Erro fatal detectado: ${result.error.message} - PARANDO tentativas`);
                    throw result.error;
                }
                console.warn(`❌ Round ${round} falhou em ${roundDuration}ms (tentativa #${result.attempt}):`, result.error?.message, '- CONTINUANDO...');
            }
        } catch (error) {
            const roundDuration = Date.now() - roundStart;
            console.warn(`❌ Round ${round} exception em ${roundDuration}ms:`, (error as Error).message);
            if ((error as any).isFatal) throw error;
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

export async function fetchProfileData(username: string): Promise<FetchResult> {
    try {
        const cleanUsername = username.replace(/^@+/, '').trim();
        if (!cleanUsername) throw new Error('Username inválido');
        console.log('🔍 Buscando perfil rápido:', cleanUsername);
        const data = await fetchWithParallelRetry(`${API_BASE_URL}/first?tipo=perfil&username=${encodeURIComponent(cleanUsername)}`);
        if (!data || data.error) throw new Error(data?.error || 'Erro ao buscar perfil');
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
            return { profile, suggestions: [], posts: [] };
        }
        throw new Error('Perfil não encontrado. Verifique o nome de usuário.');
    } catch (error) {
        console.error('❌ Erro ao buscar perfil:', error);
        if (error instanceof Error) throw error;
        throw new Error('Ocorreu um erro desconhecido ao buscar dados do backend.');
    }
}

export async function fetchFullInvasionData(username: string, profileData: ProfileData): Promise<{ suggestions: SuggestedProfile[], posts: FeedPost[] }> {
    const cleanUsername = username.replace(/^@+/, '').trim();

    const fetchSuggestions = async (): Promise<SuggestedProfile[]> => {
        try {
            console.log('🔎 Buscando perfis sugeridos:', cleanUsername);
            const data = await fetchWithTimeout(`${API_BASE_URL}/field?campo=perfis_sugeridos&username=${encodeURIComponent(cleanUsername)}`);
            const users: SuggestedProfile[] = [];
            if (data.results && data.results.length > 0) {
                data.results.forEach((result: any) => {
                    if (result.success && Array.isArray(result.data)) {
                        result.data.forEach((user: any) => {
                            users.push({
                                username: user.username || '',
                                fullName: user.full_name || '',
                                profile_pic_url: getProxyImageUrlLight(user.profile_pic_url),
                            });
                        });
                    }
                });
            }
            const uniqueUsers = users.filter((user, index, self) => index === self.findIndex(u => u.username === user.username)).slice(0, 15);
            console.log(`✅ Perfis sugeridos carregados: ${uniqueUsers.length}`);
            return uniqueUsers;
        } catch (error) {
            console.error('❌ Erro ao buscar perfis sugeridos:', error);
            return [];
        }
    };

    const fetchPosts = async (): Promise<FeedPost[]> => {
        try {
            console.log('📸 Buscando posts do alvo:', cleanUsername);
            const data = await fetchWithTimeout(`${API_BASE_URL}/field?campo=lista_posts&username=${encodeURIComponent(cleanUsername)}`);
            if (!data || !Array.isArray(data) || data.length === 0) {
                console.warn('Nenhum post encontrado para o usuário ou erro na API.');
                return [];
            }
            const posts: FeedPost[] = data.map((item: any) => {
                const post: Post = {
                    id: item.id || '',
                    image_url: getProxyImageUrl(item.image_url),
                    video_url: item.video_url ? getProxyImageUrl(item.video_url) : undefined,
                    is_video: item.is_video || false,
                    caption: item.caption || '',
                    like_count: item.like_count || 0,
                    comment_count: item.comment_count || 0,
                };
                const postUser: PostUser = {
                    username: profileData.username,
                    full_name: profileData.fullName,
                    profile_pic_url: profileData.profilePicUrl,
                };
                return { de_usuario: postUser, post };
            });
            console.log(`✅ Posts do alvo carregados: ${posts.length}`);
            return posts;
        } catch (error) {
            console.error('❌ Erro ao buscar posts do alvo:', error);
            return [];
        }
    };

    const [suggestions, posts] = await Promise.all([fetchSuggestions(), fetchPosts()]);
    return { suggestions, posts };
}