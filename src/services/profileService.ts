import type { ProfileData, SuggestedProfile, FetchResult, FeedPost } from '../../types';

const API_BASE_URL = 'https://api-instagram-ofc.vercel.app/api';
const REQUEST_TIMEOUT = 30000; // 30 segundos

// Adiciona um proxy para evitar erros de CORS ao carregar imagens do Instagram
const getProxiedUrl = (url: string | undefined): string => {
  if (!url || url.trim() === '') {
    // Retorna um fallback de imagem genérica se a URL for inválida
    return '/perfil.jpg'; 
  }
  // Se a URL já for de um proxy conhecido, retorna como está
  if (url.includes('workers.dev') || url.includes('vercel.app') || url.includes('images.weserv.nl')) {
    return url;
  }
  // Adiciona o proxy para URLs diretas do Instagram
  return `https://proxt-insta.projetinho-solo.workers.dev/?url=${encodeURIComponent(url)}`;
};

/**
 * Proxy de imagens para avatares (versão leve)
 * Usa weserv.nl com qualidade/tamanho reduzido para carregar mais rápido
 */
const getProxiedUrlLight = (imageUrl: string | undefined): string => {
    if (!imageUrl || imageUrl.trim() === '') {
        return '/perfil.jpg';
    }
    // Não aplicar proxy a URLs locais
    if (imageUrl.startsWith('/') || imageUrl.startsWith('../')) {
        return imageUrl;
    }
    // Se já tem proxy, retornar como está
    if (imageUrl.includes('images.weserv.nl') || imageUrl.includes('proxt-insta.projetinho-solo.workers.dev')) {
        return imageUrl;
    }
    // Usar weserv.nl com tamanho pequeno (80px) e qualidade baixa (50) para avatares
    const urlWithoutProtocol = imageUrl.replace(/^https?:\/\//, '');
    return `https://images.weserv.nl/?url=${encodeURIComponent(urlWithoutProtocol)}&w=80&h=80&fit=cover&q=50`;
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
  const url = `${API_BASE_URL}/field?campo=perfil_completo&username=${encodeURIComponent(cleanUsername)}`;
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

    let profileSource: any = null;

    // Itera sobre os results para encontrar o melhor conjunto de dados
    if (data.results && Array.isArray(data.results)) {
      for (const result of data.results) {
        if (result.data && result.data.username) {
          // Prioriza resultados que não são genéricos (ex: 'Usuário Instagram')
          if (result.data.full_name && result.data.full_name !== 'Usuário Instagram') {
            profileSource = result.data;
            break; // Encontrou uma boa fonte, para a busca
          }
          // Usa o primeiro resultado válido como fallback
          if (!profileSource) {
             profileSource = result.data;
          }
        }
      }
    }
    
    if (!profileSource || !profileSource.username) {
      throw new Error('Dados do perfil principal não encontrados na resposta da API.');
    }

    const profile: ProfileData = {
      username: profileSource.username,
      fullName: profileSource.full_name || profileSource.full_name_or_name || '',
      profilePicUrl: getProxiedUrl(profileSource.profile_pic_url),
      biography: profileSource.biography || '',
      followers: profileSource.follower_count || 0,
      following: profileSource.following_count || 0,
      postsCount: profileSource.media_count || 0,
      isVerified: profileSource.is_verified || false,
      isPrivate: profileSource.is_private || false,
    };

    // O endpoint de perfil completo não retorna sugestões ou posts, então retornamos arrays vazios.
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
  
  let suggestions: SuggestedProfile[] = [];
  let posts: FeedPost[] = [];

  // 1. Buscar Perfis Sugeridos
  const suggestionsUrl = `${API_BASE_URL}/field?campo=perfis_sugeridos&username=${encodeURIComponent(cleanUsername)}`;
  console.log(`[profileService] Buscando sugestões de: ${suggestionsUrl}`);

  try {
    const suggestionsData = await fetchWithTimeout(suggestionsUrl);
    // A API retorna a lista em 'lista_perfis_publicos'
    if (suggestionsData && suggestionsData.lista_perfis_publicos && Array.isArray(suggestionsData.lista_perfis_publicos)) {
      suggestions = suggestionsData.lista_perfis_publicos.map((s: any) => ({
        username: s.username,
        // Usa o proxy leve para avatares
        profile_pic_url: getProxiedUrlLight(s.profile_pic_url),
      }));
    }
  } catch (error) {
    console.error(`[profileService] Erro ao buscar sugestões:`, error);
  }

  // 2. Buscar Lista de Posts
  const postsUrl = `${API_BASE_URL}/field?campo=lista_posts&username=${encodeURIComponent(cleanUsername)}`;
  console.log(`[profileService] Buscando posts de: ${postsUrl}`);

  try {
    const postsData = await fetchWithTimeout(postsUrl);
    // A API retorna a lista em 'posts'
    if (postsData && postsData.posts && Array.isArray(postsData.posts)) {
        posts = postsData.posts.map((item: any) => ({
            de_usuario: {
                username: item.de_usuario?.username || '',
                full_name: item.de_usuario?.full_name || '',
                // Usa o proxy leve para avatares dos posts
                profile_pic_url: getProxiedUrlLight(item.de_usuario?.profile_pic_url),
            },
            post: {
                id: item.post?.id || '',
                // Usa o proxy normal para imagens de posts (maior resolução)
                image_url: getProxiedUrl(item.post?.image_url),
                video_url: item.post?.video_url ? getProxiedUrl(item.post.video_url) : undefined,
                is_video: item.post?.is_video || false,
                caption: item.post?.caption || '',
                like_count: item.post?.like_count || 0,
                comment_count: item.post?.comment_count || 0,
            }
        }));
    }
  } catch (error) {
    console.error(`[profileService] Erro ao buscar posts:`, error);
  }
    
  return { suggestions, posts };
};