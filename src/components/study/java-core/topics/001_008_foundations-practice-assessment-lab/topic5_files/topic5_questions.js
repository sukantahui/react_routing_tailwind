/**
 * Module 001_008: Topic 5: Algorithmic Problem 5: Array element frequency counter using frequency arrays
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is an Array Element Frequency Counter?",
    shortAnswer: "An algorithm that tallies the exact number of occurrences for each distinct element in an array or collection.",
    explanation: "Core definition of frequency counter.",
    hint: "Determines how many times each element appears in an array.",
    level: "basic",
    codeExample: "int[] freq = countFrequencyDirectAddress(arr, maxVal);"
  },
  {
    question: "What is a 'Direct Address Frequency Array' and when is it most optimal?",
    shortAnswer: "An integer array `int[] freq = new int[maxVal + 1]` where each index represents a distinct value; it is optimal when elements are positive integers bounded within a known, small range ($K \\le 10^6$).",
    explanation: "Direct address table definition and optimality.",
    hint: "Array where indices represent values; optimal for small bounded positive integers.",
    level: "basic",
    codeExample: "int[] freq = new int[101]; for (int x : marks) freq[x]++;"
  },
  {
    question: "What is the Time and Space Complexity of Direct Address Frequency Counting?",
    shortAnswer: "Time Complexity: $O(N)$ linear time; Space Complexity: $O(K)$ where $K$ is the maximum element value.",
    explanation: "Direct address complexity analysis.",
    hint: "O(N) time and O(K) space where K is max value.",
    level: "basic",
    codeExample: "// O(N) Time, O(K) Space"
  },
  {
    question: "Why is Direct Address Frequency Counting faster than using a `HashMap`?",
    shortAnswer: "Because it uses direct CPU memory address offsets (`freq[val]++`) without object autoboxing, hashing computations, collision chaining, or heap object allocations.",
    explanation: "Hardware memory efficiency comparison.",
    hint: "Direct array indexing avoids hashing, autoboxing, and object allocations.",
    level: "intermediate",
    codeExample: "freq[val]++; // Single CPU memory increment"
  },
  {
    question: "What is the canonical idiomatic Java pattern to increment map frequencies?",
    shortAnswer: "`freqMap.put(val, freqMap.getOrDefault(val, 0) + 1);` or `freqMap.merge(val, 1, Integer::sum);`.",
    explanation: "Idiomatic Java Map frequency counting.",
    hint: "map.put(val, map.getOrDefault(val, 0) + 1) or map.merge(val, 1, Integer::sum).",
    level: "basic",
    codeExample: "freqMap.put(val, freqMap.getOrDefault(val, 0) + 1);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the most frequent student score in `{8, 9, 8, 7, 10, 8, 9, 7, 6, 8, 10, 9, 7}`?",
    shortAnswer: "Score `8/10` (appeared 4 times).",
    explanation: "Score distribution verification.",
    hint: "Score 8 (4 students).",
    level: "basic",
    codeExample: "Score 8 appeared 4 times"
  },
  {
    question: "When should you choose a `HashMap` or `LinkedHashMap` over a Direct Address Frequency Array?",
    shortAnswer: "When array elements contain negative numbers, large sparse values (e.g. `101, 1000000000`), or non-integer objects (Strings, custom records).",
    explanation: "Map vs Frequency array trade-offs.",
    hint: "Use Map for negative numbers, sparse values, or strings.",
    level: "basic",
    codeExample: "Map<Integer, Integer> map = new LinkedHashMap<>();"
  },
  {
    question: "How does the In-Place Modulo $N$ frequency counting algorithm work for elements in range $[1..N]$?",
    shortAnswer: "1. Decrement all values by 1 to map to $[0..N-1]$. 2. For each element, add $N$ to `nums[nums[i] % N]`. 3. The frequency of $(i + 1)$ is `nums[i] / N` in $O(1)$ space!",
    explanation: "In-place modulo frequency counting mathematical mechanics.",
    hint: "Add N to nums[nums[i] % N]; then frequency is nums[i] / N.",
    level: "advanced",
    codeExample: "nums[nums[i] % n] += n; int count = nums[i] / n;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what were the in-place frequency counts for attendance `{2, 3, 3, 2, 5}`?",
    shortAnswer: "Element 2: 2 times, Element 3: 2 times, Element 5: 1 time (Elements 1 and 4 appeared 0 times).",
    explanation: "In-place attendance output verification.",
    hint: "Element 2: 2 times, Element 3: 2 times, Element 5: 1 time.",
    level: "basic",
    codeExample: "countFrequencyInPlace(new int[]{2, 3, 3, 2, 5})"
  },
  {
    question: "What is the difference between `HashMap`, `LinkedHashMap`, and `TreeMap` for frequency tables?",
    shortAnswer: "`HashMap` offers $O(1)$ average time with unordered keys; `LinkedHashMap` maintains insertion order; `TreeMap` maintains keys sorted in natural ascending order with $O(\\log K)$ time.",
    explanation: "Map implementation trade-offs.",
    hint: "HashMap = unordered O(1); LinkedHashMap = insertion order; TreeMap = sorted keys O(log K).",
    level: "intermediate",
    codeExample: "Map<Integer, Integer> sorted = new TreeMap<>(freqMap);"
  },
  {
    question: "How can character frequencies in a String (lowercase English) be counted using a small frequency array?",
    shortAnswer: "Allocate `int[] freq = new int[26]`; for each char `c`, increment `freq[c - 'a']++`.",
    explanation: "Alphabet frequency array mapping.",
    hint: "int[26] array mapped using c - 'a'.",
    level: "basic",
    codeExample: "int[] freq = new int[26]; for (char c : s.toCharArray()) freq[c - 'a']++;"
  },
  {
    question: "How does Anagram Verification use Frequency Arrays?",
    shortAnswer: "Count frequencies of String A (`freq[c - 'a']++`) and decrement with String B (`freq[c - 'a']--`); if all 26 counts are 0, the strings are valid anagrams in $O(N)$ time and $O(1)$ space.",
    explanation: "Anagram checking using frequency arrays.",
    hint: "Increment for string A, decrement for string B; check if all counts return to 0.",
    level: "basic",
    codeExample: "for (char c : s.toCharArray()) freq[c - 'a']++; for (char c : t.toCharArray()) freq[c - 'a']--;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the frequency of enrollment ID `-50` in the Map test?",
    shortAnswer: "Appeared 1 time (handled seamlessly by `LinkedHashMap` without negative indexing crashes).",
    explanation: "Negative key handling in HashMap.",
    hint: "1 time.",
    level: "basic",
    codeExample: "mapResults.get(-50) -> 1"
  },
  {
    question: "What happens if a negative number is passed to `countFrequencyDirectAddress(nums, 10)` without guards?",
    shortAnswer: "Throws `java.lang.ArrayIndexOutOfBoundsException: Index -50 out of bounds for length 11`.",
    explanation: "Negative index hazard in direct address arrays.",
    hint: "Throws ArrayIndexOutOfBoundsException on negative index.",
    level: "basic",
    codeExample: "if (val >= 0 && val <= maxVal) freq[val]++; // Defensive guard"
  },
  {
    question: "How can you find the 'Majority Element' (element appearing $> N/2$ times) in $O(N)$ time and $O(1)$ space?",
    shortAnswer: "**Boyer-Moore Voting Algorithm**: Maintain a candidate and a counter. Increment count when element matches candidate, decrement when different; reset candidate when count hits 0.",
    explanation: "Boyer-Moore Voting Algorithm.",
    hint: "Boyer-Moore Voting Algorithm: candidate with matching increment/decrement counter.",
    level: "intermediate",
    codeExample: "if (count == 0) candidate = num; count += (num == candidate) ? 1 : -1;"
  },
  {
    question: "What is 'Top K Frequent Elements' (LeetCode 347)?",
    shortAnswer: "Finding the $K$ most frequent elements in an array using either a Min-Heap of size $K$ ($O(N \\log K)$ time) or Bucket Sort on frequencies ($O(N)$ time).",
    explanation: "Top K Frequent Elements algorithmic patterns.",
    hint: "Solved in O(N log K) with Min-Heap or O(N) with Bucket Sort on frequency counts.",
    level: "advanced",
    codeExample: "List<Integer>[] bucket = new List[nums.length + 1];"
  },
  {
    question: "How does Java 8 Stream API count frequencies in a single line?",
    shortAnswer: "`Arrays.stream(nums).boxed().collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));`.",
    explanation: "Stream API groupingBy frequency collector.",
    hint: "Collectors.groupingBy(Function.identity(), Collectors.counting()).",
    level: "intermediate",
    codeExample: "Map<Integer, Long> f = Arrays.stream(nums).boxed().collect(Collectors.groupingBy(e -> e, Collectors.counting()));"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the most frequent course enrollment ID?",
    shortAnswer: "ID `101` (appeared 4 times).",
    explanation: "Course enrollment frequency verification.",
    hint: "ID 101 (4 enrollments).",
    level: "basic",
    codeExample: "ID 101 appeared 4 times"
  },
  {
    question: "What is a 'Ransom Note' algorithm (LeetCode 383) using Frequency Arrays?",
    shortAnswer: "Check if characters in a magazine can construct a ransom note: count magazine letter frequencies, decrement for note letters; if any count drops below 0, return `false`.",
    explanation: "Ransom note frequency array application.",
    hint: "Count magazine letter frequencies, decrement for note; return false if count < 0.",
    level: "basic",
    codeExample: "for (char c : mag.toCharArray()) freq[c - 'a']++; for (char c : note.toCharArray()) if (--freq[c - 'a'] < 0) return false;"
  },
  {
    question: "How does `Map.compute()` and `Map.computeIfPresent()` help in frequency counting?",
    shortAnswer: "`map.compute(key, (k, v) -> (v == null) ? 1 : v + 1);` atomically updates the frequency count inside concurrent or standard maps.",
    explanation: "Map compute API method usage.",
    hint: "map.compute(key, (k, v) -> (v == null) ? 1 : v + 1).",
    level: "intermediate",
    codeExample: "map.compute(x, (k, v) -> (v == null) ? 1 : v + 1);"
  },
  {
    question: "What is the memory size of `new int[256]` used for ASCII frequency counting?",
    shortAnswer: "$256 \\times 4\\text{ bytes} + 16\\text{ bytes header} + 4\\text{ bytes length} = 1,044\\text{ bytes} \\approx 1\\text{ KB}$ on the JVM Heap.",
    explanation: "Heap memory calculation for ASCII frequency table.",
    hint: "Approximately 1 KB of heap memory.",
    level: "intermediate",
    codeExample: "int[] asciiFreq = new int[256]; // ~1 KB heap allocation"
  },
  {
    question: "In the In-Place Modulo algorithm, why do we add $N$ to `nums[nums[i] % N]` rather than 1?",
    shortAnswer: "Because adding $N$ encodes the frequency count in the quotient (`val / N`) while preserving the original element value in the remainder (`val % N`)!",
    explanation: "Mathematical encoding property of quotient and remainder.",
    hint: "Quotient (val / N) stores frequency; Remainder (val % N) preserves original value.",
    level: "advanced",
    codeExample: "nums[targetIndex] += n; // Encodes frequency in quotient"
  },
  {
    question: "What is 'Sort Characters By Frequency' (LeetCode 451)?",
    shortAnswer: "Count character frequencies using an array/map and sort characters in descending order of their frequency using bucket sort or a PriorityQueue.",
    explanation: "Frequency-based character sorting.",
    hint: "Sort characters by frequency using Bucket Sort or PriorityQueue.",
    level: "intermediate",
    codeExample: "pq.addAll(freqMap.keySet()); while (!pq.isEmpty()) { ... }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what were the distinct scores with frequency 2?",
    shortAnswer: "Score `9/10` (3 students), Score `7/10` (3 students), Score `10/10` (2 students).",
    explanation: "Score distribution details.",
    hint: "Score 10 had 2 students.",
    level: "basic",
    codeExample: "Score 10/10 : 2 students"
  },
  {
    question: "Can Frequency Arrays be used to find the First Non-Repeating Character in a String?",
    shortAnswer: "YES! Pass 1: Build frequency table (`freq[c - 'a']++`); Pass 2: Iterate string and return first character where `freq[c - 'a'] == 1` in $O(N)$ time.",
    explanation: "First non-repeating character algorithm.",
    hint: "Build frequency table in pass 1; return first char with count == 1 in pass 2.",
    level: "basic",
    codeExample: "for (int i = 0; i < s.length(); i++) if (freq[s.charAt(i) - 'a'] == 1) return i;"
  },
  {
    question: "What is the Time Complexity of iterating over all entries in a `LinkedHashMap` of size $U$?",
    shortAnswer: "$O(U)$ linear time in terms of distinct unique elements, preserving original insertion order.",
    explanation: "LinkedHashMap entry iteration complexity.",
    hint: "O(U) time where U is number of unique keys.",
    level: "basic",
    codeExample: "mapResults.forEach((k, v) -> ...);"
  },
  {
    question: "What happens if max element $K$ in Direct Address array is $10^9$?",
    shortAnswer: "Attempting `new int[1_000_000_001]` requires $\\approx 4$ GB of contiguous RAM, throwing `OutOfMemoryError: Java heap space`. Always use `HashMap` for large sparse values.",
    explanation: "Sparse array heap limit failure.",
    hint: "Throws OutOfMemoryError due to 4GB RAM requirement; use HashMap instead.",
    level: "basic",
    codeExample: "// Direct address table fails for sparse values > 10^7"
  },
  {
    question: "What is the ultimate takeaway of Module 001_008 Topic 5 for Java developers?",
    shortAnswer: "Frequency counting relies on two fundamental patterns: Direct Address Frequency Arrays for fast bounded positive ranges ($O(N)$ time, $O(K)$ space), and `LinkedHashMap` with `getOrDefault()` for unbounded, sparse, or negative datasets.",
    explanation: "Mastery of array frequency counters.",
    hint: "Direct Address array for small bounded ranges; LinkedHashMap for sparse/negative keys.",
    level: "basic",
    codeExample: "// Summary: Direct Address int[K+1] vs LinkedHashMap.getOrDefault()"
  },
  {
    question: "What is the next topic (Topic 6) in Module 001_008?",
    shortAnswer: "Algorithmic Problem 6: Decimal to Binary/Hexadecimal conversion without built-in methods.",
    explanation: "Topic 6 implements bitwise and division/modulo base conversion algorithms from scratch.",
    hint: "Algorithmic Problem 6: Decimal to Binary/Hexadecimal conversion without built-in methods.",
    level: "basic",
    codeExample: "// Topic 6: Decimal to Binary/Hex Conversion from Scratch"
  },
  {
    question: "How do modern CPU hardware caches accelerate Direct Address Frequency Arrays?",
    shortAnswer: "Small frequency arrays (e.g. 26 or 256 integers) fit entirely within the CPU L1 Data Cache (32KB), allowing multiple increments per CPU clock cycle without main memory RAM latency.",
    explanation: "L1 Cache residence for small frequency tables.",
    hint: "Small frequency tables fit in CPU L1 cache, executing at near-zero latency.",
    level: "advanced",
    codeExample: "// int[256] occupies 1KB, easily fitting in 32KB L1 CPU cache"
  }
];

export default questions;
