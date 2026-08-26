// topic2_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 2
// Topic: Registering and naming LAMBDA functions in Excel Name Manager
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "How do you permanently register a LAMBDA function in Microsoft Excel?",
    shortAnswer: "By defining a new defined name in Excel Name Manager (Ctrl+F3) and pasting the LAMBDA formula into the 'Refers To' box.",
    explanation: "Once saved in Name Manager, the custom function becomes globally available across the workbook just like a native built-in Excel function.",
    hint: "Save the LAMBDA formula in Name Manager.",
    level: "basic",
    codeExample: "Name: GROSS_PAY | Refers to: =LAMBDA(b, da, hra, b*(1+da+hra))"
  },
  {
    question: "What is the keyboard shortcut to open Name Manager in Excel?",
    shortAnswer: "Ctrl + F3 (or Cmd + F3 on Mac).",
    explanation: "Pressing Ctrl+F3 opens the Name Manager dialog box where names can be created, edited, and deleted.",
    hint: "Ctrl + F3.",
    level: "basic",
    codeExample: "Ctrl + F3"
  },
  {
    question: "What is the recommended Scope setting when registering a corporate LAMBDA function?",
    shortAnswer: "Workbook scope.",
    explanation: "Setting the scope to 'Workbook' ensures the custom function can be called from any sheet in the entire workbook.",
    hint: "Workbook scope enables workbook-wide availability.",
    level: "basic",
    codeExample: "Scope: Workbook"
  },
  {
    question: "What happens if a LAMBDA function is registered with a specific Worksheet scope (e.g. Sheet1)?",
    shortAnswer: "The function can only be called from that specific sheet, or must be prefixed with the sheet name (e.g. =Sheet1!MY_FUNC()) from other sheets.",
    explanation: "Worksheet scope restricts name resolution to the parent sheet.",
    hint: "Restricts function invocation to the parent worksheet.",
    level: "moderate",
    codeExample: "=Sheet1!GROSS_PAY(A2, B2)"
  },
  {
    question: "What naming rules must be obeyed when choosing a name for a LAMBDA function?",
    shortAnswer: "Must begin with a letter or underscore, cannot contain spaces or special symbols, cannot collide with cell addresses (A1, R1C1), and cannot match existing native function names.",
    explanation: "Adhering to standard Excel naming rules prevents syntax ambiguity during formula parsing.",
    hint: "No spaces, cannot match cell references or native functions.",
    level: "basic",
    codeExample: "Valid: FX_SALARY_CALC | Invalid: C2, SUM, Gross Salary"
  },
  {
    question: "Why should you never include trailing invocation arguments (e.g. `(5)`) in the 'Refers To' box in Name Manager?",
    shortAnswer: "Because including arguments evaluates the function once and stores a static value instead of saving a callable function closure.",
    explanation: "In Name Manager, 'Refers To' must contain only the raw function definition `=LAMBDA(...)` without arguments.",
    hint: "Only paste =LAMBDA(...) without trailing test arguments.",
    level: "moderate",
    codeExample: "Correct: =LAMBDA(x, x*2) | Incorrect: =(LAMBDA(x, x*2))(5)"
  },
  {
    question: "How does updating a LAMBDA definition in Name Manager affect existing worksheet cells?",
    shortAnswer: "All cells calling that named function recalculate instantly across the entire workbook.",
    explanation: "Excel's dependency calculation graph automatically detects the Name Manager edit and cascades updates to all dependent cells.",
    hint: "Instant automatic recalculation across all dependent cells.",
    level: "basic",
    codeExample: "Single Point of Maintenance Architecture"
  },
  {
    question: "How does Name Manager registration enhance corporate spreadsheet governance and auditability?",
    shortAnswer: "It centralizes proprietary mathematical formulas in one auditable location, eliminating duplicate formula clutter and copy-paste errors across thousands of cells.",
    explanation: "Auditors can inspect proprietary logic in Name Manager without having to audit individual cell formulas across dozens of sheets.",
    hint: "Centralized auditable business logic repository.",
    level: "moderate",
    codeExample: "Centralized Governance"
  },
  {
    question: "What naming prefix convention is recommended by Microsoft and industry experts for custom LAMBDAs?",
    shortAnswer: "Prefixing function names with `FX_`, `CORP_`, or `fn_` (e.g. `FX_GST_CALC` or `CORP_LOAN_EMI`).",
    explanation: "Prefixes prevent future naming collisions if Microsoft releases new built-in functions with similar names.",
    hint: "Use prefixes like FX_ or CORP_ to prevent namespace collisions.",
    level: "moderate",
    codeExample: "FX_NET_REVENUE, CORP_AMORTIZE"
  },
  {
    question: "Can a named LAMBDA function call other named LAMBDA functions in the same workbook?",
    shortAnswer: "Yes, named LAMBDAs can call other named LAMBDAs, allowing modular composition of complex business calculations.",
    explanation: "For example, =FX_GROSS_PAY() can internally invoke =FX_DA_CALC() and =FX_HRA_CALC().",
    hint: "Yes, modular function composition is fully supported.",
    level: "advanced",
    codeExample: "FX_GROSS = LAMBDA(b, FX_BASE(b) + FX_BONUS(b))"
  },
  {
    question: "What error occurs if a worksheet formula calls a named function that has not been defined in Name Manager?",
    shortAnswer: "#NAME? error.",
    explanation: "Excel returns #NAME? when it cannot recognize a function or range identifier.",
    hint: "Unrecognized function names trigger #NAME?.",
    level: "basic",
    codeExample: "#NAME?"
  },
  {
    question: "Can a named LAMBDA return dynamic spilled arrays across multiple columns and rows?",
    shortAnswer: "Yes, named LAMBDAs support multi-cell dynamic spilled arrays (e.g. returning HSTACK or VSTACK structures).",
    explanation: "Calling a named LAMBDA like =FX_TAX_BREAKDOWN(150000) spills taxable, CGST, SGST, and gross total across 4 columns.",
    hint: "Supports dynamic spilled array outputs.",
    level: "basic",
    codeExample: "=FX_TAX_BREAKDOWN(50000) &rarr; Spills 4 columns"
  },
  {
    question: "How do you delete or rename a custom LAMBDA function in Excel?",
    shortAnswer: "Open Name Manager (Ctrl+F3), select the function name, and click 'Delete' or 'Edit'.",
    explanation: "Name Manager provides full CRUD (Create, Read, Update, Delete) management for workbook defined names.",
    hint: "Manage via the Name Manager dialog (Ctrl+F3).",
    level: "basic",
    codeExample: "Ctrl+F3 &rarr; Select Name &rarr; Edit/Delete"
  },
  {
    question: "What happens to worksheet cells calling a named LAMBDA if that name is deleted from Name Manager?",
    shortAnswer: "All dependent cells immediately turn into #NAME? errors.",
    explanation: "Deleting the defined name breaks the function resolution pointer in the calculation engine.",
    hint: "Dependent cells return #NAME? errors.",
    level: "basic",
    codeExample: "#NAME? error on deleted function"
  },
  {
    question: "Can named LAMBDA functions be used inside Excel Table calculated columns?",
    shortAnswer: "Yes, named LAMBDAs can be invoked with structured Table references (e.g. =FX_DISCOUNT([@Price], [@Qty])).",
    explanation: "Named LAMBDAs integrate seamlessly with Excel Tables and structured references.",
    hint: "Supports structured Table references like [@Field].",
    level: "moderate",
    codeExample: "=FX_DISCOUNT([@Price], [@Qty])"
  },
  {
    question: "How does Name Manager handle case sensitivity for LAMBDA function names?",
    shortAnswer: "Excel defined names are case-insensitive (e.g. `fx_calc`, `FX_CALC`, and `Fx_Calc` refer to the same function).",
    explanation: "Excel normalizes function names regardless of uppercase or lowercase entry.",
    hint: "Defined names are case-insensitive.",
    level: "basic",
    codeExample: "FX_CALC == fx_calc == Fx_Calc"
  },
  {
    question: "What is the character limit for a function name in Name Manager?",
    shortAnswer: "Up to 255 characters.",
    explanation: "While names can be up to 255 characters long, concise names (10-25 characters) are best practice for readability.",
    hint: "Maximum 255 characters for defined names.",
    level: "moderate",
    codeExample: "Limit: 255 characters"
  },
  {
    question: "How can you copy a library of named LAMBDAs from one workbook to another?",
    shortAnswer: "Copy any worksheet from the source workbook to the target workbook; Excel automatically transfers all workbook-level defined names.",
    explanation: "Moving or copying a sheet moves associated defined names into the destination file.",
    hint: "Copy a sheet to transfer defined names automatically.",
    level: "advanced",
    codeExample: "Right-click sheet &rarr; Move or Copy &rarr; Target Workbook"
  },
  {
    question: "How does Excel's Advanced Formula Environment (AFE) add-in enhance LAMBDA management?",
    shortAnswer: "It provides a dedicated code editor with syntax highlighting, inline comments, auto-formatting, and batch publishing to Name Manager.",
    explanation: "AFE by Microsoft Garage allows writing modular LAMBDA modules in a code editor interface and synchronizing with Name Manager.",
    hint: "Code editor for writing and batch-syncing LAMBDAs.",
    level: "advanced",
    codeExample: "Advanced Formula Environment Add-In"
  },
  {
    question: "Can a named LAMBDA accept dynamic spilled array anchors (e.g. A2#) as inputs?",
    shortAnswer: "Yes, passing A2# passes the entire dynamic array into the named LAMBDA.",
    explanation: "Named LAMBDAs accept scalar inputs, ranges, or spilled array references seamlessly.",
    hint: "Accepts spilled anchors like A2#.",
    level: "basic",
    codeExample: "=FX_GST_CALC(A2#)"
  },
  {
    question: "How do you write a named LAMBDA that calculates the compound annual growth rate (CAGR)?",
    shortAnswer: "Name: FX_CAGR | Refers To: =LAMBDA(start_val, end_val, periods, (end_val / start_val)^(1 / periods) - 1)",
    explanation: "Evaluates standard CAGR formula: (Ending / Beginning)^(1/n) - 1.",
    hint: "Standard CAGR formula wrapped in LAMBDA.",
    level: "moderate",
    codeExample: "=FX_CAGR(100000, 250000, 5) &rarr; 20.11%"
  },
  {
    question: "What happens if a parameter in a LAMBDA matches an existing defined name in Name Manager?",
    shortAnswer: "The parameter takes precedence inside the LAMBDA's local scope (variable shadowing).",
    explanation: "Local parameter scope overrides outer defined names within the execution block.",
    hint: "Local parameter shadows outer defined name.",
    level: "expert",
    codeExample: "Local variable shadowing"
  },
  {
    question: "How can you view the formula definition of an existing named LAMBDA in Excel?",
    shortAnswer: "Open Name Manager (Ctrl+F3), click the function name, and view the formula in the 'Refers to' box at the bottom.",
    explanation: "The 'Refers to' box displays the complete underlying LAMBDA formula.",
    hint: "Inspect the 'Refers to' box in Name Manager.",
    level: "basic",
    codeExample: "Ctrl+F3 &rarr; Select function &rarr; View 'Refers to'"
  },
  {
    question: "Can a named LAMBDA be used inside Conditional Formatting rules?",
    shortAnswer: "Yes, named LAMBDAs that return TRUE/FALSE can be used as custom formula rules in Conditional Formatting.",
    explanation: "Named functions evaluate dynamic boolean criteria across highlighted cells.",
    hint: "Yes, supports boolean Conditional Formatting rules.",
    level: "advanced",
    codeExample: "=FX_IS_OVERDUE(A2)"
  },
  {
    question: "How do you author a named LAMBDA for Indian HRA tax exemption calculation?",
    shortAnswer: "Name: FX_HRA_EXEMPT | Refers To: =LAMBDA(actual_hra, rent_paid, basic_pay, is_metro, MIN(actual_hra, rent_paid - 0.1*basic_pay, IF(is_metro, 0.5, 0.4)*basic_pay))",
    explanation: "Evaluates the statutory Indian Income Tax rule: Minimum of Actual HRA, Rent minus 10% Basic, and 50%/40% of Basic Pay.",
    hint: "MIN of 3 statutory limits wrapped in LAMBDA.",
    level: "expert",
    codeExample: "=FX_HRA_EXEMPT(15000, 18000, 45000, TRUE)"
  },
  {
    question: "Why does registering LAMBDAs in Name Manager improve spreadsheet file size and memory footprint?",
    shortAnswer: "Because the formula string is stored only once in the workbook's name table rather than being duplicated in every worksheet cell.",
    explanation: "10,000 cells calling =FX_CALC(A2) store only short function pointers instead of repeating complex 200-character formulas.",
    hint: "Stores formula text once in the name dictionary.",
    level: "expert",
    codeExample: "Memory Footprint Optimization"
  },
  {
    question: "Can a named LAMBDA be passed as an argument into another function like BYROW or MAP?",
    shortAnswer: "Yes, you can pass the named LAMBDA directly: =BYROW(Matrix, FX_SUM_ROW).",
    explanation: "In functional programming, named LAMBDAs are first-class citizens and can be passed as function pointers.",
    hint: "Pass named LAMBDA identifier as function pointer.",
    level: "advanced",
    codeExample: "=BYROW(A2:D20, FX_WEIGHTED_AVG)"
  },
  {
    question: "What happens if a user enters a typo when calling a named LAMBDA (e.g. =FX_SALRY())?",
    shortAnswer: "Excel returns a #NAME? error.",
    explanation: "Excel flags unknown function identifiers with #NAME?.",
    hint: "Typo in function name returns #NAME?.",
    level: "basic",
    codeExample: "#NAME?"
  },
  {
    question: "How can you test a named LAMBDA immediately after saving it in Name Manager?",
    shortAnswer: "Type the function name in any cell followed by argument values in parentheses: =FX_NAME(100, 20).",
    explanation: "Invoking the function verifies proper parameter mapping and calculation output.",
    hint: "Call with test values in any worksheet cell.",
    level: "basic",
    codeExample: "=FX_GROSS_SALARY(45000, 0.38, 0.15)"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Name Manager deployment?",
    shortAnswer: "Always name custom functions with clear corporate prefixes (e.g. FX_ or CORP_), keep scope at Workbook level, and provide detailed parameter comments for every argument.",
    explanation: "Consistent naming standards and detailed comments ensure that financial models remain maintainable, auditable, and self-documenting for team members across the organization!",
    hint: "Use FX_ prefix, Workbook scope, and clear parameter comments.",
    level: "expert",
    codeExample: "Standard: FX_NAME | Scope: Workbook | Refers To: =LAMBDA(...) | Comment: Detailed docs"
  }
];

export default questions;
