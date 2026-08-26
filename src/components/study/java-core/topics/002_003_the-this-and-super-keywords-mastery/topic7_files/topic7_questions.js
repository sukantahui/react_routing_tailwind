const topic7_questions = [
  {
    question: "Why does Java prohibit the use of 'this' inside static methods and static blocks?",
    shortAnswer: "Because static members belong to the class in Metaspace and execute without any Heap instance; there is no object instance in slot 0 to point to.",
    explanation: "Static methods are called via 'ClassName.method()'. Since zero instances may exist, referencing 'this' is conceptually and mechanically impossible.",
    hint: "Static context has no Heap instance and no slot 0 receiver.",
    level: "Beginner",
    codeExample: "// Compile Error: static void run() { System.out.println(this); }"
  }
];

export default topic7_questions;