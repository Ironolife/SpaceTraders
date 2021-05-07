import type { UserData } from '../stores';
import type { FlightPlan } from '../types';
import { getShip } from './ship';
import { updateUser } from './user';

export const submitFlightPlan = async (
  userData: UserData,
  shipId: string,
  location: string
): Promise<FlightPlan> => {
  const { accessToken, user } = userData;

  const res = await fetch(
    `https://api.spacetraders.io/users/${user.username}/flight-plans?shipId=${shipId}&destination=${location}`,
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
      return (await res.json()).flightPlan as FlightPlan;
    }
    default: {
      return (await res.json()).error.message || 'unknown error occurred';
    }
  }
};

export const getFlightPlan = async (
  userData: UserData,
  shipId: string
): Promise<FlightPlan> => {
  const { accessToken, user } = userData;

  const ship = await getShip(userData, shipId);

  const res = await fetch(
    `https://api.spacetraders.io/users/${user.username}/flight-plans/${ship.flightPlanId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  switch (res.status) {
    case 200: {
      return (await res.json()).flightPlan as FlightPlan;
    }
    case 404: {
      await updateUser(userData);
      return null;
    }
    default: {
      return (await res.json()).error.message || 'unknown error occurred';
    }
  }
};
