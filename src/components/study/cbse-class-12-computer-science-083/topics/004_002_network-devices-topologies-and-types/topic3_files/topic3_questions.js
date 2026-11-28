// 25 Authentic CBSE Board Examination Questions for Topic 3
const questions = [
  {
    "id": 1,
    "question": "At which layer of the OSI model does a traditional network hub operate?",
    "options": [
      "Physical Layer (Layer 1)",
      "Data Link Layer (Layer 2)",
      "Network Layer (Layer 3)",
      "Transport Layer (Layer 4)"
    ],
    "answer": "Physical Layer (Layer 1)",
    "explanation": "A hub operates strictly at Layer 1 (Physical Layer), repeating electrical signals without inspecting headers.",
    "hint": "Layer 1: Physical Layer."
  },
  {
    "id": 2,
    "question": "What happens when a data frame arrives on Port 1 of a 4-port network hub?",
    "options": [
      "The hub forwards it only to the destination MAC address",
      "The hub blindly broadcasts (repeats) the electrical signal out to Ports 2, 3, and 4",
      "The hub stores the packet on its hard drive",
      "The hub translates the packet into Wi-Fi"
    ],
    "answer": "The hub blindly broadcasts (repeats) the electrical signal out to Ports 2, 3, and 4",
    "explanation": "Hubs have no address intelligence. They repeat every incoming signal out to all other connected ports.",
    "hint": "Blind broadcast to all other ports."
  },
  {
    "id": 3,
    "question": "Why is a network hub often referred to as a 'dumb' device?",
    "options": [
      "Because it cannot speak",
      "Because it does not read, understand, or store MAC addresses or IP addresses, and cannot direct traffic intelligently",
      "Because it runs without electricity",
      "Because it breaks after 10 minutes"
    ],
    "answer": "Because it does not read, understand, or store MAC addresses or IP addresses, and cannot direct traffic intelligently",
    "explanation": "A hub lacks memory and processors to inspect MAC or IP addresses, making it incapable of intelligent forwarding.",
    "hint": "No address intelligence."
  },
  {
    "id": 4,
    "question": "What is an 'Active Hub'?",
    "options": [
      "A hub that runs around the room",
      "A hub that cleans, regenerates, and amplifies incoming electrical signals, requiring external electrical power",
      "A software application",
      "A hub used only for Bluetooth"
    ],
    "answer": "A hub that cleans, regenerates, and amplifies incoming electrical signals, requiring external electrical power",
    "explanation": "An active hub contains electronic circuitry that regenerates and amplifies signals before repeating them, acting as a multiport repeater.",
    "hint": "Regenerates and amplifies signal using electrical power."
  },
  {
    "id": 5,
    "question": "What is a 'Passive Hub'?",
    "options": [
      "A hub that physically splits incoming signals without amplification, requiring no external electrical power",
      "A hub that only works at night",
      "A hub connected to a satellite",
      "A hub with 100 ports"
    ],
    "answer": "A hub that physically splits incoming signals without amplification, requiring no external electrical power",
    "explanation": "A passive hub simply connects the physical wires together without any electronic signal boosting, needing zero power.",
    "hint": "Splits signals passively without power."
  },
  {
    "id": 6,
    "question": "How many collision domains exist in an 8-port network hub?",
    "options": [
      "Exactly 1 collision domain",
      "8 collision domains",
      "4 collision domains",
      "Zero collision domains"
    ],
    "answer": "Exactly 1 collision domain",
    "explanation": "All ports on a hub share the exact same physical transmission channel, forming a single collision domain.",
    "hint": "A hub is a single collision domain across all ports."
  },
  {
    "id": 7,
    "question": "What occurs when two computers connected to the same hub attempt to transmit data frames at the exact same instant?",
    "options": [
      "The hub merges the packets into one faster packet",
      "A collision occurs, corrupting the electrical signals across the shared medium",
      "One computer is permanently banned from the network",
      "The speed doubles"
    ],
    "answer": "A collision occurs, corrupting the electrical signals across the shared medium",
    "explanation": "Because the medium is shared, overlapping electrical voltages collide and destroy the readability of both frames.",
    "hint": "Collision of simultaneous electrical signals."
  },
  {
    "id": 8,
    "question": "How is bandwidth distributed among the computers connected to a 10 Mbps network hub?",
    "options": [
      "Each computer gets a dedicated 10 Mbps connection",
      "The 10 Mbps bandwidth is shared among all active connected computers",
      "Bandwidth increases by 10 Mbps for every computer added",
      "Bandwidth is unlimited"
    ],
    "answer": "The 10 Mbps bandwidth is shared among all active connected computers",
    "explanation": "In a hub, all ports share the total backplane bandwidth. More active devices mean less bandwidth per device.",
    "hint": "Total bandwidth is shared among all devices."
  },
  {
    "id": 9,
    "question": "Why is a network hub considered a significant security risk for confidential data?",
    "options": [
      "Hubs catch fire easily",
      "Because the hub broadcasts every packet to all ports, allowing any user running a packet sniffer to eavesdrop on private traffic",
      "Hubs can only be purchased by hackers",
      "Hubs delete user passwords"
    ],
    "answer": "Because the hub broadcasts every packet to all ports, allowing any user running a packet sniffer to eavesdrop on private traffic",
    "explanation": "Since packets are copied to all ports, any computer placed in promiscuous mode can capture confidential traffic intended for others.",
    "hint": "Traffic broadcasts to every port, exposing it to packet sniffers."
  },
  {
    "id": 10,
    "question": "What media access control method was developed for shared-medium Ethernet hub networks to detect collisions and retransmit?",
    "options": [
      "CSMA/CD (Carrier Sense Multiple Access with Collision Detection)",
      "Token Ring",
      "Frequency Hopping",
      "Slotted ALOHA"
    ],
    "answer": "CSMA/CD (Carrier Sense Multiple Access with Collision Detection)",
    "explanation": "CSMA/CD listens before transmitting, detects collisions when they happen, and waits a random backoff time before retrying.",
    "hint": "Carrier Sense Multiple Access with Collision Detection."
  },
  {
    "id": 11,
    "question": "Which device has almost completely replaced network hubs in modern computer local area networks?",
    "options": [
      "Network Switch",
      "Coaxial Terminator",
      "Vampire Tap",
      "BNC T-connector"
    ],
    "answer": "Network Switch",
    "explanation": "Intelligent Layer-2 switches provide dedicated bandwidth per port and isolate collision domains, rendering hubs obsolete.",
    "hint": "Network Switch."
  },
  {
    "id": 12,
    "question": "What physical network topology is formed when workstations connect individually to a central hub?",
    "options": [
      "Physical Star Topology",
      "Ring Topology",
      "Bus Topology",
      "Mesh Topology"
    ],
    "answer": "Physical Star Topology",
    "explanation": "Each node connects via its own cable radiating out from the central hub, creating a physical star layout.",
    "hint": "Cables radiate from a central hub like a star."
  },
  {
    "id": 13,
    "question": "Even though a hub forms a physical Star topology with cables, what is its logical topology?",
    "options": [
      "Logical Bus Topology (shared electrical medium)",
      "Logical Ring Topology",
      "Logical Mesh Topology",
      "Logical Tree Topology"
    ],
    "answer": "Logical Bus Topology (shared electrical medium)",
    "explanation": "Because the hub electrically connects all wires together as one shared bus, it operates logically as a bus topology.",
    "hint": "Physical star, but logical bus."
  },
  {
    "id": 14,
    "question": "What happens to the rest of the network if one workstation's cable connected to a hub is accidentally severed?",
    "options": [
      "The entire network crashes immediately",
      "Only that specific disconnected workstation loses connectivity; the other computers continue operating normally",
      "The hub catches fire",
      "The remaining computers double their speed"
    ],
    "answer": "Only that specific disconnected workstation loses connectivity; the other computers continue operating normally",
    "explanation": "Because physical wiring is star-configured, an isolated cable break affects only that single node.",
    "hint": "Star wiring isolates cable breaks to that single node."
  },
  {
    "id": 15,
    "question": "What happens if the central hub itself suffers a complete power supply failure?",
    "options": [
      "The network switches to optical mode",
      "The entire network segment fails because the central point of failure has shut down",
      "Only the server is affected",
      "Computers communicate wirelessly automatically"
    ],
    "answer": "The entire network segment fails because the central point of failure has shut down",
    "explanation": "The central hub represents a single point of failure; if it fails, all connected devices lose communication.",
    "hint": "Central point of failure."
  },
  {
    "id": 16,
    "question": "What is an 'Intelligent Hub'?",
    "options": [
      "A hub that writes code",
      "An active hub that includes network management features like SNMP monitoring and port status tracking",
      "A hub that runs Windows 11",
      "A hub made of solid gold"
    ],
    "answer": "An active hub that includes network management features like SNMP monitoring and port status tracking",
    "explanation": "Intelligent hubs included microprocessors supporting SNMP (Simple Network Management Protocol) to remotely monitor port traffic.",
    "hint": "Hub with remote SNMP management capabilities."
  },
  {
    "id": 17,
    "question": "True or False: A network hub can forward packets between a Token Ring network and an Ethernet network.",
    "options": [
      "True",
      "False",
      "Only on Mondays",
      "Only if the computers are laptops"
    ],
    "answer": "False",
    "explanation": "Hubs are Layer-1 repeaters. They cannot translate frame formats between dissimilar protocols like Token Ring and Ethernet.",
    "hint": "Hubs cannot translate protocols."
  },
  {
    "id": 18,
    "question": "How many broadcast domains exist across all ports of a single network hub?",
    "options": [
      "Exactly 1 broadcast domain",
      "One broadcast domain per port",
      "Zero broadcast domains",
      "16 broadcast domains"
    ],
    "answer": "Exactly 1 broadcast domain",
    "explanation": "A hub passes all broadcasts directly to all ports, forming one unified broadcast domain.",
    "hint": "Single broadcast domain."
  },
  {
    "id": 19,
    "question": "What is a 'Multiport Repeater' another name for?",
    "options": [
      "Active Hub",
      "Passive Hub",
      "BNC Terminator",
      "Modem"
    ],
    "answer": "Active Hub",
    "explanation": "An active hub is technically classified as a Multiport Repeater because it regenerates signals across multiple ports.",
    "hint": "Repeater with multiple ports = Active Hub."
  },
  {
    "id": 20,
    "question": "Why does adding more computers to a hub network cause overall performance to degrade exponentially?",
    "options": [
      "Because the hub runs out of memory",
      "Because the frequency of packet collisions increases dramatically as more nodes compete for the shared transmission medium",
      "Because electricity flows slower",
      "Because the wires get heavier"
    ],
    "answer": "Because the frequency of packet collisions increases dramatically as more nodes compete for the shared transmission medium",
    "explanation": "More devices on a shared collision domain lead to more collision events, forcing frequent backoff retransmissions.",
    "hint": "More nodes = more collisions on the shared channel."
  },
  {
    "id": 21,
    "question": "If a school has a choice between buying a 24-port Hub and a 24-port Switch for the same price, which should be selected?",
    "options": [
      "The Hub because it is simpler",
      "The Switch because it provides dedicated bandwidth per port, isolates collision domains, and forwards frames intelligently",
      "Neither, buy coaxial cables",
      "The Hub because it uses less electricity"
    ],
    "answer": "The Switch because it provides dedicated bandwidth per port, isolates collision domains, and forwards frames intelligently",
    "explanation": "Switches eliminate collisions and deliver full dedicated line rate to every port, offering vast performance advantages over hubs.",
    "hint": "Switch is vastly superior to a hub."
  },
  {
    "id": 22,
    "question": "What happens when a node connected to a hub transmits a broadcast frame addressed to FF:FF:FF:FF:FF:FF?",
    "options": [
      "The hub drops the frame",
      "The hub repeats it to all other connected ports (just as it does with all other frames)",
      "The hub sends it only to the server",
      "The hub shuts down"
    ],
    "answer": "The hub repeats it to all other connected ports (just as it does with all other frames)",
    "explanation": "Since a hub repeats ALL frames to all ports regardless of address, broadcast frames are handled identically to unicast frames.",
    "hint": "The hub forwards all frames to all ports anyway."
  },
  {
    "id": 23,
    "question": "What is the maximum number of hubs permitted between any two communicating workstations under the legacy '5-4-3 Rule' in 10 Mbps Ethernet?",
    "options": [
      "4 hubs (repeaters)",
      "10 hubs",
      "1 hub",
      "100 hubs"
    ],
    "answer": "4 hubs (repeaters)",
    "explanation": "The 5-4-3 rule permits a maximum of 5 segments, 4 repeaters/hubs, and only 3 populated segments to prevent round-trip delay exceeding collision detection limits.",
    "hint": "4 repeaters under the 5-4-3 rule."
  },
  {
    "id": 24,
    "question": "Which of the following ports would you typically find on a standard 10BASE-T Ethernet hub?",
    "options": [
      "RJ-45 ports",
      "HDMI ports",
      "VGA ports",
      "Lightning ports"
    ],
    "answer": "RJ-45 ports",
    "explanation": "10BASE-T Ethernet hubs use standard 8-pin RJ-45 modular ports.",
    "hint": "RJ-45 ports."
  },
  {
    "id": 25,
    "question": "In a CBSE 2-mark question: 'Differentiate between an Active Hub and a Passive Hub.' What are the two core points?",
    "options": [
      "Active Hub amplifies/regenerates signals and requires power; Passive Hub only forwards signals physically without amplification or power",
      "Active Hub is wireless; Passive Hub is wired",
      "Active Hub works with fiber; Passive Hub works with copper",
      "Active Hub has 100 ports; Passive Hub has 1 port"
    ],
    "answer": "Active Hub amplifies/regenerates signals and requires power; Passive Hub only forwards signals physically without amplification or power",
    "explanation": "Active hubs regenerate/clean signals and need external power; passive hubs simply split the physical wiring without power or regeneration.",
    "hint": "Amplification and external power requirement."
  }
];

export default questions;
