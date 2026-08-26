const topic11_questions = [
  {
    "question": "What are 'UnaryOperator<T>' and 'BinaryOperator<T>' in Java and how do they extend the Function hierarchy?",
    "shortAnswer": "1. 'UnaryOperator<T>': Extends 'Function<T, T>' where the input and output types are identical ('T apply(T t)'). It simplifies syntax and powers methods like 'List.replaceAll(unaryOperator)'. 2. 'BinaryOperator<T>': Extends 'BiFunction<T, T, T>' where both operands and the return value share the exact same type ('T apply(T t1, T t2)'). It is the primary functional interface powering Stream reductions ('Stream.reduce(BinaryOperator)'). It also provides static utility methods 'BinaryOperator.minBy(comparator)' and 'BinaryOperator.maxBy(comparator)'.",
    "explanation": "Operator specializations in java.util.function.",
    "hint": "UnaryOperator is Function<T,T>; BinaryOperator is BiFunction<T,T,T>; powers List.replaceAll() and Stream.reduce().",
    "level": "Intermediate",
    "codeExample": "UnaryOperator<String> upper = String::toUpperCase; BinaryOperator<Integer> sum = Integer::sum;"
  }
];

export default topic11_questions;