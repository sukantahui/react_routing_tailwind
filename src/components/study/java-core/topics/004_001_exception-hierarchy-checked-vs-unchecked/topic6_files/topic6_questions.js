const topic6_questions = [
  {
    "question": "What are Unchecked Exceptions in Java and how do they differ from Checked Exceptions?",
    "shortAnswer": "'Unchecked Exceptions' are subclasses of 'java.lang.RuntimeException' (and 'java.lang.Error'). The compiler does NOT require them to be caught or declared in 'throws' clauses. They typically represent programming defects or logic bugs (like NullPointerException or ArrayIndexOutOfBoundsException) that should be prevented via defensive checks.",
    "explanation": "Catching RuntimeExceptions everywhere is an anti-pattern; fix the underlying logic bug instead.",
    "hint": "Subclasses of RuntimeException; not enforced by compiler; represent logic bugs.",
    "level": "Beginner",
    "codeExample": "int len = str != null ? str.length() : 0; // Defensive check prevents NPE"
  }
];

export default topic6_questions;