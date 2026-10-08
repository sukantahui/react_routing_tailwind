import React, { useState } from 'react';
import { 
  ShoppingCart, Plus, Minus, Trash2, Tag, ArrowRight, 
  CheckCircle2, XCircle, AlertTriangle, HelpCircle, 
  FileText, Sparkles, BookOpen, Layers, Zap, RefreshCw, CreditCard, Box, ShieldCheck 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const InteractiveShoppingCartSimulator = () => {
  const [catalog] = useState([
    { id: 1, name: "CBSE Class XII IT (802) Handbook", price: 450, category: "Textbook", stock: 12 },
    { id: 2, name: "Wireless Optical Ergonomic Mouse", price: 799, category: "Hardware", stock: 8 },
    { id: 3, name: "SanDisk 64GB USB 3.2 Flash Drive", price: 549, category: "Storage", stock: 15 },
    { id: 4, name: "Java Programming Reference Guide", price: 620, category: "Reference", stock: 5 }
  ]);

  const [cart, setCart] = useState([
    { id: 1, name: "CBSE Class XII IT (802) Handbook", price: 450, qty: 1 },
    { id: 3, name: "SanDisk 64GB USB 3.2 Flash Drive", price: 549, qty: 1 }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Cart operations
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'CBSE10') {
      setAppliedDiscount(0.10);
      setCouponStatus({ type: 'success', msg: 'Coupon CBSE10 Applied! 10% Discount unlocked.' });
    } else if (code === 'FREESHIP') {
      setAppliedDiscount(0.05);
      setCouponStatus({ type: 'success', msg: 'Coupon FREESHIP Applied! Special 5% Shipping Rebate.' });
    } else {
      setCouponStatus({ type: 'error', msg: 'Invalid Coupon Code. Try "CBSE10" or "FREESHIP".' });
    }
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const shippingCharge = subtotal > 1000 || subtotal === 0 ? 0 : 70;
  const gstTax = Math.round((subtotal - discountAmount) * 0.18); // 18% GST
  const grandTotal = (subtotal - discountAmount) + shippingCharge + gstTax;

  const handleProceedCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1500);
  };

  const handleReset = () => {
    setCart([
      { id: 1, name: "CBSE Class XII IT (802) Handbook", price: 450, qty: 1 },
      { id: 3, name: "SanDisk 64GB USB 3.2 Flash Drive", price: 549, qty: 1 }
    ]);
    setCouponCode('');
    setAppliedDiscount(0);
    setCouponStatus(null);
    setOrderComplete(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-850/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-750 pb-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
            <ShoppingCart size={20} />
            <span>Interactive Virtual Shopping Cart Simulator</span>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-400 hover:text-white rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={12} /> Reset Cart
          </button>
        </div>

        {orderComplete ? (
          <div className="p-8 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-extrabold text-white">Order Successfully Placed & Verified!</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Simulated Checkout Complete. Total ₹{grandTotal} settled via Secure Payment Gateway Handshake. Confirmation SMS & AWB Tracking initiated.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer"
            >
              Start New Cart Simulation
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Product Catalog & Cart Items */}
            <div className="lg:col-span-7 space-y-4">
              {/* Mini Catalog */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2.5">
                <span className="text-xs font-bold text-slate-300 block">1. Available Store Catalog (Add to Cart)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {catalog.map(prod => (
                    <div key={prod.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-850 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">{prod.name}</span>
                        <span className="text-[11px] font-mono text-emerald-400">₹{prod.price}</span>
                      </div>
                      <button
                        onClick={() => addToCart(prod)}
                        className="px-2.5 py-1 bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-white border border-sky-500/30 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Plus size={12} /> Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Cart Items */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">2. Active Cart Items ({cart.length})</span>
                  <span className="text-[11px] font-mono text-slate-400">Session ID: #CART-2026-IT802</span>
                </div>

                {cart.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-xs">
                    Your virtual shopping cart is currently empty. Add items from the catalog above.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cart.map(item => (
                      <div key={item.id} className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                          <span className="text-[11px] font-mono text-slate-400">₹{item.price} each</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {/* Qty controls */}
                          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2.5 text-xs font-mono font-bold text-sky-300">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-xs font-mono font-bold text-white w-14 text-right">
                            ₹{item.price * item.qty}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 rounded cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Financial Summary & Checkout Engine */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-slate-300 block">3. Price Breakdown Engine</span>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Try: CBSE10 or FREESHIP"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-sky-400 border border-sky-500/30 rounded-xl text-xs font-bold cursor-pointer transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {couponStatus && (
                    <span className={"text-[10px] block font-mono " + (couponStatus.type === 'success' ? 'text-emerald-400' : 'text-rose-400')}>
                      {couponStatus.msg}
                    </span>
                  )}
                </form>

                {/* Calculation Rows */}
                <div className="space-y-2 text-xs border-t border-slate-800 pt-3 font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Cart Subtotal</span>
                    <span className="text-white">₹{subtotal}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount ({appliedDiscount * 100}%)</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>GST (18% Statutory Tax)</span>
                    <span className="text-white">₹{gstTax}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Standard Shipping Fee</span>
                    <span className={shippingCharge === 0 ? "text-emerald-400" : "text-white"}>
                      {shippingCharge === 0 ? "FREE (Orders > ₹1000)" : `₹${shippingCharge}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white border-t border-slate-800 pt-2">
                    <span>Final Grand Total</span>
                    <span className="text-amber-400">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Checkout Action Button */}
                <button
                  disabled={cart.length === 0 || isCheckingOut}
                  onClick={handleProceedCheckout}
                  className={"w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 " + (
                    cart.length > 0 && !isCheckingOut
                      ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/25 cursor-pointer"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  )}
                >
                  {isCheckingOut ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Handshaking with Payment Gateway...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard size={14} />
                      <span>Proceed to Secure Checkout (₹{grandTotal})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default function Topic2() {
  const [activeTab, setActiveTab] = useState('concept');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002_002 · Topic 2
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Core Shopping Architecture
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              The Concept and Functionality of a Virtual Shopping Cart in E-Commerce Websites
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand how virtual shopping carts manage session state, calculate itemized pricing, handle coupon validations, and interface with secure checkout payment gateways.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Cart Simulator Lab', icon: BookOpen },
            { id: 'matrix', label: '2. Cart vs Wishlist Matrix', icon: Layers },
            { id: 'pitfalls', label: '3. Board Tips & Pitfalls', icon: AlertTriangle },
            { id: 'faqs', label: '4. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Plain Text Notes', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={"flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer " + (
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                )}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: CART SIMULATOR LAB */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <InteractiveShoppingCartSimulator />

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="When defining a Shopping Cart in CBSE examinations, always emphasize its dynamic role: (1) Preserving session state across web pages, (2) Enabling dynamic quantity modifications & coupon validation, and (3) Handshaking with the secure payment gateway at checkout. Remember that HTTP is stateless, so cookies or session storage are mandatory!"
            />
          </div>
        )}

        {/* TAB 2: CART VS WISHLIST MATRIX */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={18} /> Virtual Shopping Cart vs Wishlist (Save for Later)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
                      <th className="p-3">Feature Parameter</th>
                      <th className="p-3 text-sky-400">Virtual Shopping Cart</th>
                      <th className="p-3 text-amber-400">Customer Wishlist</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Primary Purpose</td>
                      <td className="p-3">Active queue for immediate order checkout & payment</td>
                      <td className="p-3">Bookmark collection of desired items for future consideration</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Price & Tax Calculation</td>
                      <td className="p-3">Computes live subtotal, GST, discounts, and shipping</td>
                      <td className="p-3">Shows base price only; does not calculate taxes or discounts</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Quantity Controls</td>
                      <td className="p-3">Allows dynamic unit increments (+ / -)</td>
                      <td className="p-3">Static single item bookmark</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Checkout Capability</td>
                      <td className="p-3">Directly connected to the payment gateway</td>
                      <td className="p-3">Cannot be checked out directly; must be moved to cart first</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BOARD PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-850/60 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Common Mistakes</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Mistake 1: Stating that adding to cart commits financial payment</p>
                  <p className="text-slate-400">Adding an item to a virtual cart does NOT charge the customer's account. Payment only occurs during the checkout phase through the authorized payment gateway.</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Mistake 2: Forgetting Session Storage / Cookie Mechanics</p>
                  <p className="text-slate-400">When asked how a website remembers cart items as a customer navigates between pages, always mention HTTP Session Cookies or Local Storage tokens.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 2 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PLAIN TEXT NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic2_Virtual_Shopping_Cart_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
