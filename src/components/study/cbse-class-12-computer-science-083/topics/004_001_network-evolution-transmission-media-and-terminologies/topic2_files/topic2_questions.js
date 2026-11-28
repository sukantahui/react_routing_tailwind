// 25 Authentic CBSE Board Examination Questions for Topic 2
const questions = [
  {
    "id": 1,
    "question": "What is the unit of analog bandwidth in telecommunications?",
    "options": [
      "Bits per second (bps)",
      "Hertz (Hz)",
      "Bytes per second (Bps)",
      "Decibels (dB)"
    ],
    "correctAnswer": 1,
    "explanation": "Analog bandwidth is the difference between limiting frequencies, measured in Hertz (Hz).",
    "hint": "Hertz (Hz)."
  },
  {
    "id": 2,
    "question": "What is the formula for calculating analog bandwidth of a channel operating between f_min and f_max?",
    "options": [
      "Bandwidth = f_max + f_min",
      "Bandwidth = f_max - f_min",
      "Bandwidth = f_max * f_min",
      "Bandwidth = f_max / f_min"
    ],
    "correctAnswer": 1,
    "explanation": "Bandwidth is defined as the width of the frequency range: f_max - f_min.",
    "hint": "f_max - f_min."
  },
  {
    "id": 3,
    "question": "A telephone voice channel operates between 300 Hz and 3400 Hz. What is its analog bandwidth?",
    "options": [
      "3700 Hz",
      "3100 Hz (3.1 KHz)",
      "3400 Hz",
      "300 Hz"
    ],
    "correctAnswer": 1,
    "explanation": "Bandwidth = 3400 Hz - 300 Hz = 3100 Hz = 3.1 KHz.",
    "hint": "3100 Hz."
  },
  {
    "id": 4,
    "question": "In digital networking, how is bandwidth commonly defined and measured?",
    "options": [
      "In kilograms",
      "The maximum data-carrying rate of a channel, measured in bits per second (bps)",
      "The length of the network cable in meters",
      "The CPU clock speed"
    ],
    "correctAnswer": 1,
    "explanation": "Digital bandwidth refers to maximum information-carrying capacity measured in bps.",
    "hint": "Bits per second (bps)."
  },
  {
    "id": 5,
    "question": "What is the difference between a lowercase 'b' and an uppercase 'B' in networking metrics?",
    "options": [
      "'b' stands for bit; 'B' stands for Byte (8 bits)",
      "'b' stands for Byte; 'B' stands for bit",
      "There is no difference",
      "'B' stands for broadband"
    ],
    "correctAnswer": 0,
    "explanation": "Lowercase 'b' is a bit (0 or 1); uppercase 'B' is a Byte (8 bits).",
    "hint": "'b' = bit, 'B' = Byte."
  },
  {
    "id": 6,
    "question": "How many bits are there in 1 Byte?",
    "options": [
      "2 bits",
      "4 bits",
      "8 bits",
      "16 bits"
    ],
    "correctAnswer": 2,
    "explanation": "1 Byte = 8 bits.",
    "hint": "8 bits."
  },
  {
    "id": 7,
    "question": "How many bits per second are represented by 1 Mbps in decimal metric notation?",
    "options": [
      "1,000 bps",
      "1,000,000 bps (10^6 bps)",
      "1,000,000,000 bps",
      "8,000,000 bps"
    ],
    "correctAnswer": 1,
    "explanation": "Mega = 10^6, so 1 Mbps = 1,000,000 bits per second.",
    "hint": "1,000,000 bps (10^6 bps)."
  },
  {
    "id": 8,
    "question": "How many bits per second are represented by 1 Gbps?",
    "options": [
      "10^3 bps",
      "10^6 bps",
      "10^9 bps (1,000,000,000 bps)",
      "10^12 bps"
    ],
    "correctAnswer": 2,
    "explanation": "Giga = 10^9, so 1 Gbps = 10^9 bps.",
    "hint": "10^9 bps."
  },
  {
    "id": 9,
    "question": "How long will it take to transfer a file of size 10 MB over an 8 Mbps communication channel?",
    "options": [
      "1.25 seconds",
      "10 seconds",
      "80 seconds",
      "8 seconds"
    ],
    "correctAnswer": 1,
    "explanation": "Total bits = 10 MB * 8 = 80 Mbits. Transmission time = 80 Mbits / 8 Mbps = 10 seconds.",
    "hint": "10 seconds."
  },
  {
    "id": 10,
    "question": "How long will it take to transmit an image of size 4 Megabytes over a 32 Mbps network link?",
    "options": [
      "1 second",
      "4 seconds",
      "8 seconds",
      "0.5 seconds"
    ],
    "correctAnswer": 0,
    "explanation": "Total bits = 4 * 8 = 32 Mbits. Time = 32 Mbits / 32 Mbps = 1.0 second.",
    "hint": "1 second."
  },
  {
    "id": 11,
    "question": "What is the difference between Bandwidth and Throughput?",
    "options": [
      "Bandwidth is theoretical maximum capacity; Throughput is the actual realized transfer speed achieved in practice",
      "They are identical",
      "Throughput is analog, Bandwidth is digital",
      "Throughput is measured in meters"
    ],
    "correctAnswer": 0,
    "explanation": "Bandwidth is the maximum theoretical channel capacity; throughput is actual data rate delivered across network overhead.",
    "hint": "Theoretical maximum vs actual realized speed."
  },
  {
    "id": 12,
    "question": "What does the term 'Latency' represent in data communications?",
    "options": [
      "The time delay taken for a data packet to travel from source to destination across the network",
      "The physical width of a cable",
      "The cost of an ISP subscription",
      "The height of an antenna"
    ],
    "correctAnswer": 0,
    "explanation": "Latency is the propagation and processing delay from sender to receiver.",
    "hint": "Time delay taken for packet transit."
  },
  {
    "id": 13,
    "question": "What is Round Trip Time (RTT)?",
    "options": [
      "The time taken for a data packet to go from source to destination and for the acknowledgement to return",
      "The time to boot a computer",
      "The speed of light in vacuum",
      "The length of a circle"
    ],
    "correctAnswer": 0,
    "explanation": "RTT is the total elapsed time for a packet to travel to destination plus return journey of ACK.",
    "hint": "Transit time to destination + return of ACK."
  },
  {
    "id": 14,
    "question": "How many bits are in a 512-byte packet?",
    "options": [
      "512 bits",
      "2048 bits",
      "4096 bits",
      "1024 bits"
    ],
    "correctAnswer": 2,
    "explanation": "512 Bytes * 8 bits/Byte = 4096 bits.",
    "hint": "4096 bits."
  },
  {
    "id": 15,
    "question": "What is 1 Tbps in bits per second?",
    "options": [
      "10^6 bps",
      "10^9 bps",
      "10^12 bps (one trillion bits per second)",
      "10^15 bps"
    ],
    "correctAnswer": 2,
    "explanation": "Tera = 10^12, so 1 Tbps = 10^12 bits per second.",
    "hint": "10^12 bps."
  },
  {
    "id": 16,
    "question": "If an internet connection is advertised as '100 Mbps', what is the theoretical maximum download speed in Megabytes per second (MB/s)?",
    "options": [
      "100 MB/s",
      "12.5 MB/s (100 / 8)",
      "800 MB/s",
      "50 MB/s"
    ],
    "correctAnswer": 1,
    "explanation": "100 Mbps / 8 bits per Byte = 12.5 Megabytes per second.",
    "hint": "12.5 MB/s."
  },
  {
    "id": 17,
    "question": "Which of the following data rates is the highest?",
    "options": [
      "100 Mbps",
      "1 Gbps",
      "10,000 Kbps",
      "500 Mbps"
    ],
    "correctAnswer": 1,
    "explanation": "1 Gbps = 1,000 Mbps, which is higher than 500 Mbps, 100 Mbps, or 10 Mbps (10,000 Kbps).",
    "hint": "1 Gbps."
  },
  {
    "id": 18,
    "question": "Which theorem relates the maximum theoretical channel capacity to bandwidth and signal-to-noise ratio?",
    "options": [
      "Shannon-Hartley Theorem",
      "Pythagoras Theorem",
      "De Morgan's Law",
      "Newton's Second Law"
    ],
    "correctAnswer": 0,
    "explanation": "The Shannon-Hartley theorem calculates theoretical channel capacity: C = B * log2(1 + S/N).",
    "hint": "Shannon-Hartley Theorem."
  },
  {
    "id": 19,
    "question": "What causes actual network throughput to be lower than advertised channel bandwidth?",
    "options": [
      "Protocol header overhead, packet retransmissions, network congestion, and contention",
      "Computers being painted black",
      "Too many vowels in data",
      "Having too much RAM"
    ],
    "correctAnswer": 0,
    "explanation": "Headers, acknowledgements, collisions, and congestion consume bandwidth, reducing payload throughput.",
    "hint": "Protocol headers, congestion & collisions."
  },
  {
    "id": 20,
    "question": "What unit is typically used to measure the clock frequency of modern computer processors vs network bandwidth?",
    "options": [
      "Processors in GHz; Digital network bandwidth in bps / Mbps",
      "Both in meters",
      "Processors in bps; networks in GHz",
      "Both in kilograms"
    ],
    "correctAnswer": 0,
    "explanation": "CPUs are clocked in GHz (cycles per second); network bandwidth is measured in bps (bits per second).",
    "hint": "CPU in GHz, network bandwidth in bps."
  },
  {
    "id": 21,
    "question": "Consider: file size = 50 MB, network speed = 50 Mbps. What is the transfer time?",
    "options": [
      "1 second",
      "8 seconds",
      "50 seconds",
      "400 seconds"
    ],
    "correctAnswer": 1,
    "explanation": "Bits = 50 * 8 = 400 Mbits. Time = 400 Mbits / 50 Mbps = 8 seconds.",
    "hint": "8 seconds."
  },
  {
    "id": 22,
    "question": "What is 'Broadband' defined as in modern telecommunications?",
    "options": [
      "A dial-up modem",
      "High-capacity high-speed transmission technology capable of delivering wide bandwidth over multiple frequencies simultaneously",
      "A type of radio",
      "A slow serial port"
    ],
    "correctAnswer": 1,
    "explanation": "Broadband refers to high-speed wide-bandwidth data transmission over multiple channels.",
    "hint": "High-speed wide-bandwidth data transmission."
  },
  {
    "id": 23,
    "question": "What is 'Baseband' transmission?",
    "options": [
      "Transmitting digital signals directly over the cable without carrier frequency modulation, using the entire channel bandwidth",
      "Satellite transmission only",
      "Audio transmission only",
      "Radio broadcasting"
    ],
    "correctAnswer": 0,
    "explanation": "Baseband transmits raw digital pulses directly across the entire single-channel bandwidth.",
    "hint": "Direct digital pulse transmission."
  },
  {
    "id": 24,
    "question": "In CBSE board examination questions, what is the most common student error in transmission time numericals?",
    "options": [
      "Forgetting to multiply file size in Megabytes by 8 to convert to Megabits!",
      "Dividing by zero",
      "Writing units in Celsius",
      "Using a calculator"
    ],
    "correctAnswer": 0,
    "explanation": "Students frequently divide Megabytes directly by Megabits per second, forgetting the factor of 8.",
    "hint": "Forgetting to multiply by 8."
  },
  {
    "id": 25,
    "question": "How many bits are transmitted in 10 seconds over a 100 kbps link?",
    "options": [
      "1,000,000 bits (1 Mb)",
      "10,000 bits",
      "100,000 bits",
      "8,000 bits"
    ],
    "correctAnswer": 0,
    "explanation": "100,000 bps * 10 seconds = 1,000,000 bits = 1 Mbit.",
    "hint": "1,000,000 bits."
  }
];

export default questions;
