// 25 Authentic CBSE Board Examination Questions for Topic 7
const questions = [
  {
    "id": 1,
    "question": "Why is updating a record in a binary file more challenging than simply appending a new record?",
    "options": [
      "Because the updated record may have a different serialized byte length than the original record",
      "Because binary files cannot be opened in write mode",
      "Because Python deletes the file automatically",
      "Because pickle cannot overwrite integers"
    ],
    "correctAnswer": 0,
    "explanation": "If the new pickled record has more or fewer bytes than the original, in-place overwriting corrupts adjacent records or leaves trailing garbage bytes.",
    "hint": "Variable serialized byte lengths."
  },
  {
    "id": 2,
    "question": "What is the industry and CBSE recommended safest mechanism to update records in a binary file?",
    "options": [
      "The Temporary File Staging Pattern: read from source, write modified/unmodified records to temp.dat, then remove and rename",
      "Rebooting the computer",
      "Using mode 'w'",
      "Calling f.update()"
    ],
    "correctAnswer": 0,
    "explanation": "Using a staging temporary file (`temp.dat`) guarantees 100% data integrity and handles arbitrary size changes safely.",
    "hint": "Temporary file staging pattern."
  },
  {
    "id": 3,
    "question": "Which Python standard library module provides `os.remove()` and `os.rename()` for the temporary file update pattern?",
    "options": [
      "sys",
      "os",
      "pickle",
      "shutil"
    ],
    "correctAnswer": 1,
    "explanation": "The `os` module provides operating system filesystem primitives `os.remove()` and `os.rename()`.",
    "hint": "os module."
  },
  {
    "id": 4,
    "question": "In the temporary file update pattern, what must be done BEFORE calling `os.remove('student.dat')` and `os.rename('temp.dat', 'student.dat')`?",
    "options": [
      "Both source and destination file handles must be formally closed (f.close() or exit with block)",
      "The computer must be restarted",
      "f.seek(0) must be called",
      "The file must be unpickled"
    ],
    "correctAnswer": 0,
    "explanation": "On Windows, attempting to remove or rename an open file raises `PermissionError: [WinError 32] The process cannot access the file because it is being used by another process`.",
    "hint": "Files must be closed first."
  },
  {
    "id": 5,
    "question": "Consider updating a student's marks in-place using mode `'rb+'`. How is the file pointer positioned back to the start of the matching record?",
    "options": [
      "By saving the byte position via `pos = f.tell()` before reading the record, then calling `f.seek(pos)` upon match",
      "Calling f.seek(0)",
      "Calling f.seek(-1)",
      "Using f.rewind()"
    ],
    "correctAnswer": 0,
    "explanation": "Recording `pos = f.tell()` prior to `pickle.load(f)` captures the exact starting byte offset of that record.",
    "hint": "Save pos = f.tell() before load."
  },
  {
    "id": 6,
    "question": "What danger exists when doing in-place update with `'rb+'` if the updated record produces more bytes than the original?",
    "options": [
      "The new bytes overwrite and corrupt the header bytes of the subsequent student record!",
      "The file doubles in size",
      "Python refuses to run",
      "No danger exists"
    ],
    "correctAnswer": 0,
    "explanation": "Overwriting in-place with a larger byte stream writes over the beginning bytes of the next record, ruining it.",
    "hint": "Overwrites next record."
  },
  {
    "id": 7,
    "question": "Why does the temporary file update pattern completely eliminate the byte-length corruption risk?",
    "options": [
      "Because records are sequentially rewritten from scratch into a fresh file stream",
      "Because temp files are compressed",
      "Because temp files ignore pickle",
      "Because temp files have infinite size"
    ],
    "correctAnswer": 0,
    "explanation": "Each record is cleanly serialized into a brand new stream, regardless of whether it grew or shrank.",
    "hint": "Clean sequential rewrite."
  },
  {
    "id": 8,
    "question": "Assertion (A): The temporary file update pattern is the standard accepted solution in CBSE Class 12 board examinations.\nReason (R): It is simple, universally robust, and does not depend on fixed record byte lengths.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE marking schemes consistently award full marks for the clean temporary file replacement pattern.",
    "hint": "Standard board solution."
  },
  {
    "id": 9,
    "question": "Consider the code:\n```python\nwith open('stud.dat', 'rb') as fin, open('temp.dat', 'wb') as fout:\n    try:\n        while True:\n            rec = pickle.load(fin)\n            if rec['roll'] == 101:\n                rec['marks'] = 98.5\n            pickle.dump(rec, fout)\n    except EOFError:\n        pass\n```\nWhat does `temp.dat` contain after this loop?",
    "options": [
      "All records from stud.dat, with roll 101 updated to 98.5 marks",
      "Only roll 101",
      "Empty file",
      "Only un-updated records"
    ],
    "correctAnswer": 0,
    "explanation": "Every record is dumped to `temp.dat`; for roll 101 the marks are modified before dumping.",
    "hint": "All records copied with update."
  },
  {
    "id": 10,
    "question": "In the temporary file update pattern, what happens if the target record to update is NOT found in the database?",
    "options": [
      "temp.dat contains identical records to original; original is safely replaced without changes",
      "Raises FileNotFoundError",
      "Original file is deleted without replacement",
      "Crashes Python"
    ],
    "correctAnswer": 0,
    "explanation": "If no match occurs, `temp.dat` is an exact clone of the original file; reporting 'Record not found' alerts the user.",
    "hint": "Safe clone if not found."
  },
  {
    "id": 11,
    "question": "What should be done with `temp.dat` if `fin` could not be opened because `student.dat` was missing?",
    "options": [
      "Never create temp.dat if student.dat is missing",
      "Rename temp.dat anyway",
      "Delete the disk",
      "Ignore"
    ],
    "correctAnswer": 0,
    "explanation": "Verify `os.path.exists('student.dat')` before creating the temporary file.",
    "hint": "Verify existence first."
  },
  {
    "id": 12,
    "question": "What does `os.remove('student.dat')` do?",
    "options": [
      "Deletes student.dat from disk",
      "Clears RAM memory",
      "Closes the file handle",
      "Renames the file"
    ],
    "correctAnswer": 0,
    "explanation": "`os.remove()` deletes the specified file from secondary storage.",
    "hint": "Deletes file."
  },
  {
    "id": 13,
    "question": "What does `os.rename('temp.dat', 'student.dat')` do?",
    "options": [
      "Renames temp.dat to student.dat",
      "Creates a copy",
      "Deletes temp.dat",
      "Opens the file in editor"
    ],
    "correctAnswer": 0,
    "explanation": "`os.rename(src, dst)` changes the name of `temp.dat` to `student.dat`.",
    "hint": "Renames file."
  },
  {
    "id": 14,
    "question": "What exception is raised if `os.rename('temp.dat', 'student.dat')` is called while `student.dat` still exists on Windows?",
    "options": [
      "FileExistsError",
      "ValueError",
      "KeyError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "On Windows, `os.rename()` fails if destination already exists; calling `os.remove(dst)` first or using `os.replace()` resolves this.",
    "hint": "Must remove destination first on Windows."
  },
  {
    "id": 15,
    "question": "Which function in Python 3.3+ performs an atomic rename, overwriting the destination file if it exists without needing explicit `os.remove()`?",
    "options": [
      "os.replace('temp.dat', 'student.dat')",
      "os.swap()",
      "os.overwrite()",
      "os.move_force()"
    ],
    "correctAnswer": 0,
    "explanation": "`os.replace(src, dst)` atomically renames `src` to `dst`, overwriting `dst` cross-platform.",
    "hint": "os.replace atomic rename."
  },
  {
    "id": 16,
    "question": "Consider: `f = open('data.dat', 'rb+')`. How do you update the marks of student 101 in-place?",
    "options": [
      "pos = f.tell(); rec = pickle.load(f); if rec['roll'] == 101: rec['marks'] = 99; f.seek(pos); pickle.dump(rec, f)",
      "pickle.dump(rec, f)",
      "f.write(99)",
      "f.update(101, 99)"
    ],
    "correctAnswer": 0,
    "explanation": "Recording `pos = f.tell()`, then rewinding `f.seek(pos)` and dumping updates the record in-place.",
    "hint": "pos = tell, seek(pos), dump."
  },
  {
    "id": 17,
    "question": "In a CBSE 3-mark practical question: 'Write a function update_marks(roll, new_marks) to update marks in student.dat'. How many marks are awarded for correctly rewriting the file?",
    "options": [
      "1 mark",
      "0 marks",
      "Full 3 marks",
      "1/2 mark"
    ],
    "correctAnswer": 0,
    "explanation": "The file update logic (temporary file or in-place seek) carries 1 full mark in the marking rubric.",
    "hint": "Update logic carries 1 mark."
  },
  {
    "id": 18,
    "question": "Why is `with open(...) as fin, open(...) as fout:` especially helpful during updates?",
    "options": [
      "It opens both the source and temporary files simultaneously and guarantees both are closed upon block exit",
      "It merges the files automatically",
      "It converts files to JSON",
      "It encrypts the records"
    ],
    "correctAnswer": 0,
    "explanation": "Dual context managers guarantee that both handles are released before any `os.remove` or `os.rename` calls.",
    "hint": "Guarantees both closed."
  },
  {
    "id": 19,
    "question": "What happens if a program crashes in the middle of writing `temp.dat` during an update?",
    "options": [
      "The original file student.dat remains completely untouched and safe!",
      "Both files are destroyed",
      "The computer halts",
      "RAM is erased"
    ],
    "correctAnswer": 0,
    "explanation": "Because `student.dat` is not touched until `temp.dat` is complete, crashes never corrupt the original database.",
    "hint": "Original remains safe."
  },
  {
    "id": 20,
    "question": "Assertion (A): In-place updating with `'rb+'` is only 100% safe when the updated record byte length is identical to the original.\nReason (R): Any difference in serialized byte count causes truncation gaps or adjacent record corruption.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "In-place overwriting requires identical byte counts; otherwise staging files must be used.",
    "hint": "Exact byte match required for in-place."
  },
  {
    "id": 21,
    "question": "Consider: `rec['marks'] += 5`. What does this line do?",
    "options": [
      "Increments student's existing marks by 5 (e.g. grace marks)",
      "Sets marks to 5",
      "Deletes marks",
      "Raises TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "In-place addition `+=` adds 5 to the current value of `marks`.",
    "hint": "Increment by 5."
  },
  {
    "id": 22,
    "question": "What message should be displayed if the user requests an update for a non-existent roll number?",
    "options": [
      "'Record Not Found! No updates made.'",
      "Raise ZeroDivisionError",
      "Create dummy student",
      "No message needed"
    ],
    "correctAnswer": 0,
    "explanation": "Clear feedback informs the user that the requested key was not present in the database.",
    "hint": "Not found feedback."
  },
  {
    "id": 23,
    "question": "Can a student's name be updated along with marks?",
    "options": [
      "Yes, any dictionary field can be modified before dumping to the temporary file",
      "No, names are permanent",
      "Only numbers can be updated",
      "Only roll numbers"
    ],
    "correctAnswer": 0,
    "explanation": "Any key in the dictionary record can be updated before serialization.",
    "hint": "Any dictionary key."
  },
  {
    "id": 24,
    "question": "What is the return value of `os.remove('file.dat')`?",
    "options": [
      "None",
      "Boolean True",
      "0",
      "Deleted file size"
    ],
    "correctAnswer": 0,
    "explanation": "`os.remove()` returns `None` upon successful deletion.",
    "hint": "Returns None."
  },
  {
    "id": 25,
    "question": "In CBSE board examinations, which algorithm guarantees maximum marks for file update questions?",
    "options": [
      "The Temporary File Staging Pattern (temp.dat + os.remove + os.rename)",
      "Direct string slicing",
      "Deleting the file and re-entering from keyboard",
      "Using SQL inside Python"
    ],
    "correctAnswer": 0,
    "explanation": "The temporary file staging pattern is universally recognized and awarded maximum marks by CBSE evaluators.",
    "hint": "Temporary file staging pattern."
  }
];

export default questions;
