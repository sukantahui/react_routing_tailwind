export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: Educational Campus (4 Blocks, Distance & Computer Tables)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "According to CBSE networking guidelines, which block is selected to host the central server?\n(a) The block closest to the main entrance\n(b) The block having the maximum number of computers (80-20 rule)\n(c) The smallest block\n(d) Any random block",
            "solution": "(b) The block having the maximum number of computers (due to 80-20 rule of traffic locality).",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "At what distance threshold is a Repeater recommended between two campus blocks connected via UTP copper cable?\n(a) When distance exceeds 70-100 meters\n(b) When distance exceeds 10 meters\n(c) Only when distance exceeds 1 kilometer\n(d) Never",
            "solution": "(a) When distance exceeds 70-100 meters.",
            "markingScheme": "1 Mark for (a) >70-100 meters."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which device is mandatory in every block having multiple computers to connect them to the network?",
            "solution": "Switch (or Hub).",
            "markingScheme": "1 Mark for Switch (or Hub)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the best transmission medium for connecting two campus blocks situated 600 meters apart.",
            "solution": "Optical Fiber Cable.",
            "markingScheme": "1 Mark for Optical Fiber Cable."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain the 80-20 rule used for server placement in computer networking.",
            "solution": "The 80-20 rule states that 80% of network traffic should remain local to the segment or block while only 20% traverses the inter-block backbone. Placing the server in the block with the maximum computers minimizes backbone traffic and congestion.",
            "markingScheme": "1 Mark for 80% local traffic vs 20% backbone, 1 Mark for minimizing backbone congestion."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why is a Star topology preferred over a linear Bus topology when designing inter-block campus cabling?",
            "solution": "In a Star topology, each block connects directly to the central server block. If a cable to one block is damaged, other blocks continue functioning normally, whereas a break in a bus backbone disconnects multiple blocks.",
            "markingScheme": "1 Mark for fault isolation in Star, 1 Mark for failure of bus backbone disconnecting blocks."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A campus layout has distances: Block A to B = 40m, B to C = 50m, C to D = 120m, A to C = 80m, A to D = 150m, B to D = 90m.\nIf Block A houses the server, calculate the total cable length for:\n1. Star layout connecting B, C, D directly to A\n2. Bus layout connecting A-B-C-D in sequence\nRecommend the better layout.",
            "solution": "1. Star Layout (from Server Block A):\n   A to B (40m) + A to C (80m) + A to D (150m) = 270 meters.\n2. Bus Layout (A-B-C-D):\n   A to B (40m) + B to C (50m) + C to D (120m) = 210 meters.\nRecommendation: Star topology is recommended despite extra 60m because it avoids single points of failure and provides direct high-speed links to the server.",
            "markingScheme": "1 Mark for Star length (270m), 1 Mark for Bus length (210m), 1 Mark for recommendation with technical justification."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "State the role of a Firewall and a Proxy Server in a campus network case study.",
            "solution": "1. Firewall: Acts as a security barrier between the campus internal network and the public Internet, filtering unauthorized incoming packets and preventing hacking attempts.\n2. Proxy Server: Intercepts web browsing requests from campus computers, caches frequently visited educational pages to save bandwidth, and blocks restricted websites.",
            "markingScheme": "1.5 Marks for Firewall security role, 1.5 Marks for Proxy Server caching and URL filtering."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "CASE STUDY: Vidya Niketan Public School has 4 blocks on its campus:\n- Block A (Admin): 20 Computers\n- Block B (Senior School): 110 Computers\n- Block C (Junior School): 45 Computers\n- Block D (Library & Media): 35 Computers\nDistances:\n- A to B: 50m | B to C: 120m | C to D: 60m | A to C: 140m | B to D: 95m | A to D: 160m\nAnswer the following:\n(a) Suggest the most suitable block to place the Server. Justify.\n(b) Suggest the most suitable cable layout (draw or write connections) to interconnect the 4 blocks.\n(c) Where should Repeaters and Hubs/Switches be placed?\n(d) Suggest the best medium for connecting the school to its Head Office 450 km away.",
            "solution": "(a) Server Placement: Block B (Senior School).\n    Justification: Block B has the maximum number of computers (110 computers). Placing the server here minimizes backbone network traffic (80-20 rule).\n(b) Cable Layout: Star Topology centered at Block B.\n    Connections: B to A (50m), B to D (95m), B to C (120m).\n    Total cable length = 50 + 95 + 120 = 265 meters.\n(c) Hardware Device Placement:\n    - Switch: One switch inside every block (Block A, B, C, D) to interconnect local PCs.\n    - Repeater: Between Block B and Block C, because distance (120m) exceeds the 100m UTP threshold.\n(d) Head Office Connectivity (450 km): Satellite link (VSAT) or high-speed telecommunication Leased Line (MPLS).",
            "markingScheme": "1.5 Marks for (a) Block B server + 110 computers justification, 1.5 Marks for (b) Star layout centered at B, 1.5 Marks for (c) Switches in each block & repeater between B-C, 1.5 Marks for (d) Satellite/Leased Line for 450 km."
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Corporate Enterprise Layout (Head Office & Branch Units)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which technology enables encrypted real-time audio and video meetings across distributed branch offices?\n(a) VoIP / Video Conferencing\n(b) Telnet\n(c) FTP\n(d) SMTP",
            "solution": "(a) VoIP / Video Conferencing.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "If the distance between two corporate buildings on the same premises is 350 meters, which cable should connect them?\n(a) Cat5e UTP\n(b) Optical Fiber Cable\n(c) Telephone wire\n(d) Coaxial Cable",
            "solution": "(b) Optical Fiber Cable (handles >100m without repeaters).",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the purpose of installing a central firewall between a company's internal LAN and the ISP line?",
            "solution": "To prevent unauthorized cyber intrusions, port scans, and malware from penetrating internal enterprise servers.",
            "markingScheme": "1 Mark for preventing unauthorized intrusions."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the network type connecting a Head Office in Bengaluru to a Branch in Singapore.",
            "solution": "WAN (Wide Area Network).",
            "markingScheme": "1 Mark for WAN."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Why should each building in a campus network have its own local switch?",
            "solution": "A local switch concentrates all individual computer cables within that building into a single high-speed uplink cable, drastically reducing inter-building trenching and isolating local collision domains.",
            "markingScheme": "1 Mark for concentrating cables into single uplink, 1 Mark for isolating collision domains."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is an Intranet in corporate computing?",
            "solution": "An Intranet is a private, secure internal network accessible exclusively to an organization's authorized staff, utilizing standard Internet protocols (HTTP, TCP/IP).",
            "markingScheme": "1 Mark for private internal network, 1 Mark for accessible only to authorized staff."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A company campus consists of 3 blocks: Finance (60 PCs), HR (25 PCs), and Operations (140 PCs).\nDistances: Operations to Finance = 65m; Operations to HR = 85m; Finance to HR = 110m.\n(a) Identify the server block.\n(b) Suggest the optimal star cabling layout.\n(c) Are repeaters required on any link?",
            "solution": "(a) Server Block: Operations (houses 140 PCs, maximum count).\n(b) Star Cabling: Operations to Finance (65m) and Operations to HR (85m).\n(c) Repeaters: Neither link requires a repeater because both 65m and 85m are under the 100-meter UTP threshold.",
            "markingScheme": "1 Mark for Operations server, 1 Mark for Star layout, 1 Mark for No repeaters needed (both < 100m)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain why optical fiber is preferred over copper UTP for inter-building connections, even if distance is less than 100m.",
            "solution": "1. Lightning Immunity: Outdoor copper cables act as antennas during thunderstorms, conducting lightning strikes into server switches. Fiber is non-metallic glass and conducts zero electricity.\n2. Ground Potential Isolation: Eliminates ground loops caused by voltage differences between building power substations.\n3. High bandwidth and future-proofing.",
            "markingScheme": "1.5 Marks for lightning and electrical safety, 1.5 Marks for ground loop elimination and future bandwidth."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "CASE STUDY: Apex Global Tech has 4 units on its Gurugram campus:\n- Unit 1 (R&D): 130 Computers\n- Unit 2 (QA): 50 Computers\n- Unit 3 (Accounts): 30 Computers\n- Unit 4 (Management): 20 Computers\nDistances:\n- Unit 1 to Unit 2: 70m | Unit 1 to Unit 3: 135m | Unit 1 to Unit 4: 90m\n- Unit 2 to Unit 3: 80m | Unit 2 to Unit 4: 110m | Unit 3 to Unit 4: 150m\nAnswer the following:\n(a) Suggest the most suitable unit to install the Server. Justify.\n(b) Suggest the best cable layout connecting all units.\n(c) Specify where switches and repeaters should be installed.\n(d) The management wants to conduct confidential multi-location video conferences with European clients. Suggest the protocol and security tool required.",
            "solution": "(a) Server Unit: Unit 1 (R&D). Justification: Houses the maximum number of computers (130 computers), minimizing cross-campus backbone bandwidth consumption.\n(b) Cable Layout: Star Topology centered at Unit 1.\n    Links: Unit 1 to Unit 2 (70m), Unit 1 to Unit 4 (90m), Unit 1 to Unit 3 (135m).\n    Total cable length = 70 + 90 + 135 = 295m.\n(c) Device Placement:\n    - Switches: Inside each unit (Units 1, 2, 3, 4).\n    - Repeater: Along the Unit 1 to Unit 3 link (135m exceeds 100m threshold if UTP is used; alternatively, use optical fiber with no repeater).\n(d) Protocol & Security: VoIP (Voice over IP) / SIP / H.323 for video conferencing; secured with VPN (Virtual Private Network) and TLS encryption.",
            "markingScheme": "1.5 Marks for (a) Unit 1 server + 130 PCs, 1.5 Marks for (b) Star centered at Unit 1 (295m), 1.5 Marks for (c) Switches in all units & repeater/fiber for Unit 1-3, 1.5 Marks for (d) VoIP + VPN."
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Medical Hospital Network (Wings, Radiation Shielding, Zero EMI)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Why is Optical Fiber mandatory around MRI and Radiology wings in a hospital?\n(a) It is completely immune to high electromagnetic magnetic fields generated by MRI scanners\n(b) It is cheaper than copper\n(c) It emits radiation\n(d) It requires no power",
            "solution": "(a) It is completely immune to high electromagnetic fields generated by MRI scanners.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which wing should host the Hospital Information System (HIS) server?\n(a) Emergency Wing\n(b) The wing with the highest computer density / main diagnostic block\n(c) Canteen\n(d) Parking lot",
            "solution": "(b) The wing with the highest computer density / main diagnostic block.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What service allows remote specialist doctors to view radiological scans in real time?\n(a) Telemedicine / PACS (Picture Archiving and Communication System)\n(b) Telnet\n(c) Usenet\n(d) IRC",
            "solution": "(a) Telemedicine / PACS.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether patient medical data transmission requires end-to-end encryption under health data regulations.",
            "solution": "Yes. Healthcare data must be encrypted to comply with patient confidentiality laws.",
            "markingScheme": "1 Mark for Yes."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain why Wi-Fi access points in hospital ICUs must be calibrated carefully.",
            "solution": "Certain wireless frequencies can interfere with sensitive medical telemetry devices (cardiac monitors, ventilators). Access points must use certified non-interfering channels and power levels.",
            "markingScheme": "1 Mark for interference with telemetry equipment, 1 Mark for calibrating channels/power."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is a Minimum Spanning Tree (MST) in network cable layout design?",
            "solution": "A tree layout that interconnects all network blocks with the minimum total cable length without forming any redundant loops, minimizing cabling costs.",
            "markingScheme": "1 Mark for minimum total cable length, 1 Mark for connecting all nodes without loops."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Hospital Wings: OPD (90 PCs), Surgery (40 PCs), Diagnostic (120 PCs), Admin (30 PCs).\nDistances: Diagnostic to OPD = 70m; Diagnostic to Surgery = 80m; Diagnostic to Admin = 130m; OPD to Surgery = 110m; Surgery to Admin = 90m.\n(a) Identify the server wing.\n(b) Propose the Star cabling layout.\n(c) Suggest the transmission medium between Diagnostic and Admin.",
            "solution": "(a) Server Wing: Diagnostic Wing (120 PCs, maximum).\n(b) Star Cabling: Diagnostic to OPD (70m), Diagnostic to Surgery (80m), Diagnostic to Admin (130m).\n(c) Medium for Diagnostic to Admin: Optical Fiber Cable (handles 130m easily without repeaters and provides zero EMI).",
            "markingScheme": "1 Mark for Diagnostic server, 1 Mark for Star layout, 1 Mark for Optical Fiber for 130m."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain how a hospital network ensures 24/7 high availability for emergency systems.",
            "solution": "1. Redundant dual fiber links between critical wings.\n2. Core switches with dual hot-swappable power supplies backed by medical-grade UPS systems and backup generators.\n3. Automatic failover clustering for the central database server.",
            "markingScheme": "1 Mark for redundant fiber links, 1 Mark for power backup (UPS/generator), 1 Mark for server clustering."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "CASE STUDY: Apollo Super Speciality Hospital campus has 4 blocks:\n- Block A (Outpatient Dept): 60 PCs\n- Block B (Radiology & Imaging): 40 PCs\n- Block C (Inpatient Wards): 150 PCs\n- Block D (Admin & Accounts): 30 PCs\nDistances:\n- A to B: 45m | B to C: 110m | C to D: 60m | A to C: 130m | B to D: 90m | A to D: 140m\nAnswer:\n(a) Which block should house the main Server? Justify.\n(b) Suggest the cable layout with total cable length calculation.\n(c) Where should switches and repeaters be placed?\n(d) Which medium should link Block B (Radiology) to the server to prevent signal degradation caused by X-ray / MRI equipment?",
            "solution": "(a) Server Block: Block C (Inpatient Wards). Justification: Houses the maximum computers (150 PCs), keeping most traffic local according to the 80-20 rule.\n(b) Cable Layout: Star Topology centered at Block C.\n    Links: C to B (110m), C to D (60m), C to A (130m).\n    Total length = 110 + 60 + 130 = 300 meters.\n(c) Device Placement:\n    - Switches: In every block (A, B, C, D).\n    - Repeaters: Between C and A (130m) and C and B (110m) if UTP is used (or replace with Optical Fiber with zero repeaters).\n(d) Medium for Block B: Optical Fiber Cable. Glass fibers are completely dielectric and impervious to intense electromagnetic interference from X-ray and MRI machines.",
            "markingScheme": "1.5 Marks for (a) Block C server + 150 PCs, 1.5 Marks for (b) Star centered at C (300m), 1.5 Marks for (c) Switches in each block & repeaters/fiber, 1.5 Marks for (d) Optical Fiber for Radiology EMI immunity."
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: University Multi-Department Layout (Hilly Terrain & Wireless)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which wireless medium is best suited for linking campus buildings across a steep, rocky ravine where trenching cable is impossible?\n(a) Point-to-Point Terrestrial Microwave / Radio waves\n(b) Infrared\n(c) Bluetooth\n(d) NFC",
            "solution": "(a) Point-to-Point Terrestrial Microwave / Radio waves.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the typical bandwidth capacity of a modern campus optical fiber backbone?\n(a) 10 to 40 Gbps\n(b) 100 bps\n(c) 1 Mbps\n(d) 10 Kbps",
            "solution": "(a) 10 to 40 Gbps.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which department in a university typically houses the central computing server?\n(a) The department with the largest student computer laboratories (e.g., Computer Science / IT block)\n(b) Canteen\n(c) Sports Pavilion\n(d) Security checkpost",
            "solution": "(a) Computer Science / IT block (maximum computers).",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the device used to broadcast wireless internet to students on laptops across university lawns.",
            "solution": "Outdoor Wireless Access Point (WAP).",
            "markingScheme": "1 Mark for Outdoor Wireless Access Point."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "What is the difference between an Intra-building network and an Inter-building backbone?",
            "solution": "Intra-building network: Connects individual computers within one building, typically using Cat6 copper UTP in a Star topology (< 100m). Inter-building backbone: High-capacity backbone linking all building switches to the central server, typically using outdoor Optical Fiber.",
            "markingScheme": "1 Mark for Intra-building (copper UTP within building), 1 Mark for Inter-building (fiber backbone between buildings)."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why is line-of-sight critical for terrestrial microwave links connecting distant campus wings?",
            "solution": "Microwaves travel in direct straight lines and cannot penetrate physical terrain (hills, dense forests, buildings). Any obstruction blocks or severely degrades the signal.",
            "markingScheme": "1 Mark for straight-line propagation, 1 Mark for obstruction causing signal blockage."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A university campus has: CS Block (160 PCs), Electronics Block (50 PCs), Mechanical Block (40 PCs), Admin Block (30 PCs).\nDistances: CS to Electronics = 60m; CS to Mechanical = 140m; CS to Admin = 80m; Electronics to Mechanical = 100m; Mechanical to Admin = 110m.\n(a) Which block should host the central server?\n(b) Propose the Star cabling layout.\n(c) Suggest the medium between CS and Mechanical.",
            "solution": "(a) Server Block: CS Block (160 PCs, maximum).\n(b) Star Cabling: CS to Electronics (60m), CS to Admin (80m), CS to Mechanical (140m).\n(c) Medium between CS and Mechanical: Optical Fiber Cable (handles 140m with zero repeaters).",
            "markingScheme": "1 Mark for CS server, 1 Mark for Star layout, 1 Mark for Optical Fiber for 140m."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "State three advantages of deploying a centralized campus Cloud Server over individual departmental standalone servers.",
            "solution": "1. Centralized backups and security management.\n2. Efficient hardware resource utilization through virtualization.\n3. Single point of maintenance, reducing IT administration costs.",
            "markingScheme": "1 Mark per valid advantage."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "CASE STUDY: Himalayan Hill University has 4 campus blocks:\n- Block A (Science & IT): 180 Computers\n- Block B (Arts & Humanities): 40 Computers\n- Block C (Hostels): 60 Computers\n- Block D (Administrative Complex): 30 Computers\nDistances:\n- A to B: 80m | B to C: 250m (across a steep ravine) | C to D: 90m\n- A to C: 300m | A to D: 70m | B to D: 120m\nAnswer:\n(a) Suggest the block to install the central server. Justify.\n(b) Suggest the best wired/wireless layout connecting all 4 blocks.\n(c) Which wireless technology should link Block C across the steep ravine where cable cannot be laid?\n(d) Suggest the technology to connect this hill campus to its research center in New Delhi (350 km away).",
            "solution": "(a) Server Placement: Block A (Science & IT). Justification: Houses the maximum number of computers (180 computers), adhering to the 80-20 traffic locality rule.\n(b) Cable/Link Layout: Star Topology centered at Block A.\n    Links: A to D (70m wired fiber/UTP), A to B (80m wired fiber/UTP), A to C (wireless point-to-point microwave across the ravine).\n(c) Link across ravine to Block C: High-frequency Point-to-Point Terrestrial Microwave / Free Space Optics (FSO). Eliminates impossible trenching across the steep ravine while delivering multi-hundred Mbps throughput.\n(d) New Delhi Connection (350 km): Satellite link (VSAT) or high-speed telecommunication Leased Line (MPLS).",
            "markingScheme": "1.5 Marks for (a) Block A server + 180 PCs, 1.5 Marks for (b) Star layout centered at A, 1.5 Marks for (c) Microwave/FSO across ravine, 1.5 Marks for (d) Satellite/Leased Line for 350 km."
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Financial Banking Complex (High Security, Redundant Backbone)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What security hardware appliance must isolate a banking database server from public internet lines?\n(a) Next-Generation Firewall (NGFW)\n(b) Unmanaged Hub\n(c) Repeater\n(d) Splitter",
            "solution": "(a) Next-Generation Firewall (NGFW).",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "In case study questions, which cable type is chosen for connecting buildings more than 100 meters apart?\n(a) Optical Fiber\n(b) Cat3 UTP\n(c) Ribbon cable\n(d) Twisted pair without shield",
            "solution": "(a) Optical Fiber.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does the 80-20 rule predict regarding server placement?\n(a) 80% of traffic is international\n(b) 80% of traffic remains within the local segment where the server is located\n(c) 80% of servers fail\n(d) 20% of computers work",
            "solution": "(b) 80% of traffic remains within the local segment where the server is located.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the protocol used to securely access web banking accounts.",
            "solution": "HTTPS (Hypertext Transfer Protocol Secure).",
            "markingScheme": "1 Mark for HTTPS."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain why banks never use wireless Wi-Fi for core ATM transactions.",
            "solution": "Wi-Fi signals propagate through open air, making them vulnerable to signal jamming, RF interception, and packet sniffing. Wired fiber/copper links provide physical perimeter security.",
            "markingScheme": "1 Mark for RF interception and jamming vulnerability, 1 Mark for physical security of wired links."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is the purpose of an Intrusion Detection System (IDS) in banking networks?",
            "solution": "An IDS continuously analyzes network traffic packets for known attack signatures and abnormal anomalies, immediately alerting administrators of unauthorized penetration attempts.",
            "markingScheme": "1 Mark for traffic packet inspection for attack signatures, 1 Mark for alerting administrators of intrusions."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A bank campus has: Data Center (150 Servers), Credit Wing (40 PCs), Retail Banking (80 PCs), Admin (30 PCs).\nDistances: Data Center to Credit = 50m; Data Center to Retail = 75m; Data Center to Admin = 60m.\n(a) Confirm the server location.\n(b) Propose the Star cabling layout.\n(c) Specify the cable type for inter-building links.",
            "solution": "(a) Server Location: Data Center (150 machines, purpose-built facility with max density).\n(b) Star Cabling Layout: Data Center to Credit (50m), Data Center to Retail (75m), Data Center to Admin (60m).\n(c) Cable Type: Armored Multi-mode / Single-mode Optical Fiber Cable for maximum throughput, zero EMI, and electrical isolation.",
            "markingScheme": "1 Mark for Data Center server, 1 Mark for Star layout, 1 Mark for Armored Optical Fiber."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the role of a Disaster Recovery (DR) site in banking networks.",
            "solution": "A DR site is a secondary, geographically distant data center that mirrors all banking transactions in real-time. If a catastrophic disaster (earthquake, flood, power grid failure) destroys the primary data center, operations failover to the DR site without data loss.",
            "markingScheme": "1.5 Marks for secondary mirrored data center, 1.5 Marks for disaster failover without data loss."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "CASE STUDY: National Bank of India has 4 blocks on its technology campus in Mumbai:\n- Block A (Core Banking Data Center): 200 Servers\n- Block B (Customer Care Center): 90 PCs\n- Block C (Risk Assessment Wing): 45 PCs\n- Block D (Executive Offices): 25 PCs\nDistances:\n- A to B: 65m | B to C: 130m | C to D: 55m | A to C: 85m | B to D: 140m | A to D: 110m\nAnswer:\n(a) In which block should the primary server be placed? Justify.\n(b) Suggest the optimal cable layout.\n(c) Where should switches and repeaters/fiber transceivers be installed?\n(d) Suggest the technology to synchronize this Core Banking Data Center with its Disaster Recovery site in Hyderabad (700 km away).",
            "solution": "(a) Server Placement: Block A (Core Banking Data Center). Justification: Houses 200 servers (maximum count), equipped with specialized power cooling and fire suppression (80-20 rule).\n(b) Optimal Cable Layout: Star Topology centered at Block A.\n    Links: A to B (65m), A to C (85m), A to D (110m).\n    Total cable length = 65 + 85 + 110 = 260 meters.\n(c) Device Placement:\n    - Switches: High-density Gigabit / 10G Managed Switches inside each block (A, B, C, D).\n    - Repeater / Medium: Optical Fiber Cable used for all links (especially A to D at 110m), eliminating the need for repeaters while providing 10 Gbps backbone speeds.\n(d) DR Site Synchronization (700 km): Dedicated High-Speed Optical Leased Line (DWDM / MPLS VPN) with satellite backup link for continuous real-time database replication.",
            "markingScheme": "1.5 Marks for (a) Block A server + 200 servers, 1.5 Marks for (b) Star centered at A (260m), 1.5 Marks for (c) Managed switches & Optical fiber, 1.5 Marks for (d) High-speed DWDM/MPLS Leased Line for 700 km."
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Industrial Manufacturing Plant Layout (Factory Automation)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Why should network cables never run alongside high-voltage industrial machinery power lines?\n(a) Cables get too hot\n(b) Severe electromagnetic interference (EMI) induces noise and corrupts data\n(c) Cables become slippery\n(d) High voltage increases internet speed",
            "solution": "(b) Severe electromagnetic interference (EMI) induces noise and corrupts data.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which transmission medium is immune to high-voltage industrial motor EMI?\n(a) Optical Fiber\n(b) UTP Cat5\n(c) Flat ribbon\n(d) Telephone wire",
            "solution": "(a) Optical Fiber.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What device connects factory sensors to a central PLC automation server?\n(a) Industrial Ethernet Switch\n(b) Projector\n(c) Mouse\n(d) Audio speaker",
            "solution": "(a) Industrial Ethernet Switch.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether Star topology allows individual robotic assembly lines to be upgraded without halting other lines.",
            "solution": "Yes. Star topology isolates individual node connections.",
            "markingScheme": "1 Mark for Yes."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "What is an Industrial Ethernet Switch and how does it differ from a commercial office switch?",
            "solution": "Industrial switches feature rugged metal enclosures, shock/vibration resistance, extended operational temperature ranges (-40C to +75C), and DIN-rail mounting for factory floors.",
            "markingScheme": "1 Mark for ruggedized enclosure and temperature range, 1 Mark for shock/vibration resistance."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why is Star topology preferred over Ring topology for factory automation lines?",
            "solution": "In a basic Ring, any physical break in the cable stops all token communication across the entire plant. In a Star topology, damage to one robotic arm cable leaves all other factory machines operating smoothly.",
            "markingScheme": "1 Mark for ring cable break stops entire plant, 1 Mark for star keeps other machines running."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Plant Layout: Assembly Plant (110 PCs/Robots), Quality Lab (35 PCs), Warehouse (25 PCs), Admin (30 PCs).\nDistances: Assembly to Quality = 55m; Assembly to Warehouse = 120m; Assembly to Admin = 75m.\n(a) Determine server block.\n(b) Propose Star layout.\n(c) Suggest cable between Assembly and Warehouse.",
            "solution": "(a) Server Block: Assembly Plant (110 machines, maximum).\n(b) Star Cabling: Assembly to Quality (55m), Assembly to Admin (75m), Assembly to Warehouse (120m).\n(c) Cable for Assembly to Warehouse: Industrial Armored Optical Fiber Cable (exceeds 100m, handles heavy plant EMI).",
            "markingScheme": "1 Mark for Assembly server, 1 Mark for Star layout, 1 Mark for Armored Fiber for 120m."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the role of SCADA (Supervisory Control and Data Acquisition) in an industrial manufacturing network.",
            "solution": "SCADA systems gather real-time sensor data (temperatures, motor speeds, pressures) from plant equipment, transmit it to central server screens for human monitoring, and automate emergency shutdowns upon detecting faults.",
            "markingScheme": "1.5 Marks for real-time sensor monitoring, 1.5 Marks for central visualization and automated control."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "CASE STUDY: Bharat Motors Automobile Plant has 4 blocks:\n- Block A (Chassis Fabrication): 40 PCs\n- Block B (Robotic Paint Shop): 130 Automated PCs\n- Block C (Assembly Line): 80 PCs\n- Block D (Dispatch & Logistics): 30 PCs\nDistances:\n- A to B: 60m | B to C: 50m | C to D: 140m | A to C: 95m | B to D: 110m | A to D: 160m\nAnswer:\n(a) Which block should host the Central Automation Server? Justify.\n(b) Suggest the optimal cable layout.\n(c) Where should switches and repeaters be installed?\n(d) The Paint Shop contains high-voltage electrostatic paint sprayers. What transmission medium must connect Block B to other blocks?",
            "solution": "(a) Server Placement: Block B (Robotic Paint Shop). Justification: Houses the maximum automated machines (130 PCs), keeping local automation traffic within the block (80-20 rule).\n(b) Optimal Cable Layout: Star Topology centered at Block B.\n    Links: B to A (60m), B to C (50m), B to D (110m).\n    Total length = 60 + 50 + 110 = 220 meters.\n(c) Device Placement:\n    - Switches: Industrial Ethernet Switches inside each block (A, B, C, D).\n    - Repeater / Medium: Optical Fiber Cable for B to D (110m) eliminates the need for repeaters.\n(d) Medium for Block B: Heavy-duty Dielectric Optical Fiber Cable. Glass fibers do not conduct electricity and are 100% immune to high-voltage electrostatic discharge from paint sprayers.",
            "markingScheme": "1.5 Marks for (a) Block B server + 130 PCs, 1.5 Marks for (b) Star centered at B (220m), 1.5 Marks for (c) Industrial switches & fiber, 1.5 Marks for (d) Dielectric Optical Fiber for electrostatic safety."
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Research Institute Multi-Wing Layout (High-Performance Computing)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What type of server performs intensive scientific simulations in a research institute?\n(a) High-Performance Computing (HPC) Supercomputing Cluster\n(b) Print Server\n(c) Dial-up modem\n(d) Fax server",
            "solution": "(a) High-Performance Computing (HPC) Supercomputing Cluster.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What transmission medium supports 100 Gbps backbone speeds across a research campus?\n(a) Single-mode Optical Fiber\n(b) Cat5e copper\n(c) Bluetooth\n(d) Coaxial cable",
            "solution": "(a) Single-mode Optical Fiber.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Why is a central switch placed in the server room?",
            "solution": "To act as the core distribution hub connecting all building uplinks to the central servers.",
            "markingScheme": "1 Mark for core distribution hub connecting all uplinks."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a repeater increases network transmission speed.",
            "solution": "No. A repeater only restores signal amplitude; it cannot increase transmission speed.",
            "markingScheme": "1 Mark for No."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "What is the difference between a Workstation and a Server in a campus network?",
            "solution": "Workstation: A client computer used by researchers to run applications and submit jobs. Server: A high-capacity centralized machine providing shared services, database storage, and high-performance computing to all client workstations.",
            "markingScheme": "1 Mark for client workstation role, 1 Mark for central server shared services role."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why are core network switches connected in a redundant dual-homed configuration?",
            "solution": "To eliminate single points of failure. If one core switch or fiber link fails, traffic instantaneously fails over to the backup link without halting research computations.",
            "markingScheme": "1 Mark for eliminating single point of failure, 1 Mark for seamless failover."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Research Institute: HPC Lab (140 nodes), Bio-informatics (50 PCs), Physics Wing (30 PCs), Admin (20 PCs).\nDistances: HPC to Bio = 75m; HPC to Physics = 65m; HPC to Admin = 95m.\n(a) Confirm server block.\n(b) Propose Star layout.\n(c) Confirm whether repeaters are needed.",
            "solution": "(a) Server Block: HPC Lab (140 nodes, maximum density).\n(b) Star Cabling: HPC to Bio (75m), HPC to Physics (65m), HPC to Admin (95m).\n(c) Repeaters: All three distances (75m, 65m, 95m) are within the 100-meter UTP limit. Zero repeaters required.",
            "markingScheme": "1 Mark for HPC server, 1 Mark for Star layout, 1 Mark for No repeaters needed (< 100m)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the role of a Storage Area Network (SAN) in a research data center.",
            "solution": "A SAN is a dedicated high-speed network that interconnects servers with shared pools of storage devices (disk arrays, tape libraries) at block level, enabling massive data throughput for scientific computations.",
            "markingScheme": "1.5 Marks for dedicated high-speed storage network, 1.5 Marks for shared block-level storage access."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "CASE STUDY: Indian Space Technology Institute has 4 blocks on its Bengaluru campus:\n- Block A (Astrophysics HPC): 160 Compute Nodes\n- Block B (Satellite Telemetry): 55 Workstations\n- Block C (Propulsion Labs): 35 Workstations\n- Block D (Admin & Director Wing): 25 Workstations\nDistances:\n- A to B: 55m | B to C: 125m | C to D: 70m | A to C: 115m | B to D: 130m | A to D: 85m\nAnswer:\n(a) Which block should host the central supercomputing server? Justify.\n(b) Draw/write the optimal cable layout.\n(c) Where should switches and repeaters/fiber links be installed?\n(d) Suggest the technology to connect this campus to the launch facility in Sriharikota (350 km away).",
            "solution": "(a) Server Placement: Block A (Astrophysics HPC). Justification: Houses 160 compute nodes (maximum count), adhering to the 80-20 locality rule.\n(b) Optimal Cable Layout: Star Topology centered at Block A.\n    Links: A to B (55m), A to D (85m), A to C (115m).\n    Total length = 55 + 85 + 115 = 255 meters.\n(c) Device Placement:\n    - Switches: High-speed Gigabit/10G Switches inside every block (A, B, C, D).\n    - Repeater / Medium: Optical Fiber Cable for A to C (115m exceeds 100m UTP threshold), eliminating repeaters.\n(d) Sriharikota Link (350 km): High-reliability Satellite Link (using dedicated transponder) with secondary encrypted terrestrial Leased Line (MPLS).",
            "markingScheme": "1.5 Marks for (a) Block A server + 160 nodes, 1.5 Marks for (b) Star centered at A (255m), 1.5 Marks for (c) Managed switches & Optical fiber for A-C, 1.5 Marks for (d) Dedicated Satellite / Leased Line for 350 km."
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Government Administrative Complex (State Secretariat Network)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What network connects all state government district collectorates to the state secretariat?\n(a) State Wide Area Network (SWAN)\n(b) PAN\n(c) LAN\n(d) Bluetooth",
            "solution": "(a) State Wide Area Network (SWAN).",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which block in a secretariat campus should house the central State Data Center (SDC)?\n(a) The block with the maximum computers / purpose-built secure facility\n(b) Canteen\n(c) Gatehouse\n(d) Drivers rest area",
            "solution": "(a) The block with the maximum computers / purpose-built secure facility.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What cyber security certification is mandatory for Indian government websites?\n(a) CERT-In Security Audit Clearance\n(b) Google Ads approval\n(c) YouTube badge\n(d) Twitter checkmark",
            "solution": "(a) CERT-In (Indian Computer Emergency Response Team) Security Audit Clearance.",
            "markingScheme": "1 Mark for (a) CERT-In."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the domain extension designated for Indian government portals.",
            "solution": ".gov.in (or .nic.in).",
            "markingScheme": "1 Mark for .gov.in / .nic.in."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain the purpose of NICNET in Indian government governance.",
            "solution": "NICNET is a nationwide satellite-based government communications network operated by the National Informatics Centre (NIC), connecting central ministries, state secretariats, and all 700+ district collectorates for e-governance.",
            "markingScheme": "1 Mark for nationwide satellite network by NIC, 1 Mark for connecting ministries, secretariats, and district collectorates."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why must government administrative files be signed with Digital Signatures?",
            "solution": "Digital signatures ensure legal non-repudiation and verify that official circulars/orders have not been altered or forged in transit, recognized under the IT Act 2000.",
            "markingScheme": "1 Mark for legal non-repudiation, 1 Mark for proving authenticity and preventing forgery."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Secretariat Blocks: Revenue (120 PCs), Home Affairs (90 PCs), Public Works (40 PCs), Finance (35 PCs).\nDistances: Revenue to Home = 60m; Revenue to PWD = 85m; Revenue to Finance = 70m.\n(a) Identify the server block.\n(b) Propose Star layout.\n(c) Calculate total cable required.",
            "solution": "(a) Server Block: Revenue Block (120 PCs, maximum).\n(b) Star Cabling: Revenue to Home (60m), Revenue to PWD (85m), Revenue to Finance (70m).\n(c) Total Cable = 60 + 85 + 70 = 215 meters.",
            "markingScheme": "1 Mark for Revenue server, 1 Mark for Star layout, 1 Mark for 215m total cable length."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain why government data centers require Dual-ISP redundancy.",
            "solution": "If one Internet Service Provider (ISP) experiences an undersea cable cut or routing failure, the multi-homed BGP router automatically diverts all citizen service traffic to the backup ISP, ensuring 99.99% uptime for public portals.",
            "markingScheme": "1.5 Marks for automatic failover during ISP outage, 1.5 Marks for maintaining 99.99% citizen service uptime."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "CASE STUDY: State Administrative Complex has 4 blocks:\n- Block A (Revenue & Land Records): 150 PCs\n- Block B (Personnel & Administration): 50 PCs\n- Block C (Public Health): 35 PCs\n- Block D (Law & Justice): 25 PCs\nDistances:\n- A to B: 65m | B to C: 120m | C to D: 60m | A to C: 130m | B to D: 100m | A to D: 80m\nAnswer:\n(a) Suggest the block to install the central e-Governance Server. Justify.\n(b) Suggest the optimal cable layout.\n(c) Specify where switches and repeaters should be placed.\n(d) Suggest the technology to connect all 24 District Collectorates across the state to this central server.",
            "solution": "(a) Server Placement: Block A (Revenue & Land Records). Justification: Houses the maximum computers (150 PCs), adhering to the 80-20 locality rule.\n(b) Optimal Cable Layout: Star Topology centered at Block A.\n    Links: A to B (65m), A to D (80m), A to C (130m).\n    Total length = 65 + 80 + 130 = 275 meters.\n(c) Device Placement:\n    - Switches: Inside each block (A, B, C, D).\n    - Repeater / Medium: Optical Fiber Cable for A to C (130m exceeds 100m UTP threshold), eliminating repeaters.\n(d) Connecting District Collectorates across the state: SWAN (State Wide Area Network) using dedicated high-speed BSNL/telecom Leased Lines with VSAT satellite backup.",
            "markingScheme": "1.5 Marks for (a) Block A server + 150 PCs, 1.5 Marks for (b) Star centered at A (275m), 1.5 Marks for (c) Switches & Optical fiber for A-C, 1.5 Marks for (d) SWAN / Leased Lines with satellite backup."
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Airport Operations & Air Traffic Control Network Layout",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Why must Air Traffic Control (ATC) communication operate on isolated networks separate from public airport Wi-Fi?\n(a) Passenger Wi-Fi congestion and malware could compromise life-critical aircraft radar and navigation\n(b) To save electricity\n(c) ATC has no computers\n(d) Wi-Fi cannot work at airports",
            "solution": "(a) Passenger Wi-Fi congestion and malware could compromise life-critical aircraft radar and navigation.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which transmission medium is laid beneath airport runways to connect remote radar towers without EMI?\n(a) Armored Optical Fiber Cable\n(b) UTP Cat3\n(c) Copper twisted pair\n(d) Telephone wire",
            "solution": "(a) Armored Optical Fiber Cable.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What device ensures passenger boarding pass scanners communicate with airline reservation servers?",
            "solution": "Ethernet Switch / Wireless Access Point connected to an airline VLAN.",
            "markingScheme": "1 Mark for Switch / AP on airline VLAN."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the network type connecting airports worldwide for international flight ticketing (e.g. SITA network).",
            "solution": "WAN (Wide Area Network).",
            "markingScheme": "1 Mark for WAN."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "What is Network Air-Gapping and why is it used in Air Traffic Control systems?",
            "solution": "Air-gapping is a physical security measure where a mission-critical network is completely physically disconnected and isolated from all external unsecured networks including the Internet, preventing remote hacking.",
            "markingScheme": "1 Mark for complete physical isolation from external networks/Internet, 1 Mark for preventing remote cyber attacks."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain the function of VHF radio communications between air traffic controllers and pilots.",
            "solution": "Very High Frequency (VHF) voice radio (118-137 MHz) provides direct, line-of-sight, crystal-clear, instantaneous voice communication between tower controllers and cockpit flight crews.",
            "markingScheme": "1 Mark for line-of-sight voice communication, 1 Mark for real-time contact between tower and cockpit."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Airport Blocks: Terminal 1 (180 Check-in PCs), ATC Tower (40 PCs), Cargo Complex (30 PCs), Admin (25 PCs).\nDistances: Terminal 1 to ATC = 180m; Terminal 1 to Cargo = 250m; Terminal 1 to Admin = 90m.\n(a) Identify the server block.\n(b) Propose Star layout.\n(c) Suggest cable type for all inter-block connections.",
            "solution": "(a) Server Block: Terminal 1 (180 Check-in PCs, maximum density).\n(b) Star Cabling: Terminal 1 to Admin (90m), Terminal 1 to ATC (180m), Terminal 1 to Cargo (250m).\n(c) Cable Type: Armored Single-mode Optical Fiber Cable for all runs (since distances exceed 100m and require absolute reliability around high-voltage radar systems).",
            "markingScheme": "1 Mark for Terminal 1 server, 1 Mark for Star layout, 1 Mark for Armored Single-mode Optical Fiber."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain why airport public Wi-Fi requires a Captive Portal login page.",
            "solution": "1. Legal Compliance: Authenticates users via mobile OTP to maintain an audit trail under cyber security regulations.\n2. Bandwidth Management: Enforces session time limits (e.g., 2 hours free) and throttles heavy downloads.\n3. Terms of Service: Requires users to accept acceptable use policies before granting internet access.",
            "markingScheme": "1 Mark for mobile OTP authentication & audit trail, 1 Mark for bandwidth management, 1 Mark for legal terms acceptance."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "CASE STUDY: Netaji Subhash Chandra Bose International Airport has 4 operational blocks:\n- Block A (Passenger Terminal Building): 220 Workstations\n- Block B (Air Traffic Control Tower): 50 Workstations\n- Block C (Aviation Fuel & Ground Handling): 30 Workstations\n- Block D (Security & CISF Command): 40 Workstations\nDistances:\n- A to B: 150m | B to C: 280m | C to D: 90m | A to C: 210m | B to D: 160m | A to D: 95m\nAnswer:\n(a) Which block should house the Airport Operations Server? Justify.\n(b) Suggest the optimal cable layout.\n(c) Where should switches and repeaters/fiber links be installed?\n(d) How should passenger public Wi-Fi and airport baggage handling networks be separated on the same physical infrastructure?",
            "solution": "(a) Server Placement: Block A (Passenger Terminal Building). Justification: Houses 220 workstations (maximum count), adhering to the 80-20 locality rule.\n(b) Optimal Cable Layout: Star Topology centered at Block A.\n    Links: A to D (95m), A to B (150m), A to C (210m).\n    Total length = 95 + 150 + 210 = 455 meters.\n(c) Device Placement:\n    - Switches: Managed Enterprise Switches inside each block (A, B, C, D).\n    - Medium: Direct Armored Optical Fiber Cable for all links (A to B at 150m, A to C at 210m), eliminating the need for repeaters while providing 10 Gbps speeds.\n(d) Network Separation: Configure Virtual Local Area Networks (VLANs) with strict 802.1Q tagging and firewall Access Control Lists (ACLs). This completely isolates the Public Passenger Wi-Fi VLAN from the Internal Baggage Handling VLAN.",
            "markingScheme": "1.5 Marks for (a) Block A server + 220 workstations, 1.5 Marks for (b) Star centered at A (455m), 1.5 Marks for (c) Managed switches & Optical fiber, 1.5 Marks for (d) VLAN segmentation with ACLs."
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Complete Campus Case Study Board Examination Mastery",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "In CBSE Class 12 CS case studies, what is the default cable layout topology recommended for campus networking?\n(a) Star Topology\n(b) Ring Topology\n(c) Mesh Topology\n(d) Peer-to-peer",
            "solution": "(a) Star Topology (centered at the server block).",
            "markingScheme": "1 Mark for (a) Star Topology."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the maximum cable length supported by UTP Cat6 without requiring a repeater?\n(a) 50 meters\n(b) 100 meters\n(c) 500 meters\n(d) 1000 meters",
            "solution": "(b) 100 meters.",
            "markingScheme": "1 Mark for (b) 100 meters."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What device connects multiple computers inside a single block?\n(a) Switch (or Hub)\n(b) Modem\n(c) Repeater\n(d) Splitter",
            "solution": "(a) Switch (or Hub).",
            "markingScheme": "1 Mark for (a) Switch."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the primary criterion for selecting the Server Block in CBSE case study questions.",
            "solution": "The block containing the maximum number of computers (80-20 rule).",
            "markingScheme": "1 Mark for block with maximum number of computers."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "State the conditions under which a Repeater is recommended versus when Optical Fiber is recommended.",
            "solution": "Repeater: Recommended when using copper UTP cable and the distance between devices exceeds 70-100 meters. Optical Fiber: Recommended when distance exceeds 100 meters, ultra-high speed (Gbps) is needed, or immunity to lightning and electromagnetic interference (EMI) is required.",
            "markingScheme": "1 Mark for Repeater (copper UTP > 100m), 1 Mark for Optical Fiber (>100m, high speed, EMI/lightning immunity)."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is the difference between LAN, MAN, and WAN in the context of connecting campus branch offices?",
            "solution": "LAN: Connects computers within the same campus (< 1 km). MAN: Connects branches located within the same city (5-50 km). WAN: Connects branches across different cities, states, or countries (> 50 km to global).",
            "markingScheme": "1 Mark for LAN vs MAN, 1 Mark for MAN vs WAN with geographic distances."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A case study presents 4 blocks: Alpha (110 PCs), Beta (40 PCs), Gamma (35 PCs), Delta (25 PCs).\nDistances: Alpha to Beta = 50m; Alpha to Gamma = 120m; Alpha to Delta = 80m; Beta to Gamma = 90m; Gamma to Delta = 110m.\n(a) Identify the server block.\n(b) Write the Star cabling layout.\n(c) Calculate the total cable length.",
            "solution": "(a) Server Block: Block Alpha (110 PCs, maximum).\n(b) Star Cabling: Alpha to Beta (50m), Alpha to Delta (80m), Alpha to Gamma (120m).\n(c) Total Cable Length = 50 + 80 + 120 = 250 meters.",
            "markingScheme": "1 Mark for Block Alpha server, 1 Mark for Star layout, 1 Mark for 250m calculation."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "List the essential networking hardware checklist for a 4-block campus case study.",
            "solution": "1. Local Switches: One switch inside each of the 4 blocks.\n2. Server: Central server installed in the block with maximum computers.\n3. Transmission Media: Optical Fiber for runs > 100m; Cat6 UTP for runs <= 100m.\n4. Repeaters: Required only if copper UTP runs exceed 100m (none needed if fiber is used).\n5. Gateway Router & Firewall: Installed at the main server room to connect to external ISP.",
            "markingScheme": "0.5 Marks per valid item in checklist (up to 3 Marks)."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "MASTER CASE STUDY: TechVision Software Solutions is setting up a new campus in Pune with 4 blocks:\n- Block A (Software Development): 140 Computers\n- Block B (Customer Support): 60 Computers\n- Block C (Quality Assurance): 40 Computers\n- Block D (Human Resources & Admin): 20 Computers\nDistances:\n- A to B: 60m | B to C: 110m | C to D: 70m | A to C: 125m | B to D: 130m | A to D: 85m\nAnswer all questions based on official CBSE Class 12 examination guidelines:\n(a) Suggest the most suitable block to install the main Server. Justify.\n(b) Suggest the most economical and efficient cable layout (draw or describe connections) with total cable length.\n(c) Where should switches and repeaters be installed?\n(d) Which transmission medium should connect Block A to Block C?\n(e) Suggest a communication service for conducting video conferences between the Pune campus and the Head Office in London.",
            "solution": "(a) Server Placement: Block A (Software Development). Justification: Houses the maximum number of computers (140 computers), minimizing cross-campus backbone bandwidth consumption according to the 80-20 rule.\n(b) Cable Layout: Star Topology centered at Block A.\n    Links: A to B (60m), A to D (85m), A to C (125m).\n    Total cable length = 60 + 85 + 125 = 270 meters.\n(c) Device Placement:\n    - Switches: One Switch/Hub inside each block (A, B, C, D) to interconnect local computers.\n    - Repeater: Along link A to C (125m) if copper UTP is laid (since 125m > 100m limit).\n(d) Transmission Medium for A to C: Optical Fiber Cable (handles 125m with zero repeaters, provides gigabit speeds and zero EMI).\n(e) Service for London Conference: VoIP (Voice over Internet Protocol) / Video Conferencing over a secure encrypted VPN tunnel.",
            "markingScheme": "1.5 Marks for (a) Block A server + 140 PCs, 1.5 Marks for (b) Star centered at A (270m), 1 Mark for (c) Switches in each block & repeater for A-C, 1 Mark for (d) Optical Fiber for A-C, 1 Mark for (e) VoIP / Video Conferencing over VPN."
          }
        ]
      }
    ]
  }
];
