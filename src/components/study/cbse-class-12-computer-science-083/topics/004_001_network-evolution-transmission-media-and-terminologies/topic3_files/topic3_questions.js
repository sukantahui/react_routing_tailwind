// 25 Authentic CBSE Board Examination Questions for Topic 3
const questions = [
  {
    "id": 1,
    "question": "In which transmission mode can data travel in only one predetermined direction?",
    "options": [
      "Simplex",
      "Half-Duplex",
      "Full-Duplex",
      "Multiplex"
    ],
    "correctAnswer": 0,
    "explanation": "Simplex mode is strictly unidirectional (Sender -> Receiver).",
    "hint": "Simplex."
  },
  {
    "id": 2,
    "question": "In which transmission mode can data travel in both directions, but only in one direction at any given time?",
    "options": [
      "Simplex",
      "Half-Duplex",
      "Full-Duplex",
      "Broadcast"
    ],
    "correctAnswer": 1,
    "explanation": "Half-Duplex allows bidirectional communication, but only alternately (one party at a time).",
    "hint": "Half-Duplex."
  },
  {
    "id": 3,
    "question": "In which transmission mode can both communicating devices transmit and receive data simultaneously?",
    "options": [
      "Simplex",
      "Half-Duplex",
      "Full-Duplex",
      "Serial"
    ],
    "correctAnswer": 2,
    "explanation": "Full-Duplex allows concurrent bidirectional transmission at the exact same moment.",
    "hint": "Full-Duplex."
  },
  {
    "id": 4,
    "question": "A Walkie-Talkie conversation where users say 'Over' before the other speaks is a classic example of:",
    "options": [
      "Simplex Mode",
      "Half-Duplex Mode",
      "Full-Duplex Mode",
      "Asynchronous Mode"
    ],
    "correctAnswer": 1,
    "explanation": "Walkie-talkies use Half-Duplex because only one person can transmit while holding the talk button.",
    "hint": "Half-Duplex Mode."
  },
  {
    "id": 5,
    "question": "A standard telephone or smartphone conversation is an example of which transmission mode?",
    "options": [
      "Simplex Mode",
      "Half-Duplex Mode",
      "Full-Duplex Mode",
      "Reverse Simplex"
    ],
    "correctAnswer": 2,
    "explanation": "Telephone calls are Full-Duplex because both parties can talk and listen simultaneously.",
    "hint": "Full-Duplex Mode."
  },
  {
    "id": 6,
    "question": "Data transmission from a computer keyboard to the CPU is an example of:",
    "options": [
      "Simplex Mode",
      "Half-Duplex Mode",
      "Full-Duplex Mode",
      "Multiplexing"
    ],
    "correctAnswer": 0,
    "explanation": "A keyboard only sends keystrokes into the CPU; it cannot receive display data back, making it Simplex.",
    "hint": "Simplex Mode."
  },
  {
    "id": 7,
    "question": "Commercial FM radio and television broadcasting operate in which transmission mode?",
    "options": [
      "Simplex Mode",
      "Half-Duplex Mode",
      "Full-Duplex Mode",
      "Interactive Mode"
    ],
    "correctAnswer": 0,
    "explanation": "Broadcasting transmits from the station antenna to home TVs/radios with zero reverse signal, which is Simplex.",
    "hint": "Simplex Mode."
  },
  {
    "id": 8,
    "question": "Which transmission mode utilizes 100% of the channel capacity dedicated in one single direction permanently?",
    "options": [
      "Simplex Mode",
      "Half-Duplex Mode",
      "Full-Duplex Mode",
      "Dual Mode"
    ],
    "correctAnswer": 0,
    "explanation": "In Simplex mode, the entire channel bandwidth is permanently dedicated to one-way transmission.",
    "hint": "Simplex Mode."
  },
  {
    "id": 9,
    "question": "A computer monitor receiving video output from a desktop graphics card is operating in:",
    "options": [
      "Simplex Mode",
      "Half-Duplex Mode",
      "Full-Duplex Mode",
      "Echo Mode"
    ],
    "correctAnswer": 0,
    "explanation": "Video signals travel unidirectionally from the graphics card to the screen panel (Simplex).",
    "hint": "Simplex Mode."
  },
  {
    "id": 10,
    "question": "A single-lane railway bridge where trains can travel in both directions, but only one train can cross at a time, is an analogy for:",
    "options": [
      "Simplex Mode",
      "Half-Duplex Mode",
      "Full-Duplex Mode",
      "Tunnel Mode"
    ],
    "correctAnswer": 1,
    "explanation": "A single-lane bridge supports both directions alternately, which is the definition of Half-Duplex.",
    "hint": "Half-Duplex Mode."
  },
  {
    "id": 11,
    "question": "A two-lane highway where vehicles travel in both opposite directions at the exact same time is an analogy for:",
    "options": [
      "Simplex Mode",
      "Half-Duplex Mode",
      "Full-Duplex Mode",
      "Static Mode"
    ],
    "correctAnswer": 2,
    "explanation": "A two-lane road allows simultaneous two-way traffic, mirroring Full-Duplex.",
    "hint": "Full-Duplex Mode."
  },
  {
    "id": 12,
    "question": "A one-way street where cars can only drive in one legal direction is an analogy for:",
    "options": [
      "Simplex Mode",
      "Half-Duplex Mode",
      "Full-Duplex Mode",
      "Crossroad Mode"
    ],
    "correctAnswer": 0,
    "explanation": "A one-way street permits traffic in only one direction, identical to Simplex mode.",
    "hint": "Simplex Mode."
  },
  {
    "id": 13,
    "question": "What happens if both users try to speak simultaneously on a Half-Duplex walkie-talkie channel?",
    "options": [
      "Signals collide, causing garbled interference, and neither message is understood",
      "Both voices are clearly heard",
      "The battery doubles",
      "The channel converts to full-duplex"
    ],
    "correctAnswer": 0,
    "explanation": "Simultaneous transmission in half-duplex causes signal collision and garbled transmission.",
    "hint": "Signal collision / interference."
  },
  {
    "id": 14,
    "question": "Modern switched Gigabit Ethernet connections operate in which mode?",
    "options": [
      "Simplex",
      "Half-Duplex only",
      "Full-Duplex (using separate transmit and receive wire pairs)",
      "Infrared"
    ],
    "correctAnswer": 2,
    "explanation": "Modern Gigabit Ethernet uses dedicated wire pairs for simultaneous transmit and receive (Full-Duplex).",
    "hint": "Full-Duplex."
  },
  {
    "id": 15,
    "question": "In early legacy shared-bus Ethernet networks using hubs, what transmission mode was enforced by CSMA/CD?",
    "options": [
      "Full-Duplex",
      "Half-Duplex (nodes shared one collision domain)",
      "Simplex",
      "Optical"
    ],
    "correctAnswer": 1,
    "explanation": "Shared coaxial and hub Ethernet operated in half-duplex with CSMA/CD collision detection.",
    "hint": "Half-Duplex."
  },
  {
    "id": 16,
    "question": "Why do aviation pilots use the word 'OVER' at the end of radio transmissions?",
    "options": [
      "To signify that they have finished transmitting and are releasing the Half-Duplex channel for the other party",
      "To check altimeter",
      "To change frequency",
      "Because it is required by English grammar"
    ],
    "correctAnswer": 0,
    "explanation": "'Over' signals channel release in half-duplex radio protocol.",
    "hint": "Signifies channel release."
  },
  {
    "id": 17,
    "question": "Can an optical fiber cable support Full-Duplex communications?",
    "options": [
      "No, optical fibers only support simplex light",
      "Yes, either by using dual fiber strands (one transmit, one receive) or bidirectional wavelength division multiplexing (WDM)",
      "Only in winter",
      "Only under 1 meter"
    ],
    "correctAnswer": 1,
    "explanation": "Full-duplex fiber uses two fiber strands or distinct light wavelengths on a single strand.",
    "hint": "Yes, using dual strands or distinct wavelengths."
  },
  {
    "id": 18,
    "question": "Which of the following devices is strictly a Simplex receiver in a home?",
    "options": [
      "A wireless FM radio receiver",
      "A home Wi-Fi router",
      "A smartphone",
      "A laptop computer"
    ],
    "correctAnswer": 0,
    "explanation": "An FM radio receiver can only receive broadcast audio signals; it has no transmitter hardware.",
    "hint": "Wireless FM radio receiver."
  },
  {
    "id": 19,
    "question": "What is the primary operational advantage of Full-Duplex over Half-Duplex?",
    "options": [
      "Requires no cables",
      "Doubles potential throughput efficiency by eliminating waiting turns and turnaround delay",
      "Free internet",
      "Zero electricity used"
    ],
    "correctAnswer": 1,
    "explanation": "Full-duplex eliminates channel turnaround lag and allows simultaneous bidirectional data exchange.",
    "hint": "Eliminates waiting turns and doubles throughput."
  },
  {
    "id": 20,
    "question": "In CBSE board examination questions, how is the difference between Simplex, Half-Duplex, and Full-Duplex typically tested?",
    "options": [
      "As a 2-mark or 3-mark conceptual question asking for definitions and real-world examples of each",
      "As a 50-mark essay",
      "Only in lab practicals",
      "By asking students to solder a wire"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE exams routinely ask students to define the three modes and provide authentic real-world examples.",
    "hint": "2 to 3 marks definition & examples."
  },
  {
    "id": 21,
    "question": "Consider: Satellite GPS receiver in a car receiving geolocation signals from GPS satellites. What mode is this?",
    "options": [
      "Simplex Mode",
      "Half-Duplex Mode",
      "Full-Duplex Mode",
      "Bi-directional"
    ],
    "correctAnswer": 0,
    "explanation": "GPS satellites broadcast timing signals down to Earth; car GPS units are receive-only (Simplex).",
    "hint": "Simplex Mode."
  },
  {
    "id": 22,
    "question": "What is 'Turnaround Time' in Half-Duplex communications?",
    "options": [
      "The time required to reverse the direction of transmission along the channel (switching from receive to transmit)",
      "The time to spin a hard disk",
      "The time to charge a battery",
      "The time to print a document"
    ],
    "correctAnswer": 0,
    "explanation": "Turnaround time is the hardware delay required to switch a transceiver from receiving mode to transmitting mode.",
    "hint": "Time to reverse transmission direction."
  },
  {
    "id": 23,
    "question": "Which transmission mode requires the least complex circuitry at the receiver end?",
    "options": [
      "Simplex (no transmitter needed at receiver)",
      "Half-Duplex",
      "Full-Duplex",
      "Frequency division"
    ],
    "correctAnswer": 0,
    "explanation": "Simplex receivers need zero transmission circuitry, making them simple and inexpensive.",
    "hint": "Simplex."
  },
  {
    "id": 24,
    "question": "Can Full-Duplex be achieved over a single physical wire?",
    "options": [
      "No, impossible",
      "Yes, by dividing the bandwidth into two separate frequency bands (Frequency Division Duplexing - FDD)",
      "Only if wire is cooled to absolute zero",
      "Only with copper"
    ],
    "correctAnswer": 1,
    "explanation": "FDD divides a single medium into distinct upstream and downstream frequency channels.",
    "hint": "Yes, using Frequency Division Duplexing (FDD)."
  },
  {
    "id": 25,
    "question": "Which of the following pairings correctly matches the device to its transmission mode?",
    "options": [
      "FM Radio -> Simplex; Walkie-Talkie -> Half-Duplex; Smartphone -> Full-Duplex",
      "FM Radio -> Full-Duplex; Walkie-Talkie -> Simplex",
      "Keyboard -> Full-Duplex; Telephone -> Simplex",
      "Monitor -> Half-Duplex"
    ],
    "correctAnswer": 0,
    "explanation": "FM Radio is Simplex, Walkie-Talkie is Half-Duplex, and Smartphone is Full-Duplex.",
    "hint": "Radio: Simplex, Walkie-Talkie: Half-Duplex, Phone: Full-Duplex."
  }
];

export default questions;
