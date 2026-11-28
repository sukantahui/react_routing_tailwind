export default [
  {
    "id": 1,
    "question": "What physical phenomenon in copper transmission media necessitates the installation of a Repeater?",
    "options": [
      "Attenuation: the progressive weakening and degradation of digital electrical signal amplitude as it travels across extended cable distances.",
      "Electromagnetic gravity.",
      "Light reflection inside copper.",
      "Thermal expansion of computers."
    ],
    "correctAnswer": 0,
    "explanation": "Attenuation is the loss of signal strength over distance due to cable resistance, requiring repeaters to regenerate the signal.",
    "hint": "Signal attenuation over extended distance."
  },
  {
    "id": 2,
    "question": "What is the certified maximum single segment distance for standard Category 5e/6 Unshielded Twisted Pair (UTP) cabling before a repeater is mandatory?",
    "options": [
      "100 meters",
      "500 meters",
      "1,000 meters",
      "25 meters"
    ],
    "correctAnswer": 0,
    "explanation": "Under TIA/EIA-568 standards, standard Ethernet over twisted pair has a maximum certified run length of 100 meters (90m horizontal + 10m patch cords).",
    "hint": "100 meters maximum certified distance."
  },
  {
    "id": 3,
    "question": "Given campus distances: Block A to Block B = 65 meters; Block B to Block C = 135 meters. Which link strictly requires a Repeater if connected using UTP cable?",
    "options": [
      "The link between Block B and Block C (135 m)",
      "The link between Block A and Block B (65 m)",
      "Both links",
      "Neither link"
    ],
    "correctAnswer": 0,
    "explanation": "Since 135 m > 100 m, the B <-> C link exceeds the UTP threshold and requires a repeater to regenerate the attenuated signal.",
    "hint": "135m exceeds the 100m limit."
  },
  {
    "id": 4,
    "question": "How does a digital Repeater differ fundamentally from an analog Amplifier?",
    "options": [
      "A Repeater regenerates clean, fresh, reshaped digital square pulses from scratch; an Amplifier merely boosts both the signal and the accumulated background noise.",
      "A Repeater requires no electricity; an Amplifier does.",
      "A Repeater is for audio; an Amplifier is for video.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "Repeaters decode incoming weak digital bits (1s and 0s) and generate fresh, noise-free duplicate pulses, preventing noise accumulation.",
    "hint": "Regenerates clean digital bits rather than amplifying noise."
  },
  {
    "id": 5,
    "question": "If an organization decides to use Fiber Optic cable instead of UTP cable to connect two buildings separated by 140 meters, is a repeater still needed?",
    "options": [
      "No, because fiber optic cables have minimal attenuation and can transmit light pulses over distances of 2 km to 10 km without requiring any repeater.",
      "Yes, fiber optic cables require repeaters every 50 meters.",
      "Yes, repeaters are always mandatory regardless of medium.",
      "Fiber optic cables cannot be used over 100 meters."
    ],
    "correctAnswer": 0,
    "explanation": "Optical fiber uses light guided by total internal reflection with negligible loss, spanning kilometers without signal repeaters.",
    "hint": "Fiber optic cables span kilometers without repeaters."
  },
  {
    "id": 6,
    "question": "At which layer of the OSI / TCP-IP reference model does a Repeater operate?",
    "options": [
      "Layer 1 (Physical Layer)",
      "Layer 2 (Data Link Layer)",
      "Layer 3 (Network Layer)",
      "Layer 7 (Application Layer)"
    ],
    "correctAnswer": 0,
    "explanation": "A Repeater operates purely at the Physical Layer (Layer 1), working with raw electrical voltage pulses without inspecting MAC or IP addresses.",
    "hint": "Layer 1 (Physical Layer)."
  },
  {
    "id": 7,
    "question": "If all links between four campus blocks in a case study are: 30m, 55m, 70m, and 85m. How should you answer the question: 'Where should a repeater be placed?'",
    "options": [
      "\"No repeater is required on any link, because all inter-block distances are within the 100-meter threshold for standard twisted pair cabling.\"",
      "\"Install a repeater in every room.\"",
      "\"Install 4 repeaters.\"",
      "\"Repeaters are illegal in schools.\""
    ],
    "correctAnswer": 0,
    "explanation": "When no link exceeds 100 meters, full credit is awarded for stating that no repeater is required because all distances are <= 100m.",
    "hint": "No repeater required if all distances are under 100m."
  },
  {
    "id": 8,
    "question": "In a CBSE 1-mark question: 'Suggest the placement of a repeater with valid justification.' What is the exact formula for a perfect answer?",
    "options": [
      "\"A repeater should be placed between Block [A] and Block [B] because the distance between them ([Distance] meters) exceeds the 70-100 meter threshold of UTP cable, to regenerate attenuated signals.\"",
      "\"Between Block A and Block B because it looks far.\"",
      "\"Everywhere.\"",
      "\"Nowhere.\""
    ],
    "correctAnswer": 0,
    "explanation": "A complete answer names the specific link, quotes the numerical distance, notes that it exceeds 100m, and states the purpose: signal regeneration.",
    "hint": "Identify the link exceeding 100m and state signal regeneration."
  },
  {
    "id": 9,
    "question": "What happens if a UTP cable run of 160 meters is laid between two school blocks without installing a repeater?",
    "options": [
      "Data packets suffer high bit-error rates, severe packet loss, CRC checksum failures, and workstations will frequently drop network connection.",
      "The cable will turn into a radio antenna.",
      "The computers will run backwards.",
      "The internet will be free of charge."
    ],
    "correctAnswer": 0,
    "explanation": "Beyond 100m, electrical attenuation and dispersion degrade pulses below the threshold voltage required by NIC receivers.",
    "hint": "Causes severe signal attenuation and packet drops."
  },
  {
    "id": 10,
    "question": "Where along a 140-meter inter-building link should a Repeater ideally be positioned?",
    "options": [
      "Approximately halfway along the cable run (e.g. at ~70 meters) or inside an intermediate building/cabin, to regenerate the signal before it degrades completely.",
      "Directly at the 139-meter mark.",
      "At the 1-meter mark.",
      "Under water."
    ],
    "correctAnswer": 0,
    "explanation": "Placing repeaters midway ensures signals are boosted before excessive attenuation occurs, maintaining two equal healthy half-segments.",
    "hint": "Approximately halfway along the link."
  },
  {
    "id": 11,
    "question": "Does an active Network Switch also perform the function of a signal repeater?",
    "options": [
      "Yes, because an active switch reads incoming frames, cleans, and re-transmits fresh electrical/optical signals out of its destination port.",
      "No, switches weaken signals.",
      "No, switches only work with passwords.",
      "Only if the switch is unmanaged."
    ],
    "correctAnswer": 0,
    "explanation": "Active switches regenerate signals on every port, effectively acting as multi-port intelligent repeaters.",
    "hint": "Active switches regenerate signals on all ports."
  },
  {
    "id": 12,
    "question": "If the distance between two blocks is 90 meters, why do some textbooks mention a repeater might be optional?",
    "options": [
      "Because while 90m is within the 100m maximum, real-world cabling factors (patch panels, bends, environmental EMI) suggest conservative engineering thresholds around 70-80m.",
      "Because 90m is a lucky number.",
      "Because cables shrink in winter.",
      "There is no reason."
    ],
    "correctAnswer": 0,
    "explanation": "Conservative designs account for horizontal channel loss, but for CBSE scoring, 100 meters is the strict official threshold.",
    "hint": "100m is the official standard threshold."
  },
  {
    "id": 13,
    "question": "What type of power does an active repeater require to operate?",
    "options": [
      "External electrical power (AC mains or Power over Ethernet - PoE) to drive its internal regeneration and amplification circuitry.",
      "No power is needed.",
      "Wind energy only.",
      "Solar battery only."
    ],
    "correctAnswer": 0,
    "explanation": "Active repeaters require electrical power (often supplied via PoE down the twisted pair) to regenerate signal waveforms.",
    "hint": "Requires electrical power (AC or PoE)."
  },
  {
    "id": 14,
    "question": "In early CSMA/CD Ethernet, what rule limited the maximum number of repeaters between any two communicating hosts to prevent collision detection timing failures?",
    "options": [
      "The 5-4-3 Rule",
      "The 80-20 Rule",
      "The 3-Way Handshake",
      "The 10-Minute Rule"
    ],
    "correctAnswer": 0,
    "explanation": "The classic 5-4-3 rule permitted at most 5 segments, 4 repeaters, and 3 populated segments to bound round-trip propagation delay.",
    "hint": "The 5-4-3 Rule."
  },
  {
    "id": 15,
    "question": "Can a Repeater connect an Ethernet cable to an analog telephone wire?",
    "options": [
      "No, repeaters operate purely at Layer 1 on homogeneous media types; converting media architectures requires a Gateway or Modem.",
      "Yes, repeaters convert all protocols.",
      "Yes, if painted yellow.",
      "Repeaters only work with telephones."
    ],
    "correctAnswer": 0,
    "explanation": "Repeaters work on identical media and protocols, regenerating physical bits without protocol conversion.",
    "hint": "Repeaters do not perform protocol conversion."
  },
  {
    "id": 16,
    "question": "Given distances: A->B = 110m; B->C = 40m; C->D = 120m. How many repeaters are needed if all 3 links are cabled with UTP?",
    "options": [
      "2 Repeaters (One on A->B link, and one on C->D link)",
      "Zero repeaters",
      "3 Repeaters",
      "1 Repeater"
    ],
    "correctAnswer": 0,
    "explanation": "Both A->B (110m > 100m) and C->D (120m > 100m) exceed the 100-meter limit, so 2 repeaters are required.",
    "hint": "Two links exceed 100 meters."
  },
  {
    "id": 17,
    "question": "Why does a repeater NOT filter broadcast traffic or inspect IP addresses?",
    "options": [
      "Because it is a dumb Layer-1 device that does not understand packets, frames, MAC addresses, or IP headers; it merely regenerates raw electrical bits.",
      "Because repeaters are broken switches.",
      "Because repeaters are too expensive.",
      "Because the government forbids it."
    ],
    "correctAnswer": 0,
    "explanation": "Repeaters operate at the bit level of the Physical Layer and lack logic to parse packet headers.",
    "hint": "Operates at Layer 1; lacks packet/frame parsing logic."
  },
  {
    "id": 18,
    "question": "If a case study question asks: 'State the purpose of installing a repeater in one sentence', what is the model answer?",
    "options": [
      "\"A repeater is used to regenerate and amplify attenuated digital signals, enabling reliable transmission across cable distances exceeding 100 meters.\"",
      "\"A repeater is used to browse websites.\"",
      "\"A repeater is used to send emails.\"",
      "\"A repeater is used to connect printers.\""
    ],
    "correctAnswer": 0,
    "explanation": "Direct, precise textbook definition emphasizing signal regeneration and overcoming cable distance limits.",
    "hint": "Regenerates attenuated digital signals over extended distances."
  },
  {
    "id": 19,
    "question": "If two campus buildings are separated by 250 meters, what is the best professional recommendation instead of chaining multiple UTP repeaters?",
    "options": [
      "Install a direct Fiber Optic Cable link, which effortlessly spans 250 meters at gigabit speeds with zero repeaters.",
      "Use string and cans.",
      "Dig 50 repeaters underground.",
      "Cancel the network project."
    ],
    "correctAnswer": 0,
    "explanation": "For distances exceeding 100m, Fiber Optic is the industry best practice, eliminating outdoor intermediate repeaters.",
    "hint": "Deploy Fiber Optic cable."
  },
  {
    "id": 20,
    "question": "Does an unmanaged Hub act as an active repeater?",
    "options": [
      "Yes, an active hub is essentially a multi-port repeater: it regenerates incoming bits and broadcasts them to all other ports.",
      "No, hubs do not use electricity.",
      "No, hubs only store files.",
      "Only on wireless networks."
    ],
    "correctAnswer": 0,
    "explanation": "Hubs are classified as multiport repeaters that regenerate signals at Layer 1.",
    "hint": "An active hub is a multi-port repeater."
  },
  {
    "id": 21,
    "question": "In a CBSE exam, if a link distance is exactly 100 meters (e.g. 100m), should a student recommend a repeater?",
    "options": [
      "Writing 'Repeater is optional / recommended for safety margin' or 'Not strictly required as 100m is the boundary' are both awarded full credit.",
      "The student is disqualified.",
      "Only a modem can be used.",
      "Cables cannot be exactly 100m."
    ],
    "correctAnswer": 0,
    "explanation": "100 meters is the exact theoretical threshold; CBSE marking schemes give credit for either reasoned answer.",
    "hint": "Both answers with reasoning are accepted at 100m."
  },
  {
    "id": 22,
    "question": "What is 'Dispersion' that accompanies attenuation over long fiber optic or copper cables?",
    "options": [
      "The spreading out and blurring of light or electrical pulses in time, causing adjacent bits to overlap and interfere.",
      "The evaporation of electricity.",
      "The cable changing color.",
      "The speed of the fan decreasing."
    ],
    "correctAnswer": 0,
    "explanation": "Pulse dispersion distorts signal timing, which repeaters solve by retiming and regenerating square pulses.",
    "hint": "Pulse spreading and timing distortion."
  },
  {
    "id": 23,
    "question": "Can a repeater be installed outdoors exposed to open rain and weather?",
    "options": [
      "No, it must be enclosed inside a weatherproof, sealed NEMA/IP67 rated junction box or placed inside an air-conditioned building room.",
      "Yes, repeaters are waterproof.",
      "Repeaters work better under water.",
      "Repeaters must be exposed to rain for cooling."
    ],
    "correctAnswer": 0,
    "explanation": "Outdoor electronics require environmental protection against moisture, dust, and lightning surges.",
    "hint": "Requires weatherproof enclosure or indoor installation."
  },
  {
    "id": 24,
    "question": "In a case study, if the distance between Block Tech and Block Library is 105 meters, what is the single-word answer for the device needed?",
    "options": [
      "Repeater",
      "Modem",
      "Gateway",
      "Terminator"
    ],
    "correctAnswer": 0,
    "explanation": "Since 105m > 100m, a Repeater is the correct hardware component.",
    "hint": "Repeater."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination case study, how should you write the complete answer to: 'Suggest the placement of a repeater with reason.'?",
    "options": [
      "\"A repeater should be installed on the link between [Block A] and [Block B] because the distance between them is [X] meters, which exceeds the standard 100-meter transmission limit of UTP cable. It will regenerate the attenuated signals to prevent data loss.\"",
      "\"Repeater in Block A.\"",
      "\"Repeater on all computers.\"",
      "\"Repeater is not a valid device.\""
    ],
    "correctAnswer": 0,
    "explanation": "A complete answer names the link, states the distance, compares it to the 100m threshold, and explains signal regeneration.",
    "hint": "Name link + distance > 100m + signal regeneration justification."
  }
];
