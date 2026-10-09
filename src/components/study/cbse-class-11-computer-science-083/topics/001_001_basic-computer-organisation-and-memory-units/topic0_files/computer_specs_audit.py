"""
Coder & AccoTax - CBSE Class XI Computer Science (083)
Module 001_001: Basic Computer Organisation & Memory Units
Companion Code: computer_specs_audit.py
Educator: Sukanta Hui (Barrackpore, West Bengal)

This script demonstrates:
1. Memory measurement unit conversions (Bit -> Nibble -> Byte -> KB -> MB -> GB -> TB -> PB).
2. Direct addressable memory calculation based on Address Bus width (32-bit vs 64-bit).
3. Memory module capacity calculations.
4. CPU Instruction Execution Simulation (Fetch-Decode-Execute-Store).
"""

def memory_unit_converter(value: float, from_unit: str, to_unit: str) -> float:
    """
    Converts storage values across binary computing units (1024 base).
    Units supported: B, KB, MB, GB, TB, PB, EB
    """
    units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']
    from_unit = from_unit.upper()
    to_unit = to_unit.upper()
    
    if from_unit not in units or to_unit not in units:
        raise ValueError(f"Invalid units. Choose from {units}")
    
    from_power = units.index(from_unit)
    to_power = units.index(to_unit)
    
    # Convert to base Bytes first
    bytes_val = value * (1024 ** from_power)
    
    # Convert from Bytes to destination unit
    result = bytes_val / (1024 ** to_power)
    return result


def address_bus_capacity(bit_width: int) -> dict:
    """
    Calculates maximum addressable physical memory for a given Address Bus width.
    """
    total_bytes = 2 ** bit_width
    gb = total_bytes / (1024 ** 3)
    tb = total_bytes / (1024 ** 4)
    eb = total_bytes / (1024 ** 6)
    
    return {
        "bit_width": bit_width,
        "total_addresses": total_bytes,
        "gigabytes": gb,
        "terabytes": tb,
        "exabytes": eb
    }


def simulate_instruction_cycle(instructions):
    """
    Simulates the Fetch-Decode-Execute-Store cycle of a CPU.
    """
    print("\n--- CPU Instruction Cycle Simulation ---")
    pc = 0  # Program Counter
    accumulator = 0  # Accumulator Register (AC)
    
    while pc < len(instructions):
        # 1. FETCH
        instruction = instructions[pc]
        print(f"\n[FETCH]   PC = {pc:02d} -> Fetched Instruction: '{instruction}'")
        pc += 1  # PC automatically points to NEXT instruction
        
        # 2. DECODE
        parts = instruction.split()
        opcode = parts[0]
        operand = int(parts[1]) if len(parts) > 1 else None
        print(f"[DECODE]  Opcode: '{opcode}', Operand: {operand}")
        
        # 3. EXECUTE & 4. STORE
        if opcode == "LOAD":
            accumulator = operand
            print(f"[EXECUTE] Loaded {operand} into Accumulator.")
        elif opcode == "ADD":
            old_ac = accumulator
            accumulator += operand
            print(f"[EXECUTE] ALU Add: {old_ac} + {operand} = {accumulator} -> Stored in AC.")
        elif opcode == "SUB":
            old_ac = accumulator
            accumulator -= operand
            print(f"[EXECUTE] ALU Sub: {old_ac} - {operand} = {accumulator} -> Stored in AC.")
        elif opcode == "MUL":
            old_ac = accumulator
            accumulator *= operand
            print(f"[EXECUTE] ALU Mul: {old_ac} * {operand} = {accumulator} -> Stored in AC.")
        elif opcode == "PRINT":
            print(f"[OUTPUT]  Output Unit Display: Accumulator Value = {accumulator}")
        elif opcode == "HALT":
            print("[EXECUTE] Processor HALT signal received.")
            break
            
    print(f"\nFinal Accumulator State: {accumulator}")
    print(f"Final Program Counter State: {pc}")


if __name__ == "__main__":
    print("=" * 60)
    print("CODER & ACCOTAX - COMPUTER ORGANISATION AUDIT & CALCULATOR")
    print("=" * 60)
    
    # 1. Memory Unit Conversions
    file_size_gb = 4.5
    converted_kb = memory_unit_converter(file_size_gb, "GB", "KB")
    converted_mb = memory_unit_converter(file_size_gb, "GB", "MB")
    converted_bytes = memory_unit_converter(file_size_gb, "GB", "B")
    
    print(f"\n1. Memory Unit Conversions for {file_size_gb} GB File:")
    print(f"   -> {converted_bytes:,.0f} Bytes")
    print(f"   -> {converted_kb:,.0f} KB")
    print(f"   -> {converted_mb:,.0f} MB")
    print(f"   -> {file_size_gb} GB")
    
    # 2. Address Bus Capacity Analysis
    print("\n2. Address Bus Width vs Addressable RAM:")
    for bits in [16, 32, 64]:
        info = address_bus_capacity(bits)
        if bits == 16:
            print(f"   - {bits}-bit Address Bus: {info['total_addresses'] // 1024} KB of RAM")
        elif bits == 32:
            print(f"   - {bits}-bit Address Bus: {info['gigabytes']:.0f} GB of RAM")
        elif bits == 64:
            print(f"   - {bits}-bit Address Bus: {info['exabytes']:.0f} Exabytes (EB) of RAM")
            
    # 3. RAM Module Math
    target_ram_gb = 16
    module_size_mb = 2048  # 2 GB per module
    total_modules = (target_ram_gb * 1024) // module_size_mb
    print(f"\n3. Module Requirement: To build {target_ram_gb} GB RAM using {module_size_mb} MB sticks:")
    print(f"   -> Requires exactly {total_modules} RAM modules.")
    
    # 4. Instruction Execution Cycle Simulation
    test_program = [
        "LOAD 50",
        "ADD 25",
        "MUL 2",
        "SUB 10",
        "PRINT",
        "HALT"
    ]
    simulate_instruction_cycle(test_program)
    print("=" * 60)
