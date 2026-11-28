export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: ARPANET, Evolution & Guided Media Fundamentals",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which agency funded ARPANET, the precursor to today's Internet, in 1969?\n(a) NASA\n(b) DARPA (US DoD)\n(c) CERN\n(d) IEEE",
            "solution": "(b) DARPA (Defense Advanced Research Projects Agency, US Department of Defense).",
            "markingScheme": "1 Mark for (b) DARPA."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which guided transmission medium is completely immune to Electromagnetic Interference (EMI)?\n(a) Unshielded Twisted Pair (UTP)\n(b) Coaxial Cable\n(c) Optical Fiber Cable\n(d) Shielded Twisted Pair (STP)",
            "solution": "(c) Optical Fiber Cable. It transmits signals as light pulses rather than electrical currents.",
            "markingScheme": "1 Mark for (c) Optical Fiber Cable."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does the unit 'bps' stand for in network communication?",
            "solution": "bits per second.",
            "markingScheme": "1 Mark for bits per second."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether infrared transmission requires a strict line of sight between transmitter and receiver.",
            "solution": "Yes. Infrared signals cannot penetrate physical walls and require direct line-of-sight.",
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
            "question": "Differentiate between Bandwidth and Data Transfer Rate.",
            "solution": "Bandwidth is the theoretical maximum frequency range or capacity of a transmission channel (measured in Hz or bps). Data Transfer Rate is the actual speed at which data is successfully transmitted over the channel (measured in bps, Mbps, Gbps).",
            "markingScheme": "1 Mark for Bandwidth, 1 Mark for Data Transfer Rate."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why are the wire pairs in a twisted-pair cable physically twisted around each other?",
            "solution": "Twisting pairs cancels out electromagnetic radiation and significantly reduces crosstalk (interference between adjacent pairs) and external electromagnetic noise.",
            "markingScheme": "1 Mark for reducing crosstalk, 1 Mark for cancelling electromagnetic noise."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Compare Twisted Pair, Coaxial Cable, and Optical Fiber on:\n1. Cost\n2. Transmission Speed\n3. Resistance to EMI",
            "solution": "1. Twisted Pair: Low cost, moderate speed (up to 10 Gbps short range), moderate EMI susceptibility.\n2. Coaxial Cable: Moderate cost, moderate-high speed, good EMI shielding.\n3. Optical Fiber: High cost (cable + transceivers), ultra-high speed (Gbps to Tbps), 100% immune to EMI.",
            "markingScheme": "1 Mark per medium comparison covering the three parameters."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "A file of size 50 Megabytes (MB) needs to be downloaded over a 40 Mbps (Megabits per second) broadband connection. Calculate the theoretical download time in seconds.",
            "solution": "1. Convert File Size to Megabits:\n   50 MB * 8 = 400 Megabits (Mb).\n2. Download Time = File Size / Transfer Rate:\n   Time = 400 Mb / 40 Mbps = 10 seconds.\nTheoretical download time is 10 seconds.",
            "markingScheme": "1.5 Marks for converting MB to Mb (50 * 8 = 400 Mb), 1.5 Marks for dividing by 40 Mbps to get 10 seconds."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "An organization is connecting three branch offices situated within a hilly region where laying physical cables is impractical due to rough rocky terrain and heavy rainfall.\n(a) Which wireless transmission medium would you recommend for connecting these offices? Justify with two reasons.\n(b) Mention one major disadvantage or challenge associated with your recommended medium.\n(c) If the organization needs an ultra-reliable, high-capacity backup link, which satellite or microwave frequency band would be appropriate?",
            "solution": "(a) Recommended Wireless Medium: Microwave transmission (or Radio wave). Justification:\n    1. Does not require physical cables across rough, rocky terrain.\n    2. Offers high bandwidth and point-to-point line-of-sight connectivity across long hilly distances.\n(b) Disadvantage: Subject to attenuation and degradation during bad weather (rain fade, heavy fog, snowfall).\n(c) For backup: Satellite communication (using Ku-band or Ka-band) or high-frequency licensed Microwave links.",
            "markingScheme": "2.5 Marks for (a) medium + 2 justifications, 1.5 Marks for (b) weather/line-of-sight challenge, 2 Marks for (c) satellite/microwave backup."
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Unguided Media (Radio Waves, Microwaves, Infrared, Satellite)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which transmission medium is omnidirectional (propagates in all directions)?\n(a) Radio waves\n(b) Infrared\n(c) Microwaves\n(d) Laser",
            "solution": "(a) Radio waves. Radio waves are omnidirectional and can penetrate walls.",
            "markingScheme": "1 Mark for (a) Radio waves."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What type of orbit is used by communication satellites providing continuous coverage over a fixed geographic area on Earth?",
            "solution": "Geostationary / Geosynchronous Earth Orbit (GEO) at ~36,000 km altitude.",
            "markingScheme": "1 Mark for Geostationary / GEO."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which connector type is standard for terminating Cat6 UTP network patch cables?\n(a) BNC\n(b) RJ-45\n(c) RJ-11\n(d) VGA",
            "solution": "(b) RJ-45 (Registered Jack 45).",
            "markingScheme": "1 Mark for (b) RJ-45."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "True or False: Bluetooth uses short-range radio waves in the 2.4 GHz ISM band.",
            "solution": "True.",
            "markingScheme": "1 Mark for True."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain why infrared signals cannot be used to connect computers located in adjacent rooms separated by a concrete wall.",
            "solution": "Infrared waves have very high frequencies that are absorbed by opaque physical obstacles like walls. They cannot penetrate solids and operate exclusively in direct line-of-sight.",
            "markingScheme": "1 Mark for high frequency absorbed by solids, 1 Mark for inability to penetrate walls / line-of-sight."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is rain fade in satellite communication?",
            "solution": "Rain fade is the absorption and scattering of microwave and satellite radio signals by atmospheric precipitation (rain, snow, ice), causing signal degradation.",
            "markingScheme": "1 Mark for signal absorption by rain/ice, 1 Mark for causing degradation/packet loss."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Differentiate between Terrestrial Microwave and Satellite Communication on:\n1. Transmission Distance\n2. Propagation Delay (Latency)\n3. Installation / Infrastructure Cost",
            "solution": "1. Terrestrial Microwave: Short to medium distance (up to 50 km between towers), very low propagation latency (< 5 ms), moderate tower setup cost.\n2. Satellite Communication: Global / interplanetary coverage, high propagation delay (~250-500 ms round trip due to 36,000 km GEO distance), extremely high launch/satellite cost.",
            "markingScheme": "1 Mark per parameter differentiation."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Calculate the time required to transfer a 2 Gigabyte (GB) video file over a 100 Mbps Ethernet connection. (Assume 1 Byte = 8 bits).",
            "solution": "1. Convert File Size to Megabits:\n   2 GB = 2 * 1024 MB = 2048 MB.\n   2048 MB * 8 = 16,384 Megabits (Mb).\n2. Time = 16,384 Mb / 100 Mbps = 163.84 seconds (~2.73 minutes).",
            "markingScheme": "1.5 Marks for byte-to-bit conversion (2048 * 8 = 16384 Mb), 1.5 Marks for 163.84 seconds calculation."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A hospital campus consists of three buildings: OPD (Out-Patient), Surgery Wing, and Diagnostic Center.\n- Distance between OPD and Surgery Wing: 80 meters\n- Distance between OPD and Diagnostic Center: 1200 meters\n- Surgery Wing to Diagnostic Center: 1150 meters\n(a) Which transmission medium should be laid between OPD and Surgery Wing for cost-effective 1 Gbps networking?\n(b) Which transmission medium is best suited between OPD and Diagnostic Center for high speed, zero electrical interference, and long-term durability?\n(c) Suggest a wireless medium for doctors to access patient records on tablets inside examination rooms.",
            "solution": "(a) Between OPD and Surgery Wing (80m): Twisted Pair (Cat6/Cat6a UTP) cable. It is cost-effective, supports 1 Gbps up to 100 meters.\n(b) Between OPD and Diagnostic Center (1200m): Optical Fiber Cable (Single-mode or Multi-mode). Fiber supports multi-kilometer runs without repeaters and provides zero EMI.\n(c) Inside examination rooms: Wi-Fi (IEEE 802.11 wireless radio waves) operating on 2.4 GHz or 5 GHz bands.",
            "markingScheme": "2 Marks for (a) UTP Cat6 with 80m justification, 2 Marks for (b) Optical Fiber with distance & EMI justification, 2 Marks for (c) Wi-Fi."
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Network Terminology, Bandwidth & Data Rate Conversions",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "How many bits are in 1 Kilobit (Kb)?\n(a) 1000 bits (decimal) or 1024 bits (binary)\n(b) 8 bits\n(c) 8000 bits\n(d) 100 bits",
            "solution": "(a) 1000 bits (standard in networking data rates) or 1024 bits in binary storage.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which of the following represents the highest data transfer rate?\n(a) 100 Mbps\n(b) 1 Gbps\n(c) 10,000 Kbps\n(d) 500 MBps",
            "solution": "(d) 500 MBps. 500 Megabytes per second = 4,000 Megabits per second (4 Gbps), which is greater than 1 Gbps.",
            "markingScheme": "1 Mark for (d) 500 MBps (with MBps vs Mbps distinction)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is attenuation in network media?",
            "solution": "The loss or reduction of signal strength as it travels through a transmission medium.",
            "markingScheme": "1 Mark for reduction of signal strength over distance."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the transmission mechanism used inside optical fibers.",
            "solution": "Total Internal Reflection (TIR) of light pulses inside the core glass.",
            "markingScheme": "1 Mark for Total Internal Reflection (TIR)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain the difference between bps (lowercase b) and Bps (uppercase B).",
            "solution": "bps stands for bits per second (standard unit for network bandwidth). Bps stands for Bytes per second (where 1 Byte = 8 bits, typical for download speed). Thus 1 Bps = 8 bps.",
            "markingScheme": "1 Mark for bits per second vs Bytes per second, 1 Mark for 1 Byte = 8 bits."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is Crosstalk in copper transmission cables?",
            "solution": "Crosstalk is electromagnetic interference caused by signal bleed or leakage from one adjacent copper wire pair into another, distorting data.",
            "markingScheme": "1 Mark for interference between adjacent wire pairs, 1 Mark for signal bleeding/distortion."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Convert:\n1. 10 Gbps into Mbps\n2. 256 Kbps into bps\n3. 800 MB file into Megabits",
            "solution": "1. 10 Gbps = 10 * 1000 = 10,000 Mbps (or 10 * 1024 = 10,240 Mbps).\n2. 256 Kbps = 256 * 1000 = 256,000 bps.\n3. 800 MB = 800 * 8 = 6,400 Megabits (Mb).",
            "markingScheme": "1 Mark per correct conversion."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the physical construction of an Optical Fiber Cable (Core, Cladding, Buffer Coating).",
            "solution": "1. Core: Central ultra-pure glass or plastic cylinder where light pulses travel.\n2. Cladding: Outer glass layer with lower refractive index that reflects light back into the core via TIR.\n3. Buffer Coating: Outer protective plastic/kevlar jacket shielding the delicate fiber against moisture and physical damage.",
            "markingScheme": "1 Mark for Core, 1 Mark for Cladding & refractive index, 1 Mark for Buffer coating."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A research institute requires real-time telemetry streaming from deep sea sensors situated 15 km off the coast to an onshore laboratory.\n(a) Evaluate whether Wi-Fi, Undersea Optical Fiber, or Satellite communication is best suited for 24/7 high-bandwidth low-latency telemetry. Justify.\n(b) If satellite communication is chosen as a contingency backup, what latency penalty must the telemetry system tolerate?\n(c) Name two environmental factors that can attenuate marine optical fiber cables.",
            "solution": "(a) Recommended: Undersea Optical Fiber Cable. Justification: Provides high bandwidth (Gbps), lowest latency (<1 ms over 15 km), completely impervious to salt water electromagnetic noise, and unaffected by ocean surface storms.\n(b) Latency Penalty: Geostationary satellite introduces ~500 ms round-trip propagation latency, which can cause significant delays in real-time sensor control.\n(c) Environmental factors: Physical tension / anchor snagging, shark/marine life bites, subsea seismic disturbances, hydrogen darkening.",
            "markingScheme": "2.5 Marks for (a) undersea fiber recommendation and justifications, 1.5 Marks for (b) satellite 500ms delay, 2 Marks for (c) two marine risks."
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Cable Standards, Connectors & Media Selection Matrix",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which category of UTP cable is commonly rated for Gigabit Ethernet (1000BASE-T)?\n(a) Cat3\n(b) Cat5e / Cat6\n(c) Cat1\n(d) Cat2",
            "solution": "(b) Cat5e / Cat6.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What connector is used with coaxial cables in legacy Ethernet (10BASE2)?\n(a) RJ-45\n(b) BNC (Bayonet Neill-Concelman)\n(c) SC\n(d) ST",
            "solution": "(b) BNC.",
            "markingScheme": "1 Mark for (b) BNC."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the maximum recommended cable segment length for standard UTP Ethernet without a repeater?\n(a) 50 meters\n(b) 100 meters\n(c) 500 meters\n(d) 1000 meters",
            "solution": "(b) 100 meters.",
            "markingScheme": "1 Mark for (b) 100 meters."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "True or False: Single-mode optical fiber supports longer transmission distances than multi-mode optical fiber.",
            "solution": "True. Single-mode fiber has a thinner core that minimizes modal dispersion, enabling transmission over tens of kilometers.",
            "markingScheme": "1 Mark for True."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between UTP (Unshielded Twisted Pair) and STP (Shielded Twisted Pair) cables.",
            "solution": "UTP has no metallic foil shield around wire pairs, making it lightweight, flexible, and cheaper. STP includes a metallic foil/braided mesh around pairs, providing superior protection against electromagnetic interference (EMI) at higher cost.",
            "markingScheme": "1 Mark for shield difference, 1 Mark for EMI protection and cost contrast."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is the function of a modem in data communication?",
            "solution": "Modem (Modulator-Demodulator) converts digital signals from a computer into analog signals for transmission over analog telephone/cable lines, and demodulates received analog signals back into digital bits.",
            "markingScheme": "1 Mark for Modulation (digital to analog), 1 Mark for Demodulation (analog to digital)."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Fill in the media selection matrix for an educational campus:\n1. Inter-building backbone (500m distance)\n2. Intra-building computer lab (30 computers within 40m)\n3. Outdoor sports field Wi-Fi access\nName the recommended medium for each scenario.",
            "solution": "1. Inter-building backbone: Optical Fiber Cable (high bandwidth, immune to lightning/ground loops, covers 500m easily).\n2. Intra-building lab: Cat6 UTP copper cable (cheap, easily terminated with RJ-45, supports 1 Gbps up to 100m).\n3. Outdoor sports field: Outdoor Wireless Radio waves (Wi-Fi Access Points with weather-proof omnidirectional antennas).",
            "markingScheme": "1 Mark per scenario with valid medium and technical reasoning."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the terms: Baud Rate, Bit Rate, and Channel Capacity.",
            "solution": "1. Baud Rate: Number of signal state transitions (or symbol changes) per second.\n2. Bit Rate: Number of information bits transmitted per second.\n3. Channel Capacity: The maximum upper limit of information that can be reliably transmitted over a communication channel without error (Nyquist/Shannon theorem).",
            "markingScheme": "1 Mark for Baud Rate, 1 Mark for Bit Rate, 1 Mark for Channel Capacity."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A factory manufacturing heavy industrial motors experiences frequent data packet corruption on its production floor.\n(a) Explain why standard UTP Cat5e cables are failing in this environment.\n(b) Recommend two alternative transmission media that would solve the problem. Contrast their advantages and installation costs.\n(c) If fiber optic cable is installed, explain why technicians must handle it with special care.",
            "solution": "(a) Heavy industrial motors generate severe Electromagnetic Interference (EMI) and Radio Frequency Interference (RFI). Standard unshielded UTP lacks protective shielding, leading to induced noise voltages and packet corruption.\n(b) Alternatives:\n    1. STP (Shielded Twisted Pair): Metallic foil blocks EMI; moderate cost, uses existing RJ-45 copper infrastructure.\n    2. Optical Fiber Cable: 100% dielectric glass core; completely immune to EMI/RFI; higher cost and requires fiber splicing equipment.\n(c) Fiber Care: Glass cores are brittle and can fracture if bent past minimum bend radius. Optical end-faces are easily contaminated by microscopic dust.",
            "markingScheme": "2 Marks for (a) EMI/RFI explanation, 2.5 Marks for (b) STP vs Fiber comparison, 1.5 Marks for (c) glass brittleness and dust sensitivity."
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Comprehensive Evolution, Media Comparison & Review",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "In which year did NSFNET expand the academic networking backbone connecting US universities?\n(a) 1969\n(b) 1986\n(c) 1995\n(d) 2001",
            "solution": "(b) 1986.",
            "markingScheme": "1 Mark for (b) 1986."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which wireless technology operates using line-of-sight in the 300 GHz to 400 THz frequency range?\n(a) Infrared\n(b) Radio waves\n(c) Satellite\n(d) Cellular 4G",
            "solution": "(a) Infrared.",
            "markingScheme": "1 Mark for (a) Infrared."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the typical impedance of coaxial cable used in cable television (CATV)?\n(a) 50 Ohms\n(b) 75 Ohms\n(c) 100 Ohms\n(d) 120 Ohms",
            "solution": "(b) 75 Ohms (RG-6 / RG-59).",
            "markingScheme": "1 Mark for (b) 75 Ohms."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the primary protocol suite that enabled heterogeneous networks to interconnect to form the Internet.",
            "solution": "TCP/IP (Transmission Control Protocol / Internet Protocol).",
            "markingScheme": "1 Mark for TCP/IP."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "State two advantages and two disadvantages of Coaxial Cable compared to Twisted Pair.",
            "solution": "Advantages: Higher bandwidth than basic UTP, better EMI shielding due to copper mesh.\nDisadvantages: Bulkier and stiffer to route through conduits, more expensive than UTP.",
            "markingScheme": "1 Mark for advantages, 1 Mark for disadvantages."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain the function of repeaters in long-distance data transmission.",
            "solution": "Repeaters receive weakened and distorted incoming signals due to attenuation, regenerate the clean original digital waveform at full electrical amplitude, and retransmit it.",
            "markingScheme": "1 Mark for signal regeneration against attenuation, 1 Mark for retransmitting clean waveform."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Calculate how long it will take to upload a 250 MB raw dataset over a 25 Mbps broadband upload connection.",
            "solution": "1. Convert File Size to Megabits:\n   250 MB * 8 = 2,000 Megabits (Mb).\n2. Upload Time = 2,000 Mb / 25 Mbps = 80 seconds (1 minute 20 seconds).",
            "markingScheme": "1.5 Marks for 250 * 8 = 2000 Mb, 1.5 Marks for 2000 / 25 = 80 seconds."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "What is a communication satellite transponder and what are its two primary functions?",
            "solution": "A transponder is an onboard electronic transceiver on a communication satellite.\nTwo functions:\n1. Receives uplink radio signals from an Earth station on a designated uplink frequency.\n2. Amplifies the signal and converts it to a different downlink frequency to transmit back to Earth stations without interfering with the uplink.",
            "markingScheme": "1 Mark for definition of transponder, 1 Mark for uplink reception and amplification, 1 Mark for frequency translation to downlink."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A solar power installation located in the Thar desert requires transmitting live telemetry data to the state electrical load dispatch center 250 km away.\n(a) Which transmission medium would you propose? Justify based on desert environmental factors (extreme heat, sandstorms, vast uninhabited distance).\n(b) If satellite communication is selected, explain why VSAT (Very Small Aperture Terminal) dish antennas are optimal for remote desert substations.\n(c) Name two frequencies used in satellite communication (Uplink and Downlink bands).",
            "solution": "(a) Recommended: Satellite Communication (or long-haul optical fiber along high-voltage transmission lines - OPGW).\nJustification: Laying physical copper or standard trenches across shifting desert dunes is prone to disruption and high maintenance. Satellite requires zero terrestrial desert infrastructure.\n(b) VSAT Advantages: Compact dish antenna (0.75m to 2.4m), highly reliable in remote locations, operates via solar-powered batteries, provides direct point-to-multipoint communication.\n(c) Frequency bands: C-band (Uplink: 6 GHz, Downlink: 4 GHz) or Ku-band (Uplink: 14 GHz, Downlink: 12 GHz).",
            "markingScheme": "2.5 Marks for (a) Satellite recommendation with desert justification, 2 Marks for (b) VSAT suitability, 1.5 Marks for (c) frequency bands."
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Transmission Impairments (Noise, Distortion, Attenuation)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which transmission impairment is caused by external electromagnetic signals corrupting the original signal?\n(a) Thermal Noise\n(b) Crosstalk / Noise\n(c) Dispersion\n(d) Bandwidth",
            "solution": "(b) Crosstalk / Noise.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is Modal Dispersion in optical fibers?",
            "solution": "The spreading of light pulses over time because different light rays (modes) travel along different optical paths of varying lengths inside a multi-mode fiber core.",
            "markingScheme": "1 Mark for spreading of light pulses due to different path lengths."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What device is used to amplify or regenerate signals over long copper cable runs?\n(a) Repeater\n(b) Firewall\n(c) Gateway\n(d) Router",
            "solution": "(a) Repeater.",
            "markingScheme": "1 Mark for (a) Repeater."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether optical signals experience attenuation as they travel through high-purity silica glass.",
            "solution": "Yes. Light signals experience slight attenuation due to Rayleigh scattering and absorption, typically ~0.2 dB/km.",
            "markingScheme": "1 Mark for Yes (slight attenuation exists)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between Analog Signals and Digital Signals.",
            "solution": "Analog signals are continuous waveforms that vary smoothly over time (e.g. human voice, traditional radio). Digital signals are discrete binary electrical pulses representing 0s and 1s.",
            "markingScheme": "1 Mark for continuous vs discrete, 1 Mark for waveforms vs binary pulses."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why does an amplifier differ fundamentally from a digital repeater?",
            "solution": "An amplifier boosts both the signal AND any accumulated noise indiscriminately. A digital repeater reconstructs and regenerates the clean binary 0 and 1 pulses from scratch, eliminating noise.",
            "markingScheme": "1 Mark for amplifier boosts noise too, 1 Mark for repeater regenerates clean digital signal."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A company needs to connect two buildings 450 meters apart on the same corporate campus. Evaluate three options: UTP Cat6, Coaxial Cable, and Optical Fiber. Recommend the best option.",
            "solution": "1. UTP Cat6: Max distance is 100m. Exceeds limit by 350m without repeaters -> Infeasible.\n2. Coaxial Cable: Thicknet supports 500m but is obsolete, expensive, and difficult to manage.\n3. Optical Fiber: Supports up to 2-10 km easily, high bandwidth (10 Gbps), immune to outdoor lightning and ground potential differences between buildings.\nRecommendation: Optical Fiber Cable.",
            "markingScheme": "1 Mark for rejecting UTP (100m limit), 1 Mark for coaxial analysis, 1 Mark for selecting Optical Fiber with technical justification."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Define Throughput and Latency. How does high latency impact interactive video conferencing?",
            "solution": "1. Throughput: The actual rate of successful data delivery over a communication link per unit time.\n2. Latency: The total time delay taken for a data packet to travel from source to destination.\n3. Impact on Video Conferencing: High latency (> 150 ms) causes noticeable lag, awkward conversational overlaps, out-of-sync audio/video, and frozen video frames.",
            "markingScheme": "1 Mark for Throughput, 1 Mark for Latency, 1 Mark for impact on real-time conferencing."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A high-speed train traveling at 300 km/h needs continuous broadband internet for passengers.\n(a) Why are wired guided media completely impossible for this application?\n(b) Compare cellular 4G/5G mobile communication with satellite tracking communication for high-speed trains.\n(c) Explain Doppler shift and how it affects wireless communication on moving vehicles.",
            "solution": "(a) Guided media require permanent physical cable connections between sender and receiver, which cannot be maintained on a mobile vehicle moving at 300 km/h.\n(b) Cellular 4G/5G vs Satellite:\n    - Cellular 4G/5G: Provides lower latency, high bandwidth via trackside base stations, but requires rapid seamless handovers between towers every few seconds.\n    - Satellite: Broad continuous coverage regardless of trackside towers, but suffers from tunnel blackouts and antenna tracking challenges at high velocity.\n(c) Doppler Shift: The change in frequency of a received electromagnetic wave caused by the relative motion between transmitter and receiver. At 300 km/h, frequency offsets must be compensated by digital signal processors.",
            "markingScheme": "1.5 Marks for (a), 2.5 Marks for (b) cellular vs satellite comparison, 2 Marks for (c) Doppler shift definition and effect."
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Modern Wireless Technologies (Wi-Fi, Bluetooth, NFC, 5G)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the typical operating range of NFC (Near Field Communication)?\n(a) Up to 4 cm\n(b) Up to 10 meters\n(c) Up to 100 meters\n(d) Up to 1 km",
            "solution": "(a) Up to 4 cm (very short range for secure contact-less payments).",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which IEEE standard governs Wi-Fi wireless local area networks?\n(a) IEEE 802.3\n(b) IEEE 802.11\n(c) IEEE 802.15\n(d) IEEE 802.1",
            "solution": "(b) IEEE 802.11.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What frequency bands are standard for dual-band Wi-Fi routers?",
            "solution": "2.4 GHz and 5 GHz.",
            "markingScheme": "1 Mark for 2.4 GHz and 5 GHz."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the primary advantage of 5 GHz Wi-Fi over 2.4 GHz Wi-Fi.",
            "solution": "Higher data transfer speed and less congestion/interference, though with shorter physical range.",
            "markingScheme": "1 Mark for higher speed / less interference."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between Bluetooth and Wi-Fi on range and primary use case.",
            "solution": "Bluetooth: Short range (~10 meters), low power, used for Personal Area Networks (PANs) connecting peripherals (headphones, mice, smartwatches). Wi-Fi: Medium range (~50-100 meters), higher power, used for Local Area Networks (LANs) connecting multiple devices to the Internet.",
            "markingScheme": "1 Mark for range difference, 1 Mark for use case contrast."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is Li-Fi (Light Fidelity) and how does it transmit data?",
            "solution": "Li-Fi is a visible light communications system that transmits data wirelessly by modulating light emitted from LED bulbs at speeds imperceptible to the human eye.",
            "markingScheme": "1 Mark for visible light communication / LED modulation, 1 Mark for high-speed optical transmission."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Compare 2.4 GHz Wi-Fi and 5 GHz Wi-Fi on:\n1. Coverage Range\n2. Wall Penetration Ability\n3. Peak Data Speeds",
            "solution": "1. Coverage Range: 2.4 GHz provides larger coverage area; 5 GHz has shorter range.\n2. Wall Penetration: 2.4 GHz penetrates physical walls better due to longer wavelength; 5 GHz struggles through solid obstacles.\n3. Peak Speeds: 2.4 GHz is slower (up to 450-600 Mbps); 5 GHz delivers much higher throughput (up to 1300+ Mbps).",
            "markingScheme": "1 Mark per parameter comparison."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the security advantages of NFC for contactless debit card payments compared to Bluetooth.",
            "solution": "NFC has an extremely short physical operational distance (< 4 cm). This makes eavesdropping and remote wireless skimming virtually impossible without physically brushing against the card, unlike Bluetooth which can be intercepted from 10 meters away.",
            "markingScheme": "1.5 Marks for short operational distance (< 4 cm), 1.5 Marks for preventing wireless skimming/eavesdropping."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A smart city project is deploying IoT (Internet of Things) devices:\n1. Smart water meters distributed across 10,000 homes in a 20 km city radius.\n2. In-store digital payment kiosks.\n3. Wireless security cameras streaming HD video at traffic intersections.\nRecommend the most suitable wireless transmission technology for each of the three applications and justify your choice.",
            "solution": "1. Smart water meters: Cellular IoT / LoRaWAN (Long Range Wide Area Network). Justification: Low power consumption (battery lasts 10 years), long range (covers 10-15 km), transmits small periodic telemetry packets.\n2. In-store payment kiosks: NFC (Near Field Communication). Justification: High security, instant pairing, operates within 4 cm for contactless tap-to-pay.\n3. Traffic HD cameras: 5G Cellular or Point-to-Point Microwave / Fiber. Justification: High continuous bandwidth required for streaming HD video with minimal latency.",
            "markingScheme": "2 Marks for water meters (LoRaWAN/Cellular IoT), 2 Marks for payment (NFC), 2 Marks for HD traffic cameras (5G / Microwave)."
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Transmission Media Cost, Installation & Reliability Engineering",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which of the following guided media requires the most expensive termination and testing equipment?\n(a) UTP Cat5e\n(b) Optical Fiber\n(c) Coaxial Cable\n(d) Telephone wire",
            "solution": "(b) Optical Fiber (requires fusion splicers and OTDR testers).",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does OTDR stand for in fiber optic testing?\n(a) Optical Time Domain Reflectometer\n(b) Output Transmission Digital Router\n(c) Open Telecommunication Data Receiver\n(d) Optical Terminal Direct Relay",
            "solution": "(a) Optical Time Domain Reflectometer.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which transmission medium is immune to lightning strikes between buildings?",
            "solution": "Optical Fiber Cable (because glass is non-conductive and carries no electrical charge).",
            "markingScheme": "1 Mark for Optical Fiber."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether microwave transmission requires legal spectrum licensing from government telecommunication authorities.",
            "solution": "Yes. Point-to-point terrestrial microwave links operate in licensed frequency bands to prevent interference.",
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
            "question": "What is a Ground Loop in copper networking cables between buildings, and how does fiber optic cable prevent it?",
            "solution": "When two buildings connected by copper cables have different electrical ground potentials, current flows along the cable shield causing ground loops, noise, and equipment damage. Fiber optic cables use non-conductive glass, completely eliminating electrical ground loops.",
            "markingScheme": "1 Mark for explaining ground potential difference in copper, 1 Mark for non-conductive glass solution."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why does multi-mode optical fiber have a larger core diameter than single-mode fiber?",
            "solution": "Multi-mode fiber has a larger core (50-62.5 microns) to allow multiple light modes/angles to propagate simultaneously, simplifying coupling with inexpensive LED transmitters.",
            "markingScheme": "1 Mark for larger core (50-62.5 um), 1 Mark for coupling multiple modes with cheaper LEDs."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A bank branch needs to set up a new network for 25 teller computers. The longest distance from the server rack to any computer is 65 meters.\n(a) Which cable category should be chosen?\n(b) Which connector should be crimped?\n(c) Will a repeater be required? Explain.",
            "solution": "(a) Cable: Cat6 UTP (Unshielded Twisted Pair).\n(b) Connector: RJ-45.\n(c) Repeater: No. Standard UTP supports up to 100 meters without repeaters; 65 meters is well within the threshold.",
            "markingScheme": "1 Mark for Cat6 UTP, 1 Mark for RJ-45, 1 Mark for No repeater needed (65m < 100m)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain why microwave towers are installed on hilltops or tall towers with line-of-sight parabolic antennas.",
            "solution": "Microwaves travel in straight lines and cannot bend around the curvature of the Earth or penetrate physical terrain obstacles. Installing parabolic antennas on tall towers or hilltops ensures an unobstructed line-of-sight path between transmitter and receiver.",
            "markingScheme": "1.5 Marks for straight line propagation / cannot bend over Earth curvature, 1.5 Marks for unobstructed line-of-sight."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A high-security defense establishment requires a data communication network connecting its command bunker to an observation radar post 3 km away.\n(a) Why is wireless transmission prohibited in high-security defense compounds?\n(b) Between Coaxial Cable and Optical Fiber, which medium must be selected? Provide two decisive reasons based on eavesdropping and distance.\n(c) Explain how someone could eavesdrop on a copper wire versus an optical fiber.",
            "solution": "(a) Wireless signals radiate omnidirectionally through the air and can be easily intercepted, eavesdropped upon, or jammed by adversarial electronic warfare.\n(b) Selected Medium: Optical Fiber Cable. Decisive reasons:\n    1. Fiber covers 3 km easily without repeaters.\n    2. Fiber carries light inside glass and does not emit electromagnetic radiation, making it virtually tap-proof.\n(c) Eavesdropping mechanism: Copper cables radiate electromagnetic fields that can be picked up with inductive RF sensors without cutting the wire. Optical fiber emits zero radiation; tapping requires physical bending or cutting which causes detectable light loss and triggers automated alarms.",
            "markingScheme": "2 Marks for (a) wireless vulnerability to interception/jamming, 2 Marks for (b) optical fiber selection and reasons, 2 Marks for (c) copper EM radiation vs fiber tamper detection."
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Bandwidth, Channel Capacity & Numerical Calculations",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "If a channel has a bandwidth of 10 MHz, what is the unit MHz measuring?\n(a) Data rate in bits\n(b) Frequency range (Cycles per second)\n(c) Signal voltage\n(d) Resistance",
            "solution": "(b) Frequency range (Million cycles per second).",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the speed of light in optical fiber (refractive index n ~ 1.5)?\n(a) 300,000 km/s\n(b) ~200,000 km/s\n(c) 150,000 km/s\n(d) 100,000 km/s",
            "solution": "(b) ~200,000 km/s (c / 1.5 = 300,000 / 1.5).",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does a bandwidth specification of '100 Mbps' mean for a network link?",
            "solution": "The channel can carry a maximum theoretical throughput of 100 million bits of data per second.",
            "markingScheme": "1 Mark for 100 million bits per second."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "True or False: Data transfer rate over wireless media is generally more variable than over wired fiber optic cables.",
            "solution": "True. Wireless signals are subject to environmental interference, distance, obstacles, and weather conditions.",
            "markingScheme": "1 Mark for True."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "A user downloads a file at a constant speed of 5 MB/s (Megabytes per second). What is the effective network connection speed in Mbps?",
            "solution": "5 Megabytes/sec * 8 bits/byte = 40 Megabits/sec (40 Mbps).\nEffective connection speed is 40 Mbps.",
            "markingScheme": "1 Mark for 5 * 8 calculation, 1 Mark for 40 Mbps."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is Propagation Delay and how is it calculated?",
            "solution": "Propagation Delay is the time taken for a bit to travel from sender to receiver across the physical medium.\nFormula: Propagation Delay = Distance / Propagation Speed in Medium.",
            "markingScheme": "1 Mark for definition, 1 Mark for Distance / Speed formula."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Calculate the total transmission time to send a 10 Megabyte (MB) file over:\n1. A 56 Kbps dial-up link\n2. A 10 Mbps broadband link\n3. A 1 Gbps fiber link",
            "solution": "File size in bits = 10 * 8 * 1,000,000 = 80,000,000 bits.\n1. 56 Kbps: 80,000,000 / 56,000 = ~1428.57 seconds (~23.8 minutes).\n2. 10 Mbps: 80,000,000 / 10,000,000 = 8 seconds.\n3. 1 Gbps: 80,000,000 / 1,000,000,000 = 0.08 seconds (80 milliseconds).",
            "markingScheme": "1 Mark per calculated transmission time."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain why satellite communication introduces a minimum latency of approximately 240 to 250 milliseconds.",
            "solution": "Geostationary satellites orbit at ~36,000 km altitude. A signal travels Earth to satellite (36,000 km) and back to Earth (36,000 km) = 72,000 km total path. At the speed of light (300,000 km/s): Delay = 72,000 / 300,000 = 0.24 seconds = 240 ms.",
            "markingScheme": "1.5 Marks for 72,000 km round trip distance, 1.5 Marks for 72000 / 300000 = 0.24s (240 ms) derivation."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A software company operates two development centers: Center A in Bengaluru and Center B in London (distance = 8,000 km).\n(a) Why are undersea fiber optic cables preferred over communication satellites for connecting these two international centers?\n(b) If a data center backup of size 1 Terabyte (TB) is transferred nightly over an allocated 1 Gbps transatlantic link, calculate the theoretical time required in hours and minutes. (1 TB = 1,000,000 MB; 1 Byte = 8 bits).\n(c) Name one major submarine cable system connecting India to Europe.",
            "solution": "(a) Undersea Fiber vs Satellite: Undersea fiber provides vastly superior bandwidth (hundreds of Terabits/sec) and much lower latency (~80 ms vs ~500 ms round trip on satellite), which is critical for interactive developer collaboration and database synchronization.\n(b) Time Calculation:\n    1 TB = 8 Terabits (Tb) = 8,000 Gigabits (Gb).\n    Link speed = 1 Gbps.\n    Time = 8,000 Gb / 1 Gbps = 8,000 seconds.\n    8,000 / 3600 = 2 hours and 13 minutes (approx 2.22 hours).\n(c) Submarine cable system: SEA-ME-WE (South East Asia-Middle East-Western Europe), AAE-1, or Europe India Gateway (EIG).",
            "markingScheme": "2 Marks for (a) fiber vs satellite latency & capacity, 2.5 Marks for (b) 8000s = 2h 13m calculation, 1.5 Marks for (c) submarine cable name."
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Complete Network Evolution & Media Board Examination Mastery",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which of the following is an Unguided transmission medium?\n(a) Coaxial Cable\n(b) Satellite microwave link\n(c) Fiber optic cable\n(d) UTP Cat6",
            "solution": "(b) Satellite microwave link.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What connector terminates an Optical Fiber Cable?\n(a) RJ-45\n(b) SC / LC / ST connector\n(c) RJ-11\n(d) DB-9",
            "solution": "(b) SC / LC / ST connector.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What network pioneer organization succeeded ARPANET before commercial ISPs took over?",
            "solution": "NSFNET (National Science Foundation Network).",
            "markingScheme": "1 Mark for NSFNET."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether infrared waves can penetrate through human bodies or clothing.",
            "solution": "No. Infrared waves are easily blocked and absorbed by human bodies and fabrics.",
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
            "question": "State two advantages of Optical Fiber over Twisted Pair and two situations where Twisted Pair is still preferred.",
            "solution": "Fiber Advantages: Immune to EMI, supports multi-gigabit speeds over kilometers.\nUTP Preferred: Short distances inside rooms (< 100m) due to much lower cable cost and quick termination with cheap RJ-45 crimping tools.",
            "markingScheme": "1 Mark for fiber advantages, 1 Mark for UTP preference scenarios."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain the concept of Omnidirectional vs Directional antennas in wireless transmission.",
            "solution": "Omnidirectional antennas radiate/receive radio waves equally in all directions (360 degrees, like home Wi-Fi). Directional antennas focus electromagnetic energy in a single narrow beam towards a target (like satellite dishes and microwave horns).",
            "markingScheme": "1 Mark for Omnidirectional 360 degrees, 1 Mark for Directional focused narrow beam."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A school wants to link its main administration building with a newly constructed sports pavilion 800 meters away.\n(a) Which guided cable would you recommend?\n(b) If laying underground cable is forbidden across the sports field, which wireless technology should be deployed?\n(c) What weather phenomenon could affect the wireless link?",
            "solution": "(a) Recommended Guided: Optical Fiber Cable (supports 800m without repeaters).\n(b) Recommended Wireless: Point-to-Point Terrestrial Microwave / Free Space Optics (FSO).\n(c) Weather Phenomenon: Rain fade, heavy fog, and severe thunderstorms.",
            "markingScheme": "1 Mark for Optical Fiber, 1 Mark for Point-to-Point Microwave, 1 Mark for rain fade / fog."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Convert a transmission rate of 2.5 Gbps into Megabytes per second (MB/s).",
            "solution": "1. 2.5 Gbps = 2,500 Megabits per second (Mbps).\n2. Divide by 8 to convert bits to Bytes:\n   2,500 / 8 = 312.5 Megabytes per second (MB/s).",
            "markingScheme": "1.5 Marks for converting Gbps to Mbps (2500 Mbps), 1.5 Marks for dividing by 8 to get 312.5 MB/s."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A media production house needs to transfer 4K video rushes between an outdoor broadcast van and a mobile editing studio parked 200 meters away in an open stadium.\n(a) Evaluate three transmission media: UTP Cat6, Tactical Fiber Optic Cable, and Wi-Fi 5.\n(b) Which medium would you recommend for transferring uncompressed 4K video (requiring ~12 Gbps throughput) without dropping frames?\n(c) How does the stadium's large crowd of 50,000 spectators with smartphones impact Wi-Fi transmission?",
            "solution": "(a) Evaluation:\n    1. UTP Cat6: Max distance is 100m; 200m exceeds the limit without repeaters. Throughput capped at 1-10 Gbps.\n    2. Tactical Fiber Optic: Easily spans 200m, delivers 10-40 Gbps, completely immune to interference from crowd mobile phones.\n    3. Wi-Fi 5: Shared wireless medium; throughput capped well below 1 Gbps; cannot support 12 Gbps uncompressed stream.\n(b) Recommendation: Heavy-duty Tactical Optical Fiber Cable (OM3/OM4 or single-mode).\n(c) Impact of 50,000 Spectators: Extreme 2.4 GHz and 5 GHz wireless RF spectrum congestion, severe co-channel interference, packet collisions, and massive throughput collapse.",
            "markingScheme": "2.5 Marks for (a) media evaluation, 1.5 Marks for (b) Tactical Fiber recommendation, 2 Marks for (c) crowd wireless RF congestion & interference."
          }
        ]
      }
    ]
  }
];
