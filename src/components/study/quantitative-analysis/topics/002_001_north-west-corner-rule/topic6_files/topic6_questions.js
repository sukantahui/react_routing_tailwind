const questions = [
  {
    question: "Why is practicing numerical exercises important for learning transportation problems?",
    shortAnswer: "Numerical exercises help build practical skills and intuition for solving transportation problems.",
    explanation: "Practice is essential because: 1) It reinforces theoretical concepts, 2) Builds speed and accuracy, 3) Develops intuition for which method to use, 4) Helps identify common errors, 5) Builds confidence, and 6) Prepares for real-world applications. Each solved problem adds to your experience.",
    hint: "Practice builds skills and confidence.",
    level: "basic",
    codeExample: "Solve 3-4 problems each day to build proficiency."
  },
  {
    question: "What steps should you follow when solving a numerical exercise?",
    shortAnswer: "Follow a systematic process: setup, method application, verification, and cost calculation.",
    explanation: "Steps: 1) Copy the problem data correctly, 2) Check balance condition, 3) Choose and apply a method, 4) Track remaining supplies and demands, 5) Cross out completed rows/columns, 6) Count allocations, 7) Verify row and column sums, 8) Calculate total cost, and 9) Handle degeneracy if present.",
    hint: "Systematic approach prevents errors.",
    level: "intermediate",
    codeExample: "Setup → Allocate → Verify → Calculate cost."
  },
  {
    question: "What should you check after completing allocations in a numerical exercise?",
    shortAnswer: "Check row sums, column sums, allocation count, and total cost.",
    explanation: "Verification checklist: 1) Sum allocations in each row and verify against supply, 2) Sum allocations in each column and verify against demand, 3) Count positive allocations (should be m+n-1), 4) Calculate total cost, 5) Check for degeneracy, and 6) Verify all constraints are satisfied.",
    hint: "Always verify your work.",
    level: "intermediate",
    codeExample: "Row sum = Sᵢ, Column sum = Dⱼ, Allocations = m+n-1."
  },
  {
    question: "How do you handle degeneracy in a numerical exercise?",
    shortAnswer: "Add epsilon to a zero cell to create a basic variable and resolve degeneracy.",
    explanation: "Handling degeneracy: 1) Count allocations (should be m+n-1), 2) If less, degeneracy exists, 3) Choose a zero cell, 4) Add epsilon to that cell, 5) The cell becomes a basic variable, 6) Verify count is now m+n-1, and 7) Continue with the solution.",
    hint: "Add epsilon to fix degeneracy.",
    level: "expert",
    codeExample: "xᵢⱼ = ε where xᵢⱼ = 0."
  },
  {
    question: "What is the difference between NW Corner, Least Cost, and VAM in numerical exercises?",
    shortAnswer: "They differ in how they select cells for allocation, affecting solution quality and speed.",
    explanation: "Differences: 1) NW Corner: Systematic top-left to bottom-right, fastest, poorest quality, 2) Least Cost: Chooses cheapest cell, better quality, moderate speed, 3) VAM: Uses penalties, best quality, slowest. Each is appropriate for different situations.",
    hint: "Choose method based on quality vs speed tradeoff.",
    level: "intermediate",
    codeExample: "NW Corner: fast but poor, VAM: slow but excellent."
  },
  {
    question: "Why does NW Corner often produce degenerate solutions in numerical exercises?",
    shortAnswer: "NW Corner ignores costs, making simultaneous exhaustion of supply and demand more likely.",
    explanation: "NW Corner: 1) Allocates without considering costs, 2) Systematic movement often hits equal values, 3) Simultaneous exhaustion is common, 4) This creates fewer than m+n-1 allocations, and 5) Degeneracy is expected, not unusual. Always check for degeneracy with NW Corner.",
    hint: "NW Corner frequently causes degeneracy.",
    level: "intermediate",
    codeExample: "NW Corner degeneracy is common and expected."
  },
  {
    question: "What is the typical total cost comparison between methods in numerical exercises?",
    shortAnswer: "VAM usually gives the lowest total cost, followed by Least Cost, then NW Corner.",
    explanation: "Cost comparison: 1) NW Corner: Highest total cost (usually far from optimal), 2) Least Cost: Moderate total cost (closer to optimal), 3) VAM: Lowest total cost (nearest to optimal). The quality of the initial solution affects how many iterations are needed for optimization.",
    hint: "VAM cost < Least Cost cost < NW Corner cost.",
    level: "intermediate",
    codeExample: "NW Corner: ₹1000, Least Cost: ₹850, VAM: ₹800."
  },
  {
    question: "What should you do if the number of allocations is greater than m+n-1?",
    shortAnswer: "This indicates an error in the allocation process that needs to be identified and corrected.",
    explanation: "If allocations > m+n-1: 1) It shouldn't happen with correct procedure, 2) Indicates an error in the allocation, 3) Review each step carefully, 4) Check for double-counting, 5) Verify row and column sums, 6) Correct the error and re-allocate.",
    hint: "Too many allocations = error in the process.",
    level: "expert",
    codeExample: "If allocations > m+n-1, check your work."
  },
  {
    question: "How can you speed up solving numerical exercises?",
    shortAnswer: "Practice regularly, use systematic approaches, and learn to identify patterns.",
    explanation: "Speed improvement: 1) Regular practice builds speed, 2) Learn shortcuts for common patterns, 3) Use systematic approaches consistently, 4) Develop intuition for allocation patterns, 5) Use technology (spreadsheets) for large problems, and 6) Learn to quickly identify degeneracy.",
    hint: "Practice and pattern recognition speed up solving.",
    level: "expert",
    codeExample: "Speed comes from experience and practice."
  },
  {
    question: "What is the role of the transportation table in numerical exercises?",
    shortAnswer: "The transportation table organizes all data and tracks allocations during the solution process.",
    explanation: "The table: 1) Shows sources, destinations, and costs, 2) Contains supply and demand values, 3) Records allocations, 4) Tracks remaining supplies and demands, 5) Shows completed rows/columns, 6) Helps verify the solution, and 7) Provides the basis for cost calculation.",
    hint: "The table is your working document.",
    level: "intermediate",
    codeExample: "Table with rows, columns, costs, supplies, demands, and allocations."
  },
  {
    question: "What are the common errors in numerical exercises?",
    shortAnswer: "Common errors include calculation mistakes, missing updates, and ignoring degeneracy.",
    explanation: "Common errors: 1) Incorrect min calculation, 2) Not updating supplies/demands, 3) Not crossing out completed rows/columns, 4) Ignoring degeneracy, 5) Arithmetic errors in cost calculation, 6) Rushing through the process, and 7) Not verifying the solution.",
    hint: "Check your work carefully to avoid errors.",
    level: "intermediate",
    codeExample: "Watch for update and calculation errors."
  },
  {
    question: "How do you choose which method to use in a numerical exercise?",
    shortAnswer: "Choose based on problem size, required accuracy, and time constraints.",
    explanation: "Choice factors: 1) NW Corner: Quick estimates, small problems, 2) Least Cost: Moderate accuracy, medium problems, 3) VAM: High accuracy, large problems, 4) Time available, 5) Required solution quality, and 6) Personal preference and comfort.",
    hint: "Match method to problem requirements.",
    level: "expert",
    codeExample: "Small problem: NW Corner or Least Cost, Large problem: VAM."
  },
  {
    question: "What is the value of comparing different methods for the same problem?",
    shortAnswer: "Comparing methods helps develop intuition about which method works best for different situations.",
    explanation: "Comparison benefits: 1) Shows quality differences, 2) Builds intuition, 3) Identifies best method for problem type, 4) Demonstrates trade-offs, 5) Reinforces learning, 6) Helps in method selection, and 7) Builds confidence.",
    hint: "Comparison builds intuition.",
    level: "expert",
    codeExample: "Try all three methods on the same problem."
  },
  {
    question: "How does the size of a problem affect the numerical exercise?",
    shortAnswer: "Larger problems require more careful tracking and may need different methods or technology.",
    explanation: "Size effects: 1) More variables and constraints, 2) More allocations needed, 3) More chance of degeneracy, 4) More time required, 5) VAM becomes more valuable, 6) Technology may be needed, and 7) Error checking becomes more important.",
    hint: "Larger problems need more care.",
    level: "expert",
    codeExample: "5×6 problem requires careful tracking."
  },
  {
    question: "What is the relationship between numerical exercises and real-world problems?",
    shortAnswer: "Numerical exercises build the skills needed to solve real-world logistics problems.",
    explanation: "Relationship: 1) Exercises teach fundamental concepts, 2) Real-world problems apply these concepts, 3) Exercises build problem-solving skills, 4) Real-world problems are larger and more complex, 5) Exercise patterns appear in real problems, and 6) Skills transfer directly to practice.",
    hint: "Exercises prepare you for real problems.",
    level: "expert",
    codeExample: "Real-world: 50 sources, 200 destinations."
  },
  {
    question: "How do you handle unbalanced problems in numerical exercises?",
    shortAnswer: "Add dummy sources or destinations to balance the problem before applying any method.",
    explanation: "Handling unbalanced: 1) Check balance condition, 2) If supply > demand, add dummy destination, 3) If demand > supply, add dummy source, 4) Set dummy costs to zero, 5) Apply chosen method to balanced problem, and 6) Dummy allocations represent surplus or deficit.",
    hint: "Balance with dummies before solving.",
    level: "intermediate",
    codeExample: "Supply 500, Demand 400 → Add dummy destination demand 100."
  },
  {
    question: "What is the significance of the m+n-1 rule in numerical exercises?",
    shortAnswer: "It determines the number of allocations needed for a basic feasible solution.",
    explanation: "Significance: 1) m = sources, n = destinations, 2) m+n-1 = required allocations, 3) Indicates a non-degenerate solution, 4) Fewer allocations = degeneracy, 5) More allocations = error, 6) Used for verification, and 7) Essential for the simplex method.",
    hint: "m+n-1 = correct number of allocations.",
    level: "intermediate",
    codeExample: "3 sources, 4 destinations → 6 allocations needed."
  },
  {
    question: "How do you verify that a numerical exercise solution is optimal?",
    shortAnswer: "Optimality is checked using the MODI method after obtaining a non-degenerate solution.",
    explanation: "Optimality check: 1) Must have m+n-1 allocations (non-degenerate), 2) Calculate uᵢ and vⱼ (dual variables), 3) Calculate reduced costs for all non-basic cells, 4) If all reduced costs ≥ 0, solution is optimal, 5) If any reduced cost < 0, improvement is possible.",
    hint: "Use MODI method to check optimality.",
    level: "expert",
    codeExample: "Reduced cost = cᵢⱼ - uᵢ - vⱼ."
  },
  {
    question: "What are the benefits of solving numerical exercises with different methods?",
    shortAnswer: "It builds understanding of method strengths, weaknesses, and appropriate usage.",
    explanation: "Benefits: 1) Understands method characteristics, 2) Learns trade-offs, 3) Develops intuition, 4) Improves problem-solving skills, 5) Identifies best approach, 6) Builds confidence, and 7) Prepares for real-world problem solving.",
    hint: "Different methods teach different skills.",
    level: "expert",
    codeExample: "Compare results from all three methods."
  },
  {
    question: "How do you calculate total cost in a numerical exercise?",
    shortAnswer: "Multiply each allocation by its unit cost and sum all products.",
    explanation: "Cost calculation: 1) For each allocated cell, multiply xᵢⱼ by cᵢⱼ, 2) Sum all these products, 3) This gives total transportation cost, 4) Dummy allocations have zero cost, 5) The cost serves as a baseline, and 6) Check arithmetic carefully.",
    hint: "Sum of (allocation × cost) for all allocated cells.",
    level: "intermediate",
    codeExample: "Z = Σ (xᵢⱼ × cᵢⱼ)."
  },
  {
    question: "What is the role of epsilon in numerical exercises?",
    shortAnswer: "Epsilon is used to resolve degeneracy by creating an artificial basic variable.",
    explanation: "Epsilon role: 1) Added to a zero cell in degenerate solutions, 2) Creates an artificial basic variable, 3) Restores m+n-1 allocations, 4) Has negligible cost, 5) Allows the simplex method to work, 6) Is a mathematical tool, not a real shipment.",
    hint: "Epsilon fixes degeneracy.",
    level: "expert",
    codeExample: "Add ε to a zero cell to make it basic."
  },
  {
    question: "What should you do if you get stuck on a numerical exercise?",
    shortAnswer: "Review the steps, check your work, and try a different approach if needed.",
    explanation: "If stuck: 1) Review the problem data, 2) Check balance condition, 3) Verify previous steps, 4) Cross out completed rows/columns, 5) Try a different method, 6) Take a break and come back, 7) Ask for help or review examples, and 8) Practice similar problems.",
    hint: "Don't give up—review and try again.",
    level: "intermediate",
    codeExample: "Try a different method or check your calculations."
  }
];

export default questions;