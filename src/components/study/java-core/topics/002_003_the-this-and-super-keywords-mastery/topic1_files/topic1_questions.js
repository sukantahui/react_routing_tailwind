const topic1_questions = [
  {
    question: "What is Variable Shadowing in Java?",
    shortAnswer: "When a local variable or constructor/method parameter declares the exact same identifier name as an instance variable, hiding (shadowing) the instance variable in that scope.",
    explanation: "Inside that method body, unqualified references to the name resolve to the closest local scope (the parameter) rather than the instance variable.",
    hint: "Local parameter hides instance variable with identical name.",
    level: "Beginner",
    codeExample: "class Student { int age; Student(int age) { this.age = age; } }"
  },
  {
    question: "What happens if you write 'name = name;' in a constructor when parameter and field share the name 'name'?",
    shortAnswer: "It assigns the local parameter to itself (a no-op); the instance variable on the Heap remains at its default value (null or 0).",
    explanation: "This is the classic beginner bug: field remains uninitialized because the parameter was assigned to itself.",
    hint: "Parameter assigns to itself; field remains default null/0.",
    level: "Beginner",
    codeExample: "public Student(String name) { name = name; // BUG! Field remains null }"
  },
  {
    question: "How does the 'this' keyword resolve variable shadowing?",
    shortAnswer: "By qualifying the instance variable with 'this.' (e.g. 'this.name = name;'), directing the compiler to target the Heap instance field.",
    explanation: "'this.name' unambiguously references the instance field, while 'name' references the local parameter.",
    hint: "this.fieldName = parameterName.",
    level: "Beginner",
    codeExample: "public Student(String name) { this.name = name; // Correct! }"
  }
];

export default topic1_questions;