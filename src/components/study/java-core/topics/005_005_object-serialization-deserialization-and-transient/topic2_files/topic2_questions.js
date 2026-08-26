const topic2_questions = [
  {
    "question": "What is a 'Marker Interface' in Java, and why is 'java.io.Serializable' designed as one?",
    "shortAnswer": "A 'Marker Interface' (or Tagging Interface) is an interface that contains zero methods or constants (e.g. Serializable, Cloneable, Remote). 'Serializable' serves as an explicit opt-in signal to the JVM runtime that instances of this class are safe to be flattened into binary streams. If an object lacking this marker is passed to writeObject(), the JVM throws 'NotSerializableException'.",
    "explanation": "Prevents accidental serialization of sensitive or stateful runtime components (Threads, Sockets).",
    "hint": "An interface with 0 methods acting as an opt-in metadata flag checked via 'instanceof Serializable'.",
    "level": "Beginner",
    "codeExample": "public interface Serializable { /* empty marker */ }"
  }
];

export default topic2_questions;