// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is the maximum hop count in RIP?",
    shortAnswer: "15 hops. 16 is considered unreachable.",
    explanation: "RIP uses hop count as its only metric. A route with a hop count of 16 is considered infinite, meaning the destination is unreachable. This small limit makes RIP unsuitable for large networks.",
    hint: "Think of the 'count to infinity' problem.",
    level: "basic",
    codeExample: "show ip rip database  # shows routes with hop counts"
  },
  {
    question: "What type of protocol is OSPF?",
    shortAnswer: "Link-state routing protocol.",
    explanation: "OSPF routers exchange Link State Advertisements (LSAs) to build a consistent topological database of the network. Each router then runs Dijkstra's Shortest Path First (SPF) algorithm independently to compute the best paths.",
    hint: "OSPF stands for Open Shortest Path First – it builds a map.",
    level: "basic",
    codeExample: "show ip ospf database  # view link-state database"
  },
  {
    question: "What is an Autonomous System (AS) in BGP?",
    shortAnswer: "A collection of IP networks under a single administrative domain.",
    explanation: "Each AS is assigned a unique 16-bit or 32-bit AS number (ASN). BGP exchanges routing information between different ASes (eBGP) or within the same AS (iBGP). Example: AS 65001 represents a private network inside a university.",
    hint: "Think of an AS as a 'company' or 'ISP' that has its own routing policies.",
    level: "basic",
    codeExample: "show ip bgp summary  # shows local AS number"
  },
  {
    question: "How does OSPF calculate the cost of a link?",
    shortAnswer: "Cost = reference bandwidth / interface bandwidth (default reference = 100 Mbps).",
    explanation: "Cost is inversely proportional to bandwidth. For 100 Mbps Ethernet, cost = 1. For 1 Gbps, cost = 1 (because 100/1000 = 0.1, rounded up to 1). You can adjust the reference bandwidth to make high-speed links distinguishable.",
    hint: "Higher bandwidth = lower cost.",
    level: "intermediate",
    codeExample: "auto-cost reference-bandwidth 1000  # set reference to 1000 Mbps on Cisco"
  },
  {
    question: "What is the purpose of the OSPF DR (Designated Router)?",
    shortAnswer: "To reduce adjacencies and LSA flooding on a multi-access network (like Ethernet).",
    explanation: "On a broadcast network, all routers form adjacencies only with the DR and BDR (Backup DR). The DR originates network LSAs and floods updates. The BDR takes over if the DR fails. This reduces O(n^2) adjacency problems.",
    hint: "DR-elected only on Ethernet, not on point-to-point links.",
    level: "intermediate",
    codeExample: "show ip ospf neighbor  # DR/BDR columns"
  },
  {
    question: "What is the difference between eBGP and iBGP?",
    shortAnswer: "eBGP runs between different ASes; iBGP runs within the same AS.",
    explanation: "eBGP peers are typically directly connected (multihop possible). iBGP peers do not need to be directly connected, but they must form a full mesh (or use route reflectors). iBGP routes are not advertised to other iBGP peers unless the router is a route reflector.",
    hint: "e = external, i = internal.",
    level: "intermediate",
    codeExample: "router bgp 65001\n neighbor 192.168.1.2 remote-as 65001   # iBGP\n neighbor 203.0.113.1 remote-as 65002  # eBGP"
  },
  {
    question: "Which BGP attribute is used to influence outbound traffic (which exit to choose)?",
    shortAnswer: "MED (Multi-Exit Discriminator) is used to influence inbound traffic. For outbound, use Local Preference (local-pref).",
    explanation: "Local Preference is the highest priority BGP attribute to influence outbound path selection (higher value preferred). MED is exchanged between ASes to influence inbound traffic (lower value preferred).",
    hint: "Local-pref = 'I prefer this exit'; MED = 'please come in this way'.",
    level: "advanced",
    codeExample: "route-map SET_LOCAL_PREF permit 10\n set local-preference 200"
  },
  {
    question: "What is route summarisation and why is it important in OSPF?",
    shortAnswer: "Combining multiple routes into a single prefix to reduce routing table size and LSA flooding.",
    explanation: "In OSPF, summarisation can be done on ABRs (area border routers) to send a summary LSA (Type 3) for multiple subnets. This reduces the size of the routing table and hides area internal topology changes from other areas.",
    hint: "Summarise at area boundaries.",
    level: "advanced",
    codeExample: "area 0 range 10.0.0.0 255.255.252.0  # summarise 10.0.0.0/22"
  },
  {
    question: "What is the administrative distance of OSPF?",
    shortAnswer: "110",
    explanation: "Administrative distance (AD) is a measure of trustworthiness of a routing protocol. Lower AD is more preferred. OSPF AD = 110, internal EIGRP = 90, RIP = 120, eBGP = 20, iBGP = 200. Static routes default to 1.",
    hint: "Lower AD = higher preference.",
    level: "basic",
    codeExample: "show ip route  # first column shows protocol distance"
  },
  {
    question: "How does BGP avoid routing loops in the internet?",
    shortAnswer: "By using the AS_PATH attribute and loop detection.",
    explanation: "When a BGP router receives an update, it checks if its own AS number is already in the AS_PATH. If so, the update is discarded because that would indicate a loop. Additionally, BGP uses split horizon within iBGP.",
    hint: "AS_PATH prevents loops across ASes.",
    level: "intermediate",
    codeExample: "show ip bgp 8.8.8.8  # examine AS_PATH"
  },
  {
    question: "What is the difference between a BGP 'network' command and redistribution?",
    shortAnswer: "`network` advertises a route that must exist in the routing table exactly. Redistribution injects routes from other protocols into BGP.",
    explanation: "The BGP `network` command (e.g., `network 192.168.1.0 mask 255.255.255.0`) only advertises that exact prefix if it is present in the IP routing table. Redistribution via `redistribute ospf` will inject all OSPF routes into BGP (subject to filtering).",
    hint: "`network` is selective, redistribution is mass import.",
    level: "advanced",
    codeExample: "router bgp 65001\n network 10.0.0.0 mask 255.255.0.0\n redistribute ospf 1"
  },
  {
    question: "What is a 'split horizon' in distance-vector protocols?",
    shortAnswer: "A rule that prevents a router from advertising a route back out of the interface it learned it on.",
    explanation: "Split horizon helps prevent routing loops. For example, if Router A learns about network X from Router B, it will not advertise network X back to Router B. This reduces unnecessary updates and avoids count-to-infinity.",
    hint: "Don't tell your neighbor about a route you learned from that neighbor.",
    level: "basic",
    codeExample: "(no ip split-horizon on interface to disable, but not recommended)"
  },
  {
    question: "What is the purpose of OSPF areas?",
    shortAnswer: "To partition an OSPF domain into smaller, manageable sections, reducing LSA flooding and SPF computation.",
    explanation: "All areas must connect to Area 0 (backbone). Intra-area routes are known within an area; inter-area routes are summarised and passed via ABRs. Stub areas can further reduce LSAs.",
    hint: "Areas = divide and conquer.",
    level: "intermediate",
    codeExample: "area 1 stub  # configure area 1 as a stub area"
  },
  {
    question: "What is the `infinite` metric in RIP?",
    shortAnswer: "16 hops, meaning unreachable.",
    explanation: "RIP uses 16 as infinity. Any route with hop count 16 is considered down. This limits the network diameter to 15 hops.",
    hint: "Count to infinity stops at 16.",
    level: "basic",
    codeExample: "debug ip rip  # watch routes being advertised"
  },
  {
    question: "What is the Well-known community attribute 'NO_EXPORT' in BGP?",
    shortAnswer: "Prevents a route from being advertised outside the AS confederation.",
    explanation: "When a route is tagged with NO_EXPORT, eBGP speakers will not advertise it to any external AS. It can still be propagated inside the AS or confederation. Used for internal routing policies.",
    hint: "NO_EXPORT = 'keep inside'.",
    level: "expert",
    codeExample: "route-map SET_COMMUNITY permit 10\n set community no-export"
  },
  {
    question: "What is the difference between `clear ip ospf process` and `clear ip route *`?",
    shortAnswer: "`clear ip ospf process` resets OSPF adjacencies and recomputes SPF. `clear ip route *` clears the entire routing table, then it repopulates from all sources.",
    explanation: "Clearing OSPF process forces routers to re‑exchange LSAs and rebuild the topology. Clearing the route table is more drastic and can cause temporary blackholing. Use with care.",
    hint: "OSPF process reset = only OSPF; route clear = everything.",
    level: "advanced",
    codeExample: "clear ip ospf process\n clear ip route *"
  },
  {
    question: "What is BGP 'next-hop-self' used for?",
    shortAnswer: "To set the BGP next-hop to the router's own IP address when advertising to iBGP peers.",
    explanation: "By default, eBGP updates preserve the external next‑hop. iBGP routers may not have a route to that next-hop if they are not directly connected. `next-hop-self` forces the router to replace the next‑hop with its own IP address.",
    hint: "Make sure iBGP peers can reach the next-hop.",
    level: "intermediate",
    codeExample: "neighbor 10.0.0.2 next-hop-self"
  },
  {
    question: "What is the meaning of the OSPF state 'FULL/DR'?",
    shortAnswer: "The router is fully adjacent to the Designated Router on a multi-access network.",
    explanation: "In a broadcast network, non-DR routers form a full adjacency only with the DR and BDR, not with each other (2-way state). FULL/DR means this router is the DR. FULL/BDR means Backup DR.",
    hint: "Check with `show ip ospf neighbor`.",
    level: "intermediate",
    codeExample: "show ip ospf neighbor | include FULL"
  },
  {
    question: "Why does BGP use TCP port 179?",
    shortAnswer: "TCP provides reliable, ordered delivery of routing updates, which BGP relies on.",
    explanation: "Unlike RIP (UDP) and OSPF (IP protocol 89), BGP uses TCP to guarantee that updates are received correctly and in sequence. It also handles flow control and retransmission, simplifying BGP implementation.",
    hint: "BGP: a session-oriented routing protocol.",
    level: "basic",
    codeExample: "telnet 192.168.1.1 179  # manually connect to BGP port"
  },
  {
    question: "What is the default route redistribution behavior between OSPF processes?",
    shortAnswer: "Routes are not automatically redistributed; you must configure redistribution explicitly.",
    explanation: "If you have multiple OSPF processes (different process IDs), they are separate routing domains. To exchange routes, you use the `redistribute` command under one process, often with metrics and route-maps.",
    hint: "OSPF processes don't talk unless you tell them to.",
    level: "advanced",
    codeExample: "router ospf 2\n redistribute ospf 1 subnets"
  },
  {
    question: "What is a default route and how can it be originated in OSPF?",
    shortAnswer: "A default route is 0.0.0.0/0. In OSPF, use `default-information originate`.",
    explanation: "The command `default-information originate` injects a default route into OSPF if the router already has a default route in its routing table (or you add `always` keyword). This is common in an ASBR (Autonomous System Boundary Router).",
    hint: "Don't forget the 'always' if you want it unconditional.",
    level: "intermediate",
    codeExample: "default-information originate always metric 10"
  },
  {
    question: "What is the difference between RIPv1 and RIPv2?",
    shortAnswer: "RIPv2 supports VLSM, CIDR, authentication, multicast updates (224.0.0.9) instead of broadcast.",
    explanation: "RIPv1 is classful, does not support subnet masks, and uses broadcast. RIPv2 adds classless routing, includes subnet masks in updates, supports authentication (plaintext or MD5), and uses multicast for efficiency.",
    hint: "RIPv2 is the only usable version for modern networks.",
    level: "basic",
    codeExample: "version 2  # under router rip configuration"
  },
  {
    question: "What are route tags in OSPF used for?",
    shortAnswer: "To carry information about routes redistributed from other protocols, enabling policy-based filtering.",
    explanation: "When redistributing external routes into OSPF, you can assign a 32‑bit tag. Later, other routers can match that tag to make routing decisions (e.g., only accept routes with a certain tag).",
    hint: "Tag = colored sticker for routing policies.",
    level: "expert",
    codeExample: "route-map REDIST permit 10\n set tag 100"
  },
  {
    question: "Explain the BGP 'path selection' order (most important attributes).",
    shortAnswer: "Highest Local Preference -> Shortest AS_PATH -> Lowest Origin Type (IGP < EGP < incomplete) -> Lowest MED -> eBGP preferred over iBGP -> Lowest IGP metric to next-hop -> Oldest route -> Lowest Router-ID.",
    explanation: "This is the Cisco BGP decision process. Local Pref is highest priority; then AS_PATH length; then origin; then MED; then path type; then interior cost; then router ID.",
    hint: "Think: Local Pref, AS_PATH, Origin, MED…",
    level: "expert",
    codeExample: "show ip bgp  # look for > sign indicates best path"
  },
  {
    question: "What is 'poison reverse' in distance-vector protocols?",
    shortAnswer: "A technique to avoid loops: when a route becomes unreachable, the router advertises it with an infinite metric (16) to all neighbors.",
    explanation: "Poison reverse works with split horizon: instead of not advertising the route, the router explicitly advertises it as unreachable. This quickly informs other routers that the route is dead, reducing convergence time.",
    hint: "Poison reverse = 'tell everyone it's dead'.",
    level: "intermediate",
    codeExample: "# Enabled by default in RIP"
  },
  {
    question: "What is an OSPF 'stub area'?",
    shortAnswer: "An area that does not receive Type 5 external LSAs (AS‑external). It uses a default route to reach outside.",
    explanation: "A stub area blocks external LSAs (Type 5). To reach destinations outside the OSPF domain, routers in a stub area use a default route injected by the ABR. Totally stubby areas also block Type 3 summary LSAs.",
    hint: "Stub = 'no external routes, only default'.",
    level: "advanced",
    codeExample: "area 1 stub\n area 1 default-cost 10"
  },
  {
    question: "What is the purpose of the OSPF `passive-interface` command?",
    shortAnswer: "To stop sending OSPF hello packets on an interface, preventing adjacency formation while still including its network in OSPF.",
    explanation: "Used on interfaces that connect to end hosts (no other routers). The network is advertised, but OSPF protocol traffic is suppressed. This reduces overhead and improves security.",
    hint: "Passive = 'announce but don't talk'.",
    level: "basic",
    codeExample: "passive-interface GigabitEthernet0/1"
  },
  {
    question: "How does BGP use the 'Weight' attribute (Cisco proprietary)?",
    shortAnswer: "It is a Cisco-specific attribute to influence outbound path selection; higher weight is preferred, local to the router.",
    explanation: "Weight is not advertised to peers. It only affects the router’s decision locally. The highest weight path is chosen first in BGP decision process, overriding Local Pref.",
    hint: "Weight = 'I like this path more than any other router might'.",
    level: "expert",
    codeExample: "neighbor 192.168.1.2 weight 200"
  },
  {
    question: "What is the purpose of the OSPF router-id?",
    shortAnswer: "To uniquely identify a router within the OSPF domain.",
    explanation: "Router ID is a 32‑bit number, typically taken from the highest loopback IP or highest active interface IP. It is used for DR election and to identify routers in the link-state database. Changing the router ID requires resetting OSPF.",
    hint: "Router ID is like a name tag.",
    level: "basic",
    codeExample: "router-id 1.1.1.1"
  },
  {
    question: "What is BGP 'route damping'?",
    shortAnswer: "A mechanism to suppress unstable routes (flapping) by penalising them and not readvertising for a while.",
    explanation: "If a prefix flaps frequently, BGP assigns a penalty each time. When the penalty exceeds a suppress limit, the route is suppressed (not advertised). It is later reused after penalty decays below a reuse limit. Damping stabilises global routing tables.",
    hint: "Damping = 'punish flapping routes'.",
    level: "expert",
    codeExample: "bgp dampening 15 750 2000 60  # half-life, suppress, reuse, max-suppress"
  },
  {
    question: "What is the difference between internal BGP (iBGP) and an IGP (e.g., OSPF)?",
    shortAnswer: "IGP carries internal routes and calculates best path based on metric. iBGP carries external prefixes (learned via eBGP) and does not recalc metric; it requires full mesh or route reflectors.",
    explanation: "iBGP is used to propagate BGP routes inside an AS, but it does not compute shortest path; it relies on the IGP for next-hop reachability. The IGP (OSPF, IS‑IS, etc.) handles internal topology.",
    hint: "IGP = inside map; iBGP = border prefix delivery.",
    level: "advanced",
    codeExample: "# iBGP next-hop must be reachable via IGP"
  }
];

export default questions;