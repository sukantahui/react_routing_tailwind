const topic19_questions = [
  {
    "question": "What is the 'God Object' (Blob) anti-pattern and how should it be remediated?",
    "shortAnswer": "A God Object is a massive class that knows or does too much, accumulating hundreds of responsibilities and monopolizing system processing. It should be refactored into cohesive, single-responsibility classes (Services, DAOs, Validators).",
    "explanation": "Major violation of Single Responsibility Principle.",
    "hint": "A monster class that attempts to do everything across all layers.",
    "level": "Beginner",
    "codeExample": "Refactor GodClass into UserService, UserDao, and UserValidator."
  },
  {
    "question": "What is 'Premature Patternization' and why is it harmful?",
    "shortAnswer": "Introducing complex design patterns, multiple layers of abstraction, and speculative generic factories before a concrete problem exists, resulting in unreadable code, excessive cognitive load, and slowed development velocity.",
    "explanation": "Violates KISS and YAGNI principles.",
    "hint": "Adding unnecessary pattern complexity before a clear problem justifies it.",
    "level": "Beginner",
    "codeExample": "Writing 10 classes for a simple string concatenation."
  }
];

export default topic19_questions;
