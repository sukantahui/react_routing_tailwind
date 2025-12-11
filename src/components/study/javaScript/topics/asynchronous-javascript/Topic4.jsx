import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-10 animate-[fadeIn_0.8s_ease-out]">

        {/* ================= HEADER ================= */}
        <section>
          <h2 className="text-xl font-semibold text-sky-300 tracking-wide animate-[slideDown_0.5s_ease-out]">
            Creating &amp; Consuming Promises
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed mt-2 animate-[fadeIn_1s_ease-out]">
            In real-world applications (like Coder &amp; AccoTax dashboards),
            you will frequently <strong>create your own Promises</strong> to wrap async
            operations and <strong>consume them</strong> using <code>.then()</code> and{" "}
            <code>.catch()</code>.
          </p>
        </section>

        {/* ================= INFO CARD ================= */}
        <div className="p-4 border border-sky-700/50 bg-sky-900/20 rounded-xl shadow animate-[fadeIn_1.2s_ease-out]">
          <h4 className="text-sky-300 font-semibold text-sm mb-1">💡 Why Create Promises?</h4>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>Wrap async tasks like timers, API calls, file loads.</li>
            <li>Make async code easier to read.</li>
            <li>Allow chaining using `.then() → then() → catch()`.</li>
          </ul>
        </div>

        {/* ================= SECTION 1 ================= */}
        <section>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.6s_ease-out]">
            1. Wrapping setTimeout in a Promise
          </h3>

          <EditableCodeBlock
            initialCode={`function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

delay(1000).then(() => {
  console.log("1 second over, continuing...");
});`}
          />

          <p className="text-slate-400 text-sm mt-1">
            This is the foundation for creating custom async utility functions.
          </p>
        </section>

        {/* ================= SECTION 2 ================= */}
        <section>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.7s_ease-out]">
            2. Simulate Fetching Student Details
          </h3>

          <EditableCodeBlock
            initialCode={`function getStudent(name) {
  return new Promise((resolve, reject) => {
    console.log("Fetching data for", name);

    setTimeout(() => {
      const found = true;

      if (found) {
        resolve({
          name,
          centre: "Coder & AccoTax",
          city: "Barrackpore",
        });
      } else {
        reject("Student not found");
      }
    }, 1000);
  });
}

getStudent("Swadeep")
  .then((student) => {
    console.log("Student info:", student);
  })
  .catch((error) => {
    console.log("Error:", error);
  });`}
          />

          <div className="mt-2 p-3 rounded-xl bg-indigo-900/20 border border-indigo-700/50 text-slate-300 text-sm">
            ✔ Demonstrates resolving & rejecting  
            ✔ Perfect for API simulation in teaching dashboards  
          </div>
        </section>

        {/* ================= SECTION 3 ================= */}
        <section>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.8s_ease-out]">
            3. Chaining Promises
          </h3>

          <EditableCodeBlock
            initialCode={`function getMarks(name) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name, js: 92, es6: 95 }), 800);
  });
}

getStudent("Pranjali")
  .then((student) => {
    console.log("Profile loaded:", student);
    return getMarks(student.name);
  })
  .then((marks) => {
    console.log("Marks loaded:", marks);
  })
  .catch((error) => {
    console.log("Error:", error);
  });`}
          />

          <p className="text-slate-400 text-sm mt-2">
            Promise chaining keeps async logic clean and linear.
          </p>
        </section>

        {/* ================= SUMMARY CARD ================= */}
        <section className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl shadow-xl animate-[fadeIn_1.4s_ease-out]">
          <h4 className="text-sm font-semibold text-slate-100">📘 Good Practices</h4>

          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Always handle <code>.catch()</code> to avoid crashes.</li>
            <li>Break functions into small reusable async utilities.</li>
            <li>Return promises inside <code>.then()</code> for proper chaining.</li>
            <li>Use Promises before switching to async/await.</li>
          </ul>

          <p className="text-xs text-slate-400 mt-2">
            Next you will learn Promise Chaining → Async/Await conversion.
          </p>
        </section>

      </div>
    );
  }
}
