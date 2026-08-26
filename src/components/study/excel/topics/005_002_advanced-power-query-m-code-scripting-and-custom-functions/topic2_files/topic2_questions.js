// topic2_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 2
// Topic: Essential M standard library functions: Table.*, List.*, Record.*, and Text.*
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "How is the Power Query M standard library organized?",
    shortAnswer: "It is organized into object namespaces based on the primary data type being manipulated (e.g. `Table.*`, `List.*`, `Record.*`, `Text.*`, `Date.*`, `Number.*`).",
    explanation: "Namespace organization groups hundreds of built-in standard library functions by return/target type.",
    hint: "Organized by object type namespaces (Table.*, List.*, Record.*, Text.*).",
    level: "basic",
    codeExample: "Table.SelectRows(...), List.Sum(...), Text.Trim(...)"
  },
  {
    question: "What does `Table.SelectRows` do, and what is its second argument?",
    shortAnswer: "It filters table rows based on a condition; its second argument is a predicate function (usually declared with `each condition`).",
    explanation: "Standard table filtering function.",
    hint: "Filters rows; second argument is a predicate condition (each ...).",
    level: "basic",
    codeExample: "= Table.SelectRows(Source, each [Amount] >= 50000)"
  },
  {
    question: "What is the difference between `Table.AddColumn` and `Table.TransformColumns`?",
    shortAnswer: "`Table.AddColumn` appends a new column to the table; `Table.TransformColumns` modifies an existing column in-place without creating a new column.",
    explanation: "AddColumn expands width, TransformColumns alters existing columns in-place.",
    hint: "AddColumn creates a new column; TransformColumns modifies existing columns in-place.",
    level: "moderate",
    codeExample: "Add: Table.AddColumn(T, \"Tax\", each [Amt]*0.18)\nTransform: Table.TransformColumns(T, {{\"Amt\", each _ * 1.18}})"
  },
  {
    question: "What does `List.Transform` do in M code?",
    shortAnswer: "It applies a transformation lambda function to every element in a list, returning a new transformed list of the same length.",
    explanation: "Higher-order mapping function for 1D arrays.",
    hint: "Applies a transformation function to each list element (like map).",
    level: "moderate",
    codeExample: "= List.Transform({10, 20, 30}, each _ * 2) // returns {20, 40, 60}"
  },
  {
    question: "What does `List.Select` do in M code?",
    shortAnswer: "It filters a list, returning only elements that satisfy a boolean predicate condition (similar to filter in JavaScript/Python).",
    explanation: "Higher-order filtering function for lists.",
    hint: "Filters list elements based on a condition.",
    level: "moderate",
    codeExample: "= List.Select({10, 25, 5, 80}, each _ > 20) // returns {25, 80}"
  },
  {
    question: "How do you test if a specific value exists inside a list using M standard library?",
    shortAnswer: "Using `List.Contains(TargetList, SearchValue)` (returns `true` or `false`).",
    explanation: "High-speed list membership testing function.",
    hint: "List.Contains(List, Value).",
    level: "basic",
    codeExample: "IsApproved = List.Contains({\"BKP\", \"SHYAM\", \"ICH\"}, [Branch])"
  },
  {
    question: "What does `List.Generate` do in M, and why is it essential for API development?",
    shortAnswer: "It acts as a functional `while` loop generator, creating a list by evaluating initial state, continuation condition, next-step generator, and output selector—vital for multi-page REST API pagination.",
    explanation: "The core iterative loop construct in pure functional M.",
    hint: "Functional while loop generator for API pagination.",
    level: "expert",
    codeExample: "= List.Generate(()=> 1, each _ <= 10, each _ + 1, each _ * 100)"
  },
  {
    question: "What does `List.Zip` do when given multiple lists?",
    shortAnswer: "It combines multiple lists element-by-element into a list of tuples/sublists (e.g. `List.Zip({{1, 2}, {\"A\", \"B\"}})` returns `{{1, \"A\"}, {2, \"B\"}}`).",
    explanation: "Standard matrix transposition / pairing function.",
    hint: "Pairs elements from multiple lists by index.",
    level: "advanced",
    codeExample: "= List.Zip({{101, 102}, {\"Swadeep\", \"Tuhina\"}})"
  },
  {
    question: "What does `Record.FieldOrDefault` do, and why is it preferred over `Record[Field]` in dynamic pipelines?",
    shortAnswer: "It safely retrieves a field value from a record, returning a fallback default value (e.g. `null` or `0`) instead of throwing a fatal error if the field does not exist.",
    explanation: "Defensive field retrieval against variable schemas.",
    hint: "Safely retrieves a field with a fallback to prevent missing-field errors.",
    level: "moderate",
    codeExample: "Tax = Record.FieldOrDefault(Config, \"CustomTaxRate\", 0.18)"
  },
  {
    question: "How do you extract a list of all field names present in an M Record?",
    shortAnswer: "Using `Record.FieldNames(TargetRecord)`.",
    explanation: "Returns the record's keys as a List of Text strings.",
    hint: "Record.FieldNames(Record).",
    level: "basic",
    codeExample: "Keys = Record.FieldNames([ID=101, Name=\"Swadeep\", City=\"BKP\"])"
  },
  {
    question: "How do you extract a list of all column headers present in an M Table?",
    shortAnswer: "Using `Table.ColumnNames(TargetTable)`.",
    explanation: "Returns table headers as an M List.",
    hint: "Table.ColumnNames(Table).",
    level: "basic",
    codeExample: "Headers = Table.ColumnNames(FactSales)"
  },
  {
    question: "What does `Text.BetweenDelimiters` do in M code?",
    shortAnswer: "It extracts the substring located between two specified delimiter strings within a text value.",
    explanation: "Standard text boundary extraction function.",
    hint: "Text.BetweenDelimiters(Text, StartDelim, EndDelim).",
    level: "basic",
    codeExample: "= Text.BetweenDelimiters(\"Invoice_[TXN-901]_Final.pdf\", \"[\", \"]\") // returns \"TXN-901\""
  },
  {
    question: "What does `Text.PadStart` do in M, and how is it used for numeric formatting?",
    shortAnswer: "It pads the left side of a text string with a specified character until it reaches a target length (e.g. `Text.PadStart(Text.From([ID]), 6, \"0\")` formats `123` as `\"000123\"`).",
    explanation: "Zero-padding and fixed-width alignment utility.",
    hint: "Pads text with leading characters to reach target length (e.g. leading zeros).",
    level: "basic",
    codeExample: "= Text.PadStart(\"45\", 5, \"0\") // returns \"00045\""
  },
  {
    question: "What does `Text.Split` do in M code?",
    shortAnswer: "It divides a text string into an M List of substrings based on a specified delimiter.",
    explanation: "Text tokenization into 1D List.",
    hint: "Splits a text string into a List by delimiter.",
    level: "basic",
    codeExample: "= Text.Split(\"Barrackpore,Shyamnagar,Ichapur\", \",\")"
  },
  {
    question: "What does `Text.Combine` do in M code?",
    shortAnswer: "It joins an M List of text strings into a single unified text string, optionally inserting a separator delimiter between elements.",
    explanation: "Inverse of Text.Split.",
    hint: "Joins a List of text strings into a single string with a separator.",
    level: "basic",
    codeExample: "= Text.Combine({\"BKP\", \"SHYAM\", \"ICH\"}, \" | \")"
  },
  {
    question: "What does `Table.Group` do, and what are its 3 primary arguments?",
    shortAnswer: "`Table.Group(Table, KeyColumnsList, AggregationsList)` groups rows by key columns and evaluates aggregate summary metrics (Sum, Count, Average, or AllRows).",
    explanation: "Standard Group By aggregation engine in M.",
    hint: "Table.Group(Table, GroupKeys, Aggregations).",
    level: "moderate",
    codeExample: "= Table.Group(Source, {\"Branch\"}, {{\"TotalSales\", each List.Sum([Amt]), type number}})"
  },
  {
    question: "How do you group a table and preserve all underlying detail rows for nested expansion?",
    shortAnswer: "In `Table.Group`, define the aggregation as `{\"Details\", each _, type table}` (using `each _` to capture the entire subgroup table).",
    explanation: "Creates a nested table column containing subgroup rows.",
    hint: "each _ preserves the entire subgroup as a nested Table.",
    level: "expert",
    codeExample: "= Table.Group(Source, {\"Branch\"}, {{\"AllData\", each _, type table}})"
  },
  {
    question: "What does `Table.Distinct` do when given a specific list of key columns?",
    shortAnswer: "It removes duplicate rows based strictly on the specified key columns, keeping only the first occurrence for each unique key combination.",
    explanation: "Deduplication targeting specific key subsets.",
    hint: "Deduplicates table based on specified key column list.",
    level: "moderate",
    codeExample: "= Table.Distinct(Source, {\"Customer_ID\"})"
  },
  {
    question: "What does `Table.Buffer` do, and why does it optimize local M merges?",
    shortAnswer: "It loads the entire table into local RAM memory and isolates it from disk, preventing repeated slow re-reads during multi-row lookups or merges.",
    explanation: "In-memory caching acceleration.",
    hint: "Loads table into RAM to eliminate repeated disk/network reads.",
    level: "expert",
    codeExample: "BufferedDim = Table.Buffer(DimCustomers)"
  },
  {
    question: "What does `Table.Combine` do in M code?",
    shortAnswer: "It performs a vertical union (stacking) of multiple tables into a single consolidated table, aligning matching column headers automatically.",
    explanation: "Append / Union engine in M.",
    hint: "Stacks multiple tables vertically into one (Append).",
    level: "basic",
    codeExample: "= Table.Combine({Table_Jan, Table_Feb, Table_Mar})"
  },
  {
    question: "What does `List.Dates` do in M code?",
    shortAnswer: "It generates a continuous sequential list of dates starting from a start date, for a specified count of days, incrementing by a duration.",
    explanation: "Standard Date Dimension calendar generator in M.",
    hint: "Generates a list of dates: List.Dates(Start, Count, Step).",
    level: "moderate",
    codeExample: "= List.Dates(#date(2026, 1, 1), 365, #duration(1, 0, 0, 0))"
  },
  {
    question: "How do you calculate the standard deviation of a numeric column in M?",
    shortAnswer: "Using `List.StandardDeviation(Table[NumericColumn])`.",
    explanation: "Statistical aggregation on column list.",
    hint: "List.StandardDeviation(Table[Col]).",
    level: "moderate",
    codeExample: "StdDev = List.StandardDeviation(FactSales[Amount])"
  },
  {
    question: "What does `Record.Combine` do when merging multiple records?",
    shortAnswer: "It merges a list of records into a single record from left to right; if duplicate field names exist, the rightmost record's value prevails.",
    explanation: "Multi-record merge utility.",
    hint: "Combines a list of records; rightmost overrides duplicate keys.",
    level: "moderate",
    codeExample: "= Record.Combine({DefaultConfig, BranchConfig, UserConfig})"
  },
  {
    question: "What does `Text.Select` do in M code?",
    shortAnswer: "It filters a text string to retain ONLY the characters present in a specified allowed character list (e.g. `Text.Select([Phone], {\"0\"..\"9\"})` strips all non-digits).",
    explanation: "Character whitelist sanitization utility.",
    hint: "Keeps only characters that match an allowed list (e.g. {\"0\"..\"9\"}).",
    level: "moderate",
    codeExample: "= Text.Select(\"Phone: +91-98300-12345\", {\"0\"..\"9\"}) // returns \"919830012345\""
  },
  {
    question: "What does `Text.Remove` do in M code?",
    shortAnswer: "It strips all characters from a text string that appear in a specified blacklist character list (e.g. `Text.Remove([Amt], {\"₹\", \",\", \" \"})`).",
    explanation: "Character blacklist removal utility.",
    hint: "Removes specific blacklisted characters from a string.",
    level: "basic",
    codeExample: "= Text.Remove(\"₹ 45,000.00\", {\"₹\", \",\", \" \"}) // returns \"45000.00\""
  },
  {
    question: "What is the difference between `Table.RenameColumns` and `Table.PrefixColumns`?",
    shortAnswer: "`Table.RenameColumns` renames specific pairs of columns explicitly; `Table.PrefixColumns` automatically adds a prefix string to all columns in a table.",
    explanation: "Targeted rename vs bulk namespace prefixing.",
    hint: "RenameColumns takes pairs; PrefixColumns adds prefix to all columns.",
    level: "moderate",
    codeExample: "Table.RenameColumns(T, {{\"Old\", \"New\"}})\nTable.PrefixColumns(T, \"Dim_\")"
  },
  {
    question: "How do you reverse the order of elements in an M List?",
    shortAnswer: "Using `List.Reverse(TargetList)`.",
    explanation: "Reverses list item sequence.",
    hint: "List.Reverse(List).",
    level: "basic",
    codeExample: "= List.Reverse({1, 2, 3}) // returns {3, 2, 1}"
  },
  {
    question: "How do you sort an M Table by multiple columns with mixed directions (e.g. Branch ASC, Amount DESC)?",
    shortAnswer: "Using `Table.Sort(Source, {{\"Branch\", Order.Ascending}, {\"Amount\", Order.Descending}})`.",
    explanation: "Multi-column sorting with explicit ordering enums.",
    hint: "Table.Sort(Table, {{Col1, Order.Ascending}, {Col2, Order.Descending}}).",
    level: "moderate",
    codeExample: "= Table.Sort(Source, {{\"Branch\", Order.Ascending}, {\"Amount\", Order.Descending}})"
  },
  {
    question: "What does `Table.ReplaceValue` do in M code?",
    shortAnswer: "It replaces occurrences of a value across specified columns using a replacer function (e.g. `Replacer.ReplaceText` or `Replacer.ReplaceValue`).",
    explanation: "Bulk string and value replacement utility.",
    hint: "Table.ReplaceValue(Table, OldVal, NewVal, ReplacerFunc, Columns).",
    level: "moderate",
    codeExample: "= Table.ReplaceValue(Source, null, 0, Replacer.ReplaceValue, {\"Amount\"})"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for M Standard Library mastery?",
    shortAnswer: "Know your namespaces (`Table.*` for grids, `List.*` for collections, `Record.*` for single tuples, `Text.*` for sanitization)! Never reinvent logic that already exists in the standard library: use `List.Generate` for loops, `Text.Select` for phone/digit stripping, `Record.FieldOrDefault` for defensive lookups, and `Table.Buffer` for in-memory acceleration!",
    explanation: "The M Standard Library contains hundreds of optimized primitives for high-performance ETL!",
    hint: "Namespace Fluency + Higher-Order Lambdas + Defensive Defaults = Production-Grade M Code!",
    level: "expert",
    codeExample: "Rule: Table.Buffer + List.Generate + Text.Select + Record.FieldOrDefault = Elite M Mastery!"
  }
];

export default questions;
