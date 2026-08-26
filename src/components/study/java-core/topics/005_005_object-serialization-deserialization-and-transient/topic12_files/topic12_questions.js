const topic12_questions = [
  {
    "question": "Why is deserializing untrusted data considered one of the most critical security vulnerabilities (CWE-502 / OWASP Top 10), and how does 'ObjectInputFilter' resolve it?",
    "shortAnswer": "Untrusted serialized data can contain malicious 'Gadget Chains' (nested classes whose readObject methods execute arbitrary operating system commands, leading to Remote Code Execution). Java 9 introduced 'ObjectInputFilter', allowing developers to enforce strict allowlists of permissible classes, maximum stream depths, and array sizes before any class bytecode is instantiated.",
    "explanation": "Effective Java Item 85: Prefer alternatives to Java serialization (JSON, Protocol Buffers).",
    "hint": "Untrusted bytes can trigger Remote Code Execution via gadget chains; ObjectInputFilter enforces class allowlists.",
    "level": "Advanced",
    "codeExample": "ois.setObjectInputFilter(ObjectInputFilter.Config.createFilter(\"com.app.Model;!*\"));"
  }
];

export default topic12_questions;