const questions = [
  {
    question: "What is network congestion?",
    shortAnswer: "A state where the offered traffic load exceeds the available capacity of a network link or node, causing queuing, delay, and packet loss.",
    explanation: "Congestion is dynamic – even a high‑speed link can become congested if too many flows send data simultaneously. It's like a highway that can handle 100 cars/minute but 150 arrive – a traffic jam forms.",
    hint: "Too many packets chasing too little bandwidth.",
    level: "basic",
    codeExample: "if (arrival_rate > service_rate) → congestion"
  },
  {
    question: "What are three visible symptoms of network congestion?",
    shortAnswer: "Increased packet delay, packet loss, and reduced throughput.",
    explanation: "Delays grow as queues lengthen. When queues overflow, packets are dropped. Throughput drops because of loss and retransmissions, and TCP reduces its window. The user experiences sluggishness.",
    hint: "Think of a website loading slowly, or a video buffering.",
    level: "basic",
    codeExample: "ping google.com → high RTT or packet loss indicates possible congestion."
  },
  {
    question: "Why does congestion cause packet loss even though routers have buffers?",
    shortAnswer: "Buffers are finite; when the queue fills completely, any new packet must be dropped (tail drop).",
    explanation: "Routers have limited memory. If the arrival rate is persistently higher than the output rate, the queue will eventually reach its maximum size. After that, every incoming packet is dropped until the queue drains.",
    hint: "A parking lot with 100 spaces – the 101st car is turned away.",
    level: "basic",
    codeExample: "if (queue_length >= max_queue) { drop(packet); }"
  },
  {
    question: "What is the difference between congestion and a slow link?",
    shortAnswer: "A slow link has inherently low capacity; congestion occurs when demand temporarily exceeds available capacity, even on fast links.",
    explanation: "A 10 Mbps link is always ‘slow’ relative to 1 Gbps. But a 1 Gbps link can become congested during a DDoS attack or when many users download huge files simultaneously. Congestion is a load‑dependent condition, not a fixed property.",
    hint: "Slow link = narrow pipe. Congestion = too much water for the pipe's current size.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How does TCP detect congestion?",
    shortAnswer: "Via packet loss (timeout or duplicate ACKs) and, optionally, via Explicit Congestion Notification (ECN).",
    explanation: "TCP assumes loss is caused by congestion. It uses retransmission timeout (RTO) or three duplicate ACKs to infer a lost segment. With ECN, routers mark packets instead of dropping them, and TCP reduces its rate.",
    hint: "Loss = congestion signal (even if not always true).",
    level: "intermediate",
    codeExample: "if (dupacks >= 3) { fast_retransmit(); congestion_avoidance(); }"
  },
  {
    question: "What is ‘congestion collapse’?",
    shortAnswer: "A state where increasing load leads to a sharp decrease in useful throughput, often due to retransmissions of lost packets consuming most of the bandwidth.",
    explanation: "When routers drop packets, senders retransmit, causing even more load. At extreme, the network is 90% retransmissions and 10% new data, so effective throughput plummets. This happened in early Internet (congestion collapse of 1986).",
    hint: "Each lost packet is sent multiple times – waste multiplies.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Name three TCP congestion control algorithms.",
    shortAnswer: "Tahoe (slow start, fast retransmit), Reno (fast recovery), Cubic (default on Linux), BBR (Bottleneck Bandwidth and RTT).",
    explanation: "Tahoe introduced basic mechanisms. Reno added fast recovery. Cubic is optimised for high‑speed long‑distance networks. BBR uses a model of the bottleneck instead of loss events.",
    hint: "Check with `sysctl net.ipv4.tcp_congestion_control` on Linux.",
    level: "advanced",
    codeExample: "sysctl -w net.ipv4.tcp_congestion_control=bbr"
  },
  {
    question: "What is ‘bufferbloat’ and why is it harmful?",
    shortAnswer: "Excessively large buffers in routers cause high latency without preventing loss, especially for interactive traffic.",
    explanation: "Bufferbloat occurs when manufacturers put huge memory in routers. When congested, the queue grows very long, adding seconds of delay (e.g., ping > 500 ms). This hurts real‑time apps, even though TCP might avoid loss.",
    hint: "Large buffer = long waiting line, not necessarily fewer dropped packets.",
    level: "intermediate",
    codeExample: "ping -c 10 8.8.8.8 → if RTT spikes under load, suspect bufferbloat."
  },
  {
    question: "How can ECN (Explicit Congestion Notification) help?",
    shortAnswer: "ECN allows routers to mark packets when queue length exceeds a threshold, instead of dropping them. Receivers echo the mark to senders, which then slow down.",
    explanation: "ECN avoids unnecessary retransmissions and reduces latency. It requires both endpoints and routers to support it. TCP uses `ECE` and `CWR` flags. It's more cooperative than drop‑based signals.",
    hint: "Mark, don't drop – like a yellow warning light before the red light.",
    level: "advanced",
    codeExample: "sysctl -w net.ipv4.tcp_ecn=1"
  },
  {
    question: "What is the relationship between queuing delay and congestion?",
    shortAnswer: "Queuing delay increases as congestion worsens; it’s a direct indicator of the amount of excess traffic.",
    explanation: "When the arrival rate is less than service rate, queues are empty and delay minimal. When arrival exceeds service, queue grows, and delay = queue_length / service_rate. A spike in RTT indicates congestion forming.",
    hint: "Measure RTT – if it goes from 20ms to 200ms, you’re congested.",
    level: "intermediate",
    codeExample: "delay = (queue_packets * avg_pkt_size) / link_speed"
  },
  {
    question: "What is the ‘power’ or ‘load factor’ in congestion models?",
    shortAnswer: "Power = throughput / delay. It is maximised when the link is slightly loaded but not congested.",
    explanation: "This metric, used by Kleinrock, balances throughput and delay. Too little load gives low throughput; too much load increases delay dramatically, reducing power. Optimal operation is at the knee of the load‑delay curve.",
    hint: "Don't fill the link 100% – a small idle period helps keep delays low.",
    level: "expert",
    codeExample: "power = goodput / RTT"
  },
  {
    question: "How does a DDoS attack cause congestion?",
    shortAnswer: "Attackers send a massive volume of traffic (e.g., UDP floods) that saturates the victim’s link or router, causing legitimate packets to be dropped.",
    explanation: "The attack traffic itself may be garbage, but it consumes all buffer space and link capacity. Congestion appears as if the network is overloaded by legitimate users, but the cause is malicious.",
    hint: "A ‘traffic jam’ created by fake cars blocking the road.",
    level: "intermediate",
    codeExample: "hping3 --flood --udp target"
  },
  {
    question: "What is the difference between congestion control and flow control?",
    shortAnswer: "Congestion control prevents network overload (many flows). Flow control prevents a fast sender from overwhelming a slow receiver (end‑to‑end).",
    explanation: "TCP uses flow control via the `rwnd` (receive window) – it's about the receiver's buffer. Congestion control uses `cwnd` (congestion window) – it's about the network path. Both are necessary.",
    hint: "Flow = receiver can't keep up. Congestion = network can't keep up.",
    level: "intermediate",
    codeExample: "rwnd: from receiver; cwnd: from loss/ECN signals"
  },
  {
    question: "Explain the concept of ‘congestion window’ (cwnd) in TCP.",
    shortAnswer: "The congestion window limits how many unacknowledged bytes a sender can have in flight, based on perceived network capacity.",
    explanation: "TCP estimates the available capacity and sets `cwnd`. In slow start, `cwnd` doubles per RTT until a loss; then it enters congestion avoidance (additive increase). `cwnd` is distinct from the receive window.",
    hint: "It's the sender's throttle – cannot be larger than the bottleneck's capacity × RTT.",
    level: "intermediate",
    codeExample: "flight_size = min(cwnd, rwnd)"
  },
  {
    question: "What is the ‘bandwidth‑delay product’ (BDP) and why is it important?",
    shortAnswer: "BDP = link capacity × RTT. It is the amount of data ‘in flight’ needed to fully utilise the link.",
    explanation: "To saturate a high‑bandwidth, high‑RTT link (e.g., satellite), you need a large window. If `cwnd` < BDP, the link is underutilised. If `cwnd` > BDP, queues grow. BDP guides buffer sizing.",
    hint: "Big pipe + long distance = need big window.",
    level: "expert",
    codeExample: "bdp_bytes = bandwidth_bps * rtt_seconds"
  },
  {
    question: "How does `tc` (traffic control) in Linux emulate congestion?",
    shortAnswer: "By adding latency, packet loss, and limited bandwidth using qdiscs like `netem` and `tbf`.",
    explanation: "Developers use `tc` to test applications under congestion: `netem delay 200ms`, `loss 5%`, `rate 1mbit`. This mimics a congested link without needing physical infrastructure.",
    hint: "`tc qdisc add dev eth0 root netem delay 200ms loss 2%`",
    level: "expert",
    codeExample: "tc qdisc add dev eth0 root netem delay 400ms 100ms distribution normal loss 3%"
  },
  {
    question: "What is ‘Active Queue Management’ (AQM) and name one algorithm.",
    shortAnswer: "AQM proactively drops or marks packets before the queue overflows, to keep queue lengths short. Example: Random Early Detection (RED), CoDel, PIE.",
    explanation: "Traditional tail drop causes global synchronisation and lockouts. RED drops probabilistically as queue grows. CoDel (controlled delay) measures queue delay and drops when delay exceeds target.",
    hint: "AQM = keep queues tiny, signal congestion early.",
    level: "expert",
    codeExample: "tc qdisc add dev eth0 root codel target 5ms interval 100ms"
  },
  {
    question: "What are ‘TCP global synchronisation’ and how does RED mitigate it?",
    shortAnswer: "Tail drop causes many flows to lose packets simultaneously, then all restart slow start together, causing periodic sawtooth patterns. RED randomises drops, so flows desynchronise.",
    explanation: "When a tail‑drop queue overflows, all active TCP flows may lose a packet at the same time, leading to synchronised rate reductions. RED drops early and randomly, spreading losses across flows and time, smoothing overall throughput.",
    hint: "Tail drop = all cars hit the red light together. RED = random red lights.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How does congestion affect real‑time applications (VoIP, video conferencing)?",
    shortAnswer: "Increased delay and jitter cause voice chops, video freezes, and eventual session disconnection if delay exceeds tolerance.",
    explanation: "Real‑time traffic cannot wait long. Congestion introduces variable delay (jitter) and loss. Playback buffers underrun or overrun, degrading quality. RTP/RTCP and adaptive codecs try to compensate but are limited.",
    hint: "VoIP needs delay &lt; 150ms – congestion quickly kills it.",
    level: "intermediate",
    codeExample: "if (jitter > 100ms) → audio artifacts"
  },
  {
    question: "What is the ‘knee’ and ‘cliff’ in congestion control theory?",
    shortAnswer: "The knee is the point where throughput stops increasing linearly with load; the cliff is where throughput collapses due to congestion (heavy loss).",
    explanation: "Up to the knee, delay is low and throughput increases. Beyond the knee, delay grows faster, but throughput may still rise slowly. At the cliff, throughput drops sharply because retransmissions consume most of the capacity.",
    hint: "Stay near the knee, avoid the cliff.",
    level: "expert",
    codeExample: null
  },
  {
    question: "Can congestion occur on a local area network (Ethernet)?",
    shortAnswer: "Yes, if many devices communicate through a single switch port (oversubscription) or using half‑duplex collisions.",
    explanation: "Even a 1 Gbps switch can congest if 10 servers each try to push 200 Mbps to one server. The switch buffers packets, causing delays and potential drops. Also, Wi‑Fi is inherently shared and often congested in apartment blocks.",
    hint: "LAN is not immune – the bottleneck can be inside your own network.",
    level: "intermediate",
    codeExample: "iperf3 -c server -P 10 → may show packet loss on a 1G link"
  },
  {
    question: "What is ‘congestion pricing’ in network economics?",
    shortAnswer: "Charging users based on usage during peak times to discourage excessive demand, similar to toll roads.",
    explanation: "ISPs could charge higher rates during busy hours. This aligns with token bucket refill rate being the ‘average price’. In practice, ISPs use traffic shaping rather than explicit pricing.",
    hint: "Pay more to use the highway at rush hour.",
    level: "expert",
    codeExample: null
  },
  {
    question: "How does QUIC protocol handle congestion differently from TCP?",
    shortAnswer: "QUIC implements congestion control in user space (similar to TCP’s algorithms) but with finer granularity and no head‑of‑line blocking due to multiple streams.",
    explanation: "QUIC uses `Cubic` or `BBR` but runs over UDP. Each stream is independent; loss on one stream does not block others. This improves performance under congestion, especially for web pages with many objects.",
    hint: "QUIC = TCP+TLS+HTTP/2 minus HOL blocking.",
    level: "expert",
    codeExample: "// QUIC's cwnd is managed per connection, not per stream."
  },
  {
    question: "What is ‘fairness’ in congestion control and why is it hard?",
    shortAnswer: "Fairness means each flow gets an equal share of the bottleneck bandwidth. It is hard because flows start at different times, have different RTTs, and may use different algorithms.",
    explanation: "TCP Reno approximates fairness (converges to equal shares) if RTTs are similar. But a flow with shorter RTT gets more bandwidth. Cubic and BBR aim for better fairness but are not perfect.",
    hint: "A short‑RTT flow grabs bandwidth faster – ‘RTT unfairness’.",
    level: "expert",
    codeExample: "Two flows sharing 10 Mbps: ideally each gets 5 Mbps."
  },
  {
    question: "What is ‘exponential backoff’ and where is it used in congestion avoidance?",
    shortAnswer: "After a timeout, TCP doubles the retransmission timer (exponential backoff) to reduce load before retrying.",
    explanation: "When a packet is lost and no duplicate ACKs arrive, TCP waits for RTO. RTO starts as 1 second, then 2, 4, 8... This gives the network time to clear congestion. Without backoff, repeated retransmissions would worsen overload.",
    hint: "Wait longer each time you don’t hear back – prevents flooding.",
    level: "intermediate",
    codeExample: "rto = min(rto * 2, max_rto);"
  },
  {
    question: "Why does high bandwidth‑delay product (BDP) networks require special congestion control?",
    shortAnswer: "Standard TCP window grows too slowly; it may take a long time to fill the pipe, leaving bandwidth unused.",
    explanation: "On a 10 Gbps link with 100 ms RTT, BDP = 125 MB. TCP’s additive increase would take ages to reach that window. High‑speed variants like Cubic, H-TCP, or BBR are designed to ramp up faster.",
    hint: "Big window needs a faster growth function than +1 MSS per RTT.",
    level: "expert",
    codeExample: "Cubic uses cubic function instead of linear."
  },
  {
    question: "What is ‘congestion window validation’?",
    shortAnswer: "A mechanism to determine if the congestion window still reflects network capacity after a period of idleness.",
    explanation: "If a TCP connection is idle for a while, the network conditions might have changed. The sender reduces `cwnd` progressively after idle periods to test the path again (slow start or rapid reduction).",
    hint: "Don't assume old cwnd is safe after being silent for minutes.",
    level: "expert",
    codeExample: "if (idle > RTO) cwnd = max(4*MSS, cwnd/2)"
  },
  {
    question: "How does a ‘congestion collapse’ differ from ordinary congestion?",
    shortAnswer: "Ordinary congestion reduces throughput but some data gets through; collapse reduces useful throughput near zero despite high load.",
    explanation: "In collapse, retransmissions consume almost all bandwidth. A classic example is early Internet with retransmissions causing 1000x waste. Modern TCP’s congestion control prevents full collapse but still suffers some inefficiency.",
    hint: "Collapse = the network is a loop of retransmissions.",
    level: "expert",
    codeExample: null
  },
  {
    question: "What is the role of ‘explicit congestion notification’ (ECN) in data centres?",
    shortAnswer: "ECN enables low‑latency, lossless fabric by marking packets when queue length exceeds a threshold, allowing end hosts to react before drops occur.",
    explanation: "Data centre TCP (DCTCP) uses ECN marks to adjust windows more finely, keeping queues very short (microseconds). This reduces tail latency for partition‑aggregate workloads.",
    hint: "DCTCP + ECN = low latency, high utilisation.",
    level: "expert",
    codeExample: "sysctl -w net.ipv4.tcp_dctcp_enable=1"
  },
  {
    question: "Name a tool that can measure network congestion from an end host.",
    shortAnswer: "`iperf3`, `nuttcp`, `ping`, `mtr`, or `tcpdump` with analysis of RTT and loss.",
    explanation: "`iperf3` can stress a link and report loss and retransmissions. `ping` shows RTT and loss trends. `mtr` combines ping and traceroute. `tcpdump` captures TCP traces to analyse cwnd evolution.",
    hint: "`iperf3 -c server -p 5201 -l 1400 -t 30 -i 1`",
    level: "intermediate",
    codeExample: "mtr --report google.com"
  }
];

export default questions;