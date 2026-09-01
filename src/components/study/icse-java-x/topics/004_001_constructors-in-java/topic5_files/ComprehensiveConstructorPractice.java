/**
 * ICSE Class 10 Computer Applications - Module 004_001 Topic 5
 * Comprehensive ICSE Board Program: BankAccount & Library Book Management
 *
 * Demonstrates:
 * 1. 15-Mark ICSE Board Exam Class Design.
 * 2. Parameterized constructor initializing fields.
 * 3. Member methods performing calculations (Deposit, Withdraw, Fine calculation).
 * 4. Display method printing complete object status.
 *
 * @author Sukanta Hui - Coder & AccoTax
 */
public class ComprehensiveConstructorPractice {

    // Instance Variables (Fields)
    private String depositorName;
    private long accountNumber;
    private double balance;

    // 1. Parameterized Constructor to initialize account
    public ComprehensiveConstructorPractice(String depositorName, long accountNumber, double balance) {
        this.depositorName = depositorName;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // 2. Member Method to Deposit Amount
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            System.out.println("✅ Deposited: Rs. " + amount + " | Updated Balance: Rs. " + this.balance);
        } else {
            System.out.println("❌ Invalid Deposit Amount!");
        }
    }

    // 3. Member Method to Withdraw Amount
    public void withdraw(double amount) {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
            System.out.println("✅ Withdrawn: Rs. " + amount + " | Remaining Balance: Rs. " + this.balance);
        } else {
            System.out.println("❌ Insufficient Balance or Invalid Amount!");
        }
    }

    // 4. Member Method to Display Account Status
    public void display() {
        System.out.println("========================================");
        System.out.println("ACCOUNT STATUS REPORT");
        System.out.println("Account Holder : " + this.depositorName);
        System.out.println("Account Number : " + this.accountNumber);
        System.out.println("Current Balance: Rs. " + this.balance);
        System.out.println("========================================");
    }

    public static void main(String[] args) {
        System.out.println("=== ICSE Class Design Practice Program ===");

        // Create object using Parameterized Constructor
        ComprehensiveConstructorPractice acc1 = new ComprehensiveConstructorPractice("Amitav Ghosh", 9876543210L, 5000.0);
        
        acc1.display();
        acc1.deposit(2500.0);
        acc1.withdraw(1200.0);
        acc1.display();
    }
}
