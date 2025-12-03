import React, { useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";

export default function CodeBlock({
  code = "",
  language = "javascript",
  fileName = ""
}) {
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState("");

  const runCode = () => {
    try {
      let result = "";

      // custom console.log()
      const fakeConsole = {
        log: (...args) => {
          result += args.join(" ") + "\n";
        }
      };

      const sandboxFn = new Function("console", code);
      sandboxFn(fakeConsole);

      setOutput(result || "(no output)");
    } catch (e) {
      setOutput("❌ Error: " + e.message);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  // syntax highlight
  const highlighted = Prism.highlight(
    code,
    Prism.languages[language] || Prism.languages.javascript,
    language
  );

  return (
    <div className="relative w-full group my-4">

      {/* Toolbar */}
      <div className="flex justify-between bg-slate-800/70 
                      px-3 py-1 rounded-t-xl border border-slate-700 text-xs">
        <span className="text-slate-400 font-mono">{fileName || "example.js"}</span>
        <span className="text-slate-500 uppercase tracking-wider">
          {language}
        </span>
      </div>

      {/* Code */}
      <pre className="rounded-b-xl border border-slate-700 bg-slate-900/70 p-4 
                      text-sm overflow-x-auto whitespace-pre-wrap leading-6">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>

      {/* Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={copyCode}
          className="px-3 py-1 text-xs rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        {language === "javascript" && (
          <button
            onClick={runCode}
            className="px-3 py-1 text-xs rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white"
          >
            Run
          </button>
        )}
      </div>

      {/* Output window */}
      {output !== "" && (
        <div className="mt-2 bg-black/40 border border-slate-700 rounded-lg p-3 text-green-300 text-xs whitespace-pre-wrap">
          <b className="text-sky-300">Output:</b>
          <br />
          {output}
        </div>
      )}
    </div>
  );
}
