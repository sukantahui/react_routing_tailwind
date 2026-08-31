"use client";
import React, { useState } from "react";
import { Printer, Copy, Check, Download, Eye, EyeOff } from "lucide-react";

export default function PlainTextPrint({
  content = "",
  filename = "study_note.txt",
  title = "Printable Plain-Text Study Note",
  hidePreview: initialHidePreview = true,
  showDownload = true,
  customPrintLabel = null,
  onCustomPrint = null
}) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(!initialHidePreview);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDefaultPrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(
        "<html><head><title>" +
          filename +
          "</title><style>body { font-family: monospace; padding: 20px; white-space: pre-wrap; word-break: break-all; font-size: 12px; }</style></head><body>" +
          content.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
          "</body></html>"
      );
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const handlePrint = () => {
    if (onCustomPrint) {
      onCustomPrint();
    } else {
      handleDefaultPrint();
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const printBtnText = customPrintLabel || (onCustomPrint ? "Print Question Paper" : "Print Note");

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>🖨️</span> {title}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{filename}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            title={showPreview ? "Hide Preview" : "Show Preview"}
          >
            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{showPreview ? "Hide Text" : "Preview Text"}</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy Note"}</span>
          </button>

          {showDownload && (
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white text-xs font-semibold transition-colors shadow-md"
            >
              <Download size={14} />
              <span>Download .txt</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-lg"
          >
            <Printer size={14} />
            <span>{printBtnText}</span>
          </button>
        </div>
      </div>

      {showPreview && (
        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-emerald-400 font-mono text-xs leading-relaxed overflow-x-auto max-h-96">
          {content}
        </pre>
      )}
    </div>
  );
}
