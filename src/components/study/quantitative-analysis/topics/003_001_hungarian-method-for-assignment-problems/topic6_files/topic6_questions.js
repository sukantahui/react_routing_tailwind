// topic6_questions.js
// 30 Moderate to Expert Questions on Adding Dummy Rows or Columns in Assignment Problems

const questions = [
  {
    question: "What is the primary mathematical purpose of adding dummy rows or dummy columns to an assignment cost matrix?",
    shortAnswer: "To transform an unbalanced (non-square m x n) matrix into a square (k x k) matrix (where k = max(m, n)), making it mathematically valid for the 5-step Hungarian Method.",
    explanation: "Hungarian matrix reductions require an equal number of rows and columns to preserve 1-to-1 bijection symmetry.",
    hint: "Makes the matrix square (k x k) for the Hungarian method.",
    level: "moderate",
    codeExample: "TargetDimension: k = max(m, n); SquareMatrix = augment_with_dummies(C, k)."
  },
  {
    question: "When should dummy ROWS be added to an assignment matrix?",
    shortAnswer: "When the number of available resources/workers (m) is LESS than the number of tasks (n), i.e., m < n (Task Deficit).",
    explanation: "Add n - m dummy rows with ₹0 costs across all columns.",
    hint: "When m < n (fewer rows than columns).",
    level: "moderate",
    codeExample: "if (m < n) { add_dummy_rows(count = n - m, cost = 0); }"
  },
  {
    question: "When should dummy COLUMNS be added to an assignment matrix?",
    shortAnswer: "When the number of available resources/workers (m) is GREATER than the number of tasks (n), i.e., m > n (Labor Surplus).",
    explanation: "Add m - n dummy columns with ₹0 costs down all rows.",
    hint: "When m > n (fewer columns than rows).",
    level: "moderate",
    codeExample: "if (m > n) { add_dummy_columns(count = m - n, cost = 0); }"
  },
  {
    question: "What unit cost must be assigned to the cells of a standard dummy row or column?",
    shortAnswer: "Exactly ₹0 across all entries (c_dummy,j = 0 or c_i,dummy = 0).",
    explanation: "Zero cost ensures dummy assignments incur zero monetary expenditure.",
    hint: "Exactly ₹0.",
    level: "moderate",
    codeExample: "c[dummy][j] = 0; c[i][dummy] = 0."
  },
  {
    question: "Suppose Debangshu in Barrackpore has a 3x5 matrix (3 workers and 5 jobs). How many dummy rows must he add?",
    shortAnswer: "2 dummy rows ( 5 - 3 = 2 dummy rows ), creating a balanced 5x5 matrix.",
    explanation: "5 columns - 3 rows = 2 dummy rows.",
    hint: "5 - 3 = 2 dummy rows.",
    level: "moderate",
    codeExample: "DummyRows = 5 - 3 = 2."
  },
  {
    question: "In Debangshu's 5x5 matrix above, how many dummy cells of ₹0 are created in total?",
    shortAnswer: "10 dummy zero cells ( 2 dummy rows x 5 columns = 10 cells ).",
    explanation: "2 rows * 5 cols = 10 zero entries.",
    hint: "2 x 5 = 10 zero cells.",
    level: "moderate",
    codeExample: "TotalDummyCells = 2 * 5 = 10."
  },
  {
    question: "How does the presence of a dummy row of all ₹0 entries affect the Column Reduction step?",
    shortAnswer: "Every column already contains a ₹0 in the dummy row, making the column minimum automatically 0 (min = 0); therefore, subtracting column minimums leaves the matrix 100% unchanged!",
    explanation: "Column reduction is effectively bypassed when a dummy row of zeros is present.",
    hint: "Column minimums are all 0, so column reduction leaves values unchanged.",
    level: "expert",
    codeExample: "col_min = min(col_entries union {0}) = 0 => ColReduction is a no-op."
  },
  {
    question: "Suppose Susmita in Ichapur has a 4x3 matrix (4 store managers and 3 branches). How many dummy columns must she add?",
    shortAnswer: "1 dummy column ( 4 - 3 = 1 dummy column with ₹0 costs ), creating a balanced 4x4 matrix.",
    explanation: "4 rows - 3 columns = 1 dummy column.",
    hint: "4 - 3 = 1 dummy column.",
    level: "moderate",
    codeExample: "DummyCols = 4 - 3 = 1."
  },
  {
    question: "How does the presence of a dummy column of all ₹0 entries affect the Row Reduction step?",
    shortAnswer: "Every row already contains a ₹0 in the dummy column, making the row minimum automatically 0 (min = 0); therefore, row reduction leaves all rows unchanged!",
    explanation: "Row reduction is effectively bypassed when a dummy column of zeros is present.",
    hint: "Row minimums are all 0, so row reduction leaves values unchanged.",
    level: "expert",
    codeExample: "row_min = min(row_entries union {0}) = 0 => RowReduction is a no-op."
  },
  {
    question: "What is a 'Prohibited Dummy Assignment'?",
    shortAnswer: "A situation where a critical task CANNOT be outsourced to a dummy row; handled by assigning a huge penalty cost M (or Infinity) to that specific dummy cell (c_dummy,j = M).",
    explanation: "Forces the solver to assign a REAL internal worker to that critical task.",
    hint: "Assign Big-M to c_dummy,j to force an internal assignment.",
    level: "expert",
    codeExample: "Prohibited Dummy: c[dummy][critical_task] = Infinity (M)."
  },
  {
    question: "Suppose Mamata in Kolkata has 3 defense lawyers and 4 legal briefs. Brief 4 involves a capital murder trial and MUST NOT be outsourced. How should she configure cell (Dummy, 4)?",
    shortAnswer: "Set c_Dummy,4 = M (where M is a very large penalty like ₹99,999), forcing the Hungarian algorithm to match a real attorney to Brief 4.",
    explanation: "Assigning M to the dummy cell prevents outsourcing of that sensitive legal case.",
    hint: "Set c_Dummy,4 = M.",
    level: "expert",
    codeExample: "c[Dummy][4] = 99999 (Big-M)."
  },
  {
    question: "Suppose in a 4x4 balanced matrix (3 real rows + 1 dummy row), the optimal assignment is: (1➔2)=₹14, (2➔4)=₹18, (3➔1)=₹16, (Dummy➔3)=₹0. What is the total monetary cost Z*?",
    shortAnswer: "₹48 ( ₹14 + ₹18 + ₹16 + ₹0 = ₹48 ).",
    explanation: "14 + 18 + 16 + 0 = ₹48. Task 3 is outsourced.",
    hint: "14 + 18 + 16 = 48.",
    level: "moderate",
    codeExample: "Z_opt = 14 + 18 + 16 + 0 = ₹48"
  },
  {
    question: "In the solution above, what is the status of Task 3?",
    shortAnswer: "Task 3 is assigned to the Dummy Row, meaning Task 3 is outsourced or deferred to the next shift.",
    explanation: "Dummy row allocation denotes unfulfilled internal task.",
    hint: "Task 3 is outsourced/deferred.",
    level: "moderate",
    codeExample: "Task 3 Status = Outsourced / Deferred."
  },
  {
    question: "Suppose in a 4x4 balanced matrix (4 real rows + 1 dummy column), the optimal assignment is: (1➔1)=₹20, (2➔Dummy)=₹0, (3➔3)=₹30, (4➔2)=₹25. What is the status of Worker 2?",
    shortAnswer: "Worker 2 is assigned to the Dummy Column, meaning Worker 2 remains IDLE on standby.",
    explanation: "Dummy column allocation denotes unassigned idle worker.",
    hint: "Worker 2 is idle on standby.",
    level: "moderate",
    codeExample: "Worker 2 Status = Idle / Standby."
  },
  {
    question: "What is the total expenditure for the problem above?",
    shortAnswer: "₹75 ( ₹20 + ₹0 + ₹30 + ₹25 = ₹75 ).",
    explanation: "20 + 0 + 30 + 25 = ₹75.",
    hint: "20 + 30 + 25 = 75.",
    level: "moderate",
    codeExample: "Z_opt = 20 + 0 + 30 + 25 = ₹75"
  },
  {
    question: "Can an unbalanced 5x2 problem be solved by adding dummy columns?",
    shortAnswer: "Yes, by adding 5 - 2 = 3 dummy columns with ₹0 costs, transforming it into a 5x5 square matrix.",
    explanation: "5 rows requires 5 columns; 5 - 2 = 3 dummy columns.",
    hint: "Add 3 dummy columns to make it 5x5.",
    level: "moderate",
    codeExample: "DummyCols = 5 - 2 = 3."
  },
  {
    question: "Suppose Mahima in Barrackpore adds 2 dummy rows to a 3x5 matrix. How many lines are needed to cover all zeros in the dummy rows during König's line test?",
    shortAnswer: "Exactly 2 horizontal lines (one covering Dummy Row 1, one covering Dummy Row 2).",
    explanation: "Each dummy row consists entirely of 0s, so a single horizontal line covers all 5 zeros in that row.",
    hint: "2 horizontal lines cover the 2 dummy rows.",
    level: "expert",
    codeExample: "LineCoverage(DummyRows) = 2 horizontal lines."
  },
  {
    question: "Why should an operations researcher NEVER assign negative numbers to dummy cells?",
    shortAnswer: "Because negative numbers would falsely represent dummy assignments as generating revenue/subsidies, causing the solver to artificially favor dummy routes over real operations.",
    explanation: "Dummy rates must accurately represent zero physical cost (₹0).",
    hint: "Negative dummy costs distort the objective function.",
    level: "expert",
    codeExample: "Fatal Error: Setting c[dummy] < 0 artificially distorts matching."
  },
  {
    question: "Suppose Abhronila in Jadavpur has 4 textbook orders and only 2 binding machines (2 x 4). How many dummy rows are needed, and how many textbook orders will be outsourced?",
    shortAnswer: "2 dummy rows are needed; exactly 2 textbook orders will be outsourced to external binderies.",
    explanation: "4 orders - 2 machines = 2 dummy rows = 2 outsourced orders.",
    hint: "2 dummy rows; 2 orders outsourced.",
    level: "moderate",
    codeExample: "DummyRows = 2; OutsourcedOrders = 2."
  },
  {
    question: "What currency symbol must ALWAYS be used when reporting assignment costs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Minimum Cost Z* = ₹48'"
  },
  {
    question: "What is the ultimate golden rule of Adding Dummy Rows or Columns?",
    shortAnswer: "'If rows < cols, add (cols - rows) dummy rows with ₹0 rates; if cols < rows, add (rows - cols) dummy columns with ₹0 rates; apply Big-M to prohibited dummy cells; solve the square matrix; real cells give cost, dummy cells give idle or outsourced capacity!'",
    explanation: "This complete rule captures all structural and operational aspects of dummy balancing.",
    hint: "Rows < Cols → Dummy Rows (₹0); Cols < Rows → Dummy Cols (₹0); Big-M for non-outsourced.",
    level: "moderate",
    codeExample: "Golden Rule: DimCheck → Add Dummy Lines (₹0) → Big-M Barriers → Solve Square Matrix."
  }
];

export default questions;
