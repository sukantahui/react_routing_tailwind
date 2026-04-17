import React from 'react';
import clsx from 'clsx';
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from './topic0_files/topic0_questions';
import basicStringDemo from './topic0_files/BasicStringDemo.java?raw';
import stringCreationDemo from './topic0_files/StringCreationDemo.java?raw';

const Topic0 = () => {
  // Helper to conditionally add dark mode classes if needed
  const cardClasses = clsx(
    "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md",
    "transition-all duration-300 hover:shadow-xl hover:scale-[1.01]",
    "border border-gray-100 dark:border-gray-700"
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-slide-up {
          animation: fadeSlideUp 0.6s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-slide-up {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="animate-fade-slide-up text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Introduction to Strings in Java
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Strings are the backbone of text processing in Java. From student names to complex log files, 
            understanding Strings is essential for every Java developer.
          </p>
        </div>

        {/* What is a String? */}
        <div className={cardClasses} style={{ animationDelay: '0.1s' }} className="animate-fade-slide-up">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">📝</span> What is a String?
          </h2>
          <p className="leading-relaxed mb-4">
            In Java, a <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">String</code> is a sequence of characters. 
            Unlike primitive data types (<code>int</code>, <code>double</code>, <code>boolean</code>), <code>String</code> is a <strong>class</strong> 
            in the <code>java.lang</code> package, making it an object. Every time you write text inside double quotes, 
            Java creates a String object.
          </p>
          <p className="leading-relaxed">
            Real-world examples: storing student names like <strong>Swadeep</strong> or <strong>Tuhina</strong>, processing 
            addresses from <strong>Barrackpore</strong> or <strong>Shyamnagar</strong>, or reading configuration files.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-sm">💡 <strong>Think about:</strong> How would you store a student's full name? Their city? A welcome message? All these are Strings.</p>
          </div>
        </div>

        {/* String Visualization SVG */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🔍</span> How Java Sees a String
            </h2>
            <div className="flex justify-center py-4">
              <SVGStringVisualizer />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              A String internally stores characters in a sequence, each with an index position (starting from 0).
            </p>
          </div>
        </div>

        {/* String Storage: Heap & String Pool */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">💾</span> Where are Strings Stored?
            </h2>
            <p className="leading-relaxed mb-3">
              Strings are stored in a special memory area called the <strong className="text-purple-600 dark:text-purple-400">String Pool</strong> (inside the Heap). 
              This improves memory efficiency by reusing identical string literals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                <h3 className="font-bold text-green-700 dark:text-green-300">String Literal</h3>
                <code className="block mt-2">String city = "Ichapur";</code>
                <p className="text-sm mt-2">Stored in String Pool. Reused if same literal appears again.</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
                <h3 className="font-bold text-orange-700 dark:text-orange-300">new Keyword</h3>
                <code className="block mt-2">String name = new String("Naihati");</code>
                <p className="text-sm mt-2">Forces a new object in Heap (outside pool).</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <strong>🎯 Pro Tip:</strong> Always prefer string literals unless you explicitly need a new object. It saves memory and makes comparison faster.
            </div>
          </div>
        </div>

        {/* Key Characteristics */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">⚡</span> Why Strings are Special?
            </h2>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li><strong>Immutability:</strong> Once created, a String cannot be changed. Every modification creates a new String.</li>
              <li><strong>String Pool:</strong> Java caches literal strings to reuse them, reducing memory footprint.</li>
              <li><strong>Rich API:</strong> Dozens of built-in methods for searching, comparing, transforming, and analyzing text.</li>
              <li><strong>Thread-safe:</strong> Because Strings are immutable, they can be shared safely across multiple threads.</li>
            </ul>
            <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
              <p className="text-sm">💡 <strong>Observe carefully:</strong> When you concatenate strings in a loop, Java creates many intermediate objects. That's why professionals use StringBuilder (Topic 10).</p>
            </div>
          </div>
        </div>

        {/* Real Code Examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">💻</span> Working with Strings – First Steps
            </h2>
            <div className="space-y-6">
              <JavaFileLoader
                fileModule={basicStringDemo}
                title="BasicStringDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={stringCreationDemo}
                title="StringCreationDemo.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              🧠 <strong>Try changing this:</strong> Modify the string inside the code and observe how <code>length()</code> and <code>charAt()</code> respond.
            </p>
          </div>
        </div>

        {/* Tips, Tricks, Best Practices, Common Mistakes */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">🎯 Tips & Tricks</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.isEmpty()</code> or <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.isBlank()</code> (Java 11+) to check empty strings.</li>
                <li>Chain methods: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">str.trim().toLowerCase().startsWith("java")</code>.</li>
                <li>Prefer <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">String.valueOf()</code> to convert numbers/objects to String.</li>
                <li>Debug with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">System.out.println("Variable = " + var)</code> – auto string conversion.</li>
                <li>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">String.format()</code> for readable composite strings (like logs).</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Using <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">==</code> to compare strings (compares references, not content).</li>
                <li>Forgetting that Strings are objects → can be <code>null</code>, causing <code>NullPointerException</code>.</li>
                <li>Modifying strings in loops using <code>+</code> – very inefficient (creates many intermediate objects).</li>
                <li>Assuming <code>String</code> methods modify the original string (they return a new string).</li>
                <li>Not trimming user input – leading/trailing spaces cause bugs in validation.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices + Checklist */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">✅ Best Practices & Checklist</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-green-600 dark:text-green-400 mb-2">Professional Habits</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Always use <code>.equals()</code> for content comparison.</li>
                  <li>Use <code>StringBuilder</code> for heavy concatenation (loops, large data).</li>
                  <li>Normalize strings (trim, lowercase) before storing/comparing.</li>
                  <li>Prefer string literals over <code>new String()</code>.</li>
                  <li>Use <code>Optional</code> or null checks before calling methods on strings.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Beginner Checklist</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>✅ I know String is a class, not a primitive.</li>
                  <li>✅ I understand strings are immutable.</li>
                  <li>✅ I can find length and a character at an index.</li>
                  <li>✅ I know the difference between literal and <code>new</code>.</li>
                  <li>✅ I will never use <code>==</code> to compare text.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <FAQTemplate
            title="Introduction to Strings – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.9s' }}>
          <Teacher
            note={"Many students rush to methods without understanding that Strings are objects. Spend time on the 'why' – immutability and the String pool are key to writing memory-efficient code. Also, always demo the difference between == and .equals() even in early examples to avoid ingrained habits."}
          />
        </div>
      </div>
    </div>
  );
};

// SVG Component with hover animation and character index explanation
const SVGStringVisualizer = () => {
  const characters = ['S', 'w', 'a', 'd', 'e', 'e', 'p'];
  return (
    <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="500" height="140" viewBox="0 0 500 140" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        <text x="250" y="25" textAnchor="middle" fill="#6B7280" className="text-sm dark:fill-gray-400">String object = "Swadeep"</text>
        {characters.map((ch, idx) => {
          const x = 60 + idx * 55;
          return (
            <g key={idx}>
              <rect
                x={x} y="40" width="45" height="50" rx="6"
                fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2"
                className="dark:fill-gray-700 dark:stroke-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <animate attributeName="stroke" values="#3B82F6;#F59E0B;#3B82F6" dur="4s" repeatCount="indefinite" />
              </rect>
              <text x={x + 22} y="72" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1E3A8A" className="dark:fill-blue-200">{ch}</text>
              <text x={x + 22} y="110" textAnchor="middle" fontSize="12" fill="#4B5563" className="dark:fill-gray-400">index {idx}</text>
            </g>
          );
        })}
        <path d="M 45 90 L 55 90" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#EF4444" />
          </marker>
        </defs>
        <text x="25" y="85" textAnchor="end" fontSize="12" fill="#EF4444">char[]</text>
      </svg>
    </div>
  );
};

export default Topic0;