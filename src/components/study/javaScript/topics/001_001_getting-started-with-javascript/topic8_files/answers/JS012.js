/**
 * JS012: Micro-Benchmarking with console.time() and console.timeEnd()
 * Module: 001_001_getting-started-with-javascript (Topic 5)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

const ITERATIONS = 100_000;

console.log(`⏱️ Benchmarking ${ITERATIONS.toLocaleString()} String Operations:`);

// Method 1: String Concatenation (+)
console.time("string-concatenation-plus");
let strConcat = "";
for (let i = 0; i < ITERATIONS; i++) {
  strConcat += "a";
}
console.timeEnd("string-concatenation-plus");

// Method 2: Array Push & Join
console.time("array-push-and-join");
const strArray = [];
for (let i = 0; i < ITERATIONS; i++) {
  strArray.push("a");
}
const strResult = strArray.join("");
console.timeEnd("array-push-and-join");

console.log(`Verified output lengths: ${strConcat.length} === ${strResult.length}`);
