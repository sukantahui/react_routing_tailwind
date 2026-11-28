// 25 Authentic CBSE Board Examination Questions for Topic 11
const questions = [
  {
    "id": 1,
    "question": "What is the primary function used to serialize Python objects into a binary file?",
    "options": [
      "pickle.dump()",
      "pickle.load()",
      "pickle.write()",
      "pickle.save()"
    ],
    "correctAnswer": 0,
    "explanation": "`pickle.dump(obj, f)` writes serialized bytes to the binary file handle.",
    "hint": "pickle.dump."
  },
  {
    "id": 2,
    "question": "What is the primary function used to deserialize Python objects from a binary file?",
    "options": [
      "pickle.load()",
      "pickle.dump()",
      "pickle.read()",
      "pickle.get()"
    ],
    "correctAnswer": 0,
    "explanation": "`pickle.load(f)` reads serialized bytes from the binary file and returns the Python object.",
    "hint": "pickle.load."
  },
  {
    "id": 3,
    "question": "What exception is raised when `pickle.load()` reads past the end of the file?",
    "options": [
      "EOFError",
      "FileNotFoundError",
      "StopIteration",
      "ValueError"
    ],
    "correctAnswer": 0,
    "explanation": "`pickle.load()` raises `EOFError` upon encountering EOF.",
    "hint": "EOFError."
  },
  {
    "id": 4,
    "question": "Which mode must be used to append records to an existing binary file without truncating it?",
    "options": [
      "'ab'",
      "'wb'",
      "'rb'",
      "'w+'"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'ab'` appends new pickled objects to the end of the existing file.",
    "hint": "'ab' mode."
  },
  {
    "id": 5,
    "question": "What does mode `'wb'` do to an existing binary file upon opening?",
    "options": [
      "Truncates it to 0 bytes",
      "Appends records",
      "Preserves it",
      "Raises FileExistsError"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'wb'` empties the file completely, resetting its length to zero.",
    "hint": "Truncates to zero bytes."
  },
  {
    "id": 6,
    "question": "Why is the temporary file pattern preferred for updating binary records?",
    "options": [
      "Because updated records may have different serialized byte lengths than the original records",
      "Because temp files are compressed",
      "Because Python deletes the original file automatically",
      "Because pickle requires two files"
    ],
    "correctAnswer": 0,
    "explanation": "Pickled records have variable byte lengths; staging files prevent adjacent record corruption.",
    "hint": "Handles variable byte lengths."
  },
  {
    "id": 7,
    "question": "What condition in a deletion loop preserves all non-target records in `temp.dat`?",
    "options": [
      "if rec['roll'] != target_roll: pickle.dump(rec, fout)",
      "if rec['roll'] == target_roll: pickle.dump(rec, fout)",
      "if rec['marks'] > 0: pickle.dump(rec, fout)",
      "if len(rec) > 0: pickle.dump(rec, fout)"
    ],
    "correctAnswer": 0,
    "explanation": "Dumping only when `rec['roll'] != target_roll` skips and deletes the target record.",
    "hint": "if not equal to target."
  },
  {
    "id": 8,
    "question": "Which module provides `os.remove()` and `os.rename()`?",
    "options": [
      "os",
      "sys",
      "pickle",
      "shutil"
    ],
    "correctAnswer": 0,
    "explanation": "The `os` module provides filesystem manipulation functions.",
    "hint": "os module."
  },
  {
    "id": 9,
    "question": "What error occurs if `os.remove('file.dat')` is called while `file.dat` is still open on Windows?",
    "options": [
      "PermissionError",
      "FileNotFoundError",
      "KeyError",
      "EOFError"
    ],
    "correctAnswer": 0,
    "explanation": "Windows raises `PermissionError` if an open file is deleted.",
    "hint": "PermissionError."
  },
  {
    "id": 10,
    "question": "What is the purpose of the `found = False` flag in a search function?",
    "options": [
      "To track whether the record was located and report 'Record not found' only after EOF",
      "To stop the loop immediately",
      "To count total records",
      "To delete records"
    ],
    "correctAnswer": 0,
    "explanation": "The `found` flag ensures 'Not found' is printed only once after the entire file is checked.",
    "hint": "Tracks search match."
  },
  {
    "id": 11,
    "question": "When searching by a unique key (like Roll Number), why is `break` executed upon match?",
    "options": [
      "To avoid unnecessary reads once the unique record has been found",
      "To prevent EOFError",
      "To close the file",
      "To delete the record"
    ],
    "correctAnswer": 0,
    "explanation": "`break` halts iteration immediately once the unique primary key is found.",
    "hint": "Halts on unique match."
  },
  {
    "id": 12,
    "question": "What does `f.tell()` return in binary mode?",
    "options": [
      "The current integer byte position in the file",
      "The record index",
      "The file name",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`f.tell()` returns the exact byte offset cursor.",
    "hint": "Current byte position."
  },
  {
    "id": 13,
    "question": "What does `f.seek(0)` do on a binary file?",
    "options": [
      "Rewinds the file pointer to byte 0 (beginning)",
      "Moves to EOF",
      "Deletes the file",
      "Raises SeekError"
    ],
    "correctAnswer": 0,
    "explanation": "`f.seek(0)` repositions the pointer at byte 0.",
    "hint": "Rewinds to start."
  },
  {
    "id": 14,
    "question": "In `f.seek(offset, whence)`, what does `whence = 2` specify?",
    "options": [
      "Reference from the end of the file",
      "Reference from beginning",
      "Reference from current position",
      "Reference from line 2"
    ],
    "correctAnswer": 0,
    "explanation": "`whence = 2` offsets relative to EOF.",
    "hint": "End of file."
  },
  {
    "id": 15,
    "question": "Can `f.seek(-10, 2)` be executed in binary mode ('rb')?",
    "options": [
      "Yes, binary mode allows seeking backwards from EOF",
      "No, negative seeks are forbidden",
      "Only in Python 2",
      "Only on Linux"
    ],
    "correctAnswer": 0,
    "explanation": "Binary mode fully supports negative seeks from EOF.",
    "hint": "Valid in binary mode."
  },
  {
    "id": 16,
    "question": "What data type is returned when reading from a binary file using `f.read(5)`?",
    "options": [
      "bytes",
      "str",
      "int",
      "list"
    ],
    "correctAnswer": 0,
    "explanation": "Binary file reads return `bytes` objects.",
    "hint": "bytes object."
  },
  {
    "id": 17,
    "question": "What does `pickle.dumps(obj)` return?",
    "options": [
      "A bytes object representing the serialized obj",
      "A string",
      "None",
      "True"
    ],
    "correctAnswer": 0,
    "explanation": "`pickle.dumps()` serializes in-memory and returns `bytes`.",
    "hint": "Returns bytes object."
  },
  {
    "id": 18,
    "question": "What does `pickle.loads(bytes_data)` do?",
    "options": [
      "Deserializes bytes_data into a live Python object",
      "Writes to file",
      "Deletes bytes",
      "Returns hex string"
    ],
    "correctAnswer": 0,
    "explanation": "`pickle.loads()` reconstructs the original Python object from bytes.",
    "hint": "Deserializes bytes to object."
  },
  {
    "id": 19,
    "question": "What happens if you open an existing file in `'rb+'` mode?",
    "options": [
      "Opens for reading and writing without truncation; pointer at byte 0",
      "Wipes file to 0 bytes",
      "Raises FileNotFoundError always",
      "Pointer starts at end"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'rb+'` allows read/write on an existing file without wiping data.",
    "hint": "Preserves file content."
  },
  {
    "id": 20,
    "question": "What happens if you open a non-existent file in `'rb+'` mode?",
    "options": [
      "Raises FileNotFoundError",
      "Creates the file",
      "Opens in 'wb' mode",
      "Returns False"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'rb+'` requires the file to exist; if missing, it raises `FileNotFoundError`.",
    "hint": "FileNotFoundError if missing."
  },
  {
    "id": 21,
    "question": "Consider: `f = open('scores.dat', 'wb')`. What does `f.writable()` return?",
    "options": [
      "True",
      "False",
      "None",
      "Raises AttributeError"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'wb'` is writable, so `f.writable()` evaluates to `True`.",
    "hint": "True for write mode."
  },
  {
    "id": 22,
    "question": "Consider: `f = open('scores.dat', 'rb')`. What does `f.writable()` return?",
    "options": [
      "False",
      "True",
      "None",
      "Raises AttributeError"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'rb'` is read-only, so `f.writable()` evaluates to `False`.",
    "hint": "False for read mode."
  },
  {
    "id": 23,
    "question": "In a student database, how can you display students scoring marks between 90 and 100?",
    "options": [
      "if 90 <= rec['marks'] <= 100: print(rec)",
      "if rec['marks'] between 90 and 100: print(rec)",
      "if rec['marks'] in (90, 100): print(rec)",
      "if rec['marks'] = 90: print(rec)"
    ],
    "correctAnswer": 0,
    "explanation": "Chained comparison `90 <= rec['marks'] <= 100` tests the range.",
    "hint": "Chained comparison."
  },
  {
    "id": 24,
    "question": "What is the return value of `pickle.dump(rec, f)`?",
    "options": [
      "None",
      "Boolean True",
      "Number of bytes written",
      "The record object"
    ],
    "correctAnswer": 0,
    "explanation": "`pickle.dump()` writes to the stream and returns `None`.",
    "hint": "Returns None."
  },
  {
    "id": 25,
    "question": "What is the primary architectural advantage of binary files over text files?",
    "options": [
      "Direct memory byte image storage with zero character encoding/decoding and zero EOL translation overhead",
      "They open in Microsoft Word",
      "They are smaller in font size",
      "They use commas"
    ],
    "correctAnswer": 0,
    "explanation": "Binary files mirror memory bytes directly without conversion overhead.",
    "hint": "Direct byte image without conversion."
  }
];

export default questions;
