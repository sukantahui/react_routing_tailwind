import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic33 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Topic 33 – JSON.parse() and JSON.stringify()
        </h2>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Converting object to JSON string
const student = {
  name: "Pranjali",
  course: "Tally with GST",
  batch: "Evening",
};

const json = JSON.stringify(student);
console.log(json);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Converting JSON string to object
const jsonData = '{"name":"Susmita","course":"Python","batch":"Morning"}';

const obj = JSON.parse(jsonData);

console.log(obj.name);
console.log(obj.course);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Nested structures in JSON
const data = {
  center: "Coder & AccoTax",
  students: [
    { name: "Ritaja", course: "Python" },
    { name: "Kaustav", course: "JavaScript" },
  ],
};

const jsonStr = JSON.stringify(data);
console.log("JSON:", jsonStr);

const parsed = JSON.parse(jsonStr);
console.log("Parsed:", parsed.students[0].name);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 4: Pretty printing JSON
const settings = {
  theme: "dark",
  showHints: true,
  language: "en",
};

const pretty = JSON.stringify(settings, null, 2);
console.log(pretty);`}
        />
      </div>
    );
  }
}
