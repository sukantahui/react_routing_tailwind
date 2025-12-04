import React, { Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import roadmapData from "./python-roadmap.json";

export default function PythonTopicView() {
  const { moduleSlug, topicIndex } = useParams();

  // Find module from JSON
  let moduleData = null;
  for (const segment of roadmapData.segments) {
    const found = segment.modules.find((m) => m.slug === moduleSlug);
    if (found) {
      moduleData = found;
      break;
    }
  }

  // If module not found
  if (!moduleData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
        <h1 className="text-2xl text-red-400 font-bold">Module Not Found</h1>
        <Link
          to="/python/roadmap"
          className="inline-block mt-4 text-sky-400 underline"
        >
          ← Back to Roadmap
        </Link>
      </div>
    );
  }

  // Get topic info
  const index = parseInt(topicIndex, 10);
  const topicTitle = moduleData.topics[index];

  if (!topicTitle) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
        <h1 className="text-2xl text-red-400 font-bold">Topic Not Found</h1>
        <Link
          to={`/python/module/${moduleSlug}`}
          className="inline-block mt-4 text-sky-400 underline"
        >
          ← Back to Module
        </Link>
      </div>
    );
  }

  // ==== 🚀 DYNAMIC IMPORT OF Topic FILES ====
  let TopicPage = null;
  try {
    TopicPage = React.lazy(() =>
      import(
        `./topics/${moduleSlug}/Topic${topicIndex}.jsx`
      )
    );
  } catch (err) {
    TopicPage = null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <header className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl">
          <h1 className="text-xl md:text-2xl font-bold text-sky-300">
            {topicTitle}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Module: {moduleData.title}
          </p>

          <div className="mt-4 flex gap-3 text-sm">
            <Link
              to={`/python/module/${moduleSlug}`}
              className="text-sky-400 hover:underline"
            >
              ← Back to Module
            </Link>
            <Link
              to="/python/roadmap"
              className="text-slate-400 hover:underline"
            >
              Roadmap
            </Link>
          </div>
        </header>

        {/* 🚀 Topic File Loader */}
        <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
          <Suspense fallback={<p className="text-slate-400">Loading topic...</p>}>

            {TopicPage ? (
              <TopicPage />
            ) : (
              <div>
                <h2 className="text-lg font-semibold mb-2">Discussion</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  This is the detailed discussion area for:
                  <br />
                  <span className="font-semibold text-sky-300">{topicTitle}</span>
                </p>

                <p className="mt-3 text-slate-400 text-sm">
                  The file for this topic was not found.  
                  Please create:
                </p>
                <pre className="text-sky-300 text-xs mt-2">
{`src/components/study/python/topics/${moduleSlug}/Topic${topicIndex}.jsx`}
                </pre>
              </div>
            )}

          </Suspense>
        </section>
      </div>
    </div>
  );
}
