import { BACKEND_API_BASE_URL } from '../../constants';
import type { ProfileData } from '../../types';

// Dados mockados para usar como fallback
export const mockProfileData: ProfileData = {
  username: "usuario_mockado",
  fullName: "Usuário de Teste Mockado",
  profilePicUrl: "https://picsum.photos/id/1005/200/200",
  biography: "Esta é uma biografia de teste para um perfil mockado. O acesso premium revelaria a biografia real e muito mais!",
  followers: 12345,
  following: 678,
  postsCount: 123,
  isVerified: false,
  isPrivate: true,
  topInteractions: [
    { username: "amigo_secreto", profilePicUrl: "https://picsum.photos/id/1011/100/100", interactionScore: 95 },
    { username: "contatinho_x", profilePicUrl: "https://picsum.photos/id/1012/100/100", interactionScore: 88 },
    { username: "ex_namorado", profilePicUrl: "https://picsum.photos/id/1013/100/100", interactionScore: 76 },
    { username: "rival_da_escola", profilePicUrl: "https://picsum.photos/id/1014/100/100", interactionScore: 65 },
    { username: "colega_de_trabalho", profilePicUrl: "https://picsum.photos/id/1015/100/100", interactionScore: 50 },
  ],
};

export const fetchProfileData = async (username: string): Promise<ProfileData> => {
  if (!username) {
    console.warn('[profileService] Username cannot be empty. Returning mock data.');
    return mockProfileData;
  }

  const url = `${BACKEND_API_BASE_URL}/perfil/${username}`;
  console.log(`[profileService] Attempting to fetch profile data from: ${url}`);

  try {
    console.log(`[profileService] Starting fetch for ${username}...`);
    const response = await fetch(url.toString(), {
      method: 'GET',
    });
    console.log(`[profileService] Fetch response received for ${username}. Status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text(); // Tenta ler o corpo da resposta como texto
      let errorMessage = `Backend Proxy Error (${response.status}): ${errorText || 'Unknown error'}`;
      try {
        const errorData = JSON.parse(errorText); // Tenta parsear como JSON se for válido
        errorMessage = errorData.erro || errorData.message || errorMessage;
      } catch (e) {
        // Se não for JSON, mantém a mensagem original
      }
      console.error(`[profileService] ${errorMessage}. Returning mock data.`);
      return mockProfileData;
    }

    const apiData = await response.json();
    console.log(`[profileService] Raw data received from backend (Apify) for ${username}:`, apiData);

    // Mapeia os campos da resposta da Apify para a interface ProfileData
    const profile: ProfileData = {
      username: apiData.username,
      fullName: apiData.fullName,
      profilePicUrl: apiData.profilePicUrl,
      biography: apiData.biography,
      followers: apiData.followersCount, // Mapeia followersCount para followers
      following: apiData.followsCount,   // Mapeia followsCount para following
      postsCount: apiData.postsCount,
      isVerified: apiData.verified,      // Mapeia verified para isVerified
      isPrivate: apiData.private,        // Mapeia private para isPrivate
      topInteractions: mockProfileData.topInteractions, // Mantém mock para interações, pois a Apify não fornece
    };

    // Validação básica para campos essenciais
    if (!profile.username || !profile.fullName || !profile.profilePicUrl) {
      console.error('[profileService] Failed to fetch profile data: Invalid or incomplete response structure from backend proxy. Returning mock data.');
      return mockProfileData;
    }

    console.log(`[profileService] Successfully fetched and parsed real profile data for: ${profile.username}`);
    return profile;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[profileService] An error occurred during backend proxy fetch for ${username}: ${error.message}. Returning mock data.`);
    } else {
      console.error('[profileService] An unknown error occurred while fetching data from backend proxy. Returning mock data.');
    }
    return mockProfileData;
  }
};