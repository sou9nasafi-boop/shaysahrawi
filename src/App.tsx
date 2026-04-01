import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import SocialFooter from "./components/SocialFooter";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOpenAdmin = () => {
      setIsAdminOpen(true);
    };
    window.addEventListener('open-admin', handleOpenAdmin);
    return () => window.removeEventListener('open-admin', handleOpenAdmin);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "ahmed" && password === "1234") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("خطأ في اسم المستخدم أو كلمة المرور");
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F0E8D8] font-sans" dir="rtl">
      <SocialFooter />

      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {!isLoggedIn ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#111] border border-[#C8973A]/20 p-8 rounded-2xl w-full max-w-md shadow-2xl relative"
              >
                <button 
                  onClick={() => setIsAdminOpen(false)}
                  className="absolute top-4 left-4 text-white/20 hover:text-white transition-colors"
                >
                  ✕
                </button>
                <h2 className="text-2xl font-serif text-[#C8973A] font-bold mb-6 text-center">تسجيل دخول المدير</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#C8973A] mb-1">اسم المستخدم</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#C8973A] outline-none transition-all"
                      placeholder="ahmed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#C8973A] mb-1">كلمة المرور</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#C8973A] outline-none transition-all"
                      placeholder="••••"
                    />
                  </div>
                  {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                  <button 
                    type="submit"
                    className="w-full bg-[#C8973A] text-black font-bold py-3 rounded-lg hover:bg-[#E8C06A] transition-all transform active:scale-95"
                  >
                    دخول
                  </button>
                </form>
              </motion.div>
            ) : (
              <AdminDashboard onClose={() => {
                setIsAdminOpen(false);
                setIsLoggedIn(false);
                setUsername("");
                setPassword("");
              }} />
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
