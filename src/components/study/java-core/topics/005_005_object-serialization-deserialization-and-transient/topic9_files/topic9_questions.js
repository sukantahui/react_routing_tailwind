const topic9_questions = [
  {
    "question": "When does the JVM throw a 'java.io.InvalidClassException' during deserialization?",
    "shortAnswer": "The JVM throws 'InvalidClassException' when: 1. The 'serialVersionUID' recorded in the serialized byte stream does not match the 'serialVersionUID' of the class loaded in the local JVM. 2. The class definition contains unknown data types. 3. The class does not have an accessible no-arg constructor in its first non-serializable superclass.",
    "explanation": "Protects applications from reading incompatible data layouts into memory.",
    "hint": "Thrown when the stream UID does not match the loaded class UID or incompatible class changes occur.",
    "level": "Intermediate",
    "codeExample": "catch (InvalidClassException ice) { log.error(\"UID mismatch: \" + ice.getMessage()); }"
  }
];

export default topic9_questions;