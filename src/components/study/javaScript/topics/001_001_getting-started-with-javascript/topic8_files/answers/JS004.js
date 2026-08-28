/**
 * JS004: Role of JavaScript: Dynamic DOM Content Generation
 * Module: 001_001_getting-started-with-javascript (Topic 1)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

function createStudentBadge(student) {
  const timestamp = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const badgeHTML = `
    <div class="student-card" data-student-id="${student.id}">
      <span class="status-indicator active">● Enrolled</span>
      <h3 class="student-name">${student.name}</h3>
      <p class="course-badge">${student.course}</p>
      <span class="enrollment-date">Joined: ${timestamp}</span>
    </div>
  `.trim();

  // If running in browser DOM
  if (typeof document !== "undefined" && document.body) {
    const container = document.createElement("div");
    container.innerHTML = badgeHTML;
    document.body.appendChild(container.firstElementChild);
    console.log(`Mounted DOM badge for student: ${student.name}`);
  }

  return badgeHTML;
}

const swadeepBadge = createStudentBadge({
  id: 101,
  name: "Swadeep",
  course: "JS Foundations & Syntax Mastery"
});

console.log("Generated Dynamic HTML Markup:");
console.log(swadeepBadge);
