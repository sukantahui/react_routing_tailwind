const topic6_questions = [
  {
    "question": "Why is 'System.currentTimeMillis()' or 'System.nanoTime()' inadequate for accurate Java microbenchmarks, and how does JMH solve this?",
    "shortAnswer": "Naïve 'System.nanoTime()' loops suffer from JVM runtime optimizations: 1. 'JIT Compilation': HotSpot starts in interpreted mode and compiles to native assembly only after warm-up. 2. 'Dead-Code Elimination': if the computed result is unused, the JIT optimizer deletes the entire loop. 3. 'JMH Solution': JMH (Java Microbenchmark Harness) manages explicit Warmup iterations, controls CPU frequency scaling, and uses 'Blackhole' objects to consume return values, preventing dead-code elimination and guaranteeing scientifically rigorous microsecond benchmarks.",
    "explanation": "Standard Java performance engineering methodology from OpenJDK team.",
    "hint": "JMH provides warm-up iterations, prevents JIT dead-code elimination via Blackhole, and measures steady state.",
    "level": "Advanced",
    "codeExample": "@Benchmark public void testList(Blackhole bh) { bh.consume(list.get(500)); }"
  }
];

export default topic6_questions;