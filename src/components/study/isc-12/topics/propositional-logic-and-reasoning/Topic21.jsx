// Topic21.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic21_files/topic21_questions';

const Topic21 = () => {
  // Interactive translator state
  const [englishStatement, setEnglishStatement] = useState("If it is raining, then the ground is wet.");
  const [translatedLogic, setTranslatedLogic] = useState("");
  const [showHint, setShowHint] = useState(false);

  // Predefined examples
  const examples = [
    {
      english: "It is raining and the ground is wet.",
      logic: "R ∧ W",
      variables: "R: 'It is raining', W: 'The ground is wet'"
    },
    {
      english: "Either Swadeep studies or he will fail.",
      logic: "S ∨ F",
      variables: "S: 'Swadeep studies', F: 'Swadeep will fail'"
    },
    {
      english: "If Tuhina is in Barrackpore, then she is in West Bengal.",
      logic: "B ⇒ W",
      variables: "B: 'Tuhina is in Barrackpore', W: 'Tuhina is in West Bengal'"
    },
    {
      english: "Abhronila can go to the party only if she finishes her homework.",
      logic: "P ⇒ H  (or H ⇐ P) — 'only if' introduces necessary condition",
      variables: "P: 'Abhronila goes to the party', H: 'Abhronila finishes homework'"
    },
    {
      english: "Susmita will pass the exam if and only if she studies hard.",
      logic: "P ⇔ S",
      variables: "P: 'Susmita passes', S: 'Susmita studies hard'"
    },
    {
      english: "Neither Debangshu nor Swadeep attended the meeting.",
      logic: "¬D ∧ ¬S  (or ¬(D ∨ S))",
      variables: "D: 'Debangshu attended', S: 'Swadeep attended'"
    },
    {
      english: "If it is not raining, then I will go for a walk.",
      logic: "¬R ⇒ W",
      variables: "R: 'It is raining', W: 'I go for a walk'"
    },
    {
      english: "You can enter only if you have a ticket.",
      logic: "E ⇒ T  (E only if T)",
      variables: "E: 'You can enter', T: 'You have a ticket'"
    }
  ];

  const handleTranslate = () => {
    // Simple pattern-based translation for demo (real implementation would be NLP)
    // For educational purposes, we'll show a guide
    setShowHint(true);
    // In a real scenario, you'd parse. Here we just prompt user to think.
  };

  const loadExample = (example) => {
    setEnglishStatement(example.english);
    setTranslatedLogic(example.logic + " — " + example.variables);
    setShowHint(true);
  };

  // Common English patterns and their logical equivalents
  const patterns = [
    { pattern: "p and q", logic: "p ∧ q" },
    { pattern: "p or q", logic: "p ∨ q" },
    { pattern: "not p", logic: "¬p" },
    { pattern: "if p then q", logic: "p ⇒ q" },
    { pattern: "p only if q", logic: "p ⇒ q (p only if q means q is necessary for p)" },
    { pattern: "p if and only if q", logic: "p ⇔ q" },
    { pattern: "neither p nor q", logic: "¬p ∧ ¬q" },
    { pattern: "p unless q", logic: "p ∨ q? Actually 'p unless q' means if not q then p: ¬q ⇒ p, or p ∨ q", logic2: "p ∨ q" },
    { pattern: "whenever p, q", logic: "p ⇒ q" },
    { pattern: "p is sufficient for q", logic: "p ⇒ q" },
    { pattern: "p is necessary for q", logic: "q ⇒ p" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Conversion of English Statements into Logical Expressions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Translating natural language to precise symbolic logic
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">Why Translate English to Logic?</h2>
          <p className="leading-relaxed">
            Natural language (English, Bengali, Hindi, etc.) is often ambiguous. Logical expressions are precise and unambiguous. Converting English statements to logic helps in:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Writing unambiguous program conditions</li>
            <li>Analyzing arguments and detecting fallacies</li>
            <li>Designing digital circuits from specifications</li>
            <li>Formulating mathematical proofs</li>
            <li>Building AI systems that understand language</li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Key skill:</strong> Identifying logical keywords (if, then, only if, and, or, not, unless, etc.) and mapping them to operators (⇒, ∧, ∨, ¬, ⇔).</p>
          </div>
        </div>

        {/* Common Patterns Reference */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">Common English Patterns & Their Logical Equivalents</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr><th className="px-3 py-2">English Phrase</th><th className="px-3 py-2">Logical Form</th><th className="px-3 py-2">Example</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                {patterns.map((p, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-1">"{p.pattern}"</td>
                    <td className="px-3 py-1 font-mono">{p.logic}</td>
                    <td className="px-3 py-1 text-xs">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Memorize these patterns — they appear frequently in exams and real life.</p>
        </div>

        {/* Interactive Translator Practice */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🔄 Interactive English → Logic Translator</h2>
          <p className="mb-4">Choose an example or type your own sentence. Try to identify the logical structure.</p>
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">English Statement:</label>
            <textarea 
              value={englishStatement}
              onChange={(e) => setEnglishStatement(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              rows="2"
            />
          </div>
          
          <div className="flex gap-3 mb-4">
            <button
              onClick={handleTranslate}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition"
            >
              Analyze (Show Hints)
            </button>
            <button
              onClick={() => setShowHint(false)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded"
            >
              Clear
            </button>
          </div>

          {showHint && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="font-semibold">🔍 Translation Guide:</p>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li>Look for keywords: <strong>and</strong> (∧), <strong>or</strong> (∨), <strong>not</strong> (¬), <strong>if...then</strong> (⇒), <strong>if and only if</strong> (⇔), <strong>only if</strong> (⇒, but direction matters).</li>
                <li><strong>"only if"</strong>: "p only if q" means p ⇒ q (q is necessary for p).</li>
                <li><strong>"unless"</strong>: "p unless q" usually means p ∨ q (or ¬q ⇒ p).</li>
                <li><strong>"neither p nor q"</strong>: ¬p ∧ ¬q.</li>
                <li>Identify atomic propositions and assign letters (e.g., R: "It is raining").</li>
              </ul>
              {translatedLogic && (
                <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  <p><strong>Suggested translation:</strong> {translatedLogic}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Worked Examples */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">📝 Worked Examples (Step-by-Step)</h2>
          <div className="space-y-4">
            {examples.map((ex, idx) => (
              <div key={idx} className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <p><strong>English:</strong> {ex.english}</p>
                <p><strong>Step 1:</strong> Identify atomic propositions.</p>
                <p className="ml-4 text-sm">{ex.variables}</p>
                <p><strong>Step 2:</strong> Identify logical connectives.</p>
                <p><strong>Logical expression:</strong> <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">{ex.logic}</code></p>
                <button 
                  onClick={() => loadExample(ex)}
                  className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Try this example →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Strategy */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">Step-by-Step Translation Strategy</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li><strong>Read the sentence carefully.</strong> Identify the main claim or relationship.</li>
            <li><strong>Underline atomic statements</strong> — simple declarative sentences that can be true or false.</li>
            <li><strong>Assign propositional variables</strong> (p, q, r, etc.) to each atomic statement.</li>
            <li><strong>Identify logical connectives</strong> based on keywords:
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>"and", "but", "however", "moreover" → ∧</li>
                <li>"or", "either...or" → ∨</li>
                <li>"not", "it is not the case that", "never" → ¬</li>
                <li>"if...then", "implies", "whenever" → ⇒</li>
                <li>"if and only if", "iff", "exactly when" → ⇔</li>
                <li>"only if" → ⇒ (antecedent/consequent order matters!)</li>
                <li>"unless" → ∨ or ¬q ⇒ p</li>
                <li>"neither...nor" → ¬ ∧ ¬</li>
              </ul>
            </li>
            <li><strong>Use parentheses</strong> to group sub-expressions correctly.</li>
            <li><strong>Write the final logical expression.</strong></li>
          </ol>
          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p className="font-mono">⚠️ <strong>Common trap:</strong> "p only if q" translates to p ⇒ q, NOT q ⇒ p. Remember: "only if" introduces a necessary condition (q is necessary for p).</p>
          </div>
        </div>

        {/* Special Cases */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-3 mb-4">Special Cases & Nuances</h2>
          <div className="space-y-3">
            <div className="p-2 bg-white dark:bg-gray-700 rounded">
              <p><strong>"Unless":</strong> "You will fail unless you study" ≡ "If you do not study, then you will fail" (¬S ⇒ F) ≡ "You study or you fail" (S ∨ F).</p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">
              <p><strong>"Only if":</strong> "You can vote only if you are 18" ≡ "If you can vote, then you are 18" (V ⇒ A). Not the other way around.</p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">
              <p><strong>"If and only if" (iff):</strong> "Swadeep passes iff he studies" ≡ (P ⇒ S) ∧ (S ⇒ P). Both directions.</p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">
              <p><strong>"Neither...nor":</strong> "Neither Swadeep nor Tuhina came" ≡ ¬S ∧ ¬T.</p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">
              <p><strong>"But" and "however":</strong> Same as "and" (∧). "It is raining but sunny" ≡ R ∧ S.</p>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls in Translation</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Reversing "only if":</strong> Many students write q ⇒ p for "p only if q" (wrong). Correct is p ⇒ q.</li>
            <li><strong>Misinterpreting "unless":</strong> "p unless q" means p ∨ q, not p ⇒ q.</li>
            <li><strong>Overlooking implicit "and":</strong> "Swadeep is tall, dark, and handsome" is three propositions joined by ∧.</li>
            <li><strong>Confusing "if" with "only if":</strong> "p if q" is q ⇒ p; "p only if q" is p ⇒ q.</li>
            <li><strong>Forgetting parentheses:</strong> "p and q or r" is ambiguous; use parentheses to clarify (p∧q)∨r vs p∧(q∨r).</li>
          </ul>
        </div>

        {/* Best Practices & Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices & Pro Tips</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Always define your variables clearly</strong> before writing the expression.</li>
            <li><strong>Break long sentences into smaller parts</strong> and combine them step by step.</li>
            <li><strong>Use parentheses even when not strictly needed</strong> to avoid ambiguity.</li>
            <li><strong>Practice with real-world scenarios</strong> (e.g., terms and conditions, legal documents, game rules).</li>
            <li><strong>Check your translation by converting back to English</strong> — does it say the same thing?</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Have you identified all atomic propositions?</li>
              <li>☑️ Did you correctly interpret "only if" and "unless"?</li>
              <li>☑️ Are parentheses used to show grouping?</li>
              <li>☑️ Is the direction of implication correct?</li>
              <li>☑️ Does the logic match the intended meaning?</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <Teacher note="This is a crucial skill for students. Use pair work: give one student an English sentence, another must write the logic, then swap. Emphasize the 'only if' trap — it's the most common error. Use real exam-style sentences involving local places (Barrackpore, Shyamnagar) and student names to make it relatable. Also show how programming conditions (if statements) come directly from such translations." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-1000">
          <FAQTemplate title="English to Logic Translation FAQs" questions={questions} />
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); }
          to { transform: translateY(0); }
        }
        .animate-\\[slideUp_0\\.5s_ease-out\\] {
          animation: slideUp 0.5s ease-out forwards;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1000 { animation-delay: 1.0s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[slideUp_0\\.5s_ease-out\\] {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic21;