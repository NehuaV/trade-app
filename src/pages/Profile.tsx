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
    {},
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
      {/* Profile Header */}
      <div className="card bg-base-200 overflow-hidden shadow-xl">
        <div className="from-secondary to-primary h-24 bg-gradient-to-r opacity-80 sm:h-32"></div>
        <div className="card-body -mt-12 flex flex-col items-start gap-4 pb-4 sm:-mt-16 sm:flex-row sm:items-end sm:gap-6 sm:pb-6">
          <div className="avatar online placeholder ring-base-100 ring-offset-base-100 flex-shrink-0 rounded-full ring ring-offset-2">
            <div className="bg-neutral text-neutral-content flex h-24 w-24 items-center justify-center rounded-full text-2xl sm:h-32 sm:w-32 sm:text-3xl">
              <span>ME</span>
            </div>
          </div>
          <div className="mb-2 min-w-0 flex-grow">
            <h1 className="text-2xl font-bold sm:text-3xl">Demo User</h1>
            <div className="mt-1 flex flex-col items-start gap-2 text-xs opacity-70 sm:flex-row sm:items-center sm:gap-4 sm:text-sm">
              <span className="flex items-center gap-1">
                <Calendar size={12} className="sm:h-3.5 sm:w-3.5" /> Joined Oct
                2023
              </span>
              <span className="flex items-center gap-1">
                <Shield size={12} className="sm:h-3.5 sm:w-3.5" /> Verified
                Trader
              </span>
            </div>
          </div>
          <div className="mb-0 w-full sm:mb-4 sm:w-auto">
            <Link to="/inventory" className="btn btn-primary w-full sm:w-auto">
              Manage Inventory
            </Link>
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="border-base-content/10 border-b pb-2 text-xl font-bold sm:text-2xl">
          Item Showcase
        </h2>

        {Object.entries(itemsByGame).length === 0 ? (
          <div className="bg-base-200 border-base-content/20 rounded-xl border-2 border-dashed py-12 text-center">
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
                  <h3 className="mb-3 flex flex-wrap items-center gap-2 text-base font-bold opacity-80 sm:mb-4 sm:text-lg">
                    {game ? (
                      <>
                        <img
                          src={game.image}
                          alt={game.name}
                          className="h-5 w-5 rounded-full object-cover sm:h-6 sm:w-6"
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
                        className="card bg-base-100 w-28 cursor-pointer shadow transition duration-200 hover:scale-105 sm:w-36"
                        title={item.template.name}
                        onClick={() => setSelectedItem(item)}
                      >
                        <figure className="px-2 pt-2">
                          <div className="from-base-300 to-base-200 flex h-20 w-full items-center justify-center rounded-lg bg-gradient-to-br sm:h-24">
                            <ItemIcon
                              iconName={item.template.image}
                              size="2.5rem"
                              className="text-secondary"
                            />
                          </div>
                        </figure>
                        <div className="card-body p-2 text-center">
                          <p className="truncate text-xs font-bold">
                            {item.template.name}
                          </p>
                          <span className="badge badge-xs badge-ghost mx-auto">
                            {item.template.rarity}
                          </span>
                        </div>
                      </div>
                    ))}
                    {items.length > 6 && (
                      <div className="bg-base-100/50 border-base-content/10 flex w-28 items-center justify-center rounded-xl border sm:w-36">
                        <span className="text-xs font-bold opacity-60 sm:text-sm">
                          +{items.length - 6} more
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            },
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
            className="modal-box bg-base-200 relative mx-4 w-[calc(100%-2rem)] max-w-lg overflow-visible sm:w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn btn-sm btn-circle absolute top-2 right-2 z-10"
              onClick={() => setSelectedItem(null)}
            >
              <X size={16} />
            </button>

            <div className="flex flex-col items-center p-2 text-center">
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
              <figure className="from-neutral to-base-100 border-base-content/5 group relative mb-6 flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-br shadow-inner">
                <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
                <ItemIcon
                  iconName={selectedItem.template.image}
                  size="6rem"
                  className="text-secondary drop-shadow-xl transition duration-500 group-hover:scale-110"
                />
              </figure>

              {/* Title */}
              <h3 className="mb-1 text-2xl font-bold">
                {selectedItem.template.name}
              </h3>
              <p className="mb-6 flex items-center gap-2 text-sm opacity-60">
                <Calendar size={12} />
                Acquired: {selectedItem.acquiredDate.split("T")[0]}
              </p>

              {/* Traits */}
              <div className="bg-base-100 border-base-content/5 w-full rounded-xl border p-4 text-left">
                <h4 className="border-base-content/10 mb-3 border-b pb-2 text-xs font-bold tracking-wider uppercase opacity-50">
                  Item Traits
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedItem.traits).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-base-200 border-base-content/5 flex flex-col rounded border p-2"
                    >
                      <span className="text-[10px] font-bold uppercase opacity-60">
                        {key}
                      </span>
                      <span
                        className="text-secondary truncate font-mono text-sm font-medium"
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
