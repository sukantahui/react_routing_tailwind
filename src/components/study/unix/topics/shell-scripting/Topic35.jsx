import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Raw shell scripts – placed in ./topic35_files/
import validateInputDemoSh from "./topic35_files/validate_input_demo.sh?raw";
import userRegistrationSh from "./topic35_files/user_registration.sh?raw";

/**
 * Component: Topic35
 * Purpose: Example Script – User Input Validation.
 *          Demonstrates robust validation techniques for usernames, emails,
 *          integers, files, and dates using pure shell scripting.
 * Prototype: function Topic35(): JSX.Element
 * Return: Full educational section with script walkthrough, professional insights.
 *
 * Prerequisites: All topics 0–34
 */
const Topic35 = () => {
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <>
      {/* Custom keyframes – zero‑config Tailwind arbitrary animations */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes checkmark {
          0% { stroke-dashoffset: 30; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* MAIN – dark mode default, light mode via 'light:' prefix */}
      <div
        className={clsx(
          "max-w-7xl mx-auto px-4 py-12 space-y-16",
          "bg-gray-900 text-gray-100",
          "light:bg-white light:text-gray-900"
        )}
      >
        {/* ---------- HERO SECTION ---------- */}
        <header
          className={clsx(
            "text-center space-y-4",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            ✅ Example Script: <span className="text-green-400">User Input Validation</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Never trust user input. Learn how <span className="text-blue-400">Swadeep</span> and
            <span className="text-blue-400"> Tuhina</span> validate everything – from usernames in
            <span className="italic"> Barrackpore</span> to email addresses in{" "}
            <span className="italic">Naihati</span>.
          </p>

          {/* SVG: Validation flow diagram */}
          <div className="flex justify-center pt-6">
            <svg
              width="360"
              height="140"
              viewBox="0 0 360 140"
              className="drop-shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label="Input validation pipeline"
            >
              {/* Input field */}
              <rect x="20" y="50" width="70" height="40" rx="8" fill="#1e293b" stroke="#6b7280" />
              <text x="35" y="77" fontSize="12" fill="#d1d5db">user input</text>
              
              {/* Arrow */}
              <line x1="95" y1="70" x2="130" y2="70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
              
              {/* Validation box */}
              <rect x="140" y="40" width="100" height="60" rx="10" fill="#312e81" stroke="#a78bfa" strokeWidth="2" />
              <text x="165" y="75" fontSize="14" fill="#e0e7ff">validate</text>
              
              {/* Check / cross output */}
              <g transform="translate(260, 60)">
                <circle cx="15" cy="15" r="12" fill="none" stroke="#4ade80" strokeWidth="2" />
                <polyline points="10,15 15,20 25,8" stroke="#4ade80" strokeWidth="2" fill="none">
                  <animate attributeName="stroke-dashoffset" values="30;0" dur="0.8s" fill="freeze" begin="mouseover" />
                </polyline>
              </g>
              <g transform="translate(260, 95)">
                <circle cx="15" cy="15" r="12" fill="none" stroke="#ef4444" strokeWidth="2" />
                <line x1="10" y1="10" x2="20" y2="20" stroke="#ef4444" strokeWidth="2" />
                <line x1="20" y1="10" x2="10" y2="20" stroke="#ef4444" strokeWidth="2" />
              </g>

              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
        </header>

        {/* ---------- CONCEPT: WHY VALIDATION IS CRITICAL ---------- */}
        <section className="space-y-6 motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            🛡️ Why Validate? Defence in Depth
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <span className="text-amber-400">“Everything is a string”</span> – and every string can be
                malicious, malformed, or simply unexpected. Validation is your first line of defence.
              </p>
              <p>
                <span className="text-blue-400">Debangshu</span> once forgot to validate a filename;
                a user input <code>../../etc/passwd</code> wiped a critical config. After that, he
                never skipped validation again.
              </p>
            </div>
            <div
              className={clsx(
                "p-6 rounded-xl bg-gray-800 light:bg-gray-100 border border-green-700",
                "hover:shadow-[0_0_20px_-5px_rgba(74,222,128,0.5)] transition-shadow"
              )}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span> What to Validate
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Presence – not empty</li>
                <li>Type – integer, string, file</li>
                <li>Format – email, date, username</li>
                <li>Range – within allowed bounds</li>
                <li>Safety – no path traversal, no special chars</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- SCRIPT: VALIDATION LIBRARY ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            📜 validate_input_demo.sh – A Reusable Validation Library
          </h2>
          <ShellFileLoader
            fileModule={validateInputDemoSh}
            title="✅ validate_input_demo.sh"
            highlightLines={[5, 12, 20, 28, 37, 48]} // shebang, strict mode, validate_username, validate_email, validate_integer, validate_file, validate_date
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-gray-800 light:bg-gray-100 p-4 rounded-lg">
            <div><span className="font-bold">🔹 Username:</span> 3‑16 alnum + underscore</div>
            <div><span className="font-bold">🔹 Email:</span> simple pattern (local@domain)</div>
            <div><span className="font-bold">🔹 Integer:</span> optional sign, digits</div>
            <div><span className="font-bold">🔹 File:</span> exists, regular file</div>
            <div><span className="font-bold">🔹 Date:</span> YYYY-MM-DD, valid calendar</div>
            <div><span className="font-bold">🔹 Return codes:</span> 0 = valid, 1 = invalid</div>
          </div>
        </section>

        {/* ---------- SCRIPT: USER REGISTRATION EXAMPLE ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-blue-800 light:border-blue-300 pb-3 inline-block">
            📋 user_registration.sh – Putting It All Together
          </h2>
          <ShellFileLoader
            fileModule={userRegistrationSh}
            title="📝 user_registration.sh"
            highlightLines={[9, 16, 23]} // sourcing lib, validation loop, error handling
          />
          <p className="text-lg leading-relaxed">
            This interactive script prompts for a username, email, and age, validating each input
            using the library above. It demonstrates how to combine validation functions into a
            real‑world workflow.
          </p>
        </section>

        {/* ---------- COMMON PITFALLS ---------- */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold border-b border-red-800 light:border-red-300 pb-3 inline-block">
            ⚠️ Pitfalls in Input Validation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "❌ Using `[ ]` with regex – `=~` works only in `[[ ]]` (bash).",
              "❌ Forgetting to trim whitespace – leading/trailing spaces cause false negatives.",
              "❌ Not quoting the regex variable – `[[ $str =~ $pattern ]]` vs `[[ $str =~ \"$pattern\" ]]`.",
              "❌ Overly restrictive validation – rejecting valid inputs (e.g., plus in email).",
              "❌ Client‑side validation only – always validate on the server/script side.",
              "❌ Ignoring locale – `[0-9]` vs `[[:digit:]]` in some contexts.",
              "❌ Not providing clear error messages – user doesn't know how to fix.",
              "❌ Validating but not sanitising – path traversal still possible.",
            ].map((pitfall, idx) => (
              <div
                key={idx}
                className={clsx(
                  "p-5 rounded-lg border border-red-800 light:border-red-300",
                  "bg-red-900/20 light:bg-red-50",
                  "hover:bg-red-900/30 light:hover:bg-red-100 transition-colors"
                )}
              >
                <span className="text-lg">{pitfall}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- BEST PRACTICES ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-green-800 light:border-green-300 pb-3 inline-block">
            ✅ Best Practices for Input Validation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "🔹 Validate early, reject fast.",
              "🔹 Use whitelists (allow known good) instead of blacklists (block known bad).",
              "🔹 Return meaningful exit codes and error messages.",
              "🔹 Test edge cases: empty string, spaces, special characters, Unicode.",
              "🔹 In bash, prefer `[[ ... =~ ... ]]` for regex.",
              "🔹 For POSIX sh, use `case` statement for pattern matching.",
              "🔹 Always quote the string being validated.",
              "🔹 Separate validation logic from business logic.",
            ].map((practice, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded hover:bg-gray-800 light:hover:bg-gray-100">
                <span className="text-green-400 light:text-green-600 text-xl">✓</span>
                <span>{practice}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- PROFESSIONAL TIPS ---------- */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold border-b border-yellow-800 light:border-yellow-300 pb-3 inline-block">
            🧠 Pro Tips
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              🔹 <strong>Reuse validation libraries.</strong> Keep your validation functions in a separate
              file and source it. All your scripts will benefit from consistent rules.
            </p>
            <p>
              🔹 <strong>Add a `--strict` mode.</strong> For high‑security environments, enable additional
              checks (e.g., no Unicode, no control characters).
            </p>
            <p>
              🔹 <strong>Log validation failures.</strong> They can indicate probing or attacks.
              <code className="bg-gray-800 light:bg-gray-200 px-2 py-1 rounded">logger -p auth.warn "Invalid username attempt: $input"</code>
            </p>
            <p>
              🔹 <strong>Use `read -r`</strong> – always. Prevents backslash interpretation.
            </p>
            <p>
              🔹 <strong>Consider using `associative arrays` for validation messages.</strong>
              Makes error reporting cleaner.
            </p>
          </div>
        </section>

        {/* ---------- HINT SECTION ---------- */}
        <section
          className={clsx(
            "p-8 rounded-2xl bg-indigo-900/20 light:bg-indigo-50 border border-indigo-700",
            "flex flex-col md:flex-row gap-6 items-start"
          )}
        >
          <span className="text-5xl">💡</span>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">Observe carefully…</h3>
            <p className="text-lg leading-relaxed">
              In <code>validate_username</code>, we use regex <code>{`^[a-zA-Z0-9_]{3,16}$`}</code>.
              Why do we need double braces <code>{`{ }`}</code> in the shell script? What would happen
              if we wrote <code>{`{3,16}`}</code> without escaping?
            </p>
            <p className="text-md text-gray-300 light:text-gray-700">
              Try changing the email pattern to accept <code>user+tag@example.com</code>. What
              modification is needed?
            </p>
          </div>
        </section>

        {/* ---------- TEACHER'S NOTE ---------- */}
        <section
          className={clsx(
            "p-8 rounded-2xl bg-amber-900/20 light:bg-amber-50 border border-amber-700",
            "hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)] transition-shadow"
          )}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <span className="text-6xl">🧑‍🏫</span>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Teacher's Note</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-lg">
                <p><span className="font-semibold">Sukanta Hui</span></p>
                <p>📧 sukantahui@codernaccotax.co.in | 📞 7003756860</p>
                <p>🧰 Programming, RDBMS, OS, Web</p>
                <p>⏳ {experience} years (since 1998)</p>
              </div>
              <p className="text-lg leading-relaxed mt-4">
                “In my <span className="font-semibold">{experience} years</span> of teaching,
                <span className="text-blue-400"> Abhronila</span> from <span className="italic">Shyamnagar</span> 
                gave me the best analogy: ‘Validation is like checking your train ticket before boarding – 
                it saves you from being thrown out later.’ Teach students to validate not just for security,
                but for clarity. A helpful error message is a sign of a mature programmer.”
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #WhitelistNotBlacklist
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #ValidateEarly
                </span>
                <span className="bg-amber-800 light:bg-amber-200 px-4 py-2 rounded-full text-sm font-mono">
                  #HelpfulErrors
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MINI CHECKLIST ---------- */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">✅ Input Validation Checklist</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc list-inside marker:text-green-400">
            <li>Check for empty input.</li>
            <li>Validate format with regex (bash) or `case` (POSIX).</li>
            <li>Check ranges (numeric, string length).</li>
            <li>Sanitise dangerous characters (e.g., `../`, `;`).</li>
            <li>Provide specific error messages.</li>
            <li>Return meaningful exit codes.</li>
            <li>Test with both valid and invalid inputs.</li>
            <li>Consider internationalisation (Unicode).</li>
            <li>Log suspicious attempts.</li>
          </ul>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center pt-12 text-gray-400 light:text-gray-600 text-sm">
          <p>Next: Example Script – Looping through files (Topic36)</p>
        </footer>
      </div>
    </>
  );
};

export default Topic35;