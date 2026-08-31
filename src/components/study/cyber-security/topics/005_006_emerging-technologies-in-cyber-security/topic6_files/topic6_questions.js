const questions = [
  {
    id: 1,
    question: "What is a Reentrancy Vulnerability (SWC-107) in Solidity smart contracts and how was it exploited in The DAO Hack?",
    shortAnswer: "Reentrancy occurs when a contract makes an external ETH call (`call.value()`) to an untrusted contract BEFORE updating the user's internal balance state. In The DAO Hack (2016), the attacker's fallback function recursively called `withdraw()` repeatedly before the balance was deducted, draining 3.6 million ETH ($60M) from the contract.",
    explanation: "Reentrancy abuses EVM call execution flow by re-entering the function before state updates complete.",
    hint: "External call is made before balance is updated, allowing attacker fallback function to recursively drain funds.",
    level: "Basic",
    codeExample: `// Vulnerable Code:
// 1. (bool s, ) = msg.sender.call{value: bal}(""); (INTERACTION - Triggers Attacker Fallback!)
// 2. balances[msg.sender] = 0; (EFFECT - Never reached in recursion! ❌)`
  },
  {
    id: 2,
    question: "Explain the Checks-Effects-Interactions (CEI) pattern and how it prevents Reentrancy.",
    shortAnswer: "1. Checks: Validate all inputs and authorization (`require(balance >= amount)`); 2. Effects: Update all internal contract state variables first (`balances[msg.sender] -= amount`); 3. Interactions: Perform external contract calls and ETH transfers last (`msg.sender.call{value: amount}(\"\")`). Even if the attacker re-enters, their balance is already 0, blocking recursive drains.",
    explanation: "Updating internal state before external calls ensures re-entrant invocations find an updated (zero) balance.",
    hint: "Checks inputs first, updates internal state variables second, and makes external calls last.",
    level: "Basic",
    codeExample: `// CEI Secure Code:
// 1. CHECKS:       require(balances[msg.sender] >= amount);
// 2. EFFECTS:      balances[msg.sender] -= amount; (Updated first! ✔)
// 3. INTERACTIONS: (bool s, ) = msg.sender.call{value: amount}("");`
  },
  {
    id: 3,
    question: "How does OpenZeppelin's `ReentrancyGuard` (`nonReentrant` modifier) protect functions at the EVM bytecode level?",
    shortAnswer: "It uses a state variable mutex lock (e.g., `_status`). When a function enters, it checks `require(_status != ENTERED)`. It sets `_status = ENTERED`, executes the function body, and resets `_status = NOT_ENTERED` upon exit. Any recursive re-entrant call fails the initial check and reverts the transaction.",
    explanation: "The mutex lock provides a robust secondary layer of defense against cross-function and single-function reentrancy.",
    hint: "Uses a state mutex lock that reverts any recursive call attempting to re-enter during execution.",
    level: "Moderate",
    codeExample: `// OpenZeppelin ReentrancyGuard:
// function withdraw() external nonReentrant { ... }`
  },
  {
    id: 4,
    question: "What is a Flash Loan Oracle Price Manipulation Attack and how do attackers exploit AMM liquidity pools?",
    shortAnswer: "An attacker borrows millions in uncollateralized Flash Loans (e.g., from Aave), dumps massive funds into a single decentralized exchange (Uniswap) pool within a single transaction block to artificially crash the spot price, exploits a lending protocol that uses that spot price as its price oracle to borrow underpriced collateral, and repays the flash loan with massive arbitrage profit.",
    explanation: "Flash loans give attackers virtually infinite capital for a single block transaction to manipulate vulnerable spot price feeds.",
    hint: "Borrowing massive capital via flash loans to artificially distort single-pool spot prices inside a single transaction.",
    level: "Expert",
    codeExample: `// Flash Loan Attack Flow:
// [Flash Loan 50,000 ETH] ➔ [Dump in AMM Pool (Spot crashes 70%)] ➔ [Liquidate underpriced collateral] ➔ [Repay Loan + ₹85,00,000 Profit]`
  },
  {
    id: 5,
    question: "Why should smart contracts use Chainlink Decentralized Oracles or Uniswap v3 TWAP instead of `getReserves()` spot prices?",
    shortAnswer: "`getReserves()` returns the instantaneous spot price of a single pool, easily manipulated by flash loans. Chainlink aggregates volume-weighted price feeds across dozens of independent off-chain exchanges and independent node operators. TWAP (Time-Weighted Average Price) averages prices over multiple blocks (e.g., 30 minutes), making manipulation cost-prohibitive across multiple blocks.",
    explanation: "Decentralized aggregation and time-weighting neutralize single-transaction flash loan attacks.",
    hint: "Chainlink aggregates across dozens of exchanges; TWAP averages prices over multiple blocks to resist single-block manipulation.",
    level: "Moderate",
    codeExample: `// Chainlink Price Feed:
// (, int price, , , ) = priceFeed.latestRoundData(); (Aggregated from 30+ independent exchanges ✔)`
  },
  {
    id: 6,
    question: "What is the difference between `tx.origin` and `msg.sender` in Solidity access control (SWC-115)?",
    shortAnswer: "`msg.sender` is the immediate caller of the function (can be a user or an intermediary smart contract). `tx.origin` is the original human wallet that initiated the entire transaction chain. If a contract checks `require(tx.origin == owner)`, an attacker can trick the owner into interacting with a malicious phishing contract that calls the vulnerable contract, bypassing authorization.",
    explanation: "Never use `tx.origin` for authorization checks; always use `msg.sender`.",
    hint: "tx.origin is the original human wallet (vulnerable to phishing); msg.sender is the immediate caller.",
    level: "Moderate",
    codeExample: `// Vulnerable Access Control:
// require(tx.origin == owner); (Phishing contract can call on behalf of owner! ❌)
// Secure: require(msg.sender == owner); ✔`
  },
  {
    id: 7,
    question: "What is Integer Overflow and Underflow (SWC-101) and how is it mitigated in Solidity 0.8.0+?",
    shortAnswer: "In fixed-width integers (e.g., uint8: 0 to 255), adding 1 to 255 wrapped around to 0 ($255 + 1 = 0$), and subtracting 1 from 0 wrapped around to 255 ($0 - 1 = 255$). Since Solidity 0.8.0, the compiler natively includes automatic arithmetic overflow/underflow checks that revert transactions automatically without requiring OpenZeppelin SafeMath.",
    explanation: "Solidity 0.8+ eliminates arithmetic wrapping bugs natively at the compiler level.",
    hint: "Values wrapping around 0 and 255; prevented natively in Solidity 0.8.0+ by automatic revert checks.",
    level: "Basic",
    codeExample: `// Solidity < 0.8.0:
// uint8 x = 255; x += 1; // x becomes 0! (Silent Bug)
// Solidity >= 0.8.0:
// uint8 x = 255; x += 1; // REVERTS TRANSACTION AUTOMATICALLY ✔`
  },
  {
    id: 8,
    question: "What is Front-Running and Sandwich Attacks (MEV) on decentralized exchanges?",
    shortAnswer: "Adversaries (MEV searcher bots) monitor the public mempool for pending swap transactions. A Sandwich Attack inserts a Buy transaction with higher gas fees directly BEFORE the victim's swap (driving the price up), and a Sell transaction directly AFTER the victim's swap, extracting risk-free profit from the victim's slippage.",
    explanation: "Mitigated by private mempools (Flashbots Protect) and setting tight slippage tolerance limits (e.g., < 0.5%).",
    hint: "Placing a buy order before and a sell order after a victim's pending swap to exploit price slippage.",
    level: "Moderate",
    codeExample: `// Sandwich Attack:
// Tx 1 (Bot - High Gas) : Buy 100 ETH (Price rises ₹2,50,000 ➔ ₹2,55,000)
// Tx 2 (Victim)         : Buys at ₹2,55,000 (Pushes price to ₹2,60,000)
// Tx 3 (Bot - Normal)   : Sells 100 ETH at ₹2,60,000 (Instant ₹5,00,000 Profit)`
  },
  {
    id: 9,
    question: "What is the Danger of Using `block.timestamp` (or `now`) for Critical Randomness (SWC-120)?",
    shortAnswer: "`block.timestamp` is set by the blockchain miner/validator proposing the block. Miners can manipulate the timestamp by up to 15–30 seconds within protocol bounds to bias random lottery outcomes or time-locked reward distributions in their own favor.",
    explanation: "For secure verifiable randomness, smart contracts must use Chainlink VRF (Verifiable Random Function).",
    hint: "Miners can manipulate block timestamps by ~15 seconds to manipulate lottery randomness.",
    level: "Moderate",
    codeExample: `// Insecure Randomness:
// uint rand = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 10; (Miner Manipulable! ❌)`
  },
  {
    id: 10,
    question: "What is Chainlink VRF (Verifiable Random Function) and how does it provide cryptographically un-biasable randomness?",
    shortAnswer: "Chainlink VRF generates a random number off-chain along with an asymmetric cryptographic proof demonstrating that the number was generated from a secret key and seed without manipulation. The on-chain smart contract cryptographically verifies the proof before accepting the random number.",
    explanation: "Neither miners, node operators, nor users can predict or bias the resulting random value.",
    hint: "Generates randomness off-chain with cryptographic proofs verified by the smart contract.",
    level: "Expert",
    codeExample: `// Chainlink VRF:
// requestRandomWords() ➔ Chainlink Node returns (randomValue, cryptographicProof) ➔ Verified On-Chain ✔`
  },
  {
    id: 11,
    question: "What is a Denial of Service (DoS) with Failed Call / Unexpected Revert (SWC-113)?",
    shortAnswer: "If a contract iterates through an array of addresses to pay them sequentially (e.g., `for (user in users) { user.transfer(amount); }`), a malicious user can implement a fallback function that intentionally reverts. When the loop hits the attacker, the entire transaction reverts, freezing payouts for all users permanently.",
    explanation: "Mitigated by replacing Push Payments with the Pull Payment (Withdrawal) pattern.",
    hint: "A single reverting address in a loop blocks execution for all other users; solved by Pull Payments.",
    level: "Moderate",
    codeExample: `// Vulnerable Push:
// for (address r : recipients) { r.transfer(share); } (One revert halts everything! ❌)
// Secure Pull:
// function withdraw() external { uint share = shares[msg.sender]; shares[msg.sender] = 0; payable(msg.sender).transfer(share); } ✔`
  },
  {
    id: 12,
    question: "What is the Delegatecall Injection Vulnerability (SWC-112) in proxy contracts (e.g., Parity Multi-Sig Hack)?",
    shortAnswer: "`delegatecall` executes code from a target contract but runs it within the context (storage layout and msg.sender) of the CALLING contract. If an attacker can manipulate the target address or invoke uninitialized implementation contracts, they can overwrite the proxy's storage slots (like `owner` variable) or destroy the logic contract with `selfdestruct`.",
    explanation: "The Parity Multi-Sig Hack (2017) froze 513,000 ETH ($300M) when a user accidentally initialized and killed the shared library contract.",
    hint: "delegatecall executes external code inside the caller's storage context; uninitialized logic contracts can be hijacked.",
    level: "Expert",
    codeExample: `// Delegatecall Storage Collision:
// Vulnerable Proxy calls: target.delegatecall(msg.data)
// Malicious logic overwrites slot 0 (which happens to be the 'owner' variable in the proxy!)`
  },
  {
    id: 13,
    question: "What is Unchecked Call Return Value (SWC-104) and how does it lead to silent execution failure?",
    shortAnswer: "Low-level calls (`addr.call{value: x}(\"\")` or `token.transfer()`) return a boolean (`bool success`) rather than automatically reverting on failure. If the contract ignores the return value, execution proceeds as if the transfer succeeded, leading to accounting inconsistencies.",
    explanation: "Always check `require(success, 'Transfer failed')` or use OpenZeppelin `SafeERC20`.",
    hint: "Ignoring boolean return values from low-level calls allows code to proceed even when transfers fail.",
    level: "Basic",
    codeExample: `// Unchecked Low-Level Call:
// target.call{value: 10}(""); (Silent failure if recipient out-of-gas! ❌)
// Secure:
// (bool ok, ) = target.call{value: 10}(""); require(ok, "ETH transfer failed"); ✔`
  },
  {
    id: 14,
    question: "What is Cross-Function Reentrancy and how does it bypass single-function mutex locks?",
    shortAnswer: "When two different functions share and manipulate the same state variables (e.g., `withdraw()` and `transfer()`). An attacker calls `withdraw()`, and in their fallback function, they call `transfer()` to move their un-deducted balance to a second wallet before `withdraw()` finishes updating the balance.",
    explanation: "Protected by applying `nonReentrant` across ALL functions that share state or following strict CEI in all functions.",
    hint: "Calling a second function that shares state variables before the first function completes its state updates.",
    level: "Expert",
    codeExample: `// Cross-Function Reentrancy:
// withdraw() starts → Calls Attacker Fallback → Fallback calls transfer(attacker_2, balance) → Balance moved twice!`
  },
  {
    id: 15,
    question: "What is Read-Only Reentrancy and how did it exploit the Curve Finance / Sentiment Protocol in 2023?",
    shortAnswer: "Occurs when a contract's view/read-only function (like `get_virtual_price()`) returns an artificially inflated/deflated value during the middle of a reentrant state transition. External lending protocols querying the view function get manipulated price metrics and allow over-borrowing.",
    explanation: "Even view functions must be protected with reentrancy locks if they expose transient intermediate state.",
    hint: "View functions returning incorrect intermediate values during a reentrancy execution loop.",
    level: "Expert",
    codeExample: `// Read-Only Reentrancy:
// Pool.remove_liquidity() → Calls fallback → Fallback borrows from Lending Protocol (which reads un-updated price) 🚨`
  },
  {
    id: 16,
    question: "What is Signature Replay Attack (SWC-121) and how do Nonces and Domain Separators (EIP-712) prevent it?",
    shortAnswer: "An attacker intercepts a valid off-chain signed message (e.g., 'Permit transfer of ₹50,000 to Bob') and submits it multiple times or replays it on a different blockchain fork. EIP-712 prevents this by embedding a unique sequence Nonce, Contract Address, and Chain ID into the hashed signature payload.",
    explanation: "Domain separators ensure signatures are valid only for a specific contract on a specific blockchain network.",
    hint: "Replaying valid signatures multiple times; prevented by tracking nonces and chain IDs in EIP-712.",
    level: "Moderate",
    codeExample: `// EIP-712 Domain Separator:
// hash = keccak256(abi.encode(DOMAIN_SEPARATOR, user, amount, nonce++, chainId))`
  },
  {
    id: 17,
    question: "What is Invariant Fuzz Testing (e.g., using Foundry / Echidna) in smart contract auditing?",
    shortAnswer: "A dynamic testing technique that generates millions of random pseudo-transaction sequences to test whether core system invariants (e.g., 'Total vault tokens == sum of all user balances' or 'Vault is never insolvent') can ever be broken under any sequence of calls.",
    explanation: "Invariant fuzzing uncovers complex multi-step edge cases that human manual review misses.",
    hint: "Generating millions of random transaction sequences to verify that core security rules never break.",
    level: "Expert",
    codeExample: `// Foundry Invariant Test:
// function invariant_vault_solvency() public { assert(address(vault).balance >= vault.totalSupply()); }`
  },
  {
    id: 18,
    question: "What is Slither and Mythril in automated static analysis of Solidity code?",
    shortAnswer: "Slither is a fast Python-based static analysis framework that parses Solidity Abstract Syntax Trees (AST) and Control Flow Graphs (CFG) to detect known vulnerabilities (reentrancy, shadow variables, uninitialized storage). Mythril uses symbolic execution to explore all reachable execution paths.",
    explanation: "Automated static analysis tools are mandatory CI/CD quality gates for blockchain projects.",
    hint: "Static analysis and symbolic execution tools for discovering Solidity vulnerabilities automatically.",
    level: "Moderate",
    codeExample: `// Running Slither:
// $ slither . --filter-paths "node_modules" ➔ Flags: Reentrancy in Vault.withdraw() (High Severity)`
  },
  {
    id: 19,
    question: "What is Upgradable Smart Contract Architecture (UUPS vs Transparent Proxy Pattern)?",
    shortAnswer: "Proxy patterns separate storage (Proxy Contract) from business logic (Implementation Contract). In Transparent Proxies, admin calls are routed to an admin contract to avoid function selector clashes. In UUPS (Universal Upgradeable Proxy Standard), the upgrade logic resides inside the implementation contract, saving deployment gas.",
    explanation: "Proxies allow updating bug-fixed logic while preserving the permanent contract address and user state.",
    hint: "Separates storage from logic contracts; Transparent Proxy uses an admin proxy, UUPS puts upgrade code in logic.",
    level: "Expert",
    codeExample: `// UUPS Upgrade:
// function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}`
  },
  {
    id: 20,
    question: "What is Storage Collision in Upgradable Proxy Contracts?",
    shortAnswer: "When an upgraded implementation contract modifies the order, type, or layout of state variables (e.g., inserting a new variable before existing ones). Because the proxy stores values by storage slot indices (0, 1, 2...), the new logic reads old data from the wrong slots, corrupting contract balances and permissions.",
    explanation: "Mitigated by appending new variables strictly at the end or using ERC-7201 Namespaced Storage Layouts.",
    hint: "Altering variable ordering in upgraded contracts causes values to be read from wrong storage slots.",
    level: "Expert",
    codeExample: `// Storage Collision Bug:
// V1: slot 0: owner, slot 1: balance
// V2: slot 0: isPaused, slot 1: owner (Owner variable corrupted by isPaused boolean! 🚨)`
  },
  {
    id: 21,
    question: "What is Gas Limit Denial of Service (Block Gas Limit DoS) in Solidity loops?",
    shortAnswer: "If a function executes an unbounded dynamic loop over an array that grows infinitely (e.g., `for (uint i=0; i < users.length; i++)`), the total gas required to execute the loop eventually exceeds the maximum Ethereum Block Gas Limit (30 million gas), rendering the function permanently un-callable.",
    explanation: "Avoid unbounded loops; paginate array processing or use mapping lookups.",
    hint: "Unbounded loops whose gas consumption exceeds the block gas limit, freezing execution forever.",
    level: "Moderate",
    codeExample: `// Gas Limit DoS:
// If users.length = 50,000 ➔ Gas needed = 45,000,000 (> 30M Block Limit) ➔ Function FROZEN FOREVER! 🚨`
  },
  {
    id: 22,
    question: "What is Short Address / Parameter Padding Attack in low-level ABI decoding?",
    shortAnswer: "When an attacker passes a truncated Ethereum address (e.g., 19 bytes instead of 20 bytes) to a transfer function. The EVM automatically zero-pads the end of the calldata to align 32-byte words, causing the trailing amount parameter to shift left by 8 bits, unintentionally multiplying the transferred amount by 256.",
    explanation: "Mitigated by strict calldata length checks (`require(msg.data.length == expected_size)`).",
    hint: "Passing truncated addresses causes EVM zero-padding to multiply transaction transfer amounts by 256.",
    level: "Expert",
    codeExample: `// Short Address Shift:
// Send 19-byte address → Calldata padded with zeros → Amount: 1.0 ETH shifted becomes 256.0 ETH! 🚨`
  },
  {
    id: 23,
    question: "What is Selfdestruct / Force-Feeding Ether Attack (SWC-132) and why is relying on `address(this).balance` dangerous?",
    shortAnswer: "A contract cannot refuse incoming ETH sent via `selfdestruct(target)` or block mining coinbase rewards. If a contract's logic relies on `require(address(this).balance == totalDeposits)`, an attacker can force-feed 1 wei of ETH via `selfdestruct`, permanently breaking equality invariants and locking the contract.",
    explanation: "Always track balances internally via state variables rather than checking raw `address(this).balance`.",
    hint: "Forcing ETH into a contract via selfdestruct to break strict balance equality invariants.",
    level: "Moderate",
    codeExample: `// Vulnerable Invariant:
// require(address(this).balance == totalShares * price); (Broken by force-feeding 1 wei of ETH! ❌)`
  },
  {
    id: 24,
    question: "What is Time-Lock Controller (Timelock) in decentralized governance security?",
    shortAnswer: "A smart contract that enforces a mandatory delay (e.g., 48 hours) between when a governance proposal or emergency admin action is queued and when it can be executed. This gives users time to audit the proposed changes and withdraw funds if a malicious upgrade is scheduled.",
    explanation: "Timelocks eliminate sudden rug-pulls by compromised admin keys.",
    hint: "Enforces a mandatory 48-hour delay before administrative or upgrade actions can be executed.",
    level: "Basic",
    codeExample: `// Timelock Flow:
// Admin calls queueTransaction(UpgradeToV2) ➔ 48-Hour Timer Starts ➔ Users review code ➔ executeTransaction()`
  },
  {
    id: 25,
    question: "What is Multi-Signature (Multi-Sig) Vault Governance (e.g., Gnosis Safe / Safe)?",
    shortAnswer: "A smart contract wallet requiring $M$-of-$N$ authorized cryptographic signatures (e.g., 3 out of 5 core engineers) to execute any transaction or contract upgrade. This prevents a single compromised laptop or phishing attack from seizing control of the protocol.",
    explanation: "Multi-sigs are the industry standard for protocol treasury management and ownership roles.",
    hint: "Requires M-of-N signatures (e.g., 3 of 5) to execute transactions or upgrades.",
    level: "Basic",
    codeExample: `// Multi-Sig Requirement:
// Propose Transfer ₹50,00,000 → Signed by Susmita (1/3) → Signed by Debangshu (2/3) → Signed by Mamata (3/3) ➔ EXECUTED ✔`
  },
  {
    id: 26,
    question: "What is Function Selector Collision Attack in Solidity?",
    shortAnswer: "The EVM identifies functions using the first 4 bytes of their Keccak-256 hash (e.g., `bytes4(keccak256('transfer(address,uint256)'))`). Because 4 bytes has only $2^{32}$ combinations, an attacker can find two different function signatures that produce the identical 4-byte selector, tricking proxy routers into calling unintended functions.",
    explanation: "Modern Solidity compilers check and revert if two functions produce identical 4-byte selectors.",
    hint: "Finding two different function signatures that share the same 4-byte Keccak hash selector.",
    level: "Expert",
    codeExample: `// 4-Byte Collision:
// keccak256("permit(...)")[:4] == keccak256("malicious_proxy_override(...)")[:4] ➔ Execution hijacked!`
  },
  {
    id: 27,
    question: "What is Transient Storage (EIP-1153) in EVM Cancun Hard Fork and how does it optimize ReentrancyGuards?",
    shortAnswer: "Transient storage introduces `TSTORE` and `TLOAD` opcodes that store data in memory that persists only for the duration of a single transaction and is discarded after, costing only 100 gas compared to 20,000 gas for permanent `SSTORE` storage. This reduces reentrancy lock gas costs by 95%.",
    explanation: "Transient storage makes reentrancy protection virtually free in gas consumption.",
    hint: "Temporary storage opcodes (TSTORE/TLOAD) that discard data after the transaction, reducing reentrancy gas costs by 95%.",
    level: "Expert",
    codeExample: `// Transient Storage Mutex:
// assembly { tstore(MUTEX_SLOT, 1) } → execute() → assembly { tstore(MUTEX_SLOT, 0) } (Only 100 gas!)`
  },
  {
    id: 28,
    question: "What is Automated Circuit Breaker / Pausability (`Pausable` pattern)?",
    shortAnswer: "An emergency state variable (`paused = true`) controlled by security multi-sigs or automated monitoring bots (e.g., Forta / OpenZeppelin Defender). When abnormal outflow spikes or exploit patterns are detected, the circuit breaker instantly halts deposits, borrows, and withdrawals across the protocol.",
    explanation: "Circuit breakers minimize financial loss during an active zero-day exploit.",
    hint: "Emergency freeze mechanism that halts all protocol transfers when an active attack is detected.",
    level: "Basic",
    codeExample: `// Pausable Modifier:
// function withdraw() external whenNotPaused { ... }`
  },
  {
    id: 29,
    question: "In the Salt Lake Sector V FinTech case study, an automated audit uncovered a hidden Reentrancy flaw in a staking vault holding ₹35,00,00,000. How did the engineers fix the code without redeploying the permanent contract address?",
    shortAnswer: "Because the vault was deployed using an OpenZeppelin UUPS Upgradeable Proxy, the engineers: 1. Audited a new implementation contract applying the Checks-Effects-Interactions (CEI) pattern and `ReentrancyGuard`; 2. Verified storage slot layout compatibility using Slither; 3. Executed an on-chain proxy upgrade authorized via a 3-of-5 Gnosis Safe multi-sig with a 24-hour timelock.",
    explanation: "The UUPS proxy allowed seamless patching of the logic contract while preserving all user balances and the original contract address.",
    hint: "Upgraded the implementation logic contract via UUPS proxy and multi-sig authorization while keeping user balances intact.",
    level: "Expert",
    codeExample: `// Safe UUPS Upgrade Flow:
// Multi-Sig signs upgradeToAndCall(NewLogicV2Address) ➔ State preserved, Reentrancy vulnerability patched ✔`
  },
  {
    id: 30,
    question: "Write out the comprehensive technical blueprint for Building and Auditing a Battle-Hardened Smart Contract Protocol.",
    shortAnswer: "1. Architecture: Strict Checks-Effects-Interactions (CEI) pattern + OpenZeppelin `ReentrancyGuard` + `SafeERC20`. 2. Oracles: Chainlink Decentralized Aggregators + Uniswap v3 TWAP fallback (zero raw spot prices). 3. Access Control: `msg.sender` validation + Gnosis Safe 3-of-5 Multi-Sig + 48-Hour Timelock + Emergency Pausable circuit breakers. 4. Automated Testing: 100% unit test branch coverage + Foundry invariant fuzzing + Slither/Mythril static analysis. 5. External Audit: Dual independent third-party audits and bug bounty program.",
    explanation: "This layered defense-in-depth framework prevents reentrancy, oracle manipulation, arithmetic bugs, and centralized rug-pulls.",
    hint: "CEI pattern, ReentrancyGuard, Chainlink oracles, Multi-Sig timelocks, Foundry invariant fuzzing, and dual audits.",
    level: "Expert",
    codeExample: `// Battle-Hardened Contract Template:
// contract TreasuryVault is ReentrancyGuard, Pausable, Ownable2Step {
//   function withdraw() external nonReentrant whenNotPaused { ... CEI logic ... }
// }`
  }
];

export default questions;
