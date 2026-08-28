import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          Mini Project: Fetch Data from a Public API &amp; Display it in the DOM
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Let&apos;s build a small mini project: fetch a list of posts from a
          public API and show them on a page. You can adapt this to show student
          data, course list, or marks in a Coder &amp; AccoTax style dashboard.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          1. HTML Structure
        </h3>

        <CodeBlock
          language="html"
          code={`<button id="loadBtn">Load Posts</button>
<div id="status"></div>
<ul id="postList"></ul>`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          2. JavaScript to Fetch &amp; Render
        </h3>

        <CodeBlock
          language="javascript"
          code={`const loadBtn = document.getElementById("loadBtn");
const statusEl = document.getElementById("status");
const postList = document.getElementById("postList");

async function loadPosts() {
  statusEl.textContent = "Loading posts for JS students...";
  postList.innerHTML = "";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }

    const posts = await res.json();

    statusEl.textContent = "Loaded " + posts.length + " posts.";
    posts.forEach((post) => {
      const li = document.createElement("li");
      li.innerHTML = \`<strong>\${post.title}</strong><br/>\${post.body}\`;
      postList.appendChild(li);
    });
  } catch (error) {
    statusEl.textContent = "Failed to load posts: " + error.message;
  }
}

loadBtn.addEventListener("click", loadPosts);`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          3. Ideas to Extend This Project
        </h3>

        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li>Replace posts with &quot;students&quot; or &quot;courses&quot;.</li>
          <li>
            Add a search box so Devangshu or Susmita can search their own posts.
          </li>
          <li>
            Show a small badge like &quot;Powered by Coder &amp; AccoTax&quot;
            at the bottom of the project.
          </li>
        </ul>

        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h4 className="text-sm font-semibold text-slate-100">
            Learning Outcome
          </h4>
          <p className="text-slate-300 text-sm mt-2">
            From this mini project, students understand the full flow:{" "}
            <strong>call API → get JSON → parse → use data → update DOM</strong>.
            This is the core of modern frontend development.
          </p>
        </section>
      </div>
    );
  }
}
