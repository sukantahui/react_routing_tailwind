const questions = [
  {
    question: "What is the Bellman-Ford equation in Distance Vector routing?",
    shortAnswer: "It calculates the minimum cost path to a destination using neighbor's distances.",
    explanation: "The equation dx(y) = min_v { c(x,v) + dv(y) } computes the least cost from node x to y by considering each neighbor v and adding link cost and neighbor's distance.",
    hint: "Think about how you would ask neighbors for directions and pick the shortest total.",
    level: "basic",
    codeExample: "// Conceptual: for each neighbor:\nnew_cost = cost_to_neighbor + neighbor.dist[dest];\ndist[dest] = min(dist[dest], new_cost);"
  },
  {
    question: "How often do RIP routers typically exchange full routing tables?",
    shortAnswer: "Every 30 seconds by default.",
    explanation: "RIP sends periodic updates every 30 seconds. Each update contains the entire routing table (distance vector). Routers also send triggered updates immediately on topology change.",
    hint: "Observe that frequent updates cause traffic overhead but improve convergence.",
    level: "basic",
    codeExample: "router rip\n version 2\n network 192.168.1.0"
  },
  {
    question: "Explain Count-to-Infinity problem with a three-router chain A—B—C where link C–D fails.",
    shortAnswer: "A and B keep updating each other with increasing hop counts to D because they don't immediately know the link is dead.",
    explanation: "C stops reaching D, but B thinks it can reach D via C (advertises 2). A learns from B (cost 3), B updates from A (cost 4), cycles until infinity (16 in RIP).",
    hint: "Bad news travels slowly due to reliance on neighbors' updates.",
    level: "intermediate",
    codeExample: "Without poison reverse: convergence time ~ minutes"
  },
  {
    question: "What is split horizon and its role in DV routing?",
    shortAnswer: "Prevents a router from advertising a route back to the neighbor it learned that route from.",
    explanation: "If router B learns route to X from A, B will not advertise that route to A, reducing possibility of loops.",
    hint: "Don't send back what you just received from the same neighbor.",
    level: "intermediate",
    codeExample: "// On router B, for neighbor A: do NOT include prefix learned via A"
  },
  {
    question: "How does poison reverse improve upon split horizon?",
    shortAnswer: "It advertises routes back with infinite metric (16 for RIP).",
    explanation: "Instead of not advertising, router B sends route to X with metric infinity back to A, quickly breaking loops.",
    hint: "Tell the neighbor explicitly 'I can't reach X via you' to override false info.",
    level: "advanced",
    codeExample: "Router B advertises 192.168.5.0/24 with metric 16 (unreachable) to A."
  },
  {
    question: "Define 'infinity' in Distance Vector protocols and typical value.",
    shortAnswer: "Maximum metric value that represents unreachable; RIP uses 16 hops.",
    explanation: "Infinity sets a maximum network diameter. Once metric reaches infinity, route is considered unreachable, stopping count-to-infinity.",
    hint: "RIP limit of 15 hops means network diameter ≤15.",
    level: "basic",
    codeExample: "Maximum hop count = 15, infinity = 16"
  },
  {
    question: "Differentiate periodic update vs triggered update.",
    shortAnswer: "Periodic: scheduled every 30s; Triggered: immediate after topology change.",
    explanation: "Periodic ensures eventual consistency; Triggered accelerates convergence. Both are essential for stable DV networks.",
    hint: "Consider a link down event — waiting 30 seconds would cause long blackholes",
    level: "intermediate",
    codeExample: "triggered update: ip rip triggered"
  },
  {
    question: "What is a routing loop? How does distance vector cause one?",
    shortAnswer: "Packets cycling among routers due to inconsistent tables; DV's slow propagation of failures causes loops.",
    explanation: "When routers have outdated paths referencing each other, packets bounce. Count-to-infinity is a severe loop scenario.",
    hint: "Observe A→B→C→A ... wasteful forwarding",
    level: "intermediate",
    codeExample: "traceroute may show same IP addresses repeatedly"
  },
  {
    question: "Why are hold-down timers used in distance vector protocols?",
    shortAnswer: "Prevent frequent flapping by ignoring updates for a route that just went down.",
    explanation: "After a route becomes unreachable, a hold-down timer (e.g., 180s) stops the router from accepting better routes, reducing oscillations.",
    hint: "Stops network from accepting potentially stale improved routes until network stabilizes",
    level: "advanced",
    codeExample: "holddown timer: 180 seconds in RIP"
  },
  {
    question: "What is the main limitation of hop count metric in RIP?",
    shortAnswer: "Doesn't consider link bandwidth, delay, or reliability.",
    explanation: "A 10 Mbps and 1 Gbps link both count as 1 hop, leading to suboptimal paths.",
    hint: "Two paths with 2 hops each — which one is truly faster?",
    level: "basic",
    codeExample: "RIP prefers 3 hops over 2 hops even if 2 hop link is extremely slow"
  },
  {
    question: "Explain how Distance Vector handles link cost changes (decrease).",
    shortAnswer: "Good news propagates quickly; router updates neighbors immediately.",
    explanation: "If cost decreases, router updates its distance vector and sends triggered update, achieving fast convergence.",
    hint: "New shorter path spreads like a wave",
    level: "intermediate",
    codeExample: "Triggered update to all neighbors on cost reduction"
  },
  {
    question: "Why does Distance Vector suffer from slow convergence for link failures?",
    shortAnswer: "Routers only know next-hop info, not network-wide topology, leading to waiting for timers.",
    explanation: "Because each router only knows distances reported by neighbors, when a link fails, they must wait to discover new metrics or until infinity.",
    hint: "No global sync — information propagates one hop per update interval"
  },
  {
    question: "Compare Distance Vector and Link State routing in one sentence.",
    shortAnswer: "DV shares distance tables with neighbors; LS floods link-state information network-wide.",
    explanation: "DV is simpler but slower convergence; LS is more complex but faster and less loop-prone.",
    hint: "Think rumor-based (DV) vs map-based (LS).",
    level: "intermediate"
  },
  {
    question: "What is route poisoning?",
    shortAnswer: "Mark a failed route with infinite metric to quickly inform neighbors.",
    explanation: "Immediately after detecting down link, router sets metric to infinity and advertises it.",
    hint: "Using poison to kill false info."
  },
  {
    question: "What is the difference between split horizon and split horizon with poison reverse?",
    shortAnswer: "SH simply suppresses advertisement, SH with poison reverse sends infinite metric.",
    explanation: "Poison reverse is more aggressive and can kill loops faster but increases update size slightly.",
    hint: "Which one sends 'I can't reach' message?"
  },
  {
    question: "How does EIGRP differ from traditional Distance Vector?",
    shortAnswer: "EIGRP is an advanced DV with Diffusing Update Algorithm (DUAL) for fast convergence.",
    explanation: "EIGRP maintains neighbor tables and uses feasible successors, avoiding loops and reducing convergence time.",
    hint: "Cisco-proprietary but hybrid."
  },
  {
    question: "Compute distance from A to D: A-B (2), B-D(3), A-C(4), C-D(1)",
    shortAnswer: "Minimum = 5 (A→B→D)",
    explanation: "Possible paths: A-B-D cost 5, A-C-D cost 5, both equal. Bellman-Ford picks either.",
    hint: "Apply min(c(A,B)+B to D) and min(c(A,C)+C to D)."
  },
  {
    question: "What are the symptoms of count-to-infinity in a production RIP network?",
    shortAnswer: "Packet loss, high latency, and routing table entries stuck at 16 hops.",
    explanation: "During count-to-infinity, routers keep incrementing hop count until infinity, causing blackholes and looping traffic.",
    hint: "Show 'debug ip rip' logs with increasing metric"
  },
  {
    question: "Why periodic updates cause unnecessary bandwidth consumption?",
    shortAnswer: "Even if network stable, every 30s full table transmission.",
    explanation: "Can be mitigated by using triggered extensions or route summarization.",
    hint: "Inefficient in large networks"
  },
  {
    question: "What is the purpose of 'route tag' in distance vector?",
    shortAnswer: "Carry additional info like protocol origin or redistribution metadata.",
    explanation: "Used in multi-protocol environments to prevent routing loops between different routing domains.",
    hint: "BGP communities-like but for DV"
  },
  {
    question: "When would you still use RIP in modern networks?",
    shortAnswer: "Lab environments, extremely small networks, or legacy device support.",
    explanation: "RIPv2 easy to configure, supports authentication, but rarely in large networks due to slow convergence.",
    hint: "Edge of a small branch"
  },
  {
    question: "What is request-response mechanism in DV?",
    shortAnswer: "Routers can solicit full routing tables from neighbors via request messages.",
    explanation: "When a router boots, it sends a request to get initial vectors from neighbors.",
    hint: "Used at cold start"
  },
  {
    question: "How does route summarization improve distance vector performance?",
    shortAnswer: "Reduces table size and propagation overhead.",
    explanation: "Routers advertise a single aggregate prefix, reducing number of entries exchanged.",
    hint: "Classful auto-summary in RIPv1"
  },
  {
    question: "What are feasible successors in advanced distance vector?",
    shortAnswer: "A backup route that is loop-free and can be used immediately.",
    explanation: "Used in EIGRP: a neighbor whose advertised distance is less than the feasible distance."
  },
  {
    question: "Explain the term 'distance' in Distance Vector.",
    shortAnswer: "A metric (hop count, cost, delay) representing path cost.",
    explanation: "Each destination has a scalar distance; vector is list of such distances.",
    hint: "One dimension per dest"
  },
  {
    question: "What is the maximum hop count for RIPv1 and RIPv2?",
    shortAnswer: "15 hops (max network diameter), 16 = unreachable.",
    explanation: "Due to infinity definition designed to stop counting.",
    hint: "15 hop limit restricts growth"
  },
  {
    question: "How does a router detect dead neighbor in DV?",
    shortAnswer: "If no update received within timeout (180s RIP), neighbor declared dead.",
    explanation: "RIP uses invalid timer and hold-down timer to expire routes.",
    hint: "Timeout + garbage collection"
  },
  {
    question: "What is the garbage collection timer?",
    shortAnswer: "Time to remove a dead route from routing table after hold-down expires.",
    explanation: "Default 120s for RIP: after route flushes, removal occurs.",
    hint: "Cleanup phase"
  },
  {
    question: "What is the impact of link-state advertisement in distance vector? Not typical, but describe hybrid behavior.",
    shortAnswer: "DV normally never floods LSAs, hybrid types (EIGRP) use partial updates.",
    explanation: "Hybrid uses limited link-state properties.",
    hint: "Balanced hybrid"
  }
];

export default questions;