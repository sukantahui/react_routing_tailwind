const questions = [
  {
    question: "What is the time complexity of two sequential loops: O(n) + O(n)?",
    shortAnswer: "O(n) — linear.",
    explanation: "O(n) + O(n) = O(2n) = O(n) because constants are dropped.",
    hint: "Add and simplify.",
    level: "basic",
    codeExample: "// Loop 1: O(n), Loop 2: O(n) → O(n)"
  },
  {
    question: "What is the time complexity of O(n) + O(m) when n and m are different?",
    shortAnswer: "O(n + m) — the sum of the two.",
    explanation: "You cannot simplify further unless you know the relationship between n and m.",
    hint: "Keep both variables.",
    level: "basic",
    codeExample: "// O(n) + O(m) = O(n+m)"
  },
  {
    question: "What is the time complexity of O(n²) + O(n)?",
    shortAnswer: "O(n²) — the quadratic dominates.",
    explanation: "O(n²) grows faster than O(n), so the lower-order term is dropped.",
    hint: "Dominant term.",
    level: "intermediate",
    codeExample: "// O(n²) + O(n) = O(n²)"
  },
  {
    question: "What is the time complexity of O(n log n) + O(n)?",
    shortAnswer: "O(n log n) — because O(n log n) dominates O(n).",
    explanation: "For large n, n log n grows faster than n.",
    hint: "Compare growth rates.",
    level: "intermediate",
    codeExample: "// O(n log n) + O(n) = O(n log n)"
  },
  {
    question: "What is the time complexity of O(n) + O(log n) + O(1)?",
    shortAnswer: "O(n) — linear dominates.",
    explanation: "O(n) is the fastest-growing term.",
    hint: "Dominant term.",
    level: "basic",
    codeExample: "// O(n) + O(log n) + O(1) = O(n)"
  },
  {
    question: "Can we multiply sequential loop complexities?",
    shortAnswer: "No, sequential loops add, they do not multiply.",
    explanation: "Only nested loops multiply. Sequential loops run one after another, so their times add.",
    hint: "Multiplication is for nesting.",
    level: "basic",
    codeExample: "// O(n) + O(m) ≠ O(n·m)"
  },
  {
    question: "What is the complexity of: O(n²) + O(n²)?",
    shortAnswer: "O(n²) — the constants add but are dropped.",
    explanation: "O(2n²) = O(n²).",
    hint: "Drop constants.",
    level: "basic",
    codeExample: "// 2O(n²) = O(n²)"
  },
  {
    question: "How do you handle a method with two loops: one O(n) and one O(n·m)?",
    shortAnswer: "Total = O(n) + O(n·m) = O(n·m) if m > 1, otherwise O(n) if m is constant.",
    explanation: "If m is variable and grows, the product dominates.",
    hint: "Consider if m is constant or variable.",
    level: "intermediate",
    codeExample: "// O(n) + O(n·m) = O(n·m) if m grows"
  },
  {
    question: "What is the complexity if you have three loops: O(n), O(n²), O(n³)?",
    shortAnswer: "O(n³) — the cubic dominates.",
    explanation: "The fastest-growing term is O(n³).",
    hint: "Highest degree wins.",
    level: "intermediate",
    codeExample: "// O(n) + O(n²) + O(n³) = O(n³)"
  },
  {
    question: "What is the complexity of: O(n log n) + O(n²) + O(n)?",
    shortAnswer: "O(n²) — because O(n²) dominates both O(n log n) and O(n).",
    explanation: "For large n, O(n²) > O(n log n) > O(n).",
    hint: "Dominant term.",
    level: "intermediate",
    codeExample: "// O(n²) dominates"
  },
  {
    question: "What is the complexity of a method that does O(n) then O(m) then O(n·m) (nested)?",
    shortAnswer: "O(n·m) — because the product dominates the sums.",
    explanation: "O(n) + O(m) + O(n·m) = O(n·m) if n and m are large.",
    hint: "Nested product wins.",
    level: "intermediate",
    codeExample: "// O(n) + O(m) + O(n·m) = O(n·m)"
  },
  {
    question: "What if you have O(n) + O(m) but n and m are known to be equal (n = m)?",
    shortAnswer: "O(n) + O(n) = O(n).",
    explanation: "If n = m, then O(n) + O(m) = O(n) + O(n) = O(n).",
    hint: "Simplify when variables are related.",
    level: "intermediate",
    codeExample: "// O(n) + O(n) = O(n)"
  },
  {
    question: "What is the complexity of: O(n) + O(m) + O(k) if n, m, k are all different?",
    shortAnswer: "O(n + m + k) — the sum of all.",
    explanation: "Unless we know one dominates, we keep the sum.",
    hint: "Keep all variables.",
    level: "basic",
    codeExample: "// O(n+m+k)"
  },
  {
    question: "If you have O(n²) followed by O(n²), is it O(2n²) or still O(n²)?",
    shortAnswer: "O(n²) — because 2 is a constant.",
    explanation: "Two quadratic loops still only quadratic.",
    hint: "Constants dropped.",
    level: "basic",
    codeExample: "// O(n²) + O(n²) = O(n²)"
  },
  {
    question: "What is the complexity of a loop that does O(n) work inside another loop that also runs O(n)?",
    shortAnswer: "O(n²) — nested loops multiply.",
    explanation: "O(n) * O(n) = O(n²).",
    hint: "Nested = multiply.",
    level: "basic",
    codeExample: "// nested loops"
  },
  {
    question: "What is the complexity of: O(n) + O(log n) if n is very large?",
    shortAnswer: "O(n) — because O(n) dominates.",
    explanation: "For large n, linear growth is much faster than logarithmic.",
    hint: "Dominant term.",
    level: "basic",
    codeExample: "// O(n) dominates"
  },
  {
    question: "How do you simplify O(n²) + O(m²) when n and m are both variables?",
    shortAnswer: "O(n² + m²) — cannot drop either unless we know their relationship.",
    explanation: "Keep both terms until we know how n and m compare.",
    hint: "Keep all terms.",
    level: "intermediate",
    codeExample: "// O(n² + m²)"
  },
  {
    question: "What is the complexity of a method that has O(n) loop, then a nested O(n·log n) loop, then another O(n) loop?",
    shortAnswer: "O(n log n) — because it's the dominant term.",
    explanation: "O(n) + O(n log n) + O(n) = O(n log n).",
    hint: "Dominant term.",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "Can you have O(n²) + O(n log n) = O(n²)?",
    shortAnswer: "Yes, because O(n²) grows faster than O(n log n).",
    explanation: "For large n, n² > n log n.",
    hint: "Compare growth rates.",
    level: "intermediate",
    codeExample: "// O(n²) wins"
  },
  {
    question: "What is the complexity of: O(n) + O(1) + O(n)?",
    shortAnswer: "O(n) — linear dominates constant.",
    explanation: "O(n) + O(n) = O(n) and O(1) is negligible.",
    hint: "Drop constant.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "If a function has two loops, one O(n) and one O(m), and we know m = 2n, what is the total?",
    shortAnswer: "O(n) — because O(n) + O(2n) = O(3n) = O(n).",
    explanation: "Constants are dropped.",
    hint: "Substitute m = 2n.",
    level: "intermediate",
    codeExample: "// O(n) + O(2n) = O(n)"
  },
  {
    question: "What is the complexity of a function that does O(n²) then O(n log n) then O(n)?",
    shortAnswer: "O(n²) — because it dominates both.",
    explanation: "O(n²) > O(n log n) > O(n).",
    hint: "Quadratic wins.",
    level: "intermediate",
    codeExample: "// O(n²)"
  },
  {
    question: "If you have nested loops O(n·m) and a separate O(n) loop, what is the total?",
    shortAnswer: "O(n·m) if m is variable; if m is constant, it's O(n).",
    explanation: "If m is constant, O(n·constant) = O(n); otherwise product dominates.",
    hint: "Depends on m.",
    level: "advanced",
    codeExample: "// O(n·m) + O(n) = O(n·m) if m > 1"
  },
  {
    question: "What is the complexity of: O(n²) + O(m²) + O(n·m)?",
    shortAnswer: "O(n² + m² + n·m) — cannot simplify without knowing relation.",
    explanation: "All terms could be significant depending on n and m.",
    hint: "Keep all terms.",
    level: "advanced",
    codeExample: "// O(n² + m² + n·m)"
  },
  {
    question: "How do you analyze a function that calls another function with known complexity?",
    shortAnswer: "You replace the call with its complexity and add it to the rest.",
    explanation: "If a function is O(g(n)), treat it as a block with that complexity.",
    hint: "Substitute known complexity.",
    level: "intermediate",
    codeExample: "// O(f(n)) + O(g(n))"
  },
  {
    question: "What is the complexity of: O(n) + O(log n) + O(n·log n)?",
    shortAnswer: "O(n log n) — because O(n log n) dominates both.",
    explanation: "O(n log n) > O(n) > O(log n).",
    hint: "Dominant term.",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "Can a sequence of loops have complexity O(n log n) if no loop is O(n log n) itself?",
    shortAnswer: "No, the sum of individual complexities cannot be larger than the max of them (up to constants).",
    explanation: "If you have O(n) and O(log n), sum is O(n).",
    hint: "Sum ≤ max * constant.",
    level: "advanced",
    codeExample: "// Not possible."
  },
  {
    question: "What is the complexity of: O(n²) + O(n) + O(1)?",
    shortAnswer: "O(n²) — because it dominates.",
    explanation: "O(n²) > O(n) > O(1).",
    hint: "Dominant term.",
    level: "basic",
    codeExample: "// O(n²)"
  },
  {
    question: "If you have three loops: O(n), O(m), O(k) and you know n > m > k, what is the total?",
    shortAnswer: "O(n) — because n dominates the others.",
    explanation: "Since n is the largest, it dominates the sum.",
    hint: "Largest term dominates.",
    level: "intermediate",
    codeExample: "// O(n) dominates"
  },
  {
    question: "What is the complexity of: O(n²) + O(n log n) + O(n) when n is very large?",
    shortAnswer: "O(n²) — quadratic dominates.",
    explanation: "For large n, n² grows fastest.",
    hint: "Dominant term.",
    level: "intermediate",
    codeExample: "// O(n²)"
  }
];

export default questions;