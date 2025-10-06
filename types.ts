export interface ProfileData {
  username: string;
  fullName: string;
  profilePicUrl: string;
  biography: string;
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

export interface ApiSuccessResponse {
  success: true;
  data: ProfileData;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;