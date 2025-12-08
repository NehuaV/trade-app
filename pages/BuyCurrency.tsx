import React from "react";
import { useAtom } from "jotai";
import { balanceAtom } from "../store";
import { CreditCard, Check } from "lucide-react";

export const BuyCurrency: React.FC = () => {
  const [balance, setBalance] = useAtom(balanceAtom);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const packages = [
    { amount: 10, cost: 10, popular: false },
    { amount: 20, cost: 20, popular: true },
    { amount: 50, cost: 50, popular: false },
    { amount: 100, cost: 100, popular: false },
  ];

  const handlePurchase = (amount: number) => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setBalance((prev) => prev + amount);
      setIsProcessing(false);
      alert(`Successfully added ${amount} Nexus Points to your wallet!`);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Top Up Wallet</h1>
      <p className="text-lg opacity-70 mb-12">
        1 Nexus Point (NP) = 1 Euro. Safe and instant delivery.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.amount}
            className={`card bg-base-200 shadow-xl border-2 transition-all hover:-translate-y-2 ${pkg.popular ? "border-secondary" : "border-transparent"}`}
          >
            {pkg.popular && (
              <div className="badge badge-secondary absolute -top-3 left-1/2 -translate-x-1/2">
                Most Popular
              </div>
            )}
            <div className="card-body items-center">
              <h2 className="card-title text-3xl font-black">
                {pkg.amount} NP
              </h2>
              <p className="opacity-60 mb-4">{pkg.cost.toFixed(2)} €</p>
              <button
                className={`btn w-full ${pkg.popular ? "btn-primary" : "btn-outline"}`}
                onClick={() => handlePurchase(pkg.amount)}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Buy Now"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-base-300 rounded-xl p-8 max-w-2xl mx-auto flex items-center gap-6 text-left">
        <div className="p-4 bg-neutral rounded-full text-neutral-content">
          <CreditCard size={32} />
        </div>
        <div>
          <h3 className="font-bold text-lg">Secure Payment Processing</h3>
          <p className="opacity-70 text-sm mt-1">
            We use industry-standard encryption to protect your financial data.
            Supports Visa, Mastercard, and PayPal.
          </p>
        </div>
      </div>
    </div>
  );
};
