const questions = [
  {
    question: "What happens when you increase c₁ in a maximization problem?",
    shortAnswer: "Increasing c₁ makes x more profitable, rotating the objective line to be steeper.",
    explanation: "The objective function slope becomes more negative. If the new slope stays within the allowable range, the optimal solution remains the same. If it exceeds the range, a new corner point with more x becomes optimal.",
    hint: "Slope becomes more negative.",
    level: "intermediate",
    codeExample: "Original: Z = 3x + 2y, slope = -1.5\nNew: Z = 5x + 2y, slope = -2.5"
  },
  {
    question: "What happens when you decrease c₁ in a maximization problem?",
    shortAnswer: "Decreasing c₁ makes x less profitable, rotating the objective line to be flatter.",
    explanation: "The objective function slope becomes less negative. If the new slope stays within the allowable range, the optimal solution remains the same. If it exceeds the range, a new corner point with less x becomes optimal.",
    hint: "Slope becomes less negative.",
    level: "intermediate",
    codeExample: "Original: Z = 3x + 2y, slope = -1.5\nNew: Z = 1x + 2y, slope = -0.5"
  },
  {
    question: "What is the allowable range for objective coefficients?",
    shortAnswer: "The allowable range is the range of coefficient values where the current optimal solution remains optimal.",
    explanation: "This range is determined by the slopes of the binding constraints. The objective slope must stay between the constraint slopes for the optimal point to remain unchanged.",
    hint: "Range where optimal point stays the same.",
    level: "advanced",
    codeExample: "c₁ ∈ [2, 5] and c₂ ∈ [1.5, 4]\nWithin these ranges, optimal point unchanged"
  },
  {
    question: "How do you calculate the new objective slope when coefficients change?",
    shortAnswer: "The new slope is -c₁_new/c₂_new.",
    explanation: "The slope of the objective function Z = c₁x + c₂y is -c₁/c₂. When coefficients change, recalculate this ratio to determine the new slope.",
    hint: "Slope = -c₁/c₂.",
    level: "basic",
    codeExample: "c₁ = 4, c₂ = 2 → slope = -4/2 = -2"
  },
  {
    question: "What determines if a coefficient change affects the optimal solution?",
    shortAnswer: "A coefficient change affects the optimal solution if the new objective slope falls outside the range of binding constraint slopes.",
    explanation: "If the slope stays between the constraint slopes, the same corner point is optimal. If the slope exits this range, a different corner point becomes optimal.",
    hint: "Slope must stay between constraint slopes.",
    level: "advanced",
    codeExample: "Constraint slopes: -2 and -1\nObjective slope: -1.5 → Stay (same optimal)\nObjective slope: -2.5 → Change (new optimal)"
  },
  {
    question: "What happens when c₁ increases in a minimization problem?",
    shortAnswer: "In minimization, increasing c₁ makes the objective slope more negative, potentially changing the optimal solution.",
    explanation: "The same slope principles apply. The optimal solution changes when the slope exits the allowable range, but the direction of optimization is opposite.",
    hint: "Slope principles apply to minimization too.",
    level: "intermediate",
    codeExample: "Min Z = 4x + 3y\nc₁ increases to 6 → slope changes"
  },
  {
    question: "What is the relationship between coefficient changes and the objective line?",
    shortAnswer: "Coefficient changes rotate the objective line around the origin on the graph.",
    explanation: "Increasing c₁ makes the line steeper (rotates clockwise). Increasing c₂ makes the line flatter (rotates counterclockwise).",
    hint: "Rotation around the origin.",
    level: "intermediate",
    codeExample: "Z = 3x + 2y (slope -1.5)\nZ = 5x + 2y (slope -2.5) → Steeper"
  },
  {
    question: "Can changing one coefficient make the problem unbounded?",
    shortAnswer: "No, changing objective coefficients cannot make a bounded problem unbounded.",
    explanation: "Coefficient changes only affect the objective function, not the constraints. The feasible region remains the same, so boundedness status doesn't change.",
    hint: "Constraints determine boundedness.",
    level: "advanced",
    codeExample: "Feasible region bounded → Always bounded regardless of coefficients"
  },
  {
    question: "What is the 100% rule for objective coefficient changes?",
    shortAnswer: "The 100% rule states that if the sum of percentage changes of multiple coefficients is ≤ 100%, the optimal basis remains optimal.",
    explanation: "When changing multiple coefficients simultaneously, the optimal basis remains unchanged if the total percentage of allowable changes doesn't exceed 100%.",
    hint: "Multiple changes allowed if sum ≤ 100%.",
    level: "advanced",
    codeExample: "Δc₁/Allowable₁ + Δc₂/Allowable₂ ≤ 1\n→ Basis remains optimal"
  },
  {
    question: "How does changing c₂ affect the optimal solution?",
    shortAnswer: "Changing c₂ rotates the objective line; increasing c₂ makes it flatter, decreasing c₂ makes it steeper.",
    explanation: "c₂ is the coefficient of y in the objective function. Increasing c₂ makes y more valuable, potentially shifting production toward y.",
    hint: "c₂ affects value of y.",
    level: "intermediate",
    codeExample: "c₂ increases → y more profitable → More y production"
  },
  {
    question: "What is the economic interpretation of objective coefficient changes?",
    shortAnswer: "Objective coefficient changes represent changes in prices, costs, or profit margins of products.",
    explanation: "c₁ and c₂ represent the contribution to the objective per unit of x and y. Changes reflect market conditions, cost changes, or pricing decisions.",
    hint: "Price, cost, or profit changes.",
    level: "intermediate",
    codeExample: "c₁ increases → Product X price increased\nc₂ decreases → Product Y cost increased"
  },
  {
    question: "Can coefficient changes create multiple optimal solutions?",
    shortAnswer: "Yes, if the new objective slope equals the slope of a binding constraint.",
    explanation: "When the objective function becomes parallel to a constraint, multiple optimal solutions exist along that constraint edge.",
    hint: "Parallel to constraint = multiple optima.",
    level: "advanced",
    codeExample: "Objective slope = constraint slope\n→ Multiple optimal solutions"
  },
  {
    question: "How do you find the new optimal point when coefficients change?",
    shortAnswer: "Find which corner point gives the highest Z with the new coefficients by evaluating all corner points.",
    explanation: "After coefficient changes, evaluate Z at all corner points of the feasible region. The corner point with the highest value becomes the new optimal.",
    hint: "Evaluate Z at all corner points.",
    level: "advanced",
    codeExample: "Evaluate Z at each corner point\nChoose max (for maximization)"
  },
  {
    question: "What is the difference between c₁ and c₂ changes?",
    shortAnswer: "c₁ changes affect the value of x, c₂ changes affect the value of y. They rotate the objective line in different directions.",
    explanation: "Increasing c₁ makes x more valuable (line steeper). Increasing c₂ makes y more valuable (line flatter). The effects are symmetric but in opposite directions.",
    hint: "c₁ = x value, c₂ = y value.",
    level: "basic",
    codeExample: "c₁ ↑ → x more valuable\nc₂ ↑ → y more valuable"
  },
  {
    question: "How does coefficient sensitivity relate to shadow prices?",
    shortAnswer: "Both are part of sensitivity analysis. Coefficient sensitivity affects the objective slope, while shadow prices affect constraint RHS.",
    explanation: "Coefficient sensitivity analyzes changes in objective coefficients (prices). Shadow prices analyze changes in constraint RHS (resources). Both are important for decision-making.",
    hint: "Different aspects of sensitivity analysis.",
    level: "advanced",
    codeExample: "Coefficient: price sensitivity\nShadow: resource sensitivity"
  },
  {
    question: "What happens when both c₁ and c₂ increase proportionally?",
    shortAnswer: "When both coefficients increase by the same proportion, the slope remains unchanged.",
    explanation: "The slope is -c₁/c₂. If both increase by the same factor, the ratio stays the same. The optimal solution remains unchanged, but Z increases.",
    hint: "Same proportion = same slope.",
    level: "intermediate",
    codeExample: "c₁: 3→6, c₂: 2→4\nSlope: -3/2 = -1.5, -6/4 = -1.5 (unchanged)"
  },
  {
    question: "Can coefficient changes affect feasibility?",
    shortAnswer: "No, coefficient changes only affect the objective function, not the constraints.",
    explanation: "Feasibility is determined by constraints. Changing objective coefficients doesn't change which points are feasible, only which feasible point is optimal.",
    hint: "Feasibility from constraints only.",
    level: "basic",
    codeExample: "Constraints unchanged → Feasible region same"
  },
  {
    question: "What is the practical significance of allowable ranges?",
    shortAnswer: "Allowable ranges tell managers how much prices or costs can change before the optimal product mix changes.",
    explanation: "If a product's price is within the allowable range, the current production plan remains optimal. Outside this range, the plan should be re-evaluated.",
    hint: "Price stability range.",
    level: "intermediate",
    codeExample: "c₁ ∈ [4, 8] → Price can vary without changing product mix"
  },
  {
    question: "How do you determine if a coefficient change is profitable?",
    shortAnswer: "Calculate the new Z value with the changed coefficients and compare to the original Z.",
    explanation: "If the new coefficients increase the objective value at the optimal point, it's profitable. If they decrease it, it's not.",
    hint: "Compare new Z to original Z.",
    level: "intermediate",
    codeExample: "Original Z = 26, New Z = 38 → Profitable change"
  },
  {
    question: "What is the relationship between objective coefficients and constraint slopes?",
    shortAnswer: "The optimal solution is determined by comparing the objective slope with the constraint slopes.",
    explanation: "The objective slope must stay between the slopes of the binding constraints for the current optimal point to remain optimal. This determines the allowable range.",
    hint: "Slope comparison determines optimality.",
    level: "advanced",
    codeExample: "Constraint slopes: -2 and -1\nObjective slope must be between -2 and -1 for optimality"
  }
];

export default questions;