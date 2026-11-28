export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: Employee Payroll & Department Records",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard MySQL syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "1A1",
            "marks": 1,
            "text": "Which SQL clause is used to eliminate duplicate rows from the output of a SELECT query?",
            "solution": "The DISTINCT keyword (e.g. SELECT DISTINCT Dept FROM Employee;).\n[Marking Scheme: 1 mark for naming DISTINCT correctly.]"
          },
          {
            "qId": "1A2",
            "marks": 1,
            "text": "Identify the error in the following SQL statement: SELECT * FROM Employee WHERE Salary = NULL;",
            "solution": "NULL cannot be checked using the equality operator (=). The correct syntax is: 'WHERE Salary IS NULL'.\n[Marking Scheme: 1 mark for identifying the invalid '= NULL' operator and suggesting 'IS NULL'.]"
          },
          {
            "qId": "1A3",
            "marks": 1,
            "text": "Write the wildcard pattern to match any employee name ending with the letter 'a'.",
            "solution": "'%a' (e.g. WHERE EName LIKE '%a')\n[Marking Scheme: 1 mark for correct '%a' pattern.]"
          },
          {
            "qId": "1A4",
            "marks": 1,
            "text": "What will happen if the WHERE clause is omitted in a DELETE FROM statement?",
            "solution": "All rows/tuples of the table will be deleted, leaving the empty table structure intact.\n[Marking Scheme: 1 mark for stating that all tuples are deleted and schema persists.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "1B1",
            "marks": 2,
            "text": "Differentiate between the BETWEEN ... AND operator and the IN operator with suitable SQL examples.",
            "solution": "1. BETWEEN ... AND specifies an inclusive continuous range (e.g. WHERE Salary BETWEEN 30000 AND 50000 includes all values from 30000 to 50000).\n2. IN specifies a discrete list of explicit values (e.g. WHERE Dept IN ('IT', 'HR') matches only these exact values).\n[Marking Scheme: 1 mark for conceptual difference, 1 mark for valid syntax/examples.]"
          },
          {
            "qId": "1B2",
            "marks": 2,
            "text": "Predict the output of the following SQL query on table Employee:\nSELECT EName, Salary * 1.10 AS NewSalary FROM Employee WHERE Dept = 'IT' ORDER BY Salary DESC;",
            "solution": "The query projects names of all employees in the 'IT' department along with their salary increased by 10% under column heading 'NewSalary', ordered from highest base salary to lowest.\n[Marking Scheme: 1 mark for correct projection and computation, 1 mark for correct descending order.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "1C1",
            "marks": 3,
            "text": "Consider table Employee (EmpNo INT, EName VARCHAR(30), Dept VARCHAR(20), Salary INT, Commission INT).\n(i) Increase salary by 5000 for employees in 'Sales' whose Commission is greater than 2000.\n(ii) Display all employees whose Commission is missing (NULL).\n(iii) Display distinct departments in alphabetical order.",
            "solution": "(i) UPDATE Employee SET Salary = Salary + 5000 WHERE Dept = 'Sales' AND Commission > 2000;\n(ii) SELECT * FROM Employee WHERE Commission IS NULL;\n(iii) SELECT DISTINCT Dept FROM Employee ORDER BY Dept ASC;\n[Marking Scheme: 1 mark for each correct SQL query.]"
          },
          {
            "qId": "1C2",
            "marks": 3,
            "text": "Write SQL queries for table Employee:\n(i) Display EName and Salary of employees whose name contains the substring 'an' anywhere.\n(ii) Display records of employees whose Dept is either 'HR' or 'IT' and Salary is at least 45000.\n(iii) Delete records of employees whose EmpNo is between 900 and 999.",
            "solution": "(i) SELECT EName, Salary FROM Employee WHERE EName LIKE '%an%';\n(ii) SELECT * FROM Employee WHERE Dept IN ('HR', 'IT') AND Salary >= 45000;\n(iii) DELETE FROM Employee WHERE EmpNo BETWEEN 900 AND 999;\n[Marking Scheme: 1 mark for each correct query.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "1D1",
            "marks": 6,
            "text": "Table: HOSPITAL (PId INT, PName VARCHAR(30), Age INT, Dept VARCHAR(20), DateOfAdm DATE, Charges DECIMAL(8,2), Sex CHAR(1))\nWrite SQL queries for (a) to (e) and predict output for (f):\n(a) Display PName and Age of all Female patients admitted after '2023-01-01'.\n(b) Display records of patients who were admitted to 'Cardiology' or 'Neurology' with Charges > 15000.\n(c) Display distinct Departments present in the table.\n(d) Increase Charges by 15% for all patients in 'ICU'.\n(e) Delete records of patients whose Age is above 85.\n(f) What is the output of: SELECT PName, Charges FROM HOSPITAL WHERE Age BETWEEN 20 AND 30 ORDER BY Charges DESC;",
            "solution": "(a) SELECT PName, Age FROM HOSPITAL WHERE Sex = 'F' AND DateOfAdm > '2023-01-01';\n(b) SELECT * FROM HOSPITAL WHERE Dept IN ('Cardiology', 'Neurology') AND Charges > 15000;\n(c) SELECT DISTINCT Dept FROM HOSPITAL;\n(d) UPDATE HOSPITAL SET Charges = Charges * 1.15 WHERE Dept = 'ICU';\n(e) DELETE FROM HOSPITAL WHERE Age > 85;\n(f) Displays names and charges of patients aged 20 to 30 (inclusive), ordered from highest charges to lowest.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Student Academic Performance & Stream Allocation",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard MySQL syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "2A1",
            "marks": 1,
            "text": "Which SQL operator is used to search for a pattern in a string column?",
            "solution": "The LIKE operator (along with % and _ wildcards).\n[Marking Scheme: 1 mark for LIKE.]"
          },
          {
            "qId": "2A2",
            "marks": 1,
            "text": "What is the result of evaluating 'SELECT 50 + NULL;'?",
            "solution": "NULL. Any arithmetic operation involving a NULL operand results in NULL.\n[Marking Scheme: 1 mark for answering NULL.]"
          },
          {
            "qId": "2A3",
            "marks": 1,
            "text": "Write a SQL clause to arrange student records in alphabetical order of their SName.",
            "solution": "ORDER BY SName ASC; (or simply ORDER BY SName;)\n[Marking Scheme: 1 mark for valid ORDER BY clause.]"
          },
          {
            "qId": "2A4",
            "marks": 1,
            "text": "State whether the BETWEEN operator includes or excludes the boundary values.",
            "solution": "The BETWEEN operator in SQL is INCLUSIVE of both the lower and upper boundary values.\n[Marking Scheme: 1 mark for stating inclusive.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "2B1",
            "marks": 2,
            "text": "Differentiate between the '%' and '_' wildcard symbols in the LIKE operator with one example of each.",
            "solution": "1. '%' represents zero or more characters (e.g. 'A%' matches 'A', 'Amit', 'Anuradha').\n2. '_' represents exactly one single character (e.g. 'A_' matches 'An', 'Al', 'At' - exactly 2 characters).\n[Marking Scheme: 1 mark for % definition & example, 1 mark for _ definition & example.]"
          },
          {
            "qId": "2B2",
            "marks": 2,
            "text": "Consider the table Student (RollNo, SName, Stream, Marks). Write a query to display all students who do NOT belong to 'Arts' or 'Commerce' streams.",
            "solution": "SELECT * FROM Student WHERE Stream NOT IN ('Arts', 'Commerce');\n(OR: SELECT * FROM Student WHERE Stream <> 'Arts' AND Stream <> 'Commerce';)\n[Marking Scheme: 2 marks for correct query (1 mark if partial error).]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "2C1",
            "marks": 3,
            "text": "Table: STUDENT (RollNo INT, Name VARCHAR(30), Stream VARCHAR(15), Marks DECIMAL(5,2), Grade CHAR(1))\n(i) Insert a new student: (105, 'Tanvi Sen', 'Science', 92.5, 'A').\n(ii) Update Grade to 'A' for all students having Marks >= 90.\n(iii) Display Name and Marks of students whose marks are between 75 and 89 (inclusive).",
            "solution": "(i) INSERT INTO STUDENT VALUES (105, 'Tanvi Sen', 'Science', 92.5, 'A');\n(ii) UPDATE STUDENT SET Grade = 'A' WHERE Marks >= 90;\n(iii) SELECT Name, Marks FROM STUDENT WHERE Marks BETWEEN 75 AND 89;\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "2C2",
            "marks": 3,
            "text": "Write SQL queries for table STUDENT:\n(i) Display all students whose Name starts with 'S' and has at least 4 characters.\n(ii) Display Name and Stream of all students whose Grade is NOT NULL.\n(iii) Display all records sorted primarily by Stream ascending, and secondarily by Marks descending.",
            "solution": "(i) SELECT * FROM STUDENT WHERE Name LIKE 'S___%';\n(ii) SELECT Name, Stream FROM STUDENT WHERE Grade IS NOT NULL;\n(iii) SELECT * FROM STUDENT ORDER BY Stream ASC, Marks DESC;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "2D1",
            "marks": 6,
            "text": "Table: LIBRARY (BookId INT, Title VARCHAR(40), Author VARCHAR(30), Subject VARCHAR(20), Price DECIMAL(6,2), IssuedDate DATE)\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display Title and Price of all books of Subject 'Computer' with Price < 500.\n(b) Display all books whose Author's name ends with 'Sharma'.\n(c) Display Title, Price and DiscountedPrice (Price with 10% discount) with appropriate column alias.\n(d) Change the Subject of BookId 108 to 'Data Science'.\n(e) Delete all books whose Price is NULL.\n(f) Predict output: SELECT DISTINCT Subject FROM LIBRARY ORDER BY Subject DESC;",
            "solution": "(a) SELECT Title, Price FROM LIBRARY WHERE Subject = 'Computer' AND Price < 500;\n(b) SELECT * FROM LIBRARY WHERE Author LIKE '%Sharma';\n(c) SELECT Title, Price, Price * 0.90 AS DiscountedPrice FROM LIBRARY;\n(d) UPDATE LIBRARY SET Subject = 'Data Science' WHERE BookId = 108;\n(e) DELETE FROM LIBRARY WHERE Price IS NULL;\n(f) Displays distinct subject names from the library in reverse alphabetical (descending) order without any duplicates.\n[Marking Scheme: 1 mark for each sub-part (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Retail Supermarket & Inventory Management",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard MySQL syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "3A1",
            "marks": 1,
            "text": "Write the SQL keyword used to rename an output column heading in a SELECT query.",
            "solution": "AS (e.g. SELECT Price * 1.18 AS TotalPrice FROM Item;)\n[Marking Scheme: 1 mark for 'AS'.]"
          },
          {
            "qId": "3A2",
            "marks": 1,
            "text": "Which logical operator returns TRUE only when BOTH connected conditions are true?",
            "solution": "The AND operator.\n[Marking Scheme: 1 mark for AND.]"
          },
          {
            "qId": "3A3",
            "marks": 1,
            "text": "Write a LIKE pattern to match string values where the second character is 'E'.",
            "solution": "'_E%' (underscore followed by E, followed by percent).\n[Marking Scheme: 1 mark for '_E%'.]"
          },
          {
            "qId": "3A4",
            "marks": 1,
            "text": "What will 'DELETE FROM Item WHERE Qty = 0;' do?",
            "solution": "It will delete only those items from table Item whose quantity is exactly zero.\n[Marking Scheme: 1 mark for correct explanation.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "3B1",
            "marks": 2,
            "text": "What is the difference between DELETE FROM Item and DROP TABLE Item?",
            "solution": "1. DELETE FROM Item is a DML command that removes all rows from the table, but preserves the table structure and column definitions.\n2. DROP TABLE Item is a DDL command that completely deletes the table structure, metadata, and all rows from the database catalog.\n[Marking Scheme: 1 mark for DELETE, 1 mark for DROP.]"
          },
          {
            "qId": "3B2",
            "marks": 2,
            "text": "Write a query to display all items from table Item whose Category is either 'Beverages', 'Bakery', or 'Dairy'.",
            "solution": "SELECT * FROM Item WHERE Category IN ('Beverages', 'Bakery', 'Dairy');\n[Marking Scheme: 2 marks for correct query.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "3C1",
            "marks": 3,
            "text": "Table: ITEM (ItemCode INT, ItemName VARCHAR(30), Category VARCHAR(20), Price DECIMAL(7,2), Stock INT)\n(i) Add a new product: (201, 'Dark Chocolate', 'Confectionery', 120.00, 50).\n(ii) Increase the price by 5% for all items in the 'Dairy' category.\n(iii) Display ItemName and Stock of all items having Stock between 10 and 30.",
            "solution": "(i) INSERT INTO ITEM VALUES (201, 'Dark Chocolate', 'Confectionery', 120.00, 50);\n(ii) UPDATE ITEM SET Price = Price * 1.05 WHERE Category = 'Dairy';\n(iii) SELECT ItemName, Stock FROM ITEM WHERE Stock BETWEEN 10 AND 30;\n[Marking Scheme: 1 mark for each query.]"
          },
          {
            "qId": "3C2",
            "marks": 3,
            "text": "Write SQL queries for table ITEM:\n(i) Display ItemName and Price of items where Price is greater than 200 and Category is NOT 'Bakery'.\n(ii) Display all distinct Categories in descending alphabetical order.\n(iii) Delete items whose Stock is NULL.",
            "solution": "(i) SELECT ItemName, Price FROM ITEM WHERE Price > 200 AND Category <> 'Bakery';\n(ii) SELECT DISTINCT Category FROM ITEM ORDER BY Category DESC;\n(iii) DELETE FROM ITEM WHERE Stock IS NULL;\n[Marking Scheme: 1 mark for each query.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "3D1",
            "marks": 6,
            "text": "Table: STORE (PCode INT, PName VARCHAR(30), Company VARCHAR(20), Price INT, Qty INT, MfgDate DATE)\nWrite SQL statements for (a) to (e) and write output for (f):\n(a) Display PName and Price of products manufactured by 'Nestle' or 'Cadbury'.\n(b) Display all products manufactured after '2023-06-01' having Price >= 100.\n(c) Display PName and TotalStockValue (Price * Qty) with heading 'Total_Value'.\n(d) Reduce the Price by 10 for all products whose MfgDate is before '2023-01-01'.\n(e) Delete all products with Qty < 5.\n(f) Predict output: SELECT PName, Price FROM STORE WHERE PName LIKE '%b%' ORDER BY Price ASC;",
            "solution": "(a) SELECT PName, Price FROM STORE WHERE Company IN ('Nestle', 'Cadbury');\n(b) SELECT * FROM STORE WHERE MfgDate > '2023-06-01' AND Price >= 100;\n(c) SELECT PName, Price * Qty AS Total_Value FROM STORE;\n(d) UPDATE STORE SET Price = Price - 10 WHERE MfgDate < '2023-01-01';\n(e) DELETE FROM STORE WHERE Qty < 5;\n(f) Displays PName and Price of all products whose name contains the letter 'b' (case-insensitive in standard MySQL), sorted from lowest to highest price.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Airline Flight Schedules & Passenger Bookings",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard MySQL syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "4A1",
            "marks": 1,
            "text": "Which SQL command is used to modify values of attributes in existing tuples?",
            "solution": "UPDATE (e.g. UPDATE Flight SET Fare = 4500 WHERE FlightNo = 'AI202';)\n[Marking Scheme: 1 mark for UPDATE.]"
          },
          {
            "qId": "4A2",
            "marks": 1,
            "text": "Write a query to display all records where Origin is NOT 'Delhi'.",
            "solution": "SELECT * FROM Flight WHERE Origin <> 'Delhi'; (OR Origin != 'Delhi')\n[Marking Scheme: 1 mark for valid syntax.]"
          },
          {
            "qId": "4A3",
            "marks": 1,
            "text": "What is the default sort order when ORDER BY is executed without ASC or DESC?",
            "solution": "Ascending order (ASC).\n[Marking Scheme: 1 mark for Ascending.]"
          },
          {
            "qId": "4A4",
            "marks": 1,
            "text": "Can a column alias defined using AS in SELECT be used in the WHERE clause? Why?",
            "solution": "No. In SQL logical query processing, WHERE is evaluated before SELECT, so the alias does not exist during WHERE execution.\n[Marking Scheme: 1 mark for 'No' with evaluation order reason.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "4B1",
            "marks": 2,
            "text": "Explain the importance of the WHERE clause in an UPDATE statement with an example.",
            "solution": "The WHERE clause restricts modification to specific target tuples. If omitted, every single row in the table is updated.\nExample: 'UPDATE Flight SET Fare = Fare + 500 WHERE Destination = 'Mumbai';' only increases Mumbai fares, whereas without WHERE, all flight fares are increased.\n[Marking Scheme: 1 mark for explanation, 1 mark for example.]"
          },
          {
            "qId": "4B2",
            "marks": 2,
            "text": "Write a query to find all flights whose FlightCode starts with '6E' and has exactly 5 characters.",
            "solution": "SELECT * FROM Flight WHERE FlightCode LIKE '6E___';\n[Marking Scheme: 2 marks for '6E___' pattern.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "4C1",
            "marks": 3,
            "text": "Table: FLIGHT (FlightNo VARCHAR(10), Airline VARCHAR(20), Origin VARCHAR(20), Dest VARCHAR(20), Fare INT, Seats INT)\n(i) Display all flights flying from 'Kolkata' to 'Bengaluru'.\n(ii) Display Airline and Fare of flights having Fare between 4000 and 8000.\n(iii) Increase Fare by 8% for all flights operated by 'IndiGo'.",
            "solution": "(i) SELECT * FROM FLIGHT WHERE Origin = 'Kolkata' AND Dest = 'Bengaluru';\n(ii) SELECT Airline, Fare FROM FLIGHT WHERE Fare BETWEEN 4000 AND 8000;\n(iii) UPDATE FLIGHT SET Fare = Fare * 1.08 WHERE Airline = 'IndiGo';\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "4C2",
            "marks": 3,
            "text": "Write SQL queries for table FLIGHT:\n(i) Display distinct destinations serviced by the airline.\n(ii) Display all flights whose Seats are NOT NULL and Fare is greater than 5000.\n(iii) Delete flights where Seats is 0.",
            "solution": "(i) SELECT DISTINCT Dest FROM FLIGHT;\n(ii) SELECT * FROM FLIGHT WHERE Seats IS NOT NULL AND Fare > 5000;\n(iii) DELETE FROM FLIGHT WHERE Seats = 0;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "4D1",
            "marks": 6,
            "text": "Table: BOOKING (TicketNo INT, PName VARCHAR(30), FlightNo VARCHAR(10), Class VARCHAR(15), Fare INT, TravelDate DATE)\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display PName and Fare of passengers travelling in 'Business' class.\n(b) Display all bookings made for TravelDate between '2023-12-20' and '2023-12-31'.\n(c) Display distinct Classes available in the BOOKING table.\n(d) Update Fare to Fare * 0.95 for all tickets in 'Economy' class.\n(e) Delete bookings where PName starts with 'Test'.\n(f) What is the output of: SELECT PName, FlightNo FROM BOOKING WHERE PName LIKE '_a%' ORDER BY Fare DESC;",
            "solution": "(a) SELECT PName, Fare FROM BOOKING WHERE Class = 'Business';\n(b) SELECT * FROM BOOKING WHERE TravelDate BETWEEN '2023-12-20' AND '2023-12-31';\n(c) SELECT DISTINCT Class FROM BOOKING;\n(d) UPDATE BOOKING SET Fare = Fare * 0.95 WHERE Class = 'Economy';\n(e) DELETE FROM BOOKING WHERE PName LIKE 'Test%';\n(f) Displays PName and FlightNo of passengers whose name has 'a' as the second character, sorted from highest to lowest fare.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Banking System & Customer Accounts",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard MySQL syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "5A1",
            "marks": 1,
            "text": "Which SQL operator checks if an attribute value matches none of the items in a given list?",
            "solution": "NOT IN (e.g. WHERE Branch NOT IN ('Barrackpore', 'Kolkata');)\n[Marking Scheme: 1 mark for NOT IN.]"
          },
          {
            "qId": "5A2",
            "marks": 1,
            "text": "Correct the SQL syntax: SELECT * FROM Account WHERE Balance IS 50000;",
            "solution": "Correct syntax: SELECT * FROM Account WHERE Balance = 50000; ('IS' is only used with NULL/NOT NULL).\n[Marking Scheme: 1 mark for replacing IS with =.]"
          },
          {
            "qId": "5A3",
            "marks": 1,
            "text": "Write a SQL query to display customer names in descending order of Balance.",
            "solution": "SELECT CustName, Balance FROM Account ORDER BY Balance DESC;\n[Marking Scheme: 1 mark for ORDER BY Balance DESC.]"
          },
          {
            "qId": "5A4",
            "marks": 1,
            "text": "What will happen if you execute: INSERT INTO Account VALUES (101, 'Rahul'); when Account has 4 columns?",
            "solution": "It will produce an error: 'Column count doesn't match value count at row 1'.\n[Marking Scheme: 1 mark for identifying column count mismatch error.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "5B1",
            "marks": 2,
            "text": "Explain with examples why 'WHERE Nominee = NULL' does not return records with missing nominees.",
            "solution": "In SQL three-valued logic, NULL represents an unknown value. Comparisons with NULL using '=' evaluate to UNKNOWN, never TRUE. Hence, no rows qualify. To find missing values, the special predicate 'IS NULL' must be used.\n[Marking Scheme: 1 mark for explaining three-valued logic / UNKNOWN, 1 mark for recommending IS NULL.]"
          },
          {
            "qId": "5B2",
            "marks": 2,
            "text": "Write an UPDATE query to credit 4% annual interest to the Balance of all 'Savings' accounts having Balance > 10000.",
            "solution": "UPDATE Account SET Balance = Balance * 1.04 WHERE AccType = 'Savings' AND Balance > 10000;\n[Marking Scheme: 2 marks for correct UPDATE statement.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "5C1",
            "marks": 3,
            "text": "Table: ACCOUNT (AccNo INT, CustName VARCHAR(30), AccType VARCHAR(15), Balance DECIMAL(10,2), OpenDate DATE)\n(i) Display all accounts opened in the year 2022.\n(ii) Display CustName and Balance for accounts where AccType is 'Current' or 'NRI'.\n(iii) Delete accounts having Balance = 0.",
            "solution": "(i) SELECT * FROM ACCOUNT WHERE OpenDate BETWEEN '2022-01-01' AND '2022-12-31';\n(ii) SELECT CustName, Balance FROM ACCOUNT WHERE AccType IN ('Current', 'NRI');\n(iii) DELETE FROM ACCOUNT WHERE Balance = 0;\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "5C2",
            "marks": 3,
            "text": "Write SQL queries for table ACCOUNT:\n(i) Display CustName and Balance for customers whose name ends with 'Roy'.\n(ii) Display distinct AccType available in the bank.\n(iii) Display all records sorted by AccType ascending and Balance descending.",
            "solution": "(i) SELECT CustName, Balance FROM ACCOUNT WHERE CustName LIKE '%Roy';\n(ii) SELECT DISTINCT AccType FROM ACCOUNT;\n(iii) SELECT * FROM ACCOUNT ORDER BY AccType ASC, Balance DESC;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "5D1",
            "marks": 6,
            "text": "Table: LOAN (LoanNo INT, CustName VARCHAR(30), LoanType VARCHAR(20), Amount DECIMAL(10,2), IntRate DECIMAL(4,2), Status VARCHAR(15))\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display CustName and Amount of all 'Home Loan' accounts with Amount >= 2500000.\n(b) Display all loans with Status 'Active' and IntRate between 8.0 and 10.5.\n(c) Display CustName and AnnualInterest (Amount * IntRate / 100) with alias 'Annual_Int'.\n(d) Update Status to 'Closed' for LoanNo 502.\n(e) Delete records of loans where Status is 'Cancelled'.\n(f) What is the output of: SELECT DISTINCT LoanType FROM LOAN ORDER BY LoanType;",
            "solution": "(a) SELECT CustName, Amount FROM LOAN WHERE LoanType = 'Home Loan' AND Amount >= 2500000;\n(b) SELECT * FROM LOAN WHERE Status = 'Active' AND IntRate BETWEEN 8.0 AND 10.5;\n(c) SELECT CustName, (Amount * IntRate) / 100 AS Annual_Int FROM LOAN;\n(d) UPDATE LOAN SET Status = 'Closed' WHERE LoanNo = 502;\n(e) DELETE FROM LOAN WHERE Status = 'Cancelled';\n(f) Displays distinct LoanType categories sorted alphabetically in ascending order.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Cinema Multiplex & Movie Show Bookings",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard MySQL syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "6A1",
            "marks": 1,
            "text": "Which SQL clause is used to filter records prior to sorting or projection?",
            "solution": "The WHERE clause.\n[Marking Scheme: 1 mark for WHERE.]"
          },
          {
            "qId": "6A2",
            "marks": 1,
            "text": "Write a LIKE pattern to match movie titles starting with 'The '.",
            "solution": "'The %' (e.g. WHERE Title LIKE 'The %')\n[Marking Scheme: 1 mark for 'The %'.]"
          },
          {
            "qId": "6A3",
            "marks": 1,
            "text": "What is the difference between = and LIKE in SQL?",
            "solution": "'=' performs exact string comparison, while 'LIKE' allows pattern matching using wildcards (% and _).\n[Marking Scheme: 1 mark for distinguishing exact match from wildcard match.]"
          },
          {
            "qId": "6A4",
            "marks": 1,
            "text": "Write an INSERT statement to add a new movie (101, 'Inception', 'Sci-Fi', 250.00).",
            "solution": "INSERT INTO Movie VALUES (101, 'Inception', 'Sci-Fi', 250.00);\n[Marking Scheme: 1 mark for correct syntax.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "6B1",
            "marks": 2,
            "text": "Explain the logical operator NOT with a query example on table Movie.",
            "solution": "The NOT operator inverts the truth value of a condition.\nExample: 'SELECT * FROM Movie WHERE NOT (Genre = 'Horror');' selects all movies whose genre is not Horror.\n[Marking Scheme: 1 mark for explanation, 1 mark for valid query.]"
          },
          {
            "qId": "6B2",
            "marks": 2,
            "text": "Predict the output of the query:\nSELECT Title, Price FROM Movie WHERE Genre = 'Action' OR Genre = 'Comedy' AND Price > 300;\nExplain how operator precedence affects this result.",
            "solution": "AND has higher precedence than OR. The condition is evaluated as 'Genre = Action' OR ('Genre = Comedy' AND Price > 300). Thus, ALL Action movies are returned regardless of price, plus Comedy movies costing over 300.\n[Marking Scheme: 1 mark for explanation of AND > OR, 1 mark for output meaning.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "6C1",
            "marks": 3,
            "text": "Table: MOVIE (MId INT, Title VARCHAR(40), Genre VARCHAR(20), ReleaseDate DATE, TicketPrice DECIMAL(6,2), Screen INT)\n(i) Display all movies released in 2023.\n(ii) Display Title and TicketPrice of movies screened in Screen 1 or Screen 2.\n(iii) Increase TicketPrice by 20 for movies of Genre 'Animation'.",
            "solution": "(i) SELECT * FROM MOVIE WHERE ReleaseDate BETWEEN '2023-01-01' AND '2023-12-31';\n(ii) SELECT Title, TicketPrice FROM MOVIE WHERE Screen IN (1, 2);\n(iii) UPDATE MOVIE SET TicketPrice = TicketPrice + 20 WHERE Genre = 'Animation';\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "6C2",
            "marks": 3,
            "text": "Write SQL queries for table MOVIE:\n(i) Display Title and Genre of movies whose Title has exactly 6 letters.\n(ii) Display distinct Genres shown in Screen 1.\n(iii) Delete records of movies released before '2020-01-01'.",
            "solution": "(i) SELECT Title, Genre FROM MOVIE WHERE Title LIKE '______';\n(ii) SELECT DISTINCT Genre FROM MOVIE WHERE Screen = 1;\n(iii) DELETE FROM MOVIE WHERE ReleaseDate < '2020-01-01';\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "6D1",
            "marks": 6,
            "text": "Table: THEATRE (ShowId INT, MovieName VARCHAR(30), AudiNo INT, Category VARCHAR(15), Price INT, SoldTickets INT)\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display MovieName and Price for shows in AudiNo 3 with Price > 200.\n(b) Display all shows where Category is 'Gold' or 'Platinum'.\n(c) Display MovieName and TotalRevenue (Price * SoldTickets) with heading 'Revenue'.\n(d) Update Price to Price + 50 for 'Platinum' category shows.\n(e) Delete shows where SoldTickets is NULL.\n(f) What is the output of: SELECT MovieName, Price FROM THEATRE WHERE MovieName LIKE '%WAR%' ORDER BY Price DESC;",
            "solution": "(a) SELECT MovieName, Price FROM THEATRE WHERE AudiNo = 3 AND Price > 200;\n(b) SELECT * FROM THEATRE WHERE Category IN ('Gold', 'Platinum');\n(c) SELECT MovieName, Price * SoldTickets AS Revenue FROM THEATRE;\n(d) UPDATE THEATRE SET Price = Price + 50 WHERE Category = 'Platinum';\n(e) DELETE FROM THEATRE WHERE SoldTickets IS NULL;\n(f) Displays MovieName and Price of all movies containing 'WAR' anywhere in their title, sorted from most expensive to least expensive.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: E-Commerce Product Orders & Shipping",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard MySQL syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "7A1",
            "marks": 1,
            "text": "What will 'SELECT DISTINCT Brand, Category FROM Product;' output if two products share Brand 'Samsung' and Category 'Mobile'?",
            "solution": "It will display 'Samsung, Mobile' only once because DISTINCT applies across the combination of all listed columns.\n[Marking Scheme: 1 mark for stating it appears once.]"
          },
          {
            "qId": "7A2",
            "marks": 1,
            "text": "Identify the relational operator that represents 'not equal to' in standard SQL.",
            "solution": "<> (or !=).\n[Marking Scheme: 1 mark for <> or !=.]"
          },
          {
            "qId": "7A3",
            "marks": 1,
            "text": "Write a query to fetch all products whose Price is NOT between 500 and 2000.",
            "solution": "SELECT * FROM Product WHERE Price NOT BETWEEN 500 AND 2000;\n[Marking Scheme: 1 mark for correct syntax.]"
          },
          {
            "qId": "7A4",
            "marks": 1,
            "text": "Write a clause to sort products first by Brand ascending, and then by Price descending.",
            "solution": "ORDER BY Brand ASC, Price DESC;\n[Marking Scheme: 1 mark for correct multi-column ORDER BY clause.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "7B1",
            "marks": 2,
            "text": "Differentiate between 'IS NULL' and 'IS NOT NULL' with an example of each.",
            "solution": "1. 'IS NULL' tests for the absence of data/missing values (e.g. WHERE Discount IS NULL).\n2. 'IS NOT NULL' tests for the presence of valid, non-missing data (e.g. WHERE Discount IS NOT NULL).\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "7B2",
            "marks": 2,
            "text": "Write an INSERT statement that inserts values only into PCode, PName, and Price of table Product (PCode, PName, Category, Price, Stock).",
            "solution": "INSERT INTO Product (PCode, PName, Price) VALUES (101, 'Wireless Mouse', 650.00);\n[Marking Scheme: 2 marks for explicitly naming the columns.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "7C1",
            "marks": 3,
            "text": "Table: PRODUCT (PCode INT, PName VARCHAR(30), Brand VARCHAR(20), Price DECIMAL(8,2), Stock INT)\n(i) Display all products where Brand is 'Logitech' or 'Dell' with Stock > 20.\n(ii) Display PName and Price of products whose name contains 'Pro'.\n(iii) Increase the Price by 100 for all products whose Brand is 'Sony'.",
            "solution": "(i) SELECT * FROM PRODUCT WHERE Brand IN ('Logitech', 'Dell') AND Stock > 20;\n(ii) SELECT PName, Price FROM PRODUCT WHERE PName LIKE '%Pro%';\n(iii) UPDATE PRODUCT SET Price = Price + 100 WHERE Brand = 'Sony';\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "7C2",
            "marks": 3,
            "text": "Write SQL queries for table PRODUCT:\n(i) Display PName and Stock for products with Price between 1000 and 5000.\n(ii) Display distinct Brands sorted in reverse alphabetical order.\n(iii) Delete products whose Stock is 0.",
            "solution": "(i) SELECT PName, Stock FROM PRODUCT WHERE Price BETWEEN 1000 AND 5000;\n(ii) SELECT DISTINCT Brand FROM PRODUCT ORDER BY Brand DESC;\n(iii) DELETE FROM PRODUCT WHERE Stock = 0;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "7D1",
            "marks": 6,
            "text": "Table: ORDERS (OrderId INT, CustName VARCHAR(30), City VARCHAR(20), ItemName VARCHAR(30), Amount DECIMAL(8,2), OrderDate DATE)\nWrite SQL queries for (a) to (e) and write output for (f):\n(a) Display CustName and City for orders with Amount > 5000.\n(b) Display all orders shipped to 'Kolkata', 'Delhi', or 'Mumbai'.\n(c) Display CustName, Amount, and GST (Amount * 0.18) with column alias 'Tax_Amount'.\n(d) Update City to 'Kolkata' for OrderId 1004.\n(e) Delete orders placed before '2023-01-01'.\n(f) What is the output of: SELECT CustName, ItemName FROM ORDERS WHERE CustName LIKE 'A%' ORDER BY Amount DESC;",
            "solution": "(a) SELECT CustName, City FROM ORDERS WHERE Amount > 5000;\n(b) SELECT * FROM ORDERS WHERE City IN ('Kolkata', 'Delhi', 'Mumbai');\n(c) SELECT CustName, Amount, Amount * 0.18 AS Tax_Amount FROM ORDERS;\n(d) UPDATE ORDERS SET City = 'Kolkata' WHERE OrderId = 1004;\n(e) DELETE FROM ORDERS WHERE OrderDate < '2023-01-01';\n(f) Displays customer names and ordered items for all customers whose name starts with 'A', sorted in descending order of order amount.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Hotel Booking & Room Allocation System",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard MySQL syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "8A1",
            "marks": 1,
            "text": "Which SQL clause is used to sort query result records?",
            "solution": "ORDER BY (e.g. ORDER BY RentPerDay DESC;)\n[Marking Scheme: 1 mark for ORDER BY.]"
          },
          {
            "qId": "8A2",
            "marks": 1,
            "text": "Write a query to display all rooms where RoomType is NOT NULL.",
            "solution": "SELECT * FROM Room WHERE RoomType IS NOT NULL;\n[Marking Scheme: 1 mark for IS NOT NULL.]"
          },
          {
            "qId": "8A3",
            "marks": 1,
            "text": "What will the condition 'WHERE GuestName LIKE '_i%'' match?",
            "solution": "It matches any guest name where the second character is 'i'.\n[Marking Scheme: 1 mark for second character 'i'.]"
          },
          {
            "qId": "8A4",
            "marks": 1,
            "text": "Can the SET clause in an UPDATE statement modify more than one column at a time? If yes, how are they separated?",
            "solution": "Yes, multiple columns can be updated simultaneously, separated by commas (e.g. SET Rent = 3500, Status = 'Occupied').\n[Marking Scheme: 1 mark for Yes and commas.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "8B1",
            "marks": 2,
            "text": "Explain the purpose of column aliases in SQL with a valid code example.",
            "solution": "Column aliases give temporary, readable headings to output columns in a query result without altering table schema.\nExample: 'SELECT RentPerDay * 1.12 AS \"Gross Rent With GST\" FROM Hotel;'\n[Marking Scheme: 1 mark for concept, 1 mark for example.]"
          },
          {
            "qId": "8B2",
            "marks": 2,
            "text": "Write a query to select all guests who stayed for 3, 5, or 7 days using the IN operator.",
            "solution": "SELECT * FROM Booking WHERE DaysStayed IN (3, 5, 7);\n[Marking Scheme: 2 marks for correct query.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "8C1",
            "marks": 3,
            "text": "Table: ROOM (RoomNo INT, RoomType VARCHAR(20), RentPerDay DECIMAL(7,2), Floor INT, Status VARCHAR(15))\n(i) Display all rooms located on Floor 2 or Floor 3 with RentPerDay < 3000.\n(ii) Update Status to 'Available' for RoomNo 204.\n(iii) Display distinct RoomTypes available in the hotel.",
            "solution": "(i) SELECT * FROM ROOM WHERE Floor IN (2, 3) AND RentPerDay < 3000;\n(ii) UPDATE ROOM SET Status = 'Available' WHERE RoomNo = 204;\n(iii) SELECT DISTINCT RoomType FROM ROOM;\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "8C2",
            "marks": 3,
            "text": "Write SQL queries for table ROOM:\n(i) Display RoomNo and RentPerDay for rooms whose RentPerDay is between 2500 and 5000.\n(ii) Display all rooms sorted primarily by RoomType ASC, and RentPerDay DESC.\n(iii) Delete rooms whose Status is 'Maintenance'.",
            "solution": "(i) SELECT RoomNo, RentPerDay FROM ROOM WHERE RentPerDay BETWEEN 2500 AND 5000;\n(ii) SELECT * FROM ROOM ORDER BY RoomType ASC, RentPerDay DESC;\n(iii) DELETE FROM ROOM WHERE Status = 'Maintenance';\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "8D1",
            "marks": 6,
            "text": "Table: GUEST (GuestId INT, GName VARCHAR(30), RoomNo INT, CheckIn DATE, BillAmount DECIMAL(8,2), City VARCHAR(20))\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display GName and RoomNo of guests from 'Kolkata' or 'Siliguri'.\n(b) Display all guests who checked in during October 2023.\n(c) Display GName, BillAmount, and NetBill (BillAmount with 5% discount) with alias 'Net_Payable'.\n(d) Increase BillAmount by 500 for guests residing in RoomNo 301.\n(e) Delete records of guests whose BillAmount is NULL.\n(f) What is the output of: SELECT GName, BillAmount FROM GUEST WHERE GName LIKE '%k%' ORDER BY BillAmount ASC;",
            "solution": "(a) SELECT GName, RoomNo FROM GUEST WHERE City IN ('Kolkata', 'Siliguri');\n(b) SELECT * FROM GUEST WHERE CheckIn BETWEEN '2023-10-01' AND '2023-10-31';\n(c) SELECT GName, BillAmount, BillAmount * 0.95 AS Net_Payable FROM GUEST;\n(d) UPDATE GUEST SET BillAmount = BillAmount + 500 WHERE RoomNo = 301;\n(e) DELETE FROM GUEST WHERE BillAmount IS NULL;\n(f) Displays guest names and bill amounts of all guests having 'k' (or 'K') in their name, sorted from lowest bill amount to highest.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Automobile Service Center & Vehicle Maintenance",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard MySQL syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "9A1",
            "marks": 1,
            "text": "What does the query 'SELECT * FROM Vehicle;' return?",
            "solution": "It returns all columns and all rows/records present in the table Vehicle.\n[Marking Scheme: 1 mark for all columns and rows.]"
          },
          {
            "qId": "9A2",
            "marks": 1,
            "text": "Write a SQL condition to match registration numbers starting with 'WB'.",
            "solution": "RegNo LIKE 'WB%' (e.g. WHERE RegNo LIKE 'WB%')\n[Marking Scheme: 1 mark for RegNo LIKE 'WB%'.]"
          },
          {
            "qId": "9A3",
            "marks": 1,
            "text": "Which SQL command is used to clear all data rows from a table while keeping the table definition?",
            "solution": "DELETE FROM table_name; (or TRUNCATE TABLE table_name;)\n[Marking Scheme: 1 mark for DELETE FROM or TRUNCATE.]"
          },
          {
            "qId": "9A4",
            "marks": 1,
            "text": "True or False: SQL column names in the SELECT clause are case-sensitive in MySQL.",
            "solution": "False. SQL keywords and column names are case-insensitive in MySQL.\n[Marking Scheme: 1 mark for False.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "9B1",
            "marks": 2,
            "text": "Explain the difference between 'WHERE Model = 'Sedan' OR Model = 'SUV'' and 'WHERE Model IN ('Sedan', 'SUV')'.",
            "solution": "Both queries are semantically identical and yield the exact same result set. However, the IN operator provides a cleaner, more concise, and readable shorthand when testing equality against multiple discrete values.\n[Marking Scheme: 1 mark for stating equivalence, 1 mark for readability advantage.]"
          },
          {
            "qId": "9B2",
            "marks": 2,
            "text": "Write an SQL statement to add a new vehicle record: RegNo 'WB24A1020', Owner 'Bikram Das', Model 'Swift', ServiceCost 4500.00.",
            "solution": "INSERT INTO Vehicle VALUES ('WB24A1020', 'Bikram Das', 'Swift', 4500.00);\n[Marking Scheme: 2 marks for valid INSERT statement.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "9C1",
            "marks": 3,
            "text": "Table: VEHICLE (RegNo VARCHAR(15), Owner VARCHAR(30), Model VARCHAR(20), ServiceCost DECIMAL(8,2), ServiceDate DATE)\n(i) Display all vehicles serviced between '2023-01-01' and '2023-03-31'.\n(ii) Display Owner and Model of vehicles where ServiceCost is greater than 5000.\n(iii) Increase ServiceCost by 500 for all 'Swift' models.",
            "solution": "(i) SELECT * FROM VEHICLE WHERE ServiceDate BETWEEN '2023-01-01' AND '2023-03-31';\n(ii) SELECT Owner, Model FROM VEHICLE WHERE ServiceCost > 5000;\n(iii) UPDATE VEHICLE SET ServiceCost = ServiceCost + 500 WHERE Model = 'Swift';\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "9C2",
            "marks": 3,
            "text": "Write SQL queries for table VEHICLE:\n(i) Display distinct Models serviced at the center.\n(ii) Display Owner and ServiceCost for vehicles whose Owner name contains 'Sen'.\n(iii) Delete vehicles whose ServiceCost is NULL.",
            "solution": "(i) SELECT DISTINCT Model FROM VEHICLE;\n(ii) SELECT Owner, ServiceCost FROM VEHICLE WHERE Owner LIKE '%Sen%';\n(iii) DELETE FROM VEHICLE WHERE ServiceCost IS NULL;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "9D1",
            "marks": 6,
            "text": "Table: MECHANIC (MechId INT, MName VARCHAR(30), Specialization VARCHAR(20), Wage DECIMAL(8,2), Rating DECIMAL(2,1))\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display MName and Wage of mechanics with Specialization 'Engine' or 'Transmission'.\n(b) Display all mechanics with Rating >= 4.5 and Wage < 30000.\n(c) Display MName and RevisedWage (Wage * 1.15) with heading 'Bonus_Wage'.\n(d) Update Rating to 5.0 for MechId 105.\n(e) Delete mechanics whose Rating is NULL.\n(f) What is the output of: SELECT MName, Wage FROM MECHANIC WHERE MName LIKE 'S%' ORDER BY Wage DESC;",
            "solution": "(a) SELECT MName, Wage FROM MECHANIC WHERE Specialization IN ('Engine', 'Transmission');\n(b) SELECT * FROM MECHANIC WHERE Rating >= 4.5 AND Wage < 30000;\n(c) SELECT MName, Wage * 1.15 AS Bonus_Wage FROM MECHANIC;\n(d) UPDATE MECHANIC SET Rating = 5.0 WHERE MechId = 105;\n(e) DELETE FROM MECHANIC WHERE Rating IS NULL;\n(f) Displays names and wages of all mechanics whose name begins with 'S', arranged from highest wage to lowest wage.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Fitness Center Membership & Gym Equipment",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard MySQL syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "10A1",
            "marks": 1,
            "text": "Which SQL clause restricts the rows that are updated in an UPDATE statement?",
            "solution": "The WHERE clause (e.g. UPDATE Member SET Fee = 1500 WHERE MemId = 101;)\n[Marking Scheme: 1 mark for WHERE.]"
          },
          {
            "qId": "10A2",
            "marks": 1,
            "text": "Write a SQL query to display all members whose Plan is 'Monthly' or 'Quarterly'.",
            "solution": "SELECT * FROM Member WHERE Plan IN ('Monthly', 'Quarterly');\n[Marking Scheme: 1 mark for correct query.]"
          },
          {
            "qId": "10A3",
            "marks": 1,
            "text": "What is the difference between COUNT(*) and COUNT(column_name) regarding NULL values?",
            "solution": "COUNT(*) counts all rows including those with NULL values, whereas COUNT(column_name) ignores NULL values in that column.\n[Marking Scheme: 1 mark for explaining NULL exclusion in COUNT(column).]"
          },
          {
            "qId": "10A4",
            "marks": 1,
            "text": "Write a LIKE pattern to match names ending with 'jit'.",
            "solution": "'%jit' (e.g. WHERE Name LIKE '%jit')\n[Marking Scheme: 1 mark for '%jit'.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "10B1",
            "marks": 2,
            "text": "What will happen if you write 'WHERE Age BETWEEN 30 AND 20;' in a query? Explain.",
            "solution": "In SQL, the BETWEEN operator expects the lower boundary first and upper boundary second (BETWEEN min AND max). Since 30 is greater than 20, no value can satisfy 'Age >= 30 AND Age <= 20', resulting in an EMPTY set (0 rows).\n[Marking Scheme: 1 mark for stating 0 rows / empty set, 1 mark for explanation.]"
          },
          {
            "qId": "10B2",
            "marks": 2,
            "text": "Write a query to display all members whose TrainerId IS NULL and Fee > 1000.",
            "solution": "SELECT * FROM Member WHERE TrainerId IS NULL AND Fee > 1000;\n[Marking Scheme: 2 marks for correct query.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "10C1",
            "marks": 3,
            "text": "Table: MEMBER (MemId INT, MName VARCHAR(30), Plan VARCHAR(15), Fee DECIMAL(7,2), JoinDate DATE)\n(i) Display all members who joined after '2023-05-01'.\n(ii) Display MName and Fee for members having Fee between 1200 and 2500.\n(iii) Increase Fee by 10% for members in 'Annual' plan.",
            "solution": "(i) SELECT * FROM MEMBER WHERE JoinDate > '2023-05-01';\n(ii) SELECT MName, Fee FROM MEMBER WHERE Fee BETWEEN 1200 AND 2500;\n(iii) UPDATE MEMBER SET Fee = Fee * 1.10 WHERE Plan = 'Annual';\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "10C2",
            "marks": 3,
            "text": "Write SQL queries for table MEMBER:\n(i) Display distinct Plans available in the gym in alphabetical order.\n(ii) Display all members whose MName starts with 'P' and has at least 5 characters.\n(iii) Delete records of members whose Fee is NULL.",
            "solution": "(i) SELECT DISTINCT Plan FROM MEMBER ORDER BY Plan ASC;\n(ii) SELECT * FROM MEMBER WHERE MName LIKE 'P____%';\n(iii) DELETE FROM MEMBER WHERE Fee IS NULL;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "10D1",
            "marks": 6,
            "text": "Table: EQUIPMENT (EqId INT, EqName VARCHAR(30), Category VARCHAR(20), PurchaseDate DATE, Cost DECIMAL(8,2), MaintenanceDue DATE)\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display EqName and Cost of equipment in Category 'Cardio' or 'Strength'.\n(b) Display all equipment purchased in 2023 with Cost > 50000.\n(c) Display EqName, Cost, and DepreciatedCost (Cost * 0.85) with alias 'Current_Value'.\n(d) Update MaintenanceDue to '2024-06-30' for EqId 205.\n(e) Delete equipment where Cost < 5000.\n(f) What is the output of: SELECT EqName, Cost FROM EQUIPMENT WHERE EqName LIKE '%Mill%' ORDER BY Cost DESC;",
            "solution": "(a) SELECT EqName, Cost FROM EQUIPMENT WHERE Category IN ('Cardio', 'Strength');\n(b) SELECT * FROM EQUIPMENT WHERE PurchaseDate BETWEEN '2023-01-01' AND '2023-12-31' AND Cost > 50000;\n(c) SELECT EqName, Cost, Cost * 0.85 AS Current_Value FROM EQUIPMENT;\n(d) UPDATE EQUIPMENT SET MaintenanceDue = '2024-06-30' WHERE EqId = 205;\n(e) DELETE FROM EQUIPMENT WHERE Cost < 5000;\n(f) Displays EqName and Cost of all equipment with 'Mill' in their name (e.g. Treadmill), sorted from highest cost to lowest cost.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  }
];
export default samplePaperSets;
