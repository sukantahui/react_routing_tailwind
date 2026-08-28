import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic32 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Topic 32 – super() keyword and method overriding
        </h2>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Using super() in constructor
class Person {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    console.log("Hi, I am " + this.name);
  }
}

class Student extends Person {
  constructor(name, course) {
    super(name); // calls Person constructor
    this.course = course;
  }

  introduce() {
    console.log(
      "Hi, I am " + this.name + ", learning " + this.course
    );
  }
}

const s1 = new Student("Ritaja", "Python");
s1.introduce();`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Calling parent method using super
class Teacher extends Person {
  constructor(name, subject) {
    super(name);
    this.subject = subject;
  }

  introduce() {
    super.introduce(); // call Person's introduce
    console.log("I teach " + this.subject);
  }
}

const t1 = new Teacher("Sukanta Hui", "JavaScript");
t1.introduce();`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Overriding method with extra behaviour
class Course {
  constructor(title) {
    this.title = title;
  }

  getInfo() {
    console.log("Course:", this.title);
  }
}

class PaidCourse extends Course {
  constructor(title, fees) {
    super(title);
    this.fees = fees;
  }

  getInfo() {
    super.getInfo();
    console.log("Fees:", this.fees);
  }
}

const c = new PaidCourse("Tally with GST", 8000);
c.getInfo();`}
        />
      </div>
    );
  }
}
