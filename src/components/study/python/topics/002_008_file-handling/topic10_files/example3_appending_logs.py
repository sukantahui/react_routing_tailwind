"""
Topic 10 - Example 3: Append Mode ('a') for Real-Time Event & Transaction Logging
Module: 002_008_file-handling
Institute: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui

Key Concepts Covered:
1. Append mode ('a') creates the file if it does not exist.
2. If the file exists, the pointer is automatically placed at EOF (End of File).
3. Previous content is strictly preserved; new data is appended at the end.
4. Using datetime timestamps for real-world audit trails and fee transactions.
5. Contrast with 'w' mode (which would wipe out historical audit logs).
"""

from datetime import datetime
import time

def log_fee_transaction(student_name, center, amount, payment_mode, log_file="fee_audit_trail.log"):
    """
    Appends a new student fee transaction record to the audit log.
    Preserves all previous records across multiple function invocations.
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Notice mode='a' (append)
    with open(log_file, mode="a", encoding="utf-8") as file:
        log_entry = f"[{timestamp}] [TXN-SUCCESS] Student: {student_name:<10} | Center: {center:<12} | Paid: ₹{amount:>6,d} | Mode: {payment_mode}\n"
        file.write(log_entry)
        print(f"    [+] Appended transaction for {student_name} (₹{amount})")

def run_simulation():
    logfile = "fee_audit_trail.log"
    
    # If starting fresh for simulation, write header once
    with open(logfile, mode="w", encoding="utf-8") as file:
        file.write("================================================================================\n")
        file.write("        CODER & ACCOTAX BARRACKPORE - REAL-TIME FEE AUDIT TRANSACTION LOG       \n")
        file.write("================================================================================\n")
    
    print(f"[*] Simulating real-time transactions logging in mode 'a' to '{logfile}'...\n")
    
    # Simulation: Multiple transactions happening over time
    transactions = [
        ("Mamata", "Barrackpore", 4500, "UPI / PhonePe"),
        ("Debangshu", "Jadavpur", 5000, "Net Banking"),
        ("Susmita", "Kolkata", 6000, "Credit Card"),
        ("Mahima", "Ichapur", 4500, "UPI / GPay"),
        ("Abhronila", "Barrackpore", 5500, "Cash Counter")
    ]
    
    for student, hub, amt, mode in transactions:
        log_fee_transaction(student, hub, amt, mode, logfile)
        # Small delay to showcase time progression in log
        time.sleep(0.01)
        
    print(f"\n[✓] All transactions logged safely without overwriting previous entries!")
    
    # Read and display the entire appended log file
    print("\n--- Final Persisted Log File ---")
    with open(logfile, mode="r", encoding="utf-8") as file:
        print(file.read())

if __name__ == "__main__":
    run_simulation()
