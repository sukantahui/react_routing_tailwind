// topic15_questions.js
const questions = [
  {
    question: "What does JAX‑RS stand for?",
    shortAnswer: "Java API for RESTful Web Services",
    explanation: "A specification for building REST APIs in Java using annotations.",
    level: "basic"
  },
  {
    question: "What is the most common implementation of JAX‑RS?",
    shortAnswer: "Jersey (reference implementation)",
    explanation: "Other implementations include RESTEasy, Apache CXF.",
    level: "basic"
  },
  {
    question: "Which annotation marks a class as a REST resource?",
    shortAnswer: "@Path",
    explanation: "Defines the base URI for the resource.",
    level: "basic",
    codeExample: "@Path(\"/books\") public class BookResource { ... }"
  },
  {
    question: "Which annotation specifies the HTTP method for a method?",
    shortAnswer: "@GET, @POST, @PUT, @DELETE, etc.",
    explanation: "Correspond to HTTP verbs.",
    level: "basic"
  },
  {
    question: "How do you extract a variable from the URI path?",
    shortAnswer: "@PathParam",
    explanation: "Example: @Path(\"/users/{id}\") public User get(@PathParam(\"id\") int id)",
    level: "intermediate"
  },
  {
    question: "What annotation extracts query parameters?",
    shortAnswer: "@QueryParam",
    explanation: "e.g., /search?q=jersey -> @QueryParam(\"q\") String query",
    level: "intermediate"
  },
  {
    question: "What is the purpose of @Produces?",
    shortAnswer: "Specifies the media type(s) the method can return.",
    explanation: "Common values: MediaType.APPLICATION_JSON, TEXT_PLAIN.",
    level: "basic"
  },
  {
    question: "What does @Consumes do?",
    shortAnswer: "Specifies the media type the method can accept (request body).",
    explanation: "e.g., @Consumes(MediaType.APPLICATION_JSON)",
    level: "basic"
  },
  {
    question: "How do you return a custom HTTP status code?",
    shortAnswer: "Use javax.ws.rs.core.Response.",
    explanation: "Response.status(Status.CREATED).entity(obj).build()",
    level: "intermediate"
  },
  {
    question: "What dependency is needed for JSON support in Jersey?",
    shortAnswer: "jersey-media-json-jackson (or jersey-media-moxy)",
    explanation: "Add to pom.xml or classpath.",
    level: "advanced"
  },
  // ... (20 more questions – similar depth)
];
export default questions;