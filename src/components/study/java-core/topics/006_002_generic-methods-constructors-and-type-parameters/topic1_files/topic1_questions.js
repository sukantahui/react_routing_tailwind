const topic1_questions = [
  {
    "question": "Where must type parameters (such as '<T>' or '<K, V>') be declared in a Generic Method signature?",
    "shortAnswer": "Type parameters must be declared inside angle brackets '<T>' IMMEDIATELY BEFORE the method's return type (e.g. 'public static <T> T process(T input)' or 'public <K, V> String format(K k, V v)'). Placing '<T>' after the method name or return type causes a compilation error.",
    "explanation": "Informs the Java compiler of the method-scoped generic types before parsing the return type.",
    "hint": "Declared immediately before the return type inside angle brackets '<T>'.",
    "level": "Beginner",
    "codeExample": "public static <T> List<T> makeList(T item) { ... }"
  }
];

export default topic1_questions;