const topic1_questions = [
  {
    "question": "What is the purpose of 'Iterator.forEachRemaining(Consumer action)' introduced in Java 8?",
    "shortAnswer": "'forEachRemaining()' performs the given action for each remaining element in the collection until all elements have been processed or the action throws an exception. It is ideal when an algorithm processes the first few elements manually using 'next()' and wants to delegate the remaining elements to a functional lambda expression in a single clean pass.",
    "explanation": "Default method added to java.util.Iterator in Java 8.",
    "hint": "Consumes all unvisited remaining elements using a functional Consumer lambda.",
    "level": "Beginner",
    "codeExample": "iterator.forEachRemaining(e → System.out.println(e));"
  }
];

export default topic1_questions;