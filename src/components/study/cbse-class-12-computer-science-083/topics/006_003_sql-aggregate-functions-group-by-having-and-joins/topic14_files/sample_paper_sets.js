export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: Employee Payroll & Department Analytics",
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
            "text": "Table Employee has 5 rows and 4 columns. Table Department has 3 rows and 2 columns. What is the Degree of their Cartesian product?",
            "solution": "Degree = 4 + 2 = 6 columns.\n[Marking Scheme: 1 mark for Degree = 6.]"
          },
          {
            "qId": "1A2",
            "marks": 1,
            "text": "Which aggregate function ignores NULL values when calculating the total number of entries in a column?",
            "solution": "COUNT(column_name) (as opposed to COUNT(*) which counts NULLs).\n[Marking Scheme: 1 mark for COUNT(column_name).]"
          },
          {
            "qId": "1A3",
            "marks": 1,
            "text": "Identify the error in: SELECT Dept, MAX(Salary) FROM Emp WHERE MAX(Salary) > 50000 GROUP BY Dept;",
            "solution": "Aggregate function MAX(Salary) cannot be used in the WHERE clause. It must be placed in a HAVING clause: 'HAVING MAX(Salary) > 50000'.\n[Marking Scheme: 1 mark for identifying WHERE clause error and suggesting HAVING.]"
          },
          {
            "qId": "1A4",
            "marks": 1,
            "text": "How many join conditions are required to join 3 tables in an equi-join?",
            "solution": "2 join conditions (N - 1 = 3 - 1 = 2).\n[Marking Scheme: 1 mark for 2.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "1B1",
            "marks": 2,
            "text": "Differentiate between the WHERE clause and the HAVING clause in SQL with an example.",
            "solution": "1. WHERE filters individual tuples before grouping and cannot contain aggregate functions (e.g. WHERE Salary > 30000).\n2. HAVING filters groups after grouping and can contain aggregate functions (e.g. HAVING AVG(Salary) > 50000).\n[Marking Scheme: 1 mark for conceptual difference, 1 mark for valid syntax example.]"
          },
          {
            "qId": "1B2",
            "marks": 2,
            "text": "Given table Bonus (EmpId, Amount) with values [2000, 3000, 3000, NULL], what will be the output of:\n(i) SELECT COUNT(Amount) FROM Bonus;\n(ii) SELECT COUNT(DISTINCT Amount) FROM Bonus;",
            "solution": "(i) COUNT(Amount) = 3 (ignores NULL)\n(ii) COUNT(DISTINCT Amount) = 2 (unique non-null values: 2000, 3000)\n[Marking Scheme: 1 mark for (i) = 3, 1 mark for (ii) = 2.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "1C1",
            "marks": 3,
            "text": "Consider table Employee (EmpId, EName, Dept, Salary, City).\nWrite SQL queries to:\n(i) Display the department name and total salary paid to each department.\n(ii) Display the department name and maximum salary for departments having more than 3 employees.\n(iii) Display the average salary of employees in 'Kolkata' city.",
            "solution": "(i) SELECT Dept, SUM(Salary) FROM Employee GROUP BY Dept;\n(ii) SELECT Dept, MAX(Salary) FROM Employee GROUP BY Dept HAVING COUNT(*) > 3;\n(iii) SELECT AVG(Salary) FROM Employee WHERE City = 'Kolkata';\n[Marking Scheme: 1 mark for each query.]"
          },
          {
            "qId": "1C2",
            "marks": 3,
            "text": "Consider tables Employee (EmpId, EName, DeptId, Salary) and Department (DeptId, DeptName, Location).\nWrite SQL queries to:\n(i) Display EName and DeptName of all employees using an equi-join.\n(ii) Display EName, Salary, and Location of employees whose Salary > 60000.\n(iii) Display DeptName and count of employees working in each department.",
            "solution": "(i) SELECT E.EName, D.DeptName FROM Employee E, Department D WHERE E.DeptId = D.DeptId;\n(ii) SELECT E.EName, E.Salary, D.Location FROM Employee E, Department D WHERE E.DeptId = D.DeptId AND E.Salary > 60000;\n(iii) SELECT D.DeptName, COUNT(E.EmpId) FROM Employee E, Department D WHERE E.DeptId = D.DeptId GROUP BY D.DeptId, D.DeptName;\n[Marking Scheme: 1 mark for each query.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "1D1",
            "marks": 6,
            "text": "Tables: HOSPITAL_STAFF (StaffId INT, SName VARCHAR(30), DeptCode INT, Salary DECIMAL(8,2), Shift CHAR(1))\nand WARD (DeptCode INT, DeptName VARCHAR(30), Floor INT, Incharge VARCHAR(30))\nWrite SQL queries for (a) to (e) and determine output for (f):\n(a) Display the number of staff members working in each Shift.\n(b) Display SName, DeptName, and Floor for all staff members who work on Floor 2.\n(c) Display DeptName and average salary of staff in each department where the average salary is above 40000.\n(d) Display highest and lowest salary paid across the entire hospital.\n(e) Display SName and Incharge name for all staff whose Salary is between 30000 and 50000.\n(f) If HOSPITAL_STAFF has 12 rows and WARD has 4 rows, what is the Cardinality and Degree of their Cartesian product if HOSPITAL_STAFF has 5 columns and WARD has 4 columns?",
            "solution": "(a) SELECT Shift, COUNT(*) FROM HOSPITAL_STAFF GROUP BY Shift;\n(b) SELECT S.SName, W.DeptName, W.Floor FROM HOSPITAL_STAFF S, WARD W WHERE S.DeptCode = W.DeptCode AND W.Floor = 2;\n(c) SELECT W.DeptName, AVG(S.Salary) FROM HOSPITAL_STAFF S, WARD W WHERE S.DeptCode = W.DeptCode GROUP BY W.DeptCode, W.DeptName HAVING AVG(S.Salary) > 40000;\n(d) SELECT MAX(Salary), MIN(Salary) FROM HOSPITAL_STAFF;\n(e) SELECT S.SName, W.Incharge FROM HOSPITAL_STAFF S, WARD W WHERE S.DeptCode = W.DeptCode AND S.Salary BETWEEN 30000 AND 50000;\n(f) Cardinality = 12 * 4 = 48 rows; Degree = 5 + 4 = 9 columns.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: School Academic Streams & Student Enrollment",
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
            "text": "Which SQL clause is used to divide table rows into summary groups?",
            "solution": "GROUP BY clause.\n[Marking Scheme: 1 mark for GROUP BY.]"
          },
          {
            "qId": "2A2",
            "marks": 1,
            "text": "Table Student has 8 rows and Table Stream has 3 rows. How many rows will be present in their Cartesian Product?",
            "solution": "Cardinality = 8 * 3 = 24 rows.\n[Marking Scheme: 1 mark for 24.]"
          },
          {
            "qId": "2A3",
            "marks": 1,
            "text": "Can the MIN() function be applied to columns containing date values? What does it return?",
            "solution": "Yes. On date columns, MIN() returns the earliest / oldest date.\n[Marking Scheme: 1 mark for Yes and earliest date.]"
          },
          {
            "qId": "2A4",
            "marks": 1,
            "text": "State the rule regarding which columns can appear in the SELECT clause when a GROUP BY clause is present.",
            "solution": "Any column in the SELECT list must either be listed in the GROUP BY clause or be enclosed inside an aggregate function.\n[Marking Scheme: 1 mark for stating the rule.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "2B1",
            "marks": 2,
            "text": "Differentiate between an Equi-Join and a Cartesian Product with syntax examples.",
            "solution": "1. Cartesian Product combines every row of one table with every row of another without filtering (e.g. SELECT * FROM A, B;).\n2. Equi-Join filters the Cartesian product using an equality condition on common attributes (e.g. SELECT * FROM A, B WHERE A.id = B.id;).\n[Marking Scheme: 1 mark for conceptual difference, 1 mark for query examples.]"
          },
          {
            "qId": "2B2",
            "marks": 2,
            "text": "Given table Exam (RollNo, Score) with scores [80, 90, NULL, 70], calculate the result of:\n(i) SUM(Score)\n(ii) AVG(Score)",
            "solution": "(i) SUM(Score) = 80 + 90 + 70 = 240\n(ii) AVG(Score) = 240 / 3 = 80.0 (NULL is ignored in both numerator and denominator)\n[Marking Scheme: 1 mark for 240, 1 mark for 80.0.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "2C1",
            "marks": 3,
            "text": "Table: STUDENT (RollNo INT, SName VARCHAR(30), StreamId INT, Marks DECIMAL(5,2), Gender CHAR(1))\nWrite SQL queries to:\n(i) Count the total number of students in each StreamId.\n(ii) Display StreamId and highest marks scored by female students ('F') in each stream.\n(iii) Display StreamId and average marks for streams having an average score of at least 75.0.",
            "solution": "(i) SELECT StreamId, COUNT(*) FROM STUDENT GROUP BY StreamId;\n(ii) SELECT StreamId, MAX(Marks) FROM STUDENT WHERE Gender = 'F' GROUP BY StreamId;\n(iii) SELECT StreamId, AVG(Marks) FROM STUDENT GROUP BY StreamId HAVING AVG(Marks) >= 75.0;\n[Marking Scheme: 1 mark for each query.]"
          },
          {
            "qId": "2C2",
            "marks": 3,
            "text": "Tables: STUDENT (RollNo, SName, StreamId, Marks) and STREAM (StreamId, StreamName, Coordinator)\nWrite SQL queries to:\n(i) Display SName, StreamName, and Marks of all students.\n(ii) Display StreamName and count of students enrolled in that stream.\n(iii) Display SName and Coordinator for students who scored more than 90 marks.",
            "solution": "(i) SELECT S.SName, T.StreamName, S.Marks FROM STUDENT S, STREAM T WHERE S.StreamId = T.StreamId;\n(ii) SELECT T.StreamName, COUNT(S.RollNo) FROM STUDENT S, STREAM T WHERE S.StreamId = T.StreamId GROUP BY T.StreamId, T.StreamName;\n(iii) SELECT S.SName, T.Coordinator FROM STUDENT S, STREAM T WHERE S.StreamId = T.StreamId AND S.Marks > 90;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "2D1",
            "marks": 6,
            "text": "Tables: BOOK (BookId INT, Title VARCHAR(40), PubId INT, Price INT, Subject VARCHAR(20))\nand PUBLISHER (PubId INT, PubName VARCHAR(30), City VARCHAR(20))\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display the number of books available in each Subject.\n(b) Display Title, Price, and PubName of all books published in 'Kolkata'.\n(c) Display PubName and total price of books published by each publisher where total price > 2000.\n(d) Display the maximum and minimum price of 'Computer' books.\n(e) Display Title, Subject, and PubName of books with Price between 300 and 800.\n(f) What is the output of: SELECT Subject, AVG(Price) FROM BOOK GROUP BY Subject HAVING COUNT(*) >= 2;",
            "solution": "(a) SELECT Subject, COUNT(*) FROM BOOK GROUP BY Subject;\n(b) SELECT B.Title, B.Price, P.PubName FROM BOOK B, PUBLISHER P WHERE B.PubId = P.PubId AND P.City = 'Kolkata';\n(c) SELECT P.PubName, SUM(B.Price) FROM BOOK B, PUBLISHER P WHERE B.PubId = P.PubId GROUP BY P.PubId, P.PubName HAVING SUM(B.Price) > 2000;\n(d) SELECT MAX(Price), MIN(Price) FROM BOOK WHERE Subject = 'Computer';\n(e) SELECT B.Title, B.Subject, P.PubName FROM BOOK B, PUBLISHER P WHERE B.PubId = P.PubId AND B.Price BETWEEN 300 AND 800;\n(f) Groups books by Subject and displays Subject name along with average price only for those subjects that have 2 or more books.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Retail Supermarket Sales & Inventory Analytics",
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
            "text": "What does the query 'SELECT AVG(Price) FROM Item;' return if table Item has no rows?",
            "solution": "NULL.\n[Marking Scheme: 1 mark for NULL.]"
          },
          {
            "qId": "3A2",
            "marks": 1,
            "text": "Write the SQL clause to arrange the output of grouped data in descending order of group totals.",
            "solution": "ORDER BY SUM(column) DESC; (or aliased column DESC)\n[Marking Scheme: 1 mark for ORDER BY ... DESC.]"
          },
          {
            "qId": "3A3",
            "marks": 1,
            "text": "Table R has Degree 4 and Cardinality 10. Table S has Degree 3 and Cardinality 5. What is the Degree of R × S?",
            "solution": "Degree = 4 + 3 = 7 columns.\n[Marking Scheme: 1 mark for 7.]"
          },
          {
            "qId": "3A4",
            "marks": 1,
            "text": "Why is a table alias useful when writing an equi-join query?",
            "solution": "It avoids repeatedly typing long table names and resolves attribute ambiguity using dot notation.\n[Marking Scheme: 1 mark for attribute disambiguation.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "3B1",
            "marks": 2,
            "text": "Explain the order of execution of SQL clauses: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY.",
            "solution": "1. FROM loads tables -> 2. WHERE filters rows -> 3. GROUP BY groups rows -> 4. HAVING filters groups -> 5. SELECT projects attributes -> 6. ORDER BY sorts final output.\n[Marking Scheme: 2 marks for stating the complete logical execution sequence.]"
          },
          {
            "qId": "3B2",
            "marks": 2,
            "text": "Consider table Product (PCode, Category, Price). Write a query to display the average price in each Category only for categories where the lowest price is above 100.",
            "solution": "SELECT Category, AVG(Price) FROM Product GROUP BY Category HAVING MIN(Price) > 100;\n[Marking Scheme: 2 marks for correct GROUP BY with HAVING MIN(Price) > 100.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "3C1",
            "marks": 3,
            "text": "Table: ITEM (ItemCode INT, ItemName VARCHAR(30), Category VARCHAR(20), Price DECIMAL(8,2), Stock INT)\nWrite SQL queries to:\n(i) Count the number of items in each Category.\n(ii) Display Category and total stock value (SUM(Price * Stock)) for each category.\n(iii) Display Category and average price for categories having more than 5 distinct items.",
            "solution": "(i) SELECT Category, COUNT(*) FROM ITEM GROUP BY Category;\n(ii) SELECT Category, SUM(Price * Stock) FROM ITEM GROUP BY Category;\n(iii) SELECT Category, AVG(Price) FROM ITEM GROUP BY Category HAVING COUNT(*) > 5;\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "3C2",
            "marks": 3,
            "text": "Tables: ITEM (ItemCode, ItemName, SuppId, Price) and SUPPLIER (SuppId, SuppName, City)\nWrite SQL queries to:\n(i) Display ItemName, Price, and SuppName using an equi-join.\n(ii) Display SuppName and the count of items supplied by each supplier.\n(iii) Display SuppName and highest item price for suppliers located in 'Mumbai'.",
            "solution": "(i) SELECT I.ItemName, I.Price, S.SuppName FROM ITEM I, SUPPLIER S WHERE I.SuppId = S.SuppId;\n(ii) SELECT S.SuppName, COUNT(I.ItemCode) FROM ITEM I, SUPPLIER S WHERE I.SuppId = S.SuppId GROUP BY S.SuppId, S.SuppName;\n(iii) SELECT S.SuppName, MAX(I.Price) FROM ITEM I, SUPPLIER S WHERE I.SuppId = S.SuppId AND S.City = 'Mumbai' GROUP BY S.SuppId, S.SuppName;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "3D1",
            "marks": 6,
            "text": "Tables: CUSTOMER (CustId INT, CustName VARCHAR(30), City VARCHAR(20))\nand ORDERS (OrderId INT, CustId INT, OrderDate DATE, Amount DECIMAL(10,2))\nWrite SQL statements for (a) to (e) and determine output for (f):\n(a) Display the total order amount placed by each customer (CustId and SUM(Amount)).\n(b) Display CustName, OrderDate, and Amount for all orders above 10000.\n(c) Display CustName and count of orders placed by customers from 'Barrackpore'.\n(d) Display highest and lowest order Amount in the entire ORDERS table.\n(e) Display CustId and total amount for customers whose total order value exceeds 50000.\n(f) What is the output of: SELECT City, COUNT(*) FROM CUSTOMER GROUP BY City HAVING COUNT(*) > 1;",
            "solution": "(a) SELECT CustId, SUM(Amount) FROM ORDERS GROUP BY CustId;\n(b) SELECT C.CustName, O.OrderDate, O.Amount FROM CUSTOMER C, ORDERS O WHERE C.CustId = O.CustId AND O.Amount > 10000;\n(c) SELECT C.CustName, COUNT(O.OrderId) FROM CUSTOMER C, ORDERS O WHERE C.CustId = O.CustId AND C.City = 'Barrackpore' GROUP BY C.CustId, C.CustName;\n(d) SELECT MAX(Amount), MIN(Amount) FROM ORDERS;\n(e) SELECT CustId, SUM(Amount) FROM ORDERS GROUP BY CustId HAVING SUM(Amount) > 50000;\n(f) Displays each City along with the number of customers residing in that city, only for cities having more than 1 customer.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Airline Flight Schedules & Route Operations",
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
            "text": "Which aggregate function is used to calculate the arithmetic mean of a numeric attribute?",
            "solution": "AVG() (e.g. AVG(Fare))\n[Marking Scheme: 1 mark for AVG().]"
          },
          {
            "qId": "4A2",
            "marks": 1,
            "text": "Can a column alias created in SELECT be referenced inside the HAVING clause in standard SQL?",
            "solution": "In standard SQL, no (though MySQL permits it as an extension). Group predicates should strictly use aggregate expressions.\n[Marking Scheme: 1 mark for standard SQL rule.]"
          },
          {
            "qId": "4A3",
            "marks": 1,
            "text": "Table Flight has 15 rows and Table Pilot has 6 rows. How many tuples are formed in their Cartesian Product?",
            "solution": "15 * 6 = 90 tuples.\n[Marking Scheme: 1 mark for 90.]"
          },
          {
            "qId": "4A4",
            "marks": 1,
            "text": "What is returned by 'SELECT MAX(EName) FROM Employee;'?",
            "solution": "The lexicographically (alphabetically) last employee name.\n[Marking Scheme: 1 mark for alphabetically last name.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "4B1",
            "marks": 2,
            "text": "Why does 'SELECT Origin, Airline, AVG(Fare) FROM Flight GROUP BY Origin;' cause an error in strict SQL mode?",
            "solution": "Because 'Airline' appears in the SELECT clause but is neither included in the GROUP BY clause nor enclosed within an aggregate function, creating ambiguity.\n[Marking Scheme: 2 marks for explaining the non-grouped attribute ambiguity.]"
          },
          {
            "qId": "4B2",
            "marks": 2,
            "text": "Explain the difference between COUNT(*) and COUNT(DISTINCT Airline) on table Flight.",
            "solution": "1. COUNT(*) counts every single flight row in the table.\n2. COUNT(DISTINCT Airline) counts the number of unique, non-null airline operators.\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "4C1",
            "marks": 3,
            "text": "Table: FLIGHT (FlightNo VARCHAR(10), Airline VARCHAR(20), Origin VARCHAR(20), Dest VARCHAR(20), Fare INT)\nWrite SQL queries to:\n(i) Display the number of flights departing from each Origin.\n(ii) Display Airline and average Fare for each airline.\n(iii) Display Origin, Dest, and minimum Fare for each route where minimum Fare < 4000.",
            "solution": "(i) SELECT Origin, COUNT(*) FROM FLIGHT GROUP BY Origin;\n(ii) SELECT Airline, AVG(Fare) FROM FLIGHT GROUP BY Airline;\n(iii) SELECT Origin, Dest, MIN(Fare) FROM FLIGHT GROUP BY Origin, Dest HAVING MIN(Fare) < 4000;\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "4C2",
            "marks": 3,
            "text": "Tables: FLIGHT (FlightNo, AirlineId, Origin, Dest, Fare) and AIRLINE (AirlineId, AirlineName, Country)\nWrite SQL queries to:\n(i) Display FlightNo, Origin, Dest, and AirlineName using an equi-join.\n(ii) Display AirlineName and count of flights operated by each airline.\n(iii) Display AirlineName and total revenue (SUM(Fare)) for airlines having more than 5 flights.",
            "solution": "(i) SELECT F.FlightNo, F.Origin, F.Dest, A.AirlineName FROM FLIGHT F, AIRLINE A WHERE F.AirlineId = A.AirlineId;\n(ii) SELECT A.AirlineName, COUNT(F.FlightNo) FROM FLIGHT F, AIRLINE A WHERE F.AirlineId = A.AirlineId GROUP BY A.AirlineId, A.AirlineName;\n(iii) SELECT A.AirlineName, SUM(F.Fare) FROM FLIGHT F, AIRLINE A WHERE F.AirlineId = A.AirlineId GROUP BY A.AirlineId, A.AirlineName HAVING COUNT(F.FlightNo) > 5;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "4D1",
            "marks": 6,
            "text": "Tables: PASSENGER (PnrNo INT, PName VARCHAR(30), FlightNo VARCHAR(10), Age INT, FarePaid DECIMAL(8,2))\nand FLIGHT_DETAILS (FlightNo VARCHAR(10), Origin VARCHAR(20), Dest VARCHAR(20), Capacity INT)\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display FlightNo and total passengers booked in each flight.\n(b) Display PName, Origin, and Dest for all passengers aged above 60.\n(c) Display FlightNo and total FarePaid for flights where total collections exceed 100000.\n(d) Display the average age of all passengers flying to 'Bengaluru'.\n(e) Display Origin and highest fare paid among flights departing from that origin.\n(f) What is the output of: SELECT FlightNo, AVG(FarePaid) FROM PASSENGER GROUP BY FlightNo HAVING COUNT(*) >= 3;",
            "solution": "(a) SELECT FlightNo, COUNT(*) FROM PASSENGER GROUP BY FlightNo;\n(b) SELECT P.PName, F.Origin, F.Dest FROM PASSENGER P, FLIGHT_DETAILS F WHERE P.FlightNo = F.FlightNo AND P.Age > 60;\n(c) SELECT FlightNo, SUM(FarePaid) FROM PASSENGER GROUP BY FlightNo HAVING SUM(FarePaid) > 100000;\n(d) SELECT AVG(P.Age) FROM PASSENGER P, FLIGHT_DETAILS F WHERE P.FlightNo = F.FlightNo AND F.Dest = 'Bengaluru';\n(e) SELECT F.Origin, MAX(P.FarePaid) FROM PASSENGER P, FLIGHT_DETAILS F WHERE P.FlightNo = F.FlightNo GROUP BY F.Origin;\n(f) Displays FlightNo and average fare paid for those flights that have at least 3 booked passengers.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Banking System & Loan Portfolio Management",
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
            "text": "Which aggregate function returns the count of unique non-null entries in a column?",
            "solution": "COUNT(DISTINCT column_name)\n[Marking Scheme: 1 mark for COUNT(DISTINCT).]"
          },
          {
            "qId": "5A2",
            "marks": 1,
            "text": "Table Loan has 6 rows and 4 columns. Table Branch has 4 rows and 3 columns. What is the Degree of their Cross Join?",
            "solution": "Degree = 4 + 3 = 7 columns.\n[Marking Scheme: 1 mark for 7.]"
          },
          {
            "qId": "5A3",
            "marks": 1,
            "text": "True or False: The HAVING clause can be executed before the WHERE clause in SQL.",
            "solution": "False. In logical query processing, WHERE executes before GROUP BY, which in turn executes before HAVING.\n[Marking Scheme: 1 mark for False.]"
          },
          {
            "qId": "5A4",
            "marks": 1,
            "text": "What will 'SELECT SUM(Balance) FROM Account WHERE Balance > 1000000;' return if no accounts qualify?",
            "solution": "NULL.\n[Marking Scheme: 1 mark for NULL.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "5B1",
            "marks": 2,
            "text": "Can a query have both WHERE and HAVING clauses? Explain how they function together.",
            "solution": "Yes. WHERE filters individual rows before grouping occurs. GROUP BY then groups the surviving rows. Finally, HAVING filters the aggregate values of those groups.\n[Marking Scheme: 1 mark for Yes, 1 mark for order/role explanation.]"
          },
          {
            "qId": "5B2",
            "marks": 2,
            "text": "Write a query to display the AccType and maximum Balance for each account type, but only include accounts opened after '2020-01-01'.",
            "solution": "SELECT AccType, MAX(Balance) FROM Account WHERE OpenDate > '2020-01-01' GROUP BY AccType;\n[Marking Scheme: 2 marks for correct query.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "5C1",
            "marks": 3,
            "text": "Table: ACCOUNT (AccNo INT, CustName VARCHAR(30), AccType VARCHAR(15), Balance DECIMAL(10,2), BranchCode INT)\nWrite SQL queries to:\n(i) Display AccType and total balance held in each account type.\n(ii) Display BranchCode and count of accounts in each branch.\n(iii) Display AccType and average balance for account types where average balance > 50000.",
            "solution": "(i) SELECT AccType, SUM(Balance) FROM ACCOUNT GROUP BY AccType;\n(ii) SELECT BranchCode, COUNT(*) FROM ACCOUNT GROUP BY BranchCode;\n(iii) SELECT AccType, AVG(Balance) FROM ACCOUNT GROUP BY AccType HAVING AVG(Balance) > 50000;\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "5C2",
            "marks": 3,
            "text": "Tables: ACCOUNT (AccNo, CustName, BranchCode, Balance) and BRANCH (BranchCode, BranchName, City)\nWrite SQL queries to:\n(i) Display CustName, Balance, and BranchName using an equi-join.\n(ii) Display BranchName and total deposits (SUM(Balance)) in each branch.\n(iii) Display BranchName and number of accounts in branches located in 'Barrackpore'.",
            "solution": "(i) SELECT A.CustName, A.Balance, B.BranchName FROM ACCOUNT A, BRANCH B WHERE A.BranchCode = B.BranchCode;\n(ii) SELECT B.BranchName, SUM(A.Balance) FROM ACCOUNT A, BRANCH B WHERE A.BranchCode = B.BranchCode GROUP BY B.BranchCode, B.BranchName;\n(iii) SELECT B.BranchName, COUNT(A.AccNo) FROM ACCOUNT A, BRANCH B WHERE A.BranchCode = B.BranchCode AND B.City = 'Barrackpore' GROUP BY B.BranchCode, B.BranchName;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "5D1",
            "marks": 6,
            "text": "Tables: LOAN (LoanNo INT, CustId INT, LoanType VARCHAR(20), Amount DECIMAL(12,2), Status VARCHAR(15))\nand CUSTOMER (CustId INT, CustName VARCHAR(30), City VARCHAR(20), Phone VARCHAR(15))\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display LoanType and total loan amount disbursed under each type.\n(b) Display CustName, LoanType, and Amount for all loans where Amount >= 1000000.\n(c) Display City and total number of customers residing in that city.\n(d) Display highest and lowest loan Amount across all active loans (Status = 'Active').\n(e) Display LoanType and average amount for loan types with more than 3 loans.\n(f) What is the output of: SELECT LoanType, COUNT(*) FROM LOAN WHERE Status = 'Active' GROUP BY LoanType HAVING COUNT(*) >= 2;",
            "solution": "(a) SELECT LoanType, SUM(Amount) FROM LOAN GROUP BY LoanType;\n(b) SELECT C.CustName, L.LoanType, L.Amount FROM LOAN L, CUSTOMER C WHERE L.CustId = C.CustId AND L.Amount >= 1000000;\n(c) SELECT City, COUNT(*) FROM CUSTOMER GROUP BY City;\n(d) SELECT MAX(Amount), MIN(Amount) FROM LOAN WHERE Status = 'Active';\n(e) SELECT LoanType, AVG(Amount) FROM LOAN GROUP BY LoanType HAVING COUNT(*) > 3;\n(f) Displays LoanType and the count of active loans for each loan type that has at least 2 active loans.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Cinema Multiplex Shows & Ticket Revenue",
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
            "text": "What is the purpose of the GROUP BY clause in SQL?",
            "solution": "To partition rows into subsets sharing common attribute values for aggregate calculations.\n[Marking Scheme: 1 mark for grouping concept.]"
          },
          {
            "qId": "6A2",
            "marks": 1,
            "text": "Table Show has Cardinality 10. Table Screen has Cardinality 4. What is the Cardinality of their Cross Join?",
            "solution": "Cardinality = 10 * 4 = 40 tuples.\n[Marking Scheme: 1 mark for 40.]"
          },
          {
            "qId": "6A3",
            "marks": 1,
            "text": "Can SUM() be used on a VARCHAR column?",
            "solution": "No. SUM() operates strictly on numeric columns.\n[Marking Scheme: 1 mark for No.]"
          },
          {
            "qId": "6A4",
            "marks": 1,
            "text": "Which SQL clause follows GROUP BY when filtering grouped rows?",
            "solution": "The HAVING clause.\n[Marking Scheme: 1 mark for HAVING.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "6B1",
            "marks": 2,
            "text": "Explain why 'SELECT Genre, COUNT(*) FROM Movie HAVING COUNT(*) > 2;' is legally valid in SQL even without GROUP BY.",
            "solution": "When HAVING is used without GROUP BY, SQL treats the entire table as one single group and evaluates the aggregate condition on that group.\n[Marking Scheme: 2 marks for explaining single whole-table group.]"
          },
          {
            "qId": "6B2",
            "marks": 2,
            "text": "Write a query to display the lowest and highest ticket price for each Screen in table Show (ShowId, MovieName, ScreenNo, TicketPrice).",
            "solution": "SELECT ScreenNo, MIN(TicketPrice), MAX(TicketPrice) FROM Show GROUP BY ScreenNo;\n[Marking Scheme: 2 marks for correct GROUP BY query.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "6C1",
            "marks": 3,
            "text": "Table: MOVIE (MId INT, Title VARCHAR(40), Genre VARCHAR(20), Price DECIMAL(6,2), ScreenNo INT)\nWrite SQL queries to:\n(i) Count the total number of movies in each Genre.\n(ii) Display ScreenNo and average ticket price for each screen.\n(iii) Display Genre and total ticket price for genres having total price exceeding 1000.",
            "solution": "(i) SELECT Genre, COUNT(*) FROM MOVIE GROUP BY Genre;\n(ii) SELECT ScreenNo, AVG(Price) FROM MOVIE GROUP BY ScreenNo;\n(iii) SELECT Genre, SUM(Price) FROM MOVIE GROUP BY Genre HAVING SUM(Price) > 1000;\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "6C2",
            "marks": 3,
            "text": "Tables: MOVIE (MId, Title, ScreenNo, Price) and SCREEN (ScreenNo, Capacity, ScreenType)\nWrite SQL queries to:\n(i) Display Title, Price, and ScreenType using an equi-join.\n(ii) Display ScreenType and total capacity across all screens of that type.\n(iii) Display ScreenType and count of movies running on screens of that type.",
            "solution": "(i) SELECT M.Title, M.Price, S.ScreenType FROM MOVIE M, SCREEN S WHERE M.ScreenNo = S.ScreenNo;\n(ii) SELECT ScreenType, SUM(Capacity) FROM SCREEN GROUP BY ScreenType;\n(iii) SELECT S.ScreenType, COUNT(M.MId) FROM MOVIE M, SCREEN S WHERE M.ScreenNo = S.ScreenNo GROUP BY S.ScreenType;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "6D1",
            "marks": 6,
            "text": "Tables: SHOWS (ShowId INT, MovieId INT, AudiNo INT, TicketsSold INT, Price DECIMAL(6,2))\nand FILM (MovieId INT, MovieName VARCHAR(30), Language VARCHAR(15), Rating DECIMAL(2,1))\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display MovieName, Language, and AudiNo for all shows using an equi-join.\n(b) Display AudiNo and total TicketsSold in each auditorium.\n(c) Display Language and average movie Rating for each language.\n(d) Display highest ticket Price and lowest ticket Price in SHOWS table.\n(e) Display MovieId and total revenue (SUM(TicketsSold * Price)) for movies where revenue > 50000.\n(f) What is the output of: SELECT Language, COUNT(*) FROM FILM GROUP BY Language HAVING COUNT(*) > 1;",
            "solution": "(a) SELECT F.MovieName, F.Language, S.AudiNo FROM SHOWS S, FILM F WHERE S.MovieId = F.MovieId;\n(b) SELECT AudiNo, SUM(TicketsSold) FROM SHOWS GROUP BY AudiNo;\n(c) SELECT Language, AVG(Rating) FROM FILM GROUP BY Language;\n(d) SELECT MAX(Price), MIN(Price) FROM SHOWS;\n(e) SELECT MovieId, SUM(TicketsSold * Price) FROM SHOWS GROUP BY MovieId HAVING SUM(TicketsSold * Price) > 50000;\n(f) Displays each Language and the number of films in that language, only for languages with more than 1 film.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: E-Commerce Product Catalog & Supplier Network",
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
            "text": "What is the result of evaluating 'SELECT COUNT(NULL);' in MySQL?",
            "solution": "0 (zero). COUNT ignores NULL values.\n[Marking Scheme: 1 mark for 0.]"
          },
          {
            "qId": "7A2",
            "marks": 1,
            "text": "In an equi-join between two tables, what operator connects the common attributes?",
            "solution": "The equality operator '=' (e.g. Table1.id = Table2.id).\n[Marking Scheme: 1 mark for =.]"
          },
          {
            "qId": "7A3",
            "marks": 1,
            "text": "Table A has Degree 3, Table B has Degree 5. What is the Degree of their Cartesian product?",
            "solution": "3 + 5 = 8 columns.\n[Marking Scheme: 1 mark for 8.]"
          },
          {
            "qId": "7A4",
            "marks": 1,
            "text": "Which SQL clause is evaluated first: WHERE or SELECT?",
            "solution": "WHERE is evaluated before SELECT.\n[Marking Scheme: 1 mark for WHERE.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "7B1",
            "marks": 2,
            "text": "Differentiate between COUNT(*) and COUNT(DISTINCT Brand) on table Product.",
            "solution": "1. COUNT(*) counts total rows in the Product table regardless of nulls or duplicates.\n2. COUNT(DISTINCT Brand) counts the number of distinct, non-duplicate, non-null brands.\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "7B2",
            "marks": 2,
            "text": "Write a query to display Brand and the total stock of products for each brand where total stock exceeds 100.",
            "solution": "SELECT Brand, SUM(Stock) FROM Product GROUP BY Brand HAVING SUM(Stock) > 100;\n[Marking Scheme: 2 marks for correct GROUP BY and HAVING.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "7C1",
            "marks": 3,
            "text": "Table: PRODUCT (PCode INT, PName VARCHAR(30), Category VARCHAR(20), Price DECIMAL(8,2), Stock INT)\nWrite SQL queries to:\n(i) Display Category and total number of items in each category.\n(ii) Display Category, lowest Price, and highest Price for each category.\n(iii) Display Category and average Price for categories having average Price > 5000.",
            "solution": "(i) SELECT Category, COUNT(*) FROM PRODUCT GROUP BY Category;\n(ii) SELECT Category, MIN(Price), MAX(Price) FROM PRODUCT GROUP BY Category;\n(iii) SELECT Category, AVG(Price) FROM PRODUCT GROUP BY Category HAVING AVG(Price) > 5000;\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "7C2",
            "marks": 3,
            "text": "Tables: PRODUCT (PCode, PName, SuppId, Price) and SUPPLIER (SuppId, SuppName, Rating)\nWrite SQL queries to:\n(i) Display PName, Price, and SuppName using an equi-join.\n(ii) Display SuppName and count of products supplied by suppliers with Rating >= 4.0.\n(iii) Display SuppName and total catalog value (SUM(Price)) for each supplier.",
            "solution": "(i) SELECT P.PName, P.Price, S.SuppName FROM PRODUCT P, SUPPLIER S WHERE P.SuppId = S.SuppId;\n(ii) SELECT S.SuppName, COUNT(P.PCode) FROM PRODUCT P, SUPPLIER S WHERE P.SuppId = S.SuppId AND S.Rating >= 4.0 GROUP BY S.SuppId, S.SuppName;\n(iii) SELECT S.SuppName, SUM(P.Price) FROM PRODUCT P, SUPPLIER S WHERE P.SuppId = S.SuppId GROUP BY S.SuppId, S.SuppName;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "7D1",
            "marks": 6,
            "text": "Tables: ORDERS (OrderId INT, CustId INT, OrderDate DATE, TotalAmount DECIMAL(10,2))\nand CUSTOMER (CustId INT, CustName VARCHAR(30), State VARCHAR(20))\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display CustName, OrderDate, and TotalAmount for all orders.\n(b) Display State and total revenue collected from customers in each state.\n(c) Display CustId and number of orders placed by each customer.\n(d) Display highest and lowest TotalAmount among all orders.\n(e) Display State and average order amount for states where average order amount > 2500.\n(f) What is the output of: SELECT CustId, SUM(TotalAmount) FROM ORDERS GROUP BY CustId HAVING COUNT(*) >= 2;",
            "solution": "(a) SELECT C.CustName, O.OrderDate, O.TotalAmount FROM ORDERS O, CUSTOMER C WHERE O.CustId = C.CustId;\n(b) SELECT C.State, SUM(O.TotalAmount) FROM ORDERS O, CUSTOMER C WHERE O.CustId = C.CustId GROUP BY C.State;\n(c) SELECT CustId, COUNT(*) FROM ORDERS GROUP BY CustId;\n(d) SELECT MAX(TotalAmount), MIN(TotalAmount) FROM ORDERS;\n(e) SELECT C.State, AVG(O.TotalAmount) FROM ORDERS O, CUSTOMER C WHERE O.CustId = C.CustId GROUP BY C.State HAVING AVG(O.TotalAmount) > 2500;\n(f) Displays CustId and total spend for all customers who have placed 2 or more orders.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Hospital Patient Billing & Doctor Consultations",
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
            "text": "Which aggregate function is used to find the latest discharge date of patients?",
            "solution": "MAX(DischargeDate)\n[Marking Scheme: 1 mark for MAX(DischargeDate).]"
          },
          {
            "qId": "8A2",
            "marks": 1,
            "text": "Table Doctor has 7 rows, Table Patient has 20 rows. What is the Cardinality of Doctor × Patient?",
            "solution": "Cardinality = 7 * 20 = 140 rows.\n[Marking Scheme: 1 mark for 140.]"
          },
          {
            "qId": "8A3",
            "marks": 1,
            "text": "What is the difference between WHERE and HAVING regarding aggregate functions?",
            "solution": "HAVING can contain aggregate functions; WHERE cannot contain aggregate functions.\n[Marking Scheme: 1 mark for correct distinction.]"
          },
          {
            "qId": "8A4",
            "marks": 1,
            "text": "True or False: An Equi-Join can be performed between tables that have no columns in common.",
            "solution": "False. An equi-join requires at least one common attribute to establish equality comparison.\n[Marking Scheme: 1 mark for False.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "8B1",
            "marks": 2,
            "text": "Write a query to display Department and the total number of patients admitted in each department from table Patient.",
            "solution": "SELECT Department, COUNT(*) FROM Patient GROUP BY Department;\n[Marking Scheme: 2 marks for correct GROUP BY query.]"
          },
          {
            "qId": "8B2",
            "marks": 2,
            "text": "Explain how NULL values are handled by the AVG() function with a numeric example.",
            "solution": "AVG() completely ignores NULLs. E.g., for values (10, 20, NULL), AVG = (10 + 20) / 2 = 15.0, because the NULL value does not count towards either sum or row count.\n[Marking Scheme: 1 mark for explanation, 1 mark for numeric example.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "8C1",
            "marks": 3,
            "text": "Table: PATIENT (PId INT, PName VARCHAR(30), Dept VARCHAR(20), Fee DECIMAL(8,2), Age INT)\nWrite SQL queries to:\n(i) Display Dept and average Fee charged in each department.\n(ii) Display Dept and highest Fee for departments having more than 4 patients.\n(iii) Display the average age of patients in the 'Cardiology' department.",
            "solution": "(i) SELECT Dept, AVG(Fee) FROM PATIENT GROUP BY Dept;\n(ii) SELECT Dept, MAX(Fee) FROM PATIENT GROUP BY Dept HAVING COUNT(*) > 4;\n(iii) SELECT AVG(Age) FROM PATIENT WHERE Dept = 'Cardiology';\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "8C2",
            "marks": 3,
            "text": "Tables: DOCTOR (DocId, DocName, DeptId, ConsultationFee) and DEPARTMENT (DeptId, DeptName, Building)\nWrite SQL queries to:\n(i) Display DocName, DeptName, and Building using an equi-join.\n(ii) Display DeptName and average ConsultationFee of doctors in each department.\n(iii) Display DeptName and count of doctors working in Building 'A'.",
            "solution": "(i) SELECT D.DocName, T.DeptName, T.Building FROM DOCTOR D, DEPARTMENT T WHERE D.DeptId = T.DeptId;\n(ii) SELECT T.DeptName, AVG(D.ConsultationFee) FROM DOCTOR D, DEPARTMENT T WHERE D.DeptId = T.DeptId GROUP BY T.DeptId, T.DeptName;\n(iii) SELECT T.DeptName, COUNT(D.DocId) FROM DOCTOR D, DEPARTMENT T WHERE D.DeptId = T.DeptId AND T.Building = 'A' GROUP BY T.DeptId, T.DeptName;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "8D1",
            "marks": 6,
            "text": "Tables: PATIENT (PId INT, PName VARCHAR(30), DocId INT, BillAmount DECIMAL(8,2), RoomType VARCHAR(15))\nand DOCTOR (DocId INT, DocName VARCHAR(30), Specialization VARCHAR(25))\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display PName, BillAmount, and DocName for all patients.\n(b) Display RoomType and average BillAmount for each room type.\n(c) Display Specialization and total BillAmount generated by doctors of that specialization.\n(d) Display highest and lowest BillAmount across the entire hospital.\n(e) Display RoomType and total patients for room types having more than 5 patients.\n(f) What is the output of: SELECT DocId, COUNT(*) FROM PATIENT GROUP BY DocId HAVING COUNT(*) >= 3;",
            "solution": "(a) SELECT P.PName, P.BillAmount, D.DocName FROM PATIENT P, DOCTOR D WHERE P.DocId = D.DocId;\n(b) SELECT RoomType, AVG(BillAmount) FROM PATIENT GROUP BY RoomType;\n(c) SELECT D.Specialization, SUM(P.BillAmount) FROM PATIENT P, DOCTOR D WHERE P.DocId = D.DocId GROUP BY D.Specialization;\n(d) SELECT MAX(BillAmount), MIN(BillAmount) FROM PATIENT;\n(e) SELECT RoomType, COUNT(*) FROM PATIENT GROUP BY RoomType HAVING COUNT(*) > 5;\n(f) Displays DocId and number of patients assigned to that doctor, only for doctors treating 3 or more patients.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: University Department Faculty & Research Projects",
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
            "text": "Table Faculty has 10 rows and 5 columns. Table Project has 4 rows and 3 columns. What is the Degree of Faculty × Project?",
            "solution": "Degree = 5 + 3 = 8 columns.\n[Marking Scheme: 1 mark for 8.]"
          },
          {
            "qId": "9A2",
            "marks": 1,
            "text": "Which aggregate function returns the smallest value in a column?",
            "solution": "MIN() (e.g. MIN(GrantAmount))\n[Marking Scheme: 1 mark for MIN().]"
          },
          {
            "qId": "9A3",
            "marks": 1,
            "text": "What will 'SELECT COUNT(*) FROM Faculty WHERE Dept = 'CS';' return if no CS faculty exists?",
            "solution": "0 (zero).\n[Marking Scheme: 1 mark for 0.]"
          },
          {
            "qId": "9A4",
            "marks": 1,
            "text": "In SQL execution, does GROUP BY execute before or after WHERE?",
            "solution": "GROUP BY executes after WHERE.\n[Marking Scheme: 1 mark for after WHERE.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "9B1",
            "marks": 2,
            "text": "Explain the difference between grouping by a single column vs grouping by multiple columns with examples.",
            "solution": "1. Grouping by single column partitions data into groups based on values of that single column (e.g. GROUP BY Dept).\n2. Grouping by multiple columns partitions data based on distinct combinations of values across those columns (e.g. GROUP BY Dept, Designation).\n[Marking Scheme: 1 mark for single column, 1 mark for multi-column.]"
          },
          {
            "qId": "9B2",
            "marks": 2,
            "text": "Write a query to display Department and maximum Salary for departments where maximum Salary is at least 90000.",
            "solution": "SELECT Dept, MAX(Salary) FROM Faculty GROUP BY Dept HAVING MAX(Salary) >= 90000;\n[Marking Scheme: 2 marks for valid GROUP BY with HAVING.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "9C1",
            "marks": 3,
            "text": "Table: FACULTY (FacId INT, FName VARCHAR(30), Dept VARCHAR(20), Salary DECIMAL(10,2), Experience INT)\nWrite SQL queries to:\n(i) Display Dept and average Experience of faculty in each department.\n(ii) Display Dept and total salary paid to faculty members in that department.\n(iii) Display Dept and count of faculty having Experience > 10 years.",
            "solution": "(i) SELECT Dept, AVG(Experience) FROM FACULTY GROUP BY Dept;\n(ii) SELECT Dept, SUM(Salary) FROM FACULTY GROUP BY Dept;\n(iii) SELECT Dept, COUNT(*) FROM FACULTY WHERE Experience > 10 GROUP BY Dept;\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "9C2",
            "marks": 3,
            "text": "Tables: FACULTY (FacId, FName, DeptId, Salary) and PROJECT (ProjId, ProjName, FacId, GrantAmount)\nWrite SQL queries to:\n(i) Display FName, ProjName, and GrantAmount using an equi-join.\n(ii) Display FName and total grant amount (SUM(GrantAmount)) won by each faculty member.\n(iii) Display FName and count of projects handled by faculty whose Salary > 75000.",
            "solution": "(i) SELECT F.FName, P.ProjName, P.GrantAmount FROM FACULTY F, PROJECT P WHERE F.FacId = P.FacId;\n(ii) SELECT F.FName, SUM(P.GrantAmount) FROM FACULTY F, PROJECT P WHERE F.FacId = P.FacId GROUP BY F.FacId, F.FName;\n(iii) SELECT F.FName, COUNT(P.ProjId) FROM FACULTY F, PROJECT P WHERE F.FacId = P.FacId AND F.Salary > 75000 GROUP BY F.FacId, F.FName;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "9D1",
            "marks": 6,
            "text": "Tables: COURSE (CourseId VARCHAR(10), CName VARCHAR(30), DeptId INT, Credits INT)\nand DEPARTMENT (DeptId INT, DeptName VARCHAR(30), HOD VARCHAR(30))\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display CName, Credits, and DeptName of all courses.\n(b) Display DeptName and total Credits offered by each department.\n(c) Display DeptName and count of courses offered in that department.\n(d) Display highest and lowest Credits among all courses.\n(e) Display DeptName and average credits for departments offering more than 3 courses.\n(f) What is the output of: SELECT DeptName, COUNT(*) FROM DEPARTMENT D, COURSE C WHERE D.DeptId = C.DeptId GROUP BY D.DeptId, D.DeptName HAVING COUNT(*) >= 2;",
            "solution": "(a) SELECT C.CName, C.Credits, D.DeptName FROM COURSE C, DEPARTMENT D WHERE C.DeptId = D.DeptId;\n(b) SELECT D.DeptName, SUM(C.Credits) FROM COURSE C, DEPARTMENT D WHERE C.DeptId = D.DeptId GROUP BY D.DeptId, D.DeptName;\n(c) SELECT D.DeptName, COUNT(C.CourseId) FROM COURSE C, DEPARTMENT D WHERE C.DeptId = D.DeptId GROUP BY D.DeptId, D.DeptName;\n(d) SELECT MAX(Credits), MIN(Credits) FROM COURSE;\n(e) SELECT D.DeptName, AVG(C.Credits) FROM COURSE C, DEPARTMENT D WHERE C.DeptId = D.DeptId GROUP BY D.DeptId, D.DeptName HAVING COUNT(C.CourseId) > 3;\n(f) Displays each DeptName and the number of courses offered, only for departments offering at least 2 courses.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Fitness Center Memberships & Personal Trainers",
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
            "text": "Table Member has 25 rows and 6 columns. Table Trainer has 5 rows and 4 columns. What is the Cardinality of their Cartesian product?",
            "solution": "Cardinality = 25 * 5 = 125 rows.\n[Marking Scheme: 1 mark for 125.]"
          },
          {
            "qId": "10A2",
            "marks": 1,
            "text": "Which aggregate function is used to calculate the total fee collected across all members?",
            "solution": "SUM(Fee)\n[Marking Scheme: 1 mark for SUM(Fee).]"
          },
          {
            "qId": "10A3",
            "marks": 1,
            "text": "Identify the error in: SELECT Plan, TrainerId, AVG(Fee) FROM Member GROUP BY Plan;",
            "solution": "TrainerId is in the SELECT clause but is neither in the GROUP BY clause nor inside an aggregate function.\n[Marking Scheme: 1 mark for identifying TrainerId error.]"
          },
          {
            "qId": "10A4",
            "marks": 1,
            "text": "Can an Equi-Join combine 3 tables? How many join predicates are needed?",
            "solution": "Yes. Exactly 2 join predicates (3 - 1 = 2) are required.\n[Marking Scheme: 1 mark for Yes and 2 predicates.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "10B1",
            "marks": 2,
            "text": "Differentiate between COUNT(*) and COUNT(TrainerId) on table Member if 4 members do not have a trainer assigned.",
            "solution": "1. COUNT(*) counts all member rows including the 4 without trainers.\n2. COUNT(TrainerId) ignores the 4 members with NULL TrainerId and returns only members who have a trainer assigned.\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "10B2",
            "marks": 2,
            "text": "Write a query to display Plan and total fee for each membership plan where total fee exceeds 50000.",
            "solution": "SELECT Plan, SUM(Fee) FROM Member GROUP BY Plan HAVING SUM(Fee) > 50000;\n[Marking Scheme: 2 marks for valid query.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "10C1",
            "marks": 3,
            "text": "Table: MEMBER (MemId INT, MName VARCHAR(30), Plan VARCHAR(15), Fee DECIMAL(8,2), Gender CHAR(1))\nWrite SQL queries to:\n(i) Count total members in each Plan.\n(ii) Display Plan, lowest Fee, and highest Fee for each plan.\n(iii) Display Plan and average Fee of female members ('F') for plans having average fee > 1500.",
            "solution": "(i) SELECT Plan, COUNT(*) FROM MEMBER GROUP BY Plan;\n(ii) SELECT Plan, MIN(Fee), MAX(Fee) FROM MEMBER GROUP BY Plan;\n(iii) SELECT Plan, AVG(Fee) FROM MEMBER WHERE Gender = 'F' GROUP BY Plan HAVING AVG(Fee) > 1500;\n[Marking Scheme: 1 mark each.]"
          },
          {
            "qId": "10C2",
            "marks": 3,
            "text": "Tables: MEMBER (MemId, MName, TrainerId, Fee) and TRAINER (TrainerId, TName, Specialty)\nWrite SQL queries to:\n(i) Display MName, Fee, and TName using an equi-join.\n(ii) Display TName and total fee collected from members trained by each trainer.\n(iii) Display Specialty and count of trainers in each specialty.",
            "solution": "(i) SELECT M.MName, M.Fee, T.TName FROM MEMBER M, TRAINER T WHERE M.TrainerId = T.TrainerId;\n(ii) SELECT T.TName, SUM(M.Fee) FROM MEMBER M, TRAINER T WHERE M.TrainerId = T.TrainerId GROUP BY T.TrainerId, T.TName;\n(iii) SELECT Specialty, COUNT(*) FROM TRAINER GROUP BY Specialty;\n[Marking Scheme: 1 mark each.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "10D1",
            "marks": 6,
            "text": "Tables: GYM_EQUIPMENT (EqId INT, EqName VARCHAR(30), CategoryId INT, Cost DECIMAL(10,2), Qty INT)\nand CATEGORY (CategoryId INT, CatName VARCHAR(25), FloorNo INT)\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display EqName, Cost, and CatName for all equipment.\n(b) Display CatName and total equipment cost (SUM(Cost * Qty)) in each category.\n(c) Display CatName and count of distinct equipment types in each category.\n(d) Display highest and lowest Cost in GYM_EQUIPMENT table.\n(e) Display CatName and average cost for categories on FloorNo 1 having average cost > 20000.\n(f) What is the output of: SELECT CatName, COUNT(*) FROM CATEGORY C, GYM_EQUIPMENT G WHERE C.CategoryId = G.CategoryId GROUP BY C.CategoryId, C.CatName HAVING COUNT(*) >= 3;",
            "solution": "(a) SELECT G.EqName, G.Cost, C.CatName FROM GYM_EQUIPMENT G, CATEGORY C WHERE G.CategoryId = C.CategoryId;\n(b) SELECT C.CatName, SUM(G.Cost * G.Qty) FROM GYM_EQUIPMENT G, CATEGORY C WHERE G.CategoryId = C.CategoryId GROUP BY C.CategoryId, C.CatName;\n(c) SELECT C.CatName, COUNT(G.EqId) FROM GYM_EQUIPMENT G, CATEGORY C WHERE G.CategoryId = C.CategoryId GROUP BY C.CategoryId, C.CatName;\n(d) SELECT MAX(Cost), MIN(Cost) FROM GYM_EQUIPMENT;\n(e) SELECT C.CatName, AVG(G.Cost) FROM GYM_EQUIPMENT G, CATEGORY C WHERE G.CategoryId = C.CategoryId AND C.FloorNo = 1 GROUP BY C.CategoryId, C.CatName HAVING AVG(G.Cost) > 20000;\n(f) Displays CatName and number of equipment items in each category that holds at least 3 distinct equipment types.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  }
];
export default samplePaperSets;
