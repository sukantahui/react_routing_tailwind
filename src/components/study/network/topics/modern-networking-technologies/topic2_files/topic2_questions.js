// topic2_files/topic2_questions.js
// 30 questions covering SDN architecture, OpenFlow, controllers, northbound/southbound APIs, real-world deployment, and troubleshooting.

const questions = [
  {
    question: "What is SDN and how does it differ from traditional networking?",
    shortAnswer: "SDN decouples the control plane from the data plane, centralizing network intelligence in a software controller.",
    explanation: "Traditional networks have each device make forwarding decisions independently. SDN moves decision-making to a controller, switches become simple forwarders.",
    hint: "Think of a traffic system where each intersection has its own policeman vs a central traffic control room.",
    level: "basic",
    codeExample: "Traditional: routing protocols (OSPF, BGP) on each router. SDN: controller installs flows via OpenFlow."
  },
  {
    question: "Explain the role of the SDN controller.",
    shortAnswer: "The controller is the centralized 'brain' that manages network policies, topology, and installs flow rules on switches.",
    explanation: "It abstracts the underlying hardware, provides northbound APIs for applications, and communicates southbound to switches.",
    hint: "Controller = network operating system.",
    level: "basic",
    codeExample: "OpenDaylight, ONOS, Ryu, Floodlight are examples of controllers."
  },
  {
    question: "What is OpenFlow and why is it important?",
    shortAnswer: "OpenFlow is a southbound protocol that allows the controller to add, modify, and remove flow entries in switch flow tables.",
    explanation: "It was the first widely adopted SDN protocol, defining match fields, actions, counters, and priority.",
    hint: "OpenFlow is the language controllers use to speak to switches.",
    level: "basic",
    codeExample: "OpenFlow 1.3 supports multiple tables, groups, meters, and IPv6."
  },
  {
    question: "What are the main components of an OpenFlow flow entry?",
    shortAnswer: "Match fields, priority, counters, instructions/actions, timeouts, and cookie.",
    explanation: "Match fields (ingress port, MAC, IP, TCP/UDP ports). Priority decides which rule wins. Instructions: apply actions, goto next table.",
    hint: "It's like a routing table on steroids.",
    level: "intermediate",
    codeExample: "Match: ip, nw_dst=10.0.0.2; Priority: 100; Action: output=2"
  },
  {
    question: "What is the difference between proactive and reactive flow setup?",
    shortAnswer: "Proactive: controller pre-installs flows. Reactive: controller installs flows on first packet (packet-in).",
    explanation: "Proactive reduces latency and controller load but requires knowledge of traffic patterns. Reactive is flexible but adds delay for first packet.",
    hint: "Reactive = learn on the fly; Proactive = plan ahead.",
    level: "intermediate",
    codeExample: "Reactive: ARP triggers packet-in; Proactive: static flows for all known MACs."
  },
  {
    question: "What is the northbound API in SDN?",
    shortAnswer: "The interface between the SDN controller and higher-level applications (e.g., load balancer, firewall, monitoring).",
    explanation: "Typically RESTful APIs that abstract network details. Applications send intents or policies; controller translates them into flow rules.",
    hint: "Northbound = application-facing side.",
    level: "basic",
    codeExample: "POST /restconf/config/... to create a flow using RESTCONF on OpenDaylight."
  },
  {
    question: "What is the southbound API in SDN?",
    shortAnswer: "The interface between the controller and network devices (switches, routers).",
    explanation: "OpenFlow is the classic example. Others: NETCONF, OVSDB, gRPC, P4 Runtime.",
    hint: "Southbound = device-facing side.",
    level: "basic",
    codeExample: "Controller sends OFPT_FLOW_MOD message to add a flow."
  },
  {
    question: "Explain the concept of 'flow' in OpenFlow.",
    shortAnswer: "A flow is a sequence of packets matching a specific pattern (e.g., source/dest IP, port, protocol). The controller installs a flow entry that defines how to handle that flow.",
    explanation: "Flows can be microflows (exact 5‑tuple) or aggregated (wildcarded).",
    hint: "A flow is like a conversation between two endpoints.",
    level: "intermediate",
    codeExample: "A web request from 192.168.1.2:54321 to 10.0.0.1:80."
  },
  {
    question: "What is a 'table miss' in OpenFlow?",
    shortAnswer: "When a packet does not match any flow entry in a table, the switch follows the table-miss entry (often sends packet to controller).",
    explanation: "The table-miss entry is configured by the controller. It can drop, send to controller, or continue to next table.",
    hint: "Without table-miss, packets would be silently dropped.",
    level: "intermediate",
    codeExample: "Table-miss entry: priority=0, match=anything, action=CONTROLLER."
  },
  {
    question: "What is the purpose of multiple flow tables in OpenFlow 1.3+?",
    shortAnswer: "Pipelined processing: packets go through multiple tables, each table performing different matches and actions, enabling modular and efficient forwarding.",
    explanation: "Example: Table 0: VLAN filtering, Table 1: MAC learning, Table 2: Routing. Reduces rule explosion.",
    hint: "Pipelining = divide and conquer.",
    level: "expert",
    codeExample: "Goto table 2 instruction after processing in table 1."
  },
  {
    question: "What is a group table in OpenFlow?",
    shortAnswer: "Groups define forwarding behavior for multiple ports (e.g., flooding, load balancing, fast failover).",
    explanation: "Groups are referenced by flow entries. Types: all, select, indirect, fast failover.",
    hint: "Use groups for multicast, ECMP, or link redundancy.",
    level: "expert",
    codeExample: "Group type=select, buckets: output:2 weight 50, output:3 weight 50."
  },
  {
    question: "What are some common SDN controllers and their use cases?",
    shortAnswer: "ONOS (carrier-grade, high availability), OpenDaylight (modular Java), Ryu (Python, flexible), POX (education), Floodlight (Java, simpler).",
    explanation: "Choice depends on scale, language preference, and community support.",
    hint: "For learning, start with Ryu or POX.",
    level: "intermediate",
    codeExample: "sudo ryu-manager --verbose ryu/app/simple_switch.py"
  },
  {
    question: "How does SDN help in data center traffic engineering?",
    shortAnswer: "SDN provides centralized flow control to balance load, avoid congestion, and reroute around failures in real time.",
    explanation: "Google B4 uses SDN to achieve near 100% link utilization across WAN, adapting to traffic demands.",
    hint: "SDN gives you the 'big picture' of all flows.",
    level: "expert",
    codeExample: "Trellis (ONOS) leaf-spine fabric with segment routing."
  },
  {
    question: "What is the role of P4 in SDN?",
    shortAnswer: "P4 (Programming Protocol-independent Packet Processors) allows programming the data plane itself, not just flow rules.",
    explanation: "With P4, you can define custom headers, parsing, and processing pipelines, making switches more flexible than OpenFlow.",
    hint: "OpenFlow controls existing pipelines; P4 builds the pipeline.",
    level: "expert",
    codeExample: "P4 program defines a new protocol header, parsing, and actions; compiled to target (e.g., Tofino, BMv2)."
  },
  {
    question: "Explain the concept of 'intent-based networking' on northbound API.",
    shortAnswer: "Intent-based interfaces allow users to declare 'what' they want (e.g., connect A to B with low latency), and the controller figures out 'how'.",
    explanation: "Higher abstraction than flow-based northbound. Reduces human errors and automates policy translation.",
    hint: "You say 'I need this' not 'install this flow'.",
    level: "expert",
    codeExample: "ONOS intents: { \"type\": \"HostToHostIntent\", \"one\": \"00:00:00:00:00:01\", \"two\": \"00:00:00:00:00:02\" }"
  },
  {
    question: "What are the security challenges in SDN?",
    shortAnswer: "Controller is a single target for DDoS; insecure southbound communication can lead to flow rule tampering; malicious applications can abuse northbound API.",
    explanation: "Mitigations: controller clustering, TLS, application sandboxing, and authentication.",
    hint: "Centralized control = centralized risk.",
    level: "intermediate",
    codeExample: "Use OpenFlow over TLS (port 6633 with certificates)."
  },
  {
    question: "What is 'hybrid SDN'?",
    shortAnswer: "A network where some devices are SDN-enabled and others run traditional protocols, often with an SDN controller augmenting legacy routing.",
    explanation: "Transition strategy for enterprises. Controllers can override some routes or co-exist with OSPF/BGP.",
    hint: "Not all or nothing; gradual adoption.",
    level: "expert",
    codeExample: "Ryu with OSPF module: traditional routing plus SDN flows for specific traffic."
  },
  {
    question: "What is Mininet and how is it used in SDN learning?",
    shortAnswer: "Mininet creates a virtual network of hosts, switches, and links on a single machine, supporting custom topologies and real OpenFlow controllers.",
    explanation: "Ideal for testing SDN applications without hardware. Switches can be Open vSwitch (OVS).",
    hint: "Mininet = network emulation for SDN.",
    level: "basic",
    codeExample: "sudo mn --topo tree,depth=2,fanout=3 --controller remote"
  },
  {
    question: "What is Open vSwitch (OVS) and why is it important?",
    shortAnswer: "A production-quality virtual switch that supports OpenFlow, OVSDB, and other SDN protocols. Widely used in cloud platforms (OpenStack, Xen).",
    explanation: "OVS can operate as both a simple L2 switch and a programmable flow-based switch.",
    hint: "OVS is the workhorse of software-defined data centers.",
    level: "intermediate",
    codeExample: "ovs-ofctl add-flow br0 'priority=100,in_port=1,actions=output:2'"
  },
  {
    question: "Explain the difference between flow-based and route-based forwarding in SDN.",
    shortAnswer: "Flow-based uses match-action for granular per-flow decisions (e.g., TCP session). Route-based installs network-layer routes (e.g., IP prefixes) as flows but less granular.",
    explanation: "SDN can do both, but flow-based allows ACL, QoS, and load balancing per session.",
    hint: "Flow = session; route = subnet.",
    level: "intermediate",
    codeExample: "Flow: match on TCP port 80; Route: match on IP 10.0.0.0/24."
  },
  {
    question: "What is the purpose of 'meters' in OpenFlow?",
    shortAnswer: "Meters enable per-flow or per-port rate limiting and QoS (e.g., drop packets above a rate).",
    explanation: "Each meter has bands (e.g., drop at 1 Mbps, remark DSCP at 2 Mbps).",
    hint: "Meters = traffic policing inside the switch.",
    level: "expert",
    codeExample: "meter fast rate=1000kbps, bands: drop algorithm=tail"
  },
  {
    question: "How does an SDN controller learn the network topology?",
    shortAnswer: "Using LLDP (Link Layer Discovery Protocol) or similar discovery mechanisms. Controller sends LLDP packets out ports, collects responses to build graph.",
    explanation: "Ryu, ONOS have topology discovery modules. Also uses host discovery via packet-in messages.",
    hint: "Like a digital map of all links.",
    level: "intermediate",
    codeExample: "ONOS device subsystem listens to LLDP and BDDP packets."
  },
  {
    question: "What is the difference between 'controller-switch' and 'switch-controller' messages?",
    shortAnswer: "Controller-switch: messages from controller to switch (e.g., FlowMod, PacketOut). Switch-controller: from switch to controller (e.g., PacketIn, PortStatus, Error).",
    explanation: "OpenFlow asymmetric messages can be initiated by either side (e.g., Echo, Experimenter).",
    hint: "PacketIn is the switch asking controller what to do.",
    level: "intermediate",
    codeExample: "Switch sends PacketIn for unknown destination; controller replies with PacketOut."
  },
  {
    question: "Explain the concept of 'slice' or 'network virtualization' with SDN.",
    shortAnswer: "SDN allows creating multiple logical networks over the same physical infrastructure, each with its own controller and policies (FlowVisor).",
    explanation: "Helps multi-tenancy in cloud and research experiments (e.g., GENI).",
    hint: "One physical network, many virtual networks.",
    level: "expert",
    codeExample: "FlowVisor sits between switches and controllers, slicing by port, VLAN, or header fields."
  },
  {
    question: "What is 'controller placement problem' in SDN?",
    shortAnswer: "Where to locate controllers to minimize latency between switches and controllers, while ensuring resilience and load balancing.",
    explanation: "Trade-off: central vs distributed controllers. Solved via heuristics or optimization algorithms.",
    hint: "Controllers close to switches reduce packet-in latency.",
    level: "expert",
    codeExample: "Use k‑center or k‑median algorithms for placement."
  },
  {
    question: "How does SDN interact with legacy routing protocols like OSPF? (Hybrid mode)",
    shortAnswer: "Hybrid switches can route some traffic via OSPF and other flows via OpenFlow. Some controllers can inject routes into OSPF domain.",
    explanation: "Controller may act as a BGP speaker or use OSPF plugin to advertise routes.",
    hint: "Gradual migration without ripping out old gear.",
    level: "expert",
    codeExample: "Ryu has osfr module that learns OSPF LSAs and installs flows."
  },
  {
    question: "What is the 'elasticity' benefit of SDN in cloud?",
    shortAnswer: "SDN allows automatic scale-out/scale-in of network policies as VMs are added/removed, without manual reconfiguration.",
    explanation: "Controller listens to orchestration events (e.g., OpenStack Nova) and updates flows, security groups, load balancers dynamically.",
    hint: "Network adapts to compute automatically.",
    level: "intermediate",
    codeExample: "OpenStack Neutron + OVS + Ryu: new VM spawns → controller updates ACLs."
  },
  {
    question: "What is a 'role' in OpenFlow (Master/Slave/Equal)?",
    shortAnswer: "Allows multiple controllers to manage a switch: Master has full control, Slave is read-only, Equal controllers coordinate via experimenter messages.",
    explanation: "Used for high availability and load sharing. Switch rejects messages from non-Master controllers except for certain types.",
    hint: "Only one master at a time.",
    level: "expert",
    codeExample: "Controller sends OFPT_ROLE_REQUEST to become Master."
  },
  {
    question: "How can you debug OpenFlow messages between controller and switch?",
    shortAnswer: "Use tcpdump or Wireshark with OpenFlow dissector. Run controller and switch in a lab (Mininet) and capture on the control interface.",
    explanation: "Look at packet-in, flow-mod, packet-out, and error messages.",
    hint: "Wireshark filter: `openflow_v4` or `tcp.port==6633`.",
    level: "intermediate",
    codeExample: "sudo tcpdump -i lo -s0 -w openflow.pcap"
  },
  {
    question: "What is the relationship between SDN and NFV?",
    shortAnswer: "SDN separates control and data; NFV virtualizes network functions (firewall, load balancer). They complement each other: SDN directs traffic to NFV instances.",
    explanation: "Together they enable flexible service chaining and reduce hardware dependency.",
    hint: "SDN = steering, NFV = services.",
    level: "intermediate",
    codeExample: "Traffic classifier (SDN) → VNF (firewall) → VNF (load balancer) → output."
  }
];

export default questions;