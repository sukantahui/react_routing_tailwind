const topic5_questions = [
  {
    "question": "What does the error message in a 'java.io.NotSerializableException' represent, and how do you fix it?",
    "shortAnswer": "The message of 'NotSerializableException' contains the fully qualified class name of the specific offending object that failed the 'instanceof Serializable' check. To fix it: 1. Add 'implements Serializable' to the offending class (if you own the source code). 2. Mark the field as 'transient' (if it holds runtime resources like DB connections or threads).",
    "explanation": "The most common runtime defect in Java serialization architectures.",
    "hint": "The exception message is the exact class name that lacks 'implements Serializable'; mark field transient or implement it.",
    "level": "Beginner",
    "codeExample": "private transient Thread worker; // Resolves NotSerializableException"
  }
];

export default topic5_questions;