import React, { Component } from "react";
import { Link } from "react-router-dom";
import roadmapData from "./c-language-roadmap.json";

export default class CRoadmap extends Component {
  constructor(props) {
    super(props);

    const stored = JSON.parse(localStorage.getItem("c_progress") || "{}");

    this.state = {
      activeFilter: "All",
      showTopButton: false,
      completed: stored, // { moduleId: true }
    };
  }

  /* --------------------------------------------------
          LIFECYCLE – STICKY HEADER & TOP BUTTON
     -------------------------------------------------- */
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const show = window.scrollY > 350;
    if (show !== this.state.showTopButton) {
      this.setState({ showTopButton: show });
    }
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* --------------------------------------------------
                PROGRESS TRACKER HANDLERS
     -------------------------------------------------- */
  toggleComplete = (moduleId) => {
    this.setState(
      (prev) => {
        const updated = {
          ...prev.completed,
          [moduleId]: !prev.completed[moduleId],
        };

        localStorage.setItem("c_progress", JSON.stringify(updated));

        return { completed: updated };
      }
    );
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

  /* --------------------------------------------------
                MODULE CARD WITH CHECK BUTTON
     -------------------------------------------------- */
  renderModule = (module, index) => {
    const { completed } = this.state;
    const isDone = !!completed[module.moduleId];

    return (
      <div
        key={module.moduleId}
        className="
          group relative border border-sky-500/20 bg-slate-900/60
          rounded-2xl p-5 md:p-6 shadow-[0_0_35px_rgba(15,23,42,0.9)]
          hover:shadow-[0_0_45px_rgba(56,189,248,0.35)]
          hover:border-sky-400/60 backdrop-blur-xl transition-all
          overflow-hidden
        "
      >
        {/* Glow effect */}
        <div
          className="
            pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
            bg-gradient-to-tr from-sky-500/10 via-transparent to-purple-500/10
            blur-3xl transition-opacity duration-500
          "
        />

        <div className="relative flex items-center justify-between gap-4">
          <div>
            {/* Small header row */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
              <span
                className="
                  inline-flex h-5 w-5 items-center justify-center 
                  rounded-full bg-slate-900/80 text-[10px] text-slate-100 
                  border border-slate-600
                "
              >
                {index + 1}
              </span>

              <span className="font-medium uppercase tracking-wide">
                {module.moduleId}
              </span>

              {module.slug && (
                <span className="hidden md:inline text-slate-500">• {module.slug}</span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-base md:text-lg font-semibold text-slate-50">
              {module.title}
            </h3>

            {/* Explore button */}
            <div className="mt-2 flex items-center gap-3">
              <Link
                to={`/c/module/${module.slug}`}
                className="
                  inline-flex items-center gap-1 rounded-full border 
                  border-sky-400/80 text-sky-200 hover:bg-sky-500/15 
                  hover:text-sky-100 transition px-3 py-1 text-[11px] md:text-xs
                "
              >
                Explore Module ↗
              </Link>

              <button
                onClick={() => this.toggleComplete(module.moduleId)}
                className={`
                  text-[11px] md:text-xs px-3 py-1 rounded-full border 
                  transition-all
                  ${
                    isDone
                      ? "border-green-500/70 bg-green-500/20 text-green-300 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                      : "border-slate-500/60 bg-slate-700/40 text-slate-300 hover:bg-slate-700"
                  }
                `}
              >
                {isDone ? "✔ Completed" : "Mark Complete"}
              </button>
            </div>

            {/* Summary */}
            {module.summary && (
              <p className="mt-2 text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
                {module.summary}
              </p>
            )}
          </div>

          {/* Badge */}
          {module.badge && (
            <div
              className="
                text-[10px] px-3 py-1 rounded-full border border-purple-400/70 
                text-purple-100 bg-purple-500/15 shadow-[0_0_18px_rgba(168,85,247,0.3)]
              "
            >
              {module.badge}
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="relative mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
          <span className="px-2 py-[3px] rounded-full bg-slate-900/80 border border-slate-600/80">
            {module.level}
          </span>

          <span className="px-2 py-[3px] rounded-full bg-slate-900/80 border border-slate-600/80">
            {module.difficulty}
          </span>

          <span className="px-2 py-[3px] rounded-full bg-slate-900/80 border border-slate-600/80">
            ⏱ {module.estimatedHours} hrs
          </span>
        </div>
      </div>
    );
  };

  /* --------------------------------------------------
                SEGMENT BLOCK (WITH FILTER)
     -------------------------------------------------- */
  renderSegment = (segment) => {
    const { activeFilter } = this.state;

    if (activeFilter !== "All" && segment.level !== activeFilter) return null;

    return (
      <section key={segment.segmentId} className="relative mb-14">
        {/* Segment accent */}
        <div
          className="
            pointer-events-none absolute inset-x-6 -inset-y-4 
            bg-gradient-to-b from-sky-500/10 via-transparent to-purple-500/10 
            rounded-[32px] blur-3xl opacity-70
          "
        />

        <div
          className="
            relative border border-slate-800/80 bg-slate-950/70 rounded-3xl 
            p-6 md:p-8 shadow-[0_0_45px_rgba(15,23,42,0.9)] backdrop-blur-2xl
          "
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-sky-300">
                {segment.title}
              </h2>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-2 max-w-2xl">
                {segment.summary}
              </p>
            </div>

            {segment.level && (
              <div
                className="
                  px-3 py-1 rounded-full bg-slate-900/80 border border-sky-500/60 
                  text-[11px] text-sky-100 uppercase tracking-wide
                "
              >
                {segment.level} Track
              </div>
            )}
          </div>

          <div className="space-y-6 mt-4">
            {segment.modules.map((module, index) =>
              this.renderModule(module, index)
            )}
          </div>
        </div>
      </section>
    );
  };

  /* --------------------------------------------------
                 FILTER BUTTON BAR
     -------------------------------------------------- */
  renderFilters() {
    const filters = ["All", "Beginner", "Intermediate", "Advanced", "Ultra Expert"];
    const { activeFilter } = this.state;

    return (
      <div className="flex flex-wrap gap-3 mb-10 sticky top-14 z-30 backdrop-blur-xl py-3 border-b border-slate-700/40 bg-slate-950/40">
        {filters.map((filter) => {
          const active = filter === activeFilter;
          return (
            <button
              key={filter}
              onClick={() => this.setState({ activeFilter: filter })}
              className={`
                px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm
                ${
                  active
                    ? "bg-sky-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.6)]"
                    : "bg-slate-800/70 text-slate-300 border border-slate-700 hover:bg-slate-800"
                }
              `}
            >
              {filter}
            </button>
          );
        })}
      </div>
    );
  }

  /* --------------------------------------------------
                    MAIN RENDER
     -------------------------------------------------- */
  render() {
    const { trackTitle, description } = roadmapData;
    const { showTopButton } = this.state;

    const total = this.getTotalModules();
    const done = this.getCompletedModules();
    const percent = Math.round((done / total) * 100) || 0;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4">

        {/* Sticky top header */}
        <div className="sticky top-0 z-40 backdrop-blur-xl border-b border-slate-800/60 bg-slate-950/70 py-4 mb-8 shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-sky-300 via-cyan-400 to-sky-500 text-transparent bg-clip-text">
            {trackTitle}
          </h1>
        </div>

        <div className="max-w-6xl mx-auto">

          {/* Description */}
          <p className="text-slate-400 mt-3 text-sm md:text-base max-w-2xl mb-6">
            {description}
          </p>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span>{done} of {total} modules completed</span>
              <span>{percent}%</span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-sky-400 transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* FILTER BAR */}
          {this.renderFilters()}

          {/* SEGMENTS */}
          {roadmapData.segments.map((segment) =>
            this.renderSegment(segment)
          )}

          {/* BACK TO TOP BUTTON */}
          {showTopButton && (
            <button
              onClick={this.scrollToTop}
              className="
                fixed bottom-6 right-6 bg-sky-600 hover:bg-sky-500 
                text-white rounded-full w-12 h-12 flex items-center justify-center
                shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all z-50
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
