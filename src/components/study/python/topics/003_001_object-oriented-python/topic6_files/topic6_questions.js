// src/components/study/python/topics/003_001_object-oriented-python/topic6_files/topic6_questions.js
// Comprehensive Master Review Questions for Topic 6: Encapsulation & Data Hiding

const questions = [
  {
    question: "What is Encapsulation in Object-Oriented Programming?",
    shortAnswer: "The bundling of data (attributes) and methods that operate on that data into a single cohesive unit, while restricting direct external access to internal state.",
    explanation: "Encapsulation protects object invariants by forcing mutations to pass through validated public methods.",
    hint: "Bundling data and methods together and restricting direct external mutation.",
    level: "basic",
    codeExample: "class Bank:\n    def __init__(self):\n        self._balance = 0.0"
  },
  {
    question: "What are the three access conventions in Python OOP?",
    shortAnswer: "1. Public (name); 2. Protected (_name single leading underscore); 3. Private (__name double leading underscore triggering Name Mangling).",
    explanation: "Public is open; Protected signals internal use; Private triggers CPython Name Mangling.",
    hint: "Public (var), Protected (_var), and Private (__var).",
    level: "basic",
    codeExample: "self.public = 1\nself._protected = 2\nself.__private = 3"
  },
  {
    question: "What is CPython Name Mangling?",
    shortAnswer: "The automatic internal rewriting of any identifier with at least two leading underscores (e.g. __pin) to '_ClassName__pin' in the object's __dict__.",
    explanation: "Prevents direct access via 'obj.__pin' while allowing access via 'obj._ClassName__pin'.",
    hint: "Automatically transforms __var to _ClassName__var.",
    level: "basic",
    codeExample: "class A:\n    def __init__(self): self.__x = 10\n# Stored as a._A__x"
  },
  {
    question: "What error occurs if you try to access 'obj.__private_attr' directly from outside the class?",
    shortAnswer: "AttributeError: 'ClassName' object has no attribute '__private_attr'.",
    explanation: "Because Python renamed the attribute in RAM to '_ClassName__private_attr'.",
    hint: "Raises AttributeError because the raw name doesn't exist in __dict__.",
    level: "basic",
    codeExample: "# AttributeError: 'Vault' object has no attribute '__code'"
  },
  {
    question: "Why does Python lack strict compile-time private access modifiers like Java or C++?",
    shortAnswer: "Python follows the core community philosophy: 'We are all consenting adults here', trusting developers to respect conventions (like single underscore '_') rather than enforcing hardware barriers.",
    explanation: "Python favors openness, introspection, and simplicity over rigid access control enforcement.",
    hint: "'We are all consenting adults here' - trust conventions over rigid enforcement.",
    level: "moderate",
    codeExample: "# Python relies on convention and introspection rather than access locks"
  },
  {
    question: "What was Guido van Rossum's true design purpose for implementing Name Mangling?",
    shortAnswer: "To prevent accidental name collisions when subclasses inherit and define attributes with the same name as internal private attributes in parent classes.",
    explanation: "Parent._Parent__config and Child._Child__config coexist safely without overwriting each other.",
    hint: "To prevent subclass inheritance attribute name collisions.",
    level: "moderate",
    codeExample: "# Parent.__id -> _Parent__id; Child.__id -> _Child__id"
  },
  {
    question: "What is the difference between '_var', '__var', and '__var__' in Python?",
    shortAnswer: "'_var' is a protected convention (internal use); '__var' triggers name mangling; '__var__' is a special reserved dunder (magic) method/attribute (e.g. __init__, __str__).",
    explanation: "Never create custom attributes with double leading AND trailing underscores (__my_var__).",
    hint: "_var = protected, __var = private mangled, __var__ = magic dunder.",
    level: "basic",
    codeExample: "_internal = 1\n__mangled = 2\n__init__ = 'magic dunder'"
  },
  {
    question: "Why should you use a single underscore '_var' instead of double underscore '__var' for most internal helper methods?",
    shortAnswer: "Single underscore indicates internal use to other developers and subclasses without the unnecessary overhead and inheritance complications of Name Mangling.",
    explanation: "PEP 8 recommends single underscore for 95%+ of internal private conventions.",
    hint: "Single underscore is the standard PEP 8 convention for internal helpers.",
    level: "moderate",
    codeExample: "def _validate_score(self): pass"
  },
  {
    question: "Can an attacker still read or modify a private '__attribute' in Python?",
    shortAnswer: "Yes. By accessing 'obj._ClassName__attribute', anyone can read or mutate the mangled variable in RAM.",
    explanation: "Private attributes are not encrypted or protected against intentional tampering.",
    hint: "Yes, by accessing the mangled name obj._ClassName__var directly.",
    level: "basic",
    codeExample: "vault._Vault__pin = '9999'  # Direct mangled modification"
  },
  {
    question: "How does Encapsulation improve software maintainability and refactoring?",
    shortAnswer: "Because internal implementation details (e.g. data structures, algorithms) can be refactored or optimized without breaking external client code that interacts solely with public methods.",
    explanation: "Decouples public API contracts from underlying storage mechanics.",
    hint: "Decouples public interface contracts from internal storage implementation.",
    level: "moderate",
    codeExample: "# Change internal storage from list to set without breaking public add() API"
  },
  {
    question: "What is 'Data Hiding' vs 'Encapsulation'?",
    shortAnswer: "Encapsulation is the broader architectural principle of bundling data and behavior; Data Hiding is the specific practice of concealing internal representation details from external consumers.",
    explanation: "Data hiding is a subset and direct benefit of encapsulation.",
    hint: "Encapsulation bundles state and logic; Data Hiding restricts visibility of internal details.",
    level: "moderate",
    codeExample: "# Public methods guard hidden internal balances"
  },
  {
    question: "What is a single trailing underscore used for (e.g. 'class_' or 'type_')?",
    shortAnswer: "By PEP 8 convention, a single trailing underscore is used to avoid naming conflicts with Python reserved keywords (e.g., class_ = 'Math', from_ = 'sender').",
    explanation: "Allows clean variable names without conflicting with language keywords.",
    hint: "Avoids collisions with Python keywords (class_, id_).",
    level: "basic",
    codeExample: "def register(name: str, class_: str): pass"
  },
  {
    question: "How do you inspect all mangled attributes of an object dynamically at runtime?",
    shortAnswer: "By inspecting 'dir(obj)' or 'obj.__dict__.keys()', which lists all attributes including '_ClassName__var' entries.",
    explanation: "Python's rich reflection capabilities expose all namespace keys.",
    hint: "Inspect dir(obj) or obj.__dict__.",
    level: "basic",
    codeExample: "print([k for k in dir(obj) if k.startswith('_')])"
  },
  {
    question: "Can private methods (def __helper(self):) be defined and mangled in Python?",
    shortAnswer: "Yes. Methods starting with double underscores (and at most one trailing underscore) are also mangled to '_ClassName__helper(self)'.",
    explanation: "Prevents subclasses from accidentally overriding internal helper routines.",
    hint: "Yes, private methods are mangled identically to _ClassName__method.",
    level: "basic",
    codeExample: "def __internal_audit(self): pass\n# Stored as _Class__internal_audit"
  },
  {
    question: "What happens if a subclass attempts to call 'self.__private_method()' defined in its parent class?",
    shortAnswer: "It raises AttributeError because Python looks for '_ChildClass__private_method' instead of '_ParentClass__private_method'.",
    explanation: "Subclasses cannot directly invoke parent private methods without using the parent's mangled name explicitly.",
    hint: "Raises AttributeError because it looks for the subclass's mangled name.",
    level: "complex",
    codeExample: "# Child calling self.__parent_private raises AttributeError"
  },
  {
    question: "How should sensitive user passwords or PINs be stored inside an encapsulated class?",
    shortAnswer: "As irreversible cryptographic hashes (e.g. SHA-256 or bcrypt) rather than plaintext strings.",
    explanation: "Protects security even if the object's namespace is dumped or inspected in memory.",
    hint: "Store cryptographic hashes (SHA-256 / bcrypt) instead of plaintext.",
    level: "moderate",
    codeExample: "self.__pin_hash = hashlib.sha256(pin.encode()).hexdigest()"
  },
  {
    question: "What is 'Masking' in the context of data encapsulation?",
    shortAnswer: "Exposing public formatted strings that obscure sensitive characters (e.g. 'ACC-***-4829' or '**** **** **** 1234') while keeping the full value private.",
    explanation: "Common requirement in banking, PCI-DSS, and GDPR compliance.",
    hint: "Obscuring sensitive characters (e.g. WAL-***-1234) for safe display.",
    level: "basic",
    codeExample: "def get_masked_card(self): return f'****-****-****-{self._card[-4:]}'"
  },
  {
    question: "Does Name Mangling occur if the class name consists entirely of underscores (e.g. class ___:)?",
    shortAnswer: "No. If a class name consists entirely of underscores, Python skips name mangling to avoid syntax errors.",
    explanation: "An obscure edge-case in CPython compiler source code.",
    hint: "CPython skips mangling if the class name is all underscores.",
    level: "complex",
    codeExample: "# Obscure CPython compiler edge case"
  },
  {
    question: "Why should you never use double underscores in Python module-level global variables?",
    shortAnswer: "Because Name Mangling only operates inside class definitions; module-level double underscore names are not mangled and may conflict with future Python language internals.",
    explanation: "Module-level names with dunders are reserved by the Python language specification.",
    hint: "Mangling only applies in class definitions; module dunders are reserved by Python.",
    level: "moderate",
    codeExample: "# Avoid module-level __var = 10; use _var instead"
  },
  {
    question: "How do getters and setters relate to encapsulation in Python?",
    shortAnswer: "They allow reading and writing private attributes through controlled property methods (@property) that enforce type checks, validation, and calculated state.",
    explanation: "Topic 7 deep-dives into the @property decorator.",
    hint: "They provide controlled, validated interfaces to private attributes.",
    level: "basic",
    codeExample: "@property\ndef balance(self): return self._balance"
  },
  {
    question: "What is the 'Tell, Don't Ask' principle in OOP encapsulation?",
    shortAnswer: "Instead of asking an object for its private data and making decisions outside, tell the object what action to perform so it can manage its own internal state.",
    explanation: "Promotes high cohesion and reduces tight coupling between classes.",
    hint: "Tell the object to perform an action rather than extracting its data.",
    level: "moderate",
    codeExample: "# Good: account.withdraw(100)\n# Bad: if account.balance >= 100: account.balance -= 100"
  },
  {
    question: "Can an instance dynamically add a private attribute after instantiation (e.g. obj.__new_attr = 5)?",
    shortAnswer: "No Name Mangling occurs when adding attributes from outside the class body; 'obj.__new_attr = 5' creates a literal key '__new_attr' in obj.__dict__ without the class prefix.",
    explanation: "Name mangling is a syntax-time compiler transformation, not a runtime hook.",
    hint: "No, mangling only happens at compile-time inside class definitions.",
    level: "complex",
    codeExample: "obj.__new = 10  # Literally stored as '__new' in __dict__"
  },
  {
    question: "What is an 'Invariant' in object-oriented encapsulation?",
    shortAnswer: "A logical business rule or condition that must always remain True throughout the entire lifecycle of an object (e.g. balance >= 0, age > 0).",
    explanation: "Encapsulation ensures that invalid operations cannot violate class invariants.",
    hint: "A business condition that must always remain True (e.g. balance >= 0).",
    level: "moderate",
    codeExample: "# Invariant: self._balance >= 0 at all times"
  },
  {
    question: "Why does direct attribute access (e.g. obj.balance = -5000) break software reliability in procedural systems?",
    shortAnswer: "Because bypasses validation logic, creates inconsistent corrupted states, and causes catastrophic cascading failures across dependent subsystems.",
    explanation: "Encapsulation prevents corrupted object states from ever occurring.",
    hint: "Bypasses validation and creates corrupted object states.",
    level: "basic",
    codeExample: "# Corrupt state: account.balance = -999999"
  },
  {
    question: "What is the ultimate golden rule of Encapsulation in Python?",
    shortAnswer: "Keep attributes protected (_var) by default, expose clean public interfaces and properties for access, and use private (__var) only when subclass collision protection is strictly required.",
    explanation: "Balances Pythonic elegance and consenting adults philosophy with robust software architecture.",
    hint: "Use _var by default, public methods for interaction, and __var only for collision safety.",
    level: "basic",
    codeExample: "# _protected by default; public methods for client access"
  }
];

export default questions;
