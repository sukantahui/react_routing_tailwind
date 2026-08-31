// Question Bank for Topic 6: Level-Sensitive vs Edge-Triggered Devices: Positive edge, negative edge, timing diagram comparison, why edge triggering is important
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the primary difference between a level-sensitive latch and an edge-triggered flip-flop?",
    "shortAnswer": "A latch is transparent throughout the clock pulse level, whereas a flip-flop samples input only at voltage transitions (edges).",
    "explanation": "A level-sensitive latch allows data to pass from input D to output Q continuously whenever the enable/clock signal is at an active voltage level (transparent state). In contrast, an edge-triggered flip-flop captures the input state exclusively during the sub-nanosecond rising or falling edge of the clock signal, holding that state constant for the remainder of the clock period.",
    "hint": "Think about transparency across time duration versus an instantaneous snapshot at a transition point.",
    "level": "basic",
    "codeExample": "// Verilog behavioral models showing level-sensitive vs edge-triggered logic:\nalways @(enable or d) // Level-sensitive latch (transparent when enable is High)\n  if (enable) q_latch <= d;\n\nalways @(posedge clk) // Positive edge-triggered flip-flop (samples D on rising edge only)\n  q_ff <= d;"
  },
  {
    "question": "What does the dynamic indicator symbol (a small right-pointing triangle '>') at a clock input pin specify in IEEE/ANSI standard logic symbols?",
    "shortAnswer": "It indicates that the device is edge-triggered rather than level-sensitive.",
    "explanation": "In IEEE standard logic symbols, a simple control block pin without a triangle represents level sensitivity. Adding a small triangle '>' inside the block boundary at the clock pin designates dynamic edge-triggering. If an inversion bubble 'o' precedes the triangle, it indicates negative-edge (falling edge) triggering.",
    "hint": "Look for the symbol distinguishing a D latch symbol from a D flip-flop symbol on schematics.",
    "level": "basic",
    "codeExample": "// IEEE Symbol Schematic Representation:\n// Pin CLK without '>'  ==> Level-Sensitive Latch\n// Pin >CLK            ==> Positive Edge-Triggered Flip-Flop\n// Pin o>CLK           ==> Negative Edge-Triggered Flip-Flop"
  },
  {
    "question": "Why does a level-triggered latch exhibit the 'transparency' property, and what risk does this create in feedback loops?",
    "shortAnswer": "Because Q continuously follows D while CLK is High, causing uncontrolled race-around oscillations in feedback paths.",
    "explanation": "When CLK=1, a positive level-sensitive latch acts like a closed switch (transparent). If output Q is fed back through combinational logic to input D, any change in Q will propagate back to D and alter Q again repeatedly while CLK stays High. This race-around condition leads to uncontrolled ring-oscillation or corrupted state.",
    "hint": "Consider what happens when a register tries to increment itself (Q_next = Q + 1) using a simple level latch.",
    "level": "moderate",
    "codeExample": "// Hazard scenario with level latch in feedback loop:\nalways @(clk or q)\n  if (clk) q <= ~q; // If clk pulse width t_w > t_pd, q toggles unpredictably multiple times!"
  },
  {
    "question": "How does positive-edge triggering differ from negative-edge triggering in sequential circuits?",
    "shortAnswer": "Positive-edge triggers sample data on LOW-to-HIGH (0 to 1) transitions; negative-edge triggers sample on HIGH-to-LOW (1 to 0) transitions.",
    "explanation": "Positive-edge (rising-edge) devices respond when the clock voltage crosses the threshold from logic 0 to logic 1. Negative-edge (falling-edge) devices respond when clock voltage drops from logic 1 to logic 0. Circuit designers select edge polarities to balance clock loading, reduce simultaneous switching noise, or double data throughput (e.g., DDR SDRAM memory).",
    "hint": "Identify the direction of voltage transition: 0 -> 1 versus 1 -> 0.",
    "level": "basic",
    "codeExample": "// Verilog HDL polarity specifications:\nalways @(posedge clk) // Positive edge trigger\n  q_pos <= d;\n\nalways @(negedge clk) // Negative edge trigger\n  q_neg <= d;"
  },
  {
    "question": "In a Master-Slave D Flip-Flop built from two cascaded latches, how is edge-triggering achieved structurally?",
    "shortAnswer": "The Master latch receives CLK while the Slave receives inverted CLK (~CLK), making them complementary transparent.",
    "explanation": "When CLK=0, the Master latch is transparent and tracks input D, while the Slave latch is isolated (opaque). At the rising edge (CLK: 0->1), the Master latch locks the current D value, and simultaneously the Slave latch becomes transparent, broadcasting the locked Master output to Q. Because Master and Slave are never transparent at the same time, direct input-to-output feedthrough is prevented.",
    "hint": "Recall the complementary gating of master and slave stages by inverted clock signals.",
    "level": "moderate",
    "codeExample": "// Structural concept of Master-Slave D Flip-Flop:\nwire master_q;\nd_latch master_stage (.enable(~clk), .d(d),        .q(master_q));\nd_latch slave_stage  (.enable(clk),  .d(master_q), .q(q));"
  },
  {
    "question": "What is the function of an internal pulse detector (RC differentiator or gate delay generator) in single-stage edge-triggered flip-flops?",
    "shortAnswer": "It converts a broad clock pulse into an ultra-narrow internal enable pulse corresponding to the clock edge.",
    "explanation": "Single-stage flip-flops (such as the classic edge-triggered D flip-flop) use an internal pulse generator made of an inverter chain and an AND gate. When CLK rises from 0 to 1, the gate delay of the inverter creates a brief window (e.g., 200 ps) where both inputs to the internal AND gate are HIGH. This ultra-narrow pulse enables the latching mechanism just long enough to capture D without staying open.",
    "hint": "An AND gate receiving CLK and an inverted, slightly delayed version of CLK creates a narrow spike.",
    "level": "moderate",
    "codeExample": "// Gate-delay positive-edge pulse generator concept:\nwire clk_bar;\nassign #2 clk_bar = ~clk; // 2 ns gate propagation delay\nwire internal_pulse = clk & clk_bar; // Active HIGH for 2 ns only after rising edge of clk"
  },
  {
    "question": "How are Setup Time (t_su) and Hold Time (t_h) defined for an edge-triggered flip-flop?",
    "shortAnswer": "t_su is the minimum time data must be stable BEFORE the clock edge; t_h is the time data must remain stable AFTER the clock edge.",
    "explanation": "For an edge-triggered flip-flop to reliably capture a binary value, input D must settle to a valid logic level at least t_su seconds before the active clock transition occurs, and must remain steady for at least t_h seconds after the edge. Violating either specification can cause the internal bistable node to enter metastability.",
    "hint": "Setup is the arrival lead-time before the edge; Hold is the persistence requirement after the edge.",
    "level": "basic",
    "codeExample": "// Timing Specification Window:\n//        [D must be stable] \n// ------|-------------------|-------> Time\n//    (edge - t_su)       (edge + t_h)"
  },
  {
    "question": "What happens to a sequential flip-flop when a setup or hold time constraint is violated?",
    "shortAnswer": "The flip-flop can enter a metastable state, oscillating at an intermediate voltage level before settling unpredictably.",
    "explanation": "When data changes during the setup-hold aperture window, the internal feedback cross-coupled gates receive insufficient energy to cleanly latch a 0 or 1. The output Q enters metastability—hovering at a non-Boolean voltage level (between V_IL and V_IH) for an indeterminate duration—potentially causing downstream logic failures.",
    "hint": "Metastability means the output is neither a clean 0 nor a clean 1.",
    "level": "moderate",
    "codeExample": "// Verilog timing check system tasks:\n$setup(data_in, posedge clk, t_su);\n$hold(posedge clk, data_in, t_h);"
  },
  {
    "question": "Given a synchronous system with Clock-to-Q delay t_cq = 1.2 ns, maximum combinational path delay t_comb = 4.5 ns, setup time t_su = 0.8 ns, and zero clock skew, what is the maximum operating frequency (f_max)?",
    "shortAnswer": "153.85 MHz (T_min = 1.2 + 4.5 + 0.8 = 6.5 ns; f_max = 1 / 6.5 ns).",
    "explanation": "The minimum required clock period T_min for synchronous reliability is given by T_min >= t_cq + t_comb + t_su - t_skew. Substituting values: T_min = 1.2 ns + 4.5 ns + 0.8 ns = 6.5 ns. Maximum frequency f_max = 1 / 6.5 ns = 153.846 MHz.",
    "hint": "Sum the total path delay (t_cq + t_comb + t_su) to find the minimum clock period T_min, then take the reciprocal.",
    "level": "expert",
    "codeExample": "// Max Frequency Calculation:\n// T_min = t_cq + t_comb + t_su = 1.2ns + 4.5ns + 0.8ns = 6.5ns\n// f_max = 1 / 6.5ns = 153.85 MHz"
  },
  {
    "question": "Why are CPU pipeline registers implemented using edge-triggered flip-flops instead of level-sensitive latches?",
    "shortAnswer": "To allow distinct instruction pipeline stages to advance simultaneously in lockstep without data bleeding through multiple stages.",
    "explanation": "In a 5-stage RISC processor pipeline (IF, ID, EX, MEM, WB), pipeline registers separate each stage. Edge-triggered flip-flops ensure that on each rising clock edge, Stage N transfers its output to Stage N+1 while simultaneously accepting new input from Stage N-1. If latches were used, the transparent enable phase would cause data to bleed uncontrollably through multiple pipeline stages in a single clock cycle.",
    "hint": "Pipeline registers act as strict barriers that open for only a fraction of a nanosecond.",
    "level": "moderate",
    "codeExample": "// RISC 5-Stage Pipeline Register Update on Rising Clock Edge:\nalways @(posedge clk or posedge rst)\n  if (rst) ex_mem_reg <= 0;\n  else     ex_mem_reg <= id_ex_alu_result;"
  },
  {
    "question": "Suppose D input transitions from 0 to 1 while CLK is HIGH on a positive level-sensitive D latch. What does output Q do?",
    "shortAnswer": "Output Q immediately transitions from 0 to 1 after propagation delay t_pd.",
    "explanation": "Because a positive level-sensitive D latch is transparent whenever CLK=1, any input change on D during the HIGH clock pulse is immediately mirrored at output Q after the gate propagation delay.",
    "hint": "Remember: Level-sensitive latch when CLK=1 act like a closed wire.",
    "level": "basic",
    "codeExample": "// Waveform Behavior (Level Latch):\n// CLK: ____/--------\\_____\n// D  : _______/-----------\n// Q  : _______/-----------  (Follows D immediately while CLK is HIGH)"
  },
  {
    "question": "Suppose D input transitions from 0 to 1 while CLK is HIGH on a positive edge-triggered D flip-flop. What does output Q do?",
    "shortAnswer": "Output Q remains unchanged until the NEXT rising edge of CLK.",
    "explanation": "An edge-triggered flip-flop samples D *only* during the 0-to-1 voltage transition of CLK. Transitions on D that occur while CLK is steady HIGH or steady LOW are ignored until the next positive clock edge arrives.",
    "hint": "Edge-triggered devices ignore all input changes between clock edges.",
    "level": "basic",
    "codeExample": "// Waveform Behavior (Positive Edge FF):\n// CLK: ____/--------\\_____/--------\\\n// D  : _______/---------------------\n// Q  : ___________________/--------- (Updates ONLY at next rising edge)"
  },
  {
    "question": "How does clock skew (t_skew) impact setup time margin in a synchronous sequential circuit?",
    "shortAnswer": "Positive clock skew (destination clock arriving later) increases setup time margin, while negative skew decreases it.",
    "explanation": "If the clock reaches the receiving destination flip-flop later than the launching source flip-flop (positive skew t_skew > 0), the effective clock period available for combinational logic propagation increases to T_clk + t_skew. However, positive skew reduces hold time margin and can cause hold time violations.",
    "hint": "Clock skew is the difference in clock arrival times between source and destination registers.",
    "level": "expert",
    "codeExample": "// Timing Equation with Clock Skew:\n// Setup constraint: t_cq + t_comb + t_su <= T_clk + t_skew\n// Hold constraint : t_cq + t_comb >= t_h + t_skew"
  },
  {
    "question": "What Verilog HDL coding habit accidentally infers a level-sensitive latch instead of an edge-triggered flip-flop or combinational logic?",
    "shortAnswer": "Omitting an 'else' branch in a combinational 'always @(*)' block or incomplete case statements.",
    "explanation": "In Verilog synthesis, if a variable is assigned inside an `always @(*)` block under an `if` condition without an explicit `else` branch (or incomplete `case` statement), synthesis tools must preserve the variable's previous value when the condition is false. This forces hardware compilers to synthesize a physical level-sensitive transparent latch.",
    "hint": "Missing assignment paths in combinational blocks require memory, which infers latches.",
    "level": "moderate",
    "codeExample": "// Unintentional Latch Synthesis:\nalways @(*)\n  if (enable) q = d; // MISSING 'else' branch -> Synthesis infers D Latch!"
  },
  {
    "question": "How do Double Data Rate (DDR) memory architectures utilize clock edges?",
    "shortAnswer": "DDR transfers data on BOTH the positive (rising) and negative (falling) edges of the clock signal.",
    "explanation": "Standard Single Data Rate (SDR) interfaces transfer data once per clock period (typically on the rising edge). DDR architectures capture data on both rising and falling edges, effectively doubling the data transfer bandwidth without increasing the fundamental clock frequency.",
    "hint": "Two data transfers occur per clock cycle instead of one.",
    "level": "moderate",
    "codeExample": "// Conceptual DDR Register Logic:\nalways @(posedge clk) q_rise <= data_bus_in;\nalways @(negedge clk) q_fall <= data_bus_in;"
  },
  {
    "question": "What is the function of a 2-flip-flop synchronizer chain when interfacing asynchronous inputs to a synchronous clock domain?",
    "shortAnswer": "It resolves potential metastability caused by setup/hold violations before signal propagation into downstream logic.",
    "explanation": "Asynchronous inputs can transition at any arbitrary time relative to the system clock, inevitably violating setup/hold times. Feeding an asynchronous signal through two cascaded edge-triggered D flip-flops clocked by the destination clock gives any metastable state in the first flip-flop an entire clock cycle to settle before being sampled by the second flip-flop.",
    "hint": "Two cascaded D flip-flops provide an extra clock period for metastable voltage decay.",
    "level": "expert",
    "codeExample": "// 2-Stage D-FF Synchronizer for Asynchronous Inputs:\nreg sync_ff1, sync_ff2;\nalways @(posedge clk) begin\n  sync_ff1 <= async_input; // May become metastable briefly\n  sync_ff2 <= sync_ff1;    // Clean, synchronized signal\nend"
  },
  {
    "question": "In a negative-edge triggered D flip-flop, when is data D latched into output Q?",
    "shortAnswer": "Precisely on the HIGH-to-LOW (1 to 0) transition of the clock signal.",
    "explanation": "A negative-edge triggered flip-flop contains an inverted clock input pin (represented by an IEEE bubble 'o' and triangle '>'). It evaluates input D and updates output Q exclusively on falling clock transitions (CLK: 1->0).",
    "hint": "Look for the falling edge of the clock square wave.",
    "level": "basic",
    "codeExample": "// Negative-Edge Waveform:\n// CLK: ----\\______/----\\______\n//          ^            ^  (Data captured at these falling transition points)"
  },
  {
    "question": "Why is the hold time requirement (t_h) of an edge-triggered flip-flop independent of the clock period T_clk?",
    "shortAnswer": "Because hold time depends solely on internal gate delays of the latching element, not on the clock frequency.",
    "explanation": "Hold time t_h is the time required for internal steering logic inside the flip-flop to physically isolate the master storage node from the input D pin after the clock edge arrives. Since internal propagation delay depends on CMOS transistor geometry, it remains constant regardless of how fast or slow the external clock runs.",
    "hint": "Internal silicon geometry determines hold time, not external clock speed.",
    "level": "expert",
    "codeExample": "// Hold Time Constraint Formula:\n// t_cq_min + t_comb_min >= t_h + t_skew\n// Notice clock period T_clk does NOT appear in hold time validation!"
  },
  {
    "question": "What key advantage do edge-triggered flip-flops offer over level-sensitive latches in high-speed FPGA/ASIC CAD place-and-route tools?",
    "shortAnswer": "Edge-triggered timing analysis is strictly bounded by single-cycle static timing analysis (STA) equations.",
    "explanation": "With edge-triggered flip-flops, timing paths start at one clock edge and end at the next clock edge, making Static Timing Analysis (STA) simple and deterministic. Level-sensitive latches allow timing paths to 'borrow time' across transparent phases (time borrowing), which complicates automated timing closure in complex ASIC/FPGA designs.",
    "hint": "Edge triggering creates discrete single-cycle boundaries for timing software.",
    "level": "expert",
    "codeExample": "// STA Single-Cycle Check for Edge-Triggered FF:\n// Arrival Time = Launch_edge + t_cq + t_comb\n// Required Time = Capture_edge - t_su\n// Slack = Required Time - Arrival Time"
  },
  {
    "question": "Consider a gated SR latch versus an edge-triggered SR flip-flop. What happens if S=1, R=0 while CLK is HIGH for 50 ns?",
    "shortAnswer": "The SR latch stays in Set state (Q=1) the whole time; the SR flip-flop sets Q=1 at the initial edge and remains unchanged.",
    "explanation": "Both devices set Q=1. However, if S were to change to R=1 while CLK is still HIGH, the level latch would enter the invalid/forbidden state (Q=Q'=1 for NOR latch), whereas the edge-triggered flip-flop would ignore the mid-pulse S/R change until the next clock edge.",
    "hint": "Think about how mid-pulse input changes affect latches versus flip-flops.",
    "level": "moderate",
    "codeExample": "// Mid-pulse input variation:\n// CLK stays HIGH for 50ns\n// t=10ns: S=1, R=0 -> Both Q_latch and Q_ff become 1\n// t=30ns: S=1, R=1 -> Q_latch becomes INVALID; Q_ff IGNORES change and holds Q=1!"
  },
  {
    "question": "What is the function of asynchronous Preset (PRE) and Clear (CLR) pins on an edge-triggered D flip-flop?",
    "shortAnswer": "They override the clock signal to immediately force Q=1 (Preset) or Q=0 (Clear) regardless of clock edges.",
    "explanation": "Asynchronous controls (PRE/CLR or SET/RST) bypass the clock-triggered sampling mechanism. When activated (often active-LOW), they force the flip-flop output to logic 1 or 0 instantaneously, which is critical for system reset initialization upon power-up.",
    "hint": "Asynchronous means independent of the clock edge.",
    "level": "basic",
    "codeExample": "// D Flip-Flop with Active-Low Asynchronous Reset:\nalways @(posedge clk or negedge rst_n)\n  if (!rst_n) q <= 1'b0; // Asynchronous reset (immediate)\n  else        q <= d;    // Synchronous data update"
  },
  {
    "question": "If a positive-edge triggered D flip-flop has a setup time t_su = 0.5 ns and hold time t_h = 0.3 ns, when can input D safely change state relative to a clock edge at t = 10.0 ns?",
    "shortAnswer": "D can change anytime before t = 9.5 ns or anytime after t = 10.3 ns.",
    "explanation": "The forbidden aperture window during which D MUST remain stable is [10.0 - 0.5 ns, 10.0 + 0.3 ns] = [9.5 ns, 10.3 ns]. Therefore, D can safely transition before 9.5 ns or after 10.3 ns without causing setup or hold violations.",
    "hint": "Subtract setup time from edge time for the start of window; add hold time for the end.",
    "level": "moderate",
    "codeExample": "// Aperture Window:\n// Forbidden Window: 9.5 ns to 10.3 ns\n// Safe Transition Zones: t < 9.5 ns  OR  t > 10.3 ns"
  },
  {
    "question": "Why is a T flip-flop constructed from an edge-triggered JK flip-flop (with J=K=T) rather than a level-sensitive SR latch?",
    "shortAnswer": "To ensure output Q toggles exactly ONCE per clock cycle when T=1.",
    "explanation": "If a level-sensitive latch were configured to toggle (J=K=1), Q would invert continuously as long as CLK=1 (race-around condition). An edge-triggered T flip-flop toggles Q exactly once per active clock transition, acting as a clean divide-by-2 frequency divider.",
    "hint": "Edge triggering limits the toggle action to a single pulse per clock period.",
    "level": "moderate",
    "codeExample": "// T Flip-Flop Frequency Divider:\n// Input CLK: 100 MHz square wave\n// Output Q :  50 MHz square wave (Toggles once every rising edge when T=1)"
  },
  {
    "question": "What structural component converts a level-sensitive D latch into an edge-triggered D flip-flop in CMOS transmission-gate technology?",
    "shortAnswer": "Cascading two D latches in series driven by out-of-phase clock signals (Master-Slave topology).",
    "explanation": "In CMOS IC design, a master D latch (uses transmission gates enabled when CLK=0) and a slave D latch (uses transmission gates enabled when CLK=1) are connected in series. This transmission-gate master-slave structure forms the standard compact D flip-flop cell in CMOS standard-cell libraries.",
    "hint": "Master-slave topology using CMOS transmission gates is the industry standard for ASIC flip-flops.",
    "level": "expert",
    "codeExample": "// CMOS Transmission-Gate Flip-Flop:\n// Master TG active when CLK=0 -> captures D onto Master capacitor\n// Slave TG active when CLK=1 -> transfers Master voltage to Q output"
  },
  {
    "question": "What is 'Glitch Sensitivity' in level-sensitive devices versus edge-triggered devices?",
    "shortAnswer": "Level-sensitive latches propagate any input glitch occurring during CLK HIGH; edge-triggered flip-flops filter out glitches that settle before the setup window.",
    "explanation": "If an input signal experiences brief unwanted noise spikes (glitches) while CLK is HIGH, a level-sensitive latch will pass those glitches directly to Q. An edge-triggered flip-flop filters out mid-period glitches, provided the signal stabilizes before the setup time window t_su prior to the clock edge.",
    "hint": "Flip-flops evaluate data only at the instant of the clock edge.",
    "level": "moderate",
    "codeExample": "// Noise filtering by Edge Triggering:\n// Mid-pulse glitch on D at t = T/2 is IGNORED by edge-triggered D-FF if D recovers by (T - t_su)."
  },
  {
    "question": "What is the relationship between clock pulse width (t_w) and minimum clock period (T_clk) for edge-triggered flip-flops?",
    "shortAnswer": "t_w must meet minimum pulse width specs (t_w_high, t_w_low), but T_clk can be arbitrarily long.",
    "explanation": "Edge-triggered flip-flops require minimum HIGH and LOW clock pulse widths (t_w_high and t_w_low) to allow internal nodes to charge/discharge fully. However, because state is held indefinitely when clock is static, the clock period T_clk can be made arbitrarily long (down to DC frequency for static CMOS flip-flops).",
    "hint": "Static CMOS flip-flops can hold state indefinitely when CLK is stopped.",
    "level": "moderate",
    "codeExample": "// Pulse Width Requirements:\n// CLK HIGH width >= t_w_high (e.g. 0.4 ns)\n// CLK LOW width  >= t_w_low  (e.g. 0.4 ns)"
  },
  {
    "question": "What is a 'Pulsed Latch' architecture in modern ultra-high-frequency microprocessor design?",
    "shortAnswer": "A level-sensitive latch driven by an ultra-short clock pulse, combining latch speed/area efficiency with edge-triggered semantics.",
    "explanation": "High-performance CPUs (like IBM POWER or Intel Core processors) sometimes use pulsed latches. A specialized clock generator converts the global clock into an ultra-narrow pulse (e.g. 50 ps). A simple level latch driven by this brief pulse behaves effectively like an edge-triggered flip-flop, saving silicon area and lowering clock power.",
    "hint": "Combining a narrow pulse generator with a level latch yields flip-flop behavior with less overhead.",
    "level": "expert",
    "codeExample": "// Pulsed Latch Concept:\nwire pulse_clk = generate_ultra_short_pulse(global_clk); // 50 ps pulse\nd_latch fast_latch (.enable(pulse_clk), .d(d), .q(q));"
  },
  {
    "question": "How can you determine if a circuit component is positive-edge triggered by examining its timing waveform?",
    "shortAnswer": "Output Q changes value ONLY at the exact moments when CLK transitions from 0 to 1.",
    "explanation": "In timing diagram analysis, align vertical grid lines with the rising edges (0->1 transitions) of CLK. If Q updates its value at these vertical lines (and stays constant everywhere else), the device is positive-edge triggered.",
    "hint": "Draw vertical dashed lines at every LOW-to-HIGH transition of the clock waveform.",
    "level": "basic",
    "codeExample": "// Waveform Alignment:\n// CLK : 0 --> 1  (Check Q response here!)\n// CLK : 1 --> 0  (Q must remain UNCHANGED)"
  },
  {
    "question": "Why does an edge-triggered D flip-flop eliminate the need for master-slave clock phase overlapping constraints required by latches?",
    "shortAnswer": "Because edge triggering confines state capture to a single clock transition, preventing multi-stage race conditions.",
    "explanation": "When building sequential state machines with latches (e.g., LSSD - Level Sensitive Scan Design), designers must generate multi-phase non-overlapping clocks (Phi_1 and Phi_2) to prevent latches from becoming transparent simultaneously. Edge-triggered flip-flops simplify system timing by operating on a single clock edge across the entire chip.",
    "hint": "Single-edge clocking eliminates complex multi-phase clock routing.",
    "level": "expert",
    "codeExample": "// Single Clock Edge vs Two-Phase Clocking:\n// Edge-Triggered FF : Uses single 'clk' line everywhere.\n// Dual-Latch LSSD   : Requires non-overlapping 'ph1' and 'ph2' clocks."
  },
  {
    "question": "In summary, why is edge triggering considered the cornerstone of modern synchronous digital systems?",
    "shortAnswer": "It decouples signal propagation from duration, ensuring deterministic state transitions synchronized to a single global clock.",
    "explanation": "Edge triggering isolates combinational path delays from state storage. By capturing inputs only during instantaneous clock transitions, edge-triggered flip-flops allow complex digital datapaths (ALUs, memory controllers, GPUs) to compute results safely across the clock period and commit results simultaneously, enabling scalable gigahertz computing.",
    "hint": "Edge triggering enables clock-driven deterministic computing without transparent feedback hazards.",
    "level": "basic",
    "codeExample": "// Synchronous Master Rule:\n// State(t+1) = Next_State_Logic( State(t), Inputs(t) ) on active CLK edge."
  }
];

export default questions;
