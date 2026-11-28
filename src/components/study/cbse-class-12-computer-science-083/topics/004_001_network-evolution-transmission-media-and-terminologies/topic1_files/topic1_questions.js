// 25 Authentic CBSE Board Examination Questions for Topic 1
const questions = [
  {
    "id": 1,
    "question": "How many fundamental components constitute a Data Communication System?",
    "options": [
      "2",
      "3",
      "5",
      "7"
    ],
    "correctAnswer": 2,
    "explanation": "A data communication system has exactly 5 fundamental components: Sender, Receiver, Message, Medium, and Protocol.",
    "hint": "5 components."
  },
  {
    "id": 2,
    "question": "Which component of a data communication system is defined as the set of rules governing data transmission?",
    "options": [
      "Message",
      "Protocol",
      "Medium",
      "Sender"
    ],
    "correctAnswer": 1,
    "explanation": "A Protocol is a mutually agreed-upon set of rules and conventions that govern data communications.",
    "hint": "Protocol."
  },
  {
    "id": 3,
    "question": "What is the device that originates and transmits the data message called?",
    "options": [
      "Sink",
      "Receiver",
      "Sender (or Source)",
      "Channel"
    ],
    "correctAnswer": 2,
    "explanation": "The Sender (Source/Transmitter) is the device that creates and sends the data message.",
    "hint": "Sender (or Source)."
  },
  {
    "id": 4,
    "question": "What is the device that accepts and receives the incoming message called?",
    "options": [
      "Sender",
      "Receiver (or Sink)",
      "Protocol",
      "Modem"
    ],
    "correctAnswer": 1,
    "explanation": "The Receiver (Sink/Destination) is the device that receives the transmitted message.",
    "hint": "Receiver (or Sink)."
  },
  {
    "id": 5,
    "question": "What is the physical pathway over which data travels from sender to receiver called?",
    "options": [
      "Protocol",
      "Transmission Medium (Communication Channel)",
      "Message",
      "Socket"
    ],
    "correctAnswer": 1,
    "explanation": "The Transmission Medium (wired cable or wireless air space) provides the physical path.",
    "hint": "Transmission Medium."
  },
  {
    "id": 6,
    "question": "What is the actual data payload or information being communicated (text, sound, video) called?",
    "options": [
      "Medium",
      "Message",
      "Carrier",
      "Protocol"
    ],
    "correctAnswer": 1,
    "explanation": "The Message is the information or payload to be transmitted.",
    "hint": "Message."
  },
  {
    "id": 7,
    "question": "What happens if two computers are connected via a high-speed fiber cable but have no shared communication protocol?",
    "options": [
      "Data transfers at double speed",
      "They cannot understand or interpret each other's signals, preventing communication",
      "The cable melts",
      "They automatically switch to WiFi"
    ],
    "correctAnswer": 1,
    "explanation": "Without a common protocol, devices cannot agree on packet formatting, syntax, or error control.",
    "hint": "Cannot interpret each other's signals."
  },
  {
    "id": 8,
    "question": "Which of the following is an example of a Guided (Wired) transmission medium?",
    "options": [
      "Radio waves",
      "Fiber Optic Cable",
      "Satellite",
      "Infrared"
    ],
    "correctAnswer": 1,
    "explanation": "Fiber Optic Cable physically confines and guides light signals through a glass core.",
    "hint": "Fiber Optic Cable."
  },
  {
    "id": 9,
    "question": "Which of the following is an example of an Unguided (Wireless) transmission medium?",
    "options": [
      "Coaxial Cable",
      "Twisted Pair Cable",
      "Microwave radiation through atmosphere",
      "Shielded Twisted Pair"
    ],
    "correctAnswer": 2,
    "explanation": "Microwaves propagate wirelessly through open atmospheric air without physical conduits.",
    "hint": "Microwave."
  },
  {
    "id": 10,
    "question": "Which performance metric requires that data must be delivered to the receiver without bit corruption?",
    "options": [
      "Accuracy",
      "Jitter",
      "Timeliness",
      "Bandwidth"
    ],
    "correctAnswer": 0,
    "explanation": "Accuracy guarantees that data received matches data sent without alteration or corruption.",
    "hint": "Accuracy."
  },
  {
    "id": 11,
    "question": "What does the term 'Jitter' refer to in real-time multimedia packet transmission?",
    "options": [
      "The color of the cable",
      "Uneven packet arrival delay variation causing stutter in audio/video streams",
      "The total number of routers",
      "Password length"
    ],
    "correctAnswer": 1,
    "explanation": "Jitter is the variation in packet transit delay, which causes choppy audio/video if high.",
    "hint": "Uneven packet arrival delay variation."
  },
  {
    "id": 12,
    "question": "Which metric is critical for real-time video conferencing where delayed packets are useless?",
    "options": [
      "Timeliness",
      "Storage capacity",
      "Hard drive sector size",
      "Monitor resolution"
    ],
    "correctAnswer": 0,
    "explanation": "Timeliness ensures data arrives on time for real-time interactive playback.",
    "hint": "Timeliness."
  },
  {
    "id": 13,
    "question": "Which component represents the 'language' or 'rules of engagement' in human communication analogy?",
    "options": [
      "The air (medium)",
      "The vocal cords (sender)",
      "The agreed spoken language / grammar (protocol)",
      "The ears (receiver)"
    ],
    "correctAnswer": 2,
    "explanation": "Spoken language and grammar rules act as the human equivalent of a network protocol.",
    "hint": "Agreed spoken language / grammar."
  },
  {
    "id": 14,
    "question": "Can a network device act as both a Sender and a Receiver in a communication system?",
    "options": [
      "No, hardware can only send or only receive",
      "Yes, most modern network devices (e.g. smartphones, computers) are transceivers capable of both sending and receiving",
      "Only if connected to a satellite",
      "Only in analog systems"
    ],
    "correctAnswer": 1,
    "explanation": "Most computing nodes function as transceivers, sending requests and receiving responses.",
    "hint": "Yes, acting as transceivers."
  },
  {
    "id": 15,
    "question": "What is the primary role of an error-checking Checksum added to a message by a protocol?",
    "options": [
      "Encrypts the sender's password",
      "Enables the receiver to detect if bits were corrupted during transit across the medium",
      "Increases audio volume",
      "Changes file extension"
    ],
    "correctAnswer": 1,
    "explanation": "Checksums provide algorithmic verification of data integrity.",
    "hint": "Detects if bits were corrupted during transit."
  },
  {
    "id": 16,
    "question": "Which of the following is NOT a network protocol?",
    "options": [
      "HTTP",
      "TCP",
      "Cat-6 Ethernet Cable",
      "SMTP"
    ],
    "correctAnswer": 2,
    "explanation": "Cat-6 is a physical transmission medium (cable), not a protocol software rule.",
    "hint": "Cat-6 is a physical cable."
  },
  {
    "id": 17,
    "question": "What does HTTP stand for in computer networking?",
    "options": [
      "HyperText Transfer Protocol",
      "High Traffic Telecommunication Path",
      "Hyper Transmission Terminal Port",
      "Home Telephony Transfer Packet"
    ],
    "correctAnswer": 0,
    "explanation": "HTTP stands for HyperText Transfer Protocol.",
    "hint": "HyperText Transfer Protocol."
  },
  {
    "id": 18,
    "question": "What does FTP stand for?",
    "options": [
      "Fast Telecom Protocol",
      "File Transfer Protocol",
      "Frequency Terminal Port",
      "Fiber Transmission Path"
    ],
    "correctAnswer": 1,
    "explanation": "FTP stands for File Transfer Protocol.",
    "hint": "File Transfer Protocol."
  },
  {
    "id": 19,
    "question": "What does SMTP stand for?",
    "options": [
      "Simple Mail Transfer Protocol",
      "Single Mode Terminal Packet",
      "Synchronous Media Transmission Path",
      "Secure Modern Telephone Protocol"
    ],
    "correctAnswer": 0,
    "explanation": "SMTP stands for Simple Mail Transfer Protocol.",
    "hint": "Simple Mail Transfer Protocol."
  },
  {
    "id": 20,
    "question": "In the client-server model for web browsing, which device acts as the Sender when requesting a webpage?",
    "options": [
      "The Web Browser (Client)",
      "The Web Server",
      "The DNS root server",
      "The ISP router"
    ],
    "correctAnswer": 0,
    "explanation": "The client browser sends the HTTP GET request message to the server.",
    "hint": "The Web Browser (Client)."
  },
  {
    "id": 21,
    "question": "In the client-server model, what role does the Web Server play when returning the HTML page?",
    "options": [
      "It acts as the Sender delivering the response message",
      "It becomes a passive medium",
      "It acts as a router only",
      "It becomes an unguided signal"
    ],
    "correctAnswer": 0,
    "explanation": "The server acts as the sender transmitting the response message back to the client receiver.",
    "hint": "Sender delivering the response message."
  },
  {
    "id": 22,
    "question": "What physical phenomenon carries messages across an unguided wireless medium?",
    "options": [
      "Electromagnetic waves propagating through air or space",
      "Water pipes",
      "Paper mail",
      "Punched paper tapes"
    ],
    "correctAnswer": 0,
    "explanation": "Wireless signals travel as electromagnetic waves through the atmosphere.",
    "hint": "Electromagnetic waves."
  },
  {
    "id": 23,
    "question": "What physical phenomenon carries messages across an optical fiber cable?",
    "options": [
      "Electric voltage pulses",
      "Light pulses traveling via Total Internal Reflection",
      "Sound waves",
      "Magnetic field lines"
    ],
    "correctAnswer": 1,
    "explanation": "Optical fibers transmit digital data as pulses of light.",
    "hint": "Light pulses via Total Internal Reflection."
  },
  {
    "id": 24,
    "question": "In a CBSE 2-mark question: 'Name the five components of data communication', which list scores full marks?",
    "options": [
      "Sender, Receiver, Message, Transmission Medium, Protocol",
      "CPU, RAM, Hard Disk, Monitor, Keyboard",
      "LAN, MAN, WAN, PAN, Internet",
      "Router, Switch, Hub, Bridge, Gateway"
    ],
    "correctAnswer": 0,
    "explanation": "Sender, Receiver, Message, Medium, Protocol is the exact, canonical list.",
    "hint": "Sender, Receiver, Message, Medium, Protocol."
  },
  {
    "id": 25,
    "question": "What happens if a message exceeds the maximum transmission unit (MTU) of the communication channel?",
    "options": [
      "It is permanently deleted",
      "The protocol splits it into smaller fragments/packets and reassembles them at the receiver",
      "The cable breaks",
      "The computer restarts"
    ],
    "correctAnswer": 1,
    "explanation": "Network protocols perform packet segmentation and reassembly to respect MTU constraints.",
    "hint": "Splits into packets and reassembles."
  }
];

export default questions;
