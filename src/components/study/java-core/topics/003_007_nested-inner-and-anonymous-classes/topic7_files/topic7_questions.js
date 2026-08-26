const topic7_questions = [
  {
    "question": "What is a Method-Local Inner Class and what are its scope boundaries in Java?",
    "shortAnswer": "A Method-Local Inner Class is a class defined completely inside a method block. It is only visible and instantiable within that specific method execution. It can access outer class members as well as local method variables, provided those local variables are 'final' or 'effectively final'.",
    "explanation": "Method-local classes cannot have access modifiers (public, private, protected) or be declared static.",
    "hint": "Declared inside a method body; scoped only to that method.",
    "level": "Intermediate",
    "codeExample": "void m() { class LocalHelper { ... } new LocalHelper().run(); }"
  }
];

export default topic7_questions;