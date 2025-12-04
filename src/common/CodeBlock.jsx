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

// Icons
import { Copy, Check, Play, Download, Moon, Sun, FileCode } from "lucide-react";

export default function CodeBlock({
  code = "",
  initialCode = "",
  language = "javascript",
  fileName = "example.js",
  showRun = true,
}) {
  const finalCode = initialCode || code;

  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [output, setOutput] = useState("");
  const [highlighted, setHighlighted] = useState("");

  // highlight + fix multiline code
  useEffect(() => {
    const html = Prism.highlight(
      finalCode,
      Prism.languages[language] || Prism.languages.javascript,
      language
    );
    setHighlighted(html);
  }, [finalCode, language, theme]);

  const copyCode = () => {
    navigator.clipboard.writeText(finalCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const runCode = () => {
    if (language !== "javascript") {
      setOutput("⚠ CodeBlock: Only JavaScript can be executed.");
      return;
    }

    try {
      let result = "";
      const fakeConsole = {
        log: (...args) => (result += args.join(" ") + "\n"),
      };

      const fn = new Function("console", finalCode);
      fn(fakeConsole);

      setOutput(result || "(no output)");
    } catch (err) {
      setOutput("❌ Error: " + err.message);
    }
  };

  const downloadCode = () => {
    const ext =
      language === "javascript"
        ? "js"
        : language === "html"
        ? "html"
        : language === "css"
        ? "css"
        : "txt";

    const blob = new Blob([finalCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.${ext}`;
    a.click();
  };

  return (
    <div
      className={`my-6 border rounded-xl overflow-hidden shadow-xl ${
        theme === "dark"
          ? "bg-[#0f172a] border-slate-700"
          : "bg-white border-slate-300"
      }`}
    >
      {/* HEADER */}
      <div
        className={`flex items-center justify-between px-4 py-2 text-xs border-b ${
          theme === "dark"
            ? "bg-slate-800 border-slate-700 text-slate-300"
            : "bg-slate-200 border-slate-300 text-slate-800"
        }`}
      >
        <div className="flex gap-2 items-center">
          <FileCode size={14} />
          <span className="font-mono">{fileName}</span>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1 rounded hover:bg-slate-700/40"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button onClick={copyCode} className="p-1 rounded hover:bg-slate-700/40">
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          <button onClick={downloadCode} className="p-1 rounded hover:bg-slate-700/40">
            <Download size={16} />
          </button>

          {showRun && language === "javascript" && (
            <button
              onClick={runCode}
              className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <Play size={16} />
            </button>
          )}
        </div>
      </div>

      {/* CODE BLOCK */}
      <pre className="p-4 overflow-auto text-sm leading-6">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>

      {/* OUTPUT */}
      {output && (
        <div className="bg-black text-green-300 text-xs p-3 border-t border-slate-700 whitespace-pre-wrap">
          <b className="text-sky-300">Output:</b>
          <br />
          {output}
        </div>
      )}
    </div>
  );
}
