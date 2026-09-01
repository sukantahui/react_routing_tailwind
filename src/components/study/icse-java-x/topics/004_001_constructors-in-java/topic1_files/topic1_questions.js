const questions = [
  {
    id: 1,
    question: "What is the default value assigned to an uninitialized boolean instance variable by Java's default constructor?",
    options: [
      "true",
      "false",
      "null",
      "0"
    ],
    correctAnswer: 1,
    explanation: "Java's automatic default initialization sets boolean fields to false."
  },
  {
    id: 2,
    question: "What default value is assigned to an uninitialized String object reference field?",
    options: [
      "\"\"",
      "\"null\"",
      "null",
      "0"
    ],
    correctAnswer: 2,
    explanation: "All object reference variables (including String, arrays, and objects) default to null."
  },
  {
    id: 3,
    question: "When does the Java compiler automatically insert a default constructor into a class?",
    options: [
      "Always, for every class without exception",
      "Only when the developer writes at least one parameterized constructor",
      "Only when NO constructor of any type is declared in the class source code",
      "Never, Java does not support automatic constructors"
    ],
    correctAnswer: 2,
    explanation: "The compiler provides a default no-argument constructor ONLY if the programmer has defined ZERO constructors in the class."
  },
  {
    id: 4,
    question: "Consider: class Test { Test(int a) {} }. What is the result of writing 'Test t = new Test();'?",
    options: [
      "Executes normally with a default value for 'a'",
      "Compilation Error: constructor Test() is undefined",
      "Runtime NullPointerException",
      "Creates an empty object with all fields set to null"
    ],
    correctAnswer: 1,
    explanation: "Because an explicit parameterized constructor Test(int) was declared, Java removed the automatic default no-arg constructor, resulting in a compile-time error when calling new Test()."
  }
];

export default questions;
