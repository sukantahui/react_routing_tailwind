const topic8_questions = [
  {
    "question": "Can an element method in a custom annotation declare parameters (e.g. String title(int id))?",
    "shortAnswer": "No! All methods in an annotation declaration must have zero parameters. Declaring parameters produces a compile-time error.",
    "explanation": "Annotation attributes are declarative properties, not dynamic functions.",
    "hint": "Zero parameters are allowed in annotation methods.",
    "level": "Beginner",
    "codeExample": "public @interface Invalid { String value(int id); // COMPILE ERROR! }"
  },
  {
    "question": "Can an annotation explicitly extend another annotation (e.g. @interface SubAnn extends BaseAnn)?",
    "shortAnswer": "No. Java syntax does not allow annotations to use the 'extends' keyword. All annotations implicitly extend java.lang.annotation.Annotation.",
    "explanation": "Inheritance between annotations is not supported in Java.",
    "hint": "No, annotations cannot extend other annotations.",
    "level": "Intermediate",
    "codeExample": "public @interface MyAnn {} // Implicitly extends java.lang.annotation.Annotation"
  }
];

export default topic8_questions;
