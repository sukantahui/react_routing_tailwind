const questions = [
  {
    id: 1,
    question: "In an ICSE 15-mark Section B class design question, what is the penalty for omitting the constructor?",
    options: [
      "No penalty, Java automatically supplies everything",
      "Deduction of 2 to 3 marks from the constructor marking rubric",
      "Immediate cancellation of the entire answer",
      "Only 1 mark deduction if main() is present"
    ],
    correctAnswer: 1,
    explanation: "Omitted or incorrectly named constructors lose 2-3 marks under the official ICSE marking scheme."
  },
  {
    id: 2,
    question: "What is the recommended modifier for instance variables in an ICSE class definition?",
    options: [
      "public",
      "private",
      "static",
      "abstract"
    ],
    correctAnswer: 1,
    explanation: "Instance variables should be declared private (Encapsulation) and accessed via constructors/methods."
  },
  {
    id: 3,
    question: "Why do we pass primitive arguments (like double balance) into parameterized constructors rather than hardcoding values?",
    options: [
      "To allow dynamic instantiation of multiple distinct objects with unique starting state",
      "Because Java forbids hardcoded numbers inside constructor bodies",
      "To speed up JVM garbage collection",
      "To prevent inheritance by subclasses"
    ],
    correctAnswer: 0,
    explanation: "Passing arguments allows each object to be created with its own custom initial values."
  }
];

export default questions;
