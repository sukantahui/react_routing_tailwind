import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import charDemoCode from "./topic11_files/CharAndUnicodeRepresentationDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowChar {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(168, 85, 247, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-char {
            animation: glowChar 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_002 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Character Representation: <code className="text-purple-400">char</code> Data Type, ASCII &amp; Unicode (<code className="text-emerald-400">\uXXXX</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover how Java achieves global internationalization: the 16-bit unsigned <code className="text-purple-300">char</code> primitive, ASCII numerical mappings, character arithmetic promotion, Unicode escape sequences (<code className="text-emerald-300">\uXXXX</code>), Indian Rupee (<code className="text-emerald-300">₹</code>), Bengali regional scripts, and security-grade <code className="text-sky-300">char[]</code> password buffers.
        </p>
      </header>

      {/* Section 1: Conceptual Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Global Architecture of Java Chars
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Unlike traditional languages such as C and C++ where a <code className="text-amber-300">char</code> is a 1-byte (8-bit) integer limited to the 128 ASCII characters, Java adopted the <strong>Unicode standard</strong> from its inception. In Java, <code className="text-purple-400 font-bold">char</code> is a <strong>16-bit (2-byte) unsigned integral type</strong> spanning from <code className="text-sky-300 font-mono">0</code> to <code className="text-sky-300 font-mono">65,535</code> (<code className="text-emerald-300 font-mono">\u0000</code> to <code className="text-emerald-300 font-mono">\uffff</code>).
          </p>
          <p>
            This 16-bit representation allows Java programs to represent English ASCII, Bengali characters (বাংলা), Devanagari, Greek mathematical symbols, and modern international currency symbols such as the <strong>Indian Rupee (₹ — \u20B9)</strong> directly as native character literals.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Classroom Exploration (Barrackpore &amp; Naihati):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore lab, <strong>Swadeep</strong> and <strong>Tuhina</strong> built a student admission portal for regional institutions across Naihati and Shyamnagar. They used Unicode escape sequences like <code className="text-emerald-300 font-mono">&apos;\u0995&apos;</code> (Bengali &apos;ক&apos;) and <code className="text-emerald-300 font-mono">&apos;\u20B9&apos;</code> (₹). <strong>Abhronila</strong> and <strong>Debangshu</strong> observed how Java seamlessly transitions between character symbols and their underlying ASCII/Unicode integral values.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 16-Bit Unicode Landscape in Java (0 to 65,535)
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The 16-bit space of <code className="text-purple-300 font-mono">char</code> spans standard ASCII, European alphabets, Indic scripts, mathematical notations, and universal symbols.
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 280"
            className="w-full h-auto"
            aria-label="16-bit Java Unicode Space Allocation Diagram"
          >
            <defs>
              <linearGradient id="gradAscii" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradLatin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="gradIndic" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
              <linearGradient id="gradSymbols" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradAsian" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Block 1: Standard ASCII (0 - 127) */}
            <rect x="30" y="50" width="130" height="130" rx="10" fill="url(#gradAscii)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="95" y="80" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">ASCII Block</text>
            <text x="95" y="105" fill="#f0f9ff" fontSize="11" fontFamily="monospace" textAnchor="middle">0 - 127 (7-bit)</text>
            <text x="95" y="130" fill="#f0f9ff" fontSize="12" textAnchor="middle">&apos;0&apos;-&apos;9&apos;, &apos;A&apos;-&apos;Z&apos;</text>
            <text x="95" y="155" fill="#bae6fd" fontSize="10" textAnchor="middle">(&apos;A&apos; = 65, &apos;a&apos; = 97)</text>

            {/* Block 2: Extended Latin & Greek (128 - 2047) */}
            <rect x="170" y="50" width="160" height="130" rx="10" fill="url(#gradLatin)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="250" y="80" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Latin &amp; Greek</text>
            <text x="250" y="105" fill="#eef2ff" fontSize="11" fontFamily="monospace" textAnchor="middle">128 - 2,047</text>
            <text x="250" y="130" fill="#eef2ff" fontSize="12" textAnchor="middle">© (\u00A9), Ω (\u03A9)</text>
            <text x="250" y="155" fill="#c7d2fe" fontSize="10" textAnchor="middle">European Scripts</text>

            {/* Block 3: Indic & Bengali Scripts (2048 - 4095) */}
            <rect x="340" y="50" width="170" height="130" rx="10" fill="url(#gradIndic)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="425" y="80" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Indic &amp; Bengali</text>
            <text x="425" y="105" fill="#faf5ff" fontSize="11" fontFamily="monospace" textAnchor="middle">\u0980 - \u09FF</text>
            <text x="425" y="130" fill="#faf5ff" fontSize="12" textAnchor="middle">ক (\u0995), ব (\u09AC)</text>
            <text x="425" y="155" fill="#e9d5ff" fontSize="10" textAnchor="middle">Regional Indian Langs</text>

            {/* Block 4: Currency & Symbols (8192 - 12287) */}
            <rect x="520" y="50" width="160" height="130" rx="10" fill="url(#gradSymbols)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="600" y="80" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Currency Symbols</text>
            <text x="600" y="105" fill="#ecfdf5" fontSize="11" fontFamily="monospace" textAnchor="middle">\u20A0 - \u20CF</text>
            <text x="600" y="130" fill="#ecfdf5" fontSize="13" fontWeight="bold" textAnchor="middle">₹ (\u20B9), € (\u20AC)</text>
            <text x="600" y="155" fill="#a7f3d0" fontSize="10" textAnchor="middle">Indian Rupee &amp; Euro</text>

            {/* Block 5: CJK & High BMP (12288 - 65535) */}
            <rect x="690" y="50" width="160" height="130" rx="10" fill="url(#gradAsian)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="770" y="80" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">East Asian (CJK)</text>
            <text x="770" y="105" fill="#fffbeb" fontSize="11" fontFamily="monospace" textAnchor="middle">\u4E00 - \u9FFF</text>
            <text x="770" y="130" fill="#fffbeb" fontSize="12" textAnchor="middle">Chinese, Japanese</text>
            <text x="770" y="155" fill="#fde68a" fontSize="10" textAnchor="middle">Max: \uffff (65535)</text>

            {/* Footnote */}
            <text x="440" y="225" fill="#94a3b8" fontSize="12" textAnchor="middle">
              16-Bit Basic Multilingual Plane (BMP): 1 char = 1 UTF-16 Code Unit (0x0000 to 0xFFFF)
            </text>
            <text x="440" y="250" fill="#64748b" fontSize="11" textAnchor="middle">
              Characters &gt; 0xFFFF (such as Emojis 🚀) are stored as Surrogate Pairs (2 char units).
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Essential ASCII &amp; Unicode Anchors
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Category</th>
                <th className="p-3 font-semibold text-emerald-400">Character Range</th>
                <th className="p-3 font-semibold text-amber-400">Decimal (Integer) Value</th>
                <th className="p-3 font-semibold text-purple-400">Hex / Unicode Escape</th>
                <th className="p-3 font-semibold text-slate-400">Key Formula / Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Digits</td>
                <td className="p-3 font-mono text-emerald-400">&apos;0&apos; to &apos;9&apos;</td>
                <td className="p-3 font-mono text-amber-300">48 to 57</td>
                <td className="p-3 font-mono text-purple-300">\u0030 to \u0039</td>
                <td className="p-3 text-xs"><code className="text-sky-300">ch - &apos;0&apos;</code> yields int value (0-9)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Uppercase English</td>
                <td className="p-3 font-mono text-emerald-400">&apos;A&apos; to &apos;Z&apos;</td>
                <td className="p-3 font-mono text-amber-300">65 to 90</td>
                <td className="p-3 font-mono text-purple-300">\u0041 to \u005A</td>
                <td className="p-3 text-xs">Anchor: &apos;A&apos; is 65</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Lowercase English</td>
                <td className="p-3 font-mono text-emerald-400">&apos;a&apos; to &apos;z&apos;</td>
                <td className="p-3 font-mono text-amber-300">97 to 122</td>
                <td className="p-3 font-mono text-purple-300">\u0061 to \u007A</td>
                <td className="p-3 text-xs">Case Offset: <code className="text-sky-300">&apos;a&apos; - &apos;A&apos; == 32</code></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Indian Rupee</td>
                <td className="p-3 font-mono text-emerald-400">&apos;₹&apos;</td>
                <td className="p-3 font-mono text-amber-300">8377</td>
                <td className="p-3 font-mono text-purple-300">\u20B9</td>
                <td className="p-3 text-xs">Official Indian currency symbol</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Bengali Consonants</td>
                <td className="p-3 font-mono text-emerald-400">&apos;ক&apos;, &apos;ব&apos;, &apos;র&apos;</td>
                <td className="p-3 font-mono text-amber-300">2453, 2476, 2480</td>
                <td className="p-3 font-mono text-purple-300">\u0995, \u09AC, \u09B0</td>
                <td className="p-3 text-xs">Regional Indic Script support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Hands-on Code Example */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>💻</span> Compilable Java Source Code
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            CharAndUnicodeRepresentationDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates character declarations, ASCII arithmetic promotions, Unicode escape sequences (<code className="text-emerald-300">\uXXXX</code>), Bengali script characters, Indian Rupee symbols (<code className="text-emerald-300">₹</code>), and surrogate pairs.
        </p>

        <JavaFileLoader
          fileModule={charDemoCode}
          title="CharAndUnicodeRepresentationDemo.java"
          highlightLines={[21, 22, 33, 34, 38, 45, 46, 54, 55, 66, 67, 76, 77]}
        />
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Industry Best Practices
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 1: Expecting Char Arithmetic to Return Char
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">char c = &apos;A&apos; + 1;</code> or <code className="text-rose-300 font-mono">System.out.println(&apos;A&apos; + &apos;B&apos;);</code> catches beginners off guard. Binary arithmetic operators promote <code className="text-purple-300 font-mono">char</code> to <code className="text-sky-300 font-mono">int</code>, printing <code className="text-amber-300 font-mono">131</code> instead of &quot;AB&quot;.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Explicitly cast back: <code className="bg-slate-900 px-1 py-0.5 rounded">(char)(&apos;A&apos; + 1)</code> or prefix with an empty String: <code className="bg-slate-900 px-1 py-0.5 rounded">&quot;&quot; + &apos;A&apos; + &apos;B&apos;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 2: The Unicode Escape in Comment Security Trap
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Because Java processes <code className="text-emerald-400 font-mono">\uXXXX</code> in its very first lexical scanning pass (before comment removal), writing <code className="text-rose-300 font-mono">// \u000A System.out.println(&quot;Hi&quot;);</code> actually executes the code because <code className="text-emerald-400 font-mono">\u000A</code> translates into a physical newline character!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Never write raw Unicode escape sequences containing control characters in comments.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Security Best Practice: Storing Passwords in char[] vs String
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In banking and enterprise authentication, storing passwords in <code className="text-sky-300 font-mono">java.lang.String</code> leaves plain-text credentials in the String Constant Pool / heap until unpredictable garbage collection cycles occur.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Industry Habit:</strong> Always use <code className="bg-slate-900 px-1 py-0.5 rounded">char[]</code> password buffers so you can explicitly overwrite them (<code className="bg-slate-900 px-1 py-0.5 rounded">Arrays.fill(pwd, &apos;\u0000&apos;)</code>) immediately after login verification!
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Thinking & Hints Section */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>&ldquo;Both `short` and `char` occupy exactly 16 bits (2 bytes) of memory. Why does `short s = (short) c;` require an explicit cast, and why can a short not automatically hold every possible char?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Think about signedness! <code className="text-sky-300 font-mono">short</code> is a signed type (-32,768 to +32,767), while <code className="text-purple-300 font-mono">char</code> is unsigned (0 to 65,535). Positive values of <code className="text-purple-300 font-mono">char</code> from 32,768 to 65,535 cannot fit in a positive <code className="text-sky-300 font-mono">short</code> without overflowing into negative territory!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Character, ASCII &amp; Unicode FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 11: Character Representation, ASCII & Unicode"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_002_topic11_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To my students Swadeep, Tuhina, Abhronila, and Debangshu: Characters are where mathematics meets human culture. In Java, remembering the ASCII anchor numbers (0=48, A=65, a=97) gives you instantaneous power to parse digits and manipulate strings without calling heavy library functions. And remember: for security and password handling, always choose char[] arrays! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
