import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic20_files/topic20_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic20() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            SMALL Function (Bottom N Value Extraction)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            The SMALL function returns the k‑th smallest value in a dataset. It is ideal for finding lowest scores, smallest expenses, earliest dates, or identifying outliers at the low end.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-green-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-green-500">
            =SMALL(array, k)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-green-300">Return type:</strong> Numeric (the k‑th smallest value)</li>
            <li><strong className="text-green-300">Purpose:</strong> Returns the k‑th smallest number in a range or array.</li>
            <li><strong className="text-green-300">When to use:</strong> Finding lowest scores, smallest expenses, earliest dates, bottom N performers, detecting low outliers.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 k = 1 gives the minimum (same as MIN); k = 2 gives the second smallest, etc.
          </div>
        </section>

        {/* How SMALL Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How SMALL Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              SMALL sorts the numbers in ascending order and picks the k‑th element. It ignores text, blanks, and logical values, and works with arrays or cell ranges.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
              <p className="font-mono text-sm">✅ =SMALL(A1:A10, 1) → minimum value in the range (same as MIN)</p>
              <p className="font-mono text-sm mt-1">✅ =SMALL(A1:A10, 3) → third smallest value</p>
              <p className="font-mono text-sm mt-1">⚠️ If k &gt; count of numbers, returns #NUM! error.</p>
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
              <strong>Scenario:</strong> In Barrackpore, a teacher wants to identify the three lowest exam scores to offer extra help. Also, a shop wants to find the smallest daily sales for the month.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="border px-3 py-2">Student</th><th className="border px-3 py-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-1">Swadeep</td>
                    <td className="border px-3 py-1">85</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-1">Tuhina</td>
                    <td className="border px-3 py-1">92</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-1">Abhronila</td>
                    <td className="border px-3 py-1">78</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-1">Susmita</td>
                    <td className="border px-3 py-1">95</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-1">Debangshu</td>
                    <td className="border px-3 py-1">68</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-1">Rohan</td>
                    <td className="border px-3 py-1">55</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-green-300">=SMALL(B2:B7, 1) → 55 (lowest)</p>
              <p className="mt-1 text-green-300">=SMALL(B2:B7, 2) → 68 (second lowest)</p>
              <p className="mt-1 text-green-300">=SMALL(B2:B7, 3) → 78 (third lowest)</p>
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
              <button onClick={handleDownload} className="bg-green-600 hover:bg-green-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-green-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“small_data”</strong> from <code>statistical_functions.xlsx</code> contains sales and exam data. Practice extracting bottom values.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="small_data" title="SMALL Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic20_files/excel_files/</code> with sheet “small_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>k value larger than the number of numeric entries → #NUM! error.</li>
            <li>Forgetting that SMALL ignores text and blanks – may lead to misunderstanding of rank.</li>
            <li>Confusing SMALL and LARGE – remember: SMALL for the smallest (bottom), LARGE for largest (top).</li>
            <li>k=1 returns the minimum, but MIN is simpler; use SMALL when you need the 2nd, 3rd, etc.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use SMALL with ROW() to get a dynamic list of bottom values: =SMALL(range, ROW(A1)).</li>
            <li>Combine SMALL with SUM to sum bottom N values: =SUM(SMALL(range, {1,2,3})).</li>
            <li>Use named ranges for clarity: =SMALL(Scores, 3).</li>
            <li>For conditional bottom values (e.g., worst 3 scores in a specific class), use array formula with IF.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you want to exclude zeros from the smallest values (e.g., students who didn’t take the test scored 0), how would you find the lowest non‑zero score? (Hint: use SMALL with IF(range>0, range)).<br />
            Observe carefully: SMALL treats 0 as a valid number, so to ignore it you need to filter first.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>To sum the bottom 3 values: =SUM(SMALL(range, {1,2,3})).</li>
            <li>Use SMALL with FREQUENCY to find thresholds (e.g., the top of the bottom 10%).</li>
            <li>For a dynamic k, make k a cell reference: =SMALL(range, E2).</li>
            <li>In Excel 365, you can use SORT and INDEX: =INDEX(SORT(range), k) to get k‑th smallest.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =SMALL(array, k)</li>
            <li>✅ k = 1 → smallest value (same as MIN)</li>
            <li>✅ k must be ≤ number of numeric values</li>
            <li>✅ Returns #NUM! if k is too large</li>
            <li>✅ Ignores text, blanks, logicals</li>
            <li>✅ Use array constant {1,2,3} for multiple extractions</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="SMALL Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple list: {5,2,8,3,9}. Ask for 1st, 2nd, 3rd smallest (2,3,5). Then show that MIN is a special case (k=1). Use the Excel sheet 'small_data' with sales data and exam marks. Have students extract the bottom 5 values and then sum them. Discuss the similarity with LARGE – they are symmetric; SMALL(range, k) = -LARGE(-range, k). Also show handling of ties: duplicate values occupy consecutive ranks."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}