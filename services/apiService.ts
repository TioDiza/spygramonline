
import { PROXY_FOLLOWERS_URL } from '../constants';
import type { ApiResponse, ProfileData } from '../types';

export const fetchProfileData = async (username: string): Promise<ProfileData> => {
  if (!username) {
    throw new Error('Username cannot be empty.');
  }

  // NOTE: The PHP backend seems to expect a parameter named 'user', not 'username'.
  // This is an assumption based on typical API design for such services.
  const url = new URL(PROXY_FOLLOWERS_URL);
  url.searchParams.append('user', username);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();

    // Fix for line 27: Check for the failure case first to allow TypeScript to correctly
    // narrow the type of `data` to `ApiErrorResponse` and access `data.message`.
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch profile data.');
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
        throw new Error(`An error occurred: ${error.message}`);
    }
    throw new Error('An unknown error occurred while fetching data.');
  }
};
