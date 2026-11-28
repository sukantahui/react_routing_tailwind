// 25 Authentic CBSE Board Examination Questions for Topic 0
const questions = [
  {
    "id": 1,
    "question": "What does the acronym MODEM stand for?",
    "options": [
      "Modular Demonstration Machine",
      "Modulator / Demodulator",
      "Modern Digital Electronics Module",
      "Multi-Output Device Manager"
    ],
    "answer": "Modulator / Demodulator",
    "explanation": "The term MODEM is a portmanteau derived from MOdulator and DEModulator, describing its two complementary operations.",
    "hint": "MOdulator and DEModulator."
  },
  {
    "id": 2,
    "question": "Why is a modem required when connecting a computer to the internet over a traditional telephone line?",
    "options": [
      "Because telephone lines carry high voltage direct current",
      "Because computers generate digital signals, while telephone lines can only transmit analog voice signals",
      "Because computers overheat without a cooling fan inside the modem",
      "Because internet service providers ban computers without modems"
    ],
    "answer": "Because computers generate digital signals, while telephone lines can only transmit analog voice signals",
    "explanation": "Computer processors manipulate discrete digital binary pulses (0s and 1s), whereas legacy copper telephone networks propagate continuous analog sine waves. The modem bridges this conversion.",
    "hint": "Digital computer signals vs analog telephone lines."
  },
  {
    "id": 3,
    "question": "What is the process of converting a digital signal from a computer into an analog signal for transmission called?",
    "options": [
      "Demodulation",
      "Modulation",
      "Attenuation",
      "Amplification"
    ],
    "answer": "Modulation",
    "explanation": "Modulation is the conversion of digital binary signals into analog carrier wave signals suitable for analog transmission channels.",
    "hint": "Occurs at the transmitting end: digital to analog."
  },
  {
    "id": 4,
    "question": "What is the process of converting incoming analog signals from a telephone line back into digital bits for a computer called?",
    "options": [
      "Modulation",
      "Demodulation",
      "Multiplexing",
      "Encryption"
    ],
    "answer": "Demodulation",
    "explanation": "Demodulation reverses modulation by recovering the original digital binary data from the incoming analog carrier wave.",
    "hint": "Occurs at the receiving end: analog to digital."
  },
  {
    "id": 5,
    "question": "What is an 'Internal Modem'?",
    "options": [
      "A modem installed directly inside the computer's CPU chip",
      "An expansion card slotted into a computer's motherboard (such as a PCIe slot) powered by the system bus",
      "A software program that simulates internet speed",
      "A modem used only inside an office building"
    ],
    "answer": "An expansion card slotted into a computer's motherboard (such as a PCIe slot) powered by the system bus",
    "explanation": "An internal modem is a circuit board inserted into an expansion slot on the motherboard, drawing its power directly from the computer's internal power supply.",
    "hint": "Expansion card fitted inside the computer case."
  },
  {
    "id": 6,
    "question": "Which of the following is an advantage of an External Modem over an Internal Modem?",
    "options": [
      "External modems have status indicator LEDs that simplify troubleshooting and do not consume computer motherboard slots",
      "External modems are completely free of cost",
      "External modems transmit at the speed of light in vacuum",
      "External modems do not require any cables"
    ],
    "answer": "External modems have status indicator LEDs that simplify troubleshooting and do not consume computer motherboard slots",
    "explanation": "External modems feature physical LED indicators (Power, Link, Data, WAN) for rapid diagnostic feedback and can be power-cycled independently without rebooting the PC.",
    "hint": "Standalone chassis with diagnostic LEDs."
  },
  {
    "id": 7,
    "question": "What does 'DSL' stand for in modern broadband modem technology?",
    "options": [
      "Digital System Link",
      "Digital Subscriber Line",
      "Direct Serial Loop",
      "Data Synchronization Layer"
    ],
    "answer": "Digital Subscriber Line",
    "explanation": "DSL stands for Digital Subscriber Line, a broadband technology that delivers high-speed digital data over standard copper telephone lines using higher non-voice frequencies.",
    "hint": "Digital Subscriber Line."
  },
  {
    "id": 8,
    "question": "How does a DSL modem allow simultaneous internet browsing and voice telephone calls over the same copper pair?",
    "options": [
      "By alternating internet and voice every two seconds",
      "By using different frequency bands: lower frequencies (0-4 kHz) for voice, and higher frequencies (25 kHz - 1.1 MHz) for digital data",
      "By converting voice calls into video files",
      "By using two separate batteries"
    ],
    "answer": "By using different frequency bands: lower frequencies (0-4 kHz) for voice, and higher frequencies (25 kHz - 1.1 MHz) for digital data",
    "explanation": "DSL utilizes Frequency Division Multiplexing. The low voice band (0-4 kHz) is reserved for telephone calls, while broadband data is transmitted across ultrasonic higher frequencies without interference.",
    "hint": "Voice uses low frequencies; data uses high frequencies."
  },
  {
    "id": 9,
    "question": "What is the maximum theoretical download data rate of a standard legacy dial-up modem (V.90 / V.92 standard)?",
    "options": [
      "56 Kbps",
      "100 Mbps",
      "1 Gbps",
      "10 Kbps"
    ],
    "answer": "56 Kbps",
    "explanation": "The theoretical speed limit of analog dial-up modems over the Public Switched Telephone Network (PSTN) is 56 Kbps (Kilobits per second), constrained by Shannon-Hartley capacity over 4 kHz voice channels.",
    "hint": "Fifty-six kilobits per second."
  },
  {
    "id": 10,
    "question": "Which type of modem connects to a coaxial television cable network to provide broadband internet access under the DOCSIS standard?",
    "options": [
      "Cable Modem",
      "Dial-up Modem",
      "Acoustic Coupler",
      "Infrared Modem"
    ],
    "answer": "Cable Modem",
    "explanation": "A Cable Modem connects to the hybrid fiber-coaxial (HFC) television network using 75-Ohm coaxial cable and DOCSIS (Data Over Cable Service Interface Specification).",
    "hint": "Connects to television cable."
  },
  {
    "id": 11,
    "question": "What is the difference between 'Bit Rate' and 'Baud Rate' in modem communications?",
    "options": [
      "They are always exactly identical",
      "Bit rate is the number of binary bits transmitted per second (bps); Baud rate is the number of signal modulation changes per second",
      "Baud rate is measured in Megabytes; Bit rate in Kilobytes",
      "Bit rate applies to audio; Baud rate applies to video"
    ],
    "answer": "Bit rate is the number of binary bits transmitted per second (bps); Baud rate is the number of signal modulation changes per second",
    "explanation": "Baud rate is the symbol or signal switching rate per second. Modern modulation schemes encode multiple bits per baud (symbol), meaning Bit Rate = Baud Rate * bits_per_symbol.",
    "hint": "Bit rate = bits per second; Baud rate = signal transitions per second."
  },
  {
    "id": 12,
    "question": "In Frequency Shift Keying (FSK) modulation, how are binary 0 and binary 1 represented in the analog carrier wave?",
    "options": [
      "By changing the color of the wire",
      "By transmitting two distinct, predetermined audio tone frequencies (e.g. 1200 Hz for binary 1 and 2200 Hz for binary 0)",
      "By turning the electricity off for binary 0 and on for binary 1",
      "By changing the physical thickness of the cable"
    ],
    "answer": "By transmitting two distinct, predetermined audio tone frequencies (e.g. 1200 Hz for binary 1 and 2200 Hz for binary 0)",
    "explanation": "FSK assigns two different carrier frequencies to represent digital bits: a higher tone frequency (mark) for 1 and a lower tone frequency (space) for 0.",
    "hint": "Shifting between two audio frequencies."
  },
  {
    "id": 13,
    "question": "In Amplitude Shift Keying (ASK), what property of the carrier wave is modified to represent binary data?",
    "options": [
      "Frequency",
      "Amplitude (voltage height)",
      "Phase angle",
      "Wavelength in glass"
    ],
    "answer": "Amplitude (voltage height)",
    "explanation": "In ASK, the carrier frequency and phase remain constant while the amplitude (peak voltage height) is varied to represent 0s and 1s.",
    "hint": "Amplitude modulation alters voltage height."
  },
  {
    "id": 14,
    "question": "Which device is commonly referred to as a 'Pocket Wi-Fi' or 'Dongle' that connects a laptop to a cellular 4G/5G mobile network?",
    "options": [
      "Wireless Cellular Modem",
      "Passive Hub",
      "Coaxial Terminator",
      "BNC Splitter"
    ],
    "answer": "Wireless Cellular Modem",
    "explanation": "A cellular wireless modem (USB dongle or MiFi hotspot) modulates data across cellular radio frequencies (LTE/5G) to provide mobile internet.",
    "hint": "Wireless cellular modem."
  },
  {
    "id": 15,
    "question": "At which layer of the traditional physical communication model does a modem primarily operate during signal conversion?",
    "options": [
      "Physical Layer",
      "Application Layer",
      "Session Layer",
      "Presentation Layer"
    ],
    "answer": "Physical Layer",
    "explanation": "Modems handle raw signal conversion (voltages, wave modulation, bits to electromagnetic waves), placing their primary functional role at the Physical Layer (Layer 1).",
    "hint": "Deals directly with raw physical transmission signals."
  },
  {
    "id": 16,
    "question": "What type of connector is typically found on the telephone line port of a standard DSL modem?",
    "options": [
      "RJ-11",
      "RJ-45",
      "BNC",
      "USB Type-C"
    ],
    "answer": "RJ-11",
    "explanation": "The telephone line port on a DSL modem uses a compact 4-pin or 6-pin RJ-11 modular telephone connector.",
    "hint": "Telephone line jack: RJ-11."
  },
  {
    "id": 17,
    "question": "What connector is used on the LAN side of a DSL or Cable modem to connect it to a PC or Wi-Fi router?",
    "options": [
      "RJ-45",
      "RJ-11",
      "VGA",
      "PS/2"
    ],
    "answer": "RJ-45",
    "explanation": "The local Ethernet port on a modem uses the standard 8-pin RJ-45 connector for twisted pair cabling.",
    "hint": "8-pin Ethernet connector: RJ-45."
  },
  {
    "id": 18,
    "question": "True or False: If two computers are connected directly using an Ethernet crossover cable, a modem is strictly required between them.",
    "options": [
      "True",
      "False",
      "Only if the computers are laptops",
      "Only if one computer runs Linux"
    ],
    "answer": "False",
    "explanation": "Modems are only required to bridge digital-analog boundaries over telephone/cable lines. Pure digital Ethernet cables connect directly between NICs without modems.",
    "hint": "Direct Ethernet connections are already digital."
  },
  {
    "id": 19,
    "question": "What is an 'Asymmetric Digital Subscriber Line' (ADSL)?",
    "options": [
      "A DSL service where download speeds are significantly faster than upload speeds",
      "A modem that only works in the morning",
      "A connection that uses two different brands of computers",
      "A line that cannot transmit voice"
    ],
    "answer": "A DSL service where download speeds are significantly faster than upload speeds",
    "explanation": "ADSL is 'asymmetric' because download bandwidth (e.g. 16-24 Mbps) is allocated much more capacity than upload bandwidth (e.g. 1-2 Mbps), matching typical consumer usage.",
    "hint": "Asymmetric bandwidth: download > upload."
  },
  {
    "id": 20,
    "question": "What small device is placed between a telephone handset and the wall jack when using a DSL connection to filter out high-frequency modem noise from the phone?",
    "options": [
      "DSL Microfilter / Splitter",
      "Repeater",
      "Switch",
      "Router"
    ],
    "answer": "DSL Microfilter / Splitter",
    "explanation": "A DSL filter (low-pass filter) blocks high-frequency DSL data signals from reaching the telephone receiver, preventing hiss and static noise on voice calls.",
    "hint": "Microfilter or line splitter."
  },
  {
    "id": 21,
    "question": "Which modulation technique combines both Amplitude modulation and Phase modulation to achieve extremely high bit rates over broadband channels?",
    "options": [
      "Quadrature Amplitude Modulation (QAM)",
      "Morse Code",
      "Simple FSK",
      "Direct Current switching"
    ],
    "answer": "Quadrature Amplitude Modulation (QAM)",
    "explanation": "QAM (e.g. 256-QAM or 1024-QAM) modulates both carrier amplitude and phase, enabling the transmission of up to 8-10 bits per single baud symbol.",
    "hint": "QAM combines amplitude and phase modulation."
  },
  {
    "id": 22,
    "question": "Why was dial-up internet access slow compared to modern fiber broadband?",
    "options": [
      "Because dial-up used satellites exclusively",
      "Because analog voice telephone lines are limited to a narrow audio bandwidth of only about 3 kHz to 4 kHz",
      "Because computers in the 1990s had no keyboards",
      "Because telephone wires cannot carry electricity"
    ],
    "answer": "Because analog voice telephone lines are limited to a narrow audio bandwidth of only about 3 kHz to 4 kHz",
    "explanation": "The telephone network was engineered to carry human voice frequencies up to ~4 kHz. By Shannon's law, a 4 kHz channel with typical noise limits data to roughly 56 Kbps.",
    "hint": "Narrow 4 kHz voice bandwidth limits capacity."
  },
  {
    "id": 23,
    "question": "What component inside a smartphone or modern cellular tablet serves the function of a wireless modem?",
    "options": [
      "Baseband Processor / Cellular Modem Chipset",
      "Camera lens",
      "Lithium battery",
      "Vibration motor"
    ],
    "answer": "Baseband Processor / Cellular Modem Chipset",
    "explanation": "Smartphones contain a dedicated baseband processor (cellular modem) that handles RF modulation/demodulation for 4G LTE and 5G communications.",
    "hint": "Cellular baseband processor."
  },
  {
    "id": 24,
    "question": "What happens during a 'handshake' when a dial-up modem initiates a connection to an ISP?",
    "options": [
      "The two modems physically shake hands",
      "The modems exchange audio tones to test line quality, agree on modulation protocols, and negotiate the highest mutually supported data rate",
      "The computer deletes all files",
      "The telephone number is sent by email"
    ],
    "answer": "The modems exchange audio tones to test line quality, agree on modulation protocols, and negotiate the highest mutually supported data rate",
    "explanation": "The classic screeching sound of dial-up modems was the audio handshaking procedure where both modems negotiated line quality and connection speed.",
    "hint": "Negotiating modulation speed and line parameters."
  },
  {
    "id": 25,
    "question": "In a CBSE 1-mark question: 'Name the device that converts digital signals to analog and vice versa.' What is the answer?",
    "options": [
      "Hub",
      "Switch",
      "Modem",
      "Repeater"
    ],
    "answer": "Modem",
    "explanation": "A Modem (Modulator-Demodulator) converts digital signals to analog and vice versa.",
    "hint": "MOdulator-DEModulator."
  }
];

export default questions;
