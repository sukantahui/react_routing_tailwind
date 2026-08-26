const topic1_questions = [
  {
    "question": "Is the constructor of a 'Serializable' class invoked when that object is being deserialized via 'ObjectInputStream.readObject()'?",
    "shortAnswer": "NO. When a class implements 'Serializable', the JVM completely BYPASSES all constructors of that class during deserialization. The JVM allocates raw uninitialized heap memory via internal reflection mechanisms and restores the field values directly from the byte stream. Only the no-arg constructor of the first non-serializable superclass is invoked.",
    "explanation": "Effective Java Item 85: Constructors are bypassed, making deserialization an alternative invisible constructor.",
    "hint": "Constructors of Serializable classes are NEVER called during deserialization.",
    "level": "Intermediate",
    "codeExample": "CourseEnrollment obj = (CourseEnrollment) ois.readObject(); // Constructor NOT called!"
  }
];

export default topic1_questions;