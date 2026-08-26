const topic13_questions = [
  {
    "question": "Compare 'thenApply()', 'thenAccept()', and 'thenRun()' in CompletableFuture.",
    "shortAnswer": "1. 'thenApply(Function<T, R>)': Accepts a computed value T, applies a transforming function, and returns a new 'CompletableFuture<R>' (analogous to 'Stream.map()'). 2. 'thenAccept(Consumer<T>)': Accepts a computed value T, consumes it with side-effects (e.g. printing or saving), and returns 'CompletableFuture<Void>' (analogous to 'Stream.forEach()'). 3. 'thenRun(Runnable)': Executes a Runnable action upon completion without receiving the previous stage's result and returns 'CompletableFuture<Void>'.",
    "explanation": "Core functional transformation pipeline operators on CompletionStage.",
    "hint": "thenApply maps T &rarr; R; thenAccept consumes T &rarr; void; thenRun executes () &rarr; void upon completion.",
    "level": "Intermediate",
    "codeExample": "future.thenApply(val -> val * 2).thenAccept(res -> print(res)).thenRun(() -> done());"
  }
];

export default topic13_questions;