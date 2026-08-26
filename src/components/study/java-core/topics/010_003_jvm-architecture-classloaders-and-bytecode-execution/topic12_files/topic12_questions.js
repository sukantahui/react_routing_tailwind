const topic12_questions = [
  {
    "question": "How does ClassLoader.loadClass() implement the parent-delegation algorithm in Java?",
    "shortAnswer": "It first checks if the class is already loaded, then calls parent.loadClass() (or the bootstrap loader if parent is null). If the parent throws ClassNotFoundException, it calls its own findClass() method to search locally.",
    "explanation": "Standard implementation in java.lang.ClassLoader.",
    "hint": "Checks cache -> delegates to parent -> falls back to findClass().",
    "level": "Intermediate",
    "codeExample": "protected Class<?> loadClass(String name) { ... parent.loadClass(name) ... findClass(name); }"
  },
  {
    "question": "When are two class instances considered identical (equal) by the JVM?",
    "shortAnswer": "Two classes are only identical if they have the exact same fully-qualified binary name AND were loaded by the exact same ClassLoader instance.",
    "explanation": "Same class bytes loaded by two different classloaders are treated as distinct incompatible types.",
    "hint": "Exact same binary name AND exact same ClassLoader instance.",
    "level": "Advanced",
    "codeExample": "Class1.equals(Class2) requires Class1.getClassLoader() == Class2.getClassLoader()"
  }
];

export default topic12_questions;
