// 25 Authentic CBSE Board Examination Questions for Topic 5
const questions = [
  {
    "id": 1,
    "question": "Why is a coaxial cable named 'coaxial'?",
    "options": [
      "Because it carries data across two axes simultaneously",
      "Because its two conductors (inner central wire and outer braided shield) share the same geometric axis",
      "Because it requires two separate batteries to operate",
      "Because it connects two computers directly"
    ],
    "answer": "Because its two conductors (inner central wire and outer braided shield) share the same geometric axis",
    "explanation": "The name 'co-axial' originates from having two concentric conductors sharing a common geometric center-line axis, separated by a uniform dielectric insulator.",
    "hint": "'Co-' means sharing; 'axial' refers to the center axis."
  },
  {
    "id": 2,
    "question": "What is the primary function of the braided metallic mesh in a coaxial cable?",
    "options": [
      "To provide high-voltage AC electric power to workstations",
      "To shield the central signal conductor from external EMI/RFI and provide a ground return path",
      "To make the cable waterproof and heat resistant",
      "To convert optical photons into radio waves"
    ],
    "answer": "To shield the central signal conductor from external EMI/RFI and provide a ground return path",
    "explanation": "The braided conductive mesh surrounds the dielectric layer, intercepting stray electromagnetic interference and serving as the electrical ground return circuit.",
    "hint": "It acts as a 360-degree electromagnetic barrier and ground path."
  },
  {
    "id": 3,
    "question": "What is the characteristic impedance of a standard baseband coaxial cable used in computer networking (such as RG-58)?",
    "options": [
      "25 Ohms",
      "50 Ohms",
      "75 Ohms",
      "100 Ohms"
    ],
    "answer": "50 Ohms",
    "explanation": "Baseband digital coaxial cables used in legacy Ethernet networks (RG-58, RG-8) are engineered with an electrical characteristic impedance of 50 Ohms.",
    "hint": "Baseband digital is 50 Ohms; broadband cable TV is 75 Ohms."
  },
  {
    "id": 4,
    "question": "What is the characteristic impedance of broadband coaxial cable used for Cable Television (CATV) and cable broadband modems (such as RG-6)?",
    "options": [
      "50 Ohms",
      "75 Ohms",
      "100 Ohms",
      "150 Ohms"
    ],
    "answer": "75 Ohms",
    "explanation": "Broadband coaxial cable designed for analog RF transmission, cable television, and cable internet modems (RG-6 and RG-59) has an impedance of 75 Ohms.",
    "hint": "75 Ohms optimizes signal attenuation for broadband RF frequencies."
  },
  {
    "id": 5,
    "question": "In the Ethernet specification 10BASE2, what does the numeral '2' stand for?",
    "options": [
      "Two pairs of wires",
      "2 Gbps transmission speed",
      "Approximately 200 meters (specifically 185 meters) maximum segment length",
      "2 active computers per segment"
    ],
    "answer": "Approximately 200 meters (specifically 185 meters) maximum segment length",
    "explanation": "In 10BASE2 (Thinnet), '10' is 10 Mbps, 'BASE' is baseband signaling, and '2' represents roughly 200 meters (the exact technical limit is 185 meters).",
    "hint": "10 = speed, BASE = signaling, 2 = distance rounded up."
  },
  {
    "id": 6,
    "question": "What does the numeral '5' represent in the 10BASE5 specification?",
    "options": [
      "5 Mbps transmission rate",
      "500 meters maximum segment length",
      "5 pairs of copper wires",
      "50 workstations maximum"
    ],
    "answer": "500 meters maximum segment length",
    "explanation": "10BASE5 (Thicknet) supports a maximum segment length of 500 meters before repeaters are required.",
    "hint": "Thicknet can reach half a kilometer."
  },
  {
    "id": 7,
    "question": "Why must a 50-Ohm terminator be connected at both ends of a coaxial bus network segment?",
    "options": [
      "To supply direct current power to network adapters",
      "To prevent signal reflections from bouncing back and corrupting active transmissions",
      "To convert baseband signals into Wi-Fi waves",
      "To increase the speed of the network from 10 Mbps to 100 Mbps"
    ],
    "answer": "To prevent signal reflections from bouncing back and corrupting active transmissions",
    "explanation": "When an electrical signal reaches the open end of a transmission line, it reflects backwards like an echo. A terminating resistor matches line impedance to absorb all signal energy.",
    "hint": "Without termination, signal echoes bounce back and cause collisions."
  },
  {
    "id": 8,
    "question": "Which connector type is standard for terminating coaxial cables in legacy Ethernet bus networks?",
    "options": [
      "RJ-45",
      "BNC (Bayonet Neill-Concelman) connector",
      "USB Type-C",
      "SC Fiber plug"
    ],
    "answer": "BNC (Bayonet Neill-Concelman) connector",
    "explanation": "BNC connectors use a twist-lock bayonet mechanism and were the industry standard for terminating RG-58 Thinnet coaxial network cabling.",
    "hint": "Bayonet lock connector named BNC."
  },
  {
    "id": 9,
    "question": "What connector component was used to tap a workstation's network interface card into a 10BASE2 coaxial bus cable?",
    "options": [
      "BNC T-Connector",
      "RJ-11 Splitter",
      "Optical Coupler",
      "Vampire Tap"
    ],
    "answer": "BNC T-Connector",
    "explanation": "A BNC T-connector plugs directly into the computer's NIC, while the two horizontal ends join the incoming and outgoing segments of the coaxial bus cable.",
    "hint": "Shaped like the letter 'T'."
  },
  {
    "id": 10,
    "question": "What hardware mechanism was used to attach computers to a 10BASE5 Thicknet cable without cutting the thick cable?",
    "options": [
      "BNC T-connector",
      "RJ-45 crimp",
      "Vampire Tap (piercing tap)",
      "ST connector"
    ],
    "answer": "Vampire Tap (piercing tap)",
    "explanation": "A Vampire Tap clamped onto the thick cable and pierced through the outer layers with metal prongs to make direct contact with the inner core conductor.",
    "hint": "Named 'vampire' because its metal teeth 'bit' into the cable."
  },
  {
    "id": 11,
    "question": "Which layer of a coaxial cable lies directly between the central copper conductor and the braided metallic shield?",
    "options": [
      "Outer PVC Jacket",
      "Dielectric Insulator",
      "RJ-45 Plug",
      "Foil wrapper"
    ],
    "answer": "Dielectric Insulator",
    "explanation": "The dielectric insulator (typically solid or foam polyethylene) maintains the exact radial spacing between the inner wire and outer shield.",
    "hint": "The non-conductive plastic insulating core."
  },
  {
    "id": 12,
    "question": "Which of the following is a major disadvantage of coaxial cable compared to twisted pair cable in modern building wiring?",
    "options": [
      "Coaxial cable has lower bandwidth than twisted pair",
      "Coaxial cable is thicker, stiffer, and much harder to pull through narrow conduits and bends",
      "Coaxial cable cannot transmit analog signals",
      "Coaxial cable has a maximum range of only 10 meters"
    ],
    "answer": "Coaxial cable is thicker, stiffer, and much harder to pull through narrow conduits and bends",
    "explanation": "Due to its solid shield and thick dielectric layer, coaxial cable is bulky and inflexible compared to lightweight, easily routed UTP cables.",
    "hint": "Think about physical flexibility and ease of routing through walls."
  },
  {
    "id": 13,
    "question": "What is the difference between Baseband and Broadband transmission over coaxial cables?",
    "options": [
      "Baseband carries multiple analog channels; Broadband carries only one digital signal",
      "Baseband transmits digital pulses using the entire cable bandwidth; Broadband uses analog modulation with Frequency Division Multiplexing",
      "Baseband is strictly wireless; Broadband is strictly wired",
      "Baseband works over 100 km; Broadband works over 1 meter"
    ],
    "answer": "Baseband transmits digital pulses using the entire cable bandwidth; Broadband uses analog modulation with Frequency Division Multiplexing",
    "explanation": "Baseband dedicates the entire physical medium to a single digital channel. Broadband splits the total bandwidth into multiple simultaneous frequency channels using analog carriers.",
    "hint": "Broadband = broad frequency band with multiple channels (like TV channels)."
  },
  {
    "id": 14,
    "question": "Which coaxial cable model is most commonly installed for residential cable television (CATV) and high-speed cable Internet modems?",
    "options": [
      "RG-58",
      "RG-6",
      "Cat-6",
      "Cat-3"
    ],
    "answer": "RG-6",
    "explanation": "RG-6 is a 75-Ohm coaxial cable with heavy shielding and low attenuation at gigahertz frequencies, making it standard for CATV and DOCSIS cable internet.",
    "hint": "Standard TV coaxial cable is RG-6."
  },
  {
    "id": 15,
    "question": "What happens if one of the BNC terminators is removed or damaged on an active 10BASE2 bus network?",
    "options": [
      "Only the computer nearest to the damaged terminator stops working",
      "The entire network bus segment goes down because signal reflections cause massive collisions",
      "The speed doubles automatically",
      "The network switches from Ethernet to Wi-Fi seamlessly"
    ],
    "answer": "The entire network bus segment goes down because signal reflections cause massive collisions",
    "explanation": "In a bus topology, removing a terminator leaves the line open. Reflected electromagnetic waves destroy all passing frames, bringing down the whole bus.",
    "hint": "Bus topology has a single point of failure."
  },
  {
    "id": 16,
    "question": "Which connector is standard for threaded connections on modern 75-Ohm cable TV coax (RG-6)?",
    "options": [
      "BNC",
      "F-type connector",
      "RJ-45",
      "VGA connector"
    ],
    "answer": "F-type connector",
    "explanation": "F-type connectors are the threaded screw-on connectors seen on televisions, set-top boxes, and cable modems.",
    "hint": "Single letter connector with screw threading."
  },
  {
    "id": 17,
    "question": "True or False: Coaxial cables provide better immunity against electromagnetic interference than unshielded twisted pair (UTP) cables.",
    "options": [
      "True",
      "False",
      "Only when submerged in water",
      "Only at midnight"
    ],
    "answer": "True",
    "explanation": "The continuous 360-degree metallic braided shield around coaxial cable provides significantly superior EMI shielding compared to unshielded twisted pair wires.",
    "hint": "Coax has a solid conductive metallic cylinder shielding the center conductor."
  },
  {
    "id": 18,
    "question": "Why has coaxial cable been almost entirely replaced by UTP and Optical Fiber in modern local area networks?",
    "options": [
      "Coaxial cannot carry electricity",
      "UTP is cheaper and supports star topology; Fiber provides exponentially higher speed over long distances",
      "Coaxial cable was banned by international law",
      "Coaxial cable cannot connect to routers"
    ],
    "answer": "UTP is cheaper and supports star topology; Fiber provides exponentially higher speed over long distances",
    "explanation": "UTP offers easy installation, low cost, and modular star switching, while optical fiber delivers multi-gigabit speeds immune to noise over kilometers.",
    "hint": "Consider cost/flexibility for short runs and fiber for high-speed long runs."
  },
  {
    "id": 19,
    "question": "What type of signal encoding was used in 10BASE2 and 10BASE5 baseband Ethernet networks?",
    "options": [
      "QAM-256",
      "Manchester Encoding",
      "Frequency Shift Keying (FSK)",
      "Amplitude Modulation (AM)"
    ],
    "answer": "Manchester Encoding",
    "explanation": "Classic 10 Mbps Ethernet used Manchester encoding, where a transition occurs at the center of every bit period (low-to-high for 1, high-to-low for 0).",
    "hint": "Self-clocking digital encoding named after a British university city."
  },
  {
    "id": 20,
    "question": "In coaxial cable terminology, what does 'RG' stand for?",
    "options": [
      "Radio Guide",
      "Real Ground",
      "Router Gateway",
      "Register Grade"
    ],
    "answer": "Radio Guide",
    "explanation": "'RG' originated as a military designation for 'Radio Guide' (or Radio Guide specification) during World War II.",
    "hint": "Guide for Radio frequencies."
  },
  {
    "id": 21,
    "question": "What is the maximum number of nodes (workstations) permitted on a single 10BASE2 Thinnet segment under IEEE 802.3?",
    "options": [
      "10 nodes",
      "30 nodes",
      "100 nodes",
      "256 nodes"
    ],
    "answer": "30 nodes",
    "explanation": "Under IEEE 802.3 specifications, a 10BASE2 Thinnet segment is limited to a maximum of 30 nodes with a minimum spacing of 0.5 meters between taps.",
    "hint": "Thinnet limit is thirty devices."
  },
  {
    "id": 22,
    "question": "What is the maximum number of nodes permitted on a single 10BASE5 Thicknet segment?",
    "options": [
      "30 nodes",
      "50 nodes",
      "100 nodes",
      "1024 nodes"
    ],
    "answer": "100 nodes",
    "explanation": "A 10BASE5 Thicknet segment allows up to 100 transceivers with a minimum attachment spacing of 2.5 meters.",
    "hint": "Thicknet supports up to 100 nodes over its 500m length."
  },
  {
    "id": 23,
    "question": "Which property ensures that signals travelling through a coaxial cable do not leak radiation into the surrounding environment?",
    "options": [
      "The outer metallic shield contains the electromagnetic fields inside the dielectric space",
      "The plastic jacket absorbs all photons",
      "The copper core moves at supersonic speed",
      "The copper wire has zero electrical resistance"
    ],
    "answer": "The outer metallic shield contains the electromagnetic fields inside the dielectric space",
    "explanation": "The equal and opposite currents in the core and outer shield keep the electromagnetic field confined strictly within the dielectric region between them.",
    "hint": "Concentric shielding confines electromagnetic energy."
  },
  {
    "id": 24,
    "question": "Why did 10BASE5 Thicknet cables have black bands marked every 2.5 meters along their yellow jacket?",
    "options": [
      "To show where the cable should be cut",
      "To mark safe locations for attaching vampire taps to prevent signal interference from standing waves",
      "To indicate voltage levels",
      "To measure the height of the ceiling"
    ],
    "answer": "To mark safe locations for attaching vampire taps to prevent signal interference from standing waves",
    "explanation": "Taps had to be placed at integer multiples of 2.5m to minimize internal signal reflections and standing wave interference along the 500m segment.",
    "hint": "Spacing markers for transceivers."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Identify the cable that consists of a solid copper wire surrounded by an insulator, a metallic foil/mesh, and an outer jacket.' What is the answer?",
    "options": [
      "Twisted Pair Cable",
      "Optical Fiber Cable",
      "Coaxial Cable",
      "Infrared Cable"
    ],
    "answer": "Coaxial Cable",
    "explanation": "This describes the classic 4-layer concentric structure of a coaxial cable.",
    "hint": "The central core + dielectric + outer shield + jacket defines coax."
  }
];

export default questions;
