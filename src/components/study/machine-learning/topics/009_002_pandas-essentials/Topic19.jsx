import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic19_files/01_to_csv_index_and_formatting.py?raw";
import pyCode2 from "./topic19_files/02_delimiters_encoding_and_na_rep.py?raw";
import pyCode3 from "./topic19_files/03_compression_and_chunked_export.py?raw";
import noteText from "./topic19_files/topic19_note.txt?raw";
import questions from "./topic19_files/topic19_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_to_csv_index_and_formatting.py",
    title: "1. to_csv(index=False) & Column Subsets",
    badge: "index=False & float_format",
    code: pyCode1,
    summary: "Prevent the 'Unnamed: 0' index bug using index=False, filter exported columns with columns=[...], and format float precision.",
  },
  {
    id: "part2",
    fileName: "02_delimiters_encoding_and_na_rep.py",
    title: "2. Delimiters, Encodings & Missing Values",
    badge: "sep, encoding, na_rep",
    code: pyCode2,
    summary: "Configure custom separators (TSV, pipe), specify utf-8-sig for Excel compatibility, and define custom missing value representations.",
  },
  {
    id: "part3",
    fileName: "03_compression_and_chunked_export.py",
    title: "3. On-the-Fly Compression & Append Mode",
    badge: "gzip & mode='a'",
    code: pyCode3,
    summary: "Export directly into gzip-compressed archives (.csv.gz) and stream batch records into existing files using append mode (mode='a').",
  },
];

const EXPORT_SAMPLE_DATA = [
  { id: 101, name: "Debangshu", locality: "Barrackpore", math: 85.556, sci: 90.0 },
  { id: 102, name: "Susmita",   locality: "Shyamnagar",  math: 92.125, sci: 95.5 },
  { id: 103, name: "Swadeep",   locality: null,          math: 65.0,   sci: 70.25 },
  { id: 104, name: "Tuhina",    locality: "Naihati",      math: 88.75,  sci: 85.0 },
  { id: 105, name: "Sachin",    locality: "Kolkata",      math: 78.2,   sci: 80.5 },
];

