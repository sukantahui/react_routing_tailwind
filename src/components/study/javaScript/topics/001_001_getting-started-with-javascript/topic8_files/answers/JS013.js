/**
 * JS013: Function Invocation Tracking with console.count()
 * Module: 001_001_getting-started-with-javascript (Topic 5)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

function handleUserAction(actionType) {
  // Automatically increments and logs an internal counter per label
  console.count(`Action: ${actionType}`);
}

console.log("=== Tracking User Event Invocations ===");
handleUserAction("login_click");
handleUserAction("login_click");
handleUserAction("view_lesson_topic");
handleUserAction("login_click");
handleUserAction("view_lesson_topic");

console.log("\n=== Resetting login_click counter ===");
console.countReset("Action: login_click");
handleUserAction("login_click");
