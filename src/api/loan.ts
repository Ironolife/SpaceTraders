import type { UserData } from '../stores';
import type { AvailableLoan } from '../types';
import { updateUser } from './user';

export const getLoans = async ({
  accessToken,
}: UserData): Promise<AvailableLoan[]> => {
  const res = await fetch('https://api.spacetraders.io/game/loans', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  switch (res.status) {
    case 200: {
      return (await res.json()).loans as AvailableLoan[];
    }
    default: {
      throw new Error(await res.text());
    }
  }
};

export const takeLoan = async (
  userData: UserData,
  type: string
): Promise<void> => {
  const { accessToken, user } = userData;

  const res = await fetch(
    `https://api.spacetraders.io/users/${user.username}/loans?type=${type}`,
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

export const payLoan = async (
  userData: UserData,
  loanId: string
): Promise<void> => {
  const { accessToken, user } = userData;

  const res = await fetch(
    `https://api.spacetraders.io/users/${user.username}/loans/${loanId}`,
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

      break;
    }
    default: {
      throw new Error(await res.text());
    }
  }
};
