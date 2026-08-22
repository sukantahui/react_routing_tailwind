const topic7_questions = [
  {
    question: "Who introduced the Parkerian Hexad in 1998 to address the limitations of the traditional CIA Triad?",
    options: [
      "Bruce Schneier",
      "Donn B. Parker",
      "Whitfield Diffie",
      "Ron Rivest"
    ],
    correctAnswer: "Donn B. Parker",
    explanation: "Donn B. Parker, a renowned cyber security researcher at SRI International, published the Parkerian Hexad in his 1998 book 'Fighting Computer Crime: A New Framework for Protecting Information' to expand the classic CIA triad into six atomic attributes."
  },
  {
    question: "Which of the following attributes completes the six pillars of the Parkerian Hexad alongside Confidentiality, Integrity, and Availability?",
    options: [
      "Non-Repudiation, Auditing, Authorization",
      "Possession (or Control), Authenticity, Utility",
      "Resilience, Scalability, Redundancy",
      "Privacy, Anonymity, Pseudonymity"
    ],
    correctAnswer: "Possession (or Control), Authenticity, Utility",
    explanation: "The Parkerian Hexad consists of six atomic, independent security attributes: Confidentiality, Integrity, Availability, Possession (or Control), Authenticity, and Utility."
  },
  {
    question: "If an encrypted external hard disk containing confidential financial ledgers is physically stolen from a corporate office in Kolkata, which Parkerian Hexad attribute is compromised even if the strong AES-256 encryption prevents unauthorized reading?",
    options: [
      "Confidentiality",
      "Possession (or Control)",
      "Authenticity",
      "Utility"
    ],
    correctAnswer: "Possession (or Control)",
    explanation: "Possession (or Control) refers to physical or logical custody of the data medium. Even if Confidentiality is intact due to robust AES-256 encryption, the organization has lost physical Possession and control of the physical storage asset."
  },
  {
    question: "Suppose ransomware encrypts a server's files with an unrecoverable military-grade key, but does not exfiltrate or modify the underlying data structures. Which Parkerian Hexad attribute is destroyed because the data can no longer be deciphered or used for business operations?",
    options: [
      "Possession",
      "Utility",
      "Authenticity",
      "Non-Repudiation"
    ],
    correctAnswer: "Utility",
    explanation: "Utility defines the usefulness or functional usability of information. When files are encrypted with an unknown or destroyed key, the encrypted bits remain intact and in possession, but their Utility drops to zero because they cannot be read or processed."
  },
  {
    question: "How does 'Authenticity' in the Parkerian Hexad differ from 'Integrity'?",
    options: [
      "Integrity ensures data is encrypted, while Authenticity ensures data is compressed.",
      "Integrity ensures data has not been altered in transit, while Authenticity validates the true identity and origin of the author or creator.",
      "Authenticity only applies to hardware devices, while Integrity only applies to relational databases.",
      "There is no difference; they are exact synonyms in information theory."
    ],
    correctAnswer: "Integrity ensures data has not been altered in transit, while Authenticity validates the true identity and origin of the author or creator.",
    explanation: "Integrity verifies that information remains complete, accurate, and uncorrupted. Authenticity confirms the genuine provenance, authorship, and validity of the claimed source (e.g. valid digital signature confirming it truly came from Mamata's verified key)."
  },
  {
    question: "In cyber security and cryptographic legal systems, what is the primary definition of 'Non-Repudiation'?",
    options: [
      "The ability to erase digital evidence permanently without forensic recovery.",
      "The assurance that an individual or system cannot deny the authenticity of their signature on a document or the sending of a transaction.",
      "The automatic replication of database records across multiple geographic regions.",
      "The conversion of plain text into irreversible one-way SHA-256 hashes."
    ],
    correctAnswer: "The assurance that an individual or system cannot deny the authenticity of their signature on a document or the sending of a transaction.",
    explanation: "Non-repudiation provides irrefutable mathematical and cryptographic proof of the origin, receipt, and delivery of a message, making it impossible for the sender or recipient to dispute their participation."
  },
  {
    question: "Under the Indian Information Technology (IT) Act 2000, which section grants legal recognition and non-repudiation validity to electronic records authenticated via Digital Signatures (PKI)?",
    options: [
      "Section 3 and Section 10A",
      "Section 66F",
      "Section 43A",
      "Section 79"
    ],
    correctAnswer: "Section 3 and Section 10A",
    explanation: "Section 3 and Section 10A of the Indian IT Act 2000 establish legal validity for electronic contracts and digital signatures generated via asymmetric cryptosystems, providing statutory backing for non-repudiation."
  },
  {
    question: "Which cryptographic mechanism is essential for achieving true non-repudiation in electronic banking transactions in India (e.g. RTGS transfers above ₹50 Lakh)?",
    options: [
      "Symmetric AES-256 encryption using a shared secret key",
      "Asymmetric Digital Signatures created with a private key stored in a FIPS 140-2 Level 3 Hardware Security Module (HSM)",
      "Standard MD5 checksum hashing",
      "Base64 URL encoding"
    ],
    correctAnswer: "Asymmetric Digital Signatures created with a private key stored in a FIPS 140-2 Level 3 Hardware Security Module (HSM)",
    explanation: "Because only the authorized signer possesses the private key (held within a secure tamper-resistant HSM), an asymmetric digital signature proves the signer uniquely authorized the transaction, enforcing non-repudiation."
  },
  {
    question: "Why cannot symmetric key encryption (such as AES or 3DES) alone provide non-repudiation between two communicating parties?",
    options: [
      "Symmetric keys are too long to compute digital signatures.",
      "Both sender and receiver share the exact same secret key, so either party could have generated or forged the ciphertext.",
      "Symmetric encryption does not support binary data.",
      "Symmetric algorithms run too fast for audit loggers."
    ],
    correctAnswer: "Both sender and receiver share the exact same secret key, so either party could have generated or forged the ciphertext.",
    explanation: "In symmetric cryptography, both sender and receiver possess identical copies of the shared secret key. Therefore, neither party can prove to a neutral third party (such as a court) that they didn't create the message themselves."
  },
  {
    question: "What role does a Time Stamping Authority (TSA) compliant with RFC 3161 play in supporting non-repudiation?",
    options: [
      "It compresses the message to save hard drive space.",
      "It provides tamper-proof cryptographic proof that a specific document or signature existed at an exact UTC timestamp prior to any key revocation.",
      "It acts as a dynamic DNS proxy for web traffic.",
      "It automatically decrypts SSL/TLS sessions."
    ],
    correctAnswer: "It provides tamper-proof cryptographic proof that a specific document or signature existed at an exact UTC timestamp prior to any key revocation.",
    explanation: "An RFC 3161 compliant TSA combines the hash of the document with an authoritative atomic clock time, digitally signs the bundle, and proves the signature was created while the digital certificate was active and valid."
  },
  {
    question: "Consider a case where an attacker intercepts an unencrypted email in transit and modifies the bank account number from a vendor in Barrackpore. Which attributes of the Parkerian Hexad are violated?",
    options: [
      "Only Availability",
      "Confidentiality and Integrity",
      "Possession and Utility",
      "Only Utility"
    ],
    correctAnswer: "Confidentiality and Integrity",
    explanation: "Because the email was intercepted and read without authorization, Confidentiality was violated. Because the financial account number was altered, Integrity was also violated."
  },
  {
    question: "A company in Jadavpur converts ₹10,000 corporate bonds into an unreadable proprietary database format whose legacy decoding software has been permanently discarded. Which Hexad attribute is compromised?",
    options: [
      "Utility",
      "Possession",
      "Confidentiality",
      "Authenticity"
    ],
    correctAnswer: "Utility",
    explanation: "The company still possesses the physical drives (Possession), the bits are untouched (Integrity), nobody unauthorized has read them (Confidentiality), but because no software exists to parse the data, its Utility is completely lost."
  },
  {
    question: "Which of the following is considered an attack specifically targeting the 'Authenticity' attribute of the Parkerian Hexad?",
    options: [
      "SYN Flood DDoS attack",
      "Deepfake voice spoofing of a CEO authorizing an emergency ₹25 Lakh wire transfer",
      "Power failure in a primary data center",
      "Physical theft of a decommissioned backup tape"
    ],
    correctAnswer: "Deepfake voice spoofing of a CEO authorizing an emergency ₹25 Lakh wire transfer",
    explanation: "Deepfake audio or spoofed executive communications impersonate a genuine identity, attacking the Authenticity attribute of the communication channel."
  },
  {
    question: "In the United States Department of Defense (DoD) Directive 8500.01E and NIST SP 800-53, what are the 'Five Pillars of Information Assurance (IA)'?",
    options: [
      "Confidentiality, Integrity, Availability, Authentication, Non-Repudiation",
      "Firewalls, Antivirus, IDS, IPS, SIEM",
      "Identification, Authentication, Authorization, Accounting, Auditing",
      "People, Processes, Technology, Governance, Compliance"
    ],
    correctAnswer: "Confidentiality, Integrity, Availability, Authentication, Non-Repudiation",
    explanation: "The classic DoD Five Pillars of Information Assurance extend CIA by explicitly incorporating Authentication (verifying identity) and Non-Repudiation (preventing transaction denial)."
  },
  {
    question: "What is 'Non-Repudiation of Origin'?",
    options: [
      "Proof that a message was received by the intended recipient.",
      "Proof that the creator/sender generated the message and cannot claim it was forged by someone else.",
      "Proof that the network cable was manufactured in India.",
      "Proof that the hard drive has zero bad sectors."
    ],
    correctAnswer: "Proof that the creator/sender generated the message and cannot claim it was forged by someone else.",
    explanation: "Non-repudiation of origin provides the receiver with cryptographic evidence of the sender's identity, preventing the creator from denying they originated the transmission."
  },
  {
    question: "What is 'Non-Repudiation of Delivery / Receipt'?",
    options: [
      "Cryptographic acknowledgment proving the recipient successfully received the data at a specified time.",
      "Deleting the message after reading to save cloud storage costs.",
      "Sending duplicate emails over three redundant fiber connections.",
      "Changing user passwords every 30 days."
    ],
    correctAnswer: "Cryptographic acknowledgment proving the recipient successfully received the data at a specified time.",
    explanation: "Non-repudiation of receipt provides the sender with indisputable cryptographic proof that the recipient received the message intact, preventing the receiver from claiming 'I never got the file'."
  },
  {
    question: "Why does Donn B. Parker argue that 'Integrity' in the CIA triad is overloaded and misleading?",
    options: [
      "Because integrity is computationally impossible to measure.",
      "Because the classic triad conflates the wholeness of data (Integrity) with source verification (Authenticity) and functional applicability (Utility).",
      "Because integrity only applies to printed paper documents.",
      "Because hash functions like SHA-256 have been completely broken."
    ],
    correctAnswer: "Because the classic triad conflates the wholeness of data (Integrity) with source verification (Authenticity) and functional applicability (Utility).",
    explanation: "Parker demonstrated that data can be 100% whole and unaltered (Integrity) while being totally useless (loss of Utility) or coming from an imposter (loss of Authenticity)."
  },
  {
    question: "Suppose an engineer at Ichapur Ordnance Factory receives a CAD drawing with an MD5 hash matching the manifest, but the drawing was uploaded by a compromised rogue engineer's account. Which Hexad attribute was preserved and which was violated?",
    options: [
      "Integrity was preserved (hash matched), but Authenticity was violated (imposter source).",
      "Confidentiality was violated, but Possession was preserved.",
      "Utility was preserved, but Availability was violated.",
      "Both Integrity and Authenticity were preserved."
    ],
    correctAnswer: "Integrity was preserved (hash matched), but Authenticity was violated (imposter source).",
    explanation: "The file was transmitted without bit corruption (Integrity preserved), but because the originator was compromised and not the authentic authorized designer, Authenticity was violated."
  },
  {
    question: "Which component of Public Key Infrastructure (PKI) maintains a publicly accessible list of revoked digital certificates to prevent fraudulent non-repudiation claims?",
    options: [
      "Certificate Revocation List (CRL) and Online Certificate Status Protocol (OCSP)",
      "Network Address Translation (NAT) table",
      "Border Gateway Protocol (BGP) routing table",
      "Dynamic Host Configuration Protocol (DHCP) lease database"
    ],
    correctAnswer: "Certificate Revocation List (CRL) and Online Certificate Status Protocol (OCSP)",
    explanation: "CRLs and OCSP responders provide real-time status on whether a certificate has been invalidated prior to expiration (e.g. due to private key compromise), critical for verifying non-repudiation."
  },
  {
    question: "How does dynamic blockchain technology contribute to non-repudiation in financial smart contracts?",
    options: [
      "By allowing miners to edit past blocks at will.",
      "By recording transactions in cryptographically chained, consensus-validated immutable blocks that cannot be altered or denied retroactively.",
      "By replacing all asymmetric keys with simple plaintext passwords.",
      "By storing private keys in public Github repositories."
    ],
    correctAnswer: "By recording transactions in cryptographically chained, consensus-validated immutable blocks that cannot be altered or denied retroactively.",
    explanation: "The distributed consensus and cryptographic hash chaining of blockchain ledgers ensure that once a transaction is committed, neither party can erase, alter, or deny its execution."
  },
  {
    question: "A security analyst in Barrackpore discovers that an employee cloned a colleague's encrypted laptop SSD onto a personal portable drive. Confidentiality was preserved because the BitLocker key was unknown. Which attribute was breached?",
    options: [
      "Possession (or Control)",
      "Availability",
      "Utility",
      "Non-Repudiation"
    ],
    correctAnswer: "Possession (or Control)",
    explanation: "Unauthorized replication and extraction of encrypted raw blocks represents a direct breach of Possession/Control, as an unauthorized entity now possesses a copy of the physical/logical asset."
  },
  {
    question: "What is an 'Immutable Audit Log' and why is it essential for non-repudiation during forensic investigations in Kolkata high courts?",
    options: [
      "A text file that system administrators can modify to clean up error messages.",
      "A write-once-read-many (WORM) log storage system that cryptographically hashes and signs log events so they cannot be altered or deleted by attackers or admins.",
      "A temporary cache stored in volatile RAM.",
      "A network bandwidth monitoring chart."
    ],
    correctAnswer: "A write-once-read-many (WORM) log storage system that cryptographically hashes and signs log events so they cannot be altered or deleted by attackers or admins.",
    explanation: "Immutable WORM audit logs prevent malicious actors (or rogue privileged admins) from tampering with historical action records, providing admissible forensic evidence for non-repudiation."
  },
  {
    question: "In what scenario does an organization experience a complete loss of 'Availability' while maintaining 'Confidentiality', 'Integrity', and 'Possession'?",
    options: [
      "A distributed denial-of-service (DDoS) attack completely saturates the web server's broadband pipe, preventing incoming customer requests.",
      "An insider exfiltrates patient health records to a public darknet forum.",
      "A database administrator accidentally drops production tables.",
      "An attacker installs a keylogger on all employee workstations."
    ],
    correctAnswer: "A distributed denial-of-service (DDoS) attack completely saturates the web server's broadband pipe, preventing incoming customer requests.",
    explanation: "During a network DDoS flood, the data sitting on the local servers remains unread by attackers (Confidentiality), uncorrupted (Integrity), and physically on premise (Possession), but legitimate clients cannot access it (loss of Availability)."
  },
  {
    question: "What is 'Dual Control' (or Split Knowledge) in the context of high-assurance non-repudiation and cryptographic key management?",
    options: [
      "Using two computer mice on one monitor.",
      "A security procedure requiring two authorized individuals to provide separate credentials or smart cards to perform a critical operation (such as signing an emergency wire transfer of ₹10 Crore).",
      "Connecting two internet routers to the same ethernet port.",
      "Running two different antivirus programs simultaneously."
    ],
    correctAnswer: "A security procedure requiring two authorized individuals to provide separate credentials or smart cards to perform a critical operation (such as signing an emergency wire transfer of ₹10 Crore).",
    explanation: "Dual control and split knowledge ensure that no single rogue individual can unilaterally authorize high-risk transactions, reinforcing operational authenticity and non-repudiation."
  },
  {
    question: "If a company's data backup is saved in a proprietary raster graphic format and the raster rendering engine is lost, what was compromised under Donn Parker's model?",
    options: [
      "Utility",
      "Confidentiality",
      "Possession",
      "Non-Repudiation"
    ],
    correctAnswer: "Utility",
    explanation: "The data is still present and intact, but unusable because the tool required to extract meaning has disappeared, representing a classic loss of Utility."
  },
  {
    question: "Which of the following standards specifies requirements for cryptographic modules to ensure private keys used for non-repudiation cannot be extracted?",
    options: [
      "FIPS 140-2 / FIPS 140-3",
      "IEEE 802.11ax",
      "ISO 9001",
      "RFC 1918"
    ],
    correctAnswer: "FIPS 140-2 / FIPS 140-3",
    explanation: "NIST FIPS 140-2 / 140-3 defines security standards for Hardware Security Modules (HSMs) and smart cards, ensuring private cryptographic keys cannot be extracted even under physical probing."
  },
  {
    question: "What happens when an enterprise relies exclusively on the 3-pillar CIA triad rather than extended models like Parkerian Hexad?",
    options: [
      "Security teams overlook critical loss states such as loss of possession of encrypted backups, data usability failures, and identity impersonation.",
      "Network speeds automatically decrease by 50%.",
      "The operating system refuses to boot.",
      "Cloud storage costs double immediately."
    ],
    correctAnswer: "Security teams overlook critical loss states such as loss of possession of encrypted backups, data usability failures, and identity impersonation.",
    explanation: "The CIA triad's simplicity can create blind spots where stolen encrypted drives (loss of possession), unreadable encrypted archives (loss of utility), or spoofed authors (loss of authenticity) are mistakenly categorized as 'no security incident'."
  },
  {
    question: "In email security, which three protocols work together to enforce 'Authenticity' of the sender domain and prevent spoofing?",
    options: [
      "SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC",
      "HTTP, FTP, and Telnet",
      "DHCP, DNS, and RIP",
      "SNMP, NetBIOS, and SMB"
    ],
    correctAnswer: "SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC",
    explanation: "SPF validates sending server IP addresses, DKIM provides cryptographic signature authenticity on email headers, and DMARC defines enforcement policies, collectively protecting domain Authenticity."
  },
  {
    question: "How does cryptographic Non-Repudiation protect e-commerce merchants in Kolkata from 'Friendly Fraud' (chargeback dispute abuse)?",
    options: [
      "By eliminating all shipping fees for customers.",
      "By producing verifiable 3D-Secure OTP authentication tokens and digitally signed transaction receipts to prove in bank arbitration that the cardholder authorized the payment.",
      "By blocking all credit card payments entirely.",
      "By storing customer CVV codes in cleartext."
    ],
    correctAnswer: "By producing verifiable 3D-Secure OTP authentication tokens and digitally signed transaction receipts to prove in bank arbitration that the cardholder authorized the payment.",
    explanation: "When a customer claims they never authorized a ₹15,000 purchase, the merchant presents cryptographic 3D-Secure logs, IP address traces, and two-factor authentication tokens proving non-repudiation."
  },
  {
    question: "Which of the following summaries best expresses the relationship between the CIA Triad, Parkerian Hexad, and Non-Repudiation?",
    options: [
      "The CIA Triad is obsolete and illegal to use under modern cybersecurity frameworks.",
      "The CIA Triad is the foundational baseline, the Parkerian Hexad unpacks it into 6 atomic dimensions (adding Possession, Authenticity, Utility), and Non-Repudiation binds transactions cryptographically for legal accountability.",
      "Non-repudiation is only used in military radar communications.",
      "Parkerian Hexad was developed specifically for smartphone mobile gaming."
    ],
    correctAnswer: "The CIA Triad is the foundational baseline, the Parkerian Hexad unpacks it into 6 atomic dimensions (adding Possession, Authenticity, Utility), and Non-Repudiation binds transactions cryptographically for legal accountability.",
    explanation: "The CIA triad offers a foundational conceptual framework, the Parkerian Hexad provides atomic granularity for rigorous risk modeling, and Non-Repudiation provides indisputable cryptographic and legal accountability."
  }
];

export default topic7_questions;
