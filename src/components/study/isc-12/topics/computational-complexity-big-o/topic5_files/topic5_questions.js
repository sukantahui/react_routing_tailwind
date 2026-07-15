const questions = [
  {
    question: "What is the logarithmic form of the equation b^y = x?",
    shortAnswer: "log_b(x) = y",
    explanation: "The base b remains the base of the logarithm; the exponent y becomes the logarithm value; the result x becomes the argument.",
    hint: "Base stays, exponent and result swap.",
    level: "basic",
    codeExample: "// 2^3 = 8 ↔ log₂(8) = 3"
  },
  {
    question: "What is the exponential form of log_b(x) = y?",
    shortAnswer: "b^y = x",
    explanation: "The base b raised to the power y equals x.",
    hint: "Convert by raising base to the log value.",
    level: "basic",
    codeExample: "// log₂(8) = 3 ↔ 2^3 = 8"
  },
  {
    question: "Convert 3^4 = 81 to logarithmic form.",
    shortAnswer: "log₃(81) = 4",
    explanation: "Base is 3, result is 81, exponent is 4.",
    hint: "Identify base, exponent, result.",
    level: "basic",
    codeExample: "// log3(81) = 4"
  },
  {
    question: "Convert log₅(125) = 3 to exponential form.",
    shortAnswer: "5^3 = 125",
    explanation: "Base 5 raised to power 3 equals 125.",
    hint: "Raise the base to the log value.",
    level: "basic",
    codeExample: "// 5^3 = 125"
  },
  {
    question: "What is the value of log₂(32)?",
    shortAnswer: "5",
    explanation: "2^5 = 32, so log₂(32) = 5.",
    hint: "What power of 2 gives 32?",
    level: "basic",
    codeExample: "// log2(32) = 5"
  },
  {
    question: "What is the exponential form of log₁₀(1000) = 3?",
    shortAnswer: "10^3 = 1000",
    explanation: "10 raised to the power 3 equals 1000.",
    hint: "Base 10, exponent 3.",
    level: "basic",
    codeExample: "// 10^3 = 1000"
  },
  {
    question: "Solve for y: 6^y = 216.",
    shortAnswer: "y = log₆(216) = 3",
    explanation: "6^3 = 216, so y = 3.",
    hint: "Find the exponent.",
    level: "intermediate",
    codeExample: "// y = Math.log(216)/Math.log(6)"
  },
  {
    question: "Solve for x: log₇(x) = 2.",
    shortAnswer: "x = 7^2 = 49",
    explanation: "7^2 = 49.",
    hint: "Use exponential form.",
    level: "intermediate",
    codeExample: "// x = Math.pow(7, 2)"
  },
  {
    question: "Convert 2^10 = 1024 to logarithmic form.",
    shortAnswer: "log₂(1024) = 10",
    explanation: "Base 2, result 1024, exponent 10.",
    hint: "The result becomes the argument.",
    level: "basic",
    codeExample: "// log2(1024) = 10"
  },
  {
    question: "Convert log₈(512) = 3 to exponential form.",
    shortAnswer: "8^3 = 512",
    explanation: "8^3 = 512.",
    hint: "Raise base to log.",
    level: "basic",
    codeExample: "// 8^3 = 512"
  },
  {
    question: "If log_b(27) = 3, what is b?",
    shortAnswer: "b = 3",
    explanation: "b^3 = 27 → b = 27^(1/3) = 3.",
    hint: "Solve for base.",
    level: "intermediate",
    codeExample: "// b = Math.pow(27, 1.0/3)"
  },
  {
    question: "If 4^y = 1024, what is y?",
    shortAnswer: "y = 5",
    explanation: "4^5 = 1024, so y = 5.",
    hint: "Take log base 4 of both sides.",
    level: "intermediate",
    codeExample: "// y = Math.log(1024)/Math.log(4)"
  },
  {
    question: "What is the relationship between exponential and logarithmic functions?",
    shortAnswer: "They are inverse functions.",
    explanation: "If f(x) = b^x, then f^{-1}(x) = log_b(x).",
    hint: "They undo each other.",
    level: "basic",
    codeExample: "// f(f^{-1}(x)) = x"
  },
  {
    question: "Why are exponential and logarithmic forms useful in algorithm analysis?",
    shortAnswer: "They help solve for the input size when the number of operations is known.",
    explanation: "If an algorithm takes O(2^n) time, to find n for a given time, you use log₂(time).",
    hint: "Think of reversing the complexity.",
    level: "intermediate",
    codeExample: "// n = log2(operations)"
  },
  {
    question: "Convert log₂(64) = 6 to exponential form.",
    shortAnswer: "2^6 = 64",
    explanation: "2^6 = 64.",
    hint: "Raise 2 to the power 6.",
    level: "basic",
    codeExample: "// 2^6 = 64"
  },
  {
    question: "Convert 5^4 = 625 to logarithmic form.",
    shortAnswer: "log₅(625) = 4",
    explanation: "Base 5, result 625, exponent 4.",
    hint: "Log base 5 of 625 is 4.",
    level: "basic",
    codeExample: "// log5(625) = 4"
  },
  {
    question: "Solve for x: log_x(81) = 4.",
    shortAnswer: "x = 81^(1/4) = 3",
    explanation: "x^4 = 81 → x = 3.",
    hint: "Take fourth root of 81.",
    level: "intermediate",
    codeExample: "// x = Math.pow(81, 0.25)"
  },
  {
    question: "Solve for y: log₂(y) = 8.",
    shortAnswer: "y = 2^8 = 256",
    explanation: "2^8 = 256.",
    hint: "Exponentiate.",
    level: "intermediate",
    codeExample: "// y = Math.pow(2, 8)"
  },
  {
    question: "What is the domain of log_b(x)?",
    shortAnswer: "x > 0",
    explanation: "Logarithms are only defined for positive arguments.",
    hint: "Cannot take log of zero or negative.",
    level: "basic",
    codeExample: "// invalid: Math.log(-5)"
  },
  {
    question: "What is the range of log_b(x) for b > 1?",
    shortAnswer: "All real numbers (-∞, ∞).",
    explanation: "The output can be any real number.",
    hint: "The exponent can be any real.",
    level: "intermediate",
    codeExample: "// log2(0.5) = -1"
  },
  {
    question: "If log_b(1) = 0, what does that imply in exponential form?",
    shortAnswer: "b^0 = 1",
    explanation: "Any base raised to 0 is 1.",
    hint: "Power of zero.",
    level: "basic",
    codeExample: "// b^0 = 1"
  },
  {
    question: "If log_b(b) = 1, what does that imply in exponential form?",
    shortAnswer: "b^1 = b",
    explanation: "The base raised to 1 is itself.",
    hint: "Power of one.",
    level: "basic",
    codeExample: "// b^1 = b"
  },
  {
    question: "Convert 2^y = 128 to logarithmic form and solve for y.",
    shortAnswer: "log₂(128) = y, y = 7",
    explanation: "2^7 = 128.",
    hint: "What power of 2 gives 128?",
    level: "basic",
    codeExample: "// y = log2(128) = 7"
  },
  {
    question: "Convert log₄(256) = y to exponential form and solve for y.",
    shortAnswer: "4^y = 256, y = 4",
    explanation: "4^4 = 256.",
    hint: "Raise 4 to the power y.",
    level: "basic",
    codeExample: "// y = 4"
  },
  {
    question: "How do you compute log_b(x) in Java when b is not 10 or e?",
    shortAnswer: "Use Math.log(x) / Math.log(b).",
    explanation: "This applies the change of base formula.",
    hint: "Natural logs are used for conversion.",
    level: "intermediate",
    codeExample: "double logBase = Math.log(x) / Math.log(b);"
  },
  {
    question: "What is the relationship between the graph of y = b^x and y = log_b(x)?",
    shortAnswer: "They are reflections across the line y = x.",
    explanation: "The graphs are symmetric about y = x.",
    hint: "Inverse functions.",
    level: "intermediate",
    codeExample: "// Not code-specific"
  },
  {
    question: "If 10^y = 0.001, what is y?",
    shortAnswer: "y = -3",
    explanation: "10^{-3} = 0.001.",
    hint: "Negative exponents give fractions.",
    level: "intermediate",
    codeExample: "// y = log10(0.001) = -3"
  },
  {
    question: "Convert log₀.5(16) = -4 to exponential form.",
    shortAnswer: "(0.5)^{-4} = 16",
    explanation: "0.5^{-4} = 2^4 = 16.",
    hint: "Negative exponent of fraction.",
    level: "advanced",
    codeExample: "// (0.5)^-4 = 16"
  },
  {
    question: "Solve for x: log_x(256) = 2.",
    shortAnswer: "x = 16",
    explanation: "x^2 = 256 → x = 16 (positive root).",
    hint: "Take square root.",
    level: "intermediate",
    codeExample: "// x = Math.sqrt(256)"
  },
  {
    question: "What is the value of log_2(2) + log_2(8)?",
    shortAnswer: "1 + 3 = 4",
    explanation: "log₂(2)=1, log₂(8)=3. Sum = 4.",
    hint: "Use product rule: log₂(16)=4.",
    level: "intermediate",
    codeExample: "// log2(2) + log2(8) = log2(16) = 4"
  },
  {
    question: "Explain the identity: b^(log_b(x)) = x.",
    shortAnswer: "Because log_b(x) is the exponent to which b must be raised to get x.",
    explanation: "This is the inverse property.",
    hint: "Exponent and log cancel.",
    level: "basic",
    codeExample: "// double x = Math.pow(b, Math.log(x)/Math.log(b));"
  }
];

export default questions;