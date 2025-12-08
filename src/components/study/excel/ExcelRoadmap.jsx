import React, { Component } from "react";
import { Link } from "react-router-dom";
import roadmapData from "./excel-basic-to-advanced.json";

export default class ExcelRoadmap extends Component {
  constructor(props) {
    super(props);

    const stored = JSON.parse(localStorage.getItem("c_progress") || "{}");
   
    this.state = {
      activeFilter: "All",
      showTopButton: false,
      completed: stored,
      showFloatingProgress: false,
    };
  }

  /* ------------------------------------------------------------
      LIFECYCLE – STICKY HEADER, SCROLL LISTENER, MINI PROGRESS
  ------------------------------------------------------------- */
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const showTopBtn = window.scrollY > 350;
    const showMini = window.scrollY > 120;

    if (showTopBtn !== this.state.showTopButton)
      this.setState({ showTopButton: showTopBtn });

    if (showMini !== this.state.showFloatingProgress)
      this.setState({ showFloatingProgress: showMini });
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ------------------------------------------------------------
                     PROGRESS TRACKER
  ------------------------------------------------------------- */
  toggleComplete = (moduleId) => {
    this.setState((prev) => {
      const updated = {
        ...prev.completed,
        [moduleId]: !prev.completed[moduleId],
      };
      localStorage.setItem("c_progress", JSON.stringify(updated));
      return { completed: updated };
    });
  };

  getTotalModules = () => {
    return roadmapData.segments.reduce(
      (count, seg) => count + seg.modules.length,
      0
    );
  };

  getCompletedModules = () => {
    return Object.values(this.state.completed).filter(Boolean).length;
  };

