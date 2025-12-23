import type { ProfileData, SuggestedProfile, FetchResult, FeedPost } from '../../types';

const API_BASE_URL = 'https://api-instagram-ofc.vercel.app/api';
const REQUEST_TIMEOUT = 30000; // 30 segundos

// Adiciona um proxy para evitar erros de CORS ao carregar imagens do Instagram
const getProxiedUrl = (url: string | undefined): string => {
  if (!url) return '';
  // Se a URL já for de um proxy conhecido, retorna como está
  if (url.includes('workers.dev') || url.includes('vercel.app') || url.includes('images.weserv.nl')) {
    return url;
  }
  // Adiciona o proxy para URLs diretas do Instagram
  return `https://proxt-insta.projetinho-solo.workers.dev/?url=${encodeURIComponent(url)}`;
};

const fetchWithTimeout = async (url: string, timeout = REQUEST_TIMEOUT): Promise<any> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status >= 500 && response.status < 600) {
                throw new Error('Nossos servidores estão sobrecarregados. Por favor, tente novamente em alguns instantes.');
            }
            // Para outros erros como 404, etc.
            throw new Error('Ocorreu um erro ao buscar o perfil. Verifique o nome de usuário e tente novamente.');
        }
        return await response.json();

    } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('A requisição demorou muito para responder.');
        }
        throw error;
    }
};

export const fetchProfileData = async (username: string): Promise<FetchResult> => {
  if (!username) {
    throw new Error('O nome de usuário não pode estar vazio.');
  }

  const cleanUsername = username.replace(/^@+/, '').trim();
  const url = `${API_BASE_URL}/first?tipo=busca_completa&username=${encodeURIComponent(cleanUsername)}`;
  console.log(`[profileService] Buscando dados completos de: ${url}`);

  try {
    const data = await fetchWithTimeout(url);
    console.log(`[profileService] Dados completos recebidos para ${cleanUsername}:`, data);

    if (!data || data.error) {
      // Trata o erro de "usuário não encontrado" que vem da API
      if (data?.error && typeof data.error === 'string' && data.error.toLowerCase().includes('not found')) {
          throw new Error(`Usuário "${cleanUsername}" não encontrado. Verifique o nome e tente novamente.`);
      }
      throw new Error(data?.error || 'Não foi possível carregar os dados do perfil.');
    }

    // 1. Processar dados do perfil principal
    const profileSource = data.perfil_buscado;
    if (!profileSource || !profileSource.username) {
      throw new Error('Dados do perfil principal não encontrados na resposta da API.');
    }
    const profile: ProfileData = {
      username: profileSource.username,
      fullName: profileSource.full_name || '',
      profilePicUrl: getProxiedUrl(profileSource.profile_pic_url),
      biography: profileSource.biography || '',
      followers: profileSource.follower_count || 0,
      following: profileSource.following_count || 0,
      postsCount: profileSource.media_count || 0,
      isVerified: profileSource.is_verified || false,
      isPrivate: profileSource.is_private || false,
    };

    // 2. Processar perfis sugeridos/públicos para os stories
    let suggestions: SuggestedProfile[] = [];
    if (data.lista_perfis_publicos && Array.isArray(data.lista_perfis_publicos)) {
      suggestions = data.lista_perfis_publicos.map((s: any) => ({
        username: s.username,
        profile_pic_url: getProxiedUrl(s.profile_pic_url),
      }));
    }

    // 3. Processar posts
    let posts: FeedPost[] = [];
    if (data.posts && Array.isArray(data.posts)) {
        posts = data.posts.map((item: any) => ({
            de_usuario: {
                username: item.de_usuario?.username || '',
                full_name: item.de_usuario?.full_name || '',
                profile_pic_url: getProxiedUrl(item.de_usuario?.profile_pic_url),
            },
            post: {
                id: item.post?.id || '',
                image_url: getProxiedUrl(item.post?.image_url),
                video_url: item.post?.video_url ? getProxiedUrl(item.post.video_url) : undefined,
                is_video: item.post?.is_video || false,
                caption: item.post?.caption || '',
                like_count: item.post?.like_count || 0,
                comment_count: item.post?.comment_count || 0,
            }
        }));
    }

    console.log(`[profileService] Sucesso: Perfil ${profile.username}, ${suggestions.length} sugestões, ${posts.length} posts.`);
    return { profile, suggestions, posts };

  } catch (error) {
    console.error(`[profileService] Erro ao buscar dados para ${cleanUsername}:`, error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Ocorreu um erro desconhecido ao buscar dados do backend.');
  }
};