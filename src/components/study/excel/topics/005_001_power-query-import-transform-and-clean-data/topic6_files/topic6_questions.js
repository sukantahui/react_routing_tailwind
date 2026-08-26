// topic6_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 6
// Topic: Text transformations: Splitting columns, trimming, uppercase/lowercase, extracting delimiters
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of 'Split Column by Delimiter' in Power Query?",
    shortAnswer: "It divides a text column into multiple columns (or rows) whenever a specified character (e.g. comma, hyphen, space) is encountered.",
    explanation: "Generates `Table.SplitColumn` with `Splitter.SplitTextByDelimiter`.",
    hint: "Divides text into columns based on delimiter.",
    level: "basic",
    codeExample: "= Table.SplitColumn(Source, \"Code\", Splitter.SplitTextByDelimiter(\"-\", QuoteStyle.Csv), {\"Prefix\", \"ID\"})"
  },
  {
    question: "What are the 3 occurrence splitting options available when splitting by delimiter?",
    shortAnswer: "1. At the left-most delimiter, 2. At the right-most delimiter, and 3. At each occurrence of the delimiter.",
    explanation: "Allows precise isolation of leading prefixes or trailing file extensions.",
    hint: "Left-most, Right-most, Each occurrence.",
    level: "basic",
    codeExample: "Splitter.SplitTextByDelimiter(\"-\", QuoteStyle.None) &rarr; Left-most delimiter"
  },
  {
    question: "What is the difference between splitting into 'Columns' vs splitting into 'Rows'?",
    shortAnswer: "Splitting into Columns creates new horizontal fields across the grid; splitting into Rows unnests comma-separated lists vertically into multiple rows (relational normalization).",
    explanation: "Splitting into rows normalizes multi-value cells into 1NF tabular format.",
    hint: "Columns: horizontal fields; Rows: unnested vertical rows.",
    level: "moderate",
    codeExample: "Advanced Options &rarr; Split into: Rows (Table.ExpandListColumn)"
  },
  {
    question: "What is the difference between `Text.Trim` and `Text.Clean` in Power Query M?",
    shortAnswer: "`Text.Trim` removes leading and trailing whitespace; `Text.Clean` strips non-printable ASCII control characters (line breaks, carriage returns).",
    explanation: "Both should be combined for complete text sanitization.",
    hint: "Trim: leading/trailing spaces; Clean: non-printable control characters.",
    level: "basic",
    codeExample: "= Table.TransformColumns(Source, {{\"Name\", Text.Trim}, {\"Bio\", Text.Clean}})"
  },
  {
    question: "What M function converts a text column to Proper Case (Capitalize Each Word)?",
    shortAnswer: "`Text.Proper` (`= Table.TransformColumns(Source, {{\"Customer\", Text.Proper, type text}})`).",
    explanation: "Capitalizes the first letter of each word and lowercases the remainder.",
    hint: "Text.Proper.",
    level: "basic",
    codeExample: "= Table.TransformColumns(Source, {{\"Customer_Name\", Text.Proper, type text}})"
  },
  {
    question: "How do you split a column based on transition from non-digit to digit (e.g. `INV1042`)?",
    shortAnswer: "Transform Tab &rarr; Split Column &rarr; 'By Non-Digit to Digit' (`Splitter.SplitTextByCharacterTransition`).",
    explanation: "Splits automatically between alpha characters and numeric sequences.",
    hint: "Split Column &rarr; By Non-Digit to Digit.",
    level: "moderate",
    codeExample: "= Table.SplitColumn(Source, \"Code\", Splitter.SplitTextByCharacterTransition({\"a\"..\"z\", \"A\"..\"Z\"}, {\"0\"..\"9\"}))"
  },
  {
    question: "How do you split camelCase text (e.g. `firstName` &rarr; `first` and `Name`) in Power Query?",
    shortAnswer: "Split Column &rarr; 'By Lowercase to Uppercase' (`Splitter.SplitTextByCharacterTransition({\"a\"..\"z\"}, {\"A\"..\"Z\"})`).",
    explanation: "Splits precisely at the lower-to-upper character boundary.",
    hint: "Split Column &rarr; By Lowercase to Uppercase.",
    level: "moderate",
    codeExample: "= Table.SplitColumn(Source, \"FieldName\", Splitter.SplitTextByCharacterTransition({\"a\"..\"z\"}, {\"A\"..\"Z\"}))"
  },
  {
    question: "What M function extracts text before a specific delimiter?",
    shortAnswer: "`Text.BeforeDelimiter(Text, Delimiter, [Index])`.",
    explanation: "Isolates the prefix substring prior to the delimiter.",
    hint: "Text.BeforeDelimiter.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"User\", each Text.BeforeDelimiter([Email], \"@\"))"
  },
  {
    question: "What M function extracts text after a specific delimiter?",
    shortAnswer: "`Text.AfterDelimiter(Text, Delimiter, [Index])`.",
    explanation: "Isolates the suffix substring following the delimiter.",
    hint: "Text.AfterDelimiter.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"Domain\", each Text.AfterDelimiter([Email], \"@\"))"
  },
  {
    question: "How do you extract the file extension from a file path using `Text.AfterDelimiter`?",
    shortAnswer: "Pass index `[Index=0, FromEnd=true]` (or `Index=Order.Descending`) to find the last dot from the right.",
    explanation: "Guarantees extracting `.xlsx` even if file names contain dots (e.g. `report.v2.xlsx`).",
    hint: "Text.AfterDelimiter([Path], '.', {0, RelativePosition.FromEnd}).",
    level: "advanced",
    codeExample: "= Table.AddColumn(Source, \"Ext\", each Text.AfterDelimiter([Name], \".\", {0, RelativePosition.FromEnd}))"
  },
  {
    question: "What M function extracts text located between two different delimiters (e.g. inside parentheses)?",
    shortAnswer: "`Text.BetweenDelimiters(Text, StartDelimiter, EndDelimiter)`.",
    explanation: "Extracts values enclosed between opening and closing delimiters.",
    hint: "Text.BetweenDelimiters.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"Code\", each Text.BetweenDelimiters([Description], \"(\", \")\"))"
  },
  {
    question: "How do you merge (concatenate) two or more text columns together with a separator in Power Query?",
    shortAnswer: "Select multiple columns &rarr; Transform/Add Column &rarr; Merge Columns (`Table.CombineColumns` / `Text.Combine`).",
    explanation: "Combines fields using delimiters like space, comma, or hyphen.",
    hint: "Transform &rarr; Merge Columns (`Table.CombineColumns`).",
    level: "basic",
    codeExample: "= Table.CombineColumns(Source, {\"FirstName\", \"LastName\"}, Combiner.CombineTextByDelimiter(\" \", QuoteStyle.None), \"FullName\")"
  },
  {
    question: "How do you add a static prefix (e.g. 'INV-') to an existing numeric ID column?",
    shortAnswer: "Format &rarr; Add Prefix (`= Table.TransformColumns(Source, {{\"ID\", each \"INV-\" & Text.From(_), type text}})`).",
    explanation: "Prepends static string characters to column values.",
    hint: "Transform &rarr; Format &rarr; Add Prefix.",
    level: "basic",
    codeExample: "= Table.TransformColumns(Source, {{\"ID\", each \"INV-\" & Text.From(_), type text}})"
  },
  {
    question: "How do you add a static suffix (e.g. '@corp.in') to username columns?",
    shortAnswer: "Format &rarr; Add Suffix (`= Table.TransformColumns(Source, {{\"User\", each _ & \"@corp.in\", type text}})`).",
    explanation: "Appends static text to the end of column values.",
    hint: "Transform &rarr; Format &rarr; Add Suffix.",
    level: "basic",
    codeExample: "= Table.TransformColumns(Source, {{\"User\", each _ & \"@corp.in\", type text}})"
  },
  {
    question: "What M function extracts the first N characters from a text string?",
    shortAnswer: "`Text.Start(Text, Count)` (equivalent to Excel LEFT).",
    explanation: "Extracts leading characters from a text string.",
    hint: "Text.Start (Excel LEFT).",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"StateCode\", each Text.Start([GSTIN], 2))"
  },
  {
    question: "What M function extracts the last N characters from a text string?",
    shortAnswer: "`Text.End(Text, Count)` (equivalent to Excel RIGHT).",
    explanation: "Extracts trailing characters from the end of a string.",
    hint: "Text.End (Excel RIGHT).",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"Last4\", each Text.End([CardNumber], 4))"
  },
  {
    question: "What M function extracts a substring from the middle of a string based on start index and length?",
    shortAnswer: "`Text.Middle(Text, StartIndex, [Length])` (0-indexed; equivalent to Excel MID).",
    explanation: "Note that M is 0-indexed: index 0 is the first character.",
    hint: "Text.Middle (0-indexed; Excel MID).",
    level: "moderate",
    codeExample: "= Table.AddColumn(Source, \"PAN_PAN_Part\", each Text.Middle([GSTIN], 2, 10))"
  },
  {
    question: "How do you pad a numeric string with leading zeros (e.g. `42` &rarr; `00042`) in Power Query?",
    shortAnswer: "Use `Text.PadStart(Text.From([ID]), 5, \"0\")`.",
    explanation: "Standard function for fixed-width code padding.",
    hint: "Text.PadStart(text, totalLength, padChar).",
    level: "moderate",
    codeExample: "= Table.AddColumn(Source, \"PaddedID\", each Text.PadStart(Text.From([ID]), 6, \"0\"))"
  },
  {
    question: "How do you pad a string on the right with spaces for fixed-width text export?",
    shortAnswer: "Use `Text.PadEnd([Text], 20, \" \")`.",
    explanation: "Ensures column entries occupy exactly 20 characters.",
    hint: "Text.PadEnd(text, totalLength, ' ').",
    level: "moderate",
    codeExample: "= Table.AddColumn(Source, \"FixedWidth\", each Text.PadEnd([Name], 25, \" \"))"
  },
  {
    question: "What M function calculates the total character length of a text string?",
    shortAnswer: "`Text.Length(Text)` (equivalent to Excel LEN).",
    explanation: "Returns the integer character count of a text value.",
    hint: "Text.Length.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"CharCount\", each Text.Length([Remarks]))"
  },
  {
    question: "How do you remove all punctuation and special characters from a text string in Power Query?",
    shortAnswer: "Use `Text.Select([Text], {\"a\"..\"z\", \"A\"..\"Z\", \"0\"..\"9\", \" \"})`.",
    explanation: "`Text.Select` keeps ONLY characters present in the approved character list.",
    hint: "Text.Select([Text], {'a'..'z', 'A'..'Z', '0'..'9'}).",
    level: "advanced",
    codeExample: "= Table.AddColumn(Source, \"AlphanumericOnly\", each Text.Select([RawStr], {\"a\"..\"z\", \"A\"..\"Z\", \"0\"..\"9\", \" \"}))"
  },
  {
    question: "What is the inverse function of `Text.Select` in Power Query?",
    shortAnswer: "`Text.Remove([Text], CharactersToRemoveList)`.",
    explanation: "Strips specified blacklisted characters while retaining all others.",
    hint: "Text.Remove.",
    level: "advanced",
    codeExample: "= Table.AddColumn(Source, \"NoSymbols\", each Text.Remove([Phone], {\"-\", \"(\", \")\", \" \", \"+\"}))"
  },
  {
    question: "How do you split a column by fixed character positions (e.g. at position 2 and 12)?",
    shortAnswer: "Split Column &rarr; 'By Positions' &rarr; Enter comma-separated 0-indexed positions `0, 2, 12` (`Splitter.SplitTextByPositions`).",
    explanation: "Splits fixed-width mainframe records into relational columns.",
    hint: "Split Column &rarr; By Positions (0, 2, 12).",
    level: "moderate",
    codeExample: "= Table.SplitColumn(Source, \"RawRecord\", Splitter.SplitTextByPositions({0, 2, 12}), {\"State\", \"PAN\", \"Entity\"})"
  },
  {
    question: "How do you handle quotation marks around delimited fields (e.g. `\"Kolkata, West Bengal\"`) when splitting by comma?",
    shortAnswer: "Specify `QuoteStyle.Csv` in the `Splitter.SplitTextByDelimiter` options.",
    explanation: "Prevents commas inside quotes from triggering erroneous column splits.",
    hint: "Set QuoteStyle.Csv in split options.",
    level: "advanced",
    codeExample: "Splitter.SplitTextByDelimiter(\",\", QuoteStyle.Csv)"
  },
  {
    question: "How do you find the 0-indexed position of a character within a string in M?",
    shortAnswer: "Use `Text.PositionOf(Text, Substring, [Occurrence])` (equivalent to Excel FIND/SEARCH).",
    explanation: "Returns the 0-based integer position of the substring.",
    hint: "Text.PositionOf.",
    level: "moderate",
    codeExample: "= Table.AddColumn(Source, \"Pos\", each Text.PositionOf([Email], \"@\"))"
  },
  {
    question: "How do you convert all uppercase acronyms in a string while preserving mixed case names?",
    shortAnswer: "Use `Text.Upper` on specific extracted sub-tokens, or write a custom M word-transformer function.",
    explanation: "Enables granular token transformation.",
    hint: "Apply Text.Upper on extracted substrings.",
    level: "moderate",
    codeExample: "= Table.TransformColumns(Source, {{\"DeptCode\", Text.Upper}})"
  },
  {
    question: "How do you replace multiple different characters in one step (e.g. replace both `[` and `]` with empty strings)?",
    shortAnswer: "Use `Text.Remove([Text], {\"[\", \"]\"})` or chain two `Text.Replace` calls.",
    explanation: "`Text.Remove` is much faster and cleaner when stripping multiple characters.",
    hint: "Text.Remove([Text], {'[', ']'}) is faster than nested replaces.",
    level: "moderate",
    codeExample: "= Table.AddColumn(Source, \"CleanBracket\", each Text.Remove([RawText], {\"[\", \"]\"}))"
  },
  {
    question: "Why does `Text.Middle` in Power Query require 0 as the starting index for the first character, whereas Excel MID requires 1?",
    shortAnswer: "Because the M Formula Language adheres to modern 0-indexed programming language standards (like Python and C#), whereas Excel worksheet formulas use 1-based indexing.",
    explanation: "Always remember: index 0 is character 1 in M code!",
    hint: "M language is 0-indexed; index 0 = first character.",
    level: "basic",
    codeExample: "M Text.Middle(text, 0, 5) &equiv; Excel MID(text, 1, 5)"
  },
  {
    question: "How do you split a full name into First, Middle, and Last names when middle names may or may not exist?",
    shortAnswer: "Split by space into Columns, or split into Rows and use conditional indexing; or use `Text.BeforeDelimiter([Name], \" \")` for First Name and `Text.AfterDelimiter([Name], \" \", {0, RelativePosition.FromEnd})` for Last Name.",
    explanation: "Accurately extracts first and last names regardless of middle name presence.",
    hint: "Text.BeforeDelimiter(First Space) and Text.AfterDelimiter(Last Space).",
    level: "advanced",
    codeExample: "First: Text.BeforeDelimiter([Name], ' ') | Last: Text.AfterDelimiter([Name], ' ', {0, RelativePosition.FromEnd})"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Power Query Text Transformations?",
    shortAnswer: "Harness the power of declarative text engineering! Combine Text.Clean and Text.Trim before splitting, use 'Split into Rows' to normalize comma-separated lists into relational tabular data, leverage Text.BeforeDelimiter and Text.AfterDelimiter with reverse indexing ({0, RelativePosition.FromEnd}) for file paths, and remember that M is 0-indexed when working with Text.Middle!",
    explanation: "Mastering text transformations is the cornerstone of modern data cleansing!",
    hint: "Clean &rarr; Trim &rarr; Split to Rows (1NF Normalization) + 0-Indexed Text Engineering!",
    level: "expert",
    codeExample: "Rule: Text Hygiene &rarr; Clean + Trim &rarr; 1NF Split to Rows &rarr; Delimiter Slicing!"
  }
];

export default questions;
