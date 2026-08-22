// topic5_questions.js
// 30 Moderate to Expert Questions on Availability: System Accessibility and Uptime

const questions = [
  {
    question: "What does the Availability pillar of the CIA triad ensure?",
    shortAnswer: "Availability ensures that authorized users have prompt, uninterrupted, and reliable access to critical data, applications, networks, and hardware resources whenever needed.",
    explanation: "A secure system that is inaccessible fails its primary operational mission.",
    hint: "Ensuring authorized users can always access systems, applications, and data when needed.",
    level: "basic",
    codeExample: "AvailabilityPercentage = (UptimeHours / TotalHours) * 100;"
  },
  {
    question: "What is the mathematical definition of High Availability 'Nines'?",
    shortAnswer: "A standard metric expressing system uptime as a percentage over a one-year period (e.g. 99.9% = Three Nines allowing 8.76 hours downtime/year; 99.999% = Five Nines allowing only 5.26 minutes downtime/year).",
    explanation: "Five Nines (99.999%) is the gold standard for telecom carriers, medical telemetry, and banking core switches.",
    hint: "Percentage of annual uptime: 99.9% allows ~8.76 hours downtime, 99.999% allows ~5.26 minutes.",
    level: "moderate",
    codeExample: "const maxDowntimeSeconds = (1 - 0.99999) * (365.25 * 24 * 3600); // ~315.6 seconds/year"
  },
  {
    question: "What is the difference between Recovery Time Objective (RTO) and Recovery Point Objective (RPO)?",
    shortAnswer: "RTO is the maximum tolerable duration a system can remain down after an outage before normal operations resume; RPO is the maximum tolerable age of data loss measured in time (e.g. losing at most 15 minutes of transactional records).",
    explanation: "RTO dictates server rebuild speed; RPO dictates backup frequency and replication strategy.",
    hint: "RTO is how quickly you must restore the system; RPO is how much data loss is acceptable.",
    level: "moderate",
    codeExample: "DR_Metrics = { RTO: '2 Hours (Max Downtime)', RPO: '5 Minutes (Max Data Loss)' };"
  },
  {
    question: "How does an Active-Active cluster differ from an Active-Passive failover cluster?",
    shortAnswer: "In Active-Active, all server nodes process incoming production traffic simultaneously under a load balancer; in Active-Passive, primary nodes handle live traffic while standby nodes remain idle until a heartbeat monitor detects primary failure and triggers failover.",
    explanation: "Active-Active maximizes hardware utilization and delivers near-zero failover latency.",
    hint: "Active-Active runs all nodes simultaneously; Active-Passive keeps standby nodes idle until failure.",
    level: "basic",
    codeExample: "// Active-Active: LB -> [NodeA, NodeB]\n// Active-Passive: LB -> NodeA (Primary) | NodeB (Standby on standby sync)"
  },
  {
    question: "What is MTBF (Mean Time Between Failures) and MTTR (Mean Time to Repair)?",
    shortAnswer: "MTBF measures the predicted elapsed operational time between inherent equipment failures during normal service; MTTR measures the average time required to troubleshoot, fix, and restore a failed component to full operation.",
    explanation: "High Availability = MTBF / (MTBF + MTTR).",
    hint: "MTBF is average operating time before a failure; MTTR is average time needed to fix it.",
    level: "moderate",
    codeExample: "Availability = MTBF / (MTBF + MTTR);"
  },
  {
    question: "What is BGP Anycast and how does it enhance global DNS and CDN availability?",
    shortAnswer: "A network addressing routing technique where multiple geographically distributed edge servers share the exact same IP address; global routers use BGP to route end-user requests to the topologically nearest available node, instantly bypassing offline nodes.",
    explanation: "Used extensively by Cloudflare, Google DNS (8.8.8.8), and Akamai to absorb massive DDoS surges.",
    hint: "Multiple worldwide servers sharing one IP address, routing users to the closest healthy node.",
    level: "expert",
    codeExample: "AnycastNode = RouteToClosestAS(TargetIP: '1.1.1.1', UserOrigin: 'Kolkata_AS133612');"
  },
  {
    question: "How does RAID 10 (1+0) provide both high availability and high performance?",
    shortAnswer: "RAID 10 combines disk mirroring (RAID 1) with disk striping (RAID 0), allowing the array to survive simultaneous drive failures (one per mirror pair) while providing rapid read and write throughput.",
    explanation: "Requires a minimum of 4 drives and 50% capacity overhead, standard in tier-1 database clusters.",
    hint: "Mirrors drives for redundancy and stripes across pairs for speed.",
    level: "moderate",
    codeExample: "RAID10 = Stripe([ Mirror(Disk1, Disk2), Mirror(Disk3, Disk4) ]);"
  },
  {
    question: "What is a Circuit Breaker Pattern in distributed microservice resilience?",
    shortAnswer: "A software design pattern that detects downstream service failures and temporarily trips (opens) to stop sending requests, returning fallback responses immediately rather than exhausting connection pools and cascading outages.",
    explanation: "Prevents a single slow third-party API from taking down an entire banking or e-commerce portal.",
    hint: "Halting calls to a failing downstream service to prevent whole-system cascade failure.",
    level: "moderate",
    codeExample: "if (failureCount > 5) { circuitState = 'OPEN'; return fallbackCache; }"
  },
  {
    question: "What is the role of N+1 and 2N Power & Cooling Redundancy in Tier-3/Tier-4 Data Centers?",
    shortAnswer: "N+1 means there is one backup component (e.g. UPS, generator, CRAH unit) for every 'N' operational units required; 2N (fully redundant) provides a complete duplicate parallel infrastructure, allowing maintenance without any service interruption.",
    explanation: "Guarantees continuous 99.982% (Tier 3) and 99.995% (Tier 4) physical facility uptime.",
    hint: "N+1 has one extra backup unit; 2N has a completely duplicated independent backup system.",
    level: "expert",
    codeExample: "DataCenter_Tier4 = { PowerFeeds: 2, GeneratorRedundancy: '2N', SLA: '99.995%' };"
  },
  {
    question: "How does Geographically Distributed Multi-Region Replication prevent regional disaster outages?",
    shortAnswer: "Database and application clusters are synchronously or asynchronously replicated across disparate seismic and power zones (e.g. Mumbai and Hyderabad/Kolkata), enabling seamless failover if an entire metro area experiences a catastrophic grid or flood failure.",
    explanation: "Protects against natural disasters, metro power blackouts, and localized subsea fiber cuts.",
    hint: "Replicating systems across different distant geographic zones to survive localized disasters.",
    level: "moderate",
    codeExample: "DatabaseCluster.CrossRegionReplica = { Primary: 'ap-south-1 (Mumbai)', DR: 'ap-south-2 (Hyderabad)' };"
  },
  {
    question: "What is a Health Check probe in Kubernetes/Load Balancers and how does it preserve availability?",
    shortAnswer: "Automated probes (Liveness and Readiness) periodically poll endpoint endpoints (e.g. /healthz); if a pod fails to respond within the timeout, the load balancer removes it from the routing pool and Kubernetes automatically restarts the crashed container.",
    explanation: "Ensures traffic is never routed to hung or memory-exhausted processes.",
    hint: "Periodic automated pings to verify server responsiveness and pull dead nodes from rotation.",
    level: "basic",
    codeExample: "livenessProbe: { httpGet: { path: '/healthz', port: 8080 }, periodSeconds: 5 }"
  },
  {
    question: "What is Graceful Degradation in high-load availability engineering?",
    shortAnswer: "Designing an application so that when resources are overwhelmed during peak traffic surges, non-critical features (such as personalized recommendations or animated widgets) are temporarily disabled to ensure core transactional services (checkout, login) remain online.",
    explanation: "Preserves essential business operations during extreme demand spikes (e.g. Diwali sales).",
    hint: "Shutting down non-essential features during heavy load so essential services stay up.",
    level: "moderate",
    codeExample: "if (SystemLoad > 85%) { DisableRecommendationEngine(); ServeStaticCatalog(); }"
  },
  {
    question: "How does Chaos Engineering (e.g. Netflix Chaos Monkey) proactively test availability resilience?",
    shortAnswer: "Chaos Engineering intentionally injects pseudorandom faults (terminating live production containers, simulating network latency, cutting database links) during business hours to verify that automated failover, autoscaling, and self-healing mechanisms work seamlessly.",
    explanation: "Validates system resilience before unforeseen real-world failures occur.",
    hint: "Intentionally killing production servers to verify automated failover and self-healing.",
    level: "expert",
    codeExample: "ChaosMonkey.KillRandomInstance(Service: 'payment-service-pod-3');"
  },
  {
    question: "What is the RBI Directive regarding High Availability and Uptime for Payment Operators in India?",
    shortAnswer: "The Reserve Bank of India (RBI) mandates that authorized payment systems (UPI, IMPS, RTGS gateways) maintain minimum 99.9% uptime, establish near-zero RPO with synchronous database replication, and conduct mandatory bi-annual Disaster Recovery (DR) drills.",
    explanation: "Non-compliance triggers severe regulatory financial penalties and temporary merchant onboarding bans.",
    hint: "RBI mandates 99.9% uptime, near-zero RPO, and bi-annual DR drills for payment gateways.",
    level: "moderate",
    codeExample: "RBI_Compliance = { MinUptime: '99.9%', MandatoryDRDrills: 'Every 6 Months', PenaltyThreshold: 'Exceeded SLA' };"
  },
  {
    question: "What is Split-Brain syndrome in High Availability clusters and how is Quorum used to solve it?",
    shortAnswer: "When network communication between nodes breaks, both sub-clusters believe the other is dead and attempt to write to shared storage simultaneously, corrupting data; Quorum (requiring (N/2)+1 votes or a dedicated witness node) ensures only the partition with a majority remains active.",
    explanation: "Standard in Raft, Paxos, Pacemaker/Corosync, and Kubernetes etcd consensus engines.",
    hint: "Both severed cluster halves acting as primary; prevented by requiring a majority quorum vote.",
    level: "expert",
    codeExample: "HasQuorum = ActiveNodes > Math.floor(TotalNodes / 2);"
  },
  {
    question: "What is Auto-Scaling and Horizontal Pod Autoscaling (HPA)?",
    shortAnswer: "Dynamic provisioning and de-provisioning of server compute instances or container pods based on real-time CPU, memory, or request volume metrics to absorb unexpected traffic surges without service denial.",
    explanation: "Elastic infrastructure maintains target response times during traffic spikes.",
    hint: "Automatically adding more server instances as CPU and user traffic surges.",
    level: "basic",
    codeExample: "kubectl autoscale deployment api-gateway --cpu-percent=70 --min=3 --max=20"
  },
  {
    question: "How does Rate Limiting & Throttling preserve backend API availability?",
    shortAnswer: "Restricting the number of requests a single IP address, user, or API key can make within a specified time window (e.g. 100 requests/minute using Token Bucket or Leaky Bucket algorithms) to prevent rogue scripts from exhausting server CPU/database connections.",
    explanation: "Protects application servers from resource starvation caused by aggressive crawlers or API abuse.",
    hint: "Limiting requests per minute per user to keep servers from crashing under excessive load.",
    level: "basic",
    codeExample: "const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });"
  },
  {
    question: "What is a Cold Standby vs Warm Standby vs Hot Standby Disaster Recovery site?",
    shortAnswer: "Cold Standby: Infrastructure exists but is powered off (RTO days); Warm Standby: Scaled-down core services run with periodic data replication (RTO hours); Hot Standby: Fully mirrored live environment ready to take over traffic instantaneously (RTO seconds/minutes).",
    explanation: "Choice depends on business risk tolerance and infrastructure budget.",
    hint: "Cold is powered off; Warm is partially running; Hot is fully active and instant.",
    level: "moderate",
    codeExample: "DR_Strategies = { Cold: 'RTO Days', Warm: 'RTO 1-2 Hours', Hot: 'RTO Near-Zero' };"
  },
  {
    question: "What is Anycast BGP DNS Failover and how does it prevent Single Points of Failure (SPOF)?",
    shortAnswer: "Authoritative nameservers announce the same prefix from multiple global POPs (Points of Presence); if a data center goes dark, BGP automatically withdraws the route, seamlessly routing queries to surviving POPs with zero user intervention.",
    explanation: "Eliminates DNS outages as a cause of service downtime.",
    hint: "Global DNS network that automatically routes around crashed data centers using BGP.",
    level: "expert",
    codeExample: "BGP_Route_Withdrawal(PoP: 'Kolkata_DC_3') -> Users re-routed to 'Mumbai_DC_1'"
  },
  {
    question: "How does Immutable Infrastructure (Infrastructure as Code) accelerate MTTR during disasters?",
    shortAnswer: "Using Terraform and Ansible scripts to provision and configure the entire cloud infrastructure from scratch in minutes rather than manually configuring servers, allowing entire damaged environments to be recreated cleanly.",
    explanation: "Eliminates configuration drift and human error during disaster recovery rebuilds.",
    hint: "Rebuilding entire server environments in minutes using automated Terraform scripts.",
    level: "moderate",
    codeExample: "terraform apply -auto-approve -var-file=dr-site.tfvars"
  },
  {
    question: "What is Single Point of Failure (SPOF) identification and how is it eliminated?",
    shortAnswer: "A SPOF is any single component (router, database master, power supply, SSL certificate) whose failure causes the entire system to halt; eliminated by introducing redundant hardware, secondary uplinks, dual power supplies, and clustered databases.",
    explanation: "Comprehensive availability audits map dependency graphs to flag un-replicated nodes.",
    hint: "Any single part whose failure crashes the whole system; fixed by adding redundant backups.",
    level: "basic",
    codeExample: "AuditSPOF() -> DetectSingleUplink() -> DeploySecondaryFiberProvider();"
  },
  {
    question: "What is Write-Ahead Logging (WAL) and Database Journaling in crash recovery availability?",
    shortAnswer: "Database transactions are recorded to persistent non-volatile disk logs before changes are written to actual data tables; upon an abrupt power crash, the database engine replays the WAL to restore a consistent state without data corruption.",
    explanation: "Enforces the Durability and Consistency guarantees of ACID databases.",
    hint: "Writing transaction steps to disk logs first so the database can recover cleanly after a power crash.",
    level: "moderate",
    codeExample: "PostgreSQL: checkpoint_completion_target = 0.9, wal_level = replica"
  },
  {
    question: "How does Content Delivery Network (CDN) Edge Caching offload origin servers during flash crowds?",
    shortAnswer: "Static assets (HTML, CSS, JS, images) and cacheable API JSON responses are cached across thousands of global edge nodes, serving 85-98% of incoming traffic directly from cache without hitting origin database servers.",
    explanation: "Origin servers only handle cache misses and dynamic state modifications.",
    hint: "Storing static web files on servers close to users so the main server is not overloaded.",
    level: "basic",
    codeExample: "Cache-Control: public, max-age=31536000, immutable"
  },
  {
    question: "What is Blue-Green Deployment and how does it achieve Zero-Downtime Releases?",
    shortAnswer: "Maintaining two identical production environments (Blue = live version, Green = new version); after deploying and testing the update on Green, router/load balancer traffic is flipped to Green instantly with zero user interruption and instant rollback capability.",
    explanation: "Eliminates scheduled maintenance downtime windows during software updates.",
    hint: "Running two identical environments and switching router traffic instantly to the new version.",
    level: "moderate",
    codeExample: "LoadBalancer.TargetGroup = (HealthCheckPassed) ? 'Green_Cluster' : 'Blue_Cluster';"
  },
  {
    question: "What is Canary Deployment and how does it safeguard system availability?",
    shortAnswer: "Rolling out a new software release to a small subset of users (e.g. 5%) while monitoring error rates, latency, and CPU spikes; if metrics remain healthy, the release gradually ramps up to 100%, otherwise it automatically rolls back before impacting the broader user base.",
    explanation: "Catches edge-case bugs in production with minimal blast radius.",
    hint: "Testing new software on 5% of users first before rolling it out to everyone.",
    level: "moderate",
    codeExample: "TrafficSplit = { Stable_v1: '95%', Canary_v2: '5%' };"
  },
  {
    question: "What is BCP (Business Continuity Planning) and how does it relate to IT Disaster Recovery (DR)?",
    shortAnswer: "BCP is the overarching organizational strategy that ensures all business operations (personnel, facilities, supply chains, communications) continue during a crisis; IT DR is the technical subset focused specifically on restoring IT infrastructure, data, and applications.",
    explanation: "A complete BCP ensures employees have backup work locations and communication channels.",
    hint: "BCP is the overall company survival plan; DR is the technical plan to restore IT systems.",
    level: "moderate",
    codeExample: "BCP_Scope = [ EmergencyStaffRelocation, CrisisCommunications, IT_DisasterRecovery ];"
  },
  {
    question: "How does Database Read-Replica offloading preserve primary master availability?",
    shortAnswer: "Directing all read-only SELECT queries to asynchronously replicated read-replicas, freeing the primary master node to exclusively handle heavy WRITE/UPDATE/DELETE transactions without connection pool exhaustion.",
    explanation: "Standard pattern in high-traffic applications with heavy read-to-write ratios (e.g. 9:1).",
    hint: "Sending read queries to secondary database copies so the main database isn't overloaded.",
    level: "basic",
    codeExample: "dbClient.readPool = [Replica1, Replica2]; dbClient.writePool = [PrimaryMaster];"
  },
  {
    question: "What is the typical commercial budget in Indian Rupees (₹) to deploy an Enterprise Multi-AZ HA Load Balancer, DR Hot-Standby Cluster & Auto-Scaling Grid in West Bengal?",
    shortAnswer: "Approximately ₹8,00,000 to ₹22,00,000 annually for AWS/Azure Multi-Region infrastructure, F5 BIG-IP / Cloudflare Enterprise load balancing, automated database replication, and dual-ISP high-speed leased lines.",
    explanation: "Protects enterprise FinTech and Healthcare platforms across Kolkata and Salt Lake Sector V from downtime.",
    hint: "Comprehensive enterprise HA and DR architecture costs ₹8,00,000 – ₹22,00,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "Enterprise_HA_Budget = ₹15,00,000; // Multi-AZ + Load Balancers + Hot Standby"
  },
  {
    question: "What is the consequence of failing to meet contracted SLA Uptime for enterprise service providers?",
    shortAnswer: "Service providers must issue financial Service Credits (e.g. 10% to 50% invoice rebates), pay contractual liquidated damages, face regulatory fines from bodies like CERT-In/RBI, and suffer catastrophic brand trust destruction.",
    explanation: "SLA contracts legally bind uptime commitments to financial penalties.",
    hint: "Paying financial refunds and penalties to clients when agreed uptime is missed.",
    level: "moderate",
    codeExample: "if (MonthlyUptime < 99.9) { IssueServiceCredit(RefundPercentage: 25); }"
  },
  {
    question: "What is the ultimate golden rule for achieving High Availability and System Accessibility?",
    shortAnswer: "'Eliminate every Single Point of Failure (SPOF): build Active-Active multi-AZ redundancy, automate health checks and auto-scaling, establish strict RTO/RPO recovery targets, conduct regular chaos and DR drills, adhere to RBI 99.9% uptime guidelines, and budget enterprise resilience in Indian Rupees (₹)!'",
    explanation: "This complete rule captures architectural redundancy, automation, recovery objectives, compliance, and realistic financial budgeting.",
    hint: "Eliminate SPOFs, build Active-Active redundancy, automate health checks, enforce RTO/RPO, budget in ₹.",
    level: "moderate",
    codeExample: "GoldenAvailabilityRule: EliminateSPOF() -> DeployActiveActive() -> AutomateHealthChecks() -> EnforceRTO_RPO() -> BudgetInRupees(₹);"
  }
];

export default questions;
