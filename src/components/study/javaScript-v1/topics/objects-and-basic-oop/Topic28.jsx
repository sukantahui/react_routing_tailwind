import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic28 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Topic 28 – Prototype and prototype chain (conceptual)
        </h2>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Every object has a prototype
const student = {
  name: "Susmita",
  course: "Python",
};

console.log(Object.getPrototypeOf(student)); // prototype object`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Constructor function prototype
function Student(name) {
  this.name = name;
}

console.log(Student.prototype); // prototype of all Student instances

const s1 = new Student("Ritaja");
console.log(Object.getPrototypeOf(s1) === Student.prototype); // true`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Prototype chain lookup
const base = { center: "Coder & AccoTax" };
const student2 = Object.create(base); // prototype is base
student2.name = "Kaustav";

console.log(student2.name);    // own property
console.log(student2.center);  // found in prototype
console.log(student2.toString); // found further up in Object.prototype`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 4: Visualising the chain (conceptual comments)
// student2 --> base --> Object.prototype --> null`}
        />
      </div>
    );
  }
}
