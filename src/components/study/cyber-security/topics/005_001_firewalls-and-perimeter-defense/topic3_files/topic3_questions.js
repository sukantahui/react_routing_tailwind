const questions = [
  {
    id: 1,
    question: "What is a Circuit-Level Gateway and at which layer of the OSI model does it operate?",
    shortAnswer: "A firewall technology operating at Layer 5 (Session Layer) that validates transport handshakes (such as TCP 3-way handshakes) to establish and relay authorized virtual circuits without inspecting Layer 7 application payloads.",
    explanation: "A Circuit-Level Gateway sits between client and server, intercepting the initial transport handshake. Once it verifies session permissions and establishes dual independent handshakes, it acts as a transparent byte-relay between the two socket circuits.",
    hint: "Operates at OSI Layer 5 (Session Layer) and monitors handshakes.",
    level: "Basic",
    codeExample: `// Circuit-Level Gateway Operating Scope:
// Layer 7 Application: NOT Inspected (Raw byte relay)
// Layer 5 Session    : INSPECTED & MEDIATED (Handshake Validation & Circuit Splitting!)
// Layer 3/4 Transport: Handshake & Socket Management`
  },
  {
    id: 2,
    question: "Explain the 'Dual Handshake' (Circuit Splitting) mechanism employed by Circuit-Level Gateways.",
    shortAnswer: "Direct end-to-end IP connectivity is severed: Circuit 1 is established between Client and Gateway, and an independent Circuit 2 is established between Gateway and Destination Server.",
    explanation: "Unlike a simple router that forwards packets end-to-end, a circuit gateway terminates the client's TCP SYN handshake locally (Circuit 1). After verifying credentials and policies, the gateway creates a new, independent socket and performs a second TCP handshake with the destination (Circuit 2), hiding the client's IP from the outside world.",
    hint: "Client connects to Gateway; Gateway connects to Server; direct IP link is severed.",
    level: "Moderate",
    codeExample: `// Dual Handshake Architecture:
// [Client: 10.10.1.50] <=== TCP Handshake 1 ===> [Circuit Gateway: 172.16.1.1]
//                                                    │
// [Destination: 203.0.113.10] <=== TCP Handshake 2 ===> [Circuit Gateway: 172.16.1.1]`
  },
  {
    id: 3,
    question: "What is the SOCKS Protocol and which RFC defines the SOCKS Version 5 standard?",
    shortAnswer: "SOCKS (SOCKetS) is the industry-standard circuit-level proxy protocol; SOCKS Version 5 is defined in RFC 1928.",
    explanation: "SOCKS allows client-server applications to transparently use network firewall proxies. SOCKSv5 (RFC 1928) introduced support for TCP and UDP, IPv4, IPv6, domain name resolution, and flexible authentication mechanisms.",
    hint: "The SOCKS protocol, specifically SOCKSv5 defined in RFC 1928.",
    level: "Basic",
    codeExample: `// SOCKS Standards:
// SOCKSv4: TCP only, IPv4 only, No authentication (Ident only)
// SOCKSv5 (RFC 1928): TCP + UDP, IPv4/IPv6/FQDN, GSS-API & Username/Password Auth`
  },
  {
    id: 4,
    question: "What are the major enhancements introduced in SOCKSv5 compared to legacy SOCKSv4?",
    shortAnswer: "1. Support for UDP associate (UDP relay); 2. Support for IPv6 addresses and domain names (FQDN); 3. Standardized authentication framework (Username/Password, GSS-API); 4. Mutual TLS support.",
    explanation: "SOCKSv4 was strictly limited to IPv4 and TCP without authentication. SOCKSv5 allows streaming applications (VoIP, DNS over UDP) via UDP associate, resolves domain names on the proxy to prevent local DNS leakage, and mandates strong user authentication.",
    hint: "UDP support, IPv6/FQDN addressing, and strong authentication methods.",
    level: "Moderate",
    codeExample: `// SOCKSv5 Method Negotiation (Byte 1=0x05, Byte 2=NumMethods, Bytes 3+=Methods):
// Method 0x00 = No Authentication (Anonymous)
// Method 0x02 = Username / Password Authentication (RFC 1929)
// Method 0x01 = GSS-API (Kerberos Enterprise Authentication)`
  },
  {
    id: 5,
    question: "Why is a Circuit-Level Gateway faster and more lightweight than an Application-Level Gateway (Proxy / WAF)?",
    shortAnswer: "Once the circuit handshake is established, the circuit gateway executes raw memory buffer copies (`memcpy`) between socket descriptors without parsing, decoding, or inspecting Layer 7 application protocols.",
    explanation: "An Application Proxy must buffer full HTTP requests, decompress gzip streams, parse HTML/JSON schemas, and run complex regex engines to detect SQLi/XSS. A Circuit Gateway only monitors the Layer 5 session handshake and then blindly relays bytes, consuming minimal CPU.",
    hint: "Blind raw byte relaying between sockets without Layer 7 payload parsing.",
    level: "Basic",
    codeExample: `// Circuit Gateway Relaying Loop (Fast Raw Copy):
// while ((bytesRead = read(client_sock, buffer, 4096)) > 0) {
//     write(target_sock, buffer, bytesRead); // Direct byte relay!
// }`
  },
  {
    id: 6,
    question: "What is the primary security limitation and blind spot of a Circuit-Level Gateway?",
    shortAnswer: "It cannot inspect the contents of the data stream inside an established circuit, leaving systems vulnerable to application-layer attacks (SQLi, XSS) and malware payloads transmitted over permitted circuits.",
    explanation: "A Circuit Gateway only verifies 'Can User X open a TCP circuit to Port 443 on Server Y?'. Once the circuit is opened, if the user transmits an SQL injection exploit or downloads a ransomware binary, the circuit gateway blindly relays the malicious bytes without detecting the threat.",
    hint: "It validates who opens the pipe, but does not inspect what flows through the pipe.",
    level: "Moderate",
    codeExample: `// Blind Spot Illustration:
// Permitted Circuit: Client → SOCKS5 → Target:443
// Payload Transmitted: "GET /api?id=1' UNION SELECT * FROM passwords--"
// Circuit Gateway Action: RELAYED (Zero inspection of SQL query!)`
  },
  {
    id: 7,
    question: "What is the default TCP/UDP port number assigned to the SOCKS protocol by IANA?",
    shortAnswer: "Port 1080 (TCP and UDP).",
    explanation: "SOCKS proxy servers listen by default on TCP port 1080 for incoming circuit connection requests and handshake subnegotiations.",
    hint: "Standard proxy port 1080.",
    level: "Basic",
    codeExample: `// SOCKS5 Default Socket Binding:
// socket.bind(("0.0.0.0", 1080))`
  },
  {
    id: 8,
    question: "How do threat actors and advanced malware use SOCKS proxies for 'Lateral Pivoting' during an enterprise intrusion?",
    shortAnswer: "Adversaries install lightweight SOCKS proxy servers on compromised internal workstations, routing their external attack traffic through the compromised host to access segmented internal subnets.",
    explanation: "In tools like Cobalt Strike, Metasploit, or Chisel, attackers deploy a reverse SOCKS proxy (`socks4a` or `socks5`). The attacker's external laptop configures `proxychains`, routing all Nmap scans, RDP logins, and SMB exploits through the internal victim workstation, bypassing perimeter ingress firewall rules.",
    hint: "Turning a compromised computer into a jumping-off proxy to reach interior networks.",
    level: "Expert",
    codeExample: `// Adversary SOCKS Pivoting (proxychains.conf):
// [ProxyList]
// socks5 198.51.100.25 1080 (Compromised internal host in Barrackpore)
// Attacker runs: proxychains nmap -sT -Pn 10.10.4.50 (Scans internal database!)`
  },
  {
    id: 9,
    question: "What is 'SOCKSv5 UDP Associate' and how does it establish a relay for connectionless UDP streams?",
    shortAnswer: "The client requests a UDP association via a TCP control connection; the proxy opens a UDP socket and relays UDP packets encapsulated with a SOCKS header containing the destination IP and port.",
    explanation: "Because UDP has no 3-way handshake, SOCKSv5 uses the existing TCP control channel to negotiate a UDP relay port. When the client sends UDP datagrams to the proxy's UDP port, it prepends a 10-byte SOCKS header specifying the real destination, allowing VoIP (SIP/RTP) and DNS to traverse the proxy.",
    hint: "Using a TCP control channel to coordinate a secondary UDP packet relay socket.",
    level: "Expert",
    codeExample: `// SOCKS5 UDP Request (CMD = 0x03 UDP ASSOCIATE):
// Client → Proxy (TCP 1080): VER=5, CMD=3, RSV=0, ATYP=1, Client_IP, Client_Port
// Proxy → Client: VER=5, REP=0, RSV=0, ATYP=1, Relay_UDP_IP, Relay_UDP_Port`
  },
  {
    id: 10,
    question: "How does a Circuit-Level Gateway prevent 'Internal IP Address Disclosure' to external Internet servers?",
    shortAnswer: "The external server establishes a TCP handshake exclusively with the Circuit Gateway; all IP headers received by the external server contain only the Gateway's public IP address.",
    explanation: "Because the gateway terminates the client's TCP connection and creates an entirely new socket connection for the destination server, the client's internal private IP (e.g. 10.10.1.50) is never transmitted in IP packets across the WAN, providing complete internal topology concealment.",
    hint: "The external server only ever sees the gateway's IP address on the wire.",
    level: "Basic",
    codeExample: `// Topology Concealment:
// Internal Client (10.10.1.50) → [Circuit Gateway (203.0.113.10)] → External Server (140.82.121.4)
// External Server sees: Src IP = 203.0.113.10 (Gateway IP only!)`
  },
  {
    id: 11,
    question: "What is 'SOCKS5 Remote DNS Resolution' and why is it essential for preventing DNS leakage?",
    shortAnswer: "The client passes the target hostname (FQDN) directly to the SOCKS5 proxy using Address Type 0x03, allowing the proxy to perform the DNS lookup and preventing local network eavesdroppers from seeing target domains.",
    explanation: "If a client resolves `target-bank.com` locally before connecting to a proxy, local network sniffers see the plaintext DNS lookup (DNS Leak). In SOCKSv5, the client sends `ATYP = 0x03 (Domain Name)`; the proxy resolves the domain over its secure outbound connection, ensuring complete privacy.",
    hint: "Letting the proxy look up the domain name so local listeners cannot see what website you are visiting.",
    level: "Moderate",
    codeExample: `// SOCKS5 Domain Request Header:
// [VER: 0x05] [CMD: 0x01] [RSV: 0x00] [ATYP: 0x03 (Domain)] [Len: 15] ["target-bank.com"] [Port: 443]`
  },
  {
    id: 12,
    question: "What is the difference between SOCKS Authentication Method `0x00` and Method `0x02`?",
    shortAnswer: "Method `0x00` requires NO authentication (anonymous open proxy); Method `0x02` requires Username and Password subnegotiation (RFC 1929).",
    explanation: "In enterprise environments, anonymous SOCKS proxies (`0x00`) are dangerous open relays. Modern enterprise circuit gateways mandate Method `0x02` or `0x01` (GSS-API / Kerberos), verifying user identity against Active Directory or LDAP before opening outbound circuits.",
    hint: "0x00 is open/anonymous; 0x02 requires username and password.",
    level: "Basic",
    codeExample: `// SOCKS5 Authentication Methods:
// 0x00: NO_AUTH (Anonymous access permitted)
// 0x02: USERNAME_PASSWORD (RFC 1929 credential verification)`
  },
  {
    id: 13,
    question: "How does a Circuit-Level Gateway handle TCP session termination when a client sends a FIN or RST packet?",
    shortAnswer: "The gateway intercepts the FIN/RST packet, forwards a corresponding FIN/RST on the secondary circuit to the target server, waits for teardown acknowledgments, and closes both socket descriptors.",
    explanation: "When either endpoint terminates the connection, the gateway ensures symmetrical session closure: it flushes any remaining buffered bytes, transmits the FIN sequence across the paired circuit, and deallocates memory descriptors to prevent socket leaks.",
    hint: "Symmetrically closing both paired socket circuits and freeing memory.",
    level: "Moderate",
    codeExample: `// Circuit Teardown Sequence:
// Client sends FIN → Gateway forwards FIN to Server → Server replies ACK/FIN → Gateway closes both sockets!`
  },
  {
    id: 14,
    question: "Why does a Circuit-Level Gateway require 'SOCKS-Aware / SOCKSified' client software or a wrapper library?",
    shortAnswer: "Standard applications make direct OS `connect()` socket calls; to use a circuit gateway, the client must implement the SOCKS protocol handshake or use dynamic hook wrappers (e.g. `tsocks` / `proxychains`).",
    explanation: "Unlike transparent firewalls that intercept packets invisibly at the IP layer, a SOCKS circuit gateway requires the client application to speak the SOCKS5 greeting protocol. Tools like `proxychains` hook into standard C library `connect()` syscalls to automatically inject SOCKS5 negotiation.",
    hint: "Applications must speak the SOCKS handshake protocol or use a wrapper library.",
    level: "Moderate",
    codeExample: `// Linux Proxychains Wrapper Hook:
// proxychains curl https://api.bank.com # Intercepts libc connect() and injects SOCKS5 greeting!`
  },
  {
    id: 15,
    question: "What is the memory footprint of an active circuit in a multi-threaded Circuit-Level Gateway?",
    shortAnswer: "Approximately 8 KB to 32 KB per active circuit, consisting of two socket file descriptors, kernel socket receive/transmit buffers, and session metadata structures.",
    explanation: "Because circuit gateways do not buffer full application documents or maintain deep AST trees, memory overhead is minimal. A gateway with 2 GB of RAM can easily support over 100,000 concurrent active circuits using asynchronous I/O (`epoll` or `kqueue`).",
    hint: "Low memory overhead (~8-32 KB per socket pair), supporting tens of thousands of connections.",
    level: "Expert",
    codeExample: `// Circuit Memory Calculation:
// Buffer Size: 2 sockets x (8 KB Rx + 8 KB Tx) = ~32 KB per circuit
// 50,000 Active Circuits = ~1.6 GB RAM`
  },
  {
    id: 16,
    question: "How does a Circuit-Level Gateway differ from a Stateful Packet Inspection (SPI) Firewall at Layer 4?",
    shortAnswer: "An SPI firewall inspects packets in transit without breaking the end-to-end TCP connection, whereas a Circuit-Level Gateway terminates and splits the TCP connection into two distinct socket sessions.",
    explanation: "In an SPI firewall, client and server directly negotiate TCP Sequence/ACK numbers and TCP options (Window Scaling, SACK). In a Circuit-Level Gateway, client and server have completely independent sequence numbers managed by the gateway's two separate sockets.",
    hint: "SPI inspects packets in flight; Circuit Gateway terminates the TCP connection and opens a new one.",
    level: "Expert",
    codeExample: `// SPI vs Circuit Gateway Connection State:
// SPI Firewall    : Client <======== One End-to-End TCP Session (Inspected in Flight) ========> Server
// Circuit Gateway : Client <== TCP Session 1 ==> [GATEWAY] <== TCP Session 2 ==> Server`
  },
  {
    id: 17,
    question: "What is 'SOCKS-over-TLS' (Secure SOCKS) and how does it protect circuit communication over public Wi-Fi?",
    shortAnswer: "Wrapping the entire SOCKS5 control and data channel inside an encrypted TLS tunnel (e.g. port 443), preventing local eavesdroppers from inspecting SOCKS authentication credentials or session metadata.",
    explanation: "Standard SOCKS5 transmits usernames and passwords in plaintext (RFC 1929). Secure SOCKS encapsulates the connection inside TLS 1.3 with mutual certificate verification, ensuring total encryption between the client and the enterprise circuit gateway.",
    hint: "Encrypting the SOCKS proxy connection inside a TLS tunnel.",
    level: "Moderate",
    codeExample: `// SOCKS-over-TLS Tunnel:
// Client Workstation --- [Encrypted TLS 1.3 Tunnel (Port 443)] ---> Enterprise Circuit Gateway`
  },
  {
    id: 18,
    question: "Why is a Circuit-Level Gateway an ideal choice for proxying proprietary or custom non-HTTP TCP protocols?",
    shortAnswer: "Because it operates at Layer 5 without requiring knowledge of the application protocol's syntax or commands, allowing custom financial, IoT, or industrial SCADA streams to be proxied seamlessly.",
    explanation: "Application firewalls (WAFs) require dedicated decoders for HTTP, SMTP, or SQL. If an enterprise in Kolkata or Barrackpore uses a custom proprietary TCP banking protocol, an application proxy would fail to parse it. A circuit gateway verifies the TCP handshake and proxies the custom bytes transparently.",
    hint: "Protocol-agnostic: if it runs over TCP or UDP, the circuit gateway can proxy it.",
    level: "Basic",
    codeExample: `// Custom Protocol Support:
// Custom SCADA / Financial TCP Protocol (Port 9999) → SOCKS5 Gateway proxies data with zero parser errors!`
  },
  {
    id: 19,
    question: "What is an 'Open SOCKS Proxy' and why does it present a severe cybersecurity threat to enterprise networks?",
    shortAnswer: "A misconfigured SOCKS proxy that permits anonymous connections from the public Internet, allowing cybercriminals to route illegal attacks, spam, and botnet traffic through the organization's IP address.",
    explanation: "If an enterprise accidentally exposes port 1080 to the WAN with authentication disabled (`0x00`), attackers use the proxy to launch cyber attacks. Law enforcement traces the attacks back to the victim company's IP, causing severe legal and reputational damage under Section 66 of the IT Act.",
    hint: "An unauthenticated proxy that anyone on the Internet can abuse to hide their criminal activities.",
    level: "Moderate",
    codeExample: `// Dangerous Open Proxy Configuration:
// SOCKS Server listening on 0.0.0.0:1080 with Auth Method: NO_AUTHENTICATION (Open Relay!)`
  },
  {
    id: 20,
    question: "How does GSS-API authentication in SOCKSv5 integrate with enterprise Microsoft Active Directory / Kerberos environments?",
    shortAnswer: "SOCKSv5 Method 0x01 negotiates Kerberos service tickets via GSS-API, allowing domain-joined corporate workstations to authenticate to the circuit gateway seamlessly via Single Sign-On (SSO).",
    explanation: "When an employee in an enterprise domain launches an application, the client sends a Kerberos ticket to the SOCKS5 gateway. The gateway validates the ticket with the Domain Controller, enforcing Group Policy permissions before establishing outbound circuits.",
    hint: "Kerberos ticket-based enterprise Single Sign-On authentication for SOCKS proxies.",
    level: "Expert",
    codeExample: `// SOCKSv5 GSS-API Authentication:
// Client requests Method 0x01 → Exchanges Kerberos AP_REQ ticket → Gateway verifies with KDC!`
  },
  {
    id: 21,
    question: "What is 'Chained SOCKS Proxying' and why is it used in privacy-enhancing networks like Tor?",
    shortAnswer: "Routing traffic sequentially through multiple SOCKS proxies (Proxy A → Proxy B → Proxy C), ensuring that no single proxy knows both the client's identity and the destination server.",
    explanation: "In multi-hop proxy chains, the client connects to Proxy 1, asks it to connect to Proxy 2, which connects to Proxy 3, which finally connects to the destination. Proxy 1 knows the client but not the destination; Proxy 3 knows the destination but not the client.",
    hint: "Passing traffic through a chain of multiple proxies so no single node knows the full path.",
    level: "Moderate",
    codeExample: `// Multi-Hop Proxy Chaining:
// Client ---> [SOCKS Proxy 1] ---> [SOCKS Proxy 2] ---> [SOCKS Proxy 3] ---> Destination Target`
  },
  {
    id: 22,
    question: "What happens if a Circuit-Level Gateway experiences socket descriptor exhaustion during a high-concurrency event?",
    shortAnswer: "The gateway fails to open new client or server sockets, throwing 'Too many open files' (`EMFILE`), rejecting new handshake requests while maintaining existing active circuits.",
    explanation: "Operating systems enforce limits on open file descriptors per process (`ulimit -n`). In high-concurrency environments, administrators must tune OS kernel limits (e.g. `ulimit -n 1000000`) and configure asynchronous event loops (`epoll`) to handle high connection volumes.",
    hint: "Process runs out of available file descriptors, blocking new connection requests.",
    level: "Expert",
    codeExample: `// Linux Socket Descriptor Tuning:
// sudo sysctl -w fs.file-max=2097152
// ulimit -n 1048576`
  },
  {
    id: 23,
    question: "How does a Circuit-Level Gateway defend against SYN Flood attacks aimed at internal servers?",
    shortAnswer: "The gateway absorbs and terminates the TCP SYN handshake locally; the secondary handshake to the internal server is never initiated unless the external client completes the full 3-way handshake.",
    explanation: "Because the gateway splits the circuit, spoofed SYN floods from external botnets are stopped at the gateway's socket layer (which can enforce TCP SYN Cookies). The internal protected server never receives a single incomplete SYN packet.",
    hint: "The gateway absorbs the handshake; incomplete SYN handshakes never reach the internal server.",
    level: "Moderate",
    codeExample: `// Handshake Shielding:
// Attacker sends SYN flood → Circuit Gateway absorbs SYN → No handshake completed → Internal Server protected!`
  },
  {
    id: 24,
    question: "What is 'Transparent Circuit Proxying' and how does it eliminate manual SOCKS client configuration?",
    shortAnswer: "Using firewall redirection rules (e.g. `iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 1080`) to automatically intercept outbound traffic and pass it to the circuit gateway.",
    explanation: "Instead of configuring proxy settings in every browser or application, network routers automatically redirect outbound TCP flows to the circuit gateway. The gateway uses the `SO_ORIGINAL_DST` socket option to discover the real destination IP and establish Circuit 2.",
    hint: "Firewall intercepts traffic automatically without needing proxy settings on client computers.",
    level: "Expert",
    codeExample: `// iptables Transparent Proxy Redirection:
// iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-ports 1080`
  },
  {
    id: 25,
    question: "Why should an enterprise circuit gateway enforce strict Egress IP Access Control Lists on its outbound sockets?",
    shortAnswer: "To prevent authenticated users or compromised workstations from using the circuit gateway to connect to forbidden destination IP subnets, darknet nodes, or unauthorized cloud storage.",
    explanation: "Even with user authentication, an employee might use the SOCKS proxy to access unauthorized external destinations. Enterprise circuit gateways enforce egress policies: permitting outbound circuits only to approved partner APIs or business subnets.",
    hint: "Restricting which external destination IPs users are permitted to open circuits to.",
    level: "Moderate",
    codeExample: `// SOCKS Gateway Egress Whitelist:
// ALLOW: Authenticated_Users → Destination: 203.0.113.0/24 (Banking Partner API)
// DROP : Authenticated_Users → Destination: ANY (Prevents unauthorized proxy tunneling)`
  },
  {
    id: 26,
    question: "How does SOCKSv5 handle IPv6 communication in modern dual-stack enterprise environments?",
    shortAnswer: "Address Type `0x04` indicates a 16-byte IPv6 destination address, allowing clients on an IPv4-only local network to access external IPv6 services through a dual-stack SOCKS5 gateway.",
    explanation: "SOCKSv5 bridges IPv4 and IPv6 networks seamlessly. A legacy internal client with an IPv4 address (`10.10.1.50`) requests connection to an external IPv6 destination (`2001:db8::1`) via `ATYP = 0x04`; the dual-stack gateway establishes an IPv6 socket to the destination.",
    hint: "Address Type 0x04 specifies a 16-byte IPv6 destination address.",
    level: "Moderate",
    codeExample: `// SOCKS5 IPv6 Request Header:
// [VER: 0x05] [CMD: 0x01] [RSV: 0x00] [ATYP: 0x04 (IPv6)] [16-Byte IPv6 Address] [2-Byte Port]`
  },
  {
    id: 27,
    question: "What logging telemetry must a SOCKS5 Circuit Gateway generate for CERT-In forensic compliance?",
    shortAnswer: "Client Source IP/Port, Authenticated Username, Destination IP/Port, Requested Domain, Timestamp (NPL NTP), Session Duration, Ingress/Egress Byte Counts, and Termination Status.",
    explanation: "Under CERT-In directives, proxy and gateway telemetry must be preserved for 180 days. Recording authenticated usernames and domain names allows forensic investigators to trace unauthorized data exfiltration or malware beaconing directly to specific internal workstations.",
    hint: "Source IP, authenticated username, target domain/IP, timestamp, byte counts, and duration.",
    level: "Basic",
    codeExample: `// SOCKS5 Structured Audit Log Record:
const socksAuditLog = {
  timestamp: "2026-08-23T10:15:30.124Z",
  clientIp: "10.10.1.50",
  authUser: "teller_mamata",
  targetDestination: "api.rbi.org.in:443",
  bytesSent: 14520,
  bytesReceived: 89410,
  status: "TERMINATED_NORMAL"
};`
  },
  {
    id: 28,
    question: "What is the security risk of 'SOCKS5 Proxy Reflection' in internal micro-segmented networks?",
    shortAnswer: "An internal attacker uses the circuit gateway to reach restricted subnets (such as management VLANs) that the attacker's own desktop cannot reach directly, leveraging the gateway's broader network routing privileges.",
    explanation: "If the SOCKS gateway is dual-homed with access to both user VLANs and the server management subnet, a compromised user desktop can request a SOCKS circuit to `10.10.99.1:22` (Management Switch). If the gateway lacks egress ACLs, it opens the circuit, bypassing VLAN boundaries.",
    hint: "Using the proxy's network access to reach protected subnets you cannot access directly.",
    level: "Expert",
    codeExample: `// Proxy Reflection Vulnerability:
// Attacker PC (VLAN 10) ---> [SOCKS Gateway] ---> Management Switch (VLAN 99: Port 22)
// Fix: Gateway must enforce internal egress ACLs blocking user circuits to management VLANs!`
  },
  {
    id: 29,
    question: "How does a Circuit-Level Gateway compare with a Network Address Translation (NAT) router?",
    shortAnswer: "NAT operates statelessly or statefully at Layer 3/4 by rewriting packet headers on the fly, whereas a Circuit Gateway operates at Layer 5 by terminating TCP handshakes and using separate user-space socket buffers.",
    explanation: "NAT forwards original client packets with modified IP/port headers; TCP sequence numbers and flags pass directly between client and server. A Circuit Gateway uses two completely independent socket streams, with zero packet-level connection between the two networks.",
    hint: "NAT modifies packet headers in transit; Circuit Gateway terminates the TCP stream and opens a new socket.",
    level: "Moderate",
    codeExample: `// NAT vs Circuit Gateway:
// NAT Router      : Modifies IP/Port header on the wire; single TCP stream end-to-end
// Circuit Gateway : Two independent TCP streams; copies application bytes between sockets`
  },
  {
    id: 30,
    question: "Synthesize the role of Circuit-Level Gateways in modern enterprise Defense-in-Depth architectures.",
    shortAnswer: "Circuit-Level Gateways provide high-speed, protocol-agnostic Layer 5 session mediation and topology hiding, acting as a secure intermediary for non-HTTP traffic while leaving Layer 7 deep payload inspection to WAFs and IPS engines.",
    explanation: "By decoupling client and server TCP handshakes and enforcing strong user authentication, SOCKS5 circuit gateways conceal internal network structure and protect endpoints from direct probing, forming a vital session-layer pillar in enterprise perimeter security.",
    hint: "Layer 5 handshake validation + Network topology concealment + Protocol-agnostic relaying.",
    level: "Moderate",
    codeExample: `// The Circuit Gateway Security Formula:
// Resilient Security = [Dual Handshake Validation] + [SOCKS5 Authentication] + [Topology Concealment] + [Layer 7 WAF for Payloads]`
  }
];

export default questions;
