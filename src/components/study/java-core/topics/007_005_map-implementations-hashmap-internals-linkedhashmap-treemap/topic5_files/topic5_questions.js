const topic5_questions = [
  {
    "question": "Why MUST the internal table capacity of a 'HashMap' always be a power of two (e.g. 16, 32, 64)?",
    "shortAnswer": "Because when capacity 'n' is a power of two (2^k), '(n - 1)' is a bitmask consisting entirely of 1s in the lower bits (e.g. 16 - 1 = 15 = binary 1111). This allows the JVM to compute bucket indices using the ultra-fast bitwise AND operation '(n - 1) & hash' instead of the slow arithmetic modulo operator 'hash % n'. Bitwise AND executes in a single CPU cycle, dramatically speeding up lookups.",
    "explanation": "Foundational performance optimization in Java HashMap design.",
    "hint": "Allows fast bitwise AND '(n - 1) & hash' which requires n to be a power of 2.",
    "level": "Intermediate",
    "codeExample": "int index = (table.length - 1) & hash; // Requires length to be 2^k"
  }
];

export default topic5_questions;