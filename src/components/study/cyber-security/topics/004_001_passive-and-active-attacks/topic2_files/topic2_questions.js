const questions = [
  {
    question: "What is the primary operational difference between Packet Sniffing and Traffic Analysis?",
    shortAnswer: "Packet Sniffing extracts and inspects the actual data payload inside packets, whereas Traffic Analysis examines metadata (packet sizes, timing, burst frequency, and communicating node pairs) when payloads are encrypted.",
    explanation: "Packet Sniffing relies on accessing plaintext payloads (e.g., capturing HTTP credentials or SQL queries with Wireshark). When strong end-to-end encryption (TLS 1.3/IPsec) renders the payload unreadable, Traffic Analysis takes over by statistically analyzing observable transmission patterns, flow durations, packet size sequences, and endpoint IP headers to infer sensitive user behavior.",
    hint: "Sniffing reads the letter inside; Traffic Analysis studies the weight, postmark, and frequency of envelopes.",
    level: "basic",
    codeExample: `// Sniffing vs Traffic Analysis:
// Sniffing (Payload Inspect)  : Payload = "GET /transfer?amt=5000 HTTP/1.1" → Reads ₹5,000 transfer
// Traffic Analysis (Metadata): Size = 1420B, Time = 02:00:01, Freq = 50k pkts/sec → Infers DB backup`
  },
  {
    question: "How does Website Fingerprinting operate over encrypted VPN and Tor connections?",
    shortAnswer: "By analyzing the unique sequence of incoming and outgoing packet sizes and burst timing triggered when a browser downloads a specific webpage's unique HTML, image, and CSS assets.",
    explanation: "Even over an encrypted TLS/Tor tunnel, loading a webpage produces a distinctive waterfall of network requests: e.g., a 1.2KB HTML download, followed by parallel bursts of 45KB images and 12KB scripts. An adversary training machine learning classifiers (k-NN, Random Forest, or Deep Neural Networks) on these packet size sequences can identify which specific website a user is visiting with over 90% accuracy.",
    hint: "Every website has a unique digital silhouette of file sizes that leaks through encrypted tunnels.",
    level: "expert",
    codeExample: `// Website Fingerprint Feature Vector:
// Trace = [+512, +1420, -512, +1420, +1420, -1024, ...] (+ = Outbound, - = Inbound)
// ML Classifier: Model.predict(Trace) → "Result: https://portal.kolkata-fintech.in" (94% confidence)`
  },
  {
    question: "How does Keystroke Timing Analysis extract information from encrypted SSH interactive sessions?",
    shortAnswer: "By measuring the inter-arrival time intervals between single-character encrypted TCP packets, deducing typed letters from natural human typing cadence and keyboard layout geometry.",
    explanation: "In an interactive SSH shell, every single keypress transmits an individual encrypted packet immediately. The time delay between consecutive keystrokes (Δt) reflects the physical distance between fingers on a QWERTY keyboard (e.g., 't' followed by 'h' has a shorter delay than 'p' followed by 'z'). Statistical hidden Markov models analyze these timing gaps to dramatically narrow password search spaces.",
    hint: "The physical distance between keyboard keys creates measurable millisecond time differences in packet transmission.",
    level: "expert",
    codeExample: `// Inter-Arrival Keystroke Time Deltas:
// Packet 1: Time = 10.120s (Keypress 's')
// Packet 2: Time = 10.185s (Keypress 'u', Delta = 65ms → Adjacent key)
// Packet 3: Time = 10.390s (Keypress 'k', Delta = 205ms → Farther key)`
  },
  {
    question: "What is Constant-Bitrate (CBR) Traffic Padding, and how does it neutralize Traffic Flow Analysis?",
    shortAnswer: "It injects pseudo-random dummy encrypted packets whenever genuine data is idle, maintaining a perfectly flat transmission rate so adversaries cannot observe communication bursts.",
    explanation: "If a secure military link between Barrackpore and Kolkata transmits genuine messages intermittently, volume surges leak tactical activity. Traffic padding enforces a continuous constant bitrate (e.g. 100 Mbps). When real traffic is absent, the cryptographic engine transmits encrypted dummy bytes with identical packet lengths and headers, completely flattening traffic profiles.",
    hint: "Keeping the pipeline 100% full of water continuously so no one can tell when a bucket of milk is poured in.",
    level: "expert",
    codeExample: `// Constant-Rate Dummy Packet Injection Logic:
def secure_transmit(real_packet_queue, link_rate=10000000):
    while True:
        if not real_packet_queue.empty():
            send(encrypt(real_packet_queue.pop()))
        else:
            send(encrypt(generate_dummy_noise_packet(1420))) # Padding
        time.sleep(1 / (link_rate / (1420 * 8)))`
  },
  {
    question: "How does Variable Bitrate (VBR) speech compression create a passive traffic analysis vulnerability in encrypted VoIP calls?",
    shortAnswer: "VBR audio codecs produce larger packet sizes for complex speech phonemes and smaller packets for silence/simple sounds, leaking spoken words through encrypted streams.",
    explanation: "Codecs like Opus or Speex reduce bandwidth by encoding complex spoken phonemes (e.g. 'sh', 'ch', vowels) with larger bitframes and quiet pauses with tiny frames. Because encryption (SRTP) only obscures payload contents without altering packet lengths, an adversary analyzing packet size sequences over time can identify spoken language, phrases, or medical diagnoses in telemedicine sessions.",
    hint: "Speaking louder and using complex words produces bigger packet sizes even inside encrypted calls.",
    level: "expert",
    codeExample: `// VBR Audio Packet Sequence:
// Phoneme "Aaaa": 180 Bytes | Phoneme "Shhh": 220 Bytes | Silence: 20 Bytes
// Defense: Enforce Constant Bitrate (CBR) Opus audio mode in WebRTC/SIP configs`
  },
  {
    question: "What role does Shannon Entropy play in analyzing encrypted vs unencrypted network traffic?",
    shortAnswer: "It mathematically quantifies the randomness of packet payloads; unencrypted ASCII text has low entropy (~3-4 bits/byte), while strong encryption produces high entropy (~7.9+ bits/byte).",
    explanation: "Shannon Entropy is calculated as H(X) = -sum(P(x) * log2(P(x))). Cleartext payloads (HTTP, JSON, SQL) exhibit structured ASCII byte distributions with entropy around 3.5 to 4.5. Properly encrypted ciphertext (AES-GCM, ChaCha20) exhibits maximum randomness approaching 8.0 bits per byte. Analysts use entropy profiling to detect encrypted malware tunnels or unencrypted data exfiltration.",
    hint: "Entropy measures randomness: low entropy = human readable text; high entropy = strong encryption or compression.",
    level: "moderate",
    codeExample: `// Shannon Entropy Calculation in Python:
import math
from collections import Counter
def calculate_entropy(data_bytes):
    if not data_bytes: return 0
    counts = Counter(data_bytes)
    total = len(data_bytes)
    return -sum((c / total) * math.log2(c / total) for c in counts.values())
# Result: ASCII Text ~ 3.8 bits/byte | AES-256 Ciphertext ~ 7.98 bits/byte`
  },
  {
    question: "How does the Linux `AF_PACKET` socket family enable raw packet sniffing at the Data Link Layer?",
    shortAnswer: "It bypasses the standard TCP/IP transport stack in the kernel, allowing user-space applications to read and write raw Ethernet frames directly from the network driver.",
    explanation: "Standard sockets (`AF_INET`, `SOCK_STREAM`) strip Ethernet, IP, and TCP headers before passing data to applications. Opening an `AF_PACKET` raw socket (`socket(AF_PACKET, SOCK_RAW, htons(ETH_P_ALL))`) instructs the Linux networking subsystem to deliver complete raw frames—including L2 MAC addresses, VLAN tags, and L3/L4 headers—directly to the capture tool.",
    hint: "A direct pipeline to the network card driver that skips the operating system's normal protocol processing.",
    level: "expert",
    codeExample: `// C Raw Socket Sniffer Initialization:
int sock_raw = socket(AF_PACKET, SOCK_RAW, htons(ETH_P_ALL));
if (sock_raw < 0) {
    perror("Socket Error: Requires CAP_NET_RAW / root privileges");
}`
  },
  {
    question: "What is Packet Morphing, and how does it prevent statistical traffic classification?",
    shortAnswer: "It dynamically modifies packet size distributions and inter-arrival timing of one protocol to mimic the statistical profile of a completely different innocuous protocol.",
    explanation: "If a company restricts peer-to-peer or SSH traffic, an adversary applies convex optimization to pad and fragment outgoing packets so their length probability distribution matches benign HTTPS web browsing or video streaming. Traffic inspection engines relying on statistical flow classifiers fail to distinguish the hidden protocol from normal traffic.",
    hint: "Dressing up high-security traffic in the exact statistical clothes of everyday YouTube video streaming.",
    level: "expert",
    codeExample: `// Packet Morphing Transformation:
// Target Profile: HTTPS Web Surfing (Mean Length: 850B, StdDev: 420B)
// Transformation : Pad or fragment secret packets to fit target Gaussian distribution curve`
  },
  {
    question: "How does Tor's 514-Byte Fixed Cell Padding defend against packet size traffic analysis?",
    shortAnswer: "Tor fragments and pads all relayed data into uniform 514-byte cells, ensuring that individual packet sizes reveal zero information about the underlying payload.",
    explanation: "If application data is 100 bytes or 4,000 bytes, Tor splits and pads it into discrete 514-byte cells (comprising a 3-byte header, 1-byte command, 509-byte payload/padding, and 1-byte stream ID). An external observer watching a Tor relay node sees only identical 514-byte frames traversing the wire, completely neutralizing packet-length fingerprinting.",
    hint: "Standardized shipping containers: every box on the truck is exactly the same size, no matter what is inside.",
    level: "moderate",
    codeExample: `// Tor Cell Structure (Fixed 514 Bytes):
// [Circuit ID: 4 Bytes] [Command: 1 Byte] [Payload: 509 Bytes]
// Short messages are zero-padded to reach exactly 514 bytes.`
  },
  {
    question: "What is Poisson Packet Arrival Modeling, and how do traffic analysts identify abnormal automated bot communications?",
    shortAnswer: "Human web browsing follows bursty, heavy-tailed Pareto distributions, whereas automated bots, beaconing malware, and credential stuffers exhibit rigid, deterministic periodic intervals.",
    explanation: "Human users click links, read text, and pause randomly, producing heavy-tailed inter-arrival times. Malware C2 beacons and automated scrapers typically emit requests at fixed time intervals (e.g. exactly every 60.0 seconds) or with narrow jitter. Spectral and autocorrelation analysis of inter-arrival timestamps (IAT) instantly isolates automated bot traffic from human activity.",
    hint: "Humans are unpredictable; robots click at exact mathematical intervals.",
    level: "expert",
    codeExample: `// Autocorrelation Analysis of Inter-Arrival Times (IAT):
// Human Traffic: IAT variance is high (e.g. 2.1s, 14.5s, 0.4s, 45.0s) → Low periodicity
// Bot C2 Beacon: IAT = 60.0s ± 0.2s → Sharp spectral spike at Frequency = 0.0167 Hz`
  },
  {
    question: "How does TShark enable automated CLI packet sniffing and telemetry extraction in production environments?",
    shortAnswer: "TShark is the command-line equivalent of Wireshark, allowing headless Linux servers to parse, filter, and extract specific protocol fields directly to JSON or CSV.",
    explanation: "In enterprise headless data centers (e.g. in Kolkata), security engineers cannot run GUI Wireshark. TShark extracts specific fields using display filters without user interaction: `tshark -i eth0 -T fields -e ip.src -e ip.dst -e http.request.uri -Y 'http.request.method == \"POST\"'`. This feeds real-time telemetry into SIEM and anomaly detection engines.",
    hint: "The command-line version of Wireshark for automated scripting and server monitoring.",
    level: "moderate",
    codeExample: `# Extract HTTP User-Agents and POST paths via TShark:
tshark -i eth0 -Y "http.request" -T fields -e frame.time -e ip.src -e http.host -e http.request.uri`
  },
  {
    question: "What is Jitter in network packet analysis, and how do attackers add jitter to bypass beaconing detection?",
    shortAnswer: "Jitter is the variance in packet arrival latency; attackers randomize beacon intervals by a percentage (e.g. 60s ± 20%) to blur periodic timing spikes.",
    explanation: "If malware communicates with a C2 server at strict 60-second intervals, basic frequency analysis catches it immediately. Advanced threat actors introduce randomized sleep jitter: `SleepTime = BaseInterval * (1 + random(-jitter, +jitter))`. This spreads packet arrival timestamps across a uniform distribution, making the beacon look more like background noise to basic threshold alarms.",
    hint: "Adding random wiggles to timer intervals so the robot heartbeat looks irregular.",
    level: "expert",
    codeExample: `// Malware Beaconing with 25% Jitter:
import random, time
base_sleep = 60
jitter = 0.25
sleep_duration = base_sleep * (1 + random.uniform(-jitter, jitter)) # Sleeps 45s to 75s randomly`
  },
  {
    question: "How does TLS 1.3 Padding Extension (RFC 8446) mitigate record-length leakage?",
    shortAnswer: "It allows clients and servers to append variable-length zero-byte padding directly inside the encrypted record payload before AEAD encryption, masking real message lengths.",
    explanation: "In TLS 1.2, ciphertext size closely tracked plaintext size, allowing adversaries to distinguish between small JSON error responses and large data payloads. TLS 1.3 includes a native record padding mechanism where arbitrary zero bytes can be added inside the ciphertext envelope, making all server responses appear identical in length (e.g., all padded to 1024 bytes).",
    hint: "Adding stuffing inside the encrypted envelope so all messages look identically thick.",
    level: "expert",
    codeExample: `// TLS 1.3 Record with Padding:
// Plaintext: [Data: "OK"] [RecordType: 23] [Padding: 0x00 0x00 0x00 ... 0x00]
// Ciphertext: Exactly 1024 Bytes (Length reveals nothing about inner content)`
  },
  {
    question: "What is BPF Bytecode compilation, and why is it faster than user-space packet filtering?",
    shortAnswer: "BPF compiles filter rules into native kernel instructions that execute in the driver interrupt context, dropping non-matching packets before allocating user-space socket buffers.",
    explanation: "If 1,000,000 packets/sec arrive on a 10G NIC, copying every packet into user space to check if it's port 443 causes massive context switching and drops 80% of packets. With BPF, the filter is JIT-compiled into kernel bytecode. The network driver executes this filter in the kernel memory buffer, instantly dropping unwanted frames and copying only the 1% matching traffic to user space.",
    hint: "Filtering water at the intake valve before pumping it up to the reservoir.",
    level: "expert",
    codeExample: `# View raw BPF assembly instructions for a filter:
tcpdump -d "tcp and port 80"
# Output:
# (000) ldh [12]
# (001) jeq #0x86dd jt 11 jf 2
# (002) jeq #0x800 jt 3 jf 11 ...`
  },
  {
    question: "How does NetFlow / IPFIX flow monitoring enable passive network surveillance without capturing full packet payloads?",
    shortAnswer: "NetFlow aggregates packets sharing the same 5-tuple into flow statistics (Source IP, Dest IP, Source Port, Dest Port, Protocol, Packet Count, Byte Count, Duration).",
    explanation: "Storing full packet captures (PCAP) for an entire enterprise requires petabytes of disk storage. NetFlow/IPFIX records only statistical summaries of conversations: e.g., Host A talked to Host B on Port 443 for 12 minutes, exchanging 8,400 packets and 11.2 MB. Security teams use NetFlow to map communication topologies, identify data exfiltration, and spot unusual midnight volume spikes.",
    hint: "Keeping a telephone call log (who called whom, when, and for how long) instead of recording the entire voice call.",
    level: "moderate",
    codeExample: `// NetFlow v9 Flow Record Fields:
// IP_SRC_ADDR: 192.168.1.50 | IP_DST_ADDR: 104.21.8.200 | L4_SRC_PORT: 51234
// L4_DST_PORT: 443 | IN_PKTS: 8400 | IN_BYTES: 11,760,000 | FLOW_DURATION: 720s`
  },
  {
    question: "What is Deep Packet Inspection (DPI), and how does it combine packet sniffing with protocol decoding?",
    shortAnswer: "DPI reconstructs application-layer data streams across TCP sessions, parsing protocol semantics (HTTP URLs, SQL queries, TLS SNI headers) beyond simple port/IP matching.",
    explanation: "Basic packet sniffers only inspect L3/L4 headers (IP and Port). DPI engines (e.g. Zeek, Suricata, Palo Alto App-ID) reassemble TCP streams to reconstruct full application payloads, decoding gzip compression, identifying file formats via magic bytes, and scanning for malware signatures.",
    hint: "Not just looking at the envelope, but opening the letter, translating the language, and scanning for contraband.",
    level: "moderate",
    codeExample: `# Zeek (Bro) Script extracting HTTP file downloads:
event file_new(f: fa_file) {
    if (f$source == "HTTP" && f$info$mime_type == "application/x-dosexec") {
        print fmt("Executable downloaded over HTTP from %s", f$info$filename);
    }
}`
  },
  {
    question: "How does Onion Routing (Tor) prevent intermediate relays from conducting traffic correlation attacks?",
    shortAnswer: "By using layered asymmetric encryption where each relay peels off one layer of encryption, learning only the immediate predecessor and successor nodes in the 3-hop circuit.",
    explanation: "When client Mamata connects to a website via Tor, her traffic passes through three nodes: Guard Node, Middle Relay, and Exit Node. The Guard knows Mamata's real IP but does not know the destination website; the Exit node knows the destination website but does not know Mamata's IP. Because each node sees different ciphertext and intermediate hops, a single rogue relay cannot correlate source with destination.",
    hint: "Peeling layers of an onion: each guard only knows who handed them the box and who to hand it to next.",
    level: "expert",
    codeExample: `// Tor Layered Decryption Circuit:
// Client encrypts: E_Guard( E_Middle( E_Exit( Payload ) ) )
// Guard Node  : Decrypts outer layer → Forwards E_Middle( E_Exit( Payload ) ) to Middle Node
// Middle Node : Decrypts middle layer → Forwards E_Exit( Payload ) to Exit Node
// Exit Node   : Decrypts final layer → Dispatches Payload to Destination Server`
  },
  {
    question: "Under the Indian DPDP Act 2023, what are the compliance obligations for organizations regarding network traffic logging and telemetry?",
    shortAnswer: "Organizations must implement reasonable technical safeguards (Section 8) to prevent metadata and payload leaks, anonymize stored telemetry, and maintain audit logs for statutory compliance.",
    explanation: "Under the Digital Personal Data Protection Act 2023, IP addresses, MAC addresses, and browsing telemetry linked to identifiable Indian citizens are classified as personal data. Enterprises logging network flows must enforce encryption at rest for PCAP repositories, redact PII from diagnostic logs, and ensure access is restricted to authorized security personnel to avoid penalties up to ₹250 Crores.",
    hint: "Network logs containing IP addresses and user metadata must be encrypted and protected like customer passwords.",
    level: "moderate",
    codeExample: `// DPDP Log Protection Policy:
// 1. All PCAP and NetFlow logs encrypted with AES-256 at rest
// 2. Strict 90-day automated log retention purge for non-security telemetry
// 3. Mandatory redaction of citizen PII (PAN, Aadhaar, Phone numbers) before log storage`
  },
  {
    question: "What is a Promiscuous Mode Detection Test, and how do security tools remotely detect silent network sniffers?",
    shortAnswer: "By sending crafted broadcast ARP or ICMP packets with a fake unicast MAC address; hosts with NICs in promiscuous mode process the packet and reply, revealing their presence.",
    explanation: "Under normal operation, a NIC ignores an Ethernet frame addressed to `00:00:00:00:00:01`. However, if a sniffer has placed its NIC into promiscuous mode, the hardware filter is off, and the kernel receives the frame. The OS kernel's IP stack recognizes its own IP inside the payload and sends an ARP/ICMP response back, exposing that the host is silently sniffing all subnet traffic.",
    hint: "Sending a trick letter with a fake name to see who opens it anyway because they are reading everyone's mail.",
    level: "expert",
    codeExample: `# Nmap Promiscuous Sniffer Detection Script:
nmap --script sniffer-detect 192.168.1.0/24
# Output:
# 192.168.1.45: Promiscuous mode detected! (Likely running Wireshark/tcpdump)`
  },
  {
    question: "Synthesize an enterprise defense architecture that eliminates both Packet Sniffing and Traffic Analysis across corporate and remote worker networks.",
    shortAnswer: "An integrated framework combining TLS 1.3 with ECH and Record Padding, Zero Trust Network Access (ZTNA), Constant-Rate IPsec ESP Tunnels, and 802.1X Port Security.",
    explanation: "To comprehensively defeat passive observation: 1. Application Layer: Enforce TLS 1.3 with Encrypted Client Hello (ECH) and maximum record padding to conceal payloads and domain names. 2. Transport & Network Layer: Deploy IPsec Tunnel Mode with ESP and Constant-Bitrate (CBR) traffic padding between core branch offices (e.g. Barrackpore to Kolkata). 3. LAN Layer: Enforce 802.1X, Dynamic ARP Inspection, and Private VLANs to stop local promiscuous sniffing. 4. Wireless: Enforce WPA3-Enterprise with OWE.",
    hint: "Layered protection: encrypt payloads, pad message sizes to identical lengths, and inject constant dummy traffic to hide bursts.",
    level: "expert",
    codeExample: `// Anti-Sniffing & Anti-Traffic Analysis Blueprint:
// 1. Local LAN    : IEEE 802.1X + Dynamic ARP Inspection (DAI) + DHCP Snooping
// 2. Wireless LAN : WPA3-Enterprise (802.1X EAP-TLS) + Opportunistic Wireless Encryption (OWE)
// 3. WAN Backbone : IPsec Tunnel Mode (AES-256-GCM) + Constant 50 Mbps Dummy Traffic Padding
// 4. Web Traffic  : TLS 1.3 AEAD + Encrypted Client Hello (ECH) + DNS over HTTPS (DoH)`
  },
  {
    question: "How does Dynamic Time Warping (DTW) distance assist adversaries in matching website traffic fingerprints?",
    shortAnswer: "DTW measures similarity between two temporal packet size sequences that may vary in speed or network latency, aligning packet bursts non-linearly.",
    explanation: "Because internet jitter and network delays stretch or compress transmission timelines, a simple point-by-point comparison of packet traces fails. Dynamic Time Warping (DTW) calculates the optimal non-linear alignment between a captured packet sequence and pre-recorded website template profiles, allowing high-accuracy fingerprint identification despite fluctuating latencies.",
    hint: "Matching two audio recordings of the same song sung at slightly different speeds.",
    level: "expert",
    codeExample: `// DTW Distance Matrix:
// D(i, j) = |Trace1[i] - Trace2[j]| + min(D(i-1, j), D(i, j-1), D(i-1, j-1))
// If DTW_Distance(CapturedTrace, "kolkata_bank_login") < Threshold → Match Confirmed!`
  },
  {
    question: "What is an Obfuscated Transport (e.g. obfs4 / Shadowsocks), and how does it defeat DPI traffic classification?",
    shortAnswer: "It strips protocol handshakes and scrambles packet lengths using dynamic padding and Diffie-Hellman ephemeral handshakes, making traffic look like completely uniform random noise.",
    explanation: "Deep Packet Inspection firewalls classify TLS or SSH based on recognizable initial handshake byte structures (e.g. TLS ClientHello headers). Pluggable transports like `obfs4` wrap the data stream in an elliptic-curve key exchange (x25519) and add pseudo-random byte padding, eliminating all fixed magic bytes and statistical packet length markers so DPI engines cannot classify the protocol.",
    hint: "Removing all labels, stamps, and barcodes from a package so it looks like an unmarked gray cube.",
    level: "expert",
    codeExample: `// obfs4 Bridge Transformation:
// Standard TLS:  [0x16 0x03 0x03 (TLS Handshake)] [Length] [ClientHello]
// obfs4 Encoded: [Random 32-Byte Public Key] [Encrypted Random Length Padding] [Noise]`
  },
  {
    question: "How do Flow Watermarking techniques allow passive adversaries to correlate encrypted traffic entering and exiting a proxy?",
    shortAnswer: "The adversary deliberately introduces subtle artificial timing delays or packet drops into an ingress flow and monitors for identical timing markers appearing on the egress flow.",
    explanation: "If an adversary controls a network link outside client Mamata in Barrackpore and also monitors the destination server in Kolkata, they can inject an intentional micro-delay (e.g. holding packet #50 for 25ms). If the encrypted stream leaving the VPN/Tor exit node displays this exact 25ms delay at packet #50, the adversary confirms both ends belong to the same connection, defeating anonymity.",
    hint: "Stamping an invisible watermark in the timing rhythm of packets entering a tunnel to spot them leaving the tunnel.",
    level: "expert",
    codeExample: `// Flow Watermark Modulation:
// Ingress Stream: Delay Packet #10 by +30ms, Packet #20 by +50ms (Bit pattern '101')
// Egress Stream : Detect +30ms at #10 and +50ms at #20 → Connection linked with 99.9% certainty!`
  },
  {
    question: "What is the difference between Layer 3 NetFlow sampling and Full PCAP Capture in forensic traffic analysis?",
    shortAnswer: "NetFlow records high-level 5-tuple statistical summaries with low storage overhead (~1% of traffic volume), whereas Full PCAP captures 100% of raw packet bytes requiring massive storage.",
    explanation: "In a 40 Gbps Kolkata data center, Full PCAP capture generates ~432 Terabytes of raw data per day. NetFlow v9/IPFIX samples 1 in 1,000 packets to compile flow summaries (IPs, Ports, Byte Counts), requiring only ~20 GB per day. NetFlow provides long-term trend analysis, while Full PCAP is required for deep protocol decoding and cryptographic verification.",
    hint: "Bank ledger summary (NetFlow) versus recording every dollar bill serial number (PCAP).",
    level: "moderate",
    codeExample: `// Storage Comparison (40 Gbps Link for 30 Days):
// Full PCAP Capture   : ~12.9 Petabytes (Massive SAN required)
// Sampled NetFlow (1:1k): ~600 Gigabytes (Easily searchable in Elasticsearch/ClickHouse)`
  },
  {
    question: "How does the Spanning Tree Protocol (STP) prevent Layer 2 broadcast storms from crashing sniffing sensors?",
    shortAnswer: "STP disables redundant bridge links to create a loop-free logical topology, preventing broadcast ARP frames from circulating infinitely and saturating capture buffers.",
    explanation: "In an enterprise switched LAN with redundant links, an unmanaged loop causes broadcast frames (e.g. ARP requests) to replicate exponentially, consuming 100% of bandwidth within seconds (Broadcast Storm). STP (IEEE 802.1D/802.1w) elects a Root Bridge and places redundant ports in a 'blocking' state, ensuring capture sensors receive single copies of frames without buffer overflows.",
    hint: "Turning off redundant looped doors so sound doesn't echo infinitely and cause a deafening feedback loop.",
    level: "moderate",
    codeExample: `// Cisco Rapid-PVST+ Configuration:
switch(config)# spanning-tree mode rapid-pvst
switch(config-if)# spanning-tree portfast
switch(config-if)# spanning-tree bpduguard enable`
  },
  {
    question: "What is BGP FlowSpec (RFC 5575), and how is it used to redirect suspicious traffic flows dynamically?",
    shortAnswer: "BGP FlowSpec allows border routers to propagate fine-grained packet matching rules (source IP, port, packet length) to drop or redirect malicious flows at line rate.",
    explanation: "When traffic analysis detects an anomalous volumetric surge or reconnaissance scan, security engineers use BGP FlowSpec to inject flow routes across all edge routers. The routers can match on specific packet lengths or TCP flags and redirect suspicious flows to an isolated scrubbing center or capture tap without impacting benign customer traffic.",
    hint: "Using global routing protocols to send a specific suspicious traffic stream to a quarantine lane.",
    level: "expert",
    codeExample: `// BGP FlowSpec Rule Announcement:
flowspec {
    match {
        destination 203.0.113.10/32;
        protocol tcp;
        destination-port 443;
        packet-length 1420;
    }
    then {
        redirect 65000:9999; // Route to deep traffic analysis cluster
    }
}`
  },
  {
    question: "How does an adversary utilize Inter-Packet Arrival Time (IAT) to identify video streaming resolution over encrypted TLS?",
    shortAnswer: "Video codecs download video chunks in periodic burst cycles (every 2-5 seconds); the volume of bytes per chunk directly reveals whether the video is 480p, 1080p, or 4K.",
    explanation: "Dynamic Adaptive Streaming over HTTP (DASH/HLS) requests discrete video segments. A 4K video segment requires a 25 MB download burst, while a 720p segment requires only 3 MB. Even though the video stream is encrypted with TLS 1.3, observing the periodic byte volume every 2 seconds allows an observer to determine the exact screen resolution and even match the video title against public streaming catalogs.",
    hint: "Bigger bursts every two seconds mean higher resolution video, even through encrypted tunnels.",
    level: "expert",
    codeExample: `// Video Streaming Burst Signature:
// 720p Stream:  Burst of ~2.5 MB every 4.0 seconds (Average Bitrate = 5 Mbps)
// 4K UHD Stream: Burst of ~18.0 MB every 4.0 seconds (Average Bitrate = 36 Mbps)`
  },
  {
    question: "What is TCP Window Scale Option (RFC 7323), and how do traffic analysts inspect it to determine OS fingerprints?",
    shortAnswer: "It is a TCP handshake parameter that scales the receive window beyond 64KB; different operating systems initialize window size and scale factors with unique default values.",
    explanation: "During the initial TCP SYN packet, operating systems advertise different default window sizes and scaling factors: e.g., Windows 11 uses `Window = 64240, Scale = 8`, Linux kernels use `Window = 29200, Scale = 7`, and iOS uses `Window = 65535, Scale = 6`. Passive OS fingerprinting tools (p0f) inspect these unencrypted SYN header values to determine the victim's exact operating system without active probing.",
    hint: "Every operating system writes its initial connection greeting with a slightly different default handwriting style.",
    level: "moderate",
    codeExample: `# Passive OS Fingerprinting with p0f:
sudo p0f -i eth0 -s /var/log/p0f.sock
# Output:
# 192.168.1.100:51422 → Linux 5.x (Ubuntu 22.04) [MTU: 1500, Window: 29200, Scale: 7]`
  },
  {
    question: "How does the Indian Computer Emergency Response Team (CERT-In) mandate traffic telemetry synchronization across organizations?",
    shortAnswer: "CERT-In mandates that all organizations in India must synchronize ICT system clocks with Indian Standard Time (IST) via National Physical Laboratory (NPL) or NIC NTP servers.",
    explanation: "Accurate traffic correlation and forensic analysis require microsecond-accurate timestamps across firewalls, routers, and switches. Under CERT-In directives (April 2022), all Indian enterprises must synchronize their system clocks with the Primary Reference Time Clock (PRTC) of NPL India or NIC servers to ensure all traffic logs match the national standard for legal and forensic readiness.",
    hint: "All computer clocks in India must synchronize with the official atomic clock in New Delhi.",
    level: "moderate",
    codeExample: `// Cisco NTP Configuration with NPL India / NIC Server:
ntp server samay1.nic.in prefer
ntp server samay2.nic.in
ntp update-calendar
clock timezone IST 5 30`
  },
  {
    question: "Synthesize the mathematical relationship between Link Capacity, Traffic Padding Overhead, and Shannon Channel Capacity in Anti-Traffic Analysis engineering.",
    shortAnswer: "Traffic padding increases bandwidth overhead to C_pad = max(R_burst), reducing effective channel utilization to eta = R_avg / max(R_burst) while reducing entropy leakage to zero.",
    explanation: "To achieve zero metadata leakage (H(Traffic | Observation) = 0), a network must transmit at a constant maximum burst capacity $C = \\max(R(t))$. If peak burst rate is 100 Mbps but average real data rate is only 5 Mbps, the traffic padding efficiency is $\\eta = 5 / 100 = 5\\%$, incurring a 95% bandwidth tax. Engineers balance this trade-off using adaptive padding windows and multi-queue priority token bucket shapers.",
    hint: "Zero information leakage requires paying for maximum bandwidth 100% of the time.",
    level: "expert",
    codeExample: `// Anti-Traffic Analysis Bandwidth Efficiency Equation:
// Efficiency = (Real Data Volume) / (Total Transmitted Volume with Constant Padding)
// Trade-off  : Maximum Privacy (0% Leakage) = 95% Bandwidth Overhead Tax`
  }
];

export default questions;
