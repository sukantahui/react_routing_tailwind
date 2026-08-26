// topic9_questions.js
// 30 Structured Questions covering #SPILL! Error Resolution & Grid Geometry

const questions = [
  {
    question: "What does a #SPILL! error signify in modern Microsoft Excel?",
    shortAnswer: "It indicates that a dynamic array formula calculated a multi-cell output, but was blocked from writing to the required worksheet cells.",
    explanation: "Excel calculates dynamic arrays in memory, but if the required rectangular destination range contains existing text, formulas, merged cells, or hits table/sheet boundaries, `#SPILL!` is returned.",
    hint: "Think of an obstructed destination path for a spilled array.",
    level: "basic",
    codeExample: "// Formula in A1 needs A1:A10, but cell A5 contains 'Hello' -> #SPILL!"
  },
  {
    question: "What is the most common cause of a #SPILL! error?",
    shortAnswer: "One or more non-empty cells lying within the projected spill path.",
    explanation: "Even a single cell containing text, numbers, a formula, or an invisible space character in the required output range prevents the formula from spilling.",
    hint: "An occupied cell inside the spill perimeter.",
    level: "basic",
    codeExample: "// Clear the obstructing cell to resolve the #SPILL! error immediately"
  },
  {
    question: "How does Excel visually indicate the required spill range when a #SPILL! error occurs?",
    shortAnswer: "It displays a blue dashed bounding box outline highlighting the exact cells needed.",
    explanation: "Selecting the cell displaying `#SPILL!` illuminates a blue dashed border around the entire rectangle required for the output.",
    hint: "Look for the blue dashed rectangular boundary.",
    level: "basic",
    codeExample: "// Blue dashed border outlines the obstructed area"
  },
  {
    question: "How can you instantly find which cell is blocking a dynamic array?",
    shortAnswer: "Click the yellow warning tag next to the #SPILL! cell and select 'Select Obstructing Cell'.",
    explanation: "Excel will jump your selection cursor directly to the offending cell, allowing you to delete or relocate it.",
    hint: "Use the smart tag: 'Select Obstructing Cell'.",
    level: "basic",
    codeExample: "Smart Tag > Select Obstructing Cell > Press Delete"
  },
  {
    question: "Why do merged cells cause #SPILL! errors?",
    shortAnswer: "Dynamic arrays require individual rectangular grid cells; merged cells break standard coordinate addresses.",
    explanation: "Merged cells create coordinate anomalies where secondary cells in the merge block have null addresses. Dynamic arrays cannot populate merged cells.",
    hint: "Dynamic arrays and merged cells are incompatible.",
    level: "moderate",
    codeExample: "// Unmerge all cells in the destination range to fix #SPILL!"
  },
  {
    question: "Can a dynamic array formula spill inside an Excel Table (`ListObject`)?",
    shortAnswer: "No, dynamic array formulas cannot spill inside Excel Tables and will always return #SPILL!.",
    explanation: "Excel Tables are designed with fixed row-by-row calculated columns. Spilled arrays are prohibited within Table bodies to prevent table geometry conflicts.",
    hint: "Place dynamic array formulas on regular worksheet grids, not inside Tables.",
    level: "moderate",
    codeExample: "// Table1[Col] = =UNIQUE(...) -> Returns #SPILL!"
  },
  {
    question: "Why does writing `=UNIQUE(A:A)` often cause a #SPILL! error?",
    shortAnswer: "Full column references attempt to evaluate all 1,048,576 rows, easily overflowing the worksheet boundary.",
    explanation: "Referencing an entire column `A:A` forces Excel to process every blank cell down to row 1,048,576, which cannot fit if the formula is entered below row 1.",
    hint: "Use bounded ranges (e.g. A2:A1000) instead of entire columns (A:A).",
    level: "moderate",
    codeExample: "// Change =UNIQUE(A:A) to =UNIQUE(FILTER(A2:A1000, A2:A1000<>\"\"))"
  },
  {
    question: "How can an invisible character cause a persistent #SPILL! error?",
    shortAnswer: "A cell containing a space character (' ') or empty string (=\"\") looks empty to the human eye, but is non-empty to Excel.",
    explanation: "Cells containing whitespace or apostrophes (`'`) are non-empty. Selecting the cell and pressing `Delete` clears the invisible content.",
    hint: "Press Delete on seemingly blank cells in the blue spill border.",
    level: "moderate",
    codeExample: "// A cell with ' ' (space) blocks the spill"
  },
  {
    question: "What is an 'Out of Grid' #SPILL! error?",
    shortAnswer: "When an array formula requires more rows or columns than exist between its origin cell and the edge of the worksheet.",
    explanation: "If an array requires 100 rows and is placed in row 1,048,500, it runs out of worksheet rows (max 1,048,576) and triggers `#SPILL!`.",
    hint: "The array extends past the worksheet boundary.",
    level: "moderate",
    codeExample: "// Array of 100 rows in cell A1048500 -> Out of Grid #SPILL!"
  },
  {
    question: "What causes a #SPILL! error labeled 'Spill range is unknown'?",
    shortAnswer: "Volatile formulas whose size fluctuates dynamically during calculation iterations.",
    explanation: "If an array's size depends on a formula that recalculates dynamically during the same calculation cycle (e.g. nested RANDARRAY or indirect circular ranges), Excel cannot fix its dimensions.",
    hint: "Formula dimensions fluctuate during iterative calculation.",
    level: "advanced",
    codeExample: "=SEQUENCE(RANDBETWEEN(1, 100)) // Can cause volatile spill size issues"
  },
  {
    question: "What happens when two dynamic array formulas attempt to spill into overlapping cells?",
    shortAnswer: "Both formulas (or the downstream formula) return #SPILL! due to collision.",
    explanation: "Dynamic array spill perimeters are mutually exclusive. They cannot overlap on the same worksheet cells.",
    hint: "Separate the formulas into non-overlapping columns or rows.",
    level: "basic",
    codeExample: "// Formula in A1 spilling A1:C10 vs Formula in B5 spilling B5:D15 -> Collision"
  },
  {
    question: "How do you fix a #SPILL! error caused by an Excel Table?",
    shortAnswer: "Move the formula outside the Table or convert the Table to a standard range (Table Design > Convert to Range).",
    explanation: "Placing the formula outside the table allows it to reference table columns dynamically while spilling freely on standard grid cells.",
    hint: "Move the formula outside the Table perimeter.",
    level: "moderate",
    codeExample: "// Place =UNIQUE(Table1[City]) in cell J2 outside Table1"
  },
  {
    question: "How can you restrict the size of a spilled array to prevent it from colliding with adjacent tables?",
    shortAnswer: "Use TAKE or CHOOSEROWS to limit the number of returned rows: =TAKE(SORT(UNIQUE(...)), 10).",
    explanation: "`TAKE(..., 10)` enforces a strict maximum height of 10 rows, preventing unwanted expansion into nearby dashboard sections.",
    hint: "Cap array height using TAKE(Array, MaxRows).",
    level: "advanced",
    codeExample: "=TAKE(SORT(UNIQUE(A2:A100)), 10)"
  },
  {
    question: "Can conditional formatting on destination cells cause a #SPILL! error?",
    shortAnswer: "No, formatting rules and cell fills do not block spilled arrays as long as cell contents are empty.",
    explanation: "Dynamic arrays write values, not cell formatting. Formatting alone does not trigger `#SPILL!`.",
    hint: "Formatting does not cause #SPILL!; only cell content and merging do.",
    level: "moderate",
    codeExample: "// Shaded background color in empty cells does not trigger #SPILL!"
  },
  {
    question: "What is the best architectural practice for positioning dynamic array formulas on dashboard sheets?",
    shortAnswer: "Place inputs and headers above or to the left of formulas, leaving unobstructed space below and to the right.",
    explanation: "Allowing free downward and rightward expansion accommodates dynamic dataset growth without collision.",
    hint: "Leave generous empty space below and to the right of spill origins.",
    level: "basic",
    codeExample: "// Headers in Row 1, Spill Formula in Row 2 spilling down"
  },
  {
    question: "How does the implicit intersection operator (@) prevent #SPILL! errors in single-value contexts?",
    shortAnswer: "Adding `@` forces Excel to evaluate only the current single row/column, returning a scalar instead of a spilled array.",
    explanation: "In legacy formulas, `@` restricts evaluation to a single cell value, disabling spilling.",
    hint: "Use @ to force single-cell scalar evaluation.",
    level: "moderate",
    codeExample: "=@A2:A20 // Returns only the single value on the current row"
  },
  {
    question: "Why should you never use whole column references like `FILTER(A:A, B:B=\"X\")` in dynamic dashboards?",
    shortAnswer: "It degrades workbook performance, wastes RAM, and frequently triggers 'Out of Grid' #SPILL! errors.",
    explanation: "Excel must allocate memory for over a million cells. Always use bounded ranges (e.g. `A2:A5000`) or structured Table references.",
    hint: "Use bounded ranges or Excel Table columns to conserve memory.",
    level: "expert",
    codeExample: "=FILTER(Table1[Name], Table1[City]=\"Barrackpore\")"
  },
  {
    question: "How do you detect #SPILL! errors programmatically across an entire workbook in VBA?",
    shortAnswer: "Use SpecialCells with xlCellTypeFormulas and check for `CVErr(xlErrSpill)` or error value 2045.",
    explanation: "Auditing tools scan formula cells and flag instances of error code 2045 (`#SPILL!`).",
    hint: "Audit using Excel's error diagnostic tools.",
    level: "expert",
    codeExample: "If cell.Value = CVErr(xlErrSpill) Then MsgBox \"Spill Collision in \" & cell.Address"
  },
  {
    question: "What happens if a user filters or hides rows that contain a spilled array?",
    shortAnswer: "The array continues calculating; hidden rows simply hide the corresponding elements visually.",
    explanation: "Hiding rows does not block or break the spilled formula. The values exist in memory.",
    hint: "Hiding rows does not trigger #SPILL!.",
    level: "basic",
    codeExample: "// Hidden rows conceal spilled rows visually without error"
  },
  {
    question: "How do you design multi-card KPI dashboards that never suffer from #SPILL! errors?",
    shortAnswer: "Isolate calculation formulas on a dedicated Calculation Sheet and display only scalar aggregates (=INDEX, =SUM) on the Dashboard Sheet.",
    explanation: "Decoupling raw spilled arrays from executive presentation cards guarantees that layout widgets will never collide.",
    hint: "Separate Calculation and Presentation layers.",
    level: "expert",
    codeExample: "// CalcSheet holds =UNIQUE(...) -> Dashboard holds =INDEX(CalcSheet!A2#, 1, 1)"
  },
  {
    question: "Can an array formula in cell A1 spill into locked cells on a protected worksheet?",
    shortAnswer: "If destination cells are locked and the sheet is protected, Excel raises a #SPILL! error.",
    explanation: "Spilling writes values to cells. If destination cells are protected against editing, calculation is halted.",
    hint: "Unlock the entire spill perimeter before protecting the worksheet.",
    level: "advanced",
    codeExample: "// Unlock range A1:Z100 before applying Sheet Protection"
  },
  {
    question: "Why does converting a merged cell back into standard cells immediately resolve #SPILL!?",
    shortAnswer: "Because it restores individual rectangular cell coordinates, allowing Excel's grid writer to populate every element.",
    explanation: "Unmerging eliminates null coordinate blocks, fulfilling the requirement for a clean rectangular grid.",
    hint: "Unmerge cells to restore standard coordinate geometry.",
    level: "basic",
    codeExample: "Home > Alignment > Unmerge Cells"
  },
  {
    question: "What happens if an external link formula spills and the linked workbook is closed?",
    shortAnswer: "The spilled array caches the last calculated values and remains spilled without error.",
    explanation: "Excel caches external dynamic array dimensions in memory.",
    hint: "Spill state is preserved via external link cache.",
    level: "moderate",
    codeExample: "// Cached values stay spilled even when linked source is closed"
  },
  {
    question: "How do you dynamically detect if a cell has a #SPILL! error using Excel formulas?",
    shortAnswer: "Use =ISERROR(A2) and check if ERROR.TYPE(A2) = 9 (error code for #SPILL!).",
    explanation: "`ERROR.TYPE` returns `9` for `#SPILL!`, allowing automated error monitoring formulas.",
    hint: "ERROR.TYPE returns 9 for #SPILL! errors.",
    level: "advanced",
    codeExample: "=IF(ERROR.TYPE(A2)=9, \"Blocked Range!\", \"OK\")"
  },
  {
    question: "How does the 'Spill range extends beyond the worksheet' error differ from a standard blocked cell error?",
    shortAnswer: "Blocked cell means an obstacle exists; boundary error means there are literally not enough grid rows/columns in Excel to fit the array.",
    explanation: "Excel has fixed limits (1,048,576 rows × 16,384 columns). If an array exceeds this boundary, it cannot physically fit.",
    hint: "Boundary error is a physical grid limit; blocked cell is an obstacle.",
    level: "moderate",
    codeExample: "// Array size > available grid space to the sheet edge"
  },
  {
    question: "Can you spill a dynamic array into a range with Data Validation rules applied?",
    shortAnswer: "Yes, dynamic arrays can spill into cells with Data Validation rules without error.",
    explanation: "Excel's formula engine bypasses data entry validation rules when spilling calculated array results.",
    hint: "Data validation does not block spilled arrays.",
    level: "moderate",
    codeExample: "// Spilled values populate despite cell Data Validation rules"
  },
  {
    question: "Why does placing notes, comments, or cell annotations in column headers prevent #SPILL!?",
    shortAnswer: "Comments and modern notes float on the annotation layer and do not occupy cell content.",
    explanation: "Cell comments do not reside in cell value storage, so they do not obstruct spilled arrays.",
    hint: "Comments and notes do not block spills.",
    level: "basic",
    codeExample: "// Modern Notes and Comments do not trigger #SPILL!"
  },
  {
    question: "What is the recommended shortcut to clear all data in an obstructed spill perimeter?",
    shortAnswer: "Click 'Select Obstructing Cell' from smart tag, press Ctrl+Shift+Down/Right, and hit Delete.",
    explanation: "Quickly clears all stray cell contents in the required bounding box.",
    hint: "Select obstructing cell and press Delete.",
    level: "basic",
    codeExample: "Smart Tag > Select Obstructing Cell > Delete"
  },
  {
    question: "How do you prevent #SPILL! errors when writing formulas that users might drag across columns?",
    shortAnswer: "Educate users that dynamic array formulas must NEVER be dragged; they spill automatically from one single top-left cell.",
    explanation: "Dragging a dynamic array formula across cells creates identical overlapping formulas, causing instant collision `#SPILL!` errors.",
    hint: "Enter the formula once in the top-left origin cell; do not drag.",
    level: "basic",
    codeExample: "// Enter in J2 only; do not drag down to J3, J4..."
  },
  {
    question: "Why is comprehensive #SPILL! error mastery essential for corporate spreadsheet integrity?",
    shortAnswer: "It prevents executive dashboard failures, ensures resilient automated reporting, and maintains robust calculation integrity.",
    explanation: "Across corporate offices in Barrackpore and Kolkata, understanding grid geometry, collision resolution, and clean layout design ensures enterprise models run smoothly with 100% uptime.",
    hint: "Mastery of #SPILL! guarantees bulletproof dashboard stability.",
    level: "expert",
    codeExample: "// Resilient Architecture: Unmerged Cells + Bounded Tables + Dedicated Presentation Layer"
  }
];

export default questions;
