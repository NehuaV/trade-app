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
    <div className="min-h-screen bg-base-300 text-base-content font-sans flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-content/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tighter hover:opacity-80 transition"
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-secondary to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-mono">N</span>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              NEXUS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            <Link
              to="/"
              className={`hover:text-secondary transition ${isActive("/")}`}
            >
              Games
            </Link>
            <Link
              to="/profile"
              className={`hover:text-secondary transition ${isActive(
                "/profile"
              )}`}
            >
              Profile
            </Link>
            <Link
              to="/inventory"
              className={`hover:text-secondary transition ${isActive(
                "/inventory"
              )}`}
            >
              Inventory
            </Link>
          </div>

          {/* User & Balance */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/buy-points" className="btn btn-sm btn-ghost gap-2 group">
              <Coins
                size={16}
                className="text-accent group-hover:rotate-12 transition"
              />
              <span className="font-mono text-accent">
                {balance.toFixed(2)} NP
              </span>
            </Link>

            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-circle btn-ghost avatar placeholder"
              >
                <div className="bg-neutral text-neutral-content rounded-full w-10 flex items-center justify-center">
                  <User size={20} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
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
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/buy-points"
              className="btn btn-xs btn-ghost gap-1.5 px-2"
            >
              <Coins size={14} className="text-accent" />
              <span className="font-mono text-accent text-xs">
                {balance.toFixed(0)} NP
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
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="md:hidden fixed inset-y-0 right-0 z-50 w-64 bg-base-100 shadow-2xl transform transition-transform duration-300 ease-in-out pt-20 px-6 pb-6 overflow-y-auto">
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
                  {balance.toFixed(2)} NP
                </span>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer p-6 sm:p-10 bg-neutral text-neutral-content mt-auto">
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
      </footer>
    </div>
  );
};
