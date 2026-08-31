// topic34_questions.js
// 30 Moderate to Expert Questions on Data Link Layer Frames in Computer Networking and Cyber Security

const questions = [
  {
    question: "What is a Frame in computer networking?",
    shortAnswer: "A Frame is the Protocol Data Unit (PDU) operating at OSI Layer 2 (Data Link Layer) that encapsulates Layer 3 IP packets with physical MAC addresses, protocol type (EtherType), and a 4-byte CRC-32 Frame Check Sequence (FCS) error-detecting trailer.",
    explanation: "Frames deliver data across the physical local link between directly connected network interfaces on switches and access points.",
    hint: "Layer 2 Protocol Data Unit (PDU) containing source/dest MAC addresses and FCS trailer.",
    level: "basic",
    codeExample: "Frame = { Header: '14B MACs + EtherType', Payload: '46-1500B IP Packet', Trailer: '4B CRC32 FCS' };"
  },
  {
    question: "What are the standard minimum and maximum sizes of an IEEE 802.3 Ethernet frame?",
    shortAnswer: "Minimum size: 64 bytes (Destination MAC to FCS); Maximum standard size: 1518 bytes (1522 bytes with an 802.1Q VLAN tag).",
    explanation: "Frames smaller than 64 bytes are called 'Runt frames' and dropped as collisions; frames larger than 1518 bytes (without jumbo configuration) are called 'Giant frames' and dropped.",
    hint: "Minimum 64 bytes; Maximum standard 1518 bytes (1522 with VLAN tag).",
    level: "moderate",
    codeExample: "FrameSizeLimits = { Min: 64 /* Runt threshold */, MaxStandard: 1518, MaxTagged: 1522, Jumbo: 9000 };"
  },
  {
    question: "What is the Preamble and Start Frame Delimiter (SFD) in an Ethernet frame?",
    shortAnswer: "The Preamble is a 7-byte pattern of alternating 1s and 0s (10101010) followed by a 1-byte SFD (10101011) that synchronizes the receiver's physical layer clock before frame reading begins.",
    explanation: "The preamble and SFD allow receiving NIC hardware to lock phase and bit timing before decoding the destination MAC address.",
    hint: "7 bytes of 10101010 plus 1 byte 10101011 to synchronize physical receiver clocks.",
    level: "moderate",
    codeExample: "Preamble = '10101010' * 7; SFD = '10101011'; // Total 8 bytes physical sync"
  },
  {
    question: "What is the Frame Check Sequence (FCS) and how does CRC-32 validate frame integrity?",
    shortAnswer: "The FCS is a 4-byte trailer calculated using the Cyclic Redundancy Check (CRC-32) polynomial over all frame fields from Destination MAC to Payload; if the receiver's computed CRC does not match the FCS, the frame is silently dropped.",
    explanation: "CRC-32 detects single-bit errors, burst errors, and electrical noise corruptions on physical copper or optical cables.",
    hint: "4-byte trailer using CRC-32 to detect transmission errors on the cable.",
    level: "basic",
    codeExample: "receiver.onFrame(frame) => if (computeCRC32(frame) !== frame.FCS) dropCorruptFrame();"
  },
  {
    question: "What are common EtherType values (Bytes 12-13) in an Ethernet frame header?",
    shortAnswer: "0x0800 for IPv4, 0x86DD for IPv6, 0x0806 for ARP, and 0x8100 for an IEEE 802.1Q VLAN tagged frame.",
    explanation: "The EtherType field tells the receiving NIC driver which Layer 3 network protocol handler should process the encapsulated payload.",
    hint: "0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP, 0x8100 = 802.1Q VLAN Tag.",
    level: "moderate",
    codeExample: "EtherTypes = { IPv4: 0x0800, IPv6: 0x86DD, ARP: 0x0806, VLAN_8021Q: 0x8100 };"
  },
  {
    question: "How is an IEEE 802.1Q VLAN Tag structured within an Ethernet frame?",
    shortAnswer: "It inserts 4 bytes between the Source MAC and EtherType: 2-byte TPID (0x8100) + 3-bit Priority (PCP for QoS) + 1-bit DEI (Drop Eligible) + 12-bit VLAN ID (supports VLANs 1 to 4094).",
    explanation: "802.1Q tagging allows switches to multiplex multiple isolated departmental networks across a single physical trunk link.",
    hint: "4 bytes: 0x8100 TPID + 3-bit Priority + 1-bit DEI + 12-bit VLAN ID (1-4094).",
    level: "expert",
    codeExample: "VLAN_Tag = { TPID: 0x8100, Priority: 3 /* VoIP EF */, DEI: 0, VLAN_ID: 10 /* Accounts */ };"
  },
  {
    question: "Why must an Ethernet frame payload be padded if it contains fewer than 46 bytes?",
    shortAnswer: "To guarantee that the entire frame reaches the minimum 64-byte size required by the legacy CSMA/CD collision detection mechanism on half-duplex Ethernet segments.",
    explanation: "At 10 Mbps over a maximum 2.5 km network diameter, a 64-byte transmission time (51.2 μs) is the minimum time needed for a sender to detect a collision before finishing transmission.",
    hint: "Padding ensures the frame is at least 64 bytes so collisions can be detected.",
    level: "expert",
    codeExample: "if (payload.length < 46) payload.padWithZeros(46 - payload.length); // Total frame = 64B"
  },
  {
    question: "What is a 'Runt Frame' and what typically causes it on a network switch?",
    shortAnswer: "A frame smaller than the minimum 64 bytes with an invalid FCS, typically caused by Ethernet collisions on half-duplex links, damaged cable pins, or duplex mismatches.",
    explanation: "Switches immediately drop runt frames to prevent corrupted fragments from consuming buffer bandwidth.",
    hint: "Frame smaller than 64 bytes caused by collisions or cable faults; dropped by switches.",
    level: "basic",
    codeExample: "if (frame.length < 64 && !frame.FCS_Valid) switch.incrementRuntCounter();"
  },
  {
    question: "What is a 'Giant Frame' and how does it differ from a 'Jumbo Frame'?",
    shortAnswer: "A Giant Frame is an unauthorized frame exceeding 1518 bytes on a standard network (causing the switch to drop it as an error); a Jumbo Frame is an intentionally configured frame (up to 9000 bytes) enabled on all intermediate switches.",
    explanation: "If a server sends 9000-byte frames to a switch where Jumbo Frames are disabled, the switch logs giant frame errors and drops all packets.",
    hint: "Giant is an error (>1518B on standard switch); Jumbo is configured and supported (up to 9000B).",
    level: "moderate",
    codeExample: "GiantFrame = 'Dropped as error if MTU is 1500'; JumboFrame = 'Supported when MTU 9000 is enabled';"
  },
  {
    question: "What is VLAN Hopping (Double Tagging Attack) and how do attackers exploit it?",
    shortAnswer: "An attacker sends a frame with two 802.1Q VLAN tags (Outer Tag = Native VLAN, Inner Tag = Target Victim VLAN); the first switch strips the outer tag and forwards the inner-tagged frame to the victim VLAN, bypassing firewall routing.",
    explanation: "Mitigated on Cisco/Aruba switches by changing the native VLAN on all trunk ports to an unused dedicated VLAN (e.g. VLAN 999) and tagging native VLAN traffic.",
    hint: "Attacker crafts two VLAN tags to hop across isolated VLAN boundaries without a router.",
    level: "expert",
    codeExample: "DoubleTag_Frame = [OuterVLAN_1 [InnerVLAN_20 [MaliciousPayload]]] // Bypasses router ACLs"
  },
  {
    question: "What is IEEE 802.1AE (MACsec) and how does it protect Ethernet frames?",
    shortAnswer: "MACsec provides hardware-based Layer 2 encryption (AES-128 / AES-256 GCM) and data integrity for every Ethernet frame directly on the physical wire, encrypting everything except the source/dest MAC addresses.",
    explanation: "MACsec prevents optical fiber tapping and man-in-the-middle packet sniffing between data center buildings in Kolkata.",
    hint: "Layer 2 hardware encryption (AES-256) protecting all frames on physical cables.",
    level: "expert",
    codeExample: "macsec.encryptFrame(EthernetFrame, Algorithm.AES_256_GCM);"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for a 24-Port Managed Enterprise Switch with 802.1Q VLAN trunking and Port Security?",
    shortAnswer: "Approximately ₹38,000 to ₹1,10,000 (e.g. Cisco Catalyst 1000/9200, Aruba CX 6100, or D-Link DGS-1520) in West Bengal IT hardware markets.",
    explanation: "Enterprise managed switches feature line-rate ASIC frame forwarding, 802.1Q tagging, Port Security, and SNMP monitoring in ₹ budgets.",
    hint: "Enterprise 24-port managed switch costs ₹38,000 – ₹1,10,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "EnterpriseSwitch_24P_Cost = ₹48,500; // Layer-2/3 Managed with 802.1Q & Port Security"
  },
  {
    question: "What is the Inter-Frame Gap (IFG) in Ethernet transmissions?",
    shortAnswer: "A mandatory idle period of 96 bit-times (9.6 μs at 10 Mbps, 96 ns at 1 Gbps) between consecutive frames that allows physical receiver circuits to recover and prepare for the next incoming preamble.",
    explanation: "The IFG prevents frames from running into each other on the physical wire, ensuring clean frame delineation.",
    hint: "Mandatory idle quiet time (96 bit-times) between consecutive frames on the wire.",
    level: "expert",
    codeExample: "InterFrameGap = 96 / LinkBitRate_bps; // 96 ns idle gap on 1 Gbps Ethernet"
  },
  {
    question: "What is Pause Frame (IEEE 802.3x Flow Control) and how does it prevent frame drops?",
    shortAnswer: "A control frame sent by a receiving switch port when its buffer is full, commanding the sending station to halt transmission for a specified time period (in quanta) until buffer congestion clears.",
    explanation: "While Pause frames stop packet drops, they can cause head-of-line blocking for unrelated traffic on the same link (solved by Priority-based Flow Control).",
    hint: "Tells the sender to temporarily stop transmitting frames until buffers clear.",
    level: "expert",
    codeExample: "switchPort.sendPauseFrame({ PauseTimeQuanta: 65535 }); // Halts incoming frame transmission"
  },
  {
    question: "What is Priority-Based Flow Control (PFC - IEEE 802.1Qbb) in lossless Ethernet networks?",
    shortAnswer: "An enhancement to 802.3x that applies pause flow control independently to specific 802.1p priority traffic classes (e.g. pausing iSCSI/RoCE storage VLANs while allowing standard internet traffic to flow unhindered).",
    explanation: "PFC enables lossless RDMA over Converged Ethernet (RoCE) and SAN storage fabrics without dropping a single frame.",
    hint: "Pauses only specific high-priority storage traffic classes rather than the entire cable.",
    level: "expert",
    codeExample: "switchport priority-flow-control mode on // Enables PFC on SAN storage ports"
  },
  {
    question: "What is a 'Baby Giant Frame' in telecommunications networks?",
    shortAnswer: "A frame between 1518 and 1600 bytes, typically created when encapsulation protocols (802.1Q VLAN tagging, MPLS labels, or QinQ double-tagging) add 4 to 12 bytes of header to a standard 1500-byte IP packet.",
    explanation: "Telecom switches in Kolkata are configured with MTU 1600 on trunk ports to pass Baby Giant frames without dropping customer traffic.",
    hint: "Frame slightly larger than 1518 bytes (up to 1600B) created by VLAN or MPLS headers.",
    level: "expert",
    codeExample: "BabyGiantFrame = 1500_IP + 14_Eth + 4_VLAN + 4_MPLS + 4_FCS = 1526 Bytes;"
  },
  {
    question: "What is an ARP Request Frame and why is its destination MAC set to FF:FF:FF:FF:FF:FF?",
    shortAnswer: "An ARP Request asks 'Who has IP 192.168.1.1? Tell 192.168.1.50'; because the sender does not yet know the destination's hardware MAC address, it broadcasts the frame to FF:FF:FF:FF:FF:FF so all hosts receive it.",
    explanation: "The host with the matching IP address replies with a unicast ARP Reply containing its true hardware MAC address.",
    hint: "Broadcasts to all devices (FF:FF:FF:FF:FF:FF) to discover the MAC of an IP address.",
    level: "basic",
    codeExample: "ARP_Frame = { DestMAC: 'FF:FF:FF:FF:FF:FF', EtherType: 0x0806, Payload: 'Who has 192.168.1.1?' };"
  },
  {
    question: "What is Switch Port Mirroring (SPAN) and how does it capture Layer 2 frames?",
    shortAnswer: "A managed switch feature that duplicates all incoming and outgoing frames from one or more physical source ports (or VLANs) and copies them to a designated monitoring port connected to a Wireshark analyzer.",
    explanation: "Network engineers in Barrackpore use SPAN ports to analyze VoIP call quality and detect unauthorized device MAC connections.",
    hint: "Copies all frames from active ports to a monitoring port for Wireshark analysis.",
    level: "moderate",
    codeExample: "monitor session 1 source interface GigabitEthernet0/1\nmonitor session 1 destination interface GigabitEthernet0/24"
  },
  {
    question: "What is a Broadcast Storm at the Data Link Layer and how does Spanning Tree Protocol (STP) prevent it?",
    shortAnswer: "A condition where broadcast frames (e.g. ARP) circulate endlessly in a physical switch loop, multiplying exponentially until switch CPUs crash and bandwidth is 100% consumed; STP detects physical loops and blocks redundant ports.",
    explanation: "Rapid Spanning Tree Protocol (RSTP - 802.1w) converges in under 2 seconds, maintaining a loop-free active forwarding topology.",
    hint: "Broadcasts loop endlessly in switch cycles; STP blocks redundant ports to stop loops.",
    level: "moderate",
    codeExample: "spanning-tree mode rapid-pvst // Enables Rapid Spanning Tree to prevent frame loops"
  },
  {
    question: "What happens when an Ethernet frame fails its CRC-32 Frame Check Sequence (FCS) verification at a switch?",
    shortAnswer: "The switch ASIC immediately discards (drops) the frame without generating any error message back to the sender, and increments the port's 'FCS Error / CRC Error' counter.",
    explanation: "Error recovery is delegated to higher-layer protocols like TCP, which detects missing packet sequence numbers and requests retransmission.",
    hint: "Switch silently drops the corrupt frame and increments the CRC error counter.",
    level: "moderate",
    codeExample: "if (calculatedCRC !== frame.FCS) { dropFrame(); port.crcErrors += 1; }"
  },
  {
    question: "What is QinQ (IEEE 802.1ad VLAN Stacking / Double Tagging) in ISP Metro Ethernet networks?",
    shortAnswer: "A carrier technology where the ISP adds an outer 'Service VLAN' tag (S-TAG) to customer Ethernet frames that already contain an inner 'Customer VLAN' tag (C-TAG), allowing transparent transport of customer VLANs across the ISP backbone.",
    explanation: "QinQ enables businesses in Kolkata to extend multiple private VLANs across branch offices over a single ISP fiber circuit.",
    hint: "ISP wraps customer VLAN frames in an outer Service VLAN tag for Metro Ethernet transport.",
    level: "expert",
    codeExample: "QinQ_Frame = [Outer_STag_VLAN100 [Inner_CTag_VLAN10 [Customer_Data]]];"
  },
  {
    question: "What is Switch Spoofing in VLAN security attacks?",
    shortAnswer: "An attack where a rogue computer pretends to be a Cisco/Aruba switch by sending Dynamic Trunking Protocol (DTP) negotiation frames, turning the access port into a trunk link and gaining access to all VLANs on the switch.",
    explanation: "Mitigated by permanently disabling DTP negotiation on all user-facing access switch ports (`switchport mode access` and `switchport nonegotiate`).",
    hint: "Rogue laptop pretends to be a switch to negotiate a trunk port and access all VLANs.",
    level: "expert",
    codeExample: "switchport mode access\nswitchport nonegotiate // Disables DTP negotiation to prevent switch spoofing"
  },
  {
    question: "What is the difference between Store-and-Forward and Cut-Through frame switching?",
    shortAnswer: "Store-and-Forward buffers the entire frame and verifies the CRC-32 FCS before forwarding (error-free but adds ~10–50 μs latency); Cut-Through forwards after reading only the 6-byte Destination MAC (latency ~0.3 μs, but forwards corrupt runts).",
    explanation: "Campus networks use Store-and-Forward switches; financial trading exchanges use Cut-Through switches for ultra-low latency.",
    hint: "Store-and-Forward checks the full CRC before forwarding; Cut-Through forwards instantly.",
    level: "moderate",
    codeExample: "SwitchModes = { StoreAndForward: 'Checks full FCS (Clean)', CutThrough: '0.3us latency (Fast)' };"
  },
  {
    question: "What is a 'Late Collision' on an Ethernet interface and what does it indicate?",
    shortAnswer: "A collision that occurs after the first 64 bytes (512 bits) of a frame have already been transmitted, indicating an excessive cable length (exceeding 100 meters) or a severe Duplex Mismatch (Half vs Full).",
    explanation: "Late collisions severely degrade network throughput because the NIC cannot retransmit the frame automatically at the hardware layer.",
    hint: "Collision after the first 64 bytes; caused by cables longer than 100m or duplex mismatch.",
    level: "expert",
    codeExample: "if (collisionBytePosition > 64) port.lateCollisions += 1; // Check cable length and duplex"
  },
  {
    question: "How does Wireshark display the Frame layer (Layer 2) in its packet dissection tree?",
    shortAnswer: "As the 'Frame' and 'Ethernet II' headers, displaying arrival timestamp, frame length on wire, destination MAC, source MAC, 802.1Q VLAN ID (if tagged), EtherType, and FCS validation status.",
    explanation: "Analysts expand the 'Ethernet II' header in Wireshark to verify physical MAC addresses and investigate ARP or VLAN anomalies.",
    hint: "Shows Ethernet II header with Source/Dest MAC, VLAN tags, and EtherType in Wireshark.",
    level: "basic",
    codeExample: "Wireshark_Tree: Frame 1 → Ethernet II (Src: 00:1a:2b, Dst: 00:50:56, Type: IPv4) → IPv4 → TCP"
  },
  {
    question: "What is Port-Based Network Access Control (IEEE 802.1X) and how does it control frame forwarding?",
    shortAnswer: "An authentication framework where switch ports remain in an unauthorized state (dropping all data frames except EAPoL) until the client device successfully authenticates against a RADIUS server using certificates or credentials.",
    explanation: "802.1X prevents unauthorized laptops plugged into wall jacks in Barrackpore from transmitting frames onto the corporate network.",
    hint: "Blocks all data frames on a switch port until the user authenticates via RADIUS.",
    level: "expert",
    codeExample: "dot1x system-auth-control\ninterface GigabitEthernet0/1\n  authentication port-control auto"
  },
  {
    question: "What is the maximum number of usable VLAN IDs supported by the 12-bit 802.1Q VLAN tag field?",
    shortAnswer: "2^12 = 4096 total VLAN IDs (VLAN 0 is reserved for priority tagging; VLANs 1 to 4094 are usable; VLAN 4095 is reserved for system use).",
    explanation: "VLAN 1 is the default native VLAN on most switches; enterprise VLANs typically use IDs 10, 20, 30, 100, etc.",
    hint: "12-bit field supports 4094 usable VLAN IDs (1 to 4094).",
    level: "moderate",
    codeExample: "MaxVLANs = Math.pow(2, 12) - 2; // 4094 usable VLAN IDs"
  },
  {
    question: "What is MTU (Maximum Transmission Unit) vs MRU (Maximum Receive Unit) in Frame processing?",
    shortAnswer: "MTU is the maximum packet size an interface can TRANSMIT (typically 1500 bytes); MRU is the maximum packet/frame size an interface can RECEIVE without dropping it.",
    explanation: "If a switch's MRU is 1500 bytes and a connected server transmits a 9000-byte Jumbo frame, the switch drops the frame as a giant.",
    hint: "MTU is max transmit size; MRU is max receive size.",
    level: "moderate",
    codeExample: "interface Config: MTU = 1500; MRU = 1500; // Drops incoming frames > 1518 Bytes"
  },
  {
    question: "What is Promiscuous Mode on a Network Interface Card (NIC) at the Frame level?",
    shortAnswer: "A driver mode where the NIC disables hardware destination MAC address filtering, passing ALL frames on the local wire (including frames addressed to other computers) directly to the OS kernel for packet sniffing.",
    explanation: "Without promiscuous mode, the NIC hardware drops any unicast frame whose destination MAC does not match the NIC's burned-in address.",
    hint: "Passes all frames on the wire to the operating system, bypassing MAC address filtering.",
    level: "moderate",
    codeExample: "ip link set dev eth0 promisc on // Enables promiscuous frame capture"
  },
  {
    question: "What is the ultimate golden rule for constructing, inspecting, and securing Data Link Frames?",
    shortAnswer: "'Enforce standard 64-to-1518 byte frame boundaries; prevent VLAN Hopping by tagging native VLANs and disabling DTP; deploy MACsec hardware encryption (AES-256) on physical fiber; verify CRC-32 FCS trailers; and budget enterprise managed switches in Indian Rupees (₹)!'",
    explanation: "This complete rule captures frame structure, VLAN security, hardware encryption, error detection, and financial infrastructure budgeting.",
    hint: "64-1518B boundaries + Native VLAN tagging + MACsec encryption + CRC verification + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: EnforceFrameBoundaries() → MitigateVLANHopping() → DeployMACsec() → VerifyCRC32() → BudgetInRupees(₹);"
  }
];

export default questions;
