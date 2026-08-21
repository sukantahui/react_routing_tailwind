const questions = [
  {
    question: "What is the graphical solution procedure in LP?",
    shortAnswer: "A systematic method for solving two-variable LP problems by graphing constraints and evaluating corner points.",
    explanation: "The graphical procedure involves identifying the feasible region from constraints, finding corner points, evaluating the objective function at each corner, and selecting the optimal solution.",
    hint: "A step-by-step visual method for solving LP.",
    level: "basic",
    codeExample: "Step 1: Graph constraints → Step 2: Find feasible region → Step 3: Evaluate corners → Step 4: Select optimal"
  },
  {
    question: "What are the steps in the graphical solution procedure?",
    shortAnswer: "Understand problem, define variables, formulate objective, formulate constraints, graph, find corners, evaluate, select optimal, interpret.",
    explanation: "The procedure has 9 steps: 1) Understand the problem, 2) Define variables, 3) Formulate objective, 4) Formulate constraints, 5) Graph constraints, 6) Find corner points, 7) Evaluate objective, 8) Select optimal, 9) Interpret results.",
    hint: "9 steps from understanding to interpretation.",
    level: "basic",
    codeExample: "Step 1-9: Understand → Define → Objective → Constraints → Graph → Corners → Evaluate → Select → Interpret"
  },
  {
    question: "Why is the feasible region important?",
    shortAnswer: "The feasible region contains all possible solutions that satisfy all constraints.",
    explanation: "Only points within the feasible region are valid solutions. The optimal solution will always be at a corner point of this region.",
    hint: "All valid solutions are in the feasible region.",
    level: "intermediate",
    codeExample: "Feasible region = intersection of all constraints"
  },
  {
    question: "Where does the optimal solution occur?",
    shortAnswer: "The optimal solution always occurs at a corner point of the feasible region.",
    explanation: "The Fundamental Theorem of LP states that if an optimal solution exists, there is an optimal solution at a corner point (vertex) of the feasible region.",
    hint: "Corner point of feasible region.",
    level: "intermediate",
    codeExample: "Evaluate Z at (0,0), (50,0), (40,60), (0,120)"
  },
  {
    question: "How do you graph a constraint?",
    shortAnswer: "Convert to equality, find intercepts, draw the line, test a point, and shade the feasible side.",
    explanation: "Step 1: Replace inequality with =. Step 2: Find x and y intercepts. Step 3: Draw the line. Step 4: Test a point. Step 5: Shade the feasible region.",
    hint: "Equality → intercepts → line → test → shade.",
    level: "intermediate",
    codeExample: "3x + 2y ≤ 240 → 3x + 2y = 240 → (80,0) and (0,120)"
  },
  {
    question: "What are corner points in graphical LP?",
    shortAnswer: "The vertices of the feasible region formed by intersecting constraint lines.",
    explanation: "Corner points are where constraint lines intersect. They are the only candidates for optimal solutions.",
    hint: "Vertices of the feasible region.",
    level: "intermediate",
    codeExample: "(0,0), (50,0), (40,60), (0,120) are corner points"
  },
  {
    question: "How do you find corner points?",
    shortAnswer: "Find intersections of constraint lines and identify where they form vertices of the feasible region.",
    explanation: "Solve pairs of constraint equations to find intersection points. Check that each point satisfies all constraints.",
    hint: "Solve constraint pairs.",
    level: "intermediate",
    codeExample: "Solve 3x + 2y = 240 and 4x + y = 200 → (40,60)"
  },
  {
    question: "How do you evaluate the objective function?",
    shortAnswer: "Substitute each corner point into the objective function and calculate Z.",
    explanation: "For each corner point (x, y), calculate Z = c₁x + c₂y. Compare values to find max (or min).",
    hint: "Calculate Z at each corner.",
    level: "intermediate",
    codeExample: "Z(40,60) = 500(40) + 700(60) = 62,000"
  },
  {
    question: "What is the difference between maximization and minimization in graphical LP?",
    shortAnswer: "Maximization finds the highest Z value; minimization finds the lowest Z value at corner points.",
    explanation: "For maximization, choose the corner point with the largest objective value. For minimization, choose the smallest.",
    hint: "Max = highest, Min = lowest.",
    level: "basic",
    codeExample: "Max: choose largest Z, Min: choose smallest Z"
  },
  {
    question: "Why is it important to verify the optimal solution?",
    shortAnswer: "To ensure the solution satisfies all constraints and is truly optimal.",
    explanation: "Verification catches errors from incorrect graphing or calculation. Always substitute the optimal point back into all constraints.",
    hint: "Check constraints and optimality.",
    level: "intermediate",
    codeExample: "Check 3(40)+2(40)=200 ≤ 240, 4(40)+40=200 ≤ 200"
  },
  {
    question: "What are non-negativity constraints?",
    shortAnswer: "Constraints that require variables to be non-negative (x ≥ 0, y ≥ 0).",
    explanation: "Real-world quantities cannot be negative. These constraints restrict the feasible region to the first quadrant.",
    hint: "Variables must be ≥ 0.",
    level: "basic",
    codeExample: "x ≥ 0, y ≥ 0"
  },
  {
    question: "What is the objective function line?",
    shortAnswer: "A line representing all points with the same objective value.",
    explanation: "The objective function line Z = c₁x + c₂y can be drawn for different Z values. Moving it parallel helps identify the optimal corner point.",
    hint: "Line of constant Z value.",
    level: "intermediate",
    codeExample: "Z = 500x + 700y: different parallel lines for different Z values"
  },
  {
    question: "What does it mean if the objective function is parallel to a constraint?",
    shortAnswer: "It may indicate multiple optimal solutions.",
    explanation: "When the objective function has the same slope as a binding constraint, any point along that constraint edge gives the same optimal value.",
    hint: "Parallel lines = multiple optima.",
    level: "advanced",
    codeExample: "Objective slope = constraint slope → multiple optimal solutions"
  },
  {
    question: "What is the role of intercepts in graphing?",
    shortAnswer: "Intercepts provide two points to draw the constraint line accurately.",
    explanation: "The x-intercept (where y=0) and y-intercept (where x=0) are easy to find and give two points that define the line.",
    hint: "Two points define a line.",
    level: "basic",
    codeExample: "(80,0) and (0,120) define 3x + 2y = 240"
  },
  {
    question: "How do you determine which side of a constraint line to shade?",
    shortAnswer: "Test a point not on the line (usually the origin) to determine the feasible side.",
    explanation: "If the test point satisfies the inequality, shade the side containing it. If not, shade the opposite side.",
    hint: "Test a point, shade accordingly.",
    level: "intermediate",
    codeExample: "Test (0,0): 0 ≤ 240 → true, shade side with origin"
  },
  {
    question: "What is a binding constraint?",
    shortAnswer: "A constraint that is satisfied as an equality at the optimal solution (slack = 0).",
    explanation: "Binding constraints are fully utilized and limit the optimal solution. They represent bottlenecks.",
    hint: "Slack = 0, fully utilized.",
    level: "intermediate",
    codeExample: "Labor: 3(40)+2(40)=200 < 240 (not binding), Machine: 4(40)+40=200 = 200 (binding)"
  },
  {
    question: "What is slack in LP?",
    shortAnswer: "The amount of a resource that remains unused at the optimal solution.",
    explanation: "Slack = RHS - LHS. Positive slack means unused capacity. Zero slack means fully utilized.",
    hint: "Unused resource capacity.",
    level: "intermediate",
    codeExample: "Labor: 240 - 200 = 40 hours slack"
  },
  {
    question: "What is the Fundamental Theorem of LP?",
    shortAnswer: "If an optimal solution exists, there is an optimal solution at a corner point of the feasible region.",
    explanation: "This theorem justifies checking only corner points, not all points in the feasible region.",
    hint: "Optimal at corner point.",
    level: "advanced",
    codeExample: "Check only corner points for optimal solution"
  },
  {
    question: "Why is the graphical method limited to two variables?",
    shortAnswer: "Graphs can only visualize two dimensions (x and y axes).",
    explanation: "With three or more variables, we need higher-dimensional visualization or algebraic methods like the simplex method.",
    hint: "Only 2D graphs possible.",
    level: "intermediate",
    codeExample: "2 variables → graphical, 3+ variables → simplex"
  },
  {
    question: "What is the first step in solving an LP problem graphically?",
    shortAnswer: "Understand the problem and identify what needs to be optimized.",
    explanation: "Before any math, read carefully to understand the context, variables, objective, and constraints.",
    hint: "Read and understand first.",
    level: "basic",
    codeExample: "Identify: variables, objective, constraints"
  }
];

export default questions;