import { PROXY_FOLLOWERS_URL } from '../constants';
import type { ProfileData } from '../types';

// A chave da RapidAPI é acessada via process.env
const RAPIDAPI_KEY = process.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'instagram-scraper-stable-api.p.rapidapi.com'; // Host da RapidAPI

export const fetchProfileData = async (username: string): Promise<ProfileData> => {
  if (!username) {
    throw new Error('Username cannot be empty.');
  }

  if (!RAPIDAPI_KEY) {
    throw new Error('RapidAPI key is not defined. Please check your .env.local file.');
  }

  const url = new URL(PROXY_FOLLOWERS_URL);
  url.searchParams.append('username', username); // O parâmetro esperado pela RapidAPI é 'username'

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
      throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // A resposta da RapidAPI para este endpoint parece vir com a chave 'user_data'
    if (!data || !data.user_data) {
      throw new Error('Failed to fetch profile data: Invalid response structure from API.');
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
      throw new Error(`An error occurred: ${error.message}`);
    }
    throw new Error('An unknown error occurred while fetching data.');
  }
};