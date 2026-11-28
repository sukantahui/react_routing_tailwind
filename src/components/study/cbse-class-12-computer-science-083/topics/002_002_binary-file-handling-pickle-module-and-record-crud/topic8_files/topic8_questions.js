// 25 Authentic CBSE Board Examination Questions for Topic 8
const questions = [
  {
    "id": 1,
    "question": "How does record deletion operate in a sequential binary file in Python?",
    "options": [
      "By calling f.delete(record_id)",
      "By copying all records to a temporary file EXCEPT the target record to be deleted, then replacing original with temp",
      "By replacing the record bytes with spaces",
      "By setting record = None inside the file"
    ],
    "correctAnswer": 1,
    "explanation": "Files do not support shrinking middle bytes; copying valid records while skipping the target to a temporary file is the standard deletion algorithm.",
    "hint": "Copy valid records and skip target."
  },
  {
    "id": 2,
    "question": "In the temporary file deletion algorithm, what condition decides whether a record is written to `temp.dat`?",
    "options": [
      "if rec['roll'] != target_roll: pickle.dump(rec, fout)",
      "if rec['roll'] == target_roll: pickle.dump(rec, fout)",
      "if rec['marks'] == 0: pickle.dump(rec, fout)",
      "if len(rec) > 0: pickle.dump(rec, fout)"
    ],
    "correctAnswer": 0,
    "explanation": "If `rec['roll'] != target_roll`, the record is preserved; the matching record is simply skipped.",
    "hint": "if not equal to target, write."
  },
  {
    "id": 3,
    "question": "What happens to the targeted record that was skipped during copying to `temp.dat`?",
    "options": [
      "It remains in student.dat until student.dat is deleted via os.remove(), thereby disappearing permanently",
      "It is saved in recycle bin",
      "It is converted to text",
      "It is archived in virtual memory"
    ],
    "correctAnswer": 0,
    "explanation": "Because it was never written to `temp.dat`, deleting the old file and renaming `temp.dat` permanently purges the record.",
    "hint": "Not written to temp, so purged."
  },
  {
    "id": 4,
    "question": "What tracking variable is standard to verify if any record was actually deleted?",
    "options": [
      "A boolean flag: deleted = False (set to True when target is skipped)",
      "An integer file descriptor",
      "A string variable",
      "A float percentage"
    ],
    "correctAnswer": 0,
    "explanation": "The `deleted` flag tracks whether any record was omitted, allowing an appropriate message if the target was missing.",
    "hint": "deleted = False flag."
  },
  {
    "id": 5,
    "question": "What should be done if `deleted == False` after reading all records to EOF?",
    "options": [
      "Delete student.dat anyway",
      "Remove temp.dat and inform user: 'Record not found, deletion aborted'",
      "Raise RuntimeError",
      "Restart computer"
    ],
    "correctAnswer": 1,
    "explanation": "If no matching record was found, deleting the temporary file and leaving the original file intact avoids unnecessary disk rewrites.",
    "hint": "Clean up temp and report not found."
  },
  {
    "id": 6,
    "question": "Which module in the Python standard library provides `remove()` and `rename()`?",
    "options": [
      "sys",
      "os",
      "pickle",
      "pathlib"
    ],
    "correctAnswer": 1,
    "explanation": "The `os` module provides filesystem manipulation functions.",
    "hint": "os module."
  },
  {
    "id": 7,
    "question": "What error occurs on Windows if `os.remove('student.dat')` is called inside the `with` block?",
    "options": [
      "PermissionError: [WinError 32] The process cannot access the file because it is being used by another process",
      "FileNotFoundError",
      "EOFError",
      "ModeError"
    ],
    "correctAnswer": 0,
    "explanation": "Windows locks open files, preventing deletion while active handles exist.",
    "hint": "PermissionError."
  },
  {
    "id": 8,
    "question": "Assertion (A): Deleting a record in binary files cannot be done using `f.seek()` in-place.\nReason (R): Removing bytes from the middle of a disk file requires shifting all subsequent bytes backward to prevent corrupt gaps.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Operating systems do not support middle-file byte deletion without stream shifting.",
    "hint": "Middle byte deletion requires shifting."
  },
  {
    "id": 9,
    "question": "Consider the code:\n```python\nwith open('emp.dat', 'rb') as fin, open('temp.dat', 'wb') as fout:\n    try:\n        while True:\n            rec = pickle.load(fin)\n            if rec['empid'] != 105:\n                pickle.dump(rec, fout)\n    except EOFError:\n        pass\n```\nWhich employee is excluded from `temp.dat`?",
    "options": [
      "Employee with empid 105",
      "All employees except 105",
      "All employees",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Only records where `empid != 105` are dumped; employee 105 is omitted.",
    "hint": "Excluded employee 105."
  },
  {
    "id": 10,
    "question": "What is the final step to commit the deletion to disk?",
    "options": [
      "os.remove('emp.dat'); os.rename('temp.dat', 'emp.dat')",
      "fout.flush() only",
      "fin.close() only",
      "pickle.dump(None, fout)"
    ],
    "correctAnswer": 0,
    "explanation": "Deleting the old database and renaming the temporary file commits the deletion.",
    "hint": "remove original, rename temp."
  },
  {
    "id": 11,
    "question": "In a CBSE 3-mark question: 'Write a function delete_student(roll) to delete student with roll number from student.dat'. What is the weightage of the file renaming step?",
    "options": [
      "1/2 mark to 1 mark",
      "0 marks",
      "Full 3 marks",
      "1/4 mark"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE marking schemes allocate 1/2 to 1 mark for the correct `os.remove` and `os.rename` commands.",
    "hint": "Step marking awards rename."
  },
  {
    "id": 12,
    "question": "How can multiple records matching a condition (e.g. `marks < 33`) be deleted simultaneously?",
    "options": [
      "By checking `if rec['marks'] >= 33: pickle.dump(rec, fout)` (skips all failing students)",
      "By calling os.remove() inside the loop",
      "By calling f.seek(0)",
      "Multiple deletions are impossible"
    ],
    "correctAnswer": 0,
    "explanation": "Only writing records that satisfy `marks >= 33` skips and deletes all failing students in one pass.",
    "hint": "Skip all failing students."
  },
  {
    "id": 13,
    "question": "What happens if a user confirms deletion before execution (e.g. `confirm = input('Are you sure (y/n)?')`)?",
    "options": [
      "Good engineering practice: prevents accidental loss of data",
      "Causes SyntaxError",
      "Slows down execution",
      "Forbidden by CBSE"
    ],
    "correctAnswer": 0,
    "explanation": "Interactive confirmation safeguards against unintentional destructive deletions.",
    "hint": "Safeguard against data loss."
  },
  {
    "id": 14,
    "question": "Consider: `os.path.exists('temp.dat')`. What does this return if `temp.dat` is on disk?",
    "options": [
      "True",
      "False",
      "None",
      "Raises AttributeError"
    ],
    "correctAnswer": 0,
    "explanation": "`os.path.exists()` returns `True` if the file exists.",
    "hint": "True if file exists."
  },
  {
    "id": 15,
    "question": "What error occurs if `os.rename('temp.dat', 'student.dat')` is attempted when `temp.dat` was never created?",
    "options": [
      "FileNotFoundError",
      "FileExistsError",
      "EOFError",
      "KeyError"
    ],
    "correctAnswer": 0,
    "explanation": "Renaming a non-existent source file raises `FileNotFoundError`.",
    "hint": "FileNotFoundError."
  },
  {
    "id": 16,
    "question": "How many times is `student.dat` read during the deletion process?",
    "options": [
      "Exactly once from byte 0 to EOF",
      "Twice",
      "10 times",
      "Depends on number of records"
    ],
    "correctAnswer": 0,
    "explanation": "Linear streaming reads each record exactly once in a single sequential pass.",
    "hint": "Single pass."
  },
  {
    "id": 17,
    "question": "Assertion (A): Deleting records via temporary files maintains consistent O(1) RAM usage.\nReason (R): Records are streamed one-by-one from source to destination without loading the entire database into memory.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Streaming individual records keeps RAM consumption constant regardless of file size.",
    "hint": "Constant O(1) memory footprint."
  },
  {
    "id": 18,
    "question": "What happens if all student records in `student.dat` are deleted?",
    "options": [
      "temp.dat is an empty file (0 bytes), resulting in an empty student.dat after rename",
      "File is corrupted",
      "Raises ZeroDivisionError",
      "Python deletes the directory"
    ],
    "correctAnswer": 0,
    "explanation": "Skipping all records produces an empty 0-byte file, representing a clean empty database.",
    "hint": "Empty 0-byte database."
  },
  {
    "id": 19,
    "question": "Can a deletion function return a count of deleted records?",
    "options": [
      "Yes, by incrementing a deleted_count variable whenever a record is skipped",
      "No, return values are forbidden",
      "Only boolean values",
      "Only byte counts"
    ],
    "correctAnswer": 0,
    "explanation": "Returning `deleted_count` provides useful feedback to the caller.",
    "hint": "Increment and return deleted count."
  },
  {
    "id": 20,
    "question": "In a CBSE exam question: 'Delete all records where department is 'HR''. What is the skipping condition?",
    "options": [
      "if rec['department'].upper() != 'HR': pickle.dump(rec, fout)",
      "if rec['department'] == 'HR': pickle.dump(rec, fout)",
      "if 'HR' in rec: delete()",
      "fout.write(rec - 'HR')"
    ],
    "correctAnswer": 0,
    "explanation": "Dumping only records where department is NOT 'HR' effectively deletes all HR employees.",
    "hint": "Write non-HR records."
  },
  {
    "id": 21,
    "question": "What is the consequence of forgetting `pickle.dump(rec, fout)` inside the `if` branch of the deletion loop?",
    "options": [
      "EVERY record is skipped, resulting in the entire database being emptied!",
      "No consequence",
      "Only one record deleted",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Failing to write valid records causes all data to be lost upon file replacement.",
    "hint": "Catastrophic total data loss."
  },
  {
    "id": 22,
    "question": "Why is `import os` mandatory in binary file deletion scripts?",
    "options": [
      "To access os.remove() and os.rename() functions",
      "To access pickle",
      "To create folders",
      "To speed up CPU"
    ],
    "correctAnswer": 0,
    "explanation": "`os.remove()` and `os.rename()` are defined in the `os` module.",
    "hint": "Provides remove and rename."
  },
  {
    "id": 23,
    "question": "Consider: `fout = open('temp.dat', 'wb')`. Why must mode be 'wb' and not 'ab'?",
    "options": [
      "Because temp.dat should always start fresh and empty for the new clean database",
      "Because 'ab' is forbidden in Python",
      "Because 'wb' is faster",
      "Mode does not matter"
    ],
    "correctAnswer": 0,
    "explanation": "Using `'wb'` ensures any stale leftover data in `temp.dat` is wiped before copying.",
    "hint": "Fresh empty staging file."
  },
  {
    "id": 24,
    "question": "What should be printed if a deletion operation completes successfully?",
    "options": [
      "A clear confirmation: e.g. '[+] Record with Roll 101 successfully deleted.'",
      "Blank line",
      "Dump output",
      "Binary bytes"
    ],
    "correctAnswer": 0,
    "explanation": "Clear confirmation enhances user experience and fulfills CBSE examination output requirements.",
    "hint": "Confirmation message."
  },
  {
    "id": 25,
    "question": "In CBSE Class 12 CS (083) practical syllabus, what program number is Record Deletion?",
    "options": [
      "Program #7 (Delete record from binary file)",
      "Program #1",
      "Program #25",
      "Program #50"
    ],
    "correctAnswer": 0,
    "explanation": "Official CBSE suggested practical list designates Program #7 as binary record deletion.",
    "hint": "Official CBSE Program #7."
  }
];

export default questions;
