import React, { useState } from "react";

// -------------------- Helper Functions --------------------
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// -------------------- K-map Grid Component (Screen) --------------------
function KmapGrid({ minterms = [], dc = [], groups = [], variables = 4 }) {
  const rows = ["00", "01", "11", "10"]; // AB
  const cols = ["00", "01", "11", "10"]; // CD

  const getCellIndex = (row, col) => {
    const ab = parseInt(row, 2);
    const cd = parseInt(col, 2);
    return ab * 4 + cd;
  };

  const getCellType = (row, col) => {
    const idx = getCellIndex(row, col);
    if (minterms.includes(idx)) return "one";
    if (dc.includes(idx)) return "dc";
    return "zero";
  };

  const getGroupId = (row, col) => {
    const idx = getCellIndex(row, col);
    if (!groups) return null;
    for (let gid = 0; gid < groups.length; gid++) {
      if (groups[gid].cells && groups[gid].cells.includes(idx)) return gid;
    }
    return null;
  };

  const groupColors = [
    "bg-red-200/70", "bg-green-200/70", "bg-blue-200/70",
    "bg-yellow-200/70", "bg-purple-200/70", "bg-pink-200/70"
  ];

  return (
    <div className="overflow-x-auto my-4">
      <table className="border-collapse border border-gray-600 text-center text-sm mx-auto">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-800">AB \ CD</th>
            {cols.map(c => <th key={c} className="border p-2 bg-gray-800">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row}>
              <th className="border p-2 bg-gray-800">{row}</th>
              {cols.map(col => {
                const idx = getCellIndex(row, col);
                const type = getCellType(row, col);
                const gid = getGroupId(row, col);
                const bgClass = gid !== null ? groupColors[gid % groupColors.length] : "";
                let content = "";
                if (type === "one") content = "1";
                else if (type === "dc") content = "X";
                else content = "0";
                return (
                  <td
                    key={col}
                    className={`border p-3 font-mono ${bgClass} ${type === "one" ? "font-bold" : ""}`}
                    title={`Cell ${idx}`}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// -------------------- Main Component --------------------
export default function BooleanAlgebraPracticeTemplate({ data }) {
  const [showAns, setShowAns] = useState([]);
  const [section, setSection] = useState("all");
  const [limit, setLimit] = useState(15);
  const [started, setStarted] = useState(false);
  const [sessionQ, setSessionQ] = useState([]);

  if (!data || !data.sections) {
    return <p className="p-4 text-red-400">No questions found.</p>;
  }

  // Flatten all questions with section info
  const allQuestions = data.sections.flatMap((sec) =>
    sec.questions.map((q) => ({
      ...q,
      sectionName: sec.section,
      sectionType: sec.type,
      marks: q.marks !== undefined ? q.marks : sec.marksPerQuestion,
    }))
  );

  const uniqueSections = [
    "all",
    ...new Set(data.sections.map((sec) => sec.section)),
  ];

  const filteredBySection =
    section === "all"
      ? allQuestions
      : allQuestions.filter((q) => q.sectionName === section);

  function toggle(id) {
    setShowAns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // ---------- Print Handler (supports both Boolean & K-map) ----------
  const handlePrint = () => {
    if (!sessionQ.length) return;

    const org = {
      name: "Coder & AccoTax",
      phone: "+91 7003756860",
      website: "https://codernaccotax.co.in",
    };
    const stampUrl = `${window.location.origin}/assets/cnat-stamp.png`;
    const title = `${data.title}`;

    // Helper to generate K-map HTML table for a question (same logic as component)
    const renderKmapHtml = (q) => {
      const rows = ["00", "01", "11", "10"];
      const cols = ["00", "01", "11", "10"];
      const getCellIndex = (row, col) => parseInt(row, 2) * 4 + parseInt(col, 2);

      let html = '<table class="kmap-print" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; margin: 10px 0; font-family: monospace;">';
      html += '<thead><tr><th style="background:#f0f0f0;">AB\\CD</th>';
      cols.forEach(c => { html += `<th style="background:#f0f0f0;">${c}</th>`; });
      html += '</tr></thead><tbody>';
      rows.forEach(row => {
        html += `<tr><th style="background:#f0f0f0;">${row}</th>`;
        cols.forEach(col => {
          const idx = getCellIndex(row, col);
          let content = "";
          if (q.minterms && q.minterms.includes(idx)) content = "1";
          else if (q.dc && q.dc.includes(idx)) content = "X";
          else content = "0";
          // Highlight if cell belongs to any group (optional)
          let groupClass = "";
          if (q.steps) {
            for (let step of q.steps) {
              if (step.cells && step.cells.includes(idx)) {
                groupClass = "kmap-group";
                break;
              }
            }
          }
          html += `<td class="${groupClass}" style="text-align:center; ${groupClass ? 'background:#e6f7e6;' : ''}">${content}</td>`;
        });
        html += '</tr>';
      });
      html += '</tbody></table>';
      return html;
    };

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
              padding: 0;
              font-size: 10pt;
              line-height: 1.4;
            }
            .print-header {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              background: white;
              text-align: center;
              font-size: 9pt;
              font-family: Arial, Helvetica, sans-serif;
              padding: 0.4cm 0;
              border-bottom: 2px solid #aaa;
              z-index: 1000;
            }
            .spacer {
              height: 1.4cm;
            }
            .main-content {
              padding: 0.4cm 1.2cm 1.2cm 1.2cm;
            }
            .header {
              text-align: center;
              margin-bottom: 1rem;
              border-bottom: 1px solid #aaa;
              padding-bottom: 0.5rem;
            }
            .header h1 { font-size: 18pt; margin-bottom: 0.2rem; }
            .header p { font-size: 10pt; color: #333; }
            @page {
              size: A4;
              margin: 1.8cm 1.2cm 1.2cm 1.2cm;
              @bottom-center {
                content: "Page " counter(page) " of " counter(pages);
                font-family: Arial, sans-serif;
                font-size: 8pt;
              }
            }
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
            .section-badge {
              display: inline-block;
              background: #e2e8f0;
              color: #1e293b;
              font-size: 8pt;
              padding: 0.1rem 0.4rem;
              border-radius: 10px;
              font-family: monospace;
              margin-bottom: 0.3rem;
            }
            .marks {
              display: inline-block;
              background: #facc15;
              color: #1e1e1e;
              font-size: 8pt;
              padding: 0.1rem 0.4rem;
              border-radius: 10px;
              margin-left: 8px;
            }
            .step {
              margin-left: 1rem;
              margin-top: 0.4rem;
              border-left: 2px solid #94a3b8;
              padding-left: 0.8rem;
            }
            .step-action { font-weight: bold; color: #2563eb; }
            .step-expression { font-family: 'Courier New', monospace; background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; }
            .step-law { font-style: italic; color: #4b5563; }
            .answer-section {
              margin-top: 0.5rem;
              background: #faf9f5;
              padding: 0.6rem;
              border-left: 3px solid #2c7da0;
              font-size: 9.5pt;
            }
            .stamp {
              position: fixed;
              bottom: 1.2cm;
              right: 1.2cm;
              width: 300px;
              opacity: 0.38;
              pointer-events: none;
              z-index: 9999;
              transform: rotate(-21deg);
            }
            table.kmap-print {
              border-collapse: collapse;
              margin: 10px 0;
            }
            table.kmap-print th, table.kmap-print td {
              border: 1px solid #333;
              padding: 6px 10px;
              text-align: center;
              font-family: monospace;
            }
            table.kmap-print th {
              background: #f0f0f0;
            }
            .kmap-group {
              background-color: #e6f7e6 !important;
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            📘 ${org.name} &nbsp;|&nbsp; 📞 ${org.phone} &nbsp;|&nbsp; 🌐 ${org.website}
          </div>
          <img src="${stampUrl}" class="stamp" alt="CNAT Stamp" />
          <div class="spacer"></div>
          <div class="main-content">
            <div class="header">
              <h1>${escapeHtml(data.title)}</h1>
              <p>${escapeHtml(data.subject)} • Class ${escapeHtml(data.class)} • ${escapeHtml(data.board)}</p>
              <p>Duration: ${escapeHtml(data.duration)} | Total Marks: ${data.totalMarks}</p>
              <p>Questions in this set: ${sessionQ.length}</p>
            </div>
            ${sessionQ
              .map(
                (q, idx) => `
              <div class="question-card">
                <div>
                  <span class="section-badge">${escapeHtml(q.sectionName)}</span>
                  <span class="marks">${q.marks} marks</span>
                </div>
                <div class="question-title">Q${idx + 1}. ${escapeHtml(q.q)}</div>
                <div class="answer-section">
                  ${
                    q.type === "kmap"
                      ? `
                        <div><strong>🗺️ Karnaugh Map:</strong></div>
                        ${renderKmapHtml(q)}
                        ${
                          q.steps && q.steps.length
                            ? `<div><strong>📝 Grouping steps:</strong></div>
                               ${q.steps
                                 .map(
                                   (step) => `
                                   <div class="step">
                                     <div class="step-action">Step ${step.step}: ${escapeHtml(step.action)}</div>
                                     ${step.term ? `<div><strong>Resulting term:</strong> ${escapeHtml(step.term)}</div>` : ""}
                                     ${step.law ? `<div class="step-law">Law: ${escapeHtml(step.law)}</div>` : ""}
                                   </div>
                                 `
                                 )
                                 .join("")}
                             `
                            : ""
                        }
                        <div><strong>✨ Simplified expression:</strong> ${escapeHtml(q.answer)}</div>
                        ${
                          q.explanation
                            ? `<div><strong>💡 Explanation:</strong> ${escapeHtml(q.explanation)}</div>`
                            : ""
                        }
                      `
                      : `
                        ${
                          q.steps && q.steps.length
                            ? `<div><strong>📝 Step-by-step solution:</strong></div>
                               ${q.steps
                                 .map(
                                   (step) => `
                                   <div class="step">
                                     <div class="step-action">Step ${step.step}: ${escapeHtml(step.action)}</div>
                                     <div class="step-expression">${escapeHtml(step.expression)}</div>
                                     <div class="step-law">Law: ${escapeHtml(step.law)}</div>
                                   </div>
                                 `
                                 )
                                 .join("")}
                               <div><strong>✨ Simplified result:</strong> ${escapeHtml(q.simplified || q.answer)}</div>
                               ${
                                 q.explanation
                                   ? `<div><strong>💡 Explanation:</strong> ${escapeHtml(q.explanation)}</div>`
                                   : ""
                               }
                             `
                            : `
                               <div><strong>📖 Answer:</strong><br/>${escapeHtml(q.answer)}</div>
                               ${
                                 q.explanation
                                   ? `<div><strong>💡 Explanation:</strong><br/>${escapeHtml(q.explanation)}</div>`
                                   : ""
                               }
                             `
                        }
                      `
                  }
                </div>
              </div>
            `
              )
              .join("")}
          </div>
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
            <span className="text-3xl">🧠</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-sky-400 tracking-wide">
              {data.title}
            </h1>
            <p className="text-sm text-zinc-400">
              {data.subject} • Class {data.class} • {data.board} •{" "}
              {data.duration} • {data.totalMarks} marks
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-400">Section</span>
            <select
              value={section}
              onChange={(e) => {
                setSection(e.target.value);
                setStarted(false);
              }}
              className="bg-zinc-900 border border-zinc-700 p-2 rounded-md"
            >
              {uniqueSections.map((sec, i) => (
                <option key={i} value={sec}>
                  {sec === "all" ? "All Sections" : sec}
                </option>
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
              {[5, 10, 15, 20, 30, 40].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowAns([]);
                const pool = shuffleArray(filteredBySection);
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
              className={`px-6 py-2 rounded-lg shadow transition ${
                started && sessionQ.length
                  ? "bg-emerald-700 hover:bg-emerald-600 text-white"
                  : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              }`}
            >
              🖨️ Print
            </button>
          </div>
        </div>

        {/* Questions display */}
        {started &&
          sessionQ.map((q, index) => (
            <div
              key={q.id}
              className="bg-zinc-900/80 border border-zinc-800 p-5 mb-6 rounded-2xl shadow-lg hover:shadow-sky-900/30 transition"
            >
              <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                <p className="font-semibold text-zinc-100">
                  Q{index + 1}. {q.q}
                </p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-sky-900 text-sky-300">
                    {q.sectionName}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-amber-800 text-amber-200">
                    {q.marks} marks
                  </span>
                </div>
              </div>

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
                <div className="mt-3 bg-slate-900/70 border border-slate-700 p-4 rounded-xl shadow-inner space-y-3">
                  {q.type === "kmap" ? (
                    <>
                      <div>
                        <p className="text-emerald-300 text-sm font-semibold mb-2">🗺️ Karnaugh Map</p>
                        <KmapGrid
                          minterms={q.minterms || []}
                          dc={q.dc || []}
                          groups={q.steps?.map(step => ({ cells: step.cells || [] })) || []}
                          variables={q.variables || 4}
                        />
                      </div>
                      {q.steps && q.steps.length > 0 && (
                        <div>
                          <p className="text-emerald-300 text-sm font-semibold mb-2">📝 Step-by-step grouping:</p>
                          <div className="space-y-3">
                            {q.steps.map((step, i) => (
                              <div key={i} className="border-l-2 border-sky-500 pl-3">
                                <p className="text-sky-300 text-sm">Step {step.step}: {step.action}</p>
                                {step.term && <p className="text-zinc-200 text-sm">→ Result: {step.term}</p>}
                                {step.law && <p className="text-zinc-400 text-xs italic">Law: {step.law}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="text-emerald-300 text-sm">✨ Simplified expression: <span className="font-mono">{q.answer}</span></p>
                      {q.explanation && <p className="text-slate-300 text-sm">💡 Explanation: {q.explanation}</p>}
                    </>
                  ) : (
                    // Boolean algebra rendering (original)
                    <>
                      {q.steps && q.steps.length ? (
                        <>
                          <p className="text-emerald-300 text-sm font-semibold mb-2">📝 Step-by-step solution:</p>
                          {q.steps.map((step, i) => (
                            <div key={i} className="border-l-2 border-sky-500 pl-3">
                              <p className="text-sky-300 text-sm">Step {step.step}: {step.action}</p>
                              <pre className="bg-slate-950 p-2 rounded-md text-slate-200 text-sm font-mono mt-1">
                                {step.expression}
                              </pre>
                              <p className="text-zinc-400 text-xs italic mt-1">Law: {step.law}</p>
                            </div>
                          ))}
                          {q.simplified && (
                            <p className="text-emerald-300 text-sm">✨ Simplified result: <span className="font-mono">{q.simplified}</span></p>
                          )}
                        </>
                      ) : (
                        <p className="text-slate-200 text-sm leading-relaxed">{q.answer}</p>
                      )}
                      {q.explanation && (
                        <p className="text-slate-300 text-sm leading-relaxed">💡 Explanation: {q.explanation}</p>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

        {!started && (
          <p className="text-center text-zinc-500 mt-10">
            Select a section and number of questions, then click <b>Start Practice</b>.
          </p>
        )}
      </div>
    </div>
  );
}