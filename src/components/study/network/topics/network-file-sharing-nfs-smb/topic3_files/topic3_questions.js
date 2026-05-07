const questions = [
  {
    question: "What is the primary operating system for NFS? For SMB?",
    shortAnswer: "NFS: Unix/Linux; SMB: Windows.",
    explanation: "NFS was developed for SunOS and is native to Linux/Unix. SMB was developed by Microsoft for Windows. Both can run on other OSes via implementations like Samba (SMB on Linux) or Windows Services for NFS.",
    hint: "Think about which OS uses drive letters (SMB) vs mount points (NFS).",
    level: "basic"
  },
  {
    question: "Which protocol is stateless in version 3 and stateful in version 4?",
    shortAnswer: "NFS.",
    explanation: "NFSv3 is stateless (each request independent). NFSv4 adds statefulness (e.g., locking, delegations). SMB has always been stateful (sessions, open files).",
    hint: "NFSv3 crash recovery is easy; SMB needs reconnection logic.",
    level: "intermediate"
  },
  {
    question: "What is the default port for modern SMB (2.x/3.x) and for NFSv4?",
    shortAnswer: "SMB: TCP 445; NFSv4: TCP 2049.",
    explanation: "SMB consolidated on port 445, eliminating NetBIOS. NFSv4 eliminated rpcbind, using only port 2049. This simplifies firewall rules.",
    hint: "Only one port each to open.",
    level: "basic"
  },
  {
    question: "Which protocol offers built-in encryption without requiring Kerberos setup?",
    shortAnswer: "SMB 3.0+ (AES-128 encryption).",
    explanation: "SMB encryption can be enabled per share with a simple configuration parameter. NFS requires Kerberos for encryption (krb5p), which needs a KDC and keytabs.",
    hint: "SMB encryption is easier for small environments.",
    level: "intermediate"
  },
  {
    question: "What is the main security weakness of NFSv3 by default?",
    shortAnswer: "AUTH_SYS sends UID/GID in plaintext and can be forged by any client root.",
    explanation: "NFSv3 trusts the client to report its UID correctly. A malicious client can spoof any UID, gaining unauthorized access. Mitigations: IP restrictions, Kerberos (v4).",
    hint: "No real authentication, just 'I say I'm UID 0'.",
    level: "intermediate"
  },
  {
    question: "Which protocol has native support for print server functionality?",
    shortAnswer: "SMB.",
    explanation: "SMB includes print sharing as a core feature (print$ share, spooler RPC). NFS does not have built-in print sharing; you'd need CUPS + NFS export, which is not standard.",
    hint: "Windows 'Add a network printer' uses SMB.",
    level: "basic"
  },
  {
    question: "What is Samba and how does it relate to this comparison?",
    shortAnswer: "Samba is an open-source implementation of SMB for Linux/Unix.",
    explanation: "Samba allows Linux to act as an SMB server, making the comparison not purely OS-bound. You can run SMB on Linux, and NFS on Windows (with limitations).",
    hint: "Samba is why mixed environments can use SMB everywhere.",
    level: "basic"
  },
  {
    question: "Which protocol is generally simpler to set up in a Linux-only environment?",
    shortAnswer: "NFS.",
    explanation: "NFS on Linux requires minimal configuration (/etc/exports and a mount command). Samba requires user account mapping (smbpasswd) and more parameters.",
    hint: "Try both on two Ubuntu VMs – NFS takes 5 minutes, Samba maybe 15.",
    level: "basic"
  },
  {
    question: "What is 'multichannel' and which protocol supports it?",
    shortAnswer: "SMB 3.0+ supports multichannel – aggregating multiple network connections for higher throughput.",
    explanation: "Multichannel uses multiple NICs or paths simultaneously. NFS does not have a native equivalent, though bonding/LACP can provide similar link aggregation.",
    hint: "SMB can stripe data across two 10GbE links.",
    level: "advanced"
  },
  {
    question: "Compare the file locking mechanisms of NFSv3 and SMB.",
    shortAnswer: "NFSv3 uses separate NLM (Network Lock Manager); SMB has integrated locking (oplocks, leases).",
    explanation: "NFSv3 locking is optional and can be brittle. SMB locking is mandatory and stateful, with opportunistic locks for client caching.",
    hint: "NLM can fail without client knowing; SMB handles break notifications.",
    level: "advanced"
  },
  {
    question: "When would you choose NFS over SMB despite SMB's encryption advantage?",
    shortAnswer: "Pure Linux environment, need high performance for many small files, or require pNFS for HPC.",
    explanation: "NFS is lighter weight and integrates seamlessly with Linux file permissions. For Linux-only, NFSv4 with Kerberos adds encryption if needed.",
    hint: "Jadavpur University's Linux lab uses NFS for student home directories.",
    level: "intermediate"
  },
  {
    question: "What is pNFS and which protocol offers it?",
    shortAnswer: "Parallel NFS – an extension of NFSv4.1 for high-performance parallel access.",
    explanation: "pNFS separates metadata and data paths, allowing clients to directly access storage devices (e.g., over iSCSI). SMB has multichannel but not exactly the same architecture.",
    hint: "Used in supercomputing clusters.",
    level: "expert"
  },
  {
    question: "Which protocol is easier to integrate with Active Directory for authentication?",
    shortAnswer: "SMB (Kerberos) integrates seamlessly with AD; NFS requires additional idmapd configuration.",
    explanation: "Windows clients automatically use Kerberos for SMB. NFSv4 can use AD Kerberos but needs proper domain join, keytabs, and idmapd setup.",
    hint: "AD domain controllers serve Kerberos tickets for SMB by default.",
    level: "advanced"
  },
  {
    question: "What is the firewall complexity difference between NFSv3 and SMB?",
    shortAnswer: "NFSv3 requires port 111 (rpcbind), 2049, and random ephemeral ports; SMB requires only port 445.",
    explanation: "NFSv3's random ports for mountd, nlockmgr, etc., make firewalling complex. NFSv4 solves this (only 2049), but legacy NFSv3 is still common.",
    hint: "Modern NFSv4 is firewall-friendly.",
    level: "intermediate"
  },
  {
    question: "Which protocol has better support for audit logging (who accessed which file)?",
    shortAnswer: "SMB via Windows Event Log or Samba's audit VFS module.",
    explanation: "Samba can log file access, and Windows Server has detailed object access auditing. NFS has minimal native auditing; you'd rely on filesystem audit (auditd) which is less granular.",
    hint: "Compliance (HIPAA, SOX) often requires file access logs.",
    level: "expert"
  },
  {
    question: "What is the difference in maximum file size between NFSv3 and SMB 3.0?",
    shortAnswer: "NFSv3 can handle 16TB+ with largefile support; SMB 3.0 up to 256TB (or more with large MTU). Both support 64-bit offsets now.",
    explanation: "Old NFSv3 had a 2GB limit with signed 32-bit, but modern implementations use 64-bit. SMB from the start used 64-bit offsets. Practically both handle very large files.",
    hint: "Not a limiting factor today.",
    level: "intermediate"
  },
  {
    question: "Which protocol is more 'chatty' (more packets per file operation) without compounding?",
    shortAnswer: "NFSv3 (separate LOOKUP, GETATTR, READ). SMB 2.0+ supports compounding (multiple ops per packet).",
    explanation: "Compounding reduces round trips. NFSv4.1 also adds compounds, but older NFSv3 is chattier, especially for metadata operations.",
    hint: "Use Wireshark to compare READ operations.",
    level: "advanced"
  },
  {
    question: "Can you mount an NFS share on Windows? And an SMB share on Linux?",
    shortAnswer: "Yes to both – NFS on Windows via 'Services for NFS' (Windows Pro/Enterprise), SMB on Linux via mount.cifs.",
    explanation: "Cross-platform mounting is possible, but may have limitations (e.g., Windows NFS client lacks NFSv4 features; Linux SMB client may lack some Windows ACLs).",
    hint: "Not always perfect, but works for basic file access.",
    level: "intermediate"
  },
  {
    question: "What is the role of 'idmapd' in NFSv4 and why is it not needed for SMB?",
    shortAnswer: "idmapd maps NFSv4 names (user@domain) to local UIDs; SMB uses SIDs natively.",
    explanation: "NFSv4 uses string-based ownership; idmapd translates. SMB's security model uses security identifiers (SIDs) that don't depend on local Unix UIDs.",
    hint: "SMB integration with AD is more direct.",
    level: "advanced"
  },
  {
    question: "Which protocol is more vulnerable to 'man-in-the-middle' attacks by default?",
    shortAnswer: "NFSv3 (no signing/encryption by default).",
    explanation: "SMB 3.0+ requires signing and can enforce encryption. NFSv3 AUTH_SYS is completely unauthenticated and easily spoofed. NFSv4 with Kerberos solves this.",
    hint: "Default configuration matters.",
    level: "intermediate"
  },
  {
    question: "Compare performance for many small files (e.g., source code repositories) on LAN.",
    shortAnswer: "NFSv3 often performs better due to lower overhead and statelessness.",
    explanation: "SMB's stateful overhead and oplock management can slow down many small file operations. However, both can be tuned; modern SMB 3.x has improved.",
    hint: "Test with 'git clone' over NFS vs SMB.",
    level: "advanced"
  },
  {
    question: "Which protocol supports 'directory leases' to reduce metadata fetches?",
    shortAnswer: "SMB 2.1+ supports directory leases; NFS has no direct equivalent (though NFSv4 delegations are for files only).",
    explanation: "Directory leases allow a client to cache directory contents; server notifies changes. NFSv4 lacks this, though attribute caching helps.",
    hint: "Speeds up folder browsing in file explorer.",
    level: "expert"
  },
  {
    question: "Can NFS export a directory to multiple subnets? How about SMB?",
    shortAnswer: "Both can. NFS via /etc/exports with netmask; SMB via 'hosts allow' in smb.conf or Windows share permissions.",
    explanation: "NFS example: /export 192.168.1.0/24(rw) 10.0.0.0/8(ro). Samba: hosts allow = 192.168.1. 10.0.0.",
    hint: "Always restrict to trusted networks.",
    level: "basic"
  },
  {
    question: "What is the main advantage of NFSv4's pseudo filesystem?",
    shortAnswer: "Allows clients to mount the root and see all exports as subdirectories.",
    explanation: "Instead of mounting each export separately, you mount server:/ and navigate to shares. This simplifies management for large numbers of exports.",
    hint: "No need for multiple mount points.",
    level: "advanced"
  },
  {
    question: "Which protocol has native support for 'Previous Versions' (shadow copies)?",
    shortAnswer: "SMB (via Volume Shadow Copy Service on Windows).",
    explanation: "Windows clients can right-click a file and restore previous versions if the server supports VSS. NFS requires separate backup integration.",
    hint: "Useful for user self-service recovery.",
    level: "intermediate"
  },
  {
    question: "Which protocol incurs higher CPU overhead for encryption?",
    shortAnswer: "Both similar when using AES-NI hardware acceleration. Without acceleration, SMB encryption adds ~15% overhead; NFSv4+krb5p adds Kerberos overhead.",
    explanation: "Modern CPUs have AES instructions, making encryption cheap. Kerberos adds extra round trips and ticket management overhead.",
    hint: "Test on old hardware to see difference.",
    level: "expert"
  },
  {
    question: "How do you choose between NFS and SMB for a new project?",
    shortAnswer: "Assess client OS mix, security requirements, performance needs, and admin expertise.",
    explanation: "Linux-only, high performance for small files → NFSv4 with Kerberos. Mixed OS, need encryption by default → SMB 3.0+ via Samba. Need AD integration → SMB.",
    hint: "No single answer; trade-offs.",
    level: "expert"
  },
  {
    question: "What is 'root squashing' in NFS and is there an SMB equivalent?",
    shortAnswer: "Root squashing maps client root to anonymous. SMB has no direct equivalent; Administrator still needs credentials.",
    explanation: "In NFS, root_squash prevents client root from having server root privilege. In SMB, even local admin on client must authenticate with a valid domain/username.",
    hint: "Different security models.",
    level: "intermediate"
  },
  {
    question: "Which protocol is better for WAN (high latency, occasional packet loss) and why?",
    shortAnswer: "Both can work; NFS hard mounts with TCP and timeo can survive better; SMB stateful sessions may time out.",
    explanation: "NFS hard mounts retry indefinitely, which can be good for unreliable links (but may block). SMB's stateful nature may break the session if timeout is low. Tuning required for both.",
    hint: "Use soft NFS mounts for WAN? Risk of corruption.",
    level: "expert"
  },
  {
    question: "What is the default authentication for NFSv4 and SMB in a workgroup (no domain)?",
    shortAnswer: "NFSv4: AUTH_SYS (unless Kerberos configured); SMB: NTLMv2.",
    explanation: "In a workgroup, SMB uses NTLMv2 challenge-response, which is much stronger than NFSv3/v4's AUTH_SYS. Kerberos requires a domain.",
    hint: "SMB is more secure out-of-the-box.",
    level: "intermediate"
  }
];

export default questions;