import React from 'react';
import clsx from 'clsx';
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from './topic11_files/topic11_questions';
import StringPerformanceIssues from './topic11_files/StringPerformanceIssues.java?raw';
import StringBuilderOptimizations from './topic11_files/StringBuilderOptimizations.java?raw';
import InterningDemo from './topic11_files/InterningDemo.java?raw';

const Topic11 = () => {
  const cardClasses = clsx(
    "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md",
    "transition-all duration-300 hover:shadow-xl hover:scale-[1.01]",
    "border border-gray-100 dark:border-gray-700"
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide-up {
          animation: fadeSlideUp 0.6s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-slide-up { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="animate-fade-slide-up text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Performance Considerations in String Handling
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Writing correct code is not enough – understanding performance pitfalls and optimizations separates good developers from great ones.
          </p>
        </div>

        {/* Key Performance Concepts */}
        <div className={cardClasses} style={{ animationDelay: '0.1s' }} className="animate-fade-slide-up">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">⚡</span> What Affects String Performance?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <h3 className="font-bold">Memory Overhead</h3>
              <ul className="list-disc pl-4 text-sm mt-1">
                <li>Each String object has overhead (~24 bytes + chars)</li>
                <li>Immutable operations create many intermediate objects</li>
                <li>StringBuilder reduces object churn</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <h3 className="font-bold">CPU / Time</h3>
              <ul className="list-disc pl-4 text-sm mt-1">
                <li>String concatenation in loops is O(n²)</li>
                <li>StringBuilder operations are O(n)</li>
                <li>Regular expressions can be expensive</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <h3 className="font-bold">GC Pressure</h3>
              <ul className="list-disc pl-4 text-sm mt-1">
                <li>Many short-lived strings trigger frequent GC</li>
                <li>StringBuilder reuses buffers</li>
                <li>String interning can reduce duplicates</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <h3 className="font-bold">String Pool</h3>
              <ul className="list-disc pl-4 text-sm mt-1">
                <li>Literals are automatically pooled</li>
                <li>Interning can save memory but adds CPU cost</li>
                <li>Too many interned strings cause pool contention</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Visual: Performance Comparison */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">📊 Visual: Why StringBuilder Wins</h2>
            <div className="flex justify-center py-4">
              <SVGPerformanceGraph />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              String concatenation in a loop creates O(n²) work; StringBuilder is linear.
            </p>
          </div>
        </div>

        {/* Major Performance Pitfalls */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🚫 Top 5 Performance Killers</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Using <code>+</code> in loops</strong> – Each iteration creates a new StringBuilder and copies entire string.</li>
              <li><strong>Calling <code>toUpperCase()</code> / <code>toLowerCase()</code> repeatedly</strong> – Each call creates a new string.</li>
              <li><strong>Using <code>StringBuffer</code> in single‑threaded code</strong> – Unnecessary synchronization overhead.</li>
              <li><strong>Not pre‑sizing <code>StringBuilder</code></strong> – Causes repeated array resizing and copying.</li>
              <li><strong>Excessive use of <code>intern()</code></strong> – Can degrade performance and cause memory leaks in old JVMs.</li>
            </ol>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <p className="text-sm">💡 <strong>Remember:</strong> Profile before optimizing – don't guess where the bottleneck is.</p>
            </div>
          </div>
        </div>

        {/* Optimization Techniques */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🚀 Key Optimization Techniques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">1. Pre‑size StringBuilder</h3>
                <code className="block text-xs mt-1">new StringBuilder(1000);</code>
                <p className="text-xs mt-1">Avoids internal array resizing and copying.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">2. Use StringBuilder for loops</h3>
                <code className="block text-xs mt-1">sb.append(i); // not s += i</code>
                <p className="text-xs mt-1">Linear time instead of quadratic.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">3. Reuse StringBuilder with setLength(0)</h3>
                <code className="block text-xs mt-1">sb.setLength(0);</code>
                <p className="text-xs mt-1">Clears without new allocation.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">4. Use literals when possible</h3>
                <code className="block text-xs mt-1">String s = "constant";</code>
                <p className="text-xs mt-1">Leverages String Pool, no new objects.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">5. Avoid unnecessary conversions</h3>
                <code className="block text-xs mt-1">Integer.toString(i); // not "" + i</code>
                <p className="text-xs mt-1">Direct conversion is faster.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">6. Use String.format() sparingly</h3>
                <code className="block text-xs mt-1">// Heavy, use + or StringBuilder</code>
                <p className="text-xs mt-1">Format is convenient but slower.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">💻 Performance Demos</h2>
            <div className="space-y-6">
              <JavaFileLoader
                fileModule={StringPerformanceIssues}
                title="StringPerformanceIssues.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={StringBuilderOptimizations}
                title="StringBuilderOptimizations.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={InterningDemo}
                title="InterningDemo.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              🧠 <strong>Try changing this:</strong> Increase the loop counts to see the dramatic difference between String and StringBuilder.
            </p>
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Common Performance Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Using <code>new String("literal")</code></strong> – Bypasses string pool, creates unnecessary object.</li>
                <li><strong>Concatenating in loops with <code>+</code></strong> – The #1 performance mistake.</li>
                <li><strong>Using <code>StringBuffer</code> without need</strong> – Pays synchronization cost.</li>
                <li><strong>Calling <code>trim()</code> or <code>toLowerCase()</code> repeatedly</strong> – Each call creates new string.</li>
                <li><strong>Using <code>split()</code> in tight loops</strong> – Compiles regex each time; compile once.</li>
                <li><strong>Interning every string</strong> – Can fill up PermGen (older JVMs) and slow lookups.</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">✅ Performance Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Prefer <code>StringBuilder</code> for dynamic building.</strong></li>
                <li><strong>Pre‑size <code>StringBuilder</code> when length is known.</strong></li>
                <li><strong>Use <code>String</code> literals instead of <code>new String()</code>.</strong></li>
                <li><strong>Reuse <code>StringBuilder</code> with <code>setLength(0)</code> in loops.</strong></li>
                <li><strong>Use <code>String.join()</code> or <code>Collectors.joining()</code> for delimited lists.</strong></li>
                <li><strong>Profile your code – don't optimize prematurely.</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real‑World Benchmark Data */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📈 Real‑World Benchmark (10,000 operations)</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">String concatenation in loop</span>
                <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded h-5 overflow-hidden">
                  <div className="bg-red-500 h-full" style={{ width: "100%" }}></div>
                </div>
                <span className="text-sm font-bold text-red-600">~800 ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">StringBuffer (default capacity)</span>
                <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded h-5 overflow-hidden">
                  <div className="bg-orange-500 h-full" style={{ width: "2%" }}></div>
                </div>
                <span className="text-sm">~4 ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">StringBuilder (default capacity)</span>
                <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded h-5 overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: "1.5%" }}></div>
                </div>
                <span className="text-sm">~2.5 ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">StringBuilder (pre‑sized)</span>
                <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded h-5 overflow-hidden">
                  <div className="bg-green-600 h-full" style={{ width: "1%" }}></div>
                </div>
                <span className="text-sm">~1.2 ms</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">* Times are illustrative; actual values depend on JVM and hardware.</p>
          </div>
        </div>

        {/* Checklist */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📝 Performance Checklist</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
              <li>✅ I avoid using <code>+</code> in loops – always use <code>StringBuilder</code>.</li>
              <li>✅ I pre‑size <code>StringBuilder</code> when I know the final length.</li>
              <li>✅ I reuse <code>StringBuilder</code> with <code>setLength(0)</code> in loops.</li>
              <li>✅ I use string literals instead of <code>new String()</code>.</li>
              <li>✅ I understand that <code>StringBuffer</code> is slower than <code>StringBuilder</code>.</li>
              <li>✅ I avoid unnecessary string transformations (trim, case change) in hot paths.</li>
              <li>✅ I profile before optimizing – I don't guess.</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.9s' }}>
          <FAQTemplate
            title="String Performance – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '1.0s' }}>
          <Teacher
            note={"This topic ties everything together. Run the performance demos live – students will be amazed at the difference. Emphasize that premature optimization is bad, but knowing these pitfalls saves you from writing O(n²) code. Use real examples: building a large CSV file, processing logs, generating HTML. Show them how to profile with System.nanoTime() or JMH. Ask: 'If you have a loop that runs 100,000 times, would you use String or StringBuilder?' The answer is obvious after the demo."}
          />
        </div>
      </div>
    </div>
  );
};

// SVG Component: Performance graph (quadratic vs linear)
const SVGPerformanceGraph = () => {
  return (
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="500" height="220" viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        {/* Axes */}
        <line x1="50" y1="180" x2="450" y2="180" stroke="#4B5563" strokeWidth="2" markerEnd="url(#axisArrow)" />
        <line x1="50" y1="180" x2="50" y2="20" stroke="#4B5563" strokeWidth="2" markerEnd="url(#axisArrow)" />
        <text x="250" y="200" textAnchor="middle" fontSize="10" fill="#6B7280">Number of operations (n)</text>
        <text x="20" y="100" textAnchor="middle" fontSize="10" fill="#6B7280" transform="rotate(-90,20,100)">Time (ms)</text>
        
        {/* Quadratic curve (String) */}
        <path d="M 50 178 Q 150 178, 250 150 Q 350 100, 450 30" stroke="#EF4444" strokeWidth="2" fill="none" />
        <text x="420" y="25" fontSize="11" fill="#EF4444" fontWeight="bold">String (O(n²))</text>
        
        {/* Linear line (StringBuilder) */}
        <line x1="50" y1="178" x2="450" y2="160" stroke="#10B981" strokeWidth="2" />
        <text x="400" y="155" fontSize="11" fill="#10B981" fontWeight="bold">StringBuilder (O(n))</text>
        
        {/* Dashed line for reference */}
        <line x1="250" y1="180" x2="250" y2="20" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4" />
        
        <defs>
          <marker id="axisArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#4B5563" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default Topic11;