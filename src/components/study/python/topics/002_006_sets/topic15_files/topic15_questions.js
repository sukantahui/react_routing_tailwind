// src/components/study/python/topics/002_006_sets/topic15_files/topic15_questions.js
// 30 Comprehensive Master Review Questions for Topic 15: Removing Duplicates Using Sets

const questions = [
  {
    question: "What is the simplest and fastest way to remove duplicates from a list in Python when insertion order does NOT matter?",
    shortAnswer: "list(set(my_list)).",
    explanation: "Converting the list to a set automatically hashes every element and collapses duplicates in O(N) linear time. Converting back with list() gives a unique list, though the original order will be scrambled.",
    hint: "Convert list to set and back to list.",
    level: "basic",
    codeExample: "raw = [3, 1, 2, 1, 3, 2]\nunique = list(set(raw))\nprint(unique)  # [1, 2, 3] (Order scrambled)"
  },
  {
    question: "How can you remove duplicates from a list in O(N) time while strictly PRESERVING the original insertion order?",
    shortAnswer: "Use list(dict.fromkeys(my_list)).",
    explanation: "Since Python 3.7, dictionaries maintain insertion order. dict.fromkeys() creates a dictionary using list elements as unique keys in first-seen order. Converting back to a list gives an order-preserved, deduplicated sequence in O(N) time.",
    hint: "Use dict.fromkeys() to preserve order.",
    level: "basic",
    codeExample: "raw = [\"Kolkata\", \"Barrackpore\", \"Kolkata\", \"Ichapur\"]\nordered = list(dict.fromkeys(raw))\nprint(ordered)  # ['Kolkata', 'Barrackpore', 'Ichapur']"
  },
  {
    question: "Why is deduplicating a list using 'unique = []; for x in data: if x not in unique: unique.append(x)' a severe performance anti-pattern?",
    shortAnswer: "Because checking 'if x not in unique' on a list is an O(N) linear scan, ballooning total time complexity to O(N^2) quadratic time.",
    explanation: "For 100,000 items, nested list scanning performs up to 5,000,000,000 pointer checks and freezes execution for 15+ seconds. Using a set completes in under 0.005 seconds.",
    hint: "Scanning a list inside a loop creates an O(N^2) trap.",
    level: "expert",
    codeExample: "# BAD (O(N^2)):\n# for x in data: if x not in unique_list: unique_list.append(x)\n\n# GOOD (O(N)):\n# unique_list = list(dict.fromkeys(data))"
  },
  {
    question: "How do you deduplicate a list of dictionaries based on a specific key (e.g. 'voter_id') while keeping the first occurrence?",
    shortAnswer: "Maintain a seen_ids = set() and append records whose key has not been seen yet.",
    explanation: "Iterating through the dictionary list and querying seen_ids in O(1) time keeps the stream deduplication at O(N) linear time.",
    hint: "Use a seen set to track seen key IDs.",
    level: "moderate",
    codeExample: "seen = set()\nunique_voters = []\nfor v in voters:\n    if v[\"id\"] not in seen:\n        seen.add(v[\"id\"])\n        unique_voters.append(v)"
  },
  {
    question: "How can custom class instances be deduplicated using set()?",
    shortAnswer: "Implement both __hash__() and __eq__() on the custom class definition.",
    explanation: "Python evaluates set uniqueness by first matching hash(obj) and then confirming equality with obj1 == obj2.",
    hint: "Define __hash__ and __eq__ on the class.",
    level: "moderate",
    codeExample: "class Student:\n    def __init__(self, roll):\n        self.roll = roll\n    def __hash__(self):\n        return hash(self.roll)\n    def __eq__(self, other):\n        return isinstance(other, Student) and self.roll == other.roll"
  },
  {
    question: "What happens when you deduplicate a list containing [1, True, 1.0, '1'] using set()?",
    shortAnswer: "It produces {1, '1'} (len 2).",
    explanation: "1, True, and 1.0 all compare equal (1 == True == 1.0) and share hash code 1, so they collapse into a single element. '1' is a string and remains distinct.",
    hint: "1, True, and 1.0 collapse into one element.",
    level: "expert",
    codeExample: "raw = [1, True, 1.0, \"1\"]\nprint(set(raw))  # {1, '1'}"
  },
  {
    question: "How do you remove duplicate words from a sentence while preserving original word order?",
    shortAnswer: "' '.join(dict.fromkeys(sentence.split())).",
    explanation: "sentence.split() extracts words, dict.fromkeys() preserves the first occurrence of each word, and ' '.join() reconstructs the sentence string.",
    hint: "Combine .split(), dict.fromkeys(), and ' '.join().",
    level: "basic",
    codeExample: "s = \"learn python programming and learn python fast\"\nclean = \" \".join(dict.fromkeys(s.split()))\nprint(clean)  # 'learn python programming and fast'"
  },
  {
    question: "How do you remove duplicate characters from a string while preserving original character order?",
    shortAnswer: "''.join(dict.fromkeys(my_string)).",
    explanation: "dict.fromkeys(my_string) deduplicates letters in first-seen order, and ''.join() concatenates them back into a clean string.",
    hint: "Use ''.join(dict.fromkeys(my_string)).",
    level: "basic",
    codeExample: "s = \"mississippi\"\nprint(\"\".join(dict.fromkeys(s)))  # 'misp'"
  },
  {
    question: "What is a memory-efficient generator function for deduplicating infinite or large data streams in O(N) time?",
    shortAnswer: "A generator with seen = set() that yields items if item not in seen: seen.add(item); yield item.",
    explanation: "Yielding items on the fly avoids creating an intermediate list of millions of records in memory.",
    hint: "Use a generator function tracking items in a seen set.",
    level: "expert",
    codeExample: "def dedupe_stream(iterable):\n    seen = set()\n    for item in iterable:\n        if item not in seen:\n            seen.add(item)\n            yield item"
  },
  {
    question: "What is the time complexity of deduplicating N elements using list(dict.fromkeys(data))?",
    shortAnswer: "O(N) linear time complexity.",
    explanation: "Inserting N elements into a dictionary takes N * O(1) = O(N) time. Converting the keys view to a list takes O(N) time, giving O(N) overall.",
    hint: "O(N) total time.",
    level: "moderate",
    codeExample: "# Time: O(N); Space: O(N)"
  },
  {
    question: "Can list(set(data)) be used on a list containing nested lists: [[1, 2], [1, 2]]?",
    shortAnswer: "No, it raises TypeError: unhashable type: 'list'.",
    explanation: "Because inner lists are mutable and unhashable, the set constructor cannot hash them. You must convert inner lists to tuples first: list(set(tuple(x) for x in data)).",
    hint: "Convert inner lists to tuples before set deduplication.",
    level: "moderate",
    codeExample: "raw = [[1, 2], [3, 4], [1, 2]]\n# list(set(raw))                      # TypeError\nunique = [list(x) for x in set(tuple(x) for x in raw)]\nprint(unique)  # [[1, 2], [3, 4]]"
  },
  {
    question: "How do you find which elements were duplicates in a list?",
    shortAnswer: "seen = set(); duplicates = set(); for x in data: (duplicates.add(x) if x in seen else seen.add(x)).",
    explanation: "Tracking seen items allows capturing any item encountered more than once in a separate duplicates set.",
    hint: "Maintain a seen set and a duplicates set.",
    level: "moderate",
    codeExample: "data = [1, 2, 3, 2, 4, 1, 5]\nseen = set()\ndups = set()\nfor x in data:\n    if x in seen:\n        dups.add(x)\n    else:\n        seen.add(x)\nprint(\"Duplicates:\", dups)  # {1, 2}"
  },
  {
    question: "What is the output of: list(dict.fromkeys([5, 2, 8, 2, 5, 1]))?",
    shortAnswer: "[5, 2, 8, 1].",
    explanation: "Items are kept in their first-seen order: 5, then 2, then 8, then 1.",
    hint: "First-seen order is preserved.",
    level: "basic",
    codeExample: "print(list(dict.fromkeys([5, 2, 8, 2, 5, 1])))  # [5, 2, 8, 1]"
  },
  {
    question: "How does set deduplication prevent replay attacks in webhook endpoints?",
    shortAnswer: "By storing processed transaction IDs in an in-memory or Redis set to reject duplicate webhook deliveries in O(1) time.",
    explanation: "When a webhook event arrives, checking if txn_id in processed_ids identifies duplicate webhook retries instantly.",
    hint: "Store processed transaction IDs in a set.",
    level: "moderate",
    codeExample: "processed_txns = set()\ndef handle_webhook(txn_id):\n    if txn_id in processed_txns:\n        return \"Duplicate ignored\"\n    processed_txns.add(txn_id)"
  },
  {
    question: "How do you count the number of duplicate occurrences in a collection?",
    shortAnswer: "len(my_list) - len(set(my_list)).",
    explanation: "Subtracting the distinct element count from total elements gives the exact count of redundant duplicate entries.",
    hint: "Total count minus unique count.",
    level: "basic",
    codeExample: "data = [10, 20, 10, 30, 20, 10]\nredundant_count = len(data) - len(set(data))\nprint(\"Redundant entries:\", redundant_count)  # 3"
  },
  {
    question: "Can set comprehension be used to deduplicate and uppercase strings in one step?",
    shortAnswer: "Yes: {x.upper() for x in raw_list}.",
    explanation: "Set comprehensions apply transformation and automatic deduplication simultaneously.",
    hint: "Use a set comprehension with .upper().",
    level: "basic",
    codeExample: "print({x.upper() for x in [\"a\", \"B\", \"a\", \"b\"]})  # {'A', 'B'}"
  },
  {
    question: "What is the performance difference between list(set(data)) and list(dict.fromkeys(data))?",
    shortAnswer: "Both run in O(N) time; list(set(data)) is marginally faster (by ~10%), but dict.fromkeys() provides order preservation.",
    explanation: "dict.fromkeys() creates a dictionary before extracting keys, adding minor pointer overhead while preserving sequence ordering.",
    hint: "Both are O(N); set is slightly faster, dict.fromkeys preserves order.",
    level: "expert",
    codeExample: "# Both O(N): set is slightly lighter; dict.fromkeys preserves order"
  },
  {
    question: "How do you deduplicate a list of tuples: [('A', 1), ('B', 2), ('A', 1)]?",
    shortAnswer: "list(set(my_list)) or list(dict.fromkeys(my_list)).",
    explanation: "Because tuples are immutable and hashable, standard set deduplication works out of the box on lists of tuples.",
    hint: "Tuples are hashable and deduplicate directly.",
    level: "basic",
    codeExample: "tuples = [(\"A\", 1), (\"B\", 2), (\"A\", 1)]\nprint(list(dict.fromkeys(tuples)))  # [('A', 1), ('B', 2)]"
  },
  {
    question: "How do you deduplicate items based on a custom key function (e.g. key=lambda x: x.lower()) while preserving original casing of first item?",
    shortAnswer: "Maintain a seen_keys = set() and track transformed keys while yielding original items.",
    explanation: "seen_keys tracks key(item); if key(item) is new, add to seen_keys and keep the original un-transformed item.",
    hint: "Track transformed keys in a seen set while keeping original items.",
    level: "expert",
    codeExample: "def dedupe_by_key(items, key=lambda x: x):\n    seen = set()\n    result = []\n    for x in items:\n        k = key(x)\n        if k not in seen:\n            seen.add(k)\n            result.append(x)\n    return result\n\nraw = [\"Kolkata\", \"kolkata\", \"KOLKATA\", \"Barrackpore\"]\nprint(dedupe_by_key(raw, key=str.lower))  # ['Kolkata', 'Barrackpore']"
  },
  {
    question: "Why should you never use pandas.drop_duplicates() when pure Python dict.fromkeys() is sufficient for small lists?",
    shortAnswer: "Pandas introduces massive library import overhead (~100ms) and high memory allocation for simple list deduplication.",
    explanation: "Pure Python dict.fromkeys() executes in microseconds with zero external dependencies.",
    hint: "Pure Python is faster and lighter than Pandas for standard lists.",
    level: "moderate",
    codeExample: "# Prefer: list(dict.fromkeys(data))\n# Over: pd.Series(data).drop_duplicates().tolist()"
  },
  {
    question: "What is the output of: list(dict.fromkeys([None, None, 1, 1]))?",
    shortAnswer: "[None, 1].",
    explanation: "None is a valid hashable key; duplicate None entries collapse into a single element.",
    hint: "None is deduplicated normally.",
    level: "basic",
    codeExample: "print(list(dict.fromkeys([None, None, 1, 1])))  # [None, 1]"
  },
  {
    question: "How can you check if a list contains ANY duplicate elements in O(N) time?",
    shortAnswer: "len(my_list) != len(set(my_list)).",
    explanation: "If the length of the list is greater than the length of its set conversion, duplicates must exist.",
    hint: "Compare len(list) with len(set(list)).",
    level: "basic",
    codeExample: "def has_duplicates(seq):\n    return len(seq) != len(set(seq))\n\nprint(has_duplicates([1, 2, 3, 2]))  # True\nprint(has_duplicates([1, 2, 3, 4]))  # False"
  },
  {
    question: "How do you deduplicate a stream of URLs by removing query parameters and trailing slashes?",
    shortAnswer: "Use a set comprehension with url.split('?')[0].rstrip('/').",
    explanation: "Normalizes each URL string before hashing and deduplicating into a set.",
    hint: "Clean the URL before set insertion.",
    level: "basic",
    codeExample: "urls = [\"https://example.com/page?ref=1\", \"https://example.com/page/\", \"https://example.com/page\"]\nclean = {u.split('?')[0].rstrip('/') for u in urls}\nprint(clean)  # {'https://example.com/page'}"
  },
  {
    question: "What happens if you deduplicate a list of objects that only define __eq__ but NOT __hash__ in Python 3?",
    shortAnswer: "It raises TypeError: unhashable type: '<ClassName>'.",
    explanation: "In Python 3, defining __eq__ without defining __hash__ implicitly sets __hash__ = None, making the object unhashable.",
    hint: "Defining __eq__ without __hash__ makes objects unhashable.",
    level: "expert",
    codeExample: "class Custom:\n    def __eq__(self, other):\n        return True\ntry:\n    set([Custom()])\nexcept TypeError as e:\n    print(e)  # unhashable type: 'Custom'"
  },
  {
    question: "What is the output of: list(set([10, 20, 30, 10])) == [10, 20, 30]?",
    shortAnswer: "Often True, but NOT guaranteed because set iteration order is non-deterministic.",
    explanation: "While small integer hashing may preserve order in simple tests, relying on set order for list equality creates flaky code.",
    hint: "Order is not guaranteed with list(set()).",
    level: "moderate",
    codeExample: "# Use dict.fromkeys() for guaranteed order equality!"
  },
  {
    question: "How do you deduplicate a list of integers and return them sorted in descending order in one line?",
    shortAnswer: "sorted(set(my_list), reverse=True).",
    explanation: "set() removes duplicates in O(N), and sorted(reverse=True) orders the distinct numbers in O(N log N) time.",
    hint: "Combine sorted(reverse=True) with set().",
    level: "basic",
    codeExample: "print(sorted(set([5, 1, 9, 1, 5, 3]), reverse=True))  # [9, 5, 3, 1]"
  },
  {
    question: "How can you deduplicate multiple lists simultaneously into a single combined unique list?",
    shortAnswer: "list(dict.fromkeys(list1 + list2 + list3)) or list(set().union(list1, list2, list3)).",
    explanation: "Concatenating lists and deduplicating preserves order across batches.",
    hint: "Concatenate lists and pass to dict.fromkeys().",
    level: "basic",
    codeExample: "l1, l2, l3 = [1, 2], [2, 3], [3, 4]\nprint(list(dict.fromkeys(l1 + l2 + l3)))  # [1, 2, 3, 4]"
  },
  {
    question: "Why does itertools.groupby() FAIL to deduplicate unsorted lists?",
    shortAnswer: "itertools.groupby() only deduplicates CONSECUTIVE duplicate elements; set deduplication catches duplicates anywhere in the collection.",
    explanation: "groupby() groups adjacent items. If duplicates are separated (e.g. [1, 2, 1]), groupby() yields 1 twice. Sets guarantee global uniqueness.",
    hint: "groupby only catches adjacent duplicates.",
    level: "expert",
    codeExample: "# [1, 2, 1] -> groupby yields [1, 2, 1]; set() yields {1, 2}"
  },
  {
    question: "How does set deduplication assist in electoral roll validation in West Bengal?",
    shortAnswer: "It guarantees that each registered voter ID appears exactly once across polling booth rosters.",
    explanation: "Deduplicating based on voter card numbers prevents fraudulent multiple ballot voting.",
    hint: "Guarantees 1 record per unique voter ID.",
    level: "basic",
    codeExample: "# Electoral Roll: len(voter_ids) == len(set(voter_ids))"
  },
  {
    question: "What is the master summary guideline for deduplicating data in Python?",
    shortAnswer: "Use list(set(data)) when order doesn't matter; use list(dict.fromkeys(data)) when order must be preserved; and use a seen-set loop for custom dictionary keys.",
    explanation: "Applying these three patterns guarantees maximum execution speed and zero memory bloat across all data pipeline workflows.",
    hint: "Unordered -> set(); Ordered -> dict.fromkeys(); Custom keys -> seen set.",
    level: "basic",
    codeExample: "# Master Deduplication Rule:\n# 1. Unordered: list(set(data))\n# 2. Ordered:   list(dict.fromkeys(data))\n# 3. Stream:    seen = set(); [x for x in data if not (x in seen or seen.add(x))]"
  }
];

export default questions;
