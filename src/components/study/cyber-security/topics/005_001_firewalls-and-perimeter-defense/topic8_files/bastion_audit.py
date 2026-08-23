"""
Bastion Host Security Auditor & DMZ Pinhole Validator
Author: Sukanta Hui | Institution: Coder & AccoTax Barrackpore
Course: Cyber Security - Module 005_001 (Topic 8)
"""

from dataclasses import dataclass
from typing import Dict, List, Tuple

@dataclass
class BastionConfig:
    host_ip: str
    hostname: str
    ssh_port: int
    permit_root_login: bool
    password_auth_enabled: bool
    installed_compilers: List[str]  # e.g., ["gcc", "make"]
    tmp_noexec_mounted: bool
    selinux_mode: str  # "Enforcing", "Permissive", "Disabled"
    remote_logging_enabled: bool
    running_services: List[str]  # e.g., ["sshd", "nginx", "cups", "rpcbind"]

class BastionHardeningAuditor:
    def __init__(self):
        self.forbidden_services = {"cups", "rpcbind", "avahi-daemon", "telnet", "vsftpd"}
        self.dangerous_compilers = {"gcc", "g++", "make", "clang", "gdb"}

    def audit_bastion_host(self, cfg: BastionConfig) -> Dict[str, any]:
        """Performs comprehensive security audit against CIS Linux Benchmark standards."""
        findings = []
        score = 100

        # Check 1: Root SSH Login
        if cfg.permit_root_login:
            findings.append("❌ CRITICAL: 'PermitRootLogin' is enabled in sshd_config. Must be set to 'no'.")
            score -= 25

        # Check 2: Password Authentication
        if cfg.password_auth_enabled:
            findings.append("❌ CRITICAL: SSH Password Authentication is enabled. Must mandate Ed25519/FIDO2 keys.")
            score -= 25

        # Check 3: Compilers on Bastion
        found_compilers = set(cfg.installed_compilers).intersection(self.dangerous_compilers)
        if found_compilers:
            findings.append(f"⚠️ WARNING: Build compilers present on bastion ({', '.join(found_compilers)}). Remove them!")
            score -= 15

        # Check 4: Non-executable /tmp partition
        if not cfg.tmp_noexec_mounted:
            findings.append("⚠️ WARNING: '/tmp' is NOT mounted with 'noexec'. Attackers can execute downloaded binaries.")
            score -= 15

        # Check 5: SELinux / AppArmor Enforcement
        if cfg.selinux_mode != "Enforcing":
            findings.append(f"⚠️ WARNING: SELinux is '{cfg.selinux_mode}'. Must be set to 'Enforcing'.")
            score -= 10

        # Check 6: Remote Immutable Logging
        if not cfg.remote_logging_enabled:
            findings.append("❌ CRITICAL: Remote immutable SIEM syslog streaming is disabled. Local logs can be erased!")
            score -= 10

        # Check 7: Unneeded background daemons
        active_bad_services = set(cfg.running_services).intersection(self.forbidden_services)
        if active_bad_services:
            findings.append(f"❌ CRITICAL: Unneeded network daemons active ({', '.join(active_bad_services)}). Disable them!")
            score -= 15

        score = max(0, score)
        verdict = "HARDENED_PASSED" if score >= 85 else "AUDIT_FAILED_VULNERABLE"

        return {
            "host": f"{cfg.hostname} ({cfg.host_ip})",
            "score": f"{score}/100",
            "verdict": verdict,
            "findings_count": len(findings),
            "findings": findings if findings else ["✔ Bastion host fully hardened according to CIS Benchmark standards!"]
        }

# Execution Test Harness
if __name__ == "__main__":
    auditor = BastionHardeningAuditor()
    print("=== Bastion Host Security Hardening Auditor ===")

    # Test Case 1: Unhardened Default Linux Host
    bad_bastion = BastionConfig(
        host_ip="172.16.1.99",
        hostname="dmz-jump-01",
        ssh_port=22,
        permit_root_login=True,
        password_auth_enabled=True,
        installed_compilers=["gcc", "make"],
        tmp_noexec_mounted=False,
        selinux_mode="Disabled",
        remote_logging_enabled=False,
        running_services=["sshd", "cups", "rpcbind"]
    )
    res1 = auditor.audit_bastion_host(bad_bastion)
    print(f"[{res1['verdict']}] Score: {res1['score']} for {res1['host']}")
    for f in res1['findings']:
        print(f"  -> {f}")

    print("\n------------------------------------------------------------\n")

    # Test Case 2: Fully Hardened Enterprise Bastion
    hardened_bastion = BastionConfig(
        host_ip="172.16.1.99",
        hostname="barrackpore-bastion-secure",
        ssh_port=22,
        permit_root_login=False,
        password_auth_enabled=False,
        installed_compilers=[],
        tmp_noexec_mounted=True,
        selinux_mode="Enforcing",
        remote_logging_enabled=True,
        running_services=["sshd"]
    )
    res2 = auditor.audit_bastion_host(hardened_bastion)
    print(f"[{res2['verdict']}] Score: {res2['score']} for {res2['host']}")
    for f in res2['findings']:
        print(f"  -> {f}")
