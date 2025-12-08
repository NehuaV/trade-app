import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ItemInstance, MarketListing } from "./types";
import { INITIAL_INVENTORY, generateMockMarketData } from "./data/mockData";

// Generate mock data for the store
const { items: marketItems, listings: initialListings } =
  generateMockMarketData();

// User Balance (in Nexus Points)
export const balanceAtom = atomWithStorage<number>("nexus_balance", 1000.0);

// All items existing in the world (Inventory + Market)
// In a real app, this would be DB backed. Here we combine local inventory + mock market items
export const allItemsAtom = atomWithStorage<ItemInstance[]>("nexus_items_v2", [
  ...INITIAL_INVENTORY,
  ...marketItems,
]);

// Active Market Listings
export const marketListingsAtom = atomWithStorage<MarketListing[]>(
  "nexus_listings_v2",
  initialListings,
);

// Derived atom: My Inventory (Items I own that are NOT listed)
// NOTE: For this simple prototype, if it's listed, it's technically still "mine" until sold,
// but usually marketplaces remove it from "Available Inventory" while listed.
export const myInventoryAtom = atom((get) => {
  const allItems = get(allItemsAtom);
  const listings = get(marketListingsAtom);
  const listedItemIds = new Set(listings.map((l) => l.itemInstanceId));

  return allItems.filter(
    (item) => item.ownerId === "me" && !listedItemIds.has(item.id),
  );
});

// Derived atom: My Listings
export const myListingsAtom = atom((get) => {
  const listings = get(marketListingsAtom);
  return listings.filter((l) => l.sellerId === "me");
});

// Action: Sell Item
export const sellItemAtom = atom(
  null,
  (get, set, { itemId, price }: { itemId: string; price: number }) => {
    const newListing: MarketListing = {
      id: `l_${Date.now()}`,
      itemInstanceId: itemId,
      sellerId: "me",
      price: price,
      listedDate: new Date().toISOString(),
    };
    set(marketListingsAtom, (prev) => [...prev, newListing]);
  },
);

// Action: Buy Item
export const buyItemAtom = atom(null, (get, set, listingId: string) => {
  const listings = get(marketListingsAtom);
  const listing = listings.find((l) => l.id === listingId);
  if (!listing) throw new Error("Listing not found or already sold.");

  const balance = get(balanceAtom);
  if (balance < listing.price) {
    throw new Error("Insufficient Nexus Points!");
  }

  // Deduct Balance
  set(balanceAtom, balance - listing.price);

  // Remove Listing
  set(marketListingsAtom, (prev) => prev.filter((l) => l.id !== listingId));

  // Transfer Ownership
  set(allItemsAtom, (prev) =>
    prev.map((item) => {
      if (item.id === listing.itemInstanceId) {
        return {
          ...item,
          ownerId: "me",
          acquiredDate: new Date().toISOString(),
        };
      }
      return item;
    }),
  );

  return true; // Return success
});
