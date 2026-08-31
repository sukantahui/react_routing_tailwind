const topic14_questions = [
  {
    "question": "How does the Strategy pattern eliminate massive if-else or switch-case conditional ladders?",
    "shortAnswer": "By encapsulating each branch of the conditional logic into an independent strategy object implementing a common interface, allowing the client to execute the appropriate algorithm polymorphically without branching statements.",
    "explanation": "Adheres to the Open-Closed Principle.",
    "hint": "Encapsulates branching algorithm variants into polymorphic strategy objects.",
    "level": "Beginner",
    "codeExample": "context.setStrategy(new HighDiscountStrategy());"
  },
  {
    "question": "What is the standard example of the Strategy pattern built directly into the Java Standard Library?",
    "shortAnswer": "java.util.Comparator<T> passed to Collections.sort() or Stream.sorted().",
    "explanation": "Allows passing custom comparison algorithms dynamically.",
    "hint": "java.util.Comparator interface.",
    "level": "Beginner",
    "codeExample": "list.sort((a, b) → Double.compare(a.score(), b.score()));"
  }
];

export default topic14_questions;
