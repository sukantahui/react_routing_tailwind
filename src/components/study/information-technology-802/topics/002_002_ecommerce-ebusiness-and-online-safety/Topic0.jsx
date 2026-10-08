import React, { useState } from 'react';
import { 
  ShoppingCart, Globe, Clock, Truck, ShieldCheck, Tag, 
  Search, Star, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Layers, ArrowRight, Zap, RefreshCw, CreditCard, Box 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const ECommerceAdvantagesVisualizer = () => {
  const [activeAdvantage, setActiveAdvantage] = useState(0);

  const advantages = [
    {
      title: "24x7x365 Round-the-Clock Convenience",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/30",
      description: "Unlike physical stores that operate between fixed hours (e.g. 10 AM – 8 PM), e-commerce portals are always open. A student in Barrackpore or Kolkata can place an order at 11:30 PM after studying without leaving their desk.",
      metrics: [
        { label: "Operational Window", val: "Continuous (24x7)" },
        { label: "Physical Commute", val: "Zero Minutes" },
        { label: "Holiday Shutdown", val: "None (365 Days)" }
      ]
    },
    {
      title: "Vast Product Variety & Global Inventory",
      icon: Box,
      color: "text-sky-400",
      bg: "bg-sky-500/10 border-sky-500/30",
      description: "Physical retail showrooms have limited floor space and stock only high-demand items. Online marketplaces connect thousands of vendors worldwide, cataloging millions of items, specific book editions, specialized electronics, and niche beauty products.",
      metrics: [
        { label: "Catalog Depth", val: "Millions of SKUs" },
        { label: "Stock Availability", val: "Real-time Live Count" },
        { label: "Global Reach", val: "National & International" }
      ]
    },
    {
      title: "Real-Time Price Comparisons & Best Deals",
      icon: Tag,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      description: "Consumers can open multiple browser tabs to compare prices on Amazon, Flipkart, or brand portals in seconds. Direct manufacturer pipelines eliminate dealer commissions, translating into seasonal discounts (Diwali/Puja sales) and promotional coupon codes.",
      metrics: [
        { label: "Price Transparency", val: "100% Instant" },
        { label: "Discounts & Cashback", val: "Coupons & Bank Offers" },
        { label: "Middleman Markups", val: "Substantially Reduced" }
      ]
    },
    {
      title: "Doorstep Delivery & Live GPS Tracking",
      icon: Truck,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/30",
      description: "Integrated third-party logistics (3PL) couriers deliver packages right to the customer's doorstep. Automated Air Waybill (AWB) tracking numbers give milestone updates from warehouse sorting to out-for-delivery GPS status.",
      metrics: [
        { label: "Delivery Method", val: "Direct Doorstep Pickup" },
        { label: "Milestone Visibility", val: "Live SMS & App GPS" },
        { label: "Reverse Logistics", val: "Home Return Pickup" }
      ]
    },
    {
      title: "Authentic Reviews & Transparent Social Proof",
      icon: Star,
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/30",
      description: "Past verified buyers post high-resolution photos, unboxing videos, star ratings, and candid feedback on size fitting, build quality, and durability. This empowers new buyers to make informed purchasing decisions.",
      metrics: [
        { label: "Verified Buyer Badges", val: "Authentic Feedback" },
        { label: "Customer Q&A", val: "Direct Peer Answers" },
        { label: "Star Ratings", val: "Aggregated 1 to 5 Stars" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-850/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-750 pb-3">
          <Zap size={20} />
          <span>Interactive Deep Dive: 5 Core Customer Advantages of E-Commerce</span>
        </div>

        {/* Advantage Tab Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <button
                key={idx}
                onClick={() => setActiveAdvantage(idx)}
                className={"p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between " + (
                  activeAdvantage === idx
                    ? "bg-slate-800 border-sky-500 text-white shadow-lg shadow-sky-500/10"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <Icon size={18} className={activeAdvantage === idx ? adv.color : "text-slate-500"} />
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-slate-400">
                    0{idx + 1}
                  </span>
                </div>
                <span className="text-xs font-bold line-clamp-2">{adv.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Advantage Detailed Card */}
        {(() => {
          const sel = advantages[activeAdvantage];
          const Icon = sel.icon;
          return (
            <div className={"p-6 rounded-2xl border " + sel.bg + " space-y-4"}>
              <div className="flex items-center gap-3">
                <div className={"p-2.5 rounded-xl bg-slate-900 border border-slate-800 " + sel.color}>
                  <Icon size={24} />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Advantage Analysis</span>
                  <h3 className="text-lg font-extrabold text-white">{sel.title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{sel.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {sel.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                    <span className="text-[11px] text-slate-400 block">{m.label}</span>
                    <span className="text-sm font-bold text-sky-300">{m.val}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default function Topic0() {
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
                Module 002_002 · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                E-Commerce Fundamentals
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Concept of E-Commerce & Online Shopping: Customer Advantages
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the fundamental mechanics of Electronic Commerce, contrast digital marketplaces with physical commerce, and analyze customer benefits including 24x7 availability, price transparency, and doorstep delivery.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Conceptual Lab', icon: BookOpen },
            { id: 'matrix', label: '2. Comparative Matrix', icon: Layers },
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

        {/* TAB 1: CONCEPTUAL LAB */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <ECommerceAdvantagesVisualizer />

            {/* Core Definition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <ShoppingCart size={18} />
                  <span>What is E-Commerce?</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong>Electronic Commerce (E-Commerce)</strong> is the trading of goods, services, and digital products, accompanied by the electronic transfer of funds and data, over computer networks, primarily the <strong>Internet</strong>.
                </p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 text-xs text-slate-400 font-mono">
                  Formula: Traditional Commerce + Internet Infrastructure + Digital Payment Gateway + Modern Logistics = E-Commerce
                </div>
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CreditCard size={18} />
                  <span>Primary Business Models in E-Commerce</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li><strong className="text-white">B2C (Business-to-Consumer):</strong> Portals selling directly to individuals (e.g. Amazon India, Nykaa, Flipkart).</li>
                  <li><strong className="text-white">B2B (Business-to-Business):</strong> Bulk wholesale suppliers selling to retail merchants (e.g. IndiaMART, Udaan).</li>
                  <li><strong className="text-white">C2C (Consumer-to-Consumer):</strong> Peer-to-peer sale of pre-owned items (e.g. OLX, eBay).</li>
                </ul>
              </div>
            </div>

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="In CBSE Board Questions, students often get asked: 'State any two advantages of online shopping from a customer perspective.' Always mention: (1) 24x7 Round-the-clock convenience with doorstep delivery, and (2) Instant price comparison and verified customer ratings! Avoid vague answers like 'it is good'."
            />
          </div>
        )}

        {/* TAB 2: COMPARATIVE MATRIX */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={18} /> Traditional Commerce vs Electronic Commerce
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
                      <th className="p-3">Parameter</th>
                      <th className="p-3 text-emerald-400">Traditional Physical Retail</th>
                      <th className="p-3 text-sky-400">E-Commerce Web Portal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Storefront</td>
                      <td className="p-3">Physical building / showroom in a commercial market</td>
                      <td className="p-3">Virtual web application / mobile smartphone app</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Operating Hours</td>
                      <td className="p-3">Fixed shop timings (e.g., 10:00 AM to 8:00 PM)</td>
                      <td className="p-3">24 Hours x 7 Days x 365 Days non-stop access</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Geographic Scope</td>
                      <td className="p-3">Restricted to local city / neighborhood radius</td>
                      <td className="p-3">Global / Pan-India access across all pincodes</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Price Transparency</td>
                      <td className="p-3">Requires traveling between shops to compare rates</td>
                      <td className="p-3">Instant side-by-side tab comparison across portals</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Payment Methods</td>
                      <td className="p-3">Primarily cash or physical card swipe at POS terminal</td>
                      <td className="p-3">UPI (GPay/PhonePe), Net Banking, Cards, EMI, CoD</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Product Delivery</td>
                      <td className="p-3">Immediate carry-home by customer in bags</td>
                      <td className="p-3">Delivered to doorstep via courier with GPS tracking</td>
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
                  <p className="font-bold text-amber-300 mb-1">Mistake 1: Confusing E-Commerce with E-Business</p>
                  <p className="text-slate-400">Remember: E-Commerce is strictly the commercial buying and selling of goods/services online. E-Business is the broader ecosystem encompassing e-commerce + supply chain management + ERP + customer support + internal operations.</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Mistake 2: Stating 'Product Touch and Feel' as an E-Commerce Advantage</p>
                  <p className="text-slate-400">The inability to physically touch or try on clothes before buying is a major limitation of e-commerce, not an advantage! Never list physical inspection under advantages.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 0 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PLAIN TEXT NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic0_ECommerce_Customer_Advantages_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
