const topic6_questions = [
  {
    question: "What is the difference between 'withZoneSameInstant(zone)' and 'withZoneSameLocal(zone)' on a 'ZonedDateTime'?",
    shortAnswer: "'withZoneSameInstant(zone)' keeps the exact same global physical moment on the timeline and recalculates the local clock time for the new timezone (e.g. 8 PM in Kolkata becomes 10:30 AM in New York). 'withZoneSameLocal(zone)' changes the timezone rule while forcing the clock digits to remain the same (e.g. 8 PM in Kolkata becomes 8 PM in New York).",
    explanation: "Use withZoneSameInstant for international webinar and flight conversions.",
    hint: "withZoneSameInstant preserves the absolute global instant across timezones.",
    level: "Intermediate",
    codeExample: "ZonedDateTime nyTime = kolkataTime.withZoneSameInstant(ZoneId.of(\"America/New_York\"));"
  }
];

export default topic6_questions;
