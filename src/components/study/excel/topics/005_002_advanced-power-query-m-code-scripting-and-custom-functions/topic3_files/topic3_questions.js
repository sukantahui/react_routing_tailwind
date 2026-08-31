// topic3_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 3
// Topic: Writing custom M functions to automate repetitive transformations
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the basic syntax for declaring a custom function in Power Query M?",
    shortAnswer: "`(parameter1 as type, parameter2 as type) as returnType => FunctionBodyExpression`.",
    explanation: "Standard lambda arrow `=>` function declaration syntax.",
    hint: "(param as type) as returnType => ...",
    level: "basic",
    codeExample: "(x as number, y as number) as number => (x * 1.18) + y"
  },
  {
    question: "How do you declare a parameter as optional in a custom M function?",
    shortAnswer: "Prefix the parameter with the `optional` keyword: `(mandatoryVal as number, optional taxRate as nullable number) => ...`.",
    explanation: "If omitted by the caller, optional parameters evaluate to `null`.",
    hint: "Prefix parameter with 'optional' (e.g. optional rate as number).",
    level: "basic",
    codeExample: "(amt as number, optional rate as nullable number) => let r = rate ?? 0.18 in amt * (1 + r)"
  },
  {
    question: "How do you write a multi-step custom M function with intermediate variables?",
    shortAnswer: "Define a nested `let...in` block to the right of the lambda arrow `=>`.",
    explanation: "Permits complex multi-step data pipelines inside a reusable function.",
    hint: "(params) => let Step1 = ..., Step2 = ... in Step2.",
    level: "moderate",
    codeExample: "(raw as text) => let clean = Text.Trim(raw), upper = Text.Upper(clean) in upper"
  },
  {
    question: "How do you invoke a custom M function across an entire Table column?",
    shortAnswer: "Using `Table.AddColumn(Source, \"NewCol\", each fx_MyFunction([ExistingCol]), type number)` or via the UI 'Invoke Custom Function' button.",
    explanation: "Executes the function row-by-row passing each row's field as argument.",
    hint: "Table.AddColumn(Table, \"Col\", each fx_Name([Field]), type).",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"CleanAmount\", each fx_CleanCurrency([Raw_Text]), type number)"
  },
  {
    question: "How do you add rich user documentation (name, description, examples) to a custom M function?",
    shortAnswer: "By attaching a metadata record to the function's type declaration using `type function (...) as type meta [Documentation.Name = \"...\", Documentation.Description = \"...\"]`.",
    explanation: "Power Query renders this metadata in the graphical function invocation dialog.",
    hint: "type function (...) as type meta [Documentation.Name = \"...\"].",
    level: "expert",
    codeExample: "Value.ReplaceType(MyFunc, type function (x as number) as number meta [Documentation.Name = \"Calculate GST\"])"
  },
  {
    question: "What metadata tags are recognized by Power Query for custom function UI documentation?",
    shortAnswer: "`Documentation.Name`, `Documentation.Description`, `Documentation.LongDescription`, `Documentation.Category`, and `Documentation.Examples` (a list of records containing `[Description, Code, Result]`).",
    explanation: "Official Microsoft documentation metadata schema.",
    hint: "Documentation.Name, Documentation.Description, Documentation.Examples.",
    level: "expert",
    codeExample: "[Documentation.Name = \"fx_Tax\", Documentation.Description = \"Computes 18% GST\"]"
  },
  {
    question: "How do you create a recursive custom function in M that calls itself?",
    shortAnswer: "Prefix the function name with an at-symbol `@` inside its own body (e.g. `@fx_Factorial(n - 1)`).",
    explanation: "The `@` scoping operator allows referencing the function itself within its definition.",
    hint: "Use @FunctionName to reference the function recursively.",
    level: "expert",
    codeExample: "fx_Factorial = (n as number) as number => if n <= 1 then 1 else n * @fx_Factorial(n - 1)"
  },
  {
    question: "What is the naming convention for custom functions in enterprise Power Query solutions?",
    shortAnswer: "Prefixing function query names with `fx_` or `fn_` (e.g. `fx_CleanPAN`, `fn_ConvertCurrencyUSD`).",
    explanation: "Distinguishes callable functions from data tables in the Queries pane.",
    hint: "Prefix with fx_ or fn_ (e.g. fx_CleanCurrency).",
    level: "basic",
    codeExample: "fx_CleanAndConvert, fn_ParseInvoiceHeader"
  },
  {
    question: "What happens if a custom function encounters a fatal error for a single row in a table?",
    shortAnswer: "That specific cell displays `[Error]`, but subsequent rows continue processing unless the entire query is strictly forced to stop.",
    explanation: "Cell-level error isolation in tabular row-by-row iteration.",
    hint: "Cell shows [Error]; wrap function body in try...otherwise for safety.",
    level: "moderate",
    codeExample: "Cell returns Error Record: [Reason, Message]"
  },
  {
    question: "How do you protect a custom function from crashing on null inputs?",
    shortAnswer: "Declare the input as `nullable text` (or `nullable number`) and add a defensive check: `if rawInput = null then null else ...`.",
    explanation: "Explicit null handling guarantees bulletproof evaluation.",
    hint: "Use nullable types and check: if input = null then fallback.",
    level: "moderate",
    codeExample: "(input as nullable text) => if input = null then \"\" else Text.Trim(input)"
  },
  {
    question: "Can a custom M function return a Table instead of a scalar value?",
    shortAnswer: "Yes; a custom function can take parameters (e.g. a Branch Name or File Path) and return an entire transformed Table.",
    explanation: "Allows parameterized dynamic table generators and file extractors.",
    hint: "Yes; return type can be 'as table'.",
    level: "moderate",
    codeExample: "(filePath as text) as table => let src = Csv.Document(File.Contents(filePath)) in src"
  },
  {
    question: "How do you convert an existing Applied Steps query into a parameterized custom function in the UI?",
    shortAnswer: "In Queries pane → Right-click the query → Select 'Create Function...' → Enter function name and parameter mappings.",
    explanation: "UI shortcut to convert parameterized queries into functions.",
    hint: "Right-click query → Create Function...",
    level: "basic",
    codeExample: "Right-Click Query → Create Function..."
  },
  {
    question: "Can a custom function accept another function as an argument (Higher-Order Function)?",
    shortAnswer: "Yes; M functions are first-class citizens and can accept arguments of `type function`.",
    explanation: "Enables flexible functional composition and strategy patterns.",
    hint: "Yes; parameters can be 'as function'.",
    level: "expert",
    codeExample: "(data as table, transformer as function) => transformer(data)"
  },
  {
    question: "What is the performance benefit of wrapping lookup tables in `Table.Buffer` before passing them to custom functions?",
    shortAnswer: "It prevents the custom function from querying the disk or remote server repeatedly for every single row in the fact table, accelerating execution by 10x-50x.",
    explanation: "In-memory caching prevents N*M disk reads.",
    hint: "Caches lookup in RAM so function doesn't re-read disk on every row.",
    level: "expert",
    codeExample: "fx_Lookup = (id) => Table.SelectRows(Table.Buffer(DimTable), each [ID]=id)"
  },
  {
    question: "How do you test a custom function directly in the Power Query Editor UI?",
    shortAnswer: "Click on the function in the Queries pane → Fill in the input parameter boxes in the preview area → Click 'Invoke' to generate an invoked test query.",
    explanation: "Interactive UI parameter testing harness.",
    hint: "Select function in Queries pane → Enter parameters → Click Invoke.",
    level: "basic",
    codeExample: "UI Function Preview → Invoke Test"
  },
  {
    question: "How do you share custom M functions across multiple workbooks or Power BI files?",
    shortAnswer: "Save the raw M script in a shared text file, copy/paste via Advanced Editor, or host it in a Power BI Dataflow or custom M connector.",
    explanation: "Reusability strategies for enterprise teams.",
    hint: "Copy M code or centralize in Power BI Dataflows / Custom Connectors.",
    level: "moderate",
    codeExample: "Centralized M Script Library / Power BI Dataflows"
  },
  {
    question: "What is the difference between writing an inline lambda `each [Amount] * 1.18` vs a dedicated custom function?",
    shortAnswer: "An inline lambda is local to a single step; a dedicated custom function is globally reusable across dozens of queries and can contain multi-step logic and documentation.",
    explanation: "Local one-off calculation vs reusable modular enterprise component.",
    hint: "Inline lambda is local to 1 step; custom function is globally reusable across queries.",
    level: "basic",
    codeExample: "Inline: each [Amt]*0.18 vs Dedicated: fx_ComputeGST([Amt])"
  },
  {
    question: "How do you handle multiple return values from a custom M function?",
    shortAnswer: "Return an M Record `[Tax = val1, Net = val2, Status = val3]` or a List `{val1, val2}`.",
    explanation: "Encapsulates multiple outputs in a single structured container.",
    hint: "Return an M Record [Field1 = Val1, Field2 = Val2].",
    level: "moderate",
    codeExample: "(gross as number) as record => [Gross = gross, GST = gross * 0.18, Net = gross * 1.18]"
  },
  {
    question: "How do you expand a custom function that returns a Record across table columns?",
    shortAnswer: "Invoke the function into a new column → Click the column header Expand icon → Select desired fields to project into individual columns.",
    explanation: "Standard record expansion workflow.",
    hint: "Invoke function → Click Expand icon on the generated Record column.",
    level: "basic",
    codeExample: "= Table.ExpandRecordColumn(Step, \"CalculatedRecord\", {\"GST\", \"Net\"})"
  },
  {
    question: "What is a closure in Power Query M custom functions?",
    shortAnswer: "A function that captures and retains access to variables declared in its enclosing parent `let` block environment.",
    explanation: "Lexical scoping enables state capture.",
    hint: "Function capturing variables from outer let block scope.",
    level: "expert",
    codeExample: "let rate = 0.18, fx = (x) => x * rate in fx(100) // rate is closed over"
  },
  {
    question: "How do you pass a variable number of arguments to a custom M function?",
    shortAnswer: "Pass a single List argument containing the values: `(items as list) as number => List.Sum(items)`.",
    explanation: "List parameters accommodate arbitrary argument counts.",
    hint: "Pass arguments as a List (e.g. items as list).",
    level: "moderate",
    codeExample: "(values as list) as number => List.Average(values)"
  },
  {
    question: "Why should you avoid making external `Web.Contents` calls inside row-by-row custom functions without buffering?",
    shortAnswer: "Because Power Query will fire a separate HTTP request for every single row in the table, triggering severe rate limits and massive network slowdowns.",
    explanation: "Row-by-row API calls cause O(N) network latency.",
    hint: "Fires HTTP request for every row; causes rate limits and severe network lag.",
    level: "expert",
    codeExample: "Warning: Never call Web.Contents inside Table.AddColumn without batching!"
  },
  {
    question: "How do you enforce return type safety on custom functions in M?",
    shortAnswer: "Declare the return type after parameter definitions: `(x as number) as text => Text.From(x)`.",
    explanation: "Guarantees return type conformity or throws compilation error.",
    hint: "Declare 'as returnType' after parameter list.",
    level: "basic",
    codeExample: "(x as number, y as number) as number => x + y"
  },
  {
    question: "How do you debug an error inside a multi-step custom function?",
    shortAnswer: "Change the final `in` return clause of the function to return the specific intermediate step variable you wish to inspect.",
    explanation: "Standard step-by-step diagnostic technique.",
    hint: "Change the 'in' return to the intermediate step variable being tested.",
    level: "moderate",
    codeExample: "in DiagnosticStep // Inspect intermediate result"
  },
  {
    question: "Can a custom M function be parameterized with an Excel Workbook object?",
    shortAnswer: "Yes; functions can accept `workbook as binary` or `sourceTable as table` as input arguments.",
    explanation: "Supports generic multi-workbook transformation templates.",
    hint: "Yes; can accept binary files or tables as parameters.",
    level: "moderate",
    codeExample: "(fileBinary as binary) as table => Excel.Workbook(fileBinary)"
  },
  {
    question: "What is the impact of custom M functions on SQL Query Folding?",
    shortAnswer: "Custom M functions cannot be folded into backend SQL queries; applying a custom function on a column forces Power Query to download raw data and execute locally in RAM.",
    explanation: "Breaks Query Folding at the step where custom M is introduced.",
    hint: "Breaks Query Folding; forces processing to local Mashup engine in RAM.",
    level: "advanced",
    codeExample: "Custom M Function = Local Mashup Processing"
  },
  {
    question: "How do you handle string parsing in custom functions when date formats vary (e.g. DD/MM/YYYY vs MM/DD/YYYY)?",
    shortAnswer: "Use `Date.FromText(rawText, [Culture = \"en-IN\"])` inside the function to enforce specific regional parsing rules.",
    explanation: "Culture parameter eliminates ambiguous date conversions.",
    hint: "Use Date.FromText(rawText, [Culture = \"en-IN\"]).",
    level: "moderate",
    codeExample: "Date.FromText(dateStr, [Culture = \"en-IN\"])"
  },
  {
    question: "What is the purpose of `Value.ReplaceType` in custom function authoring?",
    shortAnswer: "It replaces the function's internal type definition with an enriched typed metadata schema, enabling custom documentation and parameter drop-downs in the UI.",
    explanation: "Associates documentation metadata with executable function.",
    hint: "Attaches enriched metadata and documentation schema to the function.",
    level: "expert",
    codeExample: "= Value.ReplaceType(fx_CoreLogic, fx_DocumentedType)"
  },
  {
    question: "How do you implement a default parameter value in M if the caller passes `null`?",
    shortAnswer: "Using the null-coalescing operator: `actualRate = taxRate ?? 0.18`.",
    explanation: "Standard idiom for default parameter fallbacks.",
    hint: "Use taxRate ?? defaultVal.",
    level: "basic",
    codeExample: "rate = customRate ?? 0.18"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Custom M Functions?",
    shortAnswer: "Modularize, document, and defend against nulls! Prefix function queries with `fx_`, always declare parameter types with nullable fallbacks (`taxRate ?? 0.18`), attach rich documentation metadata (`[Documentation.Name]`), and buffer lookup dimensions with `Table.Buffer` before invoking across millions of fact table rows!",
    explanation: "Custom M functions transform complex repetitive enterprise ETL tasks into clean, reusable, one-line modular operations!",
    hint: "Modularize (fx_) + Null Safety (??) + Metadata Docs + Buffer Lookups = Enterprise Excellence!",
    level: "expert",
    codeExample: "Rule: fx_Process = (x as nullable text, optional r as nullable number) as number => ...!"
  }
];

export default questions;
