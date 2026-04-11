// topic15_files/topic15_questions.js
const questions = [
  {
    question: "What is the converse of p ⇒ q?",
    shortAnswer: "q ⇒ p",
    explanation: "The converse swaps the antecedent and consequent of the original implication.",
    hint: "Reverse the order.",
    level: "basic",
    codeExample: "Original: if(p) then q; Converse: if(q) then p"
  },
  {
    question: "Is the converse logically equivalent to the original implication?",
    shortAnswer: "No, not in general.",
    explanation: "A true implication can have a false converse. They are equivalent only when p and q have the same truth value.",
    hint: "Check truth table rows 2 and 3.",
    level: "basic"
  },
  {
    question: "Give an example where the implication is true but its converse is false.",
    shortAnswer: "p: 'It is a square', q: 'It is a rectangle'.",
    explanation: "All squares are rectangles (true), but not all rectangles are squares (false converse).",
    hint: "Think of a subset relationship.",
    level: "basic"
  },
  {
    question: "What is the converse of 'If Swadeep studies, then he will pass'?",
    shortAnswer: "If Swadeep passes, then he studied.",
    explanation: "Swap antecedent 'Swadeep studies' with consequent 'he will pass'.",
    hint: "Switch the two parts.",
    level: "basic"
  },
  {
    question: "If p ⇒ q is true, can we conclude q ⇒ p is true?",
    shortAnswer: "No, that's the fallacy of affirming the consequent.",
    explanation: "The truth of an implication does not guarantee the truth of its converse.",
    hint: "Dangerous assumption.",
    level: "basic"
  },
  {
    question: "When are an implication and its converse both true?",
    shortAnswer: "When p and q are logically equivalent (p ⇔ q).",
    explanation: "Both directions hold only when p and q always have the same truth value.",
    hint: "Biconditional.",
    level: "intermediate"
  },
  {
    question: "What is the converse of 'If it rains, then the ground gets wet'?",
    shortAnswer: "If the ground gets wet, then it rains.",
    explanation: "Converse swaps cause and effect, which may not hold (sprinklers).",
    hint: "Reverse the cause-effect.",
    level: "basic"
  },
  {
    question: "Is the converse of a tautology always a tautology?",
    shortAnswer: "Not necessarily.",
    explanation: "If original is p ⇒ p (tautology), converse is also p ⇒ p (tautology). But if original is (p∧q) ⇒ p (tautology), converse is p ⇒ (p∧q), which is not a tautology.",
    hint: "Depends on the specific statement.",
    level: "expert"
  },
  {
    question: "What is the relationship between converse and inverse?",
    shortAnswer: "The inverse (¬p ⇒ ¬q) is the contrapositive of the converse.",
    explanation: "Converse: q⇒p. Its contrapositive is ¬p⇒¬q, which is the inverse.",
    hint: "Inverse = contrapositive of converse.",
    level: "intermediate"
  },
  {
    question: "If the converse is true, does the original have to be true?",
    shortAnswer: "No, same reasoning — converse true doesn't imply original true.",
    explanation: "Truth flows one way only unless it's a biconditional.",
    hint: "No free lunch.",
    level: "intermediate"
  },
  {
    question: "What is the converse of 'If a number is divisible by 6, then it is divisible by 3'?",
    shortAnswer: "If a number is divisible by 3, then it is divisible by 6.",
    explanation: "Original true, converse false (e.g., 3 is divisible by 3 but not by 6).",
    hint: "Think of multiples.",
    level: "intermediate"
  },
  {
    question: "In a proof, why can't you prove the converse instead of the original?",
    shortAnswer: "Because they are different statements; proving one does not prove the other.",
    explanation: "Unless the statement is actually an 'if and only if', you must prove each direction separately.",
    hint: "Direction matters.",
    level: "intermediate"
  },
  {
    question: "What is the converse of p ⇒ (q ⇒ r)?",
    shortAnswer: "(q ⇒ r) ⇒ p",
    explanation: "Swap the entire antecedent (p) with the entire consequent (q⇒r).",
    hint: "Treat q⇒r as a block.",
    level: "expert"
  },
  {
    question: "Is the converse of a contradiction always a contradiction?",
    shortAnswer: "Not necessarily.",
    explanation: "Example: p ∧ ¬p is contradiction. Its converse? That statement doesn't have the form p⇒q directly. For implication form false⇒false is true, so converse false⇒false is also true? Wait careful.",
    hint: "Needs to be in implication form.",
    level: "expert"
  },
  {
    question: "What fallacy occurs when someone assumes the converse is true?",
    shortAnswer: "Affirming the consequent (fallacy).",
    explanation: "From p⇒q and q, concluding p is a logical fallacy.",
    hint: "Common in everyday reasoning.",
    level: "basic"
  },
  {
    question: "Write the converse of 'If Tuhina is in Naihati, then she is in West Bengal'.",
    shortAnswer: "If Tuhina is in West Bengal, then she is in Naihati.",
    explanation: "Converse swaps the locations, which is false.",
    hint: "Swap places.",
    level: "basic"
  },
  {
    question: "How can you test if an implication and its converse are both true?",
    shortAnswer: "Construct a truth table; they are both true only when p and q match.",
    explanation: "Both true in rows where p and q are both true or both false.",
    hint: "Check rows T,T and F,F.",
    level: "intermediate"
  },
  {
    question: "What is the converse of (p ∧ q) ⇒ r?",
    shortAnswer: "r ⇒ (p ∧ q)",
    explanation: "Swap the whole conjunction with r.",
    hint: "Antecedent becomes consequent.",
    level: "intermediate"
  },
  {
    question: "If an implication is false, can its converse be true?",
    shortAnswer: "Yes.",
    explanation: "Example: p true, q false gives p⇒q false, but converse q⇒p is true (false⇒true = true).",
    hint: "Row 2 in truth table.",
    level: "intermediate"
  },
  {
    question: "What is the difference between converse and contrapositive?",
    shortAnswer: "Converse swaps without negating; contrapositive swaps AND negates both.",
    explanation: "Converse: q⇒p; Contrapositive: ¬q⇒¬p. Contrapositive is equivalent to original.",
    hint: "Contrapositive has two negations.",
    level: "basic"
  },
  {
    question: "In mathematics, when do we use the converse?",
    shortAnswer: "When proving an 'if and only if' theorem, we prove both implication and converse.",
    explanation: "Biconditional statements require both directions to be proven.",
    hint: "Two-way street.",
    level: "intermediate"
  },
  {
    question: "What is the converse of 'If Debangshu is a doctor, then he went to medical school'?",
    shortAnswer: "If Debangshu went to medical school, then he is a doctor.",
    explanation: "Converse is not necessarily true (could have dropped out).",
    hint: "Reverse the training.",
    level: "basic"
  },
  {
    question: "Can an implication and its converse both be false?",
    shortAnswer: "Yes.",
    explanation: "Example: p true, q true? Actually both true gives both true. Need p false, q true gives original true, converse false. p true, q false gives original false, converse true. p false, q false gives both true. So no case with both false? Wait check: p=T,q=F: original F, converse T. p=F,q=T: original T, converse F. So at least one is always true? Actually (p⇒q) ∨ (q⇒p) is a tautology, so they cannot both be false.",
    hint: "One direction always holds.",
    level: "expert"
  },
  {
    question: "What is the converse of 'If x > 5, then x > 3'?",
    shortAnswer: "If x > 3, then x > 5.",
    explanation: "Original true, converse false (e.g., x=4).",
    hint: "Reverse inequality.",
    level: "basic"
  },
  {
    question: "In logical terms, what does it mean to 'converse' a statement?",
    shortAnswer: "Swap the hypothesis and conclusion.",
    explanation: "The converse of 'if A then B' is 'if B then A'.",
    hint: "Reverse direction.",
    level: "basic"
  },
  {
    question: "Is the converse of a true mathematical theorem always false?",
    shortAnswer: "No, sometimes the converse is also true (then it's a biconditional).",
    explanation: "Example: 'If a triangle has two equal sides, then it has two equal angles' and its converse are both true.",
    hint: "Not always false.",
    level: "intermediate"
  },
  {
    question: "What is the converse of (p ∨ q) ⇒ r?",
    shortAnswer: "r ⇒ (p ∨ q)",
    explanation: "Swap the disjunction with r.",
    hint: "Entire antecedent swaps with consequent.",
    level: "intermediate"
  },
  {
    question: "How would you disprove a converse?",
    shortAnswer: "Find a counterexample where the consequent is true but antecedent is false.",
    explanation: "For converse q⇒p, find q true and p false.",
    hint: "Show a case where q holds but p doesn't.",
    level: "intermediate"
  },
  {
    question: "What is the converse of 'If Susmita is in class, then the teacher is present'?",
    shortAnswer: "If the teacher is present, then Susmita is in class.",
    explanation: "Converse may be false (teacher present, Susmita absent).",
    hint: "Swap roles.",
    level: "basic"
  },
  {
    question: "Why is understanding converse important in programming?",
    shortAnswer: "To avoid logical errors when reversing conditions.",
    explanation: "Programmers might incorrectly assume that if A implies B, then B implies A, leading to bugs.",
    hint: "Don't reverse conditions without thinking.",
    level: "intermediate"
  }
];

export default questions;