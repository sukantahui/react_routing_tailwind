const questions = [
  {
    "question": "What is the primary breakthrough of GROUPBY and PIVOTBY in Excel 365?",
    "options": [
      "They create fully dynamic, formula-driven Pivot Tables that recalculate instantly without clicking 'Refresh'",
      "They replace VBA only",
      "They create 3D charts",
      "They connect to SQL only"
    ],
    "correctAnswer": 0,
    "explanation": "GROUPBY and PIVOTBY generate live formulaic pivot summaries that update in real time."
  },
  {
    "question": "How does PIVOTBY differ from GROUPBY?",
    "options": [
      "PIVOTBY supports 2D cross-tabulation (both row_fields and col_fields); GROUPBY aggregates along row_fields only",
      "PIVOTBY is for charts only",
      "GROUPBY is deprecated",
      "PIVOTBY only counts"
    ],
    "correctAnswer": 0,
    "explanation": "PIVOTBY includes column fields for 2D matrix cross-tabulation."
  },
  {
    "question": "What does the PERCENTOF function do in Excel 365?",
    "options": [
      "Calculates the percentage of a subset sum relative to the total dataset sum",
      "Formats numbers with %",
      "Divides by 100",
      "Computes interest"
    ],
    "correctAnswer": 0,
    "explanation": "=PERCENTOF(data_subset, all_data) calculates proportion of total automatically."
  },
  {
    "question": "What does field_headers = 3 specify in GROUPBY?",
    "options": [
      "Source data has headers and GROUPBY generates output headers",
      "No headers",
      "Hide headers",
      "Duplicate headers"
    ],
    "correctAnswer": 0,
    "explanation": "Code 3 indicates source data has headers and instructs Excel to show headers in the output."
  },
  {
    "question": "What does total_depth = 2 specify in GROUPBY?",
    "options": [
      "Grand totals and subtotals at the bottom of groups",
      "No totals",
      "Grand totals only",
      "Subtotals at top"
    ],
    "correctAnswer": 0,
    "explanation": "total_depth 2 generates both Grand Totals and group Subtotals."
  },
  {
    "question": "What does total_depth = -1 specify in GROUPBY?",
    "options": [
      "Grand totals placed at the top of the report",
      "No totals",
      "Subtotals only",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Negative values place totals at the top."
  },
  {
    "question": "How can you sort a GROUPBY output by the 2nd aggregated values column in descending order?",
    "options": [
      "sort_order = -2",
      "sort_order = 2",
      "sort_order = \"DESC\"",
      "Use SORT manually"
    ],
    "correctAnswer": 0,
    "explanation": "Passing negative column index (-2) sorts by column 2 descending."
  },
  {
    "question": "Can custom LAMBDA functions be passed to the function argument of GROUPBY (e.g. LAMBDA(x, MAX(x) - MIN(x)))?",
    "options": [
      "Yes, GROUPBY accepts custom lambda aggregators",
      "No, only SUM and AVERAGE",
      "Only with macros",
      "Only in Python"
    ],
    "correctAnswer": 0,
    "explanation": "GROUPBY accepts any custom lambda function."
  },
  {
    "question": "What does filter_array parameter allow in GROUPBY?",
    "options": [
      "Filters the source data rows before aggregation without nesting FILTER()",
      "Sorts rows",
      "Hides columns",
      "Deletes blanks"
    ],
    "correctAnswer": 0,
    "explanation": "filter_array applies inline boolean row filtering."
  },
  {
    "question": "How to aggregate multiple fields with different functions in GROUPBY (e.g. SUM and AVERAGE simultaneously)?",
    "options": [
      "Pass an array of lambdas: HSTACK(ETA.SUM, ETA.AVERAGE)",
      "Run GROUPBY twice",
      "Cannot be done",
      "Use Pivot Table"
    ],
    "correctAnswer": 0,
    "explanation": "HSTACKing eta functions aggregates multiple metrics in adjacent columns."
  },
  {
    "question": "What error occurs if the output grid of GROUPBY is blocked by existing cell data?",
    "options": [
      "#SPILL!",
      "#CALC!",
      "#VALUE!",
      "#REF!"
    ],
    "correctAnswer": 0,
    "explanation": "Blocked dynamic arrays produce #SPILL! errors."
  },
  {
    "question": "What is the return type of GROUPBY?",
    "options": [
      "A dynamic spilled 2D array containing headers, groups, aggregations, and totals",
      "Single number",
      "Chart",
      "PivotCache"
    ],
    "correctAnswer": 0,
    "explanation": "GROUPBY returns a live spilled dynamic array."
  },
  {
    "question": "How does GROUPBY eliminate the need for traditional PivotCache memory overhead?",
    "options": [
      "It calculates natively in Excel's dynamic array calculation tree without storing a secondary cache",
      "It saves to hard drive",
      "It deletes source data",
      "It uses cloud only"
    ],
    "correctAnswer": 0,
    "explanation": "Calculates in-memory directly from grid coordinates without PivotCache duplication."
  },
  {
    "question": "What formula produces total sales by Branch and Category with Grand Totals from Table1?",
    "options": [
      "=GROUPBY(Table1[[Branch]:[Category]], Table1[Sales], SUM, 3, 2)",
      "=PIVOT()",
      "=SUMIFS()",
      "=AGGREGATE()"
    ],
    "correctAnswer": 0,
    "explanation": "Passing multi-column row fields creates hierarchical group summaries with totals."
  },
  {
    "question": "How does PIVOTBY handle empty intersections in the 2D grid?",
    "options": [
      "Populates with empty or specified default fill value",
      "Throws error",
      "Crashes",
      "Fills with #N/A"
    ],
    "correctAnswer": 0,
    "explanation": "Empty matrix intersections render clean blank cells."
  },
  {
    "question": "What is the default aggregation function if omitted in GROUPBY?",
    "options": [
      "None; function is a required argument (e.g. SUM, AVERAGE, COUNT, ARRAYTOTEXT)",
      "SUM",
      "COUNT",
      "MAX"
    ],
    "correctAnswer": 0,
    "explanation": "function is a mandatory argument."
  },
  {
    "question": "Which eta-reduced function constant can be passed to GROUPBY for lightning-fast summing?",
    "options": [
      "SUM (or ETA.SUM)",
      "PLUS",
      "ADD",
      "TOTAL"
    ],
    "correctAnswer": 0,
    "explanation": "Directly passing the SUM function identifier performs eta-reduced aggregation."
  },
  {
    "question": "In Shyamnagar branch analytics, why replace legacy SUMIFS tables with GROUPBY?",
    "options": [
      "GROUPBY automatically discovers new branches and categories dynamically without manual formula copying",
      "SUMIFS is deleted",
      "GROUPBY uses less ink",
      "SUMIFS has 10 row limit"
    ],
    "correctAnswer": 0,
    "explanation": "New categories and branches appear automatically in the spilled output."
  },
  {
    "question": "Can GROUPBY aggregate text data (e.g. listing customer names with ARRAYTOTEXT)?",
    "options": [
      "Yes, passing ARRAYTOTEXT concatenates group text into comma-separated lists",
      "No, numbers only",
      "Only with VBA",
      "Only in Word"
    ],
    "correctAnswer": 0,
    "explanation": "=GROUPBY(Dept, Employee_Name, ARRAYTOTEXT) concatenates names per department."
  },
  {
    "question": "How to compute percentage of total sales per region using PERCENTOF in GROUPBY?",
    "options": [
      "=GROUPBY(Region, Sales, PERCENTOF, 3, 1)",
      "=GROUPBY(Region, Sales, SUM)/100",
      "=PERCENT()",
      "=RATIO()"
    ],
    "correctAnswer": 0,
    "explanation": "Passing PERCENTOF outputs proportional percentages totaling 100%."
  },
  {
    "question": "What does total_depth = 0 specify?",
    "options": [
      "No Grand Totals and No Subtotals",
      "Totals only",
      "All totals",
      "Subtotals only"
    ],
    "correctAnswer": 0,
    "explanation": "total_depth 0 suppresses all total rows."
  },
  {
    "question": "What does total_depth = 1 specify?",
    "options": [
      "Grand Totals only",
      "Subtotals only",
      "All totals",
      "Top totals"
    ],
    "correctAnswer": 0,
    "explanation": "total_depth 1 outputs Grand Totals without group subtotals."
  },
  {
    "question": "How to filter GROUPBY to include only Sales > 50000 in Table1?",
    "options": [
      "=GROUPBY(Branch, Sales, SUM, 3, 1, , Table1[Sales] > 50000)",
      "=FILTER(GROUPBY(...))",
      "=IF(Sales>50000, GROUPBY)",
      "=WHERE()"
    ],
    "correctAnswer": 0,
    "explanation": "The 7th argument filter_array filters rows before aggregation."
  },
  {
    "question": "Can PIVOTBY group dates by Year and Month automatically?",
    "options": [
      "Yes, by combining with YEAR() and TEXT() functions or date row fields",
      "No, dates not allowed",
      "Only in Access",
      "Only with macros"
    ],
    "correctAnswer": 0,
    "explanation": "Passing transformed date columns groups by temporal periods."
  },
  {
    "question": "What happens when source table rows are added or deleted in a GROUPBY model?",
    "options": [
      "The GROUPBY formula automatically resizes its spilled grid and recalculates immediately",
      "User must right click Refresh",
      "Data is corrupted",
      "Formulas break"
    ],
    "correctAnswer": 0,
    "explanation": "Dynamic arrays update instantly with structured table updates."
  },
  {
    "question": "Can GROUPBY output be referenced by subsequent dynamic array formulas using the # spill operator?",
    "options": [
      "Yes (e.g. =FILTER(A2#, ...))",
      "No",
      "Only with INDEX",
      "Only with VBA"
    ],
    "correctAnswer": 0,
    "explanation": "Spilled GROUPBY tables can be chained with # spill operators."
  },
  {
    "question": "What is the maximum number of row fields GROUPBY can group simultaneously?",
    "options": [
      "Multiple columns (passed as a multi-column range or HSTACK)",
      "Only 1",
      "Only 2",
      "Max 4"
    ],
    "correctAnswer": 0,
    "explanation": "Supports multi-level grouping across multiple columns."
  },
  {
    "question": "What does passing MEDIAN to GROUPBY calculate?",
    "options": [
      "The median value for each group",
      "Mean",
      "Mode",
      "Variance"
    ],
    "correctAnswer": 0,
    "explanation": "Calculates group medians (which traditional Pivot Tables cannot do natively without Power Pivot DAX)."
  },
  {
    "question": "Why is GROUPBY with MEDIAN a massive advantage over standard Excel Pivot Tables?",
    "options": [
      "Standard Excel Pivot Tables do not support Median; GROUPBY calculates true medians natively in one formula",
      "Pivot tables cannot count",
      "Pivot tables are slow",
      "GROUPBY is smaller"
    ],
    "correctAnswer": 0,
    "explanation": "Native Median aggregation without requiring Power Pivot DAX measures."
  },
  {
    "question": "How do GROUPBY and PIVOTBY revolutionize financial dashboards?",
    "options": [
      "They eliminate fragile Pivot Table refresh scripts, enabling pure formula-driven reactive dashboards",
      "They eliminate Excel",
      "They make files 100x bigger",
      "They require internet"
    ],
    "correctAnswer": 0,
    "explanation": "Enables reactive, maintenance-free dashboard architectures."
  }
];

export default questions;
