// topic0_files/topic0_questions.js

const questions = [
  {
    question: "Why is a university library system normalized into separate `books` and `book_items` tables?",
    shortAnswer: "To separate logical title metadata (ISBN, title, category) from individual physical book copies (barcodes, shelf locations, wear-and-tear condition).",
    explanation: "Allows having multiple physical copies of the same book without duplicating title metadata.",
    hint: "Separates logical title metadata from physical individual copy instances.",
    level: "basic"
  },
  {
    question: "What type of relationship exists between `books` and `authors` in a library database?",
    shortAnswer: "A Many-to-Many ($M:N$) relationship, resolved via a bridge junction table `book_authors`.",
    explanation: "A book can have multiple co-authors, and an author can write multiple books.",
    hint: "Many-to-Many (M:N) resolved via book_authors junction table.",
    level: "basic"
  },
  {
    question: "What is the primary key of the `book_authors` junction table?",
    shortAnswer: "A Composite Primary Key consisting of `(book_id, author_id)`.",
    explanation: "Ensures that the same author cannot be linked to the same book multiple times.",
    hint: "Composite Primary Key: (book_id, author_id).",
    level: "basic"
  },
  {
    question: "How do you calculate overdue days in MySQL for unreturned library books?",
    shortAnswer: "`DATEDIFF(CURRENT_DATE, l.due_date)` where `l.return_date IS NULL AND l.due_date < CURRENT_DATE`.",
    explanation: "DATEDIFF calculates the day difference between today and the scheduled due date.",
    hint: "DATEDIFF(CURRENT_DATE, due_date)",
    level: "basic"
  },
  {
    question: "How do you calculate overdue fine amounts dynamically at ₹5.00 per day in SQL?",
    shortAnswer: "`(DATEDIFF(CURRENT_DATE, l.due_date) * 5.00) AS pending_fine_inr`",
    explanation: "Multiplies overdue day count by daily fine rate.",
    hint: "DATEDIFF(CURRENT_DATE, due_date) * 5.00",
    level: "basic"
  },
  {
    question: "Which aggregate function consolidates multiple authors for a book into a single comma-separated string?",
    shortAnswer: "`GROUP_CONCAT(a.author_name ORDER BY a.author_name SEPARATOR ', ')`",
    explanation: "GROUP_CONCAT combines string values from multiple grouped rows into one.",
    hint: "GROUP_CONCAT(author_name SEPARATOR ', ')",
    level: "moderate"
  },
  {
    question: "What constraint prevents a member from borrowing a book if their account status is 'SUSPENDED' or 'EXPIRED'?",
    shortAnswer: "An application-level validation or a database `BEFORE INSERT` trigger on `loans` checking `m.status = 'ACTIVE'`.",
    explanation: "Triggers or check constraints enforce membership borrowing eligibility.",
    hint: "Enforced via trigger or application check on member status.",
    level: "moderate"
  },
  {
    question: "What foreign key `ON DELETE` rule should be set between `publishers` and `books`?",
    shortAnswer: "`ON DELETE RESTRICT` (or `NO ACTION`) to prevent deleting a publisher when existing books reference it in the catalog.",
    explanation: "Prevents orphaned book records.",
    hint: "ON DELETE RESTRICT to prevent deleting publishers with active books.",
    level: "moderate"
  },
  {
    question: "Why should `loans.barcode_id` reference `book_items.barcode_id` instead of `books.book_id`?",
    shortAnswer: "Because a student borrows a specific physical copy with a barcode, allowing tracking of which exact copy was loaned, returned, or damaged.",
    explanation: "Circulation happens at the physical item copy level, not the abstract title level.",
    hint: "Loans track specific physical copies identified by barcode.",
    level: "basic"
  },
  {
    question: "How do you automatically decrement `books.available_copies` when a new loan is issued?",
    shortAnswer: "Attach an `AFTER INSERT ON loans` trigger that updates `books.available_copies = available_copies - 1` for the loaned book.",
    explanation: "Maintains real-time inventory counts automatically.",
    hint: "Use an AFTER INSERT trigger on the loans table.",
    level: "expert"
  },
  {
    question: "How do you automatically increment `books.available_copies` when a book is returned?",
    shortAnswer: "Attach an `AFTER UPDATE ON loans` trigger that fires when `NEW.return_date IS NOT NULL` to increment `available_copies`.",
    explanation: "Restores available copy inventory upon return.",
    hint: "Use an AFTER UPDATE trigger on the loans table.",
    level: "expert"
  },
  {
    question: "What composite index should be created on `loans` to accelerate member active borrowing queries?",
    shortAnswer: "`CREATE INDEX idx_loans_member_status ON loans (member_id, loan_status);`",
    explanation: "Allows sub-millisecond lookups for a student's currently active loans.",
    hint: "INDEX (member_id, loan_status)",
    level: "moderate"
  },
  {
    question: "What composite index accelerates daily overdue loan reporting in the library?",
    shortAnswer: "`CREATE INDEX idx_loans_due_return ON loans (due_date, return_date);`",
    explanation: "Enables fast range filtering on unreturned books past their due dates.",
    hint: "INDEX (due_date, return_date)",
    level: "moderate"
  },
  {
    question: "How do you prevent a student from borrowing more than their permitted quota (`max_books_allowed = 3`)?",
    shortAnswer: "In a `BEFORE INSERT ON loans` trigger, check `(SELECT COUNT(*) FROM loans WHERE member_id = NEW.member_id AND return_date IS NULL) < max_books_allowed`; raise Error 45000 if violated.",
    explanation: "Enforces quota limits at the database transaction layer.",
    hint: "Trigger checks active loan count against member's max_books_allowed.",
    level: "expert"
  },
  {
    question: "What index type should be placed on `books.isbn_13`?",
    shortAnswer: "`UNIQUE INDEX` (or `UNIQUE` constraint).",
    explanation: "ISBN numbers are globally unique identifiers for published book editions.",
    hint: "UNIQUE B-Tree index.",
    level: "basic"
  },
  {
    question: "What index type should be created on `(books.title, books.category)` to allow natural language catalog searches?",
    shortAnswer: "`FULLTEXT INDEX` (Inverted Index).",
    explanation: "Enables multi-word title and category searching with `MATCH() AGAINST()`.",
    hint: "FULLTEXT inverted index.",
    level: "basic"
  },
  {
    question: "How do you write a query to find the top 5 most frequently borrowed books?",
    shortAnswer: "Join `loans` → `book_items` → `books`, `GROUP BY b.book_id`, `ORDER BY COUNT(l.loan_id) DESC LIMIT 5;`",
    explanation: "Aggregates loan counts per book title.",
    hint: "GROUP BY book_id ORDER BY COUNT(loan_id) DESC LIMIT 5.",
    level: "moderate"
  },
  {
    question: "How do you find all library members who currently have zero active loans?",
    shortAnswer: "Use a `LEFT JOIN loans l ON m.member_id = l.member_id AND l.return_date IS NULL WHERE l.loan_id IS NULL;` (or `NOT EXISTS`).",
    explanation: "Classic anti-join identifying members with no outstanding borrowings.",
    hint: "LEFT JOIN with WHERE loan_id IS NULL or NOT EXISTS.",
    level: "moderate"
  },
  {
    question: "What is the purpose of the `fines` table in library schema design?",
    shortAnswer: "To store financial audit records of assessed penalties, payment statuses (`UNPAID`, `PAID`, `WAIVED`), receipt timestamps, and transaction IDs.",
    explanation: "Separates circulation event logs from financial accounting ledgers.",
    hint: "Maintains financial audit trails of assessed and collected penalties.",
    level: "basic"
  },
  {
    question: "Why should `fines.loan_id` have a `UNIQUE` constraint?",
    shortAnswer: "To enforce a 1-to-1 relationship between a loan instance and its fine ledger record, preventing duplicate penalty assessments on the same loan.",
    explanation: "Ensures one fine record per overdue loan.",
    hint: "Prevents duplicate fine records for the same loan instance.",
    level: "moderate"
  },
  {
    question: "How do you find the total unpaid fines accumulated across all members in the Barrackpore campus library?",
    shortAnswer: "`SELECT SUM(f.fine_amount_inr) FROM fines f JOIN loans l ON f.loan_id = l.loan_id JOIN members m ON l.member_id = m.member_id WHERE f.payment_status = 'UNPAID';`",
    explanation: "Aggregates outstanding penalty liabilities.",
    hint: "SUM(fine_amount_inr) WHERE payment_status = 'UNPAID'.",
    level: "basic"
  },
  {
    question: "How do you handle book loss when a student reports a borrowed physical item lost?",
    shortAnswer: "Update `book_items.item_status = 'LOST'`, mark `loans.loan_status = 'RETURNED'` (or 'LOST'), decrement `books.total_copies`, and generate a replacement fee in `fines`.",
    explanation: "Maintains physical inventory accuracy and assesses replacement costs.",
    hint: "Update item_status = 'LOST', adjust total_copies, and charge replacement fee.",
    level: "expert"
  },
  {
    question: "What database view would you create for library circulation staff at the front desk?",
    shortAnswer: "`CREATE VIEW view_active_loans AS SELECT ... FROM loans JOIN members JOIN book_items JOIN books WHERE return_date IS NULL;`",
    explanation: "Abstracts multi-table joins for fast front-desk circulation lookups.",
    hint: "A view encapsulating loans, members, and book details for unreturned books.",
    level: "basic"
  },
  {
    question: "How do you rank book categories by total borrowing volume using window functions?",
    shortAnswer: "`DENSE_RANK() OVER (ORDER BY COUNT(l.loan_id) DESC) AS category_rank` grouped by category.",
    explanation: "Ranks categories without gaps in rank numbers.",
    hint: "DENSE_RANK() OVER (ORDER BY COUNT(loan_id) DESC)",
    level: "expert"
  },
  {
    question: "How do you ensure a student cannot return a book with a `return_date` prior to the `issue_date`?",
    shortAnswer: "Add a table-level check constraint: `CHECK (return_date >= issue_date OR return_date IS NULL)`.",
    explanation: "Enforces logical chronological consistency on loan timestamps.",
    hint: "CHECK (return_date >= issue_date OR return_date IS NULL)",
    level: "moderate"
  },
  {
    question: "What storage engine is recommended for the University Central Library database?",
    shortAnswer: "`InnoDB` (provides ACID transactions, row-level locking during book checkouts, and foreign key integrity).",
    explanation: "ACID compliance prevents race conditions when multiple students attempt to borrow the last available copy.",
    hint: "InnoDB for ACID transactional reliability.",
    level: "basic"
  },
  {
    question: "How does a transaction protect book checkout concurrency when only 1 copy is available?",
    shortAnswer: "Execute `SELECT available_copies FROM books WHERE book_id = 45 FOR UPDATE;` inside a transaction to lock the row until the checkout insert completes.",
    explanation: "Pessimistic locking (`FOR UPDATE`) eliminates double-booking race conditions.",
    hint: "Use SELECT ... FOR UPDATE inside a transaction to lock the row.",
    level: "expert"
  },
  {
    question: "How do student borrowings for Mamata, Susmita, Abhronila, and Debangshu demonstrate multi-table relational joins?",
    shortAnswer: "By joining `members` to `loans` (1:N), `loans` to `book_items` (N:1), `book_items` to `books` (N:1), and `books` to `authors` (N:M) to deliver a 360-degree student borrowing profile.",
    explanation: "Demonstrates complete end-to-end relational traversal across 5 tables.",
    hint: "Joins members, loans, book items, books, and authors across the relational schema.",
    level: "basic"
  },
  {
    question: "What query identifies members with more than ₹500 in unpaid fines to restrict exam admit cards?",
    shortAnswer: "`SELECT m.member_code, m.first_name, m.last_name, SUM(f.fine_amount_inr) AS total_fine FROM members m JOIN loans l ON m.member_id = l.member_id JOIN fines f ON l.loan_id = f.loan_id WHERE f.payment_status = 'UNPAID' GROUP BY m.member_id HAVING total_fine > 500.00;`",
    explanation: "Uses GROUP BY with HAVING to filter aggregated penalty sums.",
    hint: "GROUP BY member_id HAVING SUM(fine_amount_inr) > 500.00",
    level: "moderate"
  },
  {
    question: "What is the key takeaway from the University Library Management System schema design project?",
    shortAnswer: "Separating logical book metadata from physical copy items, using a junction table for co-authors, and indexing loan status/due dates ensures a 3NF normalized, high-performance circulation engine.",
    explanation: "Foundational schema modeling principles applied to a real-world enterprise domain.",
    hint: "3NF normalization + physical copy separation + loan status indexing.",
    level: "expert"
  }
];

export default questions;
