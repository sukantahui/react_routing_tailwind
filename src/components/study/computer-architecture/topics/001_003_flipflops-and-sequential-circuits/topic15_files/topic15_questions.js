// Question Bank for Topic 15: Registers & Parallel Load Architecture
// Computer Architecture Masterclass · Module 001_003 · Topic 15

const questions = [
  {
    "question": "What is the primary architectural difference between a Flip-Flop and a Register?",
    "shortAnswer": "A flip-flop stores a single bit; a register groups multiple flip-flops to store an N-bit binary word.",
    "explanation": "While a flip-flop is the elementary 1-bit bistable memory cell, an N-bit register combines N flip-flops sharing a common clock and control lines to store words (e.g. 8-bit, 32-bit, 64-bit data) in a CPU datapath.",
    "hint": "Think of a flip-flop as a single character and a register as a complete word.",
    "level": "basic",
    "codeExample": "// 8-bit Register in Verilog:\nreg [7:0] data_register;\nalways @(posedge clk) begin\n  if (load) data_register <= data_in;\nend"
  },
  {
    "question": "Why is an un-gated (free-running) flip-flop unsuitable for CPU register storage?",
    "shortAnswer": "It would overwrite stored data on every single clock cycle.",
    "explanation": "In high-speed CPUs running at GHz frequencies, a register must hold its data across thousands of clock cycles until a specific instruction commands it to update. A Load Enable (LD) control signal is required to maintain data.",
    "hint": "Without a Load signal, new data would enter on every single clock tick.",
    "level": "basic",
    "codeExample": "// Uncontrolled register (overwrites every cycle):\nalways @(posedge clk) q <= d;"
  },
  {
    "question": "How is a Parallel Load Register implemented in digital hardware?",
    "shortAnswer": "Each flip-flop is preceded by a 2-to-1 MUX that selects between external input (Load=1) and its own output (Load=0).",
    "explanation": "When Load=0, the multiplexer routes the flip-flop output Q_i back into D_i, causing the register to refresh its current state. When Load=1, the MUX routes the external parallel input I_i into D_i, loading new data on the clock edge.",
    "hint": "D_i = (Load' * Q_i) + (Load * I_i).",
    "level": "moderate",
    "codeExample": "// MUX-based Parallel Load logic:\nassign d_in[i] = load ? parallel_in[i] : q_out[i];"
  },
  {
    "question": "Why is MUX-based steering preferred over clock gating for basic synchronous register load?",
    "shortAnswer": "It avoids clock skew, glitches, and hazard spikes on the clock distribution network.",
    "explanation": "Gating the clock line with an AND gate introduces propagation delay on the clock edge, creating clock skew. MUX feedback keeps the clock tree completely synchronous and glitch-free.",
    "hint": "Never place logic gates on the clock path without specialized ICG cells.",
    "level": "expert",
    "codeExample": "// Safe synchronous load:\nalways @(posedge clk) begin\n  if (load_en) q <= data_in;\n  // else q retains value implicitly\nend"
  },
  {
    "question": "How many clock cycles are required to load an N-bit word into a Parallel Load Register?",
    "shortAnswer": "Exactly 1 clock cycle.",
    "explanation": "Because all N flip-flops receive their respective input bits simultaneously over N parallel data wires, the entire word is captured on a single active clock edge.",
    "hint": "Parallel means all bits transfer at the same instant.",
    "level": "basic",
    "codeExample": "// 32-bit parallel load in 1 cycle:\nalways @(posedge clk) if (load) reg_32 <= bus_32;"
  },
  {
    "question": "What is the primary trade-off between Serial and Parallel data transfer?",
    "shortAnswer": "Parallel transfer is N times faster but requires N wires; Serial requires only 1 wire but takes N cycles.",
    "explanation": "Parallel data transfer offers maximum bandwidth for short-distance CPU internal buses at the cost of high pin count and routing congestion. Serial transfer minimizes wire count and crosstalk for long distances.",
    "hint": "Speed and pin count are inversely balanced.",
    "level": "basic",
    "codeExample": "// Parallel: 8 bits in 1 cycle (8 wires)\n// Serial: 8 bits in 8 cycles (1 wire)"
  },
  {
    "question": "Why is Parallel data transfer prone to Clock Skew and Crosstalk over long distances?",
    "shortAnswer": "Slight physical length differences cause bits to arrive at different times, and adjacent wires capacitively couple.",
    "explanation": "Over long cables or PCB traces, parallel wires experience inter-symbol interference, magnetic crosstalk, and trace-length mismatch, making it impossible to align all bits at multi-gigahertz speeds.",
    "hint": "Bits on wire 0 may arrive earlier than bits on wire 7.",
    "level": "moderate",
    "codeExample": "// High-speed serial interfaces (PCIe, SATA) replaced wide parallel buses (PCI, IDE)."
  },
  {
    "question": "What is an Accumulator Register (AC) in a CPU architecture?",
    "shortAnswer": "A primary operational register that holds operands and stores the output of the Arithmetic Logic Unit (ALU).",
    "explanation": "The accumulator serves as the default source operand and destination register for arithmetic and logic instructions in single-accumulator processor architectures.",
    "hint": "Stores the running result of mathematical computations.",
    "level": "basic",
    "codeExample": "// Accumulator operation:\nAC <= AC + Memory[MAR];"
  },
  {
    "question": "What is the function of the Program Counter (PC) register?",
    "shortAnswer": "It holds the memory address of the next instruction to be fetched and executed.",
    "explanation": "The Program Counter automatically increments after each instruction fetch, pointing sequentially to the next memory word unless modified by a jump or branch instruction.",
    "hint": "Points to where the CPU will read its next instruction.",
    "level": "basic",
    "codeExample": "// Program Counter update:\nPC <= branch_taken ? target_address : (PC + 4);"
  },
  {
    "question": "What is the function of the Instruction Register (IR)?",
    "shortAnswer": "It holds the binary opcode and operands of the currently executing instruction.",
    "explanation": "After an instruction is fetched from memory via the Memory Data Register (MDR), it is loaded into the IR where the control unit decodes its opcode into hardware control signals.",
    "hint": "Decoded by the Control Unit to execute CPU micro-operations.",
    "level": "basic",
    "codeExample": "// Instruction Register loading:\nIR <= Memory[PC];"
  },
  {
    "question": "What is the Memory Address Register (MAR) and Memory Buffer/Data Register (MBR/MDR)?",
    "shortAnswer": "MAR holds memory addresses; MDR holds the data being read from or written to memory.",
    "explanation": "MAR drives the unidirectional memory address bus. MDR acts as a bidirectional staging register buffering data words passing between the CPU and system RAM.",
    "hint": "MAR = Address pointer; MDR = Data container.",
    "level": "moderate",
    "codeExample": "// Memory Read sequence:\nMAR <= address_bus;\nMDR <= Memory[MAR];"
  },
  {
    "question": "What are Tri-State Buffers and why are they used on register outputs?",
    "shortAnswer": "They isolate register outputs from a shared common bus by placing inactive registers in High-Impedance (Hi-Z).",
    "explanation": "When multiple registers connect to a single internal data bus, only one register can drive the bus at any instant. Tri-state output enables (OE) ensure non-selected registers disconnect without bus contention.",
    "hint": "States: Logic 0, Logic 1, High-Impedance (Z).",
    "level": "moderate",
    "codeExample": "assign internal_bus = oe_reg_a ? reg_a_out : 8'bzzzzzzzz;"
  },
  {
    "question": "What is the Boolean excitation equation for bit i of a 4-bit Parallel Load Register with active-HIGH load?",
    "shortAnswer": "D_i = (Load' * Q_i) + (Load * I_i).",
    "explanation": "A 2-to-1 multiplexer evaluates this Boolean function: when Load=0, D_i receives Q_i; when Load=1, D_i receives I_i.",
    "hint": "Multiplexer selection formula: S'*A + S*B.",
    "level": "moderate",
    "codeExample": "assign D[i] = (~Load & Q[i]) | (Load & I[i]);"
  },
  {
    "question": "How does an Asynchronous Clear input affect a Parallel Load Register?",
    "shortAnswer": "It immediately resets all flip-flops to 0 regardless of the clock edge or Load signal.",
    "explanation": "Asynchronous Clear connects directly to the internal transistor pull-down paths of the storage latches, overriding any synchronous data inputs for immediate system initialization.",
    "hint": "Operates instantly without waiting for a clock tick.",
    "level": "basic",
    "codeExample": "always @(posedge clk or posedge async_clr) begin\n  if (async_clr) q <= 4'b0000;\n  else if (load) q <= d_in;\nend"
  },
  {
    "question": "What is a Register File in a modern microprocessor?",
    "shortAnswer": "An array of multi-ported general-purpose registers (e.g. R0-R31) supporting simultaneous reads and writes.",
    "explanation": "A modern RISC processor (like MIPS or RISC-V) features a 32-word register file with 2 read ports and 1 write port, allowing the ALU to read two source registers and write the result in a single cycle.",
    "hint": "Array of 32 or 64 high-speed working registers.",
    "level": "expert",
    "codeExample": "// Dual-read, single-write Register File:\nassign rs1_data = registers[rs1_addr];\nassign rs2_data = registers[rs2_addr];\nalways @(posedge clk) if (reg_write) registers[rd_addr] <= rd_data;"
  },
  {
    "question": "What is the transfer time for a 64-bit word using an 8-bit wide parallel bus operating at 100 MHz?",
    "shortAnswer": "80 nanoseconds (8 clock cycles).",
    "explanation": "Transferring 64 bits across an 8-bit bus requires 64 / 8 = 8 cycles. At 100 MHz (T_clk = 10ns), total transfer time is 8 * 10ns = 80ns.",
    "hint": "Cycles = Total Bits / Bus Width; Time = Cycles * T_clk.",
    "level": "moderate",
    "codeExample": "// 64 bits / 8 bits = 8 beats * 10ns = 80ns"
  },
  {
    "question": "What is Serial-In Parallel-Out (SIPO) and where is it used in computer systems?",
    "shortAnswer": "A shift register that receives data serially bit-by-bit and outputs the full word in parallel.",
    "explanation": "SIPO registers are used in network controllers (Ethernet) and UART communication to convert sequential bit streams arriving over communication wires into parallel bytes for CPU processing.",
    "hint": "Serial input on 1 wire, parallel output across N wires.",
    "level": "moderate",
    "codeExample": "// SIPO Shift Register in Verilog:\nalways @(posedge clk) begin\n  shift_reg <= {shift_reg[6:0], serial_in};\nend\nassign parallel_out = shift_reg;"
  },
  {
    "question": "What is Parallel-In Serial-Out (PISO) and where is it used?",
    "shortAnswer": "A register loaded in parallel in 1 cycle that shifts data out bit-by-bit over subsequent cycles.",
    "explanation": "PISO registers are used in transmitters (UART, SPI master, display controllers) to take parallel CPU data words and serialize them for transmission over a single wire or high-speed serial link.",
    "hint": "Loads all bits simultaneously, then shifts out 1 bit per clock tick.",
    "level": "moderate",
    "codeExample": "// PISO Register:\nalways @(posedge clk) begin\n  if (load) piso_reg <= parallel_in;\n  else piso_reg <= {1'b0, piso_reg[7:1]};\nend\nassign serial_out = piso_reg[0];"
  },
  {
    "question": "Why did modern computer architectures transition from Parallel buses (ATA, PCI) to High-Speed Serial buses (SATA, PCIe)?",
    "shortAnswer": "Serial buses eliminate clock skew and wire-to-wire crosstalk, enabling multi-gigahertz signalling.",
    "explanation": "Parallel buses are limited to ~133 MHz because clock skew across 32 or 64 physical wires creates timing violations. Serial links embed clock in the data stream (8b/10b encoding) and run at 10+ Gbps per lane.",
    "hint": "Embedded clock in serial data eliminates inter-wire skew.",
    "level": "expert",
    "codeExample": "// PCIe Gen 4: 16 GT/s per serial differential lane."
  },
  {
    "question": "How does clock gating (ICG) save power in large register arrays?",
    "shortAnswer": "It disables clock switching to registers when their Load signal is inactive, preventing dynamic power dissipation.",
    "explanation": "In CMOS circuits, dynamic power is dissipated every time the clock line switches (P = C * V^2 * f). Integrated Clock Gating (ICG) cells shut off the clock tree to idle registers, cutting power by up to 70%.",
    "hint": "Dynamic power = alpha * C * V^2 * f.",
    "level": "expert",
    "codeExample": "// ICG Cell instantiation in ASIC synthesis:\nCKGATE_X4 u_icg (.CLK(clk), .E(load_en), .GCLK(gated_clk));"
  },
  {
    "question": "What is the difference between Synchronous Clear and Asynchronous Clear in register design?",
    "shortAnswer": "Synchronous Clear resets the register on the clock edge; Asynchronous Clear resets immediately.",
    "explanation": "Synchronous clear is integrated into the D input logic cloud (D = Clear' * Data), requiring a clock edge to take effect. Asynchronous clear drives the flip-flop's internal preset/clear silicon lines directly.",
    "hint": "Synchronous waits for posedge CLK; Asynchronous operates immediately.",
    "level": "basic",
    "codeExample": "// Synchronous Clear:\nalways @(posedge clk) if (clr) q <= 0;\n\n// Asynchronous Clear:\nalways @(posedge clk or posedge clr) if (clr) q <= 0;"
  },
  {
    "question": "What is the Register Transfer Language (RTL) notation for copying Register B into Register A?",
    "shortAnswer": "A <- B.",
    "explanation": "In RTL notation, 'A <- B' denotes that the binary content of register B is transferred simultaneously into register A during the active transition of the clock.",
    "hint": "Arrow notation indicates synchronous state transfer.",
    "level": "basic",
    "codeExample": "R1 <- R2; // Content of R2 copied to R1"
  },
  {
    "question": "What is a Conditional Register Transfer in RTL?",
    "shortAnswer": "A transfer that occurs only if a specified Boolean control condition is TRUE: 'If (P = 1) then (A <- B)'.",
    "explanation": "Written symbolically as 'P: A <- B', where P is a control signal generated by the CPU control unit. When P=1, the load enable of register A is asserted on the clock edge.",
    "hint": "Control signal P enables the register transfer.",
    "level": "moderate",
    "codeExample": "T2: MAR <- PC; // When timing state T2 is active, load PC into MAR"
  },
  {
    "question": "How is a Common Bus System constructed for 4 registers using 4-to-1 Multiplexers?",
    "shortAnswer": "Each bit position i of the bus uses a 4-to-1 MUX to select bit i from Register A, B, C, or D.",
    "explanation": "For an N-bit system with 4 registers, N 4-to-1 multiplexers are deployed. Common selection lines S1, S0 determine which register drives all N lines of the bus simultaneously.",
    "hint": "MUX 0 selects bit 0; MUX 1 selects bit 1; MUX N selects bit N.",
    "level": "expert",
    "codeExample": "// Selection table:\n// S1 S0 | Selected Register\n// 0  0  | Reg A\n// 0  1  | Reg B\n// 1  0  | Reg C\n// 1  1  | Reg D"
  },
  {
    "question": "What is a General Purpose Register (GPR) and how does it benefit CPU execution speed?",
    "shortAnswer": "High-speed internal storage directly accessible by the ALU without accessing slower main memory.",
    "explanation": "Reading from a CPU register takes &lt; 0.5 nanoseconds, whereas reading from main RAM takes 50-100 nanoseconds. Having multiple GPRs (R0..R31) keeps active variables in fast silicon memory.",
    "hint": "Registers are the fastest memory tier in the computer hierarchy.",
    "level": "basic",
    "codeExample": "ADD R1, R2, R3; // R1 = R2 + R3 (executed entirely within GPRs in 1 cycle)"
  },
  {
    "question": "What is a Status Register (Flags / Condition Code Register)?",
    "shortAnswer": "A register containing individual 1-bit flags (Zero, Carry, Sign, Overflow, Parity) set by ALU results.",
    "explanation": "The status register records side-effects of arithmetic/logic operations. Conditional branch instructions (BEQ, BNE, BLT) inspect these flags to make programmatic branching decisions.",
    "hint": "Contains Z (Zero), C (Carry), N/S (Negative/Sign), V/O (Overflow) flags.",
    "level": "moderate",
    "codeExample": "FLAGS[0] = Carry; FLAGS[1] = Zero; FLAGS[2] = Overflow;"
  },
  {
    "question": "What is Register Spilling in compiler optimization?",
    "shortAnswer": "Moving variable values from CPU registers to the stack frame in RAM when registers run out.",
    "explanation": "When an algorithm requires more simultaneous variables than the physical CPU register file can hold, the compiler generates store/load instructions to temporarily 'spill' variables to the stack in memory.",
    "hint": "Occurs when variable demand exceeds register capacity.",
    "level": "expert",
    "codeExample": "// Compiler spills R4 to stack:\nSW R4, 16(SP); // Save to stack frame"
  },
  {
    "question": "What is Double Buffering (Ping-Pong Buffering) using registers?",
    "shortAnswer": "Using two registers where one receives incoming data while the second is read by the processing engine.",
    "explanation": "Double buffering eliminates pipeline stalls: Producer writes to Buffer A while Consumer reads from Buffer B. On the frame clock, the buffers swap roles instantly with zero downtime.",
    "hint": "Ping-pong swap allows continuous simultaneous read and write.",
    "level": "expert",
    "codeExample": "always @(posedge frame_clk) begin\n  bank_sel <= ~bank_sel;\nend"
  },
  {
    "question": "What is a Shadow Register in real-time embedded architectures?",
    "shortAnswer": "A duplicated register bank used for instantaneous context switching without memory stack save operations.",
    "explanation": "When a high-priority interrupt occurs, the CPU swaps to shadow registers in 1 clock cycle, eliminating the overhead of pushing and popping registers to and from the RAM stack.",
    "hint": "Hardware duplicate register bank for zero-latency interrupt handling.",
    "level": "expert",
    "codeExample": "// ARM Fast Interrupt Request (FIQ) uses banked shadow registers R8_fiq - R14_fiq."
  },
  {
    "question": "What is the overall industry design standard for synchronous parallel load registers in SystemVerilog?",
    "shortAnswer": "Explicit synchronous load with asynchronous active-LOW reset using standard non-blocking assignments (<=).",
    "explanation": "Standard industrial RTL code enforces synchronous load enable, asynchronous active-low reset for deterministic initialization, and non-blocking assignments to prevent race conditions during logic simulation.",
    "hint": "always_ff @(posedge clk or negedge rst_n).",
    "level": "expert",
    "codeExample": "always_ff @(posedge clk or negedge rst_n) begin\n  if (!rst_n) q_out <= '0;\n  else if (load_en) q_out <= d_in;\nend"
  }
];

export default questions;
