// topic11_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 11
// Topic: Merging queries (Joins: Left Outer, Right Outer, Full Outer, Inner, Left Anti, Right Anti)
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of 'Merge Queries' in Power Query?",
    shortAnswer: "It combines two tables horizontally based on matching values in one or more key columns, replacing traditional VLOOKUP / XLOOKUP formulas.",
    explanation: "Generates `Table.NestedJoin` with relational join semantics.",
    hint: "Combines tables horizontally based on matching keys (relational JOIN).",
    level: "basic",
    codeExample: "= Table.NestedJoin(Sales, {\"Cust_ID\"}, Customers, {\"Cust_ID\"}, \"CustDetails\", JoinKind.LeftOuter)"
  },
  {
    question: "What are the 6 relational Join Kinds available in Power Query?",
    shortAnswer: "1. Left Outer, 2. Right Outer, 3. Full Outer, 4. Inner, 5. Left Anti, and 6. Right Anti.",
    explanation: "Standard relational algebra join options.",
    hint: "Left Outer, Right Outer, Full Outer, Inner, Left Anti, Right Anti.",
    level: "basic",
    codeExample: "JoinKind.LeftOuter, JoinKind.Inner, JoinKind.LeftAnti, etc."
  },
  {
    question: "What is a 'Left Outer' join, and why is it the most frequently used join kind?",
    shortAnswer: "It retains ALL rows from the first (left) table and pulls matching records from the second (right) table; non-matching rows receive `null`.",
    explanation: "The direct equivalent of Excel's VLOOKUP / XLOOKUP.",
    hint: "All from Left + Matching from Right (VLOOKUP replacement).",
    level: "basic",
    codeExample: "= Table.NestedJoin(Orders, {\"ProductID\"}, Products, {\"ProductID\"}, \"ProdInfo\", JoinKind.LeftOuter)"
  },
  {
    question: "What is a 'Left Anti' join, and why is it invaluable for financial audits?",
    shortAnswer: "It keeps ONLY rows from the left table that have NO match in the right table, instantly surfacing missing master records, unregistered customers, or orphan transactions.",
    explanation: "Critical exception detection tool for accountants.",
    hint: "Rows ONLY in left table with NO match in right table (Exception Finder).",
    level: "moderate",
    codeExample: "= Table.NestedJoin(Ledger, {\"Vendor_ID\"}, ApprovedVendors, {\"Vendor_ID\"}, \"Unapproved\", JoinKind.LeftAnti)"
  },
  {
    question: "What is a 'Right Anti' join in Power Query?",
    shortAnswer: "It returns ONLY rows from the right table that do not match any row in the left table.",
    explanation: "Useful for finding inactive customers or unused inventory items.",
    hint: "Rows ONLY in right table that have no matches in the left table.",
    level: "moderate",
    codeExample: "= Table.NestedJoin(Sales, {\"Product_ID\"}, ProductsMaster, {\"Product_ID\"}, \"UnsoldProducts\", JoinKind.RightAnti)"
  },
  {
    question: "What is an 'Inner' join in Power Query?",
    shortAnswer: "It keeps ONLY rows where matching keys exist simultaneously in BOTH tables, discarding unmatched rows from both sides.",
    explanation: "Strict intersection join.",
    hint: "Keeps only matching rows from both tables.",
    level: "basic",
    codeExample: "JoinKind.Inner &rarr; Intersection of both datasets"
  },
  {
    question: "What is a 'Full Outer' join in Power Query?",
    shortAnswer: "It retains ALL rows from BOTH tables, populating `null` wherever a key does not find a match in the opposite table.",
    explanation: "Complete union join with matching row alignment.",
    hint: "All rows from both tables.",
    level: "basic",
    codeExample: "JoinKind.FullOuter &rarr; Complete union with alignment"
  },
  {
    question: "What M function is generated when you perform a Merge Queries step?",
    shortAnswer: "`Table.NestedJoin(Table1, Key1, Table2, Key2, NewColumnName, [JoinKind])`.",
    explanation: "Creates a new column containing nested sub-tables of matching records.",
    hint: "Table.NestedJoin.",
    level: "basic",
    codeExample: "= Table.NestedJoin(Fact_Sales, {\"Branch_ID\"}, Dim_Branches, {\"Branch_ID\"}, \"BranchData\", JoinKind.LeftOuter)"
  },
  {
    question: "What is the difference between 'Expanding' and 'Aggregating' a merged nested table column?",
    shortAnswer: "'Expand' extracts individual columns from the matched records (potentially duplicating rows if a 1-to-many relationship exists); 'Aggregate' calculates summary statistics (Sum, Count, Average) directly inside the row without row multiplication.",
    explanation: "Aggregation is faster and avoids 1-to-many row explosion.",
    hint: "Expand = unpacks columns; Aggregate = computes Sum/Count/Avg without row explosion.",
    level: "expert",
    codeExample: "Table.ExpandTableColumn vs Table.AggregateTableColumn"
  },
  {
    question: "How do you perform a multi-column composite key merge (e.g. matching on Branch ID AND Department ID)?",
    shortAnswer: "In the Merge dialog, hold Ctrl and click Branch ID first, then Department ID in Table 1; repeat in the exact same order in Table 2.",
    explanation: "Power Query assigns index numbers (1, 2) to indicate composite matching order.",
    hint: "Hold Ctrl and click columns in the exact same sequence in both tables.",
    level: "moderate",
    codeExample: "Composite Merge: Table.NestedJoin(T1, {\"Branch\", \"Dept\"}, T2, {\"Branch\", \"Dept\"}, \"Data\")"
  },
  {
    question: "What is a '1-to-Many Row Explosion' bug during a Merge operation?",
    shortAnswer: "If the lookup (right) table contains duplicate keys for a single entity, expanding the merged column duplicates the primary table's rows, inflating transaction revenue totals.",
    explanation: "Deduplicate lookup tables before merging.",
    hint: "Duplicate keys in lookup table cause row multiplication and revenue inflation.",
    level: "expert",
    codeExample: "1 Order matched to 3 duplicate Product rows &rarr; Triples Order Revenue!"
  },
  {
    question: "How do you prevent 1-to-many row explosion before merging?",
    shortAnswer: "Apply `Table.Distinct` on the key column of the right (lookup) table to ensure it is a true primary dimension key.",
    explanation: "Guarantees a strict 1-to-1 or Many-to-1 relationship.",
    hint: "Deduplicate lookup table key column with Table.Distinct.",
    level: "moderate",
    codeExample: "= Table.Distinct(Dim_Customers, {\"Customer_ID\"})"
  },
  {
    question: "Why does Power Query display a green checkmark indicating match percentage at the bottom of the Merge dialog?",
    shortAnswer: "It performs a sample join preview showing how many rows from the left table matched rows in the right table (e.g. *'The selection matches 4,980 of 5,000 rows'*).",
    explanation: "Immediate visual diagnostic of join cardinality.",
    hint: "Visual diagnostic preview showing matched row counts.",
    level: "basic",
    codeExample: "'The selection matches 4,980 of 5,000 rows (99.6%)'"
  },
  {
    question: "What causes non-matches during a Merge even when ID numbers visually look identical?",
    shortAnswer: "1. Data type mismatch (Text vs Number), 2. Leading/trailing spaces (`'101 '` vs `'101'`), or 3. Case-sensitivity differences in text keys (`'abc'` vs `'ABC'`).",
    explanation: "The 3 most common join failure causes.",
    hint: "Type mismatch (Text vs Number), hidden spaces, or case differences.",
    level: "moderate",
    codeExample: "Fix: Ensure matching types, Trim spaces, and synchronize casing!"
  },
  {
    question: "What is the difference between 'Merge Queries' and 'Merge Queries as New'?",
    shortAnswer: "'Merge Queries' inserts the joined nested column into the active query; 'Merge Queries as New' creates a separate 3rd query preserving both input queries.",
    explanation: "Modular architecture best practice.",
    hint: "Merge mutates active query; Merge as New creates a distinct output query.",
    level: "basic",
    codeExample: "Home Tab &rarr; Merge Queries vs Merge Queries as New"
  },
  {
    question: "Why should you uncheck 'Use original column name as prefix' when expanding merged columns?",
    shortAnswer: "To avoid bloated column headers like `Dim_Customers.Customer_Name` instead of a clean, professional `Customer_Name`.",
    explanation: "Keeps reporting schema headers clean and readable.",
    hint: "Uncheck to prevent 'TableName.ColumnName' prefix bloat.",
    level: "basic",
    codeExample: "Uncheck: 'Use original column name as prefix'"
  },
  {
    question: "What M function performs a flat horizontal join without creating intermediate nested tables?",
    shortAnswer: "`Table.Join(Table1, Key1, Table2, Key2, [JoinKind])`.",
    explanation: "Directly produces expanded tabular rows without Table.NestedJoin.",
    hint: "Table.Join.",
    level: "advanced",
    codeExample: "= Table.Join(Sales, \"Cust_ID\", Customers, \"Cust_ID\", JoinKind.LeftOuter)"
  },
  {
    question: "How does Power Query handle Query Folding when merging two tables from the SAME SQL database?",
    shortAnswer: "It translates the step into a native server-side SQL `LEFT JOIN` / `INNER JOIN`, executing the join entirely on the database engine!",
    explanation: "Sub-second execution of multi-table joins on SQL servers.",
    hint: "Folds into server-side SQL LEFT JOIN / INNER JOIN.",
    level: "expert",
    codeExample: "M Table.NestedJoin &rarr; SQL: SELECT * FROM T1 LEFT JOIN T2 ON T1.ID = T2.ID"
  },
  {
    question: "What is the 'Formula.Firewall' privacy error during a Merge operation?",
    shortAnswer: "Occurs when combining data from two sources with incompatible Privacy Levels (e.g. merging a Private local Excel file with an Organizational Web API or SQL server).",
    explanation: "Power Query prevents unauthorized data exfiltration across security zones.",
    hint: "Incompatible Privacy Levels across different data sources.",
    level: "expert",
    codeExample: "Formula.Firewall: Query references other queries or steps in various security partitions"
  },
  {
    question: "How do you resolve a 'Formula.Firewall' privacy error during a cross-source Merge?",
    shortAnswer: "Set Privacy Levels to 'Organizational' across all sources in Data Source Settings, or set Privacy to 'Ignore Privacy Levels' for local desktop files.",
    explanation: "Harmonizes privacy partition boundaries.",
    hint: "Data Source Settings &rarr; Edit Permissions &rarr; Privacy Level: Organizational.",
    level: "advanced",
    codeExample: "File &rarr; Options &rarr; Privacy &rarr; Ignore Privacy Levels"
  },
  {
    question: "How do you calculate the total lifetime spend of a customer during a merge without expanding rows?",
    shortAnswer: "Click the Aggregate icon on the nested table column &rarr; Check `Amount` &rarr; Select `Sum` (`Table.AggregateTableColumn`).",
    explanation: "Directly rolls up metric totals inside the parent dimension table.",
    hint: "Aggregate icon &rarr; Sum of Amount (`Table.AggregateTableColumn`).",
    level: "moderate",
    codeExample: "= Table.AggregateTableColumn(#\"Merged\", \"SalesData\", {{\"Amount\", List.Sum, \"Total_Lifetime_Spend\"}})"
  },
  {
    question: "What is the performance advantage of using `Table.Buffer` on the right lookup table before merging large flat files?",
    shortAnswer: "It loads the entire lookup table into RAM once, preventing Power Query from re-reading the source file millions of times during row-by-row lookups.",
    explanation: "Massive 10x-50x speedup on local flat file merges.",
    hint: "Loads lookup table into RAM to prevent repetitive file reads.",
    level: "expert",
    codeExample: "= Table.NestedJoin(Fact, {\"ID\"}, Table.Buffer(Dim), {\"ID\"}, \"Data\", JoinKind.LeftOuter)"
  },
  {
    question: "How do you perform a self-join in Power Query (e.g. employee reporting to manager ID)?",
    shortAnswer: "Merge a query with itself: select `Manager_ID` from the first table and `Employee_ID` from the second instance of the same table.",
    explanation: "Standard organizational hierarchy modeling.",
    hint: "Merge query with itself: Manager_ID &rarr; Employee_ID.",
    level: "moderate",
    codeExample: "= Table.NestedJoin(Employees, {\"Manager_ID\"}, Employees, {\"Employee_ID\"}, \"ManagerInfo\")"
  },
  {
    question: "Can you merge tables where the key column is of type 'Date' in one table and 'DateTime' in the other?",
    shortAnswer: "No, the merge will fail to match rows; you must first convert the DateTime column to `type date` using `DateTime.Date`.",
    explanation: "Exact data type consistency is mandatory for join key equality.",
    hint: "Convert DateTime to Date before merging.",
    level: "basic",
    codeExample: "Coerce DateTime &rarr; Date prior to Table.NestedJoin"
  },
  {
    question: "How do you count the number of orders placed by each customer using a Merge?",
    shortAnswer: "Merge Customers with Orders &rarr; Click Aggregate icon &rarr; Select 'Count of Order_ID'.",
    explanation: "Instant parent-child record counting.",
    hint: "Aggregate icon &rarr; Count of Rows / Order_ID.",
    level: "basic",
    codeExample: "= Table.AggregateTableColumn(#\"Merged\", \"Orders\", {{\"Order_ID\", List.NonNullCount, \"Order_Count\"}})"
  },
  {
    question: "How do you perform a cross join (Cartesian product) in Power Query where every row from Table 1 joins with every row from Table 2?",
    shortAnswer: "Add a custom column to Table 1 containing the entire Table 2: `= Table.AddColumn(T1, \"AllT2\", each T2)`, then expand the column.",
    explanation: "Generates M &times; N Cartesian combination rows.",
    hint: "Add Custom Column: `each Table2` &rarr; Expand.",
    level: "expert",
    codeExample: "= Table.ExpandTableColumn(Table.AddColumn(T1, \"Cross\", each T2), \"Cross\", {\"ColA\", \"ColB\"})"
  },
  {
    question: "What happens to null values in the key column during a Merge operation?",
    shortAnswer: "Null keys NEVER match each other in Power Query joins; two null keys do not satisfy equality, producing null in the expanded column.",
    explanation: "Adheres to standard SQL three-valued logic (NULL != NULL).",
    hint: "Null keys never match each other (NULL != NULL).",
    level: "advanced",
    codeExample: "Left Table Null Key + Right Table Null Key = NO MATCH"
  },
  {
    question: "Why should you disable 'Enable Load' on lookup dimension queries that are merged into fact tables?",
    shortAnswer: "If the dimension details have already been merged directly into the fact table, loading the separate dimension query wastes memory and creates redundant workbook tables.",
    explanation: "Streamlines the Data Model schema.",
    hint: "Prevents loading redundant standalone lookup queries into RAM.",
    level: "moderate",
    codeExample: "Disable 'Enable Load' on merged staging lookups"
  },
  {
    question: "How do you merge two queries when the key column has mixed casing (e.g. 'abc' vs 'ABC')?",
    shortAnswer: "Convert both key columns to uppercase (`Text.Upper`) or lowercase (`Text.Lower`) prior to merging.",
    explanation: "Ensures 100% join key equality.",
    hint: "Apply Text.Upper on both key columns before merging.",
    level: "basic",
    codeExample: "Table.TransformColumns(tbl, {{\"Key\", Text.Upper}})"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Merging Queries?",
    shortAnswer: "Deduplicate lookup keys and verify data types before joining! Always check the green match percentage preview at the bottom of the Merge dialog to spot join anomalies early. Use 'Left Anti' joins to catch audit reconciliation breaks and unapproved vendors, wrap lookup tables in Table.Buffer for 10x local file performance, and ALWAYS ensure lookup tables have unique primary keys to prevent catastrophic 1-to-many row explosion and revenue inflation!",
    explanation: "Relational joins are the master bridge between transaction facts and corporate dimension intelligence!",
    hint: "Deduplicate Lookups + Match Data Types + Left Anti for Audits + Table.Buffer = Flawless Relational ETL!",
    level: "expert",
    codeExample: "Rule: Deduplicate Dimension &rarr; Verify Types &rarr; Table.Buffer(Dim) &rarr; NestedJoin &rarr; Aggregate/Expand!"
  }
];

export default questions;
