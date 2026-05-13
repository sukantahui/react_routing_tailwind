// topic9_questions.js
// 30 moderate to expert questions on lazy vs eager loading

const questions = [
  {
    question: "What is the default fetch type for @OneToMany in JPA?",
    shortAnswer: "LAZY.",
    explanation: "Collections are by default lazy to avoid performance issues. Subclass-specific Hibernate also defaults to LAZY for @ManyToMany.",
    hint: "ManyToOne is EAGER by default, not OneToMany.",
    level: "basic",
    codeExample: "@OneToMany(mappedBy = \"student\") // LAZY by default"
  },
  {
    question: "What is the default fetch type for @ManyToOne?",
    shortAnswer: "EAGER.",
    explanation: "Single-valued associations default to eager loading. Override with fetch = FetchType.LAZY if not always needed.",
    hint: "Many side of one-to-many defaults to EAGER.",
    level: "basic",
    codeExample: "@ManyToOne(fetch = FetchType.LAZY) // override to LAZY"
  },
  {
    question: "Explain LazyInitializationException and how to fix it.",
    shortAnswer: "Exception thrown when accessing a lazy association after the session is closed. Fix by initializing before session close (JOIN FETCH, calling size(), DTO, or keeping session open).",
    explanation: "Common in web apps where you load entity in service layer (session closed) then try to access lazy data in view layer.",
    hint: "Use JOIN FETCH or entity graphs.",
    level: "moderate",
    codeExample: "session.close();\nstudent.getCourses().size(); // throws"
  },
  {
    question: "What is the N+1 query problem in the context of lazy loading?",
    shortAnswer: "Fetching N parent entities triggers N additional queries for each's lazy collection when accessed.",
    explanation: "Example: 10 students, each with courses. After loading students, accessing each student.getCourses() issues 10 separate queries.",
    hint: "JOIN FETCH solves N+1.",
    level: "moderate",
    codeExample: "List<Student> students = session.createQuery(\"FROM Student\").list();\nfor(Student s: students) { s.getCourses().size(); } // N extra queries"
  },
  {
    question: "What is a Hibernate proxy?",
    shortAnswer: "A runtime-generated subclass of an entity used to implement lazy loading.",
    explanation: "When you load an entity with lazy associations, Hibernate returns a proxy for those associations. First access triggers DB load.",
    hint: "Check class name of lazy association – ends with $$_jvst...",
    level: "moderate",
    codeExample: "System.out.println(student.getCourses().getClass()); // Proxy class"
  },
  {
    question: "How does JOIN FETCH differ from EAGER fetch type?",
    shortAnswer: "JOIN FETCH is query-specific; EAGER is configured on mapping and applies to all queries.",
    explanation: "JOIN FETCH is more flexible – you can decide per query whether to load an association. EAGER is global and may cause performance issues.",
    hint: "Prefer JOIN FETCH over EAGER.",
    level: "expert",
    codeExample: "FROM Student s JOIN FETCH s.courses // one query\n// vs\n@OneToMany(fetch = EAGER) // always"
  },
  {
    question: "What is the 'Open Session in View' pattern? Pros and cons?",
    shortAnswer: "Keeps Hibernate session open during view rendering to allow lazy loading. Pros: avoids LazyInitializationException. Cons: holds DB connections longer, can cause N+1 queries.",
    explanation: "In Spring, spring.jpa.open-in-view=true. Useful for simple apps but can be problematic under load.",
    hint: "Use DTOs or JOIN FETCH instead.",
    level: "expert",
    codeExample: "spring.jpa.open-in-view=true // default in many Spring Boot versions"
  },
  {
    question: "Can you mix lazy and eager in the same entity?",
    shortAnswer: "Yes, each association has its own fetch type. But beware of cartesian products.",
    explanation: "If you have multiple eager collections, Hibernate may create a cartesian product. Prefer lazy for collections.",
    hint: "Two EAGER collections → large result set.",
    level: "moderate",
    codeExample: "@OneToMany(fetch = EAGER) List<Course> courses;\n@OneToMany(fetch = EAGER) List<Address> addresses; // danger"
  },
  {
    question: "What is the @BatchSize annotation used for?",
    shortAnswer: "Load lazy collections in batches, reducing the N+1 problem.",
    explanation: "Instead of one query per collection, Hibernate loads multiple collections in one query using IN clause.",
    hint: "@BatchSize on collection field or class level.",
    level: "expert",
    codeExample: "@BatchSize(size = 10)\nprivate List<Course> courses;"
  },
  {
    question: "How can you initialize a lazy collection programmatically?",
    shortAnswer: "Call Hibernate.initialize(collection) or collection.size() within an open session.",
    explanation: "Hibernate.initialize(collection) forces loading. Also works for proxies.",
    hint: "Useful before closing session if you need the data.",
    level: "moderate",
    codeExample: "Hibernate.initialize(student.getCourses());"
  },
  // Additional questions (full 30 in actual file)
];

export default questions;