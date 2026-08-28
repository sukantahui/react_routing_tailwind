const questions = [
  {
    question: "What is Automatic Semicolon Insertion (ASI) in JavaScript?",
    shortAnswer: "A grammar parser feature where the engine automatically inserts semicolons at certain line breaks if omitted.",
    explanation: "ASI allows developers to omit semicolons in most statements. However, strict rules dictate where semicolons are inserted and where omitting them causes syntax bugs.",
    hint: "Parser automatically inserts virtual semicolons at statement boundaries.",
    level: "basic",
    codeExample: "let a = 10\nlet b = 20\n// ASI inserts ';' at end of each line"
  },
  {
    question: "Why does placing an object literal on a new line after 'return' return undefined?",
    shortAnswer: "'return' is a restricted production; ASI immediately inserts a semicolon after 'return', returning undefined.",
    explanation: "The engine interprets 'return\n{ a: 1 }' as 'return; { a: 1 };', exiting the function before evaluating the object literal.",
    hint: "Newline after return triggers automatic semicolon insertion.",
    level: "intermediate",
    codeExample: "function test() {\n  return // ASI inserts ';' here!\n  { name: 'Swadeep' };\n}\nconsole.log(test()); // undefined"
  },
  {
    question: "What are Restricted Productions in the ECMAScript specification?",
    shortAnswer: "Grammar rules where no LineTerminator (newline) is permitted between the keyword and its following expression.",
    explanation: "Includes return, throw, break, continue, yield, and postfix ++/-- operators. If a newline appears, ASI inserts a semicolon immediately.",
    hint: "return, throw, break, continue, yield, postfix ++/--.",
    level: "advanced",
    codeExample: "// 'throw\n new Error()' -> SyntaxError because ASI inserts ';' after throw"
  },
  {
    question: "What happens when a statement starting with '(' or '[' follows a line without a semicolon?",
    shortAnswer: "ASI does NOT insert a semicolon; the engine treats it as a function call or array index on the previous value.",
    explanation: "Writing 'const x = 5\n(function() {})()' evaluates to '5(...)', throwing 'TypeError: 5 is not a function'.",
    hint: "Leading '(' or '[' attaches to the previous line as a function call or bracket access.",
    level: "intermediate",
    codeExample: "const a = 42;\n// Without semicolon: 42(function(){}) throws TypeError"
  },
  {
    question: "What is the defensive semicolon pattern in JavaScript?",
    shortAnswer: "Prefixing an IIFE or array literal with a semicolon (e.g. ;(function() {})()) to prevent concatenation collisions.",
    explanation: "Defensive semicolons protect standalone modules from attaching to un-semicoloned preceding lines when files are concatenated.",
    hint: "Leading ';' before IIFE: ;(function() { ... })();",
    level: "intermediate",
    codeExample: ";(function() {\n  console.log('Safe from preceding script collisions');\n})();"
  },
  {
    question: "What are the rules for valid JavaScript identifier names?",
    shortAnswer: "Must start with a Unicode letter, $, or _; subsequent characters can include letters, digits, $, and _.",
    explanation: "Identifiers cannot start with numbers and cannot match reserved keywords like 'class', 'function', 'return', or 'const'.",
    hint: "Starts with letter, $, or _; followed by letters, digits, $, _.",
    level: "basic",
    codeExample: "const $price = 100;\nconst _privateKey = 'xyz';\nconst student1 = 'Tuhina';"
  },
  {
    question: "What is JSDoc and how does it enhance JavaScript development?",
    shortAnswer: "A standardized markup comment format (/** ... */) providing TypeScript-like type checking and IDE IntelliSense.",
    explanation: "JSDoc annotations (@param, @returns, @type, @typedef) allow editors like VS Code to show autocompletion and catch type errors in plain JS files.",
    hint: "/** @param {string} name */ comments providing IDE type safety.",
    level: "basic",
    codeExample: "/**\n * @param {number} a\n * @param {number} b\n * @returns {number}\n */\nfunction add(a, b) { return a + b; }"
  },
  {
    question: "What are Numeric Separators (ES2021) in JavaScript numbers?",
    shortAnswer: "Using underscores (_) inside numeric literals to improve visual readability without changing their numeric value.",
    explanation: "1_000_000 is identical to 1000000. It can be used in decimal, binary (0b1010_0001), hex (0xFF_00_AA), and BigInt (1_000_000n).",
    hint: "Underscores in numbers: 1_000_000.",
    level: "basic",
    codeExample: "const budget = 5_00_000; // 5 Lakhs INR"
  },
  {
    question: "How does JavaScript treat single-line and multi-line comments?",
    shortAnswer: "// for single-line comments; /* ... */ for multi-line comments; both are stripped by the engine during tokenization.",
    explanation: "Comments have zero runtime cost in memory or execution speed, as the tokenizer discards them before bytecode compilation.",
    hint: "// and /* ... */ are discarded during lexical scanning.",
    level: "basic",
    codeExample: "// Single line\n/* Multi-line comment */"
  },
  {
    question: "Can multi-line comments (/* ... */) be nested inside each other in JavaScript?",
    shortAnswer: "No, nesting multi-line comments throws a SyntaxError because the first */ closes the entire comment block.",
    explanation: "/* outer /* inner */ outer */ will fail because the first */ terminates the comment, leaving the trailing 'outer */' as invalid syntax.",
    hint: "Nested /* ... */ comments are illegal in JavaScript syntax.",
    level: "intermediate",
    codeExample: "/* Outer comment /* Inner comment */ Still comment? NO -> SyntaxError */"
  },
  {
    question: "What are Contextual Keywords in JavaScript?",
    shortAnswer: "Words like 'async', 'await', 'get', 'set', and 'of' that act as keywords only in specific syntactic contexts.",
    explanation: "Outside an async function, 'await' can be used as a variable name in sloppy mode, but inside an async function or module it is a reserved keyword.",
    hint: "Keywords only in specific syntax contexts (e.g. async/await, get/set).",
    level: "advanced",
    codeExample: "const get = 'Allowed as variable name in non-accessor context';"
  },
  {
    question: "How does JavaScript handle whitespace and line breaks in expressions?",
    shortAnswer: "Whitespace, tabs, and newlines are generally ignored between tokens, allowing flexible multi-line formatting.",
    explanation: "Except in strings and Restricted Productions, developers can split binary operators, array elements, and chained methods across lines.",
    hint: "Whitespace is ignored between tokens except around ASI restricted keywords.",
    level: "basic",
    codeExample: "const total = 10 +\n  20 +\n  30; // 60 (Valid multi-line expression)"
  },
  {
    question: "What is the difference between Semicolon (Semicolon-Required) and Semicolon-Less styles?",
    shortAnswer: "Semicolon style uses explicit semicolons everywhere; Semicolon-less relies on ASI and uses defensive semicolons for leading '(' or '['.",
    explanation: "StandardJS advocates for semicolon-less, while Prettier defaults to explicit semicolons to eliminate all ASI edge-case ambiguities.",
    hint: "Prettier default uses semicolons; StandardJS omits semicolons with defensive rules.",
    level: "intermediate",
    codeExample: "// Prettier default: const a = 1; (Explicit semicolon)"
  },
  {
    question: "How does postfix ++ interact with ASI on a new line?",
    shortAnswer: "Writing 'x\n++' parses as 'x;' followed by '++' (SyntaxError) because postfix ++ forbids a preceding newline.",
    explanation: "The postfix ++ operator cannot have a LineTerminator between the identifier and ++. Prefix ++ on next line (++x) is valid.",
    hint: "Postfix ++ cannot be separated from variable by a newline.",
    level: "expert",
    codeExample: "// x\n// ++ -> ASI inserts ';' making it: x; ++ (SyntaxError)"
  },
  {
    question: "What are Shebang / Hashbang (#!) comments in JavaScript (ES2023)?",
    shortAnswer: "A leading '#!/usr/bin/env node' comment on line 1 directing Unix operating systems to execute the script with Node.js.",
    explanation: "Standardized in ECMAScript 2023, JS engines now officially ignore hashbang lines at the very beginning of files as valid comments.",
    hint: "#!/usr/bin/env node on line 1 for CLI executables.",
    level: "intermediate",
    codeExample: "#!/usr/bin/env node\nconsole.log('CLI Executable');"
  },
  {
    question: "What is the tokenization phase in the JavaScript compilation pipeline?",
    shortAnswer: "The first phase where the Lexer scans raw source characters and breaks them into discrete syntactic tokens.",
    explanation: "Tokens (Identifiers, Keywords, Numbers, Strings, Punctuators) are then passed to the Parser to construct the Abstract Syntax Tree (AST).",
    hint: "Source Code -> Lexer (Tokens) -> Parser (AST) -> Bytecode.",
    level: "advanced",
    codeExample: "// 'let x = 10' -> [KEYWORD: let, IDENTIFIER: x, PUNCTUATOR: =, NUMBER: 10]"
  },
  {
    question: "What is an Abstract Syntax Tree (AST)?",
    shortAnswer: "A tree representation of the syntactic structure of source code used by compilers, Babel, and ESLint.",
    explanation: "AST nodes represent variable declarations, expressions, loops, and function definitions, allowing linters and transpilers to analyze and transform code.",
    hint: "Tree data structure representing code syntax hierarchy.",
    level: "advanced",
    codeExample: "// ESLint and Babel traverse AST nodes to detect errors and transpile JSX"
  },
  {
    question: "Can variable names in JavaScript include emojis?",
    shortAnswer: "No, emojis are not classified as valid Unicode ID_Start or ID_Continue characters in ECMAScript grammar.",
    explanation: "While non-Latin Unicode characters (e.g. Bengali, Greek, Chinese) are valid, emojis belong to symbols and cause SyntaxError as identifiers.",
    hint: "Emojis are symbols, not valid identifier characters.",
    level: "intermediate",
    codeExample: "// const 🚀 = 'rocket'; // SyntaxError: Invalid or unexpected token"
  },
  {
    question: "What is the difference between single quotes, double quotes, and template literals for strings?",
    shortAnswer: "Single and double quotes create standard strings; template literals (`...`) allow multi-line strings and interpolation (${...}).",
    explanation: "Template literals evaluate embedded expressions at runtime and preserve physical newlines without needing \n escape sequences.",
    hint: "Template literals (`...`) support ${} interpolation and multi-line formatting.",
    level: "basic",
    codeExample: "const name = 'Swadeep';\nconsole.log(`Hello ${name}!`);"
  },
  {
    question: "What happens if a regex literal follows a division operator on adjacent lines without semicolons?",
    shortAnswer: "The engine may parse the regex slash as another division operator, causing a syntax or runtime calculation error.",
    explanation: "Because '/' is overloaded for both division and regular expressions, explicit semicolons prevent ambiguous token parsing.",
    hint: "Semicolons disambiguate division from regular expression literals.",
    level: "expert",
    codeExample: "const x = 10 / 2;\nconst reg = /test/g;"
  },
  {
    question: "What is the JSDoc @param and @returns tag format?",
    shortAnswer: "@param {Type} name - description, and @returns {Type} description.",
    explanation: "Standard tags used to document function inputs and output contracts, enabling type validation in IDEs without compilation.",
    hint: "@param {Type} and @returns {Type}.",
    level: "basic",
    codeExample: "/** @param {string} id @returns {boolean} */"
  },
  {
    question: "What is JSDoc @deprecated tag used for?",
    shortAnswer: "Marks a function or property as obsolete, causing IDEs to display strikethrough warnings on its usages.",
    explanation: "Alerts team members that a method will be removed in future releases and points them to modern alternative APIs.",
    hint: "@deprecated tag renders strikethrough in VS Code.",
    level: "basic",
    codeExample: "/** @deprecated Use fetchStudentV2() instead */\nfunction fetchStudentOld() {}"
  },
  {
    question: "What are Zero-Width Spaces and why can they cause invisible JavaScript syntax errors?",
    shortAnswer: "Invisible Unicode characters (e.g. \u200B) copied from web pages that cause mysterious SyntaxErrors in JavaScript code.",
    explanation: "Because they look identical to regular empty space in editors, they trigger 'Unexpected token' errors until stripped by a linter or hex viewer.",
    hint: "Invisible Unicode space characters copied from websites causing parse errors.",
    level: "expert",
    codeExample: "// VS Code highlights invisible non-breaking characters with red boxes"
  },
  {
    question: "What is the recommended Prettier / ESLint rule for semicolons in enterprise teams?",
    shortAnswer: "Configure 'semi: true' in Prettier to enforce explicit semicolons and eliminate all ASI ambiguity.",
    explanation: "Explicit semicolons ensure deterministic code execution regardless of code formatting changes or build tool bundler concatenations.",
    hint: "Configure Prettier 'semi: true' for safe deterministic builds.",
    level: "basic",
    codeExample: "{\\n  \\\"semi\\\": true,\\n  \\\"singleQuote\\\": true\\n}"
  },
  {
    question: "What is the core takeaway regarding JavaScript Lexical Grammar for professional engineers?",
    shortAnswer: "Understanding how the lexer tokenizes code and how ASI functions prevents subtle runtime bugs and ensures clean, readable architectures.",
    explanation: "Knowing restricted productions and using automated formatters (Prettier) allows developers to write robust, maintainable code effortlessly.",
    hint: "Master ASI rules, write explicit semicolons, and leverage JSDoc for bulletproof code.",
    level: "basic",
    codeExample: "// Writing clean, unambiguous code is the hallmark of a Senior Engineer"
  }
];

export default questions;
