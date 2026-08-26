// topic10_questions.js
// 30 Structured Questions covering Dynamic Two-Way Lookups & Spilling with XLOOKUP

const questions = [
  {
    question: "How does XLOOKUP return an entire multi-column record in a single dynamic array formula?",
    shortAnswer: "By supplying a multi-column range to the return_array argument: =XLOOKUP(key, key_col, B2:G50).",
    explanation: "Because XLOOKUP is dynamic array aware, passing a 6-column matrix to `return_array` causes XLOOKUP to spill all 6 columns horizontally from the origin cell.",
    hint: "Pass a multi-column matrix as the return_array argument.",
    level: "basic",
    codeExample: "=XLOOKUP(\"TX-1001\", A2:A20, B2:H20)"
  },
  {
    question: "How do you construct a dynamic two-way intersection lookup (Row & Column) using nested XLOOKUP?",
    shortAnswer: "=XLOOKUP(RowValue, RowHeaders, XLOOKUP(ColValue, ColHeaders, MatrixBody))",
    explanation: "The inner XLOOKUP locates the target column header and returns that entire column vector. The outer XLOOKUP finds the row value within that returned column, pinpointing the intersection.",
    hint: "Nest an inner XLOOKUP for the column inside an outer XLOOKUP for the row.",
    level: "moderate",
    codeExample: "=XLOOKUP(J1, A2:A10, XLOOKUP(J2, B1:F1, B2:F10))"
  },
  {
    question: "How does XLOOKUP handle multiple lookup keys simultaneously using the spill operator (#)?",
    shortAnswer: "Pass the spilled key range into lookup_value: =XLOOKUP(A2#, MasterIDs, MasterData).",
    explanation: "When given an array of keys (e.g. `A2#`), XLOOKUP evaluates every key in parallel and spills a complete 2D or 1D result matrix without dragging formulas.",
    hint: "Pass OriginCell# into the lookup_value argument.",
    level: "moderate",
    codeExample: "=XLOOKUP(InvoiceIDs#, MasterTable[ID], MasterTable[Total])"
  },
  {
    question: "What is the advantage of nested XLOOKUP over the legacy INDEX/MATCH/MATCH two-way lookup?",
    shortAnswer: "Nested XLOOKUP defaults to exact match, has built-in [if_not_found] error handling, and does not require complex index coordinate calculations.",
    explanation: "Legacy `INDEX(..., MATCH(...), MATCH(...))` requires 3 separate functions and manual 0 exact match flags. Nested XLOOKUP is cleaner, faster, and self-contained.",
    hint: "Cleaner syntax, default exact match, and built-in error handling.",
    level: "moderate",
    codeExample: "=XLOOKUP(Course, CourseList, XLOOKUP(Branch, BranchList, FeeMatrix), \"Not Found\")"
  },
  {
    question: "How do you provide a fallback message when a two-way XLOOKUP lookup fails to find a match?",
    shortAnswer: "Supply the [if_not_found] argument in the outer (and inner) XLOOKUP.",
    explanation: "Setting the 4th argument `[if_not_found]` to `\"Invalid Selection\"` prevents `#N/A` errors from surfacing on dashboards.",
    hint: "Use the 4th parameter of XLOOKUP.",
    level: "basic",
    codeExample: "=XLOOKUP(J1, A2:A6, XLOOKUP(J2, B1:F1, B2:F6), \"Combination Not Found\")"
  },
  {
    question: "Can XLOOKUP perform a lookup from bottom to top (last occurrence)?",
    shortAnswer: "Yes, by setting search_mode to -1: =XLOOKUP(key, key_col, return_col, , , -1).",
    explanation: "Passing `-1` to the 6th argument `[search_mode]` instructs XLOOKUP to search from the last row upward, finding the most recent transaction entry.",
    hint: "Set search_mode to -1.",
    level: "moderate",
    codeExample: "=XLOOKUP(\"Swadeep Roy\", A2:A100, G2:G100, \"No Tx\", 0, -1)"
  },
  {
    question: "How do you perform a wildcard search (e.g. name begins with 'Swa*') in XLOOKUP?",
    shortAnswer: "Set match_mode to 2: =XLOOKUP(\"Swa*\", A2:A50, B2:E50, \"Not Found\", 2).",
    explanation: "Setting the 5th argument `[match_mode]` to `2` enables wildcard matching with `*` and `?`.",
    hint: "Set match_mode to 2 for wildcard lookups.",
    level: "moderate",
    codeExample: "=XLOOKUP(\"Swa*\", B2:B20, D2:D20, \"Not Found\", 2)"
  },
  {
    question: "What happens if a multi-column spilled XLOOKUP encounters an occupied cell in its horizontal spill path?",
    shortAnswer: "It returns a #SPILL! error until the horizontal obstruction is cleared.",
    explanation: "If XLOOKUP attempts to spill 5 columns across `J2:N2` and `L2` contains text, `#SPILL!` is raised.",
    hint: "Clear any obstructing data in the horizontal spill path.",
    level: "basic",
    codeExample: "// Delete values in the projected horizontal path to resolve #SPILL!"
  },
  {
    question: "Can XLOOKUP return a dynamic vertical column vector when looking up horizontally across headers?",
    shortAnswer: "Yes, passing a 2D matrix to return_array with a horizontal lookup_array returns the entire vertical column corresponding to the matched header.",
    explanation: "`=XLOOKUP(\"Barrackpore\", B1:F1, B2:F20)` returns all 19 rows of the Barrackpore column vector.",
    hint: "Horizontal lookup + 2D return matrix = vertical column vector output.",
    level: "advanced",
    codeExample: "=XLOOKUP(\"Barrackpore\", B1:F1, B2:F20)"
  },
  {
    question: "How do you extract the entire row for the top-scoring student in one step?",
    shortAnswer: "Use =XLOOKUP(MAX(ScoreCol), ScoreCol, FullTable).",
    explanation: "`MAX(ScoreCol)` finds the highest test score, and `XLOOKUP` retrieves the complete multi-column record for that student.",
    hint: "Use MAX(Range) as the lookup_value.",
    level: "moderate",
    codeExample: "=XLOOKUP(MAX(ScoreRange), ScoreRange, StudentMasterTable)"
  },
  {
    question: "How do you perform approximate tiered tax or fee slab lookups with XLOOKUP?",
    shortAnswer: "Set match_mode to -1 (exact match or next smaller item) or 1 (exact match or next larger item).",
    explanation: "Setting `match_mode = -1` matches progressive income tax and discount rate brackets without requiring legacy VLOOKUP approximate sorting.",
    hint: "Use match_mode = -1 for next smaller bracket.",
    level: "moderate",
    codeExample: "=XLOOKUP(TaxableIncome, TaxBrackets, TaxRates, , -1)"
  },
  {
    question: "How do you reference the spilled output of a multi-column XLOOKUP formula downstream?",
    shortAnswer: "Append '#' to the origin cell (e.g. J2#).",
    explanation: "`J2#` represents the full horizontal spilled record, allowing functions like `INDEX(J2#, 1, 3)` or `TEXTJOIN(\" - \", TRUE, J2#)`.",
    hint: "Use OriginCell#.",
    level: "basic",
    codeExample: "=TEXTJOIN(\" | \", TRUE, J2#)"
  },
  {
    question: "How do you perform a lookup based on multiple criteria (e.g. Match Student AND City) using XLOOKUP?",
    shortAnswer: "Use lookup_value = 1 and multiply boolean arrays: =XLOOKUP(1, (NameCol=\"Swadeep\") * (CityCol=\"Barrackpore\"), ReturnMatrix).",
    explanation: "Multiplying conditions returns an array of 0s and 1s. Looking up `1` isolates the record where both conditions are TRUE.",
    hint: "Use =XLOOKUP(1, (Cond1) * (Cond2), ReturnMatrix).",
    level: "advanced",
    codeExample: "=XLOOKUP(1, (B2:B20=\"Swadeep Roy\") * (C2:C20=\"Barrackpore\"), D2:G20)"
  },
  {
    question: "Can XLOOKUP look up values in reverse order (right-to-left) unlike legacy VLOOKUP?",
    shortAnswer: "Yes, XLOOKUP can look up in any column and return from any column to the left or right.",
    explanation: "Because lookup_array and return_array are separate parameters, column order is completely unrestricted.",
    hint: "XLOOKUP supports right-to-left and bottom-to-top lookups natively.",
    level: "basic",
    codeExample: "=XLOOKUP(D2, D2:D20, A2:A20) // Looks up in col D and returns from col A"
  },
  {
    question: "How do you return multiple non-contiguous columns (e.g. columns 1, 3, and 7) with XLOOKUP?",
    shortAnswer: "Combine XLOOKUP with CHOOSECOLS: =CHOOSECOLS(XLOOKUP(key, key_col, FullTable), 1, 3, 7).",
    explanation: "`XLOOKUP` retrieves the full record, and `CHOOSECOLS` extracts only the desired column positions.",
    hint: "Wrap XLOOKUP in CHOOSECOLS.",
    level: "advanced",
    codeExample: "=CHOOSECOLS(XLOOKUP(\"TX-1001\", A2:A20, A2:G20), 1, 3, 7)"
  },
  {
    question: "What is the memory and performance advantage of vectorized XLOOKUP over thousands of individual cell lookups?",
    shortAnswer: "Vectorized lookups run in a single compiled pass, avoiding thousands of individual formula node graph evaluations.",
    explanation: "A single `=XLOOKUP(Keys#, MasterIDs, MasterData)` formula executes in milliseconds, whereas 10,000 individual formulas cause noticeable calculation lag.",
    hint: "Single array formula vs 10,000 individual cell calculations.",
    level: "expert",
    codeExample: "=XLOOKUP(ID_List#, Master_Table[ID], Master_Table[Details])"
  },
  {
    question: "How do you look up the second-to-last transaction for a specific customer?",
    shortAnswer: "Filter the customer's transactions first, then take the second-to-last item using CHOOSEROWS or INDEX.",
    explanation: "`=CHOOSEROWS(FILTER(SalesTable, CustomerCol=\"Swadeep Roy\"), -2)` extracts the second-to-last row.",
    hint: "Use FILTER and CHOOSEROWS with negative index (-2).",
    level: "advanced",
    codeExample: "=CHOOSEROWS(FILTER(SalesTable, CustomerCol=\"Swadeep Roy\"), -2)"
  },
  {
    question: "Can XLOOKUP return an Excel range reference that can be passed directly into SUM (e.g. SUM(XLOOKUP(...):XLOOKUP(...)))?",
    shortAnswer: "Yes, XLOOKUP returns a true cell reference, enabling dynamic range colon (:) constructions.",
    explanation: "`=SUM(XLOOKUP(\"Jan\", Months, Sales):XLOOKUP(\"Jun\", Months, Sales))` calculates the sum of all months between January and June dynamically.",
    hint: "XLOOKUP returns cell references that support the range colon (:) operator.",
    level: "expert",
    codeExample: "=SUM(XLOOKUP(\"Q1\", Quarters, Revenue):XLOOKUP(\"Q3\", Quarters, Revenue))"
  },
  {
    question: "What happens if lookup_array and return_array have different lengths in XLOOKUP?",
    shortAnswer: "Excel returns a #VALUE! error.",
    explanation: "Both arrays must share identical dimension height (or width).",
    hint: "Dimensions of lookup_array and return_array must match exactly.",
    level: "basic",
    codeExample: "=XLOOKUP(J1, A2:A20, B2:B25) // Returns #VALUE!"
  },
  {
    question: "How do you look up an exact date and return the corresponding financial quarter rate?",
    shortAnswer: "Use XLOOKUP with match_mode = 0 (exact) or -1 (exact or next smaller date).",
    explanation: "Dates evaluate as numeric serials, matching either the exact date or the active effective rate period.",
    hint: "Use match_mode = -1 for effective date rate lookups.",
    level: "moderate",
    codeExample: "=XLOOKUP(InvoiceDate, RateEffectiveDates, Rates, \"No Rate\", -1)"
  },
  {
    question: "Can you pass an Excel Table column into XLOOKUP return_array?",
    shortAnswer: "Yes, structured references like Table1[[ColA]:[ColF]] spill multiple columns seamlessly.",
    explanation: "Structured bracket notation allows clean multi-column table slicing in dynamic array lookups.",
    hint: "Use TableName[[StartCol]:[EndCol]].",
    level: "moderate",
    codeExample: "=XLOOKUP(J1, Table1[Student_ID], Table1[[Student_Name]:[Course_Fee]])"
  },
  {
    question: "How do you build a dynamic price lookup portal with 2 dropdowns (Course and Branch)?",
    shortAnswer: "Use nested XLOOKUP: =XLOOKUP(SelectedCourse, CourseCol, XLOOKUP(SelectedBranch, BranchHeaders, PriceMatrix)).",
    explanation: "As users change either dropdown, the formula instantaneously fetches the exact branch-specific price.",
    hint: "Combine two dropdown cells with nested XLOOKUP.",
    level: "moderate",
    codeExample: "=XLOOKUP(J1, CourseList, XLOOKUP(J2, BranchHeaders, PriceGrid), \"Unavailable\")"
  },
  {
    question: "How do you combine XLOOKUP with UNIQUE to generate a deduplicated master summary table?",
    shortAnswer: "Feed UNIQUE into the lookup_value argument: =XLOOKUP(UNIQUE(A2:A50), A2:A50, B2:G50).",
    explanation: "`UNIQUE(A2:A50)` extracts the distinct IDs, and `XLOOKUP` retrieves the first matching row for every unique ID, spilling a complete deduplicated table.",
    hint: "Pass UNIQUE(Keys) into XLOOKUP's lookup_value.",
    level: "expert",
    codeExample: "=XLOOKUP(UNIQUE(A2:A50), A2:A50, B2:G50)"
  },
  {
    question: "How do you perform binary search for ultra-fast lookup on sorted data using XLOOKUP?",
    shortAnswer: "Set search_mode to 2 (binary search ascending) or -2 (binary search descending).",
    explanation: "Binary search runs in $O(\log N)$ logarithmic time, locating items across 1,000,000 rows in microseconds.",
    hint: "Set search_mode = 2 for sorted binary search.",
    level: "expert",
    codeExample: "=XLOOKUP(Key, SortedIDs, SortedData, , 0, 2)"
  },
  {
    question: "Why does XLOOKUP replace HLOOKUP for horizontal lookups?",
    shortAnswer: "XLOOKUP handles both horizontal and vertical lookups natively, eliminating the need for separate HLOOKUP and VLOOKUP functions.",
    explanation: "If lookup_array and return_array are horizontal rows, XLOOKUP executes horizontally with full dynamic array spilling.",
    hint: "XLOOKUP replaces both VLOOKUP and HLOOKUP in one unified function.",
    level: "basic",
    codeExample: "=XLOOKUP(\"Q3\", B1:M1, B2:M2)"
  },
  {
    question: "How do you handle case-sensitive lookups using XLOOKUP?",
    shortAnswer: "Use EXACT inside XLOOKUP: =XLOOKUP(TRUE, EXACT(TargetKey, KeyCol), ReturnMatrix).",
    explanation: "`EXACT()` performs binary string comparison, and `XLOOKUP` matches `TRUE` to find the exact case-sensitive match.",
    hint: "Use =XLOOKUP(TRUE, EXACT(Key, Range), ReturnMatrix).",
    level: "advanced",
    codeExample: "=XLOOKUP(TRUE, EXACT(\"Swadeep Roy\", B2:B20), D2:G20, \"Not Found\")"
  },
  {
    question: "Can you return multiple columns in a specific reversed order using XLOOKUP and CHOOSECOLS?",
    shortAnswer: "Yes: =CHOOSECOLS(XLOOKUP(key, key_col, FullMatrix), 4, 3, 2, 1).",
    explanation: "`CHOOSECOLS` reorders the returned columns into custom layouts dynamically.",
    hint: "Combine CHOOSECOLS with XLOOKUP.",
    level: "advanced",
    codeExample: "=CHOOSECOLS(XLOOKUP(J1, A2:A20, B2:E20), 4, 3, 2, 1)"
  },
  {
    question: "What happens if a two-way XLOOKUP finds the column header but not the row header?",
    shortAnswer: "The outer XLOOKUP fails and returns the [if_not_found] fallback or #N/A.",
    explanation: "Both lookups must succeed to return an intersection value.",
    hint: "Both dimensions must resolve successfully.",
    level: "basic",
    codeExample: "// Returns 'Not Found' if either row or column key does not exist"
  },
  {
    question: "How do you look up the maximum discount rate for a specific customer type?",
    shortAnswer: "Use MAX inside XLOOKUP or MAX(FILTER(DiscountCol, TypeCol=\"Corporate\")).",
    explanation: "`MAX(FILTER(...))` isolates the customer tier and finds the highest rate in memory.",
    hint: "Combine MAX with FILTER or XLOOKUP.",
    level: "moderate",
    codeExample: "=MAX(FILTER(DiscountCol, TierCol=\"Corporate\"))"
  },
  {
    question: "Why is multi-column spilling XLOOKUP the backbone of modern ERP and CRM lookup portals?",
    shortAnswer: "It retrieves complete customer profiles, voucher details, and product specs in a single live equation without fragile formula grids.",
    explanation: "In enterprise accounting and ERP implementations across Barrackpore and Kolkata, multi-column spilled XLOOKUP eliminates manual lookup errors and guarantees 100% data consistency.",
    hint: "Spilled XLOOKUP guarantees atomic multi-column data retrieval with zero formula clutter.",
    level: "expert",
    codeExample: "// Portal Architecture: Search Key -> XLOOKUP -> Spilled 6-Column Profile Matrix"
  }
];

export default questions;
