const topic4_questions = [
  {
    "question": "How does the 'java.util.Comparator<T>' interface embody the Gang of Four (GoF) Strategy Pattern in Java?",
    "shortAnswer": "The Strategy Pattern defines a family of algorithms and encapsulates each one inside an object. 'Comparator<T>' encapsulates comparison logic ('compare(o1, o2)') into standalone strategy objects or lambdas. The client collection ('list.sort(strategy)') can swap sorting behaviors at runtime without modifying the source code of the target data class, strictly adhering to the Open-Closed Principle.",
    "explanation": "Core OOP design pattern realization in Java Collections.",
    "hint": "Encapsulates sorting algorithms into interchangeable strategy objects/lambdas without modifying the domain class.",
    "level": "Intermediate",
    "codeExample": "candidates.sort(new ExperienceComparator()); // Injects sorting strategy"
  }
];

export default topic4_questions;