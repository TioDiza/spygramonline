import { PROXY_FOLLOWERS_URL } from '../constants';
import type { ApiResponse, ProfileData, ApiErrorResponse } from '../types';

export const fetchProfileData = async (username: string): Promise<ProfileData> => {
  if (!username) {
    throw new Error('Username cannot be empty.');
  }

  const url = new URL(PROXY_FOLLOWERS_URL);
  url.searchParams.append('user', username);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();

    if (!data.success) {
      const errorData = data as ApiErrorResponse;
      throw new Error(errorData.message || 'Failed to fetch profile data.');
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
        throw new Error(`An error occurred: ${error.message}`);
    }
    throw new Error('An unknown error occurred while fetching data.');
  }
};