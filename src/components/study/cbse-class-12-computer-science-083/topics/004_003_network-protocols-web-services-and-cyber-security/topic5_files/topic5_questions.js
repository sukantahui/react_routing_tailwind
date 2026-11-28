export default [
  {
    "id": 1,
    "question": "What does the acronym VoIP stand for?",
    "options": [
      "Voice over Internet Protocol",
      "Virtual online Interface Program",
      "Video on Information Port",
      "Variable Optical Internet Pathway"
    ],
    "correctAnswer": 0,
    "explanation": "VoIP stands for Voice over Internet Protocol, a technology that enables voice communication and multimedia sessions over Internet Protocol (IP) networks.",
    "hint": "Voice over Internet Protocol."
  },
  {
    "id": 2,
    "question": "How does VoIP transmit human speech across a computer network?",
    "options": [
      "It digitizes analog voice audio, compresses it into digital data packets, and transmits them over packet-switched IP networks.",
      "It requires a direct dedicated physical copper wire from caller to receiver.",
      "It uses Morse code audio tones.",
      "It relies exclusively on shortwave radio towers."
    ],
    "correctAnswer": 0,
    "explanation": "VoIP samples and digitizes analog acoustic audio signals using codecs, breaks the digital stream into IP packets, and sends them across packet-switched networks.",
    "hint": "Digitization, compression, packetization, and IP routing."
  },
  {
    "id": 3,
    "question": "Which traditional telephone network is VoIP actively replacing in corporate and residential environments?",
    "options": [
      "PSTN (Public Switched Telephone Network)",
      "LAN (Local Area Network)",
      "PAN (Personal Area Network)",
      "SAN (Storage Area Network)"
    ],
    "correctAnswer": 0,
    "explanation": "VoIP replaces the legacy circuit-switched PSTN (Public Switched Telephone Network) with high-efficiency packet-switched data networks.",
    "hint": "PSTN is the legacy circuit-switched telephone network."
  },
  {
    "id": 4,
    "question": "What is the primary financial advantage of adopting VoIP for an international enterprise with offices worldwide?",
    "options": [
      "Significant reduction in long-distance calling costs by leveraging existing broadband internet infrastructure instead of toll-based telecom circuits.",
      "Elimination of computer electricity bills.",
      "Free computer monitors.",
      "Zero requirement for internet connections."
    ],
    "correctAnswer": 0,
    "explanation": "VoIP eliminates costly per-minute international long-distance telephone tolls by routing voice traffic over existing broadband/fiber connections.",
    "hint": "Huge cost savings on long-distance calls."
  },
  {
    "id": 5,
    "question": "Which protocol is most widely used in VoIP architecture for signaling, call setup, session negotiation, and call termination?",
    "options": [
      "SIP (Session Initiation Protocol)",
      "SMTP",
      "POP3",
      "FTP"
    ],
    "correctAnswer": 0,
    "explanation": "SIP (Session Initiation Protocol) is the industry-standard application layer protocol used for initiating, modifying, and terminating interactive multimedia voice and video sessions.",
    "hint": "Session Initiation Protocol."
  },
  {
    "id": 6,
    "question": "Which transport protocol is used in conjunction with UDP to carry the actual real-time digitized audio payload in VoIP?",
    "options": [
      "RTP (Real-Time Transport Protocol)",
      "TCP",
      "ICMP",
      "ARP"
    ],
    "correctAnswer": 0,
    "explanation": "RTP (Real-time Transport Protocol) runs over UDP to deliver real-time audio and video payloads with timestamping and sequence numbering.",
    "hint": "Real-Time Transport Protocol."
  },
  {
    "id": 7,
    "question": "Why does VoIP audio streaming typically use UDP rather than TCP at the Transport Layer?",
    "options": [
      "Because UDP avoids retransmission delays; retransmitting a lost voice syllable 500 milliseconds later is useless in a live conversation, whereas low latency is vital.",
      "Because TCP cannot transmit sound frequencies.",
      "Because UDP is encrypted by default.",
      "Because TCP requires paper contracts."
    ],
    "correctAnswer": 0,
    "explanation": "Live voice is highly sensitive to delay (latency and jitter). Dropping a minor packet is preferable to pausing a conversation to wait for a TCP retransmission.",
    "hint": "Low latency is critical; retransmitted voice packets arrive too late."
  },
  {
    "id": 8,
    "question": "What is 'Jitter' in a VoIP telephone network?",
    "options": [
      "The variation in packet arrival delay across the network, leading to choppy or distorted speech if not smoothed by a buffer.",
      "The physical vibration of the computer speaker.",
      "The volume of background office noise.",
      "The cost per megabyte of data."
    ],
    "correctAnswer": 0,
    "explanation": "Jitter is the statistical variance in packet transit times. VoIP hardware uses Jitter Buffers to smooth out variations and ensure consistent audio playback.",
    "hint": "Variation in packet arrival delay."
  },
  {
    "id": 9,
    "question": "What is an 'Audio Codec' (such as G.711 or G.729) in VoIP systems?",
    "options": [
      "A software algorithm or hardware module that COmpresses and DECodes analog voice signals into digital bitstreams.",
      "A type of microphone cable.",
      "A password used to unlock voice mail.",
      "An operating system for telephones."
    ],
    "correctAnswer": 0,
    "explanation": "A Codec (Coder-Decoder) converts analog audio waveforms into digital binary representations and compresses them to conserve network bandwidth.",
    "hint": "Coder-Decoder."
  },
  {
    "id": 10,
    "question": "What is an ATA (Analog Telephone Adapter) in VoIP?",
    "options": [
      "A hardware device that converts standard analog telephone signals into digital VoIP packets so legacy phones can connect to the Internet.",
      "An antenna that catches FM radio stations.",
      "A printer cable.",
      "A backup battery for routers."
    ],
    "correctAnswer": 0,
    "explanation": "An ATA bridges traditional analog landline telephones to VoIP networks by performing analog-to-digital conversion.",
    "hint": "Adapts traditional phones to IP networks."
  },
  {
    "id": 11,
    "question": "Which of the following is a common consumer example of VoIP technology in daily use?",
    "options": [
      "WhatsApp Voice Calling",
      "Skype",
      "Zoom Audio",
      "All of the above"
    ],
    "correctAnswer": 3,
    "explanation": "WhatsApp calling, Skype, Zoom, Google Meet, and Microsoft Teams all utilize VoIP technology to transmit voice over data networks.",
    "hint": "All modern internet voice call apps use VoIP."
  },
  {
    "id": 12,
    "question": "What is 'Latency' (or delay) in a VoIP conversation, and what is the maximum recommended one-way latency for toll-quality speech?",
    "options": [
      "The time taken for voice data to travel from sender to receiver; recommended to remain below 150 milliseconds.",
      "The time taken to reboot the computer; 10 minutes.",
      "The battery life of the phone; 24 hours.",
      "The duration of the phone call; 1 hour."
    ],
    "correctAnswer": 0,
    "explanation": "ITU-T recommendations state that one-way network latency should be under 150 ms to prevent perceptible conversational lag and talk-over effects.",
    "hint": "Under 150 ms one-way latency."
  },
  {
    "id": 13,
    "question": "What is 'Packet Loss' in VoIP, and how does it manifest to the listener?",
    "options": [
      "Packets dropped during network congestion, resulting in missing words, robotic clipping, or brief silences in the audio stream.",
      "An increase in audio volume.",
      "The phone ringing unexpectedly.",
      "The screen turning completely green."
    ],
    "correctAnswer": 0,
    "explanation": "When buffer queues overflow, routers drop UDP voice packets, causing audible audio artifacts, chopped syllables, or robotic distortion.",
    "hint": "Missing audio packets cause clipping and robotic voice."
  },
  {
    "id": 14,
    "question": "What Quality of Service (QoS) mechanism is configured on routers to prioritize VoIP traffic over bulk file downloads?",
    "options": [
      "Traffic Shaping and Priority Queuing that gives real-time voice packets precedence over background TCP traffic.",
      "Deleting all incoming emails.",
      "Shutting down the Wi-Fi router every 10 minutes.",
      "Disconnecting all printer cables."
    ],
    "correctAnswer": 0,
    "explanation": "QoS tags voice packets with high priority (using DSCP/DiffServ bits) so routers forward them ahead of non-urgent traffic like downloads.",
    "hint": "Quality of Service (QoS) priority queuing."
  },
  {
    "id": 15,
    "question": "What is an 'IP Phone' (or VoIP Phone)?",
    "options": [
      "A dedicated telephone that connects directly to an Ethernet port or Wi-Fi network with built-in VoIP codecs, without requiring a computer.",
      "An iPhone manufactured exclusively in 2007.",
      "A phone that only calls emergency numbers.",
      "A walkie-talkie used on ships."
    ],
    "correctAnswer": 0,
    "explanation": "An IP Phone has integrated Ethernet/Wi-Fi interfaces and hardware codecs to make VoIP calls natively over IP networks.",
    "hint": "Dedicated phone with built-in Ethernet/Wi-Fi."
  },
  {
    "id": 16,
    "question": "What is a 'Softphone' in VoIP?",
    "options": [
      "A software program installed on a PC, smartphone, or tablet that enables VoIP voice calling using the device's microphone and speakers.",
      "A telephone encased in foam rubber.",
      "A broken telephone.",
      "A microphone with low volume."
    ],
    "correctAnswer": 0,
    "explanation": "A softphone is a software application (e.g., Zoiper, Skype, WhatsApp) that emulates a telephone interface on a general-purpose computer or phone.",
    "hint": "Software application acting as a telephone."
  },
  {
    "id": 17,
    "question": "What is a major limitation or vulnerability of VoIP during a local electrical power outage?",
    "options": [
      "Unlike traditional copper PSTN phones powered by central office battery banks, VoIP hardware (modems, routers, IP phones) shuts down unless backed up by UPS systems.",
      "VoIP phones catch fire during power cuts.",
      "VoIP permanently deletes all saved contacts.",
      "The telephone number is revoked by the government."
    ],
    "correctAnswer": 0,
    "explanation": "PSTN landlines draw low-voltage power directly through telephone exchange copper lines; VoIP depends entirely on local routers and mains power.",
    "hint": "Requires local electrical power for modems/routers."
  },
  {
    "id": 18,
    "question": "What challenge does VoIP face regarding Emergency Services (e.g., 911 / 112 dialing)?",
    "options": [
      "Because VoIP endpoints are mobile and IP addresses do not inherently correlate to fixed physical street addresses, emergency dispatchers cannot automatically locate the caller.",
      "VoIP phones cannot transmit the digits 9, 1, or 2.",
      "Emergency operators refuse to answer digital calls.",
      "Emergency calls cost 10,000 rupees per minute."
    ],
    "correctAnswer": 0,
    "explanation": "IP mobility means a user could be anywhere in the world; Enhanced 911 (E911) protocols require manual registration of physical addresses.",
    "hint": "Dynamic IP addresses lack fixed physical street locations."
  },
  {
    "id": 19,
    "question": "Which of the following protocols is responsible for monitoring transmission statistics and QoS parameters in RTP VoIP media streams?",
    "options": [
      "RTCP (RTP Control Protocol)",
      "SNMP",
      "DNS",
      "DHCP"
    ],
    "correctAnswer": 0,
    "explanation": "RTCP periodically exchanges control packets reporting packet count, lost packets, and jitter to optimize stream quality.",
    "hint": "RTP Control Protocol."
  },
  {
    "id": 20,
    "question": "How does Bandwidth Efficiency compare between a traditional PSTN circuit-switched phone call and a VoIP call?",
    "options": [
      "VoIP is vastly more efficient because it uses packet switching and silence suppression, freeing bandwidth during conversational pauses, whereas PSTN reserves a dedicated 64 kbps circuit continuously.",
      "PSTN is 100 times faster than fiber optic.",
      "VoIP wastes 99% of network bandwidth.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "PSTN dedicates a full 64 kbps channel regardless of speech or silence. VoIP packetizes voice and skips silence, maximizing shared bandwidth.",
    "hint": "Silence suppression and shared packet switching."
  },
  {
    "id": 21,
    "question": "What is 'VAD' (Voice Activity Detection) in VoIP technology?",
    "options": [
      "A software feature that detects when a speaker is silent and temporarily pauses packet transmission to conserve bandwidth.",
      "A tool to verify the user's age.",
      "A volume booster for loud music.",
      "A voice-changing filter."
    ],
    "correctAnswer": 0,
    "explanation": "Voice Activity Detection (silence suppression) ceases packet generation during natural conversational pauses, reducing bandwidth consumption by up to 50%.",
    "hint": "Suppresses transmission during silence."
  },
  {
    "id": 22,
    "question": "Which port does SIP typically listen on for unencrypted call signaling?",
    "options": [
      "UDP/TCP Port 5060",
      "TCP Port 80",
      "TCP Port 25",
      "UDP Port 53"
    ],
    "correctAnswer": 0,
    "explanation": "SIP standard listening port is UDP/TCP Port 5060 (and Port 5061 for encrypted TLS-SIP).",
    "hint": "Port 5060."
  },
  {
    "id": 23,
    "question": "In a CBSE 1-mark question: 'Define VoIP and state one key advantage of using it.' What is the ideal answer?",
    "options": [
      "VoIP (Voice over IP) enables voice calls over data networks; key advantage is significant reduction in communication costs compared to traditional telephone networks.",
      "VoIP is an antivirus software that speeds up downloads.",
      "VoIP is a video card that improves gaming graphics.",
      "VoIP is a fiber optic cable connector."
    ],
    "correctAnswer": 0,
    "explanation": "A complete answer defines Voice over Internet Protocol and highlights cost efficiency or multimedia integration.",
    "hint": "Voice over IP for low-cost digital voice communication."
  },
  {
    "id": 24,
    "question": "Can VoIP operate seamlessly over wireless transmission media such as Wi-Fi and 4G/5G mobile cellular networks?",
    "options": [
      "Yes, VoIP is transmission-medium agnostic; it can transmit over wired Ethernet, Wi-Fi (VoWiFi), and cellular LTE/5G (VoLTE).",
      "No, VoIP only works over coaxial copper cables.",
      "No, Wi-Fi signals cannot carry sound.",
      "Only on landline phones."
    ],
    "correctAnswer": 0,
    "explanation": "VoIP runs on any standard IP network, powering technologies like VoLTE (Voice over LTE) and VoWiFi.",
    "hint": "Transmission-medium agnostic: works over Wi-Fi, Ethernet, and 4G/5G."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination case study, an international consulting firm with branches in Delhi, New York, and Tokyo wants to conduct daily interactive voice team meetings with zero long-distance telephone call charges. Which technology should you recommend?",
    "options": [
      "VoIP (Voice over Internet Protocol)",
      "Traditional analog PSTN dial-up landlines",
      "Shortwave telegraphy",
      "Coaxial cable TV broadcasting"
    ],
    "correctAnswer": 0,
    "explanation": "VoIP routes voice calls over the enterprise's existing high-speed broadband network, completely bypassing international PSTN toll charges.",
    "hint": "VoIP technology."
  }
];
