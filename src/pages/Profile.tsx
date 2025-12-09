import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { allItemsAtom } from "../store";
import { ITEM_TEMPLATES, GAMES } from "../data/mockData";
import { User, Calendar, Shield, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ItemInstance, ItemTemplate } from "../types";
import { ItemIcon } from "../utils/itemIcons";

type ShowcaseItem = ItemInstance & { template: ItemTemplate };

export const Profile: React.FC = () => {
  const allItems = useAtomValue(allItemsAtom);
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);

  // Get all items owned by 'me' (including listed ones for display purposes in profile showcase)
  const myItems = allItems.filter((item) => item.ownerId === "me");

  // Group items by game for showcase
  const itemsByGame = myItems.reduce<Record<string, ShowcaseItem[]>>(
    (acc, item) => {
      const template = ITEM_TEMPLATES.find((t) => t.id === item.templateId);
      if (!template) return acc;
      if (!acc[template.gameId]) acc[template.gameId] = [];
      acc[template.gameId].push({ ...item, template });
      return acc;
    },
    {}
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Profile Header */}
      <div className="card bg-base-200 shadow-xl overflow-hidden">
        <div className="h-24 sm:h-32 bg-gradient-to-r from-secondary to-primary opacity-80"></div>
        <div className="card-body -mt-12 sm:-mt-16 flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6 pb-4 sm:pb-6">
          <div className="avatar online placeholder ring ring-base-100 ring-offset-base-100 ring-offset-2 rounded-full flex-shrink-0">
            <div className="bg-neutral text-neutral-content rounded-full w-24 h-24 sm:w-32 sm:h-32 text-2xl sm:text-3xl flex items-center justify-center">
              <span>ME</span>
            </div>
          </div>
          <div className="flex-grow mb-2 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold">Demo User</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm opacity-70 mt-1">
              <span className="flex items-center gap-1">
                <Calendar size={12} className="sm:w-3.5 sm:h-3.5" /> Joined Oct
                2023
              </span>
              <span className="flex items-center gap-1">
                <Shield size={12} className="sm:w-3.5 sm:h-3.5" /> Verified
                Trader
              </span>
            </div>
          </div>
          <div className="mb-0 sm:mb-4 w-full sm:w-auto">
            <Link to="/inventory" className="btn btn-primary w-full sm:w-auto">
              Manage Inventory
            </Link>
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold border-b border-base-content/10 pb-2">
          Item Showcase
        </h2>

        {Object.entries(itemsByGame).length === 0 ? (
          <div className="text-center py-12 bg-base-200 rounded-xl border-dashed border-2 border-base-content/20">
            <p className="opacity-50">No items to showcase yet.</p>
            <Link to="/" className="link link-primary mt-2">
              Go Shopping
            </Link>
          </div>
        ) : (
          Object.entries(itemsByGame).map(
            ([gameId, items]: [string, ShowcaseItem[]]) => {
              const game = GAMES.find((g) => g.id === gameId);

              return (
                <div key={gameId} className="bg-base-200 rounded-xl p-4 sm:p-6">
                  <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 opacity-80 flex items-center gap-2 flex-wrap">
                    {game ? (
                      <>
                        <img
                          src={game.image}
                          alt={game.name}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
                        />
                        {game.name}
                      </>
                    ) : (
                      `Game ID: ${gameId}`
                    )}
                    <span className="text-sm sm:text-base">
                      Collection ({items.length})
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    {items.slice(0, 6).map((item, idx) => (
                      <div
                        key={idx}
                        className="card w-28 sm:w-36 bg-base-100 shadow hover:scale-105 transition duration-200 cursor-pointer"
                        title={item.template.name}
                        onClick={() => setSelectedItem(item)}
                      >
                        <figure className="px-2 pt-2">
                          <div className="rounded-lg h-20 sm:h-24 w-full flex items-center justify-center bg-gradient-to-br from-base-300 to-base-200">
                            <ItemIcon
                              iconName={item.template.image}
                              size="2.5rem"
                              className="text-secondary"
                            />
                          </div>
                        </figure>
                        <div className="card-body p-2 text-center">
                          <p className="text-xs font-bold truncate">
                            {item.template.name}
                          </p>
                          <span className="badge badge-xs badge-ghost mx-auto">
                            {item.template.rarity}
                          </span>
                        </div>
                      </div>
                    ))}
                    {items.length > 6 && (
                      <div className="w-28 sm:w-36 flex items-center justify-center bg-base-100/50 rounded-xl border border-base-content/10">
                        <span className="text-xs sm:text-sm font-bold opacity-60">
                          +{items.length - 6} more
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          )
        )}
      </div>

      {/* Item Preview Modal */}
      {selectedItem && (
        <div
          className="modal modal-open bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="modal-box relative max-w-lg w-[calc(100%-2rem)] sm:w-full bg-base-200 overflow-visible mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
              onClick={() => setSelectedItem(null)}
            >
              <X size={16} />
            </button>

            <div className="flex flex-col items-center text-center p-2">
              {/* Rarity Badge */}
              <div
                className={`badge mb-4 ${
                  selectedItem.template.rarity === "Ancient"
                    ? "badge-error"
                    : "badge-secondary"
                }`}
              >
                {selectedItem.template.rarity}
              </div>

              {/* Image */}
              <figure className="w-48 h-48 bg-gradient-to-br from-neutral to-base-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-base-content/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <ItemIcon
                  iconName={selectedItem.template.image}
                  size="6rem"
                  className="text-secondary drop-shadow-xl group-hover:scale-110 transition duration-500"
                />
              </figure>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-1">
                {selectedItem.template.name}
              </h3>
              <p className="opacity-60 text-sm mb-6 flex items-center gap-2">
                <Calendar size={12} />
                Acquired: {selectedItem.acquiredDate.split("T")[0]}
              </p>

              {/* Traits */}
              <div className="w-full bg-base-100 rounded-xl p-4 text-left border border-base-content/5">
                <h4 className="font-bold text-xs uppercase tracking-wider opacity-50 mb-3 border-b border-base-content/10 pb-2">
                  Item Traits
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedItem.traits).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col bg-base-200 p-2 rounded border border-base-content/5"
                    >
                      <span className="text-[10px] uppercase opacity-60 font-bold">
                        {key}
                      </span>
                      <span
                        className="font-mono text-sm font-medium truncate text-secondary"
                        title={String(value)}
                      >
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 w-full">
                <Link
                  to={`/item/${selectedItem.templateId}`}
                  className="btn btn-outline btn-block btn-sm"
                >
                  View Market Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
