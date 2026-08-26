const topic2_questions = [
  {
    "question": "What is a 'Critical Section' and what are the 3 classical requirements of Mutual Exclusion defined in computer science?",
    "shortAnswer": "A 'Critical Section' is a segment of code that accesses shared mutable resources and cannot be executed concurrently by more than one thread without risking data corruption. The 3 classical requirements (formulated by Edsger Dijkstra) are: 1. 'Mutual Exclusion' (only 1 thread can be inside at any time), 2. 'Progress' (threads seeking entry are not indefinitely delayed if section is free), 3. 'Bounded Waiting' (a limit exists on how many times others can enter before a waiting thread is granted access).",
    "explanation": "Fundamental operating systems and concurrency theory principle.",
    "hint": "Critical section accesses shared mutable state; requires Mutual Exclusion, Progress, and Bounded Waiting.",
    "level": "Intermediate",
    "codeExample": "// Critical Section protected by Mutex: synchronized(mutex) { sharedState.update(); }"
  }
];

export default topic2_questions;