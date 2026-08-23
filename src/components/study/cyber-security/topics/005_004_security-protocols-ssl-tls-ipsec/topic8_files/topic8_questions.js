const questions = [
  {
    id: 1,
    question: "What are the three core architectural layers of the Secure Shell (SSH-2) protocol as defined in RFC 4251?",
    shortAnswer: "1. SSH Transport Layer Protocol (RFC 4253 - Server authentication, DH key exchange, encryption, and integrity); 2. SSH User Authentication Protocol (RFC 4252 - Authenticates user to server via public key/password); 3. SSH Connection Protocol (RFC 4254 - Multiplexes multiple channels like interactive shell, SFTP, and port forwarding).",
    explanation: "This layered architecture cleanly separates the initial encrypted channel setup from user identity verification and logical channel multiplexing over a single underlying TCP connection.",
    hint: "Transport Layer ➔ User Authentication Layer ➔ Connection Protocol Layer.",
    level: "Basic",
    codeExample: `// SSH-2 Layered Architecture:
// [ Application / Connection Layer (RFC 4254) : Interactive Shell, SFTP, Port Forwarding (-L, -R, -D) ]
// [ User Authentication Layer     (RFC 4252) : Public Key (Ed25519), Password, Hostbased, GSSAPI      ]
// [ Transport Layer Protocol      (RFC 4253) : Server Host Key, Diffie-Hellman, ChaCha20 / AES-GCM    ]`
  },
  {
    id: 2,
    question: "How does Local Port Forwarding (`ssh -L`) work, and what is the syntax to securely tunnel a local port to a remote database?",
    shortAnswer: "Syntax: `ssh -L [local_ip:]local_port:remote_host:remote_port user@jump_server`. The local SSH client opens a listening TCP socket on `local_port`. Any connection established to this port is encrypted, tunneled over the SSH session to the SSH server, which opens a direct TCP connection to `remote_host:remote_port`.",
    explanation: "This allows developers and administrators in Barrackpore to connect local tools (e.g., pgAdmin, DBeaver) directly to internal databases isolated inside private cloud subnets without exposing those databases to the public Internet.",
    hint: "Local port on your machine forwards to a destination reachable from the remote SSH server.",
    level: "Basic",
    codeExample: `// Local Port Forwarding Example:
# ssh -L 5432:10.14.0.88:5432 susmita@bastion.barrackpore.gov.in
// Now connecting to 'localhost:5432' connects to PostgreSQL server '10.14.0.88:5432' securely!`
  },
  {
    id: 3,
    question: "How does Remote Port Forwarding (`ssh -R`) work, and what is its primary operational use case?",
    shortAnswer: "Syntax: `ssh -R [remote_ip:]remote_port:local_host:local_port user@jump_server`. The remote SSH server opens a listening TCP socket on `remote_port`. Inbound connections arriving at the remote server are tunneled back through the SSH connection to `local_host:local_port` on the client's machine.",
    explanation: "Remote port forwarding allows developers behind NAT or home firewalls to expose a locally running web application or API server to remote testers and clients on the public Internet without reconfiguring router NAT rules.",
    hint: "Opens a port on the remote server that forwards back into your local machine.",
    level: "Moderate",
    codeExample: `// Remote Port Forwarding Example:
# ssh -R 8080:localhost:3000 debangshu@public-relay.kolkata.gov.in
// External users browsing 'http://public-relay.kolkata.gov.in:8080' reach Debangshu's local dev app on port 3000!`
  },
  {
    id: 4,
    question: "What is Dynamic Port Forwarding (`ssh -D`), and how does it function as a SOCKS5 proxy?",
    shortAnswer: "Syntax: `ssh -D local_port user@remote_server`. The SSH client creates a local SOCKS5 proxy server on `local_port`. When a web browser or tool is configured to use this proxy, SSH dynamically negotiates and tunnels all outgoing TCP connections through the remote SSH server, routing traffic through the remote network.",
    explanation: "Unlike static `-L` port forwarding (which maps one specific port to one specific target), Dynamic SOCKS5 forwarding tunnels arbitrary web traffic to any internal intranet hostname or IP address transparently.",
    hint: "Creates a local SOCKS5 proxy that routes all browser traffic through the remote SSH server.",
    level: "Moderate",
    codeExample: `// Dynamic SOCKS5 Proxy Example:
# ssh -D 1080 mamata@bastion.kolkata.gov.in
// Configure Firefox Proxy: SOCKSv5 Host = 127.0.0.1, Port = 1080
// Firefox can now browse all internal intranet portals (http://internal-ledger.gov.in) securely!`
  },
  {
    id: 5,
    question: "Why is Ed25519 (RFC 8709) considered the gold standard for SSH public key authentication over legacy RSA and ECDSA keys?",
    shortAnswer: "Ed25519 uses the Twisted Edwards curve Curve25519, offering 128-bit cryptographic security with tiny 256-bit keys. It executes in constant time (immune to cache-timing and side-channel attacks), features deterministic signatures (immune to RNG failure vulnerabilities that compromise ECDSA), and verifies at extreme speed.",
    explanation: "Unlike ECDSA (which leaks private keys if the Random Number Generator produces biased nonces), Ed25519 derives its signature nonces deterministically from a hash of the private key and message.",
    hint: "Ed25519 is fast, compact, immune to timing attacks, and has deterministic signatures.",
    level: "Moderate",
    codeExample: `// Generating Modern Ed25519 Key Pair:
# ssh-keygen -t ed25519 -C "susmita@barrackpore-treasury.gov.in"
// Outputs: ~/.ssh/id_ed25519 (Private) and ~/.ssh/id_ed25519.pub (Public - 68 characters)`
  },
  {
    id: 6,
    question: "What is the 'ProxyJump' (`ssh -J`) mechanism, and why is it far more secure than legacy SSH Agent Forwarding (`ssh -A`)?",
    shortAnswer: "ProxyJump (`ssh -J bastion.gov.in target.internal`) establishes an end-to-end encrypted SSH connection from your local client directly to the target server through a transparent TCP proxy on the bastion; Agent Forwarding (`ssh -A`) exposes your local SSH authentication agent socket on the remote server, allowing a compromised bastion host administrator to hijack your keys and impersonate you across other servers.",
    explanation: "With ProxyJump, the intermediate bastion server acts purely as a dumb TCP pipe. The bastion never has access to the decrypted session, private keys, or agent sockets.",
    hint: "ProxyJump pipes encrypted TCP without exposing your authentication socket to intermediate jump servers.",
    level: "Expert",
    codeExample: `// ProxyJump Syntax:
# ssh -J susmita@bastion.barrackpore.gov.in debangshu@10.14.0.88
// Or in ~/.ssh/config:
// Host internal-db
//   HostName 10.14.0.88
//   User debangshu
//   ProxyJump susmita@bastion.barrackpore.gov.in`
  },
  {
    id: 7,
    question: "What are the five mandatory directives required in `/etc/ssh/sshd_config` to achieve enterprise-grade SSH server hardening?",
    shortAnswer: "1. `PermitRootLogin no`, 2. `PasswordAuthentication no` (Enforce public key only), 3. `PubkeyAuthentication yes`, 4. `MaxAuthTries 3`, 5. `KexAlgorithms curve25519-sha256,diffie-hellman-group16-sha512`.",
    explanation: "These settings eliminate root credential brute-force attacks, prohibit password cracking, enforce modern elliptic curve key exchange, and sever connections on repeated failures.",
    hint: "Disable root login, disable passwords, enforce public keys, reduce max auth tries, specify modern ciphers.",
    level: "Basic",
    codeExample: `// Hardened /etc/ssh/sshd_config:
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
X11Forwarding no
KexAlgorithms curve25519-sha256,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com`
  },
  {
    id: 8,
    question: "What is the 'Trust On First Use' (TOFU) model in SSH, and what is the function of the `~/.ssh/known_hosts` file?",
    shortAnswer: "TOFU prompts the user on the initial connection to verify and accept the server's public host key fingerprint. Once accepted, the fingerprint is permanently recorded in `~/.ssh/known_hosts`. On subsequent connections, SSH compares the server's presented key against this stored hash, alerting the user immediately if the key changes (Man-in-the-Middle warning).",
    explanation: "If an attacker on a local Wi-Fi intercepts your connection and presents a forged host key, the SSH client detects the mismatch and halts with `WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!`.",
    hint: "Stores server fingerprints on first connection to detect any future host key spoofing.",
    level: "Basic",
    codeExample: `// Known Hosts Verification Warning:
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
// Host key for bastion.barrackpore.gov.in has changed.`
  },
  {
    id: 9,
    question: "What is the difference between SFTP (SSH File Transfer Protocol) and legacy SCP (Secure Copy Protocol)?",
    shortAnswer: "SFTP operates as a standardized, stateful subsystem protocol (RFC draft) inside the SSH-2 Connection Protocol, supporting remote directory browsing, file resumption, permissions management, and chroot jails; SCP is an unstandardized, legacy wrapper that executes the remote shell's `rcp` binary, which is vulnerable to command injection and lacks interactive operations.",
    explanation: "Modern OpenSSH (version 9.0+) has deprecated the SCP wire protocol and aliases the `scp` command to use the secure SFTP protocol behind the scenes.",
    hint: "SFTP is a robust, stateful file transfer subsystem; legacy SCP is a deprecated shell wrapper.",
    level: "Moderate",
    codeExample: `// Restricting Users to SFTP in /etc/ssh/sshd_config:
Match Group sftpusers
    ChrootDirectory /var/sftp/%u
    ForceCommand internal-sftp
    AllowTcpForwarding no
    X11Forwarding no`
  },
  {
    id: 10,
    question: "What is an SSH Certificate Authority (SSH CA), and how does it eliminate the operational overhead of distributing `known_hosts` and `authorized_keys`?",
    shortAnswer: "An SSH CA signs server host keys and user public keys using an organizational CA private key. Servers and clients trust the single public CA key; any user or host presenting a valid CA-signed certificate is authenticated automatically without needing individual public keys copied to every server.",
    explanation: "In large deployments with thousands of servers in Kolkata and Barrackpore, SSH CAs enable centralized key issuance, embedded certificate expiration dates (e.g., valid for 8 hours), and automated role-based access control.",
    hint: "A central CA signs keys so individual authorized_keys files do not need manual updating.",
    level: "Expert",
    codeExample: `// Signing User Key with SSH CA:
# ssh-keygen -s /etc/ssh/ca_user_key -I susmita_treasury -n susmita -V +8h id_ed25519.pub
// Output: id_ed25519-cert.pub (Valid for 8 hours for user 'susmita')`
  },
  {
    id: 11,
    question: "How does the SSH Diffie-Hellman Key Exchange (KEX) establish a shared secret session key while authenticating the server's identity?",
    shortAnswer: "The client and server exchange ephemeral Diffie-Hellman public values (`e` and `f`) to compute shared secret `K`. The server computes a cryptographic hash `H` of the session parameters (`V_C, V_S, I_C, I_S, K_S, e, f, K`) and signs `H` using its private host key. The client verifies the signature using the server's public host key.",
    explanation: "This dual mechanism guarantees that an eavesdropper cannot compute the shared session key `K`, while simultaneously proving that the server possesses the legitimate private host key.",
    hint: "Ephemeral DH generates the secret; the server signs the exchange hash with its host key.",
    level: "Expert",
    codeExample: `// SSH KEX Exchange Hash Formula (RFC 4253):
// H = SHA256( V_C || V_S || I_C || I_S || K_S || e || f || K )
// Server Signature = Sign_HostKey(H)
// Client verifies Sign_HostKey(H) using K_S found in known_hosts`
  },
  {
    id: 12,
    question: "What is `ssh-agent` and what security risk is introduced if an unencrypted private key is kept loaded indefinitely?",
    shortAnswer: "`ssh-agent` is a background daemon that holds decrypted private keys in memory so users don't have to enter passphrases for every connection. If left loaded indefinitely, a local root attacker or malware running under the user's account can interact with the agent socket (`SSH_AUTH_SOCK`) to authenticate to remote servers without knowing the passphrase.",
    explanation: "Best practice is to configure key lifetimes (e.g., `ssh-add -t 3600` for 1-hour expiration) or enforce hardware confirmation prompts on every key use via FIDO2 security keys.",
    hint: "A memory-resident key cache; if left indefinitely, attackers can abuse the agent socket.",
    level: "Moderate",
    codeExample: `// Adding Key with 2-Hour Lifetime:
# ssh-add -t 7200 ~/.ssh/id_ed25519
// Automatically unloads key from memory after 2 hours!`
  },
  {
    id: 13,
    question: "What is the function of the `authorized_keys` file (`~/.ssh/authorized_keys`), and what critical file permissions must it have?",
    shortAnswer: "It stores the public keys authorized to log in as that user account. The `.ssh` directory must have permissions `700` (`drwx------`) and `authorized_keys` must have permissions `600` (`-rw-------`), owned by the user.",
    explanation: "If `authorized_keys` is writable by group or other users (`777` or `664`), the OpenSSH server (`StrictModes yes`) will refuse to authenticate public keys, because unauthorized users could modify the file to inject backdoor keys.",
    hint: "Holds public keys; must have 600 permissions (directory 700) or OpenSSH rejects it.",
    level: "Basic",
    codeExample: `// Correct SSH Permissions Setup:
# chmod 700 ~/.ssh
# chmod 600 ~/.ssh/authorized_keys
# chmod 600 ~/.ssh/id_ed25519
# chmod 644 ~/.ssh/id_ed25519.pub`
  },
  {
    id: 14,
    question: "What are SSH Escapes (Escape Characters) and how can an administrator gracefully terminate a frozen SSH session?",
    shortAnswer: "Typing `<Enter> ~ .` (Enter followed by tilde and period) sends the OpenSSH escape sequence to immediately terminate a hung or disconnected SSH session from the client side without waiting for TCP timeouts.",
    explanation: "Other useful escape sequences include `<Enter> ~ #` (lists active forwarded connections) and `<Enter> ~ C` (opens an interactive command line to add port forwardings on the fly).",
    hint: "Press Enter, then tilde (~), then period (.) to kill a hung session.",
    level: "Moderate",
    codeExample: `// Useful SSH Escape Sequences:
// [Enter] ~ .  ➔ Terminate connection immediately
// [Enter] ~ #  ➔ List forwarded channels
// [Enter] ~ C  ➔ Open command-line for port forwarding (e.g., -L 8080:localhost:80)`
  },
  {
    id: 15,
    question: "What is the difference between Encrypt-then-MAC (EtM) and legacy MAC-then-Encrypt in SSH data integrity?",
    shortAnswer: "Encrypt-then-MAC (EtM) computes the HMAC authentication tag over the ciphertext and packet length header; legacy MAC-then-Encrypt computes the MAC over plaintext before encryption. EtM eliminates padding oracle and plaintext-recovery attacks (such as the CPN-2008 attack).",
    explanation: "In modern OpenSSH, EtM MACs (e.g., `hmac-sha2-512-etm@openssh.com`) or combined AEAD ciphers (`chacha20-poly1305@openssh.com`) are enforced by default.",
    hint: "EtM authenticates the ciphertext, preventing attackers from tampering with encrypted blocks.",
    level: "Expert",
    codeExample: `// OpenSSH EtM MAC Algorithms:
// MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com`
  },
  {
    id: 16,
    question: "How can an engineer configure SSH multiplexing (`ControlMaster`) in `~/.ssh/config` to eliminate connection handshake latency across multiple terminal sessions?",
    shortAnswer: "By configuring `ControlMaster auto`, `ControlPath ~/.ssh/control-%r@%h:%p`, and `ControlPersist 10m`. The first SSH connection establishes the cryptographic handshake and socket; subsequent connections to the same host instantly reuse the established connection without re-authenticating.",
    explanation: "This reduces subsequent login times from 1.5 seconds to under 20 milliseconds, drastically accelerating automated Ansible playbooks and multi-terminal workflows.",
    hint: "Reuses an existing open SSH connection socket for instant new shell sessions.",
    level: "Expert",
    codeExample: `// ~/.ssh/config Multiplexing Configuration:
Host *
    ControlMaster auto
    ControlPath ~/.ssh/control-%r@%h:%p
    ControlPersist 10m`
  },
  {
    id: 17,
    question: "What is `GatewayPorts` in `/etc/ssh/sshd_config` and why is it disabled by default?",
    shortAnswer: "`GatewayPorts` controls whether remote port forwardings (`ssh -R`) are allowed to bind to public/all network interfaces (`0.0.0.0`) on the server. By default (`no`), remote forwardings bind exclusively to `127.0.0.1` to prevent unauthorized users from exposing internal services directly to the public Internet.",
    explanation: "If set to `yes` or `clientspecified`, external internet users can connect directly to the port opened by the remote forwarding on the server's public IP address.",
    hint: "Controls whether remote port forwardings bind to 127.0.0.1 or the public 0.0.0.0 interface.",
    level: "Moderate",
    codeExample: `// Enabling Public Remote Forwarding (/etc/ssh/sshd_config):
GatewayPorts clientspecified
// Client can now bind publicly: ssh -R 0.0.0.0:8080:localhost:3000 user@server`
  },
  {
    id: 18,
    question: "What security vulnerability occurs if an organization uses DSA (Digital Signature Algorithm) 1024-bit keys for SSH?",
    shortAnswer: "DSA is mathematically limited to a 1024-bit modulus and 160-bit SHA-1 subgroup. It is computationally vulnerable to discrete logarithm factoring, prone to catastrophic private key leakage under minute RNG bias, and permanently disabled in modern OpenSSH.",
    explanation: "OpenSSH 7.0 and later completely prohibit DSA keys. Organizations must migrate all legacy DSA keys to Ed25519 or RSA 4096.",
    hint: "DSA 1024 is mathematically weak, limited to SHA-1, and disabled by modern OpenSSH.",
    level: "Basic",
    codeExample: `// OpenSSH Error when attempting to use legacy DSA key:
// Unable to negotiate with 192.168.1.50: no matching host key type found.
// Their offer: ssh-dss (BROKEN & REJECTED!)`
  },
  {
    id: 19,
    question: "How does Hardware Security Key (FIDO2 / U2F) authentication work in modern OpenSSH (`ed25519-sk`)?",
    shortAnswer: "OpenSSH generates a hardware-backed key pair (`ssh-keygen -t ed25519-sk`). The private key material is stored inside a physical USB token (e.g., YubiKey). When authenticating, the server sends a cryptographic challenge, and the user must physically touch the token to sign the response.",
    explanation: "Even if an administrator's laptop in Barrackpore is infected with keylogger malware, the attacker cannot steal the private key or log into servers without physically pressing the hardware button.",
    hint: "Requires physical touch on a USB hardware token (YubiKey) to authenticate.",
    level: "Expert",
    codeExample: `// Generating FIDO2 Hardware Key:
# ssh-keygen -t ed25519-sk -O resident -C "susmita@yubikey-hardware"
// Requires physical touch on every SSH login!`
  },
  {
    id: 20,
    question: "What is the purpose of the `AllowUsers` and `AllowGroups` directives in `/etc/ssh/sshd_config`?",
    shortAnswer: "They implement strict whitelist-based access control, permitting SSH logins exclusively for specified usernames or group members while silently rejecting all other system accounts (even if valid passwords or keys exist).",
    explanation: "This prevents service accounts (like `www-data`, `nobody`, `postgres`) or unauthorized local users from ever establishing an interactive SSH shell.",
    hint: "Whitelists exactly which user accounts or security groups are allowed to log in via SSH.",
    level: "Basic",
    codeExample: `// Whitelisting Access in /etc/ssh/sshd_config:
AllowGroups sysadmin secops
AllowUsers susmita mamata debangshu`
  },
  {
    id: 21,
    question: "What is `Fail2ban` and how does it protect SSH servers from automated dictionary and brute-force attacks?",
    shortAnswer: "`Fail2ban` monitors `/var/log/auth.log` in real time for repeated SSH authentication failures. When an IP address exceeds a configured threshold (e.g., 3 failed attempts in 5 minutes), Fail2ban automatically injects an `iptables` / `nftables` firewall rule to drop all packets from that IP for a ban period (e.g., 24 hours).",
    explanation: "This automated IPS defense stops high-volume botnet password spraying campaigns before they can exhaust server CPU or succeed on weak accounts.",
    hint: "Monitors auth logs and automatically bans offending IP addresses in the firewall.",
    level: "Moderate",
    codeExample: `// Fail2ban SSH Jail Configuration (/etc/fail2ban/jail.local):
[sshd]
enabled = true
port = 22
maxretry = 3
findtime = 600
bantime = 86400 # 24-hour ban`
  },
  {
    id: 22,
    question: "Why should administrators change the default SSH listening port (Port 22) to a non-standard port (e.g., Port 2222 or 50222)?",
    shortAnswer: "While security through obscurity does not replace cryptographic hardening, changing the port eliminates over 99% of automated internet-wide port scans, botnet noise, and log bloat in `/var/log/auth.log`.",
    explanation: "It reduces system load from background brute-force bots, allowing security analysts in SOCs to focus on targeted, sophisticated attack vectors.",
    hint: "Reduces 99% of automated botnet log noise and opportunistic scans.",
    level: "Basic",
    codeExample: `// Changing Port in /etc/ssh/sshd_config:
Port 50222
// Connecting: ssh -p 50222 susmita@bastion.barrackpore.gov.in`
  },
  {
    id: 23,
    question: "What is `ssh-keyscan` and how is it used safely in automated DevOps deployment pipelines?",
    shortAnswer: "`ssh-keyscan` is a command-line tool that queries remote servers to retrieve their public host keys (e.g., `ssh-keyscan -t ed25519 10.14.0.88 >> ~/.ssh/known_hosts`), pre-populating the `known_hosts` file to avoid interactive TOFU prompts in automated CI/CD scripts.",
    explanation: "To ensure security against Man-in-the-Middle attacks, the retrieved keys must be verified against an out-of-band published fingerprint before being committed to production pipelines.",
    hint: "Retrieves remote server public host keys to automate known_hosts configuration in CI/CD.",
    level: "Moderate",
    codeExample: `// Automated Host Key Gathering:
# ssh-keyscan -t ed25519 -H bastion.barrackpore.gov.in >> ~/.ssh/known_hosts`
  },
  {
    id: 24,
    question: "What is `ClientAliveInterval` and `ClientAliveCountMax` in `/etc/ssh/sshd_config`?",
    shortAnswer: "`ClientAliveInterval` sets a timeout interval (in seconds) after which the server sends an encrypted keepalive check to the client; `ClientAliveCountMax` sets the number of unanswered keepalives before the server automatically terminates the idle or severed connection.",
    explanation: "Setting `ClientAliveInterval 300` and `ClientAliveCountMax 2` guarantees that stale, abandoned terminal sessions (or laptops closed without logging out) are disconnected within 10 minutes.",
    hint: "Sends periodic keepalives and terminates dead or idle sessions automatically.",
    level: "Moderate",
    codeExample: `// Automatic Disconnection of Dead/Idle Sessions:
ClientAliveInterval 300   # Check every 5 minutes
ClientAliveCountMax 2      # Sever after 2 missed replies (10 minutes total)`
  },
  {
    id: 25,
    question: "How does ChaCha20-Poly1305 (`chacha20-poly1305@openssh.com`) operate in OpenSSH and why is it preferred on general-purpose servers?",
    shortAnswer: "It uses one 256-bit ChaCha20 stream cipher key to encrypt the packet length header and another to encrypt the payload, verified by the Poly1305 MAC. It runs in constant time without hardware acceleration, making it immune to cache-timing attacks on all CPU architectures.",
    explanation: "Developed by Daniel J. Bernstein, ChaCha20-Poly1305 is the default cipher in OpenSSH, delivering high-speed security across both x86 servers and ARM edge gateways.",
    hint: "The default OpenSSH AEAD cipher; constant time and immune to cache-timing attacks.",
    level: "Expert",
    codeExample: `// Enforcing ChaCha20-Poly1305 in /etc/ssh/sshd_config:
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com`
  },
  {
    id: 26,
    question: "What is an SSH 'Jump Host' (Bastion Host) architecture and how does it implement Defense-in-Depth for internal subnets?",
    shortAnswer: "A Jump Host is a single, heavily hardened, isolated gateway exposed to the public Internet or WAN. All internal database, application, and storage servers are placed in private subnets with zero public IP addresses. Administrators must authenticate to the Jump Host via MFA before connecting to internal servers.",
    explanation: "This consolidates the external attack surface to a single point that can be monitored with strict logging, IDS/IPS, and hardware token authentication.",
    hint: "A single hardened gateway that controls and audits all administrative access to private servers.",
    level: "Basic",
    codeExample: `// Jump Host Topology:
// [ Admin Laptop (Barrackpore) ] ──(Internet)──> [ Hardened Bastion (MFA) ] ──(Private LAN)──> [ Internal SQL Server 10.14.0.88 ]`
  },
  {
    id: 27,
    question: "What is `StrictModes` in `/etc/ssh/sshd_config` and what vulnerability does it prevent?",
    shortAnswer: "`StrictModes yes` (the default) instructs the SSH daemon to check file ownership and permissions on user directories (`~/.ssh` and `authorized_keys`) before accepting public key logins. If permissions are too open (e.g., write access for group/others), SSH rejects the login.",
    explanation: "Without StrictModes, another unprivileged user on a shared server with group-write access could add their own public key to an administrator's `authorized_keys` and escalate privileges.",
    hint: "Ensures ~/.ssh and authorized_keys have restrictive permissions before allowing login.",
    level: "Moderate",
    codeExample: `// Enforcing Strict Modes:
StrictModes yes`
  },
  {
    id: 28,
    question: "How can an administrator restrict an SSH key in `authorized_keys` to execute only one specific backup script?",
    shortAnswer: "By prefixing the key entry in `authorized_keys` with options such as `command=\"/usr/local/bin/backup.sh\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty ssh-ed25519 AAAAC3...`.",
    explanation: "Even if an attacker compromises the private key on a backup server in Ichapur, they cannot open an interactive shell, forward ports, or run any command other than the pre-authorized `/usr/local/bin/backup.sh` script.",
    hint: "Prefix the public key line in authorized_keys with command=\"...\" and no-pty.",
    level: "Expert",
    codeExample: `// Locked-down authorized_keys Entry for Automated Backups:
command="/opt/scripts/db-backup.sh",no-port-forwarding,no-X11-forwarding,no-pty ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... backup-bot@ichapur`
  },
  {
    id: 29,
    question: "What is SSH Key Fingerprint verification using visual ASCII art (`VisualHostKey`)?",
    shortAnswer: "`VisualHostKey yes` (in `~/.ssh/config`) renders an ASCII art 'randomart' grid representing the server's public key fingerprint. Because humans recognize visual geometric patterns much faster than 43-character base64 hashes, administrators can easily spot forged host keys.",
    explanation: "The randomart image is generated via the 'Drunken Bishop' algorithm walking a discrete grid based on the key's hash bits.",
    hint: "Displays an ASCII art picture of the key fingerprint to make visual pattern verification easy.",
    level: "Moderate",
    codeExample: `// Enabling Visual Host Key (~/.ssh/config):
VisualHostKey yes
// Generates output like:
// +--[ED25519 256]--+
// |    ..o+..       |
// |   . .o=..       |
// |  . . o.o        |
// | . o . . o       |
// |  + S o + .      |
// |   = * + =       |
// |    E o * .      |
// +----[SHA256]-----+`
  },
  {
    id: 30,
    question: "What are the primary troubleshooting commands when diagnosing SSH connection refusal or public key rejection?",
    shortAnswer: "1. Client verbose debug: `ssh -vvv user@server` (traces algorithm negotiation and key offerings); 2. Server daemon live log: `sudo journalctl -u ssh -f` (reveals permission rejections and authentication failures); 3. Verify server listening state: `sudo ss -tulpn | grep sshd`; 4. Verify client key loading: `ssh-add -l`.",
    explanation: "Running `ssh -vvv` is the most powerful diagnostic tool, displaying the exact point of failure (e.g., algorithm mismatch, rejected key format, or timeout).",
    hint: "Use ssh -vvv for client debug and journalctl -u ssh -f for server logs.",
    level: "Expert",
    codeExample: `// Diagnostic Commands Suite:
# ssh -vvv -i ~/.ssh/id_ed25519 debangshu@bastion.barrackpore.gov.in
# sudo journalctl -u ssh -f
# sudo ss -tulpn | grep ':22\\b'
# sudo sshd -t # Tests /etc/ssh/sshd_config syntax for errors`
  }
];

export default questions;
