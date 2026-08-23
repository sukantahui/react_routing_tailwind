const questions = [
  {
    question: "What is an Active Replay Attack, and why can it succeed even when messages are 100% strongly encrypted?",
    shortAnswer: "An attacker captures a valid encrypted message in transit and re-transmits it later; the receiving server accepts and executes the valid ciphertext a second time without needing to decrypt it.",
    explanation: "Replay attacks bypass encryption entirely because the attacker does not need to read or alter the payload. If Mamata sends an encrypted request `Transfer ₹50,000 to Debangshu`, the attacker simply captures the ciphertext packet and replays it 10 times to the bank server. If the server lacks anti-replay nonces or timestamps, it decrypts 10 valid transfers, draining Mamata's account.",
    hint: "Photocopying a valid cinema ticket: the barcode is authentic, but it gets used twice.",
    level: "basic",
    codeExample: `// Replay Attack Threat Flow:
// Time 1: Mamata -> Bank: Encrypt("Transfer ₹50,000 to Debangshu") [Executed]
// Time 2: Attacker -> Bank: Encrypt("Transfer ₹50,000 to Debangshu") [Replayed & Executed AGAIN!]`
  },
  {
    question: "How does a Cryptographic Nonce (Number Used Once) prevent Replay Attacks?",
    shortAnswer: "A nonce is a unique, single-use random value included in the message; the server tracks used nonces and rejects any request containing a previously seen nonce.",
    explanation: "In challenge-response protocols, the server sends a unique 128-bit random nonce $R$. The client signs or hashes the payload with $R$. When the response arrives, the server checks that $R$ matches and immediately marks $R$ as burned/invalid. If an attacker replays the message, the server rejects it because the nonce has already been consumed.",
    hint: "A one-time lottery ticket number that gets permanently stamped and shredded upon redemption.",
    level: "moderate",
    codeExample: `// Redis Nonce Caching in Node.js:
async function verifyNonce(nonce) {
  const isSet = await redis.set(\`nonce:\${nonce}\`, "1", "NX", "EX", 300); // 5 min TTL
  if (!isSet) {
    throw new SecurityError("Replay Attack Detected! Nonce already used.");
  }
}`
  },
  {
    question: "How does Timestamp-Based Anti-Replay Protection operate, and why does it require synchronized clocks?",
    shortAnswer: "Every message includes the sender's current UTC timestamp; the receiver accepts the message only if $|t_{recv} - t_{msg}| \\le \\Delta t_{skew}$ and caches nonces within that window.",
    explanation: "To prevent storing nonces indefinitely in memory, systems define an acceptance window $\\Delta t$ (e.g. 5 minutes). The server drops any packet with a timestamp older than 5 minutes. For messages within the 5-minute window, the server checks a fast in-memory cache of nonces. This requires millisecond-accurate clock synchronization via NTP (e.g. CERT-In NPL India mandate).",
    hint: "Setting an expiration date of 5 minutes on milk: anything older is thrown away immediately.",
    level: "moderate",
    codeExample: `// Timestamp Window Verification:
const MAX_SKEW_MS = 300000; // 5 Minutes
const currentTime = Date.now();
if (Math.abs(currentTime - requestTimestamp) > MAX_SKEW_MS) {
  throw new SecurityError("Timestamp Expired: Message rejected outside valid time window.");
}`
  },
  {
    question: "How does the IPsec Sliding Window Anti-Replay Algorithm (RFC 4303) operate?",
    shortAnswer: "IPsec assigns monotonically increasing sequence numbers and maintains a 64-bit or 128-bit bitmap representing the window of recently received sequence numbers.",
    explanation: "In IPsec ESP, every packet carries a 32-bit or 64-bit sequence counter. The receiver tracks $Seq_{max}$ and a bitmap: 1. If $Seq > Seq_{max}$, the window slides right, setting $Seq_{max} = Seq$. 2. If $Seq \\le Seq_{max} - W$ (too old), the packet is dropped. 3. If $Seq$ falls inside the window, the receiver checks the bitmap bit: if bit == 1 (already seen), drop as duplicate; if bit == 0, mark bit and accept.",
    hint: "A moving 64-slot conveyor belt: if a box arrives with a number already checked on the belt, it gets thrown in the trash.",
    level: "expert",
    codeExample: `// IPsec 64-Packet Anti-Replay Window Logic:
if (seq > max_seq) {
    bitmap = bitmap << (seq - max_seq);
    bitmap |= 1;
    max_seq = seq;
} else if (seq <= max_seq - 64) {
    return DROP_TOO_OLD;
} else {
    int bit_index = max_seq - seq;
    if (bitmap & (1ULL << bit_index)) return DROP_DUPLICATE_REPLAY;
    bitmap |= (1ULL << bit_index); // Mark as received
}`
  },
  {
    question: "What is the 'Rolljam' Attack on Wireless Vehicle Keyfobs & Garage Doors?",
    shortAnswer: "A dual-frequency SDR attack that jams the vehicle receiver while recording the user's rolling-code transmission, storing valid unused codes for future replay.",
    explanation: "Automotive keyfobs use rolling codes (Keeloq) where each button press increments a counter. Samy Kamkar's Rolljam uses two radios: Radio 1 broadcasts RF noise jamming the car, while Radio 2 records the keyfob's transmission. The user presses the button a second time; Rolljam captures the second code and transmits the first code (unlocking the car). The attacker now holds the valid, unused second rolling code to unlock the car later.",
    hint: "Blocking the mailbox while grabbing the letter, handing the owner a replacement, and keeping the spare key.",
    level: "expert",
    codeExample: `// Rolljam Exploitation Sequence:
// Press 1: Keyfob sends Code_101 -> Jammer blocks car, captures Code_101
// Press 2: Keyfob sends Code_102 -> Jammer captures Code_102, transmits Code_101 (Car unlocks)
// Later   : Attacker transmits captured Code_102 -> Car accepts valid rolling code!`
  },
  {
    question: "How does Kerberos utilize Authenticator Timestamps to defeat Ticket Replay Attacks?",
    shortAnswer: "Clients encrypt a fresh timestamp in an Authenticator using the session key; the Service Ticket is accepted only if the timestamp is within 5 minutes and unique.",
    explanation: "In Kerberos V5, presenting a stolen Service Ticket alone is insufficient. The client must also send an `Authenticator` containing the client's current timestamp encrypted with the shared session key $K_{C,S}$. The server decrypts the Authenticator and verifies $|t_{now} - t_{auth}| \\le 5\\text{ min}$ against its Replay Cache. If an attacker replays the ticket and authenticator, the replay cache rejects it.",
    hint: "Showing your ticket alongside a fresh selfie holding today's newspaper.",
    level: "expert",
    codeExample: `// Kerberos Ticket + Authenticator Struct:
// AP-REQ = [ Ticket (Encrypted with Server Key) ] + [ Authenticator (Encrypted with Session Key) ]
// Authenticator = { ClientName: "Mamata", Timestamp: 1724398120, Microseconds: 452100 }`
  },
  {
    question: "How does OAuth 2.0 PKCE (Proof Key for Code Exchange - RFC 7636) prevent Authorization Code Replay?",
    shortAnswer: "The client generates a secret Code Verifier and sends its SHA-256 hash (Code Challenge) during login; the authorization code can only be redeemed by presenting the original verifier.",
    explanation: "In public mobile/SPA clients, an attacker with a rogue URL scheme handler could intercept the Authorization Code in transit. PKCE eliminates this: the client generates $V = \\text{Random}(128)$, sends $C = \\text{SHA256}(V)$ to the auth server. When exchanging the code for a token, the client sends the raw verifier $V$. The auth server verifies $\\text{SHA256}(V) == C$. An intercepting attacker lacks $V$ and cannot redeem the code.",
    hint: "Creating a secret riddle during login and requiring the original secret answer to redeem the prize.",
    level: "expert",
    codeExample: `// PKCE Code Challenge Generation:
const codeVerifier = crypto.randomBytes(32).toString('base64url');
const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
// Auth Request : /authorize?code_challenge=CODE_CHALLENGE&code_challenge_method=S256
// Token Request: /token?code=AUTH_CODE&code_verifier=CODE_VERIFIER`
  },
  {
    question: "Under CERT-In Directives (April 2022), what is the statutory requirement for Network Clock Synchronization across Indian enterprises?",
    shortAnswer: "All organizations in India must synchronize ICT system clocks with Indian Standard Time (IST) via National Physical Laboratory (NPL) or NIC NTP servers.",
    explanation: "Because anti-replay timestamp verification and forensic log correlation fail if server clocks drift, CERT-In mandates synchronization with official atomic clocks (`samay1.nic.in`, `samay2.nic.in` operated by NPL India). System time drift must not exceed millisecond tolerances to ensure legal admissibility of forensic logs.",
    hint: "Every server in India must synchronize its clock with the official atomic clock in New Delhi.",
    level: "moderate",
    codeExample: `// Linux Chrony NTP Configuration (NPL India):
server samay1.nic.in iburst prefer
server samay2.nic.in iburst
makestep 1.0 3`
  },
  {
    question: "What is a Bloom Filter, and how is it used in high-throughput Anti-Replay engines?",
    shortAnswer: "A space-efficient probabilistic data structure that tests whether a nonce has been seen before in O(k) time using multiple hash functions and a bit array.",
    explanation: "At 40 Gbps line rate, storing millions of 128-bit nonces in a traditional hash table consumes gigabytes of RAM. A Bloom Filter uses an $m$-bit vector and $k$ independent hash functions ($H_1, H_2, \\dots, H_k$). Checking and inserting nonces requires only setting $k$ bits in memory with zero false negatives ($P(\\text{miss}) = 0$), discarding duplicate replays instantly at hardware line rate.",
    hint: "A fast, memory-saving checklist that tells you instantly if you have never seen a number before.",
    level: "expert",
    codeExample: `// Bloom Filter Nonce Lookup:
// Hashes: h1 = Murmur3(nonce), h2 = FNV1a(nonce), h3 = CityHash(nonce)
// If BitArray[h1] == 1 AND BitArray[h2] == 1 AND BitArray[h3] == 1 -> Possible Duplicate!
// Else -> Guaranteed Fresh! Insert and proceed.`
  },
  {
    question: "How does DNP3 Secure Authentication (SAv5) prevent SCADA command replay attacks on electrical power grids?",
    shortAnswer: "Every critical command generates an aggressive challenge-response cycle using an incrementing Sequence Number and a cryptographically random challenge nonce.",
    explanation: "In power grid substations (e.g. Barrackpore 220kV Grid), replaying an old 'Trip Breaker' command could cause a catastrophic blackout. Under IEC 62351-5 (DNP3 SAv5), the outstation maintains a monotonic Sequence Counter. The master must sign $(SeqNum \\parallel Nonce \\parallel Command)$ using HMAC-SHA256. Replayed commands with old sequence numbers are dropped immediately.",
    hint: "A high-voltage switch that checks the serial number and timestamp of every command before throwing the lever.",
    level: "expert",
    codeExample: `// DNP3 SAv5 Anti-Replay Challenge Struct:
// Outstation -> Master: Challenge(SequenceNumber=402, Nonce=0x8a9e...4e1b)
// Master -> Outstation: Response(HMAC_K(SeqNum || Nonce || Command="TRIP_BREAKER_14"))`
  },
  {
    question: "What is an HTTP Idempotency Key (RFC 9440), and how does it prevent duplicate financial charge replays in REST APIs?",
    shortAnswer: "Clients include an `Idempotency-Key: UUIDv4` header in POST requests; payment gateways cache the response and return the saved result if the request is replayed.",
    explanation: "If a mobile network disconnects during a UPI payment, the app might retry the payment request. In an active replay attack, an attacker re-submits the POST request. The payment gateway stores `Idempotency-Key: <uuid>` in Redis for 24 hours. If the same key is received, the server does not execute a second debit; it returns the cached receipt from the first execution.",
    hint: "A unique receipt number generated before the transaction: duplicate requests return the same receipt without double charging.",
    level: "moderate",
    codeExample: `// Express.js Idempotency Middleware:
app.post('/api/pay', async (req, res) => {
  const key = req.headers['idempotency-key'];
  const cached = await redis.get(\`idemp:\${key}\`);
  if (cached) return res.json(JSON.parse(cached)); // Returns previous receipt
  
  const result = await processPayment(req.body);
  await redis.set(\`idemp:\${key}\`, JSON.stringify(result), 'EX', 86400);
  res.json(result);
});`
  },
  {
    question: "How does TLS 1.3 0-RTT (Early Data) introduce a Replay Vulnerability, and how is it mitigated?",
    shortAnswer: "0-RTT sends encrypted application data in the initial ClientHello before the handshake finishes; adversaries can replay the 0-RTT flight to duplicate non-idempotent actions.",
    explanation: "In TLS 1.3 0-RTT resumption, the client transmits early data using a pre-shared key (PSK) ticket. An eavesdropper can capture the initial flight and replay it to the server. If the early data is a `POST /transfer` request, the server might execute it twice. Mitigations: 1. Disallow 0-RTT for non-idempotent HTTP methods (allow only GET); 2. Enforce Single-Use Tickets and ClientHello timestamp tracking.",
    hint: "Fast-pass tickets allow cutting in line, but scammers can try to copy the fast-pass ticket.",
    level: "expert",
    codeExample: `// Nginx TLS 1.3 Anti-0-RTT Replay Configuration:
ssl_early_data on;
proxy_set_header Early-Data $ssl_early_data;
# In Application: Drop POST requests if Early-Data header == "1"`
  },
  {
    question: "What is the mathematical Birthday Collision Bound for 64-bit vs 128-bit Anti-Replay Nonces?",
    shortAnswer: "64-bit nonces risk collision after ~4 billion requests (2^32), whereas 128-bit nonces guarantee collision safety up to ~18 quintillion requests (2^64).",
    explanation: "Using the Birthday Paradox formula $k \\approx \\sqrt{2 \\cdot 2^n \\cdot \\ln(1 / (1 - P))}$, a 64-bit random nonce has a 50% probability of colliding after only $k \\approx 1.17 \\times 2^{32} \\approx 5 \\times 10^9$ requests. In a multi-gigabit financial switch in Kolkata processing 100,000 transactions/sec, 64-bit nonces collide within hours. Modern architectures require 128-bit or 256-bit CSPRNG nonces.",
    hint: "64-bit numbers run out of room quickly on high-speed internet backbones; 128-bit numbers last forever.",
    level: "expert",
    codeExample: `// Nonce Space Security Bounds:
// 64-bit Nonce  : 50% Collision Risk at ~4.3 Billion Requests (Vulnerable to Birthday Attacks)
// 128-bit Nonce : 50% Collision Risk at ~1.84 x 10^19 Requests (Mathematically Unbreakable)`
  },
  {
    question: "How does Single Sign-On (SAML 2.0 / OIDC) protect against Assertion Replay Attacks?",
    shortAnswer: "SAML assertions include `ID`, `IssueInstant`, `NotOnOrAfter`, and `Recipient` attributes; service providers reject expired assertions or already-seen Assertion IDs.",
    explanation: "When an Identity Provider (IdP) issues an XML SAML assertion, an attacker could intercept the POST body and replay it to another service provider. SAML mandates: 1. `NotOnOrAfter`: Strict 2-minute validity window; 2. `Recipient`: Assertion is bound to the SP's exact entity URL; 3. Assertion ID Cache: The SP caches the unique assertion `ID` to reject duplicate submissions.",
    hint: "A digital boarding pass that expires in 2 minutes and contains your specific destination airport.",
    level: "moderate",
    codeExample: `// SAML 2.0 Anti-Replay Assertion Conditions:
<saml:Conditions NotBefore="2026-08-23T10:00:00Z" NotOnOrAfter="2026-08-23T10:05:00Z">
    <saml:AudienceRestriction>
        <saml:Audience>https://portal.kolkatabank.in/saml/sp</saml:Audience>
    </saml:AudienceRestriction>
</saml:Conditions>`
  },
  {
    question: "Under the Indian IT Act 2000 Section 66, what criminal liability attaches to executing an automated replay attack on a banking gateway?",
    shortAnswer: "Imprisonment up to 3 years and a fine up to ₹5 Lakhs for dishonestly or fraudulently causing wrongful loss or unauthorized alteration of computer data.",
    explanation: "Replaying valid transaction packets to duplicate financial debits constitutes criminal hacking under Section 66 ('Computer Related Offences') and cheating under Section 66D ('Cheating by Personation'). The perpetrator faces up to 3 years rigorous imprisonment, ₹5 Lakh in fines, and civil restitution under Section 43.",
    hint: "Section 66 covers criminal penalties for unauthorized replay attacks and hacking.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66):
// Offense: Executing automated replay attacks to duplicate payments or access accounts
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is a 'Cut-and-Paste' Replay Attack in unauthenticated CBC mode encryption?",
    shortAnswer: "An attacker swaps or replays individual 16-byte ciphertext blocks between different encrypted messages without decrypting them, altering message semantics.",
    explanation: "In CBC mode without an integrity tag (AEAD), each ciphertext block depends only on the previous ciphertext block. An attacker can cut block 3 from Message A (containing 'admin=true') and paste it into block 3 of Message B. Decryption will scramble block 3, but block 4 will decrypt cleanly, executing privileged operations.",
    hint: "Cutting words out of one magazine and gluing them into a ransom letter.",
    level: "expert",
    codeExample: `// CBC Cut-and-Paste Attack:
// Message 1: [Header Block] [UserData Block] [Role=Admin Block]
// Message 2: [Header Block] [UserData Block] [Role=User  Block]
// Attack   : Replace Message 2's 3rd block with Message 1's 3rd block!
// Defense  : Enforce AEAD (AES-256-GCM) so altering blocks breaks the authentication tag.`
  },
  {
    question: "How does Secure RPC (RFC 5531) utilize Monotonic Sequence Timestamps to prevent RPC Replay?",
    shortAnswer: "RPC request headers include a timestamp and a 32-bit window verifier; the server rejects any RPC call whose timestamp is smaller than the last recorded timestamp for that client.",
    explanation: "In UNIX Network File System (NFS) and Secure RPC with `AUTH_DES` or `AUTH_GSS`, the client encrypts a timestamp with the conversation key. The NFS server tracks the highest timestamp seen for that client credential ($t_{last}$). If an attacker replays an NFS `DELETE /file` RPC call, the timestamp is $\\le t_{last}$, and the server discards the duplicate.",
    hint: "A bank ledger where every entry must have a strictly higher check number than the previous entry.",
    level: "moderate",
    codeExample: `// Secure RPC Verifier Check:
if (rpc_header.timestamp <= client_session.last_seen_timestamp) {
    return RPC_AUTHERROR_REPLAYED; // Drop duplicate call
}
client_session.last_seen_timestamp = rpc_header.timestamp;`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, how does Replay Protection support data security obligations?",
    shortAnswer: "Section 8(5) mandates reasonable security safeguards to prevent data corruption and unauthorized reprocessing of citizen transactions, avoiding penalties up to ₹250 Crores.",
    explanation: "Failing to implement anti-replay safeguards on healthcare (e.g. duplicate diagnostic prescriptions) or banking portals can cause unauthorized financial extraction or medical harm to Indian citizens. The Data Protection Board of India (DPBI) treats unmitigated replay vulnerabilities as gross architectural negligence under Section 33.",
    hint: "Preventing duplicate unauthorized processing is a statutory requirement under national privacy laws.",
    level: "moderate",
    codeExample: `// DPDP Anti-Replay Architecture Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Architecture : Mandatory Cryptographic Nonce + 300s Timestamp Sliding Windows on all citizen APIs`
  },
  {
    question: "What is an NTP Amplification Attack, and why does securing NTP infrastructure matter for Anti-Replay defenses?",
    shortAnswer: "Attackers spoof victim IPs to flood NTP servers with `monlist` queries, amplifying traffic to crash NTP servers; without synchronized NTP, timestamp-based anti-replay systems fail.",
    explanation: "Timestamp-based anti-replay defenses depend entirely on accurate network clocks. If an attacker disables NTP servers via UDP amplification attacks or poisons NTP packets (causing server clocks to drift hours into the past or future), timestamp validation windows fail, either causing Denial of Service or allowing replayed historical messages to be accepted.",
    hint: "Breaking the church clock tower so no one knows if an expired coupon is valid.",
    level: "expert",
    codeExample: `// NTP Hardening Configuration (ntp.conf):
restrict default nomodify notrap nopeer noquery
restrict 127.0.0.1
disable monitor # Disables vulnerable monlist command`
  },
  {
    question: "Synthesize an enterprise Anti-Replay Defense Blueprint that guarantees zero duplicate packet processing across all network and application layers.",
    shortAnswer: "A Defense-in-Depth model combining IPsec 128-packet sliding windows (L3), TLS 1.3 record sequence counters (L4/L7), Redis TTL nonces with Idempotency Keys (API), and NPL India NTP synchronization.",
    explanation: "To achieve complete immunity against replay: 1. Network Layer: IPsec ESP with 128-packet Anti-Replay sliding bitmap filters. 2. Transport Layer: TLS 1.3 with monotonic record sequence numbers and restricted 0-RTT early data. 3. API Layer: Unique `Idempotency-Key` (UUIDv4) and HMAC nonces cached in Redis with 300s TTL. 4. Time Infrastructure: Microsecond clock synchronization via NPL India NTP servers (`samay1.nic.in`).",
    hint: "Slide the window at the network level, seal sequence counters in TLS, cache nonces in Redis, and synchronize all clocks with the national atomic standard.",
    level: "expert",
    codeExample: `// Master Enterprise Anti-Replay Blueprint:
// 1. Layer 3 (IPsec) : ESP Anti-Replay Sliding Window (128-packet bitmap)
// 2. Layer 4 (TLS)   : TLS 1.3 Monotonic 64-bit Record Sequence Counters
// 3. Layer 7 (APIs)  : Idempotency-Key (UUIDv4) + Microsecond Timestamp + Redis TTL Cache
// 4. Time Sync       : CERT-In Mandated NPL India NTP (samay1.nic.in / samay2.nic.in)`
  },
  {
    question: "How does the Needham-Schroeder Symmetric Key Protocol suffer from a Replay Flaw, and how did Denning-Sacco fix it?",
    shortAnswer: "Needham-Schroeder lacked a timestamp in Message 3, allowing an attacker with a compromised old session key to replay Ticket B to Bob; Denning-Sacco added timestamps to the ticket.",
    explanation: "In 1978, Needham and Schroeder published their key distribution protocol. In 1981, Dorothy Denning and Giovanni Sacco proved that if an old session key $K_{AB}$ was ever compromised, an attacker could replay the old Ticket $E_{K_B}(K_{AB}, A)$ to Bob at any time in the future, masquerading as Alice. Denning-Sacco patched the protocol by adding a timestamp inside the encrypted ticket: $E_{K_B}(K_{AB}, A, T)$.",
    hint: "Stamping the expiration date directly inside the encrypted seal so old tickets cannot be reused years later.",
    level: "expert",
    codeExample: `// Denning-Sacco Anti-Replay Fix:
// Flawed Message 3: Ticket_B = E_Kb( SessionKey, Alice_ID ) -> Vulnerable to replay forever!
// Patched Message 3: Ticket_B = E_Kb( SessionKey, Alice_ID, Timestamp_T ) -> Drops expired tickets!`
  },
  {
    question: "What is an SSDP / UPnP Replay Attack on Smart Home and IoT Devices?",
    shortAnswer: "Capturing cleartext UDP UPnP XML commands (e.g. 'SetTargetTemperature' or 'UnlockDoor') on a local Wi-Fi network and replaying them to IoT appliances.",
    explanation: "Many consumer smart devices (smart bulbs, smart locks, CCTV cameras) use Universal Plug and Play (UPnP) over UDP port 1900 without authentication. An attacker connected to guest Wi-Fi captures the SSDP M-SEARCH or SOAP XML action and replays the UDP packet to actuate physical relays or disable alarms without needing any device passwords.",
    hint: "Recording the infrared remote control signal of a TV and playing it back with a gadget.",
    level: "moderate",
    codeExample: `// Replayed UPnP SOAP XML Command:
POST /upnp/control/basicevent1 HTTP/1.1
Host: 192.168.1.150:49153
SOAPACTION: "urn:Belkin:service:basicevent:1#SetBinaryState"
// Payload: <BinaryState>1</BinaryState> (Turns smart plug ON/OFF on replay)`
  },
  {
    question: "How does Monotonic Counter Hardware in Trusted Platform Modules (TPM 2.0) prevent offline rollback/replay attacks?",
    shortAnswer: "TPM hardware increments an internal non-volatile counter that can never be decremented; firmware updates verify the counter to reject replayed older vulnerable firmware versions.",
    explanation: "Attackers often attempt 'Downgrade Replay Attacks' by flashing an older, vulnerable version of OS kernel or BIOS that contains known exploits. The TPM 2.0 chip maintains hardware monotonic counters. When a new kernel is installed, the counter increments. If an attacker flashes an older image, the TPM detects that the image counter is lower than the hardware register and halts boot.",
    hint: "An odometer in a car that can only count forward and physically refuses to roll backwards.",
    level: "expert",
    codeExample: `// TPM 2.0 Monotonic Counter Call:
TPM2_NV_Increment(counter_nv_index);
// Returns TPM_RC_SUCCESS; counter permanently increments and cannot be rolled back`
  },
  {
    question: "What is a BLE (Bluetooth Low Energy) Replay Attack on Smart Locks, and how do Ephemeral Rolling Nonces prevent it?",
    shortAnswer: "Capturing unencrypted BLE advertising packets and replaying them to unlock doors; modern locks require the phone and lock to exchange randomized ephemeral session keys.",
    explanation: "Cheap smart padlocks transmit static BLE write commands (`0x01 0xFF 0xAA`) to unlock. An attacker recording BLE packets with a smartphone captures the hex string and replays it. Secure smart locks use Bluetooth mesh with AES-CCM authenticated encryption and 128-bit randomized challenge nonces generated anew for every single unlock session.",
    hint: "A door lock that changes its secret combination every single time the handle is touched.",
    level: "moderate",
    codeExample: `// BLE Packet Replay Capture (gatttool):
gatttool -b AA:BB:CC:DD:EE:FF --char-write-req -a 0x002e -n 0100 # Replays static unlock command
# Defense: Enforce AES-128-CCM with ephemeral session nonces`
  },
  {
    question: "How do TCP SYN Cookies prevent SYN Flood exhaustion while preserving Anti-Replay defenses?",
    shortAnswer: "The server encodes the connection state and Initial Sequence Number (ISN) into a cryptographic hash: ISN = PRF(src_ip, src_port, dst_ip, dst_port, time_counter) without allocating memory.",
    explanation: "When attacked by millions of SYN packets, a server enabling SYN Cookies does not allocate memory for half-open sockets. Instead, it generates a cryptographically hashed ISN containing a 3-bit MSS index and a 6-minute time counter. When the client's ACK arrives, the server checks the formula. If the time counter is expired or replayed outside 6 minutes, the connection is dropped.",
    hint: "Handing out a numbered cloakroom ticket instead of reserving a giant table before the guest arrives.",
    level: "expert",
    codeExample: `// Linux TCP SYN Cookies Activation:
sysctl -w net.ipv4.tcp_syncookies=1
# Encodes (t, MSS, Cryptographic Hash) into the 32-bit TCP Sequence Number`
  },
  {
    question: "What is an ARP Cache Poisoning Replay attack, and how does it differ from active ARP generation?",
    shortAnswer: "An attacker captures valid gratuitous ARP packets previously broadcast by a decommissioned or offline server and replays them to divert traffic to a dead IP address.",
    explanation: "Instead of crafting new ARP packets, an attacker replays recorded ARP frames from a previously decommissioned backup gateway or server. Subnet switches update their MAC learning tables, directing traffic to non-existent or attacker-controlled switch ports, causing local network disruption.",
    hint: "Putting an old 'Detour' road sign back on the highway after the road construction is finished.",
    level: "moderate",
    codeExample: `# Replay PCAP Capture of ARP frames:
tcpreplay -i eth0 -K --loop=5 arp_capture.pcap`
  },
  {
    question: "How does JSON Web Token (JWT) `jti` (JWT ID) claim prevent token replay in distributed microservices?",
    shortAnswer: "The `jti` claim provides a unique UUID for the token; API gateways maintain a distributed cache of consumed `jti` values until the token's `exp` expiration time.",
    explanation: "In single-use token flows (like password reset or one-time payment tokens), an attacker could replay a valid JWT before it expires. The issuing server adds `\"jti\": \"d8a7ef90-4e1b-4a8f...\"`. When presented to any microservice, the API gateway checks Redis for `jti:<uuid>`. If found, it drops the request; if not found, it stores the `jti` with a TTL equal to the token's remaining lifetime.",
    hint: "A unique serial number on a cinema ticket that is punched and crossed off upon entry.",
    level: "moderate",
    codeExample: `// JWT Header & Payload with jti Claim:
{
  "sub": "Mamata",
  "jti": "e98a1200-4e1b-4a8f-9a8f-4e1b9a8f4e1b",
  "exp": 1724398500
}`
  },
  {
    question: "What is an Audio Voice Command Replay Attack on Smart Home Assistants?",
    shortAnswer: "Recording a homeowner's voice saying 'Alexa, unlock the front door' and playing the high-fidelity recording through a loudspeaker to trigger physical door locks.",
    explanation: "Voice assistants match wake words and voice biometrics. An attacker records the victim speaking in public or over a phone call, splices together the command, and plays it near an open window. Defense mechanisms: 1. Acoustic Liveness Detection (measuring pop-noise and mouth proximity); 2. Requiring second-factor PINs for high-risk voice actions.",
    hint: "Using a tape recorder to play someone's voice into an answering machine.",
    level: "basic",
    codeExample: `// Voice Command Defense Architecture:
// 1. Mandatory 4-digit voice PIN for physical door locks & payments
// 2. High-frequency acoustic liveness detection analyzing loudspeaker distortion`
  },
  {
    question: "Under Section 43(g) of the IT Act 2000, what liability arises from replaying packets to deny access to authorized users?",
    shortAnswer: "Liable to pay civil compensation up to ₹1 Crore for denying or causing the denial of access to any person authorized to access any computer system.",
    explanation: "Section 43(g) explicitly covers actions that deny access to authorized users (such as replaying old TCP RST packets or replaying authentication tokens to trigger account lockouts). The Adjudicating Officer can levy civil damages up to ₹1 Crore payable directly to the victimized enterprise.",
    hint: "Section 43(g) penalizes actions that cause denial of access or account lockouts through packet manipulation.",
    level: "moderate",
    codeExample: `// Civil Liability (IT Act Section 43(g)):
// Violation: Replaying packets to trigger account lockouts or deny access to legitimate users
// Compensation: Up to ₹1,00,00,000 (Rupees One Crore)`
  },
  {
    question: "Synthesize the mathematical probability of a successful Replay Attack across a combined Nonce, Timestamp, and HMAC-SHA256 authenticated channel.",
    shortAnswer: "The probability of a successful replay is P_replay = P(collision) * P(window_match) <= (k^2 / 2^{129}) * (Delta t / T_lifetime) approx 0.",
    explanation: "When an enterprise enforces a triple-shield model: 1. 128-bit CSPRNG Nonce ($2^{128}$ space); 2. Microsecond timestamp with 300s window ($\\Delta t = 300\\text{s}$); 3. HMAC-SHA256 integrity tag ($2^{256}$ space). An attacker attempting to replay a captured message faces an impossible hurdle: the timestamp expires within 300 seconds, the nonce is already burned in Redis, and modifying either to refresh the message breaks the 256-bit HMAC tag, making the probability of a successful replay mathematically zero.",
    hint: "Combining unique nonces, strict 5-minute timers, and cryptographic wax seals makes replay mathematically impossible.",
    level: "expert",
    codeExample: `// Triple-Shield Anti-Replay Equation:
// P(Replay Success) = P(Valid HMAC) * P(Fresh Nonce) * P(In-Window Timestamp)
// P(Replay Success) = 2^-256 * 0 * 0 = 0 (Absolute Mathematical Proof of Security)`
  }
];

export default questions;
