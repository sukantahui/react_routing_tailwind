const questions = [
  {
    question: "What is the difference between Business Continuity Planning (BCP) and Disaster Recovery (DR) in an Information Security Management System (ISMS)?",
    shortAnswer: "BCP is the strategic, organization-wide framework ensuring all business operations (people, facilities, supply chains) continue during a crisis; DR is the tactical, technical IT subset focused on restoring IT infrastructure, databases, and network connectivity.",
    explanation: "Under ISO 22301 and ISO 27001 (Controls A.5.29, A.5.30, A.8.14): 1. Business Continuity Planning (BCP): Addresses holistic enterprise survival—relocating staff, crisis public relations, executive succession, and maintaining customer service; 2. Disaster Recovery (DR): The engineering blueprint for recovering technical workloads—spinning up secondary virtual machines, failing over DNS, and restoring database backups.",
    hint: "Think of keeping the business alive (BCP) versus recovering the IT servers and databases (DR).",
    level: "basic",
    codeExample: `// BCP vs DR Scope:
Business Continuity Planning (BCP) ➔ Strategic: People, Facilities, Legal, Communications, Supply Chains
Disaster Recovery (DR)             ➔ Technical: Servers, SAN Storage, Databases, Cloud VPC Failover`
  },
  {
    question: "What is Recovery Time Objective (RTO) versus Recovery Point Objective (RPO), and how do they determine disaster recovery design?",
    shortAnswer: "RTO is the maximum acceptable duration of system downtime after a disaster; RPO is the maximum acceptable volume of data loss measured back in time from the moment of disruption.",
    explanation: "RTO and RPO are defined during the Business Impact Analysis (BIA): 1. RTO (Recovery Time Objective): How long can systems stay down before catastrophic harm occurs? (e.g. UPI payment switch RTO = 15 seconds; payroll portal RTO = 48 hours); 2. RPO (Recovery Point Objective): How much data loss can be tolerated? (e.g. synchronous database replication achieves RPO = 0 seconds; daily tape backup yields RPO = 24 hours).",
    hint: "Remember: RTO is the clock ticking forward (downtime); RPO is the clock looking backward (data loss).",
    level: "basic",
    codeExample: `// RTO vs RPO Metrics:
[ RPO: 0 Seconds ]     ➔ Synchronous AWS Aurora Multi-AZ Replication (Zero Transaction Loss)
[ DISASTER EVENT ]     ➔ Primary Mumbai Data Center Loses Power at 02:00:00 IST
[ RTO: 15 Seconds ]    ➔ Automated Route 53 DNS Failover to Kolkata DR Site completes at 02:00:15 IST`
  },
  {
    question: "What is Maximum Tolerable Downtime (MTD / MAO), and what is its mathematical relationship with RTO and Work Recovery Time (WRT)?",
    shortAnswer: "MTD is the absolute maximum time a business process can be inoperative before irreversible bankruptcy, regulatory collapse, or loss of license occurs; mathematically, $$\\text{MTD} \\ge \\text{RTO} + \\text{WRT}$$.",
    explanation: "Recovering servers does not mean business operations are instantly normal. After technical recovery is complete (RTO), staff require Work Recovery Time (WRT) to verify database integrity, re-enter pending offline transactions, and clear system queues. If RTO + WRT exceeds the Maximum Tolerable Downtime (MTD), the enterprise will suffer fatal financial, legal, or reputational destruction.",
    hint: "Remember that MTD must be greater than or equal to technical recovery (RTO) plus operational verification (WRT).",
    level: "moderate",
    codeExample: `// Continuity Master Equation:
MTD (Maximum Tolerable Downtime) = 4 Hours (Enterprise collapses if down longer)
RTO (Technical Server Recovery)  = 2 Hours (Servers online)
WRT (Data Verification & Catchup)= 1.5 Hours (Integrity checks complete)
Total Recovery Time = RTO + WRT = 3.5 Hours (<= 4 Hours MTD → BUSINESS SURVIVES!)`
  },
  {
    question: "What is a Business Impact Analysis (BIA - ISO 22301 Clause 8.2.2), and what are its mandatory deliverables?",
    shortAnswer: "A BIA is a structured evaluation that identifies critical business functions, assesses the quantitative (financial) and qualitative (legal/reputational) impacts of operational disruption over time, and establishes formal RTO, RPO, and MTD targets.",
    explanation: "Without a BIA, organizations either overspend on non-essential systems or under-protect mission-critical operations. The BIA deliverables include: 1. Critical Process Inventory: Cataloging all enterprise workflows; 2. Financial Loss Curves: Calculating loss per hour (e.g. ₹50 Lakhs/hr for payment switch vs ₹5,000/hr for internal blog); 3. Dependency Mapping: Documenting underlying IT, vendor, and human dependencies; 4. Tiered RTO/RPO SLAs.",
    hint: "Think of diagnosing which organs are vital for survival before designing emergency medical care.",
    level: "moderate",
    codeExample: `// BIA Criticality Tiering:
Tier 1 (Mission-Critical): UPI Payment Switch    ➔ RTO < 15s  | RPO = 0s  | Loss = ₹50 Lakhs/hr
Tier 2 (Business-Critical): Oncology PACS Images  ➔ RTO < 2h   | RPO < 15m | Loss = Clinical Risk
Tier 3 (Important):         Customer Billing ERP ➔ RTO < 24h  | RPO < 4h  | Loss = ₹2 Lakhs/day
Tier 4 (Non-Essential):     Internal Training CMS➔ RTO < 72h  | RPO < 24h | Loss = Minimal`
  },
  {
    question: "What are the structural differences between Hot Sites, Warm Sites, and Cold Sites for disaster recovery?",
    shortAnswer: "Hot Site (Fully mirrored, active hardware and synchronous data, RTO seconds, highest cost); Warm Site (Pre-installed hardware with periodic data sync, RTO 1-4 hours, moderate cost); Cold Site (Empty physical facility with power and HVAC but no hardware, RTO days/weeks, lowest cost).",
    explanation: "Choosing a DR site involves balancing cost against RTO/RPO requirements: 1. Hot Site: Fully redundant duplicate data center with running servers and real-time data replication; provides near-instant automated cutover; 2. Warm Site: Hardware is powered on with OS installed, but database backups must be restored and services started upon disaster declaration; 3. Cold Site: Only provides physical space, power, and cooling; servers must be purchased, shipped, configured, and restored from scratch.",
    hint: "Contrast turnkey instant switchover (Hot), ready hardware needing data restore (Warm), and empty warehouse (Cold).",
    level: "basic",
    codeExample: `// Disaster Recovery Site Matrix:
| DR Site Type | Infrastructure State | Data Sync Status     | RTO Target   | Cost Level  |
|--------------|----------------------|----------------------|--------------|-------------|
| Hot Site     | Fully Operational    | Real-Time (Sync)     | Seconds/Mins | Very High   |
| Warm Site    | Hardware Pre-Racked  | Periodic (Async)     | 1 - 4 Hours  | Moderate    |
| Cold Site    | Empty Shell (Power)  | None (Shipped Tapes) | Days/Weeks   | Low         |`
  },
  {
    question: "What are the four recognized BCP/DR testing methodologies, and why is a 'Full Interruption Test' the most risky?",
    shortAnswer: "1. Tabletop/Checklist Test; 2. Structured Walkthrough / Simulation; 3. Parallel Test (DR site online while primary runs); 4. Full Interruption / Cutover Test (Primary production shutdown and live traffic switched to DR site); Full Interruption is highest risk because failure at the DR site causes a real business outage.",
    explanation: "Testing validates that continuity plans actually work: 1. Tabletop: Reviewing plan documents around a conference table; 2. Walkthrough: Team steps through a hypothetical ransomware disaster scenario; 3. Parallel: Secondary DR environment is started and processes synthetic transactions alongside production; 4. Full Interruption: Simulating total destruction of the primary data center by pulling main breakers and running 100% live production traffic on the DR site.",
    hint: "Think of fire drills: Reading the manual (tabletop) vs pulling the building fire alarm (full interruption).",
    level: "expert",
    codeExample: `// DR Testing Hierarchy:
Level 1: Tabletop Review      ➔ Low Risk  | Validates Contact Trees & Role Assignments
Level 2: Simulation Drill     ➔ Low Risk  | Validates Incident Command Coordination
Level 3: Parallel System Test ➔ Med Risk  | Validates Data Replication & Application Spin-up
Level 4: Full Live Cutover    ➔ High Risk | Proves 100% Live Production Survivability!`
  },
  {
    question: "How does an 'Immutable Air-Gapped Backup Vault' protect against modern ransomware strains during disaster recovery?",
    shortAnswer: "Ransomware actively hunts and encrypts standard network backup shares; immutable WORM (Write Once, Read Many) storage and logical air-gapping prevent any deletion, modification, or re-encryption of backup snapshots for a locked retention duration.",
    explanation: "Modern ransomware groups (e.g. LockBit, BlackCat) spend weeks inside a network locating NAS, SAN, and cloud backup repositories to encrypt or delete them before detonating on production databases. Under ISO 27001 Control A.8.13 and A.8.14, enterprises deploy immutable cloud vaults (e.g. AWS S3 Object Lock in Compliance Mode) that strictly prohibit deletion even by the root cloud administrator, guaranteeing clean restore points.",
    hint: "Think of writing data into solid concrete that cannot be chipped away or painted over.",
    level: "moderate",
    codeExample: `// AWS S3 Object Lock Compliance Mode (Immutable Vault):
{
  "ObjectLockConfiguration": {
    "ObjectLockEnabled": "Enabled",
    "Rule": {
      "DefaultRetention": {
        "Mode": "COMPLIANCE",  // Cannot be deleted by anyone, including AWS Root Account!
        "Days": 90
      }
    }
  }
}`
  },
  {
    question: "What are the mandatory Business Continuity and Cyber Resilience directives issued by the Reserve Bank of India (RBI) for financial entities?",
    shortAnswer: "RBI Master Directions mandate that all commercial banks, payment aggregators, and FinTech switches must maintain a Recovery Time Objective (RTO) <= 4 hours, Recovery Point Objective (RPO) near zero, and conduct unannounced live disaster recovery drills semi-annually.",
    explanation: "Financial infrastructure continuity is a national security concern. Under RBI Cyber Security Framework guidelines: 1. RTO/RPO SLA: Core payment settlement switches must recover within defined limits (RTO <= 4h, RPO ~ 0); 2. Distance Separation: Primary and secondary data centers must be in different seismic and geographical zones; 3. Live Switchover: Banks must operate live production traffic from their secondary DR site for at least one full working day twice a year.",
    hint: "Remember the 4-hour RTO, near-zero RPO, geographical separation, and live semi-annual switchover tests.",
    level: "basic",
    codeExample: `// RBI Master Direction Compliance Matrix:
RTO Requirement:         <= 4 Hours for Core Banking / UPI Switches
RPO Requirement:         Near Zero (Synchronous database replication)
Geographic Separation:   Kolkata (Primary DC) <---> Mumbai (Secondary DR) [1,600+ km apart]
Live DR Drill:           Conducted semi-annually with 100% production traffic running on DR site`
  },
  {
    question: "How does Control A.5.30 (ICT Readiness for Business Continuity) in ISO/IEC 27001:2022 modernize technological continuity requirements?",
    shortAnswer: "Control A.5.30 requires organizations to continuously plan, implement, maintain, and test ICT capabilities (cloud elasticity, multi-region redundancy, automated failover pipelines) based on BCP objectives, rather than treating IT disaster recovery as an isolated afterthought.",
    explanation: "In the 2013 standard, continuity was vaguely split across operational controls. ISO 27001:2022 introduced Control A.5.30 as a dedicated mandate ensuring that ICT infrastructure is architected from day one with sufficient capacity, automated failover mechanisms, and validated recovery procedures to satisfy enterprise Business Impact Analysis (BIA) requirements.",
    hint: "Think of baking high availability and automated failover into system blueprints from the start.",
    level: "moderate",
    codeExample: `// Control A.5.30 Architecture:
Infrastructure: Multi-AZ Kubernetes Cluster across 3 Availability Zones
Data Layer:     Multi-Region PostgreSQL with synchronous standby replica
Validation:     Automated Chaos Engineering (Chaos Mesh) simulating node failures weekly`
  },
  {
    question: "What is 'Split-Brain Syndrome' in multi-region active-active database clusters during a disaster failover, and how is it prevented?",
    shortAnswer: "Split-brain occurs when a network partition disconnects primary and secondary data centers, causing both sites to believe the other has failed and accept conflicting write transactions simultaneously; prevented via quorum consensus algorithms (Raft/Paxos) and automated fencing.",
    explanation: "If a telecommunications fiber cut separates Kolkata and Mumbai data centers, and both sites simultaneously promote themselves to 'Primary', customers in Kolkata and Mumbai will write conflicting account balances. When connectivity resumes, the database is hopelessly corrupted. Quorum consensus mechanisms (requiring a minimum of 3 nodes to achieve majority vote before accepting writes) ensure only the partition with majority consensus can accept writes.",
    hint: "Think of two captains simultaneously issuing conflicting steering orders to the same ship.",
    level: "expert",
    codeExample: `// Quorum Consensus Preventing Split-Brain:
Total Cluster Nodes: 3 (Node 1: Kolkata, Node 2: Mumbai, Node 3: Hyderabad Witness)
Network Partition:   Kolkata isolated from Mumbai and Hyderabad
Quorum Check:        Mumbai + Hyderabad = 2/3 Nodes (Majority Quorum Achieved → Accepts Writes!)
Kolkata Isolation:   Kolkata = 1/3 Nodes (No Quorum → Automatically switches to READ-ONLY fencing!)`
  },
  {
    question: "What role does Crisis Public Relations and Stakeholder Communications play during a BCP execution?",
    shortAnswer: "Crisis communications provides transparent, accurate, and scheduled updates to customers, regulators, media, and employees, preventing panic, brand reputational destruction, and stock market collapse.",
    explanation: "Technical recovery is only half the battle. If a bank switch goes down and customers receive zero communication, rumors of bankruptcy spread rapidly on social media, triggering devastating bank runs. A dedicated BCP Crisis Communications Plan pre-authorizes approved public statements, designates a single official corporate spokesperson, and manages updates across official status pages (status.company.com).",
    hint: "Think of calm, factual announcements from the captain during aircraft turbulence.",
    level: "basic",
    codeExample: `// BCP Crisis Communication Protocol:
1. Status Page: Update status.kolkatafintech.in within 10 minutes of disruption
2. Social Media: Pre-approved factual holding statement released by authorized PR lead
3. Direct Alert: Automated SMS dispatched to merchants informing them of estimated 15-minute recovery`
  },
  {
    question: "How does the Digital Personal Data Protection (DPDP) Act 2023 enforce availability and disaster recovery under Section 8?",
    shortAnswer: "Under Section 8(5), a Data Fiduciary must protect digital personal data against loss of access or unauthorized destruction; a catastrophic unrecoverable database loss violates statutory duties, exposing the organization to ₹250 Crore penalties under Section 33.",
    explanation: "Information security is not only about confidentiality; Availability and Resilience are co-equal pillars under Section 8 of the DPDP Act 2023. If a healthcare provider or FinTech company permanently loses customer KYC records or medical histories due to lack of disaster recovery backups, the Data Protection Board of India will treat the failure as gross organizational negligence, triggering maximum statutory penalties.",
    hint: "Remember that losing customer data permanently is a major statutory violation.",
    level: "basic",
    codeExample: `// DPDP Statutory Continuity Defense:
Requirement:   Section 8(5) Mandatory Reasonable Organizational & Technical Safeguards
Implementation:Control A.5.30 (ICT Readiness) + Control A.8.13 (Immutable Backups)
Defense Value: Proves zero permanent data loss occurred during power outage → Immunized from ₹250 Cr fines!`
  },
  {
    question: "Synthesizing Business Continuity Planning (BCP) and Disaster Recovery (DR): what is the master equation of Business Resilience?",
    shortAnswer: "$$\\text{Enterprise Resilience} = \\frac{\\text{BIA Accuracy} \\times \\text{Automated Failover Velocity (RTO)} \\times \\text{Immutable Backup Integrity (RPO)}}{\\text{Maximum Tolerable Downtime (MTD)} + \\text{Un-tested Continuity Procedures}}$$ with semi-annual live cutover verification.",
    explanation: "This master governance relationship proves that business survivability during a catastrophe is a function of accurate impact analysis, sub-minute automated failover, and immutable backup protection. Keeping recovery time well within Maximum Tolerable Downtime limits and validating plans through live drills guarantees 100% operational continuity and complete statutory safe harbor under global and Indian cyber laws.",
    hint: "Conclude by reviewing how the synergy of BIA, RTO, RPO, and live DR drills guarantees business survival.",
    level: "expert",
    codeExample: `// Master Equation of Business Resilience:
Resilience = (BIA_Precision * Failover_Speed_RTO * Immutable_Data_RPO) / (MTD_Tolerance + UnTested_Gaps);
Outcome: Zero Data Loss, Instantaneous Multi-Region Cutover & Total Regulatory Safe Harbor!`
  }
];

export default questions;
