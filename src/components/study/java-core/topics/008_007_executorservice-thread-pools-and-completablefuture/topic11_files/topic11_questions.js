const topic11_questions = [
  {
    "question": "Why was 'CompletableFuture' introduced in Java 8 and how does it solve the limitations of legacy 'Future<T>'?",
    "shortAnswer": "Legacy 'Future<T>' provided only blocking methods ('future.get()'), had no mechanism to attach non-blocking completion callbacks, could not be manually completed, and lacked functional composition operators. 'CompletableFuture' (implementing 'CompletionStage<T>') introduced declarative, non-blocking reactive pipelines: developers can chain dependent stages ('thenApply', 'thenCompose'), combine multiple independent futures ('thenCombine', 'allOf'), and handle asynchronous exceptions ('exceptionally') without blocking calling threads.",
    "explanation": "Evolution of asynchronous programming from Java 5 to Java 8.",
    "hint": "Replaces blocking get() calls with non-blocking callback chains (thenApply, thenAccept) and functional composition.",
    "level": "Beginner",
    "codeExample": "CompletableFuture.supplyAsync(() -> fetch()).thenApply(x -> process(x)).thenAccept(res -> print(res));"
  }
];

export default topic11_questions;