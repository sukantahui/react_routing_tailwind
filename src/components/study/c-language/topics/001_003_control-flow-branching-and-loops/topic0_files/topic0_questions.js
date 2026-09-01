const questions = [
  {
    question: "What is the difference between pre-test (while, for) and post-test (do-while) loops?",
    shortAnswer: "Pre-test checks condition before execution; post-test executes body at least once before checking.",
    explanation: "A do-while loop guarantees at least one execution iteration even if the condition is false initially.",
    hint: "do-while executes at least once.",
    level: "basic"
  },
  {
    question: "Why is the break statement necessary inside switch-case blocks?",
    shortAnswer: "Without break, execution falls through into subsequent case labels regardless of condition.",
    explanation: "Fall-through behavior can be useful intentionally, but omitting break accidentally causes bug traps.",
    hint: "break prevents case fall-through.",
    level: "intermediate"
  }
];

export default questions;
