const topic10_questions = [
  {
    "question": "How do 'StringReader' and 'StringWriter' enable high-performance interoperability between Java String manipulation and Stream-based APIs?",
    "shortAnswer": "'StringReader' wraps an existing Java String as a 'Reader' source, allowing strings to be passed seamlessly to parser libraries (XML, JSON, CSV) expecting stream inputs. 'StringWriter' uses an internal StringBuffer as a 'Writer' sink, allowing complex stream-based formatters (like PrintWriter) to construct strings without disk or socket overhead.",
    "explanation": "Essential for JSON/XML serialization libraries (Jackson, Gson, JAXB).",
    "hint": "StringReader turns Strings into Readers; StringWriter captures Writer stream output into a String.",
    "level": "Advanced",
    "codeExample": "StringWriter sw = new StringWriter(); ex.printStackTrace(new PrintWriter(sw)); String trace = sw.toString();"
  }
];

export default topic10_questions;