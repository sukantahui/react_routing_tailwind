"""
CBSE Class 11 Computer Science (083) - Unit 1 Computer Systems and Organisation
Module: Types of Software, OS Architecture & Language Processors
File: compiler_vs_interpreter_benchmark.py
Topic 2: Language Processors - Assembler, Compiler, and Interpreter

Demonstrates:
1. Three-way Language Translation Models:
   - Assembler (Mnemonic Assembly -> Machine Code)
   - Compiler (Entire Source Code -> Intermediate/Object File .o/.exe)
   - Interpreter (Line-by-line Parsing & Immediate Execution)
2. Execution speed benchmark and error reporting differences
"""

import time

# 1. Assembler Simulation
ASSEMBLY_SOURCE = [
    "MOV R1, #10",
    "MOV R2, #20",
    "ADD R0, R1, R2",
    "HLT"
]

OPCODE_TABLE = {
    "MOV": "0001",
    "ADD": "0010",
    "HLT": "1111"
}

def assemble_code(asm_lines: list) -> list:
    print("\n--- [1. ASSEMBLER TRANSLATION PIPELINE] ---")
    machine_code = []
    for line in asm_lines:
        tokens = line.replace(",", "").split()
        mnemonic = tokens[0]
        opcode = OPCODE_TABLE.get(mnemonic, "0000")
        binary_repr = f"{opcode} {tokens[1:] if len(tokens) > 1 else ''}"
        machine_code.append(binary_repr)
        print(f"Assembly: {line.ljust(16)} -> Machine Binary: {binary_repr}")
    return machine_code


# 2. Compiler vs Interpreter Comparison Simulation
SOURCE_PROGRAM = [
    "x = 10",
    "y = 25",
    "total = x + y",
    "invalid_variable_name % 99",  # Syntax error at line 4
    "print('Finished computation')"
]

def simulate_compiler(source: list):
    print("\n--- [2. COMPILER TRANSLATION (Batch Analysis)] ---")
    print("[*] Phase 1: Lexical, Syntax, & Semantic Analysis across entire file...")
    errors_found = []
    for line_num, statement in enumerate(source, start=1):
        if "%" in statement and "=" not in statement:
            errors_found.append(f"SyntaxError on Line {line_num}: Invalid token '%' in expression '{statement}'")
    
    if errors_found:
        print("[!] Compilation Failed! All syntax errors listed at once:")
        for err in errors_found:
            print(f"    - {err}")
        print("[!] No Object Code (.exe/.obj) generated. Program CANNOT run until all errors are fixed.")
    else:
        print("[+] Compilation Succeeded! Standalone binary target generated.")


def simulate_interpreter(source: list):
    print("\n--- [3. INTERPRETER EXECUTION (Line-by-Line)] ---")
    scope = {}
    for line_num, statement in enumerate(source, start=1):
        print(f"[*] Interpreting Line {line_num}: '{statement}'")
        time.sleep(0.05)
        try:
            if "%" in statement and "=" not in statement:
                raise SyntaxError(f"Invalid token on Line {line_num}")
            exec(statement, {}, scope)
            print(f"    [+] Executed successfully. Scope state: {scope}")
        except Exception as e:
            print(f"    [!] RUNTIME HALT: {e}")
            print("    [!] Interpreter stopped execution at line of first error. Subsequent lines never reached.")
            break


def main():
    print("=================================================================")
    print("  CBSE CLASS 11 CS (083) - LANGUAGE PROCESSORS BENCHMARK SUITE   ")
    print("=================================================================\n")

    # 1. Assemble Mnemonic code
    assemble_code(ASSEMBLY_SOURCE)

    # 2. Compiler batch translation
    simulate_compiler(SOURCE_PROGRAM)

    # 3. Interpreter immediate execution
    simulate_interpreter(SOURCE_PROGRAM)

if __name__ == "__main__":
    main()
