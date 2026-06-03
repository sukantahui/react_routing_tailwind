import React from 'react';
import clsx from 'clsx';
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from './topic9_files/topic9_questions';
import AppendDemo from './topic9_files/AppendDemo.java?raw';
import InsertDeleteDemo from './topic9_files/InsertDeleteDemo.java?raw';
import ReverseCapacityDemo from './topic9_files/ReverseCapacityDemo.java?raw';

const Topic9 = () => {
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
            Key Methods of StringBuffer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Master the essential methods: <code>append()</code>, <code>insert()</code>, <code>delete()</code>, <code>reverse()</code>, and <code>capacity()</code> to manipulate mutable strings efficiently.
          </p>
        </div>

        {/* Method Overview Table */}
        <div className={cardClasses} style={{ animationDelay: '0.1s' }} className="animate-fade-slide-up">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">📚</span> Core Methods at a Glance
          </h2>
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
                <tr><td className="p-2"><code>append(data)</code></td><td className="p-2">StringBuffer</td><td className="p-2">Adds data (String, int, char, etc.) to the end</td></tr>
                <tr><td className="p-2"><code>insert(offset, data)</code></td><td className="p-2">StringBuffer</td><td className="p-2">Inserts data at specified position</td></tr>
                <tr><td className="p-2"><code>delete(start, end)</code></td><td className="p-2">StringBuffer</td><td className="p-2">Removes characters from start (inclusive) to end (exclusive)</td></tr>
                <tr><td className="p-2"><code>deleteCharAt(index)</code></td><td className="p-2">StringBuffer</td><td className="p-2">Removes character at given index</td></tr>
                <tr><td className="p-2"><code>reverse()</code></td><td className="p-2">StringBuffer</td><td className="p-2">Reverses the character sequence</td></tr>
                <tr><td className="p-2"><code>capacity()</code></td><td className="p-2">int</td><td className="p-2">Returns current capacity (size of internal buffer)</td></tr>
                <tr><td className="p-2"><code>length()</code></td><td className="p-2">int</td><td className="p-2">Returns number of characters currently in buffer</td></tr>
                <tr><td className="p-2"><code>setLength(newLength)</code></td><td className="p-2">void</td><td className="p-2">Truncates or pads with null characters</td></tr>
                <tr><td className="p-2"><code>ensureCapacity(min)</code></td><td className="p-2">void</td><td className="p-2">Ensures capacity at least minimum</td></tr>
                <tr><td className="p-2"><code>replace(start, end, str)</code></td><td className="p-2">StringBuffer</td><td className="p-2">Replaces characters with given string</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">All methods that return <code>StringBuffer</code> allow method chaining.</p>
        </div>

        {/* Visual: Method Chain Effect */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">🔗 Visual: Chaining Methods</h2>
            <div className="flex justify-center py-4">
              <SVGMethodChainVisual />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Methods like <code>append()</code>, <code>insert()</code>, <code>delete()</code>, <code>reverse()</code> return the same object, enabling fluent chaining.
            </p>
          </div>
        </div>


        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">➕ append()</h3>
              <p className="text-sm">Adds data to the end. Overloaded for all primitives, String, char[], Object (calls toString).</p>
              <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                sb.append("Hello").append(" ").append(123);
              </code>
              <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="text-xs">💡 <strong>Tip:</strong> append(null) appends "null".</p>
              </div>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">📌 insert()</h3>
              <p className="text-sm">Inserts data at the specified offset. Existing characters shift right.</p>
              <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                sb.insert(5, " beautiful "); // inserts at index 5
              </code>
              <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="text-xs">⚠️ Throws <code>StringIndexOutOfBoundsException</code> if offset invalid.</p>
              </div>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">✂️ delete() & deleteCharAt()</h3>
              <p className="text-sm">Removes characters. <code>delete(start,end)</code> removes range; <code>deleteCharAt(index)</code> removes single character.</p>
              <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                sb.delete(2, 5);    // removes indices 2-4<br/>
                sb.deleteCharAt(0); // removes first char
              </code>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">🔄 reverse()</h3>
              <p className="text-sm">Reverses the character sequence in place. Useful for palindromes or data transformation.</p>
              <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                sb.reverse(); // "Hello" → "olleH"
              </code>
              <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="text-xs">💡 Works on the same object – no new allocation.</p>
              </div>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">📏 capacity() & length()</h3>
              <p className="text-sm"><code>capacity()</code> returns internal buffer size; <code>length()</code> returns current character count.</p>
              <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                System.out.println("Capacity: " + sb.capacity());<br/>
                System.out.println("Length: " + sb.length());
              </code>
              <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <p className="text-xs">✅ Always length ≤ capacity.</p>
              </div>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">⚙️ ensureCapacity() & setLength()</h3>
              <p className="text-sm"><code>ensureCapacity()</code> pre‑allocates; <code>setLength()</code> truncates or pads.</p>
              <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs">
                sb.ensureCapacity(100); // avoids resizing<br/>
                sb.setLength(5);        // truncates to 5 chars
              </code>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">💻 Live Code Demonstrations</h2>
            <div className="space-y-6">
              <JavaFileLoader
                fileModule={AppendDemo}
                title="AppendDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={InsertDeleteDemo}
                title="InsertDeleteDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={ReverseCapacityDemo}
                title="ReverseCapacityDemo.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              🧠 <strong>Try changing this:</strong> Experiment with different data types in <code>append()</code> and watch how <code>capacity()</code> grows automatically.
            </p>
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Confusing length() with capacity()</strong> – length is used characters, capacity is allocated size.</li>
                <li><strong>Assuming insert() replaces characters</strong> – it shifts existing characters right.</li>
                <li><strong>Forgetting that delete end index is exclusive</strong> – delete(2,5) deletes indices 2,3,4.</li>
                <li><strong>Calling reverse() when you need a new String</strong> – reverse modifies the buffer; use new StringBuilder(sb).reverse().toString() if original must stay.</li>
                <li><strong>Not checking capacity before many appends</strong> – can cause repeated resizing.</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Chain methods for readability</strong> – <code>sb.append(x).append(y).reverse()</code>.</li>
                <li><strong>Pre‑size with <code>ensureCapacity()</code> or constructor</strong> to avoid resizing.</li>
                <li><strong>Use <code>setLength(0)</code> to clear and reuse buffer</strong> – more efficient than creating new object.</li>
                <li><strong>Call <code>toString()</code> only when an immutable String is needed.</strong></li>
                <li><strong>Prefer <code>StringBuilder</code> in single‑threaded code</strong> – same methods, faster.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📝 Student Checklist – StringBuffer Methods</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
              <li>✅ I can append different data types to a StringBuffer.</li>
              <li>✅ I can insert text at any position using insert().</li>
              <li>✅ I can delete characters using delete() and deleteCharAt().</li>
              <li>✅ I can reverse a StringBuffer in place.</li>
              <li>✅ I understand the difference between length() and capacity().</li>
              <li>✅ I can pre‑size a buffer to improve performance.</li>
              <li>✅ I can clear a buffer using setLength(0).</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
          <FAQTemplate
            title="StringBuffer Methods – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <Teacher
            note={"Demonstrate each method live with a visualizer (e.g., print buffer after each step). Emphasize that append and insert are overloaded for all types. Show capacity growth by appending more characters than the initial capacity. Have students write a small program that builds a comma‑separated list using append, then inserts a header, then reverses the result. Relate to real tasks: building SQL queries, JSON strings, or log entries."}
          />
        </div>
      </div>
    </div>
  );
};

