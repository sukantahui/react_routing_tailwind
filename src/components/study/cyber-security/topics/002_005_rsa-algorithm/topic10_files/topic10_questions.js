const questions = [
  {
    question: "What is an X.509 v3 Digital Certificate (RFC 5280), and what are its three top-level structural components?",
    shortAnswer: "An X.509 certificate is an ASN.1 standard data structure binding a public key to an identity; its three top-level components are: 1. `tbsCertificate` (To-Be-Signed payload); 2. `signatureAlgorithm`; 3. `signatureValue` (CA's digital signature).",
    explanation: "Standardized in ITU-T X.509 and IETF RFC 5280, a digital certificate consists of: 1. `tbsCertificate`: The core data block containing serial number, validity dates, subject DN, issuer DN, public key, and extensions; 2. `signatureAlgorithm`: The cryptographic algorithm identifier (e.g. `sha256WithRSAEncryption`); 3. `signatureValue`: The BIT STRING containing the CA's RSA digital signature computed over the ASN.1 DER hash of `tbsCertificate`.",
    hint: "Think of an official identity card: the information on the card, the stamp type, and the authorized officer's physical signature.",
    level: "basic",
    codeExample: `// Top-Level X.509 ASN.1 Structure (RFC 5280):
Certificate  ::=  SEQUENCE  {
     tbsCertificate       TBSCertificate,
     signatureAlgorithm   AlgorithmIdentifier,
     signatureValue       BIT STRING  }  // CA's RSA Digital Signature`
  },
  {
    question: "What is the 'Subject Alternative Name' (SAN) extension in X.509 v3, and why did it replace the legacy 'Common Name' (CN) field?",
    shortAnswer: "SAN (RFC 5280) allows a single certificate to secure multiple fully qualified domain names (FQDNs), IP addresses, and wildcard subdomains; CN is legacy, deprecated by RFC 6125, and limited to a single hostname.",
    explanation: "Historically, the Subject Distinguished Name's Common Name (`CN=example.com`) was used for domain validation. However, CN cannot specify multiple domains, IP addresses, or multi-tenant services. The Subject Alternative Name (SAN) extension (`2.5.29.17`) supports an array of `dNSName` entries (`api.example.com`, `pay.example.com`, `*.example.com`, `IP:192.168.1.1`). Modern browsers (Chrome, Firefox, Safari) strictly require SAN and ignore the Common Name field completely for HTTPS verification.",
    hint: "Think of listing all authorized company aliases on a single business permit.",
    level: "moderate",
    codeExample: `// X.509 v3 Subject Alternative Name (SAN) Extension:
X509v3 Subject Alternative Name:
    DNS:api.bank.in, DNS:pay.bank.in, DNS:*.secure.bank.in, IP Address:10.0.4.1
Status: MANDATORY for all modern web browsers (CN field is ignored!)`
  },
  {
    question: "What is the 'Basic Constraints' extension (`2.5.29.19`), and why is `CA:FALSE` critical on end-entity web server certificates?",
    shortAnswer: "Basic Constraints specifies whether a certificate belongs to a Certificate Authority (`CA:TRUE`) or an end-entity (`CA:FALSE`); if an end-entity has `CA:TRUE`, an attacker holding that certificate can forge valid intermediate CAs and sign rogue certificates for any website.",
    explanation: "If a CA erroneously issues a leaf certificate with `Basic Constraints: CA:TRUE`, the certificate owner can act as a rogue intermediate CA and issue valid, trusted SSL certificates for `google.com` or `bank.in`. To prevent this catastrophic vulnerability, all leaf web servers, doctors, and VPN clients must have `Basic Constraints: critical, CA:FALSE`. Intermediate CAs must have `CA:TRUE` with an optional `pathLenConstraint` restricting downstream sub-CAs.",
    hint: "Think of an employee ID badge that explicitly states 'NOT AUTHORIZED TO HIRE OR ISSUE BADGES'.",
    level: "expert",
    codeExample: `// Basic Constraints Extension Comparison:
Leaf TLS Server Certificate:  Basic Constraints: critical, CA:FALSE (CANNOT SIGN OTHER CERTS!)
Intermediate CA Certificate:  Basic Constraints: critical, CA:TRUE, pathLenConstraint:0`
  },
  {
    question: "What is the 'pathLenConstraint' parameter inside the Basic Constraints extension of an Intermediate CA?",
    shortAnswer: "It specifies the maximum number of intermediate CA certificates that may follow this certificate in a valid trust chain; `pathLenConstraint:0` means the intermediate CA can only issue leaf end-entity certificates, not further sub-CAs.",
    explanation: "When a Root CA issues an Intermediate CA certificate, it sets `pathLenConstraint: 0` to prevent that Intermediate CA from sub-delegating its signing authority to third parties. If an unauthorized sub-CA certificate appears downstream, the client's RFC 5280 path validation algorithm immediately rejects the trust chain with a path length violation error.",
    hint: "Think of a manager who has the power to sign documents for clients, but is prohibited from hiring assistant managers.",
    level: "expert",
    codeExample: `// Intermediate CA with pathLenConstraint:
X509v3 Basic Constraints: critical
    CA:TRUE, pathlen:0
Impact: This Intermediate CA can sign 'api.example.com' (Leaf), but CANNOT create Sub-CAs!`
  },
  {
    question: "Step through the 6-step RFC 5280 Certificate Chain Path Validation Algorithm executed by web browsers during a TLS handshake.",
    shortAnswer: "1. Build chain from leaf to root; 2. Verify validity dates (`notBefore`/`notAfter`); 3. Verify name chaining ($Issuer_{n} == Subject_{n+1}$); 4. Verify cryptographic signatures ($S_n$ using $PubKey_{n+1}$); 5. Verify Basic Constraints & PathLen; 6. Check revocation (OCSP/CRL).",
    explanation: "During a TLS handshake: 1. The client builds the certificate chain: Leaf $\\to$ Intermediate $\\to$ Root; 2. Checks that the current system time falls within the validity window $[\\text{notBefore}, \\text{notAfter}]$ for every certificate; 3. Checks that each certificate's Issuer DN matches the parent's Subject DN; 4. Cryptographically verifies each RSA/ECDSA signature using the parent CA's public key; 5. Confirms Basic Constraints (`CA:TRUE` on intermediates, `CA:FALSE` on leaf); 6. Validates revocation status via OCSP Stapling or CRLs; 7. Confirms the Root CA is pre-installed in the local OS Trust Store.",
    hint: "Follow the links of the chain upward, checking dates, names, cryptographic signatures, and root trust.",
    level: "expert",
    codeExample: `// RFC 5280 Path Validation Algorithm:
Chain: [ Leaf (api.bank.in) ] ➔ [ Intermediate CA ] ➔ [ Root CA (In Trust Store) ]
Checks:
  1. Leaf Signature Verified by Intermediate Public Key? [ PASS ]
  2. Intermediate Signature Verified by Root Public Key?  [ PASS ]
  3. All Validity Dates Current?                         [ PASS ]
  4. Basic Constraints Valid (CA:TRUE on Intermediate)?   [ PASS ]
  5. OCSP Staple Valid & Unrevoked?                      [ PASS ]
  6. Root CA Present in OS Trust Store?                  [ PASS ]
Outcome: GREEN PADLOCK ESTABLISHED!`
  },
  {
    question: "What causes the notorious 'SSL Certificate Chain Incomplete / Missing Intermediate Certificate' error (SEC_ERROR_UNKNOWN_ISSUER)?",
    shortAnswer: "The web server only serves its leaf certificate and fails to bundle the Intermediate CA certificate; clients whose OS caches lack the intermediate CA cannot build the trust path to the Root CA.",
    explanation: "Operating system trust stores only contain Root CAs, not the thousands of Intermediate CAs worldwide. When a web server configures SSL, it must serve the complete certificate bundle containing `[leaf.crt + intermediate.crt]`. If the server administrator only configures `leaf.crt`, browsers without cached intermediate certificates cannot link the leaf to the trusted Root CA, throwing a security warning (`SEC_ERROR_UNKNOWN_ISSUER`). Fixing this requires concatenating the leaf and intermediate certificates into `fullchain.pem`.",
    hint: "Think of showing a client a letter signed by a regional manager without showing the document where the CEO authorized that manager.",
    level: "moderate",
    codeExample: `// Missing Intermediate Error & Fix:
Broken Server Config:  ssl_certificate /etc/ssl/leaf_only.crt;  (FAILS ON MOBILE BROWSERS!)
Correct Server Config: ssl_certificate /etc/ssl/fullchain.pem;  (Contains Leaf + Intermediate CAs)
Bundle Command:        cat leaf.crt intermediate.crt > fullchain.pem`
  },
  {
    question: "What is the difference between 'Key Usage' (`2.5.29.15`) and 'Extended Key Usage' (`2.5.29.37`) in X.509 certificates?",
    shortAnswer: "Key Usage defines low-level cryptographic operations (`digitalSignature`, `keyEncipherment`, `keyCertSign`); Extended Key Usage (EKU) defines application purposes (`serverAuth`, `clientAuth`, `codeSigning`, `emailProtection`).",
    explanation: "Key Usage specifies primitive cryptographic capabilities: `keyEncipherment` (RSA key wrapping in hybrid encryption), `digitalSignature` (signing data/tokens), `keyCertSign` (signing child certificates for CAs). Extended Key Usage (EKU) specifies high-level protocol purposes via OIDs: `serverAuth` (`1.3.6.1.5.5.7.3.1` for TLS web servers), `clientAuth` (mTLS client authentication), `codeSigning` (executables), and `emailProtection` (S/MIME). Using a certificate for an unapproved EKU causes validation failure.",
    hint: "Think of primitive tool capabilities (cutting, hammering) versus job roles (carpenter, electrician).",
    level: "moderate",
    codeExample: `// Key Usage vs Extended Key Usage in Web Server Cert:
X509v3 Key Usage: critical
    Digital Signature, Key Encipherment
X509v3 Extended Key Usage:
    TLS Web Server Authentication (serverAuth), TLS Web Client Authentication (clientAuth)`
  },
  {
    question: "What are 'Authority Information Access' (AIA) and 'CRL Distribution Points' (CDP) extensions in X.509 certificates?",
    shortAnswer: "CDP provides HTTP URLs where clients can download Certificate Revocation Lists (CRLs); AIA provides HTTP URLs for the CA's real-time OCSP responder and Intermediate CA download links (`caIssuers`).",
    explanation: "These extensions tell relying parties where to fetch revocation and trust metadata: 1. CRL Distribution Points (`2.5.29.31`): Contains URLs (e.g. `http://crl.emudhra.com/master.crl`) to download active revocation lists; 2. Authority Information Access (`1.3.6.1.5.5.7.1.1`): Contains `OCSP - URI: http://ocsp.emudhra.com` for real-time status queries, and `CA Issuers - URI: http://cacerts.emudhra.com/intermediate.crt` to allow browsers to automatically fetch missing intermediate certificates (AIA Chasing).",
    hint: "Think of the phone number and address directory printed on the back of an official document.",
    level: "moderate",
    codeExample: `// AIA and CDP Extensions in X.509:
Authority Information Access:
    OCSP - URI: http://ocsp.emudhra.com
    CA Issuers - URI: http://cacerts.emudhra.com/intermediate.crt
X509v3 CRL Distribution Points:
    URI: http://crl.emudhra.com/class3_2026.crl`
  },
  {
    question: "What is the 'Authority Key Identifier' (AKI) versus 'Subject Key Identifier' (SKI) extension in X.509 v3?",
    shortAnswer: "SKI is a unique SHA-1/SHA-256 hash of this certificate's public key; AKI in a child certificate matches the SKI of the issuing parent CA, allowing clients to unambiguously find the parent CA when building trust chains.",
    explanation: "When a Certificate Authority operates multiple keys or renews its root certificate with the same Distinguished Name, clients building the certificate chain can become confused about which specific CA key signed the child certificate. The Subject Key Identifier (SKI) is a 20-byte hash of the certificate's own public key. When that CA signs a child certificate, it copies its SKI into the child's Authority Key Identifier (AKI) field. Clients simply match `Child.AKI == Parent.SKI` to construct the exact path in milliseconds.",
    hint: "Think of a child certificate carrying the exact digital fingerprint of its parent's signing key.",
    level: "expert",
    codeExample: `// SKI to AKI Matching in Trust Chains:
Parent Intermediate CA:
    X509v3 Subject Key Identifier:   3A:9F:8B:12:...:5C
Child Leaf Certificate:
    X509v3 Authority Key Identifier: keyid:3A:9F:8B:12:...:5C (EXACT PARENT MATCH!)`
  },
  {
    question: "Under the Information Technology Act 2000 Section 35 and CCA India Guidelines, what are the mandatory X.509 certificate profile fields for Indian Class 3 Digital Signature Certificates (DSCs)?",
    shortAnswer: "Mandatory: RSA-2048/SHA-256; Subject DN containing PAN/Aadhaar pseudonym hash (`postalCode`, `st`, `cn`); Key Usage `digitalSignature, nonRepudiation`; and certificate policy OID `2.16.356.100.1.3` (CCA Class 3).",
    explanation: "The Controller of Certifying Authorities (CCA India) enforces strict ASN.1 profiles for Indian DSCs: 1. Cryptographic spec: Minimum RSA-2048 with SHA-256; 2. Subject DN: Must include Common Name, State, Country `IN`, and unique pseudonym hash; 3. Key Usage: Must assert `Digital Signature, Non-Repudiation` (critical); 4. Certificate Policies: Must include Indian CCA specific OIDs (`2.16.356.100.1.3` for Class 3 Individual); 5. Storage: Issued directly onto FIPS 140-2 Level 2 crypto USB tokens.",
    hint: "Remember the CCA India specific policy OID and non-repudiation key usage requirement.",
    level: "basic",
    codeExample: `// Indian Class 3 DSC X.509 Profile:
Subject: CN=Sukanta Hui, SERIALNUMBER=pan_hash_123, ST=West Bengal, C=IN
Key Usage: critical, Digital Signature, Non Repudiation
Certificate Policies:
    Policy: 2.16.356.100.1.3 (CCA India Class 3 Individual Digital Signature)`
  },
  {
    question: "How do operating systems and web browsers manage the Root Trust Store (e.g. Windows CryptoAPI, Mozilla NSS, Apple Keychain, Android Keystore)?",
    shortAnswer: "OS and browser vendors maintain a curated, cryptographically signed list of ~150 trusted Root CAs; only certificates that successfully trace a cryptographic signature chain to an entry in this local store are trusted.",
    explanation: "Every major operating system and browser maintains a trusted Root Store (e.g. Mozilla NSS, Windows `certmgr.msc`, Apple System Keychain, Linux `/etc/ssl/certs`). Inclusion in these stores requires rigorous annual WebTrust or ETSI compliance audits. When a user navigates to an HTTPS website, the browser validates the path until it finds a certificate matching a public key pre-installed in its local trust store. If no match is found, the connection is untrusted.",
    hint: "Think of the official national immigration database that border officers use to verify passports.",
    level: "basic",
    codeExample: `// Root Trust Store Hierarchy:
Client Machine: [ Mozilla NSS / Windows Certificate Store ]
Contains: ~150 Audited Root CAs (DigiCert, Let's Encrypt ISRG Root X1, India PKI Root CA)
Verification: Leaf → Intermediate → Root (Matches Store Entry == TRUSTED!)`
  },
  {
    question: "What is 'Self-Signed Certificate' versus a 'CA-Signed Certificate', and why are self-signed certificates strictly forbidden in public production environments?",
    shortAnswer: "A self-signed certificate has $Issuer == Subject$ and is signed by its own private key; because no browser has this certificate in its root store, users receive severe security warnings ('Your connection is not private').",
    explanation: "In a self-signed certificate, the creator signs their own public key with their own private key. While useful for local development and private testing, self-signed certificates provide zero identity assurance against Man-in-the-Middle attackers (any attacker can generate a self-signed certificate for `google.com`). Browsers flag them with red warning banners, and search engines penalize them. Production web applications must use CA-signed certificates (e.g. Let's Encrypt / DigiCert) or an automated private PKI.",
    hint: "Think of writing your own homemade driver's license with a crayon and trying to board an airplane.",
    level: "basic",
    codeExample: `// Self-Signed vs CA-Signed:
Self-Signed: Issuer: CN=myapi.com == Subject: CN=myapi.com → BROWSER BLOCKS ACCESS!
CA-Signed:   Issuer: CN=Let's Encrypt != Subject: CN=myapi.com → GREEN PADLOCK!`
  },
  {
    question: "Synthesizing Digital Certificates and Trust Chains: what is the master cryptographic verification formula of an X.509 certificate chain?",
    shortAnswer: "$$\\text{Verify}\\Big(\\text{Sign}_{CA}, \\text{Hash}(\\text{TBS}_{Leaf}), \\text{PubKey}_{Intermediate}\\Big) = \\text{True} \\quad \\& \\quad \\text{Verify}\\Big(\\text{Sign}_{Root}, \\text{Hash}(\\text{TBS}_{Int}), \\text{PubKey}_{Root}\\Big) = \\text{True}$$",
    explanation: "This dual verification formula mathematically defines the trust chain: 1. The Intermediate CA's public key decrypts the leaf certificate's signature value, verifying that it matches the SHA-256 hash of the leaf `tbsCertificate`; 2. The Root CA's public key (stored in the client's trust store) decrypts the Intermediate CA's signature value, verifying that it matches the SHA-256 hash of the intermediate `tbsCertificate`. This unbroken cryptographic chain provides mathematical proof of authenticity.",
    hint: "Conclude by reviewing the mathematical verification of parent-child signature hashes across the trust chain.",
    level: "expert",
    codeExample: `// Master Trust Chain Verification Equation:
1. RSA_Verify( Leaf_Signature, SHA256(Leaf_TBS), Intermediate_PubKey ) == TRUE
2. RSA_Verify( Intermediate_Signature, SHA256(Int_TBS), Root_PubKey_From_OS_Store ) == TRUE
Outcome: MATHEMATICALLY PROVED TRUST CHAIN!`
  }
];

export default questions;
