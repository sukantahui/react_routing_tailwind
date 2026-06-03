// topic21_files/topic21_questions.js
const questions = [
  {
    question: "Translate 'It is raining and cold' into logic.",
    shortAnswer: "R ∧ C",
    explanation: "Let R: 'It is raining', C: 'It is cold'. 'and' is conjunction.",
    hint: "AND.",
    level: "basic"
  },
  {
    question: "Translate 'Swadeep will pass or he will fail'.",
    shortAnswer: "P ∨ F",
    explanation: "OR (∨) represents inclusive or. In most contexts, 'or' is inclusive unless stated as 'either...or...but not both'.",
    hint: "OR operator.",
    level: "basic"
  },
  {
    question: "Translate 'It is not true that Tuhina is late'.",
    shortAnswer: "¬L",
    explanation: "Negation (¬) flips the truth value.",
    hint: "NOT.",
    level: "basic"
  },
  {
    question: "Translate 'If it rains, then the ground gets wet'.",
    shortAnswer: "R ⇒ W",
    explanation: "Implication (⇒) represents 'if...then'.",
    hint: "Implication.",
    level: "basic"
  },
  {
    question: "Translate 'Abhronila can go to the party only if she finishes homework'.",
    shortAnswer: "P ⇒ H",
    explanation: "'p only if q' translates to p ⇒ q (q is necessary for p).",
    hint: "Only if means necessary condition.",
    level: "intermediate"
  },
  {
    question: "Translate 'Susmita will pass if and only if she studies'.",
    shortAnswer: "P ⇔ S",
    explanation: "Biconditional (⇔) represents 'if and only if'.",
    hint: "Two-way implication.",
    level: "basic"
  },
  {
    question: "Translate 'Neither Debangshu nor Swadeep attended'.",
    shortAnswer: "¬D ∧ ¬S",
    explanation: "'Neither A nor B' means not A and not B.",
    hint: "AND of negations.",
    level: "intermediate"
  },
  {
    question: "What is the logical form of 'p unless q'?",
    shortAnswer: "p ∨ q (or ¬q ⇒ p)",
    explanation: "'Unless' can be translated as OR: p unless q means p is true if q is false.",
    hint: "OR or implication.",
    level: "intermediate"
  },
  {
    question: "Translate 'You can enter only if you have a ticket'.",
    shortAnswer: "E ⇒ T",
    explanation: "E: 'You can enter', T: 'You have a ticket'. Only if gives necessary condition.",
    hint: "E only if T → E ⇒ T.",
    level: "intermediate"
  },
  {
    question: "Translate 'Whenever it snows, the roads are slippery'.",
    shortAnswer: "S ⇒ R",
    explanation: "'Whenever' indicates implication.",
    hint: "Implication.",
    level: "basic"
  },
  {
    question: "What is the difference between 'p if q' and 'p only if q'?",
    shortAnswer: "p if q: q ⇒ p; p only if q: p ⇒ q.",
    explanation: "'If' introduces sufficient condition; 'only if' introduces necessary condition.",
    hint: "Direction matters.",
    level: "intermediate"
  },
  {
    question: "Translate 'Swadeep will come to the party but Tuhina will not'.",
    shortAnswer: "S ∧ ¬T",
    explanation: "'But' is conjunction; 'will not' is negation.",
    hint: "AND with NOT.",
    level: "basic"
  },
  {
    question: "Translate 'Either you pay the fine or you go to jail' (exclusive or).",
    shortAnswer: "(P ∨ J) ∧ ¬(P ∧ J)  or P ⊕ J",
    explanation: "Exclusive OR (XOR) means exactly one is true.",
    hint: "XOR.",
    level: "expert"
  },
  {
    question: "Translate 'If it rains, then if you have an umbrella, you stay dry'.",
    shortAnswer: "R ⇒ (U ⇒ D)",
    explanation: "Nested implication. Could also be (R ∧ U) ⇒ D by exportation.",
    hint: "Nested if-then.",
    level: "expert"
  },
  {
    question: "What does 'p is sufficient for q' mean in logic?",
    shortAnswer: "p ⇒ q",
    explanation: "Sufficient condition: if p holds, then q automatically holds.",
    hint: "Implication.",
    level: "intermediate"
  },
  {
    question: "What does 'p is necessary for q' mean in logic?",
    shortAnswer: "q ⇒ p",
    explanation: "Necessary condition: for q to hold, p must hold. So q implies p.",
    hint: "Reverse implication.",
    level: "intermediate"
  },
  {
    question: "Translate 'You will succeed provided you work hard'.",
    shortAnswer: "W ⇒ S",
    explanation: "'Provided' introduces a sufficient condition.",
    hint: "If you work hard, then you succeed.",
    level: "basic"
  },
  {
    question: "Translate 'Only if you study will you pass'.",
    shortAnswer: "P ⇒ S",
    explanation: "This is same as 'You pass only if you study'.",
    hint: "Only if after pass.",
    level: "intermediate"
  },
  {
    question: "Translate 'It is not both raining and sunny'.",
    shortAnswer: "¬(R ∧ S)",
    explanation: "Not both means negation of conjunction.",
    hint: "De Morgan ready.",
    level: "intermediate"
  },
  {
    question: "Translate 'It is either raining or snowing, but not both'.",
    shortAnswer: "(R ∨ S) ∧ ¬(R ∧ S)",
    explanation: "Exclusive OR.",
    hint: "XOR.",
    level: "expert"
  },
  {
    question: "Translate 'If Swadeep is in Barrackpore, then he is in West Bengal. He is in Barrackpore. Therefore he is in West Bengal.' This is an argument, not just a statement. But what is the logical form of the first sentence?",
    shortAnswer: "B ⇒ W",
    explanation: "First sentence is implication.",
    hint: "If-then.",
    level: "basic"
  },
  {
    question: "Translate 'All squares are rectangles' into logic.",
    shortAnswer: "∀x (Square(x) ⇒ Rectangle(x))",
    explanation: "Predicate logic with universal quantifier. Propositional logic can't capture 'all' directly; need quantifiers.",
    hint: "For all x.",
    level: "expert"
  },
  {
    question: "Translate 'No dogs are cats' into propositional logic?",
    shortAnswer: "Cannot directly; need predicate logic. Approx: For any x, if Dog(x) then not Cat(x).",
    explanation: "Propositional logic deals with whole statements, not objects and properties.",
    hint: "Beyond propositional.",
    level: "expert"
  },
  {
    question: "What is the logical expression for 'p but not q'?",
    shortAnswer: "p ∧ ¬q",
    explanation: "'But' is conjunction, 'not' is negation.",
    hint: "AND with NOT.",
    level: "basic"
  },
  {
    question: "Translate 'If you don't study, you will fail'.",
    shortAnswer: "¬S ⇒ F",
    explanation: "Negation of antecedent.",
    hint: "If not study then fail.",
    level: "basic"
  },
  {
    question: "Translate 'You will pass only if you study'.",
    shortAnswer: "P ⇒ S",
    explanation: "P only if S → P ⇒ S.",
    hint: "Only if.",
    level: "basic"
  },
  {
    question: "Translate 'It is raining but not cold'.",
    shortAnswer: "R ∧ ¬C",
    explanation: "'But' is ∧, 'not' is ¬.",
    hint: "AND with NOT.",
    level: "basic"
  },
  {
    question: "Translate 'If it is not raining, then I will go out'.",
    shortAnswer: "¬R ⇒ G",
    explanation: "Negation in antecedent.",
    hint: "If not rain then go.",
    level: "basic"
  },
  {
    question: "Translate 'Abhronila will come unless it rains'.",
    shortAnswer: "C ∨ R (or ¬R ⇒ C)",
    explanation: "'Unless' translates to OR or implication.",
    hint: "Unless = OR.",
    level: "intermediate"
  },
  {
    question: "What is the logical form of 'p is false'?",
    shortAnswer: "¬p",
    explanation: "Simply negate the proposition.",
    hint: "NOT.",
    level: "basic"
  }
];

export default questions;