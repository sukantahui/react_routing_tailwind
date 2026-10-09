export default [
  {
    question: "What is the difference between a default constructor and a parameterized constructor in Java?",
    answer: "A default constructor (or no-argument constructor) takes no parameters and initializes instance variables with predefined default values (e.g. 0, null, or fixed literals). A parameterized constructor accepts arguments and initializes instance variables with custom values passed during object creation (e.g. `new Student(101, \"Mamata\")`).",
    marks: 2,
    hint: "No-args vs accepting custom parameters."
  },
  {
    question: "What happens if a programmer does not define any constructor in a Java class?",
    options: [
      "The Java compiler automatically provides a hidden, no-argument default constructor.",
      "The code fails to compile.",
      "Objects cannot be created from that class.",
      "The JVM throws a RuntimeException."
    ],
    correctAnswer: 0,
    explanation: "If no constructor is explicitly written in a class, the Java compiler automatically inserts a default no-argument constructor that sets fields to their default zero values.",
    marks: 1
  },
  {
    question: "What happens to the compiler-provided default constructor once a programmer defines a parameterized constructor in a class?",
    options: [
      "The compiler-provided default constructor is no longer generated; calling `new ClassName()` without parameters causes a compilation error unless explicitly written.",
      "The compiler continues to provide the default constructor.",
      "The parameterized constructor is ignored.",
      "A warning is shown but it runs."
    ],
    correctAnswer: 0,
    explanation: "Once you define any explicit constructor (e.g. parameterized), the Java compiler immediately stops providing the automatic default constructor.",
    marks: 1
  },
  {
    question: "Given `public class Item { int id; Item(int i) { id = i; } }`, what is the result of `Item item = new Item();`?",
    options: [
      "Compilation error: constructor Item() in class Item cannot be applied to given types; required: int; found: no arguments",
      "Item object created with id = 0",
      "NullPointerException",
      "Runs successfully"
    ],
    correctAnswer: 0,
    explanation: "Because an explicit parameterized constructor `Item(int)` exists, no default `Item()` exists, resulting in a compile-time error.",
    marks: 2
  }
];
