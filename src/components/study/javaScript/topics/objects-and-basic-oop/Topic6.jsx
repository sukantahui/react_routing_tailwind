import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic6 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Topic 6 – Object literals: keys, values, methods (More Practice)
        </h2>

        <p>
          An object literal is a comma-separated list of key–value pairs wrapped
          in curly braces. This is the most common way to create objects in
          JavaScript.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Simple student object
const student = {
  name: "Ritaja",
  course: "JavaScript Fundamentals",
  institute: "Coder & AccoTax",
  isActive: true,
};

console.log(student.name);
console.log(student.course);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Teacher object with a method
const teacher = {
  name: "Sukanta Hui",
  subject: "Full Stack Development",
  yearsOfExperience: 15,
  introduce: function () {
    console.log("I am " + this.name + ", I teach " + this.subject + ".");
  },
};

teacher.introduce();`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Object literal for a course
const course = {
  title: "Advanced Excel with GST",
  durationMonths: 3,
  mode: "Offline",
  enrolledStudents: ["Mounita", "Kaustav", "Pranjali"],
  getSummary() {
    console.log(
      this.title + " (" + this.durationMonths + " months) - " + this.mode
    );
  },
};

course.getSummary();
console.log(course.enrolledStudents);`}
        />
      </div>
    );
  }
}
