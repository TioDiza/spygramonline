import type { ProfileData, SuggestedProfile } from '../../types';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const fetchProfileData = async (username: string): Promise<ProfileData> => {
  if (!username) {
    throw new Error('Username cannot be empty.');
  }

  const url = `https://api-instagram-ofc.vercel.app/api/first?tipo=perfil&username=${encodeURIComponent(username)}`;
  console.log(`[profileService] Attempting to fetch profile data from: ${url}`);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // Timeout de 15 segundos

  try {
    console.log(`[profileService] Starting fetch for ${username}...`);
    const response = await fetch(url.toString(), {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    console.log(`[profileService] Fetch response received for ${username}. Status: ${response.status}`);

    const apiData = await response.json();
    console.log(`[profileService] Raw data received from backend for ${username}:`, apiData);

    if (!response.ok) {
      const errorMessage = apiData.error || apiData.message || `Backend API Error (${response.status}): Unknown error`;
      console.error(`[profileService] ${errorMessage}.`);
      throw new Error(errorMessage);
    }

    // A API agora retorna os dados na raiz, não mais em um objeto 'data'.
    if (apiData && !apiData.error) {
      const profile: ProfileData = {
        username: apiData.username,
        fullName: apiData.full_name,
        profilePicUrl: apiData.profile_pic_url || apiData.profile_pic_url_hd,
        biography: apiData.biography,
        followers: apiData.follower_count || (apiData.edge_followed_by ? apiData.edge_followed_by.count : 0),
        following: apiData.following_count || (apiData.edge_follow ? apiData.edge_follow.count : 0),
        postsCount: apiData.media_count || (apiData.edge_owner_to_timeline_media ? apiData.edge_owner_to_timeline_media.count : 0),
        isVerified: apiData.is_verified,
        isPrivate: apiData.is_private,
      };

      if (!profile.username) {
        console.error('[profileService] Failed to fetch profile data: Response from backend is incomplete.');
        throw new Error('Dados do perfil inválidos ou incompletos do backend.');
      }

      console.log(`[profileService] Successfully fetched and parsed real profile data for: ${profile.username}`);
      return profile;

    } else {
      const errorMessage = apiData.error || apiData.message || 'Perfil não encontrado ou não acessível.';
      console.error(`[profileService] API returned an error: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error(`[profileService] Fetch for ${username} timed out after 15 seconds.`);
        throw new Error(`A busca por ${username} demorou muito para responder.`);
      } else {
        console.error(`[profileService] An error occurred during backend fetch for ${username}: ${error.message}.`);
        throw error;
      }
    } else {
      console.error('[profileService] An unknown error occurred while fetching data from backend.');
      throw new Error('Ocorreu um erro desconhecido ao buscar dados do backend.');
    }
  }
};

export const fetchSuggestedProfiles = async (username: string): Promise<SuggestedProfile[]> => {
  if (!username) {
    console.warn('[profileService] Username is empty, cannot fetch suggestions.');
    return [];
  }

  const url = `https://api-instagram-ofc.vercel.app/api/first?tipo=sugestoes&username=${encodeURIComponent(username)}`;
  const maxRetries = 2;
  const retryDelay = 4000; // 4 segundos

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[profileService] Attempting to fetch suggested profiles (Attempt ${attempt}/${maxRetries})...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      const apiData = await response.json();
      console.log(`[profileService] Raw suggested profiles data received for ${username}:`, apiData);

      if (apiData.data && Array.isArray(apiData.data) && apiData.data.length > 0) {
        console.log(`[profileService] Successfully fetched ${apiData.data.length} suggestions on attempt ${attempt}.`);
        return apiData.data;
      } else {
         console.warn(`[profileService] No suggested profiles found on attempt ${attempt}.`);
         // Se não houver dados, trata como uma falha para tentar novamente
         if (attempt < maxRetries) await delay(retryDelay);
         else return []; // Retorna vazio na última tentativa se não houver dados
      }
    } catch (error) {
      console.error(`[profileService] Attempt ${attempt} failed:`, error);
      if (attempt < maxRetries) {
        console.log(`[profileService] Waiting ${retryDelay}ms before next attempt.`);
        await delay(retryDelay);
      }
    }
  }

  console.error('[profileService] All attempts to fetch suggestions failed.');
  return [];
};