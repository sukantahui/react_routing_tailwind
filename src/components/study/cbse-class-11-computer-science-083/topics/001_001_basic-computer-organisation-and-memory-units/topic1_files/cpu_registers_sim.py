"""
=============================================================================
CPU Architecture & Register Simulation (Python 3)
CBSE Class XI Computer Science (Subject Code: 083)
Unit I: Computer Systems and Organisation (CSO)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
=============================================================================
Demonstrates the working mechanics of CPU registers (PC, IR, MAR, MDR, ACC),
Arithmetic Logic Unit (ALU), and Control Unit (CU) during arithmetic operations.
"""

class SimulatedCPU:
    def __init__(self, memory_size=64):
        # 1. Internal Registers
        self.PC = 0           # Program Counter: Address of next instruction
        self.IR = ""          # Instruction Register: Current instruction op-code
        self.MAR = 0          # Memory Address Register: Target bus address
        self.MDR = 0          # Memory Data Register / MBR: Data read/written
        self.ACC = 0          # Accumulator: Holds ALU calculation results
        self.FLAGS = {"Z": 0, "N": 0, "O": 0}  # Zero, Negative, Overflow flags
        
        # 2. Primary Memory (Simulated RAM address space)
        self.RAM = [0] * memory_size
        self.clock_cycles = 0

    def load_program(self, program, start_address=0):
        """Loads a sequence of assembly-like instructions into RAM."""
        for i, instruction in enumerate(program):
            self.RAM[start_address + i] = instruction
        self.PC = start_address

    def tick(self):
        """Advances CPU clock cycle counter."""
        self.clock_cycles += 1

    def fetch(self):
        """Fetch Phase: PC -> MAR -> RAM -> MDR -> IR; PC is incremented."""
        print(f"\n--- [Clock Tick {self.clock_cycles + 1}] FETCH PHASE ---")
        self.MAR = self.PC
        print(f"[Bus Access] Loading PC ({self.PC}) into MAR ({self.MAR})")
        
        self.tick()
        self.MDR = self.RAM[self.MAR]
        print(f"[Memory Read] Reading RAM[{self.MAR}] -> MDR: '{self.MDR}'")
        
        self.IR = self.MDR
        print(f"[Instruction Load] IR loaded with instruction: '{self.IR}'")
        
        self.PC += 1
        print(f"[PC Updated] Next instruction address PC = {self.PC}")

    def decode_and_execute(self):
        """Decode & Execute Phase: CU decodes IR and triggers ALU/Registers."""
        if not self.IR or self.IR == "HALT":
            return False

        print(f"\n--- [Clock Tick {self.clock_cycles + 1}] DECODE & EXECUTE PHASE ---")
        tokens = self.IR.split()
        opcode = tokens[0].upper()
        operand = int(tokens[1]) if len(tokens) > 1 else None

        self.tick()
        if opcode == "LOAD":
            # Load value from RAM address into Accumulator
            self.MAR = operand
            self.MDR = self.RAM[self.MAR]
            self.ACC = self.MDR
            print(f"[CU Action] Loaded RAM[{operand}] ({self.MDR}) into ACC = {self.ACC}")

        elif opcode == "ADD":
            # ALU adds RAM[operand] to Accumulator
            self.MAR = operand
            self.MDR = self.RAM[self.MAR]
            prev_acc = self.ACC
            self.ACC += self.MDR
            print(f"[ALU Operation] ADD: {prev_acc} + {self.MDR} -> ACC = {self.ACC}")

        elif opcode == "SUB":
            # ALU subtracts RAM[operand] from Accumulator
            self.MAR = operand
            self.MDR = self.RAM[self.MAR]
            prev_acc = self.ACC
            self.ACC -= self.MDR
            print(f"[ALU Operation] SUB: {prev_acc} - {self.MDR} -> ACC = {self.ACC}")

        elif opcode == "STORE":
            # Store Accumulator value into RAM address
            self.MAR = operand
            self.MDR = self.ACC
            self.RAM[self.MAR] = self.MDR
            print(f"[Memory Write] Stored ACC ({self.ACC}) into RAM[{operand}]")

        elif opcode == "OUT":
            print(f">>> [Output Display] Output: {self.ACC} (Student Grade Calculation)")

        # Update Zero & Negative Status Flags
        self.FLAGS["Z"] = 1 if self.ACC == 0 else 0
        self.FLAGS["N"] = 1 if self.ACC < 0 else 0
        return True

    def run(self):
        """Runs the complete program until HALT."""
        print("=" * 65)
        print("SIMULATING CENTRAL PROCESSING UNIT (CPU) EXECUTION PIPELINE")
        print("=" * 65)
        while True:
            self.fetch()
            if self.IR == "HALT":
                print("\n[CU Status] HALT instruction reached. Execution completed.")
                break
            if not self.decode_and_execute():
                break

        print("\n--- FINAL REGISTER DUMP ---")
        print(f"Accumulator (ACC)         : {self.ACC}")
        print(f"Program Counter (PC)      : {self.PC}")
        print(f"Memory Address Reg (MAR)  : {self.MAR}")
        print(f"Memory Data Reg (MDR)     : {self.MDR}")
        print(f"Instruction Reg (IR)      : '{self.IR}'")
        print(f"Status Flags (Z, N)       : Z={self.FLAGS['Z']}, N={self.FLAGS['N']}")
        print(f"Total Clock Cycles Spent  : {self.clock_cycles}")


if __name__ == "__main__":
    cpu = SimulatedCPU(memory_size=32)

    # Place data in RAM addresses 20, 21, 22 (e.g. Student Marks: Math=85, CS=95)
    cpu.RAM[20] = 85   # Math marks (Student: Abhronila, Barrackpore)
    cpu.RAM[21] = 95   # CS marks
    cpu.RAM[22] = 0    # Reserved for Total Sum

    # Assembly Program in RAM (Address 0 to 5)
    program = [
        "LOAD 20",   # Load Math marks (85) into ACC
        "ADD 21",    # Add CS marks (95) to ACC -> ACC becomes 180
        "STORE 22",  # Save total (180) to RAM[22]
        "OUT",       # Display ACC to output console
        "HALT"       # Stop processor
    ]

    cpu.load_program(program, start_address=0)
    cpu.run()
