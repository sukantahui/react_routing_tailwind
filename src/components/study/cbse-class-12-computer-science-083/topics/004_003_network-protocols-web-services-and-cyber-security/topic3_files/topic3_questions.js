export default [
  {
    "id": 1,
    "question": "What is the primary function of the File Transfer Protocol (FTP)?",
    "options": [
      "To transfer computer files between a client and a server across a network reliably.",
      "To send text messages over mobile cell towers.",
      "To edit graphic images in web browsers.",
      "To assign dynamic IP addresses to laptops."
    ],
    "correctAnswer": 0,
    "explanation": "FTP is an Application Layer protocol designed specifically for transferring, uploading, downloading, and manipulating files between computers across a TCP/IP network.",
    "hint": "File Transfer Protocol."
  },
  {
    "id": 2,
    "question": "FTP is unique because it uses TWO separate TCP connections simultaneously. What are they called?",
    "options": [
      "Control Connection and Data Connection",
      "Upload Connection and Download Connection",
      "Wireless Connection and Fiber Connection",
      "Primary Connection and Backup Connection"
    ],
    "correctAnswer": 0,
    "explanation": "FTP uses an 'Out-of-Band' dual-connection architecture: a Control Connection for commands/replies, and a separate Data Connection for file transfers.",
    "hint": "Control and Data connections."
  },
  {
    "id": 3,
    "question": "Which default TCP port is used for the FTP Control Connection to send commands and authentication credentials?",
    "options": [
      "Port 20",
      "Port 21",
      "Port 25",
      "Port 80"
    ],
    "correctAnswer": 1,
    "explanation": "The FTP Control Connection operates over TCP port 21, remaining open throughout the entire user session.",
    "hint": "Port 21 is FTP Control."
  },
  {
    "id": 4,
    "question": "Which default TCP port is used in standard Active Mode FTP for the Data Connection to transfer actual file bytes?",
    "options": [
      "Port 20",
      "Port 21",
      "Port 23",
      "Port 53"
    ],
    "correctAnswer": 0,
    "explanation": "In Active FTP, the server initiates the data connection from its local TCP port 20 to the client's allocated port.",
    "hint": "Port 20 is FTP Data."
  },
  {
    "id": 5,
    "question": "What is the key difference between Active FTP mode and Passive FTP mode?",
    "options": [
      "In Active mode, the server connects to the client for data transfer; in Passive mode, the client initiates the data connection to the server.",
      "Active mode requires no passwords; Passive mode requires three passwords.",
      "Active mode only works on Linux; Passive mode only works on macOS.",
      "Active mode uses satellite; Passive mode uses copper wire."
    ],
    "correctAnswer": 0,
    "explanation": "In Active FTP, the server initiates the data connection back to the client, which is often blocked by client-side firewalls/NAT. In Passive FTP (PASV), the client initiates the connection to a high port on the server.",
    "hint": "Passive mode solves client-side firewall/NAT blocking issues."
  },
  {
    "id": 6,
    "question": "What is 'Anonymous FTP'?",
    "options": [
      "An illegal hacking tool used to steal database tables.",
      "An FTP service that permits public users to log in using the username 'anonymous' or 'ftp' (often with an email as password) to access public archives without an account.",
      "An encrypted FTP tunnel used by cryptocurrency miners.",
      "An FTP server with no hard drive attached."
    ],
    "correctAnswer": 1,
    "explanation": "Anonymous FTP allows public access to software repositories and documentation without requiring individual registered user accounts.",
    "hint": "Public access using username 'anonymous'."
  },
  {
    "id": 7,
    "question": "What is the critical security vulnerability of classic, standard FTP?",
    "options": [
      "FTP cannot transfer files larger than 1 megabyte.",
      "FTP transmits all authentication usernames, passwords, and file contents in unencrypted cleartext over the network.",
      "FTP requires special gold-plated Ethernet cables.",
      "FTP only works on dial-up telephone connections."
    ],
    "correctAnswer": 1,
    "explanation": "Classic FTP sends usernames, passwords, and data in unencrypted plaintext, allowing attackers to sniff credentials using packet analysis tools.",
    "hint": "Transmits credentials and data in cleartext."
  },
  {
    "id": 8,
    "question": "Which secure protocol replaces legacy unencrypted FTP by running file transfers inside an encrypted SSH (Secure Shell) tunnel over Port 22?",
    "options": [
      "SFTP (SSH File Transfer Protocol)",
      "TFTP",
      "SNMP",
      "Gopher"
    ],
    "correctAnswer": 0,
    "explanation": "SFTP runs over SSH (TCP port 22), providing encrypted authentication, host key verification, and secure data transfer.",
    "hint": "SFTP uses SSH on Port 22."
  },
  {
    "id": 9,
    "question": "What is FTPS (FTP over SSL/TLS)?",
    "options": [
      "FTP running inside a VPN router.",
      "Standard FTP enhanced with SSL/TLS encryption for control and data channels, typically using ports 990 or explicit TLS over port 21.",
      "A peer-to-peer file sharing protocol like BitTorrent.",
      "A protocol designed exclusively for floppy disks."
    ],
    "correctAnswer": 1,
    "explanation": "FTPS adds SSL/TLS cryptographic security to standard FTP.",
    "hint": "FTP Secure using SSL/TLS."
  },
  {
    "id": 10,
    "question": "Which command in command-line FTP is used by a client to upload a local file to the remote server?",
    "options": [
      "GET",
      "PUT (or MPUT)",
      "FETCH",
      "PUSH"
    ],
    "correctAnswer": 1,
    "explanation": "In FTP, `PUT filename` uploads a single file to the server; `MPUT` uploads multiple files.",
    "hint": "PUT uploads to the server."
  },
  {
    "id": 11,
    "question": "Which command in command-line FTP is used by a client to download a remote file from the server to the local computer?",
    "options": [
      "GET (or MGET)",
      "POST",
      "STORE",
      "RECEIVE"
    ],
    "correctAnswer": 0,
    "explanation": "In FTP, `GET filename` downloads a single file; `MGET` downloads multiple files matching a wildcard.",
    "hint": "GET downloads from the server."
  },
  {
    "id": 12,
    "question": "What are the two primary data representation modes supported by FTP?",
    "options": [
      "ASCII (Text) Mode and Binary (Image) Mode",
      "RGB Mode and CMYK Mode",
      "Audio Mode and Video Mode",
      "Analog Mode and Digital Mode"
    ],
    "correctAnswer": 0,
    "explanation": "FTP supports ASCII mode (for plain text files, handling newline conversions between OS platforms) and Binary mode (for executables, images, and archives).",
    "hint": "ASCII vs Binary transfer modes."
  },
  {
    "id": 13,
    "question": "What happens if a compiled `.exe` or `.zip` file is accidentally transferred using FTP's ASCII mode?",
    "options": [
      "The file is corrupted because FTP may alter carriage return and line feed bytes.",
      "The file automatically decompresses into text.",
      "The file transfers twice as fast.",
      "The server converts the program into Python code."
    ],
    "correctAnswer": 0,
    "explanation": "ASCII mode modifies newline characters (CR/LF) across platforms, which corrupts binary files like executables, PDFs, and archives.",
    "hint": "Newline conversion corrupts binary data."
  },
  {
    "id": 14,
    "question": "What is TFTP (Trivial File Transfer Protocol)?",
    "options": [
      "A simplified, lightweight, lock-step file transfer protocol that operates over UDP port 69 without authentication.",
      "An encrypted FTP protocol used by banks.",
      "A protocol used exclusively for video streaming.",
      "A hardware chip inside a hard drive."
    ],
    "correctAnswer": 0,
    "explanation": "TFTP uses UDP port 69, lacks authentication, and is commonly used for network booting (PXE) and loading router firmware.",
    "hint": "Trivial FTP over UDP port 69."
  },
  {
    "id": 15,
    "question": "Why does the FTP Control Connection stay active while the Data Connection is created and destroyed dynamically?",
    "options": [
      "Because the control connection maintains user authentication and session state, while data connections are spawned per file transfer.",
      "Because computers can only support one cable connection at a time.",
      "Because port 21 is a wireless frequency.",
      "To prevent electrical shocks."
    ],
    "correctAnswer": 0,
    "explanation": "The control connection persists to track session state, current directory, and user rights; a new data connection is opened whenever a directory listing or file is transferred and closed upon completion.",
    "hint": "Control connection persists; data connection is ephemeral per transfer."
  },
  {
    "id": 16,
    "question": "In command-line FTP, which command terminates the session and disconnects from the remote server?",
    "options": [
      "QUIT (or BYE)",
      "STOP",
      "END",
      "KILL"
    ],
    "correctAnswer": 0,
    "explanation": "`QUIT` or `BYE` sends an exit command to the FTP server, closing the control connection gracefully.",
    "hint": "QUIT or BYE."
  },
  {
    "id": 17,
    "question": "Which of the following is a popular graphical FTP client application?",
    "options": [
      "FileZilla",
      "WinSCP",
      "Cyberduck",
      "All of the above"
    ],
    "correctAnswer": 3,
    "explanation": "FileZilla, WinSCP, and Cyberduck are standard GUI FTP/SFTP clients widely used for managing remote server files.",
    "hint": "FileZilla, WinSCP, Cyberduck."
  },
  {
    "id": 18,
    "question": "In FTP status replies, what does a response code in the 200 range (e.g., 220, 230) signify?",
    "options": [
      "Positive Completion reply",
      "Command syntax error",
      "Service not available",
      "Password required"
    ],
    "correctAnswer": 0,
    "explanation": "2xx status replies in FTP indicate positive completion of the requested command.",
    "hint": "2xx indicates success."
  },
  {
    "id": 19,
    "question": "What is the command used in FTP to change the current working directory on the remote server?",
    "options": [
      "CWD (or CD)",
      "MKDIR",
      "PWD",
      "LIST"
    ],
    "correctAnswer": 0,
    "explanation": "`CWD` (Change Working Directory) or `cd` navigates the remote directory tree.",
    "hint": "Change Working Directory."
  },
  {
    "id": 20,
    "question": "What command displays the current working directory path on the remote FTP server?",
    "options": [
      "PWD (Print Working Directory)",
      "DIR",
      "SHOW",
      "PATH"
    ],
    "correctAnswer": 0,
    "explanation": "`PWD` prints the current remote directory path.",
    "hint": "Print Working Directory."
  },
  {
    "id": 21,
    "question": "In Passive FTP mode, what command does the client send to request the server to open a listening data port?",
    "options": [
      "PASV",
      "PORT",
      "OPEN",
      "LISTEN"
    ],
    "correctAnswer": 0,
    "explanation": "The `PASV` command tells the server to enter passive mode and return an IP and port for the client to connect to.",
    "hint": "PASV command."
  },
  {
    "id": 22,
    "question": "What is the key advantage of FTP over using email attachments to send large files (e.g., 500 MB)?",
    "options": [
      "FTP supports resuming interrupted transfers, has no strict mailbox quota limits, and does not bloat file size via Base64 encoding.",
      "FTP is automatically translated into French.",
      "FTP eliminates the need for hard drives.",
      "FTP is wireless only."
    ],
    "correctAnswer": 0,
    "explanation": "Email attachments are limited in size (typically 25 MB) and encode files via Base64 (adding 33% overhead); FTP easily handles gigabyte-sized files with resumption.",
    "hint": "Designed for large files with resumption support."
  },
  {
    "id": 23,
    "question": "In a CBSE board exam question, what should you state as the primary port numbers associated with FTP?",
    "options": [
      "Port 20 (Data Connection) and Port 21 (Control Connection)",
      "Port 80 (HTTP) and Port 443 (HTTPS)",
      "Port 25 (SMTP) and Port 110 (POP3)",
      "Port 53 (DNS) and Port 23 (Telnet)"
    ],
    "correctAnswer": 0,
    "explanation": "FTP uses Port 21 for Control/Commands and Port 20 for Active Data Transfer.",
    "hint": "Port 20 and Port 21."
  },
  {
    "id": 24,
    "question": "Can an FTP client and server operate across different operating systems (e.g., a Windows client uploading to a Linux server)?",
    "options": [
      "Yes, because FTP is an open, standardized protocol that abstracts underlying operating system differences.",
      "No, FTP only works if both machines run identical versions of Windows.",
      "No, Linux cannot communicate with Windows over networks.",
      "Only if connected by a crossover cable."
    ],
    "correctAnswer": 0,
    "explanation": "FTP is platform-independent, enabling seamless file exchanges between Windows, Linux, UNIX, and macOS systems.",
    "hint": "Platform-independent protocol standard."
  },
  {
    "id": 25,
    "question": "In CBSE Class 12 board examination case studies, when should you recommend FTP/SFTP?",
    "options": [
      "When a school or organization needs a reliable mechanism for bulk uploading website files, software patches, or student record archives to a remote web server.",
      "When a user wants to browse news headlines.",
      "When connecting two monitors to one CPU.",
      "When printing a report on a USB printer."
    ],
    "correctAnswer": 0,
    "explanation": "FTP/SFTP is specifically recommended whenever a scenario describes uploading website assets, large backups, or bulk repository synchronization.",
    "hint": "Bulk uploading and downloading of files."
  }
];
