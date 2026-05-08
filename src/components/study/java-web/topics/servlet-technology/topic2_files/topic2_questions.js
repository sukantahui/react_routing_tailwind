const questions = [
  {
    question: "What is the purpose of web.xml in a Java web application?",
    shortAnswer: "web.xml is the deployment descriptor that configures servlets, mappings, context params, filters, listeners, and error pages.",
    explanation: "It tells the servlet container how to run the web application without modifying Java code.",
    hint: "Think of it as the settings file for your app.",
    level: "basic",
    codeExample: "<web-app> <servlet>...</servlet> </web-app>"
  },
  {
    question: "Where must web.xml be placed in a standard web application structure?",
    shortAnswer: "Directly inside the WEB-INF directory of the web application.",
    explanation: "The container looks for configuration files only in that exact location.",
    hint: "Remember WEB-INF is a special protected folder.",
    level: "basic"
  },
  // ... (28 more questions)
];

export default questions;