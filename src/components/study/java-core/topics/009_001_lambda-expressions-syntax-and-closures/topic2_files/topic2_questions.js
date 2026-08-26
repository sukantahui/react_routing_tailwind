const topic2_questions = [
  {
    "question": "What are the rules for omitting types, parentheses, curly braces, and the 'return' keyword in Java Lambda expressions?",
    "shortAnswer": "1. 'Parameter Types': Can be omitted if the compiler can infer them from context (all must be omitted or all declared). 2. 'Parentheses': Can be omitted ONLY when there is exactly ONE inferred parameter (e.g. 'x -> x * 2'). For zero ('() -> ...') or multiple ('(a, b) -> ...') parameters, parentheses are required. 3. 'Curly Braces & return': When the body is a single expression, curly braces and the 'return' keyword must be omitted together (e.g. '(a, b) -> a + b'). If curly braces are used, 'return' and a semicolon are mandatory ('(a, b) -> { return a + b; }').",
    "explanation": "Comprehensive rule matrix for valid lambda expression syntax.",
    "hint": "Single inferred param can omit parentheses; single expression must omit curly braces and return keyword together.",
    "level": "Intermediate",
    "codeExample": "x -> x * 2; // Valid single-param single-expression shortcut"
  }
];

export default topic2_questions;