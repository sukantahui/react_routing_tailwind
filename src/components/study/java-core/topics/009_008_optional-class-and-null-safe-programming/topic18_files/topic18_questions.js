const topic18_questions = [
  {
    "question": "How does the monadic chain opt.map(A::getB).map(B::getC).orElse('Default') eliminate nested if-null checks?",
    "shortAnswer": "If getB() or getC() returns null at any point, map() automatically converts the intermediate state to Optional.empty(), safely bypassing all subsequent map calls and returning the fallback value directly.",
    "explanation": "Provides 100% null safety in a single readable line.",
    "hint": "Propagates empty state automatically across the entire navigation chain.",
    "level": "Intermediate",
    "codeExample": "opt.map(User::getAddress).map(Address::getCity).orElse('Unknown');"
  },
  {
    "question": "What is the primary benefit of Null-Safe Functional Architecture for team maintainability?",
    "shortAnswer": "It makes absence handling explicit and mandatory in the type system, reducing production bug reports, eliminating defensive if-null boilerplate, and creating self-documenting code.",
    "explanation": "Dramatically reduces codebase complexity and technical debt.",
    "hint": "Eliminates defensive boilerplate and ensures type-safe absence handling.",
    "level": "Beginner",
    "codeExample": "Clean declarative code with zero NullPointerExceptions."
  }
];

export default topic18_questions;
