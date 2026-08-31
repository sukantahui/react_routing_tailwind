const questions = [
  {
    question: "What is the primary security objective of a Public Key Infrastructure (PKI), and what fundamental attack does it prevent?",
    shortAnswer: "PKI binds a cryptographic public key to a verified legal identity (person, company, or server FQDN) through digital signatures from trusted Certificate Authorities (CAs), preventing Man-in-the-Middle (MITM) public key substitution attacks.",
    explanation: "Without PKI, asymmetric cryptography cannot verify ownership: an attacker (Eve) on a network can intercept Alice's public key transmission, substitute their own public key $(e_{eve}, N_{eve})$, and decrypt/re-encrypt all messages in transit without detection (Man-in-the-Middle). PKI solves this by introducing trusted third parties (Certificate Authorities) who cryptographically sign digital certificates binding public keys to verified domain names or legal identities.",
    hint: "Think of an official passport office certifying that a photograph belongs to a specific citizen.",
    level: "basic",
    codeExample: `// The Man-in-the-Middle Public Key Substitution Attack (Without PKI):
Client <---> [ Attacker Intercepts & Replaces Public Key ] <---> Server
Outcome: Attacker decrypts all traffic transparently!
PKI Defense: Server presents X.509 Certificate signed by Trusted CA → Client verifies signature!`
  },
  {
    question: "What are the core functional components of a complete Public Key Infrastructure (PKI)?",
    shortAnswer: "1. Certificate Authority (CA); 2. Registration Authority (RA); 3. Certificate Repository (LDAP/HTTPS); 4. Revocation Mechanisms (CRL / OCSP); 5. Management Protocols (ACME / EST / SCEP).",
    explanation: "A complete PKI consists of: 1. CA: Signs and issues certificates; 2. RA: Authenticates applicant physical/corporate credentials before issuing approval; 3. Repository: Public directory hosting active certificates; 4. Revocation System: Publishes revoked certificates via CRLs (RFC 5280) and OCSP responders (RFC 6960); 5. Enrollment Protocols: Automates certificate lifecycle management via ACME (RFC 8555) or EST (RFC 7030).",
    hint: "Think of the issuer, the identity verifier, the database, the blacklist, and the automated protocol.",
    level: "moderate",
    codeExample: `// Core PKI Components:
1. CA (Certificate Authority): Issues & signs X.509 certificates
2. RA (Registration Authority): Verifies applicant identity (KYC, DNS)
3. CRL / OCSP: Blacklist checking for compromised certificates
4. ACME Protocol: Automated renewal (Let's Encrypt / Certbot)`
  },
  {
    question: "What is the operational difference between a 'Certificate Revocation List' (CRL) and the 'Online Certificate Status Protocol' (OCSP)?",
    shortAnswer: "A CRL is a large, periodically published signed list of all revoked certificate serial numbers; OCSP is a real-time HTTP query protocol that returns the live revocation status of a single specific certificate.",
    explanation: "CRLs (RFC 5280) require clients to download large signed lists (often several megabytes) periodically. This introduces bandwidth overhead and latency, and leaves a window of vulnerability between CRL publication intervals. OCSP (RFC 6960) replaces this with lightweight real-time queries: The client sends the serial number of a certificate to the CA's OCSP responder, which replies immediately with 'Good', 'Revoked', or 'Unknown'.",
    hint: "Contrast downloading an entire telephone book of bad numbers versus dialing a live hotline to check one number.",
    level: "moderate",
    codeExample: `// CRL vs OCSP Comparison:
CRL (RFC 5280): Client downloads 5 MB list of ALL revoked certificates (High Latency & Stale Data)
OCSP (RFC 6960): Client queries: "Is Serial #0x4A7B revoked?" → CA replies: "Good" (Lightweight & Real-Time)`
  },
  {
    question: "What is 'OCSP Stapling' (Certificate Status Request / RFC 6066), and how does it resolve the privacy and performance flaws of standard OCSP?",
    shortAnswer: "The TLS web server queries the CA's OCSP responder periodically, caches the CA-signed timestamped OCSP response, and 'staples' it directly into the initial TLS handshake; the client verifies the staple without contacting the CA.",
    explanation: "In standard OCSP, every client visits the CA's server during every TLS handshake, leaking the user's browsing history to the CA and adding 50-200ms of connection latency. If the CA's OCSP responder goes down, clients either block connections (fail-closed) or bypass checks (fail-open). In OCSP Stapling (RFC 6066): The web server fetches and caches the signed OCSP response every hour and includes it directly in the TLS `CertificateStatus` message. This eliminates client CA queries, protects user privacy, and accelerates connection speeds.",
    hint: "Think of an event organizer stapling an official entry pass to your ticket so you don't have to wait in line at the verification booth.",
    level: "expert",
    codeExample: `// OCSP Stapling Handshake Flow:
1. Server periodically queries CA: fetches signed OCSP response (valid for 24 hours)
2. Client initiates TLS Handshake: ClientHello (with status_request extension)
3. Server responds: ServerHello + Certificate + STAPLED OCSP RESPONSE!
4. Client verifies CA signature on staple locally in 0.01 ms (ZERO network calls to CA!)`
  },
  {
    question: "Under the Information Technology Act 2000, what is the role of the 'Controller of Certifying Authorities' (CCA India)?",
    shortAnswer: "The CCA is the apex national authority established under Section 17 of the IT Act 2000 to license, regulate, and supervise all commercial Certifying Authorities (CAs) and operate the India PKI Root CA.",
    explanation: "Appointed by the Central Government of India under Section 17 of the IT Act 2000, the Controller of Certifying Authorities (CCA) serves as the supreme root of trust for all Indian public key infrastructure. The CCA operates the National Root CA (India PKI Root CA), licenses commercial CAs (e.g. eMudhra, Sify, CDAC, IDRBT), lays down technical standards for cryptographic tokens and key lengths, and audits CAs under Section 28.",
    hint: "Remember the apex regulatory body in New Delhi that oversees all digital signature certificates in India.",
    level: "basic",
    codeExample: `// Indian National PKI Trust Hierarchy:
Apex Root:     Controller of Certifying Authorities (India PKI Root CA)
Licensed CAs:  eMudhra, (n)Code Solutions, Sify Safescrypt, CDAC, Capricorn, IDRBT
End-Entities:  Class 3 DSC Holders (MCA21, e-Tendering, GST, High Court DSCs)`
  },
  {
    question: "What is the 'Automated Certificate Management Environment' (ACME) protocol (RFC 8555), and how did it revolutionize web PKI?",
    shortAnswer: "ACME automates identity verification (via HTTP-01 or DNS-01 challenges), certificate signing request (CSR) submission, issuance, and renewal without human intervention (e.g. Let's Encrypt / Certbot).",
    explanation: "Prior to ACME, obtaining SSL/TLS certificates required manual domain validation, email confirmations, manual CSR generation, and payment, leading to frequent website certificate expirations. The ACME protocol (RFC 8555, pioneered by Let's Encrypt) automates the entire lifecycle: A local software agent (`certbot`) requests a certificate; the ACME server challenges the agent to prove domain ownership by provisioning a temporary DNS record (`DNS-01`) or HTTP token (`HTTP-01`); upon automated validation, the CA signs and issues the certificate in seconds, automatically renewing it every 60-90 days.",
    hint: "Think of an automated robotic certificate dispensary that validates domain keys in seconds.",
    level: "moderate",
    codeExample: `// ACME Protocol Automated Lifecycle:
1. Certbot Agent requests certificate for: api.example.com
2. ACME CA issues Challenge: "Place token at http://api.example.com/.well-known/acme-challenge/xyz"
3. Certbot provisions token → ACME CA verifies via HTTP GET
4. ACME CA signs X.509 Certificate and transmits to server (100% AUTOMATED!)`
  },
  {
    question: "What is a 'Root CA' versus an 'Intermediate CA', and why is the Root CA kept completely offline in an air-gapped vault?",
    shortAnswer: "A Root CA is the self-signed trust anchor embedded in operating systems; an Intermediate CA is signed by the Root CA to handle daily issuances. The Root CA is kept offline to protect its master private key from network compromise.",
    explanation: "If a Root CA private key is compromised, all millions of certificates issued under its trust tree become untrusted, requiring operating system vendors worldwide to push emergency OS updates to revoke the root. To prevent this, the Root CA generates its self-signed certificate inside a FIPS 140-3 HSM in an offline air-gapped vault, signs 2-3 Intermediate CA certificates, and is powered off. Daily certificate issuance is delegated to online Intermediate CAs. If an Intermediate CA is compromised, only that single intermediate is revoked without affecting the Root CA.",
    hint: "Think of a master sovereign crown kept in an underground museum vault while governors carry regional administrative seals.",
    level: "moderate",
    codeExample: `// 2-Tier PKI Hierarchy:
[ Offline Root CA (Air-gapped HSM Vault, 30-Year Lifespan) ]
        |
        v Signs
[ Online Intermediate Issuing CA (10-Year Lifespan, Connected to ACME) ]
        |
        v Signs
[ End-Entity Server / User Certificates (90-Day / 1-Year Lifespan) ]`
  },
  {
    question: "Under the Information Technology Act 2000 Section 35 and Section 5, what are the mandatory identity verification requirements for issuing a Class 3 Digital Signature Certificate (DSC) in India?",
    shortAnswer: "Mandatory physical or Aadhaar paperless e-KYC with video verification recording, PAN verification, and key generation directly inside a FIPS 140-2 Level 2 cryptographic USB token.",
    explanation: "Under Section 35 of the IT Act 2000, Certifying Authorities must enforce strict identity vetting for Class 3 DSCs: 1. Identity proof (PAN / Aadhaar e-KYC); 2. Video verification where the applicant displays original documents and speaks an OTP code on camera; 3. Corporate authorization letter (for organizational DSCs); 4. Private keys must be generated inside a hardware crypto USB token (e.g. ePass2003) and marked non-exportable, ensuring full non-repudiation under Section 5.",
    hint: "Remember the video verification and cryptographic USB token requirement for all Indian DSCs.",
    level: "basic",
    codeExample: `// Indian Class 3 DSC Issuance Pipeline:
1. Application: Applicant submits PAN + Aadhaar e-KYC
2. Video KYC:   Live 20-second video recording displaying physical identity cards
3. RA Approval: Licensed CA verifies credentials against UIDAI / NSDL databases
4. Keygen:      RSA-2048 key pair generated directly inside FIPS USB Token
5. Issuance:    CA signs public key → DSC loaded into USB Token!`
  },
  {
    question: "What is 'Certificate Transparency' (CT / RFC 6962), and how does it prevent rogue Certificate Authorities from issuing fraudulent SSL certificates in secret?",
    shortAnswer: "CT requires all public CAs to append newly issued certificates to public, append-only, cryptographically verifiable Merkle Tree logs; web browsers reject any SSL certificate that lacks Signed Certificate Timestamps (SCTs).",
    explanation: "Historically, compromised or rogue CAs (such as DigiNotar in 2011) issued fraudulent certificates for major domains (`*.google.com`) in secret to conduct government surveillance. Certificate Transparency (RFC 6962, created by Google) mandates that every public certificate must be submitted to public append-only Merkle Tree audit logs before issuance. The log returns Signed Certificate Timestamps (SCTs). Modern browsers (Chrome, Firefox, Safari) strictly reject any certificate without valid SCTs, allowing domain owners to detect unauthorized certificates within minutes.",
    hint: "Think of an immutable public land registry ledger where every new deed must be published openly before it becomes legally valid.",
    level: "expert",
    codeExample: `// Certificate Transparency (CT) Merkle Tree Flow:
1. CA prepares pre-certificate → Submits to 3 independent CT Log Servers
2. CT Logs append certificate to Merkle Tree → Return Signed Certificate Timestamps (SCTs)
3. CA embeds SCTs into final X.509 Certificate → Delivers to domain owner
4. Web Browser: Validates SCTs during TLS Handshake (Rejects unlogged certificates!)`
  },
  {
    question: "What is 'Mutual TLS' (mTLS), and how does it utilize Public Key Infrastructure to achieve zero-trust machine-to-machine authentication?",
    shortAnswer: "In mTLS, both the client and the server present X.509 certificates to each other; both parties cryptographically verify that the peer certificate is signed by an approved internal Private CA.",
    explanation: "In standard TLS, only the server presents a certificate to the client (one-way authentication). In Mutual TLS (mTLS), both the client and server present X.509 certificates during the TLS handshake. A microservice in a Kubernetes cluster verifies that the incoming request carries a certificate signed by the internal enterprise Root/Intermediate CA. If the certificate is missing, expired, or signed by an unauthorized CA, the connection is instantly rejected at the network layer, achieving zero-trust security.",
    hint: "Think of a two-way checkpoint where both the guard and the visitor must show official security badges.",
    level: "moderate",
    codeExample: `// Mutual TLS (mTLS) Handshake Flow:
1. Client connects to Server
2. Server presents X.509 Server Certificate → Client verifies Server CA
3. Server sends CertificateRequest → Client presents X.509 Client Certificate
4. Server verifies Client Certificate against Internal Private CA Root
Outcome: 100% Zero-Trust Cryptographic Machine-to-Machine Authentication!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, why is an enterprise Private PKI essential for securing employee and customer data pipelines?",
    shortAnswer: "Private PKI automates internal microservice encryption and access control; complying with Section 33 technical safeguards prevents internal network snooping and up to ₹250 Crores in statutory penalties.",
    explanation: "Modern cloud and banking applications consist of hundreds of internal microservices transmitting sensitive personal data (Aadhaar numbers, bank account balances, medical records). If internal traffic is unencrypted (HTTP), any compromised pod or internal attacker can sniff customer data. Deploying an enterprise Private PKI with automated mTLS encrypts 100% of east-west network traffic, fulfilling statutory technical safeguards under Section 33 of the DPDP Act 2023.",
    hint: "Remember that internal data transit must be encrypted just like public web traffic to avoid DPDP penalties.",
    level: "basic",
    codeExample: `// DPDP Act 2023 East-West Microservice Encryption:
Requirement: End-to-End Encryption of Personal Data in Transit (Section 33)
Implementation: Private CA (HashiCorp Vault / cert-manager) issues mTLS certs to 500 pods
Outcome: Zero unencrypted plaintext on internal networks (100% DPDP Compliant!)`
  },
  {
    question: "What is a 'Key Compromise Certificate Revocation Ceremony', and what are the emergency operational steps when an Intermediate CA private key is leaked?",
    shortAnswer: "1. The Root CA issues an immediate CRL/OCSP revocation entry with reason `keyCompromise`; 2. All downstream certificates are revoked; 3. A fresh Intermediate CA key pair is generated inside an HSM; 4. CERT-In is notified within 6 hours under Section 70B.",
    explanation: "When an Intermediate CA private key is compromised: 1. Emergency Root CA Ceremony: The air-gapped Root CA is brought online in a secure facility to sign a CRL update revoking the Intermediate CA certificate with reason code `keyCompromise`; 2. OCSP responders are updated immediately to return 'Revoked'; 3. A new Intermediate CA key pair is generated inside a FIPS 140-3 HSM; 4. All end-entity certificates are re-issued; 5. Under Section 70B of the IT Act, a formal incident report is filed with CERT-In within 6 hours.",
    hint: "Think of an emergency security protocol to revoke a stolen master key and notify national cyber authorities.",
    level: "expert",
    codeExample: `// Emergency Key Compromise Revocation Sequence:
Step 1: Root CA signs CRL: Revoke Intermediate_CA_01 (Reason: keyCompromise)
Step 2: Push CRL to global CDNs + OCSP Responders update in < 60 seconds
Step 3: Generate New Intermediate_CA_02 inside FIPS 140-3 HSM
Step 4: Notify CERT-In Incident Response Desk within 6 HOURS (IT Act Section 70B)!`
  },
  {
    question: "Synthesizing Public Key Infrastructure: what is the master lifecycle of a digital certificate from creation to revocation?",
    shortAnswer: "$$\\text{Keygen } (e, d) \\to \\text{CSR Generation} \\to \\text{RA Identity Vetting} \\to \\text{CA Digital Signature (X.509)} \\to \\text{TLS/DSC Usage} \\to \\text{OCSP/CRL Revocation}$$",
    explanation: "This complete 6-stage lifecycle represents the foundation of digital trust: 1. Applicant generates key pair $(e, d)$; 2. Generates Certificate Signing Request (`openssl req -new`); 3. Registration Authority validates identity credentials (KYC/DNS); 4. CA signs X.509 certificate with its private key; 5. Certificate is deployed for TLS, SSH, or legal DSC signing; 6. When expired or compromised, the certificate is revoked via CRLs and OCSP. This complete pipeline secures global e-commerce and legal electronic records.",
    hint: "Conclude by reviewing the complete 6-stage certificate lifecycle.",
    level: "expert",
    codeExample: `// Master PKI Certificate Lifecycle:
[ Keygen (p, q, N, e, d) ] ➔ [ CSR Creation ] ➔ [ RA Identity Vetting ] ➔ [ CA X.509 Signature ] ➔ [ Production Deployment ] ➔ [ OCSP Stapling / CRL Revocation ]`
  }
];

export default questions;
