const topic0_questions = [
  {
    "question": "Why does passing a 'List<String>' to a method expecting 'List<Object>' cause a compilation error in Java?",
    "shortAnswer": "In Java, generic types are 'Invariant'. Although 'String' is a subtype of 'Object', 'List<String>' is NOT a subtype of 'List<Object>'. If the compiler allowed this assignment, code could insert an Integer or Date into the 'List<Object>' reference ('list.add(123)'), corrupting the underlying 'List<String>' and causing fatal runtime ClassCastExceptions.",
    "explanation": "Invariance is the core defense mechanism preserving compile-time type safety.",
    "hint": "Generics are invariant; allowing List<String> as List<Object> would permit adding non-Strings.",
    "level": "Intermediate",
    "codeExample": "// List<Object> list = new ArrayList<String>(); // Compilation Error!"
  }
];

export default topic0_questions;