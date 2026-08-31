const topic1_questions = [
  {
    question: "According to the Change-of-Base Theorem, what is the formula to convert log_a(N) into base b?",
    options: [
      "log_a(N) = log_b(N) * log_b(a)",
      "log_a(N) = log_b(N) / log_b(a)",
      "log_a(N) = log_b(a) / log_b(N)",
      "log_a(N) = log_b(N) + log_b(a)"
    ],
    correctAnswer: 1,
    explanation: "The Change of Base formula is log_a(N) = log_b(N) / log_b(a). This proves that logarithms in any two bases differ only by a constant multiplier (1 / log_b(a))."
  },
  {
    question: "Why do computer scientists usually omit the logarithm base when writing Big-O complexity (i.e. writing O(log N) instead of O(log_2 N))?",
    options: [
      "Because computer scientists do not know the base",
      "Because the base is always assumed to be base 10",
      "Because log_a(N) = (1 / log_b(a)) * log_b(N), and Big-O notation absorbs constant scalar coefficients (c = 1 / log_b(a)), making all bases asymptotically equivalent",
      "Because Big-O only applies to polynomial functions"
    ],
    correctAnswer: 2,
    explanation: "Since log_a(N) and log_b(N) differ only by a constant multiplier 1 / log_b(a), both belong to the exact same asymptotic complexity class Theta(log N)."
  },
  {
    question: "What is the relationship between log_2(N) and the natural logarithm ln(N) (base e)?",
    options: [
      "log_2(N) = ln(N) / ln(2) ≈ 1.4427 * ln(N)",
      "log_2(N) = ln(N) * ln(2)",
      "log_2(N) = ln(N) - ln(2)",
      "log_2(N) = e * ln(N)"
    ],
    correctAnswer: 0,
    explanation: "By change of base: log_2(N) = ln(N) / ln(2). Since ln(2) ≈ 0.6931, 1 / ln(2) ≈ 1.4427. Thus log_2(N) is exactly 1.4427 times ln(N)."
  },
  {
    question: "What is the relationship between log_2(N) and common log log_10(N)?",
    options: [
      "log_2(N) = log_10(N) / log_10(2) ≈ 3.3219 * log_10(N)",
      "log_2(N) = 10 * log_10(N)",
      "log_2(N) = log_10(N) / 2",
      "log_2(N) = log_10(2N)"
    ],
    correctAnswer: 0,
    explanation: "Since log_10(2) ≈ 0.30103, 1 / log_10(2) ≈ 3.3219. Therefore, log_2(N) ≈ 3.3219 * log_10(N)."
  },
  {
    question: "Which fundamental logarithmic property allows simplifying log(A * B)?",
    options: [
      "log(A * B) = log(A) * log(B)",
      "log(A * B) = log(A) + log(B)",
      "log(A * B) = log(A) / log(B)",
      "log(A * B) = log(A)^B"
    ],
    correctAnswer: 1,
    explanation: "The Product Rule of logarithms states that the logarithm of a product equals the sum of the individual logarithms: log(A * B) = log(A) + log(B)."
  },
  {
    question: "Which property allows simplifying the logarithm of a division log(A / B)?",
    options: [
      "log(A / B) = log(A) / log(B)",
      "log(A / B) = log(A) - log(B)",
      "log(A / B) = log(A) + log(B)",
      "log(A / B) = B * log(A)"
    ],
    correctAnswer: 1,
    explanation: "The Quotient Rule states: log(A / B) = log(A) - log(B)."
  },
  {
    question: "What is the reciprocal base rule for logarithms?",
    options: [
      "log_a(b) = 1 / log_b(a)",
      "log_a(b) = -log_b(a)",
      "log_a(b) = log_b(1/a)",
      "log_a(b) = (log_b(a))^2"
    ],
    correctAnswer: 0,
    explanation: "By change of base: log_a(b) = log_b(b) / log_b(a) = 1 / log_b(a)."
  },
  {
    question: "Does the base of an exponential function matter in Big-O notation (e.g., is O(2^N) equal to O(3^N))?",
    options: [
      "Yes, the base matters in exponents because 3^N / 2^N = 1.5^N → infinity as N → infinity, so O(2^N) is strictly smaller than O(3^N)",
      "No, base is always ignored in all Big-O expressions",
      "No, because 3^N and 2^N differ only by a constant",
      "Yes, but only for negative numbers"
    ],
    correctAnswer: 0,
    explanation: "Crucial difference: In logarithms, different bases differ by a constant multiplier (c = 1/log_b a), so O(log_2 N) = O(log_3 N). But in exponents, 3^N / 2^N = (1.5)^N is NOT constant; it grows exponentially. Base DOES matter for exponentials!"
  },
  {
    question: "What is log_2(16) expressed in natural logarithms?",
    options: [
      "ln(16) / ln(2)",
      "ln(2) / ln(16)",
      "ln(16) * ln(2)",
      "16 * ln(2)"
    ],
    correctAnswer: 0,
    explanation: "By the Change of Base Theorem: log_2(16) = ln(16) / ln(2) = 4."
  },
  {
    question: "If an algorithm performs T(N) = 7 * log_16(N) operations, what is its simplified Big-O complexity?",
    options: [
      "O(log N)",
      "O(16 log N)",
      "O(7 log_16 N)",
      "O(N / 16)"
    ],
    correctAnswer: 0,
    explanation: "log_16(N) = log_2(N) / 4. Thus T(N) = (7/4) * log_2(N) = O(log N)."
  },
  {
    question: "What is log_b(1 / x) equal to?",
    options: [
      "-log_b(x)",
      "1 / log_b(x)",
      "log_b(x)",
      "b - x"
    ],
    correctAnswer: 0,
    explanation: "log_b(1/x) = log_b(x^(-1)) = -log_b(x)."
  },
  {
    question: "What is the value of log_4(64)?",
    options: [
      "2",
      "3",
      "4",
      "16"
    ],
    correctAnswer: 1,
    explanation: "Since 4^3 = 64, log_4(64) = 3."
  },
  {
    question: "What is the value of log_8(2)?",
    options: [
      "3",
      "1/3",
      "4",
      "1/4"
    ],
    correctAnswer: 1,
    explanation: "Since 8^(1/3) = cbrt(8) = 2, log_8(2) = 1/3 (also log_8(2) = 1 / log_2(8) = 1/3)."
  },
  {
    question: "If log_3(N) = k, what is log_9(N)?",
    options: [
      "2k",
      "k / 2",
      "k^2",
      "3k"
    ],
    correctAnswer: 1,
    explanation: "log_9(N) = log_3(N) / log_3(9) = k / 2."
  },
  {
    question: "What is log_2(sqrt(N)) in terms of log_2(N)?",
    options: [
      "sqrt(log_2 N)",
      "(1/2) * log_2(N)",
      "2 * log_2(N)",
      "log_2(N) / N"
    ],
    correctAnswer: 1,
    explanation: "sqrt(N) = N^(1/2). By the power rule, log_2(N^(1/2)) = (1/2) * log_2(N)."
  },
  {
    question: "Is O(log(sqrt(N))) the same complexity class as O(log N)?",
    options: [
      "Yes, because log(sqrt(N)) = 0.5 * log(N), and Big-O ignores the constant factor 0.5",
      "No, O(log(sqrt(N))) is square root complexity",
      "No, O(log N) is exponentially slower",
      "It depends on the base"
    ],
    correctAnswer: 0,
    explanation: "Since log(N^(0.5)) = 0.5 * log(N), the constant scalar 0.5 is absorbed by Big-O, yielding O(log N)."
  },
  {
    question: "What is the value of 2^(log_2(N)) for any positive number N?",
    options: [
      "2N",
      "N",
      "log_2(N)",
      "N^2"
    ],
    correctAnswer: 1,
    explanation: "Exponentiation and logarithm are inverse functions: b^(log_b(x)) = x for any x > 0."
  },
  {
    question: "What is the value of a^(log_b(c)) expressed in an alternative exponent form?",
    options: [
      "c^(log_b(a))",
      "b^(log_a(c))",
      "log_b(a * c)",
      "(a * c)^b"
    ],
    correctAnswer: 0,
    explanation: "A famous logarithm identity used in the Master Theorem is: a^(log_b c) = c^(log_b a)."
  },
  {
    question: "In the Master Theorem recurrence T(N) = 4T(N/2) + O(N), the leaf count is N^(log_b a). What is log_2(4)?",
    options: [
      "1",
      "2",
      "4",
      "16"
    ],
    correctAnswer: 1,
    explanation: "log_b(a) = log_2(4) = 2. So the leaf cost is N^2."
  },
  {
    question: "If an information theory channel measures entropy in bits (base 2) and another in nats (base e), how are they converted?",
    options: [
      "1 nat = ln(2) bits ≈ 0.693 bits",
      "1 nat = 1 / ln(2) bits ≈ 1.443 bits",
      "1 nat = 2 bits",
      "1 nat = 10 bits"
    ],
    correctAnswer: 1,
    explanation: "By change of base: log_2(x) = ln(x) / ln(2) ≈ 1.4427 * ln(x). Thus 1 nat equals approximately 1.443 bits."
  },
  {
    question: "What is log_10(1,000,000)?",
    options: [
      "3",
      "5",
      "6",
      "10"
    ],
    correctAnswer: 2,
    explanation: "1,000,000 = 10^6. Therefore, log_10(1,000,000) = 6."
  },
  {
    question: "What is log_2(1,000,000) approximately using the conversion log_2(N) ≈ 3.322 * log_10(N)?",
    options: [
      "10",
      "19.93 (approx 20)",
      "30",
      "60"
    ],
    correctAnswer: 1,
    explanation: "log_2(10^6) = 6 * log_2(10) ≈ 6 * 3.3219 = 19.93 ≈ 20."
  },
  {
    question: "Which of the following is equivalent to log(A) + log(B) - log(C)?",
    options: [
      "log((A + B) / C)",
      "log((A * B) / C)",
      "log(A * B * C)",
      "log(A / (B * C))"
    ],
    correctAnswer: 1,
    explanation: "log(A) + log(B) = log(AB), and subtracting log(C) gives log((AB) / C)."
  },
  {
    question: "What is log_2(x) when x = 1 / 1024?",
    options: [
      "10",
      "-10",
      "-5",
      "1/10"
    ],
    correctAnswer: 1,
    explanation: "1024 = 2^10, so 1/1024 = 2^(-10). Therefore, log_2(1/1024) = -10."
  },
  {
    question: "If log_b(x) = log_b(y), what can we conclude about x and y (for x, y > 0)?",
    options: [
      "x = y (Logarithm is a strictly monotonic, one-to-one injective function)",
      "x = -y",
      "x * y = 1",
      "No conclusion can be drawn"
    ],
    correctAnswer: 0,
    explanation: "Because the logarithm function is strictly increasing for b > 1, it is one-to-one (injective). Therefore log_b(x) = log_b(y) implies x = y."
  },
  {
    question: "What is the derivative of the natural logarithm d/dx [ln(x)] for x > 0?",
    options: [
      "1 / x",
      "x",
      "e^x",
      "1 / x^2"
    ],
    correctAnswer: 0,
    explanation: "In calculus, the derivative of ln(x) is 1/x."
  },
  {
    question: "What is the derivative of log_2(x) with respect to x?",
    options: [
      "1 / x",
      "1 / (x * ln(2))",
      "ln(2) / x",
      "2 / x"
    ],
    correctAnswer: 1,
    explanation: "Since log_2(x) = ln(x) / ln(2), the derivative is (1 / ln 2) * (1 / x) = 1 / (x ln 2)."
  },
  {
    question: "Why is O(log_2 N) asymptotically identical to O(log_100 N)?",
    options: [
      "Because log_100(N) = log_2(N) / log_2(100) = (1 / 6.6438) * log_2(N), which differs only by the constant scalar 0.1505",
      "Because 100 equals 2 in binary",
      "Because both functions are equal to N",
      "Because Big-O only counts up to 10"
    ],
    correctAnswer: 0,
    explanation: "By change of base, log_100(N) = log_2(N) / log_2(100) ≈ 0.1505 * log_2(N). Since 0.1505 is a constant factor, both functions belong to Theta(log N)."
  },
  {
    question: "If an engineer measures an algorithm taking 100 ms for log_10(N) and 332 ms for log_2(N), do they belong to different Big-O classes?",
    options: [
      "Yes, because 332 ms is 3.32x larger",
      "No, they belong to the identical Big-O class O(log N) because asymptotic notation ignores constant scale factors",
      "Yes, log_2 is exponential",
      "No, but only if N < 10"
    ],
    correctAnswer: 1,
    explanation: "A constant multiplier (3.32x) affects the wall-clock runtime by a fixed scale factor, but does NOT change the asymptotic Big-O complexity class."
  },
  {
    question: "What is the core takeaway of the Change of Base theorem for DSA students?",
    options: [
      "Never use base 2 in code",
      "Logarithmic base is a constant scalar factor; you can freely convert between any bases without altering the Big-O asymptotic class",
      "Base 10 is 10 times faster than base 2",
      "Logarithms cannot be converted"
    ],
    correctAnswer: 1,
    explanation: "Change of base proves that log_a N and log_b N are proportional by a constant ratio (1 / log_b a), which guarantees base invariance across all asymptotic notations (O, Omega, Theta)."
  }
];

export default topic1_questions;
