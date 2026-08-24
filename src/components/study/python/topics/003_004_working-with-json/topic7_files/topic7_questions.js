// src/components/study/python/topics/003_004_working-with-json/topic7_files/topic7_questions.js
// Comprehensive Master Review Questions for Topic 7: Validating and sanitizing JSON data schemas

const questions = [
  {
    question: "What is JSON Schema and what problem does it solve?",
    shortAnswer: "JSON Schema is an IETF declarative standard used to define the structural contract, expected types, and validation constraints of JSON documents, preventing corrupt or malicious data from reaching business logic.",
    explanation: "The official contract definition language for JSON data.",
    hint: "Declarative standard for defining JSON structure, types, and validation rules.",
    level: "basic",
    codeExample: '{"type": "object", "required": ["id"], "properties": {"id": {"type": "string"}}}'
  },
  {
    question: "What is the difference between 'jsonschema.exceptions.ValidationError' and 'jsonschema.exceptions.SchemaError'?",
    shortAnswer: "'ValidationError' is raised when the JSON payload violates the schema rules; 'SchemaError' is raised when the schema itself is syntactically invalid or malformed.",
    explanation: "Differentiates bad data from bad schema definitions.",
    hint: "ValidationError = invalid payload; SchemaError = malformed schema definition.",
    level: "moderate",
    codeExample: "# ValidationError (bad data) vs SchemaError (bad schema)"
  },
  {
    question: "Why should you set '\"additionalProperties\": False' in your JSON Schema definitions?",
    shortAnswer: "It rejects any unexpected or undeclared fields in incoming JSON payloads, preventing Mass Assignment vulnerabilities and schema pollution attacks.",
    explanation: "Crucial defense-in-depth security setting.",
    hint: "Rejects unexpected extra keys to prevent mass assignment vulnerabilities.",
    level: "moderate",
    codeExample: '"additionalProperties": False'
  },
  {
    question: "How do you enforce that a JSON string matches an email format in JSON Schema?",
    shortAnswer: "By specifying '\"format\": \"email\"' (or using a regex pattern '\"pattern\": \"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\\\.[a-zA-Z0-9-.]+$\"').",
    explanation: "Standard string format validation in JSON Schema.",
    hint: "Use format: 'email' or pattern: '<regex>'.",
    level: "basic",
    codeExample: '"email": {"type": "string", "format": "email"}'
  },
  {
    question: "How do you constrain a numeric field to a specific range (e.g. 10000 to 100000) in JSON Schema?",
    shortAnswer: "Using the 'minimum' and 'maximum' keywords: '\"tuition_fee\": {\"type\": \"number\", \"minimum\": 10000, \"maximum\": 100000}'.",
    explanation: "Defines inclusive numeric boundary constraints.",
    hint: "Use minimum and maximum keywords.",
    level: "basic",
    codeExample: '"fee": {"type": "number", "minimum": 10000, "maximum": 100000}'
  },
  {
    question: "How do you restrict a string value to a set of allowed choices (e.g. course codes) in JSON Schema?",
    shortAnswer: "Using the 'enum' keyword: '\"course\": {\"type\": \"string\", \"enum\": [\"PY-AI\", \"DS-ML\", \"FULL-STACK\"]}'.",
    explanation: "Restricts values to explicit enumerations.",
    hint: "Use the enum: [...] keyword.",
    level: "basic",
    codeExample: '"course": {"type": "string", "enum": ["PY-AI", "DS-ML"]}'
  },
  {
    question: "How does Pydantic compare to the 'jsonschema' package for Python applications?",
    shortAnswer: "'jsonschema' validates raw dictionaries against JSON Schema specifications; Pydantic parses dictionaries directly into type-safe Python class instances with automatic type coercion, IDE autocompletion, and high-performance Rust validation (Pydantic v2).",
    explanation: "Pydantic combines validation with object instantiation and coercion.",
    hint: "Pydantic provides automatic type coercion and produces strongly typed Python objects.",
    level: "moderate",
    codeExample: "class Student(BaseModel):\n    id: str\n    fee: float"
  },
  {
    question: "What is 'Type Coercion' in schema validation frameworks?",
    shortAnswer: "The automatic conversion of compatible types, such as converting a numeric string '\"28500.50\"' into a Python 'float' or 'Decimal', or converting '\"true\"' into a boolean 'True'.",
    explanation: "Simplifies handling strings submitted by HTML forms and query strings.",
    hint: "Automatically converting strings to target types like int, float, or bool.",
    level: "basic",
    codeExample: "# Coerces '28500' -> 28500"
  },
  {
    question: "How do you sanitize malicious HTML / XSS `<script>` tags from user-submitted JSON strings in Python?",
    shortAnswer: "By stripping tags using regex 're.sub(r\"<[^>]*>\", \"\", text)' and escaping special entities using 'html.escape(text.strip())'.",
    explanation: "Standard input sanitization before storing text in databases.",
    hint: "Use re.sub to strip tags and html.escape() to encode HTML entities.",
    level: "basic",
    codeExample: "import html\nclean_text = html.escape(raw_input.strip())"
  },
  {
    question: "How do you validate array length and item uniqueness in JSON Schema?",
    shortAnswer: "Using 'minItems', 'maxItems', and '\"uniqueItems\": True': '\"badges\": {\"type\": \"array\", \"minItems\": 1, \"uniqueItems\": True}'.",
    explanation: "Enforces array count bounds and prohibits duplicate elements.",
    hint: "Use minItems, maxItems, and uniqueItems: True.",
    level: "moderate",
    codeExample: '"badges": {"type": "array", "minItems": 1, "uniqueItems": True}'
  },
  {
    question: "How do you define optional fields with default values in JSON Schema?",
    shortAnswer: "Exclude the field from the root '\"required\": [...]' list and define a '\"default\": value' property inside the field's property specification.",
    explanation: "Optional fields with standard default assignments.",
    hint: "Omit from 'required' list and specify 'default': value.",
    level: "basic",
    codeExample: '"status": {"type": "string", "default": "PENDING"}'
  },
  {
    question: "How can you validate all errors in a JSON document at once instead of failing on the first error?",
    shortAnswer: "Using 'Draft202012Validator(schema).iter_errors(instance)' in the 'jsonschema' package, which yields every validation violation across the document.",
    explanation: "Enables comprehensive form error reports in a single pass.",
    hint: "Use validator.iter_errors(data) to collect all errors in a single pass.",
    level: "complex",
    codeExample: "for err in validator.iter_errors(data): print(err.message)"
  },
  {
    question: "What is the '$ref' keyword in JSON Schema?",
    shortAnswer: "A reference pointer (e.g. '\"$ref\": \"#/$defs/Address\"') that allows reusing modular sub-schemas across different parts of a larger schema.",
    explanation: "Enables DRY (Don't Repeat Yourself) schema composition.",
    hint: "References reusable sub-schema definitions (like #/$defs/MyModel).",
    level: "complex",
    codeExample: '"billing_address": {"$ref": "#/$defs/Address"}'
  },
  {
    question: "How do you validate that a field is either of two types (e.g. number or null) in JSON Schema?",
    shortAnswer: "By passing a list of types to the 'type' keyword: '\"discount\": {\"type\": [\"number\", \"null\"]}'.",
    explanation: "Allows nullable types in JSON Schema.",
    hint: "Pass a list of allowed types: type: ['number', 'null'].",
    level: "basic",
    codeExample: '"score": {"type": ["number", "null"]}'
  },
  {
    question: "What is 'Cerberus' or 'Marshmallow' in Python?",
    shortAnswer: "Popular third-party Python validation libraries providing pure-Python schema definition syntax and serialization/deserialization pipelines.",
    explanation: "Alternative schema validation libraries in the Python ecosystem.",
    hint: "Alternative Python schema validation and serialization libraries.",
    level: "moderate",
    codeExample: "# from marshmallow import Schema, fields"
  },
  {
    question: "How do you prevent Denial of Service (ReDoS) when using regex patterns in JSON Schema?",
    shortAnswer: "Avoid catastrophic backtracking patterns (e.g. nested quantifiers like '(a+)+$') and keep regular expressions anchored, simple, and linear in complexity.",
    explanation: "Security best practice for regex schema validation.",
    hint: "Avoid nested quantifiers to prevent ReDoS CPU exhaustion.",
    level: "complex",
    codeExample: "# Safe linear regex: ^[a-zA-Z0-9_-]+$"
  },
  {
    question: "How do you validate conditional schemas (e.g. IF type is 'COMPANY', THEN require 'tax_id') in JSON Schema?",
    shortAnswer: "Using the 'if', 'then', 'else' keywords in Draft 7 / Draft 2020-12 schema specifications.",
    explanation: "Conditional branching logic in JSON Schema contracts.",
    hint: "Use 'if', 'then', 'else' keywords in JSON Schema.",
    level: "complex",
    codeExample: '{"if": {"properties": {"type": {"const": "CORP"}}}, "then": {"required": ["tax_id"]}}'
  },
  {
    question: "How do you isolate invalid records during batch processing without crashing the entire pipeline?",
    shortAnswer: "By implementing a Quarantine pattern: validate each record individually, routing valid records to the approved queue and storing rejected records alongside their validation errors in a quarantine list.",
    explanation: "Essential for robust batch data ingestion pipelines.",
    hint: "Quarantine pattern: route valid records to database, quarantine rejected records with error logs.",
    level: "moderate",
    codeExample: "if errs: quarantine.append((item, errs))\nelse: approved.append(item)"
  },
  {
    question: "What is the danger of trusting client-side schema validation alone?",
    shortAnswer: "Client-side validation can be bypassed easily via curl, Postman, or malicious browser scripts; backend server-side validation is mandatory for security.",
    explanation: "Never trust client-side validation alone.",
    hint: "Clients can bypass browser checks; backend validation is mandatory.",
    level: "basic",
    codeExample: "# Always validate on backend!"
  },
  {
    question: "How do you sanitize control characters and null bytes ('\\x00') from incoming JSON strings?",
    shortAnswer: "Using regex: 're.sub(r'[\x00-\x1f\x7f-\x9f]', '', text)'.",
    explanation: "Prevents null-byte injection attacks in file systems and C-extensions.",
    hint: "Strip non-printable control characters and null bytes using regex.",
    level: "complex",
    codeExample: "clean = re.sub(r'[\x00-\x1f]', '', raw_text)"
  },
  {
    question: "How do you validate date-time strings strictly in JSON Schema?",
    shortAnswer: "Using '\"format\": \"date-time\"' (ISO 8601 representation like '2026-08-24T10:30:00Z').",
    explanation: "Standard ISO timestamp validation.",
    hint: "Use format: 'date-time' for ISO 8601 strings.",
    level: "basic",
    codeExample: '"created_at": {"type": "string", "format": "date-time"}'
  },
  {
    question: "How does FastAPI leverage Pydantic models for JSON validation?",
    shortAnswer: "FastAPI automatically validates incoming JSON request bodies against Pydantic model schemas, returns HTTP 422 Unprocessable Entity with detailed field errors on failure, and auto-generates OpenAPI docs.",
    explanation: "The core architecture of FastAPI REST microservices.",
    hint: "Auto-validates bodies, returns 422 on failure, and creates OpenAPI docs.",
    level: "moderate",
    codeExample: "@app.post('/admit')\ndef admit(student: StudentModel): return student"
  },
  {
    question: "How do you test schema validation logic using 'pytest'?",
    shortAnswer: "By writing test cases with parameterized golden valid payloads (asserting zero errors) and boundary-breaking invalid payloads (asserting specific error types and messages).",
    explanation: "Standard automated unit testing pattern.",
    hint: "Use pytest with valid and invalid payloads to test error detection.",
    level: "moderate",
    codeExample: "def test_schema_rejects_negative_fee(): assert validate({'fee': -10}) == False"
  },
  {
    question: "What is the difference between data validation and data sanitization?",
    shortAnswer: "Validation verifies that incoming data satisfies structural and logical rules (rejecting if invalid); Sanitization cleanses or transforms potentially unsafe data (e.g. stripping HTML or trimming whitespace) into a safe form.",
    explanation: "Complementary defense-in-depth data engineering stages.",
    hint: "Validation checks rules and rejects; Sanitization cleans and transforms data safely.",
    level: "basic",
    codeExample: "# Validate -> Reject; Sanitize -> Clean"
  },
  {
    question: "What is the ultimate golden rule for JSON Schema Validation & Sanitization in Python?",
    shortAnswer: "Define strict declarative contracts with 'additionalProperties: False', validate payloads at the API entry point, sanitize all string inputs against HTML/XSS injections, and isolate invalid records in a quarantined audit log without crashing the application.",
    explanation: "The complete enterprise standard for robust, secure JSON API development.",
    hint: "Strict schema contracts, entry-point validation, XSS sanitization, and quarantined audit logs.",
    level: "basic",
    codeExample: "# Python JSON Schema Validation Mastery"
  }
];

export default questions;
