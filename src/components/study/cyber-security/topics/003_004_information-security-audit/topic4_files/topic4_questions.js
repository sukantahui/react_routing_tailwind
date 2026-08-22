const questions = [
  {
    question: "What are the two fundamental quality criteria that all audit evidence must satisfy under ISO 19011 and ISACA standards?",
    options: [
      "Speed and low acquisition cost",
      "Sufficiency (quantity) and Appropriateness (relevance and reliability)",
      "Subjective opinion and executive endorsement",
      "Single-source verification and verbal confirmation"
    ],
    correctAnswer: 1,
    explanation: "Audit evidence must be sufficient (factual measure of quantity and completeness to support audit findings) and appropriate (measure of quality, relevance to the audit objective, and reliability of the source)."
  },
  {
    question: "Which type of audit evidence is generally considered the most reliable during an information security audit?",
    options: [
      "Oral statements provided during casual interviews with system administrators",
      "Direct physical observation, automated cryptographic exports, and third-party independent confirmations",
      "Unsigned Word documents summarizing policy drafts",
      "Self-attested vendor marketing datasheets"
    ],
    correctAnswer: 1,
    explanation: "Direct evidence obtained independently by the auditor (such as physical inspection, automated tool captures with cryptographic hashes, or direct system observation) is far more reliable than testimonial or self-generated unverified documentation."
  },
  {
    question: "In the context of digital audit evidence in India, what legal certification has traditionally validated electronic record admissibility (formerly Section 65B of Indian Evidence Act / now under Bharatiya Sakshya Adhiniyam 2023)?",
    options: [
      "A verbal statement recorded on a personal mobile phone",
      "An Electronic Record Certificate signed by a person occupying an official responsible position managing the computer device",
      "An unencrypted USB drive handed over without an inventory log",
      "A screenshot posted on an internal chat channel"
    ],
    correctAnswer: 1,
    explanation: "Electronic records require an official certificate declaring device custody, operating integrity, output generation details, and management responsibility to establish legal admissibility and evidentiary weight."
  },
  {
    question: "What is the primary objective of maintaining a strict 'Chain of Custody' (CoC) for security audit and forensic artifacts?",
    options: [
      "To ensure that only senior executives are allowed to read the files",
      "To provide an unbroken, verifiable chronological record of who collected, handled, transferred, analyzed, and stored the evidence to prevent and prove non-tampering",
      "To compress disk storage requirements for audit archives",
      "To speed up penetration testing execution times"
    ],
    correctAnswer: 1,
    explanation: "Chain of Custody provides a legally defensible, verifiable chronological paper trail demonstrating that evidence was preserved in its pristine original state without unauthorized access, tampering, or substitution."
  },
  {
    question: "Why should an auditor calculate and record cryptographic hashes (such as SHA-256) immediately upon capturing digital evidence or configuration dumps?",
    options: [
      "To compress the file size by 50%",
      "To establish a mathematical baseline checksum that proves the evidence has remained bit-for-bit identical over time",
      "To automatically decrypt confidential user passwords",
      "To convert raw log files into visual bar charts"
    ],
    correctAnswer: 1,
    explanation: "A cryptographic hash (e.g., SHA-256) acts as a unique digital fingerprint; matching hashes at later stages proves beyond doubt that the captured data was not modified, truncated, or tampered with during analysis."
  }
];

export default questions;
