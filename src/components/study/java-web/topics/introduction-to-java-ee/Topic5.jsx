import React from "react";
import clsx from "clsx";

// Java file loader component
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Raw imports of example Java files (place in ./topic5_files/)
import methodDemo from "./topic5_files/MethodDemoServlet.java?raw";
import statusDemo from "./topic5_files/StatusDemoServlet.java?raw";
import headerDemo from "./topic5_files/HeaderDemoServlet.java?raw";

// ----------------------------------------------------------------------
// Topic 5: HTTP Protocol Basics (Methods, Status Codes, Headers)
// ----------------------------------------------------------------------
// This topic explains the core of HTTP: the request methods, response status
// codes, and headers that form the foundation of web communication.
// ----------------------------------------------------------------------

export default function Topic5() {
  return (
    <div className="dark">
      <main
        className={clsx(
          "min-h-screen bg-gray-50 px-4 py-12 font-sans leading-relaxed text-gray-800",
          "dark:bg-gray-900 dark:text-gray-200",
          "motion-safe:animate-[fadeIn_0.6s_ease-out]"
        )}
      >
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header */}
          <header
            className={clsx(
              "border-l-4 border-blue-600 pl-4",
              "motion-safe:animate-[slideUp_0.5s_ease-out]"
            )}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              HTTP Protocol Basics
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Methods, Status Codes, and Headers – The Language of the Web.
            </p>
          </header>

          {/* Introduction Card */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[100ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              What is HTTP?
            </h2>
            <p className="mb-3">
              The Hypertext Transfer Protocol (HTTP) is the foundation of data
              communication on the World Wide Web. It is a stateless request‑response
              protocol: a client (usually a browser) sends a request to a server,
              and the server returns a response.
            </p>
            <p>
              Each HTTP message consists of a start line (request line or status line),
              headers (metadata), and an optional body. Understanding HTTP is essential
              for any web developer, as it dictates how clients and servers interact.
            </p>
          </section>

          {/* HTTP Methods Section */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[200ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              HTTP Request Methods
            </h2>
            <p className="mb-3">
              The HTTP method (or verb) indicates the desired action to be performed
              on the identified resource. The most common methods are:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-3 dark:bg-blue-900/20">
                <h3 className="font-bold text-blue-800 dark:text-blue-300">GET</h3>
                <p className="text-sm">
                  Retrieve data from the server. Should be safe (no side effects) and
                  idempotent. Used for fetching pages, images, API data.
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-green-600 bg-green-50 p-3 dark:bg-green-900/20">
                <h3 className="font-bold text-green-800 dark:text-green-300">POST</h3>
                <p className="text-sm">
                  Submit data to the server, often creating a new resource. Not idempotent
                  – multiple requests may create multiple resources.
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-yellow-600 bg-yellow-50 p-3 dark:bg-yellow-900/20">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-300">PUT</h3>
                <p className="text-sm">
                  Update an existing resource (or create if it doesn’t exist). Idempotent
                  – multiple identical requests have the same effect.
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-red-600 bg-red-50 p-3 dark:bg-red-900/20">
                <h3 className="font-bold text-red-800 dark:text-red-300">DELETE</h3>
                <p className="text-sm">
                  Remove a resource. Idempotent – after the first deletion, subsequent
                  calls return the same (e.g., 404).
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-purple-600 bg-purple-50 p-3 dark:bg-purple-900/20">
                <h3 className="font-bold text-purple-800 dark:text-purple-300">HEAD</h3>
                <p className="text-sm">
                  Like GET but returns only headers, no body. Useful for checking
                  resource existence or metadata.
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-indigo-600 bg-indigo-50 p-3 dark:bg-indigo-900/20">
                <h3 className="font-bold text-indigo-800 dark:text-indigo-300">OPTIONS</h3>
                <p className="text-sm">
                  Ask the server which methods are supported for a given resource.
                  Used in CORS preflight requests.
                </p>
              </div>
            </div>
          </section>

          {/* Status Codes Section */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[300ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              HTTP Status Codes
            </h2>
            <p className="mb-3">
              After receiving and processing a request, the server responds with a
              status code indicating the result. Codes are grouped into five classes:
            </p>
            <div className="grid gap-3 sm:grid-cols-5">
              <div className="rounded bg-gray-100 p-2 text-center dark:bg-gray-700">
                <span className="font-bold text-gray-800 dark:text-gray-200">1xx</span>
                <p className="text-xs">Informational</p>
              </div>
              <div className="rounded bg-green-100 p-2 text-center dark:bg-green-900/30">
                <span className="font-bold text-green-800 dark:text-green-300">2xx</span>
                <p className="text-xs">Success</p>
              </div>
              <div className="rounded bg-yellow-100 p-2 text-center dark:bg-yellow-900/30">
                <span className="font-bold text-yellow-800 dark:text-yellow-300">3xx</span>
                <p className="text-xs">Redirection</p>
              </div>
              <div className="rounded bg-red-100 p-2 text-center dark:bg-red-900/30">
                <span className="font-bold text-red-800 dark:text-red-300">4xx</span>
                <p className="text-xs">Client Error</p>
              </div>
              <div className="rounded bg-orange-100 p-2 text-center dark:bg-orange-900/30">
                <span className="font-bold text-orange-800 dark:text-orange-300">5xx</span>
                <p className="text-xs">Server Error</p>
              </div>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold">Common 2xx Success</h3>
                <ul className="list-inside list-disc text-sm">
                  <li><code>200 OK</code> – Standard success for GET, PUT, etc.</li>
                  <li><code>201 Created</code> – Resource created (POST).</li>
                  <li><code>204 No Content</code> – Success, no body (e.g., DELETE).</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Common 4xx Client Error</h3>
                <ul className="list-inside list-disc text-sm">
                  <li><code>400 Bad Request</code> – Malformed syntax.</li>
                  <li><code>401 Unauthorized</code> – Authentication required.</li>
                  <li><code>403 Forbidden</code> – Authenticated but not allowed.</li>
                  <li><code>404 Not Found</code> – Resource doesn’t exist.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Common 3xx Redirection</h3>
                <ul className="list-inside list-disc text-sm">
                  <li><code>301 Moved Permanently</code> – New URL.</li>
                  <li><code>302 Found</code> – Temporary redirect.</li>
                  <li><code>304 Not Modified</code> – Use cached version.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Common 5xx Server Error</h3>
                <ul className="list-inside list-disc text-sm">
                  <li><code>500 Internal Server Error</code> – Generic server error.</li>
                  <li><code>502 Bad Gateway</code> – Invalid response from upstream.</li>
                  <li><code>503 Service Unavailable</code> – Temporarily overloaded.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Headers Section */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[400ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              HTTP Headers
            </h2>
            <p className="mb-3">
              Headers provide additional information about the request or response.
              They are key‑value pairs sent after the start line.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300">Common Request Headers</h3>
                <ul className="list-inside list-disc text-sm">
                  <li><code>Host</code> – Domain name of the server.</li>
                  <li><code>User-Agent</code> – Client software (browser, curl).</li>
                  <li><code>Accept</code> – Media types the client can handle (e.g., <code>application/json</code>).</li>
                  <li><code>Content-Type</code> – Media type of the request body (e.g., <code>application/x-www-form-urlencoded</code>).</li>
                  <li><code>Authorization</code> – Credentials for authentication.</li>
                  <li><code>Cookie</code> – Previously stored cookies.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-300">Common Response Headers</h3>
                <ul className="list-inside list-disc text-sm">
                  <li><code>Content-Type</code> – Media type of the response body.</li>
                  <li><code>Content-Length</code> – Size of the response body in bytes.</li>
                  <li><code>Set-Cookie</code> – Instructs the client to store a cookie.</li>
                  <li><code>Cache-Control</code> – Caching directives.</li>
                  <li><code>Location</code> – Used in redirects (3xx) to specify new URL.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Java Code Examples */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[500ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Handling HTTP in Servlets
            </h2>
            <p className="mb-4">
              The following examples show how to work with methods, status codes, and
              headers in Java Servlets.
            </p>

            {/* Example 1: Method handling */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={methodDemo}
                title="MethodDemoServlet.java"
                highlightLines={[8, 22]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A servlet that responds differently based on the HTTP method.
              </p>
            </div>

            {/* Example 2: Setting status codes */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={statusDemo}
                title="StatusDemoServlet.java"
                highlightLines={[8, 22]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Demonstrates setting different status codes and sending custom error pages.
              </p>
            </div>

            {/* Example 3: Reading and setting headers */}
            <div className="mb-6">
              <JavaFileLoader
                fileModule={headerDemo}
                title="HeaderDemoServlet.java"
                highlightLines={[12, 30]}
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Shows how to read request headers and set response headers.
              </p>
            </div>
          </section>

          {/* Real-World Context */}
          <section
            className={clsx(
              "rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[600ms]"
            )}
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Real‑World Context
            </h2>
            <p className="mb-3">
              Every time you browse the web, HTTP is at work. When Swadeep visits
              a college website in Barrackpore, his browser sends a GET request.
              The server responds with a 200 OK and the HTML page. If he submits a
              form, it's a POST request. If a page has moved, the server might
              return 301 with a Location header to redirect.
            </p>
            <p>
              RESTful APIs rely heavily on proper HTTP method and status code usage.
              A well‑designed API uses 201 for creation, 204 for deletion, and 404
              for missing resources. Headers like <code>Authorization</code> carry
              tokens, and <code>Content-Type</code> tells the client how to parse
              the response.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section
            className={clsx(
              "rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20",
              "border border-blue-200 dark:border-blue-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[700ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              💡 Tips & Tricks
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Use browser DevTools:</span> The Network tab
                shows all HTTP requests/responses – headers, status, timing. Great for
                debugging.
              </li>
              <li>
                <span className="font-medium">Learn curl:</span> <code>curl -v</code> shows
                the full HTTP exchange. It's invaluable for testing APIs.
              </li>
              <li>
                <span className="font-medium">Understand idempotency:</span> GET, PUT,
                DELETE are idempotent; POST is not. This affects how you handle retries.
              </li>
              <li>
                <span className="font-medium">Use correct status codes:</span> Don't just
                return 200 for everything. Use 201 for creation, 400 for bad input, etc.
                This helps clients understand what happened.
              </li>
            </ul>
          </section>

          {/* Common Mistakes */}
          <section
            className={clsx(
              "rounded-lg bg-red-50 p-6 dark:bg-red-900/20",
              "border border-red-200 dark:border-red-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[800ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              ⚠️ Common Mistakes Beginners Make
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Using GET for state changes:</span> GET
                should be safe. Using it to delete an item can cause accidental
                deletions (e.g., web crawlers).
              </li>
              <li>
                <span className="font-medium">Ignoring status codes:</span> Writing
                client code that only checks for 200 and fails on others.
              </li>
              <li>
                <span className="font-medium">Misusing redirects:</span> Using 302 when
                301 is more appropriate, or forgetting the Location header.
              </li>
              <li>
                <span className="font-medium">Not setting Content-Type:</span> The
                client may not know how to interpret the response.
              </li>
              <li>
                <span className="font-medium">Assuming all clients send same headers:</span>{" "}
                Always check for null or missing headers.
              </li>
            </ul>
          </section>

          {/* Best Practices */}
          <section
            className={clsx(
              "rounded-lg bg-green-50 p-6 dark:bg-green-900/20",
              "border border-green-200 dark:border-green-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[900ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              ✅ Best Practices
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <span className="font-medium">Follow REST conventions:</span> Use GET for
                retrieval, POST for creation, PUT for update, DELETE for removal.
              </li>
              <li>
                <span className="font-medium">Return appropriate status codes:</span> Be
                precise. A validation error should be 400, not 500.
              </li>
              <li>
                <span className="font-medium">Set security headers:</span> Use
                <code>X-Content-Type-Options: nosniff</code>, <code>X-Frame-Options</code>,
                etc., to improve security.
              </li>
              <li>
                <span className="font-medium">Use standard header names:</span> Follow
                IANA specifications. Custom headers can be prefixed with <code>X-</code>
                (though this is now discouraged; use a consistent prefix).
              </li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section
            className={clsx(
              "rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20",
              "border border-yellow-200 dark:border-yellow-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[1000ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              📋 Mini Checklist – What to Remember
            </h2>
            <ul className="list-inside list-disc space-y-2">
              <li>☐ HTTP methods: GET (safe), POST (create), PUT (update), DELETE (remove).</li>
              <li>☐ Status codes: 2xx success, 3xx redirection, 4xx client error, 5xx server error.</li>
              <li>☐ Headers carry metadata (Content-Type, Authorization, etc.).</li>
              <li>☐ Servlets provide methods like <code>getMethod()</code>, <code>setStatus()</code>, and header access.</li>
              <li>☐ Always set correct Content-Type.</li>
              <li>☐ Use browser DevTools or curl to inspect HTTP traffic.</li>
            </ul>
          </section>

          {/* Hint Section */}
          <section
            className={clsx(
              "rounded-lg bg-indigo-50 p-6 dark:bg-indigo-900/20",
              "border border-indigo-200 dark:border-indigo-800",
              "transition-all duration-300 hover:shadow-lg",
              "motion-safe:animate-[slideUp_0.5s_ease-out] motion-safe:animation-delay-[1100ms]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              🤔 Think About…
            </h2>
            <p className="mb-2">
              <span className="font-medium">Observe carefully:</span> Why is GET
              considered "safe" and "idempotent"? What could go wrong if a bank's
              transfer API used GET instead of POST?
            </p>
            <p>
              <span className="font-medium">Try changing this:</span> In the
              MethodDemoServlet, what happens if you send a PUT request to a servlet
              that only implements doGet()? (Hint: check the HTTP spec for allowed
              methods and the default servlet behavior.)
            </p>
          </section>

          {/* Teacher’s Note */}
          <section
            className={clsx(
              "rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20",
              "border border-purple-200 dark:border-purple-800",
              "transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
            )}
          >
            <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              👨‍🏫 Teacher’s Note – Sukanta Hui
            </h2>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex-1">
                <p className="mb-2">
                  <span className="font-bold">Sukanta Hui</span> (27 years of experience
                  in Programming, RDBMS, OS, and Web Development)
                </p>
                <p className="mb-2">
                  📧{" "}
                  <a
                    href="mailto:sukantahui@codernaccotax.co.in"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    sukantahui@codernaccotax.co.in
                  </a>
                </p>
                <p>📞 7003756860</p>
              </div>
              <div className="flex-1">
                <p className="italic">
                  “HTTP is the language your applications speak. I've seen too many
                  developers treat it as a black box. But understanding the details –
                  like why a 304 status saves bandwidth, or how to properly use cache
                  headers – separates a good developer from a great one. When Abhronila
                  was debugging a login issue, it turned out she wasn't sending the
                  session cookie because she forgot to check the <code>Set-Cookie</code>
                  header. Always inspect the raw HTTP – it never lies.”
                </p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Remember:</span> HTTP is your friend,
                  not your enemy. Learn its nuances.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Inline keyframes for animations (zero‑config) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animation-delay-\\[100ms\\] { animation-delay: 100ms; }
        .animation-delay-\\[200ms\\] { animation-delay: 200ms; }
        .animation-delay-\\[300ms\\] { animation-delay: 300ms; }
        .animation-delay-\\[400ms\\] { animation-delay: 400ms; }
        .animation-delay-\\[500ms\\] { animation-delay: 500ms; }
        .animation-delay-\\[600ms\\] { animation-delay: 600ms; }
        .animation-delay-\\[700ms\\] { animation-delay: 700ms; }
        .animation-delay-\\[800ms\\] { animation-delay: 800ms; }
        .animation-delay-\\[900ms\\] { animation-delay: 900ms; }
        .animation-delay-\\[1000ms\\] { animation-delay: 1000ms; }
        .animation-delay-\\[1100ms\\] { animation-delay: 1100ms; }

        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[fadeIn_0\\.6s_ease-out\\],
          .motion-safe\\:animate-\\[slideUp_0\\.5s_ease-out\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}