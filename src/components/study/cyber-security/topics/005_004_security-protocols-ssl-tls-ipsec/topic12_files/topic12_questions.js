const questions = [
  {
    id: 1,
    question: "Why is informal pen-and-paper protocol design insufficient for security protocols, and what do Formal Verification Methods achieve?",
    shortAnswer: "Security protocols involve asynchronous message interleavings, race conditions, and active adversary injections that human intuition cannot exhaustively test. Formal Methods translate protocol specifications into mathematical logic (e.g., Applied Pi-Calculus or Multiset Rewriting) and use automated theorem provers to systematically explore all infinite adversary execution paths to mathematically prove security invariants.",
    explanation: "Prominent protocols (such as Needham-Schroeder, SSL 3.0, and SAML) had critical vulnerabilities discovered decades after release because informal analysis failed to account for subtle message replaying and binding flaws.",
    hint: "Formal methods use automated mathematical proof solvers to test all possible attacker actions.",
    level: "Basic",
    codeExample: `// Informal vs Formal Protocol Analysis:
// Informal Testing : "I tried 100 test scenarios in Wireshark and it works." (Leaves millions of race conditions untested!)
// Formal Proof     : Automated ProVerif / Tamarin theorem prover mathematically checks infinite execution trees.`
  },
  {
    id: 2,
    question: "What is the Dolev-Yao Adversary Model (1983) and what core assumptions does it make about the network and cryptography?",
    shortAnswer: "The Dolev-Yao model assumes: 1. The network is completely controlled by the adversary (who can overhear, intercept, forge, delete, replay, and inject arbitrary messages); 2. Cryptographic primitives (encryption, hashing, digital signatures) are treated as perfect mathematical black-boxes (the attacker cannot decrypt without the exact key or forge signatures).",
    explanation: "This allows formal tools to analyze logical protocol flaws without getting bogged down in low-level bitwise mathematics.",
    hint: "The attacker controls the entire network, but cryptography is assumed to be unbreakable without the key.",
    level: "Basic",
    codeExample: `// Dolev-Yao Attacker Capabilities:
// • Overhear (Read any packet on the wire)
// • Intercept (Block/drop packets before delivery)
// • Inject / Forge (Create new packets from known public keys and collected nonces)
// • Replay (Resend past valid packets to trigger race conditions)`
  },
  {
    id: 3,
    question: "What is the difference between 'Weak Agreement' and 'Injective Agreement' in formal authentication proofs?",
    shortAnswer: "Weak Agreement proves that if Alice completes a run believing she communicated with Bob, Bob indeed ran the protocol; Injective Agreement adds the strict mathematical requirement of a 1-to-1 match (each session completed by Alice corresponds to exactly one unique session initiated by Bob), proving complete immunity against replay attacks.",
    explanation: "Injective agreement is the gold standard for authentication, guaranteeing that an attacker cannot replay a past login message to execute a duplicate fund transfer.",
    hint: "Injective agreement guarantees a strict 1-to-1 relationship, preventing replay attacks.",
    level: "Moderate",
    codeExample: `// ProVerif Injective Agreement Query:
// query x:bitstring; inj-event(endB(x)) ==> inj-event(beginA(x)).
// (Proves Bob finishes session x only if Alice started exactly that single session x)`
  },
  {
    id: 4,
    question: "What is Perfect Forward Secrecy (PFS) in formal verification, and how is it mathematically modeled?",
    shortAnswer: "PFS proves that compromising an entity's long-term private identity key at time $T_{compromise}$ does NOT compromise or allow decryption of past ephemeral session keys $K_{session}$ negotiated at time $T_{session} < T_{compromise}$. Formally modeled by giving the adversary the long-term secret key in a post-handshake phase and querying secrecy of the past session key.",
    explanation: "PFS guarantees that even if a server's hard drive is seized by adversaries years later, all historical captured traffic remains mathematically undecryptable.",
    hint: "Past encrypted sessions remain secure even if long-term private keys are compromised in the future.",
    level: "Moderate",
    codeExample: `// Formal PFS Verification Model:
// Phase 0: Alice and Bob negotiate session key K using Ephemeral Diffie-Hellman (g^(xy))
// Phase 1: Attacker receives Long-Term Private Key Sk(A) and Sk(B)
// Query  : not attacker(K) ➔ Proves past session key K remains secret!`
  },
  {
    id: 5,
    question: "What is Post-Compromise Security (PCS / Self-Healing) and how does it differ from Perfect Forward Secrecy (PFS)?",
    shortAnswer: "While PFS protects past communications before a key compromise, PCS protects future communications AFTER a compromise. PCS proves that if an attacker learns an ephemeral session key or state at time $T_1$, future session keys at time $T_2 > T_1$ automatically heal and regain secrecy once legitimate parties exchange new uncompromised entropy.",
    explanation: "PCS is the defining cryptographic breakthrough of the Signal Double Ratchet protocol, ensuring compromised devices automatically recover security.",
    hint: "PFS protects the past; PCS heals and protects the future after a key compromise.",
    level: "Expert",
    codeExample: `// PFS vs PCS Comparison:
// [ Past Sessions ] ───(Protected by PFS)───> [ KEY COMPROMISE ] ───(Healed by PCS)───> [ Future Sessions Secure ]`
  },
  {
    id: 6,
    question: "What is ProVerif and what underlying mathematical formalism does it use to prove protocol security?",
    shortAnswer: "ProVerif (developed by Bruno Blanchet) is an automated cryptographic protocol verifier that models protocols in Applied Pi-Calculus, translates them into a set of first-order Horn Clauses, and uses resolution algorithms to determine whether security properties (secrecy, correspondence assertions, observational equivalence) hold for an unbounded number of sessions.",
    explanation: "If a property fails, ProVerif automatically outputs a human-readable attack trace (counterexample) demonstrating how an attacker can violate security.",
    hint: "An automated protocol verifier based on Applied Pi-Calculus and Horn Clauses.",
    level: "Moderate",
    codeExample: `// ProVerif Model Structure:
// free c: channel.
// type key.
// fun senc(bitstring, key): bitstring.
// reduc forall m: bitstring, k: key; sdec(senc(m, k), k) = m.
// query attacker(secret_data).`
  },
  {
    id: 7,
    question: "What is the Tamarin Prover and why is it particularly suited for complex state-machine protocols (like 5G and Signal)?",
    shortAnswer: "Tamarin Prover models protocols using Multiset Rewriting rules and specifies security properties in First-Order Logic with temporal quantifiers. It natively supports Diffie-Hellman equational theories, associative-commutative operators, and complex global states, visualizing proof trees and counterexamples through an interactive web GUI.",
    explanation: "Tamarin's ability to model mutable global state and explicit time ordering made it the tool of choice for verifying 5G Authentication (AKA) and the TLS 1.3 handshake.",
    hint: "A stateful protocol verifier using multiset rewriting and interactive GUI proof trees.",
    level: "Expert",
    codeExample: `// Tamarin Rule Example:
// rule Client_Send_DH:
//   [ Fr(~x) ]
//   -->
//   [ Out('g'^~x), ClientState(~x) ]`
  },
  {
    id: 8,
    question: "What was Gavin Lowe's classic attack on the Needham-Schroeder Public Key Protocol (1995), and what subtle omission did it exploit?",
    shortAnswer: "The original Needham-Schroeder protocol (1978) lacked an explicit identity binding in Message 2 (`{Na, Nb}_Pk(A)` instead of `{Na, Nb, Bob}_Pk(A)`). Lowe discovered that a malicious insider (Attacker) could take Alice's message, replay it to Bob, and use Alice as an oracle to decrypt Bob's nonce `Nb`, successfully impersonating Alice to Bob.",
    explanation: "This historic breakthrough (discovered using the FDR formal model checker 17 years after the protocol was published) launched the modern era of formal security protocol verification.",
    hint: "Exploited the omission of Bob's identity in the second message, allowing an attacker to impersonate Alice.",
    level: "Expert",
    codeExample: `// Lowe's Attack Fix (Needham-Schroeder-Lowe):
// Message 2 Original (Flawed) : B ➔ A : {Na, Nb}_Pk(A)
// Message 2 Fixed by Lowe     : B ➔ A : {Na, Nb, B}_Pk(A) (Explicitly binds Bob's identity!)`
  },
  {
    id: 9,
    question: "Why was the formal verification of TLS 1.3 (RFC 8446) during its IETF draft phase considered a historic milestone in internet engineering?",
    shortAnswer: "TLS 1.3 was the first major internet protocol developed hand-in-hand with the academic formal verification community before publication. ProVerif and Tamarin models analyzed draft iterations in real time, uncovering subtle 0-RTT replay race conditions and key schedule derivation collisions, ensuring the final standard had formal mathematical proofs of security.",
    explanation: "Previous standards (like SSL 2.0, SSL 3.0, and TLS 1.0) were designed informally, leading to decades of vulnerabilities (POODLE, BEAST, FREAK, Logjam).",
    hint: "First major protocol mathematically verified by formal tools before its official RFC release.",
    level: "Basic",
    codeExample: `// TLS 1.3 Academic Verification Consortium:
// Formal models published by Inria, Oxford, and Cambridge proved:
// 1. Handshake Secrecy & 1-RTT Mutual Authentication ✔
// 2. Full Perfect Forward Secrecy ✔
// 3. Documented 0-RTT Anti-Replay boundary conditions ✔`
  },
  {
    id: 10,
    question: "What is an 'Attack Trace' (Counterexample) in formal verification output?",
    shortAnswer: "When a formal verifier discovers that a security goal (like secrecy) does not hold, it outputs an Attack Trace—a chronological, step-by-step sequence of adversary packet interceptions, modifications, and injections demonstrating exactly how an attacker can breach the system.",
    explanation: "Security engineers use attack traces as automated blueprints to identify root causes and deploy targeted protocol patches.",
    hint: "A step-by-step log generated by the tool showing exactly how an attacker breaches the protocol.",
    level: "Basic",
    codeExample: `// Sample ProVerif Attack Trace Output:
// 1. Attacker listens on channel c.
// 2. Attacker intercepts message 1 from Alice: {Na, A}_pk(I).
// 3. Attacker constructs forged message: {Na, A}_pk(B).
// 4. Attacker sends to Bob ➔ Bob accepts ➔ SECRECY VIOLATED!`
  },
  {
    id: 11,
    question: "What is the difference between the 'Symbolic Model' and the 'Computational Model' in cryptography?",
    shortAnswer: "The Symbolic Model (Dolev-Yao) treats messages as abstract algebraic terms and cryptography as unbreakable black-box functions, enabling fast automated proof verification; the Computational Model treats messages as bitstrings and algorithms as probabilistic Turing machines, evaluating security against polynomial-time adversaries with minute mathematical advantages ($\epsilon$).",
    explanation: "Tools like EasyCrypt and CryptoVerif bridge these domains by generating machine-checked computational proofs.",
    hint: "Symbolic uses algebraic terms and automated solvers; Computational uses bitstrings and probability.",
    level: "Expert",
    codeExample: `// Symbolic vs Computational:
// Symbolic (ProVerif)     : sdec(senc(m, k), k) = m (Pure algebraic equality)
// Computational (CryptoVerif): Pr[Adv wins] <= Negligible(security_parameter)`
  },
  {
    id: 12,
    question: "How does the WireGuard VPN protocol achieve verified security using the Noise Protocol Framework?",
    shortAnswer: "WireGuard is built on `Noise_IKpsk2_25519_ChaChaPoly_BLAKE2s`, a standardized, formally proven pattern from the Noise Protocol Framework. Its minimal 4,000-line codebase has been formally verified in Tamarin and ProVerif, proving identity hiding, key agreement secrecy, and instant forward secrecy without legacy protocol negotiation bloat.",
    explanation: "By eliminating cipher negotiation entirely, WireGuard avoided the complex state machine bugs that plagued IPsec IKEv1 and OpenSSL.",
    hint: "Built on the formally verified Noise Framework, eliminating cipher negotiation and state bloat.",
    level: "Moderate",
    codeExample: `// WireGuard 1-RTT Handshake Invariant:
// Initiator ➔ Responder : Ephemeral DH (e) + Encrypted Static Identity (es)
// Responder ➔ Initiator : Ephemeral DH (e, ee) + Authenticated MAC (se)
// Formally verified in Tamarin: Secrecy, PFS, and Identity Anonymity hold ✔`
  },
  {
    id: 13,
    question: "What is 'Observational Equivalence' in formal protocol verification and what privacy properties does it prove?",
    shortAnswer: "Observational Equivalence proves that an adversary cannot distinguish between two different protocol runs (e.g., Alice communicating vs Bob communicating, or voting for Candidate A vs Candidate B). It is used to mathematically prove Strong Anonymity, Unlinkability, and Ballot Secrecy in electronic voting.",
    explanation: "If the adversary's visible output transcripts for both runs are computationally identical, identity privacy is mathematically guaranteed.",
    hint: "Proves an attacker cannot distinguish between two different users or operations.",
    level: "Expert",
    codeExample: `// ProVerif Observational Equivalence:
// choice[Alice_Session, Bob_Session]
// (Proves attacker cannot determine which participant is active)`
  },
  {
    id: 14,
    question: "What is an 'Equational Theory' in formal verification tools (e.g., modeling Diffie-Hellman)?",
    shortAnswer: "An equational theory defines algebraic rewrite rules that model the mathematical behavior of cryptographic primitives. For Diffie-Hellman: `DH(g^x, y) = DH(g^y, x) = g^(xy)` and `XOR(XOR(x, y), y) = x`.",
    explanation: "This allows automated theorem provers to calculate shared secrets and cancellation identities symbolically.",
    hint: "Algebraic rules that teach theorem provers how Diffie-Hellman and XOR math work.",
    level: "Moderate",
    codeExample: `// ProVerif Diffie-Hellman Equational Theory:
// type G. type exponent.
// fun exp(G, exponent): G.
// equation forall x: exponent, y: exponent; exp(exp(g, x), y) = exp(exp(g, y), x).`
  },
  {
    id: 15,
    question: "What is the 'State Explosion Problem' in model checking protocols, and how do tools like ProVerif mitigate it?",
    shortAnswer: "When testing concurrent sessions with multiple users and attackers, the number of possible network interleavings grows exponentially, exceeding available computer RAM. ProVerif mitigates this by abstracting the protocol into Horn clauses and using resolution algorithms that analyze an unbounded number of sessions without unrolling concrete execution states.",
    explanation: "This abstraction allows ProVerif to terminate in seconds even when analyzing infinite concurrent sessions.",
    hint: "Exponential growth of possible execution paths; solved by Horn clause abstraction.",
    level: "Expert",
    codeExample: `// Horn Clause Abstraction:
// Translates infinite session states into logical implications:
// Known(m) AND Known(k) ==> Known(senc(m, k))`
  },
  {
    id: 16,
    question: "What is 'Aliveness' in authentication verification hierarchies?",
    shortAnswer: "Aliveness is the weakest authentication property: it merely proves that the claimed communication partner (Bob) was active and executed at least one protocol step at some point in time, but gives no guarantees that Bob was communicating with Alice or agrees on any session parameters.",
    explanation: "Authentication hierarchies progress: Aliveness ➔ Weak Agreement ➔ Non-Injective Agreement ➔ Injective Agreement.",
    hint: "The weakest authentication proof: proves only that the partner was alive and active.",
    level: "Moderate",
    codeExample: `// Authentication Hierarchy:
// 1. Aliveness (Bob was alive)
// 2. Weak Agreement (Bob ran the protocol with Alice)
// 3. Non-Injective Agreement (Bob agrees on session keys)
// 4. Injective Agreement (1-to-1 strict match; no replays!)`
  },
  {
    id: 17,
    question: "How did formal verification uncover the 'ASokan Attack' on cross-protocol authentication (e.g., EAP-SIM / EAP-AKA)?",
    shortAnswer: "N. Asokan used formal analysis to discover that when a client authenticates across mixed methods, an attacker can tunnel an unauthenticated handshake inside an authenticated tunnel, tricking the server into believing a weak authentication method achieved full cryptographic strength.",
    explanation: "This led to mandatory cryptographic channel binding (RFC 5056) in modern unified authentication protocols.",
    hint: "Discovered tunnel-splicing attacks where weak authentication was passed inside strong tunnels.",
    level: "Expert",
    codeExample: `// Channel Binding Defense (RFC 5056):
// Inner protocol cryptographic hash is bound to the outer TLS master secret, preventing splicing.`
  },
  {
    id: 18,
    question: "What is the Signal Double Ratchet algorithm, and why does it combine symmetric and asymmetric ratcheting?",
    shortAnswer: "It combines a KDF (Key Derivation Function) Symmetric Ratchet (providing per-message forward secrecy) with a Diffie-Hellman Asymmetric Ratchet (providing Post-Compromise Security). Every message creates a new ephemeral DH key, guaranteeing that a compromised session key is discarded within milliseconds and cannot decrypt future messages.",
    explanation: "Signal's formal proofs in Tamarin established that it provides the highest security grade achievable in end-to-end messaging.",
    hint: "Combines DH ratcheting (post-compromise healing) with KDF hash ratcheting (forward secrecy).",
    level: "Moderate",
    codeExample: `// Signal Double Ratchet Architecture:
// Message N   : Derived from Chain Key C_n (Symmetric Hash Step)
// Next Turn   : New Ephemeral DH Key Exchanged (Asymmetric Ratchet ➔ PCS Healing ✔)`
  },
  {
    id: 19,
    question: "What is a 'False Attack' (False Positive) in formal verification tools?",
    shortAnswer: "Because automated tools use mathematical abstractions (over-approximation) to handle infinite sessions, a tool might report an attack trace that cannot actually occur in physical reality because the abstraction dropped a constraint that the real system enforces.",
    explanation: "Security researchers inspect attack traces to verify whether the counterexample is physically exploitable or an artifact of model over-approximation.",
    hint: "A theoretical warning that cannot happen in reality due to model abstraction.",
    level: "Moderate",
    codeExample: `// ProVerif Warning Output:
// "RESULT not attacker(secret[]) cannot be proved (May be false attack due to abstraction)."`
  },
  {
    id: 20,
    question: "What is the 'Key Schedule' in TLS 1.3 and how did formal verification guarantee cryptographic separation between Handshake and Application keys?",
    shortAnswer: "TLS 1.3 uses HKDF (HMAC-based Extract-and-Expand Key Derivation Function) across multiple stages (Early Secret, Handshake Secret, Master Secret). Formal verification proved cryptographic domain separation—meaning compromise of Handshake Keys cannot leak Application Traffic Keys or Resumption Secrets.",
    explanation: "This layered HKDF tree structure guarantees that mathematical compromise in one phase never cascades into other phases.",
    hint: "HKDF tree separation: proving Handshake Keys never leak Application Secrets.",
    level: "Expert",
    codeExample: `// TLS 1.3 HKDF Key Schedule Tree:
// Early Secret ➔ Handshake Secret (Client/Server Handshake Keys) ➔ Master Secret (Client/Server Application Traffic Keys)`
  },
  {
    id: 21,
    question: "How do formal methods verify Denial-of-Service (DoS) resistance in cryptographic protocols (e.g., IKEv2 / TCP SYN cookies)?",
    shortAnswer: "By modeling computational cost asymmetry: formal rules verify that a responder does not perform expensive cryptographic operations (like 4096-bit RSA decryption or DH exponentiation) or allocate memory state until the initiator proves IP ownership by returning a stateless cryptographic cookie.",
    explanation: "This mathematically guarantees that attackers cannot exhaust server CPU with spoofed handshake floods.",
    hint: "Proves servers do not allocate RAM or compute DH until the client returns a stateless cookie.",
    level: "Moderate",
    codeExample: `// Formal Stateless Cookie Verification:
// Responder ➔ Initiator : Cookie = HMAC_Secret(Client_IP || Timestamp) [Zero RAM Allocated!]
// Initiator ➔ Responder : Handshake + Cookie (Server verifies HMAC before computing DH)`
  },
  {
    id: 22,
    question: "What is 'Non-Repudiation' in formal protocol verification and what cryptographic primitive is strictly required to prove it?",
    shortAnswer: "Non-repudiation proves that the sender cannot deny having created and sent a message. It strictly requires Asymmetric Digital Signatures (RSA/ECDSA/Ed25519) where only the sender possesses the private key; symmetric HMACs cannot prove non-repudiation because both parties share the exact same key.",
    explanation: "In legal and banking frameworks across West Bengal, digital signatures are mandatory for non-repudiation.",
    hint: "Requires asymmetric digital signatures because symmetric HMAC keys are shared.",
    level: "Basic",
    codeExample: `// Non-Repudiation Invariant:
// Signature = Sign_Sk(A)(Message)
// Proof: Only Alice holds Sk(A). Therefore Alice cannot deny authorship in court.`
  },
  {
    id: 23,
    question: "What is 'Type Flaw' attack in protocol engineering and how do modern protocols prevent it?",
    shortAnswer: "A type flaw occurs when an unauthenticated receiver misinterprets a field of one data type as another (e.g., interpreting a 128-bit public key as a 128-bit session nonce). Modern protocols prevent this using explicit cryptographic tags, ASN.1/DER schemas, or Protobuf typing.",
    explanation: "Without strict typing, attackers can replay message fragments to fool protocol parsers into accepting weak credentials.",
    hint: "Tricking a parser into treating one field type (like a key) as another (like a nonce).",
    level: "Expert",
    codeExample: `// Type Tagging in Modern Protocol Frames:
// { Type: 0x01 (NONCE), Length: 16, Data: 0x4A... }
// { Type: 0x02 (PUBKEY), Length: 32, Data: 0x88... }`
  },
  {
    id: 24,
    question: "What is 'Forward Secrecy of Identity' (Identity Anonymity) in IPsec IKEv2 and TLS 1.3 handshakes?",
    shortAnswer: "Identity anonymity proves that passive and active network eavesdroppers cannot determine the real identity (X.509 certificate, username, or public key) of the communicating parties. In TLS 1.3, the server's certificate is encrypted under the ephemeral handshake key; in IKEv2, identities are sent inside the encrypted `IKE_AUTH` payload.",
    explanation: "This shields administrators in Barrackpore from surveillance tracking when establishing secure tunnels across public networks.",
    hint: "Encrypts certificates and user IDs during the handshake to conceal who is connecting.",
    level: "Moderate",
    codeExample: `// Identity Protection:
// TLS 1.2 : Server sends Certificate in CLEARTEXT (Leaked to Wi-Fi sniffers!)
// TLS 1.3 : Certificate sent inside Encrypted Extensions (100% Confidential ✔)`
  },
  {
    id: 25,
    question: "What is the role of 'Cryptographic Nonces' in preventing replay attacks in formal protocol specifications?",
    shortAnswer: "A nonce (Number used ONCE) is a cryptographically random value generated freshly for each session. By including a nonce in a signed or encrypted challenge-response exchange, the verifier proves that the message is fresh and not a replayed recording of a past session.",
    explanation: "In formal models, nonces are represented as fresh unguessable symbols (`new Na: bitstring`).",
    hint: "A fresh random number generated once per session to guarantee freshness.",
    level: "Basic",
    codeExample: `// Freshness Guarantee via Nonces:
// Alice ➔ Bob : Na (Fresh Random Nonce)
// Bob ➔ Alice : Sign_Sk(B)(Na || Nb || "SessionParameters")
// Alice verifies that Na matches her current run, proving the response is live!`
  },
  {
    id: 26,
    question: "What is 'Re-Keying' and 'PFS Re-negotiation' in long-running IPsec and SSH-2 tunnels?",
    shortAnswer: "Re-keying is the process of generating fresh symmetric encryption keys and executing a new Diffie-Hellman exchange over an existing active tunnel before data volume limits (e.g., 4 GB) or time limits (e.g., 1 hour) expire. This bounds the exposure window if a single session key is compromised and limits the amount of ciphertext available for cryptanalysis.",
    explanation: "In IPsec, Child SAs are re-keyed with PFS to ensure ongoing traffic remains completely uncompromised.",
    hint: "Periodically generating new session keys to limit the lifetime of any single key.",
    level: "Moderate",
    codeExample: `// OpenSSH / IPsec Rekey Directives:
// RekeyLimit 1G 1h (Automatically re-keys every 1 GB of traffic or 1 hour of time)`
  },
  {
    id: 27,
    question: "What is 'Cryptographic Downgrade Resilience' in formal verification terms?",
    shortAnswer: "The mathematical proof that an active adversary on the network path cannot manipulate handshake messages to force two honest endpoints to accept a security policy, cipher suite, or protocol version weaker than the highest mutually supported standard.",
    explanation: "Formally verified in TLS 1.3 by proving that the `Finished` MAC verifies the entire uncorrupted transcript of all prior handshake messages.",
    hint: "Proof that attackers cannot manipulate handshakes to force weaker ciphers.",
    level: "Moderate",
    codeExample: `// Transcript Integrity Invariant:
// Finished_MAC = HMAC(Key, Hash(ClientHello || ServerHello || EncryptedExtensions || Cert))`
  },
  {
    id: 28,
    question: "What is EasyCrypt and how does it provide Machine-Checked Proofs in the Computational Model?",
    shortAnswer: "EasyCrypt is an interactive theorem prover environment designed for reasoning about game-based cryptographic proofs (e.g., IND-CPA, IND-CCA2). It uses Probabilistic Relational Hoare Logic (pRHL) to verify that reductions to mathematical hardness assumptions (like CDH or LWE) are mathematically sound without gaps.",
    explanation: "EasyCrypt is used by leading cryptographers to construct machine-checked security proofs for post-quantum algorithms.",
    hint: "An interactive theorem prover for game-based cryptographic reductions.",
    level: "Expert",
    codeExample: `// EasyCrypt Game-Based Reduction:
// lemma IND_CPA_Security:
//   equiv [ Game_Real ~ Game_Ideal : ... ==> res{1} = res{2} ]`
  },
  {
    id: 29,
    question: "What is the primary difference between a 'Security Invariant' and a 'Liveness Property' in protocol verification?",
    shortAnswer: "A Security Invariant (Safety Property) asserts that 'something bad never happens' (e.g., secrecy is never broken, nonces never collide); a Liveness Property asserts that 'something good eventually happens' (e.g., the handshake will eventually complete and deliver data without deadlock).",
    explanation: "Most automated cryptographic verifiers (ProVerif, Tamarin) specialize in Safety properties, while general model checkers (Spin, TLA+) verify Liveness.",
    hint: "Safety = bad things never happen; Liveness = good things eventually complete.",
    level: "Moderate",
    codeExample: `// Safety vs Liveness:
// Safety Invariant : not attacker(Session_Key)
// Liveness Property: Client_State == TERMINATED_SUCCESSFULLY`
  },
  {
    id: 30,
    question: "What are the five essential steps in a complete Cryptographic Protocol Verification Lifecycle?",
    shortAnswer: "1. Protocol Formal Specification (RFC/Wire format); 2. Mathematical Modeling in Applied Pi-Calculus / Multiset Rules; 3. Defining the Dolev-Yao Adversary Capabilities; 4. Automated Theorem Prover Execution (ProVerif / Tamarin); 5. Counterexample Analysis, Protocol Patching, and Final Invariant Certification.",
    explanation: "Following this rigorous engineering lifecycle guarantees that modern cybersecurity protocols are mathematically certified against all active network adversaries.",
    hint: "Specification ➔ Mathematical Modeling ➔ Threat Model ➔ Automated Proving ➔ Patching & Certification.",
    level: "Basic",
    codeExample: `// Formal Verification Lifecycle:
// [ RFC Specification ] ➔ [ Pi-Calculus Model ] ➔ [ Dolev-Yao Prover ] ➔ [ Attack Discovery / Formal Proof ✔ ]`
  }
];

export default questions;
