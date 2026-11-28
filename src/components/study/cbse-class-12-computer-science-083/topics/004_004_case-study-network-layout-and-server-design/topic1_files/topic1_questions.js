export default [
  {
    "id": 1,
    "question": "In a CBSE case study, what is the primary purpose of analyzing the 'Distance Matrix Table' between campus blocks?",
    "options": [
      "To calculate cable lengths for different topology options and determine whether repeaters are required along links exceeding 100 meters.",
      "To estimate how fast an employee can jog between blocks.",
      "To calculate the total land area of the school in acres.",
      "To determine how many chairs are needed."
    ],
    "correctAnswer": 0,
    "explanation": "The distance matrix enables calculating the total cable requirements for star or bus layouts and identifies links exceeding 100 meters requiring repeaters.",
    "hint": "Calculates total cable length and identifies links requiring repeaters."
  },
  {
    "id": 2,
    "question": "What is the primary purpose of analyzing the 'Number of Computers Table' in each block?",
    "options": [
      "To identify the block with the maximum number of workstations for optimal Server placement (80-20 rule).",
      "To calculate total electricity bill.",
      "To count the number of computer mice.",
      "To check how many monitors need repair."
    ],
    "correctAnswer": 0,
    "explanation": "Server placement is governed by the 80-20 rule, which dictates placing the server in the wing with the highest computer count.",
    "hint": "Server placement based on maximum computer density."
  },
  {
    "id": 3,
    "question": "Given the following computer distribution: Block A = 25 PCs, Block B = 50 PCs, Block C = 110 PCs, Block D = 40 PCs. In which block should the server be placed?",
    "options": [
      "Block C",
      "Block B",
      "Block D",
      "Block A"
    ],
    "correctAnswer": 0,
    "explanation": "Block C has 110 computers (the maximum). Placing the server in Block C minimizes inter-building traffic under the 80-20 rule.",
    "hint": "Block C has the highest number of computers (110)."
  },
  {
    "id": 4,
    "question": "Given distances: Wing 1 to Wing 2 = 45m; Wing 1 to Wing 3 = 120m; Wing 2 to Wing 3 = 80m. In a star topology with the server in Wing 1, what is the total cable length needed to connect Wing 1 to Wing 2 and Wing 3?",
    "options": [
      "165 meters",
      "245 meters",
      "125 meters",
      "80 meters"
    ],
    "correctAnswer": 0,
    "explanation": "Star layout links radiating from Server (Wing 1): Link(1->2) = 45m + Link(1->3) = 120m = 165 meters total.",
    "hint": "45m + 120m = 165m."
  },
  {
    "id": 5,
    "question": "In the previous question, which link will require a Repeater if standard UTP cabling is used?",
    "options": [
      "The link between Wing 1 and Wing 3 (120 meters)",
      "The link between Wing 1 and Wing 2 (45 meters)",
      "Both links",
      "Neither link"
    ],
    "correctAnswer": 0,
    "explanation": "Standard UTP cable has a maximum distance of 100 meters. The link between Wing 1 and Wing 3 is 120m (>100m) and therefore requires a repeater.",
    "hint": "120m exceeds 100m limit."
  },
  {
    "id": 6,
    "question": "If all distances in a campus are: Admin to Lab = 35m, Lab to Accounts = 40m, Admin to Accounts = 60m. Is a repeater required on any link?",
    "options": [
      "No, because none of the cable distances exceed the 70-100 meter threshold.",
      "Yes, between Admin and Accounts.",
      "Yes, on all links.",
      "Only if the computers use Windows."
    ],
    "correctAnswer": 0,
    "explanation": "Since all distances (35m, 40m, 60m) are well within the 100-meter UTP threshold, zero repeaters are required.",
    "hint": "All links are under 100 meters."
  },
  {
    "id": 7,
    "question": "Why should you NOT assume the Server belongs in the 'Admin' block automatically?",
    "options": [
      "Because server placement is based on computer count, not building names. If the 'Science' block has 90 computers and 'Admin' has 20, placing the server in Admin causes 80% of traffic to choke inter-building cables.",
      "Because Admin blocks are dangerous.",
      "Because servers are not allowed in offices.",
      "Because Admin blocks do not have electricity."
    ],
    "correctAnswer": 0,
    "explanation": "The 80-20 networking rule dictates placing the server where the bulk of traffic originates and terminates—the block with the most computers.",
    "hint": "Always check the computer count table, not building names."
  },
  {
    "id": 8,
    "question": "If Block X has 100 PCs and Block Y has 10 PCs, and the server is placed in Block X, approximately what percentage of total network traffic remains inside Block X?",
    "options": [
      "Approximately 80% to 90%",
      "0%",
      "10%",
      "50%"
    ],
    "correctAnswer": 0,
    "explanation": "According to the 80-20 rule, keeping the server in the high-density block ensures ~80% of traffic stays within the local building switch, avoiding inter-building bottleneck.",
    "hint": "80-20 rule."
  },
  {
    "id": 9,
    "question": "If a campus distance matrix lists a distance between Building A and Building B as '15 km', what classification of network links them?",
    "options": [
      "MAN (Metropolitan Area Network)",
      "PAN (Personal Area Network)",
      "LAN (Local Area Network)",
      "SAN (Storage Area Network)"
    ],
    "correctAnswer": 0,
    "explanation": "Distances of 15 km span across a town or city, falling squarely into the MAN (Metropolitan Area Network) category.",
    "hint": "15 km is a Metropolitan Area Network."
  },
  {
    "id": 10,
    "question": "If two school branches are located in Delhi and Mumbai (distance 1,400 km), what network classification links them?",
    "options": [
      "WAN (Wide Area Network)",
      "LAN",
      "MAN",
      "PAN"
    ],
    "correctAnswer": 0,
    "explanation": "Connecting branches across states and vast distances (1,400 km) forms a Wide Area Network (WAN).",
    "hint": "WAN spans states and nations."
  },
  {
    "id": 11,
    "question": "Given: Block A to B = 30m, Block B to C = 40m, Block C to D = 50m. What is the total cable length for a Bus topology connecting A -> B -> C -> D?",
    "options": [
      "120 meters",
      "240 meters",
      "70 meters",
      "300 meters"
    ],
    "correctAnswer": 0,
    "explanation": "Total bus length = 30m + 40m + 50m = 120 meters.",
    "hint": "30 + 40 + 50 = 120m."
  },
  {
    "id": 12,
    "question": "In the previous question, if the server is in Block B, what is the total cable length for a Star topology connecting B->A, B->C, and B->D (given distance B to D = 80m)?",
    "options": [
      "150 meters (30m + 40m + 80m)",
      "120 meters",
      "250 meters",
      "300 meters"
    ],
    "correctAnswer": 0,
    "explanation": "Star links from B: B->A (30m) + B->C (40m) + B->D (80m) = 150 meters.",
    "hint": "30 + 40 + 80 = 150m."
  },
  {
    "id": 13,
    "question": "Why might an organization choose the Star topology (150m cable) over the Bus topology (120m cable) despite slightly higher cable meters?",
    "options": [
      "Because Star topology offers superior fault isolation (a break in one cable affects only that single block) and easier management via the central switch.",
      "Because Star cables are thinner.",
      "Because Bus topology does not support computers.",
      "Because Star topology works without electricity."
    ],
    "correctAnswer": 0,
    "explanation": "In Star topology, a single cable fault does not bring down the entire network, unlike Bus topology where a backbone break disrupts all communication.",
    "hint": "Superior fault isolation and central manageability."
  },
  {
    "id": 14,
    "question": "When evaluating distance tables, why should you check if units are in 'Meters' or 'Kilometers'?",
    "options": [
      "Because confusing 100 meters with 100 kilometers completely changes the medium recommendation (UTP cable vs Satellite/Leased lines).",
      "Because kilometers use bigger numbers.",
      "Because meters are only used in India.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "Always check the units: 100 meters uses Cat6 UTP; 100 kilometers mandates leased line, microwave, or satellite WAN connectivity.",
    "hint": "Check units: meters vs kilometers."
  },
  {
    "id": 15,
    "question": "If a table shows: Block 1 = 15 PCs, Block 2 = 18 PCs, Block 3 = 12 PCs, Block 4 = 16 PCs. Which block should host the server?",
    "options": [
      "Block 2",
      "Block 4",
      "Block 1",
      "Block 3"
    ],
    "correctAnswer": 0,
    "explanation": "Block 2 has 18 PCs, the highest count among all blocks. The server belongs in Block 2.",
    "hint": "Block 2 has 18 PCs (maximum)."
  },
  {
    "id": 16,
    "question": "In a case study, how many Hubs or Switches are needed for a campus with 4 blocks: Admin, Library, Lab, and Hostel (each having multiple computers)?",
    "options": [
      "4 Switches (One switch installed in each of the 4 blocks)",
      "Only 1 switch for the whole campus",
      "Zero switches",
      "100 switches"
    ],
    "correctAnswer": 0,
    "explanation": "Every block containing multiple computers must have its own local switch to connect workstations together.",
    "hint": "One switch per block = 4 switches."
  },
  {
    "id": 17,
    "question": "If a campus block has only ONE single computer (e.g. Guard Post), is a switch strictly required in that block?",
    "options": [
      "No, a single computer can be connected directly via a drop cable to the main building switch without needing a local multi-port switch.",
      "Yes, every room must have 10 switches.",
      "No, single computers cannot connect to networks.",
      "Only if it is a laptop."
    ],
    "correctAnswer": 0,
    "explanation": "A switch is a concentration device for multiple computers; a single computer connects directly into a distant switch port.",
    "hint": "A single computer does not require its own multi-port switch."
  },
  {
    "id": 18,
    "question": "If a case study distance table lists: Block A to Server = 115m. If the school installs a Switch at the midway point (at 60m), is a dedicated repeater still needed?",
    "options": [
      "No, because a Switch inherently regenerates and cleans digital signals at Layer 2, acting as an effective repeater.",
      "Yes, repeaters must be installed next to every switch.",
      "No, switches cannot regenerate signals.",
      "Only if connected by coaxial cable."
    ],
    "correctAnswer": 0,
    "explanation": "An active switch regenerates digital frames, effectively functioning as a multi-port repeater.",
    "hint": "An active switch acts as a signal regenerator."
  },
  {
    "id": 19,
    "question": "What is the typical bandwidth requirement difference between a block with 120 computers (Computer Lab) and a block with 5 computers (Staff Room)?",
    "options": [
      "The Computer Lab requires vastly higher backbone bandwidth (e.g. Gigabit/Fiber uplink) to handle concurrent student traffic.",
      "They have identical bandwidth requirements.",
      "The Staff Room requires 100 times more bandwidth.",
      "Bandwidth does not depend on computer count."
    ],
    "correctAnswer": 0,
    "explanation": "Higher workstation density generates proportionally higher aggregated data volume, justifying gigabit uplinks.",
    "hint": "Computer Lab requires significantly higher bandwidth."
  },
  {
    "id": 20,
    "question": "If the distance between Block P and Block Q is 95 meters, should a student strictly recommend a repeater in their CBSE answer sheet?",
    "options": [
      "No, because 95m is within the 100m UTP threshold, though stating 'Optional / Recommended for signal safety' is accepted.",
      "Yes, repeaters are mandatory above 50 meters.",
      "Repeaters only work below 20 meters.",
      "No, repeaters cannot be used at 95 meters."
    ],
    "correctAnswer": 0,
    "explanation": "Standard UTP certification supports up to 100 meters; since 95m <= 100m, a repeater is not strictly mandatory.",
    "hint": "95 meters is within the 100m limit."
  },
  {
    "id": 21,
    "question": "When drawing the cable layout diagram in an examination, should you include the distance in meters alongside each link?",
    "options": [
      "Yes, labeling each link with its length (e.g. 'Link A-B: 60m') makes the answer clear and demonstrates accurate calculation.",
      "No, distances should be kept secret.",
      "Only write distances in roman numerals.",
      "No, examiners penalize writing numbers."
    ],
    "correctAnswer": 0,
    "explanation": "Labeling distances and computing total cable meters demonstrates complete mastery and clarity.",
    "hint": "Label links with their distances in meters."
  },
  {
    "id": 22,
    "question": "If the question asks: 'Which block should have the highest internet bandwidth allocation?', how should you answer?",
    "options": [
      "The block with the maximum number of computers (e.g. Computer Science Lab), because it has the largest concentration of concurrent active users.",
      "The parking lot.",
      "The canteen.",
      "The principal's empty office."
    ],
    "correctAnswer": 0,
    "explanation": "Bandwidth allocation should correlate directly to user density and workstation count.",
    "hint": "Block with the maximum number of computers."
  },
  {
    "id": 23,
    "question": "What mathematical principle helps identify the shortest Bus topology connecting N blocks?",
    "options": [
      "Minimum Spanning Tree (MST) concept, connecting blocks via the shortest adjacent edge distances without forming loops.",
      "Quadratic formula.",
      "Pythagoras theorem.",
      "Trigonometric sine rule."
    ],
    "correctAnswer": 0,
    "explanation": "Selecting the shortest non-cyclical links connecting all blocks produces the Minimum Spanning Tree (MST) layout.",
    "hint": "Minimum Spanning Tree (MST) connects all blocks with minimum cable."
  },
  {
    "id": 24,
    "question": "In a CBSE 1-mark question: 'Why is a switch preferred over a hub in each block?' What is the ideal answer?",
    "options": [
      "A switch provides dedicated bandwidth per port, avoids packet collisions, and maintains a MAC table, whereas a hub broadcasts all traffic, causing heavy congestion.",
      "A switch is wireless; a hub is wired.",
      "A switch is made of plastic; a hub is made of metal.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "Switches isolate collision domains and forward frames intelligently based on MAC addresses.",
    "hint": "Dedicated bandwidth per port and collision elimination."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination case study, the distance between Block A and Block B is 80m, B and C is 60m, and C and A is 130m. The server is placed in Block B. What is the total cable length for a Star layout from Block B?",
    "options": [
      "140 meters (80m to Block A + 60m to Block C)",
      "270 meters",
      "130 meters",
      "200 meters"
    ],
    "correctAnswer": 0,
    "explanation": "In a Star topology with server in B: Link B->A (80m) + Link B->C (60m) = 140 meters total. Link C->A is not needed.",
    "hint": "80m + 60m = 140m."
  }
];
