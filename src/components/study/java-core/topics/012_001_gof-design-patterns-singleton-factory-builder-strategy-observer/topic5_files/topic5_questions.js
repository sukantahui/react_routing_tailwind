const topic5_questions = [
  {
    "question": "How does the Abstract Factory pattern differ from the Factory Method pattern?",
    "shortAnswer": "Factory Method produces a single product type via subclass inheritance, whereas Abstract Factory defines an interface for creating an entire family of multiple related or dependent product objects via composition.",
    "explanation": "Single product creation vs product family creation.",
    "hint": "Abstract Factory creates families of related objects; Factory Method creates a single product.",
    "level": "Intermediate",
    "codeExample": "GUIFactory creates Button AND Checkbox family."
  },
  {
    "question": "What is an example of the Abstract Factory pattern in the standard Java runtime library?",
    "shortAnswer": "javax.xml.parsers.DocumentBuilderFactory.newInstance() and javax.xml.transform.TransformerFactory.newInstance().",
    "explanation": "Creates families of XML document parsing and transformation engines.",
    "hint": "DocumentBuilderFactory and TransformerFactory.",
    "level": "Intermediate",
    "codeExample": "DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();"
  }
];

export default topic5_questions;
