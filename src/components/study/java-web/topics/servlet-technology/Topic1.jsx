import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ==================== Java Code Samples (topic1_files) ====================
// In a real project we would import ?raw, but here we embed as strings for standalone demonstration.

const requestResponseServlet = `import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class RequestResponseDemoServlet extends HttpServlet {
    
    // Handle GET requests (form display, links, direct URL)
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>GET request received</h1>");
        out.println("<p>Query string: " + request.getQueryString() + "</p>");
        out.println("<p>User-Agent: " + request.getHeader("User-Agent") + "</p>");
        out.println("</body></html>");
    }
    
    // Handle POST requests (form submission, file upload)
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Read form parameters
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>POST request processed</h1>");
        out.println("<p>Welcome, " + username + "!</p>");
        out.println("</body></html>");
    }
    
    // Access request headers, method, remote address, etc.
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Not implemented by default – send error
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
}`;

const responseHeadersExample = `// Setting response headers in a servlet
response.setContentType("application/json");
response.setCharacterEncoding("UTF-8");
response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
response.setHeader("Pragma", "no-cache");
response.setDateHeader("Expires", 0);
// For file download:
response.setHeader("Content-Disposition", "attachment; filename=\\"report.pdf\\"");`;

const requestUriExample = `// Extracting information from request URI
// Assume request URL: http://localhost:8080/schoolapp/student/profile?id=101
String scheme = request.getScheme();           // http
String serverName = request.getServerName();   // localhost
int port = request.getServerPort();            // 8080
String contextPath = request.getContextPath(); // /schoolapp
String servletPath = request.getServletPath(); // /student
String pathInfo = request.getPathInfo();       // /profile
String queryString = request.getQueryString(); // id=101
String requestURI = request.getRequestURI();   // /schoolapp/student/profile
StringBuffer requestURL = request.getRequestURL(); // http://localhost:8080/schoolapp/student/profile`;

const redirectVsForward = `// 1. sendRedirect (client-side redirect)
response.sendRedirect("https://www.example.com/login");
// Browser receives 302 + Location header, makes new request.
// Not visible to server beyond original request.

// 2. RequestDispatcher forward (server-side forward)
RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/result.jsp");
dispatcher.forward(request, response);
// URL stays same, request object carries over.`;

