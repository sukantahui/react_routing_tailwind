import React, { useState } from 'react';
import { 
  Layout, Database, Server, Smartphone, Monitor, 
  Layers, ArrowRight, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, GitBranch, ShieldCheck, 
  FileCode, CheckSquare, Eye, Table, Cpu, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

// Interactive 3-Tier Architecture Simulator
const ThreeTierVisualizer = () => {
  const [activeTier, setActiveTier] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const tiers = [
    {
      id: 0,
      name: "Tier 1: Presentation Tier",
      badge: "Front-End User Interface",
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
      icon: Monitor,
      tech: "HTML5, CSS3, JavaScript, React, NetBeans Swing",
      responsibilities: [
        "Renders visual UI components, navigation menus, and data forms",
        "Captures user actions (mouse clicks, form inputs, keyboard shortcuts)",
        "Executes client-side validation (e.g. 10-digit mobile number check)",
        "Communicates with Application Tier via asynchronous HTTPS/REST requests"
      ],
      examTip: "CBSE Question: 'Which tier directly interacts with the end user in a web application?' -> Presentation Tier."
    },
    {
      id: 1,
      name: "Tier 2: Application / Logic Tier",
      badge: "Middle-Tier Business Engine",
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      icon: Server,
      tech: "Java Servlets, Spring Boot, Node.js, Python, Apache Tomcat",
      responsibilities: [
        "Enforces core business logic, discount formulas, and tax calculations",
        "Validates session authentication tokens and user access permissions",
        "Constructs parameterized SQL queries using PreparedStatements",
        "Transforms raw database records into JSON responses for Tier 1"
      ],
      examTip: "CBSE Question: 'Where are complex business calculations and validation rules executed?' -> Application / Business Logic Tier."
    },
    {
      id: 2,
      name: "Tier 3: Data / Database Tier",
      badge: "Back-End Relational Store",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      icon: Database,
      tech: "MySQL Server 8.0, PostgreSQL, Oracle RDBMS",
      responsibilities: [
        "Persists transactional records safely on non-volatile disk storage",
        "Enforces Primary Key, Foreign Key, NOT NULL, and CHECK constraints",
        "Guarantees ACID transaction properties (Atomicity, Consistency, Isolation, Durability)",
        "Executes high-speed indexed lookups, joins, and aggregations (SUM, AVG)"
      ],
      examTip: "CBSE Question: 'Which tier enforces relational constraints and table relationships?' -> Data Tier."
    }
  ];

  const handleSimulateRequest = () => {
    setIsSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 1000);
    setTimeout(() => setSimStep(3), 2000);
    setTimeout(() => setSimStep(4), 3000);
    setTimeout(() => {
      setIsSimulating(false);
      setSimStep(0);
    }, 4200);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Layers className="w-3.5 h-3.5" /> High-Level Architecture (HLD)
          </span>
          <h3 className="text-xl font-bold text-white mt-2">Interactive 3-Tier Client-Server Architecture</h3>
          <p className="text-sm text-slate-400">Click each tier to inspect its technology stack, or simulate a full HTTP data request lifecycle.</p>
        </div>
        <button
          onClick={handleSimulateRequest}
          disabled={isSimulating}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
            isSimulating 
              ? 'bg-purple-600/50 text-purple-200 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white hover:shadow-purple-500/25'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
          {isSimulating ? 'Simulating Traffic Flow...' : 'Simulate 3-Tier Request Flow'}
        </button>
      </div>

      {/* Simulation status banner */}
      {isSimulating && (
        <div className="mb-6 p-4 rounded-xl bg-purple-950/60 border border-purple-500/50 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-200">
              {simStep === 1 && "Step 1: User clicks 'Pay ₹1,200 Bill' in Browser -> HTTPS POST sent to Application Tier..."}
              {simStep === 2 && "Step 2: Java Servlet receives request, verifies JWT token & prepares SQL query..."}
              {simStep === 3 && "Step 3: MySQL Data Tier executes atomic transaction: INSERT INTO INVOICES & updates stock..."}
              {simStep === 4 && "Step 4: Database commits -> Server formats JSON confirmation -> Client renders invoice receipt!"}
            </span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-purple-800/60 text-purple-200 font-mono">Step {simStep}/4</span>
        </div>
      )}

      {/* 3 Tiers grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {tiers.map((t) => {
          const Icon = t.icon;
          const isSelected = activeTier === t.id;
          const isHighlighted = (simStep === 1 && t.id === 0) || (simStep === 2 && t.id === 1) || (simStep === 3 && t.id === 2) || (simStep === 4 && t.id === 0);

          return (
            <div
              key={t.id}
              onClick={() => setActiveTier(t.id)}
              className={`cursor-pointer p-5 rounded-xl border transition-all duration-300 relative ${
                isHighlighted
                  ? 'border-purple-400 bg-purple-950/40 ring-2 ring-purple-500 shadow-lg shadow-purple-500/20'
                  : isSelected
                    ? `${t.border} ${t.bg} shadow-md`
                    : 'border-slate-800 bg-slate-800/40 hover:border-slate-700 hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${t.bg} ${t.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">Tier {t.id + 1}</span>
              </div>
              <h4 className="font-bold text-white text-base mb-1">{t.name}</h4>
              <p className="text-xs font-medium text-slate-400 mb-3">{t.badge}</p>
              <div className="text-xs font-mono text-slate-300 bg-slate-900/90 px-2.5 py-1.5 rounded-md border border-slate-800">
                {t.tech}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Tier Details */}
      <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/80">
        <div className="flex items-center gap-2 mb-3">
          <span className={`font-bold text-sm ${tiers[activeTier].color}`}>{tiers[activeTier].name} Deep-Dive</span>
          <span className="text-xs text-slate-400">| Key Responsibilities & CBSE Exam Notes</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ul className="space-y-2 text-xs text-slate-300">
            {tiers[activeTier].responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-purple-500/30 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-amber-300 mb-1">Board Exam Tip by Sukanta Hui:</div>
              <p className="text-xs text-slate-300">{tiers[activeTier].examTip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive UI Wireframe vs ER Schema Workbench
const DesignWorkbench = () => {
  const [activeTab, setActiveTab] = useState('wireframe'); // 'wireframe' | 'er_schema' | 'hld_lld'
  const [wireframeDevice, setWireframeDevice] = useState('desktop'); // 'desktop' | 'mobile'

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <Layout className="w-3.5 h-3.5" /> Low-Level Design (LLD) Workbench
          </span>
          <h3 className="text-xl font-bold text-white mt-2">Design Phase Blueprint Inspector</h3>
          <p className="text-sm text-slate-400">Inspect UI/UX wireframes, normalized ER database schemas, and HLD vs LLD architectural boundaries.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('wireframe')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'wireframe'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> UI Wireframe
          </button>
          <button
            onClick={() => setActiveTab('er_schema')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'er_schema'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Table className="w-3.5 h-3.5" /> ER Database Schema
          </button>
          <button
            onClick={() => setActiveTab('hld_lld')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'hld_lld'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" /> HLD vs LLD
          </button>
        </div>
      </div>

      {/* Tab 1: UI Wireframe View */}
      {activeTab === 'wireframe' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Schematic layout for <span className="text-sky-300 font-semibold">Online Billing & Invoicing Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWireframeDevice('desktop')}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 border ${
                  wireframeDevice === 'desktop'
                    ? 'border-sky-500 bg-sky-500/20 text-sky-300'
                    : 'border-slate-700 bg-slate-800 text-slate-400'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop (1200px)
              </button>
              <button
                onClick={() => setWireframeDevice('mobile')}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 border ${
                  wireframeDevice === 'mobile'
                    ? 'border-sky-500 bg-sky-500/20 text-sky-300'
                    : 'border-slate-700 bg-slate-800 text-slate-400'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile (375px)
              </button>
            </div>
          </div>

          {/* Wireframe Canvas */}
          <div className="bg-slate-950 p-6 rounded-xl border border-dashed border-slate-700 flex justify-center">
            {wireframeDevice === 'desktop' ? (
              <div className="w-full max-w-4xl border border-slate-600 rounded-lg bg-slate-900 p-4 font-mono text-xs">
                {/* Header Wireframe */}
                <div className="border border-dashed border-sky-400/60 p-3 rounded mb-3 flex items-center justify-between bg-sky-950/20">
                  <div className="flex items-center gap-2 font-bold text-sky-300">
                    <span className="px-2 py-0.5 bg-sky-500/20 border border-sky-500/40 rounded">[LOGO: QuickBill]</span>
                    <span>Barrackpore Electric Supply Billing Portal</span>
                  </div>
                  <div className="flex gap-2 text-slate-400 text-xs">
                    <span className="border border-slate-700 px-2 py-0.5 rounded">[Search Consumer ID]</span>
                    <span className="border border-slate-700 px-2 py-0.5 rounded">[User: Sukanta Hui]</span>
                  </div>
                </div>

                {/* Main Body: Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Left Column: Consumer Card */}
                  <div className="col-span-1 border border-dashed border-slate-600 p-3 rounded bg-slate-800/40 space-y-2">
                    <div className="font-bold text-slate-300 border-b border-slate-700 pb-1">[Consumer Profile Card]</div>
                    <div className="text-slate-400 text-[11px] space-y-1">
                      <div>Name: Sukanta Hui</div>
                      <div>Consumer ID: WB-KOL-8921</div>
                      <div>Meter No: EM-77291</div>
                      <div>Tariff: Domestic (Category A)</div>
                    </div>
                    <div className="pt-2">
                      <div className="border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 p-2 rounded text-center font-bold">
                        Payable: ₹1,480.00
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Invoice Details & Action */}
                  <div className="col-span-2 border border-dashed border-slate-600 p-3 rounded bg-slate-800/40 space-y-2">
                    <div className="font-bold text-slate-300 border-b border-slate-700 pb-1">[Current Bill Breakdown & Action]</div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        Units Consumed: <span className="text-white font-bold">240 kWh</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        Due Date: <span className="text-amber-400 font-bold">15-Nov-2026</span>
                      </div>
                    </div>
                    <div className="border border-dashed border-purple-500/40 p-2.5 rounded bg-purple-950/20 text-center">
                      <div className="text-purple-300 font-bold text-xs mb-1">[Payment Options Wireframe]</div>
                      <div className="flex justify-center gap-2 text-[10px]">
                        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">UPI / QR Code</span>
                        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Debit / Credit Card</span>
                        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Net Banking</span>
                      </div>
                    </div>
                    <div className="pt-1 flex justify-end gap-2">
                      <button className="px-3 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">[Download PDF Bill]</button>
                      <button className="px-3 py-1 bg-sky-600 text-white rounded font-bold">[Proceed to Pay Now]</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Mobile Wireframe */
              <div className="w-80 border-2 border-slate-600 rounded-2xl bg-slate-900 p-3 font-mono text-xs shadow-2xl">
                <div className="w-20 h-1 bg-slate-700 rounded-full mx-auto mb-3"></div>
                <div className="border border-dashed border-sky-400/60 p-2 rounded mb-2 text-center bg-sky-950/20">
                  <div className="font-bold text-sky-300 text-[11px]">[QuickBill Mobile]</div>
                  <div className="text-[10px] text-slate-400">ID: WB-KOL-8921</div>
                </div>
                <div className="border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 p-2.5 rounded text-center font-bold mb-2">
                  <div className="text-[10px] text-emerald-300/70 uppercase">Total Due Amount</div>
                  <div className="text-base font-extrabold">₹1,480.00</div>
                  <div className="text-[10px] text-amber-400">Due: 15-Nov-2026</div>
                </div>
                <div className="border border-dashed border-slate-600 p-2 rounded bg-slate-800/40 space-y-1 text-[10px] text-slate-400 mb-2">
                  <div>Name: Sukanta Hui</div>
                  <div>Units: 240 kWh</div>
                  <div>Meter: EM-77291</div>
                </div>
                <button className="w-full py-2 bg-sky-600 text-white rounded font-bold text-xs mb-1">[Pay ₹1,480 via UPI]</button>
                <button className="w-full py-1.5 bg-slate-800 text-slate-400 rounded text-[10px] border border-slate-700">[View Detailed PDF]</button>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 text-center">
            * Wireframes represent layout hierarchy, button placements, and visual flow without cosmetic distractions.
          </p>
        </div>
      )}

      {/* Tab 2: ER Database Schema */}
      {activeTab === 'er_schema' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            Relational Entity-Relationship (ER) Schema for <span className="text-purple-300 font-semibold">Online Billing & Invoicing System</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Table 1: CONSUMERS */}
            <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/40 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-sky-500/40 mb-3">
                <span className="font-bold text-sky-300 flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5" /> CONSUMERS
                </span>
                <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">Parent Entity</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li className="flex items-center justify-between text-amber-300 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">
                  <span>ConsumerID</span>
                  <span className="text-[10px] font-mono">[PK] INT AUTO_INC</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>FullName</span>
                  <span className="text-[10px] text-slate-500">VARCHAR(100)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>MeterNumber</span>
                  <span className="text-[10px] text-sky-400 font-mono">[UNIQUE] VARCHAR(30)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>MobileNumber</span>
                  <span className="text-[10px] text-slate-500">VARCHAR(15)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>City</span>
                  <span className="text-[10px] text-slate-500">VARCHAR(50)</span>
                </li>
              </ul>
            </div>

            {/* Table 2: BILLS / INVOICES */}
            <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/40 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-purple-500/40 mb-3">
                <span className="font-bold text-purple-300 flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5" /> BILLS
                </span>
                <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">Child Entity</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li className="flex items-center justify-between text-amber-300 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">
                  <span>BillID</span>
                  <span className="text-[10px] font-mono">[PK] INT AUTO_INC</span>
                </li>
                <li className="flex items-center justify-between text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded">
                  <span>ConsumerID</span>
                  <span className="text-[10px] font-mono">[FK -&gt; CONSUMERS]</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>BillingMonth</span>
                  <span className="text-[10px] text-slate-500">VARCHAR(20)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>UnitsConsumed</span>
                  <span className="text-[10px] text-slate-500">DECIMAL(8,2)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>TotalAmount</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">DECIMAL(10,2)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>DueDate</span>
                  <span className="text-[10px] text-slate-500">DATE</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Status</span>
                  <span className="text-[10px] text-slate-500">ENUM('Paid','Unpaid')</span>
                </li>
              </ul>
            </div>

            {/* Table 3: TRANSACTIONS */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-500/40 mb-3">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5" /> TRANSACTIONS
                </span>
                <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">Child Entity</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li className="flex items-center justify-between text-amber-300 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">
                  <span>TxnID</span>
                  <span className="text-[10px] font-mono">[PK] INT AUTO_INC</span>
                </li>
                <li className="flex items-center justify-between text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded">
                  <span>BillID</span>
                  <span className="text-[10px] font-mono">[FK -&gt; BILLS]</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>PaymentGateway</span>
                  <span className="text-[10px] text-slate-500">VARCHAR(50)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>AmountPaid</span>
                  <span className="text-[10px] text-emerald-400">DECIMAL(10,2)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>TxnStatus</span>
                  <span className="text-[10px] text-slate-500">VARCHAR(20)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>TxnTimestamp</span>
                  <span className="text-[10px] text-slate-500">DATETIME</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <span className="font-bold text-purple-300">Referential Integrity Rule:</span> `BILLS.ConsumerID` references `CONSUMERS.ConsumerID` with `ON DELETE RESTRICT`, preventing accidental consumer deletion if unpaid bills exist.
          </div>
        </div>
      )}

      {/* Tab 3: HLD vs LLD Comparison */}
      {activeTab === 'hld_lld' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-950 border border-sky-500/40">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-5 h-5 text-sky-400" />
                <h4 className="font-bold text-white text-base">High-Level Design (HLD)</h4>
              </div>
              <p className="text-xs text-slate-400 mb-4">Macro-architectural blueprint created by Lead Enterprise Architects.</p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Defines 3-Tier Architecture and subsystem boundaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Selects technology platforms (e.g., React, Java, MySQL)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>High-level DFDs (Level 0 Context Diagram)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Security & Authentication strategy (OAuth, SSL/TLS)</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-purple-500/40">
              <div className="flex items-center gap-2 mb-3">
                <FileCode className="w-5 h-5 text-purple-400" />
                <h4 className="font-bold text-white text-base">Low-Level Design (LLD)</h4>
              </div>
              <p className="text-xs text-slate-400 mb-4">Micro-technical specifications created for developers and database engineers.</p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>Exact SQL table schemas, data types, and primary/foreign keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>UI/UX wireframes, button coordinates, and color guides</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>Class diagrams, method signatures, and parameter types</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>Algorithmic logic flowcharts & form validation regex rules</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Topic2 Component
export default function Topic2() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header section */}
        <div className="border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
            <span>Segment 2: Operating Web-Based Applications</span>
            <span>/</span>
            <span>Module: Four Stages of Web App Dev</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stage 2: Design Phase
          </h1>
          <p className="mt-3 text-base text-slate-400 max-w-3xl">
            Architecting the blueprints of web applications: 3-Tier client-server architecture, 
            UI/UX wireframing, normalized Entity-Relationship (ER) database schemas, and navigation flowcharts.
          </p>
        </div>

        {/* Interactive 3-Tier Architecture Visualizer */}
        <ThreeTierVisualizer />

        {/* Interactive Design Workbench (Wireframes + ER Schemas + HLD/LLD) */}
        <DesignWorkbench />

        {/* Core CBSE Theoretical Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
              <Layout className="w-5 h-5" />
              <h4>Why Wireframes are Indispensable</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Wireframing strips away colors, fonts, and graphics to focus purely on <strong>information architecture, visual hierarchy, and user interaction flow</strong>. 
              Reviewing wireframes with clients prevents expensive cosmetic and structural refactoring during the later coding phase.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
              <span className="text-sky-300 font-semibold">Key Elements:</span> Header, navigation bar, hero banner, data tables, call-to-action buttons, modal dialogs, and responsive break-points.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
              <Database className="w-5 h-5" />
              <h4>Database Schema & Normalization</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              During the design phase, database architects convert business objects into normalized relational tables (1NF, 2NF, 3NF). 
              Primary keys ensure unique identification, while Foreign keys establish referential integrity between parent and child tables.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
              <span className="text-emerald-300 font-semibold">Key Deliverable:</span> SQL DDL scripts, ER diagrams, foreign key relationship maps, and index definitions.
            </div>
          </div>
        </div>

        {/* Interactive MCQ Practice Section */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <CheckSquare className="w-3.5 h-3.5" /> Self-Assessment Challenge
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">Topic 2 Mastery Quiz (25 MCQs)</h3>
              <p className="text-sm text-slate-400">Test your mastery of Web App Design Phase, 3-Tier Architecture, Wireframing, and ER Schemas.</p>
            </div>

            {showResults && (
              <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Your Score</div>
                  <div className="text-xl font-extrabold text-amber-400">
                    {calculateScore()} / {questions.length}
                  </div>
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all"
                >
                  Retake
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isAnswered = userAnswer !== undefined;
              const isCorrect = isAnswered && userAnswer === q.correctAnswer;

              return (
                <div 
                  key={q.id}
                  className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold text-slate-300 shrink-0">
                      {qIndex + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-200">
                      {q.question}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 ml-9">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = userAnswer === optIndex;
                      let btnStyle = "border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800/80";

                      if (showResults) {
                        if (optIndex === q.correctAnswer) {
                          btnStyle = "border-emerald-500/80 bg-emerald-950/50 text-emerald-200 font-semibold";
                        } else if (isSelected) {
                          btnStyle = "border-rose-500/80 bg-rose-950/50 text-rose-200 font-semibold";
                        }
                      } else if (isSelected) {
                        btnStyle = "border-purple-500 bg-purple-950/50 text-purple-200 font-semibold ring-1 ring-purple-500";
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleOptionClick(q.id, optIndex)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showResults && optIndex === q.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                          )}
                          {showResults && isSelected && optIndex !== q.correctAnswer && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-4 ml-9 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="text-emerald-400 font-semibold">Explanation:</div>
                      <p className="text-slate-300">{q.explanation}</p>
                      <p className="text-slate-400 italic font-bengali">{q.explanationBengali}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            {!showResults ? (
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(selectedAnswers).length === 0}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  Object.keys(selectedAnswers).length === 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/25'
                }`}
              >
                Submit & Check Answers ({Object.keys(selectedAnswers).length}/{questions.length})
              </button>
            ) : (
              <button
                onClick={resetQuiz}
                className="px-8 py-3 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white transition-all"
              >
                Reset & Try Again
              </button>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <FAQTemplate 
          title="Frequently Asked Questions: Stage 2 Design Phase"
          faqs={[
            {
              question: "What is the primary difference between High-Level Design (HLD) and Low-Level Design (LLD)?",
              answer: "High-Level Design (HLD) defines the overall macro architecture, 3-tier client-server structure, and tech stack. Low-Level Design (LLD) specifies exact table schemas, data types, primary/foreign keys, UI wireframes, and class method signatures."
            },
            {
              question: "Why should developers never skip the Design Phase?",
              answer: "Skipping design leads to architectural chaos, inconsistent UI layouts, database redundancy, severe security vulnerabilities, and exorbitant refactoring costs during later stages."
            },
            {
              question: "How does 3-Tier architecture protect database credentials from client users?",
              answer: "The client browser only interacts with the Presentation Tier (Tier 1). The Application Tier (Tier 2) securely holds database connection strings and credentials on the server, ensuring client browsers never have direct access to the MySQL database."
            }
          ]}
        />

        {/* Printable Note Section */}
        <PlainTextPrint 
          title="CBSE Class 12 IT 802: Topic 2 - Stage 2: Design Phase Notes"
          content={noteText}
        />

        {/* Teacher Sukanta Hui note card */}
        <Teacher 
          topicName="Stage 2: Design Phase Blueprints & Architecture"
          unitName="Four Stages of Web Application Development"
        />

      </div>
    </div>
  );
}
