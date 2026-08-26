const topic2_questions = [
  {
    "question": "What does 'threadA.join()' do and which thread gets blocked during its execution?",
    "shortAnswer": "'threadA.join()' pauses the CURRENT thread that called 'join()' (e.g. the main thread) and puts it into the 'WAITING' state until 'threadA' completes its execution and reaches the 'TERMINATED' state. It does NOT pause 'threadA'; 'threadA' continues running on its CPU core concurrently.",
    "explanation": "Core thread synchronization primitive in java.lang.Thread.",
    "hint": "Blocks the calling thread until the target thread finishes and terminates.",
    "level": "Beginner",
    "codeExample": "Thread t = new Thread(task); t.start(); t.join(); // Main thread waits for t to finish"
  }
];

export default topic2_questions;