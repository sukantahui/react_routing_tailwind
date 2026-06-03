const questions = [
  {
    question: "Why is HTTP called a stateless protocol?",
    shortAnswer: "Each request is independent; the server does not retain any memory of previous requests.",
    explanation: "Statelessness simplifies the protocol but requires session management for user-specific interactions.",
    hint: "Think about how a simple web server handles consecutive requests from the same user without sessions.",
    level: "basic",
    codeExample: "// No built-in memory between requests"
  },
  {
    question: "How do you obtain an existing session without creating a new one?",
    shortAnswer: "request.getSession(false) returns null if no session exists.",
    explanation: "Passing false prevents automatic session creation; useful for checking login status.",
    level: "basic",
    codeExample: "HttpSession session = request.getSession(false); if (session == null) { // not logged in }"
  },
  // ... generate 28 more questions covering:
  // - Cookie attributes (maxAge, domain, path, secure, httpOnly)
  // - HttpSession methods (setAttribute, getAttribute, removeAttribute, invalidate)
  // - URL rewriting: encodeURL vs encodeRedirectURL
  // - Session timeout configuration in web.xml and programmatically
  // - Session listeners (HttpSessionListener, HttpSessionAttributeListener)
  // - Session fixation attack and prevention (changeSessionId)
  // - Clustering and session persistence (JDBC, Redis, etc.)
  // - Performance implications of large session objects
  // - Cookie vs HttpSession vs URL rewriting pros/cons
  // - Secure flag and HTTPS
  // - SameSite cookie attribute (modern browsers)
  // - When to use request.changeSessionId()
  // - Difference between invalidate() and removeAttribute()
  // - Default JSESSIONID cookie settings
  // - Handling session in AJAX requests
  // - Session binding with HttpSessionBindingListener
  // - Migrating sessions across server restarts (serialization)
  // - Session alternatives (JWT, OAuth tokens)
  // - Testing session timeout with browser dev tools
  // - Debugging "session lost" issues
  // - And more – total 30
];

export default questions;