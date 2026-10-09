export default [
  {
    question: "How is Encapsulation implemented in Java classes?",
    answer: "Encapsulation is implemented by:\n1. Declaring all instance variables as `private` to prevent direct external access.\n2. Providing `public` getter (accessor) and setter (mutator) methods to safely read and validate modifications to the variables.",
    marks: 2,
    hint: "Private variables + public getter and setter methods."
  },
  {
    question: "What is the primary benefit of declaring fields `private` and using setter methods?",
    options: [
      "It allows adding data validation rules (e.g. rejecting negative salary or invalid marks) before updating internal state.",
      "It makes the program compile faster.",
      "It converts the class into an abstract class.",
      "It automatically synchronizes multi-threading."
    ],
    correctAnswer: 0,
    explanation: "Setters provide a controlled gatekeeper where input validation can intercept invalid or malicious assignments.",
    marks: 1
  },
  {
    question: "Write a standard Java getter and setter method for a `private double balance;` field.",
    answer: "public double getBalance() {\n    return balance;\n}\n\npublic void setBalance(double b) {\n    if (b >= 0) {\n        balance = b;\n    } else {\n        System.out.println(\"Invalid balance: cannot be negative\");\n    }\n}",
    marks: 3,
    hint: "get... returns field; set... accepts parameter with validation."
  }
];