// ==================== FAQ Questions (30 moderate-expert) ====================
const questions = [
  {
    question: "What is the difference between doGet() and doPost()?",
    shortAnswer: "doGet() appends parameters to URL (visible, limited length); doPost() sends data in request body (hidden, larger).",
    explanation: "GET is idempotent and cacheable, used for searches, navigation. POST is used for form submission, file uploads, changes on server.",
    hint: "Use POST when you need to send passwords or large data.",
    level: "basic",
    codeExample: "protected void doPost(HttpServletRequest req, HttpServletResponse resp) { }"
  },
  {
    question: "How to read query parameters from a GET request?",
    shortAnswer: "Use request.getParameter(\"paramName\").",
    explanation: "Returns String value or null if not present. For multiple values (checkboxes), use getParameterValues().",
    hint: "Avoid accessing parameters directly; validate and sanitize.",
    level: "basic",
    codeExample: "String id = request.getParameter(\"studentId\");"
  },
  {
    question: "What is the difference between getParameter() and getAttribute()?",
    shortAnswer: "getParameter() reads client-submitted form/query data; getAttribute() retrieves server-side objects set via setAttribute().",
    explanation: "Parameters are always Strings from request. Attributes can be any Object and are used for internal communication (forward, include).",
    hint: "Attributes survive a forward, parameters come from client.",
    level: "intermediate"
  },
  {
    question: "What does response.setContentType() do?",
    shortAnswer: "Tells the browser the MIME type of the response (e.g., text/html, application/json).",
    explanation: "Without it, browser may misinterpret data. Must be called before getWriter() or getOutputStream().",
    hint: "Always set content type for non-HTML responses.",
    level: "basic",
    codeExample: "response.setContentType(\"application/pdf\");"
  },
  {
    question: "Explain the role of HttpServletRequest object.",
    shortAnswer: "Provides methods to access request line, headers, body, client info, session, and attributes.",
    explanation: "Container creates one HttpServletRequest per request, passes to service/doXXX methods. It's the gateway for all incoming data.",
    hint: "Use it to read cookies, parameters, session, remote address.",
    level: "basic"
  },
  {
    question: "How can you get the client's IP address?",
    shortAnswer: "request.getRemoteAddr().",
    explanation: "Returns IP address of the client or last proxy. For proxies, check X-Forwarded-For header if behind load balancer.",
    hint: "For accurate IP, configure your proxy to forward header.",
    level: "intermediate",
    codeExample: "String clientIP = request.getHeader(\"X-Forwarded-For\"); if (clientIP == null) clientIP = request.getRemoteAddr();"
  },
  {
    question: "What is the difference between sendRedirect() and forward()?",
    shortAnswer: "sendRedirect() sends 302 to client, new request; forward() transfers control internally on server.",
    explanation: "Forward keeps original request/response objects and URL. Redirect creates new request, losing previous attributes unless passed as parameters.",
    hint: "Use forward for internal navigation, redirect after POST to avoid duplicate submission.",
    level: "intermediate"
  },
  {
    question: "Can I send both text and binary data in same response?",
    shortAnswer: "No, you must use either getWriter() (text) or getOutputStream() (binary), not both.",
    explanation: "Calling both causes IllegalStateException. Choose based on content type: Writer for characters, OutputStream for bytes.",
    hint: "For file download, use getOutputStream().",
    level: "expert"
  },
  {
    question: "What is the maximum size of a GET request URL?",
    shortAnswer: "Depends on browser and server (typically 2KB–8KB).",
    explanation: "Older browsers limit to 255; most modern allow up to 2000 characters. POST has no such limit (configured server-side).",
    hint: "Never send large data or passwords via GET.",
    level: "intermediate"
  },
  {
    question: "How to read HTTP headers in servlet?",
    shortAnswer: "request.getHeader(name) for single, request.getHeaders(name) for multiple, request.getHeaderNames() to enumerate.",
    explanation: "Headers like User-Agent, Referer, Accept-Language provide client context.",
    hint: "Log important headers for debugging.",
    level: "basic",
    codeExample: "String userAgent = request.getHeader(\"User-Agent\");"
  },
  {
    question: "What is the purpose of HttpServletResponse.sendError()?",
    shortAnswer: "Sends an error status code (e.g., 404, 500) with an optional message.",
    explanation: "Container generates default error page unless custom error page configured. Stops further response writing.",
    hint: "Use sendError or setStatus() for non-error codes.",
    level: "intermediate",
    codeExample: "response.sendError(HttpServletResponse.SC_NOT_FOUND, \"Student not found\");"
  },
  {
    question: "How to prevent caching of a response?",
    shortAnswer: "Set Cache-Control headers: no-cache, no-store, must-revalidate.",
    explanation: "Ensures sensitive data isn't stored in browser cache. Important for banking, personal info.",
    hint: "Set headers before writing response body.",
    level: "intermediate",
    codeExample: "response.setHeader(\"Cache-Control\", \"no-cache, no-store, must-revalidate\");"
  },
  {
    question: "What is a RequestDispatcher and how to obtain it?",
    shortAnswer: "Interface to forward/include requests; obtained via request.getRequestDispatcher(path) or ServletContext.getRequestDispatcher(path).",
    explanation: "Dispatchers relative to current servlet or absolute from context root. Used in MVC pattern.",
    hint: "Forward to JSP for presentation.",
    level: "basic"
  },
  {
    question: "Can we read the request body multiple times?",
    shortAnswer: "By default, no. Input stream can be read only once.",
    explanation: "Once getReader() or getInputStream() is called, subsequent calls throw IllegalStateException. To read multiple times, wrap request with a wrapper that caches body.",
    hint: "Search for 'HttpServletRequestWrapper' pattern.",
    level: "expert"
  },
  {
    question: "What is the difference between getInputStream() and getReader()?",
    shortAnswer: "getInputStream() returns ServletInputStream for binary data; getReader() returns BufferedReader for character data.",
    explanation: "Choose based on content type: binary (file upload) vs text (form URL-encoded). Cannot use both.",
    hint: "For multipart forms, use HttpServletRequest.getPart() (Servlet 3.0+).",
    level: "intermediate"
  },
  {
    question: "What is a MIME type and why is it important?",
    shortAnswer: "MIME type indicates the nature/format of response (text/html, image/png, application/json).",
    explanation: "Browser uses MIME to decide how to display (render HTML, download PDF). Setting incorrect type may cause download instead of rendering.",
    hint: "Use standard MIME types from IANA list.",
    level: "basic"
  },
  {
    question: "How to handle file upload using HttpServletRequest?",
    shortAnswer: "Servlet 3.0 introduced getPart() and getParts() for multipart/form-data.",
    explanation: "Requires @MultipartConfig annotation. Iterate over parts to read filename and content. Older approach used external libraries.",
    hint: "Covered in depth later (Topic6).",
    level: "expert"
  },
  {
    question: "What is the query string and how to parse it manually?",
    shortAnswer: "Part of URL after '?', containing key=value pairs separated by '&'.",
    explanation: "Servlet automatically parses into parameters. For GET, query string is available via request.getQueryString().",
    hint: "Avoid manual parsing; use getParameter.",
    level: "basic"
  },
  {
    question: "Explain the lifecycle of HttpServletRequest object.",
    shortAnswer: "Created per request by container, available during service/doXXX methods, then eligible for GC after response committed.",
    explanation: "Do not store request objects in session or shared fields; they are request-scoped.",
    hint: "Use request attributes for forward-only data.",
    level: "intermediate"
  },
  {
    question: "What is the difference between addHeader() and setHeader()?",
    shortAnswer: "setHeader() replaces existing header; addHeader() adds an additional header (multiple values allowed).",
    explanation: "Most headers are single-valued. Use addHeader for Set-Cookie or custom multi-value headers.",
    hint: "Check javadoc for each header's cardinality.",
    level: "expert"
  },
  {
    question: "How to set status code 204 (No Content)?",
    shortAnswer: "response.setStatus(HttpServletResponse.SC_NO_CONTENT).",
    explanation: "Indicates successful request but no body to return. Useful for DELETE or PUT operations.",
    hint: "Do not write any body after setting status.",
    level: "intermediate"
  },
  {
    question: "What is the default content type for servlet response?",
    shortAnswer: "None (null). Container may guess but explicit setting is required for proper rendering.",
    explanation: "Without content-type, browser may treat as plain text or auto-detect. Best practice: always set.",
    hint: "response.setContentType(\"text/html;charset=UTF-8\") covers charset too.",
    level: "basic"
  },
  {
    question: "How to redirect to a relative URL?",
    shortAnswer: "Use response.sendRedirect(\"relativePath\") – container resolves relative to current request's path.",
    explanation: "Absolute paths (starting with '/') are relative to context root. Non-slash paths relative to current servlet mapping.",
    hint: "Use absolute path to avoid confusion: sendRedirect(request.getContextPath() + \"/home\").",
    level: "intermediate"
  },
  {
    question: "What is the difference between getRequestURI() and getRequestURL()?",
    shortAnswer: "getRequestURI() returns String (path after host and port). getRequestURL() returns StringBuffer with full URL.",
    explanation: "URL includes scheme, server, port; URI excludes them. Both exclude query string.",
    hint: "Use URL for absolute links, URI for pattern matching.",
    level: "basic",
    codeExample: "String uri = request.getRequestURI(); // /app/servlet"
  },
  {
    question: "How to stream large binary response efficiently?",
    shortAnswer: "Use response.getOutputStream() and write in chunks. Set appropriate buffer size (response.setBufferSize()).",
    explanation: "Avoid loading entire file into memory. Use FileInputStream and copy using buffer.",
    hint: "Set Content-Length header for progress indication.",
    level: "expert"
  },
  {
    question: "What are the common HTTP methods supported by HttpServlet?",
    shortAnswer: "GET, POST, HEAD, PUT, DELETE, TRACE, OPTIONS.",
    explanation: "Default implementations of PUT, DELETE, etc., return SC_METHOD_NOT_ALLOWED. Override to support REST.",
    hint: "Use POST for create, PUT for full update, DELETE for delete.",
    level: "intermediate"
  },
  {
    question: "How to get the protocol (HTTP/1.1, HTTP/2) from request?",
    shortAnswer: "request.getProtocol().",
    explanation: "Returns string like \"HTTP/1.1\". Useful for feature detection.",
    hint: "HTTP/2 is transparent to servlet in most containers.",
    level: "basic"
  },
  {
    question: "What happens if you call getWriter() after getOutputStream()?",
    shortAnswer: "IllegalStateException is thrown.",
    explanation: "Response can only use one output type. Once committed, cannot switch.",
    hint: "Design method to clearly choose text or binary.",
    level: "expert"
  },
  {
    question: "Explain the concept of response buffering.",
    shortAnswer: "Container buffers output before sending to client. Buffer size can be set via response.setBufferSize().",
    explanation: "Buffering allows setting headers after writing content up to buffer size. flushBuffer() forces send.",
    hint: "Buffering improves performance by reducing network packets.",
    level: "intermediate"
  },
  {
    question: "How to make a servlet handle both GET and POST with same logic?",
    shortAnswer: "Implement doGet() and call doPost() from it (or vice versa).",
    explanation: "Or override service() method to handle both. However, careful with idempotency – POST should not be idempotent.",
    hint: "Better to keep separate if logic differs.",
    level: "basic",
    codeExample: "protected void doGet(...) { doPost(request, response); }"
  }
];

