import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          HTTP Basics: Methods (GET, POST) &amp; Status Codes
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          When we call a web API using <code>fetch()</code>, we are sending an{" "}
          <strong>HTTP request</strong>. HTTP defines methods (verbs) and status
          codes for communication between client (browser) and server.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          1. Common HTTP Methods
        </h3>

        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li>
            <strong>GET</strong> – fetch data (e.g. marks, profiles).
          </li>
          <li>
            <strong>POST</strong> – send new data (e.g. submit a test).
          </li>
          <li>
            <strong>PUT</strong> / <strong>PATCH</strong> – update existing data.
          </li>
          <li>
            <strong>DELETE</strong> – delete data.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-200">
          2. Status Codes (Overview)
        </h3>

        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li>
            <strong>200</strong> – OK (success).
          </li>
          <li>
            <strong>201</strong> – Created (new resource created).
          </li>
          <li>
            <strong>400</strong> – Bad Request (client sent something invalid).
          </li>
          <li>
            <strong>401</strong> – Unauthorized (login/auth required).
          </li>
          <li>
            <strong>404</strong> – Not Found (wrong URL or missing resource).
          </li>
          <li>
            <strong>500</strong> – Internal Server Error (problem on server side).
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-200">
          3. Simple GET Example
        </h3>

        <CodeBlock
          language="javascript"
          code={`// Safe mock API: JSONPlaceholder
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    console.log("Status:", response.status); // e.g. 200
    return response.json();
  })
  .then((data) => {
    console.log("Post data:", data);
  })
  .catch((error) => {
    console.log("Network error:", error);
  });`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          4. Simple POST Example
        </h3>

        <CodeBlock
          language="javascript"
          code={`fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "JS Practice",
    body: "Async & JSON with Sukanta Hui at Coder & AccoTax",
    userId: 1
  })
})
  .then((res) => res.json())
  .then((created) => {
    console.log("Created post:", created);
  })
  .catch((error) => {
    console.log("Error creating post:", error);
  });`}
        />

        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h4 className="text-sm font-semibold text-slate-100">
            Exam + Interview Tip
          </h4>
          <p className="text-slate-300 text-sm mt-2">
            Always remember the basic meanings: 2xx = success, 4xx = client error,
            5xx = server error. And GET vs POST is very commonly asked.
          </p>
        </section>
      </div>
    );
  }
}
