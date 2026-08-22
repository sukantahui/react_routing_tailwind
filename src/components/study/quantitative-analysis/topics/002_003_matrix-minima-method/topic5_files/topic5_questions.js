// topic5_questions.js
// 30 Moderate to Expert Questions on Calculating Initial Transportation Cost

const questions = [
  {
    question: "What is the formal mathematical formula for calculating the total initial transportation cost Z?",
    shortAnswer: "Z = ∑_{i=1}^m ∑_{j=1}^n (c_ij · x_ij), where c_ij is the unit rate and x_ij is the allocated volume.",
    explanation: "The total initial logistics expenditure Z is the linear sum of products of each allocated shipment quantity x_ij and its corresponding unit freight rate c_ij across all occupied cells.",
    hint: "Multiply every assigned shipment quantity by its unit rate in ₹ and sum them all up.",
    level: "basic",
    codeExample: "const totalCost = allocations.reduce((acc, { qty, cost }) => acc + qty * cost, 0);"
  },
  {
    question: "Why do unallocated (non-basic) cells contribute ₹0 to the total cost Z?",
    shortAnswer: "Because their allocated quantity is zero (x_ij = 0), so c_ij · 0 = 0.",
    explanation: "Only the basic allocated cells (where x_ij > 0) carry physical cargo and incur actual shipping costs. Empty cells represent unused routes and add ₹0 to the logistics ledger.",
    hint: "0 units shipped on a route means 0 cost incurred.",
    level: "basic",
    codeExample: "x_ij = 0 ⇒ c_ij · x_ij = 0."
  },
  {
    question: "How do allocations to a dummy column with unit cost ₹0 affect the total transportation cost Z?",
    shortAnswer: "They contribute ₹0 to total cost (x_i,dummy · ₹0 = ₹0), representing surplus inventory retained at origin without freight expense.",
    explanation: "Because dummy cells have a unit rate of c_i,dummy = ₹0, any units allocated to dummy storage do not incur freight charges.",
    hint: "Any quantity multiplied by ₹0 equals ₹0.",
    level: "basic",
    codeExample: "Z_dummy = alloc_qty * 0 = 0;"
  },
  {
    question: "In Debangshu's fasteners problem, allocations are: x_22 = 50 @ ₹3, x_11 = 40 @ ₹4, x_23 = 20 @ ₹5, x_13 = 10 @ ₹6. What is total initial cost Z?",
    shortAnswer: "Z = ₹470 ((50×3) + (40×4) + (20×5) + (10×6) = 150 + 160 + 100 + 60 = ₹470).",
    explanation: "Calculating each product term: 50×3 = ₹150; 40×4 = ₹160; 20×5 = ₹100; 10×6 = ₹60. Summing: 150 + 160 + 100 + 60 = ₹470.",
    hint: "150 + 160 + 100 + 60 = 470.",
    level: "basic",
    codeExample: "Z = (50 * 3) + (40 * 4) + (20 * 5) + (10 * 6) = 470;"
  },
  {
    question: "In Mamata's FMCG problem, allocations are: (3,3)=50 @ ₹1, (1,1)=60 @ ₹2, (2,2)=70 @ ₹3, (3,1)=10 @ ₹5, (2,1)=10 @ ₹6. What is total initial cost Z?",
    shortAnswer: "Z = ₹490 (50 + 120 + 210 + 50 + 60 = ₹490).",
    explanation: "(50×1) + (60×2) + (70×3) + (10×5) + (10×6) = 50 + 120 + 210 + 50 + 60 = ₹490.",
    hint: "50 + 120 + 210 + 50 + 60 = 490.",
    level: "basic",
    codeExample: "Z = (50*1) + (60*2) + (70*3) + (10*5) + (10*6) = 490;"
  },
  {
    question: "In Susmita's oxygen problem, allocations are: (2,2)=130 @ ₹5, (1,1)=100 @ ₹6, (2,1)=20 @ ₹11. What is total initial cost Z?",
    shortAnswer: "Z = ₹1,470 (650 + 600 + 220 = ₹1,470).",
    explanation: "(130×5) + (100×6) + (20×11) = 650 + 600 + 220 = ₹1,470.",
    hint: "650 + 600 + 220 = 1470.",
    level: "basic",
    codeExample: "Z = (130*5) + (100*6) + (20*11) = 1470;"
  },
  {
    question: "In Abhronila & Mahima's locker problem, allocations are: (2,1)=30 @ ₹3, (1,2)=40 @ ₹4, (2,3)=30 @ ₹5. What is total initial cost Z?",
    shortAnswer: "Z = ₹400 (90 + 160 + 150 = ₹400).",
    explanation: "(30×3) + (40×4) + (30×5) = 90 + 160 + 150 = ₹400.",
    hint: "90 + 160 + 150 = 400.",
    level: "basic",
    codeExample: "Z = (30*3) + (40*4) + (30*5) = 400;"
  },
  {
    question: "What does the Initial Transportation Cost Z represent in terms of the global optimization landscape?",
    shortAnswer: "It represents an upper bound on the optimal transportation cost (Z_IBFS ≥ Z_optimal).",
    explanation: "Because any basic feasible solution satisfies all physical constraints, its cost Z provides a legitimate upper bound on the true global minimum. Subsequent MODI iterations can only decrease or maintain Z.",
    hint: "Every feasible solution gives a ceiling above which the optimal cost cannot rise.",
    level: "intermediate",
    codeExample: "Z_optimal <= Z_IBFS(MatrixMinima) <= Z_IBFS(NWCR)."
  },
  {
    question: "How does the Initial Cost from Matrix Minima typically compare with that of the North-West Corner Rule?",
    shortAnswer: "Matrix Minima initial cost is substantially lower, typically achieving 25% to 50% cost savings over NWCR.",
    explanation: "Because Matrix Minima prioritizes lowest unit costs whereas NWCR ignores costs entirely, Matrix Minima starts much closer to the optimal solution.",
    hint: "Cost-aware selection produces far lower initial freight bills than blind spatial traversal.",
    level: "intermediate",
    codeExample: "Cost Savings = ((Z_NWCR - Z_MatrixMinima) / Z_NWCR) * 100% ≈ 25% - 50%."
  },
  {
    question: "What is the average cost per unit shipped, and how is it calculated from Z?",
    shortAnswer: "Average Unit Freight Cost = Total Cost Z / Total Flow (Total Supply or Demand) in ₹/unit.",
    explanation: "Dividing total expenditure Z by the total volume shipped gives the weighted average freight rate per unit across the entire supply chain.",
    hint: "Divide total rupee bill by total tons or crates shipped.",
    level: "intermediate",
    codeExample: "const avgCostPerUnit = totalCost / totalSupply;"
  },
  {
    question: "In Debangshu's problem with Z = ₹470 and Total Flow = 120 tons, what is the average freight rate per ton?",
    shortAnswer: "₹3.92 per ton (₹470 / 120 tons ≈ ₹3.9167/ton).",
    explanation: "470 / 120 = 3.9166... ≈ ₹3.92 per ton.",
    hint: "470 / 120 ≈ 3.92.",
    level: "basic",
    codeExample: "470 / 120 = 3.9167 ₹/ton."
  },
  {
    question: "How does scaling all costs by positive constant k (c_ij' = k · c_ij) affect the calculated total cost Z?",
    shortAnswer: "The new total cost is exactly k times the original total cost (Z_new = k · Z_old).",
    explanation: "Because Z = ∑ ∑ (k · c_ij) x_ij = k · ∑ ∑ c_ij x_ij = k · Z. The scalar factors out cleanly from the linear summation.",
    hint: "Factoring out a constant multiplier scales the total sum proportionally.",
    level: "intermediate",
    codeExample: "Z(k · C) = k · Z(C)."
  },
  {
    question: "How does adding a constant surcharge C to every cell (c_ij' = c_ij + C) affect total cost Z?",
    shortAnswer: "Total cost increases by exactly C × Total Flow: Z_new = Z_old + C · (∑ S_i).",
    explanation: "Z_new = ∑ ∑ (c_ij + C) x_ij = ∑ ∑ c_ij x_ij + C ∑ ∑ x_ij = Z_old + C · (Total Flow).",
    hint: "Every unit shipped pays the extra surcharge C.",
    level: "expert",
    codeExample: "Z_new = Z_old + (C * totalSupply);"
  },
  {
    question: "Why should an analyst calculate the individual cost contribution of each allocation (c_ij · x_ij) before summing?",
    shortAnswer: "To facilitate auditing, pinpoint high-cost bottleneck routes, and prevent arithmetic accumulation mistakes.",
    explanation: "Itemizing each route's cost (e.g. ₹150 + ₹160 + ₹100 + ₹60) creates a clear audit trail and makes it easy to verify each line item independently.",
    hint: "Show intermediate products before computing the grand total.",
    level: "basic",
    codeExample: "routes.map(r => ({ ...r, cost: r.qty * r.rate }));"
  },
  {
    question: "What is the time complexity of computing total cost Z from an m × n allocation matrix with k basic cells?",
    shortAnswer: "O(k) = O(m + n - 1) time complexity.",
    explanation: "There are only m + n - 1 non-zero allocated cells. Iterating over the sparse list of basic allocations requires only m + n - 1 multiplications and additions.",
    hint: "Only basic cells have non-zero volume, taking O(m + n) operations.",
    level: "intermediate",
    codeExample: "O(m + n - 1) operations."
  },
  {
    question: "If an allocation of ε (infinitesimal zero) exists in cell (k, l), what is its numerical contribution to total cost Z?",
    shortAnswer: "₹0 (c_kl · ε → 0 since ε is infinitely small).",
    explanation: "ε represents an algebraic placeholder with volume approaching zero. In financial cost computation, c_kl · ε = 0.",
    hint: "Epsilon is a zero-volume placeholder and contributes 0 to the bill.",
    level: "intermediate",
    codeExample: "Cost(ε) = c_kl · 0 = 0."
  },
  {
    question: "Can the calculated initial cost Z ever be negative?",
    shortAnswer: "Only if government subsidies or rebates produce negative unit freight rates (c_ij < 0) that exceed all positive shipping costs.",
    explanation: "In standard logistics where all c_ij ≥ 0 and x_ij ≥ 0, Z is strictly non-negative (Z ≥ 0). If negative subsidies exist, Z can theoretically be negative (net revenue).",
    hint: "Standard transportation costs are always ≥ 0.",
    level: "intermediate",
    codeExample: "If all c_ij >= 0, then Z >= 0."
  },
  {
    question: "What check should you perform if your calculated initial cost Z is higher than the NWCR baseline for the same problem?",
    shortAnswer: "Immediately review your Matrix Minima cell selection; a higher cost than NWCR indicates that high-cost cells were mistakenly selected.",
    explanation: "While not theoretically impossible on pathological matrices, Matrix Minima almost always outperforms NWCR. A higher cost is a strong indicator of a manual calculation mistake.",
    hint: "Matrix Minima should beat NWCR in virtually all standard problems.",
    level: "basic",
    codeExample: "assert(Z_MatrixMinima <= Z_NWCR); // Standard sanity check"
  },
  {
    question: "In software engineering, why is it good practice to store the total cost Z as an explicit field on the solution object?",
    shortAnswer: "To avoid redundant O(m+n) recalculations when rendering UI dashboards, sorting candidate plans, or evaluating optimization delta.",
    explanation: "Caching `totalCost: number` on the solution payload allows instant access for UI displays and convergence comparisons.",
    hint: "Store the precomputed total on the result object for fast UI rendering.",
    level: "basic",
    codeExample: "const solution = { matrix: X, allocations, totalCost: 470 };"
  },
  {
    question: "How does calculating initial cost Z help determine the financial value of running subsequent MODI optimization?",
    shortAnswer: "Comparing Z_IBFS with Z_optimal reveals the additional rupee savings achieved by the optimization phase.",
    explanation: "If Matrix Minima yields Z = ₹470 and MODI yields Z_opt = ₹450, management can see that Matrix Minima captured 96% of maximum possible efficiency immediately.",
    hint: "Quantify the extra percentage saved by iterating to the global optimum.",
    level: "intermediate",
    codeExample: "Efficiency = (1 - ((Z_IBFS - Z_opt) / Z_IBFS)) * 100%."
  },
  {
    question: "What is the effect of changing the currency unit from Indian Rupees (₹) to Paise on the calculated value of Z?",
    shortAnswer: "The numerical value of Z multiplies by 100 (1 Rupee = 100 Paise), while the real physical logistics cost remains identical.",
    explanation: "Because Paise is 1/100th of a Rupee, each unit cost c_ij multiplies by 100, so Z_paise = 100 · Z_rupees.",
    hint: "Multiplying all rates by 100 multiplies the total by 100.",
    level: "basic",
    codeExample: "Z_paise = Z_inr * 100;"
  },
  {
    question: "If a company has a fixed logistics budget of ₹500, does Debangshu's Matrix Minima solution (Z = ₹470) meet the budget?",
    shortAnswer: "Yes, it leaves a budgetary surplus of ₹30 (₹500 - ₹470 = ₹30).",
    explanation: "The initial freight plan costs ₹470, which is comfortably within the ₹500 allocation.",
    hint: "470 <= 500.",
    level: "basic",
    codeExample: "Budget: 500, Cost: 470 ⇒ Surplus: 30."
  },
  {
    question: "Why is it important to clearly show currency symbols (₹) in industrial operations research reports?",
    shortAnswer: "To distinguish monetary financial metrics from physical volumetric quantities (tons, crates, cylinders, cartons).",
    explanation: "Using ₹ prevents ambiguity between physical inventory numbers (e.g. 50 units) and financial expenditures (e.g. ₹150), ensuring professional clarity.",
    hint: "Always label money with ₹ and volume with units.",
    level: "basic",
    codeExample: "Volume: 50 tons, Rate: ₹3/ton, Cost: ₹150."
  },
  {
    question: "Suppose Mamata's team wants to find the single most expensive route in her initial shipping plan. How is this identified?",
    shortAnswer: "Find argmax { c_ij · x_ij } across all basic allocations; in Case 2, it is Barrackpore → Howrah costing ₹210 (70 crates × ₹3).",
    explanation: "Evaluating individual route expenses reveals that Barrackpore→Howrah represents ₹210 out of the ₹490 total bill (42.8% of total expenditure).",
    hint: "Identify the route with the largest single product of quantity × unit rate.",
    level: "intermediate",
    codeExample: "Max single route cost: 70 crates * ₹3 = ₹210."
  },
  {
    question: "How does the calculation of total cost Z integrate with linear programming solver verification?",
    shortAnswer: "The calculated Z value is compared against the LP objective function value returned by the Simplex solver to verify consistency.",
    explanation: "Both manual matrix summation and solver dot products (c · x) must match to the exact integer, confirming mathematical equivalence.",
    hint: "Dot product of cost vector and allocation vector matches manual sum.",
    level: "expert",
    codeExample: "dotProduct(C.flatten(), X.flatten()) === Z;"
  },
  {
    question: "What happens to the total cost calculation if an allocated cell is mistakenly omitted from the sum?",
    shortAnswer: "The resulting cost Z will be artificially low, providing a false impression of shipping expenditure.",
    explanation: "Omitting a basic variable (e.g. leaving out 10 tons @ ₹6 = ₹60) understates total cost. Double-checking that exactly m + n - 1 terms are summed prevents this error.",
    hint: "Count the number of terms added to ensure none were skipped.",
    level: "basic",
    codeExample: "assert(terms.length === m + n - 1);"
  },
  {
    question: "What is the relationship between total cost Z and the transportation tableau cells?",
    shortAnswer: "Z is the sum of the products of each cell's circled quantity and its top-right unit rate in ₹.",
    explanation: "Visually, every cell containing a circled number x_ij contributes (circled number × corner rate) to the grand total Z.",
    hint: "Every circled number multiplies its corner price.",
    level: "basic",
    codeExample: "Z = ∑ (circled_volume * corner_rate)."
  },
  {
    question: "In Susmita's healthcare logistics problem, why was the final cost Z = ₹1,470 considered a success?",
    shortAnswer: "Because it delivered 100% of required oxygen cylinders to critical hospitals while saving ₹560 (27.6%) compared to the standard NWCR baseline.",
    explanation: "Achieving full hospital quota fulfillment at 27.6% below baseline expenditure demonstrated significant operational efficiency.",
    hint: "Fulfilled emergency demand while saving ₹560 against baseline.",
    level: "basic",
    codeExample: "Saved ₹560 vs ₹2,030 NWCR baseline."
  },
  {
    question: "How does automated testing verify the total cost computation in a React component?",
    shortAnswer: "By calculating the expected analytical dot product and asserting `expect(computedZ).toBe(expectedZ)`.",
    explanation: "Automated test suites run reference matrix fixtures and verify that the component's calculated cost matches analytical benchmarks.",
    hint: "Assert computed total equals known benchmark value.",
    level: "intermediate",
    codeExample: "expect(calculateTotalCost(allocations)).toBe(470);"
  },
  {
    question: "What is the primary takeaway for students regarding Initial Transportation Cost calculation?",
    shortAnswer: "Write down every allocated cell, compute its product with unit rate in ₹ clearly, and sum all m + n - 1 terms to establish the baseline cost Z.",
    explanation: "A disciplined, step-by-step product-and-sum routine ensures mathematical precision and sets up a rock-solid foundation for MODI optimality analysis.",
    hint: "Itemize every route product and sum all terms cleanly.",
    level: "basic",
    codeExample: "1. List routes; 2. Compute cost per route; 3. Sum grand total Z in ₹."
  }
];

export default questions;
