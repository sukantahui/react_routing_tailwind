// 25 Authentic CBSE Board Examination Questions for Topic 9
const questions = [
  {
    "id": 1,
    "question": "At what approximate altitude above the Earth's equator do Geostationary (GEO) communication satellites orbit?",
    "options": [
      "2,000 km",
      "10,000 km",
      "35,786 km (~36,000 km)",
      "100,000 km"
    ],
    "answer": "35,786 km (~36,000 km)",
    "explanation": "A geostationary orbit is located precisely 35,786 km (commonly rounded to 36,000 km) directly above the Earth's equator.",
    "hint": "Roughly thirty-six thousand kilometers."
  },
  {
    "id": 2,
    "question": "Why does a Geostationary satellite appear completely stationary at a fixed point in the sky to an observer on Earth?",
    "options": [
      "Because it is physically anchored to a mountain with a steel cable",
      "Because its orbital period is exactly 24 hours, matching the rotational period of the Earth",
      "Because it does not move and has zero orbital velocity",
      "Because Earth's gravity stops working at 36,000 km"
    ],
    "answer": "Because its orbital period is exactly 24 hours, matching the rotational period of the Earth",
    "explanation": "A GEO satellite orbits the Earth from west to east with an orbital period of exactly 24 hours, keeping pace with Earth's rotation so ground dish antennas can remain permanently fixed.",
    "hint": "Orbital speed matches Earth's rotation."
  },
  {
    "id": 3,
    "question": "What term is used for the transmission of signals from an Earth ground station up to a communication satellite?",
    "options": [
      "Downlink",
      "Uplink",
      "Backlink",
      "Crosslink"
    ],
    "answer": "Uplink",
    "explanation": "The communication path from the ground transmitting antenna UP to the satellite in space is called the Uplink.",
    "hint": "Linking UP to space."
  },
  {
    "id": 4,
    "question": "What term describes the transmission path from the satellite back down to receiving earth dishes?",
    "options": [
      "Uplink",
      "Downlink",
      "Inlink",
      "Outlink"
    ],
    "answer": "Downlink",
    "explanation": "The communication path from the satellite DOWN to earth stations or DTH consumer dishes is known as the Downlink.",
    "hint": "Linking DOWN to earth."
  },
  {
    "id": 5,
    "question": "Why are the Uplink and Downlink frequencies deliberately set to different frequency bands in satellite communications?",
    "options": [
      "To prevent self-interference and feedback between the satellite's sensitive receiver and powerful transmitter",
      "Because space only allows one frequency at a time",
      "To comply with international time zones",
      "To make the satellite travel faster in orbit"
    ],
    "answer": "To prevent self-interference and feedback between the satellite's sensitive receiver and powerful transmitter",
    "explanation": "If the satellite received and transmitted on identical frequencies, its strong downlink transmitter would swamp and desensitize its own sensitive uplink receiving circuitry.",
    "hint": "Different frequencies eliminate transmitter-to-receiver feedback."
  },
  {
    "id": 6,
    "question": "Why is the Uplink frequency typically higher than the Downlink frequency (e.g. 6 GHz Uplink / 4 GHz Downlink in C-band)?",
    "options": [
      "Earth stations have unlimited grid power to overcome higher atmospheric attenuation, while the satellite has limited solar power",
      "Higher frequencies travel faster than lower frequencies",
      "Satellites cannot transmit frequencies above 1 GHz",
      "Higher frequencies are banned on Earth"
    ],
    "answer": "Earth stations have unlimited grid power to overcome higher atmospheric attenuation, while the satellite has limited solar power",
    "explanation": "Higher frequencies suffer greater atmospheric attenuation. Ground stations have abundant electrical power from power grids to transmit strong signals, conserving the satellite's precious solar/battery power.",
    "hint": "Ground stations have abundant grid power; satellites have limited solar panels."
  },
  {
    "id": 7,
    "question": "What is the primary operational role of an onboard satellite 'Transponder'?",
    "options": [
      "To steer the solar panels towards the sun",
      "To receive the uplink signal, filter it, shift its frequency, amplify its power, and retransmit it as the downlink",
      "To take high-resolution photographs of other planets",
      "To store user files in solid-state hard drives"
    ],
    "answer": "To receive the uplink signal, filter it, shift its frequency, amplify its power, and retransmit it as the downlink",
    "explanation": "A transponder (Transmitter-Responder) captures the faint uplink signal, translates it to the downlink frequency band, amplifies it using powerful amplifiers, and sends it back to Earth.",
    "hint": "Receive -> Frequency Shift -> Amplify -> Retransmit."
  },
  {
    "id": 8,
    "question": "What is the minimum number of Geostationary satellites required to provide global communication coverage across the Earth (excluding polar caps)?",
    "options": [
      "1 satellite",
      "3 satellites",
      "12 satellites",
      "24 satellites"
    ],
    "answer": "3 satellites",
    "explanation": "Because a single GEO satellite can view approximately 42% of the Earth's surface, three GEO satellites placed 120 degrees apart provide complete global coverage.",
    "hint": "Three satellites spaced 120 degrees apart."
  },
  {
    "id": 9,
    "question": "What is the typical round-trip signal propagation delay (latency) experienced in Geostationary satellite communications?",
    "options": [
      "1 millisecond",
      "10 milliseconds",
      "Approx. 250 to 500 milliseconds (half a second)",
      "10 seconds"
    ],
    "answer": "Approx. 250 to 500 milliseconds (half a second)",
    "explanation": "A signal must travel 35,786 km up and 35,786 km down. At the speed of light, one round-trip hop takes ~250 ms, making two-way interactive ping latencies around ~500 ms.",
    "hint": "Half a second round-trip propagation time."
  },
  {
    "id": 10,
    "question": "What does 'VSAT' stand for in satellite communications?",
    "options": [
      "Very Small Aperture Terminal",
      "Variable Signal Audio Transmitter",
      "Visual Satellite Antenna Tower",
      "Virtual Space Array Technology"
    ],
    "answer": "Very Small Aperture Terminal",
    "explanation": "VSAT stands for Very Small Aperture Terminal, referring to compact two-way satellite ground dishes (typically 0.75m to 2.4m in diameter) used for remote business and banking connectivity.",
    "hint": "Very Small Aperture Terminal."
  },
  {
    "id": 11,
    "question": "Which of the following is an ideal real-world application for VSAT satellite terminals?",
    "options": [
      "Connecting an ATM in a remote rural village with no cellular or wired telecom infrastructure",
      "Playing competitive low-latency esports games with 5ms ping",
      "Connecting two computers inside the same classroom",
      "Replacing a USB flash drive"
    ],
    "answer": "Connecting an ATM in a remote rural village with no cellular or wired telecom infrastructure",
    "explanation": "VSAT is globally deployed by banks to connect ATMs, petrol pumps, and remote retail outlets located in remote locations lacking terrestrial wireline/cellular coverage.",
    "hint": "Remote banking ATMs in rural areas."
  },
  {
    "id": 12,
    "question": "What common consumer service uses satellite downlink to broadcast hundreds of television channels directly to rooftop dish antennas?",
    "options": [
      "DTH (Direct-To-Home) Television",
      "Dial-up internet",
      "FM radio",
      "Walkie-talkie"
    ],
    "answer": "DTH (Direct-To-Home) Television",
    "explanation": "DTH (Direct-To-Home) television services (e.g. Tata Play, Dish TV) use Ku-band GEO satellite transponders to broadcast high-definition television directly to small rooftop dishes.",
    "hint": "Direct To Home television."
  },
  {
    "id": 13,
    "question": "What frequency bands are most commonly utilized in commercial communication satellites?",
    "options": [
      "C-band (4/6 GHz) and Ku-band (11-14 GHz)",
      "Audio band (20 Hz - 20 kHz)",
      "Longwave AM band (150 kHz)",
      "Ultraviolet band"
    ],
    "answer": "C-band (4/6 GHz) and Ku-band (11-14 GHz)",
    "explanation": "Commercial satellites predominantly operate in C-band (4 GHz downlink / 6 GHz uplink) and Ku-band (12 GHz downlink / 14 GHz uplink), with Ka-band (20/30 GHz) expanding for high throughput.",
    "hint": "C-band and Ku-band."
  },
  {
    "id": 14,
    "question": "Why is satellite communication generally unsuitable for real-time high-frequency financial trading or competitive online gaming?",
    "options": [
      "Because satellites only transmit analog sound",
      "Because the physical 36,000 km distance introduces high propagation latency (~500ms)",
      "Because satellites run out of electricity during trading hours",
      "Because satellites only work during the night"
    ],
    "answer": "Because the physical 36,000 km distance introduces high propagation latency (~500ms)",
    "explanation": "The laws of physics dictate that electromagnetic signals take roughly 240-500 ms to travel the 72,000+ km round-trip distance, making low-latency real-time applications sluggish.",
    "hint": "High propagation latency caused by extreme distance."
  },
  {
    "id": 15,
    "question": "What is an advantage of satellite communication over terrestrial fiber optic cables?",
    "options": [
      "Satellite has zero propagation delay",
      "Satellite provides ubiquitous coverage over oceans, deserts, mountains, and remote regions where laying cables is impossible",
      "Satellite bandwidth is infinitely larger than fiber",
      "Satellite dishes consume zero electricity"
    ],
    "answer": "Satellite provides ubiquitous coverage over oceans, deserts, mountains, and remote regions where laying cables is impossible",
    "explanation": "Satellites beam signals across vast geographical areas, instantly connecting islands, ships at sea, aircraft, and rural regions unreachable by physical cables.",
    "hint": "Ubiquitous coverage across remote geography."
  },
  {
    "id": 16,
    "question": "Which of the following is a disadvantage of satellite communication?",
    "options": [
      "Extremely high initial launch cost and impossible hardware repair once in orbit",
      "Inability to broadcast television",
      "Cannot communicate with computers",
      "Only works in one country"
    ],
    "answer": "Extremely high initial launch cost and impossible hardware repair once in orbit",
    "explanation": "Building and launching satellites with rockets costs hundreds of millions of dollars. Once placed in GEO orbit, physical repairs of broken components are virtually impossible.",
    "hint": "Rocket launch cost and inability to repair in orbit."
  },
  {
    "id": 17,
    "question": "What is 'Sun Outage' (Solar Conjunction) in satellite communication?",
    "options": [
      "When the satellite falls into the sun",
      "When the sun aligns directly behind the satellite, flooding receiving earth dish antennas with overwhelming thermal solar noise",
      "When the sun stops shining for an hour",
      "When satellite solar panels fail completely"
    ],
    "answer": "When the sun aligns directly behind the satellite, flooding receiving earth dish antennas with overwhelming thermal solar noise",
    "explanation": "Twice a year around the equinoxes, the sun passes directly behind geostationary satellites. The sun's powerful microwave noise drowns out the satellite signal for a few minutes daily.",
    "hint": "Sun aligns directly behind the satellite."
  },
  {
    "id": 18,
    "question": "How does the Global Positioning System (GPS) differ from Geostationary (GEO) communication satellites?",
    "options": [
      "GPS uses Medium Earth Orbit (MEO) satellites at ~20,200 km altitude in multiple orbital planes, rather than stationary GEO orbit",
      "GPS satellites are tied to balloons",
      "GPS satellites operate only with copper cables",
      "GPS satellites do not use radio waves"
    ],
    "answer": "GPS uses Medium Earth Orbit (MEO) satellites at ~20,200 km altitude in multiple orbital planes, rather than stationary GEO orbit",
    "explanation": "The GPS constellation consists of at least 24 MEO satellites circling the earth every 12 hours at ~20,200 km, ensuring at least 4 satellites are visible from anywhere on Earth.",
    "hint": "GPS operates in Medium Earth Orbit (MEO)."
  },
  {
    "id": 19,
    "question": "What type of power source primarily keeps a communication satellite operating for 15 or more years in orbit?",
    "options": [
      "Solar photovoltaic panels coupled with rechargeable lithium/nickel batteries",
      "Diesel generators",
      "Nuclear power plants",
      "Wind turbines"
    ],
    "answer": "Solar photovoltaic panels coupled with rechargeable lithium/nickel batteries",
    "explanation": "Expansive solar panels convert sunlight into electrical power, charging onboard batteries to keep the transponders running even during Earth eclipses.",
    "hint": "Solar panels and rechargeable batteries."
  },
  {
    "id": 20,
    "question": "Why do satellite dish antennas installed in India point towards the southern sky?",
    "options": [
      "Because the sun is in the south",
      "Because geostationary satellites are positioned directly above the equator, which lies south of India",
      "Because radio waves travel better towards the south",
      "Because of magnetic compass orientation"
    ],
    "answer": "Because geostationary satellites are positioned directly above the equator, which lies south of India",
    "explanation": "Geostationary satellites are in an equatorial orbit. Since India lies in the northern hemisphere, ground dishes must tilt southward towards the equator to face the satellites.",
    "hint": "The equator is south of India."
  },
  {
    "id": 21,
    "question": "What term describes the geographic surface area on Earth covered by a satellite's transmission beam?",
    "options": [
      "Satellite Footprint",
      "Fresnel Zone",
      "Bandwidth",
      "Geo-fence"
    ],
    "answer": "Satellite Footprint",
    "explanation": "The satellite 'footprint' is the ground area over which its parabolic reflectors beam sufficient signal strength for reception by earth antennas.",
    "hint": "The 'footprint' of the satellite on Earth."
  },
  {
    "id": 22,
    "question": "What is 'Rain Fade' in Ku-band and Ka-band satellite communication?",
    "options": [
      "When rain washes the paint off the dish",
      "Signal attenuation caused by heavy rainfall and moisture absorbing high-frequency microwaves",
      "When rain makes the internet speed increase",
      "When the satellite gets wet in space"
    ],
    "answer": "Signal attenuation caused by heavy rainfall and moisture absorbing high-frequency microwaves",
    "explanation": "At Ku-band (12-14 GHz) and Ka-band (20-30 GHz), raindrops are of similar size to signal wavelengths, scattering and absorbing microwave energy during thunderstorms.",
    "hint": "Rain absorbs and scatters high-frequency satellite signals."
  },
  {
    "id": 23,
    "question": "What component is mounted on the focal arm of a consumer satellite dish to collect and convert incoming microwaves into lower intermediate frequencies?",
    "options": [
      "LNB (Low Noise Block downconverter)",
      "HDMI cable",
      "Vampire Tap",
      "BNC terminator"
    ],
    "answer": "LNB (Low Noise Block downconverter)",
    "explanation": "The LNB (Low Noise Block downconverter) amplifies the faint microwave signal reflected off the dish and downconverts it to intermediate frequencies (950-2150 MHz) for the receiver box.",
    "hint": "Low Noise Block downconverter (LNB)."
  },
  {
    "id": 24,
    "question": "True or False: Low Earth Orbit (LEO) satellite constellations (such as Starlink) have lower latency (~25-50ms) than Geostationary satellites because they orbit much closer to Earth (~500 km).",
    "options": [
      "True",
      "False",
      "Only in the daytime",
      "Only over the ocean"
    ],
    "answer": "True",
    "explanation": "LEO satellites orbit at roughly 500-1200 km, reducing round-trip propagation distance dramatically and slashing latency to 25-50 ms compared to 500 ms for GEO.",
    "hint": "Much lower altitude means much shorter travel time."
  },
  {
    "id": 25,
    "question": "In a CBSE 5-mark networking problem: A company wants to connect its headquarters in New Delhi to a mining camp situated on a remote island in the Andaman & Nicobar archipelago. Which medium should be selected?",
    "options": [
      "Twisted Pair Cable",
      "Coaxial 10BASE2",
      "Satellite Communication Link",
      "Infrared Line of Sight"
    ],
    "answer": "Satellite Communication Link",
    "explanation": "Connecting a mainland city across hundreds of kilometers of open sea to an isolated remote island where physical infrastructure is impractical requires a Satellite Communication Link.",
    "hint": "Connecting mainland to remote offshore islands."
  }
];

export default questions;
