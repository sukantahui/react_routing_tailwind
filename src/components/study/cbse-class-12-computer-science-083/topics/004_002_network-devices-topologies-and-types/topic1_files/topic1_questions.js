// 25 Authentic CBSE Board Examination Questions for Topic 1
const questions = [
  {
    "id": 1,
    "question": "What does the acronym 'NIC' stand for in computer networking?",
    "options": [
      "Network Interface Card",
      "New Internet Connection",
      "Network Internal Controller",
      "Node Interconnect Circuit"
    ],
    "answer": "Network Interface Card",
    "explanation": "NIC stands for Network Interface Card, the hardware component providing network physical connectivity.",
    "hint": "Network Interface Card."
  },
  {
    "id": 2,
    "question": "What is the total bit length of a standard Media Access Control (MAC) address?",
    "options": [
      "16 bits",
      "32 bits",
      "48 bits (6 Bytes)",
      "128 bits"
    ],
    "answer": "48 bits (6 Bytes)",
    "explanation": "A MAC address is universally structured as a 48-bit (6-byte) binary physical hardware address.",
    "hint": "48 bits, or 6 bytes."
  },
  {
    "id": 3,
    "question": "How many hexadecimal digits are used to represent a 48-bit MAC address in human-readable form?",
    "options": [
      "8 hex digits",
      "12 hex digits",
      "16 hex digits",
      "32 hex digits"
    ],
    "answer": "12 hex digits",
    "explanation": "Since each hexadecimal digit represents 4 bits, 48 bits / 4 = 12 hexadecimal digits (organized as 6 pairs).",
    "hint": "6 pairs of 2 digits = 12 digits."
  },
  {
    "id": 4,
    "question": "Which of the following is a VALID MAC address format?",
    "options": [
      "00:1A:2B:3C:4D:5E",
      "192.168.1.1",
      "00:1A:2B:3C:4D:GG",
      "00-1A-2B-3C"
    ],
    "answer": "00:1A:2B:3C:4D:5E",
    "explanation": "00:1A:2B:3C:4D:5E has exactly 6 pairs of valid hexadecimal digits (0-9, A-F). 'GG' is invalid, 192.168.1.1 is IPv4, and 00-1A-2B-3C has only 4 pairs.",
    "hint": "6 pairs of hexadecimal characters (0-9, A-F)."
  },
  {
    "id": 5,
    "question": "What do the first 24 bits (first 3 bytes) of a MAC address identify?",
    "options": [
      "The computer owner's national identity number",
      "The Organizationally Unique Identifier (OUI) assigned to the hardware manufacturer by the IEEE",
      "The IP address of the local router",
      "The serial number of the computer CPU"
    ],
    "answer": "The Organizationally Unique Identifier (OUI) assigned to the hardware manufacturer by the IEEE",
    "explanation": "The first 3 bytes (24 bits) constitute the OUI (Organizationally Unique Identifier) which designates the vendor who manufactured the NIC.",
    "hint": "Organizationally Unique Identifier (OUI)."
  },
  {
    "id": 6,
    "question": "What do the last 24 bits (last 3 bytes) of a MAC address represent?",
    "options": [
      "The serial number assigned uniquely by the manufacturer to that specific NIC",
      "The country zip code where the PC was sold",
      "The default gateway IP",
      "The subnet mask"
    ],
    "answer": "The serial number assigned uniquely by the manufacturer to that specific NIC",
    "explanation": "The second half of the MAC address is assigned sequentially by the manufacturer to guarantee that no two NICs share the same physical address.",
    "hint": "Unique device serial number assigned by manufacturer."
  },
  {
    "id": 7,
    "question": "Where is the MAC address physically stored inside a Network Interface Card?",
    "options": [
      "In the computer's hard disk drive in a hidden text file",
      "Burned permanently into the Read-Only Memory (ROM) or flash chip of the NIC",
      "In the cloud",
      "In the RAM every time Windows boots"
    ],
    "answer": "Burned permanently into the Read-Only Memory (ROM) or flash chip of the NIC",
    "explanation": "The MAC address is hardcoded (burned) into the non-volatile ROM/firmware of the network card during manufacturing.",
    "hint": "Burned into the card's ROM."
  },
  {
    "id": 8,
    "question": "At which layer of the OSI architecture does the MAC address operate?",
    "options": [
      "Application Layer",
      "Network Layer",
      "Data Link Layer (Layer 2)",
      "Transport Layer"
    ],
    "answer": "Data Link Layer (Layer 2)",
    "explanation": "MAC addresses operate at Layer 2 (Data Link Layer) for framing, hop-to-hop delivery, and local network switching.",
    "hint": "Layer 2: Data Link Layer."
  },
  {
    "id": 9,
    "question": "Which of the following statements correctly differentiates between an IP address and a MAC address?",
    "options": [
      "MAC address is logical while IP address is physical",
      "MAC address is a 48-bit permanent physical address; IP address is a 32-bit (IPv4) logical address that can change when moving networks",
      "MAC addresses only work on mobile phones",
      "IP addresses are burned into ROM while MAC addresses are assigned by DHCP"
    ],
    "answer": "MAC address is a 48-bit permanent physical address; IP address is a 32-bit (IPv4) logical address that can change when moving networks",
    "explanation": "A MAC address is fixed to the hardware (physical), while an IP address is assigned logically based on current network location.",
    "hint": "MAC is permanent physical; IP is dynamic logical."
  },
  {
    "id": 10,
    "question": "Why is an address like '00:1G:2B:3C:4D:5E' an invalid MAC address?",
    "options": [
      "Because colons are not allowed",
      "Because 'G' is not a valid hexadecimal character (hex characters are restricted to 0-9 and A-F)",
      "Because it has too many digits",
      "Because it starts with 00"
    ],
    "answer": "Because 'G' is not a valid hexadecimal character (hex characters are restricted to 0-9 and A-F)",
    "explanation": "Hexadecimal numbers only include numerals 0-9 and letters A-F. 'G' is outside the base-16 numeral system.",
    "hint": "Hexadecimal letters stop at F."
  },
  {
    "id": 11,
    "question": "If a student replaces a damaged motherboard containing an onboard Ethernet card with a brand-new motherboard, what happens to the computer's MAC address?",
    "options": [
      "It remains exactly the same",
      "It changes because the new motherboard contains a different NIC with its own unique burned-in MAC address",
      "The computer loses its operating system",
      "The MAC address changes to all zeros"
    ],
    "answer": "It changes because the new motherboard contains a different NIC with its own unique burned-in MAC address",
    "explanation": "Because onboard NICs are physically soldered to the motherboard, swapping motherboards changes the physical NIC and thus changes the MAC address.",
    "hint": "New hardware card means new burned-in MAC address."
  },
  {
    "id": 12,
    "question": "Which command in Windows Command Prompt displays the computer's MAC address (Physical Address)?",
    "options": [
      "ping localhost",
      "ipconfig /all",
      "mkdir network",
      "dir /s"
    ],
    "answer": "ipconfig /all",
    "explanation": "Running 'ipconfig /all' in Windows displays full adapter configuration including the 'Physical Address' (MAC address).",
    "hint": "ipconfig with the /all switch."
  },
  {
    "id": 13,
    "question": "What protocol is used in local area networks to resolve an IP address to its corresponding physical MAC address?",
    "options": [
      "ARP (Address Resolution Protocol)",
      "DNS",
      "DHCP",
      "FTP"
    ],
    "answer": "ARP (Address Resolution Protocol)",
    "explanation": "ARP (Address Resolution Protocol) broadcasts a query across the local network to discover the physical MAC address matching a known IP address.",
    "hint": "Address Resolution Protocol (ARP)."
  },
  {
    "id": 14,
    "question": "What is a 'Wireless NIC' (WNIC)?",
    "options": [
      "A network card that uses a microwave oven to transmit",
      "A network interface controller with built-in radio antenna that connects a computer to a wireless Wi-Fi network (IEEE 802.11)",
      "A network card with no wires and no batteries",
      "A Bluetooth speaker"
    ],
    "answer": "A network interface controller with built-in radio antenna that connects a computer to a wireless Wi-Fi network (IEEE 802.11)",
    "explanation": "A Wireless NIC enables wireless connectivity using radio frequency transceivers and antennas conforming to 802.11 Wi-Fi standards.",
    "hint": "Wi-Fi network card with an antenna."
  },
  {
    "id": 15,
    "question": "Can two computers anywhere in the world legitimately have the exact same standard factory-assigned MAC address?",
    "options": [
      "Yes, all computers in India share the same MAC address",
      "No, the IEEE OUI registration and manufacturer serialization ensure that each factory MAC address is globally unique",
      "Yes, if they run the same operating system",
      "Yes, if they connect to the same Wi-Fi router"
    ],
    "answer": "No, the IEEE OUI registration and manufacturer serialization ensure that each factory MAC address is globally unique",
    "explanation": "The hierarchical allocation of OUIs by IEEE combined with unique vendor serialization guarantees worldwide uniqueness for hardware MAC addresses.",
    "hint": "Globally unique physical identifier."
  },
  {
    "id": 16,
    "question": "What is 'MAC Spoofing'?",
    "options": [
      "Painting a network card a different color",
      "Temporarily altering the software-reported MAC address transmitted in network frames to mask device identity or bypass filters",
      "Breaking a network card with a hammer",
      "Connecting two computers with a rubber band"
    ],
    "answer": "Temporarily altering the software-reported MAC address transmitted in network frames to mask device identity or bypass filters",
    "explanation": "MAC spoofing alters the outgoing software frame header to present a fabricated MAC address, masking the true burned-in hardware address.",
    "hint": "Faking or altering the software MAC address."
  },
  {
    "id": 17,
    "question": "How many bytes does the Organizationally Unique Identifier (OUI) occupy in a MAC address?",
    "options": [
      "1 byte",
      "2 bytes",
      "3 bytes (24 bits)",
      "6 bytes"
    ],
    "answer": "3 bytes (24 bits)",
    "explanation": "The first 3 bytes (24 bits) are reserved for the vendor OUI.",
    "hint": "Half of the 6-byte address = 3 bytes."
  },
  {
    "id": 18,
    "question": "Which organization manages the global assignment of OUI prefixes to network hardware manufacturers?",
    "options": [
      "IEEE (Institute of Electrical and Electronics Engineers)",
      "UNESCO",
      "NASA",
      "Microsoft"
    ],
    "answer": "IEEE (Institute of Electrical and Electronics Engineers)",
    "explanation": "The IEEE Registration Authority oversees the allocation of unique OUI prefixes to hardware manufacturers worldwide.",
    "hint": "IEEE."
  },
  {
    "id": 19,
    "question": "What type of transmission is indicated if the least significant bit of the first byte of a destination MAC address is set to 1?",
    "options": [
      "Unicast",
      "Multicast / Broadcast",
      "Loopback",
      "Encrypted"
    ],
    "answer": "Multicast / Broadcast",
    "explanation": "In Ethernet standards, an I/G (Individual/Group) bit of 0 indicates a unicast destination, whereas 1 indicates a multicast or broadcast address (e.g. FF:FF:FF:FF:FF:FF).",
    "hint": "Group or broadcast transmission."
  },
  {
    "id": 20,
    "question": "What is the universal Ethernet Broadcast MAC address?",
    "options": [
      "00:00:00:00:00:00",
      "FF:FF:FF:FF:FF:FF",
      "255.255.255.255",
      "127.0.0.1"
    ],
    "answer": "FF:FF:FF:FF:FF:FF",
    "explanation": "The broadcast MAC address consists of all 48 binary bits set to 1, represented in hexadecimal as FF:FF:FF:FF:FF:FF.",
    "hint": "All hexadecimal F's."
  },
  {
    "id": 21,
    "question": "What hardware component on an Ethernet NIC converts incoming electrical signals on the twisted pair cable into digital bit data?",
    "options": [
      "PHY (Physical Layer Transceiver) chip",
      "Cooling fan",
      "Screws",
      "Audio jack"
    ],
    "answer": "PHY (Physical Layer Transceiver) chip",
    "explanation": "The Ethernet PHY transceiver converts analog voltages on the copper wires into digital signals and feeds them to the MAC controller.",
    "hint": "Physical layer transceiver (PHY)."
  },
  {
    "id": 22,
    "question": "Which port is built into an Ethernet card to accept an RJ-45 cable connector?",
    "options": [
      "Modular 8P8C RJ-45 port",
      "HDMI port",
      "VGA port",
      "3.5mm headphone jack"
    ],
    "answer": "Modular 8P8C RJ-45 port",
    "explanation": "Ethernet cards have an 8-position, 8-contact (8P8C) modular jack designed to lock an RJ-45 plug securely into place.",
    "hint": "8-pin modular port: RJ-45."
  },
  {
    "id": 23,
    "question": "If a computer moves from home Wi-Fi to a school Wi-Fi network, which address changes?",
    "options": [
      "The MAC address changes, but the IP address stays the same",
      "The IP address changes (assigned by the school router), while the hardware MAC address remains unchanged",
      "Both the MAC address and IP address change",
      "Neither address changes"
    ],
    "answer": "The IP address changes (assigned by the school router), while the hardware MAC address remains unchanged",
    "explanation": "A MAC address is fixed in hardware and never changes when relocating. The IP address is dynamically assigned by the local network and changes with every new subnet.",
    "hint": "Logical IP changes with location; physical MAC stays fixed."
  },
  {
    "id": 24,
    "question": "What is 'MAC Address Filtering' in wireless Wi-Fi routers?",
    "options": [
      "Cleaning the router antenna with a filter cloth",
      "A security feature that permits or denies network access based on a pre-configured whitelist of approved MAC addresses",
      "Filtering out spam emails",
      "Limiting the router speed to 10 Mbps"
    ],
    "answer": "A security feature that permits or denies network access based on a pre-configured whitelist of approved MAC addresses",
    "explanation": "MAC filtering restricts network access so that only devices whose physical MAC addresses appear in the authorized whitelist can connect.",
    "hint": "Whitelisting allowed device hardware addresses."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Identify the invalid MAC address: (A) 00:11:22:33:44:55 (B) 00-50-56-C0-00-08 (C) 00:1A:2B:3C:4D:EF (D) 00:1A:2B:3C:4D:5H'. What is the answer?",
    "options": [
      "(A) 00:11:22:33:44:55",
      "(B) 00-50-56-C0-00-08",
      "(C) 00:1A:2B:3C:4D:EF",
      "(D) 00:1A:2B:3C:4D:5H"
    ],
    "answer": "(D) 00:1A:2B:3C:4D:5H",
    "explanation": "Option (D) contains the letter 'H', which is not a valid hexadecimal character (hex digits are 0-9 and A-F only).",
    "hint": "'H' is outside the hexadecimal range 0-9, A-F."
  }
];

export default questions;
