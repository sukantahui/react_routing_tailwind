// topic43_questions.js
// 30 Moderate to Expert Questions on Networking in Cloud Computing, VPCs, VXLAN, Hybrid Cloud, and Cloud Cyber Security

const questions = [
  {
    question: "What is a Virtual Private Cloud (VPC) and how does it isolate resources in multi-tenant cloud data centers?",
    shortAnswer: "A VPC is a logically isolated virtual software-defined network dedicated to a cloud account, providing custom IPv4/IPv6 address ranges (CIDR blocks), public/private subnets, route tables, and network gateways.",
    explanation: "Ensures that compute instances belonging to an enterprise in Kolkata are completely separated from other cloud tenants sharing the same physical hyperscaler hardware.",
    hint: "Logically isolated private network in the cloud with custom subnets and route tables.",
    level: "basic",
    codeExample: "VPC_Config = { CIDR: '10.100.0.0/16', PublicSubnet: '10.100.1.0/24', PrivateSubnet: '10.100.2.0/24' };"
  },
  {
    question: "What is the difference between Security Groups and Network Access Control Lists (NACLs) in cloud networking?",
    shortAnswer: "Security Groups operate at the virtual NIC (instance) level, are stateful (inbound return traffic is automatically allowed), and support only allow rules; NACLs operate at the subnet boundary, are stateless (inbound and outbound rules evaluated separately), and support both allow and deny rules with numeric rule ordering.",
    explanation: "Security Groups automatically allow reply traffic for outgoing API calls, while NACLs evaluate outgoing responses against explicit outbound rules.",
    hint: "Security Groups are stateful firewalls on instances; NACLs are stateless filters on subnets.",
    level: "expert",
    codeExample: "SG_Rule = { Type: 'Stateful', Scope: 'Virtual NIC', Action: 'Allow Only' };\nNACL_Rule = { Type: 'Stateless', Scope: 'Subnet Boundary', Action: 'Allow & Deny (Numbered)' };"
  },
  {
    question: "What is VXLAN (Virtual Extensible LAN - RFC 7348) and why is it used in cloud hyperscaler data centers?",
    shortAnswer: "An overlay encapsulation protocol that encapsulates Layer 2 Ethernet frames inside Layer 4 UDP packets (UDP Port 4789), using a 24-bit VXLAN Network Identifier (VNI) to support up to 16 million isolated virtual networks across a Layer 3 IP Clos fabric.",
    explanation: "Overcomes the legacy 4094 VLAN limit, allowing cloud providers to host millions of isolated customer VPCs over standard IP routing underlays.",
    hint: "Encapsulates Layer-2 frames in UDP port 4789 with a 24-bit ID supporting 16 million virtual networks.",
    level: "expert",
    codeExample: "VXLAN_Header = { UDP_Port: 4789, VNI_24Bit: 1048576 /* 16M possible VNIs */, InnerEthernetFrame: '...' };"
  },
  {
    question: "What is a Dedicated Cloud Interconnect (e.g. AWS Direct Connect / Azure ExpressRoute)?",
    shortAnswer: "A private, dedicated physical 1G/10G/100G fiber cross-connect linking an enterprise data center directly to a cloud service provider's Point of Presence (PoP), delivering deterministic sub-4ms latency, high bandwidth, and zero exposure to the public Internet.",
    explanation: "Connects on-premises Core Banking databases in Kolkata directly to cloud microservice clusters with guaranteed wire speeds.",
    hint: "Private physical fiber line connecting your company data center to the cloud provider without using the Internet.",
    level: "moderate",
    codeExample: "DirectConnect_Circuit = { Bandwidth: '10 Gbps Dedicated Fiber', BGP_Peering: 'ASN 65001 <-> ASN 7224', Latency: '< 3.2 ms' };"
  },
  {
    question: "What is a Cloud Transit Gateway (TGW) and how does it replace complex VPC Peering meshes?",
    shortAnswer: "A centralized cloud routing hub that connects hundreds of VPCs, on-premises Direct Connect links, and SD-WAN VPNs in a scalable hub-and-spoke topology, eliminating the need for N*(N-1)/2 complex point-to-point VPC peering connections.",
    explanation: "Simplifies network administration across large multi-account enterprise organizations in West Bengal.",
    hint: "Central cloud routing hub that connects all VPCs and on-premises networks in a hub-and-spoke model.",
    level: "moderate",
    codeExample: "TransitGateway: Hub(TGW) connects [VPC-Production, VPC-Development, VPC-Security-Inspection, OnPrem_DirectConnect]"
  },
  {
    question: "What is a PrivateLink / VPC Endpoint and why is it more secure than a NAT Gateway for accessing cloud services?",
    shortAnswer: "A technology that provision a private Elastic Network Interface (ENI) with a private IP inside your VPC subnet to communicate directly with cloud PaaS/SaaS services (e.g. S3, DynamoDB) over the cloud provider backbone, eliminating data egress over public NAT gateways.",
    explanation: "Prevents internal database servers in Barrackpore from requiring public IP routing or NAT gateways to store database backups.",
    hint: "Accesses cloud services privately inside your VPC subnet without touching the public Internet or NAT.",
    level: "expert",
    codeExample: "VPCEndpoint: Private_EC2 (10.0.2.15) --Private_ENI--> S3_Bucket (Zero Internet/NAT Required)"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise 10G Cloud Direct Connect / ExpressRoute circuit per month?",
    shortAnswer: "Approximately ₹1,45,000 to ₹3,50,000 per month (including dedicated 10G port fees, data center Meet-Me-Room optical cross-connects, and committed data egress charges).",
    explanation: "Enterprise hybrid clouds budget dedicated interconnects in monthly operational expenses (OpEx) in ₹.",
    hint: "10G Dedicated Cloud Interconnect costs ₹1,45,000 – ₹3,50,000 per month in Indian Rupees.",
    level: "moderate",
    codeExample: "Monthly_DirectConnect_Budget = ₹1,85,000; // 10G Dedicated Port + Data Center Cross-Connect in Kolkata"
  },
  {
    question: "What is Layer-4 Network Load Balancer (NLB) vs Layer-7 Application Load Balancer (ALB)?",
    shortAnswer: "NLB operates at Layer 4 (TCP/UDP), routing millions of requests per second at ultra-low latency (< 1ms) with static elastic IP addresses; ALB operates at Layer 7 (HTTP/HTTPS), inspecting request headers, URLs, and cookies to perform intelligent microservice path routing.",
    explanation: "ALB routes `/api/payments` to payment containers and `/images` to CDN buckets, while NLB handles raw high-speed gaming and financial sockets.",
    hint: "NLB routes TCP/UDP at wire speed with static IPs; ALB routes HTTP/HTTPS based on URL paths.",
    level: "moderate",
    codeExample: "ALB_Routing: if (req.path.startsWith('/api')) routeTo(PaymentPodCluster); else routeTo(WebFrontend);"
  },
  {
    question: "What is eBPF (Extended Berkeley Packet Filter) and Cilium CNI in Kubernetes Cloud Networking?",
    shortAnswer: "A revolutionary Linux kernel technology that executes custom, sandboxed bytecode directly inside the kernel networking stack, replacing slow iptables rules with high-performance, identity-aware Layer-3/4/7 container routing, encryption, and observability.",
    explanation: "Accelerates Kubernetes packet forwarding by over 40% and provides deep cryptographic visibility into pod communications in Kolkata.",
    hint: "Runs fast networking and security bytecode directly inside the Linux kernel, replacing iptables in Kubernetes.",
    level: "expert",
    codeExample: "Cilium_eBPF: Pod_A → Kernel_eBPF_Hook → Pod_B (Zero iptables overhead, WireGuard encryption)"
  },
  {
    question: "What is a Cloud NAT Gateway and how does it protect private subnet instances?",
    shortAnswer: "A managed Network Address Translation service in a public subnet that translates private IP addresses to an Elastic Public IP, allowing private backend database instances to download OS security patches from the Internet while blocking inbound connections from the Internet.",
    explanation: "Ensures backend servers in Ichapur can update packages without exposing open listening ports to external hackers.",
    hint: "Allows private servers to download software updates from the web while blocking external inbound connections.",
    level: "basic",
    codeExample: "RouteTable_Private: Destination '0.0.0.0/0' → Target 'nat-gateway-01ab23cd' (Public IP Masquerade)"
  },
  {
    question: "What are VPC Flow Logs and how are they used for Cloud Security Forensics?",
    shortAnswer: "A network telemetry feature that captures IP traffic logs (source IP, destination IP, port, protocol, packets, bytes, action ACCEPT/REJECT) flowing through virtual network interfaces, enabling threat detection and forensic investigation in cloud SIEMs.",
    explanation: "Security analysts in Kolkata inspect Flow Logs to identify port scanning, brute force attempts, and data exfiltration from compromised cloud VMs.",
    hint: "Logs all network traffic (IPs, ports, ACCEPT/REJECT) on virtual cloud interfaces for security analysis.",
    level: "basic",
    codeExample: "VPC_Flow_Log: 2 123456789010 eni-abc1234 10.0.1.5 203.0.113.8 443 51234 6 15 8400 ACCEPT OK"
  },
  {
    question: "What is Cloud Security Posture Management (CSPM) and how does it detect Over-Permissioned Security Groups?",
    shortAnswer: "An automated security scanner that continuously audits cloud infrastructure configurations against compliance benchmarks (CIS, NIST), flagging security groups with dangerous `0.0.0.0/0` ingress rules on sensitive ports (SSH 22, RDP 3389, MySQL 3306).",
    explanation: "Prevents accidental database leaks caused by junior DevOps engineers opening MySQL ports to the entire world.",
    hint: "Automated tool that scans cloud settings and alerts when firewalls accidentally open database ports to the world.",
    level: "basic",
    codeExample: "cspm.audit() => if (securityGroup.inboundRule.cidr == '0.0.0.0/0' && port == 3306) triggerHighSeverityAlert();"
  },
  {
    question: "What is BGP Anycast Routing in Cloud CDN Edge Networks?",
    shortAnswer: "A routing method where multiple distributed edge data centers across the globe advertise the exact same IP address via Border Gateway Protocol (BGP); Internet routers automatically steer user requests to the topologically nearest edge server.",
    explanation: "Ensures that a user in Barrackpore is automatically connected to the local Kolkata Cloudflare edge cache rather than a server in North America.",
    hint: "Advertises the same IP address from multiple global locations so users connect to the closest data center.",
    level: "expert",
    codeExample: "BGP_Anycast: IP '104.16.123.96' advertised from Kolkata IXP, Mumbai, and Singapore simultaneously."
  },
  {
    question: "What is an Inspection VPC / Egress Gateway Pattern in enterprise cloud architecture?",
    shortAnswer: "A dedicated security VPC hosting a cluster of Next-Gen Firewalls (Palo Alto / Fortinet); all outbound Internet traffic from spoke VPCs is routed through the Transit Gateway into this inspection VPC for SSL decryption and deep threat scanning before leaving the cloud.",
    explanation: "Centralizes cloud egress security and prevents data leakage across hundreds of independent development VPCs.",
    hint: "Routes all outbound cloud internet traffic through a central firewall VPC for security inspection.",
    level: "expert",
    codeExample: "Spoke_VPC → TransitGateway → Inspection_VPC (Next-Gen Firewall SSL Decrypt) → Internet Gateway"
  },
  {
    question: "What is GENEVE (Generic Network Virtualization Encapsulation - RFC 8926)?",
    shortAnswer: "A modern network virtualization protocol combining the benefits of VXLAN and NVGRE, supporting flexible, variable-length Type-Length-Value (TLV) metadata options inside the UDP header (UDP Port 6081) for advanced cloud SDN telemetries.",
    explanation: "Used by AWS Gateway Load Balancer and modern cloud SDN fabrics to carry tenant metadata and firewall context.",
    hint: "Modern cloud overlay protocol on UDP port 6081 supporting flexible metadata options.",
    level: "expert",
    codeExample: "GENEVE_Header: UDP_Port: 6081, VNI: 0x1A2B, VariableTLVMetadata: [TenantID, SecurityContext]"
  },
  {
    question: "What is Cloud DNS Split-Horizon Resolution in VPCs?",
    shortAnswer: "A DNS configuration where internal cloud resources query a private hosted zone that resolves domain names (e.g. `db.internal.corp`) to private RFC 1918 IPs, while external Internet users receive public IPs or NXDOMAIN for the same domain.",
    explanation: "Hides internal cloud server IP addresses from public discovery while providing seamless internal service discovery in Jadavpur.",
    hint: "Returns private internal IP addresses to VPC servers and public IPs to external Internet users.",
    level: "moderate",
    codeExample: "Route53_PrivateZone: 'api.corp.local' → 10.0.2.50 (VPC Query); Public Query → Blocked/NXDOMAIN"
  },
  {
    question: "What is SR-IOV (Single Root I/O Virtualization) in High-Performance Cloud Networking?",
    shortAnswer: "A hardware virtualization standard that allows a physical PCIe network card to present multiple virtual functions (VFs) directly to virtual machines, bypassing the hypervisor virtual switch and delivering line-rate 100G throughput with sub-microsecond latency.",
    explanation: "Used for high-frequency trading applications and supercomputing GPU nodes in cloud data centers.",
    hint: "Connects virtual machines directly to physical network card hardware for ultra-fast line-rate speeds.",
    level: "expert",
    codeExample: "SRIOV_Config: VirtualFunction_0 assigned directly to VM_PCI_PassThrough → Zero Hypervisor Overhead"
  },
  {
    question: "What is Data Egress Cost Optimization in Cloud Architecture?",
    shortAnswer: "Architecting cloud networks to minimize outbound data transfer charges across Availability Zones and the Internet, utilizing VPC Peering, VPC Endpoints, and local CDN caching to keep traffic on free internal backbones.",
    explanation: "Saves enterprises in Kolkata over ₹85,000 per month by avoiding unnecessary public Internet round-trips for internal backups.",
    hint: "Designing cloud networks to minimize expensive public internet data download fees.",
    level: "moderate",
    codeExample: "EgressOptimization = ['Use S3 Gateway Endpoints (Free)', 'Keep AZ Traffic Local', 'Cache Assets in CloudFront'];"
  },
  {
    question: "What is Cloud Auto-Scaling Group (ASG) Dynamic Target Tracking?",
    shortAnswer: "A cloud management policy that automatically launches or terminates virtual machine instances behind an Application Load Balancer based on real-time metrics (e.g. maintaining average CPU utilization at 60% or target request count per target).",
    explanation: "Handles sudden festive shopping traffic rushes in Bengal and automatically scales down at midnight to save server costs.",
    hint: "Automatically adds or removes cloud servers based on live traffic demand to save money.",
    level: "basic",
    codeExample: "ASG_Policy: TargetTrackingScalingPolicy { Metric: ALBRequestCountPerTarget, TargetValue: 1000 }"
  },
  {
    question: "What is Cloud Web Application Firewall (WAF) Rate Limiting?",
    shortAnswer: "A security rule that tracks the number of HTTP requests originating from a single IP address within a 5-minute evaluation window, automatically blocking or CAPTCHA-challenging any IP that exceeds the threshold (e.g. 2,000 requests / 5 mins).",
    explanation: "Stops brute-force login attacks and web scraping bots from exhausting cloud application database resources in Barrackpore.",
    hint: "Blocks or challenges IP addresses that make too many requests per minute to prevent brute-force attacks.",
    level: "basic",
    codeExample: "WAF_RateLimit: if (requestsFromSingleIP > 2000 in 5_Minutes) blockIP(Duration = 600_Seconds);"
  },
  {
    question: "What is Container Network Interface (CNI) IP-per-Pod model in Kubernetes?",
    shortAnswer: "Every Kubernetes pod receives its own unique, routable IP address within the VPC or overlay network, allowing pods to communicate directly without requiring port mapping (NAT) between cluster worker nodes.",
    explanation: "Simplifies microservice architectures and service discovery across large cloud Kubernetes clusters.",
    hint: "Gives every container pod its own real IP address so they can talk directly to each other without NAT.",
    level: "moderate",
    codeExample: "Pod_A (10.244.1.15) communicates with Pod_B (10.244.2.30) directly over native IP routing."
  },
  {
    question: "What is Cloud Bastion Host / Jump Box Architecture with MFA?",
    shortAnswer: "A hardened, single-purpose virtual machine in a public subnet that serves as the only authorized administrative entry point for SSH/RDP into private subnet instances, secured with strict IP whitelisting and Multi-Factor Authentication (MFA).",
    explanation: "Prevents developers from exposing private database servers directly to the public Internet in Ichapur.",
    hint: "A secure gateway server in the public subnet used by admins to safely SSH into private servers.",
    level: "basic",
    codeExample: "SSH_Route: Admin_Laptop → (MFA + Port 22) → Bastion_Host → (Private SSH) → Backend_DB_Server"
  },
  {
    question: "What is Cloud HSM (Hardware Security Module) in Cloud Cryptography?",
    shortAnswer: "A dedicated, single-tenant FIPS 140-2 Level 3 cryptographic hardware appliance provisioned inside a customer's VPC, allowing organizations to maintain full control of their encryption keys with zero cloud provider access.",
    explanation: "Enables financial and healthcare enterprises in West Bengal to meet strict regulatory compliance while migrating workloads to the cloud.",
    hint: "Dedicated hardware encryption vault inside your cloud VPC giving you full control of security keys.",
    level: "expert",
    codeExample: "CloudHSM: Customer_App → (PKCS#11 API) → Dedicated_Cloud_HSM_Appliance (FIPS 140-2 Level 3)"
  },
  {
    question: "What is Data Plane Development Kit (DPDK) in Cloud Network Function Virtualization (NFV)?",
    shortAnswer: "A set of libraries and network interface controller drivers for fast packet processing that runs in Linux user space, polling physical NICs directly and bypassing the kernel TCP/IP stack to process millions of packets per second.",
    explanation: "Allows virtual cloud firewalls and routers to achieve line-rate 40G/100G threat inspection throughput.",
    hint: "Processes network packets directly in user space, bypassing the OS kernel for ultra-fast packet speeds.",
    level: "expert",
    codeExample: "DPDK_Driver: PollingModeDriver (PMD) reads NIC ring buffer directly → Zero Kernel Context Switch"
  },
  {
    question: "What is Cloud VPC Ingress Routing (Gateway Route Tables)?",
    shortAnswer: "A routing capability that allows incoming traffic from an Internet Gateway (IGW) or Virtual Private Gateway (VGW) to be redirected to a security appliance's virtual network interface before reaching the destination subnet.",
    explanation: "Enables transparent inline inspection of all incoming Internet traffic by cloud firewall appliances in Kolkata.",
    hint: "Directs incoming internet traffic through a virtual firewall before it reaches your applications.",
    level: "expert",
    codeExample: "IGW_RouteTable: Destination '10.0.1.0/24' → Target 'eni-security-appliance' (Inline Inspection)"
  },
  {
    question: "What is Site-to-Site IPsec VPN Backup for Cloud Direct Connect?",
    shortAnswer: "A secondary, cost-effective encrypted IPsec VPN tunnel running over the public Internet that automatically takes over routing using dynamic BGP routing if the primary physical Direct Connect fiber circuit is severed.",
    explanation: "Guarantees 99.99% hybrid cloud uptime for enterprises in Barrackpore during physical cable maintenance.",
    hint: "Backup encrypted internet VPN tunnel that automatically activates if the physical fiber link breaks.",
    level: "moderate",
    codeExample: "router bgp 65001\n  neighbor DirectConnect_Peer route-map PREFER_PRIMARY in\n  neighbor IPsec_VPN_Peer route-map BACKUP in"
  },
  {
    question: "What is Cloud DDoS Protection (e.g. AWS Shield / Cloudflare Magic Transit)?",
    shortAnswer: "A managed threat defense service that inspects incoming ingress traffic across global Anycast points of presence, automatically scrubbing multi-terabit volumetric SYN floods, UDP amplification, and Layer 7 HTTP floods before they reach customer VPCs.",
    explanation: "Absorbs massive botnet attacks without degrading e-commerce or streaming application performance in West Bengal.",
    hint: "Global cloud defense that automatically scrubs and filters out massive multi-terabit DDoS attacks.",
    level: "basic",
    codeExample: "CloudShield: Ingress_Traffic (1.2 Tbps Flood) → Anycast Scrubbing Center → Clean_Traffic (2 Gbps) to VPC"
  },
  {
    question: "What is Microservices Service Mesh (e.g. Istio / Linkerd) Mutual TLS in Cloud Environments?",
    shortAnswer: "A dedicated infrastructure layer of sidecar proxies (Envoy) injected alongside application containers that automatically encrypts all service-to-service communication with Mutual TLS (mTLS) and enforces granular identity-based access policies.",
    explanation: "Eliminates cleartext communication between microservices inside Kubernetes clusters in Jadavpur.",
    hint: "Sidecar proxy system that automatically encrypts all container-to-container communication with mTLS.",
    level: "expert",
    codeExample: "Istio_Policy: PeerAuthentication { mtls: { mode: STRICT } } // Mandates mTLS across all microservices"
  },
  {
    question: "What is an Immutable Infrastructure & Infrastructure as Code (IaC) deployment for Cloud Networks?",
    shortAnswer: "Defining all VPCs, subnets, route tables, security groups, and transit gateways in version-controlled code templates (Terraform / OpenTofu / CloudFormation), enabling reproducible, automated, and audited network deployments.",
    explanation: "Eliminates human configuration errors and guarantees identical security posture across production and staging environments.",
    hint: "Writing cloud network setups as code (Terraform) to automate and replicate secure network setups.",
    level: "basic",
    codeExample: "terraform {\n  resource 'aws_vpc' 'main' { cidr_block = '10.0.0.0/16' }\n} // Automated Network Provisioning"
  },
  {
    question: "What is the ultimate golden rule for architecting, scaling, and securing Cloud Computing Networks?",
    shortAnswer: "'Enforce public-private subnet segregation with stateful Security Groups; interconnect VPCs via centralized Transit Gateways and dedicated Direct Connect; deploy eBPF/Cilium container networking with mTLS; audit configurations with CSPM; and budget cloud infrastructure in Indian Rupees (₹)!'",
    explanation: "This complete rule captures cloud perimeter isolation, scalable hybrid transit, container mesh security, automated configuration auditing, and financial cloud budgeting.",
    hint: "Public/Private subnets + Transit Gateway Direct Connect + Cilium eBPF + CSPM auditing + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: SegmentPublicPrivateVPC() → DeployTransitGateway_DirectConnect() → EnforceCilium_eBPF_mTLS() → AuditWithCSPM() → BudgetInRupees(₹);"
  }
];

export default questions;
