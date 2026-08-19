const questions = [
  {
    question: "What is a linear inequality in two variables?",
    shortAnswer: "A linear inequality is a mathematical statement that relates two variables using an inequality symbol (≤, ≥, <, >) and describes a region of the coordinate plane.",
    explanation: "Unlike a linear equation (which gives a line), a linear inequality gives a half-plane – all the points on one side of the boundary line. The boundary is the line obtained by replacing the inequality with an equals sign.",
    hint: "Think of it as a rule that allows many possible pairs (x,y) to be valid.",
    level: "basic",
    codeExample: "2x + 3y ≤ 12"
  },
  {
    question: "How do you graph a linear inequality?",
    shortAnswer: "Graph the boundary line (solid if ≤ or ≥, dashed if < or >), test a point not on the line, and shade the side where the inequality holds.",
    explanation: "Steps: (1) replace inequality with '=' to get boundary line; (2) decide solid/dashed; (3) choose a test point (often (0,0)); (4) shade the region that satisfies the inequality.",
    hint: "The test point tells you which side to shade.",
    level: "basic",
    codeExample: "For y ≤ 2x + 1, graph y=2x+1 solid, test (0,0) gives 0≤1 true, so shade below."
  },
  {
    question: "Why is the boundary line solid for ≤ and ≥?",
    shortAnswer: "Because points on the line are included in the solution set – they satisfy the equality part of the inequality.",
    explanation: "The symbols ≤ (less than or equal) and ≥ (greater than or equal) include the equality case, so the line itself is part of the solution. A dashed line is used when the inequality is strict (< or >) to show boundary points are not included.",
    hint: "Remember: 'or equal to' means the line belongs.",
    level: "basic",
    codeExample: "x + y ≥ 5 → solid line; x + y > 5 → dashed."
  },
  {
    question: "What is a half-plane?",
    shortAnswer: "A half-plane is one of the two regions into which a line divides the coordinate plane. It represents all points satisfying a linear inequality.",
    explanation: "Every line splits the plane into two half-planes. The inequality selects exactly one of them (including the line if non-strict). The selected side is shaded.",
    hint: "Think of it as 'above' or 'below' the line.",
    level: "basic",
    codeExample: "For y < 3x, the half-plane below the line y=3x is shaded."
  },
  {
    question: "How do you find the x-intercept and y-intercept of a linear inequality?",
    shortAnswer: "Treat the inequality as an equation to find intercepts: set y=0 to get x-intercept, set x=0 to get y-intercept.",
    explanation: "Intercepts are useful for drawing the boundary line quickly. For 2x + 3y = 12, x-intercept is (6,0) and y-intercept is (0,4). They are points on the boundary line.",
    hint: "Intercepts are where the line crosses the axes.",
    level: "basic",
    codeExample: "For 2x + 3y ≤ 12, the boundary line has intercepts (6,0) and (0,4)."
  },
  {
    question: "What is the origin and why is it often used as a test point?",
    shortAnswer: "The origin is the point (0,0). It is often used as a test point because it's easy to evaluate and usually not on the boundary line.",
    explanation: "Plug (0,0) into the inequality. If it satisfies the inequality, shade the side containing the origin; otherwise, shade the opposite side. If (0,0) lies on the line, choose another point like (1,0) or (0,1).",
    hint: "It saves time because zero calculations are simple.",
    level: "basic",
    codeExample: "For x - y ≥ 2, (0,0) gives 0≥2 false, so shade the side opposite the origin."
  },
  {
    question: "What does it mean if the test point satisfies the inequality?",
    shortAnswer: "It means that the side of the boundary containing the test point is the solution region.",
    explanation: "The boundary line divides the plane into two half-planes. All points on one side will satisfy the inequality if the test point on that side does. So you shade that side.",
    hint: "If true, shade the test point's side; if false, shade the other side.",
    level: "basic",
    codeExample: "For y ≤ 2x, test (0,0): 0≤0 true → shade below the line."
  },
  {
    question: "How do you handle a linear inequality that does not pass through the origin?",
    shortAnswer: "You can still use (0,0) as a test point as long as it is not on the line. If it is on the line, choose a different point like (1,0) or (0,1).",
    explanation: "The test point must not lie on the boundary line. If it does, you cannot use it to decide shading; pick any other point not on the line.",
    hint: "Choose a point that is easy to evaluate and clearly off the line.",
    level: "basic",
    codeExample: "For 3x - 2y = 0, (0,0) lies on the line, so test (1,0) instead."
  },
  {
    question: "What is the feasible region in the context of linear inequalities?",
    shortAnswer: "The feasible region is the set of all points that satisfy all constraints (inequalities) simultaneously. It is the intersection of all shaded half-planes.",
    explanation: "When multiple inequalities are graphed together, the common overlapping shaded area is the feasible region. This is where all conditions are met.",
    hint: "It's the 'overlap' of all constraints.",
    level: "intermediate",
    codeExample: "For x ≥ 0, y ≥ 0, x + y ≤ 10, the feasible region is the triangle in the first quadrant under the line."
  },
  {
    question: "What is the difference between a bounded and unbounded feasible region?",
    shortAnswer: "A bounded region is enclosed and has finite area; an unbounded region extends infinitely in at least one direction.",
    explanation: "If constraints include enough restrictions to close the region (e.g., x≥0, y≥0, x+y≤10), it's bounded. If some direction is open (e.g., x≥0, y≥0, x+y≥10), it's unbounded.",
    hint: "Bounded means you can draw a circle around it; unbounded goes to infinity.",
    level: "intermediate",
    codeExample: "x≥0, y≥0, x+y≤5 is bounded; x≥0, y≥0 is unbounded."
  },
  {
    question: "What is a corner point in a feasible region?",
    shortAnswer: "A corner point (extreme point) is a vertex of the feasible region where two boundary lines intersect.",
    explanation: "In linear programming, optimal solutions occur at corner points (if they exist). These points are found by solving pairs of constraint equations.",
    hint: "They are the 'sharp' corners of the shaded area.",
    level: "intermediate",
    codeExample: "For x≥0, y≥0, x+y≤10, the corner points are (0,0), (10,0), (0,10)."
  },
  {
    question: "How do you find the intersection of two constraint lines algebraically?",
    shortAnswer: "Solve the system of two linear equations formed by setting the inequalities to equalities.",
    explanation: "For two constraints, e.g., 2x + y = 8 and x + 2y = 10, solve using substitution or elimination to get the intersection point.",
    hint: "Set both as equalities and solve for x and y.",
    level: "intermediate",
    codeExample: "Solve 2x + y = 8 and x + 2y = 10 → x=2, y=4."
  },
  {
    question: "What is a redundant constraint?",
    shortAnswer: "A redundant constraint is one that does not affect the feasible region because it is already implied by other constraints.",
    explanation: "If a constraint's half-plane contains the entire feasible region defined by the other constraints, it is redundant. Removing it does not change the solution.",
    hint: "It's a constraint that 'doesn't add anything new'.",
    level: "intermediate",
    codeExample: "If you have x≤10 and x≤20, the latter is redundant because x≤10 already ensures x≤20."
  },
  {
    question: "What is a binding constraint?",
    shortAnswer: "A binding constraint is one that holds as an equality at the optimal solution; it limits the optimal value.",
    explanation: "At the optimal point, the constraint is active (the point lies on its boundary line). Non-binding constraints have slack (unused resource).",
    hint: "It 'binds' the solution; if you relax it, the optimal value improves.",
    level: "intermediate",
    codeExample: "If optimal solution is (2,4) and constraint is 2x+y≤8, then 2*2+4=8 so it's binding."
  },
  {
    question: "What is slack in a constraint?",
    shortAnswer: "Slack is the difference between the left-hand side and the right-hand side of a ≤ constraint when evaluated at the solution.",
    explanation: "For a ≤ constraint, slack = RHS - LHS. It represents unused resources. For ≥ constraints, surplus is used.",
    hint: "Slack is the amount of 'room' left in the constraint.",
    level: "intermediate",
    codeExample: "If constraint is 2x + 3y ≤ 12 and solution is (1,2), LHS=8, slack=4."
  },
  {
    question: "How do you test if a point is feasible for all constraints?",
    shortAnswer: "Plug the point into every inequality. If it satisfies all, it's feasible; otherwise, infeasible.",
    explanation: "Feasibility requires that the point lies within all half-planes simultaneously. If any constraint is violated, the point is not feasible.",
    hint: "Check each constraint one by one.",
    level: "basic",
    codeExample: "For constraints x≥0, y≥0, x+y≤5, point (3,1) satisfies all → feasible."
  },
  {
    question: "What is the objective function line in graphical LP?",
    shortAnswer: "The objective function line represents a constant value of the objective function (e.g., profit or cost). It is a straight line with a given slope.",
    explanation: "For maximization, we move this line parallel in the direction of increasing objective value until it touches the feasible region at the optimal corner.",
    hint: "Think of it as an 'iso-profit' or 'iso-cost' line.",
    level: "intermediate",
    codeExample: "For maximize Z = 3x + 4y, lines like 3x+4y=12, 3x+4y=24 are objective lines."
  },
  {
    question: "What is the corner-point principle?",
    shortAnswer: "The optimal solution (if it exists) of a linear programming problem will occur at a corner point of the feasible region.",
    explanation: "This principle is the foundation of the graphical method. It means we only need to evaluate the objective function at the vertices of the feasible region to find the optimum.",
    hint: "Check the corners; the best answer is there.",
    level: "intermediate",
    codeExample: "For a triangular feasible region, evaluate Z at the three vertices to find max/min."
  },
  {
    question: "How do you determine the maximum value graphically?",
    shortAnswer: "Plot the objective function lines and move them parallel away from the origin (for max) until they just touch the feasible region. The last touching corner gives the max.",
    explanation: "For maximization, increase the objective value until the line is about to leave the feasible region. The point of last contact is optimal.",
    hint: "Move the line in the direction of increasing Z.",
    level: "intermediate",
    codeExample: "For Z = 2x + y, move the line 2x + y = k upward until it hits the farthest corner."
  },
  {
    question: "How do you determine the minimum value graphically?",
    shortAnswer: "Move the objective line parallel towards the origin (decreasing Z) until it first touches the feasible region. That first contact gives the min.",
    explanation: "For minimization, decrease Z until the line just enters the feasible region; the entry point is optimal.",
    hint: "Move towards the origin.",
    level: "intermediate",
    codeExample: "For Z = 3x + 2y, move line towards (0,0) until it hits the region."
  },
  {
    question: "What are multiple optimal solutions?",
    shortAnswer: "Multiple optimal solutions occur when the objective function is parallel to a binding edge of the feasible region, so any point on that edge gives the same optimal value.",
    explanation: "This happens when the slope of the objective line equals the slope of a constraint boundary. Then there are infinitely many optimal points along that segment.",
    hint: "The objective line coincides with an edge of the feasible region.",
    level: "expert",
    codeExample: "If Z = x + y and constraint x+y≤10, any point on x+y=10 gives Z=10."
  },
  {
    question: "What is an infeasible LP problem?",
    shortAnswer: "An infeasible problem has no point that satisfies all constraints simultaneously; the feasible region is empty.",
    explanation: "This occurs when constraints are contradictory, e.g., x≥5 and x≤3. Graphically, the half-planes do not overlap.",
    hint: "No overlap = no solution.",
    level: "expert",
    codeExample: "x≥5, x≤3 → infeasible."
  },
  {
    question: "What is an unbounded LP problem?",
    shortAnswer: "An unbounded problem has a feasible region that extends infinitely in the direction of improvement, so the objective can be made arbitrarily large (for max) or small (for min).",
    explanation: "This happens when the region is not closed in that direction, e.g., only constraints x≥0, y≥0 and no upper bounds. Then maximizing Z=x+y gives infinite value.",
    hint: "You can keep going forever.",
    level: "expert",
    codeExample: "Maximize Z = x + y subject to x≥0, y≥0 is unbounded."
  },
  {
    question: "How can you identify a redundant constraint from the graph?",
    shortAnswer: "If its boundary line does not form any part of the boundary of the feasible region (i.e., it lies outside the overlapping area), it is redundant.",
    explanation: "A redundant constraint does not affect the feasible region shape; it is 'inside' the feasible region or does not cut it.",
    hint: "If you remove it, the shaded area stays the same.",
    level: "expert",
    codeExample: "With x≥0, y≥0, x+y≤10, the constraint x≤20 is redundant."
  },
  {
    question: "What is sensitivity analysis in graphical LP?",
    shortAnswer: "Sensitivity analysis studies how changes in the coefficients of the objective function or constraints affect the optimal solution.",
    explanation: "Graphically, it involves changing the slope of the objective line or shifting constraint lines to see how the optimal corner moves.",
    hint: "It asks: 'What if things change a little?'",
    level: "expert",
    codeExample: "If profit per unit of product changes, the slope changes; a new corner may become optimal."
  },
  {
    question: "How does changing a resource constraint affect the feasible region?",
    shortAnswer: "Shifting a constraint line outward (increasing RHS) expands the region; shifting inward shrinks it. The optimal corner may change.",
    explanation: "For a ≤ constraint, increasing the RHS moves the line away from the origin, enlarging the region. Decreasing it moves it closer, possibly eliminating the current optimum.",
    hint: "More resource = more options.",
    level: "expert",
    codeExample: "If constraint 2x + 3y ≤ 12 changes to ≤ 15, the region grows."
  },
  {
    question: "What is the difference between binding and non-binding at the optimum?",
    shortAnswer: "A binding constraint has zero slack/surplus at the optimal solution; a non-binding has positive slack (for ≤) or surplus (for ≥).",
    explanation: "Binding constraints limit the objective; non-binding constraints have unused capacity.",
    hint: "Binding = active; non-binding = slack available.",
    level: "intermediate",
    codeExample: "If optimal solution is (2,4) and 2x+y≤8 gives equality, it's binding."
  },
  {
    question: "How do you check if a corner point is feasible?",
    shortAnswer: "Substitute its coordinates into all constraints. If all are satisfied, it's feasible; otherwise, infeasible.",
    explanation: "Corner points are often intersections of constraint lines, but may not satisfy all constraints (e.g., they may violate a non-negativity).",
    hint: "Verify against every inequality.",
    level: "intermediate",
    codeExample: "For constraints x≥0, y≥0, x+y≤10, point (5,5) satisfies all; point (-1,5) does not."
  },
  {
    question: "What is the role of the origin in non-negativity restrictions?",
    shortAnswer: "Non-negativity restrictions x≥0, y≥0 mean the feasible region is restricted to the first quadrant. The origin is often a corner point.",
    explanation: "These are common constraints in LP to ensure decision variables are non-negative. The origin is the intersection of x=0 and y=0.",
    hint: "They keep variables from being negative.",
    level: "basic",
    codeExample: "x≥0, y≥0, x+y≤10 → the feasible region is in the first quadrant."
  },
  {
    question: "What is an iso-profit line?",
    shortAnswer: "An iso-profit line is a line on which the objective function (profit) is constant. All points on the line give the same profit.",
    explanation: "For maximization, we draw parallel lines with increasing profit until we reach the farthest corner.",
    hint: "Iso = equal; profit is same along the line.",
    level: "intermediate",
    codeExample: "If profit Z = 3x + 5y, then 3x + 5y = 15 and 3x + 5y = 30 are iso-profit lines."
  },
  {
    question: "What is the difference between iso-profit and iso-cost lines?",
    shortAnswer: "Iso-profit is used for maximization (profit), iso-cost for minimization (cost). Both are objective function lines.",
    explanation: "In minimization, we move the iso-cost line parallel towards the origin to find the minimum cost.",
    hint: "Profit max → move outward; cost min → move inward.",
    level: "intermediate",
    codeExample: "Minimize C = 4x + 3y → iso-cost lines like 4x+3y=12, 4x+3y=24."
  }
];

export default questions;