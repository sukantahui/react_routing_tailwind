const topic11_questions = [
  {
    "question": "How does the Facade pattern differ from the Adapter pattern?",
    "shortAnswer": "An Adapter converts an existing incompatible interface into a specific target interface so two systems can communicate. A Facade defines a new, simplified high-level interface that aggregates and hides the complexity of multiple subsystem classes.",
    "explanation": "Interface translation vs subsystem simplification.",
    "hint": "Adapter translates interfaces; Facade simplifies multiple subsystem APIs.",
    "level": "Intermediate",
    "codeExample": "Facade: unified simple API over complex subsystem."
  },
  {
    "question": "Does the Facade pattern prevent clients from accessing low-level subsystem classes directly if needed?",
    "shortAnswer": "No, a Facade provides a convenient simplified view, but does not encapsulate or hide subsystem classes behind an impenetrable wall; power users can still access individual subsystem classes directly.",
    "explanation": "Provides convenience without restricting granular access.",
    "hint": "Does not restrict direct access to subsystem components.",
    "level": "Intermediate",
    "codeExample": "Facade provides a default high-level path without blocking lower layers."
  }
];

export default topic11_questions;
