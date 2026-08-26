const topic5_questions = [
  {
    "question": "What is the difference between clazz.getMethods() and clazz.getDeclaredMethods()?",
    "shortAnswer": "getMethods() returns all public methods of the class including those inherited from superclasses/interfaces, while getDeclaredMethods() returns all methods declared in the class itself regardless of access level (public, private, protected), but excludes inherited methods.",
    "explanation": "Declared methods inspect the immediate class body.",
    "hint": "getMethods() is public + inherited; getDeclaredMethods() is all access levels of immediate class only.",
    "level": "Beginner",
    "codeExample": "clazz.getMethods() vs clazz.getDeclaredMethods()"
  },
  {
    "question": "What should be passed as the first argument to method.invoke() when invoking a static method?",
    "shortAnswer": "Pass null (or any object reference, which is ignored) because static methods belong to the class rather than any individual heap instance.",
    "explanation": "Static methods execute in a class context.",
    "hint": "Pass null as the target object.",
    "level": "Beginner",
    "codeExample": "staticMethod.invoke(null, 'arg1', 'arg2');"
  }
];

export default topic5_questions;
