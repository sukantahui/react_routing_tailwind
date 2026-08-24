// src/components/study/python/topics/003_004_working-with-json/topic4_files/topic4_questions.js
// Comprehensive Master Review Questions for Topic 4: Handling custom Python objects with custom JSONEncoders & object_hook

const questions = [
  {
    question: "Why does serializing a custom Python class with 'json.dumps(obj)' raise a 'TypeError' by default?",
    shortAnswer: "Because Python's standard 'JSONEncoder' only knows how to serialize built-in primitive types (dict, list, tuple, str, int, float, bool, None) and lacks knowledge of custom class attributes.",
    explanation: "Custom classes must be transformed into primitive serializable dictionaries.",
    hint: "Standard JSONEncoder only supports primitive types by default.",
    level: "basic",
    codeExample: "class Student: pass\njson.dumps(Student()) # TypeError: Object of type Student is not JSON serializable"
  },
  {
    question: "How do you subclass 'json.JSONEncoder' to support custom Python objects?",
    shortAnswer: "By creating a subclass and overriding the 'default(self, o)' method to return a serializable representation (or call 'super().default(o)').",
    explanation: "The standard OOP extension point for Python JSON serialization.",
    hint: "Subclass json.JSONEncoder and override the default(self, o) method.",
    level: "basic",
    codeExample: "class MyEncoder(json.JSONEncoder):\n    def default(self, o):\n        if isinstance(o, MyClass): return o.__dict__\n        return super().default(o)"
  },
  {
    question: "Why is calling 'return super().default(o)' at the end of custom 'default()' mandatory?",
    shortAnswer: "Calling 'super().default(o)' ensures that objects not handled by your custom encoder raise the standard 'TypeError: Object of type ... is not JSON serializable' instead of returning None or corrupting output.",
    explanation: "Maintains standard Python exception semantics.",
    hint: "Ensures unhandled types raise the standard TypeError.",
    level: "basic",
    codeExample: "return super().default(o) # Standard fallback"
  },
  {
    question: "How do you apply a custom JSONEncoder subclass to 'json.dumps()' or 'json.dump()'?",
    shortAnswer: "By passing the class to the 'cls' keyword argument: 'json.dumps(data, cls=MyEncoder)'.",
    explanation: "Instantiates and uses your custom encoder for the serialization session.",
    hint: "Pass cls=MyEncoder to json.dumps() or json.dump().",
    level: "basic",
    codeExample: "json.dumps(student_record, cls=EnterpriseJSONEncoder)"
  },
  {
    question: "What is the alternative to subclassing 'JSONEncoder' for simple serialization of custom objects?",
    shortAnswer: "Passing a standalone serializer function to the 'default' parameter: 'json.dumps(data, default=my_serializer_func)'.",
    explanation: "Lightweight alternative for quick functional serialization.",
    hint: "Pass a function to the default= parameter in json.dumps().",
    level: "basic",
    codeExample: "json.dumps(data, default=lambda o: o.isoformat() if isinstance(o, datetime) else str(o))"
  },
  {
    question: "What is 'object_hook' in 'json.loads()' and 'json.load()'?",
    shortAnswer: "A callback function that is invoked with the result of any decoded JSON object (dictionary), allowing automatic transformation into custom Python domain class instances.",
    explanation: "The primary hook for converting JSON dictionaries back into rich Python objects.",
    hint: "Callback called on every decoded dictionary to transform it into custom class instances.",
    level: "moderate",
    codeExample: "json.loads(json_str, object_hook=custom_student_hook)"
  },
  {
    question: "What is a 'Type Discriminator Tag' (e.g. '__type__' or '__model__') in custom JSON encoding?",
    shortAnswer: "A special metadata field injected into the JSON object during serialization that identifies the Python class name so that 'object_hook' knows which class to instantiate during deserialization.",
    explanation: "Enables polymorphic and multi-class deserialization pipelines.",
    hint: "A metadata field like '__type__': 'StudentRecord' specifying the class to reconstruct.",
    level: "moderate",
    codeExample: '{"__type__": "StudentRecord", "name": "Sourav", "fee": 28000}'
  },
  {
    question: "How does 'object_hook' handle nested dictionaries during deserialization?",
    shortAnswer: "'object_hook' operates bottom-up (innermost dictionaries first); child objects are transformed into custom class instances before their parent dictionaries are passed to 'object_hook'.",
    explanation: "Ensures nested domain hierarchies are constructed in correct dependency order.",
    hint: "Evaluates bottom-up: innermost child dictionaries are processed first.",
    level: "complex",
    codeExample: "# Child dictionaries are reconstructed before the parent dictionary"
  },
  {
    question: "How do you serialize a Python '@dataclass' instance using 'dataclasses.asdict()'?",
    shortAnswer: "'asdict(my_dataclass_instance)' recursively converts the dataclass and all its nested dataclass fields into standard Python dictionaries, which 'json.dumps()' can serialize directly.",
    explanation: "Standard library utility for dataclass dictionary conversion.",
    hint: "Use dataclasses.asdict(obj) to convert dataclasses to standard dicts.",
    level: "basic",
    codeExample: "from dataclasses import asdict\njson.dumps(asdict(my_course))"
  },
  {
    question: "How do you serialize Python 'enum.Enum' objects in custom JSONEncoders?",
    shortAnswer: "By checking 'if isinstance(o, Enum): return o.value' (or 'o.name') to return the primitive enum value or name.",
    explanation: "Standard recipe for enum serialization.",
    hint: "Return o.value or o.name when isinstance(o, Enum).",
    level: "basic",
    codeExample: "if isinstance(o, Enum): return o.value"
  },
  {
    question: "How do you serialize 'uuid.UUID' objects in a custom JSONEncoder?",
    shortAnswer: "By checking 'if isinstance(o, uuid.UUID): return str(o)'.",
    explanation: "Converts 128-bit UUID objects into canonical 36-character hyphenated strings.",
    hint: "Return str(o) when isinstance(o, uuid.UUID).",
    level: "basic",
    codeExample: "if isinstance(o, uuid.UUID): return str(o)"
  },
  {
    question: "What is the difference between 'object_hook' and 'object_pairs_hook' in 'json.loads()'?",
    shortAnswer: "'object_hook' receives a decoded Python 'dict'; 'object_pairs_hook' receives the raw list of 2-tuples '[(key, value), ...]', allowing preservation of duplicate keys or OrderedDict ordering.",
    explanation: "object_pairs_hook provides lower-level access to key-value pairs before dict construction.",
    hint: "object_hook gets a dict; object_pairs_hook gets a list of (key, value) pairs.",
    level: "complex",
    codeExample: "json.loads(s, object_pairs_hook=collections.OrderedDict)"
  },
  {
    question: "Can 'object_hook' and 'object_pairs_hook' be used simultaneously in 'json.loads()'?",
    shortAnswer: "No. 'object_pairs_hook' takes precedence over 'object_hook'; specifying both causes Python to use 'object_pairs_hook' and ignore 'object_hook'.",
    explanation: "Mutually exclusive deserialization hooks.",
    hint: "No, object_pairs_hook overrides object_hook.",
    level: "moderate",
    codeExample: "# object_pairs_hook takes priority if both are specified"
  },
  {
    question: "How do you restore methods on a deserialized custom object?",
    shortAnswer: "By instantiating the actual Python class in 'object_hook' (e.g. 'return StudentRecord(**dct)'), the restored instance retains all class methods, properties, and behaviors.",
    explanation: "Re-binds the object to its original class __dict__ and method table.",
    hint: "Instantiate the class inside object_hook to restore all methods.",
    level: "basic",
    codeExample: "def hook(d): return Student(**d) # Restores all Student methods"
  },
  {
    question: "What happens if a custom object has private attributes (e.g. '__secret') during 'o.__dict__' serialization?",
    shortAnswer: "Python mangles private attributes into '_ClassName__secret' in '__dict__'; use explicit dictionary mapping or property getters to avoid exporting mangled keys.",
    explanation: "Private attribute name mangling in Python.",
    hint: "Private attributes are name-mangled into _ClassName__attr; map keys explicitly.",
    level: "moderate",
    codeExample: "# Mangles __secret into _Student__secret"
  },
  {
    question: "How do you handle recursive custom objects in a custom JSONEncoder?",
    shortAnswer: "Return a dictionary containing nested custom objects; Python's encoder will automatically re-invoke 'default()' recursively on each un-serializable child element.",
    explanation: "Recursive traversal is built directly into Python's JSONEncoder.",
    hint: "Return a dict containing child objects; default() is re-invoked recursively on children.",
    level: "moderate",
    codeExample: "# Sub-objects in returned dict are automatically passed through default()"
  },
  {
    question: "How do you serialize a 'pydantic.BaseModel' instance to JSON?",
    shortAnswer: "In modern Pydantic (v2), call 'model.model_dump_json()' (or in v1, 'model.json()') for high-performance Rust-backed serialization.",
    explanation: "Pydantic provides native, schema-validated JSON serialization.",
    hint: "Call model.model_dump_json() in Pydantic v2.",
    level: "basic",
    codeExample: "student_model.model_dump_json()"
  },
  {
    question: "What is the danger of blindly passing untrusted JSON to an 'object_hook' that calls 'globals()[cls_name]'?",
    shortAnswer: "Arbitrary Class Instantiation vulnerability: An attacker can pass '__type__': 'subprocess.Popen' to execute arbitrary commands on the system.",
    explanation: "Always whitelist permitted class names in a safe dictionary lookup map.",
    hint: "Allows attackers to instantiate dangerous classes; always whitelist allowed types.",
    level: "complex",
    codeExample: "ALLOWED_CLASSES = {'Student': Student} # Safe whitelist lookup"
  },
  {
    question: "How do you benchmark custom JSONEncoder performance versus standard dictionary serialization?",
    shortAnswer: "Using 'timeit.timeit(lambda: json.dumps(obj, cls=MyEncoder), number=1000)'.",
    explanation: "Measures custom serializer execution overhead.",
    hint: "Use timeit.timeit() to benchmark serialization speed.",
    level: "basic",
    codeExample: "import timeit\ntimeit.timeit(lambda: json.dumps(obj, cls=MyEncoder), number=1000)"
  },
  {
    question: "Can a custom 'JSONEncoder' encode non-string dictionary keys?",
    shortAnswer: "No. 'JSONEncoder.default()' is only called for un-serializable *values*, not keys; non-string keys must be stringified before encoding or bypassed with 'skipkeys=True'.",
    explanation: "Key stringification occurs before value encoding in Python's C JSON module.",
    hint: "default() only handles values, not dictionary keys.",
    level: "complex",
    codeExample: "# default() is only called on object values, never keys"
  },
  {
    question: "How do you serialize a Python 'set' deterministically in a custom encoder?",
    shortAnswer: "By returning 'sorted(list(o))' in 'default()', ensuring the set elements are ordered consistently in the resulting JSON array.",
    explanation: "Eliminates random array ordering from sets.",
    hint: "Return sorted(list(o)) for deterministic set ordering.",
    level: "basic",
    codeExample: "if isinstance(o, set): return sorted(list(o))"
  },
  {
    question: "How do you implement a unified 'Codec' class that pairs an Encoder and Decoder together?",
    shortAnswer: "Create a class containing an inner 'Encoder(json.JSONEncoder)' subclass and a classmethod 'object_hook(dct)', exposing '.serialize(obj)' and '.deserialize(json_str)' helper methods.",
    explanation: "The standard enterprise design pattern for cohesive domain serialization.",
    hint: "Bundle Encoder and object_hook into a single class with serialize/deserialize methods.",
    level: "moderate",
    codeExample: "class StudentCodec:\n    # Contains Encoder, object_hook, serialize(), and deserialize()"
  },
  {
    question: "How does 'functools.singledispatch' offer an alternative to large 'if isinstance()' chains in 'default()'?",
    shortAnswer: "By defining a generic singledispatch serializer function with registered type handlers for each domain class, producing cleaner and modular serialization code.",
    explanation: "Clean architectural alternative to monolithic if-elif chains.",
    hint: "Use @singledispatch to register separate handlers per type.",
    level: "complex",
    codeExample: "@functools.singledispatch\ndef serialize_type(val): raise TypeError()"
  },
  {
    question: "What happens if 'default(self, o)' returns an un-serializable object without calling super()?",
    shortAnswer: "Python will re-invoke 'default()' recursively with the same object until reaching 'RecursionError: maximum recursion depth exceeded'.",
    explanation: "Always delegate unknown types to super().default(o).",
    hint: "Causes infinite recursion; always call super().default(o) for unhandled types.",
    level: "moderate",
    codeExample: "# Unhandled types must call super().default(o)"
  },
  {
    question: "What is the ultimate golden rule for Custom Python JSON Codecs?",
    shortAnswer: "Subclass 'json.JSONEncoder' overriding 'default()' with 'super().default(o)' fallback for encoding; inject safe '__type__' discriminator tags; and use a whitelisted 'object_hook' to reconstruct rich Python class instances with full method fidelity.",
    explanation: "The complete enterprise architecture for domain object persistence and API serialization.",
    hint: "Override default() with super fallback, use __type__ tag, and reconstruct with object_hook.",
    level: "basic",
    codeExample: "# Python Custom JSON Codec Mastery"
  }
];

export default questions;
