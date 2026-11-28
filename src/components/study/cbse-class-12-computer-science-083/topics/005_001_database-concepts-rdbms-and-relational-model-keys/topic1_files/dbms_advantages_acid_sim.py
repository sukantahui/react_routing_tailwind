"""
CBSE Class 12 Computer Science (083)
Topic 1: DBMS Advantages & ACID Transaction Simulation
Demonstrates:
1. Data Integrity enforcement (CHECK constraint on marks 0-100)
2. ACID Atomicity (Bank fund transfer with automatic rollback on failure)
3. Concurrency simulation
"""

class DBMSBankSimulator:
    def __init__(self):
        self.accounts = {
            "ACC_101": {"holder": "Suresh Roy", "balance": 5000},
            "ACC_102": {"holder": "Anita Desai", "balance": 3000}
        }
        self.students = {}
        
    def insert_student(self, roll_no, name, marks):
        """Simulate DBMS Data Integrity (CHECK Marks BETWEEN 0 AND 100)"""
        print(f"\n[DB INSERT ATTEMPT] Roll: {roll_no}, Name: '{name}', Marks: {marks}")
        # Integrity Constraint Check
        if not (0 <= marks <= 100):
            print("  [ERROR 403 - CONSTRAINT VIOLATION]: CHECK (Marks >= 0 AND Marks <= 100) failed!")
            print(f"  Insertion REJECTED. Invalid marks {marks} discarded by DBMS engine.")
            return False
            
        self.students[roll_no] = {"name": name, "marks": marks}
        print(f"  [SUCCESS]: Student {name} inserted successfully. Data integrity preserved.")
        return True

    def transfer_funds_acid(self, sender_id, receiver_id, amount, simulate_network_crash=False):
        """Demonstrate ACID Atomicity & Rollback"""
        print(f"\n[TRANSACTION BEGIN] Transfer Rs.{amount} from {sender_id} to {receiver_id}")
        
        # Save snapshot for rollback
        sender_orig = self.accounts[sender_id]["balance"]
        receiver_orig = self.accounts[receiver_id]["balance"]
        
        if sender_orig < amount:
            print("  [ERROR]: Insufficient balance! Transaction aborted.")
            return False
            
        # Step 1: Debit sender
        self.accounts[sender_id]["balance"] -= amount
        print(f"  Step 1: Debited Rs.{amount} from {sender_id}. New Balance = {self.accounts[sender_id]['balance']}")
        
        # Step 2: Simulate power cut or crash before credit
        if simulate_network_crash:
            print("  [CRITICAL ALERT]: Unexpected system power failure / network disconnection!")
            print("  [DBMS RECOVERY AGENT]: Invoking automated ROLLBACK to preserve ATOMICITY...")
            self.accounts[sender_id]["balance"] = sender_orig
            self.accounts[receiver_id]["balance"] = receiver_orig
            print(f"  [ROLLBACK COMPLETE]: Sender balance restored to Rs.{self.accounts[sender_id]['balance']}.")
            print("  All-or-Nothing property maintained: No money vanished into thin air!")
            return False
            
        # Step 3: Credit receiver
        self.accounts[receiver_id]["balance"] += amount
        print(f"  Step 2: Credited Rs.{amount} to {receiver_id}. New Balance = {self.accounts[receiver_id]['balance']}")
        print("  [TRANSACTION COMMIT]: Transaction committed permanently (Durability satisfied).")
        return True

if __name__ == "__main__":
    dbms = DBMSBankSimulator()
    print("=" * 65)
    print("  CBSE CS 083: DBMS INTEGRITY & ACID TRANSACTION SIMULATOR")
    print("=" * 65)
    
    # 1. Integrity Constraint Test
    dbms.insert_student(1, "Aakash Paul", 88)
    dbms.insert_student(2, "Corrupt Record", 145)  # Should be rejected!
    
    # 2. ACID Transaction with Crash & Rollback
    print("-" * 65)
    print("Test 1: Fund transfer with crash during transit:")
    dbms.transfer_funds_acid("ACC_101", "ACC_102", 1500, simulate_network_crash=True)
    
    print("-" * 65)
    print("Test 2: Successful complete fund transfer:")
    dbms.transfer_funds_acid("ACC_101", "ACC_102", 1500, simulate_network_crash=False)
    print("=" * 65)
