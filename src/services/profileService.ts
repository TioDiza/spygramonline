import type { ProfileData, SuggestedProfile, FetchResult, FeedPost, PostUser, Post } from '../../types';
import { BACKEND_API_BASE_URL } from '../../constants';

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
 * Função de fetch simplificada para a nova API.
 */
const simpleFetch = async (campo: string, username: string): Promise<any> => {
    const url = `${API_BASE_URL}/api/field?campo=${campo}&username=${encodeURIComponent(username)}`;
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
        
        const data = await simpleFetch('perfil_completo', cleanUsername);

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
 * Busca os dados completos para a simulação: perfis sugeridos e os posts do alvo.
 */
export async function fetchFullInvasionData(profileData: ProfileData): Promise<{ suggestions: SuggestedProfile[], posts: FeedPost[] }> {
    const cleanUsername = profileData.username.replace(/^@+/, '').trim();
    
    try {
        console.log('🔎 Buscando dados completos com nova API:', cleanUsername);

        const [suggestionsResponse, postsResponse] = await Promise.all([
            simpleFetch('perfis_sugeridos', cleanUsername).catch(e => { console.error("Falha ao buscar sugestões:", e); return []; }),
            simpleFetch('lista_posts', cleanUsername).catch(e => { console.error("Falha ao buscar posts:", e); return []; })
        ]);

        // 1. Mapear Sugestões
        let suggestions: SuggestedProfile[] = [];
        if (Array.isArray(suggestionsResponse)) {
            suggestions = suggestionsResponse.map((p: any) => ({
                username: p.username || '',
                fullName: p.full_name || p.username,
                profile_pic_url: getProxyImageUrlLight(p.profile_pic_url),
            }));
        }

        // 2. Mapear Posts do usuário alvo
        let posts: FeedPost[] = [];
        if (Array.isArray(postsResponse)) {
            const postUser: PostUser = {
                username: profileData.username,
                full_name: profileData.fullName,
                profile_pic_url: profileData.profilePicUrl,
            };

            posts = postsResponse.map((item: any): FeedPost => {
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
        
        console.log(`✅ Dados completos carregados. Sugestões: ${suggestions.length}, Posts: ${posts.length}`);
        
        return { suggestions, posts };

    } catch (error) {
        console.error('❌ Erro ao buscar dados completos:', error);
        return { suggestions: [], posts: [] };
    }
}