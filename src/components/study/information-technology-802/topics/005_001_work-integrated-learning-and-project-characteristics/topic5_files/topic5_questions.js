const questions = [
  {
    id: 1,
    question: "What is the correct sequential order of the 6 Project Life Cycle Phases in standard software engineering?",
    options: [
      "Conception -> Requirement Definition -> Design -> Implementation -> Testing -> Deployment",
      "Deployment -> Testing -> Design -> Conception -> Implementation -> Requirement Definition",
      "Implementation -> Testing -> Conception -> Design -> Deployment -> Requirement Definition",
      "Conception -> Deployment -> Testing -> Design -> Implementation -> Requirement Definition"
    ],
    correctAnswer: 0,
    explanation: "The standard Software Development Life Cycle (SDLC) flows through Conception -> Requirement Definition (Analysis) -> Design -> Implementation (Coding) -> Testing -> Deployment (Delivery & Maintenance).",
    marks: 1,
    hint: "Idea first (Conception), then Requirements, Design, Coding (Implementation), Testing, and Launch (Deployment)."
  },
  {
    id: 2,
    question: "During which project phase is the Software Requirement Specification (SRS) document created?",
    options: [
      "Requirement Definition (Analysis) Phase",
      "Implementation (Coding) Phase",
      "Deployment Phase",
      "Testing Phase"
    ],
    correctAnswer: 0,
    explanation: "The SRS document is prepared during the Requirement Definition / Analysis phase after interviewing users and gathering functional/non-functional needs.",
    marks: 1,
    hint: "Requirement gathering and specification documentation phase."
  },
  {
    id: 3,
    question: "In which project phase are Entity-Relationship (ER) Diagrams, Database Schemas, and UI Wireframes designed?",
    options: [
      "Design Phase",
      "Conception Phase",
      "Implementation Phase",
      "Deployment Phase"
    ],
    correctAnswer: 0,
    explanation: "The Design phase translates requirements into technical architectures, ER diagrams, database normalization models, and user interface wireframes.",
    marks: 1,
    hint: "Architectural blueprint and schema modeling phase."
  },
  {
    id: 4,
    question: "What primary activity takes place during the Implementation phase of an IT 802 capstone project?",
    options: [
      "Writing Java code, building GUI forms in NetBeans/IDE, and creating MySQL tables with DDL/DML",
      "Interviewing school principals about project feasibility",
      "Packaging the software for production distribution",
      "Writing user manual guides"
    ],
    correctAnswer: 0,
    explanation: "The Implementation phase involves the actual programming, writing Java source code, creating MySQL tables, and integrating software components.",
    marks: 1,
    hint: "Coding and physical database construction phase."
  },
  {
    id: 5,
    question: "What is the primary objective of the Testing phase before deployment?",
    options: [
      "To detect, log, and fix defects (bugs) and verify that software satisfies all requirements specified in the SRS",
      "To re-write the entire project from scratch in a new language",
      "To delete all database records",
      "To increase the price of the project"
    ],
    correctAnswer: 0,
    explanation: "Testing verifies software quality, ensuring bug-free execution, boundary-value validity, security, and strict conformance to initial requirements.",
    marks: 1,
    hint: "Defect discovery and requirement verification."
  }
];

export default questions;
