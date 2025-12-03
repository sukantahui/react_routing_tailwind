import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic14 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Topic 14 – Iterating objects: for...in loop
        </h2>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Basic for...in over object
const student = {
  name: "Susmita",
  course: "Python",
  batch: "Evening",
};

for (let key in student) {
  console.log(key, ":", student[key]);
}`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Filtering only own properties
const proto = { center: "Coder & AccoTax" };
const student = Object.create(proto);
student.name = "Kaustav";
student.course = "React";

for (let key in student) {
  if (student.hasOwnProperty(key)) {
    console.log("Own:", key, "-", student[key]);
  } else {
    console.log("From prototype:", key, "-", student[key]);
  }
}`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Counting properties
const result = {
  correct: 28,
  wrong: 2,
  skipped: 5,
};

let count = 0;
for (let key in result) {
  count++;
}
console.log("Total properties:", count);`}
        />
      </div>
    );
  }
}
