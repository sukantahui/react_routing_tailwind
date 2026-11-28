// 25 Authentic CBSE Board Examination Questions for Topic 5
const questions = [
  {
    "id": 1,
    "question": "What is the primary function of a network repeater?",
    "options": [
      "To route packets between different subnets",
      "To regenerate, reshape, and retransmit attenuated digital signals to extend network reach",
      "To convert analog voice to digital text",
      "To translate between completely different protocols"
    ],
    "answer": "To regenerate, reshape, and retransmit attenuated digital signals to extend network reach",
    "explanation": "A repeater regenerates and amplifies incoming digital signals that have degraded over distance, allowing cables to run further.",
    "hint": "Regenerates and reshapes attenuated signals."
  },
  {
    "id": 2,
    "question": "At which layer of the OSI reference model does a repeater operate?",
    "options": [
      "Physical Layer (Layer 1)",
      "Data Link Layer (Layer 2)",
      "Network Layer (Layer 3)",
      "Application Layer (Layer 7)"
    ],
    "answer": "Physical Layer (Layer 1)",
    "explanation": "Repeaters operate strictly at Layer 1 (Physical Layer), dealing purely with electrical/optical signal regeneration.",
    "hint": "Layer 1: Physical Layer."
  },
  {
    "id": 3,
    "question": "What is the critical technical difference between an Amplifier and a Repeater?",
    "options": [
      "An amplifier increases both signal and noise indiscriminately; a repeater decodes bits against a threshold and regenerates a clean, noise-free square wave",
      "An amplifier is for computers; a repeater is for televisions",
      "Repeaters are made of glass; amplifiers are made of plastic",
      "Amplifiers run on batteries only"
    ],
    "answer": "An amplifier increases both signal and noise indiscriminately; a repeater decodes bits against a threshold and regenerates a clean, noise-free square wave",
    "explanation": "Analog amplifiers boost everything including noise. Digital repeaters discard the noise and output a brand-new digital pulse.",
    "hint": "Amplifiers boost noise; repeaters regenerate clean bits."
  },
  {
    "id": 4,
    "question": "In a CBSE 5-mark Case Study: The distance between Block A and Block B is 160 meters, connected via Cat-6 UTP cable. Which device must be installed?",
    "options": [
      "Repeater",
      "Modem",
      "Coaxial Terminator",
      "Vampire Tap"
    ],
    "answer": "Repeater",
    "explanation": "Since 160 meters exceeds the 100-meter copper UTP segment limit, an active repeater must be inserted to regenerate the bitstream.",
    "hint": "Distance exceeds 100 meters on copper cabling."
  },
  {
    "id": 5,
    "question": "In a CBSE 5-mark Case Study: All inter-building distances on a school campus are 45m, 60m, and 85m. Where should a repeater be placed?",
    "options": [
      "Between every single computer",
      "No repeater is needed anywhere because all distances are well within the 100-meter UTP segment limit",
      "At the entrance gate of the school",
      "Inside the computer CPU"
    ],
    "answer": "No repeater is needed anywhere because all distances are well within the 100-meter UTP segment limit",
    "explanation": "Because no segment exceeds 100 meters, signal attenuation is within acceptable limits and no repeater is needed.",
    "hint": "All distances are under 100 meters."
  },
  {
    "id": 6,
    "question": "What does the '5-4-3 Rule' in legacy 10 Mbps Ethernet specify?",
    "options": [
      "Maximum 5 segments, 4 repeaters, and 3 populated (host-bearing) segments between any two nodes",
      "5 routers, 4 switches, 3 hubs",
      "5 passwords, 4 usernames, 3 firewalls",
      "5 gigabits, 4 megabits, 3 kilobits"
    ],
    "answer": "Maximum 5 segments, 4 repeaters, and 3 populated (host-bearing) segments between any two nodes",
    "explanation": "The 5-4-3 rule prevents round-trip propagation delay from exceeding the 512-bit slot time for collision detection.",
    "hint": "5 segments, 4 repeaters, 3 populated segments."
  },
  {
    "id": 7,
    "question": "Why was the 5-4-3 rule strictly enforced in shared CSMA/CD Ethernet networks?",
    "options": [
      "To prevent electricity from running out",
      "To ensure that round-trip propagation delay does not exceed the collision detection window (slot time)",
      "Because cables were only sold in packs of 5",
      "To restrict the number of students on the network"
    ],
    "answer": "To ensure that round-trip propagation delay does not exceed the collision detection window (slot time)",
    "explanation": "If propagation delay is too long, a transmitting node might finish sending a minimum-size frame before a collision echo returns, failing to detect the collision.",
    "hint": "Round-trip collision detection window limit."
  },
  {
    "id": 8,
    "question": "Does a repeater inspect MAC addresses or IP addresses when repeating signals?",
    "options": [
      "Yes, it inspects both",
      "No, a repeater operates at Layer 1 and has no awareness of frames, packets, MAC addresses, or IP addresses",
      "Only when the packet contains video",
      "Only if it is an optical repeater"
    ],
    "answer": "No, a repeater operates at Layer 1 and has no awareness of frames, packets, MAC addresses, or IP addresses",
    "explanation": "Repeaters are Layer-1 physical devices. They blindly regenerate incoming electrical/optical pulses at the physical bit level.",
    "hint": "Zero address awareness at Layer 1."
  },
  {
    "id": 9,
    "question": "Does a repeater break or segment collision domains?",
    "options": [
      "Yes, it creates a new collision domain for each side",
      "No, both sides of a repeater belong to the exact same collision domain",
      "Only if the cable is optical fiber",
      "Only on weekends"
    ],
    "answer": "No, both sides of a repeater belong to the exact same collision domain",
    "explanation": "Repeaters propagate all electrical activity, including collisions, immediately to the other side. They do NOT separate collision domains.",
    "hint": "A repeater extends the collision domain, it does not break it."
  },
  {
    "id": 10,
    "question": "What is an 'Optical Repeater' (or Optical Regenerator)?",
    "options": [
      "A magnifying glass placed over the fiber",
      "A device that converts a weakened optical light signal into electricity, regenerates the clean digital bits, and converts it back to laser light",
      "A mirror that reflects sunlight",
      "A lamp inside the server rack"
    ],
    "answer": "A device that converts a weakened optical light signal into electricity, regenerates the clean digital bits, and converts it back to laser light",
    "explanation": "Optical regenerators perform Optical-to-Electrical-to-Optical (O-E-O) conversion to regenerate pristine laser pulses over long-haul fibers.",
    "hint": "Optical-Electrical-Optical regeneration."
  },
  {
    "id": 11,
    "question": "What is an 'Optical Amplifier' (such as an EDFA - Erbium-Doped Fiber Amplifier)?",
    "options": [
      "An amplifier that directly boosts optical light signals in glass without converting them to electrical signals first",
      "A software program",
      "A copper wire repeater",
      "A type of router"
    ],
    "answer": "An amplifier that directly boosts optical light signals in glass without converting them to electrical signals first",
    "explanation": "EDFAs use excited erbium ions to amplify optical photons directly within the fiber without needing O-E-O conversion.",
    "hint": "Direct all-optical amplification."
  },
  {
    "id": 12,
    "question": "If a campus connects two buildings 800 meters apart using Optical Fiber, is an active repeater required?",
    "options": [
      "Yes, every 100 meters",
      "No, optical fiber has extremely low attenuation and easily travels several kilometers without repeaters",
      "Yes, at the 400m mark",
      "Only during cold weather"
    ],
    "answer": "No, optical fiber has extremely low attenuation and easily travels several kilometers without repeaters",
    "explanation": "Optical fiber easily covers distances up to 2-10+ km without needing signal regeneration.",
    "hint": "Optical fiber covers kilometers without repeaters."
  },
  {
    "id": 13,
    "question": "What happens to the timing of digital signals as they pass through multiple repeaters in sequence?",
    "options": [
      "Signals travel faster than light",
      "Propagation delay (latency) and jitter increase slightly across each repeater hop",
      "The frequency triples",
      "The voltage drops to absolute zero"
    ],
    "answer": "Propagation delay (latency) and jitter increase slightly across each repeater hop",
    "explanation": "Each repeater introduces a small electronic processing and re-clocking delay, adding cumulative latency to the channel.",
    "hint": "Electronic re-clocking adds latency."
  },
  {
    "id": 14,
    "question": "What is the difference between a simple 2-port Repeater and an Active Hub?",
    "options": [
      "A 2-port repeater connects two segments; an Active Hub is a multiport repeater connecting multiple nodes in a star layout",
      "They are completely unrelated devices",
      "Repeaters are wireless while hubs are wired",
      "Active hubs do not require electricity"
    ],
    "answer": "A 2-port repeater connects two segments; an Active Hub is a multiport repeater connecting multiple nodes in a star layout",
    "explanation": "An Active Hub is fundamentally a multiport repeater with 4, 8, 16, or 24 ports radiating outward.",
    "hint": "Active Hub = Multiport Repeater."
  },
  {
    "id": 15,
    "question": "Can a repeater connect a 10 Mbps Ethernet segment to a 100 Mbps Fast Ethernet segment?",
    "options": [
      "Yes, it changes the speed automatically",
      "No, standard repeaters operate at the bit level and require identical data rates and physical layer protocols on both sides",
      "Yes, by doubling the voltage",
      "Only if both computers run Windows"
    ],
    "answer": "No, standard repeaters operate at the bit level and require identical data rates and physical layer protocols on both sides",
    "explanation": "Repeaters cannot buffer frames or adapt speeds; they replicate bits directly. A switch or bridge is needed to connect mismatched speeds.",
    "hint": "Repeaters cannot bridge different data rates."
  },
  {
    "id": 16,
    "question": "Why does a digital repeater NOT amplify electrical noise present on the incoming line?",
    "options": [
      "Because noise is illegal",
      "Because it compares incoming voltage against a decision threshold, outputting a clean high or low voltage regardless of minor noise fluctuations",
      "Because noise cannot enter plastic cables",
      "Because it contains a noise vacuum"
    ],
    "answer": "Because it compares incoming voltage against a decision threshold, outputting a clean high or low voltage regardless of minor noise fluctuations",
    "explanation": "Digital thresholding ignores voltage noise below the decision margin, generating a brand-new pristine digital waveform.",
    "hint": "Thresholding filters out noise."
  },
  {
    "id": 17,
    "question": "What happens if signal attenuation on a cable is so severe that voltage drops below the repeater's detection threshold?",
    "options": [
      "The repeater generates random bits, causing bit errors and packet drops",
      "The repeater works twice as hard",
      "The cable turns into optical fiber",
      "The repeater sends an alert to the police"
    ],
    "answer": "The repeater generates random bits, causing bit errors and packet drops",
    "explanation": "If signals fall into the ambiguous threshold region, the repeater cannot determine whether a bit is 0 or 1, producing bit errors.",
    "hint": "Severe attenuation causes bit corruption."
  },
  {
    "id": 18,
    "question": "In wireless networking, what is a 'Wireless Range Extender' or 'Wi-Fi Repeater'?",
    "options": [
      "A device that captures a weak Wi-Fi signal from a main router, regenerates it, and rebroadcasts it to cover dead zones in a building",
      "A longer Wi-Fi antenna stick",
      "A mirror that reflects radio waves",
      "A battery charger for laptops"
    ],
    "answer": "A device that captures a weak Wi-Fi signal from a main router, regenerates it, and rebroadcasts it to cover dead zones in a building",
    "explanation": "A Wi-Fi repeater receives RF packets from the access point, amplifies/regenerates the data, and retransmits it to extend wireless coverage.",
    "hint": "Rebroadcasting wireless signals to dead zones."
  },
  {
    "id": 19,
    "question": "In satellite communications, what component aboard the satellite performs the role of an extraterrestrial repeater?",
    "options": [
      "Solar panel",
      "Transponder",
      "Attitude thruster",
      "Star tracker camera"
    ],
    "answer": "Transponder",
    "explanation": "A satellite transponder captures the faint uplink microwave signal, amplifies it, translates its frequency, and retransmits it down to Earth.",
    "hint": "Satellite transponder."
  },
  {
    "id": 20,
    "question": "What is the maximum segment length of 10BASE2 Thinnet coaxial cable before a repeater is required?",
    "options": [
      "100 meters",
      "185 meters",
      "500 meters",
      "1000 meters"
    ],
    "answer": "185 meters",
    "explanation": "10BASE2 Thinnet has a maximum electrical reach of 185 meters before needing a repeater.",
    "hint": "185 meters."
  },
  {
    "id": 21,
    "question": "What is the maximum segment length of 10BASE5 Thicknet coaxial cable before a repeater is required?",
    "options": [
      "100 meters",
      "185 meters",
      "500 meters",
      "2000 meters"
    ],
    "answer": "500 meters",
    "explanation": "10BASE5 Thicknet supports up to 500 meters per segment before repeaters are mandatory.",
    "hint": "500 meters."
  },
  {
    "id": 22,
    "question": "True or False: A repeater can be used to filter network traffic based on destination IP addresses.",
    "options": [
      "True",
      "False",
      "Only if it is plugged into a wall outlet",
      "Only on Linux networks"
    ],
    "answer": "False",
    "explanation": "Repeaters operate at Layer 1 and cannot read IP addresses (Layer 3). Traffic filtering requires a Router or Firewall.",
    "hint": "Repeaters cannot read Layer 3 IP addresses."
  },
  {
    "id": 23,
    "question": "If two buildings 150 meters apart are connected with UTP cable, where should the repeater ideally be located?",
    "options": [
      "At or around the 75m - 100m midpoint to ensure neither copper run exceeds 100 meters",
      "Directly on the roof of Building A",
      "Directly in the server room of Building B",
      "Underwater"
    ],
    "answer": "At or around the 75m - 100m midpoint to ensure neither copper run exceeds 100 meters",
    "explanation": "Placing the repeater near the midpoint ensures that neither cable segment exceeds the 100m physical limit.",
    "hint": "Midpoint placement ensures both runs are under 100m."
  },
  {
    "id": 24,
    "question": "What does 'Jitter' mean in repeated transmission lines?",
    "options": [
      "The physical shaking of the cable in the wind",
      "Variations or fluctuations in the arrival timing of digital pulses compared to the ideal clock",
      "When the computer freezes",
      "Excessive noise from fans"
    ],
    "answer": "Variations or fluctuations in the arrival timing of digital pulses compared to the ideal clock",
    "explanation": "Jitter refers to phase deviations in clock synchronization and pulse transitions caused by repeated circuit propagation.",
    "hint": "Variations in signal arrival timing."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Name the device used to regenerate signals when transmission distance exceeds the cable limit.' What is the answer?",
    "options": [
      "Repeater",
      "Modem",
      "NIC",
      "RJ-45"
    ],
    "answer": "Repeater",
    "explanation": "A Repeater regenerates attenuated signals to overcome cable distance limits.",
    "hint": "Device that regenerates signals."
  }
];

export default questions;
