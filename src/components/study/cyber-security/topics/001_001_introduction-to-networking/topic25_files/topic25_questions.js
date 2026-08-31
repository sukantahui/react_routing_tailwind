// topic25_questions.js
// 30 Moderate to Expert Questions on Network Interface Cards (NICs) in Computer Networking and Cyber Security

const questions = [
  {
    question: "What is a Network Interface Card (NIC) and what is its primary hardware function?",
    shortAnswer: "A NIC is a hardware expansion adapter or onboard chip that connects a computer to network transmission media, converting parallel host CPU/PCIe data into serial electrical, optical, or radio signals and vice-versa.",
    explanation: "The NIC operates at OSI Layer 1 (PHY physical signaling) and Layer 2 (MAC framing and hardware addressing), providing the physical port and link-layer controller.",
    hint: "Hardware component that gives your computer its network port and MAC address.",
    level: "moderate",
    codeExample: "NIC.transmit(parallelHostBytes) => serialNetworkWaveform;"
  },
  {
    question: "What are the two OSI layers that a Network Interface Card operates across?",
    shortAnswer: "Layer 1 (Physical Layer) for physical signal transceiving (voltage/light/radio waves) and Layer 2 (Data Link Layer) for MAC addressing, frame encapsulation/decapsulation, and CRC error checking.",
    explanation: "The PHY transceiver chip handles Layer 1 bit transmission, while the MAC controller ASIC handles Layer 2 frame formatting and collision detection.",
    hint: "Layer 1 for physical signals and Layer 2 for MAC frame processing.",
    level: "expert",
    codeExample: "NIC = { Layer1_PHY: 'Signal Encoding/Decoding', Layer2_MAC: '48-bit MAC Framing & CRC32' };"
  },
  {
    question: "What is the structure of a standard 48-bit MAC (Media Access Control) address burned into a NIC's EEPROM?",
    shortAnswer: "A 48-bit (6-byte) hexadecimal address divided into two equal 24-bit halves: the first 24 bits represent the Organizationally Unique Identifier (OUI - Manufacturer ID), and the last 24 bits represent the Vendor-Assigned Device Serial Number.",
    explanation: "For example, in MAC address `00:1A:2B:3C:4D:5E`, `00:1A:2B` identifies the manufacturer (e.g. Cisco/Intel), and `3C:4D:5E` is the unique device serial identifier.",
    hint: "First 24 bits: Manufacturer OUI; Last 24 bits: Unique Device Serial.",
    level: "moderate",
    codeExample: "MACAddress = '00:1A:2B : 3C:4D:5E'; // [24-bit OUI Vendor] : [24-bit Device Serial]"
  },
  {
    question: "What is Promiscuous Mode on a NIC and how is it used in Cyber Security packet sniffing?",
    shortAnswer: "Promiscuous Mode instructs the NIC controller to pass ALL frames received on the wire directly to the operating system/Wireshark, ignoring whether the destination MAC address matches the NIC's own address.",
    explanation: "Under normal operation, a NIC discards frames not destined for its MAC address. In promiscuous mode, network security analysts and packet sniffers capture every passing frame on shared network segments.",
    hint: "Mode that captures all passing network traffic, not just packets addressed to itself.",
    level: "expert",
    codeExample: "nic.setPromiscuousMode(true); wireshark.captureAllSegmentFrames();"
  },
  {
    question: "What is MAC Address Spoofing and why is it performed?",
    shortAnswer: "MAC Spoofing is the software modification of the active MAC address in the operating system's network driver, allowing a client to impersonate another device or bypass MAC address filtering on Wi-Fi/switch ports.",
    explanation: "While the burned-in hardware ROM address remains unchanged, the OS overrides the outgoing frame source MAC, useful for privacy protection or penetration testing.",
    hint: "Overriding your MAC address in software to bypass network filters or hide identity.",
    level: "moderate",
    codeExample: "ip link set dev eth0 address 00:11:22:33:44:55 // Spoofs active MAC address"
  },
  {
    question: "What is a Wireless Network Interface Card (WNIC)?",
    shortAnswer: "A network interface card equipped with an RF radio transceiver and antenna array that transmits and receives data over wireless electromagnetic frequencies according to IEEE 802.11 Wi-Fi standards (Wi-Fi 6/6E/7).",
    explanation: "WNICs perform radio frequency modulation (OFDMA, QAM), handle SSID association, manage WPA3 cryptographic handshakes, and dynamically adjust transmission power.",
    hint: "Wi-Fi interface card with antennas for wireless connectivity.",
    level: "basic",
    codeExample: "wnic.connect(SSID = 'Campus_WiFi_6', Auth = 'WPA3-Enterprise');"
  },
  {
    question: "What is a Fiber Optic PCIe NIC with SFP+ Cages?",
    shortAnswer: "A high-performance server expansion card that accepts Small Form-factor Pluggable (SFP/SFP+) optical transceivers, enabling direct 10Gbps/25Gbps fiber-optic network connectivity with zero electromagnetic interference (EMI).",
    explanation: "Data center database servers in Kolkata use optical fiber NICs to connect to top-of-rack switches over multi-mode OM4 fiber, achieving sub-microsecond latency.",
    hint: "PCIe card with modular fiber-optic transceiver cages for 10G/25G high-speed server links.",
    level: "expert",
    codeExample: "fiberNIC.insertModule('10GBASE-SR SFP+ Optical Transceiver');"
  },
  {
    question: "What is a Virtual Network Interface Card (vNIC)?",
    shortAnswer: "A software-emulated network adapter created by a hypervisor (VMware ESXi, KVM, Hyper-V) or container engine (Docker) that connects virtual machines to a virtual switch (vSwitch) with its own generated virtual MAC address.",
    explanation: "Virtual machines interact with vNICs using standard OS drivers (e.g., virtio-net or vmxnet3), allowing dozens of isolated VMs to share a single physical server NIC.",
    hint: "Software network card inside a Virtual Machine or Docker container.",
    level: "expert",
    codeExample: "vm.attachInterface(vNIC_ID = 'eth0', vSwitch = 'vlan20_dmz', VirtualMAC = '00:50:56:A1:B2:C3');"
  },
  {
    question: "What is Checksum Offloading (TCP Offload Engine - TOE / TSO) in modern NICs?",
    shortAnswer: "A hardware feature where the NIC's ASIC processor computes TCP, UDP, and IP checksums and segments large data buffers directly on the card, freeing up host CPU cycles for application processing.",
    explanation: "TCP Segmentation Offload (TSO) and Large Receive Offload (LRO) enable 10Gbps/40Gbps line-rate throughput without saturating host server CPU cores.",
    hint: "NIC hardware computes network checksums so the main computer CPU doesn't have to.",
    level: "expert",
    codeExample: "nic.enableFeature('tx-checksum-ipv4', 'tso-tcp-segmentation-offload');"
  },
  {
    question: "What is Wake-on-LAN (WoL) and how does the NIC execute it?",
    shortAnswer: "A hardware feature where a NIC on standby power listens for a specially formatted network packet called a 'Magic Packet' (containing 6 bytes of FF followed by 16 repetitions of the target MAC) to power on a sleeping or shutdown PC.",
    explanation: "WoL enables network administrators in Barrackpore to wake up 100 lab computers remotely at night for automated operating system patching.",
    hint: "Wakes up a sleeping PC remotely when the NIC receives a 'Magic Packet'.",
    level: "moderate",
    codeExample: "MagicPacket = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, ...TargetMAC_x16];"
  },
  {
    question: "What is Single Root I/O Virtualization (SR-IOV) in enterprise server NICs?",
    shortAnswer: "A PCIe standard that allows a single physical NIC to partition itself into multiple virtual functions (VFs) that are mapped directly into guest Virtual Machines, bypassing hypervisor software emulation for near-native hardware speed.",
    explanation: "SR-IOV eliminates virtual switch latency, delivering 10Gbps/25Gbps line-rate throughput and ultra-low jitter for financial trading and database clusters.",
    hint: "Hardware feature giving virtual machines direct access to the physical NIC silicon.",
    level: "expert",
    codeExample: "physicalNIC.createVirtualFunctions(numVFs = 8); vm.assignPCIeDevice(VF_Slot1);"
  },
  {
    question: "What is a SmartNIC / DPU (Data Processing Unit)?",
    shortAnswer: "An advanced server network card equipped with onboard programmable ARM CPU cores, FPGA chips, and hardware accelerators that processes networking, storage (NVMe-oF), and cybersecurity firewalls directly on the card.",
    explanation: "SmartNICs offload packet encryption (IPSec/TLS), software-defined networking (Open vSwitch), and packet inspection entirely from the host CPU, boosting server efficiency.",
    hint: "Intelligent network card with its own onboard CPU and FPGA processor to run security tasks.",
    level: "expert",
    codeExample: "smartNIC.offloadFirewallRules(securityACLs); smartNIC.accelerateIPSec();"
  },
  {
    question: "What is the function of the DMA (Direct Memory Access) controller inside a modern NIC?",
    shortAnswer: "It transfers received network packet buffers directly from the NIC's internal packet memory into host system RAM without requiring host CPU intervention, dramatically reducing latency.",
    explanation: "DMA eliminates CPU polling loops, allowing the computer to process high-volume gigabit packet streams efficiently.",
    hint: "Moves packets directly from the NIC into computer RAM without bothering the main CPU.",
    level: "expert",
    codeExample: "nicDMA.transferPacketToRAM(rxBufferAddress, packetLength) => cpu.sendInterrupt();"
  },
  {
    question: "Suppose Debangshu is upgrading an enterprise server in Barrackpore with a Dual-Port 10G SFP+ PCIe NIC. What is the estimated hardware cost in Indian Rupees (₹)?",
    shortAnswer: "Estimated cost is ₹14,000 – ₹28,000 (including Intel X520/X710 dual-port PCIe card at ₹16,000 plus two 10G-SR SFP+ optical transceivers at ₹2,500 each).",
    explanation: "Enterprise NIC upgrades in West Bengal account for server-grade controller silicon, PCIe x8 bus interfaces, optical transceivers, and low-profile bracket kits in ₹.",
    hint: "Dual-port 10G PCIe card and optical transceivers budgeted in ₹.",
    level: "moderate",
    codeExample: "TotalNICUpgradeCost = PCIeCard(₹16,000) + 2*SFP_Transceivers(₹5,000) = ₹21,000;"
  },
  {
    question: "What is Link Aggregation / NIC Teaming (LACP 802.3ad / IEEE 802.1AX)?",
    shortAnswer: "The technology that combines multiple physical NIC ports on a single computer or server into a single logical network interface, increasing aggregate bandwidth and providing seamless link failover.",
    explanation: "Bonding two 1Gbps NIC ports creates a 2Gbps logical pipe; if one cable is severed, traffic instantly continues uninterrupted across the surviving cable.",
    hint: "Combines two or more network cards into one for double speed and backup redundancy.",
    level: "moderate",
    codeExample: "nicBond.team([eth0, eth1], mode = '802.3ad LACP') => AggregateSpeed = '2Gbps';"
  },
  {
    question: "What is Jumbo Frame support on a Gigabit/10G NIC and what is its standard MTU size?",
    shortAnswer: "Jumbo Frame support allows the NIC to transmit Ethernet frames with a Maximum Transmission Unit (MTU) of up to 9,000 bytes (compared to the standard 1,500-byte MTU).",
    explanation: "Larger 9000-byte frames reduce packet header overhead and interrupt rates by up to 80% during large file transfers on Storage Area Networks (SAN/iSCSI).",
    hint: "Increases packet size limit from 1500 bytes to 9000 bytes for faster storage transfers.",
    level: "expert",
    codeExample: "ip link set dev eth0 mtu 9000 // Enables 9KB Jumbo Frames"
  },
  {
    question: "What is the purpose of the Boot ROM / PXE (Preboot Execution Environment) chip on a NIC?",
    shortAnswer: "PXE Boot ROM allows a computer to download its operating system kernel and boot files over the network from a TFTP/DHCP server without needing any local hard drive or USB installer.",
    explanation: "Universities in Kolkata use PXE booting to provision 100 lab computers with clean student Linux/Windows OS images simultaneously in minutes.",
    hint: "Allows a computer to boot its operating system directly from the network.",
    level: "moderate",
    codeExample: "PXE_Boot: DHCP_Request() → Receive_TFTP_Server_IP() → Download_OS_Kernel();"
  },
  {
    question: "How does a NIC detect bit errors in received Ethernet frames?",
    shortAnswer: "By calculating a 32-bit Cyclic Redundancy Check (CRC32) over the received frame bits and comparing it with the Frame Check Sequence (FCS) field in the frame trailer; if mismatching, the NIC drops the corrupted frame.",
    explanation: "Hardware-level FCS error checking ensures corrupted frames caused by electrical noise or cable degradation never reach the operating system kernel.",
    hint: "Compares CRC32 calculation with the FCS trailer to discard damaged packets.",
    level: "expert",
    codeExample: "if (calculateCRC32(frame) !== frame.FCS) nic.dropCorruptedFrame();"
  },
  {
    question: "What is the difference between Full-Duplex and Half-Duplex transmission on a NIC?",
    shortAnswer: "Full-Duplex allows simultaneous two-way transmission (sending and receiving at full wire speed at the same instant); Half-Duplex allows transmission in only one direction at a time, requiring CSMA/CD to avoid collisions.",
    explanation: "Modern switched Gigabit networks operate exclusively in full duplex (1Gbps TX + 1Gbps RX = 2Gbps aggregate bandwidth), eliminating collisions completely.",
    hint: "Full-duplex transmits both directions at once; Half-duplex transmits one direction at a time.",
    level: "basic",
    codeExample: "FullDuplex = { SimultaneousTX_RX: true, CollisionsPossible: false };"
  },
  {
    question: "What is Auto-Negotiation (IEEE 802.3u / 802.3ab) on a Network Interface Card?",
    shortAnswer: "An automated handshake protocol where the NIC and the connected switch port exchange link pulses to automatically agree on the highest mutually supported speed (e.g., 100Mbps vs 1Gbps) and duplex mode (Full vs Half).",
    explanation: "Auto-negotiation ensures plug-and-play compatibility when connecting older 100Mbps devices into modern Gigabit switch ports.",
    hint: "Automatic handshake setting the fastest common speed and duplex between PC and switch.",
    level: "moderate",
    codeExample: "autoNegotiate() => { AgreedSpeed: '1000Mbps', AgreedDuplex: 'Full' };"
  },
  {
    question: "What is an Onboard LOM (LAN on Motherboard) vs a PCIe Expansion NIC?",
    shortAnswer: "LOM refers to network controller chips integrated directly onto the computer motherboard; PCIe expansion NICs are standalone plug-in cards that offer modular upgrades (e.g. 10G/40G fiber, multi-port redundancy).",
    explanation: "Desktops come standard with 1Gbps LOM, while enterprise servers utilize PCIe slots to add multi-port fiber cards and SmartNICs.",
    hint: "LOM is built into the motherboard; PCIe NIC is a removable expansion card.",
    level: "basic",
    codeExample: "LOM = IntegratedOnboardRealtek; PCIeNIC = ModularDualPortIntelX520;"
  },
  {
    question: "What role does Interrupt Moderation (Interrupt Coalescing) play in high-speed NICs?",
    shortAnswer: "It aggregates multiple incoming network packets and issues a single hardware interrupt to the CPU periodically rather than generating an interrupt for every individual packet, preventing CPU interrupt storms.",
    explanation: "At 10Gbps line rate (handling up to 14.8 million packets per second), generating an interrupt per packet would completely lock up host CPU cores.",
    hint: "Batches packets together to stop the NIC from overwhelming the CPU with millions of interrupts.",
    level: "expert",
    codeExample: "nic.setInterruptCoalescing(rxUsecs = 50, rxMaxPackets = 32);"
  },
  {
    question: "What are the physical LEDs on an RJ-45 NIC port and what do they indicate?",
    shortAnswer: "Typically two LEDs: 1. Link/Speed LED (Solid Green/Amber indicates physical link established and speed negotiated), 2. Activity LED (Flashing Green indicates active packet transmission/reception).",
    explanation: "Network engineers in Ichapur check NIC status LEDs first when troubleshooting physical cable disconnects or negotiation failures.",
    hint: "Solid light shows physical link; blinking light shows active data transfer.",
    level: "basic",
    codeExample: "LED_Status = { SolidAmber: '1000Mbps Link OK', FlashingGreen: 'Transmitting Packets' };"
  },
  {
    question: "What is a USB-to-Ethernet Adapter (Dongle) NIC and when is it deployed?",
    shortAnswer: "An external portable NIC that plugs into a laptop's USB 3.0 or USB Type-C/Thunderbolt port to provide a physical RJ-45 Gigabit Ethernet jack on modern slim laptops that lack built-in LAN ports.",
    explanation: "Students and network engineers across Kolkata carry USB-C Gigabit Ethernet dongles (costing ₹800 – ₹1,800) to connect directly to switch console ports and high-speed wired LANs.",
    hint: "Portable USB adapter that adds an ethernet cable port to slim laptops.",
    level: "basic",
    codeExample: "USB_NIC = { Interface: 'USB-C 3.1', Output: 'RJ-45 Gigabit 1000Base-T', Cost: '₹1,200' };"
  },
  {
    question: "What is IEEE 802.1Q VLAN Tagging support on a Network Interface Card?",
    shortAnswer: "The capability of the NIC hardware and driver to insert and read 4-byte 802.1Q VLAN tags in Ethernet headers, allowing a single physical server NIC port to participate in multiple isolated virtual networks.",
    explanation: "Hypervisors and Linux servers in Jadavpur configure VLAN sub-interfaces (e.g. `eth0.10`, `eth0.20`) on a single trunked NIC to isolate management from customer traffic.",
    hint: "Allows a single network card to connect to multiple VLANs simultaneously.",
    level: "expert",
    codeExample: "ip link add link eth0 name eth0.10 type vlan id 10 // Creates VLAN 10 sub-interface"
  },
  {
    question: "How does a NIC Driver interface with the Host Operating System Network Stack?",
    shortAnswer: "The NIC driver acts as the software translation bridge between the OS kernel's network socket APIs (NDIS in Windows, socket buffers/sk_buff in Linux) and the specific registers and ring buffers of the NIC hardware.",
    explanation: "Drivers manage RX/TX ring buffers, handle interrupt service routines (ISR), allocate DMA memory, and configure hardware offload parameters.",
    hint: "Software driver that allows Windows or Linux to talk to the physical network card.",
    level: "expert",
    codeExample: "OS_Socket_Buffer (sk_buff) <-> NIC_Driver (e1000e.ko) <-> Hardware_Ring_Buffer;"
  },
  {
    question: "What is the security risk of Rogue NIC hardware devices (e.g., LAN Turtle, USB Ethernet implants)?",
    shortAnswer: "Covert hardware implants disguised as USB adapters or inline dongles that silently execute Man-in-the-Middle (MitM) attacks, capture unencrypted credentials, and establish reverse remote access tunnels to external attackers.",
    explanation: "Cybersecurity physical audits in Barrackpore inspect workstations to ensure unauthorized USB network dongles are not physically attached.",
    hint: "Malicious hidden hardware dongle plugged into a PC to secretly spy on network traffic.",
    level: "expert",
    codeExample: "HardwareAudit.scanAttachedUSBDevices() => alertsIfUnauthorizedNICFound();"
  },
  {
    question: "What is the difference between a Broadcom/Intel Enterprise NIC and a cheap consumer Realtek NIC for servers?",
    shortAnswer: "Enterprise Intel/Broadcom NICs feature dedicated multi-queue processors, hardware virtualization (SR-IOV), advanced checksum offloads, and robust Linux kernel drivers; cheap consumer chips offload processing onto host CPU cores and lack enterprise stability.",
    explanation: "In high-throughput server environments in Kolkata, consumer NICs experience packet drops, high CPU interrupts, and driver kernel panics under heavy load.",
    hint: "Intel/Broadcom enterprise cards have dedicated processors and low CPU overhead.",
    level: "moderate",
    codeExample: "Intel_NIC = { HardwareQueues: 8, DriverStability: 'Enterprise', HostCPUUsage: '2%' };"
  },
  {
    question: "What is DPDK (Data Plane Development Kit) and how does it interact with high-speed NICs?",
    shortAnswer: "A set of software libraries that bypasses the operating system kernel network stack entirely, allowing user-space applications to access NIC packet ring buffers directly via Poll Mode Drivers (PMD) for ultra-low latency.",
    explanation: "DPDK enables cybersecurity intrusion detection systems (Snort/Suricata) and 5G telecom routers to process 40Gbps+ packet streams at wire speed with zero kernel context-switching overhead.",
    hint: "Bypasses the OS kernel so security tools can read packets directly from the NIC in nanoseconds.",
    level: "expert",
    codeExample: "dpdkApp.pollNICDirectly(PMD_Driver) => processesPacketsInUserSpace();"
  },
  {
    question: "What is the ultimate golden rule for selecting, configuring, and securing Network Interface Cards (NICs)?",
    shortAnswer: "'Deploy enterprise dual-port NICs with LACP teaming; enable hardware checksum and segmentation offloads; isolate management interfaces with VLAN tagging; restrict promiscuous mode and spoofing on switch ports; and budget hardware upgrades in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all essential principles of NIC hardware engineering, high availability bonding, performance optimization, and cyber defense.",
    hint: "Enterprise NICs + LACP teaming + Hardware offload + Switch port security + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: DeployEnterpriseNIC() → EnableHardwareOffloads() → EnforcePortSecurity() → BudgetInRupees(₹);"
  }
];

export default questions;
