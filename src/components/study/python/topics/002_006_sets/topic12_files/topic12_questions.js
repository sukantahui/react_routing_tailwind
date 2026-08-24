// src/components/study/python/topics/002_006_sets/topic12_files/topic12_questions.js
// 30 Comprehensive Master Review Questions for Topic 12: Set Comparison (Subset, Superset, Disjoint)

const questions = [
  {
    question: "What is the difference between a subset (<=) and a proper subset (<) in Python?",
    shortAnswer: "A <= B is True if all elements of A are in B (including when A == B); A < B is True only if all elements of A are in B AND A != B.",
    explanation: "Standard subset allows equality (every set is a subset of itself: A <= A is True). A proper (strict) subset requires set A to be strictly smaller than set B with at least one element in B that is missing from A.",
    hint: "Proper subset disallows equal sets.",
    level: "basic",
    codeExample: "A = {1, 2}\nB = {1, 2}\nC = {1, 2, 3}\nprint(A <= B)  # True (Standard subset)\nprint(A < B)   # False (Equal, so not a proper subset)\nprint(A < C)   # True (Strict proper subset)"
  },
  {
    question: "Is there a named method in Python for strict proper subsets (e.g. A.ispropersubset(B))?",
    shortAnswer: "No, Python only provides issubset() and issuperset(); strict comparisons must be written with the '<' and '>' operators.",
    explanation: "Python's built-in set type intentionally does not have ispropersubset() or ispropersuperset() methods. Developers must use A < B and A > B.",
    hint: "Strict proper comparisons are operator-only.",
    level: "basic",
    codeExample: "A, B = {1, 2}, {1, 2, 3}\n# A.ispropersubset(B)  # AttributeError!\nprint(A < B)            # True (Operator only)"
  },
  {
    question: "What is the return value of set.isdisjoint() and what does it test?",
    shortAnswer: "It returns True if two sets have NO elements in common (their intersection is empty); False otherwise.",
    explanation: "Two sets are disjoint if A ∩ B == ∅. For example, {1, 2}.isdisjoint({3, 4}) returns True.",
    hint: "Disjoint means zero common items.",
    level: "basic",
    codeExample: "print({1, 2}.isdisjoint({3, 4}))  # True\nprint({1, 2}.isdisjoint({2, 3}))  # False (2 is shared)"
  },
  {
    question: "Why is A.isdisjoint(B) vastly faster than writing bool(A & B) == False?",
    shortAnswer: "isdisjoint() short-circuits on the very first common element without allocating a new intersection set object in memory.",
    explanation: "A & B allocates an entirely new set object and checks every element. isdisjoint() loops over the smaller set and exits with False as soon as 1 match is found, with 0 memory allocation.",
    hint: "isdisjoint short-circuits and allocates zero memory.",
    level: "expert",
    codeExample: "# SLOW (allocates new set): not bool(A & B)\n# FAST (short-circuits O(1)): A.isdisjoint(B)"
  },
  {
    question: "Is an empty set a subset of every set?",
    shortAnswer: "Yes, set() <= S is always True for any set S (including set() <= set()).",
    explanation: "By mathematical definition of vacuously true statements, the empty set contains no elements that could fail the subset condition, making it a subset of every set.",
    hint: "The empty set is a subset of all sets.",
    level: "basic",
    codeExample: "print(set() <= {1, 2, 3})  # True\nprint(set().issubset({}))   # True"
  },
  {
    question: "Is an empty set a proper subset of an empty set: set() < set()?",
    shortAnswer: "False, because a proper subset requires A != B, and set() == set().",
    explanation: "Since both sets are identical, set() < set() evaluates to False.",
    hint: "A set cannot be a proper subset of itself.",
    level: "moderate",
    codeExample: "print(set() < set())       # False\nprint(set() < {1})         # True"
  },
  {
    question: "What is the output of {1, 2}.issubset([1, 2, 3]) versus {1, 2} <= [1, 2, 3]?",
    shortAnswer: ".issubset() returns True; '<=' raises a TypeError.",
    explanation: "Named methods accept any iterable (lists, tuples, ranges); relational operators strictly require set operands on both sides.",
    hint: "Methods accept lists; operators require sets.",
    level: "moderate",
    codeExample: "s = {1, 2}\nprint(s.issubset([1, 2, 3]))  # True\n# print(s <= [1, 2, 3])       # TypeError"
  },
  {
    question: "What does A.issuperset(B) check?",
    shortAnswer: "Checks if set A contains every element found in collection B (equivalent to A >= B).",
    explanation: "If B is a subset of A, then A is a superset of B.",
    hint: "Superset is the reverse of subset.",
    level: "basic",
    codeExample: "admin_perms = {\"READ\", \"WRITE\", \"DELETE\"}\nuser_perms = {\"READ\"}\nprint(admin_perms.issuperset(user_perms))  # True"
  },
  {
    question: "What is the time complexity of A.issubset(B)?",
    shortAnswer: "O(len(A)) where len(A) is the number of elements in set A.",
    explanation: "Python checks each element of set A to see if it exists in set B using O(1) hash lookups, short-circuiting to False on the first missing item.",
    hint: "Proportional to the size of set A.",
    level: "moderate",
    codeExample: "# Time: O(len(A))"
  },
  {
    question: "What is the time complexity of A.isdisjoint(B)?",
    shortAnswer: "O(min(len(A), len(B))) in the worst case, and O(1) in the best case.",
    explanation: "Python iterates through the smaller collection and checks membership in the larger set, returning False as soon as the first match is found.",
    hint: "Python iterates over the smaller collection.",
    level: "expert",
    codeExample: "# Worst case: O(min(len(A), len(B))); Best case: O(1)"
  },
  {
    question: "How can you check if two sets have identical elements using subset operators?",
    shortAnswer: "(A <= B) and (B <= A).",
    explanation: "By mathematical definition of set equality (Antisymmetry), if A is a subset of B and B is a subset of A, then A == B.",
    hint: "Two-way subset implies equality.",
    level: "moderate",
    codeExample: "A = {1, 2}\nB = {2, 1}\nprint((A <= B) and (B <= A))  # True (Equivalent to A == B)"
  },
  {
    question: "What is the result of {1, 2}.isdisjoint(set())?",
    shortAnswer: "True (an empty set shares zero elements with any set).",
    explanation: "Because an empty set has no items, it cannot share any elements with {1, 2}, satisfying disjointness.",
    hint: "Any set is disjoint with the empty set.",
    level: "basic",
    codeExample: "print({1, 2}.isdisjoint(set()))  # True"
  },
  {
    question: "What is the output of set().isdisjoint(set())?",
    shortAnswer: "True.",
    explanation: "Two empty sets share 0 elements, returning True.",
    hint: "Empty sets share zero items.",
    level: "basic",
    codeExample: "print(set().isdisjoint(set()))  # True"
  },
  {
    question: "How can you verify that a user possesses ALL required permissions for an API endpoint?",
    shortAnswer: "required_permissions.issubset(user_permissions) or user_permissions >= required_permissions.",
    explanation: "Checking that the required permission set is a subset of the user's assigned permissions guarantees full authorization.",
    hint: "Check if required permissions are a subset of user permissions.",
    level: "basic",
    codeExample: "required = {\"AUTH\", \"READ\", \"WRITE\"}\nuser = {\"AUTH\", \"READ\", \"WRITE\", \"ADMIN\"}\nprint(required <= user)  # True (Access Granted)"
  },
  {
    question: "How can you verify that a student has completed ALL prerequisite courses before enrollment?",
    shortAnswer: "prerequisites <= completed_courses.",
    explanation: "If the prerequisite set is a subset of completed courses, the student meets all enrollment criteria.",
    hint: "Use the subset operator <=.",
    level: "basic",
    codeExample: "prereqs = {\"Python-101\", \"Math-201\"}\nstudent = {\"Python-101\", \"Math-201\", \"Physics-101\"}\nprint(prereqs <= student)  # True"
  },
  {
    question: "Can set comparison operators (<, <=, >, >=) be used between a set and a frozenset?",
    shortAnswer: "Yes, standard sets and frozensets can be compared directly using relational operators.",
    explanation: "Python supports cross-type comparisons between mutable sets and immutable frozensets based on their elements.",
    hint: "Sets and frozensets are fully comparable.",
    level: "basic",
    codeExample: "s = {1, 2}\nfs = frozenset([1, 2, 3])\nprint(s < fs)   # True\nprint(fs >= s)  # True"
  },
  {
    question: "What happens if you compare two sets with unrelated elements: is {1, 2} < {3, 4} True or False?",
    shortAnswer: "False, because {1, 2} is NOT a subset of {3, 4}.",
    explanation: "Set relational operators (<, <=, >, >=) test subset/superset relationships, NOT numerical element values. Since elements 1 and 2 are not in {3, 4}, it returns False.",
    hint: "Set comparison tests containment, not numerical magnitude.",
    level: "moderate",
    codeExample: "print({1, 2} < {3, 4})   # False\nprint({1, 2} <= {3, 4})  # False\nprint({1, 2} >= {3, 4})  # False"
  },
  {
    question: "What is a 'Partial Order' in mathematics and why does it describe Python set comparisons?",
    shortAnswer: "In a partial order, not every pair of sets is comparable: two disjoint sets can be neither <= nor >= to each other.",
    explanation: "Unlike integers where either a <= b or b <= a is always true (total order), two distinct non-overlapping sets can both return False for <= and >=.",
    hint: "Some sets are incomparable under subset relations.",
    level: "expert",
    codeExample: "A, B = {1, 2}, {3, 4}\nprint(A <= B)  # False\nprint(B <= A)  # False"
  },
  {
    question: "How can you check if two work shifts have a schedule conflict (overlap in employees)?",
    shortAnswer: "not shift1.isdisjoint(shift2).",
    explanation: "If isdisjoint() returns False, it means at least one employee is scheduled for both shifts, indicating a conflict.",
    hint: "If they are NOT disjoint, a conflict exists.",
    level: "basic",
    codeExample: "shift1 = {\"Susmita\", \"Debangshu\"}\nshift2 = {\"Debangshu\", \"Rohan\"}\nhas_conflict = not shift1.isdisjoint(shift2)\nprint(\"Shift conflict? ->\", has_conflict)  # True"
  },
  {
    question: "What is the output of {True, False} <= {0, 1} and why?",
    shortAnswer: "True, because True == 1 and False == 0 in Python.",
    explanation: "Since boolean values equal integers 0 and 1 with matching hashes, all elements of {True, False} exist in {0, 1}.",
    hint: "True/False are equal to 1/0.",
    level: "expert",
    codeExample: "print({True, False} <= {0, 1})  # True"
  },
  {
    question: "What is the output of: s = {1, 2, 3}; print(s.issuperset([]))?",
    shortAnswer: "True, because every set is a superset of the empty sequence.",
    explanation: "An empty collection contains 0 elements, so s contains all 0 of them trivially.",
    hint: "Every set is a superset of an empty collection.",
    level: "basic",
    codeExample: "print({1, 2, 3}.issuperset([]))  # True"
  },
  {
    question: "How can you verify that a given dictionary contains all required keys using issubset?",
    shortAnswer: "required_keys.issubset(my_dict.keys()) or required_keys <= my_dict.keys().",
    explanation: "In Python 3, dict.keys() acts as a set-like object and supports subset tests directly.",
    hint: "Check if required keys are a subset of dict.keys().",
    level: "moderate",
    codeExample: "required = {\"username\", \"email\", \"password\"}\npayload = {\"username\": \"susmita\", \"email\": \"s@test.com\", \"password\": \"secret\"}\nprint(required <= payload.keys())  # True"
  },
  {
    question: "What is the output of: {1, 2} > {1, 2}?",
    shortAnswer: "False, because proper superset (>) requires the left set to have strictly more elements.",
    explanation: "Equal sets cannot be proper supersets of each other.",
    hint: "Proper superset requires strictly greater size.",
    level: "basic",
    codeExample: "print({1, 2} > {1, 2})   # False\nprint({1, 2} >= {1, 2})  # True"
  },
  {
    question: "How do you check if a set of allowed file extensions contains an uploaded file extension?",
    shortAnswer: "{file_ext}.issubset(allowed_extensions) or file_ext in allowed_extensions.",
    explanation: "Both work in O(1) time; 'file_ext in allowed_extensions' is the standard single-item pattern.",
    hint: "Use in or issubset.",
    level: "basic",
    codeExample: "allowed = {\"pdf\", \"docx\", \"png\"}\nupload_ext = \"pdf\"\nprint(upload_ext in allowed)  # True"
  },
  {
    question: "What happens if you compare sets using max({1, 2}, {3, 4})?",
    shortAnswer: "It raises TypeError: '>' not supported between instances of 'set' and 'set' (unless one is a proper superset of the other).",
    explanation: "max() attempts total ordering with >. Since sets have a partial order, comparing incomparable sets with max() raises a TypeError.",
    hint: "Sets cannot be totally ordered by max().",
    level: "expert",
    codeExample: "try:\n    max({1, 2}, {3, 4})\nexcept TypeError as e:\n    print(e)  # '>' not supported between instances of 'set' and 'set'"
  },
  {
    question: "Can set.isdisjoint() be passed a generator expression?",
    shortAnswer: "Yes, isdisjoint() consumes the generator lazily and stops at the first matching element.",
    explanation: "Passing a generator allows verifying disjointness without creating an intermediate container in memory.",
    hint: "Generators work lazily with isdisjoint().",
    level: "moderate",
    codeExample: "s = {10, 20, 30}\nprint(s.isdisjoint(x for x in [1, 2, 3]))  # True"
  },
  {
    question: "What is the result of comparing {1, 2} == [1, 2]?",
    shortAnswer: "False, because Python never considers objects of different types (set vs list) equal.",
    explanation: "Equality == checks both type compatibility and contents. A set never equals a list.",
    hint: "Different container types are never equal.",
    level: "basic",
    codeExample: "print({1, 2} == [1, 2])  # False"
  },
  {
    question: "How does set.isdisjoint() prevent security privilege escalation vulnerabilities?",
    shortAnswer: "By asserting that standard user permission sets are disjoint with dangerous superuser privileges.",
    explanation: "Security gateways verify user_perms.isdisjoint(BANNED_ADMIN_ACTIONS) to block privilege escalation attacks.",
    hint: "Disjointness guarantees zero unauthorized privileges.",
    level: "moderate",
    codeExample: "banned = {\"ROOT_EXEC\", \"WIPE_DATA\"}\nuser = {\"READ\", \"WRITE\"}\nassert user.isdisjoint(banned)  # Security check passes"
  },
  {
    question: "What is the output of {1, 2} < {1, 2, 3} < {1, 2, 3, 4}?",
    shortAnswer: "True (Python supports chained relational set comparisons).",
    explanation: "Chained comparisons are evaluated as (set1 < set2) and (set2 < set3), both of which are True.",
    hint: "Python chains set comparisons seamlessly.",
    level: "moderate",
    codeExample: "print({1, 2} < {1, 2, 3} < {1, 2, 3, 4})  # True"
  },
  {
    question: "What is the key takeaway for a software developer regarding set comparisons?",
    shortAnswer: "Use <= / issubset to verify prerequisites and permissions, >= / issuperset to check capabilities, and isdisjoint for fast conflict and safety audits.",
    explanation: "Understanding partial ordering and short-circuiting makes your conditional verification logic fast, expressive, and bug-free.",
    hint: "<= for Requirements; >= for Capabilities; isdisjoint for Conflict Checking.",
    level: "basic",
    codeExample: "# Summary Checklist:\n# 1. Prereqs Met:   required <= student_skills\n# 2. Has All Perms: user_perms >= required_perms\n# 3. No Conflicts:  shift_a.isdisjoint(shift_b)"
  }
];

export default questions;
