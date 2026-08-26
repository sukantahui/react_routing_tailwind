/**
 * Java Core Tutorial - Module 008_004: Inter-Thread Communication & Producer-Consumer
 * Topic 9: The Golden Concurrency Rule: Always Enclose wait() in a 'while' Loop, Never 'if'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class WhileLoopWaitGoldenRuleDemo {

    private static final Object VAULT_LOCK = new Object();
    private static int availableStock = 0; // Starts empty

    // 1. INCORRECT (Vulnerable to Spurious Wakeup & Race Conditions):
    public static void unsafeConsumeIf() throws InterruptedException {
        synchronized (VAULT_LOCK) {
            // BUGGY IF STATEMENT:
            if (availableStock == 0) {
                System.out.println("  [Vulnerable Consumer] Stock is 0, waiting via 'if' check...");
                VAULT_LOCK.wait(); // DANGEROUS! If another consumer sneaks in first, this thread acts on stock=0!
            }
            availableStock--; // Stock becomes -1 (Corrupted!)
            System.out.println("  [Vulnerable Consumer] Consumed item! Remaining: " + availableStock);
        }
    }

    // 2. CORRECT PATTERN (The Golden Concurrency Rule):
    public static void safeConsumeWhile(String consumerName) throws InterruptedException {
        synchronized (VAULT_LOCK) {
            // CANONICAL WHILE LOOP:
            while (availableStock == 0) {
                System.out.printf("  [%s] Stock is 0, waiting safely via 'while' loop...%n", consumerName);
                VAULT_LOCK.wait(); // Upon waking, the loop condition re-tests 'availableStock == 0'!
            }
            availableStock--;
            System.out.printf(">>> [%s] Successfully consumed item! Remaining Stock: %d%n", consumerName, availableStock);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: THE GOLDEN RULE: wait() IN 'while' LOOPS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread c1 = new Thread(() -> {
            try { safeConsumeWhile("Consumer-Swadeep"); } catch (InterruptedException ignored) {}
        });

        Thread c2 = new Thread(() -> {
            try { safeConsumeWhile("Consumer-Tuhina"); } catch (InterruptedException ignored) {}
        });

        c1.start();
        c2.start();

        Thread.sleep(200); // Both consumers enter wait set

        // Producer adds ONE single item to stock and broadcasts notifyAll:
        Thread producer = new Thread(() -> {
            synchronized (VAULT_LOCK) {
                System.out.println("\n>>> [Producer] Produced 1 item in stock! Calling notifyAll()...");
                availableStock = 1;
                VAULT_LOCK.notifyAll(); // Wakes BOTH Swadeep and Tuhina!
            }
        });

        producer.start();

        c1.join();
        c2.join();
        producer.join();

        System.out.println("\n>>> WHAT HAPPENED WHEN notifyAll() WOKE BOTH CONSUMERS?");
        System.out.println("  1. Swadeep acquired the lock first, saw availableStock == 1, consumed it (stock becomes 0), and released lock.");
        System.out.println("  2. Tuhina acquired the lock second. Because of the 'while' loop, she RE-TESTED 'availableStock == 0' (now true!) and WENT BACK TO SLEEP safely without overdrawing!");

        System.out.println("\n==========================================================================");
    }
}