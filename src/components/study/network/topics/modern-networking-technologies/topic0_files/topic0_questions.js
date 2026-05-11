// topic0_files/topic0_questions.js
// 30 questions covering cloud networking fundamentals, VPC, subnets, routing, security groups, NAT, and troubleshooting.

const questions = [
  {
    question: "What is a Virtual Private Cloud (VPC)?",
    shortAnswer: "A logically isolated section of a cloud provider’s network where you can launch resources.",
    explanation: "VPC gives you control over IP ranges, subnets, route tables, and gateways. It's like a virtual data center inside the cloud.",
    hint: "Think of it as a private campus with its own address space.",
    level: "basic",
    codeExample: "Resource: aws_vpc.example (CIDR = '10.0.0.0/16')"
  },
  {
    question: "Explain the difference between a public subnet and a private subnet.",
    shortAnswer: "Public subnet has direct route to Internet Gateway; private subnet does not.",
    explanation: "Resources in a public subnet can be accessed from the internet (if security allows). Private subnets have no direct internet route; they may use NAT to reach internet outbound.",
    hint: "Public = front door, Private = back office.",
    level: "basic",
    codeExample: "Public: route table with 0.0.0.0/0 → IGW; Private: no such route"
  },
  {
    question: "What is an Internet Gateway (IGW) and why is it required?",
    shortAnswer: "A horizontally scaled VPC component that allows communication between your VPC and the internet.",
    explanation: "Without IGW, instances cannot send or receive traffic from the internet, even if they have public IPs.",
    hint: "It's the doorway to the outside world.",
    level: "basic",
    codeExample: "aws ec2 create-internet-gateway --region us-east-1"
  },
  {
    question: "How does a NAT Gateway differ from an Internet Gateway?",
    shortAnswer: "NAT Gateway allows outbound internet traffic for private subnets; IGW enables bidirectional internet access for public subnets.",
    explanation: "NAT maps private IPs to a public IP for outgoing requests, but blocks unsolicited inbound connections.",
    hint: "NAT is one‑way (private → internet), IGW is two‑way.",
    level: "intermediate",
    codeExample: "NAT Gateway must be in a public subnet."
  },
  {
    question: "What are security groups in cloud networking?",
    shortAnswer: "Virtual stateful firewalls at the instance level.",
    explanation: "Security groups control inbound/outbound traffic based on rules. They are stateful – if you allow inbound, outbound return is auto‑allowed.",
    hint: "Think of a bouncer who remembers who came in.",
    level: "basic",
    codeExample: "aws ec2 authorize-security-group-ingress --group-id sg-... --protocol tcp --port 22 --cidr 0.0.0.0/0"
  },
  {
    question: "What is a Network Access Control List (NACL)?",
    shortAnswer: "Stateless firewall at the subnet level.",
    explanation: "NACLs have separate inbound/outbound rules, processed in order by rule number. They are stateless – return traffic must be explicitly allowed.",
    hint: "NACL = checkpoint at subnet border, security group = door guard per instance.",
    level: "intermediate",
    codeExample: "NACL rule 100: Allow HTTP from 0.0.0.0/0; rule *: Deny all."
  },
  {
    question: "How many VPCs can you have per region in AWS? (default limit)",
    shortAnswer: "5 VPCs per region (soft limit, can be increased).",
    explanation: "Default quotas exist to prevent abuse. You can request increases via support tickets.",
    hint: "Small number encourages CIDR planning.",
    level: "basic",
    codeExample: "Service Quotas console → Amazon VPC → VPCs per region"
  },
  {
    question: "What is VPC peering?",
    shortAnswer: "A networking connection between two VPCs that routes traffic using private IPv4 addresses.",
    explanation: "Instances in either VPC can communicate as if they are on the same network. No gateways or VPN required. No transitive peering.",
    hint: "Direct private link between two VPCs, but not 'chained'.",
    level: "intermediate",
    codeExample: "Requester VPC accepts peering connection from accepter VPC."
  },
  {
    question: "What is a route table and why is it important?",
    shortAnswer: "A set of rules (routes) that determine where network traffic is directed.",
    explanation: "Each subnet must be associated with a route table. Main route table is default. Routes can point to IGW, NAT, VPC peering, VPN, etc.",
    hint: "It's like a GPS for packets inside VPC.",
    level: "basic",
    codeExample: "Destination 10.0.0.0/16 → Target local; Destination 0.0.0.0/0 → Target igw-xxx"
  },
  {
    question: "Can you change the CIDR block of an existing VPC?",
    shortAnswer: "You cannot modify the primary CIDR, but you can add secondary CIDR blocks (depending on cloud provider).",
    explanation: "AWS allows adding secondary IPv4 CIDRs to a VPC, but the primary CIDR is immutable.",
    hint: "Plan CIDR before creating VPC.",
    level: "expert",
    codeExample: "aws ec2 associate-vpc-cidr-block --vpc-id vpc-xxx --cidr-block 10.1.0.0/16"
  },
  {
    question: "What are VPC Flow Logs and what problem do they solve?",
    shortAnswer: "Feature that captures IP traffic information going to/from network interfaces in a VPC.",
    explanation: "Helps diagnose overly restrictive security groups, reachability issues, and monitor traffic patterns.",
    hint: "Like a black box for your VPC traffic.",
    level: "intermediate",
    codeExample: "Flow log record: version, account-id, interface-id, srcaddr, dstaddr, action (ACCEPT/REJECT)"
  },
  {
    question: "Explain the difference between 'default VPC' and 'custom VPC'.",
    shortAnswer: "Default VPC is auto‑created with default subnets, IGW, and route table; custom VPC gives full control.",
    explanation: "Default VPC is convenient for beginners but lacks custom CIDR and can conflict with other networks.",
    hint: "Default = training wheels; custom = race bike.",
    level: "basic",
    codeExample: "Default VPC CIDR is always 172.31.0.0/16."
  },
  {
    question: "What is an Elastic IP (EIP) and when would you use it?",
    shortAnswer: "A static public IPv4 address that you can associate with an instance or NAT Gateway.",
    explanation: "Instances without EIP get a new public IP on every stop/start. EIP gives persistent address for DNS or whitelisting.",
    hint: "Reserved parking spot.",
    level: "basic",
    codeExample: "aws ec2 allocate-address --domain vpc"
  },
  {
    question: "Why does a private subnet need a NAT Gateway to access the internet?",
    shortAnswer: "Private subnets have no direct route to IGW; NAT Gateway acts as a bridge while hiding the private IP.",
    explanation: "NAT translates private source IPs to its own public IP, receives responses, and forwards back. It blocks unsolicited inbound.",
    hint: "Private machine asks a proxy to fetch a web page.",
    level: "intermediate",
    codeExample: "Private instance → NAT Gateway (public subnet) → IGW → Internet"
  },
  {
    question: "What is the maximum transmission unit (MTU) for most VPC networks?",
    shortAnswer: "Standard MTU is 1500 bytes (Ethernet). Some cloud providers support jumbo frames (9001 bytes) within same VPC.",
    explanation: "Packet size exceeded MTU leads to fragmentation or dropped packets. VPN connections often have lower MTU.",
    hint: "Don't exceed 1500 when going to internet.",
    level: "expert",
    codeExample: "ping -M do -s 1472 destination (tests MTU)"
  },
  {
    question: "How do you troubleshoot a 'connection timeout' error between two instances in same VPC but different subnets?",
    shortAnswer: "Check route tables (both subnets must have routes to each other), security group rules, and NACLs.",
    explanation: "Often the issue is a missing return path rule in NACL (since NACL is stateless) or a security group that doesn't allow traffic from the other subnet's CIDR.",
    hint: "Use flow logs to see ACCEPT or REJECT.",
    level: "intermediate",
    codeExample: "Flow log shows REJECT → check NACL outbound rules."
  },
  {
    question: "What is a VPC endpoint (Gateway Endpoint vs Interface Endpoint)?",
    shortAnswer: "Private connection from your VPC to supported AWS services without leaving the AWS network.",
    explanation: "Gateway endpoint (S3, DynamoDB) adds a route in route table; Interface endpoint (other services) uses ENI with private IP.",
    hint: "Avoid crossing the public internet for AWS services.",
    level: "expert",
    codeExample: "vpce-xxx: for S3 or DynamoDB; vpce-xxx: for SSM, EC2, etc."
  },
  {
    question: "What is DHCP Options Set in a VPC?",
    shortAnswer: "Configuration that defines domain name and DNS servers for instances launched in the VPC.",
    explanation: "Default uses Amazon DNS (Route 53 Resolver). Custom sets let you use your own DNS servers.",
    hint: "Important for hybrid DNS resolution.",
    level: "intermediate",
    codeExample: "dhcp-options: domain-name = 'example.com', domain-name-servers = '10.0.0.2'"
  },
  {
    question: "How do you share a VPC across multiple AWS accounts?",
    shortAnswer: "Using AWS Resource Access Manager (RAM) to share subnets (not the whole VPC).",
    explanation: "Account A (owner) creates VPC and shares subnets with Account B. Account B can launch resources in those subnets.",
    hint: "Decouple network ownership from workload accounts.",
    level: "expert",
    codeExample: "aws ram create-resource-share --name my-share --resources subnet-xxx"
  },
  {
    question: "What is the purpose of a Transit Gateway?",
    shortAnswer: "Central hub to interconnect VPCs and on‑prem networks, replacing VPC peering meshes.",
    explanation: "Transit Gateway simplifies network topology, supports transitive routing, and scales to thousands of attachments.",
    hint: "Think of a network router in the cloud.",
    level: "expert",
    codeExample: "Attach VPC A, VPC B, and VPN connection to Transit Gateway."
  },
  {
    question: "When would you use a NAT Instance instead of NAT Gateway?",
    shortAnswer: "Cost savings or custom packet filtering requirements; NAT Gateway is managed but more expensive.",
    explanation: "NAT Instance is an EC2 AMI (Amazon Linux NAT) that you manage (patching, size). It can be cheaper for small workloads.",
    hint: "NAT Gateway ≈ fully managed, NAT Instance ≈ DIY.",
    level: "expert",
    codeExample: "Launch Amazon Linux AMI with source/destination check disabled."
  },
  {
    question: "Explain the ephemeral port range problem with NACLs.",
    shortAnswer: "NACLs are stateless; return traffic must be explicitly allowed on ephemeral ports (e.g., 1024-65535).",
    explanation: "A client initiates from a random high port; the NACL outbound must allow that port range back to the client.",
    hint: "If response packets are dropped, check NACL outbound rule for high number ports.",
    level: "expert",
    codeExample: "Outbound rule: allow TCP 1024-65535 from subnet CIDR to 0.0.0.0/0."
  },
  {
    question: "What is a Bastion Host and why is it placed in a public subnet?",
    shortAnswer: "A secure jump server used to access instances in private subnets via SSH or RDP.",
    explanation: "Bastion acts as a single entry point. It must be in a public subnet and has tightly locked security group.",
    hint: "Gatekeeper to your private instances.",
    level: "intermediate",
    codeExample: "ssh -J ec2-user@bastion-public-ip ec2-user@private-ip"
  },
  {
    question: "How can you connect your on‑premises data center to a VPC?",
    shortAnswer: "Using VPN (IPsec) or AWS Direct Connect.",
    explanation: "VPN runs over internet; Direct Connect is a dedicated private line. Both allow resources to use private IPs across hybrid environment.",
    hint: "VPN quick & cheaper; Direct Connect stable & lower latency.",
    level: "intermediate",
    codeExample: "Virtual Private Gateway attached to VPC + Customer Gateway (on‑prem router)."
  },
  {
    question: "What is VPC Reachability Analyzer?",
    shortAnswer: "A tool to test and debug network connectivity between two resources in a VPC.",
    explanation: "Given source and destination, it checks route tables, security groups, NACLs, and reports if path exists (or which rule blocks).",
    hint: "Like a network simulator in the cloud console.",
    level: "expert",
    codeExample: "Source: instance A, Destination: instance B; Analyzer returns PASS or FAIL."
  },
  {
    question: "What is IPv6 support in VPC? How does it differ from IPv4?",
    shortAnswer: "VPC can have both IPv4 and IPv6 CIDR blocks. IPv6 addresses are public by default (no NAT needed) and egress‑only gateway replaces NAT.",
    explanation: "IPv6 eliminates the need for NAT for outbound internet, but security groups still apply.",
    hint: "Egress‑only gateway allows outbound IPv6 to internet; blocks inbound.",
    level: "expert",
    codeExample: "Assign /56 IPv6 CIDR to VPC, /64 per subnet."
  },
  {
    question: "What is overlap in VPC peering and how to avoid it?",
    shortAnswer: "Overlap means the two VPCs have the same CIDR range; peering won't work because routes become ambiguous.",
    explanation: "You cannot peer VPCs with overlapping IPv4 CIDRs. Solution: redesign CIDRs or use Transit Gateway + NAT.",
    hint: "Plan your IP space globally before creating VPCs.",
    level: "expert",
    codeExample: "VPC A: 10.0.0.0/16, VPC B: 10.0.0.0/16 → impossible to peer."
  },
  {
    question: "Explain the concept of 'edge to VPC' network performance.",
    shortAnswer: "It refers to throughput from internet to resources in VPC, limited by instance network bandwidth and IGW capacity.",
    explanation: "IGW scales horizontally (no single bottleneck). Individual instance network performance depends on instance type.",
    hint: "Use larger instances or multiple instances behind load balancer for high throughput.",
    level: "expert",
    codeExample: "5Gbps, 10Gbps, or 25Gbps depending on instance type."
  },
  {
    question: "What is a Reserved IP address in cloud networking?",
    shortAnswer: "An internal IP that remains associated with an ENI even when the instance is stopped or terminated.",
    explanation: "Elastic Network Interface (ENI) can have a primary private IP that is persistent, but secondary IPs can be moved between instances.",
    hint: "Use ENI to preserve private IP across instance lifecycle.",
    level: "intermediate",
    codeExample: "aws ec2 create-network-interface --subnet-id subnet-xxx --private-ip-address 10.0.1.50"
  },
  {
    question: "How do you restrict outbound internet access from a public subnet to only specific domains?",
    shortAnswer: "Use a proxy server (Squid) or AWS Network Firewall with domain filtering rules.",
    explanation: "Outbound traffic from instances goes to the proxy, which evaluates the domain against allow/deny lists.",
    hint: "Cannot achieve this with security groups alone (they work at IP/port level).",
    level: "expert",
    codeExample: "AWS Network Firewall rule group with domain list: 'example.com' ALLOW, '.*' DENY."
  },
  {
    question: "What is the difference between a VPC and a Subnet in cloud providers?",
    shortAnswer: "VPC is a container holding multiple subnets; subnet is a smaller IP range within the VPC, associated with one availability zone.",
    explanation: "Subnets cannot span AZs, VPC can span multiple AZs (via subnets).",
    hint: "VPC = country, Subnet = city (each in one state/AZ).",
    level: "basic",
    codeExample: "VPC CIDR 10.0.0.0/16; Subnet1 10.0.1.0/24 (us-east-1a), Subnet2 10.0.2.0/24 (us-east-1b)."
  }
];

export default questions;