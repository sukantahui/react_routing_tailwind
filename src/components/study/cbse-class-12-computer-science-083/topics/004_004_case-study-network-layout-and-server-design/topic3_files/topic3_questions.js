export default [
  {
    "id": 1,
    "question": "In Sub-Question (b) of the 4-mark case study, what are the two primary network topologies accepted by CBSE examiners for connecting campus blocks?",
    "options": [
      "Star Topology (radiating from the Server block) and Bus / Tree Topology (connecting shortest adjacent links)",
      "Full Mesh Topology and Dual Ring Topology",
      "Peer-to-Peer Ad-hoc Wi-Fi only",
      "Bluetooth Scatternet only"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE marking schemes accept either Star Topology (centered at the Server) or Bus/Tree Topology (connecting shortest adjacent edges to minimize cable meters).",
    "hint": "Star Topology and Bus Topology."
  },
  {
    "id": 2,
    "question": "What is the primary architectural advantage of choosing a Star Topology layout where direct point-to-point cables connect the Server block to every other block?",
    "options": [
      "High fault isolation: if one cable breaks, only that single block is affected; communication between all other blocks and the server continues normally.",
      "It requires zero meters of cable.",
      "It does not require electrical power.",
      "It makes computer monitors display in 4K resolution."
    ],
    "correctAnswer": 0,
    "explanation": "In Star topology, each wing has an independent dedicated uplink to the central server building switch, ensuring that single cable cuts do not cause campus-wide blackouts.",
    "hint": "High fault isolation and independent links."
  },
  {
    "id": 3,
    "question": "What is the primary advantage of choosing a Bus Topology layout connecting blocks in a linear daisy-chain sequence?",
    "options": [
      "It minimizes the total length (and cost) of physical cabling required across the campus.",
      "It completely eliminates all computer viruses.",
      "It allows computers to communicate when powered off.",
      "It works without a network switch."
    ],
    "correctAnswer": 0,
    "explanation": "Bus/Tree topology connects adjacent blocks along the shortest path (Minimum Spanning Tree), reducing total physical cable expenditure.",
    "hint": "Minimizes total cable length and trenching cost."
  },
  {
    "id": 4,
    "question": "What is the major vulnerability of a pure Bus topology layout connecting campus blocks?",
    "options": [
      "A break or severance in the central backbone cable disrupts network communication for all subsequent blocks down the line.",
      "It causes electrical fires.",
      "It can only transmit text files.",
      "It cannot run on Linux."
    ],
    "correctAnswer": 0,
    "explanation": "The backbone cable is a single point of failure; a severance breaks signal continuity for all downstream nodes.",
    "hint": "A break in the backbone halts downstream communication."
  },
  {
    "id": 5,
    "question": "When drawing the cable layout diagram in your CBSE board answer sheet, how should blocks and links be represented?",
    "options": [
      "Draw labeled rectangular boxes for each block (e.g. [Admin], [Tech], [Finance]), mark the Server location clearly, and draw straight lines showing the cables with distances labeled.",
      "Draw realistic 3D architectural sketches of the buildings with brick textures.",
      "Write a poem about cables.",
      "Draw a picture of a satellite."
    ],
    "correctAnswer": 0,
    "explanation": "A clean schematic block diagram with labeled boxes and connecting lines with lengths in meters is the standard expected representation.",
    "hint": "Neat rectangular labeled boxes and connecting lines."
  },
  {
    "id": 6,
    "question": "Given distances from Server Block S: S->A = 50m, S->B = 70m, S->C = 90m. What is the total cable length for a Star layout?",
    "options": [
      "210 meters (50m + 70m + 90m)",
      "150 meters",
      "300 meters",
      "270 meters"
    ],
    "correctAnswer": 0,
    "explanation": "Total Star layout meters = 50 + 70 + 90 = 210 meters.",
    "hint": "50 + 70 + 90 = 210m."
  },
  {
    "id": 7,
    "question": "Given adjacent distances: Block A to B = 40m; Block B to C = 50m; Block C to S = 60m. What is the total cable length for a Bus layout A-B-C-S?",
    "options": [
      "150 meters (40m + 50m + 60m)",
      "210 meters",
      "300 meters",
      "100 meters"
    ],
    "correctAnswer": 0,
    "explanation": "Total Bus layout meters = 40 + 50 + 60 = 150 meters.",
    "hint": "40 + 50 + 60 = 150m."
  },
  {
    "id": 8,
    "question": "If a CBSE question specifically states: 'Suggest the most economical cable layout with minimum cable length', which topology must you propose?",
    "options": [
      "Bus / Tree Topology (connecting shortest adjacent blocks to minimize total cable meters)",
      "Full Mesh Topology",
      "Star Topology with double redundant cables",
      "Dual Counter-Rotating Ring Topology"
    ],
    "correctAnswer": 0,
    "explanation": "When minimum cable length is explicitly demanded, the Bus/Tree layout connecting adjacent shortest links is the required answer.",
    "hint": "Bus / Tree topology minimizes total cable length."
  },
  {
    "id": 9,
    "question": "If the question states: 'Suggest a cable layout that ensures high reliability and easy fault isolation', which topology must you propose?",
    "options": [
      "Star Topology (centered at the Server block)",
      "Bus Topology",
      "Ring Topology",
      "Linear Chain"
    ],
    "correctAnswer": 0,
    "explanation": "Star topology provides superior fault isolation because each building has a dedicated, independent cable link to the central switch.",
    "hint": "Star topology provides superior fault isolation."
  },
  {
    "id": 10,
    "question": "In an inter-building Star topology, where is the main central distribution switch physically housed?",
    "options": [
      "Inside the Server Room of the Server Block",
      "In the guard booth",
      "On the outdoor roof of the shortest building",
      "Underground in a manhole"
    ],
    "correctAnswer": 0,
    "explanation": "The core campus switch sits in the main server room rack, with all inter-building cables terminating onto its patch panel.",
    "hint": "In the central Server Room."
  },
  {
    "id": 11,
    "question": "Why is a Full Mesh topology NEVER recommended for connecting 5 campus buildings in a CBSE case study?",
    "options": [
      "Because N*(N-1)/2 = 10 separate trenching cable runs would be required, leading to prohibitive cabling cost, trenching complexity, and hardware waste.",
      "Because Mesh topology cannot carry internet packets.",
      "Because Mesh topology only works on copper wires.",
      "Because Mesh topology requires satellite dishes."
    ],
    "correctAnswer": 0,
    "explanation": "Full mesh requires excessive cabling runs (10 links for 5 nodes) and multiple NIC ports per switch, which is economically unjustified for campus LANs.",
    "hint": "Excessive cost and cabling complexity."
  },
  {
    "id": 12,
    "question": "Can an inter-building layout combine both Star and Bus principles (Tree Topology)?",
    "options": [
      "Yes, campus networks often form an Extended Star or Tree Topology where buildings connect via a backbone bus or fiber star, and internal rooms use local star clusters.",
      "No, mixing topologies causes electrical shorts.",
      "Only if authorized by the police.",
      "No, only one topology can exist in a city."
    ],
    "correctAnswer": 0,
    "explanation": "Tree topology hierarchically links star clusters, making it the most common real-world campus architecture.",
    "hint": "Tree topology hierarchically combines star and bus layouts."
  },
  {
    "id": 13,
    "question": "When calculating cable lengths, should you include internal room cabling inside each building?",
    "options": [
      "No, case study calculations deal strictly with the inter-building exterior distances provided in Table 2, unless internal cable lengths are explicitly given.",
      "Yes, assume 1,000 meters per room.",
      "Yes, multiply the answer by 50.",
      "Assume zero meters."
    ],
    "correctAnswer": 0,
    "explanation": "Examiners test calculations based strictly on the distance matrix table provided in the examination paper.",
    "hint": "Use only the distances given in Table 2."
  },
  {
    "id": 14,
    "question": "What hardware component terminates twisted pair cables inside each building's network rack?",
    "options": [
      "Patch Panel and RJ45 Keystone Jacks",
      "BNC T-Connector",
      "Analog Splitter",
      "VGA Port"
    ],
    "correctAnswer": 0,
    "explanation": "Structured cabling terminates on patch panels inside network equipment racks, with short patch cords connecting to switches.",
    "hint": "Patch panel and RJ45 jacks."
  },
  {
    "id": 15,
    "question": "If a Star layout requires 260 meters of cable and a Bus layout requires 190 meters of cable, which one should a student draw if no specific constraint is mentioned?",
    "options": [
      "Either Star or Bus is fully credited by CBSE; drawing Star from the Server is generally easiest to explain and preferred.",
      "Both must be drawn simultaneously.",
      "Neither should be drawn.",
      "Only Ring topology is accepted."
    ],
    "correctAnswer": 0,
    "explanation": "CBSE marking guidelines state: 'Accept any valid cable layout (Star or Bus) with appropriate diagram and distance calculation.'",
    "hint": "Either Star or Bus is accepted by CBSE."
  },
  {
    "id": 16,
    "question": "How does Star topology simplify network troubleshooting compared to Bus topology?",
    "options": [
      "If communication to Wing A fails, the network technician immediately inspects the single dedicated port and cable for Wing A, without affecting Wings B, C, or D.",
      "Star topology sends emails automatically when a cable breaks.",
      "Star cables glow red when broken.",
      "Troubleshooting is impossible in Star topology."
    ],
    "correctAnswer": 0,
    "explanation": "Point-to-point links isolate faults to specific switch ports and cable segments, simplifying diagnostic localization.",
    "hint": "Point-to-point links isolate faults directly."
  },
  {
    "id": 17,
    "question": "In a case study with 4 blocks: Admin, Tech (Server), HR, Accounts. How many inter-building links are drawn in a Star layout?",
    "options": [
      "3 Links (Tech to Admin, Tech to HR, Tech to Accounts)",
      "6 Links",
      "4 Links",
      "1 Link"
    ],
    "correctAnswer": 0,
    "explanation": "To connect N blocks in a star layout around a central server, exactly N - 1 links are required (4 - 1 = 3 links).",
    "hint": "N - 1 links = 4 - 1 = 3 links."
  },
  {
    "id": 18,
    "question": "How many links are drawn in a linear Bus layout connecting 4 blocks?",
    "options": [
      "3 Links (Block 1 to Block 2, Block 2 to Block 3, Block 3 to Block 4)",
      "4 Links",
      "6 Links",
      "2 Links"
    ],
    "correctAnswer": 0,
    "explanation": "A spanning tree / bus connecting 4 blocks requires exactly 3 links (N - 1 = 3 links).",
    "hint": "N - 1 links = 3 links."
  },
  {
    "id": 19,
    "question": "If you draw a closed loop connecting all 4 blocks in a circle (e.g. A->B->C->D->A), what topology have you drawn, and why might it be penalized in basic campus LAN design?",
    "options": [
      "Ring Topology; without specialized Spanning Tree Protocol (STP) management, closed physical loops can create severe broadcast storms in standard Ethernet networks.",
      "Star topology.",
      "Mesh topology.",
      "Wireless PAN."
    ],
    "correctAnswer": 0,
    "explanation": "Closed physical loops in Ethernet cause broadcast storms unless managed by protocols like STP (802.1D).",
    "hint": "Ring topology loop can cause broadcast storms."
  },
  {
    "id": 20,
    "question": "What protective enclosure is used when burying inter-building UTP or fiber optic cables underground between campus blocks?",
    "options": [
      "High-Density Polyethylene (HDPE) Conduit pipes buried below the frost line",
      "Cardboard boxes",
      "Paper envelopes",
      "Cotton towels"
    ],
    "correctAnswer": 0,
    "explanation": "Outdoor cabling is pulled through buried HDPE or PVC conduits to shield lines from moisture, rodents, and physical digging damage.",
    "hint": "HDPE or PVC protective conduit pipes."
  },
  {
    "id": 21,
    "question": "If the server is in Block C, and you draw cables connecting C->A (80m) and C->B (60m), but omit connecting Block D (which sits 90m away), how many marks are lost?",
    "options": [
      "Partial credit is lost because not all blocks in the campus network were interconnected.",
      "Zero marks lost.",
      "10 marks lost.",
      "The exam is cancelled."
    ],
    "correctAnswer": 0,
    "explanation": "The layout MUST interconnect ALL campus blocks specified in the case study problem.",
    "hint": "All blocks must be interconnected."
  },
  {
    "id": 22,
    "question": "Which topology allows adding a new building to the campus later without disrupting existing operational buildings?",
    "options": [
      "Star Topology (simply run a new drop cable from the central server switch to the new building)",
      "Pure Bus Topology (which requires severing the backbone to insert a T-connector)",
      "Closed Ring Topology",
      "Point-to-Point crossover"
    ],
    "correctAnswer": 0,
    "explanation": "Star topology provides seamless scalability: new nodes connect to spare switch ports without taking existing links offline.",
    "hint": "Star topology enables non-disruptive expansion."
  },
  {
    "id": 23,
    "question": "In a CBSE examination diagram, is it necessary to use a ruler and colored pencils?",
    "options": [
      "A neat hand-drawn diagram using a pen/pencil with clearly labeled block names and distances is completely sufficient for full marks.",
      "Colored pencils are legally mandatory.",
      "Must be printed using a laser printer.",
      "Must be drawn in oil paints."
    ],
    "correctAnswer": 0,
    "explanation": "Neatness, accurate block labels, clear connecting lines, and correct distance sums are what examiners score.",
    "hint": "Neat labeled hand-drawn diagram is completely sufficient."
  },
  {
    "id": 24,
    "question": "Given: Server in Block Y. Distances: Y to W = 40m, Y to X = 65m, Y to Z = 110m. What is the total Star cable length and which link needs a repeater?",
    "options": [
      "Total: 215 meters; the link Y <-> Z (110m) requires a repeater because 110m > 100m.",
      "Total: 300 meters; no repeater needed.",
      "Total: 100 meters; all links need repeaters.",
      "Total: 500 meters."
    ],
    "correctAnswer": 0,
    "explanation": "Total = 40 + 65 + 110 = 215 meters. Since 110m exceeds 100m, Y<->Z requires a repeater.",
    "hint": "Total: 215m; link Y<->Z (110m) needs repeater."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Suggest and draw the most suitable cable layout to connect all the blocks.' What constitutes the complete, full-credit response?",
    "options": [
      "A clear block diagram showing all blocks as labeled boxes with connecting lines, the Server block clearly designated, the chosen topology named (e.g. Star Topology), and the total cable length computed in meters.",
      "A one-word answer: 'Star'.",
      "A blank box.",
      "Writing 'Use Wi-Fi'."
    ],
    "correctAnswer": 0,
    "explanation": "Naming the topology, drawing the labeled diagram, marking the server, and calculating total length guarantees the full 1.0 mark.",
    "hint": "Named topology + labeled diagram + server marker + total cable length."
  }
];
