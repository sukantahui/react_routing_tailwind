const topic0_questions = [
  {
    question: "What is the 'this' keyword in Java and what does it point to in memory?",
    shortAnswer: "'this' is an implicit reference variable available in all non-static methods and constructors that points directly to the current Heap object instance upon which the member is executing.",
    explanation: "Whenever an instance method or constructor is invoked, the JVM invisibly passes the 64-bit Heap address of the receiving object as the first local variable (slot 0 in bytecode), accessible as 'this'.",
    hint: "Implicit reference variable holding the 64-bit Heap memory address of the current instance.",
    level: "Beginner",
    codeExample: "public void display() { System.out.println(this); // Prints ClassName@HashCode }"
  },
  {
    question: "Where is the 'this' reference stored during method execution?",
    shortAnswer: "In local variable table slot 0 of the current method's execution stack frame on the JVM thread stack.",
    explanation: "For instance methods, bytecode parameter slot 0 is reserved for 'this'. Actual parameters occupy slots 1, 2, 3, etc.",
    hint: "Local Variable Table Slot 0 in current stack frame.",
    level: "Advanced",
    codeExample: "// Bytecode: aload_0 pushes 'this' onto the operand stack"
  },
  {
    question: "Can you assign a new object or null to 'this' ('this = null;') in Java?",
    shortAnswer: "No! 'this' is a final reference value managed exclusively by the JVM; attempting to reassign 'this' causes a compile-time error.",
    explanation: "'this' is an immutable keyword representing identity, not an assignable variable.",
    hint: "this is immutable and cannot be reassigned.",
    level: "Beginner",
    codeExample: "// Compile Error: cannot assign a value to final variable this"
  },
  {
    question: "What is the memory value of 'this' when two separate objects are created?",
    shortAnswer: "Each object has its own unique 'this' reference pointing to its distinct memory address in the JVM Eden/Tenured Heap space.",
    explanation: "Swadeep's 'this' points to Swadeep's Heap allocation, and Tuhina's 'this' points to Tuhina's Heap allocation.",
    hint: "Distinct 64-bit Heap addresses per instance.",
    level: "Beginner",
    codeExample: "Student s1 = new Student(); // this → 0x88AA\nStudent s2 = new Student(); // this → 0x99BB"
  },
  {
    question: "What is the classroom analogy by Sukanta Hui for 'this' in Barrackpore?",
    shortAnswer: "The Self-Identity Pronoun: In Bengali/English, 'I' / 'myself' refers to whoever is speaking. When Swadeep speaks, 'this' means Swadeep; when Tuhina speaks, 'this' means Tuhina!",
    explanation: "Contextual self-reference: 'this' always refers to the active object receiver executing the instruction.",
    hint: "'I' / 'myself' refers to the active speaker.",
    level: "Beginner",
    codeExample: "// 'this' is the object's self-identity pronoun"
  }
];

export default topic0_questions;