export default [
  {
    question: "What is a class and what is an object in Java?",
    answer: "A class is a user-defined blueprint, template, or prototype from which objects are created. It defines the variables (attributes/state) and methods (behavior) that common objects share. An object is a concrete runtime instance of a class that occupies memory.",
    marks: 2,
    hint: "Blueprint vs concrete building."
  },
  {
    question: "Which operator is used to allocate memory and instantiate an object in Java?",
    options: ["new operator", "create operator", "alloc operator", "malloc operator"],
    correctAnswer: 0,
    explanation: "In Java, dynamic heap memory allocation and object creation are performed using the 'new' operator.",
    marks: 1
  },
  {
    question: "What are the two components of an object reference declaration statement like `Student s1 = new Student();`?",
    answer: "1. Declaration (`Student s1`): Declares a reference variable `s1` capable of holding the memory address of a `Student` object.\n2. Instantiation & Initialization (`new Student()`): `new` allocates memory on the heap and invokes the constructor `Student()` to initialize the object.",
    marks: 3,
    hint: "Reference variable on stack vs object instance on heap."
  },
  {
    question: "Where are objects stored in Java memory?",
    options: ["Heap Memory", "Stack Memory", "Code Segment", "Register Memory"],
    correctAnswer: 0,
    explanation: "All object instances created with the `new` operator reside in the Heap Memory area, while reference variables are stored on the Stack.",
    marks: 1
  },
  {
    question: "What is the default value assigned to object reference variables before initialization?",
    options: ["null", "0", "false", "undefined"],
    correctAnswer: 0,
    explanation: "Uninitialized reference variables have a default value of `null` in Java.",
    marks: 1
  }
];
