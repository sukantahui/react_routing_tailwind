import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";

// Use a grayscale theme
import "prismjs/themes/prism.css"; // classic black & white
import "prismjs/components/prism-java";

export default function JavaCodeBlockNoColor({
  code = "",
  highlightLines = [],
  title = "Java Code (BlueJ)"
}) {
  const [lines, setLines] = useState([]);
  const blockRef = useRef(null);

  useEffect(() => {
    const highlighted = Prism.highlight(code, Prism.languages.java, "java");
    setLines(highlighted.split("\n"));
  }, [code]);

  return (
    <div
      ref={blockRef}
      className="code-block-container my-3 rounded-xl overflow-hidden bg-slate-800/90 border border-slate-700/80 shadow-sm text-slate-100 print:bg-gray-100 print:border-gray-400 print:text-black print:my-2"
    >
      {/* Code Area – without line numbers */}
      <div className="flex text-sm leading-6 font-mono overflow-auto">
        <pre className="flex-1 px-4 py-3 whitespace-pre">
          <code className="language-java">
            {lines.map((line, i) => (
              <div
                key={i}
                className={
                  highlightLines.includes(i + 1)
                    ? "bg-slate-700/50 border-l-2 border-sky-400 pl-3"
                    : "pl-3"
                }
                dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
              />
            ))}
          </code>
        </pre>
      </div>

      <style jsx>{`
        .code-block-container code,
        .code-block-container pre {
          color: #f8fafc !important;
          background: transparent !important;
        }
        .code-block-container .token {
          color: #e2e8f0 !important;
          background: transparent !important;
        }
        .code-block-container .token.keyword {
          color: #38bdf8 !important;
          font-weight: bold;
        }
        .code-block-container .token.string,
        .code-block-container .token.number {
          color: #f472b6 !important;
        }
        .code-block-container .token.comment {
          color: #94a3b8 !important;
          font-style: italic;
        }

        @media print {
          .code-block-container {
            background-color: #f4f4f4 !important;
            color: #000000 !important;
            border-color: #999999 !important;
          }
          .code-block-container code,
          .code-block-container pre,
          .code-block-container .token {
            color: #000000 !important;
          }
        }
      `}</style>
    </div>
  );
}