const topic14_questions = [
  {
    "question": "What is Regular Expression Denial of Service (ReDoS) and how do Possessive Quantifiers prevent it?",
    "shortAnswer": "ReDoS is a security vulnerability where an attacker sends a crafted string to a regex containing nested greedy quantifiers (e.g. '(a+)+$'), causing exponential O(2^N) catastrophic backtracking that exhausts CPU resources and crashes the server. Possessive quantifiers ('(a++)++') never backtrack, failing instantly in O(N) linear time.",
    "explanation": "Ranked among top API security vulnerabilities under OWASP Top 10.",
    "hint": "Caused by nested greedy quantifiers backtracking exponentially; solved via possessive quantifiers.",
    "level": "Advanced",
    "codeExample": "Pattern safe = Pattern.compile(\"([a-z]++)++$\"); // Possessive quantifier"
  }
];

export default topic14_questions;
