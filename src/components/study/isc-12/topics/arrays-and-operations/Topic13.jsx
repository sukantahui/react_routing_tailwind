import React, { useState } from 'react';
import clsx from 'clsx';

// Import external Java files
import RowMajorJava from './topic13_files/RowMajorDemo.java?raw';
import ColumnMajorJava from './topic13_files/ColumnMajorDemo.java?raw';
import ComparisonJava from './topic13_files/PerformanceComparison.java?raw';

// Import 30 questions
import questions from './topic13_files/topic13_questions';

// ===================== LOCAL COMPONENTS =====================
const Teacher = ({ note }) => (
  <div className="mt-12 p-6 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border-l-8 border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 dark:hover:shadow-yellow-400/5 hover:scale-[1.01]">
    <div className="flex items-start gap-4">
      <div className="text-4xl">👩‍🏫</div>
      <div>
        <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">Teacher's Note</h3>
        <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{note}</p>
      </div>
    </div>
  </div>
);

const JavaFileLoader = ({ fileModule, title, highlightLines = [] }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(fileModule);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
        <span className="font-mono text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</span>
        <button
          onClick={handleCopy}
          className="text-xs bg-white dark:bg-gray-900 px-2 py-1 rounded-md shadow-sm hover:shadow transition-all"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-gray-50 dark:bg-gray-900 p-4 overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200">
        <code>{fileModule}</code>
      </pre>
    </div>
  );
};

