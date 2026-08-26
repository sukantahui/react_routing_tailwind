const topic0_questions = [
  {
    "question": "What were the severe flaws of the pre-Java 5 'int enum pattern' (public static final int STATUS_ACTIVE = 1)?",
    "shortAnswer": "1. Zero type-safety (any integer could be passed, leading to silent bugs). 2. No namespace safety (constants with value 1 in different domains could be compared or mixed up). 3. Brittle recompilation issues. 4. Meaningless print output (printed raw numbers instead of descriptive names).",
    "explanation": "Effective Java Item 34 mandates using enums instead of int constants.",
    "hint": "Zero type-safety, no namespace isolation, and meaningless numeric debug output.",
    "level": "Beginner",
    "codeExample": "public enum Status { ACTIVE, INACTIVE, SUSPENDED }"
  }
];

export default topic0_questions;