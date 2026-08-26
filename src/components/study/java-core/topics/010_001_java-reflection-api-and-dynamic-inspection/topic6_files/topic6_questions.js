const topic6_questions = [
  {
    "question": "Can Reflection modify a field marked as private?",
    "shortAnswer": "Yes. By calling field.setAccessible(true) prior to field.set(), the standard Java access control checks are suppressed for that field, allowing dynamic modification of private state.",
    "explanation": "This mechanism is how Hibernate populates private entity fields from database rows.",
    "hint": "Yes, by calling field.setAccessible(true) first.",
    "level": "Beginner",
    "codeExample": "field.setAccessible(true); field.set(obj, 'newValue');"
  },
  {
    "question": "What happens if you attempt to modify a final field via Reflection in modern Java versions?",
    "shortAnswer": "In modern Java (Java 12+), mutating final fields via Reflection produces an IllegalAccessException, as the JVM has restricted tampering with final fields to protect memory safety and JIT compiler optimizations.",
    "explanation": "Reflection on final fields is strictly locked down in modern JDKs.",
    "hint": "Throws IllegalAccessException in modern JDKs.",
    "level": "Advanced",
    "codeExample": "Field finalField = ...; finalField.set(obj, val); // Throws IllegalAccessException"
  }
];

export default topic6_questions;
