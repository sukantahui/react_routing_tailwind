export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: CSV Module Basics, reader() & writer() Mechanics",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What does CSV stand for in computer file formats?\n(a) Centralized System Values\n(b) Comma Separated Values\n(c) Character String Variables\n(d) Code Storage Vector",
            "solution": "(b) Comma Separated Values.",
            "markingScheme": "1 Mark for (b) Comma Separated Values."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Why is the parameter newline='' required when opening a CSV file for writing in Python 3 on Windows?",
            "solution": "Without newline='', Python's text mode converts '\\n' to '\\r\\n' while the csv writer also adds its own line terminator '\\r\\n', resulting in unwanted blank lines between rows on Windows.",
            "markingScheme": "1 Mark for explaining newline translation causing unwanted blank lines."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the return type of each item returned by csv.reader() when iterating over it?\n(a) str\n(b) list of strings\n(c) dict\n(d) tuple of integers",
            "solution": "(b) list of strings. Each row is parsed into a list of string elements.",
            "markingScheme": "1 Mark for (b) list of strings."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the default delimiter in Python's csv module?",
            "solution": "Comma (',').",
            "markingScheme": "1 Mark for comma."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the error in the following code and write the correction:\nimport csv\nf = open('data.csv', 'w')\nwriter = csv.writer(f)\nwriter.writerow('101', 'Rohit', 85)\nf.close()",
            "solution": "Error: writerow() takes a single iterable argument (such as a list), but three arguments were passed.\nCorrection:\nwriter.writerow(['101', 'Rohit', 85])",
            "markingScheme": "1 Mark for identifying multiple arguments error, 1 Mark for enclosing in list [ ... ]."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Differentiate between writerow() and writerows() methods of a csv.writer object.",
            "solution": "writerow(row) writes a single row (1D sequence of fields) to the CSV file. writerows(rows) writes multiple rows (2D sequence/iterable of rows) at once.",
            "markingScheme": "1 Mark for writerow (single row), 1 Mark for writerows (multiple rows)."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function read_csv_skip_header(filename) that opens a CSV file, reads and prints the header row separately, and then iterates through and prints each data row.",
            "solution": "import csv\n\ndef read_csv_skip_header(filename):\n    with open(filename, 'r', newline='') as f:\n        reader = csv.reader(f)\n        header = next(reader) # extracts first row\n        print('Header:', header)\n        print('--- Data Rows ---')\n        for row in reader:\n            print(row)",
            "markingScheme": "1 Mark for csv.reader and open with newline='', 1 Mark for next(reader) header extraction, 1 Mark for remaining rows loop."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function create_csv_with_pipe(filename, rows) that writes rows into a CSV file using a pipe ('|') delimiter.",
            "solution": "import csv\n\ndef create_csv_with_pipe(filename, rows):\n    with open(filename, 'w', newline='') as f:\n        writer = csv.writer(f, delimiter='|')\n        writer.writerows(rows)",
            "markingScheme": "1 Mark for open in 'w' with newline='', 1.5 Marks for delimiter='|' in csv.writer, 0.5 Mark for writer.writerows(rows)."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete Python program with two functions:\n1. create_student_csv(filename): Accepts 5 student records from console (RollNo, Name, Percentage) and writes them to a CSV file with header ['Roll', 'Name', 'Percentage'].\n2. display_distinction(filename): Reads the CSV file and displays records of all students who scored 75% or higher, along with the total count of such students.",
            "solution": "import csv\n\ndef create_student_csv(filename):\n    with open(filename, 'w', newline='') as f:\n        writer = csv.writer(f)\n        writer.writerow(['Roll', 'Name', 'Percentage'])\n        for _ in range(5):\n            rno = input('Enter Roll: ')\n            name = input('Enter Name: ')\n            pct = float(input('Enter Percentage: '))\n            writer.writerow([rno, name, pct])\n\ndef display_distinction(filename):\n    count = 0\n    with open(filename, 'r', newline='') as f:\n        reader = csv.reader(f)\n        header = next(reader)\n        print(f'{header[0]:<8}{header[1]:<20}{header[2]:<12}')\n        print('-' * 40)\n        for row in reader:\n            if float(row[2]) >= 75.0:\n                print(f'{row[0]:<8}{row[1]:<20}{row[2]:<12}')\n                count += 1\n    print(f'Total Distinction Holders: {count}')",
            "markingScheme": "2.5 Marks for create_student_csv (header + 5 rows write), 2.5 Marks for display_distinction (skip header, float conversion, condition >= 75), 1 Mark for count display."
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Tabular Filtering, Numerical Conversions & Column Metrics",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Why must numeric fields read from a CSV file be explicitly typecast before arithmetic operations?",
            "solution": "Because csv.reader returns all fields strictly as string data types.",
            "markingScheme": "1 Mark for all fields returned as strings."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which parameter of csv.writer specifies the character separating data fields?\n(a) sep\n(b) delimiter\n(c) split_by\n(d) marker",
            "solution": "(b) delimiter.",
            "markingScheme": "1 Mark for (b) delimiter."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What happens if a field contains the delimiter character itself (e.g., 'Kolkata, West Bengal') when written via csv.writer?",
            "solution": "csv.writer automatically encloses the field in double quotes according to CSV quoting rules.",
            "markingScheme": "1 Mark for automatic enclosing in quotes."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What function reads the next single line from a csv.reader object without a for loop?",
            "solution": "The built-in next() function (e.g. row = next(reader)).",
            "markingScheme": "1 Mark for next()."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Given 'marks.csv' with contents:\nName,Maths,Science\nAman,80,90\nRiya,70,95\nFind the output:\nimport csv\nwith open('marks.csv', 'r') as f:\n    r = csv.reader(f)\n    next(r)\n    for row in r:\n        print(row[0], int(row[1]) + int(row[2]))",
            "solution": "Aman: 80 + 90 = 170\nRiya: 70 + 95 = 165\nOutput:\nAman 170\nRiya 165",
            "markingScheme": "1 Mark for Aman 170, 1 Mark for Riya 165."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Write code to write three rows of items [[1, 'Pen'], [2, 'Book']] into 'items.csv' at once.",
            "solution": "import csv\nwith open('items.csv', 'w', newline='') as f:\n    csv.writer(f).writerows([[1, 'Pen'], [2, 'Book']])",
            "markingScheme": "1 Mark for open in 'w' with newline='', 1 Mark for writerows call."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function total_column_sum(filename, col_idx) that returns the sum of all numerical values in column col_idx, skipping the header.",
            "solution": "import csv\n\ndef total_column_sum(filename, col_idx):\n    total = 0.0\n    with open(filename, 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r) # skip header\n        for row in r:\n            if len(row) > col_idx:\n                total += float(row[col_idx])\n    return total",
            "markingScheme": "1 Mark for skip header, 1.5 Marks for float conversion and sum, 0.5 Mark for returning total."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function count_city_records(filename, city) that counts how many records belong to the given city in a CSV where city is at index 2.",
            "solution": "import csv\n\ndef count_city_records(filename, city):\n    count = 0\n    with open(filename, 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            if len(row) > 2 and row[2].strip().lower() == city.lower():\n                count += 1\n    return count",
            "markingScheme": "1 Mark for reader loop, 1.5 Marks for case-insensitive city match, 0.5 Mark for returning count."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A CSV file 'emp.csv' has columns: EmpID, Name, Dept, Salary.\nWrite a Python program with functions:\n1. add_emp(eid, name, dept, salary): Appends record.\n2. dept_salary_report(dept_name): Displays all employees belonging to dept_name and calculates their average salary.\n3. display_highest_paid(): Displays the employee with the highest salary in the entire company.",
            "solution": "import csv\n\ndef add_emp(eid, name, dept, salary):\n    with open('emp.csv', 'a', newline='') as f:\n        csv.writer(f).writerow([eid, name, dept, salary])\n\ndef dept_salary_report(dept_name):\n    total = count = 0\n    with open('emp.csv', 'r', newline='') as f:\n        r = csv.reader(f)\n        header = next(r)\n        for row in r:\n            if row[2].lower() == dept_name.lower():\n                print(f'{row[0]} | {row[1]} | {row[3]}')\n                total += float(row[3])\n                count += 1\n    if count > 0:\n        print(f'Average Salary in {dept_name}: {total / count:.2f}')\n    else:\n        print('No employees found in dept.')\n\ndef display_highest_paid():\n    max_sal = -1\n    topper = None\n    with open('emp.csv', 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            sal = float(row[3])\n            if sal > max_sal:\n                max_sal = sal\n                topper = row\n    if topper:\n        print(f'Highest Paid: {topper[1]} (ID {topper[0]}) with Rs. {topper[3]}')",
            "markingScheme": "1.5 Marks for add_emp, 2.5 Marks for dept_salary_report with average, 2 Marks for display_highest_paid."
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Custom Delimiters (Tabs, Pipes) & Quoting Rules",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "How do you read a TSV (Tab Separated Values) file using the csv module?\n(a) csv.reader(f, delimiter='\\t')\n(b) csv.tsv_reader(f)\n(c) csv.reader(f, tab=True)\n(d) csv.reader(f, sep='tab')",
            "solution": "(a) csv.reader(f, delimiter='\\t').",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the quoting parameter in csv.writer used for?",
            "solution": "It controls when quotes should be generated around fields (e.g. csv.QUOTE_ALL, csv.QUOTE_MINIMAL, csv.QUOTE_NONNUMERIC).",
            "markingScheme": "1 Mark for controlling field quoting behavior."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "True or False: A CSV file is essentially a plain text file structured with separators.",
            "solution": "True.",
            "markingScheme": "1 Mark for True."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Which constant causes all non-numeric fields to be quoted when writing CSV files?",
            "solution": "csv.QUOTE_NONNUMERIC.",
            "markingScheme": "1 Mark for csv.QUOTE_NONNUMERIC."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write code to read a pipe-delimited file 'users.psv' and display the count of records.",
            "solution": "import csv\nwith open('users.psv', 'r', newline='') as f:\n    count = sum(1 for row in csv.reader(f, delimiter='|'))\nprint('Total records:', count)",
            "markingScheme": "1 Mark for delimiter='|', 1 Mark for counting rows."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain what csv.QUOTE_ALL does when passed to csv.writer.",
            "solution": "csv.QUOTE_ALL instructs the writer to enclose every field inside quotes, regardless of whether it contains delimiters or special characters.",
            "markingScheme": "1 Mark for quotes every field, 1 Mark for regardless of content."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function convert_comma_to_tab(csv_file, tsv_file) that reads a comma-separated file and saves it as tab-separated.",
            "solution": "import csv\n\ndef convert_comma_to_tab(csv_file, tsv_file):\n    with open(csv_file, 'r', newline='') as fin, open(tsv_file, 'w', newline='') as fout:\n        r = csv.reader(fin, delimiter=',')\n        w = csv.writer(fout, delimiter='\\t')\n        for row in r:\n            w.writerow(row)",
            "markingScheme": "1 Mark for opening files with newline='', 1 Mark for reader(delimiter=',') and writer(delimiter='\\t'), 1 Mark for row copy."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function filter_by_min_salary(filename, min_sal) that reads 'staff.csv' (cols: id, name, salary) and prints only those with salary >= min_sal.",
            "solution": "import csv\n\ndef filter_by_min_salary(filename, min_sal):\n    with open(filename, 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            if float(row[2]) >= min_sal:\n                print(row[0], row[1], row[2])",
            "markingScheme": "1 Mark for reading loop, 1.5 Marks for float condition, 0.5 Mark for printing."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete program with functions:\n1. write_inventory_csv(items): Writes a list of items [item_code, name, cost_price, selling_price] with header to 'store.csv'.\n2. calculate_profit_margin(): Reads 'store.csv', calculates profit = (selling_price - cost_price) for each item, and writes [item_code, name, profit] to 'profit.csv'.\n3. display_most_profitable(): Prints the item yielding maximum profit.",
            "solution": "import csv\n\ndef write_inventory_csv(items):\n    with open('store.csv', 'w', newline='') as f:\n        w = csv.writer(f)\n        w.writerow(['ItemCode', 'Name', 'CP', 'SP'])\n        w.writerows(items)\n\ndef calculate_profit_margin():\n    with open('store.csv', 'r', newline='') as fin, open('profit.csv', 'w', newline='') as fout:\n        r = csv.reader(fin)\n        w = csv.writer(fout)\n        next(r) # skip header\n        w.writerow(['ItemCode', 'Name', 'Profit'])\n        for row in r:\n            cp = float(row[2])\n            sp = float(row[3])\n            profit = sp - cp\n            w.writerow([row[0], row[1], profit])\n\ndef display_most_profitable():\n    max_profit = -999999\n    best_item = None\n    with open('profit.csv', 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            prof = float(row[2])\n            if prof > max_profit:\n                max_profit = prof\n                best_item = row\n    if best_item:\n        print(f'Most Profitable: {best_item[1]} (Code {best_item[0]}) Profit: Rs. {best_item[2]}')",
            "markingScheme": "2 Marks for write_inventory_csv, 2 Marks for calculate_profit_margin (SP - CP calculation), 2 Marks for display_most_profitable."
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Search, Count & Aggregate Operations on CSV Records",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What does the method reader.line_num return during CSV iteration?\n(a) Byte offset\n(b) Current 1-based source line number\n(c) Number of columns\n(d) Number of characters",
            "solution": "(b) Current 1-based source line number.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Can an empty row in a CSV file produce an empty list [] from csv.reader()?",
            "solution": "Yes, an empty line in a CSV file returns an empty list [].",
            "markingScheme": "1 Mark for Yes."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which method is used to write a single list as a line in a CSV file?",
            "solution": "writer.writerow(row).",
            "markingScheme": "1 Mark for writerow."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the consequence of omitting newline='' when opening a CSV file for writing on Linux/macOS?",
            "solution": "On Linux/macOS, default newline is '\\n' which matches standard POSIX line feeds, so extra blank lines usually don't appear, but using newline='' is required for portable cross-platform code.",
            "markingScheme": "1 Mark for cross-platform portability / avoiding OS-dependent newline translations."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output:\nimport csv\nrows = [['P1', '10'], ['P2', '20'], ['P3', '30']]\nwith open('p.csv', 'w', newline='') as f:\n    csv.writer(f).writerows(rows)\nwith open('p.csv', 'r', newline='') as f:\n    print(sum(int(r[1]) for r in csv.reader(f)))",
            "solution": "10 + 20 + 30 = 60.\nOutput:\n60",
            "markingScheme": "1 Mark for summation logic, 1 Mark for 60."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Write code to search for roll number '105' in 'students.csv' and print the student's name.",
            "solution": "import csv\nwith open('students.csv', 'r', newline='') as f:\n    for row in csv.reader(f):\n        if row and row[0] == '105':\n            print('Name:', row[1])\n            break",
            "markingScheme": "1 Mark for matching row[0] == '105', 1 Mark for printing name."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function count_records_with_criteria(filename, col_idx, value) that returns the total count of rows where column col_idx matches value.",
            "solution": "import csv\n\ndef count_records_with_criteria(filename, col_idx, value):\n    count = 0\n    with open(filename, 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r) # skip header\n        for row in r:\n            if len(row) > col_idx and row[col_idx].strip() == str(value).strip():\n                count += 1\n    return count",
            "markingScheme": "1 Mark for skip header, 1.5 Marks for bounds and value check, 0.5 Mark for returning count."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function append_new_student(filename, roll, name, stream) that appends the row to the CSV file.",
            "solution": "import csv\n\ndef append_new_student(filename, roll, name, stream):\n    with open(filename, 'a', newline='') as f:\n        csv.writer(f).writerow([roll, name, stream])",
            "markingScheme": "1.5 Marks for 'a' mode and newline='', 1.5 Marks for writerow."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program to manage flight schedules in 'flights.csv' with columns: FlightNo, FromCity, ToCity, SeatsAvailable, Fare.\n1. add_flight(fno, from_c, to_c, seats, fare)\n2. search_direct_flights(from_c, to_c): Lists all flights between the cities having seats > 0.\n3. cheap_flights(max_fare): Displays all flights with fare <= max_fare.",
            "solution": "import csv\n\ndef add_flight(fno, from_c, to_c, seats, fare):\n    with open('flights.csv', 'a', newline='') as f:\n        csv.writer(f).writerow([fno, from_c, to_c, seats, fare])\n\ndef search_direct_flights(from_c, to_c):\n    with open('flights.csv', 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            if row[1].lower() == from_c.lower() and row[2].lower() == to_c.lower() and int(row[3]) > 0:\n                print(f'Flight {row[0]}: Seats {row[3]}, Fare Rs. {row[4]}')\n\ndef cheap_flights(max_fare):\n    with open('flights.csv', 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            if float(row[4]) <= max_fare:\n                print(f'{row[0]}: {row[1]} -> {row[2]} (Rs. {row[4]})')",
            "markingScheme": "1.5 Marks for add_flight, 2.5 Marks for search_direct_flights conditions, 2 Marks for cheap_flights filtering."
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Updating & Deleting Records in CSV Files",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Can you modify a specific field of a CSV file in-place without rewriting the file or copying rows?\n(a) Yes\n(b) No, because fields have variable text lengths\n(c) Only for numbers\n(d) Only if delimiter is comma",
            "solution": "(b) No, because fields have variable text lengths. Standard CSV editing requires rewriting to a temporary file or rewriting from memory.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What function from the os module is used to replace the original CSV file with an updated temporary file?",
            "solution": "os.rename('temp.csv', 'original.csv') (after os.remove('original.csv') on Windows).",
            "markingScheme": "1 Mark for os.rename / os.remove."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the return type of csv.writer()?\n(a) str\n(b) _csv.writer object\n(c) list\n(d) None",
            "solution": "(b) _csv.writer object.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "True or False: writerow() can write a tuple as well as a list.",
            "solution": "True. Any iterable sequence of values can be passed to writerow().",
            "markingScheme": "1 Mark for True."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain the temporary file method to delete a record matching a given key in a CSV file.",
            "solution": "1. Open the original CSV file in 'r' mode and a temp CSV file in 'w' mode.\n2. Iterate through reader; if row key does not match target, write to temp.\n3. Close both files, delete original file, and rename temp file to original.",
            "markingScheme": "1 Mark for copying non-matching rows, 1 Mark for file replacement via os module."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Write code to update the salary of employee with ID 'E101' to 60000 in 'emp.csv'.",
            "solution": "import csv, os\nwith open('emp.csv', 'r', newline='') as fin, open('temp.csv', 'w', newline='') as fout:\n    r = csv.reader(fin)\n    w = csv.writer(fout)\n    for row in r:\n        if row and row[0] == 'E101':\n            row[3] = '60000'\n        w.writerow(row)\nos.remove('emp.csv')\nos.rename('temp.csv', 'emp.csv')",
            "markingScheme": "1 Mark for updating row[3], 1 Mark for file replacement."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function delete_student_csv(filename, roll_to_delete) that removes the student record from filename using a temporary file.",
            "solution": "import csv, os\n\ndef delete_student_csv(filename, roll_to_delete):\n    deleted = False\n    with open(filename, 'r', newline='') as fin, open('temp.csv', 'w', newline='') as fout:\n        r = csv.reader(fin)\n        w = csv.writer(fout)\n        for row in r:\n            if row and row[0] == str(roll_to_delete):\n                deleted = True\n            else:\n                w.writerow(row)\n    os.remove(filename)\n    os.rename('temp.csv', filename)\n    return deleted",
            "markingScheme": "1 Mark for temp file loop, 1 Mark for skipping matched roll, 1 Mark for os.remove and rename."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function update_product_price(filename, item_id, new_price) that updates price in 'products.csv' (cols: id, name, price).",
            "solution": "import csv, os\n\ndef update_product_price(filename, item_id, new_price):\n    with open(filename, 'r', newline='') as fin, open('temp.csv', 'w', newline='') as fout:\n        r = csv.reader(fin)\n        w = csv.writer(fout)\n        for row in r:\n            if row and row[0] == str(item_id):\n                row[2] = str(new_price)\n            w.writerow(row)\n    os.remove(filename)\n    os.rename('temp.csv', filename)",
            "markingScheme": "1 Mark for finding item_id, 1 Mark for updating price column, 1 Mark for clean rewrite."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete Python program to manage bank customer records in 'accounts.csv' with columns: AccNo, Name, Type, Balance.\n1. create_account(acc, name, atype, bal)\n2. deposit(acc, amount): Adds amount to balance.\n3. withdraw(acc, amount): Deducts amount if balance >= amount, else displays 'Insufficient Balance'.\n4. display_all(): Displays all records neatly.",
            "solution": "import csv, os\n\ndef create_account(acc, name, atype, bal):\n    with open('accounts.csv', 'a', newline='') as f:\n        csv.writer(f).writerow([acc, name, atype, bal])\n\ndef update_balance(acc, amount, is_deposit):\n    success = False\n    with open('accounts.csv', 'r', newline='') as fin, open('temp_acc.csv', 'w', newline='') as fout:\n        r = csv.reader(fin)\n        w = csv.writer(fout)\n        for row in r:\n            if row and row[0] == str(acc):\n                bal = float(row[3])\n                if is_deposit:\n                    bal += amount\n                    row[3] = str(bal)\n                    success = True\n                else:\n                    if bal >= amount:\n                        bal -= amount\n                        row[3] = str(bal)\n                        success = True\n                    else:\n                        print('Insufficient Balance!')\n            w.writerow(row)\n    os.remove('accounts.csv')\n    os.rename('temp_acc.csv', 'accounts.csv')\n    return success\n\ndef display_all():\n    with open('accounts.csv', 'r', newline='') as f:\n        for row in csv.reader(f):\n            print(' | '.join(row))",
            "markingScheme": "1.5 Marks for create_account, 3 Marks for deposit/withdraw with validation and temp file rewrite, 1.5 Marks for display_all."
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Dictionary Reader & Writer (DictReader & DictWriter)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What does each iteration of csv.DictReader return?\n(a) A list of strings\n(b) A dictionary mapping column names to values\n(c) A tuple of keys\n(d) A single formatted string",
            "solution": "(b) A dictionary mapping column names to values.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which method must be called to write the field names as the first line when using csv.DictWriter?\n(a) writer.write_columns()\n(b) writer.writeheader()\n(c) writer.init_fields()\n(d) writer.writerow_header()",
            "solution": "(b) writer.writeheader().",
            "markingScheme": "1 Mark for (b) writeheader()."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What parameter is required when creating a csv.DictWriter object in addition to the file handle?",
            "solution": "fieldnames (a list or sequence of string field names).",
            "markingScheme": "1 Mark for fieldnames."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What happens if a dictionary written with DictWriter.writerow() has an extra key not listed in fieldnames?",
            "solution": "It raises a ValueError: dict contains fields not in fieldnames.",
            "markingScheme": "1 Mark for ValueError."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output:\nimport csv\nwith open('user.csv', 'w', newline='') as f:\n    w = csv.DictWriter(f, fieldnames=['uid', 'name'])\n    w.writeheader()\n    w.writerow({'uid': '1', 'name': 'Aditi'})\nwith open('user.csv', 'r', newline='') as f:\n    r = csv.DictReader(f)\n    for row in r:\n        print(row['name'])",
            "solution": "Output:\nAditi",
            "markingScheme": "2 Marks for Aditi."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "State the main advantage of DictReader over standard reader().",
            "solution": "DictReader maps each field to its column name header as dictionary keys, making code more readable and resilient to column reordering compared to integer indexing.",
            "markingScheme": "1 Mark for access by column name, 1 Mark for resilience against index reordering."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function write_books_dict(filename, books) that writes a list of book dictionaries {'isbn', 'title', 'price'} to a CSV file using DictWriter.",
            "solution": "import csv\n\ndef write_books_dict(filename, books):\n    fields = ['isbn', 'title', 'price']\n    with open(filename, 'w', newline='') as f:\n        writer = csv.DictWriter(f, fieldnames=fields)\n        writer.writeheader()\n        writer.writerows(books)",
            "markingScheme": "1 Mark for fieldnames setup, 1 Mark for writeheader(), 1 Mark for writerows(books)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function read_high_scorers_dict(filename) that reads 'results.csv' with DictReader and prints names of all students with marks >= 90.",
            "solution": "import csv\n\ndef read_high_scorers_dict(filename):\n    with open(filename, 'r', newline='') as f:\n        reader = csv.DictReader(f)\n        for row in reader:\n            if float(row['marks']) >= 90:\n                print(row['name'])",
            "markingScheme": "1 Mark for DictReader, 1.5 Marks for float(row['marks']) >= 90, 0.5 Mark for printing name."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program using DictReader and DictWriter to process 'sales.csv' containing: TransID, Product, Units, UnitPrice.\n1. compute_total_revenue(): Reads 'sales.csv', computes Revenue = Units * UnitPrice for each row, and writes TransID, Product, Revenue into 'revenue.csv'.\n2. summarize_product_units(): Displays the total units sold for each unique product.",
            "solution": "import csv\n\ndef compute_total_revenue():\n    with open('sales.csv', 'r', newline='') as fin, open('revenue.csv', 'w', newline='') as fout:\n        reader = csv.DictReader(fin)\n        writer = csv.DictWriter(fout, fieldnames=['TransID', 'Product', 'Revenue'])\n        writer.writeheader()\n        for row in reader:\n            rev = int(row['Units']) * float(row['UnitPrice'])\n            writer.writerow({'TransID': row['TransID'], 'Product': row['Product'], 'Revenue': rev})\n\ndef summarize_product_units():\n    product_sales = {}\n    with open('sales.csv', 'r', newline='') as f:\n        reader = csv.DictReader(f)\n        for row in reader:\n            prod = row['Product']\n            units = int(row['Units'])\n            product_sales[prod] = product_sales.get(prod, 0) + units\n    for prod, units in product_sales.items():\n        print(f'{prod}: {units} units sold')",
            "markingScheme": "3 Marks for compute_total_revenue (DictWriter writeheader & math calculation), 3 Marks for summarize_product_units (dictionary aggregation & output)."
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Tabular Data Cleansing & Validation in CSV",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which exception occurs when float() fails on a non-numeric string read from a CSV column?\n(a) TypeError\n(b) ValueError\n(c) KeyError\n(d) DataError",
            "solution": "(b) ValueError.",
            "markingScheme": "1 Mark for (b) ValueError."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the purpose of lineterminator parameter in csv.writer?",
            "solution": "It specifies the character sequence used to terminate lines produced by the writer (defaults to '\\r\\n').",
            "markingScheme": "1 Mark for line termination sequence specification."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "How do you detect and skip empty rows while iterating through csv.reader?",
            "solution": "Check `if not row:` or `if len(row) == 0:` before accessing columns.",
            "markingScheme": "1 Mark for checking if row is empty."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether csv files can contain mixed delimiters in the same row.",
            "solution": "No. A CSV parser expects a uniform delimiter across all columns according to the specified format.",
            "markingScheme": "1 Mark for No (uniform delimiter expected)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write code to validate that every row in 'data.csv' contains exactly 4 non-empty fields.",
            "solution": "import csv\nwith open('data.csv', 'r', newline='') as f:\n    for i, row in enumerate(csv.reader(f), start=1):\n        if len(row) != 4 or any(fld.strip() == '' for fld in row):\n            print(f'Invalid row at line {i}: {row}')",
            "markingScheme": "1 Mark for length 4 check, 1 Mark for non-empty field check."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What happens if a CSV file is opened in 'r+' mode?",
            "solution": "The file is opened for both reading and writing without truncation. However, writing variable length text rows in-place will overwrite following bytes.",
            "markingScheme": "1 Mark for read/write without truncation, 1 Mark for byte overwrite risk."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function clean_csv(src_file, dest_file) that removes all leading and trailing whitespace from every field in src_file and writes the cleaned data to dest_file.",
            "solution": "import csv\n\ndef clean_csv(src_file, dest_file):\n    with open(src_file, 'r', newline='') as fin, open(dest_file, 'w', newline='') as fout:\n        r = csv.reader(fin)\n        w = csv.writer(fout)\n        for row in r:\n            clean_row = [field.strip() for field in row]\n            w.writerow(clean_row)",
            "markingScheme": "1 Mark for file setup, 1.5 Marks for list comprehension field.strip(), 0.5 Mark for writerow."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function filter_valid_emails(csv_file) that displays all rows where the email column (index 2) contains '@' and ends with a valid domain (e.g. '.com' or '.org').",
            "solution": "import csv\n\ndef filter_valid_emails(csv_file):\n    with open(csv_file, 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            if len(row) > 2:\n                email = row[2].strip()\n                if '@' in email and (email.endswith('.com') or email.endswith('.org')):\n                    print(row)",
            "markingScheme": "1 Mark for row check, 1.5 Marks for email domain check, 0.5 Mark for print."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program that reads 'voters.csv' (VoterID, Name, Age, Constituency).\n1. Segregate voters into two new CSV files:\n   - 'eligible_voters.csv' (Age >= 18)\n   - 'underage.csv' (Age < 18)\n2. Handle non-numeric Age values gracefully by printing a warning and skipping the invalid row.\n3. Display the final count of eligible voters and underage entries.",
            "solution": "import csv\n\ndef segregate_voters():\n    eligible_count = 0\n    underage_count = 0\n    with open('voters.csv', 'r', newline='') as fin, \\\n         open('eligible_voters.csv', 'w', newline='') as f_el, \\\n         open('underage.csv', 'w', newline='') as f_un:\n        r = csv.reader(fin)\n        w_el = csv.writer(f_el)\n        w_un = csv.writer(f_un)\n        header = next(r)\n        w_el.writerow(header)\n        w_un.writerow(header)\n        for row in r:\n            if not row: continue\n            try:\n                age = int(row[2].strip())\n                if age >= 18:\n                    w_el.writerow(row)\n                    eligible_count += 1\n                else:\n                    w_un.writerow(row)\n                    underage_count += 1\n            except ValueError:\n                print(f'Warning: Invalid age {row[2]} in record {row}')\n    print(f'Eligible Voters: {eligible_count}')\n    print(f'Underage Entries: {underage_count}')",
            "markingScheme": "2 Marks for multiple file handlers & header copying, 2 Marks for try-except ValueError on age, 2 Marks for conditional distribution and counts."
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Sorting, Grouping & Multi-Column Aggregations in CSV",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "How can you sort CSV rows by their second column in descending numerical order?\n(a) rows.sort(key=lambda r: float(r[1]), reverse=True)\n(b) rows.sort(col=2, desc=True)\n(c) csv.sort(rows, 2)\n(d) sorted(rows, key=2)",
            "solution": "(a) rows.sort(key=lambda r: float(r[1]), reverse=True).",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What built-in collection type is best suited for grouping CSV records by category or department?",
            "solution": "Dictionary (dict) or collections.defaultdict.",
            "markingScheme": "1 Mark for dictionary / defaultdict."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "True or False: csv.reader reads the entire file into RAM at the moment it is initialized.",
            "solution": "False. csv.reader is an iterator that yields one row at a time as requested.",
            "markingScheme": "1 Mark for False (it is a lazy stream iterator)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What function joins a list of strings into a single delimited line?",
            "solution": "str.join() (e.g. ','.join(row)).",
            "markingScheme": "1 Mark for join()."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write code to find the highest price among all items in 'items.csv' (cols: id, name, price).",
            "solution": "import csv\nwith open('items.csv', 'r', newline='') as f:\n    r = csv.reader(f)\n    next(r)\n    max_p = max(float(row[2]) for row in r)\nprint('Highest Price:', max_p)",
            "markingScheme": "1 Mark for generator with float(row[2]), 1 Mark for max()."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain how to group employee records by department using a Python dictionary.",
            "solution": "Create an empty dictionary `groups = {}`. Iterate through rows; for each row extract `dept = row[2]`. Append the row to `groups.setdefault(dept, []).append(row)`.",
            "markingScheme": "1 Mark for dictionary structure, 1 Mark for appending to list under key."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function sort_students_by_marks(csv_file, output_file) that sorts students by their percentage in descending order and writes to output_file.",
            "solution": "import csv\n\ndef sort_students_by_marks(csv_file, output_file):\n    with open(csv_file, 'r', newline='') as f:\n        r = csv.reader(f)\n        header = next(r)\n        rows = list(r)\n    rows.sort(key=lambda x: float(x[2]), reverse=True)\n    with open(output_file, 'w', newline='') as f:\n        w = csv.writer(f)\n        w.writerow(header)\n        w.writerows(rows)",
            "markingScheme": "1 Mark for reading list & header, 1.5 Marks for sort with lambda key and reverse=True, 0.5 Mark for writerows."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function count_by_department(csv_file) that prints the total headcount in each department from 'staff.csv' (cols: id, name, dept).",
            "solution": "import csv\n\ndef count_by_department(csv_file):\n    counts = {}\n    with open(csv_file, 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            dept = row[2]\n            counts[dept] = counts.get(dept, 0) + 1\n    for d, c in counts.items():\n        print(f'{d}: {c}')",
            "markingScheme": "1 Mark for dictionary accumulation, 1.5 Marks for get(dept, 0) + 1, 0.5 Mark for print."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A CSV file 'scores.csv' stores [Roll, Name, Subject, Score]. Write a Python program with functions:\n1. subject_averages(): Calculates and displays the average score for each unique subject.\n2. find_subject_toppers(): Displays the student with the highest score in each subject.",
            "solution": "import csv\n\ndef subject_averages():\n    sub_scores = {}\n    with open('scores.csv', 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            sub = row[2]\n            sc = float(row[3])\n            if sub not in sub_scores: sub_scores[sub] = []\n            sub_scores[sub].append(sc)\n    for sub, scores in sub_scores.items():\n        print(f'{sub} Average: {sum(scores)/len(scores):.2f}')\n\ndef find_subject_toppers():\n    sub_toppers = {}\n    with open('scores.csv', 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            sub = row[2]\n            name = row[1]\n            sc = float(row[3])\n            if sub not in sub_toppers or sc > sub_toppers[sub][1]:\n                sub_toppers[sub] = (name, sc)\n    for sub, (name, sc) in sub_toppers.items():\n        print(f'{sub} Topper: {name} ({sc})')",
            "markingScheme": "3 Marks for subject_averages (grouping by subject and computing mean), 3 Marks for find_subject_toppers (tracking max score per subject)."
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Multi-CSV File Merging, Joins & Cross-Table Lookups",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What relational database operation corresponds to joining two CSV files on a common key column?\n(a) Projection\n(b) Selection\n(c) Equi-Join / Natural Join\n(d) Union",
            "solution": "(c) Equi-Join / Natural Join.",
            "markingScheme": "1 Mark for (c)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "How do you look up related records efficiently from a second CSV file?\n(a) Store second CSV in a Python dictionary indexed by key\n(b) Nested file reading loops reopening the file for each row\n(c) Re-read entire disk sector\n(d) Use recursion",
            "solution": "(a) Store the second CSV in a Python dictionary indexed by the common key for O(1) lookup time.",
            "markingScheme": "1 Mark for dictionary lookup indexed by key."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What happens if a row contains fewer fields than the header when processed by csv.DictReader?",
            "solution": "Missing fields are assigned the value of restval (which defaults to None).",
            "markingScheme": "1 Mark for assigned None / restval."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "True or False: writerow() can accept a dictionary if using csv.writer.",
            "solution": "False. csv.writer expects a sequence (list/tuple) of values, not a dictionary. Use csv.DictWriter for dictionaries.",
            "markingScheme": "1 Mark for False (DictWriter required for dicts)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write code to combine rows from 'jan_sales.csv' and 'feb_sales.csv' into 'total_sales.csv'.",
            "solution": "import csv\nwith open('total_sales.csv', 'w', newline='') as fout:\n    w = csv.writer(fout)\n    for fname in ['jan_sales.csv', 'feb_sales.csv']:\n        with open(fname, 'r', newline='') as fin:\n            r = csv.reader(fin)\n            w.writerows(r)",
            "markingScheme": "1 Mark for file looping, 1 Mark for writerows."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain why reopening a file repeatedly inside a loop is bad practice.",
            "solution": "It causes repeated disk I/O, heavy file system overhead, and severe performance degradation. Data should be loaded into memory (like a dictionary) once.",
            "markingScheme": "1 Mark for disk I/O overhead, 1 Mark for memory caching recommendation."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function join_student_course(students_csv, courses_csv, output_csv) that combines student details (Roll, Name, CourseID) with course titles (CourseID, Title) into output_csv (Roll, Name, CourseTitle).",
            "solution": "import csv\n\ndef join_student_course(students_csv, courses_csv, output_csv):\n    # 1. Load courses into dictionary\n    courses = {}\n    with open(courses_csv, 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            courses[row[0]] = row[1]\n            \n    # 2. Join with students\n    with open(students_csv, 'r', newline='') as fin, open(output_csv, 'w', newline='') as fout:\n        r = csv.reader(fin)\n        w = csv.writer(fout)\n        next(r)\n        w.writerow(['Roll', 'Name', 'CourseTitle'])\n        for row in r:\n            cid = row[2]\n            ctitle = courses.get(cid, 'Unknown')\n            w.writerow([row[0], row[1], ctitle])",
            "markingScheme": "1 Mark for courses dictionary loading, 1.5 Marks for reading students and mapping course title, 0.5 Mark for writing joined CSV."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function find_unmatched_records(file1, file2) that prints all IDs present in file1 but missing from file2.",
            "solution": "import csv\n\ndef find_unmatched_records(file1, file2):\n    with open(file2, 'r', newline='') as f2:\n        r2 = csv.reader(f2)\n        next(r2)\n        ids2 = set(row[0] for row in r2)\n    with open(file1, 'r', newline='') as f1:\n        r1 = csv.reader(f1)\n        next(r1)\n        for row in r1:\n            if row[0] not in ids2:\n                print('Unmatched in file2:', row[0])",
            "markingScheme": "1.5 Marks for set of IDs from file2, 1.5 Marks for checking membership not in ids2."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "You have two CSV files: 'students.csv' [Roll, Name] and 'marks.csv' [Roll, Subject, Marks]. Write a complete Python program with functions:\n1. create_report_card(roll): Looks up the student's name from 'students.csv', then retrieves all subject marks for that roll from 'marks.csv', prints a formatted marksheet, and calculates the total percentage.\n2. generate_class_gazette(): Merges all student records with their overall percentage and writes [Roll, Name, TotalMarks, Percentage] to 'gazette.csv'.",
            "solution": "import csv\n\ndef create_report_card(roll_target):\n    # Get student name\n    name = None\n    with open('students.csv', 'r', newline='') as f:\n        for row in csv.reader(f):\n            if row and row[0] == str(roll_target):\n                name = row[1]; break\n    if not name:\n        print('Student not found!'); return\n        \n    print(f'=== MARKSHEET: {name} (Roll: {roll_target}) ===')\n    total = count = 0\n    with open('marks.csv', 'r', newline='') as f:\n        for row in csv.reader(f):\n            if row and row[0] == str(roll_target):\n                print(f'{row[1]}: {row[2]}')\n                total += float(row[2])\n                count += 1\n    if count > 0:\n        pct = total / count\n        print(f'Total Marks: {total} | Percentage: {pct:.2f}%')\n\ndef generate_class_gazette():\n    students = {}\n    with open('students.csv', 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r: students[row[0]] = row[1]\n        \n    student_marks = {}\n    with open('marks.csv', 'r', newline='') as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            roll = row[0]\n            m = float(row[2])\n            student_marks.setdefault(roll, []).append(m)\n            \n    with open('gazette.csv', 'w', newline='') as f:\n        w = csv.writer(f)\n        w.writerow(['Roll', 'Name', 'TotalMarks', 'Percentage'])\n        for roll, name in students.items():\n            marks = student_marks.get(roll, [])\n            tot = sum(marks)\n            pct = tot / len(marks) if marks else 0\n            w.writerow([roll, name, tot, round(pct, 2)])",
            "markingScheme": "3 Marks for create_report_card (lookup name + fetch marks + percentage), 3 Marks for generate_class_gazette (dictionary mapping, total, percentage and gazette write)."
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Complete CSV File Handling & Board Examination Mastery",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which mode must be passed to open() when reading a CSV file?\n(a) 'r'\n(b) 'rb'\n(c) 'w'\n(d) 'a'",
            "solution": "(a) 'r'. CSV files are text-based files opened in text read mode.",
            "markingScheme": "1 Mark for (a) 'r'."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is returned by csv.reader()?\n(a) An iterator object yielding rows as lists of strings\n(b) A single string with whole file\n(c) A dictionary\n(d) A tuple of tuples",
            "solution": "(a) An iterator object yielding rows as lists of strings.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What happens if delimiter='\\t' is used in csv.writer?",
            "solution": "Fields are separated by tab characters instead of commas.",
            "markingScheme": "1 Mark for tab character separation."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the importance of newline='' in open() for CSV writers.",
            "solution": "Prevents automatic generation of blank lines between consecutive rows on Windows systems.",
            "markingScheme": "1 Mark for preventing unwanted blank lines."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Trace the output:\nimport csv\nwith open('nums.csv', 'w', newline='') as f:\n    csv.writer(f).writerows([[1, 2], [3, 4]])\nwith open('nums.csv', 'r', newline='') as f:\n    rows = list(csv.reader(f))\n    print(rows[1][0], type(rows[1][0]))",
            "solution": "rows[1][0] is '3' (as a string).\nOutput:\n3 <class 'str'>",
            "markingScheme": "1 Mark for '3', 1 Mark for <class 'str'>."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "State two differences between a text file and a CSV file.",
            "solution": "1. A CSV file is a specialized text file where data is strictly structured in rows and columns separated by standard delimiters.\n2. CSV files are parsed using the csv module into lists/dicts, whereas text files are read as raw unparsed strings/lines.",
            "markingScheme": "1 Mark for tabular structured data with delimiters, 1 Mark for parsing into lists/dicts."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function count_words_in_csv(filename) that counts the total number of words across all fields in all rows of a CSV file.",
            "solution": "import csv\n\ndef count_words_in_csv(filename):\n    total_words = 0\n    with open(filename, 'r', newline='') as f:\n        for row in csv.reader(f):\n            for field in row:\n                total_words += len(field.split())\n    return total_words",
            "markingScheme": "1 Mark for nested iteration over rows and fields, 1.5 Marks for splitting fields into words, 0.5 Mark for returning count."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function backup_csv_with_timestamp(source_csv) that reads source_csv and writes a copy to a new file named backup_YYYYMMDD.csv.",
            "solution": "import csv, datetime\n\ndef backup_csv_with_timestamp(source_csv):\n    date_str = datetime.datetime.now().strftime('%Y%m%d')\n    dest_name = f'backup_{date_str}.csv'\n    with open(source_csv, 'r', newline='') as fin, open(dest_name, 'w', newline='') as fout:\n        w = csv.writer(fout)\n        for row in csv.reader(fin):\n            w.writerow(row)\n    print(f'Backup created: {dest_name}')",
            "markingScheme": "1 Mark for datetime formatting, 1.5 Marks for row copying, 0.5 Mark for output confirmation."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete modular Python program to manage hotel room reservations in 'hotel.csv' [RoomNo, GuestName, RoomType, TariffPerDay, DaysBooked].\n1. add_reservation(room_no, name, rtype, tariff, days)\n2. view_all_bookings()\n3. calculate_bill(room_no): Finds the booking, computes Total = TariffPerDay * DaysBooked, prints the invoice, and removes the booking from 'hotel.csv' upon checkout using a temp file.\n4. revenue_by_type(): Displays the total revenue earned categorized by RoomType.",
            "solution": "import csv, os\n\ndef add_reservation(room_no, name, rtype, tariff, days):\n    with open('hotel.csv', 'a', newline='') as f:\n        csv.writer(f).writerow([room_no, name, rtype, tariff, days])\n\ndef view_all_bookings():\n    with open('hotel.csv', 'r', newline='') as f:\n        for row in csv.reader(f):\n            print(' | '.join(row))\n\ndef calculate_bill(room_no):\n    checked_out = False\n    with open('hotel.csv', 'r', newline='') as fin, open('temp_h.csv', 'w', newline='') as fout:\n        r = csv.reader(fin)\n        w = csv.writer(fout)\n        for row in r:\n            if row and row[0] == str(room_no):\n                bill = float(row[3]) * int(row[4])\n                print(f'Invoice for {row[1]}: Room {row[0]} ({row[2]}) -> Total: Rs. {bill}')\n                checked_out = True\n            else:\n                w.writerow(row)\n    os.remove('hotel.csv')\n    os.rename('temp_h.csv', 'hotel.csv')\n    return checked_out\n\ndef revenue_by_type():\n    type_rev = {}\n    with open('hotel.csv', 'r', newline='') as f:\n        r = csv.reader(f)\n        for row in r:\n            if not row: continue\n            rtype = row[2]\n            rev = float(row[3]) * int(row[4])\n            type_rev[rtype] = type_rev.get(rtype, 0.0) + rev\n    for rt, rev in type_rev.items():\n        print(f'{rt}: Rs. {rev:.2f}')",
            "markingScheme": "1 Mark for add_reservation, 1 Mark for view_all_bookings, 2 Marks for calculate_bill invoice & temp file removal, 2 Marks for revenue_by_type grouping."
          }
        ]
      }
    ]
  }
];
