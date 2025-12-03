import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic10 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Topic 10 – Nested objects and arrays of objects
        </h2>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Nested objects
const institute = {
  name: "Coder & AccoTax",
  location: {
    city: "Barrackpore",
    state: "West Bengal",
    pincode: 700122,
  },
  isoCertified: true,
};

console.log(institute.location.city);
console.log(institute.location.pincode);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Array of student objects
const students = [
  { name: "Ritaja", course: "Python", batch: "Morning" },
  { name: "Mounita", course: "Advanced Excel", batch: "Evening" },
  { name: "Pranjali", course: "Tally + GST", batch: "Weekend" },
];

console.log(students[0].name);
console.log(students[1].course);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Nested arrays inside object
const course = {
  title: "Full Stack Development",
  technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
  mentors: [
    { name: "Sukanta Hui", role: "Lead Trainer" },
    { name: "Devangshu", role: "Assistant Trainer" },
  ],
};

console.log(course.technologies[2]);     // "JavaScript"
console.log(course.mentors[0].name);     // "Sukanta Hui"`}
        />
      </div>
    );
  }
}
