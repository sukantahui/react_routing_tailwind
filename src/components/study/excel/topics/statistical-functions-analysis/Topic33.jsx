import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic33_files/topic33_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic33() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    if (!sampleDataUrl) return;
    const link = document.createElement("a");
    link.href = sampleDataUrl;
    link.download = "statistical_functions.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section transition-all duration-700 ease-out"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Handling Missing Data and Blanks in Analysis
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            Missing data and blank cells are common in real‑world datasets. How you handle them directly impacts the validity of your statistical summaries (AVERAGE, COUNT, STDEV, etc.). Excel provides several strategies – from ignoring blanks to replacing them with zeros or estimated values.
          </p>
        </header>

        {/* Why Missing Data Matters */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-amber-400">⚠️</span> Why Missing Data Matters
          </h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              Most statistical functions in Excel (AVERAGE, SUM, STDEV.S, etc.) ignore blank cells automatically. However, this can be misleading if blanks actually represent zeros (“absent”, “no sale”) or if they should be excluded entirely. Other functions (COUNTA, SUBTOTAL) treat blanks differently. Understanding these behaviours is critical for accurate analysis.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-amber-500">
              <p className="font-mono text-sm">✅ =AVERAGE(A1:A10) ignores blanks → average of only populated cells</p>
              <p className="font-mono text-sm mt-1">✅ =AVERAGE(IF(A1:A10&lt;&gt;"", A1:A10)) array formula → same effect but explicit</p>
              <p className="font-mono text-sm mt-1">⚠️ =SUM(A1:A10) ignores blanks, but =A1+A2+…+A10 returns #VALUE! if any blank?</p>
            </div>
          </div>
        </section>

        {/* Common Blank‑Handling Scenarios */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 Common Scenarios & Solutions</h2>
          <div className="mt-4 space-y-4 text-gray-200">
            <div>
              <p className="font-semibold text-amber-300">1. Blanks should be treated as zero (e.g., missed exam = 0 marks)</p>
              <p className="ml-4 mt-1">Use a helper column: =IF(ISBLANK(A2), 0, A2). Then sum/average that column. Or use array formula: =AVERAGE(IF(ISBLANK(A2:A10), 0, A2:A10)).</p>
            </div>
            <div>
              <p className="font-semibold text-amber-300">2. Blanks should be ignored (default for AVERAGE, SUM, COUNT, STDEV)</p>
              <p className="ml-4 mt-1">These functions already ignore blanks. No special handling needed, but be aware of the difference vs COUNTBLANK.</p>
            </div>
            <div>
              <p className="font-semibold text-amber-300">3. Blanks should be replaced with a calculated value (mean, median, etc.)</p>
              <p className="ml-4 mt-1">Use =IF(ISBLANK(A2), MEDIAN($A$2:$A$100), A2) to fill missing with median.</p>
            </div>
            <div>
              <p className="font-semibold text-amber-300">4. Counting blanks</p>
              <p className="ml-4 mt-1">Use COUNTBLANK(range). For counting non‑blanks, use COUNTA(range).</p>
            </div>
          </div>
        </section>

        {/* Real‑world Example */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📊 Real-World Use Case</h2>
          <div className="mt-4">
            <p className="text-gray-200">
              <strong>Scenario:</strong> In Barrackpore, a teacher records exam scores but some students were absent (blank cells). She wants to compute the average of those who took the test (ignoring blanks) and also the average if absent students were given a zero (to show class-wide impact).
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr><th className="border px-3 py-2">Student</th><th className="border px-3 py-2">Score</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">85</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">92</td></tr>
                  <tr><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1"></td></tr>
                  <tr><td className="border px-3 py-1">Susmita</td><td className="border px-3 py-1">95</td></tr>
                  <tr><td className="border px-3 py-1">Debangshu</td><td className="border px-3 py-1"></td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-amber-300">AVERAGE(B2:B6) → only 85,92,95 → 90.7</p>
              <p className="mt-1 text-amber-300">Array formula: =AVERAGE(IF(ISBLANK(B2:B6), 0, B2:B6)) → 54.4</p>
            </div>
          </div>
        </section>

        {/* Interactive Excel File Loader */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Interactive Example</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-amber-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“missing_data”</strong> from <code>statistical_functions.xlsx</code> contains columns with blank cells. Practice using AVERAGE, COUNT, COUNTA, COUNTBLANK, and array formulas.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="missing_data" title="Missing Data Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic33_files/excel_files/</code> with sheet “missing_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Assuming AVERAGE treats blanks as zero – it does not; it ignores them.</li>
            <li>Using COUNTA when you need COUNT – COUNTA counts blanks that contain formulas, spaces, etc.</li>
            <li>Forgetting that SUBTOTAL(3, range) (COUNTA) counts visible non‑blanks, while SUBTOTAL(2, range) counts visible numbers only.</li>
            <li>Not checking for cells that appear blank but contain a space or formula that returns "" – COUNTBLANK counts them as non‑blank (though it treats such cells as blank? Actually COUNTBLANK counts truly empty and formulas returning "" as blank).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Document how blanks are treated in your report (e.g., “absent students excluded from average”).</li>
            <li>Use COUNTBLANK(range) to audit data completeness.</li>
            <li>Before averaging, decide whether a blank should be 0 or omitted; use a helper column if needed.</li>
            <li>For large datasets, use IFERROR and IFBLANK in structured references.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you use =AVERAGE(A1:A10) and A1:A10 contains three blanks and seven scores, the average is computed over 7 numbers. That is correct for analysing only the students who took the test. But if the school average is computed across all enrolled students, you need to replace blanks with 0.<br />
            Observe carefully: The choice depends entirely on what question you are asking.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use ISBLANK() in formulas to test explicitly, especially when combining with IF.</li>
            <li>For conditional averages that should treat blanks as zero, use AVERAGE(IF(ISBLANK(range), 0, range)).</li>
            <li>In Excel 365, use the LET function to store a cleaned array: =LET(data, IF(ISBLANK(A2:A100), 0, A2:A100), AVERAGE(data)).</li>
            <li>To quickly replace blanks with 0 in a range: select range → F5 → Special → Blanks → type 0 → Ctrl+Enter.</li>
            <li>Use COUNTBLANK to validate data quality before running any statistical summary.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ AVERAGE, SUM, STDEV ignore blanks</li>
            <li>✅ COUNT counts only numbers; COUNTA counts any non‑blank; COUNTBLANK counts blanks (including formula‑blank)</li>
            <li>✅ Blank vs zero matters – decide per analysis</li>
            <li>✅ Use helper columns or array formulas to substitute zeros</li>
            <li>✅ Check for spaces and "" that masquerade as blanks</li>
            <li>✅ Document missing data handling in reports</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Handling Missing Data – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple column containing numbers and blanks. Ask students: what is the AVERAGE? Use the auto‑calculation in status bar to see AVERAGE, COUNT, COUNTA. Then demonstrate that COUNTA counts non‑blanks (including text). Then show how to replace blanks with zeros using Go To Special. Use the sheet 'missing_data' to practice all three types of counting and to see the impact of treating blanks as zero vs ignoring them."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}