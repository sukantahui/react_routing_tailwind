import React from 'react';
import clsx from 'clsx';
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from './topic1_files/topic1_questions';
import LiteralVsNewDemo from './topic1_files/LiteralVsNewDemo.java?raw';
import StringPoolDemo from './topic1_files/StringPoolDemo.java?raw';

const Topic1 = () => {
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
            String Creation: Literals vs new Keyword
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Not all Strings are created equal. Understanding how Java stores Strings can save memory and prevent subtle bugs.
          </p>
        </div>

        {/* Core Concept */}
        <div className={cardClasses} style={{ animationDelay: '0.1s' }} className="animate-fade-slide-up">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">⚖️</span> Two Ways to Create a String
          </h2>
          <p className="leading-relaxed mb-4">
            In Java, you can create a <code>String</code> in two fundamentally different ways: using a <strong>string literal</strong> 
            or the <strong><code>new</code> keyword</strong>. The difference lies in where the String is stored in memory and 
            whether it participates in the <strong>String Pool</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-bold text-blue-700 dark:text-blue-300 text-lg">📜 String Literal</h3>
              <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded">String name = "Swadeep";</code>
              <p className="text-sm mt-2">✔ Stored in <strong>String Pool</strong><br/>✔ Reused if same literal exists<br/>✔ Memory efficient</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
              <h3 className="font-bold text-orange-700 dark:text-orange-300 text-lg">🆕 new Keyword</h3>
              <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded">String name = new String("Tuhina");</code>
              <p className="text-sm mt-2">⚠ Stored in <strong>Heap (outside pool)</strong><br/>⚠ Always creates new object<br/>⚠ May waste memory</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-sm">💡 <strong>Think about:</strong> If 100 students have the same city name "Barrackpore", would you want 100 copies or just one shared copy?</p>
          </div>
        </div>

        {/* Memory Diagram SVG */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🗺️</span> Memory View: String Pool vs Heap
            </h2>
            <div className="flex justify-center py-4">
              <SVGMemoryVisualizer />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Literals point to the same object in the String Pool; <code>new</code> creates separate objects on the Heap.
            </p>
          </div>
        </div>

        {/* Why String Pool? */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">❓ Why Does Java Have a String Pool?</h2>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li><strong>Memory Optimization:</strong> Reusing identical literals reduces memory footprint – crucial for large applications (e.g., processing log files with repeated keywords).</li>
              <li><strong>Performance:</strong> String comparison using <code>==</code> becomes very fast when you know both are pooled (but still, always prefer <code>.equals()</code> for logic).</li>
              <li><strong>Caching:</strong> String literals are automatically interned, making them ideal for constants and keys in <code>HashMap</code>.</li>
            </ul>
            <div className="mt-4 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-sm">🎯 <strong>Pro Tip:</strong> Use <code>String.intern()</code> manually if you have many duplicate strings created via <code>new</code>, but in modern Java, literals are almost always better.</p>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">📂 Live Code Demonstrations</h2>
            <div className="space-y-6">
              <JavaFileLoader
                fileModule={LiteralVsNewDemo}
                title="LiteralVsNewDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={StringPoolDemo}
                title="StringPoolDemo.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              🧠 <strong>Try changing this:</strong> Create two <code>new String("Hello")</code> objects and compare them with <code>==</code>. Then call <code>.intern()</code> on one and compare again.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">📊 Literal vs new – At a Glance</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="p-3 text-left">Feature</th>
                    <th className="p-3 text-left">String Literal</th>
                    <th className="p-3 text-left">new String()</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr><td className="p-3">Storage Location</td><td className="p-3">String Pool (Heap)</td><td className="p-3">Heap (outside pool)</td></tr>
                  <tr><td className="p-3">Reuses existing object</td><td className="p-3">✅ Yes</td><td className="p-3">❌ No (always new)</td></tr>
                  <tr><td className="p-3">Memory efficient</td><td className="p-3">✅ High</td><td className="p-3">⚠ Lower</td></tr>
                  <tr><td className="p-3">Performance for <code>==</code> comparison</td><td className="p-3">Fast (if same reference)</td><td className="p-3">Unreliable (use .equals)</td></tr>
                  <tr><td className="p-3">When to use</td><td className="p-3">Always, unless forced</td><td className="p-3">Almost never (legacy or specific needs)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Using <code>new String()</code> unnecessarily</strong> – Wastes memory and makes pool useless.</li>
                <li><strong>Believing <code>==</code> works for content</strong> – It only works if both are literals; still not safe.</li>
                <li><strong>Forgetting that <code>new String()</code> creates a new object even if content matches</strong> – Leads to <code>false</code> when comparing with <code>==</code>.</li>
                <li><strong>Not understanding immutability</strong> – Both literal and new produce immutable strings.</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Always prefer string literals</strong> – <code>String s = "value";</code> not <code>new String("value")</code>.</li>
                <li><strong>Use <code>.equals()</code> for content comparison</strong> – Never rely on <code>==</code> for logic.</li>
                <li><strong>Define constants as <code>static final</code> literals</strong> – They will be pooled and reused.</li>
                <li><strong>If you must create many dynamic strings, use <code>StringBuilder</code></strong> – Not <code>new String()</code>.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📝 Student Checklist – String Creation</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
              <li>✅ I know two ways to create a String: literal and <code>new</code>.</li>
              <li>✅ I understand that literals are stored in the String Pool.</li>
              <li>✅ I know that <code>new String()</code> always creates a new object on the Heap.</li>
              <li>✅ I will never use <code>new String()</code> for ordinary text.</li>
              <li>✅ I understand why <code>==</code> may give different results for literals vs new.</li>
              <li>✅ I can explain memory benefits of the String Pool using an example (e.g., many students from same city).</li>
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <FAQTemplate
            title="String Creation (Literals vs new) – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.9s' }}>
          <Teacher
            note={"Students often memorize 'use equals not ==' without understanding why. This topic is the perfect place to demonstrate the difference by showing reference equality with literals (true) vs new (false). Use a real memory diagram and ask: 'If I change one literal, will the other change?' to reinforce immutability. Also warn against using new String() in loops – it's a common performance pitfall."}
          />
        </div>
      </div>
    </div>
  );
};

// SVG Component: Memory diagram showing String Pool and Heap
const SVGMemoryVisualizer = () => {
  return (
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="600" height="280" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        {/* Heap boundary */}
        <rect x="20" y="20" width="560" height="240" rx="12" fill="#E5E7EB" stroke="#6B7280" strokeWidth="2" className="dark:fill-gray-700 dark:stroke-gray-500" />
        <text x="40" y="45" fontSize="14" fontWeight="bold" fill="#374151" className="dark:fill-gray-300">Heap Memory</text>
        
        {/* String Pool region */}
        <rect x="40" y="60" width="250" height="180" rx="8" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" className="dark:fill-blue-900/30 dark:stroke-blue-400" />
        <text x="165" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1E40AF" className="dark:fill-blue-300">String Pool</text>
        
        {/* Pooled String objects */}
        <rect x="70" y="100" width="80" height="40" rx="6" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.5" className="dark:fill-blue-800/50 dark:stroke-blue-500" />
        <text x="110" y="124" textAnchor="middle" fontSize="12" fill="#1E3A8A" className="dark:fill-blue-200">"Ichapur"</text>
        
        <rect x="180" y="100" width="80" height="40" rx="6" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.5" className="dark:fill-blue-800/50 dark:stroke-blue-500" />
        <text x="220" y="124" textAnchor="middle" fontSize="12" fill="#1E3A8A" className="dark:fill-blue-200">"Naihati"</text>
        
        <rect x="70" y="170" width="80" height="40" rx="6" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.5" className="dark:fill-blue-800/50 dark:stroke-blue-500" />
        <text x="110" y="194" textAnchor="middle" fontSize="12" fill="#1E3A8A" className="dark:fill-blue-200">"Shyamnagar"</text>
        
        {/* Heap (non-pool) region */}
        <rect x="310" y="60" width="250" height="180" rx="8" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" className="dark:fill-red-900/30 dark:stroke-red-400" />
        <text x="435" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991B1B" className="dark:fill-red-300">Heap (Non-Pool)</text>
        
        {/* Non-pool String objects */}
        <rect x="340" y="100" width="80" height="40" rx="6" fill="#FECACA" stroke="#DC2626" strokeWidth="1.5" className="dark:fill-red-800/50 dark:stroke-red-500" />
        <text x="380" y="124" textAnchor="middle" fontSize="12" fill="#7F1D1D" className="dark:fill-red-200">"Barrackpore"</text>
        
        <rect x="450" y="100" width="80" height="40" rx="6" fill="#FECACA" stroke="#DC2626" strokeWidth="1.5" className="dark:fill-red-800/50 dark:stroke-red-500" />
        <text x="490" y="124" textAnchor="middle" fontSize="12" fill="#7F1D1D" className="dark:fill-red-200">"Barrackpore"</text>
        
        <text x="490" y="95" textAnchor="middle" fontSize="10" fill="#EF4444">different objects!</text>
        
        {/* References from variables */}
        <line x1="110" y1="100" x2="110" y2="60" stroke="#10B981" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowGreen)" />
        <text x="115" y="75" fontSize="10" fill="#10B981">s1</text>
        
        <line x1="220" y1="100" x2="220" y2="60" stroke="#10B981" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowGreen)" />
        <text x="225" y="75" fontSize="10" fill="#10B981">s2</text>
        
        <line x1="380" y1="100" x2="380" y2="60" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowOrange)" />
        <text x="385" y="75" fontSize="10" fill="#F59E0B">s3</text>
        
        <line x1="490" y1="100" x2="490" y2="60" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowOrange)" />
        <text x="495" y="75" fontSize="10" fill="#F59E0B">s4</text>
        
        <defs>
          <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10B981" />
          </marker>
          <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#F59E0B" />
          </marker>
        </defs>
        
        <text x="40" y="260" fontSize="11" fill="#4B5563" className="dark:fill-gray-400">s1, s2 refer to same pooled object. s3, s4 refer to different heap objects.</text>
      </svg>
    </div>
  );
};

export default Topic1;