const topic8_questions = [
  {
    "question": "Why does Effective Java Item 86 mandate: 'Declare an explicit serialVersionUID in every serializable class'?",
    "shortAnswer": "If you omit 'serialVersionUID', the Java compiler automatically computes a 64-bit cryptographic SHA-1 hash based on the class structure, methods, field names, and compiler flags. Even a trivial change (like adding a private helper method or changing a compiler version) alters this auto-generated hash, triggering fatal 'InvalidClassException' crashes when reading previously saved files.",
    "explanation": "Declaring 'private static final long serialVersionUID = 1L;' guarantees backward compatibility.",
    "hint": "Auto-computed hashes change on minor edits or compiler shifts, corrupting previously serialized files.",
    "level": "Intermediate",
    "codeExample": "private static final long serialVersionUID = 1L; // Mandatory best practice"
  }
];

export default topic8_questions;