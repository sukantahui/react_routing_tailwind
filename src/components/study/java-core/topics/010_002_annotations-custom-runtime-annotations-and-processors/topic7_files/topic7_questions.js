const topic7_questions = [
  {
    "question": "What is the requirement for the container annotation used with @Repeatable?",
    "shortAnswer": "The container annotation must declare a 'value()' method whose return type is an array of the repeatable annotation type (e.g. MyAnnotation[] value();) and its @Retention and @Target must be at least as broad as the repeatable annotation.",
    "explanation": "Enforced by javac at compile time.",
    "hint": "Must declare a value() method returning an array of the repeatable annotation.",
    "level": "Intermediate",
    "codeExample": "@Retention(RetentionPolicy.RUNTIME) public @interface Containers { Item[] value(); }"
  },
  {
    "question": "Which Reflection method should you call to retrieve repeatable annotations?",
    "shortAnswer": "element.getAnnotationsByType(MyAnnotation.class), introduced in Java 8 to unwrap and return all repeated instances directly as an array.",
    "explanation": "getAnnotation() would only return the container annotation wrapper.",
    "hint": "getAnnotationsByType()",
    "level": "Beginner",
    "codeExample": "Schedule[] list = method.getAnnotationsByType(Schedule.class);"
  }
];

export default topic7_questions;
