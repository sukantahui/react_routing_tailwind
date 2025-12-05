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
  const [highlighted, setHighlighted] = useState("");

  useEffect(() => {
    const html = Prism.highlight(
      finalCode,
      Prism.languages[language] || Prism.languages.javascript,
      language
    );
    setHighlighted(html);
  }, [finalCode, language]);

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-slate-700 bg-[#0f172a] shadow-lg">
      <pre className="p-4 overflow-auto text-sm leading-6">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
