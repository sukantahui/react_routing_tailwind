const topic5_questions = [
  {
    "question": "Why should you use orElseGet() instead of orElse() when creating a new domain object as fallback?",
    "shortAnswer": "Because orElseGet(Supplier) defers object instantiation until absence is confirmed, whereas orElse(new Object()) allocates a new object on the heap every single time regardless of whether the Optional is empty.",
    "explanation": "Saves garbage collection overhead and avoids executing expensive constructors unnecessarily.",
    "hint": "Defers object instantiation until the Optional is confirmed empty.",
    "level": "Intermediate",
    "codeExample": "opt.orElseGet(() → new HeavyStudentDTO());"
  },
  {
    "question": "What functional interface is accepted by orElseGet()?",
    "shortAnswer": "java.util.function.Supplier<? extends T>, which takes zero arguments and returns an instance of type T.",
    "explanation": "Matches lambda syntax () → compute().",
    "hint": "Supplier<? extends T>",
    "level": "Beginner",
    "codeExample": "Supplier<String> fallback = () → 'Default';"
  }
];

export default topic5_questions;
