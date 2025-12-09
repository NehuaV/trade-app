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
      <section className="bg-base-200 relative overflow-hidden rounded-2xl py-8 text-center sm:rounded-3xl sm:py-12">
        <div className="from-primary/20 via-secondary/20 to-accent/20 absolute inset-0 bg-linear-to-br"></div>
        <div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-tl via-transparent"></div>
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <h1 className="mb-3 text-3xl font-black tracking-tight sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Trade Skins.{" "}
            <span className="from-secondary to-primary bg-linear-to-r bg-clip-text text-transparent">
              Securely.
            </span>
          </h1>
          <p className="text-base-content/70 px-2 text-base sm:text-lg md:text-xl">
            The world's most advanced marketplace for buying and selling in-game
            items with instant delivery.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
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
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8">
        <div className="card bg-base-200 border-base-content/5 border shadow-xl">
          <div className="card-body items-center p-4 text-center sm:p-6">
            <Trophy className="text-secondary mb-3 h-10 w-10 sm:mb-4 sm:h-12 sm:w-12" />
            <h3 className="card-title text-lg sm:text-xl">Best Prices</h3>
            <p className="text-sm sm:text-base">
              Competitive marketplace with low fees ensures you get the most
              value.
            </p>
          </div>
        </div>
        <div className="card bg-base-200 border-base-content/5 border shadow-xl">
          <div className="card-body items-center p-4 text-center sm:p-6">
            <Shield className="text-primary mb-3 h-10 w-10 sm:mb-4 sm:h-12 sm:w-12" />
            <h3 className="card-title text-lg sm:text-xl">100% Secure</h3>
            <p className="text-sm sm:text-base">
              Every transaction is protected by our escrow system and fraud
              detection.
            </p>
          </div>
        </div>
        <div className="card bg-base-200 border-base-content/5 border shadow-xl sm:col-span-2 md:col-span-1">
          <div className="card-body items-center p-4 text-center sm:p-6">
            <Zap className="text-accent mb-3 h-10 w-10 sm:mb-4 sm:h-12 sm:w-12" />
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
          <h2 className="text-2xl font-bold sm:text-3xl">Live Activity</h2>
          <div className="bg-base-content/10 ml-4 hidden h-1 flex-grow rounded sm:ml-8 sm:block"></div>
        </div>
        <RealtimeTradeHistory />
      </section>

      {/* Game Selection */}
      <section id="games" className="space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold sm:text-3xl">Select a Game</h2>
          <div className="bg-base-content/10 ml-4 hidden h-1 flex-grow rounded sm:ml-8 sm:block"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {GAMES.map((game) => (
            <Link
              to={`/market/${game.id}`}
              key={game.id}
              className="group card bg-base-100 image-full shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <figure>
                <img
                  src={game.image}
                  alt={game.name}
                  className="transition duration-700 group-hover:scale-110"
                />
              </figure>
              <div className="card-body justify-end p-6">
                <h2 className="card-title text-2xl text-white">{game.name}</h2>
                <p className="text-gray-200">{game.description}</p>
                <div className="card-actions mt-4 justify-end">
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
