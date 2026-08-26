const topic3_questions = [
  {
    "question": "Why should utility methods accept 'Collection<E>' rather than specific concrete types like 'ArrayList<E>'?",
    "shortAnswer": "Following the OOP principle 'Program to an interface, not an implementation'. Accepting 'Collection<E>' allows the method to operate polymorphically on ANY collection type (ArrayList, LinkedList, HashSet, TreeSet, PriorityQueue) without requiring overloaded methods or restrictive type constraints.",
    "explanation": "Standard design pattern found throughout Java libraries and Spring Framework.",
    "hint": "Enables polymorphic interoperability across Lists, Sets, and Queues without tight coupling.",
    "level": "Beginner",
    "codeExample": "public static <E> void print(Collection<E> c) { ... } // Accepts Lists, Sets, Queues"
  }
];

export default topic3_questions;