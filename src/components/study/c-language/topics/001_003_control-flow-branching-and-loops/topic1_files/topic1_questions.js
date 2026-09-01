const questions = [
  {
    question: "What is a switch-case statement in C?",
    shortAnswer: "A multi-way selection control statement that tests whether an integer or character expression matches one of several constant values.",
    explanation: "The switch statement evaluates the controlling expression once and jumps directly to the matching case label.",
    hint: "Multi-way integer dispatch.",
    level: "basic"
  },
  {
    question: "What data types are allowed in a C switch-case controlling expression?",
    shortAnswer: "Only integral types (`int`, `char`, `short`, `long`, `unsigned int`, and `enum`).",
    explanation: "Floating point numbers (`float`, `double`), strings, and struct instances cannot be used in a switch expression.",
    hint: "Only integers and characters (no floats or strings).",
    level: "basic"
  },
  {
    question: "Why can't float or double be used in a switch statement?",
    shortAnswer: "Because floating-point numbers have rounding approximations that make exact bit-for-bit equality matching unreliable and preclude jump table generation.",
    explanation: "The compiler implements switch statements using constant jump tables. Floating-point imprecision prevents exact hash/jump table construction.",
    hint: "Exact equality is unpredictable with floating-point decimals.",
    level: "intermediate"
  },
  {
    question: "What is the purpose of the 'break' statement inside a switch-case?",
    shortAnswer: "It terminates execution of the switch body and jumps to the statement immediately following the switch closing brace.",
    explanation: "Without a break statement, execution will continue sequentially into the next case labels (fall-through).",
    hint: "Exits the switch block immediately.",
    level: "basic"
  },
  {
    question: "What is 'Fall-Through' behavior in a switch statement?",
    shortAnswer: "When a case does not end with `break`, execution flows straight down into subsequent case blocks, executing their code.",
    explanation: "Fall-through can be an accidental bug (forgotten break) or an intentional feature to share logic between multiple case labels.",
    hint: "Execution cascades into subsequent cases when break is omitted.",
    level: "basic"
  },
  {
    question: "What is a Jump Table and how does the compiler optimize switch statements?",
    shortAnswer: "An array of instruction addresses that allows the CPU to jump directly to the target case in O(1) constant time.",
    explanation: "When case values are densely clustered (e.g. 1, 2, 3, 4), the compiler creates a jump table lookup rather than executing a chain of O(N) comparisons.",
    hint: "O(1) direct address dispatch table.",
    level: "advanced"
  },
  {
    question: "What is the role of the 'default' case in a switch statement?",
    shortAnswer: "It executes if none of the explicit case constants match the controlling expression.",
    explanation: "It acts like the trailing `else` in an else-if ladder, handling invalid, fallback, or unexpected values.",
    hint: "Fallback handler when no cases match.",
    level: "basic"
  },
  {
    question: "Is the 'default' case mandatory in a switch statement?",
    shortAnswer: "No, it is optional, but recommended as a defensive programming best practice.",
    explanation: "If no case matches and no default exists, the switch statement simply terminates without taking action.",
    hint: "Optional, but recommended for safety.",
    level: "basic"
  },
  {
    question: "Can case constants contain variables or expressions like `case x:` or `case a + b:`?",
    shortAnswer: "No. Case labels must be compile-time constant integral expressions (e.g. `case 5:`, `case 'A':`, `case 2 + 3:`).",
    explanation: "Dynamic variables cannot be evaluated at compile time, which is required to build the jump table.",
    hint: "Only compile-time constants allowed.",
    level: "basic"
  },
  {
    question: "Can two case labels have duplicate constant values in the same switch?",
    shortAnswer: "No, duplicate case values cause a compilation error ('duplicate case value').",
    explanation: "Each case value must be distinct so the jump target is unambiguous.",
    hint: "All case constant labels must be unique.",
    level: "basic"
  },
  {
    question: "Can case labels be grouped together to share a single code block?",
    shortAnswer: "Yes, by stacking case labels sequentially: `case 'a': case 'A': count++; break;`.",
    explanation: "This takes advantage of intentional fall-through to execute the same logic for multiple input values.",
    hint: "Stacking case labels without breaks between them.",
    level: "basic"
  },
  {
    question: "Can you declare a new variable directly inside a case label without braces?",
    shortAnswer: "In standard C, declaring variables directly after a case label can cause compiler errors because labels are statements, not scopes.",
    explanation: "To declare local variables with block scope inside a case, wrap the case body in curly braces: `case 1: { int temp = 10; ... break; }`.",
    hint: "Wrap the case body in curly braces { } to create a local scope.",
    level: "intermediate"
  },
  {
    question: "How does the performance of a switch-case compare to an else-if ladder?",
    shortAnswer: "For large numbers of conditions (>4), a switch statement with a jump table is O(1) constant time, whereas an else-if ladder is O(N) sequential search.",
    explanation: "An else-if ladder tests every condition sequentially until a match is found. A switch jump table computes the target address in a single CPU instruction.",
    hint: "O(1) jump table vs O(N) linear comparisons.",
    level: "intermediate"
  },
  {
    question: "What is 'Duff's Device' in C?",
    shortAnswer: "A famous loop unrolling optimization that interweaves a switch-case statement with a do-while loop.",
    explanation: "Created by Tom Duff in 1983 to accelerate serial memory copies by jumping into the middle of an unrolled loop using switch case labels.",
    hint: "Interweaving switch-case inside a do-while loop.",
    level: "advanced"
  },
  {
    question: "What happens if a switch expression does not match any case and there is no default?",
    shortAnswer: "The entire switch statement is skipped, and execution continues at the next statement.",
    explanation: "No error is thrown; it behaves as a no-op.",
    hint: "Silent skip to the next statement.",
    level: "basic"
  },
  {
    question: "Can you place the `default` label at the top or middle of a switch statement?",
    shortAnswer: "Yes, `default` can appear anywhere inside the switch body.",
    explanation: "If placed at the top or middle without a `break`, it will fall through into subsequent cases unless broken.",
    hint: "Can appear anywhere, but usually placed at the bottom.",
    level: "intermediate"
  },
  {
    question: "Can an `enum` be used as the controlling expression and case constants in a switch?",
    shortAnswer: "Yes, enums are integral types and are the preferred way to write state machines with switch statements.",
    explanation: "Compilers (like GCC with `-Wswitch`) can even warn you if you forgot to handle an enum state in your switch cases!",
    hint: "Ideal for state machines and protocol dispatchers.",
    level: "intermediate"
  },
  {
    question: "What is the difference between `break` in a switch vs `break` in a loop?",
    shortAnswer: "`break` in a switch exits the switch body; `break` in a loop terminates loop iterations.",
    explanation: "Inside a switch that is inside a loop, `break` only exits the switch, NOT the enclosing loop.",
    hint: "Only breaks out of the immediately enclosing switch or loop.",
    level: "intermediate"
  },
  {
    question: "Can you use relational expressions like `case > 10:` in standard C switch statements?",
    shortAnswer: "No, standard C only supports exact equality matching with discrete integer constants.",
    explanation: "For ranges, use an else-if ladder or GCC's non-standard case range extension (`case 1 ... 5:`).",
    hint: "Only exact constant equality, not relational inequalities.",
    level: "basic"
  },
  {
    question: "What compiler warning flag in GCC detects missing break statements?",
    shortAnswer: "`-Wimplicit-fallthrough`",
    explanation: "Warns whenever a case falls through without an explicit break or `/* fallthrough */` comment annotation.",
    hint: "-Wimplicit-fallthrough in GCC/Clang.",
    level: "advanced"
  },
  {
    question: "Can a switch statement be nested inside another switch statement?",
    shortAnswer: "Yes, nested switch statements are fully legal in C.",
    explanation: "The `break` statement in the inner switch only exits the inner switch, not the outer one.",
    hint: "Inner break only exits the inner switch block.",
    level: "basic"
  },
  {
    question: "Can a `return` statement be used instead of `break` inside a switch case?",
    shortAnswer: "Yes, if the switch is inside a function, `return` exits both the switch and the enclosing function immediately.",
    explanation: "Commonly used in lookup functions to return a result without needing a break.",
    hint: "Exits function directly.",
    level: "basic"
  },
  {
    question: "What is a Binary Search Tree optimization in large sparse switch statements?",
    shortAnswer: "When case constants are sparse and non-contiguous (e.g. 10, 500, 100000), the compiler generates a balanced binary search comparison tree (O(log N)) instead of a giant jump table.",
    explanation: "Prevents wasting massive memory on empty jump table slots for widely spaced integers.",
    hint: "O(log N) binary search for sparse switch values.",
    level: "advanced"
  },
  {
    question: "How do you implement an interactive menu system using a switch statement?",
    shortAnswer: "Prompt the user for a numeric or character choice, read with `scanf`, and pass the variable into a switch statement.",
    explanation: "Wrap the menu in a `do-while` loop until the user selects the exit option.",
    hint: "do-while loop wrapping a switch menu.",
    level: "basic"
  },
  {
    question: "Why should `/* fallthrough */` comments be used for intentional fall-through in modern C code?",
    shortAnswer: "To document code intent for other engineers and suppress compiler `-Wimplicit-fallthrough` warnings.",
    explanation: "Explicit comments clarify that the missing break is intentional rather than a bug.",
    hint: "Suppresses warnings and confirms programmer intent.",
    level: "intermediate"
  }
];

export default questions;
