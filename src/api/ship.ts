import type { UserData } from '../stores';
import type { AvailableShip, UserShip } from '../types';
import { updateUser } from './user';

export const getShips = async (
  { accessToken }: UserData,
  _class?: string
): Promise<AvailableShip[]> => {
  let url = 'https://api.spacetraders.io/game/ships';
  if (_class) url += `?class=${_class}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  switch (res.status) {
    case 200: {
      return (await res.json()).ships as AvailableShip[];
    }
    default: {
      throw new Error(await res.text());
    }
  }
};

export const getShip = async (
  { accessToken, user }: UserData,
  shipId: string
): Promise<UserShip | null> => {
  const res = await fetch(
    `https://api.spacetraders.io/users/${user.username}/ships/${shipId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  switch (res.status) {
    case 200: {
      return (await res.json()).ship as UserShip;
    }
    case 404: {
      return null;
    }
    default: {
      throw new Error(await res.text());
    }
  }
};

export const buyShip = async (
  userData: UserData,
  location: string,
  type: string
): Promise<void> => {
  const { accessToken, user } = userData;

  const res = await fetch(
    `https://api.spacetraders.io/users/${user.username}/ships?location=${location}&type=${type}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  switch (res.status) {
    case 201: {
      await updateUser(userData);

      break;
    }
    default: {
      throw new Error(await res.text());
    }
  }
};

export const jettisonCargo = async (
  userData: UserData,
  shipId: string,
  good: string,
  quantity: number
): Promise<string | null> => {
  const { accessToken, user } = userData;

  const res = await fetch(
    `https://api.spacetraders.io/users/${user.username}/ships/${shipId}/jettison?good=${good}&quantity=${quantity}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  switch (res.status) {
    case 200: {
      await updateUser(userData);
      return null;
    }
    default: {
      return (await res.json()).error.message || 'unknown error occurred';
    }
  }
};

export const scrapShip = async (
  userData: UserData,
  shipId: string
): Promise<void> => {
  const { accessToken, user } = userData;

  const res = await fetch(
    `https://api.spacetraders.io/users/${user.username}/ships/${shipId}/`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  switch (res.status) {
    case 200: {
      await updateUser(userData);

      break;
    }
    default: {
      throw new Error(await res.text());
    }
  }
};
