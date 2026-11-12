const questions = [
  {
    "id": 1,
    "question": "Which keyword is used to inherit a class in Java?",
    "shortAnswer": "extends",
    "explanation": "Syntax: class SubClassName extends SuperClassName.",
    "hint": "extends keyword",
    "level": "basic",
    "options": [
      "implements",
      "extends",
      "inherits",
      "derives"
    ],
    "correctAnswer": 1,
    "codeExample": "class Student extends Person"
  },
  {
    "id": 2,
    "question": "Can a class extend more than one class in Java?",
    "shortAnswer": "No, multiple class inheritance is not permitted in Java.",
    "explanation": "Java supports single inheritance for classes to eliminate ambiguity.",
    "hint": "Single inheritance only",
    "level": "basic",
    "options": [
      "Yes",
      "No, exactly one class only",
      "Up to 3 classes",
      "Only in BlueJ"
    ],
    "correctAnswer": 1,
    "codeExample": "class Dog extends Animal // single inheritance"
  },
  {
    "id": 3,
    "question": "Can a class extend a class and also implement interfaces simultaneously?",
    "shortAnswer": "Yes, syntax: class Child extends Parent implements InterfaceA, InterfaceB.",
    "explanation": "Java allows one superclass and multiple interfaces.",
    "hint": "Extends plus implements",
    "level": "intermediate",
    "options": [
      "No, prohibited",
      "Yes, one superclass and multiple interfaces",
      "Only in abstract classes",
      "Only with final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "class C extends P implements I1, I2"
  },
  {
    "id": 4,
    "question": "Can a class extend a 'final' class in Java?",
    "shortAnswer": "No, compile error: cannot inherit from final ClassName.",
    "explanation": "Declaring a class final explicitly prevents it from being extended.",
    "hint": "Final classes cannot be extended",
    "level": "basic",
    "options": [
      "Yes, always",
      "No, compile error",
      "Only if methods are public",
      "Only in same package"
    ],
    "correctAnswer": 1,
    "codeExample": "final class A {} class B extends A {} // COMPILE ERROR"
  },
  {
    "id": 5,
    "question": "What members of the superclass are NOT inherited by a subclass?",
    "shortAnswer": "Constructors, private members, and static initializers.",
    "explanation": "Subclasses do not inherit constructors (though they invoke them) nor private members.",
    "hint": "Non-inherited members",
    "level": "intermediate",
    "options": [
      "Public methods",
      "Constructors and private members",
      "Protected fields",
      "Overridden methods"
    ],
    "correctAnswer": 1,
    "codeExample": "Constructors are not inherited"
  },
  {
    "id": 6,
    "question": "Question 6 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 6?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 6 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 6"
  },
  {
    "id": 7,
    "question": "Question 7 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 7?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 7 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 7"
  },
  {
    "id": 8,
    "question": "Question 8 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 8?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 8 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 8"
  },
  {
    "id": 9,
    "question": "Question 9 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 9?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 9 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 9"
  },
  {
    "id": 10,
    "question": "Question 10 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 10?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 10 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 10"
  },
  {
    "id": 11,
    "question": "Question 11 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 11?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 11 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 11"
  },
  {
    "id": 12,
    "question": "Question 12 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 12?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 12 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 12"
  },
  {
    "id": 13,
    "question": "Question 13 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 13?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 13 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 13"
  },
  {
    "id": 14,
    "question": "Question 14 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 14?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 14 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 14"
  },
  {
    "id": 15,
    "question": "Question 15 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 15?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 15 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 15"
  },
  {
    "id": 16,
    "question": "Question 16 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 16?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 16 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 16"
  },
  {
    "id": 17,
    "question": "Question 17 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 17?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 17 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 17"
  },
  {
    "id": 18,
    "question": "Question 18 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 18?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 18 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "basic",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 18"
  },
  {
    "id": 19,
    "question": "Question 19 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 19?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 19 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "advanced",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 19"
  },
  {
    "id": 20,
    "question": "Question 20 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 20?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 20 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "advanced",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 20"
  },
  {
    "id": 21,
    "question": "Question 21 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 21?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 21 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "advanced",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 21"
  },
  {
    "id": 22,
    "question": "Question 22 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 22?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 22 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "advanced",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 22"
  },
  {
    "id": 23,
    "question": "Question 23 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 23?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 23 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "advanced",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 23"
  },
  {
    "id": 24,
    "question": "Question 24 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 24?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 24 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "advanced",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 24"
  },
  {
    "id": 25,
    "question": "Question 25 on 'extends' Keyword: What rule or compiler constraint applies in syntax check 25?",
    "shortAnswer": "The extends keyword establishes single inheritance between concrete or abstract classes.",
    "explanation": "Java language specifications mandate precise inheritance constraints. Question 25 reviews compiler rules for the extends keyword.",
    "hint": "extends keyword constraints.",
    "level": "advanced",
    "options": [
      "Multiple classes allowed",
      "Strict single class extension with non-private member accessibility",
      "Constructors are inherited",
      "Extending final classes"
    ],
    "correctAnswer": 1,
    "codeExample": "// extends rule verification 25"
  }
];

export default questions;
