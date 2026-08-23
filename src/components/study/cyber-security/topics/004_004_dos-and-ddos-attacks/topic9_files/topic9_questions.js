const questions = [
  {
    question: "What is BGP Anycast Routing, and how does it fundamentally neutralize Multi-Terabit Volumetric DDoS Attacks?",
    shortAnswer: "BGP Anycast announces the same IP address from hundreds of geographically distributed Points of Presence (PoPs) worldwide; global internet routing naturally directs each attacker bot to its nearest local data center, diluting a 1 Tbps flood into 300 manageable 3.3 Gbps regional streams without central bottlenecks.",
    explanation: "In Unicast routing, one IP belongs to one physical server, meaning all 1 Tbps of flood traffic converges on a single internet pipe. In BGP Anycast (RFC 4786), 300 data centers announce the identical IP prefix. Attackers in Europe hit Frankfurt or London, attackers in the US hit Ashburn, and attackers in Asia hit Singapore. The 1 Tbps flood is fragmented into negligible 3.3 Gbps streams, easily scrubbed in hardware FPGA silicon at each local edge.",
    hint: "Opening 300 toll booths across the country with the exact same phone number so each driver only calls the toll booth nearest their house.",
    level: "basic",
    codeExample: `// Anycast Ingress Traffic Dilution Math:
// Total Global Attack Flood Volume : 1,200 Gbps (1.2 Tbps)
// Global Anycast Edge PoPs Count    : 300 Data Centers
// Local Load per Edge Scrubbing PoP : 1,200 / 300 = 4.0 Gbps (Easily filtered in hardware!)`
  },
  {
    question: "How does the 'Token Bucket Algorithm' enforce Rate Limiting in DDoS Mitigation?",
    shortAnswer: "Tokens are added to a bucket of capacity $b$ at a constant rate $r$; each incoming request requires 1 token. It allows temporary bursts up to bucket capacity while strictly capping sustained traffic at rate $r$, discarding surplus requests with HTTP 429.",
    explanation: "The Token Bucket algorithm accommodates legitimate human browsing behavior (e.g. loading a web page with 15 simultaneous image assets consumes 15 burst tokens instantly with `nodelay`). However, if an automated DDoS bot sends 100 requests/sec, the bucket empties after the burst, and all subsequent requests are dropped or rate-limited to $r$ req/s, protecting backend database pools.",
    hint: "An arcade ticket dispenser that gives you 1 token per second but lets you hold up to 20 tokens in your cup for rapid games.",
    level: "basic",
    codeExample: `// Nginx Token Bucket Configuration:
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

location /api/ {
    # Allows steady 10 req/s with burst tolerance of 20 requests:
    limit_req zone=api_limit burst=20 nodelay;
    proxy_pass http://backend_pool;
}`
  },
  {
    question: "What is 'Geo-Blocking' (GeoIP Filtering), and what are its Core Limitations during Global DDoS Campaigns?",
    shortAnswer: "Blocking or challenging network traffic originating from specific geographic country codes (e.g. dropping non-domestic traffic during attacks); limited by residential proxy botnets operating inside the target country, mobile VPNs, and IP geolocation database lag.",
    explanation: "If a local banking portal in Kolkata serves only Indian citizens, blocking all ingress traffic outside India (`IN`) drops 85% of international botnet reflection floods instantly. However, modern threat actors route Layer 7 attacks through compromised domestic Indian residential broadband routers (Airtel/Jio home Wi-Fi), completely bypassing geo-blocking filters.",
    hint: "Locking the border gate to keep out foreign cars, which fails when criminals hire local cars already inside the city.",
    level: "moderate",
    codeExample: `// Nginx GeoIP2 Country Blocking Configuration:
geoip2 /usr/share/GeoIP/GeoIP2-Country.mmdb {
    $geoip2_data_country_code country iso_code;
}
# Allow ONLY domestic Indian users during active DDoS emergency:
if ($geoip2_data_country_code != "IN") {
    return 403 "Service restricted to domestic regional access during security maintenance.";
}`
  },
  {
    question: "What is 'Unicast Reverse Path Forwarding' (uRPF - RFC 3704 / BCP 38), and what is the difference between Strict Mode and Loose Mode?",
    shortAnswer: "uRPF validates that incoming packets have a legitimate source IP; Strict Mode drops packets unless the source IP is reachable via the exact incoming interface in the routing table; Loose Mode drops packets only if the source IP has no route anywhere in the routing table.",
    explanation: "uRPF eliminates IP address spoofing. In Strict Mode, when a packet arrives on interface `Gig0/1` with `Source IP: 103.25.10.50`, the router checks its FIB table: if traffic to `103.25.10.50` would be routed out `Gig0/1`, it accepts the packet; if it would be routed out `Gig0/2`, it drops it as a spoofed packet. Strict Mode is ideal for ISP customer edges.",
    hint: "A guard checking if the return address on a delivery truck matches the road the truck actually just drove in from.",
    level: "expert",
    codeExample: `! Cisco IOS Strict uRPF Configuration:
interface GigabitEthernet0/0/1
 ip verify unicast source reachable-via rx    ! STRICT MODE: Drops spoofed IP packets!

! Cisco IOS Loose uRPF Configuration:
interface GigabitEthernet0/0/2
 ip verify unicast source reachable-via any   ! LOOSE MODE: Verifies route exists in FIB`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for using DDoS attacks to bypass mitigation strategies and paralyze Critical Infrastructure?",
    shortAnswer: "Launching multi-vector DDoS attacks that overwhelm perimeter mitigations and deny access to critical national infrastructure is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary launches an 800 Gbps volumetric flood that overwhelms state power grid perimeter firewalls in Barrackpore or national banking settlement switches in Kolkata, the statutory penalty is mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Paralyzing state electrical grid telemetry routers with 800 Gbps DDoS floods
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What is 'BGP Remotely Triggered Blackholing' (RTBH / RFC 7999), and what is the 'Self-Inflicted Denial of Service' Trade-off?",
    shortAnswer: "RTBH instructs upstream ISPs to drop all traffic destined for the targeted victim IP at the ISP edge by routing it to Null0; it saves the broader network infrastructure from collapsing, but completes the attacker's goal by taking the victim IP completely offline.",
    explanation: "When an enterprise receives a 600 Gbps flood that threatens to take down their entire multi-gigabit data center uplink, the network team advertises the victim `/32` IP to the ISP with the BGP Blackhole Community (`65535:666`). The ISP drops 100% of traffic destined for that IP at their core. While this protects neighboring services in the data center, the targeted website goes completely dark.",
    hint: "Cutting off the electrical wire to one burning room in a mansion to prevent the entire mansion from burning down.",
    level: "expert",
    codeExample: `// BGP RTBH RFC 7999 Configuration:
router bgp 65001
 neighbor 103.25.10.1 remote-as 64512
 neighbor 103.25.10.1 send-community
 ! Advertise victim IP to ISP Blackhole Community:
 ip route 103.25.10.50 255.255.255.255 Null0
 route-map SEND-BLACKHOLE permit 10
  match ip address prefix-list VICTIM-IP
  set community 65535:666`
  },
  {
    question: "How does 'BGP Flowspec' (RFC 5575) improve upon BGP Blackholing (RTBH)?",
    shortAnswer: "Instead of dropping ALL traffic to an IP like RTBH, BGP Flowspec dynamically propagates granular firewall filtering rules (dropping only specific UDP ports, packet lengths, or TCP flags) across upstream Tier-1 ISP core routers.",
    explanation: "RTBH is a blunt instrument that discards clean and attack traffic alike. BGP Flowspec allows the network operator to push an ACL rule to Airtel, Tata, or Vodafone core routers: `Match: Dest IP 103.25.10.50, Protocol UDP, Port 53, Packet Length > 1200 ➔ Action: Rate-Limit 0`. Malicious DNS reflection packets are dropped at the carrier core, while legitimate HTTPS web traffic (port 443) continues reaching the origin server unaffected.",
    hint: "Using a precision scalpel to remove a tumor instead of amputating the patient's entire arm.",
    level: "expert",
    codeExample: `// Juniper BGP Flowspec (RFC 5575) Filtering Policy:
routing-options {
    flow {
        route kolkata-granular-scrubber {
            match {
                destination 103.25.10.50/32;
                protocol udp;
                source-port [ 53 123 11211 ]; # DNS, NTP, Memcached Reflection
                packet-length 1200-1500;
            }
            then {
                rate-limit 0; # Granular Drop: HTTP/HTTPS traffic on port 443 remains 100% ONLINE!
            }
        }
    }
}`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if mitigation failures lead to extended personal data access outages?",
    shortAnswer: "Failing to implement reasonable technical availability controls resulting in persistent personal data access collapse triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards. If an enterprise in West Bengal fails to deploy Anycast routing or rate limiting, resulting in extended service paralysis for citizens, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Maintaining continuous service availability is a mandatory technical safeguard under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent mitigation controls`
  },
  {
    question: "What is 'Sliding Window Log' vs 'Sliding Window Counter' in Application Rate Limiting?",
    shortAnswer: "Sliding Window Log tracks every single request timestamp in Redis to provide exact rate limiting at high memory cost; Sliding Window Counter approximates rate limiting by calculating a weighted sum of previous and current time windows, using negligible memory.",
    explanation: "Fixed Window rate limiting suffers from the 'boundary burst problem' (a user sends 10 requests at 00:59 and 10 requests at 01:00, exceeding the 10 req/min limit in 2 seconds). Sliding Window Counter solves this: $\\text{Count} = \\text{CurrentWindowCount} + \\text{PrevWindowCount} \\times (1 - \\text{TimeElapsedRatio})$. It provides smooth rate limiting with sub-millisecond calculation speed in Redis.",
    hint: "Calculating your average speed over the exact last 60 seconds rather than resetting your stopwatch at the top of every minute.",
    level: "expert",
    codeExample: `// Redis Sliding Window Counter Rate Limiter (Lua Script):
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

-- Remove timestamps older than current sliding window:
redis.call('ZREMRANGEBYSCORE', key, 0, now - window)
local current_requests = redis.call('ZCARD', key)

if current_requests < limit then
    redis.call('ZADD', key, now, now)
    redis.call('EXPIRE', key, window)
    return 1 -- PERMIT REQUEST!
else
    return 0 -- RATE LIMIT EXCEEDED (HTTP 429)!
end`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for DDoS attacks affecting Indian organizations?",
    shortAnswer: "All organizations in India must report DDoS attacks affecting public services, banking portals, or corporate applications to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including DDoS attacks and mitigation failures) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of DDoS service outages within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Leaky Bucket Algorithm' (Traffic Shaping), and how does it differ from Token Bucket?",
    shortAnswer: "Leaky Bucket processes outgoing requests at a strictly constant rate regardless of ingress bursts, buffering excess requests in a FIFO queue and dropping packets when the queue overflows; Token Bucket allows instant bursts while maintaining a steady average rate.",
    explanation: "Token Bucket is ideal for web APIs where users legitimately open multiple tabs simultaneously. Leaky Bucket is ideal for network traffic shaping and video streaming where downstream systems require a perfectly smooth, constant data rate (e.g. constant 5 Mbps stream) without any packet bursts.",
    hint: "A water bucket with a fixed hole in the bottom that always leaks water at 1 drop per second regardless of how much water is poured in.",
    level: "moderate",
    codeExample: `// Leaky Bucket Traffic Shaper Logic:
class LeakyBucket {
    constructor(capacity, leakRatePerSec) {
        this.capacity = capacity;
        this.leakRate = leakRatePerSec;
        this.currentWater = 0;
        this.lastLeakTime = Date.now();
    }
    allowRequest() {
        this.leak();
        if (this.currentWater < this.capacity) {
            this.currentWater++;
            return true; // Accepted into queue!
        }
        return false; // Queue full ➔ Drop request!
    }
}`
  },
  {
    question: "Under the Indian IT Act Section 43(f), what constitutes civil liability for launching DDoS floods that overwhelm mitigation filters?",
    shortAnswer: "Denying or causing the denial of access to any person authorized to access any computer system or network carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(f) explicitly penalizes denial of access: 'If any person without permission of the owner... denies or causes the denial of access... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(f)):
// Violation: Launching an 800 Gbps DDoS flood that takes down a Kolkata hospital's appointment booking server
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Equal-Cost Multi-Path' (ECMP) Hashing in Anycast DDoS Load Distribution?",
    shortAnswer: "Network routers use ECMP to balance traffic across multiple parallel paths or server nodes by computing a 5-tuple hash (SrcIP, SrcPort, DstIP, DstPort, Protocol), distributing 100 Gbps of incoming traffic evenly across 10 scrubbing engines.",
    explanation: "Inside an Anycast data center, ingress 100 Gbps traffic hits edge border routers. ECMP computes a mathematical hash of the packet header: $\\text{Hash} = (\\text{SrcIP} \\oplus \\text{DstIP} \\oplus \\text{Ports}) \\pmod{N}$. Packets belonging to the same TCP stream consistently route to the same scrubbing server, preventing session desynchronization while distributing the flood evenly.",
    hint: "A highway toll plaza splitting 10 lanes of cars evenly using automatic license plate hashing.",
    level: "expert",
    codeExample: `! Cisco BGP ECMP Multipath Configuration:
router bgp 65001
 maximum-paths 16                   ! Enables 16-way parallel ECMP load sharing!
 bgp bestpath as-path multipath-relax`
  },
  {
    question: "What is 'BGP Path Prepending' in Anycast Traffic Engineering during Localized Scrubbing Overload?",
    shortAnswer: "Artificially lengthening the advertised AS Path on a congested Anycast PoP (e.g. `AS65001 AS65001 AS65001`) to make it appear less attractive to global BGP routers, shifting incoming attack traffic to neighboring uncongested scrubbing centers.",
    explanation: "If the Anycast scrubbing center in Mumbai is receiving 800 Gbps of flood traffic and approaching link capacity, the network engineer prepends the AS path 3 times on the Mumbai BGP session. Global ISPs see a longer path to Mumbai and automatically re-route European/Middle Eastern attack traffic to Frankfurt or Singapore, preventing local PoP saturation.",
    hint: "Putting a 'Construction Ahead: Expect Delays' sign on one highway exit so drivers automatically take the next exit.",
    level: "expert",
    codeExample: `// BGP Path Prepending Policy (Shifts Ingress Flood Traffic):
route-map PREPEND-AS-MAP permit 10
 set as-path prepend 65001 65001 65001
! Lengthens AS path to shift international attack traffic to neighboring Anycast PoPs!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for writing tools to bypass DDoS mitigation firewalls?",
    shortAnswer: "Dishonestly or fraudulently disrupting or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer disruption.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Developing and deploying automated scripts to bypass WAF rate limits in Kolkata
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'BGP Anycast Flapping / Route Bouncing' and its Impact on TCP Sessions?",
    shortAnswer: "When internet routing fluctuations cause successive TCP packets from the same client to land on different Anycast data centers (PoP A then PoP B); if the backend state is not synchronized, PoP B drops the connection with a TCP RST because it has no record of the handshake.",
    explanation: "Because BGP is dynamic, network route changes can cause a client's `SYN` to reach Frankfurt and their subsequent `ACK` to reach London. If London has no record of the TCP state, the connection drops. Modern Anycast providers solve this using Consistent TCP Anycast (multiplexing TCP states across data centers or using stateless TCP SYN cookies).",
    hint: "Starting a conversation with a clerk in Room 1 and having the door suddenly push you into Room 2 where the new clerk has no idea what you were talking about.",
    level: "expert",
    codeExample: `// Anycast TCP Session Preservation:
// Solution 1: Stateless RFC 4987 TCP SYN Cookies (State encoded in Sequence Number!)
// Solution 2: Shared Anycast BGP Peering Rings with Consistent Hashing`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier DDoS Mitigation Architecture.",
    shortAnswer: "A defense-in-depth framework combining Global BGP Anycast Scrubbing (300+ PoPs), BGP Flowspec (RFC 5575) carrier filtering, Strict uRPF BCP 38 ingress verification, GeoIP filtering, Token Bucket per-route rate limiting, and Origin IP Cloaking.",
    explanation: "To achieve complete immunity against multi-terabit and Layer 7 bypass DDoS attacks: 1. Global Anycast Tier: 300 PoPs absorbing 10+ Tbps volumetric reflection floods. 2. Upstream Carrier Tier: BGP Flowspec ACL rules dropping reflection ports (53, 123, 11211) at ISP core routers. 3. Perimeter Tier: Strict uRPF dropping spoofed source IPs and GeoIP blocking non-domestic traffic. 4. Application Tier: Redis sliding window token bucket rate limiting on sensitive API routes. 5. Origin Tier: Cloaked origin IPs dropping direct-to-IP traffic.",
    hint: "Combine Anycast scrubbing, BGP Flowspec carrier filtering, uRPF, GeoIP, and Token Bucket rate limiters.",
    level: "expert",
    codeExample: `// Master DDoS Mitigation Blueprint:
// 1. Anycast Layer : 10 Tbps BGP Anycast Global Dilution Network
// 2. Upstream Layer: BGP Flowspec (RFC 5575) Carrier Core ACL Filtering
// 3. Perimeter Layer: Strict uRPF (ip verify unicast source reachable-via rx)
// 4. WAF Layer     : limit_req_zone $binary_remote_addr zone=api rate=15r/s burst=20 nodelay
// 5. Origin Layer  : Origin IP Cloaking (iptables whitelisting CDN VIPs only)`
  },
  {
    question: "What is 'Behavioral Rate Limiting' based on Session Timing Jitter and Entropy?",
    shortAnswer: "Rate limiters that evaluate the statistical randomness (entropy) of inter-request arrival times; automated attack scripts emit requests at fixed mathematical intervals (zero entropy) and are throttled, while human browsing exhibits high timing jitter.",
    explanation: "Simple rate limiters only count total requests per second. Behavioral rate limiters calculate the variance of intervals between successive requests: $\\sigma^2 = \\frac{1}{N} \\sum (\\Delta t_i - \\mu)^2$. If a client makes 10 requests with exact 100ms spacing ($\\sigma^2 \\approx 0$), the WAF classifies it as an automated script and applies strict rate limiting, while permitting human visitors with natural timing variations.",
    hint: "A bank teller noticing someone tapping on the desk like a mechanical metronome versus a human tapping irregularly.",
    level: "expert",
    codeExample: `// Behavioral Request Jitter Entropy Evaluation:
// Human Pattern : [120ms, 850ms, 2300ms, 450ms] ➔ High Jitter (Entropy = 0.94) ➔ PERMIT!
// Botnet Flood  : [100ms, 100ms, 100ms, 100ms]   ➔ Zero Jitter (Entropy = 0.01) ➔ BLOCK HTTP 429!`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via DDoS Mitigation Evasion?",
    shortAnswer: "Intentionally causing damage or service disruption to computer systems that diminishes their value or utility, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker deploys techniques to bypass corporate rate limiters and crashes online portals in West Bengal, the act diminishes electronic property utility, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Intentionally bypassing rate limiters to crash e-commerce servers (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'IP Greylisting' and 'Tarpitting' in Layer 7 DDoS Mitigation?",
    shortAnswer: "Tarpitting intentionally delays responding to suspicious client requests by sending TCP acknowledgments or HTTP bytes at agonizingly slow rates (1 byte every 10 seconds), consuming the attacker's bot sockets and reversing the Slowloris asymmetry.",
    explanation: "When an attacker floods an API endpoint with 50,000 bot requests, the tarpit firewall accepts the TCP connection but responds at an extremely slow rate (e.g. sending 1 byte of the HTTP response every 10 seconds). The attacker's bot clients remain locked in `READ` state waiting for the response, tying up the botnet's socket pool and exhausting the attacker's compute resources.",
    hint: "Answering an annoying telemarketer by speaking at 1 word per minute so they stay stuck on the phone for 2 hours.",
    level: "moderate",
    codeExample: `// Linux TCP Tarpit Firewall Rule:
iptables -A INPUT -p tcp -m tcp --dport 80 -m limit --limit 50/s --limit-burst 100 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 80 -j TARPIT # Traps surplus bot connections in slow read state!`
  },
  {
    question: "What is 'MaxMind GeoIP2 City Database Integration' in Nginx Reverse Proxies?",
    shortAnswer: "Embedding binary MaxMind GeoIP2 lookup tables directly into Nginx memory to map client IP addresses to country codes and autonomous system numbers (ASNs) in under 2 microseconds per request.",
    explanation: "To enforce wire-speed geo-blocking without performance bottlenecks, Nginx compiles the `ngx_http_geoip2_module`. The binary database (`GeoIP2-Country.mmdb`) is mapped into RAM. When a request arrives, Nginx resolves the client's country ISO code in 1.8 microseconds, allowing or blocking the request before passing it to backend application servers.",
    hint: "A bouncer holding an instant digital passport scanner that verifies the country of origin in nanoseconds.",
    level: "moderate",
    codeExample: `// Nginx GeoIP2 Module Configuration:
http {
    geoip2 /usr/share/GeoIP/GeoIP2-Country.mmdb {
        auto_reload 5m;
        $geoip2_country_code country iso_code;
    }
    map $geoip2_country_code $allowed_country {
        default no;
        IN yes; # India
    }
}`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for DDoS Attacks targeting 'Protected Systems' despite Mitigation Controls?",
    shortAnswer: "Securing unauthorized access or attempting to deny access to designated Protected Systems carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an attack that attempts to overwhelm mitigation controls on a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for DoS attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Overwhelming rate limiters protecting SCADA state power grid border routers
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'BGP Anycast Overload Shift via Community Tags'?",
    shortAnswer: "Tagging BGP route announcements with specific ISP community attributes (e.g. `set community 65000:100`) to signal upstream Tier-1 transit providers to decrease local BGP local-preference, diverting international traffic to neighboring data centers.",
    explanation: "When an Anycast PoP in Kolkata experiences high traffic, the router tags outgoing BGP updates with transit provider community values. The upstream carrier's routers read the tag and lower the BGP `local-preference` from 100 to 50 for that route. International routers immediately select alternative Anycast PoPs in Mumbai or Singapore, shedding load without dropping active BGP sessions.",
    hint: "Turning on an 'Overcapacity: Divert Traffic' sign on a major bridge so electronic signs redirect cars to the next bridge.",
    level: "expert",
    codeExample: `// BGP Community-Based Local-Preference Dampening:
route-map SHED-LOAD-MAP permit 10
 set community 64512:50 # Tells Upstream ISP to set Local-Pref = 50!
! Automatically shifts international flood traffic to neighboring Anycast PoPs!`
  },
  {
    question: "What is 'Sliding Window Rate Limiting with Exponential Decay' in API Gateways?",
    shortAnswer: "Calculating rate limit counters using continuous exponential mathematical decay ($C(t) = C_0 \\times e^{-\\lambda \\Delta t} + 1$), eliminating discrete time-window resets and preventing boundary burst spikes with $O(1)$ memory.",
    explanation: "Instead of maintaining arrays of timestamps, exponential decay rate limiters store just 2 numbers: the accumulated counter $C$ and the last request timestamp $T$. When a new request arrives at time $t$, the counter decays: $C = C \\times e^{-\\lambda (t - T)} + 1$. If $C > \\text{Threshold}$, the request is rejected with HTTP 429. This provides smooth, continuous rate limiting with $O(1)$ memory overhead.",
    hint: "A radioactive isotope counter that steadily decays over time so old requests fade away continuously.",
    level: "expert",
    codeExample: `// Exponential Decay Rate Limiter Formula:
// Decay Factor: alpha = exp(-lambda * (current_time - last_time))
// Updated Counter: count = (previous_count * alpha) + 1.0
// If count > max_threshold ➔ RATE LIMIT EXCEEDED!`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via DDoS Mitigation Extortion?",
    shortAnswer: "Threatening to launch or maintain a DDoS flood that will overwhelm enterprise rate limiters unless leadership pays an extortion ransom, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent extortion. Cybercriminals who flood a company's web portal and demand payment in cryptocurrency to halt the attack are prosecuted under Section 420 alongside IT Act Section 66.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Extortion for DoS ransom demands.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Demanding ₹50 Lakhs in cryptocurrency under threat of overwhelming enterprise DDoS mitigations
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'eBPF / XDP Rate Limiting' at the Linux Kernel Network Driver Layer?",
    shortAnswer: "Executing C bytecode directly inside the network interface card (NIC) driver via eBPF/XDP (eXpress Data Path), dropping rate-limit-exceeding packets in under 15 nanoseconds before allocating Linux socket memory (`sk_buff`), processing 40+ Million PPS per server core.",
    explanation: "Traditional iptables and Nginx rate limiters allocate a ~480-byte `sk_buff` kernel structure for every packet, limiting single-core throughput to ~2 Million PPS. XDP rate limiters run before memory allocation directly in the NIC driver ring buffer. The eBPF program evaluates a Token Bucket map in silicon and returns `XDP_DROP` in 12 nanoseconds, absorbing 40 Million PPS without CPU SoftIRQ overload.",
    hint: "A bouncer stationed at the outermost parking lot gate who turns away unwanted cars before they even enter the driveway.",
    level: "expert",
    codeExample: `// eBPF XDP Driver Rate Limiting Program (C):
SEC("xdp_rate_limiter")
int xdp_filter(struct xdp_md *ctx) {
    __u32 src_ip = parse_src_ip(ctx);
    struct token_bucket *tb = bpf_map_lookup_elem(&rate_map, &src_ip);
    if (!tb || !consume_token(tb)) {
        return XDP_DROP; // Drops packet in 12 nanoseconds without kernel memory allocation!
    }
    return XDP_PASS;
}`
  },
  {
    question: "What is 'BGP Anycast Geographic Routing Inefficiency' (Hairpinning / Tromboning)?",
    shortAnswer: "When suboptimal BGP peering arrangements cause traffic from a client in Kolkata to be routed to an Anycast PoP in Singapore or Frankfurt instead of the local Mumbai/Kolkata PoP, adding unnecessary latency.",
    explanation: "BGP routes by Autonomous System (AS) hop count rather than geographic distance. If an Indian ISP has cheap peering in Singapore but expensive transit in Mumbai, it may route Kolkata user traffic to Singapore. Mitigation providers solve this by establishing direct local peering at the National Internet Exchange of India (NIXI) in Kolkata, Mumbai, and Chennai.",
    hint: "Taking a flight from Kolkata to Delhi by first flying all the way to Singapore and transferring planes.",
    level: "expert",
    codeExample: `// NIXI Direct Peering Route Map:
neighbor 103.25.10.1 description "National Internet Exchange of India (NIXI Kolkata)"
neighbor 103.25.10.1 route-map NIXI-LOCAL-PREF permit 10
 set local-preference 200 # Guarantees Indian traffic stays local within domestic borders!`
  },
  {
    question: "What is 'TCP Fast Open (TFO) Rate Limiting' in Modern Mitigation Stacks?",
    shortAnswer: "Rate limiting the issuance and verification of TFO cryptographic cookie tokens to prevent attackers from establishing early-data TCP sessions during Layer 7 DDoS floods.",
    explanation: "TFO allows clients to transmit HTTP request payloads in the initial SYN packet. During an attack, threat actors exploit TFO to flood application payloads without completing three-way handshakes. Mitigation firewalls dynamically throttle TFO cookie validation during high loads, forcing clients to complete standard three-way handshakes with SYN cookies.",
    hint: "Revoking express VIP passes during a stadium emergency so everyone must show standard tickets at the main gate.",
    level: "expert",
    codeExample: `// Linux TFO Control under High Load:
sysctl -w net.ipv4.tcp_fastopen=1 # Client only (Disables server-side early data acceptance during floods!)`
  },
  {
    question: "Synthesize the mathematical formulation of Anycast Global Traffic Fragmentation (L_PoP), Global Attack Volume (V_attack), PoP Count (N_PoPs), BGP Routing Affinity Skew (\\eta_affinity), and Ingress Link Saturation Probability (P_sat).",
    shortAnswer: "Average load per Anycast PoP is L_PoP = (V_attack / N_PoPs) * \\eta_affinity; link saturation probability is P_sat = 1 - e^(- max(0, L_PoP - C_PoP) / \\sigma_jitter); deploying 300 Anycast PoPs reduces a 1.2 Tbps flood to 4.0 Gbps per PoP (L_PoP << C_PoP), driving P_sat = 0.0%.",
    explanation: "Let $V_{\\text{attack}}$ represent the global attack volume (e.g. 1,200 Gbps generated by a botnet). Let $N_{\\text{PoPs}}$ represent the number of Anycast scrubbing centers (e.g. 300 data centers). Let $\\eta_{\\text{affinity}}$ represent the BGP routing affinity skew factor (e.g. $1.05$). The average load received by any single Anycast PoP is: $L_{\\text{PoP}} = \\frac{1,200}{300} \\times 1.05 = 4.2$ Gbps. If each PoP possesses a 100 Gbps hardware scrubbing capacity ($C_{\\text{PoP}} = 100$ Gbps), $L_{\\text{PoP}} \\ll C_{\\text{PoP}}$, keeping Ingress Saturation Probability at $P_{\\text{sat}} = 1 - e^{-(0)/20} = 0.0\\%$.",
    hint: "Mathematical proof formula showing that Anycast routing fragments a 1.2 Tbps global flood into 4.2 Gbps increments, rendering link saturation mathematically zero across all 300 scrubbing centers.",
    level: "expert",
    codeExample: `// Anycast Global Traffic Fragmentation Mathematical Proof:
// Global Attack Volume (V_attack) = 1,200 Gbps (1.2 Tbps) | Anycast PoP Count = 300 PoPs
// Average Ingress per PoP: L_PoP = (1200 / 300) * 1.05 = 4.2 Gbps
// Local Hardware Capacity (C_PoP) = 100 Gbps (Surplus Capacity = +95.8 Gbps!)
// Ingress Link Saturation Probability: P_sat = 0.00% (100% RESILIENT ACROSS ALL GLOBAL POPs!)`
  }
];

export default questions;
