export default [
  {
    question: "When is a constructor invoked in Java?",
    answer: "A constructor is invoked automatically and implicitly at the exact moment when an object of a class is instantiated using the `new` operator. It cannot be explicitly invoked on an already created object via the dot operator.",
    marks: 2,
    hint: "Think about the lifecycle moment when memory is allocated."
  },
  {
    question: "How many times does a constructor execute for a single object instance?",
    options: ["Exactly once upon instantiation", "Multiple times whenever a method is called", "Continuously in the background", "Twice"],
    correctAnswer: 0,
    explanation: "A constructor executes exactly once during the creation and memory allocation of that particular object instance.",
    marks: 1
  },
  {
    question: "Can you call a constructor directly using an object reference like `s1.Student()` in Java?",
    options: ["No, it results in a compile-time error.", "Yes, to re-initialize the object.", "Yes, if the constructor is public.", "Only inside main()."],
    correctAnswer: 0,
    explanation: "Constructors cannot be invoked explicitly on existing objects; they are only triggered during object construction with `new`.",
    marks: 1
  },
  {
    question: "What is the output of the following Java snippet?\nclass Box {\n    Box() {\n        System.out.print(\"Created \");\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        Box b1 = new Box();\n        Box b2 = new Box();\n    }\n}",
    options: ["Created Created ", "Created ", "No output", "Compilation error"],
    correctAnswer: 0,
    explanation: "Since two objects are instantiated with `new Box()`, the constructor executes automatically twice, printing 'Created Created '.",
    marks: 2
  }
];
