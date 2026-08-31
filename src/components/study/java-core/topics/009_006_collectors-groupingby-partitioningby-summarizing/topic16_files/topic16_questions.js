const topic16_questions = [
  {
    "question": "How do you create a custom Collector concisely without creating a new class?",
    "shortAnswer": "Using the static factory method Collector.of(supplier, accumulator, combiner, finisher, characteristics...).",
    "explanation": "Collector.of provides a fluent functional way to build custom collectors.",
    "hint": "Use Collector.of() static factory method.",
    "level": "Intermediate",
    "codeExample": "Collector<T, List<T>, List<T>> c = Collector.of(ArrayList::new, List::add, (a, b) → { a.addAll(b); return a; });"
  },
  {
    "question": "Why must the combiner function return one of the modified lists rather than void?",
    "shortAnswer": "Because in parallel reduction (ForkJoinPool), the combiner is a BinaryOperator<A> that must return the combined accumulator instance to be propagated up the recursive divide-and-conquer tree.",
    "explanation": "BinaryOperator<A> requires returning type A.",
    "hint": "Combiner is a BinaryOperator<A> which must return the merged container.",
    "level": "Advanced",
    "codeExample": "(l1, l2) → { l1.addAll(l2); return l1; }"
  }
];

export default topic16_questions;
