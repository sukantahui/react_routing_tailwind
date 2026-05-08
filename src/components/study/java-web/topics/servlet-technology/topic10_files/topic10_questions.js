const questions = [
  {
    question: "What is the difference between forward() and sendRedirect()?",
    shortAnswer: "Forward is server‑side (URL unchanged), redirect is client‑side (URL changes).",
    explanation: "forward() preserves request attributes, sendRedirect() causes a new request.",
    hint: "Check the browser address bar after each.",
    level: "basic",
    codeExample: "request.getRequestDispatcher(\"/next\").forward(req,resp); vs response.sendRedirect(\"/next\");"
  },
  {
    question: "Can forward() be used to go to an external website?",
    shortAnswer: "No, forward works only within the same web application.",
    explanation: "The container resolves paths relative to the context root.",
    level: "basic"
  },
  {
    question: "What happens if you call forward() after the response has been committed?",
    shortAnswer: "IllegalStateException is thrown.",
    explanation: "Once headers and part of the body are sent, you cannot forward.",
    level: "intermediate"
  },
  {
    question: "Why is redirect often used after a POST operation?",
    shortAnswer: "To prevent duplicate form submissions when the user refreshes the page.",
    explanation: "POST-Redirect-GET pattern: after POST, redirect to a GET page.",
    level: "intermediate",
    codeExample: "response.sendRedirect(request.getContextPath() + \"/success\")"
  },
  {
    question: "How can you pass data from a servlet to a forwarded JSP?",
    shortAnswer: "Use request.setAttribute() before forwarding.",
    explanation: "Attributes survive the forward because it’s the same request.",
    level: "basic"
  },
  {
    question: "What is the difference between include() and forward()?",
    shortAnswer: "include() adds output of another resource to the current response; forward() transfers control completely.",
    explanation: "include() allows multiple resources to contribute to one response.",
    level: "basic"
  },
  {
    question: "How do you get a RequestDispatcher?",
    shortAnswer: "From HttpServletRequest: request.getRequestDispatcher(path) or from ServletContext: getServletContext().getRequestDispatcher(path).",
    explanation: "Both accept absolute (starting with /) or relative paths.",
    level: "basic"
  },
  {
    question: "Can you forward to a JSP that is inside the WEB-INF folder?",
    shortAnswer: "Yes, and it is a security best practice because JSPs inside WEB-INF are not directly accessible by clients.",
    explanation: "The container prevents direct access to WEB-INF resources, but forward can reach them.",
    level: "intermediate"
  },
  {
    question: "What HTTP status code does sendRedirect() send by default?",
    shortAnswer: "302 (Found / temporary redirect).",
    explanation: "You can also send a 301 (permanent) using response.setStatus() before sendRedirect? Actually sendRedirect always sends 302; use setStatus+setHeader for 301.",
    level: "intermediate"
  },
  {
    question: "After calling sendRedirect(), should you return from the method?",
    shortAnswer: "Yes, otherwise remaining code may execute and cause errors.",
    explanation: "The redirect is scheduled; returning ensures no further processing.",
    level: "basic"
  },
  {
    question: "Can you forward to a servlet in another web application?",
    shortAnswer: "No, forward is limited to the same web application context.",
    explanation: "Use redirect with absolute URL for cross‑context navigation.",
    level: "intermediate"
  },
  {
    question: "What method do you use to include a resource and also pass query parameters?",
    shortAnswer: "RequestDispatcher.include() with a request that has parameters, or append parameters to the path.",
    explanation: "Example: dispatcher.include(request, response); parameters are already in the request object.",
    level: "advanced"
  },
  {
    question: "How does forward() affect the browser’s refresh button?",
    shortAnswer: "Refresh will re‑execute the last action (the original servlet), possibly causing duplicate form submissions.",
    explanation: "Because the URL in the browser never changed.",
    level: "intermediate"
  },
  {
    question: "What is the purpose of encodeRedirectURL()?",
    shortAnswer: "To add session ID to the redirect URL if cookies are disabled (URL rewriting).",
    explanation: "Use: response.encodeRedirectURL(url) before passing to sendRedirect() for robust session tracking.",
    level: "advanced"
  },
  {
    question: "Can you forward from a JSP to a servlet?",
    shortAnswer: "Yes, using <jsp:forward> tag or scriptlet code.",
    explanation: "<jsp:forward page=\"/servlet\" />",
    level: "basic"
  },
  {
    question: "What happens to the original request and response objects after forward()?",
    shortAnswer: "They remain the same objects; the forwarded resource sees the same request/response.",
    explanation: "That’s why attributes survive.",
    level: "basic"
  },
  {
    question: "How do you include a servlet’s output inside a JSP?",
    shortAnswer: "Using RequestDispatcher.include() from a servlet, or <jsp:include page=\"/servlet\" /> in JSP.",
    explanation: "Both include the dynamic output of the servlet.",
    level: "intermediate"
  },
  {
    question: "Is it possible to forward to a static HTML file?",
    shortAnswer: "Yes, any resource reachable via the servlet context can be forwarded or included.",
    explanation: "The container will serve the static file content.",
    level: "basic"
  },
  {
    question: "What error do you get if you forward after writing to the response OutputStream?",
    shortAnswer: "IllegalStateException: Cannot forward after response has been committed.",
    explanation: "Always forward before any content is sent to the client.",
    level: "intermediate"
  },
  {
    question: "Why use redirect instead of forward for logout?",
    shortAnswer: "To ensure the browser does not re‑send the logout request unintentionally on refresh.",
    explanation: "Redirect after invalidating session clears the URL and prevents re‑submission.",
    level: "intermediate"
  },
  {
    question: "How do you perform a permanent redirect (301)?",
    shortAnswer: "Set status code 301 and Location header manually, instead of sendRedirect().",
    explanation: "response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY); response.setHeader(\"Location\", newUrl);",
    level: "advanced"
  },
  {
    question: "Can you forward to a resource outside the context?",
    shortAnswer: "No, forward is internal only.",
    explanation: "For external resources, use redirect.",
    level: "basic"
  },
  {
    question: "What is the difference between request.getRequestDispatcher() and getServletContext().getRequestDispatcher()?",
    shortAnswer: "The request version can accept relative paths; the context version requires absolute paths (starting with /).",
    explanation: "Both return a RequestDispatcher, but path handling differs slightly.",
    level: "intermediate"
  },
  {
    question: "How does forward() work with filters?",
    shortAnswer: "Filters configured with DISPATCHER_FORWARD are applied on forward.",
    explanation: "By default, filters with REQUEST dispatcher do NOT apply to forwards; you must specify FORWARD.",
    level: "advanced"
  },
  {
    question: "Why is including a resource sometimes better than forwarding?",
    shortAnswer: "When you want to combine multiple components into one response, like a header, body, and footer.",
    explanation: "Forward replaces the entire response; include adds to it.",
    level: "intermediate"
  },
  {
    question: "What is the default behavior of a JSP forward vs redirect?",
    shortAnswer: "<jsp:forward> is a server‑side forward; response.sendRedirect() is a client redirect.",
    explanation: "They mirror the servlet mechanisms.",
    level: "basic"
  },
  {
    question: "Can you use forward() after calling flush() on the response?",
    shortAnswer: "No, flush() commits the response, making forward impossible.",
    explanation: "Always forward before any output is flushed.",
    level: "advanced"
  },
  {
    question: "How do you pass data in a redirect?",
    shortAnswer: "Add query parameters to the URL, or store data in session before redirecting and retrieve after.",
    explanation: "Because redirect creates a new request, request attributes are lost.",
    level: "intermediate"
  },
  {
    question: "What is the typical use of include() in MVC architecture?",
    shortAnswer: "To include reusable components like headers, footers, or navigation bars.",
    explanation: "It avoids duplication of common UI elements.",
    level: "intermediate"
  },
  {
    question: "How does relative path resolution work in RequestDispatcher?",
    shortAnswer: "Paths without a leading / are relative to the current servlet’s path; absolute (/) are relative to the context root.",
    explanation: "Best practice: use absolute paths starting with / to avoid confusion.",
    level: "advanced"
  }
];

export default questions;