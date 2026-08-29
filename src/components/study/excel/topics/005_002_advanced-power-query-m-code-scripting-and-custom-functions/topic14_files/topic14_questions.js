const questions = [
  {
    "question": "What does List.Generate perform in Power Query M?",
    "options": [
      "A functional while-loop generator that iterates until a condition evaluates to false",
      "Generates random numbers",
      "Creates an Excel table",
      "Imports CSV"
    ],
    "correctAnswer": 0,
    "explanation": "List.Generate is M's functional while-loop for generating sequences and paginating APIs."
  },
  {
    "question": "What are the 4 core arguments of List.Generate?",
    "options": [
      "initial (start state), condition (while condition), next (iteration step), [selector] (output projection)",
      "from, to, step, format",
      "url, headers, body, method",
      "list, seed, acc, type"
    ],
    "correctAnswer": 0,
    "explanation": "List.Generate takes initial state, continuation condition, next step generator, and optional selector."
  },
  {
    "question": "What does List.Accumulate perform in Power Query M?",
    "options": [
      "A functional fold/reduce operation that iterates through a list, accumulating a running state value",
      "Sums numbers only",
      "Sorts a list",
      "Deletes duplicates"
    ],
    "correctAnswer": 0,
    "explanation": "List.Accumulate applies an accumulator function over a list to produce a single final state."
  },
  {
    "question": "What are the 3 arguments of List.Accumulate?",
    "options": [
      "list (items to iterate), seed (initial starting value), accumulator (function(state, current))",
      "initial, condition, next",
      "table, column, type",
      "source, step, output"
    ],
    "correctAnswer": 0,
    "explanation": "List.Accumulate takes list, seed value, and accumulator lambda (state, current)."
  },
  {
    "question": "How is List.Generate commonly used in enterprise REST API ingestion?",
    "options": [
      "To automatically fetch paginated API pages until page_count is reached or records return empty",
      "To style JSON",
      "To encrypt passwords",
      "To delete records"
    ],
    "correctAnswer": 0,
    "explanation": "Iterates through page tokens or page numbers until the API returns no more data."
  },
  {
    "question": "In List.Generate, what happens when condition evaluates to false?",
    "options": [
      "Iteration stops immediately and the accumulated list is returned",
      "An error is thrown",
      "The loop resets to 0",
      "Excel crashes"
    ],
    "correctAnswer": 0,
    "explanation": "When condition evaluates to false, List.Generate terminates and returns the generated list."
  },
  {
    "question": "What is the purpose of the selector argument in List.Generate?",
    "options": [
      "Extracts or transforms specific fields from the iteration state record for the final output list",
      "Selects columns",
      "Chooses database",
      "Filters rows"
    ],
    "correctAnswer": 0,
    "explanation": "The selector projects the desired value from the internal iteration state record."
  },
  {
    "question": "What formula generates numbers from 1 to 10 using List.Generate?",
    "options": [
      "=List.Generate(() => 1, each _ <= 10, each _ + 1)",
      "=List.Generate(1, 10)",
      "=GENERATE(10)",
      "=List.Range(1, 10)"
    ],
    "correctAnswer": 0,
    "explanation": "=List.Generate(() => 1, each _ <= 10, each _ + 1) generates 1 through 10."
  },
  {
    "question": "How do you implement text replacement across multiple word pairs in Power Query using List.Accumulate?",
    "options": [
      "=List.Accumulate(ReplacementTable_Rows, SourceText, (state, current) => Text.Replace(state, current[Old], current[New]))",
      "=Text.ReplaceAll()",
      "=SUBSTITUTE()",
      "=Table.Replace()"
    ],
    "correctAnswer": 0,
    "explanation": "Folds sequential Text.Replace calls over a list of find/replace word pairs."
  },
  {
    "question": "What is the 'seed' in List.Accumulate?",
    "options": [
      "The initial accumulator state value before processing the first list element",
      "The random seed",
      "The database password",
      "The table header"
    ],
    "correctAnswer": 0,
    "explanation": "Seed is the starting accumulator accumulator value."
  },
  {
    "question": "How to calculate factorial of 5 (5!) in Power Query M using List.Accumulate?",
    "options": [
      "=List.Accumulate({1..5}, 1, (state, current) => state * current)",
      "=List.Factorial(5)",
      "=PRODUCT(5)",
      "=List.Sum({1..5})"
    ],
    "correctAnswer": 0,
    "explanation": "Accumulates multiplication: 1 * 1 * 2 * 3 * 4 * 5 = 120."
  },
  {
    "question": "Why is functional recursion in M superior to manual Power Query steps for pagination?",
    "options": [
      "It dynamically adapts to variable API page counts without hardcoding fixed queries",
      "It uses less disk",
      "It disables internet",
      "It creates charts"
    ],
    "correctAnswer": 0,
    "explanation": "Dynamically handles 1 page or 10,000 pages depending on server response."
  },
  {
    "question": "What error occurs if condition in List.Generate never evaluates to false?",
    "options": [
      "Infinite loop causing Power Query timeout or memory exhaustion",
      "Syntax error",
      "Automatic termination at 10",
      "Zero error"
    ],
    "correctAnswer": 0,
    "explanation": "Infinite loops must be prevented by setting boundary conditions."
  },
  {
    "question": "How to paginate a REST API that returns a next_cursor string until next_cursor is null?",
    "options": [
      "=List.Generate(() => GetPage(null), each _[cursor] <> null, each GetPage(_[cursor]), each _[data])",
      "=List.Repeat()",
      "=Table.Expand()",
      "=Web.Page()"
    ],
    "correctAnswer": 0,
    "explanation": "Passes next_cursor to subsequent API calls until null."
  },
  {
    "question": "What does the each keyword represent in M-code lambda functions?",
    "options": [
      "Shorthand syntactic sugar for (_) =>",
      "A loop counter",
      "A table row only",
      "A comment"
    ],
    "correctAnswer": 0,
    "explanation": "each _ is shorthand for a single-argument lambda function (_) =>."
  },
  {
    "question": "In List.Accumulate, what does the current parameter represent?",
    "options": [
      "The current item being processed from the list in this iteration step",
      "The time now",
      "The current sheet",
      "The total count"
    ],
    "correctAnswer": 0,
    "explanation": "current represents the active item from the input list."
  },
  {
    "question": "Can List.Generate return complex objects like records or tables in each list element?",
    "options": [
      "Yes, each element can be a Record, Table, List, or primitive value",
      "Only numbers",
      "Only text",
      "No objects"
    ],
    "correctAnswer": 0,
    "explanation": "M lists can store arbitrary nested objects including Tables and Records."
  },
  {
    "question": "How do you combine a list of tables generated by List.Generate into one master table?",
    "options": [
      "=Table.Combine(List.Generate(...))",
      "=Table.Merge()",
      "=Table.Join()",
      "=List.Union()"
    ],
    "correctAnswer": 0,
    "explanation": "Table.Combine stacks a list of separate tables into a single unified table."
  },
  {
    "question": "How to compute running account balance from transaction list using List.Accumulate?",
    "options": [
      "=List.Accumulate(Transactions, 0, (balance, txn) => balance + txn[Amount])",
      "=List.Sum()",
      "=SUMIFS()",
      "=Table.Add()"
    ],
    "correctAnswer": 0,
    "explanation": "Maintains running sum balance across transaction list."
  },
  {
    "question": "What is the equivalent of List.Accumulate in Python / JavaScript functional programming?",
    "options": [
      "reduce() (or foldl in Haskell)",
      "map()",
      "filter()",
      "slice()"
    ],
    "correctAnswer": 0,
    "explanation": "List.Accumulate is M's implementation of the classic reduce / fold functional operator."
  },
  {
    "question": "What is the equivalent of List.Generate in Python / JavaScript?",
    "options": [
      "A while loop generating items / yield generator",
      "Array.map()",
      "filter()",
      "Promise.all()"
    ],
    "correctAnswer": 0,
    "explanation": "Acts as a while-loop generator."
  },
  {
    "question": "How to handle rate limiting (429 Too Many Requests) in M pagination?",
    "options": [
      "Introduce delay logic or Function.InvokeAfter within iteration step",
      "Delete queries",
      "Use Excel 2007",
      "Turn off wifi"
    ],
    "correctAnswer": 0,
    "explanation": "Function.InvokeAfter introduces throttle pauses between API calls."
  },
  {
    "question": "Can List.Accumulate apply multiple sequential column renames from a mapping table?",
    "options": [
      "=List.Accumulate(RenamePairs, SourceTable, (tbl, pair) => Table.RenameColumns(tbl, {{pair[Old], pair[New]}}))",
      "No",
      "Only 1 rename",
      "Only in SQL"
    ],
    "correctAnswer": 0,
    "explanation": "Folds Table.RenameColumns across all rename dictionary pairs."
  },
  {
    "question": "What is the return type of List.Generate?",
    "options": [
      "A List containing the generated items",
      "Table",
      "Record",
      "Boolean"
    ],
    "correctAnswer": 0,
    "explanation": "List.Generate returns an M List."
  },
  {
    "question": "What is the return type of List.Accumulate?",
    "options": [
      "Whatever data type the accumulator seed and function produce (Number, Text, Table, Record)",
      "Always a List",
      "Always a Number",
      "Always a String"
    ],
    "correctAnswer": 0,
    "explanation": "Returns the final aggregated state value (any M type)."
  },
  {
    "question": "In Barrackpore GST tax reconciliation, why use List.Accumulate?",
    "options": [
      "To iterate through multiple monthly JSON invoice payload files and merge them with custom cleaning rules",
      "To avoid paying GST",
      "Because Tally cannot export",
      "To speed up mouse clicks"
    ],
    "correctAnswer": 0,
    "explanation": "Automates multi-file batch ingestion and iterative reconciliation."
  },
  {
    "question": "How to test List.Generate step-by-step during M development?",
    "options": [
      "Start with small mock lists or limit condition to 3 iterations (each _[page] <= 3)",
      "Run on 1M rows immediately",
      "Disable M editor",
      "Use VBA"
    ],
    "correctAnswer": 0,
    "explanation": "Testing with bounded iteration counts validates loop logic safely."
  },
  {
    "question": "What is the performance impact of Table.Buffer inside List.Accumulate loops?",
    "options": [
      "Buffering prevents repeated re-evaluation of static source tables on every loop cycle",
      "Slows down Excel",
      "Corrupts data",
      "No impact"
    ],
    "correctAnswer": 0,
    "explanation": "Buffering prevents expensive repeated query re-evaluations."
  },
  {
    "question": "Can List.Generate iterate backwards (countdown)?",
    "options": [
      "Yes (e.g. initial 10, each _ >= 1, each _ - 1)",
      "No, positive only",
      "Only with macros",
      "Only in Power BI"
    ],
    "correctAnswer": 0,
    "explanation": "Supports any arbitrary state progression logic."
  },
  {
    "question": "Why is mastering List.Generate and List.Accumulate the hallmark of an Ultra Expert in Power Query?",
    "options": [
      "It elevates Power Query from simple UI clicking into a full-fledged Turing-complete functional programming language",
      "It makes queries colorful",
      "It removes formulas",
      "It is required for certificates"
    ],
    "correctAnswer": 0,
    "explanation": "Transforms Power Query into an industrial functional ETL programming platform."
  }
];

export default questions;
