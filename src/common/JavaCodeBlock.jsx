import React, { useEffect, useState } from "react";
import Prism from "prismjs";

// Theme
import "prismjs/themes/prism-tomorrow.css";

// Java only
import "prismjs/components/prism-java";

export default function JavaCodeBlock({
  code = "",
  highlightLines = [],
  title = "Java Code (BlueJ)"
}) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const highlighted = Prism.highlight(
      code,
      Prism.languages.java,
      "java"
    );

    setLines(highlighted.split("\n"));
  }, [code]);

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-slate-700 bg-[#0f172a] shadow-lg">

      {/* Header */}
      <div className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold">
        ☕ {title}
      </div>

      <div className="flex p-4 text-sm leading-6 overflow-auto font-mono">

        {/* Line Numbers */}
        <div className="pr-4 text-right select-none text-slate-600">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code */}
        <pre className="whitespace-pre">
          <code>
            {lines.map((line, i) => (
              <div
                key={i}
                className={
                  highlightLines.includes(i + 1)
                    ? "bg-yellow-500/10 border-l-2 border-yellow-400 pl-2"
                    : ""
                }
                dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
              />
            ))}
          </code>
        </pre>

      </div>
    </div>
  );
}
