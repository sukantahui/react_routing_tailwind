const questions = [
  {
    question: "Why is it important to check a graphical LP solution?",
    shortAnswer: "Checking catches errors, builds confidence, and ensures the solution is correct and meaningful.",
    explanation: "Even small errors in graphing, calculation, or constraint identification can lead to wrong answers. Systematic checking prevents these errors from affecting the final solution.",
    hint: "Catch errors before they affect the answer.",
    level: "basic",
    codeExample: "Verify constraints, calculations, and optimality"
  },
  {
    question: "What should you check first in a graphical LP solution?",
    shortAnswer: "First, verify that the optimal solution satisfies ALL constraints.",
    explanation: "The most basic check is ensuring the solution is feasible. Substitute the optimal point into every constraint to confirm it satisfies all limitations.",
    hint: "Feasibility comes first.",
    level: "basic",
    codeExample: "Check 2x + y ≤ 10, x + 2y ≤ 8 at the optimal point"
  },
  {
    question: "How do you verify all corner points were found?",
    shortAnswer: "Check that you have all intersections of constraint lines and axes.",
    explanation: "Systematically list all intersections: constraint-constraint, constraint-x-axis, constraint-y-axis. Then verify each point is in the feasible region.",
    hint: "Check all intersections.",
    level: "intermediate",
    codeExample: "Corner points: (0,0), (5,0), (4,2), (0,4)"
  },
  {
    question: "How do you verify objective function calculations?",
    shortAnswer: "Re-evaluate Z at each corner point and check arithmetic.",
    explanation: "Recalculate Z for every corner point. Check your arithmetic carefully. Verify you selected the correct optimal point (max for maximization, min for minimization).",
    hint: "Double-check all calculations.",
    level: "intermediate",
    codeExample: "Z(4,2) = 5(4) + 3(2) = 20 + 6 = 26"
  },
  {
    question: "What is slack and why check it?",
    shortAnswer: "Slack = RHS - LHS for ≤ constraints. Checking slack verifies resource utilization.",
    explanation: "Slack should be ≥ 0 for all constraints. Slack = 0 means the constraint is binding. Positive slack means unused resources. Checking slack helps identify errors.",
    hint: "Slack measures unused resources.",
    level: "intermediate",
    codeExample: "Constraint: 2x + y ≤ 10, at (4,2): slack = 10 - 10 = 0"
  },
  {
    question: "How do you verify the graph is correct?",
    shortAnswer: "Check intercepts, lines, and shading. Test points in and out of the feasible region.",
    explanation: "Verify intercepts are correctly plotted. Ensure lines are straight. Test a point in the shaded region (should satisfy all constraints) and a point outside (should violate at least one constraint).",
    hint: "Check intercepts and shading.",
    level: "intermediate",
    codeExample: "Test (0,0) for ≤ constraints, check if it satisfies all"
  },
  {
    question: "What does it mean if slack is negative for a constraint?",
    shortAnswer: "Negative slack means the solution violates that constraint - it's infeasible.",
    explanation: "Slack = RHS - LHS must be ≥ 0 for all constraints. If slack is negative, the solution is not feasible and cannot be optimal.",
    hint: "Negative slack = infeasible solution.",
    level: "intermediate",
    codeExample: "Slack = 10 - 12 = -2 → constraint violated"
  },
  {
    question: "How do you verify optimality?",
    shortAnswer: "Check that no other corner point gives a better objective value.",
    explanation: "For maximization, verify Z at the optimal point is ≥ Z at all other corner points. For minimization, verify Z at the optimal point is ≤ Z at all other corner points.",
    hint: "Compare all corner points.",
    level: "intermediate",
    codeExample: "Z(4,2) = 26 is ≥ Z(5,0) = 25, Z(0,4) = 12, Z(0,0) = 0"
  },
  {
    question: "What is the purpose of testing a point in the feasible region?",
    shortAnswer: "Testing a point verifies that the shading is correct and the region is properly identified.",
    explanation: "Choose a point in the shaded region and verify it satisfies all constraints. Choose a point outside and verify it violates at least one constraint.",
    hint: "Test points to verify shading.",
    level: "intermediate",
    codeExample: "Test (2,2) in region: should satisfy all constraints"
  },
  {
    question: "How do you verify the solution is reasonable?",
    shortAnswer: "Check if the solution makes practical sense in the context of the problem.",
    explanation: "Consider if the values are realistic, if production quantities make sense, and if the solution aligns with intuition about the problem.",
    hint: "Does the answer "feel right"?",
    level: "intermediate",
    codeExample: "Are quantities positive? Do they make sense for the business?"
  },
  {
    question: "What should you do if your verification finds an error?",
    shortAnswer: "Go back through the solution step by step to find and correct the error.",
    explanation: "When verification finds an error, trace back through the solution process. Check each step: problem understanding, variable definition, constraint formulation, graphing, corner points, and evaluation.",
    hint: "Trace back through your steps.",
    level: "intermediate",
    codeExample: "Recheck constraints, graph, and calculations"
  },
  {
    question: "Why is it important to check all constraints, not just the binding ones?",
    shortAnswer: "Non-binding constraints may have errors in slack calculations or may be violated.",
    explanation: "Even if a constraint isn't binding, it could still be violated if there's an error. Checking all constraints ensures the solution is truly feasible.",
    hint: "Check every constraint.",
    level: "intermediate",
    codeExample: "Check both binding and non-binding constraints"
  },
  {
    question: "How do you verify the objective function line on a graph?",
    shortAnswer: "Check that the objective function line has the correct slope and position.",
    explanation: "The objective function line should have slope -c₁/c₂. It should pass through the optimal point and be parallel to itself when moved.",
    hint: "Check slope and position.",
    level: "advanced",
    codeExample: "Z = 5x + 3y has slope -5/3"
  },
  {
    question: "What is the role of the origin in verifying shading?",
    shortAnswer: "The origin is often used as a test point for ≤ constraints.",
    explanation: "For many ≤ constraints, the origin (0,0) satisfies the inequality. If it does, the feasible side is the side containing the origin. This is a quick check for shading correctness.",
    hint: "Test the origin.",
    level: "intermediate",
    codeExample: "2x + y ≤ 10: 0 ≤ 10 ✓ → shade origin side"
  },
  {
    question: "How do you verify all corner points are feasible?",
    shortAnswer: "Substitute each corner point into ALL constraints to confirm it satisfies every inequality.",
    explanation: "A corner point from line intersections might violate another constraint. Always verify each corner point satisfies all constraints.",
    hint: "Check each corner against all constraints.",
    level: "intermediate",
    codeExample: "(4,2) must satisfy both 2x+y≤10 and x+2y≤8"
  },
  {
    question: "What is the difference between verifying and solving?",
    shortAnswer: "Solving finds the answer; verifying confirms the answer is correct.",
    explanation: "Solving involves the process of finding the optimal solution. Verifying is the separate process of checking that solution for accuracy and feasibility.",
    hint: "Find then verify.",
    level: "basic",
    codeExample: "Solve: find (4,2). Verify: check it works."
  },
  {
    question: "Why should you document your verification?",
    shortAnswer: "Documentation helps catch errors, provides evidence of correctness, and aids in learning.",
    explanation: "Writing down your verification steps makes it easier to spot errors. It also helps teachers understand your reasoning and provides a record for future reference.",
    hint: "Write down what you checked.",
    level: "intermediate",
    codeExample: "List each check and its result"
  }
];

export default questions;