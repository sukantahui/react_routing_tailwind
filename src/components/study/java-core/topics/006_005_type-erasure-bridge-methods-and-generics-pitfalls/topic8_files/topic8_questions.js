const topic8_questions = [
  {
    "question": "Why does Java disallow declaring static fields of a generic type parameter (e.g. 'private static T sharedValue;')?",
    "shortAnswer": "A static field is shared across ALL instances of the class regardless of their type arguments. If 'static T' were allowed, creating 'new Box<String>()' and 'new Box<Integer>()' would result in conflicting expectations for that single shared memory slot (is it a String or an Integer?). Since the JVM loads only one class definition, static generic fields are strictly prohibited.",
    "explanation": "Core consequence of static memory layout in Java Metaspace.",
    "hint": "Static fields are shared across all instances; multiple parameterized instances would conflict over its type.",
    "level": "Intermediate",
    "codeExample": "// private static T item; // Compilation Error: Non-static type T cannot be referenced"
  }
];

export default topic8_questions;