// topic4_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 4
// Topic: Extracting Specific Columns and Reordering Layouts with CHOOSECOLS
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of CHOOSECOLS in Excel 365?",
    shortAnswer: "It extracts and reorders specific columns from an array or range based on provided column indexes.",
    explanation: "CHOOSECOLS takes a 2D matrix or dynamic array and returns a new matrix containing only the specified columns, arranged in the exact order passed as arguments.",
    hint: "Extracts and reorders columns by index.",
    level: "basic",
    codeExample: "=CHOOSECOLS(A2:J100, 1, 5, 2, 10)"
  },
  {
    question: "What is the syntax signature of the CHOOSECOLS function?",
    shortAnswer: "=CHOOSECOLS(array, col_num1, [col_num2], ...)",
    explanation: "The first argument 'array' is the source matrix. Subsequent arguments 'col_num1', 'col_num2', etc., are integer column indexes to extract and position in the output.",
    hint: "Array followed by one or more column index numbers.",
    level: "basic",
    codeExample: "=CHOOSECOLS(Table1, 1, 3, 5)"
  },
  {
    question: "How does negative indexing work in CHOOSECOLS?",
    shortAnswer: "Negative numbers count backwards from the rightmost column (-1 is the last column, -2 is the second last).",
    explanation: "Passing -1 returns the far-right column of the array, regardless of how many columns exist in the source table.",
    hint: "Index -1 always refers to the rightmost column.",
    level: "basic",
    codeExample: "=CHOOSECOLS(A2:Z100, -1)"
  },
  {
    question: "How can CHOOSECOLS reorder table columns dynamically without changing source worksheet columns?",
    shortAnswer: "By listing column index arguments in the desired output sequence.",
    explanation: "If source columns are [ID=1, Name=2, Dept=3, Salary=4], passing =CHOOSECOLS(Table, 1, 4, 2) outputs [ID, Salary, Name], reordering the columns dynamically in memory.",
    hint: "Order of arguments determines output column sequence.",
    level: "moderate",
    codeExample: "=CHOOSECOLS(A2:D50, 1, 4, 2)"
  },
  {
    question: "Can CHOOSECOLS duplicate columns by repeating column indices?",
    shortAnswer: "Yes, CHOOSECOLS duplicates columns in the output as many times as their index is listed.",
    explanation: "Specifying =CHOOSECOLS(A2:D10, 1, 2, 2, 4) repeats column 2 twice in the output matrix.",
    hint: "Repeating index numbers repeats columns.",
    level: "moderate",
    codeExample: "=CHOOSECOLS(A2:D10, 1, 2, 2, 4)"
  },
  {
    question: "How can you extract the first column and the last 2 columns of an unknown width dataset using CHOOSECOLS?",
    shortAnswer: "=CHOOSECOLS(array, 1, -2, -1)",
    explanation: "Argument 1 extracts the leftmost column; arguments -2 and -1 extract the two rightmost columns dynamically.",
    hint: "Combine positive index 1 with negative indices -2, -1.",
    level: "moderate",
    codeExample: "=CHOOSECOLS(DynamicTable#, 1, -2, -1)"
  },
  {
    question: "Can CHOOSECOLS accept an array constant or SEQUENCE vector as its column index argument?",
    shortAnswer: "Yes, CHOOSECOLS accepts vectors like {1, 3, 5} or SEQUENCE expressions for the col_num parameter.",
    explanation: "You can pass an inline array constant =CHOOSECOLS(Data, {1, 3, 5}) or use SEQUENCE to generate dynamic column index ranges.",
    hint: "Pass {1, 3, 5} or SEQUENCE directly.",
    level: "advanced",
    codeExample: "=CHOOSECOLS(A2:J50, {1, 3, 5, 7})"
  },
  {
    question: "How can you reverse the entire horizontal column order of a table using CHOOSECOLS?",
    shortAnswer: "=CHOOSECOLS(Data, SEQUENCE(1, COLUMNS(Data), COLUMNS(Data), -1))",
    explanation: "SEQUENCE generates a horizontal countdown sequence from total columns down to 1. CHOOSECOLS flips the table from right to left.",
    hint: "Use a descending horizontal SEQUENCE with CHOOSECOLS.",
    level: "advanced",
    codeExample: "=LET(d, A2:F30, CHOOSECOLS(d, SEQUENCE(1, COLUMNS(d), COLUMNS(d), -1)))"
  },
  {
    question: "What error occurs if a column index of 0 is passed to CHOOSECOLS?",
    shortAnswer: "#VALUE! error.",
    explanation: "Column indexing is 1-based (positive) or -1-based (negative). A column index of 0 does not exist in Excel.",
    hint: "Column indexing starts at 1 or -1.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "What error occurs if a requested column index exceeds the total column count of the array?",
    shortAnswer: "#VALUE! error.",
    explanation: "Requesting column 12 from a 10-column table triggers a #VALUE! out-of-bounds error.",
    hint: "Out-of-bounds column indices trigger #VALUE!.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "How does CHOOSECOLS improve security and data masking in corporate reporting?",
    shortAnswer: "By extracting only non-sensitive presentation fields while omitting confidential columns like Basic Salary, PAN, or Bank Account numbers.",
    explanation: "Instead of hiding columns (which can be unhidden by users), CHOOSECOLS creates an in-memory projection containing only authorized presentation fields.",
    hint: "Extract only public columns, leaving sensitive raw data behind.",
    level: "advanced",
    codeExample: "=CHOOSECOLS(PayrollMaster, 1, 2, 5, 10)"
  },
  {
    question: "How does CHOOSECOLS interact with FILTER in dynamic reporting pipelines?",
    shortAnswer: "FILTER reduces rows based on criteria; CHOOSECOLS reduces and reorders columns from the filtered result.",
    explanation: "Combining =CHOOSECOLS(FILTER(Table, Dept=\"Dev\"), 1, 2, 4) performs 2-dimensional database querying entirely in a single formula.",
    hint: "FILTER handles row criteria; CHOOSECOLS handles column projection.",
    level: "moderate",
    codeExample: "=CHOOSECOLS(FILTER(A2:H100, E2:E100=\"Barrackpore\"), 1, 2, 7)"
  },
  {
    question: "How can CHOOSECOLS and CHOOSEROWS be nested together to slice an exact sub-matrix?",
    shortAnswer: "=CHOOSECOLS(CHOOSEROWS(array, 1, 2, 3), 1, 4)",
    explanation: "CHOOSEROWS extracts the top 3 rows; CHOOSECOLS extracts columns 1 and 4 from that subset, returning a 3-row x 2-column grid.",
    hint: "Nest CHOOSEROWS inside CHOOSECOLS.",
    level: "moderate",
    codeExample: "=CHOOSECOLS(CHOOSEROWS(MasterTable, 1, 5, 10), 1, 3, 5)"
  },
  {
    question: "Can CHOOSECOLS be nested inside aggregation functions like SUM, AVERAGE, or MAX?",
    shortAnswer: "Yes, CHOOSECOLS returns an in-memory array that aggregations can process directly.",
    explanation: "Writing =SUM(CHOOSECOLS(SalesTable, 4)) calculates the total of column 4 without referencing individual cell ranges.",
    hint: "Aggregations can consume CHOOSECOLS directly in memory.",
    level: "basic",
    codeExample: "=SUM(CHOOSECOLS(A2:G50, 6))"
  },
  {
    question: "How do you extract every even-numbered column from a wide dataset using CHOOSECOLS?",
    shortAnswer: "=CHOOSECOLS(Data, SEQUENCE(1, INT(COLUMNS(Data)/2), 2, 2))",
    explanation: "SEQUENCE generates step-2 horizontal numbers (2, 4, 6, 8...). CHOOSECOLS extracts those exact columns.",
    hint: "Generate a horizontal step-2 SEQUENCE vector.",
    level: "advanced",
    codeExample: "=CHOOSECOLS(Data, SEQUENCE(1, INT(COLUMNS(Data)/2), 2, 2))"
  },
  {
    question: "What error occurs if destination cells where CHOOSECOLS needs to spill are occupied?",
    shortAnswer: "#SPILL! error.",
    explanation: "Any non-empty cell in the output footprint will block the formula and produce a #SPILL! error.",
    hint: "Destination collision error.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How can CHOOSECOLS be used to dynamically reorder a 2-way XLOOKUP return vector?",
    shortAnswer: "By passing the spilled XLOOKUP result into CHOOSECOLS to align columns with downstream report schemas.",
    explanation: "If XLOOKUP returns a 5-column record, CHOOSECOLS can rearrange the returned fields dynamically before presentation.",
    hint: "Wrap XLOOKUP in CHOOSECOLS to reorder returned fields.",
    level: "advanced",
    codeExample: "=CHOOSECOLS(XLOOKUP(\"EMP-101\", ID_Col, MasterGrid), 1, 4, 2)"
  },
  {
    question: "Why is CHOOSECOLS preferred over legacy INDEX with column array parameters?",
    shortAnswer: "CHOOSECOLS is a dedicated SIMD-accelerated C++ function that copies column spans in bulk with cleaner, more readable syntax.",
    explanation: "Legacy =INDEX(Data, 0, {1, 3, 5}) is difficult for junior analysts to read and slower to evaluate in complex workbooks.",
    hint: "Cleaner syntax and native C++ SIMD vector performance.",
    level: "expert",
    codeExample: "=CHOOSECOLS(Data, 1, 3, 5)"
  },
  {
    question: "What happens to column formatting (dates, currency, percentages) when extracted via CHOOSECOLS?",
    shortAnswer: "Underlying numeric serials are preserved; formatting depends on destination cell styles.",
    explanation: "CHOOSECOLS transfers underlying data values faithfully without modifying data types or precision.",
    hint: "Data values and types are preserved.",
    level: "basic",
    codeExample: "=CHOOSECOLS(PayrollTable, 1, 6, 10)"
  },
  {
    question: "How can you extract only the metadata identifier and the net payable amount from a 15-column payroll register using CHOOSECOLS?",
    shortAnswer: "=CHOOSECOLS(PayrollTable, 1, -1)",
    explanation: "Column 1 extracts Emp_ID, and column -1 extracts Net_Payable (the final column), producing a clean 2-column ledger.",
    hint: "Pass 1 and -1 to get the first and last columns.",
    level: "basic",
    codeExample: "=CHOOSECOLS(A2:O100, 1, -1)"
  },
  {
    question: "How do you combine CHOOSECOLS and SORT to sort a table by a newly reordered column?",
    shortAnswer: "=SORT(CHOOSECOLS(Data, 1, 4, 2), 2, -1)",
    explanation: "CHOOSECOLS creates a new 3-column table where column 4 becomes the 2nd column. SORT then orders the table by that 2nd column descending.",
    hint: "Reorder with CHOOSECOLS, then sort by the new column index.",
    level: "moderate",
    codeExample: "=SORT(CHOOSECOLS(A2:E50, 1, 5, 2), 2, -1)"
  },
  {
    question: "Can CHOOSECOLS operate on a 1D vertical vector?",
    shortAnswer: "Yes, passing col_num=1 or -1 returns the vertical column intact.",
    explanation: "Since a 1D vertical vector has only 1 column, requesting index 1 or -1 returns the vector, while requesting index 2 returns #VALUE!.",
    hint: "Index 1 or -1 returns the 1D column.",
    level: "basic",
    codeExample: "=CHOOSECOLS(A2:A50, 1)"
  },
  {
    question: "How can CHOOSECOLS and HSTACK be combined to create calculated summary columns alongside existing fields?",
    shortAnswer: "=HSTACK(CHOOSECOLS(Data, 1, 2), CHOOSECOLS(Data, 6)*1.18)",
    explanation: "HSTACK joins the extracted ID and Name columns alongside a newly computed GST-inclusive gross amount column.",
    hint: "Extract base columns with CHOOSECOLS and attach calculations with HSTACK.",
    level: "advanced",
    codeExample: "=HSTACK(CHOOSECOLS(A2:G50, 1, 2), CHOOSECOLS(A2:G50, 6)*1.18)"
  },
  {
    question: "What happens if a text string like \"2\" is passed to CHOOSECOLS's col_num argument?",
    shortAnswer: "Numeric text strings like \"2\" are coerced to integer 2; invalid non-numeric text triggers #VALUE!.",
    explanation: "Excel coerces valid numbers in text format automatically, but non-numeric strings cause immediate #VALUE! errors.",
    hint: "Automatic numeric coercion applies.",
    level: "moderate",
    codeExample: "#VALUE!"
  },
  {
    question: "How do you extract the 3rd, 1st, and 2nd columns in swapped order using CHOOSECOLS?",
    shortAnswer: "=CHOOSECOLS(Data, 3, 1, 2)",
    explanation: "Specifying the indices in order 3, 1, 2 swaps the position of columns in the output matrix.",
    hint: "Pass 3, 1, 2 as the column index arguments.",
    level: "basic",
    codeExample: "=CHOOSECOLS(A2:C20, 3, 1, 2)"
  },
  {
    question: "How can you extract all columns EXCEPT the 1st column using CHOOSECOLS and SEQUENCE?",
    shortAnswer: "=CHOOSECOLS(Data, SEQUENCE(1, COLUMNS(Data)-1, 2, 1))",
    explanation: "SEQUENCE generates column numbers starting from 2 up to total columns, effectively excluding column 1 (equivalent to DROP(Data, , 1)).",
    hint: "Generate sequence from 2 to N with SEQUENCE(1, COLUMNS-1, 2, 1).",
    level: "advanced",
    codeExample: "=CHOOSECOLS(Data, SEQUENCE(1, COLUMNS(Data)-1, 2, 1))"
  },
  {
    question: "In corporate financial modeling, why is CHOOSECOLS preferred for creating client-facing proposal sheets?",
    shortAnswer: "It allows modelers to dynamically present only customer-facing line items and prices while shielding internal margin and cost columns.",
    explanation: "Internal master pricing tables often include base cost, markup, and gross margin. CHOOSECOLS projects only Item Code, Description, and Final Price.",
    hint: "Shield internal cost and margin columns from client view.",
    level: "advanced",
    codeExample: "=CHOOSECOLS(MasterPricingTable, 1, 2, 6)"
  },
  {
    question: "How does LET optimize formulas that use CHOOSECOLS multiple times?",
    shortAnswer: "LET assigns the extracted column to a named variable, preventing multiple scans of the source table.",
    explanation: "Writing =LET(c, CHOOSECOLS(Data, 5), HSTACK(c, c/SUM(c))) computes column 5 once in RAM and uses it for multiple operations.",
    hint: "Cache the extracted column with LET.",
    level: "advanced",
    codeExample: "=LET(c, CHOOSECOLS(A2:J100, 5), HSTACK(c, c/SUM(c)))"
  },
  {
    question: "Why should you avoid using whole column letters (e.g. A:J) inside CHOOSECOLS?",
    shortAnswer: "Referencing A:J forces Excel to allocate all 1,048,576 rows across 10 columns, causing memory bloat.",
    explanation: "Always use structured Table references or explicit row boundaries (e.g. A2:J500).",
    hint: "Use bounded ranges or structured tables.",
    level: "expert",
    codeExample: "Use Table1 instead of A:J"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for dynamic column projection with CHOOSECOLS?",
    shortAnswer: "Decouple presentation tables from backend master databases using CHOOSECOLS to prevent breaking reports when new columns are inserted.",
    explanation: "In enterprise software architecture, inserting a new column in raw data can corrupt hardcoded cell references. Using CHOOSECOLS on structured tables ensures presentation views remain pristine and decoupled from database schema updates.",
    hint: "Decouple presentation views from raw database columns.",
    level: "expert",
    codeExample: "Presentation: =CHOOSECOLS(MasterPayrollTable, 1, 2, 5, -1)"
  }
];

export default questions;
