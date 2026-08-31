const topic10_questions = [
  {
    "question": "What are the two-argument (Bi) functional interface variants in Java and what are their SAM methods?",
    "shortAnswer": "1. 'BiPredicate<T, U>': 'boolean test(T t, U u)' – Evaluates a condition over two inputs of types T and U, returning boolean. 2. 'BiFunction<T, U, R>': 'R apply(T t, U u)' – Accepts two arguments of types T and U, and produces a result of type R (powers 'Map.compute()', 'Map.replaceAll()'). 3. 'BiConsumer<T, U>': 'void accept(T t, U u)' – Accepts two arguments of types T and U and returns void (powers 'Map.forEach((k, v) → ...))'. Note: There is NO 'BiSupplier' because a supplier takes 0 arguments.",
    "explanation": "Two-argument specialization hierarchy in java.util.function.",
    "hint": "BiPredicate (2 inputs → boolean), BiFunction (2 inputs → 1 output R), BiConsumer (2 inputs → void).",
    "level": "Intermediate",
    "codeExample": "Map<K, V> map; map.forEach((k, v) → System.out.println(k + \": \" + v)); // BiConsumer in action!"
  }
];

export default topic10_questions;