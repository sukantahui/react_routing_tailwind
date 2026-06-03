// Topic30.jsx – Complete Propositional Logic Dictionary
// Now includes an interactive playground at the top (toggle p and q)
import React, { useState, useMemo, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic30_files/topic30_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';

// ============================================================
// ⚡ INTERACTIVE PLAYGROUND (try p and q yourself)
// ============================================================
const LogicPlayground = () => {
  const [p, setP] = useState(true);
  const [q, setQ] = useState(false);

  // Compute results
  const notP = !p;
  const and = p && q;
  const or = p || q;
  const implies = !p || q;      // p ⇒ q is equivalent to ¬p ∨ q
  const iff = p === q;          // p ⇔ q

  const TruthBox = ({ label, value, description }) => (
    <div className={clsx(
      "p-3 rounded-lg text-center transition-all duration-200",
      "hover:scale-105 hover:shadow-md",
      value 
        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700" 
        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700"
    )}>
      <div className="font-bold text-lg">{label}</div>
      <div className="text-2xl font-mono mt-1">
        {value ? "TRUE ✔" : "FALSE ❌"}
      </div>
      <div className="text-xs mt-1 opacity-75">{description}</div>
    </div>
  );

  return (
    <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-lg border border-blue-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out]">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700 dark:text-blue-300">
        ⚡ Logic Playground (Try Yourself)
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-4 text-sm">
        Click the buttons below to change p and q — watch how the truth values change!
      </p>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setP(!p)}
          className={clsx(
            "px-6 py-2 rounded-lg font-bold text-white transition-all duration-200",
            "hover:scale-105 hover:shadow-md",
            p ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          )}
        >
          p = {p ? "TRUE" : "FALSE"}
        </button>

        <button
          onClick={() => setQ(!q)}
          className={clsx(
            "px-6 py-2 rounded-lg font-bold text-white transition-all duration-200",
            "hover:scale-105 hover:shadow-md",
            q ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          )}
        >
          q = {q ? "TRUE" : "FALSE"}
        </button>
      </div>

      {/* Truth value boxes */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <TruthBox label="¬p (NOT p)" value={notP} description="Opposite of p" />
        <TruthBox label="p ∧ q (AND)" value={and} description="True only if both true" />
        <TruthBox label="p ∨ q (OR)" value={or} description="True if at least one true" />
        <TruthBox label="p ⇒ q (Implication)" value={implies} description="False only when p=T, q=F" />
        <TruthBox label="p ⇔ q (IFF)" value={iff} description="True when p and q same" />
      </div>

      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg">
        💡 <strong>Remember:</strong> Implication (p ⇒ q) is <strong>false only when p is true and q is false</strong>. All other cases are true!
      </div>
    </div>
  );
};

