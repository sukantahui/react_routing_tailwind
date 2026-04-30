import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic22_files/topic22_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic22() {
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
            RANK.AVG Function (Average Ranking for Ties)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            RANK.AVG returns the rank of a number in a list, but when there are ties, it returns the average of the ranks that would have been assigned. This provides a smoother ranking system.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-amber-400">🏅</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-amber-500">
            =RANK.AVG(number, ref, [order])
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-amber-300">Return type:</strong> Numeric (average rank)</li>
            <li><strong className="text-amber-300">Purpose:</strong> Returns the rank of a number, assigning the average rank to ties instead of skipping ranks.</li>
            <li><strong className="text-amber-300">When to use:</strong> When you want a fairer ranking for ties, especially in small datasets or when averaging ranks for statistical tests.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 For identical numbers, RANK.AVG gives the same average rank (e.g., ties for ranks 2 and 3 each get 2.5). Then the next distinct value gets the next integer rank (4).
          </div>
        </section>

        {/* How RANK.AVG Works */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">📐 How RANK.AVG Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              RANK.AVG first determines the standard ranks (like RANK.EQ). Then for duplicate values, it replaces the rank with the average of the ranks that the duplicates occupy.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-amber-500">
              <p className="font-mono text-sm">✅ =RANK.AVG(95, B2:B10) for dataset {95,95,92,85} → (1+2)/2 = 1.5 for both 95s; rank of 92 = 3; rank of 85 = 4.</p>
              <p className="font-mono text-sm mt-1">✅ =RANK.AVG(85, sales, 1) → ascending order rank.</p>
              <p className="font-mono text-sm mt-1">⚠️ If number not in ref, returns #N/A.</p>
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
              <strong>Scenario:</strong> In a Barrackpore competition, two participants scored 95 out of 100. RANK.EQ would give both rank 1, and the next gets rank 3. However, a tie‑breaking rule that averages ranks (1 and 2) gives 1.5 each, which is sometimes used in scholarship distribution.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800">
                  <tr><th className="border px-3 py-2">Student</th><th className="border px-3 py-2">Score</th><th className="border px-3 py-2">RANK.EQ</th><th className="border px-3 py-2">RANK.AVG</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1">95</td><td className="border px-3 py-1">1</td><td className="border px-3 py-1">1.5</td></tr>
                  <tr><td className="border px-3 py-1">Susmita</td><td className="border px-3 py-1">95</td><td className="border px-3 py-1">1</td><td className="border px-3 py-1">1.5</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">92</td><td className="border px-3 py-1">3</td><td className="border px-3 py-1">3</td></tr>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">85</td><td className="border px-3 py-1">4</td><td className="border px-3 py-1">4</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-amber-300">RANK.AVG gives 1.5 for both 95s – the average of ranks 1 and 2.</p>
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
            Sheet <strong>“rank_avg_data”</strong> from <code>statistical_functions.xlsx</code> contains exam scores and sales figures. Compare RANK.EQ and RANK.AVG.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="rank_avg_data" title="RANK.AVG Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic22_files/excel_files/</code> with sheet “rank_avg_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Expecting integer ranks – RANK.AVG can return decimals.</li>
            <li>Forgetting to lock the ref range with absolute references.</li>
            <li>Confusing RANK.AVG with RANK.EQ – RANK.AVG averages ranks, RANK.EQ assigns the same rank and skips.</li>
            <li>Using RANK.AVG when the next rank after ties should be skipped (e.g., sports competition).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use RANK.AVG in statistical tests (e.g., Mann‑Whitney U) where tied values need average ranks.</li>
            <li>For competition rankings where ties should not skip ranks, RANK.AVG is sometimes preferred over RANK.EQ.</li>
            <li>Combine with ROUND if you need integer ranks: =ROUND(RANK.AVG(value, ref, 0), 0).</li>
            <li>Use absolute references for the ref range when copying the formula.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If three students score the same, what ranks would RANK.EQ give? They’d all get rank 1, and the next gets rank 4. With RANK.AVG, they’d all get (1+2+3)/3 = 2. Which is fairer for awarding scholarships? There’s no absolute answer – it depends on the policy.<br />
            Observe carefully: RANK.AVG smooths ties, which can be useful when you want to penalise ties less harshly.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>In Excel 365, you can use SORT and XMATCH to create custom ranking including average ranking.</li>
            <li>To get dense ranking (1,2,2,3) without averages, use a SUMPRODUCT formula.</li>
            <li>RANK.AVG is used in the calculation of the Wilcoxon signed‑rank test.</li>
            <li>When presenting ranks, explain to stakeholders the difference between RANK.EQ and RANK.AVG.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =RANK.AVG(number, ref, [order])</li>
            <li>✅ order = 0 (descending, largest rank 1) or 1 (ascending, smallest rank 1)</li>
            <li>✅ Ties get the average of the ranks they occupy (can be decimal)</li>
            <li>✅ Next rank after ties is not skipped (for next distinct value)</li>
            <li>✅ Returns #N/A if number not in ref</li>
            <li>✅ Use absolute references for ref when copying</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="RANK.AVG Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Show the same dataset as RANK.EQ, but now with RANK.AVG. Emphasise that ties produce decimal ranks. Use the sheet 'rank_avg_data' with exam scores that have multiple ties. Have students compute both RANK.EQ and RANK.AVG and discuss which one they would use for a scholarship distribution. Show that the next distinct rank after ties is not skipped; e.g., ranks 1.5,1.5,3 – the next number gets rank 3, not 4."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}