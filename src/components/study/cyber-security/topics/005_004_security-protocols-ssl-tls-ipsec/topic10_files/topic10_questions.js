const questions = [
  {
    id: 1,
    question: "What is the primary security problem with traditional unauthenticated DNS (RFC 1035), and how does DNSSEC solve it?",
    shortAnswer: "Traditional DNS uses unencrypted, unauthenticated UDP Port 53 queries where an attacker can easily forge responses (Kaminsky Cache Poisoning) by guessing the 16-bit Transaction ID. DNSSEC (RFC 4033-4035) adds asymmetric digital signatures (RRSIG) to DNS record sets, allowing resolvers to cryptographically verify data origin authenticity and integrity.",
    explanation: "Crucially, DNSSEC does NOT encrypt DNS data (queries remain readable in public); it provides cryptographic integrity proof so that a client or resolver can be 100% certain the IP address received was published by the legitimate zone owner and not modified by an attacker.",
    hint: "Traditional DNS has no authentication and is easy to spoof; DNSSEC adds digital signatures.",
    level: "Basic",
    codeExample: `// Traditional DNS vs DNSSEC:
// Traditional DNS : Query ➔ Response: "treasury.barrackpore.gov.in A 203.0.113.10" (Easily Spoofed!)
// DNSSEC          : Query ➔ Response: A Record + RRSIG Digital Signature (Signed by Zone ZSK ✔)`
  },
  {
    id: 2,
    question: "What are the four core Resource Record types introduced by DNSSEC?",
    shortAnswer: "1. `RRSIG` (Resource Record Signature - digital signature over an RRset); 2. `DNSKEY` (Public key used to verify RRSIGs); 3. `DS` (Delegation Signer - cryptographic hash of child KSK placed in parent zone); 4. `NSEC` / `NSEC3` (Next Secure Record - provides authenticated proof of non-existence).",
    explanation: "Together, these four records allow recursive resolvers to build a continuous chain of cryptographic trust from the Root zone down to any individual domain name.",
    hint: "RRSIG (signature), DNSKEY (public key), DS (parent-child link), NSEC/NSEC3 (non-existence).",
    level: "Basic",
    codeExample: `// The 4 DNSSEC Record Types:
// 1. RRSIG   : Contains signature: 'RRSIG A 13 3 300 20260901... barrackpore.gov.in. sig_blob'
// 2. DNSKEY  : Contains public keys: ZSK (Flag 256) and KSK (Flag 257)
// 3. DS      : In parent zone (.gov.in): SHA-256 hash of child KSK
// 4. NSEC3   : Hashed non-existence proof protecting against zone walking`
  },
  {
    id: 3,
    question: "What is the difference between a Zone Signing Key (ZSK) and a Key Signing Key (KSK) in the DNSKEY record?",
    shortAnswer: "The Zone Signing Key (ZSK - Flag 256) is used for frequent, automated signing of all zone resource records (A, AAAA, MX, TXT); the Key Signing Key (KSK - Flag 257) is used exclusively to sign the DNSKEY record set itself, acting as the secure trust anchor whose hash is published in the parent zone's DS record.",
    explanation: "This dual-key architecture allows administrators in Barrackpore to rotate the ZSK monthly without contacting the parent registry, while rotating the KSK infrequently (e.g., annually) because KSK rotation requires updating the parent zone's DS record.",
    hint: "ZSK signs daily DNS records; KSK signs the ZSK and is linked to the parent zone's DS record.",
    level: "Moderate",
    codeExample: `// DNSKEY Flags:
// Flag 256 ➔ Zone Signing Key (ZSK): Signs A, MX, CNAME records
// Flag 257 ➔ Key Signing Key (KSK): Signs the DNSKEY RRset and links to parent DS`
  },
  {
    id: 4,
    question: "How does the Delegation Signer (DS) record link a child zone to its parent zone to establish the Chain of Trust?",
    shortAnswer: "The DS record is stored in the parent zone (e.g., `.gov.in` holds the DS for `barrackpore.gov.in`). It contains a cryptographic digest (SHA-256) of the child zone's KSK. When a resolver validates the child zone, it verifies that the child's KSK matches the parent's signed DS record, establishing an unbroken chain of trust.",
    explanation: "Because the parent zone's DS record is itself signed by the parent zone's ZSK, trust flows hierarchically from the Root zone all the way to the leaf domain.",
    hint: "The parent zone stores a hash of the child zone's public KSK.",
    level: "Moderate",
    codeExample: `// DS Record in Parent Zone (.gov.in):
// barrackpore.gov.in. IN DS 38412 13 2 (
//     88AF1901B3C499E14A1F89BC99E188AF1901B3C499E188AF1901B3C499E188AF )
// Where 38412 = Key Tag, 13 = Algorithm (ECDSA P-256), 2 = SHA-256 Digest Type`
  },
  {
    id: 5,
    question: "What is the Root Zone Trust Anchor, and how is it managed and distributed globally?",
    shortAnswer: "The Root Zone Trust Anchor is the public Key Signing Key (KSK) of the DNS Root Zone (`.`). It is hardcoded into all DNSSEC-validating recursive resolvers globally and managed by ICANN through strict, publicly audited, air-gapped cryptographic Key Signing Ceremonies with global trusted community representatives.",
    explanation: "Because the Root KSK has no parent zone to sign it, it acts as the universal mathematical root of trust for the entire global internet DNS hierarchy.",
    hint: "The Root KSK is the ultimate trust anchor hardcoded into DNS resolvers worldwide.",
    level: "Moderate",
    codeExample: `// Root Zone Trust Anchor (root-anchors.xml):
// <KeyDigest id="KSK-2024" validFrom="2024-10-11T00:00:00+00:00">
//     <KeyTag>20326</KeyTag>
//     <Algorithm>8</Algorithm>
//     <DigestType>2</DigestType>
//     <Digest>E06D44B80B8F1D39A95C0B0D7C65D08458E880409BBC683457104237C7F8EC8D</Digest>
// </KeyDigest>`
  },
  {
    id: 6,
    question: "What is 'Authenticated Denial of Existence' in DNSSEC, and why is standard NXDOMAIN insufficient?",
    shortAnswer: "In standard DNS, an attacker can forge an NXDOMAIN (non-existent domain) reply to block users from reaching a legitimate server (Denial-of-Service). In DNSSEC, the server must provide cryptographic proof that a domain does NOT exist by returning a signed `NSEC` or `NSEC3` record proving there are no records between two alphabetical bounds.",
    explanation: "Because a DNS server cannot dynamically sign non-existent records on the fly without private keys stored online on every edge name server, pre-signed NSEC/NSEC3 records cover spans of non-existent names.",
    hint: "Proves cryptographically that a queried record does not exist.",
    level: "Expert",
    codeExample: `// NSEC Record Example:
// Zone contains: 'alpha.barrackpore.gov.in' and 'delta.barrackpore.gov.in'
// Query for 'beta.barrackpore.gov.in' returns:
// NSEC: 'alpha.barrackpore.gov.in → delta.barrackpore.gov.in (No records in between!)' + Signed RRSIG`
  },
  {
    id: 7,
    question: "What is 'Zone Walking' (Zone Enumeration) with NSEC records, and how does NSEC3 (RFC 5155) prevent it?",
    shortAnswer: "NSEC lists the next alphabetical domain name in cleartext. An attacker can repeatedly query non-existent names to traverse the entire linked list of NSEC records and map out every private host and server in the domain. NSEC3 prevents this by replacing cleartext domain names with salted cryptographic hashes (e.g., `SHA-1(salt + domain)`).",
    explanation: "With NSEC3, attackers receive hashes rather than cleartext names, preventing trivial reconnaissance of internal infrastructure while retaining verifiable proof of non-existence.",
    hint: "NSEC leaks all domain names in cleartext; NSEC3 hashes the names with salt.",
    level: "Expert",
    codeExample: `// NSEC vs NSEC3:
// NSEC (Vulnerable to Walking) : alpha.gov.in ➔ Next is: internal-pension-db.gov.in (LEAKED!)
// NSEC3 (Hashed Defense)       : B4E89F... ➔ Next is: D901C2... (Salted hash, cannot reverse)`
  },
  {
    id: 8,
    question: "What does the `AD` (Authenticated Data) flag in a DNS response header indicate to a client?",
    shortAnswer: "The `AD=1` flag indicates that the recursive resolver has successfully validated all digital signatures (RRSIGs) across the entire Chain of Trust from the Root Anchor to the requested domain, confirming the response is 100% authentic and unmodified.",
    explanation: "If validation fails at any point in the chain (e.g., expired signature, forged IP, or missing DS record), the validating resolver strips the `AD` flag and returns `SERVFAIL` to the client instead.",
    hint: "AD=1 means the resolver verified all DNSSEC signatures successfully.",
    level: "Basic",
    codeExample: `// DNS Header Flags in 'dig' output:
// ;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1
// Note 'ad' (Authenticated Data) in the flags line!`
  },
  {
    id: 9,
    question: "What does the `CD` (Checking Disabled) flag in a DNS query header do?",
    shortAnswer: "The `CD=1` flag is set by diagnostic tools (like `dig +cdflag` or `delv`) to instruct the recursive resolver NOT to perform DNSSEC validation or drop invalid records, returning the raw (potentially bogus/spoofed) records to the client for forensic troubleshooting.",
    explanation: "This allows security analysts in Barrackpore to inspect corrupted or misconfigured DNSSEC records that would otherwise trigger a silent `SERVFAIL` drop.",
    hint: "Instructs the resolver to disable validation and return raw records for debugging.",
    level: "Moderate",
    codeExample: `// Diagnostic Query with Checking Disabled:
# dig A treasury.barrackpore.gov.in +cdflag +dnssec`
  },
  {
    id: 10,
    question: "What is the Kaminsky DNS Cache Poisoning Attack (2008), and why does DNSSEC completely neutralize it?",
    shortAnswer: "Dan Kaminsky discovered that an attacker can query a target recursive resolver for random subdomains (e.g., `random1.bank.com`, `random2.bank.com`) and simultaneously flood the resolver with thousands of forged responses guessing the 16-bit TxID, injecting a fake `NS` (Name Server) delegation to take over the entire domain. DNSSEC neutralizes this because forged responses lack the valid cryptographic `RRSIG` signature.",
    explanation: "Without DNSSEC, guessing the 16-bit TxID took only a few seconds. With DNSSEC, even if an attacker guesses the TxID and source port, the resolver verifies the cryptographic signature (RSA/ECDSA) and drops the forged packet instantly.",
    hint: "Flooding resolvers with random subdomains to guess transaction IDs; DNSSEC drops responses lacking valid digital signatures.",
    level: "Expert",
    codeExample: `// Kaminsky Attack Neutralization:
// Attacker sends: Forged response (TxID matched!) ➔ "bank.com NS evil-nameserver.com"
// Validating Resolver: Checks RRSIG for evil-nameserver.com ➔ Signature INVALID/MISSING!
// Resolver Action: Drops packet; user receives authentic answer from legitimate NS.`
  },
  {
    id: 11,
    question: "What is a 'Resource Record Set' (RRset) in DNSSEC, and why are signatures generated per RRset rather than per individual record?",
    shortAnswer: "An RRset is a collection of all DNS records of the same type and domain name (e.g., all four `A` records for `barrackpore.gov.in`). DNSSEC signs the entire RRset together as a single unit with one `RRSIG`, preventing attackers from selectively stripping or injecting individual IP addresses from a multi-homed pool.",
    explanation: "Signing per RRset minimizes cryptographic overhead and guarantees that load-balanced pools of records remain authentic as a complete set.",
    hint: "A group of records of the same type (e.g. all A records) signed together with one signature.",
    level: "Moderate",
    codeExample: `// RRset Signed as a Single Unit:
// barrackpore.gov.in. 300 IN A 203.0.113.10
// barrackpore.gov.in. 300 IN A 203.0.113.11
// barrackpore.gov.in. 300 IN RRSIG A 13 3 300 20260901... (Signs BOTH A records!)`
  },
  {
    id: 12,
    question: "What is the difference between DNSSEC and DNS-over-HTTPS (DoH) / DNS-over-TLS (DoT)?",
    shortAnswer: "DNSSEC provides Origin Authentication and Data Integrity (guarantees the record came from the zone owner and was not altered, but data is unencrypted); DoH (RFC 8484) and DoT (RFC 7858) provide Transport Confidentiality (encrypts the query between the client and resolver to protect user privacy from local Wi-Fi sniffers and ISPs).",
    explanation: "They are complementary, not competing: DoH/DoT protects the last-mile query from eavesdropping, while DNSSEC protects the resolution result from being poisoned or forged at the authoritative server level.",
    hint: "DNSSEC verifies authenticity; DoH/DoT encrypts queries for privacy.",
    level: "Basic",
    codeExample: `// Complementary Security:
// [ Client ] ──(DoH / DoT on Port 443/853 - Encrypted Privacy)──> [ Recursive Resolver ]
//                                                                          |
//                                          (DNSSEC - Cryptographic Integrity Verification ✔)
//                                                                          v
//                                                               [ Authoritative Server ]`
  },
  {
    id: 13,
    question: "What is DANE (DNS-based Authentication of Named Entities - RFC 7672) and how does it leverage DNSSEC to eliminate rogue CA attacks?",
    shortAnswer: "DANE publishes `TLSA` records in DNSSEC-signed zones that cryptographically bind a domain's web or email server to a specific TLS certificate or public key. Clients verify the server's presented TLS certificate against the DNSSEC TLSA record, preventing Man-in-the-Middle attacks even if a public commercial Certificate Authority is compromised.",
    explanation: "DANE shifts trust from commercial third-party Certificate Authorities to the cryptographic domain owner via DNSSEC.",
    hint: "Pins TLS certificates directly in DNSSEC-signed TLSA records.",
    level: "Expert",
    codeExample: `// TLSA Record for Port 443 (_443._tcp.treasury.barrackpore.gov.in):
// IN TLSA 3 1 1 (Certificate Usage: DANE-EE, Selector: SPKI, Matching: SHA-256)
//   88af1901b3c499e14a1f89bc99e188af1901b3c499e188af1901b3c499e188af`
  },
  {
    id: 14,
    question: "What are the recommended cryptographic algorithms for modern DNSSEC deployments according to RFC 8624?",
    shortAnswer: "Algorithm 13 (`ECDSAP256SHA256` - ECDSA Curve P-256 with SHA-256) and Algorithm 15 (`ED25519` - Ed25519 with SHA-512).",
    explanation: "Elliptic curve algorithms produce tiny signatures and public keys (64 bytes vs 256+ bytes for RSA), eliminating UDP buffer overflow fragmentation and resisting DNS Amplification DDoS attacks.",
    hint: "Algorithm 13 (ECDSA P-256) and Algorithm 15 (Ed25519).",
    level: "Moderate",
    codeExample: `// DNSSEC Algorithm Numbers (RFC 8624):
// Algorithm 8  : RSA/SHA-256 (Acceptable Legacy)
// Algorithm 13 : ECDSAP256SHA256 (MUST IMPLEMENT - Recommended)
// Algorithm 15 : ED25519 (Recommended Modern Standard)
// Algorithm 1  : RSA/MD5 (PROHIBITED & BROKEN ❌)`
  },
  {
    id: 15,
    question: "What is the 'Key Rollover' process in DNSSEC, and why is ZSK rollover much simpler than KSK rollover?",
    shortAnswer: "ZSK rollover is performed entirely within the local zone (introducing a new ZSK, signing with both keys, and removing the old key) without external coordination; KSK rollover requires updating the parent zone's DS record at the registry (e.g., at the `.in` registry for `barrackpore.in`), requiring careful timing and double-DS/double-KSK transition periods.",
    explanation: "Automated DNS management tools (like BIND9 or Cloudflare DNSSEC) handle ZSK rotation seamlessly, while KSK rotations follow strict RFC 7583 timelines.",
    hint: "ZSK rollover is local; KSK rollover requires updating the parent zone registry DS record.",
    level: "Expert",
    codeExample: `// KSK Rollover Timeline (RFC 7583):
// Day 1  : Publish new KSK alongside old KSK in DNSKEY RRset
// Day 5  : Submit new DS record to parent registry (.gov.in)
// Day 10 : Wait for parent DS TTL propagation
// Day 15 : Remove old KSK and old DS record safely`
  },
  {
    id: 16,
    question: "What is a 'Key Tag' (Key ID) in DNSSEC records?",
    shortAnswer: "A 16-bit integer computed as a checksum over the DNSKEY record's RDATA that acts as a quick identifier, allowing resolvers to easily match an RRSIG or DS record with the corresponding DNSKEY without parsing and hashing full public key strings.",
    explanation: "In `dig +dnssec` output, you see `RRSIG A 13 3 300 ... 19204 barrackpore.gov.in.`, where `19204` is the Key Tag of the signing ZSK.",
    hint: "A 16-bit integer identifier linking RRSIGs and DS records to the matching DNSKEY.",
    level: "Moderate",
    codeExample: `// Key Tag Example in 'dig':
// treasury.barrackpore.gov.in. 300 IN RRSIG A 13 3 300 20260901... 19204 barrackpore.gov.in.
// Resolver matches '19204' to the DNSKEY entry with Key Tag 19204!`
  },
  {
    id: 17,
    question: "What happens if a zone's DNSSEC signatures (`RRSIG`) expire while the domain owner is offline?",
    shortAnswer: "Validating recursive resolvers worldwide (like Google 8.8.8.8, Cloudflare 1.1.1.1) will reject all DNS responses for that zone as invalid/expired, returning `SERVFAIL` to all users and rendering the entire website, API, and email servers completely unreachable across the Internet.",
    explanation: "Because DNSSEC signatures have strict `Signature Expiration` timestamps (unlike standard DNS TTLs), automated re-signing daemons must refresh signatures before expiration (typically re-signing every 7-14 days).",
    hint: "Resolvers will return SERVFAIL and all websites and email on the domain will become unreachable.",
    level: "Basic",
    codeExample: `// Expired RRSIG Error in Resolver Logs:
// named[1234]: validating @0x7f...: treasury.barrackpore.gov.in A: verify failed: signature expired
// named[1234]: client @0x7f...: query failed (SERVFAIL) for treasury.barrackpore.gov.in`
  },
  {
    id: 18,
    question: "What is the `delv` (DNSSEC Look and Verify) diagnostic tool in BIND9?",
    shortAnswer: "`delv` is a specialized command-line utility that performs full iterative DNSSEC validation directly on the client machine, tracing the entire cryptographic chain from the built-in Root Trust Anchor down to the queried domain and outputting whether the response is fully authentic or bogus.",
    explanation: "Unlike `dig` (which relies on the upstream resolver's `AD` flag), `delv` validates every signature, DS digest, and DNSKEY independently.",
    hint: "An independent DNSSEC validation tool that traces the chain of trust from root to leaf.",
    level: "Moderate",
    codeExample: `// Tracing Full Chain of Trust with delv:
# delv @8.8.8.8 treasury.barrackpore.gov.in A +multiline
// Output:
// ; fully validated
// treasury.barrackpore.gov.in. 300 IN A 203.0.113.10
// treasury.barrackpore.gov.in. 300 IN RRSIG A 13 3 300 ...`
  },
  {
    id: 19,
    question: "What is the difference between Inception and Expiration timestamps in an `RRSIG` record?",
    shortAnswer: "`Inception` specifies the exact UTC date and time when the signature becomes valid; `Expiration` specifies the UTC date and time when the signature expires. Validating resolvers drop responses if the current system time falls outside this `[Inception, Expiration]` validity window.",
    explanation: "This time window bounds the vulnerability to replay attacks with obsolete DNS records.",
    hint: "The signature is valid strictly between the Inception and Expiration timestamps.",
    level: "Basic",
    codeExample: `// RRSIG Timestamp Fields (YYYYMMDDHHMMSS format):
// RRSIG A 13 3 300 20260901180000 (Expiration: Sep 1, 2026 18:00 UTC)
//                  20260823180000 (Inception : Aug 23, 2026 18:00 UTC)`
  },
  {
    id: 20,
    question: "Why can inaccurate system clocks on DNS resolvers cause massive legitimate website outages when DNSSEC is enabled?",
    shortAnswer: "If a resolver's system clock drifts into the future past the signature's `Expiration` timestamp, or drifts into the past before the `Inception` timestamp, the resolver will mistakenly conclude that all valid DNSSEC signatures are expired/invalid and return `SERVFAIL` for all signed domains.",
    explanation: "This makes accurate NTP (Network Time Protocol) synchronization mandatory for all enterprise and ISP DNS resolving servers.",
    hint: "Clock drift causes resolvers to think signatures are expired, triggering false SERVFAIL errors.",
    level: "Moderate",
    codeExample: `// NTP Clock Synchronization Requirement:
# sudo timedatectl set-ntp on
# chronyc tracking # Confirms resolver clock offset is < 5 milliseconds`
  },
  {
    id: 21,
    question: "What is an 'Opt-Out' flag in NSEC3 records (RFC 5155) and why is it used in large TLD registries (like `.com` or `.in`)?",
    shortAnswer: "The Opt-Out flag allows a parent registry to omit NSEC3 non-existence proof for delegations (child zones) that have not deployed DNSSEC. This saves massive amounts of cryptographic computation and memory when signing gigantic TLD registries containing millions of unsigned domains.",
    explanation: "Opt-out ensures that a registry with 100 million domains only needs to generate NSEC3 records for the subset that actually use DNSSEC.",
    hint: "Allows large registries to skip generating NSEC3 proofs for unsigned domains.",
    level: "Expert",
    codeExample: `// NSEC3 Flags:
// Flag 0 = Standard (All child zones covered)
// Flag 1 = Opt-Out (Unsigned child zones omitted to save registry CPU)`
  },
  {
    id: 22,
    question: "How does DNSSEC amplify DNS Reflection DDoS attacks, and how do modern name servers mitigate this?",
    shortAnswer: "DNSSEC responses containing large `DNSKEY` and `RRSIG` payloads are 10x to 40x larger than traditional DNS responses (amplification factor of 40:1). Attackers spoof a victim's IP and send small queries, causing DNS servers to flood the victim with huge DNSSEC responses. Name servers mitigate this using Response Rate Limiting (RRL) and migrating to compact ECDSA (Algorithm 13) keys.",
    explanation: "ECDSA keys reduce DNSKEY record sizes from 1500+ bytes (RSA) to under 200 bytes, drastically reducing amplification factors.",
    hint: "Large signatures allow attackers to reflect huge responses; mitigated by ECDSA keys and Response Rate Limiting (RRL).",
    level: "Expert",
    codeExample: `// BIND9 Response Rate Limiting (RRL) in /etc/bind/named.conf.options:
rate-limit {
    responses-per-second 10;
    window 5;
};`
  },
  {
    id: 23,
    question: "What is the EDNS0 (Extension Mechanisms for DNS - RFC 6891) buffer size and why is it required for DNSSEC?",
    shortAnswer: "Standard DNS limits UDP packets to 512 bytes. Because DNSSEC responses with RRSIG and DNSKEY records easily exceed 512 bytes, EDNS0 allows clients to advertise larger UDP buffer sizes (typically 1232 or 1400 bytes), preventing unnecessary fallback to TCP Port 53.",
    explanation: "The global DNS Flag Day established 1232 bytes as the recommended EDNS buffer size to avoid IP fragmentation across 1500-byte WAN links.",
    hint: "Expands the traditional 512-byte DNS UDP limit to handle larger DNSSEC signatures.",
    level: "Moderate",
    codeExample: `// EDNS0 in dig output:
// ;; OPT PSEUDOSECTION:
// ; EDNS: version: 0, flags: do; udp: 1232
// Note 'do' (DNSSEC OK) flag requesting DNSSEC records!`
  },
  {
    id: 24,
    question: "What is an 'Islands of Security' concept in DNSSEC history versus a globally anchored hierarchy?",
    shortAnswer: "Before the Root Zone was signed in 2010, individual domains could only deploy DNSSEC as isolated 'islands' using DLV (DNSSEC Lookaside Validation) registries. Today, a single globally anchored hierarchy flows continuously from the ICANN Root Zone down through all TLDs.",
    explanation: "This unified hierarchy eliminated fragmented lookaside registries, making global validation universal.",
    hint: "Isolated signed zones before the global root was signed in 2010.",
    level: "Moderate",
    codeExample: `// Modern Unified Chain:
// [ ICANN Root (Signed) ] ➔ [ .gov.in TLD (Signed) ] ➔ [ barrackpore.gov.in (Signed) ]`
  },
  {
    id: 25,
    question: "What is the `dnssec-signzone` command in BIND9 and what files does it generate?",
    shortAnswer: "`dnssec-signzone` is the BIND utility that reads a zone file, signs all RRsets using the specified ZSK and KSK private keys, and outputs a signed zone file (`db.domain.gov.in.signed`) containing all generated `RRSIG`, `DNSKEY`, and `NSEC3` records along with a `dsset-` file to send to the parent registry.",
    explanation: "The generated `.signed` file is what the authoritative BIND nameserver serves to public queries.",
    hint: "The command-line tool that signs a DNS zone file in BIND9.",
    level: "Basic",
    codeExample: `// Signing a Zone File in BIND9:
# dnssec-signzone -A -3 $(head -c 16 /dev/urandom | xxd -p) -N INCREMENT -o barrackpore.gov.in -t db.barrackpore.gov.in Kbarrackpore...+013+19204 Kbarrackpore...+013+38412
// Generates: db.barrackpore.gov.in.signed and dsset-barrackpore.gov.in.`
  },
  {
    id: 26,
    question: "What is 'Split-Horizon DNS' and how does DNSSEC operate in mixed internal/external enterprise zones?",
    shortAnswer: "Split-Horizon DNS serves different IP records depending on whether the query originates from the internal corporate network (e.g., `10.14.0.88`) or external Internet (e.g., `203.0.113.10`). In DNSSEC, internal and external views must be signed independently with distinct keys or isolated subdomains to avoid signature verification failures.",
    explanation: "Attempting to serve an unsigned internal record in a zone whose external records are signed triggers immediate DNSSEC validation failures on internal validating resolvers.",
    hint: "Internal and external views must be signed independently to prevent signature errors.",
    level: "Expert",
    codeExample: `// Split-Horizon BIND Configuration:
view "internal" {
    match-clients { 10.14.0.0/16; };
    zone "barrackpore.gov.in" { file "db.barrackpore.internal.signed"; };
};
view "external" {
    match-clients { any; };
    zone "barrackpore.gov.in" { file "db.barrackpore.external.signed"; };
};`
  },
  {
    id: 27,
    question: "How does DNSSEC prevent 'BGP Hijacking' attacks from stealing domain traffic?",
    shortAnswer: "If an adversary hijacks an ISP's BGP routes to announce a rogue DNS server's IP address, the rogue DNS server cannot forge the cryptographic `RRSIG` signatures for the target domain (since it lacks the zone's private ZSK). Validating resolvers detect the invalid signatures and drop the forged responses, protecting users from redirection.",
    explanation: "While BGP hijacking can intercept traffic routing, DNSSEC prevents attackers from presenting fraudulent DNS mappings to validating clients.",
    hint: "Even if BGP routes are hijacked, rogue servers cannot forge private DNSSEC signatures.",
    level: "Expert",
    codeExample: `// BGP Hijack Defense:
// Attacker hijacks 203.0.113.0/24 via BGP ➔ Serves forged A record for treasury.barrackpore.gov.in
// Validating Resolver: Verifies RRSIG with legitimate ZSK ➔ SIGNATURE FAILS ➔ SERVFAIL (Protected!) ✔`
  },
  {
    id: 28,
    question: "What is an `SOA` (Start of Authority) record's role during DNSSEC authenticated denial of existence?",
    shortAnswer: "When returning an NSEC/NSEC3 proof of non-existence, the authoritative nameserver includes the zone's signed `SOA` record along with its `RRSIG`. This allows the resolver to extract the negative caching TTL (`SOA.MINIMUM`), caching the non-existence proof safely for the configured duration.",
    explanation: "This prevents clients from flooding nameservers with continuous non-existent domain queries.",
    hint: "Provides negative caching TTL for non-existence proofs.",
    level: "Moderate",
    codeExample: `// NXDOMAIN Response with SOA + NSEC3:
// ;; AUTHORITY SECTION:
// barrackpore.gov.in. 300 IN SOA ns1.barrackpore.gov.in. admin.barrackpore.gov.in. ...
// barrackpore.gov.in. 300 IN RRSIG SOA 13 3 300 ...
// 88AF...barrackpore.gov.in. 300 IN NSEC3 1 0 10 ...
// 88AF...barrackpore.gov.in. 300 IN RRSIG NSEC3 13 3 300 ...`
  },
  {
    id: 29,
    question: "What is the 'DNSSEC OK' (`DO=1`) bit in EDNS0 queries?",
    shortAnswer: "The `DO=1` flag is set by a DNS client or resolver in the EDNS0 header to signal to the authoritative server: 'I support DNSSEC, please include `RRSIG`, `DNSKEY`, and `NSEC3` cryptographic records in your response.'",
    explanation: "If a query does not include `DO=1`, the authoritative server omits all DNSSEC signatures to conserve bandwidth for legacy clients.",
    hint: "Signals to the server to include DNSSEC signatures in the response.",
    level: "Basic",
    codeExample: `// Querying with DO Bit in dig:
# dig A treasury.barrackpore.gov.in +dnssec
// Automatically sets the 'do' bit in EDNS flags!`
  },
  {
    id: 30,
    question: "What are the primary troubleshooting commands when diagnosing a `SERVFAIL` error on a DNSSEC-enabled domain?",
    shortAnswer: "1. Validate full chain with `delv @8.8.8.8 domain.com A`; 2. Check if disabling validation succeeds: `dig domain.com A +cdflag`; 3. Inspect DS record at parent registry: `dig DS domain.com +short`; 4. Check signature expiration dates: `dig RRSIG domain.com +dnssec`.",
    explanation: "If `dig +cdflag` succeeds while standard `dig` returns `SERVFAIL`, the domain is experiencing a DNSSEC validation failure (such as expired signatures or mismatched DS digests).",
    hint: "Use delv, dig +cdflag, dig DS, and check RRSIG expiration dates.",
    level: "Expert",
    codeExample: `// DNSSEC Triage Checklist:
# delv @8.8.8.8 treasury.barrackpore.gov.in A
# dig @8.8.8.8 treasury.barrackpore.gov.in A +cdflag   # If this works, DNSSEC is broken!
# dig @8.8.8.8 DS barrackpore.gov.in                   # Verify parent DS digest
# dig @8.8.8.8 DNSKEY barrackpore.gov.in +dnssec       # Inspect active KSK/ZSK`
  }
];

export default questions;