// ============================================================
// 📚 FULL EXAMPLES DATABASE (all 10 examples per term)
// ============================================================
const examplesDatabase = {
  proposition: [
    { text: '"The sky is blue" – declarative, can be true/false.', exp: 'We can verify → proposition.' },
    { text: '"Swadeep lives in Barrackpore" – factual claim.', exp: 'True or false → proposition.' },
    { text: '"2 + 2 = 5" – false proposition.', exp: 'Even false statements are propositions.' },
    { text: '"Ichapur is a city in West Bengal" – checkable.', exp: 'Truth value exists → proposition.' },
    { text: '"Tuhina scored 95% in maths" – verifiable.', exp: 'Proposition.' },
    { text: '"Abhronila loves logic" – subjective but still true/false.', exp: 'Depends on Abhronila → proposition.' },
    { text: '"Susmita will visit Naihati tomorrow" – future claim.', exp: 'Will be true/false tomorrow → proposition.' },
    { text: '"Debangshu is taller than 150 cm" – measurable.', exp: 'Proposition.' },
    { text: '"The Ganga flows through Shyamnagar" – factual.', exp: 'Proposition.' },
    { text: '"All students passed the exam" – universal claim.', exp: 'True or false → proposition.' }
  ],
  "truth-value": [
    { text: 'Proposition: "Sky is blue" → True', exp: 'Truth value = True.' },
    { text: 'Proposition: "2+2=5" → False', exp: 'Truth value = False.' },
    { text: 'Given p = "Swadeep is present". If he is present, truth value = T.', exp: 'Depends on reality.' },
    { text: 'Compound: "It rains AND ground wet". If rain=T, wet=F → overall F.', exp: 'Truth value of conjunction.' },
    { text: 'p ∨ ¬p always gets truth value T (tautology).', exp: 'Always true.' },
    { text: 'p ∧ ¬p always gets truth value F (contradiction).', exp: 'Always false.' },
    { text: 'Truth value of "Naihati is in India" → T.', exp: 'Factual.' },
    { text: 'Truth value of "Ichapur is a metropolis" → F.', exp: 'False statement.' },
    { text: 'In binary logic, only T and F exist.', exp: 'No third value.' },
    { text: 'Truth value depends on the assignment of variables.', exp: 'e.g., p=T, q=F gives p∧q=F.' }
  ],
  "atomic-proposition": [
    { text: '"Swadeep is a student" – cannot be split.', exp: 'Atomic.' },
    { text: '"Tuhina likes coffee" – simple statement.', exp: 'Atomic.' },
    { text: '"2 is a prime number" – atomic.', exp: 'No connectives.' },
    { text: '"Barrackpore has a railway station" – atomic.', exp: 'One fact.' },
    { text: '"Abhronila studies logic" – atomic.', exp: 'Indivisible.' },
    { text: '"Susmita is 15 years old" – atomic.', exp: 'Single claim.' },
    { text: '"Debangshu plays cricket" – atomic.', exp: 'No AND/OR.' },
    { text: '"Naihati is a town" – atomic.', exp: 'Simple.' },
    { text: '"It is raining" – atomic.', exp: 'One condition.' },
    { text: '"The door is closed" – atomic.', exp: 'Basic proposition.' }
  ],
  "compound-proposition": [
    { text: '"It rains AND ground wet" – conjunction of two atomics.', exp: 'Compound.' },
    { text: '"Swadeep studies OR he fails" – disjunction.', exp: 'Compound.' },
    { text: '"If it rains THEN ground wet" – implication.', exp: 'Compound.' },
    { text: '"It is raining IF AND ONLY IF clouds are dark" – biconditional.', exp: 'Compound.' },
    { text: '¬(p ∧ q) – negation of conjunction.', exp: 'Compound.' },
    { text: '(p ∨ q) ∧ (¬r) – multiple connectives.', exp: 'Compound.' },
    { text: '"Tuhina is smart AND hardworking" – compound.', exp: 'Two properties.' },
    { text: '"Abhronila will go to Shyamnagar OR Ichapur" – compound.', exp: 'Choice.' },
    { text: '"If Susmita practices, then she will win" – compound.', exp: 'Conditional.' },
    { text: '"Debangshu is happy iff he gets a gift" – compound.', exp: 'Biconditional.' }
  ],
  "logical-variable": [
    { text: 'Let p = "It is raining". Then p is a logical variable.', exp: 'Stands for a proposition.' },
    { text: 'q = "Swadeep passes the exam".', exp: 'Variable representing a statement.' },
    { text: 'r = "Tuhina is from Barrackpore".', exp: 'Symbolic representation.' },
    { text: 'Use p, q, r in truth tables.', exp: 'Placeholders.' },
    { text: 'In Boolean algebra, variables are x, y, z.', exp: 'Often use letters.' },
    { text: 'p ⇒ q uses two variables.', exp: 'Implication form.' },
    { text: '¬p negates the variable p.', exp: 'Operator on variable.' },
    { text: 'In programming, bool variables like isRaining.', exp: 'Analogous.' },
    { text: 'Logical variables can be assigned T or F.', exp: 'Truth assignment.' },
    { text: 'Variables allow general reasoning.', exp: 'Abstract over specific statements.' }
  ],
  negation: [
    { text: 'p = "It is raining". ¬p = "It is NOT raining".', exp: 'Flips truth value.' },
    { text: 'If p is true, ¬p is false.', exp: 'Negation inverts.' },
    { text: '¬(p ∧ q) ≡ ¬p ∨ ¬q (De Morgan).', exp: 'Negation distributes.' },
    { text: '¬(¬p) ≡ p (double negation).', exp: 'Two negatives cancel.' },
    { text: 'In code: !(isRaining) means not raining.', exp: 'Practical use.' },
    { text: 'Truth table: p=T → ¬p=F; p=F → ¬p=T.', exp: 'Definition.' },
    { text: '¬(p ∨ q) ≡ ¬p ∧ ¬q (second De Morgan).', exp: 'Negation of OR.' },
    { text: 'Swadeep is not present → ¬p.', exp: 'Real example.' },
    { text: 'Tuhina does not like coffee → ¬q.', exp: 'Negation of atomic.' },
    { text: 'The negation of "All students passed" is "Some student failed".', exp: 'Quantifier negation.' }
  ],
  conjunction: [
    { text: 'p = "It rains", q = "Cold". p ∧ q = "Rains AND cold".', exp: 'True only if both true.' },
    { text: 'Truth table: T∧T=T, T∧F=F, F∧T=F, F∧F=F.', exp: 'Definition.' },
    { text: '"Swadeep studies AND practices" → success only if both.', exp: 'Real condition.' },
    { text: 'In circuits: AND gate output 1 only if both inputs 1.', exp: 'Digital logic.' },
    { text: 'p ∧ q ≡ q ∧ p (commutative).', exp: 'Order doesn’t matter.' },
    { text: '(p ∧ q) ∧ r ≡ p ∧ (q ∧ r) (associative).', exp: 'Grouping irrelevant.' },
    { text: 'If p=F, then p ∧ q = F regardless of q.', exp: 'Domination by false.' },
    { text: '"Tuhina is smart AND hardworking" – both needed.', exp: 'Conjunction in natural language.' },
    { text: 'In programming: if (isRaining && isCold) { wearJacket(); }', exp: 'Logical AND.' },
    { text: 'p ∧ T ≡ p (identity law).', exp: 'True is neutral for AND.' }
  ],
  disjunction: [
    { text: 'p = "Tea", q = "Coffee". p ∨ q = "Tea OR coffee".', exp: 'True if at least one true.' },
    { text: 'Inclusive OR: T∨T=T, T∨F=T, F∨T=T, F∨F=F.', exp: 'Truth table.' },
    { text: 'Exclusive OR (XOR) would be false when both true.', exp: 'Different operator.' },
    { text: '"Swadeep will go to Barrackpore OR Naihati" – at least one.', exp: 'Real example.' },
    { text: 'p ∨ T ≡ T (domination).', exp: 'True dominates OR.' },
    { text: 'p ∨ F ≡ p (identity).', exp: 'False neutral.' },
    { text: 'p ∨ q ≡ q ∨ p (commutative).', exp: 'Order irrelevant.' },
    { text: 'In programming: if (isWeekend || isHoliday) { rest(); }', exp: 'OR condition.' },
    { text: '¬(p ∨ q) ≡ ¬p ∧ ¬q (De Morgan).', exp: 'Negation of OR.' },
    { text: 'Disjunction is used in resolution rule.', exp: '(p∨q) and (¬p∨r) → (q∨r).' }
  ],
  implication: [
    { text: 'p = "Rain", q = "Wet". p⇒q = "If rain then wet".', exp: 'False only if rain true and wet false.' },
    { text: 'Truth table: T⇒T=T, T⇒F=F, F⇒T=T, F⇒F=T.', exp: 'Definition.' },
    { text: '"If Swadeep studies then he passes." False if studies but fails.', exp: 'Real example.' },
    { text: 'p⇒q ≡ ¬p ∨ q (implication law).', exp: 'Rewrite as disjunction.' },
    { text: 'Contrapositive: p⇒q ≡ ¬q⇒¬p.', exp: 'Equivalent form.' },
    { text: 'Converse (q⇒p) is not equivalent.', exp: 'Common mistake.' },
    { text: 'If antecedent false, implication true (vacuous truth).', exp: '"If snow in summer, then pigs fly" true.' },
    { text: 'In proofs, to prove p⇒q, assume p and derive q.', exp: 'Direct proof.' },
    { text: 'In programming: if (condition) { action; }', exp: 'Implication in code.' },
    { text: 'p⇒q does not mean causality, only logical dependence.', exp: 'Important nuance.' }
  ],
  biconditional: [
    { text: 'p⇔q = "p if and only if q".', exp: 'True when p and q same truth value.' },
    { text: 'Truth table: T⇔T=T, T⇔F=F, F⇔T=F, F⇔F=T.', exp: 'Definition.' },
    { text: '"You can enter iff you have a ticket."', exp: 'Ticket ↔ entry.' },
    { text: 'p⇔q ≡ (p⇒q) ∧ (q⇒p).', exp: 'Two implications.' },
    { text: 'Also equivalent to (p∧q) ∨ (¬p∧¬q).', exp: 'Both true or both false.' },
    { text: 'In mathematics: "x is even iff x mod 2 = 0".', exp: 'Definition.' },
    { text: 'p⇔q is a tautology if p and q are logically equivalent.', exp: 'e.g., p⇒q ⇔ ¬p∨q.' },
    { text: 'Negation: ¬(p⇔q) ≡ p⇔¬q.', exp: 'Flip one side.' },
    { text: 'In digital logic: XNOR gate.', exp: 'Output 1 when inputs equal.' },
    { text: '"Swadeep passes iff he studies" – both ways.', exp: 'Biconditional condition.' }
  ],
  "truth-table": [
    { text: 'Truth table for p∧q: 4 rows.', exp: 'Shows all combos.' },
    { text: 'p q | p∧q\nT T | T\nT F | F\nF T | F\nF F | F', exp: 'Standard format.' },
    { text: 'Used to define logical operators.', exp: 'AND, OR, etc.' },
    { text: 'To check equivalence, compare columns.', exp: 'p⇒q vs ¬p∨q.' },
    { text: 'Number of rows = 2ⁿ.', exp: 'n = number of variables.' },
    { text: 'Each row = one truth assignment.', exp: 'Systematic enumeration.' },
    { text: 'Truth table for p⇒q: T,T=T; T,F=F; F,T=T; F,F=T.', exp: 'Implication definition.' },
    { text: 'For 3 variables (p,q,r): 8 rows.', exp: 'Binary counting.' },
    { text: 'Truth tables can prove tautologies.', exp: 'All rows T.' },
    { text: 'Truth tables can show contradictions.', exp: 'All rows F.' }
  ],
  rows: [
    { text: 'For 1 variable: 2¹ = 2 rows (p=T, p=F).', exp: 'Simple.' },
    { text: 'For 2 variables: 2² = 4 rows.', exp: 'p,q combos.' },
    { text: 'For 3 variables: 2³ = 8 rows.', exp: 'p,q,r.' },
    { text: 'Order of rows: 00,01,10,11 in binary.', exp: 'Standard.' },
    { text: 'Each row is a distinct truth assignment.', exp: 'Mapping variables.' },
    { text: 'Rows are exhaustive – all possibilities covered.', exp: 'No missing case.' },
    { text: 'In circuit design, rows correspond to input combinations.', exp: 'Testing.' },
    { text: 'For n=4, 16 rows – still manageable.', exp: 'But grows fast.' },
    { text: 'Rows help in building DNF/CNF.', exp: 'Each row gives a minterm/maxterm.' },
    { text: 'Row count = number of assignments.', exp: 'Key concept.' }
  ],
  evaluation: [
    { text: 'Given p=T, q=F, evaluate p∧q → F.', exp: 'Step by step.' },
    { text: 'Evaluate ¬(p∨q) when p=T, q=F: p∨q=T, then ¬T=F.', exp: 'Nested operators.' },
    { text: 'p⇒q with p=F, q=F: implication T.', exp: 'Vacuous true.' },
    { text: 'Evaluate (p∧¬q) ∨ (¬p∧q) for p=T,q=F: (T∧T) ∨ (F∧F) = T ∨ F = T.', exp: 'XOR evaluation.' },
    { text: 'Always work innermost parentheses first.', exp: 'Order of operations.' },
    { text: 'Use truth assignment to replace variables.', exp: 'Then simplify.' },
    { text: 'Evaluation is mechanical – follows truth tables.', exp: 'No interpretation needed.' },
    { text: 'In programming, evaluation of boolean expressions.', exp: 'Short-circuit evaluation.' },
    { text: 'Evaluation determines overall truth value.', exp: 'For given assignment.' },
    { text: 'Helps test if formula is satisfiable.', exp: 'Find assignment making true.' }
  ],
  "logical-equivalence": [
    { text: 'p⇒q ≡ ¬p∨q (implication law).', exp: 'Same truth table.' },
    { text: '¬(p∧q) ≡ ¬p∨¬q (De Morgan).', exp: 'Equivalent.' },
    { text: 'p∧q ≡ q∧p (commutative).', exp: 'Equivalent.' },
    { text: 'p∨(q∧r) ≡ (p∨q)∧(p∨r) (distributive).', exp: 'Equivalent.' },
    { text: 'p⇒q ≡ ¬q⇒¬p (contrapositive).', exp: 'Equivalent.' },
    { text: 'p⇔q ≡ (p⇒q)∧(q⇒p).', exp: 'Equivalent.' },
    { text: 'p∧(p∨q) ≡ p (absorption).', exp: 'Equivalent.' },
    { text: '¬¬p ≡ p (double negation).', exp: 'Equivalent.' },
    { text: 'p∨F ≡ p (identity).', exp: 'Equivalent.' },
    { text: 'Use equivalence to simplify expressions.', exp: 'Replace complex with simple.' }
  ],
  tautology: [
    { text: 'p ∨ ¬p (law of excluded middle).', exp: 'Always true.' },
    { text: '(p∧q) ⇒ p', exp: 'If both true then p true – tautology.' },
    { text: 'p ⇒ (p∨q)', exp: 'If p true then p or q true.' },
    { text: '(p⇒q) ∨ (q⇒p)', exp: 'At least one implication holds.' },
    { text: '¬(p∧¬p)', exp: 'Cannot have p and not p.' },
    { text: '(p∧q) ⇒ (p∨q)', exp: 'Both true implies at least one true.' },
    { text: '(p⇒q) ⇔ (¬p∨q)', exp: 'Definitional tautology.' },
    { text: 'p ⇔ p', exp: 'Identity.' },
    { text: '(p∧T) ⇔ p', exp: 'True neutral.' },
    { text: '(p∨F) ⇔ p', exp: 'False neutral.' }
  ],
  contradiction: [
    { text: 'p ∧ ¬p', exp: 'Always false.' },
    { text: '(p∨q) ∧ (¬p∧¬q)', exp: 'Requires p or q true and both false – impossible.' },
    { text: '(p⇒q) ∧ (p∧¬q)', exp: 'p implies q but p true and q false.' },
    { text: '(p⇔q) ∧ (p⇔¬q)', exp: 'p equivalent to q and to not q – impossible.' },
    { text: '(p∧¬p) ∨ (q∧¬q)', exp: 'Disjunction of contradictions.' },
    { text: 'T ∧ F', exp: 'True and false.' },
    { text: 'p ∧ ¬p ∧ q', exp: 'Already contains p∧¬p.' },
    { text: '(p ∨ q) ∧ (¬p ∧ ¬q)', exp: 'Same as example 2.' },
    { text: '(p ⇒ q) ∧ (p ∧ ¬q)', exp: 'Violates implication.' },
    { text: '(p ⇔ q) ∧ ¬(p ⇔ q)', exp: 'Statement and its negation.' }
  ],
  contingency: [
    { text: 'p ∧ q (true only when both true, else false).', exp: 'Contingent.' },
    { text: 'p ∨ q (true if at least one true).', exp: 'Sometimes true, sometimes false.' },
    { text: 'p ⇒ q (depends on p,q).', exp: 'Not always true/false.' },
    { text: 'p (single variable) – contingent.', exp: 'Can be T or F.' },
    { text: '¬p – also contingent.', exp: 'Depends on p.' },
    { text: 'p ⇔ q – contingent unless p and q equivalent.', exp: 'Usually contingent.' },
    { text: '(p∧¬q) ∨ (¬p∧q) – XOR – contingent.', exp: 'True when different.' },
    { text: 'Most statements in everyday life are contingencies.', exp: 'Not always true/false.' },
    { text: 'A contingency has at least one T and one F in truth table.', exp: 'Definition.' },
    { text: 'Satisfiable but not valid.', exp: 'Contingency is satisfiable.' }
  ],
  converse: [
    { text: 'Original: If rain (p) then wet (q). Converse: If wet then rain.', exp: 'Not equivalent.' },
    { text: 'Original: If Swadeep studies then passes. Converse: If passes then studied.', exp: 'False if passed without studying.' },
    { text: 'Original: If even then divisible by 2. Converse: If divisible by 2 then even – true.', exp: 'Sometimes converse true.' },
    { text: 'Original: If square then rectangle. Converse: If rectangle then square – false.', exp: 'Counterexample: non-square rectangle.' },
    { text: 'Converse of p⇒q is q⇒p.', exp: 'Swap.' },
    { text: 'A statement and its converse are independent.', exp: 'Both can be true, both false, or one true.' },
    { text: 'In proofs, proving converse is separate task.', exp: 'Need both directions for equivalence.' },
    { text: 'Converse of contrapositive is inverse.', exp: 'Relations.' },
    { text: 'If original true, converse may be false.', exp: 'Common fallacy: affirming consequent.' },
    { text: 'Example: "If Tuhina is in Barrackpore, she is in WB." Converse: If in WB then in Barrackpore – false.', exp: 'She could be in Kolkata.' }
  ],
  inverse: [
    { text: 'Original: If rain then wet. Inverse: If no rain then not wet.', exp: 'Not equivalent.' },
    { text: 'Inverse of p⇒q is ¬p⇒¬q.', exp: 'Negate both.' },
    { text: 'Inverse is logically equivalent to converse? No, but contrapositive of converse.', exp: 'Relation.' },
    { text: 'If original true, inverse may be false.', exp: 'Example: no rain but wet due to sprinkler.' },
    { text: 'Inverse of contrapositive is converse.', exp: 'Check: contrapositive ¬q⇒¬p, inverse of that is ¬¬p⇒¬¬q = p⇒q.' },
    { text: 'Inverse is not useful for proof generally.', exp: 'Contrapositive is the useful one.' },
    { text: 'Example: "If Swadeep works hard, he succeeds." Inverse: "If not hard, then not succeed" – false (luck?).', exp: 'Counterexample.' },
    { text: 'Truth table: p⇒q and ¬p⇒¬q differ in rows where p=F, q=T.', exp: 'Check.' },
    { text: 'Inverse ≡ converse of contrapositive.', exp: 'Interesting relation.' },
    { text: 'Students often mistakenly think inverse is equivalent.', exp: 'Common confusion.' }
  ],
  contrapositive: [
    { text: 'Original: If rain then wet. Contrapositive: If not wet then no rain.', exp: 'Equivalent.' },
    { text: 'Original: If Swadeep studies then passes. Contrapositive: If fails then did not study.', exp: 'Valid inference.' },
    { text: 'Original: If even then divisible by 2. Contrapositive: If not divisible by 2 then odd.', exp: 'True.' },
    { text: 'Original: Square ⇒ rectangle. Contrapositive: Not rectangle ⇒ not square.', exp: 'True.' },
    { text: 'Contrapositive of p⇒q is ¬q⇒¬p.', exp: 'Negate and swap.' },
    { text: 'Proof technique: prove contrapositive instead of original.', exp: 'Often easier.' },
    { text: 'Example: If n² is even then n is even. Prove contrapositive: If n odd then n² odd.', exp: 'Classic proof.' },
    { text: 'Contrapositive is logically equivalent – same truth table.', exp: 'Always.' },
    { text: 'Converse and inverse are not equivalent, but contrapositive is.', exp: 'Key distinction.' },
    { text: 'In mathematics, we often say "if not Q then not P" to prove "if P then Q".', exp: 'Contrapositive proof.' }
  ],
  "de-morgan": [
    { text: '¬(p∧q) ≡ ¬p ∨ ¬q', exp: 'AND negation becomes OR of negations.' },
    { text: '¬(p∨q) ≡ ¬p ∧ ¬q', exp: 'OR negation becomes AND of negations.' },
    { text: 'Example: "Not (rainy and cold)" = "not rainy or not cold".', exp: 'Everyday use.' },
    { text: 'In programming: !(a && b) == !a || !b', exp: 'Code equivalence.' },
    { text: 'De Morgan allows pushing negation inward.', exp: 'Useful for simplification.' },
    { text: 'Used in circuit design to convert NAND/NOR gates.', exp: 'Practical.' },
    { text: '¬(p∧¬q) ≡ ¬p ∨ q (by De Morgan).', exp: 'Becomes implication p⇒q.' },
    { text: '¬(p∨¬q) ≡ ¬p ∧ q.', exp: 'Another form.' },
    { text: 'De Morgan’s laws are essential for normal forms.', exp: 'CNF/DNF conversion.' },
    { text: 'Memorize: "break the bar, change the sign".', exp: 'Mnemonic.' }
  ],
  absorption: [
    { text: 'p ∧ (p ∨ q) ≡ p', exp: 'AND with OR of itself absorbs q.' },
    { text: 'p ∨ (p ∧ q) ≡ p', exp: 'OR with AND of itself absorbs q.' },
    { text: 'Example: "It is raining AND (raining OR cold)" simplifies to "raining".', exp: 'Redundancy removal.' },
    { text: 'In Boolean algebra: x + xy = x.', exp: 'Similar to ordinary algebra? Actually x+xy = x(1+y)=x.' },
    { text: 'Absorption law reduces expression size.', exp: 'Optimization.' },
    { text: 'Prove using distributive: p∧(p∨q) = (p∧p)∨(p∧q) = p∨(p∧q) = p.', exp: 'Step by step.' },
    { text: 'Second form: p∨(p∧q) = (p∨p)∧(p∨q) = p∧(p∨q) = p.', exp: 'Dual.' },
    { text: 'Used in Karnaugh maps and circuit minimization.', exp: 'Practical.' },
    { text: 'Absorption law is a special case of covering.', exp: 'Term absorbs superset.' },
    { text: 'Example in set theory: A ∩ (A ∪ B) = A.', exp: 'Analogous.' }
  ],
  cnf: [
    { text: '(p ∨ q) ∧ (¬p ∨ q) ∧ (p ∨ ¬q) – CNF.', exp: 'AND of ORs.' },
    { text: 'Each clause is a disjunction of literals.', exp: 'No AND inside clause.' },
    { text: 'CNF is used in resolution theorem proving.', exp: 'Standard input.' },
    { text: 'Convert any formula to CNF using distributive laws.', exp: 'Algorithm.' },
    { text: 'Example: (p∧q) ∨ r becomes (p∨r) ∧ (q∨r).', exp: 'Distribution.' },
    { text: 'CNF is not unique.', exp: 'Multiple forms possible.' },
    { text: 'Satisfiability of CNF is NP-complete (SAT problem).', exp: 'Important complexity.' },
    { text: '3-CNF: each clause has exactly 3 literals.', exp: 'Restricted form.' },
    { text: 'CNF is like product of sums in Boolean algebra.', exp: 'Dual to DNF.' },
    { text: 'Used in automated reasoning and logic programming.', exp: 'Prolog uses Horn clauses (a type of CNF).' }
  ],
  dnf: [
    { text: '(p ∧ q) ∨ (¬p ∧ q) ∨ (p ∧ ¬q) – DNF.', exp: 'OR of ANDs.' },
    { text: 'Each term is a conjunction of literals.', exp: 'No OR inside term.' },
    { text: 'Every truth table can be expressed as DNF (sum of minterms).', exp: 'Canonical.' },
    { text: 'Example: XOR = (p∧¬q) ∨ (¬p∧q).', exp: 'DNF of XOR.' },
    { text: 'DNF is used in circuit design (sum-of-products).', exp: 'PLA implementation.' },
    { text: 'DNF is not unique either.', exp: 'Minimization possible.' },
    { text: 'Convert by distributing OR over AND.', exp: 'Algorithm.' },
    { text: 'DNF is easier to check satisfiability: any true term makes whole true.', exp: 'But harder for tautology.' },
    { text: 'DNF is dual to CNF.', exp: 'Swap ∧ and ∨.' },
    { text: 'Example: (p∧q) ∨ (¬p∧¬q) is DNF for equivalence.', exp: 'p⇔q.' }
  ],
  universal: [
    { text: '∀x (Man(x) → Mortal(x)) – all men are mortal.', exp: 'Universal quantifier.' },
    { text: '∀x (Student(x) → AttendsClass(x)) – all students attend class.', exp: 'If domain all people.' },
    { text: '∀x (Even(x) → DivisibleBy2(x)) – true for all x.', exp: 'True.' },
    { text: '∀x (x > 0) is false if domain includes negative numbers.', exp: 'Counterexample needed.' },
    { text: 'Universal quantification often uses implication.', exp: '∀x (P(x) → Q(x)).' },
    { text: '∀x (P(x) ∧ Q(x)) is stronger – all x satisfy both.', exp: 'Less common.' },
    { text: 'Negation: ¬∀x P(x) ≡ ∃x ¬P(x).', exp: 'De Morgan for quantifiers.' },
    { text: 'In mathematics: ∀ε>0 ∃δ>0 ...', exp: 'Epsilon-delta definition.' },
    { text: 'Universal quantifier distributes over ∧: ∀x (P∧Q) ≡ (∀x P) ∧ (∀x Q).', exp: 'But not over ∨.' },
    { text: 'In programming, universal quantifier corresponds to "for all" loop with condition.', exp: 'Check all elements.' }
  ],
  existential: [
    { text: '∃x (Student(x) ∧ TopScore(x)) – some student has top score.', exp: 'Existential quantifier.' },
    { text: '∃x (Even(x) ∧ Prime(x)) – there exists an even prime (2).', exp: 'True.' },
    { text: '∃x (x > 10) – true if domain includes numbers >10.', exp: 'Exists.' },
    { text: 'Often use conjunction with ∃, not implication.', exp: '∃x (P(x) ∧ Q(x)).' },
    { text: '∃x (P(x) → Q(x)) is weaker – can be true vacuously.', exp: 'Avoid this form.' },
    { text: 'Negation: ¬∃x P(x) ≡ ∀x ¬P(x).', exp: 'No x satisfies P.' },
    { text: 'Existential quantifier distributes over ∨: ∃x (P∨Q) ≡ (∃x P) ∨ (∃x Q).', exp: 'But not over ∧.' },
    { text: 'Example: ∃x (x² = 4) – true (x=2 or -2).', exp: 'Witness exists.' },
    { text: 'In database queries: EXISTS subquery.', exp: 'SQL existential.' },
    { text: '∃!x P(x) means exactly one exists – uniqueness quantifier.', exp: 'Not standard but used.' }
  ],
  argument: [
    { text: 'Premises: If it rains, ground wet. It rains. Conclusion: Ground wet.', exp: 'Valid argument (Modus Ponens).' },
    { text: 'Premises: All men are mortal. Socrates is man. Conclusion: Socrates mortal.', exp: 'Classic syllogism.' },
    { text: 'Premises: If Swadeep studies, he passes. He studies. Therefore, he passes.', exp: 'Argument.' },
    { text: 'Premises: It is raining or snowing. Not raining. Conclusion: Snowing.', exp: 'Disjunctive syllogism.' },
    { text: 'Argument can be valid even if premises false.', exp: 'Validity ≠ truth.' },
    { text: 'Structure: premise1, premise2, ..., therefore conclusion.', exp: 'Logical form.' },
    { text: 'Sound argument = valid + true premises.', exp: 'Guarantees true conclusion.' },
    { text: 'Counterexample shows argument invalid.', exp: 'Find assignment with true premises, false conclusion.' },
    { text: 'In philosophy, arguments are central to reasoning.', exp: 'Logic studies arguments.' },
    { text: 'Every proof is an argument.', exp: 'Using inference rules.' }
  ],
  premise: [
    { text: 'In "If it rains, wet. It rains. Therefore wet." – first two statements are premises.', exp: 'Assumed true.' },
    { text: 'Premises provide evidence for conclusion.', exp: 'Foundation.' },
    { text: 'All men are mortal (premise).', exp: 'General statement.' },
    { text: 'Socrates is a man (premise).', exp: 'Specific fact.' },
    { text: 'Premises can be axioms, hypotheses, or facts.', exp: 'Depends on context.' },
    { text: 'In a proof, premises are givens.', exp: 'Starting points.' },
    { text: 'Multiple premises combined with AND implicitly.', exp: 'All must hold.' },
    { text: 'Premise may be false but argument still valid.', exp: 'Validity independent.' },
    { text: 'Identifying premises is first step in analysis.', exp: 'Look for "since", "because".' },
    { text: 'In logical notation, premises before ⊢.', exp: 'p, q ⊢ r.' }
  ],
  conclusion: [
    { text: 'In above argument, "Ground wet" is conclusion.', exp: 'What follows.' },
    { text: 'Conclusion is the statement to be proved.', exp: 'Target.' },
    { text: 'Indicators: "therefore", "thus", "so", "hence".', exp: 'Signal words.' },
    { text: 'Conclusion must follow necessarily from premises in valid argument.', exp: 'Logical consequence.' },
    { text: 'In modus ponens, q is conclusion.', exp: 'p⇒q, p → q.' },
    { text: 'Conclusion may be false even if argument valid if premise false.', exp: 'Validity doesn\'t guarantee truth.' },
    { text: 'In mathematical theorems, conclusion is the statement after "then".', exp: 'If P then Q – Q is conclusion.' },
    { text: 'Drawing conclusions is reasoning.', exp: 'Core skill.' },
    { text: 'Fallacies occur when conclusion doesn\'t follow.', exp: 'Invalid argument.' },
    { text: 'Conclusion of one argument can be premise of another.', exp: 'Chaining.' }
  ],
  "valid-argument": [
    { text: 'Modus Ponens: p⇒q, p ⊢ q – always valid.', exp: 'No counterexample.' },
    { text: 'Modus Tollens: p⇒q, ¬q ⊢ ¬p – valid.', exp: 'If q false, p must be false.' },
    { text: 'Hypothetical syllogism: p⇒q, q⇒r ⊢ p⇒r – valid.', exp: 'Transitivity.' },
    { text: 'Disjunctive syllogism: p∨q, ¬p ⊢ q – valid.', exp: 'One disjunct false forces other.' },
    { text: 'Valid argument: it is impossible for premises true and conclusion false.', exp: 'Definition.' },
    { text: 'Example: All dogs are mammals. Buddy is dog → Buddy mammal. Valid.', exp: 'Even if Buddy doesn’t exist.' },
    { text: 'Invalid: p⇒q, q ⊢ p (affirming consequent).', exp: 'Fallacy.' },
    { text: 'Validity is about form, not content.', exp: 'Abstract pattern.' },
    { text: 'Truth table can check validity.', exp: 'No row with T premises and F conclusion.' },
    { text: 'Valid argument is truth-preserving.', exp: 'If premises true, conclusion true.' }
  ],
  "invalid-argument": [
    { text: 'Fallacy of affirming the consequent: p⇒q, q ⊢ p.', exp: 'Counterexample: p=F, q=T makes premises T, conclusion F.' },
    { text: 'Fallacy of denying the antecedent: p⇒q, ¬p ⊢ ¬q.', exp: 'p=F, q=T gives premises T, conclusion F.' },
    { text: 'p ∨ q, p ⊢ ¬q – invalid.', exp: 'Both could be true.' },
    { text: 'All men are mortal. Socrates is mortal. Therefore Socrates is man – invalid.', exp: 'Could be a cat.' },
    { text: 'Invalid argument has at least one counterexample.', exp: 'Truth assignment with premises true, conclusion false.' },
    { text: 'Circular reasoning: assuming conclusion in premises – invalid.', exp: 'Begging the question.' },
    { text: 'Argument from authority: "Expert says P, therefore P" – invalid generally.', exp: 'Expert may be wrong.' },
    { text: 'Invalid does not mean conclusion false; it means logic flawed.', exp: 'Conclusion could accidentally be true.' },
    { text: 'Detecting invalidity is crucial in critical thinking.', exp: 'Spot fallacies.' },
    { text: 'Truth table shows at least one row with T premises and F conclusion.', exp: 'Method.' }
  ],
  "rules-of-inference": [
    { text: 'Modus Ponens: If P then Q, P, therefore Q.', exp: 'Most common.' },
    { text: 'Modus Tollens: If P then Q, not Q, therefore not P.', exp: 'Useful for disproof.' },
    { text: 'Hypothetical Syllogism: If P then Q, if Q then R, therefore if P then R.', exp: 'Chaining.' },
    { text: 'Disjunctive Syllogism: P or Q, not P, therefore Q.', exp: 'Either-or.' },
    { text: 'Addition: P, therefore P or Q.', exp: 'Weakening.' },
    { text: 'Simplification: P and Q, therefore P.', exp: 'Extracting part.' },
    { text: 'Conjunction: P, Q, therefore P and Q.', exp: 'Combining.' },
    { text: 'Resolution: (P or Q), (not P or R), therefore (Q or R).', exp: 'Used in automated reasoning.' },
    { text: 'Rules of inference are building blocks of proofs.', exp: 'Each step justified by a rule.' },
    { text: 'Proofs are sequences of rule applications.', exp: 'From premises to conclusion.' }
  ],
  "modus-ponens": [
    { text: 'If it rains (R), ground wet (W). R. ∴ W.', exp: 'Valid.' },
    { text: 'If Swadeep studies (S), he passes (P). S. ∴ P.', exp: 'Valid.' },
    { text: 'If number even (E), then divisible by 2 (D). 4 is even. ∴ divisible by 2.', exp: 'Valid.' },
    { text: 'If Tuhina is in Barrackpore (B), then in WB (W). B. ∴ W.', exp: 'Valid.' },
    { text: 'If it snows (S), then cold (C). S. ∴ C.', exp: 'Valid.' },
    { text: 'If Susmita runs (R), she sweats (S). R. ∴ S.', exp: 'Valid.' },
    { text: 'If Abhronila works hard (H), she succeeds (S). H. ∴ S.', exp: 'Valid.' },
    { text: 'If Debangshu eats (E), he is full (F). E. ∴ F.', exp: 'Valid.' },
    { text: 'If 2+2=4 (T), then 4=4 (T). 2+2=4. ∴ 4=4.', exp: 'Trivial.' },
    { text: 'If Naihati is a town (T), it has a station (S). T. ∴ S.', exp: 'Valid.' }
  ],
  "modus-tollens": [
    { text: 'If it rains (R), ground wet (W). Not wet. ∴ No rain.', exp: 'Valid.' },
    { text: 'If Swadeep studies (S), he passes (P). He failed. ∴ Did not study.', exp: 'Valid.' },
    { text: 'If number even (E), then divisible by 2 (D). Not divisible by 2. ∴ Not even.', exp: 'Valid.' },
    { text: 'If Tuhina in Barrackpore (B), then in WB (W). Not in WB. ∴ Not in Barrackpore.', exp: 'Valid.' },
    { text: 'If it snows (S), then cold (C). Not cold. ∴ No snow.', exp: 'Valid.' },
    { text: 'If Susmita runs (R), she sweats (S). Not sweating. ∴ Not running.', exp: 'Valid.' },
    { text: 'If Abhronila works hard (H), she succeeds (S). She failed. ∴ Did not work hard.', exp: 'Valid.' },
    { text: 'If Debangshu eats (E), he is full (F). Not full. ∴ Did not eat.', exp: 'Valid.' },
    { text: 'If 2+2=5 (F), then 1=0 (F). 1≠0. ∴ 2+2≠5.', exp: 'Valid.' },
    { text: 'If Naihati is a city (C), it has population (P). No population. ∴ Not a city.', exp: 'Valid.' }
  ],
  resolution: [
    { text: '(p ∨ q) and (¬p ∨ r) → (q ∨ r)', exp: 'Resolution rule.' },
    { text: 'Example: (Rain ∨ Cold), (¬Rain ∨ Wet) → (Cold ∨ Wet).', exp: 'If rain or cold, and if not rain then wet, then cold or wet.' },
    { text: 'Used in Prolog and automated theorem proving.', exp: 'Refutation completeness.' },
    { text: 'Resolution is a single rule that can replace many.', exp: 'Combines with unification in predicate logic.' },
    { text: 'To prove a statement, negate it and derive empty clause.', exp: 'Resolution refutation.' },
    { text: '(p ∨ q) and (¬p) → q (special case with r=F).', exp: 'Disjunctive syllogism.' },
    { text: '(p) and (¬p ∨ q) → q (special case with q=F? Actually p = p∨F).', exp: 'Modus ponens via resolution.' },
    { text: 'Resolution is sound and complete for propositional logic.', exp: 'If formula unsatisfiable, resolution finds contradiction.' },
    { text: 'Binary resolution: resolve two clauses on a complementary literal.', exp: 'Produces new clause.' },
    { text: 'Used in SAT solvers (conflict-driven clause learning).', exp: 'Modern SAT solvers use resolution variants.' }
  ],
  "logical-expression": [
    { text: '(p ∧ q) ∨ (¬r) – logical expression.', exp: 'Combines variables and connectives.' },
    { text: 'p ⇒ (q ∨ ¬p) – another expression.', exp: 'Implication with OR.' },
    { text: 'Expressions can be evaluated under assignments.', exp: 'Get truth value.' },
    { text: 'Expressions can be simplified using laws.', exp: 'Minimization.' },
    { text: 'Truth table represents expression.', exp: 'Mapping.' },
    { text: 'Expressions are built recursively.', exp: 'From atomic to compound.' },
    { text: 'Parentheses determine precedence.', exp: 'Use to avoid ambiguity.' },
    { text: 'In programming, boolean expressions.', exp: 'if (a && b) ...' },
    { text: 'Logical expression can be a tautology or contradiction.', exp: 'Special cases.' },
    { text: 'Two expressions are equivalent if they have same truth table.', exp: 'Logical equivalence.' }
  ],
  "boolean-algebra": [
    { text: 'Boolean algebra has values {0,1} with AND (·), OR (+), NOT (′).', exp: 'Claude Shannon’s insight.' },
    { text: 'x + 0 = x (identity).', exp: 'OR with 0.' },
    { text: 'x · 1 = x (identity).', exp: 'AND with 1.' },
    { text: 'x + x′ = 1 (complement).', exp: 'Excluded middle.' },
    { text: 'x · x′ = 0 (complement).', exp: 'Contradiction.' },
    { text: 'Boolean algebra laws include commutative, associative, distributive.', exp: 'Similar to ordinary algebra but different.' },
    { text: 'Used in digital circuit design.', exp: 'Logic gates implement Boolean functions.' },
    { text: 'De Morgan’s laws hold in Boolean algebra.', exp: '(x+y)′ = x′·y′.' },
    { text: 'Any Boolean function can be expressed as sum of products (DNF).', exp: 'Canonical form.' },
    { text: 'Boolean algebra is the foundation of computer science.', exp: 'Hardware and software logic.' }
  ],
  "logical-circuit": [
    { text: 'AND gate: output 1 only if both inputs 1.', exp: 'Implements conjunction.' },
    { text: 'OR gate: output 1 if at least one input 1.', exp: 'Implements disjunction.' },
    { text: 'NOT gate (inverter): output opposite of input.', exp: 'Implements negation.' },
    { text: 'NAND = NOT AND – universal gate.', exp: 'Can build any circuit.' },
    { text: 'Half-adder: sum = A⊕B (XOR), carry = A∧B.', exp: 'Addition circuit.' },
    { text: 'Full-adder adds three bits.', exp: 'Uses two half-adders.' },
    { text: 'Multiplexer selects one of many inputs.', exp: 'Uses logic gates.' },
    { text: 'Flip-flops store memory – sequential circuits.', exp: 'Adds state.' },
    { text: 'CPUs are complex logical circuits.', exp: 'Billions of gates.' },
    { text: 'Circuit minimization reduces cost and power.', exp: 'Using Boolean algebra.' }
  ],
  "binary-logic": [
    { text: 'Two values: true/false, 1/0, high/low.', exp: 'Foundation of digital computers.' },
    { text: 'Binary logic is a special case of multi-valued logic.', exp: 'But most common.' },
    { text: 'Bits represent binary logic values.', exp: '0 or 1.' },
    { text: 'Binary logic operations: AND, OR, NOT.', exp: 'Basic gates.' },
    { text: 'Binary logic is used in all digital electronics.', exp: 'Transistors act as switches.' },
    { text: 'Binary logic is equivalent to Boolean algebra.', exp: 'Same system.' },
    { text: 'Binary logic is complete: can represent any computation.', exp: 'Turing completeness.' },
    { text: 'Binary logic has no third truth value (unlike fuzzy logic).', exp: 'Classical.' },
    { text: 'Binary logic is the basis of machine language.', exp: 'Instructions encoded in binary.' },
    { text: 'Binary logic enables error detection (parity bits).', exp: 'Simple checks.' }
  ],
  "truth-assignment": [
    { text: 'For variables {p,q}, assignment p=T, q=F.', exp: 'One specific assignment.' },
    { text: 'Number of possible assignments = 2ⁿ.', exp: 'Exponential.' },
    { text: 'Assignment determines truth value of compound expression.', exp: 'Evaluation.' },
    { text: 'Satisfiable: exists assignment making expression true.', exp: 'SAT problem.' },
    { text: 'Valid (tautology): true for all assignments.', exp: 'No assignment makes false.' },
    { text: 'Contradiction: false for all assignments.', exp: 'No satisfying assignment.' },
    { text: 'Truth assignment is a function from variables to {T,F}.', exp: 'Mapping.' },
    { text: 'In truth tables, each row corresponds to one assignment.', exp: 'Systematic listing.' },
    { text: 'Two expressions equivalent if same value for all assignments.', exp: 'Identical truth tables.' },
    { text: 'Finding an assignment is solving a logical puzzle.', exp: 'Sudoku-like.' }
  ]
};

