const questions = [
  {
    id: 1,
    question: "What is the primary difference between Lomuto and Hoare partitioning schemes in Quick Sort?",
    options: [
      "Lomuto uses a single direction scan pointer; Hoare uses two pointers scanning inward from both ends, doing fewer swaps",
      "Lomuto takes O(n^2) auxiliary memory",
      "Hoare sorting cannot be used on integers",
      "Lomuto requires pre-sorted data"
    ],
    answer: "Lomuto uses a single direction scan pointer; Hoare uses two pointers scanning inward from both ends, doing fewer swaps",
    explanation: "Hoare partitioning uses two inward scanning pointers (`i` and `j`), performing roughly 3x fewer element swaps than Lomuto partitioning on average."
  },
  {
    id: 2,
    question: "Why is Merge Sort preferred for Linked Lists, while Quick Sort is preferred for Arrays?",
    options: [
      "Merge Sort accesses data sequentially without random index access; Quick Sort leverages high RAM cache locality of contiguous arrays",
      "Merge Sort uses O(1) space on arrays",
      "Quick Sort cannot sort strings",
      "Linked lists cannot execute partition steps"
    ],
    answer: "Merge Sort accesses data sequentially without random index access; Quick Sort leverages high RAM cache locality of contiguous arrays",
    explanation: "Merge Sort splits and merges nodes by simply updating pointers in O(1) extra space on linked lists, whereas Quick Sort takes advantage of contiguous array cache hits."
  }
];

export default questions;
