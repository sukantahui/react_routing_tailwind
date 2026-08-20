const questions = [
  {
    question: "What is an unbounded feasible region?",
    shortAnswer: "A region that extends to infinity in at least one direction.",
    explanation: "An unbounded region has no upper bounds on some variables, so it goes off the graph.",
    hint: "Goes to infinity.",
    level: "basic",
    codeExample: "x≥0, y≥0 is unbounded."
  },
  {
    question: "What is the first example of an unbounded region?",
    shortAnswer: "x ≥ 0, y ≥ 0 (the first quadrant).",
    explanation: "The first quadrant extends infinitely in both directions.",
    hint: "First quadrant.",
    level: "basic",
    codeExample: "x≥0, y≥0."
  },
  {
    question: "What is the second example of an unbounded region?",
    shortAnswer: "x ≥ 0, y ≥ 0, x + y ≥ 5.",
    explanation: "The region extends infinitely above the line x+y=5.",
    hint: "Above the line.",
    level: "intermediate",
    codeExample: "x+y≥5 with non-negativity."
  },
  {
    question: "What is the third example of an unbounded region?",
    shortAnswer: "x ≥ 0, y ≥ 0, y ≤ 5.",
    explanation: "The region extends infinitely to the right.",
    hint: "Unbounded right.",
    level: "intermediate",
    codeExample: "y≤5, x≥0, y≥0."
  },
  {
    question: "What is an example of a bounded region?",
    shortAnswer: "x ≥ 0, y ≥ 0, x + y ≤ 10.",
    explanation: "The region is a triangle with finite area.",
    hint: "Triangle.",
    level: "basic",
    codeExample: "x+y≤10 with non-negativity."
  },
  {
    question: "What causes an unbounded feasible region?",
    shortAnswer: "Missing upper bound constraints on some variables.",
    explanation: "Without upper bounds, variables can grow infinitely.",
    hint: "No upper bounds.",
    level: "intermediate",
    codeExample: "x≥0 alone is unbounded."
  },
  {
    question: "What is the visual clue for an unbounded region?",
    shortAnswer: "The region goes off the graph in some direction.",
    explanation: "If you can't enclose the region with a circle, it's unbounded.",
    hint: "Goes off the page.",
    level: "basic",
    codeExample: "The shaded area extends beyond the graph."
  },
  {
    question: "What is the visual clue for the first example (first quadrant)?",
    shortAnswer: "The region fills the entire first quadrant and goes off the graph.",
    explanation: "Both x and y can grow indefinitely.",
    hint: "Entire first quadrant.",
    level: "basic",
    codeExample: "The region covers all of QI."
  },
  {
    question: "What is the visual clue for the second example?",
    shortAnswer: "The region is above x+y=5 and extends infinitely northeast.",
    explanation: "The region has no upper bounds.",
    hint: "Above the line.",
    level: "intermediate",
    codeExample: "Region above x+y=5."
  },
  {
    question: "What is the visual clue for the third example?",
    shortAnswer: "The region is bounded vertically but extends infinitely right.",
    explanation: "y is bounded (0≤y≤5) but x has no upper bound.",
    hint: "Unbounded right.",
    level: "intermediate",
    codeExample: "0≤y≤5, x≥0."
  },
  {
    question: "What is the visual clue for the bounded region example?",
    shortAnswer: "The region is a triangle with finite area.",
    explanation: "The region is enclosed by constraints.",
    hint: "Triangle.",
    level: "basic",
    codeExample: "Triangle with vertices (0,0), (10,0), (0,10)."
  },
  {
    question: "How do you identify an unbounded region?",
    shortAnswer: "Check if any variable has no upper bound constraint.",
    explanation: "If a variable can go to infinity, the region is unbounded.",
    hint: "Check upper bounds.",
    level: "intermediate",
    codeExample: "If x has no constraint x≤M, it's unbounded."
  },
  {
    question: "What are the unbounded directions in the first example?",
    shortAnswer: "Increasing x (right), increasing y (up), increasing both (northeast).",
    explanation: "All directions in the first quadrant are unbounded.",
    hint: "Right, up, northeast.",
    level: "intermediate",
    codeExample: "x↑, y↑, both↑."
  },
  {
    question: "What are the unbounded directions in the second example?",
    shortAnswer: "Increasing x (right), increasing y (up), increasing both (northeast).",
    explanation: "The region above x+y=5 extends in all northeast directions.",
    hint: "Right, up, northeast.",
    level: "intermediate",
    codeExample: "x↑, y↑, both↑."
  },
  {
    question: "What are the unbounded directions in the third example?",
    shortAnswer: "Increasing x (right).",
    explanation: "y is bounded (0≤y≤5), but x can grow infinitely.",
    hint: "Only right.",
    level: "intermediate",
    codeExample: "x↑ only."
  },
  {
    question: "What is the most common mistake with unbounded regions?",
    shortAnswer: "Assuming all unbounded regions are problems.",
    explanation: "For minimization, unbounded regions can still have optimal solutions.",
    hint: "Not always a problem.",
    level: "basic",
    codeExample: "Minimization can work in unbounded regions."
  },
  {
    question: "Can an unbounded region have an optimal solution for minimization?",
    shortAnswer: "Yes, if the objective decreases toward the region.",
    explanation: "Even with an unbounded region, minimization can have a finite optimal value.",
    hint: "Minimization can work.",
    level: "intermediate",
    codeExample: "Minimize C=x+y with x+y≥5 → optimum at boundary."
  },
  {
    question: "How do you make an unbounded region bounded?",
    shortAnswer: "Add upper bound constraints on the variables.",
    explanation: "Add constraints like x≤M and y≤N to bound the region.",
    hint: "Add upper bounds.",
    level: "intermediate",
    codeExample: "Add x≤10, y≤10 to make it bounded."
  },
  {
    question: "What is the difference between unbounded and infeasible?",
    shortAnswer: "Unbounded: infinite solution; Infeasible: no solution.",
    explanation: "Unbounded means the region extends to infinity. Infeasible means the region is empty.",
    hint: "Infinite vs none.",
    level: "basic",
    codeExample: "Unbounded: x≥0; Infeasible: x≤5, x≥10."
  },
  {
    question: "What is the identification method for unbounded regions?",
    shortAnswer: "Look for missing upper bounds or lower bound only constraints.",
    explanation: "If a variable has no upper bound or only lower bounds, the region is unbounded.",
    hint: "Missing upper bounds.",
    level: "intermediate",
    codeExample: "x+y≥5 (only lower bound) → unbounded."
  },
  {
    question: "What is the role of non-negativity in unbounded regions?",
    shortAnswer: "Non-negativity alone creates an unbounded region.",
    explanation: "x≥0, y≥0 has no upper bounds, so it's unbounded.",
    hint: "No upper bounds.",
    level: "basic",
    codeExample: "x≥0, y≥0 is unbounded."
  },
  {
    question: "What is the relationship between upper bounds and bounded regions?",
    shortAnswer: "Upper bounds create bounded regions by limiting variables.",
    explanation: "Constraints like x≤M and y≤N bound the region.",
    hint: "Upper bounds bound.",
    level: "intermediate",
    codeExample: "x≤10, y≤10 creates a bounded region."
  },
  {
    question: "What is the relationship between lower bounds and unbounded regions?",
    shortAnswer: "Lower bounds alone create unbounded regions.",
    explanation: "Constraints like x+y≥5 only provide lower bounds, not upper bounds.",
    hint: "Lower bounds don't bound.",
    level: "intermediate",
    codeExample: "x+y≥5 is unbounded."
  },
  {
    question: "What is the most important thing to remember about unbounded regions?",
    shortAnswer: "They extend to infinity and may or may not have optimal solutions.",
    explanation: "Unbounded regions are not necessarily problems — it depends on the objective direction.",
    hint: "Not always a problem.",
    level: "basic",
    codeExample: "Check the objective direction."
  },
  {
    question: "What is the first example's unbounded reason?",
    shortAnswer: "The first quadrant has no upper bounds.",
    explanation: "x and y can grow infinitely.",
    hint: "No upper bounds.",
    level: "basic",
    codeExample: "x≥0, y≥0."
  },
  {
    question: "What is the second example's unbounded reason?",
    shortAnswer: "x+y≥5 only provides a lower bound.",
    explanation: "The region extends infinitely above the line.",
    hint: "Lower bound only.",
    level: "intermediate",
    codeExample: "x+y≥5."
  },
  {
    question: "What is the third example's unbounded reason?",
    shortAnswer: "x has no upper bound.",
    explanation: "y is bounded (0≤y≤5), but x is not.",
    hint: "x has no bound.",
    level: "intermediate",
    codeExample: "x≥0 with no upper bound."
  },
  {
    question: "What is the bounded region's bounded reason?",
    shortAnswer: "x+y≤10 provides an upper bound.",
    explanation: "The region is enclosed by x+y≤10.",
    hint: "Upper bound.",
    level: "basic",
    codeExample: "x+y≤10."
  },
  {
    question: "What is the visual clue for an unbounded region in the first example?",
    shortAnswer: "The region fills the entire first quadrant.",
    explanation: "Both x and y go to infinity.",
    hint: "Entire QI.",
    level: "basic",
    codeExample: "The region covers all of QI."
  },
  {
    question: "What is the visual clue for an unbounded region in the second example?",
    shortAnswer: "The region is above x+y=5 and extends infinitely.",
    explanation: "The region has no upper bounds.",
    hint: "Above the line.",
    level: "intermediate",
    codeExample: "Region above x+y=5."
  },
  {
    question: "What is the visual clue for an unbounded region in the third example?",
    shortAnswer: "The region extends infinitely to the right.",
    explanation: "y is bounded but x is not.",
    hint: "Unbounded right.",
    level: "intermediate",
    codeExample: "0≤y≤5, x≥0."
  }
];

export default questions;