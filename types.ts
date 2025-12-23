export interface ProfileData {
  username: string;
  fullName: string;
  profilePicUrl: string;
  biography?: string;
  followers: number;
  following: number;
  postsCount: number;
  isVerified: boolean;
  isPrivate: boolean;
}

export interface SuggestedProfile {
  username: string;
  profile_pic_url: string;
}