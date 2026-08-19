const questions = [
  {
    question: "Why do we move the objective function line parallel to itself?",
    shortAnswer: "To find the optimal solution by exploring different objective values.",
    explanation: "Moving the line parallel while keeping the same slope allows us to find the highest (max) or lowest (min) value that still touches the feasible region.",
    hint: "To find the optimum.",
    level: "basic",
    codeExample: "Move Z=3x+4y from Z=12 to Z=24 to find the max."
  },
  {
    question: "What stays the same when moving the objective line?",
    shortAnswer: "The slope stays the same — the line moves parallel.",
    explanation: "The slope is determined by the coefficients of x and y, which don't change. Only the intercept changes.",
    hint: "Slope stays the same.",
    level: "basic",
    codeExample: "3x+4y=12 and 3x+4y=24 are parallel."
  },
  {
    question: "What changes when moving the objective line?",
    shortAnswer: "The intercept changes as the value of Z (or C) changes.",
    explanation: "As Z increases or decreases, the line shifts parallel. The intercept changes because the line crosses the axes at different points.",
    hint: "Intercept changes.",
    level: "basic",
    codeExample: "Z=12 gives intercepts (4,3); Z=24 gives intercepts (8,6)."
  },
  {
    question: "Which direction do you move the line for maximization?",
    shortAnswer: "Outward (away from the origin).",
    explanation: "For maximization, higher Z values are better. Move the line outward until it's about to leave the feasible region.",
    hint: "Away from origin.",
    level: "basic",
    codeExample: "Move from Z=12 to Z=24 to Z=36."
  },
  {
    question: "Which direction do you move the line for minimization?",
    shortAnswer: "Inward (toward the origin).",
    explanation: "For minimization, lower C values are better. Move the line inward until it just touches the feasible region.",
    hint: "Toward origin.",
    level: "basic",
    codeExample: "Move from C=12 to C=8 to C=6."
  },
  {
    question: "What is the optimal line for maximization?",
    shortAnswer: "The last line that still touches the feasible region.",
    explanation: "As you move outward, the line will eventually be about to leave the region. The last line that touches is optimal.",
    hint: "Last line touching.",
    level: "intermediate",
    codeExample: "The line with the highest Z that intersects the region."
  },
  {
    question: "What is the optimal line for minimization?",
    shortAnswer: "The first line that touches the feasible region.",
    explanation: "As you move inward, the line will first touch the region. That's the optimal line.",
    hint: "First line touching.",
    level: "intermediate",
    codeExample: "The line with the lowest C that intersects the region."
  },
  {
    question: "What if the objective line overlaps a constraint edge?",
    shortAnswer: "There are multiple optimal solutions along that edge.",
    explanation: "If the objective line has the same slope as a constraint, it overlaps the edge at the optimum.",
    hint: "Multiple optima.",
    level: "expert",
    codeExample: "Z=x+y and x+y=10 → all points on the edge are optimal."
  },
  {
    question: "How do you know when to stop moving the line?",
    shortAnswer: "Stop when the line is about to leave the region (for max) or just enters (for min).",
    explanation: "For maximization, if you move any further, the line won't intersect the region. For minimization, if you move any further inward, it won't intersect.",
    hint: "Just touching.",
    level: "intermediate",
    codeExample: "The line is tangent to the feasible region."
  },
  {
    question: "Can the objective line move through the feasible region?",
    shortAnswer: "Yes, as it moves parallel, it passes through the feasible region.",
    explanation: "The line intersects the region at different points as it moves. The optimal point is where it just touches.",
    hint: "Passes through the region.",
    level: "intermediate",
    codeExample: "The line moves across the region as Z changes."
  },
  {
    question: "What is the role of the intercept in moving the line?",
    shortAnswer: "The intercept changes as the line moves, determining where it crosses the axes.",
    explanation: "As Z (or C) changes, the intercept changes. The line shifts parallel because the intercept changes.",
    hint: "Intercept changes with Z.",
    level: "intermediate",
    codeExample: "For Z=12, intercepts are (4,3); for Z=24, intercepts are (8,6)."
  },
  {
    question: "How do you move the line if it's vertical?",
    shortAnswer: "Move it left or right (parallel) for different Z values.",
    explanation: "A vertical line x = Z/a moves horizontally as Z changes.",
    hint: "Horizontal movement.",
    level: "expert",
    codeExample: "Z=3x → x=Z/3, move right as Z increases."
  },
  {
    question: "How do you move the line if it's horizontal?",
    shortAnswer: "Move it up or down (parallel) for different Z values.",
    explanation: "A horizontal line y = Z/b moves vertically as Z changes.",
    hint: "Vertical movement.",
    level: "expert",
    codeExample: "Z=4y → y=Z/4, move up as Z increases."
  },
  {
    question: "What is the difference between moving the line and changing the slope?",
    shortAnswer: "Moving the line keeps the slope the same; changing the slope rotates the line.",
    explanation: "Moving parallel keeps the same angle. Changing the slope changes the angle of the line.",
    hint: "Move = shift; change slope = rotate.",
    level: "intermediate",
    codeExample: "Moving: 3x+4y=12 to 3x+4y=24; Changing slope: 3x+4y to 4x+3y."
  },
  {
    question: "Why do we only need to check corner points?",
    shortAnswer: "Because the optimal line touches the feasible region at a corner point.",
    explanation: "As the line moves parallel, it will touch the region at a corner point (or edge) where the optimum occurs.",
    hint: "Optimum at corners.",
    level: "intermediate",
    codeExample: "The optimal line always touches at a corner point."
  },
  {
    question: "How do you find the optimal value from the line?",
    shortAnswer: "Substitute the optimal point into the objective function.",
    explanation: "Once you find where the line touches, plug those coordinates into Z = ax + by to get the optimal value.",
    hint: "Plug in the coordinates.",
    level: "intermediate",
    codeExample: "At (4,3), Z = 3(4) + 4(3) = 24."
  },
  {
    question: "What is the most common mistake when moving the line?",
    shortAnswer: "Changing the slope instead of keeping it parallel.",
    explanation: "Students often rotate the line instead of shifting it parallel.",
    hint: "Keep the slope constant.",
    level: "basic",
    codeExample: "3x+4y=12 should move to 3x+4y=24, not 4x+3y=12."
  },
  {
    question: "Can the objective line move through the origin?",
    shortAnswer: "Yes, if Z (or C) = 0, the line passes through the origin.",
    explanation: "When the objective value is zero, the line passes through the origin.",
    hint: "Z=0 → through origin.",
    level: "basic",
    codeExample: "3x+4y=0 passes through (0,0)."
  },
  {
    question: "What happens if the line moves beyond the feasible region?",
    shortAnswer: "It no longer intersects the region — the value is unattainable.",
    explanation: "If the line is completely outside the region, that value of Z (or C) is not feasible.",
    hint: "No intersection.",
    level: "intermediate",
    codeExample: "A line outside the region means Z is too high (for max)."
  },
  {
    question: "How do you identify the optimal line on a graph?",
    shortAnswer: "It's the line that just touches the feasible region.",
    explanation: "For maximization, it's the farthest line that still intersects. For minimization, it's the closest.",
    hint: "Just touching.",
    level: "intermediate",
    codeExample: "The line is tangent to the region."
  },
  {
    question: "What is the role of parallel lines in graphical LP?",
    shortAnswer: "They represent different objective values and help find the optimum.",
    explanation: "Each parallel line is a different level of Z (or C). Moving between them finds the optimal value.",
    hint: "Different levels of objective.",
    level: "intermediate",
    codeExample: "Z=12, Z=24, Z=36 are parallel lines."
  },
  {
    question: "How do you move the line using algebra?",
    shortAnswer: "Change the constant term (Z or C) in the equation.",
    explanation: "For Z=ax+by, changing Z shifts the line parallel. Keep a and b the same.",
    hint: "Change the constant.",
    level: "intermediate",
    codeExample: "Change 3x+4y=12 to 3x+4y=24."
  },
  {
    question: "What is the relationship between the line and the feasible region?",
    shortAnswer: "The line must intersect the region for the objective value to be feasible.",
    explanation: "If the line doesn't intersect the region, that objective value is not attainable.",
    hint: "Must intersect.",
    level: "intermediate",
    codeExample: "The line must touch or pass through the feasible region."
  },
  {
    question: "What if the objective line is parallel to all constraints?",
    shortAnswer: "There may be multiple optimal solutions or the region may be unbounded.",
    explanation: "If the objective slope equals all constraint slopes, the problem may have multiple optima or be unbounded.",
    hint: "Special case.",
    level: "expert",
    codeExample: "Z=x+y and all constraints have slope -1."
  },
  {
    question: "How do you know if you've moved the line enough?",
    shortAnswer: "For max, stop when the line is about to leave the region. For min, stop when it just enters.",
    explanation: "Check if moving any further would make the line not intersect the region.",
    hint: "About to leave/just entered.",
    level: "intermediate",
    codeExample: "The line is tangent to the region."
  },
  {
    question: "What is the difference between moving the line and translating it?",
    shortAnswer: "They mean the same thing — shifting the line parallel.",
    explanation: "Translation is the mathematical term for moving an object without changing its orientation.",
    hint: "Same concept.",
    level: "basic",
    codeExample: "Translate the line parallel to itself."
  },
  {
    question: "Why does the line always move parallel?",
    shortAnswer: "Because the coefficients of x and y (a and b) don't change.",
    explanation: "The slope is determined by -a/b. Since a and b are constant, the slope never changes.",
    hint: "Coefficients are constant.",
    level: "intermediate",
    codeExample: "In 3x+4y=Z, a=3, b=4 are constant."
  },
  {
    question: "How do you use parallel lines to solve LP problems?",
    shortAnswer: "Draw multiple parallel lines and find the one that gives the best objective value.",
    explanation: "Draw lines for different Z (or C) values and identify the optimal line by its position relative to the feasible region.",
    hint: "Draw and compare.",
    level: "intermediate",
    codeExample: "Draw Z=12, Z=24, Z=36 and find which touches the region."
  },
  {
    question: "What is the relationship between the line and shadow prices?",
    shortAnswer: "Moving the line parallel shows the effect of changing resources.",
    explanation: "In sensitivity analysis, moving the line parallel represents changes in resource availability.",
    hint: "Related to sensitivity.",
    level: "expert",
    codeExample: "Shifting the line shows how the optimal solution changes."
  }
];

export default questions;