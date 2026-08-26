const topic8_questions = [
  {
    "question": "Why is adding elements of type 'T' into a collection declared with '? super T' guaranteed to be type-safe?",
    "shortAnswer": "Because '? super T' accepts collections holding 'T' or any supertype of 'T' (such as Number or Object for Integer). In Java's type system, an instance of 'T' is automatically a valid instance of all its supertypes (Liskov Substitution Principle). Thus, inserting 'T' into a list of its supertypes can never violate type invariants.",
    "explanation": "Foundational theorem underpinning contravariant generic insertion.",
    "hint": "An instance of T can always be safely stored in a collection of any of its superclasses.",
    "level": "Intermediate",
    "codeExample": "List<? super Integer> sink = new ArrayList<Number>(); sink.add(42); // Safe!"
  }
];

export default topic8_questions;