// topic23_questions.js
// 30 Moderate to Expert Questions on Servers in Computer Networks and Cyber Security

const questions = [
  {
    question: "What is a Server in the context of computer networking and systems architecture?",
    shortAnswer: "A Server is a high-performance computer system or software application that continuously listens for, processes, and serves resources, services, or data to multiple client devices over a network.",
    explanation: "Servers are engineered for 24/7/365 continuous uptime, multi-user concurrency, high I/O throughput, and centralized resource management.",
    hint: "Think of a central machine that provides services to multiple requesting clients.",
    level: "moderate",
    codeExample: "server.listen(port = 443, onConnection = handleClientRequest);"
  },
  {
    question: "How does enterprise Server hardware differ fundamentally from standard desktop PC hardware?",
    shortAnswer: "Servers feature multi-socket enterprise CPUs (Xeon/EPYC), Error-Correcting Code (ECC) RAM, hot-swappable redundant power supplies (1+1 RPS), hardware RAID storage with SAS/NVMe drives, and out-of-band management (iDRAC/iLO).",
    explanation: "Unlike consumer PCs, servers are engineered with hardware redundancy so that memory errors, power supply failures, or drive crashes do not cause system downtime.",
    hint: "ECC memory, redundant power supplies, hardware RAID, and 24/7 reliability.",
    level: "expert",
    codeExample: "ServerSpecs = { CPU: 'Dual AMD EPYC', RAM: '256GB ECC DDR5', Power: 'Dual 800W RPS', RAID: 'RAID 10 NVMe' };"
  },
  {
    question: "What is a Web Server and which standard network ports does it listen on?",
    shortAnswer: "A Web Server (e.g., Nginx, Apache, Microsoft IIS) processes incoming HTTP/HTTPS requests to deliver web pages, images, and APIs; it listens on Port 80 (HTTP) and Port 443 (HTTPS/TLS).",
    explanation: "Web servers handle SSL/TLS decryption, HTTP header parsing, static file delivery, and reverse proxy forwarding to backend application runtimes.",
    hint: "Port 80 for unencrypted HTTP, Port 443 for encrypted HTTPS.",
    level: "moderate",
    codeExample: "webServer.listen([80, 443], (req, res) => res.send('HTML/JSON Payload'));"
  },
  {
    question: "What is a Database Server and why is it isolated behind internal network firewalls?",
    shortAnswer: "A Database Server (e.g., MySQL, PostgreSQL, Oracle) stores, manages, and queries structured relational data; it is kept off the public internet to prevent direct cyber attacks and data breaches.",
    explanation: "Database servers run on private subnets, accepting connections strictly from authorized application servers over internal VLANs (e.g., Port 3306 for MySQL or Port 5432 for PostgreSQL).",
    hint: "Stores sensitive tables; hidden in a private subnet to prevent direct hacker attacks.",
    level: "moderate",
    codeExample: "dbServer.bind('10.0.2.5:3306'); // Bound strictly to private internal subnet"
  },
  {
    question: "What is a File Server / Network-Attached Storage (NAS) server?",
    shortAnswer: "A centralized server dedicated to storing, managing, and sharing files across an enterprise network using protocols such as SMB/CIFS (Windows), NFS (Linux), or SFTP.",
    explanation: "File servers provide centralized access control, user quotas, automated snapshots, and offsite replication, preventing data fragmentation across local desktops.",
    hint: "Central storage hub sharing folders over SMB or NFS.",
    level: "moderate",
    codeExample: "nas.shareFolder('/data/accounts', Protocol.SMB, Permissions.ReadOnlyForStudents);"
  },
  {
    question: "What is the function of a Domain Name System (DNS) Server in network infrastructure?",
    shortAnswer: "A DNS Server translates human-friendly domain names (e.g., www.college.edu) into computer-routable IP addresses (e.g., 103.25.14.88) over UDP/TCP Port 53.",
    explanation: "DNS operates as the telephone directory of the Internet, resolving hierarchical queries (Root, TLD, Authoritative) in milliseconds.",
    hint: "Translates website domain names to numerical IP addresses on Port 53.",
    level: "moderate",
    codeExample: "dns.resolve('www.wb.gov.in') => '103.120.45.10';"
  },
  {
    question: "What is a DHCP (Dynamic Host Configuration Protocol) Server?",
    shortAnswer: "A network server that automatically assigns IP addresses, subnet masks, default gateway routers, and DNS servers to client devices upon connection (UDP Ports 67/68 via DORA process).",
    explanation: "DHCP eliminates manual IP address configuration on every laptop or smartphone, preventing IP address conflict errors across campus LANs.",
    hint: "Automatically leases IP addresses to newly connected devices.",
    level: "moderate",
    codeExample: "dhcp.leaseIP(clientMAC) => { ip: '192.168.1.105', mask: '255.255.255.0', gateway: '192.168.1.1' };"
  },
  {
    question: "What is a Reverse Proxy Server and what architectural benefits does it provide?",
    shortAnswer: "A Reverse Proxy (e.g., Nginx, HAProxy, Cloudflare) sits in front of web servers to intercept client requests, providing load balancing, SSL/TLS termination, caching, and DDoS mitigation.",
    explanation: "Clients communicate only with the reverse proxy's public IP address; internal application servers remain anonymous and protected in private subnets.",
    hint: "Front-end gateway that balances traffic and shields backend servers from direct exposure.",
    level: "expert",
    codeExample: "reverseProxy.forward(incomingRequest, loadBalancer.getLeastLoadedServer());"
  },
  {
    question: "What is an Authentication and Directory Server (e.g., Microsoft Active Directory / OpenLDAP)?",
    shortAnswer: "A centralized database server that authenticates user credentials, enforces security policies, and manages authorization across all enterprise workstations, servers, and resources.",
    explanation: "Active Directory Domain Controllers use Kerberos and LDAP protocols to provide Single Sign-On (SSO) and group policy management for thousands of enterprise users.",
    hint: "Central identity database verifying usernames, passwords, and user access rights.",
    level: "expert",
    codeExample: "ldapServer.authenticate(username, password) => { authenticated: true, role: 'Faculty' };"
  },
  {
    question: "What is the difference between a Type 1 (Bare-Metal) Hypervisor and a Type 2 (Hosted) Hypervisor for server virtualization?",
    shortAnswer: "Type 1 hypervisors (VMware ESXi, Proxmox VE, KVM) run directly on bare server hardware for maximum performance; Type 2 hypervisors (VirtualBox, VMware Workstation) run on top of an existing host OS.",
    explanation: "Production enterprise data centers in Kolkata exclusively deploy Type 1 bare-metal hypervisors to eliminate host OS overhead and deliver maximum I/O speed to guest Virtual Machines.",
    hint: "Type 1 runs directly on hardware (ESXi/KVM); Type 2 runs inside Windows/Linux like an app.",
    level: "expert",
    codeExample: "Type1: [Hardware] -> [Hypervisor ESXi] -> [Guest VMs]; Type2: [Hardware] -> [Host OS] -> [VirtualBox] -> [Guest VM];"
  },
  {
    question: "How do Containers (Docker) differ from traditional Virtual Machines (VMs) on a server?",
    shortAnswer: "VMs virtualize the entire hardware layer and run a complete guest OS with its own kernel; Containers share the host OS kernel and package only the application and its dependencies, making them lightweight and instant to boot.",
    explanation: "Containers consume megabytes of RAM and start in milliseconds, whereas full VMs consume gigabytes of RAM and take minutes to boot.",
    hint: "VMs package full operating systems; Containers share the host kernel and run in isolated user spaces.",
    level: "expert",
    codeExample: "ContainerResourceUsage = '50MB RAM / 100ms startup'; VMResourceUsage = '4GB RAM / 60s startup';"
  },
  {
    question: "What is Hardware RAID and why is RAID 10 (1+0) commonly configured on database servers?",
    shortAnswer: "RAID (Redundant Array of Independent Disks) combines multiple physical drives into one logical unit. RAID 10 combines disk mirroring (RAID 1) with striping (RAID 0), delivering both high I/O speed and fault tolerance against drive failure.",
    explanation: "Database servers demand high random read/write IOPS while guaranteeing zero data loss if a mechanical drive or NVMe SSD fails.",
    hint: "Combines mirroring for safety and striping for speed.",
    level: "expert",
    codeExample: "RAID10 = StripedArray(MirroredPairs([Drive1, Drive2], [Drive3, Drive4]));"
  },
  {
    question: "Suppose Debangshu in Barrackpore is purchasing a 2U Rack Server for factory ERP hosting. What is the estimated hardware cost in Indian Rupees (₹)?",
    shortAnswer: "Estimated cost is ₹2,50,000 – ₹5,50,000 (including dual Intel Xeon CPUs, 128GB ECC RAM, 4x2TB Enterprise NVMe SSDs in RAID 10, dual 800W hot-plug power supplies, and 3-year enterprise warranty).",
    explanation: "Enterprise server procurement in West Bengal accounts for server-grade silicon, hot-plug drive bays, redundant power, and on-site hardware replacement SLA support in ₹.",
    hint: "Enterprise server silicon, ECC memory, RAID arrays, and dual power supplies budgeted in ₹.",
    level: "moderate",
    codeExample: "ServerProcurementCost = ₹3,85,000; // Includes Dual Xeon, 128GB ECC RAM, RAID-10 NVMe"
  },
  {
    question: "What is Out-of-Band (OOB) Server Management (e.g., Dell iDRAC, HPE iLO)?",
    shortAnswer: "A dedicated microcontroller and isolated network port on the server motherboard that allows administrators to remotely power on/off, reboot, monitor hardware health, and install OS images even when the main OS is crashed.",
    explanation: "OOB management operates on standby power independently of the main CPU and OS, enabling remote headless administration from anywhere across Kolkata or Jadavpur.",
    hint: "Separate management chip allowing remote hardware control even if the server OS is dead.",
    level: "expert",
    codeExample: "idrac.remotePowerCycle(serverIP); idrac.mountVirtualMedia('ubuntu-server.iso');"
  },
  {
    question: "What is the primary cyber security practice known as 'Server Hardening'?",
    shortAnswer: "The systematic process of securing a server by closing unnecessary open ports, disabling unused services, enforcing SSH key-only login, configuring host firewalls (UFW/iptables), applying OS security patches, and establishing least-privilege user access.",
    explanation: "Hardening minimizes the server's attack surface, preventing remote exploitation and lateral network movement by cyber attackers.",
    hint: "Locking down a server by disabling unused services, closing ports, and patching vulnerabilities.",
    level: "expert",
    codeExample: "ServerHardening = [DisableRootSSH, EnforceKeyAuth, EnableUFW, InstallFail2ban, AutoSecurityPatches];"
  },
  {
    question: "What is an Application Server vs a Web Server?",
    shortAnswer: "A Web Server delivers static content (HTML, CSS, JS) and handles HTTP connections; an Application Server executes business logic, multi-threaded computations, and database transactions (e.g., Node.js, Spring Boot, Django).",
    explanation: "In modern 3-tier web architectures, the web server accepts incoming client traffic and proxies complex dynamic requests to backend application servers.",
    hint: "Web server serves static files; Application server executes dynamic business code and algorithms.",
    level: "moderate",
    codeExample: "WebTier(Nginx) -> AppTier(Node.js/Spring) -> DatabaseTier(PostgreSQL);"
  },
  {
    question: "What role does ECC (Error-Correcting Code) RAM play in enterprise servers?",
    shortAnswer: "ECC RAM automatically detects and corrects single-bit memory errors caused by cosmic rays or electrical interference, preventing silent data corruption and unexpected server operating system crashes.",
    explanation: "In financial databases and critical cloud workloads, a single flipped bit can corrupt balance sheets or trigger kernel panics; ECC memory guarantees data integrity.",
    hint: "Memory chips that fix single-bit errors in real-time to stop server crashes.",
    level: "expert",
    codeExample: "if (eccRAM.detectSingleBitError()) eccRAM.correctBitAutomatically();"
  },
  {
    question: "Why do enterprise servers utilize Rack Units (1U, 2U, 4U) form factors in data center racks?",
    shortAnswer: "Standard 19-inch rack units (1U = 1.75 inches / 44.45mm height) enable high-density component stacking, centralized airflow cooling, organized structured cabling, and redundant power distribution.",
    explanation: "Rack-mounted servers optimize physical floor space in server rooms across Kolkata and Barrackpore while providing standardized slide-out rail servicing.",
    hint: "Standardized height measurement (1U = 1.75 inches) for mounting in server racks.",
    level: "moderate",
    codeExample: "ServerHeight = '2U (3.5 inches)'; RackCapacity = '42U Standard Server Rack';"
  },
  {
    question: "What is a Proxy Server vs a Reverse Proxy Server?",
    shortAnswer: "A Forward Proxy protects internal clients by intercepting outgoing requests to the Internet (content filtering, anonymity); a Reverse Proxy protects internal servers by intercepting incoming requests from the Internet (load balancing, DDoS defense).",
    explanation: "Forward proxies sit on the client's edge; reverse proxies sit on the server farm's edge.",
    hint: "Forward proxy shields clients going out; Reverse proxy shields servers receiving traffic in.",
    level: "expert",
    codeExample: "ForwardProxy: [Clients] -> [Proxy] -> [Internet]; ReverseProxy: [Internet] -> [Reverse Proxy] -> [Internal Servers];"
  },
  {
    question: "What is Load Balancing and which algorithms are used by server load balancers?",
    shortAnswer: "Load balancing distributes incoming network traffic across multiple backend servers to maximize throughput and prevent overload. Algorithms include Round Robin, Least Connections, IP Hash, and Weighted Response Time.",
    explanation: "If Server 1 experiences heavy CPU load, the load balancer routes subsequent client requests to Server 2 or Server 3 seamlessly.",
    hint: "Distributes requests across a cluster so no single machine gets overloaded.",
    level: "moderate",
    codeExample: "loadBalancer.route(incomingRequest, algorithm = 'LeastConnections');"
  },
  {
    question: "What is a Print Server?",
    shortAnswer: "A hardware device or server software application that manages network printers, queues print jobs from multiple workstations, and enforces user printing quotas and permissions.",
    explanation: "Print servers eliminate the need to attach printers directly to individual PCs, allowing campus-wide centralized document printing across colleges in Kolkata.",
    hint: "Manages print queues and printer access across the network.",
    level: "basic",
    codeExample: "printServer.queueJob(documentPDF, targetPrinter = 'Lab1_LaserJet');"
  },
  {
    question: "What is a Mail Server and what protocols does it utilize for sending and receiving emails?",
    shortAnswer: "A Mail Server (e.g., Postfix, Microsoft Exchange) routes and stores emails; it uses SMTP (Port 25/587) for sending emails and IMAP (Port 993) / POP3 (Port 995) for retrieving emails.",
    explanation: "SMTP delivers messages between mail transfer agents (MTAs), while IMAP allows users on smartphones and laptops to sync mailboxes across devices.",
    hint: "SMTP sends mail; IMAP and POP3 retrieve mail.",
    level: "moderate",
    codeExample: "mailServer.send(SMTP, port = 587); mailServer.retrieve(IMAP, port = 993);"
  },
  {
    question: "How does Network Time Protocol (NTP) Server maintain server cluster synchronization?",
    shortAnswer: "NTP servers distribute high-precision UTC time (synchronized with atomic clocks via GPS) across all enterprise servers over UDP Port 123.",
    explanation: "Accurate server timestamps are essential for Kerberos authentication tickets, database transaction logs, and cybersecurity SIEM incident forensics.",
    hint: "Synchronizes clocks across all servers to the exact millisecond on Port 123.",
    level: "expert",
    codeExample: "ntpClient.syncTime('time.google.com') => serverClockOffset = '0.4ms';"
  },
  {
    question: "What is a Serverless Architecture (Function-as-a-Service / FaaS)?",
    shortAnswer: "A cloud execution model where the cloud provider dynamically manages server provisioning and scaling; developers deploy only code functions (e.g., AWS Lambda, Google Cloud Functions) executed on-demand.",
    explanation: "Organizations pay solely for the exact milliseconds of compute time consumed during request execution, with zero idle server operating costs.",
    hint: "Cloud model where developers write functions and never manage physical operating systems.",
    level: "expert",
    codeExample: "awsLambda.onEvent('NewStudentRegistration', executeValidationFunction);"
  },
  {
    question: "What is a Blade Server and how does it optimize space and power in enterprise data centers?",
    shortAnswer: "A Blade Server is a modular, ultra-compact single-board computer that slides into a shared Blade Chassis that provides shared power supplies, cooling fans, and high-speed network backplanes.",
    explanation: "Blade servers maximize compute density, housing up to 16 servers in a compact 10U enclosure while reducing cabling clutter by up to 80%.",
    hint: "Modular slim server cards that plug into a shared chassis with central power and cooling.",
    level: "expert",
    codeExample: "bladeChassis.insertBlade(BladeSlot4) => sharesChassisPowerAndCooling();"
  },
  {
    question: "How does Fail2ban protect Linux servers from brute-force authentication attacks?",
    shortAnswer: "Fail2ban scans server authentication log files (e.g., /var/log/auth.log) for repeated password failures and dynamically inserts temporary firewall drop rules (iptables) to ban the attacker's IP address.",
    explanation: "If an automated bot attempts 5 incorrect SSH passwords within 10 minutes, Fail2ban bans the IP address for 24 hours automatically.",
    hint: "Automated daemon that bans IP addresses after repeated failed login attempts.",
    level: "expert",
    codeExample: "if (failedSSHAttempts >= 5) iptables.banIP(attackerIP, duration = '24h');"
  },
  {
    question: "What is an Uninterruptible Power Supply (UPS) runtime calculation for an enterprise server rack consuming 2000 Watts?",
    shortAnswer: "A 6kVA / 5400W online double-conversion UPS paired with an external battery pack provides approximately 45 to 60 minutes of backup runtime, allowing safe generator switchover or graceful server shutdown.",
    explanation: "Battery runtime enables automated scripts to trigger graceful VM shutdowns and database flushes if grid power is not restored before battery depletion.",
    hint: "Calculates battery backup duration to prevent abrupt server power loss.",
    level: "moderate",
    codeExample: "UPSRuntime = (BatteryCapacity_WattHours * Efficiency) / ServerLoad_Watts;"
  },
  {
    question: "Why should root login over SSH be disabled on public-facing Linux servers?",
    shortAnswer: "Because 'root' is a universally known username targeted by brute-force password guessing bots; disabling it forces administrators to authenticate with a unique unprivileged account and escalate via sudo with multi-factor authentication (MFA).",
    explanation: "Disabling direct root login preserves individual audit logs and stops automated dictionary attacks against the default administrator account.",
    hint: "Prevents attackers from brute-forcing the well-known 'root' superuser account.",
    level: "expert",
    codeExample: "sshd_config: 'PermitRootLogin no'; 'PasswordAuthentication no'; 'PubkeyAuthentication yes';"
  },
  {
    question: "What is an Edge Server in Content Delivery Networks (CDNs) and modern Web 3.0 architectures?",
    shortAnswer: "A caching and compute server geographically deployed close to end-users (e.g., local ISP POPs in Kolkata) to serve static assets, media streams, and API responses with ultra-low latency.",
    explanation: "Edge servers prevent every request from traveling across global oceans to origin data centers, dropping latency from 200ms to under 10ms for local users.",
    hint: "Local caching server placed close to users to speed up website loading.",
    level: "moderate",
    codeExample: "edgeCDN.serveCachedAsset(userRequest) => Latency = '5ms (Local Kolkata Node)';"
  },
  {
    question: "What is the ultimate golden rule for deploying and managing enterprise Servers?",
    shortAnswer: "'Implement hardware redundancy (ECC, RAID, Dual Power); isolate databases behind reverse proxies and private VLANs; enforce least-privilege security hardening; maintain automated backups and UPS power; and budget all infrastructure in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all foundational pillars of server engineering, high availability, cybersecurity hardening, and sound financial budgeting.",
    hint: "Hardware redundancy + Hardened security + Private subnets + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: HardwareRedundancy() -> ServerHardening() -> PrivateVLANs() -> BudgetInRupees(₹);"
  }
];

export default questions;
