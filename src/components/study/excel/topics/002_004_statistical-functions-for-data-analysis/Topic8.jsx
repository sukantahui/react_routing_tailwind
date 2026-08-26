import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic8_files/topic8_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic8() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
            COUNTIF Function (Single Condition Counting)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            COUNTIF counts cells that meet a single condition. It is the gateway to conditional counting – perfect for quickly answering “how many” questions.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-pink-400">🔢</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-pink-500">
            =COUNTIF(range, criteria)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-pink-300">Return type:</strong> Numeric (count of cells that satisfy the condition)</li>
            <li><strong className="text-pink-300">Purpose:</strong> Counts cells that meet a specific condition – text, number, date, or expression.</li>
            <li><strong className="text-pink-300">When to use:</strong> Counting how many students passed, how many sales above target, how many orders from a specific city.</li>
          </ul>
        </section>

        {/* Parameters Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🔍 Parameters Explained</h2>
          <div className="mt-4 space-y-3 text-gray-200">
            <div><span className="text-pink-300 font-mono">range</span> – The group of cells you want to evaluate.</div>
            <div><span className="text-pink-300 font-mono">criteria</span> – The condition that determines which cells to count. Can be a number, text, expression, or cell reference.</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-pink-500 mt-4">
            <p className="font-mono text-sm">{`✅ =COUNTIF(A1:A10, ">50") → counts numbers greater than 50`}</p>
            <p className="font-mono text-sm mt-1">✅ =COUNTIF(B2:B100, "Apple") → counts cells containing exactly "Apple"</p>
            <p className="font-mono text-sm mt-1">{`✅ =COUNTIF(C:C, "="&amp;D1) → counts cells equal to value in D1`}</p>
            <p className="font-mono text-sm mt-1">{`✅ =COUNTIF(E:E, "*") → counts all non‑blank cells`}</p>
          </div>
        </section>

        {/* Real-world Example */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📊 Real-World Use Case</h2>
          <div className="mt-4">
            <p className="text-gray-200">
              <strong>Scenario:</strong> In Ichapur, a teacher wants to count how many students scored above 80, and how many are named "Swadeep".
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Name</th><th className="border px-3 py-2">Marks</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">85</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">92</td></tr>
                  <tr><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1">78</td></tr>
                  <tr><td className="border px-3 py-1">Susmita</td><td className="border px-3 py-1">95</td></tr>
                  <tr><td className="border px-3 py-1">Debangshu</td><td className="border px-3 py-1">68</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-pink-300">{`=COUNTIF(B2:B6, ">80") → 3 (85,92,95)`}</p>
              <p className="mt-1 text-pink-300">=COUNTIF(A2:A6, "Swadeep") → 1</p>
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
              <button onClick={handleDownload} className="bg-pink-600 hover:bg-pink-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-pink-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“countif_data”</strong> from <code>statistical_functions.xlsx</code> contains student data. Practice COUNTIF with text and number criteria.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="countif_data" title="COUNTIF Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic8_files/excel_files/</code> with sheet “countif_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Forgetting quotes around text criteria: =COUNTIF(A:A, Apples) → error; correct: "Apples".</li>
            <li>{`Using operators like >, < without quotes: =COUNTIF(A:A, >5) → error; correct: ">5".`}</li>
            <li>{`Concatenating cell references incorrectly: ">"&amp;E1 (not ">E1").`}</li>
            <li>COUNTIF is not case‑sensitive – “APPLE” = “apple”.</li>
            <li>COUNTIF treats numbers stored as text as text – they won't be counted with numeric criteria.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use COUNTIF to validate data: =COUNTIF(range, "?") counts single‑character entries.</li>
            <li>Use absolute references when copying =COUNTIF($A$2:$A$100, D2).</li>
            <li>For multiple conditions, move to COUNTIFS.</li>
            <li>Combine COUNTIF with data validation to restrict duplicate entries.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            {`“If you have a list of exam marks, =COUNTIF(marks, “>80”) gives the number of top performers. But what if you want to count students whose marks are strictly greater than the class average?<br />
            Observe carefully: =COUNTIF(marks, “>”&AVERAGE(marks)) – the criteria is dynamic.”`}
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>{`Count non‑blank cells: =COUNTIF(range, "<>") or =COUNTIF(range, "*") for text.`}</li>
            <li>Count blank cells: =COUNTIF(range, "").</li>
            <li>Wildcards: "*" for any characters, "?" for a single character: =COUNTIF(A:A, "???") counts exactly 3‑letter entries.</li>
            <li>Quick count from status bar: select range, right‑click → Count.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =COUNTIF(range, criteria)</li>
            <li>✅ Text criteria in double quotes: "Apple"</li>
            <li>{`✅ Operators in quotes: ">10"`}</li>
            <li>{`✅ Use &amp; to reference cells: ">"&amp;B1`}</li>
            <li>✅ Wildcards * and ? work for text</li>
            <li>✅ Returns 0 if no match</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="COUNTIF Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with simple text counting: how many students named 'Swadeep'. Then numeric conditions: scores above 80. Show that COUNTIF can count blanks and non‑blanks. The Excel sheet 'countif_data' should include columns: Name, Marks, Grade, City – to practice various criteria."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}