// Example 3: Analytics – count, min, max, frequency

const students = [
  { name: "Swadeep", marks: 85, city: "Barrackpore CNAT" },
  { name: "Tuhina", marks: 92, city: "Naihati CNAT" },
  { name: "Abhronila", marks: 78, city: "Barrackpore CNAT" },
  { name: "Debangshu", marks: 88, city: "Naihati CNAT" },
  { name: "Ritaja", marks: 95, city: "Barrackpore CNAT" },
];

// 1. Count students per city
const cityCount = students.reduce((acc, s) => {
  acc[s.city] = (acc[s.city] || 0) + 1;
  return acc;
}, {});
console.log("City counts:", cityCount);

// 2. Find minimum marks
const minMarks = students.reduce(
  (min, s) => (s.marks < min ? s.marks : min),
  students[0].marks
);
console.log("Minimum marks:", minMarks);

// 3. Find maximum marks
const maxMarks = students.reduce(
  (max, s) => (s.marks > max ? s.marks : max),
  students[0].marks
);
console.log("Maximum marks:", maxMarks);

// 4. Frequency of marks (how many students got each mark)
const marksFrequency = students.reduce((acc, s) => {
  acc[s.marks] = (acc[s.marks] || 0) + 1;
  return acc;
}, {});
console.log("Marks frequency:", marksFrequency);