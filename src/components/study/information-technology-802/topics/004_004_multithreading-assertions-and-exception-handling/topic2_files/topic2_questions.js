const questions = [
  {
    id: 1,
    question: "What is the crucial difference between calling start() and calling run() directly on a Thread object in Java?",
    options: [
      "start() allocates a new call stack and spawns a separate thread; run() executes synchronously on the current thread without multithreading",
      "start() only works on Windows; run() works on all operating systems",
      "run() creates two threads while start() creates only one thread",
      "There is no difference; both start and run do the exact same thing"
    ],
    correctAnswer: 0,
    explanation: "Calling `start()` causes the JVM to spawn a new native thread and allocate a new independent call stack before invoking `run()`. Calling `run()` directly merely performs a standard synchronous method call on the caller's stack (no new thread is born).",
    marks: 1,
    hint: "Think about whether a new call stack is created or if it runs on the main stack."
  },
  {
    id: 2,
    question: "What exception is thrown if you attempt to call start() more than once on the same Thread object?",
    options: [
      "IllegalThreadStateException",
      "NullPointerException",
      "ThreadDeathException",
      "ArrayIndexOutOfBoundsException"
    ],
    correctAnswer: 0,
    explanation: "A thread cannot be restarted once started. Calling `start()` on an already started or terminated thread throws `java.lang.IllegalThreadStateException`.",
    marks: 1,
    hint: "A thread's lifecycle is one-way. Restarting an active/dead thread throws an Illegal Thread State error."
  },
  {
    id: 3,
    question: "What is the method signature of the run() method that must be overridden in Java multithreading?",
    options: [
      "public void run()",
      "public int run()",
      "protected void run(String args)",
      "public static void run()"
    ],
    correctAnswer: 0,
    explanation: "The run() method has the signature `public void run()`. It accepts no arguments and has a void return type.",
    marks: 1,
    hint: "No parameters, void return type, public access."
  },
  {
    id: 4,
    question: "If a class overrides run() with `public void run(int count)`, which method will be called when start() is invoked?",
    options: [
      "The no-argument public void run() method from Thread class",
      "The overloaded public void run(int count) method",
      "Both methods simultaneously",
      "A compile-time error occurs"
    ],
    correctAnswer: 0,
    explanation: "The JVM thread runtime specifically looks for and executes the zero-argument `public void run()` method. An overloaded method like `run(int)` is treated as a standard custom method and is ignored by `start()`.",
    marks: 1,
    hint: "JVM only targets the zero-argument run() method."
  },
  {
    id: 5,
    question: "Which of the following creates and starts a thread correctly?",
    options: [
      "Thread t = new Thread(() -> System.out.println(\"Running\")); t.start();",
      "Thread t = new Thread(); t.run();",
      "Thread.start(new Runnable());",
      "Thread t = start(new Thread());"
    ],
    correctAnswer: 0,
    explanation: "`Thread t = new Thread(...); t.start();` instantiates a thread with a runnable task and invokes `start()` to spawn concurrent execution.",
    marks: 1,
    hint: "Must instantiate a Thread and invoke its start() method."
  }
];

export default questions;
