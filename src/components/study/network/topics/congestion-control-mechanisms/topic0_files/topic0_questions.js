const questions = [
  {
    question: "What is the fundamental purpose of the leaky bucket algorithm?",
    shortAnswer: "It converts bursty traffic into a constant‑rate stream and drops excess packets.",
    explanation: "Leaky bucket smooths out irregular arrivals by using a fixed‑size queue (bucket) and a constant output rate (leak). Any packet that arrives when the bucket is full is discarded.",
    hint: "Think of water pouring into a bucket with a small hole at the bottom – the outflow is steady even if inflow is erratic.",
    level: "basic",
    codeExample: "if (queue.size() < bucket_capacity) { queue.enqueue(packet); } else { drop(packet); }"
  },
  {
    question: "What are the two main parameters of a leaky bucket?",
    shortAnswer: "Bucket capacity (maximum queue size) and leak rate (constant output rate).",
    explanation: "Bucket capacity determines how many packets can be buffered, and leak rate defines how many packets exit per time unit.",
    hint: "Capacity = size of the bucket; leak rate = how fast water drips out.",
    level: "basic",
    codeExample: "const BUCKET_CAP = 1000; // bytes\nconst LEAK_RATE = 200; // bytes/sec"
  },
  {
    question: "What happens when a packet arrives and the leaky bucket is full?",
    shortAnswer: "The packet is dropped (discarded).",
    explanation: "Leaky bucket has no overflow handling other than dropping. This ensures the output never exceeds the leak rate, but it also means bursty traffic can suffer losses.",
    hint: "Observe carefully: the bucket has a finite size – extra water will spill over and be lost.",
    level: "basic",
    codeExample: "if (currentSize + pktSize > capacity) return DROP;"
  },
  {
    question: "How does the leaky bucket differ from a simple FIFO queue?",
    shortAnswer: "A FIFO queue forwards packets at line rate (variable), while leaky bucket outputs at a fixed artificial rate.",
    explanation: "Without shaping, a router sends packets as fast as the link allows. Leaky bucket intentionally delays packets to produce a constant output rate, which can prevent congestion upstream.",
    hint: "Imagine a queue at a coffee shop – FIFO serves as fast as the barista can work; leaky bucket forces the barista to take exactly 2 minutes per customer.",
    level: "intermediate",
    codeExample: "// FIFO: send immediately if link free\n// Leaky: hold in queue and release periodically"
  },
  {
    question: "Can the leaky bucket ever send packets faster than the leak rate?",
    shortAnswer: "No, the output rate is strictly capped by the leak rate.",
    explanation: "Even if the bucket contains many packets, the algorithm ‘leaks’ them one by one at a predetermined interval, never exceeding that rate.",
    hint: "The hole size (leak rate) is fixed – you cannot pour faster than the hole allows.",
    level: "basic",
    codeExample: "// leak every 10 ms\nsetInterval(() => sendPacket(), 10);"
  },
  {
    question: "What is a real‑world example of leaky bucket (outside computer networks)?",
    shortAnswer: "A factory assembly line with a buffer and fixed machine processing time.",
    explanation: "Parts arrive randomly into a buffer, but the machine processes one part every 30 seconds. Overflow indicates lost parts. This matches the leaky bucket model perfectly.",
    hint: "Think about a toll booth on a highway – cars arrive randomly but booths serve at a constant rate.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How would you implement a leaky bucket rate limiter in JavaScript (Node.js)?",
    shortAnswer: "Use a queue (array) and setInterval to shift() and process at fixed intervals.",
    explanation: "Each incoming packet is pushed to an array if length < capacity. A timer runs every (1/leakRate) ms, dequeues one packet, and processes it.",
    hint: "Try changing the setInterval delay – what happens to the backlog?",
    level: "intermediate",
    codeExample: "let queue = []; setInterval(() => { let pkt = queue.shift(); if(pkt) send(pkt); }, 1000/leakRate);"
  },
  {
    question: "Explain the ‘congestion avoidance’ property of leaky bucket.",
    shortAnswer: "By shaping traffic to a constant rate, it prevents sudden bursts from overwhelming downstream routers.",
    explanation: "Congestion happens when many packets arrive faster than they can be forwarded. Leaky bucket enforces a smooth, predictable stream, keeping queues at downstream nodes under control.",
    hint: "A garden hose with a kink produces bursts. Remove the kink (leaky bucket) → steady flow.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the primary drawback of the leaky bucket for web APIs?",
    shortAnswer: "It discards legitimate bursts, which may be natural (e.g., page reload).",
    explanation: "Web traffic is often bursty – a user might request 10 resources at once. Leaky bucket would only serve at the leak rate, dropping the rest, leading to poor UX.",
    hint: "Think about refreshing a dashboard – you expect all widgets to load quickly.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Compare leaky bucket and token bucket – which allows temporary bursts?",
    shortAnswer: "Token bucket allows bursts up to the number of accumulated tokens, leaky bucket does not.",
    explanation: "Token bucket lets traffic go at line rate for a short time (using stored tokens). Leaky bucket rigidly limits output to the leak rate, no bursts.",
    hint: "`token bucket` = credit that can be spent quickly; `leaky` = no credit, always fixed speed.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Write the formula for maximum delay a packet can experience in a leaky bucket.",
    shortAnswer: "Max delay = bucket_capacity / leak_rate.",
    explanation: "If the bucket is full at capacity C and leaks at L packets/sec, the last packet waits C/L seconds to exit.",
    hint: "Assume a bucket can hold 10 packets and you leak 2 per second – worst wait = 5 seconds.",
    level: "expert",
    codeExample: "maxDelaySec = capacityPackets / leakRatePktsPerSec;"
  },
  {
    question: "What happens if leak rate > link capacity?",
    shortAnswer: "The output queue at the physical interface will grow indefinitely (real bottleneck).",
    explanation: "Leaky bucket only shapes the logical stream; if the underlying link cannot handle the leak rate, packets will pile up again downstream. The leak rate should be ≤ link capacity.",
    hint: "You cannot pour 10 liters per minute into a pipe that only accepts 5 liters/min.",
    level: "expert",
    codeExample: null
  },
  {
    question: "In a router, where is the leaky bucket typically implemented?",
    shortAnswer: "In the egress queue scheduler or a traffic shaper module.",
    explanation: "After routing decision, packets enter a shaping queue (leaky bucket) before being placed on the outgoing link. It works together with the hardware queue.",
    hint: "It sits somewhere between the forwarding engine and the physical transmitter.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What metric would you monitor to tune the bucket capacity?",
    shortAnswer: "Packet drop rate (or loss percentage).",
    explanation: "If drop rate is consistently high, increase capacity (if memory permits) to absorb more bursts. If drop rate is near zero, you might decrease capacity to save buffer memory.",
    hint: "Observe carefully: too many drops → bucket too small.",
    level: "intermediate",
    codeExample: "dropRate = drops / (drops + forwarded);"
  },
  {
    question: "How does leaky bucket handle variable packet sizes?",
    shortAnswer: "It can be byte‑aware (capacity and leak in bytes) or packet‑aware (each packet counts as 1).",
    explanation: "For byte mode, bucket capacity is in bytes and leak_rate in bytes/sec – gives fairness regardless of packet size. Packet mode treats a 1500B packet same as 64B, which may be unfair.",
    hint: "Should a VoIP packet (tiny) be treated equal to a video frame?",
    level: "expert",
    codeExample: "if (currentBytes + pkt.len <= capacityBytes) { accept; } else { drop; }"
  },
  {
    question: "Is the leaky bucket algorithm work‑conserving? Why?",
    shortAnswer: "No, it is non‑work‑conserving because it may idle even when packets are in the bucket (due to fixed leak intervals).",
    explanation: "Work‑conserving servers always transmit if there is any packet. Leaky bucket artificially delays transmission to enforce a rate, so it can be idle even if queue is non‑empty.",
    hint: "Imagine a bucket with one drop left – it still waits for the next clock tick.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Can you combine leaky bucket with a priority queue?",
    shortAnswer: "Yes, put high‑priority packets in a separate leaky bucket with a higher leak rate.",
    explanation: "Multiple leaky buckets can be used for different traffic classes (EF, AF, BE). The scheduler then serves them in round‑robin or according to weights.",
    hint: "Voice needs low delay – give it a fast leak. Background traffic – slow leak.",
    level: "expert",
    codeExample: "class LeakyBucketShaper { constructor(rate, capacity, priority) {...} }"
  },
  {
    question: "What does RFC 2697 define with respect to leaky bucket?",
    shortAnswer: "A single rate three‑color marker (srTCM) which uses two leaky buckets for metering.",
    explanation: "RFC 2697 uses a committed bucket (CBS) and excess bucket (EBS) to mark packets as green, yellow, or red – still based on leaky bucket principles.",
    hint: "Think of it as two buckets in series – one for guaranteed rate, one for burst allowance.",
    level: "expert",
    codeExample: "Committed Information Rate (CIR) and Committed Burst Size (CBS)."
  },
  {
    question: "Why is the leaky bucket algorithm said to have ‘memory’?",
    shortAnswer: "Because the bucket level (queue length) retains information about past traffic bursts.",
    explanation: "If a burst arrived 5 seconds ago, the bucket may still be partially full, affecting future acceptance. This ‘memory’ of recent load is crucial for smoothing.",
    hint: "A simple counter that only looks at current second would have no memory.",
    level: "intermediate",
    codeExample: "bucketLevel += packetSize; // memory of past traffic"
  },
  {
    question: "Explain how you would implement a distributed leaky bucket across multiple servers.",
    shortAnswer: "Use a centralised redis counter with atomic decrement (leak) and a background job to refill? Actually leaky bucket is stateful – shared redis+ Lua script or use a deterministic rate limiter with sliding window counters.",
    explanation: "Distributing a true leaky bucket is hard because the ‘leak’ must be synchronised. Often approximate with token bucket or sliding log.",
    hint: "Observe: the leak rate must be applied from a single coordinator or by using a shared atomic clock.",
    level: "expert",
    codeExample: "// Redis: INCR by packet size; EXPIRE based on leak; but tricky."
  },
  {
    question: "What is the difference between a ‘leaky bucket as a queue’ and a ‘leaky bucket as a meter’?",
    shortAnswer: "As a queue it buffers packets; as a meter it just marks packets (without buffering) based on a hypothetical bucket level.",
    explanation: "The metering variant updates a virtual bucket counter and decides ‘conform’ or ‘non‑conform’ without actually delaying the packet. It is often used for policing.",
    hint: "Police = drop/tag; Shape = buffer+delay.",
    level: "expert",
    codeExample: "// policing: if (bucket - pktSize >= 0) bucket -= pktSize else mark_red"
  },
  {
    question: "Can the leaky bucket be used for per‑flow fairness?",
    shortAnswer: "Yes, by allocating one leaky bucket per flow, each flow gets a guaranteed rate.",
    explanation: "This is called ‘fair queuing’ with leaky buckets – each flow’s packets are shaped individually, then a scheduler (e.g., WFQ) serves them.",
    hint: "In Ichapur school network, each classroom (flow) gets its own bucket of 2 Mbps.",
    level: "expert",
    codeExample: "Map<flowId, LeakyBucket> buckets;"
  },
  {
    question: "What happens if you set leak rate = 0?",
    shortAnswer: "No packet ever leaves the bucket; the queue will fill and then drop all incoming packets.",
    explanation: "A leak rate of zero means the hole is closed – water never drips out. After capacity is reached, every new packet is dropped.",
    hint: "Try changing the leak rate to 0 in simulation – what happens?",
    level: "intermediate",
    codeExample: "leakRate = 0; // deadlock"
  },
  {
    question: "How does the leaky bucket algorithm interact with TCP congestion control?",
    shortAnswer: "Leaky bucket shapes the outflow, causing TCP to see artificial delay and reduced throughput, which may trigger TCP to shrink its window.",
    explanation: "TCP uses packet loss and RTT to adjust window size. Adding a leaky bucket can increase RTT, making TCP less aggressive – sometimes desirable for background flows.",
    hint: "Think about a bottleneck shaped by leaky bucket – TCP will adapt to the shaped rate.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the main tuning trade‑off when choosing bucket capacity?",
    shortAnswer: "Larger capacity absorbs bigger bursts but increases buffer delay and memory usage.",
    explanation: "A larger bucket reduces drop rate at the cost of higher latency and more queue space. Real‑time apps prefer small capacity to keep delay low, while file transfers can tolerate larger capacity.",
    hint: "Video call vs. FTP – which one needs tiny bucket?",
    level: "intermediate",
    codeExample: "delay = queueSize / leakRate;"
  },
  {
    question: "Describe a degenerate case where leaky bucket performs poorly.",
    shortAnswer: "Extremely bursty interactive traffic (e.g., remote desktop) – the bucket smooths out the bursts, making the user experience jerky.",
    explanation: "Interactivity often relies on sending updates in bursts. Leaky bucket stretches those bursts, increasing latency and hurting responsiveness.",
    hint: "Observe: a remote mouse movement – you want every packet ASAP, not delayed.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Why does the leaky bucket guarantee a bounded delay (if no drop)?",
    shortAnswer: "Because the queue size is bounded by capacity and output rate is constant → maximum wait = capacity / rate.",
    explanation: "Given a stable leak rate, any packet accepted into the bucket will eventually exit within a known finite time. This makes it useful for circuits that need delay bounds.",
    hint: "Maximum number of packets ahead of you × leak interval = max wait.",
    level: "intermediate",
    codeExample: "maxDelaySec = capacityBytes / leakRateBytesPerSec;"
  },
  {
    question: "How would you adapt leaky bucket for a multi‑core packet processor?",
    shortAnswer: "Use per‑core buckets with a global coordinator or use a lock‑free queue and a single background thread performing the leak.",
    explanation: "Leaky bucket state (bucket level) must be consistent. One core can own the bucket and leak timer, other cores push packets to a lockless queue. Or each core has its own bucket (flow hashing).",
    hint: "Think about separating packet arrival (many cores) and leak (single worker).",
    level: "expert",
    codeExample: "// ConcurrentQueue<Packet> pending; // single timer thread drains"
  },
  {
    question: "What effect does jitter in the leak timer have on the output stream?",
    shortAnswer: "It introduces jitter in the packet departure times, which may defeat the purpose of smoothing.",
    explanation: "If the timer that drains the bucket is imprecise (e.g., OS jitter), packets will leave unevenly, creating micro‑bursts and violating the constant‑rate guarantee.",
    hint: "A wobbly hole in the bucket – water still drips, but not evenly.",
    level: "expert",
    codeExample: "// use high‑resolution timers or hardware offload"
  },
  {
    question: "What is the ‘maximum burst size’ (MBS) in a leaky bucket?",
    shortAnswer: "Exactly the bucket capacity – any larger burst will overflow and drop.",
    explanation: "Unlike token bucket, leaky bucket cannot accommodate any burst larger than its capacity. The MBS equals the physical bucket size.",
    hint: "If capacity = 5 packets, sending 6 at once will drop 1.",
    level: "intermediate",
    codeExample: "MBS = capacityPackets;"
  },
  {
    question: "Explain a scenario where dropping packets (due to leaky bucket) is preferable to buffering them.",
    shortAnswer: "Real‑time voice (VoIP) – a delayed packet is as bad as a lost packet, so dropping allows the application to recover faster.",
    explanation: "When delay exceeds a certain threshold, the packet becomes useless (e.g., voice). Leaky bucket’s drop policy lets the sender know quickly and maybe resend or adjust.",
    hint: "Old voice packet is worse than no packet; better to drop early.",
    level: "intermediate",
    codeExample: "if (queue.delay() > MAX_JITTER) dropInsteadOfEnqueue();"
  }
];

export default questions;