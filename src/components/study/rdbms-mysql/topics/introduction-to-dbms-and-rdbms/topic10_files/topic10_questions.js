/**
 * Topic 10: Applications of Database Systems – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the main industries that use database systems?",
    shortAnswer:
      "Main industries include banking & finance, healthcare, education, e-commerce, social media, transportation, gaming, business intelligence, agriculture, and government.",
    explanation:
      "Almost every industry uses databases to manage data. The specific requirements vary by industry: banking needs ACID compliance, healthcare needs security, e-commerce needs scalability.",
    hint: "Think about all the sectors you interact with daily.",
    level: "basic",
  },
  {
    question: "How are databases used in banking and finance?",
    shortAnswer:
      "They manage customer accounts, transactions, loans, investments, fraud detection, and regulatory compliance.",
    explanation:
      "Banks process millions of transactions daily. Databases ensure accuracy, consistency, and security. They support ACID transactions, so every debit and credit is atomic.",
    hint: "Think about how your bank balance is maintained.",
    level: "basic",
  },
  {
    question: "Why is ACID compliance critical in banking databases?",
    shortAnswer:
      "ACID ensures that every transaction is accurate and reliable — atomicity prevents partial updates, consistency maintains rules, isolation prevents conflicts, and durability persists data.",
    explanation:
      "A bank transfer must either complete fully or not at all. ACID guarantees this. Without it, money could be lost or duplicated.",
    hint: "Think about why a bank transfer must be all-or-nothing.",
    level: "intermediate",
  },
  {
    question: "How are databases used in healthcare?",
    shortAnswer:
      "They store Electronic Health Records (EHR), patient histories, prescriptions, lab results, and medical research data.",
    explanation:
      "Healthcare databases must be highly secure (HIPAA compliance), available 24/7, and capable of storing complex data types like medical images.",
    hint: "Think about how your medical records are stored.",
    level: "basic",
  },
  {
    question: "What are the security requirements for healthcare databases?",
    shortAnswer:
      "Healthcare databases require encryption, access controls, audit logs, and compliance with regulations like HIPAA or GDPR.",
    explanation:
      "Patient data is highly sensitive. Security breaches can lead to legal penalties and loss of trust. Databases provide role-based access and encryption.",
    hint: "Think about why hospitals must protect patient privacy.",
    level: "intermediate",
  },
  {
    question: "How are databases used in education?",
    shortAnswer:
      "They manage student records, grades, attendance, course registrations, library systems, and learning management systems (LMS).",
    explanation:
      "Schools and universities use databases to track student progress, manage alumni, and deliver online courses. Data integrity is critical for accurate transcripts.",
    hint: "Think about how your school tracks your grades.",
    level: "basic",
  },
  {
    question: "How are databases used in e-commerce?",
    shortAnswer:
      "They handle product catalogs, inventory, customer data, shopping carts, orders, payments, and personalised recommendations.",
    explanation:
      "E-commerce platforms like Amazon process millions of products and transactions. Databases must be scalable, highly available, and support complex queries.",
    hint: "Think about how Amazon tracks products and orders.",
    level: "basic",
  },
  {
    question: "Why do e-commerce platforms need scalable databases?",
    shortAnswer:
      "E-commerce platforms must handle millions of users, products, and transactions, especially during sales events like Black Friday.",
    explanation:
      "Scalability ensures the database can handle peak loads without performance degradation. This requires techniques like sharding, replication, and load balancing.",
    hint: "Think about how Amazon handles the holiday shopping rush.",
    level: "intermediate",
  },
  {
    question: "How are databases used in social media?",
    shortAnswer:
      "They store user profiles, posts, messages, images, videos, friend connections, likes, comments, and activity feeds.",
    explanation:
      "Social media databases handle massive write loads (posts, likes) and read loads (feeds). They often use a combination of RDBMS and NoSQL.",
    hint: "Think about how Facebook stores your posts and photos.",
    level: "basic",
  },
  {
    question: "What database challenges do social media platforms face?",
    shortAnswer:
      "Challenges include handling massive write loads, providing fast read access for feeds, supporting billions of users, and managing unstructured data (images, videos).",
    explanation:
      "Social media generates petabytes of data. It requires distributed databases, caching, and efficient data models.",
    hint: "Think about how Instagram handles millions of photos.",
    level: "intermediate",
  },
  {
    question: "How are databases used in transportation and logistics?",
    shortAnswer:
      "They manage fleet tracking, route optimisation, shipment tracking, driver assignment, and booking systems.",
    explanation:
      "Transportation databases handle real-time data (GPS locations) and historical data (trip records). They need low latency for real-time tracking.",
    hint: "Think about how Uber matches riders with drivers.",
    level: "intermediate",
  },
  {
    question: "How are databases used in gaming?",
    shortAnswer:
      "They store player profiles, game states, achievements, leaderboards, in-game purchases, and telemetry data.",
    explanation:
      "Online games require low-latency databases to maintain game state and track player progress. Databases must handle millions of concurrent players.",
    hint: "Think about how your game progress is saved.",
    level: "intermediate",
  },
  {
    question: "What is the role of databases in business intelligence?",
    shortAnswer:
      "They enable data warehousing, reporting, dashboards, and analytical insights for decision-making.",
    explanation:
      "Business intelligence databases store historical data and support complex analytical queries (OLAP). They often use star or snowflake schemas.",
    hint: "Think about how a company analyses sales trends.",
    level: "intermediate",
  },
  {
    question: "How are databases used in agriculture?",
    shortAnswer:
      "They track crop yields, weather patterns, soil conditions, supply chain, and precision farming data.",
    explanation:
      "Modern agriculture uses data to optimise farming. Databases store sensor data from fields and help predict crop yields.",
    hint: "Think about how farmers use technology to improve yields.",
    level: "intermediate",
  },
  {
    question: "How are databases used in government?",
    shortAnswer:
      "They manage citizen records, tax data, voter registration, public services, and e-governance platforms.",
    explanation:
      "Government databases handle large populations and must be secure, reliable, and accessible. Examples include Aadhaar in India and voter ID systems.",
    hint: "Think about how the government tracks citizens and taxes.",
    level: "basic",
  },
  {
    question: "What is the difference between OLTP and OLAP databases?",
    shortAnswer:
      "OLTP (Online Transaction Processing) handles day-to-day transactions. OLAP (Online Analytical Processing) supports complex analytical queries for decision-making.",
    explanation:
      "OLTP databases are optimised for fast inserts, updates, and simple queries (e.g., banking). OLAP databases are optimised for complex aggregations and historical analysis (e.g., data warehouses).",
    hint: "Think about the difference between a bank's transaction system and its sales reporting system.",
    level: "intermediate",
  },
  {
    question: "Why do different industries use different types of databases?",
    shortAnswer:
      "Different industries have different requirements: banking needs ACID, e-commerce needs scalability, social media needs speed, healthcare needs security.",
    explanation:
      "No single database type is perfect for all use cases. Choosing the right database depends on data structure, consistency needs, and scalability requirements.",
    hint: "Think about why you would use different tools for different jobs.",
    level: "intermediate",
  },
  {
    question: "How do databases support fraud detection in banking?",
    shortAnswer:
      "Databases enable real-time transaction monitoring, pattern recognition, and anomaly detection to identify and flag suspicious activities.",
    explanation:
      "Banks use databases to store transaction histories and apply machine learning models to detect fraud. Quick detection prevents losses.",
    hint: "Think about how your bank alerts you to suspicious transactions.",
    level: "expert",
  },
  {
    question: "What is the role of databases in telemedicine?",
    shortAnswer:
      "They store patient data, enable secure video consultations, manage appointments, and integrate with electronic health records.",
    explanation:
      "Telemedicine requires databases that are secure, compliant with healthcare regulations, and accessible remotely.",
    hint: "Think about how doctors consult patients online.",
    level: "intermediate",
  },
  {
    question: "How are databases used in airline reservation systems?",
    shortAnswer:
      "They manage flight schedules, seat availability, passenger bookings, and payment processing.",
    explanation:
      "Airlines use databases that handle high volumes of transactions and provide real-time availability. They must be highly reliable.",
    hint: "Think about how you book a flight online.",
    level: "intermediate",
  },
  {
    question: "Why do streaming services like Netflix use databases?",
    shortAnswer:
      "They store content metadata, user profiles, viewing history, personalisation data, and recommendation algorithms.",
    explanation:
      "Netflix uses databases to deliver personalised content recommendations and track user preferences. They handle massive amounts of data.",
    hint: "Think about how Netflix recommends shows you might like.",
    level: "basic",
  },
  {
    question: "What are the database requirements for IoT applications?",
    shortAnswer:
      "IoT databases must handle high-frequency data ingestion, support time-series data, and provide fast querying for real-time monitoring.",
    explanation:
      "IoT devices generate massive amounts of data. Time-series databases (like InfluxDB) are often used for efficient storage and analysis.",
    hint: "Think about how smart devices send data to the cloud.",
    level: "expert",
  },
  {
    question: "How are databases used in retail inventory management?",
    shortAnswer:
      "They track stock levels, product locations, reorder points, and supply chain data in real-time.",
    explanation:
      "Retailers use databases to avoid stock-outs and overstocking. They integrate with point-of-sale systems and supplier data.",
    hint: "Think about how a store knows when to reorder products.",
    level: "intermediate",
  },
  {
    question: "What are the database needs of a ride-sharing app like Uber?",
    shortAnswer:
      "They need real-time location tracking, matching riders with drivers, trip histories, payment processing, and dynamic pricing.",
    explanation:
      "Uber uses databases that handle real-time data and high transaction volumes. They use a combination of relational and NoSQL databases.",
    hint: "Think about how Uber matches you with a nearby driver.",
    level: "intermediate",
  },
  {
    question: "How are databases used in weather forecasting?",
    shortAnswer:
      "They store historical weather data, real-time sensor data, satellite imagery, and model predictions.",
    explanation:
      "Weather databases handle massive datasets and support complex queries for climate modelling. They are used by meteorological departments.",
    hint: "Think about how weather predictions are made.",
    level: "intermediate",
  },
  {
    question: "What is the role of databases in content delivery networks (CDNs)?",
    shortAnswer:
      "They store metadata about content, user locations, and caching strategies to optimise content delivery.",
    explanation:
      "CDNs use databases to manage edge servers and track which content is cached where, improving speed and reliability.",
    hint: "Think about how content is delivered quickly to you.",
    level: "expert",
  },
  {
    question: "How are databases used in scientific research?",
    shortAnswer:
      "They store research data, experimental results, genomic data, and provide data sharing and collaboration features.",
    explanation:
      "Scientific databases support large-scale research, data analysis, and reproducibility. They often handle complex data types.",
    hint: "Think about how genomic data is stored and analysed.",
    level: "expert",
  },
  {
    question: "What are the database requirements for a learning management system (LMS)?",
    shortAnswer:
      "They need to store user profiles, course content, student progress, assessments, and communication logs.",
    explanation:
      "LMS databases must support complex queries for tracking student progress and generating reports.",
    hint: "Think about how online courses track your progress.",
    level: "intermediate",
  },
  {
    question: "How are databases used in hotel reservation systems?",
    shortAnswer:
      "They manage room availability, guest profiles, bookings, check-in/check-out, and payment processing.",
    explanation:
      "Hotel databases handle high transaction volumes and real-time availability. They integrate with online travel agencies.",
    hint: "Think about how you book a hotel room online.",
    level: "intermediate",
  },
  {
    question: "What is the future of database applications?",
    shortAnswer:
      "Future applications include AI-driven databases, real-time analytics, edge computing, and increased integration with machine learning.",
    explanation:
      "Databases will become more intelligent, self-managing, and integrated with AI. They will support real-time insights and decision-making.",
    hint: "Think about how databases might evolve in the next decade.",
    level: "expert",
  },
  {
    question: "How do you choose a database for a specific application?",
    shortAnswer:
      "Consider data volume, structure, consistency requirements, query patterns, scalability, and team expertise.",
    explanation:
      "For transactional systems, choose RDBMS. For high-volume, flexible data, choose NoSQL. For real-time analytics, consider specialised databases.",
    hint: "Think about the trade-offs between different database types.",
    level: "expert",
  },
];

export default questions;