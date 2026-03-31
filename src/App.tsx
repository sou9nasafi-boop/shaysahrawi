import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { VideoIntro } from "./components/VideoIntro";
import { CartItem, Product, WeightOption } from "./types";
import { toast } from "sonner";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const addToCart = (product: Product, option: WeightOption) => {
    const cartItemId = `${product.id}-${option.label}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          image: product.image,
          selectedOption: option,
          quantity: 1,
        },
      ];
    });
    toast.success(`تمت إضافة ${product.name} (${option.label}) إلى السلة`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <Router>
      {showIntro && <VideoIntro onComplete={handleIntroComplete} />}
      <MainLayout
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/products" element={<Products onAddToCart={addToCart} searchQuery={searchQuery} />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
