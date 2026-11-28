export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: Binary Modes, Pickle Module & dump() / load() Basics",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which Python standard library module is required to read and write complex Python objects to a binary file?\n(a) binary\n(b) pickle\n(c) serial\n(d) struct",
            "solution": "(b) pickle. The pickle module implements binary protocols for serializing and deserializing a Python object structure.",
            "markingScheme": "1 Mark for (b) pickle."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the difference between dump() and load() functions in the pickle module?",
            "solution": "dump(data, file) writes (serializes) a Python object to an open binary file. load(file) reads (deserializes) a Python object from an open binary file.",
            "markingScheme": "1 Mark (0.5 for dump writes/serializes, 0.5 for load reads/deserializes)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which exception is raised when load() attempts to read past the end of a binary file?\n(a) FileNotFoundError\n(b) ValueError\n(c) EOFError\n(d) StopIteration",
            "solution": "(c) EOFError. When unpickling reaches the end of file, pickle.load() raises EOFError.",
            "markingScheme": "1 Mark for (c) EOFError."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether binary files undergo any automatic line-break conversions like '\\r\\n' to '\\n'.",
            "solution": "No. Binary files store raw bytes with zero character encoding translation or newline conversion.",
            "markingScheme": "1 Mark for No (stores raw bytes without conversion)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Identify errors in the following code and write the corrected version:\nimport pickle\ndata = {'rno': 1, 'name': 'Aarav'}\nf = open('student.dat', 'w')\npickle.dump(f, data)\nf.close()",
            "solution": "Errors:\n1. File mode must be binary ('wb'), not 'w'.\n2. The parameter order for pickle.dump is (data, file), not (file, data).\nCorrected Code:\nf = open('student.dat', 'wb')\npickle.dump(data, f)\nf.close()",
            "markingScheme": "1 Mark for 'wb' mode correction, 1 Mark for pickle.dump(data, f) parameter order."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why can't binary files be viewed cleanly using a regular text editor like Notepad?",
            "solution": "Binary files contain arbitrary byte streams, headers, and protocol markers that do not map to printable ASCII/Unicode characters, rendering them as unreadable gibberish in text editors.",
            "markingScheme": "1 Mark for non-printable raw byte sequences, 1 Mark for lack of character encoding."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write the standard loop construct using try-except to read all objects from a binary file until EOF.",
            "solution": "import pickle\n\nwith open('records.dat', 'rb') as f:\n    try:\n        while True:\n            rec = pickle.load(f)\n            print(rec)\n    except EOFError:\n        pass # End of file reached safely",
            "markingScheme": "1 Mark for while True loop with pickle.load(f), 1.5 Marks for try-except EOFError handling, 0.5 Mark for 'rb' mode."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function append_student(rec) that appends a dictionary rec to a binary file 'students.dat'.",
            "solution": "import pickle\n\ndef append_student(rec):\n    with open('students.dat', 'ab') as f:\n        pickle.dump(rec, f)",
            "markingScheme": "1.5 Marks for 'ab' mode, 1.5 Marks for pickle.dump(rec, f)."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A binary file 'inventory.dat' stores items where each record is a list [item_id, item_name, quantity, price]. Write a complete Python program with two functions:\n1. add_items(): Inputs items from user until they choose to stop, dumping each record into 'inventory.dat'.\n2. display_low_stock(threshold): Reads all records and displays those whose quantity is strictly less than threshold.",
            "solution": "import pickle\n\ndef add_items():\n    with open('inventory.dat', 'ab') as f:\n        while True:\n            iid = int(input('Enter Item ID: '))\n            name = input('Enter Item Name: ')\n            qty = int(input('Enter Quantity: '))\n            price = float(input('Enter Price: '))\n            pickle.dump([iid, name, qty, price], f)\n            more = input('Add more items? (y/n): ').lower()\n            if more != 'y':\n                break\n\ndef display_low_stock(threshold):\n    print(f'=== ITEMS WITH QUANTITY < {threshold} ===')\n    found = False\n    with open('inventory.dat', 'rb') as f:\n        try:\n            while True:\n                rec = pickle.load(f)\n                if rec[2] < threshold:\n                    print(f'ID: {rec[0]} | Name: {rec[1]} | Qty: {rec[2]} | Price: {rec[3]}')\n                    found = True\n        except EOFError:\n            pass\n    if not found:\n        print('No items below threshold.')",
            "markingScheme": "2.5 Marks for add_items() loop & 'ab' pickle.dump, 2.5 Marks for display_low_stock() EOFError loop & condition check, 1 Mark for clean display formatting."
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Record Searching & Filtering in Binary Files",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which mode should be used to append records to an existing binary file without overwriting previous data?\n(a) 'wb'\n(b) 'ab'\n(c) 'rb+'\n(d) 'w+'",
            "solution": "(b) 'ab'. Append binary mode positions the file pointer at the end of the file.",
            "markingScheme": "1 Mark for (b) 'ab'."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is unpickling in Python?",
            "solution": "Unpickling is the inverse process of pickling, where a byte stream from a binary file is converted back into an active Python object hierarchy in memory.",
            "markingScheme": "1 Mark for converting byte stream back to Python object hierarchy."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "True or False: A binary file can store heterogeneous Python data types like dictionaries, lists, and tuples in the same file.",
            "solution": "True. Each pickle.dump() serializes whatever Python object is passed.",
            "markingScheme": "1 Mark for True."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What happens if you open an existing binary file in 'wb' mode?",
            "solution": "The existing file is truncated to 0 bytes and all previous data is deleted.",
            "markingScheme": "1 Mark for truncation to 0 bytes / deletion of old data."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output of the code below:\nimport pickle\nwith open('test.dat', 'wb') as f:\n    pickle.dump([10, 20], f)\n    pickle.dump([30, 40], f)\nwith open('test.dat', 'rb') as f:\n    r1 = pickle.load(f)\n    print(r1[0] + r1[1])",
            "solution": "The first pickle.load(f) reads the first list [10, 20].\nr1[0] + r1[1] = 10 + 20 = 30.\nOutput:\n30",
            "markingScheme": "1 Mark for identifying first list [10, 20], 1 Mark for sum 30."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why is a while True loop inside a try-except EOFError block necessary when reading multiple records using pickle.load()?",
            "solution": "pickle.load() unpickles exactly one object per call. Since binary files do not have a built-in count of objects, looping until EOFError is the standard and robust way to consume all pickled objects.",
            "markingScheme": "1 Mark for one object per call, 1 Mark for EOFError signal."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function search_employee(emp_id) in Python to search for an employee in 'emp.dat' where records are dictionaries {'eid': int, 'name': str, 'salary': float}. Display details if found, else print 'Employee not found'.",
            "solution": "import pickle\n\ndef search_employee(emp_id):\n    found = False\n    with open('emp.dat', 'rb') as f:\n        try:\n            while True:\n                emp = pickle.load(f)\n                if emp['eid'] == emp_id:\n                    print(f\"Found: Name: {emp['name']}, Salary: {emp['salary']}\")\n                    found = True\n                    break\n        except EOFError:\n            pass\n    if not found:\n        print('Employee not found')",
            "markingScheme": "1 Mark for file opening and try-except EOFError, 1.5 Marks for matching emp['eid'], 0.5 Mark for not found message."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function count_books(author_name) to count how many books by the specified author exist in 'books.dat' where each record is a dictionary {'bno': int, 'title': str, 'author': str, 'price': float}.",
            "solution": "import pickle\n\ndef count_books(author_name):\n    count = 0\n    with open('books.dat', 'rb') as f:\n        try:\n            while True:\n                b = pickle.load(f)\n                if b['author'].lower() == author_name.lower():\n                    count += 1\n        except EOFError:\n            pass\n    return count",
            "markingScheme": "1 Mark for reading loop, 1.5 Marks for case-insensitive author match, 0.5 Mark for returning count."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A binary file 'student.dat' contains records of students with structure [RollNo, Name, Marks]. Write a Python program with functions:\n1. insert_student(roll, name, marks): Appends the record.\n2. scholarship_students(): Displays all students who have scored 90 marks or above, along with the total count of such students.",
            "solution": "import pickle\n\ndef insert_student(roll, name, marks):\n    with open('student.dat', 'ab') as f:\n        pickle.dump([roll, name, marks], f)\n\ndef scholarship_students():\n    count = 0\n    print('=== SCHOLARSHIP ELIGIBLE CANDIDATES (>= 90 MARKS) ===')\n    with open('student.dat', 'rb') as f:\n        try:\n            while True:\n                rec = pickle.load(f)\n                if rec[2] >= 90:\n                    print(f'Roll: {rec[0]} | Name: {rec[1]} | Marks: {rec[2]}')\n                    count += 1\n        except EOFError:\n            pass\n    print(f'Total Scholarship Students: {count}')",
            "markingScheme": "2 Marks for insert_student() in 'ab' mode, 2.5 Marks for scholarship_students() search logic and >= 90 condition, 1.5 Marks for count display."
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Record Updating Using In-Place Seeking or Temporary Files",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which mode allows both reading and updating a binary file?\n(a) 'rb+'\n(b) 'r+'\n(c) 'ab'\n(d) 'wb'",
            "solution": "(a) 'rb+'. 'rb+' opens the binary file for both reading and writing without truncation.",
            "markingScheme": "1 Mark for (a) 'rb+'."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Why is updating records in a binary file using 'rb+' challenging if the updated object changes in size?",
            "solution": "Pickled byte streams have variable lengths. If a modified record's byte size differs from the original, dumping it in-place can overwrite or misalign subsequent records.",
            "markingScheme": "1 Mark for explanation of variable byte length and byte collision."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which standard module is used to rename and delete files on the operating system?\n(a) sys\n(b) os\n(c) io\n(d) shutil",
            "solution": "(b) os. Functions os.remove() and os.rename() handle file removal and renaming.",
            "markingScheme": "1 Mark for (b) os."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What does f.tell() return when called on a binary file object?",
            "solution": "The exact current byte offset of the file pointer from the beginning of the file.",
            "markingScheme": "1 Mark for exact byte offset."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain the two-file (temp file) strategy used to update or delete records in binary files.",
            "solution": "1. Open original file in 'rb' mode and a 'temp.dat' file in 'wb' mode.\n2. Read records sequentially; write updated or retained records into 'temp.dat'.\n3. Close both files, remove the original file (os.remove), and rename 'temp.dat' to the original file name (os.rename).",
            "markingScheme": "1 Mark for copying to temp with modification/filter, 1 Mark for os.remove and os.rename."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Write code to delete 'student.dat' from the disk safely using the os module.",
            "solution": "import os\nif os.path.exists('student.dat'):\n    os.remove('student.dat')",
            "markingScheme": "1 Mark for os.path.exists check, 1 Mark for os.remove."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function update_marks_in_memory(filename, roll, new_marks) that loads all records into a Python list, updates the target student's marks, and rewrites the file in 'wb' mode.",
            "solution": "import pickle\n\ndef update_marks_in_memory(filename, roll, new_marks):\n    records = []\n    found = False\n    with open(filename, 'rb') as f:\n        try:\n            while True:\n                records.append(pickle.load(f))\n        except EOFError:\n            pass\n    for r in records:\n        if r[0] == roll:\n            r[2] = new_marks\n            found = True\n            break\n    with open(filename, 'wb') as f:\n        for r in records:\n            pickle.dump(r, f)\n    return found",
            "markingScheme": "1 Mark for loading all records, 1 Mark for list modification, 1 Mark for rewriting with 'wb' mode."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function delete_item(item_id) that deletes a record from 'items.dat' using a temporary file.",
            "solution": "import pickle, os\n\ndef delete_item(item_id):\n    found = False\n    with open('items.dat', 'rb') as fin, open('temp.dat', 'wb') as fout:\n        try:\n            while True:\n                rec = pickle.load(fin)\n                if rec[0] != item_id:\n                    pickle.dump(rec, fout)\n                else:\n                    found = True\n        except EOFError:\n            pass\n    os.remove('items.dat')\n    os.rename('temp.dat', 'items.dat')\n    return found",
            "markingScheme": "1 Mark for reading fin and writing fout, 1 Mark for skipping target rec[0] == item_id, 1 Mark for os.remove and os.rename."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A binary file 'salary.dat' stores employee records: {'eid': int, 'name': str, 'dept': str, 'salary': float}. Write a complete Python function hike_department_salary(dept_name, percentage) that:\n1. Increases the salary of all employees in dept_name by the given percentage.\n2. Uses a temporary file approach.\n3. Prints the old and new salaries of all affected employees.\n4. Displays the total number of employees whose salaries were updated.",
            "solution": "import pickle, os\n\ndef hike_department_salary(dept_name, percentage):\n    updated_count = 0\n    with open('salary.dat', 'rb') as fin, open('temp_sal.dat', 'wb') as fout:\n        try:\n            while True:\n                emp = pickle.load(fin)\n                if emp['dept'].lower() == dept_name.lower():\n                    old_sal = emp['salary']\n                    emp['salary'] += emp['salary'] * (percentage / 100)\n                    print(f\"Emp {emp['name']} (ID {emp['eid']}): {old_sal} -> {emp['salary']}\")\n                    updated_count += 1\n                pickle.dump(emp, fout)\n        except EOFError:\n            pass\n            \n    os.remove('salary.dat')\n    os.rename('temp_sal.dat', 'salary.dat')\n    print(f'Total employees updated in {dept_name}: {updated_count}')",
            "markingScheme": "2 Marks for temp file setup and loop, 2 Marks for department matching and percentage calculation, 2 Marks for os.remove/rename and reporting."
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Multiple Record Pickling, Protocols & Nested Structures",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the return value of pickle.dump()?\n(a) True\n(b) None\n(c) Number of bytes written\n(d) The object itself",
            "solution": "(b) None. pickle.dump() writes data directly to the stream and returns None.",
            "markingScheme": "1 Mark for (b) None."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Can an entire list of dictionaries be dumped in a single pickle.dump() call?",
            "solution": "Yes. Python can pickle any composite structure including a list of dictionaries in one single call.",
            "markingScheme": "1 Mark for Yes with explanation."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the advantage of pickling an entire list of records at once versus record by record?",
            "solution": "Dumping the entire list requires only a single I/O operation and unpickles in one load() call without needing an EOFError loop.",
            "markingScheme": "1 Mark for single I/O operation / no EOF loop needed."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is pickle.HIGHEST_PROTOCOL?",
            "solution": "An integer constant specifying the highest binary serialization protocol version available in the installed Python interpreter.",
            "markingScheme": "1 Mark for highest available protocol constant."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the output:\nimport pickle\ndata = [[1, 'A'], [2, 'B']]\nwith open('pairs.dat', 'wb') as f:\n    pickle.dump(data, f)\nwith open('pairs.dat', 'rb') as f:\n    res = pickle.load(f)\n    print(len(res), res[1][1])",
            "solution": "res is the list [[1, 'A'], [2, 'B']].\nlen(res) is 2.\nres[1][1] is 'B'.\nOutput:\n2 B",
            "markingScheme": "1 Mark for 2, 1 Mark for B."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What error occurs if you call pickle.load(f) on a file opened in 'r' (text) mode?",
            "solution": "TypeError: file must have 'read' and 'readline' attributes or UnpicklingError/TypeError: 'str' does not have expected buffer interface.",
            "markingScheme": "1 Mark for TypeError / UnpicklingError, 1 Mark for explaining text mode mismatch."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function save_bulk_students(filename, student_list) that serializes a whole list of student dictionaries into a binary file.",
            "solution": "import pickle\n\ndef save_bulk_students(filename, student_list):\n    with open(filename, 'wb') as f:\n        pickle.dump(student_list, f)",
            "markingScheme": "1 Mark for 'wb' mode, 1.5 Marks for pickle.dump(student_list, f), 0.5 Mark for function signature."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function read_bulk_students(filename) that reads the bulk student list from filename and returns only students scoring above 75.",
            "solution": "import pickle\n\ndef read_bulk_students(filename):\n    with open(filename, 'rb') as f:\n        all_students = pickle.load(f)\n    return [s for s in all_students if s['marks'] > 75]",
            "markingScheme": "1.5 Marks for loading the single list object, 1.5 Marks for list comprehension filtering > 75."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A binary file 'flights.dat' stores flights where each record is a dictionary {'fno': str, 'source': str, 'destination': str, 'fare': float, 'seats': int}. Write functions:\n1. add_flight(fno, src, dest, fare, seats)\n2. search_flights(src, dest): Displays all flights between src and dest with fare <= 5000 and seats > 0.\n3. book_seat(fno): Decrements available seats for flight fno by 1 and updates the file.",
            "solution": "import pickle, os\n\ndef add_flight(fno, src, dest, fare, seats):\n    with open('flights.dat', 'ab') as f:\n        pickle.dump({'fno': fno, 'source': src, 'destination': dest, 'fare': fare, 'seats': seats}, f)\n\ndef search_flights(src, dest):\n    with open('flights.dat', 'rb') as f:\n        try:\n            while True:\n                fl = pickle.load(f)\n                if fl['source'].lower() == src.lower() and fl['destination'].lower() == dest.lower() and fl['fare'] <= 5000 and fl['seats'] > 0:\n                    print(f\"Flight {fl['fno']} | Fare: {fl['fare']} | Seats: {fl['seats']}\")\n        except EOFError:\n            pass\n\ndef book_seat(fno):\n    booked = False\n    with open('flights.dat', 'rb') as fin, open('temp_f.dat', 'wb') as fout:\n        try:\n            while True:\n                fl = pickle.load(fin)\n                if fl['fno'].upper() == fno.upper() and fl['seats'] > 0:\n                    fl['seats'] -= 1\n                    booked = True\n                pickle.dump(fl, fout)\n        except EOFError:\n            pass\n    os.remove('flights.dat')\n    os.rename('temp_f.dat', 'flights.dat')\n    return booked",
            "markingScheme": "1.5 Marks for add_flight, 2 Marks for search_flights criteria, 2.5 Marks for book_seat decrement & temp file rewrite."
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: In-Place Binary Pointer Navigation with seek() & tell()",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Unlike text files, does binary mode ('rb') allow arbitrary relative seeks like f.seek(-10, 1) and f.seek(-20, 2)?",
            "solution": "Yes. In binary mode, relative seeking from the current position (1) and end of file (2) with positive or negative offsets is fully supported.",
            "markingScheme": "1 Mark for Yes (binary mode supports arbitrary byte seeks)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does f.seek(0, 2) do in a binary file?",
            "solution": "Moves the file pointer directly to the end of the file.",
            "markingScheme": "1 Mark for moves pointer to EOF."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What will f.tell() return after f.seek(0, 2) on a binary file containing 256 bytes?",
            "solution": "256 (the total size of the file in bytes).",
            "markingScheme": "1 Mark for 256."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the purpose of pickle.loads() versus pickle.load().",
            "solution": "pickle.load() reads from an open file-like stream, whereas pickle.loads() reads from a bytes object in memory.",
            "markingScheme": "1 Mark for file stream vs bytes object."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write Python code to determine the size in bytes of a binary file 'data.dat' using seek() and tell().",
            "solution": "with open('data.dat', 'rb') as f:\n    f.seek(0, 2)\n    size = f.tell()\nprint('Size:', size, 'bytes')",
            "markingScheme": "1 Mark for seek(0, 2), 1 Mark for tell()."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why must you record f.tell() BEFORE calling pickle.load() if you intend to update that specific record in-place using 'rb+' mode?",
            "solution": "Calling pickle.load(f) advances the file pointer past the record. Recording f.tell() beforehand captures the starting byte offset, so you can f.seek() back to overwrite it.",
            "markingScheme": "1 Mark for load advances pointer, 1 Mark for recording starting offset to seek back."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function update_marks_inplace(roll_target, new_marks) that opens 'students.dat' in 'rb+' mode, records pos = f.tell() before each load(), and seeks back to overwrite when matched.",
            "solution": "import pickle\n\ndef update_marks_inplace(roll_target, new_marks):\n    with open('students.dat', 'rb+') as f:\n        try:\n            while True:\n                pos = f.tell()\n                rec = pickle.load(f)\n                if rec[0] == roll_target:\n                    rec[2] = new_marks\n                    f.seek(pos)\n                    pickle.dump(rec, f)\n                    break\n        except EOFError:\n            pass",
            "markingScheme": "1 Mark for 'rb+' mode & pos = f.tell(), 1 Mark for f.seek(pos), 1 Mark for pickle.dump overwrite."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function count_total_records(filename) that returns the total count of pickled objects in a binary file.",
            "solution": "import pickle\n\ndef count_total_records(filename):\n    count = 0\n    with open(filename, 'rb') as f:\n        try:\n            while True:\n                pickle.load(f)\n                count += 1\n        except EOFError:\n            pass\n    return count",
            "markingScheme": "1 Mark for loop structure, 1.5 Marks for EOFError termination, 0.5 Mark for returning count."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program for a banking system storing accounts in 'accounts.dat' with structure [acc_no, holder_name, balance]. Implement:\n1. create_account(acc_no, name, init_balance)\n2. deposit(acc_no, amount): Adds amount to balance using in-place seek or temp file and prints updated balance.\n3. withdraw(acc_no, amount): Deducts amount if sufficient balance exists, else prints 'Insufficient funds'.",
            "solution": "import pickle, os\n\ndef create_account(acc_no, name, init_balance):\n    with open('accounts.dat', 'ab') as f:\n        pickle.dump([acc_no, name, init_balance], f)\n\ndef transact(acc_no, amount, is_deposit):\n    success = False\n    with open('accounts.dat', 'rb') as fin, open('temp_acc.dat', 'wb') as fout:\n        try:\n            while True:\n                acc = pickle.load(fin)\n                if acc[0] == acc_no:\n                    if is_deposit:\n                        acc[2] += amount\n                        print(f'Deposited {amount}. New Balance: {acc[2]}')\n                        success = True\n                    else:\n                        if acc[2] >= amount:\n                            acc[2] -= amount\n                            print(f'Withdrawn {amount}. New Balance: {acc[2]}')\n                            success = True\n                        else:\n                            print('Insufficient funds!')\n                pickle.dump(acc, fout)\n        except EOFError:\n            pass\n    os.remove('accounts.dat')\n    os.rename('temp_acc.dat', 'accounts.dat')\n    return success",
            "markingScheme": "2 Marks for create_account, 2 Marks for deposit logic, 2 Marks for withdrawal check & file rewrite."
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Exception Handling & Data Integrity in Binary Records",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which error occurs if a non-pickled file is attempted to be read with pickle.load()?\n(a) pickle.UnpicklingError\n(b) SyntaxError\n(c) NameError\n(d) KeyError",
            "solution": "(a) pickle.UnpicklingError (or EOFError/ValueError depending on header bytes).",
            "markingScheme": "1 Mark for (a) UnpicklingError."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "State whether pickle module can safely serialize custom class instances in Python.",
            "solution": "Yes. Python's pickle module can serialize and deserialize custom user-defined class instances.",
            "markingScheme": "1 Mark for Yes."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the purpose of the 'wb+' file mode?",
            "solution": "Creates an empty binary file (truncating existing data) and opens it for both reading and writing.",
            "markingScheme": "1 Mark for truncate to 0 bytes and open for read/write."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Why should you avoid unpickling data from untrusted sources?",
            "solution": "Pickle is not secure against erroneous or maliciously constructed data. Unpickling can execute arbitrary code during deserialization.",
            "markingScheme": "1 Mark for security risk / arbitrary code execution."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write code to verify if a binary file 'records.dat' exists before attempting to read it.",
            "solution": "import os\nif os.path.exists('records.dat'):\n    # Proceed with reading\n    pass\nelse:\n    print('File does not exist')",
            "markingScheme": "1 Mark for os.path.exists, 1 Mark for conditional handling."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain the difference between dump() and dumps().",
            "solution": "dump(obj, file) writes the serialized object to an open file stream. dumps(obj) serializes the object to a bytes string in memory.",
            "markingScheme": "1 Mark for dump writes to file, 1 Mark for dumps returns bytes."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function safe_load_all(filename) that safely loads all records from filename and catches FileNotFoundError, UnpicklingError, and EOFError.",
            "solution": "import pickle\n\ndef safe_load_all(filename):\n    records = []\n    try:\n        with open(filename, 'rb') as f:\n            while True:\n                try:\n                    records.append(pickle.load(f))\n                except EOFError:\n                    break\n    except FileNotFoundError:\n        print(f'Error: {filename} not found.')\n    except pickle.UnpicklingError:\n        print('Corrupt data detected.')\n    return records",
            "markingScheme": "1 Mark for inner EOFError break, 1 Mark for outer FileNotFoundError, 1 Mark for UnpicklingError."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function copy_binary_records(src, dest) that reads all records from src and writes them to dest using pickle.",
            "solution": "import pickle\n\ndef copy_binary_records(src, dest):\n    with open(src, 'rb') as fin, open(dest, 'wb') as fout:\n        try:\n            while True:\n                rec = pickle.load(fin)\n                pickle.dump(rec, fout)\n        except EOFError:\n            pass",
            "markingScheme": "1 Mark for file opens, 1.5 Marks for load-dump loop, 0.5 Mark for EOFError handling."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program to manage hospital patient records in 'patients.dat' with structure [pid, name, disease, admitted_days]. Functions:\n1. admit_patient(pid, name, disease, days)\n2. discharge_patient(pid): Removes the patient record from the file using a temporary file and prints a discharge bill (Rs. 1500 per day).\n3. count_patients_by_disease(disease_name): Returns count of patients admitted for that disease.",
            "solution": "import pickle, os\n\ndef admit_patient(pid, name, disease, days):\n    with open('patients.dat', 'ab') as f:\n        pickle.dump([pid, name, disease, days], f)\n\ndef discharge_patient(pid):\n    discharged = False\n    with open('patients.dat', 'rb') as fin, open('temp_pat.dat', 'wb') as fout:\n        try:\n            while True:\n                p = pickle.load(fin)\n                if p[0] == pid:\n                    bill = p[3] * 1500\n                    print(f'Discharging {p[1]}. Admitted: {p[3]} days. Total Bill: Rs. {bill}')\n                    discharged = True\n                else:\n                    pickle.dump(p, fout)\n        except EOFError:\n            pass\n    os.remove('patients.dat')\n    os.rename('temp_pat.dat', 'patients.dat')\n    return discharged\n\ndef count_patients_by_disease(disease_name):\n    count = 0\n    with open('patients.dat', 'rb') as f:\n        try:\n            while True:\n                p = pickle.load(f)\n                if p[2].lower() == disease_name.lower():\n                    count += 1\n        except EOFError:\n            pass\n    return count",
            "markingScheme": "1.5 Marks for admit_patient, 2.5 Marks for discharge bill calculation & temp file deletion, 2 Marks for count_patients_by_disease."
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Record Sorting, Aggregations & Statistical Analysis",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Can binary files directly store tuples containing numbers, strings, and lists?\n(a) Yes\n(b) No\n(c) Only if length is 2\n(d) Only numbers",
            "solution": "(a) Yes. Python's pickle module can serialize nested arbitrary tuples.",
            "markingScheme": "1 Mark for (a) Yes."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the result of len(f.read()) if f is opened in 'rb' mode?",
            "solution": "Returns the total number of bytes in the file.",
            "markingScheme": "1 Mark for total number of bytes."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "True or False: pickle.load() can read multiple objects in a single call.",
            "solution": "False. Each pickle.load() call reads exactly one serialized object.",
            "markingScheme": "1 Mark for False."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What does os.rename(old, new) do if 'new' already exists on Windows?",
            "solution": "On Windows, it raises a FileExistsError if the target file already exists.",
            "markingScheme": "1 Mark for FileExistsError."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write code to sort records stored in 'scores.dat' in descending order of score.",
            "solution": "import pickle\nrecs = []\nwith open('scores.dat', 'rb') as f:\n    try:\n        while True: recs.append(pickle.load(f))\n    except EOFError: pass\nrecs.sort(key=lambda x: x['score'], reverse=True)\nprint(recs)",
            "markingScheme": "1 Mark for reading into list, 1 Mark for sorting with key lambda and reverse=True."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "State how to find the average marks of all students in 'student.dat' [roll, name, marks].",
            "solution": "import pickle\ntotal = count = 0\nwith open('student.dat', 'rb') as f:\n    try:\n        while True:\n            rec = pickle.load(f)\n            total += rec[2]\n            count += 1\n    except EOFError: pass\navg = total / count if count else 0\nprint('Average:', avg)",
            "markingScheme": "1 Mark for accumulating total and count, 1 Mark for division avg."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function find_topper(filename) that returns the name and marks of the student with the highest marks from a binary file.",
            "solution": "import pickle\n\ndef find_topper(filename):\n    topper_name = ''\n    max_marks = -1\n    with open(filename, 'rb') as f:\n        try:\n            while True:\n                rec = pickle.load(f)\n                if rec[2] > max_marks:\n                    max_marks = rec[2]\n                    topper_name = rec[1]\n        except EOFError:\n            pass\n    return topper_name, max_marks",
            "markingScheme": "1 Mark for file loop, 1.5 Marks for max_marks tracking, 0.5 Mark for returning tuple."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function count_gender_ratio(filename) that displays the count of Male ('M') and Female ('F') employees in 'staff.dat' [id, name, gender, sal].",
            "solution": "import pickle\n\ndef count_gender_ratio(filename):\n    m_count = f_count = 0\n    with open(filename, 'rb') as f:\n        try:\n            while True:\n                rec = pickle.load(f)\n                if rec[2].upper() == 'M': m_count += 1\n                elif rec[2].upper() == 'F': f_count += 1\n        except EOFError:\n            pass\n    print(f'Male: {m_count}, Female: {f_count}')",
            "markingScheme": "1 Mark for reading loop, 1.5 Marks for conditional counting, 0.5 Mark for output."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete Python program with functions:\n1. create_catalog(): Dumps 5 product records [pid, title, category, price] into 'catalog.dat'.\n2. filter_by_category(cat_name): Displays all products in that category.\n3. price_summary(): Displays maximum price, minimum price, and average price across all products.",
            "solution": "import pickle\n\ndef create_catalog():\n    products = [\n        [101, 'Mouse', 'Electronics', 450.0],\n        [102, 'Keyboard', 'Electronics', 1200.0],\n        [103, 'Notebook', 'Stationery', 80.0],\n        [104, 'Pen Drive', 'Electronics', 650.0],\n        [105, 'Marker', 'Stationery', 40.0]\n    ]\n    with open('catalog.dat', 'wb') as f:\n        for p in products:\n            pickle.dump(p, f)\n\ndef filter_by_category(cat_name):\n    with open('catalog.dat', 'rb') as f:\n        try:\n            while True:\n                p = pickle.load(f)\n                if p[2].lower() == cat_name.lower():\n                    print(f'{p[0]}: {p[1]} (Rs. {p[3]})')\n        except EOFError:\n            pass\n\ndef price_summary():\n    prices = []\n    with open('catalog.dat', 'rb') as f:\n        try:\n            while True:\n                p = pickle.load(f)\n                prices.append(p[3])\n        except EOFError:\n            pass\n    if prices:\n        print(f'Max: {max(prices)}, Min: {min(prices)}, Avg: {sum(prices)/len(prices):.2f}')",
            "markingScheme": "2 Marks for create_catalog, 2 Marks for filter_by_category, 2 Marks for price_summary statistics."
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Complex Record Updates & Conditional Batch Modifications",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which function from the os module is used to delete an existing file?\n(a) os.delete()\n(b) os.remove()\n(c) os.unlink_all()\n(d) os.erase()",
            "solution": "(b) os.remove() (or os.unlink()).",
            "markingScheme": "1 Mark for (b) os.remove()."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the purpose of os.rename('temp.dat', 'main.dat')?",
            "solution": "Renames the file 'temp.dat' to 'main.dat', completing the temporary file replacement cycle.",
            "markingScheme": "1 Mark for replacing temporary file with target filename."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Can pickle store user-defined functions or lambda expressions directly?",
            "solution": "Standard pickle serializes function names and module references, but cannot pickle dynamic anonymous functions (lambdas) without third-party extensions.",
            "markingScheme": "1 Mark for limitation on lambdas / serializes references only."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the default protocol in Python 3.12 pickle module.",
            "solution": "Protocol 4 (default since Python 3.8; Protocol 5 added in Python 3.8 as option).",
            "markingScheme": "1 Mark for Protocol 4."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the output:\nimport pickle\nwith open('nums.dat', 'wb') as f:\n    for x in range(3):\n        pickle.dump(x * 10, f)\nwith open('nums.dat', 'rb') as f:\n    total = 0\n    try:\n        while True: total += pickle.load(f)\n    except EOFError: pass\n    print('Total:', total)",
            "solution": "Objects dumped: 0, 10, 20.\nSum: 0 + 10 + 20 = 30.\nOutput:\nTotal: 30",
            "markingScheme": "1 Mark for identifying 0, 10, 20, 1 Mark for Total: 30."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why should we avoid calling os.remove('data.dat') before closing the open file handle on Windows?",
            "solution": "On Windows, an open file descriptor creates an active lock. Calling os.remove() on an open file raises PermissionError / WindowsError.",
            "markingScheme": "1 Mark for active file locking, 1 Mark for PermissionError on Windows."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function give_grace_marks(filename, grace=5) that adds 5 marks to all students having marks between 28 and 32 in 'students.dat' [roll, name, marks] using a temp file.",
            "solution": "import pickle, os\n\ndef give_grace_marks(filename, grace=5):\n    with open(filename, 'rb') as fin, open('temp.dat', 'wb') as fout:\n        try:\n            while True:\n                s = pickle.load(fin)\n                if 28 <= s[2] <= 32:\n                    s[2] = min(33, s[2] + grace)\n                pickle.dump(s, fout)\n        except EOFError:\n            pass\n    os.remove(filename)\n    os.rename('temp.dat', filename)",
            "markingScheme": "1 Mark for temp file setup, 1.5 Marks for conditional mark increment, 0.5 Mark for file rename."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function delete_inactive_users(filename) that deletes users with status == 'inactive' from 'users.dat' {'uid': int, 'username': str, 'status': str}.",
            "solution": "import pickle, os\n\ndef delete_inactive_users(filename):\n    with open(filename, 'rb') as fin, open('temp.dat', 'wb') as fout:\n        try:\n            while True:\n                u = pickle.load(fin)\n                if u['status'].lower() != 'inactive':\n                    pickle.dump(u, fout)\n        except EOFError:\n            pass\n    os.remove(filename)\n    os.rename('temp.dat', filename)",
            "markingScheme": "1.5 Marks for skipping inactive users, 1.5 Marks for os.remove and os.rename."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A binary file 'vehicles.dat' stores vehicle details [reg_no, model, year, price]. Write a complete Python program with functions:\n1. add_vehicle(reg_no, model, year, price)\n2. search_by_model(model_name): Displays all vehicles of that model.\n3. apply_depreciation(dep_percent): Reduces the price of all vehicles older than 5 years (current year = 2026) by dep_percent and updates the binary file.",
            "solution": "import pickle, os\n\ndef add_vehicle(reg_no, model, year, price):\n    with open('vehicles.dat', 'ab') as f:\n        pickle.dump([reg_no, model, year, price], f)\n\ndef search_by_model(model_name):\n    with open('vehicles.dat', 'rb') as f:\n        try:\n            while True:\n                v = pickle.load(f)\n                if v[1].lower() == model_name.lower():\n                    print(f'Reg: {v[0]} | Year: {v[2]} | Price: {v[3]}')\n        except EOFError:\n            pass\n\ndef apply_depreciation(dep_percent):\n    with open('vehicles.dat', 'rb') as fin, open('temp_v.dat', 'wb') as fout:\n        try:\n            while True:\n                v = pickle.load(fin)\n                if (2026 - v[2]) > 5:\n                    v[3] -= v[3] * (dep_percent / 100)\n                pickle.dump(v, fout)\n        except EOFError:\n            pass\n    os.remove('vehicles.dat')\n    os.rename('temp_v.dat', 'vehicles.dat')",
            "markingScheme": "1.5 Marks for add_vehicle, 1.5 Marks for search_by_model, 3 Marks for depreciation condition (2026 - year > 5) & temp file rewrite."
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Binary File Merging, Splitting & Data Verification",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "How do you open a binary file to read raw bytes directly without unpickling?\n(a) open(filename, 'rb') and call f.read()\n(b) open(filename, 'r')\n(c) pickle.read_bytes()\n(d) open(filename, 'b')",
            "solution": "(a) open(filename, 'rb') and call f.read().",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the return type of f.read(5) on an 'rb' file stream?\n(a) str\n(b) bytes\n(c) bytearray\n(d) list",
            "solution": "(b) bytes. Reading from binary mode returns a bytes object.",
            "markingScheme": "1 Mark for (b) bytes."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "State whether seek(0, 0) resets the file pointer to the first byte in binary mode.",
            "solution": "Yes. seek(0, 0) moves the pointer to byte offset 0 from the start.",
            "markingScheme": "1 Mark for Yes."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What built-in function converts an integer to its binary byte representation?",
            "solution": "int.to_bytes() or bytes([integer]).",
            "markingScheme": "1 Mark for to_bytes() or bytes()."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write code to merge two binary files 'part1.dat' and 'part2.dat' into 'complete.dat' by copying raw bytes.",
            "solution": "with open('complete.dat', 'wb') as fout:\n    for fname in ['part1.dat', 'part2.dat']:\n        with open(fname, 'rb') as fin:\n            fout.write(fin.read())",
            "markingScheme": "1 Mark for opening destination in 'wb', 1 Mark for sequential raw byte reads and writes."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain the difference between pickling a dictionary versus pickling a list of dictionaries.",
            "solution": "Pickling individual dictionaries writes multiple independent pickled objects requiring a loop with EOFError to load. Pickling a list of dictionaries serializes the entire collection as a single object requiring only one load() call.",
            "markingScheme": "1 Mark for multiple objects vs single collection object, 1 Mark for loading mechanism."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function split_records(source_file, pass_file, fail_file) that reads student records [roll, name, marks] and writes records with marks >= 33 to pass_file and < 33 to fail_file.",
            "solution": "import pickle\n\ndef split_records(source_file, pass_file, fail_file):\n    with open(source_file, 'rb') as fsrc, \\\n         open(pass_file, 'wb') as fpass, \\\n         open(fail_file, 'wb') as ffail:\n        try:\n            while True:\n                s = pickle.load(fsrc)\n                if s[2] >= 33:\n                    pickle.dump(s, fpass)\n                else:\n                    pickle.dump(s, ffail)\n        except EOFError:\n            pass",
            "markingScheme": "1 Mark for opening three binary files, 1.5 Marks for conditional dump, 0.5 Mark for EOFError handling."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function verify_binary_file(filename) that counts how many valid pickled objects can be successfully loaded and reports if corruption occurs.",
            "solution": "import pickle\n\ndef verify_binary_file(filename):\n    count = 0\n    try:\n        with open(filename, 'rb') as f:\n            try:\n                while True:\n                    pickle.load(f)\n                    count += 1\n            except EOFError:\n                print(f'File intact. Total records: {count}')\n    except Exception as e:\n        print(f'Corruption or error: {e}')",
            "markingScheme": "1 Mark for reading loop, 1 Mark for reporting record count, 1 Mark for exception handling."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program to manage a library system with 'library.dat' storing [acc_no, title, author, is_issued].\n1. add_book(acc_no, title, author)\n2. issue_book(acc_no): Sets is_issued to True if currently False, else prints 'Already issued'. Updates the file.\n3. return_book(acc_no): Sets is_issued to False. Updates the file.\n4. display_available_books(): Displays all books where is_issued is False.",
            "solution": "import pickle, os\n\ndef add_book(acc_no, title, author):\n    with open('library.dat', 'ab') as f:\n        pickle.dump([acc_no, title, author, False], f)\n\ndef update_status(acc_no, new_status):\n    updated = False\n    with open('library.dat', 'rb') as fin, open('temp_lib.dat', 'wb') as fout:\n        try:\n            while True:\n                b = pickle.load(fin)\n                if b[0] == acc_no:\n                    if b[3] == new_status:\n                        print('Status already matches.')\n                    else:\n                        b[3] = new_status\n                        updated = True\n                pickle.dump(b, fout)\n        except EOFError:\n            pass\n    os.remove('library.dat')\n    os.rename('temp_lib.dat', 'library.dat')\n    return updated\n\ndef display_available_books():\n    with open('library.dat', 'rb') as f:\n        try:\n            while True:\n                b = pickle.load(f)\n                if not b[3]:\n                    print(f'Acc No: {b[0]} | Title: {b[1]} | Author: {b[2]}')\n        except EOFError:\n            pass",
            "markingScheme": "1.5 Marks for add_book, 2.5 Marks for update_status logic & temp rewrite, 2 Marks for display_available_books."
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Complete Binary CRUD & Examination Mastery",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which of the following is true regarding pickle.dump(obj, f)?\n(a) obj is converted to ASCII string\n(b) obj is serialized to binary format\n(c) f must be opened in text mode\n(d) returns the pickled string",
            "solution": "(b) obj is serialized to binary format.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the purpose of passing whence=2 to seek() in binary mode?",
            "solution": "It sets the reference position to the end of the file.",
            "markingScheme": "1 Mark for reference point end of file."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Why should you never write pickle.load(f) outside a try-except block when reading an unknown number of records?",
            "solution": "Because pickle.load(f) will raise an unhandled EOFError crash when the end of file is reached.",
            "markingScheme": "1 Mark for unhandled EOFError crash."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is returned by pickle.load(f) if f contains no bytes (0 byte file)?",
            "solution": "It immediately raises EOFError.",
            "markingScheme": "1 Mark for raises EOFError."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Trace the output:\nimport pickle\nwith open('vals.dat', 'wb') as f:\n    pickle.dump({'x': 100}, f)\nwith open('vals.dat', 'rb') as f:\n    d = pickle.load(f)\n    print(d.get('x', 0) * 2)",
            "solution": "d is {'x': 100}.\nd.get('x', 0) returns 100.\n100 * 2 = 200.\nOutput:\n200",
            "markingScheme": "1 Mark for retrieving 100, 1 Mark for 200."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "State two differences between text files and binary files in Python.",
            "solution": "1. Text files store human-readable characters with newline translation; binary files store raw unencoded bytes.\n2. Text files are accessed via read()/write(); binary objects are serialized via pickle.dump()/pickle.load().",
            "markingScheme": "1 Mark for encoding/representation difference, 1 Mark for access method difference."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function delete_by_roll(roll_no) to delete a student record from 'student.dat' [roll, name, marks] using a temporary file.",
            "solution": "import pickle, os\n\ndef delete_by_roll(roll_no):\n    found = False\n    with open('student.dat', 'rb') as fin, open('temp.dat', 'wb') as fout:\n        try:\n            while True:\n                s = pickle.load(fin)\n                if s[0] != roll_no:\n                    pickle.dump(s, fout)\n                else:\n                    found = True\n        except EOFError:\n            pass\n    os.remove('student.dat')\n    os.rename('temp.dat', 'student.dat')\n    return found",
            "markingScheme": "1 Mark for temp file loop, 1 Mark for skipping matched roll_no, 1 Mark for file cleanup."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function display_all_records(filename) that reads and displays all records formatted in a table.",
            "solution": "import pickle\n\ndef display_all_records(filename):\n    print(f\"{'Roll':<8}{'Name':<20}{'Marks':<8}\")\n    print('-' * 36)\n    with open(filename, 'rb') as f:\n        try:\n            while True:\n                r = pickle.load(f)\n                print(f\"{r[0]:<8}{r[1]:<20}{r[2]:<8}\")\n        except EOFError:\n            pass",
            "markingScheme": "1 Mark for header formatting, 1.5 Marks for formatted print in loop, 0.5 Mark for EOFError handling."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a comprehensive Python program for a student management system implementing full CRUD on 'students.dat' [roll, name, marks]:\n1. add_record(roll, name, marks)\n2. read_all()\n3. search_record(roll)\n4. update_record(roll, new_marks)\n5. delete_record(roll)",
            "solution": "import pickle, os\n\nFNAME = 'students.dat'\n\ndef add_record(roll, name, marks):\n    with open(FNAME, 'ab') as f:\n        pickle.dump([roll, name, marks], f)\n\ndef read_all():\n    with open(FNAME, 'rb') as f:\n        try:\n            while True:\n                print(pickle.load(f))\n        except EOFError:\n            pass\n\ndef search_record(roll):\n    with open(FNAME, 'rb') as f:\n        try:\n            while True:\n                r = pickle.load(f)\n                if r[0] == roll:\n                    return r\n        except EOFError:\n            return None\n\ndef update_record(roll, new_marks):\n    with open(FNAME, 'rb') as fin, open('temp.dat', 'wb') as fout:\n        try:\n            while True:\n                r = pickle.load(fin)\n                if r[0] == roll:\n                    r[2] = new_marks\n                pickle.dump(r, fout)\n        except EOFError:\n            pass\n    os.remove(FNAME)\n    os.rename('temp.dat', FNAME)\n\ndef delete_record(roll):\n    with open(FNAME, 'rb') as fin, open('temp.dat', 'wb') as fout:\n        try:\n            while True:\n                r = pickle.load(fin)\n                if r[0] != roll:\n                    pickle.dump(r, fout)\n        except EOFError:\n            pass\n    os.remove(FNAME)\n    os.rename('temp.dat', FNAME)",
            "markingScheme": "1 Mark for add_record, 1 Mark for read_all, 1 Mark for search_record, 1.5 Marks for update_record, 1.5 Marks for delete_record."
          }
        ]
      }
    ]
  }
];
