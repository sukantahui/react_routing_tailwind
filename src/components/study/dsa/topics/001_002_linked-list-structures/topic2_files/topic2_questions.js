const questions = [
  {
    id: 1,
    question: "What are the pointer step speeds in Phase 1 of Floyd's Cycle-Finding Algorithm?",
    options: [
      "`slow` moves 1 node per step (`slow = slow->next`), `fast` moves 2 nodes per step (`fast = fast->next->next`)",
      "`slow` moves 1 node, `fast` moves 3 nodes per step",
      "Both `slow` and `fast` move 2 nodes per step",
      "`slow` moves backward while `fast` moves forward"
    ],
    answer: "`slow` moves 1 node per step (`slow = slow->next`), `fast` moves 2 nodes per step (`fast = fast->next->next`)",
    explanation: "With speeds 1 and 2, the relative speed is 2 - 1 = 1 node per step, ensuring `fast` never jumps past `slow` without meeting."
  },
  {
    id: 2,
    question: "Why is `fast` guaranteed to meet `slow` instead of jumping right over `slow` inside a cycle?",
    options: [
      "Because their relative speed is 1 node per step, so the distance from `fast` to `slow` decreases by 1 each step until it hits 0",
      "Because `fast` pauses whenever `slow` is 1 step ahead",
      "Because cycles always have an even number of nodes",
      "Because `head` blocks `fast` from moving"
    ],
    answer: "Because their relative speed is 1 node per step, so the distance from `fast` to `slow` decreases by 1 each step until it hits 0",
    explanation: "If `fast` is 1 step behind `slow`, after one iteration `fast` moves +2 and `slow` moves +1, landing on the exact same node! If 2 steps behind, the gap becomes 1, then 0."
  },
  {
    id: 3,
    question: "What is the exact `while` loop condition required in Phase 1 to avoid a `SIGSEGV` crash when there is NO cycle?",
    options: [
      "`while (fast != NULL && fast->next != NULL)`",
      "`while (slow != NULL && fast->next->next != NULL)`",
      "`while (fast->next != NULL)`",
      "`while (slow != fast)`"
    ],
    answer: "`while (fast != NULL && fast->next != NULL)`",
    explanation: "Before evaluating `fast->next->next`, both `fast` and `fast->next` must be non-NULL. Short-circuit `&&` checks `fast != NULL` first."
  },
  {
    id: 4,
    question: "What are the Time and Auxiliary Space complexities of Floyd's Cycle Detection compared to using a Hash Set of visited addresses?",
    options: [
      "Floyd's uses O(N) time and O(1) space; a Hash Set uses O(N) time and O(N) extra space",
      "Floyd's uses O(N^2) time and O(1) space",
      "Floyd's uses O(N) time and O(N) space",
      "Hash Set uses O(1) space"
    ],
    answer: "Floyd's uses O(N) time and O(1) space; a Hash Set uses O(N) time and O(N) extra space",
    explanation: "Floyd's algorithm needs only two pointer variables (`O(1)` memory) regardless of whether the list has 10 nodes or 10 million nodes."
  },
  {
    id: 5,
    question: "In Phase 2 (locating the cycle start node after `slow == fast`), what do you do?",
    options: [
      "Reset one pointer (`entry`) to `head`, keep `slow` at the meeting point, and move BOTH 1 step at a time until `entry == slow`",
      "Move `fast` backward to `head`",
      "Keep `fast` moving at 2x speed from `head`",
      "Return the meeting point directly—it is always the cycle start"
    ],
    answer: "Reset one pointer (`entry`) to `head`, keep `slow` at the meeting point, and move BOTH 1 step at a time until `entry == slow`",
    explanation: "By `2(L + x) = L + x + kC`, we get `L = (k - 1)C + (C - x)`. Stepping 1-by-1 from `head` and from the meeting point makes them collide at the loop start!"
  },
  {
    id: 6,
    question: "Does the Phase 1 meeting point of `slow` and `fast` ALWAYS equal the starting node of the loop?",
    options: [
      "No! They can meet at ANY node inside the loop; Phase 2 is required to locate the loop start",
      "Yes, they always meet at the loop start node",
      "Yes, unless the list has an odd number of nodes",
      "They meet at the node just before `head`"
    ],
    answer: "No! They can meet at ANY node inside the loop; Phase 2 is required to locate the loop start",
    explanation: "Depending on the tail length `L` and loop length `C`, `slow` and `fast` can collide anywhere around the ring. Phase 2 pinpoints the entry node."
  },
  {
    id: 7,
    question: "In Floyd's proof `2(L + x) = L + x + kC`, what do `L`, `x`, and `C` represent?",
    options: [
      "`L` = distance from `head` to loop start, `x` = distance from loop start to meeting point, `C` = loop length",
      "`L` = total list length, `x` = `head->data`, `C` = number of NULL pointers",
      "`L` = loop length, `x` = fast speed, `C` = slow speed",
      "`L` = number of laps, `x` = tail pointer, `C` = cache size"
    ],
    answer: "`L` = distance from `head` to loop start, `x` = distance from loop start to meeting point, `C` = loop length",
    explanation: "When `slow` has walked `L + x` steps, `fast` has walked `2(L + x)` steps, which equals `L + x` plus `k` full laps of size `C`."
  },
  {
    id: 8,
    question: "What happens in Phase 1 if the entire list is a single closed circle (`L = 0`, e.g., tail points back to `head`)?",
    options: [
      "`slow` and `fast` meet back at `head` after `C` steps, and Phase 2 immediately sees `entry == slow == head`",
      "Phase 1 enters an infinite loop without ever meeting",
      "Phase 2 crashes because `L = 0`",
      "`fast` hits `NULL` after 2 steps"
    ],
    answer: "`slow` and `fast` meet back at `head` after `C` steps, and Phase 2 immediately sees `entry == slow == head`",
    explanation: "When `L = 0`, `C - x = 0` mod `C`, so they meet at `head`, and Phase 2 terminates in 0 iterations returning `head`."
  },
  {
    id: 9,
    question: "Why should the comparison `if (slow == fast)` check pointer ADDRESSES rather than `slow->data == fast->data`?",
    options: [
      "Two different nodes in a non-cyclic list can hold the same integer value; a true cycle means pointing to the exact same node address in memory",
      "Comparing `->data` is illegal in C",
      "Pointer comparison is O(N) while data comparison is O(1)",
      "Nodes inside a cycle always have unique negative numbers"
    ],
    answer: "Two different nodes in a non-cyclic list can hold the same integer value; a true cycle means pointing to the exact same node address in memory",
    explanation: "In `[10 -> 20 -> 10 -> NULL]`, values repeat, but memory addresses do not! `slow == fast` compares the virtual memory addresses."
  },
  {
    id: 10,
    question: "Why should `if (slow == fast)` appear AFTER advancing `slow` and `fast` inside the `while` loop?",
    options: [
      "Because both `slow` and `fast` start at `head`, so checking `slow == fast` before moving would falsely report a cycle on step 0",
      "Because `head` is always `NULL` on step 0",
      "Because `fast` moves first and `slow` moves after the `if`",
      "Because C `while` loops cannot contain `if` at the top"
    ],
    answer: "Because both `slow` and `fast` start at `head`, so checking `slow == fast` before moving would falsely report a cycle on step 0",
    explanation: "At initialization, `slow == fast == head` is trivially true. Move `slow` +1 and `fast` +2 first, then test `if (slow == fast)`."
  },
  {
    id: 11,
    question: "Once you locate `loopStart`, how do you cleanly break the cycle in Phase 3?",
    options: [
      "Walk `ptr = loopStart` until `ptr->next == loopStart`, then set `ptr->next = NULL;`",
      "Set `loopStart->next = NULL;` immediately",
      "Call `free(loopStart);` while the cycle still exists",
      "Set `head = NULL;`"
    ],
    answer: "Walk `ptr = loopStart` until `ptr->next == loopStart`, then set `ptr->next = NULL;`",
    explanation: "Setting `loopStart->next = NULL` would chop off the rest of the loop! You must find the node whose `next` loops back into `loopStart` and set THAT node's `next` to `NULL`."
  },
  {
    id: 12,
    question: "What happens if you try to run standard `freeList(head)` on a linked list that STILL has a cycle?",
    options: [
      "Undefined behavior / crash: `freeList` loops back to already-freed nodes and triggers a Double-Free / Use-After-Free heap corruption",
      "`freeList` detects the cycle automatically and stops",
      "Only the non-cyclic nodes are freed",
      "`free()` returns `-1` when a node is freed twice"
    ],
    answer: "Undefined behavior / crash: `freeList` loops back to already-freed nodes and triggers a Double-Free / Use-After-Free heap corruption",
    explanation: "You MUST break any cycle (`ptr->next = NULL`) before walking the list to `free()` its nodes."
  },
  {
    id: 13,
    question: "How can you find the length `C` of the detected cycle once `slow == fast`?",
    options: [
      "Keep `fast` fixed, advance `slow = slow->next` counting steps until `slow == fast` again",
      "Subtract `head` address from `slow` address",
      "Count nodes from `head` to `NULL`",
      "Divide `L` by 2"
    ],
    answer: "Keep `fast` fixed, advance `slow = slow->next` counting steps until `slow == fast` again",
    explanation: "Walking once around the ring from the meeting point back to itself counts the exact number of nodes `C` in the loop in `O(C)` time and `O(1)` space."
  },
  {
    id: 14,
    question: "Can Floyd's algorithm work on a 1-node self-loop (`n1->next = n1`)?",
    options: [
      "Yes: `fast != NULL && fast->next != NULL` is true, `slow` and `fast` both land on `n1`, and Phase 2 returns `n1`",
      "No: a 1-node loop crashes `fast->next->next`",
      "No: it reports no cycle",
      "Yes, but only if `n1->data == 0`"
    ],
    answer: "Yes: `fast != NULL && fast->next != NULL` is true, `slow` and `fast` both land on `n1`, and Phase 2 returns `n1`",
    explanation: "`n1->next` is `n1` (not `NULL`), and `n1->next->next` is also `n1`, so `slow == fast == n1` on step 1!"
  },
  {
    id: 15,
    question: "What happens if `head == NULL` or `head->next == NULL` (0 or 1 non-cyclic node)?",
    options: [
      "The `while (fast != NULL && fast->next != NULL)` condition is immediately false and returns `NULL` (no cycle)",
      "`fast->next->next` executes once and crashes",
      "It enters Phase 2 anyway",
      "It returns `head` as the meeting point"
    ],
    answer: "The `while (fast != NULL && fast->next != NULL)` condition is immediately false and returns `NULL` (no cycle)",
    explanation: "Both empty and single non-cyclic lists fail the `while` guard safely on the very first check."
  },
  {
    id: 16,
    question: "Which classic array problem can also be solved in O(N) time and O(1) space using Floyd's Cycle-Finding Algorithm?",
    options: [
      "Finding the duplicate number in an array of `N + 1` integers in range `[1, N]` (treating `nums[i]` as `next` index)",
      "Sorting random floating-point numbers",
      "Multiplying two sparse matrices",
      "Computing the median of an unsorted stream"
    ],
    answer: "Finding the duplicate number in an array of `N + 1` integers in range `[1, N]` (treating `nums[i]` as `next` index)",
    explanation: "Viewing `i -> nums[i]` as a linked chain creates a cycle whose entry point is the duplicate value!"
  },
  {
    id: 17,
    question: "If `fast` moved 3 steps per turn instead of 2, could `fast` skip over `slow` without meeting on some cycles?",
    options: [
      "On a small loop like length 2, relative speed 2 (`3 - 1`) can keep stepping past `slow` if they start at odd/even parity until parity aligns—Wait: in a 2-node loop with gap 1, `+2 mod 2 == 0` stays gap 1 forever!",
      "No, any speed > 1 works identically",
      "Speed 3 is always faster in Big-O notation",
      "Speed 3 reduces memory usage to O(0)"
    ],
    answer: "On a small loop like length 2, relative speed 2 (`3 - 1`) can keep stepping past `slow` if they start at odd/even parity until parity aligns—Wait: in a 2-node loop with gap 1, `+2 mod 2 == 0` stays gap 1 forever!",
    explanation: "Relative speed `2` on an even-length cycle (like `C = 2`) leaves `gcd(2, 2) = 2`, so if they enter with gap 1 they NEVER meet! Speed 2 vs 1 has `gcd(1, C) = 1`, which always meets."
  },
  {
    id: 18,
    question: "Suppose `L = 4`, `C = 6`. At most how many iterations does Phase 1 take before `slow` and `fast` meet?",
    options: [
      "At most `L + C` steps (`<= 10` iterations), which is strictly O(N)",
      "Exactly `L * C = 24` iterations",
      "O(N^2) iterations",
      "Infinite iterations unless `L == C`"
    ],
    answer: "At most `L + C` steps (`<= 10` iterations), which is strictly O(N)",
    explanation: "Once `slow` enters the loop after `L` steps, `fast` is already inside and closes the remaining gap (`< C`) by 1 per step, so total steps < `L + C`."
  },
  {
    id: 19,
    question: "What common bug occurs if you write `Node *ptr = loopStart; while (ptr->next != loopStart)` and forget a NULL check in general code?",
    options: [
      "If `loopStart` were somehow `NULL`, `ptr->next` would segfault—so always ensure `meeting != NULL` before Phase 2 and Phase 3",
      "It reverses the loop",
      "It skips the last node",
      "Nothing—`ptr->next` is always valid even if `ptr == NULL`"
    ],
    answer: "If `loopStart` were somehow `NULL`, `ptr->next` would segfault—so always ensure `meeting != NULL` before Phase 2 and Phase 3",
    explanation: "Only enter Phase 2 and Phase 3 when `detectMeetingPoint(head)` returned a non-NULL pointer."
  },
  {
    id: 20,
    question: "In Phase 2, why shouldn't you reset `fast = head` and keep moving `fast` by 2 steps?",
    options: [
      "Because Phase 2 relies on BOTH `entry` and `slow` moving at 1x speed so they cover equal distances `L` and `(k-1)C + (C-x)` simultaneously",
      "Because `fast` is always `NULL` in Phase 2",
      "Because moving by 2 steps causes a stack overflow",
      "Because `head` cannot be assigned to `fast`"
    ],
    answer: "Because Phase 2 relies on BOTH `entry` and `slow` moving at 1x speed so they cover equal distances `L` and `(k-1)C + (C-x)` simultaneously",
    explanation: "In Phase 2, both pointers advance 1 node per iteration (`entry = entry->next; slow = slow->next;`)."
  },
  {
    id: 21,
    question: "If a linked list has a cycle, what happens when you call `printf` in a naive `while (curr != NULL)` loop?",
    options: [
      "It prints nodes in an infinite loop until killed (or output buffer fills)",
      "It automatically stops at the repeated node",
      "It prints `NULL` after one lap",
      "The compiler refuses to compile"
    ],
    answer: "It prints nodes in an infinite loop until killed (or output buffer fills)",
    explanation: "Because no node in or after the cycle ever has `next == NULL`, `curr != NULL` stays true forever."
  },
  {
    id: 22,
    question: "Can a Singly Linked List have a cycle that branches out to a second `NULL` tail at the same time?",
    options: [
      "No! Each node has only ONE `next` pointer, so once execution enters a cycle, it can never branch out to `NULL`",
      "Yes, every cycle still reaches `NULL` eventually",
      "Yes, if `data` is negative",
      "Only if `malloc()` was used twice"
    ],
    answer: "No! Each node has only ONE `next` pointer, so once execution enters a cycle, it can never branch out to `NULL`",
    explanation: "Every node has out-degree at most 1. A linked list with a cycle always ends in a single closed loop (a 'rho' / 6-shape)."
  },
  {
    id: 23,
    question: "What is another common name for Floyd's Cycle-Finding Algorithm?",
    options: [
      "The Tortoise and Hare Algorithm",
      "Dijkstra's Shortest Path",
      "Kadane's Sliding Window",
      "Kruskal's Union-Find"
    ],
    answer: "The Tortoise and Hare Algorithm",
    explanation: "Inspired by Aesop's fable, `slow` is the Tortoise (1 step) and `fast` is the Hare (2 steps)."
  },
  {
    id: 24,
    question: "In real-world systems, where are cycle-detection algorithms like Floyd's used?",
    options: [
      "Detecting corrupted pointer chains, pseudo-random number generator period detection, and memory/resource graph cycle checks",
      "Sorting floating-point arrays in `qsort()`",
      "Compressing JPEG images",
      "Allocating fixed-size stack frames"
    ],
    answer: "Detecting corrupted pointer chains, pseudo-random number generator period detection, and memory/resource graph cycle checks",
    explanation: "Floyd originally invented the algorithm for detecting cycles in iterated mathematical functions and PRNG sequences using O(1) memory."
  },
  {
    id: 25,
    question: "After breaking a loop with `ptr->next = NULL;`, how can you verify in O(N) time that the list is healthy again?",
    options: [
      "Run `detectMeetingPoint(head)` (returns `NULL`) and traverse cleanly to `NULL`",
      "Check if `head == NULL`",
      "Call `free(head)` immediately without freeing the tail",
      "Check `sizeof(head)`"
    ],
    answer: "Run `detectMeetingPoint(head)` (returns `NULL`) and traverse cleanly to `NULL`",
    explanation: "Once the back-edge is set to `NULL`, `detectMeetingPoint(head)` returns `NULL` and normal traversal terminates cleanly."
  }
];

export default questions;
