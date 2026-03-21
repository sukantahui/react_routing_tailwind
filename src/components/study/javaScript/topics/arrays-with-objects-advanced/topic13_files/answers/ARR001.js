// ARR001 - Filter students with grade >= 80
const students = [
  { name: 'Alice', grade: 85 },
  { name: 'Bob', grade: 92 },
  { name: 'Charlie', grade: 78 },
  { name: 'Diana', grade: 88 }
];

const highAchievers = students.filter(s => s.grade >= 80);
console.log(highAchievers);
