// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What is the complete 4-level physical storage hierarchy in InnoDB?",
    shortAnswer: "1) **Tablespace** (`.ibd`), 2) **Segments** (Leaf/Data and Non-Leaf/Index), 3) **Extents** (64 contiguous pages = 1 MB), and 4) **Pages** (16 KB atomic blocks).",
    explanation: "This structured hierarchy organizes B+ trees on physical disk media.",
    hint: "Tablespace &rarr; Segment &rarr; Extent &rarr; Page &rarr; Row.",
    level: "basic"
  },
  {
    question: "How many 16KB pages make up an Extent in InnoDB, and why are Extents used?",
    shortAnswer: "**64 Pages** (64 * 16 KB = **1 MB**). Extents are allocated as contiguous disk blocks to enable efficient sequential read-ahead and sequential disk write I/O.",
    explanation: "Allocating 1MB contiguous extents minimizes disk head movement during large range scans.",
    hint: "64 pages (1 MB total) allocated contiguously for sequential I/O performance.",
    level: "basic"
  },
  {
    question: "What are the two primary segments allocated for every B+ Tree index in InnoDB?",
    shortAnswer: "1) **Leaf Segment (Data Segment)**: Stores all leaf pages containing table rows and primary keys.\n2) **Non-Leaf Segment (Index Segment)**: Stores internal navigation pages containing search keys and child page pointers.",
    explanation: "Isolating leaf and non-leaf pages allows independent sequential allocation.",
    hint: "Leaf Segment (for data rows) and Non-Leaf Segment (for internal B+ tree navigation).",
    level: "expert"
  },
  {
    question: "What are the seven structural sections inside a 16KB InnoDB Page?",
    shortAnswer: "1) **File Header** (38 B), 2) **Page Header** (56 B), 3) **Infimum & Supremum Records** (26 B), 4) **User Records**, 5) **Free Space**, 6) **Page Directory**, and 7) **File Trailer** (8 B).",
    explanation: "The universal internal byte layout of every 16KB page frame.",
    hint: "File Header, Page Header, Infimum/Supremum, User Records, Free Space, Page Directory, Trailer.",
    level: "expert"
  },
  {
    question: "What is the purpose of the `FIL_PAGE_PREV` and `FIL_PAGE_NEXT` pointers in the File Header?",
    shortAnswer: "They form a **doubly-linked list** connecting adjacent leaf pages at the same level of the B+ tree, enabling fast bidirectional sequential range scans (`ORDER BY ASC/DESC`, `BETWEEN`).",
    explanation: "Allows range queries to traverse adjacent pages without re-traversing from the root.",
    hint: "Forms a doubly-linked list between adjacent pages for bidirectional range scans.",
    level: "expert"
  },
  {
    question: "What are the 'Infimum' and 'Supremum' records on an InnoDB page?",
    shortAnswer: "Two fixed virtual boundary records on every page: **Infimum** represents the lowest possible key value on the page, and **Supremum** represents the highest possible key value, acting as head and tail sentinels for the row linked list.",
    explanation: "Provides fixed anchors for the page's singly-linked record chain.",
    hint: "Fixed sentinel boundary records representing the minimum and maximum keys on the page.",
    level: "expert"
  },
  {
    question: "How does the Page Directory enable fast searching within a 16KB page in RAM?",
    shortAnswer: "The Page Directory is a sparse array of 2-byte slot pointers where each slot points to a group of 4 to 8 rows; InnoDB performs **Binary Search** across the Page Directory slots ($O(\\log K)$), then scans at most 4 to 8 rows linearly.",
    explanation: "Avoids scanning hundreds of rows linearly within the page frame.",
    hint: "Uses a sparse array of slot pointers to perform binary search across rows within the page.",
    level: "expert"
  },
  {
    question: "What triggers a 'Page Split' in an InnoDB B+ Tree?",
    shortAnswer: "When an `INSERT` or `UPDATE` operation attempts to add a row to a 16KB page that has insufficient **Free Space**, InnoDB allocates a new page, moves approximately 50% of the records to the new page, and updates parent index pointers.",
    explanation: "Standard B+ tree node splitting to accommodate expanding data.",
    hint: "Inserting into a page with insufficient Free Space, splitting rows 50/50 across two pages.",
    level: "basic"
  },
  {
    question: "Why do sequential `AUTO_INCREMENT` primary keys produce significantly less page fragmentation than random UUID primary keys?",
    shortAnswer: "Sequential keys are always appended at the end of the last page (**93% page fill ratio**, 0 random page splits); random UUIDs insert into random pages throughout the B+ tree, triggering frequent **50/50 page splits** and leaving pages half-empty (~50% fragmentation).",
    explanation: "Sequential insertion avoids expensive mid-tree page splits and doubles storage density.",
    hint: "Sequential keys append to the end of pages; random UUIDs trigger constant mid-tree 50/50 page splits.",
    level: "basic"
  },
  {
    question: "What information is stored in the 8-byte File Trailer of an InnoDB page?",
    shortAnswer: "The **CRC32 Checksum** and the **Low 4 bytes of the Page LSN**, used to verify that the end of the page matches the header to detect torn partial page writes.",
    explanation: "Validates that the entire 16KB page was written successfully without corruption.",
    hint: "Checksum and low LSN bytes matching the file header to detect torn writes.",
    level: "expert"
  },
  {
    question: "How many rows can typically fit inside a single 16KB InnoDB leaf page?",
    shortAnswer: "Depending on row width: approximately **50 to 200 rows** for typical 100-byte to 300-byte table records, with a strict minimum requirement that at least **2 rows** must fit on every non-empty page.",
    explanation: "If a single row is too wide (> 8KB), InnoDB offloads variable-length data to overflow pages.",
    hint: "Typically 50 to 200 rows; minimum of 2 rows per page enforced by B+ tree rules.",
    level: "basic"
  },
  {
    question: "What is an 'Off-Page' or Overflow Page in InnoDB?",
    shortAnswer: "A separate 16KB page allocated outside the B+ tree to hold large `VARCHAR`, `BLOB`, or `TEXT` column data that exceeds page thresholds, leaving a 20-byte pointer in the main clustered index leaf page.",
    explanation: "Prevents wide columns from bloating leaf pages and degrading index scan speed.",
    hint: "Separate page storing large BLOB/TEXT data that exceeds the 16KB page limit.",
    level: "expert"
  },
  {
    question: "What does `PAGE_GARBAGE` in the Page Header measure?",
    shortAnswer: "The total number of bytes occupied by deleted or updated rows that have been marked as deleted but have not yet been reclaimed or defragmented by page reorganization.",
    explanation: "Tracks internal fragmented dead space on the page.",
    hint: "The byte count of deleted/dead space on the page awaiting reorganization.",
    level: "expert"
  },
  {
    question: "What is 'Page Merge' in an InnoDB B+ Tree?",
    shortAnswer: "The inverse of a page split: when adjacent pages fall below `MERGE_THRESHOLD` (default: 50% capacity) due to deletions, InnoDB merges the two pages into one and frees the empty page back to the extent.",
    explanation: "Reclaims sparse pages to maintain high storage density.",
    hint: "Merges two under-filled adjacent pages (< 50% full) into a single page.",
    level: "expert"
  },
  {
    question: "How do you inspect the physical page fill ratio and fragmentation using the `innodb_ruby` tool or SQL?",
    shortAnswer: "Query `information_schema.innodb_tablespaces` and `information_schema.innodb_tables` or inspect `data_length` vs `data_free`.",
    explanation: "Identifies pages with high dead space that would benefit from `OPTIMIZE TABLE`.",
    hint: "Check data_free in information_schema.tables or use physical page inspection tools.",
    level: "basic"
  },
  {
    question: "What is the purpose of the `PAGE_LEVEL` field in the Page Header?",
    shortAnswer: "It records the height/level of the page in the B+ tree: `0` indicates a **Leaf Page** (containing data rows); values `> 0` indicate **Internal Navigation Pages** (with root page having the highest level).",
    explanation: "Defines the hierarchical position of the page in the B+ tree.",
    hint: "0 for Leaf Data Pages; > 0 for Internal B+ Tree Navigation Pages.",
    level: "expert"
  },
  {
    question: "What is the default B+ Tree height for a table with 10 million rows in InnoDB?",
    shortAnswer: "Typically only **3 to 4 levels** deep, because each 16KB internal navigation page has a high fan-out (holding hundreds of child page pointers), allowing $O(3-4)$ disk reads to locate any row among millions.",
    explanation: "Demonstrates the immense branching factor of B+ trees.",
    hint: "Typically only 3 to 4 levels deep due to high B+ tree fan-out.",
    level: "basic"
  },
  {
    question: "What is the difference between `COMPACT` and `DYNAMIC` row storage on a 16KB page?",
    shortAnswer: "- **COMPACT**: Stores the first 768 bytes of large `BLOB`/`VARCHAR` columns on the page before offloading.\n- **DYNAMIC**: Offloads the **entire** large `BLOB`/`VARCHAR` column to overflow pages (leaving only a 20-byte pointer), maximizing row density on the leaf page.",
    explanation: "DYNAMIC row format delivers superior index scanning performance.",
    hint: "DYNAMIC offloads entire wide BLOBs to overflow pages; COMPACT keeps 768 bytes on-page.",
    level: "expert"
  },
  {
    question: "How does InnoDB allocate space when a table is very small (< 32 pages)?",
    shortAnswer: "It allocates **Individual Pages** from the shared 'Fragment Array' of the tablespace rather than allocating a full 1MB Extent, avoiding disk space waste for small lookup tables.",
    explanation: "Saves disk space for databases with thousands of small tables.",
    hint: "Allocates single pages from fragment arrays until the table grows beyond 32 pages.",
    level: "expert"
  },
  {
    question: "What is the `FIL_PAGE_TYPE` field in the File Header?",
    shortAnswer: "A 2-byte field identifying the purpose of the page: `FIL_PAGE_INDEX` (B+ tree page), `FIL_PAGE_UNDO_LOG`, `FIL_PAGE_INODE` (segment tracking), `FIL_PAGE_TYPE_FSP_HDR` (tablespace header), etc.",
    explanation: "Tells the storage engine how to interpret the page payload.",
    hint: "Identifies whether the page is a B+ tree page, undo log page, or header page.",
    level: "expert"
  },
  {
    question: "What happens when rows are deleted from a page?",
    shortAnswer: "The rows are not immediately wiped from disk; their `delete_mark` bit is set, and their space is linked into a singly-linked **Free Record List** inside the page, available for immediate reuse by future `INSERT` statements of matching size.",
    explanation: "Minimizes page restructuring overhead on deletes.",
    hint: "Rows are delete-marked and added to an in-page free record list for space reuse.",
    level: "expert"
  },
  {
    question: "What is 'Page Reorganization' in InnoDB?",
    shortAnswer: "An internal defragmentation routine that runs when a page has enough fragmented dead space (`PAGE_GARBAGE`) to satisfy an `INSERT`: it copies all active rows to a contiguous buffer and writes them back tightly packed.",
    explanation: "Consolidates free space within the 16KB frame without allocating new pages.",
    hint: "Defragments dead space within a 16KB page by repacking active rows contiguously.",
    level: "expert"
  },
  {
    question: "Why does InnoDB enforce that the Primary Key is always stored in every Secondary Index record?",
    shortAnswer: "Because in a Clustered Index architecture, secondary index leaf pages store the indexed column value paired with the **Primary Key value**, which is used to perform the secondary clustered lookup (Bookmark Lookup).",
    explanation: "Connects secondary indexes to the primary clustered B+ tree.",
    hint: "Secondary index leaf nodes store the Primary Key to look up the full row in the clustered tree.",
    level: "basic"
  },
  {
    question: "What is the consequence of choosing a very wide Primary Key (e.g. `VARCHAR(255)`) on B+ tree physical structure?",
    shortAnswer: "It inflates the physical size of **every secondary index** on the table (since each secondary index must store the primary key), reduces the fan-out of internal B+ tree pages, and forces more 16KB pages into the Buffer Pool.",
    explanation: "Compact primary keys (`BIGINT` or `INT`) maximize B+ tree fan-out and cache density.",
    hint: "Inflates every secondary index and reduces B+ tree fan-out across all navigation pages.",
    level: "basic"
  },
  {
    question: "What is the `PAGE_N_DIR_SLOTS` field in the Page Header?",
    shortAnswer: "The count of active 2-byte slot pointers currently allocated in the Page Directory at the bottom of the page.",
    explanation: "Tracks the size of the binary search directory.",
    hint: "The number of slot pointers in the Page Directory for binary search.",
    level: "expert"
  },
  {
    question: "How do you configure the InnoDB page size for the entire MySQL server instance?",
    shortAnswer: "`innodb_page_size = 16k` (or `4k`, `8k`, `32k`, `64k`) configured before database initialization in `my.cnf`.",
    explanation: "Must be set before running `mysqld --initialize`.",
    hint: "Set innodb_page_size before initializing the database instance.",
    level: "basic"
  },
  {
    question: "What is the 'High-Water Mark' in an InnoDB tablespace?",
    shortAnswer: "The highest allocated page boundary within the tablespace file; pages below the high-water mark may be empty or fragmented, but the file size on disk is determined by the high-water mark.",
    explanation: "Explains why deleting rows does not automatically shrink tablespace files.",
    hint: "The maximum allocated page boundary determining physical file size on disk.",
    level: "expert"
  },
  {
    question: "Why are row records on an InnoDB page singly linked in ascending key order?",
    shortAnswer: "To allow instant sequential iteration through records within the page once the Page Directory binary search locates the starting slot.",
    explanation: "Enables fast in-memory record traversal.",
    hint: "Enables fast sequential traversal through rows following binary search.",
    level: "expert"
  },
  {
    question: "What is the minimum number of bytes in an empty 16KB InnoDB Page?",
    shortAnswer: "Approximately **128 bytes** (File Header 38B + Page Header 56B + Infimum/Supremum 26B + File Trailer 8B), leaving ~16,256 bytes for User Records and Free Space.",
    explanation: "Fixed overhead is less than 1% of the total 16KB page frame.",
    hint: "Fixed structural overhead is ~128 bytes, leaving >16KB for data.",
    level: "expert"
  },
  {
    question: "What is the primary architectural takeaway of Topic 8 in Module 004_001?",
    shortAnswer: "InnoDB's physical storage layout (Tablespace &rarr; Segment &rarr; Extent &rarr; Page) combined with the 7-part anatomy of a 16KB Page (File Header, Page Header, Records, Page Directory, Trailer) enables ultra-fast $O(\\log N)$ B+ tree traversal, in-page binary search, and high-density sequential I/O allocation.",
    explanation: "Understanding physical page anatomy is the key to designing optimal primary keys and index strategies.",
    hint: "Mastering the physical 16KB page layout and B+ tree storage hierarchy.",
    level: "basic"
  }
];

export default questions;
