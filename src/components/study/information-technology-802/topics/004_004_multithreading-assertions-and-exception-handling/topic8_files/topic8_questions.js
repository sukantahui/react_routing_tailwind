const questions = [
  {
    id: 1,
    question: "What is the primary difference between extending the Thread class and implementing the Runnable interface?",
    options: [
      "Implementing Runnable allows your class to extend another superclass because Java supports multiple interface implementation, while extending Thread uses up the single class inheritance slot",
      "Extending Thread is always faster in execution speed",
      "Implementing Runnable does not support the run() method",
      "There is no difference between them"
    ],
    correctAnswer: 0,
    explanation: "Java permits single class inheritance only. Implementing Runnable preserves the ability to extend another superclass.",
    marks: 1,
    hint: "Single class inheritance vs multiple interface implementation."
  },
  {
    id: 2,
    question: "Which flag is supplied to the 'java' runtime launcher to enable assertions?",
    options: [
      "-ea (or -enableassertions)",
      "-da (or -disableassertions)",
      "-debug",
      "-assert"
    ],
    correctAnswer: 0,
    explanation: "The `-ea` or `-enableassertions` flag enables assertion evaluation at runtime.",
    marks: 1,
    hint: "Short for enable assertions."
  },
  {
    id: 3,
    question: "Does the finally block execute if an exception occurs in the try block and is caught?",
    options: [
      "Yes, the finally block always executes regardless of whether an exception occurs or is caught",
      "No, finally only executes when no exception occurs",
      "Only if System.exit() is called",
      "Only if the exception is an Error"
    ],
    correctAnswer: 0,
    explanation: "The finally block is guaranteed to execute whether an exception was thrown, caught, or not thrown at all.",
    marks: 1,
    hint: "Guaranteed execution guarantee."
  },
  {
    id: 4,
    question: "Which exception occurs when calling Integer.parseInt(\"XII-IT\")?",
    options: [
      "NumberFormatException",
      "NullPointerException",
      "ArrayIndexOutOfBoundsException",
      "ArithmeticException"
    ],
    correctAnswer: 0,
    explanation: "Passing non-numeric characters to `Integer.parseInt()` throws a `NumberFormatException`.",
    marks: 1,
    hint: "Invalid numeric formatting."
  },
  {
    id: 5,
    question: "What happens when calling t.start() more than once on the same Thread object?",
    options: [
      "IllegalThreadStateException is thrown",
      "A second thread is spawned",
      "The thread restarts from the beginning",
      "The program terminates silently"
    ],
    correctAnswer: 0,
    explanation: "A thread cannot be restarted once it has been started; doing so throws `IllegalThreadStateException`.",
    marks: 1,
    hint: "One-way thread lifecycle."
  }
];

export default questions;
