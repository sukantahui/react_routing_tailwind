const topic3_questions = [
  {
    "question": "Why does Double.NaN == Double.NaN evaluate to false in Java?",
    "shortAnswer": "The IEEE 754 floating-point standard mandates that NaN (Not-a-Number) is not equal to any value, including itself, because NaN represents an undefined or unrepresentable numeric result.",
    "explanation": "Standard IEEE 754 equality rule.",
    "hint": "IEEE 754 specification defines NaN as unequal to any value including itself.",
    "level": "Beginner",
    "codeExample": "Double.isNaN(val); // Correct way to check for NaN"
  },
  {
    "question": "Why does primitive -0.0 == +0.0 return true, but Double.valueOf(-0.0).equals(Double.valueOf(0.0)) return false?",
    "shortAnswer": "Primitive == follows IEEE 754 where signed zeros compare as equal; however, Double.equals() complies with Java equals contract and Map hashing, treating different bit layouts (0x8000000000000000L vs 0x0L) as distinct objects.",
    "explanation": "Distinction between IEEE 754 primitive comparison and Object.equals contract.",
    "hint": "Double.equals() compares raw IEEE bit representations for hash consistency.",
    "level": "Advanced",
    "codeExample": "Double.valueOf(-0.0).equals(0.0); // false"
  }
];

export default topic3_questions;
