const topic14_questions = [
  {
    "question": "Why is 'LongAdder' significantly faster than 'AtomicLong' in high-concurrency multi-threaded environments?",
    "shortAnswer": "In 'AtomicLong', all threads contend on a SINGLE shared 64-bit memory cell via CAS. Under high multi-threaded contention (e.g. 16+ CPU cores), CAS failures skyrocket, forcing threads into CPU-wasting retry loops and bus cache-line bouncing. 'LongAdder' (introduced in Java 8 by Doug Lea) solves this by maintaining a dynamically striped array of 'Cell' objects. Different threads hash to different Cells and update them concurrently with near-zero contention. When the final total is needed, 'longAdder.sum()' simply aggregates the values across all internal cells.",
    "explanation": "Grand architectural capstone of Module 008_006.",
    "hint": "Maintains a striped array of Cell objects so threads update separate memory cells without CAS contention.",
    "level": "Advanced",
    "codeExample": "LongAdder adder = new LongAdder(); adder.increment(); long total = adder.sum();"
  }
];

export default topic14_questions;