const questions = [
  {
    question: "What is the product rule for logarithms?",
    shortAnswer: "logₐ(xy) = logₐ(x) + logₐ(y)",
    explanation: "The log of a product equals the sum of the logs.",
    hint: "Multiplication becomes addition.",
    level: "basic",
    codeExample: "// log2(4*8) = log2(4)+log2(8)=2+3=5"
  },
  {
    question: "What is the quotient rule for logarithms?",
    shortAnswer: "logₐ(x/y) = logₐ(x) - logₐ(y)",
    explanation: "The log of a quotient equals the difference of the logs.",
    hint: "Division becomes subtraction.",
    level: "basic",
    codeExample: "// log2(8/2) = log2(8)-log2(2)=3-1=2"
  },
  {
    question: "What is the power rule for logarithms?",
    shortAnswer: "logₐ(xⁿ) = n·logₐ(x)",
    explanation: "The log of a power equals the exponent times the log of the base.",
    hint: "Exponent becomes multiplier.",
    level: "basic",
    codeExample: "// log2(8^2) = 2*log2(8)=6"
  },
  {
    question: "What is the change of base formula?",
    shortAnswer: "logₐ(x) = log_b(x) / log_b(a)",
    explanation: "Allows conversion of log from one base to another.",
    hint: "Divide logs of the same base.",
    level: "intermediate",
    codeExample: "// log2(8) = ln(8)/ln(2)"
  },
  {
    question: "Simplify: log₅(25) + log₅(4).",
    shortAnswer: "log₅(100)",
    explanation: "Using product rule in reverse: log₅(25·4) = log₅(100).",
    hint: "Combine logs by multiplying arguments.",
    level: "basic",
    codeExample: "// log5(25) + log5(4) = log5(100)"
  },
  {
    question: "Simplify: log₂(64) − log₂(4).",
    shortAnswer: "log₂(16) = 4",
    explanation: "Using quotient rule: log₂(64/4) = log₂(16) = 4.",
    hint: "Divide arguments.",
    level: "basic",
    codeExample: "// log2(64) - log2(4) = log2(16) = 4"
  },
  {
    question: "Simplify: 3·log₂(8).",
    shortAnswer: "9",
    explanation: "Power rule: log₂(8³) = 3·3 = 9.",
    hint: "Multiply the log by the exponent.",
    level: "basic",
    codeExample: "// 3*log2(8) = log2(8^3) = log2(512) = 9"
  },
  {
    question: "Is log₂(8) + log₂(4) equal to log₂(12)?",
    shortAnswer: "No, because product rule requires multiplication: log₂(8·4)=log₂(32), not log₂(12).",
    explanation: "The arguments must be multiplied, not added.",
    hint: "Only log(ab) = log(a)+log(b), not log(a+b).",
    level: "intermediate",
    codeExample: "// log2(8)+log2(4)=log2(32), not log2(12)"
  },
  {
    question: "Is log₂(8) - log₂(4) equal to log₂(2)?",
    shortAnswer: "Yes, because log₂(8/4)=log₂(2).",
    explanation: "Quotient rule: 3 - 2 = 1.",
    hint: "Subtraction corresponds to division.",
    level: "basic",
    codeExample: "// log2(8)-log2(4)=log2(2)=1"
  },
  {
    question: "Simplify: log₂(8²) / 2.",
    shortAnswer: "3",
    explanation: "Power rule: log₂(8²)=2·log₂(8)=6, then divide by 2 gives 3.",
    hint: "Pull down exponent first.",
    level: "intermediate",
    codeExample: "// log2(8^2)/2 = (2*3)/2 = 3"
  },
  {
    question: "What is logₐ(1) using any base a?",
    shortAnswer: "0",
    explanation: "a⁰ = 1, so logₐ(1)=0.",
    hint: "Power of zero.",
    level: "basic",
    codeExample: "// log2(1) = 0"
  },
  {
    question: "What is logₐ(a) for any base a?",
    shortAnswer: "1",
    explanation: "a¹ = a, so logₐ(a)=1.",
    hint: "Base raised to 1 is itself.",
    level: "basic",
    codeExample: "// log2(2) = 1"
  },
  {
    question: "Simplify: log₂(2⁵).",
    shortAnswer: "5",
    explanation: "Power rule: log₂(2⁵)=5·log₂(2)=5·1=5.",
    hint: "Exponent drops down.",
    level: "basic",
    codeExample: "// log2(2^5) = 5"
  },
  {
    question: "Simplify: log₅(125) - log₅(5).",
    shortAnswer: "2",
    explanation: "log₅(125)=3, log₅(5)=1, difference=2. Or quotient rule: log₅(125/5)=log₅(25)=2.",
    hint: "25 is 5².",
    level: "intermediate",
    codeExample: "// log5(125) - log5(5) = log5(25) = 2"
  },
  {
    question: "Simplify: 2·log₃(9) + 1.",
    shortAnswer: "5",
    explanation: "log₃(9)=2, so 2·2+1=5.",
    hint: "First compute log, then multiply.",
    level: "basic",
    codeExample: "// 2*log3(9)+1 = 2*2+1 = 5"
  },
  {
    question: "Can you use product rule to simplify log₂(x²y³)?",
    shortAnswer: "2·log₂(x) + 3·log₂(y)",
    explanation: "Expand using product rule: log₂(x²) + log₂(y³) then power rule.",
    hint: "Break product into sum of logs.",
    level: "intermediate",
    codeExample: "// log2(x^2 * y^3) = 2log2(x) + 3log2(y)"
  },
  {
    question: "Can you condense: 3·log₂(x) + 4·log₂(y)?",
    shortAnswer: "log₂(x³ · y⁴)",
    explanation: "Use power rule to move coefficients inside: log₂(x³) + log₂(y⁴), then product rule.",
    hint: "Combine into a single log.",
    level: "intermediate",
    codeExample: "// 3log2(x)+4log2(y) = log2(x^3 * y^4)"
  },
  {
    question: "Is log₂(8)² equal to (log₂(8))²?",
    shortAnswer: "No, log₂(8²) = 2·log₂(8) = 6, while (log₂(8))² = 9.",
    explanation: "Be careful where the exponent is.",
    hint: "Power rule vs squaring the log.",
    level: "intermediate",
    codeExample: "// log2(8^2) = 6, (log2(8))^2 = 9"
  },
  {
    question: "Why is change of base formula useful in programming?",
    shortAnswer: "Because many languages only provide natural log or log10, so you compute any base.",
    explanation: "You can compute log_b(x) = ln(x)/ln(b).",
    hint: "Less reliance on specific functions.",
    level: "intermediate",
    codeExample: "double logBase = Math.log(x) / Math.log(b);"
  },
  {
    question: "What is the value of log₂(32) using the power rule?",
    shortAnswer: "5, since 32 = 2⁵.",
    explanation: "log₂(2⁵) = 5·log₂(2) = 5.",
    hint: "32 is a power of 2.",
    level: "basic",
    codeExample: "// log2(32) = 5"
  },
  {
    question: "What is the value of log₁₀(1000) using the power rule?",
    shortAnswer: "3",
    explanation: "1000 = 10³, so log₁₀(10³)=3·log₁₀(10)=3.",
    hint: "1000 is 10 cubed.",
    level: "basic",
    codeExample: "// log10(1000) = 3"
  },
  {
    question: "If log₂(x) = 5, what is x?",
    shortAnswer: "x = 32",
    explanation: "2⁵ = 32.",
    hint: "Exponentiate.",
    level: "basic",
    codeExample: "// x = Math.pow(2, 5)"
  },
  {
    question: "Simplify: log₂(16) + log₂(8) - log₂(2).",
    shortAnswer: "4 + 3 - 1 = 6",
    explanation: "Use known values: log₂(16)=4, log₂(8)=3, log₂(2)=1.",
    hint: "Compute each log separately.",
    level: "intermediate",
    codeExample: "// 4 + 3 - 1 = 6"
  },
  {
    question: "Simplify: log₃(81) / 2.",
    shortAnswer: "2",
    explanation: "log₃(81)=4, then 4/2=2.",
    hint: "81 = 3⁴.",
    level: "basic",
    codeExample: "// log3(81)/2 = 4/2 = 2"
  },
  {
    question: "What is log₂(64) + log₂(2) - log₂(8)?",
    shortAnswer: "6 + 1 - 3 = 4",
    explanation: "log₂(64)=6, log₂(2)=1, log₂(8)=3.",
    hint: "Compute each and then combine.",
    level: "intermediate",
    codeExample: "// 6 + 1 - 3 = 4"
  },
  {
    question: "Using the power rule, simplify log₄(16²).",
    shortAnswer: "4",
    explanation: "log₄(16)=2, so 2·log₄(16)=2·2=4.",
    hint: "16 = 4².",
    level: "intermediate",
    codeExample: "// log4(16^2) = 2*log4(16) = 2*2 = 4"
  },
  {
    question: "Can the product rule be applied to logₐ(x+y)?",
    shortAnswer: "No, the product rule only applies to multiplication.",
    explanation: "logₐ(x+y) cannot be simplified using product rule.",
    hint: "No rule for sum of arguments.",
    level: "basic",
    codeExample: "// log(x+y) is not log(x)+log(y)"
  },
  {
    question: "Simplify: log₅(125) · log₂(8).",
    shortAnswer: "3 · 3 = 9",
    explanation: "log₅(125)=3, log₂(8)=3.",
    hint: "Compute each logarithm first.",
    level: "intermediate",
    codeExample: "// 3 * 3 = 9"
  },
  {
    question: "What is log₂(0.5)?",
    shortAnswer: "-1",
    explanation: "0.5 = 2^{-1}, so log₂(2^{-1}) = -1.",
    hint: "Negative exponent.",
    level: "intermediate",
    codeExample: "// log2(0.5) = -1"
  },
  {
    question: "Simplify: log₃(27) - log₃(3).",
    shortAnswer: "3 - 1 = 2",
    explanation: "log₃(27)=3, log₃(3)=1.",
    hint: "Quotient rule could also be used.",
    level: "basic",
    codeExample: "// 3 - 1 = 2"
  },
  {
    question: "What is the result of log₂(16) - log₂(4) + log₂(2)?",
    shortAnswer: "4 - 2 + 1 = 3",
    explanation: "log₂(16)=4, log₂(4)=2, log₂(2)=1.",
    hint: "Compute each then combine.",
    level: "intermediate",
    codeExample: "// 4 - 2 + 1 = 3"
  }
];

export default questions;