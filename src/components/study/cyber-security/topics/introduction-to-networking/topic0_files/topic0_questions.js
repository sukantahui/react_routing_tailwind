// src/components/topic0/topic0_files/topic0_questions.js
const questions = [
  {
    question: "What is a computer network?",
    shortAnswer: "A collection of interconnected devices that communicate and share resources.",
    explanation:
      "A computer network connects multiple computing devices (nodes) using transmission media (wired or wireless) and follows a set of rules (protocols) to enable data exchange and resource sharing.",
    hint: "Think of it as a digital neighborhood with roads and traffic rules.",
    level: "basic",
    codeExample: null,
  },
  {
    question: "What is the difference between a node and a link?",
    shortAnswer: "A node is a device; a link is the connection between devices.",
    explanation:
      "A node (or host) is any device connected to the network (e.g., computer, printer). A link is the physical or wireless medium (cable, Wi-Fi) that carries data from one node to another.",
    hint: "Think of nodes as houses and links as roads.",
    level: "basic",
    codeExample: null,
  },
  {
    question: "What is a protocol in networking?",
    shortAnswer: "A set of rules that govern data communication.",
    explanation:
      "Protocols define how data is formatted, transmitted, received, and acknowledged. Examples include TCP/IP, HTTP, FTP, and Ethernet.",
    hint: "Like the rules of a language or traffic regulations.",
    level: "basic",
    codeExample: null,
  },
  {
    question: "What is an IP address?",
    shortAnswer: "A unique numerical label assigned to each device on a network.",
    explanation:
      "An Internet Protocol (IP) address identifies a device and its location on the network. IPv4 uses 32-bit addresses (e.g., 192.168.1.1), while IPv6 uses 128-bit addresses to accommodate more devices.",
    hint: "Like a postal address that tells where a device is.",
    level: "intermediate",
    codeExample: "Example: 192.168.1.1 (IPv4) or 2001:0db8:85a3::8a2e:0370:7334 (IPv6)",
  },
  {
    question: "What is the role of a router in a network?",
    shortAnswer: "A router forwards data packets between different networks.",
    explanation:
      "Routers operate at the network layer (Layer 3) and use IP addresses to determine the best path for data to travel from source to destination, often connecting a local network to the internet.",
    hint: "Like a post office sorting and forwarding mail to the correct destination.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is the OSI model?",
    shortAnswer: "A conceptual framework that standardizes networking functions into seven layers.",
    explanation:
      "The Open Systems Interconnection (OSI) model divides networking into seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. Each layer handles specific tasks and provides services to the layer above.",
    hint: "Remember the mnemonic: 'Please Do Not Throw Sausage Pizza Away'.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is a MAC address?",
    shortAnswer: "A unique hardware identifier assigned to a network interface card (NIC).",
    explanation:
      "A Media Access Control (MAC) address is a 48-bit identifier burned into the NIC by the manufacturer. It is used for communication within a local network (Layer 2).",
    hint: "Like a serial number for your device's network card.",
    level: "intermediate",
    codeExample: "Example: 00:1A:2B:3C:4D:5E",
  },
  {
    question: "What is the difference between a hub, a switch, and a router?",
    shortAnswer:
      "Hub (dumb) broadcasts; switch (intelligent) forwards based on MAC; router (intelligent) forwards based on IP across networks.",
    explanation:
      "A hub simply repeats signals to all ports. A switch learns MAC addresses and forwards frames only to the destination port. A router connects different networks and uses IP addresses to route packets.",
    hint: "Hub = megaphone; switch = telephone operator; router = postal sorting office.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is bandwidth in networking?",
    shortAnswer: "The maximum data transfer rate of a network path.",
    explanation:
      "Bandwidth is measured in bits per second (bps) and represents the capacity of a link. Higher bandwidth allows more data to be transmitted in a given time.",
    hint: "Like the width of a highway – more lanes means more cars can travel.",
    level: "basic",
    codeExample: null,
  },
  {
    question: "What is latency?",
    shortAnswer: "The time delay between sending and receiving data.",
    explanation:
      "Latency is the time taken for a packet to travel from source to destination. It includes propagation delay, transmission delay, queuing delay, and processing delay. Measured in milliseconds.",
    hint: "Like the time it takes for a letter to arrive.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is a packet?",
    shortAnswer: "A unit of data transmitted over a network.",
    explanation:
      "Data is divided into smaller chunks called packets, each containing a header (with source/destination addresses and control info) and a payload (the actual data). This allows efficient and reliable transmission.",
    hint: "Like a letter with an envelope (header) and the message inside.",
    level: "basic",
    codeExample: null,
  },
  {
    question: "What is the difference between TCP and UDP?",
    shortAnswer: "TCP is connection-oriented and reliable; UDP is connectionless and faster but unreliable.",
    explanation:
      "TCP (Transmission Control Protocol) establishes a connection, ensures ordered delivery, and retransmits lost packets. UDP (User Datagram Protocol) sends packets without a connection and does not guarantee delivery, but is faster for real-time applications.",
    hint: "TCP = registered mail (tracked); UDP = postcard (fast, but may get lost).",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is a firewall?",
    shortAnswer: "A security system that monitors and controls network traffic.",
    explanation:
      "A firewall can be hardware or software and enforces security rules, allowing or blocking traffic based on ports, IP addresses, or protocols. It protects networks from unauthorized access.",
    hint: "Like a security guard at a building entrance.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is DNS?",
    shortAnswer: "The Domain Name System translates human-readable domain names to IP addresses.",
    explanation:
      "DNS is a distributed database that maps domain names (like google.com) to IP addresses (like 142.250.190.46). It is essential for using the internet without memorizing numbers.",
    hint: "Like a phonebook for the internet.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is a LAN?",
    shortAnswer: "A Local Area Network covers a small geographic area like a home or office.",
    explanation:
      "A LAN typically uses Ethernet or Wi-Fi and connects devices within a single building or campus. It offers high speed and low latency.",
    hint: "Think of your home Wi-Fi network.",
    level: "basic",
    codeExample: null,
  },
  {
    question: "What is a WAN?",
    shortAnswer: "A Wide Area Network spans a large geographic area, often a country or continent.",
    explanation:
      "A WAN connects multiple LANs together, usually via leased lines, satellite links, or the internet. The internet is the largest WAN.",
    hint: "Like connecting branch offices in different cities.",
    level: "basic",
    codeExample: null,
  },
  {
    question: "What is a VPN?",
    shortAnswer: "A Virtual Private Network creates a secure, encrypted tunnel over a public network.",
    explanation:
      "A VPN extends a private network across a public network (like the internet), allowing users to send and receive data as if their devices were directly connected to the private network. It enhances privacy and security.",
    hint: "Like a private, encrypted highway through a public road system.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is the difference between a client and a server?",
    shortAnswer: "A client requests services; a server provides services.",
    explanation:
      "In a client-server model, clients (like web browsers) send requests to servers (like web servers) which process and return the requested data. Servers are powerful and always on.",
    hint: "Client = customer; server = storekeeper.",
    level: "basic",
    codeExample: null,
  },
  {
    question: "What is a proxy server?",
    shortAnswer: "An intermediary server that forwards requests and responses between clients and other servers.",
    explanation:
      "A proxy server acts as a gateway, intercepting requests from clients. It can cache content, filter traffic, and hide the client's IP address for anonymity.",
    hint: "Like a middleman who can check and forward messages.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is a network topology?",
    shortAnswer: "The arrangement of nodes and links in a network.",
    explanation:
      "Topology describes the physical and logical layout of a network. Common topologies include bus, star, ring, mesh, tree, and hybrid. Each has trade-offs in cost, performance, and reliability.",
    hint: "Think of how devices are physically connected or logically organized.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is the significance of the TCP/IP model?",
    shortAnswer: "It is the practical implementation of networking protocols used on the internet.",
    explanation:
      "The TCP/IP model has four layers: Network Interface, Internet, Transport, and Application. It is simpler than OSI and forms the basis of modern internet communication.",
    hint: "It's the set of rules that actually runs the internet.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is a socket?",
    shortAnswer: "An endpoint for sending or receiving data across a network.",
    explanation:
      "A socket is defined by an IP address and a port number. It allows applications to establish communication channels. In programming, sockets are used to create network-aware applications.",
    hint: "Like a door through which data enters or exits.",
    level: "expert",
    codeExample: "In Python: socket.socket(socket.AF_INET, socket.SOCK_STREAM)",
  },
  {
    question: "What is a port number?",
    shortAnswer: "A number used to identify a specific process or service on a device.",
    explanation:
      "Port numbers range from 0 to 65535. Well-known ports (0-1023) are reserved for standard services like HTTP (80), HTTPS (443), FTP (21), etc. They help direct incoming traffic to the correct application.",
    hint: "Like an apartment number within a building (IP address).",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is the purpose of a subnet mask?",
    shortAnswer: "It divides an IP address into network and host portions.",
    explanation:
      "A subnet mask (e.g., 255.255.255.0) tells devices which part of an IP address belongs to the network and which part identifies a specific host on that network. It enables subnetting for better routing and security.",
    hint: "Like a postal code that identifies the larger area.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is DHCP?",
    shortAnswer: "Dynamic Host Configuration Protocol automatically assigns IP addresses to devices.",
    explanation:
      "DHCP eliminates manual IP configuration by providing an IP address, subnet mask, gateway, and DNS server to devices as they join the network. It is widely used in home and enterprise networks.",
    hint: "Like a receptionist who gives you a visitor badge with a temporary office number.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is NAT?",
    shortAnswer: "Network Address Translation maps private IP addresses to a public IP for internet access.",
    explanation:
      "NAT allows multiple devices on a private network to share a single public IP address. It is commonly implemented in routers to conserve IPv4 addresses and add a layer of security.",
    hint: "Like a receptionist who forwards external calls to internal extensions.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is an ARP request?",
    shortAnswer: "Address Resolution Protocol request finds the MAC address for a given IP address.",
    explanation:
      "ARP is used within a local network to resolve IP addresses to MAC addresses. Devices broadcast an ARP request, and the owner replies with its MAC address.",
    hint: "Like asking 'Who has this IP address? Please tell me your MAC.'",
    level: "expert",
    codeExample: null,
  },
  {
    question: "What is a network switch?",
    shortAnswer: "A device that connects devices on the same network and forwards data using MAC addresses.",
    explanation:
      "A switch operates at Layer 2 (Data Link) and learns which devices are connected to each port. It sends frames only to the intended recipient, improving efficiency and security compared to hubs.",
    hint: "Like a traffic officer directing cars to the correct lane.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is the difference between a public and private IP address?",
    shortAnswer: "Public IPs are globally unique on the internet; private IPs are used within local networks.",
    explanation:
      "Private IP addresses (e.g., 192.168.x.x, 10.x.x.x, 172.16.x.x) are not routable on the internet and are reused in many networks. Public IPs are assigned by ISPs and must be unique worldwide.",
    hint: "Private = internal office extension; public = office main phone number.",
    level: "intermediate",
    codeExample: null,
  },
  {
    question: "What is a packet sniffer?",
    shortAnswer: "A tool or software that captures and analyzes network packets.",
    explanation:
      "Packet sniffers (like Wireshark) allow network administrators to inspect traffic for troubleshooting, security analysis, and performance monitoring. They can be used for legitimate purposes or malicious eavesdropping.",
    hint: "Like a postal inspector who reads letters to check for issues.",
    level: "expert",
    codeExample: null,
  },
  {
    question: "What is QoS (Quality of Service)?",
    shortAnswer: "A set of techniques to manage network resources and prioritize certain types of traffic.",
    explanation:
      "QoS ensures that critical applications (like VoIP, video conferencing) receive sufficient bandwidth and low latency, even when the network is congested. It uses traffic shaping, prioritization, and queue management.",
    hint: "Like a VIP lane on a highway for emergency vehicles.",
    level: "expert",
    codeExample: null,
  },
];

export default questions;