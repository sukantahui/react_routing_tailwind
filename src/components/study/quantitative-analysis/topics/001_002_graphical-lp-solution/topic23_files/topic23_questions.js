const questions = [
  {
    question: "What is the slope of the objective function?",
    shortAnswer: "The slope is -a/b for Z = ax + by.",
    explanation: "The slope determines the direction in which the objective function increases or decreases.",
    hint: "Slope = -a/b.",
    level: "basic",
    codeExample: "For Z=3x+4y, slope = -3/4 = -0.75."
  },
  {
    question: "How do you calculate the slope of the objective function?",
    shortAnswer: "Use the formula m = -a/b where a and b are coefficients of x and y.",
    explanation: "Rewrite Z = ax + by as by = -ax + Z, so slope = -a/b.",
    hint: "m = -a/b.",
    level: "basic",
    codeExample: "For Z=2x+3y, m = -2/3 ≈ -0.67."
  },
  {
    question: "What does the slope of the objective function tell us?",
    shortAnswer: "It tells us the trade-off between x and y in the objective.",
    explanation: "The slope shows how much y must change when x changes to keep Z constant.",
    hint: "Trade-off between variables.",
    level: "intermediate",
    codeExample: "Slope = -2/3 means for every 3 units of x, y changes by -2 units."
  },
  {
    question: "What if the slope is steeper than -1 (m < -1)?",
    shortAnswer: "The objective function favors x over y.",
    explanation: "A steeper slope means x is more valuable than y in the objective.",
    hint: "Favors x.",
    level: "intermediate",
    codeExample: "Z=4x+3y has slope -1.33, so x is more valuable."
  },
  {
    question: "What if the slope is flatter than -1 (m > -1)?",
    shortAnswer: "The objective function favors y over x.",
    explanation: "A flatter slope means y is more valuable than x in the objective.",
    hint: "Favors y.",
    level: "intermediate",
    codeExample: "Z=2x+4y has slope -0.5, so y is more valuable."
  },
  {
    question: "What if the slope is exactly -1?",
    shortAnswer: "The objective function treats x and y equally.",
    explanation: "A slope of -1 means x and y have equal weight in the objective.",
    hint: "Equal weights.",
    level: "intermediate",
    codeExample: "Z=x+y has slope -1."
  },
  {
    question: "How does the slope affect the optimal solution?",
    shortAnswer: "Different slopes lead to different optimal corner points.",
    explanation: "The slope determines which corner point maximizes or minimizes the objective.",
    hint: "Slope determines the optimum.",
    level: "intermediate",
    codeExample: "Steep slope favors x-axis corners; flat slope favors y-axis corners."
  },
  {
    question: "What is the relationship between the objective slope and constraint slopes?",
    shortAnswer: "The optimal point changes when the objective slope crosses a constraint slope.",
    explanation: "If the objective slope is between two constraint slopes, the optimal point is at their intersection.",
    hint: "Compares with constraint slopes.",
    level: "expert",
    codeExample: "If m_obj is between m1 and m2, the optimum is at their intersection."
  },
  {
    question: "Can the slope of the objective function be positive?",
    shortAnswer: "Yes, if a or b is negative, the slope can be positive.",
    explanation: "If a and b have opposite signs, the slope is positive.",
    hint: "Positive slope possible.",
    level: "expert",
    codeExample: "Z=3x-2y has slope = -3/(-2) = 1.5."
  },
  {
    question: "What is the slope of Z = x + 2y?",
    shortAnswer: "-1/2 or -0.5.",
    explanation: "Using m = -a/b, a=1, b=2, so m = -1/2 = -0.5.",
    hint: "m = -1/2.",
    level: "basic",
    codeExample: "Z=x+2y → slope = -0.5."
  },
  {
    question: "What is the slope of Z = 3x + 5y?",
    shortAnswer: "-3/5 or -0.6.",
    explanation: "Using m = -a/b, a=3, b=5, so m = -3/5 = -0.6.",
    hint: "m = -3/5.",
    level: "basic",
    codeExample: "Z=3x+5y → slope = -0.6."
  },
  {
    question: "What is the slope of Z = 5x + 3y?",
    shortAnswer: "-5/3 or -1.67.",
    explanation: "Using m = -a/b, a=5, b=3, so m = -5/3 = -1.67.",
    hint: "m = -5/3.",
    level: "basic",
    codeExample: "Z=5x+3y → slope = -1.67."
  },
  {
    question: "What is the slope of Z = x - 2y?",
    shortAnswer: "-1/(-2) = 0.5.",
    explanation: "Using m = -a/b, a=1, b=-2, so m = -1/(-2) = 0.5.",
    hint: "m = 0.5.",
    level: "expert",
    codeExample: "Z=x-2y → slope = 0.5."
  },
  {
    question: "What is the slope of Z = -2x + 3y?",
    shortAnswer: "-(-2)/3 = 2/3.",
    explanation: "Using m = -a/b, a=-2, b=3, so m = -(-2)/3 = 2/3.",
    hint: "m = 2/3.",
    level: "expert",
    codeExample: "Z=-2x+3y → slope = 2/3."
  },
  {
    question: "Why is the slope of the objective function important?",
    shortAnswer: "It determines which corner point is optimal.",
    explanation: "The slope tells us the direction of improvement and which variable is more valuable.",
    hint: "Determines the optimum.",
    level: "intermediate",
    codeExample: "Different slopes lead to different optimal solutions."
  },
  {
    question: "How do you know if the objective slope favors x?",
    shortAnswer: "The slope is steeper than -1 (m < -1).",
    explanation: "A steeper slope means x is more valuable than y.",
    hint: "m < -1.",
    level: "intermediate",
    codeExample: "Z=4x+3y (m=-1.33) favors x."
  },
  {
    question: "How do you know if the objective slope favors y?",
    shortAnswer: "The slope is flatter than -1 (m > -1).",
    explanation: "A flatter slope means y is more valuable than x.",
    hint: "m > -1.",
    level: "intermediate",
    codeExample: "Z=2x+4y (m=-0.5) favors y."
  },
  {
    question: "What if the objective slope equals a constraint slope?",
    shortAnswer: "There may be multiple optimal solutions.",
    explanation: "If the objective slope equals a constraint slope, the objective line is parallel to that constraint edge.",
    hint: "Multiple optima possible.",
    level: "expert",
    codeExample: "Z=x+y and x+y=10 → both have slope -1."
  },
  {
    question: "How does the slope change when coefficients change?",
    shortAnswer: "The slope changes as a/b changes.",
    explanation: "Increasing a makes the slope steeper (more negative). Increasing b makes it flatter (less negative).",
    hint: "Slope depends on ratio a/b.",
    level: "intermediate",
    codeExample: "Z=3x+4y (m=-0.75) vs Z=4x+3y (m=-1.33)."
  },
  {
    question: "What is the slope of a vertical objective function?",
    shortAnswer: "Undefined (when b=0).",
    explanation: "If b=0, Z=ax, the objective function is vertical.",
    hint: "Vertical when b=0.",
    level: "expert",
    codeExample: "Z=3x → vertical lines."
  },
  {
    question: "What is the slope of a horizontal objective function?",
    shortAnswer: "0 (when a=0).",
    explanation: "If a=0, Z=by, the objective function is horizontal.",
    hint: "Horizontal when a=0.",
    level: "expert",
    codeExample: "Z=4y → horizontal lines."
  },
  {
    question: "How do you compare the objective slope to constraint slopes?",
    shortAnswer: "Compare m_obj to m_constraint to find the optimal corner.",
    explanation: "The optimal corner is where the objective slope crosses the feasible region boundary.",
    hint: "Compare slopes.",
    level: "expert",
    codeExample: "If m_obj is between two constraint slopes, the optimum is at their intersection."
  },
  {
    question: "What is the most common mistake with objective slopes?",
    shortAnswer: "Forgetting the negative sign in the slope formula.",
    explanation: "Students often forget that m = -a/b, not a/b.",
    hint: "Don't forget the negative.",
    level: "basic",
    codeExample: "Z=3x+4y → m = -3/4, not 3/4."
  },
  {
    question: "How does the slope affect the direction of improvement?",
    shortAnswer: "The slope shows the direction to move for higher Z.",
    explanation: "For maximization, move in the direction perpendicular to the objective lines.",
    hint: "Shows improvement direction.",
    level: "intermediate",
    codeExample: "Steeper slope means moving right increases Z more."
  },
  {
    question: "What is the slope of Z = 2x + 2y?",
    shortAnswer: "-1.",
    explanation: "Using m = -a/b, a=2, b=2, so m = -2/2 = -1.",
    hint: "m = -1.",
    level: "basic",
    codeExample: "Z=2x+2y → slope = -1."
  },
  {
    question: "Why do we care about the slope of the objective function?",
    shortAnswer: "It helps predict the optimal solution and understand the trade-off.",
    explanation: "The slope gives insight into which variable is more important and how the objective changes.",
    hint: "Predicts the optimum.",
    level: "intermediate",
    codeExample: "Use slope to understand the trade-off between variables."
  },
  {
    question: "Can changing the objective slope create multiple optima?",
    shortAnswer: "Yes, if the slope matches a constraint edge.",
    explanation: "When the objective slope equals a constraint slope, multiple points on that edge are optimal.",
    hint: "Matches constraint slope.",
    level: "expert",
    codeExample: "Z=x+y and x+y=10 → multiple optima."
  },
  {
    question: "What is the relationship between slope and shadow prices?",
    shortAnswer: "The slope helps determine shadow prices in sensitivity analysis.",
    explanation: "Changes in the objective slope correspond to changes in shadow prices.",
    hint: "Related to sensitivity.",
    level: "expert",
    codeExample: "Changing a or b changes the slope and shadow prices."
  }
];

export default questions;