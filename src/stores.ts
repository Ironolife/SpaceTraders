import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';
import { getFlightPlan } from './api/flight';
import Home from './pages/Home.svelte';
import type { FlightPlan, System, User } from './types';
import dayjs from 'dayjs';
import { updateUser } from './api/user';

type Route = {
  href: string;
  component: typeof SvelteComponent;
  params?: any;
};
export const route = writable<Route>({ href: '/', component: Home });

export type UserData = {
  accessToken: string;
  user: User;
};
export const userData = writable<UserData | null>(null);

export const systems = writable<System[] | null>(null);

export const createFlightPlanStore = () => {
  const timeOuts: number[] = [];

  const { subscribe, set } = writable<FlightPlan | undefined | null>(
    undefined,
    () => {
      const stop = () => {
        timeOuts.forEach((timeout) => clearTimeout(timeout));
      };
      return stop;
    }
  );

  const reset = () => set(undefined);

  const updateOnArrival = (userData: UserData, flightPlan: FlightPlan) => {
    let timeRemaining = dayjs(flightPlan.arrivesAt).diff(dayjs(), 'seconds');
    if (timeRemaining < 0) timeRemaining = 0;

    const timeout = setTimeout(async () => {
      await updateUser(userData);
      reset();
    }, timeRemaining * 1000);

    timeOuts.push(timeout);
  };

  const update = (userData: UserData, flightPlan: FlightPlan) => {
    updateOnArrival(userData, flightPlan);
    set(flightPlan);
  };
  const fetch = async (userData: UserData, shipId: string) => {
    const flightPlan = await getFlightPlan(userData, shipId);
    if (flightPlan) {
      updateOnArrival(userData, flightPlan);
      set(flightPlan);
    }
  };

  return {
    subscribe,
    fetch,
    update,
    reset,
  };
};
