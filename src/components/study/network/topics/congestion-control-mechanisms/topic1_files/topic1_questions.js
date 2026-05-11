const questions = [
  {
    question: "What is the main purpose of the token bucket algorithm?",
    shortAnswer: "To limit the average transmission rate while allowing bursts up to a configured maximum.",
    explanation: "Token bucket enforces a long‑term rate (tokens added per second) but permits temporary bursts by accumulating tokens up to a bucket capacity. This is ideal for traffic that is naturally bursty but must not exceed an average.",
    hint: "Think of a credit card – you have a limit (burst), but you must pay back monthly (refill rate).",
    level: "basic",
    codeExample: "if (tokens >= packet.size) { tokens -= packet.size; forward(); }"
  },
  {
    question: "What are the two key parameters of a token bucket?",
    shortAnswer: "Token refill rate (r) and bucket capacity (b).",
    explanation: "Refill rate (r) = number of tokens added per second, determines long‑term average throughput. Bucket capacity (b) = maximum tokens that can be stored, determines maximum burst size.",
    hint: "One controls speed, the other controls how much you can save up.",
    level: "basic",
    codeExample: "rate = 100 tokens/sec; capacity = 50 tokens;"
  },
  {
    question: "How does token bucket differ from leaky bucket regarding bursting?",
    shortAnswer: "Token bucket allows bursts up to capacity; leaky bucket does not allow any burst beyond its fixed output rate.",
    explanation: "Leaky bucket forces packets out at a constant rate, whereas token bucket lets you send a burst of packets as long as you have enough tokens. After the burst, the average rate approaches the token refill rate.",
    hint: "Token bucket = you can sprint for a short time; leaky bucket = you must walk at a steady pace.",
    level: "basic",
    codeExample: null
  },
  {
    question: "If a token bucket has rate = 10 tokens/sec and capacity = 30 tokens, what is the maximum number of packets that can be sent in the first 2 seconds if the bucket starts empty?",
    shortAnswer: "20 packets (10 from refill, plus initially 0 burst because empty).",
    explanation: "Starting empty, after 2 seconds you have earned 20 tokens (10/sec). No initial burst because capacity is 30 but you never had tokens stored. If starting full, it would be 30 + 10×2 = 50 packets.",
    hint: "The initial token count matters! Empty vs full gives very different burst capacity.",
    level: "intermediate",
    codeExample: "tokens = min(capacity, tokens + elapsed_seconds * rate);"
  },
  {
    question: "What happens when a packet arrives and there are no tokens left?",
    shortAnswer: "The packet is either dropped (policing) or queued (shaping) until tokens become available.",
    explanation: "In policing mode, no tokens → immediate drop or mark. In shaping mode, the packet waits in a separate queue. The shaping variant can cause additional delay.",
    hint: "Police = strict. Shape = patient.",
    level: "basic",
    codeExample: "if (tokens >= needed) { consume; } else { if (shaping) queue(); else drop(); }"
  },
  {
    question: "Give a real‑world API example that uses token bucket rate limiting.",
    shortAnswer: "GitHub API allows 5000 requests per hour (refill rate ≈ 1.38 req/sec) but permits bursting – you can use many requests at once if you have accumulated tokens.",
    explanation: "GitHub’s rate limit uses a token bucket: each request consumes one token. Tokens refill at a rate correlated with the hourly limit. The bucket capacity equals the hourly limit, so you can burst all 5000 at the start.",
    hint: "Think of the `X-RateLimit-*` headers – `limit` = capacity, `remaining` = current tokens.",
    level: "intermediate",
    codeExample: "curl -I https://api.github.com/users/octocat"
  },
  {
    question: "Can the token bucket algorithm be used for byte‑based (not packet‑based) rate limiting?",
    shortAnswer: "Yes, treat tokens as bytes. Each byte consumes one token. The bucket capacity is in bytes, and refill rate in bytes/sec.",
    explanation: "Byte‑mode token bucket is fairer when packet sizes vary. Many traffic shapers (e.g., Linux `tbf`) support this to limit bandwidth, not just packet rate.",
    hint: "A 1500-byte packet needs 1500 tokens – larger packets drain the bucket faster.",
    level: "intermediate",
    codeExample: "if (tokens >= packet.len) { tokens -= packet.len; forward(); }"
  },
  {
    question: "What is the relationship between token bucket and TCP’s window-based flow control?",
    shortAnswer: "Both are credit‑based mechanisms – tokens (or window) limit how much data can be sent without permission.",
    explanation: "TCP uses a receive window (credit from receiver) and congestion window (credit from network). Token bucket is similar but externally enforced by a shaper.",
    hint: "Window = number of bytes you can send; tokens = number of bytes you can send per time.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How would you implement a distributed token bucket across multiple servers (e.g., for a global API rate limiter)?",
    shortAnswer: "Use a centralised Redis instance with atomic increments and Lua scripts to update tokens and refill based on time.",
    explanation: "Each request calls a Lua script that reads `last_refill`, calculates tokens added, updates, and decrements if enough tokens. Redis ensures atomicity. An alternative is the 'leaky bucket as a meter' with sliding windows.",
    hint: "Redis + Lua is the industry standard for rate limiting (e.g., `--strict` mode in `rate limit` libraries).",
    level: "expert",
    codeExample: "local tokens = redis.call('hget', key, 'tokens') ... -- atomic consume and refill"
  },
  {
    question: "What is the maximum burst duration in a token bucket?",
    shortAnswer: "Burst duration = capacity / rate (assuming you start full and send at line rate).",
    explanation: "If you start with `capacity` tokens and the link can send at infinitely high speed, you can exhaust the tokens in negligible time. But if you want to sustain a rate higher than `rate`, the duration is limited. More precisely, to send at a constant overdrive rate `R (> rate)`, the burst lasts `capacity / (R - rate)` seconds.",
    hint: "Math: tokens drain at R, refill at rate → net drain = R - rate. Time to empty = capacity / (R - rate).",
    level: "expert",
    codeExample: "burstTimeSec = capacity / (overdriveRate - refillRate);"
  },
  {
    question: "What happens if you set the token bucket capacity to 1 and rate to a very high number?",
    shortAnswer: "It behaves almost like a leaky bucket with a very small queue – essentially a policer that allows 1 packet per refill interval.",
    explanation: "With capacity = 1, you cannot store more than 1 token. The maximum burst is 1 packet, so you effectively limit the packet rate to the refill rate, but without any buffering.",
    hint: "Tiny bucket → no burst, just a strict rate limiter.",
    level: "intermediate",
    codeExample: "capacity = 1; rate = 1000; // allows 1000 packets/sec but never bursts >1"
  },
  {
    question: "Explain how the token bucket refill is usually implemented without a dedicated background thread.",
    shortAnswer: "On each packet arrival, compute elapsed time since last refill, add `rate * elapsed` tokens, cap at capacity, then proceed.",
    explanation: "This on‑demand lazy refill avoids a timer. You store `last_refill_time`, and when a packet arrives, you calculate how many tokens should have been added over that period. Then update tokens and `last_refill`.",
    hint: "Time‑based refill – no need for timers, just maths.",
    level: "intermediate",
    codeExample: "let now = Date.now(); let delta = (now - lastRefill) / 1000; tokens = Math.min(capacity, tokens + delta * rate); lastRefill = now;"
  },
  {
    question: "What does the Linux kernel's `tbf` qdisc stand for and what does it do?",
    shortAnswer: "Token Bucket Filter – it shapes traffic using a token bucket algorithm.",
    explanation: "`tbf` is a queuing discipline in Linux that limits bandwidth to a specified rate, with a configurable burst (bucket size) and latency (maximum delay). It is commonly used with `tc` (traffic control).",
    hint: "`tc qdisc add dev eth0 root tbf rate 1mbit burst 32kbit latency 400ms`",
    level: "expert",
    codeExample: "tc qdisc add dev eth0 root tbf rate 10mbit burst 20kb latency 50ms"
  },
  {
    question: "How does token bucket handle packet queues when tokens are exhausted?",
    shortAnswer: "It either drops the packet (policing) or queues it (shaping) until enough tokens refill.",
    explanation: "In shaping mode, the packet sits in a separate FIFO queue. When tokens become available, the scheduler dequeues a packet and sends it. This adds variable delay. Policing mode drops immediately, which is simpler but less friendly.",
    hint: "Queue = delay; drop = no delay but loss.",
    level: "intermediate",
    codeExample: "if (shaping && queueLen < maxQueue) { enqueue; } else if (!shaping) { drop; }"
  },
  {
    question: "What is a common beginner mistake when implementing a token bucket?",
    shortAnswer: "Using an integer token count and losing fractional tokens due to time truncation.",
    explanation: "If refill rate is 1.5 tokens/sec and you only check every second, you lose the 0.5 token. Always use floating point or scaled integers (e.g., millitokens) to avoid accumulation errors.",
    hint: "With integer tokens, 0.5 + 0.5 = 0. That's a bug.",
    level: "intermediate",
    codeExample: "let tokens = 0.0; // float, not int"
  },
  {
    question: "Can token bucket be used for outbound rate limiting on a per‑connection basis?",
    shortAnswer: "Yes, each TCP connection or IP flow can have its own token bucket, often called 'per‑flow shaping'.",
    explanation: "Linux `tc` can classify traffic using filters (e.g., by source IP) and attach a `tbf` qdisc to each class, effectively giving each flow its own token bucket.",
    hint: "Combine `tc filter` with `tbf` to shape per‑user, per‑application.",
    level: "expert",
    codeExample: "tc filter add dev eth0 parent 1: protocol ip prio 1 u32 match ip src 192.168.1.100 flowid 1:10"
  },
  {
    question: "What is the effect of a very large token bucket capacity?",
    shortAnswer: "It allows enormous bursts, effectively disabling rate limiting for short durations, but the average rate still converges to the refill rate over long periods.",
    explanation: "A huge bucket can store tokens for days. If a user is idle for a long time, they accumulate a huge token stock, then can send a massive burst later. This may defeat the purpose of limiting peak bandwidth.",
    hint: "Large bucket = you can behave badly occasionally; small bucket = strict smoothing.",
    level: "intermediate",
    codeExample: "capacity = 1_000_000; rate = 1000/sec; // can send 1M packets instantly after being idle for 1000 seconds"
  },
  {
    question: "How would you test that a token bucket implementation is correct?",
    shortAnswer: "Write unit tests that simulate time passing, send bursts, and verify token counts and packet forward/drop counts match theoretical expectations.",
    explanation: "Mock `current_time()` to advance deterministic steps. For each test case (empty start, full start, partial fill), assert that the number of forwarded packets equals tokens consumed, and that after a long time the average output rate approaches `rate`.",
    hint: "Use a virtual clock; don't rely on real `setTimeout` in tests.",
    level: "expert",
    codeExample: "test('burst from full: sends capacity packets instantly', () => { ... })"
  },
  {
    question: "What is a 'hierarchical token bucket' (HTB)?",
    shortAnswer: "A class‑based queuing discipline that uses token buckets to shape traffic at multiple levels (e.g., per‑user, then per‑application).",
    explanation: "HTB (Hierarchical Token Bucket) is a Linux qdisc that lets you create a tree of token buckets. Each child borrows tokens from its parent under certain rules. It's powerful for ISP and enterprise bandwidth management.",
    hint: "HTB = token buckets that can borrow from each other.",
    level: "expert",
    codeExample: "tc class add dev eth0 parent 1: classid 1:1 htb rate 10mbit"
  },
  {
    question: "Compare token bucket and leaky bucket in terms of delay jitter.",
    shortAnswer: "Token bucket can introduce higher jitter because bursts may be sent back‑to‑back; leaky bucket forces constant pacing, hence lower jitter.",
    explanation: "Token bucket outputs packets in bursts as long as tokens are available, causing gaps between bursts. Leaky bucket outputs at perfectly spaced intervals, giving minimal jitter. Choose token bucket for throughput‑optimized traffic, leaky for jitter‑sensitive applications.",
    hint: "Real‑time voice prefers leaky (low jitter); file download prefers token (higher throughput).",
    level: "expert",
    codeExample: null
  },
  {
    question: "What does 'token bucket as a meter' (RFC 2698) refer to?",
    shortAnswer: "A two‑rate three‑color marker (trTCM) that uses two token buckets to mark packets as green, yellow, or red based on compliance with committed and peak rates.",
    explanation: "RFC 2698 defines a marker that does not queue packets but evaluates a packet against a peak information rate (PIR) and a committed information rate (CIR). It uses two token buckets – one for CIR, one for PIR – to decide color for subsequent dropping or prioritisation.",
    hint: "Two buckets: one for guaranteed rate (green), one for excess but allowed rate (yellow).",
    level: "expert",
    codeExample: "if (packet conforms to CIR) mark green; else if (conforms to PIR) mark yellow; else red"
  },
  {
    question: "Why does the token bucket algorithm not guarantee a bounded delay for a packet?",
    shortAnswer: "Because if the bucket is empty, a packet may wait indefinitely (in shaping mode) until tokens refill, which could be a long time if the rate is low.",
    explanation: "Leaky bucket has a fixed output rate, so maximum delay is capacity/rate. Token bucket in shaping mode can have arbitrarily long delays if the token refill rate is extremely low and the packet arrives after a long idle period (no tokens accumulated).",
    hint: "Imagine rate = 1 token/hour. A packet arrives just after a token was used – it waits nearly an hour.",
    level: "expert",
    codeExample: null
  },
  {
    question: "In the context of REST API rate limiting, what are typical HTTP headers used to convey token bucket state?",
    shortAnswer: "`X-RateLimit-Limit` (capacity), `X-RateLimit-Remaining` (tokens left), `X-RateLimit-Reset` (time until full refill).",
    explanation: "These headers are standardised in many APIs (GitHub, Twitter, Stripe). The `Reset` time corresponds to when the bucket would be full again assuming no consumption.",
    hint: "Limit = bucket capacity; Remaining = current tokens; Reset = Unix timestamp.",
    level: "intermediate",
    codeExample: "X-RateLimit-Limit: 5000\nX-RateLimit-Remaining: 4995\nX-RateLimit-Reset: 1700000000"
  },
  {
    question: "What happens if the token bucket's refill rate is higher than the physical link speed?",
    shortAnswer: "The bucket will fill up quickly but the link’s own queue will become the bottleneck. Tokens are irrelevant once the link is saturated – the real constraint becomes the hardware.",
    explanation: "If the token rate exceeds the link’s maximum throughput, the token bucket will always have tokens, so it never limits. The actual output rate will be limited by the link, not the shaper.",
    hint: "Don’t set token rate higher than your NIC’s capacity unless you want the shaper to do nothing.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is 'token bucket with queue limit' (policing with burst tolerance)?",
    shortAnswer: "A variant where the bucket capacity acts as a burst tolerance, but an additional small queue allows a few extra packets to be buffered instead of dropped.",
    explanation: "This hybrid approach gives a little more flexibility than strict policer while bounding latency. After the bucket empties, packets queue until tokens arrive, limited by a queue length.",
    hint: "It's a trade‑off between dropping and delaying.",
    level: "expert",
    codeExample: "if (tokens < needed && queue.size() < maxQueue) { queue packet; } else { drop; }"
  },
  {
    question: "How does token bucket handle packet prioritisation?",
    shortAnswer: "It doesn’t natively prioritise. You need multiple token buckets (one per priority class) and a scheduler that serves classes based on priority/tokens.",
    explanation: "For example, high‑priority traffic gets its own token bucket with a higher rate and capacity. A scheduler (like DRR or WFQ) then selects packets from the highest priority class that has tokens.",
    hint: "One bucket per class → separate burst and rate allowances.",
    level: "expert",
    codeExample: "class VoiceBucket extends TokenBucket { rate=64kbps; capacity=8KB; }"
  },
  {
    question: "What are the memory and performance implications of a software token bucket implementation?",
    shortAnswer: "Negligible if done with simple arithmetic (add, compare, assign). No dynamic allocations per packet. O(1) per packet if no queuing; O(queue length) if shaping with a queue.",
    explanation: "A token bucket uses a few integers/floats and a timestamp. Per‑packet cost is a few CPU cycles. If shaping queues are used, there is memory overhead per queued packet.",
    hint: "Very cheap; can run at line rate on commodity hardware.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Why is token bucket often preferred over leaky bucket for web API rate limiting?",
    shortAnswer: "Because web traffic is naturally bursty (page loads, AJAX calls) and users expect occasional fast responses. Token bucket allows those bursts while still enforcing a fair average usage.",
    explanation: "Leaky bucket would throttle each request to a fixed interval, making a page that needs 10 resources take 10× the interval – poor UX. Token bucket lets the 10 resources go out almost together if tokens are available.",
    hint: "Web users want ‘now’ not ‘smooth’.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Explain how the concept of ‘credit’ in the token bucket relates to network economics.",
    shortAnswer: "Tokens act as credits that accumulate during idle periods (paying for future bursts). This maps to ‘use it or lose it’ vs ‘rollover’ data plans in mobile networks.",
    explanation: "Some mobile plans allow unused data (tokens) to roll over to the next month – that’s exactly token bucket with capacity = total rollover limit. Refill rate is the monthly allowance, and unused tokens accumulate up to capacity.",
    hint: "Rollover data = token bucket with large capacity.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the worst‑case scenario for a token bucket shaper regarding bufferbloat?",
    shortAnswer: "When the bucket capacity is large and the refill rate is small, a sudden burst can fill the downstream queue, causing bufferbloat and high latency.",
    explanation: "If the shaper releases a burst of packets at line rate, the next hop router may have a large FIFO queue, leading to long delays. To prevent this, combine token bucket with active queue management (AQM) like CoDel.",
    hint: "Bursts shift the delay to the next router – not eliminated, just relocated.",
    level: "expert",
    codeExample: "tc qdisc add dev eth0 root handle 1: htb default 30\n... and use fq_codel on leaf classes."
  }
];

export default questions;