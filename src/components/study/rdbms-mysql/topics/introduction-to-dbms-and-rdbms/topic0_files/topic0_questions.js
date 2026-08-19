/**
 * Topic 0: Introduction to Data and Information – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is the fundamental difference between data and information?",
    shortAnswer:
      "Data is raw, unprocessed facts, while information is data that has been processed, organized, and given context to make it meaningful.",
    explanation:
      "Data represents raw facts like numbers, text, or symbols without context (e.g., '25', 'Dhaka'). Information is data that has been processed, interpreted, and organized to convey meaning (e.g., 'The temperature in Dhaka is 25°C'). The transformation from data to information involves adding context, structure, and purpose.",
    hint: "Think about how a single number becomes meaningful when you know what it represents.",
    level: "basic",
    codeExample:
      "// Data: '45'\n// Information: 'Student scored 45 out of 100'",
  },
  {
    question: "What are the main types of data in information systems?",
    shortAnswer:
      "The main types are structured data (organized in fixed fields), semi-structured data (some organizational properties), and unstructured data (no predefined format).",
    explanation:
      "Structured data fits neatly into tables with rows and columns (e.g., spreadsheets, SQL databases). Semi-structured data has some organizational properties but not a rigid schema (e.g., JSON, XML). Unstructured data lacks a predefined format (e.g., text documents, images, videos). Understanding these types is crucial for choosing the right storage and processing methods.",
    hint: "Think about how data is organized in a spreadsheet vs. a Word document.",
    level: "intermediate",
  },
  {
    question: "What is the DIKW pyramid and what does it represent?",
    shortAnswer:
      "The DIKW pyramid is a model that represents the hierarchy from Data to Information to Knowledge to Wisdom, showing how raw data is transformed into actionable wisdom.",
    explanation:
      "DIKW stands for Data, Information, Knowledge, Wisdom. Data is raw facts. Information is data with context. Knowledge is information applied to make decisions. Wisdom is knowledge applied with insight and experience. The pyramid illustrates that each level adds more value, context, and human understanding. It's a foundational concept in information science and knowledge management.",
    hint: "Think about how a simple fact can lead to a wise decision through a series of transformations.",
    level: "expert",
    codeExample:
      "// Data: '500'\n// Information: '500 patients visited the clinic this month'\n// Knowledge: 'Patient visits increased by 20% from last month'\n// Wisdom: 'We need to hire more staff to handle the growing patient load'",
  },
  {
    question: "What are the key characteristics of quality information?",
    shortAnswer:
      "Quality information is accurate, complete, timely, relevant, concise, and presented in a format that is understandable to the user.",
    explanation:
      "Accuracy ensures the information is correct and error-free. Completeness means all necessary data is included. Timeliness ensures information is available when needed. Relevance means it applies to the user's needs. Conciseness avoids unnecessary details. Understandability requires proper formatting and clear presentation. These characteristics are essential for effective decision-making.",
    hint: "Think about what makes a news report trustworthy and useful.",
    level: "intermediate",
  },
  {
    question: "How does context transform raw data into meaningful information?",
    shortAnswer:
      "Context adds meaning to data by providing surrounding circumstances, purpose, and relevance, which helps interpret the data correctly.",
    explanation:
      "Context includes factors like time, place, source, purpose, and relationship to other data. For example, the number '100' is just data, but '100 patients recovered today' becomes information with context. Context helps answer the 'who, what, when, where, why, and how' questions that make data actionable.",
    hint: "Think about how a date alone is meaningless without knowing what event it refers to.",
    level: "basic",
  },
  {
    question: "What is the difference between quantitative and qualitative data?",
    shortAnswer:
      "Quantitative data is numerical and measurable (e.g., height, weight), while qualitative data is descriptive and categorical (e.g., colors, opinions).",
    explanation:
      "Quantitative data can be counted, measured, and analyzed using statistical methods. Examples include temperature, sales figures, and test scores. Qualitative data is subjective and descriptive, capturing qualities or characteristics. Examples include customer feedback, product reviews, and interview responses. Both types are valuable in different research and business contexts.",
    hint: "Think about the difference between 'how many' and 'what kind'.",
    level: "basic",
  },
  {
    question: "What are the common sources of data in a typical organization?",
    shortAnswer:
      "Common sources include internal systems (ERP, CRM, HR), external sources (market research, social media), sensors/IoT devices, and transactional records.",
    explanation:
      "Internal sources include operational systems like Enterprise Resource Planning (ERP), Customer Relationship Management (CRM), and Human Resources (HR) databases. External sources include market research reports, social media feeds, and government statistics. IoT devices and sensors generate real-time data. Transactional records capture business activities. Organizations often combine multiple sources for comprehensive analysis.",
    hint: "Think about all the places where a company collects information about its operations and customers.",
    level: "intermediate",
  },
  {
    question: "What is data processing and what are its main stages?",
    shortAnswer:
      "Data processing is the transformation of raw data into meaningful information through a series of steps: collection, preparation, input, processing, output, and storage.",
    explanation:
      "The stages are: 1) Collection – gathering raw data from sources. 2) Preparation – cleaning and formatting data. 3) Input – entering data into the processing system. 4) Processing – applying algorithms, calculations, or transformations. 5) Output – presenting the processed information. 6) Storage – saving data for future use. This cycle is fundamental to all information systems.",
    hint: "Think about how a photo goes from being taken to being shared online.",
    level: "basic",
  },
  {
    question: "What is metadata and why is it important in data management?",
    shortAnswer:
      "Metadata is 'data about data' – it describes the characteristics, context, and structure of data, making it discoverable, understandable, and usable.",
    explanation:
      "Metadata includes information like file size, creation date, author, data type, and relationships to other data. For example, in a photo, metadata might include the camera model, date taken, and GPS location. Metadata is crucial for data governance, searchability, interoperability, and lineage tracking. It helps organizations understand and manage their data assets effectively.",
    hint: "Think about the information you see when you right-click a file and select 'Properties'.",
    level: "intermediate",
  },
  {
    question: "What is the role of databases in managing data and information?",
    shortAnswer:
      "Databases provide a structured, organized, and efficient way to store, retrieve, and manage data, ensuring data integrity, security, and accessibility.",
    explanation:
      "Databases are software systems that store data in a structured format (e.g., tables, documents, graphs). They provide features like querying, indexing, transaction management, and access control. Databases ensure data consistency, reduce redundancy, and support concurrent access by multiple users. They are the backbone of modern information systems, powering everything from e-commerce to healthcare.",
    hint: "Think of a database as a digital filing cabinet with powerful search and organization capabilities.",
    level: "basic",
  },
  {
    question: "What is the difference between data governance and data management?",
    shortAnswer:
      "Data governance is the strategic framework of policies and standards for data, while data management is the operational execution of those policies.",
    explanation:
      "Data governance defines who can access data, how it should be used, and what standards it must meet. It's about decision rights and accountability. Data management is the day-to-day activities of collecting, storing, processing, and maintaining data. Governance provides the 'rules of the road' while management handles the 'driving'. Both are essential for effective data strategy.",
    hint: "Think of governance as the constitution and management as the government that enforces it.",
    level: "expert",
  },
  {
    question: "What is data integrity and why is it critical for information systems?",
    shortAnswer:
      "Data integrity refers to the accuracy, consistency, and reliability of data throughout its lifecycle, ensuring that data is trustworthy and unaltered.",
    explanation:
      "Data integrity encompasses both physical integrity (protection against hardware failures) and logical integrity (preserving data meaning and relationships). It includes constraints like unique keys, foreign keys, and check constraints. Data integrity is critical because decisions based on corrupted data can lead to costly mistakes, compliance violations, and loss of stakeholder trust.",
    hint: "Think about why a bank needs to ensure that account balances are always accurate.",
    level: "intermediate",
  },
  {
    question: "What are the ethical considerations in handling data and information?",
    shortAnswer:
      "Ethical data handling involves respecting privacy, obtaining consent, ensuring transparency, preventing bias, and protecting data from misuse.",
    explanation:
      "Key ethical principles include: 1) Privacy – protecting personal information. 2) Consent – obtaining explicit permission to collect and use data. 3) Transparency – being clear about how data is used. 4) Fairness – avoiding bias in algorithms and decisions. 5) Accountability – taking responsibility for data practices. These considerations are increasingly important with regulations like GDPR and growing public awareness of data rights.",
    hint: "Think about how you would want your own personal data to be treated by companies.",
    level: "expert",
  },
  {
    question: "What is the difference between data processing and data management?",
    shortAnswer:
      "Data processing focuses on transforming raw data into information, while data management encompasses the broader lifecycle of data from creation to disposal.",
    explanation:
      "Data processing is a subset of data management that specifically deals with applying operations to data to convert it into a usable form. Data management includes planning, governance, storage, security, quality control, and archival. Processing is about 'doing' things to data, while management is about 'overseeing' the entire data ecosystem.",
    hint: "Think of data processing as cooking and data management as running the entire restaurant.",
    level: "intermediate",
  },
  {
    question: "What are the key components of an information system?",
    shortAnswer:
      "An information system consists of hardware, software, data, procedures, people, and communication networks working together to collect, process, and distribute information.",
    explanation:
      "Hardware includes physical devices like computers and servers. Software includes operating systems and applications. Data is the raw material being processed. Procedures are the policies and rules governing the system. People are the users who interact with the system. Communication networks enable data sharing. All components must work together harmoniously for the system to be effective.",
    hint: "Think about all the parts that make up an online banking system.",
    level: "basic",
  },
  {
    question: "What is data redundancy and why is it problematic?",
    shortAnswer:
      "Data redundancy occurs when the same data is stored in multiple places, leading to wasted storage, inconsistency, and maintenance challenges.",
    explanation:
      "Redundancy can cause data inconsistency when updates are made to one copy but not others. It wastes storage space and slows down operations. Inconsistent data can lead to incorrect decisions and reporting errors. Database normalization is a technique used to minimize redundancy by organizing data efficiently.",
    hint: "Think about what happens when you change your address with one company but not another.",
    level: "basic",
  },
  {
    question: "What are the characteristics of valuable information?",
    shortAnswer:
      "Valuable information is accurate, timely, relevant, complete, concise, accessible, and presented in a form that supports decision-making.",
    explanation:
      "These characteristics align with the quality of information. Accuracy ensures correctness. Timeliness means it's available when needed. Relevance ensures it applies to the user's context. Completeness means no gaps. Conciseness avoids information overload. Accessibility means users can find and use it. Presentation impacts how easily information can be understood and acted upon.",
    hint: "Think about what makes a weather forecast useful for planning your day.",
    level: "intermediate",
  },
  {
    question: "How do structured, semi-structured, and unstructured data differ in terms of storage and analysis?",
    shortAnswer:
      "Structured data is stored in relational databases and easily analyzed with SQL; semi-structured data uses flexible formats like JSON; unstructured data requires specialized tools like text analytics or computer vision.",
    explanation:
      "Structured data fits into predefined schemas (tables with rows/columns) and is queried using SQL. Semi-structured data has some organization but flexible schemas (e.g., JSON, XML, log files). Unstructured data lacks a predefined format (text, images, video) and requires NLP, image recognition, or other advanced techniques. The choice of storage and analysis method depends on the data type and use case.",
    hint: "Think about the difference between a spreadsheet, an email with JSON attachments, and a video file.",
    level: "expert",
  },
  {
    question: "What is data consistency and how is it maintained?",
    shortAnswer:
      "Data consistency ensures that data values are logically coherent and uniform across all systems and databases, maintained through constraints, transactions, and validation rules.",
    explanation:
      "Consistency means data follows defined rules and relationships. In databases, this is enforced through constraints (primary keys, foreign keys, check constraints, unique constraints). Transactions ensure consistency by guaranteeing that operations complete fully or not at all. Validation rules prevent invalid data entry. Consistency is crucial for reliable reporting and decision-making.",
    hint: "Think about why a database should prevent a customer from having a negative balance if it's not allowed.",
    level: "intermediate",
  },
  {
    question: "What is the difference between data and information in a business context?",
    shortAnswer:
      "In business, data is raw facts captured from operations (e.g., sales numbers), while information is processed, contextualized data that supports strategic decisions.",
    explanation:
      "Business data includes transaction records, customer details, inventory counts, and financial figures. Information is generated by analyzing this data to reveal trends, patterns, and insights. For example, '100 units sold' is data; 'Sales of product X increased by 20% this quarter, suggesting a market trend' is information. Businesses transform data into information to gain competitive advantage.",
    hint: "Think about how a retail chain uses sales data to decide which products to stock.",
    level: "basic",
  },
  {
    question: "What are the common data formats used in information systems?",
    shortAnswer:
      "Common formats include CSV, JSON, XML, Parquet, Avro, and protocol buffers, each suited for different use cases like data interchange, storage, and streaming.",
    explanation:
      "CSV (Comma-Separated Values) is simple and widely used for tabular data. JSON (JavaScript Object Notation) is human-readable and popular for web APIs. XML is flexible and used in enterprise systems. Parquet and Avro are columnar formats for big data. Protocol buffers are efficient for streaming. Choosing the right format depends on factors like performance, readability, and interoperability.",
    hint: "Think about the different ways you might save data from an Excel spreadsheet vs. a web API.",
    level: "intermediate",
  },
  {
    question: "What is the importance of data quality in decision-making?",
    shortAnswer:
      "Data quality directly impacts the accuracy and reliability of decisions; poor data quality leads to incorrect insights, wasted resources, and lost opportunities.",
    explanation:
      "High-quality data ensures decisions are based on accurate, complete, and timely information. Poor data quality can result in misallocated budgets, ineffective marketing campaigns, operational inefficiencies, and compliance failures. Data quality is measured on dimensions like accuracy, completeness, consistency, timeliness, and validity. Organizations invest in data quality management to maintain a competitive edge.",
    hint: "Think about why a GPS navigation system needs accurate map data to give correct directions.",
    level: "intermediate",
  },
  {
    question: "What is data lifecycle management and why is it important?",
    shortAnswer:
      "Data lifecycle management (DLM) is the process of managing data from creation to disposal, ensuring efficient use, compliance, and cost optimization.",
    explanation:
      "DLM covers the entire lifecycle: creation, storage, use, sharing, archival, and deletion. It includes policies for data retention, backup, security, and access control. DLM is important for regulatory compliance (e.g., GDPR, HIPAA), cost management (storing data has costs), and data governance. It ensures that data is available when needed and disposed of when no longer required.",
    hint: "Think about how a hospital manages patient records from admission to long-term archival.",
    level: "expert",
  },
  {
    question: "What is the role of data in the modern decision-making process?",
    shortAnswer:
      "Data provides the evidence base for decisions, enabling data-driven decision-making (DDDM) where choices are backed by analysis rather than intuition alone.",
    explanation:
      "In modern organizations, data is used to identify problems, evaluate options, predict outcomes, and measure results. Data-driven decision-making reduces bias, increases accountability, and improves outcomes. With the rise of big data and analytics, organizations can make real-time decisions based on comprehensive data analysis. Data literacy has become a critical skill for leaders.",
    hint: "Think about how an e-commerce company uses browsing data to recommend products.",
    level: "basic",
  },
  {
    question: "What are the key skills needed for effective data management in organizations?",
    shortAnswer:
      "Key skills include data literacy, SQL proficiency, data modeling, ETL processes, data governance knowledge, and understanding of data security and privacy.",
    explanation:
      "Data literacy is the ability to read, understand, and communicate with data. SQL is essential for querying relational databases. Data modeling helps design efficient database structures. ETL (Extract, Transform, Load) skills are needed for data integration. Knowledge of data governance ensures compliance and quality. Security and privacy skills protect sensitive information. These skills are in high demand across industries.",
    hint: "Think about what a data analyst or data engineer does on a daily basis.",
    level: "intermediate",
  },
  {
    question: "What is the future of data management with emerging technologies?",
    shortAnswer:
      "The future involves AI-driven automation, real-time data processing, data mesh architecture, enhanced privacy technologies, and increased focus on data ethics.",
    explanation:
      "AI is automating data preparation, quality checks, and insights generation. Real-time processing enables immediate decision-making. Data mesh decentralizes data ownership for scalability. Privacy-enhancing technologies (PETs) protect sensitive data. Data ethics frameworks are becoming standard. The trend is toward more intelligent, automated, and ethical data management that empowers organizations to leverage data as a strategic asset.",
    hint: "Think about how self-driving cars process massive amounts of sensor data in real-time.",
    level: "expert",
  },
  {
    question: "How does data support business intelligence and analytics?",
    shortAnswer:
      "Data provides the foundation for business intelligence (BI) and analytics, enabling organizations to gain insights, create reports, and make data-driven decisions.",
    explanation:
      "BI tools analyze data to generate dashboards, reports, and visualizations. Analytics goes deeper to uncover patterns, correlations, and predictive insights. Data is the raw material that BI and analytics transform into actionable intelligence. Without quality data, BI and analytics cannot deliver meaningful results. The data pipeline from collection to visualization is critical for success.",
    hint: "Think about how a retail chain uses sales data to create a dashboard showing performance by region.",
    level: "basic",
  },
  {
    question: "What is data lineage and why is it important for data governance?",
    shortAnswer:
      "Data lineage tracks the flow of data from source to destination, documenting transformations and dependencies, which is essential for governance, audit, and debugging.",
    explanation:
      "Data lineage shows the complete lifecycle of data, including where it originated, how it was transformed, and where it was used. It helps with impact analysis (understanding the effect of changes), root cause analysis (debugging data issues), regulatory compliance (demonstrating data handling), and data quality management. Lineage provides transparency and trust in data systems.",
    hint: "Think about tracking a package from warehouse to delivery – data lineage is similar but for data.",
    level: "expert",
  },
  {
    question: "What are the challenges of managing big data?",
    shortAnswer:
      "Big data challenges include storage scalability, processing speed, data variety management, data quality assurance, security, privacy, and finding skilled talent.",
    explanation:
      "Volume (large data size) requires scalable storage solutions. Velocity (speed of data generation) demands real-time or near-real-time processing. Variety (different data types) needs flexible data models. Veracity (data quality) requires robust validation. Security and privacy concerns increase with more data. Finding skilled data professionals is a persistent challenge. Addressing these challenges is key to successful big data initiatives.",
    hint: "Think about how social media platforms handle millions of posts per minute.",
    level: "expert",
  },
  {
    question: "How does data transformation turn raw data into actionable information?",
    shortAnswer:
      "Data transformation involves cleaning, structuring, enriching, and analyzing raw data to convert it into a format that is useful, insightful, and ready for decision-making.",
    explanation:
      "Transformation steps include: 1) Cleaning – removing errors, duplicates, and inconsistencies. 2) Structuring – organizing data into a usable format. 3) Enriching – adding context or additional data. 4) Analyzing – applying statistical or algorithmic methods. 5) Visualizing – presenting data in understandable formats. This pipeline turns raw facts into strategic assets.",
    hint: "Think about how raw ingredients are transformed into a finished dish through preparation and cooking.",
    level: "intermediate",
  },
  {
    question: "What is the relationship between data, information, knowledge, and wisdom in professional practice?",
    shortAnswer:
      "Data informs information, information builds knowledge, and knowledge applied with judgment creates wisdom – a progression from raw facts to expert decision-making.",
    explanation:
      "In professional practice: Data is collected from observations or systems. Information is data organized and contextualized. Knowledge is the understanding and ability to apply information effectively. Wisdom is using knowledge with experience, ethics, and judgment to make the best decisions. This progression is fundamental to professional development and expertise in any field.",
    hint: "Think about how a doctor moves from reading test results (data) to diagnosing (information) to treating (knowledge) to providing holistic care (wisdom).",
    level: "intermediate",
  },
];

export default questions;