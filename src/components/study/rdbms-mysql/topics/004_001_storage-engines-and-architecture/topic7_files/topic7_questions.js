// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is a 'Torn Page' (or Partial Page Write) in database storage?",
    shortAnswer: "A corrupted data page that occurs when a server loses power mid-write, resulting in only a portion of a 16KB InnoDB page (e.g. 4KB or 8KB) being written to disk while the remaining blocks contain old or garbage data.",
    explanation: "Caused by the mismatch between 16KB InnoDB pages and 4KB OS filesystem block sizes.",
    hint: "A partially written 16KB page caused by power failure during disk I/O.",
    level: "basic"
  },
  {
    question: "Why can the Redo Log NOT repair a torn page directly on its own?",
    shortAnswer: "Because InnoDB uses **Physiological Redo Logging** (storing byte deltas to be applied to existing page offsets), which requires the underlying 16KB base page on disk to be structurally intact and valid.",
    explanation: "If the base page is physically torn, applying deltas will corrupt the B+ tree structure further.",
    hint: "Physiological redo logging requires an intact base page to reapply delta changes.",
    level: "expert"
  },
  {
    question: "What is the Doublewrite Buffer in InnoDB?",
    shortAnswer: "A contiguous on-disk buffer storage area where InnoDB writes batches of 16KB pages *before* writing them to their final random locations in `.ibd` tablespaces, providing a pristine backup copy if a torn write occurs.",
    explanation: "Acts as an insurance policy against operating system partial page writes.",
    hint: "A contiguous on-disk buffer storing 16KB pages before tablespace flushing.",
    level: "basic"
  },
  {
    question: "What are the two steps in InnoDB's two-step page flushing sequence?",
    shortAnswer: "1) **Contiguous Sequential Write**: Dirty pages are written in contiguous chunks to the Doublewrite Buffer on disk and synced via `fsync()`.\n2) **Random Tablespace Write**: The pages are written to their actual positions in `.ibd` tablespace files.",
    explanation: "Decouples crash insurance from random tablespace file placement.",
    hint: "Step 1: Contiguous sequential write to doublewrite buffer; Step 2: Random write to tablespace.",
    level: "expert"
  },
  {
    question: "How does InnoDB detect that a page in a tablespace is torn during crash recovery?",
    shortAnswer: "By comparing the **CRC32 Checksum** stored in the page header against a freshly computed checksum of the page payload and trailer. If they mismatch, the page is flagged as torn.",
    explanation: "Page headers and trailers contain checksums specifically designed to detect partial writes.",
    hint: "Detects checksum mismatches between the page header and page trailer.",
    level: "expert"
  },
  {
    question: "How does InnoDB recover a torn page during startup?",
    shortAnswer: "Upon detecting a checksum mismatch, InnoDB looks up the intact copy of that 16KB page inside the Doublewrite Buffer, copies it over the damaged tablespace page, and then applies Redo Log changes to bring it completely up to date.",
    explanation: "Guarantees 100% crash recovery without data loss or corrupted tablespaces.",
    hint: "Overwrites damaged page with the intact copy from Doublewrite buffer, then applies redo log.",
    level: "expert"
  },
  {
    question: "Why does writing to the Doublewrite Buffer NOT double the disk I/O overhead of the database?",
    shortAnswer: "Because writes to the Doublewrite Buffer are **large, contiguous sequential blocks** (a single sequential `fsync` for up to 128 pages), which incurs only a negligible 3% to 5% performance overhead on modern storage hardware.",
    explanation: "Sequential contiguous disk I/O is vastly faster than random tablespace writes.",
    hint: "Because doublewrite writes are contiguous and sequential, adding only ~3-5% overhead.",
    level: "expert"
  },
  {
    question: "Where are Doublewrite Buffer files stored in MySQL 8.0.20+?",
    shortAnswer: "In dedicated separate files named `#ib_16384_0.dblwr` and `#ib_16384_1.dblwr` located inside the MySQL data directory (or configured via `innodb_doublewrite_dir`).",
    explanation: "Moved out of the shared `ibdata1` system tablespace for improved I/O throughput.",
    hint: "In dedicated #ib_16384_*.dblwr files in the data directory.",
    level: "basic"
  },
  {
    question: "What are the four supported modes of the `innodb_doublewrite` system variable in MySQL 8.0?",
    shortAnswer: "- **ON (Default)**: Full doublewrite buffer active (detects and recovers torn pages).\n- **OFF**: Doublewrite buffer disabled.\n- **DETECT_AND_RECOVER**: Dedicated doublewrite files enabled with automatic recovery.\n- **DETECT_ONLY**: Logs torn page errors without writing to doublewrite buffer.",
    explanation: "Provides granular control over doublewrite behavior.",
    hint: "ON, OFF, DETECT_AND_RECOVER, DETECT_ONLY.",
    level: "expert"
  },
  {
    question: "Under what specific storage condition can `innodb_doublewrite` be safely set to `OFF`?",
    shortAnswer: "When running on filesystems with **Atomic 16KB Writes or Copy-on-Write (CoW)** architectures, such as **ZFS**, **Btrfs**, or specialized hardware SSD controllers (like Fusion-io / atomic-write NVMe drives) that guarantee 16KB write atomicity.",
    explanation: "When the filesystem guarantees atomic 16KB writes, doublewrite buffering is redundant.",
    hint: "On Copy-on-Write filesystems (ZFS/Btrfs) or hardware with atomic 16KB write guarantees.",
    level: "expert"
  },
  {
    question: "What is the danger of setting `innodb_doublewrite = OFF` on standard ext4, XFS, or NTFS filesystems?",
    shortAnswer: "An unexpected power outage or kernel crash during a write will cause permanent, unrecoverable page corruption (Torn Pages), destroying B+ trees and requiring database restore from backups.",
    explanation: "Standard filesystems do not guarantee 16KB write atomicity.",
    hint: "Power outages will cause unrecoverable page corruption and broken B+ trees on standard filesystems.",
    level: "basic"
  },
  {
    question: "How do you inspect the total number of pages written through the Doublewrite Buffer in MySQL?",
    shortAnswer: "`SHOW GLOBAL STATUS LIKE 'Innodb_dblwr_%';`",
    explanation: "Displays `Innodb_dblwr_pages_written` and `Innodb_dblwr_writes`.",
    hint: "SHOW GLOBAL STATUS LIKE 'Innodb_dblwr_%';",
    level: "basic",
    codeExample: "SHOW GLOBAL STATUS LIKE 'Innodb_dblwr_%';"
  },
  {
    question: "What is the significance of the ratio `Innodb_dblwr_pages_written / Innodb_dblwr_writes`?",
    shortAnswer: "It measures the average **batch size** of pages written per doublewrite I/O operation (higher values like 30-64 indicate efficient large batching; low values near 1 indicate small, inefficient single-page writes).",
    explanation: "High batching ratios maximize disk write throughput.",
    hint: "Measures the average number of pages batched per doublewrite write operation.",
    level: "expert"
  },
  {
    question: "What does `innodb_doublewrite_pages` configure in MySQL 8.0?",
    shortAnswer: "It controls the maximum number of doublewrite pages that a single thread can write in a batch (default: 4), tuning parallel write batching across multiple page cleaner threads.",
    explanation: "Controls write batch granularity per thread.",
    hint: "Controls maximum doublewrite pages batched per thread.",
    level: "expert"
  },
  {
    question: "Can the Doublewrite Buffer be placed on a separate physical disk drive from tablespace files?",
    shortAnswer: "Yes! By configuring `innodb_doublewrite_dir = '/mnt/fast_nvme/dblwr'` in `my.cnf`, DBAs can place doublewrite files on a dedicated high-speed NVMe drive to isolate sequential write I/O.",
    explanation: "Isolates doublewrite sequential writes from tablespace random writes.",
    hint: "Yes, via the innodb_doublewrite_dir configuration variable.",
    level: "expert"
  },
  {
    question: "What happens if MySQL detects a checksum error on a page in a database where `innodb_doublewrite = OFF`?",
    shortAnswer: "InnoDB crashes immediately with a fatal checksum assertion failure during startup, refusing to open the table to prevent further data corruption.",
    explanation: "Without doublewrite buffer, corrupted pages cannot be self-healed.",
    hint: "InnoDB crashes with fatal checksum error and refuses to start.",
    level: "basic"
  },
  {
    question: "What is the default page size of the Doublewrite Buffer?",
    shortAnswer: "It matches the server's `innodb_page_size` (default: **16 KB**), automatically scaling if the server is configured with 4KB, 8KB, 32KB, or 64KB page sizes.",
    explanation: "Maintains 1-to-1 parity with tablespace page frames.",
    hint: "Matches the configured innodb_page_size (default 16 KB).",
    level: "basic"
  },
  {
    question: "What is the relationship between the Doublewrite Buffer and the Buffer Pool Flush List?",
    shortAnswer: "Page Cleaner threads take dirty pages from the Buffer Pool Flush List, write them first to the Doublewrite Buffer in contiguous blocks, sync the doublewrite file, and then write them to tablespace files.",
    explanation: "Coordinates memory page flushing with on-disk crash insurance.",
    hint: "Flushes dirty pages from Flush List to Doublewrite buffer before tablespaces.",
    level: "expert"
  },
  {
    question: "How many doublewrite files are created by default in MySQL 8.0.20+?",
    shortAnswer: "It creates doublewrite files proportional to the number of Buffer Pool instances and Page Cleaner threads (configured via `innodb_doublewrite_files`), ensuring parallel write paths without mutex contention.",
    explanation: "Multi-file architecture eliminates single-file doublewrite bottlenecks.",
    hint: "Proportional to buffer pool instances and page cleaner threads (innodb_doublewrite_files).",
    level: "expert"
  },
  {
    question: "Does the Doublewrite Buffer protect temporary tablespaces (`ibtmp1`)?",
    shortAnswer: "No! Temporary tablespaces do not require crash recovery (they are discarded on restart), so writes to temporary tables bypass the Doublewrite Buffer to maximize query execution speed.",
    explanation: "Avoids unnecessary overhead on ephemeral sort/join data.",
    hint: "No, temporary tables bypass doublewrite buffer because they are discarded on reboot.",
    level: "expert"
  },
  {
    question: "What is the difference between Redo Log durability and Doublewrite Buffer durability?",
    shortAnswer: "- **Redo Log**: Records *what changes* were made so committed transactions can be rolled forward.\n- **Doublewrite Buffer**: Guarantees *the base 16KB page itself* is not physically torn or corrupt on disk.",
    explanation: "Complementary layers: Doublewrite ensures whole valid pages; Redo applies changes to those pages.",
    hint: "Doublewrite ensures whole valid pages; Redo log applies transaction changes to those pages.",
    level: "basic"
  },
  {
    question: "How does `innodb_checksum_algorithm` interact with the Doublewrite Buffer?",
    shortAnswer: "It defines the mathematical algorithm (default: `crc32`, or `innodb`, `none`) used to compute page checksums; CRC32 is accelerated by hardware CPU instructions (SSE4.2) for zero-overhead validation.",
    explanation: "Hardware CRC32 makes page integrity checks virtually instantaneous.",
    hint: "Uses hardware-accelerated CRC32 to validate page headers and detect torn pages.",
    level: "expert"
  },
  {
    question: "What is the typical memory footprint of the Doublewrite Buffer in RAM?",
    shortAnswer: "Extremely small (a few megabytes in the Buffer Pool structure for batching page frames before flushing to disk).",
    explanation: "Primary footprint is on disk (`.dblwr` files), not in RAM.",
    hint: "Minimal RAM footprint (a few megabytes for staging write batches).",
    level: "basic"
  },
  {
    question: "What command in `my.cnf` enables dedicated doublewrite file placement?",
    shortAnswer: "`innodb_doublewrite_dir = /path/to/fast_storage`",
    explanation: "Allows isolating doublewrite files to specific high-speed storage arrays.",
    hint: "innodb_doublewrite_dir = /path/to/dir",
    level: "basic"
  },
  {
    question: "Can an administrator monitor torn page recovery events in the MySQL Error Log?",
    shortAnswer: "Yes! During startup, if InnoDB restores a torn page, it prints a diagnostic message: `[Note] [MY-012920] [InnoDB] Restoring page [page id: space=N, page number=M] from doublewrite buffer`.",
    explanation: "Provides clear proof that the Doublewrite buffer saved the database from corruption.",
    hint: "Logged as 'Restoring page ... from doublewrite buffer' in MySQL error log.",
    level: "basic"
  },
  {
    question: "Why was the Doublewrite Buffer moved out of the `ibdata1` System Tablespace in MySQL 8.0.20?",
    shortAnswer: "To eliminate I/O serialization bottlenecks on `ibdata1`, allowing multiple Page Cleaner threads to write concurrently to separate `.dblwr` files on dedicated disk paths.",
    explanation: "Significantly enhances parallel flushing on modern high-core NVMe database servers.",
    hint: "To eliminate I/O serialization bottlenecks on ibdata1 and enable parallel multi-file writes.",
    level: "expert"
  },
  {
    question: "What is the role of `innodb_doublewrite_batch_size`?",
    shortAnswer: "It defines the number of doublewrite pages to write in a single batch, balancing I/O latency against write throughput during background flushing.",
    explanation: "Fine-tunes write batch size for high-IOPS SSD arrays.",
    hint: "Controls the number of pages written per doublewrite batch.",
    level: "expert"
  },
  {
    question: "What is a 'Silent Data Corruption' vs a 'Torn Page'?",
    shortAnswer: "- **Torn Page**: An incomplete 16KB write caused by sudden power loss mid-write.\n- **Silent Data Corruption (Bit-Rot)**: Subtle degradation of physical storage media (decaying magnetic sectors or NAND cells) over time without OS errors.",
    explanation: "Both are detected by InnoDB CRC32 checksums.",
    hint: "Torn page = interrupted write; Bit-rot = physical storage media decay over time.",
    level: "basic"
  },
  {
    question: "Why should cloud-hosted databases (AWS EBS, GCP Persistent Disk) keep `innodb_doublewrite = ON`?",
    shortAnswer: "Because network-attached block storage devices still write in 4KB/8KB network sector chunks; a sudden compute VM termination during an active flush can leave pages partially written.",
    explanation: "Cloud disks do not provide atomic 16KB write guarantees at the VM block layer.",
    hint: "Cloud block devices write in 4KB chunks; VM termination can still cause torn pages.",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 7 in Module 004_001?",
    shortAnswer: "The Doublewrite Buffer is MySQL's ultimate defense against physical torn pages caused by power failures, guaranteeing base page integrity via contiguous sequential writes so that the Redo Log can successfully roll forward committed data without risk of corruption.",
    explanation: "Essential foundation for building unbreakable, crash-safe enterprise database systems.",
    hint: "Guarantees base page structural integrity to enable flawless Redo Log crash recovery.",
    level: "basic"
  }
];

export default questions;
