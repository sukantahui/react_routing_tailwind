// src/components/study/python/topics/002_006_sets/topic9_files/topic9_questions.js
// 30 Comprehensive Master Review Questions for Topic 9: Mathematical Set Operations Overview

const questions = [
  {
    question: "What are the four primary mathematical set operations available in Python?",
    shortAnswer: "Union (|), Intersection (&), Difference (-), and Symmetric Difference (^).",
    explanation: "These four operations correspond to classical set algebra: Union combines all members; Intersection keeps shared members; Difference removes members of another set; and Symmetric Difference keeps elements unique to exactly one set.",
    hint: "Think about the four Venn diagram operations.",
    level: "basic",
    codeExample: "A, B = {1, 2}, {2, 3}\nprint(\"Union:\", A | B)        # {1, 2, 3}\nprint(\"Intersection:\", A & B) # {2}\nprint(\"Difference:\", A - B)   # {1}\nprint(\"Sym Diff:\", A ^ B)     # {1, 3}"
  },
  {
    question: "What is the critical difference between using set operators (e.g. A | B) vs set methods (e.g. A.union(B))?",
    shortAnswer: "Operators strictly require both operands to be set instances; methods accept ANY iterable (lists, tuples, ranges, etc.).",
    explanation: "Writing A | [1, 2] raises TypeError: unsupported operand type for |: 'set' and 'list'. In contrast, A.union([1, 2]) automatically converts the list on the fly and succeeds.",
    hint: "Operators require sets; methods accept any iterable.",
    level: "moderate",
    codeExample: "A = {10, 20}\n# A | [30, 40]        # TypeError\nres = A.union([30, 40]) # Valid! Returns {10, 20, 30, 40}"
  },
  {
    question: "Do operators like A | B or methods like A.union(B) modify the original sets?",
    shortAnswer: "No, they construct and return a brand-new set, leaving A and B completely unmodified.",
    explanation: "Mathematical operators and their non-update method counterparts (union, intersection, difference, symmetric_difference) are pure functional operations that never mutate their inputs.",
    hint: "Standard operations always return a new set.",
    level: "basic",
    codeExample: "A = {1, 2}\nB = {2, 3}\nC = A | B\nprint(A)  # {1, 2} (Untouched)\nprint(C)  # {1, 2, 3}"
  },
  {
    question: "What are the in-place mutating equivalents of |, &, -, and ^ in Python?",
    shortAnswer: "|= (update), &= (intersection_update), -= (difference_update), and ^= (symmetric_difference_update).",
    explanation: "These augmented assignment operators mutate the left operand in place and return None, avoiding the memory allocation of a new set object.",
    hint: "Add = to the operator (|=, &=, -=, ^=).",
    level: "moderate",
    codeExample: "A = {1, 2}\nA |= {3, 4}  # A is mutated in place to {1, 2, 3, 4}"
  },
  {
    question: "What is the mathematical definition of set Union (A | B)?",
    shortAnswer: "The set of all elements that belong to A, B, or both (A ∪ B).",
    explanation: "Union gathers all distinct elements from both collections, automatically discarding any duplicate entries.",
    hint: "All elements from both sets combined.",
    level: "basic",
    codeExample: "print({1, 2} | {2, 3})  # {1, 2, 3}"
  },
  {
    question: "What is the mathematical definition of set Intersection (A & B)?",
    shortAnswer: "The set of elements that belong simultaneously to BOTH A and B (A ∩ B).",
    explanation: "Intersection identifies the common elements shared between two or more sets, dropping elements that exist in only one set.",
    hint: "Common elements present in both sets.",
    level: "basic",
    codeExample: "print({\"A\", \"B\"} & {\"B\", \"C\"})  # {'B'}"
  },
  {
    question: "What is the mathematical definition of set Difference (A - B)?",
    shortAnswer: "The set of elements that belong to A but do NOT belong to B (Relative Complement A \\ B).",
    explanation: "Difference takes set A and subtracts any element that also appears in set B. Note that A - B is generally NOT equal to B - A.",
    hint: "Elements in A that are missing from B.",
    level: "basic",
    codeExample: "print({1, 2, 3} - {2, 3, 4})  # {1}"
  },
  {
    question: "What is the mathematical definition of Symmetric Difference (A ^ B)?",
    shortAnswer: "The set of elements that belong to either A or B, but NOT to both (A Δ B = (A ∪ B) - (A ∩ B)).",
    explanation: "Symmetric Difference extracts elements that are exclusive to set A plus elements exclusive to set B, excluding their mutual intersection.",
    hint: "Elements in either set, but not in their intersection.",
    level: "moderate",
    codeExample: "print({1, 2, 3} ^ {2, 3, 4})  # {1, 4}"
  },
  {
    question: "Can set methods accept multiple iterables in a single call (e.g. A.union(B, C, D))?",
    shortAnswer: "Yes, methods like union(), intersection(), and difference() accept an arbitrary number of iterables.",
    explanation: "Methods take variadic *iterables, allowing multiple collections to be combined in a single call (e.g. s.union(l1, t2, s3)). (Note: symmetric_difference only accepts 1 argument).",
    hint: "union and intersection take multiple arguments.",
    level: "moderate",
    codeExample: "s = {1}\nres = s.union([2], (3,), {4})\nprint(res)  # {1, 2, 3, 4}"
  },
  {
    question: "Why does A.symmetric_difference(B, C) raise a TypeError?",
    shortAnswer: "Because symmetric_difference() mathematically accepts exactly ONE other set/iterable argument.",
    explanation: "Symmetric difference is defined pairwise. Calling symmetric_difference with multiple arguments raises TypeError: symmetric_difference takes exactly one argument.",
    hint: "symmetric_difference is strictly pairwise.",
    level: "expert",
    codeExample: "s = {1, 2}\n# s.symmetric_difference({2, 3}, {3, 4}) # TypeError\n# Correct: s ^ s2 ^ s3"
  },
  {
    question: "How does operator chaining work: A | B | C and A & B & C?",
    shortAnswer: "Operations are evaluated left-to-right from left associative grouping: ((A | B) | C).",
    explanation: "Python evaluates the first pair, creates an intermediate set, and applies the next operator to subsequent sets in left-to-right order.",
    hint: "Left-to-right chaining.",
    level: "moderate",
    codeExample: "A, B, C = {1, 2}, {2, 3}, {3, 4}\nprint(A | B | C)  # {1, 2, 3, 4}\nprint(A & B & C)  # set() (No element exists in all 3)"
  },
  {
    question: "What is the time complexity of the Union operation (A | B)?",
    shortAnswer: "O(len(A) + len(B)).",
    explanation: "Python copies elements of set A into a new set, then iterates through all elements of set B and inserts them in O(len(B)) time.",
    hint: "Proportional to the sum of sizes of both sets.",
    level: "moderate",
    codeExample: "# Time: O(len(A) + len(B))"
  },
  {
    question: "What is the time complexity of the Intersection operation (A & B)?",
    shortAnswer: "O(min(len(A), len(B))).",
    explanation: "Python optimizes intersection by iterating through the SMALLER set and checking membership in the larger set in O(1) time per item.",
    hint: "Python loops over the smaller set.",
    level: "expert",
    codeExample: "# Time: O(min(len(A), len(B)))"
  },
  {
    question: "What is the time complexity of the Difference operation (A - B)?",
    shortAnswer: "O(len(A)).",
    explanation: "Python iterates over all elements of set A and checks if each is absent from set B in O(1) time.",
    hint: "Proportional to the size of the left set A.",
    level: "moderate",
    codeExample: "# Time: O(len(A))"
  },
  {
    question: "What is the identity element for set Union (A | Identity == A)?",
    shortAnswer: "The empty set set().",
    explanation: "Union with an empty set contributes 0 new elements: A | set() == A.",
    hint: "Union with empty set returns A.",
    level: "basic",
    codeExample: "A = {1, 2, 3}\nprint(A | set() == A)  # True"
  },
  {
    question: "What is the result of set Intersection with an empty set (A & set())?",
    shortAnswer: "An empty set set().",
    explanation: "Because an empty set contains no elements, zero elements can be shared, resulting in set().",
    hint: "Intersection with empty set is always empty set.",
    level: "basic",
    codeExample: "A = {1, 2, 3}\nprint(A & set())  # set()"
  },
  {
    question: "Is set Difference commutative: Is A - B always equal to B - A?",
    shortAnswer: "No, set difference is non-commutative (A - B != B - A unless A == B).",
    explanation: "A - B gives elements unique to A; B - A gives elements unique to B. They are completely different disjoint sets.",
    hint: "Subtraction order matters in sets just like in arithmetic.",
    level: "basic",
    codeExample: "A = {1, 2}\nB = {2, 3}\nprint(A - B)  # {1}\nprint(B - A)  # {3}"
  },
  {
    question: "Is Symmetric Difference commutative: Is A ^ B equal to B ^ A?",
    shortAnswer: "Yes, symmetric difference is commutative: A ^ B == B ^ A.",
    explanation: "Because (A \\ B) ∪ (B \\ A) is symmetric, swapping the order produces the exact same combined set of exclusive elements.",
    hint: "Symmetric difference is order-independent.",
    level: "basic",
    codeExample: "A, B = {1, 2}, {2, 3}\nprint(A ^ B == B ^ A)  # True ({1, 3})"
  },
  {
    question: "What is De Morgan's Law expressed in Python set operations?",
    shortAnswer: "Universal - (A | B) == (Universal - A) & (Universal - B).",
    explanation: "The complement of a union equals the intersection of complements.",
    hint: "Complement of union is intersection of complements.",
    level: "expert",
    codeExample: "U = {1, 2, 3, 4, 5}\nA, B = {1, 2}, {2, 3}\nprint((U - (A | B)) == ((U - A) & (U - B)))  # True"
  },
  {
    question: "What happens if you perform set operations between a set and a frozenset?",
    shortAnswer: "It succeeds seamlessly; the return type matches the type of the left-hand operand.",
    explanation: "If a standard set is on the left, the result is a set. If a frozenset is on the left, the result is a frozenset.",
    hint: "The left operand determines the return container type.",
    level: "expert",
    codeExample: "s = {1, 2}\nfs = frozenset([2, 3])\nprint(type(s | fs))   # <class 'set'>\nprint(type(fs | s))  # <class 'frozenset'>"
  },
  {
    question: "How can you find duplicate elements across three lists using set intersection?",
    shortAnswer: "set(list1) & set(list2) & set(list3).",
    explanation: "Converting each list to a set and chaining & finds items present in all three lists in O(N) time.",
    hint: "Convert to sets and chain the & operator.",
    level: "basic",
    codeExample: "l1 = [1, 2, 3]\nl2 = [2, 3, 4]\nl3 = [3, 4, 5]\ncommon = set(l1) & set(l2) & set(l3)\nprint(common)  # {3}"
  },
  {
    question: "How do you find all elements that exist in list A or list B, but not in both?",
    shortAnswer: "set(list_a) ^ set(list_b).",
    explanation: "Symmetric difference extracts elements exclusive to list A or list B.",
    hint: "Use the symmetric difference operator ^.",
    level: "basic",
    codeExample: "a = [\"Admin\", \"Editor\"]\nb = [\"Editor\", \"Viewer\"]\nprint(set(a) ^ set(b))  # {'Admin', 'Viewer'}"
  },
  {
    question: "What is the operator precedence among set operators: |, &, -, ^?",
    shortAnswer: "& (highest) -> ^ -> | (lowest). Subtraction - has the same precedence as addition/subtraction.",
    explanation: "Bitwise/set AND (&) binds tighter than XOR (^), which binds tighter than OR (|). Use parentheses for clarity in complex expressions.",
    hint: "& is evaluated before ^ and |.",
    level: "expert",
    codeExample: "# A | B & C is evaluated as A | (B & C)"
  },
  {
    question: "What is the output of: {1, 2, 3} - {1, 2, 3}?",
    shortAnswer: "set() (an empty set).",
    explanation: "Subtracting identical sets leaves zero elements, yielding the empty set set().",
    hint: "A set subtracted from itself is empty.",
    level: "basic",
    codeExample: "print({1, 2, 3} - {1, 2, 3})  # set()"
  },
  {
    question: "What is the output of: {1, 2, 3} ^ {1, 2, 3}?",
    shortAnswer: "set() (an empty set).",
    explanation: "Since all elements are shared, zero elements belong exclusively to one set, returning set().",
    hint: "Symmetric difference of identical sets is empty.",
    level: "basic",
    codeExample: "print({1, 2, 3} ^ {1, 2, 3})  # set()"
  },
  {
    question: "How can you use set difference to find missing fields from an incoming JSON payload?",
    shortAnswer: "required_fields - set(payload.keys()).",
    explanation: "Subtracting the payload's keys from the required schema set instantly identifies all missing mandatory fields in O(N) time.",
    hint: "Subtract received keys from required fields.",
    level: "moderate",
    codeExample: "required = {\"name\", \"email\", \"phone\"}\npayload = {\"name\": \"Susmita\", \"email\": \"s@test.com\"}\nmissing = required - set(payload.keys())\nprint(\"Missing fields:\", missing)  # {'phone'}"
  },
  {
    question: "Can set operations be performed using dictionary keys views directly in Python 3?",
    shortAnswer: "Yes! In Python 3, dict.keys() supports full set operations (&, |, -, ^) without needing set() conversion.",
    explanation: "dict_keys views are set-like objects that implement set algebraic operators directly in O(1) per key lookup.",
    hint: "dict.keys() supports set operators directly.",
    level: "expert",
    codeExample: "d1 = {\"a\": 1, \"b\": 2}\nd2 = {\"b\": 3, \"c\": 4}\nprint(d1.keys() & d2.keys())  # {'b'}"
  },
  {
    question: "What happens if you pass an empty generator to s.intersection()?",
    shortAnswer: "It returns an empty set set().",
    explanation: "Intersection with an empty iterable yields zero common elements, returning set().",
    hint: "Intersection with empty generator yields set().",
    level: "moderate",
    codeExample: "s = {1, 2, 3}\nres = s.intersection(x for x in [])\nprint(res)  # set()"
  },
  {
    question: "How does set algebra simplify Role-Based Access Control (RBAC) permission resolution?",
    shortAnswer: "User effective permissions = (Role Permissions | Assigned Privileges) - Revoked Privileges.",
    explanation: "Set operations allow computing final effective privileges in a single, readable, and lightning-fast line of Python code.",
    hint: "Combine roles with union and remove revokes with difference.",
    level: "moderate",
    codeExample: "role_perms = {\"READ\", \"WRITE\"}\nextra_perms = {\"EXPORT\"}\nrevoked = {\"WRITE\"}\neffective = (role_perms | extra_perms) - revoked\nprint(effective)  # {'READ', 'EXPORT'}"
  },
  {
    question: "What is the summary guideline for choosing between set operators (| & - ^) vs set methods (.union, etc.)?",
    shortAnswer: "Use operators for concise code when both operands are known to be sets; use named methods when working with lists, generators, or heterogeneous iterables.",
    explanation: "Following this rule maximizes code conciseness while preventing TypeErrors when dealing with mixed data structures.",
    hint: "Known sets -> Operators; Arbitrary iterables -> Methods.",
    level: "basic",
    codeExample: "# Golden Rule:\n# Set + Set -> A | B\n# Set + List -> A.union(my_list)"
  }
];

export default questions;
