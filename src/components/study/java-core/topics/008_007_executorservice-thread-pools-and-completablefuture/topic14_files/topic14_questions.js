const topic14_questions = [
  {
    "question": "What is 'thenCompose()' in CompletableFuture and how does it prevent nested 'CompletableFuture<CompletableFuture<T>>' types?",
    "shortAnswer": "'thenCompose()' is the asynchronous equivalent of 'flatMap' (Monadic Bind). When an asynchronous operation returns another 'CompletableFuture<T>', using 'thenApply()' would result in an awkward, two-level nested structure ('CompletableFuture<CompletableFuture<T>>'). 'thenCompose()' takes a function that returns a new CompletableFuture, executes it sequentially when the first stage completes, and automatically unwraps/flattens the result into a single direct 'CompletableFuture<T>'.",
    "explanation": "Monadic asynchronous composition in CompletionStage.",
    "hint": "thenCompose is the async flatMap that flattens nested CompletableFuture<CompletableFuture<T>> into CompletableFuture<T>.",
    "level": "Intermediate",
    "codeExample": "CompletableFuture<User> future = fetchUserId().thenCompose(id -> fetchUserProfile(id));"
  }
];

export default topic14_questions;