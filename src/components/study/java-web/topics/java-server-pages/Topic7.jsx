import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import custom tag examples
import helloTagJava from "./topic7_files/HelloTag.java?raw";
import mytagsTld from "./topic7_files/mytags.tld?raw";
import useCustomTagJsp from "./topic7_files/useCustomTag.jsp?raw";
import attributeTagJava from "./topic7_files/AttributeTag.java?raw";
import bodyTagJava from "./topic7_files/BodyTag.java?raw";

// Inline keyframes for fade + slide-up
const keyframes = `
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic7 = () => {
  // Teacher experience dynamic
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <>
      <style>{keyframes}</style>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
        {/* Header */}
        <div
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8 space-y-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">
            Custom Tag Libraries
          </h1>
          <p className="text-lg">
            Custom tags allow you to create reusable, self-contained components
            in JSP. They encapsulate complex logic behind simple XML-like tags,
            promoting separation of concerns and reducing scriptlet pollution.
          </p>
        </div>

        {/* Why Custom Tags? */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[100ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
            Why Custom Tags?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4">
                JSP offers built-in tags (like JSTL), but sometimes you need
                application‑specific functionality. Custom tags let you:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Reuse common presentation logic across many pages.</li>
                <li>Hide complex Java code behind a clean tag interface.</li>
                <li>Make JSP pages easier for web designers to maintain.</li>
                <li>Create a library of domain‑specific components.</li>
              </ul>
            </div>
            {/* SVG: Tag lifecycle */}
            <div className="flex justify-center p-4">
              <svg
                width="280"
                height="160"
                viewBox="0 0 280 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current text-indigo-500 dark:text-indigo-400"
              >
                <rect x="10" y="20" width="80" height="40" rx="8" className="fill-gray-200 dark:fill-gray-800 stroke-2" />
                <text x="20" y="45" className="text-xs fill-gray-700 dark:fill-gray-300">JSP</text>
                <path d="M90 40 L120 40 L120 80 L150 80" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="160" cy="80" r="6" className="fill-indigo-500" />
                <text x="170" y="85" className="text-xs fill-gray-700 dark:fill-gray-300">Tag Handler</text>
                <path d="M160 86 L160 110 L210 110" stroke="currentColor" strokeWidth="2" fill="none" />
                <rect x="220" y="90" width="50" height="40" rx="8" className="fill-green-100 dark:fill-green-900/30 stroke-2 stroke-green-600" />
                <text x="230" y="115" className="text-xs fill-gray-700 dark:fill-gray-300">Output</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Architecture Overview */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[200ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">🏗️ How Custom Tags Work</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <p className="mb-4">
              A custom tag consists of three parts:
            </p>
            <ul className="list-decimal list-inside space-y-2 ml-4">
              <li>
                <strong>Tag Handler Class</strong> – a Java class (usually extending <code>SimpleTagSupport</code> or <code>TagSupport</code>) that implements the tag's behavior.
              </li>
              <li>
                <strong>Tag Library Descriptor (TLD)</strong> – an XML file that maps the tag name to the handler class and defines attributes.
              </li>
              <li>
                <strong>JSP Page</strong> – uses the tag via the taglib directive.
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <strong>Hint:</strong> In JSP 2.0+, you can also use <strong>tag files</strong> (JSP‑based tags) without writing Java. We'll cover tag files in a later topic.
            </p>
          </div>
        </section>

        {/* Step-by-step: Creating a Simple Tag */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[300ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">📝 Creating a Simple Tag (Hello World)</h2>
          <div className="space-y-6">
            {/* 1. Tag Handler */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">1. Write the Tag Handler</h3>
              <p className="mb-4">
                Extend <code>SimpleTagSupport</code> (preferred in JSP 2.0+) and override <code>doTag()</code>.
              </p>
              <JavaFileLoader
                fileModule={helloTagJava}
                title="HelloTag.java"
                highlightLines={[]}
              />
            </div>

            {/* 2. TLD */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">2. Define the Tag Library Descriptor (TLD)</h3>
              <p className="mb-4">
                Place this file in <code>/WEB-INF/tlds/</code> or any subfolder.
              </p>
              <JavaFileLoader
                fileModule={mytagsTld}
                title="mytags.tld"
                highlightLines={[]}
              />
            </div>

            {/* 3. Use in JSP */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">3. Use the Tag in a JSP</h3>
              <p className="mb-4">
                Declare the taglib with the URI defined in the TLD.
              </p>
              <JavaFileLoader
                fileModule={useCustomTagJsp}
                title="useCustomTag.jsp"
                highlightLines={[]}
              />
            </div>
          </div>
        </section>

        {/* Adding Attributes */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[400ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">🏷️ Adding Attributes</h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <p className="mb-4">
              Attributes make tags configurable. In the handler, you provide setter methods that match attribute names. The container calls them before <code>doTag()</code>.
            </p>
            <JavaFileLoader
              fileModule={attributeTagJava}
              title="AttributeTag.java"
              highlightLines={[]}
            />
            <p className="mt-4">
              <strong>Usage in JSP:</strong>
            </p>
            <pre className="bg-white dark:bg-gray-900 p-4 rounded-lg text-sm">
              {`<mytags:greet name="Swadeep" />`}
            </pre>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <strong>Prototype:</strong> The tag handler class must have a public setter for each attribute. Attributes are defined in TLD with <code>&lt;attribute&gt;</code>.
            </p>
          </div>
        </section>

        {/* Tag with Body Content */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[500ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">📄 Tags with Body Content</h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <p className="mb-4">
              Use <code>getJspBody()</code> to access the tag body. The body can be evaluated multiple times.
            </p>
            <JavaFileLoader
              fileModule={bodyTagJava}
              title="BodyTag.java"
              highlightLines={[]}
            />
            <p className="mt-4">
              <strong>Usage:</strong>
            </p>
            <pre className="bg-white dark:bg-gray-900 p-4 rounded-lg text-sm">
              {`<mytags:repeat count="3">
  Hello from Barrackpore!<br/>
