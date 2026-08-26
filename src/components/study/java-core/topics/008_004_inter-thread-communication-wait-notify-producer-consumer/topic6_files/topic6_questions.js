const topic6_questions = [
  {
    "question": "What are the rules and potential risks when calling 'notify()' with multiple waiting threads?",
    "shortAnswer": "'notify()' wakes up exactly ONE arbitrary thread from the object's Wait Set and moves it to the Entry Set (BLOCKED state). 1. 'Arbitrary Selection': The selection is non-deterministic (JVM does not guarantee FIFO order or priority). 2. 'Starvation & Deadlock Risk': If multiple threads are waiting on different conditions (e.g. producers waiting for space and consumers waiting for data), 'notify()' might wake up another producer instead of a consumer, resulting in a thread starvation or total system deadlock. 3. 'Recommendation': Prefer 'notifyAll()'.",
    "explanation": "Standard Java concurrency hazard analysis.",
    "hint": "notify() selects an arbitrary thread with no FIFO guarantee; unnotified threads may starve.",
    "level": "Intermediate",
    "codeExample": "lock.notify(); // Wakes only 1 arbitrary thread from wait set"
  }
];

export default topic6_questions;