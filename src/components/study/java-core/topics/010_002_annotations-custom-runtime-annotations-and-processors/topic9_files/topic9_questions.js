const topic9_questions = [
  {
    "question": "When can the attribute name be omitted when applying an annotation?",
    "shortAnswer": "When the attribute is named 'value()' and it is the only attribute being assigned a value in the annotation declaration (e.g. @SuppressWarnings('unchecked')).",
    "explanation": "Standard Java syntactic sugar for single-element annotations.",
    "hint": "When the attribute is named value() and is the only attribute specified.",
    "level": "Beginner",
    "codeExample": "@Role('ADMIN') // Shortcut for @Role(value = 'ADMIN')"
  },
  {
    "question": "Can an annotation element default value be set to null (e.g. String name() default null)?",
    "shortAnswer": "No! The Java language specification strictly prohibits null as a default value (or as an assigned value) for annotation elements. Doing so causes a compile-time error.",
    "explanation": "Use empty strings ('') or sentinel enum values instead of null.",
    "hint": "No, null is never allowed in annotation attributes or defaults.",
    "level": "Intermediate",
    "codeExample": "String name() default ''; // Valid; default null is a COMPILE ERROR!"
  }
];

export default topic9_questions;
