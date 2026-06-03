// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What are the three private IP address ranges defined in RFC 1918?",
    shortAnswer: "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.",
    explanation: "These ranges are reserved for private networks. They are not routable on the public internet. NAT is used to translate them to public IPs.",
    hint: "Remember: 10.0.0.0/8, 172.16.0.0/12 (16-31), 192.168.0.0/16.",
    level: "basic",
    codeExample: "ip addr show | grep -E '10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.'  # show private IPs"
  },
  {
    question: "What is the main difference between static NAT and PAT?",
    shortAnswer: "Static NAT maps one private IP to one public IP (1:1). PAT maps many private IPs to one public IP using ports.",
    explanation: "Static NAT is used for servers that need consistent inbound access. PAT (Port Address Translation) conserves public IPs for many clients, using unique source ports to demultiplex replies.",
    hint: "Static = fixed; PAT = shared.",
    level: "basic",
    codeExample: "ip nat inside source static 192.168.1.10 203.0.113.5  # static\nip nat inside source list 1 interface eth0 overload  # PAT"
  },
  {
    question: "What is the ICMP type for Echo Request?",
    shortAnswer: "Type 8, Code 0.",
    explanation: "Echo Request (ping) is ICMP type 8. The reply is Echo Reply (type 0). A common firewall rule allows type 8 outbound and type 0 inbound.",
    hint: "8 = ask, 0 = answer.",
    level: "basic",
    codeExample: "tcpdump -i eth0 icmp and icmp[0]==8  # capture Echo Requests"
  },
  {
    question: "Why does NAT break certain protocols like FTP?",
    shortAnswer: "Some protocols embed IP addresses inside the payload (e.g., FTP PORT command). NAT doesn't rewrite those embedded addresses.",
    explanation: "FTP in active mode sends the client's IP address and port inside the control connection. A NAT router changes the packet's source IP but not the payload. Application Layer Gateways (ALGs) are needed to fix this.",
    hint: "Protocols that carry IP addresses in data need special NAT helpers.",
    level: "intermediate",
    codeExample: "# On Cisco: ip nat service ftp  # enable FTP ALG"
  },
  {
    question: "What is the purpose of `traceroute` and how does it use ICMP?",
    shortAnswer: "Traceroute discovers the route packets take. It sends packets with increasing TTL and catches ICMP Time Exceeded messages.",
    explanation: "First packet TTL=1 → first router decrements to 0, discards and sends ICMP Time Exceeded (type 11) back, revealing router's IP. Then TTL=2, etc. Destination sends Echo Reply when TTL large enough.",
    hint: "TTL trick: force routers to report themselves.",
    level: "intermediate",
    codeExample: "traceroute -I 8.8.8.8  # use ICMP probes (default often UDP)"
  },
  {
    question: "What is NAT hairpinning (NAT loopback)?",
    shortAnswer: "Allowing an internal host to reach another internal host via the public IP of the NAT router.",
    explanation: "Without hairpinning, a packet from internal host A to public IP (which maps to internal host B) would loop. Hairpinning reflects it back inside. Useful for internal users accessing a server by its domain name.",
    hint: "Internal -> public IP -> internal.",
    level: "advanced",
    codeExample: "# On Linux: sysctl -w net.ipv4.conf.all.route_localnet=1\n iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -d 203.0.113.5 -j SNAT --to-source 192.168.1.1"
  },
  {
    question: "What is the ICMP 'Packet Too Big' message (type 3 code 4) used for?",
    shortAnswer: "To signal that a packet exceeds the MTU of a link; part of Path MTU Discovery (PMTUD).",
    explanation: "When a router receives an IPv6 packet larger than the next-hop link's MTU, it sends this ICMPv6 message. The source then reduces packet size. Blocking this breaks PMTUD and causes connections to hang.",
    hint: "Don't block this ICMP type.",
    level: "advanced",
    codeExample: "iptables -A INPUT -p icmp --icmp-type fragmentation-needed -j ACCEPT  # allow"
  },
  {
    question: "What is the maximum number of simultaneous TCP sessions PAT can handle per public IP?",
    shortAnswer: "Approximately 65,535 (based on 16-bit port range) minus reserved ports (~1024).",
    explanation: "PAT uses source port numbers to differentiate sessions. Theoretically up to 65,535 per public IP. In practice, operating systems limit ephemeral ports (~28,000 to 65,000). For large networks, use multiple public IPs.",
    hint: "Ports are 0-65535, but many are reserved.",
    level: "intermediate",
    codeExample: "sysctl net.ipv4.ip_local_port_range  # shows ephemeral port range"
  },
  {
    question: "What command shows NAT translations on a Cisco router?",
    shortAnswer: "`show ip nat translations`",
    explanation: "Displays active NAT entries: inside global, inside local, outside local, outside global. `clear ip nat translation *` clears all.",
    hint: "Also `debug ip nat` for real-time.",
    level: "basic",
    codeExample: "show ip nat translations | include 192.168.1"
  },
  {
    question: "What is the difference between ICMP and ping?",
    shortAnswer: "ICMP is the protocol; ping is an application that uses ICMP Echo messages.",
    explanation: "ICMP is a network-layer protocol (IP protocol 1). Ping sends an ICMP Echo Request and waits for an Echo Reply. Other tools (traceroute, pathping) also use ICMP.",
    hint: "Ping = car, ICMP = road network.",
    level: "basic",
    codeExample: "ping -c 1 google.com  # sends ICMP type 8"
  },
  {
    question: "What is 'NAT64'?",
    shortAnswer: "A mechanism that allows IPv6-only clients to communicate with IPv4-only servers by translating addresses.",
    explanation: "NAT64 translates IPv6 addresses to IPv4 and vice versa, often combined with DNS64 which synthesizes AAAA records from A records. Used in IPv6 transition.",
    hint: "IPv6 side → NAT64 → IPv4 side.",
    level: "advanced",
    codeExample: "# On Linux with Jool: jool instance add --netfilter --pool6 64:ff9b::/96"
  },
  {
    question: "Why does `ping 127.0.0.1` work even without a network cable?",
    shortAnswer: "The loopback address is a virtual interface internal to the OS; it never leaves the host.",
    explanation: "It tests the TCP/IP stack of the local machine. No hardware or NAT is involved. The equivalent for IPv6 is `ping6 ::1`.",
    hint: "Loopback = 'ping yourself'.",
    level: "basic",
    codeExample: "ping -c 2 127.0.0.1"
  },
  {
    question: "What is a common reason for 'Destination Host Unreachable' ICMP message?",
    shortAnswer: "The router has no route to the destination network, or ARP resolution failed.",
    explanation: "Code 1 (host unreachable) often appears when the next-hop router cannot resolve the MAC address of the destination or the destination is down. Also caused by wrong subnet mask.",
    hint: "Check routing table and subnetting.",
    level: "basic",
    codeExample: "ping 192.168.99.99  # if no route, you'll see unreachable"
  },
  {
    question: "How does NAT affect IPSec (VPN) traffic?",
    shortAnswer: "NAT breaks IPSec AH and ESP because it modifies IP headers and checksums. NAT-Traversal (NAT-T) encapsulates ESP in UDP port 4500 to overcome this.",
    explanation: "AH authenticates the entire IP header, so NAT rewriting invalidates it. ESP has no ports, so NAT can't demultiplex. NAT-T wraps ESP in UDP, which NAT can handle. Many VPNs use it.",
    hint: "NAT-T = ESP in UDP envelope.",
    level: "advanced",
    codeExample: "# In strongSwan: nat-traversal=yes"
  },
  {
    question: "What is the ICMP 'Redirect' message?",
    shortAnswer: "A router tells a host that a better gateway exists for a specific destination.",
    explanation: "When a host sends a packet to a router but the router knows a more direct route (same subnet), it sends an ICMP Redirect (type 5). The host then updates its routing table. Disabled in secure environments.",
    hint: "Router says: 'use that other router instead of me'.",
    level: "advanced",
    codeExample: "sysctl -w net.ipv4.conf.all.send_redirects=0  # disable sending redirects"
  },
  {
    question: "What is the 'inside global' address in NAT terminology?",
    shortAnswer: "The public IP address of a private host as seen from the outside (internet side).",
    explanation: "Inside local = private IP of the host. Inside global = translated public IP. Outside local = destination IP as seen from inside. Outside global = destination public IP.",
    hint: "Inside global = 'the outside view of inside host'.",
    level: "basic",
    codeExample: "show ip nat translations  # columns: Inside Global, Inside Local"
  },
  {
    question: "Can you run NAT and IPv6 together?",
    shortAnswer: "Yes, but NAT is not needed for address conservation (IPv6 has abundant addresses). However NAT66 exists for unusual cases (e.g., provider renumbering).",
    explanation: "IPv6 was designed to restore end-to-end connectivity. NAT66 may be used for traffic engineering or security but is strongly discouraged. Most organizations use IPv6 globally without NAT.",
    hint: "IPv6 = no shortage, so no NAT needed.",
    level: "intermediate",
    codeExample: "# Uncommon but possible: ip6tables -t nat -A POSTROUTING -j MASQUERADE"
  },
  {
    question: "What does 'TTL expired in transit' ICMP message indicate?",
    shortAnswer: "The packet's TTL reached zero before reaching destination; typically seen in traceroute.",
    explanation: "Each router decrements TTL. When TTL becomes zero, the router discards the packet and sends ICMP Time Exceeded (type 11). Traceroute uses this to discover each hop.",
    hint: "Too many hops or loop?",
    level: "basic",
    codeExample: "traceroute -m 5 8.8.8.8  # limit max hops to 5"
  },
  {
    question: "What is the difference between NAT overload (PAT) and dynamic NAT?",
    shortAnswer: "PAT uses one public IP with many ports; dynamic NAT uses a pool of public IPs and a 1:1 mapping per session.",
    explanation: "Dynamic NAT: a private host grabs a public IP from a pool, and that IP is used for the whole session (no port multiplexing). When pool exhausted, no new connections. PAT is much more efficient.",
    hint: "PAT = many-to-one, dynamic NAT = many-to-many.",
    level: "intermediate",
    codeExample: "ip nat pool PUBLIC 203.0.113.10 203.0.113.20 netmask 255.255.255.0\nip nat inside source list 1 pool PUBLIC  # dynamic NAT"
  },
  {
    question: "What is the purpose of ICMP 'Parameter Problem' (type 12)?",
    shortAnswer: "Indicates a problem with the IPv4 or IPv6 header (e.g., invalid option).",
    explanation: "When a router or host encounters a malformed packet (e.g., unrecognized option, bad pointer), it can send this message. Helps debugging but often rate‑limited.",
    hint: "Packet header invalid.",
    level: "expert",
    codeExample: "# Rare, but captures can show it when mangle rules misconfigured"
  },
  {
    question: "What is the difference between SNAT and DNAT in iptables?",
    shortAnswer: "SNAT changes source IP (for outbound); DNAT changes destination IP (for inbound port forwarding).",
    explanation: "SNAT (Source NAT) is used for client access to internet – replaces private source with public. DNAT (Destination NAT) redirects traffic from a public IP/port to an internal server – e.g., port forwarding.",
    hint: "SNAT = hide clients, DNAT = expose servers.",
    level: "intermediate",
    codeExample: "iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -j SNAT --to-source 203.0.113.10\niptables -t nat -A PREROUTING -d 203.0.113.10 -p tcp --dport 80 -j DNAT --to-destination 192.168.1.100:80"
  },
  {
    question: "What is the 'ping of death' attack?",
    shortAnswer: "Sending an oversized ICMP Echo Request ( >65535 bytes) that crashes older systems.",
    explanation: "Vulnerable systems would crash when reassembling the fragmented oversized packet. Modern OSes are patched. The attack is obsolete but teaches about fragmentation.",
    hint: "Too large ping = crash.",
    level: "advanced",
    codeExample: "# Do not attempt: ping -l 65500 target (Windows)"
  },
  {
    question: "What is the role of 'ALG' (Application Layer Gateway) in NAT?",
    shortAnswer: "ALGs inspect and modify application‑layer payloads to make protocols work through NAT (e.g., FTP, SIP).",
    explanation: "Some protocols put IP addresses/ports inside the payload. ALGs rewrite those fields dynamically. For FTP, the ALG monitors PORT/PASV commands and adjusts the embedded addresses.",
    hint: "NAT helper for specific protocols.",
    level: "expert",
    codeExample: "modprobe nf_nat_ftp  # Linux FTP ALG module"
  },
  {
    question: "What is the default ICMP rate limiting on Linux?",
    shortAnswer: "ICMP error messages are rate-limited to 4 per second by default (net.ipv4.icmp_ratelimit).",
    explanation: "To avoid flooding, the kernel limits how many ICMP error messages (dest unreachable, time exceeded, etc.) are sent. This can hide intermittent issues but prevents storms.",
    hint: "Check: sysctl net.ipv4.icmp_ratelimit",
    level: "intermediate",
    codeExample: "sysctl -w net.ipv4.icmp_ratelimit=100"
  },
  {
    question: "Why does NAT cause problems for VoIP (SIP)?",
    shortAnswer: "SIP messages carry IP addresses and ports in the SDP body. NAT changes the packet source IP but not the SIP payload, breaking media streams.",
    explanation: "Solutions: use SIP ALG, STUN/TURN, or session border controllers. SIP ALGs are often buggy; many recommend disabling them and using symmetric NAT with STUN.",
    hint: "SIP tells peer 'call me at 192.168.x.x' – peer can't reach.",
    level: "advanced",
    codeExample: "# Disable SIP ALG on many routers: (no) sip alg"
  },
  {
    question: "What is the difference between `ping` and `traceroute -I`?",
    shortAnswer: "Ping measures RTT to a destination; traceroute discovers each hop along the path using ICMP Time Exceeded.",
    explanation: "Ping sends Echo Request and expects Echo Reply. Traceroute manipulates TTL to get intermediate router responses. Both use ICMP, but traceroute uses type 11 responses.",
    hint: "Ping = destination; traceroute = every stop.",
    level: "basic",
    codeExample: "mtr -r 8.8.8.8  # combines ping and traceroute"
  },
  {
    question: "What is 'Cone NAT' vs 'Symmetric NAT'?",
    shortAnswer: "Cone NAT reuses the same port mapping for multiple external destinations; Symmetric NAT creates a new mapping per destination.",
    explanation: "Full‑cone: any external host can send to the mapped port. Restricted‑cone: external host must first receive traffic from internal host. Symmetric: each destination IP/port gets a new mapping, breaking many peer‑to‑peer applications.",
    hint: "Symmetric NAT = more secure but breaks P2P.",
    level: "expert",
    codeExample: "STUN tools like `stunclient` can detect NAT type"
  },
  {
    question: "How can you test if ICMP is blocked by a firewall?",
    shortAnswer: "Run `ping`; if it fails but other services work (e.g., `curl`) then ICMP may be blocked.",
    explanation: "Use `ping` with a known responsive host. If no reply, try `traceroute -I` to see where ICMP stops. Many cloud providers block ICMP by default.",
    hint: "ping fails? Check firewall rules.",
    level: "basic",
    codeExample: "ping -c 3 8.8.8.8 && echo 'ICMP allowed' || echo 'ICMP blocked or host down'"
  },
  {
    question: "What is the purpose of the 'ip nat inside source' command?",
    shortAnswer: "Defines which internal source IP addresses should be translated (matched by ACL or route-map) and how.",
    explanation: "It links an access list (identifies private IPs) to a pool or interface (public IP). For PAT, use `overload` keyword. This is the core NAT configuration on Cisco.",
    hint: "Inside source = translating internal addresses to external.",
    level: "intermediate",
    codeExample: "access-list 1 permit 192.168.1.0 0.0.0.255\nip nat inside source list 1 interface eth0 overload"
  },
  {
    question: "What is the difference between ICMP type 3 code 0 and code 1?",
    shortAnswer: "Code 0 = Network Unreachable; Code 1 = Host Unreachable.",
    explanation: "Network unreachable (code 0) means the router has no route to the destination network. Host unreachable (code 1) means the network exists but the specific host cannot be reached (e.g., ARP fails).",
    hint: "Network vs. specific host.",
    level: "intermediate",
    codeExample: "# Use 'ping' and monitor with tcpdump to see codes"
  },
  {
    question: "What is 'NAT injection' in the context of DNS?",
    shortAnswer: "NAT device intercepts DNS replies and modifies A records to point to its own public IP for internal servers.",
    explanation: "Some consumer routers implement 'DNS rebinding' prevention or 'NAT loopback' by altering DNS responses. This can allow internal users to use the public hostname to reach internal servers without hairpinning.",
    hint: "Router as a fake DNS proxy.",
    level: "expert",
    codeExample: "# On DD‑WRT: dnsmasq with --bind-interfaces --interface"
  }
];

export default questions;