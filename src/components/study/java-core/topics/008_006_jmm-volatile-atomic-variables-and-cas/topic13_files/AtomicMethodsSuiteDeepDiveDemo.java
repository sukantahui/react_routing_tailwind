/**
 * Java Core Tutorial - Module 008_006: JMM, volatile, Atomics & CAS
 * Topic 13: The Atomic Method Suite: getAndIncrement, compareAndSet & Functional updateAndGet
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.atomic.AtomicInteger;

public class AtomicMethodsSuiteDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: THE ATOMIC METHODS SUITE & LAMBDA UPDATES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AtomicInteger counter = new AtomicInteger(10);

        // 1. Post-Increment vs Pre-Increment:
        int prev = counter.getAndIncrement(); // Returns 10, then counter becomes 11 (like counter++)
        System.out.printf(">>> 1. getAndIncrement() -> Returned: %d | Current Value: %d%n", prev, counter.get());

        int next = counter.incrementAndGet(); // Counter becomes 12, then returns 12 (like ++counter)
        System.out.printf(">>> 2. incrementAndGet() -> Returned: %d | Current Value: %d%n", next, counter.get());

        // 2. Add and Get:
        int afterAdd = counter.addAndGet(5); // Adds 5 -> 17
        System.out.printf(">>> 3. addAndGet(5)      -> Returned: %d%n", afterAdd);

        // 3. Functional Java 8 updateAndGet() / accumulateAndGet():
        // Automatically loops internally with CAS until lambda successfully updates!
        int doubled = counter.updateAndGet(x -> x * 2); // 17 * 2 = 34
        System.out.printf(">>> 4. updateAndGet(x -> x * 2) -> Result: %d%n", doubled);

        int accumulated = counter.accumulateAndGet(100, (current, delta) -> current + delta); // 34 + 100 = 134
        System.out.printf(">>> 5. accumulateAndGet(100, +) -> Result: %d%n", accumulated);

        System.out.println("\n>>> WHY updateAndGet() IS REVOLUTIONARY IN JAVA 8:");
        System.out.println("  - You no longer need to write manual 'do { ... } while(!compareAndSet())' CAS retry loops!");
        System.out.println("  - 'updateAndGet(unaryOperator)' encapsulates the CAS retry loop internally with zero boilerplate!");

        System.out.println("\n==========================================================================");
    }
}