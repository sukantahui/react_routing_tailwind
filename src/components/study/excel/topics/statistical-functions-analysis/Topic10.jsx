import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic10_files/topic10_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic10() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            AVERAGEIF Function (Conditional Average)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            AVERAGEIF calculates the average of cells that meet a single condition. It is the conditional version of AVERAGE – indispensable for subgroup analysis.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-blue-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-blue-500">
            =AVERAGEIF(range, criteria, [average_range])
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-blue-300">Return type:</strong> Numeric (average of values that satisfy the condition)</li>
            <li><strong className="text-blue-300">Purpose:</strong> Returns the arithmetic mean of cells that meet a given condition.</li>
            <li><strong className="text-blue-300">When to use:</strong> Finding average sales of a specific product, average marks of students who passed, average temperature on rainy days.</li>
          </ul>
        </section>

        {/* Parameters Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🔍 Parameters Explained</h2>
          <div className="mt-4 space-y-3 text-gray-200">
            <div><span className="text-blue-300 font-mono">range</span> – The range of cells to evaluate against the criteria.</div>
            <div><span className="text-blue-300 font-mono">criteria</span> – The condition (text, number, expression) that determines which cells to average.</div>
            <div><span className="text-blue-300 font-mono">average_range</span> – (Optional) The actual cells to average. If omitted, the function averages the range itself.</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500 mt-4">
            <p className="font-mono text-sm">{`✅ =AVERAGEIF(A1:A10, ">80") → average of numbers greater than 80 in A1:A10`}</p>
            <p className="font-mono text-sm mt-1">✅ =AVERAGEIF(B2:B100, "Rice", C2:C100) → average price of Rice</p>
            <p className="font-mono text-sm mt-1">✅ =AVERAGEIF(D:D, "Pass", E:E) → average score of students who passed</p>
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
              <strong>Scenario:</strong> In Naihati, a store wants to know the average sales value of the product <strong>“Rice”</strong> and the average sales of products above <strong>₹500</strong>.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Product</th><th className="border px-3 py-2">Sales</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">600</td></tr>
                  <tr><td className="border px-3 py-1">Wheat</td><td className="border px-3 py-1">450</td></tr>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">750</td></tr>
                  <tr><td className="border px-3 py-1">Sugar</td><td className="border px-3 py-1">300</td></tr>
                  <tr><td className="border px-3 py-1">Rice</td><td className="border px-3 py-1">500</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-blue-300">=AVERAGEIF(A2:A6, "Rice", B2:B6) → (600+750+500)/3 = 616.67</p>
              <p className="mt-1 text-blue-300">{`=AVERAGEIF(B2:B6, ">500") → (600+750)/2 = 675`}</p>
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
              <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-blue-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“averageif_data”</strong> from <code>statistical_functions.xlsx</code> contains sales and student data. Practice AVERAGEIF with conditions on text, numbers, and dates.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="averageif_data" title="AVERAGEIF Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic10_files/excel_files/</code> with sheet “averageif_data”.</p>
            </div>
          )}
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Forgetting that <strong>average_range</strong> is optional – if omitted, AVERAGEIF averages the <strong>range</strong> itself (which may not be what you want).</li>
            <li>Using text criteria without double quotes: =AVERAGEIF(A:A, Rice, B:B) → error; correct "Rice".</li>
            <li>{`Concatenating cells incorrectly: for dynamic threshold, use ">"&amp;E1 (not ">E1").`}</li>
            <li>AVERAGEIF <strong>ignores blank cells</strong> in average_range, but includes zeros – this affects the result.</li>
            <li>If no cells meet the criteria, AVERAGEIF returns #DIV/0! (not 0 like SUMIF).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use absolute references for ranges when copying formulas: =AVERAGEIF($A$2:$A$100, "Rice", $B$2:$B$100).</li>
            <li>For multiple conditions, use AVERAGEIFS (next topic).</li>
            <li>Clean your data before averaging – text numbers should be converted to real numbers.</li>
            <li>Test with COUNTIF first to see how many cells meet the condition.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If you want the average score of students who scored <strong>above the class average</strong>, can you use AVERAGEIF directly? No, you would need a helper column or array formula.<br />
            Observe carefully: AVERAGEIF expects a static value, not a calculated one, unless you use a cell reference that contains the average.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use wildcards for partial text matches: =AVERAGEIF(Product, "*Phone*", Sales) averages sales of products containing "Phone".</li>
            <li>{`Average for a date range: =AVERAGEIF(Date, >=&;DATE(2025,1,1), Sales) – but for two dates, use AVERAGEIFS.`}</li>
            <li>{`To exclude zeros from average: =AVERAGEIF(range, <;>;0, average_range).`}</li>
            <li>Combine AVERAGEIF with IFERROR to handle #DIV/0! when no match: =IFERROR(AVERAGEIF(...), 0).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =AVERAGEIF(range, criteria, [average_range])</li>
            <li>{`✅ Quotes for text and operators: "Rice", ">80"`}</li>
            <li>{`✅ Use &amp; for cell references: '>'&amp;E1`}</li>
            <li>✅ If average_range omitted, range is averaged</li>
            <li>✅ Returns #DIV/0! if no match</li>
            <li>✅ Ignores text and blanks in average_range</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="AVERAGEIF Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with a simple list: average sales of a single product. Then show numeric condition: average of sales above 500. Emphasise the difference between omitting vs providing average_range. The Excel sheet 'averageif_data' should include columns: Product, Sales, Quantity, Region – to practice various criteria."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}