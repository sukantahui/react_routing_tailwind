// topic1_files/topic1_questions.js
const questions = [
  {
    question: "What is the primary purpose of FTP?",
    shortAnswer: "FTP transfers files between client and server over a network.",
    explanation: "FTP (File Transfer Protocol) allows uploading, downloading, deleting, renaming, and listing files on a remote server. It uses separate command and data connections.",
    hint: "Think of it as file explorer over the internet.",
    level: "basic",
    codeExample: "ftp ftp.example.com"
  },
  {
    question: "What are the default ports for FTP control and data?",
    shortAnswer: "Control: port 21, Data: port 20 (active mode) or ephemeral (passive).",
    explanation: "Port 21 is for commands (USER, PASS, LIST). Port 20 is used only in active mode for data. Passive mode negotiates a random high port for data.",
    hint: "Which port does a firewall need to allow for basic FTP commands?",
    level: "basic",
    codeExample: "netstat -an | findstr :21"
  },
  {
    question: "Explain active vs passive FTP mode. Why is passive mode preferred today?",
    shortAnswer: "Active mode: server connects back to client for data. Passive: client initiates both connections. Passive works better through firewalls/NAT.",
    explanation: "In active FTP, the client sends PORT command, server connects to client's port 20. Clients behind NAT cannot be reached. Passive mode uses PASV command, server gives a port, client connects to it. Almost universal adoption.",
    hint: "If you are behind a home router, which mode would fail?",
    level: "intermediate",
    codeExample: "ftp> passive"
  },
  {
    question: "What is the difference between FTPS and SFTP?",
    shortAnswer: "FTPS is FTP over TLS/SSL. SFTP is file transfer over SSH (port 22). They are incompatible.",
    explanation: "FTPS adds TLS to FTP; uses ports 990 (implicit) or 21 with STARTTLS. SFTP is a subsystem of SSH, runs on port 22, provides encryption and additional features like resume, directory listing.",
    hint: "Which one uses SSH keys for authentication?",
    level: "advanced",
    codeExample: "sftp user@host"
  },
  {
    question: "What is SMTP and how does it differ from POP3/IMAP?",
    shortAnswer: "SMTP sends emails (push); POP3/IMAP receive emails (pull).",
    explanation: "SMTP is used for outgoing mail and relaying between mail servers. POP3/IMAP are used by email clients to retrieve messages from a mailbox on the server.",
    hint: "SMTP = post office outbound; POP3/IMAP = your mailbox.",
    level: "basic"
  },
  {
    question: "What are the common SMTP ports and their security?",
    shortAnswer: "25 (plain, often blocked), 587 (submission with STARTTLS), 465 (SMTPS - deprecated but used).",
    explanation: "Port 25 is for mail server to mail server relay. Port 587 for email clients submitting messages; requires authentication and STARTTLS. Port 465 is implicit SSL/TLS (historically used but standardised as 587 with STARTTLS).",
    hint: "Which port should a typical email client configure for sending?",
    level: "intermediate",
    codeExample: "openssl s_client -connect smtp.gmail.com:587 -starttls smtp"
  },
  {
    question: "What is an SMTP relay? Why is open relay dangerous?",
    shortAnswer: "SMTP relay forwards emails from any sender to any recipient. Open relay allows spammers to abuse the server.",
    explanation: "A mail relay accepts email for domains not hosted locally. Proper configuration restricts relaying to authenticated users or specific IPs. Open relays are exploited to send spam and get blacklisted.",
    hint: "Spammers look for open relays to hide their origin.",
    level: "advanced"
  },
  {
    question: "What is the difference between POP3 and IMAP?",
    shortAnswer: "POP3 downloads and normally deletes from server; IMAP keeps messages on server and syncs state.",
    explanation: "POP3 is simple, good for single device with offline access. IMAP is stateful, supports server-side folders, and works seamlessly across mobile, web, and desktop clients.",
    hint: "If you read an email on your phone, should your laptop see it as read?",
    level: "basic"
  },
  {
    question: "What ports does POP3 and IMAP use with and without TLS?",
    shortAnswer: "POP3: 110 plain, 995 TLS. IMAP: 143 plain, 993 TLS.",
    explanation: "POP3 over TLS (POP3S) uses 995. IMAP over TLS (IMAPS) uses 993. Many modern clients default to 993/995.",
    hint: "Look at your email account advanced settings.",
    level: "basic"
  },
  {
    question: "How does email routing work from sender to recipient using SMTP?",
    shortAnswer: "Client → SMTP server (outgoing) → DNS MX lookup → recipient's SMTP server → mailbox.",
    explanation: "Sender's MTA queries DNS for recipient domain's MX record, connects to that server, transfers message using SMTP. Recipient's MTA stores message, then client retrieves via POP3/IMAP.",
    hint: "Trace the journey of an email from Gmail to Yahoo.",
    level: "intermediate"
  },
  {
    question: "What are MX records in DNS?",
    shortAnswer: "MX (Mail Exchange) records specify which mail servers handle email for a domain.",
    explanation: "MX records have priority values (lower = higher priority). Sender's SMTP server connects to the lowest priority host that is reachable.",
    hint: "What DNS record tells the internet where to deliver email for @example.com?",
    level: "intermediate",
    codeExample: "dig gmail.com MX"
  },
  {
    question: "What is STARTTLS?",
    shortAnswer: "STARTTLS upgrades a plain text connection to encrypted TLS on the same port.",
    explanation: "Used with SMTP (port 587), POP3 (110), IMAP (143). Client sends STARTTLS command, then proceeds with TLS handshake. Avoids separate SSL ports.",
    hint: "It's like saying 'let's talk securely from now on' after connecting.",
    level: "advanced"
  },
  {
    question: "What authentication methods are commonly used for SMTP submission?",
    shortAnswer: "PLAIN, LOGIN, CRAM-MD5, OAuth2, or client certificates.",
    explanation: "PLAIN sends password in base64 (needs TLS). LOGIN similar. CRAM-MD5 uses challenge-response. OAuth2 used by Gmail/Outlook. Never use plain authentication without TLS.",
    hint: "Why does your email client ask for 'password' and also 'server requires encryption'?",
    level: "intermediate"
  },
  {
    question: "What is the purpose of email headers like 'Received', 'From', 'Return-Path'?",
    shortAnswer: "Headers trace routing, identify sender, and handle bounces.",
    explanation: "Received headers show each hop. From is displayed to user. Return-Path (or Envelope-From) used for delivery failure notifications. SPF/DKIM headers validate authenticity.",
    hint: "Open an email's original source – you'll see many Received lines.",
    level: "intermediate"
  },
  {
    question: "What are SPF, DKIM, and DMARC?",
    shortAnswer: "SPF authorises sending IPs. DKIM adds digital signature. DMARC tells receivers how to handle unauthenticated mail.",
    explanation: "SPF (TXT record) lists allowed mail servers. DKIM signs outgoing emails with private key. DMARC policy (p=none/quarantine/reject) improves anti-spoofing. Essential for deliverability.",
    hint: "Why would Gmail reject an email that appears to be from your own domain?",
    level: "advanced",
    codeExample: "dig TXT _dmarc.example.com"
  },
  {
    question: "What is an email 'bounce' and how does it relate to SMTP?",
    shortAnswer: "Bounce is a delivery failure notification sent via SMTP as a separate message.",
    explanation: "When SMTP server cannot deliver (invalid recipient, mailbox full), it generates a bounce message (Delivery Status Notification) to the Return-Path address. Hard bounce = permanent failure; soft bounce = temporary.",
    hint: "Why do you sometimes get 'Mail Delivery System' emails?",
    level: "intermediate"
  },
  {
    question: "What is the difference between IMAP IDLE and polling?",
    shortAnswer: "IDLE allows server to push real-time notifications; polling periodically checks for new mail.",
    explanation: "IMAP IDLE keeps a persistent connection – server sends 'EXISTS' when new mail arrives, client receives instantly. Polling (e.g., every 5 minutes) wastes resources and delays.",
    hint: "Why does your phone email notification appear instantly?",
    level: "advanced"
  },
  {
    question: "What is the maximum message size often imposed by SMTP servers?",
    shortAnswer: "Typically 10 MB to 25 MB, configurable by admin.",
    explanation: "SMTP servers set message size limit (`MAXSIZE` in EHLO response). Larger messages get '552 Requested mail action aborted: exceeded storage allocation'. For large files, use file sharing links.",
    hint: "Why can't you send a 100 MB video via traditional email?",
    level: "basic"
  },
  {
    question: "What is ESMTP and how is it different from plain SMTP?",
    shortAnswer: "ESMTP (Extended SMTP) adds capabilities like authentication, 8BITMIME, PIPELINING, and SIZE.",
    explanation: "Client sends EHLO instead of HELO. Server returns list of supported extensions. Nearly all modern SMTP servers use ESMTP.",
    hint: "Look for EHLO in email logs.",
    level: "intermediate"
  },
  {
    question: "Can FTP resume interrupted downloads?",
    shortAnswer: "Yes, using REST command (restart at byte offset) – but not all servers support it.",
    explanation: "FTP client sends REST <position> then RETR. Server transfers from that point. Modern protocols like SFTP or HTTP/Range handle resuming better.",
    hint: "What command would you use to continue a partial download?",
    level: "advanced",
    codeExample: "restart 1024000"
  },
  {
    question: "What is anonymous FTP? Is it still used?",
    shortAnswer: "Anonymous FTP allows login with username 'anonymous' and any password (often email). Used for public file distribution.",
    explanation: "Many open source archives (historical) used anonymous FTP. Today, HTTP/HTTPS downloads are more common, but some Linux distros still offer FTP mirrors.",
    hint: "When would you want to allow file downloads without creating user accounts?",
    level: "basic"
  },
  {
    question: "What is the difference between binary and ASCII transfer modes in FTP?",
    shortAnswer: "Binary transfers raw bytes; ASCII converts line endings between different systems (LF ↔ CRLF).",
    explanation: "Text files should use ASCII to avoid line ending corruption. Images, executables, archives must use binary mode. Mismatch can corrupt files.",
    hint: "Why does a ZIP file downloaded in ASCII mode become corrupted?",
    level: "intermediate",
    codeExample: "binary\nget archive.zip"
  },
  {
    question: "What is an IMAP folder separator and namespace?",
    shortAnswer: "Hierarchy separator (usually '/' or '.') defines subfolders. Namespace defines personal, shared, and public folders.",
    explanation: "IMAP servers allow folder nesting. `INBOX.Sent` (if separator is '.') or `INBOX/Sent` (separator '/'). Namespace commands list available hierarchy roots.",
    hint: "Why can't you have a folder named 'INBOX/Folder' and 'INBOX/Folder/Sub' without separator?",
    level: "expert"
  },
  {
    question: "What is the IMAP UID command and why is it useful?",
    shortAnswer: "UID uniquely identifies a message within a mailbox, even after expunge. Used for persistent message tracking.",
    explanation: "Message sequence numbers change (after delete/expunge). UID remains constant. Mail clients store UID validity and UID to sync state. UID FETCH and UID SEARCH are standard.",
    hint: "How does your email client remember which messages it has already downloaded?",
    level: "expert"
  },
  {
    question: "What is an SMTP AUTH LOGIN vs PLAIN?",
    shortAnswer: "Both send credentials base64-encoded. LOGIN sends username and password in separate commands; PLAIN sends combined in one command.",
    explanation: "PLAIN format: `\0username\0password`. LOGIN is older, sends `username` then `password`. Both require TLS protection. Microsoft Exchange often uses LOGIN.",
    hint: "Which method produces fewer bytes over the network?",
    level: "intermediate"
  },
  {
    question: "What is a 'null MX' record and its purpose?",
    shortAnswer: "Null MX (dot as MX target) indicates domain does not accept email.",
    explanation: "Defined in RFC 7505. Used to reject all email to a domain, avoiding bounces to nonexistent mailboxes. Example: `. 0 .`",
    hint: "How can a domain signal that it has no email service?",
    level: "expert"
  },
  {
    question: "What is the difference between SMTP pipelining and non-pipelining?",
    shortAnswer: "Pipelining allows sending multiple commands without waiting for responses; improves latency.",
    explanation: "Without pipelining: send MAIL, wait for 250, send RCPT, wait for 250... With pipelining: send MAIL, RCPT, RCPT, DATA all in one burst, then read responses. Most servers support it.",
    hint: "Why would sending email to multiple recipients be faster with pipelining?",
    level: "advanced"
  },
  {
    question: "What is an email 'list server' and how does it use SMTP?",
    shortAnswer: "A mailing list server receives one email and resends to many subscribers using SMTP.",
    explanation: "List server (e.g., Mailman, Sympa) receives mail at list address, expands to subscriber list, then uses SMTP to deliver copies to each member. Adds headers like List-Id.",
    hint: "How does one email reach 5000 people in a newsletter?",
    level: "intermediate"
  },
  {
    question: "What is a honeypot in the context of SMTP?",
    shortAnswer: "A fake email address that traps spammers; connections to it indicate a spam source.",
    explanation: "Organisations place hidden email addresses on web pages. Spambots harvesting addresses will send to it. The receiving server then blacklists the sending IP.",
    hint: "Why do some websites warn 'Do not use fake emails for verification'?",
    level: "advanced"
  },
  {
    question: "What is the IMAP APPEND command used for?",
    shortAnswer: "APPEND uploads a message directly into a mailbox folder (e.g., Sent, Archive).",
    explanation: "Clients use APPEND to save copies of sent emails into server's Sent folder, or to restore archived messages. Can specify flags (\\Seen, \\Draft) and date.",
    hint: "How does Gmail's 'Send As' feature put a copy in both sent folders?",
    level: "expert",
    codeExample: "C: A003 APPEND Sent {310}\r\nM: + OK\r\nC: Date: ... (full message)"
  }
];

export default questions;