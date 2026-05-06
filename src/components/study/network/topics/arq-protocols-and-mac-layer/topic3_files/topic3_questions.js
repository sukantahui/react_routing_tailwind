const questions = [
  {
    question: "What is the fundamental difference between Pure ALOHA and Slotted ALOHA?",
    shortAnswer: "Pure ALOHA allows transmission at any time; Slotted ALOHA restricts transmission to slot boundaries.",
    explanation: "In Pure ALOHA, a station sends a frame whenever it has data. In Slotted ALOHA, time is divided into discrete slots equal to frame transmission time, and stations can only start transmission at the beginning of a slot. This reduces the vulnerable period from 2T to T (where T is frame time).",
    hint: "Think about talking in a free‑for‑all vs only when a moderator points to you.",
    level: "basic",
    codeExample: "// Pure: transmit() any time\n// Slotted: transmit() at slot_start"
  },
  {
    question: "What is the maximum throughput (in fraction of channel capacity) for Pure ALOHA?",
    shortAnswer: "1/(2e) ≈ 0.184 or 18.4%.",
    explanation: "The throughput S = G × e^{-2G}, where G is offered load. Maximum occurs at G = 0.5, giving S_max = 0.5 × e^{-1} = 0.1839. This means at best, only 18.4% of the channel carries useful data; the rest is wasted by collisions.",
    hint: "Try changing G: if G too small, channel idle; too large, too many collisions. Optimal is 0.5 transmissions per frame time.",
    level: "intermediate",
    codeExample: "S(G) = G * Math.exp(-2 * G);"
  },
  {
    question: "What is the maximum throughput of Slotted ALOHA?",
    shortAnswer: "1/e ≈ 0.368 or 36.8%.",
    explanation: "Throughput S = G × e^{-G}. Maximum at G = 1, giving S_max = 1/e = 0.3679. Slotted ALOHA doubles the maximum throughput of Pure ALOHA by reducing the collision window.",
    hint: "Observe carefully: slot boundaries eliminate partial overlaps, so the vulnerable period halves.",
    level: "basic",
    codeExample: "S_slotted(G) = G * Math.exp(-G);"
  },
  {
    question: "Why does Pure ALOHA have a vulnerable period of 2 × frame time?",
    shortAnswer: "Because a frame can collide with another frame that started up to one frame time before it or ends up to one frame time after it.",
    explanation: "Consider a frame that starts at time t and lasts T. Any other frame that starts between t-T and t+T will overlap with it. That interval is 2T. For Slotted ALOHA, the vulnerable period is only T because frames align to slot boundaries.",
    hint: "Think of two trains crossing: a train that arrives just before yours and one that arrives just after can both cause a collision.",
    level: "intermediate",
    codeExample: "vulnerable_pure = 2 * T; vulnerable_slotted = T;"
  },
  {
    question: "How does slotted ALOHA achieve higher throughput than pure ALOHA?",
    shortAnswer: "By reducing the vulnerable period, thus decreasing the probability of collision for a given offered load.",
    explanation: "Because collisions only happen when two frames start in the same slot (instead of overlapping partially), the probability of a successful transmission is higher. This allows the network to sustain a higher load before collisions dominate.",
    hint: "Try changing the slot alignment: imagine a classroom where students can only speak when the teacher taps the desk – fewer interruptions.",
    level: "basic",
    codeExample: "// Slotted: collision only if two send in same slot"
  },
  {
    question: "What is the effect of increasing the offered load G beyond the optimal point in ALOHA?",
    shortAnswer: "Throughput decreases as collisions become too frequent, leading to instability and eventual collapse.",
    explanation: "Beyond the optimal G, the channel becomes congested. More transmissions cause more collisions, which cause more retransmissions, which further increase G. Without backoff, the system enters a congestive collapse where virtually all frames collide.",
    hint: "Think of a busy intersection with too many cars – everyone honks and no one moves.",
    level: "intermediate",
    codeExample: "if (G > 1) throughput drops sharply;"
  },
  {
    question: "What is the role of random backoff in ALOHA protocols?",
    shortAnswer: "To avoid repeated collisions by breaking synchronization among retransmitting stations.",
    explanation: "After a collision, if all stations waited the same fixed time, they would retransmit simultaneously and collide again. Random backoff (choosing a random delay) spreads out retransmissions, reducing the chance of another collision.",
    hint: "Observe carefully: if two students speak at once and both wait exactly 3 seconds, they'll speak together again. Randomness solves it.",
    level: "basic",
    codeExample: "delay = rand(0, max_backoff) * slot_time;"
  },
  {
    question: "How do ALOHA protocols achieve stability in practice?",
    shortAnswer: "By using exponential backoff (e.g., binary exponential backoff) where the backoff window doubles after each collision.",
    explanation: "Exponential backoff gradually increases the average waiting time after repeated collisions, reducing the offered load G when the channel is congested. This allows the system to recover from overload and remain stable, though at the cost of increased latency.",
    hint: "Try changing the backoff algorithm: fixed random → unstable; exponential → stable.",
    level: "advanced",
    codeExample: "backoff = rand(0, (1 << min(k, 10)) - 1);"
  },
  {
    question: "Why is Slotted ALOHA not used in modern Wi‑Fi (802.11), even though it has higher throughput than Pure ALOHA?",
    shortAnswer: "Wi‑Fi uses CSMA/CA (carrier sense) to avoid collisions before transmission, which yields much higher efficiency.",
    explanation: "CSMA/CA listens to the channel before transmitting, avoiding most collisions. ALOHA blindly transmits, leading to at most 37% efficiency. Modern wireless networks prioritize higher throughput and fairness, so they use carrier sensing.",
    hint: "Think about checking if the room is empty before speaking (CSMA) vs speaking without looking (ALOHA).",
    level: "advanced",
    codeExample: "// Wi-Fi: sense before talk; ALOHA: talk regardless"
  },
  {
    question: "What is the capture effect, and how does it affect ALOHA throughput in real systems?",
    shortAnswer: "The capture effect allows a frame with sufficiently higher power to survive a collision, improving effective throughput.",
    explanation: "In wireless, if one signal is much stronger (e.g., closer transmitter), the receiver may still decode it despite overlapping frames. This violates the ALOHA assumption that all collisions destroy frames, making practical throughput higher than the theoretical 18.4% / 36.8%.",
    hint: "Observe carefully: in a room, the loudest voice may be heard even if others speak at the same time.",
    level: "expert",
    codeExample: "// capture: if power_ratio > threshold, success"
  },
  {
    question: "What is the difference between ALOHA and CSMA/CD?",
    shortAnswer: "CSMA/CD listens before transmitting (carrier sense) and detects collisions during transmission; ALOHA does not sense.",
    explanation: "ALOHA transmits blindly, risking collisions. CSMA/CD (used in Ethernet) first senses the channel; if idle, it transmits while continuing to listen for collisions. If a collision is detected, it stops and retransmits later. This dramatically improves efficiency (up to near 100% under light load).",
    hint: "Try changing the analogy: ALOHA = shouting without listening; CSMA = listening before shouting and stopping if someone else shouts.",
    level: "intermediate",
    codeExample: "// CSMA/CD: sense, transmit, sense collision, stop"
  },
  {
    question: "In Slotted ALOHA, why is the optimal offered load G = 1?",
    shortAnswer: "Because at G=1, the average number of transmissions per slot is 1, maximizing the success probability (e^{-1} vs G*e^{-G}).",
    explanation: "Derivative of S(G) = e^{-G} - G e^{-G} = e^{-G}(1 - G) = 0 => G=1. At G<1, the channel is underutilized; at G>1, collisions dominate. G=1 balances channel use and collision rate.",
    hint: "Think of a Poisson process: with mean 1, the probability of exactly 1 arrival is 1/e ≈ 36.8%, the maximum possible.",
    level: "advanced",
    codeExample: "S_max = 1/e when lambda = 1"
  },
  {
    question: "What happens if stations in Pure ALOHA do not use random backoff but instead retransmit immediately after a collision?",
    shortAnswer: "They will collide repeatedly and the system will deadlock (never make progress).",
    explanation: "If two frames collide and both retransmit immediately, they will collide again at the same time. This continues forever. Randomness is essential to break the symmetry.",
    hint: "Observe carefully: two people saying 'sorry' at exactly the same time repeatedly – they never get a word in.",
    level: "basic",
    codeExample: "// wrong: fixed delay -> infinite collisions"
  },
  {
    question: "How would you compute the average number of transmissions per successful frame in Slotted ALOHA with G=1?",
    shortAnswer: "Average retransmissions = 1/S = e ≈ 2.718 times per successful frame (including the success itself).",
    explanation: "Throughput S = 1/e, so each successful frame requires 1/S = e transmissions on average (including successful attempt and previous collisions). So about 1.718 retransmissions per success.",
    hint: "Try changing G: at G=0.5, S≈0.303, so 3.3 transmissions per success; at G=2, S≈0.27, 3.7 transmissions.",
    level: "intermediate",
    codeExample: "avg_tx = 1 / (G * exp(-G));"
  },
  {
    question: "What is the primary reason Slotted ALOHA is still used in some modern systems like LoRaWAN?",
    shortAnswer: "Simplicity and suitability for low‑power, long‑range networks where carrier sensing is impractical due to hidden terminals and low duty cycles.",
    explanation: "In LoRaWAN, end‑devices are often battery‑powered and can't listen continuously (energy). Also, the hidden terminal problem makes CSMA ineffective. A simple ALOHA‑like approach (often with random delays) works well for low‑density, low‑traffic IoT networks.",
    hint: "Think about a remote sensor that wakes up once an hour to send a reading – it can't afford to listen for a long time.",
    level: "advanced",
    codeExample: "// LoRaWAN Class A: uplink ALOHA with random delay"
  },
  {
    question: "What is the relationship between ALOHA and the stability of random access protocols?",
    shortAnswer: "ALOHA without backoff is unstable; with exponential backoff it becomes stable but may have high delay under overload.",
    explanation: "Stability means that the backlog of frames does not grow unbounded. Pure ALOHA with fixed retransmission probability is unstable for any positive arrival rate. Exponential backoff introduces a form of load control that can keep the system stable for arrivals up to the maximum throughput.",
    hint: "Observe carefully: without backoff, as load increases, collisions increase exponentially → death spiral.",
    level: "expert",
    codeExample: "// stable if backoff window increases with collisions"
  },
  {
    question: "In Slotted ALOHA, what is the probability that a transmission is successful if the offered load is G?",
    shortAnswer: "P(success) = e^{-G}.",
    explanation: "A transmission in a given slot is successful if no other station transmits in that same slot. Under Poisson arrivals with mean G per slot, the probability of zero other transmissions is e^{-G}. Note that this is not the throughput; throughput S = G * e^{-G}.",
    hint: "Try changing G: if G=1, a given transmission has 37% chance of being alone.",
    level: "intermediate",
    codeExample: "prob_success = Math.exp(-G);"
  },
  {
    question: "What is the vulnerable period in Pure ALOHA for a frame of duration T?",
    shortAnswer: "2T.",
    explanation: "A frame starting at time t will collide with any other frame that starts in the interval [t-T, t+T] because the overlapping area can be partial. This interval length is 2T. For Slotted ALOHA, it's T because frames align to slots.",
    hint: "Think of a ruler: any other transmission that overlaps your paintbrush stroke within ±T will spoil it.",
    level: "basic",
    codeExample: "vulnerable = 2 * T;"
  },
  {
    question: "How does the throughput of Slotted ALOHA degrade when the offered load G is much larger than 1?",
    shortAnswer: "Throughput S ≈ G × e^{-G} → 0 as G → ∞, because almost every slot contains multiple transmissions (all collide).",
    explanation: "As G becomes large, the probability that a slot contains exactly one transmission becomes tiny. Most slots contain many transmissions, all of which collide. Thus S collapses to near zero, even though the channel is busy.",
    hint: "Observe carefully: a crowded room where everyone talks at once – no one is heard.",
    level: "intermediate",
    codeExample: "S(G) = G * Math.exp(-G); // decreases after G=1"
  },
  {
    question: "What is the difference between ALOHA and pure reservation protocols like TDMA?",
    shortAnswer: "ALOHA is random access; TDMA reserves fixed time slots for each station, eliminating collisions but requiring synchronization and slot allocation.",
    explanation: "TDMA (Time Division Multiple Access) assigns each station a dedicated slot, avoiding collisions entirely. However, it requires global coordination, slot negotiation, and is inefficient when traffic is bursty. ALOHA is distributed and works well for low to moderate, sporadic traffic.",
    hint: "Think of a meeting where everyone has a scheduled minute to speak (TDMA) vs raising hands randomly (ALOHA).",
    level: "advanced",
    codeExample: "// TDMA: fixed schedule; ALOHA: contention-based"
  },
  {
    question: "Why did early satellite networks use ALOHA protocols?",
    shortAnswer: "Because the long propagation delay made carrier sensing impossible, and the random access nature suited bursty traffic.",
    explanation: "In satellite links, the round‑trip delay is large (≈ 500 ms). Carrier sense would be useless because by the time a station senses the channel, the frame from another station might already be in transit. ALOHA's simplicity and lack of sensing made it practical for early satellite systems like ALOHANET.",
    hint: "Try changing the delay: if it takes half a second to notice someone is speaking, you can't listen before talking.",
    level: "intermediate",
    codeExample: "// satellite: too far for CSMA"
  },
  {
    question: "Can ALOHA protocols be used in wired networks? Why or why not?",
    shortAnswer: "Yes, but they are inefficient; Ethernet uses CSMA/CD instead, which performs much better on wired media.",
    explanation: "In wired networks, collision detection is easy and cheap, and carrier sensing is reliable. ALOHA's 18-37% efficiency is far below what CSMA/CD can achieve (near 100% under light load). Thus ALOHA is rarely used in wired LANs, except for specific low‑cost or legacy systems.",
    hint: "Think about a telephone party line: listening before talking works well on wires.",
    level: "basic",
    codeExample: "// wired: use CSMA/CD, not ALOHA"
  },
  {
    question: "What is the 'birth of the Internet' connection to ALOHA?",
    shortAnswer: "ALOHANET inspired the development of Ethernet, and its random access principles influenced packet radio and later Wi‑Fi.",
    explanation: "Bob Metcalfe, who later co‑invented Ethernet, studied ALOHA at the University of Hawaii. He saw the need for a more efficient protocol and developed CSMA/CD, which became the basis for Ethernet. Thus ALOHA is a direct ancestor of modern networking.",
    hint: "Observe carefully: without ALOHA, Ethernet might have looked very different.",
    level: "advanced",
    codeExample: "// ALOHA → Ethernet → Wi‑Fi"
  },
  {
    question: "What is the hidden terminal problem, and does ALOHA solve it?",
    shortAnswer: "The hidden terminal problem occurs when two stations are out of range of each other but can both communicate with a common receiver. ALOHA does not solve it; CSMA/CA with RTS/CTS is used to mitigate it.",
    explanation: "In ALOHA, two hidden terminals can collide at the access point without knowing each other's existence. Since ALOHA doesn't listen, it cannot avoid such collisions. Wireless networks use request‑to‑send (RTS) and clear‑to‑send (CTS) handshakes to reserve the channel.",
    hint: "Think of two people on opposite sides of a wall shouting to a person in the middle – they can't hear each other, so they might shout simultaneously.",
    level: "expert",
    codeExample: "// RTS/CTS: solve hidden terminal, ALOHA does not"
  },
  {
    question: "How does the throughput formula of Pure ALOHA change if frames have variable length?",
    shortAnswer: "The analysis becomes more complex; vulnerable period depends on frame length distribution, and throughput is generally lower.",
    explanation: "With variable length, a short frame can be destroyed by a long overlapping frame starting earlier or later. The vulnerable period becomes the sum of the two frame durations. The Poisson assumption may still apply but the throughput formula differs. Often, fixed length is assumed for simplicity.",
    hint: "Try changing lengths: a long transmission can ruin many short ones.",
    level: "expert",
    codeExample: "// variable length: collision probability increases"
  },
  {
    question: "What is the difference between non‑persistent and slotted ALOHA?",
    shortAnswer: "Non‑persistent refers to a CSMA variant, not ALOHA. Slotted ALOHA is a different concept (slot alignment).",
    explanation: "Non‑persistent CSMA is a carrier sense protocol where a station that finds the channel busy waits a random time before sensing again. Slotted ALOHA does not involve sensing. They are separate access methods.",
    hint: "Observe carefully: ALOHA does no sensing; CSMA senses. Don't confuse them.",
    level: "intermediate",
    codeExample: "// non-persistent: CSMA; slotted ALOHA: no sense"
  },
  {
    question: "Why is the maximum throughput of Slotted ALOHA 1/e and not something higher?",
    shortAnswer: "Because the probability of exactly one transmission in a slot under Poisson traffic peaks at 1/e when the mean is 1.",
    explanation: "The probability of k transmissions in a slot is Poisson: P(k) = e^{-G} G^k / k!. For k=1, P(1) = G e^{-G}. This is maximized when d/dG (G e^{-G}) = 0 → e^{-G}(1 - G) = 0 → G=1, giving P(1)=1/e. Since a slot with one transmission is a success, the maximum throughput is 1/e.",
    hint: "Try changing the distribution: only Poisson yields that result.",
    level: "advanced",
    codeExample: "max_P1 = 1/e ≈ 0.3679"
  },
  {
    question: "What is the 'stability region' of ALOHA protocols?",
    shortAnswer: "The set of arrival rates for which the backlog remains bounded. For ALOHA with binary exponential backoff, the region is up to approximately the maximum throughput (0.184 for Pure, 0.368 for Slotted).",
    explanation: "If the arrival rate (new frames per slot) is less than the maximum throughput, the system can be stable with proper backoff. If rate exceeds throughput, backlog grows without bound – instability. In practice, stability requires controlling retransmission probabilities.",
    hint: "Think of a sink: if you pour water faster than it drains, it overflows.",
    level: "expert",
    codeExample: "stable if λ < S_max"
  },
  {
    question: "How does ALOHA compare to random access in 5G NR (grant‑free uplink)?",
    shortAnswer: "5G uses a form of slotted ALOHA with contention resolution and resource pooling, but with advanced features like pre‑configured grants and listen‑before‑talk in unlicensed bands.",
    explanation: "5G NR supports grant‑free (configured grant) transmissions for low‑latency IoT, which resembles slotted ALOHA with reserved resources. It is more efficient due to multi‑user detection, power ramping, and dynamic backoff. However, pure ALOHA is too inefficient for high‑density 5G.",
    hint: "Observe carefully: modern systems borrow ALOHA's idea but add many enhancements.",
    level: "expert",
    codeExample: "// 5G: configurable slotted ALOHA-like with NOMA"
  },
  {
    question: "In Pure ALOHA, what is the probability that a given frame is successful if there are N stations, each transmitting with probability p per frame time?",
    shortAnswer: "P(success) = N p (1-p)^{2(N-1)} (approximately).",
    explanation: "For a given station, success if it transmits (prob p) and no other station transmits in the vulnerable window (two frame times). The probability that a specific other station does not transmit in either of the two time units is (1-p)^2. With N-1 other stations, the approximate success probability is N p (1-p)^{2(N-1)}. For small p and large N, this approximates the Poisson model with G = Np.",
    hint: "Try changing N and p: this matches the Poisson form when N large and p small.",
    level: "advanced",
    codeExample: "P_s = N * p * (1-p)^(2*(N-1));"
  }
];

export default questions;