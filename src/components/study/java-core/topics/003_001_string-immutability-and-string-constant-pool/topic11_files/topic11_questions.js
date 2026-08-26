const topic11_questions = [
  {
    question: "How do 'String.split()' and 'String.join()' work together for data serialization?",
    shortAnswer: "'split(regex)' tokenizes a delimited string into a 'String[]' array based on a regular expression. 'String.join(delimiter, elements)' joins array elements or iterables into a single delimited string.",
    explanation: "String.join eliminates the classic trailing comma loop bug.",
    hint: "split tokenizes delimited strings; join concatenates with delimiters without trailing bugs.",
    level: "Beginner",
    codeExample: "String[] parts = csv.split(\",\");\nString joined = String.join(\", \", parts);"
  }
];

export default topic11_questions;