const FAQTemplate = ({ title, questions }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);
  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-l-8 border-blue-500 pl-4">{title}</h2>
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left p-5 font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center"
            >
              <span>{q.question}</span>
              <span className="text-2xl">{openIndex === idx ? '−' : '+'}</span>
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 pt-0 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <p><span className="font-bold">💡 Short answer:</span> {q.shortAnswer}</p>
                <p><span className="font-bold">📖 Explanation:</span> {q.explanation}</p>
                {q.hint && <p className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded italic"><span className="font-bold">🔍 Hint:</span> {q.hint}</p>}
                {q.codeExample && <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto"><code>{q.codeExample}</code></pre>}
                <p><span className="font-bold">⭐ Level:</span> {q.level}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ===================== MAIN COMPONENT =====================
export default function Topic13() {
  const [practiceOpen, setPracticeOpen] = useState({});
  const togglePractice = (idx) => {
    setPracticeOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        .hover-glow:hover {
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 0 0 2px rgba(59,130,246,0.3);
          transform: translateY(-2px);
        }
      `}</style>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <div className="animate-fadeSlideUp text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Row-Major vs Column-Major Storage
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding memory layout of 2D arrays: formulas, performance impact, and real-world usage.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="animate-fadeSlideUp bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all duration-300 hover-glow">
          <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-4 mb-4">📌 Core Concepts: Row-Major & Column-Major</h2>
          <p className="leading-relaxed mb-4">
            When a 2D array is stored in memory, the linear address space forces a choice: store all elements of the first row, then second row ... (row-major) OR store first column, then second column ... (column-major).
            This choice affects <strong>address calculation formulas</strong>, <strong>cache performance</strong>, and <strong>loop ordering</strong> for efficiency.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-bold text-xl text-blue-800 dark:text-blue-300">✅ Row-Major (C, Java, Python)</h3>
              <p>Memory: <code>A[0][0], A[0][1], ..., A[0][N-1], A[1][0] ...</code></p>
              <p>Formula: <code>Address = Base + (i * N + j) * elemSize</code></p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <h3 className="font-bold text-xl text-green-800 dark:text-green-300">✅ Column-Major (Fortran, MATLAB)</h3>
              <p>Memory: <code>A[0][0], A[1][0], ..., A[M-1][0], A[0][1] ...</code></p>
              <p>Formula: <code>Address = Base + (j * M + i) * elemSize</code></p>
            </div>
          </div>
        </div>

        {/* Calculation Table */}
        <div className="animate-fadeSlideUp bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all duration-300 hover-glow">
          <h2 className="text-2xl font-bold mb-4">🔢 Address Calculation Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700"><tr><th className="p-3">Parameter</th><th>Row-Major</th><th>Column-Major</th></tr></thead>
              <tbody className="divide-y">
                <tr><td className="p-3">Formula (M rows, N cols)</td><td><code>Base + (i*N + j)*S</code></td><td><code>Base + (j*M + i)*S</code></td></tr>
                <tr><td className="p-3">Stride for row index</td><td>N * S</td><td>S</td></tr>
                <tr><td className="p-3">Stride for column index</td><td>S</td><td>M * S</td></tr>
                <tr><td className="p-3">Cache friendly for</td><td>Row-wise loops</td><td>Column-wise loops</td></tr>
                <tr><td className="p-3">Example languages</td><td>C, Java, Go, Rust</td><td>Fortran, R, Julia</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SVG Layout Illustration */}
        <div className="animate-fadeSlideUp bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4">🧠 Visualizing Memory Layout (3x4 matrix)</h2>
          <svg viewBox="0 0 800 300" className="w-full h-auto rounded-lg">
            <rect x="10" y="10" width="380" height="130" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" className="dark:fill-blue-900/30 dark:stroke-blue-400" />
            <text x="200" y="35" textAnchor="middle" fontWeight="bold">Row-Major Order</text>
            <text x="30" y="65">A[0][0]</text><text x="90" y="65">A[0][1]</text><text x="150" y="65">A[0][2]</text><text x="210" y="65">A[0][3]</text>
            <text x="270" y="65">A[1][0]</text><text x="330" y="65">A[1][1]</text><text x="30" y="100">A[1][2]</text><text x="90" y="100">A[1][3]</text>
            <text x="150" y="100">A[2][0]</text><text x="210" y="100">A[2][1]</text><text x="270" y="100">A[2][2]</text><text x="330" y="100">A[2][3]</text>
            <rect x="420" y="10" width="380" height="130" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" className="dark:fill-green-900/30 dark:stroke-green-400" />
            <text x="610" y="35" textAnchor="middle" fontWeight="bold">Column-Major Order</text>
            <text x="440" y="65">A[0][0]</text><text x="500" y="65">A[1][0]</text><text x="560" y="65">A[2][0]</text><text x="620" y="65">A[0][1]</text>
            <text x="680" y="65">A[1][1]</text><text x="740" y="65">A[2][1]</text><text x="440" y="100">A[0][2]</text><text x="500" y="100">A[1][2]</text>
            <text x="560" y="100">A[2][2]</text><text x="620" y="100">A[0][3]</text><text x="680" y="100">A[1][3]</text><text x="740" y="100">A[2][3]</text>
            <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
          </svg>
        </div>

        {/* Java Code Examples – loaded from external files */}
        <div className="animate-fadeSlideUp">
          <h2 className="text-2xl font-bold mb-4">💻 Java Implementation & Address Calculation</h2>
          <JavaFileLoader fileModule={RowMajorJava} title="RowMajorDemo.java" />
          <JavaFileLoader fileModule={ColumnMajorJava} title="ColumnMajorDemo.java" />
          <JavaFileLoader fileModule={ComparisonJava} title="PerformanceComparison.java" />
        </div>

        {/* Real-world Story */}
        <div className="animate-fadeSlideUp bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-2xl">
          <h3 className="text-xl font-bold">📖 Classroom Story: Swadeep & Tuhina organize books</h3>
          <p>Swadeep (row-major) places books on shelves row by row: all books of row1, then row2. Tuhina (column-major) stacks by column: first book of each row from column1, then column2. Finding a book follows different "address" logic — Swadeep uses (row*shelf_width + col), Tuhina uses (col*num_rows + row). Both are correct, but one is faster if you tend to read row-wise.</p>
        </div>

        {/* Tips & Pitfalls */}
        <div className="animate-fadeSlideUp grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl transition-all hover:shadow-md">
            <h3 className="font-bold text-xl">✨ Pro Tips</h3>
            <ul className="list-disc pl-5 space-y-1 mt-2"><li>Always match loop order with storage order.</li><li>Use row-major for row-wise operations (image filters, ML matrices).</li><li>In Java, native arrays are row-major – optimize nested loops accordingly.</li><li>Remember: address offset = number of elements before * element size.</li></ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl transition-all hover:shadow-md">
            <h3 className="font-bold text-xl">⚠️ Common Mistakes</h3>
            <ul className="list-disc pl-5 space-y-1 mt-2"><li>Using column-major formula on row-major stored data (wrong address).</li><li>Off-by-one errors: dimensions (M,N) vs index limits (0..M-1, 0..N-1).</li><li>Assuming all languages use same layout – leads to interop bugs.</li><li>Forgetting to multiply by element size.</li></ul>
          </div>
        </div>

        {/* Checklist */}
        <div className="animate-fadeSlideUp bg-gray-100 dark:bg-gray-800 p-5 rounded-xl">
          <h3 className="font-bold text-xl">✅ Mini Checklist: Mastering Storage Orders</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3"><li>✓ I can derive row-major address formula.</li><li>✓ I can derive column-major address formula.</li><li>✓ I know which languages use which layout.</li><li>✓ I understand cache performance implications.</li><li>✓ I can convert between linear index and (i,j).</li></ul>
        </div>

        {/* Inline Practice Questions (first 30 from imported questions array) */}
        <div className="animate-fadeSlideUp">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-400 pb-2">✍️ Practice Questions (30)</h2>
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                <button onClick={() => togglePractice(idx)} className="w-full text-left p-4 font-medium flex justify-between items-center">
                  <span>{idx+1}. {q.question}</span>
                  <span>{practiceOpen[idx] ? '▲' : '▼'}</span>
                </button>
                {practiceOpen[idx] && (
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <p><strong>💡 Answer:</strong> {q.shortAnswer}</p>
                    <p><strong>📘 Explanation:</strong> {q.explanation}</p>
                    {q.hint && <p className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded"><strong>🔍 Hint:</strong> {q.hint}</p>}
                    {q.codeExample && <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded"><code>{q.codeExample}</code></pre>}
                    <p><strong>⭐ Level:</strong> {q.level}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="Row-Major vs Column-Major: Deep Dive FAQs" questions={questions.slice(0, 10)} />

        {/* Teacher's Note */}
        <Teacher note="Students often memorize formulas without understanding memory layout. Use the visual grid analogy and have them calculate addresses manually for small arrays like 2x3. Emphasize that performance can vary 10x depending on loop order — demonstrate with a simple Java timing exercise. Also point out that Java is strictly row-major, so column-wise loops are slower." />
      </main>
    </div>
  );
}