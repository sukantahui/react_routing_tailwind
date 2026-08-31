// topic1_questions.js
// 30 Moderate to Expert Questions on Probability Distribution Over Strategies in Game Theory

const questions = [
  {
    question: "What are the two fundamental mathematical axioms that any Mixed Strategy probability vector p must satisfy?",
    shortAnswer: "1. Normalization: sum_{i=1}^m p_i = 1.0; 2. Non-negativity: p_i >= 0 for all i = 1, ..., m.",
    explanation: "Standard axioms of probability distribution on a finite sample space.",
    hint: "Sum equals 1.0 and all entries >= 0.",
    level: "moderate",
    codeExample: "isValidProbVector = (p) => p.every(val => val >= 0) && Math.abs(p.reduce((a, b) => a + b, 0) - 1.0) < 1e-6;"
  },
  {
    question: "What is the geometric representation of the strategy set for a 2-strategy player?",
    shortAnswer: "The 1-dimensional standard unit simplex Delta_1, which is a straight line segment joining vertex (1, 0) to vertex (0, 1).",
    explanation: "1D simplex connecting pure strategies.",
    hint: "A 1D line segment connecting (1,0) and (0,1).",
    level: "moderate",
    codeExample: "Simplex1D = 'Line segment from [1,0] to [0,1]';"
  },
  {
    question: "What is the geometric representation of the strategy set for a 3-strategy player?",
    shortAnswer: "The 2-dimensional standard unit simplex Delta_2, which is an equilateral triangle in 3D space with vertices at (1,0,0), (0,1,0), and (0,0,1).",
    explanation: "2D triangular simplex.",
    hint: "An equilateral triangle in 3D space.",
    level: "intermediate",
    codeExample: "Simplex2D = 'Triangle with vertices e1, e2, e3';"
  },
  {
    question: "What is the relationship between Pure Strategies and the Probability Simplex?",
    shortAnswer: "Pure strategies are the extreme boundary corner points (vertices) of the probability simplex, represented by standard unit basis vectors e_k.",
    explanation: "Pure strategies correspond to degenerate distributions with probability 1 on a single action.",
    hint: "Pure strategies are the extreme corner vertices of the simplex.",
    level: "moderate",
    codeExample: "e1 = [1, 0, 0]; e2 = [0, 1, 0]; e3 = [0, 0, 1];"
  },
  {
    question: "What is an 'Interior Mixed Strategy' (Completely Mixed Strategy)?",
    shortAnswer: "A mixed strategy where EVERY pure action has a strictly positive probability (p_i > 0 for all i), meaning no strategy is played with zero probability.",
    explanation: "Lies strictly inside the interior of the probability simplex.",
    hint: "Every strategy has probability strictly greater than zero (p_i > 0).",
    level: "expert",
    codeExample: "isCompletelyMixed = (p) => p.every(val => val > 0);"
  },
  {
    question: "Suppose Debangshu in Barrackpore specifies p1 = 0.65 for Strategy A1. What must p2 be for Strategy A2 in a 2x2 game?",
    shortAnswer: "p2 = 1.0 - 0.65 = 0.35 (or 35%).",
    explanation: "Complementary probability in a 2-strategy game.",
    hint: "p2 = 1 - 0.65 = 0.35.",
    level: "moderate",
    codeExample: "p2 = 1.0 - 0.65; // 0.35"
  },
  {
    question: "Is p = [0.8, -0.2, 0.4] a valid probability distribution over strategies?",
    shortAnswer: "NO! Even though sum(p) = 1.0, the entry -0.2 violates the non-negativity axiom (p_i >= 0).",
    explanation: "Negative probabilities are strictly forbidden.",
    hint: "No, -0.2 violates non-negativity.",
    level: "moderate",
    codeExample: "isValid = p.every(val => val >= 0); // false"
  },
  {
    question: "Is p = [0.5, 0.3, 0.1] a valid probability distribution over strategies?",
    shortAnswer: "NO! The sum is 0.5 + 0.3 + 0.1 = 0.9 != 1.0, violating the normalization axiom.",
    explanation: "Probabilities must sum exactly to 1.0.",
    hint: "No, sum equals 0.9 instead of 1.0.",
    level: "moderate",
    codeExample: "isValid = sum(p) === 1.0; // false"
  },
  {
    question: "Suppose Susmita in Ichapur is testing 3 promotional campaigns with weights [3, 2, 5]. How do you normalize this into a valid probability distribution vector p?",
    shortAnswer: "Divide each weight by the total sum (3+2+5 = 10): p = [3/10, 2/10, 5/10] = [0.3, 0.2, 0.5].",
    explanation: "Standard vector normalization procedure.",
    hint: "p = [0.3, 0.2, 0.5].",
    level: "intermediate",
    codeExample: "normalize = (w) => { const sum = w.reduce((a,b)=>a+b,0); return w.map(x => x/sum); };"
  },
  {
    question: "What is the 'Support' of a mixed strategy probability vector p?",
    shortAnswer: "The set of pure strategies that receive strictly positive probability: supp(p) = { i | p_i > 0 }.",
    explanation: "Defines the active pure strategies in the mixture.",
    hint: "The set of strategies with p_i > 0.",
    level: "expert",
    codeExample: "support = (p) => p.map((val, idx) => val > 0 ? idx : null).filter(x => x !== null);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating payoffs associated with probability distributions in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Expected Payoff = ₹15,000'"
  },
  {
    question: "What is the ultimate golden rule of Probability Distributions Over Strategies in Game Theory?",
    shortAnswer: "'Mixed strategies map choices onto the standard probability simplex: all probabilities must be non-negative and sum exactly to 1.0, transforming deterministic play into continuous expected payoffs in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all simplex and distribution axioms.",
    hint: "Non-negative entries → Sum to 1.0 → Continuous expected payoffs in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: NonNegative() && SumToOne() => YieldsExpectedPayoff(₹)."
  }
];

export default questions;
