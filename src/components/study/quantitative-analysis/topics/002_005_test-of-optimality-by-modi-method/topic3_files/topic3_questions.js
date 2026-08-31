// topic3_questions.js
// 30 Moderate to Expert Questions on Calculating Opportunity Costs (Net Evaluation Index d_ij)

const questions = [
  {
    question: "What is the exact mathematical definition of the Opportunity Cost (Net Evaluation Index) d_ij for an unoccupied non-basic cell (i, j)?",
    shortAnswer: "d_ij = c_ij - (u_i + v_j), where c_ij is the actual unit shipping cost, and (u_i + v_j) is the implied dual shadow cost.",
    explanation: "d_ij measures the marginal change in total objective cost Z per unit of cargo allocated to that empty cell. It equals the difference between the direct rate and the implied network potential.",
    hint: "d_ij = direct cost minus sum of row and column potentials.",
    level: "moderate",
    codeExample: "d_ij = c_ij - (u_i + v_j)"
  },
  {
    question: "What does a negative opportunity cost (d_ij < 0) signify for a transportation network?",
    shortAnswer: "It signifies that the route is cheaper than the current network path, meaning activating this route will DECREASE the total transportation cost by |d_ij| Rupees per unit transferred.",
    explanation: "If d_ij = -₹4, transferring 10 tons of cargo into cell (i, j) will reduce the enterprise's total freight bill by 10 * ₹4 = ₹40.",
    hint: "Total freight cost decreases by |d_ij| per unit.",
    level: "moderate",
    codeExample: "d_ij < 0 => Delta Z = theta * d_ij < 0 (Cost Improvement)"
  },
  {
    question: "What does a positive opportunity cost (d_ij > 0) signify?",
    shortAnswer: "It signifies that the route is more expensive than the current network path, meaning shipping along this route would INCREASE total cost by d_ij Rupees per unit.",
    explanation: "Routes with d_ij > 0 are economically uncompetitive in the current basis and should remain unallocated (empty).",
    hint: "Shipping here increases total freight expenditure.",
    level: "moderate",
    codeExample: "d_ij > 0 => Activating route increases cost; keep empty."
  },
  {
    question: "What does an opportunity cost of zero (d_ij = 0) signify?",
    shortAnswer: "It signifies that shifting cargo into that empty cell will leave the total transportation cost COMPLETELY UNCHANGED, proving the existence of an alternative optimal basic feasible solution.",
    explanation: "When d_ij = 0, the direct cost exactly matches the implied network shadow cost, providing managerial flexibility without financial penalty.",
    hint: "Total cost is unaffected; alternative optimal plan exists.",
    level: "expert",
    codeExample: "d_ij === 0 => Multiple Optimal Solutions with identical Z."
  },
  {
    question: "How many opportunity costs d_ij must be evaluated in an m x n transportation tableau?",
    shortAnswer: "Exactly (m * n) - (m + n - 1) = (m - 1)(n - 1) opportunity costs, corresponding to all non-basic (empty) cells.",
    explanation: "In a 3x3 tableau, there are (3-1)(3-1) = 2 * 2 = 4 empty cells to evaluate. In a 3x4 tableau, there are 2 * 3 = 6 empty cells.",
    hint: "(m - 1) * (n - 1) non-basic cells.",
    level: "moderate",
    codeExample: "NonBasicCount = (m - 1) * (n - 1)"
  },
  {
    question: "Suppose Debangshu in Barrackpore evaluates cell (1, 3) where c_13 = ₹12. If u_1 = 0 and v_3 = 5, what is d_13?",
    shortAnswer: "d_13 = +₹7 ( 12 - (0 + 5) = 12 - 5 = +₹7 ).",
    explanation: "d_13 = c_13 - (u_1 + v_3) = 12 - (0 + 5) = +₹7. Since d_13 > 0, cell (1, 3) remains empty.",
    hint: "12 - 5 = 7.",
    level: "moderate",
    codeExample: "d_13 = 12 - (0 + 5) = +7"
  },
  {
    question: "Suppose Susmita in Ichapur evaluates cell (2, 1) where c_21 = ₹5. If u_2 = 5 and v_1 = 8, what is d_21?",
    shortAnswer: "d_21 = -₹8 ( 5 - (5 + 8) = 5 - 13 = -₹8 ).",
    explanation: "d_21 = c_21 - (u_2 + v_1) = 5 - (5 + 8) = 5 - 13 = -₹8. This is a severe negative evaluation, indicating high cost reduction potential.",
    hint: "5 - 13 = -8.",
    level: "moderate",
    codeExample: "d_21 = 5 - (5 + 8) = -8"
  },
  {
    question: "Suppose Mamata in Kolkata evaluates cell (3, 2) where c_32 = ₹13. If u_3 = 2 and v_2 = 14, what is d_32?",
    shortAnswer: "d_32 = -₹3 ( 13 - (2 + 14) = 13 - 16 = -₹3 ).",
    explanation: "d_32 = c_32 - (u_3 + v_2) = 13 - 16 = -₹3. Cell (3, 2) is another candidate to reduce cost.",
    hint: "13 - 16 = -3.",
    level: "moderate",
    codeExample: "d_32 = 13 - (2 + 14) = -3"
  },
  {
    question: "Comparing d_21 = -₹8 and d_32 = -₹3 from above, which cell is selected as the Entering Variable?",
    shortAnswer: "Cell (2, 1) because it has the MOST NEGATIVE opportunity cost (d_21 = -₹8).",
    explanation: "Dantzig's rule chooses the entering variable with min(d_ij) among all negative evaluations to achieve the steepest marginal cost decrease.",
    hint: "-8 is more negative than -3.",
    level: "moderate",
    codeExample: "Entering Cell = argmin { -8, -3 } = (2, 1)"
  },
  {
    question: "What is the opportunity cost d_ij for an occupied BASIC cell?",
    shortAnswer: "d_ij = 0 for all basic cells, because basic cells define the potentials through u_i + v_j = c_ij, making c_ij - (u_i + v_j) identically 0.",
    explanation: "Basic cells are already in the basis and have zero reduced cost by definition.",
    hint: "Basic cells satisfy u_i + v_j = c_ij, so d_ij = 0.",
    level: "expert",
    codeExample: "For basic cells: d_ij = c_ij - (u_i + v_j) = c_ij - c_ij = 0."
  },
  {
    question: "How is the opportunity cost calculated for an empty cell in a ₹0 DUMMY column?",
    shortAnswer: "d_i,dummy = 0 - (u_i + v_dummy) = -(u_i + v_dummy).",
    explanation: "Since unit cost c_i,dummy = ₹0, the opportunity cost is simply the negative of the sum of the potentials.",
    hint: "c_ij is 0, so d = -(u_i + v_j).",
    level: "expert",
    codeExample: "d_i,dummy = 0 - (u_i + v_dummy)"
  },
  {
    question: "If an empty dummy cell has d_2,dummy = -₹5, what does this signify?",
    shortAnswer: "It means shifting unallocated inventory (surplus) to Factory 2 reduces the real shipping costs of the entire network by ₹5 per unit.",
    explanation: "Reallocating warehouse surplus can relieve active factories and unlock cheaper real freight assignments.",
    hint: "Surplus reassignment saves ₹5 per unit.",
    level: "expert",
    codeExample: "Negative dummy evaluation → reassigning surplus reduces total real freight."
  },
  {
    question: "Why do some textbooks define the evaluation index as Delta_ij = (u_i + v_j) - c_ij?",
    shortAnswer: "Because Delta_ij represents the 'Improvement Index' (the negative of opportunity cost: Delta_ij = -d_ij); in that convention, optimality requires all Delta_ij <= 0, and the entering cell is the most positive Delta_ij > 0.",
    explanation: "Both conventions are mathematically identical: d_ij = c_ij - (u_i + v_j) >= 0 (standard) vs Delta_ij = (u_i + v_j) - c_ij <= 0 (improvement convention).",
    hint: "Delta_ij is just the negative of d_ij.",
    level: "expert",
    codeExample: "Equivalence: d_ij >= 0 <=> Delta_ij <= 0."
  },
  {
    question: "In what visual position inside a tableau cell is the opportunity cost d_ij typically written?",
    shortAnswer: "In the bottom-right corner of empty cells, often enclosed in a circle or small box, to distinguish it from the unit cost c_ij in the top-right.",
    explanation: "Clear spatial placement prevents confusing unit shipping rates with evaluation indices.",
    hint: "Bottom-right corner of empty cells.",
    level: "intermediate",
    codeExample: "Cell layout: Top-right = c_ij | Center = x_ij | Bottom-right = (d_ij)."
  },
  {
    question: "If Mahima evaluates a 3x3 tableau and gets d = [+3, +5, +1, +4], what is the immediate conclusion?",
    shortAnswer: "The solution is CERTIFIED GLOBALLY OPTIMAL; no further calculations or loop pivots are necessary.",
    explanation: "All d_ij >= 0 confirms that no route can reduce total cost.",
    hint: "All positive evaluations mean optimal solution.",
    level: "moderate",
    codeExample: "all(d >= 0) => STOP: Global Optimal Found."
  },
  {
    question: "Suppose Abhronila in Jadavpur has unit cost c_31 = ₹11, and calculated potentials u_3 = 2, v_1 = 8. What is d_31?",
    shortAnswer: "d_31 = +₹1 ( 11 - (2 + 8) = 11 - 10 = +₹1 ).",
    explanation: "d_31 = 11 - 10 = +₹1.",
    hint: "11 - 10 = 1.",
    level: "moderate",
    codeExample: "d_31 = 11 - (2 + 8) = +1"
  },
  {
    question: "What is the economic meaning of d_31 = +₹1 from the previous question?",
    shortAnswer: "Shipping along route (3, 1) would cost ₹1 more per ton than utilizing the existing active logistics pathways.",
    explanation: "The direct rate (₹11) is ₹1 higher than the implied network rate (₹10).",
    hint: "Route (3, 1) is ₹1 more expensive than the current network path.",
    level: "moderate",
    codeExample: "Direct Cost (₹11) > Shadow Cost (₹10) by ₹1."
  },
  {
    question: "Can an opportunity cost d_ij ever be an infinite value?",
    shortAnswer: "No, as long as all unit costs c_ij and capacities are finite and the matrix is non-degenerate, all d_ij values are finite real numbers.",
    explanation: "Finite linear programming guarantees bounded scalar multipliers.",
    hint: "Always finite real numbers.",
    level: "moderate",
    codeExample: "d_ij in Real Numbers (-infinity < d_ij < +infinity)."
  },
  {
    question: "How does the calculation of opportunity costs in MODI eliminate the need to draw loops for every empty cell?",
    shortAnswer: "Because the algebraic difference c_ij - (u_i + v_j) mathematically equals the exact net sum of alternating costs around that cell's unique closed loop.",
    explanation: "By duality theorems, d_ij algebraically computes the closed loop evaluation in one subtraction, avoiding geometric loop tracing entirely.",
    hint: "Algebraic potential difference equals the loop alternating sum.",
    level: "expert",
    codeExample: "Theorem: c_ij - u_i - v_j === sum_{loop corners} (+/-) c_kl."
  },
  {
    question: "Suppose Debangshu finds two entering candidates tied with the same most negative evaluation: d_12 = -₹6 and d_31 = -₹6. How is the tie broken?",
    shortAnswer: "He can select either cell arbitrarily, or apply the secondary heuristic of choosing the cell that allows a larger flow transfer quantity theta (θ).",
    explanation: "Both cells offer the same marginal rate of cost decrease (₹6/unit); choosing the one with larger θ achieves greater total cost reduction on that single pivot.",
    hint: "Arbitrary choice or choose the one allowing larger transfer θ.",
    level: "expert",
    codeExample: "Tie-breaker: Maximize Delta Z = theta * |d_ij|."
  },
  {
    question: "If cell (1, 2) has c_12 = ₹8, u_1 = -3, and v_2 = 15, what is d_12?",
    shortAnswer: "d_12 = -₹4 ( 8 - (-3 + 15) = 8 - 12 = -₹4 ).",
    explanation: "d_12 = c_12 - (u_1 + v_2) = 8 - (-3 + 15) = 8 - 12 = -₹4.",
    hint: "8 - 12 = -4.",
    level: "moderate",
    codeExample: "d_12 = 8 - (-3 + 15) = -4"
  },
  {
    question: "Why should students calculate ALL opportunity costs before picking the entering cell, rather than stopping at the first negative one they find?",
    shortAnswer: "To ensure they find the MOST negative d_ij (Dantzig's rule), which maximizes per-unit cost reduction and minimizes the total number of subsequent iterations.",
    explanation: "Stopping at the first negative d_ij may pick a weak candidate (e.g. -₹1) when a much more lucrative candidate (e.g. -₹8) exists.",
    hint: "Evaluate all empty cells to find the global minimum d_ij.",
    level: "intermediate",
    codeExample: "Rule: Evaluate all (m-1)(n-1) cells → pick min(d_ij)."
  },
  {
    question: "Suppose Susmita calculates d_ij for all empty cells in a 3x3 matrix and finds: d_13 = +2, d_21 = -5, d_31 = 0, d_32 = +4. Which cell enters?",
    shortAnswer: "Cell (2, 1) enters because it is the only negative evaluation (d_21 = -5).",
    explanation: "d_31 = 0 is non-negative, so only cell (2, 1) is a cost-reducing entering variable.",
    hint: "Only negative cell is (2, 1).",
    level: "moderate",
    codeExample: "Entering Cell = (2, 1) with d_21 = -5."
  },
  {
    question: "What is the common arithmetic mistake students make when evaluating d_ij with negative potentials (e.g., u = -4)?",
    shortAnswer: "Mishandling the double negative, e.g. incorrectly writing c - (-4 + v) as c + 4 - v instead of c - (-4 + v).",
    explanation: "Parentheses must be resolved carefully: c_ij - (u_i + v_j). If u_i = -4 and v_j = 6, then sum = 2, and d_ij = c_ij - 2.",
    hint: "Always evaluate the sum (u_i + v_j) inside parentheses first.",
    level: "moderate",
    codeExample: "Safe syntax: sum_uv = u[i] + v[j]; d[i][j] = c[i][j] - sum_uv;"
  },
  {
    question: "If all d_ij values are strictly positive (all d_ij > 0), what does this guarantee about the optimal solution?",
    shortAnswer: "It guarantees that the optimal basic solution is UNIQUE; no alternative optimal basic solutions exist.",
    explanation: "When every d_ij > 0, activating any non-basic route strictly increases total cost Z, ensuring the current basis is the sole global minimizer.",
    hint: "Strictly positive evaluations mean a unique optimal solution.",
    level: "expert",
    codeExample: "all(d_ij > 0) => Unique Global Optimal Solution."
  },
  {
    question: "How does calculating opportunity costs in MODI connect to Simplex Tableau Reduced Costs in general linear programming?",
    shortAnswer: "The opportunity cost d_ij is mathematically identical to the reduced cost coefficient (c_j - z_j or c_j - pi^T A_j) of the non-basic variable in standard simplex theory.",
    explanation: "In simplex theory, c_j - z_j measures the relative profit or cost gradient of bringing a non-basic variable into the basis.",
    hint: "d_ij is the simplex reduced cost for variable x_ij.",
    level: "expert",
    codeExample: "Simplex Theory: d_ij = c_ij - z_ij = c_ij - pi^T A_ij."
  },
  {
    question: "Suppose Mahima in Barrackpore finds an entering cell with d_13 = -₹7. If the loop allows transfer of θ = 30 tons, what is the exact financial savings on this single pivot?",
    shortAnswer: "₹210 savings ( 30 tons * ₹7/ton = ₹210 ).",
    explanation: "Total cost decreases by θ * |d_ij| = 30 * 7 = ₹210.",
    hint: "30 * 7 = 210.",
    level: "moderate",
    codeExample: "Savings = theta * |d_13| = 30 * 7 = ₹210"
  },
  {
    question: "What is the quick sanity check to ensure an opportunity cost calculation was done correctly?",
    shortAnswer: "Check that if you manually trace the 4-corner loop for that empty cell, the alternating sum (+c_enter - c_corner1 + c_corner2 - c_corner3) matches d_ij exactly.",
    explanation: "Loop sum identity: d_ij = c_enter - c_1 + c_2 - c_3.",
    hint: "Alternating sum around the loop equals d_ij.",
    level: "expert",
    codeExample: "Sanity Check: d_ij === c_enter - c_1 + c_2 - c_3."
  },
  {
    question: "Why is mastering opportunity cost calculations vital for corporate logistics consultants in West Bengal?",
    shortAnswer: "Because it allows consultants to explain the financial ROI of rerouting freight in plain Rupees per ton, translating abstract mathematical equations into persuasive business cases.",
    explanation: "Business executives understand 'saving ₹8 per ton by switching to Route 21' far better than matrix theory.",
    hint: "Translates abstract math into clear rupee savings per ton.",
    level: "intermediate",
    codeExample: "Executive Communication: 'Rerouting saves ₹8/ton, generating ₹48,000 monthly profit.'"
  },
  {
    question: "What is the ultimate golden rule for calculating opportunity costs?",
    shortAnswer: "'First compute the sum (u_i + v_j); then subtract it from direct cost: d_ij = c_ij - (u_i + v_j); the most negative value wins the entry!'",
    explanation: "This two-step sequence prevents subtraction slip-ups and guarantees finding the optimal entering cell.",
    hint: "Sum potentials → subtract from cost → pick most negative.",
    level: "moderate",
    codeExample: "Golden Rule: (1) sum = u_i + v_j → (2) d_ij = c_ij - sum → (3) argmin(d_ij)."
  }
];

export default questions;
