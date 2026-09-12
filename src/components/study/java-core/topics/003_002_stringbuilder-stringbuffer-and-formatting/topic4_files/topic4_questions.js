const topic4_questions = [
  {
    "question": "What is the exact mathematical formula used by StringBuilder to grow its internal buffer?",
    "shortAnswer": "newCapacity = (oldCapacity * 2) + 2.",
    "explanation": "If the current capacity is insufficient, the JVM doubles the old capacity and adds 2. For example, 16 becomes (16 * 2) + 2 = 34.",
    "hint": "Double plus two.",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(); // capacity = 16\nsb.append(\"12345678901234567\"); // 17 chars\nSystem.out.println(sb.capacity()); // 34"
  },
  {
    "question": "Why does the growth formula add '+ 2' instead of simply doubling 'oldCapacity * 2'?",
    "shortAnswer": "To ensure that even an initial capacity of 0 can grow (since 0 * 2 = 0, but (0 * 2) + 2 = 2), and to provide a small buffer cushion for tiny strings.",
    "explanation": "Without '+ 2', an empty buffer initialized with capacity 0 would never expand upon multiplication.",
    "hint": "Consider what happens if oldCapacity is 0: 0 * 2 is still 0!",
    "level": "moderate"
  },
  {
    "question": "What happens if you append a string that requires MORE capacity than '(oldCapacity * 2) + 2'?",
    "shortAnswer": "The buffer expands directly to the required capacity (minimumCapacity) instead of the calculated formula.",
    "explanation": "The JVM computes targetCapacity = Math.max(minimumCapacity, (oldCapacity * 2) + 2). If the requested text needs 100 slots, it jumps directly to 100.",
    "hint": "It takes the maximum between the formula and the required capacity.",
    "level": "moderate",
    "codeExample": "StringBuilder sb = new StringBuilder(); // 16\nsb.append(\"A\".repeat(100)); // needs 100\nSystem.out.println(sb.capacity()); // 100 (since 100 > 34)"
  },
  {
    "question": "What happens under the hood when a capacity expansion is triggered?",
    "shortAnswer": "A new, larger internal array is allocated on the Heap, and all existing characters are copied over using System.arraycopy(). The old array is abandoned for garbage collection.",
    "explanation": "While geometric expansion ensures amortized O(1) append time, frequent resizing still creates temporary discarded arrays. Pre-sizing prevents this entirely.",
    "hint": "Allocate new array, copy old contents, discard old array.",
    "level": "moderate"
  },
  {
    "question": "What is the maximum capacity a StringBuilder can reach before throwing OutOfMemoryError?",
    "shortAnswer": "Integer.MAX_VALUE - 8 (or Integer.MAX_VALUE on some 64-bit JVM architectures), approximately 2.14 billion characters.",
    "explanation": "Arrays in Java cannot exceed Integer.MAX_VALUE (2^31 - 1) elements due to integer indexing, and JVMs typically reserve a few header words (-8).",
    "hint": "Limited by the maximum 32-bit signed integer size for array indices.",
    "level": "advanced"
  },
  {
    "question": "How does 'ensureCapacity(int minimumCapacity)' help optimize performance?",
    "shortAnswer": "It forces the internal buffer to pre-expand to at least minimumCapacity before you start appending, preventing multiple intermediate reallocations.",
    "explanation": "Calling ensureCapacity(10000) before a loop ensures that only ONE array allocation occurs instead of 8 to 10 incremental resizing steps.",
    "hint": "Pre-expands the buffer to prevent resizing during high-frequency loops.",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder();\nsb.ensureCapacity(5000);\nfor(int i = 0; i < 5000; i++) sb.append('x');"
  },
  {
    "question": "What is the initial capacity of 'new StringBuilder()', 'new StringBuilder(50)', and 'new StringBuilder(\"Cat\")'?",
    "shortAnswer": "new StringBuilder() -> 16; new StringBuilder(50) -> 50; new StringBuilder(\"Cat\") -> 3 + 16 = 19.",
    "explanation": "Default is 16; explicit int allocates exact count; String constructor allocates string length + 16.",
    "hint": "16, explicit number, and length + 16.",
    "level": "basic"
  },
  {
    "question": "What is the difference between trimToSize() and ensureCapacity()?",
    "shortAnswer": "ensureCapacity() expands capacity if it is too small; trimToSize() shrinks capacity down to length() if it is larger than needed.",
    "explanation": "ensureCapacity() prevents future growth costs; trimToSize() releases unused memory once string construction is complete.",
    "hint": "One grows the buffer; the other shrinks it to fit.",
    "level": "basic"
  },
  {
    "question": "Does trimToSize() guarantee that memory will be freed immediately?",
    "shortAnswer": "It reallocates a tighter array, but garbage collection of the old larger array depends on the JVM GC cycle.",
    "explanation": "trimToSize() assigns a newly sized array to the internal field. The old large array becomes eligible for GC.",
    "hint": "The old array becomes garbage, freed on the next GC run.",
    "level": "moderate"
  },
  {
    "question": "How does 'sb.setLength(int newLength)' interact with capacity?",
    "shortAnswer": "setLength() modifies the logical length without decreasing capacity. If newLength exceeds capacity, it triggers capacity expansion.",
    "explanation": "If newLength < length(), characters are truncated but capacity stays unchanged. If newLength > capacity(), capacity expands to accommodate it.",
    "hint": "Modifies length; never reduces capacity, but can trigger growth.",
    "level": "moderate"
  },
  {
    "question": "What happens when you call 'sb.setLength(0)' on a StringBuilder with 10,000 capacity?",
    "shortAnswer": "The logical length becomes 0, but the 10,000 capacity remains allocated and ready for instant reuse.",
    "explanation": "This is a cornerstone pattern for high-performance memory pooling: reset length to 0 to reuse the same memory without allocating any new objects.",
    "hint": "Resets length to 0; capacity is preserved.",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(10000);\nsb.append(\"test\");\nsb.setLength(0); // length is 0, capacity remains 10000"
  },
  {
    "question": "What character is used to pad the buffer if 'sb.setLength(10)' is called when length is 5?",
    "shortAnswer": "Null characters (\\u0000 or '\\0').",
    "explanation": "Java initializes any newly exposed character slots between old length and new length with the null character.",
    "hint": "The default character value \\u0000.",
    "level": "moderate"
  },
  {
    "question": "Why is geometric growth (doubling) O(1) amortized time instead of linear O(N)?",
    "shortAnswer": "Because copy operations become exponentially rarer as the buffer grows. Over N appends, the total characters copied is roughly 2N, averaging ~2 operations per append.",
    "explanation": "This is standard amortized analysis (similar to ArrayList). Even though occasional resizes cost O(N), the average cost per append is constant O(1).",
    "hint": "Doubling capacity makes copies happen exponentially less often.",
    "level": "advanced"
  },
  {
    "question": "What happens if oldCapacity is 16, and you call 'sb.ensureCapacity(30)' vs 'sb.ensureCapacity(40)'?",
    "shortAnswer": "ensureCapacity(30) results in 34 capacity (because 34 > 30); ensureCapacity(40) results in 40 capacity (because 40 > 34).",
    "explanation": "The formula produces (16 * 2) + 2 = 34. If the requested minimum is <= 34, capacity becomes 34. If requested minimum > 34, it jumps to the requested minimum.",
    "hint": "Math.max((old * 2) + 2, minCapacity).",
    "level": "moderate"
  },
  {
    "question": "How does Java 9 Compact Strings affect capacity calculation?",
    "shortAnswer": "Capacity is still expressed in terms of character count (UTF-16 code units), but the underlying byte array size is multiplied by the coder (1 byte for Latin-1, 2 bytes for UTF-16).",
    "explanation": "For Latin-1 text, a capacity of 16 allocates 16 bytes. If a non-Latin character is appended, the buffer inflates to UTF-16, doubling the byte array to 32 bytes.",
    "hint": "Logical capacity in chars, physical memory in bytes based on coder flag.",
    "level": "advanced"
  },
  {
    "question": "Can you prevent StringBuilder from ever reallocating memory?",
    "shortAnswer": "Yes, by sizing it appropriately at construction: 'new StringBuilder(expectedMaxChars)'.",
    "explanation": "If your total appended characters never exceed the initial capacity, no resizing or arraycopy will ever take place.",
    "hint": "Estimate the upper bound and pass it to the constructor.",
    "level": "basic"
  },
  {
    "question": "What is the downside of over-allocating initial capacity (e.g. 'new StringBuilder(1_000_000)')?",
    "shortAnswer": "Wasted heap memory footprint and potential OutOfMemoryError if many such instances are held in concurrent threads.",
    "explanation": "Allocating 1 MB per request in a web server with 500 concurrent threads instantly reserves 500 MB of heap, most of which may be empty.",
    "hint": "High memory footprint per thread.",
    "level": "moderate"
  },
  {
    "question": "What exception is thrown if 'new StringBuilder(Integer.MAX_VALUE)' is called?",
    "shortAnswer": "OutOfMemoryError: Java heap space (or Requested array size exceeds VM limit).",
    "explanation": "Attempting to allocate an array of 2 billion elements immediately exhausts available heap memory.",
    "hint": "Exceeds available heap or VM array limits.",
    "level": "moderate"
  },
  {
    "question": "Does calling 'sb.trimToSize()' reduce capacity if length() == capacity()?",
    "shortAnswer": "No, it detects that length equals capacity and does nothing, avoiding unnecessary array reallocation.",
    "explanation": "trimToSize() checks if (count < value.length). If not, it returns immediately.",
    "hint": "No-op if already perfectly fitted.",
    "level": "basic"
  },
  {
    "question": "How can you observe the step-by-step capacity expansion of StringBuilder in code?",
    "shortAnswer": "Print sb.capacity() before and after every append operation.",
    "explanation": "You will clearly observe capacity jump from 16 -> 34 -> 70 -> 142 as the character threshold is crossed.",
    "hint": "Print sb.capacity() in a loop to see the sequence 16, 34, 70...",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder();\nfor(int i = 0; i < 50; i++) {\n    sb.append('A');\n    System.out.println(\"Len: \" + sb.length() + \" | Cap: \" + sb.capacity());\n}"
  }
];

export default topic4_questions;
