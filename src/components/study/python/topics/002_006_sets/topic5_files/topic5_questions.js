// src/components/study/python/topics/002_006_sets/topic5_files/topic5_questions.js
// 30 Comprehensive Master Review Questions for Topic 5: Removing Elements (remove, discard, pop, clear)

const questions = [
  {
    question: "What is the crucial difference between set.remove() and set.discard() when the specified element does NOT exist?",
    shortAnswer: "set.remove(x) raises a KeyError; set.discard(x) completes silently without raising any error.",
    explanation: "Both methods remove the element if it exists in the set. However, if the element is absent, remove() raises KeyError, while discard() is idempotent and safe, acting as a silent no-op.",
    hint: "Think about error-raising strict deletion vs defensive silent deletion.",
    level: "basic",
    codeExample: "s = {\"Kolkata\"}\ns.discard(\"Barrackpore\")  # Safe! No error\n# s.remove(\"Barrackpore\")   # KeyError: 'Barrackpore'"
  },
  {
    question: "What does set.pop() do, and how does its behavior differ from list.pop()?",
    shortAnswer: "set.pop() removes and returns an arbitrary element; list.pop() removes and returns the last element (or specified index).",
    explanation: "Because sets are unordered and have no tail index, set.pop() removes whatever element happens to occupy the first non-empty hash bucket encountered in memory.",
    hint: "Lists pop from the end; sets pop an arbitrary item.",
    level: "moderate",
    codeExample: "s = {\"A\", \"B\", \"C\"}\nitem = s.pop()\nprint(\"Popped:\", item)\nprint(\"Remaining:\", s)"
  },
  {
    question: "What happens if you call set.pop() on an empty set?",
    shortAnswer: "It raises KeyError: 'pop from an empty set'.",
    explanation: "When len(s) == 0, set.pop() has no elements to extract, raising a KeyError. You should verify len(s) > 0 or use a try/except block when popping dynamically.",
    hint: "An empty set raises KeyError on pop.",
    level: "basic",
    codeExample: "empty_set = set()\ntry:\n    empty_set.pop()\nexcept KeyError as e:\n    print(e)  # 'pop from an empty set'"
  },
  {
    question: "What is the effect of calling set.clear() on a populated set?",
    shortAnswer: "It empties the set in place, leaving an empty set() with len(s) == 0.",
    explanation: "set.clear() wipes all hash bucket entries and resets the set's active element count to 0, mutating the set in place without changing its memory identity.",
    hint: "clear() resets the set to empty set().",
    level: "basic",
    codeExample: "s = {1, 2, 3}\ns.clear()\nprint(s)       # set()\nprint(len(s))  # 0"
  },
  {
    question: "What is the time complexity of set.remove(x) and set.discard(x)?",
    shortAnswer: "Both execute in O(1) average time complexity.",
    explanation: "Both compute hash(x) and inspect the target bucket directly. Removing the entry and marking the bucket slot as a dummy tombstone takes constant O(1) time.",
    hint: "Direct hash lookup allows O(1) constant-time deletion.",
    level: "moderate",
    codeExample: "# s.remove(x)  -> O(1) average\n# s.discard(x) -> O(1) average"
  },
  {
    question: "How does Python handle bucket deletions internally without breaking hash collision chains?",
    shortAnswer: "It marks deleted slots with a special 'dummy' / tombstone marker rather than truly emptying them.",
    explanation: "If Python cleared the bucket completely to NULL, subsequent lookups for colliding elements further down the probe chain would stop prematurely. Marking deleted slots as dummy entries preserves open-addressing probe continuity.",
    hint: "Tombstone markers preserve probing continuity.",
    level: "expert",
    codeExample: "# CPython uses PySet_Dummy to preserve probing sequences"
  },
  {
    question: "How can you remove multiple elements from a set simultaneously without looping?",
    shortAnswer: "Use set.difference_update(iterable) or the -= operator.",
    explanation: "s.difference_update([item1, item2]) removes all items found in the passed iterable in-place. The -= operator (e.g. s -= {item1, item2}) performs the same operation with another set.",
    hint: "Use difference_update() or the -= operator.",
    level: "moderate",
    codeExample: "s = {1, 2, 3, 4, 5}\ns.difference_update([2, 4, 99])\nprint(s)  # {1, 3, 5}"
  },
  {
    question: "Why should you NOT use s.remove(x) inside a for loop iterating over s?",
    shortAnswer: "It raises RuntimeError: Set changed size during iteration.",
    explanation: "Mutating the set during active iteration invalidates the iterator's bucket cursor offset, causing Python to terminate the loop with a RuntimeError.",
    hint: "Modifying while iterating triggers RuntimeError.",
    level: "moderate",
    codeExample: "s = {1, 2, 3, 4}\ntry:\n    for x in s:\n        if x % 2 == 0:\n            s.remove(x)\nexcept RuntimeError as e:\n    print(e)  # Set changed size during iteration"
  },
  {
    question: "What is the safe pattern to remove items from a set based on a condition?",
    shortAnswer: "Use a set comprehension s = {x for x in s if not condition} or iterate over s.copy().",
    explanation: "Rebuilding the set with a comprehension is clean and pythonic. Alternatively, for x in s.copy(): allows calling s.remove(x) safely because the loop iterates over an independent clone.",
    hint: "Rebuild via comprehension or loop over a copy.",
    level: "moderate",
    codeExample: "s = {1, 2, 3, 4, 5, 6}\n# Clean comprehension filtering:\ns = {x for x in s if x % 2 != 0}\nprint(s)  # {1, 3, 5}"
  },
  {
    question: "What is the return value of set.remove(), set.discard(), and set.clear()?",
    shortAnswer: "All three methods return None (in-place mutations).",
    explanation: "Like all mutating container methods in standard Python, remove, discard, and clear return None to signify that the underlying object was modified in place.",
    hint: "All three return None.",
    level: "basic",
    codeExample: "s = {\"A\", \"B\"}\nprint(s.discard(\"A\"))  # None\nprint(s.clear())        # None"
  },
  {
    question: "What happens if you try to remove an unhashable object using s.discard([1, 2])?",
    shortAnswer: "It raises TypeError: unhashable type: 'list'.",
    explanation: "Even though discard() does not raise a KeyError for missing elements, it still must compute hash(item) to check the hash table. Passing an unhashable list fails at the hash computation step.",
    hint: "discard still needs to compute hash(x).",
    level: "expert",
    codeExample: "s = {1, 2, 3}\ntry:\n    s.discard([1, 2])\nexcept TypeError as e:\n    print(e)  # unhashable type: 'list'"
  },
  {
    question: "How can you drain an entire set element-by-element using a while loop?",
    shortAnswer: "while s: item = s.pop(); process(item).",
    explanation: "Because an empty set evaluates to False in boolean context (truthiness), while s: will pop and process items until the set is completely empty.",
    hint: "Use while s: combined with s.pop().",
    level: "basic",
    codeExample: "tasks = {\"Task-A\", \"Task-B\", \"Task-C\"}\nwhile tasks:\n    current = tasks.pop()\n    print(\"Processing:\", current)\nprint(\"All tasks completed. Set is now:\", tasks)"
  },
  {
    question: "What is the difference between s.difference(other) and s.difference_update(other)?",
    shortAnswer: "s.difference(other) returns a NEW set; s.difference_update(other) mutates s in place and returns None.",
    explanation: "difference() creates a new third set containing elements present in s but absent from other. difference_update() removes those elements directly from s.",
    hint: "difference returns new; difference_update mutates in place.",
    level: "moderate",
    codeExample: "s1 = {1, 2, 3}\ns2 = {2, 3, 4}\nnew_s = s1.difference(s2)  # s1 is still {1, 2, 3}\ns1.difference_update(s2)   # s1 becomes {1}"
  },
  {
    question: "How do you safely remove a student ID from an active batch roster only if present?",
    shortAnswer: "Use active_roster.discard(student_id).",
    explanation: "discard() safely removes the student ID if found, and does nothing if the student was not enrolled, preventing application crashes.",
    hint: "Use discard() for defensive, crash-proof deletion.",
    level: "basic",
    codeExample: "roster = {\"STU-101\", \"STU-102\"}\nroster.discard(\"STU-101\")  # Removed\nroster.discard(\"STU-999\")  # Safe no-op"
  },
  {
    question: "Why is s.clear() better than reassigning s = set() when other variables share the set reference?",
    shortAnswer: "s.clear() clears the shared memory object in place; s = set() only rebinds the local variable name to a new object.",
    explanation: "If ref = s, calling s.clear() empties the shared set so ref is also empty. Writing s = set() rebinds s to a new set, leaving ref pointing to the old un-cleared set.",
    hint: "In-place mutation updates all shared aliases.",
    level: "expert",
    codeExample: "s = {1, 2, 3}\nref = s\ns.clear()        # Both s and ref are now set()\nprint(ref)       # set()"
  },
  {
    question: "What is the output of: s = {1, 2, 3}; s.remove(2); s.discard(2); print(s)?",
    shortAnswer: "{1, 3}.",
    explanation: "s.remove(2) removes 2. Then s.discard(2) looks for 2, finds it absent, and does nothing silently. The final set is {1, 3}.",
    hint: "The second call to discard on 2 is a safe no-op.",
    level: "basic",
    codeExample: "s = {1, 2, 3}\ns.remove(2)\ns.discard(2)\nprint(s)  # {1, 3}"
  },
  {
    question: "Can set.remove() take multiple arguments: s.remove(1, 2)?",
    shortAnswer: "No, set.remove() takes exactly 1 argument (raises TypeError if multiple are passed).",
    explanation: "set.remove accepts exactly one parameter. To remove multiple elements, use difference_update([1, 2]) or -= {1, 2}.",
    hint: "remove() takes exactly one element.",
    level: "basic",
    codeExample: "s = {1, 2, 3}\n# s.remove(1, 2)  # TypeError: set.remove() takes exactly one argument\ns -= {1, 2}       # Correct!"
  },
  {
    question: "What error occurs if you call del s[0] on a set?",
    shortAnswer: "TypeError: 'set' object doesn't support item deletion.",
    explanation: "Because sets do not support index subscription or key mapping assignment, del s[0] fails with a TypeError. You must use s.remove(x) or s.discard(x).",
    hint: "del s[index] fails because sets have no indices.",
    level: "moderate",
    codeExample: "s = {10, 20}\ntry:\n    del s[0]\nexcept TypeError as e:\n    print(e)  # 'set' object doesn't support item deletion"
  },
  {
    question: "What is the difference between del s and s.clear()?",
    shortAnswer: "del s deletes the variable name s from scope; s.clear() empties the elements inside the set while keeping the variable alive.",
    explanation: "After del s, referencing s raises a NameError. After s.clear(), s still exists as a valid empty set object set().",
    hint: "del destroys the variable; clear empties the container.",
    level: "basic",
    codeExample: "s = {1, 2}\ns.clear()  # s is still defined as set()\ndel s      # s is completely deleted from namespace"
  },
  {
    question: "How does set.discard() simplify defensive code compared to try/except remove?",
    shortAnswer: "discard() eliminates 4 lines of boilerplate try/except KeyError handling with a clean 1-line call.",
    explanation: "Instead of writing try: s.remove(x) except KeyError: pass, calling s.discard(x) expresses the same intent in a single readable line.",
    hint: "discard replaces try: remove except KeyError: pass.",
    level: "basic",
    codeExample: "# Verbose:\ntry:\n    s.remove(x)\nexcept KeyError:\n    pass\n\n# Pythonic:\ns.discard(x)"
  },
  {
    question: "What happens if you remove True from a set containing {1, 2, 3}?",
    shortAnswer: "1 is removed, leaving {2, 3}, because True == 1 and hash(True) == hash(1).",
    explanation: "Because True and 1 compare equal and have the same hash code, s.remove(True) matches and deletes the element 1 from the set.",
    hint: "True and 1 are identical in set lookups.",
    level: "expert",
    codeExample: "s = {1, 2, 3}\ns.remove(True)\nprint(s)  # {2, 3}"
  },
  {
    question: "What happens if you remove 0 from a set containing {False, 'Kolkata'}?",
    shortAnswer: "False is removed, leaving {'Kolkata'}, because False == 0 and hash(False) == hash(0).",
    explanation: "Because 0 and False are numerically equal and share hash 0, s.remove(0) matches and deletes False.",
    hint: "0 and False are treated as identical elements.",
    level: "expert",
    codeExample: "s = {False, \"Kolkata\"}\ns.remove(0)\nprint(s)  # {'Kolkata'}"
  },
  {
    question: "Can set.pop() be used to implement a non-deterministic task worker pool?",
    shortAnswer: "Yes, worker threads can pop jobs from a shared set until empty.",
    explanation: "Calling job = tasks.pop() extracts an arbitrary task in O(1) time without needing to track pointer indices.",
    hint: "pop() is great for draining a pool of unordered jobs.",
    level: "moderate",
    codeExample: "jobs = {\"job_101\", \"job_102\", \"job_103\"}\nwhile jobs:\n    exec_job = jobs.pop()"
  },
  {
    question: "What happens when you pass a set of elements to difference_update: s1.difference_update(s2)?",
    shortAnswer: "All elements present in s2 are removed from s1 in-place.",
    explanation: "s1 is mutated directly by removing any member that also exists in s2.",
    hint: "difference_update subtracts in place.",
    level: "basic",
    codeExample: "s1 = {\"A\", \"B\", \"C\"}\ns2 = {\"B\", \"C\", \"D\"}\ns1.difference_update(s2)\nprint(s1)  # {'A'}"
  },
  {
    question: "How do you remove all vowels from a set of characters?",
    shortAnswer: "char_set.difference_update('aeiouAEIOU') or char_set -= set('aeiouAEIOU').",
    explanation: "Passing the vowel string to difference_update unpacks all vowel characters and removes them from char_set in-place.",
    hint: "Use difference_update with the vowel string.",
    level: "basic",
    codeExample: "chars = set(\"barrackpore\")\nchars.difference_update(\"aeiou\")\nprint(chars)  # {'b', 'r', 'c', 'k', 'p'}"
  },
  {
    question: "What is the memory impact of calling set.clear() on a 1,000,000 element set in CPython?",
    shortAnswer: "It deletes all elements and shrinks the internal hash table down to its minimal 8-slot array size, freeing memory.",
    explanation: "set.clear() deallocates the large hash table buffer and re-initializes a small 8-slot PySetObject struct, instantly releasing RAM back to Python's memory manager.",
    hint: "clear() releases the large allocated table memory.",
    level: "expert",
    codeExample: "import sys\ns = set(range(100000))\nprint(\"Populated Size:\", sys.getsizeof(s))  # ~4MB\ns.clear()\nprint(\"Cleared Size:\", sys.getsizeof(s))    # ~216 bytes"
  },
  {
    question: "Why does s -= [1, 2] raise a TypeError while s.difference_update([1, 2]) works?",
    shortAnswer: "The -= operator requires both operands to be sets; the difference_update() method accepts any iterable.",
    explanation: "Operators enforce strict type matching (both operands must be sets). Named methods accept any iterable (lists, tuples, ranges, etc.).",
    hint: "Operators require sets; methods accept any iterable.",
    level: "expert",
    codeExample: "s = {1, 2, 3}\n# s -= [1, 2]               # TypeError\ns.difference_update([1, 2]) # Valid! s becomes {3}"
  },
  {
    question: "What is the difference between removing an element from a set vs removing an element from a list?",
    shortAnswer: "Set removal is O(1) by value; list removal (list.remove(x)) is slow O(N) because it must scan and shift array memory.",
    explanation: "Removing from a list requires scanning elements sequentially O(N) and shifting all subsequent pointers. Removing from a set computes hash(x) and clears the bucket in O(1) without shifting any elements.",
    hint: "Set removal is O(1) without memory shifts; list removal is O(N).",
    level: "moderate",
    codeExample: "# Set:  s.remove(val)    -> O(1)\n# List: l.remove(val)    -> O(N) (Linear search + array shift)"
  },
  {
    question: "How can you remove an element from a frozenset?",
    shortAnswer: "You cannot; frozenset is immutable and has no remove, discard, pop, or clear methods.",
    explanation: "frozenset objects cannot be mutated. To remove an item, you must construct a new frozenset: new_fs = frozenset(x for x in fs if x != target).",
    hint: "frozenset is completely immutable.",
    level: "moderate",
    codeExample: "fs = frozenset([1, 2, 3])\n# fs.remove(2)  # AttributeError\nnew_fs = frozenset(x for x in fs if x != 2)"
  },
  {
    question: "What is the key takeaway for a Python developer regarding set removal methods?",
    shortAnswer: "Use .discard() for safe defensive deletions, .remove() when absence is an error, .pop() to drain queues, and .clear() to reset state.",
    explanation: "Choosing the correct deletion method ensures clean error boundaries, prevents unnecessary try/except blocks, and maintains robust, high-performance applications.",
    hint: "Match the removal tool to the requirement: Safe -> discard; Strict -> remove; Drain -> pop.",
    level: "basic",
    codeExample: "# Golden Removal Rule:\n# Strict: s.remove(x)\n# Safe:   s.discard(x)\n# Drain:  s.pop()\n# Reset:  s.clear()"
  }
];

export default questions;
