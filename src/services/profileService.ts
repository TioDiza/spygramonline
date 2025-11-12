import { BACKEND_API_BASE_URL } from '../../constants';
import type { ProfileData } from '../../types';

// Dados mockados para usar como fallback (AGORA EXPORTADOS)
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
    console.warn('Username cannot be empty. Returning mock data.');
    return mockProfileData;
  }

  const url = `${BACKEND_API_BASE_URL}/api/profile/${username}`;
  console.log(`Attempting to fetch profile data from: ${url}`); // Log da URL

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend Proxy Error (${response.status}): ${errorText || 'Unknown error'}. Returning mock data.`);
      return mockProfileData;
    }

    const rawData: { user_data?: ProfileData } = await response.json();
    console.log('Raw data received from backend:', rawData); // Log da resposta bruta

    const data = rawData.user_data;
    console.log('Extracted user_data from raw data:', data); // Log dos dados extraídos

    if (!data || !data.username || !data.fullName || !data.profilePicUrl) {
      console.error('Failed to fetch profile data: Invalid or incomplete response structure from backend proxy. Returning mock data.');
      return mockProfileData;
    }

    console.log('Successfully fetched and parsed real profile data:', data.username); // Log de sucesso
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`An error occurred during backend proxy fetch: ${error.message}. Returning mock data.`);
    } else {
      console.error('An unknown error occurred while fetching data from backend proxy. Returning mock data.');
    }
    return mockProfileData;
  }
};