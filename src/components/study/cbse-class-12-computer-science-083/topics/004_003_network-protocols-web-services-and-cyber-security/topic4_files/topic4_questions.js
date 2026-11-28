export default [
  {
    "id": 1,
    "question": "Which of the following protocols is exclusively responsible for sending (pushing) outgoing emails from a client to a mail server and between mail transfer agents (MTAs)?",
    "options": [
      "POP3",
      "SMTP (Simple Mail Transfer Protocol)",
      "IMAP",
      "HTTP"
    ],
    "correctAnswer": 1,
    "explanation": "SMTP is a push protocol designed for transferring outgoing mail from a client to the mail server, and for routing email between mail servers.",
    "hint": "Simple Mail Transfer Protocol pushes outgoing mail."
  },
  {
    "id": 2,
    "question": "What is the standard, legacy TCP port assigned to unencrypted SMTP?",
    "options": [
      "Port 21",
      "Port 25",
      "Port 80",
      "Port 110"
    ],
    "correctAnswer": 1,
    "explanation": "Standard plain SMTP listens on TCP Port 25 (with submission port 587 often used for authenticated client submission).",
    "hint": "Port 25."
  },
  {
    "id": 3,
    "question": "Why can SMTP NOT be used by an email client to retrieve (pull) incoming emails from a remote mailbox?",
    "options": [
      "Because SMTP is strictly a 'Push' protocol; it lacks the necessary retrieval commands (like LIST, RETR, DELE) to query a server mailbox.",
      "Because SMTP cannot transmit English words.",
      "Because SMTP requires an analog modem.",
      "Because SMTP servers delete all emails instantly upon arrival."
    ],
    "correctAnswer": 0,
    "explanation": "SMTP is an upload/push protocol designed to send mail forward. Mail retrieval requires a 'pull' protocol such as POP3 or IMAP.",
    "hint": "SMTP is push-only; POP3/IMAP are pull protocols."
  },
  {
    "id": 4,
    "question": "What does POP3 stand for in email networking?",
    "options": [
      "Post Office Protocol Version 3",
      "Public Online Packet Version 3",
      "Personal Office Program Version 3",
      "Peer Outgoing Port Version 3"
    ],
    "correctAnswer": 0,
    "explanation": "POP3 stands for Post Office Protocol Version 3.",
    "hint": "Post Office Protocol."
  },
  {
    "id": 5,
    "question": "On which default TCP port does standard unencrypted POP3 listen for mail retrieval?",
    "options": [
      "Port 25",
      "Port 53",
      "Port 110",
      "Port 143"
    ],
    "correctAnswer": 2,
    "explanation": "POP3 uses TCP port 110 for unencrypted connections (and port 995 for POP3S over SSL/TLS).",
    "hint": "Port 110."
  },
  {
    "id": 6,
    "question": "What is the default operational behavior of the POP3 protocol when retrieving emails to a local client device?",
    "options": [
      "It synchronizes folders in real-time across all devices.",
      "It downloads all emails from the server to the local computer and deletes them from the server mailbox by default.",
      "It forwards all emails to the sender automatically.",
      "It encrypts all emails with a bitcoin wallet."
    ],
    "correctAnswer": 1,
    "explanation": "POP3 was designed in an era of scarce server storage; by default, it downloads messages to the local machine and removes them from the server, making multi-device access problematic.",
    "hint": "Downloads and deletes from server by default."
  },
  {
    "id": 7,
    "question": "What does IMAP stand for?",
    "options": [
      "Internet Message Access Protocol",
      "Internal Mail Authentication Port",
      "International Media Attachment Program",
      "Instant Mobile Application Protocol"
    ],
    "correctAnswer": 0,
    "explanation": "IMAP stands for Internet Message Access Protocol.",
    "hint": "Internet Message Access Protocol."
  },
  {
    "id": 8,
    "question": "On which default TCP port does unencrypted IMAP operate?",
    "options": [
      "Port 25",
      "Port 110",
      "Port 143",
      "Port 993"
    ],
    "correctAnswer": 2,
    "explanation": "IMAP operates over TCP port 143 (and port 993 for IMAPS over SSL/TLS).",
    "hint": "Port 143."
  },
  {
    "id": 9,
    "question": "What is the primary advantage of IMAP over POP3 for a modern user accessing email from multiple devices (smartphone, office laptop, home desktop)?",
    "options": [
      "IMAP leaves messages on the central server and synchronizes folder states, read/unread flags, and drafts across all connected devices in real time.",
      "IMAP does not require an internet connection.",
      "IMAP sends emails faster than light.",
      "IMAP works without passwords."
    ],
    "correctAnswer": 0,
    "explanation": "IMAP keeps all email messages and folders centrally on the server, ensuring perfect synchronization across multiple devices simultaneously.",
    "hint": "Central server storage with multi-device folder sync."
  },
  {
    "id": 10,
    "question": "What is MIME (Multipurpose Internet Mail Extensions) in the context of electronic mail?",
    "options": [
      "An extension to the original plain-text SMTP standard that allows emails to include multimedia attachments, binary files, non-ASCII character sets, and HTML formatting.",
      "An email client application built by Microsoft.",
      "A firewall that blocks spam.",
      "A physical cable used in mail servers."
    ],
    "correctAnswer": 0,
    "explanation": "SMTP was originally restricted to 7-bit ASCII text. MIME enables email to transmit attachments, images, audio, video, and Unicode text using Base64 encoding.",
    "hint": "Multipurpose Internet Mail Extensions for attachments and multimedia."
  },
  {
    "id": 11,
    "question": "Which protocol is used when you draft an email on your phone and press the 'Send' button?",
    "options": [
      "SMTP",
      "POP3",
      "IMAP",
      "FTP"
    ],
    "correctAnswer": 0,
    "explanation": "Sending email always uses SMTP to dispatch the message from the client to the outgoing mail server.",
    "hint": "Sending is always SMTP."
  },
  {
    "id": 12,
    "question": "Which protocol is typically used when you open your email app on your laptop and view existing emails organized into folders created on your phone?",
    "options": [
      "SMTP",
      "IMAP",
      "ARP",
      "Telnet"
    ],
    "correctAnswer": 1,
    "explanation": "Folder organization and multi-device synchronization is the signature feature of IMAP.",
    "hint": "IMAP synchronizes folders across devices."
  },
  {
    "id": 13,
    "question": "What is the secure SSL/TLS port commonly used for encrypted IMAPS?",
    "options": [
      "Port 80",
      "Port 443",
      "Port 993",
      "Port 995"
    ],
    "correctAnswer": 2,
    "explanation": "Port 993 is assigned to IMAPS (IMAP over TLS).",
    "hint": "Port 993."
  },
  {
    "id": 14,
    "question": "What is the secure SSL/TLS port commonly used for encrypted POP3S?",
    "options": [
      "Port 110",
      "Port 443",
      "Port 993",
      "Port 995"
    ],
    "correctAnswer": 3,
    "explanation": "Port 995 is assigned to POP3S (POP3 over TLS).",
    "hint": "Port 995."
  },
  {
    "id": 15,
    "question": "What happens if a user configures their email account using POP3 without enabling the 'Leave copy of messages on server' setting, and their laptop hard drive crashes?",
    "options": [
      "All downloaded emails are permanently lost because they were deleted from the server upon download.",
      "The server automatically reconstructs the emails from memory.",
      "Google mails paper copies of the emails to the user's home.",
      "The emails appear on the user's television."
    ],
    "correctAnswer": 0,
    "explanation": "Because default POP3 removes mail from the server upon local download, losing the local device means losing the downloaded emails unless backed up.",
    "hint": "POP3 deletes from server; local drive failure causes data loss."
  },
  {
    "id": 16,
    "question": "Which DNS record type specifies the destination mail server responsible for accepting incoming emails on behalf of a domain name (e.g., @cbse.gov.in)?",
    "options": [
      "A Record",
      "MX (Mail Exchange) Record",
      "CNAME Record",
      "PTR Record"
    ],
    "correctAnswer": 1,
    "explanation": "MX (Mail Exchange) records specify which mail servers accept incoming emails for a specific domain.",
    "hint": "MX = Mail Exchange."
  },
  {
    "id": 17,
    "question": "What is 'Webmail' (such as Gmail or Outlook.com in a web browser)?",
    "options": [
      "A service where users access their mailbox through a web browser using HTTP/HTTPS, while the webmail server interacts with SMTP/IMAP on the backend.",
      "A completely new protocol that replaces the internet.",
      "Email delivered via physical postal vans.",
      "An email system that only works on paper."
    ],
    "correctAnswer": 0,
    "explanation": "Webmail interfaces use HTTPS between the client browser and the webmail server, while the server handles SMTP and IMAP on the backend.",
    "hint": "Web browser front-end using HTTPS to talk to mail servers."
  },
  {
    "id": 18,
    "question": "Which SMTP command is used by the sending client to identify itself and initiate the mail transaction dialogue?",
    "options": [
      "HELO (or EHLO)",
      "START",
      "BEGIN",
      "LOGIN"
    ],
    "correctAnswer": 0,
    "explanation": "`HELO` (or `EHLO` for Extended SMTP) opens the SMTP dialogue by identifying the sending host to the receiving server.",
    "hint": "HELO or EHLO."
  },
  {
    "id": 19,
    "question": "Which SMTP command specifies the sender's email address in the envelope?",
    "options": [
      "MAIL FROM:",
      "RCPT TO:",
      "DATA",
      "SEND"
    ],
    "correctAnswer": 0,
    "explanation": "`MAIL FROM:<sender@example.com>` establishes the sender identity for the envelope.",
    "hint": "MAIL FROM: command."
  },
  {
    "id": 20,
    "question": "Which SMTP command specifies the intended recipient's email address?",
    "options": [
      "RCPT TO:",
      "DELIVER:",
      "RECEIVER:",
      "FORWARD:"
    ],
    "correctAnswer": 0,
    "explanation": "`RCPT TO:<recipient@example.com>` specifies the destination mailbox.",
    "hint": "RCPT TO: command."
  },
  {
    "id": 21,
    "question": "Which SMTP command indicates that the subsequent lines contain the actual message header and message body?",
    "options": [
      "DATA",
      "BODY",
      "TEXT",
      "PAYLOAD"
    ],
    "correctAnswer": 0,
    "explanation": "`DATA` informs the server that message lines follow, terminated by a single period on a line by itself (`<CRLF>.<CRLF>`).",
    "hint": "DATA command."
  },
  {
    "id": 22,
    "question": "In IMAP, can a user read email headers (sender, subject, date) without downloading large 50 MB attachments?",
    "options": [
      "Yes, IMAP allows partial fetching of message headers and specific MIME parts without downloading the entire body.",
      "No, IMAP forces users to download all attachments before showing the subject line.",
      "Only if the user pays an extra fee.",
      "No, only POP3 can do that."
    ],
    "correctAnswer": 0,
    "explanation": "IMAP supports selective partial retrieval: clients can download just the envelope and subject header, downloading attachments only when requested.",
    "hint": "IMAP allows header-only preview."
  },
  {
    "id": 23,
    "question": "In a CBSE 1-mark question: 'Name the protocol used to transfer mail between two mail servers.' What is the answer?",
    "options": [
      "SMTP",
      "POP3",
      "IMAP",
      "HTTP"
    ],
    "correctAnswer": 0,
    "explanation": "SMTP is universally used for server-to-server email forwarding across the Internet.",
    "hint": "Server-to-server email transfer is always SMTP."
  },
  {
    "id": 24,
    "question": "Which of the following comparisons between POP3 and IMAP is accurate?",
    "options": [
      "POP3 downloads and deletes from server; IMAP keeps mail on server and syncs across devices.",
      "POP3 is for sending; IMAP is for deleting.",
      "POP3 only works on wireless; IMAP only works on cables.",
      "POP3 requires an MX record; IMAP requires an A record."
    ],
    "correctAnswer": 0,
    "explanation": "POP3 downloads mail locally and usually deletes it from the server; IMAP synchronizes mail centrally on the server across multiple devices.",
    "hint": "Local download vs server-side synchronization."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination case study, an office needs its traveling executives to view the same sent, received, and archived emails seamlessly on their smartphones and office desktops. Which email protocol must you recommend, and why?",
    "options": [
      "IMAP, because it stores emails centrally on the server and synchronizes folder states across all devices in real-time.",
      "POP3, because it deletes emails to free up server space.",
      "FTP, because it uploads files quickly.",
      "Telnet, because it provides remote terminal access."
    ],
    "correctAnswer": 0,
    "explanation": "IMAP is the standard recommendation for multi-device environments because of real-time server-side folder and message synchronization.",
    "hint": "IMAP for multi-device centralized synchronization."
  }
];
