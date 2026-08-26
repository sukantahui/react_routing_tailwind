/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 8: Why volatile Does NOT Guarantee Atomicity: The volatile count++ Fallacy
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class VolatileNonAtomicityTrapDemo {

    // VOLATILE VARIABLE (Guarantees visibility, but NOT atomicity!):
    private static volatile int volatileCounter = 0;

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: THE volatile NON-ATOMICITY FALLACY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Runnable task = () -> {
            for (int i = 0; i < 50_000; i++) {
                // 'volatileCounter++' is STILL NOT ATOMIC!
                // 1. Read volatile variable (volatile read from RAM)
                // 2. Add 1 in CPU register (register calculation)
                // 3. Write back to volatile variable (volatile write to RAM)
                // Even though steps 1 and 3 are volatile, THE 3 STEPS TOGETHER ARE NOT ATOMIC!
                volatileCounter++;
            }
        };

        Thread t1 = new Thread(task, "Thread-1");
        Thread t2 = new Thread(task, "Thread-2");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println(">>> EXPERIMENT RESULTS (50,000 + 50,000 Expected = 100,000):");
        System.out.printf("  Actual Final volatileCounter Value: %,d (DATA CORRUPTED!)%n", volatileCounter);

        System.out.println("\n>>> WHY volatile FAILED TO PROTECT THE COUNTER:");
        System.out.println("  - volatile guarantees VISIBILITY (you read the latest value).");
        System.out.println("  - volatile DOES NOT guarantee MUTUAL EXCLUSION or ATOMICITY (two threads can read the same value simultaneously, increment, and write back the same number).");
        System.out.println("  - For compound operations (Read-Modify-Write), use 'AtomicInteger' or 'synchronized'!");

        System.out.println("\n==========================================================================");
    }
}