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
            const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido.' }));
            throw new Error(errorData.error || `Erro ${response.status}`);
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
  // CORREÇÃO: Usando o endpoint 'perfil' que é mais rápido e retorna os dados completos do perfil.
  const url = `${API_BASE_URL}/first?tipo=perfil&username=${encodeURIComponent(cleanUsername)}`;
  console.log(`[profileService] Buscando perfil rápido de: ${url}`);

  try {
    const data = await fetchWithTimeout(url);
    console.log(`[profileService] Dados do perfil recebidos para ${cleanUsername}:`, data);

    if (!data || data.error) {
      if (data?.error && typeof data.error === 'string' && data.error.toLowerCase().includes('not found')) {
          throw new Error(`Usuário "${cleanUsername}" não encontrado. Verifique o nome e tente novamente.`);
      }
      throw new Error(data?.error || 'Não foi possível carregar os dados do perfil.');
    }

    // A API retorna os dados em 'data' ou na raiz do objeto
    const profileSource = data.data || data;
    
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

    // O endpoint 'perfil' não retorna sugestões ou posts, então retornamos arrays vazios.
    // Os posts e sugestões serão carregados em uma etapa posterior, se necessário.
    const suggestions: SuggestedProfile[] = [];
    const posts: FeedPost[] = [];

    console.log(`[profileService] Sucesso: Perfil ${profile.username} carregado.`);
    return { profile, suggestions, posts };

  } catch (error) {
    console.error(`[profileService] Erro ao buscar dados para ${cleanUsername}:`, error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Ocorreu um erro desconhecido ao buscar dados do backend.');
  }
};

export const fetchFullInvasionData = async (username: string): Promise<{ suggestions: SuggestedProfile[], posts: FeedPost[] }> => {
  const cleanUsername = username.replace(/^@+/, '').trim();
  const url = `${API_BASE_URL}/first?tipo=busca_completa&username=${encodeURIComponent(cleanUsername)}`;
  console.log(`[profileService] Buscando dados completos de: ${url}`);

  try {
    const data = await fetchWithTimeout(url);
    console.log(`[profileService] Dados completos recebidos para ${cleanUsername}:`, data);

    if (!data || data.error) {
      throw new Error(data?.error || 'Não foi possível carregar os dados completos.');
    }

    let suggestions: SuggestedProfile[] = [];
    if (data.lista_perfis_publicos && Array.isArray(data.lista_perfis_publicos)) {
      suggestions = data.lista_perfis_publicos.map((s: any) => ({
        username: s.username,
        profile_pic_url: getProxiedUrl(s.profile_pic_url),
      }));
    }

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
    
    return { suggestions, posts };

  } catch (error) {
    console.error(`[profileService] Erro ao buscar dados completos para ${cleanUsername}:`, error);
    // Retorna arrays vazios em caso de falha para que o app possa usar dados de fallback
    return { suggestions: [], posts: [] };
  }
};