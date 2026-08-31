// topic9_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 9
// Topic: Pivoting columns and custom aggregations in Power Query
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of the 'Pivot Column' transformation in Power Query?",
    shortAnswer: "It converts distinct values from a single row column into multiple new column headers, aggregating associated values from a second column.",
    explanation: "Generates `Table.Pivot` to transform tall datasets into summarized wide views.",
    hint: "Converts unique row values into column headers with aggregation.",
    level: "basic",
    codeExample: "= Table.Pivot(Source, List.Distinct(Source[Category]), \"Category\", \"Amount\", List.Sum)"
  },
  {
    question: "What are the 2 required column selections when configuring a Pivot Column step?",
    shortAnswer: "1. The column to pivot (values become headers), and 2. The 'Values Column' containing the metric to aggregate.",
    explanation: "The pivot dialog requires specifying which column supplies header names and which supplies cell values.",
    hint: "Pivot column (headers) and Values Column (metrics).",
    level: "basic",
    codeExample: "Pivot Column: [Metric] | Values Column: [Amount]"
  },
  {
    question: "What aggregate functions are available under 'Advanced Options' in the Pivot Column dialog?",
    shortAnswer: "Sum, Count (All), Count (Not Blank), Average, Max, Min, Median, and 'Don't Aggregate'.",
    explanation: "Provides full statistical aggregation capabilities during pivoting.",
    hint: "Sum, Count, Average, Min, Max, Median, Don't Aggregate.",
    level: "moderate",
    codeExample: "Advanced Options → Aggregate Value Function: Sum"
  },
  {
    question: "When should you select 'Don't Aggregate' in the Pivot Column dialog?",
    shortAnswer: "When pivoting non-numeric text columns (e.g. Attribute-Value pairs like Address, Email, Phone) where each entity has at most ONE value per attribute.",
    explanation: "Converts EAV (Entity-Attribute-Value) models into standard wide entity tables.",
    hint: "Used for text attribute-value pairs without duplication.",
    level: "advanced",
    codeExample: "Table.Pivot(tbl, {\"Phone\", \"Email\"}, \"Attribute\", \"Value\") -- Don't Aggregate"
  },
  {
    question: "What error occurs if you choose 'Don't Aggregate' when an entity has multiple values for the same attribute?",
    shortAnswer: "Power Query generates an expression error: *'There were too many elements in the enumeration to complete the operation.'*",
    explanation: "Occurs because 'Don't Aggregate' requires a strict 1-to-1 mapping.",
    hint: "Error: Too many elements in the enumeration.",
    level: "expert",
    codeExample: "Expression.Error: There were too many elements in the enumeration"
  },
  {
    question: "What is the primary function of 'Group By' in Power Query?",
    shortAnswer: "It aggregates rows based on one or more grouping columns, calculating summary statistics (e.g. total revenue per customer or department).",
    explanation: "Generates `Table.Group` to summarize datasets in memory.",
    hint: "Aggregates rows based on group keys (`Table.Group`).",
    level: "basic",
    codeExample: "= Table.Group(Source, {\"Department\"}, {{\"Total_Salary\", each List.Sum([Salary]), type number}})"
  },
  {
    question: "What is the difference between 'Basic' and 'Advanced' Group By?",
    shortAnswer: "'Basic' groups by a single column and creates 1 aggregation; 'Advanced' allows grouping by multiple columns and creating multiple simultaneous aggregations (e.g. Total, Average, Count).",
    explanation: "Advanced Group By enables multi-key hierarchical summarization.",
    hint: "Basic: 1 key + 1 aggregation; Advanced: multi-key + multi-aggregations.",
    level: "basic",
    codeExample: "Advanced Group By: [Branch, Dept] → Sum(Amount), Count(ID), Avg(Margin)"
  },
  {
    question: "What does the 'All Rows' operation do in the Group By dialog?",
    shortAnswer: "It groups records into a nested `Table` object for each key, allowing you to retain the underlying granular detail rows alongside group aggregates.",
    explanation: "Creates sub-tables per group for advanced rank and running total computations.",
    hint: "Operation: All Rows → returns nested Table objects.",
    level: "expert",
    codeExample: "{{\"GroupDetails\", each _, type table}}"
  },
  {
    question: "How do you extract the Top 1 highest sale per customer using 'Group By All Rows'?",
    shortAnswer: "Group by Customer with Operation 'All Rows', then add a custom column: `Table.FirstN(Table.Sort([GroupDetails], {{\"Amount\", Order.Descending}}), 1)`, then expand.",
    explanation: "Power Query pattern for Top N per group ranking.",
    hint: "Group All Rows → Table.Sort → Table.FirstN(1) → Expand.",
    level: "expert",
    codeExample: "= Table.AddColumn(#\"Grouped\", \"TopSale\", each Table.FirstN(Table.Sort([AllRows], {{\"Amount\", Order.Descending}}), 1))"
  },
  {
    question: "What M function performs Group By summarization?",
    shortAnswer: "`Table.Group(Table, KeyColumnsList, AggregatedColumnsList)`.",
    explanation: "Core M function for data grouping and aggregation.",
    hint: "Table.Group.",
    level: "basic",
    codeExample: "= Table.Group(Source, {\"Branch\"}, {{\"Total_Sales\", each List.Sum([Sales]), type number}})"
  },
  {
    question: "How do you calculate 'Count Distinct Rows' during a Group By transformation?",
    shortAnswer: "Select Operation → 'Count Distinct Rows' (`List.NonNullCount(List.Distinct([Col]))`).",
    explanation: "Counts unique items per group (e.g. distinct active customers per branch).",
    hint: "Operation → Count Distinct Rows.",
    level: "moderate",
    codeExample: "{{\"Unique_Customers\", each Table.RowCount(Table.Distinct(_)), type number}}"
  },
  {
    question: "What M list aggregation function calculates the median value in a Group By step?",
    shortAnswer: "`List.Median([NumericColumn])`.",
    explanation: "Calculates the exact statistical median value per group.",
    hint: "List.Median.",
    level: "moderate",
    codeExample: "{{\"Median_Salary\", each List.Median([Salary]), type number}}"
  },
  {
    question: "What M list aggregation function calculates the standard deviation in a custom Group By step?",
    shortAnswer: "`List.StandardDeviation([NumericColumn])`.",
    explanation: "Computes population or sample standard deviation.",
    hint: "List.StandardDeviation.",
    level: "advanced",
    codeExample: "{{\"StdDev\", each List.StandardDeviation([Amount]), type number}}"
  },
  {
    question: "Why does Power Query's `Table.Pivot` require passing the list of unique column headers as its 2nd argument?",
    shortAnswer: "Because Power Query needs a deterministic schema definition to construct fixed table column definitions during evaluation.",
    explanation: "Usually supplied dynamically via `List.Distinct(Source[PivotCol])`.",
    hint: "Requires explicit distinct column header list for deterministic schema.",
    level: "expert",
    codeExample: "Table.Pivot(tbl, List.Distinct(tbl[Category]), \"Category\", \"Amount\", List.Sum)"
  },
  {
    question: "What is the difference between Group By in Power Query vs a SQL `GROUP BY` clause?",
    shortAnswer: "Both group records; however, Power Query's 'All Rows' feature can store the complete un-aggregated sub-table inside the cell, which standard SQL cannot do without JSON/array aggregation.",
    explanation: "Power Query supports nested tables within record cells.",
    hint: "Power Query supports nested table objects in cells via 'All Rows'.",
    level: "advanced",
    codeExample: "Nested Table objects in M cells vs Flat SQL Group By"
  },
  {
    question: "How do you concatenate text strings per group (e.g. list all employee names in a department as comma-separated text)?",
    shortAnswer: "Group By → Add Custom Column: `Text.Combine([GroupDetails][EmployeeName], \", \")`.",
    explanation: "Performs group string concatenation equivalent to SQL `STRING_AGG` or `GROUP_CONCAT`.",
    hint: "Text.Combine([Table][Column], ', ').",
    level: "advanced",
    codeExample: "{{\"All_Employees\", each Text.Combine(_[EmployeeName], \", \"), type text}}"
  },
  {
    question: "How do you compute the percentage contribution of each row to its group total in Power Query?",
    shortAnswer: "1. Group by Key with Sum(Total) and 'All Rows', 2. Expand All Rows, 3. Add Custom Column: `[Amount] / [GroupTotal]` formatted as percentage.",
    explanation: "Multi-level group percentage calculation pattern.",
    hint: "Group with Sum + All Rows → Expand → [Amount] / [GroupTotal].",
    level: "expert",
    codeExample: "= Table.AddColumn(#\"Expanded\", \"PctOfGroup\", each [Amount] / [TotalDeptSales])"
  },
  {
    question: "What happens if a numerical column contains `null` values during `List.Sum` in a Group By step?",
    shortAnswer: "`List.Sum` ignores nulls and computes the sum of all valid numeric cells (or returns null if all items are null).",
    explanation: "Nulls do not propagate into errors during List.Sum.",
    hint: "List.Sum ignores null values automatically.",
    level: "moderate",
    codeExample: "List.Sum({10, null, 20}) = 30"
  },
  {
    question: "How do you calculate running totals within each group in Power Query?",
    shortAnswer: "Group by Key with 'All Rows' → Add Index column to each nested sub-table via `Table.AddIndexColumn` → Compute cumulative sum using `List.Range` → Expand sub-tables.",
    explanation: "Standard M pattern for partitioned running totals.",
    hint: "Group All Rows → Add Index to sub-tables → List.Range running sum.",
    level: "expert",
    codeExample: "Table.AddColumn(subTable, \"RunningTotal\", each List.Sum(List.Range(subTable[Amount], 0, [Index]+1)))"
  },
  {
    question: "Why should you avoid pivoting large datasets if you intend to load into Power BI?",
    shortAnswer: "Because Power BI's VertiPaq engine performs optimally on narrow, tall relational tables; pivoting creates wide matrices that degrade DAX compression and relationship efficiency.",
    explanation: "Keep datasets unpivoted/tall for Power BI; pivot only for final presentation tables.",
    hint: "Narrow tall tables compress 10x better in Power BI than wide pivoted matrices.",
    level: "moderate",
    codeExample: "Tall Tabular (Best for DAX) vs Wide Pivoted (Presentation Only)"
  },
  {
    question: "What M function calculates the average value in a custom aggregation?",
    shortAnswer: "`List.Average([ColumnName])`.",
    explanation: "Computes the arithmetic mean of numeric items in a list.",
    hint: "List.Average.",
    level: "basic",
    codeExample: "{{\"Avg_Revenue\", each List.Average([Revenue]), type number}}"
  },
  {
    question: "How do you perform a Min and Max aggregation simultaneously in one Group By step?",
    shortAnswer: "In the Advanced Group By dialog, add two aggregation rows: 1 for `Min` and 1 for `Max`.",
    explanation: "Generates two M aggregation pairs in the `Table.Group` list.",
    hint: "Add aggregation: Min([Date]), Add aggregation: Max([Date]).",
    level: "basic",
    codeExample: "{{\"FirstDate\", each List.Min([Date])}, {\"LastDate\", each List.Max([Date])}}"
  },
  {
    question: "How do you count total rows including blanks per group?",
    shortAnswer: "Select Operation → 'Count Rows' (`Table.RowCount(_)`).",
    explanation: "Returns the integer count of all rows in that group.",
    hint: "Operation → Count Rows.",
    level: "basic",
    codeExample: "{{\"Total_Orders\", each Table.RowCount(_), type number}}"
  },
  {
    question: "How do you pivot a key-value attribute table where some keys are missing for certain entities?",
    shortAnswer: "Apply Pivot Column with 'Don't Aggregate'; Power Query inserts `null` automatically for missing key-entity combinations.",
    explanation: "Handles sparse matrices and optional attributes cleanly.",
    hint: "Inserts null for missing attribute keys.",
    level: "moderate",
    codeExample: "Sparse Attribute Pivot → Populates nulls for missing keys"
  },
  {
    question: "What is the impact of performing Group By on a SQL database source in Power Query?",
    shortAnswer: "Power Query translates the step into a native SQL `GROUP BY` clause (Query Folding), executing the heavy aggregation directly on the SQL server!",
    explanation: "Massive performance optimization that offloads computing to the database.",
    hint: "Folds into server-side SQL GROUP BY clause.",
    level: "expert",
    codeExample: "M Table.Group → SQL: SELECT Dept, SUM(Salary) FROM Emps GROUP BY Dept"
  },
  {
    question: "How do you filter a grouped table to keep only groups having a sum greater than ₹100,000 (equivalent to SQL `HAVING`)?",
    shortAnswer: "Apply `Table.Group` first, then add a `Table.SelectRows` step filtering on the aggregated sum column (`each [Total_Sales] > 100000`).",
    explanation: "Power Query folds this sequence into SQL `GROUP BY ... HAVING SUM(...) > 100000`.",
    hint: "Table.Group → Table.SelectRows([Total_Sales] > 100000).",
    level: "moderate",
    codeExample: "= Table.SelectRows(#\"Grouped\", each [Total_Sales] > 100000)"
  },
  {
    question: "How do you rank rows within each group in Power Query (e.g. rank sales reps within each branch)?",
    shortAnswer: "Group by Branch with 'All Rows' → Sort sub-table descending → Add Index column `[Index] + 1` as Rank → Expand sub-tables.",
    explanation: "Equivalent to SQL `ROW_NUMBER() OVER (PARTITION BY Branch ORDER BY Sales DESC)`.",
    hint: "Group All Rows → Sort → Add Index → Expand.",
    level: "expert",
    codeExample: "Nested Table.AddIndexColumn = SQL PARTITION BY Rank"
  },
  {
    question: "What is the difference between `List.Count` and `List.NonNullCount` in M aggregations?",
    shortAnswer: "`List.Count` counts all items including nulls; `List.NonNullCount` counts only non-null valid elements.",
    explanation: "Essential distinction when calculating non-blank metric counts.",
    hint: "List.Count = all items; List.NonNullCount = excludes nulls.",
    level: "advanced",
    codeExample: "List.Count({1, null, 3}) = 3 | List.NonNullCount({1, null, 3}) = 2"
  },
  {
    question: "Can you unpivot a pivoted table to return to the original dataset structure?",
    shortAnswer: "Yes, selecting the dimension keys and choosing 'Unpivot Other Columns' reverses a standard pivot operation.",
    explanation: "Pivoting and Unpivoting are complementary inverse matrix operations.",
    hint: "Yes, Unpivot is the inverse operation of Pivot.",
    level: "basic",
    codeExample: "Pivot → Unpivot = Returns to normalized tabular structure"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Pivoting & Aggregations?",
    shortAnswer: "Keep data tall for analytics, pivot only for final display, and unlock nested power with 'Group By All Rows'! Use 'Don't Aggregate' to flatten EAV text attributes into entity tables, place Group By early to trigger SQL server-side GROUP BY query folding, and leverage nested sub-tables (`each _`) to calculate partitioned rankings and group string concatenations like a true data engineering master!",
    explanation: "Pivoting and custom Group By transformations turn raw data into executive business intelligence!",
    hint: "Tall for DAX + Group By 'All Rows' for Partitioned Ranking + SQL Query Folding!",
    level: "expert",
    codeExample: "Rule: Keep Tabular for Modeling → Group By All Rows for Advanced Ranking → SQL Folding!"
  }
];

export default questions;
