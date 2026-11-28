// 25 Authentic CBSE Board Examination Questions for Topic 8
const questions = [
  {
    "id": 1,
    "question": "What does the acronym 'WAP' stand for in wireless local area networking?",
    "options": [
      "Wireless Access Point",
      "Wide Area Protocol",
      "Wireless Application Port",
      "Wired Access Provider"
    ],
    "answer": "Wireless Access Point",
    "explanation": "WAP stands for Wireless Access Point, a device that allows Wi-Fi client devices to connect to a wired network.",
    "hint": "Wireless Access Point."
  },
  {
    "id": 2,
    "question": "What is the primary function of a Wireless Access Point?",
    "options": [
      "To physically drill holes for network cables",
      "To act as a bridge between a wired Ethernet network and wireless Wi-Fi devices, broadcasting radio signals for connectivity",
      "To store video files",
      "To provide electricity to monitors"
    ],
    "answer": "To act as a bridge between a wired Ethernet network and wireless Wi-Fi devices, broadcasting radio signals for connectivity",
    "explanation": "A WAP bridges wired 802.3 Ethernet to 802.11 wireless radio signals, enabling laptops and smartphones to access the LAN.",
    "hint": "Bridges wired network to wireless devices."
  },
  {
    "id": 3,
    "question": "What does 'SSID' stand for in Wi-Fi network configuration?",
    "options": [
      "Service Set Identifier",
      "System Security ID",
      "Subnet Serial Identifier",
      "Standard Signal Interface Device"
    ],
    "answer": "Service Set Identifier",
    "explanation": "SSID stands for Service Set Identifier, the technical name used to identify a specific 802.11 wireless network.",
    "hint": "Service Set Identifier."
  },
  {
    "id": 4,
    "question": "What is the maximum length of an SSID name in characters?",
    "options": [
      "8 characters",
      "16 characters",
      "32 characters",
      "64 characters"
    ],
    "answer": "32 characters",
    "explanation": "Under the IEEE 802.11 standard, an SSID can contain up to 32 alphanumeric/symbolic characters.",
    "hint": "32 characters."
  },
  {
    "id": 5,
    "question": "What are the three non-overlapping channels in the 2.4 GHz Wi-Fi spectrum in North America and India?",
    "options": [
      "Channels 1, 6, and 11",
      "Channels 1, 2, and 3",
      "Channels 5, 10, and 15",
      "Channels 2, 4, and 8"
    ],
    "answer": "Channels 1, 6, and 11",
    "explanation": "Channels 1, 6, and 11 have 25 MHz separation between center frequencies, preventing adjacent channel interference in 2.4 GHz.",
    "hint": "Channels 1, 6, and 11."
  },
  {
    "id": 6,
    "question": "Which of the following is an advantage of the 5 GHz Wi-Fi band over the 2.4 GHz Wi-Fi band?",
    "options": [
      "5 GHz penetrates concrete walls better than 2.4 GHz",
      "5 GHz provides much higher data transmission rates and has 24+ non-overlapping channels with far less RF interference",
      "5 GHz reaches over 50 kilometers",
      "5 GHz works without antennas"
    ],
    "answer": "5 GHz provides much higher data transmission rates and has 24+ non-overlapping channels with far less RF interference",
    "explanation": "5 GHz offers wider channel widths (40/80/160 MHz) and more non-overlapping channels, delivering gigabit speeds with low congestion.",
    "hint": "Higher speed and less interference."
  },
  {
    "id": 7,
    "question": "Which of the following is an advantage of the 2.4 GHz Wi-Fi band over the 5 GHz band?",
    "options": [
      "2.4 GHz offers higher speed than 5 GHz",
      "2.4 GHz has longer transmission range and penetrates through solid walls and architectural obstacles much more effectively",
      "2.4 GHz is immune to microwave oven interference",
      "2.4 GHz has 100 channels"
    ],
    "answer": "2.4 GHz has longer transmission range and penetrates through solid walls and architectural obstacles much more effectively",
    "explanation": "Lower frequency radio waves have longer wavelengths that attenuate less through solid drywall and concrete, offering superior range.",
    "hint": "Longer range and superior obstacle penetration."
  },
  {
    "id": 8,
    "question": "What is the role of a Wi-Fi Card (Wireless Network Interface Card - WNIC)?",
    "options": [
      "It allows a computer to receive radio signals and exchange data wirelessly with an access point",
      "It prints documents wirelessly",
      "It replaces the computer hard disk",
      "It cools down the processor"
    ],
    "answer": "It allows a computer to receive radio signals and exchange data wirelessly with an access point",
    "explanation": "A WNIC contains the radio transceiver and antenna circuitry necessary to encode, transmit, receive, and decode 802.11 wireless frames.",
    "hint": "Transceiver and antenna for wireless computer connectivity."
  },
  {
    "id": 9,
    "question": "In a CBSE 5-mark Case Study: The school management wants to provide wireless internet in the Library and Auditorium for students carrying laptops. Which device should be installed?",
    "options": [
      "Wireless Access Point (WAP)",
      "Coaxial Terminator",
      "Vampire Tap",
      "BNC T-Connector"
    ],
    "answer": "Wireless Access Point (WAP)",
    "explanation": "A Wireless Access Point (WAP) broadcasts Wi-Fi signals throughout the hall, allowing mobile laptops to connect without physical desk cables.",
    "hint": "Device providing wireless connectivity to laptops."
  },
  {
    "id": 10,
    "question": "What is 'SSID Broadcasting' and what happens when it is disabled (Hidden SSID)?",
    "options": [
      "The router turns off completely",
      "The AP stops advertising its network name in beacon frames, requiring users to manually type the exact SSID name to connect",
      "The Wi-Fi speed increases by 10x",
      "Passwords are no longer required"
    ],
    "answer": "The AP stops advertising its network name in beacon frames, requiring users to manually type the exact SSID name to connect",
    "explanation": "Hiding an SSID suppresses the beacon name broadcast. Devices cannot discover it automatically and must enter the exact name manually.",
    "hint": "Hides the network name from automatic discovery."
  },
  {
    "id": 11,
    "question": "What is the most secure, modern wireless encryption standard for Wi-Fi networks?",
    "options": [
      "WEP (Wired Equivalent Privacy)",
      "WPA",
      "WPA2",
      "WPA3 (using SAE authentication)"
    ],
    "answer": "WPA3 (using SAE authentication)",
    "explanation": "WPA3 is the latest IEEE standard, replacing WPA2 with Simultaneous Authentication of Equals (SAE) to protect against dictionary attacks.",
    "hint": "WPA3."
  },
  {
    "id": 12,
    "question": "Why was the early WEP (Wired Equivalent Privacy) encryption standard declared obsolete and insecure?",
    "options": [
      "Because it used a weak RC4 cipher with small 24-bit Initialization Vectors (IVs) that could be cracked in minutes with packet sniffers",
      "Because it only worked on Apple computers",
      "Because it cost too much money",
      "Because it consumed too much electricity"
    ],
    "answer": "Because it used a weak RC4 cipher with small 24-bit Initialization Vectors (IVs) that could be cracked in minutes with packet sniffers",
    "explanation": "WEP's short 24-bit IV space caused frequent key reuse, allowing statistical analysis tools (Aircrack-ng) to recover the master key in minutes.",
    "hint": "Weak RC4 cipher cracked in minutes."
  },
  {
    "id": 13,
    "question": "What does 'PoE' (Power over Ethernet) allow when installing Wireless Access Points on high ceilings?",
    "options": [
      "It powers the AP through the same standard RJ-45 Ethernet data cable, eliminating the need to hire electricians to install 220V electrical wall outlets near the ceiling",
      "It makes the AP waterproof",
      "It transmits radio waves over power lines",
      "It makes the Wi-Fi free of cost"
    ],
    "answer": "It powers the AP through the same standard RJ-45 Ethernet data cable, eliminating the need to hire electricians to install 220V electrical wall outlets near the ceiling",
    "explanation": "PoE switches deliver 48V DC power over twisted pair wires, powering ceiling-mounted APs without separate electrical wiring.",
    "hint": "Power delivered over the Ethernet cable."
  },
  {
    "id": 14,
    "question": "What term describes a laptop smoothly switching its wireless connection from one Access Point to another as the user walks across a university campus?",
    "options": [
      "Wireless Roaming",
      "Collision Detection",
      "Packet Switching",
      "Modulation"
    ],
    "answer": "Wireless Roaming",
    "explanation": "Wireless roaming allows client devices to dissociate from a weakening AP and seamlessly associate with a stronger AP sharing the same SSID.",
    "hint": "Roaming between access points."
  },
  {
    "id": 15,
    "question": "What is a 'Standalone (Fat) Access Point' compared to a 'Lightweight (Thin) Access Point'?",
    "options": [
      "A fat AP weighs 50 kilograms",
      "A standalone AP manages all authentication, encryption, and routing independently; a lightweight AP delegates control to a central Wireless LAN Controller (WLC)",
      "A thin AP only works for thin laptops",
      "A standalone AP has no antennas"
    ],
    "answer": "A standalone AP manages all authentication, encryption, and routing independently; a lightweight AP delegates control to a central Wireless LAN Controller (WLC)",
    "explanation": "Standalone APs are self-contained. Lightweight APs operate in controller-based networks where a central WLC manages roaming and security policies.",
    "hint": "Independent AP vs Controller-managed AP."
  },
  {
    "id": 16,
    "question": "What is 'BSSID' in wireless networking?",
    "options": [
      "The physical 48-bit MAC address of the radio chip inside the Wireless Access Point",
      "The brand name of the router",
      "The password of the Wi-Fi network",
      "The speed of the internet connection"
    ],
    "answer": "The physical 48-bit MAC address of the radio chip inside the Wireless Access Point",
    "explanation": "While SSID is the network name, BSSID (Basic Service Set Identifier) is the 48-bit MAC address of the AP's physical radio.",
    "hint": "MAC address of the wireless AP radio."
  },
  {
    "id": 17,
    "question": "What household appliance is notorious for causing severe 2.4 GHz Wi-Fi interference when in operation?",
    "options": [
      "Microwave oven",
      "Toaster",
      "Electric fan",
      "Refrigerator light bulb"
    ],
    "answer": "Microwave oven",
    "explanation": "Microwave ovens heat water molecules using high-power electromagnetic radiation at ~2.45 GHz, leaking stray RF that interferes with 2.4 GHz Wi-Fi.",
    "hint": "Heats food using 2.45 GHz radiation."
  },
  {
    "id": 18,
    "question": "What is 'MIMO' (Multiple-Input Multiple-Output) technology in modern Wi-Fi access points and cards?",
    "options": [
      "Using multiple antennas to transmit and receive multiple spatial streams of data simultaneously, multiplying bandwidth",
      "A brand of smartphone",
      "A protocol used for printing",
      "Connecting two mice to one computer"
    ],
    "answer": "Using multiple antennas to transmit and receive multiple spatial streams of data simultaneously, multiplying bandwidth",
    "explanation": "MIMO exploits multipath propagation by using multiple antennas to send parallel spatial data streams (e.g. 2x2, 4x4, 8x8 MIMO).",
    "hint": "Multiple antennas transmitting parallel data streams."
  },
  {
    "id": 19,
    "question": "What does 'RSSI' stand for, and what does a value of -50 dBm indicate compared to -85 dBm?",
    "options": [
      "Received Signal Strength Indicator; -50 dBm represents a much stronger signal than -85 dBm",
      "Router System Security Identifier; -50 dBm means weak signal",
      "Radio Spectrum Speed Index; both are identical",
      "Repeat Signal Sensor Input; -50 dBm means disconnected"
    ],
    "answer": "Received Signal Strength Indicator; -50 dBm represents a much stronger signal than -85 dBm",
    "explanation": "RSSI measures signal power in decibel-milliwatts (dBm). Since values are negative, -50 dBm is closer to zero and much stronger than -85 dBm.",
    "hint": "Less negative dBm means stronger signal."
  },
  {
    "id": 20,
    "question": "What is a 'Captive Portal' commonly encountered on public airport or hotel Access Points?",
    "options": [
      "A web page displayed to newly connected Wi-Fi users requiring login credentials, room number, or acceptance of Terms of Service before granting internet access",
      "A physical metal cage around the router",
      "A virus that locks the computer",
      "A firewall that blocks all websites"
    ],
    "answer": "A web page displayed to newly connected Wi-Fi users requiring login credentials, room number, or acceptance of Terms of Service before granting internet access",
    "explanation": "A captive portal intercepts web browsing until the user completes authentication or terms acceptance on a splash web page.",
    "hint": "Web login page before granting internet access."
  },
  {
    "id": 21,
    "question": "Which IEEE 802 standard defines wireless local area networks (Wi-Fi)?",
    "options": [
      "IEEE 802.11",
      "IEEE 802.3",
      "IEEE 802.15",
      "IEEE 802.1Q"
    ],
    "answer": "IEEE 802.11",
    "explanation": "IEEE 802.11 is the family of specifications for wireless local area networks (Wi-Fi). IEEE 802.3 is wired Ethernet.",
    "hint": "IEEE 802.11."
  },
  {
    "id": 22,
    "question": "True or False: A Wireless Access Point eliminates the need for any physical cabling in a building infrastructure.",
    "options": [
      "False, the Access Point itself must still be connected to a central switch or router via an Ethernet cable or optical fiber backbone",
      "True, APs operate purely without any wires whatsoever in the building",
      "True, APs receive power through the air",
      "Only if the building is made of wood"
    ],
    "answer": "False, the Access Point itself must still be connected to a central switch or router via an Ethernet cable or optical fiber backbone",
    "explanation": "APs require an Ethernet cable (often carrying PoE) to connect back to the core switch and internet gateway.",
    "hint": "The AP itself requires an Ethernet uplink cable."
  },
  {
    "id": 23,
    "question": "What is a 'Wi-Fi Hotspot'?",
    "options": [
      "A physical location where a wireless access point provides public or private internet access over a wireless local area network",
      "A computer that is overheating",
      "A fire hazard near a router",
      "A laser pointer"
    ],
    "answer": "A physical location where a wireless access point provides public or private internet access over a wireless local area network",
    "explanation": "A Wi-Fi hotspot is a venue (café, airport, library) offering wireless internet access via one or more APs.",
    "hint": "Physical venue offering Wi-Fi coverage."
  },
  {
    "id": 24,
    "question": "What is the function of the external antenna on a Wi-Fi card or access point?",
    "options": [
      "To convert electrical high-frequency signals into electromagnetic radio waves in the air, and vice versa",
      "To measure room temperature",
      "To prevent lightning strikes",
      "To balance the weight of the card"
    ],
    "answer": "To convert electrical high-frequency signals into electromagnetic radio waves in the air, and vice versa",
    "explanation": "Antennas are transducers that convert guided electrical AC current into unguided electromagnetic waves radiating through space.",
    "hint": "Transducer between electrical signals and radio waves."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Name the device used to connect wireless devices (such as laptops and smartphones) to a wired network.' What is the answer?",
    "options": [
      "Wireless Access Point (WAP)",
      "Coaxial Terminator",
      "Vampire Tap",
      "BNC Connector"
    ],
    "answer": "Wireless Access Point (WAP)",
    "explanation": "A Wireless Access Point connects wireless devices to a wired network infrastructure.",
    "hint": "Wireless Access Point."
  }
];

export default questions;
