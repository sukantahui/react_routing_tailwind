const questions = [
  {
    question: "What is an x-intercept?",
    shortAnswer: "The point where a line crosses the x-axis (y = 0).",
    explanation: "The x-intercept is found by setting y = 0 in the equation and solving for x. It is written as (x, 0).",
    hint: "Point where line meets x-axis.",
    level: "basic",
    codeExample: "2x + 3y = 12 → when y=0, x=6 → x-intercept = (6,0)"
  },
  {
    question: "What is a y-intercept?",
    shortAnswer: "The point where a line crosses the y-axis (x = 0).",
    explanation: "The y-intercept is found by setting x = 0 in the equation and solving for y. It is written as (0, y).",
    hint: "Point where line meets y-axis.",
    level: "basic",
    codeExample: "2x + 3y = 12 → when x=0, y=4 → y-intercept = (0,4)"
  },
  {
    question: "How do you find the x-intercept of a linear equation?",
    shortAnswer: "Set y = 0 and solve for x.",
    explanation: "The x-intercept occurs where the line crosses the x-axis, which means the y-coordinate is 0. Substitute y = 0 into the equation and solve for x.",
    hint: "Set y = 0, solve for x.",
    level: "basic",
    codeExample: "3x + 2y = 12 → 3x + 2(0) = 12 → 3x = 12 → x = 4 → (4,0)"
  },
  {
    question: "How do you find the y-intercept of a linear equation?",
    shortAnswer: "Set x = 0 and solve for y.",
    explanation: "The y-intercept occurs where the line crosses the y-axis, which means the x-coordinate is 0. Substitute x = 0 into the equation and solve for y.",
    hint: "Set x = 0, solve for y.",
    level: "basic",
    codeExample: "3x + 2y = 12 → 3(0) + 2y = 12 → 2y = 12 → y = 6 → (0,6)"
  },
  {
    question: "Why are intercepts important in graphing?",
    shortAnswer: "They provide two points to draw a line accurately.",
    explanation: "Two points determine a straight line. Intercepts are easy to find and give two reliable points for graphing.",
    hint: "Two points define a line.",
    level: "basic",
    codeExample: "(4,0) and (0,6) define the line 3x + 2y = 12"
  },
  {
    question: "What is the x-intercept of a vertical line?",
    shortAnswer: "The x-intercept is the point where the vertical line crosses the x-axis.",
    explanation: "A vertical line x = k has x-intercept (k, 0) because all points have x = k.",
    hint: "Vertical line x = k → (k,0).",
    level: "intermediate",
    codeExample: "x = 4 → x-intercept = (4,0)"
  },
  {
    question: "What is the y-intercept of a horizontal line?",
    shortAnswer: "The y-intercept is the point where the horizontal line crosses the y-axis.",
    explanation: "A horizontal line y = k has y-intercept (0, k) because all points have y = k.",
    hint: "Horizontal line y = k → (0,k).",
    level: "intermediate",
    codeExample: "y = 3 → y-intercept = (0,3)"
  },
  {
    question: "What happens if a line passes through the origin?",
    shortAnswer: "Both intercepts are (0, 0).",
    explanation: "If a line passes through the origin, the x-intercept and y-intercept are both at the origin. The equation has no constant term.",
    hint: "Both intercepts at origin.",
    level: "intermediate",
    codeExample: "2x + 3y = 0 → x-intercept: (0,0), y-intercept: (0,0)"
  },
  {
    question: "What is the x-intercept if the line never crosses the x-axis?",
    shortAnswer: "There is no x-intercept (line is horizontal).",
    explanation: "A horizontal line y = k (where k ≠ 0) never crosses the x-axis, so it has no x-intercept.",
    hint: "Horizontal line has no x-intercept.",
    level: "intermediate",
    codeExample: "y = 3 → no x-intercept"
  },
  {
    question: "What is the y-intercept if the line never crosses the y-axis?",
    shortAnswer: "There is no y-intercept (line is vertical).",
    explanation: "A vertical line x = k (where k ≠ 0) never crosses the y-axis, so it has no y-intercept.",
    hint: "Vertical line has no y-intercept.",
    level: "intermediate",
    codeExample: "x = 4 → no y-intercept"
  },
  {
    question: "How do you find intercepts from an inequality?",
    shortAnswer: "Convert the inequality to equality first, then find intercepts.",
    explanation: "To graph an inequality, first find the intercepts of the corresponding equality (replace ≤ or ≥ with =). Then use the intercepts to draw the boundary line.",
    hint: "Convert to equality first.",
    level: "intermediate",
    codeExample: "2x + 3y ≤ 12 → 2x + 3y = 12 → (6,0) and (0,4)"
  },
  {
    question: "What is the intercept form of a line?",
    shortAnswer: "x/a + y/b = 1, where a is x-intercept and b is y-intercept.",
    explanation: "This form directly shows the intercepts. If a line has x-intercept (a,0) and y-intercept (0,b), it can be written as x/a + y/b = 1.",
    hint: "x/a + y/b = 1 form.",
    level: "advanced",
    codeExample: "x/6 + y/4 = 1 → x-intercept (6,0), y-intercept (0,4)"
  },
  {
    question: "How do you find intercepts when coefficients are fractions?",
    shortAnswer: "Multiply the equation by the LCM to clear fractions, then find intercepts.",
    explanation: "Fractions can make calculations messy. Clear fractions first by multiplying by the least common multiple of the denominators.",
    hint: "Clear fractions first.",
    level: "advanced",
    codeExample: "(1/2)x + (1/3)y = 1 → multiply by 6 → 3x + 2y = 6"
  },
  {
    question: "What does a negative intercept mean?",
    shortAnswer: "The line crosses the negative side of the axis.",
    explanation: "If the x-intercept is negative, the line crosses the x-axis on the negative side (left of origin). Similarly for negative y-intercept.",
    hint: "Line crosses negative axis.",
    level: "intermediate",
    codeExample: "x-intercept = (-2,0) → line crosses x-axis at -2"
  },
  {
    question: "How do you graph a line using intercepts?",
    shortAnswer: "Plot the x-intercept and y-intercept, then draw a line through them.",
    explanation: "Find both intercepts, plot them on the coordinate plane, and connect them with a straight line.",
    hint: "Plot intercepts, connect with line.",
    level: "basic",
    codeExample: "Plot (6,0) and (0,4), then draw line through them"
  },
  {
    question: "What is the slope-intercept form of a line?",
    shortAnswer: "y = mx + b, where m is slope and b is y-intercept.",
    explanation: "In slope-intercept form, the y-intercept is directly visible as the constant term b. The x-intercept can be found by setting y = 0 and solving for x.",
    hint: "y = mx + b form.",
    level: "intermediate",
    codeExample: "y = -2x + 4 → y-intercept: (0,4), x-intercept: (2,0)"
  },
  {
    question: "How do you find intercepts from slope-intercept form?",
    shortAnswer: "The y-intercept is b. For x-intercept, set y = 0 and solve for x.",
    explanation: "In y = mx + b, b is the y-intercept. To find x-intercept, substitute y = 0 and solve for x.",
    hint: "y-intercept = b, x-intercept = -b/m.",
    level: "intermediate",
    codeExample: "y = -2x + 4 → y-intercept: (0,4), x-intercept: (2,0)"
  },
  {
    question: "What is the relationship between intercepts and constraints in LP?",
    shortAnswer: "Intercepts help graph constraint boundaries in LP problems.",
    explanation: "In LP, each constraint is a linear inequality. Finding intercepts of the corresponding equality helps draw the constraint boundary line.",
    hint: "Intercepts graph constraint boundaries.",
    level: "intermediate",
    codeExample: "3x + 2y ≤ 120 → 3x + 2y = 120 → (40,0) and (0,60)"
  }
];

export default questions;