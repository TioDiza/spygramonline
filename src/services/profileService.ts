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

/**
 * Função auxiliar para buscar posts de um único usuário e formatá-los.
 */
const fetchPostsForUser = async (username: string, profilePicUrl: string, fullName: string): Promise<FeedPost[]> => {
    const postsUrl = `${API_BASE_URL}/field?campo=lista_posts&username=${encodeURIComponent(username)}`;
    console.log(`[profileService] Buscando posts de: ${postsUrl}`);
    
    try {
        const postsData = await fetchWithTimeout(postsUrl, 15000); // Timeout menor para posts
        const postResults = postsData?.results?.[0]?.data; 

        if (postResults && Array.isArray(postResults)) {
            return postResults.map((rawPost: any) => {
                // Verifica se é um objeto de post plano (estrutura atual)
                if (rawPost.id && rawPost.image_url) {
                    return {
                        de_usuario: {
                            username: username,
                            full_name: fullName,
                            profile_pic_url: getProxiedUrlLight(profilePicUrl),
                        },
                        post: {
                            id: rawPost.id || '',
                            image_url: getProxiedUrl(rawPost.image_url),
                            video_url: rawPost.video_url ? getProxiedUrl(rawPost.video_url) : undefined,
                            is_video: rawPost.is_video || false,
                            caption: rawPost.caption || '',
                            like_count: rawPost.like_count || 0,
                            comment_count: rawPost.comment_count || 0,
                        }
                    } as FeedPost;
                }
                return null;
            }).filter((p): p is FeedPost => p !== null);
        }
    } catch (error) {
        console.error(`[profileService] Erro ao buscar posts para ${username}:`, error);
    }
    return [];
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
    const profileResults = suggestionsData?.results?.[0]?.data; 
    
    if (profileResults && Array.isArray(profileResults)) {
      suggestions = profileResults.map((s: any) => ({
        username: s.username,
        profile_pic_url: getProxiedUrlLight(s.profile_pic_url),
      }));
    }
  } catch (error) {
    console.error(`[profileService] Erro ao buscar sugestões:`, error);
  }

  // 2. Buscar Posts de 4 Usuários Sugeridos Aleatórios (para compor o feed)
  const suggestedUsernamesToFetch = suggestions
    .sort(() => 0.5 - Math.random()) // Embaralha
    .slice(0, 4); // Pega os 4 primeiros

  const suggestedPostsPromises = suggestedUsernamesToFetch.map(s => 
    fetchPostsForUser(s.username, s.profile_pic_url, s.username)
  );

  const suggestedPostsResults = await Promise.all(suggestedPostsPromises);
  const allSuggestedPosts = suggestedPostsResults.flat();
  
  // 3. Embaralhar todos os posts sugeridos para criar o feed
  posts = allSuggestedPosts.sort(() => 0.5 - Math.random());
  
  // Limita o feed a um máximo de 10 posts para não sobrecarregar
  posts = posts.slice(0, 10);
    
  return { suggestions, posts };
};