// SVG Component: Method chaining illustration
const SVGMethodChainVisual = () => {
  return (
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="550" height="140" viewBox="0 0 550 140" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        <rect x="20" y="20" width="80" height="40" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="60" y="44" textAnchor="middle" fontSize="11" fill="#1E3A8A">"Hello"</text>
        
        <path d="M100 40 L130 40" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#chainArrow)" />
        <rect x="135" y="15" width="70" height="50" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="170" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400E">.append</text>
        <text x="170" y="50" textAnchor="middle" fontSize="9" fill="#92400E">(" World")</text>
        
        <path d="M205 40 L235 40" stroke="#10B981" strokeWidth="2" markerEnd="url(#chainArrowGreen)" />
        <rect x="240" y="15" width="70" height="50" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
        <text x="275" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#064E3B">.insert</text>
        <text x="275" y="50" textAnchor="middle" fontSize="9" fill="#064E3B">(5,"  ")</text>
        
        <path d="M310 40 L340 40" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#chainArrowPurple)" />
        <rect x="345" y="15" width="70" height="50" rx="6" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
        <text x="380" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5B21B6">.reverse</text>
        <text x="380" y="50" textAnchor="middle" fontSize="9" fill="#5B21B6">()</text>
        
        <path d="M415 40 L445 40" stroke="#EF4444" strokeWidth="2" markerEnd="url(#chainArrowRed)" />
        <rect x="450" y="20" width="80" height="40" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
        <text x="490" y="44" textAnchor="middle" fontSize="11" fill="#991B1B">Result</text>
        
        <text x="275" y="100" textAnchor="middle" fontSize="10" fill="#6B7280">sb.append(" World").insert(5," ").reverse();</text>
        
        <defs>
          <marker id="chainArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#F59E0B" /></marker>
          <marker id="chainArrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#10B981" /></marker>
          <marker id="chainArrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8B5CF6" /></marker>
          <marker id="chainArrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#EF4444" /></marker>
        </defs>
      </svg>
    </div>
  );
};

export default Topic9;