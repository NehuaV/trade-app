import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GAMES, ITEM_TEMPLATES } from "../data/mockData";
import { Search, Filter, ShoppingBag } from "lucide-react";
import { useAtomValue } from "jotai";
import { marketListingsAtom, allItemsAtom } from "../store";

export const Marketplace: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const game = GAMES.find((g) => g.id === gameId);
  const listings = useAtomValue(marketListingsAtom);
  const allItems = useAtomValue(allItemsAtom);

  const [searchTerm, setSearchTerm] = useState("");
  const [rarityFilter, setRarityFilter] = useState("All");

  if (!game) return <div className="text-center py-20">Game not found</div>;

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
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-end justify-between bg-base-200 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl">
        <div className="flex items-center gap-3 sm:gap-6 flex-grow">
          <img
            src={game.image}
            alt={game.name}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-lg flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold truncate">
              {game.name} Market
            </h1>
            <p className="opacity-70 mt-1 text-sm sm:text-base">
              Browse thousands of skins and items safely.
            </p>
          </div>
        </div>
        <div className="stats shadow bg-base-100 w-full sm:w-auto">
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
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-base-200 p-3 sm:p-4 rounded-xl sticky top-16 sm:top-20 z-30 shadow-md">
        <div className="relative flex-grow">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search items..."
            className="input input-bordered w-full pl-9 sm:pl-10 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="select select-bordered w-full sm:w-40 md:w-48 text-sm sm:text-base"
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
          <Filter size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {itemsWithPricing.map((item) => (
          <Link
            to={`/item/${item.id}`}
            key={item.id}
            className="card bg-base-200 hover:bg-base-100 transition-colors duration-200 shadow-sm hover:shadow-xl border border-transparent hover:border-base-content/10 group"
          >
            <figure className="px-4 pt-4 relative">
              <div
                className={`absolute top-4 right-4 badge badge-outline bg-base-100 ${getRarityColor(
                  item.rarity
                )}`}
              >
                {item.rarity}
              </div>
              <img
                src={item.image}
                alt={item.name}
                className="rounded-xl h-40 w-full object-cover group-hover:scale-105 transition duration-500"
              />
            </figure>
            <div className="card-body p-3 sm:p-4 gap-2">
              <h2
                className="card-title text-sm sm:text-base line-clamp-1"
                title={item.name}
              >
                {item.name}
              </h2>
              <div className="flex items-center justify-between mt-2 gap-2">
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs opacity-50">Starting at</span>
                  <span className="text-base sm:text-lg font-bold text-secondary truncate">
                    {item.stock > 0
                      ? `${Math.round(item.minPrice * 100).toLocaleString()} NP`
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
        <div className="text-center py-20 opacity-50">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4" />
          <p className="text-xl">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
