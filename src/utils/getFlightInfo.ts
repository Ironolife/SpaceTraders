import type { Location, UserShip } from '../types';

const getFlightInfo = (
  { type, speed }: UserShip,
  fromLocation: Location,
  toLocation: Location
): { distance: number; fuelRequired: number; duration: number } => {
  const xDiff = Math.abs(fromLocation.x - toLocation.x);
  const yDiff = Math.abs(fromLocation.y - toLocation.y);
  const distance = Math.round(
    Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
  );

  const locationPenalty = fromLocation.type === 'PLANET' ? 2 : 0;
  const shipTypePenalty = type === 'MK-II' ? 1 : type === 'MK-III' ? 2 : 0;

  const fuelRequired =
    Math.round(distance / 4) + locationPenalty + shipTypePenalty + 1;

  const duration = Math.round(distance * (2 / speed) + 60);

  return { distance, fuelRequired, duration };
};

export default getFlightInfo;
