import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic10_files/example1.c?raw";
import example2 from "./topic10_files/example2.c?raw";
import example3 from "./topic10_files/example3.c?raw";

// Inline keyframes for animations (scoped to this component)
const animationStyles = `
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic10 = () => {
  // Calculate teacher's experience dynamically
  const startYear = 1998;
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - startYear;

  return (
    <div className="dark" style={{ backgroundColor: "#121212" }}> {/* dark mode default */}
      <style>{animationStyles}</style>
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Title section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate">
          <h1 className="text-4xl font-light tracking-tight leading-tight">
            Topic 10: Practical debugging of array-based programs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            How to find and fix common array bugs – off‑by‑one, uninitialized access, out‑of‑bounds, and more.
          </p>
        </section>

        {/* Conceptual explanation */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[100ms]">
          <h2 className="text-2xl font-medium mb-4">🐛 Why arrays need special debugging care</h2>
          <p className="leading-relaxed">
            C does not check array bounds, so errors often manifest as crashes, corrupted data, or mysterious behavior far from the actual bug. Debugging array programs requires a systematic approach: <strong>reproduce, isolate, inspect, fix, verify</strong>.
          </p>
          <p className="leading-relaxed mt-4">
            Common array bugs include:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Off‑by‑one errors (accessing index n instead of n-1).</li>
            <li>Using uninitialized array elements.</li>
            <li>Writing past the end (buffer overflow).</li>
            <li>Misinterpreting multi‑dimensional indexing.</li>
            <li>Forgetting that arrays decay to pointers when passed to functions.</li>
          </ul>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <p className="text-sm font-medium">🏫 Real‑world analogy:</p>
            <p className="text-sm mt-1">
              At <strong>Barrackpore CNAT</strong>, if the class register has 30 pages and a student tries to write on page 31, they might write on the teacher's desk. Finding that out later is like debugging an out‑of‑bounds write – the effect appears elsewhere.
            </p>
          </div>
        </section>

        {/* SVG Illustration: debugging mindset */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[200ms]">
          <h2 className="text-2xl font-medium mb-4">🔍 Debugging workflow</h2>
          <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-xl">
            <svg width="400" height="150" viewBox="0 0 400 150" className="max-w-full h-auto">
              {/* Steps */}
              <circle cx="50" cy="75" r="20" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <text x="50" y="80" textAnchor="middle" fill="currentColor">1</text>
              <text x="50" y="110" textAnchor="middle" fill="#6b7280" fontSize="10">Reproduce</text>
              
              <line x1="70" y1="75" x2="110" y2="75" stroke="#888" strokeWidth="2" />
              
              <circle cx="140" cy="75" r="20" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <text x="140" y="80" textAnchor="middle" fill="currentColor">2</text>
              <text x="140" y="110" textAnchor="middle" fill="#6b7280" fontSize="10">Isolate</text>
              
              <line x1="160" y1="75" x2="200" y2="75" stroke="#888" strokeWidth="2" />
              
              <circle cx="230" cy="75" r="20" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <text x="230" y="80" textAnchor="middle" fill="currentColor">3</text>
              <text x="230" y="110" textAnchor="middle" fill="#6b7280" fontSize="10">Inspect</text>
              
              <line x1="250" y1="75" x2="290" y2="75" stroke="#888" strokeWidth="2" />
              
              <circle cx="320" cy="75" r="20" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <text x="320" y="80" textAnchor="middle" fill="currentColor">4</text>
              <text x="320" y="110" textAnchor="middle" fill="#6b7280" fontSize="10">Fix</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Systematic debugging process.
          </p>
        </section>

        {/* C code examples */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[300ms] space-y-6">
          <h2 className="text-2xl font-medium mb-4">💻 Debugging techniques in action</h2>

          <EditableCCodeBlock
            title="Example 1: Printf debugging"
            initialCode={example1}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            Sprinkle <code>printf</code> statements to trace execution and variable values.
          </p>

          <EditableCCodeBlock
            title="Example 2: Using assert for internal checks"
            initialCode={example2}
          />

          <EditableCCodeBlock
            title="Example 3: Simulating Valgrind-like manual checks"
            initialCode={example3}
          />
        </section>

        {/* Tips & Tricks */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[400ms]">
          <h2 className="text-2xl font-medium mb-4">💡 Tips & Tricks (Professional habits)</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li><strong>Use a debugger (gdb)</strong> – set breakpoints, step through code, examine array contents.</li>
            <li><strong>Enable compiler warnings</strong> – <code>-Wall -Wextra</code> catches many mistakes.</li>
            <li><strong>Run under Valgrind or AddressSanitizer</strong> – they detect out‑of‑bounds and uninitialized reads.</li>
            <li><strong>Add assertions for critical conditions</strong> – <code>assert(index &gt;= 0 &amp;&amp; index &lt; size);</code>.</li>
            <li><strong>Keep a “debug print” macro</strong> that you can disable globally: <code>#ifdef DEBUG</code>.</li>
            <li><strong>Isolate the minimal test case</strong> – reduce the program to the smallest code that still shows the bug.</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[500ms]">
          <h2 className="text-2xl font-medium mb-4">⚠️ Common Pitfalls (Beginner traps)</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Relying on “it works on my machine”</p>
              <p className="text-sm">Undefined behavior can appear correct until you change compiler, OS, or input.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Debugging by random code changes</p>
              <p className="text-sm">Guessing and changing code without understanding often introduces new bugs.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Ignoring compiler warnings</p>
              <p className="text-sm">Warnings about unused variables, signed/unsigned mismatches, etc., often hint at real issues.</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[600ms]">
          <h2 className="text-2xl font-medium mb-4">✅ Best Practices (Write debuggable code)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Initialize arrays explicitly – zero them if nothing else.</li>
            <li>Use <code>size_t</code> for indices and loop bounds.</li>
            <li>Check array indices when they come from external input.</li>
            <li>Keep functions short and focused – easier to test.</li>
            <li>Write unit tests for array operations.</li>
            <li>Use <code>const</code> to document which arrays should not be modified.</li>
            <li>Add comments explaining non‑obvious index calculations.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[700ms] p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <h2 className="text-xl font-medium mb-2">📋 Mini Checklist – What to remember</h2>
          <ul className="list-check list-inside space-y-1">
            <li>✔️ Use <code>printf</code> or a debugger to inspect.</li>
            <li>✔️ Enable compiler warnings and static analysis.</li>
            <li>✔️ Run Valgrind/AddressSanitizer.</li>
            <li>✔️ Add assertions for index bounds.</li>
            <li>✔️ Isolate the bug with minimal test case.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[800ms] p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <h2 className="text-xl font-medium mb-2">🤔 Hint – Think like a programmer</h2>
          <p className="italic">
            “When your program crashes, ask: What was the last array access before the crash? Print the index and the size.”
          </p>
          <p className="italic mt-2">
            “If you get strange values, suspect uninitialized array elements. Add a loop to print the array after initialization.”
          </p>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[900ms] p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-medium mb-2">🧑‍🏫 Teacher's Note – Sukanta Hui</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Sukanta Hui</strong> (email: <a href="mailto:sukantahui@codernaccotax.co.in" className="underline">sukantahui@codernaccotax.co.in</a>, mobile: 7003756860) has been teaching programming for <strong>{experienceYears} years</strong> (since 1998). His expertise spans Programming Languages, RDBMS, Operating Systems, and Web Development.
            </p>
            <p className="mt-2">
              💬 “At <strong>Naihati CNAT</strong>, I tell my students: ‘Debugging is like detective work. You have clues – the crash point, the values of variables. Use <code>printf</code> as your magnifying glass. But don't stop there – learn to use a debugger. It's like having x‑ray vision.’”
            </p>
            <p className="mt-2">
              🔍 <strong>Point to remember:</strong> The best debugging is prevention – write clean code, check indices, and use tools. When a bug appears, approach it systematically. You'll save hours of frustration.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic10;