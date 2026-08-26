const topic3_questions = [
  {
    "question": "What is an 'Explicit Type Witness' in Java generic method calls, and how is it written?",
    "shortAnswer": "An Explicit Type Witness is the syntax used to explicitly specify the type argument when calling a generic method instead of relying on compiler type inference. It is written immediately before the method name: 'ClassName.<Type>methodName(args)' for static methods, or 'instance.<Type>methodName(args)' for instance methods (e.g. 'Collections.<String>emptyList()').",
    "explanation": "Used when the compiler cannot infer a common type or when disambiguating overloaded signatures.",
    "hint": "Written as 'ClassName.<Type>methodName(args)', explicitly declaring the generic type argument.",
    "level": "Intermediate",
    "codeExample": "List<String> list = Collections.<String>emptyList();"
  }
];

export default topic3_questions;