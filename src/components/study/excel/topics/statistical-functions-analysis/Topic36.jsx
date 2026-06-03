import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic36_files/topic36_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic36() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Practice: Multi‑Condition Statistical Analysis
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            This topic provides hands‑on exercises combining multiple conditions with statistical functions (SUMIFS, COUNTIFS, AVERAGEIFS) and dynamic criteria. Practice makes perfect for real‑world business and academic reporting.
          </p>
        </header>

        {/* Why Multi‑Condition Matters */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-purple-400">🎯</span> Why Multi‑Condition Analysis?
          </h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              In real life, questions are rarely one‑dimensional. For example:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>“Total sales of product A in the North region during Q1”</li>
              <li>“Average score of students from Barrackpore who attended more than 80% of classes”</li>
              <li>“Count of orders above ₹10,000 placed by new customers”</li>
            </ul>
            <p>
              Such questions require combining multiple criteria using <strong className="text-purple-300">SUMIFS, COUNTIFS, AVERAGEIFS</strong> – the core of this practice session.
            </p>
          </div>
        </section>

        {/* Example Exercises */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📝 Hands-On Exercises</h2>
          <div className="mt-4 space-y-6 text-gray-200">
            <div>
              <p className="font-semibold text-purple-300">Exercise 1: SUMIFS</p>
              <p class="text-gray-300">“Calculate total sales of product ‘Laptop’ in the region ‘East’ with quantity &gt; 5.”</p>
              <p className="font-mono text-sm mt-1">=SUMIFS(sales_range, product_range, "Laptop", region_range, "East", qty_range, ">5")</p>
            </div>
            <div>
              <p className="font-semibold text-purple-300">Exercise 2: COUNTIFS</p>
              <p class="text-gray-300">“How many students scored above 80 and are from Shyamnagar?”</p>
              <p className="font-mono text-sm mt-1">=COUNTIFS(score_range, ">80", city_range, "Shyamnagar")</p>
            </div>
            <div>
              <p className="font-semibold text-purple-300">Exercise 3: AVERAGEIFS</p>
              <p class="text-gray-300">“Average exam score of Barrackpore students who passed (score &gt; 40) and attended at least 5 days.”</p>
              <p className="font-mono text-sm mt-1">=AVERAGEIFS(score_range, city_range, "Barrackpore", score_range, ">40", attendance_range, ">=5")</p>
            </div>
          </div>
        </section>

        {/* Interactive Excel File Loader */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">📁 Practice Dataset</h2>
            {sampleDataUrl && (
              <button onClick={handleDownload} className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-purple-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“practice_multi_data”</strong> from <code>statistical_functions.xlsx</code> contains sales, student, and survey data with multiple categories. Use it to solve the exercises below.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="practice_multi_data" title="Multi‑Condition Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic36_files/excel_files/</code> with sheet “practice_multi_data”.</p>
            </div>
          )}
        </section>

        {/* Additional Practice Questions */}
        <section className="reveal-section bg-blue-900/20 border border-blue-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-blue-300">📌 Try These Yourself</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Sum of sales for product “Rice” in region “North” with quantity &gt; 4.</li>
            <li>Count of students from “Ichapur” who scored between 70 and 90 inclusive.</li>
            <li>Average temperature recorded during “Monsoon” and “Summer” combined.</li>
            <li>Total profit where revenue &gt; cost and category = “Electronics”.</li>
            <li>Maximum sales in the “South” region for the year 2025.</li>
          </ul>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Swapping arguments: SUMIFS puts the sum range first; SUMIF puts it last.</li>
            <li>Using different ranges for SUMIFS – all must be the same size.</li>
            <li>Omitting quotes around text criteria: =SUMIFS(…, region, North) → error; should be "North".</li>
            <li>Forgetting &amp; when using cell references: “>&amp;E1” not “>E1”.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use absolute references for ranges when copying formulas: $A$2:$A$100.</li>
            <li>Store criteria values in separate cells for easy updates: =SUMIFS(…, region, E2).</li>
            <li>Test each criterion separately using COUNTIFS to debug.</li>
            <li>Use Excel Tables – structured references auto‑adjust and are self‑documenting.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you have a dataset with both ‘Sales’ and ‘Quantity’, and you want to sum Sales where Quantity &gt; 5 and Region = ‘North’, which function would you use?<br />
            Observe carefully: SUMIFS can handle both numeric and text conditions, and they can be on different columns. The order of criteria pairs does not matter, but the ranges must be aligned.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use SUMIFS even for single‑condition – it is easier to add more later.</li>
            <li>Combine with IFERROR if your criteria may produce no results (SUMIFS returns 0, but AVERAGEIFS returns #DIV/0!).</li>
            <li>Master the wildcards: “*” for any characters, “?” for one character. Use them in text criteria.</li>
            <li>For dates, use DATE functions inside criteria: “>=”&amp;DATE(2025,1,1).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ SUMIFS(sum_range, criteria_range1, criteria1, …)</li>
            <li>✅ COUNTIFS(criteria_range1, criteria1, …)</li>
            <li>✅ AVERAGEIFS(average_range, criteria_range1, criteria1, …)</li>
            <li>✅ All ranges must be same size</li>
            <li>✅ Use quotes for text and operators; &amp; for cell references</li>
            <li>✅ SUMIFS returns 0 if no match; AVERAGEIFS returns #DIV/0!</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Multi‑Condition Statistical Analysis – FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"This is a practice topic. Provide the Excel sheet with at least 50 rows across multiple columns (Product, Region, Sales, Quantity, Date, City, Score). Ask students to solve the exercises in pairs. Then have them create their own real‑world scenario (e.g., from their school or local market) and write down three multi‑condition questions. Finally, exchange with a peer and solve each other’s questions."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}