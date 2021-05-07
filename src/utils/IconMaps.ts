const locationIconMap = new Map<string, string>([
  ['PLANET', '🌍'],
  ['MOON', '🌕'],
  ['ASTEROID', '🌑'],
  ['GAS_GIANT', '🪐'],
]);

export const getLocationIcon = (type: string): string => {
  return locationIconMap.get(type) || '🌌';
};

const itemIconMap = new Map<string, string>([
  ['DRONES', '🤖'],
  ['MACHINERY', '⚙️'],
  ['FUEL', '⛽'],
  ['FUSIION_REACTORS', '☢️'],
]);

export const getItemIcon = (symbol: string): string => {
  return itemIconMap.get(symbol) || '📦';
};
