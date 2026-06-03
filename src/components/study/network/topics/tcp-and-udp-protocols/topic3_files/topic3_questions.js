const questions = [
  {
    question: "What is a port number in computer networking?",
    shortAnswer: "A 16‑bit integer (0–65535) that identifies a specific process or service on a host.",
    explanation: "Port numbers allow multiple network applications to run on the same IP address by differentiating traffic.",
    hint: "Apartment numbers in a building – the building address is the IP, the apartment number is the port.",
    level: "basic",
    codeExample: "TCP socket: (source IP, source port, dest IP, dest port)"
  },
  {
    question: "What is the range of well‑known ports and give three examples?",
    shortAnswer: "0–1023. Examples: HTTP (80), HTTPS (443), SSH (22).",
    explanation: "These ports are assigned by IANA for common system services. Binding to them requires root/administrator privileges on most operating systems.",
    hint: "Ports below 1024 are 'reserved' – like VIP parking.",
    level: "basic",
    codeExample: "sudo node server.js – binds to port 80"
  },
  {
    question: "What are ephemeral (dynamic) ports used for?",
    shortAnswer: "Temporary client‑side ports assigned by the OS for outgoing connections.",
    explanation: "When a client connects to a server (e.g., web server on port 80), the OS picks a random high‑number port (49152–65535) for the client side. This makes the connection unique.",
    hint: "The return address on a letter – used only for that conversation.",
    level: "intermediate",
    codeExample: "netstat -tan | grep ESTABLISHED shows local port often > 50000"
  },
  {
    question: "What happens if two different processes try to bind to the same port and protocol?",
    shortAnswer: "The second bind fails with 'Address already in use' (EADDRINUSE).",
    explanation: "The socket is uniquely identified by (protocol, local IP, local port). Exception: SO_REUSEADDR allows reuse under certain conditions (e.g., different IPs).",
    hint: "Two families cannot live in the same apartment at the same address.",
    level: "basic",
    codeExample: "Error: listen EADDRINUSE: address already in use :::3000"
  },
  {
    question: "How does the OS demultiplex incoming packets to the correct process?",
    shortAnswer: "It uses the 4‑tuple (source IP, source port, dest IP, dest port) plus protocol (TCP/UDP).",
    explanation: "When a packet arrives, the kernel looks up the destination port and IP. If multiple sockets match, the most specific (connected) socket wins.",
    hint: "The mail carrier looks at both the apartment number and who sent the letter.",
    level: "advanced",
    codeExample: "ss -tan shows full 4‑tuple for each connection"
  },
  {
    question: "What is the difference between TCP port and UDP port?",
    shortAnswer: "They are separate namespaces. The same port number can be used simultaneously for TCP and UDP by different services.",
    explanation: "TCP port 53 (DNS) and UDP port 53 (DNS) are independent. A socket is defined by protocol + port.",
    hint: "Two separate mailboxes – one for letters (TCP) and one for postcards (UDP) with same number.",
    level: "intermediate",
    codeExample: "netstat -tulpn shows both TCP and UDP listeners"
  },
  {
    question: "What is the purpose of the `/etc/services` file (Linux/macOS)?",
    shortAnswer: "It maps human‑readable service names to port numbers and protocols.",
    explanation: "Used by tools like `netstat` and `lsof` to display names instead of numbers. Example: 'http' → 80/tcp.",
    hint: "A phonebook for common port numbers.",
    level: "basic",
    codeExample: "grep http /etc/services"
  },
  {
    question: "Why can't I bind to port 80 without sudo?",
    shortAnswer: "Ports 0–1023 are privileged; only root/administrator can bind to them for security reasons.",
    explanation: "If any user could run a service on port 80, they could impersonate a web server and intercept traffic.",
    hint: "Only the building manager can assign the main entrance door number.",
    level: "basic",
    codeExample: "sudo node server.js // works; node server.js // EACCES"
  },
  {
    question: "What is a 'port scanner' and what does it do?",
    shortAnswer: "A tool that probes a host for open ports (listening services) by sending connection attempts.",
    explanation: "Port scanners (e.g., Nmap) help network admins discover services and vulnerabilities. Illegal on networks without permission.",
    hint: "Knocking on every door to see if someone answers.",
    level: "intermediate",
    codeExample: "nmap -sS -p 1-1000 target.com"
  },
  {
    question: "What does 'localhost:8080' mean?",
    shortAnswer: "Connecting to IP 127.0.0.1 (loopback) on port 8080.",
    explanation: "localhost resolves to the local machine. Port 8080 is commonly used for development web servers (alternate HTTP).",
    hint: "Inside your own building, apartment 8080.",
    level: "basic",
    codeExample: "curl http://localhost:8080"
  },
  {
    question: "What is a 'socket' in relation to ports and IP?",
    shortAnswer: "A socket is the endpoint of a network connection, defined by (IP address, port number, protocol).",
    explanation: "A listening socket is bound to a local IP and port. A connected socket also has a remote IP and port.",
    hint: "The combination of building address, apartment number, and communication method.",
    level: "intermediate",
    codeExample: "int sockfd = socket(AF_INET, SOCK_STREAM, 0); bind(sockfd, ...);"
  },
  {
    question: "What is the maximum number of concurrent connections to a server listening on a single port?",
    shortAnswer: "Limited only by system resources (memory, file descriptors) and ephemeral port range on the client side.",
    explanation: "Each client uses a unique (client IP, client ephemeral port) pair. The server port stays the same. Practical limits: ~64k per client IP (due to 16‑bit ephemeral ports), but can exceed with multiple client IPs.",
    hint: "One post office (port 80) can serve millions of letters as long as each return address is unique.",
    level: "advanced",
    codeExample: "net.ipv4.ip_local_port_range = 32768 60999 → ~28k ports per client IP"
  },
  {
    question: "What is the difference between `SO_REUSEADDR` and `SO_REUSEPORT`?",
    shortAnswer: "`SO_REUSEADDR` allows binding to an address/port in TIME_WAIT; `SO_REUSEPORT` allows multiple sockets to bind to the exact same address/port for load balancing.",
    explanation: "`SO_REUSEADDR` is common for server restart. `SO_REUSEPORT` (Linux 3.9+) distributes incoming connections among processes.",
    hint: "Reusing a table after someone left vs. having multiple people sit at the same table.",
    level: "expert",
    codeExample: "setsockopt(fd, SOL_SOCKET, SO_REUSEPORT, &opt, sizeof(opt))"
  },
  {
    question: "What ports are typically blocked by corporate firewalls?",
    shortAnswer: "Many non‑standard ports are blocked, especially high ports and known malicious ports (e.g., 135, 445).",
    explanation: "Firewalls usually allow 80, 443, 53, 22, 25, 587, etc. They block ports used by P2P (6881-6889), IRC (6667), and backdoors (31337).",
    hint: "Some doors are welded shut for security.",
    level: "intermediate",
    codeExample: "iptables -A INPUT -p tcp --dport 6881:6889 -j DROP"
  },
  {
    question: "What is 'port forwarding' (NAT port forwarding)?",
    shortAnswer: "Mapping an external port on a router to an internal IP and port, allowing incoming connections to a host behind NAT.",
    explanation: "Used to run public servers (e.g., web server on port 80) from a home network with a private IP.",
    hint: "The receptionist redirects calls from the main number to the correct extension.",
    level: "intermediate",
    codeExample: "iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.10:80"
  },
  {
    question: "What is a 'port knocking' security technique?",
    shortAnswer: "A method where a firewall hides a service until a sequence of connection attempts to closed ports is received.",
    explanation: "The sequence (e.g., knock 1000, 2000, 3000) triggers a rule to open SSH port 22 for that IP. Reduces attack surface.",
    hint: "Secret knock before the door opens.",
    level: "expert",
    codeExample: "knockd daemon configuration"
  },
  {
    question: "Why do we need both source and destination ports in a packet?",
    shortAnswer: "Destination port directs the packet to the correct server process; source port allows the server to reply back to the correct client process.",
    explanation: "Together they form a full duplex channel. The server uses the source port from the request as the destination port in its reply.",
    hint: "To write back, you need the return address (source port) from the envelope.",
    level: "basic",
    codeExample: "TCP header: src port=54321, dst port=80"
  },
  {
    question: "What is a 'null port' (port 0) used for?",
    shortAnswer: "Port 0 is reserved and cannot be used for binding. In APIs, passing port 0 requests a dynamically assigned ephemeral port.",
    explanation: "When calling bind with port 0, the OS picks an available ephemeral port. Also used in some socket options.",
    hint: "Saying 'any available apartment' – the system will pick one.",
    level: "advanced",
    codeExample: "bind(sock, (addr, 0)) → OS assigns port"
  },
  {
    question: "How can I check which process is listening on a specific port in Linux?",
    shortAnswer: "Use `lsof -i :port`, `netstat -tulpn | grep port`, or `ss -tulpn | grep port`.",
    explanation: "These tools show PID and program name. Requires root to see all processes.",
    hint: "`sudo lsof -i :80` – find who is using port 80.",
    level: "basic",
    codeExample: "ss -tulpn | grep :8080"
  },
  {
    question: "What is the purpose of the `IP_BIND_ADDRESS_NO_PORT` socket option?",
    shortAnswer: "It tells the kernel not to reserve an ephemeral port when binding to an address, deferring assignment until connect/send.",
    explanation: "Useful for applications that bind to a specific source IP but want the OS to choose the ephemeral port later, reducing port exhaustion.",
    hint: "Reserving a building location but not the apartment number until you actually move in.",
    level: "expert",
    codeExample: "setsockopt(fd, IPPROTO_IP, IP_BIND_ADDRESS_NO_PORT, &v, sizeof(v))"
  },
  {
    question: "What is the difference between 'listening port' and 'established port'?",
    shortAnswer: "A listening port accepts incoming connections (server). An established port belongs to an active connection, with both local and remote addresses.",
    explanation: "Listening: `netstat -l`. Established: `netstat -t` shows connections where handshake completed.",
    hint: "An open door waiting for people vs. a door that is already in use.",
    level: "intermediate",
    codeExample: "ss -l (listening), ss -t (established)"
  },
  {
    question: "What are 'well‑known ports' besides 80 and 443?",
    shortAnswer: "FTP (21), SSH (22), Telnet (23), SMTP (25), DNS (53), DHCP (67/68), TFTP (69), HTTP (80), POP3 (110), NTP (123), IMAP (143), SNMP (161), HTTPS (443).",
    explanation: "These are standardized by IANA and used by common network services.",
    hint: "The most famous apartment numbers in the networking building.",
    level: "basic",
    codeExample: "grep -w '80/tcp' /etc/services"
  },
  {
    question: "What is a 'port conflict' and how to resolve it?",
    shortAnswer: "When two applications try to bind the same port+protocol. Resolve by changing one app's port or stopping the conflicting process.",
    explanation: "Example: already running a web server on 3000, then start another on same port → EADDRINUSE.",
    hint: "Two people trying to sit in the same seat.",
    level: "beginner",
    codeExample: "kill $(lsof -t -i:3000) # kill process using port"
  },
  {
    question: "How does NAT handle port mappings for UDP?",
    shortAnswer: "NAT creates a mapping (source IP:port → external IP:port) based on first outgoing UDP datagram, with a timeout (30–120s).",
    explanation: "The NAT uses the tuple (protocol, internal IP, internal port, external IP, external port). For UDP, the mapping is refreshed by any outbound packet.",
    hint: "The table entry expires if no traffic flows for a while.",
    level: "advanced",
    codeExample: "conntrack -L -p udp"
  },
  {
    question: "What is the maximum TCP ephemeral port range on Linux?",
    shortAnswer: "Default range is 32768–60999 (28232 ports). Can be adjusted via `/proc/sys/net/ipv4/ip_local_port_range`.",
    explanation: "This limits the number of outgoing connections from a single source IP (a single NAT box or host) to a specific destination IP and port.",
    hint: "The number of different return addresses the post office can assign.",
    level: "intermediate",
    codeExample: "sysctl net.ipv4.ip_local_port_range"
  },
  {
    question: "What does `:0` mean when binding a socket?",
    shortAnswer: "It tells the OS to automatically assign an ephemeral port.",
    explanation: "You pass port 0 to bind (e.g., in C or Python). The kernel selects a free port from the ephemeral range.",
    hint: "Leave the apartment number blank – the system will fill one in.",
    level: "intermediate",
    codeExample: "sock.bind(('0.0.0.0', 0))"
  },
  {
    question: "What is the difference between TCP port 0 and UDP port 0?",
    shortAnswer: "Both are reserved and cannot be used for listening. In both protocols, passing 0 as port requests dynamic assignment.",
    explanation: "No difference in meaning; they are separate namespaces but both service the same 'dynamic port request' function.",
    hint: "Two identical mail slots labeled '0' in different post offices.",
    level: "advanced",
    codeExample: "getaddrinfo(NULL, '0', &hints, &res) → dynamic port"
  },
  {
    question: "What is the IANA 'Registered Ports' range and typical usage?",
    shortAnswer: "Ports 1024–49151. Used for user applications and services that are not system critical (e.g., 3306 MySQL, 5432 PostgreSQL, 27017 MongoDB).",
    explanation: "IANA may officially assign these ports to specific applications, but they don't require special privileges.",
    hint: "The middle apartments – for businesses that aren't the main reception.",
    level: "basic",
    codeExample: "mysql defaults to port 3306"
  },
  {
    question: "How can a server handle more than 65535 simultaneous connections?",
    shortAnswer: "By having multiple client IP addresses or using different source ports on the server side. The limit is not 65535 per server overall.",
    explanation: "The server's listening port is fixed, but each connection is identified by the client's IP and ephemeral port. With many client IPs (e.g., internet), billions of connections are possible.",
    hint: "The same apartment can talk to millions of different people, each from their own unique address.",
    level: "expert",
    codeExample: "nginx can handle 1M+ concurrent connections with enough memory"
  },
  {
    question: "What is the significance of port 8080?",
    shortAnswer: "Common alternative HTTP port used for development, proxies, and Tomcat.",
    explanation: "Port 8080 is not officially registered (though IANA assigned it to HTTP‑alternate). It's widely used as a secondary web server port.",
    hint: "The 'backup' front door for web traffic.",
    level: "basic",
    codeExample: "python -m http.server 8080"
  }
];

export default questions;