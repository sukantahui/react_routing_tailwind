const topic0_questions = [
  {
    "question": "Why did Sir Tony Hoare refer to the null reference as his 'Billion Dollar Mistake'?",
    "shortAnswer": "Because it has led to innumerable software vulnerabilities, crashes, and billions of dollars in debugging and patching costs over decades across all major programming languages.",
    "explanation": "null references bypass type safety, allowing null to masquerade as any object type.",
    "hint": "Bypasses the type system leading to widespread runtime crashes.",
    "level": "Beginner",
    "codeExample": "String s = null; s.length(); // Crashes with NullPointerException!"
  },
  {
    "question": "How does java.util.Optional solve the ambiguity of method return values?",
    "shortAnswer": "By returning Optional<T>, the method signature explicitly and statically communicates to the caller that a result may be absent, forcing the caller to handle absence without relying on runtime null assumptions.",
    "explanation": "Eliminates guessing whether a method might return null.",
    "hint": "Forces callers to acknowledge and handle possible absence in code.",
    "level": "Beginner",
    "codeExample": "Optional<Student> findById(int id); // Clear compile-time contract"
  }
];

export default topic0_questions;
