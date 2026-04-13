const questions = [
  {
    question: "What is a proposition in logic?",
    shortAnswer: "A declarative sentence that is either true or false.",
    explanation: "A proposition must have a definite truth value (true or false) and cannot be both. Questions, commands, and exclamations are not propositions.",
    hint: "Check if you can assign a truth value to the sentence.",
    level: "basic",
    codeExample: '"The sky is blue" → proposition; "Close the door" → not a proposition.'
  },
  {
    question: "What is the truth value of a proposition?",
    shortAnswer: "True (T) or False (F).",
    explanation: "In classical binary logic, every proposition is either true or false. No other values exist.",
    hint: "Think of a light switch: on (true) or off (false).",
    level: "basic",
    codeExample: "p = '2+2=4' → true; q = '2+2=5' → false."
  },
  {
    question: "Define logical equivalence with an example.",
    shortAnswer: "Two statements are logically equivalent if they have identical truth tables.",
    explanation: "For example, p → q is equivalent to ¬p ∨ q. You can replace one with the other in any logical expression without changing truth value.",
    hint: "Compare the truth tables column by column.",
    level: "intermediate",
    codeExample: "Truth table for p→q and ¬p∨q shows same T/F pattern."
  },
    {
    question: "What is a tautology? Provide an example.",
    shortAnswer: "A statement that is true for all truth assignments.",
    explanation: "Tautologies are always true regardless of the truth values of their components. Example: p ∨ ¬p (law of excluded middle).",
    hint: "All rows in truth table are true.",
    level: "basic",
    codeExample: "p ∨ ¬p is always true."
  },
  {
    question: "What is a contradiction?",
    shortAnswer: "A statement that is false for all truth assignments.",
    explanation: "Example: p ∧ ¬p. It can never be true. Contradictions are used in proofs by contradiction.",
    hint: "All rows in truth table are false.",
    level: "basic",
    codeExample: "p ∧ ¬p is always false."
  },
  {
    question: "What is the converse of an implication? Is it equivalent to the original?",
    shortAnswer: "Converse is q ⇒ p. It is not logically equivalent to p ⇒ q.",
    explanation: "For p⇒q, converse swaps hypothesis and conclusion. They are different; truth table differs.",
    hint: "Only the contrapositive is equivalent to the original.",
    level: "intermediate",
    codeExample: "Original: 'If it rains, ground wet.' Converse: 'If ground wet, it rained.' Not same."
  },
  {
    question: "What is the contrapositive and why is it important?",
    shortAnswer: "Contrapositive is ¬q ⇒ ¬p. It is logically equivalent to p ⇒ q.",
    explanation: "Proving the contrapositive is often easier than proving the original implication. Used heavily in mathematical proofs.",
    hint: "Negate both and swap.",
    level: "intermediate",
    codeExample: "Original: If a number is even, then its square is even. Contrapositive: If square is odd, number is odd."
  },
  {
    question: "State De Morgan's laws for logic.",
    shortAnswer: "¬(p ∧ q) ≡ ¬p ∨ ¬q and ¬(p ∨ q) ≡ ¬p ∧ ¬q.",
    explanation: "De Morgan's laws show how negation distributes over conjunction and disjunction, flipping the operator.",
    hint: "Break the bar and change the sign.",
    level: "intermediate",
    codeExample: "In programming: !(a && b) === !a || !b"
  },
  {
    question: "What is a truth table? How many rows for n variables?",
    shortAnswer: "A table listing all possible truth value combinations. Rows = 2ⁿ.",
    explanation: "Each row corresponds to one assignment of truth values to the variables. Used to define or verify logical expressions.",
    hint: "For 2 variables: 4 rows; for 3: 8 rows.",
    level: "basic",
    codeExample: "p q | p∧q\nT T | T\nT F | F\nF T | F\nF F | F"
  },
  {
    question: "What is the difference between inclusive OR and exclusive OR (XOR)?",
    shortAnswer: "Inclusive OR (p ∨ q) is true when at least one is true; XOR is true when exactly one is true.",
    explanation: "Inclusive OR allows both to be true; XOR excludes the case where both are true.",
    hint: "Inclusive OR: 'or both'; XOR: 'one or the other but not both'.",
    level: "intermediate",
    codeExample: "p XOR q ≡ (p ∨ q) ∧ ¬(p ∧ q)"
  },
  {
    question: "What is a valid argument?",
    shortAnswer: "An argument where if all premises are true, the conclusion must be true.",
    explanation: "Validity is about logical form, not actual truth of premises. A valid argument can have false premises but still be valid.",
    hint: "No counterexample exists where premises true and conclusion false.",
    level: "intermediate",
    codeExample: "Modus Ponens: p→q, p ⊢ q is always valid."
  },
  {
    question: "What is the rule of Modus Ponens?",
    shortAnswer: "If p ⇒ q and p are true, then q must be true.",
    explanation: "Modus Ponens (affirming the antecedent) is the most common rule of inference in everyday reasoning.",
    hint: "If p implies q and p holds, then q follows.",
    level: "basic",
    codeExample: "Premises: If it rains, ground wet. It rains. Conclusion: Ground wet."
  },
  {
    question: "What is Modus Tollens?",
    shortAnswer: "If p ⇒ q and ¬q are true, then ¬p must be true.",
    explanation: "Modus Tollens (denying the consequent) is used to disprove a hypothesis by showing its consequence is false.",
    hint: "If p implies q but q is false, then p cannot be true.",
    level: "intermediate",
    codeExample: "If Swadeep is late, he misses the bus. Swadeep did not miss the bus → Swadeep was not late."
  },
  {
    question: "What is Hypothetical Syllogism?",
    shortAnswer: "If p ⇒ q and q ⇒ r, then p ⇒ r.",
    explanation: "It chains implications together. Transitivity of implication.",
    hint: "If A implies B and B implies C, then A implies C.",
    level: "intermediate",
    codeExample: "If it rains → ground wet. If ground wet → slippery. Therefore, if rain → slippery."
  },
  {
    question: "What is Disjunctive Syllogism?",
    shortAnswer: "If p ∨ q and ¬p are true, then q must be true.",
    explanation: "Given an OR and the negation of one disjunct, the other disjunct must hold.",
    hint: "Either p or q; not p; so q.",
    level: "intermediate",
    codeExample: "Tea or coffee is served. Tea is not served → coffee is served."
  },
  {
    question: "Explain the rule of Addition.",
    shortAnswer: "If p is true, then p ∨ q is true for any q.",
    explanation: "You can always add an arbitrary disjunct to a true statement.",
    hint: "If something is true, then 'it or anything else' is also true.",
    level: "basic",
    codeExample: "From 'It is raining' we can infer 'It is raining OR snowing'."
  },
  {
    question: "What is Simplification in inference rules?",
    shortAnswer: "If p ∧ q is true, then p is true (and q is true).",
    explanation: "From a conjunction, you can derive either conjunct.",
    hint: "If both are true, each individually is true.",
    level: "basic",
    codeExample: "From 'Swadeep is smart and hardworking', infer 'Swadeep is smart'."
  },
  {
    question: "What is Resolution? Where is it used?",
    shortAnswer: "From (p ∨ q) and (¬p ∨ r) infer (q ∨ r).",
    explanation: "Resolution is a powerful rule used in automated theorem proving and logic programming (e.g., Prolog).",
    hint: "Combine two clauses that have complementary literals.",
    level: "advanced",
    codeExample: "(p ∨ q) and (¬p ∨ r) → (q ∨ r)"
  },
  {
    question: "What is the difference between CNF and DNF?",
    shortAnswer: "CNF is AND of ORs; DNF is OR of ANDs.",
    explanation: "CNF: clauses connected by AND, each clause OR of literals. DNF: terms connected by OR, each term AND of literals.",
    hint: "CNF looks like (A∨B)∧(C∨D); DNF looks like (A∧B)∨(C∧D).",
    level: "advanced",
    codeExample: "CNF: (p ∨ ¬q) ∧ (¬p ∨ q); DNF: (p ∧ q) ∨ (¬p ∧ ¬q)"
  },
  {
    question: "Explain universal quantifier with an example.",
    shortAnswer: "∀x P(x) means 'for all x, P(x) is true'.",
    explanation: "The statement must hold for every element in the domain. If any counterexample exists, ∀ statement is false.",
    hint: "Think of 'every', 'all', 'each'.",
    level: "intermediate",
    codeExample: "∀x (Man(x) → Mortal(x)): All men are mortal."
  },
  {
    question: "Explain existential quantifier with an example.",
    shortAnswer: "∃x P(x) means 'there exists at least one x such that P(x) is true'.",
    explanation: "Only needs one witness in the domain to be true.",
    hint: "Think of 'some', 'there is', 'at least one'.",
    level: "intermediate",
    codeExample: "∃x (Student(x) ∧ TopScore(x)): Some student has a top score."
  },
  {
    question: "What is a logical circuit? Give a basic example.",
    shortAnswer: "Physical implementation of logical operations using gates (AND, OR, NOT).",
    explanation: "Circuits are built from logic gates that perform Boolean functions. Example: half-adder uses XOR and AND gates.",
    hint: "Truth tables directly map to circuit design.",
    level: "advanced",
    codeExample: "Half-adder: Sum = A ⊕ B, Carry = A ∧ B."
  },
  {
    question: "What is Boolean algebra?",
    shortAnswer: "Algebraic structure over {0,1} with operations AND, OR, NOT.",
    explanation: "It is the foundation of digital logic and computer design. Follows laws like commutativity, distributivity, etc.",
    hint: "Similar to regular algebra but with only two values.",
    level: "intermediate",
    codeExample: "0·1 = 0 (AND), 1+0 = 1 (OR), ¬1 = 0 (NOT)."
  },
  {
    question: "What is a contingency?",
    shortAnswer: "A statement that is neither a tautology nor a contradiction.",
    explanation: "It is true for some assignments and false for others. Most everyday statements are contingencies.",
    hint: "Truth table has at least one T and one F.",
    level: "basic",
    codeExample: "p ∧ q is a contingency (true when both true, false otherwise)."
  },
  {
    question: "What is the absorption law?",
    shortAnswer: "p ∧ (p ∨ q) ≡ p and p ∨ (p ∧ q) ≡ p.",
    explanation: "Absorption simplifies expressions by eliminating redundant parts.",
    hint: "The second term is 'absorbed' by the first.",
    level: "advanced",
    codeExample: "x AND (x OR y) simplifies to x."
  },
  {
    question: "What is the difference between valid and sound argument?",
    shortAnswer: "Valid: conclusion follows logically from premises. Sound: valid + all premises true.",
    explanation: "Sound arguments guarantee true conclusion. Valid arguments may have false premises leading to false conclusion.",
    hint: "Sound = valid + true premises.",
    level: "intermediate",
    codeExample: "All men are immortal (false premise), Socrates is man → Socrates is immortal (valid but unsound)."
  },
  {
    question: "What is the law of excluded middle?",
    shortAnswer: "For any proposition p, p ∨ ¬p is always true (tautology).",
    explanation: "Every proposition is either true or false; no third truth value.",
    hint: "No middle ground.",
    level: "basic",
    codeExample: "Either it is raining or it is not raining."
  },
  {
    question: "What is the principle of explosion?",
    shortAnswer: "From a contradiction, any proposition can be derived (ex falso quodlibet).",
    explanation: "If you have p ∧ ¬p, you can prove any q. This is why contradictions are unacceptable in consistent systems.",
    hint: "Once you allow false, anything follows.",
    level: "advanced",
    codeExample: "From p ∧ ¬p, infer q (even if q is 'Moon is made of cheese')."
  },
  {
    question: "What is a literal in logic?",
    shortAnswer: "A propositional variable or its negation.",
    explanation: "Examples: p, ¬q. Literals are the basic building blocks of clauses in normal forms.",
    hint: "No connectives inside a literal.",
    level: "intermediate",
    codeExample: "In (p ∨ ¬q), p and ¬q are literals."
  },
  {
    question: "What is the substitution rule in logic?",
    shortAnswer: "If two statements are logically equivalent, one can be substituted for the other in any context.",
    explanation: "This allows simplification and replacement of sub-expressions without changing overall truth value.",
    hint: "Equivalent expressions are interchangeable.",
    level: "advanced",
    codeExample: "Replace p→q with ¬p∨q anywhere."
  },
  {
    question: "What is the difference between implication and logical implication?",
    shortAnswer: "Implication (⇒) is a logical connective. Logical implication (⊧) is a metalogical relation meaning 'entails'.",
    explanation: "p ⇒ q is a statement within the logic. p ⊧ q means every model of p is a model of q (semantic consequence).",
    hint: "⊧ is about arguments; ⇒ is about compound statements.",
    level: "expert",
    codeExample: "p ∧ (p→q) ⊧ q (logical implication). p ∧ (p→q) ⇒ q is a tautology."
  }
];

export default questions;