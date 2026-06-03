const questions = [
  {
    question: "How does AVERAGE treat blank cells?",
    shortAnswer: "It ignores them completely (does not count them in the denominator).",
    explanation: "AVERAGE only uses numbers; blanks are not considered, so the average is of the non‑blank values.",
    level: "basic",
    codeExample: "AVERAGE(10, , 20) returns 15 (average of 10 and 20)."
  },
  {
    question: "How does SUM treat blank cells?",
    shortAnswer: "It ignores blank cells.",
    explanation: "SUM skips non‑numeric cells, including blanks.",
    level: "basic",
    codeExample: "SUM(10, , 20) returns 30."
  },
  {
    question: "What is the difference between COUNT and COUNTA regarding blanks?",
    shortAnswer: "COUNT ignores blanks; COUNTA counts them as non‑blank? Actually COUNTA counts blanks as non‑blank? No: COUNTA counts anything not completely empty. Blanks are empty, so they are NOT counted. COUNTA counts cells that contain any value (including text, numbers, errors, logicals). Blank cells are skipped.",
    explanation: "Both COUNT and COUNTA ignore truly blank cells, but COUNTA includes text, logicals, and errors.",
    level: "basic",
    codeExample: "For {1, \"a\", blank}, COUNT=1, COUNTA=2."
  },
  {
    question: "Which function counts only blank cells?",
    shortAnswer: "COUNTBLANK",
    explanation: "COUNTBLANK(range) returns the number of empty cells (including cells that contain a formula that returns \"\").",
    level: "basic",
    codeExample: "=COUNTBLANK(A1:A10)"
  },
  {
    question: "Why does AVERAGE of a range with blanks sometimes give a different result than (SUM of range)/(COUNTA of range)?",
    shortAnswer: "Because AVERAGE uses COUNT (numeric cells) as denominator, while COUNTA counts all non‑blank cells including text. If there is text, the denominators differ.",
    explanation: "Use COUNT (or directly AVERAGE) for numeric average; COUNTA is for different purpose.",
    level: "intermediate",
    codeExample: "Range {5, \"a\"} → AVERAGE=5, SUM/COUNTA=5/2=2.5."
  },
  {
    question: "What is the result of =AVERAGE(0, , 10) vs =AVERAGE( , 10)?",
    shortAnswer: "First returns 5 (average of 0 and 10), second returns 10 (average of 10).",
    explanation: "0 is a number, so it is included and affects the average; a blank is ignored.",
    level: "basic",
    codeExample: "Zero matters."
  },
  {
    question: "How can you replace blanks with zeros without a helper column?",
    shortAnswer: "Use an array formula: =AVERAGE(IF(ISBLANK(A1:A10), 0, A1:A10)).",
    explanation: "In Excel 365, this works normally; in older versions, press Ctrl+Shift+Enter.",
    level: "advanced",
    codeExample: "Similarly for SUM, STDEV, etc."
  },
  {
    question: "Does STDEV.S ignore blanks?",
    shortAnswer: "Yes, it ignores blank cells and text; only numeric values are used.",
    explanation: "Blanks do not count toward n, but zeros do.",
    level: "basic",
    codeExample: "STDEV.S(10, , 20) = STDEV.S(10,20)."
  },
  {
    question: "What is the best way to count missing (blank) entries as a percentage?",
    shortAnswer: "=COUNTBLANK(range)/COUNTA(range) if you want proportion of blanks relative to non‑blank entries, or /ROWS(range) for proportion of all rows in the range.",
    explanation: "Use the denominator that matches your definition.",
    level: "intermediate",
    codeExample: "=COUNTBLANK(A2:A100)/COUNTA(A2:A100)"
  },
  {
    question: "Does the status bar ‘Count’ count blanks?",
    shortAnswer: "No, the status bar’s Count (when you select numeric cells) counts only numbers. The status bar also shows Count (non‑numeric count?) Actually, right‑click the status bar you can choose ‘Count’ which is COUNTA (counts non‑empty cells). By default, it shows Count (numbers) and Count (non‑blanks) as different entries.",
    explanation: "Customizable; the default numeric count counts only numbers.",
    level: "intermediate",
    codeExample: "Right‑click to add more aggregates."
  },
  {
    question: "Why might AVERAGE of a range with blanks produce a result that seems too low?",
    shortAnswer: "Because zeros in the range (if any) bring the average down, not blanks. Blanks are ignored.",
    explanation: "Check if zeros are present and if they are valid.",
    level: "basic",
    codeExample: "Average of {0, 100, blank} = 50."
  },
  {
    question: "How to count only cells that contain numeric values (including zero) but ignore blanks and text?",
    shortAnswer: "Use COUNT(range).",
    explanation: "COUNT counts numbers (including zero) and ignores text, blanks, logicals, errors.",
    level: "basic",
    codeExample: "=COUNT(A1:A100)"
  },
  {
    question: "What is the difference between a blank cell and a cell containing an empty string (='')?",
    shortAnswer: "A blank cell is truly empty. A cell with ='' returns an empty string. COUNTBLANK counts both as blank. COUNTA counts the ='' cell as non‑blank? Actually COUNTA counts ='' as non‑blank because it contains a formula (the result is empty string but it's still a value). COUNT ignores it.",
    explanation: "This nuance can cause confusion in data cleaning.",
    level: "advanced",
    codeExample: "Use LEN(TRIM(cell))=0 to test for both."
  },
  {
    question: "Can conditional formatting be used to highlight blank cells?",
    shortAnswer: "Yes, use 'Format only cells that contain' → Blanks.",
    explanation: "Or use formula =ISBLANK(A1).",
    level: "basic",
    codeExample: "Quickly identify missing data."
  },
  {
    question: "How to fill blanks with the value from the cell above (fill down)?",
    shortAnswer: "Select range → F5 → Special → Blanks → type =↑ (up arrow) → Ctrl+Enter.",
    explanation: "This fills each blank with the value from the cell directly above.",
    level: "advanced",
    codeExample: "Common in data preparation."
  },
  {
    question: "What does COUNTA count in a range that contains only blanks and a formula that returns ?",
    shortAnswer: "It counts the cell with the formula; even though it appears blank, it is considered non‑blank because it contains a formula.",
    explanation: "Use COUNTBLANK to count both truly blanks and formula‑blanks.",
    level: "intermediate",
    codeExample: "COUNTA will be > COUNT."
  },
  {
    question: "How can you compute the average while treating blanks as zero without an array formula?",
    shortAnswer: "Create a helper column: =IF(ISBLANK(A2), 0, A2), then average the helper column.",
    explanation: "Helper columns make formulas simpler and faster.",
    level: "basic",
    codeExample: "=AVERAGE(B2:B100) where B has the cleaned data."
  },
  {
    question: "Does the QUARTILE function ignore blanks?",
    shortAnswer: "Yes, QUARTILE.INC and QUARTILE.EXC ignore non‑numeric values, including blanks.",
    explanation: "Only numbers are used in computing quartiles.",
    level: "basic",
    codeExample: "Blanks do not affect the result."
  },
  {
    question: "Why might SUM of a column with blanks be lower than expected?",
    shortAnswer: "If there are zeros, they would lower the sum. Blanks do nothing. The cause could be negative numbers or zeros, not blanks.",
    explanation: "Check for zeros inadvertently present.",
    level: "basic",
    codeExample: "Use SUMIF to sum positive values only."
  },
  {
    question: "What is the result of =A1+A2 if A1=5 and A2 is blank?",
    shortAnswer: "#VALUE! error, because addition with a blank cell returns an error.",
    explanation: "The + operator does not ignore blanks; it treats them as text/null, causing an error.",
    level: "intermediate",
    codeExample: "Use SUM(A1,A2) to avoid error."
  },
  {
    question: "Does the SUBTOTAL function (e.g., SUBTOTAL(9,range)) ignore blanks?",
    shortAnswer: "Yes, SUBTOTAL with function 9 (SUM) ignores blanks, but it respects filters.",
    explanation: "It uses the same logic as SUM for blanks.",
    level: "basic",
    codeExample: "=SUBTOTAL(9, A2:A100)"
  },
  {
    question: "How can you find the percentage of blank cells in a column?",
    shortAnswer: "=COUNTBLANK(A2:A100)/ROWS(A2:A100)",
    explanation: "ROWS gives total number of cells in the range.",
    level: "basic",
    codeExample: "Format as percentage."
  },
  {
    question: "What is a quick way to see if a cell is blank without using a formula?",
    shortAnswer: "Press F2 – if the cursor starts at the beginning and there is no character, it's blank. Or use ISBLANK in a formula.",
    explanation: "Also, the status bar will show 'Count' only for numeric cells, so if a cell has no count but looks empty, it may be blank.",
    level: "basic",
    codeExample: "Use Go To Special → Blanks to select all blank cells."
  },
  {
    question: "Can you use AVERAGEIF to ignore blanks that are not numeric?",
    shortAnswer: "AVERAGEIF already ignores blanks. To ignore them only when they meet a condition, you can use AVERAGEIF(range, \"<>\"\").",
    explanation: "But blanks are already ignored; this would be redundant.",
    level: "advanced",
    codeExample: "Unnecessary."
  },
  {
    question: "How does the TREND function deal with blanks?",
    shortAnswer: "TREND ignores rows where either known_y's or known_x's contain non‑numeric values (including blanks).",
    explanation: "Only complete pairs are used to compute the regression.",
    level: "intermediate",
    codeExample: "Missing data points reduce sample size."
  },
  {
    question: "What is the most robust way to replace blanks with zeros in a large dataset?",
    shortAnswer: "Select the range → F5 → Special → Blanks → type 0 → Ctrl+Enter. This is fast and permanent.",
    explanation: "For a non‑destructive approach, use a helper column with IF(ISBLANK(...),0,...).",
    level: "basic",
    codeExample: "Works well."
  },
  {
    question: "What does the function =COUNTIF(range, \"\") count?",
    shortAnswer: "It counts blank cells (including those with empty string formulas) if you use \"\" as criteria.",
    explanation: "COUNTIF(range, \"\") is equivalent to COUNTBLANK(range).",
    level: "intermediate",
    codeExample: "=COUNTIF(A1:A10, \"\") counts blank cells."
  },
  {
    question: "Can a cell be blank but not empty?",
    shortAnswer: "No – blank means empty. However, a cell can appear blank but contain a formula that returns \"\" (empty string). That is not truly blank; it contains a formula.",
    explanation: "ISBLANK(cell) returns FALSE for such cells.",
    level: "intermediate",
    codeExample: "Use =LEN(TRIM(cell))=0 to detect cell that 'looks' empty."
  },
  {
    question: "How to compute the average of a range while excluding both blanks and zeros?",
    shortAnswer: "Use array formula: =AVERAGE(IF((A1:A10<>0)*(A1:A10<>\"\"), A1:A10)).",
    explanation: "In 365, =AVERAGE(FILTER(A1:A10, (A1:A10<>0)*(A1:A10<>\"\"))).",
    level: "advanced",
    codeExample: "Excludes zeros and blanks."
  },
  {
    question: "When should you replace blanks with zeros before statistical analysis?",
    shortAnswer: "When the blank truly represents a recorded zero (e.g., 'no sale' means zero revenue; 'absent' means zero marks). Otherwise, leave as blank.",
    explanation: "Document the decision.",
    level: "intermediate",
    codeExample: "Context matters."
  },
  {
    question: "What is the quickest way to see a summary of blank vs non‑blank cells without formulas?",
    shortAnswer: "Select the column → look at the status bar: Count (numbers) and Count (non‑blanks). The difference gives an idea of blanks.",
    explanation: "Right‑click the status bar to customise what aggregates appear.",
    level: "basic",
    codeExample: "Not precise but quick."
  }
];

export default questions;