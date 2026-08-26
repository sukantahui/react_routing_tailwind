/**
 * Java Core Tutorial - Module 008_003: Thread Synchronization & Locks
 * Topic 4: Synchronized Instance Methods: Implicit Acquisition of 'this' Object Lock
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

class SafeSynchronizedBankAccount {
    private int balance = 10000;

    public int getBalance() { return balance; }

    // 1. SYNCHRONIZED INSTANCE METHOD (Acquires the intrinsic lock of 'this' instance):
    public synchronized void withdraw(String studentName, int amount) {
        // Exactly equivalent to: synchronized(this) { ... }
        if (balance >= amount) {
            System.out.printf("[%s] Checked balance (₹%,d >= ₹%,d). Proceeding...%n",
                    studentName, balance, amount);
            try { Thread.sleep(100); } catch (InterruptedException ignored) {}
            balance -= amount;
            System.out.printf(">>> [%s] Successfully withdrew ₹%,d! Remaining: ₹%,d%n",
                    studentName, amount, balance);
        } else {
            System.out.printf("[%s] INSUFFICIENT FUNDS! Transaction Rejected (Balance: ₹%,d)%n",
                    studentName, balance);
        }
    }
}

public class SynchronizedInstanceMethodsDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: SYNCHRONIZED INSTANCE METHODS (this MONITOR) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SafeSynchronizedBankAccount sharedAccount = new SafeSynchronizedBankAccount();

        // Two students attempting to withdraw ₹8,000 simultaneously from the SAME account:
        Thread swadeep = new Thread(() -> sharedAccount.withdraw("Swadeep", 8000), "Swadeep-Thread");
        Thread tuhina = new Thread(() -> sharedAccount.withdraw("Tuhina", 8000), "Tuhina-Thread");

        swadeep.start();
        tuhina.start();

        swadeep.join();
        tuhina.join();

        System.out.println("\n>>> FINAL SHARED ACCOUNT STATE (SYNCHRONIZED):");
        System.out.printf("  Actual Ending Balance: ₹%,d (100%% THREAD-SAFE! Deficit Prevented!)%n",
                sharedAccount.getBalance());

        System.out.println("\n>>> HOW SYNCHRONIZED INSTANCE METHODS WORK:");
        System.out.println("  1. When Swadeep calls 'sharedAccount.withdraw()', his thread acquires the monitor lock on 'sharedAccount' (this).");
        System.out.println("  2. When Tuhina attempts to call 'sharedAccount.withdraw()', she finds the monitor locked and is put in the BLOCKED state.");
        System.out.println("  3. Only after Swadeep completes the method and exits is the lock released, letting Tuhina enter (who then sees balance = ₹2,000 and is rejected safely!).");

        System.out.println("\n==========================================================================");
    }
}