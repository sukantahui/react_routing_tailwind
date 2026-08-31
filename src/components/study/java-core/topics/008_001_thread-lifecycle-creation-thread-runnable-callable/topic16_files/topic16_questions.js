const topic16_questions = [
  {
    "question": "Synthesize the complete thread creation and execution pipeline in modern Java from task instantiation to result retrieval.",
    "shortAnswer": "1. 'Task Definition': Implement 'Callable<V>' (or lambda) returning a generic result. 2. 'Bridge Adapter': Wrap the Callable in a 'FutureTask<V>' (which implements both Runnable and Future). 3. 'Thread Allocation': Pass the FutureTask to 'new Thread(futureTask, descriptiveName)'. 4. 'Execution': Call 'thread.start()' to spawn a native OS thread and Call Stack. 5. 'Result Gathering': Call 'futureTask.get()' to block asynchronously and retrieve the computed result.",
    "explanation": "Grand architectural synthesis of Module 008_001.",
    "hint": "Callable → FutureTask → new Thread(ft, name) → start() → futureTask.get().",
    "level": "Advanced",
    "codeExample": "FutureTask<String> ft = new FutureTask<>(() → \"Result\"); new Thread(ft).start(); String s = ft.get();"
  }
];

export default topic16_questions;