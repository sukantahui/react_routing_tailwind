import React from 'react';
import clsx from 'clsx';
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from './topic2_files/topic2_questions';
import ImmutabilityDemo from './topic2_files/ImmutabilityDemo.java?raw';
import WhyImmutable from './topic2_files/WhyImmutable.java?raw';

const Topic2 = () => {
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
            Immutability of String Objects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Once a String is created, it can never change. This seemingly simple rule has profound implications for security, performance, and multithreading.
          </p>
        </div>

        {/* Core Concept */}
        <div className={cardClasses} style={{ animationDelay: '0.1s' }} className="animate-fade-slide-up">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">🔒</span> What Does Immutability Mean?
          </h2>
          <p className="leading-relaxed mb-4">
            An <strong>immutable object</strong> is one whose state cannot be changed after creation. In Java, the <code>String</code> class is immutable: 
            none of its methods (like <code>toUpperCase()</code>, <code>replace()</code>, <code>concat()</code>) modify the original string. 
            Instead, they <strong>always return a new String object</strong>.
          </p>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
            <code className="block text-sm">
              String name = "Swadeep";<br/>
              name.toUpperCase();  // What happens?<br/>
              System.out.println(name); // Still "Swadeep" !
            </code>
            <p className="text-sm mt-2">✅ The original string remains unchanged. The result of <code>toUpperCase()</code> is a <strong>new string</strong> that must be assigned to a variable if needed.</p>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-sm">💡 <strong>Think about:</strong> If Strings were mutable, what would happen if two variables refer to the same String object and one changes it? The other would see the change unexpectedly – that's often a source of bugs.</p>
          </div>
        </div>

        {/* Visualizing Immutability */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🎬</span> How Immutability Works (Visual)
            </h2>
            <div className="flex justify-center py-4">
              <SVGImmutabilityVisualizer />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Operations create new objects; the original stays intact.
            </p>
          </div>
        </div>

        {/* Why is String Immutable? */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">❓ Why Did Java Designers Make String Immutable?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">🔐 Security</h3>
                <p className="text-sm mt-1">Strings are used for file paths, network connections, database URLs, usernames, passwords. If mutable, an attacker could change them after security checks.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">📚 String Pool</h3>
                <p className="text-sm mt-1">Immutability allows safe sharing of string literals. If one reference modified a pooled string, all others would be corrupted.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">⚡ Performance</h3>
                <p className="text-sm mt-1">Hashcode is cached since it never changes. This makes Strings excellent keys in HashMaps.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h3 className="font-bold">🧵 Thread-Safety</h3>
                <p className="text-sm mt-1">Immutable objects can be shared across threads without synchronization – no race conditions.</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-sm">🎯 <strong>Pro Tip:</strong> When designing your own classes, consider making them immutable unless you have a good reason not to (like <code>StringBuilder</code>).</p>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">📂 Proving Immutability with Code</h2>
            <div className="space-y-6">
              <JavaFileLoader
                fileModule={ImmutabilityDemo}
                title="ImmutabilityDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={WhyImmutable}
                title="WhyImmutable.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              🧠 <strong>Try changing this:</strong> Call <code>s.replace('a', 'b')</code> and print both the original and the result. See that the original is unchanged.
            </p>
          </div>
        </div>

        {/* Common Misconception: "Changing" a String */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🤔 Common Misconception: "I changed the string!"</h2>
            <p className="leading-relaxed mb-3">
              Beginners often write <code>str.toUpperCase();</code> and wonder why <code>str</code> is still lowercase. 
              The method returns a <strong>new string</strong>, but you didn't assign it. The correct way:
            </p>
            <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
              String original = "hello";<br/>
              String upper = original.toUpperCase();  // assign result<br/>
              System.out.println(original); // hello<br/>
              System.out.println(upper);    // HELLO
            </code>
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm">⚠️ <strong>Mistake:</strong> Forgetting to assign the return value is a very common bug. Always check method signatures – they tell you what is returned.</p>
            </div>
          </div>
        </div>

        {/* Pitfalls & Best Practices */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Ignoring return values</strong> – Calling <code>trim()</code>, <code>replace()</code>, etc., without assignment does nothing useful.</li>
                <li><strong>Assuming Strings are mutable</strong> – Leads to confusion about why original isn't changing.</li>
                <li><strong>Using <code>+</code> in loops</strong> – Creates many intermediate String objects, killing performance.</li>
                <li><strong>Modifying strings via reflection</strong> – Possible but dangerous; breaks JVM assumptions.</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Always assign the result</strong> of String methods to a variable.</li>
                <li><strong>Use <code>StringBuilder</code></strong> for multiple concatenations.</li>
                <li><strong>Leverage immutability</strong> – Share strings freely, don't defensive copy.</li>
                <li><strong>Cache hashcodes</strong> – Since strings are immutable, you can safely compute hash once.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📝 Student Checklist – Immutability</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
              <li>✅ I understand that String objects cannot be changed after creation.</li>
              <li>✅ I know that methods like <code>toUpperCase()</code> return a new String.</li>
              <li>✅ I always assign the result of String methods to a variable.</li>
              <li>✅ I can explain why immutability is important for security and pooling.</li>
              <li>✅ I know that <code>StringBuilder</code> is mutable and used for efficient concatenation.</li>
              <li>✅ I avoid using <code>+</code> in loops for string building.</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <FAQTemplate
            title="Immutability of Strings – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.9s' }}>
          <Teacher
            note={"Demonstrate immutability live: create a String, call toUpperCase(), and show the original unchanged. Then show the new reference. Then introduce StringBuilder to contrast. Ask students: 'What would happen if Strings were mutable and used as HashMap keys?' This leads to deep understanding of design choices."}
          />
        </div>
      </div>
    </div>
  );
};

// SVG Component: Visualizing immutability
const SVGImmutabilityVisualizer = () => {
  return (
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="650" height="300" viewBox="0 0 650 300" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        {/* Original string object */}
        <rect x="30" y="40" width="120" height="50" rx="8" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
        <text x="90" y="70" textAnchor="middle" fontSize="14" fill="#1E3A8A">"hello"</text>
        <text x="30" y="25" fontSize="12" fill="#4B5563">original</text>
        <line x1="90" y1="40" x2="90" y2="20" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#arrowSmall)" />
        
        {/* Operation box */}
        <rect x="200" y="45" width="180" height="40" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="290" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400E">.toUpperCase()</text>
        
        {/* Arrow from original to operation */}
        <path d="M 150 65 L 195 65" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrowOrange)" />
        
        {/* New string object */}
        <rect x="440" y="40" width="120" height="50" rx="8" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
        <text x="500" y="70" textAnchor="middle" fontSize="14" fill="#064E3B">"HELLO"</text>
        <text x="440" y="25" fontSize="12" fill="#4B5563">new string</text>
        <line x1="500" y1="40" x2="500" y2="20" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
        
        {/* Arrow from operation to new string */}
        <path d="M 380 65 L 435 65" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowGreen)" />
        
        {/* Note: original unchanged */}
        <text x="90" y="130" textAnchor="middle" fontSize="12" fill="#EF4444">(unchanged)</text>
        <text x="500" y="130" textAnchor="middle" fontSize="12" fill="#10B981">(new object)</text>
        
        <rect x="40" y="160" width="560" height="110" rx="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600" />
        <text x="60" y="185" fontSize="13" fontWeight="bold" fill="#374151">Important:</text>
        <text x="60" y="205" fontSize="12" fill="#4B5563">• The original "hello" still exists and is unchanged.</text>
        <text x="60" y="225" fontSize="12" fill="#4B5563">• .toUpperCase() created a brand new "HELLO" object.</text>
        <text x="60" y="245" fontSize="12" fill="#4B5563">• If you don't assign the result, the new object is lost (eligible for GC).</text>
        
        <defs>
          <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#F59E0B" />
          </marker>
          <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10B981" />
          </marker>
          <marker id="arrowSmall" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#3B82F6" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default Topic2;