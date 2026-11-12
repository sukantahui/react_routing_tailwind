const questions = [
  {
    "id": 1,
    "question": "What is Inheritance in Java OOP?",
    "shortAnswer": "The mechanism where a new class derives properties and behaviors from an existing class.",
    "explanation": "Enables code reuse and hierarchical classification.",
    "hint": "Code reusability mechanism",
    "level": "basic",
    "options": [
      "Hiding data members",
      "Deriving a child class from a parent class",
      "Creating multiple methods with same name",
      "Converting objects to primitives"
    ],
    "correctAnswer": 1,
    "codeExample": "class Student extends Person"
  },
  {
    "id": 2,
    "question": "What is another name for a Parent class in Java?",
    "shortAnswer": "Superclass or Base class.",
    "explanation": "Parent, Superclass, and Base class are synonymous terms.",
    "hint": "Superclass or Base class",
    "level": "basic",
    "options": [
      "Subclass",
      "Superclass (Base class)",
      "Derived class",
      "Child class"
    ],
    "correctAnswer": 1,
    "codeExample": "class Parent {} // Superclass"
  },
  {
    "id": 3,
    "question": "What is another name for a Child class in Java?",
    "shortAnswer": "Subclass or Derived class.",
    "explanation": "Child, Subclass, and Derived class are interchangeable terms.",
    "hint": "Subclass or Derived class",
    "level": "basic",
    "options": [
      "Superclass",
      "Subclass (Derived class)",
      "Base class",
      "Root class"
    ],
    "correctAnswer": 1,
    "codeExample": "class Child extends Parent {} // Subclass"
  },
  {
    "id": 4,
    "question": "What is the cosmic superclass of all classes in Java?",
    "shortAnswer": "java.lang.Object",
    "explanation": "Every class in Java directly or indirectly inherits from java.lang.Object.",
    "hint": "java.lang.Object class",
    "level": "basic",
    "options": [
      "java.lang.Class",
      "java.lang.Object",
      "java.lang.System",
      "java.lang.String"
    ],
    "correctAnswer": 1,
    "codeExample": "Object obj;"
  },
  {
    "id": 5,
    "question": "Does Java support multiple inheritance of classes using 'extends'?",
    "shortAnswer": "No, Java prohibits multiple class inheritance to avoid ambiguity (the Diamond Problem).",
    "explanation": "A class can extend only ONE superclass.",
    "hint": "Diamond problem prevention",
    "level": "basic",
    "options": [
      "Yes, using commas",
      "No, Java only supports single class inheritance",
      "Only if both are abstract",
      "Only in Java 8+"
    ],
    "correctAnswer": 1,
    "codeExample": "class C extends A, B // COMPILE ERROR!"
  },
  {
    "id": 6,
    "question": "Question 6 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 6?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 6 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 6: IS-A relationship"
  },
  {
    "id": 7,
    "question": "Question 7 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 7?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 7 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 7: IS-A relationship"
  },
  {
    "id": 8,
    "question": "Question 8 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 8?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 8 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 8: IS-A relationship"
  },
  {
    "id": 9,
    "question": "Question 9 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 9?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 9 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 9: IS-A relationship"
  },
  {
    "id": 10,
    "question": "Question 10 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 10?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 10 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 10: IS-A relationship"
  },
  {
    "id": 11,
    "question": "Question 11 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 11?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 11 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 11: IS-A relationship"
  },
  {
    "id": 12,
    "question": "Question 12 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 12?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 12 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 12: IS-A relationship"
  },
  {
    "id": 13,
    "question": "Question 13 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 13?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 13 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 13: IS-A relationship"
  },
  {
    "id": 14,
    "question": "Question 14 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 14?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 14 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 14: IS-A relationship"
  },
  {
    "id": 15,
    "question": "Question 15 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 15?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 15 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 15: IS-A relationship"
  },
  {
    "id": 16,
    "question": "Question 16 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 16?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 16 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 16: IS-A relationship"
  },
  {
    "id": 17,
    "question": "Question 17 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 17?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 17 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 17: IS-A relationship"
  },
  {
    "id": 18,
    "question": "Question 18 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 18?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 18 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "intermediate",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 18: IS-A relationship"
  },
  {
    "id": 19,
    "question": "Question 19 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 19?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 19 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "advanced",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 19: IS-A relationship"
  },
  {
    "id": 20,
    "question": "Question 20 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 20?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 20 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "advanced",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 20: IS-A relationship"
  },
  {
    "id": 21,
    "question": "Question 21 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 21?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 21 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "advanced",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 21: IS-A relationship"
  },
  {
    "id": 22,
    "question": "Question 22 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 22?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 22 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "advanced",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 22: IS-A relationship"
  },
  {
    "id": 23,
    "question": "Question 23 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 23?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 23 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "advanced",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 23: IS-A relationship"
  },
  {
    "id": 24,
    "question": "Question 24 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 24?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 24 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "advanced",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 24: IS-A relationship"
  },
  {
    "id": 25,
    "question": "Question 25 on Superclass/Subclass Relationships: How is the IS-A relationship validated in hierarchy 25?",
    "shortAnswer": "Subclasses inherit non-private members of superclasses, forming an IS-A relationship.",
    "explanation": "Inheritance represents an IS-A relationship (e.g. Student IS-A Person). Question 25 reviews class hierarchy design in ICSE Java.",
    "hint": "IS-A hierarchical inheritance.",
    "level": "advanced",
    "options": [
      "HAS-A relationship",
      "IS-A inheritance relationship",
      "USES-A relationship",
      "PART-OF relationship"
    ],
    "correctAnswer": 1,
    "codeExample": "// Hierarchy 25: IS-A relationship"
  }
];

export default questions;
