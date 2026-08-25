// Question Bank for Topic 14: Flip-Flop Timing Parameters & Metastability
// Computer Architecture Masterclass · Module 001_003 · Topic 14

const questions = [
  {
    "question": "What is Setup Time (t_su) in a flip-flop and why is it required?",
    "shortAnswer": "The minimum duration data must remain stable before the active clock edge.",
    "explanation": "Setup time ensures the internal input steering pass-gates or NAND stages charge the internal nodes to stable digital logic levels before the clock edge disables input sampling.",
    "hint": "Think about the time required to charge internal node capacitances before clock switching.",
    "level": "basic",
    "codeExample": "// SDC timing constraint:\nset_input_delay -clock CLK -max 2.0 [get_ports DATA_IN]"
  },
  {
    "question": "What is Hold Time (t_h) and why must data remain stable after the clock edge?",
    "shortAnswer": "The minimum time data must remain stable after the active clock edge.",
    "explanation": "Hold time ensures the clock signal has fully propagated through internal inverters to completely disconnect the input stage before new input changes can corrupt the sampled state.",
    "hint": "Consider internal clock path inverter delay closing the sampling switch.",
    "level": "basic",
    "codeExample": "// Hold check in Verilog:\n$hold(posedge clk, data_in, 1.2); // 1.2ns hold requirement"
  },
  {
    "question": "What is Clock-to-Q Propagation Delay (t_cq)?",
    "shortAnswer": "The time elapsed from the active clock edge until the output Q reflects the new state.",
    "explanation": "t_cq is the internal delay from the clock transition to the driving of the final bistable storage latch outputs (typically 1 to 3 gate delays).",
    "hint": "It defines when the next stage downstream can begin receiving valid data.",
    "level": "basic",
    "codeExample": "// Gate level delay:\nassign #2 q = internal_d; // 2ns t_cq"
  },
  {
    "question": "What is the physical phenomenon of Metastability in flip-flops?",
    "shortAnswer": "A state where the internal latch is trapped between logic 0 and 1 at an unstable voltage equilibrium.",
    "explanation": "When setup or hold times are violated, internal nodes receive partial voltage levels, placing the cross-coupled inverter pair at its unstable balance point (V_DD / 2) with high-frequency analog oscillation before resolving randomly.",
    "hint": "Analogous to balancing a marble perfectly on top of a steep hill.",
    "level": "moderate",
    "codeExample": "// Metastable condition modeling:\nreal v_node = 0.5 * VDD; // Unstable intermediate voltage"
  },
  {
    "question": "What is the Setup Time Slack equation in Static Timing Analysis (STA)?",
    "shortAnswer": "Slack_setup = T_clk + t_skew - t_cq - t_comb - t_su.",
    "explanation": "Data launched by FF1 must propagate through combinational logic and arrive at FF2 at least t_su before the next clock edge. A positive slack indicates timing compliance.",
    "hint": "Data path delay must fit within one clock period plus skew.",
    "level": "moderate",
    "codeExample": "// Max-delay constraint:\nT_clk >= t_cq + t_comb + t_su - t_skew"
  },
  {
    "question": "What is the Hold Time Slack equation in Static Timing Analysis (STA)?",
    "shortAnswer": "Slack_hold = t_cq + t_comb - t_skew - t_h.",
    "explanation": "New data launched by FF1 on the same clock edge must NOT race through combinational logic so fast that it corrupts the data being captured by FF2 during its hold window. Notice this is independent of clock period T_clk!",
    "hint": "Fast paths (minimum delay) must exceed hold requirements.",
    "level": "moderate",
    "codeExample": "// Min-delay constraint (independent of clock frequency!):\nt_cq + t_comb >= t_h + t_skew"
  },
  {
    "question": "Why can a Setup Time violation be resolved by reducing clock frequency, but a Hold Time violation cannot?",
    "shortAnswer": "Setup time depends on clock period T_clk, whereas hold time is evaluated on the exact same clock edge.",
    "explanation": "Increasing T_clk gives slow combinational paths more time to settle. Hold time, however, depends strictly on minimum path delay versus hold time and skew on the same launch/capture edge.",
    "hint": "Lowering clock speed widens T_clk, but does not slow down fast data racing across zero clock cycles.",
    "level": "expert",
    "codeExample": "// Fixing hold violations:\n// Must insert delay buffers into the data path, not change clock frequency!"
  },
  {
    "question": "What is Clock Skew (t_skew) and how does it differ from Clock Jitter?",
    "shortAnswer": "Skew is spatial variation across physical clock arrival times; jitter is temporal variation in cycle period.",
    "explanation": "Clock skew is the difference in clock arrival times between two flip-flops due to wire length and buffer delays. Jitter is dynamic cycle-to-cycle edge uncertainty caused by power supply noise and thermal noise.",
    "hint": "Skew is space-dependent (physical layout); Jitter is time-dependent (noise/phase variation).",
    "level": "moderate",
    "codeExample": "t_skew = t_clk_capture - t_clk_launch;"
  },
  {
    "question": "What is Positive Clock Skew and how does it impact Setup and Hold slack?",
    "shortAnswer": "Positive skew helps setup timing but degrades hold timing.",
    "explanation": "When the capture clock arrives later than the launch clock (t_skew > 0), the data path has extra time to settle (helping setup), but the capture flip-flop's hold window extends, making hold violations more likely.",
    "hint": "Capture edge is delayed, giving more setup time but inviting fast path races.",
    "level": "expert",
    "codeExample": "// Positive skew increases setup margin:\nSlack_setup = (T_clk + t_skew) - (t_cq + t_comb + t_su)"
  },
  {
    "question": "What is Negative Clock Skew and how does it impact timing?",
    "shortAnswer": "Negative skew degrades setup timing but protects against hold violations.",
    "explanation": "When capture clock arrives earlier than launch clock (t_skew < 0), the available time for combinational evaluation is reduced by |t_skew|, requiring faster logic or lower frequency.",
    "hint": "Capture edge arrives early, eating into clock period.",
    "level": "expert",
    "codeExample": "// Negative skew shrinks available clock budget:\nT_effective = T_clk - |t_skew|"
  },
  {
    "question": "What is the Mean Time Between Failures (MTBF) formula for a synchronizer?",
    "shortAnswer": "MTBF = exp(t_r / tau) / (T_0 * f_clk * f_data).",
    "explanation": "MTBF increases exponentially with available resolution time t_r divided by the latch time constant tau, and is inversely proportional to clock and data transition frequencies.",
    "hint": "Notice the exponential term exp(t_r / tau) in the numerator.",
    "level": "expert",
    "codeExample": "// MTBF calculation:\n// MTBF = exp(t_resolution / tau) / (C1 * f_clk * f_async_data)"
  },
  {
    "question": "How does a 2-Stage Flip-Flop Synchronizer eliminate metastability in asynchronous clock domain crossings (CDC)?",
    "shortAnswer": "The first flip-flop absorbs metastability, allowing 1 full clock cycle for voltage resolution before FF2 samples.",
    "explanation": "If FF1 enters a metastable state from an asynchronous transition, it has an entire clock period (T_clk - t_su) to settle to a clean 0 or 1 before FF2 captures its output.",
    "hint": "FF1 captures the asynchronous signal; FF2 captures the resolved output.",
    "level": "moderate",
    "codeExample": "// 2-FF Synchronizer in Verilog:\nalways @(posedge clk_dst) begin\n  sync_ff1 <= async_in;\n  sync_ff2 <= sync_ff1;\nend\nassign sync_out = sync_ff2;"
  },
  {
    "question": "Under what condition is a 3-Stage Flip-Flop Synchronizer required instead of 2-Stage?",
    "shortAnswer": "When operating at ultra-high clock frequencies (GHz) where 1 clock cycle is insufficient for MTBF targets.",
    "explanation": "At high clock speeds (e.g. 2 GHz, T_clk = 500ps), a single period may not provide enough resolution time t_r to achieve an MTBF of 1,000+ years. Adding a third flip-flop doubles resolution time.",
    "hint": "Higher clock frequency reduces t_r per stage, requiring cascading.",
    "level": "expert",
    "codeExample": "// 3-FF Synchronizer:\nalways @(posedge clk) begin\n  ff1 <= d_async;\n  ff2 <= ff1;\n  ff3 <= ff2;\nend"
  },
  {
    "question": "What is Clock Jitter and how is it factored into Static Timing Analysis?",
    "shortAnswer": "Dynamic cycle-to-cycle clock edge uncertainty subtracted from available clock period.",
    "explanation": "Clock jitter reduces the usable clock period: T_effective = T_clk - t_jitter - t_skew_uncertainty. STA tools treat jitter as a timing penalty against setup margin.",
    "hint": "Jitter acts as an unpredictable clock period shrinkage.",
    "level": "moderate",
    "codeExample": "set_clock_uncertainty -setup 0.15 [get_clocks CLK]"
  },
  {
    "question": "What is Clock Distribution Tree Balancing and how does it minimize clock skew?",
    "shortAnswer": "Using symmetric H-Tree or mesh topologies with matched buffer delays across all branches.",
    "explanation": "An H-tree network routes clock signals through identical wire lengths and buffer stages from the clock source to every register, ensuring simultaneous clock arrival across the die.",
    "hint": "Fractal geometric routing ensures equal distance from clock root to all leaves.",
    "level": "expert",
    "codeExample": "// CTS (Clock Tree Synthesis) constraint:\nset_clock_tree_options -target_skew 0.050 // 50ps target skew"
  },
  {
    "question": "How do standard cell libraries characterize setup and hold times for ASIC synthesis?",
    "shortAnswer": "Using 2D Non-Linear Delay Models (NLDM) or CCS models indexed by input transition slew and clock slew.",
    "explanation": "Setup and hold times are not fixed constants; slower data transition slews increase setup time, and slower clock slews widen the hold window.",
    "hint": "Lookup tables in Liberty (.lib) files indexed by input_transition and clock_transition.",
    "level": "expert",
    "codeExample": "// Liberty (.lib) lookup table:\nsetup_rising (data_slew, clock_slew) {\n  index_1 (\"0.05, 0.10, 0.20\");\n  values (\"0.12, 0.15, 0.22\");\n}"
  },
  {
    "question": "What is the difference between a Minimum Delay Path and a Maximum Delay Path?",
    "shortAnswer": "Max delay paths govern setup time (slowest paths); min delay paths govern hold time (fastest paths).",
    "explanation": "Maximum delay paths represent the longest combinational propagation time and determine maximum clock frequency. Minimum delay paths represent the shortest combinational route and risk hold violations.",
    "hint": "Max path = longest gate chain; Min path = zero or fewest gate chain.",
    "level": "basic",
    "codeExample": "// STA reports:\nreport_timing -delay_type max // Setup checks\nreport_timing -delay_type min // Hold checks"
  },
  {
    "question": "What is the maximum operating frequency formula for a synchronous sequential circuit?",
    "shortAnswer": "f_max = 1 / (t_cq + t_comb_max + t_su).",
    "explanation": "The minimum clock period T_min must be greater than or equal to the sum of clock-to-Q delay, maximum combinational delay, and capture flip-flop setup time.",
    "hint": "Sum all delays along the critical path to find T_min, then take reciprocal.",
    "level": "basic",
    "codeExample": "// Example:\n// t_cq = 1ns, t_comb = 3ns, t_su = 1ns -> T_min = 5ns -> f_max = 200 MHz"
  },
  {
    "question": "Why must asynchronous reset deassertion be synchronized with the clock?",
    "shortAnswer": "To prevent reset recovery and removal timing violations that cause metastability.",
    "explanation": "If an asynchronous reset signal is released too close to a clock edge, internal flip-flops enter a metastable state. An Asynchronous Assert / Synchronous Deassert (AASD) reset bridge resolves this.",
    "hint": "Reset release must obey recovery (setup-like) and removal (hold-like) windows.",
    "level": "expert",
    "codeExample": "// Reset Synchronizer (AASD):\nalways @(posedge clk or negedge rst_n) begin\n  if (!rst_n) begin\n    rst_sync1 <= 1'b0;\n    rst_sync2 <= 1'b0;\n  end else begin\n    rst_sync1 <= 1'b1;\n    rst_sync2 <= rst_sync1;\n  end\nend"
  },
  {
    "question": "What is Reset Recovery Time (t_rec)?",
    "shortAnswer": "The minimum time an asynchronous control signal (reset) must remain deasserted before the active clock edge.",
    "explanation": "Recovery time is analogous to setup time for asynchronous control inputs (Preset, Clear, Reset). Violating t_rec causes unpredictable reset deassertion.",
    "hint": "Think of recovery as the setup time of the reset release.",
    "level": "moderate",
    "codeExample": "$recovery(posedge rst_n, posedge clk, 1.5);"
  },
  {
    "question": "What is Reset Removal Time (t_rem)?",
    "shortAnswer": "The minimum time an asynchronous control signal must remain asserted after the active clock edge before deassertion.",
    "explanation": "Removal time is analogous to hold time for asynchronous control signals. It ensures the clock edge has fully executed before reset is pulled HIGH.",
    "hint": "Think of removal as the hold time of the reset signal.",
    "level": "moderate",
    "codeExample": "$removal(posedge clk, posedge rst_n, 0.8);"
  },
  {
    "question": "What is Time Borrowing in latch-based designs and why does it not apply to flip-flops?",
    "shortAnswer": "Latches are transparent during an entire clock level, allowing logic to borrow time across clock boundaries.",
    "explanation": "Because level-sensitive latches pass data throughout the active clock phase, logic from one stage that finishes late can consume time from the next stage. Flip-flops sample only at sharp edges and cannot borrow time.",
    "hint": "Latches have a transparent window; flip-flops have an instantaneous sample edge.",
    "level": "expert",
    "codeExample": "// Latch transparency allows slack borrowing across half-cycles."
  },
  {
    "question": "How does temperature and voltage variation (PVT Corners) affect Setup vs Hold timing?",
    "shortAnswer": "Worst-case (Slow) PVT corners degrade setup timing; Best-case (Fast) PVT corners degrade hold timing.",
    "explanation": "Low voltage and high temperature slow down transistors (Worst-case / SS corner), making setup violations critical. High voltage and low temperature speed up transistors (Best-case / FF corner), making signals race faster and causing hold violations.",
    "hint": "SS corner = slow paths (setup risk); FF corner = fast racing paths (hold risk).",
    "level": "expert",
    "codeExample": "// Multi-Corner Multi-Mode (MCMM) STA:\ncreate_scenario -name ss_125c -corner ss_corner // Setup check\ncreate_scenario -name ff_m40c -corner ff_corner // Hold check"
  },
  {
    "question": "What is False Path in Static Timing Analysis and how should it be constrained?",
    "shortAnswer": "A physical circuit path that is logically impossible to activate during normal synchronous operation.",
    "explanation": "Paths between asynchronous clock domains or paths disabled by mode control registers should be declared as false paths so the timing engine does not attempt to close setup/hold timing on them.",
    "hint": "Tells the synthesis tool to ignore impossible timing paths.",
    "level": "moderate",
    "codeExample": "set_false_path -from [get_clocks CLK_A] -to [get_clocks CLK_B]"
  },
  {
    "question": "What is a Multicycle Path and when is it applied?",
    "shortAnswer": "A path designed to require more than one clock cycle for combinational data propagation.",
    "explanation": "Complex arithmetic operations (like FP multipliers) enabled by an enable pulse every N cycles are declared as multicycle paths, relaxing the setup constraint from 1*T_clk to N*T_clk.",
    "hint": "Relaxes setup check across N clock cycles for slow multi-stage operations.",
    "level": "moderate",
    "codeExample": "set_multicycle_path 2 -setup -from [get_cells reg_a] -to [get_cells reg_b]"
  },
  {
    "question": "What is Clock Domain Crossing (CDC) and why is direct connection of signals between domains dangerous?",
    "shortAnswer": "Signals crossing unsynchronized clock boundaries violate setup/hold times and cause metastability.",
    "explanation": "Because the launch clock and capture clock have no fixed phase relationship, data transitions can occur directly on the capture clock edge, triggering catastrophic metastability and data corruption.",
    "hint": "Asynchronous clocks have random phase offsets.",
    "level": "basic",
    "codeExample": "// Unsafe:\nassign clk_b_data = clk_a_reg; // Direct CDC hazard!"
  },
  {
    "question": "What is a Gray-code FIFO Pointer and why is it used for multi-bit CDC?",
    "shortAnswer": "Gray code ensures only 1 bit transitions at any increment, preventing multi-bit race hazards.",
    "explanation": "If a binary counter transitions from 0111 (7) to 1000 (8), all 4 bits change simultaneously. Different wire delays cause the capture domain to sample intermediate glitch states (e.g. 1111). Gray code guarantees single-bit transitions.",
    "hint": "Only 1 bit flips between adjacent numbers: 00 -> 01 -> 11 -> 10.",
    "level": "expert",
    "codeExample": "// Binary to Gray conversion:\nassign gray_ptr = bin_ptr ^ (bin_ptr >> 1);"
  },
  {
    "question": "What is the primary role of Buffer Insertion in fixing hold time violations during physical layout?",
    "shortAnswer": "Delay buffers increase minimum path latency without altering the logical Boolean function.",
    "explanation": "If a data signal arrives too quickly at the capture flip-flop (violating hold time), the physical design tool inserts non-inverting delay buffers into the data net to push arrival time past t_h.",
    "hint": "Buffers add propagation delay to slow down fast data paths.",
    "level": "moderate",
    "codeExample": "// ECO buffer insertion:\ninsert_buffer -cells [get_pins u_reg2/D] -buffer_type BUFF_X2"
  },
  {
    "question": "How does capacitive load (Fan-out) affect the Clock-to-Q delay (t_cq) of a flip-flop?",
    "shortAnswer": "Higher output capacitance increases charging/discharging time, increasing t_cq.",
    "explanation": "Driving multiple downstream gate inputs increases total capacitive load on output pin Q, slowing output transition slew rate and proportionally extending propagation delay.",
    "hint": "t_pd = t_intrinsic + R_drive * C_load.",
    "level": "basic",
    "codeExample": "// Heavy load extends delay:\nt_cq_loaded = t_cq_intrinsic + (k * C_load);"
  },
  {
    "question": "What is the overall industry best-practice rule for timing closure in high-performance digital systems?",
    "shortAnswer": "Design balanced clock trees, enforce clean 2-FF CDC synchronizers, and maintain positive setup/hold slack across all PVT corners.",
    "explanation": "Robust silicon design requires comprehensive SDC timing constraints, formal CDC verification, zero negative slack (WNS >= 0), and extensive Monte Carlo timing simulations.",
    "hint": "Zero WNS (Worst Negative Slack) across all operating modes.",
    "level": "expert",
    "codeExample": "// Final signoff verification:\ncheck_timing\nreport_timing -slack_lesser_than 0.0"
  }
];

export default questions;
