export const topic2Questions = [
  {
    question: "What is a Stack and what principle does it follow?",
    answer: "A Stack is an abstract linear data structure adhering to the LIFO (Last-In, First-Out) principle. Elements are inserted (pushed) and removed (popped) exclusively from the top."
  },
  {
    question: "What is a Queue and what principle does it follow?",
    answer: "A Queue is an abstract linear data structure adhering to the FIFO (First-In, First-Out) principle. Elements are inserted (enqueued) at the rear and removed (dequeued) from the front."
  },
  {
    question: "What are the time complexities of push, pop, and peek in a Linked Stack?",
    answer: "All three operations are strictly O(1) constant time, as they only manipulate the top node pointer."
  },
  {
    question: "What are the time complexities of enqueue and dequeue in a Linked Queue with front and rear pointers?",
    answer: "Both enqueue and dequeue are strictly O(1) constant time because operations occur directly at the rear and front pointers respectively."
  },
  {
    question: "What are the tradeoffs between an Array-based Stack vs a Linked-Node Stack?",
    answer: "Array Stacks provide contiguous memory locality (cache friendly) and zero pointer overhead, but have fixed capacity (or require realloc copying). Linked Stacks grow dynamically with zero capacity limits, but use 8 extra bytes per node for pointers and cause heap fragmentation."
  },
  {
    question: "What is Stack Overflow and Stack Underflow in C?",
    answer: "Stack Overflow occurs when attempting to push onto a fixed-capacity stack that is completely full. Stack Underflow occurs when attempting to pop from an empty stack."
  },
  {
    question: "How does a Circular Queue solve the false overflow problem in array-based queues?",
    answer: "In a standard array queue, dequeuing leaves unused space at the front. A Circular Queue wraps around using modulo arithmetic (rear = (rear + 1) % CAPACITY), reusing freed front slots efficiently."
  },
  {
    question: "What is the condition for a Circular Array Queue of size N to be full?",
    answer: "(rear + 1) % CAPACITY == front (when leaving one empty slot to differentiate full from empty)."
  },
  {
    question: "How does the CPU function call stack utilize the Stack data structure?",
    answer: "Every function call pushes a stack frame (parameters, local variables, return address) onto the call stack. When the function returns, its frame is popped, restoring the caller's execution state."
  },
  {
    question: "How is a Stack used to evaluate Postfix (Reverse Polish Notation) expressions?",
    answer: "Iterate through tokens: if a number is read, push it onto the stack. If an operator is read, pop two operands, apply the operator, and push the result back onto the stack."
  },
  {
    question: "How does Depth-First Search (DFS) relate to a Stack?",
    answer: "DFS traverses graph or tree nodes by pushing children onto a stack (or implicitly via the recursion call stack), exploring branch depth before backtracking."
  },
  {
    question: "How does Breadth-First Search (BFS) relate to a Queue?",
    answer: "BFS traverses graph or tree nodes layer-by-layer by enqueuing adjacent neighbor nodes into a FIFO queue, ensuring nodes at distance K are processed before distance K+1."
  },
  {
    question: "What is a Priority Queue and how does it differ from a standard Queue?",
    answer: "In a standard queue, elements are popped in arrival order (FIFO). In a Priority Queue, elements are dequeued based on priority (highest/lowest value), typically implemented with a Binary Heap in O(log N) time."
  },
  {
    question: "How do you implement a Queue using two Stacks?",
    answer: "Use Stack1 (inbox) for enqueue (push to Stack1). For dequeue, if Stack2 (outbox) is empty, pop all elements from Stack1 and push them into Stack2 (reversing order to FIFO), then pop from Stack2."
  },
  {
    question: "How is a Stack used to validate balanced parentheses in compiler syntax parsers?",
    answer: "Push opening brackets '(', '{', '[' onto the stack. When a closing bracket is seen, pop the top and verify it matches the closing bracket. If stack is empty at the end, parentheses are balanced."
  },
  {
    question: "What happens if a queue's front pointer becomes NULL after a dequeue operation?",
    answer: "The rear pointer must also be reset to NULL to maintain queue consistency for an empty queue."
  },
  {
    question: "What is an OS Print Spooler or Packet Buffer Queue?",
    answer: "A FIFO queue in operating systems that buffers incoming print jobs or network packets to process them in the exact order they arrived."
  },
  {
    question: "Can a Singly Linked List implement a Queue with O(1) operations?",
    answer: "Yes, by maintaining two pointers: 'front' (for O(1) dequeue at the head) and 'rear' (for O(1) enqueue at the tail)."
  },
  {
    question: "Why should dynamic Linked Stacks and Queues be freed in a loop rather than just calling free(stack)?",
    answer: "Calling free(stack) only frees the 16-byte metadata struct, leaving all individual heap node elements leaked in RAM. You must pop/free each node first."
  },
  {
    question: "What is the Infix-to-Postfix conversion algorithm using a Stack?",
    answer: "The Shunting-Yard algorithm (invented by Edsger Dijkstra), which uses an operator stack and operator precedence rules to convert algebraic infix notation into postfix notation."
  },
  {
    question: "What is a Monotonic Stack?",
    answer: "A stack whose elements are strictly monotonically increasing or decreasing, used in algorithmic challenges to find the 'Next Greater Element' in O(N) linear time."
  },
  {
    question: "What is a Double-Ended Queue (Deque)?",
    answer: "A sequence allowing insertions and deletions at both the front and rear in O(1) time."
  },
  {
    question: "How do lock-free concurrent queues function in multi-threaded C applications?",
    answer: "They use atomic Compare-And-Swap (CAS) CPU instructions (like atomic_compare_exchange in stdatomic.h) to update head and tail pointers without mutex locking."
  },
  {
    question: "What is the space complexity of a Linked Queue storing N 32-bit integers on a 64-bit OS?",
    answer: "Each node takes 4 bytes (int) + 4 bytes (padding) + 8 bytes (pointer) = 16 bytes. N nodes consume 16N bytes plus heap chunk allocation headers."
  },
  {
    question: "How do you check if a Stack or Queue is empty?",
    answer: "Check if stack->top == NULL or queue->front == NULL (or size == 0)."
  }
];
