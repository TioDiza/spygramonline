import type { ProfileData } from '../../types';

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

    // A API pode retornar um array ou um objeto com uma propriedade de resultados.
    // Vamos pegar o primeiro resultado, como solicitado.
    let profileDataFromApi;
    if (apiData.results && Array.isArray(apiData.results) && apiData.results.length > 0) {
        profileDataFromApi = apiData.results[0];
    } else if (Array.isArray(apiData) && apiData.length > 0) {
        profileDataFromApi = apiData[0];
    } else if (typeof apiData === 'object' && apiData !== null && !Array.isArray(apiData) && apiData.username) {
        // Lida com o caso de ser um único objeto de perfil
        profileDataFromApi = apiData;
    } else {
        console.error('[profileService] Failed to fetch profile data: Invalid or empty response structure from backend.');
        throw new Error('Nenhum perfil encontrado na resposta da API.');
    }

    // Mapeia os campos da nova resposta da API para nossa interface ProfileData
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

    // Validação básica para campos essenciais
    if (!profile.username || !profile.fullName || !profile.profilePicUrl) {
      console.error('[profileService] Failed to fetch profile data: Invalid or incomplete response structure from backend.');
      throw new Error('Dados do perfil inválidos ou incompletos do backend.');
    }

    console.log(`[profileService] Successfully fetched and parsed real profile data for: ${profile.username}`);
    return profile;
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