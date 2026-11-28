// 25 Authentic CBSE Board Examination Questions for Topic 8
const questions = [
  {
    "id": 1,
    "question": "What is the official frequency range for Microwave transmission in the CBSE curriculum?",
    "options": [
      "3 kHz to 1 GHz",
      "1 GHz to 300 GHz",
      "300 GHz to 400 THz",
      "400 THz to 750 THz"
    ],
    "answer": "1 GHz to 300 GHz",
    "explanation": "Microwaves operate in the high-frequency portion of the electromagnetic spectrum spanning from 1 GHz (1000 MHz) to 300 GHz.",
    "hint": "1 gigahertz up to 300 gigahertz."
  },
  {
    "id": 2,
    "question": "Why do terrestrial microwave systems require repeater towers placed approximately every 40 to 50 km?",
    "options": [
      "Because microwave antennas overheat after 50 km",
      "Because the physical curvature of the Earth obstructs the straight Line of Sight between towers",
      "Because microwaves convert into sound waves after 50 km",
      "Because government law mandates a tower every 50 km"
    ],
    "answer": "Because the physical curvature of the Earth obstructs the straight Line of Sight between towers",
    "explanation": "Microwaves travel in strict straight lines. Since the Earth's surface curves away, antennas must be elevated on towers and repeated every 40-50 km to maintain line of sight.",
    "hint": "The Earth is round, but microwaves travel in straight lines."
  },
  {
    "id": 3,
    "question": "Which type of antenna is predominantly used for transmitting and receiving microwave signals in a focused directional beam?",
    "options": [
      "Omnidirectional whip antenna",
      "Parabolic dish antenna or Horn antenna",
      "Ferrite loop antenna",
      "Rabbit-ear dipole antenna"
    ],
    "answer": "Parabolic dish antenna or Horn antenna",
    "explanation": "Parabolic dishes and horn antennas focus high-frequency microwave energy into narrow, highly directional beams aimed directly at the receiving station.",
    "hint": "Dish or horn antenna."
  },
  {
    "id": 4,
    "question": "What is the official frequency range associated with Infrared transmission?",
    "options": [
      "100 kHz to 10 MHz",
      "1 GHz to 300 GHz",
      "300 GHz to 400 THz",
      "1 MHz to 50 MHz"
    ],
    "answer": "300 GHz to 400 THz",
    "explanation": "Infrared transmission occupies the spectrum just below visible red light, spanning from 300 GHz to 400 THz.",
    "hint": "Just below visible light; frequencies up to 400 Terahertz."
  },
  {
    "id": 5,
    "question": "Why is infrared transmission considered inherently secure from electronic eavesdropping from outside a building?",
    "options": [
      "Because infrared is encrypted by quantum mechanics",
      "Because infrared waves cannot penetrate solid walls and are confined strictly within the room",
      "Because infrared operates at direct current",
      "Because infrared can only be seen with special glasses"
    ],
    "answer": "Because infrared waves cannot penetrate solid walls and are confined strictly within the room",
    "explanation": "Infrared optical waves cannot penetrate solid opaque materials like walls or closed doors. The data cannot leak outside the room to be intercepted by outsiders.",
    "hint": "Solid walls block infrared completely."
  },
  {
    "id": 6,
    "question": "Which everyday consumer device relies on infrared transmission for wireless control?",
    "options": [
      "Television remote control",
      "Cellular smartphone tower",
      "GPS satellite navigation",
      "FM radio receiver"
    ],
    "answer": "Television remote control",
    "explanation": "Handheld TV and air conditioner remote controls utilize infrared LEDs emitting pulsed light at wavelengths around 940 nm to send commands to the sensor.",
    "hint": "Handheld device used to change TV channels."
  },
  {
    "id": 7,
    "question": "What is the primary operational distance limit for typical infrared communication devices?",
    "options": [
      "Up to 10 meters (strictly line of sight within one room)",
      "Up to 50 kilometers",
      "Across entire continents",
      "Up to 500 meters"
    ],
    "answer": "Up to 10 meters (strictly line of sight within one room)",
    "explanation": "Infrared is engineered for short-range indoor communication, operating reliably across 1 to 5 meters, with an absolute upper limit around 10 meters.",
    "hint": "Works across a typical living room."
  },
  {
    "id": 8,
    "question": "What weather phenomenon can cause significant attenuation and signal degradation in high-frequency microwave links?",
    "options": [
      "Rain fade (absorption and scattering by raindrops)",
      "Sunny clear skies",
      "Gentle wind breeze",
      "High air pressure"
    ],
    "answer": "Rain fade (absorption and scattering by raindrops)",
    "explanation": "Raindrops are comparable in size to microwave wavelengths (especially above 10 GHz), causing severe absorption, scattering, and signal loss known as 'rain fade'.",
    "hint": "Rain absorbs microwave energy."
  },
  {
    "id": 9,
    "question": "Which of the following standards was developed to allow laptops, PDAs, and printers to exchange data wirelessly via infrared?",
    "options": [
      "IEEE 802.3",
      "IrDA (Infrared Data Association)",
      "DOCSIS 3.0",
      "TIA/EIA-568"
    ],
    "answer": "IrDA (Infrared Data Association)",
    "explanation": "The IrDA (Infrared Data Association) protocol defined short-range point-to-point infrared data communication standards for computers and peripherals.",
    "hint": "Infrared Data Association."
  },
  {
    "id": 10,
    "question": "Why does sunlight interfere with infrared wireless communications?",
    "options": [
      "Sunlight dissolves the infrared LED",
      "Sunlight contains massive amounts of infrared thermal radiation that blinds the receiving photodiode",
      "Sunlight changes the speed of light in air",
      "Sunlight turns the air into copper"
    ],
    "answer": "Sunlight contains massive amounts of infrared thermal radiation that blinds the receiving photodiode",
    "explanation": "Sunlight is rich in broad-spectrum infrared radiation. This massive ambient background noise saturates and blinds the sensitive photodetector.",
    "hint": "The sun emits intense infrared heat and light."
  },
  {
    "id": 11,
    "question": "What happens if a person walks directly between a TV remote and the television receiver during button press?",
    "options": [
      "The TV explodes",
      "The transmission is immediately blocked because infrared requires an unobstructed optical line of sight",
      "The signal reflects off the person's clothes and speeds up",
      "The remote changes channels on the neighbor's TV"
    ],
    "answer": "The transmission is immediately blocked because infrared requires an unobstructed optical line of sight",
    "explanation": "Infrared is an optical wave that cannot penetrate opaque objects. A person's body completely casts a shadow and blocks the beam.",
    "hint": "Opaque human body casts an optical shadow."
  },
  {
    "id": 12,
    "question": "In a CBSE 5-mark networking case study, two offices are 12 km apart across a busy highway, and government permissions forbid laying underground cables. What medium should be chosen?",
    "options": [
      "Cat-6 UTP Cable",
      "Terrestrial Microwave Link",
      "Coaxial 10BASE5",
      "Infrared Transmitter"
    ],
    "answer": "Terrestrial Microwave Link",
    "explanation": "At 12 km, physical cables cannot be laid across public property without forbidden permits. A directional microwave link effortlessly covers 12 km with high throughput and clear LoS.",
    "hint": "12 km distance, wireless line-of-sight required."
  },
  {
    "id": 13,
    "question": "Which of the following describes the propagation difference between Radio Waves and Microwaves?",
    "options": [
      "Radio waves are omnidirectional; Microwaves are unidirectional and require sharp line-of-sight alignment",
      "Radio waves travel in straight lines; Microwaves travel in circles",
      "Radio waves require parabolic dishes; Microwaves use dipole whips",
      "Radio waves cannot penetrate air; Microwaves can only travel underwater"
    ],
    "answer": "Radio waves are omnidirectional; Microwaves are unidirectional and require sharp line-of-sight alignment",
    "explanation": "Radio waves radiate in all directions (omnidirectional). Microwaves are focused into narrow straight beams (unidirectional) requiring direct antenna alignment.",
    "hint": "Omnidirectional vs unidirectional beam."
  },
  {
    "id": 14,
    "question": "True or False: Terrestrial microwave communication does not require any government frequency licensing.",
    "options": [
      "True",
      "False",
      "Only if towers are under 5 meters",
      "Only on Sundays"
    ],
    "answer": "False",
    "explanation": "Microwave frequencies (except for specific unlicensed ISM bands) are strictly regulated and licensed by national telecommunications authorities to prevent interference.",
    "hint": "High-power long-distance microwave bands are strictly regulated."
  },
  {
    "id": 15,
    "question": "What component is used in an infrared receiver circuit to detect incoming infrared light pulses?",
    "options": [
      "Photodiode or Phototransistor",
      "Loudspeaker",
      "Permanent Magnet",
      "Thermocouple"
    ],
    "answer": "Photodiode or Phototransistor",
    "explanation": "A semiconductor photodiode or phototransistor converts incoming optical infrared light pulses into digital electrical current signals.",
    "hint": "Light-sensitive semiconductor diode."
  },
  {
    "id": 16,
    "question": "Why are microwave towers often installed on hilltops or mountain summits?",
    "options": [
      "To keep them cold and prevent overheating",
      "To maximize tower height above ground, extending the line-of-sight horizon and bypassing terrain obstacles",
      "To be closer to the sun",
      "To capture lightning electricity"
    ],
    "answer": "To maximize tower height above ground, extending the line-of-sight horizon and bypassing terrain obstacles",
    "explanation": "Elevating antennas high above the surrounding ground level increases the distance to the geometric horizon, extending the distance before Earth's curvature intervenes.",
    "hint": "Greater elevation means a farther horizon."
  },
  {
    "id": 17,
    "question": "What is an advantage of using Infrared for wireless mice and keyboards in a busy office with 50 workstations in separate cubicles?",
    "options": [
      "Signals can reach across 10 kilometers",
      "Zero cross-interference between adjacent rooms since walls prevent signals from leaking across rooms",
      "It works through thick metal filing cabinets",
      "It requires no battery power"
    ],
    "answer": "Zero cross-interference between adjacent rooms since walls prevent signals from leaking across rooms",
    "explanation": "Because infrared is stopped by walls and partitions, multiple identical devices can operate in adjacent rooms without causing interference to one another.",
    "hint": "Walls isolate infrared signals."
  },
  {
    "id": 18,
    "question": "Which unguided medium is most susceptible to being disrupted by a flying bird or tree branch crossing the direct path?",
    "options": [
      "Low frequency radio wave",
      "Point-to-point microwave or laser link",
      "Subsea fiber optic cable",
      "Coaxial cable"
    ],
    "answer": "Point-to-point microwave or laser link",
    "explanation": "Narrow directional beams (microwaves/free-space optics) depend on an unobstructed direct line of sight; physical occlusion causes temporary beam blockage.",
    "hint": "Narrow line of sight is vulnerable to physical obstruction."
  },
  {
    "id": 19,
    "question": "What is the typical bandwidth capability of modern terrestrial microwave links?",
    "options": [
      "Up to a few bits per second",
      "Hundreds of Megabits per second up to several Gigabits per second",
      "Only 10 Kbps",
      "Zero bandwidth"
    ],
    "answer": "Hundreds of Megabits per second up to several Gigabits per second",
    "explanation": "Due to high operating frequencies (e.g. 6 GHz to 80 GHz E-band), microwave links provide high bandwidth capable of multi-gigabit data backhaul.",
    "hint": "High frequency yields gigabit data capacity."
  },
  {
    "id": 20,
    "question": "What term describes the theoretical oval-shaped clearance zone around the line of sight that must be free of obstacles for optimal microwave transmission?",
    "options": [
      "Fresnel Zone",
      "Ozone Layer",
      "Van Allen Belt",
      "Doppler Zone"
    ],
    "answer": "Fresnel Zone",
    "explanation": "The Fresnel Zone is an elliptical volume of space around the direct line of sight between two antennas; obstructions in this zone cause phase cancellation.",
    "hint": "Named after French physicist Augustin-Jean Fresnel."
  },
  {
    "id": 21,
    "question": "Why is infrared transmission not suitable for long-distance outdoor communications?",
    "options": [
      "Infrared waves travel too slowly",
      "Infrared experiences extreme attenuation from atmospheric moisture, dust, fog, and ambient sunlight",
      "Infrared only works inside vacuum chambers",
      "Infrared violates international law"
    ],
    "answer": "Infrared experiences extreme attenuation from atmospheric moisture, dust, fog, and ambient sunlight",
    "explanation": "Dust, water vapor, and fog particles scatter optical infrared wavelengths, while bright sunlight swamps the weak signal, limiting outdoor range.",
    "hint": "Atmospheric scattering and solar interference."
  },
  {
    "id": 22,
    "question": "Which of the following is true regarding antenna alignment in microwave systems?",
    "options": [
      "Antennas can point in completely random directions",
      "Antennas must be precisely aligned and calibrated with line-of-sight precision towards each other",
      "Only the receiving antenna needs to point towards the sky",
      "Antennas must be submerged in water"
    ],
    "answer": "Antennas must be precisely aligned and calibrated with line-of-sight precision towards each other",
    "explanation": "Because parabolic dishes produce a narrow beam, even a fraction of a degree in mechanical misalignment results in dramatic signal loss.",
    "hint": "Pinpoint directional alignment is required."
  },
  {
    "id": 23,
    "question": "What type of modulation is commonly used in modern digital microwave radios to achieve gigabit speeds?",
    "options": [
      "Quadrature Amplitude Modulation (such as 1024-QAM or 4096-QAM)",
      "Morse Code",
      "Simple ON/OFF keying",
      "AM Radio tuning"
    ],
    "answer": "Quadrature Amplitude Modulation (such as 1024-QAM or 4096-QAM)",
    "explanation": "High-order QAM modulates both the amplitude and phase of the carrier wave to transmit multiple bits per symbol across the allocated channel bandwidth.",
    "hint": "QAM modulation."
  },
  {
    "id": 24,
    "question": "In a CBSE 1-mark question: 'Name the unguided transmission medium that has a frequency between 300 GHz and 400 THz and cannot cross walls.' What is the answer?",
    "options": [
      "Radio Waves",
      "Microwaves",
      "Infrared",
      "Satellite"
    ],
    "answer": "Infrared",
    "explanation": "Infrared waves occupy 300 GHz to 400 THz and are completely blocked by solid walls.",
    "hint": "Optical frequency that cannot pass through walls."
  },
  {
    "id": 25,
    "question": "Which technology is commonly used to connect a wireless printer to a laptop within a single small room without accessing a Wi-Fi router?",
    "options": [
      "Infrared (IrDA) or Bluetooth",
      "Geostationary Satellite",
      "10BASE5 Thicknet",
      "Subsea cable"
    ],
    "answer": "Infrared (IrDA) or Bluetooth",
    "explanation": "Short-range point-to-point wireless technologies like Infrared (IrDA) or short-range Bluetooth allow direct peripheral communication in a single room.",
    "hint": "Short-range in-room wireless technologies."
  }
];

export default questions;
