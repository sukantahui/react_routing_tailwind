const topic11_questions = [
  {
    "question": "What is a 'Wildcard Capture Error' (e.g. 'capture#1-of ? cannot be converted to...'), and how is it resolved?",
    "shortAnswer": "A Wildcard Capture Error occurs when code attempts to set an element read from 'List<?>' back into the same list ('list.set(i, list.get(j))'). The compiler creates an anonymous captured type ('CAP#1') and cannot prove that the read type matches the write constraint. The canonical solution is to create a private generic helper method '<T> void helper(List<T> list)' that binds the wildcard to a concrete named type variable 'T'.",
    "explanation": "Effective Java Item 31: Use a private helper method to capture wildcards.",
    "hint": "Create a private generic helper method '<T> void helper(List<T> list)' to capture the anonymous wildcard type.",
    "level": "Advanced",
    "codeExample": "public void swap(List<?> l) { swapHelper(l); } private <T> void swapHelper(List<T> l) { ... }"
  }
];

export default topic11_questions;