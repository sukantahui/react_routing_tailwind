const topic9_questions = [
  {
    question: "What happens when a child class declares an instance variable with the exact same name as a parent class variable?",
    shortAnswer: "The child field hides (shadows) the parent field. The child class object actually contains BOTH variables in memory; 'super.field' accesses the parent variable.",
    explanation: "Fields in Java are NOT overridden polymorphically; they are shadowed. Both fields exist in the Heap object.",
    hint: "Both fields exist in memory; super.fieldName accesses the parent field.",
    level: "Intermediate",
    codeExample: "class Child extends Parent { int x = 20; void print() { System.out.println(super.x); } }"
  }
];

export default topic9_questions;