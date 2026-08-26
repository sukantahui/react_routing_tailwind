const topic9_questions = [
  {
    question: "Why is primitive 'long' drastically faster than wrapper 'Long' in high-frequency computational loops?",
    shortAnswer: "Primitive 'long' operations execute directly inside high-speed CPU registers with zero memory allocations. Wrapper 'Long' triggers autoboxing on every iteration, unboxing to primitive, calculating, and allocating a new Long object on the Heap, leading to millions of allocations and heavy GC thrashing.",
    explanation: "This classic pitfall was famously highlighted in Effective Java Item 6.",
    hint: "Primitive runs in CPU registers; wrapper instantiates millions of heap objects in loops.",
    level: "Advanced",
    codeExample: "long sum = 0L; // Fast primitive stack allocation"
  }
];

export default topic9_questions;