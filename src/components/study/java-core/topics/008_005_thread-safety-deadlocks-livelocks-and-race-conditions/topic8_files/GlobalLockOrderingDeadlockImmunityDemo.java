/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 8: Breaking Deadlocks with Global Lock Ordering (Deterministic Sequence)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

class OrderedBankAccount {
    private final int accountId;
    private int balance;

    public OrderedBankAccount(int accountId, int balance) {
        this.accountId = accountId;
        this.balance = balance;
    }

    public int getAccountId() { return accountId; }
    public int getBalance() { return balance; }

    // IMMUNE TO DEADLOCKS VIA GLOBAL DETERMINISTIC LOCK ORDERING:
    public static void transferMoney(OrderedBankAccount from, OrderedBankAccount to, int amount) {
        // Determine global lock acquisition order based on unique accountId:
        OrderedBankAccount firstLock = from.getAccountId() < to.getAccountId() ? from : to;
        OrderedBankAccount secondLock = from.getAccountId() < to.getAccountId() ? to : from;

        // Acquire locks in strict ascending accountId order regardless of transfer direction:
        synchronized (firstLock) {
            synchronized (secondLock) {
                if (from.balance >= amount) {
                    from.balance -= amount;
                    to.balance += amount;
                    System.out.printf("[%s] Transferred ₹%,d from Acct #%d to Acct #%d [Safe Global Order]%n",
                            Thread.currentThread().getName(), amount, from.accountId, to.accountId);
                }
            }
        }
    }
}

public class GlobalLockOrderingDeadlockImmunityDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: GLOBAL LOCK ORDERING DEADLOCK IMMUNITY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        OrderedBankAccount acct1 = new OrderedBankAccount(101, 50000); // Swadeep
        OrderedBankAccount acct2 = new OrderedBankAccount(202, 50000); // Tuhina

        // Bidirectional simultaneous transfers (Classic Deadlock Setup):
        // Thread 1: Transfers 101 -> 202
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 500; i++) {
                OrderedBankAccount.transferMoney(acct1, acct2, 10);
            }
        }, "Transfer-Swadeep-to-Tuhina");

        // Thread 2: Transfers 202 -> 101 (Opposite direction!)
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 500; i++) {
                OrderedBankAccount.transferMoney(acct2, acct1, 10);
            }
        }, "Transfer-Tuhina-to-Swadeep");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("\n>>> 1,000 BIDIRECTIONAL TRANSFERS COMPLETED WITH ZERO DEADLOCKS!");
        System.out.printf("  Acct 101 Balance: ₹%,d | Acct 202 Balance: ₹%,d (100%% INTACT!)%n",
                acct1.getBalance(), acct2.getBalance());

        System.out.println("\n==========================================================================");
    }
}