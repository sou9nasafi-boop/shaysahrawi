import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface Order {
  id: number;
  date: string;
  items: string[];
  total: string;
  status: string;
}

interface Stats {
  visits: number;
  orders: Order[];
}

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [stats, setStats] = useState<Stats>({ visits: 0, orders: [] });

  useEffect(() => {
    const loadStats = () => {
      const savedStats = localStorage.getItem('shay_stats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    };
    loadStats();
    
    // Refresh stats every 5 seconds
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8" dir="rtl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#111] border border-[#C8973A]/20 w-full max-w-5xl h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
          <div>
            <h2 className="text-2xl font-serif text-[#C8973A] font-bold">لوحة تحكم المدير</h2>
            <p className="text-white/40 text-sm">مرحباً بك يا أحمد — تتبع أداء متجرك</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/5">
            <div className="text-[#C8973A] text-sm mb-1">إجمالي الزيارات</div>
            <div className="text-3xl font-bold">{stats.visits}</div>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/5">
            <div className="text-[#C8973A] text-sm mb-1">إجمالي الطلبات</div>
            <div className="text-3xl font-bold">{stats.orders.length}</div>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/5">
            <div className="text-[#C8973A] text-sm mb-1">المبيعات المقدرة</div>
            <div className="text-3xl font-bold">
              {stats.orders.reduce((acc, o) => acc + parseFloat(o.total || "0"), 0)} درهم
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="flex-grow overflow-auto p-6 pt-0">
          <h3 className="text-lg font-bold mb-4 text-white/80">آخر الطلبات</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-[#C8973A] text-sm border-b border-white/5">
                  <th className="pb-3 px-4">التاريخ</th>
                  <th className="pb-3 px-4">المنتجات</th>
                  <th className="pb-3 px-4">المجموع</th>
                  <th className="pb-3 px-4">الحالة</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {stats.orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-white/20">لا توجد طلبات بعد</td>
                  </tr>
                ) : (
                  stats.orders.slice().reverse().map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-white/60">{order.date}</td>
                      <td className="py-4 px-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="text-white/80">• {item}</div>
                        ))}
                      </td>
                      <td className="py-4 px-4 font-bold text-[#C8973A]">{order.total} درهم</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-[10px]">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/40 border-t border-white/5 text-center text-[10px] text-white/20 uppercase tracking-widest">
          نظام إدارة الشاي الصحراوي الممتاز v1.0
        </div>
      </motion.div>
    </div>
  );
}