const getExamplesForTerm = (id) => {
  return examplesDatabase[id] || Array(10).fill().map((_, i) => ({
    text: `Example ${i+1} for ${id}: This term is fundamental in propositional logic.`,
    exp: `Further explanation would be added.`
  }));
};

// ============================================================
// 📚 TERMS DATA (complete list)
// ============================================================
const getTermsData = () => [
  // Basic Terms
  { id: "proposition", term: "Proposition (Statement)", definition: "A declarative sentence that is either true or false, but not both.", note: "Must have definite truth value.", confusion: "Questions/commands are NOT propositions.", tags: ["basic"] },
  { id: "truth-value", term: "Truth Value", definition: "True (T) or False (F) of a proposition.", tags: ["basic"] },
  { id: "atomic-proposition", term: "Atomic Proposition", definition: "A simple proposition that cannot be broken down.", tags: ["basic"] },
  { id: "compound-proposition", term: "Compound Proposition", definition: "Formed by combining atomic propositions with connectives.", tags: ["basic"] },
  { id: "logical-variable", term: "Logical Variable", definition: "Symbol (p, q, r) representing a proposition.", tags: ["basic"] },
  // Logical Connectives
  { id: "negation", term: "Negation (¬p) — NOT", definition: "Flips truth value.", tags: ["connective"] },
  { id: "conjunction", term: "Conjunction (p ∧ q) — AND", definition: "True only if both true.", tags: ["connective"] },
  { id: "disjunction", term: "Disjunction (p ∨ q) — OR", definition: "True if at least one true.", tags: ["connective"] },
  { id: "implication", term: "Implication (p ⇒ q) — IF…THEN", definition: "False only when p true and q false.", related: ["contrapositive", "converse", "inverse"], tags: ["connective"] },
  { id: "biconditional", term: "Biconditional (p ⇔ q) — IFF", definition: "True when p and q have same truth value.", tags: ["connective"] },
  // Truth Table Concepts
  { id: "truth-table", term: "Truth Table", definition: "Table of all possible truth value combinations.", tags: ["truth-table"] },
  { id: "rows", term: "Rows (2ⁿ combinations)", definition: "Each row = one truth assignment.", tags: ["truth-table"] },
  { id: "evaluation", term: "Evaluation of Expressions", definition: "Finding truth value given an assignment.", tags: ["truth-table"] },
  { id: "logical-equivalence", term: "Logical Equivalence", definition: "Same truth values in all rows.", tags: ["truth-table"] },
  // Logical Forms
  { id: "tautology", term: "Tautology (always true)", definition: "True for every assignment.", opposite: "contradiction", tags: ["form"] },
  { id: "contradiction", term: "Contradiction (always false)", definition: "False for every assignment.", opposite: "tautology", tags: ["form"] },
  { id: "contingency", term: "Contingency", definition: "Neither tautology nor contradiction.", tags: ["form"] },
  // Derived Statements
  { id: "converse", term: "Converse (q ⇒ p)", definition: "Swap hypothesis and conclusion.", related: ["implication"], tags: ["derived"] },
  { id: "inverse", term: "Inverse (¬p ⇒ ¬q)", definition: "Negate both.", tags: ["derived"] },
  { id: "contrapositive", term: "Contrapositive (¬q ⇒ ¬p)", definition: "Negate and swap. Equivalent to original.", related: ["implication"], tags: ["derived"] },
  // Laws of Logic
  { id: "de-morgan", term: "De Morgan's Laws", definition: "¬(p∧q) ≡ ¬p∨¬q, ¬(p∨q) ≡ ¬p∧¬q", tags: ["law"] },
  { id: "absorption", term: "Absorption Law", definition: "p ∧ (p ∨ q) ≡ p, p ∨ (p ∧ q) ≡ p", tags: ["law"] },
  // Normal Forms
  { id: "cnf", term: "Conjunctive Normal Form (CNF)", definition: "Conjunction of clauses (ORs).", tags: ["normal-form"] },
  { id: "dnf", term: "Disjunctive Normal Form (DNF)", definition: "Disjunction of terms (ANDs).", tags: ["normal-form"] },
  // Quantifiers
  { id: "universal", term: "Universal Quantifier (∀)", definition: "'For all' – holds for every element.", tags: ["quantifier"] },
  { id: "existential", term: "Existential Quantifier (∃)", definition: "'There exists' – at least one element makes true.", tags: ["quantifier"] },
  // Reasoning & Argument
  { id: "argument", term: "Argument", definition: "Sequence of premises leading to conclusion.", tags: ["reasoning"] },
  { id: "premise", term: "Premise", definition: "Statement assumed true in argument.", tags: ["reasoning"] },
  { id: "conclusion", term: "Conclusion", definition: "Statement that follows from premises.", tags: ["reasoning"] },
  { id: "valid-argument", term: "Valid Argument", definition: "If premises true, conclusion must be true.", tags: ["reasoning"] },
  { id: "invalid-argument", term: "Invalid Argument", definition: "Possible for premises true and conclusion false.", tags: ["reasoning"] },
  { id: "rules-of-inference", term: "Rules of Inference", definition: "Valid argument forms used in proofs.", tags: ["reasoning"] },
  // Rules of Inference (specific)
  { id: "modus-ponens", term: "Modus Ponens", definition: "p ⇒ q, p ⊢ q", tags: ["inference"] },
  { id: "modus-tollens", term: "Modus Tollens", definition: "p ⇒ q, ¬q ⊢ ¬p", tags: ["inference"] },
  { id: "resolution", term: "Resolution", definition: "(p ∨ q), (¬p ∨ r) ⊢ (q ∨ r)", tags: ["inference"] },
  // Other Important Terms
  { id: "logical-expression", term: "Logical Expression", definition: "Combination of variables and connectives.", tags: ["other"] },
  { id: "boolean-algebra", term: "Boolean Algebra", definition: "Algebra over {0,1} with AND, OR, NOT.", tags: ["other"] },
  { id: "logical-circuit", term: "Logical Circuit", definition: "Physical implementation using gates.", tags: ["other"] },
  { id: "binary-logic", term: "Binary Logic", definition: "Two-valued logic (T/F).", tags: ["other"] },
  { id: "truth-assignment", term: "Truth Assignment", definition: "Mapping variables to T/F.", tags: ["other"] },
];

