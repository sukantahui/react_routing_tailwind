const topic1_questions = [
  {
    "question": "In the declaration '<T extends SuperType>', what does the term 'Upper Bound' mean?",
    "shortAnswer": "'Upper Bound' means that 'SuperType' is the highest permissible type (the ceiling) in the class hierarchy. The type argument provided at compile time must be either 'SuperType' itself or any of its direct or indirect subclasses/implementations. Any class higher up (like Object) or sibling classes outside the subtree are rejected.",
    "explanation": "Standard taxonomy for generic type boundaries.",
    "hint": "Sets the ceiling of the permissible hierarchy; type must be SuperType or a subtype thereof.",
    "level": "Beginner",
    "codeExample": "class Box<T extends Number> { ... } // Upper bound is Number"
  }
];

export default topic1_questions;