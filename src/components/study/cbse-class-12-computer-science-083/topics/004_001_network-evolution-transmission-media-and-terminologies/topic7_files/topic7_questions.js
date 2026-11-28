// 25 Authentic CBSE Board Examination Questions for Topic 7
const questions = [
  {
    "id": 1,
    "question": "What is the primary defining characteristic of radio wave propagation?",
    "options": [
      "It travels strictly in a single unidirectional beam requiring line-of-sight alignment",
      "It is omnidirectional, meaning it radiates in all directions from the transmitting antenna",
      "It requires a glass tube to guide the waves",
      "It cannot travel through air"
    ],
    "answer": "It is omnidirectional, meaning it radiates in all directions from the transmitting antenna",
    "explanation": "Radio waves propagate omnidirectionally (in all directions). Sending and receiving antennas do not need to be physically aligned with each other.",
    "hint": "Recall the meaning of 'omni' (all directions)."
  },
  {
    "id": 2,
    "question": "What is the official frequency range associated with Radio Waves in the CBSE Class 12 Computer Science syllabus?",
    "options": [
      "3 kHz to 1 GHz",
      "1 GHz to 300 GHz",
      "300 GHz to 400 THz",
      "400 THz to 750 THz"
    ],
    "answer": "3 kHz to 1 GHz",
    "explanation": "Under the standard CBSE networking classification, Radio Waves occupy the electromagnetic spectrum between 3 kHz and 1 GHz. Microwaves start from 1 GHz to 300 GHz.",
    "hint": "From 3 kilohertz up to 1 gigahertz."
  },
  {
    "id": 3,
    "question": "Why do radio waves easily provide coverage inside buildings and behind office partitions?",
    "options": [
      "Because they reflect 100% off air molecules",
      "Because their long wavelengths allow them to penetrate through solid walls and obstacles",
      "Because they carry high-voltage electrical current",
      "Because they use copper wires embedded in walls"
    ],
    "answer": "Because their long wavelengths allow them to penetrate through solid walls and obstacles",
    "explanation": "Lower frequency radio waves have long wavelengths, which enables them to diffract around corners and penetrate solid architectural structures like concrete and drywall.",
    "hint": "Longer wavelength enables obstacle penetration."
  },
  {
    "id": 4,
    "question": "Which propagation mode uses the Earth's Ionosphere to reflect radio waves back to the ground over thousands of kilometers?",
    "options": [
      "Ground Wave Propagation",
      "Sky Wave Propagation",
      "Space Wave Propagation",
      "Surface Wave Propagation"
    ],
    "answer": "Sky Wave Propagation",
    "explanation": "In sky-wave propagation (frequencies between 2 MHz and 30 MHz), radio signals bounce off the ionized layers of the upper atmosphere (ionosphere), enabling intercontinental shortwave radio.",
    "hint": "Signals bounce off the sky (ionosphere)."
  },
  {
    "id": 5,
    "question": "Which mode of radio propagation is used for standard VHF FM radio and UHF television broadcasts?",
    "options": [
      "Space Wave (Line-of-Sight) Propagation",
      "Ground Wave Propagation",
      "Ionospheric Ducting",
      "Submarine cable transmission"
    ],
    "answer": "Space Wave (Line-of-Sight) Propagation",
    "explanation": "At frequencies above 30 MHz (VHF and UHF), radio waves penetrate the ionosphere without reflecting. Hence, space wave line-of-sight propagation is used for FM radio and TV.",
    "hint": "Direct line-of-sight travel between elevated antennas."
  },
  {
    "id": 6,
    "question": "Why must government bodies (such as WPC/DoT in India and FCC in the USA) strictly regulate and license radio frequency bands?",
    "options": [
      "To prevent private citizens from owning radios",
      "Because radio waves radiate omnidirectionally and transmitters on identical frequencies cause destructive mutual interference",
      "Because radio waves consume too much oxygen in the atmosphere",
      "To restrict the speed of light"
    ],
    "answer": "Because radio waves radiate omnidirectionally and transmitters on identical frequencies cause destructive mutual interference",
    "explanation": "Since radio waves propagate freely in all directions across public airspace, unregulated transmitters operating on the same frequency would cause destructive interference.",
    "hint": "Shared airspace requires frequency allocation to avoid interference."
  },
  {
    "id": 7,
    "question": "Which of the following consumer devices utilizes radio wave communication?",
    "options": [
      "AM / FM Radio",
      "Cellular Mobile Handset",
      "Cordless Telephone",
      "All of the above"
    ],
    "answer": "All of the above",
    "explanation": "AM/FM broadcasts, mobile phone communications, and cordless home phones all rely on electromagnetic radio frequency (RF) transmissions.",
    "hint": "All listed consumer devices communicate over radio frequencies."
  },
  {
    "id": 8,
    "question": "What is an advantage of radio wave transmission over optical fiber cabling?",
    "options": [
      "Radio waves offer higher bandwidth than fiber",
      "Radio waves are immune to all forms of noise",
      "Radio transmission requires no expensive physical trenching, cabling infrastructure, or rights-of-way",
      "Radio signals cannot be intercepted by eavesdroppers"
    ],
    "answer": "Radio transmission requires no expensive physical trenching, cabling infrastructure, or rights-of-way",
    "explanation": "Wireless radio eliminates the huge civil engineering costs of digging trenches, laying underground ducts, and acquiring permissions across private or public land.",
    "hint": "Think about the cost and difficulty of digging trenches."
  },
  {
    "id": 9,
    "question": "What is a major limitation of radio wave communication compared to guided media like optical fiber?",
    "options": [
      "Radio waves cannot travel through a vacuum",
      "Radio waves are susceptible to weather conditions, electrical noise, and radio interference, and offer lower bandwidth",
      "Radio waves require direct physical contact between antennas",
      "Radio waves can only travel up to 5 meters"
    ],
    "answer": "Radio waves are susceptible to weather conditions, electrical noise, and radio interference, and offer lower bandwidth",
    "explanation": "Unguided radio signals can be distorted by atmospheric precipitation, thunderstorms, industrial EMI, and co-channel interference, with bandwidth far below optical fiber.",
    "hint": "Weather conditions and interference degrade wireless signals."
  },
  {
    "id": 10,
    "question": "In Ground Wave propagation, why can frequencies above 2 MHz not follow the curvature of the Earth effectively?",
    "options": [
      "The waves escape into space immediately",
      "High-frequency ground waves suffer rapid attenuation and energy absorption by the conductive earth surface",
      "The Earth stops rotating at 2 MHz",
      "Clouds reflect high frequencies into the ocean"
    ],
    "answer": "High-frequency ground waves suffer rapid attenuation and energy absorption by the conductive earth surface",
    "explanation": "At higher frequencies, ground wave signals induce significant electrical currents in the soil, which rapidly dissipates signal power as heat.",
    "hint": "Signal energy is absorbed by the ground as frequency rises."
  },
  {
    "id": 11,
    "question": "Which of the following frequency bands is considered an unlicensed 'ISM' (Industrial, Scientific, and Medical) radio band used by Wi-Fi and Bluetooth?",
    "options": [
      "2.4 GHz",
      "100 MHz",
      "10 GHz",
      "50 kHz"
    ],
    "answer": "2.4 GHz",
    "explanation": "The 2.4 GHz (and 5 GHz) band is designated internationally as an ISM unlicensed band, allowing devices like Wi-Fi routers and Bluetooth headsets to operate without individual government licenses.",
    "hint": "Standard Wi-Fi band used worldwide without a license."
  },
  {
    "id": 12,
    "question": "What type of antenna is typically used for broadcasting radio waves in all horizontal directions simultaneously?",
    "options": [
      "Omnidirectional dipole antenna",
      "Parabolic dish antenna",
      "Horn antenna",
      "Laser pointer"
    ],
    "answer": "Omnidirectional dipole antenna",
    "explanation": "Omnidirectional antennas (such as vertical dipoles or rubber duck antennas) radiate electromagnetic energy in a 360-degree horizontal doughnut pattern.",
    "hint": "Dipole whip antenna radiating in all directions."
  },
  {
    "id": 13,
    "question": "Why does AM radio reception often improve at night compared to daytime?",
    "options": [
      "The sun turns off radio waves during the day",
      "The D-layer of the ionosphere dissipates after sunset, allowing sky waves to reach the higher F-layer and reflect over greater distances",
      "Workstations are turned off at night",
      "The air becomes denser in the dark"
    ],
    "answer": "The D-layer of the ionosphere dissipates after sunset, allowing sky waves to reach the higher F-layer and reflect over greater distances",
    "explanation": "During daylight, solar radiation ionizes the lower D-layer, which absorbs AM frequencies. At night, the D-layer vanishes, allowing waves to bounce off the higher F-layer without absorption.",
    "hint": "Atmospheric solar ionization changes between day and night."
  },
  {
    "id": 14,
    "question": "True or False: Because radio waves are omnidirectional, a sender and receiver can maintain communication even when the receiver is in motion (mobile).",
    "options": [
      "True",
      "False",
      "Only when the receiver moves slower than 5 km/h",
      "Only in the southern hemisphere"
    ],
    "answer": "True",
    "explanation": "The omnidirectional nature of radio waves allows mobile handsets and car radios to receive signals regardless of their orientation or movement within the coverage footprint.",
    "hint": "This property is what makes mobile cellular communications possible."
  },
  {
    "id": 15,
    "question": "What term describes the natural reduction in radio signal power as electromagnetic waves spread out over increasing distance through free space?",
    "options": [
      "Free-Space Path Loss (FSPL)",
      "Quantum Tunneling",
      "Modulation index",
      "Skin Effect"
    ],
    "answer": "Free-Space Path Loss (FSPL)",
    "explanation": "Free-Space Path Loss (FSPL) represents the attenuation of an unguided electromagnetic wave due to the inverse-square law as the wave wavefront expands spherically.",
    "hint": "Path loss over free space."
  },
  {
    "id": 16,
    "question": "Which of the following is an unguided transmission medium?",
    "options": [
      "Coaxial Cable",
      "Optical Fiber Cable",
      "Radio Waves",
      "Shielded Twisted Pair"
    ],
    "answer": "Radio Waves",
    "explanation": "Radio waves travel through air/space without a physical solid conductor, making them an 'unguided' medium. Coaxial, fiber, and twisted pair are 'guided' media.",
    "hint": "Unguided means wireless."
  },
  {
    "id": 17,
    "question": "What happens when two wireless transmitters broadcast signals simultaneously on the exact same radio frequency in the same geographical area?",
    "options": [
      "The signals merge into a faster signal",
      "Co-channel interference occurs, corrupting the received data for both receivers",
      "Both transmitters double their transmitting power",
      "The signal turns into optical infrared"
    ],
    "answer": "Co-channel interference occurs, corrupting the received data for both receivers",
    "explanation": "When electromagnetic waves of identical frequency occupy the same airspace, wave superposition causes co-channel interference, producing garbled noise at the receiver.",
    "hint": "Collision and interference in the shared air medium."
  },
  {
    "id": 18,
    "question": "In CBSE board case studies, why is radio wave or microwave technology recommended over laying physical fiber cables between two hilltops separated by a deep valley?",
    "options": [
      "Radio waves travel faster than light in fiber",
      "Laying cables across deep rocky valleys and mountainous terrain is physically difficult, dangerous, and prohibitively expensive",
      "Fiber cables do not work in cold mountain weather",
      "Hilltops have no electricity"
    ],
    "answer": "Laying cables across deep rocky valleys and mountainous terrain is physically difficult, dangerous, and prohibitively expensive",
    "explanation": "In challenging mountainous or river-crossing terrain, digging trenches and running physical cables is often cost-prohibitive or physically impossible. Wireless transmission bridges the gap effortlessly.",
    "hint": "Think about physical terrain obstacles (valleys, rivers, mountains)."
  },
  {
    "id": 19,
    "question": "What is the relationship between frequency and wavelength of a radio wave?",
    "options": [
      "Higher frequency means shorter wavelength (( \\lambda = c / f ))",
      "Higher frequency means longer wavelength",
      "Frequency and wavelength are identical",
      "Wavelength does not depend on frequency"
    ],
    "answer": "Higher frequency means shorter wavelength (( \\lambda = c / f ))",
    "explanation": "Wavelength is inversely proportional to frequency: ( \\lambda = c / f ). As frequency increases, the spatial length of each wave cycle decreases.",
    "hint": "Inverse relationship: higher frequency means smaller wavelength."
  },
  {
    "id": 20,
    "question": "Which unguided medium would be completely blocked or severely attenuated by heavy rainfall, fog, and dense foliage?",
    "options": [
      "Low frequency radio waves",
      "Extremely high frequency millimeter waves and microwaves",
      "Underground optical fiber",
      "Shielded twisted pair"
    ],
    "answer": "Extremely high frequency millimeter waves and microwaves",
    "explanation": "High-frequency electromagnetic signals have tiny wavelengths that resonate with and are absorbed by raindrops and moisture particles (rain fade).",
    "hint": "Rain fade affects higher frequencies much more severely."
  },
  {
    "id": 21,
    "question": "What is 'Multipath Fading' in radio wave communications?",
    "options": [
      "When a radio uses multiple batteries",
      "When signals reach the receiving antenna via multiple reflective paths (off buildings/ground) with different delays, causing phase cancellation",
      "When a radio station broadcasts in multiple languages",
      "When antennas are painted different colors"
    ],
    "answer": "When signals reach the receiving antenna via multiple reflective paths (off buildings/ground) with different delays, causing phase cancellation",
    "explanation": "Multipath occurs when reflected radio waves arrive out-of-phase with the direct line-of-sight signal, leading to constructive or destructive interference (fading).",
    "hint": "Multiple reflection paths causing signal cancellation."
  },
  {
    "id": 22,
    "question": "Why do cellular network operators split cities into small geographic areas called 'cells'?",
    "options": [
      "To prevent users from talking for more than 5 minutes",
      "To enable frequency reuse so that the same limited radio channels can be reused in non-adjacent cells without interference",
      "Because antennas can only hold 10 phone numbers",
      "To lower the weight of the antenna towers"
    ],
    "answer": "To enable frequency reuse so that the same limited radio channels can be reused in non-adjacent cells without interference",
    "explanation": "Because the radio spectrum is finite, cellular architecture reuses the same radio frequencies in geographically separated cells, vastly multiplying network subscriber capacity.",
    "hint": "Frequency reuse across separated cells."
  },
  {
    "id": 23,
    "question": "Which component inside a wireless computer device is responsible for converting digital binary data into high-frequency radio waves?",
    "options": [
      "Hard Disk Drive",
      "Radio Frequency (RF) Transceiver in the Wireless NIC",
      "RAM",
      "CPU Cache"
    ],
    "answer": "Radio Frequency (RF) Transceiver in the Wireless NIC",
    "explanation": "The wireless network interface card contains an RF transceiver that modulates digital bits onto radio carrier waves and feeds them to the antenna.",
    "hint": "Transceiver = Transmitter + Receiver."
  },
  {
    "id": 24,
    "question": "True or False: Radio wave transmission is inherently less secure than guided media because anyone within reception range with an appropriate antenna can intercept the signal.",
    "options": [
      "True",
      "False",
      "Only during sunny weather",
      "Only if the antenna is made of gold"
    ],
    "answer": "True",
    "explanation": "Because unguided signals radiate through public space, anyone within range can capture the electromagnetic waves. Thus, robust cryptographic encryption (e.g. WPA3) is mandatory for wireless security.",
    "hint": "Wireless broadcasts into open air where anyone can listen."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Name the unguided transmission medium that travels in all directions and does not require alignment of sending and receiving antennas.' What is the answer?",
    "options": [
      "Microwaves",
      "Infrared",
      "Radio Waves",
      "Laser"
    ],
    "answer": "Radio Waves",
    "explanation": "Radio waves are omnidirectional; they radiate in all directions and do not require directional alignment between sending and receiving antennas.",
    "hint": "Omnidirectional unguided medium."
  }
];

export default questions;
