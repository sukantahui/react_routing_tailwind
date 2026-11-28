export default [
  {
    "id": 1,
    "question": "What is the primary networking principle that governs Server Placement in a CBSE Class 12 case study?",
    "options": [
      "The 80-20 Networking Rule: place the server in the block with the MAXIMUM number of computers to ensure that ~80% of network traffic remains local to that block's switch.",
      "The Alphabetical Order rule: place the server in the block starting with letter A.",
      "The Tallest Building rule: place the server on the top floor of the tallest building.",
      "The Guard Post rule: place the server near the front gate."
    ],
    "correctAnswer": 0,
    "explanation": "The 80-20 rule dictates that ~80% of traffic on a given network segment should remain local, and only ~20% should traverse backbone links.",
    "hint": "The 80-20 Networking Rule."
  },
  {
    "id": 2,
    "question": "Why does placing the server in the wing with the maximum number of computers reduce overall campus network congestion?",
    "options": [
      "Because the largest group of workstations accesses the server directly over the local building switch, preventing massive packet volumes from choking inter-building outdoor cables.",
      "Because servers run faster in larger rooms.",
      "Because more computers produce more electricity.",
      "Because teachers sit in that building."
    ],
    "correctAnswer": 0,
    "explanation": "Local LAN switches handle high-density traffic at gigabit speeds without saturating inter-building backbone lines.",
    "hint": "Localizes high-volume client-server traffic inside one building."
  },
  {
    "id": 3,
    "question": "Given: Admin Block = 20 PCs; Science Block = 100 PCs; Humanities Block = 30 PCs. Which block is the ideal location for the Server?",
    "options": [
      "Science Block",
      "Admin Block",
      "Humanities Block",
      "Either Admin or Humanities"
    ],
    "correctAnswer": 0,
    "explanation": "Science Block has 100 PCs (the maximum). Placing the server here ensures 100 students access resources locally.",
    "hint": "Science Block has 100 computers (maximum)."
  },
  {
    "id": 4,
    "question": "What happens if an organization erroneously places the Server in a block with only 5 computers instead of the block with 120 computers?",
    "options": [
      "The inter-building cable link between the two wings becomes a severe bottleneck, resulting in sluggish performance, packet loss, and high latency for 120 users.",
      "The server catches fire.",
      "The computer screens turn purple.",
      "The internet speed doubles."
    ],
    "correctAnswer": 0,
    "explanation": "All 120 users would be forced to stream data across the outdoor inter-building cable continuously, saturating the link.",
    "hint": "Creates a severe inter-building network bottleneck."
  },
  {
    "id": 5,
    "question": "When writing the justification for Server Placement in your CBSE answer sheet, which keywords are essential to score full marks?",
    "options": [
      "\"Maximum number of computers\" and \"to minimize inter-building network traffic (80-20 rule)\"",
      "\"Because it looks nice\"",
      "\"Because the principal sits there\"",
      "\"Because the building is painted blue\""
    ],
    "correctAnswer": 0,
    "explanation": "Marking schemes explicitly allocate credit for citing 'maximum computers' and 'minimizing inter-block traffic'.",
    "hint": "Maximum computers and minimizing inter-block traffic."
  },
  {
    "id": 6,
    "question": "In addition to network traffic optimization, what environmental factor is vital for a dedicated Server Room?",
    "options": [
      "Climate control (air conditioning to prevent overheating), stable uninterrupted power supply (UPS), physical access security, and fire suppression.",
      "Large open windows for fresh breeze.",
      "Direct sunlight on server racks.",
      "Water coolers placed on top of server racks."
    ],
    "correctAnswer": 0,
    "explanation": "Server rooms require regulated temperature (18-22°C), humidity control, clean redundant power, and physical security.",
    "hint": "Climate control, UPS power, and physical access security."
  },
  {
    "id": 7,
    "question": "Does the name of the block (e.g., 'Administration Wing', 'Executive Block') take precedence over the computer count table when deciding Server Placement?",
    "options": [
      "No! Server placement is strictly determined by the numerical computer count, never by the prestige or administrative title of the building.",
      "Yes, the server must always be placed where the CEO or Principal sits.",
      "Yes, servers are only legally allowed in Admin blocks.",
      "Only if the building has an elevator."
    ],
    "correctAnswer": 0,
    "explanation": "A common student pitfall is assuming the Admin block must house the server. Always follow the data: maximum computers wins!",
    "hint": "Never guess based on building name; follow computer count."
  },
  {
    "id": 8,
    "question": "If two blocks have an identical maximum count of computers (e.g. Block A = 80 PCs, Block B = 80 PCs, Block C = 20 PCs), where can the server be placed?",
    "options": [
      "Either Block A or Block B is completely valid; choosing the one with shorter total distances to other blocks is optimal.",
      "The server cannot be installed.",
      "In Block C.",
      "In the parking lot."
    ],
    "correctAnswer": 0,
    "explanation": "When two blocks tie for maximum computers, CBSE examiners accept either block; selecting the one with lower cumulative distance is best practice.",
    "hint": "Either tied block is acceptable."
  },
  {
    "id": 9,
    "question": "What is a 'Rack-Mounted Server' commonly installed in enterprise server rooms?",
    "options": [
      "A server built in a standardized 19-inch modular chassis designed to fit securely inside vertical equipment rack cabinets.",
      "A server placed on a wooden bookshelf.",
      "A server with bicycle wheels.",
      "A software application."
    ],
    "correctAnswer": 0,
    "explanation": "Rack-mounted servers (1U, 2U, 4U) fit standardized server racks, maximizing space density, cable management, and airflow cooling.",
    "hint": "Standardized 19-inch rack-mounted chassis."
  },
  {
    "id": 10,
    "question": "Why should a dedicated UPS (Uninterruptible Power Supply) be attached to the campus server?",
    "options": [
      "To provide clean, conditioned battery power during electrical outages and prevent sudden server crashes that cause database corruption.",
      "To increase the speed of the mouse pointer.",
      "To play music in the server room.",
      "To charge employee smartphones."
    ],
    "correctAnswer": 0,
    "explanation": "Sudden power loss causes file system corruption and data loss; UPS systems ensure graceful shutdown or continuous bridge operation.",
    "hint": "Prevents database corruption during power outages."
  },
  {
    "id": 11,
    "question": "If a campus case study asks: 'Which block should have the highest priority for gigabit network switch installation?', which block should you choose?",
    "options": [
      "The block hosting the Server (and having the maximum computers)",
      "The block with the fewest computers",
      "The security guard cabin",
      "The cafeteria"
    ],
    "correctAnswer": 0,
    "explanation": "The server block aggregates all inbound and outbound traffic for the entire campus, demanding high-throughput gigabit switching.",
    "hint": "The block hosting the server."
  },
  {
    "id": 12,
    "question": "What is the role of a 'Proxy Server' often placed alongside the main server in a school network?",
    "options": [
      "To cache frequently accessed web pages (saving bandwidth) and filter out inappropriate or harmful websites for student safety.",
      "To take student attendance using facial recognition.",
      "To print report cards automatically.",
      "To overclock student laptops."
    ],
    "correctAnswer": 0,
    "explanation": "Proxy servers cache web objects to speed up browsing and enforce school content filtering policies.",
    "hint": "Caches web pages and filters web traffic."
  },
  {
    "id": 13,
    "question": "In a medical hospital case study: Ward A = 15 PCs; ICU = 20 PCs; Radiology / Diagnostics = 85 PCs; Reception = 10 PCs. Where should the medical imaging server be placed?",
    "options": [
      "Radiology / Diagnostics",
      "ICU",
      "Ward A",
      "Reception"
    ],
    "correctAnswer": 0,
    "explanation": "Radiology has 85 PCs and generates massive DICOM imaging files; placing the server here keeps high-bandwidth medical traffic localized.",
    "hint": "Radiology (85 PCs)."
  },
  {
    "id": 14,
    "question": "Why does the 80-20 rule state that 80% of traffic should stay on the local subnet?",
    "options": [
      "Because local switch backplanes have massive switching capacity (e.g. 48 Gbps), whereas inter-building links have limited shared bandwidth.",
      "Because 80% is a lucky number.",
      "Because 20% of computers are always broken.",
      "Because cables cannot transmit more than 20 packets."
    ],
    "correctAnswer": 0,
    "explanation": "Local switching operates at wire speed with micro-segmentation; inter-building links are shared bandwidth constraints.",
    "hint": "Local switch backplanes have much higher bandwidth."
  },
  {
    "id": 15,
    "question": "Can multiple servers (e.g. Web Server, Database Server, File Server) be co-located inside the same Server Room?",
    "options": [
      "Yes, co-locating servers in a central datacenter room centralizes security, cooling, UPS power, and backup administration.",
      "No, servers must be separated by at least 5 kilometers.",
      "No, two servers in the same room will cancel each other out.",
      "Only if they are from the same manufacturer."
    ],
    "correctAnswer": 0,
    "explanation": "Centralized server rooms optimize cooling, power, security monitoring, and backup infrastructure.",
    "hint": "Centralizing servers optimizes administration and security."
  },
  {
    "id": 16,
    "question": "If the server block is connected to 3 other campus blocks, what is the server block acting as in a Star topology?",
    "options": [
      "The central hub / root distribution point of the campus network.",
      "A passive termination resistor.",
      "An unmanaged bridge.",
      "A wireless client endpoint."
    ],
    "correctAnswer": 0,
    "explanation": "The server building functions as the central core node in an inter-building star layout.",
    "hint": "Central hub or core distribution node."
  },
  {
    "id": 17,
    "question": "What physical security measure is mandatory for the Server Room in institutional setups?",
    "options": [
      "Access control via biometric fingerprint / RFID keycard reader, keeping the room locked to unauthorized personnel at all times.",
      "Leaving the door wide open so students can borrow cables.",
      "Hiding the keys under the doormat.",
      "Posting the root password on the door."
    ],
    "correctAnswer": 0,
    "explanation": "Physical security prevents unauthorized tampering, theft, or accidental disruption of core infrastructure.",
    "hint": "Biometric or keycard access control."
  },
  {
    "id": 18,
    "question": "In a CBSE 1-mark question: 'Suggest the most suitable place (block) to install the server and give reason.' If a student writes only 'Block B' without giving a reason, how many marks are awarded?",
    "options": [
      "0.5 Marks (Half mark for the correct block, but loses 0.5 marks for omitting the justification).",
      "Full 1.0 Mark.",
      "0.0 Marks.",
      "2.0 Marks."
    ],
    "correctAnswer": 0,
    "explanation": "CBSE marking schemes split the mark: 0.5 for identifying the correct block, and 0.5 for stating 'maximum number of computers'.",
    "hint": "0.5 for block name + 0.5 for reason."
  },
  {
    "id": 19,
    "question": "What is a 'Database Server' in school campus architecture?",
    "options": [
      "A dedicated high-performance server running an RDBMS (e.g. MySQL, Oracle, PostgreSQL) holding student records, attendance, and fee data.",
      "A computer that only stores text messages.",
      "A program that cleans dust from motherboards.",
      "A physical storage box containing paper files."
    ],
    "correctAnswer": 0,
    "explanation": "Database servers store, process, and query critical institutional relational data.",
    "hint": "Hosts RDBMS containing student and administrative records."
  },
  {
    "id": 20,
    "question": "If a campus expands and adds a new block with 150 computers in the future, what should the network team consider doing?",
    "options": [
      "Evaluate migrating the primary server or deploying a secondary localized server in the new high-density block to maintain 80-20 efficiency.",
      "Shutting down the entire network forever.",
      "Removing all cables.",
      "Deleting the student database."
    ],
    "correctAnswer": 0,
    "explanation": "Network architectures evolve; shifting workloads or adding local distribution servers maintains the 80-20 traffic balance.",
    "hint": "Re-evaluate server placement or add distributed local servers."
  },
  {
    "id": 21,
    "question": "What is 'Server Virtualization' (e.g. VMware, Hyper-V, KVM)?",
    "options": [
      "Running multiple virtual server operating systems simultaneously on a single physical host server hardware, maximizing hardware utilization.",
      "Playing video games on a server.",
      "A server with no physical screen.",
      "A server built in virtual reality."
    ],
    "correctAnswer": 0,
    "explanation": "Virtualization allows one physical machine to host web, mail, and database servers as isolated virtual machines, cutting hardware costs.",
    "hint": "Multiple virtual servers on one physical machine."
  },
  {
    "id": 22,
    "question": "Why should server backups be stored in a separate building or on cloud storage?",
    "options": [
      "To ensure that in the event of a physical disaster (fire, flood, theft) in the server room, an intact copy of institutional data survives.",
      "Because backups are too heavy for one floor.",
      "Because servers cannot read backups.",
      "To avoid paying taxes."
    ],
    "correctAnswer": 0,
    "explanation": "Offsite backups guarantee disaster recovery resilience against localized physical damage.",
    "hint": "Offsite disaster recovery resilience."
  },
  {
    "id": 23,
    "question": "In a CBSE case study, if Wing A has 40 PCs, Wing B has 45 PCs, Wing C has 35 PCs, where should the server be placed?",
    "options": [
      "Wing B",
      "Wing A",
      "Wing C",
      "Any wing"
    ],
    "correctAnswer": 0,
    "explanation": "Wing B has 45 PCs, which is the highest number. The server must be placed in Wing B.",
    "hint": "Wing B has the maximum count (45 PCs)."
  },
  {
    "id": 24,
    "question": "Which of the following statements best summarizes the 80-20 rule in simple words?",
    "options": [
      "80% of network traffic should remain within the local segment, and only 20% should cross inter-building backbone lines.",
      "80% of computers must be turned off at 8 PM.",
      "20% of employees do 80% of the work.",
      "80% of cables must be red and 20% blue."
    ],
    "correctAnswer": 0,
    "explanation": "The 80-20 networking rule optimizes traffic locality to avoid backbone congestion.",
    "hint": "80% traffic stays local; 20% crosses backbone."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination, how should you write the complete answer to: 'Suggest the most suitable block to host the server. Justify your answer.'?",
    "options": [
      "\"The server should be installed in Block [Name] because it contains the maximum number of computers ([Number] PCs). According to the 80-20 rule of networking, this minimizes inter-block traffic and prevents network congestion.\"",
      "\"Block [Name] because it is the best.\"",
      "\"Block [Name] because the principal said so.\"",
      "\"Block [Name] without any reason.\""
    ],
    "correctAnswer": 0,
    "explanation": "A complete answer names the block, quotes the workstation count, and cites the 80-20 rule minimizing inter-building traffic.",
    "hint": "State block name + computer count + 80-20 rule justification."
  }
];
