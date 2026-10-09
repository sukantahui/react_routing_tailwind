const questions = [
  {
    id: 1,
    question: "What are the two standard ways of creating a thread in Java?",
    options: [
      "1. Extending the Thread class, 2. Implementing the Runnable interface",
      "1. Extending the Object class, 2. Implementing the Serializable interface",
      "1. Importing java.util.Thread, 2. Using the process() keyword",
      "1. Extending the Main class, 2. Implementing the Applet interface"
    ],
    correctAnswer: 0,
    explanation: "Java provides two distinct mechanisms for creating threads: 1. Extending the java.lang.Thread class, and 2. Implementing the java.lang.Runnable interface.",
    marks: 1,
    hint: "Recall: Thread class (inheritance) and Runnable interface (implementation)."
  },
  {
    id: 2,
    question: "Why is implementing the Runnable interface generally preferred over extending the Thread class?",
    options: [
      "Because Java does not support multiple inheritance of classes, implementing Runnable leaves room to extend another class",
      "Because Runnable executes twice as fast as the Thread class",
      "Because Runnable does not require overriding the run() method",
      "Because Thread class cannot be used in console applications"
    ],
    correctAnswer: 0,
    explanation: "Since Java supports single inheritance only for classes, extending Thread prevents your class from extending any other superclass. Implementing Runnable allows your class to extend another class while still functioning as a thread.",
    marks: 1,
    hint: "Multiple inheritance limitation of Java classes."
  },
  {
    id: 3,
    question: "When creating a thread by implementing Runnable, how is the thread instantiated and started?",
    options: [
      "MyRunnable r = new MyRunnable(); Thread t = new Thread(r); t.start();",
      "MyRunnable r = new MyRunnable(); r.start();",
      "Thread t = new MyRunnable(); t.run();",
      "Runnable.start(new MyRunnable());"
    ],
    correctAnswer: 0,
    explanation: "When implementing Runnable, you must pass the Runnable instance into a Thread constructor: `Thread t = new Thread(r);` and then invoke `t.start()`.",
    marks: 1,
    hint: "The Runnable instance is passed as a target argument to the Thread constructor."
  },
  {
    id: 4,
    question: "Which package contains both the Thread class and the Runnable interface in Java?",
    options: [
      "java.lang",
      "java.util",
      "java.io",
      "java.net"
    ],
    correctAnswer: 0,
    explanation: "Both Thread and Runnable are defined in the default `java.lang` package, so no explicit import statement is required.",
    marks: 1,
    hint: "The default Java package automatically imported into every class."
  },
  {
    id: 5,
    question: "Which single abstract method must be implemented by any class implementing the Runnable interface?",
    options: [
      "public void run()",
      "public void start()",
      "public void execute()",
      "public int run(int id)"
    ],
    correctAnswer: 0,
    explanation: "The Runnable interface is a functional interface containing exactly one abstract method: `public void run()`.",
    marks: 1,
    hint: "The entry point method for thread code execution."
  }
];

export default questions;
