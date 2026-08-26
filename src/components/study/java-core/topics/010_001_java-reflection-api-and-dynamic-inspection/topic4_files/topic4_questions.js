const topic4_questions = [
  {
    "question": "Why was Class.newInstance() deprecated in Java 9 in favor of clazz.getDeclaredConstructor().newInstance()?",
    "shortAnswer": "Class.newInstance() bypassed checked exception handling and could only invoke public zero-argument constructors. Constructor.newInstance() supports any parameter list and wraps constructor exceptions safely in InvocationTargetException.",
    "explanation": "Promotes safer exception transparency and uniform constructor selection.",
    "hint": "Deprecated due to checked exception bypassing and limitation to public no-arg constructors.",
    "level": "Intermediate",
    "codeExample": "clazz.getDeclaredConstructor(String.class).newInstance('Swadeep');"
  },
  {
    "question": "What exception is thrown when an invoked constructor itself throws an exception during Reflection?",
    "shortAnswer": "java.lang.reflect.InvocationTargetException, a checked wrapper exception whose getCause() method provides the actual underlying exception thrown by the constructor body.",
    "explanation": "Always inspect getCause() when catching InvocationTargetException.",
    "hint": "InvocationTargetException wraps the underlying thrown exception.",
    "level": "Intermediate",
    "codeExample": "try { c.newInstance(); } catch (InvocationTargetException e) { Throwable cause = e.getCause(); }"
  }
];

export default topic4_questions;
