// 25 Authentic CBSE Board Examination Questions for Topic 6
const questions = [
  {
    "id": 1,
    "question": "At which layer of the OSI reference model does a network router operate?",
    "options": [
      "Physical Layer (Layer 1)",
      "Data Link Layer (Layer 2)",
      "Network Layer (Layer 3)",
      "Transport Layer (Layer 4)"
    ],
    "answer": "Network Layer (Layer 3)",
    "explanation": "Routers operate at Layer 3 (Network Layer), inspecting logical IP addresses to forward packets across networks.",
    "hint": "Layer 3: Network Layer."
  },
  {
    "id": 2,
    "question": "What addressing scheme does a router use to make its packet forwarding decisions?",
    "options": [
      "Physical MAC Addresses",
      "Logical IP Addresses (IPv4 / IPv6)",
      "Email Addresses",
      "Port numbers only"
    ],
    "answer": "Logical IP Addresses (IPv4 / IPv6)",
    "explanation": "Routers forward packets based on logical Layer-3 IP addresses contained in the IP packet header.",
    "hint": "Logical IP addresses."
  },
  {
    "id": 3,
    "question": "What is the primary operational role of a network router?",
    "options": [
      "To connect two computers in the same room",
      "To connect separate, dissimilar networks (such as a local LAN to the Internet WAN) and determine the best path for packets",
      "To convert analog audio to video",
      "To amplify electrical signals across copper wire"
    ],
    "answer": "To connect separate, dissimilar networks (such as a local LAN to the Internet WAN) and determine the best path for packets",
    "explanation": "Routers route packets between different subnets and networks across the internetwork, choosing optimal paths.",
    "hint": "Routing packets between separate networks."
  },
  {
    "id": 4,
    "question": "How does a router handle standard broadcast frames (e.g. FF:FF:FF:FF:FF:FF or 255.255.255.255)?",
    "options": [
      "It forwards them to all connected networks in the world",
      "It blocks and drops broadcasts, creating separate broadcast domains for each of its interfaces",
      "It turns them into emails",
      "It sends them to the police"
    ],
    "answer": "It blocks and drops broadcasts, creating separate broadcast domains for each of its interfaces",
    "explanation": "Routers break broadcast domains by refusing to forward Layer-2 or Layer-3 broadcasts across interfaces.",
    "hint": "Routers break broadcast domains."
  },
  {
    "id": 5,
    "question": "What internal table does a router consult to determine the next-hop interface for an incoming IP packet?",
    "options": [
      "Routing Table",
      "CAM Table",
      "DNS Table",
      "ARP Cache"
    ],
    "answer": "Routing Table",
    "explanation": "A router consults its Routing Table, which maps network address prefixes to next-hop IP addresses and outgoing interfaces.",
    "hint": "Routing Table."
  },
  {
    "id": 6,
    "question": "What is the purpose of the 'Time-To-Live' (TTL) field decremented by routers in the IPv4 header?",
    "options": [
      "To show what time the email was typed",
      "To prevent packets from endlessly looping and congesting the network in case of routing loops",
      "To measure battery life",
      "To speed up the router"
    ],
    "answer": "To prevent packets from endlessly looping and congesting the network in case of routing loops",
    "explanation": "Every router decrements TTL by 1. If TTL reaches 0, the packet is discarded, preventing infinite routing loops.",
    "hint": "Prevents infinite loops."
  },
  {
    "id": 7,
    "question": "What is a 'Default Gateway' configured on a personal computer?",
    "options": [
      "The IP address of the local router's interface that forwards traffic destined outside the local subnet",
      "The password to access the computer",
      "The website of Microsoft",
      "The physical cable plugged into the wall"
    ],
    "answer": "The IP address of the local router's interface that forwards traffic destined outside the local subnet",
    "explanation": "The default gateway is the local router's IP address where nodes send traffic destined for external networks.",
    "hint": "Local router's IP address."
  },
  {
    "id": 8,
    "question": "Which of the following routing protocols is an interior gateway distance-vector protocol based on hop count?",
    "options": [
      "RIP (Routing Information Protocol)",
      "BGP",
      "HTTP",
      "SMTP"
    ],
    "answer": "RIP (Routing Information Protocol)",
    "explanation": "RIP uses hop count (max 15 hops) as its routing metric to share routing information between routers.",
    "hint": "Routing Information Protocol."
  },
  {
    "id": 9,
    "question": "Which routing protocol is an interior link-state protocol that uses Dijkstra's algorithm to calculate the shortest path?",
    "options": [
      "OSPF (Open Shortest Path First)",
      "RIP",
      "FTP",
      "Telnet"
    ],
    "answer": "OSPF (Open Shortest Path First)",
    "explanation": "OSPF uses link-state advertisements and Dijkstra's algorithm to determine the shortest and fastest path through a network.",
    "hint": "Open Shortest Path First."
  },
  {
    "id": 10,
    "question": "What is 'Network Address Translation' (NAT) performed by routers connecting home/office LANs to the Internet?",
    "options": [
      "Translating English web pages to Hindi",
      "Translating private, non-routable local IP addresses (RFC 1918) into a single public routable IP address",
      "Changing the physical shape of the router",
      "Translating music to video"
    ],
    "answer": "Translating private, non-routable local IP addresses (RFC 1918) into a single public routable IP address",
    "explanation": "NAT maps multiple private internal IP addresses to a single public IP address, conserving IPv4 space and providing security.",
    "hint": "Translates private IPs to a public IP."
  },
  {
    "id": 11,
    "question": "In a CBSE 5-mark Case Study: Which device must be installed to connect an internal school network to an Internet Service Provider (ISP)?",
    "options": [
      "Router",
      "Repeater",
      "Passive Hub",
      "Coaxial Terminator"
    ],
    "answer": "Router",
    "explanation": "Connecting a local private network to an external WAN / ISP requires a Router to handle IP routing across networks.",
    "hint": "Device that connects a LAN to an external ISP."
  },
  {
    "id": 12,
    "question": "What is the difference between a Switch and a Router?",
    "options": [
      "A switch forwards frames within a local network using MAC addresses; a router routes packets between different networks using IP addresses",
      "A switch is wireless; a router is wired",
      "A router has zero ports; a switch has 100 ports",
      "They are the exact same device with different names"
    ],
    "answer": "A switch forwards frames within a local network using MAC addresses; a router routes packets between different networks using IP addresses",
    "explanation": "Switches operate at Layer 2 using MAC addresses inside a subnet; routers operate at Layer 3 using IP addresses across subnets.",
    "hint": "Layer 2 MAC forwarding vs Layer 3 IP routing."
  },
  {
    "id": 13,
    "question": "What is 'Static Routing'?",
    "options": [
      "When the router does not move physically",
      "When a network administrator manually enters fixed routing paths into the routing table",
      "When the router runs out of electricity",
      "When the network speed stays at 0 Mbps"
    ],
    "answer": "When a network administrator manually enters fixed routing paths into the routing table",
    "explanation": "Static routing involves manual configuration of route destinations by an administrator rather than automated routing protocol discovery.",
    "hint": "Manually configured fixed routes."
  },
  {
    "id": 14,
    "question": "What is 'Dynamic Routing'?",
    "options": [
      "When routers run while shaking",
      "When routers automatically learn, calculate, and update routes using protocols like OSPF and BGP in response to topology changes",
      "When users change their passwords every day",
      "When cables are plugged and unplugged continuously"
    ],
    "answer": "When routers automatically learn, calculate, and update routes using protocols like OSPF and BGP in response to topology changes",
    "explanation": "Dynamic routing protocols automatically discover neighboring routes, adapt to link failures, and choose optimal paths.",
    "hint": "Automated route discovery and adaptation."
  },
  {
    "id": 15,
    "question": "What exterior gateway routing protocol is used by core routers to manage routing paths across the global Internet backbone?",
    "options": [
      "BGP (Border Gateway Protocol)",
      "RIP",
      "ICMP",
      "ARP"
    ],
    "answer": "BGP (Border Gateway Protocol)",
    "explanation": "BGP (Border Gateway Protocol) is the de facto routing protocol that exchanges routing information between Autonomous Systems (AS) on the Internet.",
    "hint": "Border Gateway Protocol."
  },
  {
    "id": 16,
    "question": "What is 'Packet Filtering' on a router?",
    "options": [
      "Cleaning the dust off packets",
      "Inspecting source/destination IP addresses and port numbers to accept or deny packets according to Access Control Lists (ACLs)",
      "Deleting large video files",
      "Converting packets to text files"
    ],
    "answer": "Inspecting source/destination IP addresses and port numbers to accept or deny packets according to Access Control Lists (ACLs)",
    "explanation": "Routers use Access Control Lists (ACLs) to inspect packet headers and filter traffic, functioning as basic firewalls.",
    "hint": "Filtering traffic using Access Control Lists."
  },
  {
    "id": 17,
    "question": "How many collision domains and broadcast domains does a 4-interface router create?",
    "options": [
      "4 separate collision domains and 4 separate broadcast domains",
      "1 collision domain and 1 broadcast domain",
      "4 collision domains and 1 broadcast domain",
      "Zero collision domains"
    ],
    "answer": "4 separate collision domains and 4 separate broadcast domains",
    "explanation": "Each router interface is its own independent collision domain AND its own independent broadcast domain.",
    "hint": "Each router interface isolates both collision and broadcast domains."
  },
  {
    "id": 18,
    "question": "What is 'Hop Count' in router metrics?",
    "options": [
      "The number of times a packet bounces on the desk",
      "The number of intermediate routers a packet must pass through to reach its destination",
      "The number of users connected",
      "The length of the cable in meters"
    ],
    "answer": "The number of intermediate routers a packet must pass through to reach its destination",
    "explanation": "Hop count represents the number of router transits along the path from source to destination.",
    "hint": "Number of intermediate routers traversed."
  },
  {
    "id": 19,
    "question": "What is a 'Wireless Router' found in homes and small offices?",
    "options": [
      "A device that combines a Router, an Ethernet Switch, a Firewall, and a Wi-Fi Access Point into a single physical unit",
      "A router made without any plastic",
      "A router that only works in space",
      "A radio antenna without any internet"
    ],
    "answer": "A device that combines a Router, an Ethernet Switch, a Firewall, and a Wi-Fi Access Point into a single physical unit",
    "explanation": "Consumer wireless routers are multifunction devices integrating a router, multi-port switch, wireless AP, and NAT firewall.",
    "hint": "Combines a router, switch, and Wi-Fi access point."
  },
  {
    "id": 20,
    "question": "What is 'Convergence' in dynamic routing networks?",
    "options": [
      "When all routers in an internetwork have updated, consistent, and agreed-upon routing tables following a topology change",
      "When all computers crash together",
      "When two cables cross each other",
      "When the internet runs out of addresses"
    ],
    "answer": "When all routers in an internetwork have updated, consistent, and agreed-upon routing tables following a topology change",
    "explanation": "Convergence is the state where all routers have synchronized their routing tables after a network change.",
    "hint": "Routers reach a consistent view of the network."
  },
  {
    "id": 21,
    "question": "True or False: A standard Layer-2 switch can forward packets between two completely different IP subnets (e.g. 192.168.1.0/24 and 10.0.0.0/8) without a router.",
    "options": [
      "True",
      "False",
      "Only on Mondays",
      "Only if connected with optical fiber"
    ],
    "answer": "False",
    "explanation": "Traffic crossing from one IP subnet to a different IP subnet requires Layer-3 routing (a Router or Layer-3 Switch).",
    "hint": "Crossing subnets requires Layer-3 routing."
  },
  {
    "id": 22,
    "question": "What protocol allows a host computer to automatically discover its default gateway router's IP address upon joining a network?",
    "options": [
      "DHCP (Dynamic Host Configuration Protocol)",
      "DNS",
      "FTP",
      "SNMP"
    ],
    "answer": "DHCP (Dynamic Host Configuration Protocol)",
    "explanation": "DHCP assigns the host its IP address, subnet mask, DNS servers, and the IP address of its Default Gateway router.",
    "hint": "Dynamic Host Configuration Protocol."
  },
  {
    "id": 23,
    "question": "What diagnostic utility uses ICMP echo requests and TTL expiration to display the step-by-step route and list all routers traversed to a destination?",
    "options": [
      "traceroute (or tracert in Windows)",
      "ipconfig",
      "mkdir",
      "cls"
    ],
    "answer": "traceroute (or tracert in Windows)",
    "explanation": "The traceroute utility increments TTL to discover each successive router along the path to the destination.",
    "hint": "Traces the route across routers."
  },
  {
    "id": 24,
    "question": "What happens if a router has no route in its routing table matching the destination IP of an incoming packet, and no default route is configured?",
    "options": [
      "The router drops the packet and sends an ICMP 'Destination Unreachable' error to the sender",
      "The router broadcasts it to all computers",
      "The router reboots",
      "The router stores the packet forever"
    ],
    "answer": "The router drops the packet and sends an ICMP 'Destination Unreachable' error to the sender",
    "explanation": "If a destination IP cannot be matched to any route or default gateway, the packet is discarded and an ICMP error is returned.",
    "hint": "Drops packet and returns Destination Unreachable."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Identify the device that operates on Layer 3 and connects two different networks using IP addresses.' What is the answer?",
    "options": [
      "Router",
      "Hub",
      "Switch",
      "Repeater"
    ],
    "answer": "Router",
    "explanation": "A Router operates at Layer 3 to connect different networks based on logical IP addresses.",
    "hint": "Layer-3 device connecting different networks."
  }
];

export default questions;
