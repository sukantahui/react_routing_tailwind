// topic12_questions.js
const questions = [
  {
    question: "What is the purpose of an authentication filter in a servlet application?",
    shortAnswer: "To intercept requests and verify if a user is authenticated before allowing access to protected resources.",
    explanation: "Authentication filters check for existence of a valid session or credentials, redirecting to a login page if not authenticated.",
    hint: "Think of it as a security guard at the entrance.",
    level: "basic",
    codeExample: "@WebFilter(\"/secure/*\") public class AuthFilter implements Filter { ... }"
  },
  {
    question: "Which annotation is used to declare security constraints directly on a servlet?",
    shortAnswer: "@ServletSecurity",
    explanation: "Introduced in Servlet 3.0, @ServletSecurity allows role-based access control at the servlet or method level.",
    hint: "It's the declarative alternative to web.xml security constraints.",
    level: "basic",
    codeExample: "@ServletSecurity(@HttpConstraint(rolesAllowed = {\"admin\"}))"
  },
  {
    question: "What does @HttpConstraint define in @ServletSecurity?",
    shortAnswer: "Default security constraint applied to all HTTP methods not explicitly overridden by @HttpMethodConstraint.",
    explanation: "It specifies whether access is permitted, denied, or allowed only for certain roles.",
    level: "intermediate",
    codeExample: "@HttpConstraint(value = ServletSecurity.EmptyRoleSemantic.DENY)"
  },
  {
    question: "How can you allow unauthenticated access to specific HTTP methods using @ServletSecurity?",
    shortAnswer: "Use @HttpMethodConstraint with rolesAllowed = {} (empty array) to permit anonymous access.",
    explanation: "Empty array means no roles are required, i.e., access is allowed for all users, authenticated or not.",
    level: "advanced",
    codeExample: "@HttpMethodConstraint(value = \"GET\", rolesAllowed = {})"
  },
  {
    question: "Why is it important to exclude the login page from the authentication filter?",
    shortAnswer: "To avoid an infinite redirect loop where the filter redirects to the login page, which itself requires authentication.",
    explanation: "The login page must be publicly accessible so unauthenticated users can submit credentials.",
    level: "basic",
    codeExample: "if (request.getRequestURI().endsWith(\"/login\")) { chain.doFilter(request, response); return; }"
  },
  {
    question: "How do you retrieve the authenticated user's principal name inside a servlet?",
    shortAnswer: "request.getUserPrincipal().getName()",
    explanation: "Principal represents the currently authenticated user; getName() returns the username (or identifier).",
    level: "basic",
    codeExample: "String username = request.getUserPrincipal().getName();"
  },
  {
    question: "What method checks whether the authenticated user belongs to a given role?",
    shortAnswer: "request.isUserInRole(String role)",
    explanation: "Returns true if the user has been granted the specified role by the container.",
    level: "basic",
    codeExample: "if (request.isUserInRole(\"admin\")) { // show admin panel }"
  },
  {
    question: "What is the difference between authentication and authorization?",
    shortAnswer: "Authentication verifies identity (who you are); authorization determines permissions (what you can do).",
    explanation: "You must authenticate first; then the system decides if your role allows access to a resource.",
    level: "basic"
  },
  {
    question: "Which HTTP methods are covered by a @ServletSecurity constraint if no @HttpMethodConstraint is specified?",
    shortAnswer: "All HTTP methods (GET, POST, PUT, DELETE, etc.) are covered by the default @HttpConstraint.",
    explanation: "You can override specific methods by adding @HttpMethodConstraint entries.",
    level: "intermediate"
  },
  {
    question: "What happens if you annotate a servlet with @ServletSecurity but do NOT define security roles in web.xml?",
    shortAnswer: "The container ignores the annotation or may throw a deployment error (vendor‑dependent).",
    explanation: "Roles must be declared in web.xml using <security-role> or programmatically added via HttpServletRequest.authenticate().",
    level: "advanced"
  },
  {
    question: "How can you implement FORM-based authentication without web.xml?",
    shortAnswer: "You cannot; FORM authentication requires login-config in web.xml. However, you can implement a custom filter that mimics it.",
    explanation: "Standard container‑managed FORM authentication needs web.xml; custom filters give you flexibility.",
    level: "expert"
  },
  {
    question: "What is session fixation and how can you prevent it after login?",
    shortAnswer: "Session fixation occurs when an attacker sets a known session ID before the user logs in. Prevent it by regenerating the session ID after successful authentication.",
    explanation: "Use request.changeSessionId() (Servlet 3.1) or invalidate old session and create a new one.",
    level: "advanced",
    codeExample: "HttpSession oldSession = request.getSession(false); if (oldSession != null) oldSession.invalidate(); HttpSession newSession = request.getSession();"
  },
  {
    question: "What is the purpose of <security-role> in web.xml?",
    shortAnswer: "To declare the logical role names that the application uses, mapping them to the container's principal groups.",
    explanation: "Container administrators then map these logical roles to actual users/groups in the server's realm.",
    level: "intermediate",
    codeExample: "<security-role><role-name>admin</role-name></security-role>"
  },
  {
    question: "Can you use @ServletSecurity together with security constraints defined in web.xml?",
    shortAnswer: "Yes, both can coexist. The effective constraint is the union of both, typically the most restrictive applies.",
    explanation: "Be careful to avoid conflicts; web.xml constraints often override annotations if there is overlap.",
    level: "expert"
  },
  {
    question: "What is the difference between BASIC and DIGEST authentication?",
    shortAnswer: "BASIC sends credentials in Base64 (plain text), DIGEST sends a hashed value, making it more secure over HTTP.",
    explanation: "DIGEST prevents password eavesdropping but still has limitations; HTTPS is strongly recommended for both.",
    level: "intermediate"
  },
  {
    question: "How can you programmatically log a user out in a servlet?",
    shortAnswer: "Call request.logout() or invalidate the session.",
    explanation: "logout() also clears the container’s authentication state and is available from Servlet 3.0.",
    level: "intermediate",
    codeExample: "request.logout(); // or request.getSession().invalidate();"
  },
  {
    question: "What is the effect of @HttpConstraint(DENY) on a servlet?",
    shortAnswer: "All access is denied, regardless of roles or authentication status.",
    explanation: "DENY is equivalent to an empty rolesAllowed array and also prevents any authenticated access.",
    level: "intermediate",
    codeExample: "@ServletSecurity(@HttpConstraint(ServletSecurity.EmptyRoleSemantic.DENY))"
  },
  {
    question: "How does a filter-based authentication typically store the logged-in status?",
    shortAnswer: "In the HttpSession, usually with a boolean or user object attribute.",
    explanation: "The filter checks for this attribute on each request; its absence triggers a redirect to login.",
    level: "basic",
    codeExample: "session.setAttribute(\"authenticatedUser\", username);"
  },
  {
    question: "What is the security risk of storing passwords in plain text in a database?",
    shortAnswer: "If the database is compromised, all credentials are exposed. Passwords should be hashed with a salt.",
    explanation: "Use algorithms like bcrypt, PBKDF2, or Argon2 to store hashed passwords.",
    level: "basic"
  },
  {
    question: "Which method should be used to access the currently authenticated user’s roles in a JSP?",
    shortAnswer: "The <c:if> tag combined with the pageContext attribute: pageContext.request.isUserInRole('admin').",
    explanation: "Also, EL expressions like ${pageContext.request.remoteUser} give the username.",
    level: "intermediate",
    codeExample: "<c:if test=\"${pageContext.request.isUserInRole('admin')}\">Admin Menu</c:if>"
  },
  {
    question: "What is the default value of asyncSupported in @ServletSecurity context?",
    shortAnswer: "It does not affect async; async is a separate @WebServlet attribute. @ServletSecurity works regardless of async.",
    explanation: "Async support is orthogonal to security constraints.",
    level: "advanced"
  },
  {
    question: "How can you protect against brute-force login attacks in a custom authentication filter?",
    shortAnswer: "Implement rate limiting (e.g., count failures per username or IP, lock account temporarily).",
    explanation: "Store failure count in cache or database and exclude further attempts after threshold.",
    level: "expert"
  },
  {
    question: "What does request.authenticate(response) do?",
    shortAnswer: "It triggers container‑managed authentication (BASIC, FORM, etc.) for the current request.",
    explanation: "If the user is not already authenticated, the container prompts for credentials (depending on login-config).",
    level: "advanced",
    codeExample: "if (!request.authenticate(response)) { // authentication failed }"
  },
  {
    question: "Why is it recommended to use HTTPS with any authentication mechanism?",
    shortAnswer: "To prevent eavesdropping of credentials and session IDs over the network.",
    explanation: "Even DIGEST is vulnerable to man-in-the-middle attacks if not using TLS.",
    level: "basic"
  },
  {
    question: "Can @ServletSecurity be used on a JSP?",
    shortAnswer: "No, annotations only work on servlet classes. To secure JSPs, use web.xml constraints or a filter.",
    explanation: "JSPs are compiled to servlets, but you cannot annotate the source JSP file.",
    level: "intermediate"
  },
  {
    question: "What is the purpose of <login-config> in web.xml?",
    shortAnswer: "It defines which authentication method the container uses (BASIC, FORM, DIGEST, CLIENT-CERT) and the login/error pages for FORM method.",
    explanation: "It configures container‑managed authentication behavior.",
    level: "intermediate"
  },
  {
    question: "How do you retrieve all roles assigned to the current user in a standard servlet API?",
    shortAnswer: "There is no direct method to get all roles; you must test each role with isUserInRole().",
    explanation: "The container only provides role checks, not enumeration of granted roles.",
    level: "advanced"
  },
  {
    question: "What is CSRF (Cross-Site Request Forgery) and how can a filter help prevent it?",
    shortAnswer: "CSRF tricks a user into submitting a request they didn't intend. A filter can add a CSRF token to forms and validate it.",
    explanation: "Tokens ensure the request originated from your own frontend, not a malicious site.",
    level: "expert"
  },
  {
    question: "How does the container map a logical role (e.g., 'admin') to an actual user?",
    shortAnswer: "Through a realm configured in the container (e.g., Tomcat's tomcat-users.xml, LDAP, DatabaseRealm).",
    explanation: "The <security-role> declaration simply says 'this role is used', but actual mapping is container-specific.",
    level: "advanced"
  },
  {
    question: "What is the difference between <url-pattern> in a filter and <url-pattern> in a security constraint?",
    shortAnswer: "Filter patterns are processed in the filter chain; security constraints are enforced by the container before the servlet is called.",
    explanation: "Both can be used together, but security constraints are container‑managed, while filters give programmatic control.",
    level: "advanced"
  }
];

export default questions;