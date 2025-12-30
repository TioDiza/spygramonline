import type { ProfileData, SuggestedProfile, FetchResult, FeedPost, PostUser, Post } from '../../types';
import { BACKEND_API_BASE_URL, API_SECRET_KEY } from '../../constants';

const API_BASE_URL = BACKEND_API_BASE_URL;

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Proxy de imagens para evitar CORS.
 */
const getProxyImageUrl = (imageUrl: string | undefined): string => {
    if (!imageUrl || imageUrl.trim() === '') return '/perfil.jpg';
    if (imageUrl.startsWith('/') || imageUrl.startsWith('data:')) return imageUrl;
    return `https://proxt-insta.projetinho-solo.workers.dev/?url=${encodeURIComponent(imageUrl)}`;
};

/**
 * Proxy de imagens leve para avatares.
 */
const getProxyImageUrlLight = (imageUrl: string | undefined): string => {
    if (!imageUrl || imageUrl.trim() === '') return '/perfil.jpg';
    if (imageUrl.startsWith('/') || imageUrl.startsWith('data:')) return imageUrl;
    const urlWithoutProtocol = imageUrl.replace(/^https?:\/\//, '');
    return `https://images.weserv.nl/?url=${encodeURIComponent(urlWithoutProtocol)}&w=80&h=80&fit=cover&q=50`;
};

/**
 * Função de fetch simplificada para a nova API, agora com a chave secreta.
 */
const simpleFetch = async (campo: string, username: string): Promise<any> => {
    const url = `${API_BASE_URL}/api/field?campo=${campo}&username=${encodeURIComponent(username)}&secret=${API_SECRET_KEY}`;
    const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (data.status === 'fail' || data.error) {
        throw new Error(data.message || data.error || 'A API retornou um erro.');
    }
    return data;
};


// ===================================
// EXPORTED FUNCTIONS
// ===================================

/**
 * Busca o perfil básico de um usuário para a tela de confirmação.
 */
export async function fetchProfileData(username: string): Promise<FetchResult> {
    try {
        const cleanUsername = username.replace(/^@+/, '').trim();
        if (!cleanUsername) throw new Error('Username inválido');

        console.log('🔍 Buscando perfil com nova API:', cleanUsername);
        
        const response = await simpleFetch('perfil_completo', cleanUsername);

        // Acessa os dados aninhados
        const data = response?.results?.[0]?.data;

        if (data && data.username) {
            const profile: ProfileData = {
                username: data.username,
                fullName: data.full_name || '',
                profilePicUrl: getProxyImageUrl(data.profile_pic_url),
                biography: data.biography || '',
                followers: data.follower_count || 0,
                following: data.following_count || 0,
                postsCount: data.media_count || 0,
                isVerified: data.is_verified || false,
                isPrivate: data.is_private || false,
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

/**
 * Busca os dados completos para a simulação: perfis sugeridos e os posts dos perfis públicos sugeridos.
 */
export async function fetchFullInvasionData(profileData: ProfileData): Promise<{ suggestions: SuggestedProfile[], posts: FeedPost[] }> {
    const cleanUsername = profileData.username.replace(/^@+/, '').trim();
    
    try {
        console.log('🔎 Buscando dados de invasão com nova API:', cleanUsername);

        // 1. Fetch suggested profiles
        const suggestionsResponse = await simpleFetch('perfis_sugeridos', cleanUsername).catch(e => { 
            console.error("Falha ao buscar sugestões:", e); 
            return null; 
        });

        // 2. Process suggestions
        let suggestions: SuggestedProfile[] = [];
        const suggestionsData = suggestionsResponse?.results?.[0]?.data;
        if (Array.isArray(suggestionsData)) {
            suggestions = suggestionsData.map((p: any) => ({
                username: p.username || '',
                fullName: p.full_name || p.username,
                profile_pic_url: getProxyImageUrlLight(p.profile_pic_url),
                is_private: p.is_private,
            }));
        }

        // 3. Filter for public profiles
        const publicProfiles = suggestions.filter(p => p.is_private === false);
        console.log(`Encontrados ${publicProfiles.length} perfis públicos para buscar posts.`);

        // 4. Fetch posts for each public profile in parallel
        const postPromises = publicProfiles.map(async (profile) => {
            try {
                const postsResponse = await simpleFetch('lista_posts', profile.username);
                const postsData = postsResponse?.results?.[0]?.data;
                if (Array.isArray(postsData)) {
                    // Create the PostUser object for this profile
                    const postUser: PostUser = {
                        username: profile.username,
                        full_name: profile.fullName || profile.username,
                        profile_pic_url: profile.profile_pic_url,
                    };

                    // Map the posts for this user
                    return postsData.map((item: any): FeedPost => {
                        const post: Post = {
                            id: item.id || String(Math.random()),
                            image_url: getProxyImageUrl(item.image_versions2?.candidates[0]?.url || item.carousel_media?.[0]?.image_versions2?.candidates[0]?.url),
                            video_url: item.video_versions?.[0]?.url ? getProxyImageUrl(item.video_versions[0].url) : undefined,
                            is_video: !!item.video_versions,
                            caption: item.caption?.text || '',
                            like_count: item.like_count || 0,
                            comment_count: item.comment_count || 0,
                        };
                        return { de_usuario: postUser, post };
                    });
                }
                return []; // No posts found for this user
            } catch (error) {
                console.error(`Falha ao buscar posts para ${profile.username}:`, error);
                return []; // Return empty array on error for this user
            }
        });

        // 5. Await all promises and flatten the result
        const postsByProfile = await Promise.all(postPromises);
        const allPosts = postsByProfile.flat();

        // Shuffle the posts to mix the feed
        const shuffledPosts = allPosts.sort(() => Math.random() - 0.5);

        console.log(`✅ Dados completos carregados. Sugestões: ${suggestions.length}, Posts: ${shuffledPosts.length}`);
        
        return { suggestions, posts: shuffledPosts };

    } catch (error) {
        console.error('❌ Erro ao buscar dados completos:', error);
        return { suggestions: [], posts: [] };
    }
}