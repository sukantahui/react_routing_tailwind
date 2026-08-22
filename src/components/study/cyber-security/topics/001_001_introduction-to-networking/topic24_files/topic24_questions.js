// topic24_questions.js
// 30 Moderate to Expert Questions on Clients in Computer Networks and Cyber Security

const questions = [
  {
    question: "What is a Client in computer networking and distributed systems architecture?",
    shortAnswer: "A Client is an endpoint hardware computing device (e.g., PC, laptop, phone) or software program (e.g., browser, email client) that initiates communication by requesting services or data from a network Server.",
    explanation: "In client-server architecture, clients are request initiators that consume resources, process business interfaces, and present results to end-users.",
    hint: "Think of an endpoint device or application that requests data from a central server.",
    level: "moderate",
    codeExample: "client.request('GET /students/report') => server.respond(200, reportData);"
  },
  {
    question: "What is a Thick (Fat) Client and what are its key architectural characteristics?",
    shortAnswer: "A Thick Client is a full-powered computer (high CPU, RAM, local storage, full OS) that performs the majority of processing, calculations, and business logic locally, relying on the server primarily for data storage.",
    explanation: "Examples include engineering CAD workstations, video editing rigs, and desktop software like Microsoft Excel or local database IDEs.",
    hint: "Heavy computer with high local specs running programs on its own hardware.",
    level: "moderate",
    codeExample: "ThickClient = { LocalCPU: 'Core i7', RAM: '32GB', LocalStorage: '1TB NVMe', RunsLocally: true };"
  },
  {
    question: "What is a Thin Client and how does it reduce corporate IT expenditure in Indian Rupees (₹)?",
    shortAnswer: "A Thin Client is a low-power, lightweight computer with minimal local hardware that relies on a central server for all application execution and storage (e.g., Virtual Desktop Infrastructure / VDI).",
    explanation: "Thin clients cost only ₹12,000 – ₹25,000 per seat (saving up to 60% compared to ₹65,000 desktop PCs), reduce electrical consumption to under 15W, and eliminate local desktop maintenance.",
    hint: "Low-cost terminal that connects to a server where all software actually runs.",
    level: "moderate",
    codeExample: "ThinClientCost = ₹18,000; DesktopPCCost = ₹65,000; // 72% initial savings"
  },
  {
    question: "What is a Zero Client and how does it differ from a Thin Client?",
    shortAnswer: "A Zero Client has NO local operating system, no local storage, and no local CPU for general computing; it contains a dedicated hardware decoding chip (PCoIP/Blast) that connects directly to remote server hypervisors.",
    explanation: "Zero clients offer maximum cybersecurity because they have no local OS that can be infected by malware, no local files that can be stolen, and near-zero boot time.",
    hint: "Has no local OS or hard drive at all; purely displays server pixels via hardware decoding.",
    level: "expert",
    codeExample: "ZeroClient = { LocalOS: null, LocalHardDrive: null, HardwareDecoder: 'Teradici PCoIP', Vulnerabilities: 0 };"
  },
  {
    question: "What is an Ephemeral Port and why do clients use dynamic high ports when connecting to servers?",
    shortAnswer: "An Ephemeral Port is a temporary, dynamically allocated high port (49152 to 65535) assigned by the client's OS to uniquely identify a specific socket session when contacting a server's well-known port (e.g., 443).",
    explanation: "If Debangshu opens 5 browser tabs to a web server on Port 443, each tab receives a unique ephemeral port (e.g., 51234, 51235) so the OS can route incoming server responses to the correct tab.",
    hint: "Temporary dynamic high port (e.g., 52410) assigned to your browser tab for connection tracking.",
    level: "expert",
    codeExample: "SocketPair = { ClientIP: '192.168.1.50', ClientPort: 54123, ServerIP: '103.25.10.4', ServerPort: 443 };"
  },
  {
    question: "What is the complete sequence of network steps a Client executes when you type 'https://www.college.edu' into a browser?",
    shortAnswer: "1. DNS Query (resolves domain to IP), 2. TCP 3-Way Handshake (SYN -> SYN-ACK -> ACK), 3. TLS 1.3 Cryptographic Handshake (encryption keys exchanged), 4. HTTP GET request dispatch, 5. HTML/CSS/JS response rendering.",
    explanation: "The client orchestrates application, transport, and network layers sequentially to establish encrypted end-to-end sessions in under 100 milliseconds.",
    hint: "DNS resolution -> TCP Handshake -> TLS Handshake -> HTTP Request -> Render.",
    level: "expert",
    codeExample: "ClientLifecycle: DNS_Lookup() -> TCP_SYN_ACK() -> TLS_KeyExchange() -> HTTP_GET() -> DOM_Render();"
  },
  {
    question: "What is a Web Client (User Agent) and what are its primary internal engines?",
    shortAnswer: "A Web Client (e.g., Chrome, Firefox, Safari) is software that requests web resources; its primary engines are the Rendering Engine (Blink/Gecko - parses HTML/CSS into DOM) and the JavaScript Engine (V8/SpiderMonkey - executes JS).",
    explanation: "Web clients format HTTP requests, enforce security policies (CORS, CSP), manage local cache/cookies, and render rich graphical user interfaces.",
    hint: "Browser software with a rendering engine (Blink) and JavaScript engine (V8).",
    level: "moderate",
    codeExample: "Browser = { RenderingEngine: 'Blink', JSEngine: 'V8', Protocols: ['HTTP/2', 'HTTP/3', 'WebSockets'] };"
  },
  {
    question: "What is Endpoint Detection and Response (EDR) on corporate client devices?",
    shortAnswer: "An advanced cybersecurity agent installed on client endpoints that continuously monitors system behavior, file modifications, memory injections, and network sockets to detect and isolate ransomware and advanced threats.",
    explanation: "Unlike legacy signature-based antivirus, EDR (e.g., CrowdStrike, Microsoft Defender for Endpoint) uses AI behavioral analytics to detect zero-day exploits and isolate compromised laptops from the LAN.",
    hint: "Intelligent security agent that monitors client behavior and stops malware in real time.",
    level: "expert",
    codeExample: "if (edrAgent.detectsRansomwareBehavior()) edrAgent.isolateHostFromNetwork();"
  },
  {
    question: "How does the Zero Trust Architecture (ZTA) paradigm treat client devices?",
    shortAnswer: "ZTA adheres to 'Never Trust, Always Verify'—it assumes client devices on the internal LAN are potentially compromised, verifying device health, user identity, certificate compliance, and location on every request.",
    explanation: "Connecting to the office Wi-Fi in Kolkata no longer grants implicit trust; clients must pass continuous posture assessment before accessing sensitive database servers.",
    hint: "'Never trust, always verify'—internal clients are verified on every single access request.",
    level: "expert",
    codeExample: "ZTA.evaluateAccess(clientCertValid, mfaVerified, edrHealthStatus, compliantPatchLevel);"
  },
  {
    question: "What is Client-Side Encryption (e.g., BitLocker / FileVault) and why is it mandatory for enterprise laptops?",
    shortAnswer: "Full-disk encryption (FDE) that encrypts all data at rest on client hard drives using AES-256 keys tied to the hardware TPM (Trusted Platform Module) chip, preventing data theft if a laptop is physically stolen.",
    explanation: "If an employee loses a laptop in Barrackpore, an attacker cannot read sensitive files by pulling out the NVMe SSD because the disk remains an unreadable ciphertext blob without TPM/PIN unlock.",
    hint: "Encrypts the entire hard drive with hardware TPM keys so thieves cannot read stolen data.",
    level: "moderate",
    codeExample: "bitlocker.encryptDrive('C:', Algorithm.AES_XTS_256, KeyStorage.TPM_2_0);"
  },
  {
    question: "Suppose Mahima is equipping a bank branch in Ichapur with 10 teller desks. Why is deploying Thin Clients with VDI preferred over standalone desktop PCs?",
    shortAnswer: "Thin clients cost ~₹1,80,000 for 10 units (vs ₹6,50,000 for PCs), prevent tellers from copying confidential customer data onto USB drives, centralize software updates on the server, and survive power fluctuations seamlessly.",
    explanation: "Banking security mandates zero local data storage on teller desks to prevent insider data exfiltration and ensure instant terminal replacement upon hardware failure.",
    hint: "Prevents USB data theft, centralizes updates, saves costs in ₹, and ensures instant replacement.",
    level: "moderate",
    codeExample: "BranchSetup = { 10_ThinClients: ₹1,80,000, CentralVDIHost: ₹3,00,000, USBStorageBlocked: true };"
  },
  {
    question: "What is a Rich Internet Application / Progressive Web App (PWA) Client?",
    shortAnswer: "A modern hybrid client application built using web technologies (HTML5, Service Workers, WebAssembly, IndexedDB) that delivers native app experiences, offline functionality, and desktop notifications inside browser sandboxes.",
    explanation: "PWAs combine the zero-installation distribution of web clients with the performance, hardware access, and offline resilience of thick desktop clients.",
    hint: "Web application that works offline and behaves like an installed native desktop app.",
    level: "moderate",
    codeExample: "serviceWorker.onFetch((event) => event.respondWith(caches.match(event.request)));"
  },
  {
    question: "What is the Same-Origin Policy (SOP) enforced by web client browsers?",
    shortAnswer: "A foundational browser security mechanism that restricts a script loaded from one origin (domain, protocol, port) from accessing sensitive DOM objects, cookies, or data from a different origin.",
    explanation: "SOP prevents a malicious tab on 'evil.com' from reading banking session cookies or stealing account numbers from an adjacent 'mybank.com' tab in Debangshu's browser.",
    hint: "Browser rule preventing scripts on one website from stealing data from another website.",
    level: "expert",
    codeExample: "if (originA !== originB) browser.blockCrossOriginAccess();"
  },
  {
    question: "What is an SSH Client (e.g., OpenSSH, PuTTY) and how does it securely authenticate to remote servers?",
    shortAnswer: "An SSH client opens an encrypted terminal session to remote servers over TCP Port 22, using asymmetric public-key cryptography (Ed25519 / RSA) and Diffie-Hellman key exchange for passwordless, tamper-proof administration.",
    explanation: "The client proves possession of its private key (`id_ed25519`) without ever transmitting the key across the wire, defeating packet eavesdropping across untrusted networks.",
    hint: "Encrypted remote terminal client using public-key cryptography on Port 22.",
    level: "moderate",
    codeExample: "ssh -i ~/.ssh/id_ed25519 debangshu@server.barrackpore.ind:22"
  },
  {
    question: "What is the function of a DHCP Client daemon running on a student's laptop in Jadavpur?",
    shortAnswer: "It broadcasts a DHCPDISCOVER packet over UDP Port 68 upon connecting to Wi-Fi, receives a DHCPOFFER, requests configuration (DHCPREQUEST), and applies the leased IP, subnet mask, and DNS server to the local network stack.",
    explanation: "The local DHCP client daemon automates network onboarding, renewing the IP lease at 50% lifetime without interrupting active browser sessions.",
    hint: "Client background service that requests and configures local IP settings automatically.",
    level: "moderate",
    codeExample: "dhclient.requestLease(interface = 'wlan0') => configuredLocalIP = '172.16.4.112';"
  },
  {
    question: "What is an FTP / SFTP Client (e.g., FileZilla, Cyberduck)?",
    shortAnswer: "A client application used to transfer, upload, and manage files between local computers and remote storage servers over File Transfer Protocol (FTP - Port 21) or Secure FTP (SFTP - Port 22 over SSH).",
    explanation: "SFTP clients encrypt both authentication credentials and file payloads, preventing plaintext password sniffing on public networks.",
    hint: "Application used to upload and download files to web hosting and storage servers.",
    level: "basic",
    codeExample: "sftpClient.upload('/local/app.zip', '/var/www/html/app.zip', securePort = 22);"
  },
  {
    question: "What is Mobile Device Management (MDM) for corporate mobile and laptop clients?",
    shortAnswer: "Centralized software (e.g., Microsoft Intune, Jamf) that allows corporate IT administrators to enforce security policies, push software updates, mandate encryption, and remotely wipe enterprise data if a device is lost or stolen.",
    explanation: "MDM secures smartphones and laptops used by remote workers across Kolkata, ensuring compliance with organizational cybersecurity standards.",
    hint: "Central software allowing IT to manage, secure, and remotely wipe lost company phones and laptops.",
    level: "expert",
    codeExample: "mdmServer.sendPushPolicy(clientDevice, { enforcePinLength: 6, autoWipeOn10FailedAttempts: true });"
  },
  {
    question: "What is Content Security Policy (CSP) and how does it protect Web Clients?",
    shortAnswer: "An HTTP response header sent by servers that instructs the browser to restrict which domains can execute JavaScript, load images, or embed iframes, mitigating Cross-Site Scripting (XSS) and data injection attacks.",
    explanation: "If a hacker injects an unauthorized malicious script into a webpage, the client's browser blocks execution because the script origin is not whitelisted in the CSP header.",
    hint: "Security header telling the browser which script sources are safe to execute.",
    level: "expert",
    codeExample: "Content-Security-Policy: default-src 'self'; script-src 'self' https://trustedcdn.com;"
  },
  {
    question: "What is an Email Client (MUA - Mail User Agent) and how does it synchronize mailboxes?",
    shortAnswer: "An Email Client (e.g., Outlook, Apple Mail) uses IMAP (Port 993) to maintain two-way synchronization of email folders, read/unread states, and drafts across multiple client devices, using SMTP (Port 587) to send outgoing mail.",
    explanation: "Unlike legacy POP3 (which downloaded and deleted mail from the server), IMAP keeps mail stored centrally on the server while caching copies locally on client devices.",
    hint: "Software that syncs mail folders across phone and laptop using IMAP on Port 993.",
    level: "moderate",
    codeExample: "emailClient.syncFolder('INBOX', Protocol.IMAPS, port = 993);"
  },
  {
    question: "Why do client operating systems maintain a Local DNS Resolver Cache?",
    shortAnswer: "To store recently resolved domain name-to-IP mappings locally in RAM, eliminating the latency of querying external DNS servers repeatedly for frequently visited websites.",
    explanation: "When Mamata visits college.edu, the IP address is cached for the duration of the Time-To-Live (TTL), speeding up subsequent page loads from 50ms to 0ms.",
    hint: "Local RAM memory storing website IP addresses so the computer doesn't re-ask DNS servers.",
    level: "moderate",
    codeExample: "if (dnsCache.has('college.edu')) return dnsCache.get('college.edu'); // Instant 0ms hit"
  },
  {
    question: "What is an RDP (Remote Desktop Protocol) Client (Port 3389)?",
    shortAnswer: "A client application (e.g., Microsoft Remote Desktop) that allows a user to remotely view and interact with the graphical desktop interface of a remote Windows PC or Server over an encrypted network connection.",
    explanation: "RDP transmits keyboard strokes, mouse clicks, and compressed display frames using bitmap and H.264 video compression over TCP/UDP Port 3389.",
    hint: "Tool to remotely control a Windows computer's desktop screen over Port 3389.",
    level: "moderate",
    codeExample: "mstsc.exe /v:192.168.1.100:3389 // Initiates encrypted remote desktop session"
  },
  {
    question: "What is the role of a TPM (Trusted Platform Module) 2.0 chip on client motherboards?",
    shortAnswer: "A dedicated hardware cryptographic coprocessor that securely generates, stores, and protects encryption keys, certificates, and platform measurements (Secure Boot), making keys tamper-resistant against OS-level malware.",
    explanation: "TPM 2.0 hardware prevents cold-boot attacks and verifies that system firmware and OS bootloaders have not been modified by rootkits before releasing disk encryption keys.",
    hint: "Hardware security chip on the motherboard storing encryption keys and verifying boot integrity.",
    level: "expert",
    codeExample: "tpm.measureBootIntegrity() => if (integrityValid) releaseBitLockerKey();"
  },
  {
    question: "What is Client-Side Caching and how do HTTP headers like `Cache-Control` control it?",
    shortAnswer: "`Cache-Control` headers (e.g., `max-age=86400, immutable`) instruct web browsers to save static images, stylesheets, and scripts in local client storage, reducing server bandwidth and accelerating page loads.",
    explanation: "By caching logo files and JavaScript bundles locally on Susmita's laptop, subsequent website visits load instantly without generating network requests.",
    hint: "Header telling the browser to save files locally for a specified number of seconds.",
    level: "moderate",
    codeExample: "HTTP/1.1 200 OK\nCache-Control: public, max-age=31536000, immutable"
  },
  {
    question: "What is a Database Client tool (e.g., DBeaver, pgAdmin, MySQL Workbench)?",
    shortAnswer: "A client application that allows database administrators and developers to visually compose SQL queries, inspect table schemas, analyze execution plans, and manage remote database servers over secure network connections.",
    explanation: "DB clients connect via JDBC/ODBC drivers over TLS-encrypted database ports (e.g., 5432 for Postgres), rendering tabular query results for human inspection.",
    hint: "Desktop application for running SQL queries and managing database servers visually.",
    level: "basic",
    codeExample: "dbeaver.connect('jdbc:postgresql://db.kolkata.org:5432/students', credentials);"
  },
  {
    question: "What is a Virtual Desktop Infrastructure (VDI) Client (e.g., VMware Horizon / Citrix Workspace)?",
    shortAnswer: "A client application that connects thin or zero clients to personalized, virtualized Windows or Linux desktop sessions hosted on enterprise server clusters in a data center.",
    explanation: "VDI clients render virtual desktops with low bandwidth consumption, supporting dynamic multi-monitor displays, USB redirection, and audio streaming.",
    hint: "Client app that streams a virtual Windows computer running inside a data center server.",
    level: "expert",
    codeExample: "citrixWorkspace.launchSession(userToken, virtualDesktopPool = 'EngineeringDesktops');"
  },
  {
    question: "What is Network Address Port Translation (NAPT / PAT) from the perspective of client endpoints?",
    shortAnswer: "A router function that maps private IP addresses and ephemeral ports of multiple internal client devices to a single public IP address using unique translated source port numbers when browsing the Internet.",
    explanation: "All 50 workstations in a college lab in Barrackpore share one public IP address (e.g., 103.45.20.1) while maintaining distinct simultaneous web sessions via unique PAT port mappings.",
    hint: "Allows dozens of internal office computers to share a single public Internet IP address.",
    level: "expert",
    codeExample: "InternalClient(192.168.1.15:52134) -> RouterPAT(103.45.20.1:41002) -> PublicInternet;"
  },
  {
    question: "What is a REST API Client (e.g., Postman, Insomnia, curl)?",
    shortAnswer: "A specialized developer client tool used to compose, test, and debug HTTP requests (GET, POST, PUT, DELETE) with custom headers, JSON payloads, and authentication tokens against backend web service APIs.",
    explanation: "Developers in Jadavpur use API clients to verify backend microservice responses, validate status codes (200 OK, 404, 500), and benchmark endpoint latency.",
    hint: "Developer tool like Postman or curl used to test backend API endpoints and JSON data.",
    level: "moderate",
    codeExample: "curl -X POST https://api.kolkata.org/v1/admit -H 'Authorization: Bearer xyz' -d '{\"id\":101}'"
  },
  {
    question: "Why is disabling auto-run/auto-play for USB mass storage drives standard cybersecurity policy for client computers?",
    shortAnswer: "To prevent malicious USB drives (e.g., Rubber Ducky, infected flash drives) from automatically executing malicious scripts, dropper trojans, or keyboard-injection payloads upon physical insertion.",
    explanation: "Group policies in Windows and Linux disable automatic drive mounting and execution, requiring administrative security scans before files can be accessed.",
    hint: "Stops infected USB thumb drives from automatically launching malware when plugged in.",
    level: "moderate",
    codeExample: "GroupPolicy: 'Turn off Autoplay on all drives = Enabled'; 'Block USB Mass Storage = Enabled';"
  },
  {
    question: "What is an IoT (Internet of Things) Client Endpoint?",
    shortAnswer: "A specialized embedded micro-computing client (e.g., ESP32, Raspberry Pi, industrial smart sensor) that collects physical sensor data (temperature, pressure, electricity) and transmits lightweight telemetry to cloud servers via protocols like MQTT or CoAP.",
    explanation: "IoT clients operate on battery power with limited memory, using lightweight publish-subscribe protocols to report readings to central monitoring dashboards in Barrackpore.",
    hint: "Smart sensor or micro-device that sends temperature or sensor readings to a cloud server via MQTT.",
    level: "moderate",
    codeExample: "mqttClient.publish('factory/boiler1/temperature', JSON.stringify({ temp: 84.5 }));"
  },
  {
    question: "What is the ultimate golden rule for configuring and securing Client endpoints in an enterprise network?",
    shortAnswer: "'Deploy thin/zero clients where data sensitivity and cost dictate; enforce full-disk encryption and EDR on mobile laptops; adopt Zero Trust authentication; mandate least-privilege user accounts; and budget all hardware and software in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes client architecture optimization, financial prudence, and modern endpoint defense against sophisticated cyber threats.",
    hint: "Thin clients for security + Disk encryption on laptops + Zero Trust + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: DeployThinClients() -> EnforceEncryptionAndEDR() -> AdoptZeroTrust() -> BudgetInRupees(₹);"
  }
];

export default questions;
