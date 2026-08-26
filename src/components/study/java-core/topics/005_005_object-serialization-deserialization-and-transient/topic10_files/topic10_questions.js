const topic10_questions = [
  {
    "question": "Why must the custom 'writeObject(ObjectOutputStream oos)' and 'readObject(ObjectInputStream ois)' methods be declared as 'private'?",
    "shortAnswer": "The 'writeObject' and 'readObject' methods are invoked exclusively by the JVM serialization engine via internal reflection. Declaring them as 'private' ensures they cannot be called by external client code and prevents subclasses from accidentally overriding or corrupting the specific class's serialization logic.",
    "explanation": "Standard contract specified in the Java Object Serialization Specification.",
    "hint": "Must be private so only the JVM can invoke them via reflection and subclasses cannot override them.",
    "level": "Intermediate",
    "codeExample": "private void writeObject(ObjectOutputStream oos) throws IOException { oos.defaultWriteObject(); }"
  }
];

export default topic10_questions;