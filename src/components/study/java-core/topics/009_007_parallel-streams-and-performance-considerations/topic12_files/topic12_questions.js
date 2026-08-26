const topic12_questions = [
  {
    "question": "What happens when multiple threads in a parallel stream concurrently invoke list.add() on a shared ArrayList?",
    "shortAnswer": "Race conditions occur during internal array resizing and element index increments, leading to silent data loss (lost elements), corrupted null slots, or ArrayIndexOutOfBoundsExceptions.",
    "explanation": "ArrayList is not synchronized and cannot handle concurrent insertions.",
    "hint": "Causes silent data loss, corrupt state, or ArrayIndexOutOfBoundsException.",
    "level": "Intermediate",
    "codeExample": "// BAD ANTI-PATTERN:\\nList<Integer> list = new ArrayList<>();\\nstream.parallel().forEach(list::add); // CORRUPTED!"
  },
  {
    "question": "How does collect(Collectors.toList()) avoid race conditions in parallel streams without using locks?",
    "shortAnswer": "Each worker thread populates its own private, isolated ArrayList accumulator. Once tasks finish, the Combiner function merges the individual ArrayLists recursively using divide-and-conquer, achieving lock-free thread safety.",
    "explanation": "Eliminates synchronization contention while maintaining 100% data integrity.",
    "hint": "Threads accumulate into private lists, which are merged by the Combiner.",
    "level": "Advanced",
    "codeExample": "stream.parallel().collect(Collectors.toList()); // Lock-free thread safe"
  }
];

export default topic12_questions;
