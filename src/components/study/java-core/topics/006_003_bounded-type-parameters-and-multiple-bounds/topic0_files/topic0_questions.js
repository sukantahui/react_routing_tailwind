const topic0_questions = [
  {
    "question": "What are the two major advantages of declaring an Upper Bounded Type Parameter like '<T extends Number>' in Java?",
    "shortAnswer": "1. Type Restriction: It restricts client code from instantiating the generic class with incompatible types (e.g. 'new Holder<String>()' fails compilation). 2. Method Invocability: It allows code inside the generic class to invoke all public methods of the bounding type ('Number.doubleValue()', 'intValue()') directly on instances of 'T' without manual type casting.",
    "explanation": "Eliminates the need to treat generic elements as opaque java.lang.Object instances.",
    "hint": "Restricts invalid types and enables calling methods declared on the bounding superclass.",
    "level": "Beginner",
    "codeExample": "class Stats<T extends Number> { double get() { return val.doubleValue(); } }"
  }
];

export default topic0_questions;