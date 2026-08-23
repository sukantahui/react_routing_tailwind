const questions = [
  {
    id: 1,
    question: "What is the primary functional difference between the Authentication Header (AH) and Encapsulating Security Payload (ESP) protocols in IPsec?",
    shortAnswer: "AH (Protocol 51) provides connectionless data integrity, data origin authentication, and anti-replay protection WITHOUT encryption (payload remains in cleartext); ESP (Protocol 50) provides confidentiality (encryption) in addition to integrity, authentication, and anti-replay services.",
    explanation: "AH was originally designed for scenarios where encryption was legally restricted or unneeded, but packet integrity was paramount. ESP provides full cryptographic encryption to keep data confidential on public transit links.",
    hint: "AH authenticates only (no encryption); ESP encrypts and authenticates.",
    level: "Basic",
    codeExample: `// Security Services Comparison:
// Service                       AH (Proto 51)   ESP (Proto 50)
// Data Confidentiality          ❌ NO           ✔ YES (Encrypted)
// Data Integrity & Origin Auth  ✔ YES           ✔ YES
// Anti-Replay Protection        ✔ YES           ✔ YES
// Outer IP Header Auth          ✔ YES           ❌ NO (Allows NAT-T)`
  },
  {
    id: 2,
    question: "What IANA IP protocol numbers are assigned to AH and ESP in IPv4 and IPv6 packet headers?",
    shortAnswer: "AH is assigned IP Protocol Number 51; ESP is assigned IP Protocol Number 50.",
    explanation: "When firewalls, routers, and intrusion detection systems inspect IP headers, the Protocol field (IPv4) or Next Header field (IPv6) contains value 50 for ESP and 51 for AH.",
    hint: "ESP is 50; AH is 51.",
    level: "Basic",
    codeExample: `// IPv4 Header 'Protocol' Field (Byte 9):
// Value 50 ➔ ESP (Encapsulating Security Payload)
// Value 51 ➔ AH  (Authentication Header)
// Value 6  ➔ TCP
// Value 17 ➔ UDP`
  },
  {
    id: 3,
    question: "What portion of the IP packet is protected by the Authentication Header (AH) Integrity Check Value (ICV)?",
    shortAnswer: "AH protects the immutable fields of the IP Header, the entire AH header itself (with ICV field zeroed during computation), and the entire upper-layer transport payload (TCP/UDP segment and data).",
    explanation: "Because AH authenticates the immutable portions of the outer IP header (such as Source IP and Destination IP), it guarantees that the addressing information was not spoofed in transit.",
    hint: "AH protects the entire packet, including immutable IP header fields.",
    level: "Moderate",
    codeExample: `// AH Integrity Check Value (ICV) Scope:
// [ Immutable IP Header Fields ] ➔ Authenticated ✔
// [ AH Header (SPI, Seq) ]       ➔ Authenticated ✔
// [ TCP / UDP Segment & Data ]   ➔ Authenticated ✔ (Payload is NOT encrypted!)`
  },
  {
    id: 4,
    question: "Which specific fields in an IPv4 header are considered 'mutable' and must be zeroed out when computing the AH ICV?",
    shortAnswer: "Type of Service (TOS / DSCP), Flags (DF / MF), Fragment Offset, Time to Live (TTL), and Header Checksum.",
    explanation: "Because intermediate transit routers legitimately decrement the TTL and recompute the IP Header Checksum at every hop, these fields change in flight. To prevent false integrity failures, both sender and receiver set these mutable fields to zero before calculating the HMAC hash.",
    hint: "Fields that routers change on every hop (like TTL and Checksum) are zeroed out.",
    level: "Moderate",
    codeExample: `// IPv4 Mutable Fields Zeroed During AH ICV Calculation:
// Byte 1: Version & IHL (Preserved)
// Byte 2: Type of Service / DSCP ➔ Set to 0x00
// Byte 3-4: Total Length (Preserved)
// Byte 5-6: Identification (Preserved)
// Byte 7-8: Flags & Fragment Offset ➔ Set to 0x0000
// Byte 9: Time to Live (TTL) ➔ Set to 0x00
// Byte 10: Protocol (Preserved, 51)
// Byte 11-12: Header Checksum ➔ Set to 0x0000
// Byte 13-16: Source IP (Preserved)
// Byte 17-20: Destination IP (Preserved)`
  },
  {
    id: 5,
    question: "Why does the Authentication Header (AH) protocol fail completely when passing through Network Address Translation (NAT) routers?",
    shortAnswer: "AH computes its ICV hash over the Source and Destination IP addresses in the IP header (which are immutable fields). When a NAT/PAT router translates private IP addresses to public IPs, the receiver's computed ICV does not match the sender's ICV, causing the kernel to drop the packet as corrupted.",
    explanation: "Because AH authenticates the IP addresses themselves, any NAT device in the transit path that rewrites the IP header invalidates the cryptographic signature. NAT-T cannot fix AH because AH explicitly forbids IP header modification.",
    hint: "NAT alters the IP address; AH's checksum includes that IP address, causing an ICV mismatch.",
    level: "Basic",
    codeExample: `// AH Breakdown Across NAT:
// 1. Sender (Private 10.14.0.5): Computes ICV with Src=10.14.0.5 ➔ Hash=0x88AF1901
// 2. NAT Router: Translates Src IP to Public 203.0.113.10
// 3. Receiver (Kolkata Core): Recomputes ICV using incoming Src=203.0.113.10 ➔ Hash=0x4A1F89BC
// 4. Result: 0x88AF1901 != 0x4A1F89BC ➔ Kernel DISCARDS packet! ❌`
  },
  {
    id: 6,
    question: "What is the complete physical byte sequence of an ESP packet in Transport Mode?",
    shortAnswer: "1. Original IP Header (Proto=50), 2. ESP Header (SPI + Sequence Number), 3. Initialization Vector (IV), 4. Encrypted Transport Payload (TCP/UDP), 5. Encrypted ESP Trailer (Padding + Pad Length + Next Header), 6. ESP Integrity Check Value (ICV) Authentication Tag.",
    explanation: "In ESP Transport Mode, the ESP header is placed after the original IP header, and the TCP segment and ESP trailer are encrypted. The ICV tag is appended at the end to authenticate the ESP header, ciphertext, and trailer.",
    hint: "IP Header ➔ ESP Header ➔ [Encrypted Payload + Trailer] ➔ ICV Tag.",
    level: "Moderate",
    codeExample: `// ESP Transport Mode Wire Layout:
// [ IP Header (Proto=50) ]
//   [ ESP SPI (4B) ] [ ESP Seq (4B) ] [ IV (8B) ]  <-- Plaintext Header
//   { Encrypted: [ TCP Header (20B) ] [ Data Payload ] }
//   { Encrypted: [ Padding (0-255B) ] [ Pad Len (1B) ] [ Next Header (1B) ] }
//   [ ICV Authentication Tag (16B) ]`
  },
  {
    id: 7,
    question: "What is the purpose of the 'Padding' and 'Pad Length' fields in the ESP Trailer?",
    shortAnswer: "Padding aligns the plaintext payload to the block size required by symmetric block ciphers (e.g., 16 bytes for AES) or ensures 4-byte/8-byte memory alignment for the ICV tag; Pad Length (1 byte) specifies exactly how many padding bytes were added so the receiver can strip them after decryption.",
    explanation: "Additionally, arbitrary padding can be added intentionally to conceal the true length of variable-sized application data (such as keystroke timings or DNS queries), resisting traffic flow analysis.",
    hint: "Padding aligns block boundaries and hides packet lengths; Pad Length tells the receiver how much to strip.",
    level: "Moderate",
    codeExample: `// ESP Padding Example:
// Plaintext Data Size: 25 Bytes
// Cipher Block Size  : 16 Bytes (AES requires multiple of 16)
// Total Needed       : 32 Bytes (Payload + Pad + PadLen + NextHdr)
// 25 + Pad + 1 + 1 = 32 ➔ Padding = 5 Bytes (e.g., 0x01 0x02 0x03 0x04 0x05)
// Pad Length Field   : 0x05`
  },
  {
    id: 8,
    question: "What is the 'Next Header' field in the ESP Trailer, and why is it located at the end of the packet inside the encrypted trailer?",
    shortAnswer: "The Next Header field specifies the protocol number of the encapsulated payload (e.g., 6 for TCP, 17 for UDP, 4 for IPv4 in Tunnel Mode). It is encrypted inside the trailer so intermediate eavesdroppers on the Internet cannot see what upper-layer protocol is running inside the tunnel.",
    explanation: "By placing Next Header inside the encrypted trailer rather than the plaintext ESP header, IPsec conceals whether the tunnel is carrying web traffic, SSH, database queries, or routing protocols.",
    hint: "It identifies the inner protocol while keeping the protocol identity secret from eavesdroppers.",
    level: "Moderate",
    codeExample: `// ESP Next Header Field:
// Located: Last byte of the ESP Trailer (inside encrypted block)
// Values:
// 0x06 ➔ TCP (Transport Mode)
// 0x11 ➔ UDP (Transport Mode)
// 0x04 ➔ IPv4 Encapsulation (Tunnel Mode)
// 0x29 ➔ IPv6 Encapsulation (Tunnel Mode)`
  },
  {
    id: 9,
    question: "What is the difference between Combined AEAD ciphers (e.g., AES-GCM) and Legacy Two-Pass ciphers (e.g., AES-CBC + HMAC-SHA256) in ESP?",
    shortAnswer: "Combined AEAD performs encryption and integrity tag generation in a single mathematical pass using Galois Field multiplication (hardware-accelerated via AES-NI / PCLMULQDQ); Legacy Two-Pass requires two distinct passes over the data (one to encrypt via CBC and one to hash via HMAC-SHA256), doubling memory bus transfers and CPU cycles.",
    explanation: "AEAD algorithms (RFC 4106 / RFC 7634) achieve 2x to 4x higher throughput and eliminate padding oracle vulnerabilities (such as Lucky Thirteen) that plagued legacy CBC modes.",
    hint: "AEAD encrypts and authenticates in one pass; legacy two-pass requires two separate passes.",
    level: "Expert",
    codeExample: `// AEAD vs Legacy Pipeline:
// Legacy Two-Pass: Plaintext ➔ [AES-CBC Encrypt] ➔ Ciphertext ➔ [HMAC-SHA256 Hash] ➔ Tag (2 Passes)
// Combined AEAD  : Plaintext ➔ [AES-GCM Engine (AES-NI)] ➔ (Ciphertext + GMAC Tag) (1 Pass!)`
  },
  {
    id: 10,
    question: "Why does RFC 8221 deprecate the Authentication Header (AH) for all modern IPsec deployments?",
    shortAnswer: "AH provides no data encryption (zero confidentiality), fails completely when traversing NAT/PAT routers, and offers no security or integrity capabilities that ESP with modern AEAD (AES-256-GCM) cannot deliver with superior performance and full NAT-T compatibility.",
    explanation: "Modern network architectures almost universally involve NAT boundaries. ESP in AEAD mode provides both cryptographic confidentiality and authenticated integrity while traversing NAT via UDP 4500.",
    hint: "AH lacks encryption, breaks on NAT, and is fully superseded by ESP with AEAD.",
    level: "Moderate",
    codeExample: `// IETF RFC 8221 Cryptographic Standards:
// AH (RFC 4302)  : Status = HISTORIC / NOT RECOMMENDED
// ESP (RFC 4303) : Status = MUST IMPLEMENT (with AES-256-GCM / ChaCha20-Poly1305)`
  },
  {
    id: 11,
    question: "What is an 'AH + ESP Nested Security Association Bundle' (Transport Adjacency), and why was it used historically?",
    shortAnswer: "A nested bundle applies both ESP and AH to the same packet (e.g., encrypting the payload with ESP first, then wrapping the entire packet including outer IP header with AH) to provide both payload confidentiality and outer IP header authentication.",
    explanation: "In early IPsec designs, engineers combined ESP (for payload encryption) with AH (to authenticate the IP header). However, this created immense MTU overhead, doubled CPU load, and broke NAT traversal completely. Modern networks have replaced this with pure ESP Tunnel Mode.",
    hint: "Applying both ESP and AH together to get encryption plus IP header authentication.",
    level: "Expert",
    codeExample: `// Nested AH + ESP Packet:
// [ IP Header (Proto=51 AH) ]
//   [ AH Header (Authenticates entire packet) ]
//     [ ESP Header (Proto=50) ]
//       { Encrypted TCP Payload }
//       { Encrypted ESP Trailer }
//       [ ESP ICV Tag ]
//   [ AH ICV Tag ]`
  },
  {
    id: 12,
    question: "How does ESP with NAT-Traversal (NAT-T / RFC 3948) enable IPsec to cross stateful NAT firewalls?",
    shortAnswer: "NAT-T wraps the raw ESP packet inside a standard UDP header with Source and Destination Port 4500. This provides the port numbers that stateful NAT/PAT routers require to maintain connection translation tables.",
    explanation: "Because raw IP Protocol 50 (ESP) has no TCP/UDP port numbers, consumer NAT routers cannot distinguish multiple internal devices communicating with the same external gateway. UDP encapsulation on port 4500 provides standard UDP port tracking.",
    hint: "Wrapping ESP in UDP port 4500 allows PAT firewalls to track port mappings.",
    level: "Moderate",
    codeExample: `// NAT-T UDP Encapsulation (RFC 3948):
// [ Public IP Header (Proto=17 UDP) ]
//   [ UDP Header (SrcPort=4500, DstPort=4500) ]
//     [ ESP Header (SPI, Seq) ]
//     { Encrypted Payload & Trailer }
//     [ ICV Tag ]`
  },
  {
    id: 13,
    question: "What is the total byte overhead added by AH Transport Mode versus ESP Tunnel Mode on standard IPv4 packets?",
    shortAnswer: "AH Transport Mode adds 24 bytes (AH Header + 16-byte ICV); ESP Tunnel Mode adds 60 to 76 bytes (20B New Outer IP + 8B ESP Header + 8B IV + 2-18B Trailer/Padding + 16B ICV Tag + 8B UDP if NAT-T is active).",
    explanation: "Knowing exact byte overheads is critical for calculating Maximum Transmission Unit (MTU) budgets and avoiding packet fragmentation.",
    hint: "AH Transport is ~24 bytes; ESP Tunnel is ~60 to 76 bytes.",
    level: "Expert",
    codeExample: `// Byte Overhead Comparison:
// AH Transport  : 24 Bytes (Header + ICV)
// AH Tunnel     : 44 Bytes (New IP 20B + AH 24B)
// ESP Transport : 32-48 Bytes (ESP Header + IV + Trailer + ICV)
// ESP Tunnel    : 60-76 Bytes (New IP 20B + ESP 32-48B + NAT-T 8B)`
  },
  {
    id: 14,
    question: "Why does AH in Tunnel Mode fail across NAT even though a new outer IP header is created?",
    shortAnswer: "Because AH in Tunnel Mode authenticates the outer IP header (which is modified by the NAT device) AND the inner IP header (if modified by Carrier-Grade NAT), causing the receiver's ICV verification of the outer IP header to fail immediately upon receipt.",
    explanation: "Even in Tunnel Mode, AH computes its signature over the outer IP header's source and destination IP addresses. The moment an intermediate NAT gateway translates the outer IP address, the ICV signature is permanently broken.",
    hint: "AH in tunnel mode still authenticates the outer IP addresses, which NAT changes.",
    level: "Expert",
    codeExample: `// AH Tunnel Mode across NAT:
// [ New Outer IP Header (Src=10.14.0.1 translated to 203.0.113.10) ] ➔ MODIFIED BY NAT!
// [ AH Header (ICV computed over 10.14.0.1) ] ➔ ICV MISMATCH AT RECEIVER!`
  },
  {
    id: 15,
    question: "What is ChaCha20-Poly1305 (RFC 7634) in IPsec ESP and when is it preferred over AES-GCM?",
    shortAnswer: "ChaCha20-Poly1305 is a high-performance stream cipher paired with the Poly1305 authenticator. It is preferred on embedded systems, mobile devices, ARM IoT gateways, and routers that lack dedicated hardware AES-NI instructions, delivering 3x faster encryption in software than AES.",
    explanation: "While AES-GCM is the gold standard on x86 processors with hardware acceleration, ChaCha20-Poly1305 executes in constant time with extreme efficiency on general-purpose CPU registers, resisting cache-timing attacks.",
    hint: "A fast stream cipher for devices without hardware AES-NI chips (like ARM IoT and mobile gateways).",
    level: "Expert",
    codeExample: `// strongSwan ChaCha20-Poly1305 Configuration:
// esp = chacha20poly1305-modp2048!
// Delivers wire-speed 1Gbps encryption on low-power ARM Cortex gateways without AES-NI.`
  },
  {
    id: 16,
    question: "How does the receiver verify the ESP ICV authentication tag upon packet arrival?",
    shortAnswer: "The receiver feeds the ESP Header, the ciphertext payload, and the ESP Trailer into the GMAC/HMAC verification algorithm along with the negotiated authentication key. If the computed tag matches the 16-byte ICV tag carried at the end of the packet, the packet is verified as authentic and decrypted; otherwise, it is dropped immediately.",
    explanation: "Crucially, in AEAD ciphers (AES-GCM), the outer ESP Header is treated as Additional Authenticated Data (AAD), ensuring that the SPI and Sequence Number cannot be tampered with by attackers.",
    hint: "GMAC tag is recomputed over the header and ciphertext; if it matches, decryption proceeds.",
    level: "Moderate",
    codeExample: `// AEAD Verification Flow:
// Input: AAD = [SPI (4B) + Seq (4B)], Ciphertext, ICV Tag (16B), Key K, Nonce N
// Result: AES_GCM_Verify(Key, Nonce, AAD, Ciphertext, Tag)
// If True  ➔ Decrypt to Plaintext TCP Segment ✔
// If False ➔ DROP & Increment 'XFRM_IN_HDR_ERROR' Counter ❌`
  },
  {
    id: 17,
    question: "What is the role of the 'SPI' (Security Parameters Index) in both AH and ESP headers?",
    shortAnswer: "The SPI is an arbitrary 32-bit value in plaintext at the beginning of AH (bytes 4-7) and ESP (bytes 0-3) that acts as a database key, allowing the receiving kernel to look up the correct Security Association (SA), decryption keys, and anti-replay state in its SAD.",
    explanation: "Because an enterprise gateway might maintain thousands of active IPsec tunnels simultaneously, the SPI allows instant O(1) hash table lookup to identify the exact cryptographic keys needed for that specific packet.",
    hint: "A 32-bit identifier that tells the receiving gateway which decryption key to use.",
    level: "Basic",
    codeExample: `// SPI Location in Headers:
// AH Header : [ NextHdr (1B) ] [ PayloadLen (1B) ] [ Reserved (2B) ] [ SPI (4B) ] [ Seq (4B) ] ...
// ESP Header: [ SPI (4B) ] [ Seq (4B) ] [ IV (8B) ] ...`
  },
  {
    id: 18,
    question: "What happens if an attacker on the Internet flips a single bit in the ciphertext of an ESP-encrypted packet?",
    shortAnswer: "The receiver's cryptographic ICV check (GMAC / HMAC) will fail, and the packet will be silently discarded by the operating system kernel before any upper-layer application can process the corrupted data.",
    explanation: "Because ESP enforces strong message authentication via AEAD tags, any alteration of the ciphertext or header in transit invalidates the tag, preventing bit-flipping and ciphertext tampering attacks.",
    hint: "The ICV tag mismatch triggers an immediate kernel drop.",
    level: "Basic",
    codeExample: `// Tampered Ciphertext Handling:
// Wire: Attacker flips bit in byte 42 of ESP payload
// Kernel: Recomputes GMAC tag ➔ Tag Mismatch!
// Action: Discard packet; increment ip xfrm drop counter; send NO notification to sender.`
  },
  {
    id: 19,
    question: "What is the difference between AH and ESP regarding Traffic Flow Confidentiality?",
    shortAnswer: "AH provides NO traffic flow confidentiality because all transport ports, packet sizes, and application protocols remain visible in plaintext; ESP in Tunnel Mode provides strong traffic flow confidentiality by hiding internal IP addresses, ports, protocol types, and using variable padding to mask packet sizes.",
    explanation: "External eavesdroppers observing an AH tunnel can analyze internal database query patterns, web browsing habits, and communication frequencies. ESP Tunnel Mode masks all internal network activity behind a single gateway-to-gateway outer IP header.",
    hint: "AH exposes ports and protocols; ESP Tunnel Mode hides everything inside an encrypted outer envelope.",
    level: "Moderate",
    codeExample: `// Wire Visibility:
// AH Link  : ISP sees "Host 10.14.2.15 talking to 10.20.5.88 on Port 1433 (SQL query of 240 bytes)"
// ESP Link : ISP sees "Gateway 203.0.113.10 sending ESP to 198.51.100.20 (Size 1400 bytes)"`
  },
  {
    id: 20,
    question: "Why is the Sequence Number field included in both AH and ESP headers, and can it be encrypted?",
    shortAnswer: "The Sequence Number is a 32-bit (or 64-bit ESN) counter used by the receiver's sliding window to prevent replay attacks. It CANNOT be encrypted because the receiver must inspect the sequence number in plaintext to perform the anti-replay check BEFORE dedicating CPU cycles to expensive payload decryption.",
    explanation: "If the sequence number were encrypted, an attacker could flood a gateway with millions of bogus packets, forcing the gateway to decrypt every packet just to discover it was a replay, leading to catastrophic Denial-of-Service (DoS) CPU exhaustion.",
    hint: "It must be plaintext so the receiver can drop duplicate packets without wasting CPU on decryption.",
    level: "Expert",
    codeExample: `// DoS Protection via Plaintext Sequence Number:
// Packet arrives with Seq=40 (below window tail 50)
// Kernel checks plaintext Seq ➔ Drops immediately in 2 nanoseconds!
// Zero cryptographic operations performed; CPU is protected from DoS.`
  },
  {
    id: 21,
    question: "How can a network engineer verify with `tcpdump` whether a router is receiving AH (Protocol 51) or ESP (Protocol 50) traffic?",
    shortAnswer: "By running `sudo tcpdump -nn -i eth0 'proto 50 or proto 51'`, which filters specifically for IP Protocol 50 (ESP) and Protocol 51 (AH) packets on the network interface.",
    explanation: "tcpdump parses the IPv4 Protocol / IPv6 Next Header field. ESP packets will display as `IP 203.0.113.10 > 198.51.100.20: ESP(spi=0x88af1901,seq=101)`, while AH packets display as `IP ...: AH(spi=0x4a1f89bc,seq=55)`.",
    hint: "Use tcpdump filtering on proto 50 or proto 51.",
    level: "Moderate",
    codeExample: `// Live tcpdump Capture Command:
# sudo tcpdump -nn -i eth0 -v 'proto 50 or proto 51'
// Output for ESP:
// 18:20:10.123 IP 203.0.113.10 > 198.51.100.20: ESP(spi=0x88af1901,seq=101,length 1400)
// Output for AH:
// 18:20:12.456 IP 203.0.113.10 > 198.51.100.20: AH(spi=0x4a1f89bc,seq=55): TCP 10.14.2.15:5432 > ...`
  },
  {
    id: 22,
    question: "What is an 'Initialization Vector' (IV) in the ESP header and how is it derived in modern TLS/IPsec AEAD modes?",
    shortAnswer: "The IV is an 8-to-16-byte nonce required by block/stream ciphers to randomize ciphertext. In modern AEAD modes (RFC 4106 AES-GCM), a 4-byte Salt (from IKE negotiation) is concatenated with an 8-byte explicit IV (or implicit sequence counter XOR) to construct the unique 96-bit Nonce.",
    explanation: "This construction guarantees that even if identical database records are transmitted continuously, every single packet encrypts to completely distinct, randomized ciphertext, preventing pattern recognition attacks.",
    hint: "A unique nonce ensuring that duplicate data produces completely different encrypted packets.",
    level: "Expert",
    codeExample: `// 96-Bit Nonce Construction in AES-GCM ESP:
// Nonce = [ 4-Byte Salt (from SA Key Derivation) ] || [ 8-Byte IV (Sequence Number based) ]
// Unique Nonce + AES Key ➔ AES-GCM Encrypt(Payload) ➔ Ciphertext + GMAC Tag`
  },
  {
    id: 23,
    question: "What security vulnerability occurs if two packets are encrypted using AES-GCM with the same Key and Initialization Vector (IV Reuse)?",
    shortAnswer: "IV reuse under the same key completely breaks the Galois/Counter Mode (GCM) authentication tag derivation, exposing the secret authentication subkey (Hash Key H) and allowing an attacker to forge arbitrary packets and decrypt other ciphertexts.",
    explanation: "This is known as the 'GCM Nonce Reuse Catastrophe'. IPsec avoids this by strictly deriving IVs from strictly incrementing sequence numbers and mandating rekeying before sequence counters rollover.",
    hint: "Reusing an IV in AES-GCM allows attackers to recover keys and forge packets.",
    level: "Expert",
    codeExample: `// Nonce Reuse Vulnerability:
// Ciphertext A = Plaintext A ⊕ Keystream(Key, Nonce)
// Ciphertext B = Plaintext B ⊕ Keystream(Key, Nonce)
// Ciphertext A ⊕ Ciphertext B = Plaintext A ⊕ Plaintext B (Keystream canceled out! Plaintext leaked!)`
  },
  {
    id: 24,
    question: "What are the four fields of the Authentication Header (AH) as specified in RFC 4302?",
    shortAnswer: "1. Next Header (8 bits), 2. Payload Length (8 bits), 3. Reserved (16 bits - zeroed), 4. Security Parameters Index (SPI - 32 bits), 5. Sequence Number (32 bits), 6. Integrity Check Value (ICV - variable, typically 128 bits).",
    explanation: "The Payload Length field in AH specifies the length of the AH header in 32-bit (4-byte) words minus 2. The Reserved field is reserved for future use and must be transmitted as zero.",
    hint: "Next Header ➔ Payload Length ➔ Reserved ➔ SPI ➔ Sequence Number ➔ ICV.",
    level: "Moderate",
    codeExample: `// AH Header Format (RFC 4302):
// 0                   1                   2                   3
// 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |  Next Header  |  Payload Len  |          RESERVED             |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                 Security Parameters Index (SPI)               |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                    Sequence Number Field                      |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                                                               |
// +                Integrity Check Value (ICV)                    +
// |                                                               |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+`
  },
  {
    id: 25,
    question: "What is the recommended cryptographic cipher suite for IPsec ESP in government and high-security financial infrastructure today?",
    shortAnswer: "AES-256-GCM (AEAD) with 128-bit ICV tags, IKEv2 with Diffie-Hellman Group 14 (2048-bit MODP) or Group 19 (256-bit ECP), and SHA-384 PRF.",
    explanation: "This combination provides NSA Suite B / Commercial National Security Algorithm (CNSA) compliance, immune to padding attacks and delivering hardware-accelerated wire-speed performance.",
    hint: "AES-256-GCM AEAD paired with IKEv2 and modern elliptic curve Diffie-Hellman groups.",
    level: "Moderate",
    codeExample: `// strongSwan Production Suite Configuration (swanctl.conf):
// ike = aes256gcm16-prfsha384-ecp384!
// esp = aes256gcm16-ecp384!`
  },
  {
    id: 26,
    question: "Why did early IPsec implementations experience high CPU utilization when running ESP with 3DES and HMAC-MD5?",
    shortAnswer: "3DES (Triple-DES) performs three sequential 56-bit encryption passes per 64-bit block using software bit-permutations that cannot be parallelized, while MD5 required a separate hashing pass. Neither algorithm had hardware CPU acceleration.",
    explanation: "3DES and MD5 consumed up to 80% of server CPU capacity on multi-megabit links. Modern CPUs feature dedicated hardware instructions (AES-NI and CLMUL) that execute AES-GCM in single clock cycles.",
    hint: "3DES ran three slow software passes without hardware offloading.",
    level: "Moderate",
    codeExample: `// Performance History:
// 1998 : 3DES + HMAC-MD5 (Software bit-shuffling) ➔ ~45 Mbps max on Xeon CPU (100% CPU)
// 2026 : AES-256-GCM (Intel AES-NI + AVX-512)     ➔ ~40,000 Mbps (40 Gbps) (15% CPU)`
  },
  {
    id: 27,
    question: "How does ESP in Transport Mode compare to TLS in protecting host-to-host web application traffic?",
    shortAnswer: "ESP in Transport Mode encrypts at Layer 3, protecting the entire TCP segment (including TCP sequence numbers, port numbers, and flags) transparently for all applications; TLS encrypts at Layer 4/7, protecting only application data while leaving TCP headers exposed.",
    explanation: "Because ESP operates below TCP, attackers on intermediate networks cannot perform TCP RST injection or TCP sequence desynchronization attacks against an established connection.",
    hint: "ESP Transport protects the TCP header itself; TLS only protects the payload inside TCP.",
    level: "Expert",
    codeExample: `// TCP Header Protection Comparison:
// TLS over TCP  : [ IP Header ] [ Plaintext TCP Header (Ports, Flags, Seq) ] [ TLS Record (Encrypted Data) ]
// ESP Transport : [ IP Header ] [ ESP Header ] { Encrypted: [ TCP Header ] [ Application Data ] }`
  },
  {
    id: 28,
    question: "What is the function of the 'Payload Length' field in the Authentication Header (AH)?",
    shortAnswer: "The Payload Length field indicates the total size of the AH header in 4-byte (32-bit) words, minus 2.",
    explanation: "For example, for a default IPv4 AH header with a 128-bit (16-byte) ICV: total AH length is 24 bytes (6 words). The Payload Length field is encoded as 6 - 2 = 4.",
    hint: "It measures the AH header length in 32-bit words minus 2.",
    level: "Expert",
    codeExample: `// AH Payload Length Calculation:
// AH Header Size = 24 Bytes = 6 words of 4 bytes
// Payload Length Value = 6 - 2 = 4 (0x04)`
  },
  {
    id: 29,
    question: "In a forensic packet capture, why is the ICV tag of an ESP packet located at the trailer rather than the header?",
    shortAnswer: "Placing the ICV at the trailer allows streaming hardware crypto engines to calculate the cryptographic hash on the fly as the packet is being encrypted and transmitted, appending the tag immediately at the end without buffering the entire packet in memory first.",
    explanation: "If the ICV were placed in the header, the sender would have to buffer the entire packet, compute the hash, insert the tag into the header, and then send the packet, adding substantial packet latency.",
    hint: "Placing the checksum at the end allows the hardware to calculate and append the tag as bits leave the wire.",
    level: "Expert",
    codeExample: `// Streaming Cryptographic Pipeline:
// Data Stream ➔ [ AES-GCM Encrypt ] ──(Pipes onto Wire)──>
// As last byte is sent, GMAC engine outputs 16-byte Tag ➔ Appended directly to wire!`
  },
  {
    id: 30,
    question: "What are the primary troubleshooting steps when an IPsec tunnel establishes Phase 1 (IKE) but drops all Phase 2 (ESP) traffic?",
    shortAnswer: "1. Verify intermediate firewalls permit IP Protocol 50 (ESP) and UDP Port 4500 (NAT-T); 2. Check for MTU black holes and verify TCP MSS clamping (`-j TCPMSS --set-mss 1360`); 3. Check for SPD subnet selector mismatches; 4. Verify in-kernel SAD transformation counters with `ip -s xfrm state` to identify replay drops or decryption errors.",
    explanation: "Often IKE (UDP 500) negotiates successfully because firewalls permit UDP, but upstream ISP firewalls block raw IP Protocol 50 (ESP). Enabling NAT-T forces ESP over UDP 4500, bypassing the block.",
    hint: "Check Protocol 50 firewall filtering, NAT-T UDP 4500 encapsulation, and MTU MSS clamping.",
    level: "Expert",
    codeExample: `// Troubleshooting Checklist for Dropped ESP:
// 1. Force NAT-T (UDP 4500) in strongSwan: 'forceencaps = yes'
// 2. Check Linux XFRM error counters: 'ip -s xfrm state'
// 3. Clamp MSS on external interface: 'iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 1360'`
  }
];

export default questions;
