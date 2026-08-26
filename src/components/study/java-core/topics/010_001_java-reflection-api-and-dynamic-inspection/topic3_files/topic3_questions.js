const topic3_questions = [
  {
    "question": "What does clazz.getSuperclass() return when invoked on java.lang.Object or an interface?",
    "shortAnswer": "It returns null. java.lang.Object has no superclass, and interfaces have no superclass according to the Reflection API specification.",
    "explanation": "To inspect interface inheritance, use getInterfaces() instead.",
    "hint": "Returns null for Object and interfaces.",
    "level": "Beginner",
    "codeExample": "Object.class.getSuperclass(); // null\\nRunnable.class.getSuperclass(); // null"
  },
  {
    "question": "How are class modifiers represented internally in the JVM and decoded by Reflection?",
    "shortAnswer": "Modifiers are stored as an integer bitmask where specific bits represent flags (e.g. public=1, private=2, final=16). The java.lang.reflect.Modifier class provides static helper methods (isPublic, isFinal) and Modifier.toString() to decode them.",
    "explanation": "Bitwise AND operations test individual modifier flags.",
    "hint": "Stored as an integer bitmask and decoded via Modifier static methods.",
    "level": "Intermediate",
    "codeExample": "int mods = clazz.getModifiers(); String s = Modifier.toString(mods);"
  }
];

export default topic3_questions;
