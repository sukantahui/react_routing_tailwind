const questions = [
  {
    "id": 1,
    "question": "What is Method Overriding in Java?",
    "shortAnswer": "When a subclass provides a specific implementation of a method already defined in its superclass.",
    "explanation": "Same method signature (name, parameter list, return type) in both classes.",
    "hint": "Subclass redefines parent method",
    "level": "basic",
    "options": [
      "Same name, different parameters in same class",
      "Same method signature in subclass as in superclass",
      "Private methods called outside",
      "Changing variable types"
    ],
    "correctAnswer": 1,
    "codeExample": "class Dog extends Animal { @Override void sound() {} }"
  },
  {
    "id": 2,
    "question": "How does Method Overriding differ from Method Overloading?",
    "shortAnswer": "Overriding involves same signature across parent-child classes; Overloading involves different parameters within the same class.",
    "explanation": "Run-time polymorphism vs compile-time polymorphism.",
    "hint": "Overriding vs Overloading",
    "level": "basic",
    "options": [
      "They are identical",
      "Overriding is across classes with same signature; Overloading is in same class with different parameters",
      "Overloading requires inheritance",
      "Overriding is static"
    ],
    "correctAnswer": 1,
    "codeExample": "Overriding = Dynamic / Runtime Polymorphism"
  },
  {
    "id": 3,
    "question": "Can a subclass override a 'static' method of its superclass?",
    "shortAnswer": "No, static methods cannot be overridden; they are hidden (method hiding).",
    "explanation": "Static methods are bound at compile-time by the class type.",
    "hint": "Static method hiding",
    "level": "intermediate",
    "options": [
      "Yes, normally",
      "No, static methods cannot be overridden (method hiding)",
      "Only if marked public",
      "Only in interfaces"
    ],
    "correctAnswer": 1,
    "codeExample": "Static methods are hidden, not overridden"
  },
  {
    "id": 4,
    "question": "Can a subclass override a 'final' method?",
    "shortAnswer": "No, compile error: cannot override final method from SuperClass.",
    "explanation": "final methods cannot be overridden.",
    "hint": "Final methods cannot be overridden",
    "level": "basic",
    "options": [
      "Yes",
      "No, compile error",
      "Only if super() is called",
      "Only in subclasses"
    ],
    "correctAnswer": 1,
    "codeExample": "final void show() {} // cannot be overridden"
  },
  {
    "id": 5,
    "question": "Can an overriding method in a subclass reduce the visibility of the superclass method?",
    "shortAnswer": "No, an overriding method cannot assign weaker access privileges (e.g. public to protected).",
    "explanation": "Subclass cannot reduce visibility of superclass method.",
    "hint": "Visibility cannot be reduced",
    "level": "advanced",
    "options": [
      "Yes, can make public private",
      "No, cannot assign weaker access privileges",
      "Only in same package",
      "Only with abstract methods"
    ],
    "correctAnswer": 1,
    "codeExample": "Cannot reduce visibility"
  },
  {
    "id": 6,
    "question": "Question 6 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 6?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 6 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 7?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 7 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 8?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 8 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 9?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 9 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 10?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 10 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 11?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 11 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 12?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 12 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 13?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 13 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 14?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 14 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 15?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 15 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 16?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 16 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 17?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 17 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 18?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 18 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "intermediate",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 19?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 19 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "advanced",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 20?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 20 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "advanced",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 21?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 21 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "advanced",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 22?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 22 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "advanced",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 23?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 23 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "advanced",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 24?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 24 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "advanced",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Method Overriding: What dynamic dispatch behavior occurs in execution trace 25?",
    "shortAnswer": "At runtime, the JVM invokes the method implementation corresponding to the actual object type, not the reference type.",
    "explanation": "Runtime Polymorphism (Dynamic Method Dispatch) determines method resolution in ICSE Java. Trace 25 examines overridden execution.",
    "hint": "Dynamic method dispatch.",
    "level": "advanced",
    "options": [
      "Always calls parent method",
      "JVM dynamically executes the overridden method of the actual instantiated object",
      "Throws compile error",
      "Randomly selects method"
    ],
    "correctAnswer": 1,
    "codeExample": "// Dynamic dispatch trace 25"
  }
];

export default questions;
