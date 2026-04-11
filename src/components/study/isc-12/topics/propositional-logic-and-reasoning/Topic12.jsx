// Topic12.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic12_files/topic12_questions';

const Topic12 = () => {
  // Interactive law checker state
  const [pVal, setPVal] = useState(true);
  const [qVal, setQVal] = useState(true);
  const [rVal, setRVal] = useState(false);

  // Identity laws
  const identityAnd = pVal && true;
  const identityOr = pVal || false;

  // Domination laws
  const dominationAnd = pVal && false;
  const dominationOr = pVal || true;

  // Idempotent laws
  const idempotentAnd = pVal && pVal;
  const idempotentOr = pVal || pVal;

  // Double negation
  const doubleNeg = !(!pVal);

  // Commutative
  const commutativeAnd = (pVal && qVal) === (qVal && pVal);
  const commutativeOr = (pVal || qVal) === (qVal || pVal);

  // Associative (p ∧ q) ∧ r vs p ∧ (q ∧ r)
  const assocLeft = (pVal && qVal) && rVal;
  const assocRight = pVal && (qVal && rVal);
  const associativeWorks = assocLeft === assocRight;

  // Distributive: p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)
  const distribLeft = pVal && (qVal || rVal);
  const distribRight = (pVal && qVal) || (pVal && rVal);
  const distributiveWorks = distribLeft === distribRight;

  // Absorption: p ∨ (p ∧ q) ≡ p
  const absorptionLeft = pVal || (pVal && qVal);
  const absorptionRight = pVal;
  const absorptionWorks = absorptionLeft === absorptionRight;

  // Complement (negation) laws
  const complementAnd = pVal && !pVal;
  const complementOr = pVal || !pVal;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Laws of Propositional Logic (Basic Identities)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Fundamental algebraic rules that govern logical expressions
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">What are the Laws of Logic?</h2>
          <p className="leading-relaxed">
            Just as arithmetic has rules like <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">a + b = b + a</code>, propositional logic has <strong className="text-blue-600 dark:text-blue-400">laws of logical equivalence</strong>. These identities allow us to simplify, transform, and reason about logical expressions without constructing truth tables every time.
          </p>
          <p className="leading-relaxed mt-3">
            These laws are <strong>tautologies</strong> — they hold for all truth values of their variables. Mastering them is essential for logical reasoning, programming, and digital circuit design.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Real-world analogy:</strong> Swadeep knows that "I will go to the park OR (I will study AND I will finish homework)" can be rewritten using distributive law, just like in algebra.</p>
          </div>
        </div>

        {/* Quick Reference Table of Laws */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">📋 Complete List of Basic Laws</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Identity (AND):</strong> p ∧ True ≡ p</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Identity (OR):</strong> p ∨ False ≡ p</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Domination (AND):</strong> p ∧ False ≡ False</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Domination (OR):</strong> p ∨ True ≡ True</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Idempotent (AND):</strong> p ∧ p ≡ p</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Idempotent (OR):</strong> p ∨ p ≡ p</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Double Negation:</strong> ¬¬p ≡ p</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Complement (AND):</strong> p ∧ ¬p ≡ False</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Complement (OR):</strong> p ∨ ¬p ≡ True</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Commutative (AND/OR):</strong> p∧q ≡ q∧p, p∨q ≡ q∨p</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Associative (AND/OR):</strong> (p∧q)∧r ≡ p∧(q∧r), similarly for OR</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Distributive:</strong> p∧(q∨r) ≡ (p∧q)∨(p∧r); p∨(q∧r) ≡ (p∨q)∧(p∨r)</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Absorption:</strong> p ∨ (p∧q) ≡ p; p ∧ (p∨q) ≡ p</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>De Morgan's:</strong> ¬(p∧q) ≡ ¬p∨¬q; ¬(p∨q) ≡ ¬p∧¬q</div>
          </div>
        </div>

        {/* Interactive Law Checker */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">⚡ Interactive Law Verifier</h2>
          <p className="mb-4">Toggle values to see laws in action. Each pair should always match.</p>
          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={pVal} onChange={() => setPVal(!pVal)} className="w-5 h-5" /> <span className="font-mono font-bold">p = {pVal ? 'true' : 'false'}</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={qVal} onChange={() => setQVal(!qVal)} className="w-5 h-5" /> <span className="font-mono font-bold">q = {qVal ? 'true' : 'false'}</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={rVal} onChange={() => setRVal(!rVal)} className="w-5 h-5" /> <span className="font-mono font-bold">r = {rVal ? 'true' : 'false'}</span></label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p><strong>Identity:</strong> p ∧ True = {identityAnd ? 'true' : 'false'} &nbsp; | &nbsp; p ∨ False = {identityOr ? 'true' : 'false'}</p>
              <p className="text-green-600">✓ Both equal p ({pVal ? 'true' : 'false'})</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p><strong>Domination:</strong> p ∧ False = {dominationAnd ? 'true' : 'false'} &nbsp; | &nbsp; p ∨ True = {dominationOr ? 'true' : 'false'}</p>
              <p className="text-green-600">✓ False and True respectively</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p><strong>Idempotent:</strong> p ∧ p = {idempotentAnd ? 'true' : 'false'} &nbsp; | &nbsp; p ∨ p = {idempotentOr ? 'true' : 'false'}</p>
              <p className="text-green-600">✓ Both equal p ({pVal ? 'true' : 'false'})</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p><strong>Double Negation:</strong> ¬¬p = {doubleNeg ? 'true' : 'false'}</p>
              <p className="text-green-600">✓ Equals p ({pVal ? 'true' : 'false'})</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p><strong>Complement:</strong> p ∧ ¬p = {complementAnd ? 'true' : 'false'} &nbsp; | &nbsp; p ∨ ¬p = {complementOr ? 'true' : 'false'}</p>
              <p className="text-green-600">✓ False and True always</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p><strong>Absorption:</strong> p ∨ (p∧q) = {absorptionLeft ? 'true' : 'false'} &nbsp; | &nbsp; p = {absorptionRight ? 'true' : 'false'}</p>
              <p className={clsx(absorptionWorks ? "text-green-600" : "text-red-600")}>{absorptionWorks ? "✓ Equivalent" : "❌ Not equivalent (should never happen)"}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p><strong>Associative:</strong> (p∧q)∧r = {assocLeft ? 'true' : 'false'} &nbsp; | &nbsp; p∧(q∧r) = {assocRight ? 'true' : 'false'}</p>
              <p className={clsx(associativeWorks ? "text-green-600" : "text-red-600")}>{associativeWorks ? "✓ Equivalent" : "❌ Not equivalent"}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p><strong>Distributive (∧ over ∨):</strong> p∧(q∨r) = {distribLeft ? 'true' : 'false'} &nbsp; | &nbsp; (p∧q)∨(p∧r) = {distribRight ? 'true' : 'false'}</p>
              <p className={clsx(distributiveWorks ? "text-green-600" : "text-red-600")}>{distributiveWorks ? "✓ Equivalent" : "❌ Not equivalent"}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">💡 Experiment with different values — the laws hold for all combinations.</p>
        </div>

        {/* Detailed Explanation of Each Law */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4">📖 Detailed Explanation with Examples</h2>
          <div className="space-y-4">
            <div><strong className="text-blue-600">Identity Laws:</strong> p ∧ True = p (AND with true leaves p unchanged). p ∨ False = p (OR with false leaves p unchanged). Example: "It is raining AND true" means just "it is raining".</div>
            <div><strong className="text-blue-600">Domination Laws:</strong> p ∧ False = False (anything AND false is false). p ∨ True = True (anything OR true is true). Example: "It is raining OR true" is always true.</div>
            <div><strong className="text-blue-600">Idempotent Laws:</strong> p ∧ p = p, p ∨ p = p. Repeating same proposition doesn't change meaning.</div>
            <div><strong className="text-blue-600">Double Negation:</strong> ¬¬p = p. Two negatives cancel.</div>
            <div><strong className="text-blue-600">Complement Laws:</strong> p ∧ ¬p = False (cannot be both true and false). p ∨ ¬p = True (law of excluded middle).</div>
            <div><strong className="text-blue-600">Commutative Laws:</strong> Order doesn't matter for AND and OR. Like addition.</div>
            <div><strong className="text-blue-600">Associative Laws:</strong> Grouping doesn't matter for AND and OR. Allows us to write p∧q∧r without parentheses.</div>
            <div><strong className="text-blue-600">Distributive Laws:</strong> AND distributes over OR, and OR distributes over AND (unlike arithmetic where only multiplication distributes). Example: p ∧ (q ∨ r) = (p∧q) ∨ (p∧r).</div>
            <div><strong className="text-blue-600">Absorption Laws:</strong> p ∨ (p∧q) = p. The smaller term p absorbs the larger. Similarly p ∧ (p∨q) = p.</div>
            <div><strong className="text-blue-600">De Morgan's Laws:</strong> ¬(p∧q) = ¬p ∨ ¬q; ¬(p∨q) = ¬p ∧ ¬q. Distribute NOT and flip operator.</div>
          </div>
        </div>

        {/* How to Use Laws to Simplify */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">🔧 Simplification Strategies Using Laws</h2>
          <ul className="space-y-2 list-decimal list-inside">
            <li><strong>Remove double negations</strong> (¬¬p → p).</li>
            <li><strong>Apply De Morgan</strong> to push negations inward.</li>
            <li><strong>Use complement laws</strong> to eliminate p∧¬p (false) or p∨¬p (true).</li>
            <li><strong>Use domination</strong> to simplify ∧ false → false, ∨ true → true.</li>
            <li><strong>Use identity</strong> to drop ∧ true or ∨ false.</li>
            <li><strong>Apply absorption</strong> to remove redundant terms.</li>
            <li><strong>Distribute</strong> to factor or expand as needed.</li>
          </ul>
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-mono text-sm">⚡ <strong>Example simplification:</strong> (p ∧ q) ∨ (p ∧ ¬q) ≡ p ∧ (q ∨ ¬q) ≡ p ∧ True ≡ p. (Distributive + complement + identity)</p>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Confusing ∧ and ∨ in De Morgan:</strong> ¬(p∧q) becomes ¬p ∨ ¬q, not ¬p ∧ ¬q.</li>
            <li><strong>Assuming distribution works like arithmetic:</strong> p ∨ (q ∧ r) = (p∨q) ∧ (p∨r) is valid, but many forget OR distributes over AND.</li>
            <li><strong>Misapplying absorption:</strong> p ∨ (p∧q) = p, not p∧q.</li>
            <li><strong>Overlooking double negation opportunities:</strong> ¬¬(p∧q) can be simplified to p∧q.</li>
            <li><strong>Using commutative for implication:</strong> Implication is not commutative.</li>
          </ul>
        </div>

        {/* Best Practices & Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices & Pro Tips</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Memorize the laws by category:</strong> Identity, domination, idempotent, complement, etc. Group them for easier recall.</li>
            <li><strong>Use truth tables to verify any law you're unsure about.</strong></li>
            <li><strong>In programming, apply De Morgan to simplify complex if conditions:</strong> e.g., if (!(a && b)) becomes if (!a || !b).</li>
            <li><strong>Always simplify before building truth tables</strong> to reduce work.</li>
            <li><strong>Keep a reference card of laws</strong> handy for exams and coding.</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Have you applied double negation elimination?</li>
              <li>☑️ Did you push negations inward using De Morgan?</li>
              <li>☑️ Are there any p∧¬p or p∨¬p patterns?</li>
              <li>☑️ Can absorption remove a term?</li>
              <li>☑️ Is the expression as simple as possible?</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <Teacher note="These laws are the algebra of logic. Have students create flashcards for each law. Use mnemonics: 'De Morgan opens the gates' (NOT AND becomes OR). In class, show how a complex boolean condition in code can be refactored step-by-step using these laws. Encourage students to prove each law with a truth table at least once." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <FAQTemplate title="Laws of Propositional Logic FAQs" questions={questions} />
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

export default Topic12;