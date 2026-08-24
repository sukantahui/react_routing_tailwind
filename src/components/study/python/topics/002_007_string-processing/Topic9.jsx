import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import palindromeAnagram from "./topic9_files/palindrome_and_anagram_algorithms.py?raw";
import wordCounting from "./topic9_files/word_counting_and_frequency_analysis.py?raw";
import compressionTransform from "./topic9_files/string_compression_and_transformation.py?raw";
import textAnalytics from "./topic9_files/industrial_text_analytics_engine.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic9_files/topic9_note.txt?raw";

// FAQ Questions
import questions from "./topic9_files/topic9_questions";

/**
 * Topic9: Common string processing algorithms (palindromes, anagrams, word counts)
 * Module: 002_007_string-processing
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic9() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("palindrome");

  // Interactive Sandbox State
  const [activeAlgo, setActiveAlgo] = useState("palindrome"); // palindrome, anagram, frequency, rle, levenshtein
  const [inputStr1, setInputStr1] = useState("A man, a plan, a canal: Panama!");
  const [inputStr2, setInputStr2] = useState("Panama");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Helper algorithms in JS matching Python implementations
  const evaluateAlgorithm = () => {
    if (activeAlgo === "palindrome") {
      const clean = inputStr1.toLowerCase().replace(/[^a-z0-9]/g, "");
      const isPal = clean === clean.split("").reverse().join("");
      return {
        isPal,
        cleanString: clean,
        pySnippet: `def is_palindrome(s):\n    clean = "".join(c.lower() for c in s if c.isalnum())\n    return clean == clean[::-1]\n\nprint(is_palindrome("${inputStr1}"))  # ${isPal ? "True" : "False"}`,
      };
    } else if (activeAlgo === "anagram") {
      const c1 = inputStr1.toLowerCase().replace(/[^a-z0-9]/g, "").split("").sort().join("");
      const c2 = inputStr2.toLowerCase().replace(/[^a-z0-9]/g, "").split("").sort().join("");
      const isAna = c1.length > 0 && c1 === c2;
      return {
        isAna,
        c1,
        c2,
        pySnippet: `from collections import Counter\ndef are_anagrams(s1, s2):\n    c1 = [c.lower() for c in s1 if c.isalnum()]\n    c2 = [c.lower() for c in s2 if c.isalnum()]\n    return Counter(c1) == Counter(c2)\n\nprint(are_anagrams("${inputStr1}", "${inputStr2}"))  # ${isAna ? "True" : "False"}`,
      };
    } else if (activeAlgo === "frequency") {
      const words = inputStr1.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];
      const freq = {};
      words.forEach((w) => (freq[w] = (freq[w] || 0) + 1));
      const sortedFreq = Object.entries(freq).sort((a, b) => b[1] - a[1]);
      return {
        totalWords: words.length,
        uniqueWords: Object.keys(freq).length,
        topWords: sortedFreq.slice(0, 5),
        pySnippet: `import collections, re\nwords = re.findall(r"\\b\\w+\\b", text.lower())\ncounts = collections.Counter(words)\nprint(counts.most_common(5))`,
      };
    } else if (activeAlgo === "rle") {
      if (!inputStr1) return { compressed: "", ratio: "0%" };
      let res = "";
      let cur = inputStr1[0];
      let count = 1;
      for (let i = 1; i < inputStr1.length; i++) {
        if (inputStr1[i] === cur) {
          count++;
        } else {
          res += `${cur}${count}`;
          cur = inputStr1[i];
          count = 1;
        }
      }
      res += `${cur}${count}`;
      const ratio = ((res.length / inputStr1.length) * 100).toFixed(1);
      return {
        compressed: res,
        origLen: inputStr1.length,
        compLen: res.length,
        ratio,
        pySnippet: `def rle_compress(s):\n    if not s: return ""\n    res, cur, count = [], s[0], 1\n    for ch in s[1:]:\n        if ch == cur: count += 1\n        else: res.append(f"{cur}{count}"); cur = ch; count = 1\n    res.append(f"{cur}{count}")\n    return "".join(res)`,
      };
    } else if (activeAlgo === "levenshtein") {
      const s1 = inputStr1.toLowerCase();
      const s2 = inputStr2.toLowerCase();
      const m = s1.length;
      const n = s2.length;
      const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
      for (let i = 0; i <= m; i++) dp[i][0] = i;
      for (let j = 0; j <= n; j++) dp[0][j] = j;
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
          else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
      const dist = dp[m][n];
      return {
        dist,
        pySnippet: `def levenshtein(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m + 1): dp[i][0] = i\n    for j in range(n + 1): dp[0][j] = j\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1]\n            else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\n    return dp[m][n]\n\nprint(levenshtein("${inputStr1}", "${inputStr2}"))  # ${dist}`,
      };
    }
  };

  const algoResult = evaluateAlgorithm();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowIndigo {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(99, 102, 241, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.8)); }
        }
        .animate-glow-indigo {
          animation: pulseGlowIndigo 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-indigo-950/80 text-indigo-300 px-3 py-1 rounded-full border border-indigo-800/80 shadow-sm shadow-indigo-950/50">
            Segment 2 • Module 002_007
          </span>
          <span className="text-xs sm:text-sm font-mono bg-violet-950/80 text-violet-300 px-3 py-1 rounded-full border border-violet-800/80 shadow-sm shadow-violet-950/50">
            Topic 9 (Module Capstone)
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            String Processing &amp; Pattern Handling
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Common String Algorithms: Palindromes, Anagrams &amp; Word Counts
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master production string algorithms: two-pointer <span className="text-emerald-400 font-semibold">O(1)</span> space palindrome verification, <span className="text-indigo-400 font-semibold">O(N)</span> Counter anagram matching, N-gram generation, 2D Dynamic Programming for <span className="text-purple-400 font-semibold">Levenshtein Edit Distance</span>, and Run-Length Encoding (RLE) lossless compression.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Two-Pointer Palindromes (O(N) Time, O(1) Space)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔠 O(N) Anagram Detection with collections.Counter
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📊 2D DP Levenshtein Edit Distance (Fuzzy Search)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🗜️ Run-Length Encoding (RLE) Lossless Compression
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE STRING ALGORITHMS LANDSCAPE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Core Algorithmic Paradigms in String Processing
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              String algorithms represent the intersection of data structures, hashing, pointer manipulation, and dynamic programming. Choosing the optimal algorithm prevents catastrophic performance bottlenecks:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-5 rounded-xl bg-indigo-950/40 border border-indigo-800/60 shadow-lg shadow-indigo-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-indigo-500">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg mb-2">
                  <span>↔️</span> Two-Pointer Technique
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Inward scanning eliminates memory allocation overhead by checking characters symmetrically in <code className="text-indigo-300 font-mono">O(1)</code> auxiliary space.
                </p>
                <span className="text-xs text-indigo-400/80 font-mono">Use Case: Palindromes &amp; In-Place Reversal</span>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-purple-500">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-lg mb-2">
                  <span>📊</span> Frequency Hashing
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Using <code className="text-purple-300 font-mono">collections.Counter</code> counts character multisets in linear <code className="text-purple-300 font-mono">O(N)</code> time, beating sorting.
                </p>
                <span className="text-xs text-purple-400/80 font-mono">Use Case: Anagrams &amp; Vocabulary Density</span>
              </div>

              {/* Pillar 3 */}
              <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-2">
                  <span>📐</span> Dynamic Programming
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  Constructing 2D subproblem grids to find minimum edit costs (insertions, deletions, substitutions) in <code className="text-emerald-300 font-mono">O(M*N)</code>.
                </p>
                <span className="text-xs text-emerald-400/80 font-mono">Use Case: Levenshtein &amp; Typo-Tolerant Search</span>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-indigo-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-2">
                The O(N²) Quadratic Frequency Trap
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Writing <code className="text-rose-400 font-mono">max(set(s), key=s.count)</code> to find the most frequent character scans the entire string once for EVERY unique character, degrading to <code className="text-rose-400 font-mono">O(N²)</code>!
              </p>
              <p className="text-sm sm:text-base text-emerald-300 font-semibold mt-1">
                ✓ Best Practice: Use <code className="text-emerald-400 font-mono">collections.Counter(s).most_common(1)</code> for clean, single-pass <code className="text-emerald-400 font-mono">O(N)</code> linear performance.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUAL ARCHITECTURE (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔍</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Two-Pointer Scans &amp; Dynamic Programming
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("palindrome")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "palindrome"
                    ? "bg-indigo-900/50 text-indigo-300 border border-indigo-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Two-Pointer Inward Scan
              </button>
              <button
                onClick={() => setActiveInteractiveTab("anagram")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "anagram"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Anagram Frequency Vector
              </button>
              <button
                onClick={() => setActiveInteractiveTab("dp")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "dp"
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Levenshtein DP Grid
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Exploring pointer convergence, character frequency equivalence, and distance matrices:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "palindrome" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#818cf8" fontSize="14" fontWeight="bold">OPTIMAL TWO-POINTER INWARD PALINDROME SCAN: Target = "R A C E C A R"</text>

                {/* Two pointer boxes */}
                <g transform="translate(100, 60)">
                  {['R', 'A', 'C', 'E', 'C', 'A', 'R'].map((ch, idx) => (
                    <g key={idx}>
                      <rect x={idx * 90} y="0" width="70" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                      <text x={idx * 90 + 35} y="45" fill="#f8fafc" fontSize="24" fontWeight="bold" textAnchor="middle">{ch}</text>
                      <text x={idx * 90 + 35} y="95" fill="#94a3b8" fontSize="12" textAnchor="middle">i={idx}</text>
                    </g>
                  ))}

                  {/* Left and Right Pointer Markers */}
                  <path d="M 35 120 L 35 150 M 25 130 L 35 120 L 45 130" stroke="#34d399" strokeWidth="2.5" fill="none" />
                  <text x="35" y="175" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">Left (i=0)</text>

                  <path d="M 575 120 L 575 150 M 565 130 L 575 120 L 585 130" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                  <text x="575" y="175" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Right (i=6)</text>
                </g>

                {/* Explanation Box */}
                <g transform="translate(30, 250)">
                  <rect x="0" y="0" width="810" height="60" rx="6" fill="#090d16" stroke="#334155" />
                  <text x="20" y="25" fill="#a7f3d0" fontSize="12" fontWeight="bold">Pointer Convergence Rule:</text>
                  <text x="20" y="45" fill="#cbd5e1" fontSize="12">
                    Compares s[left] with s[right]. If equal, advances left += 1 and decrements right -= 1. Zero auxiliary memory allocation (O(1) space)!
                  </text>
                </g>
              </svg>
            ) : activeInteractiveTab === "anagram" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">ANAGRAM FREQUENCY COMPARISON: "listen" VS "silent"</text>

                {/* Word 1 Vector */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="390" height="150" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="14" fontWeight="bold">Word 1: "listen"</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="13 font-mono">
                    Counter: &#123;'e':1, 'i':1, 'l':1, 'n':1, 's':1, 't':1&#125;
                  </text>
                  <text x="20" y="95" fill="#a7f3d0" fontSize="12 font-mono">
                    Canonical Key: "".join(sorted("listen")) → "eilnst"
                  </text>
                  <text x="20" y="125" fill="#38bdf8" fontSize="11">Time: O(N) single-pass frequency count</text>
                </g>

                {/* Word 2 Vector */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="150" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="14" fontWeight="bold">Word 2: "silent"</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="13 font-mono">
                    Counter: &#123;'e':1, 'i':1, 'l':1, 'n':1, 's':1, 't':1&#125;
                  </text>
                  <text x="20" y="95" fill="#a7f3d0" fontSize="12 font-mono">
                    Canonical Key: "".join(sorted("silent")) → "eilnst"
                  </text>
                  <text x="20" y="125" fill="#38bdf8" fontSize="11">Time: O(N) single-pass frequency count</text>
                </g>

                {/* Equivalence Verdict */}
                <g transform="translate(30, 220)">
                  <rect x="0" y="0" width="810" height="80" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="35" fill="#a7f3d0" fontSize="14" fontWeight="bold">
                    Equivalence Check: Counter("listen") == Counter("silent")
                  </text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="13">
                    → Returns True! Both strings contain identical multisets of characters.
                  </text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#34d399" fontSize="14" fontWeight="bold">LEVENSHTEIN 2D DYNAMIC PROGRAMMING MATRIX: "kitten" → "sitting"</text>

                {/* DP Recurrence Table Visualizer */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="810" height="150" rx="8" fill="#090d16" stroke="#334155" />
                  <text x="20" y="30" fill="#38bdf8" fontSize="13" fontWeight="bold">DP State Recurrence Equation:</text>
                  <text x="20" y="60" fill="#f8fafc" fontSize="12">
                    if s1[i-1] == s2[j-1]: &nbsp;&nbsp;<tspan fill="#34d399" fontWeight="bold">dp[i][j] = dp[i-1][j-1]</tspan> &nbsp;(Zero edit cost)
                  </text>
                  <text x="20" y="90" fill="#f8fafc" fontSize="12">
                    else: &nbsp;&nbsp;<tspan fill="#f59e0b" fontWeight="bold">dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])</tspan> &nbsp;(Delete, Insert, Replace)
                  </text>
                  <text x="20" y="125" fill="#94a3b8" fontSize="11">Time Complexity: O(M * N) | Space Complexity: O(M * N)</text>
                </g>

                {/* Bottom Result Box */}
                <g transform="translate(30, 220)">
                  <rect x="0" y="0" width="810" height="80" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="35" fill="#a7f3d0" fontSize="14" fontWeight="bold">
                    Transformation from "kitten" to "sitting": Total 3 Edits
                  </text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="12">
                    1. Substitute 'k' with 's' &nbsp;|&nbsp; 2. Substitute 'e' with 'i' &nbsp;|&nbsp; 3. Insert 'g' at the end.
                  </text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE STRING ALGORITHMS SANDBOX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive String Processing Algorithms Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select an algorithm, type or modify input strings, and observe real-time algorithmic verifications and Python implementations:
          </p>

          {/* Algorithm Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
            {[
              { id: "palindrome", label: "Palindrome Checker" },
              { id: "anagram", label: "Anagram Matcher" },
              { id: "frequency", label: "Word Frequencies" },
              { id: "rle", label: "RLE Compression" },
              { id: "levenshtein", label: "Levenshtein Distance" },
            ].map((algo) => (
              <button
                key={algo.id}
                onClick={() => {
                  setActiveAlgo(algo.id);
                  if (algo.id === "palindrome") {
                    setInputStr1("A man, a plan, a canal: Panama!");
                  } else if (algo.id === "anagram") {
                    setInputStr1("Debit Card");
                    setInputStr2("Bad Credit");
                  } else if (algo.id === "frequency") {
                    setInputStr1("Python is clean, Python is powerful, and Python is fun.");
                  } else if (algo.id === "rle") {
                    setInputStr1("AAAAABBBCCCCCCDDDDDEEEEEEE");
                  } else if (algo.id === "levenshtein") {
                    setInputStr1("kitten");
                    setInputStr2("sitting");
                  }
                }}
                className={clsx(
                  "py-2 px-3 rounded-xl text-xs font-mono font-bold border transition-all text-center",
                  activeAlgo === algo.id
                    ? "bg-indigo-950 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-950"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                )}
              >
                {algo.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left Inputs */}
            <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Primary Input String
                </label>
                <textarea
                  value={inputStr1}
                  onChange={(e) => setInputStr1(e.target.value)}
                  rows={activeAlgo === "frequency" ? 4 : 2}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {(activeAlgo === "anagram" || activeAlgo === "levenshtein") && (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    Secondary Target String
                  </label>
                  <input
                    type="text"
                    value={inputStr2}
                    onChange={(e) => setInputStr2(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-indigo-300 font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}
            </div>

            {/* Right Output */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Generated Python Algorithm Snippet
                </span>
                <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-indigo-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap max-h-36">
                  {algoResult.pySnippet}
                </pre>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Algorithmic Evaluation Result
                </span>
                {activeAlgo === "palindrome" ? (
                  <div className="space-y-1 text-xs font-mono">
                    <div className={clsx("font-bold text-sm", algoResult.isPal ? "text-emerald-300" : "text-rose-400")}>
                      Verdict: {algoResult.isPal ? "✓ Valid Palindrome" : "✗ Not a Palindrome"}
                    </div>
                    <div className="text-slate-400">Normalized: "{algoResult.cleanString}"</div>
                  </div>
                ) : activeAlgo === "anagram" ? (
                  <div className="space-y-1 text-xs font-mono">
                    <div className={clsx("font-bold text-sm", algoResult.isAna ? "text-emerald-300" : "text-rose-400")}>
                      Verdict: {algoResult.isAna ? "✓ Valid Anagram Pair" : "✗ Not Anagrams"}
                    </div>
                    <div className="text-slate-400">Keys: "{algoResult.c1}" vs "{algoResult.c2}"</div>
                  </div>
                ) : activeAlgo === "frequency" ? (
                  <div className="space-y-1 text-xs font-mono">
                    <div className="text-emerald-300 font-bold">
                      Total Words: {algoResult.totalWords} | Unique Vocabulary: {algoResult.uniqueWords}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {algoResult.topWords.map(([w, cnt]) => (
                        <span key={w} className="bg-indigo-950 border border-indigo-700 px-2 py-0.5 rounded text-indigo-200">
                          {w}: {cnt}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : activeAlgo === "rle" ? (
                  <div className="space-y-1 text-xs font-mono">
                    <div className="text-emerald-300 font-bold">
                      Compressed: "{algoResult.compressed}" ({algoResult.compLen} chars)
                    </div>
                    <div className="text-slate-400">
                      Original: {algoResult.origLen} chars (Compression Ratio: {algoResult.ratio}%)
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 text-xs font-mono">
                    <div className="text-emerald-300 font-bold text-sm">
                      Levenshtein Edit Distance: {algoResult.dist} edit(s)
                    </div>
                    <div className="text-slate-400">Minimum insertions, deletions, and replacements.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER ALGORITHMIC COMPLEXITY MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master String Algorithms Complexity Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Algorithm Name</th>
                  <th className="py-3.5 px-4 font-bold">Method Paradigm</th>
                  <th className="py-3.5 px-4 font-bold">Time Complexity</th>
                  <th className="py-3.5 px-4 font-bold">Space Complexity</th>
                  <th className="py-3.5 px-4 font-bold">Real-World Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-indigo-300 font-semibold">Two-Pointer Palindrome</td>
                  <td className="py-3 px-4">Inward Scan</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">O(N)</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">O(1) Auxiliary</td>
                  <td className="py-3 px-4">Large-scale DNA &amp; textual symmetric verification</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Counter Anagram Check</td>
                  <td className="py-3 px-4">Hash Multiset</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">O(N)</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">O(1) (26 letters)</td>
                  <td className="py-3 px-4">Duplicate product inquiry &amp; review clustering</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Anagram Grouping</td>
                  <td className="py-3 px-4">Canonical Key Hashing</td>
                  <td className="py-3 px-4 font-mono text-amber-400">O(N * K log K)</td>
                  <td className="py-3 px-4 font-mono text-amber-400">O(N * K)</td>
                  <td className="py-3 px-4">Word game solvers &amp; cryptographic hash clustering</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">First Unique Character</td>
                  <td className="py-3 px-4">2-Pass Frequency</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">O(N)</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">O(1) (26 letters)</td>
                  <td className="py-3 px-4">Streaming character queue sanitization</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">Levenshtein Distance</td>
                  <td className="py-3 px-4">2D Dynamic Programming</td>
                  <td className="py-3 px-4 font-mono text-rose-400">O(M * N)</td>
                  <td className="py-3 px-4 font-mono text-rose-400">O(M * N)</td>
                  <td className="py-3 px-4">Typo-tolerant search bars &amp; spelling suggestions</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-pink-300 font-semibold">Run-Length Encoding (RLE)</td>
                  <td className="py-3 px-4">Lossless Compression</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">O(N)</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">O(N)</td>
                  <td className="py-3 px-4">Repetitive sensor telemetry &amp; image bitmap compression</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: LIVE PYTHON CODE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Interactive Code Lab: Production Scripts
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Explore 4 production-grade Python scripts demonstrating two-pointer palindrome checkers, Counter anagram clusters, Levenshtein distance, RLE compressors, and enterprise text analytics engines:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "palindrome_and_anagram_algorithms.py",
                code: palindromeAnagram,
                description: "Optimal two-pointer palindrome check (O(1) space), anagram frequency hashing (O(N)), and anagram group clusters.",
              },
              {
                filename: "word_counting_and_frequency_analysis.py",
                code: wordCounting,
                description: "Word frequency distributions with collections.Counter, first unique character finder, and 2D DP Levenshtein distance.",
              },
              {
                filename: "string_compression_and_transformation.py",
                code: compressionTransform,
                description: "Run-Length Encoding (RLE) compression/decompression, snake_case <-> camelCase converters, and Caesar/ROT13 cipher.",
              },
              {
                filename: "industrial_text_analytics_engine.py",
                code: textAnalytics,
                description: "Production text mining engine: lexical density, stop-word removal, and typo-tolerant fuzzy course search.",
              },
            ]}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON TRAPS & EDGE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Traps, Anti-Patterns &amp; Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <span>❌</span> Trap 1: Case &amp; Punctuation Palindrome Oversight
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Checking <code className="text-rose-300 font-mono">s == s[::-1]</code> on <code className="text-slate-300 font-mono">"Racecar"</code> or <code className="text-slate-300 font-mono">"Madam, I'm Adam"</code> returns <code className="text-rose-300 font-mono">False</code> due to capital letters, spaces, and punctuation.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Filter alphanumerics: <code className="text-emerald-300">"".join(c.lower() for c in s if c.isalnum())</code>
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Using `s.count` in `max()` for Frequency
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-amber-300 font-mono">max(set(s), key=s.count)</code> triggers an <code className="text-rose-400 font-mono">O(N²)</code> quadratic scan by calling <code className="text-amber-300 font-mono">count()</code> repeatedly for each character.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">Counter(s).most_common(1)[0][0]</code> for <code className="text-emerald-300">O(N)</code>!
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: RLE on Non-Repeating Data
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Running Run-Length Encoding on <code className="text-purple-300 font-mono">"ABCDEF"</code> yields <code className="text-purple-300 font-mono">"A1B1C1D1E1F1"</code>, expanding the string by 200%!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Only apply RLE when character run length &gt; 2.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Sorting Large Strings for Anagrams
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Sorting 100,000-character documents with <code className="text-cyan-300 font-mono">sorted()</code> causes <code className="text-rose-400 font-mono">O(N log N)</code> latency and memory bloat.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">collections.Counter</code> for linear <code className="text-emerald-300">O(N)</code> comparison!
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQ & INTERVIEW REVIEW QUESTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              7. Master Review &amp; Interview Questions (25 FAQs)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comprehensive question-and-answer repository covering palindrome optimizations, anagram hash maps, dynamic programming Levenshtein distance, and text analytics:
          </p>

          <FAQTemplate questions={questions} />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: STUDY NOTES, PRINTABLE HANDOUT & TEACHER BIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              8. Study Notes, Printable Handout &amp; Teacher Profile
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Download or print the complete reference sheet with algorithmic complexity tables, DP recurrences, and text analytics recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic9_common_string_algorithms_notes.txt"
              title="Print Topic 9 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
