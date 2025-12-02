import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic5() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        for…of & for…in (Overview)
      </h2>

      <p className="text-slate-300 text-sm">
        <strong>for…of</strong> → loops through values (arrays, strings)<br />
        <strong>for…in</strong> → loops through keys (objects)
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">for…of Example</h3>

      <CodeBlock
        code={`let nums = [10, 20, 30];

for (let value of nums) {
  console.log(value);
}
// Output: 10 20 30`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">for…in Example</h3>

      <CodeBlock
        code={`let student = {
  name: "Sukanta Hui",
  city: "Barrackpore",
  institute: "Coder & AccoTax"
};

for (let key in student) {
  console.log(key, ":", student[key]);
}`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Use <code>for…of</code> for arrays, <code>for…in</code> for objects.
      </p>

    </div>
  );
}
