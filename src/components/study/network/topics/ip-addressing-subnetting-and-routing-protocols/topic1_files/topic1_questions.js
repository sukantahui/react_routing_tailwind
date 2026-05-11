// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the purpose of subnetting?",
    shortAnswer: "To divide a large IP network into smaller, manageable sub-networks.",
    explanation: "Subnetting improves network performance (reduces broadcast traffic), enhances security (segments traffic), and conserves IP address space by allocating only needed addresses. It also simplifies routing through hierarchical addressing.",
    hint: "Think of splitting a huge city into postal codes.",
    level: "basic",
    codeExample: "# Example: subnetting 192.168.1.0/24 into two /25 subnets:\n# Subnet A: 192.168.1.0/25 (hosts 1-126)\n# Subnet B: 192.168.1.128/25 (hosts 129-254)"
  },
  {
    question: "Convert the subnet mask 255.255.240.0 to CIDR notation.",
    shortAnswer: "/20",
    explanation: "255.255.240.0 binary: 11111111.11111111.11110000.00000000 → 20 ones, so /20.",
    hint: "Count the number of contiguous 1s from left.",
    level: "basic",
    codeExample: "ipcalc -m 255.255.240.0   # Linux command"
  },
  {
    question: "How many usable host addresses are in a /28 subnet?",
    shortAnswer: "14 usable hosts.",
    explanation: "/28 means 32 - 28 = 4 host bits. 2^4 = 16 total addresses. Subtract network (all zeros) and broadcast (all ones) → 14 usable.",
    hint: "Formula: 2^(32-prefix) - 2.",
    level: "basic",
    codeExample: "python -c 'print(2**(32-28)-2)'"
  },
  {
    question: "You need 6 subnets, each with at least 10 hosts. What subnet mask would you use for a Class C network (192.168.1.0/24)?",
    shortAnswer: "255.255.255.240 (/28) gives 16 subnets and 14 hosts per subnet.",
    explanation: "Borrow 3 bits? 2^3=8 subnets (≥6) but leaves 5 host bits → 2^5-2=30 hosts (≥10). That mask is /27 (255.255.255.224). For /28 (4 bits borrowed): 16 subnets, 14 hosts. Both satisfy. The typical minimal mask is /27. But question asks 'what mask', acceptable answers: /27 or /28. Provide explanation.",
    hint: "Calculate required host bits first: 2^h -2 ≥ 10 → h=4 bits (since 2^3-2=6 <10). So prefix length = 32-4=28, but wait, that yields only 2^4=16 hosts? Actually 4 host bits = 16 total -2 =14 hosts. But for subnets: with original /24, borrowed bits = n, subnets = 2^n. For /28, n=4 → subnets=16. Both criteria satisfied.",
    level: "intermediate",
    codeExample: "# Check with calc\nnsubnets = 16; nhosts=14"
  },
  {
    question: "What is the network address of 172.16.99.45 with mask 255.255.192.0?",
    shortAnswer: "172.16.64.0",
    explanation: "Mask 255.255.192.0 = /18. Network bits = first 18 bits. 172.16.99.45 in binary: 10101100.00010000.01100011.00101101. Mask first 18 bits: keep 172.16.01 (but 99 decimal = 01100011, first two bits '01' = 64 decimal). So network = 172.16.64.0.",
    hint: "Focus on the interesting octet (3rd octet): 99 AND 192 = 64.",
    level: "intermediate",
    codeExample: "ipcalc 172.16.99.45/18"
  },
  {
    question: "What is the broadcast address for subnet 10.0.0.0/13?",
    shortAnswer: "10.7.255.255",
    explanation: "/13 mask = 255.248.0.0. Block size in the second octet = 256-248 = 8. Subnets: 10.0.0.0, 10.8.0.0, ... So 10.0.0.0/13 broadcast = next subnet minus 1 = 10.8.0.0 - 1 = 10.7.255.255.",
    hint: "Find next network ID and subtract 1.",
    level: "advanced",
    codeExample: "python -c 'import ipaddress; print(ipaddress.IPv4Network(\"10.0.0.0/13\").broadcast_address)'"
  },
  {
    question: "What is the purpose of VLSM (Variable Length Subnet Masking)?",
    shortAnswer: "To use different subnet masks in the same network, increasing IP efficiency.",
    explanation: "VLSM allows you to subnet a subnetted network. For example, take a /24, create a /28 for a small department and a /26 for a larger department, without wasting addresses. Without VLSM, all subnets would have the same size.",
    hint: "One size does not fit all.",
    level: "intermediate",
    codeExample: "192.168.1.0/24 → 192.168.1.0/26 (62 hosts) + 192.168.1.64/28 (14 hosts) + 192.168.1.80/29 (6 hosts)"
  },
  {
    question: "Calculate the subnet ID, first usable, last usable, and broadcast for 192.168.5.37/29.",
    shortAnswer: "Network: 192.168.5.32, first: 192.168.5.33, last: 192.168.5.38, broadcast: 192.168.5.39",
    explanation: "/29 = 255.255.255.248, block size 8. 37 falls in 32-39 range. Network = 32, broadcast = 39, usable 33-38.",
    hint: "Divide 37 by 8 → 4 remainder 5, so block start = 4*8=32.",
    level: "basic",
    codeExample: "nmap -sL 192.168.5.32/29"
  },
  {
    question: "What is CIDR? How did it improve upon classful addressing?",
    shortAnswer: "Classless Inter-Domain Routing – allows arbitrary prefix lengths, replacing rigid Class A/B/C blocks.",
    explanation: "Classful addressing wasted addresses (Class B too large, Class C too small). CIDR introduced variable-length subnet masks (VLSM) and route aggregation, extending IPv4 life. It also allowed supernetting (combining contiguous networks).",
    hint: "Think of CIDR as 'no more straightjacket' for networks.",
    level: "basic",
    codeExample: "ip route add 192.168.0.0/22 dev eth0  # aggregates 192.168.0.0-192.168.3.0"
  },
  {
    question: "You have a /22 network. How many /27 subnets can you create from it?",
    shortAnswer: "32",
    explanation: "/22 has 32-22=10 host bits. /27 has 32-27=5 host bits. The difference is 5 bits. 2^5 = 32 subnets.",
    hint: "Difference in prefix lengths = bits borrowed, 2^(new_prefix - original_prefix).",
    level: "intermediate",
    codeExample: "echo $((2**(27-22)))"
  },
  {
    question: "What is the supernet mask for aggregating 192.168.4.0, 192.168.5.0, 192.168.6.0, 192.168.7.0?",
    shortAnswer: "255.255.252.0 (/22)",
    explanation: "These are contiguous /24s from 192.168.4.0 to 192.168.7.0. The common prefix: first 22 bits. 192.168.4 (binary 11000000.10101000.00000100). First 22 bits: 192.168.000001 (4 = 00000100, first 6 bits of third octet yield 0). Actually the summary is 192.168.4.0/22 (covers .4.0 to .7.255).",
    hint: "Find the common leftmost bits among all network addresses.",
    level: "advanced",
    codeExample: "# Using Linux's ipcalc\nipcalc 192.168.4.0/24 192.168.5.0/24 192.168.6.0/24 192.168.7.0/24 --aggregate"
  },
  {
    question: "What is the maximum number of subnets you can have with a /24 network if each subnet needs at least 8 hosts?",
    shortAnswer: "16 subnets (each /28 gives 14 hosts).",
    explanation: "Each subnet requires 8 hosts → need at least 4 host bits (2^4-2=14 ≥8). So host bits = 4, prefix = 32-4=28. Borrowed bits = 28-24=4 → 2^4=16 subnets.",
    hint: "More hosts needed → fewer subnets, and vice versa.",
    level: "intermediate",
    codeExample: "# Max subnets = 2^(borrowed bits)."
  },
  {
    question: "Convert the binary subnet mask 11111111.11111111.11111100.00000000 to dotted decimal.",
    shortAnswer: "255.255.252.0",
    explanation: "First two octets all ones → 255.255. Third octet: 11111100 = 252. Fourth octet zero.",
    hint: "Convert each octet separately.",
    level: "basic",
    codeExample: "echo 'obase=10; ibase=2; 11111100' | bc"
  },
  {
    question: "What is the last usable host IP in subnet 10.10.10.64/26?",
    shortAnswer: "10.10.10.126",
    explanation: "/26 = 255.255.255.192, block size 64. Subnet range 64-127. Broadcast = 127, last usable = 126.",
    hint: "Network + (2^(host bits) - 2).",
    level: "basic",
    codeExample: "ipcalc 10.10.10.64/26"
  },
  {
    question: "Why is 192.168.1.0/31 used?",
    shortAnswer: "For point-to-point links (RFC 3021) – saves IP addresses, no broadcast needed.",
    explanation: "In a /31 subnet, there are exactly 2 addresses. Both are used as endpoints; no network or broadcast addresses. This halves IP waste on P2P links.",
    hint: "No need for broadcast on a two-device link.",
    level: "advanced",
    codeExample: "# Configure on Cisco: ip address 192.168.1.1 255.255.255.254"
  },
  {
    question: "What is the difference between NAT and subnetting?",
    shortAnswer: "Subnetting divides a network internally; NAT translates private to public IPs for internet access.",
    explanation: "Subnetting operates within a private or public address space to organise hosts. NAT modifies IP headers to allow multiple devices to share a single public IP. They are often used together (subnetting inside a NATed network).",
    hint: "Subnetting = internal organisation. NAT = border translation.",
    level: "intermediate",
    codeExample: "iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE  # NAT"
  },
  {
    question: "What is the network address for 10.10.10.10/8?",
    shortAnswer: "10.0.0.0",
    explanation: "/8 mask is 255.0.0.0, network = first octet unchanged, rest zero. So 10.0.0.0.",
    hint: "Any address with /8 only preserves the first octet.",
    level: "basic",
    codeExample: "ipcalc 10.10.10.10/8"
  },
  {
    question: "Calculate the number of subnets when borrowing 5 bits from a /16 network.",
    shortAnswer: "32 subnets",
    explanation: "2^5 = 32 subnets, each with 2^(16-5) = 2^11 = 2048 host addresses (including network/broadcast).",
    hint: "Bits borrowed = exponent for number of subnets.",
    level: "basic",
    codeExample: "print 2**5"
  },
  {
    question: "What is the wildcard mask for the subnet 192.168.10.0/28?",
    shortAnswer: "0.0.0.15",
    explanation: "Wildcard mask = inverted subnet mask: 255.255.255.240 inverted = 0.0.0.15. Used in access control lists (ACLs) to match a range.",
    hint: "Wildcard = 255.255.255.255 - subnet mask.",
    level: "intermediate",
    codeExample: "echo '255.255.255.240' | awk -F. '{print 255-$1,255-$2,255-$3,255-$4}' OFS='.'"
  },
  {
    question: "You see an IP 192.168.1.255/24. Is this a broadcast address? Explain.",
    shortAnswer: "Yes, in /24, 192.168.1.255 is the broadcast address for the 192.168.1.0 network.",
    explanation: "For prefix /24, network = 192.168.1.0, broadcast = 192.168.1.255. So that address cannot be assigned to a host.",
    hint: "All host bits set to 1 = broadcast.",
    level: "basic",
    codeExample: "ping -b 192.168.1.255  # may respond to broadcast (if enabled)"
  },
  {
    question: "What is route summarisation? Give an example.",
    shortAnswer: "Combining multiple routes into one to reduce routing table size. Example: 192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, 192.168.3.0/24 → 192.168.0.0/22.",
    explanation: "Summarisation requires that network prefixes are contiguous and aligned. It reduces routing overhead and improves router performance.",
    hint: "Common prefix length determines the summary route.",
    level: "intermediate",
    codeExample: "ip route add 192.168.0.0/22 via 10.0.0.1"
  },
  {
    question: "What is the subnet ID for address 172.31.87.200 with mask 255.255.240.0 (/20)?",
    shortAnswer: "172.31.80.0",
    explanation: "Mask 255.255.240.0 = /20. Third octet: 87 AND 240 = 80. So network 172.31.80.0.",
    hint: "Block size in third octet = 16 (256-240). Subnets: .0, .16, .32, .48, .64, .80, ...",
    level: "intermediate",
    codeExample: "ipcalc 172.31.87.200/20"
  },
  {
    question: "A company has 7 departments. The smallest department has 12 hosts. What subnet mask should you use to allocate subnets from a /24?",
    shortAnswer: "255.255.255.240 (/28) gives at least 14 hosts per subnet and up to 16 subnets.",
    explanation: "Need at least 7 subnets → borrow at least 3 bits (2^3=8). Need at least 12 hosts → host bits h such that 2^h-2 >=12 → h=4 (since 2^4-2=14). So /28 is appropriate.",
    hint: "Balance between subnets and hosts per subnet.",
    level: "advanced",
    codeExample: "Subnet mask /28 yields 16 subnets, 14 hosts each."
  },
  {
    question: "Write the range of usable addresses for subnet 203.0.113.16/28.",
    shortAnswer: "203.0.113.17 to 203.0.113.30",
    explanation: "/28 block size 16. .16 is network, .31 is broadcast, so usable .17 - .30.",
    hint: "Network +1 to Broadcast -1.",
    level: "basic",
    codeExample: "nmap -sL 203.0.113.16/28 | grep 'Nmap scan'"
  },
  {
    question: "What is the purpose of 'ip subnet-zero' command?",
    shortAnswer: "Allows the use of the first (all-zeros) and last (all-ones) subnets in a classful network.",
    explanation: "In traditional subnetting, the subnet with all zeros in the subnet part and the subnet with all ones were considered illegal because they conflicted with network and broadcast addresses. With CIDR, they are usable. Cisco's `ip subnet-zero` enables them.",
    hint: "Zero subnet is now standard.",
    level: "advanced",
    codeExample: "# On Cisco router: (config)# ip subnet-zero"
  },
  {
    question: "How many host bits are in a /26 mask?",
    shortAnswer: "6 host bits (32 - 26 = 6).",
    explanation: "Total bits 32 minus network bits = host bits.",
    hint: "Subtract from 32.",
    level: "basic",
    codeExample: "echo $((32-26))"
  },
  {
    question: "What is the maximum prefix length for a usable IPv4 subnet?",
    shortAnswer: "/30 (2 usable addresses) for point-to-point; /31 is also usable with special support.",
    explanation: "/30 gives 4 addresses: network, 2 usable, broadcast. /31 gives 2 addresses (both endpoints, no broadcast) and is allowed on P2P links (RFC 3021). /32 is a single host route, not a subnet for multi-host.",
    hint: "Need at least 2 endpoints for a link.",
    level: "advanced",
    codeExample: "ip route add 10.0.0.0/32 dev lo  # host route"
  },
  {
    question: "Which of the following is a valid subnet mask? a) 255.255.0.255 b) 255.255.190.0 c) 255.240.0.0",
    shortAnswer: "c) 255.240.0.0 (and b? 255.255.190.0 is invalid because 190 = 10111110 – bits not contiguous).",
    explanation: "Subnet masks must have contiguous 1s from left. 190 = 10111110, has a 0 then 1s – invalid. 255.240.0.0 = 11111111.11110000.00000000.00000000 – valid.",
    hint: "Check binary: no zero in the middle of ones.",
    level: "basic",
    codeExample: "# Use 'ipcalc -m' to test validity (it will reject invalid)"
  },
  {
    question: "What is the purpose of the 'network address' in a subnet?",
    shortAnswer: "Identifies the subnet itself. It is the first address, with all host bits set to 0.",
    explanation: "It is used in routing tables to represent the entire subnet. It cannot be assigned to any host.",
    hint: "The 'name' of the subnet.",
    level: "basic",
    codeExample: "route -n | grep '192.168.1.0'  # network entry"
  },
  {
    question: "Explain how to calculate the number of subnets when using VLSM.",
    shortAnswer: "There is no single formula; you add the number of subnets created at each level, respecting that they must not overlap.",
    explanation: "VLSM allows breaking a subnet further. For example: take 10.0.0.0/8, create /16 subnets; then within one /16, create /24 subnets. Total subnets are counted hierarchically. Overlap is forbidden.",
    hint: "Think of a tree of divisions.",
    level: "expert",
    codeExample: "https://www.subnetting.net/  # interactive VLSM calculator"
  }
];

export default questions;