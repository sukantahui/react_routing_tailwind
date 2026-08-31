// topic5_questions.js
// 30 Moderate to Expert Questions on Unbalanced Assignment Problems

const questions = [
  {
    question: "What is an Unbalanced Assignment Problem?",
    shortAnswer: "An assignment problem where the number of available resources (m) does NOT equal the number of required tasks (n), resulting in a non-square (m x n) cost matrix.",
    explanation: "Total resource supply Sum S_i = m does not match total task demand Sum D_j = n.",
    hint: "Number of resources does not equal number of tasks (m != n).",
    level: "moderate",
    codeExample: "Unbalanced Condition: m !== n (Non-square matrix C in R^(m x n))."
  },
  {
    question: "What are the two possible operational scenarios in an unbalanced assignment problem?",
    shortAnswer: "Scenario A: m > n (More workers than jobs, resulting in surplus idle workers); Scenario B: m < n (More jobs than workers, resulting in unperformed/outsourced tasks).",
    explanation: "Both scenarios create an asymmetry that must be balanced with dummy entities.",
    hint: "m > n (Worker Surplus) or m < n (Task Deficit).",
    level: "moderate",
    codeExample: "Scenario A: m > n (Idle Workers); Scenario B: m < n (Unperformed Tasks)."
  },
  {
    question: "Why CANNOT the Hungarian Method be applied directly to a non-square (m x n) matrix?",
    shortAnswer: "Because row reductions and column reductions require an equal number of dimensions; without a square matrix, lines covering zeros and 1-to-1 bijection matching fail mathematically.",
    explanation: "A square matrix structure is mandatory for symmetric dual potential propagation.",
    hint: "Hungarian method requires a square n x n matrix for symmetric dual reduction.",
    level: "expert",
    codeExample: "Hungarian Prerequisite: Assert(Rows === Cols)."
  },
  {
    question: "How is an unbalanced assignment problem mathematically converted into a balanced problem?",
    shortAnswer: "By introducing artificial Dummy Rows (if m < n) or Dummy Columns (if m > n) with unit costs of exactly ₹0 across all entries.",
    explanation: "Adding dummy lines with zero cost balances dimensions without adding physical monetary expense.",
    hint: "Add dummy rows or columns with unit costs of ₹0.",
    level: "moderate",
    codeExample: "Balancing: if (m < n) add_dummy_rows(n - m, cost=0); if (m > n) add_dummy_cols(m - n, cost=0);"
  },
  {
    question: "What does it physically mean if Worker 2 is assigned to a Dummy Task in the optimal solution?",
    shortAnswer: "It means Worker 2 is NOT assigned to any real physical task and remains IDLE on standby (incurring ₹0 additional production cost).",
    explanation: "Dummy tasks represent idle capacity.",
    hint: "Worker 2 remains idle with zero additional cost.",
    level: "moderate",
    codeExample: "Assignment to Dummy Col => Real Worker is Idle."
  },
  {
    question: "What does it physically mean if a Dummy Worker is assigned to Task 3 in the optimal solution?",
    shortAnswer: "It means Task 3 cannot be executed by internal personnel and remains UNPERFORMED, deferred, or outsourced to a 3rd-party contractor.",
    explanation: "Dummy workers represent unmet task demand.",
    hint: "Task 3 remains unperformed or outsourced.",
    level: "moderate",
    codeExample: "Dummy Row assigned to Task => Task is Unperformed / Outsourced."
  },
  {
    question: "Suppose Debangshu in Barrackpore has 5 casting supervisors and only 3 furnaces. How many dummy columns must he add?",
    shortAnswer: "2 dummy columns ( 5 - 3 = 2 dummy columns with ₹0 costs ), creating a balanced 5x5 matrix.",
    explanation: "5 supervisors - 3 furnaces = 2 dummy columns.",
    hint: "5 - 3 = 2 dummy columns.",
    level: "moderate",
    codeExample: "DummyColsCount = 5 - 3 = 2."
  },
  {
    question: "In Debangshu's 5x5 balanced problem above, how many supervisors will be assigned to REAL furnaces, and how many will be IDLE?",
    shortAnswer: "3 supervisors will be assigned to real furnaces, and 2 supervisors will be assigned to dummy columns (idle).",
    explanation: "3 real assignments + 2 idle assignments = 5 total allocations.",
    hint: "3 real furnace assignments, 2 idle supervisors.",
    level: "moderate",
    codeExample: "Real Assignments = 3; Idle Personnel = 2."
  },
  {
    question: "Suppose Susmita in Ichapur has 3 clinic vans and 4 emergency health wards (3 x 4 matrix). How many dummy rows must she add?",
    shortAnswer: "1 dummy row ( 4 - 3 = 1 dummy row with ₹0 costs ), creating a balanced 4x4 matrix.",
    explanation: "4 wards - 3 vans = 1 dummy row.",
    hint: "4 - 3 = 1 dummy row.",
    level: "moderate",
    codeExample: "DummyRowsCount = 4 - 3 = 1."
  },
  {
    question: "In Susmita's 4x4 problem above, what happens to the clinic ward assigned to the dummy row?",
    shortAnswer: "That specific clinic ward receives zero internal vans and must be serviced via emergency ambulance outsourcing.",
    explanation: "The dummy row identifies the optimal clinic to outsource to minimize overall freight penalty.",
    hint: "That clinic ward is outsourced or deferred.",
    level: "intermediate",
    codeExample: "Dummy Row pairing identifies the optimal outsourced destination."
  },
  {
    question: "Why do dummy cells ALWAYS have unit costs of ₹0 instead of a positive number?",
    shortAnswer: "Because assigning a worker to sit idle or leaving a task unperformed involves zero physical transportation/processing expenditure.",
    explanation: "Zero cost ensures dummy cells do not distort actual operational expenses.",
    hint: "Dummy allocations incur zero physical processing charges.",
    level: "moderate",
    codeExample: "DummyCost = 0 * x_dummy = ₹0."
  },
  {
    question: "Suppose a dummy row is added with ₹0 costs. When performing Column Reduction on a column that already contains a ₹0 in the dummy row, what is the column minimum?",
    shortAnswer: "The column minimum is ₹0 (min(..., 0) = 0), so subtracting the column minimum leaves all elements in that column unchanged!",
    explanation: "The presence of ₹0 in the dummy row makes the column minimum automatically 0.",
    hint: "Column minimum is 0, so column values remain unchanged.",
    level: "expert",
    codeExample: "col_min = min(col_values union {0}) = 0."
  },
  {
    question: "Suppose Mamata in Kolkata solves an unbalanced 3x4 legal case assignment problem where augmented matrix has optimal assignments: (1➔1)=₹15, (2➔3)=₹25, (3➔4)=₹20, (Dummy➔2)=₹0. What is the total monetary cost Z*?",
    shortAnswer: "₹60 ( ₹15 + ₹25 + ₹20 + ₹0 = ₹60 ).",
    explanation: "15 + 25 + 20 + 0 = ₹60. Case 2 is assigned to the dummy row (outsourced).",
    hint: "15 + 25 + 20 + 0 = 60.",
    level: "moderate",
    codeExample: "Z_opt = 15 + 25 + 20 + 0 = ₹60"
  },
  {
    question: "In Mamata's problem above, which legal case was outsourced?",
    shortAnswer: "Case 2 (since it was paired with the Dummy Row).",
    explanation: "The Dummy row matched with Column 2.",
    hint: "Case 2 was assigned to the dummy row.",
    level: "moderate",
    codeExample: "Outsourced Case = Case 2."
  },
  {
    question: "Can an unbalanced problem have multiple dummy rows and multiple dummy columns simultaneously?",
    shortAnswer: "No, because a matrix cannot be simultaneously wider than it is tall AND taller than it is wide; you either add dummy rows (if m < n) OR dummy columns (if m > n), never both.",
    explanation: "Only the deficit dimension is augmented.",
    hint: "Either dummy rows OR dummy columns, never both.",
    level: "intermediate",
    codeExample: "Augmentation: Add either rows or cols based on sign of (m - n)."
  },
  {
    question: "Suppose Mahima in Barrackpore has 4 machines and 6 jobs (4 x 6). What is the size of the balanced matrix?",
    shortAnswer: "6 x 6 (adding 2 dummy rows with ₹0 costs).",
    explanation: "6 columns requires 6 rows; 6 - 4 = 2 dummy rows.",
    hint: "6 x 6 matrix.",
    level: "moderate",
    codeExample: "Balanced Matrix Shape = 6 x 6."
  },
  {
    question: "How many possible assignment permutations exist in Mahima's 6x6 balanced matrix?",
    shortAnswer: "720 permutations ( 6! = 720 ).",
    explanation: "6! = 720.",
    hint: "6! = 720.",
    level: "moderate",
    codeExample: "6! = 720 permutations."
  },
  {
    question: "Suppose Abhronila in Jadavpur has 5 print presses and 4 textbook binding runs (5 x 4). How many presses will remain idle?",
    shortAnswer: "Exactly 1 press will remain idle ( 5 - 4 = 1 idle press, assigned to the dummy column ).",
    explanation: "5 presses - 4 runs = 1 idle press.",
    hint: "1 press will remain idle.",
    level: "moderate",
    codeExample: "Idle Presses = 5 - 4 = 1."
  },
  {
    question: "How does the Hungarian Method decide WHICH specific press remains idle in Abhronila's problem?",
    shortAnswer: "The Hungarian Method automatically selects the press whose exclusion results in the lowest possible total operational cost across the remaining 4 binding runs.",
    explanation: "Optimization identifies the least cost-effective resource to bench.",
    hint: "Selects the press that minimizes total remaining operational cost.",
    level: "expert",
    codeExample: "Optimal Idle Selection = argmin Z(Press_Excluded)."
  },
  {
    question: "What happens if an operations researcher forgets to add dummy lines to a 3x4 matrix and tries to solve it?",
    shortAnswer: "The Hungarian Method will fail or produce an invalid, non-square schedule where 1-to-1 constraints are mathematically violated.",
    explanation: "Row and column operations are invalid on non-square matrices.",
    hint: "Algorithm fails and produces invalid non-square allocations.",
    level: "intermediate",
    codeExample: "Fatal Error: Attempting Hungarian reduction on non-square matrix."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating assignment costs for West Bengal enterprises?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Minimum Cost Z* = ₹60'"
  },
  {
    question: "What is the ultimate golden rule of Unbalanced Assignment Problems?",
    shortAnswer: "'Check matrix shape (m x n); if m != n, add |m - n| dummy rows or columns with ₹0 costs to make it square; execute standard 5-step Hungarian solver; real allocations determine cost, dummy allocations identify idle or outsourced capacity!'",
    explanation: "This complete rule captures all handling of unbalanced assignment problems.",
    hint: "Check m!=n → Add ₹0 dummy lines → Solve Hungarian → Real cells give cost, dummy cells give idle capacity.",
    level: "moderate",
    codeExample: "Golden Rule: Check m!=n → Add Dummy Lines (₹0) → Solve Square Matrix → Report Z* & Idle Entities."
  }
];

export default questions;
