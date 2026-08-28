// Example 2: Grouping – by city, by category

const students = [
  { name: "Swadeep", marks: 85, city: "Barrackpore CNAT" },
  { name: "Tuhina", marks: 92, city: "Naihati CNAT" },
  { name: "Abhronila", marks: 78, city: "Barrackpore CNAT" },
  { name: "Debangshu", marks: 88, city: "Naihati CNAT" },
  { name: "Ritaja", marks: 95, city: "Barrackpore CNAT" },
];

// 1. Group students by city
const groupedByCity = students.reduce((acc, student) => {
  const city = student.city;
  if (!acc[city]) {
    acc[city] = [];
  }
  acc[city].push(student.name);
  return acc;
}, {});

console.log("Students by city:", groupedByCity);

// 2. Group products by category (example dataset)
const products = [
  { name: "Laptop", category: "Electronics", price: 55000 },
  { name: "Shirt", category: "Clothing", price: 1200 },
  { name: "Mouse", category: "Electronics", price: 600 },
  { name: "Jeans", category: "Clothing", price: 2500 },
];

const groupedByCategory = products.reduce((acc, product) => {
  const cat = product.category;
  if (!acc[cat]) {
    acc[cat] = [];
  }
  acc[cat].push({ name: product.name, price: product.price });
  return acc;
}, {});

console.log("Products by category:", groupedByCategory);