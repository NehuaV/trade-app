import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GAMES, ITEM_TEMPLATES } from "../data/mockData";
import { Search, Filter, ShoppingBag } from "lucide-react";
import { useAtomValue } from "jotai";
import { marketListingsAtom, allItemsAtom } from "../store";
import { ItemIcon } from "../utils/itemIcons";

export const Marketplace: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const game = GAMES.find((g) => g.id === gameId);
  const listings = useAtomValue(marketListingsAtom);
  const allItems = useAtomValue(allItemsAtom);

  const [searchTerm, setSearchTerm] = useState("");
  const [rarityFilter, setRarityFilter] = useState("All");

  if (!game) return <div className="py-20 text-center">Game not found</div>;

  // 1. Filter Item Templates by Game
  const gameItemTemplates = ITEM_TEMPLATES.filter((t) => t.gameId === gameId);

  // 2. Calculate lowest price for each template based on active listings
  const itemsWithPricing = gameItemTemplates
    .map((template) => {
      // Find all listings that belong to an item instance of this template type
      const templateListings = listings.filter((l) => {
        const item = allItems.find((i) => i.id === l.itemInstanceId);
        return item && item.templateId === template.id;
      });

      const stock = templateListings.length;
      let minPrice = 0;

      if (stock > 0) {
        // Find actual lowest price from listings (stored as decimal, convert to display value)
        minPrice = Math.min(...templateListings.map((l) => l.price * 100));
      } else {
        // If out of stock, use base price for display purposes (already stored as display value)
        minPrice = template.basePrice;
      }

      return {
        ...template,
        minPrice,
        stock,
      };
    })
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRarity =
        rarityFilter === "All" || item.rarity === rarityFilter;
      return matchesSearch && matchesRarity;
    });

  const rarities = [
    "All",
    "Common",
    "Uncommon",
    "Rare",
    "Mythical",
    "Legendary",
    "Ancient",
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Ancient":
        return "border-red-500 text-red-500";
      case "Legendary":
        return "border-purple-500 text-purple-500";
      case "Mythical":
        return "border-fuchsia-500 text-fuchsia-500";
      case "Rare":
        return "border-blue-500 text-blue-500";
      default:
        return "border-gray-500 text-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-base-200 flex flex-col items-start justify-between gap-4 rounded-xl p-4 sm:flex-row sm:items-end sm:gap-6 sm:rounded-2xl sm:p-6 md:p-8">
        <div className="flex flex-grow items-center gap-3 sm:gap-6">
          <img
            src={game.image}
            alt={game.name}
            className="h-16 w-16 flex-shrink-0 rounded-xl object-cover shadow-lg sm:h-20 sm:w-20 md:h-24 md:w-24"
          />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl font-bold sm:text-3xl md:text-4xl">
              {game.name} Market
            </h1>
            <p className="mt-1 text-sm opacity-70 sm:text-base">
              Browse thousands of skins and items safely.
            </p>
          </div>
        </div>
        <div className="stats bg-base-100 w-full shadow sm:w-auto">
          <div className="stat py-3 sm:py-4">
            <div className="stat-title text-xs sm:text-sm">Total Listings</div>
            <div className="stat-value text-secondary text-xl sm:text-2xl md:text-3xl">
              {itemsWithPricing.reduce((acc, curr) => acc + curr.stock, 0)}
            </div>
            <div className="stat-desc text-xs sm:text-sm">
              For {itemsWithPricing.length} unique items
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-200 sticky top-16 z-30 flex flex-col gap-3 rounded-xl p-3 shadow-md sm:top-20 sm:flex-row sm:gap-4 sm:p-4">
        <div className="relative flex-grow">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search items..."
            className="input input-bordered w-full pl-9 text-sm sm:pl-10 sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="select select-bordered w-full text-sm sm:w-40 sm:text-base md:w-48"
          value={rarityFilter}
          onChange={(e) => setRarityFilter(e.target.value)}
        >
          {rarities.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button className="btn btn-secondary btn-square btn-sm sm:btn-md">
          <Filter size={18} className="sm:h-5 sm:w-5" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {itemsWithPricing.map((item) => (
          <Link
            to={`/item/${item.id}`}
            key={item.id}
            className="card bg-base-200 hover:bg-base-100 hover:border-base-content/10 group border border-transparent shadow-sm transition-colors duration-200 hover:shadow-xl"
          >
            <figure className="relative px-4 pt-4">
              <div
                className={`badge badge-outline bg-base-100 absolute top-4 right-4 ${getRarityColor(
                  item.rarity,
                )}`}
              >
                {item.rarity}
              </div>
              <div className="from-base-300 to-base-200 flex h-40 w-full items-center justify-center rounded-xl bg-gradient-to-br transition duration-500 group-hover:scale-105">
                <ItemIcon
                  iconName={item.image}
                  size="4rem"
                  className="text-secondary"
                />
              </div>
            </figure>
            <div className="card-body gap-2 p-3 sm:p-4">
              <h2
                className="card-title line-clamp-1 text-sm sm:text-base"
                title={item.name}
              >
                {item.name}
              </h2>
              <div className="mt-2 flex items-center justify-between gap-2">
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-xs opacity-50">Starting at</span>
                  <span className="text-secondary truncate text-base font-bold sm:text-lg">
                    {item.stock > 0
                      ? `${item.minPrice.toLocaleString()} NP`
                      : "Sold Out"}
                  </span>
                </div>
                <div
                  className={`badge badge-sm sm:badge-md ${
                    item.stock > 0
                      ? "badge-neutral"
                      : "badge-error badge-outline"
                  } flex-shrink-0`}
                >
                  {item.stock}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {itemsWithPricing.length === 0 && (
        <div className="py-20 text-center opacity-50">
          <ShoppingBag className="mx-auto mb-4 h-16 w-16" />
          <p className="text-xl">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
