const topic4_questions = [
  {
    question: "How does the Strategy Pattern demonstrate the Open/Closed Principle in notification engines?",
    shortAnswer: "The engine maintains a list of 'NotificationChannel' interfaces and broadcasts polymorphically. Adding support for Telegram, Discord, or Slack requires writing new channel implementations without modifying the Broadcast engine code.",
    explanation: "This is the architecture powering modern plugin systems and event pipelines.",
    hint: "Registers interface plugins and loops polymorphically without if-else checks.",
    level: "Intermediate",
    codeExample: "engine.registerChannel(new SlackChannel()); // Zero engine code modification"
  }
];

export default topic4_questions;