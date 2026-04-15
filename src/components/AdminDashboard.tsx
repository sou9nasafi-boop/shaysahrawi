import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getProducts, addProduct, updateProduct, deleteProduct, updateMessageStatus } from '../lib/firebase';
import { supabase } from '../lib/supabase';
import { Users, ShoppingBag, MousePointer2, ShieldCheck, Plus, Pencil, Trash2, X, Image as ImageIcon, LayoutGrid, BarChart3, Mail, CheckCircle2, Phone, Search, Filter, Loader2 } from 'lucide-react';
import { Product, Category } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';
import { cn } from '../lib/utils';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visits, setVisits] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'messages'>('stats');
  
  // Product Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  
  // Product Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'tea',
    prices: { '200g': 0 },
    description: '',
    image: '',
    secondaryImage: '',
    gallery: [],
    features: []
  });

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'falaki' && password === 'safi1234') {
      setIsAuthenticated(true);
    } else {
      alert('خطأ في اسم المستخدم أو كلمة المرور');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const [vRes, cRes, pRes, mRes] = await Promise.all([
            supabase.from('visits').select('*').order('created_at', { ascending: false }).limit(500),
            supabase.from('clicks').select('*').order('created_at', { ascending: false }).limit(500),
            supabase.from('products').select('*').order('created_at', { ascending: false }),
            supabase.from('messages').select('*').order('created_at', { ascending: false })
          ]);

          setVisits(vRes.data || []);
          setOrders(cRes.data || []);
          
          const fetchedProducts = (pRes.data || []).map(p => ({
            ...p,
            secondaryImage: p.secondaryimage
          })) as Product[];
          setProducts(fetchedProducts.length > 0 ? fetchedProducts : INITIAL_PRODUCTS);
          
          setMessages(mRes.data || []);
        } catch (e) {
          console.error("Error polling data:", e);
        }
      };

      fetchData();
      const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await addProduct(formData);
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        category: 'tea',
        prices: { '200g': 0 },
        description: '',
        image: '',
        secondaryImage: '',
        gallery: [],
        features: []
      });
    } catch (error) {
      alert('حدث خطأ أثناء حفظ المنتج');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        alert('حدث خطأ أثناء حذف المنتج');
      }
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      prices: product.prices,
      description: product.description,
      image: product.image,
      secondaryImage: product.secondaryImage || '',
      gallery: product.gallery || [],
      features: product.features || []
    });
    setIsModalOpen(true);
  };

  const handlePriceChange = (weight: string, price: string) => {
    setFormData(prev => ({
      ...prev,
      prices: {
        ...prev.prices,
        [weight]: parseFloat(price) || 0
      }
    }));
  };

  const addPriceOption = () => {
    const weight = prompt('أدخل الوزن (مثلاً: 500g)');
    if (weight) {
      setFormData(prev => ({
        ...prev,
        prices: { ...prev.prices, [weight]: 0 }
      }));
    }
  };

  const removePriceOption = (weight: string) => {
    setFormData(prev => {
      const newPrices = { ...prev.prices };
      delete newPrices[weight];
      return { ...prev, prices: newPrices };
    });
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...(prev.features || []), '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => {
      const newFeatures = [...(prev.features || [])];
      newFeatures[index] = value;
      return { ...prev, features: newFeatures };
    });
  };

  const removeFeature = (index: number) => {
    setFormData(prev => {
      const newFeatures = [...(prev.features || [])];
      newFeatures.splice(index, 1);
      return { ...prev, features: newFeatures };
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.location.hash = '';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#111] p-8 rounded-[2rem] border border-white/5 w-full max-w-md shadow-2xl"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#C8973A]/10 rounded-2xl flex items-center justify-center text-[#C8973A]">
              <ShieldCheck size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-serif font-bold text-center text-[#F0E8D8] mb-8">لوحة تحكم المدير</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mb-2 block mr-2">اسم المستخدم</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 transition-colors"
                placeholder="falaki"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-[#F0E8D8]/40 font-bold mb-2 block mr-2">كلمة المرور</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full luxury-button bg-[#C8973A] text-black font-black py-4 rounded-xl shadow-lg">دخول</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F0E8D8]">مرحباً، {username}</h1>
            <p className="text-[#F0E8D8]/40 mt-2">إحصائيات الموقع والطلبات في الوقت الفعلي</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex">
              <button 
                onClick={() => setActiveTab('stats')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                  activeTab === 'stats' ? "bg-[#C8973A] text-black" : "text-[#F0E8D8]/40 hover:text-[#F0E8D8]"
                )}
              >
                <BarChart3 size={18} />
                الإحصائيات
              </button>
              <button 
                onClick={() => setActiveTab('products')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                  activeTab === 'products' ? "bg-[#C8973A] text-black" : "text-[#F0E8D8]/40 hover:text-[#F0E8D8]"
                )}
              >
                <LayoutGrid size={18} />
                المنتجات
              </button>
              <button 
                onClick={() => setActiveTab('messages')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 relative",
                  activeTab === 'messages' ? "bg-[#C8973A] text-black" : "text-[#F0E8D8]/40 hover:text-[#F0E8D8]"
                )}
              >
                <Mail size={18} />
                الرسائل
                {messages.filter(m => m.status === 'new').length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] flex items-center justify-center text-white border-2 border-[#111]">
                    {messages.filter(m => m.status === 'new').length}
                  </span>
                )}
              </button>
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 bg-white/5 text-[#F0E8D8]/60 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>

        {activeTab === 'stats' ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                    <Users size={24} />
                  </div>
                  <span className="text-[#F0E8D8]/40 text-sm font-bold">إجمالي الزيارات</span>
                </div>
                <div className="text-3xl font-bold text-[#F0E8D8]">{visits.length}</div>
              </div>
              <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                    <ShoppingBag size={24} />
                  </div>
                  <span className="text-[#F0E8D8]/40 text-sm font-bold">طلبات واتساب</span>
                </div>
                <div className="text-3xl font-bold text-[#F0E8D8]">{orders.length}</div>
              </div>
              <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                    <MousePointer2 size={24} />
                  </div>
                  <span className="text-[#F0E8D8]/40 text-sm font-bold">نسبة التحويل</span>
                </div>
                <div className="text-3xl font-bold text-[#F0E8D8]">
                  {visits.length > 0 ? ((orders.length / visits.length) * 100).toFixed(1) : 0}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Orders Table */}
              <div className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-xl font-serif font-bold text-[#F0E8D8]">آخر الطلبات</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-white/5 text-[#F0E8D8]/40 text-xs uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-4">المنتج</th>
                        <th className="px-6 py-4">الوزن</th>
                        <th className="px-6 py-4">السعر</th>
                        <th className="px-6 py-4">الوقت</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders.map((order) => (
                        <tr key={order.id} className="text-[#F0E8D8]/80 hover:bg-[#C8973A]/10 hover:text-white transition-all duration-300 cursor-default">
                          <td className="px-6 py-4 font-bold">{order.productName}</td>
                          <td className="px-6 py-4">{order.weight}</td>
                          <td className="px-6 py-4 text-[#C8973A]">{order.price} درهم</td>
                          <td className="px-6 py-4 text-xs opacity-50">
                            {new Date(order.created_at).toLocaleString('ar-MA')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Visits Table */}
              <div className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-xl font-serif font-bold text-[#F0E8D8]">نشاط الزوار</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-white/5 text-[#F0E8D8]/40 text-xs uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-4">IP</th>
                        <th className="px-6 py-4">المتصفح</th>
                        <th className="px-6 py-4">المسار</th>
                        <th className="px-6 py-4">الوقت</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {visits.map((visit) => (
                        <tr key={visit.id} className="text-[#F0E8D8]/80 hover:bg-[#C8973A]/10 hover:text-white transition-all duration-300 cursor-default">
                          <td className="px-6 py-4 font-mono text-xs text-[#C8973A]">{visit.ip}</td>
                          <td className="px-6 py-4 text-xs truncate max-w-[150px]">{visit.userAgent}</td>
                          <td className="px-6 py-4">{visit.path}</td>
                          <td className="px-6 py-4 text-xs opacity-50">
                            {new Date(visit.created_at).toLocaleString('ar-MA')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : activeTab === 'messages' ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-[#F0E8D8]">رسائل الزبائن</h2>
              <div className="text-sm text-[#F0E8D8]/40">
                إجمالي الرسائل: {messages.length}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {messages.length === 0 ? (
                <div className="bg-[#111] p-20 rounded-3xl border border-white/5 text-center">
                  <Mail size={48} className="mx-auto text-[#F0E8D8]/10 mb-4" />
                  <p className="text-[#F0E8D8]/20">لا توجد رسائل حالياً</p>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div 
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "bg-[#111] p-6 rounded-2xl border transition-all duration-300 hover:bg-white/5 hover:border-[#C8973A]/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
                      message.status === 'new' ? "border-[#C8973A]/30 shadow-[0_0_20px_rgba(200,151,58,0.05)]" : "border-white/5 opacity-60 hover:opacity-100"
                    )}
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-grow space-y-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            message.status === 'new' ? "bg-[#C8973A] animate-pulse" : "bg-white/20"
                          )} />
                          <h3 className="text-lg font-bold text-[#F0E8D8]">{message.name}</h3>
                          <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-[#F0E8D8]/40 uppercase tracking-widest">
                            {message.city || 'مدينة غير معروفة'}
                          </span>
                        </div>
                        <p className="text-[#F0E8D8]/70 leading-relaxed font-light">
                          {message.content}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs text-[#F0E8D8]/30">
                          <div className="flex items-center gap-2">
                            <Phone size={12} />
                            {message.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <MousePointer2 size={12} />
                            {message.ip}
                          </div>
                          <div className="opacity-50">
                            {new Date(message.created_at).toLocaleString('ar-MA')}
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col justify-end gap-2">
                        {message.status === 'new' && (
                          <button 
                            onClick={() => updateMessageStatus(message.id, 'read')}
                            className="bg-[#C8973A]/10 text-[#C8973A] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#C8973A] hover:text-black transition-all flex items-center gap-2"
                          >
                            <CheckCircle2 size={14} />
                            تحديد كمقروء
                          </button>
                        )}
                        <a 
                          href={`https://wa.me/${message.phone.replace(/\s/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-green-500/10 text-green-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-500 hover:text-white transition-all flex items-center gap-2"
                        >
                          <ShoppingBag size={14} />
                          رد عبر واتساب
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <h2 className="text-2xl font-serif font-bold text-[#F0E8D8]">إدارة المنتجات</h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-grow sm:w-64">
                  <input 
                    type="text" 
                    placeholder="بحث عن منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F0E8D8]/20" size={16} />
                </div>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as any)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 text-sm"
                >
                  <option value="all">كل التصنيفات</option>
                  <option value="tea">شاي</option>
                  <option value="melhfa">ملاحف</option>
                  <option value="perfume">عطور</option>
                  <option value="sahrawi">منتجات صحراوية</option>
                </select>
                <button 
                  onClick={() => {
                    setEditingProduct(null);
                    setFormData({
                      name: '',
                      category: 'tea',
                      prices: { '200g': 0 },
                      description: '',
                      image: '',
                      secondaryImage: '',
                      features: []
                    });
                    setIsModalOpen(true);
                  }}
                  className="bg-[#C8973A] text-black px-6 py-3 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-[#E8C06A] transition-colors whitespace-nowrap"
                >
                  <Plus size={20} />
                  إضافة منتج
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  key={product.id} 
                  className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#C8973A]/30 transition-all duration-500"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button onClick={() => openEditModal(product)} className="bg-white text-black p-3 rounded-full hover:bg-[#C8973A] transition-colors shadow-lg">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[10px] text-[#C8973A] font-bold uppercase tracking-widest">
                        {product.category === 'tea' ? 'شاي' : product.category === 'melhfa' ? 'ملاحف' : product.category === 'perfume' ? 'عطور' : 'صحراوي'}
                      </div>
                      <div className="text-[10px] text-[#F0E8D8]/20 font-mono">#{product.id.slice(-4)}</div>
                    </div>
                    <h3 className="text-[#F0E8D8] font-bold truncate text-lg mb-3">{product.name}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(product.prices).map(([weight, price]) => (
                        <span key={weight} className="text-[10px] bg-white/5 text-[#F0E8D8]/60 px-2 py-1 rounded-lg border border-white/5 font-bold">
                          {weight}: {price}د
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="bg-[#111] p-20 rounded-3xl border border-white/5 text-center">
                <LayoutGrid size={48} className="mx-auto text-[#F0E8D8]/10 mb-4" />
                <p className="text-[#F0E8D8]/20">لم يتم العثور على منتجات تطابق بحثك</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#111] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] border border-white/10 shadow-2xl p-8 md:p-12"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 left-6 text-[#F0E8D8]/40 hover:text-[#F0E8D8]">
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-serif font-bold text-[#F0E8D8] mb-8">
                {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
              </h2>

              <form onSubmit={handleSaveProduct} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#F0E8D8]/40 uppercase tracking-widest">اسم المنتج</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#F0E8D8]/40 uppercase tracking-widest">التصنيف</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50"
                    >
                      <option value="tea">شاي</option>
                      <option value="melhfa">ملاحف</option>
                      <option value="perfume">عطور</option>
                      <option value="sahrawi">منتجات صحراوية</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#F0E8D8]/40 uppercase tracking-widest">الوصف</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#F0E8D8]/40 uppercase tracking-widest">الأسعار والأوزان</label>
                    <button type="button" onClick={addPriceOption} className="text-[#C8973A] text-xs font-bold hover:underline">إضافة وزن جديد</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(formData.prices).map(([weight, price]) => (
                      <div key={weight} className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                        <span className="text-xs font-bold text-[#F0E8D8]/60 min-w-[60px]">{weight}</span>
                        <input 
                          type="number" 
                          value={price}
                          onChange={(e) => handlePriceChange(weight, e.target.value)}
                          className="flex-grow bg-transparent border-none text-[#F0E8D8] focus:outline-none text-sm"
                          placeholder="السعر"
                        />
                        <button type="button" onClick={() => removePriceOption(weight)} className="text-red-500/50 hover:text-red-500">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#F0E8D8]/40 uppercase tracking-widest">رابط الصورة الأساسية</label>
                    <div className="relative">
                      <input 
                        required
                        type="url" 
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 text-xs"
                      />
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F0E8D8]/20" size={16} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#F0E8D8]/40 uppercase tracking-widest">رابط الصورة الثانوية (اختياري)</label>
                    <div className="relative">
                      <input 
                        type="url" 
                        value={formData.secondaryImage}
                        onChange={(e) => setFormData({...formData, secondaryImage: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 text-xs"
                      />
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F0E8D8]/20" size={16} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#F0E8D8]/40 uppercase tracking-widest">صور إضافية (المعرض - رابط في كل سطر)</label>
                  <textarea 
                    rows={3}
                    value={formData.gallery?.join('\n') || ''}
                    onChange={(e) => setFormData({...formData, gallery: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 text-xs text-left"
                    dir="ltr"
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#F0E8D8]/40 uppercase tracking-widest">المميزات (Features)</label>
                    <button type="button" onClick={addFeature} className="text-[#C8973A] text-xs font-bold hover:underline flex items-center gap-1">
                      <Plus size={14} />
                      إضافة ميزة
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(formData.features || []).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input 
                          type="text" 
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F0E8D8] focus:outline-none focus:border-[#C8973A]/50 text-sm"
                          placeholder="مثال: طبيعي 100%"
                        />
                        <button type="button" onClick={() => removeFeature(index)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors">
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                    {(!formData.features || formData.features.length === 0) && (
                      <div className="text-center py-4 text-xs text-[#F0E8D8]/40 border border-dashed border-white/10 rounded-xl">
                        لا توجد مميزات مضافة. اضغط على "إضافة ميزة" للبدء.
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  disabled={isSaving}
                  className="w-full bg-[#C8973A] text-black font-black py-5 rounded-2xl shadow-xl hover:bg-[#E8C06A] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      جاري الحفظ...
                    </>
                  ) : (
                    editingProduct ? 'تحديث المنتج' : 'إضافة المنتج'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
