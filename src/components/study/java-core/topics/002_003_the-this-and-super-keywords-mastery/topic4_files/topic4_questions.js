const topic4_questions = [
  {
    question: "Why and when would you pass 'this' as an argument in a method call?",
    shortAnswer: "To pass the current object instance as a callback, event source, or data payload to an external service or listener (e.g. 'eventManager.register(this)').",
    explanation: "Passing 'this' allows external methods to access methods and data on the calling instance.",
    hint: "Passes current object as callback/event source to external service.",
    level: "Intermediate",
    codeExample: "public void register() { NotificationService.subscribe(this); }"
  }
];

export default topic4_questions;