// topic26_files/topic26_questions.js
const questions = [
  {
    question: "What is an assertion-reason question?",
    shortAnswer: "Two statements (Assertion A and Reason R) where you evaluate truth values and explanatory relationship.",
    explanation: "Common in ISC and other board exams to test conceptual clarity.",
    hint: "A and R pair.",
    level: "basic"
  },
  {
    question: "What does Option A mean in assertion-reason?",
    shortAnswer: "Both A and R are true and R is the correct explanation of A.",
    explanation: "Highest score option; requires both truth and logical connection.",
    hint: "True + true + explains.",
    level: "basic"
  },
  {
    question: "What does Option B mean?",
    shortAnswer: "Both A and R are true but R is NOT the correct explanation of A.",
    explanation: "Both statements are factually correct but independent or R doesn't cause A.",
    hint: "True but unrelated.",
    level: "basic"
  },
  {
    question: "What does Option C mean?",
    shortAnswer: "A is true but R is false.",
    explanation: "Assertion holds, reason is incorrect.",
    hint: "A true, R false.",
    level: "basic"
  },
  {
    question: "What does Option D mean?",
    shortAnswer: "A is false but R is true.",
    explanation: "Assertion is false, but the reason statement itself is true.",
    hint: "A false, R true.",
    level: "basic"
  },
  {
    question: "What does Option E mean?",
    shortAnswer: "Both A and R are false.",
    explanation: "Neither statement is true.",
    hint: "Both false.",
    level: "basic"
  },
  {
    question: "How do you check if R correctly explains A?",
    shortAnswer: "R must be the logical or causal reason why A holds.",
    explanation: "R ⇒ A should be true and relevant.",
    hint: "Does R imply A?",
    level: "intermediate"
  },
  {
    question: "In logic, can two true statements be unrelated?",
    shortAnswer: "Yes, they can be independently true without one explaining the other.",
    explanation: "Example: A: '2+2=4', R: 'It is raining' — both true but unrelated → Option B.",
    hint: "Independence.",
    level: "basic"
  },
  {
    question: "What is a common mistake in A-R questions?",
    shortAnswer: "Assuming both true means Option A (correct explanation).",
    explanation: "Both true can be Option B if R doesn't explain A.",
    hint: "Don't jump to A.",
    level: "basic"
  },
  {
    question: "Give an example where both A and R are true but R does not explain A.",
    shortAnswer: "A: 'All squares are rectangles', R: 'All triangles have three sides'.",
    explanation: "Both true, but R has nothing to do with squares/rectangles.",
    hint: "Unrelated topics.",
    level: "intermediate"
  },
  {
    question: "What is the first step in solving an A-R question?",
    shortAnswer: "Determine truth value of Assertion independently.",
    explanation: "Don't let R influence your judgment of A.",
    hint: "A first.",
    level: "basic"
  },
  {
    question: "If A is false and R is true, which option?",
    shortAnswer: "Option D.",
    explanation: "A false, R true.",
    hint: "D.",
    level: "basic"
  },
  {
    question: "If both are false, which option?",
    shortAnswer: "Option E.",
    explanation: "Both false.",
    hint: "E.",
    level: "basic"
  },
  {
    question: "In the example: A: 'p ∨ q is true', R: 'p is true' — what is correct?",
    shortAnswer: "Option C (A true, R false).",
    explanation: "p∨q can be true even if p false (q true). So A true, R false.",
    hint: "Counterexample: p false, q true.",
    level: "intermediate"
  },
  {
    question: "A: 'De Morgan's law: ¬(p∧q) ≡ ¬p∨¬q', R: 'De Morgan's law is only for conjunctions' — evaluate.",
    shortAnswer: "Option C (A true, R false).",
    explanation: "A is correct statement of De Morgan; R is false because De Morgan also applies to disjunctions.",
    hint: "R is incorrect.",
    level: "intermediate"
  },
  {
    question: "A: 'The contrapositive of p⇒q is ¬q⇒¬p', R: 'Contrapositive swaps and negates' — evaluate.",
    shortAnswer: "Option A (Both true, R explains A).",
    explanation: "R correctly defines contrapositive, which gives A.",
    hint: "Correct definition.",
    level: "basic"
  },
  {
    question: "How can you practice A-R questions effectively?",
    shortAnswer: "Create your own pairs, explain reasoning, and check with truth tables or logic.",
    explanation: "Active learning helps internalize patterns.",
    hint: "Self-test.",
    level: "basic"
  },
  {
    question: "What does 'R correctly explains A' mean in logical terms?",
    shortAnswer: "R ⇒ A is a tautology and R is relevant.",
    explanation: "The reason must be sufficient for the assertion to be true.",
    hint: "R implies A.",
    level: "expert"
  },
  {
    question: "If R is a tautology and A is also true, is R always the correct explanation?",
    shortAnswer: "Not necessarily. A tautology gives no information; it may not be relevant.",
    explanation: "Example: A: '2+2=4', R: 'p∨¬p' (tautology). R true but doesn't explain arithmetic.",
    hint: "Relevance matters.",
    level: "expert"
  },
  {
    question: "In ISC exams, how many marks is an A-R question typically worth?",
    shortAnswer: "1-2 marks.",
    explanation: "Usually part of multiple-choice or very short answer section.",
    hint: "Small weight.",
    level: "basic"
  },
  {
    question: "What is the most common pattern for A-R in logic?",
    shortAnswer: "A states a logical law, R states the definition or the law itself → Option A.",
    explanation: "Example: De Morgan, distributive, absorption laws.",
    hint: "Law + definition.",
    level: "intermediate"
  },
  {
    question: "If A is false, can R ever be the correct explanation?",
    shortAnswer: "No, because explanation requires A to be true.",
    explanation: "You can't explain a false statement with a true reason in this format.",
    hint: "False can't be explained.",
    level: "basic"
  },
  {
    question: "A: 'p ∧ ¬p is a contradiction', R: 'It is false for all p' — evaluate.",
    shortAnswer: "Option A (Both true, R explains A).",
    explanation: "R states the definition of contradiction, explaining A.",
    hint: "Definition matches.",
    level: "basic"
  },
  {
    question: "A: 'Implication is commutative', R: 'p⇒q is same as q⇒p' — evaluate.",
    shortAnswer: "Option E (Both false).",
    explanation: "Implication is not commutative; both statements are false.",
    hint: "Both wrong.",
    level: "basic"
  },
  {
    question: "What is the difference between 'R explains A' and 'R implies A'?",
    shortAnswer: "Explanation requires relevance and causality, not just logical implication.",
    explanation: "R could imply A but be irrelevant (e.g., tautology implying anything).",
    hint: "Relevance.",
    level: "expert"
  },
  {
    question: "A: 'All men are mortal', R: 'Socrates is a man' — evaluate.",
    shortAnswer: "Option B (Both true, R does not explain A).",
    explanation: "R is true but doesn't explain why all men are mortal; it's just an instance.",
    hint: "Instance vs general rule.",
    level: "intermediate"
  },
  {
    question: "In A-R questions, should you consider real-world knowledge or pure logic?",
    shortAnswer: "Both, depending on context. Logic questions use logical laws; factual questions use real-world knowledge.",
    explanation: "Read the question carefully to determine the domain.",
    hint: "Context matters.",
    level: "basic"
  },
  {
    question: "If A is a tautology and R is a tautology, can R explain A?",
    shortAnswer: "Yes, if they are the same tautology or R is the reason why A is always true.",
    explanation: "Example: A: 'p∨¬p', R: 'Law of excluded middle' — R explains A.",
    hint: "Same concept.",
    level: "expert"
  },
  {
    question: "What is a good strategy for guessing in A-R questions?",
    shortAnswer: "Eliminate obviously false options first, then check truth values.",
    explanation: "If you know A is true, options D and E are eliminated.",
    hint: "Process of elimination.",
    level: "basic"
  },
  {
    question: "Where can I find more A-R practice questions?",
    shortAnswer: "ISC previous year papers, logic textbooks, and online question banks.",
    explanation: "Regular practice from authentic sources is best.",
    hint: "Past papers.",
    level: "basic"
  }
];

export default questions;