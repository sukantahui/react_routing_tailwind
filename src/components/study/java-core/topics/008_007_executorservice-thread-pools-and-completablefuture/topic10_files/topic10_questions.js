const topic10_questions = [
  {
    "question": "What are the 5 core methods of 'java.util.concurrent.Future<V>' and what exceptions can 'future.get()' throw?",
    "shortAnswer": "1. 'Core Methods': 'get()' (unbounded block), 'get(timeout, unit)' (bounded block), 'isDone()' (completion status), 'cancel(boolean mayInterruptIfRunning)' (cancellation request), and 'isCancelled()'. 2. 'Exceptions thrown by get()': (A) 'InterruptedException' (calling thread interrupted while waiting), (B) 'ExecutionException' (wraps any checked/unchecked exception thrown inside the task's 'call()' method), (C) 'CancellationException' (task was cancelled), and (D) 'TimeoutException' (bounded timeout expired).",
    "explanation": "Complete specification of Future<V> interface.",
    "hint": "get(), get(timeout), isDone(), cancel(), isCancelled(); throws InterruptedException, ExecutionException, TimeoutException.",
    "level": "Intermediate",
    "codeExample": "Double result = future.get(500, TimeUnit.MILLISECONDS);"
  }
];

export default topic10_questions;