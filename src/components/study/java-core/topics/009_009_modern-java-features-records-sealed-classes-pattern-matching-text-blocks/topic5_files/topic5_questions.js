const topic5_questions = [
  {
    "question": "Can you declare an extra private instance field inside the body of a Java Record?",
    "shortAnswer": "No! A Record cannot declare any instance fields outside of the component list specified in the record header. Doing so produces a compile-time error.",
    "explanation": "Records guarantee that their state is 100% defined by their header components.",
    "hint": "Compile-time error; all instance fields must be in the header.",
    "level": "Beginner",
    "codeExample": "record User(String name) { private int age; // COMPILE ERROR! }"
  },
  {
    "question": "Why is serialization of Java Records more secure than traditional Java class serialization?",
    "shortAnswer": "Traditional class serialization bypasses constructors and injects byte fields directly into memory. Record deserialization strictly calls the canonical constructor, ensuring all compact constructor validation rules are enforced.",
    "explanation": "Prevents object state tampering attacks.",
    "hint": "Record deserialization always calls the canonical constructor.",
    "level": "Advanced",
    "codeExample": "Deserialization invokes: new RecordName(c1, c2...)"
  }
];

export default topic5_questions;
