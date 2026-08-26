const topic3_questions = [
  {
    "question": "Why is an Enum Singleton considered the most robust Singleton implementation in Java according to Joshua Bloch?",
    "shortAnswer": "Because the JVM inherently guarantees that enum constants are instantiated only once, is automatically thread-safe, and provides built-in protection against both Reflection attacks (Constructor.newInstance() throws IllegalArgumentException) and Serialization duplication bugs.",
    "explanation": "Item 3 in Effective Java by Joshua Bloch.",
    "hint": "Immune to Reflection instantiation attacks and Serialization duplication.",
    "level": "Intermediate",
    "codeExample": "public enum AcademyConfig { INSTANCE; }"
  },
  {
    "question": "Why does the Bill Pugh Singleton idiom provide lazy loading without needing synchronized methods?",
    "shortAnswer": "Because the inner static helper class (InstanceHolder) is not loaded into memory by the JVM ClassLoader until the getInstance() method is explicitly called, and the JVM's class initialization phase (<clinit>) is inherently thread-safe.",
    "explanation": "Leverages JVM ClassLoader initialization guarantees.",
    "hint": "The inner static class is loaded only when getInstance() is called.",
    "level": "Advanced",
    "codeExample": "private static class Holder { static final Singleton INSTANCE = new Singleton(); }"
  }
];

export default topic3_questions;
