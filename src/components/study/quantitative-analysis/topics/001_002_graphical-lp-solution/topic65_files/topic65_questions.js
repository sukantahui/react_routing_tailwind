const questions = [
  {
    question: "What does slack represent graphically?",
    shortAnswer: "Slack is represented by the distance from the optimal point to the constraint line on a graph.",
    explanation: "Graphically, the distance between the optimal point and a constraint line indicates slack. The larger the distance, the more slack exists. Zero distance means the constraint is binding.",
    hint: "Think of slack as the 'gap' between the point and the line.",
    level: "basic",
    codeExample: "Constraint: 2x + y ≤ 10\nOptimal point (3, 3): Distance to line = slack"
  },
  {
    question: "How do you identify a binding constraint on a graph?",
    shortAnswer: "A binding constraint is shown as a constraint line that passes exactly through the optimal corner point on the graph.",
    explanation: "When a constraint line passes through the optimal point, the constraint is binding. The optimal point lies on that line, indicating zero slack and full resource utilization.",
    hint: "Look for constraint lines that 'touch' the optimal point.",
    level: "basic",
    codeExample: "Constraint line passes through (4, 2) → Binding at optimal point (4, 2)"
  },
  {
    question: "What does a constraint line far from the optimal point indicate?",
    shortAnswer: "A constraint line far from the optimal point indicates significant slack and abundant resources.",
    explanation: "When a constraint line is far from the optimal point, the resource represented by that constraint has large slack. This means the resource is not limiting the optimal solution.",
    hint: "Far away = lots of slack.",
    level: "intermediate",
    codeExample: "Constraint line 10 units away → Large slack → Abundant resource"
  },
  {
    question: "Can you determine slack values from a graph alone?",
    shortAnswer: "The graph shows relative slack but you need calculations to get exact values.",
    explanation: "Graphs provide visual indication of slack (distance), but exact slack values require substituting the optimal point into the constraint equation and calculating RHS - LHS.",
    hint: "Graph shows visual distance, calculation gives exact value.",
    level: "intermediate",
    codeExample: "Visual: Constraint close to point → Small slack\nCalculation: Slack = 24 - 22 = 2 units"
  },
  {
    question: "What is the significance of multiple constraints passing through the optimal point?",
    shortAnswer: "Multiple constraints passing through the optimal point means several resources are fully utilized (binding).",
    explanation: "When two or more constraint lines intersect at the optimal point, those resources are all binding. This is common in LP problems and indicates multiple bottlenecks simultaneously.",
    hint: "Multiple lines through point = multiple binding constraints.",
    level: "intermediate",
    codeExample: "Constraints A, B, and C all pass through (4, 3) → All three are binding"
  },
  {
    question: "How does the scale of the graph affect slack interpretation?",
    shortAnswer: "The scale affects visual distance but not the actual slack values, which are calculated independently.",
    explanation: "While graphs help visualize slack, the actual slack values are determined by calculation. The scale only affects how the distance appears visually, not the mathematical value.",
    hint: "Scale affects appearance, not calculation.",
    level: "advanced",
    codeExample: "Different graph scales show different visual distances but same slack value"
  },
  {
    question: "What is the difference between slack and slack on a graph?",
    shortAnswer: "Slack on a graph is the visual distance, while mathematical slack is the exact calculated value.",
    explanation: "Graphically, slack appears as the perpendicular distance from the optimal point to the constraint line. Mathematically, slack = RHS - LHS. Both represent the same concept but in different forms.",
    hint: "Visual distance = graphical representation of slack.",
    level: "basic",
    codeExample: "Graph: Distance from point to line\nMath: Slack = RHS - LHS"
  },
  {
    question: "How can graphs help in resource allocation decisions?",
    shortAnswer: "Graphs visually show which resources are bottlenecks and which have excess capacity.",
    explanation: "By looking at a graph, managers can immediately identify which constraints are binding (bottlenecks) and which have slack. This visual information helps in making resource allocation decisions.",
    hint: "Graphs show bottlenecks visually.",
    level: "intermediate",
    codeExample: "Binding constraints = bottlenecks → Expand these resources\nNon-binding = excess → Consider reallocating"
  },
  {
    question: "What does a constraint line parallel to another indicate about slack?",
    shortAnswer: "Parallel constraint lines indicate similar slack patterns, with the closer line having less slack.",
    explanation: "If two constraints are parallel, the one closer to the optimal point has less slack. The distance between the parallel lines indicates the difference in slack between the two resources.",
    hint: "Parallel lines = compare distances for slack.",
    level: "advanced",
    codeExample: "Line A: 2x + y ≤ 10, Line B: 2x + y ≤ 14\nLine A is closer → Less slack"
  },
  {
    question: "How do you interpret slack for ≥ constraints graphically?",
    shortAnswer: "For ≥ constraints, slack is measured as the distance from the optimal point to the line, but it represents surplus rather than unused capacity.",
    explanation: "For ≥ constraints (minimization problems), the distance to the line represents surplus. The optimal point must be on or above the line, so it's the distance beyond the requirement.",
    hint: "For ≥, distance represents surplus, not slack.",
    level: "intermediate",
    codeExample: "Constraint: 2x + y ≥ 10\nOptimal point (4, 4): Distance above line = surplus"
  },
  {
    question: "Can a constraint have slack and still be close to the optimal point?",
    shortAnswer: "Yes, a constraint can be close to the optimal point but still have positive slack if the point is slightly inside the constraint line.",
    explanation: "A constraint line close to the optimal point means small slack. The point is near the boundary but not on it, indicating the resource is nearly but not fully utilized.",
    hint: "Close but not touching = small slack.",
    level: "intermediate",
    codeExample: "Point is 0.5 units from line → Slack = 0.5 units (small but positive)"
  },
  {
    question: "What is the graphical interpretation of shadow prices?",
    shortAnswer: "Shadow prices relate to how much the objective function would increase if a binding constraint is relaxed, shown by the distance from the constraint.",
    explanation: "Graphically, shadow prices are associated with binding constraints (zero slack). The shadow price measures the rate at which Z would improve if the constraint line is moved outward.",
    hint: "Shadow price = value of relaxing a binding constraint.",
    level: "advanced",
    codeExample: "Moving a binding constraint outward by 1 unit → Z increases by shadow price"
  },
  {
    question: "How do you identify the most limiting resource from a graph?",
    shortAnswer: "The most limiting resource is the binding constraint closest to the origin or the one that forms the optimal corner point.",
    explanation: "The most limiting resources are the binding constraints that form the optimal corner point. These are the constraints with zero slack that determine where the optimum occurs.",
    hint: "Binding constraints at the corner are the most limiting.",
    level: "intermediate",
    codeExample: "Constraint A and B form the corner at (4, 3) → Most limiting resources"
  },
  {
    question: "What does it mean when all constraints have slack?",
    shortAnswer: "All constraints having slack means the optimal point is strictly inside the feasible region (not at a corner).",
    explanation: "If all constraints have positive slack, the optimal point is in the interior of the feasible region. This can happen in some LP problems, though it's less common in standard problems.",
    hint: "All slack = optimal point inside the region.",
    level: "advanced",
    codeExample: "Point (3, 3) inside region: All constraints have slack"
  },
  {
    question: "How do you interpret slack in a production planning graph?",
    shortAnswer: "In production planning, slack on a graph indicates idle capacity in production resources.",
    explanation: "Graphs in production planning show resources as constraints. Resources with slack have idle capacity. This helps managers decide where to increase production or where to reduce resources.",
    hint: "Slack = idle production capacity.",
    level: "intermediate",
    codeExample: "Machine hours slack = machine idle time\nLabor slack = idle workers"
  },
  {
    question: "What is the relationship between slack and the feasible region on a graph?",
    shortAnswer: "Slack is the distance from the optimal point to the boundary of the feasible region.",
    explanation: "The feasible region is bounded by constraint lines. Slack measures how far inside the feasible region the optimal point is from each boundary. Zero slack means on the boundary.",
    hint: "Slack = distance from point to region boundary.",
    level: "basic",
    codeExample: "Point inside region: distance to each boundary = slack for that constraint"
  },
  {
    question: "Can changing the objective function affect slack interpretation?",
    shortAnswer: "Yes, changing the objective function can change the optimal point, which changes slack values and their graphical interpretation.",
    explanation: "Different objective functions lead to different optimal points. This changes which constraints are binding and how much slack each constraint has.",
    hint: "Different objective = different optimal point = different slack.",
    level: "advanced",
    codeExample: "Z1 = 5x + 3y → opt at (4, 2), slack values\nZ2 = 3x + 5y → opt may change, slack changes"
  },
  {
    question: "How does slack appear differently in maximization vs minimization graphs?",
    shortAnswer: "In maximization, slack appears as unused capacity inside the region. In minimization, surplus appears as excess above requirements.",
    explanation: "Maximization problems typically use ≤ constraints, where slack is inside the feasible region. Minimization problems use ≥ constraints, where surplus is above the constraint lines.",
    hint: "Max: slack inside, Min: surplus above.",
    level: "intermediate",
    codeExample: "Max: 2x + y ≤ 10 (slack inside)\nMin: 2x + y ≥ 10 (surplus above)"
  },
  {
    question: "What is the significance of a constraint line that doesn't intersect the feasible region?",
    shortAnswer: "A constraint line that doesn't intersect the feasible region is redundant and doesn't affect the solution.",
    explanation: "If a constraint line doesn't touch the feasible region, the constraint is redundant. It doesn't limit the solution at all, and the resource always has slack.",
    hint: "No intersection = redundant constraint.",
    level: "advanced",
    codeExample: "Constraint: x + y ≤ 20\nFeasible region maxes at x + y = 10\nConstraint is redundant, always has slack"
  },
  {
    question: "How do you interpret slack in a diet problem graph?",
    shortAnswer: "In diet problems, slack appears as surplus above minimum requirements, shown as distance above constraint lines.",
    explanation: "Diet problems use ≥ constraints representing minimum nutritional requirements. The distance above these lines indicates surplus - how much more than the minimum is provided.",
    hint: "Distance above line = surplus in diet problem.",
    level: "intermediate",
    codeExample: "Protein constraint: 2x + y ≥ 10\nPoint (4, 4): LHS = 12, surplus = 2"
  },
  {
    question: "What is the role of slack in sensitivity analysis graphs?",
    shortAnswer: "Slack helps identify which constraints are sensitive to changes and which are robust on graphs.",
    explanation: "Binding constraints (zero slack) on a graph are sensitive to changes - small movements can significantly affect the solution. Non-binding constraints are robust.",
    hint: "Zero slack = sensitive to change.",
    level: "advanced",
    codeExample: "Binding constraint: Small RHS change affects Z\nNon-binding: Large RHS change doesn't affect Z"
  },
  {
    question: "How do you determine the amount of slack from a graph's scale?",
    shortAnswer: "Multiply the visual distance by the graph's scale to get the actual slack value.",
    explanation: "If a graph uses a certain scale (e.g., 1 unit = 2 grid squares), you can convert visual distance to actual slack by applying the scale factor.",
    hint: "Visual distance × scale = actual slack.",
    level: "intermediate",
    codeExample: "Graph scale: 1 unit = 2 squares\nVisual distance: 3 squares\nActual slack = 3/2 = 1.5 units"
  },
  {
    question: "What does a steep constraint line indicate about slack?",
    shortAnswer: "A steep constraint line indicates that the resource is sensitive to changes in one variable, affecting how slack changes.",
    explanation: "Steep lines mean that small changes in the x-variable cause large changes in the y-variable. This affects how slack behaves when moving the optimal point.",
    hint: "Steepness affects sensitivity of slack.",
    level: "advanced",
    codeExample: "Steep: 5x + y ≤ 10 (x changes affect slack significantly)\nFlat: x + 5y ≤ 10 (y changes affect slack significantly)"
  },
  {
    question: "How does the feasibility of a point relate to slack?",
    shortAnswer: "A point is feasible if all constraints have non-negative slack (or surplus for ≥ constraints).",
    explanation: "For a point to be feasible, it must satisfy all constraints. This means slack ≥ 0 for all ≤ constraints and surplus ≥ 0 for all ≥ constraints.",
    hint: "Non-negative slack = feasible point.",
    level: "basic",
    codeExample: "Point (3, 4):\nConstraint 1: slack = 2 ≥ 0 ✓\nConstraint 2: slack = 1 ≥ 0 ✓\n→ Feasible"
  },
  {
    question: "What is the connection between slack and corner points on a graph?",
    shortAnswer: "Corner points are formed by the intersection of constraint lines, and slack is zero for constraints forming the corner.",
    explanation: "At a corner point of the feasible region, the constraints that form that corner are binding (zero slack). Other constraints have positive slack.",
    hint: "Corner point = intersection of binding constraints.",
    level: "intermediate",
    codeExample: "Corner (4, 2) formed by:\n2x + y = 10 (zero slack)\nx + 2y = 8 (zero slack)\nOther constraints have positive slack"
  },
  {
    question: "How can graphs help identify redundant constraints through slack?",
    shortAnswer: "Constraints that always have large slack and never touch the feasible region are redundant.",
    explanation: "On a graph, redundant constraints are lines that lie outside the feasible region or don't form any part of its boundary. These constraints always have slack and don't affect the solution.",
    hint: "Always outside feasible region = redundant.",
    level: "advanced",
    codeExample: "Constraint: x + y ≤ 20\nFeasible region: x + y ≤ 10\nRedundant (always has slack)"
  },
  {
    question: "What is the difference in slack interpretation between resource and requirement constraints?",
    shortAnswer: "Resource constraints have slack (unused capacity), while requirement constraints have surplus (excess above requirement).",
    explanation: "Resource constraints (≤) have slack - unused resources. Requirement constraints (≥) have surplus - exceeding requirements. Both are represented as distance on graphs but in opposite directions.",
    hint: "≤ = slack, ≥ = surplus.",
    level: "intermediate",
    codeExample: "Resource: 2x + y ≤ 10 → slack\nRequirement: 2x + y ≥ 10 → surplus"
  }
];

export default questions;