const questions = [
  {
    question: "What is the most common mistake in graphical LP?",
    shortAnswer: "Rushing to graph without properly understanding the problem and identifying all constraints.",
    explanation: "Students often start graphing immediately without fully understanding what the problem asks, leading to incorrect variable definitions, missing constraints, or wrong objective function.",
    hint: "Understand first, graph second.",
    level: "basic",
    codeExample: "Missing non-negativity constraints or misidentifying the objective"
  },
  {
    question: "Why do students often forget non-negativity constraints?",
    shortAnswer: "They focus on the main constraints and overlook the requirement that variables cannot be negative.",
    explanation: "Non-negativity constraints (x ≥ 0, y ≥ 0) are easy to forget because they seem obvious. But they're essential for restricting solutions to real-world quantities.",
    hint: "Always include x ≥ 0 and y ≥ 0.",
    level: "basic",
    codeExample: "x ≥ 0, y ≥ 0 - often the last constraints written"
  },
  {
    question: "How do you determine which side of a constraint to shade?",
    shortAnswer: "Test a point (usually the origin) in the inequality. If it satisfies the inequality, shade that side.",
    explanation: "The origin (0,0) is the easiest point to test. If it satisfies the constraint, shade the side containing the origin. If not, shade the other side.",
    hint: "Test (0,0) to determine shading.",
    level: "intermediate",
    codeExample: "3x + 2y ≤ 240: Test (0,0) → 0 ≤ 240 ✓ → shade origin side"
  },
  {
    question: "What happens if you miss a corner point?",
    shortAnswer: "You might choose a suboptimal solution because the true optimum is at the missed corner point.",
    explanation: "The optimal solution is always at a corner point. Missing one corner point means you might miss the optimal solution entirely.",
    hint: "Find ALL corner points systematically.",
    level: "intermediate",
    codeExample: "Missing (0,8) could mean missing the optimal solution"
  },
  {
    question: "Why is it important to verify corner points?",
    shortAnswer: "Some corner points from line intersections may not be in the feasible region.",
    explanation: "Lines intersect at points that may violate other constraints. Always check that each corner point satisfies ALL constraints.",
    hint: "Check ALL constraints for each corner point.",
    level: "intermediate",
    codeExample: "(40,60) from line intersection but violates machine constraint"
  },
  {
    question: "What is the difference between '≥' and '≤' shading?",
    shortAnswer: "For '≤', shade below/inside the line. For '≥', shade above/outside the line.",
    explanation: "The direction of the inequality determines which side of the line is feasible. Test a point to confirm the correct side.",
    hint: "≤ = below, ≥ = above.",
    level: "basic",
    codeExample: "x + y ≤ 8: shade below, x + y ≥ 8: shade above"
  },
  {
    question: "What is a redundant constraint?",
    shortAnswer: "A constraint that doesn't affect the feasible region because it's always satisfied when other constraints are met.",
    explanation: "Redundant constraints don't change the optimal solution. They can be identified when the constraint line never touches the feasible region.",
    hint: "Constraint line outside feasible region.",
    level: "intermediate",
    codeExample: "x ≤ 10 is redundant if x ≤ 5 is already a constraint"
  },
  {
    question: "Why should you use consistent scaling on both axes?",
    shortAnswer: "Inconsistent scaling leads to incorrect visual interpretation and wrong intercepts.",
    explanation: "If the x and y axes use different scales, the graph is distorted. This can lead to wrong corner point identification and incorrect solutions.",
    hint: "Use the same scale on both axes.",
    level: "intermediate",
    codeExample: "1 unit = 1 cm on x-axis, 1 unit = 2 cm on y-axis → distortion"
  },
  {
    question: "What should you do after finding the optimal solution?",
    shortAnswer: "Verify the solution by substituting it back into ALL constraints.",
    explanation: "Always check that your optimal solution satisfies every constraint. This catches errors from incorrect shading or missed corner points.",
    hint: "Verify before finalizing.",
    level: "basic",
    codeExample: "Substitute (x*, y*) into each constraint to verify"
  },
  {
    question: "How can you avoid misreading the graph?",
    shortAnswer: "Mark intercepts clearly, use graph paper, and double-check coordinates.",
    explanation: "Accurate graphing is essential. Use graph paper or precise tools. Mark all intercepts and intersections clearly.",
    hint: "Be precise with your graph.",
    level: "intermediate",
    codeExample: "Mark (0,8) and (8,0) clearly on axes"
  },
  {
    question: "What is the most common objective function mistake?",
    shortAnswer: "Using the wrong coefficients or confusing maximization with minimization.",
    explanation: "Students sometimes maximize cost instead of profit, or use incorrect per-unit values from the problem statement.",
    hint: "Carefully read what the problem asks.",
    level: "intermediate",
    codeExample: "Maximizing cost (5x + 7y) instead of profit (10x + 8y)"
  },
  {
    question: "How do you handle '≥' constraints that don't pass through the origin?",
    shortAnswer: "Graph the line as usual, then test a point to determine the feasible side.",
    explanation: "For '≥' constraints, the feasible region is typically away from the origin (above the line). Test a point to confirm.",
    hint: "Test a point, shade accordingly.",
    level: "intermediate",
    codeExample: "x + y ≥ 8: test (0,0) → 0 ≥ 8 ✗ → shade away from origin"
  },
  {
    question: "What is the impact of forgetting to include constraints?",
    shortAnswer: "Forgetting constraints leads to an incorrect feasible region and a wrong optimal solution.",
    explanation: "Every constraint defines part of the feasible region. Missing any constraint makes the feasible region larger than it should be.",
    hint: "List all constraints before solving.",
    level: "intermediate",
    codeExample: "Forgetting machine constraint could lead to infeasible solution"
  },
  {
    question: "How can you check if a constraint is redundant?",
    shortAnswer: "Graph it and see if it ever touches the feasible region. If not, it's redundant.",
    explanation: "A redundant constraint doesn't form part of the feasible region boundary. It can be removed without changing the solution.",
    hint: "Check if the line touches the feasible region.",
    level: "advanced",
    codeExample: "Constraint line outside feasible region → redundant"
  },
  {
    question: "Why do students often get the objective function slope wrong?",
    shortAnswer: "They forget that the slope of Z = c₁x + c₂y is -c₁/c₂.",
    explanation: "The objective function line's slope is determined by the coefficients. Getting the slope wrong leads to incorrect optimization direction.",
    hint: "Slope = -c₁/c₂.",
    level: "advanced",
    codeExample: "Z = 5x + 3y has slope = -5/3"
  },
  {
    question: "What is the best way to prevent common mistakes?",
    shortAnswer: "Follow a systematic step-by-step procedure and verify each step.",
    explanation: "A systematic approach prevents errors. Check your work at each step rather than only at the end.",
    hint: "Be systematic and check your work.",
    level: "basic",
    codeExample: "Step 1: Understand, Step 2: Define, Step 3: Formulate..."
  },
  {
    question: "How does scaling affect corner point identification?",
    shortAnswer: "Poor scaling makes it hard to accurately read intercepts and intersections.",
    explanation: "If the graph is too small or the scale is inconsistent, you might misread coordinates. Use appropriate scaling for clear identification.",
    hint: "Choose scale that makes graph readable.",
    level: "intermediate",
    codeExample: "Use graph paper with appropriate scale"
  },
  {
    question: "What should you do if your solution doesn't make sense?",
    shortAnswer: "Go back through each step to find where the error occurred.",
    explanation: "If the optimal solution seems wrong (e.g., negative quantities, impossible values), there's likely an error in problem formulation or solving.",
    hint: "Trace back through your steps.",
    level: "intermediate",
    codeExample: "Recheck variables, constraints, and corner points"
  },
  {
    question: "Why is it important to learn common mistakes?",
    shortAnswer: "Understanding common mistakes helps you avoid them and builds better problem-solving habits.",
    explanation: "By learning from others' mistakes, you can develop awareness and prevent similar errors in your own work.",
    hint: "Learn from others' mistakes.",
    level: "basic",
    codeExample: "Prevention is better than correction"
  }
];

export default questions;