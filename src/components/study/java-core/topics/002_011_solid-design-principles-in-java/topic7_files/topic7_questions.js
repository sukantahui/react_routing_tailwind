const topic7_questions = [
  {
    question: "What is the core premise of the Interface Segregation Principle (ISP)?",
    shortAnswer: "ISP states that 'Clients should not be forced to depend on interfaces they do not use.' Fat interfaces should be split into smaller, cohesive, role-specific interfaces so implementing classes only fulfill relevant methods.",
    explanation: "Prevents empty or exception-throwing stub method implementations.",
    hint: "Split fat interfaces into small, focused, role-specific interfaces.",
    level: "Beginner",
    codeExample: "interface Printer { void print(); }\ninterface Scanner { void scan(); }"
  }
];

export default topic7_questions;