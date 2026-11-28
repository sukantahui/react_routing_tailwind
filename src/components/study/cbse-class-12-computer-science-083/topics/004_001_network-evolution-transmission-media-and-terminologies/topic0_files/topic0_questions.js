// 25 Authentic CBSE Board Examination Questions for Topic 0
const questions = [
  {
    "id": 1,
    "question": "What was the name of the first operational packet-switching network in the world, founded in 1969?",
    "options": [
      "NSFNET",
      "ARPANET",
      "INTERNET",
      "INTRANET"
    ],
    "correctAnswer": 1,
    "explanation": "ARPANET (Advanced Research Projects Agency Network) launched in 1969 was the first operational packet-switching computer network.",
    "hint": "ARPANET."
  },
  {
    "id": 2,
    "question": "Which organization funded and sponsored the creation of ARPANET?",
    "options": [
      "CERN",
      "US Department of Defense (DoD)",
      "Microsoft",
      "United Nations"
    ],
    "correctAnswer": 1,
    "explanation": "ARPANET was sponsored and funded by the US Department of Defense's Advanced Research Projects Agency (DARPA).",
    "hint": "US Department of Defense (DoD)."
  },
  {
    "id": 3,
    "question": "How many university nodes were initially connected in the first ARPANET deployment in 1969?",
    "options": [
      "2 nodes",
      "4 nodes",
      "16 nodes",
      "100 nodes"
    ],
    "correctAnswer": 1,
    "explanation": "The initial ARPANET connected exactly 4 nodes: UCLA, Stanford Research Institute, UC Santa Barbara, and University of Utah.",
    "hint": "4 nodes."
  },
  {
    "id": 4,
    "question": "What was the primary goal of the NSFNET network established in the mid-1980s?",
    "options": [
      "To connect university researchers to five national supercomputing centers across the United States",
      "To stream digital video",
      "To replace all copper cables with gold",
      "To encrypt personal banking"
    ],
    "correctAnswer": 0,
    "explanation": "NSFNET (National Science Foundation Network) created a high-speed backbone connecting supercomputing centers for academic research.",
    "hint": "Connect researchers to supercomputing centers."
  },
  {
    "id": 5,
    "question": "What is the Modern Internet fundamentally defined as?",
    "options": [
      "A single centralized supercomputer in Washington",
      "A global network of interconnected computer networks communicating via TCP/IP",
      "A commercial software owned by Google",
      "A local WiFi zone"
    ],
    "correctAnswer": 1,
    "explanation": "The Internet is an interconnected worldwide network of networks that communicate using standard TCP/IP protocols.",
    "hint": "Network of interconnected networks."
  },
  {
    "id": 6,
    "question": "Who is officially credited with inventing the World Wide Web (WWW) at CERN in 1989-1991?",
    "options": [
      "Vint Cerf",
      "Tim Berners-Lee",
      "Alan Turing",
      "Charles Babbage"
    ],
    "correctAnswer": 1,
    "explanation": "Sir Tim Berners-Lee invented the World Wide Web, HTML, HTTP, and URLs while working at CERN.",
    "hint": "Tim Berners-Lee."
  },
  {
    "id": 7,
    "question": "Who are widely recognized as the 'Fathers of the Internet' for designing the TCP/IP protocol suite?",
    "options": [
      "Bill Gates and Paul Allen",
      "Vint Cerf and Bob Kahn",
      "Steve Jobs and Steve Wozniak",
      "Dennis Ritchie and Ken Thompson"
    ],
    "correctAnswer": 1,
    "explanation": "Vinton Cerf and Robert Kahn co-designed the TCP/IP architecture, earning them recognition as the fathers of the Internet.",
    "hint": "Vint Cerf and Bob Kahn."
  },
  {
    "id": 8,
    "question": "Which of the following is NOT a primary reason for creating computer networks?",
    "options": [
      "Resource sharing (hardware and software)",
      "High reliability through redundant communication paths",
      "Cost reduction through shared storage and licenses",
      "Increasing physical cable weight in server rooms"
    ],
    "correctAnswer": 3,
    "explanation": "Increasing physical cable weight is never an objective of computer networks.",
    "hint": "Increasing cable weight is not an objective."
  },
  {
    "id": 9,
    "question": "What visionary project in network evolution was envisioned for cross-disciplinary virtual data manipulation and 3D visualization?",
    "options": [
      "INTERSPACE",
      "ARPANET",
      "ETHERNET",
      "BLUETOOTH"
    ],
    "correctAnswer": 0,
    "explanation": "INTERSPACE was an advanced software vision to enable distributed multi-user 3D virtual spaces and semantic navigation.",
    "hint": "INTERSPACE."
  },
  {
    "id": 10,
    "question": "What fundamental switching technology did ARPANET pioneer over traditional telephone circuit switching?",
    "options": [
      "Packet Switching",
      "Frequency Modulation",
      "Analog Relay",
      "Punched Card Processing"
    ],
    "correctAnswer": 0,
    "explanation": "ARPANET replaced dedicated circuit switching with dynamic packet switching, where messages are split into independent packets.",
    "hint": "Packet Switching."
  },
  {
    "id": 11,
    "question": "What is an autonomous computer connected to a network called in networking terminology?",
    "options": [
      "Node or Host",
      "Router only",
      "Repeater",
      "Switch"
    ],
    "correctAnswer": 0,
    "explanation": "Any end-device, workstation, or server connected to a network is called a Node or Host.",
    "hint": "Node or Host."
  },
  {
    "id": 12,
    "question": "When did ARPANET officially adopt TCP/IP as its standard core protocol, marking the birth of modern Internet networking?",
    "options": [
      "January 1, 1983",
      "August 15, 1947",
      "December 31, 1999",
      "October 2, 2010"
    ],
    "correctAnswer": 0,
    "explanation": "January 1, 1983 ('Flag Day') is recognized as the official birth of the Internet when ARPANET adopted TCP/IP.",
    "hint": "January 1, 1983."
  },
  {
    "id": 13,
    "question": "Which of the following describes resource sharing in a school computer lab?",
    "options": [
      "Every computer having its own separate laser printer",
      "Multiple student computers sending print jobs to a single shared network laser printer",
      "Disconnecting all computers from electricity",
      "Deleting files on all machines"
    ],
    "correctAnswer": 1,
    "explanation": "Sharing one high-end printer among 40 student PCs is a textbook example of hardware resource sharing.",
    "hint": "Multiple computers sharing a single network printer."
  },
  {
    "id": 14,
    "question": "How does networking provide high reliability in mission-critical applications?",
    "options": [
      "If one server or network path fails, alternative redundant routes and backup servers keep services online",
      "By shutting down the whole company",
      "By removing all hard drives",
      "By disabling passwords"
    ],
    "correctAnswer": 0,
    "explanation": "Redundancy ensures alternate routes and backup mirrors prevent total system downtime.",
    "hint": "Redundant routes and backup servers."
  },
  {
    "id": 15,
    "question": "What was the Interface Message Processor (IMP) in early ARPANET?",
    "options": [
      "A printer cartridge",
      "The earliest ancestor of the modern network router",
      "A mouse driver",
      "A keyboard monitor"
    ],
    "correctAnswer": 1,
    "explanation": "IMPs were dedicated packet-switching minicomputers that functioned as the world's first routers.",
    "hint": "Ancestor of the modern router."
  },
  {
    "id": 16,
    "question": "What does the acronym NSFNET stand for?",
    "options": [
      "National Science Foundation Network",
      "Network Software File Node Transfer",
      "New Standard Frequency Network",
      "National Satellite Federation Network"
    ],
    "correctAnswer": 0,
    "explanation": "NSFNET stands for National Science Foundation Network.",
    "hint": "National Science Foundation Network."
  },
  {
    "id": 17,
    "question": "In what decade did commercial ISPs (Internet Service Providers) begin expanding public Internet access globally?",
    "options": [
      "1950s",
      "1970s",
      "1990s",
      "1890s"
    ],
    "correctAnswer": 2,
    "explanation": "The commercialization and public adoption of the Internet boomed in the 1990s.",
    "hint": "1990s."
  },
  {
    "id": 18,
    "question": "What does ARPANET stand for?",
    "options": [
      "Advanced Research Projects Agency Network",
      "Automated Routing Packet Array Network",
      "American Radio Protocol Association Network",
      "Advanced Relay Processing Application Network"
    ],
    "correctAnswer": 0,
    "explanation": "ARPANET stands for Advanced Research Projects Agency Network.",
    "hint": "Advanced Research Projects Agency Network."
  },
  {
    "id": 19,
    "question": "Is the Internet owned by any single government, individual, or corporation?",
    "options": [
      "Yes, owned entirely by the United States",
      "Yes, owned by Google",
      "No, it is a decentralized global federation of independent networks cooperating via shared standards",
      "Yes, owned by CERN"
    ],
    "correctAnswer": 2,
    "explanation": "The Internet is decentralized; no single entity owns it, and governance is managed via consensus bodies like IETF and ICANN.",
    "hint": "Decentralized federation of networks."
  },
  {
    "id": 20,
    "question": "What role does ICANN play in modern Internet governance?",
    "options": [
      "Coordinates unique IP address allocation and Domain Name System (DNS) management globally",
      "Manufactures computer microchips",
      "Provides electricity to web servers",
      "Prints physical books"
    ],
    "correctAnswer": 0,
    "explanation": "ICANN (Internet Corporation for Assigned Names and Numbers) coordinates IP addresses and top-level domain names.",
    "hint": "IP address allocation and DNS management."
  },
  {
    "id": 21,
    "question": "What is the difference between the Internet and the World Wide Web (WWW)?",
    "options": [
      "They are exact synonyms",
      "The Internet is the underlying hardware and routing infrastructure; the WWW is an application service running on top of the Internet using HTTP",
      "WWW is hardware, Internet is software",
      "Internet only works in Europe"
    ],
    "correctAnswer": 1,
    "explanation": "The Internet is the global network infrastructure (cables, routers, protocols); the Web (WWW) is a software service of linked hypermedia pages running on the Internet.",
    "hint": "Internet is infrastructure; Web is service on top."
  },
  {
    "id": 22,
    "question": "What is an Intranet?",
    "options": [
      "A public worldwide network",
      "A private, secured network accessible only to an organization's authorized staff",
      "A cable connector",
      "A satellite dish"
    ],
    "correctAnswer": 1,
    "explanation": "An Intranet is a private, restricted network within an organization using Internet technologies.",
    "hint": "Private, secured network for an organization."
  },
  {
    "id": 23,
    "question": "What is an Extranet?",
    "options": [
      "A private intranet partially accessible to authorized external partners, vendors, or customers",
      "An antenna",
      "A computer virus",
      "An optical cable"
    ],
    "correctAnswer": 0,
    "explanation": "An Extranet extends an intranet to authorized external stakeholders (vendors, suppliers, clients).",
    "hint": "Intranet extended to authorized external partners."
  },
  {
    "id": 24,
    "question": "In CBSE board examination marking schemes, how many marks is a question asking 'Expand ARPANET and name its funding agency' typically worth?",
    "options": [
      "1 mark (½ mark for expansion, ½ mark for US DoD)",
      "5 marks",
      "10 marks",
      "0 marks"
    ],
    "correctAnswer": 0,
    "explanation": "This is a classic 1-mark question in Section A or B of CBSE Class 12 CS.",
    "hint": "1 mark."
  },
  {
    "id": 25,
    "question": "Which of the following properly orders the evolutionary stages of the Internet chronologically?",
    "options": [
      "Internet -> ARPANET -> NSFNET -> WWW",
      "ARPANET -> NSFNET -> Modern Internet (with WWW)",
      "WWW -> NSFNET -> ARPANET -> Internet",
      "NSFNET -> ARPANET -> WWW -> Internet"
    ],
    "correctAnswer": 1,
    "explanation": "Chronological order: ARPANET (1969) -> NSFNET (mid-1980s) -> Modern Internet with WWW (1990s).",
    "hint": "ARPANET -> NSFNET -> Modern Internet."
  }
];

export default questions;
