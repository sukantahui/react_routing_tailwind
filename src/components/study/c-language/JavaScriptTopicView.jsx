import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
} from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import roadmapData from "../../../data/javascript-roadmap-enhanced.json";

// Vite auto-import Topic*.jsx
const topicModules = import.meta.glob("./topics/*/Topic*.jsx");

// =============== OUTER REMOUNT WRAPPER ===================
export default function JavaScriptTopicView() {
  const { moduleSlug, topicIndex } = useParams();
  const viewKey = `${moduleSlug}-${topicIndex}`;
  return (
    <JavaScriptTopicViewInner
      key={viewKey}
      moduleSlug={moduleSlug}
      topicIndex={topicIndex}
    />
  );
}

// =============== MAIN VIEW ===============================
function JavaScriptTopicViewInner({ moduleSlug, topicIndex }) {
  const index = Number.parseInt(topicIndex, 10) || 0;
  const activeTopicRef = useRef(null);

  // --------------------------------------------------------
  // FIND MODULE
  // --------------------------------------------------------
  let moduleData = null;
  for (const segment of roadmapData.segments) {
    const found = segment.modules.find((m) => m.slug === moduleSlug);
    if (found) {
      moduleData = found;
      break;
    }
  }

  if (!moduleData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
        <h1 className="text-2xl text-red-400 font-bold">Module Not Found</h1>
        <Link to="/javascript/roadmap" className="text-sky-400 mt-4 inline-block underline">
          ← Back to Roadmap
        </Link>
      </div>
    );
  }

  const topicTitle = moduleData.topics[index];
  if (!topicTitle) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
        <h1 className="text-2xl text-red-400 font-bold">Topic Not Found</h1>
        <Link
          to={`/javascript/module/${moduleSlug}`}
          className="text-sky-400 mt-4 inline-block underline"
        >
          ← Back to Module
        </Link>
      </div>
    );
  }

  // --------------------------------------------------------
  // PROGRESS (localStorage)
  // --------------------------------------------------------
  const storageKey = `js-progress-${moduleSlug}`;
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey) || "[]";
      let parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) parsed = [];

      if (!parsed.includes(index)) parsed.push(index);
      parsed.sort((a, b) => a - b);

      localStorage.setItem(storageKey, JSON.stringify(parsed));
      setCompletedTopics(parsed);
    } catch {
      setCompletedTopics([index]);
    }
  }, [index, storageKey]);

  useEffect(() => {
    if (activeTopicRef.current) {
      activeTopicRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [index]);

  const totalTopics = moduleData.topics.length;
  const completedCount = completedTopics.length;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  const resetProgress = () => {
    localStorage.removeItem(storageKey);
    setCompletedTopics([]);
  };

  const hasPrev = index > 0;
  const hasNext = index < totalTopics - 1;

  // --------------------------------------------------------
  // DYNAMIC TOPIC IMPORT
  // --------------------------------------------------------
  const topicKey = `./topics/${moduleSlug}/Topic${topicIndex}.jsx`;
  let TopicPage = topicModules[topicKey]
    ? React.lazy(topicModules[topicKey])
    : null;

  // ========================================================
  // FULL PAGE LAYOUT: LEFT SIDEBAR + CENTERED RIGHT CONTENT
  // ========================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">

      {/* ================= LEFT SIDEBAR ================= */}
      <aside
        className="
          hidden lg:block w-80 
          bg-slate-900/70 backdrop-blur-sm
          border-r border-slate-800
          sticky top-0 h-screen overflow-y-auto
          p-6
        "
      >
        {/* MODULE TITLE */}
        <h2 className="text-sky-300 font-bold text-lg mb-4">
          {moduleData.title}
        </h2>

        {/* PROGRESS BAR */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-400">
            <span>{completedCount} / {totalTopics} completed</span>
            <span className="text-sky-300 font-semibold">{progressPercent}%</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full mt-1 overflow-hidden">
            <div
              className="bg-sky-500 h-full transition-all rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <button
            onClick={resetProgress}
            className="mt-2 text-xs text-rose-300 hover:text-rose-400"
          >
            Reset Progress
          </button>
        </div>

        {/* =============== TOPIC LIST =============== */}
        <div className="space-y-2 pb-8">
          {moduleData.topics.map((title, i) => {
            const isActive = i === index;
            const isCompleted = completedTopics.includes(i);

            return (
              <Link
                key={i}
                ref={isActive ? activeTopicRef : null}
                to={`/javascript/topic/${moduleSlug}/${i}`}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-lg text-sm border transition
                  ${isActive
                    ? "bg-sky-600 text-white border-sky-500 shadow-lg"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-500 shrink-0"></span>
                )}

                <span className="truncate">{i + 1}. {title}</span>
              </Link>
            );
          })}
        </div>

        {/* =============== PROFESSIONAL NAV BUTTONS =============== */}
        <div className="mt-6 pt-4 border-t border-slate-700 space-y-3 text-sm">

          {/* Back to Module */}
          <Link
            to={`/javascript/module/${moduleSlug}`}
            className="
              flex items-center gap-2
              px-4 py-2 rounded-lg
              bg-slate-800 hover:bg-slate-700
              text-slate-200 transition border border-slate-700
              shadow-sm hover:shadow
            "
          >
            <span className="text-lg">←</span>
            <span>Back to Module Overview</span>
          </Link>

          {/* Back to Roadmap */}
          <Link
            to="/javascript/roadmap"
            className="
              flex items-center gap-2
              px-4 py-2 rounded-lg
              bg-slate-800 hover:bg-slate-700
              text-slate-200 transition border border-slate-700
              shadow-sm hover:shadow
            "
          >
            <span className="text-sm">📍</span>
            <span>JavaScript Roadmap</span>
          </Link>

          {/* CNAT Playground */}
          <a
            href="/play"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2
              px-4 py-2 rounded-lg
              bg-slate-800 hover:bg-slate-700
              text-slate-200 transition border border-slate-700
              shadow-sm hover:shadow
            "
          >
            <span className="text-sm">🧪</span>
            <span>CNAT Playground</span>
          </a>

        </div>
      </aside>

      {/* ================= RIGHT CONTENT PANEL ================= */}
      <main className="flex-1 p-6 lg:p-10 overflow-x-hidden flex justify-center">
        {/* MAX WIDTH WRAPPER */}
        <div className="w-full max-w-4xl">

          {/* HEADER */}
          {/* COMPACT PAGE HEADER */}
          <header className="mb-6 bg-slate-900/40 border border-slate-800 rounded-xl p-4 shadow">

            {/* Title + Module */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

              <div>
                <h1 className="text-xl md:text-2xl font-bold text-sky-300 leading-tight">
                  {topicTitle}
                </h1>
                <p className="text-[12px] text-slate-400">
                  Module: {moduleData.title}
                </p>
              </div>

              {/* Compact Prev / Next */}
              <div className="flex items-center gap-2">

                {hasPrev ? (
                  <Link
                    to={`/javascript/topic/${moduleSlug}/${index - 1}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700"
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
                    to={`/javascript/topic/${moduleSlug}/${index + 1}`}
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


          {/* TOPIC CONTENT */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-md">
            <Suspense fallback={<p className="text-slate-400">Loading topic...</p>}>
              {TopicPage ? (
                <TopicPage key={topicKey} />
              ) : (
                <div className="text-slate-300">
                  <p>Topic file missing:</p>
                  <pre className="text-sky-400 mt-2 text-sm">
                    {`src/components/study/javaScript/topics/${moduleSlug}/Topic${topicIndex}.jsx`}
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
