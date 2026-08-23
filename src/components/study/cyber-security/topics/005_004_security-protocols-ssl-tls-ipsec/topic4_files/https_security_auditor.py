#!/usr/bin/env python3
"""
===============================================================================
CYBERSECURITY LAB: HTTPS WEB ENCRYPTION & SECURITY HEADER AUDITOR
COURSE: BCA BCAC703 - Cyber Security | MODULE: 005_004 (SSL, TLS & IPsec)
INSTITUTION: Coder & AccoTax | INSTRUCTOR: Sukanta Hui | LOCATION: Barrackpore
===============================================================================
This script audits HTTPS web security configurations:
1. X.509 certificate chain and SAN hostname validation.
2. HTTP Strict Transport Security (HSTS) and SSL Stripping defense scoring.
3. DNS Certification Authority Authorization (CAA) and Certificate Transparency.
"""

import sys
import json
import datetime
from dataclasses import dataclass, field
from typing import List, Dict, Tuple

# Ensure UTF-8 stdout encoding for currency symbols and bullets
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# =============================================================================
# DATA STRUCTURES FOR HTTPS AUDITING
# =============================================================================

@dataclass
class X509CertSpec:
    common_name: str
    san_domains: List[str]
    issuer: str
    is_root_trusted: bool
    not_before: datetime.date
    not_after: datetime.date
    is_revoked_ocsp: bool = False

@dataclass
class SecurityHeaderProfile:
    hsts_enabled: bool
    hsts_max_age_seconds: int
    hsts_include_subdomains: bool
    hsts_preload: bool
    csp_enabled: bool
    nosniff_enabled: bool
    caa_records: List[str]

# =============================================================================
# HTTPS AUDIT & SCORING ENGINE
# =============================================================================

class HTTPSSecurityEngine:
    def __init__(self):
        pass

    def validate_certificate(self, cert: X509CertSpec, target_domain: str, check_date: datetime.date) -> Dict[str, any]:
        """
        Validates X.509 certificate validity period, SAN match, issuer trust, and revocation.
        """
        is_date_valid = cert.not_before <= check_date <= cert.not_after
        is_san_matched = target_domain in cert.san_domains or cert.common_name == target_domain
        is_trusted = cert.is_root_trusted and not cert.is_revoked_ocsp

        status_verdict = "VALID & TRUSTED"
        if not cert.is_root_trusted:
            status_verdict = "FAILED: Untrusted Root CA (Self-Signed)"
        elif cert.is_revoked_ocsp:
            status_verdict = "FAILED: Certificate Revoked via OCSP"
        elif not is_date_valid:
            status_verdict = "FAILED: Certificate Expired or Not Yet Valid"
        elif not is_san_matched:
            status_verdict = "FAILED: Hostname Mismatch (SAN)"

        return {
            "target_domain": target_domain,
            "common_name": cert.common_name,
            "issuer": cert.issuer,
            "is_date_valid": is_date_valid,
            "is_san_matched": is_san_matched,
            "is_trusted": is_trusted,
            "status_verdict": status_verdict,
            "is_passed": status_verdict == "VALID & TRUSTED"
        }

    def audit_security_headers(self, headers: SecurityHeaderProfile) -> Dict[str, any]:
        """
        Calculates SSL Labs security rating and SSL stripping resilience score (0 to 100).
        """
        score = 0
        grade = "F"
        vulnerabilities = []

        if headers.hsts_enabled:
            score += 40
            if headers.hsts_max_age_seconds >= 31536000:
                score += 15
            if headers.hsts_include_subdomains:
                score += 10
            if headers.hsts_preload:
                score += 15
        else:
            vulnerabilities.append("Vulnerable to SSL Stripping (sslstrip) on public Wi-Fi")

        if headers.csp_enabled:
            score += 10
        else:
            vulnerabilities.append("Missing Content-Security-Policy (XSS & Injection risk)")

        if headers.nosniff_enabled:
            score += 5

        if len(headers.caa_records) > 0:
            score += 5
        else:
            vulnerabilities.append("Missing DNS CAA Records (Any CA can issue certs)")

        if score >= 95:
            grade = "A+"
        elif score >= 80:
            grade = "A"
        elif score >= 65:
            grade = "B"
        elif score >= 50:
            grade = "C"
        else:
            grade = "F"

        return {
            "score": score,
            "grade": grade,
            "ssl_stripping_protected": headers.hsts_enabled and headers.hsts_preload,
            "vulnerabilities": vulnerabilities
        }

# =============================================================================
# SIMULATION WORKBENCH: BARRACKPORE MUNICIPAL HTTPS AUDIT
# =============================================================================

def run_https_security_audit():
    print("=" * 80)
    print("  HTTPS WEB ENCRYPTION & SECURITY HEADER AUDITOR")
    print("  Developer / Security Architect: Sukanta Hui | West Bengal SOC Hub")
    print("=" * 80)

    engine = HTTPSSecurityEngine()
    today = datetime.date(2026, 8, 23)

    # 1. Certificate Validation Test
    sample_cert = X509CertSpec(
        common_name="treasury.barrackpore.gov.in",
        san_domains=["treasury.barrackpore.gov.in", "bank.barrackpore.gov.in"],
        issuer="DigiCert Global Root CA (Trusted Intermediate G2)",
        is_root_trusted=True,
        not_before=datetime.date(2026, 1, 1),
        not_after=datetime.date(2027, 1, 1),
        is_revoked_ocsp=False
    )

    cert_audit = engine.validate_certificate(sample_cert, "treasury.barrackpore.gov.in", today)
    print("\n[+] SECTION 1: X.509 CERTIFICATE CHAIN AUDIT")
    print("-" * 75)
    print(f"  • Target Domain  : {cert_audit['target_domain']}")
    print(f"  • Issuer Chain   : {cert_audit['issuer']}")
    print(f"  • Date Validity  : {'✔ CURRENT' if cert_audit['is_date_valid'] else '❌ EXPIRED'}")
    print(f"  • SAN Match      : {'✔ MATCHED' if cert_audit['is_san_matched'] else '❌ MISMATCH'}")
    print(f"  • Final Verdict  : [{cert_audit['status_verdict']}]\n")

    # 2. Security Headers & HSTS Scoring
    profile = SecurityHeaderProfile(
        hsts_enabled=True,
        hsts_max_age_seconds=31536000, # 1 Year
        hsts_include_subdomains=True,
        hsts_preload=True,
        csp_enabled=True,
        nosniff_enabled=True,
        caa_records=["issue 'digicert.com'", "issuewild 'digicert.com'"]
    )

    header_audit = engine.audit_security_headers(profile)
    print("=" * 80)
    print("  SECTION 2: WEB SECURITY HEADERS & SSL LABS SCORECARD")
    print("=" * 80)
    print(f"  Security Score               : {header_audit['score']}/100")
    print(f"  SSL Labs Security Grade      : [{header_audit['grade']}]")
    print(f"  SSL Stripping Resilience     : {'✔ 100% PROTECTED (HSTS Preloaded)' if header_audit['ssl_stripping_protected'] else '❌ VULNERABLE'}")
    print(f"  Identified Vulnerabilities   : {', '.join(header_audit['vulnerabilities']) if header_audit['vulnerabilities'] else 'None (Fully Hardened)'}")
    print("=" * 80)

if __name__ == "__main__":
    run_https_security_audit()
