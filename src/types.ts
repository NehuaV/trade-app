export interface Game {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface ItemTrait {
  name: string;
  value: string | number;
  rarity?: number; // 0-100
}

export interface ItemTemplate {
  id: string;
  gameId: string;
  name: string;
  image: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Mythical" | "Legendary" | "Ancient";
  description: string;
  basePrice: number; // For graph simulation
}

export interface ItemInstance {
  id: string; // Unique ID for the specific instance
  templateId: string;
  ownerId: string;
  traits: Record<string, any>; // Flexible JSON traits
  acquiredDate: string;
}

export interface MarketListing {
  id: string;
  itemInstanceId: string;
  sellerId: string; // 'me' or 'other'
  price: number;
  listedDate: string;
}

export interface PricePoint {
  date: string;
  price: number;
}
