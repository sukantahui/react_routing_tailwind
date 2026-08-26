const topic9_questions = [
  {
    "question": "When should you use ArgumentCaptor instead of simple assertEquals()?",
    "shortAnswer": "Use ArgumentCaptor when testing methods where the object passed to a dependency is instantiated or modified internally inside the method under test, making it impossible to pass as an expected reference beforehand.",
    "explanation": "Capturing internally constructed arguments.",
    "hint": "Captures objects constructed internally inside the class under test.",
    "level": "Intermediate",
    "codeExample": "ArgumentCaptor<Email> captor = ArgumentCaptor.forClass(Email.class);"
  },
  {
    "question": "What is the purpose of Mockito.verifyNoMoreInteractions(mock)?",
    "shortAnswer": "It asserts that no other unexpected interactions or method calls occurred on the mock beyond the ones explicitly verified earlier in the test.",
    "explanation": "Strict interaction enforcement.",
    "hint": "Guarantees no un-verified calls were made to the mock.",
    "level": "Intermediate",
    "codeExample": "verifyNoMoreInteractions(auditMock);"
  }
];

export default topic9_questions;
