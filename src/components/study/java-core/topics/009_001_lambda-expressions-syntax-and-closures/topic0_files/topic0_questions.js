const topic0_questions = [
  {
    "question": "How did Java 8 unify Object-Oriented Programming (OOP) with Declarative Functional Programming?",
    "shortAnswer": "Before Java 8, Java was purely object-centric: to pass a piece of executable behavior to a method, developers had to wrap it inside an object (e.g. an Anonymous Inner Class). Java 8 introduced 'Lambda Expressions' and 'Functional Interfaces', enabling 'Behavior Parameterization'. Functions became first-class citizens that can be passed directly as method arguments, returned from functions, and assigned to variables, unifying OOP modeling with declarative, immutable functional data pipelines (Streams).",
    "explanation": "Foundational philosophy of Java 8 functional programming revolution.",
    "hint": "Treats code/behavior as data (behavior parameterization) without abandoning OOP classes and objects.",
    "level": "Beginner",
    "codeExample": "list.filter(mark → mark >= 50); // Lambda passed as behavior parameter"
  }
];

export default topic0_questions;