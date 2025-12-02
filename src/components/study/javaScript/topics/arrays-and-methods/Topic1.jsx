import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Mutating Methods — push, pop, shift, unshift, splice
      </h2>

      <p className="text-slate-300 text-sm">
        These array methods modify the original array.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">push() and pop()</h3>

      <CodeBlock
        code={`const nums = [1, 2, 3];

nums.push(4);        // adds at end
console.log(nums);   // [1, 2, 3, 4]

nums.pop();          // removes last
console.log(nums);   // [1, 2, 3]`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">shift() and unshift()</h3>

      <CodeBlock
        code={`const items = ["js", "python"];

items.unshift("html");  // add at start
console.log(items);      // ["html", "js", "python"]

items.shift();           // remove first
console.log(items);      // ["js", "python"]`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">splice()</h3>

      <CodeBlock
        code={`const fruits = ["apple", "banana", "mango"];

fruits.splice(1, 1);  
// removes "banana"

fruits.splice(1, 0, "orange", "kiwi");  
// insert without removing

console.log(fruits);`}
        language="javascript"
      />

    </div>
  );
}
