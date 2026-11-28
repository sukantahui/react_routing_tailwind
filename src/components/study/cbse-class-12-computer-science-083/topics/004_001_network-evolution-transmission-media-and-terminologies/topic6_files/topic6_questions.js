// 25 Authentic CBSE Board Examination Questions for Topic 6
const questions = [
  {
    "id": 1,
    "question": "What physical optical phenomenon enables light signals to propagate through an optical fiber without escaping?",
    "options": [
      "Total Internal Reflection",
      "Optical Polarization",
      "Photoelectric Effect",
      "Diffraction of light"
    ],
    "answer": "Total Internal Reflection",
    "explanation": "Data propagates through optical fiber via Total Internal Reflection (TIR), where light rays reflect off the core-cladding boundary back into the core.",
    "hint": "Recall the optical reflection phenomenon when incident angle exceeds critical angle."
  },
  {
    "id": 2,
    "question": "For Total Internal Reflection to occur in an optical fiber, what must be the relationship between the refractive index of the core (n1) and cladding (n2)?",
    "options": [
      "n1 must be strictly greater than n2 (n1 > n2)",
      "n2 must be strictly greater than n1 (n2 > n1)",
      "n1 and n2 must be exactly equal (n1 = n2)",
      "Refractive index does not affect light propagation"
    ],
    "answer": "n1 must be strictly greater than n2 (n1 > n2)",
    "explanation": "TIR occurs only when light attempts to travel from an optically denser medium (higher refractive index n1) to an optically rarer medium (lower refractive index n2).",
    "hint": "Core is optically denser than cladding."
  },
  {
    "id": 3,
    "question": "What happens if the angle of incidence of a light ray at the core-cladding boundary is less than the critical angle?",
    "options": [
      "The light speeds up and reflects backwards",
      "The light refracts into the cladding and escapes, resulting in signal loss",
      "The light converts into electrical current",
      "The wavelength doubles"
    ],
    "answer": "The light refracts into the cladding and escapes, resulting in signal loss",
    "explanation": "If the angle of incidence is below the critical angle, refraction takes place rather than total reflection, allowing light energy to leak out through the cladding.",
    "hint": "TIR requires angle of incidence to be strictly greater than critical angle."
  },
  {
    "id": 4,
    "question": "Name the three concentric physical layers of an optical fiber cable from innermost to outermost.",
    "options": [
      "Cladding, Core, Buffer Jacket",
      "Core, Cladding, Buffer Jacket",
      "Jacket, Shield, Core",
      "Dielectric, Conductor, Sheath"
    ],
    "answer": "Core, Cladding, Buffer Jacket",
    "explanation": "The innermost layer is the Core (carries light), surrounded by the Cladding (lower refractive index), encased in the protective Buffer Coating & Jacket.",
    "hint": "Core is innermost, Cladding is middle, Jacket is outer."
  },
  {
    "id": 5,
    "question": "Why is optical fiber completely immune to Electromagnetic Interference (EMI) and Radio Frequency Interference (RFI)?",
    "options": [
      "Because it is made of ultra-thick gold plating",
      "Because it transmits signals as light pulses through non-conductive dielectric glass rather than electrical currents",
      "Because it operates at very high direct-current voltages",
      "Because it is always buried 100 meters underground"
    ],
    "answer": "Because it transmits signals as light pulses through non-conductive dielectric glass rather than electrical currents",
    "explanation": "Since glass is an electrical insulator (dielectric) and light photons carry no electrical charge, external magnetic and electric fields have zero effect on data signals.",
    "hint": "Photons traveling through glass do not interact with electromagnetic fields."
  },
  {
    "id": 6,
    "question": "Which type of optical fiber has a very narrow core (8 to 10 µm) and uses a laser diode to transmit a single ray of light over long distances?",
    "options": [
      "Single-Mode Fiber (SMF)",
      "Multi-Mode Fiber (MMF)",
      "Step-Index MMF",
      "Graded-Index MMF"
    ],
    "answer": "Single-Mode Fiber (SMF)",
    "explanation": "Single-Mode Fiber has an extremely thin core that allows only one light mode (ray path) to travel, completely eliminating modal dispersion and enabling reach over 50-100 km.",
    "hint": "Single mode = single light path."
  },
  {
    "id": 7,
    "question": "What is the primary factor that limits the transmission distance of Multi-Mode Fiber (MMF) to a few kilometers?",
    "options": [
      "Copper resistance",
      "Modal Dispersion caused by different light rays taking paths of different lengths",
      "High atmospheric pressure",
      "Interference from radio waves"
    ],
    "answer": "Modal Dispersion caused by different light rays taking paths of different lengths",
    "explanation": "In multi-mode fiber, light rays bounce at varying angles. Rays taking longer diagonal paths arrive later than straight rays, causing light pulses to spread out (modal dispersion).",
    "hint": "Spreading of light pulses due to multiple path angles."
  },
  {
    "id": 8,
    "question": "Which of the following light sources is typically paired with Multi-Mode Fiber (MMF) in campus local area networks?",
    "options": [
      "Helium-Neon Gas Laser",
      "Light Emitting Diode (LED) or VCSEL",
      "Incandescent Bulb",
      "X-Ray Emitter"
    ],
    "answer": "Light Emitting Diode (LED) or VCSEL",
    "explanation": "Multi-mode fibers generally utilize cost-effective Light Emitting Diodes (LEDs) or Vertical-Cavity Surface-Emitting Lasers (VCSELs) operating at 850 nm or 1300 nm.",
    "hint": "Economical semiconductor light emitters."
  },
  {
    "id": 9,
    "question": "Why is optical fiber considered the most secure transmission medium against electronic eavesdropping?",
    "options": [
      "Because all fiber cables are encrypted with military passwords",
      "Because it does not emit electromagnetic radiation, and physical tapping causes detectable optical power loss",
      "Because only government employees are permitted to handle fiber",
      "Because light rays cannot be decoded by computers"
    ],
    "answer": "Because it does not emit electromagnetic radiation, and physical tapping causes detectable optical power loss",
    "explanation": "No electromagnetic energy radiates from the glass core to be intercepted by inductive taps. Physically cutting the fiber causes an instantaneous optical loss that trips network alarms.",
    "hint": "No radiated fields to pick up, and physical splicing alerts monitoring systems."
  },
  {
    "id": 10,
    "question": "Which optical fiber connector features a square push-pull snap-in latching mechanism?",
    "options": [
      "SC (Subscriber Connector)",
      "ST (Straight Tip)",
      "BNC",
      "RJ-45"
    ],
    "answer": "SC (Subscriber Connector)",
    "explanation": "The SC connector (Subscriber Connector / Square Connector) utilizes a push-pull latching mechanism with a 2.5 mm ferrule.",
    "hint": "Square push-pull connector."
  },
  {
    "id": 11,
    "question": "What connector uses a spring-loaded bayonet twist-lock mechanism similar to a BNC connector?",
    "options": [
      "ST (Straight Tip) connector",
      "LC connector",
      "RJ-11",
      "USB connector"
    ],
    "answer": "ST (Straight Tip) connector",
    "explanation": "ST (Straight Tip) connectors feature a round metal housing with a spring-loaded twist-and-lock bayonet mount.",
    "hint": "Straight Tip bayonet connector."
  },
  {
    "id": 12,
    "question": "Which small form factor fiber connector is roughly half the size of an SC connector and features an RJ-45 style retention tab?",
    "options": [
      "LC (Lucent Connector)",
      "BNC",
      "Vampire Tap",
      "F-type"
    ],
    "answer": "LC (Lucent Connector)",
    "explanation": "The LC (Lucent Connector) uses a 1.25 mm ferrule and an RJ-style release tab, allowing high port density in data center switches.",
    "hint": "Little connector named LC."
  },
  {
    "id": 13,
    "question": "What is the primary material used to fabricate the core and cladding of high-performance optical communication fibers?",
    "options": [
      "Ultra-pure Silica Glass (Silicon Dioxide, SiO2)",
      "Copper-Zinc Alloy",
      "Conductive Carbon Nanotubes",
      "Pure Lead"
    ],
    "answer": "Ultra-pure Silica Glass (Silicon Dioxide, SiO2)",
    "explanation": "High-grade optical fibers are made from synthetic ultra-pure fused silica glass (SiO2) doped with tiny amounts of germanium to control the refractive index.",
    "hint": "Silicon dioxide glass."
  },
  {
    "id": 14,
    "question": "What is 'Attenuation' in an optical fiber?",
    "options": [
      "The increase of light frequency as it travels",
      "The gradual reduction or loss of optical signal power as light travels along the fiber length",
      "The physical stretching of the fiber cable",
      "The conversion of laser light into visible rainbow colors"
    ],
    "answer": "The gradual reduction or loss of optical signal power as light travels along the fiber length",
    "explanation": "Attenuation is the loss of optical power (measured in dB/km) caused by absorption, Rayleigh scattering, and micro-bending as light propagates through glass.",
    "hint": "Loss of signal strength over distance."
  },
  {
    "id": 15,
    "question": "In CBSE board case studies, which medium is universally recommended for connecting two university buildings situated 3 km apart?",
    "options": [
      "UTP Cat-6 Cable",
      "Coaxial Cable (10BASE2)",
      "Optical Fiber Cable",
      "Infrared line of sight"
    ],
    "answer": "Optical Fiber Cable",
    "explanation": "At a distance of 3 km, copper cables (UTP and Coaxial) fail due to their 100m - 500m distance limitations. Optical fiber provides gigabit speeds over kilometers with minimal attenuation.",
    "hint": "3 km is far beyond copper's reach."
  },
  {
    "id": 16,
    "question": "What is 'Fusion Splicing' in fiber optics?",
    "options": [
      "Gluing two wires with adhesive tape",
      "Using an electric arc to melt and permanently weld two glass optical fiber ends together",
      "Crimping a plastic plug onto copper",
      "Splitting a fiber strand into two with scissors"
    ],
    "answer": "Using an electric arc to melt and permanently weld two glass optical fiber ends together",
    "explanation": "Fusion splicing aligns the microscopic glass cores with sub-micron precision and melts them together using a localized electric arc, providing near-zero insertion loss.",
    "hint": "Melting and welding glass fiber ends using an electric arc."
  },
  {
    "id": 17,
    "question": "Why can optical fiber cables safely be run alongside high-voltage electrical power conduits in utility tunnels?",
    "options": [
      "Because high voltage charges the fiber batteries",
      "Because fiber contains no metal and cannot pick up inductive electrical noise from power cables",
      "Because fiber cables are surrounded by heavy lead shielding",
      "Because electricity converts into light automatically"
    ],
    "answer": "Because fiber contains no metal and cannot pick up inductive electrical noise from power cables",
    "explanation": "All-dielectric optical cables contain no electrical conductors. High-voltage lines cannot induce electromagnetic noise or create fire/grounding hazards in dielectric glass.",
    "hint": "Dielectric glass is an electrical non-conductor."
  },
  {
    "id": 18,
    "question": "What term describes the maximum angle within which incoming light rays will be accepted and guided into the fiber core?",
    "options": [
      "Critical Angle",
      "Acceptance Angle (or Numerical Aperture cone)",
      "Brewster's Angle",
      "Phase Angle"
    ],
    "answer": "Acceptance Angle (or Numerical Aperture cone)",
    "explanation": "The acceptance angle defines the cone of light that can enter the core and strike the core-cladding boundary at an angle greater than the critical angle.",
    "hint": "Cone of acceptance."
  },
  {
    "id": 19,
    "question": "What is the typical core diameter of a standard Single-Mode telecom fiber?",
    "options": [
      "9 micrometers (µm)",
      "50 micrometers (µm)",
      "100 micrometers (µm)",
      "1 millimeter"
    ],
    "answer": "9 micrometers (µm)",
    "explanation": "Standard Single-Mode Fiber (such as ITU-T G.652) has a nominal core diameter of approximately 8 to 9 micrometers (µm) and a cladding diameter of 125 µm.",
    "hint": "Under 10 microns."
  },
  {
    "id": 20,
    "question": "Which of the following is a key operational challenge or disadvantage of optical fiber cables?",
    "options": [
      "Very low data carrying capacity",
      "Higher installation and transceiver cost, and fragility to severe mechanical bending",
      "High susceptibility to radio wave interference",
      "Excessive signal loss over distances under 50 meters"
    ],
    "answer": "Higher installation and transceiver cost, and fragility to severe mechanical bending",
    "explanation": "Optical components (lasers, transceivers) and splicing tools are expensive. Glass fibers can also crack if bent beyond their rated minimum bend radius.",
    "hint": "High equipment cost and physical fragility of glass."
  },
  {
    "id": 21,
    "question": "What happens to light if an optical fiber is bent around a sharp 90-degree corner beyond its minimum bend radius?",
    "options": [
      "The light speeds up past the speed of light",
      "Macro-bending causes the angle of incidence to drop below the critical angle, letting light leak out",
      "The fiber turns into an electrical conductor",
      "The light reflects backwards into the laser source"
    ],
    "answer": "Macro-bending causes the angle of incidence to drop below the critical angle, letting light leak out",
    "explanation": "Severe bending (macro-bending) alters the angle at which light strikes the core-cladding boundary, dropping it below the critical angle and allowing optical power to escape.",
    "hint": "Bending changes the boundary angle, violating TIR."
  },
  {
    "id": 22,
    "question": "What optical technology enables multiple distinct data streams to travel simultaneously through a single optical fiber using different wavelengths (colors) of light?",
    "options": [
      "Wavelength Division Multiplexing (WDM / DWDM)",
      "Time Division Multiplexing (TDM)",
      "Code Division Multiple Access (CDMA)",
      "Frequency Hopping"
    ],
    "answer": "Wavelength Division Multiplexing (WDM / DWDM)",
    "explanation": "Wavelength Division Multiplexing (WDM) combines multiple laser light signals of different wavelengths (colors) onto a single fiber, multiplying capacity by factors of 80 to 160+.",
    "hint": "Multiplexing across different wavelengths of light."
  },
  {
    "id": 23,
    "question": "True or False: In optical fiber, light travels faster than the speed of light in a vacuum ((3 \\times 10^8 \\text{ m/s})).",
    "options": [
      "True",
      "False",
      "Only in Single-Mode fibers",
      "Only in ultraviolet spectrum"
    ],
    "answer": "False",
    "explanation": "Light travels slower in glass than in a vacuum. Its velocity is (v = c / n). For silica glass ((n \\approx 1.48)), light travels at approximately (200,000 \\text{ km/s}) (about 67% of (c)).",
    "hint": "The refractive index slows light down: v = c / n."
  },
  {
    "id": 24,
    "question": "Which outer layer provides physical tensile strength and prevents optical fiber from stretching during underground conduit pulling?",
    "options": [
      "Copper braiding",
      "Kevlar (Aramid yarn) strength members",
      "Rubber bands",
      "Aluminium mesh"
    ],
    "answer": "Kevlar (Aramid yarn) strength members",
    "explanation": "Kevlar (aramid yarn) strands inside the cable absorb the pulling tension during installation, ensuring the fragile glass core is not subjected to mechanical stress.",
    "hint": "High-tensile synthetic bullet-proof material."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Which communication medium is the fastest and immune to electromagnetic interference?' What should you write?",
    "options": [
      "Coaxial Cable",
      "Twisted Pair Cable",
      "Optical Fiber Cable",
      "Microwave Link"
    ],
    "answer": "Optical Fiber Cable",
    "explanation": "Optical fiber is both the fastest transmission medium (multi-terabit capabilities) and completely immune to EMI due to its dielectric glass composition.",
    "hint": "Fastest wired medium immune to noise."
  }
];

export default questions;
