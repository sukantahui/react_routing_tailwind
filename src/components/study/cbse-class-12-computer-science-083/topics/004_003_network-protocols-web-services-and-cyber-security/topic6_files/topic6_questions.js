export default [
  {
    "id": 1,
    "question": "What is the primary function of Remote Access Protocols like Telnet and SSH?",
    "options": [
      "To enable a user on a local computer to log in and execute commands on a remote computer or server across a network as if physically sitting in front of it.",
      "To print documents on a nearby Bluetooth printer.",
      "To increase the download speed of video files.",
      "To connect audio speakers to a television."
    ],
    "correctAnswer": 0,
    "explanation": "Remote access protocols provide terminal emulation and command-line execution capabilities on remote host computers over TCP/IP networks.",
    "hint": "Remote command-line terminal access."
  },
  {
    "id": 2,
    "question": "On which default TCP port number does legacy Telnet listen for connections?",
    "options": [
      "Port 21",
      "Port 22",
      "Port 23",
      "Port 25"
    ],
    "correctAnswer": 2,
    "explanation": "Telnet operates over TCP port 23; SSH operates over TCP port 22.",
    "hint": "Port 23."
  },
  {
    "id": 3,
    "question": "What is the critical, fatal security vulnerability of Telnet that led to its complete deprecation across modern networks?",
    "options": [
      "Telnet transmits all user keystrokes, including administrative usernames and root passwords, in unencrypted cleartext across the network.",
      "Telnet cannot display lowercase letters.",
      "Telnet only works on monochrome green-screen monitors.",
      "Telnet crashes if more than 5 users connect."
    ],
    "correctAnswer": 0,
    "explanation": "Telnet has zero encryption; any packet sniffer (like Wireshark) on the path can capture passwords and commands in plain ASCII text.",
    "hint": "Transmits passwords in cleartext."
  },
  {
    "id": 4,
    "question": "What does the acronym SSH stand for in computer networking?",
    "options": [
      "Secure Shell",
      "Simple System Host",
      "Standard Super Handler",
      "Synchronous Software Header"
    ],
    "correctAnswer": 0,
    "explanation": "SSH stands for Secure Shell, the cryptographic network protocol designed to replace Telnet and insecure r-commands.",
    "hint": "Secure Shell."
  },
  {
    "id": 5,
    "question": "On which default TCP port does Secure Shell (SSH) listen for incoming client sessions?",
    "options": [
      "Port 20",
      "Port 22",
      "Port 23",
      "Port 80"
    ],
    "correctAnswer": 1,
    "explanation": "SSH uses TCP port 22.",
    "hint": "Port 22."
  },
  {
    "id": 6,
    "question": "What cryptographic guarantees does SSH provide that Telnet lacks?",
    "options": [
      "Strong symmetric encryption, public-key host authentication, and cryptographic data integrity checks (HMAC).",
      "Free internet connection without an ISP.",
      "Unlimited file storage on the server.",
      "Automatic software translation to Russian."
    ],
    "correctAnswer": 0,
    "explanation": "SSH provides confidentiality (encryption), authentication (server host keys and public/private key pairs), and integrity (tamper-proofing).",
    "hint": "Encryption, authentication, and integrity."
  },
  {
    "id": 7,
    "question": "Which of the following authentication methods is widely regarded as the most secure method for logging into a remote Linux server via SSH?",
    "options": [
      "Public-Key Cryptography (SSH Key Pairs: private key on client, public key in authorized_keys on server)",
      "Simple 4-digit numeric PIN",
      "Writing the password in an unencrypted text file",
      "Anonymous login without credentials"
    ],
    "correctAnswer": 0,
    "explanation": "Asymmetric public-key authentication uses cryptographic key pairs (e.g., Ed25519 or RSA-4096), completely eliminating brute-force password guessing attacks.",
    "hint": "Public-key / Private-key pair authentication."
  },
  {
    "id": 8,
    "question": "What is an 'SSH Tunnel' (or Port Forwarding)?",
    "options": [
      "A mechanism that routes unencrypted application traffic (e.g., database queries or web traffic) securely inside an encrypted SSH connection.",
      "A physical plastic pipe surrounding the Ethernet cable.",
      "A high-speed optical laser beam.",
      "A password cracking algorithm."
    ],
    "correctAnswer": 0,
    "explanation": "SSH port forwarding encapsulates arbitrary TCP connections inside the encrypted SSH channel, protecting otherwise insecure legacy protocols.",
    "hint": "Encapsulates arbitrary TCP traffic inside an encrypted SSH tunnel."
  },
  {
    "id": 9,
    "question": "Which popular open-source graphical terminal emulator is widely used on Windows to initiate SSH and Telnet connections to remote servers?",
    "options": [
      "PuTTY",
      "MS Paint",
      "Adobe Acrobat",
      "VLC Media Player"
    ],
    "correctAnswer": 0,
    "explanation": "PuTTY is the classic and widely used free SSH and Telnet client for Microsoft Windows.",
    "hint": "PuTTY."
  },
  {
    "id": 10,
    "question": "What is the purpose of the `~/.ssh/known_hosts` file on an SSH client machine?",
    "options": [
      "It stores the public host keys of previously visited servers to detect Man-in-the-Middle (MitM) spoofing attacks if the server key changes unexpectedly.",
      "It stores a list of the user's favorite YouTube videos.",
      "It contains the computer's MAC address.",
      "It is a temporary folder for deleted emails."
    ],
    "correctAnswer": 0,
    "explanation": "`known_hosts` records authenticated server public keys; if an attacker attempts to impersonate the server, SSH halts with a host key verification warning.",
    "hint": "Prevents Man-in-the-Middle server spoofing."
  },
  {
    "id": 11,
    "question": "Which command in the OpenSSH suite securely copies files between a local computer and a remote server over an encrypted SSH connection?",
    "options": [
      "scp (Secure Copy Protocol)",
      "ftp",
      "tftp",
      "telnet"
    ],
    "correctAnswer": 0,
    "explanation": "`scp` uses SSH for secure, authenticated data transfer and remote file copying.",
    "hint": "scp = Secure Copy."
  },
  {
    "id": 12,
    "question": "Can an attacker intercepting network packets read what command an administrator types inside an established SSH session?",
    "options": [
      "No, because every keystroke and command payload is encrypted using strong symmetric ciphers like AES.",
      "Yes, because SSH only encrypts the password, not subsequent commands.",
      "Yes, if the attacker uses Google Chrome.",
      "Only if the server is located in India."
    ],
    "correctAnswer": 0,
    "explanation": "SSH encrypts the entire session payload continuously from start to finish, including every typed character, command output, and error message.",
    "hint": "Entire session payload is strongly encrypted."
  },
  {
    "id": 13,
    "question": "What does an administrator see on screen when opening a Telnet session to a Cisco router or Linux host?",
    "options": [
      "A text-based command-line interface (CLI) prompt (e.g., `Router>` or `user@server:~$`).",
      "A graphical Windows desktop.",
      "A 3D virtual reality world.",
      "A web browser home page."
    ],
    "correctAnswer": 0,
    "explanation": "Telnet provides a purely character-oriented virtual terminal (NVT - Network Virtual Terminal) delivering a text CLI prompt.",
    "hint": "Text command-line interface (CLI)."
  },
  {
    "id": 14,
    "question": "Why should network administrators NEVER use Telnet to configure enterprise core routers across the public Internet?",
    "options": [
      "Because anyone capturing transit packets can extract the administrator's login credentials and seize total control of the enterprise network.",
      "Because Telnet causes fiber optic cables to melt.",
      "Because Telnet consumes 100 GB of RAM per second.",
      "Because Telnet requires permission from the United Nations."
    ],
    "correctAnswer": 0,
    "explanation": "Cleartext transmission over untrusted public networks exposes administrative credentials to eavesdropping, leading to catastrophic security breaches.",
    "hint": "Credentials captured over the public internet."
  },
  {
    "id": 15,
    "question": "Which of the following protocols is considered safe for remote server administration over untrusted or public networks?",
    "options": [
      "SSH",
      "Telnet",
      "Rlogin",
      "Finger"
    ],
    "correctAnswer": 0,
    "explanation": "SSH is the universally accepted secure remote administration protocol; Telnet and Rlogin are obsolete due to lack of encryption.",
    "hint": "SSH."
  },
  {
    "id": 16,
    "question": "What type of cipher is used during an active SSH session to encrypt the bulk stream of interactive data?",
    "options": [
      "Symmetric Cipher (such as AES-GCM or ChaCha20) negotiated during key exchange",
      "Simple Caesar Cipher",
      "No cipher is used",
      "Morse code"
    ],
    "correctAnswer": 0,
    "explanation": "Asymmetric cryptography negotiates a shared session key; high-speed symmetric ciphers (AES or ChaCha20) encrypt the continuous interactive data stream.",
    "hint": "Symmetric encryption (AES) for the active session."
  },
  {
    "id": 17,
    "question": "In standard OpenSSH, what command connects a client to a remote server at IP `192.168.1.50` with username `admin`?",
    "options": [
      "ssh admin@192.168.1.50",
      "telnet admin:password@192.168.1.50",
      "connect 192.168.1.50 -user admin",
      "ping admin 192.168.1.50"
    ],
    "correctAnswer": 0,
    "explanation": "The standard OpenSSH client syntax is `ssh username@hostname_or_ip`.",
    "hint": "ssh user@ip."
  },
  {
    "id": 18,
    "question": "What does the abbreviation NVT stand for in the context of the Telnet protocol specification?",
    "options": [
      "Network Virtual Terminal",
      "Non-Volatile Transmission",
      "New Version Technology",
      "Node Verification Token"
    ],
    "correctAnswer": 0,
    "explanation": "NVT (Network Virtual Terminal) is an imaginary device with a basic standard keyboard and display, providing an abstracted intermediate interface for Telnet.",
    "hint": "Network Virtual Terminal."
  },
  {
    "id": 19,
    "question": "What happens when you run a command like `ls -la` or `dir` inside an SSH remote session?",
    "options": [
      "The command executes on the remote server's operating system, and the encrypted text output is streamed back and rendered on your local terminal.",
      "The command formats the local user's C: drive.",
      "The command is sent to all computers on the Internet.",
      "The command reboots the client computer."
    ],
    "correctAnswer": 0,
    "explanation": "SSH executes the command on the remote server's CPU and shell environment, returning the output through the encrypted pipe to the local screen.",
    "hint": "Executes remotely on the server."
  },
  {
    "id": 20,
    "question": "Which of the following is an accurate comparison between Telnet and SSH?",
    "options": [
      "Telnet transmits in plaintext on Port 23; SSH transmits fully encrypted data on Port 22.",
      "Telnet is encrypted; SSH is plaintext.",
      "Telnet uses Port 80; SSH uses Port 443.",
      "Telnet is for video calls; SSH is for text files."
    ],
    "correctAnswer": 0,
    "explanation": "Telnet is unencrypted (Port 23); SSH is encrypted with cryptographic authentication (Port 22).",
    "hint": "Port 23 cleartext vs Port 22 encrypted."
  },
  {
    "id": 21,
    "question": "What security threat occurs when an attacker intercepts and modifies packets between a Telnet client and server?",
    "options": [
      "Man-in-the-Middle (MitM) session hijacking",
      "Hard disk head crash",
      "Power surge in copper cable",
      "Monitor burn-in"
    ],
    "correctAnswer": 0,
    "explanation": "Because Telnet lacks session encryption and message authentication codes (MACs), attackers can inject malicious commands or hijack active sessions.",
    "hint": "Man-in-the-Middle session hijacking."
  },
  {
    "id": 22,
    "question": "Can SSH be configured to run on a non-standard port (e.g., Port 2222) instead of Port 22?",
    "options": [
      "Yes, modifying the `Port` directive in `/etc/ssh/sshd_config` helps reduce automated port-scanning noise from Internet bots.",
      "No, internet protocols cannot change their port numbers under any circumstance.",
      "Only if the computer is manufactured by Apple.",
      "No, the router will explode."
    ],
    "correctAnswer": 0,
    "explanation": "Administrators frequently rebind the SSH daemon to a custom high port to evade automated internet-wide script scans.",
    "hint": "Port directive in sshd_config can be customized."
  },
  {
    "id": 23,
    "question": "In a CBSE 1-mark question: 'Why is SSH preferred over Telnet for remote login?' What is the model answer?",
    "options": [
      "SSH encrypts all transmitted data (including passwords) and provides strong authentication, whereas Telnet transmits all data and passwords in unencrypted cleartext.",
      "SSH has a nicer color scheme than Telnet.",
      "SSH can run without electricity.",
      "SSH only costs 5 rupees."
    ],
    "correctAnswer": 0,
    "explanation": "The core marking point is encryption of data and credentials in SSH versus insecure cleartext transmission in Telnet.",
    "hint": "Encryption of credentials and payload vs cleartext."
  },
  {
    "id": 24,
    "question": "Which component of an SSH key pair must NEVER be shared with anyone and must remain strictly protected on the user's private computer?",
    "options": [
      "The Private Key",
      "The Public Key",
      "The IP address",
      "The username"
    ],
    "correctAnswer": 0,
    "explanation": "The Private Key must remain confidential; the Public Key can be freely distributed and placed on remote servers.",
    "hint": "Private key must stay strictly secret."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination case study, a school's network administrator needs to remotely manage branch campus switches and database servers from home over the Internet. Which protocol should be deployed, and why?",
    "options": [
      "SSH (Secure Shell), because it secures administrative remote terminal access through robust cryptographic encryption and authentication over TCP port 22.",
      "Telnet, because it is older and simpler.",
      "HTTP, because it displays pictures.",
      "POP3, because it downloads emails."
    ],
    "correctAnswer": 0,
    "explanation": "SSH is the standard mandatory protocol for secure remote administration across public networks.",
    "hint": "SSH for secure encrypted remote administration."
  }
];