// Colorful example backgrounds
const exampleBgColors = [
  'bg-blue-50 dark:bg-blue-900/20 border-l-blue-500',
  'bg-green-50 dark:bg-green-900/20 border-l-green-500',
  'bg-yellow-50 dark:bg-yellow-900/20 border-l-yellow-500',
  'bg-purple-50 dark:bg-purple-900/20 border-l-purple-500',
  'bg-pink-50 dark:bg-pink-900/20 border-l-pink-500',
  'bg-indigo-50 dark:bg-indigo-900/20 border-l-indigo-500',
  'bg-red-50 dark:bg-red-900/20 border-l-red-500',
  'bg-teal-50 dark:bg-teal-900/20 border-l-teal-500',
  'bg-orange-50 dark:bg-orange-900/20 border-l-orange-500',
  'bg-cyan-50 dark:bg-cyan-900/20 border-l-cyan-500',
];

const exampleIcons = ['📘', '💡', '🔍', '🎯', '✨', '📌', '⚡', '💎', '🔑', '🧠'];

// ============================================================
// 🧠 MAIN COMPONENT
// ============================================================
const Topic30 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTerm, setExpandedTerm] = useState(null);
  const termRefs = useRef({});

  const termsData = useMemo(() => getTermsData(), []);
  
  const termsWithExamples = useMemo(() => {
    return termsData.map(term => ({
      ...term,
      examples: getExamplesForTerm(term.id)
    }));
  }, [termsData]);

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return termsWithExamples;
    const q = searchQuery.toLowerCase();
    return termsWithExamples.filter(t =>
      t.term.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.includes(q))
    );
  }, [searchQuery, termsWithExamples]);

  const scrollToTerm = (id) => {
    if (termRefs.current[id]) {
      termRefs.current[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setSearchQuery('');
      setTimeout(() => {
        termRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };

  const toggleExamples = (id) => {
    setExpandedTerm(expandedTerm === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Propositional Logic Dictionary
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            Interactive playground + 10 examples per term • Search • Related links • Opposites
          </p>
        </header>

        {/* Quick Memory Trick */}
        <div className="mb-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 animate-[fadeSlideUp_0.6s_ease-out]">
          <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">💡 Quick Memory Trick (Exam Ready)</h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            <strong>5 Layers:</strong> Statements → Connectives → Truth Tables → Laws → Reasoning
          </p>
        </div>

        {/* ⚡ INTERACTIVE PLAYGROUND (inserted here) */}
        <LogicPlayground />

        {/* 🔍 Search Bar */}
        <div className="sticky top-4 z-10 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search term (e.g., tautology, modus ponens, De Morgan...)"
              className="w-full p-4 pl-12 rounded-xl bg-transparent border-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 text-gray-400 hover:text-gray-600">✕</button>
            )}
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-500">{filteredTerms.length} term(s) found</div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
          {filteredTerms.map((term, idx) => (
            <div
              key={term.id}
              ref={(el) => (termRefs.current[term.id] = el)}
              className={clsx(
                "group p-5 rounded-xl bg-white dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700",
                "shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01]",
                "animate-[fadeSlideUp_0.5s_ease-out_forwards] opacity-0"
              )}
              style={{ animationDelay: `${Math.min(idx * 30, 600)}ms` }}
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">{term.term}</h2>
                {term.opposite && (
                  <button 
                    onClick={() => scrollToTerm(term.opposite)} 
                    className="text-xs text-purple-500 underline hover:text-purple-700"
                  >
                    Opp: {term.opposite}
                  </button>
                )}
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{term.definition}</p>
              
              {term.note && <div className="mt-2 text-sm text-blue-600">💡 {term.note}</div>}
              {term.confusion && <div className="mt-2 text-sm text-amber-600">⚠️ {term.confusion}</div>}
              
              {term.related && term.related.length > 0 && (
                <div className="mt-3 text-sm">
                  <span className="font-semibold">🔗 Related:</span>{" "}
                  {term.related.map(rel => (
                    <button key={rel} onClick={() => scrollToTerm(rel)} className="text-blue-600 underline mr-2">
                      {rel}
                    </button>
                  ))}
                </div>
              )}

              {/* Examples section */}
              <div className="mt-4">
                <button
                  onClick={() => toggleExamples(term.id)}
                  className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline focus:outline-none flex items-center gap-1"
                >
                  {expandedTerm === term.id ? '▼' : '▶'} {expandedTerm === term.id ? 'Hide 10 examples' : 'Show 10 examples'}
                </button>
                {expandedTerm === term.id && (
                  <div className="mt-3 space-y-3 max-h-96 overflow-y-auto p-1">
                    {term.examples.map((ex, i) => {
                      const colorIndex = i % exampleBgColors.length;
                      const icon = exampleIcons[i % exampleIcons.length];
                      return (
                        <div 
                          key={i} 
                          className={clsx(
                            "p-3 rounded-lg border-l-4 transition-all hover:shadow-md",
                            exampleBgColors[colorIndex],
                            "bg-opacity-50 dark:bg-opacity-20"
                          )}
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-xl">{icon}</span>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                                {ex.text}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                📖 {ex.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1">
                {term.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700">#{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12 text-gray-500">No terms match "{searchQuery}". Try a different keyword.</div>
        )}

        {/* FAQ and Teacher's Note */}
        <div className="mt-12">
          <FAQTemplate title="Propositional Logic FAQs" questions={questions} />
        </div>
        <div className="mt-8">
          <Teacher note="The interactive playground at the top lets students experiment with truth values in real time. This bridges theory and practice. The 10 colorful examples per term and cross‑linking help resolve confusion instantly. Use this as a living reference during lessons." />
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp.*\\] { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Topic30;