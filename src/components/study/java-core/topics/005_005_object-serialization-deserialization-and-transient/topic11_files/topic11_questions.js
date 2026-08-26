const topic11_questions = [
  {
    "question": "What is the mandatory constructor requirement for classes implementing 'java.io.Externalizable' in Java?",
    "shortAnswer": "Classes implementing 'Externalizable' MUST declare a 'public' no-argument constructor. During deserialization, the JVM first invokes the public no-arg constructor to create a fresh object instance on the heap, and then immediately invokes 'readExternal(in)' to populate the object's fields manually.",
    "explanation": "If the public no-arg constructor is missing, deserialization fails with InvalidClassException.",
    "hint": "Must provide a public no-arg constructor, which is called during readObject() before readExternal().",
    "level": "Intermediate",
    "codeExample": "public class MyClass implements Externalizable { public MyClass() {} // Mandatory! }"
  }
];

export default topic11_questions;