import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAtomValue } from "jotai";
import { balanceAtom } from "../store";
import { ShoppingCart, User, Gamepad2, Menu, X, Coins } from "lucide-react";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const balance = useAtomValue(balanceAtom);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) =>
    location.pathname === path ? "text-secondary" : "";

  return (
    <div className="bg-base-300 text-base-content flex min-h-screen flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-base-100/90 border-base-content/10 sticky top-0 z-50 border-b backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tighter transition hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center">
              <svg
                className="h-8 w-8"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="hexagonGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z"
                  fill="url(#hexagonGradient)"
                  opacity="0.15"
                />
                <path
                  d="M50 10 L88 28 L88 72 L50 90 L12 72 L12 28 Z"
                  stroke="url(#hexagonGradient)"
                  strokeWidth="4"
                  fill="none"
                />
                {/* Letter E styled like circuitry */}
                <path
                  d="M35 35 H65 M35 50 H55 M35 65 H65"
                  stroke="#e2e8f0"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="65" cy="35" r="3" fill="#22d3ee" />
                <circle cx="65" cy="65" r="3" fill="#22d3ee" />
              </svg>
            </div>
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              EMID
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link
              to="/"
              className={`hover:text-secondary transition ${isActive("/")}`}
            >
              Games
            </Link>
            <Link
              to="/profile"
              className={`hover:text-secondary transition ${isActive(
                "/profile",
              )}`}
            >
              Profile
            </Link>
            <Link
              to="/inventory"
              className={`hover:text-secondary transition ${isActive(
                "/inventory",
              )}`}
            >
              Inventory
            </Link>
          </div>

          {/* User & Balance */}
          <div className="hidden items-center gap-4 md:flex">
            <Link to="/buy-points" className="btn btn-sm btn-ghost group gap-2">
              <Coins
                size={16}
                className="text-accent transition group-hover:rotate-12"
              />
              <span className="text-accent font-mono">
                {Math.round(balance * 100).toLocaleString()} NP
              </span>
            </Link>

            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-circle btn-ghost avatar placeholder"
              >
                <div className="bg-neutral text-neutral-content flex w-10 items-center justify-center rounded-full">
                  <User size={20} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/inventory">Inventory</Link>
                </li>
                <li>
                  <Link to="/buy-points">Add Funds</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Balance & Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/buy-points"
              className="btn btn-xs btn-ghost gap-1.5 px-2"
            >
              <Coins size={14} className="text-accent" />
              <span className="text-accent font-mono text-xs">
                {Math.round(balance * 100).toLocaleString()} NP
              </span>
            </Link>
            <button
              className="btn btn-square btn-ghost btn-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="bg-base-100 fixed inset-y-0 right-0 z-50 w-64 transform overflow-y-auto px-6 pt-20 pb-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`btn btn-ghost justify-start gap-3 ${
                  isActive("/") ? "btn-active" : ""
                }`}
              >
                <Gamepad2 size={20} />
                Games
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`btn btn-ghost justify-start gap-3 ${
                  isActive("/profile") ? "btn-active" : ""
                }`}
              >
                <User size={20} />
                Profile
              </Link>
              <Link
                to="/inventory"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`btn btn-ghost justify-start gap-3 ${
                  isActive("/inventory") ? "btn-active" : ""
                }`}
              >
                <ShoppingCart size={20} />
                Inventory
              </Link>
              <div className="divider my-2" />
              <Link
                to="/buy-points"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-primary justify-start gap-3"
              >
                <Coins size={20} />
                Add Funds
                <span className="ml-auto font-mono text-sm">
                  {Math.round(balance * 100).toLocaleString()} NP
                </span>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="container mx-auto flex-grow px-4 py-4 sm:px-6 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      {/* <footer className="footer p-6 sm:p-10 bg-neutral text-neutral-content mt-auto">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          <aside className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-gradient-to-tr from-secondary to-primary rounded-xl flex items-center justify-center mb-4">
              <span className="text-white text-xl font-bold font-mono">N</span>
            </div>
            <p className="font-bold text-lg">Nexus Market Ltd.</p>
            <p className="text-sm opacity-80">
              The #1 trusted marketplace for virtual items.
            </p>
          </aside>
          <nav className="flex flex-col">
            <header className="footer-title">Services</header>
            <a className="link link-hover text-sm">Marketplace</a>
            <a className="link link-hover text-sm">Sell Items</a>
            <a className="link link-hover text-sm">Buy Currency</a>
          </nav>
          <nav className="flex flex-col">
            <header className="footer-title">Company</header>
            <a className="link link-hover text-sm">About us</a>
            <a className="link link-hover text-sm">Contact</a>
            <a className="link link-hover text-sm">Jobs</a>
          </nav>
          <nav className="flex flex-col">
            <header className="footer-title">Legal</header>
            <a className="link link-hover text-sm">Terms of use</a>
            <a className="link link-hover text-sm">Privacy policy</a>
            <a className="link link-hover text-sm">Cookie policy</a>
          </nav>
        </div>
      </footer> */}
    </div>
  );
};
