const topic15_questions = [
  {
    "question": "How does 'thenCombine()' enable parallel execution and aggregation of independent asynchronous tasks?",
    "shortAnswer": "'thenCombine(CompletionStage<U> other, BiFunction<T, U, V> fn)' accepts a second independent CompletableFuture and a 'BiFunction' combiner. The JVM executes both futures concurrently on background worker threads in parallel. When and only when BOTH futures complete successfully, the combiner BiFunction is invoked with both results, producing a new 'CompletableFuture<V>'. This cuts total elapsed time from (TimeA + TimeB) down to max(TimeA, TimeB).",
    "explanation": "Classic fork-join parallel fan-in pattern in CompletableFuture.",
    "hint": "Executes both futures concurrently in parallel and combines their results with a BiFunction when both finish.",
    "level": "Intermediate",
    "codeExample": "futureA.thenCombine(futureB, (resA, resB) → combine(resA, resB));"
  }
];

export default topic15_questions;