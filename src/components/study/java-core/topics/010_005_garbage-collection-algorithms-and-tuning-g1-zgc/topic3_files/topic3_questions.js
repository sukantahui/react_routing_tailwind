const topic3_questions = [
  {
    "question": "Why is the performance cost of a Minor GC proportional to the number of live objects rather than the number of dead objects?",
    "shortAnswer": "Because Minor GC uses a Copying algorithm. It only locates and copies surviving live objects to the target Survivor space; all remaining dead memory in Eden is wiped clean in a single pointer reset without iterating over dead objects.",
    "explanation": "Makes collection of high-mortality young spaces extremely fast.",
    "hint": "Cost depends only on copying live objects; dead memory is wiped in one operation.",
    "level": "Intermediate",
    "codeExample": "Live objects copied -> Eden pointer reset to zero."
  },
  {
    "question": "What proportion of objects in typical enterprise Java applications die in the Young Generation?",
    "shortAnswer": "Empirical benchmarks show that between 95% and 99% of all instantiated objects die in the Young Generation before ever being promoted to the Old Generation.",
    "explanation": "Validates the Weak Generational Hypothesis.",
    "hint": "95% to 99% infant mortality rate.",
    "level": "Beginner",
    "codeExample": "98%+ objects die in Eden."
  }
];

export default topic3_questions;
