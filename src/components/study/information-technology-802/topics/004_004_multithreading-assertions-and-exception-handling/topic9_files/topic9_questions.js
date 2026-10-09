const questions = [
  {
    id: 1,
    question: "Predict the output of the following Java multithreading snippet:\nThread t = new Thread(() -> System.out.print(\"ThreadTask \"));\nt.start();\nt.start();",
    options: [
      "Throws java.lang.IllegalThreadStateException at the second t.start() call",
      "Prints 'ThreadTask ThreadTask '",
      "Prints 'ThreadTask ' once and ignores the second start",
      "Compilation error: lambdas cannot be passed to Thread constructor"
    ],
    correctAnswer: 0,
    explanation: "Calling `start()` more than once on the same Thread instance throws `java.lang.IllegalThreadStateException` because a thread cannot be restarted once initiated.",
    marks: 1,
    hint: "Remember: a thread's start() method can only be invoked once in its lifecycle."
  },
  {
    id: 2,
    question: "What is printed when running `java -ea Main` for the following code:\nint x = -10;\nassert x > 0 : \"Value must be positive\";\nSystem.out.println(\"Finished\");",
    options: [
      "Throws AssertionError: Value must be positive",
      "Prints 'Finished'",
      "Prints '-10'",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "Since `-ea` is provided, assertions are active. `x > 0` is false (-10 > 0 is false), so an `AssertionError` with detail message 'Value must be positive' is thrown immediately, halting execution before 'Finished' is printed.",
    marks: 1,
    hint: "With -ea flag, assertion failures throw AssertionError immediately."
  },
  {
    id: 3,
    question: "What will the following try-catch-finally block output?\ntry {\n    int a = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.print(\"A \");\n} finally {\n    System.out.print(\"B \");\n}\nSystem.out.print(\"C\");",
    options: [
      "A B C",
      "B C",
      "A C",
      "ArithmeticException"
    ],
    correctAnswer: 0,
    explanation: "10 / 0 throws ArithmeticException, caught by catch block (prints 'A '). The finally block executes next (prints 'B '). Finally, normal sequential flow continues (prints 'C'). Total output: 'A B C'.",
    marks: 1,
    hint: "Catch executes -> finally executes -> code after try-catch executes."
  },
  {
    id: 4,
    question: "Which exception will be thrown by the expression `Integer.parseInt(\"12.34\")`?",
    options: [
      "NumberFormatException",
      "ArithmeticException",
      "NullPointerException",
      "ClassCastException"
    ],
    correctAnswer: 0,
    explanation: "`Integer.parseInt()` expects an integer string without decimal points. Passing \"12.34\" throws a `NumberFormatException`.",
    marks: 1,
    hint: "Decimal dot is not a valid integer digit."
  },
  {
    id: 5,
    question: "Which of the following creates a thread correctly by implementing the Runnable interface?",
    options: [
      "class Worker implements Runnable { public void run() {} } ... Thread t = new Thread(new Worker()); t.start();",
      "class Worker implements Runnable { public void start() {} } ... Worker w = new Worker(); w.start();",
      "class Worker extends Runnable { public void run() {} } ... Worker w = new Worker(); w.start();",
      "Runnable r = new Thread(); r.start();"
    ],
    correctAnswer: 0,
    explanation: "A class implements `Runnable`, overrides `run()`, and is passed to `new Thread(runnable)` whose `start()` method is then invoked.",
    marks: 1,
    hint: "implements Runnable -> pass to Thread constructor -> call start()."
  }
];

export default questions;
