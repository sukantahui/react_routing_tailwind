const questions = [
  {
    question: "What is the first command you should run to check if an NFS server is reachable?",
    shortAnswer: "ping server_hostname or showmount -e server",
    explanation: "Basic connectivity first. Then showmount -e lists exports, confirming mountd is responding. If showmount hangs, firewall or rpcbind issue.",
    hint: "Layer 3 before Layer 7.",
    level: "basic",
    codeExample: "ping 192.168.1.10 && showmount -e 192.168.1.10"
  },
  {
    question: "What does 'nfsstat -c' show and when is it useful?",
    shortAnswer: "Client-side NFS statistics: RPC calls, retransmissions, timeouts.",
    explanation: "High retransmissions or timeouts indicate network issues or server overload. Zero retransmissions = healthy.",
    hint: "Compare with 'nfsstat -s' on server.",
    level: "intermediate"
  },
  {
    question: "How can you test SMB connectivity without mounting a share?",
    shortAnswer: "smbclient -L //server -U username",
    explanation: "Lists available shares. If this succeeds, protocol and authentication work; if fails, check service, firewall, or credentials.",
    hint: "Use -N for null session (if guest allowed).",
    level: "basic",
    codeExample: "smbclient -L //192.168.1.100 -U student"
  },
  {
    question: "What error does 'mount.nfs: access denied by server' indicate?",
    shortAnswer: "Client IP not allowed in /etc/exports or export options incorrect.",
    explanation: "Server's export access list or host name resolution failed. Check /etc/exports and run exportfs -v. Also verify no reverse DNS mismatch.",
    hint: "showmount -e server does not show client restrictions; only exportfs -v does.",
    level: "intermediate"
  },
  {
    question: "How do you check if rpcbind is running on an NFSv3 server?",
    shortAnswer: "rpcinfo -p localhost (on server) or rpcinfo -p server (from client).",
    explanation: "Shows registered RPC programs. If missing, start rpcbind. Without it, NFSv3 mount fails.",
    hint: "NFSv4 does not require rpcbind.",
    level: "basic",
    codeExample: "systemctl status rpcbind"
  },
  {
    question: "What does 'stale file handle' mean and how to fix?",
    shortAnswer: "File handle refers to a deleted/renamed file; remount the NFS share.",
    explanation: "Server file changed while client held handle. Use umount -f then mount again. For automounted homes, log out and in.",
    hint: "Prevent by not deleting open files.",
    level: "intermediate"
  },
  {
    question: "Client can mount NFS share but user gets 'Permission denied' when writing. What to check?",
    shortAnswer: "Export options (ro vs rw), filesystem permissions, and root squash.",
    explanation: "Check export with exportfs -v; ensure 'rw' not 'ro'. Check directory perms: chmod 0775. If root user, root_squash may map to nobody – use no_root_squash if trusted.",
    hint: "Try writing as non-root user first.",
    level: "intermediate"
  },
  {
    question: "How do you increase logging verbosity for Samba to troubleshoot?",
    shortAnswer: "Set 'log level = 3' in smb.conf [global] and restart smbd.",
    explanation: "Levels 1-10; level 2 is typical for debug, level 10 produces massive logs. Logs stored in /var/log/samba/.",
    hint: "Use 'log level = 3 passdb:5' for specific modules.",
    level: "advanced"
  },
  {
    question: "Why would an NFS mount work from one client but not another with same IP range?",
    shortAnswer: "Client-specific issues: kernel version, NFS version mismatch, or client firewall.",
    explanation: "Check client's nfs-common package, kernel, and local firewall. Also ensure NFS versions supported by server (e.g., server may enforce NFSv4 only).",
    hint: "Compare 'mount -v' output between clients.",
    level: "advanced"
  },
  {
    question: "What does 'NT_STATUS_OBJECT_NAME_NOT_FOUND' mean in smbclient?",
    shortAnswer: "The specified share name does not exist on the server.",
    explanation: "Check spelling, case sensitivity, and that share is defined in smb.conf and restarted. Also ensure browseable = yes for visibility.",
    hint: "Use smbclient -L to list available shares.",
    level: "intermediate"
  },
  {
    question: "How can you trace NFS RPC calls between client and server?",
    shortAnswer: "tcpdump -i eth0 port 2049 -s 1500 -w nfs.pcap, then analyze with Wireshark.",
    explanation: "Capture shows RPC program numbers, procedures (LOOKUP, READ, WRITE), and response times.",
    hint: "Use 'tshark -r nfs.pcap -Y nfs' for command-line.",
    level: "expert"
  },
  {
    question: "What is the most common cause of 'Too many open files' error on Samba?",
    shortAnswer: "Linux file descriptor limit for smbd process.",
    explanation: "Default ulimit -n may be low (1024). Increase in /etc/security/limits.conf or systemd service file: LimitNOFILE=16384.",
    hint: "Check with 'cat /proc/<smbd_pid>/limits'.",
    level: "expert"
  },
  {
    question: "NFS mount hangs indefinitely. How to recover without rebooting?",
    shortAnswer: "Use 'umount -f -l /mountpoint' (lazy unmount).",
    explanation: "-f forces unmount even if busy; -l detaches immediately, cleans up later. Then remount.",
    hint: "Use 'mount -o hard,intr' initially to allow Ctrl+C.",
    level: "intermediate",
    codeExample: "sudo umount -l /mnt/nfs"
  },
  {
    question: "How do you test if SMB signing is enabled on a share?",
    shortAnswer: "Use smbclient with --option='client signing=required', or check smb.conf 'server signing = mandatory'.",
    explanation: "If signing required, connection fails if not supported. Also check with Wireshark: signed packets have signature field.",
    hint: "smbstatus can show signing status for active sessions.",
    level: "advanced"
  },
  {
    question: "What logs would you check for NFS server startup failures?",
    shortAnswer: "journalctl -u nfs-server, also kernel ring buffer dmesg | grep nfs.",
    explanation: "Also check rpcbind status: systemctl status rpcbind. Exports syntax errors appear in syslog or journal.",
    hint: "Look for 'exportfs: /etc/exports: ...' errors.",
    level: "basic"
  },
  {
    question: "SMB performance is slow over VPN. What is a likely cause and solution?",
    shortAnswer: "High latency and small TCP window; enable SMB 3.0 with larger window, or use NFS.",
    explanation: "SMB is chatty; high latency increases delays. Also check MTU and enable 'socket options = TCP_NODELAY' in smb.conf. Consider switching to NFS with hard mounts.",
    hint: "Fast.com for internet speed; test with iperf.",
    level: "expert"
  },
  {
    question: "How can you verify that an NFS export has 'no_root_squash' applied?",
    shortAnswer: "Check exportfs -v; look for 'no_root_squash' in options.",
    explanation: "Example: /export 192.168.1.0/24(rw,no_root_squash) – dangerous. Also test by writing as root from client: touch /mnt/root-test.",
    hint: "Root_squash is default; no_root_squash is explicit.",
    level: "intermediate"
  },
  {
    question: "What does 'host is down' error during mount mean for NFS?",
    shortAnswer: "Server not reachable or rpcbind not responding.",
    explanation: "Check ping, server status, firewall. For NFSv3, also ensure rpcbind is running and not blocked.",
    hint: "telnet to port 2049, then to port 111.",
    level: "basic"
  },
  {
    question: "How do you troubleshoot 'This shared resource requires a password' but no password works?",
    shortAnswer: "Guest access disabled and user not in Samba password database.",
    explanation: "Ensure user exists with 'sudo pdbedit -a -u username'. Also check 'map to guest = Never' in smb.conf.",
    hint: "smbpasswd -a username then set password.",
    level: "intermediate"
  },
  {
    question: "What command shows current SMB connections and open files on a Linux Samba server?",
    shortAnswer: "smbstatus -v",
    explanation: "Shows connected users, their machines, open files, and lock information. Very useful for debugging.",
    level: "basic",
    codeExample: "sudo smbstatus -v | grep -i file"
  },
  {
    question: "Why would 'showmount -e server' work but actual mount fails with 'access denied'?",
    shortAnswer: "showmount queries mountd, but mount uses nfsd. Client IP may be allowed by mountd but not nfsd? Usually same. More likely: export options restrict subnets or hostnames.",
    explanation: "Check /etc/exports: if you used hostname, ensure reverse DNS matches. Use IP addresses for simplicity.",
    hint: "exportfs -v reveals exact client matching.",
    level: "advanced"
  },
  {
    question: "How can you reset a stuck NFS client without rebooting?",
    shortAnswer: "Use 'umount -f -l', then 'mount -a' or remount. If still stuck, 'service nfs-common restart' (on Debian) or 'systemctl restart rpc-statd'.",
    explanation: "Sometimes kernel NFS module gets confused. Soft reboot of NFS subsystem: 'modprobe -r nfs; modprobe nfs' (if not in use).",
    hint: "Last resort: reboot client.",
    level: "expert"
  },
  {
    question: "What does 'NT_STATUS_BAD_NETWORK_NAME' indicate in SMB?",
    shortAnswer: "Share name is invalid or does not exist.",
    explanation: "Double-check spelling (case-sensitive in some setups). Ensure share is defined in smb.conf and smbd restarted.",
    hint: "Try connecting to IPC$ to test authentication.",
    level: "basic"
  },
  {
    question: "How do you check if NFS clients are using NFSv3 or v4?",
    shortAnswer: "mount | grep nfs shows 'nfs' for v3, 'nfs4' for v4, or 'vers=4' in options.",
    explanation: "Also 'cat /proc/mounts' shows version. 'nfsstat -c' differentiates.",
    hint: "Many issues are version-specific.",
    level: "intermediate"
  },
  {
    question: "What is the first step if smbd fails to start?",
    shortAnswer: "Run 'testparm' to check smb.conf syntax.",
    explanation: "testparm will show line number of error. Also check if ports are already in use (netstat -tulpn).",
    hint: "systemctl status smbd gives hint.",
    level: "basic",
    codeExample: "testparm -v || systemctl start smbd"
  },
  {
    question: "Why might an NFS export show files with 'nobody' ownership even though correct UIDs exist?",
    shortAnswer: "ID mapping issue: NFSv4 without idmapd or cross-client UID mismatch.",
    explanation: "NFSv3 passes numeric UIDs; if UID 1000 is 'mamata' on server but 'debangshu' on client, ownership appears wrong. Fix with consistent UIDs or NFSv4 + idmapd.",
    hint: "Check /etc/idmapd.conf domain.",
    level: "intermediate"
  },
  {
    question: "How can you capture SMB traffic between client and server?",
    shortAnswer: "tcpdump -i eth0 port 445 -w smb.pcap",
    explanation: "Then open in Wireshark, filter by smb2. Decryption requires session keys (hard). But you can see protocol negotiation, commands, and errors.",
    hint: "For encrypted SMB3, you cannot see payload.",
    level: "advanced"
  },
  {
    question: "What does 'error: exportfs: /etc/exports: No such file or directory' mean?",
    shortAnswer: "The exports file is missing. Create it.",
    explanation: "Even empty, the file must exist. Create with 'sudo touch /etc/exports' and add entries.",
    hint: "Also check 'exportfs -a' harfs.",
    level: "basic"
  },
  {
    question: "Why would a Samba share break after adding 'force user = nobody'?",
    shortAnswer: "The 'nobody' user may lack permissions on the shared directory.",
    explanation: "Check ownership and permissions on the path. force user changes effective UID for all accesses. Ensure that user has read/write.",
    hint: "Use 'force user = a real user' for testing.",
    level: "advanced"
  },
  {
    question: "How to test if firewall is blocking NFS (excluding port 2049)?",
    shortAnswer: "For NFSv3, also need rpcbind (111) and mounted ports. Temporarily disable firewall and test.",
    explanation: "On Linux: 'systemctl stop firewalld' or 'ufw disable' for test. If works, add rules for required ports.",
    hint: "Use 'rpcinfo -p server' to see needed ports.",
    level: "intermediate"
  },
  {
    question: "What is the most useful command to debug Samba user authentication issues?",
    shortAnswer: "wbinfo -u  (for domain) or pdbedit -L (for local). Also 'ntlm_auth --username=user'.",
    explanation: "ntlm_auth tests authentication against Samba's backend. It can isolate whether issue is Samba or external auth.",
    hint: "Check with 'testparm -v | grep security'.",
    level: "expert"
  }
];

export default questions;