// 25 Authentic CBSE Board Examination Questions for Topic 11
const questions = [
  {
    "id": 1,
    "question": "Which transmission medium is recommended for an indoor LAN when workstations are within 80 meters of the central switch?",
    "options": [
      "Cat-6 UTP Cable",
      "Single-Mode Optical Fiber",
      "Satellite Link",
      "Coaxial 10BASE5"
    ],
    "answer": "Cat-6 UTP Cable",
    "explanation": "For indoor runs under 100 meters, Cat-6 UTP is standard, flexible, and the most economical option.",
    "hint": "Under 100 meters within a building."
  },
  {
    "id": 2,
    "question": "What physical process allows light signals to stay trapped within the glass core of an optical fiber?",
    "options": [
      "Total Internal Reflection",
      "Optical Diffraction",
      "Refraction",
      "Polarization"
    ],
    "answer": "Total Internal Reflection",
    "explanation": "Light reflects continuously inside the denser core when the angle of incidence exceeds the critical angle.",
    "hint": "Total Internal Reflection."
  },
  {
    "id": 3,
    "question": "Why do terrestrial microwave systems require relay towers every 40 to 50 km?",
    "options": [
      "Because Earth's curvature blocks the direct line of sight",
      "Because batteries die after 50 km",
      "Because air density drops after 50 km",
      "Because government regulations mandate it"
    ],
    "answer": "Because Earth's curvature blocks the direct line of sight",
    "explanation": "Microwaves travel in straight lines; the curvature of the Earth creates an obstacle beyond 40-50 km.",
    "hint": "Earth curvature blocks straight-line signals."
  },
  {
    "id": 4,
    "question": "What is the orbital altitude of Geostationary satellites above the equator?",
    "options": [
      "35,786 km (~36,000 km)",
      "2,000 km",
      "500 km",
      "100,000 km"
    ],
    "answer": "35,786 km (~36,000 km)",
    "explanation": "GEO satellites orbit at exactly 35,786 km where their orbital period matches Earth's 24-hour day.",
    "hint": "Roughly 36,000 km."
  },
  {
    "id": 5,
    "question": "How many bits are in one Megabyte (MB)?",
    "options": [
      "8,388,608 bits",
      "1,000,000 bits",
      "8,000 bits",
      "1,048,576 bits"
    ],
    "answer": "8,388,608 bits",
    "explanation": "1 MB = 1024 KB = 1024 * 1024 Bytes = 1,048,576 Bytes * 8 bits = 8,388,608 bits.",
    "hint": "1024 * 1024 * 8."
  },
  {
    "id": 6,
    "question": "Why must Uplink and Downlink frequencies differ in satellite communications?",
    "options": [
      "To prevent self-interference and feedback between the satellite's receiver and transmitter",
      "Because space law requires two frequencies",
      "Because higher frequencies only travel downwards",
      "To save rocket fuel"
    ],
    "answer": "To prevent self-interference and feedback between the satellite's receiver and transmitter",
    "explanation": "Using different frequency bands prevents the satellite's strong downlink transmitter from swamping its sensitive uplink receiver.",
    "hint": "Prevents transmitter feedback into the receiver."
  },
  {
    "id": 7,
    "question": "Which transmission mode allows data transmission in both directions, but only one direction at a time?",
    "options": [
      "Half-Duplex",
      "Full-Duplex",
      "Simplex",
      "Multiplex"
    ],
    "answer": "Half-Duplex",
    "explanation": "Half-Duplex permits two-way communication, but not simultaneously (e.g. walkie-talkie).",
    "hint": "Both directions, but alternating."
  },
  {
    "id": 8,
    "question": "Which transmission mode allows data to flow in both directions simultaneously?",
    "options": [
      "Full-Duplex",
      "Half-Duplex",
      "Simplex",
      "Asynchronous"
    ],
    "answer": "Full-Duplex",
    "explanation": "Full-Duplex allows concurrent simultaneous transmission and reception (e.g. telephone).",
    "hint": "Simultaneous bidirectional communication."
  },
  {
    "id": 9,
    "question": "What is the characteristic impedance of standard baseband RG-58 coaxial cable?",
    "options": [
      "50 Ohms",
      "75 Ohms",
      "100 Ohms",
      "300 Ohms"
    ],
    "answer": "50 Ohms",
    "explanation": "Baseband digital coaxial cables have a characteristic impedance of 50 Ohms.",
    "hint": "Baseband digital coax is 50 Ohms."
  },
  {
    "id": 10,
    "question": "What is the characteristic impedance of broadband RG-6 coaxial cable used for cable TV?",
    "options": [
      "75 Ohms",
      "50 Ohms",
      "100 Ohms",
      "120 Ohms"
    ],
    "answer": "75 Ohms",
    "explanation": "Broadband coaxial cable designed for analog RF and CATV has an impedance of 75 Ohms.",
    "hint": "Cable TV coax is 75 Ohms."
  },
  {
    "id": 11,
    "question": "Which connector is used to terminate Cat-6 twisted pair cables for Ethernet?",
    "options": [
      "RJ-45",
      "BNC",
      "RJ-11",
      "SC connector"
    ],
    "answer": "RJ-45",
    "explanation": "RJ-45 (Registered Jack 45) is the 8-pin connector for twisted pair Ethernet cables.",
    "hint": "8-pin Registered Jack."
  },
  {
    "id": 12,
    "question": "Which optical connector has a square push-pull snap-in mechanism?",
    "options": [
      "SC connector",
      "ST connector",
      "BNC connector",
      "F-type connector"
    ],
    "answer": "SC connector",
    "explanation": "SC (Subscriber Connector / Square Connector) features a push-pull square body.",
    "hint": "Square push-pull connector."
  },
  {
    "id": 13,
    "question": "Why is infrared transmission unable to communicate between two adjacent rooms?",
    "options": [
      "Infrared waves cannot penetrate opaque solid walls",
      "Infrared travels too fast to turn corners",
      "Infrared is absorbed by oxygen in hallways",
      "Infrared is only for satellites"
    ],
    "answer": "Infrared waves cannot penetrate opaque solid walls",
    "explanation": "Infrared wavelengths are optical and cannot pass through solid walls, confining signals to a single room.",
    "hint": "Solid walls block infrared."
  },
  {
    "id": 14,
    "question": "What agency funded the development of ARPANET in 1969?",
    "options": [
      "DARPA (Defense Advanced Research Projects Agency, US DoD)",
      "CERN (European Organization for Nuclear Research)",
      "Microsoft Corporation",
      "United Nations"
    ],
    "answer": "DARPA (Defense Advanced Research Projects Agency, US DoD)",
    "explanation": "ARPANET was funded by the US Department of Defense's Advanced Research Projects Agency (DARPA).",
    "hint": "Advanced Research Projects Agency."
  },
  {
    "id": 15,
    "question": "In what decade did NSFNET establish its high-speed academic backbone network connecting supercomputers?",
    "options": [
      "Mid-1980s (1986)",
      "1950s",
      "2010s",
      "1970s"
    ],
    "answer": "Mid-1980s (1986)",
    "explanation": "NSFNET was created by the US National Science Foundation in 1986.",
    "hint": "Mid-1980s."
  },
  {
    "id": 16,
    "question": "What is the frequency range of Radio Waves under the CBSE networking syllabus?",
    "options": [
      "3 kHz to 1 GHz",
      "1 GHz to 300 GHz",
      "300 GHz to 400 THz",
      "400 THz to 750 THz"
    ],
    "answer": "3 kHz to 1 GHz",
    "explanation": "Radio waves span 3 kHz to 1 GHz, while microwaves cover 1 GHz to 300 GHz.",
    "hint": "3 kilohertz to 1 gigahertz."
  },
  {
    "id": 17,
    "question": "What is the frequency range of Microwaves?",
    "options": [
      "1 GHz to 300 GHz",
      "3 kHz to 1 GHz",
      "300 GHz to 400 THz",
      "100 MHz to 500 MHz"
    ],
    "answer": "1 GHz to 300 GHz",
    "explanation": "Microwaves operate between 1 GHz and 300 GHz.",
    "hint": "1 to 300 Gigahertz."
  },
  {
    "id": 18,
    "question": "What is the typical core diameter of Single-Mode Optical Fiber?",
    "options": [
      "8 to 10 micrometers (µm)",
      "50 to 62.5 micrometers (µm)",
      "1 millimeter",
      "100 nanometers"
    ],
    "answer": "8 to 10 micrometers (µm)",
    "explanation": "Single-Mode fiber has a narrow core of ~9 µm to restrict propagation to a single light ray path.",
    "hint": "Under 10 microns."
  },
  {
    "id": 19,
    "question": "Why is Optical Fiber the most secure guided medium against eavesdropping?",
    "options": [
      "It does not radiate electromagnetic energy and physical taps cause immediate optical power drops",
      "It requires a password to light up",
      "Glass is naturally encrypted",
      "Fiber only transmits during business hours"
    ],
    "answer": "It does not radiate electromagnetic energy and physical taps cause immediate optical power drops",
    "explanation": "Non-conductive glass emits no electromagnetic fields, and physical intrusion disrupts the light path, raising network alarms.",
    "hint": "No radiated fields and physical tampering is immediately detected."
  },
  {
    "id": 20,
    "question": "What does 'VSAT' stand for in satellite communications?",
    "options": [
      "Very Small Aperture Terminal",
      "Variable Space Antenna Technology",
      "Virtual Satellite Audio Transmission",
      "Velocity Sensor Array Transmitter"
    ],
    "answer": "Very Small Aperture Terminal",
    "explanation": "VSAT stands for Very Small Aperture Terminal, referring to compact dish antennas for remote sites.",
    "hint": "Very Small Aperture Terminal."
  },
  {
    "id": 21,
    "question": "What is the round-trip latency experienced over a Geostationary satellite link?",
    "options": [
      "Approx. 250 - 500 milliseconds",
      "1 millisecond",
      "5 seconds",
      "1 minute"
    ],
    "answer": "Approx. 250 - 500 milliseconds",
    "explanation": "Due to the 36,000 km distance to GEO orbit, speed-of-light propagation creates roughly half a second of latency.",
    "hint": "Roughly half a second."
  },
  {
    "id": 22,
    "question": "How many Geostationary satellites are sufficient to achieve worldwide coverage (excluding polar caps)?",
    "options": [
      "3 satellites",
      "1 satellite",
      "12 satellites",
      "24 satellites"
    ],
    "answer": "3 satellites",
    "explanation": "Three GEO satellites spaced 120 degrees apart provide global line of sight.",
    "hint": "Three satellites."
  },
  {
    "id": 23,
    "question": "Which transmission medium is best suited to connect a main city office to a remote oil rig 200 km offshore?",
    "options": [
      "Satellite Link",
      "Cat-6 UTP Cable",
      "Coaxial Cable",
      "Infrared Transmitter"
    ],
    "answer": "Satellite Link",
    "explanation": "Deep offshore ocean locations lack terrestrial infrastructure, making satellite communication the only viable medium.",
    "hint": "Deep offshore connectivity."
  },
  {
    "id": 24,
    "question": "What is the maximum segment length of UTP cable without a repeater?",
    "options": [
      "100 meters",
      "50 meters",
      "185 meters",
      "500 meters"
    ],
    "answer": "100 meters",
    "explanation": "Ethernet copper twisted pair standards mandate a maximum segment length of 100 meters.",
    "hint": "One hundred meters."
  },
  {
    "id": 25,
    "question": "Which component of an optical fiber has a higher refractive index?",
    "options": [
      "Core (n1 > n2)",
      "Cladding (n2 > n1)",
      "Outer Jacket",
      "Kevlar yarn"
    ],
    "answer": "Core (n1 > n2)",
    "explanation": "For Total Internal Reflection to occur, the core must be optically denser than the cladding: n1 > n2.",
    "hint": "Core is optically denser."
  }
];

export default questions;
