import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic34 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Topic 34 – Storing and retrieving objects in LocalStorage
        </h2>
        <p className="text-sm text-slate-400">
          (These examples work in the browser console, not in Node.js.)
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Save object to localStorage
const student = {
  name: "Mounita",
  course: "Advanced Excel",
  batch: "Evening",
};

localStorage.setItem("studentProfile", JSON.stringify(student));

console.log("Saved to localStorage");`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Read object from localStorage
const data = localStorage.getItem("studentProfile");

if (data) {
  const studentObj = JSON.parse(data);
  console.log("Loaded student:", studentObj.name, "-", studentObj.course);
} else {
  console.log("No student profile found");
}`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Store array of objects
const batches = [
  { name: "Morning", trainer: "Sukanta Hui" },
  { name: "Weekend", trainer: "Tanusree Hui" },
];

localStorage.setItem("batches", JSON.stringify(batches));

const loaded = JSON.parse(localStorage.getItem("batches") || "[]");
loaded.forEach(function (b) {
  console.log(b.name + " - " + b.trainer);
});`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 4: Remove and clear
localStorage.removeItem("studentProfile");
localStorage.clear(); // removes all keys (use carefully)`}
        />
      </div>
    );
  }
}
