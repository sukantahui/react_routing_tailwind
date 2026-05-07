const questions = [
  {
    question: "In a school Linux lab with 200 thin clients, which protocol is typically chosen and why?",
    shortAnswer: "NFS – for simplicity, performance with many small files, and central home directories.",
    explanation: "NFS integrates seamlessly with Linux PAM automount, has low overhead, and works well with hundreds of concurrent clients. SMB would require Samba and more configuration.",
    hint: "Think about the OS: all Linux. No Windows clients.",
    level: "intermediate"
  },
  {
    question: "What is a common performance tuning for NFS in a school lab with many small files?",
    shortAnswer: "Increase rsize/wsize and use noatime mount option.",
    explanation: "rsize=32768 or 65536 reduces overhead. noatime prevents access time updates, reducing write operations. Also consider soft mounts for non-critical data.",
    hint: "Access time updates are wasteful for read-only resources.",
    level: "intermediate",
    codeExample: "mount -o noatime,rsize=65536,wsize=65536 server:/export /mnt"
  },
  {
    question: "Why might a government office choose SMB over NFS despite having Linux servers?",
    shortAnswer: "Windows client majority, need for encryption by default, and easier integration with Active Directory.",
    explanation: "SMB 3.0+ encryption is simple to enable. Windows clients natively support SMB. Audit logging via Samba VFS is more mature than NFS.",
    hint: "Check the client OS mix: secretaries use Windows.",
    level: "intermediate"
  },
  {
    question: "What is SMB multichannel and in which scenario is it most beneficial?",
    shortAnswer: "Aggregates multiple network links for higher throughput; ideal for video editing or large file transfers.",
    explanation: "Multichannel uses multiple NICs or paths. In media production, 4K video files require high bandwidth – 2x10GbE links give ~20 Gbps.",
    hint: "Think of a workstation with two network ports.",
    level: "advanced"
  },
  {
    question: "In a cloud storage backend, why would a company use NFS alongside object storage?",
    shortAnswer: "NFS provides low-latency POSIX access for hot data; object storage for durability and cold tier.",
    explanation: "User sync daemons need random I/O (NFS is good). Old file versions can be moved to S3. NFS acts as a cache tier.",
    hint: "NFS is fast but not infinite scale; object is slow but cheap.",
    level: "expert"
  },
  {
    question: "What is a major risk when deploying NFSv3 for backup storage without authentication?",
    shortAnswer: "Any client on the allowed network can spoof UID and read/write any backup file.",
    explanation: "AUTH_SYS trusts client UIDs. A malicious user can pretend to be root or another user, accessing or corrupting backups. Mitigation: restrict client IPs and use VLAN isolation.",
    hint: "Backup server should be on isolated management network.",
    level: "advanced"
  },
  {
    question: "How can you secure NFS in a school lab without setting up Kerberos?",
    shortAnswer: "Use all_squash to map all users to anonymous, and use IP-based restrictions.",
    explanation: "all_squash maps every client user to nfsnobody, preventing privilege escalation. IP restrictions (e.g., 192.168.1.0/24) limit network exposure. Not perfect but raises bar.",
    hint: "Least privilege: only trusted subnet can connect.",
    level: "intermediate",
    codeExample: "/export 192.168.0.0/16(rw,all_squash,anonuid=1000,anongid=1000)"
  },
  {
    question: "In a mixed OS environment with Windows, Linux, and macOS, which single protocol provides best cross-platform support?",
    shortAnswer: "SMB (via Samba on Linux, native on Windows and macOS).",
    explanation: "Windows and macOS support SMB natively. Linux has Samba client (mount.cifs). NFS on Windows requires additional features (Client for NFS) and is less common.",
    hint: "CIFS is old; SMB 2.0+ works everywhere.",
    level: "basic"
  },
  {
    question: "When would you deploy NFSv4 instead of SMB even though Windows clients exist?",
    shortAnswer: "When Windows clients are few and can use NFS client, or when heavy Linux workload dominates.",
    explanation: "Windows Services for NFS exists, but it's less integrated. If only 10% Windows, you might stick with NFS and install NFS client on those few machines.",
    hint: "Minority clients can adapt.",
    level: "intermediate"
  },
  {
    question: "What is a common mistake when using Samba for a large department share?",
    shortAnswer: "Not setting 'strict locking = yes' leading to file corruption under concurrent access.",
    explanation: "Default Samba locking is advisory; some applications require mandatory locking. 'strict locking = yes' enforces byte-range locks more aggressively, but may impact performance.",
    hint: "Databases over SMB need strict locking.",
    level: "advanced"
  },
  {
    question: "In a video editing scenario, what SMB feature reduces latency and CPU usage?",
    shortAnswer: "SMB Direct (RDMA) if NICs support it, otherwise Multichannel.",
    explanation: "RDMA bypasses CPU for data movement, reducing latency. Multichannel increases bandwidth but still uses CPU. Both help video editing.",
    hint: "Requires compatible NICs (RoCE, iWARP).",
    level: "expert"
  },
  {
    question: "Why is backup of NFS server critical compared to local storage?",
    shortAnswer: "Centralized NFS server is a single point of failure – all clients lose data if server fails.",
    explanation: "Unlike local files, users have no other copy. Regular backups (and possibly replication) are essential. Without them, a disk failure loses all users' home directories.",
    hint: "Sneakernet had many copies; NFS has one.",
    level: "basic"
  },
  {
    question: "What is a real-world issue with NFSv3 locking (NLM) in a virtualized environment?",
    shortAnswer: "NLM can become confused after VM migration or snapshot restore, leading to stale locks.",
    explanation: "NLM is stateful but separate from NFS; VM move changes network identity. NFSv4 integrated locking solves this. Many virtualized environments avoid NFSv3 for writable shares.",
    hint: "NFSv3 + VMware VMotion can cause lock issues.",
    level: "expert"
  },
  {
    question: "How can you provide high availability (HA) for NFS shares?",
    shortAnswer: "Use clustered NFS (e.g., NFS-Ganesha with Pacemaker) or a distributed filesystem (GlusterFS, Ceph).",
    explanation: "NFS itself doesn't have HA. Solutions include DRBD + Pacemaker for active-passive, or a scale-out filesystem that exports NFS from multiple nodes.",
    hint: "Red Hat's High Availability Add-On for NFS.",
    level: "expert"
  },
  {
    question: "What is 'Shadow Copy' in SMB and when is it useful?",
    shortAnswer: "Volume Shadow Copy Service (VSS) provides point-in-time snapshots accessible as 'Previous Versions' to Windows clients.",
    explanation: "Users can right-click a file → Previous Versions to restore older versions without IT intervention. Requires SMB 2.0+ and a Windows Server (or Samba with VFS modules).",
    hint: "Self-service file recovery reduces helpdesk tickets.",
    level: "intermediate"
  },
  {
    question: "In a school lab, which is better for student home directories: NFS with root_squash or without?",
    shortAnswer: "With root_squash (default) to prevent students from becoming root on server.",
    explanation: "Root_squash maps client root to nfsnobody. Without it, a malicious student with sudo on a lab machine could modify any file on the server, including other students' home directories.",
    hint: "Security over convenience.",
    level: "basic"
  },
  {
    question: "Why might a company choose SMB over NFS for storing Hyper-V virtual machines?",
    shortAnswer: "SMB 3.0+ offers transparent failover, multi-channel, and offloaded data transfer (ODX) for VHDX files.",
    explanation: "Hyper-V over SMB is a Microsoft best practice. It provides live migration, high performance, and simplified management compared to NFS.",
    hint: "Microsoft's own hypervisor favors SMB.",
    level: "advanced"
  },
  {
    question: "What is a real-world use case for pNFS (parallel NFS)?",
    shortAnswer: "High-performance computing (HPC) where many compute nodes read/write large datasets simultaneously.",
    explanation: "pNFS separates metadata and data, allowing clients to directly access storage devices. Used in weather simulation, genomics, and physics modeling.",
    hint: "Think of a supercomputer cluster.",
    level: "expert"
  },
  {
    question: "How can you troubleshoot 'permission denied' on a Samba share when valid user seems correct?",
    shortAnswer: "Check Linux filesystem permissions on the shared directory (chmod/chown) and Samba's 'force user' or 'force group' parameters.",
    explanation: "Samba first checks smb.conf, then maps to local user. The local user must have filesystem permission. Also check if 'guest ok' conflicts with 'valid users'.",
    hint: "ls -ld /srv/share – who owns it?",
    level: "intermediate"
  },
  {
    question: "What is the difference between 'map acl inherit' in Samba and native NFSv4 ACLs?",
    shortAnswer: "Samba can map Windows ACLs to POSIX ACLs or NFSv4 ACLs; NFSv4 ACLs are more expressive than POSIX but less common.",
    explanation: "NFSv4 ACLs support inheritance and fine-grained permissions similar to Windows. Samba can be configured to store Windows ACLs as NFSv4 ACLs on Linux.",
    hint: "For full Windows permission compatibility, use 'vfs objects = acl_xattr'.",
    level: "expert"
  },
  {
    question: "In a scenario with two heterogeneous data centers, which protocol is easier to stretch across WAN?",
    shortAnswer: "NFSv4 with delegations, but both require careful tuning. SMB contains more stateful chatter.",
    explanation: "NFSv3 is stateless, which can handle WAN disconnections better (hard mounts retry). SMB's stateful nature may time out. However, both can work with proper timeout tuning and TCP.",
    hint: "CIFS (SMB1) historically poor over WAN; modern SMB is better but still heavier than NFS.",
    level: "advanced"
  },
  {
    question: "What is a common real-world problem with automounting NFS home directories at login?",
    shortAnswer: "If the NFS server is slow to respond, login can hang for tens of seconds.",
    explanation: "PAM with automount uses 'soft' or 'hard' mounts. Hard mount may cause login to hang. Solution: use 'soft' with short timeout for home directories, or background automount.",
    hint: "Check /etc/nsswitch.conf and automount maps.",
    level: "intermediate"
  },
  {
    question: "Why might a company still use NFSv3 instead of NFSv4 despite v4's advantages?",
    shortAnswer: "Legacy clients, simplicity of stateless operation, and no need for Kerberos setup.",
    explanation: "NFSv3 is easier to configure for basic read-only shares. Some older operating systems lack NFSv4 support. If security not a concern, v3 still works.",
    hint: "Upgrading thousands of legacy clients may be impossible.",
    level: "intermediate"
  },
  {
    question: "In a media house, what is the impact of enabling SMB encryption on 4K video editing?",
    shortAnswer: "Increased CPU usage, possibly causing stuttering if CPU is weak. Use hardware AES-NI to mitigate.",
    explanation: "Encryption adds overhead. For high-bitrate video, the CPU might bottleneck. Test before enabling; consider VLAN isolation instead of encryption.",
    hint: "Sometimes physical security is sufficient.",
    level: "expert"
  },
  {
    question: "How can you limit network bandwidth used by NFS or SMB on a busy server?",
    shortAnswer: "Use Linux 'tc' (traffic control) or export/ share options like NFS 'rsize' limiting; SMB can tune via registry or set shares on different NICs.",
    explanation: "For NFS, limiting rsize/wsize indirectly caps throughput. For SMB, you can use 'global' options like 'max xmit' but better to use QoS at network level.",
    hint: "Linux 'tc' with class-based queuing.",
    level: "expert"
  },
  {
    question: "What is a 'stale NFS handle' in a cloud backup scenario and how to handle?",
    shortAnswer: "When a file was deleted or moved on server while client held handle. Backup scripts must handle retry or remount.",
    explanation: "In cloud backup, if a file is rotated (deleted), the client may still try to read it. Scripts should check error codes and re-open the file or skip.",
    hint: "Not an error in backup; just skip and log.",
    level: "advanced"
  },
  {
    question: "Which protocol is more suitable for a public library's public access computers?",
    shortAnswer: "NFS with all_squash and read-only exports, because no user accounts and many clients.",
    explanation: "Library users are ephemeral, no logins. NFS can export read-only system images and read/write user areas with all_squash. SMB would require guest shares, which are less secure.",
    hint: "Linux thin clients typically use NFS.",
    level: "intermediate"
  },
  {
    question: "What is a real-world challenge when using Samba as a domain member with Kerberos?",
    shortAnswer: "Time synchronization (NTP) is critical; clock skew >5 minutes causes authentication failures.",
    explanation: "Kerberos tickets have time stamps. If server and DC clocks drift, tickets are rejected. Also, SPNs must be properly registered.",
    hint: "Use 'net ads join' and check with 'klist'. Clock sync via chrony.",
    level: "expert"
  },
  {
    question: "In a small office with 5 employees, what is the simplest file sharing solution?",
    shortAnswer: "SMB on a Windows workgroup (no server) or Samba on a Raspberry Pi.",
    explanation: "For only 5 people, a full server may be overkill. Windows can share folders directly. Or use a low-cost Samba device. NFS would require all clients to be Linux.",
    hint: "KISS principle – Keep It Simple.",
    level: "basic"
  },
  {
    question: "What is a key difference in backup strategies between NFS and SMB?",
    shortAnswer: "NFS backup can use filesystem snapshots or simple rsync; SMB backup may require volume shadow copy for consistent point-in-time.",
    explanation: "NFS can be backed up like local files. SMB has VSS for consistent backups of open files (e.g., Outlook PST). Without VSS, you risk corrupt backups.",
    hint: "Backing up open databases needs consistency.",
    level: "advanced"
  },
  {
    question: "What lesson did the Barrackpore school learn after a power outage corrupted NFS exports?",
    shortAnswer: "They added a UPS and enabled 'sync' export option to prevent data loss on power failure.",
    explanation: "Before, they used 'async' for speed. After a crash, some writes were lost. Switching to 'sync' reduced risk, but they also deployed a UPS and proper shutdown scripts.",
    hint: "async trades safety for performance.",
    level: "intermediate"
  }
];

export default questions;