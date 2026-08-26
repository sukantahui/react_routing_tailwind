// topic0_questions.js
// 30 Structured Questions covering Modern Calculation Engine, Dynamic Arrays & #SPILL! Errors

const questions = [
  {
    question: "What is the primary difference between Excel's modern calculation engine and the legacy calculation engine?",
    shortAnswer: "The modern engine treats arrays natively and automatically spills results across multiple cells, eliminating legacy Ctrl+Shift+Enter (CSE) requirements.",
    explanation: "In legacy Excel versions (2019 and earlier), formulas returned scalar (single) values unless explicitly committed with Ctrl+Shift+Enter across a pre-selected fixed range. The modern calculation engine in Excel 365 and 2021+ evaluates all formulas natively as array-capable, dynamically allocating output cells (spilling) to match the return array's exact runtime dimensions.",
    hint: "Think about typing a single formula in one cell and seeing it populate 10 rows automatically.",
    level: "basic",
    codeExample: "=UNIQUE(A2:A50)"
  },
  {
    question: "What does the term 'spilling' mean in Microsoft Excel?",
    shortAnswer: "Spilling is the automated process where a multi-cell formula output populates adjacent blank cells down and to the right.",
    explanation: "When a formula returns an array of multiple elements (e.g. 10 rows by 3 columns), Excel automatically places the results into the origin cell and expands outward into the neighboring empty cells. The area occupied by these values is known as the 'spill range'.",
    hint: "Picture pouring water into a container that naturally flows into neighboring connected areas.",
    level: "basic",
    codeExample: "=SEQUENCE(5, 2, 10, 5)"
  },
  {
    question: "How do you refer to an entire spilled dynamic array in subsequent formulas?",
    shortAnswer: "By placing the hash (#) spilled range operator immediately after the origin cell address (e.g., A2#).",
    explanation: "The spilled range operator `#` tells Excel to dynamically reference the full rectangle of cells produced by the formula located at the specified top-left cell coordinate. If the underlying data changes and the array expands from 10 rows to 50 rows, `A2#` automatically adapts without modifying the formula.",
    hint: "Use the top-left cell where you typed the original formula followed by the '#' character.",
    level: "basic",
    codeExample: "=SUM(E2#)"
  },
  {
    question: "What causes the classic '#SPILL!' error in Excel?",
    shortAnswer: "The formula's required output range is obstructed by existing data, merged cells, or sheet boundaries.",
    explanation: "Excel requires a clean, unobstructed grid of empty cells to display a spilled array. If even a single cell within the projected spill rectangle contains a value, formula, empty string (`\"\"`), or merged formatting, Excel halts rendering and outputs `#SPILL!` to prevent accidental data overwriting.",
    hint: "Check if something is blocking the path where the results want to land.",
    level: "basic",
    codeExample: "// Formula at A1 requires A1:A5, but cell A3 contains text 'Test'"
  },
  {
    question: "Can dynamic array formulas spill inside an official Excel Table (ListObject)?",
    shortAnswer: "No, dynamic array formulas cannot spill within Excel Tables; they return a #SPILL! error.",
    explanation: "Excel Tables (`Ctrl+T` / `ListObject`) maintain their own structured formula propagation engine where every row in a calculated column must execute identically per record. Spilling a multi-row array inside a table column conflicts with table row autonomy. Dynamic arrays should be placed in standard worksheet ranges, though they can freely reference Table columns.",
    hint: "Remember that Excel Tables have calculated columns that expect single-row evaluation.",
    level: "moderate",
    codeExample: "=FILTER(Table1[Sales], Table1[Region]=\"Barrackpore\") // Valid outside Table1, invalid inside Table1"
  },
  {
    question: "How do merged cells impact dynamic array formulas?",
    shortAnswer: "Merged cells in the spill trajectory immediately trigger a #SPILL! error because they disrupt rectangular grid allocation.",
    explanation: "Dynamic array spilling requires uniform, individual rectangular grid cells. Merged cells span across multiple cell addresses, preventing the calculation engine from addressing discrete array indices. The industry best practice is to unmerge cells and use 'Center Across Selection' for visual alignment.",
    hint: "Unmerge all cells in the target output area.",
    level: "moderate",
    codeExample: "// Unmerge cells in target destination before evaluating =SORT(A2:A20)"
  },
  {
    question: "What is the purpose of the '@' (Implicit Intersection) operator in modern Excel formulas?",
    shortAnswer: "The '@' operator forces a multi-cell range or array to evaluate strictly as a single value at the intersection of the current row/column.",
    explanation: "When opening legacy workbooks in Excel 365, Excel automatically prefixes formulas with `@` (e.g. `=@A:A`) to ensure backward compatibility and prevent unintended spilling. It informs the calculation engine to evaluate only the single cell that shares the current row with the formula.",
    hint: "Think of '@' as a safety brake preventing a full column reference from spilling down the entire sheet.",
    level: "moderate",
    codeExample: "=@A2:A100 // Evaluates only the single value on the current row"
  },
  {
    question: "What happens if a dynamic array formula tries to spill beyond the 1,048,576 row limit of an Excel worksheet?",
    shortAnswer: "It triggers a #SPILL! error with the explanation 'Spill range is too large' or 'extends beyond the worksheet'.",
    explanation: "If a formula references an entire column without bounds (e.g., `=A:A + 10` placed at row 10), it requires 1,048,576 rows of space starting from row 10, which exceeds the sheet's bottom edge by 9 rows. Excel returns `#SPILL!` because it cannot wrap or truncate the array.",
    hint: "Avoid referencing entire columns like A:A inside dynamic array formulas unless starting at row 1.",
    level: "moderate",
    codeExample: "=FILTER(A2:A1000, B2:B1000>5000) // Bound references properly instead of A:A"
  },
  {
    question: "How can you tell the difference between the 'Origin Cell' and a 'Spilled Ghost Cell'?",
    shortAnswer: "The origin cell has an editable formula in the formula bar; ghost cells display the formula in greyed-out non-editable text.",
    explanation: "When you select the top-left cell of a spilled array (the origin cell), the formula bar is fully active and can be edited. When you click any other cell in the spilled range, a thin blue border highlights the entire range, and the formula bar shows the formula enclosed in grey text, indicating it is an automated projection.",
    hint: "Look at the formula bar color and attempt to press Backspace on a secondary cell.",
    level: "basic",
    codeExample: "// Origin: Cell D2 contains =SORT(A2:A20). Cells D3:D20 are ghost cells."
  },
  {
    question: "What happens if you type a value into one of the ghost cells of an active dynamic array?",
    shortAnswer: "The entire dynamic array immediately collapses and the origin cell displays a #SPILL! error.",
    explanation: "Typing any content into a ghost cell introduces an obstruction in the required spill perimeter. Excel instantly collapses all spilled values and displays `#SPILL!` at the origin cell until the conflicting value is deleted.",
    hint: "The formula will not overwrite your manual entry; it halts until you delete it.",
    level: "basic",
    codeExample: "// Type '100' in D5 -> Cell D2 changes from array output to #SPILL!"
  },
  {
    question: "How do you create a dynamic Data Validation dropdown list that automatically updates when a spilled array expands?",
    shortAnswer: "Set the Data Validation list source to `=A2#` (where A2 is the origin cell of the spilled array).",
    explanation: "By entering `=A2#` in the Data Validation Source dialog, Excel dynamically links the dropdown list to the entire live spilled array. Whenever unique items are added to the source dataset and the spill array grows, the dropdown list updates instantaneously without manual range editing.",
    hint: "Point the validation source formula to the top-left cell with a '#' suffix.",
    level: "advanced",
    codeExample: "Data Validation > Source: =J2#"
  },
  {
    question: "Why does the formula `=COUNTA(A2#)` return the exact count of items in a spilled array, whereas `=COUNTA(A2)` returns 1?",
    shortAnswer: "`A2#` references the entire multi-cell spilled range, while `A2` references only the single scalar origin cell.",
    explanation: "`A2` refers strictly to the single coordinate `A2`. Adding the `#` operator (`A2#`) instructs the function to expand the reference to the full rectangular bounds (e.g. `A2:A35`) generated by the calculation engine at runtime.",
    hint: "Remember that '#' is the operator for the whole dynamic group.",
    level: "moderate",
    codeExample: "=COUNTA(A2#) // Returns 34 (number of spilled items)"
  },
  {
    question: "Can dynamic array formulas return 2-dimensional (multi-row and multi-column) tables simultaneously?",
    shortAnswer: "Yes, dynamic array formulas can spill both vertically across rows and horizontally across columns.",
    explanation: "Functions such as `FILTER(A2:D100, E2:E100=\"Confirmed\")` or `SEQUENCE(10, 5)` output matrices with multiple rows and multiple columns in a single step, allocating the required rectangular area automatically.",
    hint: "Think about filtering a 4-column master table into a 4-column summary output.",
    level: "moderate",
    codeExample: "=FILTER(A2:D20, B2:B20=\"Barrackpore\") // Spills rows x 4 columns"
  },
  {
    question: "How do you sort a spilled dynamic array on multiple columns with different sorting orders?",
    shortAnswer: "Use the SORTBY function with paired array and sort order arguments.",
    explanation: "While `SORT` can sort on a single index, `SORTBY` allows multi-tier sorting. For example, `=SORTBY(A2:D20, B2:B20, 1, D2:D20, -1)` sorts the dataset first by Department ascending (1), then by Gross Revenue descending (-1).",
    hint: "Use SORTBY when you need primary, secondary, and tertiary sorting criteria.",
    level: "advanced",
    codeExample: "=SORTBY(A2:D20, C2:C20, 1, G2:G20, -1)"
  },
  {
    question: "What is the computational benefit of dynamic arrays over legacy volatile OFFSET and INDIRECT functions?",
    shortAnswer: "Dynamic arrays calculate efficiently in memory on the dependency tree, whereas OFFSET and INDIRECT trigger full workbook recalculations on every change.",
    explanation: "Legacy dynamic range solutions relied on `OFFSET` and `INDIRECT`, which are volatile functions that recalculate whenever any cell in the entire workbook is modified. Modern dynamic arrays (`FILTER`, `INDEX`, `A2#`) are non-volatile and compute only when upstream dependent cells change, drastically speeding up large corporate workbooks.",
    hint: "Dynamic arrays are non-volatile and participate cleanly in Excel's smart calculation tree.",
    level: "advanced",
    codeExample: "=FILTER(A2:B100, A2:A100<>\"\") // High speed vs legacy volatile =OFFSET(A2,0,0,COUNTA(A:A),2)"
  },
  {
    question: "How do you combine multiple dynamic array functions in a single nested pipeline?",
    shortAnswer: "Nest functions sequentially, such as passing a FILTER output into UNIQUE, and then into SORT.",
    explanation: "Because dynamic array functions accept arrays as inputs and return arrays as outputs, they can be chained cleanly. `=SORT(UNIQUE(FILTER(A2:A100, B2:B100=\"Barrackpore\")))` first filters the records, extracts the distinct entries, and finally sorts them alphabetically in one formula.",
    hint: "Work from the inside out: Filter -> Unique -> Sort.",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(FILTER(C2:C50, H2:H50=\"Confirmed\")))"
  },
  {
    question: "What happens if a FILTER function finds zero matching rows that satisfy the condition?",
    shortAnswer: "It returns the value specified in its optional `[if_empty]` argument, or `#CALC!` if omitted.",
    explanation: "If no records meet the criteria and the `[if_empty]` parameter is omitted, Excel returns a `#CALC!` error indicating an empty array. Providing an explicit fallback like `=FILTER(A2:D20, B2:B20=\"Delhi\", \"No Records Found\")` prevents error propagation.",
    hint: "Always populate the 3rd argument of FILTER to handle zero-match scenarios gracefully.",
    level: "moderate",
    codeExample: "=FILTER(A2:D20, C2:C20=\"Siliguri\", \"No Branch Data Available\")"
  },
  {
    question: "How does Boolean array arithmetic work in multi-criteria FILTER formulas?",
    shortAnswer: "Use multiplication (*) for AND logic and addition (+) for OR logic across criteria arrays.",
    explanation: "Standard `AND()` and `OR()` functions aggregate entire arrays into a single TRUE/FALSE scalar, breaking row-by-row filtering. In dynamic arrays, multiplying boolean conditions `(A2:A20=\"Male\") * (B2:B20>25)` enforces AND logic (1*1=1), while adding `(C2:C20=\"Tax\") + (C2:C20=\"Audit\")` enforces OR logic.",
    hint: "Multiply for AND, Add for OR when writing array criteria.",
    level: "advanced",
    codeExample: "=FILTER(A2:G20, (C2:C20=\"Barrackpore\") * (G2:G20>=100000), \"None\")"
  },
  {
    question: "How does the SEQUENCE function replace manual dragging of row numbering serials?",
    shortAnswer: "`SEQUENCE(rows, [columns], [start], [step])` generates a live sequential array of numbers in memory.",
    explanation: "`=SEQUENCE(100, 1, 1001, 1)` generates serial numbers 1001 to 1100 down 100 rows in one formula. Combined with `COUNTA`, `=SEQUENCE(COUNTA(B2:B100))` creates an auto-expanding serial number column that adjusts automatically as records are appended.",
    hint: "Use SEQUENCE with COUNTA for self-adjusting auto-numbering.",
    level: "moderate",
    codeExample: "=SEQUENCE(COUNTA(B2:B50), 1, 1, 1)"
  },
  {
    question: "What is the RANDARRAY function and where is it used in professional modeling?",
    shortAnswer: "`RANDARRAY(rows, columns, min, max, integer)` generates random matrix numbers for Monte Carlo simulations and stress testing.",
    explanation: "Unlike legacy `=RAND()` and `=RANDBETWEEN()` which calculate single cells, `RANDARRAY` generates an entire matrix of random floats or integers in a single step. It is widely used in financial risk modeling, probability simulations, and synthetic dataset generation.",
    hint: "Specify row and column dimensions along with min and max integer flags.",
    level: "advanced",
    codeExample: "=RANDARRAY(50, 1, 1000, 5000, TRUE) // Generates 50 random integer fees"
  },
  {
    question: "How does XLOOKUP leverage the dynamic array engine to return multiple columns simultaneously?",
    shortAnswer: "By supplying a multi-column range in the `return_array` argument (e.g. B2:E100), XLOOKUP spills all columns across the row.",
    explanation: "Legacy VLOOKUP required separate formulas with hardcoded column numbers (2, 3, 4) for each retrieved field. In Excel 365, `=XLOOKUP(G2, A2:A100, B2:E100)` retrieves Name, Department, City, and Salary in a single horizontal spill across 4 columns.",
    hint: "Pass a multi-column block to the return_array argument of XLOOKUP.",
    level: "advanced",
    codeExample: "=XLOOKUP(\"TX-1001\", A2:A20, B2:H20, \"Not Found\")"
  },
  {
    question: "Can you perform mathematical operations directly on spilled array references?",
    shortAnswer: "Yes, you can apply arithmetic operators or functions directly to `A2#` (e.g., `=A2# * 1.18`).",
    explanation: "Because `A2#` represents the full matrix, applying a scalar operation like `=G2# * 0.18` (calculating 18% GST on all spilled revenue rows) causes the calculation engine to vectorize the multiplication across every single element, producing a matching spilled tax column.",
    hint: "Treat A2# just like an array variable in code.",
    level: "moderate",
    codeExample: "=G2# * 0.18 // Calculates 18% GST on all spilled revenue values"
  },
  {
    question: "What tool in Excel allows you to identify which cell is causing a #SPILL! blockage?",
    shortAnswer: "Click the smart tag error icon next to the #SPILL! cell and select 'Select Obstructing Cell'.",
    explanation: "When a `#SPILL!` error occurs, Excel displays a yellow warning diamond icon. Clicking this icon reveals a context menu option 'Select Obstructing Cell'. Excel will instantly jump the cursor to and highlight the exact cell containing the obstructing character or merged format.",
    hint: "Look for the warning dropdown menu next to the formula error.",
    level: "basic",
    codeExample: "// Click Error Indicator > Select Obstructing Cell"
  },
  {
    question: "How do dynamic arrays handle empty strings (`\"\"`) in the spill path?",
    shortAnswer: "Empty strings (`\"\"`) are treated as valid text content and will block the spill, triggering a #SPILL! error.",
    explanation: "A cell containing an empty string formula result (e.g., from an `=IF(condition, value, \"\")` that evaluated to empty) is not blank (`ISBLANK` returns FALSE). Because the cell is not empty, it acts as an obstacle and causes `#SPILL!`.",
    hint: "Pressing Delete on a seemingly empty cell clears residual empty strings.",
    level: "moderate",
    codeExample: "// Clear ghost formulas in the spill destination using the Delete key"
  },
  {
    question: "How do dynamic arrays interact with Excel's Charting engine?",
    shortAnswer: "Charts can be connected directly to spilled ranges by creating a Dynamic Named Range with the # operator.",
    explanation: "Excel chart series formulas cannot parse `#` directly in the series dialog (e.g. `Sheet1!A2#` in the chart wizard). However, creating a Named Range in Name Manager (`MySpilledData = Sheet1!$A$2#`) and assigning that Named Range to the chart allows the chart to automatically expand and contract its axes dynamically.",
    hint: "Wrap A2# in a Name Manager definition before linking to a Chart Series.",
    level: "expert",
    codeExample: "Name Manager: SalesChartData = Sheet1!$G$2#"
  },
  {
    question: "What is the difference between single-column UNIQUE and multi-column UNIQUE?",
    shortAnswer: "Single-column UNIQUE extracts distinct values from one column; multi-column UNIQUE extracts distinct combinations of values across multiple columns.",
    explanation: "When passed a multi-column range like `=UNIQUE(B2:C20)` (Agent Name and Location), Excel evaluates the combined pair `(Swadeep, Barrackpore)`. If Swadeep appears twice in Barrackpore, it outputs once; if Swadeep appears in Barrackpore and once in Kolkata, both unique composite rows are returned.",
    hint: "Multi-column UNIQUE checks uniqueness across the entire row combination.",
    level: "advanced",
    codeExample: "=UNIQUE(B2:C21) // Unique Agent + Branch combinations"
  },
  {
    question: "Why should you avoid referencing volatile functions inside dynamic array calculations?",
    shortAnswer: "Volatile functions inside arrays cause excessive recalculation cycles and can trigger circular calculation timeouts.",
    explanation: "Combining volatile functions like `NOW()`, `TODAY()`, or `RAND()` inside massive spilled arrays forces Excel to recalculate hundreds of thousands of cells on every single worksheet interaction, degrading performance and responsiveness.",
    hint: "Calculate volatile dates once in a single cell, then reference that cell in your array.",
    level: "expert",
    codeExample: "// Place =TODAY() in cell Z1, then use =FILTER(A2:D100, D2:D100<=Z1)"
  },
  {
    question: "How do dynamic arrays simplify 2-way matrix lookups compared to legacy INDEX(MATCH, MATCH)?",
    shortAnswer: "You can use nested XLOOKUP or CHOOSEROWS/CHOOSECOLS to return entire cross-sections without coordinate arithmetic.",
    explanation: "`=XLOOKUP(TargetRow, RowHeaderRange, XLOOKUP(TargetCol, ColHeaderRange, DataMatrix))` dynamically extracts the intersection cell cleanly in one readable line with built-in missing value handling.",
    hint: "Nest an XLOOKUP inside an XLOOKUP for a 2-way dynamic grid search.",
    level: "expert",
    codeExample: "=XLOOKUP(J2, A2:A20, XLOOKUP(K2, B1:H1, B2:H20, \"N/A\"))"
  },
  {
    question: "What is the best practice for laying out worksheets that contain multiple dynamic array formulas?",
    shortAnswer: "Arrange dynamic array tables side-by-side with buffer columns or on separate sheets to avoid vertical spill collisions.",
    explanation: "Placing one dynamic array directly above another in the same columns is dangerous: if the top array expands, it will collide with the bottom array and trigger a `#SPILL!` error. Always place dynamic tables in separate columns with 2-3 empty buffer columns, or isolate them on dedicated calculation sheets.",
    hint: "Never stack two dynamic vertical tables in the same column range.",
    level: "expert",
    codeExample: "// Table 1 in Columns A-D, Buffer Column E, Table 2 in Columns F-J"
  },
  {
    question: "How does the modern calculation engine process array formulas across multiple CPU cores?",
    shortAnswer: "The modern calculation engine utilizes multi-threaded calculation (MTC) to parallelize independent array operations across all CPU cores.",
    explanation: "Excel breaks down the calculation dependency graph and distributes independent spilled array computations across all available hardware threads. This parallel execution delivers near-instantaneous calculations even on datasets with tens of thousands of vectorized array transformations.",
    hint: "Multi-threaded calculation ensures dynamic arrays leverage all CPU cores efficiently.",
    level: "expert",
    codeExample: "// Parallel calculation active across all logical processor cores"
  }
];

export default questions;
