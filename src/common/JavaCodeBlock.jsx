import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";
import html2canvas from "html2canvas";

// Theme
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-java";

export default function JavaCodeBlock({
  code = "",
  highlightLines = [],
  title = "Java Code (BlueJ)"
}) {
  const [lines, setLines] = useState([]);
  const [copied, setCopied] = useState(false);
  const blockRef = useRef(null);

  useEffect(() => {
    const highlighted = Prism.highlight(code, Prism.languages.java, "java");
    setLines(highlighted.split("\n"));
  }, [code]);

  function copyToClipboard() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function saveAsImage() {
  const padding = 30;
  const lineHeight = 22;
  const font = "14px 'Fira Code', monospace";

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const lines = code.split("\n");
  const width = 900;
  const height = padding * 2 + lines.length * lineHeight;

  canvas.width = width;
  canvas.height = height;

  // Background
  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, width, height);

  // Header bar
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, width, 40);

  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText(`☕ ${title}`, 15, 25);

  // Code text
  ctx.font = font;
  ctx.fillStyle = "#e5e7eb";

  lines.forEach((line, i) => {
    ctx.fillText(line, padding, padding + 40 + i * lineHeight);
  });

  const link = document.createElement("a");
  link.download = "java-code.jpg";
  link.href = canvas.toDataURL("image/jpeg", 0.95);
  link.click();
}




  return (
    <div
      ref={blockRef}
      className="my-5 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black border border-sky-500/10 shadow-[0_0_25px_rgba(56,189,248,0.15)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-semibold text-slate-300 tracking-wide">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="ml-3 text-sky-400">☕ {title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 rounded-md text-xs bg-slate-800 hover:bg-sky-600 transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            onClick={saveAsImage}
            className="px-3 py-1 rounded-md text-xs bg-emerald-700 hover:bg-emerald-600 transition"
          >
            Save JPG
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="flex text-sm leading-6 font-mono overflow-auto">
        <div className="px-4 py-3 text-right select-none text-slate-600 border-r border-slate-800 bg-slate-950/80">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <pre className="flex-1 px-4 py-3 whitespace-pre">
          <code>
            {lines.map((line, i) => (
              <div
                key={i}
                className={
                  highlightLines.includes(i + 1)
                    ? "bg-yellow-400/10 border-l-2 border-yellow-400 pl-3"
                    : "pl-3"
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
