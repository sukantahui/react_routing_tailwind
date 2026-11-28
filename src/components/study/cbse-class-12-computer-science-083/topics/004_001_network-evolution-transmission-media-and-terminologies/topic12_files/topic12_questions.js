// 25 Authentic CBSE Board Examination Questions for Topic 12
const questions = [
  {
    "id": 1,
    "question": "What was the name of the first operational packet-switching computer network launched in 1969?",
    "options": [
      "NSFNET",
      "ARPANET",
      "Interspace",
      "Ethernet"
    ],
    "correctAnswer": 1,
    "answer": "ARPANET",
    "explanation": "ARPANET (Advanced Research Projects Agency Network) connected four university computers in 1969.",
    "hint": "Advanced Research Projects Agency Network."
  },
  {
    "id": 2,
    "question": "Which data communication component represents the formal set of rules that govern data transmission?",
    "options": [
      "Sender",
      "Message",
      "Protocol",
      "Medium"
    ],
    "correctAnswer": 2,
    "answer": "Protocol",
    "explanation": "A protocol is an agreed-upon set of rules governing formatting, timing, and error checking between communicating entities.",
    "hint": "Rule set governing communication."
  },
  {
    "id": 3,
    "question": "How long will it take to transfer a 200 Megabyte (MB) video file over a 16 Megabits per second (Mbps) broadband connection?",
    "options": [
      "12.5 seconds",
      "100 seconds",
      "160 seconds",
      "800 seconds"
    ],
    "correctAnswer": 1,
    "answer": "100 seconds",
    "explanation": "200 MB = 200 * 8 = 1600 Megabits. Time = 1600 Mb / 16 Mbps = 100 seconds (approx. 1 minute 40 seconds).",
    "hint": "Multiply MB by 8 to get Mb, then divide by Mbps."
  },
  {
    "id": 4,
    "question": "A traditional broadcast television transmission to household TVs is an example of which transmission mode?",
    "options": [
      "Simplex",
      "Half-Duplex",
      "Full-Duplex",
      "Multiplex"
    ],
    "correctAnswer": 0,
    "answer": "Simplex",
    "explanation": "TV broadcasting is strictly unidirectional; viewers receive signals but cannot transmit back to the tower.",
    "hint": "Strictly one-way transmission."
  },
  {
    "id": 5,
    "question": "Two firefighters communicating over walkie-talkies where one must say 'Over' before the other can speak is an example of:",
    "options": [
      "Simplex",
      "Half-Duplex",
      "Full-Duplex",
      "Broadcast"
    ],
    "correctAnswer": 1,
    "answer": "Half-Duplex",
    "explanation": "Half-Duplex allows transmission in both directions, but only by one party at any given time.",
    "hint": "Two-way communication, but alternating."
  },
  {
    "id": 6,
    "question": "What is the primary reason why copper wires are twisted in a twisted pair cable?",
    "options": [
      "To increase mechanical flexibility",
      "To cancel out electromagnetic interference (EMI) and reduce crosstalk between adjacent pairs",
      "To make the cable waterproof",
      "To allow the cable to float"
    ],
    "correctAnswer": 1,
    "answer": "To cancel out electromagnetic interference (EMI) and reduce crosstalk between adjacent pairs",
    "explanation": "Helical twisting cancels external magnetic noise and prevents mutual signal bleed (crosstalk).",
    "hint": "Opposing magnetic loops cancel out crosstalk and EMI."
  },
  {
    "id": 7,
    "question": "What is the standard maximum allowable segment length for a Cat-6 UTP cable without a repeater?",
    "options": [
      "50 meters",
      "100 meters",
      "185 meters",
      "500 meters"
    ],
    "correctAnswer": 1,
    "answer": "100 meters",
    "explanation": "Under IEEE 802.3 standards, UTP copper segments are strictly limited to 100 meters (328 ft).",
    "hint": "100 meters."
  },
  {
    "id": 8,
    "question": "Which modular connector is standard for terminating Ethernet twisted pair cables?",
    "options": [
      "RJ-11",
      "RJ-45",
      "BNC",
      "F-type"
    ],
    "correctAnswer": 1,
    "answer": "RJ-45",
    "explanation": "RJ-45 is the standard 8-pin modular connector for UTP/STP Ethernet patch cables.",
    "hint": "8-pin jack."
  },
  {
    "id": 9,
    "question": "What is the characteristic impedance of standard baseband RG-58 coaxial cable used in 10BASE2 networks?",
    "options": [
      "25 Ohms",
      "50 Ohms",
      "75 Ohms",
      "100 Ohms"
    ],
    "correctAnswer": 1,
    "answer": "50 Ohms",
    "explanation": "Baseband RG-58 Thinnet coaxial cable has a characteristic impedance of 50 Ohms.",
    "hint": "Baseband digital coax is 50 Ohms."
  },
  {
    "id": 10,
    "question": "Why must a 50-Ohm terminator be connected at both ends of a coaxial bus network segment?",
    "options": [
      "To provide direct current power",
      "To absorb electrical signals and prevent reflections (ghosts) from bouncing back and corrupting packets",
      "To turn the bus into a ring topology",
      "To convert baseband to broadband"
    ],
    "correctAnswer": 1,
    "answer": "To absorb electrical signals and prevent reflections (ghosts) from bouncing back and corrupting packets",
    "explanation": "Without a matched terminating resistor, signals reflect off open cable ends and collide with active transmissions.",
    "hint": "Terminators absorb energy to eliminate reflections."
  },
  {
    "id": 11,
    "question": "What optical phenomenon allows light pulses to travel inside an optical fiber without escaping through the cladding?",
    "options": [
      "Total Internal Reflection",
      "Refraction",
      "Diffraction",
      "Polarization"
    ],
    "correctAnswer": 0,
    "answer": "Total Internal Reflection",
    "explanation": "Total Internal Reflection confines light inside the core when angle of incidence exceeds critical angle.",
    "hint": "Total Internal Reflection."
  },
  {
    "id": 12,
    "question": "For Total Internal Reflection to occur in optical fiber, which condition must hold true regarding refractive indices?",
    "options": [
      "n_core > n_cladding",
      "n_cladding > n_core",
      "n_core == n_cladding",
      "Refractive index does not matter"
    ],
    "correctAnswer": 0,
    "answer": "n_core > n_cladding",
    "explanation": "Light must travel from an optically denser medium (core) towards a rarer medium (cladding): n1 > n2.",
    "hint": "Core refractive index must be greater."
  },
  {
    "id": 13,
    "question": "Which type of optical fiber uses a laser diode and an ultra-thin 9 µm core to travel 40-100+ km without repeaters?",
    "options": [
      "Single-Mode Fiber (SMF)",
      "Multi-Mode Fiber (MMF)",
      "Step-Index MMF",
      "Plastic Optical Fiber"
    ],
    "correctAnswer": 0,
    "answer": "Single-Mode Fiber (SMF)",
    "explanation": "Single-Mode Fiber has a tiny core allowing only one light path, eliminating modal dispersion.",
    "hint": "Single light path."
  },
  {
    "id": 14,
    "question": "Why is optical fiber completely immune to electromagnetic interference (EMI)?",
    "options": [
      "Because it is wrapped in thick lead foil",
      "Because it transmits light pulses through non-conductive dielectric glass rather than electrical currents",
      "Because it operates at very high voltage",
      "Because it only works at night"
    ],
    "correctAnswer": 1,
    "answer": "Because it transmits light pulses through non-conductive dielectric glass rather than electrical currents",
    "explanation": "Photons traveling through non-conductive dielectric glass have zero interaction with magnetic and electric fields.",
    "hint": "Light traveling through dielectric glass."
  },
  {
    "id": 15,
    "question": "What is the official frequency range associated with Radio Waves under the CBSE syllabus?",
    "options": [
      "3 kHz to 1 GHz",
      "1 GHz to 300 GHz",
      "300 GHz to 400 THz",
      "400 THz to 750 THz"
    ],
    "correctAnswer": 0,
    "answer": "3 kHz to 1 GHz",
    "explanation": "Radio Waves occupy the electromagnetic spectrum between 3 kHz and 1 GHz.",
    "hint": "3 kHz to 1 GHz."
  },
  {
    "id": 16,
    "question": "Why do radio waves easily penetrate solid walls and provide coverage inside buildings?",
    "options": [
      "They have long wavelengths that pass through solid barriers",
      "They carry high voltage",
      "They turn walls into conductors",
      "They reflect off windows"
    ],
    "correctAnswer": 0,
    "answer": "They have long wavelengths that pass through solid barriers",
    "explanation": "Longer electromagnetic wavelengths allow radio waves to diffract and penetrate architectural obstacles.",
    "hint": "Long wavelength enables obstacle penetration."
  },
  {
    "id": 17,
    "question": "What is the primary difference in propagation between Radio Waves and Microwaves?",
    "options": [
      "Radio waves are omnidirectional; Microwaves are unidirectional and require sharp line-of-sight alignment",
      "Radio waves are faster than the speed of light",
      "Microwaves travel through copper only",
      "Radio waves require dishes while microwaves use wires"
    ],
    "correctAnswer": 0,
    "answer": "Radio waves are omnidirectional; Microwaves are unidirectional and require sharp line-of-sight alignment",
    "explanation": "Radio waves radiate in all directions, whereas microwaves are focused into narrow line-of-sight beams.",
    "hint": "Omnidirectional vs unidirectional focused beam."
  },
  {
    "id": 18,
    "question": "Why do terrestrial microwave systems place repeater towers every 40 to 50 km?",
    "options": [
      "Because Earth's curvature obstructs the straight line of sight",
      "Because microwave antennas overheat after 50 km",
      "Because towers run out of electricity",
      "Because the frequency changes after 50 km"
    ],
    "correctAnswer": 0,
    "answer": "Because Earth's curvature obstructs the straight line of sight",
    "explanation": "Microwaves travel in straight lines; beyond 40-50 km, the curvature of the Earth blocks the line of sight.",
    "hint": "Earth's curvature intervenes."
  },
  {
    "id": 19,
    "question": "Which unguided medium is completely blocked by opaque solid walls, confining signals to a single room?",
    "options": [
      "Infrared",
      "Radio Waves",
      "Satellite Downlink",
      "Low-frequency AM"
    ],
    "correctAnswer": 0,
    "answer": "Infrared",
    "explanation": "Infrared optical waves cannot penetrate opaque solid walls or doors.",
    "hint": "Optical wavelength blocked by walls."
  },
  {
    "id": 20,
    "question": "At what approximate altitude above the equator do Geostationary (GEO) communication satellites orbit?",
    "options": [
      "35,786 km (~36,000 km)",
      "500 km",
      "2,000 km",
      "100,000 km"
    ],
    "correctAnswer": 0,
    "answer": "35,786 km (~36,000 km)",
    "explanation": "GEO satellites orbit at 35,786 km, completing one revolution every 24 hours.",
    "hint": "36,000 km."
  },
  {
    "id": 21,
    "question": "Why are Uplink and Downlink frequencies different in satellite communication?",
    "options": [
      "To prevent self-interference and feedback between the satellite's receiver and transmitter",
      "Because higher frequencies only travel upwards",
      "To save solar power",
      "Because international law forbids identical frequencies"
    ],
    "correctAnswer": 0,
    "answer": "To prevent self-interference and feedback between the satellite's receiver and transmitter",
    "explanation": "Frequency offset prevents the high-power downlink signal from blinding the sensitive uplink receiver.",
    "hint": "Prevents transmitter feedback into receiver."
  },
  {
    "id": 22,
    "question": "What is the typical round-trip propagation latency of a Geostationary satellite link?",
    "options": [
      "Approx. 250 - 500 milliseconds",
      "1 millisecond",
      "5 seconds",
      "1 minute"
    ],
    "correctAnswer": 0,
    "answer": "Approx. 250 - 500 milliseconds",
    "explanation": "Traveling 72,000+ km at the speed of light causes roughly 250-500 ms round-trip delay.",
    "hint": "Half a second."
  },
  {
    "id": 23,
    "question": "In a CBSE Case Study: Block A and Block B are separated by 75 meters on a tight budget. What should be recommended?",
    "options": [
      "Cat-6 UTP Cable with RJ-45",
      "Single-Mode Optical Fiber",
      "Satellite Link",
      "Microwave Tower"
    ],
    "correctAnswer": 0,
    "answer": "Cat-6 UTP Cable with RJ-45",
    "explanation": "75 meters is well within the 100m UTP segment limit and meets the low-cost constraint.",
    "hint": "Under 100m with low cost."
  },
  {
    "id": 24,
    "question": "In a CBSE Case Study: Main office and Research Lab are 2.5 km apart across a large university campus with high speed needs. What should be recommended?",
    "options": [
      "Optical Fiber Cable",
      "Cat-6 UTP Cable",
      "Infrared line of sight",
      "Coaxial 10BASE2"
    ],
    "correctAnswer": 0,
    "answer": "Optical Fiber Cable",
    "explanation": "2.5 km exceeds copper reach; optical fiber provides multi-gigabit speeds and low attenuation.",
    "hint": "2.5 km high-speed campus link."
  },
  {
    "id": 25,
    "question": "In a CBSE Case Study: An isolated branch in a remote Himalayan mountain valley has no telephone lines or cellular towers. What medium should be chosen?",
    "options": [
      "Satellite Communication Link (VSAT)",
      "Cat-6 UTP Cable",
      "Coaxial Cable",
      "Infrared Link"
    ],
    "correctAnswer": 0,
    "answer": "Satellite Communication Link (VSAT)",
    "explanation": "Satellite provides ubiquitous coverage across inaccessible mountainous regions lacking terrestrial infrastructure.",
    "hint": "Remote mountain valley with no wired/cellular infrastructure."
  }
];

export default questions;
