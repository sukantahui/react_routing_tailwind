export default [
  {
    question: "What is constructor overloading in Java?",
    answer: "Constructor overloading is a technique in Java class design where a single class defines multiple constructors with the same name (the class name) but differing in their parameter list (number of parameters, types of parameters, or order of parameters). This provides multiple ways to initialize objects.",
    marks: 2,
    hint: "Multiple constructors in the same class with different parameters."
  },
  {
    question: "Which criteria distinguish overloaded constructors from each other?",
    options: [
      "The number, data types, and sequence of parameters in their parameter lists.",
      "The return type specified in the header.",
      "The access modifiers (public vs private).",
      "The names of local variables inside the constructor body."
    ],
    correctAnswer: 0,
    explanation: "Overloaded constructors are differentiated solely by their parameter signatures (number, type, and order of parameters).",
    marks: 1
  },
  {
    question: "Which Java keyword is used to call one constructor from another constructor within the same class?",
    options: ["this() keyword", "super() keyword", "new keyword", "call() keyword"],
    correctAnswer: 0,
    explanation: "The `this()` constructor call is used for explicit constructor chaining within the same class and must be the first statement in the constructor.",
    marks: 1
  },
  {
    question: "What is the result of the following Java class design?\npublic class Item {\n    int code;\n    Item() { code = 10; }\n    Item(int c) { code = c; }\n    Item(String s) { code = Integer.parseInt(s); }\n}",
    options: [
      "Valid constructor overloading; allows instantiating Item with 0 arguments, an int argument, or a String argument.",
      "Compilation error because all constructors have the same name.",
      "Runtime exception.",
      "Only the first constructor will be executed."
    ],
    correctAnswer: 0,
    explanation: "This is a clean, textbook implementation of constructor overloading with distinct parameter types.",
    marks: 1
  }
];
