import React from "react";
import { Link } from "react-router-dom";
import { GAMES } from "../data/mockData";
import { ArrowRight, Trophy, Shield, Zap } from "lucide-react";
import { RealtimeTradeHistory } from "../components/RealtimeTradeHistory";

export const Home: React.FC = () => {
  const scrollToGames = () => {
    const element = document.getElementById("games");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center  py-8 sm:py-12 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-base-200">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20"></div>
        <div className="absolute inset-0 bg-linear-to-tl from-primary/10 via-transparent to-secondary/10"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-3 sm:mb-4">
            Trade Skins.{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary to-primary">
              Securely.
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-base-content/70 px-2">
            The world's most advanced marketplace for buying and selling in-game
            items with instant delivery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={scrollToGames}
              className="btn btn-primary btn-lg w-full sm:w-auto"
            >
              Browse Games
            </button>
            <Link
              to="/inventory"
              className="btn btn-outline btn-lg w-full sm:w-auto"
            >
              Sell Items
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <div className="card bg-base-200 shadow-xl border border-base-content/5">
          <div className="card-body items-center text-center p-4 sm:p-6">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-secondary mb-3 sm:mb-4" />
            <h3 className="card-title text-lg sm:text-xl">Best Prices</h3>
            <p className="text-sm sm:text-base">
              Competitive marketplace with low fees ensures you get the most
              value.
            </p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-xl border border-base-content/5">
          <div className="card-body items-center text-center p-4 sm:p-6">
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
            <h3 className="card-title text-lg sm:text-xl">100% Secure</h3>
            <p className="text-sm sm:text-base">
              Every transaction is protected by our escrow system and fraud
              detection.
            </p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-xl border border-base-content/5 sm:col-span-2 md:col-span-1">
          <div className="card-body items-center text-center p-4 sm:p-6">
            <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-accent mb-3 sm:mb-4" />
            <h3 className="card-title text-lg sm:text-xl">Instant Delivery</h3>
            <p className="text-sm sm:text-base">
              Automated bots ensure your items are delivered within seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Real-time Trade History */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Live Activity</h2>
          <div className="h-1 bg-base-content/10 flex-grow ml-4 sm:ml-8 rounded hidden sm:block"></div>
        </div>
        <RealtimeTradeHistory />
      </section>

      {/* Game Selection */}
      <section id="games" className="space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Select a Game</h2>
          <div className="h-1 bg-base-content/10 flex-grow ml-4 sm:ml-8 rounded hidden sm:block"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {GAMES.map((game) => (
            <Link
              to={`/market/${game.id}`}
              key={game.id}
              className="group card bg-base-100 image-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <figure>
                <img
                  src={game.image}
                  alt={game.name}
                  className="group-hover:scale-110 transition duration-700"
                />
              </figure>
              <div className="card-body justify-end p-6">
                <h2 className="card-title text-2xl text-white">{game.name}</h2>
                <p className="text-gray-200">{game.description}</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm gap-2">
                    Enter Market <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
