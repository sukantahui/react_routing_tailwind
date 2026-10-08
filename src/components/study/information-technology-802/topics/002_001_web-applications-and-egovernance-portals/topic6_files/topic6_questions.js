const questions = [
  {
    "id": "q1",
    "question": "Q1: Which of the following is a primary characteristic of a Web-Based Application compared to a Desktop Application?",
    "options": [
      "It can be accessed from any device with a web browser without local installation",
      "It requires separate installation on every computer",
      "It only works offline without internet connectivity",
      "It cannot store data on a remote server"
    ],
    "answer": "It can be accessed from any device with a web browser without local installation",
    "explanation": "Web applications run on remote web servers and are accessed via web browsers over the internet, requiring zero client-side installation.",
    "explanationBn": "ওয়েব অ্যাপ্লিকেশন কোনো লোকাল ইনস্টলেশন ছাড়াই ইন্টারনেট ও ব্রাউজারের মাধ্যমে যেকোনো ডিভাইস থেকে ব্যবহার করা যায়।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Easy",
    "hint": "It can be accessed from any de..."
  },
  {
    "id": "q2",
    "question": "Q2: Which technology from the following is categorized as a Front-End web development tool?",
    "options": [
      "JavaScript",
      "MySQL",
      "Oracle Database",
      "Apache Server"
    ],
    "answer": "JavaScript",
    "explanation": "HTML, CSS, and JavaScript run on the client side (browser) and are classified as Front-End technologies.",
    "explanationBn": "জাভাস্ক্রিপ্ট (JavaScript), HTML এবং CSS হলো ক্লায়েন্ট-সাইড ফ্রন্ট-এন্ড প্রযুক্তি।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Medium",
    "hint": "JavaScript..."
  },
  {
    "id": "q3",
    "question": "Q3: Which of the following software is classified as a Web Browser?",
    "options": [
      "Opera",
      "MySQL",
      "NetBeans",
      "Tomcat"
    ],
    "answer": "Opera",
    "explanation": "Opera, Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge are popular web browsers.",
    "explanationBn": "অপেরা (Opera), গুগল ক্রোম, ফায়ারফক্স ইত্যাদি হলো জনপ্রিয় ওয়েব ব্রাউজার।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Hard",
    "hint": "Opera..."
  },
  {
    "id": "q4",
    "question": "Q4: What does the acronym 'SMART' Governance stand for in the context of E-Governance?",
    "options": [
      "Simple, Moral, Accountable, Responsive, Transparent",
      "Secure, Mobile, Automated, Reliable, Technical",
      "Systematic, Modern, Accurate, Regional, Timely",
      "Social, Mechanical, Administrative, Robotic, Trustworthy"
    ],
    "answer": "Simple, Moral, Accountable, Responsive, Transparent",
    "explanation": "E-Governance aims to create SMART governance: Simple, Moral, Accountable, Responsive, and Transparent.",
    "explanationBn": "ই-গভর্নেন্সে SMART হলো Simple, Moral, Accountable, Responsive, Transparent।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Easy",
    "hint": "Simple, Moral, Accountable, Re..."
  },
  {
    "id": "q5",
    "question": "Q5: What is the primary URL of the single-window National Portal of India providing access to all public services?",
    "options": [
      "india.gov.in",
      "digitalindia.com",
      "gov.in.portal",
      "services.nic.org"
    ],
    "answer": "india.gov.in",
    "explanation": "india.gov.in is the official National Portal of India designed to provide single-window access to government information and services.",
    "explanationBn": "india.gov.in হলো ভারতের জাতীয় পোর্টাল যা সব সরকারি পরিষেবার একক ডিজিটাল প্রবেশদ্বার।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Medium",
    "hint": "india.gov.in..."
  },
  {
    "id": "q6",
    "question": "Q6: Which Indian E-Governance portal is used for online paperless storage and verification of official documents and certificates?",
    "options": [
      "DigiLocker",
      "Parivahan",
      "Passport Seva",
      "NVSP"
    ],
    "answer": "DigiLocker",
    "explanation": "DigiLocker (digilocker.gov.in) is the flagship initiative of Digital India for issuance and verification of digital documents and certificates.",
    "explanationBn": "ডিজিলকার (DigiLocker) হলো ডিজিটাল নথিপত্র ক্লাউডে সংরক্ষণ ও যাচাইয়ের অফিসিয়াল সরকারি পোর্টাল।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Hard",
    "hint": "DigiLocker..."
  },
  {
    "id": "q7",
    "question": "Q7: Which portal is utilized for booking Indian Railway train tickets and checking PNR status online?",
    "options": [
      "IRCTC (irctc.co.in)",
      "Parivahan (parivahan.gov.in)",
      "Passport Seva (passportindia.gov.in)",
      "NVSP (voters.eci.gov.in)"
    ],
    "answer": "IRCTC (irctc.co.in)",
    "explanation": "IRCTC (Indian Railway Catering and Tourism Corporation) manages online passenger ticket reservation for Indian Railways.",
    "explanationBn": "IRCTC (irctc.co.in) হলো ভারতীয় রেলের অনলাইন টিকিট বুকিংয়ের অফিসিয়াল পোর্টাল।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Easy",
    "hint": "IRCTC (irctc.co.in)..."
  },
  {
    "id": "q8",
    "question": "Q8: Which portal under the Ministry of Road Transport and Highways provides Driving Licence and Vehicle Registration services?",
    "options": [
      "Parivahan Sewa (parivahan.gov.in)",
      "DigiLocker",
      "NVSP",
      "UMANG"
    ],
    "answer": "Parivahan Sewa (parivahan.gov.in)",
    "explanation": "Parivahan Sewa handles Sarathi (Driving Licences) and Vahan (Vehicle Registration) services across India.",
    "explanationBn": "পরিবহন সেবা (Parivahan) হলো ড্রাইভিং লাইসেন্স ও গাড়ি নিবন্ধনের জন্য সরকারি পোর্টাল।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Medium",
    "hint": "Parivahan Sewa (parivahan.gov...."
  },
  {
    "id": "q9",
    "question": "Q9: What is a major social benefit of E-Governance for citizens living in rural or remote areas?",
    "options": [
      "It eliminates the need to travel long distances to physical government offices for basic certificates",
      "It increases government administrative paperwork",
      "It restricts access only to metropolitan cities",
      "It eliminates internet connectivity"
    ],
    "answer": "It eliminates the need to travel long distances to physical government offices for basic certificates",
    "explanation": "E-Governance brings 24x7 government services to citizens' doorsteps via Common Service Centres (CSCs) and mobile portals.",
    "explanationBn": "ই-গভর্নেন্সের মাধ্যমে প্রত্যন্ত অঞ্চলের নাগরিকদের সরকারি অফিসের চক্কর না কেটে ঘরে বসেই পরিষেবা পাওয়া সম্ভব হয়।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Hard",
    "hint": "It eliminates the need to trav..."
  },
  {
    "id": "q10",
    "question": "Q10: Which of the following is considered a Back-End tool in web application architecture?",
    "options": [
      "MySQL Database",
      "HTML5",
      "CSS3",
      "JavaScript DOM API"
    ],
    "answer": "MySQL Database",
    "explanation": "MySQL, Oracle, PostgreSQL, Java, Node.js, and Python operate on the back-end (server and database tier).",
    "explanationBn": "MySQL হলো একটি ব্যাক-এন্ড রিলেশনাল ডেটাবেস ম্যানেজমেন্ট সিস্টেম।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Easy",
    "hint": "MySQL Database..."
  },
  {
    "id": "q11",
    "question": "Q11: What is the full form of NVSP in the Indian electoral e-Governance system?",
    "options": [
      "National Voters' Service Portal",
      "National Vehicle Security Portal",
      "New Voter Society Program",
      "National Verification Service Portal"
    ],
    "answer": "National Voters' Service Portal",
    "explanation": "NVSP (National Voters' Service Portal) was launched by the Election Commission of India for voter registration and epic card download.",
    "explanationBn": "NVSP হলো National Voters' Service Portal (জাতীয় ভোটার পরিষেবা পোর্টাল)।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Medium",
    "hint": "National Voters' Service Porta..."
  },
  {
    "id": "q12",
    "question": "Q12: How does E-Governance directly reduce corruption in public administration?",
    "options": [
      "By eliminating intermediaries (middlemen) and introducing direct digital audit trails",
      "By increasing cash transactions",
      "By keeping administrative records secret from the public",
      "By removing computerized databases"
    ],
    "answer": "By eliminating intermediaries (middlemen) and introducing direct digital audit trails",
    "explanation": "Digital transactions and Direct Benefit Transfer (DBT) eliminate middlemen and create transparent audit logs for every rupee spent.",
    "explanationBn": "দালাল চক্র দূর করে এবং ডিজিটাল ট্র্যাকিং ও সরাসরি ব্যাংক ট্রান্সফারের মাধ্যমে দুর্নীতি দমন করা হয়।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Hard",
    "hint": "By eliminating intermediaries ..."
  },
  {
    "id": "q13",
    "question": "Q13: Which application is categorized as an integrated development environment (IDE) that provides a graphical user interface (GUI) designer for Java/HTML?",
    "options": [
      "NetBeans",
      "Google Chrome",
      "Mozilla Firefox",
      "Opera"
    ],
    "answer": "NetBeans",
    "explanation": "NetBeans is an IDE tool that includes a drag-and-drop GUI builder for rapid application front-end development.",
    "explanationBn": "নেটবিন্স (NetBeans) হলো একটি IDE যা গ্রাফিক্যাল ইউজার ইন্টারফেস (GUI) তৈরিতে সাহায্য করে।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Easy",
    "hint": "NetBeans..."
  },
  {
    "id": "q14",
    "question": "Q14: Which Indian digital platform allows citizens to file Income Tax returns (ITR) online?",
    "options": [
      "incometax.gov.in (e-Filing Portal)",
      "irctc.co.in",
      "nvsp.in",
      "parivahan.gov.in"
    ],
    "answer": "incometax.gov.in (e-Filing Portal)",
    "explanation": "The Income Tax Department e-Filing Portal provides seamless electronic filing of tax returns, refunds, and PAN linkages.",
    "explanationBn": "incometax.gov.in হলো আয়কর রিটার্ন অনলাইনে দাখিল করার সরকারি পোর্টাল।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Medium",
    "hint": "incometax.gov.in (e-Filing Por..."
  },
  {
    "id": "q15",
    "question": "Q15: What is the primary role of a Web Server in web application architecture?",
    "options": [
      "To listen for incoming HTTP requests from clients, process business logic, and deliver web pages/data",
      "To display pixels on the client monitor",
      "To run local antivirus software",
      "To compile client-side CSS files"
    ],
    "answer": "To listen for incoming HTTP requests from clients, process business logic, and deliver web pages/data",
    "explanation": "A web server (like Apache, Nginx, or Tomcat) processes HTTP requests from browsers and serves HTML, CSS, images, and API responses.",
    "explanationBn": "ওয়েব সার্ভার ক্লায়েন্টের HTTP রিকোয়েস্ট গ্রহণ করে এবং প্রয়োজনীয় ওয়েব পেজ ও ডেটা সরবরাহ করে।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Hard",
    "hint": "To listen for incoming HTTP re..."
  },
  {
    "id": "q16",
    "question": "Q16: Which of the following is NOT an advantage of Web-Based Applications over Desktop Applications?",
    "options": [
      "They completely operate without any internet or network connection at all times",
      "Zero local installation requirement on user devices",
      "Automatic centralized updates for all users simultaneously",
      "Cross-platform compatibility across Windows, Mac, Linux, Android"
    ],
    "answer": "They completely operate without any internet or network connection at all times",
    "explanation": "Web applications generally require network or internet connectivity to communicate with backend servers.",
    "explanationBn": "ওয়েব অ্যাপ্লিকেশনের একটি সীমাবদ্ধতা হলো সাধারণ ক্ষেত্রে সার্ভারের সাথে যোগাযোগের জন্য ইন্টারনেট প্রয়োজন।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Easy",
    "hint": "They completely operate withou..."
  },
  {
    "id": "q17",
    "question": "Q17: Which of the following portals is dedicated to online passport application and appointment scheduling in India?",
    "options": [
      "Passport Seva (passportindia.gov.in)",
      "Parivahan Sewa",
      "DigiLocker",
      "IRCTC"
    ],
    "answer": "Passport Seva (passportindia.gov.in)",
    "explanation": "Passport Seva Project under the Ministry of External Affairs enables digital passport application and tracking.",
    "explanationBn": "পাসপোর্ট সেবা (Passport Seva) হলো ভারতের পাসপোর্ট আবেদন ও ট্র্যাকিংয়ের সরকারি ওয়েবসাইট।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Medium",
    "hint": "Passport Seva (passportindia.g..."
  },
  {
    "id": "q18",
    "question": "Q18: What is a major economic benefit of E-Governance for the Government?",
    "options": [
      "Substantial reduction in paper procurement, physical archiving costs, and administrative processing overhead",
      "Elimination of computer hardware expenditure",
      "Mandatory increase in staff hiring",
      "Doubling postal dispatch fees"
    ],
    "answer": "Substantial reduction in paper procurement, physical archiving costs, and administrative processing overhead",
    "explanation": "Going paperless saves thousands of tons of paper and eliminates expensive physical record storage and manual logistics.",
    "explanationBn": "কাগজের খরচ, শারীরিক নথিপত্র সংরক্ষণ এবং প্রশাসনিক প্রক্রিয়াকরণের ব্যয় ব্যাপকভাবে হ্রাস পায়।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Hard",
    "hint": "Substantial reduction in paper..."
  },
  {
    "id": "q19",
    "question": "Q19: Which client-side styling language is responsible for controlling the visual appearance, layout, and responsiveness of web pages?",
    "options": [
      "CSS (Cascading Style Sheets)",
      "HTML",
      "SQL",
      "Java"
    ],
    "answer": "CSS (Cascading Style Sheets)",
    "explanation": "CSS governs colors, fonts, margins, animations, and responsive layout grids on the web front-end.",
    "explanationBn": "CSS (Cascading Style Sheets) ওয়েব পেজের নকশা, রঙ, ফন্ট ও লেআউট নির্ধারণ করে।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Easy",
    "hint": "CSS (Cascading Style Sheets)..."
  },
  {
    "id": "q20",
    "question": "Q20: Which Government of India mobile app acts as a unified platform aggregating thousands of Central and State e-Governance services?",
    "options": [
      "UMANG (Unified Mobile Application for New-age Governance)",
      "Aarogya Setu",
      "BHIM UPI",
      "mAdhaar"
    ],
    "answer": "UMANG (Unified Mobile Application for New-age Governance)",
    "explanation": "UMANG provides a single platform for all Indian citizens to access Pan India e-Gov services from Central to Local Government bodies.",
    "explanationBn": "উমাং (UMANG) হলো কেন্দ্রীয় ও রাজ্য সরকারের বহুবিধ পরিষেবা প্রদানকারী সমন্বিত মোবাইল প্ল্যাটফর্ম।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Medium",
    "hint": "UMANG (Unified Mobile Applicat..."
  },
  {
    "id": "q21",
    "question": "Q21: Which of the following is a primary characteristic of a Web-Based Application compared to a Desktop Application?",
    "options": [
      "It can be accessed from any device with a web browser without local installation",
      "It requires separate installation on every computer",
      "It only works offline without internet connectivity",
      "It cannot store data on a remote server"
    ],
    "answer": "It can be accessed from any device with a web browser without local installation",
    "explanation": "Web applications run on remote web servers and are accessed via web browsers over the internet, requiring zero client-side installation.",
    "explanationBn": "ওয়েব অ্যাপ্লিকেশন কোনো লোকাল ইনস্টলেশন ছাড়াই ইন্টারনেট ও ব্রাউজারের মাধ্যমে যেকোনো ডিভাইস থেকে ব্যবহার করা যায়।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Hard",
    "hint": "It can be accessed from any de..."
  },
  {
    "id": "q22",
    "question": "Q22: Which technology from the following is categorized as a Front-End web development tool?",
    "options": [
      "JavaScript",
      "MySQL",
      "Oracle Database",
      "Apache Server"
    ],
    "answer": "JavaScript",
    "explanation": "HTML, CSS, and JavaScript run on the client side (browser) and are classified as Front-End technologies.",
    "explanationBn": "জাভাস্ক্রিপ্ট (JavaScript), HTML এবং CSS হলো ক্লায়েন্ট-সাইড ফ্রন্ট-এন্ড প্রযুক্তি।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Easy",
    "hint": "JavaScript..."
  },
  {
    "id": "q23",
    "question": "Q23: Which of the following software is classified as a Web Browser?",
    "options": [
      "Opera",
      "MySQL",
      "NetBeans",
      "Tomcat"
    ],
    "answer": "Opera",
    "explanation": "Opera, Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge are popular web browsers.",
    "explanationBn": "অপেরা (Opera), গুগল ক্রোম, ফায়ারফক্স ইত্যাদি হলো জনপ্রিয় ওয়েব ব্রাউজার।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Medium",
    "hint": "Opera..."
  },
  {
    "id": "q24",
    "question": "Q24: What does the acronym 'SMART' Governance stand for in the context of E-Governance?",
    "options": [
      "Simple, Moral, Accountable, Responsive, Transparent",
      "Secure, Mobile, Automated, Reliable, Technical",
      "Systematic, Modern, Accurate, Regional, Timely",
      "Social, Mechanical, Administrative, Robotic, Trustworthy"
    ],
    "answer": "Simple, Moral, Accountable, Responsive, Transparent",
    "explanation": "E-Governance aims to create SMART governance: Simple, Moral, Accountable, Responsive, and Transparent.",
    "explanationBn": "ই-গভর্নেন্সে SMART হলো Simple, Moral, Accountable, Responsive, Transparent।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Hard",
    "hint": "Simple, Moral, Accountable, Re..."
  },
  {
    "id": "q25",
    "question": "Q25: What is the primary URL of the single-window National Portal of India providing access to all public services?",
    "options": [
      "india.gov.in",
      "digitalindia.com",
      "gov.in.portal",
      "services.nic.org"
    ],
    "answer": "india.gov.in",
    "explanation": "india.gov.in is the official National Portal of India designed to provide single-window access to government information and services.",
    "explanationBn": "india.gov.in হলো ভারতের জাতীয় পোর্টাল যা সব সরকারি পরিষেবার একক ডিজিটাল প্রবেশদ্বার।",
    "topic": "Social, Economic, and Administrative Benefits of E-Governance for Citizens",
    "difficulty": "Easy",
    "hint": "india.gov.in..."
  }
];

export default questions;
