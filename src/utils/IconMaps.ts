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
  ['DRONES', '🛩️'],
  ['MACHINERY', '⚙️'],
  ['FUEL', '⛽'],
  ['FUSIION_REACTORS', '☢️'],
  ['RESEARCH', '🔬'],
  ['TEXTILES', '👗'],
  ['FOOD', '🍖'],
  ['CONSTRUCTION_MATERIALS', '🧱'],
  ['UNSTABLE_COMPOUNDS', '🧪'],
  ['CHEMICALS', '🧪'],
  ['EXPLOSIVES', '🧨'],
  ['NARCOTICS', '💊'],
  ['ELECTRONICS', '🔌'],
  ['BIOMETRIC_FIREARMS', '🔫'],
  ['NANOBOTS', '🤖'],
  ['SHIP_PLATING', '🛡️'],
]);

export const getItemIcon = (symbol: string): string => {
  return itemIconMap.get(symbol) || '📦';
};
