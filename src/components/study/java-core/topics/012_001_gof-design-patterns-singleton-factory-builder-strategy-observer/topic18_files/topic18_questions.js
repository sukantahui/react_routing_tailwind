const topic18_questions = [
  {
    "question": "Why should the template method itself in the base class be marked with the 'final' keyword in Java?",
    "shortAnswer": "To prevent child subclasses from overriding the master algorithm structure, guaranteeing that invariant workflow steps execute in the exact designated order.",
    "explanation": "Protects algorithm integrity.",
    "hint": "Prevents subclasses from altering the algorithm execution order.",
    "level": "Intermediate",
    "codeExample": "public final void processOrder() { step1(); step2(); }"
  },
  {
    "question": "What is an example of the Template Method pattern in the Java Collections framework?",
    "shortAnswer": "java.util.AbstractList (where get(int) and size() are abstract hooks, and all other methods like contains(), indexOf(), iterator() are implemented on top of them).",
    "explanation": "Foundational skeletal implementation classes in the JDK.",
    "hint": "AbstractList, AbstractSet, AbstractMap skeletal implementations.",
    "level": "Intermediate",
    "codeExample": "AbstractList provides concrete methods using abstract get() and size()."
  }
];

export default topic18_questions;
