import React from 'react';
import clsx from 'clsx';
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from './topic5_files/topic5_questions';
import ConcatMethodsDemo from './topic5_files/ConcatMethodsDemo.java?raw';
import LoopConcatenation from './topic5_files/LoopConcatenation.java?raw';
import StringBuilderVsString from './topic5_files/StringBuilderVsString.java?raw';

const Topic5 = () => {
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
            String Concatenation Techniques
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Combining strings is one of the most common operations. Java offers several ways, each with different performance characteristics. Choose the right tool for the job.
          </p>
        </div>

        {/* Overview of Techniques */}
        <div className={cardClasses} style={{ animationDelay: '0.1s' }} className="animate-fade-slide-up">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">🔧</span> Four Ways to Concatenate Strings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h3 className="font-bold">1. + Operator</h3>
              <code className="block text-sm mt-1">String s = "Hello" + " " + "World";</code>
              <p className="text-xs mt-1">Most readable, compiler optimizes simple cases.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h3 className="font-bold">2. concat() Method</h3>
              <code className="block text-sm mt-1">String s = "Hello".concat(" World");</code>
              <p className="text-xs mt-1">Only accepts String arguments, slightly more efficient than + for two strings.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h3 className="font-bold">3. StringBuilder (or StringBuffer)</h3>
              <code className="block text-sm mt-1">new StringBuilder().append("Hello").append(" World").toString();</code>
              <p className="text-xs mt-1">Best for loops or many concatenations; mutable.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h3 className="font-bold">4. String.join() / String.format()</h3>
              <code className="block text-sm mt-1">String.join(", ", "apple", "banana");</code>
              <p className="text-xs mt-1">Convenient for delimiters or formatted strings.</p>
            </div>
          </div>
        </div>

        {/* + Operator Deep Dive */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">➕ The + Operator</h2>
            <p className="leading-relaxed mb-3">
              The <code>+</code> operator is the most intuitive way to concatenate strings. For simple concatenations (a few fixed strings), 
              the Java compiler optimizes it into a single <code>StringBuilder</code> under the hood.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
              // What you write:<br/>
              String message = "Student: " + name + ", City: " + city;<br/><br/>
              // Compiler roughly translates to:<br/>
              String message = new StringBuilder().append("Student: ").append(name).append(", City: ").append(city).toString();
            </div>
            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <p className="text-sm">✅ <strong>When to use:</strong> 2-5 string concatenations, especially with literals. Readable and efficient enough.</p>
              <p className="text-sm">⚠️ <strong>When NOT to use:</strong> Inside loops or concatenating many strings (dozens/hundreds) – creates many intermediate objects.</p>
            </div>
          </div>
        </div>

        {/* concat() Method */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🔗 The concat() Method</h2>
            <p className="leading-relaxed mb-2">
              <code>public String concat(String str)</code> – returns a new string that is the concatenation of this string and the argument.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Only works with <code>String</code> arguments (unlike + which handles any type).</li>
              <li>Slightly more efficient than <code>+</code> for exactly two strings because it avoids StringBuilder overhead.</li>
              <li>If the argument is empty, returns the original string (no new object).</li>
            </ul>
            <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
              String full = "Swadeep".concat(" from ").concat("Barrackpore");
            </code>
            <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded">
              <p className="text-xs">💡 Most developers prefer <code>+</code> for readability; <code>concat()</code> is rarely used except in performance-sensitive spots.</p>
            </div>
          </div>
        </div>

        {/* StringBuilder - The Workhorse */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🏗️ StringBuilder – Mutable Concatenation</h2>
            <p className="leading-relaxed mb-3">
              <code>StringBuilder</code> (and its thread-safe cousin <code>StringBuffer</code>) is a mutable sequence of characters. 
              It's the go-to solution for building strings dynamically, especially in loops.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h3 className="font-bold">Key Methods:</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li><code>append(String s)</code> – adds at the end</li>
                  <li><code>insert(int offset, String s)</code> – inserts at position</li>
                  <li><code>delete(int start, int end)</code></li>
                  <li><code>reverse()</code></li>
                  <li><code>toString()</code> – converts to immutable String</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold">Example:</h3>
                <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs whitespace-pre">
                {`StringBuilder sb = new StringBuilder();
                sb.append("Students: ");
                for (String name : names) {
                    sb.append(name).append(", ");
                }
                String result = sb.toString();`}
                </code>
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-sm">🎯 <strong>Pro Tip:</strong> Pre-size StringBuilder if you know the final length: <code>new StringBuilder(capacity)</code> to avoid internal array resizing.</p>
            </div>
          </div>
        </div>

        {/* Visual: Performance Comparison */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">📊 Visual: Performance in a Loop</h2>
            <div className="flex justify-center py-4">
              <SVGPerformanceChart />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Using <code>+</code> in a loop creates O(n²) intermediate objects; StringBuilder is O(n).
            </p>
          </div>
        </div>

        {/* Code Examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">💻 Live Code Demonstrations</h2>
            <div className="space-y-6">
              <JavaFileLoader
                fileModule={ConcatMethodsDemo}
                title="ConcatMethodsDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={LoopConcatenation}
                title="LoopConcatenation.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={StringBuilderVsString}
                title="StringBuilderVsString.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              🧠 <strong>Try changing this:</strong> Increase the loop count to 100,000 and observe the massive time difference between <code>+</code> and <code>StringBuilder</code>.
            </p>
          </div>
        </div>

        {/* String.join() and String.format() */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📦 Convenience Methods: join() and format()</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-green-600">String.join()</h3>
                <code className="block text-sm">String.join(delimiter, elements...)</code>
                <p className="text-sm mt-1">Perfect for CSV, list formatting.</p>
                <code className="block mt-1 bg-gray-100 dark:bg-gray-700 p-1 rounded text-xs">
                  String csv = String.join(", ", "Swadeep", "Tuhina", "Abhronila");<br/>
                  // "Swadeep, Tuhina, Abhronila"
                </code>
              </div>
              <div>
                <h3 className="font-bold text-purple-600">String.format()</h3>
                <code className="block text-sm">String.format(format, args...)</code>
                <p className="text-sm mt-1">C-style formatting, great for logs and messages.</p>
                <code className="block mt-1 bg-gray-100 dark:bg-gray-700 p-1 rounded text-xs">
                  String msg = String.format("Student %s from %s", "Debangshu", "Shyamnagar");<br/>
                  // "Student Debangshu from Shyamnagar"
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Using + in loops</strong> – Creates thousands of intermediate strings, kills performance.</li>
                <li><strong>Forgetting to call toString() on StringBuilder</strong> – Using StringBuilder where a String is expected.</li>
                <li><strong>Using StringBuffer unnecessarily</strong> – It's synchronized (slower); use StringBuilder unless you need thread-safety.</li>
                <li><strong>Not pre-sizing StringBuilder</strong> – Causes multiple internal array copies.</li>
                <li><strong>Using concat() with null</strong> – Throws NullPointerException.</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Use + for 2-5 fixed strings</strong> – Readable and compiler-optimized.</li>
                <li><strong>Use StringBuilder for loops or many appends</strong> – Always.</li>
                <li><strong>Pre-size StringBuilder when you know capacity</strong> – e.g., <code>new StringBuilder(1000)</code>.</li>
                <li><strong>Use String.join() for delimited lists</strong> – Cleaner than manual loops.</li>
                <li><strong>Use String.format() for complex messages</strong> – Improves readability.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.9s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📝 Student Checklist – Concatenation</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
              <li>✅ I know four ways to concatenate strings: +, concat(), StringBuilder, join().</li>
              <li>✅ I understand that + creates new String objects (except when optimized).</li>
              <li>✅ I never use + inside loops – I use StringBuilder instead.</li>
              <li>✅ I can choose the right method based on context.</li>
              <li>✅ I know StringBuilder is mutable and more efficient for many concatenations.</li>
              <li>✅ I can use String.join() to create comma-separated lists.</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '1.0s' }}>
          <FAQTemplate
            title="String Concatenation – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '1.1s' }}>
          <Teacher
            note={"Demonstrate the performance difference with a loop of 10,000 concatenations using + vs StringBuilder. Students will be shocked by the time difference. Emphasize that + is fine for a few strings but scales horribly. Show them how to profile with System.nanoTime(). Also explain that the compiler optimizes simple + expressions, but not loops."}
          />
        </div>
      </div>
    </div>
  );
};

// SVG Component: Performance comparison bar chart
const SVGPerformanceChart = () => {
  return (
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="550" height="220" viewBox="0 0 550 220" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        <text x="275" y="25" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#374151">Time to concatenate 10,000 strings</text>
        
        {/* + operator bar */}
        <rect x="60" y="150" width="120" height="40" rx="4" fill="#EF4444" />
        <text x="120" y="135" textAnchor="middle" fontSize="11" fill="#EF4444" fontWeight="bold">~500-1000 ms</text>
        <text x="120" y="175" textAnchor="middle" fontSize="12" fill="white">+ in loop</text>
        
        {/* StringBuilder bar */}
        <rect x="260" y="180" width="120" height="10" rx="4" fill="#10B981" />
        <text x="320" y="165" textAnchor="middle" fontSize="11" fill="#10B981" fontWeight="bold">~1-2 ms</text>
        <text x="320" y="205" textAnchor="middle" fontSize="12" fill="#374151">StringBuilder</text>
        
        {/* Labels */}
        <text x="50" y="220" fontSize="10" fill="#6B7280">Faster →</text>
        <text x="500" y="220" fontSize="10" fill="#6B7280">Slower →</text>
        
        <line x1="60" y1="195" x2="500" y2="195" stroke="#D1D5DB" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default Topic5;