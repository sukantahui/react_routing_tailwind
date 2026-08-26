const topic1_questions = [
  {
    "question": "What is the consequence of omitting @Override when overriding a method?",
    "shortAnswer": "The method will still override if the signature matches perfectly. However, if there is a signature typo (e.g. equals(Student s) instead of equals(Object o)), the compiler treats it as an overload rather than an override without giving any error.",
    "explanation": "Always apply @Override to catch signature mismatches at compile time.",
    "hint": "Leaves the code vulnerable to silent overload typo bugs.",
    "level": "Beginner",
    "codeExample": "@Override public boolean equals(Object o) { ... }"
  },
  {
    "question": "What do the 'since' and 'forRemoval' attributes in @Deprecated indicate?",
    "shortAnswer": "'since' specifies the version in which the element was first deprecated (e.g. '17'), and 'forRemoval=true' indicates that the API is scheduled for complete removal in an upcoming major release.",
    "explanation": "Enhanced in Java 9 to improve API deprecation tracking.",
    "hint": "'since' indicates version; 'forRemoval=true' indicates imminent deletion.",
    "level": "Intermediate",
    "codeExample": "@Deprecated(since='17', forRemoval=true)"
  }
];

export default topic1_questions;
