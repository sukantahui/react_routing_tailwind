const topic16_questions = [
  {
    "question": "Why does Java use 'Dual-Pivot Quicksort' for primitive arrays but 'TimSort' for object arrays and collections?",
    "shortAnswer": "1. 'Primitive Arrays (Dual-Pivot Quicksort)': primitives have no identity, so sort 'stability' is irrelevant. Dual-Pivot Quicksort is in-place (O(log n) memory) and runs extremely fast by leveraging CPU hardware cache locality with zero extra object allocations. 2. 'Object Collections (TimSort)': objects require 'Stable Sorting' (preserving original order of equal keys during multi-pass sorts). TimSort is an adaptive hybrid of Merge Sort and Insertion Sort with guaranteed O(n log n) worst-case time and O(n) linear performance on partially sorted real-world data.",
    "explanation": "Grand architectural synthesis of Java standard sorting implementations.",
    "hint": "Primitives use in-place Dual-Pivot Quicksort (stability not needed); objects use Stable adaptive TimSort.",
    "level": "Advanced",
    "codeExample": "Arrays.sort(primitiveArray); // Dual-Pivot Quicksort | Arrays.sort(objectArray); // TimSort"
  }
];

export default topic16_questions;