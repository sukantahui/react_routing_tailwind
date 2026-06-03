import React from 'react';
import clsx from 'clsx';
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from './topic4_files/topic4_questions';
import StringComparisonDemo from './topic4_files/StringComparisonDemo.java?raw';
import PoolVsNewDemo from './topic4_files/PoolVsNewDemo.java?raw';
import NullSafeComparison from './topic4_files/NullSafeComparison.java?raw';

const Topic4 = () => {
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
            String Comparison: == vs equals()
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            One of the most common mistakes in Java is using <code>==</code> to compare strings. 
            Understanding the difference between reference equality and content equality is essential.
          </p>
        </div>

        {/* Core Concept */}
        <div className={cardClasses} style={{ animationDelay: '0.1s' }} className="animate-fade-slide-up">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">⚖️</span> The Fundamental Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <h3 className="font-bold text-red-700 dark:text-red-300 text-lg">== Operator</h3>
              <p className="mt-2 text-sm"><strong>Compares references (memory addresses)</strong></p>
              <ul className="list-disc pl-4 mt-2 text-sm space-y-1">
                <li>Returns <code>true</code> only if both variables point to the <strong>exact same object</strong>.</li>
                <li>Does NOT look at the content.</li>
                <li>Fast, but usually not what you want for strings.</li>
              </ul>
              <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                String a = "Hi";<br/>
                String b = "Hi";<br/>
                System.out.println(a == b); // true (same object in pool)
              </code>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <h3 className="font-bold text-green-700 dark:text-green-300 text-lg">.equals() Method</h3>
              <p className="mt-2 text-sm"><strong>Compares content (characters)</strong></p>
              <ul className="list-disc pl-4 mt-2 text-sm space-y-1">
                <li>Returns <code>true</code> if the strings contain the same sequence of characters.</li>
                <li>Ignores memory location – focuses on value.</li>
                <li>This is what you need 99% of the time.</li>
              </ul>
              <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                String a = new String("Hi");<br/>
                String b = new String("Hi");<br/>
                System.out.println(a.equals(b)); // true (same content)
              </code>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-sm">💡 <strong>Think about:</strong> Two people with the same name – are they the same person? <code>==</code> asks "are they the exact same person?"; <code>.equals()</code> asks "do they have the same name?"</p>
          </div>
        </div>

        {/* Visual: Reference vs Content */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">👁️ Visual: Reference Equality vs Content Equality</h2>
            <div className="flex justify-center py-4">
              <SVGComparisonVisualizer />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              <code>==</code> checks if arrows point to the same box; <code>.equals()</code> checks if the text inside boxes is the same.
            </p>
          </div>
        </div>

        {/* Method Signatures */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📋 Method Signatures & Purpose</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-mono text-sm">public boolean equals(Object obj)</h3>
                <p className="text-sm mt-1"><strong>Return type:</strong> <code>boolean</code></p>
                <p className="text-sm"><strong>Purpose:</strong> Compares the <strong>content</strong> of the string with another object. Returns <code>true</code> if the argument is a String and the characters match exactly.</p>
                <p className="text-sm"><strong>When to use:</strong> Whenever you need to check if two strings have the same text (most common).</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-mono text-sm">public boolean equalsIgnoreCase(String anotherString)</h3>
                <p className="text-sm mt-1"><strong>Return type:</strong> <code>boolean</code></p>
                <p className="text-sm"><strong>Purpose:</strong> Compares content ignoring case differences.</p>
                <p className="text-sm"><strong>When to use:</strong> For case-insensitive comparisons (e.g., usernames, email addresses).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">💻 Live Code Demonstrations</h2>
            <div className="space-y-6">
              <JavaFileLoader
                fileModule={StringComparisonDemo}
                title="StringComparisonDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={PoolVsNewDemo}
                title="PoolVsNewDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={NullSafeComparison}
                title="NullSafeComparison.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              🧠 <strong>Try changing this:</strong> Create two strings with <code>new String("test")</code> and compare with <code>==</code> vs <code>.equals()</code>. Observe the difference.
            </p>
          </div>
        </div>

        {/* When Does == Work? */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🤔 When Does <code>==</code> Actually Work for Strings?</h2>
            <p className="leading-relaxed mb-3">
              <code>==</code> returns <code>true</code> only when both strings are the <strong>same object</strong>. This happens when:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Both are string literals with the same content (due to String Pool).</li>
              <li>Both refer to the same object (e.g., <code>String a = b;</code>).</li>
              <li>You manually intern strings using <code>.intern()</code>.</li>
            </ul>
            <div className="mt-3 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <p className="text-sm">⚠️ <strong>Warning:</strong> Relying on <code>==</code> for string comparison is dangerous because it may work sometimes (with literals) and fail other times (with new). Always use <code>.equals()</code> for logic.</p>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Using <code>==</code> for content comparison</strong> – The #1 string mistake in Java.</li>
                <li><strong>Assuming <code>==</code> always works for literals</strong> – It does, but your code may change later and break.</li>
                <li><strong>Forgetting that <code>.equals()</code> is case-sensitive</strong> – Use <code>equalsIgnoreCase()</code> when needed.</li>
                <li><strong>Calling <code>.equals()</code> on a <code>null</code> reference</strong> – Causes <code>NullPointerException</code>.</li>
                <li><strong>Comparing with <code>==</code> after interning</strong> – Unnecessary and confusing.</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Always use <code>.equals()</code> for content comparison</strong> – Never use <code>==</code> for string logic.</li>
                <li><strong>Use <code>equalsIgnoreCase()</code></strong> when case doesn't matter (e.g., emails).</li>
                <li><strong>Place literal first</strong> – <code>"constant".equals(variable)</code> avoids <code>NullPointerException</code>.</li>
                <li><strong>Use <code>Objects.equals()</code></strong> (Java 7+) for null-safe comparison.</li>
                <li><strong>Normalize strings before comparison</strong> – <code>trim().toLowerCase()</code> for user input.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📝 Student Checklist – String Comparison</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
              <li>✅ I know <code>==</code> compares references (memory addresses).</li>
              <li>✅ I know <code>.equals()</code> compares content (characters).</li>
              <li>✅ I always use <code>.equals()</code> to compare string values.</li>
              <li>✅ I understand why <code>==</code> might accidentally work for literals.</li>
              <li>✅ I can handle null safely using literal-first or <code>Objects.equals()</code>.</li>
              <li>✅ I know when to use <code>equalsIgnoreCase()</code>.</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <FAQTemplate
            title="String Comparison (== vs equals) – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.9s' }}>
          <Teacher
            note={"This is the single most common source of bugs in beginner code. Demonstrate live: create two strings with same content (one literal, one new). Show that == gives false but equals gives true. Then ask students to predict outcomes. Emphasize the 'constant first' pattern to avoid NPE. Use analogies: two different cars with same color vs the exact same car."}
          />
        </div>
      </div>
    </div>
  );
};

// SVG Component: Visualizing reference vs content equality
const SVGComparisonVisualizer = () => {
  return (
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="650" height="280" viewBox="0 0 650 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        {/* Two string objects */}
        <rect x="50" y="40" width="100" height="60" rx="8" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
        <text x="100" y="70" textAnchor="middle" fontSize="14" fill="#1E3A8A">"Hello"</text>
        <text x="100" y="88" textAnchor="middle" fontSize="10" fill="#4B5563">Object A</text>
        
        <rect x="280" y="40" width="100" height="60" rx="8" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
        <text x="330" y="70" textAnchor="middle" fontSize="14" fill="#1E3A8A">"Hello"</text>
        <text x="330" y="88" textAnchor="middle" fontSize="10" fill="#4B5563">Object B</text>
        
        {/* Variables pointing to objects */}
        <rect x="50" y="150" width="80" height="30" rx="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="90" y="169" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400E">s1</text>
        <line x1="90" y1="150" x2="90" y2="100" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrowOrange)" />
        
        <rect x="280" y="150" width="80" height="30" rx="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="320" y="169" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400E">s2</text>
        <line x1="320" y1="150" x2="320" y2="100" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrowOrange)" />
        
        {/* == box */}
        <rect x="150" y="200" width="80" height="40" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
        <text x="190" y="224" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#991B1B">== ?</text>
        
        {/* equals box */}
        <rect x="380" y="200" width="80" height="40" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
        <text x="420" y="224" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#064E3B">.equals() ?</text>
        
        {/* Results */}
        <text x="190" y="260" textAnchor="middle" fontSize="13" fill="#EF4444" fontWeight="bold">false</text>
        <text x="420" y="260" textAnchor="middle" fontSize="13" fill="#10B981" fontWeight="bold">true</text>
        
        {/* Explanation lines */}
        <path d="M150 220 L130 220 L130 180 L280 180 L280 100" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4" fill="none" />
        <path d="M460 220 L480 220 L480 180 L350 180 L350 100" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4" fill="none" />
        
        <defs>
          <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#F59E0B" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default Topic4;