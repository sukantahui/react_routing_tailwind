import React, { useEffect, useState } from "react";
import Prism from "prismjs";

// Prism theme
import "prismjs/themes/prism-tomorrow.css";

// Language packs
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";

export default function CodeBlockGeneral({
  code = "",
  initialCode = "",
  language = "javascript",
}) {
  const finalCode = initialCode || code;
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const highlighted = Prism.highlight(
      finalCode,
      Prism.languages[language] || Prism.languages.javascript,
      language
    );

    // Split highlighted HTML into lines
    const splitLines = highlighted.split("\n").map((line) => line || "&nbsp;");
    setLines(splitLines);
  }, [finalCode, language]);

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-slate-700 bg-[#0f172a] shadow-lg">
      <div className="flex p-4 text-sm leading-6 overflow-auto whitespace-pre-wrap break-words font-mono">
        
        {/* Line Numbers */}
        <div className="pr-4 text-right select-none text-slate-600">
          {lines.map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>

        {/* Highlighted Code */}
        <pre className="whitespace-pre-wrap break-words">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{
              __html: lines.join("<br/>"),
            }}
          />
        </pre>
      </div>
    </div>
  );
}
