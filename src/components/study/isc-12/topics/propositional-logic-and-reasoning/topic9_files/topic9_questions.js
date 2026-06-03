// topic9_files/topic9_questions.js
const questions = [
  {
    question: "What is a logical expression?",
    shortAnswer: "A combination of propositions and logical operators that evaluates to true or false.",
    explanation: "Logical expressions are built from variables (p, q, r) and operators (¬, ∧, ∨, ⇒, ⇔). Their evaluation follows precedence rules similar to arithmetic expressions.",
    hint: "Think of an expression like 3 + 4 * 2 but with true/false values.",
    level: "basic",
    codeExample: "p ∧ q → evaluates to true only if both p and q are true."
  },
  {
    question: "Evaluate: p = true, q = false. Compute p ∧ q",
    shortAnswer: "false",
    explanation: "AND (∧) yields true only when both operands are true. Here p is true but q is false, so the result is false.",
    hint: "Both must be true for AND to be true.",
    level: "basic"
  },
  {
    question: "If p = false, q = true, evaluate p ∨ q",
    shortAnswer: "true",
    explanation: "OR (∨) yields true if at least one operand is true. Here q is true, so the result is true.",
    hint: "OR is like a gate: one true and it opens.",
    level: "basic"
  },
  {
    question: "What is the precedence of NOT relative to AND?",
    shortAnswer: "NOT has higher precedence than AND.",
    explanation: "In logical expressions, NOT (¬) is evaluated before AND (∧) and OR (∨), similar to how unary minus binds tighter than multiplication.",
    hint: "NOT is like the negative sign in -x * y.",
    level: "basic"
  },
  {
    question: "Evaluate ¬(p ∧ q) given p=true, q=true",
    shortAnswer: "false",
    explanation: "First p∧q = true, then NOT true = false.",
    hint: "Do parentheses first, then NOT.",
    level: "basic"
  },
  {
    question: "Given p=false, q=false, r=true. Evaluate (p ∨ q) ∧ r",
    shortAnswer: "false",
    explanation: "p∨q = false ∨ false = false, then false ∧ true = false.",
    hint: "OR first inside parentheses, then AND.",
    level: "intermediate"
  },
  {
    question: "What is the result of (true ⇒ false) ∧ true?",
    shortAnswer: "false",
    explanation: "true ⇒ false evaluates to false. Then false ∧ true = false.",
    hint: "Implication is only false when antecedent true and consequent false.",
    level: "intermediate"
  },
  {
    question: "If p=true, q=false, evaluate ¬p ∨ q",
    shortAnswer: "false",
    explanation: "¬p = false, then false ∨ false = false.",
    hint: "NOT has higher precedence: (¬p) ∨ q.",
    level: "intermediate"
  },
  {
    question: "Construct a truth table for p ∧ ¬q. How many rows?",
    shortAnswer: "4 rows (for p and q combinations).",
    explanation: "With 2 variables, there are 2^2 = 4 possible assignments.",
    hint: "Each variable can be T or F.",
    level: "basic"
  },
  {
    question: "Evaluate (p ∨ q) ⇒ r with p=true, q=false, r=false",
    shortAnswer: "false",
    explanation: "p∨q = true, then true ⇒ false = false.",
    hint: "Implication is false when left is true and right false.",
    level: "intermediate"
  },
  {
    question: "What does the expression (p ∧ q) ∨ (¬p ∧ ¬q) represent?",
    shortAnswer: "Logical equivalence (p ⇔ q).",
    explanation: "It's true when p and q are both true or both false — exactly the biconditional.",
    hint: "Think 'both same'.",
    level: "expert"
  },
  {
    question: "Given p=true, q=false, r=true, evaluate ¬(p ∧ r) ∨ q",
    shortAnswer: "false",
    explanation: "p∧r = true, ¬true = false, false ∨ false = false.",
    hint: "Parentheses first, then NOT, then OR.",
    level: "intermediate"
  },
  {
    question: "What is short-circuit evaluation in programming?",
    shortAnswer: "Evaluation stops as soon as the result is determined.",
    explanation: "In many languages, for A && B, if A is false, B is not evaluated. Similarly for A || B, if A is true, B is skipped.",
    hint: "Saves time and prevents errors like null pointer.",
    level: "intermediate"
  },
  {
    question: "Evaluate: p = false, q = true, r = false. Compute (p ⇒ q) ∧ (q ⇒ r)",
    shortAnswer: "false",
    explanation: "p⇒q = false⇒true = true. q⇒r = true⇒false = false. true∧false = false.",
    hint: "Evaluate each implication separately.",
    level: "intermediate"
  },
  {
    question: "What is the difference between logical AND and bitwise AND?",
    shortAnswer: "Logical AND works on booleans, bitwise AND works on bits of integers.",
    explanation: "In logic, true∧true = true. In bitwise, 5 & 3 = 1 (0101 & 0011 = 0001).",
    hint: "One is for truth values, one for binary numbers.",
    level: "expert"
  },
  {
    question: "Simplify ¬(¬p ∧ ¬q) using De Morgan's law.",
    shortAnswer: "p ∨ q",
    explanation: "De Morgan: ¬(A ∧ B) = ¬A ∨ ¬B. Here A=¬p, B=¬q → ¬(¬p) ∨ ¬(¬q) = p ∨ q.",
    hint: "Double negation cancels.",
    level: "expert"
  },
  {
    question: "If a compound expression is a tautology, what is its evaluation for any input?",
    shortAnswer: "Always true.",
    explanation: "A tautology yields true under all truth assignments, like p ∨ ¬p.",
    hint: "It's logically valid.",
    level: "basic"
  },
  {
    question: "Evaluate (p ∨ q) ∧ (¬p ∨ ¬q) given p=true, q=false",
    shortAnswer: "true",
    explanation: "(true ∨ false)=true, (¬true ∨ ¬false) = (false ∨ true)=true, true∧true=true.",
    hint: "This expression is actually XOR? Check truth table.",
    level: "intermediate"
  },
  {
    question: "What is the result of false ⇒ false?",
    shortAnswer: "true",
    explanation: "Implication is only false when first is true and second false. false⇒anything is true.",
    hint: "Called 'vacuous truth'.",
    level: "basic"
  },
  {
    question: "How does parentheses affect evaluation of ¬p ∧ q vs ¬(p ∧ q)?",
    shortAnswer: "First is (¬p)∧q, second is ¬(p∧q). They are not equivalent.",
    explanation: "Example p=true, q=false: first gives false∧false=false, second gives ¬(false)=true.",
    hint: "NOT binds more tightly, but parentheses change grouping.",
    level: "intermediate"
  },
  {
    question: "Evaluate p ⇔ q given p=true, q=true",
    shortAnswer: "true",
    explanation: "Biconditional is true when both sides have same truth value.",
    hint: "Equivalent to (p⇒q)∧(q⇒p).",
    level: "basic"
  },
  {
    question: "What is the value of (true ∨ false) ∧ (false ∨ true)?",
    shortAnswer: "true",
    explanation: "(true) ∧ (true) = true.",
    hint: "Both ORs yield true.",
    level: "basic"
  },
  {
    question: "Given expression (p ∧ ¬q) ∨ (¬p ∧ q). What does it represent?",
    shortAnswer: "Exclusive OR (XOR).",
    explanation: "True when exactly one of p or q is true.",
    hint: "It's the opposite of biconditional.",
    level: "expert"
  },
  {
    question: "If p=false, q=false, r=false, evaluate (p ∨ q ∨ r) ⇒ (p ∧ q ∧ r)",
    shortAnswer: "true",
    explanation: "Left side false ∨ false ∨ false = false, false ⇒ anything = true.",
    hint: "Implication with false antecedent is always true.",
    level: "intermediate"
  },
  {
    question: "What is the purpose of evaluating logical expressions in database queries?",
    shortAnswer: "To filter rows based on conditions (WHERE clause).",
    explanation: "SQL uses logical expressions like (age>18 AND city='Delhi') to decide which rows to return.",
    hint: "Each row's column values are evaluated.",
    level: "intermediate"
  },
  {
    question: "How many distinct truth assignments for expression with variables p, q, r, s?",
    shortAnswer: "16",
    explanation: "2^4 = 16 possible combinations.",
    hint: "Each variable doubles possibilities.",
    level: "basic"
  },
  {
    question: "What is the evaluation of ¬(p ∨ q) if p=true, q=false?",
    shortAnswer: "false",
    explanation: "p∨q = true, NOT true = false.",
    hint: "De Morgan would give ¬p ∧ ¬q = false ∧ true = false.",
    level: "basic"
  },
  {
    question: "Write the expression for 'Swadeep can go to picnic only if it is not raining and he has finished homework'",
    shortAnswer: "go = ¬raining ∧ homeworkDone",
    explanation: "Both conditions must be true for go to be true.",
    hint: "AND represents simultaneous requirements.",
    level: "intermediate"
  },
  {
    question: "Evaluate: (true ⇒ false) ⇔ (false ⇒ true)",
    shortAnswer: "false",
    explanation: "true⇒false = false, false⇒true = true, false ⇔ true = false.",
    hint: "One side false, other true, biconditional false.",
    level: "intermediate"
  },
  {
    question: "In C/Java, what does the expression (a = 5) || (b = 10) do if a is 0?",
    shortAnswer: "Evaluates both sides if left false? Actually short-circuit: left (a=5) is 5, non-zero true, so right not evaluated.",
    explanation: "Logical OR short-circuits: if left true, right not evaluated.",
    hint: "Be careful with side-effects.",
    level: "expert"
  }
];

export default questions;