import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/themes/prism-tomorrow.css"; // VS Code–style dark theme
import { useEffect, useRef } from "react";

export default function ShellCodeBlock({
  code,
  title = "Shell Script",
  highlightLines = [],
}) {
  const codeRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#1e1e1e]">
      {/* Header */}
      <div className="px-4 py-2 text-sm bg-[#252526] text-slate-200 border-b border-slate-700">
        {title}
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code ref={codeRef} className="language-bash">
          {code}
        </code>
      </pre>
    </div>
  );
}
