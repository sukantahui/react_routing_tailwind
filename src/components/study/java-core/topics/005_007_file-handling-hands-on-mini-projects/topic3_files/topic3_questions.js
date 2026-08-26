const topic3_questions = [
  {
    "question": "How do fixed-width records combined with an in-memory index achieve O(1) instantaneous record lookup in database storage engines?",
    "shortAnswer": "Fixed-width record architecture ensures every record on disk consumes an identical byte length (e.g. 64 bytes). The in-memory index maps each primary key directly to its exact byte offset in the physical file. Calling 'RandomAccessFile.seek(offset)' jumps the disk read head directly to the record location in O(1) time without scanning preceding records.",
    "explanation": "Fundamental architecture behind ISAM (Indexed Sequential Access Method) and relational database storage engines.",
    "hint": "Maps primary keys to exact byte offsets, using seek() to jump straight to the record in O(1) time.",
    "level": "Advanced",
    "codeExample": "raf.seek(primaryIndex.get(id)); raf.readFully(buffer);"
  }
];

export default topic3_questions;