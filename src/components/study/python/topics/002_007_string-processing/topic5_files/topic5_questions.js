// src/components/study/python/topics/002_007_string-processing/topic5_files/topic5_questions.js
// Comprehensive Master Review Questions for Topic 5: Advanced Formatting

const questions = [
  {
    question: "What are Formatted String Literals (f-strings) in Python and why are they preferred?",
    shortAnswer: "f-strings (prefixed with 'f' or 'F') allow embedding Python expressions directly inside string literals using curly braces {}.",
    explanation: "Introduced in Python 3.6 (PEP 498), f-strings are evaluated at runtime directly into optimized CPython bytecode (BUILD_STRING opcode), making them substantially faster, cleaner, and more readable than str.format() or '%' formatting.",
    hint: "f-strings are prefixed with f and use {expression}.",
    level: "basic",
    codeExample: "name = 'Susmita'\nscore = 96.5\nprint(f'Student: {name}, Score: {score:.1f}%')  # 'Student: Susmita, Score: 96.5%'"
  },
  {
    question: "How do you format a floating-point number to exactly two decimal places inside an f-string?",
    shortAnswer: "{value:.2f}",
    explanation: "The specifier ':.2f' specifies fixed-point presentation ('f') rounded to 2 digits of precision.",
    hint: "Use :.2f.",
    level: "basic",
    codeExample: "price = 450.7854\nprint(f'Price: INR {price:.2f}')  # 'Price: INR 450.79' (Rounded!)"
  },
  {
    question: "How do you format large numbers with commas as thousands separators?",
    shortAnswer: "{value:,} or {value:,.2f}",
    explanation: "Adding a comma ',' in the format specification inserts commas at thousands groupings (e.g. 1,000,000).",
    hint: "Use :, in the specifier.",
    level: "basic",
    codeExample: "revenue = 1450000.5\nprint(f'Revenue: INR {revenue:,.2f}')  # 'Revenue: INR 1,450,000.50'"
  },
  {
    question: "How do you format a decimal number as a percentage in Python?",
    shortAnswer: "{value:.1%} or {value:.2%}",
    explanation: "The '%' format type multiplies the number by 100, displays it in fixed-point format with the specified precision, and appends a '%' sign.",
    hint: "Use :.1% or :.2%.",
    level: "basic",
    codeExample: "rate = 0.185\nprint(f'GST Rate: {rate:.1%}')  # 'GST Rate: 18.5%'"
  },
  {
    question: "How do you zero-pad an integer to a fixed length (e.g., 6 digits: 000942)?",
    shortAnswer: "{number:06d}",
    explanation: "The specifier ':06d' sets the minimum width to 6 and pads leading positions with zeros.",
    hint: "Use :06d.",
    level: "basic",
    codeExample: "serial = 942\nprint(f'INV-{serial:06d}')  # 'INV-000942'"
  },
  {
    question: "What do the alignment characters '<', '>', and '^' mean in format specifications?",
    shortAnswer: "'<' forces left-alignment, '>' forces right-alignment, and '^' forces center-alignment within the specified field width.",
    explanation: "By default, strings are left-aligned and numbers are right-aligned. You can override this using alignment operators (e.g., {name:<20}, {score:>10}, {title:^30}).",
    hint: "< = left, > = right, ^ = center.",
    level: "basic",
    codeExample: "title = 'Python'\nprint(f'{title:<10}')  # 'Python    '\nprint(f'{title:>10}')  # '    Python'\nprint(f'{title:^10}')  # '  Python  '"
  },
  {
    question: "How do you pad a string with custom characters instead of spaces (e.g., '****Python****')?",
    shortAnswer: "Specify the fill character immediately before the alignment operator: {value:*^14}",
    explanation: "The format specification syntax is [[fill]align][width]. For example, '*^14' uses '*' as the fill character, centers the string, and makes total width 14.",
    hint: "[fill][align][width]",
    level: "moderate",
    codeExample: "header = 'REPORT'\nprint(f'{header:=^24}')  # '=========REPORT========='"
  },
  {
    question: "What is the self-documenting debugging specifier f\"{variable=}\" introduced in Python 3.8?",
    shortAnswer: "Placing '=' after an expression prints both the expression text and its evaluated value, simplifying print debugging.",
    explanation: "Writing f'{x=}' outputs 'x=10'. It preserves whitespace inside braces and can be combined with format specifiers like f'{x * 2 = :.2f}'.",
    hint: "f'{x=}' prints variable name and its value.",
    level: "basic",
    codeExample: "user = 'Susmita'\nbalance = 4500.5\nprint(f'{user=}, {balance=:.2f}')  # 'user=\\'Susmita\\', balance=4500.50'"
  },
  {
    question: "How do you escape curly braces in an f-string to output literal '{' or '}'?",
    shortAnswer: "Use double curly braces: '{{' outputs '{' and '}}' outputs '}'.",
    explanation: "Because single curly braces denote replacement fields, doubling them tells Python to treat them as literal brace characters.",
    hint: "Double the curly braces {{ and }}.",
    level: "basic",
    codeExample: "user_id = 101\nprint(f'JSON: {{\"id\": {user_id}}}')  # 'JSON: {\"id\": 101}'"
  },
  {
    question: "What do the conversion flags !s, !r, and !a do inside an f-string?",
    shortAnswer: "!s calls str(), !r calls repr(), and !a calls ascii() on the expression before formatting.",
    explanation: "!r is particularly helpful in debugging because it displays string quotes and escape sequences (e.g. \\n, \\t).",
    hint: "!r displays repr(value).",
    level: "moderate",
    codeExample: "val = 'Barrackpore\\n'\nprint(f'{val!s}')  # Prints with newline\nprint(f'{val!r}')  # Prints 'Barrackpore\\n' with quotes"
  },
  {
    question: "How do you format datetime objects directly inside f-strings?",
    shortAnswer: "Use standard strftime format specifiers after a colon: f'{date:%Y-%m-%d %H:%M:%S}'",
    explanation: "Any valid strftime code (e.g. %Y for 4-digit year, %B for full month name, %I:%M %p for 12-hour clock) can be placed directly in the f-string specifier.",
    hint: "Use strftime directives after colon.",
    level: "moderate",
    codeExample: "from datetime import datetime\nnow = datetime(2026, 8, 24, 18, 30)\nprint(f'{now:%d-%b-%Y (%A)}')  # '24-Aug-2026 (Monday)'"
  },
  {
    question: "How do you convert an integer to binary, octal, and hexadecimal strings inside an f-string?",
    shortAnswer: "Use ':b' (binary), ':o' (octal), and ':x' or ':X' (hexadecimal). Use ':#' for prefix (0b, 0o, 0x).",
    explanation: "The alternate '#' modifier automatically prepends base prefixes: ':#b' -> 0b1101, ':#x' -> 0xff, ':#X' -> 0XFF.",
    hint: "b = binary, o = octal, x = hex.",
    level: "basic",
    codeExample: "num = 255\nprint(f'Binary: {num:#b}, Octal: {num:#o}, Hex: {num:#x}')\n# 'Binary: 0b11111111, Octal: 0o377, Hex: 0xff'"
  },
  {
    question: "What improvement did PEP 701 bring to f-strings in Python 3.12+?",
    shortAnswer: "It lifted restrictions on quotes, allowing arbitrary reuse of quotes, backslashes, comments, and multi-line expressions inside expressions.",
    explanation: "In Python 3.11 and earlier, reusing the same quote type inside an f-string expression caused syntax errors. In Python 3.12+, f-strings use a formalized grammar allowing quotes to be nested arbitrarily.",
    hint: "Python 3.12 allows arbitrary quote nesting inside f-strings.",
    level: "complex",
    codeExample: "data = {'name': 'Susmita'}\n# Valid in Python 3.12+ (double quotes inside double quotes):\n# print(f\"Student: {data[\"name\"]}\")"
  },
  {
    question: "When should you still use str.format() instead of f-strings?",
    shortAnswer: "When the template string is stored externally (e.g. in a database, JSON, or localization file) and resolved dynamically at runtime.",
    explanation: "f-strings are evaluated at the point of compilation/definition in code. If the user loads dynamic templates from a database, str.format() or string.Template is required.",
    hint: "Use str.format() when template is loaded dynamically at runtime.",
    level: "moderate",
    codeExample: "template_from_db = 'Welcome {name}, your balance is INR {bal:,.2f}'\nprint(template_from_db.format(name='Susmita', bal=4500.0))"
  },
  {
    question: "How do you unpack a dictionary into str.format()?",
    shortAnswer: "Using the dictionary unpacking operator **: template.format(**my_dict)",
    explanation: "Passing **my_dict unpacks its key-value pairs as named keyword arguments matching placeholder names.",
    hint: "Use **dict.",
    level: "basic",
    codeExample: "student = {'name': 'Rahul', 'dept': 'Python', 'marks': 92}\nmsg = 'Student {name} ({dept}) scored {marks}%'.format(**student)\nprint(msg)"
  },
  {
    question: "What is the difference between sign specifier '+' vs ' ' (space) in numeric formatting?",
    shortAnswer: "'+' always displays '+' for positive and '-' for negative; ' ' displays a leading space for positive and '-' for negative.",
    explanation: "The space specifier ' ' ensures positive and negative numbers align neatly in columns by giving positive numbers a leading space equal to the minus sign width.",
    hint: "+ forces plus sign; space aligns positive numbers with negative ones.",
    level: "moderate",
    codeExample: "pos, neg = 45.0, -45.0\nprint(f'{pos:+10.1f}\\n{neg:+10.1f}')\nprint(f'{pos: 10.1f}\\n{neg: 10.1f}')"
  },
  {
    question: "What does the '=' alignment specifier do in numeric formatting?",
    shortAnswer: "It pads after the sign but before the digits: e.g. f'{-5:=+10}' -> '-000000005'.",
    explanation: "The '=' sign-aware alignment places padding characters between the sign (+/-) and the actual numbers, ensuring column borders stay intact.",
    hint: "Pads between sign and digits.",
    level: "complex",
    codeExample: "val = -42.5\nprint(f'{val:=+10.2f}')  # '-    42.50'"
  },
  {
    question: "Can you dynamically specify the width or precision in an f-string?",
    shortAnswer: "Yes, by nesting an expression inside curly braces: f'{value:{width}.{precision}f}'",
    explanation: "f-strings support nested curly braces within the format specifier to control width and precision dynamically from variables.",
    hint: "Nest curly braces for dynamic width/precision.",
    level: "complex",
    codeExample: "val = 3.14159265\nw, p = 12, 3\nprint(f'Result: [{val:{w}.{p}f}]')  # 'Result: [       3.142]'"
  },
  {
    question: "Why is an f-string faster than str.format()?",
    shortAnswer: "f-strings are parsed during compilation and emit optimized bytecode instructions directly, eliminating runtime string parsing and function call overhead.",
    explanation: "str.format() has to parse the format string on every invocation and make an expensive Python function call. f-strings build the string in optimized C-level bytecodes.",
    hint: "f-strings are compiled directly to bytecode.",
    level: "moderate",
    codeExample: "# f-strings execute in ~20 nanoseconds in CPython"
  },
  {
    question: "How do you format an exponential / scientific notation number?",
    shortAnswer: "{value:.2e} or {value:.2E}",
    explanation: "The 'e' or 'E' format type formats the number in scientific notation with exponential power.",
    hint: "Use :.2e or :.2E.",
    level: "basic",
    codeExample: "speed_of_light = 299792458\nprint(f'c = {speed_of_light:.2e} m/s')  # 'c = 3.00e+08 m/s'"
  },
  {
    question: "How do you truncate a long string to a maximum number of characters using format specifications?",
    shortAnswer: "{string:.N} where N is the maximum allowed character count.",
    explanation: "When applied to strings, the precision specifier ('.N') acts as a truncation limit, extracting at most N characters.",
    hint: "Use :.N on strings to truncate.",
    level: "moderate",
    codeExample: "description = 'Coder and AccoTax Educational Tutorials Barrackpore'\nprint(f'{description:.15}')  # 'Coder and AccoT'"
  },
  {
    question: "What error occurs if you write an invalid expression like f'{1/0}' in an f-string?",
    shortAnswer: "ZeroDivisionError is raised at runtime when the f-string is evaluated.",
    explanation: "Because f-string replacement fields are genuine Python expressions, runtime exceptions (like ZeroDivisionError, NameError, IndexError) will be raised normally.",
    hint: "Standard Python exceptions are raised.",
    level: "basic",
    codeExample: "try:\n    f'{10/0}'\nexcept ZeroDivisionError as e:\n    print(e)  # division by zero"
  },
  {
    question: "How can you print a centered banner with equals signs: '========== PYTHON =========='?",
    shortAnswer: "f'{title: =^30}' or f'{title:=^30}'",
    explanation: "Using '=' as the fill character with '^' center alignment and width 30 surrounds the title with equal signs.",
    hint: "Use :=^30.",
    level: "basic",
    codeExample: "title = ' PYTHON '\nprint(f'{title:=^30}')  # '=========== PYTHON ==========='"
  },
  {
    question: "How does the underscore grouping separator (:_) differ from comma grouping (:,)?",
    shortAnswer: "It uses underscores '_' instead of commas ',' as thousands separators.",
    explanation: "Underscore separators match Python's integer literal syntax (e.g. 1_000_000) and can also group binary numbers in nibbles: f'{0b11010110:_b}' -> '1101_0110'.",
    hint: "Underscores match Python code literal style.",
    level: "moderate",
    codeExample: "num = 1000000\nprint(f'{num:_}')     # '1_000_000'\nbyte_val = 0b11010110\nprint(f'{byte_val:_b}') # '1101_0110'"
  },
  {
    question: "Can an f-string span multiple lines in Python?",
    shortAnswer: "Yes, by using triple quotes (f'''...''' or f\"\"\"...\"\"\") or string literal concatenation across lines.",
    explanation: "Multi-line f-strings support newline preservation or implicit concatenation inside parentheses.",
    hint: "Use triple quotes or parenthesized concatenation.",
    level: "basic",
    codeExample: "name = 'Susmita'\nrole = 'Developer'\nmsg = (\n    f'Student: {name}\\n'\n    f'Role: {role}'\n)\nprint(msg)"
  }
];

export default questions;
