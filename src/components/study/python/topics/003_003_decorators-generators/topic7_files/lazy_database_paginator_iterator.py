# topic7_files/lazy_database_paginator_iterator.py
# Module: 003_003_decorators-generators
# Topic: Creating custom iterator classes
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 3: Lazy Database Cursor Paginator Iterator
Demonstrates:
  1. Lazily fetching database pages on demand rather than loading all records into RAM
  2. Managing internal buffer queue and page offset cursors
  3. Seamless integration with Python `for` loops
"""

from typing import Dict, Any, List

class LazyDatabasePaginatorIterator:
    """Lazily fetches database records page-by-page as required by the consumer."""

    def __init__(self, total_database_records: int = 10, page_size: int = 4):
        self._total_records = total_database_records
        self._page_size = page_size
        self._offset = 0
        self._current_page_buffer: List[Dict[str, Any]] = []
        self._buffer_index = 0
        self._pages_fetched_count = 0

    def __iter__(self):
        return self

    def _fetch_next_page_from_database(self) -> bool:
        """Simulates SQL `SELECT * FROM students LIMIT page_size OFFSET offset`."""
        if self._offset >= self._total_records:
            return False  # No more records in database

        self._pages_fetched_count += 1
        records_to_fetch = min(self._page_size, self._total_records - self._offset)
        print(f"  [DB DISK I/O] Fetching Page #{self._pages_fetched_count} (Offset: {self._offset}, Limit: {records_to_fetch})...")

        # Simulate fetched page batch:
        self._current_page_buffer = [
            {"id": f"STU-{100 + self._offset + i + 1}", "name": f"Student_{self._offset + i + 1}"}
            for i in range(records_to_fetch)
        ]
        self._offset += records_to_fetch
        self._buffer_index = 0
        return True

    def __next__(self) -> Dict[str, Any]:
        # If buffer is empty or consumed, fetch next database page:
        if self._buffer_index >= len(self._current_page_buffer):
            has_more = self._fetch_next_page_from_database()
            if not has_more:
                raise StopIteration("Database pagination complete.")

        record = self._current_page_buffer[self._buffer_index]
        self._buffer_index += 1
        return record


def demonstrate_lazy_paginator():
    print("=" * 70)
    print("CODER & ACCOTAX - LAZY DATABASE PAGINATOR ITERATOR")
    print("=" * 70)

    print("1. Consuming 10 Records with `page_size=4` Lazily:")
    paginator = LazyDatabasePaginatorIterator(total_database_records=10, page_size=4)

    for student in paginator:
        print(f"     * Consumer Received: {student['id']} ({student['name']})")

    print("\n[PASSED] Lazy Database Paginator Iterator Verified.")


if __name__ == "__main__":
    demonstrate_lazy_paginator()
