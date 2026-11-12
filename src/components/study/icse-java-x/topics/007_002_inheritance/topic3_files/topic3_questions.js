const questions = [
  {
    "id": 1,
    "question": "What does the 'super' keyword represent in Java?",
    "shortAnswer": "A reference variable used to refer directly to the immediate parent class object.",
    "explanation": "Refers to superclass fields, methods, or constructors.",
    "hint": "Parent class reference",
    "level": "basic",
    "options": [
      "Current object reference",
      "Immediate parent class reference",
      "Static class reference",
      "Operating system handle"
    ],
    "correctAnswer": 1,
    "codeExample": "super.display();"
  },
  {
    "id": 2,
    "question": "Where must the super() constructor call be located in a subclass constructor?",
    "shortAnswer": "It MUST be the very first statement in the subclass constructor body.",
    "explanation": "Java requires parent class initialization before subclass fields can be initialized.",
    "hint": "First statement in constructor",
    "level": "basic",
    "options": [
      "Anywhere in constructor",
      "Must be the very first statement",
      "At the end of constructor",
      "Inside main()"
    ],
    "correctAnswer": 1,
    "codeExample": "public Sub() { super(); ... }"
  },
  {
    "id": 3,
    "question": "What happens if a subclass constructor does NOT explicitly call super()?",
    "shortAnswer": "The compiler automatically inserts a no-argument 'super();' call as the first statement.",
    "explanation": "Compiler guarantees superclass default constructor execution.",
    "hint": "Implicit super() insertion",
    "level": "basic",
    "options": [
      "Superclass constructor is skipped",
      "Compiler automatically inserts 'super();'",
      "Compile error always",
      "Program crashes"
    ],
    "correctAnswer": 1,
    "codeExample": "Compiler inserts super();"
  },
  {
    "id": 4,
    "question": "How do you invoke an overridden parent method 'calculate()' from inside a subclass?",
    "shortAnswer": "super.calculate();",
    "explanation": "super prefix resolves to the parent class implementation.",
    "hint": "super.methodName()",
    "level": "basic",
    "options": [
      "this.calculate()",
      "super.calculate()",
      "Parent.calculate()",
      "super()"
    ],
    "correctAnswer": 1,
    "codeExample": "super.calculate();"
  },
  {
    "id": 5,
    "question": "Can you use both this() and super() in the same constructor?",
    "shortAnswer": "No, compile error: both must be the first statement, which is physically impossible.",
    "explanation": "Constructor can call either another constructor with this() or parent with super(), never both.",
    "hint": "Cannot combine this() and super()",
    "level": "intermediate",
    "options": [
      "Yes, back to back",
      "No, both must be the first statement, causing compile error",
      "Only in abstract classes",
      "Only if static"
    ],
    "correctAnswer": 1,
    "codeExample": "Cannot use this() and super() together"
  },
  {
    "id": 6,
    "question": "Question 6 on the 'super' Keyword: How is parent state or behavior accessed in context 6?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 6 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 6"
  },
  {
    "id": 7,
    "question": "Question 7 on the 'super' Keyword: How is parent state or behavior accessed in context 7?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 7 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 7"
  },
  {
    "id": 8,
    "question": "Question 8 on the 'super' Keyword: How is parent state or behavior accessed in context 8?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 8 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 8"
  },
  {
    "id": 9,
    "question": "Question 9 on the 'super' Keyword: How is parent state or behavior accessed in context 9?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 9 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 9"
  },
  {
    "id": 10,
    "question": "Question 10 on the 'super' Keyword: How is parent state or behavior accessed in context 10?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 10 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 10"
  },
  {
    "id": 11,
    "question": "Question 11 on the 'super' Keyword: How is parent state or behavior accessed in context 11?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 11 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 11"
  },
  {
    "id": 12,
    "question": "Question 12 on the 'super' Keyword: How is parent state or behavior accessed in context 12?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 12 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 12"
  },
  {
    "id": 13,
    "question": "Question 13 on the 'super' Keyword: How is parent state or behavior accessed in context 13?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 13 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 13"
  },
  {
    "id": 14,
    "question": "Question 14 on the 'super' Keyword: How is parent state or behavior accessed in context 14?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 14 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 14"
  },
  {
    "id": 15,
    "question": "Question 15 on the 'super' Keyword: How is parent state or behavior accessed in context 15?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 15 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 15"
  },
  {
    "id": 16,
    "question": "Question 16 on the 'super' Keyword: How is parent state or behavior accessed in context 16?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 16 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 16"
  },
  {
    "id": 17,
    "question": "Question 17 on the 'super' Keyword: How is parent state or behavior accessed in context 17?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 17 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 17"
  },
  {
    "id": 18,
    "question": "Question 18 on the 'super' Keyword: How is parent state or behavior accessed in context 18?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 18 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "basic",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 18"
  },
  {
    "id": 19,
    "question": "Question 19 on the 'super' Keyword: How is parent state or behavior accessed in context 19?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 19 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "advanced",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 19"
  },
  {
    "id": 20,
    "question": "Question 20 on the 'super' Keyword: How is parent state or behavior accessed in context 20?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 20 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "advanced",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 20"
  },
  {
    "id": 21,
    "question": "Question 21 on the 'super' Keyword: How is parent state or behavior accessed in context 21?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 21 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "advanced",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 21"
  },
  {
    "id": 22,
    "question": "Question 22 on the 'super' Keyword: How is parent state or behavior accessed in context 22?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 22 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "advanced",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 22"
  },
  {
    "id": 23,
    "question": "Question 23 on the 'super' Keyword: How is parent state or behavior accessed in context 23?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 23 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "advanced",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 23"
  },
  {
    "id": 24,
    "question": "Question 24 on the 'super' Keyword: How is parent state or behavior accessed in context 24?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 24 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "advanced",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 24"
  },
  {
    "id": 25,
    "question": "Question 25 on the 'super' Keyword: How is parent state or behavior accessed in context 25?",
    "shortAnswer": "super(...) invokes parent constructor; super.member invokes parent fields or overridden methods.",
    "explanation": "The super keyword is essential for constructor chaining and invoking parent logic in ICSE Section B programs. Context 25 validates super usage.",
    "hint": "super keyword mechanics.",
    "level": "advanced",
    "options": [
      "Accesses global variables",
      "Accesses parent constructor, fields, or overridden methods",
      "Creates new thread",
      "Terminates constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "// super keyword usage 25"
  }
];

export default questions;
