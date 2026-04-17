import React from 'react';
import clsx from 'clsx';
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from './topic10_files/topic10_questions';
import ComparisonDemo from './topic10_files/ComparisonDemo.java?raw';
import PerformanceComparison from './topic10_files/PerformanceComparison.java?raw';
import UseCaseDemo from './topic10_files/UseCaseDemo.java?raw';

const Topic10 = () => {
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
            String vs StringBuffer vs StringBuilder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Choosing the right string class can dramatically affect your application's performance and correctness. Learn when to use each.
          </p>
        </div>

        {/* Comparison Table */}
        <div className={cardClasses} style={{ animationDelay: '0.1s' }} className="animate-fade-slide-up">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">📊</span> Side‑by‑Side Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-2 text-left">Feature</th>
                  <th className="p-2 text-left">String</th>
                  <th className="p-2 text-left">StringBuffer</th>
                  <th className="p-2 text-left">StringBuilder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr><td className="p-2">Mutability</td><td className="p-2">Immutable</td><td className="p-2">Mutable</td><td className="p-2">Mutable</td></tr>
                <tr><td className="p-2">Thread‑Safe</td><td className="p-2">✅ Yes (by immutability)</td><td className="p-2">✅ Yes (synchronized)</td><td className="p-2">❌ No</td></tr>
                <tr><td className="p-2">Performance</td><td className="p-2">Fast for few operations</td><td className="p-2">Slower (synchronization)</td><td className="p-2">Fastest</td></tr>
                <tr><td className="p-2">Memory Efficiency (many changes)</td><td className="p-2">Poor (many objects)</td><td className="p-2">Good</td><td className="p-2">Good</td></tr>
                <tr><td className="p-2">Used as HashMap Key</td><td className="p-2">✅ Safe</td><td className="p-2">❌ Not recommended</td><td className="p-2">❌ Not recommended</td></tr>
                <tr><td className="p-2">Introduced</td><td className="p-2">Java 1.0</td><td className="p-2">Java 1.0</td><td className="p-2">Java 1.5</td></tr>
                <tr><td className="p-2">Method Chaining</td><td className="p-2">❌ (returns new String)</td><td className="p-2">✅ (returns this)</td><td className="p-2">✅ (returns this)</td></tr>
                <tr><td className="p-2">String Pool Support</td><td className="p-2">✅ Yes (literals)</td><td className="p-2">❌ No</td><td className="p-2">❌ No</td></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-sm">💡 <strong>Rule of thumb:</strong> Use <code>String</code> for unchanging text, <code>StringBuilder</code> for single‑threaded building, <code>StringBuffer</code> only when sharing across threads.</p>
          </div>
        </div>

        {/* Visual: When to Use Which */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">🧭 Decision Flowchart</h2>
            <div className="flex justify-center py-4">
              <SVGDecisionFlowchart />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Follow this decision tree to pick the right class for your use case.
            </p>
          </div>
        </div>

        {/* Detailed Comparison */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-2 text-blue-600">🔒 String</h3>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Immutable – cannot change after creation</li>
                <li>Thread‑safe by design</li>
                <li>Stored in String Pool (literals)</li>
                <li>Best for: constants, map keys, return values</li>
                <li>Poor for: many concatenations or loops</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-2 text-orange-600">🧵 StringBuffer</h3>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Mutable – can change content</li>
                <li>Thread‑safe (synchronized methods)</li>
                <li>Slower than StringBuilder</li>
                <li>Best for: multi‑threaded string building</li>
                <li>Legacy: exists since Java 1.0</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-2 text-green-600">⚡ StringBuilder</h3>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Mutable – can change content</li>
                <li>Not thread‑safe (no synchronization)</li>
                <li>Fastest for single‑threaded use</li>
                <li>Best for: most dynamic string building</li>
                <li>Introduced in Java 1.5 as a faster replacement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Performance Visualization */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">📈 Performance Comparison (10,000 concatenations)</h2>
            <div className="flex justify-center py-4">
              <SVGPerformanceBarChart />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              StringBuilder is fastest, String is slowest for many operations, StringBuffer in between.
            </p>
          </div>
        </div>

        {/* Code Examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">💻 Live Code Demonstrations</h2>
            <div className="space-y-6">
              <JavaFileLoader
                fileModule={ComparisonDemo}
                title="ComparisonDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={PerformanceComparison}
                title="PerformanceComparison.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={UseCaseDemo}
                title="UseCaseDemo.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              🧠 <strong>Try changing this:</strong> Increase the loop count to 100,000 and observe the massive time difference between String and StringBuilder.
            </p>
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Using String in loops</strong> – Creates O(n²) intermediate objects.</li>
                <li><strong>Using StringBuffer when StringBuilder suffices</strong> – Paying synchronization cost unnecessarily.</li>
                <li><strong>Using StringBuilder as a HashMap key</strong> – Key can change, breaking the map.</li>
                <li><strong>Returning StringBuilder from a method</strong> – Exposes mutable internal state.</li>
                <li><strong>Not pre‑sizing StringBuilder</strong> – Causes repeated array resizing.</li>
                <li><strong>Assuming StringBuffer is always thread‑safe for compound actions</strong> – Individual methods are safe, but sequences like check‑then‑act need external sync.</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Default to String</strong> – It's simple and safe.</li>
                <li><strong>Use StringBuilder for dynamic building</strong> – Especially in loops or when you have many appends.</li>
                <li><strong>Use StringBuffer only when sharing across threads</strong> – Rare for most applications.</li>
                <li><strong>Return String from methods</strong> – Convert StringBuilder to String before returning.</li>
                <li><strong>Pre‑size StringBuilder when you know final length</strong> – e.g., <code>new StringBuilder(1000)</code>.</li>
                <li><strong>Use <code>setLength(0)</code> to clear and reuse StringBuilder</strong> – Avoids creating new objects.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real‑World Use Cases */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🌍 Real‑World Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <h3 className="font-bold">String</h3>
                <ul className="list-disc pl-4 text-sm mt-1">
                  <li>Configuration keys</li>
                  <li>HashMap keys (e.g., user IDs)</li>
                  <li>Log messages (static text)</li>
                  <li>Return values from APIs</li>
                  <li>Constants (<code>static final</code>)</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">StringBuilder</h3>
                <ul className="list-disc pl-4 text-sm mt-1">
                  <li>Building SQL queries dynamically</li>
                  <li>Generating JSON/XML from data</li>
                  <li>Processing large files (line by line)</li>
                  <li>String concatenation in loops</li>
                  <li>Most web framework internal buffers</li>
                </ul>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <h3 className="font-bold">StringBuffer</h3>
                <ul className="list-disc pl-4 text-sm mt-1">
                  <li>Legacy code (pre‑Java 1.5)</li>
                  <li>Logging from multiple threads</li>
                  <li>Shared response builders in servlets</li>
                  <li>Any multi‑threaded string accumulation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📝 Student Checklist</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
              <li>✅ I know the differences between String, StringBuffer, and StringBuilder.</li>
              <li>✅ I understand immutability vs mutability.</li>
              <li>✅ I know which is thread‑safe and why.</li>
              <li>✅ I can choose the right class for a given scenario.</li>
              <li>✅ I understand why StringBuilder is fastest.</li>
              <li>✅ I never use String in loops for concatenation.</li>
              <li>✅ I pre‑size StringBuilder when possible.</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.9s' }}>
          <FAQTemplate
            title="String vs StringBuffer vs StringBuilder – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '1.0s' }}>
          <Teacher
            note={"This is a crucial comparison topic. Run the performance demo live – students will see that String is 100x slower for 10,000 concatenations. Emphasize that StringBuilder was added later to fix StringBuffer's unnecessary synchronization. Use the decision tree visual to guide their thinking. Real‑world: show how web frameworks use StringBuilder to build HTML responses. Ask: 'If you were writing a chat server that logs messages from many threads, which would you use?' (StringBuffer)."}
          />
        </div>
      </div>
    </div>
  );
};

// SVG Component: Decision flowchart
const SVGDecisionFlowchart = () => {
  return (
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="600" height="280" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        <rect x="200" y="10" width="160" height="40" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="280" y="35" textAnchor="middle" fontSize="12" fill="#1E3A8A">Need to build a string?</text>
        
        <path d="M280 50 L280 70" stroke="#4B5563" strokeWidth="2" markerEnd="url(#decisionArrow)" />
        
        <rect x="180" y="75" width="200" height="35" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="280" y="97" textAnchor="middle" fontSize="11" fill="#92400E">Will the string change often?</text>
        
        {/* No branch */}
        <path d="M180 92 L80 92 L80 140" stroke="#EF4444" strokeWidth="2" markerEnd="url(#redArrow)" fill="none" />
        <rect x="30" y="145" width="100" height="40" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
        <text x="80" y="168" textAnchor="middle" fontSize="11" fill="#991B1B">Use String</text>
        <text x="120" y="92" fontSize="10" fill="#EF4444">No</text>
        
        {/* Yes branch */}
        <path d="M380 92 L480 92 L480 140" stroke="#10B981" strokeWidth="2" markerEnd="url(#greenArrow)" fill="none" />
        <text x="440" y="85" fontSize="10" fill="#10B981">Yes</text>
        
        <rect x="430" y="145" width="100" height="35" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
        <text x="480" y="167" textAnchor="middle" fontSize="10" fill="#064E3B">Will it be shared</text>
        <text x="480" y="178" textAnchor="middle" fontSize="10" fill="#064E3B">across threads?</text>
        
        <path d="M480 180 L480 200" stroke="#4B5563" strokeWidth="2" markerEnd="url(#decisionArrow)" />
        
        <rect x="390" y="205" width="100" height="40" rx="6" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
        <text x="440" y="228" textAnchor="middle" fontSize="11" fill="#7C2D12">Use StringBuffer</text>
        <text x="440" y="200" fontSize="10" fill="#EA580C">Yes</text>
        
        <rect x="510" y="205" width="100" height="40" rx="6" fill="#A7F3D0" stroke="#059669" strokeWidth="1.5" />
        <text x="560" y="228" textAnchor="middle" fontSize="11" fill="#064E3B">Use StringBuilder</text>
        <text x="560" y="200" fontSize="10" fill="#059669">No</text>
        
        <path d="M530 180 L560 180 L560 200" stroke="#059669" strokeWidth="2" markerEnd="url(#greenArrow)" fill="none" />
        <path d="M430 180 L440 180 L440 200" stroke="#EA580C" strokeWidth="2" markerEnd="url(#orangeArrow)" fill="none" />
        
        <defs>
          <marker id="decisionArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#4B5563" /></marker>
          <marker id="redArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#EF4444" /></marker>
          <marker id="greenArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#10B981" /></marker>
          <marker id="orangeArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#EA580C" /></marker>
        </defs>
      </svg>
    </div>
  );
};

// SVG Component: Performance bar chart
const SVGPerformanceBarChart = () => {
  return (
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="550" height="200" viewBox="0 0 550 200" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        <text x="275" y="25" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#374151">Time to concatenate 10,000 strings (lower is better)</text>
        
        {/* String bar */}
        <rect x="60" y="120" width="120" height="40" rx="4" fill="#EF4444" />
        <text x="120" y="105" textAnchor="middle" fontSize="11" fill="#EF4444" fontWeight="bold">~500-1000 ms</text>
        <text x="120" y="145" textAnchor="middle" fontSize="12" fill="white">String</text>
        
        {/* StringBuffer bar */}
        <rect x="215" y="145" width="120" height="15" rx="4" fill="#F97316" />
        <text x="275" y="130" textAnchor="middle" fontSize="11" fill="#F97316" fontWeight="bold">~2-5 ms</text>
        <text x="275" y="175" textAnchor="middle" fontSize="12" fill="#374151">StringBuffer</text>
        
        {/* StringBuilder bar */}
        <rect x="370" y="155" width="120" height="5" rx="4" fill="#10B981" />
        <text x="430" y="140" textAnchor="middle" fontSize="11" fill="#10B981" fontWeight="bold">~1-2 ms</text>
        <text x="430" y="175" textAnchor="middle" fontSize="12" fill="#374151">StringBuilder</text>
        
        <line x1="60" y1="185" x2="500" y2="185" stroke="#D1D5DB" strokeWidth="1" />
        <text x="50" y="195" fontSize="9" fill="#6B7280">Faster →</text>
        <text x="510" y="195" fontSize="9" fill="#6B7280">Slower →</text>
      </svg>
    </div>
  );
};

export default Topic10;