const topic15_questions = [
  {
    "question": "Why is it recommended to override findClass() rather than loadClass() when writing a custom ClassLoader?",
    "shortAnswer": "Overriding findClass() preserves the Parent-Delegation model implemented in ClassLoader.loadClass(), ensuring that parent loaders are checked first before your custom lookup logic executes.",
    "explanation": "Overriding loadClass() directly requires manually re-implementing delegation.",
    "hint": "Preserves the parent-delegation algorithm automatically.",
    "level": "Intermediate",
    "codeExample": "protected Class<?> findClass(String name) { byte[] b = loadBytes(); return defineClass(name, b, 0, b.length); }"
  },
  {
    "question": "What does the protected defineClass() method in java.lang.ClassLoader do?",
    "shortAnswer": "It parses an array of raw bytecode bytes, performs verification checks, and creates a live java.lang.Class object in Metaspace.",
    "explanation": "The bridge between raw bytes and JVM runtime types.",
    "hint": "Converts byte[] array into a java.lang.Class instance in Metaspace.",
    "level": "Advanced",
    "codeExample": "return defineClass(name, byteData, 0, byteData.length);"
  }
];

export default topic15_questions;
