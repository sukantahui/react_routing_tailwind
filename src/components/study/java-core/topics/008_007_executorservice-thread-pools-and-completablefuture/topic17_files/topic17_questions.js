const topic17_questions = [
  {
    "question": "Compare 'exceptionally()', 'handle()', and 'whenComplete()' for asynchronous exception handling in CompletableFuture.",
    "shortAnswer": "1. 'exceptionally(Function<Throwable, T> fallback)': Triggered ONLY if an exception occurs in the upstream pipeline, allowing you to return a fallback value or recover gracefully. 2. 'handle(BiFunction<T, Throwable, R> fn)': ALWAYS invoked regardless of success or failure. Receives both the result (if successful) and the throwable (if failed), allowing transformation or recovery into a new type R. 3. 'whenComplete(BiConsumer<T, Throwable> action)': ALWAYS invoked for side-effects (e.g. logging or cleaning resources) without modifying the result or exception passed downstream.",
    "explanation": "Grand architectural capstone of Module 008_007.",
    "hint": "exceptionally provides fallback on error; handle transforms/recovers from both result and error; whenComplete executes side-effects without altering values.",
    "level": "Advanced",
    "codeExample": "future.exceptionally(ex → fallbackValue).handle((res, err) → format(res, err));"
  }
];

export default topic17_questions;