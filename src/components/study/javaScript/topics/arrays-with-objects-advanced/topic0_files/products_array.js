// Example: Array of product objects
const products = [
  { id: 101, name: "Laptop", price: 55000, inStock: true },
  { id: 102, name: "Mouse", price: 600, inStock: false },
  { id: 103, name: "Keyboard", price: 1200, inStock: true },
];

// Traditional for loop to display product info
for (let i = 0; i < products.length; i++) {
  const p = products[i];
  console.log(`${p.name} costs ₹${p.price} and is ${p.inStock ? "in stock" : "out of stock"}.`);
}

// Update price of a product
for (let product of products) {
  if (product.name === "Mouse") {
    product.price = 650; // price increased
  }
}
console.log("Updated products:", products);