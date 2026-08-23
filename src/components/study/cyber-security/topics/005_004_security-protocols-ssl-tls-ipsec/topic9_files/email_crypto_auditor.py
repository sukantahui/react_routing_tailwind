#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: S/MIME & OPENPGP HYBRID ENCRYPTION & DMARC SIMULATOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_004 (SSL, TLS & IPsec)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides forensic simulation of:
1. Hybrid Asymmetric Email Encryption & Digital Signing (S/MIME and OpenPGP).
2. MIME multipart envelope construction (multipart/signed and multipart/encrypted).
3. SPF, DKIM signature verification, and DMARC alignment policy enforcement.
"""

import sys
import hashlib
import hmac
import os
import binascii
from dataclasses import dataclass
from typing import Dict, List, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# DATA STRUCTURES
# =============================================================================

@dataclass
class EmailEnvelope:
    sender: str
    recipient: str
    subject: str
    plaintext_body: str
    is_signed: bool = True
    is_encrypted: bool = True

@dataclass
class DMARCValidationResult:
    domain: str
    spf_result: str            # "PASS", "FAIL"
    dkim_result: str           # "PASS", "FAIL"
    dmarc_policy: str          # "reject", "quarantine", "none"
    final_verdict: str         # "DELIVER_INBOX", "QUARANTINE_SPAM", "REJECT_DROP"

# =============================================================================
# EMAIL CRYPTOGRAPHIC ENGINE
# =============================================================================

class EmailSecurityEngine:
    def __init__(self):
        self.dkim_private_key = b"BarrackporeDKIMSecretKey2026"

    def simulate_hybrid_encryption(self, email: EmailEnvelope) -> Dict[str, any]:
        """
        Executes hybrid encryption: generates random AES session key, encrypts body,
        and wraps session key with recipient's public key.
        """
        # Step 1: Digital Signature
        body_bytes = email.plaintext_body.encode("utf-8")
        body_hash = hashlib.sha256(body_bytes).digest()
        # Simulated asymmetric signature with sender private key
        digital_signature = hmac.new(b"SenderPrivateKey", body_hash, hashlib.sha256).hexdigest()

        # Step 2: Generate Ephemeral Symmetric Session Key (AES-256)
        session_key = os.urandom(32)
        session_key_hex = binascii.hexlify(session_key).decode()

        # Step 3: Symmetric Encryption of (Body + Signature)
        # (Simulated AES-GCM ciphertext)
        ciphertext = hashlib.sha256(session_key + body_bytes).hexdigest() + "..."

        # Step 4: Wrap Session Key with Recipient's Public Key
        wrapped_session_key = hashlib.sha256(b"RecipientPublicKey" + session_key).hexdigest()

        return {
            "sender": email.sender,
            "recipient": email.recipient,
            "subject": email.subject,
            "session_key_hex": session_key_hex[:16] + "...",
            "wrapped_session_key": wrapped_session_key[:24] + "...",
            "digital_signature": digital_signature[:24] + "...",
            "ciphertext_sample": ciphertext[:32] + "...",
            "mime_content_type": "multipart/encrypted; protocol=\"application/pkcs7-mime\""
        }

    def evaluate_dmarc(self, sender_domain: str, mail_from: str, client_ip: str, dkim_sig: str, policy: str) -> DMARCValidationResult:
        """
        Evaluates SPF, DKIM alignment, and DMARC action.
        """
        authorized_ips = ["203.0.113.10", "203.0.113.20"]
        spf_pass = (client_ip in authorized_ips) and (mail_from.endswith(sender_domain))
        dkim_pass = (len(dkim_sig) > 10) and (dkim_sig != "INVALID_SIGNATURE")

        # DMARC Alignment: Requires either SPF alignment OR DKIM alignment
        if spf_pass or dkim_pass:
            action = "DELIVER_INBOX (Authenticated)"
        else:
            if policy == "reject":
                action = "REJECT_DROP (Silently Rejected at SMTP Boundary)"
            elif policy == "quarantine":
                action = "QUARANTINE_SPAM (Routed to Junk/Spam Folder)"
            else:
                action = "DELIVER_INBOX (Flagged with Warning Header)"

        return DMARCValidationResult(
            domain=sender_domain,
            spf_result="PASS" if spf_pass else "FAIL",
            dkim_result="PASS" if dkim_pass else "FAIL",
            dmarc_policy=policy,
            final_verdict=action
        )

# =============================================================================
# CLI EXECUTION & DEMONSTRATION
# =============================================================================

def main():
    print("=" * 80)
    print("SECURE EMAIL PROTOCOLS: S/MIME, PGP & DMARC SIMULATOR")
    print("Instructor: Sukanta Hui | Location: Barrackpore, West Bengal")
    print("=" * 80)

    engine = EmailSecurityEngine()

    print("\n[+] 1. SIMULATING HYBRID EMAIL ENCRYPTION & SIGNING (S/MIME)...")
    sample_mail = EmailEnvelope(
        sender="susmita@treasury.barrackpore.gov.in",
        recipient="debangshu@defense.ichapur.gov.in",
        subject="Confidential: Pension Fund Allocation Batch #2026-Q3",
        plaintext_body="Approved allocation of ₹75,00,000 for municipal infrastructure development."
    )

    crypto_res = engine.simulate_hybrid_encryption(sample_mail)
    print(f"  • Sender            : {crypto_res['sender']}")
    print(f"  • Recipient         : {crypto_res['recipient']}")
    print(f"  • Ephemeral AES Key : {crypto_res['session_key_hex']}")
    print(f"  • Encrypted Key Blob: {crypto_res['wrapped_session_key']}")
    print(f"  • Digital Signature : {crypto_res['digital_signature']}")
    print(f"  • MIME Content-Type : {crypto_res['mime_content_type']}")

    print("\n[+] 2. EVALUATING DMARC ANTI-SPOOFING POLICY (PHISHING ATTACK SIMULATION)...")
    spoofed_attack = engine.evaluate_dmarc(
        sender_domain="barrackpore.gov.in",
        mail_from="ceo@barrackpore.gov.in",
        client_ip="198.51.100.99", # Rogue attacker IP
        dkim_sig="INVALID_SIGNATURE",
        policy="reject"
    )

    print(f"  • Target Domain     : {spoofed_attack.domain}")
    print(f"  • SPF Verification  : ❌ {spoofed_attack.spf_result}")
    print(f"  • DKIM Verification : ❌ {spoofed_attack.dkim_result}")
    print(f"  • DMARC Policy      : p={spoofed_attack.dmarc_policy}")
    print(f"  • Gateway Action    : 🛡️ {spoofed_attack.final_verdict}")

    print("\n" + "=" * 80)
    print("✔ Secure Email lab simulation completed successfully.")
    print("=" * 80)

if __name__ == "__main__":
    main()
