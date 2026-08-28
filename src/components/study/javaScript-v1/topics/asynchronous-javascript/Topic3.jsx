import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-10 animate-[fadeIn_0.8s_ease-out]">

        {/* ================= HEADER ================= */}
        <section>
          <h2 className="text-xl font-semibold text-sky-300 tracking-wide animate-[slideDown_0.5s_ease-out]">
            Promises: States &amp; then / catch / finally
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed mt-2 animate-[fadeIn_1s_ease-out]">
            A <strong>Promise</strong> represents a value that will be available
            <em> now</em>, <em>later</em>, or <em>never</em>. It helps handle
            asynchronous operations cleanly and avoids Callback Hell.
          </p>
        </section>

        {/* ================= INFO CARD ================= */}
        <div className="p-4 border border-sky-700/50 bg-sky-900/20 rounded-xl shadow animate-[fadeIn_1.2s_ease-out]">
          <h4 className="text-sky-300 font-semibold text-sm mb-1">🔵 Promise States</h4>
          <ul className="text-slate-300 text-sm space-y-1">
            <li><strong>pending</strong> – still running</li>
            <li><strong>fulfilled</strong> – operation succeeded</li>
            <li><strong>rejected</strong> – operation failed</li>
          </ul>
        </div>

        {/* ================= SECTION 1 ================= */}
        <section>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.6s_ease-out]">
            1. Creating a Simple Promise
          </h3>

          <EditableCodeBlock
            initialCode={`const loadMarks = new Promise((resolve, reject) => {
  console.log("Fetching marks for Mounita from server...");

  setTimeout(() => {
    const success = true;

    if (success) {
      resolve(96); // fulfilled
    } else {
      reject("Unable to load marks");
    }
  }, 1000);
});`}
          />

          <p className="text-slate-400 text-sm mt-1 animate-[fadeIn_1.1s_ease-out]">
            Promises use <code>resolve()</code> for success and <code>reject()</code> for failure.
          </p>
        </section>

        {/* ================= SECTION 2 ================= */}
        <section>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.7s_ease-out]">
            2. then() and catch()
          </h3>

          <EditableCodeBlock
            initialCode={`loadMarks
  .then((marks) => {
    console.log("Marks received:", marks);
  })
  .catch((error) => {
    console.log("Error:", error);
  });`}
          />

          <div className="mt-2 p-3 rounded-xl bg-indigo-900/20 border border-indigo-700/50 text-slate-300 text-sm animate-[fadeIn_1.3s_ease-out]">
            ✔ <code>.then()</code> handles success  
            ✔ <code>.catch()</code> handles errors  
          </div>
        </section>

        {/* ================= SECTION 3 ================= */}
        <section>
          <h3 className="text-lg font-semibold text-slate-200 animate-[slideRight_0.8s_ease-out]">
            3. finally()
          </h3>

          <EditableCodeBlock
            initialCode={`loadMarks
  .then((marks) => {
    console.log("Success:", marks);
  })
  .catch((error) => {
    console.log("Failed:", error);
  })
  .finally(() => {
    console.log("Operation finished for student marks (Coder & AccoTax).");
  });`}
          />

          <p className="text-slate-400 text-sm mt-2 animate-[fadeIn_1.3s_ease-out]">
            <code>.finally()</code> always runs—success or failure.
          </p>
        </section>

        {/* ================= SUMMARY CARD ================= */}
        <section className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl shadow-xl animate-[fadeIn_1.6s_ease-out]">
          <h4 className="text-sm font-semibold text-slate-100">📌 Why Promises Improve Async Code</h4>

          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Removes deep nesting seen in callback hell.</li>
            <li>Provides a clean way to handle success & failure.</li>
            <li><code>.finally()</code> offers a guaranteed cleanup step.</li>
            <li>Promises lead directly into <strong>async/await</strong> — the modern async style.</li>
          </ul>

          <p className="text-xs text-slate-400 mt-2">
            In the next topic, you'll learn how Promises chain together smoothly.
          </p>
        </section>

      </div>
    );
  }
}
