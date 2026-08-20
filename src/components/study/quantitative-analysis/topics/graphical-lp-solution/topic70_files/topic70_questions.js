const questions = [
  {
    question: "What is an unbounded solution in LP?",
    shortAnswer: "An unbounded solution occurs when the objective function can improve indefinitely without bound.",
    explanation: "Unbounded means the feasible region is non-empty but the objective function has no finite maximum (or minimum). The objective can go to infinity (or negative infinity) as variables increase.",
    hint: "Objective can go to infinity.",
    level: "basic",
    codeExample: "Max Z = x + y, with x, y ≥ 0\nZ can go to infinity → Unbounded"
  },
  {
    question: "What causes unboundedness in LP problems?",
    shortAnswer: "Unboundedness is caused by the feasible region extending to infinity in the direction of optimization, with no constraints limiting the objective.",
    explanation: "When the feasible region is unbounded and the objective function improves in the unbounded direction, the problem is unbounded. Missing upper bound constraints are the most common cause.",
    hint: "Feasible region extends to infinity.",
    level: "intermediate",
    codeExample: "Max Z = 2x + y, with x - y ≤ 2\nFeasible region unbounded → Unbounded"
  },
  {
    question: "How do you identify unboundedness graphically?",
    shortAnswer: "Unboundedness appears as a feasible region that extends to infinity in the direction where the objective function improves.",
    explanation: "On a graph, you'll see the feasible region continues indefinitely. The objective function lines keep improving as you move in the unbounded direction.",
    hint: "Region extends to infinity.",
    level: "intermediate",
    codeExample: "Region: x ≥ 0, y ≥ 0 (extends to infinity)\nZ = x + y improves as x, y increase"
  },
  {
    question: "What is the difference between unbounded and infeasible?",
    shortAnswer: "Unbounded means a solution exists but no finite optimum, while infeasible means no solution exists.",
    explanation: "Unbounded: non-empty feasible region, objective can improve indefinitely. Infeasible: empty feasible region, no solution exists.",
    hint: "No finite optimum vs. no solution.",
    level: "basic",
    codeExample: "Unbounded: Max Z = x, x ≥ 0\nInfeasible: x ≤ 2 and x ≥ 5"
  },
  {
    question: "How does the simplex method detect unboundedness?",
    shortAnswer: "The simplex method detects unboundedness when a variable can enter the basis with no upper bound (ratio test fails).",
    explanation: "When choosing an entering variable, if all ratios are non-positive or undefined, the problem is unbounded. The variable can increase indefinitely without violating constraints.",
    hint: "Ratio test fails = unbounded.",
    level: "advanced",
    codeExample: "In simplex: entering variable with no ratio\n→ Column has no positive entries → Unbounded"
  },
  {
    question: "Can unboundedness occur in minimization problems?",
    shortAnswer: "Yes, minimization problems can be unbounded when the objective can decrease without bound.",
    explanation: "For minimization, unboundedness occurs when the objective function can go to negative infinity. This happens when the feasible region extends in the direction where Z decreases.",
    hint: "Objective can go to -∞.",
    level: "intermediate",
    codeExample: "Min Z = -x - y, with x, y ≥ 0\nZ can go to -∞ → Unbounded"
  },
  {
    question: "How do you fix an unbounded LP problem?",
    shortAnswer: "Add additional constraints to bound the feasible region in the direction of optimization.",
    explanation: "The solution is to add realistic upper bounds on variables. In real-world problems, there are always limits like market demand, resource capacity, or budget constraints.",
    hint: "Add bounding constraints.",
    level: "intermediate",
    codeExample: "Add constraints: x ≤ 100, y ≤ 100\nBounds the feasible region"
  },
  {
    question: "What is the role of non-negativity constraints in unboundedness?",
    shortAnswer: "Non-negativity constraints (x ≥ 0, y ≥ 0) can contribute to unboundedness by allowing variables to increase without bound.",
    explanation: "Non-negativity only provides lower bounds. Without upper bounds, variables can increase indefinitely, leading to unboundedness if the objective improves with these variables.",
    hint: "Lower bounds don't prevent unboundedness.",
    level: "intermediate",
    codeExample: "x, y ≥ 0 (only lower bounds)\nNo upper bounds → Potential unboundedness"
  },
  {
    question: "What is the practical significance of unboundedness?",
    shortAnswer: "Unboundedness indicates missing constraints in the problem formulation.",
    explanation: "In the real world, resources are always limited. Unboundedness usually means constraints like market demand, production capacity, or resource availability were forgotten.",
    hint: "Missing real-world constraints.",
    level: "intermediate",
    codeExample: "Unbounded profit → Missing market demand constraint"
  },
  {
    question: "Can an unbounded problem have corner points?",
    shortAnswer: "Yes, unbounded problems can have corner points, but they don't include the optimal point.",
    explanation: "Unbounded problems have a feasible region with corner points, but the optimal solution is not at a corner point - it goes to infinity. Some corner points may be optimal in the bounded part.",
    hint: "Corner points exist but no optimal corner.",
    level: "advanced",
    codeExample: "Bounded part has corner points\nOptimal solution goes to infinity"
  },
  {
    question: "What is the relationship between unboundedness and the objective function coefficients?",
    shortAnswer: "The objective function coefficients determine the direction of unboundedness.",
    explanation: "If the objective coefficients are positive in an unbounded direction (increasing variables), the problem is unbounded for maximization. For minimization, negative coefficients in the unbounded direction cause unboundedness.",
    hint: "Coefficients determine direction.",
    level: "advanced",
    codeExample: "Max Z = 2x + 3y (positive coefficients)\nIncreasing x,y → Unbounded"
  },
  {
    question: "How do you prove a problem is unbounded?",
    shortAnswer: "Find a direction in the feasible region where the objective improves and the region extends to infinity.",
    explanation: "To prove unboundedness, show there exists a feasible ray (direction) where the objective increases (for maximization) indefinitely while satisfying all constraints.",
    hint: "Find an improving direction to infinity.",
    level: "advanced",
    codeExample: "Direction d = (1, 1) in feasible region\nZ increases by c·d > 0 → Unbounded"
  },
  {
    question: "Can changing the objective function make an unbounded problem bounded?",
    shortAnswer: "Yes, if the new objective doesn't improve in the unbounded direction.",
    explanation: "If the objective function is changed so it doesn't increase in the unbounded direction, the problem may become bounded. However, the original problem remains unbounded.",
    hint: "Different objective may be bounded.",
    level: "intermediate",
    codeExample: "Original: Max Z = x (unbounded)\nChanged: Max Z = -x (bounded)"
  },
  {
    question: "What is the difference between unbounded feasible region and unbounded LP?",
    shortAnswer: "An unbounded feasible region doesn't always mean the LP is unbounded - the objective may not improve in the unbounded direction.",
    explanation: "The feasible region can be unbounded, but the LP problem may still have a finite optimal solution if the objective decreases in the unbounded direction (for maximization).",
    hint: "Unbounded region ≠ unbounded LP.",
    level: "advanced",
    codeExample: "Region: x, y ≥ 0 (unbounded)\nMax Z = -x - y → Bounded (optimum at 0)"
  },
  {
    question: "How does the Big M method handle unboundedness?",
    shortAnswer: "The Big M method will show unboundedness when the ratio test fails during the simplex iterations.",
    explanation: "In the Big M method, unboundedness is detected the same way as in the regular simplex method - when a variable has no positive ratio in the constraints.",
    hint: "Ratio test fails in Big M too.",
    level: "advanced",
    codeExample: "Entering variable with no positive ratios\n→ Unbounded solution"
  },
  {
    question: "What are common missing constraints in real-world unbounded problems?",
    shortAnswer: "Common missing constraints include market demand, production capacity, resource limits, budget constraints, and legal limits.",
    explanation: "Real-world problems always have limits. Common missing constraints: demand for products, available resources, capacity of machines, budget limitations, or regulatory requirements.",
    hint: "Real-world limits are always there.",
    level: "intermediate",
    codeExample: "Missing: x ≤ Demand, y ≤ Capacity\n→ Add these to prevent unboundedness"
  },
  {
    question: "Can unboundedness occur in transportation problems?",
    shortAnswer: "Unboundedness in transportation problems is rare because supply and demand constraints typically bound the variables.",
    explanation: "Transportation problems usually have supply and demand constraints that bound the variables. Unboundedness would only occur if there are missing supply or demand constraints.",
    hint: "Transportation usually bounded.",
    level: "intermediate",
    codeExample: "If supply = demand, variables are bounded\nNo unboundedness"
  },
  {
    question: "What is the relationship between unboundedness and dual problems?",
    shortAnswer: "If the primal problem is unbounded, the dual problem is infeasible.",
    explanation: "By LP duality, if a problem is unbounded, its dual is infeasible. This is a useful way to verify unboundedness - check if the dual has no feasible solution.",
    hint: "Primal unbounded → Dual infeasible.",
    level: "advanced",
    codeExample: "Primal unbounded (max)\nDual: constraints may be contradictory → Infeasible"
  },
  {
    question: "How do you identify unboundedness in the final tableau?",
    shortAnswer: "In the final tableau, unboundedness is identified by a non-basic variable with a negative reduced cost and no positive entries in its column.",
    explanation: "If a non-basic variable has a negative reduced cost (for maximization) and all entries in its column are non-positive, the problem is unbounded.",
    hint: "Negative reduced cost + no positive column entries.",
    level: "advanced",
    codeExample: "Variable x₂: reduced cost < 0\nAll aᵢ₂ ≤ 0 → Unbounded"
  },
  {
    question: "Can rounding errors cause false unboundedness detection?",
    shortAnswer: "Yes, numerical issues can sometimes cause a bounded problem to appear unbounded.",
    explanation: "Very small numbers from rounding can make ratios appear non-positive when they're actually positive. Using tolerance levels helps avoid false unboundedness detection.",
    hint: "Numerical precision matters.",
    level: "advanced",
    codeExample: "a = 0.0000001 (positive but appears zero)\nRatio test might falsely detect unboundedness"
  }
];

export default questions;