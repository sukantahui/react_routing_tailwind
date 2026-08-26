const topic15_questions = [
  {
    question: "Why is the Shape hierarchy (Circle, Rectangle, Triangle) the classic textbook demonstration of Dynamic Method Dispatch?",
    shortAnswer: "Because client loops can compute areas across mixed geometric collections via 'shape.calculateArea()' without writing cumbersome 'if (shape instanceof Circle)' conditionals.",
    explanation: "Dynamic Method Dispatch handles the mathematical formula dispatch internally.",
    hint: "Unified loop computes areas without manual type checking.",
    level: "Beginner",
    codeExample: "for (Shape s : shapes) total += s.calculateArea();"
  }
];

export default topic15_questions;