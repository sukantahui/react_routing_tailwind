const topic6_questions = [
  {
    "question": "What is the key difference between Mockito.mock() and Mockito.spy()?",
    "shortAnswer": "mock() creates a complete dummy object where all un-stubbed methods return default values (null, 0, false); spy() wraps a real object where un-stubbed methods execute real business logic while still allowing verification and partial stubbing.",
    "explanation": "Mock vs Spy execution behavior.",
    "hint": "Mock returns defaults; Spy executes real implementation unless stubbed.",
    "level": "Intermediate",
    "codeExample": "List<String> spyList = Mockito.spy(new ArrayList<>());"
  },
  {
    "question": "When should you use a Fake instead of a Mock?",
    "shortAnswer": "Use a Fake (e.g. In-Memory Repository) when testing complex multi-step workflows where simulating state changes across dozens of mock method stubs becomes brittle and tedious to maintain.",
    "explanation": "Fakes simplify stateful integration scenarios.",
    "hint": "For stateful workflows where stubbing every method becomes overly complex.",
    "level": "Intermediate",
    "codeExample": "InMemoryUserRepository fakeRepo = new InMemoryUserRepository();"
  }
];

export default topic6_questions;
