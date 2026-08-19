const questions = [
  {
    question: "What are non-negativity restrictions in linear programming?",
    shortAnswer: "They are constraints that require decision variables to be ≥ 0.",
    explanation: "Non-negativity restrictions (x ≥ 0, y ≥ 0) ensure variables represent real, meaningful quantities that can't be negative.",
    hint: "Variables can't be negative.",
    level: "basic",
    codeExample: "x ≥ 0, y ≥ 0"
  },
  {
    question: "Why are non-negativity restrictions necessary in LP?",
    shortAnswer: "Because most real-world quantities (like production, spending, time) can't be negative.",
    explanation: "You can't produce -5 units, spend -₹100, or allocate -2 hours. Non-negativity ensures mathematical solutions are practically meaningful.",
    hint: "Real quantities can't be negative.",
    level: "basic",
    codeExample: "You can't produce negative items."
  },
  {
    question: "How do you graph x ≥ 0?",
    shortAnswer: "Draw a solid vertical line at x=0 (the y-axis) and shade to the right.",
    explanation: "x ≥ 0 includes all points on and to the right of the y-axis. The line is solid because equality is included.",
    hint: "Shade right of y-axis.",
    level: "basic",
    codeExample: "x ≥ 0 → shade right of x=0."
  },
  {
    question: "How do you graph y ≥ 0?",
    shortAnswer: "Draw a solid horizontal line at y=0 (the x-axis) and shade above.",
    explanation: "y ≥ 0 includes all points on and above the x-axis. The line is solid because equality is included.",
    hint: "Shade above x-axis.",
    level: "basic",
    codeExample: "y ≥ 0 → shade above y=0."
  },
  {
    question: "What region does x ≥ 0 and y ≥ 0 represent on the graph?",
    shortAnswer: "The first quadrant (QI).",
    explanation: "The intersection of x ≥ 0 and y ≥ 0 is the first quadrant, where both coordinates are non-negative.",
    hint: "QI: (+,+).",
    level: "basic",
    codeExample: "First quadrant."
  },
  {
    question: "Is the line for x ≥ 0 solid or dashed?",
    shortAnswer: "Solid, because equality (x=0) is included.",
    explanation: "Since x ≥ 0 includes the boundary (x=0), the line must be solid.",
    hint: "Solid due to ≥.",
    level: "basic",
    codeExample: "x ≥ 0 → solid line."
  },
  {
    question: "Is the line for y ≥ 0 solid or dashed?",
    shortAnswer: "Solid, because equality (y=0) is included.",
    explanation: "Since y ≥ 0 includes the boundary (y=0), the line must be solid.",
    hint: "Solid due to ≥.",
    level: "basic",
    codeExample: "y ≥ 0 → solid line."
  },
  {
    question: "What happens to the feasible region when non-negativity is imposed?",
    shortAnswer: "It's restricted to the first quadrant (x≥0, y≥0).",
    explanation: "Non-negativity removes all points in quadrants II, III, and IV, keeping only the first quadrant.",
    hint: "Only QI remains.",
    level: "basic",
    codeExample: "Feasible region is in QI only."
  },
  {
    question: "Is the origin always feasible with non-negativity?",
    shortAnswer: "Yes, if all other constraints also allow it.",
    explanation: "The origin (0,0) satisfies x≥0 and y≥0. It may or may not satisfy other constraints.",
    hint: "Origin is always in QI.",
    level: "intermediate",
    codeExample: "(0,0) satisfies x≥0 and y≥0."
  },
  {
    question: "What are the corner points created by non-negativity?",
    shortAnswer: "The origin (0,0) and axis intercepts of other constraints.",
    explanation: "Non-negativity creates corner points where the axes intersect other constraints: (0,y) and (x,0).",
    hint: "Axes intersections are corner points.",
    level: "intermediate",
    codeExample: "(0,0), (x,0), (0,y) are corner points."
  },
  {
    question: "Can a feasible region be in a quadrant other than QI?",
    shortAnswer: "No, if non-negativity is imposed, the feasible region is always in QI.",
    explanation: "Non-negativity (x≥0, y≥0) restricts all solutions to the first quadrant.",
    hint: "Only QI is allowed.",
    level: "basic",
    codeExample: "x≥0, y≥0 → QI only."
  },
  {
    question: "Why are non-negativity constraints often written as x≥0, y≥0?",
    shortAnswer: "Because they are the standard way to enforce non-negativity in LP problems.",
    explanation: "This notation is universally used in LP formulations and is expected in solutions.",
    hint: "Standard LP notation.",
    level: "basic",
    codeExample: "x ≥ 0, y ≥ 0"
  },
  {
    question: "What if a variable can be negative in a real problem?",
    shortAnswer: "Then non-negativity is not imposed for that variable.",
    explanation: "Some variables (like temperature change or net profit change) can be negative. In such cases, you don't add the non-negativity constraint.",
    hint: "Not all variables need non-negativity.",
    level: "intermediate",
    codeExample: "If x represents temperature change, x can be negative."
  },
  {
    question: "How do you shade the first quadrant?",
    shortAnswer: "Shade the region where x≥0 and y≥0 simultaneously.",
    explanation: "This means shading to the right of the y-axis and above the x-axis, including the axes themselves.",
    hint: "Shade QI.",
    level: "basic",
    codeExample: "Shade the top-right region."
  },
  {
    question: "What is the difference between x≥0 and x>0?",
    shortAnswer: "x≥0 includes x=0 (solid line); x>0 excludes x=0 (dashed line).",
    explanation: "The boundary changes from solid to dashed when equality is excluded.",
    hint: "≥ includes 0; > excludes 0.",
    level: "intermediate",
    codeExample: "x≥0 → solid; x>0 → dashed."
  },
  {
    question: "What is the difference between y≥0 and y>0?",
    shortAnswer: "y≥0 includes y=0 (solid line); y>0 excludes y=0 (dashed line).",
    explanation: "The boundary changes from solid to dashed when equality is excluded.",
    hint: "≥ includes 0; > excludes 0.",
    level: "intermediate",
    codeExample: "y≥0 → solid; y>0 → dashed."
  },
  {
    question: "Can the feasible region be unbounded with non-negativity?",
    shortAnswer: "Yes, if constraints don't bound it in some direction.",
    explanation: "Even with x≥0 and y≥0, the region can extend infinitely if there are no upper bounds.",
    hint: "Unbounded is possible in QI.",
    level: "intermediate",
    codeExample: "x≥0, y≥0 alone is unbounded."
  },
  {
    question: "How do you identify the feasible region with non-negativity?",
    shortAnswer: "Find the intersection of all shaded regions including x≥0 and y≥0.",
    explanation: "The feasible region is the overlap of all constraints, restricted to the first quadrant.",
    hint: "Overlap of all constraints in QI.",
    level: "intermediate",
    codeExample: "Shade all constraints and find the common area in QI."
  },
  {
    question: "What is the role of non-negativity in the corner-point principle?",
    shortAnswer: "It creates additional corner points where constraints meet the axes.",
    explanation: "Non-negativity ensures the origin and axis intercepts are considered as corner points.",
    hint: "Adds axes intersections as corner points.",
    level: "expert",
    codeExample: "(0,0), (x,0), (0,y) are corner points to check."
  },
  {
    question: "How do you test if a point is feasible with non-negativity?",
    shortAnswer: "Check if x≥0 and y≥0, plus all other constraints.",
    explanation: "A point is feasible if it satisfies x≥0, y≥0, and every other constraint.",
    hint: "Must satisfy all constraints.",
    level: "basic",
    codeExample: "For point (2,3), check 2≥0 and 3≥0."
  },
  {
    question: "Why are non-negativity constraints sometimes called 'implicit constraints'?",
    shortAnswer: "Because they are so fundamental they're often assumed but not explicitly stated.",
    explanation: "In many real-world problems, non-negativity is understood but may be omitted in verbal descriptions.",
    hint: "They're often assumed.",
    level: "intermediate",
    codeExample: "Production quantities are implicitly non-negative."
  },
  {
    question: "How do you graph x≥0 and y≥0 together?",
    shortAnswer: "Plot both lines (solid) and shade the first quadrant.",
    explanation: "The intersection of the two shaded regions gives the first quadrant.",
    hint: "Shade QI.",
    level: "basic",
    codeExample: "x≥0 and y≥0 → shade QI."
  },
  {
    question: "What if a constraint already implies x≥0?",
    shortAnswer: "Then x≥0 is redundant and can be omitted.",
    explanation: "If another constraint (like x+y≥0 with y≥0) implies x≥0, the explicit constraint is unnecessary.",
    hint: "Redundant constraints can be dropped.",
    level: "expert",
    codeExample: "If y≥0 and x+y≥0, then x≥0 is implied."
  },
  {
    question: "Can non-negativity be violated in some LP applications?",
    shortAnswer: "Yes, in some cases variables can be negative (e.g., net changes, differences).",
    explanation: "Some real-world quantities like temperature change or inventory change can be negative.",
    hint: "Not all variables are non-negative.",
    level: "intermediate",
    codeExample: "If x = change in inventory, x can be negative."
  },
  {
    question: "What is the graphical impact of x≥0?",
    shortAnswer: "It removes all points with negative x-coordinates.",
    explanation: "The feasible region is restricted to the right half of the plane (including the y-axis).",
    hint: "Right half-plane only.",
    level: "basic",
    codeExample: "x≥0 → points with x≥0 only."
  },
  {
    question: "What is the graphical impact of y≥0?",
    shortAnswer: "It removes all points with negative y-coordinates.",
    explanation: "The feasible region is restricted to the top half of the plane (including the x-axis).",
    hint: "Top half-plane only.",
    level: "basic",
    codeExample: "y≥0 → points with y≥0 only."
  },
  {
    question: "Why is the origin important in LP with non-negativity?",
    shortAnswer: "It's a common feasible point and often a corner point.",
    explanation: "The origin (0,0) satisfies x≥0 and y≥0, and often satisfies other constraints as well.",
    hint: "Origin is always in QI.",
    level: "intermediate",
    codeExample: "(0,0) is often a candidate for optimal solution."
  },
  {
    question: "How do you handle non-negativity in minimization problems?",
    shortAnswer: "Same as maximization — include x≥0, y≥0.",
    explanation: "Non-negativity is independent of whether you're maximizing or minimizing.",
    hint: "Always include non-negativity.",
    level: "intermediate",
    codeExample: "Minimize Z = 3x+2y subject to constraints and x≥0, y≥0."
  },
  {
    question: "What if the optimal solution of an LP is at the origin?",
    shortAnswer: "Then the minimum value is 0 (for minimization) or 0 is the best possible.",
    explanation: "If origin is optimal, it means all variables can be zero and that's the best solution.",
    hint: "Origin can be optimal.",
    level: "intermediate",
    codeExample: "Minimize Z = x+y with x≥0, y≥0 → optimal at (0,0), Z=0."
  },
  {
    question: "Can non-negativity create a bounded feasible region?",
    shortAnswer: "No, non-negativity alone creates an unbounded region.",
    explanation: "x≥0, y≥0 alone is unbounded (extends infinitely). Other constraints are needed to bound it.",
    hint: "Non-negativity alone is unbounded.",
    level: "intermediate",
    codeExample: "x≥0, y≥0 extends infinitely in QI."
  }
];

export default questions;