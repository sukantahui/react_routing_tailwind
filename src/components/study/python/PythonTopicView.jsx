// src/components/study/python/PythonTopicView.jsx

import React, { Component, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import roadmapData from "./python-roadmap.json";

// Auto-import ALL Topic components
const topicModules = import.meta.glob("./topics/*/Topic*.jsx");

/* ==========================================================
   CLASS COMPONENT — PYTHON TOPIC VIEW
========================================================== */
class PythonTopicViewInner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completedTopics: [],
      TopicPage: null,
    };

    this.activeTopicRef = React.createRef();
  }

  /* ---------------------------------------------------------
      HELPERS
  ---------------------------------------------------------- */
  getModuleData() {
    const { moduleSlug } = this.props;

    for (const segment of roadmapData.segments) {
      const found = segment.modules.find((m) => m.slug === moduleSlug);
      if (found) return found;
    }
    return null;
  }

  getSafeIndex() {
    const raw = this.props.topicIndex;
    const n = parseInt(raw, 10);
    if (Number.isNaN(n) || n < 0) return 0;
    return n;
  }

  /* ---------------------------------------------------------
      LIFECYCLE
  ---------------------------------------------------------- */
  componentDidMount() {
    this.loadProgress();
    this.loadTopicComponent();
    this.scrollToActiveTopic();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.topicIndex !== this.props.topicIndex ||
      prevProps.moduleSlug !== this.props.moduleSlug
    ) {
      this.loadProgress();
      this.loadTopicComponent();
      this.scrollToActiveTopic();
    }
  }

  /* ---------------------------------------------------------
      LOAD TOPIC PROGRESS (LOCALSTORAGE)
  ---------------------------------------------------------- */
  loadProgress() {
    const { moduleSlug } = this.props;
    const index = this.getSafeIndex();

    const storageKey = `python-progress-${moduleSlug}`;
    let parsed = [];

    try {
      const raw = localStorage.getItem(storageKey) || "[]";
      parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) parsed = [];
    } catch {
      parsed = [];
    }

    // Mark current topic as visited
    if (!parsed.includes(index)) {
      parsed.push(index);
      parsed.sort((a, b) => a - b);
      localStorage.setItem(storageKey, JSON.stringify(parsed));
    }

    this.setState({ completedTopics: parsed });
  }

  resetProgress = () => {
    const { moduleSlug } = this.props;
    localStorage.removeItem(`python-progress-${moduleSlug}`);
    this.setState({ completedTopics: [] });
  };

  /* ---------------------------------------------------------
      DYNAMIC TOPIC COMPONENT
  ---------------------------------------------------------- */
  loadTopicComponent() {
    const { moduleSlug } = this.props;
    const index = this.getSafeIndex();

    const topicKey = `./topics/${moduleSlug}/Topic${index}.jsx`;
    if (!topicModules[topicKey]) {
      this.setState({ TopicPage: null });
      return;
    }

    const Comp = React.lazy(topicModules[topicKey]);
    this.setState({ TopicPage: Comp });
  }

  /* ---------------------------------------------------------
      SCROLL ACTIVE TOPIC INTO VIEW
  ---------------------------------------------------------- */
  scrollToActiveTopic() {
    if (this.activeTopicRef.current) {
      setTimeout(() => {
        this.activeTopicRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 200);
    }
  }

  /* ---------------------------------------------------------
      RENDER
  ---------------------------------------------------------- */
  render() {
    const { moduleSlug } = this.props;
    const { completedTopics, TopicPage } = this.state;

    const moduleData = this.getModuleData();

    if (!moduleData) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
          <h1 className="text-red-400 text-2xl font-bold">Module Not Found</h1>

          <Link
            to="/python/roadmap"
            className="text-sky-400 underline mt-3 inline-block"
          >
            ← Back to Roadmap
          </Link>
        </div>
      );
    }

    const index = this.getSafeIndex();
    const topics = Array.isArray(moduleData.topics) ? moduleData.topics : [];
    const topicTitle = topics[index];

    if (!topicTitle) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
          <h1 className="text-red-400 text-2xl font-bold">Topic Not Found</h1>

          <Link
            to={`/python/module/${moduleSlug}`}
            className="text-sky-400 underline mt-3 inline-block"
          >
            ← Back to Module
          </Link>
        </div>
      );
    }

    const totalTopics = topics.length;
    const completedCount = completedTopics.length;
    const progressPercent =
      totalTopics > 0
        ? Math.round((completedCount / totalTopics) * 100)
        : 0;

    const hasPrev = index > 0;
    const hasNext = index < totalTopics - 1;

    // For forcing TopicPage remount when index changes
    const topicKey = `./topics/${moduleSlug}/Topic${index}.jsx`;
    const topicComponentKey = `${moduleSlug}-${index}`;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex">

        {/* ==========================================================
            LEFT SIDEBAR
        =========================================================== */}
        <aside className="hidden lg:block w-80 bg-slate-900/70 backdrop-blur-sm border-r border-slate-800 sticky top-0 h-screen overflow-y-auto p-6">

          <h2 className="text-sky-300 font-bold text-lg mb-4">
            {moduleData.title}
          </h2>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-slate-400">
              <span>
                {completedCount}/{totalTopics} completed
              </span>
              <span className="text-sky-300 font-semibold">
                {progressPercent}%
              </span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full mt-1 overflow-hidden">
              <div
                className="bg-sky-500 h-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <button
              onClick={this.resetProgress}
              className="mt-2 text-xs text-rose-300 hover:text-rose-400"
            >
              Reset Progress
            </button>
          </div>

          {/* Topic List */}
          <div className="space-y-2 pb-8">
            {topics.map((title, i) => {
              const isActive = i === index;
              const isCompleted = completedTopics.includes(i);

              return (
                <Link
                  key={i}
                  to={`/python/topic/${moduleSlug}/${i}`}
                  ref={isActive ? this.activeTopicRef : null}
                  className={`
                    flex items-center gap-3 px-4 py-2 rounded-lg text-sm border transition
                    ${
                      isActive
                        ? "bg-sky-600 text-white border-sky-500 shadow-lg"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700"
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-500" />
                  )}

                  <span className="truncate">
                    {i + 1}. {title}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="mt-6 pt-4 border-t border-slate-700 space-y-3 text-sm">
            <Link
              to={`/python/module/${moduleSlug}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            >
              ← Back to Module
            </Link>

            <Link
              to="/python/roadmap"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            >
              📍 Python Roadmap
            </Link>

            <a
              href="/play"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            >
              🧪 CNAT Playground
            </a>
          </div>
        </aside>

        {/* ==========================================================
            RIGHT CONTENT AREA
        =========================================================== */}
        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden flex justify-center">
          <div className="w-full max-w-4xl">

            {/* Header */}
            <header className="mb-6 bg-slate-900/40 border border-slate-800 rounded-xl p-4 shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-sky-300">
                    {topicTitle}
                  </h1>
                  <p className="text-[12px] text-slate-400">
                    Module: {moduleData.title}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {hasPrev ? (
                    <Link
                      to={`/python/topic/${moduleSlug}/${index - 1}`}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs"
                    >
                      ← Prev
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-600 border border-slate-800 text-xs"
                    >
                      ← Prev
                    </button>
                  )}

                  {hasNext ? (
                    <Link
                      to={`/python/topic/${moduleSlug}/${index + 1}`}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs"
                    >
                      Next →
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-600 border border-slate-800 text-xs"
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
            </header>

            {/* Topic Content */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-md">
              <Suspense fallback={<p className="text-slate-400">Loading topic...</p>}>
                {TopicPage ? (
                  <TopicPage key={topicComponentKey} />
                ) : (
                  <div className="text-slate-300">
                    <p>Topic file missing:</p>
                    <pre className="text-sky-400 mt-2 text-sm">
{`./topics/${moduleSlug}/Topic${index}.jsx`}
                    </pre>
                  </div>
                )}
              </Suspense>
            </section>

          </div>
        </main>
      </div>
    );
  }
}

/* ==========================================================
   WRAPPER — gets params from React Router
========================================================== */
export default function PythonTopicView() {
  const { moduleSlug, topicIndex } = useParams();
  return (
    <PythonTopicViewInner
      moduleSlug={moduleSlug}
      topicIndex={topicIndex}
    />
  );
}
