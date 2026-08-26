const topic2_questions = [
  {
    "question": "What is the return contract of 'compareTo(T o)' and why is 'return this.id - other.id' considered a dangerous bug?",
    "shortAnswer": "1. 'Contract': Returns a negative integer if 'this < o', zero if 'this == o', and a positive integer if 'this > o'. 2. 'Integer Overflow Hazard': Writing 'this.id - other.id' causes catastrophic sign-inversion bugs if '(this.id - other.id)' underflows or overflows the 32-bit signed integer boundary (e.g. 'Integer.MIN_VALUE - 1'). Developers should ALWAYS use 'Integer.compare(this.id, other.id)' instead.",
    "explanation": "Effective Java Item 14: Consider implementing Comparable.",
    "hint": "Negative (< 0), Zero (== 0), Positive (> 0); direct subtraction risks 32-bit integer overflow.",
    "level": "Intermediate",
    "codeExample": "return Integer.compare(this.score, other.score); // Safe overflow-free comparison"
  }
];

export default topic2_questions;