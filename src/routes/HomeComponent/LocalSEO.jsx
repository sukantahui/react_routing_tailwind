// ============================================================================
// LocalSEO.jsx - Smart Location Reach & Course Batch Engine
// ============================================================================
// Features:
// 1. Smart PIN / Location Reach Finder with real-time transit & batch guidance
// 2. Interactive Transit Hub pills (Barrackpore, Sodepore, Titagarh, Barasat, etc.)
// 3. Mode Toggle: In-Person Campus Lab vs. Live Online 1-on-1 Interactive Lab
// 4. Batch Availability & Direct Location-Aware WhatsApp Enquiry
// 5. Preserves SEO keywords for Local Search (700122, 700121, Coding, Tally GST)
// ============================================================================

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Comprehensive transit & reach database for local areas
const LOCATION_DATABASE = [
  {
    name: "Barrackpore (Nonachandanpukur / Station)",
    pin: "700122",
    zone: "Local Campus Zone",
    commuteTime: "15 mins walk / 5 mins E-Rickshaw from Station",
    transitMode: "Walk (15 mins) / E-Rickshaw (5 mins) / Auto",
    mode: "In-Person Classroom Lab",
    batchType: "Daily & Weekend Batches",
    status: "Base Campus Location",
    popularCourses: ["Python & DSA", "TallyPrime GST", "Java & OOPs", "React Web Dev"]
  },
  {
    name: "Titagarh / Kolkata",
    pin: "700121",
    zone: "Adjacent Station Hub",
    commuteTime: "~4 mins via Sealdah Main Line Local Train",
    transitMode: "Local Train / BT Road Auto",
    mode: "In-Person + Hybrid Lab",
    batchType: "Morning & Evening Batches",
    status: "Direct 1-Stop Transit",
    popularCourses: ["TallyPrime ERP", "Full Stack Web Dev", "ICSE/ISC Coding"]
  },
  {
    name: "Barrackpore Sadar / Cantonment",
    pin: "700120",
    zone: "Local Cantonment Hub",
    commuteTime: "~5-8 mins via SN Banerjee Road Auto",
    transitMode: "Auto / Bike / E-Rickshaw",
    mode: "In-Person Lab",
    batchType: "Flexible Timings",
    status: "Direct Neighborhood Reach",
    popularCourses: ["Python Programming", "Corporate GST & TDS", "Java"]
  },
  {
    name: "Titagarh Town",
    pin: "700119",
    zone: "Adjacent Hub",
    commuteTime: "~6 mins via Local Train or Bus",
    transitMode: "Train / 78 Series Bus",
    mode: "In-Person Classroom Lab",
    batchType: "College & School Friendly Hours",
    status: "Direct Connectivity",
    popularCourses: ["C/C++ & DSA", "TallyPrime GST", "Web Development"]
  },
  {
    name: "Sodepore",
    pin: "700110",
    zone: "South Transit Corridor",
    commuteTime: "~10 mins via Local Train (3 stops) / BT Road Bus",
    transitMode: "Sealdah-Ranaghat Local / BT Road Buses",
    mode: "In-Person + Weekend Intensive",
    batchType: "Weekend & Late Evening Batches",
    status: "High Frequency Train Reach",
    popularCourses: ["React.js & Node.js", "Java & DSA", "Advanced GST Compliance"]
  },
  {
    name: "Ichapore",
    pin: "743144",
    zone: "North Transit Corridor",
    commuteTime: "~6 mins via Local Train (2 stops) / Ghoshpara Road",
    transitMode: "Up Main Line Local Train / Auto",
    mode: "In-Person Classroom Lab",
    batchType: "Daily & Evening Batches",
    status: "Direct 2-Stop Transit",
    popularCourses: ["Python & Data Structures", "TallyPrime & Income Tax", "ICSE Computer"]
  },
  {
    name: "Barasat",
    pin: "700124",
    zone: "East Radial Corridor",
    commuteTime: "~18 mins via Barasat-Barrackpore Road (Bus 81 / Auto)",
    transitMode: "Direct Bus 81 / Barrackpore-Barasat Auto",
    mode: "In-Person + Weekend Masterclass",
    batchType: "Special Weekend Batches",
    status: "Direct Road Bus Route",
    popularCourses: ["Full Stack Development", "Tally & GST Bookkeeping", "DSA"]
  },
  {
    name: "Sreerampore (Hooghly)",
    pin: "712203",
    zone: "Cross-River Riverway Hub",
    commuteTime: "~15 mins via Sreerampore-Barrackpore Ferry Service",
    transitMode: "Direct Ferry across Hooghly River + E-Rickshaw",
    mode: "In-Person + Hybrid Lab",
    batchType: "Weekend & Daytime Batches",
    status: "Scenic 15-min Ferry Transit",
    popularCourses: ["Corporate Accounting", "Python & AI", "Java Backend"]
  },
  {
    name: "Shyamnagar",
    pin: "743127",
    zone: "North Corridor",
    commuteTime: "~8 mins via Local Train (3 stops)",
    transitMode: "Sealdah-Naihati/Ranaghat Main Line",
    mode: "In-Person Classroom Lab",
    batchType: "Morning & Evening Batches",
    status: "Frequent Train Transit",
    popularCourses: ["Tally & GST E-Filing", "Python Programming", "Web Design"]
  },
  {
    name: "Naihati",
    pin: "743165",
    zone: "North Junction Hub",
    commuteTime: "~14 mins via Main Line Local Train",
    transitMode: "Direct Fast Local Train",
    mode: "In-Person + Weekend Hybrid",
    batchType: "Weekend & Special Batches",
    status: "Fast Train Reach",
    popularCourses: ["Java & DSA Interview Prep", "Tally ERP & TDS", "Full Stack"]
  },
  {
    name: "Agarpara",
    pin: "700109",
    zone: "South Corridor",
    commuteTime: "~13 mins via Sealdah Local Train",
    transitMode: "Sealdah Main Line Local Train",
    mode: "In-Person Classroom Lab",
    batchType: "Evening & Weekend Batches",
    status: "Direct Train Transit",
    popularCourses: ["Python & DSA", "React.js", "Financial Accounting"]
  },
  {
    name: "Belgharia",
    pin: "700056",
    zone: "Kolkata Metro Gateway",
    commuteTime: "~16 mins via Sealdah Local Train / BT Road",
    transitMode: "Sealdah Local Train / AC Buses",
    mode: "In-Person + Online Doubt Support",
    batchType: "Weekend & Evening Batches",
    status: "Direct Highway & Train Reach",
    popularCourses: ["Full Stack Web Dev", "TallyPrime & GST", "Java OOPs"]
  }
];

