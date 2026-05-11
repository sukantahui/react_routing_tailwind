// topic1_files/topic1_questions.js
// 30 questions covering MQTT, CoAP, publish/subscribe, QoS, lightweight protocols, IoT network constraints.

const questions = [
  {
    question: "What is MQTT and what problem does it solve?",
    shortAnswer: "A lightweight publish/subscribe messaging protocol for constrained devices and low-bandwidth, high-latency networks.",
    explanation: "MQTT reduces network overhead (2‑byte fixed header) and decouples publishers from subscribers via a broker.",
    hint: "Think of a newspaper subscription: publisher produces, broker distributes, subscribers receive.",
    level: "basic",
    codeExample: "mosquitto_pub -t 'sensors/temp' -m '23.5'"
  },
  {
    question: "Explain the three QoS levels in MQTT.",
    shortAnswer: "QoS 0 (at most once), QoS 1 (at least once), QoS 2 (exactly once).",
    explanation: "QoS 0 – fire and forget; QoS 1 – sender stores packet until ACK; QoS 2 – four‑part handshake ensures no duplication.",
    hint: "Higher QoS = more network overhead and latency.",
    level: "intermediate",
    codeExample: "mosquitto_pub -q 1 -t 'cmd' -m 'reboot'"
  },
  {
    question: "What is a retained message in MQTT?",
    shortAnswer: "A message stored by the broker and sent to any new subscriber immediately after subscribing.",
    explanation: "Useful for state: e.g., last known temperature, door lock status. Only one retained message per topic.",
    hint: "New subscribers get the 'latest value' without waiting for a new publication.",
    level: "basic",
    codeExample: "mosquitto_pub -r -t 'light/status' -m 'ON'"
  },
  {
    question: "What is the purpose of MQTT's 'Last Will and Testament' (LWT)?",
    shortAnswer: "Broker automatically publishes a predefined message if the client disconnects unexpectedly.",
    explanation: "Other clients can detect device failure without polling. The LWT message is stored by broker at connection time.",
    hint: "A way to say 'I died' to all subscribers.",
    level: "intermediate",
    codeExample: "CONNECT packet includes Will Topic and Will Message."
  },
  {
    question: "How does CoAP differ from HTTP?",
    shortAnswer: "CoAP uses UDP instead of TCP, has 4‑byte header, and built‑in support for multicast and resource discovery.",
    explanation: "CoAP is designed for microcontroller IP stacks (6LoWPAN) while HTTP is heavy for IoT.",
    hint: "HTTP over UDP with lightweight semantics.",
    level: "basic",
    codeExample: "coap://[fe80::1]/.well-known/core"
  },
  {
    question: "What is CoAP Observe?",
    shortAnswer: "An extension that allows a client to 'watch' a resource and receive asynchronous updates when it changes.",
    explanation: "Similar to MQTT subscription but over CoAP's request/response model. Reduces polling frequency.",
    hint: "The server pushes notifications to clients that registered an Observe.",
    level: "intermediate",
    codeExample: "GET coap://sensor/temp (Observe: 0) → then 2.05 Content with new value each change."
  },
  {
    question: "Explain CoAP Blockwise transfer.",
    shortAnswer: "Splits large payloads into multiple blocks to fit within UDP MTU (typically 1280 bytes).",
    explanation: "CoAP uses block1/block2 options to negotiate block size and reassemble on receiver.",
    hint: "Needed for sending firmware images or large JSON over 6LoWPAN.",
    level: "expert",
    codeExample: "POST /firmware (Content-Format: 50, Block2: 0/128/128)"
  },
  {
    question: "Why is MQTT over TCP not always ideal for very low-power wireless networks?",
    shortAnswer: "TCP's three‑way handshake and congestion control add overhead; MQTT also requires a persistent TCP connection, which drains battery.",
    explanation: "For devices that sleep most of the time, CoAP over UDP (with non‑confirmable messages) or MQTT‑SN (with sleep‑aware broker) is better.",
    hint: "TCP keepalive and retransmission waste energy.",
    level: "expert",
    codeExample: "MQTT‑SN uses a gateway and allows device to sleep between publishes."
  },
  {
    question: "What is the difference between MQTT topic wildcards '+' and '#'?",
    shortAnswer: "'+' matches exactly one hierarchy level, '#' matches zero or more levels and must be the last character.",
    explanation: "Example: 'sensors/+/temperature' matches 'sensors/room1/temperature' but not 'sensors/room1/floor2/temperature'. '#' catches everything below.",
    hint: "Treat '#' carefully – can subscribe to many topics.",
    level: "intermediate",
    codeExample: "SUBSCRIBE 'house/#' → receives 'house/living/temp', 'house/kitchen/humidity'."
  },
  {
    question: "How can you secure MQTT traffic?",
    shortAnswer: "Use TLS (MQTT over TLS, port 8883) for encryption and authentication via certificates or username/password.",
    explanation: "Also consider client ID verification, ACLs on broker, and VPN for additional layers.",
    hint: "Never send credentials in plaintext over public networks.",
    level: "intermediate",
    codeExample: "mosquitto_sub --cafile ca.crt --cert client.crt --key client.key"
  },
  {
    question: "What is CoAP's token and why is it important?",
    shortAnswer: "A token is a correlation ID (0‑8 bytes) used to match requests to responses, since UDP is asynchronous.",
    explanation: "Multiple requests can be outstanding; token tells which response belongs to which request.",
    hint: "Without token, the client cannot disambiguate simultaneous requests.",
    level: "expert",
    codeExample: "GET /sensors (Token: 0x7a) → Response with same token."
  },
  {
    question: "Explain MQTT's 'Clean Session' flag.",
    shortAnswer: "If 1 (clean), the broker discards any previous session and subscriptions when client disconnects. If 0 (persistent), broker stores subscriptions and queued messages for offline client.",
    explanation: "Use persistent sessions for devices that disconnect regularly but want to receive messages while offline.",
    hint: "Clean session = no memory; Persistent = remember me.",
    level: "intermediate",
    codeExample: "Connect with clean session = 0, then disconnect; next connection resumes subscriptions."
  },
  {
    question: "What are the common MQTT broker implementations?",
    shortAnswer: "Mosquitto (lightweight), EMQX (clustering, rule engine), HiveMQ (enterprise), VerneMQ (distributed).",
    explanation: "Choice depends on scale, persistence, and plugin needs.",
    hint: "Mosquitto is excellent for learning and small projects.",
    level: "basic",
    codeExample: "sudo apt install mosquitto mosquitto-clients"
  },
  {
    question: "How does CoAP handle reliability when using non-confirmable messages?",
    shortAnswer: "No ACK or retransmission; messages may be lost silently. Application layer must handle if needed.",
    explanation: "Non-confirmable is like UDP – best for periodic sensor readings where occasional loss is acceptable.",
    hint: "Use confirmable (CON) for critical commands, non‑confirmable (NON) for telemetry.",
    level: "intermediate",
    codeExample: "CoAP request with CON flag set → expect ACK or retransmit."
  },
  {
    question: "What is a CoAP proxy and why needed?",
    shortAnswer: "Translates between CoAP and HTTP so web clients can access CoAP resources.",
    explanation: "HTTP client sends GET to proxy; proxy forwards as CoAP GET, converts response back.",
    hint: "Bridge the legacy web with IoT.",
    level: "expert",
    codeExample: "coap://californium.eclipseprojects.io/proxy?uri=coap://sensor.local/temp"
  },
  {
    question: "Explain MQTT's maximum packet size limitations.",
    shortAnswer: "The fixed header is 2-4 bytes, variable header and payload sizes are limited by the broker configuration (default often ~256KB).",
    explanation: "Large payloads can cause fragmentation or broker rejection. Keep small.",
    hint: "For large files, use external transfer with a URL inside MQTT message.",
    level: "basic",
    codeExample: "mosquitto.conf: max_packet_size 65535"
  },
  {
    question: "What is CoAP's content-format and where is it defined?",
    shortAnswer: "A number indicating media type, e.g., 0 for text/plain, 50 for application/json, 41 for CBOR.",
    explanation: "Similar to HTTP Content-Type header, defined in CoAP Content-Format Registry.",
    hint: "Always set content-format so receiver can parse.",
    level: "intermediate",
    codeExample: "Content-Format: 50 → JSON payload."
  },
  {
    question: "How to achieve exactly‑once delivery in CoAP?",
    shortAnswer: "Use confirmable messages (CON) with unique token and application‑layer deduplication.",
    explanation: "CoAP resends CON until ACK, but might generate duplicates if ACK lost; client must check token and message ID.",
    hint: "Exactly‑once is not built‑in; you must combine caching and idempotency.",
    level: "expert",
    codeExample: "Server stores last processed token; reject duplicates."
  },
  {
    question: "What is MQTT‑SN (Sensor Network) and how is it different?",
    shortAnswer: "MQTT for non‑TCP networks (ZigBee, LoRa). Uses a gateway to translate to MQTT. Supports device sleeping and shorter headers.",
    explanation: "MQTT‑SN removes TCP dependency, reduces overhead further, and adds 'WILL' topic update on sleep.",
    hint: "Designed for battery‑powered sensors that cannot maintain TCP.",
    level: "expert",
    codeExample: "MQTT‑SN gateway forwards to MQTT broker over TCP."
  },
  {
    question: "In a smart home with both MQTT and CoAP devices, how can they interoperate?",
    shortAnswer: "Use a protocol bridge (e.g., Eclipse Hono, Node‑RED) that translates MQTT pub/sub to CoAP requests and vice versa.",
    explanation: "The bridge subscribes to MQTT topics, converts to CoAP, sends to devices, and handles responses.",
    hint: "Standardise on a common data model (e.g., JSON or CBOR).",
    level: "expert",
    codeExample: "Node‑RED: MQTT input node → function → CoAP request node."
  },
  {
    question: "What is the default port for MQTT over TLS and CoAP over DTLS?",
    shortAnswer: "MQTT over TLS: 8883; CoAP over DTLS: 5684.",
    explanation: "Standard ports help firewalls and discovery.",
    hint: "Non‑secure MQTT: 1883; CoAP: 5683.",
    level: "basic",
    codeExample: "docker run -p 8883:8883 eclipse-mosquitto"
  },
  {
    question: "Explain MQTT keep alive and its relationship with 'pingreq'.",
    shortAnswer: "Keep alive is the maximum time broker waits for any message from client before disconnecting. Client must send PINGREQ within that interval.",
    explanation: "Used to detect half‑open TCP connections and keep NAT bindings alive.",
    hint: "Set keep alive slightly lower than your firewall idle timeout.",
    level: "intermediate",
    codeExample: "Connect with keep alive = 60; every 50 seconds, client sends PINGREQ."
  },
  {
    question: "How does CoAP Observe reduce network traffic compared to polling?",
    shortAnswer: "Instead of constant GET requests (polling), Observe sends one request and the server pushes updates when resource changes.",
    explanation: "For slowly changing sensors, this cuts bandwidth and battery usage drastically.",
    hint: "Push not poll; only send when needed.",
    level: "intermediate",
    codeExample: "GET /temperature (Observe: 0) → server sends 2.05 with value, then later sends another 2.05 on change."
  },
  {
    question: "What is the purpose of MQTT's 'Client ID'?",
    shortAnswer: "A unique identifier for each client connecting to a broker. Used for session persistence and logging.",
    explanation: "Two clients with same client ID will cause disconnection of the previous (depending on broker config).",
    hint: "Generate unique IDs (e.g., MAC address + random).",
    level: "basic",
    codeExample: "mosquitto_sub -i 'sensor_kitchen_01' -t '#'"
  },
  {
    question: "Explain CoAP's 'Multicast' support and when to use it.",
    shortAnswer: "CoAP can send requests to multicast addresses (e.g., ff02::fd) for service discovery or simultaneous update of many devices.",
    explanation: "Multicast reduces network load when you need to command all lights off. Responses are typically omitted or unicast.",
    hint: "Use All CoAP Nodes multicast address: ff02::fd.",
    level: "expert",
    codeExample: "coap://[ff02::fd]/.well-known/core → discovers all CoAP devices."
  },
  {
    question: "What are the limitations of MQTT for real‑time high‑frequency data?",
    shortAnswer: "Broker‑based introduces latency (one hop), and QoS 2 overhead is high. UDP‑based protocols like MQTT‑SN or raw CoAP are faster.",
    explanation: "For millisecond‑level control (industrial), consider DDS (Data Distribution Service) or Zenoh.",
    hint: "MQTT is great for telemetry, not real‑time deterministic.",
    level: "expert",
    codeExample: "Zenoh builds on MQTT but adds flow control and real‑time pub/sub."
  },
  {
    question: "What is the difference between CoAP request codes 0.01 (GET) and 0.02 (POST) in practice?",
    shortAnswer: "GET is idempotent, used for reading resources without side effects. POST creates or updates a subordinate resource.",
    explanation: "CoAP follows REST principles: GET safe, POST not safe. Use GET for observation.",
    hint: "Use POST to send commands that change state.",
    level: "intermediate",
    codeExample: "POST /lights → { 'room': 'living', 'state': 'ON' }"
  },
  {
    question: "How do you handle MQTT broker clustering for high availability?",
    shortAnswer: "Use a distributed broker like EMQX, VerneMQ, or HiveMQ with clustering. They share session state and topic trees.",
    explanation: "Clustering allows load balancing and failover. Some use a bridge configuration to connect multiple brokers.",
    hint: "Shared subscriptions help distribute messages among multiple consumer instances.",
    level: "expert",
    codeExample: "EMQX cluster of 3 nodes with load balancer in front."
  },
  {
    question: "Explain the CoAP response code 4.04 (Not Found) and how to differentiate from empty resources.",
    shortAnswer: "4.04 means the resource path does not exist. Empty payload with 2.05 is a valid resource (e.g., empty sensor list).",
    explanation: "Clients must handle 4.04 and 2.05 accordingly.",
    hint: "Always check response code, not only payload length.",
    level: "basic",
    codeExample: "GET /nonexistent → 4.04 Not Found"
  },
  {
    question: "What is the maximum size of a CoAP message over 6LoWPAN?",
    shortAnswer: "Typically 127 bytes (due to IEEE 802.15.4 MTU) after compression; fragmentation is used for larger.",
    explanation: "6LoWPAN uses fragmentation and reassembly; each fragment adds overhead.",
    hint: "Keep CoAP payload under 100 bytes to avoid fragmentation.",
    level: "expert",
    codeExample: "A 200‑byte payload will be split into 2 or more fragments, increasing loss probability."
  }
];

export default questions;