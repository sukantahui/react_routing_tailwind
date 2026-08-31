// topic15_questions.js
// 30 Moderate to Expert Questions on Conversion of Maximization Problems

const questions = [
  {
    question: "What is a Maximization Assignment Problem?",
    shortAnswer: "An assignment problem where the objective is to maximize total financial profit, sales revenue, customer ratings, or productivity: Max Z = Sum_{i=1}^n Sum_{j=1}^n p_ij x_ij subject to 1-to-1 matching constraints.",
    explanation: "Examples include sales reps assigned to territories to maximize revenue.",
    hint: "Max Z = Sum p_ij x_ij.",
    level: "moderate",
    codeExample: "Objective: Max Z = Sum_{i=1}^n Sum_{j=1}^n (p_ij * x_ij)."
  },
  {
    question: "Why CANNOT the Hungarian Method be applied directly to a profit matrix without conversion?",
    shortAnswer: "Because the Hungarian Method is inherently a MINIMIZATION solver; running it directly on a profit matrix would find the worst possible assignment that MINIMIZES profit!",
    explanation: "Matrix reductions minimize opportunity costs; without conversion, you minimize revenue.",
    hint: "Hungarian method natively minimizes, so direct execution finds the lowest profit.",
    level: "moderate",
    codeExample: "Fatal Error: Hungarian(ProfitMatrix) => MINIMUM Profit Schedule!"
  },
  {
    question: "What is the standard algebraic method to convert a Maximization Problem into a Minimization Problem?",
    shortAnswer: "Find the LARGEST element in the entire profit matrix (M_max = max(P)) and subtract every element from it: c_ij = M_max - p_ij.",
    explanation: "This creates a non-negative Relative Regret (Opportunity Loss) matrix.",
    hint: "c_ij = max(P) - p_ij.",
    level: "moderate",
    codeExample: "C_regret = max(P) - P; // Relative Regret Matrix"
  },
  {
    question: "What is the economic interpretation of the Regret Matrix C_regret = M_max - P?",
    shortAnswer: "Each entry c_ij represents the 'Opportunity Loss' or 'Regret' of choosing that pairing compared to the single most lucrative pairing in the enterprise; minimizing total regret is mathematically identical to maximizing total profit!",
    explanation: "Minimizing regret maximizes profit.",
    hint: "Represents opportunity loss compared to the maximum possible payoff.",
    level: "expert",
    codeExample: "Min(Total Regret) <===> Max(Total Profit)."
  },
  {
    question: "Suppose the profit matrix is P = [[32, 38, 40, 28], [40, 24, 28, 21], [41, 27, 33, 30], [22, 38, 41, 36]]. What is M_max?",
    shortAnswer: "M_max = 41 (the largest element in the entire matrix).",
    explanation: "max(all entries) = 41.",
    hint: "M_max = 41.",
    level: "moderate",
    codeExample: "M_max = Math.max(...P.flat()) = 41"
  },
  {
    question: "After subtracting every element from M_max = 41, what does Row 1 [32, 38, 40, 28] become in the Regret Matrix?",
    shortAnswer: "Row 1 becomes [41-32, 41-38, 41-40, 41-28] = [9, 3, 1, 13].",
    explanation: "[41-32, 41-38, 41-40, 41-28] = [9, 3, 1, 13].",
    hint: "[9, 3, 1, 13].",
    level: "moderate",
    codeExample: "row1_regret = [41-32, 41-38, 41-40, 41-28] = [9, 3, 1, 13]"
  },
  {
    question: "Once the Regret Matrix is solved using the standard 5-step Hungarian Method, how is the final MAXIMUM profit Z* calculated?",
    shortAnswer: "By retrieving the profit entries from the ORIGINAL PROFIT MATRIX for the boxed zero coordinates [0] and summing them in Indian Rupees (₹).",
    explanation: "Never sum from the regret matrix; always pull from the original profit matrix.",
    hint: "Sum original profit matrix entries for the assigned coordinates in ₹.",
    level: "intermediate",
    codeExample: "Z_max = Sum(p_orig[i][pi[i]]) in Indian Rupees (₹)."
  },
  {
    question: "Suppose in the 4x4 profit problem above, optimal assignments are (1➔3)=₹40, (2➔1)=₹40, (3➔4)=₹30, (4➔2)=₹38. What is the maximum total profit Z*?",
    shortAnswer: "₹148 ( ₹40 + ₹40 + ₹30 + ₹38 = ₹148 ).",
    explanation: "40 + 40 + 30 + 38 = ₹148.",
    hint: "40 + 40 + 30 + 38 = 148.",
    level: "moderate",
    codeExample: "Z_max = 40 + 40 + 30 + 38 = ₹148"
  },
  {
    question: "What is the alternative 'Negative Multiplication' conversion method (-P) and why is Regret (M_max - P) preferred?",
    shortAnswer: "Multiplying by -1 produces negative numbers (Min -P), but Hungarian reductions require non-negative numbers; M_max - P naturally guarantees all entries are non-negative (>= 0) immediately.",
    explanation: "M_max - P avoids negative matrix entries.",
    hint: "M_max - P guarantees all entries are >= 0 immediately.",
    level: "expert",
    codeExample: "M_max - P >= 0 vs -P <= 0."
  },
  {
    question: "What happens if an assignment problem is BOTH Maximization AND Unbalanced (e.g. 3 sales reps and 4 territories)?",
    shortAnswer: "Convert to Regret Matrix FIRST (c_ij = M_max - p_ij), and THEN augment the deficit dimension with a dummy row having ₹0 regret entries!",
    explanation: "Always convert to regret first before adding dummy lines.",
    hint: "Convert to regret matrix first, then add ₹0 dummy lines.",
    level: "expert",
    codeExample: "Sequence: P → C_regret = max(P)-P → AddDummyLine(cost=0) → SolveHungarian."
  },
  {
    question: "Suppose Susmita in Ichapur has a 4x4 profit matrix where all entries are multiplied by 2. Does the optimal assignment permutation change?",
    shortAnswer: "No! Multiplying the entire matrix by a positive constant scales all profits uniformly, leaving the optimal assignment combination 100% unchanged (total profit doubles).",
    explanation: "Uniform global scalar multiplication preserves relative rankings.",
    hint: "No, permutation is unchanged; total profit scales by 2.",
    level: "moderate",
    codeExample: "Scaling: argmax(2*P) === argmax(P)."
  },
  {
    question: "Suppose Debangshu in Barrackpore is maximizing sales revenue. In Step 5, he gets a minimum regret of Z_regret* = ₹16. If M_max was ₹41 and n = 4, what is the maximum profit Z_max*?",
    shortAnswer: "Z_max* = ₹148 ( n * M_max - Z_regret* = 4 * 41 - 16 = 164 - 16 = ₹148 ).",
    explanation: "Total Profit = n * M_max - Total Regret = 164 - 16 = ₹148.",
    hint: "4 * 41 - 16 = 148.",
    level: "expert",
    codeExample: "Z_max = n * M_max - Z_regret = 4 * 41 - 16 = ₹148"
  },
  {
    question: "How is a restricted cell (e.g. Sales Rep 1 cannot be assigned to Territory 3) handled in a Maximization Problem?",
    shortAnswer: "In the original profit matrix, set p_13 = -Infinity (or -M); in the regret matrix, it becomes M_max - (-M) = +M (Big-M penalty barrier).",
    explanation: "Negative infinity profit maps to positive infinity regret.",
    hint: "Set profit = -M; maps to +M in regret matrix.",
    level: "expert",
    codeExample: "p[1][3] = -Infinity => c_regret[1][3] = +Infinity (Big-M)."
  },
  {
    question: "Suppose Mamata in Kolkata maximizes exam scores across 4 students and 4 academic competitions. How does she report the final objective?",
    shortAnswer: "Report in Total Points / Score (e.g. Z* = 385 points), certifying the optimal student-competition matching.",
    explanation: "Profit matrices can optimize points, ratings, or rupees.",
    hint: "Total Score in points.",
    level: "intermediate",
    codeExample: "Report: 'Maximum Score Z* = 385 points'"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating revenue/profit in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Maximum Profit Z* = ₹148'"
  },
  {
    question: "What is the ultimate golden rule of Maximization Assignment Problems?",
    shortAnswer: "'Identify M_max = max(P); create regret matrix c_ij = M_max - p_ij; balance if needed; solve via 5-step Hungarian method; calculate maximum profit Z* using original rates from the profit matrix in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all logic for maximization assignment problems.",
    hint: "Find M_max → Regret c_ij = M_max - p_ij → Solve Hungarian → Sum original profits in ₹.",
    level: "moderate",
    codeExample: "Golden Rule: M_max = max(P) → C_regret = M_max - P → Solve → Z_max in ₹."
  }
];

export default questions;
