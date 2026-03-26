import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import all code files as raw strings
import helloTagContent from "./topic10_files/hello.tag?raw";
import greetingTagContent from "./topic10_files/greeting.tag?raw";
import jspUsingTags from "./topic10_files/index.jsp?raw";
import jspFragmentExample from "./topic10_files/fragment_demo.jsp?raw";
import tagHandlerJava from "./topic10_files/RepeatTag.java?raw";

const Topic10 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 dark:text-gray-100">
      {/* Title Section */}
      <div className="text-center space-y-2 animate-[fadeSlideUp_0.6s_ease-out]">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          JSP Fragments & Tag Files
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Reusable UI components and modular JSP development
        </p>
      </div>

      {/* Conceptual Explanation */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">What are JSP Fragments and Tag Files?</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <p className="leading-relaxed mb-4">
            <strong>JSP Fragments</strong> are pieces of JSP code that can be passed to custom tags as parameters, allowing dynamic content injection.
            <strong>Tag Files</strong> are a simpler way to create custom tags using JSP syntax instead of Java classes. They encapsulate reusable UI logic in
            <code>.tag</code> files, promoting modularity and reducing code duplication.
          </p>
          <p className="leading-relaxed">
            Both concepts were introduced in JSP 2.0 to make JSP development more component-based and easier to maintain. Tag files are especially popular because
            they allow developers to build custom tags without writing Java, using only JSP and JSTL.
          </p>
        </div>
      </section>

      {/* SVG Diagram - Tag File Lifecycle */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Tag File Workflow (Visual)</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-center">
            <svg width="700" height="200" viewBox="0 0 700 200" className="w-full max-w-3xl h-auto">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
                </marker>
              </defs>

              {/* JSP Page */}
              <rect x="20" y="70" width="120" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="80" y="105" textAnchor="middle" fill="white">JSP Page</text>

              {/* Arrow */}
              <line x1="140" y1="100" x2="180" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Tag File */}
              <rect x="190" y="70" width="120" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="250" y="105" textAnchor="middle" fill="white">Tag File (.tag)</text>

              {/* Arrow */}
              <line x1="310" y1="100" x2="350" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Processed Output */}
              <rect x="360" y="70" width="120" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="420" y="105" textAnchor="middle" fill="white">Output</text>

              {/* Additional annotation */}
              <text x="420" y="160" textAnchor="middle" fill="#9ca3af" fontSize="12">Encapsulates UI logic</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Tag files are invoked like custom tags, but written in JSP syntax.
          </p>
        </div>
      </section>

      {/* Detailed Explanation */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.3s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Understanding Fragments and Tag Files</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">JSP Fragments</h3>
            <p className="leading-relaxed">
              A JSP fragment is a piece of JSP content that can be passed to a custom tag as an attribute. The tag can then invoke the fragment multiple times,
              with or without a context. This is useful for building components like loops, conditionals, or layouts.
            </p>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              <strong>Usage:</strong> Declared using <code>&lt;jsp:attribute&gt;</code> or implicitly as tag body.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Tag Files</h3>
            <p className="leading-relaxed">
              Tag files are a simpler alternative to writing Java tag handlers. They reside in <code>/WEB-INF/tags/</code> and have a <code>.tag</code> extension.
              You can use JSP elements, EL, and JSTL inside them. They can accept attributes and even body content.
            </p>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              <strong>Advantage:</strong> No Java coding required; pure JSP.
            </p>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.4s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Code Examples</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">1. A Simple Tag File (hello.tag)</h3>
            <JavaFileLoader
              fileModule={helloTagContent}
              title="hello.tag"
              highlightLines={[2, 4]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              This tag accepts a <code>name</code> attribute and outputs a greeting. It's stored in <code>/WEB-INF/tags/hello.tag</code>.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">2. Tag with Body (greeting.tag)</h3>
            <JavaFileLoader
              fileModule={greetingTagContent}
              title="greeting.tag"
              highlightLines={[3, 5]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              This tag wraps its body content in a <code>div</code> and allows an optional <code>style</code> attribute.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">3. Using Tag Files in a JSP</h3>
            <JavaFileLoader
              fileModule={jspUsingTags}
              title="index.jsp"
              highlightLines={[3, 7, 8]}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">4. Using JSP Fragments in a Custom Tag</h3>
            <JavaFileLoader
              fileModule={jspFragmentExample}
              title="fragment_demo.jsp"
              highlightLines={[5,6]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Here, a custom tag <code>&lt;my:repeat&gt;</code> expects a fragment (the body) and executes it <code>times</code> times.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">5. Java Tag Handler for the Repeat Tag</h3>
            <JavaFileLoader
              fileModule={tagHandlerJava}
              title="RepeatTag.java"
              highlightLines={[12, 13]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              This Java class implements the custom tag that uses the fragment passed as body.
            </p>
          </div>
        </div>
      </section>

      {/* Real-world Usage */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.5s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Real-world Applications</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li><strong>Reusable UI Components:</strong> Create tag files for headers, footers, pagination controls, or data tables that can be reused across many JSPs.</li>
            <li><strong>Layout Templates:</strong> Use fragments to define layouts where content is passed as fragments, enabling consistent page structure.</li>
            <li><strong>Dynamic Lists:</strong> Build tags that iterate over collections and render items using fragments, similar to <code>&lt;c:forEach&gt;</code> but with custom styling.</li>
            <li><strong>Conditional Rendering:</strong> Tags that conditionally render content based on user roles or other logic.</li>
          </ul>
          <p className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
            Example: In a school management system, you could create a <code>&lt;student:card&gt;</code> tag that displays student details with a consistent design, used across admin and teacher dashboards.
          </p>
        </div>
      </section>

      {/* Tips & Tricks */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.6s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">💡 Tips & Tricks</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Use <code>@attribute</code> directives in tag files to define required/optional attributes with <code>rtexprvalue</code> to accept EL expressions.</li>
            <li>Tag files can import other tags using <code>@taglib</code> directives, just like JSP pages.</li>
            <li>Fragments can be passed as attributes using <code>&lt;jsp:attribute name="fragmentName"&gt;...&lt;/jsp:attribute&gt;</code> for multiple fragments.</li>
            <li>To access the body of a tag file, use <code>&lt;jsp:doBody/&gt;</code>. You can also capture the body into a variable using <code>var</code> and <code>scope</code> attributes.</li>
            <li>Tag files can have their own variables with <code>&lt;c:set&gt;</code> or scriptlets, but avoid scriptlets for maintainability.</li>
          </ul>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.7s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">⚠️ Common Mistakes</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>❌ <strong>Placing tag files in wrong directory:</strong> Tag files must be under <code>/WEB-INF/tags/</code> or a subdirectory, otherwise they won't be found.</li>
            <li>❌ <strong>Forgetting to declare taglib:</strong> To use a tag file, you need <code>&lt;%@ taglib prefix="my" tagdir="/WEB-INF/tags" %&gt;</code> in the JSP.</li>
            <li>❌ <strong>Misusing <code>jsp:doBody</code>:</strong> If the tag file has no body content, <code>jsp:doBody</code> will output nothing; you might want to handle that case.</li>
            <li>❌ <strong>Attribute name collisions:</strong> Avoid using reserved words like "bodyContent" as attribute names.</li>
            <li>❌ <strong>Overcomplicating tag files:</strong> Tag files are meant to simplify; if you find yourself writing complex Java-like logic, consider a Java tag handler instead.</li>
          </ul>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.8s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">✅ Best Practices</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Keep tag files small and focused on presentation; move business logic to servlets or beans.</li>
            <li>Use descriptive names for tag files and attributes to make them self-documenting.</li>
            <li>Leverage JSTL inside tag files for looping and conditionals rather than scriptlets.</li>
            <li>Test tag files in isolation by creating a simple JSP that only uses them.</li>
            <li>Document the expected attributes and body content in comments or a separate documentation file.</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.9s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">🔍 Hint Section</h2>
        <div className="bg-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-xl p-6">
          <p className="italic leading-relaxed">
            <strong>Think about…</strong> How would you refactor a JSP that has repeated header and footer code using tag files? What attributes would you pass to make it flexible?
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Observe carefully…</strong> In the <code>greeting.tag</code>, we used <code>{`\${style}`}</code> inside the <code>class</code> attribute of the <code>div</code>. If <code>style</code> is not provided, the attribute will be empty. How would you provide a default style?
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Try changing this…</strong> Modify the <code>repeat</code> tag to pass a variable named <code>index</code> to the fragment so that the body can display the current iteration number.
          </p>
        </div>
      </section>

      {/* Mini Checklist */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_1s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">📋 Mini Checklist</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-check list-inside space-y-2">
            <li>✅ Understand the difference between fragments and tag files.</li>
            <li>✅ Know where to place tag files (<code>/WEB-INF/tags/</code>).</li>
            <li>✅ Learn to declare attributes in tag files using <code>@attribute</code>.</li>
            <li>✅ Recognize how to invoke a tag file from a JSP using <code>tagdir</code>.</li>
            <li>✅ Understand that fragments are pieces of JSP passed to custom tags (Java or tag files).</li>
            <li>✅ Use <code>&lt;jsp:doBody/&gt;</code> to include body content in tag files.</li>
            <li>✅ Avoid scriptlets inside tag files; use EL and JSTL instead.</li>
          </ul>
        </div>
      </section>

      {/* Teacher's Note */}
      <Teacher
        note={`Fragments and tag files are powerful tools that can dramatically reduce duplication in your JSP projects. I've seen many developers struggle with maintaining hundreds of JSPs that all contain the same header, footer, and navigation. By moving these into tag files, you centralize changes and improve consistency. Remember that tag files are not just for "small" components; you can build entire page layouts using tag files that accept multiple fragments (e.g., header, sidebar, content, footer). Also, when passing fragments to custom tags, you get the flexibility to inject dynamic content into loops or conditionals. This concept is similar to "slots" in modern frontend frameworks like Vue or React. In my ${experienceYears} years of teaching (since 1998), I've found that students grasp tag files more easily when they compare them to including files, but with the added benefit of attributes and encapsulation.`}
      />
    </div>
  );
};

export default Topic10;