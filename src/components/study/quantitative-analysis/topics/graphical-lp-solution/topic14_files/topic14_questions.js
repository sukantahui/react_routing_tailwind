const questions = [
  {
    question: "How do you find corner points from a graph?",
    shortAnswer: "Look for the vertices of the feasible region where constraint lines intersect.",
    explanation: "Corner points are the 'sharp' corners of the feasible region. Trace the boundary and note where it changes direction.",
    hint: "Corners of the shaded region.",
    level: "basic",
    codeExample: "Look for points where two lines meet."
  },
  {
    question: "What are the steps to find corner points graphically?",
    shortAnswer: "Plot constraints, shade the region, locate the corners, and read their coordinates.",
    explanation: "1. Graph all constraints. 2. Shade the feasible region. 3. Find where the boundary changes direction. 4. Read the coordinates.",
    hint: "Plot, shade, locate, read.",
    level: "basic",
    codeExample: "Find all vertices of the feasible polygon."
  },
  {
    question: "What do corner points look like on a graph?",
    shortAnswer: "They look like the 'sharp' corners or vertices of the feasible region.",
    explanation: "Corner points are where two constraint lines intersect and the boundary changes direction.",
    hint: "Sharp corners of the region.",
    level: "basic",
    codeExample: "The points where the region turns."
  },
  {
    question: "How do you know if a point is a corner point graphically?",
    shortAnswer: "If two constraint lines intersect at that point and the boundary changes direction, it's a corner.",
    explanation: "A corner point is where the boundary of the feasible region makes a turn.",
    hint: "Boundary changes direction.",
    level: "intermediate",
    codeExample: "Intersection of two constraints."
  },
  {
    question: "Are points on the axes always corner points?",
    shortAnswer: "Often, but not always — only if they're vertices of the feasible region.",
    explanation: "Points where a constraint meets the x-axis or y-axis are corner points if they are part of the region's boundary.",
    hint: "Check if they're on the boundary.",
    level: "intermediate",
    codeExample: "(4,0) is a corner point if it's a vertex."
  },
  {
    question: "How many corner points can you find graphically?",
    shortAnswer: "As many as there are vertices of the feasible region.",
    explanation: "The number depends on the number of constraints and their intersections.",
    hint: "Depends on the region.",
    level: "intermediate",
    codeExample: "A triangle has 3, a pentagon has 5."
  },
  {
    question: "Can you find corner points from an unbounded region graphically?",
    shortAnswer: "Yes, unbounded regions can have corner points.",
    explanation: "Even though the region extends infinitely, it can still have vertices.",
    hint: "Unbounded can have corners.",
    level: "intermediate",
    codeExample: "x≥0, y≥0, x+y≥4 has corners (0,4) and (4,0)."
  },
  {
    question: "What is the first thing to look for when finding corner points?",
    shortAnswer: "Look for the 'corners' of the feasible region where the boundary changes direction.",
    explanation: "Start at one point and trace the boundary. Every time the boundary turns, you've found a corner.",
    hint: "Trace the boundary.",
    level: "basic",
    codeExample: "Start at the origin and work your way around."
  },
  {
    question: "How do you read coordinates of corner points from a graph?",
    shortAnswer: "Use the grid lines to determine the x and y values at the corner.",
    explanation: "Trace down to the x-axis to find x, and across to the y-axis to find y.",
    hint: "Use grid lines.",
    level: "basic",
    codeExample: "The point (4,3) is 4 units right and 3 units up."
  },
  {
    question: "What if a corner point is at a fraction?",
    shortAnswer: "Use the grid to estimate, or use algebra for exact values.",
    explanation: "Graphical reading gives approximate values. For exact values, use algebraic methods.",
    hint: "Algebra for exact values.",
    level: "intermediate",
    codeExample: "(2.5, 3.5) from the graph, or solve equations for exact."
  },
  {
    question: "How do you verify a corner point graphically?",
    shortAnswer: "Check that the point lies on two constraint lines and is in the feasible region.",
    explanation: "A corner point must be at the intersection of two constraints and inside the feasible region.",
    hint: "Check two lines.",
    level: "intermediate",
    codeExample: "Point (4,3) lies on x+y=10 and 2x+y=14."
  },
  {
    question: "Why might you miss a corner point on a graph?",
    shortAnswer: "If you don't trace the entire boundary or forget points on the axes.",
    explanation: "Common misses: points on axes, points where constraints intersect at non-obvious angles.",
    hint: "Check axes carefully.",
    level: "intermediate",
    codeExample: "Check (0,10) on y-axis."
  },
  {
    question: "What is the relationship between corner points and constraints?",
    shortAnswer: "Each corner point is where two or more constraints intersect.",
    explanation: "At a corner, at least two constraints are binding (active).",
    hint: "Intersection of constraints.",
    level: "intermediate",
    codeExample: "At (4,3), both x+y=10 and 2x+y=14 are active."
  },
  {
    question: "Can a corner point be on just one constraint?",
    shortAnswer: "No, in 2D a corner requires two constraints.",
    explanation: "A single constraint is a line, not a point. Two lines are needed for a corner.",
    hint: "Two constraints needed.",
    level: "basic",
    codeExample: "A point on one line isn't a corner."
  },
  {
    question: "How do you find corner points if the region is very large?",
    shortAnswer: "Use a larger scale or use algebra to find exact points.",
    explanation: "If the region extends beyond the graph, use algebraic methods to find corners.",
    hint: "Use algebra for large regions.",
    level: "intermediate",
    codeExample: "Solve equations instead of reading from graph."
  },
  {
    question: "What is the easiest way to identify corner points?",
    shortAnswer: "Trace the boundary of the feasible region and note where it changes direction.",
    explanation: "Follow the edge of the region with your finger. Every turn is a corner.",
    hint: "Trace the boundary.",
    level: "basic",
    codeExample: "Start at one point and go around."
  },
  {
    question: "How do you find corner points when constraints are dashed?",
    shortAnswer: "Dashed lines are still boundaries — corner points are where boundaries intersect.",
    explanation: "Dashed lines indicate strict inequalities, but the intersection points are still potential corners (though not feasible if the point is on the dashed line).",
    hint: "Intersections still matter.",
    level: "expert",
    codeExample: "Points on dashed lines are not feasible."
  },
  {
    question: "What is the difference between a corner point and an edge point on a graph?",
    shortAnswer: "A corner point is a vertex; an edge point lies along a boundary between corners.",
    explanation: "Edge points are on the boundary but not at the corners.",
    hint: "Corner = vertex; edge = on line.",
    level: "intermediate",
    codeExample: "(5,5) on x+y=10 is an edge point."
  },
  {
    question: "How do you check if a point is a corner point graphically?",
    shortAnswer: "Check if it's at the intersection of two constraint lines and the boundary changes direction.",
    explanation: "At a corner, the boundary of the feasible region changes direction.",
    hint: "Boundary changes direction.",
    level: "intermediate",
    codeExample: "Look for a sharp turn."
  },
  {
    question: "What tools help find corner points on a graph?",
    shortAnswer: "A ruler, grid lines, and colored pencils for different constraints.",
    explanation: "Use a ruler to draw straight lines, grid lines to read coordinates, and colors to distinguish constraints.",
    hint: "Use proper graphing tools.",
    level: "basic",
    codeExample: "Ruler, grid paper, colored pens."
  },
  {
    question: "How do you find corner points in a system with many constraints?",
    shortAnswer: "Work systematically around the boundary of the feasible region.",
    explanation: "Start at one corner and move along the boundary, noting each corner you encounter.",
    hint: "Work around the boundary.",
    level: "intermediate",
    codeExample: "Trace the perimeter of the feasible region."
  },
  {
    question: "What is the importance of finding corner points graphically?",
    shortAnswer: "It provides a visual check for algebraic solutions and helps identify all candidates.",
    explanation: "Graphical identification ensures no corner points are missed and helps verify algebraic calculations.",
    hint: "Visual check.",
    level: "intermediate",
    codeExample: "Use graph to verify your algebraic solutions."
  },
  {
    question: "Can you find corner points from a graph without algebra?",
    shortAnswer: "Yes, by reading coordinates directly from the graph.",
    explanation: "Use grid lines to determine the x and y values at each corner.",
    hint: "Read from grid.",
    level: "basic",
    codeExample: "The corner is at (3,4) according to the graph."
  },
  {
    question: "How do you know you've found all corner points?",
    shortAnswer: "Check that you've traced the entire boundary of the feasible region.",
    explanation: "Make sure you've gone completely around the region and noted every turn.",
    hint: "Complete the loop.",
    level: "intermediate",
    codeExample: "Go around the entire perimeter."
  },
  {
    question: "What if the feasible region is unbounded — how do you find corners?",
    shortAnswer: "Find the finite vertices where constraints intersect.",
    explanation: "Unbounded regions have corner points where constraints meet, even though the region extends infinitely.",
    hint: "Finite vertices exist.",
    level: "intermediate",
    codeExample: "x≥0, y≥0, x+y≥4 has 2 corner points."
  },
  {
    question: "How do you handle corner points at the intersection of three constraints?",
    shortAnswer: "It's still one corner point where three constraints meet.",
    explanation: "In 2D, a corner point is where at least two constraints intersect. Three or more can intersect at the same point.",
    hint: "Multiple constraints can meet.",
    level: "expert",
    codeExample: "The origin (0,0) where x=0, y=0, and x+y=10 meet."
  },
  {
    question: "What is the easiest way to remember how to find corner points?",
    shortAnswer: "Think of the 'corners' of the feasible region — where the boundary changes direction.",
    explanation: "The word 'corner' itself tells you what to look for.",
    hint: "Look for the turns.",
    level: "basic",
    codeExample: "Every turn is a corner."
  },
  {
    question: "How do you find corner points if the scale is not 1:1?",
    shortAnswer: "Use the scale to convert graph distances to actual values.",
    explanation: "If each grid square represents 2 units, multiply the count by 2 to get coordinates.",
    hint: "Use the scale.",
    level: "intermediate",
    codeExample: "If each square = 2 units, (2 squares, 3 squares) = (4, 6)."
  },
  {
    question: "What if a corner point is outside the visible graph?",
    shortAnswer: "Use algebra to find the exact coordinates.",
    explanation: "If the corner is off the graph, you need to solve the equations algebraically.",
    hint: "Use algebra.",
    level: "expert",
    codeExample: "Solve equations for exact values."
  },
  {
    question: "How do you label corner points on a graph?",
    shortAnswer: "Use letters (A, B, C, ...) and write coordinates next to them.",
    explanation: "Clear labeling helps when evaluating the objective function.",
    hint: "Use clear labels.",
    level: "basic",
    codeExample: "A (0,0), B (4,0), C (2,2), D (0,4)."
  },
  {
    question: "Why is finding corner points graphically a useful skill?",
    shortAnswer: "It provides intuition for LP and helps verify algebraic solutions.",
    explanation: "Graphical skills build understanding of the geometry of LP and catch errors in algebra.",
    hint: "Builds intuition.",
    level: "intermediate",
    codeExample: "Use graph to double-check your work."
  }
];

export default questions;