const SUBJECT_KEYWORDS = [
  { label: "Python Programming", icon: "bi-code-slash", color: "text-emerald-400", desc: "Core, OOPs, Automation & Data Science" },
  { label: "Java & DSA Mastery", icon: "bi-terminal-fill", color: "text-cyan-400", desc: "Data Structures, Algorithms & Placement Prep" },
  { label: "Full Stack Web Dev", icon: "bi-globe", color: "text-indigo-400", desc: "React.js, Node.js, Express & MongoDB" },
  { label: "TallyPrime ERP & GST", icon: "bi-calculator-fill", color: "text-amber-400", desc: "Live Haal Khata, ITC Reconciliations & E-Way Bills" },
  { label: "ICSE / ISC / CBSE Coding", icon: "bi-mortarboard-fill", color: "text-purple-400", desc: "Class 9-12 Computer Applications & Java" },
  { label: "Income Tax & TDS E-Filing", icon: "bi-receipt-cutoff", color: "text-pink-400", desc: "ITR 1-4, AIS/TIS Reconciliations & Challan 280" }
];

export default function LocalSEO() {
  // Mode toggle: 'offline' (Campus Lab) vs 'online' (Virtual Class)
  const [learningMode, setLearningMode] = useState("offline");
  
  // Search query for PIN / locality
  const [searchQuery, setSearchQuery] = useState("");
  
  // Selected location object from DB
  const [selectedLocation, setSelectedLocation] = useState(LOCATION_DATABASE[0]);

  // Selected subject for customized enquiry
  const [selectedSubject, setSelectedSubject] = useState("Python & DSA");

  // Search filter results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return LOCATION_DATABASE;
    const q = searchQuery.toLowerCase().trim();
    return LOCATION_DATABASE.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.pin.includes(q) ||
        loc.zone.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Dynamic WhatsApp Link generator
  const dynamicWhatsAppUrl = useMemo(() => {
    const locName = selectedLocation?.name || "Barrackpore / Kolkata";
    const pin = selectedLocation?.pin || "700122";
    const modeText = learningMode === "offline" ? "In-Person Classroom Lab at Barrackpore" : "Live 1-on-1 Online Lab";
    const text = `Hi Coder & AccoTax! 👋\n\nI am located at *${locName} (PIN: ${pin})*.\nI am interested in joining your *${selectedSubject}* batch (*${modeText}*).\n\nPlease share upcoming batch timings, syllabus, and admission details.`;
    return `https://wa.me/919432456083?text=${encodeURIComponent(text)}`;
  }, [selectedLocation, selectedSubject, learningMode]);

  return (
    <section
      id="local-area"
      className="relative py-16 sm:py-20 bg-[#030712] text-slate-100 overflow-hidden border-t border-slate-800/80"
      aria-label="Best Coding and Programming Institute near Barrackpore, Titagarh, Sodepore, Barasat, 700121, 700122"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-sky-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <i className="bi bi-geo-alt-fill text-rose-400"></i>
            <span>Smart Location &amp; Campus Reach System • North 24 Parganas &amp; Kolkata</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight text-center"
        >
          Check Training Availability &amp; Commute in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
            Your Area
          </span>
        </motion.h2>

        <p className="text-center text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-2">
          Discover direct local train, bus, and ferry transit times to our Barrackpore campus, or join live interactive 1-on-1 virtual labs.
        </p>

        {/* Learning Mode Switcher (In-Person Campus Lab vs. Online Virtual Lab) */}
        <div className="flex justify-center mt-6">
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-lg">
            <button
              type="button"
              onClick={() => setLearningMode("offline")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                learningMode === "offline"
                  ? "bg-sky-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <i className="bi bi-buildings-fill text-amber-300"></i>
              <span>In-Person Campus Lab (Barrackpore)</span>
            </button>
            <button
              type="button"
              onClick={() => setLearningMode("online")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                learningMode === "online"
                  ? "bg-sky-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <i className="bi bi-laptop-fill text-purple-300"></i>
              <span>Live 1-on-1 Online Lab (Pan-India)</span>
            </button>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* Smart Reach Diagnostic Hub Grid                                      */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8 items-start">
          
          {/* Left Column (5 cols): Interactive Hub Selector & Real-Time Filter */}
          <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl space-y-3.5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between mb-2">
                <span>Select or Search Your Area / PIN</span>
                <span className="text-[10px] text-sky-400 font-mono">12 Direct Transit Zones</span>
              </label>
              
              {/* Search Bar */}
              <div className="relative">
                <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type PIN (e.g. 700121, 700110) or Area..."
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-8 pr-8 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition shadow-inner"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Scrollable Location List */}
            <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
              {searchResults.length > 0 ? (
                searchResults.map((loc) => {
                  const isSelected = selectedLocation.pin === loc.pin && selectedLocation.name === loc.name;
                  return (
                    <div
                      key={`${loc.name}-${loc.pin}`}
                      onClick={() => setSelectedLocation(loc)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                        isSelected
                          ? "bg-sky-950/80 border-sky-500 text-white shadow-md ring-1 ring-sky-400/50"
                          : "bg-slate-950/50 hover:bg-slate-900 border-slate-800/80 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <i className={`bi bi-geo-alt-fill text-sm ${isSelected ? "text-sky-400" : "text-slate-500"}`}></i>
                        <div>
                          <div className="font-semibold">{loc.name}</div>
                          <div className="text-[10px] text-slate-500">{loc.commuteTime}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-[11px] font-bold text-sky-400 block">
                          {loc.pin}
                        </span>
                        <span className="text-[9px] text-slate-400 uppercase font-semibold">
                          {loc.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-xs text-slate-400 bg-slate-950/50 rounded-xl border border-slate-800">
                  <p className="font-semibold text-slate-300">Custom PIN entered: {searchQuery}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Live 1-on-1 Online Lab and weekend fast-track batches are available for your area!
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>📍 Campus: Nonachandanpukur, Barrackpore</span>
              <span className="text-emerald-400 font-semibold">● Live Batches Open</span>
            </div>
          </div>

          {/* Right Column (7 cols): Smart Reach Card & Personalized Commute Card */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-4">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500" />

            {/* Smart Location Status Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <i className="bi bi-check-circle-fill mr-1"></i> Verified Reach
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    PIN: {selectedLocation.pin}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                  {selectedLocation.name}
                </h3>
                <p className="text-xs text-sky-400/90 font-medium">
                  {selectedLocation.zone} • {selectedLocation.status}
                </p>
              </div>

              {/* Commute Time Badge */}
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Transit to Campus</div>
                <div className="text-xs sm:text-sm font-extrabold text-amber-300">
                  {selectedLocation.commuteTime}
                </div>
              </div>
            </div>

            {/* Commute Details & Batch Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5 font-semibold">
                  <i className="bi bi-train-front text-sky-400"></i>
                  <span>Transit Route &amp; Mode</span>
                </div>
                <div className="text-slate-200 font-medium leading-relaxed">
                  {selectedLocation.transitMode}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5 font-semibold">
                  <i className="bi bi-clock-history text-purple-400"></i>
                  <span>Available Batches</span>
                </div>
                <div className="text-slate-200 font-medium leading-relaxed">
                  {selectedLocation.batchType} (Morning, Evening &amp; Weekend)
                </div>
              </div>
            </div>

            {/* Subject Selector for Direct Action */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Choose Your Target Subject to Check Batch Timing:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUBJECT_KEYWORDS.map((sub) => (
                  <button
                    key={sub.label}
                    type="button"
                    onClick={() => setSelectedSubject(sub.label)}
                    className={`p-2 rounded-lg border text-left text-xs transition cursor-pointer flex items-center gap-1.5 ${
                      selectedSubject === sub.label
                        ? "bg-sky-950 border-sky-500 text-white font-bold ring-1 ring-sky-400/50"
                        : "bg-slate-950/60 hover:bg-slate-950 text-slate-300 border-slate-800"
                    }`}
                  >
                    <i className={`bi ${sub.icon} ${sub.color} text-sm flex-shrink-0`}></i>
                    <span className="truncate">{sub.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Action Strip: Direct WhatsApp Enquiry & Phone Call */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                <span>📍 Campus: Nonachandanpukur, Barrackpore</span>
                <span className="mx-2">•</span>
                <span className="text-slate-300 font-medium">📞 +91-9432456083</span>
              </div>

              <a
                href={dynamicWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all hover:scale-105"
              >
                <i className="bi bi-whatsapp text-base"></i>
                <span>Enquire for {selectedLocation.name.split(" ")[0]} Batch</span>
              </a>
            </div>

          </div>

        </div>

        {/* ==================================================================== */}
        {/* Core Subject Strengths & SEO Keywords Cloud                          */}
        {/* ==================================================================== */}
        <div className="mt-8 pt-6 border-t border-slate-800/60">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Core Learning Tracks at Coder &amp; AccoTax Institute (Barrackpore • Pin 700122 / 700121)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUBJECT_KEYWORDS.map((item) => (
              <div
                key={item.label}
                className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-start gap-3 hover:border-slate-700 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className={`bi ${item.icon} ${item.color} text-base`}></i>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.label}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500 mt-6">
            🏅 ISO 9001:2015 Certified &nbsp;|&nbsp; 28+ Years Legacy &nbsp;|&nbsp; 4.9 ★ Google Rating (170+ Reviews) &nbsp;|&nbsp; Serving Pin 700122, 700121, Sodepore, Titagarh, Barasat, Ichapore &amp; Greater Kolkata.
          </p>
        </div>

      </div>
    </section>
  );
}
