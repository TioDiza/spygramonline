
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
