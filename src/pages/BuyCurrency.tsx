import React from "react";
import { useAtom } from "jotai";
import { balanceAtom } from "../store";
import { CreditCard, Check, Shield, Zap, Lock } from "lucide-react";

export const BuyCurrency: React.FC = () => {
  const [balance, setBalance] = useAtom(balanceAtom);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingAmount, setProcessingAmount] = React.useState<number | null>(
    null
  );

  const packages = [
    { amount: 10, cost: 10, popular: false },
    { amount: 20, cost: 20, popular: true },
    { amount: 50, cost: 50, popular: false },
    { amount: 100, cost: 100, popular: false },
  ];

  const handlePurchase = (amount: number) => {
    setIsProcessing(true);
    setProcessingAmount(amount);
    // Simulate API call
    setTimeout(() => {
      setBalance((prev) => prev + amount);
      setIsProcessing(false);
      setProcessingAmount(null);
      alert(`Successfully added ${amount} Nexus Points to your wallet!`);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 text-center">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
          Top Up Wallet
        </h1>
        <p className="text-sm sm:text-base md:text-lg opacity-70 max-w-2xl mx-auto px-2 sm:px-4">
          1 Nexus Point (NP) = 1 Euro. Safe and instant delivery.
        </p>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16">
        {packages.map((pkg) => {
          const isProcessingThis =
            isProcessing && processingAmount === pkg.amount;
          return (
            <div
              key={pkg.amount}
              className={`card bg-base-200 shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden ${
                pkg.popular
                  ? "border-secondary ring-2 ring-secondary/20"
                  : "border-base-300 hover:border-base-content/20"
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="badge badge-secondary absolute -top-3 left-1/2 -translate-x-1/2 z-10 shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Gradient Background for Popular */}
              {pkg.popular && (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/5 opacity-50"></div>
              )}

              <div className="card-body items-center relative z-0 p-4 sm:p-6 md:p-8">
                {/* Amount Display */}
                <div className="mb-3 sm:mb-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-1 sm:mb-2">
                    {pkg.amount} NP
                  </h2>
                  <div className="flex items-center justify-center gap-1 text-base sm:text-lg md:text-xl font-semibold">
                    <span className="opacity-60">{pkg.cost.toFixed(2)}</span>
                    <span className="opacity-40">€</span>
                  </div>
                </div>

                {/* Value Indicator */}
                <div className="text-xs opacity-50 mb-3 sm:mb-4">
                  {pkg.amount === pkg.cost ? (
                    <span className="flex items-center justify-center gap-1">
                      <Check size={12} /> Best Value
                    </span>
                  ) : (
                    <span>1:1 Exchange Rate</span>
                  )}
                </div>

                {/* Buy Button */}
                <button
                  className={`btn w-full btn-sm sm:btn-md ${
                    pkg.popular ? "btn-primary" : "btn-outline btn-primary"
                  } ${isProcessingThis ? "loading" : ""}`}
                  onClick={() => handlePurchase(pkg.amount)}
                  disabled={isProcessing}
                >
                  {isProcessingThis ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap size={16} className="sm:w-4 sm:h-4" />
                      Buy Now
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Features */}
      <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
        {/* Main Security Card */}
        <div className="bg-base-300 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-left">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-secondary to-primary rounded-full text-white flex-shrink-0">
              <CreditCard size={24} className="sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">
                Secure Payment Processing
              </h3>
              <p className="opacity-70 text-sm sm:text-base">
                We use industry-standard encryption to protect your financial
                data. Supports Visa, Mastercard, and PayPal.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-base-200 rounded-lg p-4 sm:p-5">
            <div className="p-2 sm:p-3 bg-primary/20 rounded-lg text-primary">
              <Shield size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-sm sm:text-base">Secure</p>
              <p className="text-xs sm:text-sm opacity-60">SSL Encrypted</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 bg-base-200 rounded-lg p-4 sm:p-5">
            <div className="p-2 sm:p-3 bg-secondary/20 rounded-lg text-secondary">
              <Zap size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-sm sm:text-base">Instant</p>
              <p className="text-xs sm:text-sm opacity-60">
                Immediate Delivery
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 bg-base-200 rounded-lg p-4 sm:p-5">
            <div className="p-2 sm:p-3 bg-accent/20 rounded-lg text-accent">
              <Lock size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-sm sm:text-base">Protected</p>
              <p className="text-xs sm:text-sm opacity-60">Your Data Safe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
