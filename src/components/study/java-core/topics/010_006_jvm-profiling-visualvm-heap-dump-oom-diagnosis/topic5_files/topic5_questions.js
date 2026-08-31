const topic5_questions = [
  {
    "question": "What hidden field does the Java compiler inject into non-static inner classes that can cause memory leaks?",
    "shortAnswer": "A synthetic reference field named 'this$0' pointing to the enclosing outer class instance, keeping the entire outer object tree reachable as long as the inner class instance lives.",
    "explanation": "Static nested classes do not have this synthetic reference.",
    "hint": "The synthetic this$0 reference to the enclosing outer instance.",
    "level": "Intermediate",
    "codeExample": "innerInstance.this$0 → Points to outer class instance"
  },
  {
    "question": "How do you break the connection between an inner class and its outer enclosing instance?",
    "shortAnswer": "By adding the 'static' keyword to the inner class declaration (making it a Static Nested Class), which removes the implicit outer reference.",
    "explanation": "Static nested classes act like top-level classes packaged inside a namespace.",
    "hint": "Declare the inner class as 'static'.",
    "level": "Beginner",
    "codeExample": "public static class SafeNestedClass { ... }"
  }
];

export default topic5_questions;
