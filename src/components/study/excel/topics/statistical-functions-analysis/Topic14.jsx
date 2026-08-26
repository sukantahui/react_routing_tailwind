import React, { useEffect, useRef } from "react";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic14_files/topic14_questions";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleDataUrl from "./excel_files/statistical_functions.xlsx?url";

export default function Topic14() {
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
            MODE.MULT Function (Multiple Modes Handling)
          </h1>
          <p className="text-lg text-gray-300 mt-3 leading-relaxed">
            MODE.MULT returns a vertical array of all modes (the most frequently occurring numbers) in a dataset. It is essential when your data has multiple peaks.
          </p>
        </header>

        {/* Function Signature */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-fuchsia-500/50 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-fuchsia-400">📐</span> Function Prototype
          </h2>
          <div className="mt-4 font-mono text-lg bg-gray-900 p-3 rounded-lg border-l-4 border-fuchsia-500">
            =MODE.MULT(number1, [number2], ...)
          </div>
          <ul className="mt-4 space-y-2 text-gray-200">
            <li><strong className="text-fuchsia-300">Return type:</strong> Array (vertical) of numbers – one cell per mode.</li>
            <li><strong className="text-fuchsia-300">Purpose:</strong> Returns a list of all values that appear most frequently (all modes).</li>
            <li><strong className="text-fuchsia-300">When to use:</strong> Analysing bimodal or multimodal data – e.g., two peak sales seasons, multiple popular exam scores, common product defects.</li>
          </ul>
          <div className="mt-3 text-sm text-gray-400 bg-gray-900/50 p-2 rounded">
            💡 In Excel 365, MODE.MULT automatically spills into multiple cells. In older Excel, select a range and press Ctrl+Shift+Enter.
          </div>
        </section>

        {/* Parameters Explanation */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold">🧠 How MODE.MULT Works</h2>
          <div className="mt-4 space-y-4 text-gray-200 leading-relaxed">
            <p>
              MODE.MULT counts the frequency of each number (ignoring text, blanks, logicals) and returns every value whose frequency equals the highest frequency.
              If no repetition occurs, it returns #N/A. Unlike MODE.SNGL (which returns only the smallest mode), MODE.MULT returns all modes as a vertical array.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-fuchsia-500">
              <p className="font-mono text-sm">{`✅ =MODE.MULT(1,1,2,2,3) → {1;2} (both appear twice)`}</p>
              <p className="font-mono text-sm mt-1">✅ =MODE.MULT(A1:A10) → array of all modes in column A</p>
              <p className="font-mono text-sm mt-1">⚠️ =MODE.MULT(1,2,3,4) → #N/A (no repeats)</p>
            </div>
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
              <strong>Scenario:</strong> In a Barrackpore shoe store, customer shoe sizes (EU) were recorded: 38,39,38,40,41,39,42,38,39. Both size 38 and 39 appear three times – the store should stock both equally.
            </p>
            <div className="mt-3 bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-800"><tr><th className="border px-3 py-2">Customer</th><th className="border px-3 py-2">Size</th></tr></thead>
                <tbody>
                  <tr><td className="border px-3 py-1">Swadeep</td><td className="border px-3 py-1">38</td></tr>
                  <tr><td className="border px-3 py-1">Tuhina</td><td className="border px-3 py-1">39</td></tr>
                  <tr><td className="border px-3 py-1">Abhronila</td><td className="border px-3 py-1">38</td></tr>
                  <tr><td className="border px-3 py-1">Susmita</td><td className="border px-3 py-1">40</td></tr>
                  <tr><td className="border px-3 py-1">Debangshu</td><td className="border px-3 py-1">41</td></tr>
                  <tr><td className="border px-3 py-1">Rohan</td><td className="border px-3 py-1">39</td></tr>
                  <tr><td className="border px-3 py-1">Priya</td><td className="border px-3 py-1">42</td></tr>
                  <tr><td className="border px-3 py-1">Ankit</td><td className="border px-3 py-1">38</td></tr>
                  <tr><td className="border px-3 py-1">Meera</td><td className="border px-3 py-1">39</td></tr>
                </tbody>
              </table>
              <p className="mt-3 text-fuchsia-300">={`MODE.MULT(B2:B10) → {38;39} (both appear 3 times)`}</p>
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
              <button onClick={handleDownload} className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-fuchsia-500/20">
                ⬇️ Download Excel File
              </button>
            )}
          </div>
          <p className="text-gray-300 mb-4">
            Sheet <strong>“mode_mult_data”</strong> from <code>statistical_functions.xlsx</code> contains multimodal data. Practice returning all modes as an array.
            {!sampleDataUrl && <span className="text-yellow-300"> (File not found – create it)</span>}
          </p>
          {sampleDataUrl ? (
            <ExcelFileLoader fileModule={sampleDataUrl} sheetName="mode_mult_data" title="MODE.MULT Practice" rowsPerPage={15} showSheetSelector={true} />
          ) : (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
              <p className="text-red-200">⚠️ Excel file not found.</p>
              <p className="text-gray-300 text-sm mt-2">Place <code>statistical_functions.xlsx</code> in <code>topic14_files/excel_files/</code> with sheet “mode_mult_data”.</p>
            </div>
          )}
        </section>

        {/* Mode.MULT specific notes */}
        <section className="reveal-section bg-blue-900/20 border border-blue-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-blue-300">📌 Important Notes</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>In older Excel (2019 and earlier), MODE.MULT must be entered as an array formula (select a range, type formula, press Ctrl+Shift+Enter).</li>
            <li>In Excel 365, it automatically spills (dynamic arrays).</li>
            <li>If you only need the smallest mode, use MODE.SNGL.</li>
            <li>The result is vertical: use TRANSPOSE(MODE.MULT(...)) to get horizontal.</li>
          </ul>
        </section>

        {/* Common Pitfalls */}
        <section className="reveal-section bg-red-900/20 border border-red-800 rounded-2xl p-5 hover:border-red-500 transition-all">
          <h3 className="text-xl font-semibold text-red-300">⚠️ Common Pitfalls</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Forgetting that MODE.MULT returns an array – if you only enter it in one cell without dynamic array support, you'll see only the first mode.</li>
            <li>Not selecting enough cells for the array formula in older Excel → some modes are truncated.</li>
            <li>Confusing with MODE.SNGL – MODE.MULT returns all modes, not just the smallest.</li>
            <li>Applying MODE.MULT to continuous data where modes rarely exist – expect #N/A.</li>
            <li>Wrapping MODE.MULT with functions that expect a single value without handling array output.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="reveal-section bg-green-900/20 border border-green-800 rounded-2xl p-5 hover:border-green-500 transition-all">
          <h3 className="text-xl font-semibold text-green-300">✅ Best Practices</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>In Excel 365, always use MODE.MULT directly – dynamic arrays handle the spill automatically.</li>
            <li>If you need the count of how many modes exist, use =COUNT(MODE.MULT(range)).</li>
            <li>Combine MODE.MULT with the new LET function to store the spill range: =LET(modes, MODE.MULT(data), INDEX(modes, row)).</li>
            <li>For conditional multimodal analysis, use array formula =MODE.MULT(IF(condition, value_range)).</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="reveal-section bg-yellow-900/20 border-l-8 border-yellow-500 rounded-r-2xl p-5">
          <h3 className="text-xl font-semibold text-yellow-300">💭 Think about...</h3>
          <p className="mt-2 text-gray-200">
            “If your data has three modes: 10 appears 4 times, 20 appears 4 times, 30 appears 4 times, all other values less. MODE.MULT returns 10;20;30. How would you determine which one is the ‘best’? It depends – for inventory, you may need all three.<br />
            Observe carefully: MODE.MULT reveals multiplicity that MODE.SNGL hides.”
          </p>
        </section>

        {/* Professional Tips */}
        <section className="reveal-section bg-purple-900/20 border border-purple-800 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-purple-300">💡 Professional Tips & Tricks</h3>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>Use MODE.MULT in combination with FREQUENCY to create a histogram of modes.</li>
            <li>To find the mode of text strings (e.g., product names), assign numeric codes, then apply MODE.MULT, then map back to text using INDEX/MATCH.</li>
            <li>To count how many times the modes appear, use =MAX(COUNTIF(data, MODE.MULT(data))) – but careful with array behaviour.</li>
            <li>In dashboards, use MODE.MULT inside a drop‑down to let users select which mode to analyse further.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 reveal-section">
          <h3 className="font-bold text-lg">📋 Quick Revision Checklist</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 list-disc list-inside text-gray-200">
            <li>✅ Syntax: =MODE.MULT(number1, [number2], …)</li>
            <li>✅ Returns an array (vertical) of all values with highest frequency</li>
            <li>✅ In older Excel: select range, enter as array (Ctrl+Shift+Enter)</li>
            <li>✅ #N/A if no repeats</li>
            <li>✅ Use TRANSPOSE to convert to horizontal</li>
            <li>✅ MODE.SNGL returns only the smallest mode</li>
          </ul>
        </div>

        {/* FAQ */}
        <FAQTemplate title="MODE.MULT Function – Frequently Asked Questions" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"Start with the shoe size example showing two modes. Demonstrate how MODE.MULT spills in Excel 365 vs array formula in older versions. Show that MODE.SNGL would return only the smaller mode, which might lead to understocking the other popular size. Use the sheet 'mode_mult_data' with at least two distinct modes and a unimodal set for contrast."} />
      </div>

      <style>{`
        .reveal-section { transform: translateY(24px) scale(0.98); transition: transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
        .reveal-section.revealed { transform: translateY(0) scale(1); }
        @media (prefers-reduced-motion: reduce) { .reveal-section { transform: none; transition: none; } }
      `}</style>
    </div>
  );
}