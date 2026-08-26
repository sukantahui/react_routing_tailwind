/**
 * Java Core Tutorial - Module 008_003: Thread Synchronization & Locks
 * Topic 1: The Classic Bank Account Overdraw Race Condition (Check-Then-Act Hazard)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

class UnsafeBankAccount {
    private int balance = 10000; // Starting with ₹10,000

    public int getBalance() { return balance; }

    // UNSAFE WITHDRAWAL (Vulnerable Check-Then-Act Race Condition):
    public void withdraw(String studentName, int amount) {
        // Step 1: CHECK (Is balance sufficient?)
        if (balance >= amount) {
            System.out.printf("[%s] Checked balance (₹%,d >= ₹%,d). Proceeding to withdraw...%n",
                    studentName, balance, amount);

            // Simulating network delay / processing lag between check and act:
            try { Thread.sleep(100); } catch (InterruptedException ignored) {}

            // Step 2: ACT (Deduct amount)
            balance -= amount;
            System.out.printf(">>> [%s] Successfully withdrew ₹%,d! Remaining Balance: ₹%,d%n",
                    studentName, amount, balance);
        } else {
            System.out.printf("[%s] INSUFFICIENT FUNDS! Transaction Rejected (Balance: ₹%,d)%n",
                    studentName, balance);
        }
    }
}

public class BankAccountOverdrawRaceConditionDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: BANK ACCOUNT OVERDRAW RACE CONDITION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        UnsafeBankAccount sharedAccount = new UnsafeBankAccount();

        // Two students attempting to withdraw ₹8,000 simultaneously from a ₹10,000 account:
        Thread swadeep = new Thread(() -> sharedAccount.withdraw("Swadeep", 8000), "Swadeep-Thread");
        Thread tuhina = new Thread(() -> sharedAccount.withdraw("Tuhina", 8000), "Tuhina-Thread");

        swadeep.start();
        tuhina.start();

        swadeep.join();
        tuhina.join();

        System.out.println("\n>>> FINAL SHARED ACCOUNT STATE:");
        System.out.printf("  Actual Ending Balance: ₹%,d (CRITICAL FINANCIAL OVERDRAW DEFICIT!)%n",
                sharedAccount.getBalance());

        System.out.println("\n>>> THE CHECK-THEN-ACT RACE CONDITION HAZARD:");
        System.out.println("  1. Swadeep checks: ₹10,000 >= ₹8,000 (TRUE).");
        System.out.println("  2. Before Swadeep can deduct, Tuhina checks: ₹10,000 >= ₹8,000 (TRUE).");
        System.out.println("  3. Both proceed to deduct ₹8,000 each (Total ₹16,000 withdrawn from a ₹10,000 balance!).");
        System.out.println("  4. Final balance becomes -₹6,000 (Catastrophic overdraft).");

        System.out.println("\n==========================================================================");
    }
}