// topic14_questions.js
const questions = [
  {
    question: "What are the three components of MVC?",
    shortAnswer: "Model, View, Controller",
    explanation: "Model handles data, View handles presentation, Controller handles request processing.",
    level: "basic",
    codeExample: "Servlet (Controller) -> Java Bean (Model) -> JSP (View)"
  },
  {
    question: "What is the role of the Controller in MVC?",
    shortAnswer: "Receives requests, interacts with Model, and selects the View.",
    explanation: "Controller does not contain business logic; it delegates to model and forwards to JSP.",
    level: "basic"
  },
  {
    question: "Why should JSPs be placed under /WEB-INF/ in MVC?",
    shortAnswer: "To prevent direct access by clients, forcing all requests through the controller.",
    explanation: "Only the controller can forward to these JSPs, enforcing the MVC pattern.",
    level: "intermediate"
  },
  {
    question: "How does the Controller pass data to the View?",
    shortAnswer: "Using request.setAttribute() and then forwarding to the JSP.",
    explanation: "The JSP accesses these attributes via Expression Language (EL).",
    level: "basic",
    codeExample: "request.setAttribute(\"user\", userObj); request.getRequestDispatcher(\"/WEB-INF/view.jsp\").forward();"
  },
  {
    question: "What is the Model in a typical servlet/JSP application?",
    shortAnswer: "Often a JavaBean or POJO with getters/setters, possibly with DAO for database access.",
    explanation: "The model encapsulates data and business rules.",
    level: "intermediate"
  },
  {
    question: "What is the advantage of separating View from Controller?",
    shortAnswer: "Allows frontend and backend teams to work independently, and easier UI changes without altering logic.",
    explanation: "Also improves testability.",
    level: "intermediate"
  },
  {
    question: "Can you have multiple Views for the same Model?",
    shortAnswer: "Yes, e.g., HTML view and JSON view, or mobile vs desktop views.",
    explanation: "The controller can forward to different JSPs based on request parameters.",
    level: "advanced"
  },
  {
    question: "What is a common anti-pattern in MVC with JSPs?",
    shortAnswer: "Embedding Java code (scriptlets) directly in JSPs, mixing logic with presentation.",
    explanation: "Use JSTL and EL instead to keep JSPs clean.",
    level: "basic"
  },
  {
    question: "What is the role of JSTL in MVC?",
    shortAnswer: "Provides tags for iteration, conditionals, and formatting without Java code.",
    explanation: "Example: <c:forEach> to iterate over model collections.",
    level: "intermediate"
  },
  {
    question: "How do you implement a front controller pattern in servlets?",
    shortAnswer: "Create one servlet that handles all requests and dispatches to different actions based on URL or parameter.",
    explanation: "Frameworks like Spring MVC use a single DispatcherServlet.",
    level: "advanced"
  },
  {
    question: "What is the difference between forwarding and redirecting in MVC?",
    shortAnswer: "Forward keeps the request and model attributes; redirect creates a new request and loses model data.",
    explanation: "Typically forward to JSP for display, redirect after POST to avoid duplicate submission.",
    level: "intermediate"
  },
  {
    question: "Can the Model directly update the View?",
    shortAnswer: "No, in classic MVC, the Model does not talk to the View; the Controller mediates.",
    explanation: "Some variations (MVP, MVVM) allow two-way binding, but not in servlet/JSP.",
    level: "advanced"
  },
  {
    question: "What is a value object (VO) or DTO in MVC context?",
    shortAnswer: "Simple Java class that holds data to transfer between layers, often used as Model.",
    explanation: "Typically immutable or with getters/setters, no business logic.",
    level: "basic"
  },
  {
    question: "How do you test a MVC controller servlet in isolation?",
    shortAnswer: "Use a mocking framework (Mockito) to mock request/response and verify attributes and forward paths.",
    explanation: "You can also test without container using HttpServletRequest mock objects.",
    level: "advanced"
  },
  {
    question: "What is the purpose of the <%@ page isELIgnored=\"false\" %> directive?",
    shortAnswer: "Enables Expression Language (EL) evaluation in JSP.",
    explanation: "EL syntax ${...} is enabled by default in modern containers.",
    level: "intermediate"
  },
  {
    question: "How does the Controller access the Model if the Model is a database?",
    shortAnswer: "Via Data Access Objects (DAOs) that encapsulate SQL queries, returning model objects.",
    explanation: "Controller calls DAO methods, gets models, and puts them in request attributes.",
    level: "advanced"
  },
  {
    question: "What is a common naming convention for MVC components?",
    shortAnswer: "Model: Student, User; Controller: StudentController, UserServlet; View: studentList.jsp, userForm.jsp.",
    explanation: "Clear naming improves readability.",
    level: "basic"
  },
  {
    question: "Can JSPs be used as part of the Controller?",
    shortAnswer: "Technically yes, but it's poor practice. JSPs should be views only.",
    explanation: "Keeping JSPs pure views enforces separation.",
    level: "intermediate"
  },
  {
    question: "What is the difference between MVC and three-tier architecture?",
    shortAnswer: "MVC is a pattern for presentation layer; three-tier (presentation, business, data) is a logical architecture for the whole application.",
    explanation: "MVC typically resides in the presentation tier.",
    level: "advanced"
  },
  {
    question: "How do you include a common header/footer in JSPs without repeating code?",
    shortAnswer: "Use <jsp:include> or <%@ include file=\"...\" %> directive.",
    explanation: "Or use a template framework like Tiles.",
    level: "basic"
  },
  {
    question: "What is the role of the web.xml in MVC?",
    shortAnswer: "Defines servlet mappings for controllers, security constraints, and welcome files.",
    explanation: "Annotations can replace web.xml for servlet definitions.",
    level: "basic"
  },
  {
    question: "How do you handle file upload in MVC pattern?",
    shortAnswer: "Controller servlet uses Part API to receive uploaded file, processes it (Model), and forwards to a result View.",
    explanation: "The JSP view should display success/error messages.",
    level: "advanced"
  },
  {
    question: "What is the primary advantage of using a framework like Spring MVC?",
    shortAnswer: "Reduces boilerplate, provides dependency injection, validation, binding, and view resolution.",
    explanation: "But underlying concepts are based on servlet MVC.",
    level: "advanced"
  },
  {
    question: "How can you pass error messages from Controller to View?",
    shortAnswer: "Set an attribute like request.setAttribute(\"error\", \"message\") and display it in JSP using EL.",
    explanation: "Optionally use a custom tag or JSTL to conditionally show errors.",
    level: "intermediate"
  },
  {
    question: "What is the default scope for model attributes passed to JSP?",
    shortAnswer: "Request scope (setAttribute on HttpServletRequest).",
    explanation: "Attributes survive only until the request is forwarded; not across redirects.",
    level: "basic"
  },
  {
    question: "Why is it bad to store large collections in session scope?",
    shortAnswer: "Consumes server memory and reduces scalability.",
    explanation: "Use request scope for display-only data; session for user login or preferences only.",
    level: "basic"
  },
  {
    question: "What is a helper class in MVC?",
    shortAnswer: "A utility class used by controllers to encapsulate repetitive logic (e.g., formatting, validation).",
    explanation: "Helpers keep controllers thin.",
    level: "intermediate"
  },
  {
    question: "How do you implement internationalization (i18n) in MVC?",
    shortAnswer: "Use resource bundles and set locale in controller or filter; JSP accesses messages via fmt:message tags.",
    explanation: "Spring MVC provides built-in i18n support.",
    level: "expert"
  },
  {
    question: "What is the difference between <jsp:forward> and RequestDispatcher.forward()?",
    shortAnswer: "<jsp:forward> is a JSP action that forwards to another resource; RequestDispatcher.forward() is the programmatic equivalent in servlets.",
    explanation: "Both achieve the same result.",
    level: "intermediate"
  },
  {
    question: "What are the characteristics of a well-designed MVC application?",
    shortAnswer: "Thin controllers, rich models, dumb views, high testability, clear separation of concerns.",
    explanation: "Controllers should be under 50 lines; JSPs should have no scriptlets.",
    level: "advanced"
  }
];

export default questions;