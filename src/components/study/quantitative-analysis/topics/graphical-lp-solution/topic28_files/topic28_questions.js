const questions = [
  {
    question: "What is the first step in solving an LP problem?",
    shortAnswer: "Define the decision variables.",
    explanation: "Before you can write the objective function and constraints, you need to define what x and y represent.",
    hint: "Define variables.",
    level: "basic",
    codeExample: "Let x = units of product X, y = units of product Y."
  },
  {
    question: "What is the objective function in the example?",
    shortAnswer: "Maximize Z = 3x + 4y.",
    explanation: "The objective is to maximize profit. Product X gives ₹3 profit per unit, Product Y gives ₹4 profit per unit.",
    hint: "Maximize Z = 3x + 4y.",
    level: "basic",
    codeExample: "Z = 3x + 4y"
  },
  {
    question: "What are the constraints in the example?",
    shortAnswer: "2x + 3y ≤ 12, 3x + 2y ≤ 12, x ≥ 0, y ≥ 0.",
    explanation: "Labor constraint: 2x + 3y ≤ 12. Material constraint: 3x + 2y ≤ 12. Non-negativity: x ≥ 0, y ≥ 0.",
    hint: "Labor, material, non-negativity.",
    level: "basic",
    codeExample: "2x + 3y ≤ 12, 3x + 2y ≤ 12, x ≥ 0, y ≥ 0."
  },
  {
    question: "What are the corner points of the feasible region?",
    shortAnswer: "O(0,0), A(4,0), B(2.4,2.4), C(0,4).",
    explanation: "These are the vertices of the feasible region where constraint lines intersect.",
    hint: "Four corner points.",
    level: "intermediate",
    codeExample: "O(0,0), A(4,0), B(2.4,2.4), C(0,4)."
  },
  {
    question: "What is the optimal solution in the example?",
    shortAnswer: "x = 2.4, y = 2.4, Z = 16.8.",
    explanation: "Producing 2.4 units of X and 2.4 units of Y gives the maximum profit of ₹16.8.",
    hint: "Optimal at B(2.4,2.4).",
    level: "intermediate",
    codeExample: "(2.4, 2.4) with Z = 16.8."
  },
  {
    question: "Why is the optimal solution at the intersection of constraints?",
    shortAnswer: "Both constraints are binding at the optimum.",
    explanation: "At (2.4,2.4), both labor and material constraints are fully utilized (12 hours and 12 units).",
    hint: "Both constraints are binding.",
    level: "intermediate",
    codeExample: "2(2.4)+3(2.4)=12 and 3(2.4)+2(2.4)=12."
  },
  {
    question: "What does it mean if a constraint is 'binding'?",
    shortAnswer: "The constraint is satisfied as an equality at the optimal solution.",
    explanation: "A binding constraint has no slack. All resources are fully used.",
    hint: "Fully utilized.",
    level: "intermediate",
    codeExample: "2x + 3y = 12 is binding at (2.4,2.4)."
  },
  {
    question: "What is slack in a constraint?",
    shortAnswer: "The difference between the available resource and the amount used.",
    explanation: "Slack = RHS - LHS. If slack > 0, the constraint is not binding.",
    hint: "Unused resource.",
    level: "intermediate",
    codeExample: "For 2x+3y≤12 at (0,0), slack = 12."
  },
  {
    question: "What is the maximum profit in the example?",
    shortAnswer: "₹16.8.",
    explanation: "The maximum profit is ₹16.8 when producing 2.4 units of each product.",
    hint: "₹16.8.",
    level: "basic",
    codeExample: "Z = 16.8."
  },
  {
    question: "Why are fractional solutions allowed in LP?",
    shortAnswer: "LP assumes divisibility of resources and products.",
    explanation: "In many real-world problems, products can be produced in fractional units (e.g., 2.4 units).",
    hint: "Divisibility assumption.",
    level: "intermediate",
    codeExample: "Producing 2.4 units is valid in LP."
  },
  {
    question: "What would happen if we produced only product X?",
    shortAnswer: "x = 4, y = 0, Z = 12.",
    explanation: "Producing only X uses 12 hours of labor and 12 units of material, but gives only ₹12 profit.",
    hint: "Lower profit than optimal.",
    level: "basic",
    codeExample: "(4,0) gives Z = 12."
  },
  {
    question: "What would happen if we produced only product Y?",
    shortAnswer: "x = 0, y = 4, Z = 16.",
    explanation: "Producing only Y gives ₹16 profit, which is better than only X but less than the optimal ₹16.8.",
    hint: "Z = 16.",
    level: "basic",
    codeExample: "(0,4) gives Z = 16."
  },
  {
    question: "Why is the origin not the optimal solution?",
    shortAnswer: "The origin gives Z = 0, which is the minimum, not the maximum.",
    explanation: "The origin is a corner point, but it gives the lowest profit, not the highest.",
    hint: "Z = 0 at origin.",
    level: "basic",
    codeExample: "O(0,0) gives Z = 0."
  },
  {
    question: "What is the labor constraint in the example?",
    shortAnswer: "2x + 3y ≤ 12.",
    explanation: "Each unit of X uses 2 hours of labor, each unit of Y uses 3 hours. Total labor available is 12 hours.",
    hint: "2x + 3y ≤ 12.",
    level: "basic",
    codeExample: "2x + 3y ≤ 12."
  },
  {
    question: "What is the material constraint in the example?",
    shortAnswer: "3x + 2y ≤ 12.",
    explanation: "Each unit of X uses 3 units of material, each unit of Y uses 2 units. Total material available is 12 units.",
    hint: "3x + 2y ≤ 12.",
    level: "basic",
    codeExample: "3x + 2y ≤ 12."
  },
  {
    question: "How do you find the corner points graphically?",
    shortAnswer: "Find where the constraint lines intersect.",
    explanation: "Corner points are the intersections of two constraint lines (or a constraint and an axis).",
    hint: "Intersections of lines.",
    level: "intermediate",
    codeExample: "Solve 2x+3y=12 and 3x+2y=12 → (2.4,2.4)."
  },
  {
    question: "How do you find the corner points algebraically?",
    shortAnswer: "Solve pairs of constraint equations simultaneously.",
    explanation: "For each pair of constraints, solve the system of equations to find the intersection point.",
    hint: "Solve pairs of equations.",
    level: "intermediate",
    codeExample: "Solve 2x+3y=12 and 3x+2y=12 → (2.4,2.4)."
  },
  {
    question: "What is the role of non-negativity in this problem?",
    shortAnswer: "It restricts the solution to the first quadrant (x≥0, y≥0).",
    explanation: "Non-negativity ensures we don't produce negative quantities of products.",
    hint: "First quadrant.",
    level: "basic",
    codeExample: "x ≥ 0, y ≥ 0."
  },
  {
    question: "What if the problem required integer solutions?",
    shortAnswer: "The optimal integer solution would be different.",
    explanation: "If we must produce whole units, the optimal would be (2,2) or (2,3) or (3,2), giving lower profit.",
    hint: "Integer programming.",
    level: "expert",
    codeExample: "Integer optimal might be (2,2) with Z=14."
  },
  {
    question: "What is the difference between LP and integer programming?",
    shortAnswer: "LP allows fractional solutions; integer programming requires whole numbers.",
    explanation: "LP assumes divisibility; integer programming is for problems where fractional solutions don't make sense.",
    hint: "Fractions vs whole numbers.",
    level: "expert",
    codeExample: "LP: x=2.4; IP: x=2 or 3."
  },
  {
    question: "What is the profit at (4,0)?",
    shortAnswer: "Z = 12.",
    explanation: "At (4,0), Z = 3(4) + 4(0) = 12.",
    hint: "Z = 12.",
    level: "basic",
    codeExample: "(4,0) gives Z = 12."
  },
  {
    question: "What is the profit at (0,4)?",
    shortAnswer: "Z = 16.",
    explanation: "At (0,4), Z = 3(0) + 4(4) = 16.",
    hint: "Z = 16.",
    level: "basic",
    codeExample: "(0,4) gives Z = 16."
  },
  {
    question: "What is the profit at (2.4,2.4)?",
    shortAnswer: "Z = 16.8.",
    explanation: "At (2.4,2.4), Z = 3(2.4) + 4(2.4) = 7.2 + 9.6 = 16.8.",
    hint: "Z = 16.8.",
    level: "basic",
    codeExample: "(2.4,2.4) gives Z = 16.8."
  },
  {
    question: "What is the feasible region in this problem?",
    shortAnswer: "The set of all points satisfying all constraints.",
    explanation: "The feasible region is the overlap of all constraint half-planes.",
    hint: "Overlap of constraints.",
    level: "basic",
    codeExample: "The shaded region on the graph."
  },
  {
    question: "How do you verify the optimal solution?",
    shortAnswer: "Check that it satisfies all constraints and gives the highest Z.",
    explanation: "Substitute the optimal point into all constraints to verify feasibility, and compare Z values.",
    hint: "Check constraints and Z.",
    level: "intermediate",
    codeExample: "Check (2.4,2.4) in all constraints."
  },
  {
    question: "What is the shadow price of labor?",
    shortAnswer: "The amount profit increases with one more unit of labor.",
    explanation: "Shadow price tells the value of an additional unit of a constrained resource.",
    hint: "Value of extra resource.",
    level: "expert",
    codeExample: "Shadow price of labor = 1.2 (in this example)."
  },
  {
    question: "Why is the labor constraint binding at the optimum?",
    shortAnswer: "Because 2(2.4) + 3(2.4) = 12, exactly using all labor.",
    explanation: "There is no slack in the labor constraint at the optimal solution.",
    hint: "All labor is used.",
    level: "intermediate",
    codeExample: "2(2.4)+3(2.4)=12."
  },
  {
    question: "Why is the material constraint binding at the optimum?",
    shortAnswer: "Because 3(2.4) + 2(2.4) = 12, exactly using all material.",
    explanation: "There is no slack in the material constraint at the optimal solution.",
    hint: "All material is used.",
    level: "intermediate",
    codeExample: "3(2.4)+2(2.4)=12."
  },
  {
    question: "What if we had more labor available?",
    shortAnswer: "The optimal solution would change, likely producing more Y.",
    explanation: "With more labor, we could produce more of the more profitable product (Y), increasing profit.",
    hint: "More labor → more Y.",
    level: "intermediate",
    codeExample: "If labor increased to 14, optimal might change."
  },
  {
    question: "What if the profit of X increased to ₹5?",
    shortAnswer: "The optimal solution would shift toward more X.",
    explanation: "If X becomes more profitable, we would produce more X and less Y.",
    hint: "Higher profit for X → more X.",
    level: "intermediate",
    codeExample: "If profit of X = 5, optimal might be (4,0)."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "The optimal solution occurs at a corner point where constraints intersect.",
    explanation: "This demonstrates the corner-point principle in action.",
    hint: "Optimum at a corner.",
    level: "basic",
    codeExample: "The maximum is at B(2.4,2.4)."
  }
];

export default questions;