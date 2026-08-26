const topic10_questions = [
  {
    "question": "Can an annotation element declare a return type of List<String> or Map<String, String>?",
    "shortAnswer": "No! The Java compiler strictly forbids generic Collections as annotation element return types. You must use a 1-dimensional array (String[]) instead.",
    "explanation": "Enforced to keep annotation metadata simple and statically evaluable.",
    "hint": "No, Collections are forbidden; use 1D arrays like String[] instead.",
    "level": "Beginner",
    "codeExample": "// BAD: List<String> tags();\\n// GOOD: String[] tags();"
  },
  {
    "question": "Are 2D arrays (such as String[][]) allowed as annotation element types?",
    "shortAnswer": "No. Only 1-dimensional arrays of the supported types are permitted in annotation declarations.",
    "explanation": "Multidimensional arrays violate the annotation grammar specification.",
    "hint": "No, only 1D arrays are permitted.",
    "level": "Intermediate",
    "codeExample": "int[] ids(); // Legal\\nint[][] matrix(); // COMPILE ERROR!"
  }
];

export default topic10_questions;
