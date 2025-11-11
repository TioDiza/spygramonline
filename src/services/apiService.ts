import { PROXY_FOLLOWERS_URL } from '../../constants';
import type { ApiResponse, ProfileData, ApiErrorResponse, InteractionProfile } from '../../types';

// Função para gerar dados de perfil mockados
const generateMockProfileData = (username: string): ProfileData => {
  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const mockInteractions: InteractionProfile[] = Array.from({ length: 5 }).map((_, i) => ({
    username: `usuario_secreto_${i + 1}`,
    profilePicUrl: `https://picsum.photos/id/${random(1, 100)}/50/50`,
    interactionScore: random(70, 99),
  }));

  return {
    username: username,
    fullName: `Nome Completo de ${username}`,
    profilePicUrl: `https://picsum.photos/id/${random(1, 100)}/150/150`,
    biography: `Esta é uma biografia gerada para ${username}. Contém informações interessantes e um pouco de mistério. Desbloqueie o acesso premium para ver a biografia real e todos os detalhes!`,
    followers: random(1000, 50000),
    following: random(100, 1000),
    postsCount: random(50, 500),
    isVerified: Math.random() > 0.8, // 20% de chance de ser verificado
    isPrivate: Math.random() > 0.5, // 50% de chance de ser privado
    topInteractions: mockInteractions,
  };
};

export const fetchProfileData = async (username: string): Promise<ProfileData> => {
  if (!username) {
    throw new Error('Username cannot be empty.');
  }

  const url = new URL(PROXY_FOLLOWERS_URL);
  url.searchParams.append('user', username);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      // Se a resposta da rede não for OK, tentamos parsear como erro ou lançamos um erro genérico
      try {
        const errorData: ApiErrorResponse = await response.json();
        throw new Error(errorData.message || `Network response was not ok: ${response.statusText}`);
      } catch (jsonError) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    }

    const data: ApiResponse = await response.json();

    if (!data.success) {
      const errorData = data as ApiErrorResponse;
      throw new Error(errorData.message || 'Failed to fetch profile data.');
    }

    return data.data;
  } catch (error) {
    console.error(`Erro ao buscar dados do perfil para ${username} da API. Usando dados mockados como fallback.`, error);
    // Em caso de erro, retorna dados mockados para garantir que a UI sempre exiba algo.
    return generateMockProfileData(username);
  }
};