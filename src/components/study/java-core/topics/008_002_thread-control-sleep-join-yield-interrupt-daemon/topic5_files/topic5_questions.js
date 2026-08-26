const topic5_questions = [
  {
    "question": "Why was 'Thread.stop()' deprecated in Java and what makes it inherently unsafe?",
    "shortAnswer": "'Thread.stop()' forcibly terminates a target thread instantly by causing it to throw an asynchronous 'ThreadDeath' error. When terminated abruptly, the thread immediately unlocks all intrinsic monitor locks it holds. If the thread was in the middle of modifying shared data structures (e.g. updating bank accounts or linked nodes), the data is left in a corrupted, half-updated state. Other threads can then acquire the unlocked monitor and operate on damaged data. Java replaced this with the safe 'Cooperative Cancellation' model using 'Thread.interrupt()'.",
    "explanation": "Sun Microsystems JDK official technical whitepaper: 'Why are Thread.stop, Thread.suspend and Thread.resume Deprecated?'.",
    "hint": "Instantly kills the thread and unlocks all locks mid-mutation, leaving shared data permanently corrupted.",
    "level": "Advanced",
    "codeExample": "// NEVER use thread.stop(); // Deprecated & dangerous | Use thread.interrupt() instead!"
  }
];

export default topic5_questions;