// BankInheritance.java - Real-world banking system with inheritance
// Locations: Naihati, Barrackpore branches

class BankAccount {
    protected String accountHolder;
    protected double balance;
    
    BankAccount(String holder, double initialBalance) {
        this.accountHolder = holder;
        this.balance = initialBalance;
        System.out.println("Account created for " + holder);
    }
    
    void deposit(double amount) {
        balance += amount;
        System.out.println("Deposited ₹" + amount + ". New balance: ₹" + balance);
    }
    
    void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            System.out.println("Withdrew ₹" + amount + ". Remaining: ₹" + balance);
        } else {
            System.out.println("Insufficient balance!");
        }
    }
    
    void displayBalance() {
        System.out.println(accountHolder + " balance: ₹" + balance);
    }
}

class SavingsAccount extends BankAccount {
    private double interestRate;
    
    SavingsAccount(String holder, double initial, double rate) {
        super(holder, initial);
        this.interestRate = rate;
    }
    
    void addInterest() {
        double interest = balance * interestRate / 100;
        balance += interest;
        System.out.println("Interest ₹" + interest + " added. New balance: ₹" + balance);
    }
    
    @Override
    void withdraw(double amount) {
        if (balance - amount >= 1000) { // minimum balance requirement
            super.withdraw(amount);
        } else {
            System.out.println("Cannot withdraw: minimum balance ₹1000 required.");
        }
    }
}

class CurrentAccount extends BankAccount {
    private double overdraftLimit;
    
    CurrentAccount(String holder, double initial, double limit) {
        super(holder, initial);
        this.overdraftLimit = limit;
    }
    
    @Override
    void withdraw(double amount) {
        if (amount <= balance + overdraftLimit) {
            balance -= amount;
            System.out.println("Withdrew ₹" + amount + " (overdraft allowed). New balance: ₹" + balance);
        } else {
            System.out.println("Overdraft limit exceeded!");
        }
    }
}

public class BankInheritance {
    public static void main(String[] args) {
        BankAccount acc1 = new SavingsAccount("Tuhina", 5000, 4.5);
        BankAccount acc2 = new CurrentAccount("Swadeep", 10000, 5000);
        
        acc1.deposit(2000);
        ((SavingsAccount) acc1).addInterest();
        acc1.withdraw(6000);  // Savings restriction applies
        
        acc2.withdraw(12000); // Uses overdraft
        acc2.withdraw(5000);  // Should exceed limit
        
        acc1.displayBalance();
        acc2.displayBalance();
    }
}