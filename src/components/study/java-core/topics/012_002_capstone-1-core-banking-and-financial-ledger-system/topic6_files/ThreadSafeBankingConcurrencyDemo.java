/**
 * Java Core Tutorial - Module 012_002: Core Banking Capstone
 * Topic 6: Thread-Safe Banking Concurrency - High-Throughput Accounts
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.banking;

import java.math.BigDecimal;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ThreadSafeBankingConcurrencyDemo {

    public static class ConcurrentBankAccount {
        private final String accountNumber;
        private BigDecimal balance;
        private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock(true); // Fair lock

        public ConcurrentBankAccount(String accountNumber, BigDecimal initialBalance) {
            this.accountNumber = accountNumber;
            this.balance = initialBalance;
        }

        // Concurrent reads (many threads can read balance simultaneously):
        public BigDecimal getBalance() {
            rwLock.readLock().lock();
            try {
                return balance;
            } finally {
                rwLock.readLock().unlock();
            }
        }

        // Exclusive write (only 1 thread can deposit/withdraw at a time):
        public void deposit(BigDecimal amount) {
            rwLock.writeLock().lock();
            try {
                balance = balance.add(amount);
                System.out.println("   [DEPOSIT]: Added ₹" + amount + " | New Balance: ₹" + balance);
            } finally {
                rwLock.writeLock().unlock();
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: THREAD-SAFE CONCURRENT BANKING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ConcurrentBankAccount account = new ConcurrentBankAccount("SB-BKP-101", new BigDecimal("10000.00"));
        account.deposit(new BigDecimal("5000.00"));
        System.out.println("Current Verified Balance: ₹" + account.getBalance());

        System.out.println("\n==========================================================================");
    }
}
