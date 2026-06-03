// BankingSystem.java
// Complete banking system with different account types

import java.util.ArrayList;
import java.util.List;

// Abstract bank account
abstract class BankAccount {
    protected String accountNumber;
    protected String holderName;
    protected double balance;
    protected static int nextAccountNumber = 1001;
    
    public BankAccount(String holderName, double initialDeposit) {
        this.accountNumber = "ACC" + nextAccountNumber++;
        this.holderName = holderName;
        this.balance = initialDeposit;
    }
    
    // Concrete methods
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
            System.out.println("New balance: $" + balance);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }
    
    public double getBalance() {
        return balance;
    }
    
    public void displayInfo() {
        System.out.println("Account: " + accountNumber);
        System.out.println("Holder: " + holderName);
        System.out.println("Balance: $" + balance);
        System.out.println("Type: " + getAccountType());
        System.out.println("Interest Rate: " + getInterestRate() + "%");
    }
    
    // Abstract methods
    public abstract void withdraw(double amount);
    public abstract double calculateInterest();
    public abstract double getInterestRate();
    public abstract String getAccountType();
}

// Savings account
class SavingsAccount extends BankAccount {
    private static final double INTEREST_RATE = 4.0;
    private static final double MINIMUM_BALANCE = 500;
    
    public SavingsAccount(String holderName, double initialDeposit) {
        super(holderName, initialDeposit);
        if (initialDeposit < MINIMUM_BALANCE) {
            System.out.println("Warning: Savings account requires minimum $" + MINIMUM_BALANCE);
        }
    }
    
    @Override
    public void withdraw(double amount) {
        if (amount > 0 && (balance - amount) >= MINIMUM_BALANCE) {
            balance -= amount;
            System.out.println("Withdrew: $" + amount);
            System.out.println("Remaining balance: $" + balance);
        } else {
            System.out.println("Cannot withdraw. Minimum balance of $" + MINIMUM_BALANCE + " required.");
        }
    }
    
    @Override
    public double calculateInterest() {
        return balance * INTEREST_RATE / 100;
    }
    
    @Override
    public double getInterestRate() {
        return INTEREST_RATE;
    }
    
    @Override
    public String getAccountType() {
        return "Savings Account";
    }
}

// Current account (Checking)
class CurrentAccount extends BankAccount {
    private static final double INTEREST_RATE = 0.5;
    private double overdraftLimit = 1000;
    
    public CurrentAccount(String holderName, double initialDeposit) {
        super(holderName, initialDeposit);
    }
    
    @Override
    public void withdraw(double amount) {
        if (amount > 0 && (balance - amount) >= -overdraftLimit) {
            balance -= amount;
            System.out.println("Withdrew: $" + amount);
            if (balance < 0) {
                System.out.println("Overdraft used! Balance: $" + balance);
            } else {
                System.out.println("Remaining balance: $" + balance);
            }
        } else {
            System.out.println("Withdrawal denied. Overdraft limit exceeded.");
        }
    }
    
    @Override
    public double calculateInterest() {
        return balance > 0 ? balance * INTEREST_RATE / 100 : 0;
    }
    
    @Override
    public double getInterestRate() {
        return INTEREST_RATE;
    }
    
    @Override
    public String getAccountType() {
        return "Current Account";
    }
}

// Fixed Deposit account
class FixedDepositAccount extends BankAccount {
    private static final double INTEREST_RATE = 7.5;
    private int tenureMonths;
    private boolean isMatured;
    
    public FixedDepositAccount(String holderName, double initialDeposit, int tenureMonths) {
        super(holderName, initialDeposit);
        this.tenureMonths = tenureMonths;
        this.isMatured = false;
        System.out.println("Fixed deposit for " + tenureMonths + " months. Early withdrawal penalty applies.");
    }
    
    @Override
    public void withdraw(double amount) {
        if (!isMatured) {
            System.out.println("Cannot withdraw before maturity. Penalty of 10% applies if you continue.");
            double penalty = amount * 0.10;
            System.out.println("Withdrawal with penalty: $" + (amount - penalty));
            balance -= amount;
        } else {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                System.out.println("Withdrew: $" + amount);
            }
        }
    }
    
    @Override
    public double calculateInterest() {
        return balance * INTEREST_RATE / 100 * (tenureMonths / 12.0);
    }
    
    @Override
    public double getInterestRate() {
        return INTEREST_RATE;
    }
    
    @Override
    public String getAccountType() {
        return "Fixed Deposit (" + tenureMonths + " months)";
    }
    
    public void mature() {
        isMatured = true;
        double interest = calculateInterest();
        balance += interest;
        System.out.println("FD matured! Interest earned: $" + interest);
    }
}

public class BankingSystem {
    public static void main(String[] args) {
        System.out.println("=== BANKING SYSTEM DEMO ===\n");
        
        List<BankAccount> accounts = new ArrayList<>();
        
        // Create different accounts
        SavingsAccount savings = new SavingsAccount("Swadeep", 5000);
        CurrentAccount current = new CurrentAccount("Tuhina", 2000);
        FixedDepositAccount fd = new FixedDepositAccount("Abhronila", 10000, 12);
        
        accounts.add(savings);
        accounts.add(current);
        accounts.add(fd);
        
        // Display all accounts
        for (BankAccount acc : accounts) {
            acc.displayInfo();
            System.out.println("Interest earned: $" + acc.calculateInterest());
            System.out.println("------------------------");
        }
        
        // Perform transactions
        System.out.println("\n=== TRANSACTIONS ===");
        savings.deposit(1000);
        savings.withdraw(2000);
        
        current.withdraw(2500); // Using overdraft
        current.deposit(500);
        
        fd.mature();
        fd.withdraw(5000);
        
        // Calculate total bank interest payout
        double totalInterest = 0;
        for (BankAccount acc : accounts) {
            totalInterest += acc.calculateInterest();
        }
        System.out.println("\nTotal interest to be paid by bank: $" + totalInterest);
    }
}