import React from 'react';
import clsx from 'clsx';
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate'; 
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from './topic8_files/topic8_questions';
import MutableVsImmutableDemo from './topic8_files/MutableVsImmutableDemo.java?raw';
import PerformanceComparison from './topic8_files/PerformanceComparison.java?raw';
import WhenToUseWhat from './topic8_files/WhenToUseWhat.java?raw';

const Topic8 = () => {
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
            Mutable vs Immutable Strings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Understanding the fundamental difference between mutable and immutable strings is key to writing efficient and bug‑free Java code.
          </p>
        </div>

        {/* Core Concept */}
        <div className={cardClasses} style={{ animationDelay: '0.1s' }} className="animate-fade-slide-up">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">⚡</span> What Does Mutable / Immutable Mean?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <h3 className="font-bold text-red-700 dark:text-red-300 text-lg">🔒 Immutable (String)</h3>
              <p className="mt-2 text-sm">Once created, the content <strong>cannot be changed</strong>. Any operation that seems to modify the string creates a <strong>new object</strong>.</p>
              <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                String s = "Hello";<br/>
                s.toUpperCase();   // new object<br/>
                System.out.println(s); // still "Hello"
              </code>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <h3 className="font-bold text-green-700 dark:text-green-300 text-lg">✏️ Mutable (StringBuffer / StringBuilder)</h3>
              <p className="mt-2 text-sm">The content <strong>can be changed</strong> after creation. Methods modify the same object.</p>
              <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                StringBuilder sb = new StringBuilder("Hello");<br/>
                sb.append(" World");   // modifies sb<br/>
                System.out.println(sb); // "Hello World"
              </code>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-sm">💡 <strong>Think about:</strong> Immutable = read‑only document. Mutable = editable whiteboard. Choose based on whether you need to change it often.</p>
          </div>
        </div>

        {/* Visual: Immutable vs Mutable */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">👁️ Visual: How Each Behaves</h2>
            <div className="flex justify-center py-4">
              <SVGCompareVisualizer />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Immutable strings create new objects; mutable strings modify the existing object.
            </p>
          </div>
        </div>

        {/* Key Differences Table */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📊 Immutable (String) vs Mutable (StringBuilder / StringBuffer)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="p-2 text-left">Feature</th>
                    <th className="p-2 text-left">Immutable (String)</th>
                    <th className="p-2 text-left">Mutable (StringBuilder/StringBuffer)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr><td className="p-2">Can change content</td><td className="p-2">❌ No</td><td className="p-2">✅ Yes</td></tr>
                  <tr><td className="p-2">New object on modification</td><td className="p-2">✅ Yes (every time)</td><td className="p-2">❌ No (modifies in place)</td></tr>
                  <tr><td className="p-2">Memory efficiency for many changes</td><td className="p-2">Poor (many objects)</td><td className="p-2">Good (reuses same object)</td></tr>
                  <tr><td className="p-2">Thread‑safe</td><td className="p-2">✅ Yes (by immutability)</td><td className="p-2">StringBuffer: ✅; StringBuilder: ❌</td></tr>
                  <tr><td className="p-2">Can be used as HashMap key</td><td className="p-2">✅ Yes (safe)</td><td className="p-2">❌ No (mutable keys break hashing)</td></tr>
                  <tr><td className="p-2">Performance for single modifications</td><td className="p-2">Good (compiler optimizes)</td><td className="p-2">Slightly slower due to object overhead</td></tr>
                  <tr><td className="p-2">Performance for many modifications</td><td className="p-2">Poor (O(n²) in loops)</td><td className="p-2">Excellent (O(n))</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">💻 Live Code Demonstrations</h2>
            <div className="space-y-6">
              <JavaFileLoader
                fileModule={MutableVsImmutableDemo}
                title="MutableVsImmutableDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={PerformanceComparison}
                title="PerformanceComparison.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={WhenToUseWhat}
                title="WhenToUseWhat.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              🧠 <strong>Try changing this:</strong> Increase the loop count to 50,000 and see the dramatic time difference between String and StringBuilder.
            </p>
          </div>
        </div>

        {/* Real‑World Usage */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🌍 Real‑World Scenarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <h3 className="font-bold">Immutable (String)</h3>
                <ul className="list-disc pl-4 text-sm mt-1">
                  <li>Configuration keys, constants</li>
                  <li>HashMap keys</li>
                  <li>Thread‑shared data (e.g., log messages)</li>
                  <li>Return values from methods (safety)</li>
                  <li>Passwords / sensitive data (immutable reduces risk)</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">Mutable (StringBuilder)</h3>
                <ul className="list-disc pl-4 text-sm mt-1">
                  <li>Building strings in loops</li>
                  <li>Parsing and processing large text</li>
                  <li>SQL query construction</li>
                  <li>JSON/XML generation</li>
                  <li>Reading large files line by line</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Using <code>String</code> in loops</strong> – Creates thousands of intermediate objects.</li>
                <li><strong>Assuming <code>StringBuilder</code> is always faster</strong> – For a few concatenations, <code>String</code> is fine (compiler optimizes).</li>
                <li><strong>Using mutable strings as map keys</strong> – After modification, the key becomes lost.</li>
                <li><strong>Returning <code>StringBuilder</code> from a method</strong> – Breaks encapsulation (caller can modify internal state).</li>
                <li><strong>Using <code>StringBuffer</code> when not needed</strong> – Pays synchronization cost unnecessarily.</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Prefer <code>String</code> for fixed, unchanging text.</strong></li>
                <li><strong>Prefer <code>StringBuilder</code> for building strings dynamically.</strong></li>
                <li><strong>Return <code>String</code> from methods, not <code>StringBuilder</code>.</strong></li>
                <li><strong>Pre‑size <code>StringBuilder</code> when you know the final length.</strong></li>
                <li><strong>Use <code>StringBuffer</code> only when sharing across threads.</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📝 Student Checklist – Mutable vs Immutable</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
              <li>✅ I understand that <code>String</code> is immutable (content never changes).</li>
              <li>✅ I understand that <code>StringBuilder</code> / <code>StringBuffer</code> are mutable.</li>
              <li>✅ I can explain why immutability is useful for security and caching.</li>
              <li>✅ I know when to use <code>String</code> vs <code>StringBuilder</code>.</li>
              <li>✅ I never use <code>String</code> for heavy concatenation inside loops.</li>
              <li>✅ I can identify the performance trade‑offs between mutable and immutable.</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <FAQTemplate
            title="Mutable vs Immutable Strings – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.9s' }}>
          <Teacher
            note={"Use a whiteboard to draw memory diagrams. Show that String concatenation in a loop creates many objects, while StringBuilder reuses one. Then run the performance comparison live – students will see the difference. Emphasize that immutability is not a bug; it's a design choice for safety. Ask: 'Would you want your bank account balance string to change unexpectedly?' No – that's why immutable is good for values."}
          />
        </div>
      </div>
    </div>
  );
};

// SVG Component: Side‑by‑side comparison of immutable vs mutable
const SVGCompareVisualizer = () => {
  return (
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="650" height="280" viewBox="0 0 650 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        {/* Immutable section */}
        <text x="160" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#EF4444">Immutable (String)</text>
        <rect x="60" y="50" width="100" height="40" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
        <text x="110" y="74" textAnchor="middle" fontSize="12" fill="#991B1B">"Hi"</text>
        <path d="M160 70 L200 70" stroke="#EF4444" strokeWidth="2" markerEnd="url(#redArrow)" />
        <rect x="205" y="50" width="100" height="40" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
        <text x="255" y="74" textAnchor="middle" fontSize="12" fill="#991B1B">"Hi!"</text>
        <text x="110" y="115" textAnchor="middle" fontSize="10" fill="#EF4444">original</text>
        <text x="255" y="115" textAnchor="middle" fontSize="10" fill="#EF4444">new object</text>

        {/* Mutable section */}
        <text x="490" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#10B981">Mutable (StringBuilder)</text>
        <rect x="390" y="50" width="100" height="40" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
        <text x="440" y="74" textAnchor="middle" fontSize="12" fill="#064E3B">"Hi"</text>
        <path d="M490 70 L520 70" stroke="#10B981" strokeWidth="2" markerEnd="url(#greenArrow)" />
        <rect x="525" y="50" width="100" height="40" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" strokeDasharray="4" />
        <text x="575" y="74" textAnchor="middle" fontSize="12" fill="#064E3B">"Hi!"</text>
        <text x="440" y="115" textAnchor="middle" fontSize="10" fill="#10B981">same object</text>
        <text x="575" y="115" textAnchor="middle" fontSize="10" fill="#10B981">(modified)</text>

        {/* Additional notes */}
        <rect x="60" y="150" width="520" height="100" rx="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600" />
        <text x="80" y="175" fontSize="12" fontWeight="bold" fill="#374151">Key Takeaways:</text>
        <text x="80" y="195" fontSize="11" fill="#4B5563">• Immutable: each change creates a new object – safe but memory‑heavy for many changes.</text>
        <text x="80" y="215" fontSize="11" fill="#4B5563">• Mutable: changes happen in place – efficient for repeated modifications.</text>
        <text x="80" y="235" fontSize="11" fill="#4B5563">• Choose based on how often you modify the string and whether thread‑safety is needed.</text>

        <defs>
          <marker id="redArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#EF4444" />
          </marker>
          <marker id="greenArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10B981" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default Topic8;