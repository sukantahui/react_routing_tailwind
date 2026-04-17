import React from 'react';
import clsx from 'clsx';
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from './topic3_files/topic3_questions';
import StringMethodsDemo from './topic3_files/StringMethodsDemo.java?raw';
import StringComparisonDemo from './topic3_files/StringComparisonDemo.java?raw';
import StringTransformDemo from './topic3_files/StringTransformDemo.java?raw';

const Topic3 = () => {
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
            String Class Methods
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The String class provides dozens of powerful methods to inspect, compare, transform, and manipulate text. 
            Mastering these methods is essential for every Java developer.
          </p>
        </div>

        {/* Overview */}
        <div className={cardClasses} style={{ animationDelay: '0.1s' }} className="animate-fade-slide-up">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">📚</span> Essential String Methods
          </h2>
          <p className="leading-relaxed mb-4">
            The <code>String</code> class in Java has over 50 methods. Here are the most frequently used ones, grouped by purpose. 
            Remember: because Strings are immutable, <strong>every method returns a new String</strong> when it transforms the content.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h3 className="font-bold">🔍 Inspection</h3>
              <ul className="text-sm mt-1 list-disc pl-4">
                <li><code>length()</code> – number of characters</li>
                <li><code>charAt(index)</code> – character at position</li>
                <li><code>isEmpty()</code> / <code>isBlank()</code> (Java 11+)</li>
                <li><code>indexOf()</code> / <code>lastIndexOf()</code></li>
                <li><code>contains()</code> / <code>startsWith()</code> / <code>endsWith()</code></li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h3 className="font-bold">⚖️ Comparison</h3>
              <ul className="text-sm mt-1 list-disc pl-4">
                <li><code>equals()</code> – content equality</li>
                <li><code>equalsIgnoreCase()</code></li>
                <li><code>compareTo()</code> – lexicographic order</li>
                <li><code>compareToIgnoreCase()</code></li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h3 className="font-bold">✂️ Extraction</h3>
              <ul className="text-sm mt-1 list-disc pl-4">
                <li><code>substring(beginIndex)</code></li>
                <li><code>substring(beginIndex, endIndex)</code></li>
                <li><code>split(regex)</code></li>
                <li><code>toCharArray()</code></li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h3 className="font-bold">🎨 Transformation</h3>
              <ul className="text-sm mt-1 list-disc pl-4">
                <li><code>toUpperCase()</code> / <code>toLowerCase()</code></li>
                <li><code>trim()</code> / <code>strip()</code> (Java 11+)</li>
                <li><code>replace()</code> / <code>replaceAll()</code></li>
                <li><code>concat()</code> / <code>repeat()</code> (Java 11+)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Method Details Table */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">📖 Method Signatures & Return Types</h2>
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
                  <tr><td className="p-2"><code>length()</code></td><td className="p-2"><code>int</code></td><td className="p-2">Returns number of characters</td></tr>
                  <tr><td className="p-2"><code>charAt(int index)</code></td><td className="p-2"><code>char</code></td><td className="p-2">Returns character at specified index</td></tr>
                  <tr><td className="p-2"><code>substring(int begin)</code></td><td className="p-2"><code>String</code></td><td className="p-2">Returns substring from begin to end</td></tr>
                  <tr><td className="p-2"><code>substring(int begin, int end)</code></td><td className="p-2"><code>String</code></td><td className="p-2">Returns substring [begin, end)</td></tr>
                  <tr><td className="p-2"><code>equals(Object obj)</code></td><td className="p-2"><code>boolean</code></td><td className="p-2">Compares content (case-sensitive)</td></tr>
                  <tr><td className="p-2"><code>equalsIgnoreCase(String s)</code></td><td className="p-2"><code>boolean</code></td><td className="p-2">Compares ignoring case</td></tr>
                  <tr><td className="p-2"><code>compareTo(String s)</code></td><td className="p-2"><code>int</code></td><td className="p-2">Lexicographic comparison</td></tr>
                  <tr><td className="p-2"><code>toUpperCase()</code></td><td className="p-2"><code>String</code></td><td className="p-2">Converts to uppercase</td></tr>
                  <tr><td className="p-2"><code>toLowerCase()</code></td><td className="p-2"><code>String</code></td><td className="p-2">Converts to lowercase</td></tr>
                  <tr><td className="p-2"><code>trim()</code></td><td className="p-2"><code>String</code></td><td className="p-2">Removes leading/trailing whitespace</td></tr>
                  <tr><td className="p-2"><code>replace(char old, char new)</code></td><td className="p-2"><code>String</code></td><td className="p-2">Replaces all occurrences</td></tr>
                  <tr><td className="p-2"><code>replace(CharSequence target, CharSequence replacement)</code></td><td className="p-2"><code>String</code></td><td className="p-2">Replaces literal substrings</td></tr>
                  <tr><td className="p-2"><code>contains(CharSequence s)</code></td><td className="p-2"><code>boolean</code></td><td className="p-2">Checks if substring exists</td></tr>
                  <tr><td className="p-2"><code>startsWith(String prefix)</code></td><td className="p-2"><code>boolean</code></td><td className="p-2">Checks prefix</td></tr>
                  <tr><td className="p-2"><code>endsWith(String suffix)</code></td><td className="p-2"><code>boolean</code></td><td className="p-2">Checks suffix</td></tr>
                  <tr><td className="p-2"><code>indexOf(String s)</code></td><td className="p-2"><code>int</code></td><td className="p-2">First index of substring (-1 if none)</td></tr>
                  <tr><td className="p-2"><code>split(String regex)</code></td><td className="p-2"><code>String[]</code></td><td className="p-2">Splits around regex</td></tr>
                  <tr><td className="p-2"><code>isEmpty()</code></td><td className="p-2"><code>boolean</code></td><td className="p-2">True if length == 0</td></tr>
                  <tr><td className="p-2"><code>isBlank()</code> (Java 11+)</td><td className="p-2"><code>boolean</code></td><td className="p-2">True if empty or only whitespace</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Note: All transformation methods return a new String; original unchanged.</p>
          </div>
        </div>

        {/* Visual: Method Flowchart */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">🔁 Visual: Common Method Chains</h2>
            <div className="flex justify-center py-4">
              <SVGMethodChain />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Methods can be chained because each returns a new String.
            </p>
          </div>
        </div>

        {/* Real-world Code Examples */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">💻 Live Code Examples</h2>
            <div className="space-y-6">
              <JavaFileLoader
                fileModule={StringMethodsDemo}
                title="StringMethodsDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={StringComparisonDemo}
                title="StringComparisonDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={StringTransformDemo}
                title="StringTransformDemo.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              🧠 <strong>Try changing this:</strong> Modify the input strings and observe how <code>indexOf</code>, <code>substring</code>, and <code>replace</code> behave.
            </p>
          </div>
        </div>

        {/* Tips, Tricks, Common Mistakes */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">🎯 Tips & Tricks</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Chain methods</strong> – <code>str.trim().toLowerCase().replace(" ", "_")</code> is concise.</li>
                <li><strong>Use <code>isBlank()</code></strong> over <code>isEmpty()</code> for user input (ignores spaces).</li>
                <li><strong>Prefer <code>contains()</code></strong> over <code>indexOf() != -1</code> for readability.</li>
                <li><strong>Remember that <code>substring(end)</code> end is exclusive</strong> – <code>substring(0,5)</code> gives indices 0-4.</li>
                <li><strong>Use <code>compareTo()</code> for sorting</strong> – returns negative/zero/positive.</li>
                <li><strong><code>split()</code> takes a regex</strong> – escape special characters (e.g., <code>split("\\.")</code>).</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Ignoring method return values</strong> – e.g., <code>str.toUpperCase()</code> without assignment.</li>
                <li><strong>Using <code>==</code> instead of <code>.equals()</code></strong> – still a frequent bug.</li>
                <li><strong>Assuming <code>replace()</code> replaces all</strong> – it does, but <code>replaceAll()</code> uses regex.</li>
                <li><strong>Off-by-one errors in <code>substring</code></strong> – endIndex is exclusive.</li>
                <li><strong>Calling methods on <code>null</code> strings</strong> – leads to <code>NullPointerException</code>.</li>
                <li><strong>Forgetting that <code>split()</code> removes trailing empty strings</strong> – use <code>split(regex, -1)</code> to keep them.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices & Checklist */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">✅ Best Practices & Checklist</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-green-600 dark:text-green-400 mb-2">Professional Habits</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Always handle <code>null</code> before calling methods (use <code>Objects.toString()</code> or null checks).</li>
                  <li>Normalize strings before comparison: <code>trim().toLowerCase()</code>.</li>
                  <li>Use <code>String.format()</code> or <code>StringBuilder</code> for complex concatenations.</li>
                  <li>Prefer <code>isEmpty()</code> over checking <code>length() == 0</code>.</li>
                  <li>Use <code>isBlank()</code> for validation (Java 11+).</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Student Checklist</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>✅ I know <code>length()</code> returns character count.</li>
                  <li>✅ I can extract a character with <code>charAt()</code>.</li>
                  <li>✅ I can get a substring using <code>substring()</code>.</li>
                  <li>✅ I always use <code>equals()</code> for content comparison.</li>
                  <li>✅ I understand the difference between <code>replace()</code> and <code>replaceAll()</code>.</li>
                  <li>✅ I can trim whitespace and change case.</li>
                  <li>✅ I can split a string into an array.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
          <FAQTemplate
            title="String Methods – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <Teacher
            note={"Teach methods in groups: inspection (length, charAt), comparison (equals, compareTo), extraction (substring, split), transformation (toUpperCase, trim, replace). Always demonstrate with live coding, showing that the original is unchanged. Use real examples: processing student names, addresses from Barrackpore, or log files. Emphasize the importance of reading Javadoc – knowing return types prevents bugs."}
          />
        </div>
      </div>
    </div>
  );
};

// SVG Component: Method chaining visualization
const SVGMethodChain = () => {
  return (
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="700" height="180" viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        <text x="350" y="25" textAnchor="middle" fontSize="13" fill="#4B5563">Method Chaining: each step returns a new String</text>
        
        {/* Original string */}
        <rect x="20" y="50" width="90" height="40" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="65" y="74" textAnchor="middle" fontSize="11" fill="#1E3A8A">" Hello "</text>
        
        {/* Arrow 1 */}
        <path d="M110 70 L140 70" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#chainArrow)" />
        
        {/* trim() */}
        <rect x="145" y="45" width="70" height="50" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="180" y="64" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400E">.trim()</text>
        <text x="180" y="80" textAnchor="middle" fontSize="9" fill="#92400E">"Hello"</text>
        
        {/* Arrow 2 */}
        <path d="M215 70 L245 70" stroke="#10B981" strokeWidth="2" markerEnd="url(#chainArrowGreen)" />
        
        {/* toUpperCase() */}
        <rect x="250" y="45" width="80" height="50" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
        <text x="290" y="64" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#064E3B">.toUpperCase()</text>
        <text x="290" y="80" textAnchor="middle" fontSize="9" fill="#064E3B">"HELLO"</text>
        
        {/* Arrow 3 */}
        <path d="M330 70 L360 70" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#chainArrowPurple)" />
        
        {/* substring(1,4) */}
        <rect x="365" y="45" width="90" height="50" rx="6" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
        <text x="410" y="64" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5B21B6">.substring(1,4)</text>
        <text x="410" y="80" textAnchor="middle" fontSize="9" fill="#5B21B6">"ELL"</text>
        
        {/* Arrow 4 */}
        <path d="M455 70 L485 70" stroke="#EF4444" strokeWidth="2" markerEnd="url(#chainArrowRed)" />
        
        {/* Result */}
        <rect x="490" y="50" width="80" height="40" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
        <text x="530" y="74" textAnchor="middle" fontSize="11" fill="#991B1B">"ELL"</text>
        
        <text x="180" y="130" textAnchor="middle" fontSize="10" fill="#6B7280">String result = " Hello ".trim().toUpperCase().substring(1,4);</text>
        
        <defs>
          <marker id="chainArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#F59E0B" />
          </marker>
          <marker id="chainArrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10B981" />
          </marker>
          <marker id="chainArrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#8B5CF6" />
          </marker>
          <marker id="chainArrowRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#EF4444" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default Topic3;