const questions = [
  {
    question: "What was the 2016 Dyn DNS DDoS Attack, and what made it a Historic Milestone in Internet Security?",
    shortAnswer: "On October 21, 2016, the Mirai botnet (compromising ~100,000 IoT devices) launched an estimated 1.2 Tbps multi-vector flood against Dyn DNS, taking down major platforms (Twitter, Netflix, Spotify, GitHub, Amazon) across North America and Europe due to DNS Single Point of Failure.",
    explanation: "The Dyn DNS attack demonstrated that attacking a centralized critical dependency (an authoritative DNS provider) can paralyze hundreds of independent internet services simultaneously. Even though Netflix and Amazon data centers were 100% operational, users could not resolve domain names. It forced the global industry to adopt dual-provider redundant Anycast DNS architectures.",
    hint: "The massive Mirai botnet attack on a DNS provider that made Twitter, Netflix, and GitHub unreachable in 2016.",
    level: "basic",
    codeExample: `// Dyn DNS Attack Profile (October 21, 2016):
// Peak Volume     : ~1.2 Tbps Volumetric & DNS Query Flood
// Botnet Source   : Mirai Botnet (~100,000 Compromised IoT Cameras/DVRs)
// Targeted Service: Dyn Managed DNS Infrastructure
// Global Impact   : Twitter, Netflix, Spotify, GitHub, Airbnb, Reddit went dark across US & Europe!`
  },
  {
    question: "What was the 2018 GitHub Memcached DDoS Attack, and how did Akamai Prolexic mitigate it in just 8 Minutes?",
    shortAnswer: "On February 28, 2018, GitHub was hit with a record-breaking 1.35 Tbps (126.9 Mpps) Memcached UDP reflection flood; automated Akamai Prolexic BGP Anycast cloud scrubbing ingested the flood and restored full service within 8 minutes with zero data corruption.",
    explanation: "At 17:21 UTC, attackers exploited open Memcached servers on UDP port 11211 (51,200x amplification factor), generating a historic 1.35 Tbps flood targeting GitHub. At 17:26 UTC, GitHub's automated systems diverted traffic via BGP Anycast to Akamai Prolexic scrubbing centers. Akamai's multi-terabit network absorbed the flood in hardware silicon, and GitHub was fully recovered by 17:30 UTC.",
    hint: "The 1.35 Tbps Memcached reflection attack against GitHub that was completely mitigated in 8 minutes in 2018.",
    level: "basic",
    codeExample: `// GitHub Memcached DDoS Mitigation Timeline (Feb 28, 2018):
// 17:21 UTC ➔ Attack Onset: Ingress traffic explodes from 10 Gbps to 1.35 Tbps (126.9 Mpps)!
// 17:26 UTC ➔ Automated BGP Anycast Diversion to Akamai Prolexic Scrubbing Centers
// 17:30 UTC ➔ 1.35 Tbps Memcached Flood 100% Absorbed; GitHub 100% Operational (8-Minute SLA)!`
  },
  {
    question: "What was the Primary Architecture Flaw exposed by the 2016 Dyn DNS Attack, and how was it permanently solved?",
    shortAnswer: "DNS Single Point of Failure (SPOF) where enterprises used only 1 authoritative DNS provider; solved by deploying Dual-Provider Redundant Anycast DNS (e.g. Route 53 + Cloudflare) where recursive resolvers seamlessly fail over if one provider is attacked.",
    explanation: "Prior to 2016, companies configured their domain NS records pointing to a single provider: `ns1.p01.dynect.net`. When Dyn collapsed under Mirai floods, all resolution failed. The modern standard is Dual-Provider Anycast DNS: NS records are split between two independent providers (`ns1.route53.com` and `ns1.cloudflare.com`). If Provider 1 goes down, recursive resolvers query Provider 2 with zero downtime.",
    hint: "Using two separate independent phone book companies so if one goes out of business, people can still look up your number in the other.",
    level: "moderate",
    codeExample: `// Dual-Provider Redundant Authoritative DNS Configuration:
// Domain: kolkata-fintech.in
// NS 1: ns-1.awsdns-01.org (AWS Route 53 Anycast Mesh)
// NS 2: ns-1.cloudflare.com (Cloudflare Global Anycast Mesh)
// Result: 100% Immunity against single-provider DNS DDoS outages!`
  },
  {
    question: "How did the 2018 Memcached Amplification Attack exploit UDP Port 11211, and what Immediate Global Remediation was deployed?",
    shortAnswer: "Memcached servers exposed on UDP port 11211 allowed unauthenticated clients to retrieve megabytes of cached data using a 15-byte `get <key>` request (51,200x multiplier); globally remediated by disabling UDP by default (`-U 0`) in Memcached 1.5.6 and binding strictly to localhost.",
    explanation: "Memcached was never designed for public WAN exposure. Attackers loaded 1MB values and queried them with spoofed victim IPs. Developers responded by releasing Memcached 1.5.6, which completely disabled the UDP listener by default (`-U 0`). System administrators worldwide updated configurations to bind strictly to `127.0.0.1`, reducing vulnerable open Memcached reflectors from 100,000 to near-zero.",
    hint: "Disabling the public speaker feature on an intercom system so strangers cannot shout messages to the whole neighborhood.",
    level: "moderate",
    codeExample: `# Memcached 1.5.6+ Secure Configuration (/etc/memcached.conf):
-l 127.0.0.1 # Bind ONLY to local loopback interface!
-U 0         # Completely DISABLE UDP listener!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for launching historic multi-terabit DDoS attacks like Mirai or Memcached against Critical Public Infrastructure?",
    shortAnswer: "Launching multi-terabit DDoS attacks that paralyze critical national infrastructure to threaten national security is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary uses Mirai or Memcached amplification floods to take down national power grid telemetry in Barrackpore or financial settlement switches in Salt Lake, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Paralyzing state electrical grid telemetry routers with 1.35 Tbps Memcached floods
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What was the 2020 AWS Shield 2.3 Tbps DDoS Attack Case Study?",
    shortAnswer: "In February 2020, AWS Shield detected and mitigated a 2.3 Tbps CLDAP (Connectionless LDAP) reflection attack targeting an AWS customer, which stood as the largest volumetric DDoS attack in history at that time, absorbed entirely by AWS's global edge infrastructure.",
    explanation: "Threat actors abused misconfigured Active Directory domain controllers running CLDAP on UDP port 389 (56x-70x amplification) to generate a massive 2.3 Tbps flood. AWS Shield's automated Anycast scrubbing network detected the multi-terabit surge, fragmented the traffic across dozens of global edge locations, and filtered malicious CLDAP search responses without customer downtime.",
    hint: "The 2.3 Tbps CLDAP reflection attack mitigated by Amazon Web Services in 2020.",
    level: "expert",
    codeExample: `// AWS Shield 2.3 Tbps Attack Profile (Feb 2020):
// Attack Type : CLDAP Reflection Amplification (UDP Port 389)
// Peak Volume : 2.3 Tbps (Largest Recorded Attack in 2020)
// Mitigation  : AWS Shield Automated Anycast Ingestion & Hardware Packet Filtering`
  },
  {
    question: "What was the 2023 HTTP/2 Rapid Reset (CVE-2023-44487) DDoS Attack Case Study?",
    shortAnswer: "In August-October 2023, threat actors exploited HTTP/2 stream multiplexing by sending hundreds of thousands of concurrent `HEADERS` frames followed immediately by `RST_STREAM` frames, generating historic Layer 7 floods reaching 398 Million Requests Per Second (RPS).",
    explanation: "CVE-2023-44487 allowed tiny botnets (just 20,000 nodes) to generate astronomical 398 Million RPS floods against Google, Cloudflare, and AWS. By abusing HTTP/2 stream cancellation, the attacker forced servers to allocate request processing resources without completing the stream. Web proxy vendors updated parsers to cap concurrent streams (`max_concurrent_streams = 128`) and rate-limit RST frame frequencies.",
    hint: "The historic 398 Million RPS HTTP/2 Rapid Reset attack that shattered all Layer 7 records in late 2023.",
    level: "expert",
    codeExample: `// HTTP/2 Rapid Reset CVE-2023-44487 Peak Metrics:
// Google Cloud Peak   : 398 Million RPS (Historic Layer 7 Record!)
// Cloudflare Peak     : 201 Million RPS
// AWS Peak            : 155 Million RPS
// Root Vulnerability  : HTTP/2 Stream Multiplexing & Instant RST_STREAM Abuse`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise lessons from the Dyn DNS and GitHub DDoS Case Studies?",
    shortAnswer: "Enterprises must implement redundant multi-provider availability safeguards; persistent failure to learn from historical case studies leading to personal data access outages triggers statutory fines up to ₹250 Crores.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards. If an e-commerce or healthcare portal in West Bengal suffers prolonged service collapse because it relied on a single DNS provider or failed to deploy cloud scrubbing, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Maintaining continuous service availability is a mandatory technical safeguard under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for single-point-of-failure availability negligence`
  },
  {
    question: "What was the 2022 Google Cloud 46 Million RPS HTTPS DDoS Attack Case Study?",
    shortAnswer: "In June 2022, Google Cloud Armor mitigated a 46 Million RPS HTTPS DDoS attack generated by a 5,000-node botnet across 132 countries, utilizing encrypted TLS connections to target an e-commerce customer.",
    explanation: "The attack peaked at 46 Million RPS—equivalent to receiving all daily Wikipedia requests in just 10 seconds. The botnet used HTTPS (requiring expensive TLS handshakes), residential proxies, and un-cached search queries. Google Cloud Armor's Adaptive Protection used machine learning to detect the signature of the attack traffic and auto-deployed rate limiting rules at the cloud edge.",
    hint: "The 46 Million RPS HTTPS Layer 7 flood mitigated by Google Cloud Armor in 2022.",
    level: "expert",
    codeExample: `// Google Cloud Armor 46M RPS Attack Metrics (June 2022):
// Peak Request Rate : 46,000,000 RPS (HTTPS Encrypted)
// Botnet Composition: 5,296 IP Addresses across 132 Countries
// Mitigation Engine : Cloud Armor ML Adaptive Protection Auto-Generated Rule`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for organizations experiencing multi-gigabit DDoS attacks like GitHub or Dyn?",
    shortAnswer: "All organizations operating digital services, data centers, or cloud applications must report DDoS outages to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including major DDoS attacks and mitigation activations) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of DDoS service outages within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "Why was the 2018 GitHub DDoS Attack considered an 'Engineering Masterclass' in Incident Response?",
    shortAnswer: "Because GitHub's automated monitoring, automated BGP Anycast diversion, and seamless integration with Akamai Prolexic allowed the platform to absorb 1.35 Tbps of attack traffic and restore 100% operational status in under 8 minutes with zero data corruption.",
    explanation: "Many organizations take hours to detect and respond to DDoS attacks. GitHub had pre-configured automated BGP Anycast diversion scripts. Within 5 minutes of the attack onset, GitHub shifted traffic to Akamai. Akamai's multi-terabit infrastructure absorbed the 1.35 Tbps flood in hardware without service interruption, and GitHub was fully restored 8 minutes after attack onset.",
    hint: "Flawless automated BGP Anycast diversion and cloud scrubbing integration achieving an 8-minute recovery SLA.",
    level: "moderate",
    codeExample: `// GitHub 8-Minute Incident Response Benchmark:
// 17:21 UTC ➔ 1.35 Tbps Spike Detected by NetFlow Telemetry
// 17:26 UTC ➔ Automated BGP Anycast Shift to Akamai Scrubbing
// 17:30 UTC ➔ 100% Service Restored (Total Outage Duration: 8 Minutes!)`
  },
  {
    question: "Under the Indian IT Act Section 43(f), what constitutes civil liability for launching multi-terabit DDoS floods against corporate cloud services?",
    shortAnswer: "Denying or causing the denial of access to any person authorized to access any computer system or network carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(f) explicitly penalizes denial of access: 'If any person without permission of the owner... denies or causes the denial of access... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(f)):
// Violation: Launching an 800 Gbps DDoS flood that takes down a Kolkata hospital's appointment booking server
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What was the 'Krebs on Security' 620 Gbps Mirai Attack (September 2016)?",
    shortAnswer: "The first major multi-hundred gigabit Mirai botnet attack, which hit cybersecurity investigative journalist Brian Krebs with 620 Gbps of volumetric GRE, SYN, and HTTP floods, forcing Akamai to temporarily drop the site due to extreme mitigation costs.",
    explanation: "In September 2016, threat actors targeted `krebsonsecurity.com` after Krebs exposed commercial booter networks (vDos). The Mirai botnet generated 620 Gbps of traffic. Because defending the site cost hundreds of thousands of dollars in unmetered cloud bandwidth, Akamai temporarily de-peered the site before Google Project Shield stepped in to provide free non-profit DDoS protection.",
    hint: "The massive 620 Gbps Mirai attack on an investigative security journalist in 2016.",
    level: "moderate",
    codeExample: `// Krebs on Security 620 Gbps Mirai Attack Profile:
// Target      : krebsonsecurity.com (Investigative Journalism)
// Peak Volume : 620 Gbps (GRE Packet Floods + TCP SYN Floods + HTTP GET)
// Outcome     : Google Project Shield stepped in to provide free Anycast DDoS defense!`
  },
  {
    question: "What is 'Google Project Shield' and 'Cloudflare Project Galileo' for Non-Profit & Media Protection?",
    shortAnswer: "Free enterprise-grade DDoS mitigation programs operated by Google and Cloudflare that provide Always-On Anycast scrubbing and WAF protection to human rights organizations, journalists, and public interest websites to defend freedom of expression.",
    explanation: "Following high-profile attacks on investigative journalists (Krebs on Security), major cloud providers created free protection initiatives: Google Project Shield and Cloudflare Project Galileo. These programs shield vulnerable non-profits, independent media, and election monitoring websites from state-sponsored and commercial booter DDoS attacks at zero cost.",
    hint: "Free cloud DDoS protection programs for journalists and non-profits operated by Google and Cloudflare.",
    level: "basic",
    codeExample: `// Public Interest Protection Initiative:
// Program : Cloudflare Project Galileo / Google Project Shield
// Benefit : 100% Free Enterprise Anycast DDoS Scrubbing & WAF for Journalists & Non-Profits`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for developing or distributing botnets like Mirai?",
    shortAnswer: "Dishonestly or fraudulently disrupting or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer disruption.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Authoring and executing Mirai IoT botnet scanning and DDoS scripts in Kolkata
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What was the 'Spamhaus vs Cyberbunker' 300 Gbps Attack (2013), and how did it demonstrate the power of Open DNS Resolvers?",
    shortAnswer: "In March 2013, Cyberbunker launched a 300 Gbps DNS reflection attack against anti-spam organization Spamhaus using open DNS resolvers, making it the largest recorded DDoS attack of its era and slowing global internet traffic across European Tier-1 IXPs.",
    explanation: "When Spamhaus blacklisted Cyberbunker, adversaries flooded Spamhaus with 300 Gbps of DNS reflection traffic using open recursive DNS resolvers (70x amplification). The volume was so massive that it congested the London Internet Exchange (LINX) and Amsterdam Internet Exchange (AMS-IX), proving that open DNS resolvers could be weaponized to degrade regional internet backbones.",
    hint: "The 300 Gbps DNS reflection attack in 2013 that congested European Internet Exchange Points.",
    level: "moderate",
    codeExample: `// Spamhaus vs Cyberbunker 300 Gbps DNS Attack Profile (2013):
// Vector      : DNS Amplification using Open Recursive Resolvers (Port 53)
// Peak Volume : 300 Gbps (Historic Record for 2013)
// Infrastructure Impact: Congested London (LINX) & Amsterdam (AMS-IX) Internet Exchanges!`
  },
  {
    question: "Synthesize an enterprise-scale Disaster Recovery & DDoS Playbook based on Historical Case Studies.",
    shortAnswer: "A 5-phase operational framework combining Pre-Attack Dual-Provider Redundancy (Route 53 + Cloudflare), Automated NetFlow Anomaly Detection (< 60s), Automated BGP Anycast Shift (< 5m), Hardware Silicon Scrubbing, and Statutory CERT-In 6-Hour Reporting.",
    explanation: "Synthesizing lessons from Dyn, GitHub, AWS, and Google: 1. Architecture Phase: Dual-Provider Anycast DNS (eliminating Dyn SPOF) and origin IP cloaking. 2. Detection Phase: NetFlow/IPFIX telemetry triggering alerts when traffic exceeds 50 Gbps within 60 seconds. 3. Diversion Phase: Automated BGP Anycast diversion script (replicating GitHub's 5-minute shift). 4. Scrubbing Phase: 10+ Tbps Anycast cloud scrubbers with FPGA hardware filtering and JA4 bot management. 5. Post-Incident Phase: Incident forensics and mandatory 6-hour CERT-In reporting.",
    hint: "Combine dual-provider DNS, automated NetFlow detection, 5-minute BGP Anycast shift, and 6-hour CERT-In reporting.",
    level: "expert",
    codeExample: `// Master Historical DDoS Mitigation Playbook:
// Phase 1: Dual Anycast DNS (Route 53 + Cloudflare) ➔ Prevents Dyn 2016 Single Point of Failure
// Phase 2: Automated NetFlow Detection ➔ Detects 1 Tbps surge in < 60 seconds
// Phase 3: Automated BGP Anycast Diversion ➔ Replicates GitHub 2018 5-minute shift to cloud scrubber
// Phase 4: Hardware Silicon FPGA Filtering ➔ Absorbs 100% of Memcached/CLDAP reflection floods
// Phase 5: Statutory Compliance ➔ Submits digital forensic report to CERT-In within 6 HOURS`
  },
  {
    question: "What is 'Automated BGP Anycast Diversion Scripting' (Replicating GitHub's 5-Minute Shift)?",
    shortAnswer: "A Python/Ansible automation script triggered by NetFlow telemetry that automatically updates BGP route maps and sends BGP Community tags to Tier-1 ISPs to divert traffic to cloud scrubbers in under 5 minutes without manual human intervention.",
    explanation: "When NetFlow detects an attack exceeding link capacity ($> 50$ Gbps), an automated Python script executes: it connects to the edge router, changes the BGP advertisement to route through Akamai/Cloudflare, and verifies BGP propagation globally. This automation allowed GitHub to recover from a 1.35 Tbps flood in 8 minutes while manual teams would take hours.",
    hint: "An automated emergency lever that instantly switches the train tracks to a safe bypass route whenever a crash is detected.",
    level: "expert",
    codeExample: `// Python Automated BGP Diversion Script:
import netmiko
def divert_to_scrubber():
    connection = netmiko.ConnectHandler(device_type="cisco_ios", ip="103.25.10.1")
    connection.send_config_set([
        "router bgp 65001",
        "neighbor 103.25.10.2 route-map DIVERT-TO-SCRUBBER out" # Shifts traffic to Cloud Scrubber!
    ])
    print("[+] AUTOMATED BGP DIVERSION COMPLETE (Recovery SLA < 5 Minutes)!")`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' in Historical DDoS Case Studies?",
    shortAnswer: "Intentionally causing damage or service disruption to computer systems that diminishes their value or utility, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When threat actors launch multi-hundred gigabit floods that knock corporate services offline in West Bengal, the act diminishes electronic property utility, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Intentionally launching Memcached reflection floods to crash corporate portals (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What was the 'Estonia National Cyber Warfare Attack' (2007) and its Historical Significance?",
    shortAnswer: "The first recorded national-scale DDoS attack in history, where Russian hacktivists flooded Estonia's government, banking, and media websites with ping and HTTP floods for 3 weeks, leading to the creation of NATO's Cooperative Cyber Defence Centre of Excellence (CCDCOE).",
    explanation: "In April-May 2007, following political disputes regarding the Bronze Soldier monument in Tallinn, massive botnets flooded Estonia's parliament, banks, and newspapers. The attack paralyzed online banking across the country for weeks. It served as a global wake-up call, demonstrating that DDoS could be used as an asymmetric weapon of national geopolitical warfare.",
    hint: "The 2007 national-scale DDoS attack on Estonia that led to the creation of NATO's cyber defense center.",
    level: "moderate",
    codeExample: `// Estonia 2007 National Cyber Warfare Milestone:
// Target      : Republic of Estonia (Government, Parliamentary, Banking & Media Portals)
// Attack Type : Distributed Ping Floods, Botnet HTTP Floods & Spam Swarms (3 Weeks)
// Historical Consequence: Established NATO Cooperative Cyber Defence Centre of Excellence (CCDCOE)`
  },
  {
    question: "What is 'Google Project Shield' Technical Architecture for Zero-Day Censorship Defense?",
    shortAnswer: "A reverse proxy Anycast caching mesh that strips cookies, terminates TLS at Google's edge, caches static and dynamic news articles, and absorbs multi-gigabit floods, keeping independent journalism accessible worldwide.",
    explanation: "Project Shield protects human rights and news organizations. It uses Google's global multi-terabit edge infrastructure. When an authoritarian regime or criminal syndicate launches a DDoS attack to censor an investigative news report, Google's edge proxies absorb the flood, serving cached news content directly from Google's global edge without burdening the small origin server.",
    hint: "Using Google's massive global cloud infrastructure to defend free journalism from censorship attacks.",
    level: "moderate",
    codeExample: `// Project Shield Caching & Reverse Proxy Header:
// Server: Google Project Shield Reverse Proxy Mesh
// Ingress: 150 Gbps Censorship Flood ➔ 100% Absorbed by Google Global Edge!
// News Content: Served from Edge Cache with 0.0ms Origin Load!`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for DDoS Attacks targeting 'Protected Systems' based on Lessons from National Infrastructure Case Studies?",
    shortAnswer: "Securing unauthorized access or attempting to deny access to designated Protected Systems carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an attack that attempts to deny access to a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for DoS attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Launching multi-terabit floods targeting SCADA power transmission border routers
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is the 'Shadowserver Foundation' and its Global Role in Remediating Open DDoS Amplifiers?",
    shortAnswer: "A non-profit cybersecurity organization that continuously scans the entire public internet for vulnerable open DNS, NTP, Memcached, and CLDAP reflectors, sending automated daily remediation reports to national CERTs and network operators worldwide.",
    explanation: "The Shadowserver Foundation performs daily internet-wide scans. When it discovers an open Memcached server (`UDP 11211`) or open DNS resolver in Kolkata, it logs the IP and automatically notifies CERT-In and the local ISP. The ISP contacts the server owner to disable UDP or close open recursion, neutralizing the amplifier before cybercriminals can weaponize it.",
    hint: "A global non-profit organization that finds open amplifiers on the internet and helps ISPs close them before attackers use them.",
    level: "expert",
    codeExample: `// Shadowserver Remediation Telemetry Report:
// Organization: CERT-In (National CSIRT of India)
// Report Type : Daily Open Memcached & Open DNS Resolver Notification
// Action      : ISP reconfigures vulnerable nodes ➔ Eliminates reflection threat at source!`
  },
  {
    question: "What is 'HTTP/2 Rapid Reset Mitigation' (CVE-2023-44487) Implementation in Nginx and Envoy?",
    shortAnswer: "Limiting the rate of stream cancellations (`RST_STREAM` frames) per connection and strictly enforcing `http2_max_concurrent_streams = 128`, closing connections that exceed a threshold of rapid resets.",
    explanation: "In response to the 398 Million RPS Rapid Reset attack in late 2023, Nginx released patches introducing RST stream rate limiting: if a client creates a stream and cancels it immediately more than 100 times in 1 second, Nginx terminates the TCP connection with a `GOAWAY` frame, preventing the web server from being overwhelmed by Rapid Reset loops.",
    hint: "Kicking a disruptive customer out of the store if they repeatedly press the order button and cancel button 100 times in a row.",
    level: "expert",
    codeExample: `# Nginx Rapid Reset Hardening (nginx.conf):
http2_max_concurrent_streams 128; # Caps concurrent streams
http2_max_concurrent_pushes 0;
# Patched Nginx automatically terminates connections generating excessive RST_STREAM frames!`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via DDoS Case Study Extortion?",
    shortAnswer: "Threatening to launch or maintain a multi-terabit DDoS flood unless company leadership pays an extortion ransom, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent extortion. Cybercriminals who flood a company's web portal and demand payment in cryptocurrency to halt the attack are prosecuted under Section 420 alongside IT Act Section 66.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Extortion for DoS ransom demands.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Demanding ₹50 Lakhs in cryptocurrency under threat of continuing a 1.2 Tbps DDoS flood
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What was the 'Mirai Botnet Architecture' (2016), and why was its C Source Code so Destructive?",
    shortAnswer: "Mirai was written in C with an asynchronous telnet scanner scanning random IPv4 addresses using a hardcoded dictionary of 62 default IoT credentials (`root:admin`, `admin:admin`), turning 400,000 smart cameras and home routers into high-speed DDoS soldiers.",
    explanation: "Mirai's author ('Anna-Senpai') designed it with a compact C footprint: 1. Telnet Scanner: Rapidly probed port 23/2323 using non-blocking sockets. 2. Bot Killer: Killed competing malware and closed port 23 to secure the device for itself. 3. Attack Modules: Built-in volumetric UDP, TCP SYN, ACK, and DNS query flooding engines. When the source code was published online, it fueled hundreds of derivative botnets.",
    hint: "The notorious IoT botnet written in C that scanned the internet for default passwords and took down Dyn DNS in 2016.",
    level: "expert",
    codeExample: `// Mirai C Scanner Loop (Mirai Source):
// Mirai historically abused weak/default IoT credentials.
// Specific credential lists and scanning details are omitted.
// Probe Mechanism: Asynchronous non-blocking TCP connect on port 23/2323
// Target Spread   : Infected 400,000 IoT Devices within 72 Hours!`
  },
  {
    question: "What is 'DDoS Attack Post-Mortem Transparency' (GitHub & Cloudflare Best Practices)?",
    shortAnswer: "Publishing detailed public post-mortem engineering reports within 24-48 hours of a major DDoS attack, detailing attack vectors, peak bandwidth graphs, mitigation timelines, root causes, and architectural lessons learned.",
    explanation: "Following major incidents, industry leaders (GitHub, Cloudflare, AWS) publish detailed technical post-mortems. These reports explain the attack mechanics, share anonymized traffic graphs, document the exact mitigation timeline, and describe new safeguards deployed. This transparency builds customer trust and educates the global cybersecurity community on emerging attack vectors.",
    hint: "Publishing a detailed open technical report explaining what happened, how it was fixed, and what was learned after an attack.",
    level: "moderate",
    codeExample: `// Post-Mortem Engineering Report Structure:
// 1. Executive Summary & Timeline (Attack onset ➔ Mitigation active ➔ Recovery)
// 2. Technical Attack Vector Analysis (Packet graphs, PPS, protocol headers)
// 3. What Went Well vs What Went Wrong (Automation response vs manual delays)
// 4. Corrective Action Items (Dual-Provider DNS, increased scrubbing capacity)`
  },
  {
    question: "What is 'Adaptive ML DDoS Protection' (Google Cloud Armor / AWS Shield)?",
    shortAnswer: "A machine learning system that establishes baseline models of normal user traffic patterns (URLs, header distributions, request rates) and automatically generates and deploys granular WAF filter rules within seconds when an anomaly is detected.",
    explanation: "Traditional WAFs require human engineers to write rules during an attack. Adaptive ML Protection constantly trains baseline models. When a 46 Million RPS Layer 7 flood begins, the ML model identifies the specific signature distinguishing bot traffic from legitimate users (e.g. specific cookie combinations, header ordering) and auto-deploys a tailored WAF rule in seconds with zero human intervention.",
    hint: "An AI system that learns what normal traffic looks like and automatically writes custom security rules to block weird attack traffic in seconds.",
    level: "expert",
    codeExample: `// Adaptive ML Protection Auto-Generated Rule:
{
  "Rule_Name": "ML_Auto_Generated_L7_Mitigation",
  "Confidence_Score": 0.998,
  "Action": "Rate_Limit",
  "Signature": "Match: User-Agent == 'Chrome/130' AND Cookie_Length < 10 AND Path == '/search'"
}`
  },
  {
    question: "Synthesize the mathematical formulation of the Mitigation Recovery Time Index (RTI), Attack Onset Time (T_onset), Scrubbing Activation Time (T_active), Recovery SLA (SLA_rec), and Enterprise Availability Resilience (Resilience_pct).",
    shortAnswer: "Mitigation Recovery Time Index is RTI = (T_active - T_onset) / SLA_rec; when RTI <= 1.0 (as in GitHub's 8-minute recovery against a 15-minute SLA, RTI = 0.53), Enterprise Availability Resilience is 100.0%; automated Anycast diversion drives RTI to near-zero.",
    explanation: "Let T_onset represent the attack onset time (17:21 UTC). Let T_active represent the timestamp when cloud scrubbing fully absorbed the attack (17:29 UTC, total elapsed time = 8 minutes). If the enterprise disaster recovery SLA allows a maximum recovery window of SLA_rec = 15 minutes, the Mitigation Recovery Time Index is: RTI = 8 / 15 = 0.533 <= 1.0. Because RTI <= 1.0, Enterprise Availability Resilience is: Resilience = max(0, 100% * (1 - max(0, RTI - 1.0))) = 100.0%. Deploying automated BGP Anycast diversion scripts reduces (T_active - T_onset) to under 5 minutes, ensuring 100% operational resilience.",
    hint: "Mathematical proof formula showing that achieving a recovery time within the disaster recovery SLA (RTI <= 1.0) guarantees 100% operational resilience, as proven by GitHub's historic 8-minute mitigation in 2018.",
    level: "expert",
    codeExample: `// Mitigation Recovery Time Index (RTI) Mathematical Proof:
// Attack Onset = 17:21 UTC | Full Scrubbing Active = 17:29 UTC (Elapsed Duration = 8.0 Minutes)
// Disaster Recovery SLA Window = 15.0 Minutes
// Recovery Time Index: RTI = 8.0 / 15.0 = 0.533 (RTI <= 1.0 ➔ SLA SATISFIED!)
// Enterprise Availability Resilience: 100.0% (HISTORIC MITIGATION SUCCESS!)`
  }
];

export default questions;
