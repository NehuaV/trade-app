import React from "react";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { balanceAtom } from "../store";
import { CreditCard, Check, Shield, Zap, Lock } from "lucide-react";

export const BuyCurrency: React.FC = () => {
  const [balance, setBalance] = useAtom(balanceAtom);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingAmount, setProcessingAmount] = React.useState<number | null>(
    null,
  );

  const packages = [
    { amount: 1000, cost: 10, popular: false },
    { amount: 2000, cost: 20, popular: true },
    { amount: 5000, cost: 50, popular: false },
    { amount: 10000, cost: 100, popular: false },
  ];

  const handlePurchase = (amount: number) => {
    setIsProcessing(true);
    setProcessingAmount(amount);
    // Simulate API call
    setTimeout(() => {
      // Convert displayed amount (integer) to internal amount (decimal)
      setBalance((prev) => prev + amount / 100);
      setIsProcessing(false);
      setProcessingAmount(null);
      toast.success("Points added successfully!", {
        description: `${amount.toLocaleString()} Nexus Points have been added to your wallet.`,
      });
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 text-center sm:px-6 sm:py-8 md:py-12">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8 md:mb-12">
        <h1 className="from-secondary to-primary mb-2 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent sm:mb-3 sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl">
          Top Up Wallet
        </h1>
        <p className="mx-auto max-w-2xl px-2 text-sm opacity-70 sm:px-4 sm:text-base md:text-lg">
          1 Nexus Point (NP) = 1 Euro. Safe and instant delivery.
        </p>
      </div>

      {/* Package Cards */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:mb-12 sm:grid-cols-2 sm:gap-4 md:mb-16 md:gap-6 lg:grid-cols-4">
        {packages.map((pkg) => {
          const isProcessingThis =
            isProcessing && processingAmount === pkg.amount;
          return (
            <div key={pkg.amount} className="relative">
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="badge badge-secondary absolute -top-3 left-1/2 z-[100] -translate-x-1/2 shadow-lg">
                  Most Popular
                </div>
              )}

              <div
                className={`card bg-base-200 relative overflow-hidden border-2 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  pkg.popular
                    ? "border-secondary ring-secondary/20 ring-2"
                    : "border-base-300 hover:border-base-content/20"
                }`}
              >
                {/* Gradient Background for Popular */}
                {pkg.popular && (
                  <div className="from-secondary/10 to-primary/5 absolute inset-0 z-0 bg-gradient-to-br opacity-50"></div>
                )}

                <div className="card-body relative z-0 items-center p-4 sm:p-6 md:p-8">
                  {/* Amount Display */}
                  <div className="mb-3 sm:mb-4">
                    <h2 className="mb-1 text-xl font-black sm:mb-2 sm:text-2xl md:text-3xl lg:text-4xl">
                      {pkg.amount} NP
                    </h2>
                    <div className="flex items-center justify-center gap-1 text-base font-semibold sm:text-lg md:text-xl">
                      <span className="opacity-60">{pkg.cost.toFixed(2)}</span>
                      <span className="opacity-40">€</span>
                    </div>
                  </div>

                  {/* Value Indicator */}
                  <div className="mb-3 text-xs opacity-50 sm:mb-4">
                    {pkg.amount === pkg.cost ? (
                      <span className="flex items-center justify-center gap-1">
                        <Check size={12} /> Best Value
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>

                  {/* Buy Button */}
                  <button
                    className={`btn btn-sm sm:btn-md flex w-full items-center justify-center gap-2 ${
                      pkg.popular ? "btn-primary" : "btn-outline btn-primary"
                    }`}
                    onClick={() => handlePurchase(pkg.amount)}
                    disabled={isProcessing}
                  >
                    {isProcessingThis ? (
                      <>
                        <span className="loading loading-spinner !h-3 !w-3 border-2 sm:!h-4 sm:!w-4"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap size={16} className="sm:h-4 sm:w-4" />
                        Buy Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Features */}
      <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
        {/* Main Security Card */}
        <div className="bg-base-300 mx-auto max-w-2xl rounded-xl p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 text-left sm:flex-row sm:gap-6">
            <div className="from-secondary to-primary flex-shrink-0 rounded-full bg-gradient-to-br p-3 text-white sm:p-4">
              <CreditCard size={24} className="sm:h-8 sm:w-8" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="mb-1 text-base font-bold sm:mb-2 sm:text-lg">
                Secure Payment Processing
              </h3>
              <p className="text-sm opacity-70 sm:text-base">
                We use industry-standard encryption to protect your financial
                data. Supports Visa, Mastercard, and PayPal.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-base-200 flex flex-col items-center gap-3 rounded-lg p-4 sm:flex-row sm:p-5">
            <div className="bg-primary/20 text-primary rounded-lg p-2 sm:p-3">
              <Shield size={20} className="sm:h-6 sm:w-6" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold sm:text-base">Secure</p>
              <p className="text-xs opacity-60 sm:text-sm">SSL Encrypted</p>
            </div>
          </div>

          <div className="bg-base-200 flex flex-col items-center gap-3 rounded-lg p-4 sm:flex-row sm:p-5">
            <div className="bg-secondary/20 text-secondary rounded-lg p-2 sm:p-3">
              <Zap size={20} className="sm:h-6 sm:w-6" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold sm:text-base">Instant</p>
              <p className="text-xs opacity-60 sm:text-sm">
                Immediate Delivery
              </p>
            </div>
          </div>

          <div className="bg-base-200 flex flex-col items-center gap-3 rounded-lg p-4 sm:flex-row sm:p-5">
            <div className="bg-accent/20 text-accent rounded-lg p-2 sm:p-3">
              <Lock size={20} className="sm:h-6 sm:w-6" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold sm:text-base">Protected</p>
              <p className="text-xs opacity-60 sm:text-sm">Your Data Safe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
