const topic10_questions = [
  {
    question: "Why does a HashSet permit duplicate entries when a class overrides 'equals()' but fails to override 'hashCode()'?",
    shortAnswer: "HashSet computes the hashCode() of the incoming element first to select a bucket. Because the two equal objects have different default memory hash codes, they land in different buckets, so the HashSet never compares them with equals() and allows the duplicate insertion.",
    explanation: "Breaks the fundamental uniqueness invariant of the Set interface.",
    hint: "Different hashCodes send equal elements to different buckets, bypassing equals().",
    level: "Advanced",
    codeExample: "set.add(s1); set.add(s2); // Size becomes 2 instead of 1!"
  }
];

export default topic10_questions;