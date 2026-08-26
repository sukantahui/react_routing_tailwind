// topic6_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 6
// Topic: Splitting complex strings by multiple delimiters with TEXTSPLIT
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary purpose of the TEXTSPLIT function in Excel 365?",
    shortAnswer: "To split a text string into a dynamic spilled array across columns, rows, or a 2D matrix using one or more specified delimiters.",
    explanation: "Replaces the static 'Text to Columns' wizard and complex string formulas with a dynamic, formulaic engine.",
    hint: "Splits text across columns and rows using delimiters.",
    level: "basic",
    codeExample: "=TEXTSPLIT(text, col_delimiter, [row_delimiter], [ignore_empty], [match_mode], [pad_with])"
  },
  {
    question: "How do you split a text string by multiple different delimiters (e.g. comma, semicolon, and pipe) in 1 formula?",
    shortAnswer: "Pass an array constant of delimiters in curly braces: `=TEXTSPLIT(A2, {\",\", \";\", \"|\"})`.",
    explanation: "TEXTSPLIT treats any delimiter in the array constant as a valid column split point.",
    hint: "Array constant: {\",\", \";\", \"|\"}.",
    level: "basic",
    codeExample: "=TEXTSPLIT(\"Apple,Orange;Banana|Mango\", {\",\", \";\", \"|\"})"
  },
  {
    question: "How do you split a key-value string like `Item=Laptop;Qty=5;Price=65000` into a 2-column by 3-row 2D matrix in 1 formula?",
    shortAnswer: "=TEXTSPLIT(A2, \"=\", \";\")",
    explanation: "Setting col_delimiter = \"=\" and row_delimiter = \";\" parses keys into col 1, values into col 2, and records into rows.",
    hint: "col_delimiter = \"=\", row_delimiter = \";\".",
    level: "moderate",
    codeExample: "=TEXTSPLIT(\"Item=Laptop;Qty=5;Price=65000\", \"=\", \";\")"
  },
  {
    question: "What does the `ignore_empty` argument do in TEXTSPLIT?",
    shortAnswer: "When set to TRUE (1), it ignores consecutive delimiters and prevents empty string cells from appearing in the spilled array.",
    explanation: "Essential for handling messy text with multiple consecutive spaces or commas.",
    hint: "TRUE (1) ignores consecutive delimiters.",
    level: "basic",
    codeExample: "=TEXTSPLIT(\"A,,B,,,C\", \",\", , TRUE)"
  },
  {
    question: "How do you split a single text string vertically down a column into multiple rows instead of horizontally across columns?",
    shortAnswer: "Leave `col_delimiter` blank and specify `row_delimiter`: `=TEXTSPLIT(A2, , \",\")`.",
    explanation: "Omission of col_delimiter forces splitting along the row dimension.",
    hint: "=TEXTSPLIT(A2, , \",\").",
    level: "basic",
    codeExample: "=TEXTSPLIT(\"Swadeep,Tuhina,Abhronila\", , \",\")"
  },
  {
    question: "What does the `pad_with` argument do in a 2D matrix split with TEXTSPLIT?",
    shortAnswer: "Specifies a replacement value (e.g. \"\" or \"N/A\") for missing cells in ragged rows or asymmetrical 2D splits.",
    explanation: "Prevents #N/A errors in jagged 2D array structures.",
    hint: "Fills missing values in jagged 2D splits.",
    level: "moderate",
    codeExample: "=TEXTSPLIT(A2, \",\", \";\", , , \"N/A\")"
  },
  {
    question: "How do you split text by space characters while ignoring extra consecutive spaces?",
    shortAnswer: "=TEXTSPLIT(A2, \" \", , TRUE)",
    explanation: "Setting ignore_empty = TRUE collapses multiple spaces into single delimiter splits.",
    hint: "=TEXTSPLIT(A2, \" \", , TRUE).",
    level: "basic",
    codeExample: "=TEXTSPLIT(\"Swadeep    Banerjee\", \" \", , TRUE)"
  },
  {
    question: "What is the difference between `match_mode = 0` and `match_mode = 1` in TEXTSPLIT?",
    shortAnswer: "`0` is Case-Sensitive (default); `1` is Case-Insensitive.",
    explanation: "Allows splitting on words like 'AND' regardless of whether typed as 'and', 'And', or 'AND'.",
    hint: "0 = Case-Sensitive, 1 = Case-Insensitive.",
    level: "basic",
    codeExample: "=TEXTSPLIT(A2, \" and \", , , 1)"
  },
  {
    question: "How do you extract the 3rd item from a comma-separated list using TEXTSPLIT?",
    shortAnswer: "=INDEX(TEXTSPLIT(A2, \",\"), 3)",
    explanation: "INDEX extracts the element at column position 3 of the spilled array.",
    hint: "INDEX(TEXTSPLIT(A2, \",\"), 3).",
    level: "moderate",
    codeExample: "=INDEX(TEXTSPLIT(\"Barrackpore,Shyamnagar,Ichapur,Naihati\", \",\"), 3) &rarr; \"Ichapur\""
  },
  {
    question: "How do you count the total number of items in a comma-separated list in 1 formula?",
    shortAnswer: "=COUNTA(TEXTSPLIT(A2, \",\"))",
    explanation: "COUNTA counts all non-empty spilled array elements.",
    hint: "COUNTA(TEXTSPLIT(A2, \",\")).",
    level: "basic",
    codeExample: "=COUNTA(TEXTSPLIT(\"A,B,C,D,E\", \",\")) &rarr; 5"
  },
  {
    question: "How do you split text by line breaks (Alt+Enter / newline characters)?",
    shortAnswer: "=TEXTSPLIT(A2, , CHAR(10))",
    explanation: "CHAR(10) represents the newline character in Windows Excel.",
    hint: "=TEXTSPLIT(A2, , CHAR(10)).",
    level: "moderate",
    codeExample: "=TEXTSPLIT(MultiLineCell, , CHAR(10))"
  },
  {
    question: "How do you sum numeric values separated by hyphens (e.g. `10-20-30-40`) in 1 formula?",
    shortAnswer: "=SUM(NUMBERVALUE(TEXTSPLIT(A2, \"-\")))",
    explanation: "TEXTSPLIT splits text into numbers, NUMBERVALUE converts to numeric types, and SUM totals them.",
    hint: "SUM(NUMBERVALUE(TEXTSPLIT(A2, \"-\"))).",
    level: "moderate",
    codeExample: "=SUM(NUMBERVALUE(TEXTSPLIT(\"10-20-30-40\", \"-\"))) &rarr; 100"
  },
  {
    question: "How do you split a full name into First Name, Middle Name (if present), and Last Name across columns?",
    shortAnswer: "=TEXTSPLIT(A2, \" \", , TRUE)",
    explanation: "Splits on spaces while ignoring double spaces, populating each name part into adjacent columns.",
    hint: "=TEXTSPLIT(A2, \" \", , TRUE).",
    level: "basic",
    codeExample: "=TEXTSPLIT(\"Debangshu Kumar Ghosh\", \" \", , TRUE)"
  },
  {
    question: "How do you apply TEXTSPLIT across an entire column of rows (e.g. `A5:A20`) dynamically?",
    shortAnswer: "Wrap in `BYROW(A5:A20, LAMBDA(row, TEXTSPLIT(row, \",\")))` or use a custom recursive LAMBDA.",
    explanation: "BYROW applies the horizontal array split to each individual row vector.",
    hint: "BYROW(Range, LAMBDA(r, TEXTSPLIT(r, \",\"))).",
    level: "advanced",
    codeExample: "=BYROW(A5:A20, LAMBDA(r, TEXTSPLIT(r, \",\")))"
  },
  {
    question: "What happens if a cell in the spill destination of TEXTSPLIT contains existing data?",
    shortAnswer: "#SPILL! error.",
    explanation: "TEXTSPLIT requires unobstructed adjacent cells to populate its spilled array.",
    hint: "#SPILL! error on blocked output footprint.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How do you sort a comma-separated list of names alphabetically in 1 formula?",
    shortAnswer: "=TEXTJOIN(\", \", TRUE, SORT(TOCOL(TEXTSPLIT(A2, \",\", , TRUE))))",
    explanation: "TEXTSPLIT splits items, TOCOL converts to column, SORT orders alphabetically, and TEXTJOIN reunites them.",
    hint: "TEXTJOIN(\", \", TRUE, SORT(TOCOL(TEXTSPLIT(...)))).",
    level: "advanced",
    codeExample: "=TEXTJOIN(\", \", TRUE, SORT(TOCOL(TEXTSPLIT(\"Naihati,Barrackpore,Ichapur\", \",\", , TRUE))))"
  },
  {
    question: "How do you remove duplicates from a comma-separated tag string (e.g. `Excel,Tax,Excel,GST,Tax`)?",
    shortAnswer: "=TEXTJOIN(\", \", TRUE, UNIQUE(TOCOL(TEXTSPLIT(A2, \",\", , TRUE))))",
    explanation: "TEXTSPLIT breaks tags, TOCOL makes vertical vector, UNIQUE deduplicates, and TEXTJOIN rejoins.",
    hint: "TEXTJOIN(\", \", TRUE, UNIQUE(TOCOL(TEXTSPLIT(...)))).",
    level: "advanced",
    codeExample: "=TEXTJOIN(\", \", TRUE, UNIQUE(TOCOL(TEXTSPLIT(\"A,B,A,C,B\", \",\"))))"
  },
  {
    question: "How do you split an address string that uses mixed delimiters (commas, hyphens, and slashes)?",
    shortAnswer: "=TEXTSPLIT(A2, {\",\", \"-\", \"/\"}, , TRUE)",
    explanation: "Passes array constant `{\",\", \"-\", \"/\"}` and ignores empty segments.",
    hint: "TEXTSPLIT(A2, {\",\", \"-\", \"/\"}, , TRUE).",
    level: "moderate",
    codeExample: "=TEXTSPLIT(\"10/A, Shibtala Road - Barrackpore\", {\",\", \"-\", \"/\"}, , TRUE)"
  },
  {
    question: "How do you extract only the last item from a delimited string regardless of how many items exist?",
    shortAnswer: "=TAKE(TOCOL(TEXTSPLIT(A2, \",\")), -1)",
    explanation: "TEXTSPLIT parses string, TOCOL creates vertical vector, and TAKE(..., -1) pulls the final element.",
    hint: "TAKE(TOCOL(TEXTSPLIT(A2, \",\")), -1).",
    level: "moderate",
    codeExample: "=TAKE(TOCOL(TEXTSPLIT(\"One,Two,Three,Four\", \",\")), -1) &rarr; \"Four\""
  },
  {
    question: "How do you parse a JSON-like key-value string `{\"name\":\"Swadeep\",\"branch\":\"Barrackpore\"}` using TEXTSPLIT?",
    shortAnswer: "=TEXTSPLIT(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A2, \"{\", \"\"), \"}\", \"\"), \"\"\"\", \"\"), \":\", \",\")",
    explanation: "Strips braces/quotes and splits col on `:` and row on `,` to yield a clean 2D table.",
    hint: "Clean brackets + TEXTSPLIT on `:` and `,`.",
    level: "expert",
    codeExample: "JSON String Parser via TEXTSPLIT 2D Matrix"
  },
  {
    question: "Can TEXTSPLIT handle multiple row delimiters as an array constant (e.g. `{\";\", \"|\"}`)?",
    shortAnswer: "Yes, passing an array constant to `row_delimiter` splits across rows on any of the specified characters.",
    explanation: "Full array constant support on both column and row delimiter parameters.",
    hint: "Array constants supported for both col and row delimiters.",
    level: "moderate",
    codeExample: "=TEXTSPLIT(A2, , {\";\", \"|\"})"
  },
  {
    question: "How do you extract the domain name from a URL `https://codernaccotax.co.in/courses/excel` using TEXTSPLIT?",
    shortAnswer: "=INDEX(TEXTSPLIT(A2, \"/\"), 3)",
    explanation: "Splitting on `/` creates elements: `https:`, empty, `codernaccotax.co.in`, `courses`, `excel`. Item 3 is domain.",
    hint: "INDEX(TEXTSPLIT(A2, \"/\"), 3).",
    level: "moderate",
    codeExample: "=INDEX(TEXTSPLIT(\"https://codernaccotax.co.in/tax\", \"/\"), 3)"
  },
  {
    question: "How do you convert a 2D matrix returned by TEXTSPLIT into a single vertical list?",
    shortAnswer: "=TOCOL(TEXTSPLIT(A2, \"=\", \";\"))",
    explanation: "TOCOL unrolls the 2D key-value matrix into a single continuous column vector.",
    hint: "TOCOL(TEXTSPLIT(A2, \"=\", \";\")).",
    level: "moderate",
    codeExample: "=TOCOL(TEXTSPLIT(\"A=1;B=2\", \"=\", \";\"))"
  },
  {
    question: "What is the advantage of TEXTSPLIT over the legacy 'Text to Columns' feature?",
    shortAnswer: "TEXTSPLIT is dynamic and live (updates automatically when data changes), works in formula RAM without overwriting cells, and supports 2D matrix splitting.",
    explanation: "Static wizard vs dynamic array formula engine.",
    hint: "Dynamic, non-destructive formula vs static manual wizard.",
    level: "basic",
    codeExample: "Dynamic Array TEXTSPLIT vs Static 'Text to Columns'"
  },
  {
    question: "How do you split text by words containing punctuation without losing the words?",
    shortAnswer: "=TEXTSPLIT(A2, {\" \", \",\", \".\", \";\", \"!\", \"?\"}, , TRUE)",
    explanation: "Supplying all punctuation in the delimiter array splits the text into clean individual words.",
    hint: "Array of punctuation delimiters + ignore_empty = TRUE.",
    level: "moderate",
    codeExample: "=TEXTSPLIT(\"Hello, world! Welcome to Excel.\", {\" \", \",\", \".\", \"!\"}, , TRUE)"
  },
  {
    question: "How do you extract the first word of a sentence using TEXTSPLIT?",
    shortAnswer: "=INDEX(TEXTSPLIT(A2, \" \"), 1)",
    explanation: "INDEX isolates the first element of the space-delimited array.",
    hint: "INDEX(TEXTSPLIT(A2, \" \"), 1).",
    level: "basic",
    codeExample: "=INDEX(TEXTSPLIT(\"Swadeep Banerjee\", \" \"), 1) &rarr; \"Swadeep\""
  },
  {
    question: "How do you extract the file name from a Windows directory path `C:\\Users\\Admin\\Documents\\Report.xlsx` using TEXTSPLIT?",
    shortAnswer: "=TAKE(TOCOL(TEXTSPLIT(A2, \"\\\")), -1)",
    explanation: "Splits on backslash `\\`, and TAKE(..., -1) pulls the final element (the filename).",
    hint: "TAKE(TOCOL(TEXTSPLIT(A2, \"\\\")), -1).",
    level: "moderate",
    codeExample: "=TAKE(TOCOL(TEXTSPLIT(\"C:\\Audit\\2026\\GST.xlsx\", \"\\\")), -1)"
  },
  {
    question: "How do you create a named LAMBDA `FX_SPLIT_CSV` to split comma-separated strings with automatic whitespace trimming?",
    shortAnswer: "=LAMBDA(str, TRIM(TEXTSPLIT(str, \",\", , TRUE)))",
    explanation: "Encapsulates comma splitting and whitespace trimming into a reusable 1-parameter function.",
    hint: "LAMBDA(s, TRIM(TEXTSPLIT(s, \",\", , TRUE))).",
    level: "advanced",
    codeExample: "FX_SPLIT_CSV = LAMBDA(s, TRIM(TEXTSPLIT(s, \",\", , TRUE)))"
  },
  {
    question: "How do you calculate the average of numbers stored in a semicolon-separated string (e.g. `85;92;78;95;88`)?",
    shortAnswer: "=AVERAGE(NUMBERVALUE(TEXTSPLIT(A2, \";\")))",
    explanation: "TEXTSPLIT parses scores, NUMBERVALUE coerces to numeric types, and AVERAGE computes the mean.",
    hint: "AVERAGE(NUMBERVALUE(TEXTSPLIT(A2, \";\"))).",
    level: "moderate",
    codeExample: "=AVERAGE(NUMBERVALUE(TEXTSPLIT(\"85;92;78;95;88\", \";\")))"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for text parsing with TEXTSPLIT?",
    shortAnswer: "Say goodbye to the static 'Text to Columns' wizard! Use TEXTSPLIT with array constants ({...}) for multi-delimiter strings, leverage row_delimiter to build instant 2D relational key-value matrices in 1 formula, and always enable ignore_empty = TRUE to eliminate messy empty cell gaps across corporate datasets!",
    explanation: "TEXTSPLIT gives financial modelers live, formulaic control over complex semi-structured strings in pure memory!",
    hint: "Array Constants ({...}) + 2D Matrix (col/row delimiters) + ignore_empty = TRUE!",
    level: "expert",
    codeExample: "Rule: Multi-Delimiter Text Splitting &rarr; Deploy TEXTSPLIT!"
  }
];

export default questions;
