export default [
  {
    question: "What is a constructor in Java?",
    answer: "A constructor in Java is a special member block/method that has the exact same name as the class and has NO return type (not even void). It is automatically invoked whenever an object of that class is instantiated using the `new` operator, primarily to initialize the instance variables of the object.",
    marks: 2,
    hint: "Same name as class, no return type, initializes instance variables."
  },
  {
    question: "Which of the following is TRUE about Java constructors?",
    options: [
      "A constructor must have the same name as the class and cannot have any return type, not even void.",
      "A constructor must always return an int status code.",
      "A constructor is called manually like `s1.Student();`.",
      "A constructor cannot accept parameters."
    ],
    correctAnswer: 0,
    explanation: "Constructors strictly share the class name, have no return type, and are automatically executed upon instantiation.",
    marks: 1
  },
  {
    question: "What happens if you write a return type like `void` before a constructor name, e.g., `void Student() { ... }`?",
    options: [
      "The Java compiler treats it as a regular member method, NOT a constructor.",
      "It causes a compilation syntax error.",
      "It becomes a default constructor.",
      "It runs automatically when object is created."
    ],
    correctAnswer: 0,
    explanation: "Adding a return type (even void) demotes the constructor to a regular member method. It will no longer execute automatically upon instantiation.",
    marks: 1
  },
  {
    question: "When is a constructor executed in Java?",
    options: [
      "Automatically at the exact moment when an object is created with `new`",
      "When the program terminates",
      "When the class is compiled",
      "Only when explicitly called with the dot operator"
    ],
    correctAnswer: 0,
    explanation: "Constructors are triggered automatically by the `new` operator during heap memory allocation.",
    marks: 1
  },
  {
    question: "State two primary purposes of a constructor in Java class design.",
    answer: "1. To initialize the state (instance variables) of newly created objects.\n2. To execute mandatory initial startup logic (such as opening database connections or logging initialization).",
    marks: 2,
    hint: "Initialization of object fields."
  }
];
