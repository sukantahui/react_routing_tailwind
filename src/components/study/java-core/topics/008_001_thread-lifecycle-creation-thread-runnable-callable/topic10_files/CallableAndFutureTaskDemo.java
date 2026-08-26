/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 10: Thread Creation Method 4: Callable<V>, Return Values & Checked Exceptions
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

// 1. IMPLEMENTING java.util.concurrent.Callable<V>:
class TaxComputationCallable implements Callable<Double> {

    private final double annualRevenue;

    public TaxComputationCallable(double annualRevenue) {
        this.annualRevenue = annualRevenue;
    }

    // Callable method returns generic type <V> AND declares 'throws Exception':
    @Override
    public Double call() throws Exception {
        System.out.printf("[%s] Calculating GST for annual revenue ₹%,.2f...%n",
                Thread.currentThread().getName(), annualRevenue);

        if (annualRevenue < 0) {
            throw new IllegalArgumentException("Revenue cannot be negative!");
        }

        Thread.sleep(400); // Simulate intense computation
        return annualRevenue * 0.18; // 18% GST calculation returned!
    }
}

public class CallableAndFutureTaskDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: CREATION METHOD 4: Callable<V> & FutureTask - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Create Callable Task:
        Callable<Double> taxTask = new TaxComputationCallable(2500000.0);

        // 2. Wrap Callable in FutureTask (implements both Runnable and Future):
        FutureTask<Double> futureTask = new FutureTask<>(taxTask);

        // 3. Pass FutureTask to Thread:
        Thread thread = new Thread(futureTask, "Tax-Engine-Thread");
        thread.start();

        System.out.println(">>> Main thread is free to do other work while Tax Engine computes...");

        // 4. Block and retrieve result via futureTask.get():
        Double gstAmount = futureTask.get(); // Waits for thread to finish and returns calculated value!

        System.out.printf("\n>>> Tax Computation Result: ₹%,.2f%n", gstAmount);

        System.out.println("\n>>> Runnable vs Callable<V> COMPARISON:");
        System.out.println("+-------------------+---------------------------+---------------------------+");
        System.out.println("| Feature           | java.lang.Runnable        | java.util.concurrent.Callable<V>");
        System.out.println("+-------------------+---------------------------+---------------------------+");
        System.out.println("| Method Name       | void run()                | V call() throws Exception |");
        System.out.println("| Return Value      | NO (void return)          | YES (Returns generic V)   |");
        System.out.println("| Checked Exception | NO (Cannot throw checked) | YES (Can throw Exception) |");
        System.out.println("| Added in Java     | Java 1.0 (Core)           | Java 5.0 (JSR-166)        |");
        System.out.println("+-------------------+---------------------------+---------------------------+");

        System.out.println("\n==========================================================================");
    }
}