// topic12_questions.js
// 30 Structured Questions covering the Real-World Live Search & Filter Table Project

const questions = [
  {
    question: "What is the primary architectural objective of the Live Search & Filter Table Project?",
    shortAnswer: "To build a fully interactive, multi-criteria corporate search portal that updates in real time with zero VBA macros.",
    explanation: "By combining dynamic array functions (FILTER, UNIQUE, SORT, LET), the portal allows users to search keywords across multiple columns, filter by branch dropdowns, and toggle sort orders in a secure, non-macro workbook.",
    hint: "Think of an enterprise web-style search portal built natively with Excel formulas.",
    level: "basic",
    codeExample: "=LET(f, FILTER(Table1[#Data], ...), SORT(f, 7, -1))"
  },
  {
    question: "How do you handle the empty search box condition in the master search formula?",
    shortAnswer: "Prepend `(SearchCell=\"\") +` to the search condition inside the FILTER formula.",
    explanation: "When the search cell is blank, `(SearchCell=\"\")` evaluates to TRUE (1), including all rows. When characters are typed, it evaluates to 0, activating the search expression.",
    hint: "Add (SearchCell=\"\") + to show all records when search box is empty.",
    level: "basic",
    codeExample: "(J1=\"\") + ISNUMBER(SEARCH(J1, Table1[Sales_Officer]))"
  },
  {
    question: "How do you search across multiple columns simultaneously (e.g. Sales Officer OR Course Title)?",
    shortAnswer: "Add boolean search expressions: (ISNUMBER(SEARCH(J1, Col1)) + ISNUMBER(SEARCH(J1, Col2))).",
    explanation: "Using the addition (`+`) operator between two search tests implements OR logic, returning rows where either column matches the keyword.",
    hint: "Add search expressions together with + for multi-column search.",
    level: "moderate",
    codeExample: "(ISNUMBER(SEARCH(J1, Table1[Officer])) + ISNUMBER(SEARCH(J1, Table1[Course])))"
  },
  {
    question: "How do you implement an 'All' option in a branch filter dropdown?",
    shortAnswer: "Use `(BranchDropdown=\"All\") + (Table1[Branch]=BranchDropdown)` in the include argument.",
    explanation: "If the user selects 'All', the first expression evaluates to TRUE (1), including all branches. Otherwise, it filters strictly for the selected branch.",
    hint: "Use (Dropdown=\"All\") + (Range=Dropdown).",
    level: "moderate",
    codeExample: "(J2=\"All\") + (Table1[Branch_Office]=J2)"
  },
  {
    question: "How do you toggle sort direction dynamically between 'Highest First' and 'Lowest First'?",
    shortAnswer: "Pass an IF statement to the sort_order argument: IF(J3=\"Highest First\", -1, 1).",
    explanation: "The IF expression outputs `-1` for descending order or `1` for ascending order based on the user's dropdown selection.",
    hint: "Use IF(SortToggle=\"Highest First\", -1, 1).",
    level: "moderate",
    codeExample: "=SORT(filtered_data, 7, IF(J3=\"Highest First\", -1, 1))"
  },
  {
    question: "Why is the LET function essential for master search portal architecture?",
    shortAnswer: "It stores intermediate filtered matrices in local variables, preventing redundant multi-pass recalculations.",
    explanation: "Using `LET` avoids repeating the complex `FILTER()` expression inside subsequent `SORT()` or `IFERROR()` wrappers, maximizing performance.",
    hint: "LET assigns intermediate calculations to variables, boosting speed and readability.",
    level: "advanced",
    codeExample: "=LET(f, FILTER(...), IF(ISARRAY(f), SORT(f, 7, -1), f))"
  },
  {
    question: "How do you create a dynamic KPI title banner showing the live record count (e.g. 'Found 14 Matching Invoices')?",
    shortAnswer: "Use =\"Found \" & ROWS(A6#) & \" Matching Invoices\".",
    explanation: "Concatenates text with `ROWS(A6#)`, reflecting the live height of the spilled search results automatically.",
    hint: "Use ROWS(SpillOrigin#) in a text concatenation formula.",
    level: "basic",
    codeExample: "=\"Found \" & ROWS(A6#) & \" Matching Invoices\""
  },
  {
    question: "How do you calculate the total filtered gross revenue in an executive KPI card?",
    shortAnswer: "Use =SUM(CHOOSECOLS(A6#, 7)) or =SUM(INDEX(A6#, , 7)).",
    explanation: "Extracts column 7 (Gross Total) from the spilled results and computes the live sum directly.",
    hint: "Use SUM on column 7 of the spilled array.",
    level: "moderate",
    codeExample: "=SUM(CHOOSECOLS(A6#, 7))"
  },
  {
    question: "How do you handle zero-match results gracefully without breaking downstream formulas?",
    shortAnswer: "Pass a user-friendly fallback string into FILTER's [if_empty] parameter: \"No Matching Invoices Found\".",
    explanation: "This displays a clear message in cell A6 and prevents `#CALC!` calculation errors.",
    hint: "Use FILTER's built-in 3rd argument.",
    level: "basic",
    codeExample: "=FILTER(Data, Criteria, \"No Matching Invoices Found\")"
  },
  {
    question: "Where should control input cells (search box, dropdowns) be placed on the worksheet relative to the spilled table?",
    shortAnswer: "Above or to the left of the spilled output table (e.g. Rows 1 to 4), with the formula starting at Row 6.",
    explanation: "Placing controls above the spill origin guarantees that expanding array results will never collide with input controls.",
    hint: "Place controls in rows 1-4, formula in row 6 spilling down.",
    level: "basic",
    codeExample: "// Controls: J1:J3 | Headers: Row 5 | Spilled Output: Row 6"
  },
  {
    question: "Why are VBA macros avoided in modern enterprise search portals?",
    shortAnswer: "VBA macros require .xlsm formats, trigger security warnings, fail on Excel Online, and are often blocked by IT policies.",
    explanation: "Dynamic array formulas run natively in standard .xlsx files, work on web browsers and mobile devices, and have zero macro security restrictions.",
    hint: "Formula solutions are 100% cloud-compatible and macro-warning free.",
    level: "moderate",
    codeExample: "// .xlsx files work seamlessly on Excel for Web & Mobile"
  },
  {
    question: "How do you format specific columns (Currency, Dates) in a dynamic spilled table?",
    shortAnswer: "Apply column formatting to the entire worksheet column area below the headers.",
    explanation: "Formatting destination columns (e.g. Currency for column G) ensures that all spilled rows receive proper formatting automatically as they expand.",
    hint: "Pre-format the destination columns on the sheet.",
    level: "basic",
    codeExample: "// Format Column G as ₹ Currency (#,##0)"
  },
  {
    question: "How do you make the search box match whole words only rather than partial text?",
    shortAnswer: "Pad search terms and target text with spaces: ISNUMBER(SEARCH(\" \" & J1 & \" \", \" \" & Col & \" \")).",
    explanation: "Adding boundary spaces ensures that searching 'Tax' matches ' Tax ' but excludes 'Taxi'.",
    hint: "Pad both search term and target column with spaces.",
    level: "advanced",
    codeExample: "ISNUMBER(SEARCH(\" \" & J1 & \" \", \" \" & Table1[Course] & \" \"))"
  },
  {
    question: "How do you add a date range filter (Start Date to End Date) into the master search equation?",
    shortAnswer: "Add date bounds: `((StartDate=\"\") + (DateCol >= StartDate)) * ((EndDate=\"\") + (DateCol <= EndDate))`.",
    explanation: "Multiplies date boundary checks, allowing users to optionally filter by custom date windows.",
    hint: "Multiply ((Start=\"\") + (Date>=Start)) * ((End=\"\") + (Date<=End)).",
    level: "advanced",
    codeExample: "((J4=\"\") + (Table1[Date]>=J4)) * ((J5=\"\") + (Table1[Date]<=J5))"
  },
  {
    question: "Can you return only a subset of columns (e.g. Invoice ID, Officer, Gross Total) in the search portal?",
    shortAnswer: "Yes, wrap the master formula in CHOOSECOLS: =CHOOSECOLS(MasterFormula, 1, 2, 7).",
    explanation: "`CHOOSECOLS` extracts only the designated display columns, keeping the portal compact and focused.",
    hint: "Use CHOOSECOLS on the filtered output.",
    level: "moderate",
    codeExample: "=CHOOSECOLS(filtered_matrix, 1, 2, 7)"
  },
  {
    question: "What is the calculation speed of this non-VBA search portal on a 25,000-row transactional table?",
    shortAnswer: "Under 15 milliseconds per keystroke in Excel 365.",
    explanation: "Because dynamic array evaluation is multi-threaded and compiled in native C++, filtering executes in real time with zero perceived latency.",
    hint: "Sub-15ms multi-threaded in-memory execution.",
    level: "expert",
    codeExample: "// 25,000 rows filtered in < 15ms"
  },
  {
    question: "How do you highlight the top 3 highest revenue rows in the filtered search table using Conditional Formatting?",
    shortAnswer: "Apply a Conditional Formatting rule: =$G6 >= LARGE($G$6#, 3).",
    explanation: "Because `$G$6#` references the spilled revenue column, `LARGE(..., 3)` dynamically identifies the 3rd highest value in the active filtered view.",
    hint: "Use LARGE(SpilledRange#, 3) in Conditional Formatting.",
    level: "advanced",
    codeExample: "=$G6 >= LARGE($G$6#, 3)"
  },
  {
    question: "How do you build a multi-select checkbox filter without VBA?",
    shortAnswer: "Use a helper cell with TEXTJOIN or match against a selected criteria list using ISNUMBER(MATCH(...)).",
    explanation: "`ISNUMBER(MATCH(BranchCol, SelectedBranches#, 0))` filters for rows matching any of the checked branches in the multi-select table.",
    hint: "Use ISNUMBER(MATCH(Column, SelectedCriteriaList#, 0)).",
    level: "expert",
    codeExample: "ISNUMBER(MATCH(Table1[Branch_Office], SelectedBranchList#, 0))"
  },
  {
    question: "How do you protect the master formula from accidental deletion by end users?",
    shortAnswer: "Lock formula cell A6, unlock input control cells (J1:J3), and protect the worksheet.",
    explanation: "Users can freely type into J1 and select dropdowns in J2:J3 while the core equation remains locked and protected.",
    hint: "Lock the formula cell, unlock input cells, and protect the sheet.",
    level: "moderate",
    codeExample: "// Format Cells > Protection > Unlock J1:J3, Lock A6 → Protect Sheet"
  },
  {
    question: "What happens if a user enters special regex characters in the search box?",
    shortAnswer: "Excel's SEARCH function treats characters literally, except for standard wildcards ('*' and '?').",
    explanation: "Search strings with hyphens, brackets, or slashes evaluate safely without regex runtime syntax errors.",
    hint: "SEARCH handles special punctuation characters safely.",
    level: "basic",
    codeExample: "// 'INV-20' evaluates cleanly in SEARCH"
  },
  {
    question: "How do you calculate the average ticket size of the currently filtered search results?",
    shortAnswer: "Use =AVERAGE(CHOOSECOLS(A6#, 7)).",
    explanation: "Computes the live average transaction value from column 7 of the spilled array.",
    hint: "Use AVERAGE on the filtered revenue column.",
    level: "basic",
    codeExample: "=AVERAGE(CHOOSECOLS(A6#, 7))"
  },
  {
    question: "Can this live search portal connect to an external SQL database or Power Query table?",
    shortAnswer: "Yes, dynamic arrays can read directly from Power Query output tables (`ListObject`).",
    explanation: "When Power Query refreshes from external databases, the dynamic search portal updates its results immediately.",
    hint: "Dynamic array formulas read Power Query tables seamlessly.",
    level: "expert",
    codeExample: "=FILTER(PowerQueryTable[#Data], ...)"
  },
  {
    question: "How do you add a reset button to clear all search filters without VBA?",
    shortAnswer: "While full cell clearing requires VBA, formula default states (e.g. blank J1 and 'All' in J2) provide instant zero-filter views.",
    explanation: "Setting defaults in the input cells displays all records with zero code.",
    hint: "Default input states provide instant full-table views.",
    level: "moderate",
    codeExample: "// J1 = '' (blank), J2 = 'All' → displays entire master table"
  },
  {
    question: "How do you extract distinct officers present in the currently filtered search results?",
    shortAnswer: "Use =SORT(UNIQUE(CHOOSECOLS(A6#, 2))).",
    explanation: "Deduplicates and alphabetizes officer names directly from the active filtered output array.",
    hint: "Apply SORT(UNIQUE(...)) to column 2 of the spilled results.",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(CHOOSECOLS(A6#, 2)))"
  },
  {
    question: "What happens if the underlying transaction table has new rows added?",
    shortAnswer: "Because structured references (Table1[#Data]) are used, the search portal automatically incorporates new rows instantly.",
    explanation: "Structured tables expand their boundaries automatically on data entry.",
    hint: "Structured table references expand automatically.",
    level: "basic",
    codeExample: "// Table1[#Data] includes all appended rows dynamically"
  },
  {
    question: "How do you export the filtered search results into a clean CSV file?",
    shortAnswer: "Copy the spilled range A6# and Paste Values into a new workbook, or save as CSV.",
    explanation: "Pasting values captures the exact filtered records for external distribution.",
    hint: "Copy A6# and paste into CSV export.",
    level: "basic",
    codeExample: "// Copy A6# → Paste Values → Save as CSV"
  },
  {
    question: "Why is the master search portal considered a flagship milestone in modern spreadsheet engineering?",
    shortAnswer: "It demonstrates complete mastery of dynamic array calculation, boolean filtering, UI controls, and reactive architecture.",
    explanation: "Building this portal proves that modern formula-driven Excel can deliver desktop-application performance and interactivity with zero code maintenance.",
    hint: "It combines all dynamic array concepts into an enterprise-grade interactive tool.",
    level: "expert",
    codeExample: "// Flagship Pipeline: UI Controls → LET → FILTER → SORT → Dynamic Presentation Grid"
  },
  {
    question: "How do you format the search portal for high-contrast executive dark mode presentation?",
    shortAnswer: "Use deep slate/navy container fills (#0f172a), subtle borders (#334155), and vibrant cyan/emerald accents (#38bdf8, #34d399).",
    explanation: "Modern color palettes enhance legibility, reduce eye strain, and project an ultra-premium professional aesthetic.",
    hint: "Use curated modern dark palettes for executive UI design.",
    level: "basic",
    codeExample: "// Modern Dark Theme: Slate-950 + Emerald Accents"
  },
  {
    question: "How do you prevent #SPILL! errors from occurring when the search query returns more rows than expected?",
    shortAnswer: "Leave the entire sheet area below row 6 completely clear of any formulas, summary cards, or merged cells.",
    explanation: "Providing an open downward trajectory allows the search portal to spill 1,000+ rows freely without obstruction.",
    hint: "Keep the entire downward spill path unobstructed.",
    level: "basic",
    codeExample: "// Ensure rows 6:1000 in columns A:I are completely empty"
  },
  {
    question: "Why do corporate clients in Barrackpore and Kolkata prefer formula-driven search portals over custom software?",
    shortAnswer: "They are cost-effective, require zero IT installation, update instantly, and can be customized by financial analysts in minutes.",
    explanation: "Formula portals provide software-grade interactivity within the familiar, secure environment of Microsoft Excel.",
    hint: "Provides custom application speed inside Excel with zero deployment friction.",
    level: "expert",
    codeExample: "// Enterprise Ready: Zero Install + 100% Excel Compatible"
  }
];

export default questions;
