const topic3_questions = [
  {
    "question": "How does the Java compiler translate generic calls like 'num.doubleValue()' when 'T' is bounded to '<T extends Number>'?",
    "shortAnswer": "During type erasure, the compiler erases 'T' and replaces it with its first upper bound ('Number'). It generates standard, highly-optimized bytecode invoking 'invokevirtual Number.doubleValue()'. This gives you the full convenience of calling Number methods directly without reflection or runtime casting overhead.",
    "explanation": "Standard bytecode translation mechanism for bounded generics.",
    "hint": "Replaces T with Number during type erasure, generating direct invokevirtual bytecode.",
    "level": "Intermediate",
    "codeExample": "for (T num : list) sum += num.doubleValue(); // Erased to ((Number) num).doubleValue()"
  }
];

export default topic3_questions;