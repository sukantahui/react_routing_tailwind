// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is the primary limitation of IPv4 that led to the development of IPv6?",
    shortAnswer: "IPv4 address exhaustion – only 4.3 billion unique addresses available.",
    explanation: "IPv4 uses 32-bit addresses, providing about 4.3 billion unique combinations. The explosive growth of internet-connected devices (smartphones, IoT, etc.) depleted available IPv4 address blocks in 2011 (IANA) and 2019 (RIPE NCC). IPv6 uses 128-bit addresses to solve this permanently.",
    hint: "Think about the total number of possible addresses each protocol offers.",
    level: "basic",
    codeExample: "// No code, but a command: `ip -4 addr` vs `ip -6 addr`"
  },
  {
    question: "Write an IPv6 address in its shortest compressed form: `2001:0db8:0000:0000:0000:8a2e:0370:7334`",
    shortAnswer: "2001:db8::8a2e:370:7334",
    explanation: "Leading zeros in each hextet can be removed. The longest consecutive block of zero hextets can be replaced by `::` (once). Here `0000:0000:0000` becomes `::`. The result is `2001:db8::8a2e:370:7334`.",
    hint: "Remove leading zeros and collapse the longest run of zero hextets.",
    level: "basic",
    codeExample: "// Example using Python's ipaddress library\nimport ipaddress; addr = ipaddress.IPv6Address('2001:0db8:0000:0000:0000:8a2e:0370:7334'); print(addr.compressed)"
  },
  {
    question: "What is the purpose of the loopback address in IPv4 and its equivalent in IPv6?",
    shortAnswer: "IPv4: 127.0.0.1 / IPv6: ::1 – both test local network stack.",
    explanation: "Loopback addresses allow a device to send packets to itself for testing and diagnostics. No network interface hardware is involved. In IPv4 it's `127.0.0.1` (any address in 127.0.0.0/8 works, but commonly `127.0.0.1`). In IPv6 it's `::1` (a single address).",
    hint: "Ping yourself – what IP do you use?",
    level: "basic",
    codeExample: "ping 127.0.0.1   # IPv4\nping6 ::1        # IPv6"
  },
  {
    question: "Explain the difference between `fe80::/10` addresses and global unicast IPv6 addresses.",
    shortAnswer: "`fe80::/10` are link-local addresses (scope limited to a single link). Global addresses are routable on the internet.",
    explanation: "Link-local addresses are automatically assigned to every IPv6-enabled interface and start with `fe80::`. They are used for neighbor discovery and local communication only, never routed. Global unicast addresses (2000::/3) are publicly routable, similar to IPv4 public addresses.",
    hint: "Think 'local street' vs 'global highway'.",
    level: "basic",
    codeExample: "ip -6 addr show | grep fe80  # Display link-local addresses"
  },
  {
    question: "What is SLAAC and how does it simplify IPv6 deployment?",
    shortAnswer: "Stateless Address Autoconfiguration – devices generate their own IPv6 address without a DHCP server.",
    explanation: "SLAAC uses the prefix announced by a router (via Router Advertisements) and combines it with the device's MAC address (or a random value) to create a unique IPv6 address. This eliminates the need for DHCP, though DHCPv6 can still be used for additional options (DNS servers).",
    hint: "Consider how a device can 'make up' its own address.",
    level: "intermediate",
    codeExample: "// On Linux, enable SLAAC:\nsysctl net.ipv6.conf.all.autoconf=1"
  },
  {
    question: "Why does IPv6 not have ARP (Address Resolution Protocol)?",
    shortAnswer: "ARP is replaced by Neighbor Discovery Protocol (NDP) using ICMPv6 messages.",
    explanation: "In IPv4, ARP broadcasts to resolve IP-to-MAC. IPv6 avoids broadcast altogether. Instead, NDP uses multicast and unicast ICMPv6 messages (Neighbor Solicitation, Neighbor Advertisement) to perform address resolution and other functions like duplicate address detection.",
    hint: "What is the problem with broadcast in large networks?",
    level: "intermediate",
    codeExample: "tcpdump -i eth0 icmp6 and 'ip6[40] == 135 or ip6[40] == 136'  # Capture NS/NA"
  },
  {
    question: "What is the IPv6 equivalent of IPv4's NAT (Network Address Translation)?",
    shortAnswer: "IPv6 strongly discourages NAT. The intended model is a global unique address per device.",
    explanation: "IPv6’s vast address space removes the need for NAT to conserve addresses. However, NAT66 exists in some implementations but is not standard. For privacy, IPv6 uses temporary addresses (RFC 4941) that change over time, not translation.",
    hint: "Do we still need to hide many devices behind one IP?",
    level: "intermediate",
    codeExample: "// Disable IPv6 privacy extensions (temporary addresses) on Linux\necho 0 > /proc/sys/net/ipv6/conf/all/use_tempaddr"
  },
  {
    question: "A student sees `169.254.15.32` on her laptop. What does this indicate? What is the IPv6 parallel?",
    shortAnswer: "IPv4: APIPA (Automatic Private IP Addressing) – DHCP failed. IPv6: link-local address `fe80::/10` (always present).",
    explanation: "When a DHCP client fails to get an IPv4 address, Windows (and others) auto-assigns an address from `169.254.0.0/16`. This allows local link communication. In IPv6, every interface automatically gets a link-local address (`fe80::/10`) regardless of DHCP, so there is no 'failure' state; however, global address assignment may still fail.",
    hint: "Check DHCP server status when you see 169.254.x.x.",
    level: "basic",
    codeExample: "ipconfig /all | findstr 169.254   # Windows\nip addr show | grep fe80               # Linux"
  },
  {
    question: "What is the MTU difference between IPv4 and IPv6? Why does that matter?",
    shortAnswer: "IPv6 requires minimum MTU of 1280 bytes (vs IPv4's 68). IPv6 routers never fragment packets.",
    explanation: "IPv4 routers can fragment packets if the next hop MTU is smaller. IPv6 removes router fragmentation – the source host must perform Path MTU Discovery (PMTUD). The minimum link MTU for IPv6 is 1280 bytes to ensure PMTUD works reliably.",
    hint: "Who is responsible for breaking packets into smaller pieces – the router or the sender?",
    level: "advanced",
    codeExample: "ping6 -c 3 -s 1450 google.com  # test with large packet (may require fragmentation)"
  },
  {
    question: "Describe the three main transition mechanisms from IPv4 to IPv6.",
    shortAnswer: "Dual Stack, Tunneling (6to4, Teredo), Translation (NAT64/DNS64).",
    explanation: "**Dual Stack**: Run IPv4 and IPv6 simultaneously. **Tunneling**: Encapsulate IPv6 packets inside IPv4 (e.g., 6in4, Teredo). **Translation**: Convert between protocols at the network layer (e.g., NAT64 maps IPv6 to IPv4). Each serves a different deployment scenario.",
    hint: "Think of coexisting languages: speak both, use an interpreter, or put one inside the other.",
    level: "intermediate",
    codeExample: "# Create a 6in4 tunnel (Linux)\nip tunnel add tun6in4 mode sit remote 192.0.2.1 local 192.0.2.2 ttl 255"
  },
  {
    question: "What is an IPv6 multicast address and how is it different from broadcast?",
    shortAnswer: "IPv6 uses multicast (one-to-many) instead of broadcast (one-to-all). Broadcast is eliminated.",
    explanation: "Multicast addresses start with `ff00::/8`. Devices subscribe to specific multicast groups. A packet sent to a multicast address is received only by members, not every host on the link. This reduces unnecessary traffic compared to IPv4 broadcast.",
    hint: "Why send data to everyone when only a few care?",
    level: "intermediate",
    codeExample: "# Join IPv6 multicast group (using socat)\nsocat - UDP6-DATAGRAM:ff02::1:2:12345,bind=:12345,ipv6-multicast-loop=1"
  },
  {
    question: "What is the network prefix in IPv6 address `2001:db8:1234:5678::abcd/64`?",
    shortAnswer: "2001:db8:1234:5678::/64",
    explanation: "The `/64` prefix length means the first 64 bits are the network part. The first four hextets represent those 64 bits: `2001:db8:1234:5678`. The rest (64 bits) are the interface identifier.",
    hint: "Count hextets: each hextet is 16 bits, so 4 hextets = 64 bits.",
    level: "basic",
    codeExample: "// Python calculation\nfrom ipaddress import IPv6Network; net = IPv6Network('2001:db8:1234:5678::abcd/64'); print(net.network_address)"
  },
  {
    question: "What is EUI-64 and why is it used in IPv6?",
    shortAnswer: "A method to derive a 64-bit interface identifier from a MAC address for SLAAC.",
    explanation: "EUI-64 splits the 48-bit MAC address, inserts `0xFFFE` in the middle, and flips the universal/local bit. It creates a unique 64-bit host part, ensuring link-local uniqueness. Modern systems often use privacy extensions (random addresses) instead of EUI-64 to avoid leaking MAC information.",
    hint: "How can a device turn a MAC like `00:1A:2B:3C:4D:5E` into an IPv6 address?",
    level: "advanced",
    codeExample: "# Show EUI-64 derived address (Linux – if privacy extensions disabled)\nip -6 addr show dev eth0 | grep -v temporary"
  },
  {
    question: "What is the `::` shorthand rule? Give an example of an invalid usage.",
    shortAnswer: "`::` replaces the longest consecutive block of zero hextets, and can appear only once. Invalid: `2001::db8::1` (two `::`).",
    explanation: "Example valid: `2001:0:0:0:0:0:0:1` → `2001::1`. Example invalid: `2001:0:0:db8:0:0:0:1` cannot be written as `2001::db8::1` because the reader wouldn't know how many zeros each `::` represents.",
    hint: "Think of `::` as a placeholder for 'one or more groups of zeros'.",
    level: "basic",
    codeExample: "// Vaild compaction: `fe80:0:0:0:2aa:ff:fe28:9c5a` -> `fe80::2aa:ff:fe28:9c5a`"
  },
  {
    question: "Explain the IPv6 header simplification compared to IPv4.",
    shortAnswer: "IPv6 header is fixed length (40 bytes) and removes the Checksum, Options (moved to extension headers), and Fragmentation fields (handled by host).",
    explanation: "IPv4 header is variable (20-60 bytes) with 12 fields. IPv6 has only 8 fields, making it faster for routers to process. The Fragment Offset field is gone – fragmentation is done only by the source. The Header Checksum is removed because link-layer and transport-layer checksums suffice.",
    hint: "Fewer fields → faster processing.",
    level: "advanced",
    codeExample: "# Compare headers using tcpdump and Wireshark\ntcpdump -i eth0 -c 10 -v 'ip'    # IPv4\n tcpdump -i eth0 -c 10 -v 'ip6'   # IPv6"
  },
  {
    question: "What is `192.0.2.0/24`? When would you see it in learning materials?",
    shortAnswer: "The TEST-NET-1 block reserved for documentation and examples.",
    explanation: "IANA reserved `192.0.2.0/24` (along with `203.0.113.0/24` and `198.51.100.0/24`) for use in documentation and example configurations. Addresses from these blocks should never appear on the public internet. The IPv6 counterpart is `2001:db8::/32` (DOCUMENTATION prefix).",
    hint: "Look for these addresses in textbooks and tutorials.",
    level: "basic",
    codeExample: "ping 192.0.2.1  # safe to use in examples, will not reach real internet (unless misconfigured)"
  },
  {
    question: "How does IPv6 handle fragmentation when a packet exceeds the path MTU?",
    shortAnswer: "The source host fragments the packet before sending. Routers never fragment; they send ICMPv6 'Packet Too Big' messages if MTU is insufficient.",
    explanation: "IPv6 requires that the source performs Path MTU Discovery (PMTUD). If a router receives a packet larger than the next-hop link's MTU, it discards the packet and returns an ICMPv6 Type 2 (Packet Too Big) message, indicating the MTU. The source then reduces its packet size. This prevents router fragmentation overhead.",
    hint: "Who gets the extra work – the sender or the network?",
    level: "advanced",
    codeExample: "# Test PMTUD for IPv6\ntracepath6 -n 2001:4860:4860::8888  # Google IPv6 DNS"
  },
  {
    question: "What is an anycast address? Give a real-world example.",
    shortAnswer: "An address assigned to multiple interfaces; packets are delivered to the nearest one (by routing distance). Example: 6bone root DNS servers use anycast.",
    explanation: "Anycast is a one-to-nearest communication model. The same IPv6 address is configured on many servers. Routers forward the packet to the topologically closest instance. This provides load distribution and redundancy. Popular with DNS servers – e.g., `2001:4860:4860::8888` (Google DNS) is anycast.",
    hint: "Think of calling 'customer service' – you get the nearest available agent.",
    level: "intermediate",
    codeExample: "# Trace to Google DNS – note it may show different paths each time due to anycast\ntraceroute6 2001:4860:4860::8888"
  },
  {
    question: "What is the address `ff02::1`? Who responds to it?",
    shortAnswer: "The all-nodes link-local multicast address. All IPv6 nodes (hosts, routers) on the local link listen to it.",
    explanation: "`ff02::1` is a well-known multicast address. Any packet sent to this address will be received by every IPv6-capable interface on the same link. It replaces the IPv4 broadcast address (`255.255.255.255`) for some internal operations like ICMPv6 Router Solicitation.",
    hint: "Ping this address – everyone on your local network should reply.",
    level: "intermediate",
    codeExample: "ping6 -c 2 ff02::1%eth0  # ping all IPv6 nodes on eth0"
  },
  {
    question: "What is the difference between stateful and stateless DHCPv6?",
    shortAnswer: "Stateful DHCPv6 assigns addresses (like IPv4 DHCP). Stateless DHCPv6 supplies additional info (e.g., DNS) after SLAAC assigns an address.",
    explanation: "In stateless DHCPv6, the client uses SLAAC to obtain its IPv6 address, then contacts DHCPv6 for other configuration parameters (DNS, domain, etc.). Stateful DHCPv6 manages both address assignment and other parameters, similar to IPv4 DHCP. The router's 'Managed' (M) and 'Other' (O) flags in Router Advertisements control which mode is used.",
    hint: "SLAAC gives you a house number; DHCPv6 gives you the phonebook.",
    level: "advanced",
    codeExample: "# Example dhcpd6.conf for stateless mode\noption dhcp6.name-servers 2001:4860:4860::8888;\nsubnet6 2001:db8:1::/64 { }  # no address pools"
  },
  {
    question: "Why is there no NAT in IPv6, yet IP addresses might still change?",
    shortAnswer: "Privacy Extensions (temporary addresses) change periodically to prevent tracking, not to conserve addresses.",
    explanation: "RFC 4941 defines IPv6 Privacy Extensions. A device can generate temporary random addresses for outgoing connections while still having a stable (but globally unique) address for incoming connections. This protects user privacy without hiding multiple devices behind a single IP. It is not NAT.",
    hint: "Changing your clothes vs. sharing a single shirt with your whole family.",
    level: "intermediate",
    codeExample: "# Check if privacy extensions are enabled (Linux)\ncat /proc/sys/net/ipv6/conf/eth0/use_tempaddr"
  },
  {
    question: "A router's IPv6 interface shows `fe80::1/64`. Can this address be used to reach the router from another subnet?",
    shortAnswer: "No. Link-local addresses (`fe80::/10`) are not routable; they are limited to a single link.",
    explanation: "Packets with link-local source or destination addresses must never be forwarded by a router. To reach the router from another subnet, you must use its global unicast address (if configured) or a unique local address (ULA, `fc00::/7`).",
    hint: "The 'fe80' address is like a room number inside one building.",
    level: "basic",
    codeExample: "ping6 -I eth0 fe80::1%eth0   # Works on same link, note %zone index"
  },
  {
    question: "What is the IPv6 address format for a 6to4 tunnel?",
    shortAnswer: "2002:IPv4 address in hex::/48, e.g., IPv4 192.0.2.1 gives 2002:c000:0201::/48.",
    explanation: "6to4 automatically assigns an IPv6 prefix based on the caller's public IPv4 address. The IPv4 address is written in hexadecimal, split into two 16‑bit parts, and placed after `2002:`. For `192.0.2.1` (hex: `c0 00 02 01`), the prefix is `2002:c000:0201::/48`. This mechanism allows isolated IPv6 islands to connect over IPv4 internet.",
    hint: "Each public IPv4 address becomes a /48 IPv6 network.",
    level: "advanced",
    codeExample: "# Enable 6to4 tunnel (Linux)\nip tunnel add tun6to4 mode sit remote any local 192.0.2.1 ttl 255\nip link set tun6to4 up\nip addr add 2002:c000:0201::1/48 dev tun6to4"
  },
  {
    question: "Explain the concept of 'IPv6 address scopes'. How many scopes exist?",
    shortAnswer: "Three main scopes: link-local (fe80::/10), unique local (fc00::/7), and global (2000::/3).",
    explanation: "Scope defines the region where the address is valid. **Link-local** – only the current subnet. **Unique Local** – within a private organization (similar to RFC 1918), but not intended to be globally routed. **Global** – routable worldwide. There are also multicast scopes (interface-local, admin-local, site-local, etc.).",
    hint: "Consider the size of the 'neighborhood' for each address.",
    level: "intermediate",
    codeExample: "# Show IPv6 addresses with scopes (Linux)\nip -6 addr show scope global\nip -6 addr show scope link"
  },
  {
    question: "What is the IPv6 Jumbogram?",
    shortAnswer: "An IPv6 packet with payload larger than 65,535 bytes, using a Jumbo Payload option.",
    explanation: "IPv6 optionally supports jumbograms (up to 4,294,967,295 bytes) via the Jumbo Payload Hop-by-Hop option. This is useful for high-speed networks (e.g., 10 GbE) to reduce overhead. IPv4 has no such standard; it requires IP fragmentation for large packets.",
    hint: "Super-sized packets for super-fast networks.",
    level: "expert",
    codeExample: "// Not typically configured by end users; enabled in drivers/NIC settings"
  },
  {
    question: "What does the `%` sign mean in `ping6 fe80::1%eth0`?",
    shortAnswer: "Zone index (scope ID) – tells the OS which interface to use for a link-local address.",
    explanation: "Because link-local addresses are not unique across interfaces (each interface can have `fe80::1`), the system needs a way to disambiguate. The `%eth0` (or `%4` on Windows) specifies the outgoing interface. This is required for any operation with a link-local address.",
    hint: "Without the `%`, the OS doesn't know which 'fe80::1' you mean.",
    level: "intermediate",
    codeExample: "ping6 -I eth0 fe80::1   # Alternative syntax on Linux"
  },
  {
    question: "How do you test if your ISP supports IPv6? (Command-line approach)",
    shortAnswer: "Run `ping6 -c 4 2001:4860:4860::8888` (Google DNS). Or visit ipv6-test.com, but command line is faster.",
    explanation: "If the ping succeeds with replies from an IPv6 address, your ISP provides IPv6 connectivity. Additionally, check your interface’s global IPv6 address (`ip -6 addr show`) and default route (`ip -6 route show default`). Many ISPs now assign a `/64` prefix via DHCPv6-PD.",
    hint: "Google's public DNS is often reachable over IPv6.",
    level: "basic",
    codeExample: "ping6 -c 4 2001:4860:4860::8888\ncurl -6 https://icanhazip.com   # shows your public IPv6 address"
  },
  {
    question: "What is the role of ICMPv6 in IPv6? Name three essential functions.",
    shortAnswer: "Neighbor Discovery (NDP), Path MTU Discovery (PMTUD), Router Advertisement/Solicitation, and Duplicate Address Detection (DAD).",
    explanation: "ICMPv6 is integral to IPv6 operation. It combines functions previously handled by ARP, ICMPv4, and IGMP. Specifically: (1) Neighbor Solicitation/Advertisement for address resolution, (2) Router Solicitation/Advertisement for autoconfiguration, (3) Duplicate Address Detection ensures address uniqueness on a link.",
    hint: "ICMPv6 is the 'glue' that makes IPv6 work without ARP or broadcasts.",
    level: "intermediate",
    codeExample: "# Capture ICMPv6 Neighbor Discovery (NDP) packets\ntcpdump -i eth0 -n icmp6 and '(ip6[40] == 135 or ip6[40] == 136)'"
  },
  {
    question: "Explain the `inet6` output line: `inet6 2001:db8:1::123/64 scope global dynamic`. What does 'dynamic' mean?",
    shortAnswer: "The address was assigned via SLAAC or DHCPv6, not statically configured.",
    explanation: "The 'dynamic' flag indicates the address is not manually configured. It could be from SLAAC (using prefix from RA) or from a DHCPv6 lease. Such addresses may change over time, especially if privacy extensions are used. Static addresses (manually added) lack this flag.",
    hint: "Check your system's network config files – static addresses don't appear as dynamic.",
    level: "basic",
    codeExample: "ip -6 addr show eth0 | grep dynamic"
  },
  {
    question: "What is the primary reason for IPv6's 'flow label' field?",
    shortAnswer: "To label packets belonging to the same flow (e.g., a video stream) for special handling by routers without deep packet inspection.",
    explanation: "The 20-bit Flow Label field allows the source to mark packets that require identical treatment (e.g., same QoS, routing, or load balancing). Routers can use the flow label + source address to identify flows quickly, improving performance for real-time services.",
    hint: "Think of it as a 'priority lane' sticker for packets.",
    level: "expert",
    codeExample: "# Set flow label with Linux (requires custom iproute2 tools)\nip -6 route add flowlabel 0xabcde ..."
  }
];

export default questions;