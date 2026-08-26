const topic13_questions = [
  {
    question: "What is a Private Constructor in Java?",
    shortAnswer: "A constructor marked with the 'private' access modifier, restricting object instantiation strictly to within the declaring class itself.",
    explanation: "Private constructors prevent external callers from executing 'new ClassName()', enabling the Singleton pattern and Utility classes.",
    hint: "Restricts instantiation exclusively to within the class.",
    level: "Beginner",
    codeExample: "public class MyClass { private MyClass() {} }"
  },
  {
    question: "What are the two primary use cases for Private Constructors in professional Java development?",
    shortAnswer: "1. Utility / Helper classes (like java.lang.Math, java.util.Collections) containing only static methods. 2. Singleton classes guaranteeing a single shared instance.",
    explanation: "Utility classes should never be instantiated; Singletons must control instance count strictly.",
    hint: "Utility classes and Singleton design pattern.",
    level: "Beginner",
    codeExample: "// MathUtils (Utility) & DatabasePool (Singleton)"
  },
  {
    question: "Can a class with only a private constructor be subclassed?",
    shortAnswer: "No! Subclass constructors must invoke 'super()', which cannot access the private parent constructor, causing a compile error.",
    explanation: "Private constructors effectively make the class non-inheritable without even needing the 'final' keyword.",
    hint: "Subclasses cannot call private super() constructor.",
    level: "Intermediate",
    codeExample: "class Parent { private Parent() {} }\nclass Child extends Parent {} // COMPILE ERROR!"
  },
  {
    question: "Why should you throw an 'UnsupportedOperationException' inside a private utility constructor?",
    shortAnswer: "To prevent instantiation via Java Reflection ('constructor.setAccessible(true); constructor.newInstance()').",
    explanation: "Throwing an exception inside the constructor guarantees reflection hacks will fail.",
    hint: "Shields against Java Reflection instantiation attacks.",
    level: "Advanced",
    codeExample: "private MathUtil() { throw new UnsupportedOperationException(\"No instantiation\"); }"
  },
  {
    question: "What is the Bill Pugh Singleton Pattern and why is it preferred in Java?",
    shortAnswer: "It uses a private static inner class to hold the singleton instance, achieving lazy initialization and complete thread safety without synchronization overhead.",
    explanation: "The inner class is loaded only when 'getInstance()' is called, utilizing the JVM ClassLoader's native thread-safety.",
    hint: "Private static inner class holding instance loaded lazily.",
    level: "Advanced",
    codeExample: "private static class Holder { static final Singleton INSTANCE = new Singleton(); }"
  }
];

export default topic13_questions;