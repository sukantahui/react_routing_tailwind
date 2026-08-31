// topic28_questions.js
// 30 Moderate to Expert Questions on MAC (Media Access Control) Addresses in Computer Networking and Cyber Security

const questions = [
  {
    question: "What is a MAC (Media Access Control) Address in computer networking?",
    shortAnswer: "A MAC Address is a unique 48-bit (6-byte) physical hardware identifier permanently burned into the non-volatile EEPROM/ROM of a Network Interface Card (NIC) by the hardware manufacturer.",
    explanation: "Operating at OSI Layer 2 (Data Link Layer), the MAC address provides flat, link-local physical addressing to deliver Ethernet frames between directly connected devices on a local switch fabric.",
    hint: "Permanent 48-bit hardware address burned into your network interface card.",
    level: "moderate",
    codeExample: "MACAddress = '00:1A:2B:3C:4D:5E'; // 6 octets in hexadecimal"
  },
  {
    question: "What are the two 24-bit halves that make up a standard 48-bit MAC address?",
    shortAnswer: "1. Organizationally Unique Identifier (OUI - First 24 bits / 3 bytes) identifying the hardware manufacturer, and 2. Network Interface Controller Specific Identifier (Device Serial - Last 24 bits / 3 bytes).",
    explanation: "The IEEE Registration Authority assigns OUIs to hardware vendors (e.g., Cisco, Intel, Apple), and vendors assign sequential 24-bit serial numbers to individual NICs.",
    hint: "First 24 bits: Vendor OUI; Last 24 bits: Unique Device Serial.",
    level: "moderate",
    codeExample: "OUI = '00:1A:2B' (Intel Corp); DeviceSerial = '3C:4D:5E';"
  },
  {
    question: "What do the I/G (Individual/Group) and U/L (Universal/Local) bits in the first octet of a MAC address signify?",
    shortAnswer: "Bit 0 (I/G) indicates Unicast (0) vs Multicast/Broadcast (1); Bit 1 (U/L) indicates Globally Unique OUI (0) vs Locally Administered Address / LAA (1).",
    explanation: "If Bit 0 is 1, the frame is targeted to a multicast group or broadcast. If Bit 1 is 1, the MAC address was locally generated or randomized by the operating system rather than assigned by IEEE.",
    hint: "Bit 0: Unicast/Multicast; Bit 1: Global IEEE OUI / Local Randomized.",
    level: "expert",
    codeExample: "FirstOctet = 0x02; // Binary 00000010 → Bit 1 is 1 (Locally Administered MAC)"
  },
  {
    question: "What is the universal Broadcast MAC Address and which devices process it?",
    shortAnswer: "FF:FF:FF:FF:FF:FF (all 48 bits set to binary 1s), which is received and processed by EVERY active host interface within the local broadcast domain/VLAN.",
    explanation: "Switches flood frames addressed to `FF:FF:FF:FF:FF:FF` out of all active ports except the incoming ingress port (e.g. for ARP Requests and DHCP Discover).",
    hint: "FF:FF:FF:FF:FF:FF reaches every device in the local network.",
    level: "basic",
    codeExample: "BroadcastMAC = 'FF:FF:FF:FF:FF:FF'; // 11111111.11111111.11111111.11111111.11111111.11111111"
  },
  {
    question: "What is the Content Addressable Memory (CAM) Table inside a network switch?",
    shortAnswer: "A high-speed hardware lookup table in a switch that maps learned source MAC addresses to their corresponding physical switch port numbers and VLAN IDs with an aging timer (default 300 seconds).",
    explanation: "When a frame enters Port 1 from MAC A, the switch records `[MAC A → Port 1]`. When subsequent traffic is destined for MAC A, the switch forwards the frame directly to Port 1 without flooding.",
    hint: "Switch table mapping MAC addresses to physical port numbers.",
    level: "moderate",
    codeExample: "camTable.learn(sourceMAC = '00:1A:2B:3C:4D:5E', ingressPort = 1, vlan = 10);"
  },
  {
    question: "What is a MAC Flooding Attack and how does it compromise switch security?",
    shortAnswer: "An attacker sends hundreds of thousands of frames with randomly generated fake source MAC addresses to exhaust the switch's CAM table memory, forcing the switch into 'fail-open' broadcast hub mode so the attacker can sniff all LAN traffic.",
    explanation: "When the CAM table overflows, the switch cannot learn new addresses and floods every frame out of all ports, exposing private traffic to packet sniffers.",
    hint: "Floods fake MACs to overflow switch memory, turning it into a dumb broadcast hub.",
    level: "expert",
    codeExample: "macof -i eth0 -n 100000 // Floods 100K randomized MAC addresses to exhaust CAM"
  },
  {
    question: "How does Switch Port Security mitigate MAC Flooding and unauthorized device connections?",
    shortAnswer: "Port Security limits the maximum number of MAC addresses allowed on a switch port (e.g., `switchport port-security maximum 1`) and automatically shuts down the port if an unauthorized MAC is detected.",
    explanation: "Administrators in Barrackpore configure port security with sticky MAC learning (`switchport port-security mac-address sticky`) to lock each wall jack strictly to the assigned employee desktop.",
    hint: "Restricts how many MAC addresses can connect to a port, blocking unauthorized devices.",
    level: "expert",
    codeExample: "switchport port-security; switchport port-security maximum 1; switchport port-security violation shutdown;"
  },
  {
    question: "What is MAC Address Spoofing and how can an attacker exploit it?",
    shortAnswer: "The software modification of a network adapter's active MAC address to impersonate an authorized device, bypass captive portal Wi-Fi billing in hotels/airports, or bypass MAC address whitelist filters.",
    explanation: "While the hardware EEPROM is read-only, operating system drivers allow users to override the active MAC address in RAM using tools like `macchanger` or `ip link`.",
    hint: "Changing your MAC address in software to bypass security filters.",
    level: "moderate",
    codeExample: "macchanger -m 00:11:22:33:44:55 eth0 // Changes active MAC address"
  },
  {
    question: "What is Private Wi-Fi MAC Address Randomization in modern smartphones (iOS / Android)?",
    shortAnswer: "A privacy feature where smartphones generate a randomized Locally Administered MAC address (LAA) for each Wi-Fi network they connect to, preventing retail stores and data brokers from tracking user physical movements.",
    explanation: "Randomized MACs always have the second least-significant bit set to 1 in the first octet (e.g., `x2:xx:xx:xx:xx:xx`, `x6:xx:xx:xx:xx:xx`, `xA:xx:xx:xx:xx:xx`, `xE:xx:xx:xx:xx:xx`).",
    hint: "Phones generate fake MAC addresses on public Wi-Fi to stop advertisers from tracking you.",
    level: "expert",
    codeExample: "RandomizedMAC_Prefixes = ['x2', 'x6', 'xA', 'xE']; // Locally Administered Bit = 1"
  },
  {
    question: "What is the standard MAC address format used by IPv4 Multicast transmissions?",
    shortAnswer: "IPv4 multicast packets are mapped to Ethernet destination MAC addresses starting with the fixed 24-bit prefix 01:00:5E followed by the lower 23 bits of the multicast IP address (01:00:5E:00:00:00 to 01:00:5E:7F:FF:FF).",
    explanation: "Because only 23 bits of the 28-bit multicast IP are mapped, 32 different multicast IP addresses share the same Layer 2 multicast MAC address.",
    hint: "Starts with 01:00:5E for IPv4 multicast streams.",
    level: "expert",
    codeExample: "MulticastMAC = '01:00:5E' + (MulticastIP_Last23Bits.toHex());"
  },
  {
    question: "How does a MAC address differ fundamentally from an IP address?",
    shortAnswer: "A MAC address is a permanent 48-bit flat physical hardware address used for local frame delivery on the same subnet (Layer 2); an IP address is a 32/128-bit hierarchical logical address used for routing across global networks (Layer 3).",
    explanation: "Think of an IP address as your postal home street address (changes when you move to Kolkata), while your MAC address is your permanent fingerprint/DNA.",
    hint: "MAC is permanent local hardware ID; IP is logical routable network address.",
    level: "moderate",
    codeExample: "MAC = 'Physical / Flat / Local Subnet'; IP = 'Logical / Hierarchical / Global Routing';"
  },
  {
    question: "What is EUI-64 (Extended Unique Identifier 64-bit) in IPv6 SLAAC address autoconfiguration?",
    shortAnswer: "A method that converts a 48-bit MAC address into a 64-bit IPv6 interface ID by splitting the MAC in half, inserting the hex value FFFE in the middle, and inverting the 7th bit (Universal/Local bit).",
    explanation: "For example, MAC `00:1A:2B:3C:4D:5E` becomes IPv6 Interface ID `021a:2bff:fe3c:4d5e` for stateless automatic address configuration (SLAAC).",
    hint: "Inserts FFFE into the middle of a 48-bit MAC address and flips the 7th bit for IPv6.",
    level: "expert",
    codeExample: "EUI64('00:1A:2B:3C:4D:5E') => '021a:2bff:fe3c:4d5e';"
  },
  {
    question: "Suppose Debangshu in Barrackpore inspects a switch port and sees the MAC address `00:50:56:A1:B2:C3`. Which vendor manufactured this network interface?",
    shortAnswer: "VMware Inc. (OUI `00:50:56` is assigned to VMware for virtual machine vNIC interfaces).",
    explanation: "Network administrators recognize standard OUIs during security audits to identify virtual machines (`00:50:56`), Cisco routers (`00:00:0C`), or Apple devices (`00:03:93`).",
    hint: "OUI 00:50:56 is the registered vendor prefix for VMware virtual machines.",
    level: "moderate",
    codeExample: "OUI_Lookup('00:50:56') => 'VMware, Inc. Virtual NIC';"
  },
  {
    question: "What is the aging timer for a switch CAM table entry and why does it exist?",
    shortAnswer: "The aging timer (typically 300 seconds / 5 minutes) automatically purges dynamic MAC address entries that have been inactive to free up switch memory and adapt when laptops move to different switch ports.",
    explanation: "If Susmita unplugs her laptop from Port 1 and plugs it into Port 12, the switch updates its CAM table immediately upon seeing her new frame, clearing the stale Port 1 entry.",
    hint: "Purges old MAC entries after 5 minutes so laptops can move between switch ports.",
    level: "moderate",
    codeExample: "if (idleTimeSeconds > 300) camTable.deleteEntry(macAddress);"
  },
  {
    question: "What is a 'Burned-In Address' (BIA) on a Network Interface Card?",
    shortAnswer: "The permanent factory-assigned MAC address etched into the hardware ROM/EEPROM silicon chip of the NIC that serves as the hardware's default physical identity.",
    explanation: "When a computer powers on, the NIC driver reads the BIA from ROM into operating memory; if spoofing is enabled, the driver substitutes the active MAC in RAM while the BIA remains in ROM.",
    hint: "The permanent factory MAC address permanently etched into the chip.",
    level: "basic",
    codeExample: "BIA = nicROM.readHardwareMAC(); // Permanent physical address"
  },
  {
    question: "What happens when a switch receives a frame destined for an 'Unknown Unicast' MAC address?",
    shortAnswer: "The switch performs 'Unknown Unicast Flooding'—it copies and forwards the frame out of every active port on the VLAN except the port on which the frame arrived.",
    explanation: "Once the true destination host replies, the switch learns its MAC address and updates its CAM table, reverting back to point-to-point forwarding for subsequent frames.",
    hint: "Floods the frame to all ports on that VLAN until the destination host replies.",
    level: "expert",
    codeExample: "if (!camTable.has(destMAC)) switch.floodToVLANPorts(frame, excludeIngressPort);"
  },
  {
    question: "What is Static MAC Binding in managed network switches?",
    shortAnswer: "Manually configuring a permanent `[MAC → Port]` entry in the switch configuration that never ages out and cannot be overwritten by dynamic learning, preventing MAC spoofing.",
    explanation: "Critical servers in Kolkata have static MAC bindings configured on core switch ports to guarantee that rogue machines cannot hijack server traffic.",
    hint: "Permanently locks a specific MAC address to a specific physical switch port.",
    level: "expert",
    codeExample: "mac address-table static 001a.2b3c.4d5e vlan 10 interface GigabitEthernet0/1"
  },
  {
    question: "What is 802.1X Port-Based Network Access Control (PNAC) and how does it use MAC addresses?",
    shortAnswer: "802.1X is an enterprise security standard that holds switch ports in an unauthorized state until client credentials or certificates are validated via a RADIUS server; fallback MAC Authentication Bypass (MAB) uses the MAC address for non-802.1X devices like printers.",
    explanation: "MAB checks the printer's MAC against an authorized database to place it on an isolated IoT VLAN without human login.",
    hint: "Security standard that blocks switch ports until the device is authenticated via RADIUS.",
    level: "expert",
    codeExample: "radiusServer.authenticate(clientCertificate) => switchPort.openAccess();"
  },
  {
    question: "What are the common notation formats used to represent a 48-bit MAC address?",
    shortAnswer: "1. Colon-Hexadecimal: 00:1A:2B:3C:4D:5E (Linux/macOS), 2. Hyphen-Hexadecimal: 00-1A-2B-3C-4D-5E (Windows), 3. Dotted-Hexadecimal: 001a.2b3c.4d5e (Cisco IOS).",
    explanation: "All three notations represent the exact same 48-bit binary number formatted for different operating system user interfaces.",
    hint: "Colon format (Linux), Hyphen format (Windows), Dotted format (Cisco).",
    level: "basic",
    codeExample: "Formats = ['00:1A:2B:3C:4D:5E', '00-1A-2B-3C-4D-5E', '001a.2b3c.4d5e'];"
  },
  {
    question: "What is Gratuitous ARP and how can attackers abuse it in MAC cache poisoning?",
    shortAnswer: "A Gratuitous ARP is an unrequested ARP announcement sent by a node to inform the LAN of its IP-to-MAC mapping; attackers broadcast fake Gratuitous ARPs to overwrite victim ARP tables with the attacker's MAC address.",
    explanation: "Legitimate Gratuitous ARPs update switch CAM tables after IP failover; malicious ARPs hijack network sessions in Man-in-the-Middle attacks.",
    hint: "Unsolicited ARP announcement broadcast to update everyone's ARP tables.",
    level: "expert",
    codeExample: "gratuitousARP.broadcast({ IP: '192.168.1.1', MAC: AttackerMAC });"
  },
  {
    question: "What is the difference between Half-Duplex CSMA/CD and Full-Duplex Switched Ethernet regarding MAC addresses?",
    shortAnswer: "In Half-Duplex CSMA/CD (Hubs), every MAC address contends for a shared wire and collisions occur; in Full-Duplex Switched Ethernet, each port is a dedicated point-to-point collision-free domain guided by CAM table lookups.",
    explanation: "Full-duplex switching eliminates collision detection entirely, allowing simultaneous 1Gbps transmit and receive without backoff algorithms.",
    hint: "Hubs share the wire causing collisions; switches use MAC tables to create dedicated collision-free paths.",
    level: "moderate",
    codeExample: "FullDuplexSwitching: collisionDetectionDisabled = true; dedicatedBandwidth = true;"
  },
  {
    question: "How does a router modify the MAC addresses of a packet as it travels across multiple hops?",
    shortAnswer: "At each router hop, the Layer 2 frame header is stripped off: the Source MAC is rewritten to the outgoing router interface's MAC, and the Destination MAC is rewritten to the next-hop router's MAC (the Layer 3 IP addresses remain unchanged).",
    explanation: "MAC addresses change at every single hop across the Internet, whereas source and destination IP addresses remain constant end-to-end.",
    hint: "MAC addresses are rewritten at every router hop; IP addresses stay the same.",
    level: "expert",
    codeExample: "Hop1: [MAC_A → MAC_RouterIn] → Router rewrites → Hop2: [MAC_RouterOut → MAC_RouterNext];"
  },
  {
    question: "What is MAC Filtering on Wi-Fi routers and why is it considered weak security on its own?",
    shortAnswer: "MAC filtering allows only whitelisted MAC addresses to connect to Wi-Fi; it is weak because wireless MAC addresses are transmitted in plaintext over the air, allowing attackers to sniff an authorized MAC with Wireshark and spoof it in seconds.",
    explanation: "MAC filtering should never replace strong WPA3-Enterprise cryptographic authentication across campus networks in Jadavpur.",
    hint: "Attackers can sniff authorized MACs over the air and spoof them easily.",
    level: "moderate",
    codeExample: "attacker.sniffAirwaves() => learnsAuthorizedMAC() => macchanger.spoof(AuthorizedMAC);"
  },
  {
    question: "What is IEEE 802.1AE (MACsec)?",
    shortAnswer: "An industry standard security protocol that provides Layer 2 hardware-based encryption (AES-128 / AES-256 GCM) and data integrity protection for all Ethernet frames directly on the physical wire.",
    explanation: "MACsec encrypts everything within the Ethernet frame (including IP headers and payloads), protecting fiber and copper links against physical tapping and Man-in-the-Middle attacks.",
    hint: "Layer 2 hardware encryption protecting all Ethernet frames on the physical cable.",
    level: "expert",
    codeExample: "macsec.encryptFrame(EthernetFrame, Algorithm.AES_256_GCM);"
  },
  {
    question: "What is a Loopback MAC Address (00:00:00:00:00:00)?",
    shortAnswer: "An invalid or null MAC address often used in ARP probe packets (to detect IP conflicts) or software test drivers to indicate an uninitialized hardware interface.",
    explanation: "During RFC 5227 IPv4 Address Conflict Detection, a host sends an ARP probe with Sender MAC set to its hardware MAC but Sender IP set to 0.0.0.0.",
    hint: "All zeros MAC address indicating an uninitialized or probe interface.",
    level: "moderate",
    codeExample: "NullMAC = '00:00:00:00:00:00'; // Uninitialized or probe address"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for a 24-Port Managed Enterprise Switch with 802.1X and Port Security capabilities?",
    shortAnswer: "Approximately ₹25,000 to ₹65,000 (e.g., Cisco Catalyst 1000, Aruba CX 6000, or D-Link DGS-1510) in West Bengal enterprise hardware markets.",
    explanation: "Enterprise managed switches feature robust ASIC CAM tables (16K MAC entries), hardware port security, 802.1X, and SNMP monitoring in ₹.",
    hint: "Managed 24-port enterprise switch with Port Security costs ₹25,000 – ₹65,000.",
    level: "moderate",
    codeExample: "EnterpriseSwitchCost = ₹38,000; // Includes 16K CAM table & Port Security"
  },
  {
    question: "What is an OUI Lookup tool and how do cybersecurity investigators use it?",
    shortAnswer: "An online database or local utility (e.g., `ieee-data` / Wireshark manuf database) that matches the first 3 octets of a MAC address to its registered manufacturer to identify rogue hardware on a network.",
    explanation: "Security analysts in Kolkata identify suspicious Raspberry Pi implants (`B8:27:EB` / `DC:A6:32`) or rogue Wi-Fi pineapple dongles attached to office switch ports.",
    hint: "Database lookup tool that reveals the hardware manufacturer from the first 24 bits of a MAC.",
    level: "moderate",
    codeExample: "ouiLookup('B8:27:EB:12:34:56') => 'Raspberry Pi Foundation';"
  },
  {
    question: "What is the difference between a Physical MAC Address and a Virtual MAC Address?",
    shortAnswer: "A Physical MAC is the manufacturer-burned hardware address in ROM; a Virtual MAC is dynamically generated by software for Virtual Machines (VMware/KVM) or First Hop Redundancy Protocols (HSRP/VRRP).",
    explanation: "In HSRP (Hot Standby Router Protocol), two physical routers share a Virtual MAC address (e.g., `00:00:0C:07:AC:01`) so client default gateways fail over without ARP re-learning.",
    hint: "Physical MAC is in hardware chip; Virtual MAC is software-generated for VMs and router failover.",
    level: "expert",
    codeExample: "HSRP_VirtualMAC = '00:00:0C:07:AC:01'; // Virtual gateway MAC shared across dual routers"
  },
  {
    question: "What command in Windows PowerShell and Linux displays the local network card's physical MAC address?",
    shortAnswer: "Windows: `Get-NetAdapter` or `ipconfig /all`; Linux: `ip link show` or `cat /sys/class/net/eth0/address`.",
    explanation: "These operating system commands query the network adapter driver to display active MAC addresses, link speeds, and hardware status.",
    hint: "Windows: Get-NetAdapter; Linux: ip link show.",
    level: "basic",
    codeExample: "# Windows PowerShell\nGet-NetAdapter | Select-Object Name, MacAddress, LinkSpeed\n# Linux\nip link show eth0"
  },
  {
    question: "What is the ultimate golden rule for understanding and securing MAC Addresses in enterprise networks?",
    shortAnswer: "'MAC addresses deliver frames locally across Layer 2 switch ports; enforce Switch Port Security (max 1 MAC per port) and Dynamic ARP Inspection (DAI) to defeat flooding and spoofing; recognize that MACs change at every router hop; and budget managed switches in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all foundational principles of Layer 2 physical addressing, switch CAM table operations, hardware security controls, and financial budgeting.",
    hint: "Local Layer 2 delivery + Switch Port Security + DAI defense + Changes at each hop + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: Layer2LocalDelivery() → EnforcePortSecurity() → EnableDAI() → BudgetInRupees(₹);"
  }
];

export default questions;
