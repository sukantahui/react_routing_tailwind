import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic7 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Topic 7 – Accessing properties: dot vs bracket notation
        </h2>
        <p>
          You can access object properties using <b>dot notation</b> or{" "}
          <b>bracket notation</b>. Bracket notation is useful when the property
          name is dynamic or not a valid identifier.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Dot vs bracket notation
const student = {
  name: "Swadeep",
  "favorite-subject": "Python",
  batch: "Weekend",
};

console.log(student.name);               // dot
console.log(student["favorite-subject"]); // bracket
console.log(student["batch"]);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Dynamic property access using bracket notation
const scores = {
  Ritaja: 95,
  Mounita: 90,
  Kaustav: 88,
};

const selectedName = "Kaustav";

console.log(scores.selectedName);     // undefined (literal key)
console.log(scores[selectedName]);    // 88 (dynamic key)`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Accessing properties with spaces or special characters
const institute = {
  name: "Coder & AccoTax",
  "iso-certified": true,
  "full address": "Barrackpore",
};

console.log(institute.name);
console.log(institute["iso-certified"]);
console.log(institute["full address"]);`}
        />
      </div>
    );
  }
}
