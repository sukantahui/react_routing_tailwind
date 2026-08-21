const questions = [
  {
    question: "What is the optimality condition in the Simplex Method?",
    shortAnswer: "The rule that determines when to stop the algorithm.",
    explanation: "For maximization: all Z coefficients ≥ 0. For minimization: all Z coefficients ≤ 0. When this condition is met, the current solution is optimal.",
    hint: "Stop condition for the algorithm.",
    level: "basic",
    codeExample: "Z row: [0, 0, 1, 1, 16] → optimal ✓"
  },
  {
    question: "What is the optimality condition for maximization?",
    shortAnswer: "All coefficients in the Z row must be ≥ 0.",
    explanation: "If any Z coefficient is negative, the objective can be improved by increasing that variable. Stop only when all are non-negative.",
    hint: "All Z ≥ 0.",
    level: "basic",
    codeExample: "Z row: [0, 2, 3, 0, 25] → optimal"
  },
  {
    question: "What is the optimality condition for minimization?",
    shortAnswer: "All coefficients in the Z row must be ≤ 0.",
    explanation: "If any Z coefficient is positive, the objective can be improved by increasing that variable. Stop only when all are non-positive.",
    hint: "All Z ≤ 0.",
    level: "basic",
    codeExample: "Z row: [0, -2, -3, 0, 25] → optimal"
  },
  {
    question: "What happens if a Z coefficient is negative in maximization?",
    shortAnswer: "The solution is not optimal; continue iterations.",
    explanation: "A negative Z coefficient means the corresponding variable can increase the objective value. It should enter the basis.",
    hint: "Not optimal, continue.",
    level: "intermediate",
    codeExample: "Z row: [0, -3, 2, 0, 18] → continue"
  },
  {
    question: "What happens if a Z coefficient is positive in minimization?",
    shortAnswer: "The solution is not optimal; continue iterations.",
    explanation: "A positive Z coefficient in minimization means the objective can be decreased by increasing that variable.",
    hint: "Not optimal, continue.",
    level: "intermediate",
    codeExample: "Z row: [0, 3, -2, 0, 18] → continue"
  },
  {
    question: "What do zero coefficients in the Z row indicate?",
    shortAnswer: "The variable doesn't affect the objective value.",
    explanation: "Zero coefficients mean increasing that variable doesn't change Z. This can indicate multiple optimal solutions.",
    hint: "No effect on Z.",
    level: "advanced",
    codeExample: "Z row: [0, 0, 0, 1, 25] → multiple optima"
  },
  {
    question: "Can the optimality condition be checked at any time?",
    shortAnswer: "Yes, after each iteration before continuing.",
    explanation: "The optimality condition should be checked at the end of each iteration. If met, stop. If not, perform another iteration.",
    hint: "Check after each iteration.",
    level: "intermediate",
    codeExample: "Check → stop or continue"
  },
  {
    question: "What is the difference between max and min optimality conditions?",
    shortAnswer: "Max: all Z ≥ 0; Min: all Z ≤ 0.",
    explanation: "The direction is reversed because maximization and minimization have opposite goals. Zero coefficients are allowed in both.",
    hint: "≥ for max, ≤ for min.",
    level: "basic",
    codeExample: "Max: [0, 2, 3, 0], Min: [0, -2, -3, 0]"
  },
  {
    question: "What does it mean if all Z coefficients are non-negative?",
    shortAnswer: "The current solution is optimal for maximization.",
    explanation: "No variable can improve the objective value. The Simplex Method stops.",
    hint: "Optimal found.",
    level: "basic",
    codeExample: "Z row: [0, 1, 2, 3, 20] → optimal"
  },
  {
    question: "What does it mean if all Z coefficients are non-positive?",
    shortAnswer: "The current solution is optimal for minimization.",
    explanation: "No variable can improve the objective value. The Simplex Method stops.",
    hint: "Optimal found.",
    level: "basic",
    codeExample: "Z row: [0, -1, -2, -3, 20] → optimal"
  },
  {
    question: "What if the Z row has both positive and negative coefficients?",
    shortAnswer: "The solution is not optimal (for either max or min).",
    explanation: "Mixed signs mean the solution is not optimal for maximization (negative coefficients exist) nor minimization (positive coefficients exist).",
    hint: "Not optimal.",
    level: "intermediate",
    codeExample: "Z row: [0, -3, 2, -1, 18] → not optimal"
  },
  {
    question: "How do you know which variable to enter from the Z row?",
    shortAnswer: "Choose the most negative (for max) or most positive (for min).",
    explanation: "For maximization, the most negative coefficient gives the greatest improvement. For minimization, the most positive coefficient gives the greatest reduction.",
    hint: "Most negative for max, most positive for min.",
    level: "advanced",
    codeExample: "Max: [-5, -3, 0, 0] → x enters (-5)"
  },
  {
    question: "What is the relationship between optimality and basic variables?",
    shortAnswer: "Optimality is checked on the Z row, not on basic variables.",
    explanation: "The Z row coefficients (reduced costs) determine optimality. Basic variable values only affect feasibility.",
    hint: "Z row determines optimality.",
    level: "intermediate",
    codeExample: "Basic variables: x=4, y=2; Z row determines optimality"
  },
  {
    question: "What happens if the optimality condition is met but Z is negative?",
    shortAnswer: "For maximization, Z should be non-negative. If Z is negative, there's an error.",
    explanation: "In maximization, Z represents the objective value and should be ≥ 0. Negative Z indicates a problem with the formulation or arithmetic.",
    hint: "Z should be ≥ 0 for max.",
    level: "advanced",
    codeExample: "Z = -5 (max) → check for errors"
  },
  {
    question: "What is the role of reduced costs in optimality?",
    shortAnswer: "They are the coefficients in the Z row.",
    explanation: "Reduced costs (Z row coefficients) indicate how much the objective would change if a non-basic variable entered the basis.",
    hint: "Z coefficients = reduced costs.",
    level: "advanced",
    codeExample: "Reduced cost = -3 means Z increases by 3 if variable enters"
  },
  {
    question: "Can the optimality condition be used for both max and min?",
    shortAnswer: "Yes, but with opposite conditions.",
    explanation: "The same Z row is used, but the stopping rule depends on the problem type: ≥ 0 for max, ≤ 0 for min.",
    hint: "Yes, but different rules.",
    level: "intermediate",
    codeExample: "Max: ≥ 0, Min: ≤ 0"
  },
  {
    question: "What is the significance of the optimality condition?",
    shortAnswer: "It proves that no better solution exists.",
    explanation: "The optimality condition provides a mathematical guarantee that the current solution is the best possible.",
    hint: "Guarantees optimality.",
    level: "basic",
    codeExample: "All Z ≥ 0 → no improvement possible"
  },
  {
    question: "How many times should you check the optimality condition?",
    shortAnswer: "After every iteration.",
    explanation: "Check at the end of each iteration before deciding whether to continue. This prevents unnecessary iterations.",
    hint: "Check every iteration.",
    level: "basic",
    codeExample: "After pivot → check optimality → stop or continue"
  }
];

export default questions;