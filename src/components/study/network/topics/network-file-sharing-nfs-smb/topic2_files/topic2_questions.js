const questions = [
  {
    question: "What does SMB stand for and who originally developed it?",
    shortAnswer: "Server Message Block; originally developed by IBM, later extended by Microsoft.",
    explanation: "SMB was created in the 1980s for sharing files and printers on IBM LAN Manager. Microsoft adopted and extended it significantly, making it the primary Windows file-sharing protocol.",
    hint: "The name reflects that it's a protocol for 'messaging' between servers and clients.",
    level: "basic"
  },
  {
    question: "What is the difference between SMB and CIFS?",
    shortAnswer: "CIFS is an old dialect of SMB (SMB 1.0). Modern SMB (2.x, 3.x) is not CIFS.",
    explanation: "Microsoft rebranded SMB 1.0 as 'Common Internet File System' in the 1990s, but the term is deprecated. Today, SMB refers to versions 2.0, 2.1, 3.0, 3.1.1.",
    hint: "Never enable CIFS/SMB1 in production.",
    level: "basic"
  },
  {
    question: "What TCP port does SMB use in modern Windows networks?",
    shortAnswer: "TCP port 445.",
    explanation: "SMB 2.0 and above use only port 445, replacing the older NetBIOS ports 137-139. This simplifies firewall rules.",
    hint: "Older versions also used 137-139 over UDP/TCP.",
    level: "basic",
    codeExample: "firewall-cmd --add-port=445/tcp"
  },
  {
    question: "What is SMB signing and why is it important?",
    shortAnswer: "SMB signing cryptographically signs each packet to prevent tampering (man-in-the-middle).",
    explanation: "Without signing, an attacker can modify SMB packets in transit. Signing uses HMAC (SMB 1.0/2.0) or AES-GMAC (SMB 3.1.1). Default: signing required for domain controllers, optional for clients.",
    hint: "Does your office network require signing? It can impact performance slightly but adds security.",
    level: "intermediate"
  },
  {
    question: "What SMB version introduced mandatory encryption?",
    shortAnswer: "SMB 3.0 (2012) introduced encryption; SMB 3.1.1 made it more robust.",
    explanation: "Encryption uses AES-128-CCM or AES-128-GCM. Can be enabled per share or globally on Windows Server.",
    hint: "Check 'smb encrypt = mandatory' in smb.conf.",
    level: "intermediate"
  },
  {
    question: "What is the main security risk of SMB 1.0 / CIFS?",
    shortAnswer: "No encryption, weak authentication, and vulnerability to remote code execution (EternalBlue, WannaCry).",
    explanation: "SMB1 has design flaws: plaintext fallback, no signing required, and buffer overflow vulnerabilities. Microsoft recommends disabling SMB1 entirely.",
    hint: "EternalBlue exploit used SMB1 to spread ransomware.",
    level: "basic"
  },
  {
    question: "How does SMB multichannel improve performance?",
    shortAnswer: "Aggregates multiple network connections (NICs) to increase throughput and provide failover.",
    explanation: "SMB 3.0 can use multiple TCP connections, RDMA, or even Wi-Fi + Ethernet simultaneously. Data is striped across paths. If one path fails, traffic continues over others.",
    hint: "Ideal for Hyper-V and large file servers.",
    level: "advanced"
  },
  {
    question: "What is the difference between NTLM and Kerberos authentication in SMB?",
    shortAnswer: "NTLM is challenge-response; Kerberos uses tickets and mutual authentication (more secure).",
    explanation: "Kerberos is the default in Active Directory domains. NTLMv2 is still used for non-domain or legacy systems. Kerberos supports delegation and is less vulnerable to relay attacks.",
    hint: "Check 'klist' on Windows to see Kerberos tickets.",
    level: "intermediate"
  },
  {
    question: "What is an 'opportunistic lock' (oplock) in SMB?",
    shortAnswer: "Allows a client to cache file data locally, improving performance for single-user access.",
    explanation: "The server grants oplock, client reads/writes locally. If another client accesses the file, server breaks the lock, forcing client to flush changes. Reduces network round trips.",
    hint: "Similar to NFSv4 delegations.",
    level: "advanced"
  },
  {
    question: "What is Samba and why is it important?",
    shortAnswer: "Open-source implementation of SMB/CIFS for Linux/Unix, enabling interoperability with Windows.",
    explanation: "Samba allows Linux to act as file/print server for Windows clients, and even as an Active Directory domain controller. It implements SMB 3.1.1.",
    hint: "Without Samba, Linux could not serve SMB shares to Windows.",
    level: "basic",
    codeExample: "sudo systemctl status smbd"
  },
  {
    question: "How do you check active SMB connections on a Linux Samba server?",
    shortAnswer: "Use the 'smbstatus' command.",
    explanation: "smbstatus shows open files, connected users, and locked regions. Useful for troubleshooting.",
    level: "basic",
    codeExample: "sudo smbstatus -v"
  },
  {
    question: "What is the purpose of 'tree connect' in SMB?",
    shortAnswer: "Establishes access to a specific share after session setup.",
    explanation: "After authentication, the client sends Tree Connect request with the share name (e.g., \\server\share). Server returns a Tree ID (TID) used in subsequent operations.",
    hint: "Think 'mount' for SMB.",
    level: "intermediate",
    codeExample: "smbclient //server/share -c 'ls'"
  },
  {
    question: "What does 'durable handle' mean in SMB 2.0+?",
    shortAnswer: "A file handle that survives short network disconnections or server restarts.",
    explanation: "If a client disconnects and reconnects within a timeout, it can reattach to the same handle without reopening the file. Improves resiliency for applications like virtual desktop infrastructure (VDI).",
    hint: "User doesn't notice a brief network glitch.",
    level: "expert"
  },
  {
    question: "How can you force encryption on a Samba share?",
    shortAnswer: "Set 'smb encrypt = mandatory' in the share definition.",
    explanation: "Add to smb.conf under the share section, then restart smbd. Requires SMB 3.0+ on client.",
    hint: "Check with 'smbstatus' to see encryption status.",
    level: "intermediate",
    codeExample: "[secure]\n  path = /data\n  smb encrypt = mandatory"
  },
  {
    question: "What is the maximum SMB dialect version supported by Windows 11?",
    shortAnswer: "SMB 3.1.1.",
    explanation: "Windows 11 supports SMB 3.1.1 with pre-authentication integrity, AES-128-GMAC signing, and mandatory encryption for certain shares.",
    hint: "Check via PowerShell: Get-SmbConnection.",
    level: "basic"
  },
  {
    question: "What command is used to verify smb.conf syntax without starting the service?",
    shortAnswer: "testparm",
    explanation: "testparm checks for syntax errors, unknown parameters, and displays the effective configuration after including files.",
    level: "basic",
    codeExample: "testparm -v | grep encrypt"
  },
  {
    question: "How does SMB directory leasing work?",
    shortAnswer: "Client caches directory metadata; server notifies changes, reducing directory query traffic.",
    explanation: "SMB 2.1 introduced directory leases. A client holds a lease on a directory; if changes occur (file added/deleted), the server breaks the lease, forcing client to refresh.",
    hint: "Useful for file explorer folder views.",
    level: "advanced"
  },
  {
    question: "What is the role of 'cifs-utils' on Linux?",
    shortAnswer: "Provides mount.cifs tool to mount SMB shares from command line.",
    explanation: "Source: cifs-utils package includes mount.cifs, smbclient, and other utilities. Required to mount SMB shares on Linux.",
    level: "intermediate",
    codeExample: "sudo apt install cifs-utils\nsudo mount -t cifs //server/share /mnt -o username=user"
  },
  {
    question: "What is the difference between 'guest ok' and 'valid users' in smb.conf?",
    shortAnswer: "Guest ok allows anonymous access; valid users restricts to specific users/groups.",
    explanation: "Guest ok = yes means no authentication required. Valid users lists users/groups allowed. Both can be combined: valid users overrides guest.",
    hint: "Never use guest ok for sensitive data.",
    level: "basic"
  },
  {
    question: "How can you mount an SMB share in Linux with Kerberos authentication?",
    shortAnswer: "Use 'sec=krb5' mount option and ensure valid Kerberos ticket.",
    explanation: "Example: mount -t cifs //server/share /mnt -o sec=krb5,uid=1000. Requires kinit, and server in AD domain.",
    hint: "Check with 'klist' before mounting.",
    level: "advanced",
    codeExample: "kinit user@REALM\nmount -t cifs //server/share /mnt -o sec=krb5"
  },
  {
    question: "What is SMB Direct (RDMA) and what are its benefits?",
    shortAnswer: "SMB 3.0 feature using RDMA (RoCE, iWARP, InfiniBand) for high-throughput, low-CPU data transfer.",
    explanation: "Data is moved directly between network adapter and memory, bypassing CPU. Extremely low latency, useful for Storage Spaces Direct, SQL Server, and Hyper-V.",
    hint: "Requires compatible NICs and Ethernet fabric.",
    level: "expert"
  },
  {
    question: "Why does SMB have 'branch cache' feature?",
    shortAnswer: "Caches files locally at branch offices to reduce WAN traffic.",
    explanation: "SMB BranchCache (Windows 7/Server 2008 R2+) allows clients in a branch to retrieve files from a local cache instead of the main file server, after first download.",
    hint: "Ideal for distributed offices with limited bandwidth.",
    level: "expert"
  },
  {
    question: "How can you disable SMB1 in Windows 10/11 via PowerShell?",
    shortAnswer: "Set-SmbServerConfiguration -EnableSMB1Protocol $false",
    explanation: "Also must disable SMB1 client: Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol. Reboot required.",
    hint: "Check current status: Get-SmbServerConfiguration | Select EnableSMB1Protocol",
    level: "intermediate",
    codeExample: "Set-SmbServerConfiguration -EnableSMB1Protocol $false -Force"
  },
  {
    question: "What is the typical performance impact of enabling SMB encryption?",
    shortAnswer: "5-15% CPU overhead on both client and server; negligible on modern hardware.",
    explanation: "Encryption using AES-NI instructions is hardware-accelerated on modern CPUs. The security benefit outweighs the performance cost for most workloads.",
    hint: "Test with a large file copy on old hardware to see difference.",
    level: "intermediate"
  },
  {
    question: "What does the 'create mask' and 'directory mask' do in Samba?",
    shortAnswer: "Control the permissions (umask) for newly created files and directories on the share.",
    explanation: "create mask = 0664 means new files get rw-rw-r--; directory mask = 0775 gives rwxrwxr-x. These are ANDed with the client's requested mode.",
    hint: "Prevents users from creating world-writable files inadvertently.",
    level: "intermediate"
  },
  {
    question: "How can you debug 'NT_STATUS_BAD_NETWORK_NAME' error?",
    shortAnswer: "Indicates the share name does not exist or is misspelled.",
    explanation: "Check smb.conf for share name typo, case sensitivity, or missing path. Also ensure share is not 'browsable = no' unless accessed directly.",
    hint: "Verify with smbclient -L //server.",
    level: "intermediate"
  },
  {
    question: "What is the purpose of 'net use' command in Windows?",
    shortAnswer: "Used to map SMB shares to drive letters or connect to printers.",
    explanation: "Example: net use Z: \\server\share /persistent:yes. Also net use * /delete to remove all mapped drives.",
    hint: "Classic batch command for drive mapping.",
    level: "basic",
    codeExample: "net use X: \\\\samba-server\\finance"
  },
  {
    question: "What are 'named pipes' in SMB used for?",
    shortAnswer: "For inter-process communication (IPC) – e.g., remote procedure calls, print spooler, et cetera.",
    explanation: "Named pipes allow communication between processes on different machines, often used by services like WinRM, Event Log, and printer drivers.",
    hint: "Not for file storage; a special share IPC$.",
    level: "expert"
  },
  {
    question: "How can you restrict SMB access to a specific client IP in Samba?",
    shortAnswer: "Use 'hosts allow' and 'hosts deny' parameters in smb.conf.",
    explanation: "Example: hosts allow = 192.168.1. 10.0.0.0/8. Deny all others. Can be set globally or per share.",
    hint: "First match wins; order matters.",
    level: "advanced",
    codeExample: "[secure]\n  path = /secret\n  hosts allow = 192.168.1.100 192.168.1.101"
  },
  {
    question: "What is the difference between 'smbclient' and 'mount.cifs'?",
    shortAnswer: "smbclient is an interactive FTP-like client; mount.cifs mounts the share into local filesystem.",
    explanation: "smbclient is useful for testing and scripts. mount.cifs integrates the share into the Linux VFS, allowing use of standard file commands.",
    hint: "Use smbclient for quick file transfer; mount for persistent access.",
    level: "basic"
  }
];

export default questions;