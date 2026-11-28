// 25 Authentic CBSE Board Examination Questions for Topic 7
const questions = [
  {
    "id": 1,
    "question": "What is the defining capability that distinguishes a Gateway from a Router?",
    "options": [
      "A Gateway translates between completely dissimilar network architectures using different communication protocols, whereas a Router connects networks using the same protocol",
      "A Gateway is wireless while a Router is wired",
      "A Gateway has no electrical power",
      "A Gateway cannot connect to the internet"
    ],
    "answer": "A Gateway translates between completely dissimilar network architectures using different communication protocols, whereas a Router connects networks using the same protocol",
    "explanation": "Gateways perform full protocol translation across dissimilar network protocol architectures.",
    "hint": "Translates between completely dissimilar protocols."
  },
  {
    "id": 2,
    "question": "At which layers of the OSI model can a Network Gateway operate?",
    "options": [
      "Physical Layer only",
      "Data Link Layer only",
      "Network Layer only",
      "All layers of the OSI model, from Physical up to Application Layer (Layers 1 through 7)"
    ],
    "answer": "All layers of the OSI model, from Physical up to Application Layer (Layers 1 through 7)",
    "explanation": "Because it converts data formats, sessions, and transport protocols, a gateway operates across all 7 OSI layers.",
    "hint": "Operates across all 7 OSI layers."
  },
  {
    "id": 3,
    "question": "Which of the following devices is an example of a Gateway performing protocol conversion?",
    "options": [
      "VoIP Gateway converting digital SIP voice packets to analog PSTN telephone signals",
      "Unshielded Twisted Pair cable",
      "RJ-45 modular plug",
      "Passive Hub"
    ],
    "answer": "VoIP Gateway converting digital SIP voice packets to analog PSTN telephone signals",
    "explanation": "A VoIP gateway bridges two completely different telecom architectures: packet-switched IP and circuit-switched PSTN.",
    "hint": "Bridges IP telephony to landline telephones."
  },
  {
    "id": 4,
    "question": "What is an 'Email Gateway'?",
    "options": [
      "A device that prints emails on paper",
      "A server that translates emails between incompatible messaging formats (e.g. SMTP to proprietary corporate systems)",
      "An email client like Outlook",
      "A spam folder"
    ],
    "answer": "A server that translates emails between incompatible messaging formats (e.g. SMTP to proprietary corporate systems)",
    "explanation": "An email gateway translates messages, character sets, and formats between different mail systems.",
    "hint": "Translates emails between incompatible formats."
  },
  {
    "id": 5,
    "question": "What is a 'Payment Gateway' used in e-commerce websites?",
    "options": [
      "A physical door at the bank",
      "A software service that securely encrypts, authorizes, and translates credit card payment data between a merchant website and a banking network",
      "A cash register",
      "A discount coupon code"
    ],
    "answer": "A software service that securely encrypts, authorizes, and translates credit card payment data between a merchant website and a banking network",
    "explanation": "A payment gateway handles encryption, authentication, and protocol conversion between web applications and financial networks.",
    "hint": "Authorizes and translates online payments."
  },
  {
    "id": 6,
    "question": "Can a Gateway be implemented as software running on a server rather than a standalone hardware box?",
    "options": [
      "Yes, gateways can be implemented in software, hardware, or a combination of both",
      "No, gateways can only be made of physical copper wires",
      "No, software cannot translate protocols",
      "Only on Linux computers"
    ],
    "answer": "Yes, gateways can be implemented in software, hardware, or a combination of both",
    "explanation": "Many gateways (e.g. API gateways, payment gateways, proxy gateways) run entirely as software services on standard servers.",
    "hint": "Can be software, hardware, or hybrid."
  },
  {
    "id": 7,
    "question": "What is an 'API Gateway' in modern web microservices architecture?",
    "options": [
      "A physical wall around the server room",
      "A server that acts as a single entry point for API requests, routing and translating external HTTP calls into internal microservice protocols",
      "A tool used to write Python code",
      "A computer screen"
    ],
    "answer": "A server that acts as a single entry point for API requests, routing and translating external HTTP calls into internal microservice protocols",
    "explanation": "An API gateway handles request routing, composition, authentication, and protocol translation for backend microservices.",
    "hint": "Single entry point translating API requests."
  },
  {
    "id": 8,
    "question": "Why does a gateway introduce higher processing latency compared to a switch or repeater?",
    "options": [
      "Because gateways are older devices",
      "Because a gateway must unpack, parse, translate, and repackage data across all upper layers (Layers 4-7)",
      "Because electricity travels slower in gateways",
      "Because gateways run on low battery"
    ],
    "answer": "Because a gateway must unpack, parse, translate, and repackage data across all upper layers (Layers 4-7)",
    "explanation": "Translating data structures and protocol headers across the entire stack requires significant CPU cycles, introducing latency.",
    "hint": "Full-stack translation takes more CPU processing time."
  },
  {
    "id": 9,
    "question": "What is a 'Cellular SMS Gateway'?",
    "options": [
      "A device that sends letters in the mail",
      "A service that translates internet-based messages (like HTTP/SMTP) into SMS text messages delivered over cellular telecommunication networks",
      "A mobile phone charger",
      "A SIM card slot"
    ],
    "answer": "A service that translates internet-based messages (like HTTP/SMTP) into SMS text messages delivered over cellular telecommunication networks",
    "explanation": "An SMS gateway bridges web servers to mobile telecom networks (SMPP protocol) to deliver automated SMS texts (e.g. OTPs).",
    "hint": "Converts internet messages into cellular SMS."
  },
  {
    "id": 10,
    "question": "How does a gateway handle the data payload of a packet compared to a standard router?",
    "options": [
      "A router passes payload unchanged; a gateway often translates and reformats the internal payload to match the destination architecture",
      "A gateway deletes the payload",
      "A router encrypts the payload while a gateway decrypts it",
      "Both handle the payload identically"
    ],
    "answer": "A router passes payload unchanged; a gateway often translates and reformats the internal payload to match the destination architecture",
    "explanation": "Routers inspect only Layer-3 headers. Gateways inspect, translate, and convert the actual application payload.",
    "hint": "Gateways reformat the actual data payload."
  },
  {
    "id": 11,
    "question": "What is a 'Proxy Gateway' (Forward/Reverse Proxy)?",
    "options": [
      "A device that takes attendance in school",
      "An intermediary server that intercepts client requests, performs security checks, caching, and translates requests before forwarding to destination servers",
      "A fake computer",
      "A wireless antenna"
    ],
    "answer": "An intermediary server that intercepts client requests, performs security checks, caching, and translates requests before forwarding to destination servers",
    "explanation": "A proxy gateway acts on behalf of clients, translating, filtering, and caching web requests.",
    "hint": "Intermediary server providing caching and security."
  },
  {
    "id": 12,
    "question": "In a CBSE 2-mark question: 'Identify the device that connects two networks running fundamentally different protocols.' What is the answer?",
    "options": [
      "Gateway",
      "Router",
      "Switch",
      "Hub"
    ],
    "answer": "Gateway",
    "explanation": "A Gateway connects networks running fundamentally different protocols by translating between them.",
    "hint": "Protocol converter for fundamentally different protocols."
  },
  {
    "id": 13,
    "question": "Which device would be needed to connect a modern TCP/IP hospital network to an older legacy IBM mainframe running SNA (Systems Network Architecture)?",
    "options": [
      "SNA-to-IP Gateway",
      "Layer-2 Switch",
      "UTP Cat-5 cable",
      "RJ-45 Crimper"
    ],
    "answer": "SNA-to-IP Gateway",
    "explanation": "Connecting IBM SNA to TCP/IP requires a protocol gateway capable of translating between the two completely different architectures.",
    "hint": "Protocol gateway translating SNA to TCP/IP."
  },
  {
    "id": 14,
    "question": "What is the difference between a Default Gateway in computer IP settings and a true Protocol Gateway in network theory?",
    "options": [
      "In IP settings, the 'Default Gateway' is simply the local router's IP; in network theory, a true Gateway is a protocol converter between dissimilar architectures",
      "They are two completely different names for a mouse",
      "A protocol gateway does not use electricity",
      "Default gateway is only for laptops"
    ],
    "answer": "In IP settings, the 'Default Gateway' is simply the local router's IP; in network theory, a true Gateway is a protocol converter between dissimilar architectures",
    "explanation": "While operating systems label the local router as the 'Default Gateway', true network gateways perform full protocol translation.",
    "hint": "Local router IP vs architectural protocol converter."
  },
  {
    "id": 15,
    "question": "What is a 'WAP Gateway' (Wireless Application Protocol Gateway)?",
    "options": [
      "A device that converts mobile WAP/WML requests from early cell phones into standard HTTP/HTML web pages",
      "A Wi-Fi password generator",
      "A battery saver",
      "A brand of telephone"
    ],
    "answer": "A device that converts mobile WAP/WML requests from early cell phones into standard HTTP/HTML web pages",
    "explanation": "WAP gateways translated lightweight mobile WML requests into standard web HTTP requests for legacy mobile web access.",
    "hint": "Translates mobile WML to web HTTP."
  },
  {
    "id": 16,
    "question": "Can a Gateway perform data encryption and decryption during the translation process?",
    "options": [
      "Yes, gateways frequently decrypt incoming data from one security protocol and re-encrypt it using another protocol",
      "No, gateways are forbidden from encrypting data",
      "Only in banks",
      "Only on Tuesdays"
    ],
    "answer": "Yes, gateways frequently decrypt incoming data from one security protocol and re-encrypt it using another protocol",
    "explanation": "Gateways (such as SSL-offloading reverse proxies or payment gateways) routinely terminate encryption and re-encrypt.",
    "hint": "Gateways can terminate and re-encrypt traffic."
  },
  {
    "id": 17,
    "question": "Which of the following is NOT a function of a network gateway?",
    "options": [
      "Translating data formats between dissimilar protocol suites",
      "Providing a security checkpoint at a network boundary",
      "Connecting completely different network architectures",
      "Physically crimping copper wires into plastic plugs"
    ],
    "answer": "Physically crimping copper wires into plastic plugs",
    "explanation": "Crimping copper wires is a manual technician task performed with a crimping tool, not a functional role of a gateway.",
    "hint": "Crimping wires is a manual physical task."
  },
  {
    "id": 18,
    "question": "What layer of the OSI model does an Application Gateway operate at?",
    "options": [
      "Application Layer (Layer 7)",
      "Physical Layer (Layer 1)",
      "Data Link Layer (Layer 2)",
      "Hardware Layer"
    ],
    "answer": "Application Layer (Layer 7)",
    "explanation": "An Application Gateway operates at Layer 7, understanding application-level protocols like HTTP, FTP, or SIP.",
    "hint": "Layer 7: Application Layer."
  },
  {
    "id": 19,
    "question": "What is an 'IoT Gateway' (Internet of Things Gateway)?",
    "options": [
      "A device that bridges short-range IoT sensor protocols (Zigbee, Z-Wave, BLE) with the IP/Cloud internet network (MQTT, HTTPS)",
      "A refrigerator door",
      "A television screen",
      "A light bulb"
    ],
    "answer": "A device that bridges short-range IoT sensor protocols (Zigbee, Z-Wave, BLE) with the IP/Cloud internet network (MQTT, HTTPS)",
    "explanation": "IoT gateways translate low-power non-IP sensor protocols like Zigbee or Bluetooth into internet-routable IP packets.",
    "hint": "Bridges non-IP sensor protocols to cloud IP."
  },
  {
    "id": 20,
    "question": "Why cannot a simple Layer-2 switch perform the role of a Gateway?",
    "options": [
      "Because switches only work at Layer 2 (MAC addresses) and have no ability to read, interpret, or translate higher-layer protocols",
      "Because switches are too expensive",
      "Because switches have no memory",
      "Because switches only connect to printers"
    ],
    "answer": "Because switches only work at Layer 2 (MAC addresses) and have no ability to read, interpret, or translate higher-layer protocols",
    "explanation": "Switches are hardware devices operating at Layer 2; they cannot parse or convert higher-layer application or transport data.",
    "hint": "Switches only understand Layer 2 MAC addresses."
  },
  {
    "id": 21,
    "question": "What is a 'Media Gateway' in telecommunications?",
    "options": [
      "A device that plays movies",
      "A translation device that converts digital media streams between different telecommunication technologies (e.g. 2G/3G TDM voice to 4G VoLTE/IP)",
      "A digital camera",
      "A DVD player"
    ],
    "answer": "A translation device that converts digital media streams between different telecommunication technologies (e.g. 2G/3G TDM voice to 4G VoLTE/IP)",
    "explanation": "Media gateways translate audio, video, and multimedia streams between cellular and IP telecom networks.",
    "hint": "Converts audio/multimedia streams between telecom networks."
  },
  {
    "id": 22,
    "question": "True or False: A Gateway can connect a wired network to a wireless network.",
    "options": [
      "True",
      "False",
      "Only if the wires are optical fiber",
      "Only on Sundays"
    ],
    "answer": "True",
    "explanation": "Gateways (such as wireless gateways or IoT gateways) frequently bridge wired and wireless physical media and protocols.",
    "hint": "Gateways can bridge wired and wireless architectures."
  },
  {
    "id": 23,
    "question": "What is 'Protocol Translation Overhead'?",
    "options": [
      "The cost of buying a router",
      "The CPU processing time, memory allocation, and latency required to convert packet headers and payload between two protocol formats",
      "The weight of the gateway box",
      "The height of the ceiling"
    ],
    "answer": "The CPU processing time, memory allocation, and latency required to convert packet headers and payload between two protocol formats",
    "explanation": "Translating protocol stacks requires computational power and memory, creating processing overhead.",
    "hint": "Computational delay and resource consumption of translation."
  },
  {
    "id": 24,
    "question": "Which of the following is true regarding Gateways and firewalls?",
    "options": [
      "Gateways often incorporate firewall and proxy inspection capabilities because they sit at the network boundary",
      "Gateways cannot have security features",
      "Firewalls and gateways cannot be installed in the same building",
      "Gateways delete all security certificates"
    ],
    "answer": "Gateways often incorporate firewall and proxy inspection capabilities because they sit at the network boundary",
    "explanation": "Because gateways control traffic crossing architectural boundaries, they typically incorporate deep packet inspection firewalls.",
    "hint": "Boundary position makes them natural security checkpoints."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Name the device that acts as a translator between two networks using different protocol architectures.' What is the answer?",
    "options": [
      "Gateway",
      "Repeater",
      "Hub",
      "RJ-45"
    ],
    "answer": "Gateway",
    "explanation": "A Gateway is the device that acts as a protocol translator between dissimilar networks.",
    "hint": "Protocol translator = Gateway."
  }
];

export default questions;
