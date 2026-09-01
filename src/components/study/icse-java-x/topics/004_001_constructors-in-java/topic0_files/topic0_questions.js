const questions = [
  {
    id: 1,
    question: "What is the primary purpose of a constructor in Java?",
    options: [
      "To destroy unused objects from heap memory",
      "To initialize instance variables during object creation",
      "To compile Java source code into bytecode",
      "To return computed mathematical values to main()"
    ],
    correctAnswer: 1,
    explanation: "Constructors are special methods executed during object instantiation (using 'new') to initialize the object's instance variables."
  },
  {
    id: 2,
    question: "Which of the following is TRUE regarding Java constructors?",
    options: [
      "A constructor must have a 'void' return type.",
      "A constructor must have the exact same name as its class.",
      "A constructor can be called explicitly at any time like a regular method.",
      "A constructor is stored in the Stack memory frame."
    ],
    correctAnswer: 1,
    explanation: "A Java constructor MUST have the exact same name as its class and MUST NOT specify any return type."
  },
  {
    id: 3,
    question: "What happens if a developer writes: 'public void Student()' inside a Student class?",
    options: [
      "It acts as a default constructor.",
      "It results in a syntax error at compile-time.",
      "Java treats it as a regular member method, NOT a constructor.",
      "It causes a runtime NullPointerException."
    ],
    correctAnswer: 2,
    explanation: "Specifying any return type (even 'void') turns the constructor into a standard member method that won't be invoked automatically during 'new Student()'."
  },
  {
    id: 4,
    question: "When is a constructor invoked in Java?",
    options: [
      "When the class bytecode is loaded by the JVM",
      "Automatically when an object is instantiated using the 'new' operator",
      "When system garbage collection runs",
      "Only when explicitly called via object dot notation (obj.Constructor())"
    ],
    correctAnswer: 1,
    explanation: "The constructor is automatically called when memory is allocated for a new object using the 'new' keyword."
  }
];

export default questions;
