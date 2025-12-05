import React from 'react';
import { Link } from 'react-router-dom';
import { GAMES } from '../data/mockData';
import { ArrowRight, Trophy, Shield, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  const scrollToGames = () => {
    const element = document.getElementById('games');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 relative overflow-hidden rounded-3xl bg-base-200">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/bg/1600/900')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
            Trade Skins. <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Securely.</span>
          </h1>
          <p className="text-xl text-base-content/70">
            The world's most advanced marketplace for buying and selling in-game items with instant delivery.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={scrollToGames} className="btn btn-primary btn-lg">Browse Games</button>
            <Link to="/inventory" className="btn btn-outline btn-lg">Sell Items</Link>
          </div>
        </div>
      </section>

      {/* Stats / Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="card bg-base-200 shadow-xl border border-base-content/5">
          <div className="card-body items-center text-center">
            <Trophy className="w-12 h-12 text-secondary mb-4" />
            <h3 className="card-title">Best Prices</h3>
            <p>Competitive marketplace with low fees ensures you get the most value.</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-xl border border-base-content/5">
          <div className="card-body items-center text-center">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h3 className="card-title">100% Secure</h3>
            <p>Every transaction is protected by our escrow system and fraud detection.</p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-xl border border-base-content/5">
          <div className="card-body items-center text-center">
            <Zap className="w-12 h-12 text-accent mb-4" />
            <h3 className="card-title">Instant Delivery</h3>
            <p>Automated bots ensure your items are delivered within seconds.</p>
          </div>
        </div>
      </section>

      {/* Game Selection */}
      <section id="games" className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Select a Game</h2>
          <div className="h-1 bg-base-content/10 flex-grow ml-8 rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES.map((game) => (
            <Link to={`/market/${game.id}`} key={game.id} className="group card bg-base-100 image-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <figure><img src={game.image} alt={game.name} className="group-hover:scale-110 transition duration-700" /></figure>
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