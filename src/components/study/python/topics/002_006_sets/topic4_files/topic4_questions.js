// src/components/study/python/topics/002_006_sets/topic4_files/topic4_questions.js
// 30 Comprehensive Master Review Questions for Topic 4: Adding Elements (add vs update)

const questions = [
  {
    question: "What is the primary difference between set.add() and set.update() in Python?",
    shortAnswer: "add() takes a single hashable element; update() takes one or more iterables and unpacks their elements into the set.",
    explanation: "s.add(item) calculates hash(item) and inserts it as one distinct member. s.update(iterable) loops over the iterable, unpacking each child item and inserting it individually. Both modify the set in place.",
    hint: "One adds a single item; the other unpacks an iterable collection.",
    level: "basic",
    codeExample: "s = {10, 20}\ns.add(30)          # {10, 20, 30}\ns.update([40, 50]) # {10, 20, 30, 40, 50}"
  },
  {
    question: "What is the return value of set.add() and set.update()?",
    shortAnswer: "Both return None because they modify the set in place.",
    explanation: "In accordance with Python's API design philosophy, mutating methods (like list.append, dict.update, set.add) return None to clearly signal that the container was mutated in place. Reassigning s = s.add(x) destroys the set by assigning None to s.",
    hint: "In-place mutation methods always return None in Python.",
    level: "basic",
    codeExample: "s = {\"A\"}\nres = s.add(\"B\")\nprint(res)  # None\nprint(s)    # {'A', 'B'}"
  },
  {
    question: "What happens when you pass a string to set.update() vs set.add()?",
    shortAnswer: "add('Kolkata') adds the complete string 'Kolkata'; update('Kolkata') unpacks it into individual characters: 'K', 'o', 'l', 'k', 'a', 't'.",
    explanation: "Strings are iterable sequences of characters. Because update() iterates over its arguments, passing a string unpacks each letter into a separate set element. To add a whole word, you must use add('Kolkata') or pass a 1-element list update(['Kolkata']).",
    hint: "update iterates through strings; add stores strings whole.",
    level: "moderate",
    codeExample: "s1, s2 = set(), set()\ns1.add(\"Kolkata\")\ns2.update(\"Kolkata\")\nprint(s1)  # {'Kolkata'}\nprint(s2)  # {'K', 'o', 'l', 'k', 'a', 't'}"
  },
  {
    question: "Why does s.add([1, 2, 3]) raise a TypeError, but s.update([1, 2, 3]) works perfectly?",
    shortAnswer: "add() attempts to insert the mutable list itself as an unhashable set member; update() unpacks the hashable integers inside the list.",
    explanation: "add() treats [1, 2, 3] as a single entity and attempts hash([1, 2, 3]), which fails with TypeError: unhashable type: 'list'. update() iterates over the list, extracting integers 1, 2, 3 (which are hashable) and inserting them individually.",
    hint: "add tries to hash the container; update extracts the items inside.",
    level: "moderate",
    codeExample: "s = set()\n# s.add([1, 2])     # TypeError: unhashable type: 'list'\ns.update([1, 2])    # Valid! s becomes {1, 2}"
  },
  {
    question: "Can set.update() accept multiple iterables in a single method call?",
    shortAnswer: "Yes, set.update(*iterables) accepts an arbitrary number of iterable arguments separated by commas.",
    explanation: "set.update() has a variadic signature. You can pass lists, tuples, ranges, dictionaries, and sets simultaneously in a single call (e.g. s.update([1, 2], (3, 4), range(5, 7))).",
    hint: "Pass multiple collections separated by commas to update().",
    level: "basic",
    codeExample: "s = set()\ns.update([1, 2], (\"A\", \"B\"), range(10, 12))\nprint(s)  # {1, 2, 'A', 'B', 10, 11}"
  },
  {
    question: "What happens if you add an existing duplicate element using set.add()?",
    shortAnswer: "The operation executes silently with zero error, leaving the set unchanged in size.",
    explanation: "Python computes the hash, discovers the existing match in the target bucket, and completes in O(1) time without raising exceptions or creating redundant entries.",
    hint: "Duplicate addition is a safe, silent no-op.",
    level: "basic",
    codeExample: "s = {\"Barrackpore\"}\ns.add(\"Barrackpore\")\nprint(len(s))  # 1"
  },
  {
    question: "What is the time complexity of set.add(item) vs set.update(iterable)?",
    shortAnswer: "add() is O(1) average time; update(iterable) is O(K) where K is the number of elements in the iterable.",
    explanation: "add() computes one hash and performs one bucket write in O(1) time. update() loops through K elements, performing K separate O(1) hash insertions, resulting in O(K) total time complexity.",
    hint: "1 item = O(1); K items = O(K).",
    level: "moderate",
    codeExample: "# s.add(x)       -> O(1)\n# s.update(list) -> O(len(list))"
  },
  {
    question: "What elements are added when a dictionary is passed to set.update(my_dict)?",
    shortAnswer: "Only the dictionary's keys are added to the set.",
    explanation: "Iterating over a dictionary yields its keys. Therefore, set.update(my_dict) adds the dictionary's keys. To add values, pass set.update(my_dict.values()).",
    hint: "Dictionaries iterate over keys by default.",
    level: "moderate",
    codeExample: "fees = {\"Python\": 4500, \"React\": 3500}\ns = set()\ns.update(fees)\nprint(s)  # {'Python', 'React'}"
  },
  {
    question: "What is the operator equivalent of set.update() in Python?",
    shortAnswer: "The |= (in-place union / augmented assignment) operator.",
    explanation: "Writing s |= other_set mutates s in place by adding all elements from other_set, acting identically to s.update(other_set). (Note that |= requires a set operand, whereas update() accepts any iterable).",
    hint: "Think about the pipe symbol | with assignment =.",
    level: "moderate",
    codeExample: "s1 = {1, 2}\ns2 = {3, 4}\ns1 |= s2\nprint(s1)  # {1, 2, 3, 4}"
  },
  {
    question: "Why does s |= [1, 2, 3] fail with TypeError while s.update([1, 2, 3]) succeeds?",
    shortAnswer: "The |= operator requires both operands to be sets; the update() method accepts any iterable.",
    explanation: "Python enforces type safety on bitwise/set operators: s |= [1, 2] raises TypeError: unsupported operand type(s) for |=: 'set' and 'list'. The named method s.update() is polymorphic and accepts any iterable.",
    hint: "Operators strictly require sets; methods accept any iterable.",
    level: "expert",
    codeExample: "s = {10}\n# s |= [20, 30]       # TypeError: unsupported operand type for |=\ns.update([20, 30])    # Valid!"
  },
  {
    question: "Can you add an immutable tuple to a set using set.add()? What if the tuple contains a list?",
    shortAnswer: "A tuple of immutable items can be added with add(); a tuple containing a list raises TypeError: unhashable type: 'list'.",
    explanation: "A tuple is hashable only if all of its inner elements are also immutable. add((1, 2)) succeeds, but add((1, [2, 3])) fails during hash evaluation.",
    hint: "Hashability is evaluated recursively through nested containers.",
    level: "moderate",
    codeExample: "s = set()\ns.add((1, 2))        # Valid!\n# s.add((1, [2, 3]))  # TypeError: unhashable type: 'list'"
  },
  {
    question: "What happens if you pass a generator expression to set.update()?",
    shortAnswer: "The generator is lazily consumed in a single pass, inserting all yielded elements into the set.",
    explanation: "set.update(x**2 for x in range(5)) consumes the generator stream without allocating an intermediate list in memory, adding 0, 1, 4, 9, 16 in memory-efficient O(K) time.",
    hint: "Generators are valid iterables and can be consumed by update().",
    level: "moderate",
    codeExample: "s = {100}\ns.update(x**2 for x in range(4))\nprint(s)  # {0, 1, 4, 9, 100}"
  },
  {
    question: "What is the common mistake in: new_set = s.add('Python')?",
    shortAnswer: "new_set is assigned None because .add() mutates s in place and returns None.",
    explanation: "This is one of the most common beginner traps. Because add() returns None, assigning its result to a variable results in losing the reference to the set.",
    hint: "add() returns None; call it as a standalone statement.",
    level: "basic",
    codeExample: "s = set()\ns.add(\"Python\")  # Correct: standalone statement\n# s = s.add(\"React\") # DANGER: s becomes None!"
  },
  {
    question: "How can you add multiple elements from another set into an existing set?",
    shortAnswer: "Use s1.update(s2) or s1 |= s2.",
    explanation: "Both s1.update(s2) and s1 |= s2 perform an in-place union, copying all non-duplicate elements from s2 into s1.",
    hint: "Use update() or the |= operator.",
    level: "basic",
    codeExample: "s1 = {\"Kolkata\", \"Barrackpore\"}\ns2 = {\"Ichapur\", \"Jadavpur\"}\ns1.update(s2)\nprint(s1)"
  },
  {
    question: "What happens if you pass an empty list or empty set to set.update()?",
    shortAnswer: "The set remains unchanged; the operation completes as a silent no-op.",
    explanation: "Because an empty iterable yields zero elements, update() completes immediately without altering the set.",
    hint: "Empty iterables contribute zero items.",
    level: "basic",
    codeExample: "s = {1, 2, 3}\ns.update([])\nprint(s)  # {1, 2, 3}"
  },
  {
    question: "Can you add a custom class instance to a set using set.add()?",
    shortAnswer: "Yes, provided the custom class is hashable (has __hash__ and __eq__).",
    explanation: "User-defined class instances inherit object.__hash__ and object.__eq__ by default, so s.add(my_obj) works out of the box using object memory address hashing.",
    hint: "Custom objects have default address-based hashing.",
    level: "moderate",
    codeExample: "class Student:\n    def __init__(self, name):\n        self.name = name\ns = set()\ns.add(Student(\"Susmita\"))\nprint(len(s))  # 1"
  },
  {
    question: "What is the difference between s.add('item') and s.update(['item'])?",
    shortAnswer: "Both result in the same set state {..., 'item'}, but add() is slightly faster with lower overhead.",
    explanation: "s.add('item') directly pushes the string into the hash table. s.update(['item']) creates a 1-element list in memory, creates an iterator, extracts the item, and then inserts it.",
    hint: "add() avoids creating an intermediate list container.",
    level: "moderate",
    codeExample: "s1, s2 = set(), set()\ns1.add(\"item\")\ns2.update([\"item\"])\nprint(s1 == s2)  # True"
  },
  {
    question: "How does set.update() behave when passed a range object: s.update(range(100, 105))?",
    shortAnswer: "It unpacks and inserts the integers 100, 101, 102, 103, 104 into the set.",
    explanation: "range() is an iterable generating numbers sequentially. update() iterates through the range and inserts each integer into the set's hash table.",
    hint: "range() generates numbers that update() unpacks.",
    level: "basic",
    codeExample: "s = set()\ns.update(range(100, 105))\nprint(sorted(s))  # [100, 101, 102, 103, 104]"
  },
  {
    question: "What happens if you pass None to set.add() vs set.update()?",
    shortAnswer: "add(None) successfully inserts None as a set element; update(None) raises TypeError: 'NoneType' object is not iterable.",
    explanation: "None is an immutable object with a valid hash (hash(None)), so add(None) succeeds. update() requires an iterable, and since None cannot be iterated over, update(None) raises a TypeError.",
    hint: "None is a valid hashable element, but it is not an iterable.",
    level: "expert",
    codeExample: "s = set()\ns.add(None)        # Valid! s becomes {None}\n# s.update(None)   # TypeError: 'NoneType' object is not iterable"
  },
  {
    question: "How does the internal hash table resize when adding many elements via set.add() or set.update()?",
    shortAnswer: "When the load factor exceeds 2/3 (table is >66% full), Python doubles or quadruples the table size and rehashes all elements.",
    explanation: "To keep lookups at O(1) and prevent bucket crowding, CPython automatically allocates a larger hash array (e.g. 8 -> 32 -> 128 -> 512 slots) and re-indexes all active elements into the new array.",
    hint: "Resizing occurs at 2/3 load factor to preserve O(1) speed.",
    level: "expert",
    codeExample: "# Internal CPython table growth: 8 -> 32 -> 128 -> 512 slots"
  },
  {
    question: "Why is s.update(*list_of_sets) an efficient way to merge many sets at once?",
    shortAnswer: "It unpacks all sets into a single C-level update call, avoiding repetitive intermediate set object allocations.",
    explanation: "Calling s.update(*list_of_sets) directly feeds all sets to CPython's internal set_update C function, avoiding multiple Python-level function call frames and intermediate union allocations.",
    hint: "Unpacking with * merges all sets in a single C-level operation.",
    level: "expert",
    codeExample: "batches = [{1, 2}, {3, 4}, {5, 6}]\nmaster_set = set()\nmaster_set.update(*batches)\nprint(master_set)  # {1, 2, 3, 4, 5, 6}"
  },
  {
    question: "What is the output of: s = {10}; s.update({10, 20}); print(len(s))?",
    shortAnswer: "2, containing {10, 20}.",
    explanation: "10 already exists in s, so updating with {10, 20} ignores the duplicate 10 and adds the new element 20, bringing the total length to 2.",
    hint: "Duplicates are skipped during update.",
    level: "basic",
    codeExample: "s = {10}\ns.update({10, 20})\nprint(len(s))  # 2"
  },
  {
    question: "Can set.add() be called with zero arguments (s.add()) or two arguments (s.add(1, 2))?",
    shortAnswer: "No, set.add() strictly requires exactly 1 argument (takes TypeError if 0 or >1 arguments are passed).",
    explanation: "set.add takes exactly one parameter: set.add(element). Calling s.add() or s.add(1, 2) raises TypeError: set.add() takes exactly one argument.",
    hint: "add() accepts exactly one single element.",
    level: "basic",
    codeExample: "s = set()\n# s.add()      # TypeError: set.add() takes exactly one argument (0 given)\n# s.add(1, 2)  # TypeError: set.add() takes exactly one argument (2 given)"
  },
  {
    question: "How can you add all unique words from a sentence string into an existing set?",
    shortAnswer: "Use s.update(sentence.split()).",
    explanation: "sentence.split() splits the text into a list of word strings. Passing this list to s.update() inserts each distinct word into the set.",
    hint: "Use .split() on the string before passing to update().",
    level: "basic",
    codeExample: "vocab = {\"python\"}\nvocab.update(\"learn python at barrackpore\".split())\nprint(vocab)  # {'python', 'learn', 'at', 'barrackpore'}"
  },
  {
    question: "What happens if an exception occurs halfway through set.update(generator)?",
    shortAnswer: "Elements yielded before the exception remain in the set; elements after the exception are not processed.",
    explanation: "set.update() consumes items one by one as they are yielded. If the generator crashes midway, the items already inserted remain in the set (partial mutation).",
    hint: "Items inserted before the crash are preserved.",
    level: "expert",
    codeExample: "def faulty_gen():\n    yield 1\n    yield 2\n    raise ValueError(\"Crash!\")\n\ns = set()\ntry:\n    s.update(faulty_gen())\nexcept ValueError:\n    pass\nprint(s)  # {1, 2} (Partially updated!)"
  },
  {
    question: "What is the difference between set.union() and set.update()?",
    shortAnswer: "union() returns a NEW set leaving original sets unchanged; update() MUTATES the calling set in place.",
    explanation: "s1.union(s2) constructs and returns a fresh third set without modifying s1 or s2. s1.update(s2) alters s1 directly in place and returns None.",
    hint: "union creates a new set; update modifies in place.",
    level: "moderate",
    codeExample: "s1 = {1, 2}\ns2 = {3, 4}\nnew_s = s1.union(s2)  # s1 is still {1, 2}\ns1.update(s2)         # s1 is now {1, 2, 3, 4}"
  },
  {
    question: "Can set.add() be chained: s.add(1).add(2)?",
    shortAnswer: "No, because s.add(1) returns None, causing the second .add(2) to fail with AttributeError: 'NoneType' object has no attribute 'add'.",
    explanation: "Since add() returns None, method chaining is not supported. You must execute each add call on a separate line or use update([1, 2]).",
    hint: "Chaining requires returning self, which Python mutating methods do not do.",
    level: "moderate",
    codeExample: "s = set()\n# s.add(1).add(2)  # AttributeError: 'NoneType' object has no attribute 'add'"
  },
  {
    question: "How do you add elements from a set of tuples into an existing set of coordinates?",
    shortAnswer: "Use coords_set.update(new_tuples_set).",
    explanation: "update() iterates through new_tuples_set, pulling each immutable (x, y) tuple and inserting it into coords_set.",
    hint: "Use update() with the tuples collection.",
    level: "basic",
    codeExample: "coords = {(10, 20)}\nnew_coords = {(30, 40), (50, 60)}\ncoords.update(new_coords)\nprint(coords)"
  },
  {
    question: "What is the memory performance tip when updating a set with a massive list of 10,000,000 items?",
    shortAnswer: "Pass a generator expression or iterator to s.update() to avoid allocating another intermediate 10M-element container.",
    explanation: "Calling s.update(item for item in stream) processes elements on the fly without duplicating memory arrays, preventing Out-Of-Memory (OOM) crashes on large datasets.",
    hint: "Use streaming generators to avoid giant memory spikes.",
    level: "expert",
    codeExample: "# Memory-safe streaming update:\n# s.update(line.strip() for line in big_file)"
  },
  {
    question: "What is the golden rule for professional developers when choosing between .add() and .update()?",
    shortAnswer: "Use .add(item) for a single individual element; use .update(iterables) for batch collection ingestion.",
    explanation: "Selecting the proper method ensures clear code readability, eliminates string-splitting bugs, avoids unnecessary intermediate container creation, and maximizes execution performance.",
    hint: "Single item -> add(); Collection/Iterable -> update().",
    level: "basic",
    codeExample: "# Golden Rule:\ns.add(\"SingleWord\")       # For one item\ns.update([\"A\", \"B\", \"C\"]) # For multiple items"
  }
];

export default questions;
