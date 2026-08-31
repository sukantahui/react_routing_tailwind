const topic0_questions = [
  {
    "question": "Which of the 5 JVM Runtime Data Areas are shared across all threads in the JVM process?",
    "shortAnswer": "The Heap Area and the Method Area (Metaspace in Java 8+). All threads can concurrently access object instances on the Heap and class metadata in Metaspace.",
    "explanation": "The remaining three (Stack, PC Register, Native Stack) are private to each thread.",
    "hint": "Heap and Method Area (Metaspace).",
    "level": "Beginner",
    "codeExample": "Shared: Heap + Metaspace; Private: Stack + PC + Native Stack"
  },
  {
    "question": "What is created on the JVM Thread Stack every time a method is invoked?",
    "shortAnswer": "A new Stack Frame, which contains the Local Variable Table (LVT), Operand Stack, and Frame Data (constant pool references and return info).",
    "explanation": "Popped from the stack when the method returns.",
    "hint": "A Stack Frame containing Local Variables, Operand Stack, and Frame Data.",
    "level": "Beginner",
    "codeExample": "Method Call → Pushes Stack Frame; Return → Pops Stack Frame"
  }
];

export default topic0_questions;
