import type { UserData } from '../stores';
import { userData } from '../stores';
import type { User } from '../types';

export const updateUser = async ({
  accessToken,
  user,
}: UserData): Promise<void> => {
  const res = await fetch(
    `https://api.spacetraders.io/users/${user.username}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  switch (res.status) {
    case 200: {
      const { user } = (await res.json()) as {
        user: User;
      };

      userData.set({
        user,
        accessToken,
      });

      break;
    }
    default: {
      throw new Error(await res.text());
    }
  }
};
