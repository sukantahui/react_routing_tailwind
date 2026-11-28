export default [
  {
    "id": 1,
    "question": "What is the primary role of the Domain Name System (DNS) in the Internet infrastructure?",
    "options": [
      "To translate human-friendly domain names (e.g. `www.cbse.gov.in`) into machine-routable numerical IP addresses (e.g. `164.100.107.50`).",
      "To format hard drives on web servers.",
      "To calculate the electricity bill of the data center.",
      "To compress MP3 audio files."
    ],
    "correctAnswer": 0,
    "explanation": "DNS acts as the phonebook of the Internet, translating human-memorizable hostnames into numerical IP addresses needed by network routers.",
    "hint": "Translates domain names to IP addresses."
  },
  {
    "id": 2,
    "question": "What does URL stand for in computer networking?",
    "options": [
      "Uniform Resource Locator",
      "Universal Routing Line",
      "Unified Radio Link",
      "Unique Retrieval Logic"
    ],
    "correctAnswer": 0,
    "explanation": "URL stands for Uniform Resource Locator, a formatted text string specifying the exact location and access protocol of a resource on the web.",
    "hint": "Uniform Resource Locator."
  },
  {
    "id": 3,
    "question": "In the URL `https://www.cbse.gov.in:443/exams/datesheet.html?year=2026#sectionA`, what component is represented by `https`?",
    "options": [
      "Protocol / Scheme",
      "Domain Name",
      "Port Number",
      "Query Parameter"
    ],
    "correctAnswer": 0,
    "explanation": "`https` is the Scheme or Protocol specifier indicating how the resource should be fetched.",
    "hint": "The protocol used to access the resource."
  },
  {
    "id": 4,
    "question": "In the URL `https://www.cbse.gov.in:443/exams/datesheet.html?year=2026#sectionA`, what component is `www.cbse.gov.in`?",
    "options": [
      "Domain Name (Host)",
      "Port Number",
      "Path",
      "Fragment Identifier"
    ],
    "correctAnswer": 0,
    "explanation": "`www.cbse.gov.in` is the Fully Qualified Domain Name (FQDN) or Host identifying the server.",
    "hint": "The host server domain name."
  },
  {
    "id": 5,
    "question": "In the URL `https://www.cbse.gov.in:443/exams/datesheet.html?year=2026#sectionA`, what does `?year=2026` represent?",
    "options": [
      "Query String (Parameters)",
      "Anchor / Fragment",
      "Top-Level Domain",
      "File extension"
    ],
    "correctAnswer": 0,
    "explanation": "The query string begins with `?` and carries key-value parameters passed to the server-side application.",
    "hint": "Query string parameters."
  },
  {
    "id": 6,
    "question": "In the domain name `www.cbse.gov.in`, what is `.in` formally classified as?",
    "options": [
      "ccTLD (Country Code Top-Level Domain)",
      "gTLD (Generic Top-Level Domain)",
      "Subdomain",
      "Port number"
    ],
    "correctAnswer": 0,
    "explanation": "`.in` is India's designated Country Code Top-Level Domain (ccTLD).",
    "hint": "ccTLD indicates national country jurisdiction."
  },
  {
    "id": 7,
    "question": "Which of the following is an example of a Generic Top-Level Domain (gTLD)?",
    "options": [
      ".com",
      ".org",
      ".edu",
      "All of the above"
    ],
    "correctAnswer": 3,
    "explanation": "`.com` (commercial), `.org` (organization), and `.edu` (educational) are classic generic TLDs.",
    "hint": "All three are generic top-level domains."
  },
  {
    "id": 8,
    "question": "What is an IPv4 address composed of?",
    "options": [
      "32 bits, divided into 4 octets separated by dots (e.g. 192.168.1.1)",
      "48 bits in hexadecimal format separated by colons",
      "128 bits separated by hyphens",
      "64 bits in octal format"
    ],
    "correctAnswer": 0,
    "explanation": "IPv4 addresses are 32 bits (4 bytes) long, represented in dotted decimal notation where each octet ranges from 0 to 255.",
    "hint": "32 bits / 4 decimal octets."
  },
  {
    "id": 9,
    "question": "Which of the following is an INVALID IPv4 address?",
    "options": [
      "192.168.1.1",
      "10.0.0.254",
      "172.16.290.1",
      "127.0.0.1"
    ],
    "correctAnswer": 2,
    "explanation": "Each octet in IPv4 must range between 0 and 255. `290` is outside the 8-bit range, making `172.16.290.1` invalid.",
    "hint": "Octets cannot exceed 255."
  },
  {
    "id": 10,
    "question": "What is an IPv6 address composed of?",
    "options": [
      "128 bits, written as 8 groups of 4 hexadecimal digits separated by colons",
      "32 bits separated by commas",
      "64 bits in binary",
      "48 bits in octal"
    ],
    "correctAnswer": 0,
    "explanation": "IPv6 uses 128 bits represented as 8 hexadecimal quartets (e.g., `2001:0db8:85a3:0000:0000:8a2e:0370:7334`).",
    "hint": "128 bits in 8 hexadecimal blocks."
  },
  {
    "id": 11,
    "question": "Why was IPv6 developed to supersede IPv4?",
    "options": [
      "To prevent global IP address exhaustion, expanding address space from 4.3 billion (2^32) to 3.4 x 10^38 (2^128) addresses.",
      "Because IPv4 cables stopped working.",
      "Because IPv4 could not display emojis.",
      "Because IPv4 required manual telephone operators."
    ],
    "correctAnswer": 0,
    "explanation": "The explosive growth of smartphones and IoT devices exhausted the 4.3 billion IPv4 address pool, necessitating IPv6's vast 128-bit space.",
    "hint": "Solves IPv4 address exhaustion."
  },
  {
    "id": 12,
    "question": "What is a 'Private IP Address' (RFC 1918)?",
    "options": [
      "An IP address reserved exclusively for internal LAN use that is not routable on the public Internet (e.g. 192.168.x.x, 10.x.x.x).",
      "An IP address hidden by an incognito tab.",
      "A secret IP address used only by government spies.",
      "An IP address with no numbers."
    ],
    "correctAnswer": 0,
    "explanation": "Private IP addresses are non-routable on the public Internet and can be reused inside separate private home and office networks.",
    "hint": "Non-routable on the public internet; used in internal LANs."
  },
  {
    "id": 13,
    "question": "Which technology translates multiple internal private IP addresses into a single public IP address when accessing the Internet?",
    "options": [
      "NAT (Network Address Translation)",
      "DNS",
      "DHCP",
      "ARP"
    ],
    "correctAnswer": 0,
    "explanation": "NAT translates private IP addresses to a public routable IP at the router boundary, conserving public IPv4 addresses.",
    "hint": "Network Address Translation."
  },
  {
    "id": 14,
    "question": "What is the function of a 'DHCP' (Dynamic Host Configuration Protocol) server on a local network?",
    "options": [
      "To automatically assign IP addresses, subnet masks, default gateways, and DNS server addresses to client devices as they connect.",
      "To store digital movies for streaming.",
      "To cool the server room.",
      "To encrypt passwords using quantum physics."
    ],
    "correctAnswer": 0,
    "explanation": "DHCP automates network configuration, assigning dynamic IP parameters dynamically to connecting clients.",
    "hint": "Automatically assigns IP addresses to devices."
  },
  {
    "id": 15,
    "question": "What is a 'Static IP Address'?",
    "options": [
      "A permanent, manually configured IP address that does not change over time, typically assigned to servers and network printers.",
      "An IP address generated by static electricity.",
      "An IP address that changes every 5 seconds.",
      "An IP address used only in airplanes."
    ],
    "correctAnswer": 0,
    "explanation": "Static IP addresses are assigned permanently to dedicated infrastructure (web servers, DNS servers) so their network location is constant.",
    "hint": "Permanent, manually configured address."
  },
  {
    "id": 16,
    "question": "What does the special IPv4 address `127.0.0.1` (or hostname `localhost`) represent?",
    "options": [
      "The Loopback Address, referring to the local computer itself for internal testing without sending packets across a physical network.",
      "The main central router of the Internet.",
      "The official Google server.",
      "A corrupted broadcast address."
    ],
    "correctAnswer": 0,
    "explanation": "`127.0.0.1` is the loopback interface used for local TCP/IP stack diagnostic testing.",
    "hint": "Loopback address referencing the local host."
  },
  {
    "id": 17,
    "question": "What is the purpose of a 'Subnet Mask' in IPv4 networking?",
    "options": [
      "To distinguish which portion of the 32-bit IP address belongs to the Network ID and which portion belongs to the Host ID.",
      "To hide the IP address from hackers.",
      "To increase internet download speed.",
      "To translate domain names into English."
    ],
    "correctAnswer": 0,
    "explanation": "The subnet mask (e.g. `255.255.255.0`) performs a bitwise AND with the IP address to separate the Network ID from the Host ID.",
    "hint": "Separates Network ID from Host ID."
  },
  {
    "id": 18,
    "question": "Which of the following IP address ranges is defined by RFC 1918 as Private Class C space?",
    "options": [
      "192.168.0.0 to 192.168.255.255",
      "10.0.0.0 to 10.255.255.255",
      "172.16.0.0 to 172.31.255.255",
      "127.0.0.0 to 127.255.255.255"
    ],
    "correctAnswer": 0,
    "explanation": "`192.168.0.0/16` is the standard private Class C range universally deployed in home Wi-Fi routers.",
    "hint": "192.168.x.x range."
  },
  {
    "id": 19,
    "question": "What type of DNS server sits at the absolute top of the DNS hierarchical tree, represented conceptually by a dot (`.`)?",
    "options": [
      "DNS Root Name Server",
      "Top-Level Domain (TLD) Server",
      "Authoritative Name Server",
      "Local Resolving Server"
    ],
    "correctAnswer": 0,
    "explanation": "The 13 root name server clusters sit at the top of the DNS hierarchy, directing queries to the appropriate TLD servers.",
    "hint": "Root Name Server."
  },
  {
    "id": 20,
    "question": "What is the difference between an 'Authoritative DNS Server' and a 'Recursive DNS Resolver'?",
    "options": [
      "An Authoritative server holds the official DNS records for a specific domain; a Recursive resolver queries other servers on behalf of the client until it finds the IP.",
      "An Authoritative server is in India; a Recursive server is in the US.",
      "An Authoritative server is wireless; a Recursive server is wired.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "Recursive resolvers (like Google DNS 8.8.8.8) track down DNS records; Authoritative servers hold the official mapping for that domain.",
    "hint": "Holds official records vs searches on behalf of client."
  },
  {
    "id": 21,
    "question": "What is 'DNS Caching' performed by operating systems and web browsers?",
    "options": [
      "Storing recent domain-to-IP lookup results locally in memory to eliminate repeated network DNS queries, speeding up web browsing.",
      "Selling domain names for cryptocurrency.",
      "Deleting invalid bookmarks.",
      "Encrypting web browser cookies."
    ],
    "correctAnswer": 0,
    "explanation": "DNS caching temporarily saves resolved IP addresses in local cache for the duration of the TTL (Time to Live) to accelerate loading.",
    "hint": "Temporary local storage of resolved IP addresses."
  },
  {
    "id": 22,
    "question": "What command in Windows PowerShell or Linux terminal queries DNS servers to display the IP address mapped to a domain name?",
    "options": [
      "nslookup (or dig)",
      "format",
      "reboot",
      "dir"
    ],
    "correctAnswer": 0,
    "explanation": "`nslookup domain.com` or `dig domain.com` queries DNS servers to inspect resource records.",
    "hint": "nslookup."
  },
  {
    "id": 23,
    "question": "What is the maximum number of decimal octets in a valid IPv4 address?",
    "options": [
      "4 octets",
      "6 octets",
      "8 octets",
      "16 octets"
    ],
    "correctAnswer": 0,
    "explanation": "IPv4 consists of exactly 4 octets separated by dots (e.g. `203.0.113.195`).",
    "hint": "4 octets."
  },
  {
    "id": 24,
    "question": "In a CBSE 2-mark question: 'Identify the components of the URL: https://www.cbse.nic.in/welcome.htm' What is the breakdown?",
    "options": [
      "Protocol: https; Domain/Host: www.cbse.nic.in; File/Path: welcome.htm",
      "Protocol: cbse; Domain: https; Path: nic.in",
      "Protocol: welcome; Domain: htm; Path: cbse",
      "Protocol: www; Domain: nic; Path: in"
    ],
    "correctAnswer": 0,
    "explanation": "`https` is the protocol, `www.cbse.nic.in` is the domain name, and `welcome.htm` is the resource file path.",
    "hint": "Protocol, Domain, and File Path."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination case study, why would an examiner ask you to explain why a computer laboratory's internal computers use private IP addresses while the school's router uses a public IP address?",
    "options": [
      "To explain that private IP addresses save scarce public IPv4 addresses and enhance internal security, with NAT allowing all lab computers to share one public IP for internet access.",
      "Because private IP addresses are free from the government.",
      "Because public IP addresses do not work with Windows.",
      "Because private IP addresses cannot play games."
    ],
    "correctAnswer": 0,
    "explanation": "Private IPs conserve address space and shield internal workstations, while NAT on the edge router multiplexes their external internet traffic onto one public IP.",
    "hint": "Conserves public IP addresses and enhances internal network security."
  }
];
