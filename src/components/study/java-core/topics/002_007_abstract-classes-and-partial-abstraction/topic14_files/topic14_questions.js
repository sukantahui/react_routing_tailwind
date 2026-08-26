const topic14_questions = [
  {
    question: "What is the Template Method Design Pattern and why is the template method itself typically declared 'final'?",
    shortAnswer: "The Template Method pattern defines the invariant skeleton of an algorithm in an abstract base class method, while deferring specific customizable steps to subclasses. The template method is marked 'final' to prevent subclasses from altering the overall execution order/structure of the algorithm.",
    explanation: "A classic Gang of Four behavioral pattern heavily used across Spring and Java core libraries.",
    hint: "Defines algorithm skeleton in base class; marked final to protect algorithm sequence.",
    level: "Advanced",
    codeExample: "public final void execute() { step1(); customStep2(); step3(); }"
  }
];

export default topic14_questions;