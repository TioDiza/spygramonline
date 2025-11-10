import type { ProfileData, InteractionProfile } from '../../types';

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

  console.warn(`API call for ${username} bypassed. Returning mock data.`);
  return generateMockProfileData(username);
};