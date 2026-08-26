const topic9_questions = [
  {
    question: "How does the JVM implement Dynamic Method Dispatch (DMD) internally?",
    shortAnswer: "The JVM uses a Virtual Method Table (vtable) associated with each loaded class. When 'invokevirtual' executes, the JVM reads the object header's class pointer, looks up the method slot in that object's vtable, and jumps to the concrete method code.",
    explanation: "This allows late-binding method execution with O(1) table lookup efficiency.",
    hint: "JVM uses Virtual Method Table (vtable) with O(1) lookup.",
    level: "Advanced",
    codeExample: "// Bytecode: invokevirtual #4 <CloudVM.boot>"
  }
];

export default topic9_questions;