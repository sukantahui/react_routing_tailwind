const topic16_questions = [
  {
    "question": "How do 'CompletableFuture.allOf()' and 'CompletableFuture.anyOf()' coordinate multiple concurrent futures?",
    "shortAnswer": "1. 'CompletableFuture.allOf(Future... futures)': Creates a composite 'CompletableFuture<Void>' that completes when ALL supplied futures complete (or completes exceptionally if any fails). It implements the 'Scatter-Gather' pattern. 2. 'CompletableFuture.anyOf(Future... futures)': Creates a composite 'CompletableFuture<Object>' that completes as soon as ANY ONE (the fastest) of the supplied futures completes, returning that earliest result. It implements the 'First-Responder / Fastest Service' pattern.",
    "explanation": "Multi-stage asynchronous coordination primitives.",
    "hint": "allOf waits for all futures to complete (scatter-gather); anyOf returns the result of the fastest future.",
    "level": "Intermediate",
    "codeExample": "CompletableFuture.allOf(f1, f2, f3).thenRun(() → System.out.println(\"All finished!\"));"
  }
];

export default topic16_questions;