import React, { useState } from "react";
import PythonCodeBlock from "../../common/PythonCodeBlock";  // <-- only change

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export default function PythonShortQuestionPracticeTemplate({ data }) {
    const [showAns, setShowAns] = useState([]);
    const [topic, setTopic] = useState("all");
    const [limit, setLimit] = useState(50);
    const [started, setStarted] = useState(false);
    const [sessionQ, setSessionQ] = useState([]);

    if (!data || !data.questions)
        return <p className="p-4 text-red-400">No questions found.</p>;

    const uniqueTopics = [...new Set(data.questions.map((q) => q.topic))];

    const filteredByTopic =
        topic === "all"
            ? data.questions
            : data.questions.filter((q) => q.topic === topic);

    function toggle(id) {
        setShowAns((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    // Helper to escape HTML
    const escapeHtml = (str) => {
        if (!str) return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    };

    // ========== PRINT HANDLER (same as Java version, with watermark) ==========
    const handlePrint = () => {
        if (!sessionQ.length) return;

        const title = `${data.subject} – ${data.topic} (${data.class}, ${data.board})`;
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${escapeHtml(title)}</title>
        <meta charset="UTF-8" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Georgia', 'Times New Roman', Times, serif;
            background: white;
            color: black;
            margin: 0;
            padding: 1.8cm 1.2cm 1.2cm 1.2cm;
            font-size: 10pt;
            line-height: 1.4;
            position: relative;
          }
          .print-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: white;
            text-align: center;
            font-size: 9pt;
            padding: 0.4cm 0;
            border-bottom: 1px solid #aaa;
            font-family: Arial, sans-serif;
            z-index: 1000;
          }
          @page {
            size: A4;
            margin: 1.8cm 1.2cm 1.2cm 1.2cm;
            @bottom-center {
              content: "Page " counter(page) " of " counter(pages);
              font-family: Arial, sans-serif;
              font-size: 8pt;
            }
          }
          body { padding-top: 1.2cm; }
          .header {
            text-align: center;
            margin-bottom: 1rem;
            border-bottom: 1px solid #aaa;
            padding-bottom: 0.5rem;
          }
          .header h1 { font-size: 18pt; margin-bottom: 0.2rem; }
          .header p { font-size: 10pt; color: #333; }
          .question-card {
            margin-bottom: 1.2rem;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .question-title {
            font-weight: bold;
            font-size: 11pt;
            margin: 0.3rem 0 0.2rem;
          }
          .topic-badge {
            display: inline-block;
            background: #e2e8f0;
            color: #1e293b;
            font-size: 8pt;
            padding: 0.1rem 0.4rem;
            border-radius: 10px;
            font-family: monospace;
            margin-bottom: 0.3rem;
          }
          pre {
            background: #f1f5f9;
            padding: 0.5rem;
            border-radius: 6px;
            overflow-x: auto;
            font-family: 'Courier New', Courier, monospace;
            font-size: 9pt;
            margin: 0.5rem 0;
            border: 1px solid #ddd;
          }
          .answer-section {
            margin-top: 0.5rem;
            background: #faf9f5;
            padding: 0.6rem;
            border-left: 3px solid #2c7da0;
            font-size: 9.5pt;
          }
          .watermark {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.08;
            font-size: 10rem;
            font-weight: bold;
            font-family: Arial, sans-serif;
            color: black;
            transform: rotate(-45deg);
            white-space: pre;
            user-select: none;
          }
          .print-header, .header, .question-card {
            position: relative;
            z-index: 1;
          }
          @media print {
            .print-header {
              background: white !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .topic-badge, .answer-section {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .watermark {
              opacity: 0.08;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="watermark">CNAT</div>
        <div class="print-header">
          <div>
            📘 Coder & AccoTax | 📞 7003756860 | 🌐 https://codernaccotax.co.in
          </div>
        </div>
        <div class="header">
          <h1>${escapeHtml(data.topic)}</h1>
          <p>${escapeHtml(data.subject)} • Class ${escapeHtml(data.class)} • ${escapeHtml(data.board)}</p>
          <p>Total Questions: ${sessionQ.length}</p>
        </div>
        ${sessionQ
                .map(
                    (q, idx) => `
          <div class="question-card">
            <div class="topic-badge">${escapeHtml(q.topic)}</div>
            <div class="question-title">Q${idx + 1}. ${escapeHtml(q.question)}</div>
            ${q.code ? `<pre><code>${escapeHtml(q.code)}</code></pre>` : ""}
            <div class="answer-section">
              ${q.code
                            ? `
                  <div><span class="output-label">📤 Output:</span>
                  <pre><code>${escapeHtml(q.output)}</code></pre></div>
                  <div><strong>💡 Explanation:</strong><br/>${escapeHtml(q.explanation)}</div>
                `
                            : `<div><strong>📖 Answer:</strong><br/>${escapeHtml(q.answer)}</div>`
                        }
            </div>
          </div>
        `
                )
                .join("")}
      </body>
    </html>
  `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-zinc-200 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-[0_0_30px_rgba(56,189,248,0.35)] ring-1 ring-sky-500/40">
                        <img
                            src={data.subjectLogo?.path}
                            alt={data.subjectLogo?.alt || "Logo"}
                            className="w-12 h-12 object-contain dark:invert dark:brightness-125 dark:contrast-125 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-sky-400 tracking-wide">{data.topic}</h1>
                        <p className="text-sm text-zinc-400">{data.subject} • Class {data.class} • {data.board}</p>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl mb-8 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-zinc-400">Topic</span>
                        <select
                            value={topic}
                            onChange={(e) => {
                                setTopic(e.target.value);
                                setStarted(false);
                            }}
                            className="bg-zinc-900 border border-zinc-700 p-2 rounded-md"
                        >
                            <option value="all">All</option>
                            {uniqueTopics.map((t, i) => (
                                <option key={i} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm text-zinc-400">Questions</span>
                        <select
                            value={limit}
                            onChange={(e) => {
                                const val = e.target.value;
                                setLimit(val === "all" ? "all" : Number(val));
                                setStarted(false);
                            }}
                            className="bg-zinc-900 border border-zinc-700 p-2 rounded-md"
                        >
                            <option value="all">All</option>
                            {[5, 10, 20, 30, 40, 50].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setShowAns([]);
                                const pool = shuffleArray(filteredByTopic);
                                setSessionQ(limit === "all" ? pool : pool.slice(0, limit));
                                setStarted(true);
                            }}
                            className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg shadow"
                        >
                            Start Practice
                        </button>
                        <button
                            onClick={handlePrint}
                            disabled={!started || sessionQ.length === 0}
                            className={`px-6 py-2 rounded-lg shadow transition ${started && sessionQ.length
                                    ? "bg-emerald-700 hover:bg-emerald-600 text-white"
                                    : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                                }`}
                        >
                            🖨️ Print
                        </button>
                    </div>
                </div>

                {/* Questions */}
                {started &&
                    sessionQ.map((q, index) => (
                        <div
                            key={q.id}
                            className="bg-zinc-900/80 border border-zinc-800 p-5 mb-6 rounded-2xl shadow-lg hover:shadow-sky-900/30 transition"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-semibold text-zinc-100">Q{index + 1}. {q.question}</p>
                                <span className="text-xs px-2 py-1 rounded bg-sky-900 text-sky-300">{q.topic}</span>
                            </div>
                            {q.code && (
                                <div className="mb-3">
                                    <PythonCodeBlock code={q.code} />
                                </div>
                            )}
                            <button
                                onClick={() => toggle(q.id)}
                                className="mt-2 p-2 rounded-full border border-sky-500/40 bg-slate-900 hover:bg-sky-700/40 transition"
                            >
                                {showAns.includes(q.id) ? (
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.05 11.05 0 014.95-5.9M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.12 5.88L3 3" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.5 0S18.27 4.5 12 4.5 1.5 12 1.5 12 5.73 19.5 12 19.5 22.5 12 22.5 12z" />
                                    </svg>
                                )}
                            </button>
                            {showAns.includes(q.id) && (
                                <div className="mt-3 bg-slate-900/70 border border-slate-700 p-4 rounded-xl shadow-inner space-y-2">
                                    {q.code ? (
                                        <>
                                            <div>
                                                <p className="text-emerald-300 text-sm font-semibold">Output:</p>
                                                <pre className="bg-slate-950 p-2 rounded-lg text-slate-200 text-sm">{q.output}</pre>
                                            </div>
                                            <p className="text-slate-300 text-sm leading-relaxed"><b>Explanation:</b> {q.explanation}</p>
                                        </>
                                    ) : (
                                        <p className="text-slate-200 text-sm leading-relaxed">{q.answer}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                {!started && (
                    <p className="text-center text-zinc-500 mt-10">
                        Select topic & number of questions, then click <b>Start Practice</b>.
                    </p>
                )}
            </div>
        </div>
    );
}