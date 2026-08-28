/**
 * JS014: Execution Stack Trace Inspection with console.trace()
 * Module: 001_001_getting-started-with-javascript (Topic 5)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

function sanitizeDiscount(rate) {
  if (rate > 0.5) {
    console.warn("⚠️ High discount detected (> 50%). Tracing call stack origin:");
    console.trace("HighDiscountInvestigation");
  }
  return Math.min(rate, 0.5);
}

function calculateItemPrice(item) {
  const finalDiscount = sanitizeDiscount(item.discount);
  return item.price * (1 - finalDiscount);
}

function processCheckoutCart(cart) {
  return cart.map(item => ({
    name: item.name,
    total: calculateItemPrice(item)
  }));
}

const sampleCart = [
  { name: "JavaScript Master Handbook", price: 1000, discount: 0.1 },
  { name: "VIP Mentorship Pass", price: 5000, discount: 0.75 } // Triggers trace
];

console.log("Cart Processed:", processCheckoutCart(sampleCart));
