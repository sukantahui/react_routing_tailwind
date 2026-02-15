// Example: Array of task objects
const tasks = [
  { id: 201, title: "Complete project", status: "pending" },
  { id: 202, title: "Review code", status: "in-progress" },
  { id: 203, title: "Update docs", status: "done" },
];

// Add a new task using push
tasks.push({ id: 204, title: "Test module", status: "pending" });
console.log("After adding a task:", tasks);

// Mark a task as done (find and update)
for (let task of tasks) {
  if (task.title === "Review code") {
    task.status = "done";
    break;
  }
}
console.log("Updated task status:", tasks);