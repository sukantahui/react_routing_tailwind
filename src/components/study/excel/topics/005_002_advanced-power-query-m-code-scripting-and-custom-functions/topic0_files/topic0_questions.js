// topic0_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 0
// Topic: Introduction to the Power Query M Formula Language: Syntax, Case sensitivity, and Let...In blocks
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the official name of the formula language behind Power Query?",
    shortAnswer: "Power Query M Formula Language (informally called 'M', standing for 'Data Mashup').",
    explanation: "M is a functional, case-sensitive, declarative data transformation language.",
    hint: "Official name is Power Query M Formula Language.",
    level: "basic",
    codeExample: "let Source = Csv.Document(...) in Source"
  },
  {
    question: "Is the M formula language case-sensitive?",
    shortAnswer: "Yes; M is strictly case-sensitive for all function names, keywords, variable identifiers, and column references.",
    explanation: "Typing `table.selectrows` instead of `Table.SelectRows` throws an immediate unrecognized identifier error.",
    hint: "Yes, strictly case-sensitive everywhere in M.",
    level: "basic",
    codeExample: "Table.SelectRows != table.selectrows"
  },
  {
    question: "What is the fundamental structure of an M query block?",
    shortAnswer: "A `let...in` block, where `let` defines intermediate step variables and `in` specifies the final evaluated output expression.",
    explanation: "`let` block holds immutable step bindings, `in` returns the output.",
    hint: "A let ... in block.",
    level: "basic",
    codeExample: "let\n  Source = Csv.Document(File.Contents(\"C:\\Data.csv\")),\n  Cleaned = Table.Distinct(Source)\nin\n  Cleaned"
  },
  {
    question: "Why are step identifiers often wrapped in quotes with a hash sign (e.g. `#'Changed Type'`)?",
    shortAnswer: "The `#'...'` syntax (quoted identifier) is required whenever a variable name contains spaces, special characters, or starts with a number.",
    explanation: "Standard M token escape syntax for multi-word step names.",
    hint: "Enables variable names with spaces or special characters.",
    level: "basic",
    codeExample: "#\"Changed Type with Locale\""
  },
  {
    question: "What evaluation model does Power Query M use: eager or lazy evaluation?",
    shortAnswer: "Lazy evaluation (call-by-need); M only calculates the steps and columns strictly required to produce the final `in` return expression.",
    explanation: "Unreferenced variables inside the `let` block are never executed by the Mashup engine.",
    hint: "Lazy evaluation (only evaluates what is needed for the final return).",
    level: "moderate",
    codeExample: "Lazy Execution: Steps not feeding into 'in' are skipped"
  },
  {
    question: "Are variables in Power Query M mutable or immutable?",
    shortAnswer: "Immutable; once a variable/step identifier is bound to a value or table in the `let` block, it cannot be modified or overwritten.",
    explanation: "Transformations create brand-new derivative objects referencing prior steps.",
    hint: "Immutable; variables cannot change value once bound.",
    level: "expert",
    codeExample: "Immutable Functional Paradigm"
  },
  {
    question: "How do you open the M code script window for any query in Power Query Editor?",
    shortAnswer: "Home Tab (or View Tab) &rarr; Click 'Advanced Editor' (or press Alt + H + V + A).",
    explanation: "Opens the full raw M script editor window.",
    hint: "Home Tab &rarr; Advanced Editor.",
    level: "basic",
    codeExample: "Home &rarr; Advanced Editor"
  },
  {
    question: "How do single-line and multi-line comments work in M code?",
    shortAnswer: "Single-line comments use `// comment`, and multi-line comments use `/* comment */` (identical to C/C++/JavaScript).",
    explanation: "Standard C-style comment syntax.",
    hint: "// for single-line and /* ... */ for multi-line.",
    level: "basic",
    codeExample: "// Single line\n/* Multi \n   line */"
  },
  {
    question: "What happens if you omit the trailing comma between step variables in a `let` block?",
    shortAnswer: "Power Query displays a syntax error: *'Token Comma expected'* or *'Token Identifier expected'*, preventing query execution.",
    explanation: "Every step in the `let` block except the very last step must terminate with a comma.",
    hint: "Syntax error: commas are required between all step bindings except the last.",
    level: "basic",
    codeExample: "Step1 = ..., \nStep2 = ...  // No comma on last step before 'in'"
  },
  {
    question: "What does the formula bar display when you select an Applied Step in the Power Query UI?",
    shortAnswer: "It displays the exact M formula corresponding to that individual step, referencing the previous step variable as its first input argument.",
    explanation: "Every Applied Step is a single M function call chaining the previous step.",
    hint: "Displays the M expression for the selected step.",
    level: "basic",
    codeExample: "= Table.PromoteHeaders(Source, [PromoteAllScalars=true])"
  },
  {
    question: "Can an M query return something other than a Table from the `in` block?",
    shortAnswer: "Yes; an M query can return any M data type, including a scalar Number, Text string, List `{...}`, Record `[...]`, or a custom Function.",
    explanation: "Power Query supports scalar and functional returns.",
    hint: "Yes; can return numbers, text, lists, records, or functions.",
    level: "moderate",
    codeExample: "in List.Sum(Source[Sales]) // Returns scalar number"
  },
  {
    question: "How do you reference a column from a previous table step as a List?",
    shortAnswer: "Using square bracket column notation: `PreviousStepName[ColumnName]`.",
    explanation: "Extracts a single column as a native M List.",
    hint: "StepName[ColumnName].",
    level: "moderate",
    codeExample: "SalesList = #\"Changed Type\"[Revenue]"
  },
  {
    question: "How do you access a specific row from a table step as a Record?",
    shortAnswer: "Using curly brace zero-based row index notation: `PreviousStepName{rowIndex}` (e.g. `Source{0}` for the first row).",
    explanation: "Returns the row as an M Record structure.",
    hint: "StepName{0} accesses row index 0 as a record.",
    level: "moderate",
    codeExample: "FirstRowRecord = Source{0}"
  },
  {
    question: "How do you access a specific cell value directly from a table step?",
    shortAnswer: "Combining row and column accessors: `PreviousStepName{rowIndex}[ColumnName]` (e.g. `Source{0}[Total]`).",
    explanation: "Zero-based row lookup followed by field selection.",
    hint: "StepName{rowIndex}[ColumnName].",
    level: "moderate",
    codeExample: "FirstCell = Source{0}[Invoice_ID]"
  },
  {
    question: "What is the keyword `each` in Power Query M shorthand for?",
    shortAnswer: "`each` is syntactic sugar for a single-argument lambda function `(_) => ...`, where `_` represents the current record or item.",
    explanation: "Shorthand function declaration in row-by-row transformations.",
    hint: "Syntactic sugar for (_) => ... (evaluates current row context).",
    level: "expert",
    codeExample: "each [Amount] * 1.18 &equiv; (_) => _[Amount] * 1.18"
  },
  {
    question: "What is the purpose of the underscore `_` identifier in M code?",
    shortAnswer: "The underscore `_` represents the default implicit parameter in `each` expressions (the current row record or list item).",
    explanation: "Refers to the entire current tuple in context.",
    hint: "Represents the current row/item in 'each' expressions.",
    level: "expert",
    codeExample: "List.Transform({1, 2, 3}, each _ * 10)"
  },
  {
    question: "Can steps in a `let` block be executed out of written order?",
    shortAnswer: "Yes; the M engine executes steps based on dependency graphs (topological sort), not physical line order in the script.",
    explanation: "Declarative evaluation resolves dependencies dynamically.",
    hint: "Yes; evaluation order follows data dependency, not line order.",
    level: "expert",
    codeExample: "Dependency graph dictates execution sequence"
  },
  {
    question: "What happens if you reference a non-existent step name in an M formula?",
    shortAnswer: "Power Query raises a compilation error: *'The name [StepName] wasn't recognized. Make sure it's spelled correctly.'*",
    explanation: "M checks variable scope before execution.",
    hint: "Name wasn't recognized compilation error.",
    level: "basic",
    codeExample: "Error: The name 'Sourc' wasn't recognized"
  },
  {
    question: "How can you reorder Applied Steps safely in M code without breaking the query?",
    shortAnswer: "Ensure that each subsequent step's input argument references the updated previous step identifier in the dependency chain.",
    explanation: "Chaining integrity must be maintained across step variables.",
    hint: "Update variable input references so step chaining remains intact.",
    level: "moderate",
    codeExample: "StepB = Func(StepA), StepC = Func(StepB)"
  },
  {
    question: "What is the difference between `#\"Step Name\"` and `\"Step Name\"` in M?",
    shortAnswer: "`#\"Step Name\"` is an identifier representing a step variable/table, whereas `\"Step Name\"` is a literal Text string value.",
    explanation: "Hash quote designates an identifier; standard quotes designate text.",
    hint: "#\"...\" is a variable identifier; \"...\" is literal text string.",
    level: "moderate",
    codeExample: "#\"Source\" (Variable) vs \"Source\" (Text String)"
  },
  {
    question: "Can you create nested `let...in` blocks inside an M query?",
    shortAnswer: "Yes; M fully supports nested `let...in` expressions inside step calculations, custom functions, or column generator lambdas.",
    explanation: "Scoping allows localized variable isolation.",
    hint: "Yes; let...in blocks can be nested hierarchically.",
    level: "advanced",
    codeExample: "Calc = Table.AddColumn(Source, \"Tax\", each let rate = 0.18, net = [Amt] in net * rate)"
  },
  {
    question: "What is the scope of variables declared inside an inner nested `let` block?",
    shortAnswer: "Inner variables are local to that inner block and cannot be accessed outside by the parent `let` block.",
    explanation: "Lexical scoping rules apply.",
    hint: "Local to the inner block; invisible to outer parent blocks.",
    level: "advanced",
    codeExample: "Lexical Scoping: Inner variables are isolated"
  },
  {
    question: "How do you handle quotation marks inside literal text strings in M?",
    shortAnswer: "Double the quotation marks: `\"He said \"\"Hello\"\" to me\"`.",
    explanation: "Escapes quotes within text literals.",
    hint: "Double quotes: \"\" inside the text string.",
    level: "basic",
    codeExample: "TextWithQuotes = \"Customer said \"\"Urgent\"\" today\""
  },
  {
    question: "What M operator is used for text concatenation?",
    shortAnswer: "The ampersand operator `&`.",
    explanation: "`\"Barrackpore\" & \" \" & \"HQ\"` evaluates to `\"Barrackpore HQ\"`.",
    hint: "Ampersand (&) operator.",
    level: "basic",
    codeExample: "FullName = [First] & \" \" & [Last]"
  },
  {
    question: "Can the ampersand `&` operator be used to combine Lists and Records in M?",
    shortAnswer: "Yes; `{1, 2} & {3, 4}` concatenates lists into `{1, 2, 3, 4}`, and `[A=1] & [B=2]` merges records into `[A=1, B=2]`.",
    explanation: "The `&` operator is overloaded for Lists, Records, Tables, and Text.",
    hint: "Yes; & concatenates Lists, merges Records, and unions Tables.",
    level: "expert",
    codeExample: "{1, 2} & {3, 4} == {1, 2, 3, 4}"
  },
  {
    question: "How do you inspect the schema and data types of a table in M code?",
    shortAnswer: "Using the `Table.Schema(TargetTable)` function, which returns a detailed metadata table describing columns, data types, and nullability.",
    explanation: "Returns runtime table metadata.",
    hint: "Table.Schema(TargetTable).",
    level: "moderate",
    codeExample: "= Table.Schema(#\"Changed Type\")"
  },
  {
    question: "Why does editing M code directly in the Advanced Editor often succeed when the UI fails?",
    shortAnswer: "Because the Advanced Editor allows advanced scripting constructs (e.g. loops, nested records, parameter injections, and custom logic) that have no corresponding graphical UI ribbon buttons.",
    explanation: "UI is only a subset of the full M language capability.",
    hint: "Advanced Editor allows scripting features not exposed in graphical UI.",
    level: "basic",
    codeExample: "Advanced Editor = Full Programmatic Power"
  },
  {
    question: "What is the return value of an M expression if a step causes a fatal runtime crash without error handling?",
    shortAnswer: "It returns an unhandled Error Record that bubbles up and prevents the query from loading into Excel or the Data Model.",
    explanation: "Errors must be caught using `try...otherwise` to prevent pipeline halting.",
    hint: "Unhandled Error record that stops query execution.",
    level: "moderate",
    codeExample: "Error Record: [Reason, Message, Detail]"
  },
  {
    question: "How do you rename a step variable in the Advanced Editor without breaking subsequent steps?",
    shortAnswer: "Use Find & Replace (Ctrl + H) inside Advanced Editor to rename the definition and update all subsequent step input references accordingly.",
    explanation: "Maintains referential integrity across the pipeline.",
    hint: "Rename the step and update all subsequent references with Find & Replace.",
    level: "basic",
    codeExample: "Ctrl + H in Advanced Editor"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for M Code Scripting in Power Query?",
    shortAnswer: "Master the `let...in` dependency chain, treat data as immutable, and respect strict case sensitivity! Every Applied Step in the UI is just an M variable assignment; by understanding lazy evaluation, quoted identifiers (`#'...'`), and functional chaining in the Advanced Editor, you unlock 100% control over enterprise ETL pipelines that no graphical button can match!",
    explanation: "True Power Query mastery begins when you open Advanced Editor and write clean M code directly!",
    hint: "Case Sensitivity + let...in Chaining + Immutability + Lazy Evaluation = Ultra Expert M Mastery!",
    level: "expert",
    codeExample: "Rule: let Step1 = ..., Step2 = Transform(Step1) in Step2 // Clean, Case-Sensitive M Code!"
  }
];

export default questions;
