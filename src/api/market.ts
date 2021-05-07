import type { UserData } from '../stores';
import type { Marketplace } from '../types';
import { updateUser } from './user';

export const getMarketplace = async (
  { accessToken }: UserData,
  location: string
): Promise<Marketplace> => {
  const res = await fetch(
    `https://api.spacetraders.io/game/locations/${location}/marketplace`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  switch (res.status) {
    case 200: {
      return (await res.json()).location as Marketplace;
    }
    default: {
      throw new Error(await res.text());
    }
  }
};

export const buyMarketItem = async (
  userData: UserData,
  shipId: string,
  item: string,
  quantity: number
): Promise<string | null> => {
  const { accessToken, user } = userData;

  const res = await fetch(
    `https://api.spacetraders.io/users/${user.username}/purchase-orders?shipId=${shipId}&good=${item}&quantity=${quantity}`,
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
      return null;
    }
    default: {
      return (await res.json()).error.message || 'unknown error occurred';
    }
  }
};

export const sellMarketItem = async (
  userData: UserData,
  shipId: string,
  item: string,
  quantity: number
): Promise<string | null> => {
  const { accessToken, user } = userData;

  const res = await fetch(
    `https://api.spacetraders.io/users/${user.username}/sell-orders?shipId=${shipId}&good=${item}&quantity=${quantity}`,
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
      return null;
    }
    default: {
      return (await res.json()).error.message || 'unknown error occurred';
    }
  }
};
