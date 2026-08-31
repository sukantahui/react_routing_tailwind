// topic12_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 12
// Topic: Recursive LAMBDAs: Solving algorithmic loops (e.g., calculating factorials, string reversals, or deep tree traversal)
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is a Recursive LAMBDA in modern Microsoft Excel 365?",
    shortAnswer: "A named LAMBDA function registered in Name Manager that calls itself by name from within its own definition to solve iterative or recursive algorithmic problems.",
    explanation: "Recursive LAMBDAs allow Excel to execute Turing-complete loops directly in native formula memory without VBA or macros.",
    hint: "A named LAMBDA that invokes itself from within its own body.",
    level: "basic",
    codeExample: "=LAMBDA(n, IF(n <= 1, 1, n * FX_FACTORIAL(n - 1)))"
  },
  {
    question: "Can an anonymous in-cell LAMBDA call itself recursively without being registered in Name Manager?",
    shortAnswer: "No, in standard Excel, a LAMBDA must be registered under a defined name in Name Manager so that its body has an identifier to call itself.",
    explanation: "Excel requires the Name Manager identifier to resolve self-referencing call stacks (unless using complex Y-combinator logic).",
    hint: "Must be registered in Name Manager to have a named self-reference.",
    level: "basic",
    codeExample: "Requires Name Manager Registration"
  },
  {
    question: "What are the two mandatory components of any valid recursive LAMBDA function?",
    shortAnswer: "1. Base Case (termination condition that returns a value without recursing), and 2. Recursive Case (the step that reduces the problem and calls the function itself).",
    explanation: "Without a base case, recursion runs infinitely until the stack limit is reached, throwing a #NUM! error.",
    hint: "Base case (to stop) and recursive case (to continue).",
    level: "basic",
    codeExample: "IF(BaseCondition, BaseResult, RecursiveStep)"
  },
  {
    question: "What is the maximum recursion depth limit enforced by Microsoft Excel 365?",
    shortAnswer: "1,024 recursive stack frames (1,024 nested calls).",
    explanation: "Exceeding 1,024 recursive frames triggers a #NUM! error to protect Excel from unrecoverable system stack overflow.",
    hint: "1,024 recursive call frames.",
    level: "moderate",
    codeExample: "Max Depth = 1,024 Calls → #NUM! if exceeded"
  },
  {
    question: "How do you define a recursive factorial function FX_FACT in Name Manager?",
    shortAnswer: "=LAMBDA(n, IF(n <= 1, 1, n * FX_FACT(n - 1)))",
    explanation: "If n <= 1, returns 1 (base case); otherwise multiplies n by FX_FACT(n - 1).",
    hint: "IF(n <= 1, 1, n * FX_FACT(n - 1)).",
    level: "basic",
    codeExample: "FX_FACT = LAMBDA(n, IF(n<=1, 1, n*FX_FACT(n-1)))"
  },
  {
    question: "How do you define a recursive string reversal function FX_REVERSE in Name Manager?",
    shortAnswer: "=LAMBDA(str, IF(LEN(str) <= 1, str, RIGHT(str, 1) & FX_REVERSE(MID(str, 1, LEN(str) - 1))))",
    explanation: "Extracts the last character and recurses on the remaining substring until the length is <= 1.",
    hint: "RIGHT(str, 1) & FX_REVERSE(remaining_str).",
    level: "moderate",
    codeExample: "FX_REVERSE = LAMBDA(s, IF(LEN(s)<=1, s, RIGHT(s,1) & FX_REVERSE(LEFT(s,LEN(s)-1))))"
  },
  {
    question: "What error does Excel return if a recursive LAMBDA enters an infinite loop or exceeds 1,024 iterations?",
    shortAnswer: "#NUM! error.",
    explanation: "Excel detects stack exhaustion and returns #NUM! rather than crashing the application.",
    hint: "Infinite loops trigger #NUM!.",
    level: "basic",
    codeExample: "#NUM!"
  },
  {
    question: "How do you implement the Euclidean algorithm for Greatest Common Divisor FX_GCD recursively?",
    shortAnswer: "=LAMBDA(a, b, IF(b = 0, a, FX_GCD(b, MOD(a, b))))",
    explanation: "Recursively passes `b` and `MOD(a, b)` until remainder `b` equals 0.",
    hint: "IF(b = 0, a, FX_GCD(b, MOD(a, b))).",
    level: "moderate",
    codeExample: "FX_GCD = LAMBDA(a, b, IF(b=0, a, FX_GCD(b, MOD(a, b))))"
  },
  {
    question: "How do you compute the Nth Fibonacci number recursively using FX_FIB?",
    shortAnswer: "=LAMBDA(n, IF(n <= 1, n, FX_FIB(n - 1) + FX_FIB(n - 2)))",
    explanation: "Returns n if n <= 1; otherwise sums the results of the previous two Fibonacci calls.",
    hint: "IF(n<=1, n, FX_FIB(n-1) + FX_FIB(n-2)).",
    level: "moderate",
    codeExample: "FX_FIB = LAMBDA(n, IF(n<=1, n, FX_FIB(n-1) + FX_FIB(n-2)))"
  },
  {
    question: "Why is tail-call optimization important in software, and does Excel 365 support tail-call recursion optimization?",
    shortAnswer: "Excel 365 currently does not optimize tail calls; all recursive calls consume stack frames up to the hard 1,024 limit.",
    explanation: "Engineers must design recursive algorithms to terminate within 1,024 steps or use iterative helper functions (like REDUCE/SCAN) instead.",
    hint: "Excel consumes 1 stack frame per call (1,024 max).",
    level: "expert",
    codeExample: "1,024 Hard Stack Frame Boundary"
  },
  {
    question: "How can a recursive LAMBDA traverse a parent-child corporate organizational hierarchy to find the top CEO?",
    shortAnswer: "=LAMBDA(empID, LET(managerID, XLOOKUP(empID, EmpTbl[ID], EmpTbl[MgrID]), IF(OR(managerID=\"\", managerID=empID), empID, FX_FIND_CEO(managerID))))",
    explanation: "Looks up the employee's manager and recurses upwards until reaching a record where manager is blank or self-referential.",
    hint: "Recurse upwards through manager IDs until reaching the root.",
    level: "expert",
    codeExample: "Hierarchy Rollup: FX_FIND_CEO(managerID)"
  },
  {
    question: "How do you count the total depth level of an employee in an organizational tree using recursive LAMBDA?",
    shortAnswer: "=LAMBDA(empID, LET(mgrID, XLOOKUP(empID, EmpTbl[ID], EmpTbl[MgrID]), IF(OR(mgrID=\"\", mgrID=empID), 1, 1 + FX_GET_LEVEL(mgrID))))",
    explanation: "Adds 1 for each manager level climbed until reaching the top root executive.",
    hint: "1 + FX_GET_LEVEL(mgrID) until root.",
    level: "advanced",
    codeExample: "FX_GET_LEVEL = LAMBDA(id, IF(isRoot, 1, 1 + FX_GET_LEVEL(mgr)))"
  },
  {
    question: "How do you parse a delimited string into a dynamic array recursively using FX_SPLIT?",
    shortAnswer: "=LAMBDA(text, delim, LET(pos, FIND(delim, text & delim), token, LEFT(text, pos - 1), rest, MID(text, pos + LEN(delim), LEN(text)), IF(rest=\"\", token, VSTACK(token, FX_SPLIT(rest, delim)))))",
    explanation: "Extracts the first token before the delimiter and VSTACKs it with recursive splits of the remaining string.",
    hint: "VSTACK(token, FX_SPLIT(rest, delim)).",
    level: "expert",
    codeExample: "Recursive String Tokenizer with VSTACK"
  },
  {
    question: "How do you calculate the power of a number FX_POWER(base, exp) recursively for positive integers?",
    shortAnswer: "=LAMBDA(base, exp, IF(exp = 0, 1, base * FX_POWER(base, exp - 1)))",
    explanation: "Base case: exp = 0 returns 1. Recursive case: base * FX_POWER(base, exp - 1).",
    hint: "IF(exp = 0, 1, base * FX_POWER(base, exp - 1)).",
    level: "basic",
    codeExample: "FX_POWER = LAMBDA(b, e, IF(e=0, 1, b*FX_POWER(b, e-1)))"
  },
  {
    question: "Can LET be used inside a recursive LAMBDA definition?",
    shortAnswer: "Yes, nesting LET inside a recursive LAMBDA is the best practice for caching lookups, intermediate states, and preventing redundant recalculations.",
    explanation: "LET structures the base condition and simplifies recursive call parameters.",
    hint: "LET inside recursive LAMBDA caches intermediate expressions.",
    level: "advanced",
    codeExample: "LET inside Recursive LAMBDA"
  },
  {
    question: "How do you test a recursive LAMBDA before registering it in Name Manager?",
    shortAnswer: "Because self-reference requires a defined name, you must first register the function in Name Manager, then test it in a worksheet cell with small integer arguments.",
    explanation: "Testing with small inputs (e.g. n = 5) prevents unexpected infinite loop errors.",
    hint: "Register in Name Manager and test with small inputs.",
    level: "moderate",
    codeExample: "=FX_FACT(5) → Returns 120"
  },
  {
    question: "How do you compute the sum of digits of an integer recursively using FX_SUM_DIGITS?",
    shortAnswer: "=LAMBDA(n, IF(n < 10, n, MOD(n, 10) + FX_SUM_DIGITS(INT(n / 10))))",
    explanation: "Extracts last digit using MOD(n, 10) and adds it to recursive call on INT(n / 10).",
    hint: "MOD(n, 10) + FX_SUM_DIGITS(INT(n / 10)).",
    level: "moderate",
    codeExample: "FX_SUM_DIGITS = LAMBDA(n, IF(n<10, n, MOD(n,10) + FX_SUM_DIGITS(INT(n/10))))"
  },
  {
    question: "How does a recursive Bill of Materials (BOM) explosion work in manufacturing inventory?",
    shortAnswer: "A recursive LAMBDA starts at a finished product, queries its sub-components, queries their sub-sub-components recursively, and aggregates total required raw materials.",
    explanation: "Traverses multi-level assembly trees to calculate exact component requirements.",
    hint: "Traverses nested sub-assembly parts down to raw materials.",
    level: "expert",
    codeExample: "Multi-Level Recursive BOM Explosion"
  },
  {
    question: "What happens if a dataset contains circular references in parent-child hierarchy data (e.g. A reports to B, B reports to A)?",
    shortAnswer: "The recursive LAMBDA will loop infinitely between A and B until hitting the 1,024 stack limit, returning #NUM!.",
    explanation: "Defensive hierarchy LAMBDAs track visited nodes or limit depth to prevent circular crash loops.",
    hint: "Circular hierarchy loops trigger #NUM!.",
    level: "expert",
    codeExample: "Circular Dependency → 1,024 Stack Limit Exceeded (#NUM!)"
  },
  {
    question: "How do you implement a depth-limited hierarchy traversal to guard against circular references?",
    shortAnswer: "=LAMBDA(empID, [maxDepth], LET(depth, IF(ISOMITTED(maxDepth), 20, maxDepth), mgrID, XLOOKUP(empID, EmpTbl[ID], EmpTbl[MgrID]), IF(OR(depth<=0, mgrID=\"\", mgrID=empID), empID, FX_SAFE_CEO(mgrID, depth - 1))))",
    explanation: "Decrements maxDepth on each recursive call, terminating safely if depth reaches 0.",
    hint: "Decrement maxDepth parameter on each recursive call.",
    level: "expert",
    codeExample: "Depth-Limited Defensive Recursion Pattern"
  },
  {
    question: "How do you recursively clean and strip all non-alphanumeric characters from a string using FX_STRIP?",
    shortAnswer: "=LAMBDA(text, LET(c, LEFT(text, 1), isAlpha, AND(CODE(UPPER(c))>=65, CODE(UPPER(c))<=90), rest, MID(text, 2, LEN(text)), IF(text=\"\", \"\", IF(isAlpha, c, \"\") & FX_STRIP(rest))))",
    explanation: "Checks first character validity and prepends it to recursive strip of the remainder.",
    hint: "Process head character and recurse on tail.",
    level: "advanced",
    codeExample: "Head/Tail Character-by-Character Recursion"
  },
  {
    question: "Can a recursive LAMBDA return a dynamic spilled array rather than a single scalar?",
    shortAnswer: "Yes, by assembling results using VSTACK or HSTACK during recursive unwinding (e.g. generating sequence lists or tree paths).",
    explanation: "VSTACK(current_val, FX_RECURSE(next_val)) builds a dynamic vertical array during recursive call returns.",
    hint: "Use VSTACK to build spilled array during recursion.",
    level: "advanced",
    codeExample: "VSTACK(item, FX_RECURSE(rest))"
  },
  {
    question: "How do you calculate binary search tree (BST) path discovery recursively in Excel?",
    shortAnswer: "=LAMBDA(nodeID, target, IF(nodeID=target, nodeID, LET(nextID, IF(target<nodeID, XLOOKUP(nodeID, Tbl[ID], Tbl[Left]), XLOOKUP(nodeID, Tbl[ID], Tbl[Right])), IF(nextID=\"\", \"NOT FOUND\", nodeID & \" → \" & FX_BST(nextID, target)))))",
    explanation: "Branches left or right depending on target comparison and strings together the search path.",
    hint: "Branch left/right and recurse down the tree.",
    level: "expert",
    codeExample: "Recursive Binary Search Tree Traversal"
  },
  {
    question: "Why are recursive LAMBDAs considered proof that Excel's formula language is Turing Complete?",
    shortAnswer: "Because lambda calculus with unbounded recursion and conditional evaluation can simulate any algorithmic computer program.",
    explanation: "Excel 365 formulas with LAMBDA and recursion satisfy the formal mathematical definition of Turing Completeness.",
    hint: "Lambda calculus + recursion + conditionals = Turing Completeness.",
    level: "expert",
    codeExample: "Excel Formula Language is Turing Complete"
  },
  {
    question: "How do you reverse a 1D column array recursively using FX_REVERSE_ARRAY?",
    shortAnswer: "=LAMBDA(arr, IF(ROWS(arr) <= 1, arr, VSTACK(TAKE(arr, -1), FX_REVERSE_ARRAY(DROP(arr, -1)))))",
    explanation: "Pulls the last element with TAKE(arr, -1) and VSTACKs it before the recursive reversal of DROP(arr, -1).",
    hint: "VSTACK(TAKE(arr, -1), FX_REVERSE_ARRAY(DROP(arr, -1))).",
    level: "advanced",
    codeExample: "FX_REVERSE_ARR = LAMBDA(a, IF(ROWS(a)<=1, a, VSTACK(TAKE(a,-1), FX_REVERSE_ARR(DROP(a,-1)))))"
  },
  {
    question: "What is the primary trade-off between using a recursive LAMBDA vs a higher-order helper function like REDUCE?",
    shortAnswer: "REDUCE is faster and safer from stack overflow for linear iterations; Recursive LAMBDA is necessary for non-linear structures like trees, hierarchies, and dynamic depth graphs.",
    explanation: "Use REDUCE for fixed arrays; use Recursive LAMBDAs for branched tree traversals and dynamic termination conditions.",
    hint: "REDUCE for linear arrays; Recursive LAMBDA for trees and graphs.",
    level: "expert",
    codeExample: "REDUCE (Linear Arrays) vs Recursive LAMBDA (Trees & Graphs)"
  },
  {
    question: "How do you compute Ackerman's Function A(m, n) recursively in Excel?",
    shortAnswer: "=LAMBDA(m, n, IF(m=0, n+1, IF(n=0, FX_ACK(m-1, 1), FX_ACK(m-1, FX_ACK(m, n-1)))))",
    explanation: "Classical deep recursive benchmark function demonstrating nested recursion in Excel.",
    hint: "Ackerman's nested recursive formula.",
    level: "expert",
    codeExample: "FX_ACK = LAMBDA(m, n, IF(m=0, n+1, IF(n=0, FX_ACK(m-1,1), FX_ACK(m-1, FX_ACK(m, n-1)))))"
  },
  {
    question: "How do you find all ancestors of an employee formatted as a comma-separated path string?",
    shortAnswer: "=LAMBDA(empID, LET(mgrID, XLOOKUP(empID, EmpTbl[ID], EmpTbl[MgrID]), IF(OR(mgrID=\"\", mgrID=empID), empID, empID & \" → \" & FX_ANCESTORS(mgrID))))",
    explanation: "Constructs the full reporting chain from the employee up to the board level.",
    hint: "empID & \" → \" & FX_ANCESTORS(mgrID).",
    level: "advanced",
    codeExample: "FX_ANCESTORS = LAMBDA(id, id & \" → \" & FX_ANCESTORS(mgr))"
  },
  {
    question: "What happens if a user enters a negative number into a recursive factorial LAMBDA FX_FACT(n)?",
    shortAnswer: "The base case (n <= 1) immediately triggers and returns 1, preventing an infinite negative downward loop.",
    explanation: "Writing `n <= 1` instead of `n = 1` is defensive programming against negative numbers.",
    hint: "Always use <= 1 rather than = 1 for base cases.",
    level: "moderate",
    codeExample: "Defensive Base Case: n <= 1"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Recursive LAMBDAs?",
    shortAnswer: "Always code a rock-solid, defensive base case (using <= rather than ==) and enforce an optional maxDepth limiter when traversing corporate hierarchies or data trees to guarantee that your recursive formulas never crash or trigger #NUM! stack overflow!",
    explanation: "Recursive LAMBDAs unlock true computer science power inside Excel, enabling automated organizational rollups, BOM explosions, and algorithmic tokenizers with zero VBA dependencies!",
    hint: "Defensive base condition + depth limiter = bulletproof recursion.",
    level: "expert",
    codeExample: "Rule: Rock-Solid Base Case + Depth Limiter = Safe Recursion!"
  }
];

export default questions;
