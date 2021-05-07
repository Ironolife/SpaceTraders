import navaid from 'navaid';
import Home from '../pages/Home.svelte';
import LeaderBoard from '../pages/LeaderBoard.svelte';
import Loans from '../pages/Loans.svelte';
import LocationDetails from '../pages/LocationDetails.svelte';
import Locations from '../pages/Locations.svelte';
import NotFound from '../pages/NotFound.svelte';
import ShipDetails from '../pages/ShipDetails.svelte';
import Ships from '../pages/Ships.svelte';
import Systems from '../pages/Systems.svelte';
import { route } from '../stores';

const router = navaid('/', () => route.set({ href: '', component: NotFound }));

router
  .on('/', () => route.set({ href: '/', component: Home }))
  .on('/ships', () => route.set({ href: '/ships', component: Ships }))
  .on('/ships/:shipId', (params) =>
    route.set({ href: '/ships/:shipId', component: ShipDetails, params })
  )
  .on('/systems', () => route.set({ href: '/systems', component: Systems }))
  .on('/systems/:system', (params) =>
    route.set({ href: '/systems/:system', component: Locations, params })
  )
  .on('/systems/:system/:location', (params) =>
    route.set({
      href: '/systems/:system/:location',
      component: LocationDetails,
      params,
    })
  )
  .on('/loans', () => route.set({ href: '/loans', component: Loans }))
  .on('/leaderboard', () =>
    route.set({ href: '/leaderboard', component: LeaderBoard })
  );

export default router;
