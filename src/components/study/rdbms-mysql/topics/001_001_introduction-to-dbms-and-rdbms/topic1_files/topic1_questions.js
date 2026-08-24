/**
 * Topic 1: Understanding Data Processing – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is data processing?",
    shortAnswer:
      "Data processing is the collection and manipulation of raw data to produce meaningful information.",
    explanation:
      "It is the essential bridge between raw facts and actionable insights. Data processing involves a series of steps including collection, preparation, input, processing, output, and storage. It can be manual, mechanical, or electronic.",
    hint: "Think about how raw ingredients are turned into a finished dish.",
    level: "basic",
    codeExample:
      "// Data: Raw numbers\n// Processing: Calculate average\n// Information: The average score is 85",
  },
  {
    question: "What are the six stages of the data processing cycle?",
    shortAnswer:
      "The six stages are: Collection, Preparation, Input, Processing, Output, and Storage.",
    explanation:
      "Collection gathers raw data. Preparation cleans and validates it. Input enters it into the system. Processing transforms it. Output presents the results. Storage saves it for future use. Each stage is essential for producing quality information.",
    hint: "Think about how a photo goes from being taken to being printed and saved.",
    level: "basic",
  },
  {
    question: "What is the difference between batch processing and real-time processing?",
    shortAnswer:
      "Batch processing processes data in groups at scheduled times; real-time processing processes data immediately as it arrives.",
    explanation:
      "Batch processing is used for non-urgent tasks like payroll, where data is collected over a period and processed together. Real-time processing is used for immediate tasks like ATM transactions, where results are needed instantly. Each has its own advantages and use cases.",
    hint: "Think about the difference between a bank statement and an ATM withdrawal.",
    level: "intermediate",
  },
  {
    question: "What is GIGO (Garbage In, Garbage Out)?",
    shortAnswer:
      "GIGO is the concept that the quality of output depends on the quality of input — poor data leads to poor results.",
    explanation:
      "If you process incorrect, incomplete, or invalid data, the results will be incorrect, incomplete, or invalid. This is why data preparation (cleaning and validation) is critical. GIGO applies to all data processing systems, from simple spreadsheets to complex AI models.",
    hint: "Think about why a recipe made with spoiled ingredients won't taste good.",
    level: "basic",
  },
  {
    question: "What are the three methods of data processing?",
    shortAnswer:
      "The three methods are manual processing, mechanical processing, and electronic processing.",
    explanation:
      "Manual processing is done by humans without machines (e.g., handwritten records). Mechanical processing uses devices like calculators and typewriters. Electronic processing uses computers and software. Modern systems primarily use electronic processing for speed and accuracy.",
    hint: "Think about how data was processed 100 years ago vs. today.",
    level: "basic",
  },
  {
    question: "What is the difference between data processing and data management?",
    shortAnswer:
      "Data processing focuses on transforming data into information; data management encompasses the entire lifecycle of data including governance, security, and storage.",
    explanation:
      "Processing is a subset of management that specifically deals with operations on data. Management includes planning, policies, security, quality control, and archival. Processing is about 'doing' things to data; management is about 'overseeing' the entire data ecosystem.",
    hint: "Think of data processing as cooking and data management as running the entire restaurant.",
    level: "intermediate",
  },
  {
    question: "What is online data processing?",
    shortAnswer:
      "Online data processing processes data interactively with user input, returning results immediately.",
    explanation:
      "It's used in web applications, search engines, and e-commerce systems. Users interact with the system, data is processed in real-time, and results are displayed instantly. It requires a network connection and often involves a client-server architecture.",
    hint: "Think about how a website search returns results instantly.",
    level: "intermediate",
  },
  {
    question: "What is distributed data processing?",
    shortAnswer:
      "Distributed data processing spreads processing across multiple computers or servers to handle large volumes of data efficiently.",
    explanation:
      "It's used in big data applications, cloud computing, and scientific computing. By distributing the workload, systems can process data faster and handle failures more gracefully. Hadoop and Spark are examples of distributed processing frameworks.",
    hint: "Think about how a large task can be split among many workers.",
    level: "intermediate",
  },
  {
    question: "What is the preparation stage in data processing?",
    shortAnswer:
      "Preparation involves cleaning, validating, and formatting data to ensure quality and consistency before processing.",
    explanation:
      "This is often the most time-consuming stage. It includes removing duplicates, handling missing values, standardizing formats, and validating data against rules. Good preparation prevents GIGO and ensures reliable results.",
    hint: "Think about washing and chopping vegetables before cooking.",
    level: "basic",
  },
  {
    question: "What is the output stage in data processing?",
    shortAnswer:
      "The output stage presents the processed information in a usable format, such as reports, dashboards, or visualizations.",
    explanation:
      "The output must be tailored to the audience. It can be a printed report, a screen display, a chart, or a data file. The goal is to make the information clear, actionable, and easy to understand.",
    hint: "Think about how a spreadsheet becomes a chart or a report.",
    level: "basic",
  },
  {
    question: "What is the storage stage in data processing?",
    shortAnswer:
      "Storage saves data and information for future use, retrieval, or further processing.",
    explanation:
      "Storage can be temporary (cache, RAM) or permanent (hard drives, databases, cloud storage). Proper storage ensures data is available when needed, protected from loss, and organized for efficient retrieval.",
    hint: "Think about how you save a document to access it later.",
    level: "basic",
  },
  {
    question: "What is the role of feedback in the data processing cycle?",
    shortAnswer:
      "Feedback allows the data processing cycle to be iterative, improving processes and outcomes based on results.",
    explanation:
      "Feedback loops enable continuous improvement. If the output is not satisfactory, the process can be adjusted. This might involve refining the data collection, preparation, or processing steps. Feedback is essential for quality assurance.",
    hint: "Think about how you taste food and adjust the seasoning during cooking.",
    level: "intermediate",
  },
  {
    question: "What is the difference between data processing and data analysis?",
    shortAnswer:
      "Data processing transforms raw data into usable information; data analysis interprets and draws insights from that information.",
    explanation:
      "Processing is the foundation — it makes data ready for analysis. Analysis goes a step further: it explores patterns, tests hypotheses, and generates recommendations. Both are essential, but they serve different purposes.",
    hint: "Think about processing as preparing data and analysis as understanding it.",
    level: "intermediate",
  },
  {
    question: "What are the characteristics of electronic data processing?",
    shortAnswer:
      "Electronic data processing is fast, accurate, automated, scalable, and capable of handling large volumes of data.",
    explanation:
      "It uses computers and software to process data automatically. It reduces human error, can run continuously, and can handle complex operations. It's the most common method in modern organizations.",
    hint: "Think about how a computer can process millions of records in seconds.",
    level: "basic",
  },
  {
    question: "What are the common tools used in data processing?",
    shortAnswer:
      "Common tools include spreadsheets (Excel), databases (MySQL, Oracle), ETL tools (Talend, Informatica), and programming languages (Python, SQL).",
    explanation:
      "The choice of tool depends on the data volume, complexity, and requirements. Spreadsheets are good for small datasets; databases for structured data; ETL tools for integration; and Python/SQL for custom processing.",
    hint: "Think about the tools you would use to organize and analyze data.",
    level: "intermediate",
  },
  {
    question: "What is the input stage in data processing?",
    shortAnswer:
      "The input stage involves entering prepared data into the processing system for transformation.",
    explanation:
      "This can be manual entry, file uploads, API calls, or automated data feeds. The input must be in a format that the system can process. Validation at this stage prevents errors later.",
    hint: "Think about how you enter data into a form or a spreadsheet.",
    level: "basic",
  },
  {
    question: "What is the collection stage in data processing?",
    shortAnswer:
      "Collection involves gathering raw data from various sources, such as surveys, sensors, transactions, or forms.",
    explanation:
      "Sources can be internal (company records) or external (third-party data). The collection method must ensure data accuracy, completeness, and timeliness. This stage sets the foundation for the entire process.",
    hint: "Think about how a company gathers customer information from orders.",
    level: "basic",
  },
  {
    question: "What is the difference between online and batch processing?",
    shortAnswer:
      "Online processing is interactive and immediate; batch processing is deferred and processes data in groups.",
    explanation:
      "Online processing is used when immediate results are needed, like booking a ticket. Batch processing is used when results can wait, like generating monthly reports. Online processing requires a network connection; batch processing can be done offline.",
    hint: "Think about the difference between checking your balance online and receiving a monthly statement.",
    level: "intermediate",
  },
  {
    question: "What is ETL in data processing?",
    shortAnswer:
      "ETL stands for Extract, Transform, Load — a process used to move and transform data from sources to destinations.",
    explanation:
      "Extract: Read data from source systems. Transform: Clean, validate, and format data. Load: Write data to a target system (like a data warehouse). ETL is a common pattern in data integration and business intelligence.",
    hint: "Think about moving data from a transactional system to a reporting database.",
    level: "intermediate",
  },
  {
    question: "What are the challenges of real-time data processing?",
    shortAnswer:
      "Challenges include latency requirements, data volume management, fault tolerance, and system complexity.",
    explanation:
      "Real-time processing demands low latency (milliseconds to seconds). It must handle high volumes of data and maintain availability. It also requires complex architectures involving message queues, stream processing, and monitoring.",
    hint: "Think about how a stock trading system must handle millions of trades per second.",
    level: "expert",
  },
  {
    question: "What is the role of databases in data processing?",
    shortAnswer:
      "Databases provide structured storage and retrieval for data, enabling efficient processing, querying, and management.",
    explanation:
      "Databases are the backbone of most data processing systems. They ensure data integrity, support concurrent access, and provide powerful querying capabilities. Without databases, processing large volumes of data would be impractical.",
    hint: "Think about how a library catalog helps you find books quickly.",
    level: "basic",
  },
  {
    question: "What is the difference between data processing and data entry?",
    shortAnswer:
      "Data entry is the manual input of data into a system; data processing encompasses the entire transformation of data into information.",
    explanation:
      "Data entry is a subset of the input stage. Processing includes all the other stages: preparation, transformation, output, and storage. Data entry is often the most labor-intensive and error-prone part of the process.",
    hint: "Think about how typing a customer's name is data entry; calculating their bill is data processing.",
    level: "basic",
  },
  {
    question: "What is data validation in the preparation stage?",
    shortAnswer:
      "Data validation checks that data meets defined rules, such as format, range, or completeness, before processing.",
    explanation:
      "Validation ensures data quality. Examples include: checking that a date is in the correct format, that a number is within a range, or that required fields are filled. Validation prevents errors and ensures consistency.",
    hint: "Think about how a form checks that you've entered a valid email address.",
    level: "intermediate",
  },
  {
    question: "What are the advantages of electronic data processing over manual?",
    shortAnswer:
      "Electronic processing is faster, more accurate, scalable, and can handle complex operations automatically.",
    explanation:
      "It reduces human error, processes data 24/7, handles large volumes, and can be automated. This leads to cost savings, improved accuracy, and faster decision-making. Manual processing is limited by human speed and prone to errors.",
    hint: "Think about how a computer can calculate thousands of numbers in seconds.",
    level: "basic",
  },
  {
    question: "What is data cleansing in the preparation stage?",
    shortAnswer:
      "Data cleansing is the process of detecting and correcting errors and inconsistencies in data.",
    explanation:
      "This includes removing duplicates, correcting typos, standardizing formats, and handling missing values. Cleansing is often the most important step in preparation because it directly impacts the quality of the final information.",
    hint: "Think about how you would clean a dataset with missing or inconsistent entries.",
    level: "intermediate",
  },
  {
    question: "What is the role of algorithms in the processing stage?",
    shortAnswer:
      "Algorithms are the step-by-step instructions that transform input data into output information during the processing stage.",
    explanation:
      "Algorithms can perform calculations, sorting, filtering, aggregations, and complex operations. They are the core of the processing stage, determining what happens to the data and what information is produced.",
    hint: "Think about the steps a computer follows to calculate an average.",
    level: "intermediate",
  },
  {
    question: "What is the difference between structured and unstructured data processing?",
    shortAnswer:
      "Structured data processing uses predefined schemas (like SQL); unstructured processing handles data without a fixed format (like text or images).",
    explanation:
      "Structured data is organized and easy to process with traditional tools. Unstructured data requires advanced techniques like NLP, image recognition, or machine learning. Processing unstructured data is more complex but increasingly important.",
    hint: "Think about the difference between a spreadsheet and a collection of emails.",
    level: "intermediate",
  },
  {
    question: "What is data transformation in data processing?",
    shortAnswer:
      "Data transformation converts data from one format or structure to another to make it suitable for its intended use.",
    explanation:
      "This can include converting data types, aggregating data, joining datasets, or changing the data structure. Transformation is a key part of the processing stage, especially in ETL processes.",
    hint: "Think about how you might convert a CSV file to a JSON format.",
    level: "intermediate",
  },
  {
    question: "What is the importance of data security in data processing?",
    shortAnswer:
      "Data security protects data from unauthorized access, corruption, or theft throughout the processing lifecycle.",
    explanation:
      "Security is critical in all stages: collection (secure channels), storage (encryption), processing (access controls), and output (data masking). Breaches can lead to financial loss, legal liability, and reputational damage.",
    hint: "Think about why a bank must protect customer account information.",
    level: "intermediate",
  },
  {
    question: "What is the future of data processing with AI and machine learning?",
    shortAnswer:
      "AI and ML are automating data processing, enabling intelligent data preparation, automated cleansing, and predictive insights.",
    explanation:
      "AI can automatically detect and correct errors, suggest transformations, and generate insights. ML models can learn from data to improve processing over time. This reduces manual effort and enables more sophisticated analysis.",
    hint: "Think about how a recommendation engine learns from your behavior.",
    level: "expert",
  },
  {
    question: "What are the best practices for efficient data processing?",
    shortAnswer:
      "Best practices include: plan ahead, clean data early, automate repetitive tasks, document processes, and monitor performance.",
    explanation:
      "Efficient processing requires a clear plan, good data quality, automation, and ongoing monitoring. It also requires collaboration between IT and business stakeholders to ensure the output meets business needs.",
    hint: "Think about how you would design a data processing pipeline for a large organization.",
    level: "expert",
  },
];

export default questions;