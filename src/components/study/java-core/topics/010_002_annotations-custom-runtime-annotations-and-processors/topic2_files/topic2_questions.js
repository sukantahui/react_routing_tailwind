const topic2_questions = [
  {
    "question": "What package contains Java's standard meta-annotations?",
    "shortAnswer": "java.lang.annotation package (containing @Retention, @Target, @Documented, @Inherited, @Repeatable, RetentionPolicy, and ElementType).",
    "explanation": "Core Java standard library package for annotation definitions.",
    "hint": "java.lang.annotation",
    "level": "Beginner",
    "codeExample": "import java.lang.annotation.*;"
  },
  {
    "question": "What happens if you create a custom annotation without specifying @Target?",
    "shortAnswer": "The custom annotation can be applied to almost ANY valid Java element (classes, methods, fields, parameters, constructors, local variables), except type parameter declarations.",
    "explanation": "Omitting @Target creates an unconstrained annotation.",
    "hint": "It can be applied to all standard Java elements by default.",
    "level": "Intermediate",
    "codeExample": "public @interface OpenAnnotation {} // Applicable everywhere"
  }
];

export default topic2_questions;
