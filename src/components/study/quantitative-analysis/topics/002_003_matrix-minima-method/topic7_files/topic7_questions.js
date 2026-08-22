// topic7_questions.js
// 30 Moderate to Expert Questions on Numerical Exercises

const questions = [
  {
    question: "In a 3 × 3 problem with supplies S = [60, 80, 60], demands D = [80, 70, 50], and cost matrix C = [[2,5,7],[6,3,4],[5,8,1]], what is the first allocated cell and quantity?",
    shortAnswer: "Cell (3, 3) [Ichapur → Barasat] with quantity x_33 = min(60, 50) = 50 crates @ ₹1.",
    explanation: "Scanning the 3×3 matrix, the absolute minimum unit freight cost is ₹1 at cell (3, 3). The allocated quantity is x_33 = min(S_3, D_3) = min(60, 50) = 50 crates.",
    hint: "Look for the smallest number in the entire 3×3 cost grid.",
    level: "basic",
    codeExample: "x[3][3] = min(60, 50) = 50; S[3] = 10; D[3] = 0 (Col 3 eliminated)."
  },
  {
    question: "In the same 3 × 3 problem, what is the second allocated cell after Column 3 is eliminated?",
    shortAnswer: "Cell (1, 1) [Kolkata → Jadavpur] with quantity x_11 = min(60, 80) = 60 crates @ ₹2.",
    explanation: "In the active submatrix (Columns 1 and 2), the lowest remaining cost is ₹2 at cell (1, 1). The assigned quantity is min(60, 80) = 60 crates, exhausting Row 1.",
    hint: "Find the smallest cost among Columns 1 and 2.",
    level: "basic",
    codeExample: "x[1][1] = min(60, 80) = 60; S[1] = 0 (Row 1 eliminated); D[1] = 20."
  },
  {
    question: "What is the final total initial transportation cost Z for the 3 × 3 FMCG problem?",
    shortAnswer: "Z = ₹490 ((50×1) + (60×2) + (70×3) + (10×5) + (10×6) = 50 + 120 + 210 + 50 + 60 = ₹490).",
    explanation: "Summing all 5 basic allocations: (50×₹1) + (60×₹2) + (70×₹3) + (10×₹5) + (10×₹6) = ₹490.",
    hint: "50 + 120 + 210 + 50 + 60 = 490.",
    level: "basic",
    codeExample: "Z = 50 + 120 + 210 + 50 + 60 = 490;"
  },
  {
    question: "Consider a 2 × 3 problem with S = [50, 70], D = [40, 50, 30], and C = [[4,8,6],[7,3,5]]. What are all 4 allocations in execution order?",
    shortAnswer: "1. (2,2)=50 @ ₹3; 2. (1,1)=40 @ ₹4; 3. (2,3)=20 @ ₹5; 4. (1,3)=10 @ ₹6.",
    explanation: "The Matrix Minima scan selects: 1) ₹3 at (2,2) for 50; 2) ₹4 at (1,1) for 40; 3) ₹5 at (2,3) for 20; 4) ₹6 at (1,3) for 10. Total cost = ₹470.",
    hint: "Trace the 4 minimum cost steps: ₹3 → ₹4 → ₹5 → ₹6.",
    level: "intermediate",
    codeExample: "Order: (2,2)=50, (1,1)=40, (2,3)=20, (1,3)=10. Total = ₹470."
  },
  {
    question: "Suppose Total Supply = 150 and Total Demand = 120. How is this problem balanced before running numerical exercises?",
    shortAnswer: "Add a dummy destination column D_dummy with Demand = 30 and unit costs c_i,dummy = ₹0 across all rows.",
    explanation: "Because supply exceeds demand by 150 - 120 = 30 units, a dummy column with demand 30 and zero freight costs is appended to balance total flow at 150.",
    hint: "Add a dummy column with 30 units demand at ₹0 cost.",
    level: "intermediate",
    codeExample: "Demand_dummy = 150 - 120 = 30; c_i,dummy = 0 ∀ i."
  },
  {
    question: "In an unbalanced problem with a ₹0 dummy column, why does Matrix Minima allocate to the dummy column first?",
    shortAnswer: "Because ₹0 is numerically smaller than all positive shipping rates in the active cost matrix.",
    explanation: "The greedy search operator evaluates argmin(C). Since 0 < c_ij for all real routes, the dummy cells are selected at the very beginning of the algorithm.",
    hint: "0 is the smallest non-negative number.",
    level: "intermediate",
    codeExample: "argmin([[0, 4, 6], [0, 7, 3]]) selects column 1 (₹0 dummy) first."
  },
  {
    question: "Consider an exercise where road repairs block route (1, 2) from Barrackpore to Jadavpur. What numerical value is assigned to c_12?",
    shortAnswer: "c_12 = M (where M is an arbitrarily large number, e.g. ₹999,999).",
    explanation: "The Big-M method assigns a prohibitive cost M to blocked links. Because the algorithm only selects minimum cost cells, it strictly avoids (1, 2).",
    hint: "Assign a huge penalty cost M so it is never selected.",
    level: "basic",
    codeExample: "costMatrix[0][1] = 999999; // Big-M prohibited route"
  },
  {
    question: "In a 3 × 4 matrix, how many basic allocated cells must appear in the final solution?",
    shortAnswer: "Exactly 6 basic allocated cells (3 + 4 - 1 = 6).",
    explanation: "For any m × n transportation problem, the number of basic variables in a non-degenerate basic solution is m + n - 1. Here, 3 + 4 - 1 = 6.",
    hint: "m + n - 1 = 3 + 4 - 1 = 6.",
    level: "basic",
    codeExample: "Expected basic cells = 3 + 4 - 1 = 6."
  },
  {
    question: "In an exercise where S = [40, 60] and D = [40, 30, 30], what happens in Step 1 when (1, 1) is selected with S_1 = 40, D_1 = 40?",
    shortAnswer: "Simultaneous exhaustion occurs (degeneracy). Set x_11 = 40, cross out Row 1, and allocate ε to an unassigned cell in Column 1 before crossing it out.",
    explanation: "Because S_1 = D_1 = 40, both hit zero together. To avoid having only 2 allocations instead of 2+3-1=4, an ε is placed in an independent cell.",
    hint: "When supply equals demand, apply the epsilon degeneracy rule.",
    level: "expert",
    codeExample: "x[0][0] = 40; rowDone[0] = true; x[1][0] = EPSILON; colDone[0] = true;"
  },
  {
    question: "In Susmita's medical oxygen problem with S = [100, 150], D = [120, 130], and C = [[6, 9], [11, 5]], calculate the grand total cost Z.",
    shortAnswer: "Z = ₹1,470 ((130×5) + (100×6) + (20×11) = 650 + 600 + 220 = ₹1,470).",
    explanation: "1) (2,2) takes 130 @ ₹5 = ₹650; 2) (1,1) takes 100 @ ₹6 = ₹600; 3) (2,1) takes 20 @ ₹11 = ₹220. Grand total = ₹1,470.",
    hint: "650 + 600 + 220 = 1,470.",
    level: "basic",
    codeExample: "Z = (130 * 5) + (100 * 6) + (20 * 11) = 1470;"
  },
  {
    question: "In Abhronila & Mahima's courier problem with S = [40, 60], D = [30, 40, 30], and C = [[8, 4, 9], [3, 7, 5]], calculate the grand total cost Z.",
    shortAnswer: "Z = ₹400 ((30×3) + (40×4) + (30×5) = 90 + 160 + 150 = ₹400).",
    explanation: "1) (2,1) takes 30 @ ₹3 = ₹90; 2) (1,2) takes 40 @ ₹4 = ₹160; 3) (2,3) takes 30 @ ₹5 = ₹150. Grand total = ₹400.",
    hint: "90 + 160 + 150 = 400.",
    level: "basic",
    codeExample: "Z = (30 * 3) + (40 * 4) + (30 * 5) = 400;"
  },
  {
    question: "In a 2 × 2 problem where C = [[3, 7], [5, 2]], S = [50, 50], D = [60, 40], what is the allocation sequence and cost?",
    shortAnswer: "Step 1: (2, 2) = 40 @ ₹2; Step 2: (1, 1) = 50 @ ₹3; Step 3: (2, 1) = 10 @ ₹5. Total Cost Z = (40×2) + (50×3) + (10×5) = 80 + 150 + 50 = ₹280.",
    explanation: "1) Min cost ₹2 at (2,2) takes min(50,40)=40; 2) Next min ₹3 at (1,1) takes min(50,60)=50; 3) Final cell (2,1) takes 10 @ ₹5. Total = ₹280.",
    hint: "Min is ₹2, next is ₹3, remainder is ₹5.",
    level: "intermediate",
    codeExample: "Z = (40 * 2) + (50 * 3) + (10 * 5) = 280;"
  },
  {
    question: "How do you verify that your numerical exercise solution has no closed loops (cycles)?",
    shortAnswer: "Attempt to trace an alternating horizontal/vertical rook move path starting and ending at the same basic cell; if no such path exists, the solution is loop-free.",
    explanation: "A loop requires at least 4 basic cells with exactly 2 cells in every row and column involved. Because line elimination deletes one degree of freedom per step, basic cells are cycle-free.",
    hint: "Try to jump like a rook through allocated cells back to the start; it should be impossible.",
    level: "expert",
    codeExample: "assert(detectCycle(allocations) === false);"
  },
  {
    question: "What is the average freight cost per unit in the 2 × 2 exercise where Total Flow = 100 and Z = ₹280?",
    shortAnswer: "₹2.80 per unit (₹280 / 100 units = ₹2.80/unit).",
    explanation: "Average Unit Cost = Total Expenditure Z / Total Physical Flow = ₹280 / 100 = ₹2.80.",
    hint: "280 / 100 = 2.80.",
    level: "basic",
    codeExample: "avgCost = 280 / 100 = 2.80;"
  },
  {
    question: "Suppose two cells tie with cost ₹3: Cell A has S=20, D=80; Cell B has S=90, D=50. Which cell receives allocation under the max-volume rule?",
    shortAnswer: "Cell B receives allocation with quantity min(90, 50) = 50 units (compared to Cell A's min(20, 80) = 20 units).",
    explanation: "Capacity for Cell A = min(20, 80) = 20. Capacity for Cell B = min(90, 50) = 50. Since 50 > 20, Cell B is prioritized.",
    hint: "50 > 20.",
    level: "basic",
    codeExample: "Pick Cell B since min(90, 50) = 50 > min(20, 80) = 20."
  },
  {
    question: "In a 3 × 3 exercise with C = [[10, 2, 20], [1, 9, 8], [5, 12, 4]], S = [30, 40, 50], D = [40, 30, 50], find the first 3 allocations.",
    shortAnswer: "1. (2, 1) = 40 @ ₹1; 2. (1, 2) = 30 @ ₹2; 3. (3, 3) = 50 @ ₹4.",
    explanation: "Lowest costs in entire table are: 1) ₹1 at (2,1) takes 40; 2) ₹2 at (1,2) takes 30; 3) ₹4 at (3,3) takes 50. All 3 cells terminate their respective lines cleanly.",
    hint: "Identify the 3 smallest rates: ₹1, ₹2, and ₹4.",
    level: "intermediate",
    codeExample: "Allocations: (2,1)=40, (1,2)=30, (3,3)=50. All rows/cols satisfied immediately!"
  },
  {
    question: "What is the total cost Z for the problem in the previous question?",
    shortAnswer: "Z = ₹300 ((40×1) + (30×2) + (50×4) = 40 + 60 + 200 = ₹300).",
    explanation: "Total Cost = (40 × ₹1) + (30 × ₹2) + (50 × ₹4) = 40 + 60 + 200 = ₹300.",
    hint: "40 + 60 + 200 = 300.",
    level: "basic",
    codeExample: "Z = (40 * 1) + (30 * 2) + (50 * 4) = 300;"
  },
  {
    question: "Why did the problem in question 16 solve in only 3 allocations when m+n-1 = 3+3-1 = 5 was expected?",
    shortAnswer: "Because each of the 3 allocations satisfied both a supply row and a demand column simultaneously (multiple degeneracies). Two ε allocations are needed.",
    explanation: "S1=D2=30, S2=D1=40, S3=D3=50. Each step zeroed out a row and column simultaneously. To reach 5 basic variables, two ε allocations must be added to independent cells.",
    hint: "3 simultaneous row-column cancellations require 2 epsilon placeholders.",
    level: "expert",
    codeExample: "Actual basic count = 3; Expected = 5 ⇒ Insert 2 epsilon allocations."
  },
  {
    question: "Where should the two ε allocations be placed to maintain independent positions?",
    shortAnswer: "In unallocated cells that do not form a closed loop with existing basic cells, preferably in cells with low unit costs (e.g., (3, 1) @ ₹5).",
    explanation: "Placing ε in independent cells restores the algebraic rank of the basis without adding freight costs.",
    hint: "Choose empty cells with lowest costs that don't close loops.",
    level: "expert",
    codeExample: "x[2][0] = EPSILON; x[0][0] = EPSILON;"
  },
  {
    question: "In numerical exercises, how can you immediately spot an unbalanced transportation problem?",
    shortAnswer: "Calculate ∑ S_i and ∑ D_j; if the two sums are not equal, the problem is unbalanced.",
    explanation: "Always sum supplies and demands as Step 0 before looking at any cost cells.",
    hint: "Compare total supply with total demand before starting.",
    level: "basic",
    codeExample: "if (sum(S) !== sum(D)) isUnbalanced = true;"
  },
  {
    question: "What is the time required to solve a standard 3 × 3 Matrix Minima exercise manually during an examination?",
    shortAnswer: "Approximately 2 to 3 minutes.",
    explanation: "With only 9 cells and at most 5 allocation steps, systematic scanning, deducting, and striking takes under 3 minutes.",
    hint: "A fast, disciplined routine finishes a 3×3 table in under 3 minutes.",
    level: "basic",
    codeExample: "Exam speed: 5 steps × 30 seconds = 2.5 minutes."
  },
  {
    question: "In an exercise where S = [25, 35], D = [20, 20, 20], C = [[5, 1, 8], [4, 7, 2]], what is the starting allocation?",
    shortAnswer: "Cell (1, 2) with cost ₹1 and quantity min(25, 20) = 20.",
    explanation: "The minimum cost in the matrix is ₹1 at cell (1, 2). Allocate min(S_1, D_2) = min(25, 20) = 20.",
    hint: "Lowest cost is ₹1 at row 1, col 2.",
    level: "basic",
    codeExample: "x[0][1] = 20; S[0] = 5; D[1] = 0 (Col 2 eliminated)."
  },
  {
    question: "Continuing the previous exercise, what are the next two allocations?",
    shortAnswer: "Step 2: (2, 3) = min(35, 20) = 20 @ ₹2; Step 3: (2, 1) = min(15, 20) = 15 @ ₹4; Step 4: (1, 1) = 5 @ ₹5.",
    explanation: "1) (2,3) takes 20 @ ₹2 (D3 done, S2=15); 2) (2,1) takes 15 @ ₹4 (S2 done, D1=5); 3) (1,1) takes 5 @ ₹5 (Both done).",
    hint: "Trace allocations at ₹2, ₹4, and ₹5.",
    level: "intermediate",
    codeExample: "Allocations: (1,2)=20, (2,3)=20, (2,1)=15, (1,1)=5."
  },
  {
    question: "What is the total cost Z for the 2 × 3 exercise above?",
    shortAnswer: "Z = ₹145 ((20×1) + (20×2) + (15×4) + (5×5) = 20 + 40 + 60 + 25 = ₹145).",
    explanation: "20 + 40 + 60 + 25 = ₹145.",
    hint: "20 + 40 + 60 + 25 = 145.",
    level: "basic",
    codeExample: "Z = (20*1) + (20*2) + (15*4) + (5*5) = 145;"
  },
  {
    question: "What is the NWCR cost for the exact same 2 × 3 exercise above?",
    shortAnswer: "NWCR Allocations: (1,1)=20 @ ₹5, (1,2)=5 @ ₹1, (2,2)=15 @ ₹7, (2,3)=20 @ ₹2 → Total = 100 + 5 + 105 + 40 = ₹250.",
    explanation: "NWCR incurs ₹250 versus Matrix Minima's ₹145, saving ₹105 (42.0% cost reduction).",
    hint: "NWCR cost = ₹250; MM cost = ₹145.",
    level: "intermediate",
    codeExample: "NWCR = 250; Matrix Minima = 145; Savings = 105 (42%)."
  },
  {
    question: "Why should students always write down the intermediate reduced submatrices during complex numerical exercises?",
    shortAnswer: "To prevent accidental visual scanning of eliminated rows or columns and ensure clean auditability.",
    explanation: "Writing out the remaining active rows/columns prevents calculation slips under examination conditions.",
    hint: "Clean submatrices eliminate visual clutter and mistakes.",
    level: "basic",
    codeExample: "Submatrix 1 (3×3) → Submatrix 2 (2×3) → Submatrix 3 (2×2) → Submatrix 4 (1×1)."
  },
  {
    question: "In an exercise where a dummy row is added with S_dummy = 20, what is the freight contribution of shipments originating from the dummy row?",
    shortAnswer: "₹0, because all unit costs in the dummy row are c_dummy,j = ₹0.",
    explanation: "Allocations from a dummy supply row represent unmet demand at destination j, incurring zero shipping expenditure.",
    hint: "Dummy origin shipments cost ₹0.",
    level: "basic",
    codeExample: "Z_dummy = ∑ (0 · x_dummy,j) = 0."
  },
  {
    question: "What is the sanity check for basic variable count on a 4 × 6 numerical exercise?",
    shortAnswer: "m + n - 1 = 4 + 6 - 1 = 9 basic allocations.",
    explanation: "Any valid non-degenerate basic solution for a 4×6 problem must have exactly 9 allocated cells.",
    hint: "4 + 6 - 1 = 9.",
    level: "basic",
    codeExample: "assert(allocations.length === 9);"
  },
  {
    question: "How does solving multiple numerical exercises build an intuitive feel for transportation logistics?",
    shortAnswer: "It trains the mind to rapidly identify greedy cost patterns, balance vectors, and recognize degeneracy risks before running optimization algorithms.",
    explanation: "Repeated practice reinforces the mechanical discipline of taking minimums, deducting balances, and auditing marginal sums effortlessly.",
    hint: "Practice builds speed, accuracy, and intuitive problem-solving instincts.",
    level: "basic",
    codeExample: "Practice leads to 100% exam accuracy and deep algorithmic intuition."
  },
  {
    question: "What is the primary piece of advice for students preparing for transportation numerical exams?",
    shortAnswer: "Always check problem balance, circle allocated quantities, scratch out capacities immediately, and verify m + n - 1 basic variables before computing Z.",
    explanation: "Following this 4-step checklist guarantees full marks and error-free initial basic feasible solutions every single time.",
    hint: "Balance, Circle, Scratch, Verify m+n-1.",
    level: "basic",
    codeExample: "The 4 Golden Rules for Transportation Table Mastery."
  }
];

export default questions;
