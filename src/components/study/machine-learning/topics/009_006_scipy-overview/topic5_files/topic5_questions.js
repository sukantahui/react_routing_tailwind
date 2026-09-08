const questions = [
  {
    id: 1,
    question: "If a student's machine learning exam score has a Z-score of +2.0, what does this indicate?",
    options: [
      "The student scored 2 marks in the exam",
      "The student scored exactly 2 standard deviations above the class mean",
      "The student scored 2 times the average",
      "The exam difficulty was 2.0"
    ],
    correctAnswer: 1,
    explanation: "A Z-score of +2.0 means the individual observation is located exactly 2 standard deviations above the dataset mean."
  },
  {
    id: 2,
    question: "According to the empirical rule, what percentage of data points in a normal distribution lie within ±2 standard deviations of the mean?",
    options: [
      "50.0%",
      "68.3%",
      "95.4%",
      "99.7%"
    ],
    correctAnswer: 2,
    explanation: "In a normal distribution, ~68.3% lies within ±1σ, ~95.4% lies within ±2σ, and ~99.7% lies within ±3σ."
  },
  {
    id: 3,
    question: "What are the mean and standard deviation of any dataset after undergoing Z-score normalization?",
    options: [
      "Mean = 1, Std = 0",
      "Mean = 0, Std = 1",
      "Mean = 100, Std = 15",
      "Mean = min, Std = max"
    ],
    correctAnswer: 1,
    explanation: "Z-score transformation shifts the center to 0.0 and rescales the standard deviation to 1.0."
  }
];

export default questions;
