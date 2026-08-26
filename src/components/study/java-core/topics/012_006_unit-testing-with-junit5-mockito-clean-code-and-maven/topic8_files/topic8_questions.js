const topic8_questions = [
  {
    "question": "Why does Mockito require doThrow().when(mock).method() for void methods instead of when(mock.voidMethod())?",
    "shortAnswer": "Because void methods return nothing, so placing mock.voidMethod() inside when(...) is a Java compiler syntax error. The doThrow().when() syntax accommodates void method invocation.",
    "explanation": "Java compiler limitation for void return types.",
    "hint": "Void methods return nothing, making when(voidMethod()) illegal Java syntax.",
    "level": "Intermediate",
    "codeExample": "doThrow(new RuntimeException()).when(mock).sendEmail();"
  },
  {
    "question": "What is the rule when using Mockito argument matchers (like anyString() or eq())?",
    "shortAnswer": "If you use an argument matcher for one argument in a method call, ALL arguments for that method invocation must use argument matchers (using eq() for exact constants).",
    "explanation": "Mockito argument matcher consistency rule.",
    "hint": "Either all arguments are matchers or all are exact values.",
    "level": "Intermediate",
    "codeExample": "when(service.process(eq(\"USER\"), anyInt())).thenReturn(true);"
  }
];

export default topic8_questions;
