import type { ProfileData, SuggestedProfile } from '../../types';

export const fetchProfileData = async (username: string): Promise<ProfileData> => {
  if (!username) {
    throw new Error('Username cannot be empty.');
  }

  const url = `https://api-instagram-ofc.vercel.app/api/first?tipo=perfil&username=${username}`;
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

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Backend API Error (${response.status}): ${errorText || 'Unknown error'}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.erro || errorData.message || errorMessage;
      } catch (e) {
        // Not JSON, use original message
      }
      console.error(`[profileService] ${errorMessage}.`);
      throw new Error(errorMessage);
    }

    const apiData = await response.json();
    console.log(`[profileService] Raw data received from backend for ${username}:`, apiData);

    const profileDataFromApi = apiData.data;
    if (profileDataFromApi && typeof profileDataFromApi === 'object' && Object.keys(profileDataFromApi).length > 0) {
      
      const profile: ProfileData = {
        username: profileDataFromApi.username,
        fullName: profileDataFromApi.full_name,
        profilePicUrl: profileDataFromApi.profile_pic_url,
        biography: profileDataFromApi.biography,
        followers: profileDataFromApi.follower_count,
        following: profileDataFromApi.following_count,
        postsCount: profileDataFromApi.media_count,
        isVerified: profileDataFromApi.is_verified,
        isPrivate: profileDataFromApi.is_private,
      };

      if (!profile.username) {
        console.error('[profileService] Failed to fetch profile data: Response from backend is incomplete.');
        throw new Error('Dados do perfil inválidos ou incompletos do backend.');
      }

      console.log(`[profileService] Successfully fetched and parsed real profile data for: ${profile.username}`);
      return profile;

    } else {
      console.error('[profileService] Failed to fetch profile data: The "data" field is empty or invalid in the API response.');
      throw new Error('Nenhum perfil encontrado na resposta da API.');
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

  const url = `https://api-instagram-ofc.vercel.app/api/first?tipo=sugestoes&username=${username}`;
  console.log(`[profileService] Attempting to fetch suggested profiles from: ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`[profileService] Failed to fetch suggestions: ${response.status} ${response.statusText}`);
      return []; // Don't break the app, just return empty
    }
    const apiData = await response.json();
    console.log(`[profileService] Raw suggested profiles data received for ${username}:`, apiData);

    if (apiData.data && Array.isArray(apiData.data)) {
      console.log(`[profileService] Successfully fetched ${apiData.data.length} suggestions.`);
      return apiData.data;
    } else {
      console.warn('[profileService] No suggested profiles found or API response format is invalid.');
      return [];
    }
  } catch (error) {
    console.error(`[profileService] An error occurred while fetching suggestions for ${username}:`, error);
    return [];
  }
};