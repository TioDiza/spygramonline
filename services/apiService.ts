import { BACKEND_API_BASE_URL } from '../constants';
import type { ProfileData } from '../types';

// Dados mockados para usar como fallback
const mockProfileData: ProfileData = {
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

  // Se BACKEND_API_BASE_URL não estiver configurado, usamos dados mockados
  if (!BACKEND_API_BASE_URL || BACKEND_API_BASE_URL === 'http://localhost:3000') {
    console.warn('BACKEND_API_BASE_URL is not configured or is default. Using mock data.');
    return mockProfileData;
  }

  // Assumimos que o backend proxy terá um endpoint como /api/profile/:username
  const url = `${BACKEND_API_BASE_URL}/api/profile/${username}`;

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      // Não precisamos mais de headers da RapidAPI aqui, o backend os gerencia
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend Proxy Error: ${response.status} - ${errorText}`);
      // Se o proxy retornar um erro, usamos os dados mockados
      console.warn('Backend proxy call failed. Using mock data as fallback.');
      return mockProfileData;
    }

    const data: ProfileData = await response.json();

    // O backend proxy deve retornar diretamente um objeto ProfileData
    if (!data || !data.username) {
      console.error('Failed to fetch profile data: Invalid response structure from backend proxy. Using mock data.');
      return mockProfileData;
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`An error occurred during backend proxy fetch: ${error.message}. Using mock data.`);
    } else {
      console.error('An unknown error occurred while fetching data from backend proxy. Using mock data.');
    }
    return mockProfileData; // Retorna mock data em caso de qualquer erro na requisição
  }
};