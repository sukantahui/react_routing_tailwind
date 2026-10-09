export default [
  {
    question: "State any three major differences between a Constructor and a Method in Java.",
    answer: "1. Purpose: A constructor is used to initialize the instance variables of an object, whereas a method is used to perform specific operations and implement behavior.\n2. Return Type: A constructor has NO return type (not even void), whereas a method MUST specify a return type or void.\n3. Invocation: A constructor is invoked automatically by the `new` operator during object creation, whereas a method is called explicitly using the dot operator (e.g. `obj.display()`).",
    marks: 3,
    hint: "Recall Purpose, Return Type, and Invocation differences."
  },
  {
    question: "Can a constructor be inherited by a subclass in Java?",
    options: [
      "No, constructors are not inherited by subclasses, though a subclass constructor can invoke a superclass constructor via `super()`.",
      "Yes, all constructors are inherited just like regular public methods.",
      "Yes, but only if they are marked final.",
      "Yes, if they are static."
    ],
    correctAnswer: 0,
    explanation: "Constructors are not members of a class in the normal sense and cannot be inherited by subclasses. Subclasses invoke parent constructors using `super()`.",
    marks: 1
  },
  {
    question: "Which keyword is used by a subclass constructor to call a superclass constructor?",
    options: ["super()", "this()", "parent()", "base()"],
    correctAnswer: 0,
    explanation: "In Java, `super(...)` is used to invoke a constructor belonging to the direct superclass.",
    marks: 1
  }
];
