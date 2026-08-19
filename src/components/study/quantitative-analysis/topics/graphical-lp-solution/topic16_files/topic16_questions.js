const questions = [
  {
    question: "What is the intersection of two constraint lines?",
    shortAnswer: "The point where two constraint lines cross.",
    explanation: "The intersection is the point (x, y) that satisfies both equations simultaneously. It's a corner point of the feasible region.",
    hint: "Where two lines meet.",
    level: "basic",
    codeExample: "x+y=10 and 2x+y=14 intersect at (4,6)."
  },
  {
    question: "How do you find the intersection of two lines algebraically?",
    shortAnswer: "Solve the system of two linear equations.",
    explanation: "Use substitution or elimination to find the values of x and y that satisfy both equations.",
    hint: "Solve the system.",
    level: "basic",
    codeExample: "Solve x+y=10 and 2x+y=14 → (4,6)."
  },
  {
    question: "What are the three possible outcomes when finding line intersections?",
    shortAnswer: "Unique solution, no solution (parallel), or infinite solutions (coincident).",
    explanation: "Unique: lines cross once. Parallel: lines never cross. Coincident: lines are identical.",
    hint: "Three cases.",
    level: "intermediate",
    codeExample: "Unique: (4,6); Parallel: no solution; Coincident: infinite solutions."
  },
  {
    question: "What does it mean if two lines are parallel?",
    shortAnswer: "They never intersect — no solution exists.",
    explanation: "Parallel lines have the same slope but different intercepts. They represent contradictory constraints.",
    hint: "No intersection.",
    level: "intermediate",
    codeExample: "x+y=10 and x+y=5 are parallel."
  },
  {
    question: "What does it mean if two lines are coincident?",
    shortAnswer: "They are the same line — infinite intersection points.",
    explanation: "Coincident lines are identical. One equation is a multiple of the other.",
    hint: "Same line.",
    level: "intermediate",
    codeExample: "x+y=10 and 2x+2y=20 are coincident."
  },
  {
    question: "How do you check if two lines are parallel?",
    shortAnswer: "Compare their slopes — if equal, they're parallel.",
    explanation: "Write both equations in slope-intercept form (y = mx + b). If m is the same but b is different, they're parallel.",
    hint: "Same slope, different intercept.",
    level: "intermediate",
    codeExample: "y=2x+3 and y=2x-1 are parallel."
  },
  {
    question: "How do you check if two lines are coincident?",
    shortAnswer: "One equation is a multiple of the other.",
    explanation: "If multiplying one equation by a constant gives the other equation, they're coincident.",
    hint: "Multiples of each other.",
    level: "intermediate",
    codeExample: "x+y=10 and 2x+2y=20 are coincident."
  },
  {
    question: "What is the substitution method for finding intersections?",
    shortAnswer: "Solve one equation for a variable and substitute into the other.",
    explanation: "Isolate one variable in one equation, then plug it into the other equation.",
    hint: "Solve and substitute.",
    level: "basic",
    codeExample: "x+y=10 → y=10-x; 2x+(10-x)=14 → x=4."
  },
  {
    question: "What is the elimination method for finding intersections?",
    shortAnswer: "Add or subtract equations to eliminate a variable.",
    explanation: "Align equations and combine them to cancel out one variable.",
    hint: "Add or subtract.",
    level: "basic",
    codeExample: "x+y=10 and 2x+y=14 → subtract → x=4."
  },
  {
    question: "When should you use substitution vs elimination?",
    shortAnswer: "Substitution when one equation is easy to solve; elimination when coefficients align.",
    explanation: "Choose the method that makes the problem simplest.",
    hint: "Choose easiest method.",
    level: "intermediate",
    codeExample: "Use substitution for x=...; use elimination when coefficients cancel."
  },
  {
    question: "How do you find the intersection with a vertical line?",
    shortAnswer: "Substitute x = k into the other equation.",
    explanation: "A vertical line has equation x = k. Substitute this value into the other equation to find y.",
    hint: "Substitute x=k.",
    level: "intermediate",
    codeExample: "x=3 and 2x+3y=12 → 2(3)+3y=12 → y=2 → (3,2)."
  },
  {
    question: "How do you find the intersection with a horizontal line?",
    shortAnswer: "Substitute y = k into the other equation.",
    explanation: "A horizontal line has equation y = k. Substitute this value into the other equation to find x.",
    hint: "Substitute y=k.",
    level: "intermediate",
    codeExample: "y=3 and 3x+4y=24 → 3x+4(3)=24 → x=4 → (4,3)."
  },
  {
    question: "What if the intersection point is not an integer?",
    shortAnswer: "That's fine — fractions and decimals are valid coordinates.",
    explanation: "Corner points can have fractional coordinates. They represent exact solutions.",
    hint: "Fractions are valid.",
    level: "basic",
    codeExample: "(2.5, 3.5) is a valid intersection point."
  },
  {
    question: "How do you verify an intersection point?",
    shortAnswer: "Substitute the point into both equations.",
    explanation: "If the point satisfies both equations, it's the correct intersection.",
    hint: "Check both equations.",
    level: "basic",
    codeExample: "For (4,6), check x+y=10 → 10=10 and 2x+y=14 → 14=14."
  },
  {
    question: "What is the role of intersection points in LP?",
    shortAnswer: "They become corner points of the feasible region.",
    explanation: "Every corner point is the intersection of two constraint lines. These are candidates for optimal solutions.",
    hint: "Corner points.",
    level: "intermediate",
    codeExample: "Intersection of constraints gives a corner point."
  },
  {
    question: "Can three lines intersect at the same point?",
    shortAnswer: "Yes, multiple constraints can meet at one point.",
    explanation: "For example, x=0, y=0, and x+y=10 all intersect at (0,0).",
    hint: "Multiple lines can meet.",
    level: "expert",
    codeExample: "x=0, y=0, and x+y=10 → (0,0)."
  },
  {
    question: "What if the system has no solution?",
    shortAnswer: "The lines are parallel and don't intersect.",
    explanation: "No solution means the constraints are contradictory and can't both be satisfied.",
    hint: "Parallel lines.",
    level: "intermediate",
    codeExample: "x+y=10 and x+y=5 → no solution."
  },
  {
    question: "What if the system has infinite solutions?",
    shortAnswer: "The lines are coincident (the same line).",
    explanation: "Infinite solutions mean the constraints are redundant.",
    hint: "Coincident lines.",
    level: "intermediate",
    codeExample: "x+y=10 and 2x+2y=20 → infinite solutions."
  },
  {
    question: "How do you find intersections of constraints with non-negativity?",
    shortAnswer: "Set x=0 or y=0 and solve for the other variable.",
    explanation: "Non-negativity constraints (x≥0, y≥0) create intersections on the axes.",
    hint: "Set x=0 or y=0.",
    level: "intermediate",
    codeExample: "x=0 and 2x+3y=12 → (0,4)."
  },
  {
    question: "What is the difference between a corner point and an intersection?",
    shortAnswer: "An intersection is where two lines cross; a corner point is a feasible intersection.",
    explanation: "All corner points are intersections, but not all intersections are corner points (some may be infeasible).",
    hint: "Corner point = feasible intersection.",
    level: "intermediate",
    codeExample: "An intersection must satisfy all constraints to be a corner point."
  },
  {
    question: "How do you handle fractions in the solution?",
    shortAnswer: "Leave as fractions for exactness, or convert to decimals.",
    explanation: "Fractions give exact values; decimals are approximations.",
    hint: "Fractions for exactness.",
    level: "basic",
    codeExample: "x = 10/3 instead of 3.333..."
  },
  {
    question: "What is the first step in finding an intersection?",
    shortAnswer: "Write both equations in standard form.",
    explanation: "Clear fractions and write in the form ax + by = c.",
    hint: "Standard form first.",
    level: "basic",
    codeExample: "y = 2x + 3 → -2x + y = 3."
  },
  {
    question: "How do you find intersections using a graph?",
    shortAnswer: "Plot both lines and read the point where they cross.",
    explanation: "Graphical methods give approximate values. Use them for visualization and verification.",
    hint: "Read from the graph.",
    level: "basic",
    codeExample: "Look where lines cross on the graph."
  },
  {
    question: "Why are intersections important in LP?",
    shortAnswer: "They identify the corner points where optimal solutions occur.",
    explanation: "The corner-point principle states that optimal solutions occur at corner points, which are intersections of constraints.",
    hint: "Optimal solutions at corners.",
    level: "intermediate",
    codeExample: "Intersections become corner points to evaluate."
  },
  {
    question: "Can you find an intersection without solving equations?",
    shortAnswer: "Yes, using a graph to read the intersection point.",
    explanation: "Graphical methods provide approximate values quickly.",
    hint: "Use a graph.",
    level: "basic",
    codeExample: "Read from the plotted lines."
  },
  {
    question: "What if the intersection point is outside the feasible region?",
    shortAnswer: "Then it's not a corner point — it's infeasible.",
    explanation: "An intersection must satisfy all constraints to be a corner point.",
    hint: "Must satisfy all constraints.",
    level: "intermediate",
    codeExample: "An intersection may violate a constraint."
  },
  {
    question: "How do you know if two lines are perpendicular?",
    shortAnswer: "Their slopes multiply to -1 (m1 × m2 = -1).",
    explanation: "Perpendicular lines intersect at a right angle. This is a special type of intersection.",
    hint: "Slopes multiply to -1.",
    level: "expert",
    codeExample: "y=2x and y=-1/2x are perpendicular."
  },
  {
    question: "What is the most common mistake in finding intersections?",
    shortAnswer: "Arithmetic errors in solving the system.",
    explanation: "Careless mistakes in addition, subtraction, or substitution lead to wrong intersections.",
    hint: "Check your arithmetic.",
    level: "basic",
    codeExample: "Always double-check your work."
  },
  {
    question: "How do you find the intersection of two lines with fractions?",
    shortAnswer: "Clear fractions first by multiplying by the LCD.",
    explanation: "This makes the equations easier to work with.",
    hint: "Clear fractions first.",
    level: "intermediate",
    codeExample: "(1/2)x + (1/3)y = 1 → multiply by 6 → 3x + 2y = 6."
  },
  {
    question: "What is the relationship between intersections and binding constraints?",
    shortAnswer: "At an intersection, both constraints are binding (active).",
    explanation: "Binding constraints have zero slack. The intersection point satisfies both as equalities.",
    hint: "Both constraints active.",
    level: "expert",
    codeExample: "At (4,6), both x+y=10 and 2x+y=14 are binding."
  }
];

export default questions;