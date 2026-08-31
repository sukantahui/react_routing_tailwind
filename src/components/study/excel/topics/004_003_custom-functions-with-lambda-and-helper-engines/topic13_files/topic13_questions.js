// topic13_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 13
// Topic: Building a centralized corporate LAMBDA function library (exporting/importing, naming conventions, organization)
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is a Corporate LAMBDA Function Library in Microsoft Excel 365?",
    shortAnswer: "A centralized, version-controlled collection of standardized, pre-tested custom LAMBDA functions shared across an organization's workbooks, templates, and financial models.",
    explanation: "Eliminates redundant formula development and guarantees company-wide calculation consistency.",
    hint: "Standardized, centralized repository of custom functions.",
    level: "basic",
    codeExample: "FX_FIN_LOAN_EMI, FX_TAX_GST_CALC, FX_HR_BONUS_TIER"
  },
  {
    question: "What official Microsoft add-in is specifically designed for authoring, organizing, importing, and exporting corporate LAMBDA libraries?",
    shortAnswer: "The Advanced Formula Environment (AFE) add-in from Microsoft Garage.",
    explanation: "AFE provides a code editor interface with syntax highlighting, inline comments, multi-function authoring, and cloud sharing.",
    hint: "Advanced Formula Environment (AFE) add-in.",
    level: "basic",
    codeExample: "Microsoft Advanced Formula Environment (AFE)"
  },
  {
    question: "What naming convention prefix standard is recommended for corporate LAMBDA libraries to prevent naming collisions?",
    shortAnswer: "Using domain-specific hierarchical prefixes such as `FX_FIN_` (Finance), `FX_TAX_` (Taxation), `FX_HR_` (Human Resources), or `FX_STR_` (String Utilities).",
    explanation: "Prefixes prevent collisions with future native Excel function names and group related functions alphabetically in formula autocomplete.",
    hint: "Hierarchical prefixes: FX_FIN_, FX_TAX_, FX_HR_.",
    level: "basic",
    codeExample: "FX_TAX_TDS_CALCULATE(gross, pan)"
  },
  {
    question: "What happens if a custom LAMBDA function in Name Manager shares the exact same name as a built-in Excel function (e.g. SUM or FILTER)?",
    shortAnswer: "Excel rejects the name during registration in Name Manager, throwing an 'invalid name' error.",
    explanation: "Excel reserves all built-in function names and standard cell coordinates (like C2) to prevent namespace ambiguity.",
    hint: "Excel blocks registration of reserved keywords.",
    level: "basic",
    codeExample: "Name Collision → 'Name is invalid' error"
  },
  {
    question: "How do you export a corporate LAMBDA library without third-party add-ins?",
    shortAnswer: "By saving a dedicated Master Template workbook (.xltx) containing all registered defined names, or copying blank worksheets containing the formulas into target workbooks.",
    explanation: "Defined names in a workbook copy over automatically when worksheets referencing them are moved/copied.",
    hint: "Save Master Template (.xltx) or copy defined names across workbooks.",
    level: "moderate",
    codeExample: "Master_Corporate_Library_v2.4.xltx"
  },
  {
    question: "What file format does the Advanced Formula Environment (AFE) use to store and share LAMBDA modules in plain text?",
    shortAnswer: "Plain text `.txt` files containing declarative function modules with the syntax: `FunctionName = LAMBDA(...);`.",
    explanation: "Plain text modules can be version-controlled in Git, audited, and pasted directly into AFE.",
    hint: "Plain text `.txt` modules formatted with declarative syntax.",
    level: "moderate",
    codeExample: "CorporateFinance.txt"
  },
  {
    question: "Why should corporate LAMBDA libraries include explicit parameter documentation and comments?",
    shortAnswer: "Because comments entered in Name Manager or AFE display in Excel's native formula autocomplete tooltips, guiding end-users on parameter expectations.",
    explanation: "Provides real-time IntelliSense documentation directly to business analysts.",
    hint: "Displays in native formula autocomplete IntelliSense tooltips.",
    level: "basic",
    codeExample: "Comment: Calculates Indian GST component at 18%"
  },
  {
    question: "How do you prevent broken formula errors when copying a worksheet that uses custom LAMBDAs into a new empty workbook?",
    shortAnswer: "Ensure the target workbook has all required named LAMBDAs registered in its Name Manager, or copy the defined names prior to formula insertion.",
    explanation: "If defined names are missing, formulas evaluate to #NAME? in the destination workbook.",
    hint: "Pre-register defined names or copy library sheet.",
    level: "moderate",
    codeExample: "Missing Defined Names → #NAME? Error"
  },
  {
    question: "What is the recommended versioning strategy for corporate LAMBDA libraries (e.g. Semantic Versioning)?",
    shortAnswer: "Semantic Versioning (MAJOR.MINOR.PATCH), where MAJOR indicates breaking signature changes, MINOR adds new functions, and PATCH fixes internal bugs.",
    explanation: "Helps corporate finance teams track backwards compatibility across critical models.",
    hint: "Semantic Versioning (MAJOR.MINOR.PATCH).",
    level: "advanced",
    codeExample: "v2.1.0 (Added optional tax regime flag)"
  },
  {
    question: "Can a corporate LAMBDA in Name Manager call another corporate LAMBDA registered in the same workbook?",
    shortAnswer: "Yes, corporate LAMBDAs can be composed modularly, calling other helper LAMBDAs as long as all dependencies are registered in Name Manager.",
    explanation: "Enables modular software architecture with reusable building blocks (e.g. FX_NET_PAY calling FX_TDS_CALC).",
    hint: "Modular functional composition is fully supported.",
    level: "moderate",
    codeExample: "FX_NET_PAY = LAMBDA(gross, gross - FX_TAX_CALC(gross))"
  },
  {
    question: "How do you deprecate an outdated corporate LAMBDA function gracefully?",
    shortAnswer: "Update its Name Manager comment with '[DEPRECATED: Use FX_NEW_FUNC]' and update internal calculations to wrap the new function while preserving legacy signatures.",
    explanation: "Prevents breaking existing legacy models while guiding analysts to the modern standard.",
    hint: "Add [DEPRECATED] tag in comment and wrap new function.",
    level: "advanced",
    codeExample: "Comment: [DEPRECATED: Use FX_TAX_GST_V2]"
  },
  {
    question: "How can organization administrators distribute LAMBDAs company-wide using Excel Add-in (.xlam) files?",
    shortAnswer: "Excel Add-in files (.xlam) can contain pre-loaded defined names and VBA loaders that automatically register corporate LAMBDAs into active workbooks upon startup.",
    explanation: "Delivers a zero-friction deployment experience across enterprise desktops.",
    hint: "Excel Add-in (.xlam) distribution.",
    level: "expert",
    codeExample: "Corporate_LAMBDA_Suite.xlam"
  },
  {
    question: "What is the primary benefit of using a centralized corporate library over individual analysts writing custom formulas?",
    shortAnswer: "Guarantees mathematical correctness, eliminates formula drift, satisfies statutory compliance (e.g. tax laws), and simplifies workbook audits.",
    explanation: "A single audited formula definition replaces thousands of ad-hoc formulas across the enterprise.",
    hint: "Audited consistency, statutory compliance, and zero formula drift.",
    level: "basic",
    codeExample: "Single Audited Truth vs 10,000 Ad-Hoc Formulas"
  },
  {
    question: "How do you document optional parameters in corporate LAMBDA libraries?",
    shortAnswer: "Enclose optional parameter names in square brackets `[optional_param]` in comments and use ISOMITTED inside the function body to supply defaults.",
    explanation: "Signals to users that the parameter is optional and documents the fallback default value.",
    hint: "Square brackets in docs + ISOMITTED fallback in code.",
    level: "moderate",
    codeExample: "Params: principal, annual_rate, [tenure_months=36]"
  },
  {
    question: "What error occurs if an analyst passes invalid arguments (e.g. text for a rate) to a corporate library function?",
    shortAnswer: "#VALUE! error (or custom error message if defensive ISNUMBER validation is coded).",
    explanation: "Defensive corporate LAMBDAs check inputs using `IF(ISNUMBER(x), ..., \"ERROR: Invalid Input\")`.",
    hint: "Defensive validation prevents silent corruption.",
    level: "moderate",
    codeExample: "IF(NOT(ISNUMBER(rate)), \"ERROR: Rate Must Be Numeric\", ...)"
  },
  {
    question: "How does Git version control integrate with corporate LAMBDA plain-text modules?",
    shortAnswer: "LAMBDA plain text modules (`.txt` or `.js` files) can be tracked in Git repositories, enabling code reviews, pull requests, and automated regression testing.",
    explanation: "Brings modern DevOps and software engineering rigor to corporate spreadsheet development.",
    hint: "Version-control plain text modules in Git with pull requests.",
    level: "expert",
    codeExample: "git commit -m \"feat(tax): update 2026 tax brackets in FX_TAX_CALC\""
  },
  {
    question: "Can corporate LAMBDA libraries be published and synced across Microsoft 365 Cloud Tenancies?",
    shortAnswer: "Yes, using AFE's GitHub sync or Organization Asset Libraries hosted on SharePoint / OneDrive.",
    explanation: "Provides cloud synchronization of the latest corporate functions directly into every employee's Excel client.",
    hint: "AFE GitHub sync and SharePoint Asset Libraries.",
    level: "advanced",
    codeExample: "Cloud-Synced Function Modules"
  },
  {
    question: "What is the maximum number of custom LAMBDAs that can be registered in a single Excel workbook?",
    shortAnswer: "Virtually unlimited (governed only by workbook defined name limits, which exceed tens of thousands).",
    explanation: "An organization can maintain a library of hundreds of custom functions without performance penalty.",
    hint: "Supports thousands of defined names.",
    level: "basic",
    codeExample: "Tens of thousands of defined names supported"
  },
  {
    question: "How do you test a new version of a corporate LAMBDA before rolling it out company-wide?",
    shortAnswer: "Run automated unit test worksheets comparing old vs new outputs across hundreds of boundary cases (e.g. 0, negative values, leap years, maximum caps).",
    explanation: "Regression testing ensures that upgrades do not alter financial results unexpectedly.",
    hint: "Automated regression unit testing across boundary datasets.",
    level: "advanced",
    codeExample: "Unit Test Harness: ASSERT(FX_NEW(x) == Expected)"
  },
  {
    question: "How do you handle currency rounding standards in corporate financial LAMBDAs?",
    shortAnswer: "Wrap final calculations in standard rounding functions (e.g. `ROUND(calc, 2)` for currency, `ROUNDUP(calc, 0)` for units) directly inside the library function.",
    explanation: "Enforces corporate rounding rules uniformly across all departmental financial statements.",
    hint: "Embed ROUND(calc, 2) directly inside the corporate LAMBDA.",
    level: "basic",
    codeExample: "ROUND(gross * 0.18, 2)"
  },
  {
    question: "What is the difference between Workbook Scope and Worksheet Scope in Name Manager for LAMBDAs?",
    shortAnswer: "Workbook Scope allows the LAMBDA to be called from any sheet in the file; Worksheet Scope limits the function strictly to that specific sheet.",
    explanation: "Corporate libraries must always be registered with Workbook Scope.",
    hint: "Corporate libraries must be registered with Workbook Scope.",
    level: "moderate",
    codeExample: "Scope: Workbook"
  },
  {
    question: "How do you protect proprietary calculation algorithms inside corporate LAMBDAs from unauthorized tampering?",
    shortAnswer: "Protect the workbook structure with a password, save as a compiled add-in, or restrict editing permissions via SharePoint Information Rights Management (IRM).",
    explanation: "Prevents accidental or malicious modification of critical business logic.",
    hint: "Workbook structure protection and SharePoint IRM permissions.",
    level: "advanced",
    codeExample: "Password Protected Workbook Structure"
  },
  {
    question: "How can corporate LAMBDAs return formatted multi-column output headers and data in 1 formula?",
    shortAnswer: "By defining the function to assemble headers and calculated vectors using VSTACK and HSTACK internally.",
    explanation: "Delivers complete self-documenting reporting cards directly from a single cell formula.",
    hint: "VSTACK(headers, HSTACK(col1, col2)).",
    level: "advanced",
    codeExample: "VSTACK({\"EMI\", \"Total Pay\", \"Interest\"}, HSTACK(emi, tot, int))"
  },
  {
    question: "Why should corporate LAMBDAs avoid referencing hard-coded cell addresses (like A1 or Sheet1!B5)?",
    shortAnswer: "Because hard-coded cell references break when the function is called from different worksheets; functions should strictly operate on passed parameter variables.",
    explanation: "A true pure function depends only on its inputs and has zero external cell dependencies.",
    hint: "Pure functions must operate strictly on passed parameters.",
    level: "expert",
    codeExample: "Pure Function Principle: Zero Hard-Coded Cell Addresses"
  },
  {
    question: "How do you organize a corporate library with 50+ functions logically in documentation?",
    shortAnswer: "Group by functional domains: 1. Financial Math, 2. Statutory Taxation, 3. HR & Payroll, 4. Data Cleansing & ETL, 5. Statistical Modeling.",
    explanation: "Categorized documentation accelerates user adoption and onboarding.",
    hint: "Domain-driven classification in documentation.",
    level: "basic",
    codeExample: "Functional Domain Classification"
  },
  {
    question: "Can corporate LAMBDAs be used in Excel for the Web as well as desktop Excel?",
    shortAnswer: "Yes, once registered in Name Manager, custom LAMBDAs execute identically across Excel for Desktop (Windows/Mac), Excel for Web, and Excel for Mobile.",
    explanation: "Cross-platform cloud compatibility is fully native to Microsoft 365.",
    hint: "Full native cross-platform cloud compatibility.",
    level: "basic",
    codeExample: "Cross-Platform: Web, Desktop, Mobile"
  },
  {
    question: "How do you handle international tax rule variations in a multi-national corporate library?",
    shortAnswer: "Include an optional `[country_code]` parameter with default \"IN\", dynamically switching tax slabs using SWITCH or IFS inside the function.",
    explanation: "Enables a single global function to adapt to regional statutory requirements.",
    hint: "Optional [country_code] parameter with SWITCH routing.",
    level: "advanced",
    codeExample: "SWITCH(country, \"IN\", 0.18, \"US\", 0.07, \"UK\", 0.20)"
  },
  {
    question: "How do you audit all defined LAMBDAs currently registered in an enterprise workbook?",
    shortAnswer: "Open Name Manager (<kbd>Ctrl+F3</kbd>) or run a VBA inspection script that loops through `ActiveWorkbook.Names`, filtering names containing '=LAMBDA'.",
    explanation: "Produces an inventory of all active custom functions for governance reviews.",
    hint: "Inspect Name Manager or iterate ActiveWorkbook.Names.",
    level: "moderate",
    codeExample: "Name Manager Inventory Audit"
  },
  {
    question: "What is the recommended practice for handling null or empty arguments in corporate functions?",
    shortAnswer: "Use ISBLANK, ISOMITTED, or IF(x=\"\", default, x) to ensure functions handle missing data gracefully without crashing to #VALUE!.",
    explanation: "Defensive input sanitization ensures workbook stability.",
    hint: "Graceful null handling via ISBLANK and ISOMITTED.",
    level: "moderate",
    codeExample: "IF(OR(ISBLANK(x), x=\"\"), 0, x)"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Building Corporate LAMBDA Libraries?",
    shortAnswer: "Treat corporate LAMBDAs as professional software engineering assets! Enforce strict domain prefixes (FX_FIN_, FX_TAX_), write pure functions with zero hard-coded cell dependencies, embed thorough parameter documentation for IntelliSense tooltips, and maintain plain-text version-controlled modules in Git!",
    explanation: "Transforming spreadsheet models into disciplined software engineering libraries guarantees 100% audit integrity, eliminates formula errors, and scales analytical productivity across the entire enterprise!",
    hint: "Professional engineering standards: prefixes, pure functions, docs, and Git versioning!",
    level: "expert",
    codeExample: "Rule: Prefixes + Pure Functions + IntelliSense Docs + Git = Enterprise Excellence!"
  }
];

export default questions;