const Topic19 = () => {
  const [activeTab, setActiveTab] = useState("export_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");

  // Export Settings State
  const [includeIndex, setIncludeIndex] = useState(false);
  const [delimiter, setDelimiter] = useState(",");
  const [naRepresentation, setNaRepresentation] = useState("N/A");
  const [precision, setPrecision] = useState("%.2f");
  const [includeLocality, setIncludeLocality] = useState(true);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Generate Raw CSV Text Live
  const generateCsvOutput = () => {
    const delimChar = delimiter === "\\t" ? "\t" : delimiter;
    const headers = [];
    if (includeIndex) headers.push("");
    headers.push("StudentID", "Name");
    if (includeLocality) headers.push("Locality");
    headers.push("Math", "Science");

    const lines = [headers.join(delimChar)];

    EXPORT_SAMPLE_DATA.forEach((row, idx) => {
      const parts = [];
      if (includeIndex) parts.push(idx);
      parts.push(row.id);
      parts.push(row.name);
      if (includeLocality) {
        parts.push(row.locality === null ? naRepresentation : row.locality);
      }
      parts.push(
        precision === "%.2f" ? row.math.toFixed(2) : precision === "%.1f" ? row.math.toFixed(1) : row.math
      );
      parts.push(
        precision === "%.2f" ? row.sci.toFixed(2) : precision === "%.1f" ? row.sci.toFixed(1) : row.sci
      );
      lines.push(parts.join(delimChar));
    });

    return lines.join("\n");
  };

  const rawCsvText = generateCsvOutput();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-900/40 via-green-900/30 to-slate-900/60 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Data Persistence &amp; I/O
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 19</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Exporting Data to CSV in Pandas (df.to_csv)
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Persist clean DataFrames reliably: eliminate the 'Unnamed: 0' bug with{" "}
                <code className="text-emerald-300 bg-slate-800 px-1 py-0.5 rounded">index=False</code>, customize delimiters and missing value representations, format float precision, and save compressed archives.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-emerald-500/20">
                💾 CSV
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("export_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "export_studio"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            💾 CSV Export Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: EXPORT STUDIO */}
        {activeTab === "export_studio" && (
          <div className="space-y-6">
            {/* Export Configuration Controls */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>⚙️</span> Configure df.to_csv() Arguments
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Index Toggle */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    1. Row Index (index=...)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIncludeIndex(false)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        !includeIndex
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                          : "bg-slate-900 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      index=False (Best)
                    </button>
                    <button
                      onClick={() => setIncludeIndex(true)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        includeIndex
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                          : "bg-slate-900 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      index=True
                    </button>
                  </div>
                </div>

                {/* Delimiter Selector */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    2. Delimiter (sep=...)
                  </label>
                  <select
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-300 font-mono focus:outline-none"
                  >
                    <option value=",">Comma (',') [Standard CSV]</option>
                    <option value="\t">Tab ('\t') [TSV]</option>
                    <option value="|">Pipe ('|')</option>
                    <option value=";">Semicolon (';') [European]</option>
                  </select>
                </div>

                {/* Missing Value Representation */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    3. Missing Values (na_rep=...)
                  </label>
                  <select
                    value={naRepresentation}
                    onChange={(e) => setNaRepresentation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-300 font-mono focus:outline-none"
                  >
                    <option value="">Empty String ("") [Default]</option>
                    <option value="N/A">"N/A"</option>
                    <option value="NULL">"NULL"</option>
                    <option value="MISSING">"MISSING"</option>
                  </select>
                </div>

                {/* Floating Precision */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    4. Precision (float_format=...)
                  </label>
                  <select
                    value={precision}
                    onChange={(e) => setPrecision(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-300 font-mono focus:outline-none"
                  >
                    <option value="%.2f">2 Decimals ('%.2f')</option>
                    <option value="%.1f">1 Decimal ('%.1f')</option>
                    <option value="raw">Raw Floats</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Python Command */}
              <div className="mt-4 p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                <span className="text-slate-500"># Executed Python command:</span>
                <div className="mt-1 font-bold">
                  {`df.to_csv('students_export.csv', index=${includeIndex ? "True" : "False"}, sep='${delimiter}'${naRepresentation ? `, na_rep='${naRepresentation}'` : ""}${precision !== "raw" ? `, float_format='${precision}'` : ""}, encoding='utf-8')`}
                </div>
              </div>
            </div>

            {/* Warning Box if index=True */}
            {includeIndex && (
              <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h4 className="text-sm font-bold text-rose-300">Warning: Unnamed: 0 Column Risk</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Setting <code className="text-rose-400 font-mono">index=True</code> writes a blank header with row numbers 0, 1, 2... When this file is later read back using <code className="text-teal-300 font-mono">pd.read_csv()</code>, Pandas will create a redundant <code className="text-rose-400 font-mono">'Unnamed: 0'</code> column!
                  </p>
                </div>
              </div>
            )}

            {/* Live Raw CSV File Output Preview */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <span>📄</span> Live File Preview (<code className="text-xs text-emerald-400 font-mono">students_export.csv</code>)
                </h3>
                <span className="text-xs font-mono text-slate-400">{rawCsvText.length} bytes</span>
              </div>
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre">
                {rawCsvText}
              </pre>
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Production Data Pipelines & Export Best Practices"
              text="In industrial data engineering, exporting datasets properly prevents countless downstream headaches! Always use df.to_csv(..., index=False, encoding='utf-8-sig') so business stakeholders using Microsoft Excel can open the file without scrambled Unicode characters or phantom 'Unnamed: 0' columns. For datasets exceeding 1 GB, switch from CSV to df.to_parquet() for 5x compression and 10x faster I/O!"
            />
          </div>
        )}

        {/* TAB 2: PYTHON CODE LAB */}
        {activeTab === "python_code" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PYTHON_SCRIPTS.map((script) => (
                <button
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedScriptId === script.id
                      ? "bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                    {script.badge}
                  </div>
                  <div className="font-bold text-sm text-slate-100">{script.title}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">{script.summary}</div>
                </button>
              ))}
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <h3 className="text-md font-bold text-white font-mono">{activeScript.fileName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{activeScript.summary}</p>
                </div>
              </div>
              <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
            </div>
          </div>
        )}

        {/* TAB 3: NOTES */}
        {activeTab === "theory_notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <PlainTextPrint text={noteText} title="Topic 19 Revision Notes: Exporting Data to CSV" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 19 Knowledge Check: Exporting Data to CSV" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic19;
