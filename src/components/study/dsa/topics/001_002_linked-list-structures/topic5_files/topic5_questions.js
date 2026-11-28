const questions = [
  {
    id: 1,
    question: "Why is a Linked List far better than a plain coefficient array for representing a sparse polynomial like `5x^10000 + 2x^3 + 7`?",
    options: [
      "A linked list stores only the 3 non-zero terms (`O(k)` memory), whereas an array needs 10,001 slots mostly filled with zeroes",
      "Arrays cannot store negative coefficients",
      "Linked lists evaluate `x^10000` in O(1) hardware clock cycles",
      "Arrays only allow exponents up to 100"
    ],
    answer: "A linked list stores only the 3 non-zero terms (`O(k)` memory), whereas an array needs 10,001 slots mostly filled with zeroes",
    explanation: "Each linked node stores both `(coeff, exp)`, completely skipping zero terms and saving massive amounts of RAM on sparse polynomials."
  },
  {
    id: 2,
    question: "What fields does a Linked List node representing a single polynomial term contain?",
    options: [
      "`int coeff; int exp; struct Term *next;`",
      "`int data; struct Term *prev;`",
      "`char name[20]; float x;`",
      "`int index; int next_index;`"
    ],
    answer: "`int coeff; int exp; struct Term *next;`",
    explanation: "A polynomial term `c * x^e` needs coefficient `coeff`, exponent `exp`, and `next` pointer to the following term."
  },
  {
    id: 3,
    question: "Why do we keep polynomial linked lists sorted in DESCENDING order of exponents (`exp`)?",
    options: [
      "So addition can merge two polynomials in a single O(N + M) two-pointer pass (just like Merge Sort's merge step), and printing starts from the highest degree term",
      "Because C structs crash if exponents increase",
      "So `free()` runs faster",
      "Because `exp` cannot be 0 at the tail"
    ],
    answer: "So addition can merge two polynomials in a single O(N + M) two-pointer pass (just like Merge Sort's merge step), and printing starts from the highest degree term",
    explanation: "Without sorted exponents, adding two polynomials would require O(N * M) nested searching instead of a linear O(N + M) merge."
  },
  {
    id: 4,
    question: "During `addPolynomials(p1, p2)` when exponents are sorted descending, what happens if `p1->exp > p2->exp`?",
    options: [
      "Append `(p1->coeff, p1->exp)` to the result and advance ONLY `p1 = p1->next`",
      "Append both terms and advance both pointers",
      "Advance ONLY `p2 = p2->next`",
      "Add `p1->coeff + p2->coeff`"
    ],
    answer: "Append `(p1->coeff, p1->exp)` to the result and advance ONLY `p1 = p1->next`",
    explanation: "Since `p2` is sorted descending, `p2` cannot have any term matching `p1->exp` later, so `p1`'s term goes directly into the result."
  },
  {
    id: 5,
    question: "When `p1->exp == p2->exp` during Polynomial Addition and `p1->coeff + p2->coeff == 0`, what should your code do?",
    options: [
      "Skip inserting a node (`0x^k` is omitted in sparse form) and advance BOTH `p1` and `p2`",
      "Insert a node with `coeff = 0` anyway",
      "Stop adding the rest of the polynomials",
      "Free `p1` without advancing `p2`"
    ],
    answer: "Skip inserting a node (`0x^k` is omitted in sparse form) and advance BOTH `p1` and `p2`",
    explanation: "A sparse polynomial never stores zero-coefficient terms (like `+4x^2` cancelling `-4x^2`)."
  },
  {
    id: 6,
    question: "What is the time complexity of adding two sorted polynomial linked lists of lengths `N` and `M` using a `tail` pointer on the result list?",
    options: [
      "O(N + M)",
      "O(N * M)",
      "O((N + M)^2)",
      "O(log(N + M))"
    ],
    answer: "O(N + M)",
    explanation: "Maintaining a `tail` pointer lets each append take O(1), and each step advances `p1`, `p2`, or both—at most `N + M` steps total."
  },
  {
    id: 7,
    question: "Why is keeping a `tail` pointer on the result list `res` important inside `addPolynomials`?",
    options: [
      "Without `tail`, calling `insertTail` from `res` every time degrades addition from O(N + M) to O((N + M)^2)",
      "Without `tail`, `p1` and `p2` cannot be compared",
      "C requires every linked list to have a `tail` pointer",
      "It doubles the size of each `Term` node"
    ],
    answer: "Without `tail`, calling `insertTail` from `res` every time degrades addition from O(N + M) to O((N + M)^2)",
    explanation: "Appending via `tail->next = node; tail = node;` keeps every append O(1) instead of walking from the beginning of `res` each time."
  },
  {
    id: 8,
    question: "What happens after the main `while (p1 != NULL && p2 != NULL)` loop ends in `addPolynomials`?",
    options: [
      "Copy any remaining nodes from whichever of `p1` or `p2` is still non-NULL into the result",
      "Return immediately—any leftover terms are 0",
      "Multiply the remaining terms",
      "Set `res = NULL`"
    ],
    answer: "Copy any remaining nodes from whichever of `p1` or `p2` is still non-NULL into the result",
    explanation: "If one polynomial finishes earlier (e.g., `p1` had no lower-degree terms), the remaining tail of `p2` must still be copied to `res`."
  },
  {
    id: 9,
    question: "When multiplying two terms `(c1 * x^e1)` and `(c2 * x^e2)`, what are the resulting coefficient and exponent?",
    options: [
      "Coefficient = `c1 * c2`, Exponent = `e1 + e2`",
      "Coefficient = `c1 + c2`, Exponent = `e1 * e2`",
      "Coefficient = `c1 * c2`, Exponent = `e1 * e2`",
      "Coefficient = `c1 + c2`, Exponent = `e1 + e2`"
    ],
    answer: "Coefficient = `c1 * c2`, Exponent = `e1 + e2`",
    explanation: "By algebra, `(c1 * x^e1) * (c2 * x^e2) = (c1 * c2) * x^(e1 + e2)`."
  },
  {
    id: 10,
    question: "During Sparse Polynomial Multiplication, why do multiple pairs `(a, b)` often produce the SAME exponent `a->exp + b->exp`?",
    options: [
      "For example, `(x^2 + x)(x + 1)` produces `x^2 * 1` and `x * x`—both with exponent `2`—so like exponents must be combined!",
      "Only when coefficients are negative",
      "It only happens if the input polynomials were unsorted",
      "Two pairs can never produce the same exponent"
    ],
    answer: "For example, `(x^2 + x)(x + 1)` produces `x^2 * 1` and `x * x`—both with exponent `2`—so like exponents must be combined!",
    explanation: "`insertTermSorted` checks if `curr->exp == exp`; if so, it adds `curr->coeff += coeff` instead of creating a duplicate `x^2` node."
  },
  {
    id: 11,
    question: "In `insertTermSorted`, if adding to an existing matching exponent makes `curr->coeff == 0` (e.g., `+5x^2 + (-5x^2)`), what must happen?",
    options: [
      "Unlink `curr` from the list and call `free(curr)` so no zero-term node remains",
      "Leave `0x^2` in the list",
      "Set `curr->exp = -1`",
      "Delete the entire list"
    ],
    answer: "Unlink `curr` from the list and call `free(curr)` so no zero-term node remains",
    explanation: "Maintaining the sparse invariant means removing terms that cancel to 0 and freeing their heap memory immediately."
  },
  {
    id: 12,
    question: "On a 64-bit GCC compiler, what is `sizeof(struct Term)` for `{ int coeff; int exp; struct Term *next; }`?",
    options: [
      "16 bytes (4B `coeff` + 4B `exp` = 8B, followed by 8B `*next` with ZERO padding!)",
      "24 bytes",
      "12 bytes",
      "32 bytes"
    ],
    answer: "16 bytes (4B `coeff` + 4B `exp` = 8B, followed by 8B `*next` with ZERO padding!)",
    explanation: "Two 4-byte `int`s pack cleanly into the first 8 bytes, so `*next` naturally lands at offset +8 with zero wasted padding bytes!"
  },
  {
    id: 13,
    question: "What is the worst-case number of raw product pairs generated when multiplying a polynomial with `N` terms by one with `M` terms?",
    options: [
      "`N * M` raw pairs",
      "`N + M` pairs",
      "`max(N, M)` pairs",
      "`2^(N+M)` pairs"
    ],
    answer: "`N * M` raw pairs",
    explanation: "Every term in `P1` (`N` terms) multiplies every term in `P2` (`M` terms), producing `N * M` products before combining like exponents."
  },
  {
    id: 14,
    question: "If `P1` has `N` terms and `P2` has `M` terms, what is the maximum number of terms in the final simplified sum `P1 + P2`?",
    options: [
      "`N + M` (when no exponents overlap)",
      "`N * M`",
      "`max(N, M)`",
      "`N - M`"
    ],
    answer: "`N + M` (when no exponents overlap)",
    explanation: "If all exponents in `P1` and `P2` are distinct, every term survives into the sum (`N + M` nodes)."
  },
  {
    id: 15,
    question: "Why does `addPolynomials` create NEW nodes for the sum instead of splicing `p1`'s and `p2`'s existing nodes directly?",
    options: [
      "So `p1` and `p2` remain intact and unmodified—and can be printed, reused, or freed independently without Double-Free bugs!",
      "Because C does not allow two pointers to point to the same node",
      "Because `p1` nodes live on the stack",
      "To make addition O(N^2)"
    ],
    answer: "So `p1` and `p2` remain intact and unmodified—and can be printed, reused, or freed independently without Double-Free bugs!",
    explanation: "Sharing nodes across `p1`, `p2`, and `sum` would cause `freePoly(&p1)` and `freePoly(&sum)` to double-free the same addresses!"
  },
  {
    id: 16,
    question: "If you represent `P(x) = 0` (the zero polynomial) in this sparse linked list design, what is `head`?",
    options: [
      "`NULL` (0 nodes)",
      "A single node `{0, 0, NULL}`",
      "An infinite circular list",
      "Unallocated garbage"
    ],
    answer: "`NULL` (0 nodes)",
    explanation: "Since zero-coefficient terms are never stored, the zero polynomial is naturally `NULL`."
  },
  {
    id: 17,
    question: "How can Sparse Polynomial Multiplication be sped up from `O(N * M * (N + M))` to `O(N * M log(N * M))` for very large polynomials?",
    options: [
      "Append all `N * M` raw product terms into a list without sorting, Merge Sort that list by `exp` descending, then do a single linear pass to merge duplicate exponents",
      "Use a Bubble Sort inside the inner loop",
      "Use `realloc()` on every term",
      "Multiply in ascending order instead of descending"
    ],
    answer: "Append all `N * M` raw product terms into a list without sorting, Merge Sort that list by `exp` descending, then do a single linear pass to merge duplicate exponents",
    explanation: "Merge Sort on linked lists runs in `O(K log K)` with `O(1)` extra node memory (here `K = N * M`), beating repeated sorted insertion on huge inputs!"
  },
  {
    id: 18,
    question: "What is the time complexity to evaluate `P(x)` at a given value `x` for a sparse polynomial linked list of `N` terms?",
    options: [
      "O(N * log(max_exp)) using binary exponentiation (or O(N) if exponents are consecutive using Horner's rule)",
      "O(1)",
      "O(2^N)",
      "O(N^3)"
    ],
    answer: "O(N * log(max_exp)) using binary exponentiation (or O(N) if exponents are consecutive using Horner's rule)",
    explanation: "Each of the `N` terms computes `coeff * pow(x, exp)`. Using fast exponentiation (`O(log exp)`), each term is fast even when `exp = 1,000,000`."
  },
  {
    id: 19,
    question: "In `insertTermSorted(&head, coeff, exp)`, why is `if (coeff == 0) return;` checked at the very top?",
    options: [
      "To avoid allocating a useless zero-coefficient node or wasting a search traversal",
      "Because `0` cannot be stored in an `int`",
      "Because `exp` would become negative",
      "To prevent struct padding"
    ],
    answer: "To avoid allocating a useless zero-coefficient node or wasting a search traversal",
    explanation: "Adding `0 * x^k` changes nothing, so returning immediately preserves sparsity and saves work."
  },
  {
    id: 20,
    question: "Suppose `P1 = 5x^3 + 2x` and `P2 = 4x^2 + 3`. In step 1 of `addPolynomials(P1, P2)`, which node is chosen and why?",
    options: [
      "`5x^3` from `P1`, because `3 > 2` (`p1->exp > p2->exp`)",
      "`4x^2` from `P2`, because `4 < 5`",
      "`3` from `P2`, because `0 < 3`",
      "`5x^3 + 4x^2 = 9x^5`"
    ],
    answer: "`5x^3` from `P1`, because `3 > 2` (`p1->exp > p2->exp`)",
    explanation: "The merge always picks the term with the larger exponent first to keep the result sorted in descending order."
  },
  {
    id: 21,
    question: "In `Topic 5`'s C demo, if `insertTermSorted` deletes the HEAD node because `curr->coeff` became `0`, what happens?",
    options: [
      "`prev == NULL`, so `*headRef = curr->next;` updates `head` before `free(curr)`",
      "It skips updating `head` and segfaults",
      "It sets `head->coeff = 1`",
      "It breaks out of `main()`"
    ],
    answer: "`prev == NULL`, so `*headRef = curr->next;` updates `head` before `free(curr)`",
    explanation: "Handling `if (prev == NULL) *headRef = curr->next;` avoids `NULL->next` when the cancelled term happens to be the leading term."
  },
  {
    id: 22,
    question: "How would you implement Polynomial Subtraction `P1(x) - P2(x)` cleanly using `addPolynomials`?",
    options: [
      "Same 3-case merge, except negate `p2`'s coefficient (`-p2->coeff`) whenever taking or subtracting a term from `p2`",
      "Multiply `P1` and `P2` first",
      "Reverse `P2` before adding",
      "Subtract exponents instead of coefficients"
    ],
    answer: "Same 3-case merge, except negate `p2`'s coefficient (`-p2->coeff`) whenever taking or subtracting a term from `p2`",
    explanation: "`P1 - P2 = P1 + (-P2)`, so negating `p2->coeff` handles subtraction in the exact same O(N + M) merge!"
  },
  {
    id: 23,
    question: "Can a sparse polynomial linked list represent negative exponents (Laurent polynomials like `3x^-2`)?",
    options: [
      "Yes! Because `exp` is a signed `int`, negative exponents work automatically without any array-index errors",
      "No, negative exponents cause negative array indexing crashes",
      "Only if `coeff` is also negative",
      "Only in Doubly Linked Lists"
    ],
    answer: "Yes! Because `exp` is a signed `int`, negative exponents work automatically without any array-index errors",
    explanation: "Arrays cannot have negative indices like `arr[-2]`, whereas a linked list node stores `exp = -2` as an ordinary integer!"
  },
  {
    id: 24,
    question: "Why must `freePoly(&p1); freePoly(&p2); freePoly(&sum); freePoly(&prod);` all be called before `main()` exits?",
    options: [
      "Each polynomial owns its own heap-allocated `Term` nodes; freeing all four ensures 0 bytes leaked in Valgrind/ASan",
      "Calling `freePoly(&sum)` automatically frees `p1` and `p2`",
      "Only `prod` lives on the heap",
      "`freePoly` resets `coeff` to 0 without freeing memory"
    ],
    answer: "Each polynomial owns its own heap-allocated `Term` nodes; freeing all four ensures 0 bytes leaked in Valgrind/ASan",
    explanation: "Because `addPolynomials` and `multiplyPolynomials` allocate fresh result lists, all four independent chains must be freed."
  },
  {
    id: 25,
    question: "Which algorithmic pattern is Polynomial Addition an exact application of?",
    options: [
      "The Two-Pointer Sorted Merge pattern (identical to merging two sorted arrays/lists in Merge Sort)",
      "Floyd's Cycle Detection",
      "Depth-First Search",
      "LIFO Stack Expression Evaluation"
    ],
    answer: "The Two-Pointer Sorted Merge pattern (identical to merging two sorted arrays/lists in Merge Sort)",
    explanation: "Both `P1` and `P2` are sorted by `exp` descending, so comparing `p1->exp` vs `p2->exp` merges them in a single O(N + M) scan."
  }
];

export default questions;
