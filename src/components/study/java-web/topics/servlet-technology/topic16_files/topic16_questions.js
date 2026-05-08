// topic16_questions.js
const questions = [
  {
    question: "What is a web framework?",
    shortAnswer: "A set of libraries and patterns that simplify web application development on top of servlets.",
    explanation: "Frameworks provide MVC structure, request routing, data binding, validation, etc.",
    level: "basic"
  },
  {
    question: "What are two popular Java web frameworks?",
    shortAnswer: "Apache Struts 2 and Spring MVC.",
    explanation: "Struts 2 is older but still used; Spring MVC is part of Spring Framework and dominant today.",
    level: "basic"
  },
  {
    question: "What front controller does Struts 2 use?",
    shortAnswer: "StrutsPrepareAndExecuteFilter (originally FilterDispatcher).",
    explanation: "It intercepts all requests and dispatches to appropriate actions.",
    level: "intermediate"
  },
  {
    question: "What front controller does Spring MVC use?",
    shortAnswer: "DispatcherServlet.",
    explanation: "A servlet that routes requests to controller methods.",
    level: "intermediate"
  },
  {
    question: "In Struts 2, what method must an action class have?",
    shortAnswer: "execute() (or implement Action interface).",
    explanation: "The method returns a result string (e.g., 'success', 'error').",
    level: "basic"
  },
  {
    question: "In Spring MVC, what annotation marks a class as a controller?",
    shortAnswer: "@Controller.",
    explanation: "Plus @RequestMapping to map URLs to methods.",
    level: "basic"
  },
  {
    question: "How does Spring MVC bind request parameters to method arguments?",
    shortAnswer: "Automatically using matching parameter names, or @RequestParam.",
    explanation: "Example: public String hello(@RequestParam String name) { ... }",
    level: "intermediate"
  },
  {
    question: "What is the role of a ViewResolver in Spring MVC?",
    shortAnswer: "Resolves logical view names (e.g., 'home') to actual view files (e.g., /WEB-INF/home.jsp).",
    explanation: "InternalResourceViewResolver is common for JSPs.",
    level: "advanced"
  },
  {
    question: "Where is Struts 2 typically configured?",
    shortAnswer: "struts.xml file, located in the classpath (usually WEB-INF/classes).",
    explanation: "It defines action mappings, results, interceptors, etc.",
    level: "intermediate"
  },
  {
    question: "What annotation in Spring MVC is used to create REST endpoints?",
    shortAnswer: "@RestController (which combines @Controller and @ResponseBody).",
    explanation: "Methods return data directly (JSON/XML) instead of view names.",
    level: "intermediate"
  },
  {
    question: "Can Struts 2 be used with Spring DI?",
    shortAnswer: "Yes, via a plugin (struts2-spring-plugin) that integrates Spring IoC.",
    explanation: "Actions can be Spring beans with dependencies injected.",
    level: "advanced"
  },
  {
    question: "What is the advantage of annotation‑based configuration over XML?",
    shortAnswer: "Less verbose, easier to see the mapping directly in the code, faster development.",
    explanation: "Spring MVC heavily uses annotations (@RequestMapping, @GetMapping, etc.).",
    level: "intermediate"
  },
  {
    question: "What is Spring Boot?",
    shortAnswer: "An opinionated framework that simplifies Spring application setup with auto‑configuration.",
    explanation: "It reduces configuration drastically, often requiring no web.xml.",
    level: "advanced"
  },
  {
    question: "How does a Struts 2 action return a result?",
    shortAnswer: "Return a String constant (e.g., 'success', 'error'), or use ActionSupport constants.",
    explanation: "The result is mapped to a JSP or other resource in struts.xml.",
    level: "basic"
  },
  {
    question: "What is the difference between Struts 2 and Struts 1?",
    shortAnswer: "Struts 2 is based on WebWork, uses POJO actions, and has better interceptor architecture.",
    explanation: "Struts 1 required extending Action classes and used FormBeans.",
    level: "advanced"
  },
  {
    question: "How does Spring MVC handle file upload?",
    shortAnswer: "Using MultipartResolver and @RequestParam MultipartFile.",
    explanation: "Configure CommonsMultipartResolver or StandardServletMultipartResolver.",
    level: "advanced"
  },
  {
    question: "What is the purpose of <filter-mapping> for Struts?",
    shortAnswer: "To map the Struts filter to URL patterns (typically /*).",
    explanation: "This intercepts all requests for processing.",
    level: "intermediate"
  },
  {
    question: "What is the default view technology in Spring MVC if no ViewResolver is set?",
    shortAnswer: "InternalResourceViewResolver with defaults not present; you must configure one.",
    explanation: "Otherwise, Spring may not find JSPs.",
    level: "advanced"
  },
  {
    question: "What is the role of interceptors in Struts 2?",
    shortAnswer: "They perform cross‑cutting tasks (validation, logging, file upload) before/after action execution.",
    explanation: "Similar to servlet filters but action‑specific.",
    level: "advanced"
  },
  {
    question: "What is the name of the Spring MVC front controller servlet in web.xml?",
    shortAnswer: "DispatcherServlet.",
    explanation: "It is configured in web.xml with a servlet-mapping.",
    level: "basic"
  },
  {
    question: "How do you pass data from Spring controller to JSP?",
    shortAnswer: "Add attributes to the Model object (or use ModelMap, ModelAndView).",
    explanation: "JSP accesses them via ${attributeName}.",
    level: "intermediate"
  },
  {
    question: "What is the difference between @GetMapping and @RequestMapping?",
    shortAnswer: "@GetMapping is a shortcut for @RequestMapping(method = RequestMethod.GET).",
    explanation: "Other shortcuts: @PostMapping, @PutMapping, etc.",
    level: "intermediate"
  },
  {
    question: "Can Struts 2 be used without XML?",
    shortAnswer: "Yes, via annotations such as @Action, @Result, but limited.",
    explanation: "Many projects still use struts.xml for clarity.",
    level: "advanced"
  },
  {
    question: "What is the typical directory structure for a Spring MVC webapp?",
    shortAnswer: "src/main/java (controllers), src/main/resources, src/main/webapp/WEB-INF/views (JSPs).",
    explanation: "Maven/Gradle projects follow this convention.",
    level: "intermediate"
  },
  {
    question: "How do you handle exceptions globally in Spring MVC?",
    shortAnswer: "Use @ControllerAdvice and @ExceptionHandler.",
    explanation: "Centralised error handling across all controllers.",
    level: "expert"
  },
  {
    question: "What is the equivalent of `@RequestMapping` in Struts 2?",
    shortAnswer: "There is no direct annotation; URL mapping is done in struts.xml or via @Action annotation on methods (limited).",
    explanation: "Struts 2 uses package and action names mapping.",
    level: "advanced"
  },
  {
    question: "Why would a team choose Spring MVC over Struts 2 for a new project?",
    shortAnswer: "Better integration with Spring ecosystems, annotation-driven, REST support, and Spring Boot.",
    explanation: "Also larger community and more job market demand.",
    level: "intermediate"
  },
  {
    question: "What is the purpose of `<welcome-file-list>` in a web.xml that uses a framework?",
    shortAnswer: "It defines the default page when accessing the root context, often index.html or a dispatcher URL.",
    explanation: "For Spring MVC, you might set welcome-file to empty and map root to a controller.",
    level: "intermediate"
  },
  {
    question: "Can you combine servlets and Spring MVC in the same application?",
    shortAnswer: "Yes, servlets can coexist; they follow normal servlet mapping precedence.",
    explanation: "Spring MVC is just a servlet (DispatcherServlet).",
    level: "advanced"
  },
  {
    question: "What is the fundamental difference in action/controller design between Struts 2 and Spring MVC?",
    shortAnswer: "Struts 2 uses a per‑request action instance (with properties bound to request params); Spring MVC uses one controller instance per handler method (singleton).",
    explanation: "Spring's singleton pattern requires thread‑safe controller design.",
    level: "expert"
  }
];

export default questions;