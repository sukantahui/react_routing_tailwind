const questions = [
  {
    id: 1,
    question: "Which of the following is a major structural difference between a constructor and a member method?",
    options: [
      "A constructor cannot accept arguments, whereas a method can.",
      "A constructor MUST NOT specify any return type, whereas a method MUST specify a return type.",
      "A constructor is stored in Stack memory, whereas a method is stored on Heap memory.",
      "A constructor must be private, whereas a method must be public."
    ],
    correctAnswer: 1,
    explanation: "Constructors never specify a return type (not even void), whereas member methods must specify a return type (void, primitive, or reference)."
  },
  {
    id: 2,
    question: "How is a constructor invoked compared to a regular member method?",
    options: [
      "Constructors are called using dot notation (obj.Constructor()), while methods are called automatically.",
      "Constructors are invoked automatically during 'new' object creation, while methods are invoked explicitly via dot notation.",
      "Both constructors and methods are invoked automatically at system boot.",
      "Constructors can only be invoked from static main() methods."
    ],
    correctAnswer: 1,
    explanation: "Constructors run automatically during 'new' instantiation, whereas methods require explicit invocation using obj.methodName()."
  },
  {
    id: 3,
    question: "Are constructors inherited by subclasses in Java?",
    options: [
      "Yes, all constructors are inherited by subclasses.",
      "No, constructors are NOT inherited by subclasses, though superclass constructors can be called via super().",
      "Only parameterized constructors are inherited.",
      "Only default constructors are inherited."
    ],
    correctAnswer: 1,
    explanation: "Constructors belong to the class in which they are declared and are NOT inherited by subclasses."
  }
];

export default questions;
