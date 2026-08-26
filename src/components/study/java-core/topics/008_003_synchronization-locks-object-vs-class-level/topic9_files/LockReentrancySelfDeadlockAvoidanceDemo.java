/**
 * Java Core Tutorial - Module 008_003: Thread Synchronization & Locks
 * Topic 9: Lock Reentrancy: Why Java Intrinsic Locks Avoid Self-Deadlock
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

class BaseAuditReport {
    // Synchronized method in Superclass:
    public synchronized void generateHeader() {
        System.out.println("  [BaseAuditReport] 1. Executed generateHeader() holding monitor lock: " + this.hashCode());
    }
}

class BranchDetailedAuditReport extends BaseAuditReport {
    // Synchronized method in Subclass calling superclass synchronized method:
    public synchronized void generateCompleteReport() {
        System.out.println("  [BranchDetailedAuditReport] 2. Entered generateCompleteReport() holding monitor lock: " + this.hashCode());

        // REENTRANT CALL: Re-acquiring the exact same 'this' lock that the thread already holds!
        generateHeader(); // If locks were NOT reentrant, the thread would DEADLOCK ITSELF right here!

        System.out.println("  [BranchDetailedAuditReport] 3. Successfully completed report!");
    }
}

public class LockReentrancySelfDeadlockAvoidanceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: LOCK REENTRANCY (AVOIDING SELF-DEADLOCK) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BranchDetailedAuditReport report = new BranchDetailedAuditReport();

        // Executing reentrant call:
        report.generateCompleteReport();

        System.out.println("\n>>> HOW LOCK REENTRANCY WORKS IN THE JVM:");
        System.out.println("  1. Lock Ownership : In Java, locks are acquired on a PER-THREAD basis, not a per-invocation basis.");
        System.out.println("  2. Recursion Count: When a thread acquires a lock, the JVM records the owning thread and sets 'count = 1'.");
        System.out.println("  3. Nested Entry   : If the same owning thread requests the same lock again, the JVM sees ownership matches and simply increments 'count = 2' without blocking!");
        System.out.println("  4. Unwinding      : Each 'monitorexit' decrements count. Lock is fully released ONLY when count reaches 0.");

        System.out.println("\n==========================================================================");
    }
}