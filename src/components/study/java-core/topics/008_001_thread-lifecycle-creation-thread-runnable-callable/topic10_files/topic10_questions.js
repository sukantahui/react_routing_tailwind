const topic10_questions = [
  {
    "question": "What are the two major advantages of 'java.util.concurrent.Callable<V>' over 'java.lang.Runnable'?",
    "shortAnswer": "1. 'Return Value': 'Callable<V>' defines 'V call()' which returns a generic result value upon task completion, whereas 'Runnable.run()' returns 'void'. 2. 'Checked Exceptions': 'Callable.call()' declares 'throws Exception', allowing tasks to propagate checked exceptions directly to the caller (which are wrapped in 'ExecutionException' upon calling 'future.get()'), whereas 'Runnable.run()' cannot throw checked exceptions.",
    "explanation": "Core enhancement introduced in Java 5 JSR-166.",
    "hint": "Callable returns a generic value (V) and can throw checked exceptions.",
    "level": "Intermediate",
    "codeExample": "Callable<Integer> c = () → 42; FutureTask<Integer> ft = new FutureTask<>(c); new Thread(ft).start();"
  }
];

export default topic10_questions;