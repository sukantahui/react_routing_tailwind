// Example 1: Totals – sum, average, product

const students = [
  { name: "Swadeep", marks: 85, city: "Barrackpore CNAT" },
  { name: "Tuhina", marks: 92, city: "Naihati CNAT" },
  { name: "Abhronila", marks: 78, city: "Barrackpore CNAT" },
  { name: "Debangshu", marks: 88, city: "Naihati CNAT" },
  { name: "Ritaja", marks: 95, city: "Barrackpore CNAT" },
];

// 1. Sum of marks
const totalMarks = students.reduce((sum, student) => sum + student.marks, 0);
console.log("Total marks:", totalMarks);

// 2. Average marks
const avgMarks = students.reduce((sum, s) => sum + s.marks, 0) / students.length;
console.log("Average marks:", avgMarks.toFixed(2));

// 3. Product of all marks (just for fun)
const productMarks = students.reduce((prod, s) => prod * s.marks, 1);
console.log("Product of marks:", productMarks);

// 4. Total price of products (another dataset)
const products = [
  { name: "Laptop", price: 55000 },
  { name: "Mouse", price: 600 },
  { name: "Keyboard", price: 1200 },
];
const totalPrice = products.reduce((total, p) => total + p.price, 0);
console.log("Total price: ₹", totalPrice);