const questions = [
  {
    id: 1,
    question: "What is the primary role of the TLS Record Protocol in the transport security stack?",
    shortAnswer: "The TLS Record Protocol fragments application data into chunks (<= 16 KB), performs AEAD authenticated encryption and decryption, protects against packet replay using 64-bit sequence counters, and multiplexes sub-protocols.",
    explanation: "The Record Protocol is the foundational operational engine of TLS. Once the handshake derives cryptographic keys, all data (HTTP payloads, alerts, handshake messages) is framed, encrypted, and tagged by the Record Layer before transmission over TCP.",
    hint: "The data packaging and encryption engine that wraps all messages before sending them over the network.",
    level: "Basic",
    codeExample: `// Five Functions of TLS Record Layer:
// 1. Fragmentation   : Splits data into chunks <= 16,384 Bytes (16 KB)
// 2. Encryption      : AEAD AES-GCM / ChaCha20-Poly1305
// 3. Integrity       : 128-bit Authentication Tag
// 4. Anti-Replay     : 64-bit Implicit Sequence Counters
// 5. Multiplexing    : Carries Handshake, Alerts, and AppData`
  },
  {
    id: 2,
    question: "What are the four sub-protocols multiplexed over the TLS Record Layer?",
    shortAnswer: "1. Handshake Protocol (Content Type 22); 2. Alert Protocol (Content Type 21); 3. ChangeCipherSpec Protocol (Content Type 20 - legacy); 4. Application Data Protocol (Content Type 23).",
    explanation: "The Record Layer uses Content Type identifiers to route incoming payloads to the appropriate parser. In TLS 1.2, these content types were visible in cleartext. In TLS 1.3, all outer headers are masked as generic Application Data (23), with the real type hidden inside the ciphertext.",
    hint: "Handshake (22), Alerts (21), ChangeCipherSpec (20), and Application Data (23).",
    level: "Basic",
    codeExample: `// TLS Record Content Types:
// 20 (0x14) ➔ ChangeCipherSpec (Legacy middlebox compatibility)
// 21 (0x15) ➔ Alert Protocol (Warnings & Fatal Errors)
// 22 (0x16) ➔ Handshake Protocol (Key exchange & Certificates)
// 23 (0x17) ➔ Application Data Protocol (Encrypted HTTP Payloads)`
  },
  {
    id: 3,
    question: "How does TLS 1.3 Record Framing (RFC 8446 Section 5) differ fundamentally from TLS 1.2?",
    shortAnswer: "In TLS 1.3, the outer header always sets Content Type to `23` (Application Data) and Version to `0x0303`; the REAL content type (e.g., Alert or Handshake) and optional zero-padding are placed INSIDE the encrypted payload, followed by a 16-byte AEAD tag.",
    explanation: "In TLS 1.2, the outer header revealed whether a packet was an Alert or Application Data. TLS 1.3 achieves complete metadata privacy: network sniffers cannot distinguish between a user typing text, an image download, an internal KeyUpdate, or a close connection alert.",
    hint: "The outer label always says 'Application Data', but the true message type is sealed inside the encrypted envelope.",
    level: "Moderate",
    codeExample: `// TLS 1.3 Record Structure:
// [ Outer Header (5B): Type=0x17, Ver=0x0303, Len=N ]
// └──> [ Encrypted Payload: Real Plaintext + Real Content Type (1B) + Padding (0x00...) ]
// └──> [ AEAD Authentication Tag (16B) ]`
  },
  {
    id: 4,
    question: "What is 'Content Type Hiding' and 'Record Zero-Padding' in TLS 1.3, and what attack does it mitigate?",
    shortAnswer: "Placing the real message type inside the ciphertext and adding variable 0x00 padding bytes to round records to uniform sizes mitigates Traffic Analysis attacks where adversaries deduce user activity from packet sizes.",
    explanation: "Even with encryption, observing packet sizes leaks secrets (e.g., a 120-byte response might indicate 'Login Failed' while a 450-byte response indicates 'Login Success'). By padding records to uniform 1024-byte blocks and hiding content types, traffic analysis attacks are rendered impossible.",
    hint: "Making all encrypted packages the exact same size so eavesdroppers cannot guess what is inside.",
    level: "Moderate",
    codeExample: `// Traffic Analysis Defense with Zero-Padding:
// Real Payload: "Approved" (8 Bytes) + Type=23 + Padding (1015 zero bytes) ➔ Total: 1024 Bytes
// Real Payload: "Fraud_Rejected" (14 Bytes) + Type=23 + Padding (1009 zero bytes) ➔ Total: 1024 Bytes
// ➔ Observer sees identical 1024-byte records for both!`
  },
  {
    id: 5,
    question: "How is the 96-bit per-record Nonce calculated in TLS 1.3 without transmitting explicit IVs on the wire?",
    shortAnswer: "Formula: $\\text{Nonce} = \\text{Base IV} \\oplus \\text{Pad}_{96}(\\text{Sequence Number})$. The 12-byte Base IV is XORed with the 64-bit implicit sequence counter padded with 4 leading zero bytes.",
    explanation: "TLS 1.2 sent 8 to 16 bytes of explicit IV in every packet header. TLS 1.3 eliminates this wire overhead: both client and server already know the Base IV (derived during handshake) and track the sequence number (0, 1, 2, ...), allowing deterministic calculation of unique nonces for every record.",
    hint: "XORing the static base IV with the increasing sequence number to create a unique nonce for each packet.",
    level: "Expert",
    codeExample: `// TLS 1.3 Nonce Derivation (RFC 8446 Section 5.3):
// Base_IV         = 0x 11 22 33 44 55 66 77 88 99 AA BB CC
// Seq_Number (5)  = 0x 00 00 00 00 00 00 00 00 00 00 00 05
// Derived_Nonce   = Base_IV XOR Seq_Number`
  },
  {
    id: 6,
    question: "Why is 'Zero IV Reuse' a catastrophic, fatal vulnerability in AES-GCM authenticated encryption?",
    shortAnswer: "Encrypting two distinct records with the same key and same Nonce in AES-GCM allows an attacker to compute the XOR of the plaintexts and mathematically recover the Galois authentication hash key ($H$), enabling arbitrary packet forgery (The 'Forbidden Attack').",
    explanation: "Galois/Counter Mode derives authentication tags using polynomial evaluation over $\\text{GF}(2^{128})$. If two records share a Nonce, the difference between their authentication equations reveals the secret authentication key $H$. In TLS 1.3, monotonically incrementing sequence numbers guarantee zero IV reuse.",
    hint: "Reusing a nonce in AES-GCM completely breaks the mathematical lock, leaking the secret authentication key.",
    level: "Expert",
    codeExample: `// AES-GCM Nonce Reuse Hazard:
// Record A: Ciphertext_A = Plaintext_A XOR AES_CTR(Key, Nonce_X)
// Record B: Ciphertext_B = Plaintext_B XOR AES_CTR(Key, Nonce_X)
// Attacker XORs both: Ciphertext_A XOR Ciphertext_B = Plaintext_A XOR Plaintext_B!
// ➔ Plus Galois polynomial subtraction leaks secret authentication key H!`
  },
  {
    id: 7,
    question: "How do implicit 64-bit sequence counters prevent packet replay, reordering, and insertion attacks?",
    shortAnswer: "Both peers maintain private sequence counters that increment with each record; because the sequence number is factored into the Nonce and AEAD Additional Authenticated Data (AAD), any replayed, out-of-order, or injected packet fails tag verification.",
    explanation: "Sequence numbers are never sent over the wire. If an attacker replays record #3 after record #10, the receiver attempts decryption using sequence #11, causing the AEAD authentication tag verification to fail and dropping the connection immediately.",
    hint: "An invisible counter that ticks up by 1 with every packet; if a packet arrives out of order, the math fails and it gets dropped.",
    level: "Moderate",
    codeExample: `// Sequence Number Anti-Replay:
// Sender transmits Record #4 (Calculates tag with Seq=4)
// Receiver expects Record #4 (Verifies tag with Seq=4) ➔ OK
// Attacker replays Record #4 later ➔ Receiver checks tag against Seq=12 ➔ BAD_RECORD_MAC ➔ CONNECTION TERMINATED!`
  },
  {
    id: 8,
    question: "What is the maximum plaintext fragment size permitted in a single TLS record?",
    shortAnswer: "$2^{14} = 16,384\\text{ Bytes}$ (16 KB).",
    explanation: "RFC 8446 limits the maximum unencrypted payload fragment in a TLS record to 16,384 bytes. If an application attempts to write a 100 KB file over TLS, the Record Layer splits the data into seven consecutive fragmented records.",
    hint: "16 KB (16,384 bytes) is the maximum size of a single TLS record chunk.",
    level: "Basic",
    codeExample: `// TLS Record Size Constant (RFC 8446):
// max_plaintext_fragment_length = 16384 Bytes (16 KB)`
  },
  {
    id: 9,
    question: "What is the 'Time-To-First-Byte' (TTFB) problem with fixed 16 KB TLS records on high-latency or mobile networks?",
    shortAnswer: "A client cannot decrypt and parse a TLS record until the ENTIRE 16 KB record (including the final 16-byte AEAD tag) is received; if packets drop on mobile Wi-Fi, the browser freezes waiting for TCP retransmission before rendering any HTML.",
    explanation: "A 16 KB record spans ~11 TCP packets. If packet #4 is lost on a 4G connection in Kolkata, the client's TCP stack buffers the remaining packets, but the TLS engine cannot decrypt byte 1 until packet #4 is retransmitted. This introduces head-of-line blocking delays.",
    hint: "The browser cannot unlock the box until all 11 puzzle pieces arrive; if one piece drops, the screen stays blank.",
    level: "Moderate",
    codeExample: `// 16 KB Record Head-of-Line Blocking:
// [TCP Pkt 1] [TCP Pkt 2] [TCP Pkt 3] [DROPPED PKT 4] [TCP Pkt 5] ... [TCP Pkt 11 + Tag]
// ➔ Browser must wait 120ms for TCP retransmission of Pkt 4 before TLS can decrypt ANYTHING!`
  },
  {
    id: 10,
    question: "How does 'Dynamic Record Sizing' (DRS) optimize web performance and mobile page rendering speed?",
    shortAnswer: "By transmitting small records (~1,400 Bytes - fitting inside 1 TCP packet) during the initial connection burst so the browser renders HTML immediately, then dynamically scaling up to 16 KB records for high-throughput bulk downloads.",
    explanation: "Modern web servers (NGINX with Cloudflare patches) use dynamic record sizing. The first few records fit inside single MSS packets ($1360-1400\\text{B}$), allowing the browser to decrypt each packet immediately without waiting for multi-packet assembly. Once the TCP congestion window opens, records expand to 16 KB.",
    hint: "Sending small, fast-opening packages at first so the page loads instantly, then switching to big bulk boxes.",
    level: "Moderate",
    codeExample: `// Dynamic Record Sizing in NGINX:
// ssl_dyn_rec_enable on;
// ssl_dyn_rec_size_lo 1360;    # Start with 1-packet records for instant rendering
// ssl_dyn_rec_size_hi 4096;    # Step up during medium burst
// ssl_dyn_rec_threshold 40;    # Scale to 16 KB after 40 packets`
  },
  {
    id: 11,
    question: "What is 'Additional Authenticated Data' (AAD) in the TLS 1.3 AEAD Record encryption process?",
    shortAnswer: "The unencrypted Outer Record Header (5 Bytes: `0x17`, `0x0303`, `Length`) passed into the AEAD cipher alongside the plaintext, ensuring that intermediate routers cannot tamper with the record length or header fields.",
    explanation: "In Authenticated Encryption (AEAD), data can be authenticated without being encrypted. Passing the 5-byte outer header as AAD guarantees that if an attacker alters the outer length field or record version, the AEAD authentication tag verification will fail at the receiver.",
    hint: "Passing the outer envelope address into the tamper-proof checksum calculation so the envelope cannot be altered.",
    level: "Expert",
    codeExample: `// AEAD Encrypt Formula:
// Ciphertext, Tag = AEAD_Encrypt(Key, Nonce, Plaintext=InnerPayload, AAD=OuterHeader[5 Bytes])`
  },
  {
    id: 12,
    question: "How does the receiver handle an AEAD authentication tag verification failure (`BAD_RECORD_MAC`)?",
    shortAnswer: "The receiver terminates the connection immediately, sends a fatal `bad_record_mac` (Alert 20) alert, and tears down the TCP socket without attempting any further communication.",
    explanation: "A tag verification failure indicates either physical packet corruption, a replay attack, or active Man-in-the-Middle tampering. Because TLS assumes cryptographic breach upon tag failure, no recovery or retry is permitted at the TLS layer.",
    hint: "Immediate, permanent disconnect: the security seal failed, so the connection is terminated instantly.",
    level: "Basic",
    codeExample: `// Fatal Record MAC Alert:
// Record Tag Verification Failed ➔ Send Alert [Level: Fatal (2), Description: bad_record_mac (20)] ➔ Close TCP Socket!`
  },
  {
    id: 13,
    question: "Why was data compression at the TLS Record layer permanently prohibited by RFC 8446?",
    shortAnswer: "Because TLS-level compression (DEFLATE) was directly exploited by the 'CRIME' attack (CVE-2012-4929) to leak session cookies and secret authentication tokens by measuring changes in ciphertext length.",
    explanation: "Compression reduces repeated character sequences. When an attacker injected chosen text into a web request that matched the victim's secret cookie, the compressed record shrank in size. Observing ciphertext length leaked cookies byte-by-byte.",
    hint: "Compressing encrypted data allowed attackers to guess passwords by checking file sizes (CRIME attack).",
    level: "Basic",
    codeExample: `// CRIME Attack Fix:
// RFC 8446 Section 5: "Implementations MUST NOT send or accept TLS records with compression enabled."`
  },
  {
    id: 14,
    question: "What is the 'CloseNotify' alert record and how does it prevent 'Truncation Attacks'?",
    shortAnswer: "An encrypted Alert message (`Level: 1, Description: 0`) sent by a peer before closing the connection, informing the receiver that the transmission finished gracefully rather than being prematurely truncated by an attacker.",
    explanation: "In a truncation attack, an adversary injects a TCP FIN/RST packet to prematurely cut off a bank transfer response before the client receives the confirmation. The `CloseNotify` alert is authenticated by the AEAD tag, ensuring that only genuine closures are accepted.",
    hint: "A signed 'The End' stamp on the last page of the letter so no one can secretly rip off the final page.",
    level: "Moderate",
    codeExample: `// CloseNotify Alert Message:
// Inner Plaintext: [Alert Level: Warning (1)] [Alert Desc: close_notify (0)] + ContentType: 21`
  },
  {
    id: 15,
    question: "How does 'ChaCha20-Poly1305' (RFC 8439) construct its internal block counter and keystream?",
    shortAnswer: "ChaCha20 uses a 512-bit state matrix (16 32-bit words) containing 4 constant words ('expand 32-byte k'), 8 key words (256-bit key), 1 block counter (32-bit), and 3 nonce words (96-bit), executing 20 quarter-round operations.",
    explanation: "ChaCha20 generates 64-byte keystream blocks by applying Add-Rotate-Xor (ARX) operations. For each 64-byte block of plaintext, the block counter increments, ensuring that long files are encrypted safely in constant time on general-purpose CPU registers.",
    hint: "A 16-word mathematical grid that mixes keys, nonces, and counters to generate rapid stream encryption.",
    level: "Expert",
    codeExample: `// ChaCha20 State Matrix (16 Words):
// [ Const 0 ] [ Const 1 ] [ Const 2 ] [ Const 3 ]
// [ Key 0   ] [ Key 1   ] [ Key 2   ] [ Key 3   ]
// [ Key 4   ] [ Key 5   ] [ Key 6   ] [ Key 7   ]
// [ Counter ] [ Nonce 0 ] [ Nonce 1 ] [ Nonce 2 ]`
  },
  {
    id: 16,
    question: "What happens when the 64-bit sequence counter in a TLS connection reaches its maximum value ($2^{64}-1$)?",
    shortAnswer: "The connection MUST be rekeyed using a `KeyUpdate` handshake message or gracefully closed; sequence numbers are never allowed to wrap around to zero under the same key.",
    explanation: "Allowing a sequence counter to wrap around to zero would cause Nonce reuse ($IV \\oplus 0$), destroying AES-GCM authentication. However, at 100 Gbps line rate, exhausting a 64-bit sequence counter would take over 5,000 years of continuous transmission.",
    hint: "The sequence counter must never restart from zero under the same key to prevent nonce reuse.",
    level: "Moderate",
    codeExample: `// Sequence Counter Wrap-around Protection:
// if (sequence_number == 0xFFFFFFFFFFFFFFFF) {
//     send_key_update(); // Derives fresh traffic secrets!
//     sequence_number = 0;
// }`
  },
  {
    id: 17,
    question: "How do you inspect TLS Record Layer parameters and content types using `tshark` CLI?",
    shortAnswer: "Run `tshark -i eth0 -Y tls -T fields -e frame.number -e tls.record.content_type -e tls.record.version -e tls.record.length` to inspect record framing in real time.",
    explanation: "This command extracts the outer content type (`23`), legacy version (`0x0303`), and encrypted record length for every TLS packet captured on the network interface.",
    hint: "Using tshark with field filters to extract record types, lengths, and versions.",
    level: "Basic",
    codeExample: `// tshark Record Extraction Command:
$ tshark -i eth0 -Y "tls.record" -T fields -e tls.record.content_type -e tls.record.length
// Output: 23 1420 (Record 1) | 23 1420 (Record 2) | 23 540 (Record 3)`
  },
  {
    id: 18,
    question: "What is the difference between 'Full-Duplex' record processing and 'Half-Duplex' in TLS?",
    shortAnswer: "TLS Record Protocol is completely Full-Duplex; the client and server maintain independent directional keys (`client_write_key` vs `server_write_key`) and independent sequence counters, allowing simultaneous bi-directional data transmission.",
    explanation: "The client can transmit an HTTP request while simultaneously receiving an HTTP response stream over the same TCP connection. Neither side needs to wait for the other side's record sequence counter.",
    hint: "Two independent one-way streets with their own keys and speedometers.",
    level: "Moderate",
    codeExample: `// Full-Duplex Independence:
// Client ➔ Server Stream : client_app_key + client_sequence_counter (0, 1, 2...)
// Server ➔ Client Stream : server_app_key + server_sequence_counter (0, 1, 2...)`
  },
  {
    id: 19,
    question: "How does 'Poly1305' compute its 128-bit message authentication tag in ChaCha20-Poly1305?",
    shortAnswer: "By evaluating a polynomial over the prime field $\\mathbb{F}_{2^{130}-5}$ using a one-time key $(r, s)$ derived from the first 256 bits of the ChaCha20 keystream for each record.",
    explanation: "Poly1305 takes the message in 16-byte blocks, interprets them as coefficients of a polynomial evaluated at $r$, and adds the secret mask $s \\pmod{2^{128}}$. Because $(r, s)$ is unique for every record, it provides provable information-theoretic authentication security.",
    hint: "A high-speed mathematical polynomial calculated over a special prime number to create a 128-bit seal.",
    level: "Expert",
    codeExample: `// Poly1305 Tag Formula:
// Tag = ( (m_1*r^k + m_2*r^(k-1) + ... + m_k*r) mod (2^130 - 5) + s ) mod 2^128`
  },
  {
    id: 20,
    question: "What is the total wire overhead added by a TLS 1.3 record compared to a TLS 1.2 CBC record?",
    shortAnswer: "TLS 1.3 adds a fixed 22 Bytes (5B outer header + 1B inner content type + 16B AEAD tag); TLS 1.2 CBC added 29 to 48 Bytes (5B header + 16B explicit IV + 20B/32B HMAC + variable padding).",
    explanation: "TLS 1.3 significantly reduced record overhead by eliminating explicit IVs and MAC-then-Encrypt padding, saving bandwidth and reducing packet fragmentation risks across MTU boundaries.",
    hint: "TLS 1.3 adds just 22 bytes of fixed overhead; TLS 1.2 added up to 48 bytes.",
    level: "Basic",
    codeExample: `// Record Overhead Comparison:
// TLS 1.2 CBC Record : 5B (Header) + 16B (IV) + 20B (HMAC-SHA1) + 12B (Padding) = 53 Bytes!
// TLS 1.3 AEAD Record: 5B (Header) + 1B (InnerType) + 16B (AEAD Tag) = 22 Bytes (60% smaller!)`
  },
  {
    id: 21,
    question: "How do 'SmartNICs' offload TLS Record Layer processing at 100 Gbps line rate?",
    shortAnswer: "SmartNIC ASICs decrypt AEAD AES-GCM records, verify authentication tags, and perform TCP reassembly directly inside the network card hardware before transferring cleartext payloads into host RAM via DMA.",
    explanation: "Decrypting hundreds of thousands of TLS records in software consumes immense CPU cycles. Hardware TLS offload in SmartNICs (e.g., NVIDIA BlueField or Mellanox ConnectX) processes cryptography at wire speed with 0% host CPU utilization.",
    hint: "The network card hardware decrypts all records before passing clear data to the computer's memory.",
    level: "Moderate",
    codeExample: `// Linux kTLS (Kernel TLS) Hardware Offload Command:
$ ethtool -K eth0 tls-hw-tx-offload on
$ ethtool -K eth0 tls-hw-rx-offload on`
  },
  {
    id: 22,
    question: "What is 'Kernel TLS' (kTLS) in Linux and how does it eliminate user-space context switching overhead?",
    shortAnswer: "kTLS moves the TLS Record Layer encryption and decryption directly into the Linux kernel socket layer (`TCP_ULP`), allowing the `sendfile()` system call to stream encrypted data directly from NVMe disks to network cards with zero memory copies.",
    explanation: "Traditionally, an HTTP web server read cleartext from disk, copied it to user-space memory, called OpenSSL to encrypt, and copied ciphertext back to the kernel. kTLS allows the kernel to encrypt data in-place as it leaves the TCP buffer, delivering 2x to 3x higher web server throughput.",
    hint: "Letting the operating system kernel handle the record encryption directly to avoid copying data back and forth.",
    level: "Expert",
    codeExample: `// Enabling kTLS on a Linux TCP Socket:
// setsockopt(fd, SOL_TCP, TCP_ULP, "tls", sizeof("tls"));
// setsockopt(fd, SOL_TLS, TLS_TX, &crypto_info, sizeof(crypto_info));`
  },
  {
    id: 23,
    question: "How does the 'AEAD Decrypt' routine process an incoming TLS 1.3 record?",
    shortAnswer: "1. Reads 5-byte outer header; 2. Derives 96-bit Nonce ($IV \\oplus \\text{Seq}$); 3. Verifies 16-byte AEAD tag over ciphertext and outer header AAD; 4. Decrypts ciphertext; 5. Scans backwards from the end of plaintext to strip zero-padding; 6. Extracts the 1-byte Real Content Type.",
    explanation: "If the AEAD tag fails verification, the packet is discarded immediately without scanning padding. If tag verification passes, the receiver strips trailing `0x00` bytes until it encounters the first non-zero byte, which is the real inner content type (e.g., 23 for AppData).",
    hint: "Verify tag ➔ Decrypt ➔ Remove zero-padding ➔ Read the true message type.",
    level: "Expert",
    codeExample: `// AEAD Record Decryption Step:
// 1. Verify Tag & Decrypt: inner_plaintext = AEAD_Decrypt(Key, Nonce, Ciphertext, AAD=Header)
// 2. Strip Padding: Strip 0x00 bytes from end until non-zero byte found
// 3. Extract Type: real_content_type = last_non_zero_byte`
  },
  {
    id: 24,
    question: "Why is 'Constant-Time' implementation mandatory for all TLS Record Layer cryptographic operations?",
    shortAnswer: "To prevent Side-Channel Timing Attacks (like Lucky 13), where an attacker measures microsecond variations in decryption time to determine whether padding was valid or corrupted, gradually extracting secret plaintext.",
    explanation: "If a software decryption routine exits early when an invalid padding byte is found, the execution time is shorter than when padding is valid. Attackers measure these timing differences across network packets. Constant-time algorithms execute the exact same number of CPU cycles regardless of data contents.",
    hint: "Making sure the computer takes the exact same number of milliseconds every time so timing cannot leak secrets.",
    level: "Expert",
    codeExample: `// Constant-Time Comparison in C:
// int constant_time_memcmp(const void *a, const void *b, size_t len) {
//     const unsigned char *pa = a, *pb = b;
//     unsigned char diff = 0;
//     for (size_t i = 0; i < len; i++) diff |= pa[i] ^ pb[i];
//     return diff == 0;
// }`
  },
  {
    id: 25,
    question: "What is 'Galois Field GHASH' and how does it compute the 128-bit authentication tag in AES-GCM?",
    shortAnswer: "GHASH evaluates a polynomial over the binary finite field $\\text{GF}(2^{128})$ where message blocks are treated as coefficients multiplied by powers of the secret hash key $H = \\text{AES}_K(0)$, adding the encrypted counter $J_0$ at the end.",
    explanation: "GHASH is designed for parallel hardware acceleration using carry-less multiplication (`PCLMULQDQ` CPU instruction). It processes 128-bit blocks in a single CPU cycle, providing authenticated integrity protection at multi-gigabit speeds.",
    hint: "A fast mathematical polynomial formula calculated inside CPU hardware using carry-less multiplication.",
    level: "Expert",
    codeExample: `// GHASH Tag Formula:
// Tag = GHASH(H, AAD, Ciphertext) XOR AES_K(J_0)`
  },
  {
    id: 26,
    question: "How does the 'KeyUpdate' handshake message change Record Layer encryption keys on the fly?",
    shortAnswer: "When a `KeyUpdate` message is exchanged, both peers compute $\\text{traffic\\_secret}_{N+1} = \\text{HKDF-Expand-Label}(\\text{traffic\\_secret}_N, \\text{'traffic upd'}, \\text{''}, \\text{Hash.length})$, derive fresh AES keys and IVs, and reset the 64-bit sequence counter to zero.",
    explanation: "This allows long-lived connections (such as database replication streams or WebSocket channels) that transfer terabytes of data to refresh encryption keys periodically without tearing down the connection or performing asymmetric Diffie-Hellman math.",
    hint: "Rolling encryption keys forward seamlessly during an active multi-gigabyte file transfer.",
    level: "Moderate",
    codeExample: `// Rolling Traffic Keys Forward:
// next_secret = HKDF-Expand-Label(current_app_secret, "traffic upd", "", 32)
// next_key    = HKDF-Expand-Label(next_secret, "key", "", 32)
// next_iv     = HKDF-Expand-Label(next_secret, "iv", "", 12)
// sequence_number = 0`
  },
  {
    id: 27,
    question: "How do you detect packet truncation or MTU fragmentation issues at the TLS Record Layer?",
    shortAnswer: "By monitoring for TCP reassembly delays, watching for `SSL_ERROR_WANT_READ` pauses in application logs, and checking if TLS record lengths exceed the network Path MTU ($1500\\text{B} - 40\\text{B TCP/IP} = 1460\\text{B}$).",
    explanation: "When a 16 KB TLS record is transmitted, it spans ~11 Ethernet frames. If intermediate routers drop fragments, the entire record fails to assemble, causing connection hangs. Configuring dynamic record sizing solves this issue.",
    hint: "Watching for packet assembly delays when records are larger than the network MTU.",
    level: "Moderate",
    codeExample: `// MTU-Safe Initial Record Size:
// MSS = 1460 Bytes ➔ Set Initial TLS Record Plaintext to 1380 Bytes (Fits inside 1 single Ethernet frame!)`
  },
  {
    id: 28,
    question: "What is the difference between 'AES-CCM' and 'AES-GCM' in the TLS 1.3 Record Layer?",
    shortAnswer: "AES-GCM uses Galois Field multiplication for authentication (high speed on modern CPUs with AES-NI); AES-CCM uses CBC-MAC for authentication (designed for low-power IoT microcontrollers lacking Galois hardware).",
    explanation: "AES-CCM (Counter with CBC-MAC) is standardized in TLS 1.3 (`TLS_AES_128_CCM_SHA256`) specifically for constrained embedded devices (such as smart electricity meters in West Bengal) that have simple AES hardware accelerators but lack GF(2^128) multipliers.",
    hint: "AES-GCM is for fast servers and PCs; AES-CCM is for small, low-power IoT smart meters.",
    level: "Moderate",
    codeExample: `// AES-CCM Cipher Suite in TLS 1.3:
// TLS_AES_128_CCM_SHA256 (Optimized for 8-bit / 32-bit embedded IoT microcontrollers)`
  },
  {
    id: 29,
    question: "How does the 'Alert Protocol' interact with the Record Layer during an orderly connection shutdown?",
    shortAnswer: "The application calls `SSL_shutdown()`, which causes the Record Layer to encapsulate a `close_notify` alert into an encrypted record and transmit it over TCP; the peer replies with its own `close_notify` record before closing the socket.",
    explanation: "This bidirectional exchange ensures that both parties agree that all data was received in full. If a connection drops without receiving `close_notify`, the application is alerted to a possible network truncation or active connection reset attack.",
    hint: "Both sides send a polite, encrypted goodbye message before closing the phone call.",
    level: "Basic",
    codeExample: `// Orderly Two-Way Shutdown:
// Client ──(Encrypted Record: close_notify)──> Server
// Server ──(Encrypted Record: close_notify)──> Client
// Both sides call close(socket_fd);`
  },
  {
    id: 30,
    question: "What is the definitive production checklist for tuning and securing the TLS Record Layer?",
    shortAnswer: "1. Enforce AEAD ciphers ONLY (AES-GCM or ChaCha20-Poly1305); 2. Enable Dynamic Record Sizing (DRS) on web servers; 3. Enable Zero-Padding on sensitive API responses to thwart traffic analysis; 4. Deploy Linux kTLS on high-traffic reverse proxies; 5. Never enable TLS-level compression.",
    explanation: "This five-point checklist guarantees optimal record throughput, sub-second mobile rendering performance, and complete defense against metadata leakage and side-channel attacks.",
    hint: "AEAD only + Dynamic Record Sizing + Zero-Padding for privacy + kTLS offload + No compression.",
    level: "Basic",
    codeExample: `// Master TLS Record Layer Checklist:
// [✔] Cipher Mode     : 100% AEAD (AES-GCM & ChaCha20-Poly1305)
// [✔] Performance     : Dynamic Record Sizing Enabled (1360B initial ➔ 16KB stream)
// [✔] Privacy         : Record Padding Enabled on JSON APIs
// [✔] Kernel Offload  : Linux kTLS Enabled (sendfile zero-copy)
// [✔] Compliance      : TLS Compression 100% Disabled`
  }
];

export default questions;
