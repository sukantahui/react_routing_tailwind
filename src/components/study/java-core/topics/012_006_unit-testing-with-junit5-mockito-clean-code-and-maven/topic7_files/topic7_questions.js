const topic7_questions = [
  {
    "question": "How does Mockito decide how to inject mocks into an @InjectMocks target class?",
    "shortAnswer": "Mockito attempts injection in order: 1) Constructor injection (preferred), 2) Property setter injection, 3) Field reflection injection.",
    "explanation": "Mockito injection resolution hierarchy.",
    "hint": "Constructor injection first, then setter injection, then field injection.",
    "level": "Intermediate",
    "codeExample": "@InjectMocks private OrderService service;"
  },
  {
    "question": "What happens if you forget to add @ExtendWith(MockitoExtension.class) to your JUnit 5 test class?",
    "shortAnswer": "The fields annotated with @Mock and @InjectMocks remain null, resulting in NullPointerException as soon as a test method attempts to access them.",
    "explanation": "Lifecycle extension initialization requirement.",
    "hint": "Mocks are never initialized and remain null, causing NullPointerException.",
    "level": "Beginner",
    "codeExample": "@ExtendWith(MockitoExtension.class)"
  }
];

export default topic7_questions;
