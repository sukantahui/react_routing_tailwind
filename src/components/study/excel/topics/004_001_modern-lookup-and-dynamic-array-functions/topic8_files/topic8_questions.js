// topic8_questions.js
// 30 Structured Questions covering the FILTER + UNIQUE + SORT Pipeline in Excel 365

const questions = [
  {
    question: "What is the standard formula structure for combining FILTER, UNIQUE, and SORT into an automated searchable list?",
    shortAnswer: "=SORT(UNIQUE(FILTER(array, include, [if_empty])))",
    explanation: "This 3-tier pipeline first filters the source data for matching criteria, eliminates all duplicate values with UNIQUE, and finally orders the distinct items alphabetically with SORT in a single formula.",
    hint: "FILTER inside, UNIQUE in the middle, SORT on the outside.",
    level: "basic",
    codeExample: "=SORT(UNIQUE(FILTER(B2:B50, C2:C50=\"Barrackpore\")))"
  },
  {
    question: "In what order are the nested functions evaluated in `=SORT(UNIQUE(FILTER(A2:A100, B2:B100=\"Active\")))`?",
    shortAnswer: "1. FILTER executes first → 2. UNIQUE executes second → 3. SORT executes last.",
    explanation: "Excel evaluates expressions from the inside out: FILTER produces the active subset, UNIQUE deduplicates that subset, and SORT alphabetizes the unique list.",
    hint: "Inside-out evaluation: FILTER → UNIQUE → SORT.",
    level: "basic",
    codeExample: "// 1. FILTER(A, B='Active') → 2. UNIQUE(...) → 3. SORT(...)"
  },
  {
    question: "How do you create an interactive search box where leaving the search cell blank displays all unique values?",
    shortAnswer: "Include `(SearchCell=\"\") +` in the include argument: =SORT(UNIQUE(FILTER(A2:A100, (J1=\"\") + ISNUMBER(SEARCH(J1, A2:A100)), \"No Matches\"))).",
    explanation: "When `J1` is blank, `(J1=\"\")` evaluates to TRUE (1), including all rows. When text is typed into `J1`, `(J1=\"\")` becomes 0, and `ISNUMBER(SEARCH(...))` takes over to filter matches.",
    hint: "Add (SearchCell=\"\") + to handle empty search box states.",
    level: "advanced",
    codeExample: "=SORT(UNIQUE(FILTER(B2:B50, (J1=\"\") + ISNUMBER(SEARCH(J1, B2:B50)), \"No Matches\")))"
  },
  {
    question: "Why should the `[if_empty]` argument be placed inside FILTER rather than IFERROR on the outside?",
    shortAnswer: "Supplying `[if_empty]` inside FILTER cleanly returns a user-friendly string when zero records match, avoiding unnecessary error traps.",
    explanation: "If FILTER finds zero matches and lacks `[if_empty]`, it throws `#CALC!`. Passing `\"No Records Found\"` to FILTER's 3rd argument allows UNIQUE and SORT to pass the message through cleanly.",
    hint: "Use FILTER's built-in 3rd parameter for zero-match handling.",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(FILTER(A2:A50, B2:B50=\"Kolkata\", \"No Center Found\")))"
  },
  {
    question: "How do you bind an Excel Data Validation dropdown list directly to a SORT(UNIQUE(FILTER())) pipeline?",
    shortAnswer: "Set the Data Validation list source to the origin cell with '#' (e.g. =$L$2#).",
    explanation: "The `#` operator ensures the dropdown list expands and contracts dynamically based on the filtered results.",
    hint: "Use =$OriginCell# in Data Validation > List > Source.",
    level: "moderate",
    codeExample: "Data Validation > Source: =$L$2#"
  },
  {
    question: "How do you strip leading/trailing whitespace before deduplicating and sorting in the pipeline?",
    shortAnswer: "Wrap the target column in TRIM: =SORT(UNIQUE(FILTER(TRIM(B2:B50), Criteria))).",
    explanation: "`TRIM()` removes invisible trailing spaces that would otherwise create duplicate entries in the output list.",
    hint: "Wrap the source column in TRIM().",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(FILTER(TRIM(B2:B50), C2:C50=\"Barrackpore\")))"
  },
  {
    question: "Can you filter on multiple conditions (e.g. Branch is Barrackpore AND Status is Active) in this pipeline?",
    shortAnswer: "Yes, use boolean multiplication: `(C2:C50=\"Barrackpore\") * (E2:E50=\"Active\")` in the include argument.",
    explanation: "Boolean multiplication enforces AND logic across multiple columns before deduplicating and sorting.",
    hint: "Multiply condition arrays inside FILTER: (A) * (B).",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(FILTER(B2:B50, (C2:C50=\"Barrackpore\") * (E2:E50=\"Active\"))))"
  },
  {
    question: "How do you sort the unique filtered results in descending order (Z to A)?",
    shortAnswer: "Pass -1 as the sort_order argument in SORT: =SORT(UNIQUE(FILTER(...)), 1, -1).",
    explanation: "Setting the 3rd argument of `SORT` to `-1` reverses the alphabetical order from Z to A.",
    hint: "Pass -1 to SORT's sort_order parameter.",
    level: "basic",
    codeExample: "=SORT(UNIQUE(FILTER(B2:B50, C2:C50=\"Barrackpore\")), 1, -1)"
  },
  {
    question: "How do you filter out empty blank cells from the unique sorted output?",
    shortAnswer: "Add `<>\"\"` to the include criteria: (A2:A50<>\"\").",
    explanation: "Explicitly filtering out empty strings prevents a `0` or blank row from appearing in the spilled list.",
    hint: "Add (Column<>\"\") to the filter conditions.",
    level: "basic",
    codeExample: "=SORT(UNIQUE(FILTER(A2:A50, (A2:A50<>\"\") * (B2:B50=\"Active\"))))"
  },
  {
    question: "How do you count the total number of items currently visible in the dynamic search list?",
    shortAnswer: "Use =ROWS(L2#) or =COUNTA(L2#).",
    explanation: "`ROWS(L2#)` returns the live row count of the spilled search list, updating automatically as search terms change.",
    hint: "Use ROWS(OriginCell#).",
    level: "basic",
    codeExample: "=ROWS(L2#)"
  },
  {
    question: "What happens if a user types a search keyword that matches no records?",
    shortAnswer: "The formula outputs the fallback string (e.g. 'No Matches Found') across a single cell.",
    explanation: "The fallback string passes through `UNIQUE` and `SORT` cleanly as a 1×1 array.",
    hint: "Outputs the [if_empty] string cleanly.",
    level: "basic",
    codeExample: "// Spills single cell: 'No Matches Found'"
  },
  {
    question: "How do you build a dependent cascading dropdown (City → Branch → Trainer) using this pipeline?",
    shortAnswer: "Write sequential SORT(UNIQUE(FILTER())) formulas where each tier filters by the preceding dropdown selection.",
    explanation: "Dropdown 1 selects City; Formula 2 filters Branches by City; Dropdown 2 binds to Formula 2 (#); Formula 3 filters Trainers by selected Branch.",
    hint: "Chain multiple SORT(UNIQUE(FILTER())) formulas pointing to preceding dropdown cells.",
    level: "expert",
    codeExample: "=SORT(UNIQUE(FILTER(TrainerList, (CityCol=J1) * (BranchCol=J2))))"
  },
  {
    question: "Can you return multi-column composite rows with this pipeline?",
    shortAnswer: "Yes, pass multi-column ranges into FILTER: =SORT(UNIQUE(FILTER(B2:D50, E2:E50=\"Active\")), 1, 1).",
    explanation: "`FILTER` returns multiple columns, `UNIQUE` deduplicates composite row combinations, and `SORT` orders by the specified column index.",
    hint: "Pass a multi-column range to array in FILTER.",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(FILTER(B2:D50, E2:E50=\"Active\")), 1, 1)"
  },
  {
    question: "How do you make the search filter case-sensitive?",
    shortAnswer: "Use FIND instead of SEARCH: ISNUMBER(FIND(J1, B2:B50)).",
    explanation: "`FIND` is case-sensitive, whereas `SEARCH` is case-insensitive. Using `FIND` enforces exact uppercase/lowercase matching.",
    hint: "Use FIND for case-sensitive text matching.",
    level: "advanced",
    codeExample: "=SORT(UNIQUE(FILTER(B2:B50, ISNUMBER(FIND(J1, B2:B50)))))"
  },
  {
    question: "What is the memory and performance advantage of combining these 3 functions in one cell vs helper columns?",
    shortAnswer: "It processes data entirely in CPU registers and RAM, avoiding thousands of intermediate worksheet cell updates.",
    explanation: "A single nested dynamic array formula eliminates workbook recalculation lag and prevents sheet corruption.",
    hint: "In-memory streaming prevents sheet clutter and maximizes speed.",
    level: "expert",
    codeExample: "// Single formula calculates in < 15ms"
  },
  {
    question: "How do you extract the Top 5 unique items from the sorted filtered list?",
    shortAnswer: "Wrap the pipeline in TAKE: =TAKE(SORT(UNIQUE(FILTER(...))), 5).",
    explanation: "`TAKE(..., 5)` grabs strictly the first 5 records from the sorted distinct stream.",
    hint: "Wrap the entire formula in TAKE(..., 5).",
    level: "moderate",
    codeExample: "=TAKE(SORT(UNIQUE(FILTER(B2:B50, C2:C50=\"Barrackpore\"))), 5)"
  },
  {
    question: "What happens if the output destination contains an occupied cell?",
    shortAnswer: "Excel returns a #SPILL! error until the obstruction is cleared.",
    explanation: "Clearing the occupied cell resolves the obstruction and allows the pipeline to spill.",
    hint: "Clear any data in the spill perimeter.",
    level: "basic",
    codeExample: "// Delete values in the projected spill path to resolve #SPILL!"
  },
  {
    question: "Can this pipeline read directly from structured Excel Table columns?",
    shortAnswer: "Yes: =SORT(UNIQUE(FILTER(StaffTable[Trainer_Name], StaffTable[Center]=\"Barrackpore\"))).",
    explanation: "Structured table references expand dynamically as new rows are logged.",
    hint: "Use TableName[ColumnName] syntax.",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(FILTER(StaffTable[Trainer_Name], StaffTable[Center]=\"Barrackpore\")))"
  },
  {
    question: "How do you sort the unique list by popularity (highest enrollment count) rather than alphabetically?",
    shortAnswer: "Replace SORT with SORTBY and use COUNTIF: =SORTBY(u, COUNTIF(RawCol, u), -1).",
    explanation: "Using `LET` to capture `u = UNIQUE(FILTER(...))` allows `SORTBY` to order items by their frequency counts.",
    hint: "Use LET with SORTBY and COUNTIF for frequency ranking.",
    level: "expert",
    codeExample: "=LET(u, UNIQUE(FILTER(B2:B50, C2:C50=\"Barrackpore\")), SORTBY(u, COUNTIF(B2:B50, u), -1))"
  },
  {
    question: "How do you search across multiple columns simultaneously (e.g. search term matches Trainer Name OR Skill Track)?",
    shortAnswer: "Add boolean search conditions: (ISNUMBER(SEARCH(J1, NameCol)) + ISNUMBER(SEARCH(J1, SkillCol))).",
    explanation: "Adding two `ISNUMBER(SEARCH())` expressions creates an OR search across multiple fields.",
    hint: "Use ISNUMBER(SEARCH(J1, Col1)) + ISNUMBER(SEARCH(J1, Col2)).",
    level: "advanced",
    codeExample: "=SORT(UNIQUE(FILTER(B2:B50, ISNUMBER(SEARCH(J1, B2:B50)) + ISNUMBER(SEARCH(J1, D2:D50)))))"
  },
  {
    question: "How do you display the results horizontally across columns rather than vertically down rows?",
    shortAnswer: "Wrap the formula in TRANSPOSE: =TRANSPOSE(SORT(UNIQUE(FILTER(...)))).",
    explanation: "`TRANSPOSE` flips the vertical array output into a horizontal row of cells.",
    hint: "Wrap the pipeline in TRANSPOSE().",
    level: "moderate",
    codeExample: "=TRANSPOSE(SORT(UNIQUE(FILTER(B2:B50, C2:C50=\"Barrackpore\"))))"
  },
  {
    question: "How do you combine items from two different worksheet tabs before applying the pipeline?",
    shortAnswer: "Use VSTACK inside FILTER: =SORT(UNIQUE(FILTER(VSTACK(Sheet1!A2:A50, Sheet2!A2:A50), Criteria))).",
    explanation: "`VSTACK` consolidates data from multiple branch sheets into a unified array for filtering and deduplication.",
    hint: "Use VSTACK to merge multi-sheet ranges.",
    level: "advanced",
    codeExample: "=SORT(UNIQUE(FILTER(VSTACK(Barrackpore!B2:B30, Shyamnagar!B2:B30), VSTACK(...)<>\"\")))"
  },
  {
    question: "How do you create a dynamic header banner showing the number of filtered unique results (e.g. 'Showing 8 Unique Trainers')?",
    shortAnswer: "Use =\"Showing \" & ROWS(L2#) & \" Unique Trainers\".",
    explanation: "Concatenates text with the live row count of the spilled search array `L2#`.",
    hint: "Concatenate text around ROWS(SpillOrigin#).",
    level: "basic",
    codeExample: "=\"Showing \" & ROWS(L2#) & \" Unique Trainers\""
  },
  {
    question: "Can this pipeline be used inside LET to avoid creating any visible helper table on the sheet?",
    shortAnswer: "Yes, LET can encapsulate the pipeline and return aggregate metrics directly.",
    explanation: "`=LET(lst, SORT(UNIQUE(FILTER(B2:B50, C2:C50=\"Barrackpore\"))), TEXTJOIN(\", \", TRUE, lst))` formats the entire list into a single comma-separated text string.",
    hint: "Assign pipeline to a LET variable.",
    level: "advanced",
    codeExample: "=LET(lst, SORT(UNIQUE(FILTER(B2:B50, C2:C50=\"Barrackpore\"))), TEXTJOIN(\", \", TRUE, lst))"
  },
  {
    question: "How does the pipeline handle numeric columns instead of text?",
    shortAnswer: "It deduplicates numbers accurately and sorts them in numerical ascending (or descending) order.",
    explanation: "Numbers (e.g. Course Fees, Batch IDs) are sorted numerically (100, 200, 1000) rather than alphabetically.",
    hint: "Numbers sort numerically by default.",
    level: "basic",
    codeExample: "=SORT(UNIQUE(FILTER(FeeColumn, Status=\"Confirmed\")))"
  },
  {
    question: "What is the recommended design practice for placing search input cells relative to the spilled output?",
    shortAnswer: "Place search input cells above the formula (e.g. J1) and spill the output below (e.g. J3#).",
    explanation: "Placing search inputs above the spill origin guarantees that expanding arrays will not collide with the input box.",
    hint: "Place inputs above the spill origin to prevent #SPILL! collisions.",
    level: "basic",
    codeExample: "// Input in J1, Formula in J3 spilling downward"
  },
  {
    question: "How do you handle wildcards (*, ?) inside the search box formula?",
    shortAnswer: "The SEARCH function natively supports standard Excel wildcards like '*' (multiple characters) and '?' (single character).",
    explanation: "Typing `*Excel*` or `P?thon` into the search box evaluates automatically inside `SEARCH()`.",
    hint: "SEARCH natively evaluates Excel wildcards.",
    level: "advanced",
    codeExample: "// SEARCH('P?thon', Range) matches Python and Pyzhon"
  },
  {
    question: "Why does wrapping the formula in IFERROR hide critical formula logic issues?",
    shortAnswer: "IFERROR masks syntax errors and dimension mismatches (#VALUE!, #REF!) as well as empty matches.",
    explanation: "Using FILTER's built-in `[if_empty]` argument specifically addresses zero matches while preserving real diagnostic errors.",
    hint: "Use [if_empty] in FILTER rather than global IFERROR.",
    level: "expert",
    codeExample: "// Preferred: =SORT(UNIQUE(FILTER(..., ..., 'No Results')))"
  },
  {
    question: "How do you extract distinct unique trainers who teach MORE than one course track using this pipeline?",
    shortAnswer: "Combine with COUNTIF: =SORT(UNIQUE(FILTER(B2:B50, COUNTIF(B2:B50, B2:B50) > 1))).",
    explanation: "`COUNTIF(B2:B50, B2:B50) > 1` filters for trainers appearing more than once, and `UNIQUE` deduplicates the list.",
    hint: "Use COUNTIF > 1 in the include argument.",
    level: "advanced",
    codeExample: "=SORT(UNIQUE(FILTER(B2:B50, COUNTIF(B2:B50, B2:B50) > 1)))"
  },
  {
    question: "Why is the SORT(UNIQUE(FILTER())) pipeline considered the ultimate milestone of modern spreadsheet architecture?",
    shortAnswer: "It synthesizes filtering, deduplication, sorting, dynamic spilling, and UI interactivity into a single elegant formula with zero VBA.",
    explanation: "This composite pipeline replaces thousands of lines of legacy VBA macros, eliminating file corruption risks and enabling lightning-fast reactive dashboards across Barrackpore and Kolkata enterprises.",
    hint: "It represents the pinnacle of modern formula-driven spreadsheet engineering.",
    level: "expert",
    codeExample: "// Ultimate Pipeline: Search Box → FILTER → UNIQUE → SORT → Dropdown (#)"
  }
];

export default questions;
