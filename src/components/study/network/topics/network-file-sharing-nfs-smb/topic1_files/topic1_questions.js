const questions = [
  {
    question: "What does NFS stand for and who developed it?",
    shortAnswer: "Network File System, developed by Sun Microsystems.",
    explanation: "NFS was created in 1984 to allow Unix systems to share files over a network transparently. It has evolved through versions v2, v3, v4, and v4.2.",
    hint: "Think of it as the 'original' network file sharing for Unix.",
    level: "basic"
  },
  {
    question: "What is the default port for NFSv4?",
    shortAnswer: "TCP port 2049.",
    explanation: "NFSv4 consolidates all services on port 2049, eliminating the need for rpcbind and random ephemeral ports. This simplifies firewall configuration.",
    hint: "Unlike NFSv3, no need to open port 111 or other dynamic ports.",
    level: "basic",
    codeExample: "firewall-cmd --add-port=2049/tcp"
  },
  {
    question: "What is the difference between stateless (NFSv3) and stateful (NFSv4) protocols?",
    shortAnswer: "Stateless: each request independent; stateful: server remembers client state (locks, open files).",
    explanation: "Stateless simplifies crash recovery but requires external lock manager. Stateful enables better caching (delegations) and integrated locking, but adds complexity.",
    hint: "What happens if the server reboots while a file is open?",
    level: "intermediate"
  },
  {
    question: "What is the purpose of rpcbind in NFSv3?",
    shortAnswer: "Maps RPC program numbers to network ports (e.g., mountd, nlockmgr).",
    explanation: "NFSv3 services register with rpcbind. Clients query rpcbind to find which port each service uses. NFSv4 eliminates rpcbind.",
    hint: "Without rpcbind, NFSv3 cannot function.",
    level: "intermediate",
    codeExample: "rpcinfo -p localhost"
  },
  {
    question: "What does 'root squashing' do in NFS exports?",
    shortAnswer: "Maps the client's root user to an anonymous user (usually nfsnobody) on the server.",
    explanation: "Prevents a client root from having root privileges on the exported filesystem. Use 'no_root_squash' only for trusted clients (e.g., backup servers).",
    hint: "Security measure to avoid privilege escalation.",
    level: "basic"
  },
  {
    question: "How can you view active NFS exports on a server?",
    shortAnswer: "exportfs -v  or  showmount -e localhost",
    explanation: "exportfs -v shows detailed options; showmount queries the mount daemon. Both require appropriate permissions.",
    level: "basic",
    codeExample: "sudo exportfs -v"
  },
  {
    question: "What is the 'sync' export option and why use it?",
    shortAnswer: "Forces write operations to be committed to disk before replying to client.",
    explanation: "Ensures data integrity; if server crashes, data is not lost. The 'async' option acknowledges writes before disk flush, risking data loss but improving performance.",
    hint: "Trade-off between safety and speed.",
    level: "intermediate"
  },
  {
    question: "How do you mount an NFS share persistently across reboots?",
    shortAnswer: "Add an entry to /etc/fstab with the '_netdev' option.",
    explanation: "Example: 'server:/export /mnt/nfs nfs defaults,_netdev,noauto 0 0'. The _netdev option delays mount until network is ready.",
    hint: "Without '_netdev', boot may hang if server is unreachable.",
    level: "intermediate",
    codeExample: "192.168.1.10:/srv/share /mnt/nfs nfs defaults,_netdev 0 0"
  },
  {
    question: "What is the main difference between NFSv3 and NFSv4 security?",
    shortAnswer: "NFSv3 uses AUTH_SYS (weak, UID-based); NFSv4 adds Kerberos (krb5/krb5i/krb5p).",
    explanation: "NFSv4 also supports SPKM and LIPKEY. Kerberos provides authentication, integrity, and privacy (encryption). NFSv3 has no built-in encryption.",
    hint: "NFSv3 sends UIDs in plaintext.",
    level: "advanced"
  },
  {
    question: "What is the purpose of the 'no_subtree_check' export option?",
    shortAnswer: "Disables checking that requested files are within the exported subtree, improving performance.",
    explanation: "When exporting a subdirectory, subtree checking validates that accessed files are under that directory. Disabling it is safe when exporting whole filesystems and improves speed.",
    hint: "Performance gain but only for whole filesystem exports.",
    level: "expert"
  },
  {
    question: "How does NFSv4 delegation improve performance?",
    shortAnswer: "Server delegates caching authority to client, allowing it to cache aggressively without contacting server.",
    explanation: "For a file with a single client, the server grants a delegation (read or write). The client can then perform operations locally. If another client requests the file, the server recalls the delegation.",
    hint: "Like 'oplocks' in SMB, but for NFS.",
    level: "expert"
  },
  {
    question: "What does the error 'Stale NFS file handle' mean?",
    shortAnswer: "The file handle refers to a file or directory that no longer exists on the server.",
    explanation: "Occurs when a file is deleted or renamed on the server while a client still holds its handle. Remounting the share usually resolves it.",
    hint: "Server-side change after client opened the file.",
    level: "intermediate"
  },
  {
    question: "How can you force NFSv4 to use Kerberos authentication?",
    shortAnswer: "Set 'sec=krb5' in /etc/exports and mount with same option.",
    explanation: "Server: /export *(rw,sec=krb5). Client: mount -t nfs4 -o sec=krb5 server:/ /mnt. Requires Kerberos setup (kdc, keytabs).",
    hint: "krb5p adds encryption (privacy).",
    level: "advanced",
    codeExample: "mount -o sec=krb5p,vers=4.2 server:/export /mnt"
  },
  {
    question: "What is idmapd and when is it needed?",
    shortAnswer: "idmapd translates NFSv4 names (user@domain) to local UID/GIDs.",
    explanation: "NFSv4 uses string-based ownership (e.g., 'mamata@school.edu'). idmapd maps these to numeric UIDs. Required when UIDs differ across clients.",
    hint: "Without idmapd, all files may appear owned by 'nobody'.",
    level: "intermediate",
    codeExample: "systemctl status nfs-idmapd"
  },
  {
    question: "What is the maximum recommended rsize/wsize for NFS over TCP?",
    shortAnswer: "Usually 1,048,576 bytes (1MB) but depends on network MTU.",
    explanation: "Large values reduce overhead but may cause fragmentation. The kernel may cap based on available memory. Test with different values.",
    hint: "Set rsize=1048576,wsize=1048576 for high-speed LAN.",
    level: "advanced",
    codeExample: "mount -o rsize=1048576,wsize=1048576,vers=4.2 server:/export /mnt"
  },
  {
    question: "What is the purpose of the 'hard' vs 'soft' mount option?",
    shortAnswer: "Hard mount retries indefinitely; soft mount fails after timeout.",
    explanation: "Hard mounts can cause processes to hang if server is down. Soft mounts may return I/O errors, risking data corruption. Use 'hard,intr' for critical data.",
    hint: "Default is hard for reliability.",
    level: "intermediate"
  },
  {
    question: "How do you export a directory for NFSv4 only?",
    shortAnswer: "Use 'fsid=0' or 'fsid=root' in /etc/exports for the pseudo root.",
    explanation: "NFSv4 requires a pseudo filesystem root. Export '/' or a directory with fsid=0. All other exports appear as subdirectories under that root.",
    hint: "Mount as server:/ instead of server:/export/path.",
    level: "expert",
    codeExample: "/export *(rw,fsid=0,no_subtree_check)"
  },
  {
    question: "How can you check NFS client statistics?",
    shortAnswer: "nfsstat -c (client) or nfsstat -s (server).",
    explanation: "Shows RPC counts, retransmissions, and errors. Useful for performance debugging.",
    level: "basic",
    codeExample: "nfsstat -c -o all"
  },
  {
    question: "What is the default NFS version used by modern Linux kernels?",
    shortAnswer: "Kernel tries NFSv4.2 first, then falls back to NFSv4, then NFSv3.",
    explanation: "You can specify version with 'vers=4.2' or '-o nfsvers=3' to force a version.",
    hint: "Always specify version to avoid surprises.",
    level: "intermediate"
  },
  {
    question: "What are the main advantages of NFSv4.2 over NFSv4.1?",
    shortAnswer: "Server-side copy (COPY operation), sparse file support, space reservation (ALLOCATE/DEALLOCATE).",
    explanation: "COPY allows copying files without data moving between client and server. Sparse files improve storage efficiency. These features are useful for virtualization and backups.",
    hint: "Less network traffic for server-side operations.",
    level: "expert"
  },
  {
    question: "How does NFS handle file locking?",
    shortAnswer: "NFSv3 uses external NLM (Network Lock Manager); NFSv4 integrates locking into the protocol.",
    explanation: "NFSv3 locking is optional and can be disabled. NFSv4 locking is mandatory and stateful, providing better reliability.",
    hint: "NLM can be a single point of failure.",
    level: "intermediate"
  },
  {
    question: "What is the 'noac' mount option and when is it used?",
    shortAnswer: "Disables attribute caching entirely, forcing fresh attributes for each stat call.",
    explanation: "Used for debugging cache consistency issues. Drastically reduces performance, not for production.",
    hint: "Only for troubleshooting.",
    level: "expert",
    codeExample: "mount -o noac server:/export /mnt"
  },
  {
    question: "Can NFS export a subdirectory of another mounted filesystem?",
    shortAnswer: "Yes, but subtree checking can cause problems; better to export the mount point.",
    explanation: "If you export a subdirectory within a mounted filesystem, NFS may produce 'stale file handle' if the underlying mount changes.",
    hint: "Keep exports simple.",
    level: "advanced"
  },
  {
    question: "What is the role of 'mountd' in NFSv3?",
    shortAnswer: "Mount daemon handles initial MOUNT protocol requests from clients.",
    explanation: "When a client mounts an NFSv3 export, it contacts mountd (registered with rpcbind) to obtain the initial file handle. NFSv4 eliminates mountd.",
    hint: "Portmap needed for mountd.",
    level: "intermediate"
  },
  {
    question: "How do you restrict NFS export to a specific network?",
    shortAnswer: "In /etc/exports, use CIDR notation: /export 192.168.1.0/24(rw).",
    explanation: "You can also use hostnames or wildcards. Multiple client specifications can be separated by spaces.",
    hint: "Example: /srv/nfs 10.0.0.0/8(ro) 192.168.1.10(rw).",
    level: "basic",
    codeExample: "/export 192.168.0.0/16(rw,sync,no_root_squash)"
  },
  {
    question: "What is the 'intr' mount option and why was it deprecated?",
    shortAnswer: "Allowed NFS operations to be interrupted with signals; now default behavior in many kernels.",
    explanation: "Originally, hard mounts were uninterruptible. 'intr' allowed Ctrl+C to break hung NFS calls. Modern kernels allow interrupts by default, making 'intr' legacy.",
    hint: "No longer needed on recent kernels.",
    level: "advanced"
  },
  {
    question: "How can you debug 'permission denied' when accessing an NFS share?",
    shortAnswer: "Check /etc/exports (client IP/options), filesystem permissions, and root squashing.",
    explanation: "Use 'exportfs -v' to see applied rules, check server logs, and verify client UID matches expected values.",
    hint: "Try 'all_squash' mapping to a known user for testing.",
    level: "intermediate"
  },
  {
    question: "What is the maximum file size supported by NFSv4?",
    shortAnswer: "Up to 16 exabytes (theoretical) but limited by underlying filesystem.",
    explanation: "NFSv4 uses 64-bit file offsets, allowing extremely large files. Practical limits depend on the server's filesystem (e.g., ext4 max 16TB, XFS up to 8 exabytes).",
    hint: "Much larger than NFSv3's signed 32-bit limit (2GB).",
    level: "advanced"
  },
  {
    question: "What does 'all_squash' do in NFS exports?",
    shortAnswer: "Maps all client users (including root) to the anonymous user.",
    explanation: "Useful for public, read-only exports where you don't want any client identity preserved.",
    hint: "More restrictive than root_squash.",
    level: "intermediate",
    codeExample: "/export *(ro,all_squash,anonuid=65534,anongid=65534)"
  },
  {
    question: "Why might an NFS export show files as owned by 'nobody'?",
    shortAnswer: "Because the client's UID does not exist on the server, or idmapd is not configured correctly (for NFSv4).",
    explanation: "NFS passes numeric UIDs (NFSv3) or names (NFSv4). If the server cannot map the UID/name to a local user, it falls back to 'nobody'.",
    hint: "Check /etc/idmapd.conf for NFSv4 or UID consistency for NFSv3.",
    level: "intermediate"
  }
];

export default questions;