// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What specific variant of B-Tree does MySQL InnoDB use for indexing?",
    shortAnswer: "A **B+Tree** (B-Plus Tree) structure where all user data/pointers reside exclusively in the leaf nodes, and leaf nodes are linked via a doubly-linked list.",
    explanation: "B+Trees keep internal branch nodes lean, maximizing fan-out and range scan efficiency.",
    hint: "InnoDB uses a B+Tree variant with linked leaf nodes.",
    level: "basic"
  },
  {
    question: "What is stored in the non-leaf (root and intermediate branch) pages of an InnoDB B+Tree?",
    shortAnswer: "Only indexed key boundaries and child page pointers (`(Key, Page_Pointer)` pairs).",
    explanation: "Non-leaf pages do not store actual user rows, allowing them to hold hundreds or thousands of child pointers.",
    hint: "Only key boundaries and child page pointers.",
    level: "basic"
  },
  {
    question: "What is stored in the leaf pages (Level 0) of an InnoDB B+Tree?",
    shortAnswer: "The actual indexed keys along with either the full row data (in a Clustered Index) or the Primary Key value (in a Secondary Index).",
    explanation: "All payload records reside exclusively in leaf pages.",
    hint: "Indexed keys and full row data (clustered) or primary key pointers (secondary).",
    level: "basic"
  },
  {
    question: "What feature of B+Tree leaf nodes allows ultra-fast range queries (`BETWEEN`, `>`, `<`)?",
    shortAnswer: "The **Doubly-Linked List** connecting all adjacent leaf pages horizontally in sorted order.",
    explanation: "Once the starting key is found, the engine traverses horizontally along the linked list without re-traversing the tree root.",
    hint: "A doubly-linked list connecting all leaf pages in sorted order.",
    level: "basic"
  },
  {
    question: "What is 'Fan-Out' in a B+Tree index?",
    shortAnswer: "Fan-Out is the number of child page pointers that a single 16KB index branch page can hold.",
    explanation: "Higher fan-out keeps the tree height shallow, reducing the number of disk hops per query.",
    hint: "The number of child pointers held per 16KB index page.",
    level: "moderate"
  },
  {
    question: "Why is an InnoDB B+Tree typically only 3 to 4 levels deep even for a table with 100,000,000 rows?",
    shortAnswer: "Because of high fan-out: with ~1,000 pointers per 16KB page, a 3-level tree indexes $1,000^3 = 1,000,000,000$ (1 billion) rows.",
    explanation: "Exponential branch growth at each level keeps tree height compact.",
    hint: "High fan-out (1,000 pointers per page) allows 3 levels to hold 1 billion keys.",
    level: "moderate"
  },
  {
    question: "How does binary search work inside an individual 16KB index page?",
    shortAnswer: "InnoDB uses the page directory slot pointers to perform a binary search across record groups within the 16KB page in microseconds.",
    explanation: "Page directories allow logarithmic in-memory searching within the 16KB page.",
    hint: "Uses page directory slots to perform in-memory binary search within the page.",
    level: "expert"
  },
  {
    question: "What is an 'Index Seek'?",
    shortAnswer: "The process of traversing the B+Tree hierarchy from Root to Branch to Leaf to locate a specific search key in $O(\\log N)$ time.",
    explanation: "Seeks pinpoint specific keys or range starting points directly.",
    hint: "Traversing tree levels to pinpoint a specific key.",
    level: "basic"
  },
  {
    question: "What is an 'Index Range Scan'?",
    shortAnswer: "Finding the first qualifying key via an index seek, and then reading sequential keys along the leaf doubly-linked list until the range condition is no longer met.",
    explanation: "Combines logarithmic seek with sequential scan efficiency.",
    hint: "Seeking the start key and scanning adjacent leaf nodes horizontally.",
    level: "basic"
  },
  {
    question: "What is a 'Page Split' in an InnoDB B+Tree?",
    shortAnswer: "When an insert occurs in a full 16KB leaf page, InnoDB allocates a new page, moves approximately 50% of the records into the new page, and updates parent branch pointers.",
    explanation: "Accommodates new data when a page lacks free space, causing write overhead.",
    hint: "Splitting a full 16KB page into two to accommodate new keys.",
    level: "moderate"
  },
  {
    question: "Why do sequential `AUTO_INCREMENT` primary key inserts avoid page splits?",
    shortAnswer: "Because new keys are monotonically increasing and always append to the end of the rightmost leaf page at ~93.75% fill factor without splitting existing middle pages.",
    explanation: "Maintains compact, contiguous physical storage with minimal write overhead.",
    hint: "Inserts append strictly to the end of the last page without splitting middle pages.",
    level: "moderate"
  },
  {
    question: "Why do random UUID primary keys cause severe B-Tree page splits and fragmentation?",
    shortAnswer: "Because random UUIDs insert scattered values into random pages throughout the tree, causing existing full pages to split 50/50 and leaving pages half-empty.",
    explanation: "Causes memory bloat, high disk I/O, and severe B-Tree fragmentation.",
    hint: "Random keys insert into full middle pages, forcing constant 50% page splits.",
    level: "expert"
  },
  {
    question: "What is the typical page fill factor for sequential inserts in InnoDB?",
    shortAnswer: "Approx. **15/16 (93.75%)** fill factor.",
    explanation: "InnoDB leaves 1/16th free space for minor updates while maintaining dense storage.",
    hint: "15/16 or ~93.75%.",
    level: "expert"
  },
  {
    question: "What is the typical page fill factor when a 50/50 page split occurs?",
    shortAnswer: "Approx. **50%** fill factor in both the old and new pages.",
    explanation: "Splitting divides records equally between the two pages, wasting up to half the allocated disk space.",
    hint: "~50% fill factor.",
    level: "moderate"
  },
  {
    question: "What is B-Tree 'Page Merge' (Coalesce)?",
    shortAnswer: "When `DELETE` operations reduce the data in an index page below 50% threshold (`MERGE_THRESHOLD`), InnoDB attempts to merge it with a neighboring sibling page to free disk space.",
    explanation: "The reverse operation of a page split, keeping tree density balanced.",
    hint: "Combining two under-filled adjacent pages into one when rows are deleted.",
    level: "expert"
  },
  {
    question: "Why does keeping indexed column data types narrow (e.g. `INT` instead of `VARCHAR(255)`) improve B-Tree performance?",
    shortAnswer: "Narrower keys take fewer bytes, allowing more `(Key, Pointer)` pairs per 16KB page, increasing Fan-Out and reducing tree height.",
    explanation: "Higher fan-out reduces the total number of disk pages needed to index the table.",
    hint: "Smaller keys increase fan-out and keep tree height shallow.",
    level: "moderate"
  },
  {
    question: "Can a B+Tree index be used to satisfy an `ORDER BY col DESC` query efficiently?",
    shortAnswer: "YES. The doubly-linked list at the leaf level can be scanned in reverse order (backward scan) with zero filesort overhead.",
    explanation: "Leaf pointers link both forward (next) and backward (previous).",
    hint: "Yes; the leaf doubly-linked list supports bidirectional forward and backward scans.",
    level: "basic"
  },
  {
    question: "What is a 'Covering Index' in B+Tree lookup mechanics?",
    shortAnswer: "An index that contains all the columns requested by a `SELECT` query in its leaf pages, allowing MySQL to return data immediately without accessing the clustered base table.",
    explanation: "Covering queries avoid the secondary lookup hop back to the primary key table.",
    hint: "An index containing all columns needed by the query, eliminating base table lookups.",
    level: "expert"
  },
  {
    question: "What appears in the `Extra` column of `EXPLAIN` when a Covering Index is used?",
    shortAnswer: "`Using index`",
    explanation: "'Using index' confirms that the query was satisfied entirely from B-Tree leaf pages.",
    hint: "Using index",
    level: "basic"
  },
  {
    question: "How does InnoDB navigate from a Secondary Index leaf node to the full row data in the Clustered Index?",
    shortAnswer: "The secondary index leaf node stores the row's **Primary Key value**; MySQL performs a second B-Tree seek on the Clustered Index using this primary key (known as a Key Lookup / Bookmark Lookup).",
    explanation: "Secondary index -> Primary Key -> Clustered Index Seek -> Full Row Data.",
    hint: "Uses the stored Primary Key to perform a second seek on the Clustered Index.",
    level: "expert"
  },
  {
    question: "Why doesn't InnoDB store physical disk byte offsets (row pointers) in secondary index leaf nodes?",
    shortAnswer: "Because if the clustered table performs a page split, physical row addresses move; storing logical Primary Keys prevents needing to update every secondary index when physical rows move.",
    explanation: "Decouples physical storage re-organization from secondary index maintenance.",
    hint: "Storing primary keys prevents updating secondary indexes when base rows move.",
    level: "expert"
  },
  {
    question: "What is the performance cost of a Key Lookup (Bookmark Lookup) in secondary index scans?",
    shortAnswer: "For every matching secondary index record, an additional 3-hop B-Tree seek on the clustered index is executed, which can cause random I/O if many rows match.",
    explanation: "If too many rows match, the optimizer may choose a full table scan instead.",
    hint: "Incurs a secondary B-Tree seek for each matching row to fetch non-indexed columns.",
    level: "expert"
  },
  {
    question: "How does the B+Tree structure handle `NULL` values in MySQL InnoDB?",
    shortAnswer: "NULLs are treated as the lowest possible values and are stored at the beginning (far left) of the B-Tree leaf structure.",
    explanation: "Sorted order places NULL values before all other values.",
    hint: "Stored at the extreme left (lowest values) of the B-Tree.",
    level: "moderate"
  },
  {
    question: "Can an index accelerate `WHERE fee >= 20000 AND fee <= 30000`?",
    shortAnswer: "YES. It performs a B-Tree seek to the first key $\\ge 20000$ and scans leaf pages sequentially until reaching $> 30000$.",
    explanation: "Classic B-Tree range scan over the leaf linked list.",
    hint: "Yes; seeks 20000 and scans leaf nodes until 30000.",
    level: "basic"
  },
  {
    question: "What is 'Index Condition Pushdown' (ICP) in B-Tree index processing?",
    shortAnswer: "An optimization where the storage engine evaluates `WHERE` filter conditions directly inside the index tree before reading full rows from the clustered table.",
    explanation: "Reduces the number of times the engine must read full base table rows.",
    hint: "Evaluating WHERE conditions directly inside the storage engine index layer.",
    level: "expert"
  },
  {
    question: "What appears in the `Extra` column of `EXPLAIN` when Index Condition Pushdown is active?",
    shortAnswer: "`Using index condition`",
    explanation: "Confirms ICP is filtering rows at the storage engine level.",
    hint: "Using index condition",
    level: "basic"
  },
  {
    question: "How does a B+Tree perform `MIN()` and `MAX()` queries on an indexed column in $O(1)$ constant time?",
    shortAnswer: "`MIN()` reads the first record of the leftmost leaf page; `MAX()` reads the last record of the rightmost leaf page directly.",
    explanation: "The sorted tree boundaries contain extrema at the extreme ends.",
    hint: "MIN is the leftmost leaf key; MAX is the rightmost leaf key.",
    level: "moderate"
  },
  {
    question: "What appears in `EXPLAIN` for a `SELECT MIN(indexed_col) FROM table;` query?",
    shortAnswer: "`Select tables optimized away`",
    explanation: "MySQL reads the value instantly from index metadata without reading table rows.",
    hint: "Select tables optimized away",
    level: "moderate"
  },
  {
    question: "Why does InnoDB re-balance B-Tree nodes automatically during DML?",
    shortAnswer: "To ensure that all leaf nodes remain at the exact same depth from the root, preserving the guaranteed $O(\\log N)$ search complexity.",
    explanation: "Self-balancing invariant prevents degradation into a linear linked list.",
    hint: "Guarantees that all leaf nodes remain at the exact same height/depth.",
    level: "expert"
  },
  {
    question: "What is the key takeaway regarding B-Tree physical structure for database design?",
    shortAnswer: "B+Trees deliver $O(\\log N)$ seeks and fast horizontal range scans via linked leaves, but depend on sequential primary keys to prevent expensive 50% page splits.",
    explanation: "Understanding tree physical layout guides optimal primary key and index design.",
    hint: "Shallow tree height + linked leaves + sequential clustering prevents page splits.",
    level: "expert"
  }
];

export default questions;
