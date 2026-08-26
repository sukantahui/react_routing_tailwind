const topic5_questions = [
  {
    "question": "Why must all application threads stop during a Stop-The-World GC phase?",
    "shortAnswer": "To prevent mutator threads from creating new objects or modifying reference pointers while the garbage collector is actively inspecting, marking, or relocating memory objects, which would otherwise result in data corruption.",
    "explanation": "Ensures heap consistency during critical GC phases.",
    "hint": "Prevents memory corruption while objects are being inspected or moved.",
    "level": "Beginner",
    "codeExample": "STW pauses mutator threads -> GC moves objects safely."
  },
  {
    "question": "Where does the JIT compiler place Safepoint checks in compiled Java code?",
    "shortAnswer": "At method invocations, method returns, loop back-edges (backward branches), and transitions between Java and JNI native code.",
    "explanation": "Ensures threads frequently check for pending GC pause requests.",
    "hint": "At method calls, returns, loop back-edges, and JNI transitions.",
    "level": "Intermediate",
    "codeExample": "Safepoints at loop branches and method return points."
  }
];

export default topic5_questions;
