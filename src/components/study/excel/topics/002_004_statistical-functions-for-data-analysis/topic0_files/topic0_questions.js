const questions = [
  {
    question: "What does the SUM function do in Excel?",
    shortAnswer: "Adds all numeric values in given arguments.",
    explanation: "SUM takes one or more numeric arguments (ranges, cells, constants) and returns their total. Non-numeric values are ignored.",
    hint: "Think of it as a calculator that adds everything automatically.",
    level: "basic",
    codeExample: "=SUM(A1:A10) adds values from A1 to A10."
  },
  {
    question: "Which of the following is a valid SUM syntax?",
    shortAnswer: "All are valid: =SUM(5,10), =SUM(A1:A5), =SUM(A1, B2, C3).",
    explanation: "SUM accepts up to 255 arguments, each can be a cell, range, constant, or formula that returns a number.",
    hint: "Read the official documentation – commas separate arguments.",
    level: "basic",
    codeExample: "=SUM(1,2,3) returns 6."
  },
  {
    question: "What does =SUM(A1:A3, C1:C3) return if A1=2, A2=4, A3=6, C1=1, C2=3, C3=5?",
    shortAnswer: "21",
    explanation: "SUM adds both ranges: (2+4+6)+(1+3+5)=12+9=21.",
    hint: "Add each range separately then sum them.",
    level: "basic",
    codeExample: "Result = 21."
  },
  {
    question: "If a cell contains text, how does SUM treat it?",
    shortAnswer: "Ignores it (treats as 0).",
    explanation: "SUM ignores any non-numeric values in cell references. However, if a text string is directly provided as an argument, it causes #VALUE! error.",
    hint: "Try =SUM(\"apple\",5) → error; =SUM(A1,5) with A1=\"apple\" → 5.",
    level: "intermediate",
    codeExample: "=SUM(10,\"Hello\") returns #VALUE! but =SUM(A1) with A1=\"Hello\" returns 0."
  },
  {
    question: "What is the keyboard shortcut to quickly insert SUM function?",
    shortAnswer: "Alt + = (or Alt + Shift + = on some keyboards).",
    explanation: "This AutoSum shortcut automatically guesses the range to sum based on adjacent data.",
    hint: "Look for the Σ symbol on the Home tab.",
    level: "basic",
    codeExample: "Press Alt+= while cell below a column of numbers."
  },
  {
    question: "Can SUM add values across different sheets?",
    shortAnswer: "Yes, using 3D references.",
    explanation: "=SUM(Sheet1:Sheet3!A1) adds the value of cell A1 from Sheet1, Sheet2, and Sheet3.",
    hint: "Use colon between sheet names to indicate a range of sheets.",
    level: "advanced",
    codeExample: "=SUM(Jan:Dec!B5) sums cell B5 from all sheets named Jan through Dec."
  },
  {
    question: "What is the maximum number of arguments SUM can accept?",
    shortAnswer: "255 arguments.",
    explanation: "Each argument can be a single cell or a range (which may contain many cells). The total number of cells summed is limited by available memory, not the argument count limit.",
    hint: "You rarely need more than 255 separate ranges.",
    level: "expert",
    codeExample: "=SUM(A1, A2, A3, ... up to 255 items)"
  },
  {
    question: "How to sum only positive numbers in a range using SUM?",
    shortAnswer: "Use SUM with an array formula or SUMIF.",
    explanation: "=SUM(IF(A1:A10>0, A1:A10, 0)) as array formula (Ctrl+Shift+Enter). But SUMIF is simpler: =SUMIF(A1:A10,\">0\").",
    hint: "SUM alone cannot filter – use SUMIF for conditional sums.",
    level: "intermediate",
    codeExample: "=SUMIF(A1:A10,\">0\")"
  },
  {
    question: "What does =SUM(A:A) do?",
    shortAnswer: "Adds all numeric values in entire column A.",
    explanation: "Summing an entire column can be slow but is acceptable for small datasets. It includes all rows, even those with text or blanks.",
    hint: "Be careful – it may include unintended values if column has headers.",
    level: "basic",
    codeExample: "=SUM(1:1) sums all numbers in row 1."
  },
  {
    question: "Why does =SUM(\"10\", \"20\") return 30 but =SUM(\"10\", \"20\", \"30\") also works?",
    shortAnswer: "Excel tries to convert numeric text to numbers when they are direct arguments.",
    explanation: "When numeric strings are passed as direct arguments (not cell references), Excel coerces them to numbers. This does NOT happen for cell references containing text.",
    hint: "Direct vs referenced – important difference.",
    level: "expert",
    codeExample: "=SUM(\"5\", \"7\") → 12; =SUM(A1) with A1=\"5\" → 0."
  },
  {
    question: "What error does SUM return if any argument is an error value?",
    shortAnswer: "The same error value (e.g., #N/A, #VALUE!).",
    explanation: "SUM propagates errors. If any cell in the range contains an error, the entire SUM result becomes that error.",
    hint: "Use IFERROR inside SUM for safety: =SUM(IFERROR(A1:A10,0)) as array.",
    level: "intermediate",
    codeExample: "If A1 = #N/A, =SUM(A1:A10) returns #N/A."
  },
  {
    question: "How to sum values with more than one condition?",
    shortAnswer: "Use SUMIFS function.",
    explanation: "SUMIFS allows multiple criteria ranges and conditions. Example: =SUMIFS(SumRange, CriteriaRange1, \"condition1\", CriteriaRange2, \"condition2\").",
    hint: "SUMIFS is available from Excel 2007 onward.",
    level: "advanced",
    codeExample: "=SUMIFS(C2:C10, A2:A10, \"North\", B2:B10, \">100\")"
  },
  {
    question: "Is there a difference between =SUM(A1:A10) and =A1+A2+...+A10?",
    shortAnswer: "Functionally same result, but SUM is cleaner and handles errors differently.",
    explanation: "SUM ignores text in cell references, while + will return #VALUE! if any cell is non-numeric. Also SUM can handle large ranges easily.",
    hint: "Always prefer SUM over manual addition for ranges.",
    level: "basic",
    codeExample: "Both give the same sum if all cells are numbers."
  },
  {
    question: "What does =SUM((1,2,3)*2) return in older Excel?",
    shortAnswer: "12 (as array formula).",
    explanation: "This is an array operation: (1,2,3)*2 produces {2,4,6}, then SUM gives 12. In modern Excel (365) it works normally; older versions need Ctrl+Shift+Enter.",
    hint: "Dynamic arrays make this easier now.",
    level: "expert",
    codeExample: "Enter as array formula: {=SUM((1,2,3)*2)}"
  },
  {
    question: "How to sum every alternate row using SUM?",
    shortAnswer: "Use SUMPRODUCT with MOD, e.g., =SUMPRODUCT((MOD(ROW(A1:A10),2)=0)*A1:A10).",
    explanation: "SUM alone can't condition on row number. Combine with MOD and SUMPRODUCT or use array formula.",
    hint: "Google 'sum every nth row Excel' for patterns.",
    level: "expert",
    codeExample: "=SUM(IF(MOD(ROW(A1:A10),2)=0, A1:A10, 0)) array formula."
  },
  {
    question: "What is the difference between SUM and SUBTOTAL(9, range)?",
    shortAnswer: "SUBTOTAL(9) ignores filtered-out rows, SUM does not.",
    explanation: "SUBTOTAL with function number 9 performs SUM but only on visible rows after filtering or hiding. Very useful for dynamic reports.",
    hint: "Use SUBTOTAL to respect manual filters.",
    level: "advanced",
    codeExample: "=SUBTOTAL(9, A1:A100) sums only visible cells."
  },
  {
    question: "Can SUM be used with dates?",
    shortAnswer: "Yes, but dates are stored as serial numbers, so SUM adds them as numbers.",
    explanation: "Summing dates produces a serial number that may not be meaningful. Use DATEDIF or other date functions for date arithmetic.",
    hint: "Summing dates rarely makes sense – average may be more useful.",
    level: "intermediate",
    codeExample: "=SUM(B1:B10) where B1:B10 contain dates gives serial date sum."
  },
  {
    question: "What is the fastest way to sum a column with thousands of rows?",
    shortAnswer: "Click the column letter and look at the status bar (AutoSum) or use =SUM(column:column).",
    explanation: "Excel is optimized for SUM over large ranges. Just ensure no blank rows inside the range that break continuity.",
    hint: "Use structured references in Tables for automatic expansion.",
    level: "basic",
    codeExample: "=SUM(Table1[Sales])"
  },
  {
    question: "How to fix #VALUE! error in SUM?",
    shortAnswer: "Find and convert text that looks like numbers to actual numbers.",
    explanation: "Use Value() function, multiply by 1, or use Text to Columns. Also check for hidden characters or spaces.",
    hint: "=VALUE(cell) converts text number to real number.",
    level: "intermediate",
    codeExample: "=SUM(VALUE(A1:A10)) as array formula."
  },
  {
    question: "Which function is more efficient: SUM(A1:A10000) or many individual cell references?",
    shortAnswer: "SUM with a single range is much more efficient.",
    explanation: "Excel calculates faster if you pass a contiguous range. Separate references cause additional overhead.",
    hint: "Always collapse multiple cells into a range when possible.",
    level: "advanced",
    codeExample: "=SUM(A1:A10000) better than =SUM(A1,A2,...,A10000)"
  },
  {
    question: "Can SUM handle up to 1 million rows without crashing?",
    shortAnswer: "Yes, but performance may degrade based on system memory.",
    explanation: "Excel 2010+ supports 1,048,576 rows. SUM over an entire column (e.g., A:A) on modern hardware takes a fraction of a second.",
    hint: "Avoid whole column references in huge datasets – use exact range.",
    level: "expert",
    codeExample: "=SUM(A1:A1048576) works but slow."
  },
  {
    question: "What does =SUM(--(A1:A10>5)) do?",
    shortAnswer: "Counts how many cells in A1:A10 are greater than 5.",
    explanation: "The double unary (--) converts TRUE/FALSE to 1/0, then SUM adds them up – a classic way to count with conditions before COUNTIF existed.",
    hint: "Modern Excel would use COUNTIF instead.",
    level: "expert",
    codeExample: "Array formula: {=SUM(--(A1:A10>5))}"
  },
  {
    question: "How to sum the largest 3 numbers in a range using SUM?",
    shortAnswer: "=SUM(LARGE(range, {1,2,3})).",
    explanation: "LARGE with array constant returns top N values, then SUM adds them. Must be entered as array formula in older Excel.",
    hint: "Use {1,2,3} as second argument of LARGE.",
    level: "advanced",
    codeExample: "=SUM(LARGE(A1:A10, {1,2,3}))"
  },
  {
    question: "Why does SUM return 0 even when there are numbers?",
    shortAnswer: "Numbers are likely stored as text. Check with =ISTEXT(cell).",
    explanation: "If cells have a green triangle in corner, they are text. Use VALUE() or Text-to-Columns to convert.",
    hint: "Multiply all cells by 1: =SUM(A1:A10*1) as array to force conversion.",
    level: "intermediate",
    codeExample: "=SUM(IFERROR(VALUE(A1:A10),0)) array."
  },
  {
    question: "What is the result of =SUM(TRUE, FALSE) in Excel?",
    shortAnswer: "1 (TRUE=1, FALSE=0 when used in arithmetic).",
    explanation: "Logical values directly provided as arguments are treated as numbers. But if they are in cell references, they are ignored (unless you coerce with --).",
    hint: "=SUM(--(A1:A10)) would convert logicals inside cells.",
    level: "intermediate",
    codeExample: "=SUM(TRUE, TRUE, FALSE) → 2."
  },
  {
    question: "Can SUM be nested inside other functions?",
    shortAnswer: "Yes, SUM can be an argument to many functions, e.g., =AVERAGE(SUM(A1:A5), SUM(B1:B5)).",
    explanation: "Anywhere a number is expected, you can put SUM. This is common in financial modeling.",
    hint: "Always test intermediate results with F9.",
    level: "basic",
    codeExample: "=IF(SUM(A1:A10)>100, \"High\", \"Low\")"
  },
  {
    question: "What is the difference between SUM and SUMIF in terms of performance?",
    shortAnswer: "SUMIF is slightly slower than SUM because it must evaluate conditions.",
    explanation: "SUM is a pure arithmetic function; SUMIF must check each cell against a condition, increasing calculation time.",
    hint: "For unconditional sums, always use SUM.",
    level: "advanced",
    codeExample: "No code, but test with 100k rows."
  },
  {
    question: "How to sum values in a column where another column equals 'Apples'?",
    shortAnswer: "=SUMIF(B:B, \"Apples\", C:C).",
    explanation: "SUMIF(range, criteria, sum_range). The criteria can be text, number, or expression.",
    hint: "Use absolute references if copying down.",
    level: "intermediate",
    codeExample: "=SUMIF(D2:D100, \"Delivered\", E2:E100)"
  },
  {
    question: "What does =SUM(IF(1, {1,2,3}, {4,5,6})) return?",
    shortAnswer: "6 (sum of first array because condition is TRUE).",
    explanation: "This is an array formula. IF returns the true array, then SUM adds it. Not commonly used, but shows SUM's power with arrays.",
    hint: "Understand that IF can return arrays.",
    level: "expert",
    codeExample: "{=SUM(IF({TRUE,FALSE}, {1,2}, {3,4}))} → (1+4)=5"
  },
  {
    question: "What is the purpose of the double unary (--) before a range in SUM?",
    shortAnswer: "Converts TRUE/FALSE to 1/0 for arithmetic.",
    explanation: "It forces a boolean array into numeric values, allowing SUM to add them. Often used in old-school conditional counting.",
    hint: "Modern Excel has COUNTIFS, so -- is less needed.",
    level: "expert",
    codeExample: "=SUM(--(A1:A10=\"Yes\")) counts Yes entries."
  }
];

export default questions;