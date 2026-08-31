const topic12_questions = [
  {
    "question": "Why does Java provide 36 primitive specialized functional interfaces (like 'IntPredicate', 'DoubleFunction', and 'ToIntFunction') alongside generic interfaces?",
    "shortAnswer": "Generic functional interfaces like 'Predicate<Integer>' or 'Function<Double, Double>' require Java to box and unbox primitive numbers into heap wrapper objects ('int' &harr; 'Integer', 'double' &harr; 'Double'). In high-throughput data processing (millions of records in streams), continuous auto-boxing generates millions of temporary heap garbage objects and triggers frequent GC pauses. Primitive specializations (e.g. 'IntPredicate', 'LongConsumer', 'DoubleFunction', 'ToIntFunction', 'IntUnaryOperator') operate directly on raw unboxed CPU registers, eliminating 100% of boxing allocations and dramatically boosting performance.",
    "explanation": "Grand architectural capstone of Module 009_002.",
    "hint": "Eliminates auto-boxing memory allocations and GC overhead when processing millions of numeric primitives.",
    "level": "Advanced",
    "codeExample": "IntPredicate p = x → x > 0; // boolean test(int) - 0 boxing overhead!"
  }
];

export default topic12_questions;