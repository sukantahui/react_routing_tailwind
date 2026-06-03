// topic13_questions.js
const questions = [
  {
    question: "What are the four types of URL mapping patterns in servlets?",
    shortAnswer: "Exact match, prefix (path) mapping, suffix (extension) mapping, and default servlet (/)",
    explanation: "Each defines how a servlet is invoked based on the request URL.",
    hint: "Think of specificity order.",
    level: "basic",
    codeExample: "/exact, /path/*, *.do, /"
  },
  {
    question: "Which URL pattern has the highest priority?",
    shortAnswer: "Exact match (e.g., /login)",
    explanation: "The container looks for an exact match before trying prefix or suffix patterns.",
    level: "basic"
  },
  {
    question: "What does the pattern /admin/* match?",
    shortAnswer: "Any request whose path starts with /admin/, e.g., /admin/users, /admin/dashboard/123",
    explanation: "The asterisk matches any substring after the prefix.",
    level: "basic",
    codeExample: "@WebServlet(\"/admin/*\")"
  },
  {
    question: "Can a servlet have multiple URL patterns?",
    shortAnswer: "Yes, using an array in @WebServlet or multiple <url-pattern> in web.xml",
    explanation: "All patterns will route requests to the same servlet instance.",
    level: "basic",
    codeExample: "@WebServlet(urlPatterns = {\"/one\", \"/two\", \"*.alt\"})"
  },
  {
    question: "What is the default servlet mapping pattern?",
    shortAnswer: "/ (forward slash)",
    explanation: "It catches any request not matched by other patterns.",
    level: "basic"
  },
  {
    question: "Is the pattern /* allowed? What does it do?",
    shortAnswer: "Yes, it matches every request, including static resources and JSPs.",
    explanation: "Mapping /* overrides the container's default servlet; all requests go to that servlet.",
    level: "intermediate"
  },
  {
    question: "What is the difference between / and /*?",
    shortAnswer: "/ is the default servlet (lowest priority), /* is a prefix pattern that matches every request.",
    explanation: "/* has higher priority than extension mappings, while / has the lowest.",
    level: "advanced"
  },
  {
    question: "Can you mix prefix and suffix in one pattern? (e.g., /api/*.json)",
    shortAnswer: "No, patterns must be either prefix (ending with /*) or suffix (starting with *.), not both.",
    explanation: "The specification disallows mixed patterns.",
    level: "advanced"
  },
  {
    question: "How does the container resolve conflicting mappings?",
    shortAnswer: "It chooses the most specific: exact > longest prefix > extension > default.",
    explanation: "If two prefix patterns match, the one with longer path is chosen.",
    level: "intermediate",
    codeExample: "/admin/users/* beats /admin/*"
  },
  {
    question: "What does request.getPathInfo() return?",
    shortAnswer: "The part of the request path after the servlet path for prefix mappings.",
    explanation: "For servlet mapped to /api/*, request to /api/user/123 returns /user/123 as pathInfo.",
    level: "intermediate"
  },
  {
    question: "Are URL patterns case-sensitive?",
    shortAnswer: "Yes, /User and /user are different patterns.",
    explanation: "The container compares exact string after decoding.",
    level: "basic"
  },
  {
    question: "What happens if you map two servlets to the same exact pattern?",
    shortAnswer: "The deployment fails or the container chooses one arbitrarily (implementation-dependent).",
    explanation: "Avoid duplicate mappings; ensure unique patterns per servlet.",
    level: "advanced"
  },
  {
    question: "Can you use regex in URL patterns?",
    shortAnswer: "No, the servlet spec does not support regex; only simple wildcards (*) for prefix/suffix.",
    explanation: "For advanced routing, use a framework like Spring MVC.",
    level: "intermediate"
  },
  {
    question: "How do you map a servlet to the root of the context (e.g., http://localhost:8080/app/)",
    shortAnswer: "Use pattern / (default servlet) and handle the empty path.",
    explanation: "The container will call that servlet when no other pattern matches, including the context root.",
    level: "intermediate"
  },
  {
    question: "What does the pattern /index.html match?",
    shortAnswer: "Exactly /index.html – an exact match pattern.",
    explanation: "It will not match /index.html/extra because that's a different path.",
    level: "basic"
  },
  {
    question: "How can you map a servlet to handle both /profile and /user/profile?",
    shortAnswer: "Use multiple patterns: @WebServlet(urlPatterns = {\"/profile\", \"/user/profile\"})",
    explanation: "Both exact patterns will route to the same servlet.",
    level: "basic"
  },
  {
    question: "Why should you avoid mapping /* to your servlet in a static file-serving application?",
    shortAnswer: "Because all requests, including CSS, JS, and images, will go to your servlet, breaking static content.",
    explanation: "You must then manually serve static files or forward to the container's default servlet.",
    level: "intermediate"
  },
  {
    question: "How do you serve static content if you have mapped /* to a custom servlet?",
    shortAnswer: "Forward requests for static resources to the container's default servlet using RequestDispatcher.",
    explanation: "Use getServletContext().getNamedDispatcher(\"default\").forward(request, response);",
    level: "advanced"
  },
  {
    question: "What is the difference between annotation and web.xml mapping precedence?",
    shortAnswer: "If both define a servlet for the same pattern, web.xml overrides annotations (if metadata-complete is false?). Actually both are merged; web.xml overrides conflicting URLs.",
    explanation: "The exact behavior is vendor-specific; avoid duplication.",
    level: "expert"
  },
  {
    question: "Can a filter be mapped using the same patterns as servlets?",
    shortAnswer: "Yes, filters use identical pattern syntax (<url-pattern> or @WebFilter with urlPatterns).",
    explanation: "Filters are invoked before servlets for matching patterns.",
    level: "intermediate"
  },
  {
    question: "What is the purpose of the pattern /WEB-INF/*?",
    shortAnswer: "To protect resources inside WEB-INF from direct client access while allowing internal forwards.",
    explanation: "The container prevents direct access to WEB-INF, but a forward or include can reach them.",
    level: "intermediate"
  },
  {
    question: "Can you map a servlet to an empty string pattern (\"\")?",
    shortAnswer: "No, an empty string is not a valid URL pattern.",
    explanation: "The minimal pattern is a single slash (/) for default servlet.",
    level: "basic"
  },
  {
    question: "How does URL mapping work with path parameters (e.g., /users;id=123)?",
    shortAnswer: "The container strips matrix parameters (;param=value) before matching.",
    explanation: "The path used for mapping is the URI without matrix parameters.",
    level: "expert"
  },
  {
    question: "What is the difference between /* and / in terms of filter application?",
    shortAnswer: "Filters with /* apply to all requests, including those handled by default servlet. Filters with / only apply if the request maps to that exact servlet (rarely used).",
    explanation: "Usually filters use /* to intercept all requests.",
    level: "advanced"
  },
  {
    question: "Can you map a JSP file directly using a URL pattern?",
    shortAnswer: "Yes, JSPs are compiled to servlets, and you can map any URL pattern to a JSP using <servlet> with <jsp-file>.",
    explanation: "However, it's better to use a controller servlet forwarding to JSP.",
    level: "expert"
  },
  {
    question: "What is the maximum length of a URL pattern?",
    shortAnswer: "No explicit limit, but server containers may impose limits (e.g., Tomcat limits URI length ~8KB).",
    explanation: "In practice, keep patterns short and readable.",
    level: "basic"
  },
  {
    question: "How do you handle trailing slashes in URL mapping?",
    shortAnswer: "Patterns are matched after removing trailing slash? Actually, exact match requires exact character sequence; trailing slash matters.",
    explanation: "/path and /path/ are different URIs; provide separate mappings if needed.",
    level: "advanced"
  },
  {
    question: "Is it allowed to have multiple wildcards in a prefix pattern (e.g., /api/*/details/*)?",
    shortAnswer: "No, only one wildcard (*) at the end is allowed for prefix patterns.",
    explanation: "You cannot have multiple asterisks or asterisk in the middle.",
    level: "advanced"
  },
  {
    question: "What does the container do if no mapping matches a request?",
    shortAnswer: "It returns a 404 error (Not Found) if no servlet handles the URL.",
    explanation: "Unless a default servlet (/) is defined, then that servlet handles it.",
    level: "basic"
  },
  {
    question: "Can you use annotations to map a servlet to a URL that contains a period (.)?",
    shortAnswer: "Yes, periods are allowed; they don't imply extension mapping unless prefixed with *.",
    explanation: "/user/profile.json is an exact match pattern, not extension mapping.",
    level: "intermediate"
  }
];

export default questions;