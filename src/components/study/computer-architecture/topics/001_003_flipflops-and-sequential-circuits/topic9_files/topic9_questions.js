// Question Bank for Topic 9: JK Flip-Flop (Improved SR FF): Toggle condition, elimination of invalid state, race-around condition and its solution
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the fundamental limitation of the SR Flip-Flop that necessitated the invention of the JK Flip-Flop?",
    "shortAnswer": "The invalid/undefined state when both S=1 and R=1 are asserted simultaneously.",
    "explanation": "In an SR Flip-Flop, setting S=1 and R=1 simultaneously forces both outputs Q and Q_bar to the same logic level (0 for NOR, 1 for NAND), violating the fundamental requirement that Q and Q_bar be complementary. When inputs transition back to 0,0, gate propagation delays cause an unpredictable race condition.",
    "hint": "Think about what happens when Set and Reset are commanded at the exact same moment.",
    "level": "basic",
    "codeExample": "// SR Flip-Flop Invalid State Hazard:\n// S=1, R=1 => Q = 0, Q_bar = 0 (NOR Latch) -> INVALID!\n// Transition to S=0, R=0 => Race Condition determines final state."
  },
  {
    "question": "How does the internal architecture of a JK Flip-Flop eliminate the invalid state hazard of the SR Flip-Flop?",
    "shortAnswer": "By cross-coupling feedback from Q_bar into the J steering gate and Q into the K steering gate.",
    "explanation": "In a JK Flip-Flop, the steering NAND gates have 3 inputs instead of 2. The J input is ANDed with Q_bar and CLK, while the K input is ANDed with Q and CLK. This feedback ensures that when J=1 and K=1, only the gate corresponding to the currently inactive output is enabled, converting the invalid condition into a deterministic Toggle state (Q_next = Q_bar).",
    "hint": "Trace how the complementary output Q_bar is connected back to the J input gate.",
    "level": "moderate",
    "codeExample": "// Internal Steering Gate Logic for JK Flip-Flop:\nwire S_internal = ~(J & clk & q_bar);\nwire R_internal = ~(K & clk & q);"
  },
  {
    "question": "What is the output state of a JK Flip-Flop when J = 1 and K = 1 upon the active clock trigger?",
    "shortAnswer": "Toggle Mode: The output inverts its previous state (Q_next = Q_bar).",
    "explanation": "When J=1 and K=1, the JK Flip-Flop operates in Toggle mode. If Q was 0, it becomes 1; if Q was 1, it becomes 0. This toggle capability allows the JK Flip-Flop to function as a divide-by-2 frequency divider and serves as the building block for digital counters.",
    "hint": "Toggle means inverting the current binary bit.",
    "level": "basic",
    "codeExample": "// Verilog HDL Toggle Behavior:\nalways @(posedge clk) begin\n  if (j && k) q <= ~q; // Toggle mode\nend"
  },
  {
    "question": "What is the Characteristic Equation of a JK Flip-Flop?",
    "shortAnswer": "Q(t+1) = J·Q_bar + K_bar·Q",
    "explanation": "The characteristic equation describes the next state Q(t+1) as a Boolean function of current inputs J, K and current state Q. Derived from K-Map minimization of the JK truth table, Q(t+1) = J·Q_bar + K_bar·Q.",
    "hint": "Combine Set condition (J AND Q_bar) with Hold condition (NOT K AND Q).",
    "level": "moderate",
    "codeExample": "// Characteristic Equation Verification:\n// J=0, K=0 => Q(t+1) = 0·Q_bar + 1·Q = Q (Hold)\n// J=1, K=0 => Q(t+1) = 1·Q_bar + 1·Q = Q_bar + Q = 1 (Set)\n// J=0, K=1 => Q(t+1) = 0·Q_bar + 0·Q = 0 (Reset)\n// J=1, K=1 => Q(t+1) = 1·Q_bar + 0·Q = Q_bar (Toggle)"
  },
  {
    "question": "What is the Race-Around Condition in a level-triggered JK Flip-Flop?",
    "shortAnswer": "Uncontrolled continuous output oscillation occurring when J=1, K=1 and clock pulse width t_p exceeds propagation delay t_pd.",
    "explanation": "When J=1, K=1 and CLK=1 for a duration t_p greater than the gate propagation delay t_pd, the output Q toggles after t_pd. But since CLK is still HIGH, the new Q propagates back to the inputs and toggles Q again, oscillating repeatedly between 0 and 1 until CLK drops LOW, leaving Q in an unpredictable state.",
    "hint": "Occurs when the clock pulse stays HIGH longer than it takes for the flip-flop to flip.",
    "level": "expert",
    "codeExample": "// Condition for Race-Around Hazard:\n// t_pulse (clock width) > t_pd (flip-flop propagation delay)  [With J=1, K=1 in Level-Triggered FF]"
  },
  {
    "question": "Which two design solutions eliminate the Race-Around Condition in JK Flip-Flops?",
    "shortAnswer": "1. Master-Slave JK Flip-Flop Architecture. 2. Edge-Triggered Clocking (or making t_p < t_pd).",
    "explanation": "The race-around condition requires CLK to remain HIGH while feedback propagates. Master-Slave architectures isolate input sampling (Master active when CLK=1) from output update (Slave active when CLK=0). Edge-triggered clocking narrows the sampling window to sub-nanoseconds, ensuring t_p < t_pd.",
    "hint": "Think about splitting the flip-flop into two cascaded stages or using edge transitions.",
    "level": "moderate",
    "codeExample": "// Master-Slave Isolation:\n// Stage 1 (Master): Captures J & K when CLK = 1\n// Stage 2 (Slave) : Updates Q & Q_bar when CLK drops to 0"
  },
  {
    "question": "What is the Excitation Table entry for a JK Flip-Flop when transitioning from Q(t)=0 to Q(t+1)=1?",
    "shortAnswer": "J = 1, K = X (Don't Care).",
    "explanation": "To transition from 0 to 1, we can either Set the flip-flop (J=1, K=0) or Toggle it (J=1, K=1). In both cases, J must be 1, while K can be either 0 or 1 (Don't Care X).",
    "hint": "Determine which J input is required and whether K affects the 0->1 transition.",
    "level": "moderate",
    "codeExample": "// Excitation Table Summary:\n// Q(t) -> Q(t+1) |  J  K\n//   0   ->   0   |  0  X\n//   0   ->   1   |  1  X  <-- (J must be 1, K is Don't Care)\n//   1   ->   0   |  X  1\n//   1   ->   1   |  X  0"
  },
  {
    "question": "What is the Excitation Table entry for a JK Flip-Flop when transitioning from Q(t)=1 to Q(t+1)=0?",
    "shortAnswer": "J = X (Don't Care), K = 1.",
    "explanation": "To transition from 1 to 0, we can either Reset the flip-flop (J=0, K=1) or Toggle it (J=1, K=1). In both cases, K must be 1, while J can be either 0 or 1 (Don't Care X).",
    "hint": "Reset requires K=1; Toggle also requires K=1.",
    "level": "moderate",
    "codeExample": "// Transition 1 -> 0:\n// Reset Mode : J=0, K=1\n// Toggle Mode: J=1, K=1\n// Combined   : J=X, K=1"
  },
  {
    "question": "Why is the JK Flip-Flop referred to as a 'Universal Flip-Flop'?",
    "shortAnswer": "Because all other types of flip-flops (SR, D, T) can be constructed from a JK Flip-Flop by configuring its inputs.",
    "explanation": "A JK Flip-Flop can emulate an SR Flip-Flop directly (J=S, K=R), a D Flip-Flop (connect K = ~J through an inverter), or a T Flip-Flop (tie J = K = T). This versatility makes it the universal building block of sequential logic.",
    "hint": "Think about converting JK into D (using an inverter) or T (tying inputs together).",
    "level": "basic",
    "codeExample": "// Conversions from JK Flip-Flop:\n// D Flip-Flop : J = D, K = ~D\n// T Flip-Flop : J = T, K = T\n// SR Flip-Flop: J = S, K = R (avoiding S=R=1)"
  },
  {
    "question": "How does a JK Flip-Flop function as a frequency divider?",
    "shortAnswer": "When J=1 and K=1, the output Q toggles once per clock period, generating a square wave with half the frequency (f_out = f_clk / 2).",
    "explanation": "In Toggle mode (J=K=1), output Q requires two clock pulses to complete one full cycle (0->1->0). Thus, the frequency of output Q is exactly half the clock frequency (f_out = f_clk / 2), and the period is doubled (T_out = 2 · T_clk).",
    "hint": "Count how many clock pulses are needed for Q to complete one full 0->1->0 cycle.",
    "level": "basic",
    "codeExample": "// Frequency Division:\n// f_CLK = 100 MHz\n// f_Q   = 50 MHz (Divide-by-2 output)"
  },
  {
    "question": "In IC 7476 Dual JK Flip-Flop, what is the role of active-LOW Preset (PRE_n) and Clear (CLR_n) pins?",
    "shortAnswer": "They are asynchronous inputs that force Q=1 (Preset) or Q=0 (Clear) immediately, overriding clock and JK inputs.",
    "explanation": "Asynchronous PRE_n and CLR_n inputs bypass the clock-triggered logic. Holding PRE_n LOW forces Q=1; holding CLR_n LOW forces Q=0. They are used for power-on reset and system initialization.",
    "hint": "Asynchronous controls take precedence over clock pulses.",
    "level": "basic",
    "codeExample": "// Asynchronous Overrides in 7476:\n// PRE_n = 0, CLR_n = 1 => Q = 1 immediately\n// PRE_n = 1, CLR_n = 0 => Q = 0 immediately\n// PRE_n = 0, CLR_n = 0 => Invalid state!"
  },
  {
    "question": "How many 3-input steering NAND gates and 2-input storage NAND gates are used to build a basic gated JK Flip-Flop?",
    "shortAnswer": "Two 3-input NAND gates for input steering and two 2-input NAND gates for cross-coupled storage.",
    "explanation": "A standard gated JK Flip-Flop consists of 4 NAND gates total: Steering NAND 1 (inputs: J, CLK, Q_bar), Steering NAND 2 (inputs: K, CLK, Q), and Storage NAND 3 & 4 arranged as a cross-coupled SR latch.",
    "hint": "Count the gates in the classic 4-NAND JK schematic.",
    "level": "moderate",
    "codeExample": "// 4-NAND Gate Connections:\n// Gate 1: S_bar = ~(J & CLK & Q_bar)\n// Gate 2: R_bar = ~(K & CLK & Q)\n// Gate 3: Q     = ~(S_bar & Q_bar)\n// Gate 4: Q_bar = ~(R_bar & Q)"
  },
  {
    "question": "If a 4-bit asynchronous ripple counter is built using four cascaded negative-edge triggered JK Flip-Flops in Toggle mode (J=K=1), what is the modulus of the counter?",
    "shortAnswer": "MOD-16 (counts 0 to 15 in binary, dividing frequency by 2^4 = 16).",
    "explanation": "Cascading N flip-flops in toggle mode where each Q output clocks the next stage creates a MOD-2^N binary counter. For N=4 flip-flops, the total number of distinct states is 2^4 = 16 (0000 to 1111).",
    "hint": "Calculate 2^N for N = 4 stages.",
    "level": "moderate",
    "codeExample": "// 4-Bit Ripple Counter Output Frequency:\n// f_Q0 = f_clk / 2\n// f_Q1 = f_clk / 4\n// f_Q2 = f_clk / 8\n// f_Q3 = f_clk / 16"
  },
  {
    "question": "What is the primary disadvantage of an asynchronous (ripple) counter built from JK Flip-Flops compared to a synchronous counter?",
    "shortAnswer": "Accumulated propagation delay across cascaded flip-flops causes timing glitches and limits maximum operating frequency.",
    "explanation": "In a ripple counter, each stage's clock is driven by the output of the previous stage. The total propagation delay accumulates (N · t_pd). At high frequencies, intermediate transient states appear on the bus (glitches), whereas synchronous counters trigger all flip-flops simultaneously from a shared global clock.",
    "hint": "Think about delays adding up sequentially from stage to stage.",
    "level": "expert",
    "codeExample": "// Total Delay in Asynchronous Counter:\n// t_total = N * t_pd_ff\n// Max frequency: f_max < 1 / (N * t_pd_ff)"
  },
  {
    "question": "In a Master-Slave JK Flip-Flop, when is the data sampled from J and K inputs, and when is the output Q updated?",
    "shortAnswer": "Data is sampled by the Master stage when CLK=1; output Q is updated by the Slave stage on the falling edge (CLK 1->0).",
    "explanation": "While CLK=1, the Master latch is active and captures inputs J and K while the Slave latch is disabled. When CLK transitions from 1 to 0, the Master latch locks its state, and the Slave latch becomes active, transferring the Master's state to output Q.",
    "hint": "Master operates on CLK High; Slave operates when CLK goes Low.",
    "level": "moderate",
    "codeExample": "// Master-Slave 2-Phase Clock Operation:\n// CLK = 1: Master ON  | Slave OFF (Sampling J/K into Master)\n// CLK = 0: Master OFF | Slave ON  (Transferring Master state to Q)"
  },
  {
    "question": "What happens if J=1, K=0 and the clock is pulsed on a JK Flip-Flop initially storing Q=0?",
    "shortAnswer": "Output Q changes to 1 (Set State).",
    "explanation": "J represents Set (equivalent to S in SR flip-flop). With J=1 and K=0, the clock pulse forces Q from 0 to 1.",
    "hint": "J acts as the Set command.",
    "level": "basic",
    "codeExample": "// Set Operation:\n// Initial Q=0, J=1, K=0 -> posedge CLK -> Q=1"
  },
  {
    "question": "What happens if J=0, K=1 and the clock is pulsed on a JK Flip-Flop initially storing Q=1?",
    "shortAnswer": "Output Q changes to 0 (Reset State).",
    "explanation": "K represents Clear/Reset (equivalent to R in SR flip-flop). With J=0 and K=1, the clock pulse forces Q from 1 to 0.",
    "hint": "K acts as the Reset command.",
    "level": "basic",
    "codeExample": "// Reset Operation:\n// Initial Q=1, J=0, K=1 -> posedge CLK -> Q=0"
  },
  {
    "question": "What happens if J=0, K=0 and the clock is pulsed on a JK Flip-Flop?",
    "shortAnswer": "No Change: Output Q retains its previous state Q(t).",
    "explanation": "With J=0 and K=0, both steering gates remain disabled (S_bar=1, R_bar=1), keeping the cross-coupled NAND latch in its quiescent Hold state.",
    "hint": "Both inputs disabled means memory retention.",
    "level": "basic",
    "codeExample": "// Hold Operation:\n// J=0, K=0 -> posedge CLK -> Q(t+1) = Q(t)"
  },
  {
    "question": "In Verilog HDL, how is a positive-edge triggered JK Flip-Flop with asynchronous active-LOW reset modeled?",
    "shortAnswer": "Using an always block sensitive to (posedge clk or negedge rst_n).",
    "explanation": "The sensitivity list includes `posedge clk` for clock-triggered updates and `negedge rst_n` for immediate asynchronous reset.",
    "hint": "Asynchronous reset must be included in the always block sensitivity list.",
    "level": "moderate",
    "codeExample": "// Verilog HDL Code:\nalways @(posedge clk or negedge rst_n) begin\n  if (!rst_n)\n    q <= 1'b0;\n  else case ({j, k})\n    2'b00: q <= q;\n    2'b01: q <= 1'b0;\n    2'b10: q <= 1'b1;\n    2'b11: q <= ~q;\n  endcase\nend"
  },
  {
    "question": "What is 'ones-catching' phenomenon in Master-Slave JK Flip-Flops?",
    "shortAnswer": "An undesirable behavior where a brief noise spike (1) on J or K while CLK=1 sets the Master stage permanently until the clock drops.",
    "explanation": "In level-sensitive Master-Slave JK flip-flops, if a transient noise glitch occurs on J or K while CLK is HIGH, the Master latch captures it and cannot un-catch it, leading to incorrect output state when the Slave updates on the falling edge.",
    "hint": "A glitch occurring while CLK is High gets trapped inside the Master stage.",
    "level": "expert",
    "codeExample": "// Ones-Catching Hazard:\n// CLK=1, J glitches 0->1->0 for 1ns => Master latch sets Q_master=1 permanently!"
  },
  {
    "question": "How do modern edge-triggered JK Flip-Flops eliminate the 'ones-catching' problem of older Master-Slave designs?",
    "shortAnswer": "By narrowing the data sampling aperture to sub-nanosecond edge transitions using internal edge-detector logic.",
    "explanation": "Modern edge-triggered flip-flops use internal pulse generators or 6-NAND topologies that evaluate inputs ONLY during the brief setup/hold window around the clock edge, ignoring mid-pulse glitches.",
    "hint": "Edge triggering restricts sampling to transition moments.",
    "level": "expert",
    "codeExample": "// Edge-Triggered Aperture:\n// Sampling window = t_su + t_h (e.g. 0.5 ns around clock edge)"
  },
  {
    "question": "To design a Synchronous Mod-6 Counter using JK Flip-Flops, how many flip-flops are required?",
    "shortAnswer": "3 JK Flip-Flops (2^2 = 4 < 6 <= 2^3 = 8).",
    "explanation": "The number of flip-flops N required to count up to M states must satisfy 2^(N-1) < M <= 2^N. For M=6 states, N=3 flip-flops are required since 2^3 = 8 >= 6.",
    "hint": "Find the smallest power of 2 that is greater than or equal to 6.",
    "level": "moderate",
    "codeExample": "// N = 3 Flip-Flops -> 8 total possible states (0 to 7)\n// Truncation logic resets counter when state reaches 6 (110_2)."
  },
  {
    "question": "Who invented the JK Flip-Flop, and what do the letters 'J' and 'K' historically represent?",
    "shortAnswer": "Invented by Jack Kilby (Texas Instruments); J stands for Jump (Set) and K stands for Kill (Reset).",
    "explanation": "Jack Kilby, co-inventor of the integrated circuit at Texas Instruments, designed the JK flip-flop in the late 1950s. The letters J and K were selected in honor of Jack Kilby and to distinguish the new inputs from S and R.",
    "hint": "Named after the pioneer of the Integrated Circuit (IC).",
    "level": "basic",
    "codeExample": "// Historical Origin:\n// Jack Kilby (Texas Instruments, 1958)\n// J = Jump (Set Q=1), K = Kill (Reset Q=0)"
  },
  {
    "question": "What happens if you connect J=1 and K=1 on a JK Flip-Flop and feed a 10 MHz clock signal into CLK?",
    "shortAnswer": "The Q output generates a 5 MHz square wave with a 50% duty cycle.",
    "explanation": "In Toggle mode, output Q inverts on every active clock edge. Two clock cycles produce one full HIGH-LOW period on Q, yielding f_out = 10 MHz / 2 = 5 MHz.",
    "hint": "Divide the input frequency by 2.",
    "level": "basic",
    "codeExample": "// Output Calculation:\n// f_out = 10 MHz / 2 = 5 MHz\n// Period T_out = 1 / 5 MHz = 200 ns"
  },
  {
    "question": "In a JK Flip-Flop excitation table, what are the values of J and K required for the transition Q(t)=1 to Q(t+1)=1?",
    "shortAnswer": "J = X (Don't Care), K = 0.",
    "explanation": "To maintain Q=1, we can either Hold state (J=0, K=0) or Set state (J=1, K=0). In both cases, K must be 0, while J can be either 0 or 1 (Don't Care X).",
    "hint": "Check Hold (0,0) and Set (1,0) combinations.",
    "level": "moderate",
    "codeExample": "// Q: 1 -> 1\n// Hold: J=0, K=0\n// Set : J=1, K=0\n// Result: J=X, K=0"
  },
  {
    "question": "In a JK Flip-Flop excitation table, what are the values of J and K required for the transition Q(t)=0 to Q(t+1)=0?",
    "shortAnswer": "J = 0, K = X (Don't Care).",
    "explanation": "To maintain Q=0, we can either Hold state (J=0, K=0) or Reset state (J=0, K=1). In both cases, J must be 0, while K can be either 0 or 1 (Don't Care X).",
    "hint": "Check Hold (0,0) and Reset (0,1) combinations.",
    "level": "moderate",
    "codeExample": "// Q: 0 -> 0\n// Hold : J=0, K=0\n// Reset: J=0, K=1\n// Result: J=0, K=X"
  },
  {
    "question": "How can a T Flip-Flop be constructed from a JK Flip-Flop?",
    "shortAnswer": "By tying the J and K inputs together to form a single T input (J = K = T).",
    "explanation": "When J = K = T, if T=0, J=K=0 (Hold mode Q_next = Q). If T=1, J=K=1 (Toggle mode Q_next = Q_bar). Thus, tying J and K together creates a T (Toggle) flip-flop.",
    "hint": "Connect both inputs J and K to the same signal wire.",
    "level": "basic",
    "codeExample": "// T Flip-Flop from JK:\nwire T_input;\nassign J = T_input;\nassign K = T_input;"
  },
  {
    "question": "How can a D Flip-Flop be constructed from a JK Flip-Flop?",
    "shortAnswer": "By connecting D directly to J, and connecting inverted D (~D) through an inverter to K.",
    "explanation": "Setting J = D and K = ~D ensures that when D=1, J=1, K=0 (Set Q=1), and when D=0, J=0, K=1 (Reset Q=0). The J=K=0 and J=K=1 conditions are eliminated, creating a D (Data) flip-flop.",
    "hint": "Pass D to J and inverted D to K.",
    "level": "basic",
    "codeExample": "// D Flip-Flop from JK:\nassign J = D;\nassign K = ~D;"
  },
  {
    "question": "Why is the Master-Slave JK Flip-Flop pulse-triggered (level-sensitive master) rather than edge-triggered?",
    "shortAnswer": "Because the Master stage remains transparent and active throughout the entire CLK HIGH pulse width.",
    "explanation": "In classic Master-Slave JK flip-flops (like IC 7476), the Master latch is level-sensitive during CLK=1. This makes it vulnerable to ones-catching glitches. Modern ICs use true edge-triggered flip-flops instead.",
    "hint": "Recall that master stage uses clock level rather than sub-nanosecond edge.",
    "level": "expert",
    "codeExample": "// Difference between Master-Slave and Edge-Triggered FF:\n// Master-Slave: Active throughout CLK=1 duration\n// Edge-Triggered: Active ONLY during 0->1 transition (sub-nanosecond)"
  },
  {
    "question": "In summary, why is the JK Flip-Flop considered the ultimate improvement over the basic SR Flip-Flop in sequential digital architecture?",
    "shortAnswer": "Because it completely eliminates the SR invalid state hazard, converts it into a deterministic Toggle function, and enables frequency division and counter synthesis.",
    "explanation": "By incorporating cross-coupled feedback from Q and Q_bar into the steering logic, the JK Flip-Flop resolves the dangerous SR invalid state (S=1, R=1). It introduces the Toggle mode (J=1, K=1), making it the universal foundation for counters, shift registers, and frequency dividers in modern digital systems.",
    "hint": "Focus on turning an invalid hazard into a deterministic toggle operation.",
    "level": "basic",
    "codeExample": "// The Evolutionary Milestone:\n// SR Hazard (S=1,R=1 => Invalid) ===[ Feedback Steering ]===> JK Advantage (J=1,K=1 => Toggle)"
  }
];

export default questions;
