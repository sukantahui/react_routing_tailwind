const topic4_questions = [
  {
    "question": "What happens if a developer places an annotation on a method when its @Target is restricted to ElementType.FIELD?",
    "shortAnswer": "The javac compiler emits a compile-time error: 'annotation not applicable to this kind of declaration'.",
    "explanation": "Enforces design constraints at compile time.",
    "hint": "Produces a compile-time error.",
    "level": "Beginner",
    "codeExample": "@Target(ElementType.FIELD) public @interface Column {}"
  },
  {
    "question": "What is the difference between ElementType.TYPE and ElementType.TYPE_USE?",
    "shortAnswer": "ElementType.TYPE applies strictly to type declarations (class, interface, enum, record), while ElementType.TYPE_USE can be applied anywhere a type is referenced, including generic type parameters, casts, and exception declarations.",
    "explanation": "TYPE_USE enables granular static type-checking annotations.",
    "hint": "TYPE is for class declarations; TYPE_USE is for any type reference including generics.",
    "level": "Intermediate",
    "codeExample": "List<@NonNull String> items; // Requires ElementType.TYPE_USE"
  }
];

export default topic4_questions;
