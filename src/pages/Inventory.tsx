import React, { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { toast } from "sonner";
import { myInventoryAtom, sellItemAtom } from "../store";
import { ITEM_TEMPLATES } from "../data/mockData";
import { Tag, X, DollarSign, Info } from "lucide-react";
import { ItemIcon } from "../utils/itemIcons";

export const Inventory: React.FC = () => {
  const [inventory] = useAtom(myInventoryAtom);
  const [, sellItem] = useAtom(sellItemAtom);

  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // Sell Logic States
  const [buyerPays, setBuyerPays] = useState<string>("");
  const [sellerReceives, setSellerReceives] = useState<string>("");

  const handleItemClick = (item: any) => {
    const template = ITEM_TEMPLATES.find((t) => t.id === item.templateId);
    setSelectedItem({ ...item, template });
  };

  const openSellModal = () => {
    setIsSellModalOpen(true);
    setBuyerPays("");
    setSellerReceives("");
  };

  const handleBuyerPaysChange = (val: string) => {
    setBuyerPays(val);
    const amount = parseInt(val);
    if (!isNaN(amount) && amount >= 3) {
      // Fees: 5% each (us + dev) with 1 NP minimum each
      // Our fee: max(1 NP, 5% of price)
      // Dev fee: max(1 NP, 5% of price)
      // Seller receives: price - our fee - dev fee (minimum 1 NP)
      const ourFee = Math.max(1, Math.round(amount * 0.05));
      const devFee = Math.max(1, Math.round(amount * 0.05));
      const receive = Math.max(1, amount - ourFee - devFee);
      setSellerReceives(receive.toString());
    } else {
      setSellerReceives("");
    }
  };

  const handleSellerReceivesChange = (val: string) => {
    setSellerReceives(val);
    const amount = parseInt(val);
    if (!isNaN(amount) && amount >= 1) {
      // Seller receives = BuyerPays - ourFee - devFee
      // Our fee = max(1, BuyerPays * 0.05)
      // Dev fee = max(1, BuyerPays * 0.05)
      // Solving: SellerReceives = BuyerPays - max(1, BuyerPays * 0.05) - max(1, BuyerPays * 0.05)
      // For BuyerPays >= 20: SellerReceives = BuyerPays * 0.9
      // For BuyerPays < 20: SellerReceives = BuyerPays - 2
      // Reverse: If SellerReceives = BuyerPays * 0.9, then BuyerPays = SellerReceives / 0.9
      // But need to account for minimum fees
      let pay = Math.round(amount / 0.9);
      // Ensure minimum price of 3
      if (pay < 3) pay = amount + 2; // Fallback to minimum fees
      setBuyerPays(pay >= 3 ? pay.toString() : "");
    } else {
      setBuyerPays("");
    }
  };

  const handleConfirmSell = () => {
    if (!selectedItem || !buyerPays) return;
    const amount = parseInt(buyerPays);
    if (isNaN(amount) || amount < 3) {
      toast.error("Minimum price is 3 NP.", {
        description: "Please enter a price of at least 3 NP to list your item.",
      });
      return;
    }
    // Convert displayed price (integer) back to internal price (decimal)
    const price = amount / 100;
    sellItem({ itemId: selectedItem.id, price });
    setIsSellModalOpen(false);
    setSelectedItem(null);
    toast.success("Item listed successfully!", {
      description: `${
        selectedItem.template.name
      } has been listed on the marketplace for ${amount.toLocaleString()} NP.`,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 min-h-[calc(100vh-140px)] lg:h-[calc(100vh-140px)]">
      {/* Inventory Grid */}
      <div className="flex-grow bg-base-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 overflow-y-auto custom-scrollbar">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
          Inventory{" "}
          <span className="badge badge-secondary badge-sm sm:badge-md">
            {inventory.length}
          </span>
        </h2>

        {inventory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-center opacity-50 px-4">
            <Tag size={40} className="sm:w-12 sm:h-12 mb-3 sm:mb-4" />
            <p className="text-base sm:text-lg">Your inventory is empty.</p>
            <p className="text-xs sm:text-sm">
              Buy items from the market to see them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {inventory.map((item) => {
              const template = ITEM_TEMPLATES.find(
                (t) => t.id === item.templateId
              );
              if (!template) return null;
              const isSelected = selectedItem?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`card bg-base-100 shadow-sm cursor-pointer transition-all hover:scale-105 border-2 ${
                    isSelected ? "border-primary" : "border-transparent"
                  }`}
                >
                  <figure className="px-2 pt-2">
                    <div className="rounded-lg h-24 sm:h-32 w-full flex items-center justify-center bg-gradient-to-br from-base-300 to-base-200">
                      <ItemIcon
                        iconName={template.image}
                        size="3rem"
                        className="text-secondary"
                      />
                    </div>
                  </figure>
                  <div className="card-body p-2 sm:p-3 text-center">
                    <h3 className="text-xs sm:text-sm font-bold truncate">
                      {template.name}
                    </h3>
                    <div className="badge badge-xs badge-outline mx-auto">
                      {template.rarity}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Item Details Aside */}
      <div
        className={`w-full lg:w-96 bg-base-100 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col transition-all duration-300 ${
          selectedItem
            ? "translate-x-0 opacity-100"
            : "translate-x-10 opacity-50 lg:opacity-100 lg:translate-x-0"
        } ${selectedItem ? "lg:block" : "hidden lg:block"}`}
      >
        {selectedItem ? (
          <>
            <button
              className="btn btn-circle btn-ghost btn-sm absolute right-4 top-4 lg:hidden"
              onClick={() => setSelectedItem(null)}
            >
              <X size={20} />
            </button>

            <div className="flex-grow">
              {/* Updated Header Layout: Image Left, Info Right */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-4 sm:mb-6">
                <figure className="bg-gradient-to-br from-neutral to-base-300 w-full sm:w-32 h-32 rounded-xl flex items-center justify-center flex-shrink-0 border border-base-content/10 shadow-inner mx-auto sm:mx-0">
                  <ItemIcon
                    iconName={selectedItem.template.image}
                    size="4rem"
                    className="text-secondary drop-shadow-xl hover:scale-110 transition duration-300"
                  />
                </figure>
                <div className="flex flex-col justify-center text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-bold leading-tight mb-2">
                    {selectedItem.template.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span
                      className={`badge badge-sm sm:badge-md ${
                        selectedItem.template.rarity === "Ancient"
                          ? "badge-error"
                          : "badge-secondary"
                      }`}
                    >
                      {selectedItem.template.rarity}
                    </span>
                    <span className="badge badge-ghost badge-sm sm:badge-md text-xs">
                      ID: {selectedItem.template.id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-base-200 rounded-lg p-3 sm:p-4 mb-4">
                <h4 className="font-bold text-xs sm:text-sm mb-2 opacity-70">
                  Traits
                </h4>
                <pre className="text-xs overflow-x-auto whitespace-pre-wrap font-mono opacity-80">
                  {JSON.stringify(selectedItem.traits, null, 2)}
                </pre>
              </div>

              <div className="text-xs sm:text-sm opacity-60">
                <p>Acquired: {selectedItem.acquiredDate}</p>
                <p className="truncate">Item ID: {selectedItem.id}</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-base-content/10">
              <button
                className="btn btn-primary w-full btn-md sm:btn-lg gap-2 shadow-lg shadow-primary/20"
                onClick={openSellModal}
              >
                <DollarSign size={18} className="sm:w-5 sm:h-5" /> Sell Item
              </button>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 p-8">
            <Info size={48} className="mb-4" />
            <p className="font-bold text-lg">Select an item</p>
            <p>
              Click on an item from your inventory to view details and sell
              options.
            </p>
          </div>
        )}
      </div>

      {/* Sell Modal */}
      {isSellModalOpen && (
        <div className="modal modal-open bg-black/60 backdrop-blur-sm">
          <div className="modal-box relative w-[calc(100%-2rem)] sm:w-full max-w-md mx-4">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setIsSellModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-6">
              Sell {selectedItem?.template.name}
            </h3>

            <div className="space-y-6">
              {/* Input 1: Buyer Pays */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Buyer pays</span>
                  <span className="label-text-alt">
                    Market Price (Min: 3 NP)
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="3"
                    placeholder="3"
                    className="input input-bordered w-full pr-12 text-lg font-bold"
                    value={buyerPays}
                    onChange={(e) => handleBuyerPaysChange(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold opacity-50">
                    NP
                  </span>
                </div>
              </div>

              {/* Arrow Icon */}
              <div className="flex justify-center opacity-50">
                <div className="border-l-2 border-dashed border-base-content/30 h-8"></div>
              </div>

              {/* Input 2: You Receive */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-secondary">
                    You receive
                  </span>
                  <span className="label-text-alt flex items-center gap-1">
                    <Info size={12} /> After Fees (5% each, min 1 NP)
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    placeholder="1"
                    className="input input-bordered input-secondary w-full pr-12 text-lg font-bold"
                    value={sellerReceives}
                    onChange={(e) => handleSellerReceivesChange(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold opacity-50 text-secondary">
                    NP
                  </span>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="bg-base-200 p-3 rounded-lg text-xs space-y-1 opacity-70">
                {(() => {
                  const buyerPaysAmount = parseInt(buyerPays || "0");
                  const ourFee =
                    buyerPaysAmount >= 3
                      ? Math.max(1, Math.round(buyerPaysAmount * 0.05))
                      : 0;
                  const devFee =
                    buyerPaysAmount >= 3
                      ? Math.max(1, Math.round(buyerPaysAmount * 0.05))
                      : 0;
                  const sellerReceives =
                    buyerPaysAmount >= 3
                      ? Math.max(1, buyerPaysAmount - ourFee - devFee)
                      : 0;
                  return (
                    <>
                      <div className="flex justify-between">
                        <span>Nexus Market Fee</span>
                        <span>- {ourFee.toLocaleString()} NP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Developer Fee</span>
                        <span>- {devFee.toLocaleString()} NP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>You Receive</span>
                        <span>{sellerReceives.toLocaleString()} NP</span>
                      </div>
                    </>
                  );
                })()}
              </div>

              <button
                className="btn btn-primary w-full"
                onClick={handleConfirmSell}
              >
                Confirm Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
