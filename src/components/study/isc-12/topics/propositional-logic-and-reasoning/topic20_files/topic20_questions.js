// topic20_files/topic20_questions.js
const questions = [
  {
    question: "What logical operator does '&&' represent in most programming languages?",
    shortAnswer: "AND (conjunction)",
    explanation: "The && operator returns true only if both operands are true. It short-circuits: if first operand is false, the second is not evaluated.",
    hint: "Both must be true.",
    level: "basic",
    codeExample: "if (isLoggedIn && isAdmin) { grantAccess(); }"
  },
  {
    question: "What does '||' represent?",
    shortAnswer: "OR (disjunction)",
    explanation: "Returns true if at least one operand is true. Short-circuits: if first is true, second not evaluated.",
    hint: "At least one true.",
    level: "basic"
  },
  {
    question: "What does '!' represent?",
    shortAnswer: "NOT (negation)",
    explanation: "Flips the boolean value: !true becomes false, !false becomes true.",
    hint: "Opposite.",
    level: "basic"
  },
  {
    question: "How do you write logical implication (p ⇒ q) in C/Java/JavaScript?",
    shortAnswer: "!p || q",
    explanation: "Implication is not a direct operator; use the equivalent disjunction form.",
    hint: "Not p or q.",
    level: "intermediate"
  },
  {
    question: "What is short-circuit evaluation?",
    shortAnswer: "Evaluation stops as soon as the result is determined.",
    explanation: "For &&, if left false, right not evaluated. For ||, if left true, right not evaluated. Prevents unnecessary computation and null pointer errors.",
    hint: "Lazy evaluation.",
    level: "intermediate"
  },
  {
    question: "Why is 'if (x = 5)' often a bug?",
    shortAnswer: "= is assignment, not comparison. It assigns 5 to x and the condition is always true (non-zero).",
    explanation: "Use '==' for equality comparison. Many languages warn about this.",
    hint: "Assignment vs equality.",
    level: "basic"
  },
  {
    question: "Simplify: if (!(a && b)) using De Morgan.",
    shortAnswer: "if (!a || !b)",
    explanation: "De Morgan's law: ¬(a∧b) ≡ ¬a ∨ ¬b. Makes condition often more readable.",
    hint: "NOT AND becomes OR NOT.",
    level: "intermediate"
  },
  {
    question: "What is the precedence of && relative to ||?",
    shortAnswer: "&& has higher precedence than ||.",
    explanation: "a || b && c is equivalent to a || (b && c), not (a || b) && c. Use parentheses to be clear.",
    hint: "AND before OR.",
    level: "intermediate"
  },
  {
    question: "How can you flatten nested ifs using logical operators?",
    shortAnswer: "Combine conditions with && (AND) instead of nesting.",
    explanation: "Instead of if (a) { if (b) { ... } } use if (a && b) { ... } (exportation law).",
    hint: "AND both conditions.",
    level: "intermediate"
  },
  {
    question: "What does the condition 'if (user != null && user.isActive)' protect against?",
    shortAnswer: "Null pointer exception.",
    explanation: "Short-circuit ensures user.isActive is only evaluated if user is not null.",
    hint: "Safety check.",
    level: "intermediate"
  },
  {
    question: "Write the condition for 'if age is 18 or older AND has license'.",
    shortAnswer: "if (age >= 18 && hasLicense)",
    explanation: "Both must be true for driving eligibility.",
    hint: "AND.",
    level: "basic"
  },
  {
    question: "What is the result of 'true && false || true'? (Assume precedence)",
    shortAnswer: "true (since && before ||: (true&&false)||true = false||true = true)",
    explanation: "&& higher precedence, so evaluated first.",
    hint: "Parentheses help.",
    level: "intermediate"
  },
  {
    question: "Why should you use parentheses in complex boolean conditions?",
    shortAnswer: "To make precedence explicit and improve readability.",
    explanation: "Even if you know precedence, other readers may not. Parentheses prevent bugs.",
    hint: "Clarity.",
    level: "basic"
  },
  {
    question: "What is the difference between logical AND (&) and bitwise AND (&) in C/Java?",
    shortAnswer: "Logical && works on booleans with short-circuit; bitwise & works on integer bits without short-circuit.",
    explanation: "Using & on booleans still evaluates both sides; && may skip second.",
    hint: "One short-circuits, one doesn't.",
    level: "expert"
  },
  {
    question: "Simplify: if (!isActive || !isVerified)",
    shortAnswer: "Equivalent to if (!(isActive && isVerified)) by De Morgan.",
    explanation: "De Morgan applied in reverse.",
    hint: "NOT AND.",
    level: "intermediate"
  },
  {
    question: "What is a common logical error in while loops?",
    shortAnswer: "Off-by-one due to incorrect condition (e.g., using < instead of <=).",
    explanation: "Loop conditions must correctly reflect the intended number of iterations.",
    hint: "Boundary check.",
    level: "intermediate"
  },
  {
    question: "How does the ternary operator (? :) relate to if-else?",
    shortAnswer: "It's a shorthand for if-else that returns a value.",
    explanation: "condition ? expr1 : expr2 evaluates to expr1 if true, else expr2.",
    hint: "Inline conditional.",
    level: "basic"
  },
  {
    question: "What is the result of 'false && someFunction()'?",
    shortAnswer: "false, and someFunction() is NOT called (short-circuit).",
    explanation: "Since left operand false, && result false regardless of right operand.",
    hint: "Lazy evaluation.",
    level: "intermediate"
  },
  {
    question: "How do you test if a number is between 1 and 10 inclusive?",
    shortAnswer: "if (x >= 1 && x <= 10)",
    explanation: "Both conditions must be true.",
    hint: "AND.",
    level: "basic"
  },
  {
    question: "What does 'if (flag == true)' simplify to?",
    shortAnswer: "if (flag)",
    explanation: "Comparing a boolean to true is redundant.",
    hint: "Just use the boolean variable.",
    level: "basic"
  },
  {
    question: "Why is 'if (flag == false)' better written as 'if (!flag)'?",
    shortAnswer: "Shorter and more idiomatic.",
    explanation: "Direct negation is clearer.",
    hint: "Use NOT.",
    level: "basic"
  },
  {
    question: "What is the difference between 'else if' and multiple separate 'if' statements?",
    shortAnswer: "else if chains are mutually exclusive; separate ifs may execute multiple blocks.",
    explanation: "Once an else if condition is true, rest are skipped. Separate ifs evaluate all conditions independently.",
    hint: "Exclusivity.",
    level: "intermediate"
  },
  {
    question: "How can you refactor 'if (a) { if (b) { X } else { Y } } else { Z }' using logical operators?",
    shortAnswer: "It's already nested; to flatten, use conditions: if (a && b) { X } else if (a && !b) { Y } else { Z }.",
    explanation: "But sometimes nesting is clearer. Use judgment.",
    hint: "Case analysis.",
    level: "expert"
  },
  {
    question: "What is a truthy/falsy value in JavaScript?",
    shortAnswer: "Values that coerce to true/false in boolean contexts.",
    explanation: "Falsy: false, 0, '', null, undefined, NaN. Everything else is truthy.",
    hint: "Implicit conversion.",
    level: "intermediate"
  },
  {
    question: "How does Python represent logical operators?",
    shortAnswer: "and, or, not (words, not symbols).",
    explanation: "Python uses 'and', 'or', 'not' instead of &&, ||, !.",
    hint: "English words.",
    level: "basic"
  },
  {
    question: "What is short-circuit assignment (e.g., x = x || defaultValue)?",
    shortAnswer: "If x is falsy, assign defaultValue; otherwise keep x.",
    explanation: "Common pattern for default values.",
    hint: "OR assignment.",
    level: "intermediate"
  },
  {
    question: "Why is 'if (a && b)' not always equivalent to 'if (b && a)' in programming?",
    shortAnswer: "Short-circuit evaluation may cause different side effects if b has side effects.",
    explanation: "If a is false, b is not evaluated in a&&b, but in b&&a, b is always evaluated first. So order matters.",
    hint: "Side effects.",
    level: "expert"
  },
  {
    question: "What does the condition 'if (isWeekend || isHoliday)' mean?",
    shortAnswer: "True if it's weekend OR holiday (or both).",
    explanation: "At least one condition true.",
    hint: "OR.",
    level: "basic"
  },
  {
    question: "How would you test if a character is a vowel?",
    shortAnswer: "if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u')",
    explanation: "Long OR chain; could use a set or switch.",
    hint: "Multiple ORs.",
    level: "basic"
  },
  {
    question: "What is the result of 'true || someFunction()'?",
    shortAnswer: "true, and someFunction() is NOT called (short-circuit).",
    explanation: "Since left operand true, OR result true regardless of right.",
    hint: "Short-circuit OR.",
    level: "intermediate"
  }
];

export default questions;