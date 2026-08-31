const topic13_questions = [
  {
    "question": "When should you use Optional.flatMap() instead of Optional.map()?",
    "shortAnswer": "Use flatMap() when the mapping function itself returns an Optional<U>. flatMap un-nests the result so you get Optional<U> instead of a cumbersome nested Optional<Optional<U>>.",
    "explanation": "Analogous to flatMap in Streams.",
    "hint": "Use flatMap when the transformation function already returns an Optional.",
    "level": "Intermediate",
    "codeExample": "userOpt.flatMap(User::getOptionalAddress).map(Address::getCity);"
  },
  {
    "question": "What happens if flatMap's mapping function returns null instead of an Optional?",
    "shortAnswer": "A NullPointerException is thrown. The contract of flatMap requires the mapper to return a non-null Optional (or Optional.empty()).",
    "explanation": "Returning raw null from flatMap mapper violates the contract.",
    "hint": "Throws NullPointerException if the mapping function returns null.",
    "level": "Advanced",
    "codeExample": "opt.flatMap(x → null); // Throws NullPointerException!"
  }
];

export default topic13_questions;
