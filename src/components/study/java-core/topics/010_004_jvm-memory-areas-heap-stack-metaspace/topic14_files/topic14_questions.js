const topic14_questions = [
  {
    "question": "Why did James Gosling and the Java team design the JVM as a stack-based architecture rather than register-based?",
    "shortAnswer": "For hardware independence and portability. Different physical CPUs have varying numbers of physical registers (e.g. x86 vs ARM vs SPARC). A stack-based virtual machine is trivial to implement on any CPU architecture without register allocation complexity.",
    "explanation": "Fundamental design philosophy behind 'Write Once, Run Anywhere'.",
    "hint": "Ensures hardware portability across CPUs with different register architectures.",
    "level": "Intermediate",
    "codeExample": "Stack-based VM is 100% portable across all CPU architectures."
  },
  {
    "question": "How does the 'iadd' bytecode instruction operate on the Operand Stack?",
    "shortAnswer": "It pops the top two 32-bit integers from the Operand Stack, calculates their sum, and pushes the integer result back onto the top of the Operand Stack.",
    "explanation": "Standard binary arithmetic operation in the JVM instruction set.",
    "hint": "Pops top two integers, adds them, and pushes the sum.",
    "level": "Beginner",
    "codeExample": "iload_1 → iload_2 → iadd → istore_3"
  }
];

export default topic14_questions;
