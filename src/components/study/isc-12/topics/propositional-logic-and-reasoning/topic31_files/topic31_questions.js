const questions = [
  {
    question: "What is modus ponens in propositional logic?",
    shortAnswer: "If A is true and A → B is true, then B must be true.",
    explanation: "Modus ponens (Latin for 'mode that affirms') is a valid syllogism: from A and (A implies B), infer B. It is the foundation of forward chaining in rule‑based systems.",
    hint: "Think of a light switch: If the switch is ON, the light is ON. The switch is ON → the light is ON.",
    level: "basic",
    codeExample: "if (a && (a => b)) return b;"
  },
  {
    question: "Write the algebraic equivalence of A → B.",
    shortAnswer: "¬A ∨ B",
    explanation: "Implication A → B is logically equivalent to NOT A OR B. This can be proven using truth tables or Boolean algebra.",
    hint: "Remember: An implication is false only when A is true and B is false.",
    level: "basic",
    codeExample: "const implies = (a, b) => !a || b;"
  },
  {
    question: "Prove modus ponens using algebraic laws.",
    shortAnswer: "A ∧ (¬A ∨ B) = (A ∧ ¬A) ∨ (A ∧ B) = 0 ∨ (A ∧ B) = A ∧ B ⇒ B",
    explanation: "Distribute A over the OR, apply complement law (A ∧ ¬A = 0), then simplification (A ∧ B → B).",
    hint: "Start by rewriting implication, then use distributive law.",
    level: "intermediate",
    codeExample: "// Algebraic proof in steps"
  },
  {
    question: "What is the difference between modus ponens and modus tollens?",
    shortAnswer: "Modus ponens: A, A→B ⊢ B. Modus tollens: ¬B, A→B ⊢ ¬A.",
    explanation: "Modus tollens denies the consequent: if A implies B and B is false, then A must be false.",
    hint: "One affirms the antecedent, the other denies the consequent.",
    level: "intermediate",
    codeExample: "// modus tollens: if (!b && (a => b)) => !a"
  },
  {
    question: "Is the following argument valid? 'If it rains, the ground is wet. The ground is wet. Therefore, it rained.'",
    shortAnswer: "No, it commits the fallacy of affirming the consequent.",
    explanation: "A→B and B do not logically imply A. The ground could be wet due to a sprinkler.",
    hint: "Think of other causes for B.",
    level: "intermediate",
    codeExample: "// Invalid: B ∧ (A→B) does not imply A"
  },
  {
    question: "Simplify the Boolean expression: (A → B) ∧ (B → C). What syllogism does it represent?",
    shortAnswer: "It represents hypothetical syllogism: (A→B) ∧ (B→C) → (A→C).",
    explanation: "Using algebraic laws: (¬A ∨ B) ∧ (¬B ∨ C) → (¬A ∨ C). This is a tautology.",
    hint: "Use resolution or distribute.",
    level: "advanced",
    codeExample: "const hypSyllogism = (a,b,c) => (!a || b) && (!b || c) ? (!a || c) : true;"
  },
  {
    question: "Construct a truth table for (A ∧ (A → B)) → B and prove it is a tautology.",
    shortAnswer: "All rows evaluate to true.",
    explanation: "The column for (A ∧ (A→B)) → B has T in every row, confirming validity.",
    hint: "Evaluate for A=F,B=F; A=F,B=T; A=T,B=F; A=T,B=T.",
    level: "basic",
    codeExample: "// Truth table with 4 rows"
  },
  {
    question: "What does the absorption law state in Boolean algebra?",
    shortAnswer: "A ∧ (A ∨ B) = A and A ∨ (A ∧ B) = A.",
    explanation: "Absorption helps simplify expressions where a term contains itself.",
    hint: "It 'absorbs' the extra term.",
    level: "basic",
    codeExample: "const absorption = (a,b) => a && (a || b) === a;"
  },
  {
    question: "Why is (A → B) equivalent to (¬B → ¬A)?",
    shortAnswer: "It is the contrapositive law, logically equivalent.",
    explanation: "Contrapositive: A→B ≡ ¬B→¬A. Both have the same truth table.",
    hint: "Negate both sides and swap.",
    level: "intermediate",
    codeExample: "const contrapositive = (a,b) => (a => b) === (!b => !a);"
  },
  {
    question: "Is (A ∨ B) → C equivalent to (A → C) ∧ (B → C)?",
    shortAnswer: "Yes, by the distributive property of implication over disjunction.",
    explanation: "Prove using truth table or rewrite (A ∨ B)→C = ¬(A∨B) ∨ C = (¬A∧¬B) ∨ C = (¬A∨C) ∧ (¬B∨C) = (A→C) ∧ (B→C).",
    hint: "Use De Morgan and distribution.",
    level: "advanced",
    codeExample: "const equiv = (a,b,c) => ((a||b) => c) === ((a=>c) && (b=>c));"
  },
  {
    question: "Define a syllogism in the context of logical algebra.",
    shortAnswer: "A deductive argument with two premises and a conclusion, expressed using logical connectives.",
    explanation: "Syllogisms can be categorical or propositional. In logical algebra, they are Boolean equations.",
    hint: "Aristotle's classic: All men are mortal; Socrates is a man; therefore Socrates is mortal.",
    level: "basic",
    codeExample: "// Example: (∀x Man(x)→Mortal(x)) ∧ Man(Socrates) → Mortal(Socrates)"
  },
  {
    question: "If A → B is false, what can you conclude about A and B?",
    shortAnswer: "A is true and B is false.",
    explanation: "Implication is false only in the case true → false.",
    hint: "Check the truth table definition.",
    level: "basic",
    codeExample: "if (!(a => b)) { // then a === true && b === false }"
  },
  {
    question: "Prove disjunctive syllogism: (A ∨ B) ∧ ¬A ⊢ B.",
    shortAnswer: "From A∨B and not A, B must hold.",
    explanation: "Algebraic proof: (A∨B) ∧ ¬A = (A∧¬A) ∨ (B∧¬A) = 0 ∨ (B∧¬A) = B∧¬A → B.",
    hint: "Distribute ∧ over ∨.",
    level: "intermediate",
    codeExample: "const disjSyllogism = (a,b) => (a || b) && !a ? b : false;"
  },
  {
    question: "What is the identity law for logical AND?",
    shortAnswer: "A ∧ true = A; A ∧ false = false.",
    explanation: "AND with true leaves the value unchanged; AND with false always yields false.",
    hint: "Like multiplying by 1 or 0.",
    level: "basic",
    codeExample: "const identityAnd = (a) => (a && true) === a;"
  },
  {
    question: "How would you debug a logical error where modus ponens seems to fail in code?",
    shortAnswer: "Check that both premises are actually true at runtime, and that implication is correctly implemented.",
    explanation: "Often the implication operator (->) is not native; ensure you use !a || b. Also watch for short‑circuit evaluation.",
    hint: "Log the values of A and (A→B) before concluding.",
    level: "expert",
    codeExample: "console.log(a, implies(a,b)); if(a && implies(a,b)) console.log('B is', b);"
  },
  {
    question: "Is the following a valid syllogism? (A → B) ∧ (C → D) ∧ (A ∨ C) → (B ∨ D)",
    shortAnswer: "Yes, this is the constructive dilemma.",
    explanation: "If A implies B, C implies D, and we know A or C, then we can conclude B or D.",
    hint: "Reason by cases: if A then B, if C then D.",
    level: "advanced",
    codeExample: "const dilemma = (a,b,c,d) => ((a=>b) && (c=>d) && (a||c)) ? (b||d) : true;"
  },
  {
    question: "Explain the concept of 'vacuous truth' in implication.",
    shortAnswer: "When the antecedent A is false, A → B is considered true regardless of B.",
    explanation: "This aligns with 'if false then anything' – no counterexample exists.",
    hint: "The only way to falsify an implication is true→false.",
    level: "intermediate",
    codeExample: "console.log(false => true); // true"
  },
  {
    question: "What algebraic law simplifies (A ∧ B) ∨ (A ∧ ¬B)?",
    shortAnswer: "A ∧ (B ∨ ¬B) = A ∧ true = A.",
    explanation: "Factor out A, then B ∨ ¬B = 1 (complement law).",
    hint: "Factorisation like in high school algebra.",
    level: "basic",
    codeExample: "const simplify = (a,b) => (a && b) || (a && !b) === a;"
  },
  {
    question: "How does hypothetical syllogism relate to transitivity?",
    shortAnswer: "Hypothetical syllogism (A→B, B→C ⊢ A→C) is exactly the transitive property of implication.",
    explanation: "If A implies B and B implies C, then A implies C. This is used in chaining rules.",
    hint: "Like a chain of inequalities: if A < B and B < C then A < C.",
    level: "intermediate",
    codeExample: "const transitivity = (a,b,c) => (a=>b) && (b=>c) ? (a=>c) : true;"
  },
  {
    question: "What is the consensus theorem in Boolean algebra?",
    shortAnswer: "XY ∨ X'Z ∨ YZ = XY ∨ X'Z.",
    explanation: "The term YZ is redundant (consensus). It removes the need for the third term.",
    hint: "Used to simplify logic circuits.",
    level: "expert",
    codeExample: "// simplification of majority-like expressions"
  },
  {
    question: "If A → B is a tautology, what does that mean?",
    shortAnswer: "A → B is true for all truth assignments, meaning B is true whenever A is true.",
    explanation: "A → B tautology means logically A logically entails B.",
    hint: "No row in truth table makes A true and B false.",
    level: "intermediate",
    codeExample: "// equivalent to A logically implies B"
  },
  {
    question: "Using algebraic laws, prove (A → B) ∧ (A → ¬B) → ¬A.",
    shortAnswer: "(¬A∨B) ∧ (¬A∨¬B) = ¬A ∨ (B∧¬B) = ¬A ∨ false = ¬A.",
    explanation: "Distribution yields ¬A, proving the conclusion ¬A.",
    hint: "Factor out ¬A.",
    level: "advanced",
    codeExample: "const proof = (a,b) => ((!a||b) && (!a||!b)) === !a;"
  },
  {
    question: "What is the difference between logical implication and material conditional?",
    shortAnswer: "In classical logic they are the same: material conditional ≡ implication (→).",
    explanation: "Some philosophical logics distinguish, but in Boolean algebra it's identical.",
    hint: "They have identical truth tables.",
    level: "expert",
    codeExample: "// material conditional is the standard →"
  },
  {
    question: "Show that (A ∨ B) → C is equivalent to (A → C) ∧ (B → C) using a truth table.",
    shortAnswer: "Both expressions yield the same truth values for all A,B,C.",
    explanation: "Prove by exhaustive enumeration (8 rows).",
    hint: "Check rows where A or B true.",
    level: "intermediate",
    codeExample: "// generate truth table programmatically"
  },
  {
    question: "Explain the concept of 'reductio ad absurdum' in logical algebra.",
    shortAnswer: "If assuming A leads to a contradiction (false), then ¬A must be true.",
    explanation: "It is equivalent to (A → false) → ¬A, which is a tautology.",
    hint: "Proof by contradiction.",
    level: "advanced",
    codeExample: "const reductio = (a) => ((a => false) => !a);"
  },
  {
    question: "How would you test the validity of a syllogism using a SAT solver?",
    shortAnswer: "Encode premises and negated conclusion; if unsatisfiable, the syllogism is valid.",
    explanation: "SAT solvers check if there exists an assignment making all premises true and conclusion false.",
    hint: "Validity ≡ no counterexample.",
    level: "expert",
    codeExample: "// use MiniSat or Z3"
  },
  {
    question: "What is the dual of modus ponens?",
    shortAnswer: "There is no direct dual, but in the algebra of logic the dual of implication is 'not‑and' (NAND).",
    explanation: "Duality swaps ∧ with ∨ and true with false, but implication is not self‑dual.",
    hint: "Consider De Morgan dual of (¬A ∨ B) is (¬A ∧ B)?",
    level: "expert",
    codeExample: "// dual of → is ←? (converse implication)"
  },
  {
    question: "If we have A → (B → C), can we deduce (A ∧ B) → C?",
    shortAnswer: "Yes, by the law of exportation: (A → (B → C)) ↔ ((A ∧ B) → C).",
    explanation: "This equivalence is a tautology and used in natural deduction.",
    hint: "Currying in logic.",
    level: "intermediate",
    codeExample: "const exportLaw = (a,b,c) => (a => (b => c)) === ((a && b) => c);"
  },
  {
    question: "Simplify the expression: (A → B) → (¬B → ¬A)",
    shortAnswer: "It is a tautology (always true).",
    explanation: "This is the contrapositive law: A→B logically implies ¬B→¬A.",
    hint: "Write both as ¬A ∨ B and ¬¬B ∨ ¬A = B ∨ ¬A.",
    level: "advanced",
    codeExample: "const contrapositiveTaut = (a,b) => ((!a || b) => (b || !a)); // always true"
  },
  {
    question: "Create a real‑world scenario where disjunctive syllogism is used in fault diagnosis.",
    shortAnswer: "If the error is either network or disk, and it's not network, then it's disk.",
    explanation: "Used in expert systems for root cause analysis.",
    hint: "Think of two possible causes and eliminate one.",
    level: "expert",
    codeExample: "let error = 'network' || 'disk'; if (error !== 'network') console.log('Disk failure');"
  }
];

export default questions;