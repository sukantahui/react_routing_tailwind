const topic8_questions = [
  {
    "question": "What does the precision flag '%.2f' mean in Java formatting?",
    "shortAnswer": "It rounds the floating-point number to exactly 2 decimal places.",
    "explanation": "If the number has more decimal places, it rounds mathematically (e.g. 3.14159 -> 3.14). If it has fewer, it pads with trailing zeros (e.g. 3.1 -> 3.10).",
    "hint": ".2 specifies exactly 2 digits after the decimal point.",
    "level": "basic",
    "codeExample": "System.out.printf(\"%.2f\", 3.14159); // 3.14\nSystem.out.printf(\"%.2f\", 5.0);     // 5.00"
  },
  {
    "question": "What is the default alignment for formatted output, and how do you left-align?",
    "shortAnswer": "Default is right-aligned; prefix the width with a minus flag '-' to left-align.",
    "explanation": "For example, '%10s' right-aligns in a 10-character column with leading spaces. '%-10s' left-aligns with trailing spaces.",
    "hint": "Minus flag '-' forces left alignment.",
    "level": "basic",
    "codeExample": "System.out.printf(\"[%10s]%n\", \"cat\");  // [       cat]\nSystem.out.printf(\"[-%10s]%n\", \"cat\"); // [cat       ]"
  },
  {
    "question": "What does the zero-padding flag '0' do (e.g. '%05d')?",
    "shortAnswer": "It pads the integer with leading zeros instead of spaces to reach the specified column width.",
    "explanation": "For integer 42, '%05d' produces '00042'. Essential for serial numbers, time displays (09:05), and fixed-width protocol frames.",
    "hint": "0 flag pads with leading zeros.",
    "level": "basic",
    "codeExample": "System.out.printf(\"%02d:%02d\", 9, 5); // 09:05"
  },
  {
    "question": "Can the '0' flag and '-' flag be used together (e.g. '%-05d')?",
    "shortAnswer": "No! It throws an IllegalFormatFlagsException.",
    "explanation": "Zero-padding is only valid with right-alignment. Left-aligning with zero-padding would change the numeric value (e.g. 42000 instead of 42), which Java prohibits.",
    "hint": "Left-alignment and zero-padding are mutually exclusive.",
    "level": "moderate"
  },
  {
    "question": "What does the comma flag ',' do (e.g. '%,d' or '%,.2f')?",
    "shortAnswer": "It inserts locale-specific thousands grouping separators into numbers.",
    "explanation": "In US locale, 1000000 formats as '1,000,000'. In German locale, it formats as '1.000.000'.",
    "hint": "Comma flag adds thousands grouping separators.",
    "level": "basic",
    "codeExample": "System.out.printf(\"%,d\", 10000000); // 10,000,000"
  },
  {
    "question": "What does the plus flag '+' do (e.g. '%+d')?",
    "shortAnswer": "It forces the display of a '+' sign for positive numbers as well as '-' for negative numbers.",
    "explanation": "Standard formatting only shows '-' for negatives. '%+d' ensures both signs are always explicitly rendered.",
    "hint": "Always includes a sign (+ or -).",
    "level": "basic",
    "codeExample": "System.out.printf(\"%+d | %+d\", 25, -25); // +25 | -25"
  },
  {
    "question": "What does the space flag ' ' do (e.g. '% d')?",
    "shortAnswer": "It inserts a leading space for positive numbers to ensure positive and negative numbers align vertically in columns.",
    "explanation": "Positive numbers get a space where negative numbers get a '-'.",
    "hint": "Leaves a space for positive numbers for column alignment.",
    "level": "moderate",
    "codeExample": "System.out.printf(\"% d%n% d%n\", 50, -50);"
  },
  {
    "question": "What does the parenthesis flag '(' do (e.g. '%(d')?",
    "shortAnswer": "It encloses negative numbers in parentheses instead of printing a minus sign (accounting format).",
    "explanation": "In financial ledger reports, negative numbers are conventionally represented as '(500)' instead of '-500'.",
    "hint": "Financial negative number style using parentheses.",
    "level": "moderate",
    "codeExample": "System.out.printf(\"%(d\", -500); // (500)"
  },
  {
    "question": "How does argument indexing work (e.g. '%1$s %2$s %1$s')?",
    "shortAnswer": "The 'index$' syntax specifies exactly which argument in the argument list to use, allowing arguments to be reordered or reused.",
    "explanation": "'%1$s' references the 1st argument, '%2$s' references the 2nd argument. This allows you to repeat values without passing them multiple times.",
    "hint": "1$ references argument 1, 2$ references argument 2.",
    "level": "moderate",
    "codeExample": "System.out.printf(\"%1$s says: %2$s! %1$s says bye.\", \"Alice\", \"Hello\");"
  },
  {
    "question": "What does the relative indexing flag '<' mean (e.g. '%d %<x')?",
    "shortAnswer": "It reuses the exact same argument that was used by the previous format specifier.",
    "explanation": "In '%d (hex: %<x)', the second specifier uses '<' to format the same integer in hexadecimal without passing it twice in the argument list.",
    "hint": "< repeats the previous argument.",
    "level": "advanced",
    "codeExample": "System.out.printf(\"%d in hex is %<X\", 255); // 255 in hex is FF"
  },
  {
    "question": "What does precision mean when applied to a String ('%.5s')?",
    "shortAnswer": "It specifies the MAXIMUM number of characters to extract and display from the string (truncating if longer).",
    "explanation": "For numbers, precision specifies decimal places. For strings, it specifies the maximum character limit.",
    "hint": "Truncates the string to at most N characters.",
    "level": "moderate",
    "codeExample": "System.out.printf(\"%.3s\", \"Antigravity\"); // Ant"
  },
  {
    "question": "What happens if width is smaller than the actual number of digits or characters?",
    "shortAnswer": "The width is ignored and the full value is printed in its entirety without truncation.",
    "explanation": "Specifying '%3d' for 12345 will print '12345' completely. Width specifies a MINIMUM field width, never a maximum.",
    "hint": "Width is a minimum threshold, not a maximum cap.",
    "level": "basic"
  },
  {
    "question": "How do you format a clean tabulated console report with aligned columns?",
    "shortAnswer": "Combine width and left-alignment flags: '%-15s %-10s %10.2f%n'.",
    "explanation": "Left-align text columns with '%-width s' and right-align financial number columns with '%width.2f'.",
    "hint": "Left-align text, right-align numbers.",
    "level": "basic",
    "codeExample": "System.out.printf(\"%-15s | %5d | $%8.2f%n\", \"Laptop\", 2, 1999.99);\nSystem.out.printf(\"%-15s | %5d | $%8.2f%n\", \"Mouse\", 10, 29.50);"
  },
  {
    "question": "Can flags be combined together, like '%+,12.2f'?",
    "shortAnswer": "Yes! You can combine multiple compatible flags (e.g. sign '+', comma grouping ',', width 12, precision .2).",
    "explanation": "For 5000.5, '%+,12.2f' prints '   +5,000.50' in a 12-character right-aligned column.",
    "hint": "Flags can be combined as long as they don't conflict.",
    "level": "moderate"
  },
  {
    "question": "What is the '#' flag in formatting (e.g. '%#o' or '%#x')?",
    "shortAnswer": "The alternative form flag. It prefixes octal with '0' and hexadecimal with '0x' or '0X'.",
    "explanation": "'%#x' for 255 outputs '0xff'. '%#X' outputs '0XFF'.",
    "hint": "Adds 0x prefix for hex and 0 for octal.",
    "level": "advanced",
    "codeExample": "System.out.printf(\"%#x\", 255); // 0xff"
  },
  {
    "question": "What happens if you use the ',' grouping flag with a string (%s) or boolean (%b)?",
    "shortAnswer": "It throws a FormatFlagsConversionMismatchException.",
    "explanation": "The comma flag is only applicable to decimal integer and floating-point numeric conversions.",
    "hint": "Comma flag only works with numbers.",
    "level": "moderate"
  },
  {
    "question": "How do you format a byte value into a 2-digit zero-padded hexadecimal string?",
    "shortAnswer": "Use '%02X' (or '%02x').",
    "explanation": "The '0' specifies zero-padding, '2' specifies minimum width of 2, and 'X' specifies uppercase hexadecimal.",
    "hint": "%02X ensures two hex characters with leading zero if needed.",
    "level": "basic",
    "codeExample": "byte b = 10;\nSystem.out.printf(\"%02X\", b); // 0A"
  },
  {
    "question": "Why does '%.0f' format 12.8 as '13'?",
    "shortAnswer": "Because precision 0 rounds the floating-point value to the nearest whole integer without printing a decimal point.",
    "explanation": "Standard mathematical half-up rounding rules apply.",
    "hint": ".0 removes decimal fraction and rounds to whole number.",
    "level": "basic"
  },
  {
    "question": "Can format specifier width be specified dynamically using an argument like in C ('%*d')?",
    "shortAnswer": "No. In Java, width and precision must be hardcoded in the format string (or constructed using string concatenation/templates before formatting).",
    "explanation": "Java's Formatter does not support variable width specifiers using asterisks like C printf.",
    "hint": "Java does not support dynamic width asterisks in format strings.",
    "level": "advanced"
  },
  {
    "question": "Summary: What are the 5 components of a format specifier in order?",
    "shortAnswer": "1. % (prefix) -> 2. argument_index$ -> 3. flags -> 4. width -> 5. .precision -> 6. conversion.",
    "explanation": "Mastering this sequence ensures you can construct and debug any format string effortlessly.",
    "hint": "% [index$] [flags] [width] [.precision] conversion.",
    "level": "basic"
  }
];

export default topic8_questions;
