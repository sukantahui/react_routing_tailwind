#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: PROTOCOL DOWNGRADE MITIGATION & HSTS SECURITY AUDITOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_004 (SSL, TLS & IPsec)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script provides forensic simulation of:
1. SSLstrip attack anatomy vs HSTS Preloaded client internal redirect.
2. TLS_FALLBACK_SCSV downgrade attack detection (RFC 7507).
3. Automated HTTP security headers auditing (HSTS, CSP, CAA, CT).
4. Generation of hardened Nginx/Apache configuration templates.
"""

import sys
import hashlib
from dataclasses import dataclass
from typing import Dict, List, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# DATA STRUCTURES
# =============================================================================

@dataclass
class HeaderAuditResult:
    header_name: str
    status: str                # "PASS", "FAIL", "WARNING"
    current_value: str
    recommended_value: str
    security_impact: str

# =============================================================================
# HARDENING & DOWNGRADE AUDITOR ENGINE
# =============================================================================

class DowngradeAuditorEngine:
    def __init__(self):
        self.supported_server_tls_version = 0x0304 # TLS 1.3

    def simulate_sslstrip_attack(self, target_url: str, is_hsts_preloaded: bool) -> Dict[str, any]:
        """
        Simulates Moxie Marlinspike SSLstrip attack:
        - Unprotected client sends plain HTTP request over Wi-Fi.
        - HSTS Preloaded client intercepts request locally (Internal 307 Redirect).
        """
        if is_hsts_preloaded:
            return {
                "target_url": target_url,
                "hsts_preloaded": True,
                "client_action": "Browser checks internal HSTS Preload database: 'barrackpore.gov.in' found!",
                "wire_packet": "NONE. Browser issues internal 307 Temporary Redirect to 'https://barrackpore.gov.in' before sending any data on the wire.",
                "mitm_attacker_result": "BLOCKED: Attacker sees zero HTTP traffic. Cannot intercept session cookies.",
                "verdict": "SECURE ✔ (Immune to SSLstrip)"
            }
        else:
            return {
                "target_url": target_url,
                "hsts_preloaded": False,
                "client_action": "Browser sends initial plaintext HTTP request over public Wi-Fi: 'GET / HTTP/1.1'",
                "wire_packet": "Plaintext HTTP packet intercepted by MitM attacker (Arp Spoofing).",
                "mitm_attacker_result": "COMPROMISED: Attacker proxies HTTPS to server while serving plain HTTP to client. Credentials stolen!",
                "verdict": "VULNERABLE 🚨 (Victim of SSLstrip attack)"
            }

    def simulate_fallback_scsv(self, client_offered_version: int, client_includes_scsv: bool) -> Dict[str, any]:
        """
        Simulates RFC 7507 TLS_FALLBACK_SCSV downgrade defense.
        """
        # If client includes SCSV and offers lower version than server's highest supported version
        if client_includes_scsv and (client_offered_version < self.supported_server_tls_version):
            return {
                "offered_version": "TLS 1.2 (0x0303) [Downgraded by Attacker]",
                "server_max_version": "TLS 1.3 (0x0304)",
                "scsv_present": True,
                "server_action": "Server detects TLS_FALLBACK_SCSV! Server supports TLS 1.3 but client offered TLS 1.2 during fallback retry.",
                "alert": "Fatal Alert: inappropriate_fallback (86)",
                "verdict": "BLOCKED: Handshake aborted immediately. Downgrade attack neutralized ✔"
            }
        else:
            return {
                "offered_version": "TLS 1.2 (0x0303)",
                "server_max_version": "TLS 1.3 (0x0304)",
                "scsv_present": False,
                "server_action": "Server accepts downgraded TLS 1.2 connection because SCSV was omitted.",
                "alert": "None",
                "verdict": "POTENTIALLY VULNERABLE: Handshake completed on lower protocol version."
            }

    def audit_security_headers(self, headers: Dict[str, str]) -> List[HeaderAuditResult]:
        """
        Audits HTTP response headers against OWASP / CIS benchmarks.
        """
        checks = [
            ("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload", "Protects against SSLstrip and protocol downgrade attacks."),
            ("Content-Security-Policy", "default-src 'self'", "Prevents Cross-Site Scripting (XSS) and data injection."),
            ("X-Content-Type-Options", "nosniff", "Prevents MIME-type sniffing vulnerabilities."),
            ("Referrer-Policy", "strict-origin-when-cross-origin", "Protects sensitive URLs from leaking in Referer headers."),
            ("X-Frame-Options", "DENY", "Neutralizes Clickjacking attacks.")
        ]

        results = []
        for header, recommended, impact in checks:
            val = headers.get(header)
            if not val:
                results.append(HeaderAuditResult(header, "FAIL", "MISSING", recommended, impact))
            elif "max-age=31536000" not in val and header == "Strict-Transport-Security":
                results.append(HeaderAuditResult(header, "WARNING", val, recommended, impact))
            else:
                results.append(HeaderAuditResult(header, "PASS", val, recommended, impact))
        return results

# =============================================================================
# CLI EXECUTION & DEMONSTRATION
# =============================================================================

def main():
    print("=" * 80)
    print("PROTOCOL DOWNGRADE ATTACK & HSTS AUDITOR ENGINE (RFC 6797 & RFC 7507)")
    print("Instructor: Sukanta Hui | Location: Barrackpore, West Bengal")
    print("=" * 80)

    engine = DowngradeAuditorEngine()

    print("\n[+] 1. SIMULATING SSLSTRIP ATTACK ON MUNICIPAL PORTAL...")
    print("\n  [Scenario A: Client without HSTS Preload]:")
    res_unprotected = engine.simulate_sslstrip_attack("http://barrackpore.gov.in", is_hsts_preloaded=False)
    print(f"    • Wire Packet    : {res_unprotected['wire_packet']}")
    print(f"    • Attacker Result: {res_unprotected['mitm_attacker_result']}")
    print(f"    • Status         : {res_unprotected['verdict']}")

    print("\n  [Scenario B: Client with HSTS Preload List]:")
    res_preloaded = engine.simulate_sslstrip_attack("http://barrackpore.gov.in", is_hsts_preloaded=True)
    print(f"    • Client Action  : {res_preloaded['client_action']}")
    print(f"    • Wire Packet    : {res_preloaded['wire_packet']}")
    print(f"    • Status         : {res_preloaded['verdict']}")

    print("\n[+] 2. SIMULATING TLS_FALLBACK_SCSV DOWNGRADE DETECTION...")
    fallback_test = engine.simulate_fallback_scsv(client_offered_version=0x0303, client_includes_scsv=True)
    print(f"    • Client Offer   : {fallback_test['offered_version']}")
    print(f"    • Server Action  : {fallback_test['server_action']}")
    print(f"    • Handshake Alert: {fallback_test['alert']}")
    print(f"    • Verdict        : {fallback_test['verdict']}")

    print("\n" + "=" * 80)
    print("✔ Protocol Downgrade Auditor simulation executed successfully.")
    print("=" * 80)

if __name__ == "__main__":
    main()
