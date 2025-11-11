import { PROXY_FOLLOWERS_URL } from '../constants';
import type { ProfileData } from '../types';

// A chave da RapidAPI é acessada via process.env
const RAPIDAPI_KEY = process.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'instagram-scraper-stable-api.p.rapidapi.com'; // Host da RapidAPI

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

  if (!RAPIDAPI_KEY) {
    console.warn('RapidAPI key is not defined. Using mock data.');
    return mockProfileData; // Retorna mock data se a chave não estiver definida
  }

  const url = new URL(PROXY_FOLLOWERS_URL);
  url.searchParams.append('username_or_url', username); // CORRIGIDO: O parâmetro esperado pela RapidAPI é 'username_or_url'

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} - ${errorText}`);
      // Se a API retornar um erro, usamos os dados mockados
      console.warn('API call failed. Using mock data as fallback.');
      return mockProfileData;
    }

    const data = await response.json();

    // A resposta da RapidAPI para este endpoint parece vir com a chave 'user_data'
    if (!data || !data.user_data) {
      console.error('Failed to fetch profile data: Invalid response structure from API. Using mock data.');
      return mockProfileData; // Retorna mock data se a estrutura for inválida
    }

    const userData = data.user_data;

    // Mapeia os dados da API para a interface ProfileData
    const profileData: ProfileData = {
      username: userData.username,
      fullName: userData.full_name,
      profilePicUrl: userData.profile_pic_url,
      biography: userData.biography || 'Biografia não disponível.', // Fornece um valor padrão
      followers: userData.follower_count,
      following: userData.following_count,
      postsCount: userData.media_count,
      isVerified: userData.is_verified,
      isPrivate: userData.is_private,
      // topInteractions será gerado no App.tsx ou InvasionConcludedPage.tsx, pois não vem da API
    };

    return profileData;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`An error occurred during API fetch: ${error.message}. Using mock data.`);
    } else {
      console.error('An unknown error occurred while fetching data. Using mock data.');
    }
    return mockProfileData; // Retorna mock data em caso de qualquer erro na requisição
  }
};