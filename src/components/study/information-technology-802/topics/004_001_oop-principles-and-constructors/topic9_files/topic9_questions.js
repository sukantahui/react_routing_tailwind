export default [
  {
    question: "What is the output of the following Java program?\nclass Sample {\n    int a;\n    Sample() {\n        a = 10;\n    }\n    Sample(int x) {\n        a = x * 2;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Sample s1 = new Sample();\n        Sample s2 = new Sample(5);\n        System.out.println(s1.a + \" \" + s2.a);\n    }\n}",
    options: ["10 10", "10 5", "0 10", "10 0"],
    correctAnswer: 0,
    explanation: "s1 uses the default constructor (a=10). s2 uses the parameterized constructor (a=5*2=10). Output is '10 10'.",
    marks: 2
  },
  {
    question: "Which of the following constructor declarations is INVALID in class `Product`?",
    options: [
      "void Product() { ... } (Invalid: specifies return type void)",
      "Product() { ... }",
      "Product(int code) { ... }",
      "Product(String name, double price) { ... }"
    ],
    correctAnswer: 0,
    explanation: "`void Product()` has a return type and is therefore treated as a regular method, not a valid constructor.",
    marks: 1
  },
  {
    question: "What happens if you attempt to access a `private` field from another class directly?",
    options: [
      "Compile-time error: variable has private access in class",
      "Runtime NullPointerException",
      "Field is accessed with default value 0",
      "Security warning but runs"
    ],
    correctAnswer: 0,
    explanation: "Private variables are strictly shielded from direct access outside their declaring class, triggering a compile error.",
    marks: 1
  }
];