// ==================== Main Component ====================
export default function Topic1() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.5s ease-out forwards;
        }
        .hover-glow:hover {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
          transform: scale(1.02);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-5 py-10 space-y-12">
        {/* HEADER */}
        <div className="text-center animate-fadeSlideUp">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-700 to-cyan-600 dark:from-teal-400 dark:to-cyan-300 bg-clip-text text-transparent">
            HTTP Request & Response in Servlets
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Master the communication between client and server — read incoming data and craft perfect responses.
          </p>
        </div>

        {/* THEORY */}
        <section className="space-y-6 animate-fadeSlideUp" style={{ animationDelay: "0.1s" }}>
          <div className="border-l-4 border-teal-500 pl-5 bg-gray-50 dark:bg-gray-800/50 rounded-r-2xl py-3">
            <h2 className="text-2xl font-semibold">📖 Detailed Concept & Theory</h2>
          </div>
          <p className="leading-relaxed">
            Every HTTP interaction between a web browser (or any client) and a servlet involves two key objects:
            <strong className="text-teal-600 dark:text-teal-400"> HttpServletRequest</strong> and 
            <strong className="text-teal-600 dark:text-teal-400"> HttpServletResponse</strong>. 
            The container creates these objects and passes them to the servlet's <code>service()</code> method (and subsequently to <code>doGet()</code>, <code>doPost()</code>, etc.).
          </p>
          <p className="leading-relaxed">
            <strong>HttpServletRequest</strong> gives you access to everything the client sent: request method (GET, POST), headers (User-Agent, cookies), parameters (from query string or form body), client IP, and more.
            <strong>HttpServletResponse</strong> allows you to control what goes back: status codes, response headers, content type, and the response body (HTML, JSON, file data).
          </p>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
            <h3 className="font-bold flex items-center gap-2">💡 Real-World Analogy</h3>
            <p>Imagine <strong>Abhronila</strong> visiting a library in <strong>Shyamnagar</strong>. She fills a form (request) with her name and book title. The librarian (servlet) reads the form (request object), finds the book, and gives it to her with a smile (response object). Everything about the request and reply is encapsulated.</p>
          </div>
        </section>

        {/* METHOD SIGNATURES TABLE */}
        <section className="animate-fadeSlideUp" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-semibold mb-4">📋 Key HttpServletRequest Methods</h2>
          <div className="overflow-x-auto rounded-xl border dark:border-gray-700">
            <table className="min-w-full text-sm md:text-base">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr><th className="px-4 py-2">Method</th><th className="px-4 py-2">Return Type</th><th className="px-4 py-2">Purpose</th></tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                <tr className="hover:bg-gray-50"><td className="px-4 py-2 font-mono">getParameter(String)</td><td>String</td><td>Get single form/query parameter</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-2 font-mono">getParameterValues(String)</td><td>String[]</td><td>Get multiple values (checkboxes)</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-2 font-mono">getHeader(String)</td><td>String</td><td>Get HTTP header value</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-2 font-mono">getMethod()</td><td>String</td><td>GET, POST, etc.</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-2 font-mono">getRequestURI()</td><td>String</td><td>Path after host/port</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-2 font-mono">getRemoteAddr()</td><td>String</td><td>Client IP address</td></tr>
                <tr className="hover:bg-gray-50"><td className="px-4 py-2 font-mono">getSession()</td><td>HttpSession</td><td>Get or create session (Topic4)</td></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 overflow-x-auto rounded-xl border dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-2">📋 Key HttpServletResponse Methods</h3>
            <table className="min-w-full text-sm md:text-base">
              <thead className="bg-gray-100 dark:bg-gray-800"><tr><th>Method</th><th>Return Type</th><th>Purpose</th></tr></thead>
              <tbody className="divide-y">
                <tr><td className="px-4 py-2 font-mono">setContentType(String)</td><td>void</td><td>Set MIME type</td></tr>
                <tr><td className="px-4 py-2 font-mono">setHeader(String, String)</td><td>void</td><td>Set response header</td></tr>
                <tr><td className="px-4 py-2 font-mono">setStatus(int)</td><td>void</td><td>Set HTTP status code</td></tr>
                <tr><td className="px-4 py-2 font-mono">sendRedirect(String)</td><td>void</td><td>Redirect client to new URL</td></tr>
                <tr><td className="px-4 py-2 font-mono">getWriter()</td><td>PrintWriter</td><td>Send character text</td></tr>
                <tr><td className="px-4 py-2 font-mono">getOutputStream()</td><td>ServletOutputStream</td><td>Send binary data</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SVG ILLUSTRATION: Request-Response Flow */}
        <section className="animate-fadeSlideUp" style={{ animationDelay: "0.25s" }}>
          <h2 className="text-2xl font-semibold mb-6 text-center">🔄 Request-Response Cycle</h2>
          <div className="flex justify-center">
            <svg width="650" height="180" viewBox="0 0 650 180" className="w-full max-w-3xl">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" className="dark:fill-gray-400"/>
                </marker>
              </defs>
              {/* Client (browser) */}
              <rect x="30" y="60" width="100" height="50" rx="8" fill="#e0e7ff" className="dark:fill-blue-900/40" stroke="#3b82f6" strokeWidth="1.5"/>
              <text x="80" y="90" textAnchor="middle" fill="#1f2937" className="dark:fill-gray-100 font-medium">Client</text>
              {/* Request arrow */}
              <line x1="130" y1="85" x2="230" y2="85" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow)" className="dark:stroke-gray-400"/>
              <text x="180" y="75" textAnchor="middle" fill="#f59e0b" className="text-xs">Request (GET/POST)</text>
              {/* Servlet Container */}
              <rect x="240" y="50" width="150" height="70" rx="8" fill="#d1fae5" className="dark:fill-green-900/40" stroke="#10b981" strokeWidth="1.5"/>
              <text x="315" y="80" textAnchor="middle" fill="#1f2937" className="dark:fill-gray-100 font-medium">Servlet</text>
              <text x="315" y="100" textAnchor="middle" fill="#4b5563" className="dark:fill-gray-400 text-xs">(service, doGet/Post)</text>
              {/* Response arrow */}
              <line x1="390" y1="85" x2="490" y2="85" stroke="#4b5563" strokeWidth="2" markerEnd="url(#arrow)" className="dark:stroke-gray-400"/>
              <text x="440" y="105" textAnchor="middle" fill="#10b981" className="text-xs">Response (HTML/JSON)</text>
              {/* Client again */}
              <rect x="500" y="60" width="100" height="50" rx="8" fill="#e0e7ff" className="dark:fill-blue-900/40" stroke="#3b82f6" strokeWidth="1.5"/>
              <text x="550" y="90" textAnchor="middle" fill="#1f2937" className="dark:fill-gray-100 font-medium">Browser</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">Hover over boxes to see effect — request flows in, response flows out.</p>
        </section>

        {/* CODE EXAMPLES */}
        <section className="space-y-6 animate-fadeSlideUp" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-2xl font-semibold">📂 Real Java Implementation</h2>
          <JavaFileLoader fileModule={requestResponseServlet} title="RequestResponseDemoServlet.java" highlightLines={[7,20,32]} />
          <JavaFileLoader fileModule={responseHeadersExample} title="ResponseHeadersExample.java" highlightLines={[]} />
          <JavaFileLoader fileModule={requestUriExample} title="RequestURIExtraction.java (Snippet)" highlightLines={[]} />
          <JavaFileLoader fileModule={redirectVsForward} title="RedirectVsForward.java" highlightLines={[]} />
          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <h3 className="font-semibold">💡 Professional Tip</h3>
            <p>Always set character encoding before reading parameters: <code>request.setCharacterEncoding("UTF-8")</code>. This prevents garbled non-Latin characters (e.g., names from <strong>Naihati</strong>). For responses, set both content-type and charset: <code>response.setContentType("text/html;charset=UTF-8")</code>.</p>
          </div>
        </section>

        {/* COMMON MISTAKES + BEST PRACTICES */}
        <div className="grid md:grid-cols-2 gap-6 animate-fadeSlideUp" style={{ animationDelay: "0.4s" }}>
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl border-l-8 border-red-500">
            <h3 className="text-xl font-semibold mb-3">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Forgetting to set content type → browser may download HTML instead of rendering.</li>
              <li>Using <code>getParameter()</code> after reading input stream → fails as stream is consumed.</li>
              <li>Assuming parameters are always present → always check for null.</li>
              <li>Calling <code>getWriter()</code> and <code>getOutputStream()</code> in same response → IllegalStateException.</li>
              <li>Not handling unsupported HTTP methods → leads to 405 errors.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-xl border-l-8 border-green-500">
            <h3 className="text-xl font-semibold mb-3">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Set character encoding early for request and response.</li>
              <li>Validate all input parameters (never trust client).</li>
              <li>Use <code>sendRedirect()</code> after POST to prevent duplicate submissions (Post/Redirect/Get pattern).</li>
              <li>Set appropriate cache headers for dynamic content.</li>
              <li>Log request method and URI for debugging.</li>
            </ul>
          </div>
        </div>

        {/* HINT SECTION */}
        <div className="animate-fadeSlideUp" style={{ animationDelay: "0.45s" }}>
          <div className="bg-blue-50 dark:bg-blue-950/20 p-5 rounded-xl border border-blue-300 dark:border-blue-800">
            <h3 className="font-bold text-blue-800 dark:text-blue-300">🤔 Hint Section</h3>
            <p><strong>Observe carefully:</strong> What happens if you call <code>response.getWriter()</code> before setting content type? Does the order matter? Try changing the sequence.</p>
            <p><strong>Try changing this:</strong> In the <code>doGet()</code>, add a heavy loop that sleeps for 5 seconds. Open two browser tabs simultaneously. Do you see concurrent execution? (Yes, because container uses thread pool).</p>
          </div>
        </div>

        {/* MINI CHECKLIST */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl animate-fadeSlideUp" style={{ animationDelay: "0.5s" }}>
          <h3 className="text-xl font-semibold mb-2">📌 Student's Mini Checklist</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-sm list-disc pl-5">
            <li>✓ I can differentiate between GET and POST usage.</li>
            <li>✓ I can read parameters, headers, and client info from request.</li>
            <li>✓ I can set status codes, content type, and headers in response.</li>
            <li>✓ I understand the difference between forward and redirect.</li>
            <li>✓ I know how to avoid common IllegalStateException mistakes.</li>
          </ul>
        </div>

        {/* TEACHER NOTE */}
        <div className="animate-fadeSlideUp" style={{ animationDelay: "0.55s" }}>
          <Teacher note="Have students deploy a simple servlet and use browser devtools (Network tab) to inspect request/response headers. Let them modify headers using curl or Postman. Emphasize that request/response objects are short-lived – never store them in fields. A fun activity: Build a simple login form where POST validates credentials and redirects to a welcome page." />
        </div>

        {/* FAQ */}
        <div className="animate-fadeSlideUp" style={{ animationDelay: "0.6s" }}>
          <FAQTemplate title="HTTP Request & Response FAQs (Basic to Expert)" questions={questions} />
        </div>

        <div className="text-center text-gray-500 dark:text-gray-400 text-sm pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>🎯 Next Topic: Deployment Descriptor (web.xml) → Configuration without annotations.</p>
        </div>
      </div>
    </div>
  );
}