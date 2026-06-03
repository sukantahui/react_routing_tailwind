const questions = [
  {
    question: "What is the difference between broadcast and multicast addresses?",
    shortAnswer: "Broadcast addresses send to all nodes; multicast addresses send to a group of interested receivers.",
    explanation: "IPv4 broadcast is 255.255.255.255 or subnet-directed broadcast. Multicast uses Class D (224.0.0.0–239.255.255.255) and receivers join groups via IGMP.",
    hint: "Broadcast = everyone; multicast = only those who subscribed.",
    level: "basic",
    codeExample: "ping 224.0.0.1  # all multicast-capable hosts on local subnet"
  },
  {
    question: "What problem does Reverse Path Forwarding (RPF) solve in multicast?",
    shortAnswer: "Prevents loops when forwarding multicast packets by checking the incoming interface.",
    explanation: "RPF ensures a router forwards a multicast packet only if it arrives on the interface used to reach the source, avoiding duplicates.",
    hint: "If packet comes from wrong direction, drop it.",
    level: "intermediate"
  },
  {
    question: "Explain IGMP (Internet Group Management Protocol).",
    shortAnswer: "Protocol for hosts to join/leave multicast groups; used between hosts and local routers.",
    explanation: "IGMP versions: v1 (query/report), v2 (adds leave message), v3 (source-specific join). Routers use IGMP to learn group memberships.",
    hint: "Hosts say 'I want group 224.1.1.1'",
    level: "basic"
  },
  {
    question: "What is IGMP snooping and why is it important?",
    shortAnswer: "Layer 2 switch feature that listens to IGMP messages to forward multicast only to ports with interested hosts.",
    explanation: "Without snooping, switches flood multicast to all ports, wasting bandwidth. Snooping builds a multicast forwarding table.",
    hint: "Switch becomes smart about who wants multicast.",
    level: "intermediate"
  },
  {
    question: "Difference between PIM Dense Mode (DM) and Sparse Mode (SM).",
    shortAnswer: "DM assumes receivers everywhere, floods then prunes; SM assumes few receivers, uses rendezvous point (RP).",
    explanation: "DM pushes traffic initially to all routers; SM pulls traffic only when requested. SM scales better for large WAN.",
    hint: "DM = aggressive broadcast-like; SM = on-demand.",
    level: "advanced"
  },
  {
    question: "What is a rendezvous point (RP) in PIM-SM?",
    shortAnswer: "A meeting point where receivers discover sources in sparse mode multicast.",
    explanation: "Sources send to RP, receivers join tree to RP. After traffic flows, shortest-path tree may replace RP tree.",
    hint: "Think of a central coordinator for multicast groups.",
    level: "advanced"
  },
  {
    question: "How does broadcast behave in a switched network without loops?",
    shortAnswer: "Switches flood broadcast frames to all ports except the incoming one, reaching all hosts in the VLAN.",
    explanation: "Without loops (STP prevents loops), broadcast is delivered to every host in the broadcast domain.",
    hint: "Broadcast domain = VLAN."
  },
  {
    question: "What is a broadcast storm and how to prevent it?",
    shortAnswer: "Excessive broadcast traffic overwhelming network; prevent by loop prevention (STP) and limiting broadcast domains.",
    explanation: "Broadcast storms occur when loops exist, causing packets to circulate forever. STP blocks redundant links.",
    hint: "Spanning Tree Protocol is your friend."
  },
  {
    question: "What is the TTL value for local multicast (224.0.0.x)?",
    shortAnswer: "TTL should be 1; these addresses are link-local and not forwarded by routers.",
    explanation: "224.0.0.0/24 range is for routing protocols (OSPF, RIP, EIGRP) and other local group management.",
    hint: "Routers drop packets with TTL 0 after decrementing."
  },
  {
    question: "What is Anycast and how does it differ from multicast?",
    shortAnswer: "Anycast delivers to the nearest of several receivers using the same IP address; multicast delivers to all group members.",
    explanation: "Anycast is one-to-one-of-many; used in DNS root servers. Multicast is one-to-many.",
    hint: "Anycast: pick one server; multicast: send to all subscribers."
  },
  {
    question: "Why does multicast not use ARP?",
    shortAnswer: "Multicast IP to MAC mapping is algorithmic, not broadcast resolution.",
    explanation: "Multicast MAC address is derived by mapping last 23 bits of IP to 01:00:5E:xx:xx:xx. Hosts listen to that MAC.",
    hint: "No need to ask 'who has 224.1.1.1?'"
  },
  {
    question: "What is Source-Specific Multicast (SSM)?",
    shortAnswer: "Multicast where receivers specify both group address and source IP (channel).",
    explanation: "SSM uses IGMPv3 and eliminates need for RP, simplifying deployment and preventing unwanted sources.",
    hint: "Listen to 'channel (source, group)' like TV channel."
  },
  {
    question: "How does a host initially join a multicast group?",
    shortAnswer: "It sends an IGMP membership report to the group address or to 224.0.0.2 (all routers).",
    explanation: "Host reports its interest; router then includes the host's port in multicast distribution tree.",
    hint: "Join message triggers state on switch and router."
  },
  {
    question: "What is the role of the querier in IGMP?",
    shortAnswer: "Routers elect a querier that periodically sends general queries to check group membership.",
    explanation: "Querier sends queries to 224.0.0.1 (all hosts). Hosts respond with reports. If no response, group times out.",
    hint: "Who asks 'Who is still listening?'"
  },
  {
    question: "What is the difference between PIM-SM and PIM-DM convergence time?",
    shortAnswer: "DM converges quickly after flood-prune cycles; SM converges after RP discovery, slower initially.",
    explanation: "DM uses periodic floods; SM uses explicit joins. SM has better scalability but initial delay.",
    hint: "DM is aggressive, SM is polite."
  },
  {
    question: "Define 'multicast boundary' and how to set it.",
    shortAnswer: "A router configuration that stops multicast packets beyond a certain scope (e.g., by TTL or administrative scoping).",
    explanation: "Set multicast boundary to limit groups to a domain, e.g., `ip multicast boundary` with access-list.",
    hint: "Keep local chat local."
  },
  {
    question: "What is the default multicast TTL threshold for most applications?",
    shortAnswer: "No single default; typical values: 1 for link-local, 32 for site, 64 for region, 128 worldwide.",
    explanation: "Applications set TTL to limit scope; routers may filter based on TTL thresholds.",
    hint: "TTL decrement = scope shrink."
  },
  {
    question: "How does a switch treat a frame with destination MAC 01:00:5E:xx:xx:xx?",
    shortAnswer: "It forwards to ports that have IGMP reports for that multicast group (if snooping enabled) or floods without snooping.",
    explanation: "Multicast MAC is never learned dynamically; switches rely on IGMP snooping.",
    hint: "MAC address starts 01-00-5E."
  },
  {
    question: "What is the protocol number for IGMP in IP header?",
    shortAnswer: "Protocol number 2.",
    explanation: "IGMP messages are encapsulated directly in IP datagrams (not TCP/UDP).",
    hint: "Check `cat /etc/protocols`"
  },
  {
    question: "What is an SSM channel notation?",
    shortAnswer: "(S, G) where S is source IP, G is multicast group.",
    explanation: "Example (192.168.1.10, 232.1.1.1) – receive from specific source only.",
    hint: "Like tuning to a specific broadcast station."
  },
  {
    question: "Can a host send multicast packets without joining a group?",
    shortAnswer: "Yes, a host can send to any multicast address without joining; only receivers join.",
    explanation: "Sending is unrestricted. Routers may apply source filters.",
    hint: "Shouting to a room you're not in."
  },
  {
    question: "What is the maximum number of multicast groups a switch can track with IGMP snooping?",
    shortAnswer: "Vendor dependent; typical up to 1024–4096 groups.",
    explanation: "Limited by hardware TCAM. Exceeding causes fallback to flooding.",
    hint: "Enterprise switches have bigger tables."
  },
  {
    question: "Why is multicast not widely deployed on the public Internet?",
    shortAnswer: "Complexity of inter-domain multicast routing, lack of incentives for ISPs, and NAT traversal issues.",
    explanation: "BGP multicast extensions (MBGP) exist but adoption is low. Many use application-layer multicast instead.",
    hint: "CDNs use unicast to each viewer – simpler billing."
  },
  {
    question: "What is the difference between ASM and SSM?",
    shortAnswer: "ASM (Any-Source Multicast) – any source can send to group; SSM – only specific source.",
    explanation: "ASM requires RP; SSM uses IGMPv3 and is simpler, more secure.",
    hint: "ASM: wildcard source; SSM: fixed source."
  },
  {
    question: "What does 'admin scoping' mean for multicast?",
    shortAnswer: "Configuring multicast boundaries to limit address ranges to a domain (e.g., 239.0.0.0/8).",
    explanation: "Used for internal applications, prevents leakage.",
    hint: "Private multicast like private IPs."
  },
  {
    question: "What is the purpose of the 'ip multicast-routing' command?",
    shortAnswer: "Enables multicast routing (forwarding) on a Cisco router.",
    explanation: "Without this, router does not forward multicast packets between interfaces.",
    hint: "Mandatory for multicast routing."
  },
  {
    question: "How does a router know which multicast packets to forward to PIM neighbors?",
    shortAnswer: "PIM builds a multicast routing table using (S,G) or (*,G) entries based on joins and RPF.",
    explanation: "Each entry has incoming interface (RPF interface) and outgoing interface list.",
    hint: "Like unicast but with list of out interfaces."
  },
  {
    question: "What is the difference between (*,G) and (S,G) entries?",
    shortAnswer: "(*,G) is shared tree (any source); (S,G) is source-specific shortest path tree.",
    explanation: "In PIM-SM, receivers first join (*,G) to RP, then optionally switch to (S,G).",
    hint: "(*,G) = umbrella; (S,G) = direct."
  },
  {
    question: "What causes 'multicast routing table overflow'?",
    shortAnswer: "Too many active (S,G) entries exceeding router memory.",
    explanation: "Can be mitigated by limiting groups, using SSM, or filtering.",
    hint: "Each viewer + source pair consumes memory."
  },
  {
    question: "What is the purpose of the 'ip igmp join-group' command?",
    shortAnswer: "Makes a router itself join a multicast group (for testing or receiving).",
    explanation: "Router will accept packets destined to that group and can respond to pings.",
    hint: "Router becomes a receiver."
  }
];

export default questions;