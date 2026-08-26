const topic13_questions = [
  {
    "question": "What problem was solved by introducing Sequenced Collections in Java 21 (JEP 431)?",
    "shortAnswer": "Prior to Java 21, the Java Collections Framework lacked a unified interface for collections with a defined encounter order, forcing developers to use different, awkward APIs (list.get(0), deque.getFirst(), set.iterator().next()) for the same conceptual operation.",
    "explanation": "SequencedCollection unifies first/last/reversed access across Lists, Sets, and Maps.",
    "hint": "Unifies first, last, and reverse-order access across all ordered collection types.",
    "level": "Intermediate",
    "codeExample": "list.getFirst(); set.getLast(); map.firstEntry(); map.reversed();"
  },
  {
    "question": "Does calling collection.reversed() in Java 21 create a new copy of the collection?",
    "shortAnswer": "No. reversed() returns a lightweight, zero-copy reverse-ordered view of the original collection. Mutations on the reversed view reflect in the original collection and vice-versa.",
    "explanation": "Highly memory and performance efficient.",
    "hint": "Returns a zero-copy reverse-ordered view.",
    "level": "Intermediate",
    "codeExample": "SequencedCollection<String> rev = list.reversed(); // Zero copy view"
  }
];

export default topic13_questions;
