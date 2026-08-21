const questions = [
  {
    question: "What is the Simplex Method?",
    shortAnswer: "An algebraic algorithm for solving linear programming problems with any number of variables.",
    explanation: "The Simplex Method is a systematic procedure that finds the optimal solution by moving from one corner point to another, improving the objective value at each step.",
    hint: "Think of it as an algebraic search algorithm.",
    level: "basic",
    codeExample: "Simplex Method: algebraic, iterative, handles many variables"
  },
  {
    question: "Why is the graphical method limited to two variables?",
    shortAnswer: "Graphs can only visualize two dimensions (x and y axes).",
    explanation: "The graphical method relies on plotting constraints in 2D space. With three or more variables, we need higher-dimensional visualization which is not practical.",
    hint: "Graphs are 2D.",
    level: "basic",
    codeExample: "2 variables → 2D graph, 3+ variables → need algebra"
  },
  {
    question: "What is the main advantage of the Simplex Method over graphical method?",
    shortAnswer: "It can handle any number of variables and constraints.",
    explanation: "The Simplex Method is algebraic and systematic, making it suitable for large-scale problems with many variables and constraints.",
    hint: "Scalability and efficiency.",
    level: "intermediate",
    codeExample: "Handles 100+ variables, graphical handles only 2"
  },
  {
    question: "Who developed the Simplex Method?",
    shortAnswer: "George Dantzig in 1947.",
    explanation: "George Dantzig developed the Simplex Method while working for the U.S. Air Force. It revolutionized optimization and is still widely used today.",
    hint: "Developed in 1947.",
    level: "basic",
    codeExample: "George Dantzig, 1947"
  },
  {
    question: "What types of problems require the Simplex Method?",
    shortAnswer: "LP problems with more than 2 variables or many constraints.",
    explanation: "Any LP problem that cannot be solved graphically (due to dimension or scale) requires the Simplex Method.",
    hint: "Problems with 3+ variables.",
    level: "intermediate",
    codeExample: "3 variables, 5 variables, 100 variables"
  },
  {
    question: "How does the Simplex Method find the optimal solution?",
    shortAnswer: "It moves from one corner point to another, improving the objective value each time.",
    explanation: "The Simplex Method starts at a feasible corner point, then systematically moves to adjacent corner points with better objective values until no improvement is possible.",
    hint: "Corner point to corner point, improving each time.",
    level: "advanced",
    codeExample: "Start at (0,0) → move to better corner → continue until optimal"
  },
  {
    question: "What is the fundamental theorem of LP that supports the Simplex Method?",
    shortAnswer: "The optimal solution of an LP problem is at a corner point of the feasible region.",
    explanation: "This theorem justifies the Simplex Method's approach of searching corner points. It only needs to check corner points, not all feasible points.",
    hint: "Optimal at corner points.",
    level: "advanced",
    codeExample: "Check corner points → find optimal"
  },
  {
    question: "Why can't we use graphical method for real-world problems?",
    shortAnswer: "Real-world problems often have many variables and constraints.",
    explanation: "Business, industry, and government problems typically involve dozens or hundreds of variables, making graphical methods impractical.",
    hint: "Too many variables to graph.",
    level: "intermediate",
    codeExample: "50 products, 30 resources → cannot graph"
  },
  {
    question: "What is the difference between algebraic and geometric methods?",
    shortAnswer: "Algebraic uses equations and arithmetic; geometric uses graphs and visualization.",
    explanation: "The graphical method is geometric (visual). The Simplex Method is algebraic (numerical), making it more suitable for computation.",
    hint: "Equations vs. graphs.",
    level: "intermediate",
    codeExample: "Algebraic: row operations, Geometric: plotting lines"
  },
  {
    question: "Can the Simplex Method be automated?",
    shortAnswer: "Yes, it can be implemented in computer programs and software.",
    explanation: "The Simplex Method is algorithmic and systematic, making it ideal for computer implementation. Many software packages use it.",
    hint: "Yes, it's algorithmic.",
    level: "basic",
    codeExample: "Excel Solver, MATLAB, Python libraries"
  },
  {
    question: "What is the feasibility region in the Simplex Method?",
    shortAnswer: "The set of all points satisfying all constraints.",
    explanation: "The Simplex Method works within the feasible region, moving from one corner point to another until optimality is reached.",
    hint: "All feasible solutions.",
    level: "intermediate",
    codeExample: "Feasible region = intersection of all constraints"
  },
  {
    question: "What is a corner point in the Simplex Method?",
    shortAnswer: "A basic feasible solution where some variables are zero.",
    explanation: "In the Simplex Method, corner points are represented as basic feasible solutions with a specific set of variables (basic variables) and the rest at zero.",
    hint: "Basic feasible solution.",
    level: "advanced",
    codeExample: "Basic variables: positive, Non-basic variables: zero"
  },
  {
    question: "How does the Simplex Method know when to stop?",
    shortAnswer: "When no improvement in objective value is possible (optimality condition).",
    explanation: "The Simplex Method checks if any entering variable can improve the objective. If none can, the current solution is optimal.",
    hint: "No better solution exists.",
    level: "advanced",
    codeExample: "All reduced costs ≤ 0 (maximization)"
  },
  {
    question: "What is the role of slack variables in the Simplex Method?",
    shortAnswer: "They convert inequality constraints to equalities.",
    explanation: "Slack variables are added to ≤ constraints to make them equalities, allowing the Simplex Method to work with a system of equations.",
    hint: "Convert ≤ to =.",
    level: "intermediate",
    codeExample: "2x + y ≤ 10 → 2x + y + s = 10"
  },
  {
    question: "What is the Big-M Method?",
    shortAnswer: "A variant of the Simplex Method for problems with ≥ or = constraints.",
    explanation: "The Big-M Method uses artificial variables and a large penalty (M) to handle constraints that are not in standard form.",
    hint: "For ≥ and = constraints.",
    level: "advanced",
    codeExample: "Minimize M × artificial variables"
  },
  {
    question: "What industries use the Simplex Method?",
    shortAnswer: "Manufacturing, logistics, finance, energy, and many more.",
    explanation: "Any industry that needs to optimize resource allocation, production, or logistics can use the Simplex Method.",
    hint: "Many industries use optimization.",
    level: "basic",
    codeExample: "Factories, airlines, banks, hospitals"
  },
  {
    question: "How does the Simplex Method handle large problems?",
    shortAnswer: "Systematically and efficiently using matrix operations.",
    explanation: "The Simplex Method uses tables (tableaus) and row operations to solve problems efficiently, even with hundreds of variables.",
    hint: "Uses tables and row operations.",
    level: "advanced",
    codeExample: "Tableau: rows = constraints, columns = variables"
  }
];

export default questions;