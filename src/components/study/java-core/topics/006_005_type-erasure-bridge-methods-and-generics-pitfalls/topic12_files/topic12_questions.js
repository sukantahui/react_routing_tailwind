const topic12_questions = [
  {
    "question": "Why does declaring 'public void print(List<String> l)' and 'public void print(List<Integer> l)' in the same class trigger a compilation error?",
    "shortAnswer": "Because type erasure strips the generic parameters '<String>' and '<Integer>', causing both methods to erase to the exact same bytecode signature: 'public void print(java.util.List)'. In the JVM classfile specification, having two methods with the identical name and parameter descriptors within the same class is illegal.",
    "explanation": "Standard compiler name clash diagnostic under type erasure.",
    "hint": "Both signatures erase to 'print(List)', producing a method name/parameter clash in bytecode.",
    "level": "Intermediate",
    "codeExample": "// void process(List<String> a) and void process(List<Integer> b) → Compile error: name clash"
  }
];

export default topic12_questions;