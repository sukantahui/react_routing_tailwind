export default [
  {
    "id": 1,
    "question": "In a CBSE 4-mark case study question: 'The company plans to hold interactive real-time video meetings between its Head Office and zonal offices. Suggest the protocol used for transmitting voice and multimedia over IP.' What is the answer?",
    "options": [
      "VoIP (Voice over Internet Protocol)",
      "SMTP",
      "FTP",
      "POP3"
    ],
    "correctAnswer": 0,
    "explanation": "VoIP (Voice over Internet Protocol) enables real-time voice, video, and multimedia transmission over packet-switched IP networks, which is the standard answer for CBSE video conferencing questions.",
    "hint": "Think of voice communications converted into digital data packets."
  },
  {
    "id": 2,
    "question": "Which of the following hardware setups is mandatory in an executive conference room to facilitate seamless two-way video conferencing?",
    "options": [
      "HD Web camera, microphone array, audio speakers, and display screen",
      "Dot matrix printer, scanner, and barcode reader",
      "Plotter, modem, and magnetic tape drive",
      "Only an optical mouse and numeric keypad"
    ],
    "correctAnswer": 0,
    "explanation": "Video conferencing requires audio-visual capture and output devices: HD video camera, omnidirectional microphone, speakers, and high-resolution display monitors.",
    "hint": "What devices are needed to see and hear remote participants?"
  },
  {
    "id": 3,
    "question": "Which internet connection characteristic is MOST crucial for smooth, stutter-free video conferencing without freezing or lag?",
    "options": [
      "High symmetric bandwidth with low latency and minimal jitter",
      "Extremely large hard drive storage on the client machine",
      "Use of coaxial cabling exclusively",
      "High dial-up modem baud rate"
    ],
    "correctAnswer": 0,
    "explanation": "Video conferencing is a real-time interactive application requiring high symmetric upload and download speeds, low latency (<150ms), and minimal jitter to prevent packet delays.",
    "hint": "Real-time communication depends on low delay and reliable upload/download throughput."
  },
  {
    "id": 4,
    "question": "In CBSE board marking schemes, if asked: 'Suggest any one hardware device other than a computer required for video conferencing', which of the following scores full marks?",
    "options": [
      "Webcam (or Video Camera / Microphone)",
      "Laser Printer",
      "Pen Drive",
      "Uninterruptible Power Supply (UPS)"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE marking schemes specifically list 'Webcam', 'Digital Video Camera', 'Microphone', 'Speakers', or 'Large Display Screen/Projector' as valid answers.",
    "hint": "Identify the device responsible for capturing live facial video or audio."
  },
  {
    "id": 5,
    "question": "Which signaling protocol is commonly paired with VoIP and real-time multimedia conferencing to initiate, maintain, and terminate interactive sessions?",
    "options": [
      "SIP (Session Initiation Protocol)",
      "DHCP",
      "DNS",
      "SNMP"
    ],
    "correctAnswer": 0,
    "explanation": "SIP (Session Initiation Protocol) is an IETF signaling protocol used for initiating, establishing, modifying, and terminating real-time sessions including video and voice calls.",
    "hint": "It initiates and terminates communication sessions."
  },
  {
    "id": 6,
    "question": "When a question asks: 'Suggest a communication service/technology that enables the CEO in New Delhi to deliver a live lecture to students in branches across 5 states simultaneously', what is the most appropriate term?",
    "options": [
      "Video Conferencing / Webcasting",
      "File Transfer Protocol (FTP)",
      "Electronic Mail (Email)",
      "Usenet Newsgroups"
    ],
    "correctAnswer": 0,
    "explanation": "Video conferencing or webcasting allows real-time interactive multi-point audiovisual communication across geographically distributed locations.",
    "hint": "Real-time audio-video transmission across multiple remote sites."
  },
  {
    "id": 7,
    "question": "What is RTP in the context of multimedia streaming and video conferencing over IP networks?",
    "options": [
      "Real-time Transport Protocol",
      "Remote Transfer Protocol",
      "Reliable Telephony Process",
      "Routing Transmission Path"
    ],
    "correctAnswer": 0,
    "explanation": "RTP (Real-time Transport Protocol) delivers audio and video over IP networks, providing payload type identification, sequence numbering, and timestamping.",
    "hint": "It carries the actual audio/video media packets in real time."
  },
  {
    "id": 8,
    "question": "Why is UDP (User Datagram Protocol) preferred over TCP for transmitting real-time video conference audio and video frames?",
    "options": [
      "UDP has lower overhead and avoids retransmission delays that cause unnatural audio/video lags",
      "UDP encrypts all traffic automatically",
      "UDP guarantees 100% error-free delivery of every packet",
      "UDP works without IP addresses"
    ],
    "correctAnswer": 0,
    "explanation": "In real-time interactive audio/video, a slightly corrupted or lost frame dropped in 20 milliseconds is preferable to waiting for TCP retransmission which freezes the conversation.",
    "hint": "Lower overhead and no retransmission delays for live media."
  },
  {
    "id": 9,
    "question": "What term describes the variation in packet arrival times that causes robotic voices or choppy video during a conference call?",
    "options": [
      "Jitter",
      "Attenuation",
      "Crosstalk",
      "Reflection"
    ],
    "correctAnswer": 0,
    "explanation": "Jitter refers to packet delay variation; if packets arrive at uneven intervals, the playback buffer struggles, resulting in choppy audio or stuttering video.",
    "hint": "Variation in network latency between consecutive packets."
  },
  {
    "id": 10,
    "question": "Which web standard allows direct browser-to-browser audio, video, and data communication without requiring external plugins or proprietary software?",
    "options": [
      "WebRTC (Web Real-Time Communication)",
      "ActiveX Controls",
      "Adobe Flash Player",
      "Java Applets"
    ],
    "correctAnswer": 0,
    "explanation": "WebRTC enables modern browsers (Chrome, Edge, Firefox) to establish peer-to-peer real-time audio, video, and data channels directly using JavaScript APIs.",
    "hint": "Web Real-Time Communication built into modern browsers."
  },
  {
    "id": 11,
    "question": "In a CBSE case study question: 'The organization wants to secure its internal network from unauthorized external intrusions while running video calls. What device or software should be installed at the gateway?'",
    "options": [
      "Firewall",
      "Repeater",
      "Modem",
      "Hub"
    ],
    "correctAnswer": 0,
    "explanation": "A Firewall (hardware or software) inspects incoming and outgoing network traffic according to security rules, blocking malicious packets and safeguarding internal hosts.",
    "hint": "The primary boundary security barrier between trusted internal network and public internet."
  },
  {
    "id": 12,
    "question": "What type of microphone is best suited for an 8-person conference table to ensure everyone's voice is captured clearly?",
    "options": [
      "Omnidirectional boundary microphone with noise cancellation",
      "Unidirectional handheld vocal microphone",
      "Ribbon studio microphone requiring phantom power",
      "Magnetic guitar pickup"
    ],
    "correctAnswer": 0,
    "explanation": "Omnidirectional boundary microphones pick up sound equally from a 360-degree radius across the entire conference table and filter out background room noise.",
    "hint": "Picks up sound from all directions equally around the table."
  },
  {
    "id": 13,
    "question": "Which parameter measures the round-trip time required for a video packet to travel from speaker to listener and back?",
    "options": [
      "Latency (Ping time)",
      "Bandwidth",
      "Baud rate",
      "Sampling rate"
    ],
    "correctAnswer": 0,
    "explanation": "Latency (measured in milliseconds) represents network delay; for acceptable two-way video calls, one-way latency should ideally remain below 150 milliseconds.",
    "hint": "The delay experienced between sending and receiving data."
  },
  {
    "id": 14,
    "question": "In video compression algorithms (codecs such as H.264, H.265, VP9), why is temporal compression essential?",
    "options": [
      "Only the differences (motion vectors and changes) between successive frames are transmitted, drastically reducing required bandwidth",
      "It doubles the resolution of each static frame",
      "It replaces pixels with audio signals",
      "It prints each frame to an image file"
    ],
    "correctAnswer": 0,
    "explanation": "Temporal compression exploits redundancy between consecutive video frames; by sending only changed pixel data rather than full frames, bandwidth requirements fall by 80-90%.",
    "hint": "Transmitting only what changed from one frame to the next."
  },
  {
    "id": 15,
    "question": "Which of the following software applications is recognized by CBSE marking schemes as an example of video conferencing / VoIP software?",
    "options": [
      "Zoom, Microsoft Teams, Google Meet, Skype",
      "Notepad, MS Paint, Calculator",
      "MySQL, Oracle, SQLite",
      "GIMP, Photoshop, CorelDraw"
    ],
    "correctAnswer": 0,
    "explanation": "Zoom, Teams, Google Meet, and Skype are standard modern video conferencing and VoIP collaborative software platforms accepted in CBSE examinations.",
    "hint": "Common software used for remote learning and corporate virtual meetings."
  },
  {
    "id": 16,
    "question": "What does QoS stand for in network switches and routers configured for enterprise video conferencing?",
    "options": [
      "Quality of Service",
      "Quantity of Silicon",
      "Quick Operating System",
      "Query Oriented Syntax"
    ],
    "correctAnswer": 0,
    "explanation": "QoS (Quality of Service) allows network administrators to prioritize latency-sensitive voice and video packets over bulk file downloads and background updates.",
    "hint": "Prioritization mechanism for real-time traffic."
  },
  {
    "id": 17,
    "question": "If a branch campus in a remote hilly area experiences intermittent satellite latency for video calls, what local caching/bandwidth management approach helps?",
    "options": [
      "Dynamic bitrate adaptation and local proxy/media relay server",
      "Switching all cables to unshielded twisted pair Cat3",
      "Replacing the display screen with an analog television",
      "Removing the gateway firewall"
    ],
    "correctAnswer": 0,
    "explanation": "Adaptive bitrate algorithms automatically scale down video resolution during bandwidth drops, preserving continuous audio without freezing the call.",
    "hint": "Adapts stream quality dynamically based on available network throughput."
  },
  {
    "id": 18,
    "question": "What is an MCU in professional multi-party video conferencing infrastructure?",
    "options": [
      "Multipoint Control Unit",
      "Micro Computer Unit",
      "Master Cable Utility",
      "Modular Copper Unifier"
    ],
    "correctAnswer": 0,
    "explanation": "An MCU (Multipoint Control Unit) bridges multiple video endpoints, mixing audio streams and compositing video layouts (grid view) for all participants.",
    "hint": "Bridge hardware or cloud server that connects multiple simultaneous callers."
  },
  {
    "id": 19,
    "question": "Which frequency band is commonly utilized by modern enterprise Wi-Fi 6 access points to avoid congestion during high-density video conferencing in conference halls?",
    "options": [
      "5 GHz and 6 GHz bands",
      "Low-frequency AM radio band (530 kHz)",
      "Audio acoustic frequencies (20 Hz - 20 kHz)",
      "Infrared line of sight only"
    ],
    "correctAnswer": 0,
    "explanation": "The 5 GHz and 6 GHz Wi-Fi spectrum provides wider channels and significantly less interference than the crowded 2.4 GHz band, ideal for multi-user HD streaming.",
    "hint": "Higher gigahertz frequency bands with more non-overlapping channels."
  },
  {
    "id": 20,
    "question": "In a CBSE 4-mark case study question: 'The management requires that meetings be broadcast to thousands of employees simultaneously without allowing attendees to speak. Suggest the suitable service.'",
    "options": [
      "Webinar / Live Webcast",
      "Peer-to-Peer file sharing",
      "Telnet terminal session",
      "Anonymous FTP"
    ],
    "correctAnswer": 0,
    "explanation": "Webinars or Live Webcasting provide one-to-many broadcast streaming where a presenter's audio/video is delivered to large audiences with interactive chat or Q&A.",
    "hint": "One-to-many live streaming broadcasting format."
  },
  {
    "id": 21,
    "question": "What is the primary role of Acoustic Echo Cancellation (AEC) in conference audio processors?",
    "options": [
      "Preventing speaker output from being captured by the microphone and sent back as a howling loop or delayed echo to the remote caller",
      "Amplifying background keyboard typing noises",
      "Increasing music bass frequencies",
      "Converting digital voice back into analog radio waves"
    ],
    "correctAnswer": 0,
    "explanation": "AEC analyzes speaker audio output and mathematically subtracts that signal from microphone input, eliminating distracting echoes for remote participants.",
    "hint": "Eliminates hearing your own voice echoed back."
  },
  {
    "id": 22,
    "question": "For a classroom of 40 students attending a remote guest lecture, what output display device is recommended over a standard 15-inch desktop monitor?",
    "options": [
      "Large format Interactive Flat Panel (IFP) or High-Lumen Projector",
      "Thermal Receipt Printer",
      "7-inch Tablet screen",
      "Single LED status indicator"
    ],
    "correctAnswer": 0,
    "explanation": "A large-format IFP or multimedia projector provides sufficient viewing dimensions and visibility for all 40 students sitting across a lecture hall.",
    "hint": "Large display device designed for whole-classroom visibility."
  },
  {
    "id": 23,
    "question": "What is the minimum recommended upload speed per host machine for transmitting 1080p Full HD video conferencing at 30 fps?",
    "options": [
      "3.0 to 4.0 Mbps dedicated upload bandwidth",
      "56 Kbps dialup speed",
      "128 Kbps ISDN channel",
      "0.01 Mbps"
    ],
    "correctAnswer": 0,
    "explanation": "Full HD 1080p video streaming typically requires between 2.5 to 4.0 Mbps sustained symmetric upload bandwidth per video stream.",
    "hint": "Several megabits per second are required for high-definition video."
  },
  {
    "id": 24,
    "question": "How does end-to-end encryption (E2EE) protect sensitive executive video conferences in modern enterprise platforms?",
    "options": [
      "Cryptographic keys exist only on participant endpoints; even the cloud hosting service provider cannot decrypt the video or audio streams",
      "It stores all video uncompressed on public FTP servers",
      "It converts the meeting into public YouTube videos",
      "It blocks all microphones permanently"
    ],
    "correctAnswer": 0,
    "explanation": "End-to-end encryption ensures that audio, video, and screen sharing data are encrypted at the sender and decrypted only at the recipient, preventing intermediary eavesdropping.",
    "hint": "Only communicating participants hold the decryption keys."
  },
  {
    "id": 25,
    "question": "In a summary CBSE question: 'Give one advantage and one disadvantage of video conferencing in corporate training.' Which pair is completely accurate?",
    "options": [
      "Advantage: Eliminates travel costs and saves time; Disadvantage: Requires high-speed reliable internet and expensive specialized hardware setup",
      "Advantage: Works without electricity; Disadvantage: Cannot transmit images",
      "Advantage: Guarantees 100% attendance; Disadvantage: Limited to 1 minute per call",
      "Advantage: Replaces all computers; Disadvantage: Needs paper printing"
    ],
    "correctAnswer": 0,
    "explanation": "Video conferencing eliminates massive business travel expenses and logistical overhead, but relies heavily on stable, high-speed broadband and upfront hardware investments.",
    "hint": "Cost and travel savings versus hardware and connectivity dependencies."
  }
];
