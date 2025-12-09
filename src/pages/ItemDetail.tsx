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
import { ItemIcon } from "../utils/itemIcons";

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
    null,
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
    currentPage * itemsPerPage,
  );

  // Chart Data - basePrice is already stored as display value (integer), chart generates around it
  const chartData = React.useMemo(
    () => generatePriceHistory(template.basePrice),
    [template],
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
    <div className="relative space-y-6">
      {/* 1. Header Section: Image Left, Description Right */}
      <div className="card lg:card-side bg-base-200 border-base-content/5 overflow-hidden border shadow-xl">
        <figure className="from-neutral to-base-300 relative flex flex-shrink-0 items-center justify-center bg-gradient-to-br p-6 sm:p-8 lg:w-80">
          <div className="bg-grid-pattern absolute inset-0 opacity-10"></div>
          <ItemIcon
            iconName={template.image}
            size="8rem"
            className="text-secondary drop-shadow-2xl transition duration-500 hover:scale-105"
          />
        </figure>
        <div className="card-body p-4 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:gap-6 lg:flex-row">
            <div className="flex-grow space-y-3 sm:space-y-4">
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                  {template.name}
                </h1>
                <div className="mt-2 flex items-center gap-2 opacity-75">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="h-5 w-5 rounded-full sm:h-6 sm:w-6"
                  />
                  <span className="text-sm font-medium sm:text-base">
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

              <p className="max-w-2xl text-sm opacity-80 sm:text-base lg:text-lg">
                {template.description}
              </p>
            </div>

            <div className="stats stats-vertical bg-base-100 border-base-content/10 w-full border shadow lg:w-auto lg:min-w-[200px]">
              <div className="stat py-3 sm:py-4">
                <div className="stat-title text-xs sm:text-sm">
                  Lowest Price
                </div>
                <div className="stat-value text-secondary text-xl sm:text-2xl">
                  {relevantListings.length > 0
                    ? `${Math.round(
                        relevantListings[0].price * 100,
                      ).toLocaleString()} NP`
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
      <div className="card bg-base-200 p-4 shadow-xl sm:p-6">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold sm:mb-4 sm:text-xl">
          <Tag size={18} className="sm:h-5 sm:w-5" /> Price History
        </h3>
        <div className="h-64 w-full sm:h-72">
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
          <h3 className="card-title mb-3 text-lg sm:mb-4 sm:text-xl">
            Market Listings ({relevantListings.length})
          </h3>

          <div className="-mx-4 overflow-x-auto sm:mx-0">
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
                          <div className="bg-neutral-focus text-neutral-content w-8 rounded-full">
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
                          className="dropdown-content card card-compact bg-base-300 text-base-content z-20 w-64 p-2 shadow"
                        >
                          <div className="card-body">
                            <h3 className="border-base-content/10 mb-1 border-b pb-1 font-bold">
                              Item Traits
                            </h3>
                            <pre className="bg-base-100 overflow-x-auto rounded p-2 text-xs">
                              {JSON.stringify(
                                getInstanceTraits(listing.id),
                                null,
                                2,
                              )}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-lg font-bold">
                      {Math.round(listing.price * 100).toLocaleString()} NP
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
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No active listings for this item.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="btn-group mt-4 flex justify-center">
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
          <div className="modal-box mx-4 w-[calc(100%-2rem)] max-w-md sm:w-full">
            <h3 className="text-xl font-bold">Confirm Purchase</h3>
            <p className="py-4">
              Are you sure you want to buy <b>{template.name}</b> for{" "}
              <span className="text-secondary font-bold">
                {getSelectedListing()
                  ? Math.round(
                      getSelectedListing()!.price * 100,
                    ).toLocaleString()
                  : "0"}{" "}
                NP
              </span>
              ?
            </p>
            {errorMsg && (
              <div className="alert alert-error mb-4 text-sm">
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
          <div className="modal-box mx-4 w-[calc(100%-2rem)] max-w-md text-center sm:w-full">
            <div className="bg-success/20 text-success mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold">Purchase Successful!</h3>
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
