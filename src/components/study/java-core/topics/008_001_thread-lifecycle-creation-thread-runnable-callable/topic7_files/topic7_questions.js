const topic7_questions = [
  {
    "question": "Why is extending 'java.lang.Thread' considered an anti-pattern in modern enterprise Java applications?",
    "shortAnswer": "1. 'Single Inheritance Constraint': Java does not support multiple class inheritance; extending 'Thread' consumes the class's single inheritance slot, preventing it from extending any domain model (like 'BaseService' or 'AuditableEntity'). 2. 'Coupling': It violates the Single Responsibility Principle by tightly coupling the workload algorithm ('run()') with the thread infrastructure. 3. 'Incompatibility with Thread Pools': Thread instances cannot be submitted to modern 'ExecutorService' thread pools for worker reuse.",
    "explanation": "Core OOP design principle and modern Java concurrency best practice.",
    "hint": "Consumes single inheritance slot and cannot be reused in ExecutorService thread pools.",
    "level": "Intermediate",
    "codeExample": "class MyTask extends Thread { public void run() { ... } } // Inflexible design"
  }
];

export default topic7_questions;