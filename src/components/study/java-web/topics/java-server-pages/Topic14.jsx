import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import code examples from topic14_files
import simpleTagHandlerJava from "./topic14_files/SimpleTagHandlerExample.java?raw";
import repeatTagJava from "./topic14_files/RepeatTag.java?raw";
import jspUsingSimpleTag from "./topic14_files/usingSimpleTag.jsp?raw";
import tagWithAttributesJava from "./topic14_files/TagWithAttributes.java?raw";
import jspWithAttributes from "./topic14_files/jspWithAttributes.jsp?raw";
import tagLibraryTLD from "./topic14_files/mytags.tld?raw";

const Topic14 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 dark:text-gray-100">
      {/* Title Section */}
      <div className="text-center space-y-2 animate-[fadeSlideUp_0.6s_ease-out]">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          JSP 2.0 Simple Tag Handlers
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Building custom tags with Java classes – simpler and more powerful
        </p>
      </div>

      {/* Conceptual Explanation */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">What are Simple Tag Handlers?</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
          <p className="leading-relaxed mb-4">
            <strong>Simple Tag Handlers</strong> were introduced in JSP 2.0 as a simpler alternative to the classic tag handlers (Tag, IterationTag, BodyTag). 
            They extend <code>javax.servlet.jsp.tagext.SimpleTagSupport</code> and override the <code>doTag()</code> method. 
            This approach eliminates complex lifecycle methods and makes custom tag development easier.
          </p>
          <p className="leading-relaxed">
            Simple tags can have attributes, body content, and can be invoked multiple times. They are perfect for creating reusable UI components like 
            <code>&lt;my:greeting&gt;</code> or <code>&lt;my:repeat&gt;</code> without the boilerplate of classic tags.
          </p>
        </div>
      </section>

      {/* SVG Diagram: Simple Tag Handler Flow */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Simple Tag Lifecycle</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-center">
            <svg width="650" height="200" viewBox="0 0 650 200" className="w-full max-w-3xl h-auto">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
                </marker>
              </defs>

              {/* JSP Tag Usage */}
              <rect x="20" y="70" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="70" y="105" textAnchor="middle" fill="white">&lt;my:tag&gt;</text>

              {/* Arrow */}
              <line x1="120" y1="100" x2="160" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* SimpleTag Handler */}
              <rect x="170" y="70" width="140" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="240" y="95" textAnchor="middle" fill="white">SimpleTagSupport</text>
              <text x="240" y="115" textAnchor="middle" fill="#9ca3af" fontSize="10">doTag()</text>

              {/* Arrow */}
              <line x1="310" y1="100" x2="350" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Output */}
              <rect x="360" y="70" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="410" y="105" textAnchor="middle" fill="white">Output</text>

              {/* Additional note */}
              <text x="240" y="155" textAnchor="middle" fill="#9ca3af" fontSize="10">Simple lifecycle – just doTag()</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Simple tag handlers execute all logic in the <code>doTag()</code> method, simplifying development.
          </p>
        </div>
      </section>

      {/* Components Explanation */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Key Concepts</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">SimpleTagSupport</h3>
            <p className="leading-relaxed">
              Base class for simple tags. Provides methods like <code>getJspContext()</code>, <code>getJspBody()</code>, and <code>setJspBody()</code>.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">doTag()</h3>
            <p className="leading-relaxed">
              The only method you need to implement. Contains all tag logic: processing attributes, invoking body, and writing output.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Attributes</h3>
            <p className="leading-relaxed">
              Declared via <code>&lt;attribute&gt;</code> in TLD or directly via setter methods in the tag class (convention-based).
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">JspFragment</h3>
            <p className="leading-relaxed">
              Represents the tag's body content. Can be invoked multiple times via <code>invoke()</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Code Examples</h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">1. A Simple Tag Handler (HelloTag)</h3>
            <JavaFileLoader
              fileModule={simpleTagHandlerJava}
              title="HelloTag.java"
              highlightLines={[6,7,8]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              This tag outputs "Hello, World!" directly to the response.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">2. A Tag with Body (RepeatTag)</h3>
            <JavaFileLoader
              fileModule={repeatTagJava}
              title="RepeatTag.java"
              highlightLines={[8,9,10,11,12]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Repeats its body content a specified number of times.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">3. JSP Using the Simple Tag</h3>
            <JavaFileLoader
              fileModule={jspUsingSimpleTag}
              title="usingSimpleTag.jsp"
              highlightLines={[3,4,5]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Demonstrates how to use the custom tags in a JSP.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">4. Tag with Attributes (GreetingTag)</h3>
            <JavaFileLoader
              fileModule={tagWithAttributesJava}
              title="GreetingTag.java"
              highlightLines={[6,7,8,9]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Accepts a <code>name</code> attribute and outputs a personalized greeting.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">5. JSP Using Tag with Attributes</h3>
            <JavaFileLoader
              fileModule={jspWithAttributes}
              title="jspWithAttributes.jsp"
              highlightLines={[3]}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">6. TLD File (Tag Library Descriptor)</h3>
            <JavaFileLoader
              fileModule={tagLibraryTLD}
              title="mytags.tld"
              highlightLines={[10,11,12,13,14,15,16]}
            />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Describes the tags and their attributes. Place in <code>/WEB-INF/tlds/</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Real-world Usage */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">Real-world Applications</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <li><strong>UI Components:</strong> Create reusable buttons, panels, data grids, etc.</li>
            <li><strong>Conditional Rendering:</strong> Tags that show/hide content based on user roles.</li>
            <li><strong>Loop Constructs:</strong> Build custom iterators that generate HTML with alternating styles.</li>
            <li><strong>Layout Management:</strong> Implement templates where content is injected as fragments.</li>
          </ul>
          <p className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
            Example: In a school system, a <code>&lt;school:studentCard /&gt;</code> tag could display a student's photo, name, and grade with consistent styling across pages.
          </p>
        </div>
      </section>

      {/* Tips & Tricks */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">💡 Tips & Tricks</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Use <code>getJspContext().getOut()</code> to write directly to the response if you don't need to process the body.</li>
            <li>If your tag has a body, you can invoke it multiple times using <code>getJspBody().invoke(null)</code>. Pass a <code>Writer</code> to capture the output.</li>
            <li>For attributes, just add a setter method; the container will automatically set it before calling <code>doTag()</code>.</li>
            <li>Use the <code>skipBody</code> pattern: if some condition is false, simply skip invoking the body.</li>
            <li>Simple tags can also implement <code>DynamicAttributes</code> to accept any number of attributes.</li>
          </ul>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">⚠️ Common Mistakes</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>❌ <strong>Forgetting to declare the tag library in TLD or web.xml:</strong> The JSP won't find the tag.</li>
            <li>❌ <strong>Not handling <code>JspException</code> or <code>IOException</code> in <code>doTag()</code>:</strong> Always re-throw or wrap them.</li>
            <li>❌ <strong>Invoking <code>getJspBody()</code> when the tag has no body:</strong> It returns <code>null</code>; always check.</li>
            <li>❌ <strong>Using <code>out.print()</code> after the body has been invoked multiple times:</strong> The order of writing might be confusing.</li>
            <li>❌ <strong>Not making the tag thread‑safe:</strong> If you store mutable instance variables, they could be corrupted under concurrent access. Use local variables.</li>
          </ul>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">✅ Best Practices</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-disc list-inside space-y-2">
            <li>Keep tags simple and focused on presentation; move complex logic to helper classes.</li>
            <li>Define a clear TLD with descriptive documentation for each tag and attribute.</li>
            <li>Use <code>rtexprvalue</code> in TLD to allow EL expressions as attribute values.</li>
            <li>Always handle <code>JspException</code> and <code>IOException</code> properly.</li>
            <li>For tags that output a lot of HTML, consider using JSP fragments to generate dynamic content.</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">🔍 Hint Section</h2>
        <div className="bg-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 rounded-xl p-6">
          <p className="italic leading-relaxed">
            <strong>Think about…</strong> How would you write a tag that outputs a table with alternating row colors? You can use a loop inside <code>doTag()</code> and invoke the body for each row.
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Observe carefully…</strong> In the <code>RepeatTag</code>, we used <code>getJspBody().invoke(null)</code>. What would happen if we passed a <code>StringWriter</code> instead? You could capture the body content and modify it.
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Try changing this…</strong> Modify the <code>GreetingTag</code> to also accept a <code>greeting</code> attribute that defaults to "Hello". How would you handle a missing attribute?
          </p>
        </div>
      </section>

      {/* Mini Checklist */}
      <section className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_1s]">
        <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4">📋 Mini Checklist</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <ul className="list-check list-inside space-y-2">
            <li>✅ Understand the difference between classic and simple tags.</li>
            <li>✅ Know the lifecycle: instantiation → set attributes → setJspBody → doTag.</li>
            <li>✅ Implement a custom tag by extending <code>SimpleTagSupport</code> and overriding <code>doTag()</code>.</li>
            <li>✅ Declare attributes via setter methods or TLD.</li>
            <li>✅ Use <code>getJspBody()</code> to access body content and invoke it.</li>
            <li>✅ Write a TLD file and reference it in JSPs using <code>taglib</code> directive.</li>
            <li>✅ Handle exceptions properly.</li>
          </ul>
        </div>
      </section>

      {/* Teacher's Note */}
      <Teacher
        note={`Simple tag handlers are a game-changer for JSP developers. In my ${experienceYears} years of teaching (since 1998), I've found that students grasp them much faster than the older Tag interface. The key is to remember that everything happens in doTag() – there's no need to manage state across multiple lifecycle methods. 
        A pro tip: if your tag needs to output a lot of HTML, consider using a JSP fragment as the body and invoking it multiple times. This keeps your Java code clean and lets the JSP handle the presentation. 
        Also, when writing tags, always think about thread safety: avoid storing mutable data in instance variables. Use local variables inside doTag() instead. 
        In a school management system, you could create a tag that displays a student profile card, accepting a StudentBean as an attribute and rendering it consistently across the entire application. 
        Remember, tags are meant to be reusable, so design them with flexibility in mind.`}
      />
    </div>
  );
};

export default Topic14;