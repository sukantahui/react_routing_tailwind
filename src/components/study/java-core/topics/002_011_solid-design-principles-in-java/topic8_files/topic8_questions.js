const topic8_questions = [
  {
    question: "Why is decomposing a monolithic Worker interface into Workable, Feedable, and Rechargeable an example of ISP?",
    shortAnswer: "Because automated AI bots or automated server scripts should never be forced to implement human-specific methods like 'takeLunchBreak()'. Decomposing interfaces ensures each implementer only declares capabilities it genuinely supports.",
    explanation: "Eliminates empty stub implementations and avoids confusing runtime contracts.",
    hint: "Allows human workers and robot workers to implement only relevant capabilities.",
    level: "Intermediate",
    codeExample: "class Robot implements Workable, Rechargeable { /* No lunch method needed! */ }"
  }
];

export default topic8_questions;