import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  BarChart3,
  PieChart,
  Activity,
  Cake,
  Filter,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  X,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function BijoyaDemographics({
  guests = [],
  checkIsFemale,
  selectedAgeGroup,
  onSelectAgeGroup,
  activeFilter,
  onSelectFilter,
  sortBy,
  sortOrder,
  onSetSort,
  ManLogo,
  WomanLogo,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [viewTab, setViewTab] = useState("cards"); // 'cards' | 'matrix'

  // Comprehensive Demographics & Age/Sex Analytics Computation
  const stats = useMemo(() => {
    const total = guests.length;
    let males = 0;
    let females = 0;
    const validAges = [];

    const ageBuckets = [
      {
        id: "under18",
        label: "< 18 yrs",
        title: "Kids & Teens",
        range: "Under 18 yrs",
        min: 0,
        max: 17,
        icon: "🎈",
        accent: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300",
        barColor: "bg-amber-400",
      },
      {
        id: "18-25",
        label: "18–25 yrs",
        title: "Young Adults",
        range: "18 – 25 yrs",
        min: 18,
        max: 25,
        icon: "🎓",
        accent: "from-sky-500/20 to-indigo-500/20 border-sky-500/30 text-sky-300",
        barColor: "bg-sky-400",
      },
      {
        id: "26-40",
        label: "26–40 yrs",
        title: "Adults",
        range: "26 – 40 yrs",
        min: 26,
        max: 40,
        icon: "💼",
        accent: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300",
        barColor: "bg-purple-400",
      },
      {
        id: "41-60",
        label: "41–60 yrs",
        title: "Middle Age",
        range: "41 – 60 yrs",
        min: 41,
        max: 60,
        icon: "👔",
        accent: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300",
        barColor: "bg-emerald-400",
      },
      {
        id: "60plus",
        label: "60+ yrs",
        title: "Seniors",
        range: "61+ yrs",
        min: 61,
        max: 150,
        icon: "👵",
        accent: "from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-300",
        barColor: "bg-rose-400",
      },
      {
        id: "unspecified",
        label: "Unspecified",
        title: "Age Not Specified",
        range: "No age entered",
        min: null,
        max: null,
        icon: "❓",
        accent: "from-slate-700/30 to-slate-800/30 border-slate-700 text-slate-400",
        barColor: "bg-slate-500",
      },
    ];

    const groupData = ageBuckets.map((bucket) => ({
      ...bucket,
      total: 0,
      male: 0,
      female: 0,
      pct: 0,
      malePctOfGroup: 0,
      femalePctOfGroup: 0,
    }));

    guests.forEach((g) => {
      const isFem = checkIsFemale ? checkIsFemale(g) : false;
      if (isFem) {
        females++;
      } else {
        males++;
      }

      const rawAge =
        g.age !== undefined && g.age !== null && g.age !== "" && !isNaN(Number(g.age))
          ? Number(g.age)
          : null;

      if (rawAge !== null && rawAge > 0) {
        validAges.push(rawAge);
        let matched = false;
        for (let i = 0; i < groupData.length - 1; i++) {
          if (rawAge >= groupData[i].min && rawAge <= groupData[i].max) {
            groupData[i].total++;
            if (isFem) groupData[i].female++;
            else groupData[i].male++;
            matched = true;
            break;
          }
        }
        if (!matched) {
          // If 60 or above fallback
          const seniors = groupData.find((b) => b.id === "60plus");
          if (seniors) {
            seniors.total++;
            if (isFem) seniors.female++;
            else seniors.male++;
          }
        }
      } else {
        const unspec = groupData[groupData.length - 1];
        unspec.total++;
        if (isFem) unspec.female++;
        else unspec.male++;
      }
    });

    groupData.forEach((g) => {
      g.pct = total > 0 ? Math.round((g.total / total) * 1000) / 10 : 0;
      g.malePctOfGroup = g.total > 0 ? Math.round((g.male / g.total) * 100) : 0;
      g.femalePctOfGroup = g.total > 0 ? Math.round((g.female / g.total) * 100) : 0;
    });

    const avgAge =
      validAges.length > 0
        ? (validAges.reduce((sum, a) => sum + a, 0) / validAges.length).toFixed(1)
        : null;
    const minAge = validAges.length > 0 ? Math.min(...validAges) : null;
    const maxAge = validAges.length > 0 ? Math.max(...validAges) : null;

    const malePct = total > 0 ? Math.round((males / total) * 1000) / 10 : 0;
    const femalePct = total > 0 ? Math.round((females / total) * 1000) / 10 : 0;

    return {
      total,
      males,
      females,
      malePct,
      femalePct,
      groups: groupData,
      validAgesCount: validAges.length,
      unspecifiedCount: total - validAges.length,
      ageRecordRate: total > 0 ? Math.round((validAges.length / total) * 100) : 0,
      avgAge,
      minAge,
      maxAge,
    };
  }, [guests, checkIsFemale]);

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-300">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-inner">
            <BarChart3 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Attendee Demographics: Age &amp; Sex Analytics
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-semibold border border-purple-500/30">
                Live Insights
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Demographic breakdown across {stats.total} attendees ({stats.males} Male, {stats.females} Female)
            </p>
          </div>
        </div>

        {/* View Toggle & Collapse */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isOpen && (
            <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewTab("cards")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                  viewTab === "cards"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Visual</span>
              </button>
              <button
                type="button"
                onClick={() => setViewTab("matrix")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                  viewTab === "matrix"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Cross-Tab Matrix</span>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition cursor-pointer"
            title={isOpen ? "Collapse Analytics Panel" : "Expand Analytics Panel"}
          >
            <span>{isOpen ? "Hide" : "Show Analytics"}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Content Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="p-4 sm:p-6 space-y-6 overflow-hidden"
          >
            {/* Top Row: Sex/Gender Summary & Age Key Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
              {/* Sex / Gender Distribution (7 cols) */}
              <div className="lg:col-span-7 rounded-2xl bg-slate-950/60 border border-slate-800/90 p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Gender / Sex Ratio
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onSetSort && onSetSort("gender", sortOrder === "asc" ? "desc" : "asc")}
                      className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition cursor-pointer flex items-center gap-1 ${
                        sortBy === "gender"
                          ? "bg-purple-600/25 border-purple-500/40 text-purple-200"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                      title="Sort the guest directory by Male / Female"
                    >
                      <ArrowUpDown className="w-3 h-3 text-purple-400" />
                      <span>Sort by Sex</span>
                    </button>
                  </div>
                </div>

                {/* Male vs Female Cards */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Male Card */}
                  <div
                    onClick={() => onSelectFilter && onSelectFilter(activeFilter === "male" ? "all" : "male")}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between group ${
                      activeFilter === "male"
                        ? "bg-sky-500/20 border-sky-500/50 shadow-md shadow-sky-500/10 ring-1 ring-sky-500/40"
                        : "bg-slate-900/70 border-slate-800 hover:border-sky-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sky-400 font-bold text-xs">
                        {ManLogo ? <ManLogo className="w-4 h-4 text-sky-400" /> : <span>👨</span>}
                        <span>Male</span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 font-semibold border border-sky-500/30">
                        {stats.malePct}%
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-2xl sm:text-3xl font-black text-white">{stats.males}</span>
                      <span className="text-[10px] text-sky-300/80 group-hover:text-sky-300 underline font-medium">
                        {activeFilter === "male" ? "Active Filter ✕" : "Filter Only →"}
                      </span>
                    </div>
                  </div>

                  {/* Female Card */}
                  <div
                    onClick={() => onSelectFilter && onSelectFilter(activeFilter === "female" ? "all" : "female")}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between group ${
                      activeFilter === "female"
                        ? "bg-pink-500/20 border-pink-500/50 shadow-md shadow-pink-500/10 ring-1 ring-pink-500/40"
                        : "bg-slate-900/70 border-slate-800 hover:border-pink-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-pink-400 font-bold text-xs">
                        {WomanLogo ? <WomanLogo className="w-4 h-4 text-pink-400" /> : <span>👩</span>}
                        <span>Female</span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-300 font-semibold border border-pink-500/30">
                        {stats.femalePct}%
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-2xl sm:text-3xl font-black text-white">{stats.females}</span>
                      <span className="text-[10px] text-pink-300/80 group-hover:text-pink-300 underline font-medium">
                        {activeFilter === "female" ? "Active Filter ✕" : "Filter Only →"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stacked Gender Ratio Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="h-3.5 w-full rounded-full bg-slate-800/80 overflow-hidden flex shadow-inner">
                    <div
                      style={{ width: `${stats.malePct}%` }}
                      className="h-full bg-gradient-to-r from-sky-500 to-blue-500 transition-all duration-500 relative group flex items-center justify-center"
                      title={`Male: ${stats.males} (${stats.malePct}%)`}
                    />
                    <div
                      style={{ width: `${stats.femalePct}%` }}
                      className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500 relative group flex items-center justify-center"
                      title={`Female: ${stats.females} (${stats.femalePct}%)`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-0.5 font-mono">
                    <span className="text-sky-300 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                      Male: {stats.males} ({stats.malePct}%)
                    </span>
                    <span className="text-pink-300 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-pink-400 inline-block" />
                      Female: {stats.females} ({stats.femalePct}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Age Summary & Key Metrics (5 cols) */}
              <div className="lg:col-span-5 rounded-2xl bg-slate-950/60 border border-slate-800/90 p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cake className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Age Summary Metrics
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSetSort && onSetSort("age", sortOrder === "asc" ? "desc" : "asc")}
                    className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition cursor-pointer flex items-center gap-1 ${
                      sortBy === "age"
                        ? "bg-amber-500/25 border-amber-500/40 text-amber-200"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                    title="Sort the guest directory by Age"
                  >
                    <ArrowUpDown className="w-3 h-3 text-amber-400" />
                    <span>Sort by Age</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Average Age
                    </span>
                    <span className="text-2xl font-black text-amber-300 mt-1">
                      {stats.avgAge ? `${stats.avgAge} yrs` : "N/A"}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">Across recorded guests</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Age Range
                    </span>
                    <span className="text-2xl font-black text-white mt-1">
                      {stats.minAge !== null && stats.maxAge !== null
                        ? `${stats.minAge} – ${stats.maxAge}`
                        : "N/A"}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">Min to Max Age</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Recorded Ages
                    </span>
                    <span className="text-2xl font-black text-emerald-300 mt-1">
                      {stats.validAgesCount}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">{stats.ageRecordRate}% completion</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Unspecified
                    </span>
                    <span className="text-2xl font-black text-slate-400 mt-1">
                      {stats.unspecifiedCount}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">Age not entered</span>
                  </div>
                </div>

                {selectedAgeGroup && (
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between text-xs text-purple-200">
                    <span className="truncate">
                      Filtering by:{" "}
                      <strong className="text-white">
                        {stats.groups.find((g) => g.id === selectedAgeGroup)?.label || selectedAgeGroup}
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectAgeGroup && onSelectAgeGroup(null)}
                      className="px-2 py-0.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold text-[10px] cursor-pointer"
                    >
                      Clear ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* View Tab 1: Visual Breakdown Cards */}
            {viewTab === "cards" ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Age Groups Breakdown (Click any bracket to filter guest directory)
                    </span>
                  </div>
                  {selectedAgeGroup && (
                    <button
                      type="button"
                      onClick={() => onSelectAgeGroup && onSelectAgeGroup(null)}
                      className="text-xs text-purple-400 hover:text-purple-300 underline font-semibold cursor-pointer"
                    >
                      Clear Age Filter
                    </button>
                  )}
                </div>

                {/* 6 Age Group Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                  {stats.groups.map((group) => {
                    const isSelected = selectedAgeGroup === group.id;

                    return (
                      <motion.div
                        key={group.id}
                        whileHover={{ y: -3 }}
                        onClick={() =>
                          onSelectAgeGroup && onSelectAgeGroup(isSelected ? null : group.id)
                        }
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                          isSelected
                            ? "bg-purple-600/25 border-purple-500 shadow-xl shadow-purple-600/20 ring-2 ring-purple-500/50"
                            : "bg-slate-950/60 border-slate-800 hover:border-slate-700/80"
                        }`}
                      >
                        {/* Selected Indicator Badge */}
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-purple-500 text-slate-950 text-[9px] font-extrabold shadow">
                            FILTERED
                          </div>
                        )}

                        <div>
                          {/* Title & Icon */}
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-base">{group.icon}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                              {group.pct}%
                            </span>
                          </div>

                          <div className="mt-2">
                            <h4 className="text-xs font-bold text-white truncate">{group.title}</h4>
                            <p className="text-[10px] text-slate-400 font-mono">{group.range}</p>
                          </div>

                          {/* Large Number */}
                          <div className="mt-2 flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-white">{group.total}</span>
                            <span className="text-[11px] text-slate-400 font-normal">guests</span>
                          </div>
                        </div>

                        {/* Male / Female Segmented Mini Bar */}
                        <div className="mt-3 pt-2 border-t border-slate-800/80 space-y-1.5">
                          {group.total > 0 ? (
                            <>
                              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex shadow-inner">
                                <div
                                  style={{ width: `${group.malePctOfGroup}%` }}
                                  className="h-full bg-sky-400 transition-all"
                                  title={`Male: ${group.male}`}
                                />
                                <div
                                  style={{ width: `${group.femalePctOfGroup}%` }}
                                  className="h-full bg-pink-400 transition-all"
                                  title={`Female: ${group.female}`}
                                />
                              </div>
                              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                <span className="text-sky-300 flex items-center gap-0.5">
                                  {ManLogo ? <ManLogo className="w-2.5 h-2.5 text-sky-400" /> : "M:"}{" "}
                                  {group.male}
                                </span>
                                <span className="text-pink-300 flex items-center gap-0.5">
                                  {WomanLogo ? <WomanLogo className="w-2.5 h-2.5 text-pink-400" /> : "F:"}{" "}
                                  {group.female}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="text-[10px] text-slate-600 italic text-center py-1">
                              No attendees
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* View Tab 2: Tabular Cross-Tab Matrix */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Cross-Demographic Matrix Table (Age × Sex)
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Click any row or button to filter directory
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 shadow-lg">
                  <table className="min-w-full text-left text-xs text-slate-200">
                    <thead className="bg-slate-900/90 text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Demographic Bracket</th>
                        <th className="px-4 py-3 font-semibold">Age Range</th>
                        <th className="px-4 py-3 font-semibold">Total Guests</th>
                        <th className="px-4 py-3 font-semibold text-sky-300">Male (Count &amp; %)</th>
                        <th className="px-4 py-3 font-semibold text-pink-300">Female (Count &amp; %)</th>
                        <th className="px-4 py-3 font-semibold">Distribution Bar</th>
                        <th className="px-4 py-3 font-semibold text-right">Quick Filter</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {stats.groups.map((group) => {
                        const isSelected = selectedAgeGroup === group.id;

                        return (
                          <tr
                            key={group.id}
                            onClick={() =>
                              onSelectAgeGroup && onSelectAgeGroup(isSelected ? null : group.id)
                            }
                            className={`cursor-pointer transition hover:bg-slate-800/40 ${
                              isSelected ? "bg-purple-900/20 font-bold" : ""
                            }`}
                          >
                            <td className="px-4 py-3 text-white font-sans font-semibold flex items-center gap-2">
                              <span>{group.icon}</span>
                              <span>{group.title}</span>
                            </td>
                            <td className="px-4 py-3 text-slate-400">{group.range}</td>
                            <td className="px-4 py-3 text-white font-bold">
                              <span>{group.total}</span>
                              <span className="text-slate-500 font-normal ml-1.5 text-[10px]">
                                ({group.pct}%)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sky-300">
                              <span>{group.male}</span>
                              <span className="text-slate-500 font-normal ml-1.5 text-[10px]">
                                ({group.malePctOfGroup}%)
                              </span>
                            </td>
                            <td className="px-4 py-3 text-pink-300">
                              <span>{group.female}</span>
                              <span className="text-slate-500 font-normal ml-1.5 text-[10px]">
                                ({group.femalePctOfGroup}%)
                              </span>
                            </td>
                            <td className="px-4 py-3 min-w-[130px]">
                              {group.total > 0 ? (
                                <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
                                  <div
                                    style={{ width: `${group.malePctOfGroup}%` }}
                                    className="h-full bg-sky-400"
                                    title={`Male: ${group.male}`}
                                  />
                                  <div
                                    style={{ width: `${group.femalePctOfGroup}%` }}
                                    className="h-full bg-pink-400"
                                    title={`Female: ${group.female}`}
                                  />
                                </div>
                              ) : (
                                <span className="text-slate-600 text-[10px]">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectAgeGroup && onSelectAgeGroup(isSelected ? null : group.id);
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-sans font-bold transition cursor-pointer ${
                                  isSelected
                                    ? "bg-purple-600 text-white shadow"
                                    : "bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
                                }`}
                              >
                                {isSelected ? "Active ✓" : "Filter List →"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-slate-900/60 font-semibold border-t border-slate-800 text-xs">
                      <tr>
                        <td className="px-4 py-2.5 text-white font-sans">Total</td>
                        <td className="px-4 py-2.5 text-slate-400 font-mono">All Ages</td>
                        <td className="px-4 py-2.5 text-white font-mono font-black">{stats.total} (100%)</td>
                        <td className="px-4 py-2.5 text-sky-300 font-mono font-bold">
                          {stats.males} ({stats.malePct}%)
                        </td>
                        <td className="px-4 py-2.5 text-pink-300 font-mono font-bold">
                          {stats.females} ({stats.femalePct}%)
                        </td>
                        <td className="px-4 py-2.5" colSpan={2}>
                          <span className="text-slate-400 text-[11px] font-sans">
                            Avg Age: <strong className="text-amber-300">{stats.avgAge} yrs</strong>
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
