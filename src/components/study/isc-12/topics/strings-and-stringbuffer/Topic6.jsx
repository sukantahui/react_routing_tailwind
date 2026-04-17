import React from 'react';
import clsx from 'clsx';
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from './topic6_files/topic6_questions';
import ReverseStringDemo from './topic6_files/ReverseStringDemo.java?raw';
import PalindromeDemo from './topic6_files/PalindromeDemo.java?raw';
import WordCountDemo from './topic6_files/WordCountDemo.java?raw';
import CharFrequencyDemo from './topic6_files/CharFrequencyDemo.java?raw';

const Topic6 = () => {
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
            String Manipulation Programs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Applying String methods to solve real problems: reversing text, checking palindromes, counting words, and analyzing character frequency.
          </p>
        </div>

        {/* Overview */}
        <div className={cardClasses} style={{ animationDelay: '0.1s' }} className="animate-fade-slide-up">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">💡</span> Why These Programs Matter
          </h2>
          <p className="leading-relaxed mb-3">
            These classic string manipulation problems appear frequently in coding interviews, homework, and real-world applications:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h3 className="font-bold">🔄 Reverse String</h3>
              <p className="text-sm">Used in text editors, undo features, encryption, and data transformation.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h3 className="font-bold">🔄 Palindrome Checker</h3>
              <p className="text-sm">Used in DNA sequence analysis, word games, and data validation.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h3 className="font-bold">📊 Word Count</h3>
              <p className="text-sm">Used in text editors, word processors, SEO tools, and document analysis.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h3 className="font-bold">🔢 Character Frequency</h3>
              <p className="text-sm">Used in cryptography, data compression, and text analysis (e.g., anagrams).</p>
            </div>
          </div>
        </div>


        <div className="animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">📊 Visual: Common String Manipulation Flow</h2>
            <div className="flex justify-center py-4">
              <SVGManipulationFlow />
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              Most string manipulation follows a pattern: input → process → output, using methods like <code>charAt()</code>, <code>substring()</code>, <code>toCharArray()</code>.
            </p>
          </div>
        </div>

    
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🔄 1. Reverse a String</h2>
            <p className="leading-relaxed mb-3">
              Reversing a string is a fundamental operation. There are multiple approaches:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Using StringBuilder.reverse()</strong> – Simplest and most efficient.</li>
              <li><strong>Using char array</strong> – Manual loop, good for learning.</li>
              <li><strong>Using recursion</strong> – Academic exercise, not for production.</li>
            </ul>
            <div className="mt-3 bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm whitespace-pre">
                {`// Method 1: StringBuilder
                String reversed = new StringBuilder(original).reverse().toString();

                // Method 2: char array
                char[] chars = original.toCharArray();
                for(int i=0, j=chars.length-1; i<j; i++, j--) {
                    char temp = chars[i]; chars[i] = chars[j]; chars[j] = temp;
                }
                String reversed2 = new String(chars);`}
            </div>
          </div>
        </div>

      
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🔄 2. Palindrome Checker</h2>
            <p className="leading-relaxed mb-3">
              A palindrome reads the same forwards and backwards (e.g., "radar", "level", "A man, a plan, a canal: Panama" ignoring case and non-letters).
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Simple check</strong> – Compare string with its reverse.</li>
              <li><strong>Two-pointer technique</strong> – Compare first and last characters moving inward.</li>
              <li><strong>Alphanumeric only</strong> – Ignore spaces, punctuation, and case for real palindromes.</li>
            </ul>
            <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
              boolean isPalindrome = str.equals(new StringBuilder(str).reverse().toString());
            </code>
            <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded">
              <p className="text-xs">💡 For case-insensitive alphanumeric: use <code>replaceAll("[^a-zA-Z0-9]", "").toLowerCase()</code> first.</p>
            </div>
          </div>
        </div>

    
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">📊 3. Count Words in a String</h2>
            <p className="leading-relaxed mb-3">
              Word counting is common in text processing. Edge cases include multiple spaces, leading/trailing spaces, punctuation.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Using split()</strong> – <code>str.trim().split("\\s+")</code> handles multiple spaces.</li>
              <li><strong>Manual loop</strong> – Count transitions from non-space to space.</li>
              <li><strong>Handling punctuation</strong> – Replace non-letter/digit with spaces before splitting.</li>
            </ul>
            <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
              String[] words = str.trim().split("\\s+");<br/>
              int wordCount = (str.trim().isEmpty()) ? 0 : words.length;
            </code>
          </div>
        </div>

       
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">🔢 4. Frequency of Each Character</h2>
            <p className="leading-relaxed mb-3">
              Count how many times each character appears. Useful for anagrams, text analysis, and cryptography.
            </p>

            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Using HashMap</strong> – Stores character → count.</li>
              <li><strong>Using int[256] array</strong> – For ASCII characters (more efficient).</li>
              <li>
                <strong>Using Java 8 streams</strong> – Functional style with{" "}
                <code>Collectors.groupingBy</code>.
              </li>
            </ul>

            <code className="block mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm whitespace-pre">
              {`Map<Character, Integer> freq = new HashMap<>();
              for(char c : str.toCharArray()) {
                  freq.put(c, freq.getOrDefault(c, 0) + 1);
              }`}
            </code>
          </div>
        </div>

        
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-4">💻 Live Code Demonstrations</h2>
            <div className="space-y-6">
              <JavaFileLoader
                fileModule={ReverseStringDemo}
                title="ReverseStringDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={PalindromeDemo}
                title="PalindromeDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={WordCountDemo}
                title="WordCountDemo.java"
                highlightLines={[]}
              />
              <JavaFileLoader
                fileModule={CharFrequencyDemo}
                title="CharFrequencyDemo.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              🧠 <strong>Try changing this:</strong> Modify the input strings and observe how each algorithm handles edge cases like empty strings, spaces, punctuation.
            </p>
          </div>
        </div>

        
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">🎯 Tips & Tricks</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Reverse:</strong> Use <code>new StringBuilder(s).reverse()</code> – don't reinvent the wheel.</li>
                <li><strong>Palindrome:</strong> Two-pointer technique avoids creating new strings.</li>
                <li><strong>Word count:</strong> <code>split("\\s+")</code> handles multiple spaces, but also consider punctuation.</li>
                <li><strong>Frequency:</strong> For ASCII, <code>int[256]</code> is faster than HashMap.</li>
                <li><strong>Edge cases:</strong> Always test with empty, null, single character, and all-same-character strings.</li>
              </ul>
            </div>
            <div className={clsx(cardClasses, "h-full")}>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">⚠️ Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Forgetting to trim before word count</strong> – Leading/trailing spaces cause empty words.</li>
                <li><strong>Using <code>split(" ")</code> instead of regex</strong> – Doesn't handle multiple spaces.</li>
                <li><strong>Palindrome: not ignoring case or non-letters</strong> – "A man, a plan, a canal: Panama" is a palindrome.</li>
                <li><strong>Reversing with <code>charAt</code> in loop</strong> – Inefficient; use <code>toCharArray()</code> or StringBuilder.</li>
                <li><strong>Null checks</strong> – All these programs should handle null input gracefully.</li>
              </ul>
            </div>
          </div>
        </div>

       
        <div className="animate-fade-slide-up" style={{ animationDelay: '0.9s' }}>
          <div className={cardClasses}>
            <h2 className="text-2xl font-semibold mb-3">✅ Best Practices & Checklist</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-green-600 dark:text-green-400 mb-2">Professional Habits</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Write helper methods for each manipulation (reusable).</li>
                  <li>Handle null and empty inputs explicitly.</li>
                  <li>Use StringBuilder for performance-critical manipulations.</li>
                  <li>Prefer built-in methods (<code>reverse()</code>, <code>split()</code>) over manual loops unless teaching.</li>
                  <li>Add comments explaining edge case handling.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Student Checklist</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>✅ I can reverse a string using StringBuilder and manually.</li>
                  <li>✅ I can check if a string is a palindrome (including case-insensitive).</li>
                  <li>✅ I can count words correctly handling multiple spaces.</li>
                  <li>✅ I can compute character frequency using HashMap.</li>
                  <li>✅ I test my programs with edge cases (empty, null, single char).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '1.0s' }}>
          <FAQTemplate
            title="String Manipulation Programs – FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-slide-up" style={{ animationDelay: '1.1s' }}>
          <Teacher
            note={"These problems are excellent for developing algorithmic thinking. Start with reverse (easy), then palindrome (slightly harder with normalization), then word count (edge cases), and finally frequency (data structures). Have students implement each in at least two ways. Emphasize testing with weird inputs: empty string, all spaces, punctuation. Relate to real-world: counting words in an essay, checking palindromes in DNA, frequency analysis in cryptograms."}
          />
        </div>
      </div>
    </div>
  );
};

