import { BACKEND_API_BASE_URL } from '../../constants';
import type { ProfileData } from '../../types';

// Dados mockados para usar como fallback (agora exportados)
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
    throw new Error('Username cannot be empty.');
  }

  const url = `${BACKEND_API_BASE_URL}/api/profile/${username}`;

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      // Lança um erro com a mensagem do backend se a resposta não for OK
      throw new Error(`Backend Proxy Error (${response.status}): ${errorText || 'Unknown error'}`);
    }

    const data: ProfileData = await response.json();

    // Verifica se a estrutura dos dados retornados é válida
    if (!data || !data.username || !data.fullName || !data.profilePicUrl) {
      throw new Error('Failed to fetch profile data: Invalid or incomplete response structure from backend proxy.');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`An error occurred during backend proxy fetch: ${error.message}`);
      // Re-lança o erro para que o App.tsx possa capturá-lo e exibi-lo
      throw new Error(`Failed to fetch profile data: ${error.message}. Please check your backend proxy.`);
    } else {
      console.error('An unknown error occurred while fetching data from backend proxy.');
      throw new Error('An unknown error occurred while fetching profile data. Please check your backend proxy.');
    }
  }
};