/**
 * Java Core Tutorial - Module 008_003: Thread Synchronization & Locks
 * Topic 10: Defensive Concurrency: Private Final Lock Objects vs Public 'this' Exposures
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

class SecureStudentLedger {

    // 1. DEFENSIVE CONCURRENCY PATTERN: Private Final Lock Object:
    // - 'private': Prevents outside classes from synchronizing on your internal lock!
    // - 'final'  : Prevents reference reassignment (guarantees lock target identity NEVER changes!).
    private final Object internalLock = new Object();

    private int totalRecords = 0;

    public void addRecord(String studentName) {
        synchronized (internalLock) {
            totalRecords++;
            System.out.printf("[%s] Securely added record for %s (Total: %d)%n",
                    Thread.currentThread().getName(), studentName, totalRecords);
        }
    }

    public int getTotalRecords() {
        synchronized (internalLock) {
            return totalRecords;
        }
    }
}

public class PrivateFinalLockIdiomDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: PRIVATE FINAL LOCK OBJECT IDIOM - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SecureStudentLedger ledger = new SecureStudentLedger();

        Thread t1 = new Thread(() -> ledger.addRecord("Swadeep"), "Worker-1");
        Thread t2 = new Thread(() -> ledger.addRecord("Tuhina"), "Worker-2");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("\n>>> WHY 'synchronized(this)' IS VULNERABLE TO CLIENT-SIDE LOCKING ATTACKS:");
        System.out.println("  - If your class uses 'synchronized(this)', any rogue or poorly written external class can do: 'synchronized(ledger) { Thread.sleep(999999); }'.");
        System.out.println("  - This hijacks your object's monitor from the outside and freezes your entire class (Denial of Service attack).");
        System.out.println("  - 'private final Object lock = new Object()' completely encapsulates the lock so external code CANNOT see or hijack it!");

        System.out.println("\n==========================================================================");
    }
}