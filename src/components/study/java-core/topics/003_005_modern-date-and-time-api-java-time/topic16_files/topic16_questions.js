const topic16_questions = [
  {
    question: "What is the recommended enterprise architecture pattern for handling dates and times across global web systems?",
    shortAnswer: "1. Store ALL timestamps in the database as UTC 'Instant' (or UTC ISO-8601 strings). 2. Transmit UTC ISO-8601 strings across REST APIs. 3. Convert and format into the customer's local timezone ('ZonedDateTime') only at the presentation/UI layer.",
    explanation: "This golden rule prevents 100% of timezone shift and DST corruption bugs.",
    hint: "Store in UTC Instant; format to client local timezone on the frontend.",
    level: "Advanced",
    codeExample: "ZonedDateTime userTime = dbInstant.atZone(ZoneId.of(userZone));"
  }
];

export default topic16_questions;