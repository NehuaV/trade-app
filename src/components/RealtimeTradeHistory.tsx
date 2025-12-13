import React, { useState, useEffect } from "react";
import { ITEM_TEMPLATES, GAMES } from "../data/mockData";
import { ShoppingBag, TrendingUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface LiveTrade {
  id: string;
  itemName: string;
  sellerId: string;
  buyerId: string;
  price: number;
  gameName: string;
  timestamp: Date;
}

// Generate random usernames for simulation
const USERNAMES = [
  "ProGamer_99",
  "SkinCollector",
  "FF14_Fashion",
  "LoL_Master",
  "Genshin_Traveler",
  "BDO_Grinder",
  "Helldiver_Vet",
  "ItemHunter",
  "TradeKing",
  "MarketWizard",
  "SkinDealer",
  "RareFinder",
  "CollectorPro",
  "TradeMaster",
  "ItemBaron",
];

const generateRandomTrade = (): LiveTrade => {
  const template =
    ITEM_TEMPLATES[Math.floor(Math.random() * ITEM_TEMPLATES.length)];
  const game = GAMES.find((g) => g.id === template.gameId);
  const sellerId = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
  const buyerId = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];

  // Ensure buyer and seller are different
  const buyerPool = USERNAMES.filter((u) => u !== sellerId);
  const finalBuyer = buyerPool[Math.floor(Math.random() * buyerPool.length)];

  // Price variation: 80% to 120% of base price
  const priceVariation = 0.8 + Math.random() * 0.4;
  const price = (template.basePrice * priceVariation) / 100; // Convert to decimal

  return {
    id: `live_trade_${Date.now()}_${Math.random()}`,
    itemName: template.name,
    sellerId,
    buyerId: finalBuyer,
    price,
    gameName: game?.name || "Unknown Game",
    timestamp: new Date(),
  };
};

export const RealtimeTradeHistory: React.FC = () => {
  const [trades, setTrades] = useState<LiveTrade[]>(() => {
    // Initialize with some recent trades
    return Array.from({ length: 8 }, () => {
      const trade = generateRandomTrade();
      // Make them appear at different times (within last 5 minutes)
      trade.timestamp = new Date(Date.now() - Math.random() * 5 * 60 * 1000);
      return trade;
    });
  });

  useEffect(() => {
    // Generate a new trade every 0.5-3 seconds with random intervals
    let timeoutId: NodeJS.Timeout;

    const scheduleNextTrade = () => {
      const delay = 500 + Math.random() * 3000; // Random interval between 0.5-3 seconds
      timeoutId = setTimeout(() => {
        const newTrade = generateRandomTrade();
        setTrades((prev) => {
          // Add new trade at the beginning, keep only last 15
          const updated = [newTrade, ...prev].slice(0, 15);
          return updated;
        });
        scheduleNextTrade(); // Schedule the next trade
      }, delay);
    };

    // Start scheduling trades after initial delay
    const initialDelay = setTimeout(() => {
      scheduleNextTrade();
    }, 2000);

    return () => {
      clearTimeout(initialDelay);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="card bg-base-200 border-base-content/5 overflow-hidden border shadow-xl">
      <div className="card-body overflow-hidden p-4 sm:p-6">
        <div className="mb-4 flex flex-shrink-0 items-center gap-2">
          <div className="relative flex-shrink-0">
            <ShoppingBag className="text-secondary h-5 w-5 sm:h-6 sm:w-6" />
            <div className="border-base-200 absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full border-2 bg-green-500"></div>
          </div>
          <h2 className="truncate text-xl font-bold sm:text-2xl">
            Live Trades
          </h2>
          <TrendingUp className="ml-auto h-4 w-4 flex-shrink-0 text-green-500 sm:h-5 sm:w-5" />
        </div>

        <div className="custom-scrollbar max-h-[400px] min-h-0 space-y-2 overflow-x-hidden overflow-y-auto">
          {trades.map((trade, index) => (
            <div
              key={trade.id}
              className={`bg-base-100/50 hover:bg-base-100 flex w-full items-center gap-2 rounded-lg p-2 transition-all duration-500 sm:gap-3 sm:p-3 ${
                index === 0
                  ? "bg-primary/10 border-primary/30 border-2 shadow-lg"
                  : "border border-transparent"
              }`}
              style={{
                animation: index === 0 ? "slideIn 0.5s ease-out" : undefined,
              }}
            >
              {/* Game Icon */}
              <div className="flex-shrink-0">
                <div className="from-secondary/20 to-primary/20 border-base-content/10 flex h-8 w-8 items-center justify-center rounded-lg border bg-gradient-to-br sm:h-10 sm:w-10 md:h-12 md:w-12">
                  <span className="text-secondary text-[10px] font-bold sm:text-xs md:text-sm">
                    {trade.gameName.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Trade Info */}
              <div className="min-w-0 flex-grow overflow-hidden">
                <div className="flex min-w-0 items-center gap-1 sm:gap-2">
                  <span className="block truncate text-xs font-semibold sm:text-sm md:text-base">
                    {trade.itemName}
                  </span>
                </div>
                <div className="mt-1 flex min-w-0 flex-wrap items-center gap-1 sm:gap-2">
                  <span className="max-w-full truncate text-xs opacity-60 sm:text-sm">
                    {trade.sellerId} → {trade.buyerId}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-secondary text-sm font-bold whitespace-nowrap sm:text-base md:text-lg">
                    {Math.round(trade.price * 100).toLocaleString()} NP
                  </span>
                  <span className="text-[10px] whitespace-nowrap opacity-50 sm:text-xs">
                    {formatDistanceToNow(trade.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>

              {/* New Badge */}
              {index === 0 && (
                <div className="flex-shrink-0">
                  <span className="badge badge-xs sm:badge-sm badge-success animate-pulse whitespace-nowrap">
                    NEW
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-base-content/10 mt-4 flex-shrink-0 border-t pt-4">
          <p className="text-center text-xs break-words opacity-60">
            Trades update in real-time • Last updated{" "}
            {formatDistanceToNow(trades[0]?.timestamp || new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
