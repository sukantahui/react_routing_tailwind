// Topic15.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files (raw imports)
import HelloWorldResource from "./topic15_files/HelloWorldResource.java?raw";
import UserResource from "./topic15_files/UserResource.java?raw";
import ApplicationConfig from "./topic15_files/ApplicationConfig.java?raw";
import PathParamExample from "./topic15_files/PathParamExample.java?raw";
import FormParamExample from "./topic15_files/FormParamExample.java?raw";
import WebXmlJersey from "./topic15_files/web.xml?raw";

// FAQ questions for this topic
import questions from "./topic15_files/topic15_questions";

const Topic15 = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="dark min-h-screen bg-gray-950 text-gray-100 font-sans leading-relaxed p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            RESTful Web Services with JAX-RS (Jersey)
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Building REST APIs using Java API for RESTful Web Services – annotations, resources, HTTP methods, and JSON support.
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
        >
          <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2">
            <span>🌐</span> What is JAX‑RS and Jersey?
          </h2>
          <p className="mt-3 text-gray-300">
            <strong>JAX‑RS</strong> (Java API for RESTful Web Services) is a Java specification for building RESTful web services using annotations. <strong>Jersey</strong> is the reference implementation (also the most popular). It allows you to create REST APIs with POJOs and minimal configuration.
          </p>
          <p className="mt-3 text-gray-300">
            Key annotations: <code>@Path</code>, <code>@GET</code>, <code>@POST</code>, <code>@PUT</code>, <code>@DELETE</code>, <code>@PathParam</code>, <code>@QueryParam</code>, <code>@Produces</code>, <code>@Consumes</code>.
          </p>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-purple-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>Real‑world context:</strong> The Barrackpore High School wants a mobile app to fetch student grades. Instead of JSPs returning HTML, they create a REST API (Jersey) that returns JSON. The mobile app then displays the data. This decouples backend from frontend.
            </p>
          </div>
        </section>

        {/* SVG: REST Overview */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">🔄 REST API Request Flow</h2>
          <div className="mt-6 flex justify-center">
            <svg viewBox="0 0 750 180" className="w-full max-w-4xl h-auto">
              <rect x="20" y="30" width="120" height="50" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
              <text x="80" y="55" textAnchor="middle" fill="#d8b4fe" fontSize="13">Client</text>
              <text x="80" y="72" textAnchor="middle" fill="#9ca3af" fontSize="10">(React/Postman)</text>

              <rect x="190" y="30" width="160" height="50" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="270" y="50" textAnchor="middle" fill="#d8b4fe" fontSize="13">Jersey Servlet</text>
              <text x="270" y="67" textAnchor="middle" fill="#9ca3af" fontSize="10">/api/*</text>

              <rect x="400" y="30" width="160" height="50" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              <text x="480" y="50" textAnchor="middle" fill="#d8b4fe" fontSize="13">Resource Class</text>
              <text x="480" y="67" textAnchor="middle" fill="#9ca3af" fontSize="10">@Path("/users")</text>

              <rect x="610" y="30" width="110" height="50" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="665" y="55" textAnchor="middle" fill="#86efac" fontSize="13">JSON Response</text>

              <line x1="140" y1="55" x2="188" y2="55" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrRest)" />
              <line x1="350" y1="55" x2="398" y2="55" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrRest)" />
              <line x1="560" y1="55" x2="608" y2="55" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrRest)" />

              <defs>
                <marker id="arrRest" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#a855f7" />
                </marker>
              </defs>
              <text x="270" y="115" textAnchor="middle" fill="#9ca3af" fontSize="11">HTTP Request (GET /api/users)</text>
              <text x="480" y="115" textAnchor="middle" fill="#9ca3af" fontSize="11">Method returns Java Object</text>
              <text x="665" y="115" textAnchor="middle" fill="#9ca3af" fontSize="11">JSON/XML</text>
            </svg>
          </div>
        </section>

        {/* 1. Basic Resource */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">🏷️ Hello World Resource</h2>
          <p className="mt-3 text-gray-300">
            A resource class is a plain Java class annotated with <code>@Path</code>. Methods use HTTP method annotations.
          </p>
          <JavaFileLoader
            fileModule={HelloWorldResource}
            title="HelloWorldResource.java – Basic REST Endpoint"
            highlightLines={[4, 8, 10]}
          />
          <div className="mt-4 p-3 bg-purple-950/30 border-l-4 border-purple-500 rounded">
            <p className="text-sm">💡 <strong>Tip:</strong> Use <code>@Produces(MediaType.TEXT_PLAIN)</code> to specify response content type.</p>
          </div>
        </section>

        {/* 2. Full CRUD Resource */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-purple-400">📋 User Resource – CRUD Example</h2>
          <p className="mt-3 text-gray-300">Example of a REST resource handling users with in‑memory store.</p>
          <JavaFileLoader
            fileModule={UserResource}
            title="UserResource.java – GET, POST, PUT, DELETE"
            highlightLines={[4, 8, 12, 16, 20]}
          />
        </section>

        {/* 3. Application Configuration */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-purple-400">⚙️ Registering Resources – ApplicationConfig</h2>
          <p className="mt-3 text-gray-300">
            Extend <code>Application</code> or use <code>ResourceConfig</code> to register resource classes. Optionally configure package scanning.
          </p>
          <JavaFileLoader
            fileModule={ApplicationConfig}
            title="ApplicationConfig.java – Jersey Application"
            highlightLines={[5, 6]}
          />
          <div className="mt-3 p-3 bg-gray-800 rounded-lg">
            <p className="text-sm font-mono">Or in web.xml: map Jersey servlet to <code>/api/*</code>.</p>
          </div>
        </section>

        {/* 4. Path Parameters and Query Parameters */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-purple-400">🔍 @PathParam & @QueryParam</h2>
          <p className="mt-3 text-gray-300">Extract variables from URL path or query string.</p>
          <JavaFileLoader
            fileModule={PathParamExample}
            title="PathParamExample.java – Path and Query Parameters"
            highlightLines={[8, 12, 16]}
          />
        </section>

        {/* 5. Handling Form Data (POST) */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-purple-400">📝 @FormParam for Form Submissions</h2>
          <p className="mt-3 text-gray-300">Handle <code>application/x-www-form-urlencoded</code> data.</p>
          <JavaFileLoader
            fileModule={FormParamExample}
            title="FormParamExample.java – POST Form Data"
            highlightLines={[7, 8, 9]}
          />
        </section>

        {/* 6. JSON Support (Jackson) */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-purple-400">📦 JSON Support with Jackson</h2>
          <p className="mt-3 text-gray-300">
            Add Jackson (or MOXy) dependency to automatically convert Java objects to/from JSON. Jersey will detect the library.
          </p>
          <div className="mt-3 p-3 bg-gray-800 rounded-lg font-mono text-sm">
            // Maven dependency<br/>
            &lt;dependency&gt;<br/>
            &nbsp;&nbsp;&lt;groupId&gt;org.glassfish.jersey.media&lt;/groupId&gt;<br/>
            &nbsp;&nbsp;&lt;artifactId&gt;jersey-media-json-jackson&lt;/artifactId&gt;<br/>
            &lt;/dependency&gt;
          </div>
          <p className="mt-2 text-gray-300">Then just return POJOs as <code>@Produces(MediaType.APPLICATION_JSON)</code>.</p>
        </section>

        {/* 7. web.xml configuration (alternative) */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-purple-400">📄 web.xml Jersey Servlet Mapping</h2>
          <JavaFileLoader
            fileModule={WebXmlJersey}
            title="web.xml – Jersey Servlet Configuration"
            highlightLines={[6, 7, 8, 12]}
          />
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">⚠️ Common Pitfalls</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li><strong>Forgetting to register resources</strong> – either in ApplicationConfig or via package scanning.</li>
            <li><strong>Not adding Jackson dependency</strong> – results in 500 error or no JSON support.</li>
            <li><strong>Mixing @PathParam and @QueryParam incorrectly</strong> – ensure path matches.</li>
            <li><strong>Returning non‑serializable objects</strong> – Jersey will fail to marshal to JSON.</li>
            <li><strong>Not setting @Consumes/@Produces</strong> – can lead to content negotiation issues.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">✅ Best Practices</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Use nouns for resource names (e.g., <code>/students</code>, not <code>/getStudent</code>).</li>
            <li>Use appropriate HTTP status codes via <code>Response</code> class.</li>
            <li>Prefer <code>@Produces(MediaType.APPLICATION_JSON)</code> for modern APIs.</li>
            <li>Validate input using Bean Validation (JSR 303).</li>
            <li>Separate resource classes logically (e.g., UserResource, ProductResource).</li>
            <li>Document your API with OpenAPI/Swagger annotations.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ Add Jersey dependencies (jersey-container-servlet, jersey-media-json-jackson)",
              "✅ Create resource class with @Path",
              "✅ Annotate methods with @GET, @POST, etc.",
              "✅ Use @Produces and @Consumes",
              "✅ Register resources via Application subclass or web.xml",
              "✅ Test with Postman or curl",
              "✅ Return Response objects for status codes",
              "✅ Use path/query parameters correctly",
              "✅ Handle exceptions with ExceptionMapper",
              "✅ Document endpoints"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-purple-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-purple-500/30"
        >
          <h2 className="text-xl font-semibold text-purple-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> Use browser or Postman to call your API and inspect the JSON response.</li>
            <li>⚙️ <strong>Try changing:</strong> Return a different HTTP status like 201 Created for POST.</li>
            <li>📂 <strong>Think about:</strong> How would you secure a JAX‑RS resource? (Container security or filters).</li>
            <li>🧩 <strong>Debug:</strong> 404 error – check if the servlet mapping matches your @Path and your web.xml or annotation config.</li>
          </ul>
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="JAX‑RS (Jersey) FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Introduce JAX‑RS as the modern alternative to servlets for building APIs. Show how a single resource class replaces multiple servlets. Emphasise HTTP methods and status codes. Hands‑on: create a simple 'book' resource with in‑memory list, test with Postman. Then add JSON and see how Jersey serialises automatically. This is a perfect stepping stone to Spring Boot REST controllers." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 15: RESTful Web Services with JAX‑RS (Jersey) – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic15;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>