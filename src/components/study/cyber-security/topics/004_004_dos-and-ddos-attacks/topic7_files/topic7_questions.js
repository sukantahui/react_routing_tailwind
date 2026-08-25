const questions = [
  {
    question: "What is a 'DDoS-for-Hire' Service (also known as a 'Booter' or 'Stresser'), and how does it commercialize Cyber Attacks?",
    shortAnswer: "An illicit online service that allows non-technical individuals to launch powerful DDoS attacks on demand through a web browser or Telegram bot for a subscription fee (e.g. ₹800 to ₹50,000/month), turning DDoS attacks into an accessible commodity.",
    explanation: "Booter services package complex DDoS attack infrastructure (botnets, high-bandwidth server clusters, amplification reflectors) into a point-and-click web dashboard. Users purchase subscription packages allowing them to specify a target IP, port, duration, and attack method, democratizing destructive volumetric and protocol attacks for script kiddies and extortionists.",
    hint: "An illegal taxi service where instead of ordering a ride, anyone with a credit card can order a 500 Gbps cyber bombardment.",
    level: "basic",
    codeExample: `// Booter / Stresser Service Web API Query:
// Simulated DDoS-for-Hire API request
POST [AUTHORIZED-LAB-ENDPOINT]/simulation
Headers: { "Authorization": "Bearer TOKEN_ABC123" }
Body: {
    "event": "DDoS simulation",
    "target": "[LAB Target]",
    "attackMethod": "[SIMULATED METHOD]",
    "status": "SIMULATED",
    "purpose": "Defensive detection training"
}`
  },
  {
    question: "What is the Legal Facade used by Stresser Websites to Evade Law Enforcement, and why is it Legally Void?",
    shortAnswer: "Stresser services place fake Terms of Service disclaimers claiming to be 'legitimate server stress-testing tools for network administrators', but courts globally and Indian law reject this facade because they do not verify target server ownership before launching attacks.",
    explanation: "To evade seizure by law enforcement, booter websites display banners like 'For Authorized Network Testing Only'. However, because these platforms do not verify whether the buyer owns or has written permission to flood the target IP, courts (and the FBI/Interpol/CBI) treat them as pure illegal DDoS attack infrastructure. In India, launching unauthorized floods is a crime under IT Act Section 43/66 regardless of disclaimers.",
    hint: "Selling lockpicks and burglary tools with a sticker that says 'For testing your own door only' to anyone who walks in.",
    level: "basic",
    codeExample: `// Fake Legal Disclaimer on Stresser Sites (Legally Void!):
// "By clicking 'Launch', you confirm that you own the target IP address and authorize this stress test."
// Court Verdict: Operation PowerOFF seized 48 booter domains, ruling disclaimers are legally void!`
  },
  {
    question: "What is the 'Economic Asymmetry' of DDoS Attacks (Attacker Cost vs Defender Cost)?",
    shortAnswer: "An attacker can rent a 500 Gbps booter attack for as little as ₹1,500/day, while the victim organization must spend ₹50,00,000+ on enterprise cloud scrubbing contracts, incident response retainers, and lost business revenue, representing an economic cost asymmetry of over 2,500:1.",
    explanation: "DDoS economics heavily favor the attacker. A competitor or disgruntled user can spend ₹2,000 on a booter subscription to take down an e-commerce platform in West Bengal during peak holiday sales. The business loses ₹40,00,000 in sales, pays emergency CDN mitigation fees, and suffers brand damage, demonstrating extreme economic disparity.",
    hint: "Throwing a ₹10 rock through a ₹5,00,000 plate-glass storefront window.",
    level: "moderate",
    codeExample: `// Economic Cost Asymmetry Ratio:
// Attacker Expenditure : ₹2,000 / month (Booter Subscription)
// Defender Expenditure : ₹50,00,000 (Cloud Scrubbing + SLA Losses + Forensic Incident Response)
// Asymmetry Factor     : 2,500x Cost Imbalance!`
  },
  {
    question: "How does the 'Booter Supply Chain' Operate from Low-Level Botnets to End-User Resellers?",
    shortAnswer: "Botnet operators compromise IoT devices and rent raw bandwidth to Stresser Admins, who build automated web/API frontends with billing integration; Resellers purchase API access in bulk and market subscriptions on Telegram and cybercrime forums.",
    explanation: "The DDoS underground has a mature 4-tier supply chain: 1. Infrastructure Miners: Infect IoT routers (Mirai) or exploit cloud VPS instances. 2. Stresser Developers: Build web portals, payment gateways, and API job schedulers. 3. API Resellers: White-label the booter UI and sell subscriptions on Telegram. 4. End-User Attackers: Pay with cryptocurrency to execute one-click attacks.",
    hint: "A multi-level marketing pyramid where raw botnet computing power is packaged, rebranded, and sold to retail script kiddies.",
    level: "expert",
    codeExample: `// 4-Tier Booter Underground Supply Chain:
// Tier 1: Botnet Developers (Compromise 100k IoT devices via Mirai)
// Tier 2: Stresser Backend Hubs (Aggregate botnets & reflection pools)
// Tier 3: Telegram API Resellers (White-label booter subscriptions)
// Tier 4: Script Kiddies / Extortionists (Click 'Launch Flood' on web dashboard)`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for using Booter Services to paralyze Critical Public Infrastructure?",
    shortAnswer: "Using DDoS-for-hire services to intentionally disrupt critical national infrastructure (power grid SCADA, railway systems, banking switches) to threaten national security is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary pays ₹10,000 to a booter service to launch an 800 Gbps volumetric flood that paralyzes state power grid telemetry routers in Barrackpore or financial settlement switches in Kolkata, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Booter-driven Cyber Terrorism.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Renting a booter service to launch multi-hundred gigabit floods against state electrical grids
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What is 'Ransom Denial of Service' (RDoS), and how do Cybercriminals combine Booter Services with Extortion Demands?",
    shortAnswer: "Attackers launch a brief 15-minute 'demonstration' DDoS attack using a booter service and send an email demanding payment in Bitcoin/Monero (e.g. ₹20-50 Lakhs), threatening a sustained multi-day blackout if the ransom is not paid.",
    explanation: "RDoS groups (e.g. Fancy Lazarus, Armada Collective) target financial platforms, gaming services, and healthcare institutions. They launch a short 100 Gbps sample flood to prove capability, then email executive leadership with a Bitcoin address and a 24-hour deadline. Security best practices mandate NEVER paying the ransom, as attackers often increase demands or sell the victim IP to other booter crews.",
    hint: "A protection racket where criminals throw a smoke bomb into a shop and demand monthly cash to not burn the shop down.",
    level: "moderate",
    codeExample: `// Sample RDoS Extortion Email:
// "We are Armada Collective. The 15-minute attack today on your Kolkata payment gateway was just a test. 
// Send 2.5 BTC (approx ₹1,50,00,000) to address 1A1zP... within 24 hours or we will launch a 1 Tbps flood!"`
  },
  {
    question: "Under the Indian Penal Code Section 384 and Section 385, what are the criminal penalties for Ransom Denial of Service (RDoS) Extortion?",
    shortAnswer: "Extortion by threatening injury or electronic service disruption carries imprisonment up to 3 years; putting a person in fear of injury in order to commit extortion carries imprisonment up to 2 years.",
    explanation: "Section 383/384 IPC defines Extortion. When cybercriminals use booter services to flood an e-commerce or healthcare portal and demand payment under threat of catastrophic business disruption, they are prosecuted under IPC Section 384 (Extortion - up to 3 years prison) alongside IT Act Section 66.",
    hint: "IPC Section 384 covers Extortion with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 384):
// Offense: Demanding ₹35 Lakhs in cryptocurrency under threat of continuing a booter DDoS flood (Extortion)
// Penalty: Imprisonment for a term up to 3 Years, or with Fine, or with both`
  },
  {
    question: "What was 'Operation PowerOFF', and how did Global Law Enforcement dismantle the DDoS-for-Hire Ecosystem?",
    shortAnswer: "A coordinated multinational operation led by the FBI, Europol, Dutch Police, and UK NCA that seized over 48 major booter domains (e.g. Quantum Stresser, Webstresser) and arrested administrators and top registered users worldwide.",
    explanation: "Launched in December 2022, Operation PowerOFF seized the infrastructure of the world's most popular booter services. In addition to seizing domain names and database servers, law enforcement seized customer transaction databases containing IP addresses, email addresses, PayPal/crypto transaction hashes, and target attack logs, using this data to prosecute thousands of booter customers globally.",
    hint: "A coordinated global police raid that shut down dozens of illegal hitman agencies and arrested all the customers in their client books.",
    level: "moderate",
    codeExample: `// Operation PowerOFF Law Enforcement Seizure Notice:
// "THIS DOMAIN HAS BEEN SEIZED by the Federal Bureau of Investigation, 
// the Police of the Netherlands, and the National Crime Agency of the UK in accordance with a seizure warrant."`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise obligations for maintaining service availability against Booter Attacks?",
    shortAnswer: "Organizations must implement reasonable technical availability safeguards; persistent failure to deploy upstream scrubbing against booter floods leading to citizen data access outages triggers statutory fines up to ₹250 Crores.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards. If a hospital network or banking portal in West Bengal fails to maintain DDoS scrubbing, resulting in persistent service paralysis from booter attacks, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Maintaining continuous service availability is a mandatory technical safeguard under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent booter availability controls`
  },
  {
    question: "What are 'Attack Concurrency Slots' and 'Max Boot Time' in Booter Subscription Pricing Models?",
    shortAnswer: "Concurrency slots determine how many simultaneous attack targets a subscriber can flood at once (e.g. 1 to 10 slots); Max Boot Time is the maximum duration for a single continuous attack burst (e.g. 300s to 3,600s).",
    explanation: "Booter plans are tiered based on three metrics: 1. Max Boot Time: Basic plans allow 300-second bursts (enough to kick a gamer off Xbox Live). VIP plans allow 3,600-second (1 hour) continuous floods. 2. Concurrency: Basic allows 1 active attack; enterprise allows 5-10 concurrent attacks against multiple subnets. 3. Attack Power: Layer 4 bandwidth caps (10 Gbps vs 500 Gbps) and Layer 7 RPS limits (10k vs 250k RPS).",
    hint: "Renting 1 bulldozer for 5 minutes vs renting 10 bulldozers for an entire day.",
    level: "expert",
    codeExample: `// Booter Tier Pricing Architecture:
// Tier 1 (Script Plan)  : ₹1,200/mo | 1 Slot | 300s Boot Time | 20 Gbps (Layer 4 only)
// Tier 2 (Pro Plan)     : ₹6,500/mo | 3 Slots| 1,200s Boot Time| 150 Gbps + Layer 7 HTTP Bypass
// Tier 3 (VIP Master)   : ₹35,000/mo| 10 Slots| 3,600s Boot Time| 500 Gbps Multi-Vector + API Access`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for DDoS attacks launched via Booter services affecting Indian entities?",
    shortAnswer: "All organizations in India must report DDoS attacks affecting public services, banking platforms, or corporate networks to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including booter-driven DDoS attacks) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of booter DDoS service outages within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "How do Booter Backends use 'API Dispatchers' and Dedicated Server Clusters rather than Pure IoT Botnets?",
    shortAnswer: "Modern booters rent high-bandwidth cloud VPS servers with spoofing-enabled uplinks (10-40 Gbps) located in bulletproof hosting providers, using API dispatchers to launch amplification floods on demand rather than relying solely on unreliable IoT bots.",
    explanation: "Early booters used compromised home routers (Mirai). However, IoT bots frequently go offline when rebooted. Modern commercial booters purchase dedicated 10 Gbps servers in bulletproof data centers that allow IP spoofing. When a user clicks 'Launch', the backend API dispatches commands to 20 dedicated servers, each blasting 10 Gbps of DNS/NTP reflection queries, generating a reliable 500 Gbps flood in seconds.",
    hint: "Hiring a professional trucking company with 20 heavy trucks on standby instead of relying on random volunteer bicycles.",
    level: "expert",
    codeExample: `// Booter Backend API Dispatcher Architecture:
// User Web Portal ➔ Central Master Node ➔ Dispatches JSON Job to 25 Dedicated VPS Hubs
// Each VPS Hub (10 Gbps) ➔ Blasts 100k DNS Amplifiers ➔ Converges 600 Gbps on Target IP!`
  },
  {
    question: "Under the Indian IT Act Section 43(f), what constitutes civil liability for launching booter attacks?",
    shortAnswer: "Denying or causing the denial of access to any person authorized to access any computer system or network carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(f) explicitly penalizes denial of access: 'If any person without permission of the owner... denies or causes the denial of access... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(f)):
// Violation: Renting a booter to take down a Kolkata hospital's appointment booking server
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Bulletproof Hosting', and why is it Essential for the Survival of DDoS-for-Hire Operations?",
    shortAnswer: "Web hosting and cloud server providers operating in non-cooperative jurisdictions that intentionally ignore DMCA takedown notices, abuse complaints, and foreign law enforcement subpoenas, allowing booter sites to stay online.",
    explanation: "Standard cloud providers (AWS, Azure, DigitalOcean) immediately terminate accounts launching DDoS attacks or hosting booter web panels. Booter operators host their infrastructure with 'bulletproof' providers (often located in offshore or conflict jurisdictions) that accept payment in Monero and refuse to cooperate with international police agencies, providing a safe haven for cybercrime infrastructure.",
    hint: "An offshore tax haven bank that refuses to talk to tax inspectors and keeps all accounts secret.",
    level: "moderate",
    codeExample: `// Bulletproof Hosting Profile:
// - Ignores CERT abuse tickets and law enforcement takedowns
// - Permits IP spoofing and unauthenticated UDP transmission
// - Accepts non-KYC cryptocurrency (Monero / Bitcoin via mixers)`
  },
  {
  question: "What Layer 7 Cloud WAF Evasion Techniques May Premium Booter Services Advertise?",
  shortAnswer: "Premium services may claim to evade cloud WAF protections by making automated traffic resemble legitimate browser sessions. From a defensive perspective, these claims can be addressed through behavioral analysis, rate limiting, origin protection, and session monitoring.",
  explanation: "Premium DDoS services may advertise techniques intended to make automated traffic resemble legitimate browser activity and evade cloud WAF protections. Defenders can counter these techniques using behavioral bot detection, request-pattern analysis, rate limiting, origin protection, and session anomaly detection. Specific bypass implementations, browser automation, credential or cookie harvesting, and traffic-distribution procedures are omitted.",
  hint: "Think of an attacker trying to make automated traffic look like legitimate visitors while defenders analyze behavior rather than relying only on simple request signatures.",
  level: "expert",
  codeExample: `// Defensive Bot-Management Concept
// Analyze session timing, browser characteristics,
// request patterns, and traffic anomalies.
// Specific WAF-bypass and cookie-harvesting procedures are omitted.`
},
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for using DDoS-for-hire platforms against corporate websites?",
    shortAnswer: "Dishonestly or fraudulently disrupting or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer disruption.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Purchasing booter subscriptions to crash rival coaching center web portals in Barrackpore
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What are 'DDoS Amplification Honeypots' (Sinkholing Booter Queries)?",
    shortAnswer: "Deceptive fake DNS/NTP/Memcached servers deployed by security researchers and law enforcement that log incoming spoofed amplification requests, recording the attacker's target IP, attack time, and packet rate for criminal prosecution.",
    explanation: "Organizations like the Shadowserver Foundation deploy thousands of amplification honeypots worldwide. When a booter server sends a 45-byte DNS ANY query with `Source IP: 103.25.10.50` (victim), the honeypot does NOT reflect the packet. Instead, it logs the query, identifies the booter IP address, and immediately alerts the victim and national CERT authorities about the active attack.",
    hint: "A fake microphone installed in a criminal hideout that records who is ordering illegal attacks.",
    level: "expert",
    codeExample: `// Amplification Honeypot Telemetry Log:
{
    "timestamp": "[LAB TIMESTAMP]",
    "source_identifier": "[ANONYMIZED SOURCE]",
    "target_identifier": "[ANONYMIZED TARGET]",
    "query_type": "SIMULATED_DNS_QUERY",
    "action": "DROPPED_AND_LOGGED"
}`
  },
  {
    question: "Synthesize an enterprise-scale Defensive Strategy to Neutralize Commercial Booter / Stresser Assaults.",
    shortAnswer: "A defense-in-depth framework combining Always-On Multi-Terabit Anycast Cloud Scrubbing, Behavioral Web Application Firewalls with Bot Management, Upstream ISP BGP Flowspec Filtering, Origin IP Cloaking, and Law Enforcement Coordination.",
    explanation: "Because commercial booters offer multi-vector attacks (volumetric reflection + Layer 7 bypass): 1. Volumetric Layer: 10+ Tbps Anycast Cloud Scrubbing absorbs raw UDP/TCP amplification floods. 2. Origin Layer: Cloak origin server IP behind Cloudflare/Akamai, dropping direct-to-IP booter attacks. 3. Application Layer: Behavioral Bot Management and rate limiting to neutralize headless browser CF-bypass tools. 4. Threat Intel Layer: Ingest real-time booter C2 and VPS IP blacklists from CERT-In and Shadowserver.",
    hint: "Combine cloud Anycast scrubbing, origin IP cloaking, behavioral bot WAFs, and CERT threat intel feeds.",
    level: "expert",
    codeExample: `// Master Booter Defense Blueprint:
// 1. Cloud Tier     : 10 Tbps BGP Anycast Scrubbing (Absorbs booter Layer 4 reflection)
// 2. Origin Tier    : Origin IP Cloaked (Firewall drops all traffic not originating from CDN VIPs)
// 3. WAF Tier       : Behavioral Bot Management (Detects headless Puppeteer CF-bypass scripts)
// 4. ISP Tier       : BGP Flowspec (RFC 5575) dropping booter VPS source prefixes`
  },
  {
    question: "What is 'Origin IP Leakage' (Direct-to-IP Flooding), and why do Booter Services Scrape Historic DNS / MX Records?",
    shortAnswer: "Finding the real origin IP address behind a CDN by inspecting historic DNS records, email MX records, or SSL certificates; once discovered, the booter floods the origin IP directly, bypassing the cloud CDN completely.",
    explanation: "If an enterprise in Kolkata puts `fintech.in` behind Cloudflare, attackers cannot hit the origin directly through the domain. However, booter tools use tools like SecurityTrails and Shodan to find the old IP or inspect outgoing mail server headers (`Received: from 103.25.10.50`). Once found, the booter targets `103.25.10.50` directly on port 443, overwhelming the origin server's 1 Gbps link without touching Cloudflare.",
    hint: "Finding someone's unlisted home address from an old phone book to bypass the security guard at their office building.",
    level: "moderate",
    codeExample: `// Origin IP Leakage Mitigation — Conceptual
// Allow application traffic only from the approved CDN/security layer.
// Deny direct Internet traffic to the protected origin.
// Exact firewall rules and provider-specific IP ranges are omitted.`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Booter DDoS Floods?",
    shortAnswer: "Intentionally causing damage or service disruption to computer systems that diminishes their value or utility, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an individual rents a booter service to take down an online examination or corporate booking portal in West Bengal, the act diminishes electronic property utility, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Renting a stresser service to crash university examination portals (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Stresser Database Seizure Analysis' in Forensic Law Enforcement?",
    shortAnswer: "When law enforcement seizes a booter server, forensics extracts the SQL user database containing user email addresses, IP login history, Bitcoin payment transactions, and exact target attack logs, used to prosecute registered users.",
    explanation: "Many script kiddies assume booter services protect their privacy. When police seize booter servers, they find unencrypted MySQL databases: `users` (usernames, hashed passwords, registration IPs, emails), `payments` (crypto TXIDs, PayPal accounts), and `attack_logs` (User ID 452 launched 300s attack against IP `103.25.10.50`). This provides irrefutable digital evidence for arrest warrants.",
    hint: "A raided underground gambling den where police find the ledger with every player's name and exact bets.",
    level: "expert",
    codeExample: `// Safe Forensic Review
// Correlate anonymized account identifiers,
// timestamps, alert metadata, and preserved evidence.
// Direct extraction of user records is omitted.`
  },
  {
    question: "What is 'TCP SYN-ACK Reflection' in Commercial Booter Vector Portfolios?",
    shortAnswer: "The booter sends SYN packets to thousands of legitimate web servers with the victim's spoofed IP; the web servers flood the victim with unrequested SYN-ACK packets, evading simple SYN flood filters.",
    explanation: "Instead of sending SYN packets directly to the victim, the booter sends 100,000 SYN packets to legitimate web servers (Google, Amazon, Microsoft) with `Source IP: Victim IP`. The servers believe the victim wants to open a connection and reply with SYN-ACK packets. The victim receives a flood of SYN-ACK packets from trusted IP addresses, making IP-based blocking difficult.",
    hint: "Sending 10,000 pizza orders to 1,000 pizzerias with someone else's address so all 1,000 delivery drivers arrive at their door.",
    level: "moderate",
    codeExample: `// SYN-ACK Reflection Flow:
// Booter Hub ➔ Sends SYN (Src: Victim, Dst: Legitimate Web Servers)
// Web Servers ➔ Fire SYN-ACK Packets directly at Victim IP!`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for using Booter Services targeting 'Protected Systems' (Critical National Infrastructure)?",
    shortAnswer: "Securing unauthorized access or attempting to deny access to designated Protected Systems carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching a booter attack that denies access to a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for DoS attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Using a booter service to flood SCADA power transmission telemetry routers
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'Cryptocurrency Payment Tracking & Chainalysis' in Booter Investigation?",
    shortAnswer: "Using blockchain forensic analysis tools to trace Bitcoin and Monero transactions from booter user wallets to exchange deposit addresses (KYC), identifying the real-world identity of booter operators and buyers.",
    explanation: "While attackers believe cryptocurrency is anonymous, Bitcoin is a public ledger. Law enforcement uses blockchain analytics (Chainalysis, Elliptic) to trace transaction graphs from booter payment addresses. When the operator or user transfers funds to a centralized exchange (WazirX, CoinDCX, Binance) to convert crypto to INR, the exchange's KYC records reveal their full legal name, bank account, and phone number.",
    hint: "Following the serial numbers on marked banknotes to the exact bank teller window where the criminal cashed them.",
    level: "expert",
    codeExample: `// Blockchain Forensic Transaction Hop:
// Booter User Wallet ➔ Booter Payment Gateway ➔ CoinMixer ➔ Binance KYC Account (Real Identity Exposed!)`
  },
  {
    question: "How do 'Anycast Cloud Scrubbers' Dilute Multi-Vector Booter Floods across Global Points of Presence?",
    shortAnswer: "By announcing the customer's BGP prefix from 300+ global data centers; attack traffic generated by booter servers worldwide is routed to the nearest regional scrubbing center, reducing an 800 Gbps flood to manageable 2.5 Gbps increments per data center.",
    explanation: "When a booter launches an 800 Gbps multi-vector flood (UDP reflection + SYN floods + HTTP floods), the attack traffic originates from servers in North America, Europe, and Asia. In an Anycast architecture, each regional booter node is absorbed by the nearest local data center (e.g. Frankfurt, Ashburn, Singapore). The flood is fragmented into small fractions, where hardware scrubbing engines filter attack packets in silicon without latency to Indian users.",
    hint: "Dividing a massive flash flood into 300 regional retention basins around the world so no single dam breaks.",
    level: "expert",
    codeExample: `// Global Anycast Ingress Dilution Math:
// Total Booter Flood Volume = 800 Gbps
// Anycast PoP Count         = 300 Scrubbing Centers
// Average Traffic per PoP   = 800 / 300 = 2.66 Gbps (Easily filtered in hardware ASIC/FPGA!)`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Booter DDoS Extortion?",
    shortAnswer: "Threatening to launch or maintain a booter DDoS flood unless company leadership pays an extortion ransom, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent extortion. Cybercriminals who flood a company's web portal with 500 Gbps of booter traffic and demand payment in cryptocurrency to halt the attack are prosecuted under Section 420 alongside IT Act Section 66.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Extortion for DoS ransom demands.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Demanding ₹50 Lakhs in cryptocurrency under threat of continuing a 500 Gbps booter DDoS flood
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
  question: "What was the Mirai Botnet Source Code Leak (2016), and what impact did it have on the proliferation of IoT botnets?",
  shortAnswer: "The public release of Mirai's source code lowered the barrier for other threat actors to study and reproduce IoT botnet techniques, contributing to the growth of subsequent botnet variants and DDoS-for-hire activity.",
  explanation: "After the Mirai source code became publicly available in 2016, other threat actors could study its architecture and adapt its concepts for their own campaigns. This contributed to the proliferation of IoT botnets and commercialized DDoS activity. The original credential lists, internet-wide scanning procedures, compilation instructions, and botnet deployment steps are omitted.",
  hint: "Think of a previously closed technical design becoming publicly available and enabling many others to study and reproduce its general approach.",
  level: "moderate",
  codeExample: `// Safe Mirai Research Concept:
// Public source-code leaks can accelerate the spread of malware variants.
// Defenders should study leaked code to identify:
// - propagation characteristics
// - command-and-control indicators
// - persistence behavior
// - network telemetry
//
// Credential lists, scanning logic, and deployment procedures are omitted.`
},
  {
    question: "What is 'Automated Booter API Integration' (WHMCS / Blesta Billing Plugins)?",
    shortAnswer: "Integrating booter attack dispatchers into automated e-commerce web hosting billing platforms, allowing buyers to automatically register, pay with crypto, and instantly receive API tokens to launch DDoS attacks.",
    explanation: "To operate like legitimate SaaS businesses, booter operators installed WHMCS or Blesta billing software with custom attack dispatcher plugins. A buyer registers, pays via automated cryptocurrency processors (CoinPayments), and receives an instant API key. The API key connects to the booter backend, allowing automated attack execution without any manual operator intervention.",
    hint: "An automated vending machine that dispenses cyber weapons 24/7 whenever a cryptocurrency coin is inserted.",
    level: "expert",
    codeExample: `// Automated Service Integration — Safe Concept
// Payment event → Account verification → Service entitlement
// → Defensive simulation record.
//
// Attack-token generation and attack-dispatch logic are omitted.`
  },
  {
    question: "Synthesize the mathematical formulation of the DDoS-as-a-Service Economic Cost Asymmetry Ratio (A_economic), Attacker Capital Expenditure (C_attacker), Defender Mitigation & Downtime Cost (C_defender), and Expected Attacker ROI (ROI_attacker).",
    shortAnswer: "Attacker cost is C_attacker = P_subscription + C_crypto; defender cost is C_defender = C_scrubbing + (Downtime_Hours * Revenue_PerHour) + C_incident; economic asymmetry ratio is A_economic = C_defender / C_attacker >= 2,500x; attacker ROI for extortion is ROI_attacker = (R_ransom - C_attacker) / C_attacker * 100%.",
    explanation: "Let C_attacker represent the attacker's costs (e.g. ₹2,000 for a booter subscription). Let C_defender represent the victim's total costs: cloud scrubbing contract (₹10,00,000/year), downtime losses (4 hours at ₹8,00,000/hour = ₹32,00,000), and forensic response (₹8,00,000), totaling C_defender = ₹50,00,000. The Economic Cost Asymmetry Ratio is: A_economic = 50,00,000 / 2,000 = 2,500x. For Ransom DoS demanding a ₹25,00,000 ransom, expected attacker ROI is: ROI = ((25,00,000 - 2,000) / 2,000) * 100% = 124,900%. Deploying always-on Anycast cloud scrubbing eliminates downtime losses, driving attacker ROI to -100%.",
    hint: "Mathematical proof formula showing that a ₹2,000 booter attack inflicts over ₹50,00,000 in defender costs, creating a 2,500x economic imbalance that requires always-on Anycast scrubbing to neutralize.",
    level: "expert",
    codeExample: `// Booter Economic Asymmetry Proof:
// Attacker Cost (C_attacker) = ₹2,000 / month (Booter Subscription)
// Defender Downtime Losses   = 4 Hours * ₹8,00,000/hr = ₹32,00,000
// Cloud Mitigation Retainer  = ₹10,00,000
// Forensic Incident Response = ₹8,00,000
// Total Defender Cost        = ₹50,00,000
// Economic Asymmetry Ratio   = 50,00,000 / 2,000 = 2,500x Cost Imbalance!`
  }
];

export default questions;
