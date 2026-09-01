const questions = [
  {
    question: "How do you design a real-world ATM banking system in C using control flow and loops?",
    shortAnswer: "Wrap the workflow in a `do-while` loop containing a `switch-case` statement for menu options (Deposit, Withdraw, Balance, Mini-Statement, Exit), validated with nested `if-else` balance checks.",
    explanation: "Ensures the user stays in the session until selecting option 5 (Exit), protecting against invalid inputs and overdrawn balances.",
    hint: "do-while loop with switch-case and balance guard clauses.",
    level: "intermediate"
  },
  {
    question: "How do you verify if a number is an Armstrong number for ANY digit count (not just 3 digits)?",
    shortAnswer: "Step 1: Count total digits `k` by dividing by 10; Step 2: Peel each digit with `% 10` and calculate `digit^k`; Step 3: Check if total sum equals original number.",
    explanation: "Handles numbers like 153 (3 digits: 1^3+5^3+3^3=153) and 1634 (4 digits: 1^4+6^4+3^4+4^4=1634).",
    hint: "Dynamic digit count k and sum of digit^k.",
    level: "intermediate"
  },
  {
    question: "What is a Perfect Number in C mathematical programming?",
    shortAnswer: "A positive integer equal to the sum of its proper positive divisors excluding itself (e.g. 6 = 1 + 2 + 3; 28 = 1 + 2 + 4 + 7 + 14).",
    explanation: "Test divisors from 1 up to `num / 2` and accumulate into a running sum.",
    hint: "Sum of proper divisors equals number.",
    level: "basic",
    codeExample: "int sum = 0;\nfor (int i = 1; i <= num / 2; i++) {\n    if (num % i == 0) sum += i;\n}\nbool isPerfect = (sum == num && num > 0);"
  },
  {
    question: "What is an Automorphic (Curious) Number?",
    shortAnswer: "A number whose square ends in the same digits as the number itself (e.g. 5^2 = 25; 25^2 = 625; 76^2 = 5776).",
    explanation: "Compute `sq = num * num` and compare trailing digits with `% 10` while `num > 0`.",
    hint: "Square ends with the original number.",
    level: "intermediate"
  },
  {
    question: "How do you implement a Guess-the-Number Game with attempt limits in C?",
    shortAnswer: "Generate a random target using `rand() % 100 + 1`; prompt the user in a `for` or `while` loop, providing 'Too High' or 'Too Low' hints until matched or attempts exhaust.",
    explanation: "Applies binary search intuition for the player to narrow down the target in log2(100) ≈ 7 attempts.",
    hint: "Binary search feedback hints in a loop.",
    level: "basic"
  },
  {
    question: "How do you construct a dynamic Pascal's Triangle in C without pre-computing factorials?",
    shortAnswer: "Iterate rows from `0` to `N-1`; start each row with `val = 1`; compute next element with `val = val * (i - j) / (j + 1)`.",
    explanation: "Avoids integer overflow associated with large factorial calculations.",
    hint: "Iterative multiplicative binomial update formula.",
    level: "intermediate"
  },
  {
    question: "How do you generate the Fibonacci sequence up to N terms using a loop?",
    shortAnswer: "Initialize `a = 0, b = 1`; loop `n` times, print `a`, and update `next = a + b; a = b; b = next;`.",
    explanation: "Standard dynamic sliding-window recurrence relation.",
    hint: "Sliding window variables a, b, next.",
    level: "basic",
    codeExample: "int a = 0, b = 1;\nfor (int i = 0; i < n; i++) {\n    printf(\"%d \", a);\n    int next = a + b;\n    a = b;\n    b = next;\n}"
  },
  {
    question: "How do you validate that an ATM cash withdrawal is an exact multiple of 100 and within balance?",
    shortAnswer: "`if (amount > 0 && (int)amount % 100 == 0 && amount <= balance)`",
    explanation: "Enforces physical currency dispensing constraints.",
    hint: "Modulo 100 check combined with balance test.",
    level: "basic"
  },
  {
    question: "What is a Strong (Krishnamurthy) Number in C?",
    shortAnswer: "A number whose sum of the factorials of its digits equals the original number (e.g. 145 = 1! + 4! + 5! = 1 + 24 + 120 = 145).",
    explanation: "Peel digits and compute factorial for each digit, summing results.",
    hint: "Sum of digit factorials equals number.",
    level: "intermediate"
  },
  {
    question: "How do you implement input sanitization to prevent infinite loops when a user enters a character instead of a number in `scanf`?",
    shortAnswer: "Check the return value of `scanf(\"%d\", &val)`: if it returns 0 (match failure), clear the input buffer with `while(getchar() != '\\n');`.",
    explanation: "Unconsumed non-numeric characters stay in the stdin buffer, causing subsequent `scanf` calls to fail in an infinite loop.",
    hint: "Check scanf return value and clear stdin buffer.",
    level: "advanced",
    codeExample: "if (scanf(\"%d\", &choice) != 1) {\n    printf(\"Invalid input!\\n\");\n    while (getchar() != '\\n'); // Flush stdin\n    continue;\n}"
  },
  {
    question: "How do you print a Hollow Diamond Star Pattern?",
    shortAnswer: "Print `*` only at the first (`star == 1`) and last (`star == 2*i - 1`) positions of each row; print spaces in between.",
    explanation: "Boundary condition check within the star loop.",
    hint: "Stars only at boundaries of pyramid rows.",
    level: "intermediate"
  },
  {
    question: "How do you find the Greatest Common Divisor (GCD) using the Euclidean loop algorithm?",
    shortAnswer: "`while (b != 0) { int rem = a % b; a = b; b = rem; } return a;`",
    explanation: "Repeated modulo reduction is dramatically faster than linear trial division.",
    hint: "Euclidean modulo loop algorithm.",
    level: "basic"
  },
  {
    question: "How do you calculate the Least Common Multiple (LCM) of two numbers using GCD?",
    shortAnswer: "`LCM(a, b) = (a * b) / GCD(a, b)`",
    explanation: "Explains mathematical duality between GCD and LCM.",
    hint: "(a * b) / GCD(a, b)",
    level: "basic"
  },
  {
    question: "How do you create an interactive CLI menu that supports smooth clearing and pausing across platforms?",
    shortAnswer: "Prompt user, process transaction, print confirmation, and wait for Enter key before clearing terminal.",
    explanation: "Creates professional, readable terminal user experiences.",
    hint: "Interactive console UX flow.",
    level: "basic"
  },
  {
    question: "How do you calculate compound interest over N years with a loop?",
    shortAnswer: "For each year from 1 to N, calculate `interest = principal * (rate / 100.0)` and add to `principal`.",
    explanation: "Simulates annual compounding iteratively.",
    hint: "Iterative accumulation of annual interest.",
    level: "basic"
  },
  {
    question: "How do you count the frequency of each digit (0 to 9) in an integer using an array and a loop?",
    shortAnswer: "Initialize `int freq[10] = {0};`; peel digits with `num % 10` and increment `freq[digit]++`.",
    explanation: "Direct array index hashing based on digit values.",
    hint: "freq[digit]++ direct counting array.",
    level: "intermediate"
  },
  {
    question: "What is a Harshad (Niven) Number?",
    shortAnswer: "An integer that is evenly divisible by the sum of its digits (e.g. 18 is divisible by 1 + 8 = 9; 18 % 9 == 0).",
    explanation: "Sum the digits using modulo division, then test `original % sum == 0`.",
    hint: "Number divisible by sum of its digits.",
    level: "basic"
  },
  {
    question: "How do you print a Spiral Number Matrix (e.g. 1 2 3 / 8 9 4 / 7 6 5)?",
    shortAnswer: "Maintain 4 boundaries (`top`, `bottom`, `left`, `right`) and iterate in 4 sequential direction loops (left-to-right, top-to-bottom, right-to-left, bottom-to-top), shrinking boundaries inward.",
    explanation: "Classic 2D algorithmic boundary contraction pattern.",
    hint: "4-boundary contraction loops.",
    level: "advanced"
  },
  {
    question: "How do you convert decimal integers to Roman Numerals using arrays and loops?",
    shortAnswer: "Store values (`1000, 900, 500, 400, 100...`) and symbols (`\"M\", \"CM\", \"D\", \"CD\"...`); loop through values subtracting while `num >= values[i]`.",
    explanation: "Greedy algorithm with parallel lookup arrays.",
    hint: "Greedy value subtraction loop.",
    level: "intermediate"
  },
  {
    question: "How do you simulate a digital dice roll game with a bankroll loop?",
    shortAnswer: "Loop while bankroll > 0 and user wants to bet: roll `rand() % 6 + 1`, update bankroll according to rules.",
    explanation: "Applies pseudo-random number generator `<stdlib.h>` within a game loop.",
    hint: "Game loop with bankroll termination invariant.",
    level: "basic"
  },
  {
    question: "How do you compute the sum of an alternating series like $1 - 2 + 3 - 4 + 5...$?",
    shortAnswer: "Inside a loop from 1 to N, if `i % 2 == 0` subtract `i`, else add `i`.",
    explanation: "Alternating signs using parity checks.",
    hint: "Parity based sign alternation.",
    level: "basic"
  },
  {
    question: "How do you find all Narcissistic numbers in a given range [A, B]?",
    shortAnswer: "Outer loop iterates `num` from A to B; inner helper verifies whether `num` equals the sum of its digits raised to total digit count.",
    explanation: "Range iteration over Armstrong verification engine.",
    hint: "Range loop with digit power sum verification.",
    level: "intermediate"
  },
  {
    question: "What is an Abundant Number vs a Deficient Number?",
    shortAnswer: "Abundant: Sum of proper divisors > number (e.g. 12: 1+2+3+4+6 = 16 > 12); Deficient: Sum of proper divisors < number (e.g. 8: 1+2+4 = 7 < 8).",
    explanation: "Classification of integers based on aliquot sums.",
    hint: "Compare aliquot sum to number.",
    level: "basic"
  },
  {
    question: "How do you verify if a number is a Duck Number?",
    shortAnswer: "A positive number that contains at least one zero, but does NOT start with a leading zero (e.g. 3210 or 7056).",
    explanation: "Check digits with modulo 10 for presence of 0.",
    hint: "Contains internal or trailing zero.",
    level: "basic"
  },
  {
    question: "Why are comprehensive capstone projects essential in mastering C control flow?",
    shortAnswer: "They force integration of all control constructs (nested loops, branching, validation, state machines, guards) to solve complex, realistic software specifications.",
    explanation: "Bridges the gap between isolated syntax knowledge and real-world system architecture.",
    hint: "Integrates all branching and iteration patterns into production architecture.",
    level: "basic"
  }
];

export default questions;
