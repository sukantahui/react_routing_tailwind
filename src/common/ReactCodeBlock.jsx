import { useState } from "react";
import CodeBlock from "./CodeBlock";

export default function ReactCodeBlock({
  title = "React Example",
  code,
  children,
}) {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="my-8 border rounded-xl overflow-hidden shadow-xl bg-slate-900 border-slate-700">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-2 text-xs bg-slate-800 border-b border-slate-700 text-slate-300">
        <span className="font-mono">{title}</span>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600"
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      {/* PREVIEW */}
      {showPreview && (
        <div className="p-4 bg-slate-950 border-b border-slate-700">
          {children}
        </div>
      )}

      {/* CODE */}
      <CodeBlock
        language="jsx"
        code={code}
        showRun={false}   // 👈 IMPORTANT
        fileName="Component.jsx"
      />
    </div>
  );
}
