const questions = [
  {
    id: 1,
    question: "Which of the following is NOT a characteristic of a project?",
    options: [
      "Projects are perpetual and have no boundaries",
      "Projects have a definite beginning and end",
      "Projects have finite resources",
      "Projects create a unique deliverable"
    ],
    correctAnswer: 0,
    explanation: "Projects are NEVER perpetual or boundary-less. Perpetual, routine activities without defined ends are ongoing operations, not projects.",
    marks: 1,
    hint: "Identify the false claim: projects always have boundaries and are never perpetual."
  },
  {
    id: 2,
    question: "Why is 'Infinite Funding and Resources' NOT a valid project characteristic?",
    options: [
      "Because every project in the real world is constrained by a finite budget and allocated resources",
      "Because software projects do not cost any money",
      "Because projects only use free open-source software",
      "Because developers work for free"
    ],
    correctAnswer: 0,
    explanation: "Real-world projects operate under strictly finite financial, human, hardware, and temporal constraints.",
    marks: 1,
    hint: "Resources are always finite and budgeted."
  },
  {
    id: 3,
    question: "Which statement is FALSE regarding project boundaries?",
    options: [
      "Projects have no boundaries and can incorporate unlimited customer requests without change orders",
      "Projects have distinct boundaries defining in-scope versus out-of-scope items",
      "Project boundaries protect the team from scope creep",
      "Project boundaries establish clear contractual responsibilities"
    ],
    correctAnswer: 0,
    explanation: "Projects strictly require distinct boundaries. Incorporating unlimited customer requests without control leads to project failure through scope creep.",
    marks: 1,
    hint: "Uncontrolled scope expansion without boundaries is a project failure mode."
  },
  {
    id: 4,
    question: "What term describes the uncontrolled growth or expansion of project scope without adjustments to time, cost, and resources?",
    options: [
      "Scope Creep",
      "Agile Acceleration",
      "Data Normalization",
      "Multithreading"
    ],
    correctAnswer: 0,
    explanation: "'Scope Creep' is the term used in project management when new features and requirements are added continuously without corresponding increases in budget or timeline.",
    marks: 1,
    hint: "Creeping expansion of scope."
  },
  {
    id: 5,
    question: "Which of the following activities is an Ongoing Operation rather than a Project?",
    options: [
      "Daily processing of student cafeteria meal transactions",
      "Developing a new Cafeteria Billing System for the school",
      "Migrating school records to a new MySQL database",
      "Designing a mobile application for school sports day results"
    ],
    correctAnswer: 0,
    explanation: "Daily transaction processing is repetitive and ongoing (operations), whereas developing new systems or migrating databases are temporary endeavors with unique deliverables (projects).",
    marks: 1,
    hint: "Repetitive daily routine vs new temporary system build."
  }
];

export default questions;
