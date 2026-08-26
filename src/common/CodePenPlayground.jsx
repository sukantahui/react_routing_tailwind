import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Play,
  Terminal,
} from "lucide-react";

export default function CodePenPlayground({
  initialHTML = `<h1 id="title">Hello Baba</h1>
<button onclick="changeTitle()">Click Me</button>`,
  initialCSS = `h1 { color: red; font-family: system-ui; }`,
  initialJS = `
function changeTitle() {
  document.getElementById("title").innerText = "Button Working!";
  alert("Hello Baba ❤️");
  console.log("Button clicked");
}
`,
}) {
  const [html, setHtml] = useState(initialHTML);
  const [css, setCss] = useState(initialCSS);
  const [js, setJs] = useState(initialJS);

  const [activeTab, setActiveTab] = useState("html");
  const [autoRun, setAutoRun] = useState(true);
  const [consoleLog, setConsoleLog] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);

  // ================================================
  // AUTO-GLOBALIZE JS (functions become window.fn)
  // ================================================
  function autoGlobalize(code) {
    let output = code;
    let extras = "";

    // Normal functions: function hello() { }
    const fnRegex = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/g;
    let match;
    while ((match = fnRegex.exec(code)) !== null) {
      extras += `window.${match[1]} = ${match[1]};\n`;
    }

    // Arrow functions: const hello = () => { }
    const arrowRegex = /const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*\(/g;
    while ((match = arrowRegex.exec(code)) !== null) {
      extras += `window.${match[1]} = ${match[1]};\n`;
    }

    return output + "\n\n" + extras;
  }

  // ===========
  // CONSOLE CAPTURE
  // ===========
  window.__penConsole = (type, args) => {
    setConsoleLog((prev) => [
      ...prev,
      { type, message: args.map(String).join(" ") },
    ]);
  };

  // ===========
  // RUN CODE
  // ===========
  const runCode = () => {
    setConsoleLog([]);

    const doc = `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>

${html}

<script>
  if (!window.__consoleHooked__) {
    window.__consoleHooked__ = true;

    var parentConsole = window.parent.__penConsole;
    console.log = (...args) => parentConsole("log", args);
    console.error = (...args) => parentConsole("error", args);
    console.warn = (...args) => parentConsole("warn", args);
  }
<\/script>

<script>
  try {
    ${autoGlobalize(js)}
  } catch (err) {
    console.error(err);
  }
<\/script>

</body>
</html>
`;

    // ⭐ THIS FIXES EVERYTHING (onclick works)
    iframeRef.current.srcdoc = doc;
  };

  // Auto-run on changes
  useEffect(() => {
    if (!autoRun) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(runCode, 500);
  }, [html, css, js]);

  // Run once on mount
  useEffect(() => {
    runCode();
  }, []);

  const downloadAsZip = async () => {
    const zip = new JSZip();
    zip.file("index.html", html);
    zip.file("style.css", css);
    zip.file("script.js", js);

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "codepen-project.zip");
  };

  const reset = () => {
    setHtml(initialHTML);
    setCss(initialCSS);
    setJs(initialJS);
    runCode();
  };

  const renderEditor = () => {
    const lang =
      activeTab === "html"
        ? "html"
        : activeTab === "css"
        ? "css"
        : "javascript";

    const val =
      activeTab === "html" ? html : activeTab === "css" ? css : js;

    const setter =
      activeTab === "html" ? setHtml : activeTab === "css" ? setCss : setJs;

    return (
      <Editor
        height={isFullscreen ? "88vh" : "320px"}
        language={lang}
        theme="vs-dark"
        value={val}
        onChange={(v) => setter(v)}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    );
  };

  return (
    <div
      className={`border border-slate-700 rounded-xl bg-slate-900 ${
        isFullscreen ? "fixed inset-0 z-[9999]" : ""
      }`}
    >
      {/* HEADER */}
      <div className="p-3 flex justify-between items-center bg-slate-800 text-slate-200">

        {/* TABS */}
        <div className="flex gap-2">
          {["html", "css", "js"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1 rounded ${
                activeTab === t ? "bg-sky-600" : "bg-slate-700"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <button onClick={reset} className="px-2 py-1 rounded bg-gray-600 flex items-center gap-1">
            <RotateCcw size={14} /> Reset
          </button>

          <button
            onClick={() => setAutoRun(!autoRun)}
            className={`px-2 py-1 rounded ${
              autoRun ? "bg-green-700" : "bg-green-600"
            }`}
          >
            Auto
          </button>

          <button onClick={runCode} className="px-2 py-1 rounded bg-emerald-600 flex items-center gap-1">
            <Play size={14} /> Run
          </button>

          <button onClick={downloadAsZip} className="px-2 py-1 rounded bg-indigo-600">
            ZIP
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-2 py-1 rounded bg-purple-600"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* EDITOR */}
      {renderEditor()}

      {/* PREVIEW + CONSOLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-slate-700">

        {/* LIVE PREVIEW FRAME */}
        <div className="bg-black border-r border-slate-700">
          <iframe
            ref={iframeRef}
            className="w-full h-[300px] bg-white"
            sandbox="allow-scripts allow-same-origin allow-modals allow-pointer-lock allow-popups allow-forms"
            title="preview"
          />
        </div>

        {/* CONSOLE */}
        <div className="bg-slate-900 text-slate-200 p-2 text-xs">
          <div className="flex gap-2 items-center mb-1 text-orange-400">
            <Terminal size={14} /> Console
          </div>

          <div className="h-[270px] overflow-auto bg-black p-2 rounded">
            {consoleLog.length === 0 && <div className="text-slate-600">No output yet.</div>}

            {consoleLog.map((line, i) => (
              <pre
                key={i}
                className={
                  line.type === "error"
                    ? "text-red-400"
                    : line.type === "warn"
                    ? "text-yellow-300"
                    : "text-green-300"
                }
              >
                {line.message}
              </pre>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
