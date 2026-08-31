// topic3_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 3
// Topic: Documenting LAMBDA parameters and syntax hints for end-users
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "Where do you write documentation and parameter tooltips for a custom LAMBDA in Excel?",
    shortAnswer: "In the 'Comment' text box inside the Excel Name Manager dialog (Ctrl+F3).",
    explanation: "Excel surfaces the text entered in the Comment box as the official description tooltip in the formula autocomplete dropdown.",
    hint: "Enter documentation in the Name Manager Comment box.",
    level: "basic",
    codeExample: "Comment: 'Calculates net invoice amount after commercial discount and 18% GST'"
  },
  {
    question: "When does Excel display the documentation text written in the Name Manager Comment field?",
    shortAnswer: "When an end-user begins typing the function name in a formula cell or selects it from the autocomplete list.",
    explanation: "Excel displays the Comment string alongside the function name in the Intellisense autocomplete menu.",
    hint: "During Intellisense autocomplete in the formula bar.",
    level: "basic",
    codeExample: "Intellisense Formula Autocomplete Tooltip"
  },
  {
    question: "How do descriptive parameter names (e.g. `taxable_value` vs `x`) improve self-documentation?",
    shortAnswer: "They make formula syntax self-explanatory in formula bar tooltips, guiding end-users on what data types and values to supply.",
    explanation: "Clear names like taxable_value, is_interstate, and annual_rate prevent user confusion and input errors.",
    hint: "Self-explanatory parameter names guide end-user data entry.",
    level: "basic",
    codeExample: "=LAMBDA(taxable_value, is_interstate, ...)"
  },
  {
    question: "What is the recommended documentation template for enterprise LAMBDA functions?",
    shortAnswer: "[Function Summary] - Params: [param1: description], [param2: description] - Returns: [output description].",
    explanation: "Structuring comments with parameter definitions and return descriptions provides standard software-grade documentation.",
    hint: "Structured summary, parameter descriptions, and return type.",
    level: "moderate",
    codeExample: "Comment: 'FX_GST(amount, [rate]) → Returns HSTACK(Net, CGST, SGST, Gross)'"
  },
  {
    question: "How does the Advanced Formula Environment (AFE) add-in enhance LAMBDA documentation?",
    shortAnswer: "It allows authoring JSDoc-style docstrings (/** @param amount @return ... */) directly in code and syncs them automatically to Name Manager comments.",
    explanation: "AFE supports multi-line markdown docstrings, inline parameter type hints, and automated synchronization.",
    hint: "JSDoc-style documentation with AFE add-in.",
    level: "advanced",
    codeExample: "/** @param {number} amount Invoice base value */"
  },
  {
    question: "What happens if you leave the Comment field empty when registering a LAMBDA?",
    shortAnswer: "Excel displays only the function name in autocomplete with no description or guidance for end-users.",
    explanation: "While the function still executes, non-technical users will receive no guidance on what arguments are expected.",
    hint: "No guidance tooltip appears in autocomplete.",
    level: "basic",
    codeExample: "Autocomplete displays name only"
  },
  {
    question: "How do you document optional parameters in a LAMBDA Comment?",
    shortAnswer: "By wrapping the optional parameter in square brackets [param] and specifying its default value in the comment.",
    explanation: "For example: 'disc_rate [optional, default=5%]'.",
    hint: "Indicate optional status and default fallback value.",
    level: "moderate",
    codeExample: "Comment: 'CALC_FEE(rate, [discount_pct=0.05])'"
  },
  {
    question: "Can comments contain information about corporate compliance or tax circular numbers?",
    shortAnswer: "Yes, including statutory references (e.g. 'Per GST Circular 183/2022') helps auditors understand the regulatory basis of the calculation.",
    explanation: "Documentation bridges spreadsheet modeling and financial audit compliance.",
    hint: "Include regulatory references for audit traceability.",
    level: "moderate",
    codeExample: "Comment: 'Indian HRA Exemption Rule under Sec 10(13A)'"
  },
  {
    question: "How can you update the documentation of an already registered LAMBDA function?",
    shortAnswer: "Open Name Manager (Ctrl+F3), select the function, edit the Comment text box, and click the Checkmark or OK button.",
    explanation: "Name Manager allows instant updating of comment strings without breaking existing worksheet formulas.",
    hint: "Edit the Comment field in Name Manager (Ctrl+F3).",
    level: "basic",
    codeExample: "Ctrl+F3 → Select → Edit Comment → Save"
  },
  {
    question: "What character limit applies to the Comment text box in Excel Name Manager?",
    shortAnswer: "Up to 255 characters (in standard Excel Name Manager dialog).",
    explanation: "Keeping documentation concise, structured, and informative ensures it fits comfortably within tooltip limits.",
    hint: "Standard limit is 255 characters.",
    level: "moderate",
    codeExample: "Limit: 255 characters"
  },
  {
    question: "How does self-documenting parameter naming prevent argument order confusion?",
    shortAnswer: "By clearly stating roles like (borrower_principal, annual_interest_rate, tenure_months) rather than generic letters (p, r, n).",
    explanation: "Explicit naming prevents users from passing monthly interest instead of annual interest or days instead of months.",
    hint: "Prevents unit of measurement confusion.",
    level: "basic",
    codeExample: "FX_LOAN(principal_inr, annual_rate_pct, tenure_months)"
  },
  {
    question: "How do you document a LAMBDA that returns a multi-column dynamic spilled array?",
    shortAnswer: "Specify the spilled column sequence in the comment, e.g. 'Returns 4-col spilled array: [Taxable, CGST, SGST, Gross]'.",
    explanation: "Alerts the user to leave adjacent destination columns empty to prevent #SPILL! collisions.",
    hint: "Document the spilled column footprint in the comment.",
    level: "moderate",
    codeExample: "Comment: 'Spills 4 columns: [Taxable, CGST, SGST, Total]'"
  },
  {
    question: "Can you document expected units of measurement in parameter names?",
    shortAnswer: "Yes, appending suffixes like `_pct`, `_inr`, `_days`, or `_months` makes parameter units immediately obvious.",
    explanation: "Examples: `da_rate_pct`, `basic_pay_inr`, `notice_period_days`.",
    hint: "Use unit suffixes like _pct, _inr, _days.",
    level: "basic",
    codeExample: "=LAMBDA(amount_inr, gst_rate_pct, ...)"
  },
  {
    question: "How does end-user documentation reduce help-desk tickets in corporate finance departments?",
    shortAnswer: "By providing in-place self-service guidance inside Excel's native formula bar, reducing errors and questions for the model author.",
    explanation: "Clear tooltips enable junior accountants to use proprietary calculation engines without training manuals.",
    hint: "Enables self-service formula usage across teams.",
    level: "moderate",
    codeExample: "Self-Service Enterprise Modeling"
  },
  {
    question: "What is the effect of pressing Ctrl+Shift+A while typing a custom named LAMBDA in Excel?",
    shortAnswer: "Excel automatically inserts all parameter placeholder names into the formula bar.",
    explanation: "Ctrl+Shift+A is Excel's shortcut to insert argument names for any function.",
    hint: "Ctrl+Shift+A inserts parameter names.",
    level: "advanced",
    codeExample: "=FX_GROSS_SALARY(basic, da_pct, hra_pct)"
  },
  {
    question: "How should boolean flag parameters be documented in a LAMBDA comment?",
    shortAnswer: "Indicate TRUE/FALSE meaning clearly, e.g. `is_interstate: TRUE for IGST (Inter-state), FALSE for CGST+SGST`.",
    explanation: "Clarifying boolean values prevents incorrect tax category selection.",
    hint: "Define what TRUE and FALSE represent.",
    level: "basic",
    codeExample: "Comment: 'is_interstate: TRUE=IGST, FALSE=CGST+SGST'"
  },
  {
    question: "Can LAMBDA documentation include the author name and revision version?",
    shortAnswer: "Yes, adding metadata like '[v2.1 by Sukanta Hui - 2024]' maintains version control and ownership traceability.",
    explanation: "Version tags assist in financial audit trails and compliance reviews.",
    hint: "Include author, version, and date metadata.",
    level: "moderate",
    codeExample: "Comment: 'v1.4 by Sukanta Hui | Computes HRA Exemption'"
  },
  {
    question: "Why should parameter names avoid abbreviations like `d` or `p` in production functions?",
    shortAnswer: "Single-letter abbreviations are cryptic and offer zero contextual hint to other analysts reviewing the spreadsheet.",
    explanation: "While single letters are fine during cell prototyping, production functions should always use descriptive names.",
    hint: "Single-letter parameters lack clarity for other users.",
    level: "basic",
    codeExample: "Use `discount_rate` instead of `d`"
  },
  {
    question: "How do you document a custom LAMBDA that requires array ranges rather than scalar values?",
    shortAnswer: "Explicitly state that the parameter expects a range/vector, e.g. `sales_vector: 1D column range of transaction amounts`.",
    explanation: "Helps users avoid passing single cells into functions expecting arrays.",
    hint: "State whether argument must be a 1D vector or 2D matrix.",
    level: "moderate",
    codeExample: "Comment: 'FX_RUNNING_BAL(movement_vector: 1D range)'"
  },
  {
    question: "How can corporate training manuals reference Name Manager comments?",
    shortAnswer: "By including screenshots of autocomplete tooltips and standardizing documentation across company spreadsheet guidelines.",
    explanation: "Aligning documentation across tooltips and training materials ensures high user adoption.",
    hint: "Standardize tooltips across corporate training materials.",
    level: "moderate",
    codeExample: "Standard Operating Procedure (SOP) Alignment"
  },
  {
    question: "What is the difference between inline code comments inside LET and tooltip comments in Name Manager?",
    shortAnswer: "Name Manager comments are visible to the end-user calling the function; LET internal variable names document the code for the author.",
    explanation: "Both work together: Name Manager documents external API; LET documents internal implementation.",
    hint: "External user API docs vs internal code readability.",
    level: "advanced",
    codeExample: "External Comment vs Internal LET Variables"
  },
  {
    question: "How do you document edge-case error returns in a LAMBDA comment?",
    shortAnswer: "Mention fallback behavior, e.g. 'Returns #N/A if account ID not found, 0 if negative amount passed'.",
    explanation: "Preparing users for potential error flags prevents unexpected calculation failures.",
    hint: "Document error conditions and fallback values.",
    level: "moderate",
    codeExample: "Comment: 'Returns 0 if principal <= 0'"
  },
  {
    question: "Can special formatting (e.g. currency or percentage) be specified in a LAMBDA documentation string?",
    shortAnswer: "Yes, you can recommend formatting in the comment, e.g. 'Format output cells as Currency (₹)'.",
    explanation: "Guides users on how to format dynamic spilled return cells.",
    hint: "Include recommended cell formatting instructions.",
    level: "basic",
    codeExample: "Comment: 'Format output as Percentage 0.00%'"
  },
  {
    question: "How does self-documentation protect proprietary corporate calculation intellectual property?",
    shortAnswer: "Users interact with the documented function interface without needing to understand or tamper with the complex internal mathematical formula.",
    explanation: "Encapsulation protects intellectual property while enabling full usability.",
    hint: "Encapsulates complex logic behind a clean, documented interface.",
    level: "expert",
    codeExample: "Encapsulation & IP Protection"
  },
  {
    question: "What tool allows batch editing and documentation of 50+ LAMBDA functions at once?",
    shortAnswer: "The Advanced Formula Environment (AFE) add-in by Microsoft Garage.",
    explanation: "AFE provides a unified code editor to document and synchronize multiple LAMBDAs simultaneously.",
    hint: "Advanced Formula Environment (AFE).",
    level: "advanced",
    codeExample: "Microsoft Advanced Formula Environment"
  },
  {
    question: "Can Name Manager comments be viewed in Excel for Web?",
    shortAnswer: "Yes, Excel for Web supports viewing defined names and displaying autocomplete tooltips in the web browser.",
    explanation: "Cloud compatibility ensures uniform documentation across desktop and web environments.",
    hint: "Supported in Excel for Web and Desktop.",
    level: "basic",
    codeExample: "Cross-Platform Tooltip Visibility"
  },
  {
    question: "How do you document recursive LAMBDAs to prevent users from causing infinite recursion?",
    shortAnswer: "Specify the recursion termination constraint, e.g. 'Max input value: 100 to prevent recursion stack overflow'.",
    explanation: "Protects end-users from triggering #NUM! stack depth errors.",
    hint: "Document input boundaries and recursion limits.",
    level: "expert",
    codeExample: "Comment: 'Recursive cleaner. Max string length: 1,000 chars'"
  },
  {
    question: "Why should documentation emphasize whether a LAMBDA is deterministic (pure function)?",
    shortAnswer: "Pure functions always return the same output for identical inputs, ensuring audit predictability.",
    explanation: "Documenting purity reassures auditors that the function does not depend on volatile state.",
    hint: "Pure functions have no volatile side-effects.",
    level: "expert",
    codeExample: "Pure Functional Guarantee"
  },
  {
    question: "How can you test how your LAMBDA documentation appears to an end-user?",
    shortAnswer: "Save in Name Manager, click any empty cell, type `=FX_` and inspect the autocomplete popup tooltip.",
    explanation: "Visual inspection confirms that comment text displays cleanly without truncation.",
    hint: "Type =FX_ in a cell to preview the autocomplete popup.",
    level: "basic",
    codeExample: "Preview in Autocomplete Dropdown"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for LAMBDA documentation?",
    shortAnswer: "A LAMBDA function is only 50% complete when the formula works; it is 100% complete only when its parameters and return types are fully documented in Name Manager for every team member to use effortlessly!",
    explanation: "Software-grade spreadsheet modeling requires professional documentation so that proprietary business logic remains clear, auditable, and maintainable for years to come!",
    hint: "Full parameter and return type documentation is mandatory for 100% completion.",
    level: "expert",
    codeExample: "Rule: Working Formula (50%) + Full Documentation (50%) = 100% Production Ready"
  }
];

export default questions;
