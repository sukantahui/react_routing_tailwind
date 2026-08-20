const questions = [
  {
    question: "What is the first step in solving an LP problem graphically?",
    shortAnswer: "Understand the problem - identify decision variables, objective, and constraints.",
    explanation: "Before any mathematical formulation, you must fully understand what the problem is asking. Identify what you're trying to optimize and what limitations exist.",
    hint: "Read and understand before solving.",
    level: "basic",
    codeExample: "Identify: variables (x, y), objective (maximize/minimize), constraints (limitations)"
  },
  {
    question: "Why is it important to define decision variables clearly?",
    shortAnswer: "Clear variable definitions prevent confusion and ensure the mathematical model accurately represents the problem.",
    explanation: "Decision variables represent the quantities you're deciding. Clear definitions help you formulate the objective and constraints correctly.",
    hint: "Clear variables = clear model.",
    level: "basic",
    codeExample: "Let x = number of chairs, y = number of tables"
  },
  {
    question: "How do you formulate the objective function?",
    shortAnswer: "Write Z = c₁x + c₂y where c₁ and c₂ are the contributions per unit of each variable.",
    explanation: "The objective function combines the per-unit contributions of each decision variable. For maximization, we maximize Z; for minimization, we minimize Z.",
    hint: "Combine per-unit contributions.",
    level: "intermediate",
    codeExample: "Maximize Z = 500x + 700y"
  },
  {
    question: "How do you graph a constraint inequality?",
    shortAnswer: "Convert to equality, find intercepts, draw the line, then shade the feasible side.",
    explanation: "For each constraint: (1) replace inequality with equality, (2) find x and y intercepts, (3) draw the line, (4) test a point to determine which side to shade.",
    hint: "Intercepts → line → shade side.",
    level: "intermediate",
    codeExample: "3x + 2y ≤ 240 → line through (80,0) and (0,120), shade below"
  },
  {
    question: "What is the feasible region?",
    shortAnswer: "The feasible region is the area on the graph where all constraints are satisfied simultaneously.",
    explanation: "The feasible region represents all possible solutions that satisfy every constraint. The optimal solution will always be at a corner point of this region.",
    hint: "All constraints satisfied = feasible region.",
    level: "basic",
    codeExample: "Intersection of all shaded regions = feasible region"
  },
  {
    question: "Where does the optimal solution occur in graphical LP?",
    shortAnswer: "The optimal solution always occurs at a corner point (vertex) of the feasible region.",
    explanation: "The Fundamental Theorem of Linear Programming states that if an optimal solution exists, it occurs at a corner point of the feasible region.",
    hint: "Corner point = optimal.",
    level: "intermediate",
    codeExample: "Evaluate objective at each corner point → choose best"
  },
  {
    question: "How do you find corner points of the feasible region?",
    shortAnswer: "Find intersections of constraint lines and identify where they form vertices of the feasible region.",
    explanation: "Corner points are formed by the intersection of two constraint lines. Solve pairs of equations to find the coordinates of each corner point.",
    hint: "Intersections of constraint lines.",
    level: "intermediate",
    codeExample: "Solve 3x + 2y = 240 and 4x + y = 200 → (40, 60)"
  },
  {
    question: "How do you evaluate the objective function at corner points?",
    shortAnswer: "Substitute the coordinates of each corner point into the objective function and calculate Z.",
    explanation: "For each corner point (x, y), calculate Z = c₁x + c₂y. The point with the highest Z (for maximization) or lowest Z (for minimization) is optimal.",
    hint: "Calculate Z for each corner.",
    level: "intermediate",
    codeExample: "Z(40, 60) = 500(40) + 700(60) = 62,000"
  },
  {
    question: "What should you do after finding the optimal solution?",
    shortAnswer: "Interpret the results in the context of the original problem and verify constraints.",
    explanation: "Translate the mathematical solution back to business terms. Check that the solution satisfies all constraints and makes practical sense.",
    hint: "Interpret and verify.",
    level: "intermediate",
    codeExample: "Produce 40 chairs and 60 tables. Check: 3(40)+2(60)=240 ≤ 240"
  },
  {
    question: "What is the most common mistake in graphical LP?",
    shortAnswer: "Rushing to graph before properly formulating the problem and identifying all constraints.",
    explanation: "Students often start graphing immediately without fully understanding the problem, leading to incorrect variable definitions or missing constraints.",
    hint: "Understand first, graph second.",
    level: "intermediate",
    codeExample: "Missing non-negativity constraints or misidentifying objective"
  },
  {
    question: "How do you determine which side of a constraint line is feasible?",
    shortAnswer: "Test a point (usually the origin) in the inequality. If it satisfies the inequality, shade that side; otherwise, shade the other side.",
    explanation: "Choose a test point not on the line. If the test point satisfies the inequality, the feasible side is where the test point lies. Otherwise, it's the opposite side.",
    hint: "Test a point, shade accordingly.",
    level: "intermediate",
    codeExample: "Test (0,0): 3(0)+2(0)=0 ≤ 240 → shade origin side"
  },
  {
    question: "What are non-negativity constraints?",
    shortAnswer: "Non-negativity constraints ensure that decision variables cannot be negative (x ≥ 0, y ≥ 0).",
    explanation: "In real-world problems, quantities cannot be negative. These constraints restrict the feasible region to the first quadrant.",
    hint: "Variables must be ≥ 0.",
    level: "basic",
    codeExample: "x ≥ 0, y ≥ 0"
  },
  {
    question: "Why is it important to check all corner points?",
    shortAnswer: "Checking all corner points ensures you find the true optimal solution, not a local optimum.",
    explanation: "The optimal solution is at one of the corner points. Missing a corner point could lead to a suboptimal solution.",
    hint: "Don't miss any corner points.",
    level: "intermediate",
    codeExample: "Check (0,0), (50,0), (40,60), (0,120)"
  },
  {
    question: "What is the difference between maximization and minimization in graphical LP?",
    shortAnswer: "Maximization finds the highest Z value at corner points; minimization finds the lowest Z value.",
    explanation: "For maximization, choose the corner point with the largest objective value. For minimization, choose the corner point with the smallest objective value.",
    hint: "Max = highest, Min = lowest.",
    level: "basic",
    codeExample: "Max: choose largest Z, Min: choose smallest Z"
  },
  {
    question: "How do you handle '≥' constraints in graphical LP?",
    shortAnswer: "For '≥' constraints, shade the region above the line (away from the origin for positive intercepts).",
    explanation: "Graph the line as an equality, then test a point. The feasible region is on the side where the inequality holds (usually away from the origin).",
    hint: "Shade above for ≥.",
    level: "intermediate",
    codeExample: "x + y ≥ 8 → shade above the line through (8,0) and (0,8)"
  },
  {
    question: "What is the role of the objective function line in graphical LP?",
    shortAnswer: "The objective function line shows the direction of optimization and helps identify the optimal corner point.",
    explanation: "By moving the objective line parallel to itself, you can see which corner point it touches last (for maximization) or first (for minimization).",
    hint: "Moving objective line shows optimal point.",
    level: "advanced",
    codeExample: "Z = 500x + 700y: move line outward until it touches the feasible region"
  },
  {
    question: "How do you verify the optimal solution is correct?",
    shortAnswer: "Check that the solution satisfies all constraints and that no other corner point gives a better objective value.",
    explanation: "Verify: (1) All constraints are satisfied, (2) The objective value is better than all other corner points, (3) The solution makes practical sense.",
    hint: "Check constraints and compare to other corners.",
    level: "intermediate",
    codeExample: "Verify 3(40)+2(60)=240 ≤ 240, 4(40)+60=220 ≤ 200 (wait, this fails!)"
  },
  {
    question: "What should you do if a corner point is infeasible?",
    shortAnswer: "Discard infeasible corner points and focus only on those that satisfy all constraints.",
    explanation: "Some intersection points may not satisfy all constraints. These points are outside the feasible region and cannot be optimal solutions.",
    hint: "Only use points in feasible region.",
    level: "intermediate",
    codeExample: "(0,120) violates machine constraint → infeasible"
  },
  {
    question: "How does the step-by-step procedure help in solving LP problems?",
    shortAnswer: "It provides a systematic approach that prevents mistakes and ensures all aspects of the problem are considered.",
    explanation: "Following a structured procedure reduces errors, saves time, and helps you understand the problem more deeply.",
    hint: "Systematic = fewer mistakes.",
    level: "basic",
    codeExample: "Step 1: Understand, Step 2: Define, Step 3: Formulate..."
  },
  {
    question: "What is the most important step in the graphical LP procedure?",
    shortAnswer: "All steps are important, but problem understanding and constraint identification are most critical.",
    explanation: "If you don't understand the problem or miss a constraint, the entire solution will be wrong. Take time with the early steps.",
    hint: "Understanding is key.",
    level: "intermediate",
    codeExample: "Take time to list all constraints before graphing"
  }
];

export default questions;