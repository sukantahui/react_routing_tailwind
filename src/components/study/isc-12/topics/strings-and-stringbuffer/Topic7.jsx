import React from 'react';
import clsx from 'clsx';
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from './topic7_files/topic7_questions';
import StringBufferBasics from './topic7_files/StringBufferBasics.java?raw';
import StringBufferMethods from './topic7_files/StringBufferMethods.java?raw';
import StringBufferVsString from './topic7_files/StringBufferVsString.java?raw';

const Topic7 = () => {
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
            StringBuffer Class and Its Features
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            <code>StringBuffer</code> is a mutable, thread-safe alternative to <code>String</code>. It allows efficient string manipulation without creating new objects.
          </p>
        </div>

        {/* What is StringBuffer */}
        <div className={cardClasses} style={{ animationDelay: '0.1s' }} className="animate-fade-slide-up">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">🧵</span> What is StringBuffer?
          </h2>
          <p className="leading-relaxed mb-4">
            <code>StringBuffer</code> is a mutable sequence of characters. Unlike <code>String</code>, which is immutable and creates a new object for every modification, 
            <code>StringBuffer</code> allows you to modify the same object without allocating new memory. It is part of the <code>java.lang</code> package and is <strong>thread-safe</strong> 
            (all its public methods are synchronized).
          </p>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
            <code className="block text-sm">
              StringBuffer sb = new StringBuffer("Hello");<br/>
              sb.append(" World");  // modifies sb itself<br/>
              System.out.println(sb); // "Hello World"
            </code>
            <p className="text-sm mt-2">✅ The original object is changed – no new object is created.</p>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-sm">💡 <strong>Think about:</strong> If you need to build a string in a multi‑threaded environment (e.g., logging from multiple threads), <code>StringBuffer</code> is safe but slower. For single‑threaded code, <code>StringBuilder</code> is faster.</p>
          </div>
        </div>

        {/* StringBuffer Hierarchy & Constructors */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🏗️ Constructors and Initial Capacity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <h3 className="font-bold">StringBuffer()</h3>
                <p className="text-sm">Creates empty buffer with initial capacity <strong>16</strong> characters.</p>
                <code className="block text-xs mt-1">StringBuffer sb = new StringBuffer();</code>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <h3 className="font-bold">StringBuffer(int capacity)</h3>
                <p className="text-sm">Creates empty buffer with specified initial capacity.</p>
                <code className="block text-xs mt-1">StringBuffer sb = new StringBuffer(100);</code>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <h3 className="font-bold">StringBuffer(String str)</h3>
                <p className="text-sm">Creates buffer with content of str, capacity = str.length() + 16.</p>
                <code className="block text-xs mt-1">StringBuffer sb = new StringBuffer("Hello");</code>
              </div>
            </div>
            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <p className="text-sm">🎯 <strong>Pro Tip:</strong> Pre‑size the buffer if you know the final length to avoid multiple internal array resizes.</p>
            </div>
          </div>
        </div>

        {/* Visual: Mutable vs Immutable */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">👁️ Visual: StringBuffer Mutability</h2>
            <div className="flex justify-center py-4">
              <SVGStringBufferVisualizer />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              <code>StringBuffer</code> modifies the same object; <code>String</code> creates a new object for each change.
            </p>
          </div>
        </div>

        {/* Key Methods Overview */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🔧 Important Methods of StringBuffer</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="p-2 text-left">Method</th>
                    <th className="p-2 text-left">Return Type</th>
                    <th className="p-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr><td className="p-2"><code>append(String s)</code></td><td className="p-2">StringBuffer</td><td className="p-2">Adds string to the end</td></tr>
                  <tr><td className="p-2"><code>insert(int offset, String s)</code></td><td className="p-2">StringBuffer</td><td className="p-2">Inserts string at position</td></tr>
                  <tr><td className="p-2"><code>delete(int start, int end)</code></td><td className="p-2">StringBuffer</td><td className="p-2">Removes characters from start to end-1</td></tr>
                  <tr><td className="p-2"><code>deleteCharAt(int index)</code></td><td className="p-2">StringBuffer</td><td className="p-2">Removes character at index</td></tr>
                  <tr><td className="p-2"><code>reverse()</code></td><td className="p-2">StringBuffer</td><td className="p-2">Reverses the sequence</td></tr>
                  <tr><td className="p-2"><code>replace(int start, int end, String str)</code></td><td className="p-2">StringBuffer</td><td className="p-2">Replaces characters with new string</td></tr>
                  <tr><td className="p-2"><code>substring(int start)</code></td><td className="p-2">String</td><td className="p-2">Returns substring (immutable)</td></tr>
                  <tr><td className="p-2"><code>capacity()</code></td><td className="p-2">int</td><td className="p-2">Returns current capacity</td></tr>
                  <tr><td className="p-2"><code>ensureCapacity(int min)</code></td><td className="p-2">void</td><td className="p-2">Ensures capacity at least min</td></tr>
                  <tr><td className="p-2"><code>length()</code></td><td className="p-2">int</td><td className="p-2">Returns number of characters</td></tr>
                  <tr><td className="p-2"><code>charAt(int index)</code></td><td className="p-2">char</td><td className="p-2">Returns character at index</td></tr>
                  <tr><td className="p-2"><code>setCharAt(int index, char ch)</code></td><td className="p-2">void</td><td className="p-2">Replaces character at index</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Note: Most methods return the same <code>StringBuffer</code> object, allowing method chaining.</p>
          </div>
        </div>

        {/* Code Examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">💻 Live Code Demonstrations</h2>
            <div className="space-y-6">
              <JavaFileLoader
                fileModule={StringBufferBasics}
                title="StringBufferBasics.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={StringBufferMethods}
                title="StringBufferMethods.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={StringBufferVsString}
                title="StringBufferVsString.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              🧠 <strong>Try changing this:</strong> Modify the buffer size and watch how <code>capacity()</code> grows automatically.
            </p>
          </div>
        </div>

        {/* Thread-Safety Explanation */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🔒 Thread-Safety in StringBuffer</h2>
            <p className="leading-relaxed mb-3">
              All public methods of <code>StringBuffer</code> are <strong>synchronized</strong>, meaning only one thread can execute a method on the same instance at a time. 
              This makes it safe to use in multi‑threaded environments (e.g., multiple threads appending to the same log buffer). However, synchronization comes with a performance cost.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">✅ When to Use StringBuffer</h3>
                <ul className="list-disc pl-4 text-sm mt-1">
                  <li>Shared across multiple threads</li>
                  <li>Legacy code that expects StringBuffer</li>
                  <li>When thread‑safety is a requirement</li>
                </ul>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <h3 className="font-bold">⚠️ When to Avoid StringBuffer</h3>
                <ul className="list-disc pl-4 text-sm mt-1">
                  <li>Single‑threaded code (use StringBuilder)</li>
                  <li>Performance‑critical sections</li>
                  <li>New development without thread‑sharing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Using StringBuffer when StringBuilder is sufficient</strong> – paying unnecessary synchronization cost.</li>
                <li><strong>Forgetting to call <code>toString()</code></strong> when a String is required.</li>
                <li><strong>Not pre‑sizing the buffer</strong> – causing multiple resizes and copying.</li>
                <li><strong>Assuming <code>substring()</code> returns a mutable sequence</strong> – it returns a String (immutable).</li>
                <li><strong>Using <code>capacity()</code> as the length</strong> – capacity is not the same as length.</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Pre‑size StringBuffer</strong> when you know the final length.</li>
                <li><strong>Use <code>StringBuilder</code> for single‑threaded code</strong> – it's faster.</li>
                <li><strong>Chain methods</strong> for cleaner code: <code>sb.append("a").append("b")</code>.</li>
                <li><strong>Call <code>toString()</code> only when you need an immutable String.</strong></li>
                <li><strong>Use <code>ensureCapacity()</code> to avoid repeated resizing.</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📝 Student Checklist – StringBuffer</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
              <li>✅ I know <code>StringBuffer</code> is mutable and thread‑safe.</li>
              <li>✅ I can create a <code>StringBuffer</code> with default or custom capacity.</li>
              <li>✅ I can append, insert, delete, and reverse using <code>StringBuffer</code> methods.</li>
              <li>✅ I understand the difference between <code>length()</code> and <code>capacity()</code>.</li>
              <li>✅ I know when to use <code>StringBuffer</code> vs <code>StringBuilder</code>.</li>
              <li>✅ I can convert a <code>StringBuffer</code> to <code>String</code> using <code>toString()</code>.</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.9s' }}>
          <FAQTemplate
            title="StringBuffer – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '1.0s' }}>
          <Teacher
            note={"Emphasize the mutability difference by comparing String and StringBuffer side‑by‑side. Show the performance impact in a loop. Clarify that thread‑safety is rarely needed for beginners, but it's the key distinction from StringBuilder. Use real‑world example: building a log message from multiple threads (e.g., a chat server). Also demonstrate capacity growth and why pre‑sizing matters."}
          />
        </div>
      </div>
    </div>
  );
};

// SVG Component: StringBuffer vs String mutability
const SVGStringBufferVisualizer = () => {
  return (
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="650" height="260" viewBox="0 0 650 260" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        {/* String (immutable) section */}
        <text x="170" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#EF4444">String (Immutable)</text>
        <rect x="70" y="45" width="100" height="40" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
        <text x="120" y="69" textAnchor="middle" fontSize="12" fill="#991B1B">"Hi"</text>
        <path d="M170 65 L210 65" stroke="#EF4444" strokeWidth="2" markerEnd="url(#redArrow)" />
        <rect x="215" y="45" width="100" height="40" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
        <text x="265" y="69" textAnchor="middle" fontSize="12" fill="#991B1B">"Hi!"</text>
        <text x="120" y="105" textAnchor="middle" fontSize="10" fill="#EF4444">original</text>
        <text x="265" y="105" textAnchor="middle" fontSize="10" fill="#EF4444">new object</text>
        
        {/* StringBuffer (mutable) section */}
        <text x="170" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#10B981">StringBuffer (Mutable)</text>
        <rect x="70" y="175" width="100" height="40" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
        <text x="120" y="199" textAnchor="middle" fontSize="12" fill="#064E3B">"Hi"</text>
        <path d="M170 195 L200 195" stroke="#10B981" strokeWidth="2" markerEnd="url(#greenArrow)" />
        <rect x="205" y="175" width="100" height="40" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" strokeDasharray="4" />
        <text x="255" y="199" textAnchor="middle" fontSize="12" fill="#064E3B">"Hi!"</text>
        <text x="120" y="235" textAnchor="middle" fontSize="10" fill="#10B981">same object</text>
        <text x="255" y="235" textAnchor="middle" fontSize="10" fill="#10B981">(modified in place)</text>
        
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

export default Topic7;