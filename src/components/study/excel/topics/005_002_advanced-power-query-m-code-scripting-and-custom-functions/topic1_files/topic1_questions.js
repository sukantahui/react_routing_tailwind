// topic1_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 1
// Topic: Understanding M Data Types: Primitive types, Lists {...}, Records [...], and Tables #table(...)
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What are the two major categories of data types in the Power Query M language?",
    shortAnswer: "Primitive (Scalar) data types (e.g. number, text, date, logical, null) and Structured (Container) data types (List, Record, Table, Function).",
    explanation: "Primitive types represent atomic values, while structured types encapsulate complex collections.",
    hint: "Primitive (scalar) vs Structured (container).",
    level: "basic",
    codeExample: "Primitives: 100, \"Text\" | Structured: {1, 2}, [A=1], #table(...)"
  },
  {
    question: "How is a List literal defined in M code?",
    shortAnswer: "Enclosed in curly braces `{...}`, separated by commas (e.g. `{1, 2, 3, \"Barrackpore\", null}`).",
    explanation: "Lists can contain heterogeneous data types and are zero-indexed.",
    hint: "Curly braces { ... }.",
    level: "basic",
    codeExample: "MyList = {1, 2, 3, \"BKP\", #date(2026, 1, 1)}"
  },
  {
    question: "How is a Record literal defined in M code?",
    shortAnswer: "Enclosed in square brackets `[...]`, containing key-value assignments (e.g. `[ID = 101, Name = \"Swadeep\", City = \"Barrackpore\"]`).",
    explanation: "Records represent a single row tuple or associative dictionary.",
    hint: "Square brackets [ ... ] with Key = Value pairs.",
    level: "basic",
    codeExample: "MyRecord = [ID = 101, Name = \"Swadeep\", Amount = 45000]"
  },
  {
    question: "What is the M literal syntax to construct an in-memory Table directly?",
    shortAnswer: "`#table(ColumnNamesList, RowsListOfLists)` (e.g. `#table({\"ID\", \"Name\"}, {{1, \"Swadeep\"}, {2, \"Tuhina\"}})`).",
    explanation: "`#table` allows inline mock table definition without external files.",
    hint: "#table(ColumnsList, RowsListOfLists).",
    level: "moderate",
    codeExample: "= #table({\"ID\", \"Name\", \"City\"}, {{101, \"Swadeep\", \"BKP\"}, {102, \"Tuhina\", \"SHYAM\"}})"
  },
  {
    question: "How do you specify explicit data types when creating a table with `#table`?",
    shortAnswer: "Pass a typed table type definition as the first argument: `#table(type table [ID = Int64.Type, Amount = number], {{1, 500.50}})`.",
    explanation: "Enforces typed column schemas upon instantiation.",
    hint: "#table(type table [Col1 = type, Col2 = type], Rows).",
    level: "expert",
    codeExample: "= #table(type table [ID = Int64.Type, Name = text, Amount = number], {{1, \"Item\", 99.5}})"
  },
  {
    question: "What index numbering system does Power Query M use for Lists and Tables?",
    shortAnswer: "Zero-based indexing (the first element is index `0`, second is index `1`).",
    explanation: "Zero-based indexing is consistent across all M collections.",
    hint: "0-based indexing (first item is index 0).",
    level: "basic",
    codeExample: "FirstItem = MyList{0}"
  },
  {
    question: "How do you generate a sequential numeric list from 1 to 100 in M?",
    shortAnswer: "Using the range generator syntax: `{1..100}`.",
    explanation: "M evaluates `..` as a continuous sequence generator for numbers and characters.",
    hint: "Range syntax: {1..100}.",
    level: "basic",
    codeExample: "NumbersList = {1..100}"
  },
  {
    question: "How do you generate a sequence of lowercase letters from 'a' to 'z' in M?",
    shortAnswer: "Using the character range syntax: `{\"a\"..\"z\"}`.",
    explanation: "Character sequences are supported via range operator.",
    hint: "Character range: {\"a\"..\"z\"}.",
    level: "moderate",
    codeExample: "AlphaList = {\"a\"..\"z\"}"
  },
  {
    question: "How do you access a specific field value from an M Record?",
    shortAnswer: "Using square bracket field notation: `MyRecord[FieldName]`.",
    explanation: "Returns the field value directly.",
    hint: "Record[FieldName].",
    level: "basic",
    codeExample: "ClientName = CustomerRecord[Name]"
  },
  {
    question: "What happens if you attempt to access a non-existent field in a Record using `MyRecord[NonExistent]`?",
    shortAnswer: "Power Query throws an error: *'The field [NonExistent] of the record wasn't found'*; you can use `Record.FieldOrDefault(MyRecord, \"Field\", null)` to avoid crashes.",
    explanation: "Field access is strictly validated unless handled.",
    hint: "Throws 'field wasn't found' error unless handled.",
    level: "moderate",
    codeExample: "SafeAccess = Record.FieldOrDefault(MyRec, \"MissingField\", \"DefaultValue\")"
  },
  {
    question: "How do you extract an entire single column from a Table as an M List?",
    shortAnswer: "Using column projection syntax: `SourceTable[ColumnName]`.",
    explanation: "Projects a column into a standalone 1D List.",
    hint: "TableName[ColumnName] returns a List.",
    level: "basic",
    codeExample: "AmountsList = FactSales[Amount]"
  },
  {
    question: "How do you extract a single row from a Table as an M Record?",
    shortAnswer: "Using row-index notation: `SourceTable{RowIndex}` (e.g. `FactSales{0}` for the 1st row).",
    explanation: "Returns the row tuple as an M Record.",
    hint: "TableName{0} returns the first row as a Record.",
    level: "basic",
    codeExample: "FirstRow = FactSales{0}"
  },
  {
    question: "How do you extract a single cell scalar value from a Table?",
    shortAnswer: "By combining row index and column field accessors: `SourceTable{RowIndex}[ColumnName]` (e.g. `FactSales{0}[Amount]`).",
    explanation: "Direct coordinate lookup in 2D matrix.",
    hint: "TableName{RowIndex}[ColumnName].",
    level: "basic",
    codeExample: "FirstCustomer = FactSales{0}[Customer_Name]"
  },
  {
    question: "What is the difference between `Table[Column]` and `Table[[Column]]` in M?",
    shortAnswer: "`Table[Column]` extracts the column as a 1D **List**; `Table[[Column]]` returns a 1-column **Table** containing only that selected column.",
    explanation: "Single bracket = List projection; Double bracket = Table column projection.",
    hint: "Single bracket = List; Double bracket = 1-column Table.",
    level: "expert",
    codeExample: "ListOut = Tbl[Amt] // List\nTableOut = Tbl[[Amt]] // Table"
  },
  {
    question: "What operator is used to merge two Records together in M?",
    shortAnswer: "The ampersand operator `&` (e.g. `[A = 1] & [B = 2]` evaluates to `[A = 1, B = 2]`).",
    explanation: "Overwrites duplicate keys from the right record.",
    hint: "Ampersand (&) operator merges records.",
    level: "moderate",
    codeExample: "MergedRecord = [ID = 101, Name = \"Swadeep\"] & [City = \"BKP\", Status = \"Active\"]"
  },
  {
    question: "If two records merged with `&` contain the same field name, which value takes precedence?",
    shortAnswer: "The right-hand record's value overrides the left-hand record's value.",
    explanation: "Right precedence in associative record combination.",
    hint: "The right-side record value overwrites the left.",
    level: "advanced",
    codeExample: "[A = 10, B = 20] & [B = 99] == [A = 10, B = 99]"
  },
  {
    question: "What operator is used to concatenate two Lists together in M?",
    shortAnswer: "The ampersand operator `&` (e.g. `{1, 2} & {3, 4}` evaluates to `{1, 2, 3, 4}`).",
    explanation: "Appends items sequentially into a unified list.",
    hint: "Ampersand (&) operator concatenates lists.",
    level: "basic",
    codeExample: "AllBranches = {\"BKP\", \"SHYAM\"} & {\"ICH\", \"NAI\"}"
  },
  {
    question: "How do you test if a value is of a specific type in M?",
    shortAnswer: "Using the `is` operator (e.g. `Value is number` evaluates to `true` if Value is numeric).",
    explanation: "Runtime type introspection operator.",
    hint: "The 'is' operator (e.g. X is text).",
    level: "moderate",
    codeExample: "IsNumeric = 45000 is number // returns true"
  },
  {
    question: "What does the `as` operator do in M code?",
    shortAnswer: "It performs type assertion and type casting (e.g. `x as text`), ensuring the value conforms to the specified type or raising an error if incompatible.",
    explanation: "Asserts type conformity in signatures and expressions.",
    hint: "Type assertion / casting operator (e.g. x as text).",
    level: "moderate",
    codeExample: "(x as number, y as text) as table => ..."
  },
  {
    question: "What is the `type any` data type in M?",
    shortAnswer: "A universal wildcard type that can hold any primitive or structured data type without type enforcement.",
    explanation: "Default type when no specific type constraint is declared.",
    hint: "Wildcard type accepting all data types.",
    level: "basic",
    codeExample: "DynamicVal as any"
  },
  {
    question: "What is the difference between `type date` and `type datetime` in M?",
    shortAnswer: "`type date` holds strictly calendar date information (`#date(2026, 8, 27)`), whereas `type datetime` includes timestamp hours, minutes, and seconds (`#datetime(2026, 8, 27, 10, 30, 0)`).",
    explanation: "Date vs DateTime structural components.",
    hint: "date is date-only; datetime includes hours, minutes, seconds.",
    level: "basic",
    codeExample: "#date(2026, 1, 1) vs #datetime(2026, 1, 1, 14, 30, 0)"
  },
  {
    question: "How do you define a duration literal representing 2 days, 4 hours, and 30 minutes in M?",
    shortAnswer: "Using the duration literal constructor: `#duration(2, 4, 30, 0)` (Days, Hours, Minutes, Seconds).",
    explanation: "Standard temporal span constructor.",
    hint: "#duration(Days, Hours, Minutes, Seconds).",
    level: "moderate",
    codeExample: "SLA_Time = #duration(2, 4, 30, 0)"
  },
  {
    question: "How do you convert an M List into a Table?",
    shortAnswer: "Using `Table.FromList(MyList, Splitter.SplitByNothing(), {\"Column_Name\"}, null, ExtraValues.Error)`.",
    explanation: "Converts 1D list into a structured tabular column.",
    hint: "Table.FromList(MyList, ...).",
    level: "moderate",
    codeExample: "TableOut = Table.FromList({\"BKP\", \"SHYAM\", \"ICH\"}, Splitter.SplitByNothing(), {\"Branch\"})"
  },
  {
    question: "How do you convert an M Table into a List of Records?",
    shortAnswer: "Using `Table.ToRecords(MyTable)`.",
    explanation: "Transforms table rows into individual associative records for iterative processing.",
    hint: "Table.ToRecords(MyTable).",
    level: "moderate",
    codeExample: "RecordList = Table.ToRecords(FactSales)"
  },
  {
    question: "How do you convert an M Record into a 2-column Key-Value Table?",
    shortAnswer: "Using `Record.ToTable(MyRecord)`.",
    explanation: "Produces a table with 'Name' and 'Value' columns.",
    hint: "Record.ToTable(MyRecord).",
    level: "moderate",
    codeExample: "ConfigTable = Record.ToTable([TaxRate = 0.18, Currency = \"INR\", Branch = \"BKP\"])"
  },
  {
    question: "What function returns the runtime data type of any variable in M?",
    shortAnswer: "`Value.Type(MyVariable)`.",
    explanation: "Returns the Type object of the inspected value.",
    hint: "Value.Type(Variable).",
    level: "advanced",
    codeExample: "VarType = Value.Type(45000) // returns type number"
  },
  {
    question: "What is a `null` value in M, and how does it behave in arithmetic operations?",
    shortAnswer: "`null` represents the absence of a value; any arithmetic operation involving `null` (e.g. `5 + null`) evaluates to `null` rather than zero or an error.",
    explanation: "Three-valued logic propagation in M arithmetic.",
    hint: "Absence of value; arithmetic with null returns null.",
    level: "basic",
    codeExample: "5 + null == null"
  },
  {
    question: "How do you check if a field in a record is null or missing before performing math?",
    shortAnswer: "Using `if [Amount] = null then 0 else [Amount]` or `[Amount] ?? 0` (coalesce operator in modern M).",
    explanation: "Prevents null propagation in calculated columns.",
    hint: "if [Amt] = null then 0 else [Amt] or [Amt] ?? 0.",
    level: "moderate",
    codeExample: "SafeAmt = [Amount] ?? 0"
  },
  {
    question: "Can an M List contain nested Tables and other Lists?",
    shortAnswer: "Yes; M is a fully generic functional language where Lists and Records can contain arbitrarily nested Tables, Lists, and Records.",
    explanation: "Enables multi-tiered hierarchical data structures.",
    hint: "Yes; supports arbitrarily deep nested structures.",
    level: "expert",
    codeExample: "NestedList = {100, {1, 2, 3}, [A = 10], #table({\"X\"}, {{1}})}"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for M Data Types?",
    shortAnswer: "Master the 3 core containers: Lists `{...}` for 1D arrays, Records `[...]` for 1-row associative tuples, and Tables `#table(...)` for 2D grids! Understand zero-based accessors (`{0}` for rows, `[Col]` for fields, `{0}[Col]` for cells), and always enforce explicit data types to prevent silent type-mismatch join failures and calculation corruptions!",
    explanation: "Fluent manipulation of Lists, Records, and Tables is the foundation of high-level M programming!",
    hint: "Lists {...} + Records [...] + Tables #table(...) + Zero-Based Accessors = Flawless ETL Architecture!",
    level: "expert",
    codeExample: "Rule: List = {1..5}, Record = [A=1], Table = #table({\"A\"}, {{1}}), Cell = Table{0}[A]!"
  }
];

export default questions;
