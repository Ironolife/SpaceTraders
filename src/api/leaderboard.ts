import type { UserData } from '../stores';
import type { LeaderBoard } from '../types';

export const getLeaderBoard = async ({
  accessToken,
}: UserData): Promise<LeaderBoard> => {
  const res = await fetch(
    'https://api.spacetraders.io/game/leaderboard/net-worth',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  switch (res.status) {
    case 200: {
      return (await res.json()) as LeaderBoard;
    }
    default: {
      throw new Error(await res.text());
    }
  }
};
