import type { UserData } from '../stores';
import type { DockedShip, Location, System } from '../types';

export const getSystems = async ({
  accessToken,
}: UserData): Promise<System[]> => {
  const res = await fetch('https://api.spacetraders.io/game/systems', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  switch (res.status) {
    case 200: {
      return (await res.json()).systems as System[];
    }
    default: {
      throw new Error(await res.text());
    }
  }
};

export const getLocation = async (
  { accessToken }: UserData,
  location: string
): Promise<Location> => {
  const res = await fetch(
    `https://api.spacetraders.io/game/locations/${location}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  switch (res.status) {
    case 200: {
      return (await res.json()).location as Location;
    }
    default: {
      throw new Error(await res.text());
    }
  }
};

export const getDockedShips = async (
  { accessToken }: UserData,
  location: string
): Promise<DockedShip[]> => {
  const res = await fetch(
    `https://api.spacetraders.io/game/locations/${location}/ships`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  switch (res.status) {
    case 200: {
      return (await res.json()).ships as DockedShip[];
    }
    default: {
      throw new Error(await res.text());
    }
  }
};
