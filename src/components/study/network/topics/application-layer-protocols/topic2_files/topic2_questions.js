// topic2_files/topic2_questions.js
const questions = [
  {
    question: "What is the primary difference between Telnet and SSH?",
    shortAnswer: "Telnet transmits data in plaintext; SSH encrypts all traffic.",
    explanation: "Telnet is insecure and sends passwords and commands in clear, while SSH provides encryption, integrity, and authentication.",
    hint: "Which one would you use to log into a bank server?",
    level: "basic",
    codeExample: "ssh user@host"
  },
  {
    question: "What ports do Telnet and SSH use by default?",
    shortAnswer: "Telnet: TCP 23, SSH: TCP 22.",
    explanation: "Port 23 is assigned to Telnet, port 22 to SSH. Changing SSH port reduces automated attacks (security by obscurity).",
    hint: "Check /etc/services or IANA list.",
    level: "basic"
  },
  {
    question: "Explain the SSH host key verification process.",
    shortAnswer: "Client stores server's public key fingerprint after first connection; warns if changed later.",
    explanation: "When client first connects, server presents host key fingerprint. Client manually verifies (out-of-band). Client saves it in ~/.ssh/known_hosts. Future connections compare; mismatch could mean MITM attack.",
    hint: "Why does SSH ask 'Are you sure you want to continue connecting?'",
    level: "intermediate",
    codeExample: "ssh-keygen -H -F hostname"
  },
  {
    question: "How does public key authentication work in SSH?",
    shortAnswer: "Client signs a challenge with private key; server verifies with public key in authorized_keys.",
    explanation: "User generates key pair (ssh-keygen). Public key placed in ~/.ssh/authorized_keys on server. Client proves possession of private key by signing a session ID. No password transmitted.",
    hint: "What file on the server holds allowed public keys?",
    level: "intermediate",
    codeExample: "ssh-keygen -t ed25519\nssh-copy-id user@host"
  },
  {
    question: "What is the difference between SSHv1 and SSHv2?",
    shortAnswer: "SSHv2 fixes security flaws and adds stronger algorithms; SSHv1 is deprecated.",
    explanation: "SSHv1 had vulnerabilities (CRC32 integrity, man-in-the-middle). SSHv2 uses improved key exchange (DH), stronger encryption, and separate transport/auth/connection protocols.",
    hint: "Never enable Protocol 1 in sshd_config.",
    level: "advanced"
  },
  {
    question: "What is an SSH agent and when would you use it?",
    shortAnswer: "ssh-agent holds decrypted private keys in memory, allowing passwordless key use across multiple sessions.",
    explanation: "Instead of typing passphrase each time, you add keys to agent (ssh-add). Agent forwards keys to remote hosts (with agent forwarding), enabling single sign-on across jump hosts.",
    hint: "Why don't you have to enter passphrase for every git push over SSH?",
    level: "advanced",
    codeExample: "eval $(ssh-agent)\nssh-add ~/.ssh/id_rsa"
  },
  {
    question: "What is SSH port forwarding (tunneling)? Give an example.",
    shortAnswer: "Forwarding a local port to a remote server through SSH, encrypting the connection.",
    explanation: "Local forwarding (-L) forwards local port to remote destination through SSH server. Example: `ssh -L 8080:localhost:80 user@host` – local 8080 reaches host's web server securely.",
    hint: "How to access a remote database that only listens on localhost?",
    level: "intermediate",
    codeExample: "ssh -L 5432:localhost:5432 db-server"
  },
  {
    question: "What is the purpose of ~/.ssh/config file?",
    shortAnswer: "Configure per-host SSH options (user, port, key, compression).",
    explanation: "Avoid lengthy command-line options. Example: `Host myserver HostName 192.168.1.10 User admin Port 2222 IdentityFile ~/.ssh/myserver_key`. Then `ssh myserver`.",
    hint: "How to stop typing `-p 2222 -i key.pem` every time?",
    level: "intermediate"
  },
  {
    question: "What is the difference between SCP and SFTP?",
    shortAnswer: "SCP copies files (non-interactive). SFTP is a full interactive file transfer protocol over SSH.",
    explanation: "SCP is simple, fast for single files but limited. SFTP supports listing, resuming, deleting, and directory operations – like FTP over SSH. Both encrypt.",
    hint: "Which one would you use to rename a remote file?",
    level: "intermediate",
    codeExample: "scp file.txt user@host:/path/\nsftp user@host"
  },
  {
    question: "How can you run a remote command in one SSH line?",
    shortAnswer: "Append command after the host: `ssh user@host 'ls -la'`.",
    explanation: "Non-interactive execution. Useful in scripts. Combine with quoting for complex commands.",
    hint: "How to get disk usage of a remote server without logging in?",
    level: "basic",
    codeExample: "ssh server 'df -h'"
  },
  {
    question: "What is the `ssh-keyscan` command used for?",
    shortAnswer: "Collects public host keys from servers without connecting interactively.",
    explanation: "Pre-populate known_hosts for automation or scripts. Example: `ssh-keyscan -H github.com >> ~/.ssh/known_hosts`.",
    hint: "How to avoid the 'unknown host' prompt in CI/CD pipelines?",
    level: "advanced"
  },
  {
    question: "What is the difference between SSH and SSL/TLS?",
    shortAnswer: "SSH is for remote shell access; SSL/TLS secures web (HTTP) and other application protocols.",
    explanation: "SSH provides authenticated encrypted channels for terminal, file transfer, port forwarding. TLS is typically used in client-server applications to secure arbitrary data (HTTPS, SMTP). Both use similar crypto, but different protocol structures.",
    hint: "You use TLS when you see padlock in browser; SSH for terminal.",
    level: "intermediate"
  },
  {
    question: "Why is Telnet still used in some environments?",
    shortAnswer: "For debugging legacy hardware (routers, switches) on isolated management networks.",
    explanation: "Some embedded devices lack SSH due to limited resources. Also, internal lab networks with full physical security may use Telnet for simplicity – but never over the internet.",
    hint: "Would you use Telnet on a public cloud server? No.",
    level: "basic"
  },
  {
    question: "What is the SSH escape sequence and what can you do with it?",
    shortAnswer: "Default escape is `~.` to disconnect; `~^Z` to suspend; `~#` to list forwarded connections.",
    explanation: "Type `~?` in an SSH session to see options. Useful when stuck or to forward ports dynamically.",
    hint: "How to kill a frozen SSH session without closing terminal?",
    level: "advanced",
    codeExample: "~."
  },
  {
    question: "What is the difference between `sftp` and `sshfs`?",
    shortAnswer: "sftp – command-line client; sshfs – mounts remote directory as local filesystem.",
    explanation: "sshfs uses FUSE and SFTP protocol. You can `cd` and use normal file commands. Requires `sshfs` package.",
    hint: "How to edit remote files with your local IDE?",
    level: "advanced",
    codeExample: "sshfs user@host:/remote/folder /local/mount"
  },
  {
    question: "What is `~/.ssh/authorized_keys` and what are its correct permissions?",
    shortAnswer: "Lists public keys allowed for login. Must be 600 (user read/write only).",
    explanation: "Each line is a public key (type, key, comment). SSH daemon checks permissions – if group or world writable, it will ignore the file for security reasons.",
    hint: "Why does SSH still ask for password even after adding key?",
    level: "intermediate",
    codeExample: "chmod 600 ~/.ssh/authorized_keys"
  },
  {
    question: "What is a jump host (ProxyJump) in SSH?",
    shortAnswer: "Connect to a target server via an intermediate bastion host.",
    explanation: "`ssh -J jumpuser@jumphost targetuser@targethost`. SSH automatically tunnels through jump host. Useful for accessing private subnets.",
    hint: "How to reach a server behind a firewall without VPN?",
    level: "advanced",
    codeExample: "ProxyJump bastion.example.com"
  },
  {
    question: "What is SSH fingerprint and how to verify it?",
    shortAnswer: "Hash of server's public host key, used to detect MITM.",
    explanation: "On first connection, client shows fingerprint. Compare with out-of-band method (e.g., server admin gives it). `ssh-keygen -lf /etc/ssh/ssh_host_ecdsa_key.pub` shows fingerprint.",
    hint: "What would you do if fingerprint changed after server reinstall?",
    level: "intermediate"
  },
  {
    question: "How to disable password authentication in SSH?",
    shortAnswer: "Set `PasswordAuthentication no` in /etc/ssh/sshd_config, then restart sshd.",
    explanation: "Forces key-based authentication, reducing brute-force risk. Ensure you have at least one key before disabling.",
    hint: "Why would Amazon's EC2 default to key-only login?",
    level: "intermediate"
  },
  {
    question: "What is SSH multiplexing (ControlMaster)?",
    shortAnswer: "Reuse a single TCP connection for multiple SSH sessions, speeding up logins.",
    explanation: "Configure `ControlMaster auto` and `ControlPath ~/.ssh/controlmasters/%C`. Subsequent connections use existing socket, bypassing handshake. Great for frequent connections.",
    hint: "Why does `scp` after `ssh` feels faster with ControlMaster?",
    level: "expert"
  },
  {
    question: "What is the difference between SSH protocol 2 only vs supporting version 1?",
    shortAnswer: "SSHv2 only is secure; supporting v1 introduces vulnerabilities.",
    explanation: "Modern OpenSSH disables v1 by default. Never set `Protocol 2,1`. Always use `Protocol 2`.",
    hint: "Check your server's /etc/ssh/sshd_config.",
    level: "advanced"
  },
  {
    question: "What does `ssh -v` (verbose) show you?",
    shortAnswer: "Debugging information: handshake, authentication, encryption algorithms, and connection details.",
    explanation: "Use `-v` (or `-vvv` for more) to troubleshoot connection failures, see which key is offered, or verify cipher negotiation.",
    hint: "What to do when SSH connection hangs?",
    level: "basic",
    codeExample: "ssh -vvv user@host"
  },
  {
    question: "What are 'known_hosts' and 'host key aliases'?",
    shortAnswer: "known_hosts stores trusted host keys. Aliases allow different names for same server.",
    explanation: "When connecting via different hostnames (e.g., server and alias), you can set `HostKeyAlias` in ~/.ssh/config to avoid duplicate entries.",
    hint: "How to handle same server accessed via different IPs?",
    level: "intermediate"
  },
  {
    question: "What is the `~/.ssh/environment` file?",
    shortAnswer: "Allows setting environment variables for SSH sessions (disabled by default).",
    explanation: "Set `PermitUserEnvironment yes` in sshd_config, then add `LC_FOO=bar` lines. Rarely used due to security implications.",
    hint: "Why most sysadmins keep this disabled?",
    level: "expert"
  },
  {
    question: "What is the difference between SSH agent forwarding and SSH tunneling?",
    shortAnswer: "Agent forwarding forwards authentication requests; tunneling forwards arbitrary TCP ports.",
    explanation: "Agent forwarding (`-A`) allows remote servers to use your local keys. Tunneling (`-L/-R`) forwards network traffic. Both are powerful but agent forwarding has risks (root can use your keys).",
    hint: "Which one would you use to SSH from a jump host to a final host without copying keys?",
    level: "advanced"
  },
  {
    question: "How do you change the SSH port on a server and connect from client?",
    shortAnswer: "Edit Port in sshd_config, restart sshd. Connect with `ssh -p newport user@host`.",
    explanation: "Choose port >1024, avoid common ports. Also update firewall rules.",
    hint: "Why is changing port not a substitute for strong auth?",
    level: "intermediate"
  },
  {
    question: "What is the `StrictHostKeyChecking` option in SSH?",
    shortAnswer: "Controls whether SSH automatically adds unknown host keys.",
    explanation: "Set `StrictHostKeyChecking=accept-new` to add new keys without prompting (safe). `=no` is dangerous (accepts any key). Use for automation with care.",
    hint: "How to disable host key check in CI scripts? Not recommended for production.",
    level: "advanced"
  },
  {
    question: "What is a Telnet option (e.g., DO, DONT, WILL, WONT)?",
    shortAnswer: "Negotiation commands for terminal features (echo, linemode, window size).",
    explanation: "Telnet protocol includes option negotiation. DO/DONT refer to server offering; WILL/WONT refer to client offering. Used to enable binary mode, suppress go-ahead, etc.",
    hint: "Why does Telnet sometimes show garbled output? Missing option negotiation.",
    level: "expert"
  },
  {
    question: "What is the purpose of `~/.ssh/rc` file?",
    shortAnswer: "User-specific initialization script executed after login and before shell.",
    explanation: "Can set environment, display motd, or start programs. Overrides system-wide rc if exists. Rarely used.",
    hint: "How to run a command always upon SSH login?",
    level: "expert"
  },
  {
    question: "What is the difference between RSA, DSA, ECDSA, and Ed25519 keys for SSH?",
    shortAnswer: "Ed25519 is fastest and most secure; RSA 2048+ widely supported; DSA deprecated; ECDSA with NIST curves has some concerns.",
    explanation: "Ed25519 (elliptic curve) offers short keys and high security. RSA is universal but slower. DSA limited to 1024 bits (weak). ECDSA with P-256 is fine but some distrust NIST curves.",
    hint: "Which key type does `ssh-keygen -t ed25519` generate?",
    level: "advanced",
    codeExample: "ssh-keygen -t ed25519 -a 100"
  }
];

export default questions;