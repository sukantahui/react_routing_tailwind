const questions = [
  {
    id: 1,
    question: "What form of polymorphism is Constructor Overloading in Java?",
    options: [
      "Runtime Polymorphism (Dynamic Binding)",
      "Compile-Time Polymorphism (Static Binding)",
      "Inheritance Abstraction",
      "Encapsulated Data Binding"
    ],
    correctAnswer: 1,
    explanation: "Constructor overloading is resolved at compile time based on parameter signatures, making it Compile-Time Polymorphism."
  },
  {
    id: 2,
    question: "Which of the following constructor signatures correctly overloads 'Demo(int x)'?",
    options: [
      "public void Demo(int x)",
      "Demo(int y)",
      "Demo(double x)",
      "private Demo(int z)"
    ],
    correctAnswer: 2,
    explanation: "Demo(double x) has a different data type (double vs int), validly overloading Demo(int x). Changing parameter names or return types alone is invalid."
  },
  {
    id: 3,
    question: "Can a class have 3 constructors with signatures () , (int) , and (double, int)?",
    options: [
      "Yes, because all 3 have different numbers or types of parameters.",
      "No, a Java class can have at most 2 constructors.",
      "No, constructors cannot mix int and double parameter types.",
      "Yes, but only if they belong to different subclasses."
    ],
    correctAnswer: 0,
    explanation: "Java allows any number of overloaded constructors as long as their parameter lists differ in count, sequence, or data types."
  }
];

export default questions;
