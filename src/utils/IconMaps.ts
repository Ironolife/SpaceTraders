const locationIconMap = new Map<string, string>([
  ['PLANET', '๐'],
  ['MOON', '๐'],
  ['ASTEROID', '๐'],
  ['GAS_GIANT', '๐ช'],
]);

export const getLocationIcon = (type: string): string => {
  return locationIconMap.get(type) || '๐';
};

const itemIconMap = new Map<string, string>([
  ['DRONES', '๐ฉ๏ธ'],
  ['MACHINERY', 'โ๏ธ'],
  ['FUEL', 'โฝ'],
  ['FUSIION_REACTORS', 'โข๏ธ'],
  ['RESEARCH', '๐ฌ'],
  ['TEXTILES', '๐'],
  ['FOOD', '๐'],
  ['CONSTRUCTION_MATERIALS', '๐งฑ'],
  ['UNSTABLE_COMPOUNDS', '๐งช'],
  ['CHEMICALS', '๐งช'],
  ['EXPLOSIVES', '๐งจ'],
  ['NARCOTICS', '๐'],
  ['ELECTRONICS', '๐'],
  ['BIOMETRIC_FIREARMS', '๐ซ'],
  ['NANOBOTS', '๐ค'],
  ['SHIP_PLATING', '๐ก๏ธ'],
]);

export const getItemIcon = (symbol: string): string => {
  return itemIconMap.get(symbol) || '๐ฆ';
};
