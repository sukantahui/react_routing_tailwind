import React, { useEffect, useState, useRef } from "react";
import Prism from "prismjs";
import QRCode from "qrcode";

// Prism theme
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-python";

export default function PythonCodeBlock({
  code = "",
  highlightLines = [],
  title = "Python Code",
  questionId = "X"
}) {
  const [lines, setLines] = useState([]);
  const [copied, setCopied] = useState(false);
  const blockRef = useRef(null);

  useEffect(() => {
    const highlighted = Prism.highlight(code, Prism.languages.python, "python");
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

    const srcLines = code.split("\n");
    const width = 900;
    const height = padding * 2 + srcLines.length * lineHeight + 100;

    canvas.width = width;
    canvas.height = height;

    // Background
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, width, height);

    // Header
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, 42);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(`🐍 ${title}`, 15, 26);

    // Code
    ctx.font = font;
    ctx.fillStyle = "#e5e7eb";

    srcLines.forEach((line, i) => {
      ctx.fillText(line, padding, padding + 45 + i * lineHeight);
    });

    // -------- WATERMARK --------
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.font = "bold 38px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 6);
    ctx.textAlign = "center";
    ctx.fillText("Coder & AccoTax", 0, 0);
    ctx.restore();

    // -------- QR CODE --------
    const qrDataUrl = await QRCode.toDataURL(window.location.href, {
      margin: 0,
      width: 90,
      color: { dark: "#38bdf8", light: "#020617" }
    });

    const qrImg = new Image();
    qrImg.src = qrDataUrl;
    await new Promise(res => (qrImg.onload = res));

    ctx.drawImage(qrImg, width - 110, height - 110, 90, 90);

    // Footer
    ctx.fillStyle = "#64748b";
    ctx.font = "11px sans-serif";
    ctx.fillText("Scan for live practice", width - 145, height - 15);
    ctx.fillText("© Coder & AccoTax – Barrackpore", 15, height - 15);

    const timestamp = new Date()
  .toISOString()
  .replace(/[:.]/g, "-");
  const filename = `Python_Q${questionId}_${timestamp}.jpg`;

    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  }

  return (
    <div className="my-5 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black border border-sky-500/10 shadow-[0_0_25px_rgba(56,189,248,0.15)]">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs text-slate-300">
        <span className="text-sky-400">🐍 {title}</span>

        <div className="flex gap-2">
          <button onClick={copyToClipboard}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-sky-600">
            {copied ? "Copied!" : "Copy"}
          </button>

          <button onClick={saveAsImage}
            className="px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600">
            Save JPG
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="flex text-sm font-mono">
        <div className="px-4 py-3 text-right text-slate-600 border-r border-slate-800">
          {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
        </div>

        <pre className="flex-1 px-4 py-3 whitespace-pre">
          <code>
            {lines.map((line, i) => (
              <div
                key={i}
                className={highlightLines.includes(i + 1)
                  ? "bg-yellow-400/10 border-l-2 border-yellow-400 pl-3"
                  : "pl-3"}
                dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
              />
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
