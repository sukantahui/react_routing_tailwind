const topic12_questions = [
  {
    question: "What is the key difference between 'java.time.Period' and 'java.time.Duration'?",
    shortAnswer: "'Period' represents date-based amounts (Years, Months, Days) and is used with 'LocalDate'. 'Duration' represents time-based amounts (Hours, Minutes, Seconds, Nanoseconds) and is used with 'LocalTime', 'LocalDateTime', or 'Instant'.",
    explanation: "Period models human calendar concepts; Duration models machine timeline intervals.",
    hint: "Period is for date units (Years/Months/Days); Duration is for time units (Hours/Mins/Secs/Nanos).",
    level: "Intermediate",
    codeExample: "Duration d = Duration.between(startTime, endTime);"
  }
];

export default topic12_questions;