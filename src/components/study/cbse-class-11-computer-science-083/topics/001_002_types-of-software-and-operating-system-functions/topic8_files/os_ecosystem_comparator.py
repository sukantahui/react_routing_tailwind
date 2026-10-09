"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Types of Software, OS Architecture & Language Processors
File: os_ecosystem_comparator.py
Topic 8: Common Operating Systems - Windows, Linux (Ubuntu, Debian), macOS, Android, and iOS

Demonstrates:
1. Kernel architecture comparison (Monolithic, Hybrid, Microkernel)
2. Licensing and Open Source vs Proprietary software models (GPL vs EULA)
3. Package managers and default file system architectures
"""

class OperatingSystemEcosystem:
    """Provides detailed architectural telemetry across the top 5 global operating system platforms."""
    
    SYSTEMS = {
        "Linux (Ubuntu / Debian)": {
            "kernel": "Linux Monolithic Kernel",
            "license": "Open Source (GNU GPL v2)",
            "primary_domain": "Cloud Servers, Supercomputers, AI / Data Science Labs",
            "package_manager": "APT / DPKG (apt install), Snap",
            "file_system": "ext4, Btrfs, ZFS",
            "shell": "GNU Bash / Zsh"
        },
        "Microsoft Windows 11": {
            "kernel": "Windows NT Hybrid Kernel",
            "license": "Proprietary Commercial (Microsoft EULA)",
            "primary_domain": "Enterprise Desktop, PC Gaming, Office Workstations",
            "package_manager": "winget, MSI / EXE installers",
            "file_system": "NTFS, ReFS",
            "shell": "PowerShell, Command Prompt (cmd.exe)"
        },
        "Apple macOS": {
            "kernel": "XNU Hybrid Kernel (Mach + BSD Unix)",
            "license": "Proprietary Commercial (Apple APSL / Closed)",
            "primary_domain": "Creative Media, Software Development, Audio Engineering",
            "package_manager": "Homebrew (brew), Mac App Store (.dmg / .app)",
            "file_system": "APFS (Apple File System)",
            "shell": "Zsh (default since Catalina)"
        },
        "Google Android": {
            "kernel": "Modified Linux LTS Kernel with Android Runtime (ART)",
            "license": "Open Source Foundation (AOSP Apache 2.0 + GPL)",
            "primary_domain": "Smartphones, Tablets, Smart TVs, Wearables",
            "package_manager": "Google Play, APK package format",
            "file_system": "ext4, F2FS (Flash-Friendly File System)",
            "shell": "mksh / Toybox"
        },
        "Apple iOS": {
            "kernel": "Darwin / XNU Hybrid Kernel (Sandboxed)",
            "license": "Proprietary Closed Source (Apple EULA)",
            "primary_domain": "iPhones and Apple Mobile Ecosystem",
            "package_manager": "Apple App Store (IPA binary format)",
            "file_system": "APFS (Encrypted partitions)",
            "shell": "Sandboxed / Restricted"
        }
    }

    @classmethod
    def print_ecosystem_matrix(cls):
        print("\n=================================================================")
        print("  CBSE CLASS 11 CS (083) - COMMON OPERATING SYSTEMS MATRIX       ")
        print("=================================================================\n")
        for os_name, specs in cls.SYSTEMS.items():
            print(f"[*] {os_name.upper()}")
            print(f"    - Kernel Architecture: {specs['kernel']}")
            print(f"    - Licensing Model:     {specs['license']}")
            print(f"    - Primary Deployment:  {specs['primary_domain']}")
            print(f"    - Default File System: {specs['file_system']}")
            print(f"    - Default Shell:       {specs['shell']}\n")


def main():
    OperatingSystemEcosystem.print_ecosystem_matrix()

if __name__ == "__main__":
    main()
