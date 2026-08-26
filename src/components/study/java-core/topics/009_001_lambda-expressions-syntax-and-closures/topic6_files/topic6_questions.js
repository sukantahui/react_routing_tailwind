const topic6_questions = [
  {
    "question": "How do Lambda Expressions differ from Anonymous Inner Classes in bytecode generation, memory allocation, and 'this' scope?",
    "shortAnswer": "1. 'Bytecode & Class Files': Anonymous Inner Classes create separate physical '.class' files (e.g. 'Outer$1.class') at compile time and allocate a new object on heap each time. Lambdas emit a single 'invokedynamic' bytecode instruction that uses 'LambdaMetafactory' at runtime to generate an in-memory CallSite without creating class files on disk. 2. 'Memory Allocation': Non-capturing lambdas are cached and reused as singletons with zero allocation overhead. 3. 'Scope of this': Inside an Anonymous Inner Class, 'this' refers to the anonymous class instance itself; inside a Lambda, 'this' is lexically scoped and refers to the ENCLOSING outer class instance.",
    "explanation": "Under-the-hood JVM mechanics comparing lambdas and anonymous inner classes.",
    "hint": "Lambdas use invokedynamic without generating .class files, can be cached as singletons, and their 'this' refers to the enclosing outer class.",
    "level": "Advanced",
    "codeExample": "// Lambda: invokedynamic -> LambdaMetafactory (Zero Outer$1.class files)"
  }
];

export default topic6_questions;