// SVG Component: Flow of string manipulation
const SVGManipulationFlow = () => {
  return (
    <div className="inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-lg">
      <svg width="550" height="180" viewBox="0 0 550 180" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        <rect x="30" y="20" width="100" height="40" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="80" y="44" textAnchor="middle" fontSize="12" fill="#1E3A8A">Input String</text>
        
        <path d="M130 40 L170 40" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#flowArrow)" />
        
        <rect x="175" y="15" width="100" height="50" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="225" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400E">Process</text>
        <text x="225" y="52" textAnchor="middle" fontSize="10" fill="#92400E">(loop / split / map)</text>
        
        <path d="M275 40 L315 40" stroke="#10B981" strokeWidth="2" markerEnd="url(#flowArrowGreen)" />
        
        <rect x="320" y="20" width="100" height="40" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
        <text x="370" y="44" textAnchor="middle" fontSize="12" fill="#064E3B">Output</text>
        
        <text x="225" y="100" textAnchor="middle" fontSize="11" fill="#6B7280">Examples:</text>
        <text x="225" y="118" textAnchor="middle" fontSize="10" fill="#6B7280">Reverse → "olleH"</text>
        <text x="225" y="136" textAnchor="middle" fontSize="10" fill="#6B7280">Palindrome → true/false</text>
        <text x="225" y="154" textAnchor="middle" fontSize="10" fill="#6B7280">Word Count → 5</text>
        <text x="225" y="172" textAnchor="middle" fontSize="10" fill="#6B7280">  Frequency → {"{a:2, b:1}"}</text>
        
        <defs>
          <marker id="flowArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#F59E0B" />
          </marker>
          <marker id="flowArrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#10B981" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default Topic6;