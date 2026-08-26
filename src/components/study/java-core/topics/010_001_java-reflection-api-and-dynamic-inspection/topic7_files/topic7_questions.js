const topic7_questions = [
  {
    "question": "What exception is thrown in Java 17+ when setAccessible(true) is invoked on an un-exported JDK internal class?",
    "shortAnswer": "java.lang.reflect.InaccessibleObjectException (an unchecked exception introduced in Java 9 to enforce JPMS module boundary encapsulation).",
    "explanation": "Java 17 finalized strong encapsulation of JDK internals by default.",
    "hint": "InaccessibleObjectException",
    "level": "Advanced",
    "codeExample": "String.class.getDeclaredField('value').setAccessible(true); // Throws InaccessibleObjectException"
  },
  {
    "question": "What JVM command-line argument allows legacy reflection on closed internal module packages?",
    "shortAnswer": "--add-opens <module>/<package>=<target-module>, such as '--add-opens java.base/java.lang=ALL-UNNAMED'.",
    "explanation": "Opens the specific package for deep reflection to the target module.",
    "hint": "--add-opens <module>/<package>=<target>",
    "level": "Intermediate",
    "codeExample": "java --add-opens java.base/java.lang=ALL-UNNAMED -jar app.jar"
  }
];

export default topic7_questions;
