import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          Using fetch() to Call Public APIs
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          The <code>fetch()</code> function is a modern way to make HTTP requests
          from the browser. It returns a <strong>Promise</strong>, so you can use
          <code>.then()</code> or <code>async/await</code>.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          1. Basic fetch() Pattern
        </h3>

        <CodeBlock
          language="javascript"
          code={`fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => {
    // We first check if response is OK (status is 200-299)
    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }
    return response.json(); // Parse JSON body
  })
  .then((data) => {
    console.log("User data:", data);
  })
  .catch((error) => {
    console.log("Network or HTTP error:", error.message);
  });`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          2. fetch() with async/await
        </h3>

        <CodeBlock
          language="javascript"
          code={`async function loadUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/2");

    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    const user = await response.json();
    console.log("User loaded:", user);
  } catch (error) {
    console.log("Failed to load user:", error.message);
  }
}

loadUser();`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          3. Example: Fetch a Fake Product (DummyJSON)
        </h3>

        <CodeBlock
          language="javascript"
          code={`async function loadProduct() {
  const url = "https://dummyjson.com/products/1";
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Product title:", data.title);
    console.log("Price:", data.price);
  } catch (error) {
    console.log("Error fetching product:", error);
  }
}

loadProduct();`}
        />

        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h4 className="text-sm font-semibold text-slate-100">
            How This Fits in Coder &amp; AccoTax Projects
          </h4>
          <p className="text-slate-300 text-sm mt-2">
            In real web apps, you might fetch:
          </p>
          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Student list (e.g., Ritaja, Mounita, Swadeep).</li>
            <li>Test scores and analytics.</li>
            <li>Course details (JavaScript, Python, Tally, GST, etc.).</li>
          </ul>
        </section>
      </div>
    );
  }
}
