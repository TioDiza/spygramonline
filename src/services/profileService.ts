import type { ProfileData, SuggestedProfile } from '../../types';

interface FetchResult {
  profile: ProfileData;
  suggestions: SuggestedProfile[];
}

// Adiciona um proxy para evitar erros de CORS ao carregar imagens do Instagram
const getProxiedUrl = (url: string | undefined): string => {
  if (!url) return '';
  // Se a URL já for de um proxy conhecido, retorna como está
  if (url.includes('workers.dev') || url.includes('vercel.app')) {
    return url;
  }
  // Adiciona o proxy para URLs diretas do Instagram
  return `https://proxt-insta.projetinho-solo.workers.dev/?url=${encodeURIComponent(url)}`;
};

export const fetchProfileData = async (username: string): Promise<FetchResult> => {
  if (!username) {
    throw new Error('Username cannot be empty.');
  }

  const url = `https://api-instagram-ofc.vercel.app/api/first?tipo=perfil&username=${encodeURIComponent(username)}`;
  console.log(`[profileService] Attempting to fetch all data from: ${url}`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const apiData = await response.json();
    console.log(`[profileService] Raw data received from backend for ${username}:`, apiData);

    if (!response.ok) {
      const errorMessage = apiData.error || apiData.message || `Backend API Error (${response.status}): Unknown error`;
      throw new Error(errorMessage);
    }

    const profileSource = apiData.data || apiData;

    if (profileSource && !profileSource.error) {
      const profile: ProfileData = {
        username: profileSource.username,
        fullName: profileSource.full_name,
        profilePicUrl: getProxiedUrl(profileSource.profile_pic_url || profileSource.profile_pic_url_hd),
        biography: profileSource.biography,
        followers: profileSource.follower_count || 0,
        following: profileSource.following_count || 0,
        postsCount: profileSource.media_count || 0,
        isVerified: profileSource.is_verified,
        isPrivate: profileSource.is_private,
      };

      if (!profile.username) {
        throw new Error('Dados do perfil inválidos ou incompletos do backend.');
      }

      let suggestions: SuggestedProfile[] = [];
      if (profileSource._chaining_results && Array.isArray(profileSource._chaining_results)) {
        suggestions = profileSource._chaining_results.map((s: any) => ({
          username: s.username,
          profile_pic_url: getProxiedUrl(s.profile_pic_url),
        }));
      }
      
      console.log(`[profileService] Successfully parsed profile and ${suggestions.length} suggestions for: ${profile.username}`);
      return { profile, suggestions };

    } else {
      const errorMessage = (apiData.data && apiData.data.error) || apiData.error || apiData.message || 'Perfil não encontrado ou não acessível.';
      throw new Error(errorMessage);
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`A busca por ${username} demorou muito para responder.`);
      }
      throw error;
    }
    throw new Error('Ocorreu um erro desconhecido ao buscar dados do backend.');
  }
};