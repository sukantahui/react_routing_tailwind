// topic0_questions.js - 30 Comprehensive Final Certification Assessment Questions
// Module: 008_005_excel-final-certification-exam
// Course Code: EXCEL-PRO-901 | Lead Mentor: Sukanta Hui

const questions = [
  {
    question: "What is the primary operational advantage of converting a range to an Excel Table (`Ctrl + T`)?",
    shortAnswer: "Structured tables auto-expand when new rows/columns are added and automatically propagate formulas down calculated columns.",
    explanation: "Tables convert static coordinates into relational entities with self-expanding structured references.",
    hint: "Auto-expansion and automatic formula propagation.",
    level: "basic",
    codeExample: "Ctrl + T → Table Object"
  },
  {
    question: "How do structured table references (`[@Gross] * 0.18`) improve formula reliability?",
    shortAnswer: "They bind to the field by name rather than physical cell coordinates, preserving row record integrity during sorts and column insertions.",
    explanation: "Structured references are self-documenting and immune to grid shifting.",
    hint: "Use [@Column] for current row field references.",
    level: "basic",
    codeExample: "=[@Salary] * (1 - [@Tax_Rate])"
  },
  {
    question: "Why should `SUBTOTAL(109, ...)` be used on filtered tables instead of `SUM(...)`?",
    shortAnswer: "Because `SUBTOTAL(109)` calculates sums on visible rows only, ignoring rows hidden by active filters.",
    explanation: "Standard SUM includes hidden rows, leading to false reporting on filtered views.",
    hint: "SUBTOTAL 109 ignores hidden filtered rows.",
    level: "moderate",
    codeExample: "=SUBTOTAL(109, [Net_Amount])"
  },
  {
    question: "What makes `XLOOKUP` the universal successor to `VLOOKUP` and `INDEX-MATCH`?",
    shortAnswer: "Defaults to exact match, searches in any direction (including left), handles errors with `[if_not_found]`, and spills multi-column returns.",
    explanation: "Introduced in Excel 365, XLOOKUP eliminates rigid column index numbering.",
    hint: "Defaults to exact match and looks omnidirectionally.",
    level: "basic",
    codeExample: "=XLOOKUP(A2, tbl_Staff[ID], tbl_Staff[Salary], 0)"
  },
  {
    question: "How do you construct a Two-Way Matrix Lookup using `INDEX` and `MATCH`?",
    shortAnswer: "`=INDEX(MatrixRange, MATCH(RowKey, RowHeaders, 0), MATCH(ColKey, ColHeaders, 0))`",
    explanation: "Dynamically resolves both row and column indices to extract the exact intersection cell.",
    hint: "INDEX(Matrix, MATCH(Row), MATCH(Col))",
    level: "moderate",
    codeExample: "=INDEX(TariffGrid, MATCH(SKU, SKUs, 0), MATCH(Tier, Tiers, 0))"
  },
  {
    question: "How does `STDEV.S` differ mathematically from `STDEV.P`?",
    shortAnswer: "`STDEV.S` uses Bessel's correction dividing by (n - 1) for sample data, whereas `STDEV.P` divides by N for full populations.",
    explanation: "Sample standard deviation eliminates underestimation bias in sample subsets.",
    hint: "STDEV.S divides by (n - 1); STDEV.P divides by N.",
    level: "moderate",
    codeExample: "=STDEV.S(C2:C50) vs =STDEV.P(C2:C50)"
  },
  {
    question: "When is reporting the `MEDIAN` statistically preferred over the `AVERAGE` (Mean)?",
    shortAnswer: "When datasets contain extreme outliers or exhibit heavy skewness (e.g. executive compensation, housing prices).",
    explanation: "The median is robust against outlier distortion, whereas the mean is heavily skewed.",
    hint: "Median resists outlier distortion.",
    level: "basic",
    codeExample: "=MEDIAN(Salaries) vs =AVERAGE(Salaries)"
  },
  {
    question: "What are Tukey Outlier Fences and how are they calculated?",
    shortAnswer: "IQR = Q3 - Q1; Lower Fence = Q1 - 1.5*IQR; Upper Fence = Q3 + 1.5*IQR.",
    explanation: "Tukey's rule identifies anomalies resistant to extreme distribution skewness.",
    hint: "Lower = Q1 - 1.5*IQR; Upper = Q3 + 1.5*IQR.",
    level: "advanced",
    codeExample: "=[@Sales] > (Q3 + 1.5*(Q3 - Q1))"
  },
  {
    question: "How do you calculate Pearson correlation in Excel?",
    shortAnswer: "Use `=CORREL(Array1, Array2)`.",
    explanation: "Returns correlation coefficient r between -1 and +1.",
    hint: "=CORREL(X, Y)",
    level: "basic",
    codeExample: "=CORREL(AdSpend, Revenue)"
  },
  {
    question: "What is a dynamic array spill in Excel 365?",
    shortAnswer: "When a formula returns multiple values, Excel automatically spills them into neighboring blank cells with a blue bounding border.",
    explanation: "Spill ranges are referenced using the hash operator (`A2#`).",
    hint: "Formulas returning multiple values automatically populate adjacent cells.",
    level: "basic",
    codeExample: "=FILTER(tbl_Sales, tbl_Sales[Branch]=\"Barrackpore\")"
  },
  {
    question: "How does `TOCOL` transform a 2D matrix in Excel 365?",
    shortAnswer: "`=TOCOL(MatrixRange, [ignore_mode])` reshapes a 2D table into a single continuous 1D vertical column vector.",
    explanation: "Ignore mode 1 ignores blanks; mode 2 ignores errors; mode 3 ignores both.",
    hint: "TOCOL flattens 2D arrays into a single 1D column.",
    level: "moderate",
    codeExample: "=TOCOL(A2:D10, 3)"
  },
  {
    question: "What is a `LAMBDA` function in modern Excel?",
    shortAnswer: "A native formula engine that allows defining custom, reusable functions with parameters without writing VBA code.",
    explanation: "Syntax: `=LAMBDA(param1, param2, ..., calculation)`.",
    hint: "LAMBDA creates custom functions without VBA.",
    level: "advanced",
    codeExample: "=LAMBDA(cost, taxRate, cost * (1 + taxRate))"
  },
  {
    question: "How do helper functions `MAP`, `SCAN`, and `REDUCE` work with `LAMBDA`?",
    shortAnswer: "`MAP` transforms arrays element-by-element; `SCAN` produces running cumulative arrays; `REDUCE` aggregates arrays into a single scalar value.",
    explanation: "Higher-order helper engines apply custom LAMBDAs across dynamic arrays.",
    hint: "MAP=transform; SCAN=running accumulator; REDUCE=aggregate to single value.",
    level: "advanced",
    codeExample: "=REDUCE(0, SalesArray, LAMBDA(acc, val, acc + val))"
  },
  {
    question: "What is Power Query (Get & Transform) in Microsoft Excel?",
    shortAnswer: "An enterprise ETL (Extract, Transform, Load) engine that automates data importing, cleaning, unpivoting, and merging via M Code.",
    explanation: "Power Query records repeatable transformation steps, refreshing data with a single click.",
    hint: "Automated ETL engine running on M formula language.",
    level: "basic",
    codeExample: "Data → Get Data → From Folder / Database"
  },
  {
    question: "What is the primary function of `Table.UnpivotOtherColumns` in Power Query M code?",
    shortAnswer: "Transforms wide cross-tabulated reports with monthly column headers into normalized relational attribute-value rows.",
    explanation: "Essential for preparing pivoted data for Power Pivot star-schema modeling.",
    hint: "Unpivots wide columns into normalized rows.",
    level: "moderate",
    codeExample: "Table.UnpivotOtherColumns(PrevStep, {\"Branch\", \"Category\"}, \"Month\", \"Sales\")"
  },
  {
    question: "Why should you avoid using truncated vertical axes on Column and Bar charts?",
    shortAnswer: "Because the visual height of a bar represents absolute magnitude; truncating the baseline distorts proportional perception.",
    explanation: "Column and bar visual encodings require a zero baseline.",
    hint: "Always anchor column and bar chart baselines at zero.",
    level: "basic",
    codeExample: "Format Axis → Minimum Bound = 0"
  },
  {
    question: "How do you plot metrics with vast scale differences (e.g. Sales in Lakhs vs Margin %) on one chart?",
    shortAnswer: "Use a Combo Chart and assign the percentage metric to a Secondary Vertical Axis.",
    explanation: "Secondary axis provides an independent right-hand scale.",
    hint: "Assign Margin % to a Secondary Axis in Combo Chart settings.",
    level: "moderate",
    codeExample: "Combo Chart → Margin % on Secondary Axis"
  },
  {
    question: "What are Sparklines and where do they live in Excel?",
    shortAnswer: "Miniature in-cell trendline charts rendered directly inside standard worksheet cells.",
    explanation: "Provide quick historical trajectory context right alongside tabular row figures.",
    hint: "Sparklines live inside individual spreadsheet cells.",
    level: "basic",
    codeExample: "Insert → Sparklines → Line"
  },
  {
    question: "How do you open the Multi-Level Sort dialog box via keyboard?",
    shortAnswer: "Press `Alt + D + S` (or `Alt + A + S + S`).",
    explanation: "Allows adding multiple sorting levels (e.g. Branch, Department, Sales Descending).",
    hint: "Alt + D + S opens the Sort dialog.",
    level: "basic",
    codeExample: "Alt + D + S"
  },
  {
    question: "How do you toggle the Table Total Row using a keyboard shortcut?",
    shortAnswer: "Press `Ctrl + Shift + T`.",
    explanation: "Toggles the dynamic aggregate Total Row at the bottom of the table.",
    hint: "Ctrl + Shift + T toggles the Total Row.",
    level: "basic",
    codeExample: "Ctrl + Shift + T"
  },
  {
    question: "How do you clear all active AutoFilters across a table instantly?",
    shortAnswer: "Press `Alt + A + C`.",
    explanation: "Resets all column filter criteria while keeping filter dropdowns active.",
    hint: "Alt + A + C clears all applied filters.",
    level: "basic",
    codeExample: "Alt + A + C"
  },
  {
    question: "How do you clean hidden trailing spaces in lookup keys automatically inside a formula?",
    shortAnswer: "Wrap keys in `TRIM(CLEAN(...))`.",
    explanation: "TRIM removes spaces; CLEAN removes non-printable ASCII characters.",
    hint: "Use TRIM(CLEAN(Key)).",
    level: "moderate",
    codeExample: "=XLOOKUP(TRIM(A2), TRIM(tbl_Staff[ID]), tbl_Staff[Salary])"
  },
  {
    question: "How do you perform a multi-criteria lookup in `XLOOKUP` using Boolean array logic?",
    shortAnswer: "`=XLOOKUP(1, (Range1 = Crit1) * (Range2 = Crit2), ReturnRange, \"Not Found\")`",
    explanation: "Multiplying Boolean arrays evaluates compound AND logic in memory.",
    hint: "XLOOKUP(1, (Range1=Val1)*(Range2=Val2), ReturnRange)",
    level: "advanced",
    codeExample: "=XLOOKUP(1, (tbl_Rates[Region]=\"BKP\") * (tbl_Rates[Tier]=\"Gold\"), tbl_Rates[Price])"
  },
  {
    question: "What does `FORECAST.LINEAR(x, known_y, known_x)` calculate?",
    shortAnswer: "Projects predicted future values using least-squares linear regression (y = a + bx).",
    explanation: "Models linear trendlines from historical time-series datasets.",
    hint: "Calculates least-squares linear forecast.",
    level: "moderate",
    codeExample: "=FORECAST.LINEAR(13, Sales_History, Month_Numbers)"
  },
  {
    question: "How do you dynamically reference the entire spilled array originating in cell `A2`?",
    shortAnswer: "`A2#` (using the spill range operator `#`).",
    explanation: "The `#` operator dynamically expands to cover the entire spilled array size.",
    hint: "Append # after the top-left cell coordinate.",
    level: "basic",
    codeExample: "=SUM(A2#) or =INDEX(A2#, 1, 2)"
  },
  {
    question: "How do you magnetically snap chart and slicer borders to worksheet gridlines?",
    shortAnswer: "Hold the `Alt` key while dragging or resizing the visual object edges.",
    explanation: "The Alt key activates grid-snapping for precision layout alignment.",
    hint: "Hold Alt while dragging visual borders.",
    level: "basic",
    codeExample: "Hold ALT + Drag"
  },
  {
    question: "What is the purpose of Data Validation dropdown lists in financial modeling?",
    shortAnswer: "Constrains user input to authorized keys/codes, preventing data entry typos and lookup `#N/A` errors.",
    explanation: "Eliminates formula errors caused by invalid user inputs.",
    hint: "Constrains cell inputs to valid predefined choices.",
    level: "basic",
    codeExample: "Data Validation → List → Source: =tbl_SKU[Code]"
  },
  {
    question: "How do you format Slicers into a multi-column horizontal dashboard toolbar?",
    shortAnswer: "Select Slicer → Slicer ribbon tab → Increase 'Columns' to 4 or 5.",
    explanation: "Converts vertical button stacks into horizontal navigation ribbons.",
    hint: "Increase Slicer Columns count on the Slicer ribbon.",
    level: "basic",
    codeExample: "Slicer Ribbon → Columns = 4"
  },
  {
    question: "What is the primary difference between `COUNT` and `COUNTA`?",
    shortAnswer: "`COUNT` counts cells containing numbers only; `COUNTA` counts all non-empty cells (numbers, text, errors).",
    explanation: "Using COUNTA on numeric columns can corrupt sample size (n) if text headers/notes are present.",
    hint: "COUNT = numbers only; COUNTA = all non-blank cells.",
    level: "basic",
    codeExample: "n = COUNT(DataRange) [Numeric sample size]"
  },
  {
    question: "What is the ultimate golden rule of enterprise spreadsheet engineering in Microsoft Excel?",
    shortAnswer: "Structure data in dynamic Tables (`Ctrl+T`), use self-documenting syntax, enforce exact lookups (`XLOOKUP`), automate ETL with Power Query, and design clean zero-clutter dashboards.",
    explanation: "Discipline and modern functional architecture transform fragile spreadsheets into institutional-grade business intelligence engines.",
    hint: "Tables + XLOOKUP + Power Query + Clean Visual Storytelling.",
    level: "basic",
    codeExample: "Enterprise Excel Architecture = Tables + Dynamic Arrays + Power Query + Data Integrity"
  }
];

export default questions;
