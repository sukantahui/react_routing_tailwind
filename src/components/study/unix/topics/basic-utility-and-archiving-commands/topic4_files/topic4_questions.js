const questions = [
  {
    question: "What does the `bc` command stand for and what does it do?",
    shortAnswer: "Basic Calculator — an arbitrary-precision arithmetic language.",
    explanation: "`bc` performs arithmetic with numbers of any size, supports decimal, hex, binary, variables, functions, and control flow.",
    hint: "It's like a programming language just for math.",
    level: "basic",
    codeExample: "echo '2^100' | bc"
  },
  {
    question: "How do you perform floating-point division with `bc`?",
    shortAnswer: "Set the `scale` variable before division, e.g., `scale=2; 10/3`.",
    explanation: "Default scale is 0, so integer division occurs. Setting scale to positive integer yields that many decimal digits.",
    hint: "`scale=0; 5/2` gives 2; `scale=3; 5/2` gives 2.500.",
    level: "basic",
    codeExample: "echo 'scale=4; 22/7' | bc"
  },
  {
    question: "What is the difference between `bc` and `expr` or `$(( ))`?",
    shortAnswer: "`bc` handles floating-point and large numbers; shell arithmetic only integers.",
    explanation: "Shell arithmetic is fast but limited to integers. `bc` is slower but supports decimals, big integers, and math functions.",
    hint: "Use bc when you need division with decimals or huge numbers.",
    level: "intermediate",
    codeExample: "echo 'scale=5; 1/3' | bc vs echo $((1/3))"
  },
  {
    question: "How can you calculate the square root of 2 to 10 decimal places?",
    shortAnswer: "`echo 'scale=10; sqrt(2)' | bc -l`",
    explanation: "The `-l` option loads the math library which includes `sqrt()`, `sin()`, `cos()`, `a()` (arctan), `l()` (natural log), `e()` (exponential).",
    hint: "`-l` also sets scale to 20 by default.",
    level: "intermediate",
    codeExample: "echo 'scale=15; sqrt(2)' | bc -l"
  },
  {
    question: "How do you convert a hexadecimal number to decimal using `bc`?",
    shortAnswer: "Set `ibase=16` then echo the number: `echo 'ibase=16; FF' | bc`",
    explanation: "`ibase` sets input base (2-16). `obase` sets output base. Default both are 10.",
    hint: "Set `obase` before `ibase` if both are changed, because `obase` value is interpreted in current `ibase`.",
    level: "intermediate",
    codeExample: "echo 'ibase=16; obase=10; FF' | bc"
  },
  {
    question: "What is the purpose of `bc -l`?",
    shortAnswer: "Loads the standard math library (sine, cosine, arctangent, log, exp) and sets scale to 20.",
    explanation: "Without `-l`, math functions like `s()`, `c()`, `a()`, `l()`, `e()` are not available.",
    hint: "`l(x)` is natural log, not log base 10.",
    level: "advanced",
    codeExample: "echo 'scale=5; e(1)' | bc -l   # e^1 = 2.71828"
  },
  {
    question: "Why does `echo '10/3' | bc` output 3 instead of 3.333?",
    shortAnswer: "Because default scale=0, so division results in integer truncation.",
    explanation: "`bc` does not automatically use floating point; you must set scale explicitly.",
    hint: "Always set `scale` when expecting decimal results.",
    level: "basic",
    codeExample: "echo 'scale=3; 10/3' | bc"
  },
  {
    question: "How can you store the result of a bc calculation in a shell variable?",
    shortAnswer: "Use command substitution: `result=$(echo '2+2' | bc)`",
    explanation: "The output of bc is captured, leading/trailing whitespace may appear; use `printf` or trim if needed.",
    hint: "For floating results, combine with `printf '%.2f'`.",
    level: "basic",
    codeExample: "pi=$(echo 'scale=5; 4*a(1)' | bc -l); echo $pi"
  },
  {
    question: "What is the difference between `bc` and `dc`?",
    shortAnswer: "`bc` is a higher-level language (C-like syntax); `dc` is a reverse-polish notation (RPN) calculator.",
    explanation: "`bc` is more user-friendly; `dc` is older, uses postfix notation, and is often used internally by `bc`.",
    hint: "`bc` is essentially a preprocessor for `dc`.",
    level: "expert",
    codeExample: "echo '2 3 + p' | dc"
  },
  {
    question: "How can you define a function in `bc`?",
    shortAnswer: "Use `define name(params) { ... }` syntax.",
    explanation: "Functions can be recursive, have local variables (with `auto`), and return values with `return`.",
    hint: "Define factorial or Fibonacci as examples.",
    level: "expert",
    codeExample: "bc << 'EOF'\ndefine fact(x) { if (x<=1) return 1; return x*fact(x-1); }\nfact(5)\nEOF"
  },
  {
    question: "How do you comment in `bc`?",
    shortAnswer: "Use `/* comment */` for multi-line or `#` for single-line (GNU bc).",
    explanation: "POSIX bc only supports `/* */`. GNU bc also supports `#` to end of line.",
    hint: "Comments are useful in bc scripts.",
    level: "intermediate",
    codeExample: "echo '/* compute pi */ scale=5; 4*a(1)' | bc -l"
  },
  {
    question: "What does the `last` variable (or `.`) do?",
    shortAnswer: "It holds the result of the last expression evaluated.",
    explanation: "GNU bc stores the last result in `last` (or `.` in older versions). You can use it in subsequent calculations.",
    hint: "`echo '2+3; .*4' | bc` outputs 5 and 20.",
    level: "advanced",
    codeExample: "echo '7*6; .+1' | bc"
  },
  {
    question: "How can you repeat an operation many times with `bc`?",
    shortAnswer: "Use a `for` loop inside bc.",
    explanation: "`bc` supports `for (init; cond; inc)`, `while`, and `if` statements.",
    hint: "Useful for summation, factorial, or series.",
    level: "expert",
    codeExample: "bc << EOF\nsum=0; for(i=1;i<=100;i++) sum+=i; sum\nEOF"
  },
  {
    question: "How do you calculate the natural log of 10 using bc?",
    shortAnswer: "`echo 'l(10)' | bc -l` (since `-l` loads `l()` for natural log).",
    explanation: "The math library function `l(x)` returns natural logarithm. For base-10, divide by `l(10)`.",
    hint: "`log10(x) = l(x)/l(10)`.",
    level: "intermediate",
    codeExample: "echo 'scale=5; l(100)/l(10)' | bc -l"
  },
  {
    question: "What is the maximum precision (scale) that `bc` can handle?",
    shortAnswer: "Limited only by memory; you can set scale to thousands or millions.",
    explanation: "`bc` uses arbitrary-precision arithmetic; huge scales will slow computation and consume memory.",
    hint: "`scale=10000; 4*a(1)` calculates Pi to 10000 digits (slow but possible).",
    level: "expert",
    codeExample: "time echo 'scale=5000; 4*a(1)' | bc -l > pi.txt"
  },
  {
    question: "Why does `bc` treat numbers starting with 0 as octal?",
    shortAnswer: "By default, bc interprets numbers with leading 0 as octal (0-7).",
    explanation: "To force decimal, set `ibase=10` before interpreting such numbers, or avoid leading zeros.",
    hint: "`echo 'ibase=8; 10' | bc` gives 8 decimal; confusing.",
    level: "advanced",
    codeExample: "echo '010' | bc   # outputs 8"
  },
  {
    question: "How can you perform bitwise operations in `bc`?",
    shortAnswer: "Use `&` (AND), `|` (OR), `^` (XOR), `<<` (left shift), `>>` (right shift) — available in GNU bc.",
    explanation: "Older versions may not support bitwise; GNU bc and most Linux versions do.",
    hint: "`echo '12 & 5' | bc` → 4 (1100 & 0101 = 0100).",
    level: "expert",
    codeExample: "echo 'obase=2; 12 & 5' | bc"
  },
  {
    question: "What is the difference between `bc` and `python` for math?",
    shortAnswer: "`bc` is lighter, faster for interactive simple math, but `python` is more powerful and easier for complex logic.",
    explanation: "`bc` is a specialized tool; python is a full language. In scripts, bc is often used for quick calculations.",
    hint: "For serious numeric computing, use Python with decimal or numpy.",
    level: "expert",
    codeExample: "python -c 'print(10/3)'"
  },
  {
    question: "Can `bc` handle scientific notation like 1e-5?",
    shortAnswer: "No, bc does not support scientific notation natively; you must use scale and small numbers.",
    explanation: "You can simulate: `scale=10; 0.00001` or use powers: `10^-5`.",
    hint: "`echo '10^-5' | bc` works (exponentiation).",
    level: "advanced",
    codeExample: "echo 'scale=10; 1/100000' | bc"
  },
  {
    question: "How do you print a result without newline in bc?",
    shortAnswer: "Use `print` statement with no trailing newline: `print result`.",
    explanation: "`print` outputs exactly what you specify; `print \"hello\"` without `;` after will not add newline.",
    hint: "`echo 'print 2+3' | bc` outputs 5 with no newline, but shell may add one.",
    level: "expert",
    codeExample: "echo 'print 2+3, \" \" , 4*5' | bc"
  },
  {
    question: "What is the purpose of the `scale` variable in `bc`?",
    shortAnswer: "Determines the number of decimal places for division, modulo, and some other operations.",
    explanation: "Multiplication and addition are not affected by scale (they produce full precision).",
    hint: "`scale` only affects operation results that involve division or `sqrt`.",
    level: "intermediate",
    codeExample: "scale=3; 1/3   # 0.333\nscale=6; 1/3   # 0.333333"
  },
  {
    question: "How can you use `bc` to calculate compound interest?",
    shortAnswer: "`echo 'principal * (1 + rate)^years' | bc`",
    explanation: "Set scale to appropriate number of decimal places (2 for currency).",
    hint: "Example: `p=1000; r=0.05; t=5; echo \"scale=2; $p * (1 + $r)^$t\" | bc`",
    level: "intermediate",
    codeExample: "echo 'scale=2; 1000 * (1 + 0.05)^5' | bc"
  },
  {
    question: "What are the magic numbers `0` and `1` in bc's math library?",
    shortAnswer: "In `bc -l`, `a(1)` returns π/4, `l(1)` returns 0, `e(1)` returns e.",
    explanation: "These are useful for deriving constants: π = 4*a(1), e = e(1).",
    hint: "`echo '4*a(1)' | bc -l` gives π.",
    level: "advanced",
    codeExample: "echo 'scale=10; 4*a(1)' | bc -l"
  },
  {
    question: "How do you generate a random number in bc?",
    shortAnswer: "bc does not have built-in random; use shell's `$RANDOM` and pass to bc.",
    explanation: "You can simulate: `echo \"$RANDOM / 32768\" | bc -l`.",
    hint: "Or use `od -An -N2 -i /dev/urandom`.",
    level: "expert",
    codeExample: "echo \"scale=4; $RANDOM / 32768\" | bc -l"
  },
  {
    question: "Why does my `bc` script show 'parse error' when using `^` for exponent?",
    shortAnswer: "Some older bc versions use `^`, but POSIX requires `^`. GNU bc accepts both `^` and `**`.",
    explanation: "If you get errors, use `^` and ensure you have GNU bc. Alternatively, use `pow()` if defined.",
    hint: "Check `bc --version`.",
    level: "expert",
    codeExample: "echo '2^10' | bc   # works on GNU"
  },
  {
    question: "How can you use `bc` to compute Fibonacci numbers?",
    shortAnswer: "Write a recursive or iterative function inside bc.",
    explanation: "Example iterative: `a=0; b=1; for(i=1;i<=n;i++){c=a+b; a=b; b=c}; a`",
    hint: "For large n, loops are fine.",
    level: "advanced",
    codeExample: "bc << 'EOF'\nn=10;a=0;b=1;for(i=1;i<=n;i++){c=a+b;a=b;b=c};a\nEOF"
  },
  {
    question: "What is the difference between `bc` and `calc`?",
    shortAnswer: "`calc` is another arbitrary-precision calculator with more features (e.g., fractions, complex numbers), but not standard on all systems.",
    explanation: "`calc` is more feature-rich, but `bc` is universally available on Unix.",
    hint: "For portability, use bc.",
    level: "expert",
    codeExample: "calc '2/3'"
  },
  {
    question: "How can you debug a long bc script?",
    shortAnswer: "Use print statements, or run bc interactively: `bc -q` then load script with `source`.",
    explanation: "Set `print` inside loops and conditionals. Use comments to trace.",
    hint: "`bc -l` then `define t(x){print \"x=\",x,\"\\n\"; return x*x;}`.",
    level: "expert",
    codeExample: "bc -q\nt(x)=x*2\nprint t(5)"
  },
  {
    question: "Can `bc` read input from a file?",
    shortAnswer: "Yes, `bc filename` executes commands in that file.",
    explanation: "You can write bc scripts, include function definitions, and run them.",
    hint: "Make sure to end with `quit` or use `-q`.",
    level: "intermediate",
    codeExample: "bc mymath.bc"
  },
  {
    question: "What is the output of `echo '5/2' | bc` without scale?",
    shortAnswer: "2 (integer division, truncated toward zero).",
    explanation: "Because scale defaults to 0, division drops the fractional part.",
    hint: "Not rounding; truncation.",
    level: "basic",
    codeExample: "echo '5/2' | bc   # 2"
  },
  {
    question: "How to compute the sine of 30 degrees in bc?",
    shortAnswer: "Convert degrees to radians: sin(30°) = sin(π/6). Use `s(30 * a(1) / 45)` because a(1)=π/4.",
    explanation: "Alternatively: `define dtor(d) { return d * a(1) / 45; }`",
    hint: "`echo 'scale=10; s(30 * a(1) / 45)' | bc -l`.",
    level: "expert",
    codeExample: "echo 'scale=6; s(30*4*a(1)/180)' | bc -l"
  }
];

export default questions;