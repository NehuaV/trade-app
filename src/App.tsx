import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Marketplace } from "./pages/Marketplace";
import { ItemDetail } from "./pages/ItemDetail";
import { Profile } from "./pages/Profile";
import { Inventory } from "./pages/Inventory";
import { BuyCurrency } from "./pages/BuyCurrency";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market/:gameId" element={<Marketplace />} />
          <Route path="/item/:itemId" element={<ItemDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/buy-points" element={<BuyCurrency />} />
        </Routes>
      </Layout>
      <Toaster position="top-center" expand={true} richColors={true} />
    </Router>
  );
}

export default App;
