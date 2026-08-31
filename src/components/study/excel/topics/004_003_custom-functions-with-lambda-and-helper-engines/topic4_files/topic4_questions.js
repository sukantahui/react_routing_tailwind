// topic4_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 4
// Topic: Handling optional parameters with ISOMITTED and default value assignment
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "How do you declare an optional parameter in an Excel LAMBDA function signature?",
    shortAnswer: "By wrapping the parameter name in square brackets [ ] in the parameter list.",
    explanation: "For example, =LAMBDA(base_rate, [discount_pct], ...) marks discount_pct as an optional argument that users may omit.",
    hint: "Enclose parameter in square brackets [ ].",
    level: "basic",
    codeExample: "=LAMBDA(rate, [discount], ...)"
  },
  {
    question: "Which native Excel function checks whether an optional parameter was omitted by the caller?",
    shortAnswer: "=ISOMITTED(parameter_name)",
    explanation: "ISOMITTED returns TRUE if the user left the argument blank or omitted it during function invocation; otherwise FALSE.",
    hint: "ISOMITTED tests for missing parameters.",
    level: "basic",
    codeExample: "=ISOMITTED(discount)"
  },
  {
    question: "How do you assign a default fallback value (e.g. 5% discount) when an optional parameter is omitted?",
    shortAnswer: "=LET(d, IF(ISOMITTED(discount), 0.05, discount), rate * (1 - d))",
    explanation: "Using IF with ISOMITTED assigns the fallback constant (0.05) if omitted, or adopts the caller's value if supplied.",
    hint: "IF(ISOMITTED(p), default_val, p).",
    level: "basic",
    codeExample: "LET(d, IF(ISOMITTED(disc), 0.05, disc), ...)"
  },
  {
    question: "What value does an unhandled omitted parameter return if referenced directly in a mathematical formula without ISOMITTED?",
    shortAnswer: "It acts as a missing argument, causing arithmetic errors or unexpected 0/blank behavior.",
    explanation: "Referencing an omitted parameter directly without ISOMITTED or default fallback handling can trigger calculation errors.",
    hint: "Direct math on omitted parameters triggers calculation errors.",
    level: "moderate",
    codeExample: "Missing argument arithmetic failure"
  },
  {
    question: "Can a required (non-optional) parameter be placed after an optional parameter in the parameter list?",
    shortAnswer: "No, all optional parameters [ ] must be placed after all required parameters at the end of the parameter list.",
    explanation: "Excel requires mandatory parameters to come first so positional argument binding is unambiguous.",
    hint: "Optional parameters must appear at the end of the list.",
    level: "moderate",
    codeExample: "Valid: LAMBDA(p, [d]) | Invalid: LAMBDA([d], p)"
  },
  {
    question: "How does a user skip an optional parameter when calling a function with multiple optional arguments?",
    shortAnswer: "By leaving the argument space empty between commas, e.g. =MY_FUNC(100, , \"High\").",
    explanation: "Excel treats empty comma slots as omitted, allowing ISOMITTED to detect them individually.",
    hint: "Leave argument blank between commas: (val1, , val3).",
    level: "basic",
    codeExample: "=CALC_FEE(5000, , 0.18)"
  },
  {
    question: "Can ISOMITTED be used outside of a LAMBDA function in standard worksheet cells?",
    shortAnswer: "No, ISOMITTED is designed exclusively for inspecting parameters within LAMBDA function definitions.",
    explanation: "Attempting to call ISOMITTED on standard worksheet cells returns a #VALUE! error.",
    hint: "ISOMITTED only works inside LAMBDAs.",
    level: "moderate",
    codeExample: "#VALUE! error outside LAMBDA"
  },
  {
    question: "How do you build a room booking calculation where GST is optional (default 18%) and discount is optional (default 0%)?",
    shortAnswer: "CALC_ROOM = LAMBDA(rate, [gst], [disc], LET(g, IF(ISOMITTED(gst), 0.18, gst), d, IF(ISOMITTED(disc), 0, disc), rate * (1 - d) * (1 + g)))",
    explanation: "Declares two trailing optional parameters and assigns respective defaults using LET and IF(ISOMITTED()).",
    hint: "Nest multiple IF(ISOMITTED()) checks inside LET.",
    level: "advanced",
    codeExample: "=LAMBDA(r, [g], [d], LET(g_val, IF(ISOMITTED(g), 0.18, g), ...))"
  },
  {
    question: "What does ISOMITTED return if a caller passes an empty text string \"\" rather than omitting the argument?",
    shortAnswer: "FALSE (because an argument was supplied, even though it is an empty string).",
    explanation: "ISOMITTED tests specifically for the absence of an argument, not whether an argument is blank text or zero.",
    hint: "Returns FALSE if \"\" is explicitly passed.",
    level: "advanced",
    codeExample: "ISOMITTED(\"\") → FALSE"
  },
  {
    question: "What does ISOMITTED return if a caller passes a cell reference containing an empty blank cell?",
    shortAnswer: "FALSE (passing a cell reference counts as providing an argument that evaluates to 0 or blank).",
    explanation: "To handle blank cell inputs as defaults, combine ISOMITTED with OR(ISOMITTED(p), p=\"\").",
    hint: "Cell references count as supplied arguments; combine with p=\"\".",
    level: "expert",
    codeExample: "IF(OR(ISOMITTED(p), p=\"\"), default_val, p)"
  },
  {
    question: "How many optional parameters can a single LAMBDA function define?",
    shortAnswer: "Up to 253 optional parameters (within the overall 253 parameter limit).",
    explanation: "All parameter slots can theoretically be optional if desired.",
    hint: "Up to the 253 parameter limit.",
    level: "moderate",
    codeExample: "Max 253 optional parameters"
  },
  {
    question: "How can you test an optional-parameter LAMBDA in an active cell with immediate execution?",
    shortAnswer: "=(LAMBDA(price, [disc], LET(d, IF(ISOMITTED(disc), 0.05, disc), price * (1 - d))))(1000)",
    explanation: "Passing only 1 argument (1000) causes ISOMITTED(disc) to return TRUE and adopt 0.05, returning 950.",
    hint: "Omit the trailing argument in parentheses.",
    level: "basic",
    codeExample: "=(LAMBDA(p, [d], IF(ISOMITTED(d), p*0.95, p*(1-d))))(1000)"
  },
  {
    question: "What is the primary user-experience advantage of optional parameters in corporate models?",
    shortAnswer: "They simplify common standard use-cases for junior analysts while retaining full customization power for advanced users.",
    explanation: "Users only provide base inputs for 90% of calculations, but can override tax or discount rates when needed.",
    hint: "Simplifies everyday usage while allowing advanced overrides.",
    level: "moderate",
    codeExample: "Sensible Defaults Pattern"
  },
  {
    question: "How should optional parameters be documented in Name Manager comments?",
    shortAnswer: "Enclose parameter names in brackets [ ] and explicitly note default fallbacks: `[disc_rate=5%]`.",
    explanation: "Informing users of default behavior prevents unexpected calculation surprises.",
    hint: "Document default fallback values in brackets [ ].",
    level: "basic",
    codeExample: "Comment: 'FX_FEE(rate, [discount_pct=5%])'"
  },
  {
    question: "Can an optional parameter take an array or range as input when supplied?",
    shortAnswer: "Yes, optional parameters accept scalar numbers, text, or multi-cell arrays.",
    explanation: "Excel preserves full dynamic array semantics for optional parameters.",
    hint: "Accepts scalars and dynamic arrays alike.",
    level: "moderate",
    codeExample: "=FX_CALC(A2#, [B2#])"
  },
  {
    question: "What happens if a user provides 3 arguments to a LAMBDA that has 1 required and 1 optional parameter?",
    shortAnswer: "Excel blocks entry with a 'Too many arguments' alert or returns a #VALUE! error.",
    explanation: "Total supplied arguments cannot exceed the total declared parameter count.",
    hint: "Argument count cannot exceed declared parameters.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "How does default assignment with LET prevent repeating ISOMITTED checks across a large formula?",
    shortAnswer: "By resolving all optional defaults at the top of the LET declaration, the rest of the formula uses clean sanitized variable names.",
    explanation: "Sanitizing optional variables once at the start of LET keeps the core mathematical calculation clean.",
    hint: "Resolve defaults at the top of LET.",
    level: "advanced",
    codeExample: "LET(d, IF(ISOMITTED(disc), 0.05, disc), g, IF(ISOMITTED(gst), 0.18, gst), ...)"
  },
  {
    question: "Can optional parameters be used inside recursive LAMBDAs?",
    shortAnswer: "Yes, optional parameters can serve as accumulator counters or state trackers in recursive functions.",
    explanation: "Callers invoke the function with initial inputs; subsequent recursive calls pass explicit state into the optional parameter.",
    hint: "Useful for tracking state/iteration in recursive loops.",
    level: "expert",
    codeExample: "RECURSE = LAMBDA(text, [step], LET(s, IF(ISOMITTED(step), 1, step), ...))"
  },
  {
    question: "What error occurs if you place brackets [ ] around a required parameter in the middle of the signature?",
    shortAnswer: "If a required parameter follows an optional parameter, Excel flags a formula syntax error.",
    explanation: "All bracketed optional parameters must appear at the end of the argument signature.",
    hint: "Optional parameters must be trailing.",
    level: "moderate",
    codeExample: "Syntax Error: Optional parameter precedes required parameter"
  },
  {
    question: "How do you test whether an optional boolean parameter was provided?",
    shortAnswer: "IF(ISOMITTED(is_express), FALSE, is_express)",
    explanation: "Defaults to standard delivery (FALSE) unless the caller explicitly passes TRUE.",
    hint: "Defaults boolean flags to FALSE or TRUE gracefully.",
    level: "basic",
    codeExample: "LET(exp, IF(ISOMITTED(is_express), FALSE, is_express), ...)"
  },
  {
    question: "How do you create an optional string prefix parameter (e.g. default \"INV-\")?",
    shortAnswer: "LET(pfx, IF(ISOMITTED(prefix), \"INV-\", prefix), pfx & id)",
    explanation: "Applies 'INV-' prefix by default, allowing users to override with 'REC-' or 'PO-'.",
    hint: "Defaults string prefix to 'INV-'.",
    level: "basic",
    codeExample: "LET(p, IF(ISOMITTED(prefix), \"INV-\", prefix), p & id)"
  },
  {
    question: "Can a LAMBDA define ALL of its parameters as optional?",
    shortAnswer: "Yes, a LAMBDA like =LAMBDA([p1], [p2], ...) can have 100% optional parameters.",
    explanation: "Invoking =MY_FUNC() with no arguments uses all default values.",
    hint: "Yes, all parameters can be marked optional.",
    level: "moderate",
    codeExample: "ALL_OPT = LAMBDA([rate], [term], ...)"
  },
  {
    question: "How does ISOMITTED behave when used inside helper functions like MAP or BYROW?",
    shortAnswer: "In helper functions, arrays pass elements into the LAMBDA, so parameters are always supplied and ISOMITTED returns FALSE.",
    explanation: "Helper functions iterate over arrays and pass concrete element values into every iteration.",
    hint: "Helper functions always pass concrete values.",
    level: "advanced",
    codeExample: "MAP iteration supplies arguments"
  },
  {
    question: "Why should corporate financial models avoid hardcoding magic numbers directly in cell formulas when optional LAMBDAs are available?",
    shortAnswer: "Because optional LAMBDA parameters provide a centralized, documented default while still allowing audit-safe parameter overrides.",
    explanation: "Centralized defaults in Name Manager eliminate rogue hardcoded constants scattered across sheets.",
    hint: "Centralizes default rates in Name Manager.",
    level: "moderate",
    codeExample: "Eliminate Rogue Hardcoded Numbers"
  },
  {
    question: "What is the recommended fallback pattern when an optional argument can be omitted OR passed as a blank cell?",
    shortAnswer: "LET(clean_val, IF(ISOMITTED(opt_arg), default_val, IF(opt_arg=\"\", default_val, opt_arg)), ...)",
    explanation: "Handles both genuine formula omissions and blank cell references gracefully.",
    hint: "Dual-check for ISOMITTED and blank text \"\".",
    level: "expert",
    codeExample: "IF(ISOMITTED(x), 0.05, IF(x=\"\", 0.05, x))"
  },
  {
    question: "How does Ctrl+Shift+A represent optional parameters in formula placeholder text?",
    shortAnswer: "Excel inserts optional parameter names with square brackets, e.g. =CALC(base, [disc], [tax]).",
    explanation: "Square brackets in the formula bar immediately tell the user which arguments can be safely skipped.",
    hint: "Inserts bracketed placeholders: [opt_param].",
    level: "basic",
    codeExample: "=FX_RATE(base_rate, [discount_pct])"
  },
  {
    question: "Can an optional parameter default be dynamic (e.g. TODAY() or another calculation)?",
    shortAnswer: "Yes, the fallback expression can be any valid Excel formula: IF(ISOMITTED(dt), TODAY(), dt).",
    explanation: "Fallback expressions are fully dynamic and evaluate in real-time.",
    hint: "Fallbacks can be dynamic formulas like TODAY().",
    level: "moderate",
    codeExample: "IF(ISOMITTED(report_date), TODAY(), report_date)"
  },
  {
    question: "How do you test an optional parameter with multiple cascading defaults in LET?",
    shortAnswer: "LET(rate, IF(ISOMITTED(r), 0.18, r), penalty, IF(ISOMITTED(p), rate * 0.10, p), ...)",
    explanation: "Later defaults can reference earlier resolved variables within LET scope.",
    hint: "Cascading defaults in sequential LET declarations.",
    level: "advanced",
    codeExample: "LET(r, IF(ISOMITTED(r_in), 0.18, r_in), p, IF(ISOMITTED(p_in), r*0.1, p_in), ...)"
  },
  {
    question: "What happens if you invoke a 2-parameter LAMBDA with 1 required and 1 optional parameter by passing only a comma: `=FUNC(,)`?",
    shortAnswer: "The first (required) parameter receives blank/0 and the second (optional) parameter is omitted.",
    explanation: "Passing an empty first slot evaluates as blank for the required parameter.",
    hint: "Evaluates as blank for the first parameter.",
    level: "moderate",
    codeExample: "=FUNC(,)"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for optional parameter engineering?",
    shortAnswer: "Always place optional parameters at the end of the signature [in brackets], sanitize them immediately using `IF(ISOMITTED(), default, param)` at the top of LET, and document every default value in Name Manager comments!",
    explanation: "Adhering to this structured pattern guarantees that custom functions provide an intuitive, error-free experience for end-users across the entire corporate hierarchy!",
    hint: "Trailing brackets, LET sanitization at top, and explicit default comments.",
    level: "expert",
    codeExample: "Architecture: =LAMBDA(req, [opt], LET(val, IF(ISOMITTED(opt), default, opt), ...))"
  }
];

export default questions;
