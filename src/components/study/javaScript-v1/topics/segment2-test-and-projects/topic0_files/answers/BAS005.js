// Smart Cart Calculator (Type Coercion)

// Prices (mixed types)
let item1 = "100";   // string
let item2 = 50;      // number
let item3 = "30";    // string

// ❌ Implicit coercion (wrong for addition)
let wrongTotal = item1 + item2 + item3;
console.log("Wrong Total (implicit):", wrongTotal); // "1005030"

// ✅ Explicit conversion (correct)
let total =
  Number(item1) +
  Number(item2) +
  Number(item3);

console.log("Correct Total:", total); // 180

// Apply discount
let discount = "20"; // string
let finalAmount = total - Number(discount);

console.log("Final Amount after discount:", finalAmount);

// Boolean coercion example
let isValid = Boolean(total);
console.log("Is cart valid?", isValid);

// Edge case: invalid conversion
let invalid = "abc";
let converted = Number(invalid);

console.log("Invalid conversion:", converted); // NaN
console.log("Type of NaN:", typeof converted);

// String conversion
let receipt = String(finalAmount);
console.log("Receipt (string):", receipt);

// Final formatted output
console.log(
  `Total: ${total}, Discount: ${discount}, Payable: ${finalAmount}`
);