const questions = [
  {
    question: "What is an iterative loop in C?",
    shortAnswer: "A control flow structure that repeats a block of statements as long as a specified condition remains true (non-zero).",
    explanation: "Loops allow efficient repetition of operations (such as processing array elements or polling sensors) without writing duplicate code.",
    hint: "Repeats code until condition becomes false.",
    level: "basic"
  },
  {
    question: "What are the three primary loop constructs available in C?",
    shortAnswer: "1. `for` loop (pre-test, counter-controlled)\n2. `while` loop (pre-test, condition-controlled)\n3. `do-while` loop (post-test, guaranteed single execution)",
    explanation: "Each loop type is suited for different patterns: `for` when iteration count is known; `while` for event-driven logic; `do-while` when the body must run at least once.",
    hint: "for, while, and do-while.",
    level: "basic"
  },
  {
    question: "What is the key difference between a pre-test loop and a post-test loop?",
    shortAnswer: "A pre-test loop (`for`, `while`) checks the condition BEFORE entering the body (may execute 0 times); a post-test loop (`do-while`) checks AFTER executing the body (guaranteed to execute at least 1 time).",
    explanation: "If the initial condition is false, pre-test loops skip the body completely, while `do-while` executes once before testing.",
    hint: "Check condition before entering vs after exiting.",
    level: "basic"
  },
  {
    question: "What are the three parts of a standard `for` loop header in C?",
    shortAnswer: "1. Initialization (`int i = 0`)\n2. Condition test (`i < n`)\n3. Update / Increment (`i++`)",
    explanation: "Syntax: `for (initialization; condition; update) { ... }`. All three expressions are optional.",
    hint: "Initialization, Condition, Increment.",
    level: "basic"
  },
  {
    question: "What happens if you write `for (;;)` in C?",
    shortAnswer: "It creates an intentional infinite loop.",
    explanation: "Since the condition expression is omitted, C defaults it to true (non-zero), running forever until terminated by `break` or `return`.",
    hint: "Infinite loop idiom.",
    level: "basic",
    codeExample: "for (;;) {\n    // Runs endlessly\n    if (shouldExit) break;\n}"
  },
  {
    question: "What happens if you write `while (1)` in C?",
    shortAnswer: "It creates an infinite loop because the condition constant 1 is always true.",
    explanation: "Commonly used in embedded systems firmware, game loops, and server listener threads.",
    hint: "Infinite loop idiom with while.",
    level: "basic"
  },
  {
    question: "What is the semicolon bug after a while loop header: `while (i < 5);`?",
    shortAnswer: "The semicolon creates an empty loop body, freezing the CPU in an infinite loop because `i` is never updated.",
    explanation: "The while loop tests `i < 5` with no body, never reaching the update statement below it.",
    hint: "Accidental empty loop causing freeze.",
    level: "basic",
    codeExample: "// BUG:\n// while (i < 5); { i++; }\n// FIX:\nwhile (i < 5) { i++; }"
  },
  {
    question: "Can a `for` loop contain multiple loop variables (e.g. `for (int i=0, j=10; ...)` )?",
    shortAnswer: "Yes, multiple expressions separated by commas can be placed in the initialization and update sections.",
    explanation: "The comma operator allows simultaneous manipulation of multiple indices.",
    hint: "Use comma operator: for (int i=0, j=10; i < j; i++, j--).",
    level: "intermediate",
    codeExample: "for (int i = 0, j = 10; i < j; i++, j--) {\n    printf(\"%d %d\\n\", i, j);\n}"
  },
  {
    question: "Can variable declaration be done directly inside the `for` loop header in C99?",
    shortAnswer: "Yes, C99 introduced loop-scoped variable declarations like `for (int i = 0; ...)`.",
    explanation: "The variable `i` exists only within the scope of the `for` loop and is automatically destroyed upon loop exit.",
    hint: "C99 loop-scoped variable.",
    level: "basic"
  },
  {
    question: "Why does `do-while` require a semicolon at the end: `do { ... } while (condition);`?",
    shortAnswer: "The terminating semicolon informs the parser that the `while` statement concludes a `do-while` block rather than beginning a new `while` loop.",
    explanation: "Without the semicolon, the compiler flags a syntax error.",
    hint: "Required by C grammar to terminate the construct.",
    level: "basic"
  },
  {
    question: "How do you extract digits from an integer using a `while` loop?",
    shortAnswer: "Repeatedly compute `remainder = num % 10` (extracts last digit) and `num /= 10` (discards last digit) until `num == 0`.",
    explanation: "Standard algorithmic technique for palindrome checks, Armstrong number verification, and digit sum calculations.",
    hint: "Modulo 10 and divide by 10.",
    level: "basic",
    codeExample: "while (num > 0) {\n    int digit = num % 10;\n    printf(\"%d \", digit);\n    num /= 10;\n}"
  },
  {
    question: "How do you reverse a number using a loop in C?",
    shortAnswer: "`reversed = (reversed * 10) + (num % 10); num /= 10;` inside a `while (num > 0)` loop.",
    explanation: "Shifts existing digits one decimal place to the left and adds the extracted rightmost digit.",
    hint: "reversed * 10 + remainder.",
    level: "basic"
  },
  {
    question: "What is an Off-By-One Error (OBOE) in loop construction?",
    shortAnswer: "A logic error where a loop iterates one time too many or one time too few (e.g. using `<= length` instead of `< length`).",
    explanation: "Often leads to array buffer overruns when iterating 0-indexed arrays.",
    hint: "Boundary fencepost error.",
    level: "basic"
  },
  {
    question: "What is Loop Unrolling in compiler optimization?",
    shortAnswer: "A performance optimization where the compiler duplicates the loop body multiple times to reduce loop control branching overhead.",
    explanation: "Trades code size for faster CPU execution by reducing the number of condition checks and jumps.",
    hint: "Reduces branch instruction overhead.",
    level: "advanced"
  },
  {
    question: "How does the `do-while` loop assist in robust user input validation?",
    shortAnswer: "It displays the prompt and reads user input at least once, repeating if the input fails validation criteria.",
    explanation: "Avoids repeating the prompt code before and inside the loop.",
    hint: "Prompt first, check validity at the end.",
    level: "basic",
    codeExample: "int choice;\ndo {\n    printf(\"Enter option (1-4): \");\n    scanf(\"%d\", &choice);\n} while (choice < 1 || choice > 4);"
  },
  {
    question: "Can floating-point loop counters cause infinite loops?",
    shortAnswer: "Yes, accumulating small binary precision errors (like `0.1`) can cause `f != 1.0` to never be exactly equal.",
    explanation: "Always use integer counters for loop boundaries and derive floating-point values inside the body.",
    hint: "Never use exact float equality in loop tests.",
    level: "intermediate"
  },
  {
    question: "What is the time complexity of a loop iterating from 1 to N with `i *= 2`?",
    shortAnswer: "O(log N) logarithmic time complexity.",
    explanation: "The counter doubles on each iteration, reaching N in log2(N) steps.",
    hint: "Doubling increments yield logarithmic steps.",
    level: "intermediate"
  },
  {
    question: "Can a `while` loop condition contain side-effects like `while (*dest++ = *src++)`?",
    shortAnswer: "Yes, this is the classic idiomatic C `strcpy` loop that copies bytes until encountering the null terminator `\\0` (0).",
    explanation: "The assignment expression evaluates to the character copied; when `\\0` (ASCII 0) is copied, the condition evaluates to false and halts.",
    hint: "Classic string copying idiom.",
    level: "advanced"
  },
  {
    question: "What is the difference between prefix (`++i`) and postfix (`i++`) in the update expression of a `for` loop?",
    shortAnswer: "In a standard `for (int i=0; i<n; i++)`, there is NO difference in loop behavior because the update statement result is discarded.",
    explanation: "Both increment `i` by 1 after the body executes.",
    hint: "Identical behavior in standalone for loop update headers.",
    level: "basic"
  },
  {
    question: "What happens if a loop counter overflows its integer maximum value?",
    shortAnswer: "Signed integer overflow results in Undefined Behavior (UB); unsigned integers wrap around to 0, potentially creating an infinite loop.",
    explanation: "`for (unsigned char c = 0; c <= 255; c++)` is infinite because 255 + 1 wraps to 0.",
    hint: "Wrap-around creates infinite loops.",
    level: "advanced"
  },
  {
    question: "How do you calculate the sum of digits of an integer using a loop?",
    shortAnswer: "`sum += num % 10; num /= 10;` inside a `while (num > 0)` loop.",
    explanation: "Extracts each digit and accumulates into a running sum variable.",
    hint: "Accumulate remainder.",
    level: "basic"
  },
  {
    question: "What is the difference between a counter-controlled loop and a sentinel-controlled loop?",
    shortAnswer: "A counter-controlled loop iterates a fixed number of times; a sentinel-controlled loop runs until a special stopping value (sentinel, e.g. -1 or EOF) is encountered.",
    explanation: "Sentinel loops are used when the total number of inputs is unknown in advance.",
    hint: "Fixed count vs special stop token.",
    level: "basic"
  },
  {
    question: "How do you detect if a number is a Palindrome using a loop?",
    shortAnswer: "Reverse the number into a new variable using a `while` loop; then check if `original == reversed`.",
    explanation: "A number like 121 or 1331 reads identically backwards and forwards.",
    hint: "Compare original with reversed value.",
    level: "basic"
  },
  {
    question: "Can a `while` loop be rewritten as an equivalent `for` loop?",
    shortAnswer: "Yes, `while (cond) { body; }` is mathematically identical to `for (; cond; ) { body; }`.",
    explanation: "All three C loop constructs are Turing complete and inter-convertible.",
    hint: "Completely interchangeable.",
    level: "basic"
  },
  {
    question: "Why should loop termination conditions avoid calling heavy functions repeatedly (e.g. `i < strlen(str)`)?",
    shortAnswer: "Calling `strlen(str)` on every iteration recalculates string length in O(N) time, making the overall loop O(N^2) instead of O(N).",
    explanation: "Cache the length in a variable before the loop: `int len = strlen(str); for(int i=0; i<len; i++)`.",
    hint: "Cache strlen outside the loop header.",
    level: "intermediate"
  }
];

export default questions;
