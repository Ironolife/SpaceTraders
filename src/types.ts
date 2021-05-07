export type KeyValuePair<T = string> = {
  key: string;
  value: T;
};

type Loan = {
  type: string;
};

export type AvailableLoan = Loan & {
  amount: number;
  rate: number;
  termInDays: number;
  collateralRequired: boolean;
};

export type UserLoan = Loan & {
  id: string;
  due: string;
  repaymentAmount: number;
  status: string;
};

export type PurchaseLocation = {
  location: string;
  system: string;
  price: number;
};

export type DockedShip = {
  shipId: string;
  username: string;
  shipType: string;
};

export type Ship = {
  type: string;
  class: string;
  manufacturer: string;
  weapons: number;
  plating: number;
  speed: number;
  maxCargo: number;
};

export type AvailableShip = Ship & {
  purchaseLocations: PurchaseLocation[];
};

export type CargoItem = {
  good: string;
  quantity: number;
  totalVolume: number;
};

export type UserShip = Ship & {
  id: string;
  location?: string;
  x: number;
  y: number;
  cargo: CargoItem[];
  spaceAvailable: number;
  flightPlanId?: string;
};

export type User = {
  username: string;
  credits: number;
  ships: UserShip[];
  loans: UserLoan[];
};

export interface Structure {
  id: string;
  type: string;
  location: string;
  ownedBy?: {
    username: string;
  };
}

export type Location = {
  symbol: string;
  name: string;
  type: string;
  x: number;
  y: number;
  allowsConstruction: boolean;
  structures: any[];
  messages?: string[];
};

export interface System {
  symbol: string;
  name: string;
  locations: Location[];
}

export type MarketItem = {
  symbol: string;
  quantityAvailable: number;
  volumePerUnit: number;
  pricePerUnit: number;
  purchasePricePerUnit: number;
  sellPricePerUnit: number;
  spread: number;
};

export type Marketplace = Location & {
  marketplace: MarketItem[];
};

export type FlightPlan = {
  id: string;
  shipId: string;
  departure: string;
  destination: string;
  createdAt: string;
  arrivesAt: string;
  terminatedAt: string | null;
  distance: number;
  fuelConsumed: number;
  fuelRemaining: number;
  timeRemainingInSeconds: number;
};

export type LeaderBoard = {
  netWorth: LeaderBoardRecord[];
  userNetWorth: LeaderBoardRecord[];
};

export type LeaderBoardRecord = {
  rank: number;
  username: string;
  netWorth: number;
};
