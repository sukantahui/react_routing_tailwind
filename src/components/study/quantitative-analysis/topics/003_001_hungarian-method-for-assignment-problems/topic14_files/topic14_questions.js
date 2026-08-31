// topic14_questions.js
// 30 Moderate to Expert Questions on Minimization Problems in Assignment Models

const questions = [
  {
    question: "What is the standard objective in an Assignment Minimization Problem?",
    shortAnswer: "To minimize the total quantifiable penalty, cost, time, or distance across all 1-to-1 pairings: Min Z = Sum_{i=1}^n Sum_{j=1}^n c_ij x_ij subject to 1-to-1 matching constraints.",
    explanation: "Minimization is the native form directly solved by the Hungarian Method.",
    hint: "Min Z = Sum c_ij x_ij.",
    level: "moderate",
    codeExample: "Objective: Min Z = Sum_{i=1}^n Sum_{j=1}^n (c_ij * x_ij)."
  },
  {
    question: "What are the 5 major operational metrics optimized in industrial minimization problems?",
    shortAnswer: "1. Monetary Cost (₹); 2. Labor or Machining Time (hours/mins); 3. Travel Distance (km); 4. Defect/Rejection Counts; 5. Energy Consumption / Carbon Emissions (kWh/kg CO2).",
    explanation: "Any performance penalty metric can be structured as a minimization cost matrix.",
    hint: "Money, time, distance, defects, and energy/emissions.",
    level: "intermediate",
    codeExample: "Metrics: { INR_Cost: '₹', Time: 'Hours', Distance: 'Km', Defects: 'Units', Energy: 'kWh' }."
  },
  {
    question: "Why is the Hungarian Method considered a 'Native Minimization Solver'?",
    shortAnswer: "Because subtracting row and column minimums naturally identifies lowest-cost baselines and establishes non-negative opportunity penalties (c_ij - u_i - v_j >= 0) without requiring algebraic inversion.",
    explanation: "Hungarian reductions are fundamentally designed around minimization.",
    hint: "Directly minimizes costs without needing sign inversions.",
    level: "moderate",
    codeExample: "NativeSolver: Hungarian operates directly on minimization cost matrices."
  },
  {
    question: "Suppose Debangshu in Barrackpore is minimizing furnace machining time (in minutes) across 4 workers and 4 jobs. What unit must he attach to his final objective Z*?",
    shortAnswer: "Total Machining Minutes (e.g. Z* = 46 minutes), which can then be converted to labor hours or hourly wage cost in Indian Rupees (₹).",
    explanation: "Cost entries represent the unit of measurement of the input matrix.",
    hint: "Minutes (or converted to labor hours/₹).",
    level: "moderate",
    codeExample: "Z_opt = 46 minutes (Total Machining Duration)."
  },
  {
    question: "Suppose Susmita in Ichapur has a 4x4 courier delivery distance matrix in kilometers: C = [[12, 10, 15, 22], [14, 20, 18, 12], [16, 11, 13, 14], [10, 14, 16, 15]]. What does the optimal assignment minimize?",
    shortAnswer: "Total fleet travel distance in kilometers (km), directly reducing fuel consumption, vehicle wear, and carbon emissions.",
    explanation: "Distance minimization optimizes fleet fuel efficiency.",
    hint: "Minimizes total fleet travel distance in kilometers.",
    level: "moderate",
    codeExample: "Z_opt = Sum(km) => Fuel and vehicle wear minimized."
  },
  {
    question: "Suppose Mamata in Kolkata wants to minimize medical error counts across 3 hospital surgical teams and 3 critical wards. How is the cost matrix populated?",
    shortAnswer: "Entry c_ij represents historical error or complication rates when surgical team i operates in ward j.",
    explanation: "Quality optimization models defect/error rates as cost entries.",
    hint: "Populated with historical complication or error counts.",
    level: "intermediate",
    codeExample: "c_ij = HistoricalComplicationRate(Team_i, Ward_j)."
  },
  {
    question: "In a minimization problem, what does a reduced cost entry of c_reduced[i, j] = 0 indicate?",
    shortAnswer: "It indicates that assigning worker i to task j incurs ZERO marginal penalty above the baseline best performance (an optimal pairing candidate).",
    explanation: "Zero reduced cost represents maximum relative economic efficiency.",
    hint: "Zero marginal penalty above baseline efficiency.",
    level: "moderate",
    codeExample: "c_reduced[i][j] === 0 => Optimal Candidate."
  },
  {
    question: "In a minimization problem, what does a reduced cost entry of c_reduced[i, j] = ₹8 indicate?",
    shortAnswer: "It indicates that assigning worker i to task j would cost ₹8 MORE than the optimal baseline assignment for that worker and task.",
    explanation: "Positive reduced costs represent economic opportunity penalties.",
    hint: "Costs ₹8 more than the baseline optimal choice.",
    level: "moderate",
    codeExample: "Opportunity Penalty = ₹8 above baseline."
  },
  {
    question: "How does the Hungarian Method handle multi-criteria minimization (e.g. combining cost in ₹ and time in hours)?",
    shortAnswer: "By converting all metrics into a standardized composite weighted cost index: c_ij = w1 * Cost_ij + w2 * (HourlyRate * Time_ij).",
    explanation: "Weighting parameters create a unified single-criterion objective.",
    hint: "Combine into a weighted composite cost index.",
    level: "expert",
    codeExample: "c_ij = (w_cost * INR_ij) + (w_time * Time_ij * RatePerHour)."
  },
  {
    question: "Suppose Mahima in Barrackpore solves a 4x4 minimization problem where optimal pairings have costs [₹10, ₹12, ₹14, ₹11]. What is the certified minimal cost Z*?",
    shortAnswer: "₹47 ( 10 + 12 + 14 + 11 = ₹47 ).",
    explanation: "10 + 12 + 14 + 11 = ₹47.",
    hint: "10 + 12 + 14 + 11 = 47.",
    level: "moderate",
    codeExample: "Z_opt = 10 + 12 + 14 + 11 = ₹47"
  },
  {
    question: "Suppose Abhronila in Jadavpur has an unbalanced 3x4 minimization problem. What cost must be assigned to the dummy row?",
    shortAnswer: "Exactly ₹0 across all entries in the dummy row.",
    explanation: "Zero cost ensures dummy assignments incur zero physical expense.",
    hint: "Exactly ₹0.",
    level: "moderate",
    codeExample: "DummyCost = ₹0."
  },
  {
    question: "What happens if a student accidentally tries to maximize a matrix using standard minimization Hungarian steps without converting it first?",
    shortAnswer: "The Hungarian Method will find the absolute WORST (lowest profit / highest cost) schedule instead of the best schedule.",
    explanation: "Hungarian reductions minimize by default.",
    hint: "Finds the worst assignment instead of the best.",
    level: "intermediate",
    codeExample: "Fatal Error: Running Hungarian on Profit matrix gives Minimum Profit!"
  },
  {
    question: "What is the relationship between the Hungarian Method and Dijkstra's Shortest Path algorithm?",
    shortAnswer: "Both are primal-dual algorithms that iteratively update node/potential labels to find minimum-cost paths/matchings on weighted graphs without negative cycles.",
    explanation: "Both algorithms leverage dual potential feasibility to achieve polynomial time complexity.",
    hint: "Both use dual node potentials to find minimum-cost configurations.",
    level: "expert",
    codeExample: "Graph Relationship: Hungarian finds Min-Cost Matching; Dijkstra finds Min-Cost Path."
  },
  {
    question: "Suppose Susmita in Ichapur has a 4x4 minimization problem with 2 alternative optimal solutions. Solution A costs ₹46 and Solution B costs ₹46. Are both solutions valid?",
    shortAnswer: "Yes! Both solutions are 100% mathematically optimal and valid.",
    explanation: "Multiple optima share identical minimal cost.",
    hint: "Yes, both achieve the identical minimal cost of ₹46.",
    level: "moderate",
    codeExample: "Z(Sol_A) === Z(Sol_B) === ₹46."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating assignment costs for West Bengal enterprises?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Minimum Cost Z* = ₹47'"
  },
  {
    question: "What is the ultimate golden rule of Minimization Problems in Operations Research?",
    shortAnswer: "'Define quantifiable penalty matrix (₹, hours, km, defects); verify balance (m = n); execute standard 5-step Hungarian reductions; certified minimum cost Z* equals sum of original rates for assigned pairings!'",
    explanation: "This complete rule captures all handling of minimization assignment problems.",
    hint: "Define penalty matrix → Verify balance → Solve Hungarian → Sum original rates in ₹.",
    level: "moderate",
    codeExample: "Golden Rule: DefinePenaltyMatrix → Balance → SolveHungarian → SumOrigRates(₹)."
  }
];

export default questions;
