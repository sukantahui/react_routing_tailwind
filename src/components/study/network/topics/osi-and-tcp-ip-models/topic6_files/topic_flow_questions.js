// topic6_files/topic_flow_questions.js
const questions = [
  {
    question: "What distinguishes flow‑based routing from destination‑based routing?",
    shortAnswer: "Flow‑based routing uses additional flow attributes (e.g., source IP, ports) to choose a path, not just the destination IP.",
    explanation: "Destination‑based routing forwards all packets with the same destination the same way, while flow‑based can split different flows across multiple paths.",
    hint: "Think of a highway vs multiple city streets leading to the same city.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is a 'flow' in the context of network routing?",
    shortAnswer: "A unidirectional sequence of packets between a source and destination, identified by a 5‑tuple (src IP, dst IP, src port, dst port, protocol).",
    explanation: "Sometimes a flow includes additional fields like VLAN ID or MPLS label. Flows are used to preserve ordering and apply per‑flow policies.",
    hint: "TCP/UDP conversations are natural flows.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Name two advantages of flow‑based routing over traditional shortest‑path routing.",
    shortAnswer: "Congestion avoidance and better load balancing across parallel links.",
    explanation: "By splitting flows, the network can use all available bandwidth, reducing loss and improving throughput for elephant flows.",
    hint: "Think of balancing cars across multiple lanes of a highway.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is Equal‑Cost Multi‑Path (ECMP) and how does it relate to flow‑based routing?",
    shortAnswer: "ECMP distributes traffic across multiple equal‑cost paths using a hash of flow fields (e.g., src/dst IP). It is a simple form of flow‑based routing.",
    explanation: "ECMP does not react to congestion; it is static. However, it provides load spreading and resilience.",
    hint: "Used in most IP routers for per‑flow load balancing.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Why is it important that all packets of a flow follow the same path?",
    shortAnswer: "To avoid packet reordering, which can confuse transport protocols (especially TCP) and degrade performance.",
    explanation: "TCP uses sequence numbers; reordering triggers fast retransmit or duplicate ACKs, leading to reduced throughput.",
    hint: "Same path ensures packets arrive in order.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is the main drawback of pure flow‑based routing in large networks?",
    shortAnswer: "Scalability – routers must maintain per‑flow state, which can be millions of concurrent flows, exhausting memory.",
    explanation: "Hardware tables (TCAM) have limited size. To mitigate, some systems use flow caching or sample flows.",
    hint: "Flow cache overflow → fallback to less granular routing.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How does MPLS Traffic Engineering (MPLS‑TE) implement flow‑based routing?",
    shortAnswer: "MPLS‑TE establishes explicit label‑switched paths (LSPs) for traffic trunks; paths can be calculated offline to avoid congestion.",
    explanation: "LSPs are set up using RSVP‑TE; flows are then mapped to these LSPs, allowing multi‑path routing.",
    hint: "MPLS‑TE is a classic example of flow‑aware traffic engineering.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the role of SDN (Software‑Defined Networking) in flow‑based routing?",
    shortAnswer: "An SDN controller can program flow tables in switches, implementing complex per‑flow policies and reacting to real‑time network conditions.",
    explanation: "OpenFlow allows wildcard rules and flow prioritisation, enabling adaptive flow‑based routing.",
    hint: "Centralised controller eliminates distributed algorithm complexity.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is 'flowlet switching'?",
    shortAnswer: "A technique that switches packets at the granularity of 'flowlets' – bursts of packets within a flow with idle gaps – allowing better load balancing.",
    explanation: "If a flow has natural gaps (e.g., TCP slow start), different flowlets can take different paths without causing reordering.",
    hint: "Helps balance elephant flows without breaking per‑flow order.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the difference between per‑flow and per‑packet load balancing?",
    shortAnswer: "Per‑flow: all packets of a flow use the same path; per‑packet: each packet independently can follow a different path (risk of reordering).",
    explanation: "Per‑packet can achieve perfect load balance but reordering is severe. Most networks use per‑flow hashing.",
    hint: "Per‑packet is rarely used except in controlled environments.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "How does flow‑based routing help in data center networks (e.g., Fat‑tree)?",
    shortAnswer: "It can spread large flows across multiple paths to avoid congestion in the top‑of‑rack switches, reducing flow completion time.",
    explanation: "Data centers use ECMP or adaptive flow routing (e.g., Hedera, CONGA) to balance load.",
    hint: "Elephant flows are split to prevent them from blocking mice flows.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is 'flow affinity' and why is it important?",
    shortAnswer: "The property that all packets of a flow should traverse the same path (or a set of paths) to preserve order.",
    explanation: "Breaking affinity may cause reordering; some applications (like video streaming) are less sensitive.",
    hint: "TCP's performance depends on affinity.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "Name a disadvantage of hashing flows across ECMP paths.",
    shortAnswer: "Static hashing cannot adapt to congestion; if one path becomes overloaded, flows continue to be sent there.",
    explanation: "A single large flow may cause imbalance; advanced algorithms like flowlet or CONGA use congestion feedback.",
    hint: "Hash collisions can also cause imbalance.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is 'Q‑Routing' in the context of flow‑based routing?",
    shortAnswer: "A reinforcement learning‑based routing algorithm where each node learns the best next hop based on delays (Q‑learning).",
    explanation: "It can adapt to traffic changes but may converge slowly.",
    hint: "Used in early research for adaptive routing.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the difference between 'reactive' and 'proactive' flow‑based routing?",
    shortAnswer: "Reactive: set up path when a new flow arrives (e.g., OpenFlow with controller). Proactive: pre‑install flow entries based on traffic patterns.",
    explanation: "Reactive reduces overhead for idle flows but adds latency for first packet.",
    hint: "SDN often uses reactive for unknown flows.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is 'flow table overflow' and how can it be mitigated?",
    shortAnswer: "When a switch’s flow table (e.g., TCAM) runs out of entries, new flows cannot be installed, causing fallback to slow‑path.",
    explanation: "Mitigations include flow aggregation (e.g., wildcard rules), ageing out idle flows, or using a hybrid approach.",
    hint: "Hardware tables are expensive and power‑hungry.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the role of the 'flow cache' in conventional routers?",
    shortAnswer: "A lookup cache that stores recently seen flows; subsequent packets of a flow are switched via fast‑path, bypassing the routing daemon.",
    explanation: "Used in many high‑speed routers to achieve line‑rate forwarding while maintaining per‑flow state.",
    hint: "Cisco's NetFlow uses flow caches.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How does flow‑based routing contribute to network security?",
    shortAnswer: "By monitoring per‑flow statistics, abnormal flows (e.g., DDoS) can be detected and filtered or rate‑limited.",
    explanation: "Flow‑aware firewalls and intrusion detection systems use flow data.",
    hint: "NetFlow/IPFIX exports flow records.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is 'CONGA' (Congestion‑Aware) routing in data centers?",
    shortAnswer: "A distributed flow‑based routing protocol that uses load metrics to dynamically split traffic across multiple paths, avoiding congestion.",
    explanation: "CONGA uses a token‑based mechanism to select the least loaded path for each flowlet.",
    hint: "Used in Google's Jupiter network.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is 'flow completion time' (FCT) and why is it important for flow‑based routing?",
    shortAnswer: "The time from when a flow’s first packet is sent until its last packet is received; minimising FCT is a key goal in data centers.",
    explanation: "Flow‑based routing can reduce FCT by avoiding congestion and giving priority to short flows.",
    hint: "Short flows (< 100 KB) make up most web traffic.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the difference between 'big data' (elephant) flows and 'mice' flows?",
    shortAnswer: "Elephant flows are long‑lived and transfer a large amount of data (e.g., file backups); mice flows are short (e.g., web requests).",
    explanation: "Flow‑based routing may treat them differently: elephant flows can be explicitly placed on less loaded paths to avoid interfering with mice flows.",
    hint: "Identifying flows by size helps scheduling.",
    level: "moderate",
    codeExample: null
  },
  {
    question: "What is 'Hedera' in the context of data center flow routing?",
    shortAnswer: "A centralised flow scheduler that detects elephant flows and re‑routes them to less congested paths in a fat‑tree network.",
    explanation: "Hedera uses a two‑phase approach: detect large flows, then assign new paths.",
    hint: "Works on OpenFlow‑enabled switches.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How does flow‑based routing interact with explicit congestion notification (ECN)?",
    shortAnswer: "ECN marks packets when congestion is building; a flow‑based router can use these marks to adjust path assignment or rate‑limit flows.",
    explanation: "Congestion feedback can be fed into the routing algorithm for dynamic load balancing.",
    hint: "Used in DCTCP for data centers.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the relationship between flow‑based routing and network function virtualization (NFV)?",
    shortAnswer: "Flow‑based routing can steer traffic through specific virtual network functions (e.g., firewall, load balancer) based on flow attributes.",
    explanation: "Service function chaining (SFC) uses flow‑based routing to enforce ordered service chains.",
    hint: "Each flow can follow a different set of middleboxes.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is 'source routing' and how does it relate to flow‑based routing?",
    shortAnswer: "Source routing allows the sender to specify the entire path; this can be used per flow but suffers from scalability issues.",
    explanation: "Modern variants like Segment Routing (SR) combine source routing with flow‑based traffic engineering.",
    hint: "SR‑MPLS and SRv6 are flow‑aware.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the 'hash collision' problem in ECMP and how can it be mitigated?",
    shortAnswer: "Two different flows may map to the same path, causing imbalance; mitigation includes using better hash functions (e.g., Toeplitz) or re‑hashing with seeds.",
    explanation: "Weighted ECMP can assign flows according to link capacities.",
    hint: "Randomised hash seeds across switches can help.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is 'flowlet‑aware' load balancing and why does it avoid reordering?",
    shortAnswer: "It splits flows into bursts (flowlets) separated by idle gaps; each flowlet can take a different path because the gap ensures order is preserved.",
    explanation: "If the idle gap is larger than the maximum path delay difference, reordering cannot happen.",
    hint: "Idle gaps occur naturally in TCP due to slow start and ACK delays.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is 'residual path capacity' and how is it used in flow‑based routing?",
    shortAnswer: "The spare bandwidth on a link after current traffic; flow‑based algorithms assign new flows to paths with highest residual capacity.",
    explanation: "Requires knowledge of current link utilisation, which can be queried by an SDN controller or signalled via protocols.",
    hint: "Min‑max utilisation algorithms aim to maximise residual capacity.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How does flow‑based routing handle failures of a link?",
    shortAnswer: "Flows affected by the failure must be rerouted; this can be done rapidly by updating flow tables (SDN) or using fast‑reroute techniques (e.g., MPLS‑TE FRR).",
    explanation: "The same flow may be split across multiple new paths after convergence.",
    hint: "Micro‑flows may experience packet loss during reroute.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the role of 'flow prioritisation' in flow‑based routing?",
    shortAnswer: "Not all flows have the same importance; high‑priority flows (e.g., control, real‑time) can be given dedicated paths or higher bandwidth.",
    explanation: "Achieved through QoS marking (DSCP) and admission control.",
    hint: "Emergency traffic may pre‑empt other flows.",
    level: "moderate",
    codeExample: null
  }
];

export default questions;