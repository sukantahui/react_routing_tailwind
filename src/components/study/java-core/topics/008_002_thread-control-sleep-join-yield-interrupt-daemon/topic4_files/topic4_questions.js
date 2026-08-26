const topic4_questions = [
  {
    "question": "What does 'Thread.yield()' do, does it change the thread's state, and does it release locks?",
    "shortAnswer": "'Thread.yield()' is a static method that provides a voluntary hint to the OS thread scheduler that the currently executing thread is willing to relinquish its remaining CPU time-slice. 1. 'State': The thread remains in the 'RUNNABLE' state (it does NOT become WAITING or BLOCKED). 2. 'Locks': It does NOT release any locks held by the thread. 3. 'OS Behavior': The scheduler is free to ignore the hint, or re-assign the CPU core to another thread of equal priority.",
    "explanation": "Standard specification of Thread.yield().",
    "hint": "Yields current CPU time-slice; stays in RUNNABLE state; does NOT release locks.",
    "level": "Intermediate",
    "codeExample": "Thread.yield(); // Hints scheduler to allow other threads of equal priority to run"
  }
];

export default topic4_questions;