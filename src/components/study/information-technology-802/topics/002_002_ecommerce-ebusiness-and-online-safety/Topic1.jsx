import React, { useState } from 'react';
import { 
  ShoppingBag, GraduationCap, Globe, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Layers, ArrowRight, Zap, RefreshCw, ExternalLink, ShieldCheck 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const PortalClassifierExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState('ecommerce');

  const categories = {
    ecommerce: {
      title: "E-Commerce Shopping Portals",
      icon: ShoppingBag,
      color: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      badge: "Commercial Marketplace",
      summary: "Platforms dedicated to commercial transactions, product catalogs, shopping cart workflows, physical inventory management, and courier doorstep delivery.",
      portals: [
        { name: "Amazon India", url: "amazon.in", specialty: "Massive multi-category catalog, 1-Day Prime delivery, global vendor network" },
        { name: "Flipkart", url: "flipkart.com", specialty: "Electronics, mobile phones, Indian festive mega-sales (Big Billion Days)" },
        { name: "Snapdeal", url: "snapdeal.com", specialty: "Value-focused, affordable consumer products for Tier-2 & Tier-3 regional markets" },
        { name: "Nykaa", url: "nykaa.com", specialty: "Specialized beauty, cosmetics, luxury wellness, and personal grooming curation" },
        { name: "Infibeam", url: "infibeam.com", specialty: "Pioneer Indian digital store & fintech enterprise payment gateway infrastructure (CCAvenue)" }
      ]
    },
    elearning: {
      title: "E-Learning & MOOC Platforms",
      icon: GraduationCap,
      color: "text-sky-400",
      border: "border-sky-500/30",
      bg: "bg-sky-500/10",
      badge: "Digital Education Hub",
      summary: "Platforms delivering structured educational courses, video lectures, coding labs, graded assessments, and accredited university credentials.",
      portals: [
        { name: "Coursera", url: "coursera.org", specialty: "University MOOCs, degrees, and certificates from Stanford, Yale, Google, and IBM" },
        { name: "edX", url: "edx.org", specialty: "Rigorous academic courses founded by Harvard University & MIT for global learners" },
        { name: "SWAYAM (Govt of India)", url: "swayam.gov.in", specialty: "Free college courses & academic credit transfer managed by Ministry of Education" },
        { name: "NPTEL (IITs & IISc)", url: "nptel.ac.in", specialty: "Premier engineering, science, and computer technology courses from top IIT faculty" },
        { name: "Khan Academy", url: "khanacademy.org", specialty: "Free interactive K-12 math, science, and computing lessons for school students" }
      ]
    }
  };

  const current = categories[selectedCategory];
  const Icon = current.icon;

  return (
    <div className="space-y-6">
      <div className="bg-slate-850/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-750 pb-3">
          <Layers size={20} />
          <span>Interactive Portal Categorization & Domain Comparison</span>
        </div>

        {/* Category Selector Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('ecommerce')}
            className={"px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2.5 " + (
              selectedCategory === 'ecommerce'
                ? "bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            )}
          >
            <ShoppingBag size={18} />
            <span>E-Commerce Portals (Amazon, Nykaa, Snapdeal)</span>
          </button>
          <button
            onClick={() => setSelectedCategory('elearning')}
            className={"px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2.5 " + (
              selectedCategory === 'elearning'
                ? "bg-sky-500 text-white font-extrabold shadow-lg shadow-sky-500/20"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            )}
          >
            <GraduationCap size={18} />
            <span>E-Learning Portals (Coursera, edX, SWAYAM)</span>
          </button>
        </div>

        {/* Selected Category Details */}
        <div className={"p-6 rounded-2xl border " + current.border + " " + current.bg + " space-y-4"}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <Icon size={24} className={current.color} />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase">{current.badge}</span>
                <h3 className="text-lg font-extrabold text-white">{current.title}</h3>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{current.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {current.portals.map((portal, pIdx) => (
              <div key={pIdx} className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{portal.name}</span>
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    {portal.url}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{portal.specialty}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic1() {
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
                Module 002_002 · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Portal Taxonomy
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Popular E-Commerce Portals vs E-Learning Portals: Categorization & Domain Comparison
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand the operational demarcation between retail commerce platforms (Amazon, Snapdeal, Nykaa, Infibeam) and digital education platforms (Coursera, edX, SWAYAM, NPTEL).
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Taxonomy Lab', icon: BookOpen },
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

        {/* TAB 1: TAXONOMY LAB */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <PortalClassifierExplorer />

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="CBSE Board Questions frequently present a mixed list of websites (e.g. Nykaa, Coursera, india.gov.in, Snapdeal, edX) and ask you to categorize them into E-Commerce, E-Learning, and E-Governance. Make sure you can instantly recognize Nykaa as specialized cosmetics e-commerce and Coursera/edX as university MOOC portals!"
            />
          </div>
        )}

        {/* TAB 2: COMPARATIVE MATRIX */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={18} /> Architectural & Functional Comparison
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
                      <th className="p-3">Parameter</th>
                      <th className="p-3 text-amber-400">E-Commerce Portals</th>
                      <th className="p-3 text-sky-400">E-Learning Portals</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Core Deliverable</td>
                      <td className="p-3">Physical goods, gadgets, fashion, groceries</td>
                      <td className="p-3">Educational video lectures, quizzes, degree certificates</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Core Engine</td>
                      <td className="p-3">Shopping Cart, Inventory DB, Courier Logistics API</td>
                      <td className="p-3">LMS (Learning Management System), Video Streaming CDN</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Delivery Channel</td>
                      <td className="p-3">Air/Road Couriers with parcel tracking to doorstep</td>
                      <td className="p-3">Instant browser-based streaming and PDF courseware downloads</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Revenue Model</td>
                      <td className="p-3">Product margin, marketplace vendor commissions, ad banners</td>
                      <td className="p-3">Freemium model, certificate fees, monthly course subscriptions</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Key Indian/Global Examples</td>
                      <td className="p-3 font-mono text-amber-300">Amazon, Flipkart, Snapdeal, Nykaa, Infibeam</td>
                      <td className="p-3 font-mono text-sky-300">Coursera, edX, SWAYAM, NPTEL, Khan Academy</td>
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
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Traps</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Trap 1: Classifying SWAYAM as E-Commerce</p>
                  <p className="text-slate-400">SWAYAM is an educational e-learning portal developed by the Government of India for online college courses. It is NOT an e-commerce shopping website!</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Trap 2: Forgetting Nykaa's Specialization</p>
                  <p className="text-slate-400">Nykaa is an e-commerce platform specifically focused on beauty, cosmetics, and personal care. In board questions asking for a niche beauty e-commerce portal, Nykaa is the primary answer.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 1 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PLAIN TEXT NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic1_ECommerce_vs_ELearning_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
