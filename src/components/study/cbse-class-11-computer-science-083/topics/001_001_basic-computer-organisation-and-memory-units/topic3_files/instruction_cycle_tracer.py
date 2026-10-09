"""
=============================================================================
Instruction Execution Cycle Simulator (Python 3)
CBSE Class XI Computer Science (Subject Code: 083)
Unit I: Computer Systems and Organisation (CSO)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
=============================================================================
Demonstrates the four distinct phases of the Von Neumann Machine Cycle:
1. Fetch Phase  (PC -> MAR -> RAM -> MDR -> IR; PC is incremented)
2. Decode Phase (Control Unit decodes Opcode and operands)
3. Execute Phase (ALU performs calculation or logic test)
4. Store Phase  (Result written back to Accumulator or RAM)
"""

class MachineCycleTracer:
    def __init__(self):
        self.RAM = {
            100: "LOAD 200",   # Load value at address 200 into Accumulator
            101: "ADD 201",    # Add value at address 201 to Accumulator
            102: "STORE 202",  # Store Accumulator result into address 202
            103: "HALT",       # Terminate instruction cycle
            200: 45,           # Input 1: Student Attendance Marks
            201: 50,           # Input 2: Project Practical Marks
            202: 0             # Result: Total Marks (initially 0)
        }
        self.PC = 100
        self.IR = ""
        self.MAR = 0
        self.MDR = ""
        self.ACC = 0
        self.cycle_count = 0

    def step_fetch(self):
        print(f"\n[PHASE 1: FETCH]")
        self.MAR = self.PC
        print(f"  1.1 Load PC ({self.PC}) into Memory Address Register (MAR = {self.MAR})")
        self.MDR = self.RAM[self.MAR]
        print(f"  1.2 Bus Read: RAM[{self.MAR}] ('{self.MDR}') latched into MDR")
        self.IR = self.MDR
        print(f"  1.3 Move instruction from MDR into Instruction Register (IR = '{self.IR}')")
        self.PC += 1
        print(f"  1.4 Automatically increment PC to point to next instruction (PC = {self.PC})")

    def step_decode(self):
        print(f"\n[PHASE 2: DECODE]")
        tokens = self.IR.split()
        opcode = tokens[0].upper()
        operand = int(tokens[1]) if len(tokens) > 1 else None
        print(f"  2.1 Control Unit decodes IR opcode: '{opcode}'")
        if operand is not None:
            print(f"  2.2 Decoded target memory operand address: {operand}")
        return opcode, operand

    def step_execute(self, opcode, operand):
        print(f"\n[PHASE 3: EXECUTE]")
        if opcode == "LOAD":
            val = self.RAM[operand]
            print(f"  3.1 Reading memory location {operand} (Value = {val})")
            return ("LOAD", val, None)
        elif opcode == "ADD":
            val = self.RAM[operand]
            print(f"  3.2 ALU performs Addition: ACC ({self.ACC}) + Memory[{operand}] ({val})")
            result = self.ACC + val
            return ("ADD", result, None)
        elif opcode == "STORE":
            print(f"  3.3 Preparing to write ACC ({self.ACC}) into RAM location {operand}")
            return ("STORE", self.ACC, operand)
        elif opcode == "HALT":
            print("  3.4 Processing HALT: Processor clock gating and sleep mode triggered.")
            return ("HALT", None, None)

    def step_store(self, action_tuple):
        print(f"\n[PHASE 4: STORE / WRITEBACK]")
        action, val, target_addr = action_tuple
        if action == "LOAD":
            self.ACC = val
            print(f"  4.1 Value {val} stored into Accumulator (ACC = {self.ACC})")
        elif action == "ADD":
            self.ACC = val
            print(f"  4.2 Addition result {val} stored into Accumulator (ACC = {self.ACC})")
        elif action == "STORE":
            self.RAM[target_addr] = val
            print(f"  4.3 Wrote value {val} from ACC into RAM[{target_addr}] (RAM[{target_addr}] = {self.RAM[target_addr]})")
        elif action == "HALT":
            print("  4.4 Execution state latched permanently.")

    def run_cycle(self):
        print("=" * 65)
        print("STARTING INSTRUCTION EXECUTION CYCLE SIMULATION")
        print("=" * 65)
        while True:
            self.cycle_count += 1
            print(f"\n{'*'*25} MACHINE CYCLE #{self.cycle_count} {'*'*25}")
            self.step_fetch()
            opcode, operand = self.step_decode()
            if opcode == "HALT":
                self.step_execute(opcode, operand)
                self.step_store(("HALT", None, None))
                break
            action_result = self.step_execute(opcode, operand)
            self.step_store(action_result)

        print("\n" + "=" * 65)
        print("EXECUTION COMPLETED SUCCESSFULLY - MEMORY & REGISTER DUMP")
        print("=" * 65)
        print(f"Final Accumulator (ACC) Value : {self.ACC}")
        print(f"Result at RAM[202]             : {self.RAM[202]} Marks (45 + 50 = 95)")
        print(f"Total Machine Cycles Executed : {self.cycle_count}")


if __name__ == "__main__":
    tracer = MachineCycleTracer()
    tracer.run_cycle()
