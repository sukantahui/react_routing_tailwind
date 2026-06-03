// File: src/components/topics/Topic0/topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is the primary purpose of routing in a network?",
    shortAnswer: "To determine the optimal path for data packets from source to destination.",
    explanation: "Routing ensures that packets traverse the network efficiently, avoiding congestion and failures. Routers use routing tables to make next-hop decisions.",
    hint: "Think about how a letter finds its way through post offices.",
    level: "basic",
    codeExample: "// No code, conceptual only"
  },
  {
    question: "What is the difference between a routing table and a forwarding table?",
    shortAnswer: "Routing table contains all known routes; forwarding table is optimized for fast lookups.",
    explanation: "Routers build a routing table using protocols (static or dynamic). The best routes are then placed into the forwarding table (or FIB) used for actual packet switching.",
    hint: "One is for learning, the other for fast action.",
    level: "intermediate",
    codeExample: "show ip route vs show ip cef on Cisco routers"
  },
  {
    question: "Explain the concept of 'next-hop' routing.",
    shortAnswer: "Each router only knows the next router to send a packet to, not the full path.",
    explanation: "Next-hop routing reduces table size and overhead. Routers forward packets to a neighboring router that is closer to the destination, repeating until delivery.",
    hint: "Consider asking for directions one step at a time.",
    level: "basic",
    codeExample: "ip route 192.168.1.0 255.255.255.0 10.0.0.1"
  },
  {
    question: "What are the advantages of static routing over dynamic routing?",
    shortAnswer: "Simplicity, no overhead, and predictable behavior in small networks.",
    explanation: "Static routes are manually configured and do not generate protocol traffic. They are secure and predictable but do not adapt to failures.",
    hint: "When would you not want a router to automatically change paths?",
    level: "basic",
    codeExample: "ip route 0.0.0.0 0.0.0.0 192.168.1.1  // default static route"
  },
  {
    question: "What is a routing loop and how can it be prevented?",
    shortAnswer: "A routing loop occurs when packets bounce between routers endlessly. Prevention includes TTL and loop-avoidance protocols like split horizon.",
    explanation: "Routing loops often happen due to inconsistent tables. TTL (Time To Live) field in IP headers eventually discards looping packets. Dynamic routing protocols use mechanisms like split horizon and route poisoning.",
    hint: "What stops a packet from living forever?",
    level: "intermediate",
    codeExample: "TTL field in IPv4 header starts at 64 and decrements each hop."
  },
  {
    question: "What is a default gateway and why is it needed?",
    shortAnswer: "The default gateway is the router that a host sends packets to when the destination is not on the local network.",
    explanation: "Without a default gateway, hosts would need a route to every possible destination. It provides a 'last resort' path to reach external networks.",
    hint: "What does your computer do when it doesn't recognize the destination IP?",
    level: "basic",
    codeExample: "ip route add default via 192.168.1.1"
  },
  {
    question: "Describe the difference between unicast, broadcast, and multicast routing.",
    shortAnswer: "Unicast is one-to-one, broadcast is one-to-all, multicast is one-to-many (group).",
    explanation: "Unicast routing forwards to a single destination. Broadcast sends to all nodes on a subnet. Multicast delivers to a group of interested receivers, saving bandwidth.",
    hint: "Think of a letter, a town crier, and a subscription list.",
    level: "intermediate",
    codeExample: "IGMP for multicast, ARP for broadcast inside LAN."
  },
  {
    question: "What is administrative distance (AD) in routing?",
    shortAnswer: "AD is a measure of trustworthiness of a route source; lower values are preferred.",
    explanation: "When a router learns the same destination from multiple protocols (e.g., OSPF and static), it uses AD to choose. Static routes (AD=1) beat OSPF (AD=110).",
    hint: "Which route source would you trust more: a manually typed map or a neighbor's rumor?",
    level: "expert",
    codeExample: "Cisco: 'show ip route' shows [AD/metric]"
  },
  {
    question: "What is route summarization and why is it useful?",
    shortAnswer: "Combining multiple routes into a single, broader route to reduce table size.",
    explanation: "Summarization (or aggregation) reduces the number of routes in tables, speeding up lookups and reducing protocol overhead. It also improves stability by hiding flapping subnets.",
    hint: "Instead of listing every street, just say 'downtown'.",
    level: "expert",
    codeExample: "ip route 192.168.0.0 255.255.252.0 Null0  // summary route"
  },
  {
    question: "Explain the concept of equal-cost multi-path (ECMP) routing.",
    shortAnswer: "ECMP allows a router to distribute traffic across multiple paths with equal cost.",
    explanation: "ECMP increases bandwidth and redundancy. Per-flow or per-packet hashing determines which path each packet takes. It is used in data centers and with OSPF.",
    hint: "Two roads of same length – send half the cars on each.",
    level: "expert",
    codeExample: "OSPF max-path 4"
  },
  {
    question: "What are the main differences between distance-vector and link-state routing protocols?",
    shortAnswer: "Distance-vector shares neighbor's tables (routing by rumor); link-state shares topology maps (each router builds full graph).",
    explanation: "Distance-vector (RIP) is simpler but slower to converge and prone to loops. Link-state (OSPF) uses Dijkstra's algorithm, converges faster, but uses more memory.",
    hint: "One brags about distances to neighbors; the other draws a complete map.",
    level: "intermediate",
    codeExample: "RIP vs OSPF configuration"
  },
  {
    question: "What is the purpose of the Time-to-Live (TTL) field in IP?",
    shortAnswer: "Prevents packets from looping forever by limiting the maximum number of hops.",
    explanation: "Each router decrements TTL by 1. When TTL reaches 0, the packet is discarded and an ICMP Time Exceeded message is sent to the source. This is also how traceroute works.",
    hint: "Every hop is one year off a 64-year lifespan.",
    level: "basic",
    codeExample: "traceroute uses TTL expiration to discover hops"
  },
  {
    question: "What is a 'black hole' in routing?",
    shortAnswer: "A route that silently drops packets without notification.",
    explanation: "Black holes occur when a router has a route that leads to a null interface or a destination that does not exist but the router does not return an error. They are hard to debug.",
    hint: "Packets go in and never come out, no error message.",
    level: "intermediate",
    codeExample: "ip route 192.168.5.0 255.255.255.0 Null0"
  },
  {
    question: "How does policy-based routing (PBR) differ from destination-based routing?",
    shortAnswer: "PBR forwards packets based on criteria other than destination IP (e.g., source, protocol, application).",
    explanation: "PBR gives network administrators granular control. For example, video traffic from a specific subnet can be sent through a different next-hop than web traffic.",
    hint: "Not all packets are created equal; some get VIP treatment.",
    level: "expert",
    codeExample: "route-map PBR permit 10 match ip address 100 set ip next-hop 10.1.1.1"
  },
  {
    question: "What is the role of the routing table's 'metric' field?",
    shortAnswer: "A metric indicates the cost of a route; lower metric is preferred.",
    explanation: "Different protocols use different metrics: hop count (RIP), bandwidth/delay (EIGRP), cumulative cost (OSPF). The metric allows the router to choose the best path among multiple routes to the same destination.",
    hint: "The lowest number wins the race.",
    level: "basic",
    codeExample: "Metric values visible in 'show ip route' output"
  },
  {
    question: "Explain the difference between interior and exterior gateway protocols (IGP vs EGP).",
    shortAnswer: "IGPs run inside a single autonomous system (OSPF, RIP); EGPs run between ASes (BGP).",
    explanation: "IGPs optimize for speed and convergence within a network you control. BGP (the only EGP today) deals with policy and scale between different organizations.",
    hint: "Inside one company vs between different companies.",
    level: "intermediate",
    codeExample: "OSPF (IGP) vs BGP (EGP)"
  },
  {
    question: "What are route flaps and how do they affect network stability?",
    shortAnswer: "Route flaps are frequent up/down changes of a route, causing instability and CPU load.",
    explanation: "Flapping forces repeated routing updates and recalculations. Many protocols implement route dampening to suppress flapping routes temporarily.",
    hint: "A light switch flickering on and off — annoying for everyone.",
    level: "expert",
    codeExample: "BGP route dampening configuration"
  },
  {
    question: "What is the significance of the 'next-hop' being directly connected?",
    shortAnswer: "A directly connected next-hop means the router can send the packet without another IP lookup.",
    explanation: "If the next-hop IP is on the same subnet as the outgoing interface, the router uses ARP to find its MAC and forwards directly. Otherwise, it must perform another route lookup.",
    hint: "The neighbor is next door; no need to ask for further directions.",
    level: "intermediate",
    codeExample: "Route entry: via 192.168.1.2, directly connected, eth0"
  },
  {
    question: "How does a router choose between multiple routes with the same administrative distance and metric?",
    shortAnswer: "It performs load balancing across the equal-cost paths (ECMP).",
    explanation: "The router distributes traffic among the equally good paths. The distribution can be per-packet (rare) or per-flow (common) to avoid reordering.",
    hint: "When two roads are exactly as good, split the traffic.",
    level: "expert",
    codeExample: "OSPF automatically load balances up to 4 equal-cost paths by default."
  },
  {
    question: "What is a 'recursive route lookup'?",
    shortAnswer: "When the next-hop of a route is not directly reachable, requiring another route lookup.",
    explanation: "Static routes can point to an IP that is not on a connected network. The router recursively resolves that IP using another route until a directly connected hop is found.",
    hint: "A signpost that points to another signpost before the final direction.",
    level: "expert",
    codeExample: "ip route 10.1.1.0 255.255.255.0 192.168.100.5 (requires route to 192.168.100.5)"
  },
  {
    question: "Explain the concept of 'route redistribution'.",
    shortAnswer: "Injecting routes learned from one routing protocol into another protocol.",
    explanation: "Redistribution allows disparate routing domains (e.g., OSPF and EIGRP) to exchange routes. Care must be taken to avoid loops and suboptimal paths using route maps and metrics.",
    hint: "Translator between two different languages.",
    level: "expert",
    codeExample: "redistribute eigrp 100 subnets under OSPF"
  },
  {
    question: "What is the purpose of a 'null0' route?",
    shortAnswer: "A dummy route that discards packets, often used for summarization to prevent loops.",
    explanation: "When you summarize, you create a discard route (to Null0) that matches the summary but with a higher metric. It catches packets that match the summary but have no more specific route, preventing loops.",
    hint: "A trash bin for packets that shouldn't exist.",
    level: "expert",
    codeExample: "ip route 192.168.0.0 255.255.252.0 Null0 250"
  },
  {
    question: "What is 'policy-based routing' (PBR) and when would you use it?",
    shortAnswer: "PBR forwards packets based on criteria beyond destination IP, like source or protocol.",
    explanation: "Use PBR when you need different paths for different types of traffic (e.g., VoIP over a low-latency link, bulk data over cheap link).",
    hint: "Let managers take the express lane, interns the scenic route.",
    level: "expert",
    codeExample: "route-map PBR permit match ip address 101 set ip next-hop 10.1.1.1"
  },
  {
    question: "What is the difference between 'hop-by-hop' routing and 'source routing'?",
    shortAnswer: "Hop-by-hop: each router decides independently. Source routing: the source specifies the entire path.",
    explanation: "Hop-by-hop is standard IP routing. Source routing is rarely used today due to security risks (attackers could bypass filters). IPv6 had a source routing option but it's deprecated.",
    hint: "One is like asking directions at each corner; the other is a printed map from the start.",
    level: "intermediate",
    codeExample: "IP option for Loose Source Route (rare)"
  },
  {
    question: "What is 'route poisoning' in distance-vector protocols?",
    shortAnswer: "Advertising a route with an infinite metric to indicate it is unreachable.",
    explanation: "When a route fails, the router advertises it with a metric of 16 (RIP) which is 'infinity'. This quickly informs neighbors that the route is dead, preventing count-to-infinity loops.",
    hint: "Shouting 'road closed, reroute' to all neighbors.",
    level: "intermediate",
    codeExample: "RIP sends metric 16 for a failed route."
  },
  {
    question: "How does 'split horizon' help prevent routing loops?",
    shortAnswer: "It prevents a router from advertising a route back out the interface from which it learned that route.",
    explanation: "Split horizon ensures that if router A tells B about a network, B will not tell A about that same network. This stops many loops in distance-vector protocols.",
    hint: "Don't give back the information someone just gave you.",
    level: "intermediate",
    codeExample: "Enabled by default in RIP and most distance-vector implementations."
  },
  {
    question: "What is the 'count-to-infinity' problem?",
    shortAnswer: "A slow convergence issue in distance-vector protocols where metrics increase slowly to infinity during a network failure.",
    explanation: "Routers increment metrics and pass around bad information, taking many rounds to realize a route is dead. Poison reverse and split horizon mitigate this.",
    hint: "Bad news travels slowly when everyone keeps adding one.",
    level: "expert",
    codeExample: "RIP's maximum 15 hops is a hard limit that stops count-to-infinity."
  },
  {
    question: "What is a 'floating static route'?",
    shortAnswer: "A static route with a higher administrative distance that acts as a backup to dynamic routing.",
    explanation: "You configure a static route with AD higher than the dynamic protocol (e.g., 150 for a backup). It only appears in the table when the primary route disappears.",
    hint: "An understudy actor who only goes on stage when the lead is sick.",
    level: "intermediate",
    codeExample: "ip route 0.0.0.0 0.0.0.0 10.2.2.1 150"
  },
  {
    question: "Explain the concept of 'bidirectional forwarding detection' (BFD).",
    shortAnswer: "A lightweight protocol that detects link failures quickly, often used with routing protocols.",
    explanation: "Instead of waiting for routing protocol timers (seconds), BFD can detect failures in milliseconds, triggering faster reconvergence.",
    hint: "A heart‑beat monitor instead of a periodic call.",
    level: "expert",
    codeExample: "bfd interval 300 min_rx 300 multiplier 3"
  },
  {
    question: "What is the role of the 'routing daemon' in a Linux router?",
    shortAnswer: "Userspace process (e.g., FRRouting, Quagga) that manages routing protocols and kernel route table.",
    explanation: "The kernel forwards packets using the FIB. The routing daemon runs protocols (OSPF, BGP), calculates best routes, and installs them into the kernel.",
    hint: "The brain that decides routes, and the muscles that execute.",
    level: "intermediate",
    codeExample: "systemctl start frr"
  }
];

export default questions;