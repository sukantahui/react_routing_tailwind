"""
Topic 10 - Example 6: Safe Atomic File Writing Pattern (Industry Standard)
Module: 002_008_file-handling
Institute: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui

Key Concepts Covered:
1. The Danger of Direct 'w' mode: If the program crashes or loses power midway,
   the original file is already destroyed and left half-written or empty (0 bytes).
2. The Solution - Atomic Writing:
   Step 1: Write new content to a temporary file in the same directory.
   Step 2: Flush and sync data to disk.
   Step 3: Atomically rename/replace the temporary file over the target file using os.replace().
3. In POSIX and Windows NT, os.replace() is an atomic filesystem operation.
"""

import os
import tempfile

def safe_atomic_file_update(target_filepath, new_content):
    """
    Safely writes new_content to target_filepath without risk of corruption.
    Even if the computer powers off midway, either the old version stays intact
    or the new version is completely written.
    """
    directory = os.path.dirname(target_filepath) or "."
    
    # 1. Create a secure temporary file in the same directory/partition
    with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", dir=directory, delete=False) as temp_f:
        temp_filepath = temp_f.name
        print(f"    [Step 1] Writing to temporary staging file: {os.path.basename(temp_filepath)}")
        
        # Write content and ensure it is flushed to physical storage
        temp_f.write(new_content)
        temp_f.flush()
        os.fsync(temp_f.fileno())

    # 2. Atomically swap the temporary file with the target file
    print(f"    [Step 2] Atomically swapping '{os.path.basename(temp_filepath)}' -> '{target_filepath}'")
    os.replace(temp_filepath, target_filepath)
    print(f"    [Step 3] Atomic swap successful! File is 100% consistent.")

def run_atomic_demo():
    config_file = "app_system_config.ini"
    
    # Initial Configuration
    initial_config = """[SystemSettings]
Institute = Coder & AccoTax
Location = Barrackpore, West Bengal
ActiveBatch = 2026_Python_Masterclass
MaxStudentsPerBatch = 35
BackupIntervalSeconds = 300
"""
    print(f"[*] Creating initial configuration file: '{config_file}'...")
    with open(config_file, mode="w", encoding="utf-8") as f:
        f.write(initial_config)
        
    print("\n--- Initial Config Content ---")
    with open(config_file, mode="r", encoding="utf-8") as f:
        print(f.read())
        
    # Updated Configuration to be written safely
    updated_config = """[SystemSettings]
Institute = Coder & AccoTax
Location = Barrackpore & Kolkata Hubs
ActiveBatch = 2026_Python_Masterclass
MaxStudentsPerBatch = 50
BackupIntervalSeconds = 120
MaintenanceMode = False
"""
    print("[*] Performing Safe Atomic Update on System Config...")
    safe_atomic_file_update(config_file, updated_config)
    
    print("\n--- Verified Updated Config Content ---")
    with open(config_file, mode="r", encoding="utf-8") as f:
        print(f.read())

if __name__ == "__main__":
    run_atomic_demo()
