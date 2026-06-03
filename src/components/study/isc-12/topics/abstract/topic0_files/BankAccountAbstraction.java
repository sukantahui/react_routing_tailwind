// BankAccountAbstraction.java
// Real-world abstraction: bank account hides internal ledger and balance calculation

abstract class BankAccount {
    protected double balance;
    
    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }
    
    // Abstract methods - what you can do
    public abstract void deposit(double amount);
    public abstract void withdraw(double amount);
    public abstract double getBalance();
    
    // Concrete method - shared behavior
    public void printStatement() {
        System.out.println("Account statement generated (internal logs hidden)");
    }
}

class SavingsAccount extends BankAccount {
    private double interestRate = 0.03;
    private String lastTransaction = "";
    
    public SavingsAccount(double initialBalance) {
        super(initialBalance);
    }
    
    @Override
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            updateLedger("DEPOSIT", amount);   // hidden internal method
            System.out.println("Deposited: $" + amount);
        }
    }
    
    @Override
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            updateLedger("WITHDRAW", amount);
            System.out.println("Withdrew: $" + amount);
        } else {
            System.out.println("Insufficient funds");
        }
    }
    
    @Override
    public double getBalance() {
        applyInterestIfNeeded();  // hidden calculation
        return balance;
    }
    
    // INTERNAL COMPLEXITY (hidden from client)
    private void updateLedger(String type, double amount) {
        lastTransaction = type + " of $" + amount;
        System.out.println("Ledger updated: " + lastTransaction);
    }
    
    private void applyInterestIfNeeded() {
        // Complex interest calculation hidden
        balance += balance * interestRate / 12;
    }
}

public class BankAccountAbstraction {
    public static void main(String[] args) {
        BankAccount myAccount = new SavingsAccount(500.0);
        myAccount.deposit(200);
        myAccount.withdraw(100);
        System.out.println("Final balance: $" + myAccount.getBalance());
        // myAccount.updateLedger(...); // ERROR - hidden method
    }
}