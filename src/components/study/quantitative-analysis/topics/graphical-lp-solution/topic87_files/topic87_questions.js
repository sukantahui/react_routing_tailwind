const questions = [
  {
    question: "What is the purpose of unsolved problems?",
    shortAnswer: "Unsolved problems help students practice independently and build problem-solving skills.",
    explanation: "Working through problems without immediate solutions forces students to apply concepts, make mistakes, and learn from them. This is how true understanding develops.",
    hint: "Practice makes perfect.",
    level: "basic",
    codeExample: "Attempt independently → Check answer → Learn"
  },
  {
    question: "How should I approach an unsolved problem?",
    shortAnswer: "Follow the step-by-step procedure: read, define variables, formulate, graph, solve, and verify.",
    explanation: "A systematic approach prevents errors and builds good habits. Don't skip steps, even for simple problems.",
    hint: "Follow the procedure.",
    level: "basic",
    codeExample: "Step 1-9 procedure"
  },
  {
    question: "What if I can't solve a problem?",
    shortAnswer: "Use the hint first, then try again. If still stuck, review the related concepts and try a simpler problem.",
    explanation: "Getting stuck is part of learning. Hints provide guidance without giving away the solution. Reviewing concepts helps build understanding.",
    hint: "Use hints, review concepts.",
    level: "basic",
    codeExample: "Hint → Try again → Review → Retry"
  },
  {
    question: "When should I check the answer key?",
    shortAnswer: "Only after you've genuinely attempted the problem and done your best work.",
    explanation: "The answer key is for verification, not for learning by reading answers. The learning happens in the attempt, not in the answer.",
    hint: "Attempt first, check later.",
    level: "intermediate",
    codeExample: "Solve → Verify → Learn from mistakes"
  },
  {
    question: "Why are there problems with 3 variables?",
    shortAnswer: "These problems introduce the concept that graphical methods are limited to 2 variables.",
    explanation: "Problems with 3+ variables require the simplex method or other techniques. These problems help students understand the limitations of graphical LP.",
    hint: "3 variables = beyond graphical.",
    level: "intermediate",
    codeExample: "Simplex method needed for 3+ variables"
  },
  {
    question: "What is the difference between solved and unsolved problems?",
    shortAnswer: "Solved problems show the solution process; unsolved problems require independent work.",
    explanation: "Solved problems teach the method. Unsolved problems test understanding. Both are important for learning.",
    hint: "Learn from solved, practice with unsolved.",
    level: "basic",
    codeExample: "Solved: learn how, Unsolved: practice doing"
  },
  {
    question: "How do I know if my answer is correct?",
    shortAnswer: "Check that your solution satisfies all constraints and gives the optimal objective value.",
    explanation: "A correct solution must be feasible (satisfy all constraints) and optimal (best objective value). Verify both conditions.",
    hint: "Check feasibility and optimality.",
    level: "intermediate",
    codeExample: "Feasible + Optimal = Correct"
  },
  {
    question: "What should I do if my answer doesn't match the key?",
    shortAnswer: "Review your work step by step, check constraints, graphing, and calculations.",
    explanation: "Errors often occur in early steps (variable definition, constraint formulation) or in calculations. Trace back through your work.",
    hint: "Trace back through steps.",
    level: "intermediate",
    codeExample: "Check each step: variables → constraints → graph → calculations"
  }
];

export default questions;