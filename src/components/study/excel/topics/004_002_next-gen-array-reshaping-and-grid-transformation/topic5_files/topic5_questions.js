// topic5_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 5
// Topic: Extracting Top N or Bottom N Records from Arrays with TAKE
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of TAKE in Excel 365?",
    shortAnswer: "It extracts a specified subset of contiguous rows and/or columns from the start or end of an array.",
    explanation: "TAKE extracts a contiguous sub-matrix from the perimeter of a 2D array or range, allowing modelers to easily pull Top N, Bottom N, Left N, or Right N blocks of data.",
    hint: "Extracts top/bottom rows and left/right columns.",
    level: "basic",
    codeExample: "=TAKE(A2:G50, 5)"
  },
  {
    question: "What is the syntax signature of the TAKE function?",
    shortAnswer: "=TAKE(array, rows, [columns])",
    explanation: "TAKE requires 'array' and 'rows' (the count of rows to keep). '[columns]' is optional, specifying the count of columns to keep.",
    hint: "Array, row count, optional column count.",
    level: "basic",
    codeExample: "=TAKE(Table1, 10, 3)"
  },
  {
    question: "How does passing a positive number to the rows argument of TAKE behave?",
    shortAnswer: "It extracts N rows from the top (beginning) of the array.",
    explanation: "Positive integers extract rows downwards from row 1. For example, TAKE(Data, 5) returns the first 5 rows across all columns.",
    hint: "Positive = from the top downwards.",
    level: "basic",
    codeExample: "=TAKE(A2:D50, 5)"
  },
  {
    question: "How does passing a negative number to the rows argument of TAKE behave?",
    shortAnswer: "It extracts N rows from the bottom (end) of the array.",
    explanation: "Negative integers extract rows upwards from the tail. For example, TAKE(Data, -3) returns the bottom 3 rows of the table.",
    hint: "Negative = from the bottom upwards.",
    level: "basic",
    codeExample: "=TAKE(A2:D50, -3)"
  },
  {
    question: "How can you extract the Top 3 performers from a table sorted by score using TAKE?",
    shortAnswer: "=TAKE(SORT(ScorecardTable, 4, -1), 3)",
    explanation: "SORT orders the scorecard by column 4 (Score) descending, and TAKE extracts the top 3 records from the sorted result.",
    hint: "Sort descending, then TAKE 3.",
    level: "basic",
    codeExample: "=TAKE(SORT(A2:E30, 4, -1), 3)"
  },
  {
    question: "How can you extract the Bottom 3 performers from a sorted score table using TAKE?",
    shortAnswer: "=TAKE(SORT(ScorecardTable, 4, -1), -3)",
    explanation: "Passing -3 to TAKE pulls the last 3 rows of the descending sorted table, effectively isolating the lowest performers.",
    hint: "Use -3 on a descending sorted table.",
    level: "moderate",
    codeExample: "=TAKE(SORT(A2:E30, 4, -1), -3)"
  },
  {
    question: "How can you combine the Top 3 and Bottom 3 performers into a single summary report using TAKE and VSTACK?",
    shortAnswer: "=LET(s, SORT(Data, 4, -1), VSTACK(TAKE(s, 3), TAKE(s, -3)))",
    explanation: "SORT orders the data once in RAM. VSTACK then vertically combines the top 3 (TAKE(s, 3)) and bottom 3 (TAKE(s, -3)) into a 6-row report.",
    hint: "Combine TAKE(s, 3) and TAKE(s, -3) with VSTACK.",
    level: "advanced",
    codeExample: "=LET(s, SORT(A2:E30, 4, -1), VSTACK(TAKE(s, 3), TAKE(s, -3)))"
  },
  {
    question: "What happens if you omit the optional [columns] argument in TAKE?",
    shortAnswer: "All columns of the array are preserved in the output.",
    explanation: "When [columns] is omitted, TAKE extracts the specified rows across the full width of the source matrix.",
    hint: "Omitted column argument keeps all columns.",
    level: "basic",
    codeExample: "=TAKE(A2:G20, 5)"
  },
  {
    question: "How does passing a negative number to the [columns] argument of TAKE behave?",
    shortAnswer: "It extracts N columns from the rightmost (far-right) edge of the array.",
    explanation: "For instance, TAKE(Data, 5, -2) returns the top 5 rows of the 2 rightmost columns of the table.",
    hint: "Negative column count extracts from the right.",
    level: "moderate",
    codeExample: "=TAKE(A2:J50, 5, -2)"
  },
  {
    question: "What happens if the requested row count in TAKE exceeds the total rows in the array?",
    shortAnswer: "TAKE returns all rows in the array without throwing an error.",
    explanation: "Unlike CHOOSEROWS which throws #VALUE! for out-of-bounds indices, TAKE gracefully returns all available rows if you ask for more rows than exist.",
    hint: "TAKE caps at the available array boundaries.",
    level: "moderate",
    codeExample: "=TAKE(A2:D5, 100) &rarr; Returns all 4 rows"
  },
  {
    question: "How does TAKE differ from DROP?",
    shortAnswer: "TAKE extracts/retains the specified rows/columns; DROP deletes/excludes the specified rows/columns and returns the rest.",
    explanation: "TAKE(Data, 5) keeps the first 5 rows. DROP(Data, 5) discards the first 5 rows and keeps rows 6 through the end.",
    hint: "TAKE keeps; DROP removes.",
    level: "basic",
    codeExample: "=TAKE(A2:D50, 5) vs =DROP(A2:D50, 5)"
  },
  {
    question: "How does TAKE differ from CHOOSEROWS?",
    shortAnswer: "TAKE extracts a contiguous block of N consecutive boundary rows; CHOOSEROWS extracts arbitrary, non-contiguous, or duplicated rows by index.",
    explanation: "TAKE is ideal for top/bottom blocks (e.g. Top 5). CHOOSEROWS is required when extracting specific scattered rows like rows 1, 4, 7.",
    hint: "Contiguous boundary block vs arbitrary row list.",
    level: "moderate",
    codeExample: "=TAKE(Data, 5) vs =CHOOSEROWS(Data, 1, 4, 7)"
  },
  {
    question: "What happens if rows is set to 0 in TAKE?",
    shortAnswer: "#CALC! error.",
    explanation: "Passing 0 for either the rows or columns argument in TAKE results in an empty array request, triggering a #CALC! error.",
    hint: "Taking 0 rows causes #CALC!.",
    level: "moderate",
    codeExample: "#CALC!"
  },
  {
    question: "How can TAKE be used to extract the single most recent transaction from a chronological log table?",
    shortAnswer: "=TAKE(TransactionTable, -1)",
    explanation: "TAKE(Table, -1) returns the single final row across all columns, capturing the latest transaction in real time.",
    hint: "Pass -1 for the rows argument.",
    level: "basic",
    codeExample: "=TAKE(A2:G500, -1)"
  },
  {
    question: "How can you extract the top 10 rows and first 3 columns simultaneously using TAKE?",
    shortAnswer: "=TAKE(Table, 10, 3)",
    explanation: "Passing rows=10 and columns=3 extracts a 10-row x 3-column sub-matrix from the top-left corner of the array.",
    hint: "Pass 10 for rows and 3 for columns.",
    level: "basic",
    codeExample: "=TAKE(A2:Z100, 10, 3)"
  },
  {
    question: "How can TAKE be nested with FILTER to extract the top 3 records matching a specific condition?",
    shortAnswer: "=TAKE(FILTER(Data, Dept=\"Finance\"), 3)",
    explanation: "FILTER selects all Finance rows, and TAKE limits the returned output to the first 3 rows.",
    hint: "Filter first, then TAKE 3.",
    level: "moderate",
    codeExample: "=TAKE(FILTER(A2:E50, C2:C50=\"Finance\"), 3)"
  },
  {
    question: "What error occurs if the cells where TAKE needs to spill are blocked?",
    shortAnswer: "#SPILL! error.",
    explanation: "If destination cells contain existing text, numbers, or merged formatting, Excel triggers #SPILL!.",
    hint: "Destination collision error.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How can you calculate the average score of only the Top 5 students using TAKE in memory?",
    shortAnswer: "=AVERAGE(TAKE(SORT(ScoreColumn, 1, -1), 5))",
    explanation: "SORT arranges scores descending, TAKE keeps the top 5, and AVERAGE computes their mean entirely in RAM without spilling.",
    hint: "Nest TAKE inside AVERAGE.",
    level: "moderate",
    codeExample: "=AVERAGE(TAKE(SORT(D2:D100, 1, -1), 5))"
  },
  {
    question: "Can TAKE accept dynamic spilled array references like A2#?",
    shortAnswer: "Yes, TAKE accepts any spilled array anchor as its input array argument.",
    explanation: "If a prior formula in A2 returns a dynamic table, =TAKE(A2#, 5) takes the top 5 rows of that dynamic output.",
    hint: "Use A2# as the array input.",
    level: "basic",
    codeExample: "=TAKE(A2#, 5)"
  },
  {
    question: "How does TAKE handle dates and currency formatting in source tables?",
    shortAnswer: "It passes the exact underlying serial values and formats faithfully to the destination cells.",
    explanation: "TAKE does not alter data types, text encodings, or precision.",
    hint: "Underlying serial values and types are preserved.",
    level: "basic",
    codeExample: "=TAKE(ScorecardMaster, 5)"
  },
  {
    question: "How can TAKE be used to extract the 3 rightmost columns of an entire table?",
    shortAnswer: "=TAKE(Table, ROWS(Table), -3) or =TAKE(Table, , -3)",
    explanation: "Leaving the rows parameter empty or passing ROWS(Table) while setting columns to -3 extracts all rows for the 3 rightmost columns.",
    hint: "Omit rows and pass -3 for columns.",
    level: "advanced",
    codeExample: "=TAKE(A2:H50, , -3)"
  },
  {
    question: "In financial modeling, how can TAKE be used to build a rolling 12-month summary from a 60-month historical ledger?",
    shortAnswer: "=TAKE(HistoricalLedger, -12)",
    explanation: "Passing -12 to TAKE extracts the bottom 12 rows of the monthly ledger, dynamically maintaining the most recent rolling 12-month period.",
    hint: "Pass -12 to extract the last 12 monthly rows.",
    level: "advanced",
    codeExample: "=TAKE(MonthlyFinancials, -12)"
  },
  {
    question: "What happens if both rows and columns arguments in TAKE are negative?",
    shortAnswer: "It extracts a sub-matrix from the bottom-right corner of the array.",
    explanation: "For example, =TAKE(Data, -5, -2) returns the bottom 5 rows of the 2 rightmost columns.",
    hint: "Slices the bottom-right quadrant of the matrix.",
    level: "moderate",
    codeExample: "=TAKE(A2:J50, -5, -2)"
  },
  {
    question: "How can TAKE be used to extract the single highest-priced product in an inventory table?",
    shortAnswer: "=TAKE(SORT(InventoryTable, PriceColIndex, -1), 1)",
    explanation: "Sorting the inventory table by price descending and taking 1 row returns the complete record of the most expensive item.",
    hint: "Sort price descending, TAKE 1.",
    level: "basic",
    codeExample: "=TAKE(SORT(A2:F100, 4, -1), 1)"
  },
  {
    question: "Why is TAKE more resilient than legacy INDEX/MATCH top-N formulas?",
    shortAnswer: "TAKE handles tie-breakers naturally without helper formulas and recalculates in a single C++ vector step.",
    explanation: "Legacy formulas using LARGE and MATCH frequently broke on duplicate tied values. SORT and TAKE handle identical values seamlessly without crashing.",
    hint: "Handles tied duplicate values seamlessly.",
    level: "advanced",
    codeExample: "=TAKE(SORT(Table, 2, -1), 5)"
  },
  {
    question: "How do you extract the Top N items where N is controlled dynamically by a cell dropdown (e.g. cell K1)?",
    shortAnswer: "=TAKE(SORT(Table, 3, -1), K1)",
    explanation: "By referencing cell K1 in TAKE's rows parameter, changing the dropdown in K1 from 5 to 10 dynamically resizes the spilled report.",
    hint: "Reference the dropdown cell in the rows parameter.",
    level: "basic",
    codeExample: "=TAKE(SORT(A2:E50, 3, -1), K1)"
  },
  {
    question: "How does LET prevent recalculation when building multi-metric top-N dashboards with TAKE?",
    shortAnswer: "LET evaluates the sorted table once in RAM, allowing multiple TAKE slices to be extracted without redundant sorting.",
    explanation: "Writing =LET(s, SORT(Data, 2, -1), HSTACK(TAKE(s, 5), TAKE(s, -5))) sorts the data once for both top and bottom extractions.",
    hint: "Cache the sorted table in a LET variable.",
    level: "advanced",
    codeExample: "=LET(s, SORT(A2:D50, 2, -1), HSTACK(TAKE(s, 5), TAKE(s, -5)))"
  },
  {
    question: "Why should you avoid referencing unbounded columns (e.g. A:F) inside TAKE?",
    shortAnswer: "Passing entire columns forces SORT and TAKE to evaluate 1,048,576 rows, causing severe calculation lag.",
    explanation: "Constrain ranges to active data (e.g. A2:F100) or use structured Tables.",
    hint: "Use bounded ranges or structured tables.",
    level: "expert",
    codeExample: "Use Table1 instead of A:F"
  },
  {
    question: "How can TAKE be used to extract the header row of a table dynamically?",
    shortAnswer: "=TAKE(TableWithHeaders, 1)",
    explanation: "TAKE(Table, 1) returns the top row across all columns, capturing the table headers dynamically.",
    hint: "Pass 1 to extract the first row.",
    level: "basic",
    codeExample: "=TAKE(MasterTable, 1)"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for building Top/Bottom leaderboards with TAKE?",
    shortAnswer: "Always couple TAKE with explicit multi-level SORT/SORTBY to ensure deterministic, reproducible leaderboards.",
    explanation: "In competitive academic or corporate sales leaderboards, tie-breaking is critical. Sorting by Primary Score descending, then by Secondary Metric (e.g. attendance or speed) descending before applying TAKE guarantees unambiguous, reproducible top-N rankings.",
    hint: "Always sort deterministically before applying TAKE.",
    level: "expert",
    codeExample: "Leaderboard: =TAKE(SORTBY(Students, Scores, -1, Attendance, -1), 5)"
  }
];

export default questions;
