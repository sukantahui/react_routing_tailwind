const topic0_questions = [
  {
    "question": "Why is collect() called a 'mutable reduction' while reduce() is an 'immutable reduction'?",
    "shortAnswer": "reduce() combines elements by producing a brand new accumulated value at each step without modifying existing objects, whereas collect() updates the internal state of a single mutable result container (like calling list.add()) repeatedly.",
    "explanation": "Mutable reduction with collect() is dramatically faster for accumulating collections.",
    "hint": "collect mutates a single container; reduce generates new immutable values.",
    "level": "Intermediate",
    "codeExample": "stream.collect(Collectors.toList()); // Mutates internal list buffer"
  },
  {
    "question": "What are the 3 functional arguments in the low-level stream.collect() method?",
    "shortAnswer": "1. Supplier (creates the empty container), 2. Accumulator (adds an element to the container), 3. Combiner (merges two containers during parallel execution).",
    "explanation": "These 3 steps form the core mechanics of all Collectors.",
    "hint": "Supplier, Accumulator, Combiner.",
    "level": "Intermediate",
    "codeExample": "stream.collect(ArrayList::new, ArrayList::add, ArrayList::addAll);"
  }
];

export default topic0_questions;
