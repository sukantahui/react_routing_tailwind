const questions = [
  {
    id: 1,
    question: "What is a Blockchain and how does it achieve cryptographic immutability?",
    shortAnswer: "A blockchain is a decentralized, distributed, append-only cryptographic ledger where each block contains a cryptographic hash of the previous block ($H_i = \\text{SHA256}(H_{i-1} || \\text{MerkleRoot} || \\text{Nonce})$). Modifying any past transaction breaks the hash chain for all subsequent blocks, making retroactive tampering mathematically evident.",
    explanation: "Immutability is guaranteed through the combination of SHA-256 hash chaining and consensus mechanisms.",
    hint: "Each block contains the hash of the previous block; modifying any block breaks the entire chain.",
    level: "Basic",
    codeExample: `// Hash Chaining:
// Block 0 (Genesis) : Hash = "000abc..."
// Block 1 : PreviousHash = "000abc..." | Hash = "000def..."
// Block 2 : PreviousHash = "000def..." | Hash = "000123..."`
  },
  {
    id: 2,
    question: "What is a Merkle Tree (Binary Hash Tree) and why is it used inside blockchain blocks?",
    shortAnswer: "A Merkle Tree hashes transactions pairwise in a binary tree structure up to a single top hash (Merkle Root). It allows nodes to verify whether a specific transaction exists within a block in $O(\\log_2 N)$ logarithmic time (using a compact Merkle Proof) without downloading the entire block.",
    explanation: "Merkle trees enable lightweight Simplified Payment Verification (SPV) clients on mobile devices.",
    hint: "Binary tree of pairwise hashes; allows verifying a transaction in O(log N) time with a Merkle proof.",
    level: "Moderate",
    codeExample: `// Merkle Tree Calculation:
// Tx1 ➔ H1, Tx2 ➔ H2 ➔ H12 = SHA256(H1 + H2)
// Tx3 ➔ H3, Tx4 ➔ H4 ➔ H34 = SHA256(H3 + H4)
// Merkle Root = SHA256(H12 + H34)`
  },
  {
    id: 3,
    question: "What happens during a Tamper Cascade when an adversary modifies a single historical transaction?",
    shortAnswer: "Modifying transaction data in Block #K alters Block #K's Merkle Root, changing its block hash $H_K$. Because Block #K+1 references $H_K$ as its `previous_hash`, Block #K+1 becomes cryptographically invalid, invalidating all subsequent blocks (#K+2 to #N).",
    explanation: "To forge the ledger, an attacker must recompute Proof-of-Work for the tampered block and all subsequent blocks faster than the honest network.",
    hint: "Changing one block invalidates all subsequent blocks in the chain, exposing tampering instantly.",
    level: "Basic",
    codeExample: `// Tamper Cascade Effect:
// Attacker edits Block #2 ➔ Hash(#2) changes ➔ Block #3 previous_hash mismatch ➔ Chain rejected by network! 🚨`
  },
  {
    id: 4,
    question: "What is Proof-of-Work (PoW / Nakamoto Consensus) and what role does the Nonce play?",
    shortAnswer: "PoW is a consensus mechanism where nodes (miners) compete to find a 32-bit `nonce` value such that the SHA-256 hash of the block header is less than a dynamic target value (i.e., starts with $D$ leading zeros). The difficulty adjusts dynamically to maintain predictable block creation times.",
    explanation: "Proof-of-Work provides thermodynamic security, making ledger rewriting computationally cost-prohibitive.",
    hint: "Iterating the nonce to find a SHA-256 hash with required leading zeros.",
    level: "Basic",
    codeExample: `// PoW Mining Loop:
let nonce = 0;
while (!sha256(header + nonce).startsWith("0000")) {
    nonce++;
}`
  },
  {
    id: 5,
    question: "What is a 51% Consensus Attack in Proof-of-Work blockchains?",
    shortAnswer: "An attack where an adversary controls more than 50% of the network's total computational mining hashrate. This allows the attacker to mine a private fork faster than the public honest network, enabling Double-Spending and transaction reorganizations.",
    explanation: "Even with 51% hashrate, the attacker CANNOT forge cryptographic signatures, steal funds from private keys, or alter old historical blocks.",
    hint: "Controlling > 50% hashrate allows rewriting recent blocks and double-spending coins.",
    level: "Moderate",
    codeExample: `// 51% Hashrate Race:
// Attacker Hashrate = 55% | Honest Network = 45%
// Attacker private chain grows faster ➔ Releases longer chain ➔ Honest network adopts it (Double-Spend 🚨)`
  },
  {
    id: 6,
    question: "What is Byzantine Fault Tolerance (BFT) and what is the maximum proportion of rogue nodes a BFT system can tolerate?",
    shortAnswer: "BFT is the property of a distributed system to reach consensus even if some nodes fail or act maliciously (transmitting conflicting messages). Classical BFT algorithms (like PBFT) can tolerate up to $f < n/3$ malicious nodes (less than 33.3% rogue nodes).",
    explanation: "In Nakamoto consensus (PoW), the fault tolerance threshold is extended to $f < 50\%$ of computational hashrate.",
    hint: "Tolerance against malicious/failing nodes; classical PBFT tolerates up to 1/3 (33.3%) rogue nodes.",
    level: "Expert",
    codeExample: `// BFT Constraint:
// Total Nodes n = 3f + 1
// If n = 100 nodes ➔ Maximum tolerable rogue nodes f = 33 nodes.`
  },
  {
    id: 7,
    question: "What is a Sybil Attack on peer-to-peer blockchain networks and how do consensus mechanisms prevent it?",
    shortAnswer: "A Sybil attack occurs when an adversary creates thousands of fake virtual nodes on a P2P network to monopolize communication channels and isolate legitimate nodes (Eclipse Attack). Consensus mechanisms prevent this by tying voting weight to scarce physical resources (computational hashrate in PoW, or locked capital in PoS) rather than IP addresses.",
    explanation: "Tying consensus weight to physical resources makes creating millions of fake node identities economically useless.",
    hint: "Creating fake peer nodes to manipulate the network; prevented by tying consensus to hashrate or staked capital.",
    level: "Moderate",
    codeExample: `// Sybil Defense:
// Attacker spawns 10,000 fake IP nodes -> Total Staked Capital = 0 ETH -> Consensus Weight = 0% ✔`
  },
  {
    id: 8,
    question: "How is Blockchain used for Tamper-Proof SIEM and Audit Logging in enterprise SOCs?",
    shortAnswer: "Enterprises compute SHA-256 cryptographic hashes of audit log batches (e.g., hourly SIEM log summaries) and write the root hashes onto a public or permissioned blockchain. If an insider or ransomware attacker modifies the local SIEM logs to hide their tracks, the hash mismatch with the blockchain proves log tampering in court.",
    explanation: "Blockchain provides mathematically indisputable non-repudiation for digital forensics and compliance audits.",
    hint: "Writing hourly log hashes onto a blockchain ensures administrators cannot secretly modify logs to hide tracks.",
    level: "Moderate",
    codeExample: `// Tamper-Proof Audit Logging:
// Log Batch #401 ➔ SHA256(Logs) = "7f8a9b..." ➔ Anchored in Blockchain Transaction Tx_99182.`
  },
  {
    id: 9,
    question: "What is Decentralized Public Key Infrastructure (DPKI) and how does it solve Certificate Authority (CA) single points of failure?",
    shortAnswer: "In traditional PKI, if a root Certificate Authority (like DigiCert or Let's Encrypt) is compromised or coerced by a nation-state, rogue SSL certificates can be forged. DPKI stores public keys and domain ownership records directly on an immutable blockchain ledger, eliminating centralized CAs entirely.",
    explanation: "In DPKI, only the private key owner can update or revoke their domain's public key.",
    hint: "Stores public keys directly on an immutable blockchain, eliminating centralized Certificate Authorities.",
    level: "Expert",
    codeExample: `// DPKI vs Traditional PKI:
// Traditional : Rely on 150 Root CAs in browser trust store (Any single CA breach allows MITM ❌)
// DPKI        : Domain public keys registered in smart contract ledger (Immune to rogue CAs ✔)`
  },
  {
    id: 10,
    question: "What is the difference between Public (Permissionless) and Private (Permissioned / Consortium) Blockchains?",
    shortAnswer: "Public (Ethereum, Bitcoin): Anyone can join, read, and mine; uses PoW/PoS; fully decentralized. Permissioned (Hyperledger Fabric, R3 Corda): Access is restricted to vetted organizations with cryptographic identity certificates; uses fast BFT consensus; ideal for banking consortia and government registries.",
    explanation: "Permissioned blockchains offer high transaction throughput (> 5,000 TPS) and strict privacy controls for enterprise use.",
    hint: "Public is open to everyone (Bitcoin); Permissioned is restricted to authorized enterprise members (Hyperledger).",
    level: "Basic",
    codeExample: `// Blockchain Models:
// Public       : Ethereum (Open participation, pseudonymous)
// Permissioned : Hyperledger Fabric (Authorized banks with X.509 certificates, high TPS)`
  },
  {
    id: 11,
    question: "What is an Eclipse Attack in blockchain P2P networking?",
    shortAnswer: "An adversary isolates a specific target node by manipulating its peer discovery table so that all incoming and outgoing connections connect exclusively to attacker-controlled nodes. The attacker feeds the victim node false block information, enabling zero-confirmation double-spending.",
    explanation: "Defenses include maintaining connections across diverse ASNs, random peer selection, and static trusted peers.",
    hint: "Surrounding a victim node with attacker-controlled peers to feed it fake blockchain data.",
    level: "Moderate",
    codeExample: `// Eclipse Isolation:
// Target Node Peer Table: [Attacker_Peer_1, Attacker_Peer_2, Attacker_Peer_3] (Completely blinded from honest network 🚨)`
  },
  {
    id: 12,
    question: "What is Proof-of-Stake (PoS) and how does the 'Slashing' mechanism enforce security?",
    shortAnswer: "In PoS, validators lock up capital (cryptocurrency stake) as collateral to propose and validate blocks. Slashing is an automated protocol rule that permanently confiscates and burns a validator's staked capital if they act maliciously (e.g., signing two conflicting blocks at the same height or going offline).",
    explanation: "Slashing makes attacking a PoS network economically self-destructive (attackers lose hundreds of millions of rupees in stake).",
    hint: "Validators lock up capital; rogue behavior causes automated burning (slashing) of their money.",
    level: "Moderate",
    codeExample: `// PoS Slashing Condition:
// IF Validator signs Block_A AND Block_B at Height 100:
// ➔ Execute Slashing: Burn 32 ETH ($80,000) + Eject from validator set!`
  },
  {
    id: 13,
    question: "What is a Smart Contract in blockchain technology?",
    shortAnswer: "A self-executing, immutable program stored on the blockchain that automatically executes business logic and transfers assets when pre-defined cryptographic conditions are met (e.g., Solidity code running on the Ethereum Virtual Machine - EVM).",
    explanation: "Smart contracts eliminate trusted intermediaries, but code vulnerabilities are permanently un-patchable on-chain.",
    hint: "Self-executing code stored on the blockchain that runs automatically without intermediaries.",
    level: "Basic",
    codeExample: `// Solidity Smart Contract:
// contract Escrow {
//     function release() public { require(msg.sender == buyer); payable(seller).transfer(amount); }
// }`
  },
  {
    id: 14,
    question: "What is Cryptographic Nonce and Difficulty Adjustment in Bitcoin Proof-of-Work?",
    shortAnswer: "The Nonce is a 32-bit arbitrary number varied by miners to change the block header hash. Difficulty Adjustment is an automated algorithm that evaluates the time taken to mine the last 2,016 blocks; if blocks were found faster than 10 minutes, difficulty increases (requiring more leading zeros) to maintain steady issuance.",
    explanation: "Difficulty adjustment maintains predictable block issuance regardless of global hashrate growth.",
    hint: "Difficulty adjusts every 2016 blocks to keep block mining time at exactly 10 minutes.",
    level: "Moderate",
    codeExample: `// Difficulty Adjustment Formula:
// New_Difficulty = Old_Difficulty * (Actual_Time_for_2016_blocks / Target_Time_20160_mins)`
  },
  {
    id: 15,
    question: "How does Blockchain enhance Software Supply Chain Integrity (e.g., in CI/CD pipelines)?",
    shortAnswer: "When software is compiled, the build pipeline generates a cryptographic hash of the binary and records the hash, source Git commit ID, and developer cryptographic signatures onto a blockchain ledger. Enterprise endpoints check the binary against the blockchain before executing, blocking modified supply chain malware.",
    explanation: "Even if an attacker compromises a vendor's download server, the altered binary hash will not match the immutable blockchain record.",
    hint: "Records binary hashes and build metadata on-chain; endpoints verify hash before executing.",
    level: "Moderate",
    codeExample: `// Supply Chain Verification:
// Downloaded 'app.exe' ➔ SHA256 = "8f9a2b..."
// Query Blockchain: "8f9a2b..." verified signed by Vendor_Key at Block #88219 -> EXECUTION PERMITTED ✔`
  },
  {
    id: 16,
    question: "What is a Reentrancy Attack in smart contracts (e.g., The DAO Hack)?",
    shortAnswer: "An attack where a malicious contract calls a vulnerable withdraw function, and before the vulnerable contract can update its balance variable, the malicious fallback function recursively calls `withdraw()` again, repeatedly draining funds before the balance is ever set to zero.",
    explanation: "Mitigated by the Checks-Effects-Interactions pattern and ReentrancyGuard mutex locks.",
    hint: "Recursively calling a withdraw function before the contract can update its internal balance.",
    level: "Expert",
    codeExample: `// Vulnerable Reentrancy:
// 1. msg.sender.call{value: balance}("") (Transfers ETH -> Calls Attacker Fallback)
// 2. balances[msg.sender] = 0; (NEVER REACHED! Drained in loop)`
  },
  {
    id: 17,
    question: "What is Zero-Knowledge Proof (ZKP / zk-SNARKs) in blockchain privacy and security?",
    shortAnswer: "A cryptographic method allowing one party (Prover) to mathematically prove to another (Verifier) that a statement is true (e.g., 'I am over 18 years old' or 'I possess a valid private key') without revealing ANY underlying information (e.g., birthdate or key bytes).",
    explanation: "zk-SNARKs allow private transactions and decentralized identity verification on public blockchains without leaking sensitive personal data.",
    hint: "Proving a statement is true without revealing any of the underlying secret data.",
    level: "Expert",
    codeExample: `// ZKP Verification:
// verify_proof(Proof_zk, Public_Statement) ➔ True (Without revealing user's private Aadhaar ID or salary)`
  },
  {
    id: 18,
    question: "What is the Double-Spending Problem and how does blockchain solve it without a central bank?",
    shortAnswer: "In digital systems, digital data can be copied infinitely (spending the same ₹50,000 twice). Blockchain solves this by maintaining a globally synchronized, append-only UTXO (Unspent Transaction Output) or Account state machine where each coin can be referenced as an input only ONCE, verified by decentralized consensus.",
    explanation: "Consensus ordering ensures the first valid transaction is accepted and the conflicting duplicate transaction is permanently rejected.",
    hint: "Spending the same digital money twice; solved by consensus ordering and UTXO tracking.",
    level: "Basic",
    codeExample: `// Double-Spend Attempt:
// Tx1: Spend Coin_A -> Bob (Confirmed in Block #100)
// Tx2: Spend Coin_A -> Alice (REJECTED by nodes: Coin_A is already spent!) ❌`
  },
  {
    id: 19,
    question: "What is a Selfish Mining Attack in Proof-of-Work blockchains?",
    shortAnswer: "A game-theoretic attack where a mining pool finds new blocks but keeps them secret, mining privately ahead of the public network. When the honest network is about to catch up, the selfish miner releases its longer secret chain, wiping out the honest miners' blocks and wasting their compute power.",
    explanation: "Selfish mining becomes profitable with as little as 25% to 33% of the total network hashrate.",
    hint: "Keeping mined blocks secret to invalidate honest miners' work and increase relative reward share.",
    level: "Expert",
    codeExample: `// Selfish Mining Strategy:
// Pool mines Block #101 privately -> Mines Block #102 privately -> Honest network mines #101 -> Pool releases [#101, #102] -> Honest #101 orphaned!`
  },
  {
    id: 20,
    question: "What is Hashcash in the origin of Proof-of-Work?",
    shortAnswer: "A 1997 mechanism proposed by Adam Back to prevent email spam and Denial of Service by requiring the sender to compute a partial SHA-1 collision (finding a hash with leading zeros) on the email header, imposing a small computational cost (e.g., 2 seconds of CPU) per email.",
    explanation: "Satoshi Nakamoto adapted Hashcash to serve as the core consensus engine for Bitcoin in 2008.",
    hint: "1997 anti-spam mechanism requiring senders to compute partial hash collisions before sending email.",
    level: "Basic",
    codeExample: `// Hashcash Header:
// X-Hashcash: 1:20:060408:recipient@bank.in::4a9f2b:0000000000000000`
  },
  {
    id: 21,
    question: "What is an Oracle Problem in blockchain and smart contracts?",
    shortAnswer: "Smart contracts running on an isolated blockchain cannot directly fetch real-world data (e.g., stock prices, weather, IoT sensor readings) without relying on external entities called 'Oracles'. If the Oracle is compromised or feeds malicious data, the smart contract executes incorrect actions.",
    explanation: "Decentralized oracle networks (like Chainlink) use multi-source consensus to secure external data feeds.",
    hint: "Smart contracts cannot access off-chain data without Oracles; compromised Oracles feed false data.",
    level: "Moderate",
    codeExample: `// Oracle Vulnerability:
// Compromised Oracle feeds: "USD/INR = 0.01" ➔ Smart contract liquidation logic drains millions! 🚨`
  },
  {
    id: 22,
    question: "What is MEV (Maximal / Miner Extractable Value) and Front-Running in decentralized finance?",
    shortAnswer: "MEV is the maximum profit a blockchain miner/validator can extract by arbitrarily reordering, inserting, or censoring transactions within a block. Front-Running occurs when a bot detects a profitable pending transaction in the public mempool and pays a higher gas fee to get its own transaction mined first.",
    explanation: "MEV exploitation causes financial loss to users and creates consensus instability.",
    hint: "Validators or bots reordering transactions in the mempool to front-run profitable trades.",
    level: "Expert",
    codeExample: `// Sandwich Attack (MEV):
// Bot inserts Tx_Buy BEFORE Victim Tx ➔ Price rises ➔ Victim buys high ➔ Bot inserts Tx_Sell AFTER Victim (Instant Profit)`
  },
  {
    id: 23,
    question: "What is Directed Acyclic Graph (DAG) Distributed Ledger Technology (e.g., IOTA / Nano) and how does it differ from a blockchain?",
    shortAnswer: "In a DAG, transactions are not bundled into discrete sequential blocks. Instead, each individual new transaction directly validates and links to two or more previous transactions, forming an asynchronous directed graph without miners or transaction fees.",
    explanation: "DAG architectures offer micro-transaction scaling suitable for low-power IoT sensor networks.",
    hint: "Transactions link directly to previous transactions in an asynchronous graph without blocks.",
    level: "Moderate",
    codeExample: `// DAG Structure:
// Tx_New ➔ Directly validates [Tx_A, Tx_B] (No miners, instant asynchronous confirmation)`
  },
  {
    id: 24,
    question: "How does Blockchain DNS (e.g., Namecoin / Handshake / ENS) eliminate DNS Hijacking and Censorship?",
    shortAnswer: "Traditional DNS relies on ICANN root servers and centralized registrars vulnerable to BGP hijacking and court seizures. Blockchain DNS registers domain-to-IP mappings on an immutable blockchain where only the private key holder can update the DNS record, eliminating unauthorized hijacking.",
    explanation: "Decentralized DNS guarantees censorship resistance and tamper-proof domain resolution.",
    hint: "Registers domain records on a blockchain where only the private key owner can update DNS mappings.",
    level: "Moderate",
    codeExample: `// Blockchain DNS Record:
// Domain "barrackpore.eth" ➔ IPFS Content Hash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"`
  },
  {
    id: 25,
    question: "What is Time-to-Finality (TTF) in blockchain consensus?",
    shortAnswer: "The duration required for a transaction to become cryptographically irreversible. In PoW (Probabilistic Finality), finality requires waiting for 6 block confirmations (~60 minutes). In BFT/PoS systems (Deterministic Finality), finality is achieved in 1 to 3 seconds upon validator quorum signature.",
    explanation: "Fast finality is essential for real-time commercial payments and fraud mitigation.",
    hint: "Time required for a transaction to become permanently irreversible.",
    level: "Moderate",
    codeExample: `// Finality Comparison:
// Bitcoin PoW   : ~60 minutes (6 confirmations)
// PoS / BFT     : ~2.5 seconds (Instant deterministic finality)`
  },
  {
    id: 26,
    question: "What is a 51% Attack Goldfinger Attack in state-sponsored cyber warfare?",
    shortAnswer: "An attack where a nation-state adversary acquires 51% hashrate not to steal money, but with the explicit strategic goal of destroying confidence in a rival nation's cryptocurrency or supply chain blockchain by continuously reorganizing blocks and rendering the ledger unusable.",
    explanation: "Named after the James Bond villain, Goldfinger attacks prioritize network destruction over profit.",
    hint: "51% attack intended to destroy network trust and usability rather than extract financial profit.",
    level: "Expert",
    codeExample: `// Goldfinger Objective:
// Constant 10-block reorgs ➔ Merchants stop accepting transactions ➔ Entire blockchain ecosystem collapses.`
  },
  {
    id: 27,
    question: "How does Zero-Knowledge Rollup (zk-Rollup) achieve Layer-2 scaling while inheriting Layer-1 security?",
    shortAnswer: "zk-Rollups execute thousands of transactions off-chain, compress the state changes, and generate a succinct cryptographic zero-knowledge proof (SNARK/STARK) submitted to the Layer-1 Ethereum smart contract. The Layer-1 contract verifies the mathematical proof in milliseconds without re-executing transactions.",
    explanation: "Rollups increase throughput from 15 TPS to 10,000+ TPS while preserving complete cryptographic security.",
    hint: "Processes transactions off-chain and posts a succinct zero-knowledge proof to Layer-1 for instant verification.",
    level: "Expert",
    codeExample: `// zk-Rollup Batch:
// 10,000 Transactions Off-Chain ➔ Generate zk-STARK Proof (12KB) ➔ Verify on Ethereum in 1 transaction!`
  },
  {
    id: 28,
    question: "What is Fork Reorganization (Reorg) in blockchain forensics?",
    shortAnswer: "When a node receiving a longer or heavier valid chain abandons its current branch and switches to the new chain, orphaning all transactions included in the abandoned blocks. Forensic analysts track reorgs to detect double-spending events and mining cartel anomalies.",
    explanation: "Deep reorgs (> 6 blocks) indicate network attacks or severe partition anomalies.",
    hint: "Switching from an old branch to a longer incoming chain, orphaning abandoned blocks.",
    level: "Moderate",
    codeExample: `// Reorg Event:
// Node was on Block #50 (Branch A) -> Receives Branch B at Block #52 -> Replaces Branch A (2 blocks reorganized)`
  },
  {
    id: 29,
    question: "In the Barrackpore Municipal Property Registry deployment, fraudsters attempted to alter a property deed record by hacking the municipal database server. How did the permissioned blockchain architecture defeat this tampering attempt?",
    shortAnswer: "The deed was cryptographically anchored across 8 independent nodes (Treasury, Land Ministry, Judiciary, CAG Audit). When the hacker modified the local MySQL database on one server, the local block hash mismatch was rejected during BFT consensus verification against the other 7 nodes, preventing deed modification and alerting the SOC.",
    explanation: "Decentralized consensus guarantees that compromising a single server cannot alter immutable enterprise records.",
    hint: "Hash mismatch on the hacked server was instantly rejected by the other 7 consensus nodes.",
    level: "Expert",
    codeExample: `// Multi-Node Consensus Defense:
// Hacked Node A proposes altered deed ➔ Nodes B, C, D, E, F, G, H compare Merkle Root ➔ 7 vs 1 Vote: REJECTED & ALARM! ✔`
  },
  {
    id: 30,
    question: "Write out the comprehensive technical blueprint for integrating a Blockchain Tamper-Proof Audit Logging Architecture in an enterprise SOC.",
    shortAnswer: "1. Log Ingestion: SIEM aggregates Sysmon and NetFlow logs into 1-minute batches. 2. Merkle Root Generation: Python engine computes the SHA-256 binary Merkle Root of the batch. 3. Blockchain Anchoring: Smart contract writes the Merkle Root, timestamp, and SOC signature to an immutable ledger (Hyperledger / Ethereum). 4. Automated Verification: Audit cron job continuously recomputes log hashes against the on-chain roots. 5. Tamper Alarm: Any discrepancy triggers an immediate Level-1 SOC emergency lockdown.",
    explanation: "This architecture guarantees cryptographic non-repudiation and permanent tamper-evidence for all enterprise security logs.",
    hint: "Batch logs -> Compute Merkle Root -> Anchor on-chain -> Continuous verification cron -> Alert on mismatch.",
    level: "Expert",
    codeExample: `// Tamper-Proof Audit Architecture:
// [SIEM Logs (1-min batch)] ➔ [Merkle Tree Generator] ➔ Merkle Root H ➔ [Blockchain Anchor Tx] ➔ [Immutable Ledger]`
  }
];

export default questions;
