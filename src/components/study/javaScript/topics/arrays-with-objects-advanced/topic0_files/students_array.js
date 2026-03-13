// Example: Array of student objects
const students = [
  { id: 1, name: "Swadeep", marks: 85, city: "Barrackpore CNAT" },
  { id: 2, name: "Tuhina", marks: 92, city: "Naihati CNAT" },
  { id: 3, name: "Abhronila", marks: 78, city: "Barrackpore CNAT" },
  { id: 4, name: "Debangshu", marks: 88, city: "Naihati CNAT" },
  { id: 5, name: "Ritaja", marks: 95, city: "Barrackpore CNAT" },
];

// Loop using forEach
console.log("Student names:");
students.forEach(student => console.log(student.name));

// Find a student by name (basic)
const searchName = "Ritaja";
for (let student of students) {
  if (student.name === searchName) {
    console.log("Found:", student);
  }
}