</mytags:repeat>`}
            </pre>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <strong>Purpose:</strong> The body content can be any JSP markup (including other tags), and the tag can invoke it multiple times.
            </p>
          </div>
        </section>

        {/* Tag Lifecycle (for classic tags) */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[600ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">🔄 Tag Lifecycle (Classic vs Simple)</h2>
          <div className="grid gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">SimpleTag (JSP 2.0+)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Simpler: only <code>doTag()</code> method.</li>
                <li>Better performance.</li>
                <li>No need to manage lifecycle flags.</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">Classic Tag (pre‑JSP 2.0)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Implements <code>Tag</code> or <code>BodyTag</code>.</li>
                <li>Lifecycle: <code>doStartTag()</code>, <code>doAfterBody()</code>, <code>doEndTag()</code>.</li>
                <li>Still used in legacy code; prefer SimpleTag for new development.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[700ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">💡 Tips & Tricks</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Use SimpleTagSupport:</strong> It's the recommended base class for new tags.
              </li>
              <li>
                <strong>Keep attributes typed:</strong> The container automatically converts strings to the setter parameter type (e.g., <code>int</code>).
              </li>
              <li>
                <strong>TLD location:</strong> Place TLD files under <code>/WEB-INF</code> or any subdirectory; the container will find them.
              </li>
              <li>
                <strong>Tag reuse:</strong> A single tag handler can be used for multiple tag names by defining multiple <code>&lt;tag&gt;</code> entries pointing to the same class.
              </li>
              <li>
                <strong>Nested tags:</strong> Use <code>getParent()</code> to communicate with the enclosing tag.
              </li>
            </ul>
          </div>
        </section>

        {/* Common Mistakes */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[800ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">⚠️ Common Pitfalls</h2>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Missing setter for attribute:</strong> If you declare an attribute in TLD but no setter, you'll get a runtime error.
              </li>
              <li>
                <strong>Forgetting the TLD:</strong> Without a TLD, the tag is unknown. Make sure the URI in the JSP matches the TLD's <code>&lt;uri&gt;</code>.
              </li>
              <li>
                <strong>Using scriptlets inside tag body:</strong> While allowed, it breaks the tag's reusability. Keep body content clean.
              </li>
              <li>
                <strong>Thread safety:</strong> Tag handlers are reused by the container; do not store request‑specific state in instance variables unless you reset them properly.
              </li>
            </ul>
          </div>
        </section>

        {/* Best Practices */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[900ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">✅ Best Practices</h2>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Name tags clearly:</strong> Use a prefix (e.g., <code>mytags</code>) and meaningful names.
              </li>
              <li>
                <strong>Document attributes:</strong> Add descriptions in the TLD for tool support.
              </li>
              <li>
                <strong>Use JSP 2.0 SimpleTag interface:</strong> Avoid classic tag complexity.
              </li>
              <li>
                <strong>Organize tags in libraries:</strong> Group related tags in a single TLD.
              </li>
              <li>
                <strong>Test tags independently:</strong> Write unit tests for tag handlers to ensure correctness.
              </li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[1000ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">📋 Mini Checklist</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> Tag handler extends <code>SimpleTagSupport</code> (or implements <code>SimpleTag</code>).
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> <code>doTag()</code> method defined.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> TLD file exists with correct <code>&lt;uri&gt;</code> and <code>&lt;tag&gt;</code> definitions.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> Setter methods for all attributes.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> Taglib directive in JSP with correct URI.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> Tag handler class in <code>/WEB-INF/classes</code> or in a JAR under <code>/WEB-INF/lib</code>.
              </li>
            </ul>
          </div>
        </section>

        {/* Teacher's Note */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[1100ms]"
          )}
        >
          <Teacher
            note={`Custom tags are the foundation of reusable UI components in JSP. 
I always tell students: "Think of them as Java methods that you can call with HTML-like syntax." 
A good starting exercise: Create a tag that displays the current date and time (like <mytags:currentDateTime />). 
Then extend it with a format attribute. 
Remember to emphasize that the tag handler should be stateless – any data needed should be passed as attributes.`}
          />
        </section>

        {/* Hint Section */}
        <div
          className={clsx(
            "max-w-4xl mx-auto px-4 pb-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[1200ms]"
          )}
        >
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded hover:shadow-lg transition-all duration-300">
            <p className="font-medium">💭 Think about...</p>
            <p className="mt-2">
              If you create a tag that repeats its body a given number of times (like our <code>&lt;repeat&gt;</code> example), 
              what happens if the body contains other custom tags? Does the container still execute them correctly? 
              How could you pass the current iteration index to those nested tags?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic7;