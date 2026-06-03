import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic32_files/topic32_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic32() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Handling Errors with IFERROR in Statistical Formulas
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            IFERROR catches errors in formulas and returns a custom value instead. It is essential for making statistical calculations robust, especially when dealing with messy data, empty ranges, or conditions that may not be met.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-red-400">⚠️</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-red-500">
            =IFERROR(value, value_if_error)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-red-300">Return type:</strong> Any (the result of value if no error, else value_if_error)</li>
            <li><strong className="text-red-300">Purpose:</strong> Evaluates a formula; if it results in any error (#N/A, #VALUE!, #DIV/0!, etc.), returns the second argument instead.</li>
            <li><strong className="text-red-300">When to use:</strong> Wrapping AVERAGEIF that might have no matches, STDEV.S of a single number, VLOOKUP that may not find a value, or any statistical formula that can fail with real data.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 IFERROR is a clean, modern alternative to IF(ISERROR(...)). Use it to hide ugly errors and keep dashboards professional.
          </div>
        </section>

        {/* How IFERROR Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How IFERROR Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              IFERROR traps any error that Excel produces: #N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, or #NULL!. It does not trap other issues like blank cells (unless they cause an error). If the first argument is not an error, IFERROR returns it; otherwise, it returns the second argument.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-red-500">
              <p className="font-mono text-sm">✅ =IFERROR(AVERAGEIF(A:A, "Missing", B:B), 0) → returns 0 if no match</p>
              <p className="font-mono text-sm mt-1">✅ =IFERROR(STDEV.S(A1:A10), "Insufficient data") → custom message</p>
              <p className="font-mono text-sm mt-1">⚠️ IFERROR also hides errors you may want to see for debugging.</p>
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
              <strong>Scenario:</strong> In Barrackpore, a school wants to compute the average score of students who passed (score &gt;= 40). If no student passed, AVERAGEIF returns #DIV/0! – which would break a report. Using IFERROR, they replace it with 0 or "No passing students".
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr><th className="border px-3 py-2">Student</th><th className="border px-3 py-2">Score</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">35</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">38</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-red-300">=IFERROR(AVERAGEIF(B2:B3, ">=40", B2:B3), "No eligible scores") → "No eligible scores"</p>
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
              <button onClick={handleDownload} className="bg-red-600 hover:bg-red-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-red-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“iferror_data”</strong> from <code>statistical_functions.xlsx</code> contains scenarios where statistical formulas produce errors. Practice wrapping them with IFERROR.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="iferror_data" title="IFERROR Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic32_files/excel_files/</code> with sheet “iferror_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Hiding errors that should be investigated – IFERROR can mask data problems.</li>
            <li>Using IFERROR when you only want to catch specific errors (e.g., #N/A) – IFERROR catches all errors, which may be too broad.</li>
            <li>Not providing a meaningful value_if_error (e.g., empty string or 0 may cause interpretation issues).</li>
            <li>Placing IFERROR around calculations that are already clean – unnecessary and can slow recalculation slightly.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use IFERROR only for formulas that are expected to fail under normal circumstances (e.g., missing VLOOKUP keys).</li>
            <li>Return a value that preserves the integrity of downstream calculations, e.g., 0 for sums, "" for text, or "No data".</li>
            <li>For specific error trapping (only #N/A), use IFNA.</li>
            <li>Wrap the entire formula, not just part of it: =IFERROR(AVERAGEIF(…), 0).</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you use =IFERROR(AVERAGEIF(range, criteria), 0), an empty range returns 0, not #DIV/0!. But if you then use that 0 in another calculation (like another average), you might get a wrong result.<br />
            Observe carefully: IFERROR changes the result; decide whether 0 is a sensible substitute for ‘no data’.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use IFERROR to create default values for missing lookups: =IFERROR(VLOOKUP(id, table, 2, 0), "Not found").</li>
            <li>Chain IFERROR for nested formulas: =IFERROR(formula1, IFERROR(formula2, "All failed")).</li>
            <li>Combine with ISNUMBER to separate zero from error.</li>
            <li>In dashboards, use IFERROR to return blank cells (""), which often display cleaner than 0.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =IFERROR(value, value_if_error)</li>
            <li>✅ Catches all error types: #N/A, #DIV/0!, #VALUE!, #REF!, etc.</li>
            <li>✅ Return a value that makes sense for your analysis (0, "", custom text).</li>
            <li>✅ For #N/A only, use IFNA.</li>
            <li>✅ Avoid hiding errors that need investigation.</li>
            <li>✅ Improves dashboard professionalism.</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="IFERROR in Statistical Formulas – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple example: =AVERAGEIF(empty_range, conditions) returns #DIV/0!. Wrap with IFERROR and show 0. Then show a VLOOKUP that fails, using IFERROR to display 'Not found'. Discuss the trade‑off: hiding errors vs solving them. Use the sheet 'iferror_data' with intentional missing data so students practice wrapping AVERAGEIFS, STDEV.S, and other functions that may produce errors."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}