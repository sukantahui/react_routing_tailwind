const topic9_questions = [
  {
    "question": "Can an anonymous inner class extend a class AND implement an interface simultaneously in Java?",
    "shortAnswer": "NO. An anonymous inner class can either extend exactly ONE superclass (abstract or concrete) OR implement exactly ONE interface. It can never implement multiple interfaces or extend a class and implement an interface at the same time.",
    "explanation": "Also, anonymous inner classes cannot have explicit constructors because they have no class name.",
    "hint": "An anonymous class can extend 1 class OR implement 1 interface, never both.",
    "level": "Intermediate",
    "codeExample": "AbstractClass a = new AbstractClass() { void foo() { ... } };"
  }
];

export default topic9_questions;