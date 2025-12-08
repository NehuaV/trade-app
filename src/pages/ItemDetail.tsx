import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { ITEM_TEMPLATES, GAMES, generatePriceHistory } from "../data/mockData";
import { marketListingsAtom, allItemsAtom, buyItemAtom } from "../store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Info, Tag, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export const ItemDetail: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const template = ITEM_TEMPLATES.find((t) => t.id === itemId);
  const game = GAMES.find((g) => g.id === template?.gameId);

  const [listings] = useAtom(marketListingsAtom);
  const allItems = useAtomValue(allItemsAtom);
  const [, buyItem] = useAtom(buyItemAtom);

  // Pagination for listings
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // UI State
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!template || !game) return <div>Item not found</div>;

  // Find listings for this template
  const relevantListings = listings
    .filter((l) => {
      const instance = allItems.find((i) => i.id === l.itemInstanceId);
      return instance?.templateId === template.id;
    })
    .sort((a, b) => a.price - b.price);

  // Pagination Logic
  const totalPages = Math.ceil(relevantListings.length / itemsPerPage);
  const paginatedListings = relevantListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Chart Data
  const chartData = React.useMemo(
    () => generatePriceHistory(template.basePrice),
    [template]
  );

  const handleBuyClick = (listingId: string) => {
    setSelectedListingId(listingId);
    setErrorMsg(null);
    setBuyModalOpen(true);
  };

  const confirmPurchase = () => {
    if (!selectedListingId) return;
    try {
      buyItem(selectedListingId);
      setBuyModalOpen(false);
      setSuccessModalOpen(true);
      setSelectedListingId(null);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    }
  };

  const getInstanceTraits = (listingId: string) => {
    const listing = listings.find((l) => l.id === listingId);
    const instance = allItems.find((i) => i.id === listing?.itemInstanceId);
    return instance?.traits || {};
  };

  const getSelectedListing = () =>
    listings.find((l) => l.id === selectedListingId);

  return (
    <div className="space-y-6 relative">
      {/* 1. Header Section: Image Left, Description Right */}
      <div className="card lg:card-side bg-base-200 shadow-xl overflow-hidden border border-base-content/5">
        <figure className="bg-gradient-to-br from-neutral to-base-300 p-6 sm:p-8 lg:w-80 flex-shrink-0 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <img
            src={template.image}
            alt={template.name}
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain drop-shadow-2xl hover:scale-105 transition duration-500"
          />
        </figure>
        <div className="card-body p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4 flex-grow">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {template.name}
                </h1>
                <div className="flex items-center gap-2 mt-2 opacity-75">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                  />
                  <span className="font-medium text-sm sm:text-base">
                    {game.name}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`badge badge-sm sm:badge-md lg:badge-lg ${
                    template.rarity === "Ancient"
                      ? "badge-error"
                      : "badge-primary"
                  }`}
                >
                  {template.rarity}
                </span>
                <span className="badge badge-sm sm:badge-md lg:badge-lg badge-ghost">
                  ID: {template.id}
                </span>
              </div>

              <p className="text-sm sm:text-base lg:text-lg opacity-80 max-w-2xl">
                {template.description}
              </p>
            </div>

            <div className="stats stats-vertical shadow bg-base-100 border border-base-content/10 w-full lg:w-auto lg:min-w-[200px]">
              <div className="stat py-3 sm:py-4">
                <div className="stat-title text-xs sm:text-sm">
                  Lowest Price
                </div>
                <div className="stat-value text-secondary text-xl sm:text-2xl">
                  {relevantListings.length > 0
                    ? `${relevantListings[0].price.toFixed(2)} NP`
                    : "N/A"}
                </div>
              </div>
              <div className="stat py-3 sm:py-4">
                <div className="stat-title text-xs sm:text-sm">
                  Volume (24h)
                </div>
                <div className="stat-value text-xl sm:text-2xl">124</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Chart Section */}
      <div className="card bg-base-200 shadow-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
          <Tag size={18} className="sm:w-5 sm:h-5" /> Price History
        </h3>
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="date"
                tickFormatter={(str) => format(new Date(str), "MMM d")}
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderColor: "#374151",
                  color: "#fff",
                }}
                labelStyle={{ color: "#9ca3af" }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Listings Section */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <h3 className="card-title mb-3 sm:mb-4 text-lg sm:text-xl">
            Market Listings ({relevantListings.length})
          </h3>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="table w-full text-sm sm:text-base">
              <thead>
                <tr>
                  <th>Seller</th>
                  <th>Traits</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-base-300">
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="avatar placeholder">
                          <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                            <span>
                              {listing.sellerId.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <span
                          className={
                            listing.sellerId === "me"
                              ? "text-secondary font-bold"
                              : ""
                          }
                        >
                          {listing.sellerId === "me" ? "You" : listing.sellerId}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="dropdown dropdown-hover dropdown-right dropdown-end">
                        <label
                          tabIndex={0}
                          className="btn btn-xs btn-ghost gap-1"
                        >
                          <Info size={14} /> Inspect
                        </label>
                        <div
                          tabIndex={0}
                          className="dropdown-content card card-compact w-64 p-2 shadow bg-base-300 text-base-content z-20"
                        >
                          <div className="card-body">
                            <h3 className="font-bold border-b border-base-content/10 pb-1 mb-1">
                              Item Traits
                            </h3>
                            <pre className="text-xs bg-base-100 p-2 rounded overflow-x-auto">
                              {JSON.stringify(
                                getInstanceTraits(listing.id),
                                null,
                                2
                              )}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-bold text-lg">
                      {listing.price.toFixed(2)} NP
                    </td>
                    <td>
                      {listing.sellerId !== "me" ? (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleBuyClick(listing.id)}
                        >
                          Buy Now
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-disabled">
                          Listed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {paginatedListings.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 py-8">
                      No active listings for this item.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 btn-group">
              <button
                className="btn btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                «
              </button>
              <button className="btn btn-sm no-animation">
                Page {currentPage}
              </button>
              <button
                className="btn btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                »
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Buy Confirmation Modal */}
      {buyModalOpen && (
        <div className="modal modal-open bg-black/50">
          <div className="modal-box w-[calc(100%-2rem)] sm:w-full max-w-md mx-4">
            <h3 className="font-bold text-xl">Confirm Purchase</h3>
            <p className="py-4">
              Are you sure you want to buy <b>{template.name}</b> for{" "}
              <span className="text-secondary font-bold">
                {getSelectedListing()?.price.toFixed(2)} NP
              </span>
              ?
            </p>
            {errorMsg && (
              <div className="alert alert-error text-sm mb-4">
                <AlertCircle size={16} /> {errorMsg}
              </div>
            )}
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setBuyModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={confirmPurchase}>
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModalOpen && (
        <div className="modal modal-open bg-black/50">
          <div className="modal-box text-center w-[calc(100%-2rem)] sm:w-full max-w-md mx-4">
            <div className="mx-auto w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-bold text-xl">Purchase Successful!</h3>
            <p className="py-4">The item has been added to your inventory.</p>
            <div className="modal-action justify-center">
              <Link to="/inventory" className="btn btn-primary">
                View Inventory
              </Link>
              <button
                className="btn btn-ghost"
                onClick={() => setSuccessModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
