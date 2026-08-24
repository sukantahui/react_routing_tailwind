// src/components/study/python/topics/003_001_object-oriented-python/topic10_files/topic10_questions.js
// Comprehensive Master Review Questions for Topic 10: Method Resolution Order (MRO)

const questions = [
  {
    question: "What is Method Resolution Order (MRO) in Python?",
    shortAnswer: "The deterministic linear ordering of classes that Python traverses to search for attributes, methods, and functions on an object instance.",
    explanation: "Ensures predictable, conflict-free method dispatching across complex inheritance hierarchies.",
    hint: "The linear search order Python follows when looking up attributes on a class.",
    level: "basic",
    codeExample: "print(SubClass.__mro__)"
  },
  {
    question: "How do you inspect the MRO of a class programmatically in Python?",
    shortAnswer: "Using the 'ClassName.__mro__' tuple attribute or calling the 'ClassName.mro()' method.",
    explanation: "'__mro__' returns a tuple of class types, whereas 'mro()' returns a list.",
    hint: "Use ClassName.__mro__ or ClassName.mro().",
    level: "basic",
    codeExample: "for cls in MyClass.__mro__: print(cls.__name__)"
  },
  {
    question: "What algorithm does Python 3 use to calculate the Method Resolution Order?",
    shortAnswer: "The C3 Linearization Algorithm (introduced in Python 2.3).",
    explanation: "Combines local precedence order with monotonicity to produce a stable, linear sequence.",
    hint: "The C3 Linearization Algorithm.",
    level: "basic",
    codeExample: "# C3 Linearization: L(C) = [C] + merge(...)"
  },
  {
    question: "What are the three fundamental properties guaranteed by the C3 Linearization algorithm?",
    shortAnswer: "1. Subclasses appear before their parent base classes; 2. Declaration order of base classes in class headers is preserved (left-to-right); 3. Monotonicity (if A precedes B in any class, A must precede B in all derived subclasses).",
    explanation: "These constraints prevent ambiguous lookups and diamond inheritance bugs.",
    hint: "Subclass priority, left-to-right preservation, and Monotonicity.",
    level: "moderate",
    codeExample: "# Guarantees strict monotonic linear search order"
  },
  {
    question: "What causes 'TypeError: Cannot create a consistent method resolution order (MRO) for bases X, Y'?",
    shortAnswer: "When base classes are specified in an order that contradicts an existing inheritance relationship (e.g., class B(A) exists, but a child declares class C(A, B)), violating monotonicity.",
    explanation: "Because the declaration demands A before B, but B's definition requires B before A.",
    hint: "Contradictory base class ordering that violates monotonicity.",
    level: "moderate",
    codeExample: "# Causes TypeError:\nclass A: pass\nclass B(A): pass\nclass C(A, B): pass"
  },
  {
    question: "How do you fix an inconsistent MRO TypeError in a class declaration?",
    shortAnswer: "Reorder the base classes in the class header so that more specialized subclasses are listed before more general base classes (e.g. change class C(A, B) to class C(B, A)).",
    explanation: "Satisfies both the local declaration order and the inherited subtyping order.",
    hint: "List more specialized subclasses before general base classes: class C(B, A).",
    level: "basic",
    codeExample: "# FIXED:\nclass C(B, A): pass"
  },
  {
    question: "How does MRO resolve method lookups in a classic diamond hierarchy (A -> B, C -> D)?",
    shortAnswer: "For class D(B, C): MRO order is D -> B -> C -> A -> object. Method lookup checks D first, then B, then C, and finally the common root A.",
    explanation: "The shared root A is evaluated only once, after all sibling branches (B and C) have been checked.",
    hint: "Child -> Left Branch -> Right Branch -> Shared Root -> object.",
    level: "moderate",
    codeExample: "# D(B, C) -> [D, B, C, A, object]"
  },
  {
    question: "Why did Python abandon the legacy Depth-First Search (DFS) MRO used in Python 2.2 and earlier?",
    shortAnswer: "Because DFS visited the common root (A) before checking sibling branches (C) in diamond hierarchies, causing overridden methods in sibling classes to be ignored unexpectedly.",
    explanation: "C3 Linearization solved this by guaranteeing breadth-first preservation before common ancestors.",
    hint: "DFS prematurely visited the root class before sibling branches.",
    level: "complex",
    codeExample: "# DFS: D -> B -> A -> C (Flawed!)\n# C3:  D -> B -> C -> A (Correct!)"
  },
  {
    question: "What is the relationship between 'super()' and MRO?",
    shortAnswer: "'super()' uses the active instance's MRO to determine the next class to delegate to, rather than simply calling the immediate lexical parent.",
    explanation: "Allows cooperative method calls across multiple inheritance branches.",
    hint: "super() delegates to the next class in the active MRO sequence.",
    level: "basic",
    codeExample: "# super() delegates strictly according to type(self).__mro__"
  },
  {
    question: "What is the final class at the end of every Python 3 class MRO?",
    shortAnswer: "The built-in 'object' class.",
    explanation: "Every class in Python 3 ultimately terminates at 'object'.",
    hint: "The root 'object' class.",
    level: "basic",
    codeExample: "print(MyClass.__mro__[-1])  # <class 'object'>"
  },
  {
    question: "What is the C3 Linearization 'merge' rule?",
    shortAnswer: "A candidate class is selected from the head of a list only if it does not appear in the tail (index 1+) of any other list being merged; once selected, it is removed from all lists and added to the output.",
    explanation: "Repeated until all lists are empty, or raises TypeError if a cycle is detected.",
    hint: "Candidate head must not appear in the tail of any other sequence.",
    level: "complex",
    codeExample: "# merge([B, A], [C, A], [B, C]) -> [B, C, A]"
  },
  {
    question: "Can an instance have a different MRO than its defining class?",
    shortAnswer: "No. The MRO is calculated and attached directly to the Class object when the class is defined, and all instances share that exact class MRO.",
    explanation: "MRO is a class-level attribute, not an instance attribute.",
    hint: "No, MRO is fixed at class creation time.",
    level: "basic",
    codeExample: "type(inst).__mro__ is inst.__class__.__mro__"
  },
  {
    question: "How does the order of classes in a multiple-inheritance declaration (e.g. class D(A, B) vs class D(B, A)) affect MRO?",
    shortAnswer: "The left-to-right order in the class definition header directly determines the search priority between sibling branches in the MRO.",
    explanation: "Class D(A, B) searches A before B; Class D(B, A) searches B before A.",
    hint: "Left-to-right order in the class header determines search priority.",
    level: "basic",
    codeExample: "class D(A, B): ... # A searched before B"
  },
  {
    question: "Can you manually modify a class's '__mro__' attribute after class creation?",
    shortAnswer: "No. '__mro__' is a read-only attribute enforced by CPython internals; attempting to assign to Class.__mro__ raises a TypeError.",
    explanation: "Guarantees runtime method resolution stability.",
    hint: "No, __mro__ is strictly read-only.",
    level: "basic",
    codeExample: "# TypeError: readonly attribute"
  },
  {
    question: "How do Mixin classes fit into MRO ordering?",
    shortAnswer: "Mixins should be listed BEFORE the main base class in the class header (e.g. class MyModel(JSONMixin, AuditMixin, BaseModel):) so mixin methods override or intercept base class methods.",
    explanation: "Places mixin capabilities higher in the MRO search sequence.",
    hint: "List mixins before the base class so they intercept method calls.",
    level: "moderate",
    codeExample: "class Account(AuditMixin, BaseAccount): pass"
  },
  {
    question: "What is 'Monotonicity' in the context of C3 Linearization?",
    shortAnswer: "The rule that if Class A precedes Class B in the MRO of any parent class, Class A MUST also precede Class B in the MRO of all derived subclasses.",
    explanation: "Prevents confusing reordering of ancestor precedence in deep hierarchies.",
    hint: "Precedence between classes must remain identical across all subclasses.",
    level: "complex",
    codeExample: "# If A precedes B in Parent, A must precede B in all children"
  },
  {
    question: "Can metaclasses customize or alter the MRO calculation of a class?",
    shortAnswer: "Metaclasses can participate in class creation (via __new__ / __init__), but the C3 algorithm itself is hardcoded in CPython's C source code (typeobject.c: mro_implementation).",
    explanation: "You can manipulate base tuples before class creation, but cannot replace the C3 merge logic itself.",
    hint: "C3 algorithm is compiled in CPython C core; metaclasses can only adjust bases.",
    level: "complex",
    codeExample: "# C3 algorithm implemented in CPython C core"
  },
  {
    question: "What happens if two parent classes define a method with the same name, and the child does NOT override it?",
    shortAnswer: "Python executes the method from whichever parent appears first in the child's MRO (the leftmost branch in declaration order).",
    explanation: "Standard left-to-right resolution order.",
    hint: "Executes the method from the class appearing earlier in the MRO.",
    level: "basic",
    codeExample: "class D(A, B): pass\n# D().func() executes A.func()"
  },
  {
    question: "How does Python resolve attribute lookup when an attribute exists in both an instance dictionary and the MRO?",
    shortAnswer: "Instance __dict__ has top priority for standard data attributes, followed sequentially by each class in the MRO (unless a data descriptor is present).",
    explanation: "Descriptors can override instance dictionary priority.",
    hint: "Instance dict -> MRO classes in sequence.",
    level: "moderate",
    codeExample: "inst.__dict__ -> Class1 -> Class2 -> ... -> object"
  },
  {
    question: "What built-in function returns the class where an attribute was found along the MRO?",
    shortAnswer: "inspect.getattr_static() or iterating through 'cls.__dict__' along 'type(obj).__mro__'.",
    explanation: "Allows inspecting attribute origins without triggering descriptors or properties.",
    hint: "Iterate through cls.__dict__ across type(obj).__mro__.",
    level: "complex",
    codeExample: "for c in type(obj).__mro__:\n    if 'attr' in c.__dict__: print(c)"
  },
  {
    question: "Why does Python support multiple inheritance when Java and C# explicitly banned it?",
    shortAnswer: "Because Python's C3 Linearization algorithm and cooperative 'super()' solve the diamond problem deterministically, enabling clean composable Mixin architectures without ambiguity.",
    explanation: "Python trusts developers to design clean hierarchies using C3 MRO.",
    hint: "C3 Linearization and cooperative super() resolve diamond ambiguities.",
    level: "moderate",
    codeExample: "# C3 provides deterministic multiple inheritance resolution"
  },
  {
    question: "How can MRO be utilized to build deterministic middleware execution pipelines?",
    shortAnswer: "By defining middleware stages as classes that call 'super().handle_request()' and inheriting them in order (e.g. class Endpoint(Auth, RateLimit, Cache, Base):), MRO guarantees strict sequential execution.",
    explanation: "A powerful design pattern in enterprise Python frameworks.",
    hint: "Inheriting middleware in order executes them sequentially via MRO.",
    level: "moderate",
    codeExample: "class Endpoint(RateLimit, Auth, Base): pass"
  },
  {
    question: "What is the time complexity of method lookup along the MRO in CPython?",
    shortAnswer: "CPython caches method lookups in a fast global type cache (MRO cache), making repeated lookups effectively O(1) in practice.",
    explanation: "Method caching minimizes runtime overhead in modern Python.",
    hint: "O(1) in practice due to CPython's internal MRO cache.",
    level: "complex",
    codeExample: "# CPython optimizes method lookup with internal type caches"
  },
  {
    question: "Can cyclical inheritance (class A(B): ... class B(A):) exist in Python?",
    shortAnswer: "No. Python rejects circular inheritance at definition time with a NameError or TypeError.",
    explanation: "A class cannot inherit from an undefined or circular reference.",
    hint: "No, Python prevents cyclical inheritance at definition time.",
    level: "basic",
    codeExample: "# Circular inheritance is rejected immediately"
  },
  {
    question: "What is the ultimate takeaway rule for understanding Python MRO?",
    shortAnswer: "MRO is a deterministic linear list calculated via C3 Linearization that dictates method search order and super() delegation; always inspect 'Class.__mro__' when debugging multiple inheritance.",
    explanation: "The single source of truth for method dispatching in Python.",
    hint: "MRO is a deterministic linear search sequence; check Class.__mro__.",
    level: "basic",
    codeExample: "# Always inspect Class.__mro__ for the definitive search sequence"
  }
];

export default questions;
