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
    // Generate a new trade every 3-8 seconds with random intervals
    let timeoutId: NodeJS.Timeout;

    const scheduleNextTrade = () => {
      const delay = 3000 + Math.random() * 5000; // Random interval between 3-8 seconds
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
    <div className="card bg-base-200 shadow-xl border border-base-content/5 overflow-hidden">
      <div className="card-body p-4 sm:p-6 overflow-hidden">
        <div className="flex items-center gap-2 mb-4 flex-shrink-0">
          <div className="relative flex-shrink-0">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-base-200 animate-pulse"></div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold truncate">
            Live Trades
          </h2>
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 ml-auto flex-shrink-0" />
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto overflow-x-hidden custom-scrollbar min-h-0">
          {trades.map((trade, index) => (
            <div
              key={trade.id}
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-base-100/50 hover:bg-base-100 transition-all duration-500 w-full ${
                index === 0
                  ? "bg-primary/10 border-2 border-primary/30 shadow-lg"
                  : "border border-transparent"
              }`}
              style={{
                animation: index === 0 ? "slideIn 0.5s ease-out" : undefined,
              }}
            >
              {/* Game Icon */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center border border-base-content/10">
                  <span className="text-[10px] sm:text-xs md:text-sm font-bold text-secondary">
                    {trade.gameName.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Trade Info */}
              <div className="flex-grow min-w-0 overflow-hidden">
                <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                  <span className="font-semibold text-xs sm:text-sm md:text-base truncate block">
                    {trade.itemName}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 mt-1 min-w-0 flex-wrap">
                  <span className="text-xs sm:text-sm opacity-60 truncate max-w-full">
                    {trade.sellerId} → {trade.buyerId}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-secondary whitespace-nowrap">
                    {Math.round(trade.price * 100).toLocaleString()} NP
                  </span>
                  <span className="text-[10px] sm:text-xs opacity-50 whitespace-nowrap">
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

        <div className="mt-4 pt-4 border-t border-base-content/10 flex-shrink-0">
          <p className="text-xs text-center opacity-60 break-words">
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