  /* ------------------------------------------------------------
                  MODULE CARD (UPGRADED UI)
  ------------------------------------------------------------- */
  renderModule = (module, index) => {
    const { completed } = this.state;
    const isDone = !!completed[module.moduleId];

    return (
      <div
        key={module.moduleId}
        className="
          group relative border border-sky-500/20 bg-slate-900/50
          rounded-2xl p-6 shadow-[0_0_35px_rgba(15,23,42,0.9)]
          hover:shadow-[0_0_55px_rgba(56,189,248,0.35)]
          hover:-translate-y-1 transform transition-all duration-300
          backdrop-blur-xl 
        "
      >
        {/* Glow Background */}
        <div
          className="
            absolute inset-0 rounded-2xl pointer-events-none 
            opacity-0 group-hover:opacity-100 transition 
            bg-gradient-to-br from-sky-500/10 via-transparent to-purple-500/10 
            blur-2xl
          "
        />

        <div className="relative flex justify-between items-start">
          <div>
            {/* Module Small Header */}
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span
                className="
                  h-5 w-5 flex items-center justify-center rounded-full 
                  bg-slate-900/80 border border-slate-600 text-[10px]
                "
              >
                {index + 1}
              </span>

              <span className="uppercase tracking-widest font-medium">
                {module.moduleId}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-1 text-lg font-bold text-slate-50 drop-shadow-sm">
              {module.title}
            </h3>

            {/* Buttons */}
            <div className="flex items-center mt-3 gap-3">
              <Link
                to={`/${roadmapData.folder}/module/${module.slug}`}
                className="
                  px-3 py-1 rounded-full border border-sky-400/80 
                  text-sky-200 hover:bg-sky-500/20 hover:text-sky-50 
                  text-[11px] md:text-xs transition
                "
              >
                Explore Module ↗
              </Link>

              <button
                onClick={() => this.toggleComplete(module.moduleId)}
                className={`
                  px-3 py-1 rounded-full text-[11px] md:text-xs border transition
                  ${
                    isDone
                      ? "border-green-500 bg-green-500/20 text-green-300 shadow-[0_0_12px_rgba(34,197,94,0.5)]"
                      : "border-slate-500/60 bg-slate-700/40 text-slate-300 hover:bg-slate-700"
                  }
                `}
              >
                {isDone ? "✔ Completed" : "Mark Complete"}
              </button>
            </div>

            {module.summary && (
              <p className="mt-3 text-xs md:text-sm text-slate-300 leading-relaxed">
                {module.summary}
              </p>
            )}
          </div>

          {/* Badge */}
          {module.badge && (
            <span
              className="
                px-3 py-1 rounded-full text-purple-200 
                bg-purple-500/20 border border-purple-400 text-[11px]
              "
            >
              {module.badge}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="mt-5 flex flex-wrap gap-3 text-[11px] text-slate-400">
          <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-600">
            {module.level}
          </span>

          <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-600">
            {module.difficulty}
          </span>

          <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-600">
            ⏱ {module.estimatedHours} hrs
          </span>
        </div>
      </div>
    );
  };

  /* ------------------------------------------------------------
                     SEGMENT BLOCK
  ------------------------------------------------------------- */
  renderSegment = (segment) => {
    const { activeFilter } = this.state;
    if (activeFilter !== "All" && segment.level !== activeFilter) return null;

    return (
      <section key={segment.segmentId} className="mb-14 animate-fadeInSlow">
        <div
          className="
            relative border border-slate-800 bg-slate-950/60 rounded-3xl 
            p-6 md:p-8 shadow-[0_0_45px_rgba(15,23,42,0.7)] backdrop-blur-xl
          "
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-sky-300">
                {segment.title}
              </h2>
              <p className="text-slate-400 mt-2 text-sm md:text-base max-w-2xl">
                {segment.summary}
              </p>
            </div>

            {segment.level && (
              <span
                className="
                  px-4 py-1 rounded-full border border-sky-500/60 
                  bg-slate-900 text-sky-200 text-[11px]
                "
              >
                {segment.level} Track
              </span>
            )}
          </div>

          <div className="space-y-6">
            {segment.modules.map((m, i) => this.renderModule(m, i))}
          </div>
        </div>
      </section>
    );
  };

  /* ------------------------------------------------------------
                     FILTER BUTTONS
  ------------------------------------------------------------- */
  renderFilters() {
    const filters = ["All", "Beginner", "Intermediate", "Advanced", "Ultra Expert"];
    const { activeFilter } = this.state;

    return (
      <div className="flex gap-3 flex-wrap mb-10 sticky top-20 z-30 backdrop-blur-xl py-3 border-b border-slate-700 bg-slate-950/60">
        {filters.map((f) => {
          const active = activeFilter === f;
          return (
            <button
              key={f}
              onClick={() => this.setState({ activeFilter: f })}
              className={`
                px-4 py-2 rounded-full text-xs font-semibold tracking-wide
                transition shadow-sm
                ${
                  active
                    ? "bg-sky-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.6)]"
                    : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                }
              `}
            >
              {f}
            </button>
          );
        })}
      </div>
    );
  }

  /* ------------------------------------------------------------
                     MAIN RENDER
  ------------------------------------------------------------- */
  render() {
    const { showTopButton, showFloatingProgress } = this.state;
    const { trackTitle, description } = roadmapData;

    const total = this.getTotalModules();
    const done = this.getCompletedModules();
    const percent = Math.round((done / total) * 100) || 0;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4">

        {/* Sticky Title Header */}
        <div className="sticky top-0 z-40 backdrop-blur-xl border-b border-slate-800 bg-slate-950/80 py-4 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-sky-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
            {trackTitle}
          </h1>
        </div>

        {/* Floating Progress Mini-Bar */}
        {showFloatingProgress && (
          <div
            className="
              fixed left-6 top-24 bg-slate-900/80 backdrop-blur-xl border 
              border-slate-700 shadow-xl rounded-full px-4 py-2 z-50 
              flex items-center gap-3 animate-fadeIn
            "
          >
            <span className="text-xs text-sky-300 font-semibold">
              {percent}% done
            </span>
            <div className="h-2 w-24 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-400"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto">

          {/* Description */}
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mb-6">
            {description}
          </p>

          {/* PROGRESS BAR */}
          <div className="mb-10">
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>{done} of {total} modules finished</span>
              <span>{percent}%</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-sky-400 transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* FILTER BUTTONS */}
          {this.renderFilters()}

          {/* SEGMENTS */}
          {roadmapData.segments.map((segment) => this.renderSegment(segment))}

          {/* BACK TO TOP BUTTON */}
          {showTopButton && (
            <button
              onClick={this.scrollToTop}
              className="
                fixed bottom-6 right-6 bg-sky-600 hover:bg-sky-500 rounded-full 
                w-12 h-12 flex items-center justify-center shadow-lg text-white 
                text-xl z-50 animate-fadeIn
              "
            >
              ↑
            </button>
          )}
        </div>
      </div>
    );
  }
}
