const questions = [
  {
    question: "What is the objective function in the minimization example?",
    shortAnswer: "Minimize C = 2x + 3y.",
    explanation: "Product A costs ₹2 per unit, Product B costs ₹3 per unit.",
    hint: "C = 2x + 3y.",
    level: "basic",
    codeExample: "C = 2x + 3y"
  },
  {
    question: "What are the constraints in the minimization example?",
    shortAnswer: "x+y≥24, 3x+2y≤60, x≥12.",
    explanation: "Minimum total production, raw material, minimum Product A.",
    hint: "Total, material, minimum.",
    level: "basic",
    codeExample: "x+y≥24, 3x+2y≤60, x≥12."
  },
  {
    question: "What is the optimal solution?",
    shortAnswer: "x = 12, y = 12, C = 60.",
    explanation: "Produce 12 units of Product A and 12 units of Product B.",
    hint: "Optimal at (12,12).",
    level: "intermediate",
    codeExample: "(12,12) with C=60."
  },
  {
    question: "What is the total production at the optimal solution?",
    shortAnswer: "24 units.",
    explanation: "12 + 12 = 24 units.",
    hint: "24 units.",
    level: "basic",
    codeExample: "12+12=24."
  },
  {
    question: "What is the raw material used at the optimal solution?",
    shortAnswer: "60 units, fully used.",
    explanation: "3(12) + 2(12) = 36 + 24 = 60 units.",
    hint: "60 units used.",
    level: "intermediate",
    codeExample: "3(12)+2(12)=60."
  },
  {
    question: "What is the cost at (12,12)?",
    shortAnswer: "60.",
    explanation: "2(12) + 3(12) = 24 + 36 = 60.",
    hint: "C = 60.",
    level: "basic",
    codeExample: "(12,12) gives C=60."
  },
  {
    question: "What is the cost at (12,6)?",
    shortAnswer: "42.",
    explanation: "2(12) + 3(6) = 24 + 18 = 42.",
    hint: "C = 42.",
    level: "basic",
    codeExample: "(12,6) gives C=42."
  },
  {
    question: "Why isn't (12,6) feasible?",
    shortAnswer: "It violates the minimum total production (12+6=18<24).",
    explanation: "Total production must be at least 24 units.",
    hint: "Total < 24.",
    level: "intermediate",
    codeExample: "12+6=18 < 24."
  },
  {
    question: "What is the cost at (16,6)?",
    shortAnswer: "50.",
    explanation: "2(16) + 3(6) = 32 + 18 = 50.",
    hint: "C = 50.",
    level: "basic",
    codeExample: "(16,6) gives C=50."
  },
  {
    question: "Why isn't (16,6) feasible?",
    shortAnswer: "It violates the raw material constraint (3(16)+2(6)=48+12=60 ≤ 60? Actually 60 ≤ 60 is okay, so it is feasible. Check total: 16+6=22 < 24 — violates minimum total.",
    explanation: "Total production must be at least 24 units.",
    hint: "Total < 24.",
    level: "intermediate",
    codeExample: "16+6=22 < 24."
  },
  {
    question: "What is the cost at (20,0)?",
    shortAnswer: "40.",
    explanation: "2(20) + 3(0) = 40.",
    hint: "C = 40.",
    level: "basic",
    codeExample: "(20,0) gives C=40."
  },
  {
    question: "Why isn't (20,0) feasible?",
    shortAnswer: "It violates the minimum total production (20<24) and x≥12 is satisfied but total fails.",
    explanation: "Total production must be at least 24 units.",
    hint: "Total < 24.",
    level: "intermediate",
    codeExample: "20 < 24."
  },
  {
    question: "What is the cost per unit of Product A?",
    shortAnswer: "₹2.",
    explanation: "Product A costs ₹2 per unit.",
    hint: "₹2.",
    level: "basic",
    codeExample: "Cost of A = ₹2."
  },
  {
    question: "What is the cost per unit of Product B?",
    shortAnswer: "₹3.",
    explanation: "Product B costs ₹3 per unit.",
    hint: "₹3.",
    level: "basic",
    codeExample: "Cost of B = ₹3."
  },
  {
    question: "What is the raw material per unit of Product A?",
    shortAnswer: "3 units.",
    explanation: "Product A requires 3 units of raw material per unit.",
    hint: "3 units.",
    level: "basic",
    codeExample: "A: 3 raw material."
  },
  {
    question: "What is the raw material per unit of Product B?",
    shortAnswer: "2 units.",
    explanation: "Product B requires 2 units of raw material per unit.",
    hint: "2 units.",
    level: "basic",
    codeExample: "B: 2 raw material."
  },
  {
    question: "What is the minimum total production?",
    shortAnswer: "24 units.",
    explanation: "The company must produce at least 24 units total.",
    hint: "24 units.",
    level: "basic",
    codeExample: "x + y ≥ 24."
  },
  {
    question: "What is the minimum Product A requirement?",
    shortAnswer: "12 units.",
    explanation: "The company must produce at least 12 units of Product A.",
    hint: "x ≥ 12.",
    level: "basic",
    codeExample: "x ≥ 12."
  },
  {
    question: "What is the raw material available?",
    shortAnswer: "60 units.",
    explanation: "The company has 60 units of raw material available.",
    hint: "60 units.",
    level: "basic",
    codeExample: "3x+2y ≤ 60."
  },
  {
    question: "Which product is cheaper?",
    shortAnswer: "Product A (₹2 vs ₹3 for Product B).",
    explanation: "Product A is cheaper per unit.",
    hint: "A is cheaper.",
    level: "basic",
    codeExample: "A: ₹2, B: ₹3."
  },
  {
    question: "Which product uses more raw material?",
    shortAnswer: "Product A (3 vs 2 for Product B).",
    explanation: "Product A uses more raw material per unit.",
    hint: "A uses more material.",
    level: "basic",
    codeExample: "A: 3, B: 2."
  },
  {
    question: "What is the trade-off between products?",
    shortAnswer: "Product A is cheaper but uses more raw material.",
    explanation: "A: ₹2 cost, 3 material; B: ₹3 cost, 2 material.",
    hint: "Cost vs material.",
    level: "intermediate",
    codeExample: "A: cheap, high material; B: expensive, low material."
  },
  {
    question: "What happens if the raw material increases to 70 units?",
    shortAnswer: "The optimal solution would likely change, producing more A.",
    explanation: "With more raw material, the company could produce more of the cheaper Product A.",
    hint: "More material → more A.",
    level: "intermediate",
    codeExample: "If material = 70, new optimum may be different."
  },
  {
    question: "What happens if the minimum total production increases to 30 units?",
    shortAnswer: "The optimal solution would change, producing more of both products.",
    explanation: "Higher minimum total requires more production.",
    hint: "More production needed.",
    level: "intermediate",
    codeExample: "If total ≥ 30, new optimum may be different."
  },
  {
    question: "What is the minimum cost?",
    shortAnswer: "60.",
    explanation: "The minimum cost is 60 at (12,12).",
    hint: "C = 60.",
    level: "basic",
    codeExample: "Min Cost = 60."
  },
  {
    question: "Are all constraints binding at the optimal solution?",
    shortAnswer: "Yes, all three constraints are binding.",
    explanation: "At (12,12): total=24, material=60, x=12.",
    hint: "All are binding.",
    level: "intermediate",
    codeExample: "Total=24, Material=60, x=12."
  },
  {
    question: "What is the most important lesson from this example?",
    shortAnswer: "In minimization, all constraints often bind at the optimum.",
    explanation: "The optimal solution is where all minimum requirements and resource constraints meet.",
    hint: "All constraints bind.",
    level: "basic",
    codeExample: "All constraints are satisfied as equalities."
  },
  {
    question: "What is the raw material constraint at the optimal solution?",
    shortAnswer: "3(12) + 2(12) = 60, fully used.",
    explanation: "All raw material is used at (12,12).",
    hint: "60 units.",
    level: "intermediate",
    codeExample: "3(12)+2(12)=60."
  },
  {
    question: "What is the total production constraint at the optimal solution?",
    shortAnswer: "12 + 12 = 24, exactly met.",
    explanation: "The minimum total production is exactly met.",
    hint: "24 units.",
    level: "intermediate",
    codeExample: "12+12=24."
  },
  {
    question: "What is the minimum Product A constraint at the optimal solution?",
    shortAnswer: "x = 12, exactly met.",
    explanation: "The minimum Product A requirement is exactly met.",
    hint: "x=12.",
    level: "intermediate",
    codeExample: "x=12 ≥ 12."
  },
  {
    question: "What is the objective line direction for minimization?",
    shortAnswer: "Move the objective line inward (toward origin).",
    explanation: "For minimization, lower C values are better, so move the line toward the origin.",
    hint: "Move inward.",
    level: "basic",
    codeExample: "Decrease C from 70 to 60."
  }
];

export default questions;