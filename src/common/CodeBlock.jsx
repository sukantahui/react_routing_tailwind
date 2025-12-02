import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// OPTIONAL: load JavaScript language syntax
import "prismjs/components/prism-javascript";

export default function CodeBlock({ code, language = "javascript" }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre className="rounded-xl bg-slate-900 p-4 overflow-auto border border-slate-800">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}
