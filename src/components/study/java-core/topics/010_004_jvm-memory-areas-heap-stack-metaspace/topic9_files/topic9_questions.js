const topic9_questions = [
  {
    "question": "Why is one of the two Survivor spaces always completely empty after a Minor GC completes?",
    "shortAnswer": "Because the Minor GC copying algorithm copies all surviving objects from Eden and the active 'From' survivor space into the empty 'To' survivor space, completely erasing the old spaces and then swapping their roles.",
    "explanation": "Ensures zero memory fragmentation in the Young Generation.",
    "hint": "Because all live objects are copied into the target Survivor space.",
    "level": "Intermediate",
    "codeExample": "Eden + S0 (From) -> Copied to S1 (To) -> S0 becomes empty"
  },
  {
    "question": "What JVM flag configures the size ratio between Eden and Survivor spaces?",
    "shortAnswer": "-XX:SurvivorRatio=<ratio>, where default is 8 (Eden = 8/10, S0 = 1/10, S1 = 1/10 of Young Gen).",
    "explanation": "Allows tuning the capacity of Eden vs Survivor spaces.",
    "hint": "-XX:SurvivorRatio",
    "level": "Intermediate",
    "codeExample": "java -XX:SurvivorRatio=8 -jar app.jar"
  }
];

export default topic9_questions;
