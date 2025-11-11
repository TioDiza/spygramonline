export interface ProfileData {
  username: string;
  fullName: string;
  profilePicUrl: string;
  biography?: string; // Tornando opcional, pois a API não retorna diretamente
  followers: number;
  following: number;
  postsCount: number;
  isVerified: boolean;
  isPrivate: boolean;
  topInteractions?: InteractionProfile[]; // Adicionado: lista de perfis com maior interação
}

export interface InteractionProfile {
  username: string;
  profilePicUrl: string;
  interactionScore: number; // Um score mockado para simular a interação
}

// A RapidAPI não usa 'success: true/false' no nível superior para dados de perfil,
// então as interfaces ApiResponse, ApiSuccessResponse e ApiErrorResponse não são mais necessárias
// para este endpoint específico.